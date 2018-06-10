import * as Http from "http"; 
import * as Url from "url";

namespace Server {
    //definiere Server Port
    let port: number = process.env.PORT;        
    if (port == undefined)
        port = 8200;
    

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

    // Struktur des homogenen assoziativen Arrays, bei dem ein Datensatz der Matrikelnummer zugeordnet ist
    interface Studis {
        [matrikel: string]: Studi;
    }
   
    // Homogenes assoziatives Array zur Speicherung einer Person unter der Matrikelnummer
    let studiHomoAssoc: Studis = {};
   
    let server: Http.Server = Http.createServer((_request: Http.IncomingMessage, _response: Http.ServerResponse) => {
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
    });
    server.addListener("request", clientRequest);
    server.listen(port);

    function clientRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
        let clientQuery: AssocStringString = Url.parse(_request.url, true).query;
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

        function errorHandler(): void {
            alert("Funktion nicht gefunden!"); 
        }
        
        function insertRequest(query: AssocStringString, _response: Http.ServerResponse): void {
            let obj: Studi = JSON.parse(query["data"]);
            let _name: string = obj.name;
            let _firstname: string = obj.firstname;  
            let matrikel: string = obj.matrikel.toString(); 
            let _age: number = obj.age;
            let _gender: boolean = obj.gender;
            let _subject: string = obj.subject;  
            let studi: Studi;
            studi = {
                name: _name,
                firstname: _firstname,
                matrikel: parseInt(matrikel),
                age: _age,
                gender: _gender,
                subject: _subject
            };  
            studiHomoAssoc[matrikel] = studi;
            _response.write("Daten in Datenbank gespeichtert!");
         }
   

        function refreshRequest(_response: Http.ServerResponse): void {
            console.log(studiHomoAssoc);
            for (let matrikel in studiHomoAssoc) {  
                let studi: Studi = studiHomoAssoc[matrikel];
                let line: string = matrikel + ": ";
                line += studi.subject + ", " + studi.name + ", " + studi.firstname + ", " + studi.age + " Jahre, ";
                line += studi.gender ? "Male" : "Female"; 
                line += "\n";
                _response.write(line); 
            }                                         
            
            
           
        } 
        
        function searchRequest(query: AssocStringString, _response: Http.ServerResponse): void {
            let studi: Studi = studiHomoAssoc[query["searchFor"]];
            if (studi) {
                let line: string = query["searchFor"] + ": ";
                line += studi.subject + ", " + studi.name + ", " + studi.firstname + ", " + studi.age + " Jahre ";
                line += studi.gender ? "Male" : "Female";                 
                _response.write(line);
            } 
            else {
                _response.write("Keine Daten in Datenbank gefunden!");    
            }    
        }

}