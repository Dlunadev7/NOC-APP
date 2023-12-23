import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
  level: { type: String, enum: ['low', 'medium', 'high'], default: 'low' },
  message: { type: String, required: true },
  created_at: { type: Date, default: Date.now(), required: false },
  origin: { type: String, required: true },
  
})

export const LogModel = mongoose.model('Log', logSchema);
