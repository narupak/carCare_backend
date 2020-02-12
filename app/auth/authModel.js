const mysql = require('mysql');

import bcrypt from 'bcrypt'
import { connection } from '../../db_connection';
import jwt from 'jsonwebtoken'
import config from '../../config';

const AuthModel = {
    getEmployeeByUsername(req) {
        return new Promise((resolve, reject) => {
            let checkAuth = "SELECT * FROM employee WHERE employee_username = ?"
            let query = mysql.format(checkAuth, [req.username])
            connection().query(query, (err, result) => {
                if (err) throw err
                result.map(rs => {
                    const hash = req.password
                    bcrypt.compare(hash, rs.employee_password, (err, isValid) => {
                        if (err) throw err
                        const employee = {
                            id: rs.employee_id,
                            username: rs.employee_username,
                            password: rs.employee_password,
                            fname: rs.employee_fname,
                            lname: rs.employee_lname,
                            tel: rs.employee_tel,
                            status: rs.status,
                            position: rs.position_id,
                            result: isValid,
                            token: `Bearer ${this.genToken(rs)}`
                        }
                        return resolve(employee)
                    })
                })
            })
        })
    },
    getMemberByMembername(req) {
        return new Promise((resolve, reject) => {
            let checkAuth = "SELECT * FROM members WHERE members_username = ?"
            let query = mysql.format(checkAuth, [req.username])
            connection().query(query, (err, result) => {
                if (err) throw err
                result.map(rs => {
                    const hash = req.password
                    bcrypt.compare(hash, rs.members_password, (err, isValid) => {
                        if (err) throw err
                        const member = {
                            id: rs.members_id,
                            username: rs.members_username,
                            password: rs.members_password,
                            fname: rs.members_fname,
                            lname: rs.members_lname,
                            address: rs.members_address,
                            tel: rs.members_tel,
                            status: rs.status,
                            cashier_id: rs.member_cashier_id,
                            result: isValid,
                            token: `Bearer ${this.genTokenMembers(rs)}`
                        }
                        return resolve(member)
                    })
                })
            })
        })
    },
    findById(id) {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM employee WHERE employee_id = ?"
            let query = mysql.format(sql, [id])
            connection().query(query, (err, result) => {
                if (err) reject(err)
                result.map(rs => {
                    return resolve(rs)
                })
            })
        })
    },
    genToken(user) {
        return jwt.sign({ sub: user.employee_id }, config.secretKey, { expiresIn: '1h' })
    },
    genTokenMembers(user) {
        return jwt.sign({ sub: user.members_id }, config.secretKey, { expiresIn: '1h' })
    },
}
export default AuthModel