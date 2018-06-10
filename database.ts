
import * as Mongo from "mongodb";

import * as Server from "./Server";

console.log( "Database starting" );

let databaseURL: string = "mongodb://localhost:27017";
let databaseName: string = "eia2";
let db: Mongo.Db;
let students: Mongo.Collection;



if ( process.env.NODE_ENV == "production" ) {
    //    databaseURL = "mongodb://username:password@hostname:port/database";
    databaseURL = "mongodb://Katrin3:Test123@ds245680.mlab.com:45680/eia2";
    databaseName = "eia2";
}

Mongo.MongoClient.connect( databaseURL, handleConnect );

function handleConnect( _e: Mongo.MongoError, _db: Mongo.Db ): void {
    if ( _e )
        console.log( "Unable to connect to database, error: ", _e );
    else {
        console.log( "Connected to database!" );
        db = _db.db( databaseName );
        students = db.collection( "students" );
    }
}


export function insert(_student: Studi): void {
    let _name: string = _student.name;
    let _firstname: string = _student.firstname;
    let matrikel: string = _student.matrikel.toString();
    let _age: number = _student.age;
    let _gender: boolean = _student.gender;
    let _subject: string = _student.subject;

    let studi: Studi;

    studi = {
        name: _name,
        firstname: _firstname,
        matrikel: parseInt( matrikel ),
        age: _age,
        gender: _gender,
        subject: _subject
    };

    students.insertOne(studi, handleInsert);
}

function handleInsert( _e: Mongo.MongoError ): void {
    console.log( "Database insertion returned -> " + _e );
}


export function findAll(_callback: Function): void {
    let cursor: Mongo.Cursor = students.find();
    cursor.toArray((_e: Mongo.MongoError, _result: Studi[]) => {
        if (_e)
            _callback("Da war ein Fehler " + _e, false);
        else
            _callback(JSON.stringify(_result), true)
    })

}

export function findStudent(_callback: Function, matrikel: number) {
    let cursor: Mongo.Cursor = students.find({"matrikel": matrikel});
    cursor.toArray((_e: Mongo.MongoError, _result: Studi[]) => {
        if (_e)
            _callback("Ich mag Fehler nicht :( " + _e, false);
        else {
            if (_result.length >= 1) {
                _callback(JSON.stringify(_result[0]), true);
            }
        }
    })
}