const mysql = require('mysql');

import bcrypt from 'bcrypt'
import { connection } from '../../db_connection';

const PositionModel = {
    getAllPosition() {
        return new Promise((resolve, reject) => {
            let getList = [];
            let sql = "SELECT * FROM position"
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
    getPositionWN1A2() {
        return new Promise((resolve, reject) => {
            let getList = [];
            let sql = "SELECT * FROM position WHERE position_id NOT IN (1,2)"
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
    getPositionWN1A3() {
        return new Promise((resolve, reject) => {
            let getList = [];
            let sql = "SELECT * FROM position WHERE position_id NOT IN (1,2,3)"
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
export default PositionModel