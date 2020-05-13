const mysql = require('mysql');

import { connection } from '../../db_connection';

const Withdraw_returnModel = {
    getWithdraw_return(employee_id, status) {
        return new Promise((resolve, reject) => {
            let getList = [];
            let sql = "SELECT * FROM withdraw_return wr WHERE wr.employee_id = ? AND wr.approve_status = ?;"
            let query = mysql.format(sql, [employee_id, status])
            connection().query(query, (err, result) => {
                if (err) reject(err)
                result.map(rs => {
                    getList.push(rs);
                })
                return resolve(getList);
            })
        })
    },

    insertWithdraw_return(req) {
        return new Promise((resolve, reject) => {
            let insertQuery = "INSERT INTO withdraw_return(wash_tool_id , withdraw_amount, date_start , approve_status , employee_id, status_action) VALUES(?,?,?,?,?,?)";
            let query = mysql.format(insertQuery, [req.wash_tool_id, req.amount, req.date_start, req.approve_status, req.employee_id, req.status_action])
            connection().query(query, (err, result) => {
                if (err) throw err
                return resolve(result);
            })
        })
    },
    insertWithdraw_returnByAssignment(wash_tool_id, amount, date, approve_status, employee_id) {
        return new Promise((resolve, reject) => {
            let insertQuery = "INSERT INTO withdraw_return(wash_tool_id , withdraw_amount, date_start , approve_status , employee_id) VALUES(?,?,?,?,?)";
            let query = mysql.format(insertQuery, [wash_tool_id, amount, date, approve_status, employee_id,])
            connection().query(query, (err, result) => {
                if (err) throw err
                return resolve(result);
            })
        })
    },
    updateWash_toolSedWwrid(req) {
        return new Promise((resolve, reject) => {
            let insertQuery = "UPDATE withdraw_return SET date_end = ? , status_action = ? , approve_status = ? WHERE withdraw_return_id = ?";
            let query = mysql.format(insertQuery, [req.date_end, req.status_action, req.approve_status, req.withdraw_return_id])
            connection().query(query, (err, result) => {
                if (err) throw err
                return resolve(result);
            })
        })
    },
    updatWithdraw_returnSasWwrid(req) {
        return new Promise((resolve, reject) => {
            let insertQuery = "UPDATE withdraw_return SET date_end = ? , approve_status = ? WHERE withdraw_return_id = ?";
            let query = mysql.format(insertQuery, [req.date_end, req.approve_status, req.withdraw_return_id])
            connection().query(query, (err, result) => {
                if (err) throw err
                return resolve(result);
            })
        })
    },
    updatWithdraw_returnByAssignment(date, approve_status, withdraw_return_id) {
        return new Promise((resolve, reject) => {
            let insertQuery = "UPDATE withdraw_return SET date_end = ? , approve_status = ? WHERE withdraw_return_id = ?";
            let query = mysql.format(insertQuery, [date, approve_status, withdraw_return_id])
            connection().query(query, (err, result) => {
                if (err) throw err
                return resolve(result);
            })
        })
    },
    updateWash_toolSsaWwrid(req) {
        return new Promise((resolve, reject) => {
            let insertQuery = "UPDATE withdraw_return SET status_action = ? , approve_status = ? WHERE withdraw_return_id = ?";
            let query = mysql.format(insertQuery, [req.status_action, req.approve_status, req.withdraw_return_id])
            connection().query(query, (err, result) => {
                if (err) throw err
                return resolve(result);
            })
        })
    },
    updateWash_toolSsaWwridReturn(req) {
        return new Promise((resolve, reject) => {
            let insertQuery = "UPDATE withdraw_return SET approve_status = ? WHERE withdraw_return_id = ?";
            let query = mysql.format(insertQuery, [req.approve_status, req.withdraw_return_id])
            connection().query(query, (err, result) => {
                if (err) throw err
                return resolve(result);
            })
        })
    },
}
export default Withdraw_returnModel