"use strict";
const Http = require("http");
const Url = require("url");
var Server;
(function (Server) {
    //definiere Server Port
    let port = process.env.PORT;
    if (port == undefined)
        port = 8200;
    // Homogenes assoziatives Array zur Speicherung einer Person unter der Matrikelnummer
    let studiHomoAssoc = {};
    let server = Http.createServer((_request, _response) => {
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
    });
    server.addListener("request", clientRequest);
    server.listen(port);
    function clientRequest(_request, _response) {
        let clientQuery = Url.parse(_request.url, true).query;
        console.log(clientQuery["command"]);
        if (clientQuery["command"] == "insert") {
            insertRequest(clientQuery, _response);
        }
        else if (clientQuery["command"] == "refresh") {
            refreshRequest(_response);
        }
        else if (clientQuery["command"] == "search") {
            searchRequest(clientQuery, _response);
        }
        else {
            errorHandler();
        }
        _response.end();
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
        _response.write("Daten in Datenbank gespeichtert");
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
})(Server || (Server = {}));
//# sourceMappingURL=Server.js.map