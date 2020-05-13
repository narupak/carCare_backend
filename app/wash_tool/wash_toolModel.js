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
    getWash_tool() {
        return new Promise((resolve, reject) => {
            let getList = [];
            let sql = "SELECT * FROM wash_tool LEFT JOIN clean_service  ON wash_tool.clean_service_id = clean_service.clean_service_id;"
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
            let sql = 'SELECT * FROM wash_tool w ' +
                ' LEFT JOIN clean_service c ON w.clean_service_id = c.clean_service_id ' +
                ' LEFT JOIN clean_service_detail csd ON c.clean_service_id = csd.clean_service_id ' +
                ' LEFT JOIN position p ON csd.position_id = p.position_id ' +
                ' WHERE csd.position_id = ? GROUP BY w.wash_tool_id';
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
    getWash_toolWwtid(req) {
        return new Promise((resolve, reject) => {
            let getList = [];
            let sql = "SELECT amount FROM wash_tool WHERE wash_tool_id = ?;"
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
    getWash_toolIdWAssignment(wash_tool_id) {
        return new Promise((resolve, reject) => {
            let getList = [];
            let sql = "SELECT * FROM wash_tool WHERE wash_tool_id = ?;"
            let query = mysql.format(sql, [wash_tool_id])
            connection().query(query, (err, result) => {
                if (err) reject(err)
                result.map(rs => {
                    getList.push(rs);
                })
                return resolve(getList)
            })
        })
    },
    getWash_toolWAssignment(service) {
        return new Promise((resolve, reject) => {
            let getList = [];
            let sql = "SELECT * from wash_tool wt " +
                "LEFT JOIN clean_service cs ON wt.clean_service_id = cs.clean_service_id " +
                "LEFT JOIN clean_service_detail csd ON cs.clean_service_id = csd.clean_service_id " +
                "WHERE cs.service_name LIKE '" + service + "' GROUP BY wt.wash_tool_id;"
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
    insertWash_tool(req) {
        return new Promise((resolve, reject) => {
            let insertQuery = "INSERT INTO wash_tool(tool_name , amount , employee_id , clean_service_id) VALUES(?,?,?,?)";
            let query = mysql.format(insertQuery, [req.tool_name, req.amount, req.employee_id, req.clean_service])
            connection().query(query, (err, result) => {
                if (err) throw err
                return resolve(result);
            })
        })
    },
    updateWash_toolStn_am_tsWwtid(req) {
        return new Promise((resolve, reject) => {
            let insertQuery = "UPDATE wash_tool SET tool_name = ? ,amount = ? ,clean_service_id = ? WHERE wash_tool_id = ?";
            let query = mysql.format(insertQuery, [req.tool_name, req.amount, req.clean_service, req.wash_tool_id])
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
    updateWash_toolByAssignment(total, wash_tool_id) {
        console.log(req)
        return new Promise((resolve, reject) => {
            let insertQuery = "UPDATE wash_tool SET amount = ? WHERE wash_tool_id = ?";
            let query = mysql.format(insertQuery, [total, wash_tool_id])
            connection().query(query, (err, result) => {
                if (err) throw err
                return resolve(result);
            })
        })
    },
    updateWash_toolByAssignment(total, wash_tool_id) {
        return new Promise((resolve, reject) => {
            let insertQuery = "UPDATE wash_tool SET amount = ? WHERE wash_tool_id = ?";
            let query = mysql.format(insertQuery, [total, wash_tool_id])
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