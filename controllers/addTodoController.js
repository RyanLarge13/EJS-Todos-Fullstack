import { Todos } from '../models/todoModel.js';

export const addTodo = async (req, res) => {
    const user = req.user;
    const { title, time, location } = req.body
    if (!user) {
        return res.render('signin', {
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
        res.render('profile', {
            name: user.Username,
            success: "Your todo was added to the list",
            todos: todos
        })
    })
};