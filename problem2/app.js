

const express = require("express");
const app = express();

const checkWords = [
    "bonfire",
    "cardio",
    "case",
    "character",
    "bonsai",
    "bonabc",
    "corbsai",
    "cardinomo",
    "anti",
    "antique",
    "bonsai2",
    "bonabc2",
    "corbsai2",
    "cardinomo2",
    "anti2",
    "antique2"
];

function checkWord(word) {
    return word
}

app.get("/prefixes", (req, res) => {
    const words = req.query.keywords.split(",");
    let returnData = [];

    words.forEach((word) => {
        const wordMatch =
            checkWords.indexOf(word) > -1
                ? {
                    keyword: word,
                    status: "found",
                    prefix: checkWord(word)
                }
                : { keyword: word, status: "not_found", prefix: "not_applicable" };
        returnData = [...returnData, wordMatch];
    });
    res.send(returnData);
});

app.listen(1200, () => {
    console.log("Server started");
});