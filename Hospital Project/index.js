// const express = require("express");

// const app = express();

// const port = 3000

// function sum(n) {
//     let ans = 0;
//     for (let i = 0; i <= n; i++) {
//         ans = ans + i;
//     }
//     return ans
// }

// app.get('/', function (req, res) {
//     const n = req.query.n;
//     const ans = sum(n);
//     res.send("Hi your ans is : " + ans);
// })

// app.listen(port);

const express = require("express");
const app = express();
const port = 3000;

const users = [{
    name: 'john',
    kidneys: [{
        healthy: false
    }]
}];

app.use(express.json());

app.get("/", function (req, res) {
    const johnKidney = users[0].kidneys;
    const numberOfKidneys = johnKidney.length;
    let numberOfHealthyKidneys = 0;
    for (let i = 0; i < johnKidney.length; i++
    ) {
        if (johnKidney[i].healthy) {
            numberOfHealthyKidneys = numberOfHealthyKidneys + i;
        }
    }

    const numberOfUnhealthyKidneys = numberOfKidneys - numberOfHealthyKidneys;
    res.json({
        numberOfKidneys,
        numberOfHealthyKidneys,
        numberOfUnhealthyKidneys
    })
})

app.post("/", function (req, res) {
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        healthy: isHealthy
    })
    res.json({
        msg: "Done!"
    })
})

app.put("/", function (req, res) {
    for (let i = 0; i < users[0].kidneys.length; i++) {
        users[0].kidneys[i].healthy = true;
    }
    res.json({

    })
})

app.delete("/", function (req, res) {
    const newKidneys = [];
    for (let i = 0; i < users[0].kidneys.length; i++) {
        if (users[0].kidneys[i].healthy) {
            newKidneys.push({
                healthy: true
            })
        }
    }
    users[0].kidneys = newKidneys;
    res.json({ msg: "DOne!" })
})


app.listen(port);
