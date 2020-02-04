const mysql = require('mysql');

import bcrypt from 'bcrypt'
import { connection } from '../../db_connection';

const carModel = {
    getAllCar() {
        return new Promise((resolve, reject) => {
            let employeeList = [];
            let sql = "SELECT * FROM car"
            let query = mysql.format(sql)
            connection().query(query, (err, result) => {
                if (err) reject(err)
                result.map(rs => {
                    employeeList.push(rs);
                })
                return resolve(employeeList)
            })
        })
    },
    insertCar(req) {
        return new Promise((resolve, reject) => {
            let insertQuery = "INSERT INTO car(brand) VALUES(?)";
            let query = mysql.format(insertQuery, [req.brand])
            connection().query(query, (err, result) => {
                if (err) throw err
                return resolve(result);
            })
        })
    },
    deleteCarWcid(id) {
        return new Promise((resolve, reject) => {
            let sql = "DELETE FROM car WHERE car_id = ?"
            let query = mysql.format(sql, [id])
            connection().query(query, (err, result) => {
                if (err) reject(err)
                return resolve(result)
            })
        })
    }
}
export default carModel