const mysql = require('mysql');

import bcrypt from 'bcrypt'
import { connection } from '../../db_connection';

const Wash_toolModel = {
    getAllWash_tool() {
        return new Promise((resolve, reject) => {
            let getList = [];
            let sql = "SELECT * FROM wash_tool"
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
    getWash_toolWPosition(id) {
        return new Promise((resolve, reject) => {
            let getList = [];
            let sql = 'select * from wash_tool w' +
            ' left join position p on w.position_id = p.position_id' +
            ' left join employee e on w.employee_id = e.employee_id' +
            ' where w.position_id = ?';
            let query = mysql.format(sql , [id])
            connection().query(query, (err, result) => {
                if (err) reject(err)
                result.map(rs => {
                    getList.push(rs);
                })
                return resolve(getList)
            })
        })
    },
    getWash_toolWwtid(req) {
        return new Promise((resolve, reject) => {
            let getList = [];
            let sql = "SELECT amount FROM wash_tool WHERE wash_tool_id = ?"
            let query = mysql.format(sql, [req.wash_tool_id])
            connection().query(query, (err, result) => {
                if (err) reject(err)
                result.map(rs => {
                    getList.push(rs);
                })
                return resolve(getList)
            })
        })
    },
    insertWash_tool(req) {
        return new Promise((resolve, reject) => {
            let insertQuery = "INSERT INTO wash_tool(tool_name , amount , tool_status , employee_id) VALUES(?,?,?,?)";
            let query = mysql.format(insertQuery, [req.tool_name, req.amount, req.tool_status, req.employee_id])
            connection().query(query, (err, result) => {
                if (err) throw err
                return resolve(result);
            })
        })
    },
    updateWash_toolStn_am_tsWwtid(req) {
        return new Promise((resolve, reject) => {
            let insertQuery = "UPDATE wash_tool SET tool_name = ? ,amount = ? ,tool_status = ? WHERE wash_tool_id = ?";
            let query = mysql.format(insertQuery, [req.tool_name, req.amount, req.tool_status, req.wash_tool_id])
            connection().query(query, (err, result) => {
                if (err) throw err
                return resolve(result);
            })
        })
    },
    updateWash_toolSamWamtid(req) {
        console.log(req)
        return new Promise((resolve, reject) => {
            let insertQuery = "UPDATE wash_tool SET amount = ? WHERE wash_tool_id = ?";
            let query = mysql.format(insertQuery, [req.total, req.wash_tool_id])
            connection().query(query, (err, result) => {
                if (err) throw err
                return resolve(result);
            })
        })
    },
    updateWash_toolSamWwtid(req) {
        return new Promise((resolve, reject) => {
            let insertQuery = "UPDATE wash_tool SET tool_name = ? ,amount = ? ,tool_status = ? WHERE wash_tool_id = ?";
            let query = mysql.format(insertQuery, [req.tool_name, req.amount, req.tool_status, req.wash_tool_id])
            connection().query(query, (err, result) => {
                if (err) throw err
                return resolve(result);
            })
        })
    },
    updateWash_toolStamWwtid(req) {
        return new Promise((resolve, reject) => {
            let insertQuery = "UPDATE wash_tool SET tool_name = ? ,amount = ? ,tool_status = ? WHERE wash_tool_id = ?";
            let query = mysql.format(insertQuery, [req.tool_name, req.amount, req.tool_status, req.wash_tool_id])
            connection().query(query, (err, result) => {
                if (err) throw err
                return resolve(result);
            })
        })
    },
    deleteWash_toolWwtid(id) {
        return new Promise((resolve, reject) => {
            let sql = "DELETE FROM wash_tool WHERE wash_tool_id = ?"
            let query = mysql.format(sql, [id])
            connection().query(query, (err, result) => {
                if (err) reject(err)
                return resolve(result)
            })
        })
    }
}
export default Wash_toolModel