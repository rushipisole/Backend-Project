// function getAnimalData() {
//     fetch("https://fakerapi.it/api/v1/persons")
//         .then(function (response) {
//             response.json()
//                 .then(function (finalData) {
//                     console.log(finalData)
//                 })
//         })
// }

// async function getAnimalData() {
//     const response = await fetch("https://fakerapi.it/api/v1/persons")
//     const finalData = await response.json()
//     console.log(finalData)
// } 


// =================================================================================================/

// const express = require("express");
// const jwt = require("jsonwebtoken");
// const jwtPassword = "123456";

// const app = express();
// app.use(express.json());

// const ALL_USERS = [
//     {
//         username: "harkirat@gmail.com",
//         password: "123",
//         name: "harkirat singh",
//     },
//     {
//         username: "raman@gmail.com",
//         password: "123321",
//         name: "Raman singh",
//     },
//     {
//         username: "priya@gmail.com",
//         password: "123321",
//         name: "Priya kumari",
//     },
// ];

// function userExists(username, password) {
//     let userExists = false;
//     for (let i = 0; i < ALL_USERS.length; i++) {
//         if (ALL_USERS[i].username == username && ALL_USERS[i].password == password) {
//             userExists = true;
//         }
//     }
//     console.log(userExists);
//     return userExists;
// }

// app.post("/signin", function (req, res) {
//     const username = req.body.username;
//     const password = req.body.password;

//     if (!userExists(username, password)) {
//         return res.status(403).json({
//             msg: "User doesnt exist in our in memory db",
//         });
//     }

//     var token = jwt.sign({ username: username }, jwtPassword);
//     return res.json({
//         token,
//     });
// });

// app.get("/users", function (req, res) {
//     const token = req.headers.authorization;
//     try {
//         const decoded = jwt.verify(token, jwtPassword);
//         const username = decoded.username;
//         // return a list of users other than this username

//         res.json({
//             users: ALL_USERS
//         })
//     } catch (err) {
//         return res.status(403).json({
//             msg: "Invalid token",
//         });
//     }
// });

// app.listen(3000);

// ======================================================================================================

// const express = require("express");
// const jwt = require("jsonwebtoken");
// const mongoose = require("mongoose");
// const jwtPassword = "123456";

// mongoose.connect(
//   "your_mongo_url",
// );

// const User = mongoose.model("User", {
//   name: String,
//   username: String, 
//   pasword: String,
// });

// const app = express();
// app.use(express.json());

// function userExists(username, password) {
//   // should check in the database
// }

// app.post("/signin", async function (req, res) {
//   const username = req.body.username;
//   const password = req.body.password;

//   if (!userExists(username, password)) {
//     return res.status(403).json({
//       msg: "User doesnt exist in our in memory db",
//     });
//   }

//   var token = jwt.sign({ username: username }, "shhhhh");
//   return res.json({
//     token,
//   });
// });

// app.get("/users", function (req, res) {
//   const token = req.headers.authorization;
//   try {
//     const decoded = jwt.verify(token, jwtPassword);
//     const username = decoded.username;
//     // return a list of users other than this username from the database
//   } catch (err) {
//     return res.status(403).json({
//       msg: "Invalid token",
//     });
//   }
// });

// app.listen(3000);

const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json())
mongoose.connect("mongodb+srv://Rushi:Rishii1006@cluster0.wau9cpo.mongodb.net/ ")


const User = mongoose.model('Users', {
    name: String,
    email: String,
    password: String
})

app.post("/signup", async function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const name = req.body.name;

    const existingUser = await User.findOne({ email: username });
    if (existingUser) {
        return res.status(400).send("Username already exist");
    }
    const user = new User({
        name: name,
        email: username,
        password: password
    });
    user.save();
    res.json({
        "msg": "User created succesfully"
    })
})




app.listen(3000);



