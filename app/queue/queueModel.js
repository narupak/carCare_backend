const mysql = require('mysql');

import { connection } from '../../db_connection';

const QueueModel = {
    getQueueLqid() {
        return new Promise((resolve, reject) => {
            let sql = "SELECT queue_id FROM queue ORDER BY queue_id DESC LIMIT 1"
            let query = mysql.format(sql)
            connection().query(query, (err, result) => {
                if (err) reject(err)
                return resolve(result)
            })
        })
    },
    insertQueue(req) {
        return new Promise((resolve, reject) => {
            let sql = "INSERT INTO queue(queue_date) VALUES (?)"
            let query = mysql.format(sql, [req.reserveDate])
            connection().query(query, (err, result) => {
                if (err) reject(err)
                return resolve(result)
            })
        })
    },
}
export default QueueModel