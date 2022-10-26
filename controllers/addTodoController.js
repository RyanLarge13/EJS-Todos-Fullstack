import { Todos } from "../models/todoModel.js";
import { FinishedTodos } from "../models/finishedTodosModel.js";

export const addTodo = async (req, res) => {
  const user = req.user;
  const { title, time, location } = req.body;
  if (!user) {
    return res.render("signin", {
      err: "You need to sign in first",
    });
  }
  const newTodo = new Todos({
    Author: user,
    Content: title.trim(),
    Where: location,
    When: time,
  });
  newTodo.save().then(async (todo) => {
    const todos = await Todos.find({ Author: user._id });
    const doneTodos = await FinishedTodos.find({ Author: user._id });
    res.render("profile", {
      name: user.Username,
      success: "Your todo was added to the list",
      todos: todos,
      finishedTodos: doneTodos,
    });
  });
};

export const deleteTodo = async (req, res) => {
  const user = req.user;
  const newFinishedTodo = await FinishedTodos.create({
    Author: user._id,
    Content: req.params.title,
  });
  await newFinishedTodo.save();
  await Todos.deleteOne({
    Author: user._id,
    _id: req.params.todo,
  })
    .then((info) => {
      return res.status(200).send();
    })
    .catch((err) => console.log(err));
};

export const removeTodo = async (req, res) => {
  const user = req.user;
  await FinishedTodos.findOneAndDelete({
    Author: user._id,
    _id: req.params.todo,
  }).then((info, err) => {
    if (err) console.log(err);
    else {
      res.status(200).send();
    }
  });
};
