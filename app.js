const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const dotenv = require('dotenv')
const { connection } = require('./store.js')

dotenv.config()

app.use(express.json())
const ACTION_TYPES = {
    insert: {start:'INSERT INTO', num_paren: 2},
    select_all: {start: 'SELECT * FROM', num_paren: 0},
    select_all_where: {start:'SELECT', num_paren:0},
    select: {start: 'SELECT', num_paren: 0},
    select_where: {start:'SELECT', num_paren:0}
}
const ACTION_NAMES = {
    insert: 'insert'
}
const generateSelectQueryString = (values, table, conditions) => {
    console.log(conditions)
    if(conditions){
        let conditionString = ''
        const num_vals = Object.keys(conditions).length
        let current = 1
        for (let condition in conditions){
            console.log(condition)
            if(current !== num_vals){
                conditionString += (condition + ' = ' +conditions[condition] + ' AND ')
            } else {
                conditionString += (condition + ' = ' + conditions[condition])
            }
            current++
        }
        return `SELECT ${values} FROM ${table} WHERE ${conditionString};`
    }
    return `SELECT ${values} FROM ${table}`
}
// Potentially create a query string generator funcion to build simple query strings by default
app.get('/messages/:user_id', async (req,res) => {
    queryString = `SELECT * FROM messages WHERE user_id = ${req.params.user_id}`
    const messages = await connection(generateSelectQueryString('id', 'messages',{id: 1}))
    if(messages){
        res.send(messages)
    }
})
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
app.post('/shout/:topic', async (req,res) => {
    // topic-a or topic-b as req.params.topic
    const subscribers = await new Promise((resolve, reject)=>{
        connection.query(`SELECT subscribers.user_id FROM topics INNER JOIN subscribers ON topics.id = subscribers.topic_id WHERE topic = '${req.params.topic}';`, (err,data) => {
            if(!err){
                resolve(data)
            } else {
                reject(err)
            }
        })
    })
    if(subscribers){
        for (let subscriber of subscribers){
            await new Promise((resolve,reject)=>{
                connection.query(`INSERT INTO messages (body, user_id, is_active) VALUES ('${req.body.messageBody}', ${subscriber.user_id}, 1);`, (err,data) => {
                    if(!err){
                        resolve(data)
                    } else {
                        reject(err)
                    }
                })
            })
        }
    }
    res.send(subscribers)
})
app.all('/*', (req,res) => {
    console.log(req.path)
    res.send('Endpoint does not exist')
})

app.listen(PORT, ()=> console.log('listening on port', PORT))