const mysql = require('mysql');

import bcrypt from 'bcrypt'
import { connection } from '../../db_connection';

const Booking_detailModel = {
    getAllBooking_detail() {
        return new Promise((resolve, reject) => {
            let getList = [];
            let sql = "SELECT * FROM booking_detail"
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
    insertBooking_detail(req) {
        return new Promise((resolve, reject) => {
            let insertQuery = "INSERT INTO booking_detail(total , time_duration , clean_service_id , reserv_id) VALUES(?,?,?,?)";
            let query = mysql.format(insertQuery, [req.total, req.time_duration, req.clean_service_id, req.reserv_id])
            connection().query(query, (err, result) => {
                if (err) throw err
                return resolve(result);
            })
        })
    },
    deleteBooking_detailWeid(id) {
        return new Promise((resolve, reject) => {
            let sql = "DELETE FROM booking_detail WHERE booking_detail_id = ?"
            let query = mysql.format(sql, [id])
            connection().query(query, (err, result) => {
                if (err) reject(err)
                return resolve(result)
            })
        })
    }
}
export default Booking_detailModel