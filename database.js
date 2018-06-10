"use strict";
const Mongo = require("mongodb");
console.log("Database starting");
let databaseURL = "mongodb://localhost:27017";
let databaseName = "eia2";
let db;
let students;
if (process.env.NODE_ENV == "production") {
    //    databaseURL = "mongodb://username:password@hostname:port/database";
    databaseURL = "mongodb://Katrin3:Test123@ds245680.mlab.com:45680/eia2";
    databaseName = "eia2";
}
Mongo.MongoClient.connect(databaseURL, handleConnect);
function handleConnect(_e, _db) {
    if (_e)
        console.log("Unable to connect to database, error: ", _e);
    else {
        console.log("Connected to database!");
        db = _db.db(databaseName);
        students = db.collection("students");
    }
}
function insert(_student) {
    let _name = _student.name;
    let _firstname = _student.firstname;
    let matrikel = _student.matrikel.toString();
    let _age = _student.age;
    let _gender = _student.gender;
    let _studiengang = _student.studiengang;
    let studi;
    studi = {
        name: _name,
        firstname: _firstname,
        matrikel: parseInt(matrikel),
        age: _age,
        gender: _gender,
        studiengang: _studiengang
    };
    students.insertOne(studi, handleInsert);
}
exports.insert = insert;
function handleInsert(_e) {
    console.log("Insert in Database " + _e);
}
function findAll(_callback) {
    let cursor = students.find();
    cursor.toArray((_e, _result) => {
        if (_e)
            _callback("Error " + _e, false);
        else
            _callback(JSON.stringify(_result), true);
    });
}
exports.findAll = findAll;
function findStudent(_callback, matrikel) {
    let cursor = students.find({ "matrikel": matrikel });
    cursor.toArray((_e, _result) => {
        if (_e)
            _callback("Error " + _e, false);
        else {
            if (_result.length >= 1) {
                _callback(JSON.stringify(_result[0]), true);
            }
        }
    });
}
exports.findStudent = findStudent;
//# sourceMappingURL=database.js.map