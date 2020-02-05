const mysql = require('mysql');

import bcrypt from 'bcrypt'
import { connection } from '../../db_connection';

const ReservationsModel = {
    getAllReservations() {
        return new Promise((resolve, reject) => {
            let getList = [];
            let sql = "SELECT * FROM reservations"
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
    insertReservations(req) {
        return new Promise((resolve, reject) => {
            let insertQuery = "INSERT INTO reservations(license , total_price , reserv_date , start_date , end_date , reserv_status , employee_id,members_id,car_wash_id,promotion_id ) VALUES(?,?,?,?,?,?,?,?,?,?)";
            let query = mysql.format(insertQuery, [req.license, req.total_price, req.reserv_date, req.start_date, req.end_date, req.reserv_status, req.user.employee_id, req.members_id, req.car_wash_id, req.promotion_id])
            connection().query(query, (err, result) => {
                if (err) throw err
                return resolve(result);
            })
        })
    },
    deleteReservationsWrid(id) {
        return new Promise((resolve, reject) => {
            let sql = "DELETE FROM reservations WHERE reserv_id = ?"
            let query = mysql.format(sql, [id])
            connection().query(query, (err, result) => {
                if (err) reject(err)
                return resolve(result)
            })
        })
    }
}
export default ReservationsModel