const connection = require('./db.js')

exports.connection = (queryString) => {
    console.log(queryString)
    return new Promise((resolve, reject) => {
        connection.query(queryString, (err, data) => {
            if(!err){
                resolve(data)
            } else {
                reject(err)
            }
        })
    })
}