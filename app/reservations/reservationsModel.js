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
            let sql = "SELECT *, TIME_FORMAT(rt.start_date, '%H:%i') as start_date, TIME_FORMAT(rt.end_date, '%H:%i') as end_date,if(qe.queue_date is not null,DATE_FORMAT(qe.queue_date,'%Y-%m-%d'),null) as queue_date FROM queue qe LEFT JOIN reservations rt ON qe.queue_id = rt.queue_id WHERE rt.car_wash_id = ? AND rt.employee_id = ? GROUP BY rt.queue_id"
            let query = mysql.format(sql, [req.car_wash_id, req.employee_id])
            connection().query(query, (err, result) => {
                if (err) reject(err)
                return resolve(result)
            })
        })
    },
    checkReservation(req) {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM reservations rt WHERE rt.start_date <= ? AND rt.end_date >= ? AND rt.car_wash_id = ? AND rt.reserv_status NOT IN(3)"
            let query = mysql.format(sql, [req.reserveTime, req.reserveTime, req.carwash])
            connection().query(query, (err, result) => {
                if (err) reject(err)
                return resolve(result)
            })
        })
    },

    checkReservationEndDate(req) {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM reservations rt WHERE ? BETWEEN rt.start_date AND rt.end_date  AND rt.car_wash_id = ? AND  rt.reserv_status NOT IN(3) "
            let query = mysql.format(sql, [req.end_date, req.carwash])
            connection().query(query, (err, result) => {
                if (err) reject(err)
                return resolve(result)
            })
        })
    },
    checkReservationBetweenStartDateAndEndDate(req) {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM reservations rt WHERE rt.start_date AND rt.end_date BETWEEN ? AND ? AND rt.car_wash_id = ? AND rt.reserv_status NOT IN(3) ; "
            let query = mysql.format(sql, [req.reserveTime, req.end_date, req.carwash])
            connection().query(query, (err, result) => {
                if (err) reject(err)
                return resolve(result)
            })
        })
    },
    insertReservations(req) {
        return new Promise((resolve, reject) => {
            let insertQuery = "INSERT INTO reservations(total_price , start_date , end_date , reserv_status , employee_id,members_id,car_detail_id , car_wash_id,clean_service_detail_id,queue_id ) VALUES(?,?,?,?,?,?,?,?,?,?)";
            let query = mysql.format(insertQuery, [req.total_price, req.reserveTime, req.end_date, 0, req.employee_id, req.members_id, req.car_detail_id , req.carwash, req.clean_service_detail_id, req.queue_id])
            connection().query(query, (err, result) => {
                if (err) throw err
                return resolve(result);
            })
        })
    },
    updateReservationsSrsWrsid(req) {
        return new Promise((resolve, reject) => {
            let updateQuery = "UPDATE reservations SET reserv_status = ? WHERE queue_id = ?";
            let query = mysql.format(updateQuery, [Number(req.reserv_status) + 1, req.queue_id])
            connection().query(query, (err, result) => {
                if (err) throw err
                return resolve(result);
            })
        })
    },
    updateStatusReservationByStaff(status , queue_id){
        return new Promise((resolve, reject) => {
            let updateQuery = "UPDATE reservations SET reserv_status = ? WHERE queue_id = ?";
            let query = mysql.format(updateQuery, [status , queue_id])
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
    },
    getReservationByQueue(id){
        return new Promise((resolve , reject) => {
            let sql = "SELECT * FROM reservations WHERE queue_id = ? GROUP BY queue_id";
            let query = mysql.format(sql, [id])
            connection().query(query, (err, result) => {
                if (err) reject(err)
                return resolve(result)
            })
        });
    },
    


}
export default ReservationsModel