const mysql = require('mysql');

import { connection } from '../../db_connection';

const Withdraw_returnModel = {
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
    updateWash_toolSedWwrid(req) {
        return new Promise((resolve, reject) => {
            let insertQuery = "UPDATE withdraw_return SET date_end = ? WHERE withdraw_return_id = ?";
            let query = mysql.format(insertQuery, [req.date_end, req.withdraw_return_id])
            connection().query(query, (err, result) => {
                if (err) throw err
                return resolve(result);
            })
        })
    },
}
export default Withdraw_returnModel