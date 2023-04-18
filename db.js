const db = require('mysql')
const dotenv =require('dotenv')
dotenv.config()
// created connection string
// host is where the database is hosted
// user is the user your app is logging on to
// default port is 3306
const connection = db.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PW,
    database: 'test_mysql'
})
console.log(process.env.MYSQL_HOST, process.env.MYSQL_PW, process.env.USER)

module.exports = connection