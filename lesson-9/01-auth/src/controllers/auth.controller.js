import { registerUser, loginUser } from '../services/auth.service.js';

export async function registerController(req, res) {
  const user = await registerUser(req.body);

  res.json({
    status: 201,
    message: 'User registered successfully',
    data: user,
  });
}

export async function loginController(req, res) {
  const session = await loginUser(req.body.email, req.body.password);

  res.json({
    status: 200,
    message: 'User login successfully',
    data: {
      accessToken: session.accessToken,
    },
  });
}
