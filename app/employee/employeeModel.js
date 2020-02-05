const mysql = require('mysql');

import bcrypt from 'bcrypt'
import { connection } from '../../db_connection';

const EmployeeModel = {
    getAllEmployee() {
        return new Promise((resolve, reject) => {
            let getList = [];
            let sql = "SELECT * FROM employee"
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
    getEmployeeWpid2() {
        return new Promise((resolve, reject) => {
            let getList = [];
            let sql = "SELECT * FROM employee WHERE position_id = 2"
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
    getEmployeeWpidN12() {
        return new Promise((resolve, reject) => {
            let getList = [];
            let sql = "SELECT * FROM employee WHERE position_id NOT IN (1,2)"
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
    insertEmployee(req) {
        return new Promise((resolve, reject) => {
            bcrypt.hash(req.password, 12, (err, hash) => {
                let insertQuery = "INSERT INTO employee(employee_username , employee_password , employee_fname , employee_lname , employee_tel , status , position_id ) VALUES(?,?,?,?,?,?,?)";
                let query = mysql.format(insertQuery, [req.username, hash, req.fname, req.lname, req.tel, req.status, req.position])
                connection().query(query, (err, result) => {
                    if (err) throw err
                    return resolve(result);
                })
            })
        })
    },
    updateEmployeeSef_el_etWeid(user) {
        return new Promise((resolve, reject) => {
            let sql = "UPDATE employee SET employee_fname = ? , employee_lname = ? , employee_tel = ? WHERE employee_id = ?"
            let query = mysql.format(sql, [user.fname, user.lname, user.tel, user.id])
            connection().query(query, (err, result) => {
                if (err) reject(err)
                return resolve(result)
            })
        })
    },
    deleteEmployeeWeid(id) {
        return new Promise((resolve, reject) => {
            let sql = "DELETE FROM employee WHERE employee_id = ?"
            let query = mysql.format(sql, [id])
            connection().query(query, (err, result) => {
                if (err) reject(err)
                return resolve(result)
            })
        })
    }
}
export default EmployeeModel