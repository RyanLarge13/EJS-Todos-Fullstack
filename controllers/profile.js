//Rendering the profile page after user has been authenticated and logged in
export const renderProfile = (req, res) => {
	res.render('profile');
};

//Posting a todo into the database, requiring information to tie the user to their todo
export const addTodo = (req, res) => {
	console.log('You are here')
};

//Updating an existing todo tied to the user from the database
export const updateTodo = (req, res) => {};

//Deleting a todo tied to the user from the database 
export const deleteTodo = (req, res) => {};
