const mysql = require('mysql');

import bcrypt from 'bcrypt'
import { connection } from '../../db_connection';

const Type_carModel = {
    getAllType_car() {
        return new Promise((resolve, reject) => {
            let getList = [];
            let sql = "SELECT * FROM type_car"
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
export default Type_carModel