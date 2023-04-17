const connection = require('./db.js')
const fs = require('fs')
const { exit } = require('process')
const seed_db = async () => {
    const queryString = await fs.promises.readFile('./seed.sql', 'utf-8')
    const queryArr = queryString.split(';')
    console.log(queryArr)
    for (let query of queryArr){
        if (query.trim().length){
            await connection.query(query.trim()+';', (err, data) => {
                if(!err){
                    console.log('data is: ', data)
                }else {
                    console.log('err is: ', err)
                }
            })
        }
    }
    setTimeout(()=> exit(), 1000)
}
seed_db()