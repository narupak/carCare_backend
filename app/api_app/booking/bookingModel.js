const mysql = require('mysql');
import { connection } from "../../../db_connection"

const BookingModel = {
    getAllQueue() {
        return new Promise((resolve, reject) => {
            let getList = [];
            let sql = "SELECT queue_id,queue_date FROM queue ORDER BY queue_id DESC LIMIT 1"
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
    getAllQueueCheck(req) {
        return new Promise((resolve, reject) => {
            let getList = [];
            let sql = "SELECT queue_id,queue_date FROM queue WHERE queue_date = ?"
            let query = mysql.format(sql, [req.queue_date])
            connection().query(query, (err, result) => {
                if (err) reject(err)
                result.map(rs => {
                    getList.push(rs);
                })
                return resolve(getList)
            })
        })
    },
    CheckDateRepeat(req) {
        return new Promise((resolve, reject) => {
            let getList = [];
            let sql = "SELECT * FROM reservations rt " +
                'LEFT JOIN queue q ON rt.queue_id = q.queue_id ' +
                'WHERE ? BETWEEN rt.start_date AND rt.end_date AND rt.car_wash_id = ? AND  rt.reserv_status NOT IN(5,6) AND q.queue_date = ?;'
            let query = mysql.format(sql, [req.start_time, req.car_wash_id, req.queue_date])
            connection().query(query, (err, result) => {
                if (err) reject(err)
                result.map(rs => {
                    getList.push(rs);
                })
                return resolve(getList)
            })
        })
    },

    getCleanServiceDetailWcsdid(req) {
        return new Promise((resolve, reject) => {
            let getList = [];
            let sql = "SELECT * FROM clean_service_detail WHERE clean_service_detail_id = ?"
            let query = mysql.format(sql, [req])
            connection().query(query, (err, result) => {
                if (err) console.log(err)
                result.map(rs => {
                    getList.push(rs);
                })
                return resolve(getList)
            })
        })
    },
    getAllReservation() {
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
    getAllReservationNOTStatus() {
        return new Promise((resolve, reject) => {
            let getList = [];
            let sql = "SELECT * FROM reservations rt LEFT JOIN queue q ON rt.queue_id = q.queue_id WHERE reserv_status NOT IN(5,6);"
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

    insertQueue(req) {
        return new Promise((resolve, reject) => {
            let insertQuery = "INSERT INTO queue(queue_date) VALUES(?)"
            let query = mysql.format(insertQuery, [req.queue_date])
            connection().query(query, (err, result) => {
                if (err) throw err
                return resolve(result);
            })
        })
    },
    insertReservation(req) {
        console.log(req);
        return new Promise((resolve, reject) => {
            let insertQuery = "INSERT INTO reservations(total_price,start_date,end_date,reserv_status,employee_id,members_id,car_detail_id,car_wash_id,clean_service_detail_id,queue_id,promotion_id) VALUES(?,?,?,?,?,?,?,?,?,?,?)"
            let query = mysql.format(insertQuery, [req.total_price, req.start_time, req.end_time, 0, 0, req.member_id, req.car_detail_id, req.car_wash_id, req.clean_service_detail_id_use, req.queue_id, req.promotion_id])
            connection().query(query, (err, result) => {
                if (err) throw err
                return resolve(result);
            })
        })
    }
}
export default BookingModel