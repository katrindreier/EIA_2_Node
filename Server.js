"use strict";
const Http = require("http");
const Url = require("url");
const Database = require("./Database");
//definiere Server Port
let port = process.env.PORT;
if (port == undefined)
    port = 8200;
// Homogenes assoziatives Array zur Speicherung einer Person unter der Matrikelnummer
let studiHomoAssoc = {};
/*   let server: Http.Server = Http.createServer((_request: Http.IncomingMessage, _response: Http.ServerResponse) => {
       _response.setHeader("content-type", "text/html; charset=utf-8");
       _response.setHeader("Access-Control-Allow-Origin", "*");
   });*/
let server = Http.createServer();
server.addListener("request", handleRequest);
server.listen(port);
function handleRequest(_request, _response) {
    let query = Url.parse(_request.url, true).query;
    console.log(query["command"]);
    if (query["command"]) {
        switch (query["command"]) {
            case "insert":
                insertRequest(query, _response);
                break;
            case "refresh":
                refreshRequest(_response);
                break;
            case "search":
                searchRequest(query, _response);
                break;
            default:
                errorHandler();
        }
    }
}
function errorHandler() {
    alert("Funktion nicht gefunden!");
}
function insertRequest(query, _response) {
    let obj = JSON.parse(query["data"]);
    let _name = obj.name;
    let _firstname = obj.firstname;
    let matrikel = obj.matrikel.toString();
    let _age = obj.age;
    let _gender = obj.gender;
    let _subject = obj.subject;
    let studi;
    studi = {
        name: _name,
        firstname: _firstname,
        matrikel: parseInt(matrikel),
        age: _age,
        gender: _gender,
        subject: _subject
    };
    studiHomoAssoc[matrikel] = studi;
    Database.insert(studi);
    _response.write("Daten in Datenbank gespeichtert!");
}
function refreshRequest(_response) {
    console.log(studiHomoAssoc);
    for (let matrikel in studiHomoAssoc) {
        let studi = studiHomoAssoc[matrikel];
        let line = matrikel + ": ";
        line += studi.subject + ", " + studi.name + ", " + studi.firstname + ", " + studi.age + " Jahre, ";
        line += studi.gender ? "Male" : "Female";
        line += "\n";
        _response.write(line);
    }
}
function searchRequest(query, _response) {
    let studi = studiHomoAssoc[query["searchFor"]];
    if (studi) {
        let line = query["searchFor"] + ": ";
        line += studi.subject + ", " + studi.name + ", " + studi.firstname + ", " + studi.age + " Jahre ";
        line += studi.gender ? "Male" : "Female";
        _response.write(line);
    }
    else {
        _response.write("Keine Daten in Datenbank gefunden!");
    }
}
function respond(_response, _text) {
    _response.setHeader("content-type", "text/html; charset=utf-8");
    _response.setHeader("Access-Control-Allow-Origin", "*");
    _response.write(_text);
    _response.end();
}
//# sourceMappingURL=Server.js.map