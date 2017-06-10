 This is a simple task manager. Where users can register with google and make some tasks. Shares this tasks to each other and write some notations in it.

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

    Models
This is a mongoose models for database rules. So this models say which fields are allowed in my collection and what type it must be.

  /models/tasks - this is for task
  /models/users - this is for user

   Other back-end
/socket/socket_connect - this is something difficult. I create some groups of sockets. At first, each user has room, the name of room is user id. So I can update user page on my wish. Also I create room for each task and it looks like a chat so now this is easy.

  Front-end
 I used ejs templates. all front-end things are in the /public and /views folders.

  views/ - here is some pages and components for them
  views/pages/main - this is a basic page with nav-bar. this is empty
  views/users - this is pages for user: login, register and profile pages.
  views/partials - this is components which I used in some pages
  views/chat_box - I loaded in from opensouse project and use for free but change a little. This is a chat where users write something in task
  views/invite_form - this is a part which are hiden for the time when it will be used for inviting users to the task which is active now in the current user
  views/nav-bar - this is a standart boostrap nav-bar
  views/head - this is links which every page must have.

  Install instraction

npm install
mkdir config
echo > config/auth.js
node server.js

