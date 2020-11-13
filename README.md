# react-stripe-backend
node.js app using express to facilitate communication between react-stripe front end and stripe payment gateway. While going though depository resources, do cross look with react-stripe repository under my repository list for better understanding the code and data flow.

## Note 
You might get into some trouble while wokring with dotenv and uuid packages. To avoid headack, put ` require("dotenv").config()` on top of your file.  

Furthermore, keep close eye on `UUID` versioning and make sure you use correct version, I used v4 for this project. Here is how it is initialized ` const { v4: uuid} = require("uuid")`.

