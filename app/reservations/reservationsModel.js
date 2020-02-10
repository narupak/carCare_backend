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
            let sql = "SELECT service_price,service_duration FROM clean_service_detail WHERE clean_service_detail_id = ?"
            let query = mysql.format(sql, [id])
            connection().query(query, (err, result) => {
                if (err) reject(err)
                return resolve(result)
            })
        })
    },
    insertReservations(req) {
        return new Promise((resolve, reject) => {
            let insertQuery = "INSERT INTO reservations(license , total_price , reserv_date , start_date , end_date , reserv_status , employee_id,members_id,car_wash_id,type_car_id,clean_service_id ) VALUES(?,?,?,?,?,?,?,?,?,?,?)";
            let query = mysql.format(insertQuery, [req.license, req.total_price, req.reserveDate, req.reserveTime, req.end_date, 0, req.employee_id, req.members_id, req.carwash, req.type_car_id, req.clean_service_id])
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