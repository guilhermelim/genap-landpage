import mongoose from 'mongoose';

export default function isValidObjectId(id?: string | null): boolean {
  if (!id) return false;
  return mongoose.isValidObjectId(id);
}
