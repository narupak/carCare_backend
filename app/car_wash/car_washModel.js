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
            let sql = "SELECT * FROM car_wash_detail cwd LEFT JOIN car_wash cw ON cwd.car_wash_id = cw.car_wash_id LEFT JOIN employee e ON cwd.employee_id = e.employee_id;"
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
    getEmployeeWNotCarWash() {
        return new Promise((resolve, reject) => {
            let getList = [];
            let sql = 'SELECT * FROM employee e' +
                ' LEFT JOIN position p ON e.position_id = p.position_id' +
                ' WHERE NOT e.employee_id IN(SELECT cwd.employee_id FROM car_wash_detail cwd) AND p.position_id IN (4,5);'
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
                ' WHERE cwd.car_wash_id = 1 group by cwd.employee_id;'
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
                ' WHERE cwd.car_wash_id = 2 group by cwd.employee_id;'
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

    InsertEmployeeToCar_wash(req) {
        return new Promise((resolve, reject) => {
            let insertQuery = "INSERT INTO car_wash_detail (employee_id , car_wash_id) VALUES(?,?);";
            let query = mysql.format(insertQuery, [req.employee_id, req.car_wash_id])
            connection().query(query, (err, result) => {
                if (err) throw err
                return resolve(result);
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
    },
    deleteEmployeeFormCar_wash(id) {
        return new Promise((resolve, reject) => {
            let sql = "DELETE FROM car_wash_detail WHERE car_wash_detail_id = ?"
            let query = mysql.format(sql, [id])
            connection().query(query, (err, result) => {
                if (err) reject(err)
                return resolve(result)
            })
        })
    }
}
export default Car_washModel