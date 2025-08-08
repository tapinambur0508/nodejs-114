import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ['male', 'female'],
    },
    avatar: {
      type: String,
      default: null,
    },
    onDuty: {
      type: Boolean,
      required: false,
      default: false,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'users',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Student = mongoose.model('Student', studentSchema);
