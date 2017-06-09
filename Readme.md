 This is a simple task manager

  About project structure

  	Routes
/routes - all routes on server side
/routes/tasks/* - all routes which connected to tasks
/routes/routes.js - router which devide routes
/routes/auth - all auth routes
/routes/users - routes for login and profile page
/routes/register - routes for register page
/routes/tasks/activeTask - set in user activeTask in which user is able to write something task must be accepted or created by user
/routes/tasks/createTask - creation task which can be viewed only by user which created task
/routes/tasks/deleteTask - remove task data from tasks and user
/routes/tasks/tasks      - render the main page where you can see list of tasks and write something and invite users

   Other back-end
/socket/socket_connect - active