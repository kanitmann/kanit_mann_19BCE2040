const express = require("express");
const axios = require("axios");

const app = express();

function result(data) {
    let sortedData = data.sort(function (num1, num2) {
        return (num1 - num2);
    });
    const uniqueVals = [...new Set(sortedData)];
    return uniqueVals;
}


app.get("/numbers", (req, res) => {
    let receivedArray = req.query.url;
    let timeout = 500;
    if (typeof receivedArray === "string") {
        receivedArray = [receivedArray];
    }
    let promiseArr = receivedArray.map((i) =>
        axios.get(i, { timeout: timeout }).then((res) => {
            return res.data.numbers;
        })
    );
    Promise.allSettled(promiseArr).then((results1) => {
        let acceptedResults = [];

        results1.forEach((result) => {
            if (result.status === "fulfilled") {
                acceptedResults = [...acceptedResults, ...result.value];
            }
        });
        res.send(result(acceptedResults));
    });
});

app.listen(1200, () => {
    console.log("Server started");
});