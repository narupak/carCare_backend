const mysql = require('mysql');

import bcrypt from 'bcrypt'
import { connection } from '../../db_connection';

const MemberModel = {
    getAllMember() {
        return new Promise((resolve, reject) => {
            let getList = [];
            let sql = "SELECT * FROM members"
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
    getAllMemberWmfL(fname) {
        return new Promise((resolve, reject) => {
            let getList = [];
            let sql = "SELECT * FROM members WHERE members_fname LIKE '" + fname + "__%'"
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
    getMemberWcid(id) {
        return new Promise((resolve, reject) => {
            let getList = [];
            let sql = "SELECT * FROM members WHERE member_cashier_id = ?"
            let query = mysql.format(sql, [id])
            connection().query(query, (err, result) => {
                if (err) reject(err)
                result.map(rs => {
                    getList.push(rs);
                })
                return resolve(getList)
            })
        })
    },
    insertMember(req) {
        return new Promise((resolve, reject) => {
            bcrypt.hash(req.password, 12, (err, hash) => {
                const dateTime = new Date().toISOString().slice(0, 19).replace('T', ' ')
                let insertQuery = "INSERT INTO members(members_username , members_password , members_fname , members_lname , members_address , members_tel , create_datetime,member_cashier_id ) VALUES(?,?,?,?,?,?,?,?)";
                let query = mysql.format(insertQuery, [req.username, hash, req.fname, req.lname, req.address, req.tel, dateTime, req.cashier_id])
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