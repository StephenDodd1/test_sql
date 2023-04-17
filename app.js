const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const connection = require('./db.js')

app.use(express.json())
app.post('/create_user', async (req,res) => {
    let result = await new Promise((resolve, reject) => {
        connection.query(`INSERT INTO test (id,user) VALUES (${req.body.id},'${req.body.user}');`, (err,data) =>{
            if(!err){
                resolve(data)
            } else {
                console.log(err)
                reject(err)
            }
        })
    })
    res.send('success')
})

//endpoint to create tables
app.post('/seed_tables', async (req,res)=>{
    connection.query('DROP TABLE IF EXISTS test;')
    let result = await new Promise((resolve,reject) => {
        connection.query('CREATE TABLE test IF NOT EXISTS (id INTEGER NOT NULL, user VARCHAR(40) NOT NULL);', (err, data) =>{
            if(!err){
                resolve(data)
            } else reject(err)
        })
    }) 
    console.log(result)
    res.send('success')
})
app.post('/seed_rows', async (req,res) => {
    let result = await new Promise((resolve, reject) => {
        connnection.query("INSERT INTO test (id,user) VALUES (0,'TEST');", (err,data) =>{
            if(!err){
                resolve(data)
            }
        })
    })
})
app.all('/*', (req,res) => {
    console.log(req.path)
    res.send('Endpoint does not exist')
})

app.listen(PORT, ()=> console.log('listening on port', PORT))