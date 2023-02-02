# WMF/WDF Assignment 2 (CA2) - Movie Management System

This full-stack web application allows an admin to manage a list of movies in the system. Using this application, the admin can:

- Retrieve a list of movies
- Toggle hide/show past movies
- Filter movies by genre
- Create movies
- Delete one or multiple movie(s)
- Update movies
- Pin movies

It also allows a normal user to retrieve/toggle/filter a list of movies & to pin their favourite movies.

## Languages used:

HTML5, CSS3, JavaScript, SQL

## Libraries/Frameworks used:

Frontend Tech Stack: React.js, Redux, React-Router-DOM, Bootstrap 5, MDBootstrap 5, React-Icons, React-Spinners, Babel, Webpack

Backend Tech Stack: Node.js, Express.js, MySQL

## Installation & Local usage instructions:

To run the web application locally, follow the steps below:

1. Clone the repository using `git clone <REPOSITORY_ADDRESS>` command.
2. Open the repository using a code editor like VS Code.
3. You should see 2 folders titled `website` & `server`.
4. Open the first terminal window & change directory into the `server` folder by entering the commands `cd server`. Once there, install all the dependencies using `npm install` command.
5. Start the server using the command `nodemon server.js`.
6. Open a second terminal window & change directory into the `website` folder by entering the command `cd website`. Once there, install all the dependencies using `npm install` command.
7. Run the command `npm run start` to allow Babel to transpile the code. An `/output` folder should appear after transpilation.
8. Open a third terminal window & `cd website`. This time round, run the command `npm run build` to allow Webpack to transpile once again and bundle the code. A `/dist` folder should appear after transpilation.
9. Right click the index.html file (in the root directory) & click on 'Open with Live Server' to start the web application. To open the HTML file with a local development live server, please kindly that you have installed beforehand the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) in your VS Code editor.
10. Kindly ensure that your website is started at ***http://127.0.0.1:5500*** and your server is started at **_http://localhost:8081_**.

## Login credentials:

- **Admin Credentials (Admin Account):**

  - Email: `admin@gmail.com`
  - Password: `password123`

- **User Credentials (Public Account):**

  - Email: `user@gmail.com`
  - Password: `password123`

- Take note Admin Account has **ALL** functionalities while the Public User Account has only **RESTRICTED/LIMITED** functionalities.

## Things to take note:

1. Only **ONE** login session is allowed at anytime.
2. Ensure both your website & server are running at the correct ports. Website (***http://127.0.0.1:5500***) & server (**_http://localhost:8081_**)
3. If you are facing issues logging in despite entering the correct email & password AND have ensured that your website & server are running at the correct ports, as a last resort, please kindly clear your browser's cache & cookies. The JWT token in the browser's cookies might still be in the browser, hence causing the login to fail.
4. If you are facing server-side/backend related issues, it could be due to the custom middleware ` verifyAgainstCSRFAttacks` which I have written in verificationLib.js. In short, this is a custom middleware that helps to mitigate against CSRF attacks by blocking out requests that came from untrusted/unauthorized origins.
5. You can **disable** that particular middleware by commenting out Line 65 in app.js `app.use(verificationLib.verifyAgainstCSRFAttacks);`if it's causing backend related issues when you are testing the application locally. On my end, I have tested the application locally and it works fine with that custom protective middleware enabled.
6. If for any reason, you wish to test our backend API endpoints via POSTMAN, you can do by finding the relevant POSTMAN collections in the `/postman` folder of the server directory. Import those POSTMAN collections to your desktop POSTMAN app, and you can start testing the API endpoints.
7. However, do take note that, when hitting Admin protected API endpoints via POSTMAN, remember to manually add a Cookie header in your Request Header accompanied with the relevant JWT token/value. This step is important for admin protected APIs. Without it, admin APIs will return an unauthorized error object. You can refer to a document titled `Postman_Testing_FYI.pdf` in the postman folder for more details.

## Done by:

Class 1 Team 1:

1. Ng Cheng Wai Melvin (P7411407) 😎 - **Team Leader**
2. Kua Zi Lin (P7461142) 👿 - **Team Member**
3. Ng Chye Yong (P7461085) 🥶 - **Team Member**

<img src="./website/src/img/demo.jpg" alt="Homepage Image"/>
