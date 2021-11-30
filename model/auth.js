var mongoService = require('../service/mongodb');
const http = require("http");
const { resolve } = require('path');
class Auth {

    async login(user, pass) {

        var mongo;
        async function validate(user) {

            return new Promise((resolve, reject) => {
                //let mongoS = new mongoService();
                //mongo = await mongoS.startServer();
                // Use connect method to connect to the server
//                console.log('Connected successfully to server');
                //const db = mongo.db("Ares-Shop");
                //const collection = db.collection('login');
                //const findResult = await collection.find({}).toArray();
                const data = new TextEncoder().encode(
                    JSON.stringify({
                        "actionName": "userLogIn",
                        "data": {
                            "user": user,
                            "password": pass
                        }
                    })
                );

                const options = {
                    hostname: 'brain-control-ares',
                    port: 3000,
                    path: '/api/v1/userLogin',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': data.length
                    }
                }

                const req = http.request(options, res => {
                    console.log(`statusCode: ${res.statusCode}`)
                    //resolve(JSON.stringify([res]));
                    res.setEncoding('utf8');
                    let response;
                    res.on('data', d => {
                        //process.stdout.write(d);
                        response = d
                    });
                    res.on("end", ()=>{
                        //console.log(response);
                        resolve(response);
                    });
                })

                req.on('error', error => {
                    console.error(error)
                })

                req.write(data)
                req.end();
                //console.log('Found documents =>', findResult);
            });
        }

        return await validate(user, pass)
            .catch(console.error)
        //.finally(() => mongo.close());
    }
}

module.exports = Auth;