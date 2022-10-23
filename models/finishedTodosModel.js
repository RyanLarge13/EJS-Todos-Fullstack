import mongoose from "mongoose";

//This model is for all finished todo items
const finishedSchema = mongoose.Schema(
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

export const FinishedTodos = mongoose.model("FinishedTodos", finishedSchema);
