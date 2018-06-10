"use strict";
const Http = require("http");
const Url = require("url");
const Database = require("./Database");
//definiere Server Port
let port = process.env.PORT;
if (port == undefined)
    port = 8200;
/*
    interface AssocStringString {
        [key: string]: string;
    }

    
    interface Studi {
        name: string;
        firstname: string;
        matrikel: number;
        age: number;
        gender: boolean;
        subject: string;
    }
*/
// Struktur des homogenen assoziativen Arrays, bei dem ein Datensatz der Matrikelnummer zugeordnet ist
/*  interface Studis {
      [matrikel: string]: Studi;
  }
 
  // Homogenes assoziatives Array zur Speicherung einer Person unter der Matrikelnummer
  let studiHomoAssoc: Studis = {};
 
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
                insert(query, _response);
                break;
            case "refresh":
                refresh(_response);
                break;
            case "search":
                search(query, _response);
                break;
            default:
                error();
        }
    }
}
function insert(query, _response) {
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
    Database.insert(studi);
    respond(_response, "Daten in DB gespeichert");
}
function refresh(_response) {
    Database.findAll(function (json) {
        respond(_response, json);
    });
}
function search(query, _response) {
    let Matrikel = parseInt(query["searchFor"]);
    Database.findStudent(Matrikel, function (json) {
        respond(_response, json);
    });
}
function error() {
    alert("Error");
}
function respond(_response, _text) {
    _response.setHeader("content-type", "text/html; charset=utf-8");
    _response.setHeader("Access-Control-Allow-Origin", "*");
    _response.write(_text);
    _response.end();
}
//# sourceMappingURL=Server.js.map