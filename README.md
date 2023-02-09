# MERN Stack Template

- **M** = [MongoDB](https://www.mongodb.com)
- **E** = [Express.js](https://expressjs.com)
- **R** = [React.js](https://reactjs.org)
- **N** = [Node.js](https://nodejs.org)

<br />
<br />

# What is this template?

This template allows you to quick-start your Fullstack application with two state authentication using the MERN stack<br />
I have attempted to use the best practices for both ends, which should make it easy for any advanced/new developer to use, and perhaps learn from.

<br />
<br />

### STEP 1:

> cd ~/Desktop <br />
> git clone https://github.com/[your-user-name]/[your-repo-name].git

<br />

### STEP 2:

Go to the root of your repository's folder, and install all dependecies:

> cd ~/Desktop/[your-repo-name]<br />
> npm install

<br />

### STEP 3:

Prepare your MongoDB database ([atlas](https://www.mongodb.com/cloud/atlas),
[community]<br />
Then configure your database within `server/constants/index.js`, by configuring the `MONGO_URI` variable.

<br />

### STEP 4: CODE !!!

<br />
<br />

### To run the client and/or the server, you can do any of the following:

#### Short Method

From the root of your project run:
> npm start

#### Long Method

Open terminal #1 (backend)
> cd ./server<br />
> npm start

Open terminal #2 (frontend)
> cd ./client<br />
> npm start