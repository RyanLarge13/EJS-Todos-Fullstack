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
    Content: title,
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
  const Todo = await Todos.findOne({
    Author: user._id,
    Content: req.params.todo,
  })
    .then(async (todo) => {
      const newFinishedTodo = await FinishedTodos.create({
        Author: user._id,
        Content: req.params.todo,
      });
      newFinishedTodo.save();
    })
    .catch((err) => console.log(err));
  await Todos.findOneAndDelete({
    Author: user._id,
    Content: req.params.todo,
  }).then((info, err) => {
    if (err)
      console.log(
        `There was an error processing your request to delete a todo: ${err}`
      );
    else {
      res.status(200).send();
    }
  });
};

export const removeTodo = async (req, res) => {
  const user = req.user;
  await FinishedTodos.findOneAndDelete({
    Author: user._id,
    Content: req.params.todo,
  }).then((info, err) => {
    if (err) console.log(err);
    else {
      res.status(200).send();
    }
  });
};