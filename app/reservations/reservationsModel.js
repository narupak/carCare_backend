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
    getTotalPrice(id) {
        return new Promise((resolve, reject) => {
            let sql = "SELECT service_price FROM clean_service_detail WHERE clean_service_detail_id = ?"
            let query = mysql.format(sql, [id])
            connection().query(query, (err, result) => {
                if (err) reject(err)
                return resolve(result)
            })
        })
    },
    insertReservations(req) {
        return new Promise((resolve, reject) => {
            let insertQuery = "INSERT INTO reservations(license , total_price , reserv_date , start_date , end_date , reserv_status , employee_id,members_id,car_wash_id,type_car_id,position_id ) VALUES(?,?,?,?,?,?,?,?,?,?,?)";
            let query = mysql.format(insertQuery, [req.body.license, req.body.total_price, req.body.reserv_date, req.body.start_date, req.body.end_date, 1, req.user.employee_id, req.body.members_id, req.body.carwash, req.body.type_car_id, 0])
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