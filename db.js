const db = require('mysql')

// created connection string
// host is where the database is hosted
// user is the user your app is logging on to
// default port is 3306
const connection = db.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.USER,
    password: process.env.MYSQL_PW,
    database: 'test_mysql'
})

module.exports = connection