const mysql = require('mysql');
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
    getReservationsWcwidORrsidDESC(req) {
        return new Promise((resolve, reject) => {
            let sql = "SELECT *,if(reserv_date is not null,DATE_FORMAT(reserv_date,'%Y-%m-%d'),null) as reserv_date FROM reservations WHERE car_wash_id = ? AND employee_id = ? GROUP BY start_date  ORDER BY reserv_id DESC"
            let query = mysql.format(sql, [req.car_wash_id, req.employee_id])
            connection().query(query, (err, result) => {
                if (err) reject(err)
                return resolve(result)
            })
        })
    },
    insertReservations(req) {
        return new Promise((resolve, reject) => {
            let insertQuery = "INSERT INTO reservations(license , total_price , reserv_date , start_date , end_date , reserv_status , employee_id,members_id,car_wash_id,type_car_id,clean_service_detail_id,queue_id ) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)";
            let query = mysql.format(insertQuery, [req.license, req.total_price, req.reserveDate, req.reserveTime, req.end_date, 0, req.employee_id, req.members_id, req.carwash, req.type_car_id, req.clean_service_detail_id, req.queue_id])
            connection().query(query, (err, result) => {
                if (err) throw err
                return resolve(result);
            })
        })
    },
    updateReservationsSrsWrsid(req) {
        return new Promise((resolve, reject) => {
            let updateQuery = "UPDATE reservations SET reserv_status = ? WHERE reserv_id = ?";
            let query = mysql.format(updateQuery, [Number(req.reserv_status) + 1, req.reserv_id])
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