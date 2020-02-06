const mysql = require('mysql');

import { connection } from '../../db_connection';

const ModelModel = {
    getAllModel() {
        return new Promise((resolve, reject) => {
            let getList = [];
            let sql = "SELECT * FROM model"
            let query = mysql.format(sql)
            connection().query(query, (err, result) => {
                if (err) reject(err)
                result.map(rs => {
                    getList.push(rs);
                })
                return resolve(getList)
            })
        })
    },
}
export default ModelModel