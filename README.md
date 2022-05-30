<h1>REST API with Node.js, Express & PostgreSQL</h1>

<h2>The task:</h2>
Build a REST API with Node.js, Express & PostgreSQL

<h2>The requirements</h2>

- Must use a database (hosted on heroku or elephantSQL) for persistent storage
- Must use a REST API server with routes to manage requests and serve responses
- Must use the models pattern to allow easy interaction with the database
- Must use environment variables to store database credentials - do not hard code those credentials!
- Bonus: Once your API is up and running, you could build a front end which allows you to view, create, edit and delete data

<h2>Node modules used:</h2>
<ul>
  <li>express
  <li>pg
  <li>dotenv
  <li>nodemon
  </ul>

<h2>What we did:</h2>
<ul>
<li>We began by deciding on what sort of API we wanted to create, we decided on information about animals, focussing on conservation status and adding other bits of information such as approximate population, location and a picture of the animal.
<li>We started by collecting some data, we decided to start with just 10 animals so that we could get started on the code and add extra information later if we had time.
<li>We then created a detailed plan which laid out which online provider would host our database, how we would set it up within VS code, any imports and exports that we needed and the order in which we would set up our routes and modules. - Please visit the plan.txt file to view this.
<li>Next it was time to get started, we began by adding our data into VS code as objects within an array, the format that you would expect information provided by an API to arrive in. This was stored inside the libs folder.
<li>We used Heroku to set up our app and added a PostgreSQL database to the app.
<li>Next we used environment variables (.env file) to store our database credentials and added these, along with the node_modules to our .gitignore file.
<li>We then used pg to create a pool which would allow multiple users to connect to the database at one time and checked that this had been set up correctly.
<li>Next we created a scripts table which stored separate js files containing the script required to:
  <ul>
      <li>Create our table on the remote database. This required the use of PostgreSQL to CREATE TABLE within a JS function. We       decided that VARCHAR would be appropriate for many of our categories as they contained letters, numbers and special characters. Here we were also required to state how many characters each data type would accept.
      <li>Populate the table on our remote database. Here we used PostgreSQL to INSERT INTO the table, this was used within a JS function that made use of a for loop to add all of the data at once. We also used $1, $2, $3 etc to prevent SQL injection and sanitise the data before it made it's way onto the server. Here we ran into an issue and learnt an important lesson. When populating the table we found that we hadn't allowed enough characters in one of the categories.
      <li>Drop table. As before this was created using PostgreSQL DROP TABLE within a JS function. We used this to drop the table, amend the character count and start again when we realised that we hadn't allowed enough characters. I am sure that this isn't the most efficient way to fix this issue but due to the time constraints of a 1 day hackaton it seemed the most straightforward way for us to continue with the assigned task.
  </ul>
<li>Once the tables were created and populated it was time to set up our routers and models.
<li>Setting get requests using SELECT statements was fairly straightforward although we did get a few errors which we were able to resolve. These statements allowed us to select all animals, select animal by name including partial matches and select animal by ID.
<li>We then set up a post request using INSERT INTO and this was less straightforward. Again this required the use of data sanitisation and what we overlooked was adding express.json() into our app file so that the json being passed in could be processed. We also found that using RETURNING* to return the data added to the table didn't work and instead we required a separate SELECT statement within the function to display the new data, we opted to return the full table including new information.
  </ul>

<h2>What I intend to do next:</h2>
<li>I intend to continue working on this project alone in my spare time. I want to add routers to show animals with a certain conservation status and add an update conservation status function.
<li>I want to hook it up to the front end so that people can search for an animal by name, conservation status or display a random animal with a picture of said animal displayed.
<li>I also hope to colour code the background or a portion of it to match the animal's conservation status.
