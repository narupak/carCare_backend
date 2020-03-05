const mysql = require('mysql');

import bcrypt from 'bcrypt'
import { connection } from '../../db_connection';

const Clean_service_detailModel = {
    getCleanServiceDetailByTypeCar(id){
        return new Promise((resolve, reject) => {
            let insertQuery = "SELECT * FROM clean_service_detail LEFT JOIN clean_service ON clean_service_detail.clean_service_id = clean_service.clean_service_id WHERE clean_service_detail.type_car_id = ?";
            let query = mysql.format(insertQuery, [id])
            connection().query(query, (err, result) => {
                if (err) throw err
                return resolve(result);
            })
        })
    },
    insertClean_service_detail(req) {
        return new Promise((resolve, reject) => {
            let insertQuery = "INSERT INTO clean_service_detail(service_price , service_duration , clean_service_id , type_car_id ) VALUES(?,?,?,?)";
            let query = mysql.format(insertQuery, [req.service_price, req.service_duration, req.clean_service_id, req.type_car_id])
            connection().query(query, (err, result) => {
                if (err) throw err
                return resolve(result);
            })
        })
    },
    updateClean_service_detailSsp_esd_csid_tcidWcsdid(req) {
        return new Promise((resolve, reject) => {
            let sql = "UPDATE clean_service_detail SET service_price = ? , service_duration = ? , clean_service_id = ? , type_car_id = ? WHERE clean_service_detail_id = ?"
            let query = mysql.format(sql, [req.service_price, req.service_duration, req.clean_service_id, req.type_car_id, req.clean_service_detail_id])
            connection().query(query, (err, result) => {
                if (err) reject(err)
                return resolve(result)
            })
        })
    },
    deleteClean_service_detailWcsdid(id) {
        return new Promise((resolve, reject) => {
            let sql = "DELETE FROM clean_service_detail WHERE clean_service_detail_id = ?"
            let query = mysql.format(sql, [id])
            connection().query(query, (err, result) => {
                if (err) reject(err)
                return resolve(result)
            })
        })
    }
}
export default Clean_service_detailModel