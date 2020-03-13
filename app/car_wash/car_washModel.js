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
    getAllCar_wash_detail() {
        return new Promise((resolve, reject) => {
            let getList = [];
            let sql = "SELECT * FROM car_wash_detail cwd LEFT JOIN car_wash cw ON cwd.car_wash_id = cw.car_wash_id"
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
    getEmployeeWCarwash1() {
        return new Promise((resolve, reject) => {
            let getList = [];
            let sql = 'SELECT * FROM car_wash_detail cwd ' +
                ' LEFT JOIN employee e ON cwd.employee_id = e.employee_id ' +
                ' LEFT JOIN car_wash cw ON cwd.car_wash_id = cw.car_wash_id ' +
                ' LEFT JOIN position p ON e.position_id = p.position_id' +
                ' WHERE cwd.car_wash_id = 1;'
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
    getEmployeeWCarwash2() {
        return new Promise((resolve, reject) => {
            let getList = [];
            let sql = 'SELECT * FROM car_wash_detail cwd ' +
                ' LEFT JOIN employee e ON cwd.employee_id = e.employee_id ' +
                ' LEFT JOIN car_wash cw ON cwd.car_wash_id = cw.car_wash_id ' +
                ' LEFT JOIN position p ON e.position_id = p.position_id' +
                ' WHERE cwd.car_wash_id = 2;'
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
    deleteEmployeeWDate() {
        return new Promise((resolve, reject) => {
            let getList = [];
            let sql = 'DELETE FROM car_wash_detail WHERE DATEDIFF(day,getdate(),thatColumn) < -1'
            let query = mysql.format(sql)
            connection().query(query, (err, result) => {
                if (err) reject(err)
                result.map(rs => {
                    getList.push(rs);
                })
                return resolve(getList)
            })
        })
    }
}
export default Car_washModel