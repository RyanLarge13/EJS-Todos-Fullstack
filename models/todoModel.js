import mongoose from "mongoose";

//This model is for all todo items
const todoSchema = mongoose.Schema(
  {
    Author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    Content: {
      type: String,
      required: true,
    },
    Where: String,
    When: String,
  },
  {
    timestamps: true,
  }
);

export const Todos = mongoose.model("Todos", todoSchema);
