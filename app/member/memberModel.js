const mysql = require('mysql');

import bcrypt from 'bcrypt'
import { connection } from '../../db_connection';

const MemberModel = {
    getAllMember() {
        return new Promise((resolve, reject) => {
            let getList = [];
            let sql = "SELECT * FROM members mb LEFT JOIN members_detail mbd ON mb.members_id = mbd.members_id"
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
            let sql = "SELECT * FROM members mb LEFT JOIN members_detail mbd ON mb.members_id = mbd.members_id WHERE mbd.members_fname LIKE '" + fname + "__%'"
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
            let sql = "SELECT * FROM members mb "+
                        " LEFT JOIN members_detail mbd ON mb.members_id = mbd.members_id "+
                        " WHERE mbd.member_cashier_id = ? GROUP BY mbd.members_id";
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
    insertMember(){
        return new Promise((resolve, reject) => {
                    let insertQuery = "INSERT INTO members(members_date) VALUES(?)";
                    let query = mysql.format(insertQuery, [new Date()])
                    connection().query(query, (err, result) => {
                        if (err) throw err
                        return resolve(result);
                    })  
        })
    },
    insertMemberDetail(req) {
        return new Promise((resolve, reject) => {
            bcrypt.hash(req.password, 12, (err, hash) => {
                const dateTime = new Date().toISOString().slice(0, 19).replace('T', ' ')
                    let insertQuery = "INSERT INTO members_detail(members_username , members_password , members_fname , members_lname , members_address , members_tel , create_datetime,member_cashier_id , member_license , member_car_detail_id, members_id ) VALUES(?,?,?,?,?,?,?,?,?,?,?)";
                    let query = mysql.format(insertQuery, [req.username, hash, req.fname, req.lname, req.address, req.tel, dateTime, req.cashier_id , req.license , req.car_detail_id , req.members_id])
                    connection().query(query, (err, result) => {
                        if (err) throw err
                        return resolve(result);
                    })  
            })
        })
    },
    insertMemberByUpdate(req) {
        return new Promise((resolve, reject) => {
                const dateTime = new Date().toISOString().slice(0, 19).replace('T', ' ')
                    let insertQuery = "INSERT INTO members_detail(members_username , members_password , members_fname , members_lname , members_address , members_tel , create_datetime,member_cashier_id , member_license , member_car_detail_id, members_id ) VALUES(?,?,?,?,?,?,?,?,?,?,?)";
                    let query = mysql.format(insertQuery, [req.username, req.password, req.fname, req.lname, req.address, req.tel, dateTime, req.cashier_id , req.license , req.car_detail_id , req.members_id])
                    connection().query(query, (err, result) => {
                        if (err) throw err
                        return resolve(result);
                    })  
        })
    },
    updateMemberSef_el_etWeid(user) {
        return new Promise((resolve, reject) => {
            let sql = "UPDATE members_detail SET members_fname = ? , members_lname = ? , members_tel = ? , member_license = ? , member_car_detail_id = ? WHERE members_id = ?"
            let query = mysql.format(sql, [user.fname, user.lname, user.tel, user.id , user.license , user.car_detail_id])
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
    },
    deleteMemberDetail(id) {
        return new Promise((resolve, reject) => {
            let sql = "DELETE FROM members_detail WHERE members_id = ?"
            let query = mysql.format(sql, [id])
            connection().query(query, (err, result) => {
                if (err) reject(err)
                return resolve(result)
            })
        })
    },
    getMemberid() {
        return new Promise((resolve, reject) => {
            let sql = "SELECT members_id FROM members ORDER BY members_id DESC LIMIT 1"
            let query = mysql.format(sql)
            connection().query(query, (err, result) => {
                if (err) reject(err)
                return resolve(result)
            })
        })
    },
    getMemberForEdit(id){
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM members mb LEFT JOIN members_detail mbd ON mb.members_id = mbd.members_id"+
                        " LEFT JOIN car_detail cd ON mbd.member_car_detail_id = cd.car_detail_id"+
                        " LEFT JOIN model m ON cd.model_id = m.model_id"+
                        " LEFT JOIN car c ON cd.car_id = c.car_id"+
                        " LEFT JOIN type_car tc ON cd.type_car_id = tc.type_car_id"+
                        " WHERE mbd.members_id = ?";
            let query = mysql.format(sql, [id]);
            connection().query(query, (err, result) => {
                if (err) reject(err)
                return resolve(result)
            })
        })
    }
}
export default MemberModel