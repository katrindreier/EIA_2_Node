/*import * as Http from "http";
import * as Url from "url";

namespace Server {
    interface AssocStringString {
        [key: string]: string;
    }

    let port: number = process.env.PORT;
    if (port == undefined)
        port = 8100;

    let server: Http.Server = Http.createServer();
    server.addListener("listening", handleListen);
    server.addListener("request", handleRequest);
    server.listen(port);

    function handleListen(): void {
        console.log("Ich höre?");
    }

    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
        console.log("Ich höre Stimmen!");

        let query: AssocStringString = Url.parse(_request.url, true).query;
        let a: number = parseInt(query["a"]);
        let b: number = parseInt(query["b"]);
        
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        
        _response.write("Ich habe dich gehört<br/>");

        for (let key in query)
            console.log(query[key]);

        _response.write("Eingegebene Informationen: " + (query[key]) + "<br>");
        _response.write("Das Ergebnis ist: " + (a + b));

        _response.end();
    }
}*/
"use strict";
var Http = require("http");
var Url = require("url");
var Server;
(function (Server) {
    var port = process.env.PORT;
    if (port == undefined)
        port = 8100;
    var server = Http.createServer();
    server.addListener("listening", handleListen);
    server.addListener("request", handleRequest);
    server.listen(port);
    function handleListen() {
        console.log("Ich höre?");
    }
    function handleRequest(_request, _response) {
        console.log("Ich höre Stimmen!");
        var query = Url.parse(_request.url, true).query;
        var a = parseInt(query["a"]);
        var b = parseInt(query["b"]);
        for (var key in query)
            console.log(query[key]);
        a = 10;
        b = 20;
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _response.write("Ich habe dich gehört<br/>");
        _response.write("Das Ergebnis ist: " + (a + b));
        _response.end();
    }
})(Server || (Server = {}));
//# sourceMappingURL=Server.js.map