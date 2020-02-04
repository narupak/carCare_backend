const mysql = require('mysql');

import bcrypt from 'bcrypt'
import { connection } from '../../db_connection';

const MemberModel = {
    getAllMember() {
        return new Promise((resolve, reject) => {
            let employeeList = [];
            let sql = "SELECT * FROM members"
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
    insertMember(req) {
        return new Promise((resolve, reject) => {
            bcrypt.hash(req.password, 12, (err, hash) => {
                let insertQuery = "INSERT INTO members(members_username , members_password , members_fname , members_lname , members_address , members_tel , create_datetime ) VALUES(?,?,?,?,?,?,?)";
                let query = mysql.format(insertQuery, [req.username, hash, req.fname, req.lname, req.address, req.tel, req.create_datetime])
                connection().query(query, (err, result) => {
                    if (err) throw err
                    return resolve(result);
                })
            })
        })
    },
    updateMemberSef_el_etWeid(user) {
        return new Promise((resolve, reject) => {
            let sql = "UPDATE members SET members_fname = ? , members_lname = ? , members_tel = ? WHERE members_id = ?"
            let query = mysql.format(sql, [user.fname, user.lname, user.tel, user.id])
            connection().query(query, (err, result) => {
                if (err) reject(err)
                return resolve(result)
            })
        })
    },
    deleteMemberWeid(id) {
        return new Promise((resolve, reject) => {
            let sql = "DELETE FROM members WHERE members_id = ?"
            let query = mysql.format(sql, [id])
            connection().query(query, (err, result) => {
                if (err) reject(err)
                return resolve(result)
            })
        })
    }
}
export default MemberModel