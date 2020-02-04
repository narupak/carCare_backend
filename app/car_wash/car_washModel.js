const mysql = require('mysql');

import bcrypt from 'bcrypt'
import { connection } from '../../db_connection';

const Car_washModel = {
    getAllCar_wash() {
        return new Promise((resolve, reject) => {
            let getList = [];
            let sql = "SELECT * FROM car_wash"
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
export default Car_washModel