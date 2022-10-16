import mongoose from "mongoose";

//This model is for all todo items
const todoSchema = mongoose.Schema({
  Author: {
    type: String,
    required: true,
  },
  Content: {
    type: String,
    required: true,
  },
  Where: String,
  When: String,
}, {
	timestapms: true
});

export const Todos = mongoose.model("Todos", todoSchema);
