import * as fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Handlebars from 'handlebars';
import createHttpError from 'http-errors';

import { User } from '../models/user.js';
import { Session } from '../models/session.js';

import { sendMail } from '../utils/sendMail.js';
import { getEnvVariable } from '../utils/getEnvVariable.js';

const REQUEST_PASSWORD_RESET_TEMPLATE = fs.readFileSync(
  path.resolve('src/templates/request-password-reset.hbs'),
  { encoding: 'utf-8' },
);

export async function registerUser(payload) {
  const user = await User.findOne({ email: payload.email });

  if (user !== null) {
    throw new createHttpError.Conflict('Email is already in use');
  }

  payload.password = await bcrypt.hash(payload.password, 10);

  return User.create(payload);
}

export async function loginUser(email, password) {
  const user = await User.findOne({ email });

  if (user === null) {
    throw new createHttpError.Unauthorized('Email or password is incorrect');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (isMatch !== true) {
    throw new createHttpError.Unauthorized('Email or password is incorrect');
  }

  await Session.deleteOne({ userId: user._id });

  return Session.create({
    userId: user._id,
    accessToken: crypto.randomBytes(30).toString('base64'),
    refreshToken: crypto.randomBytes(30).toString('base64'),
    accessTokenValidUntil: new Date(Date.now() + 200 * 60 * 1000), // 200 minutes
    refreshTokenValidUntil: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
  });
}

export async function logoutUser(sessionId) {
  await Session.deleteOne({ _id: sessionId });
}

export async function refreshSession(sessionId, refreshToken) {
  const session = await Session.findById(sessionId);

  if (session === null) {
    throw new createHttpError.Unauthorized('Session not found');
  }

  if (session.refreshToken !== refreshToken) {
    throw new createHttpError.Unauthorized('Refresh token is invalid');
  }

  if (session.refreshTokenValidUntil < new Date()) {
    throw new createHttpError.Unauthorized('Refresh token is expired');
  }

  await Session.deleteOne({ _id: session._id });

  return Session.create({
    userId: session.userId,
    accessToken: crypto.randomBytes(30).toString('base64'),
    refreshToken: crypto.randomBytes(30).toString('base64'),
    accessTokenValidUntil: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
    refreshTokenValidUntil: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
  });
}

export async function requestPasswordReset(email) {
  const user = await User.findOne({ email });

  if (user === null) {
    // throw new createHttpError.NotFound("User not found");
    return;
  }

  const token = jwt.sign(
    {
      sub: user._id,
      name: user.name,
    },
    getEnvVariable('SECRET_JWT'),
    {
      expiresIn: '15m',
    },
  );
  const template = Handlebars.compile(REQUEST_PASSWORD_RESET_TEMPLATE);

  await sendMail({
    to: email,
    subject: 'Reset password',
    html: template({
      resetPasswordLink: `http://localhost:3000/reset-password/${token}`,
    }),
  });
}

export async function resetPassword(token, password) {
  try {
    const decoded = jwt.verify(token, getEnvVariable('SECRET_JWT'));

    const user = await User.findById(decoded.sub);

    if (user === null) {
      throw new createHttpError.NotFound('User not found');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.findByIdAndUpdate(user._id, { password: hashedPassword });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new createHttpError.Unauthorized('Token is expired');
    }

    if (error.name === 'JsonWebTokenError') {
      throw new createHttpError.Unauthorized('Token is unauthorized');
    }

    throw error;
  }
}

export async function loginOrRegister(email, name) {
  let user = await User.findOne({ email });

  if (user === null) {
    const password = await bcrypt.hash(
      crypto.randomBytes(30).toString('base64'),
      10,
    );

    user = await User.create({ name, email, password });
  }

  await Session.deleteOne({ userId: user._id });

  return Session.create({
    userId: user._id,
    accessToken: crypto.randomBytes(30).toString('base64'),
    refreshToken: crypto.randomBytes(30).toString('base64'),
    accessTokenValidUntil: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
    refreshTokenValidUntil: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
  });
}
