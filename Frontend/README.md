Project Structure:
The project is divided into two parts the back end holds the information of creating a user as well as handling the information allow the users to login and log out. The front end shows the user home page which would allow the user to create an account and log in at first once the user is log in the user can then see the option to log out once the user has successfully log in.

In the future the back end will be able to store other schemas and resolvers and the front end will have more pages made to create a list the user can make to add a gaming list back log.

SetUp Steps:
Create a .env file in the backend folder and add the .env provided in required environment variables section of this README file. 

From the terminal, cd into backend folder and then npm install

cd.. and then cd into the frontend folder and type npm install

after that npm run dev to start the page

Authentication approach:
The project uses the JWT and Bcrypt to authenticate the users information when creating an account. The cookies serve as a token to store the users activity while logged in if the user deletes there cookies the user must log in again. 

Required environment variables:
The environment variables will hold the MONGO connection to the Atlus database, the Port the website is running on, the JWT token and how long vaild for.
.evn 
<!-- MONGO = mongodb+srv://<username>:<password>c403@cluster0.zjjl30c.mongodb.net/?appName=Cluster0 -->
PORT = 4000
JWT_SECRET = secret_key
JWT_EXPIRY = 3000

What is completed so far:
Allowing the user to log create an account or login to there account from the home page, a register page allowing the player to create an account, login page to allow the user to log into their account and log out button when the user wants to log out.


Group members participation :
Back-end: Isabel Lorrelyn Lag-ang and Tajinder Nijjar
Front-end: Greg Komarnicky and Tajinder Nijjar