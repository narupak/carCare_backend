const mysql = require('mysql');

import bcrypt from 'bcrypt'
import { connection } from '../../db_connection';

const car_detailModel = {
    getAllCar_detail() {
        return new Promise((resolve, reject) => {
            let getList = [];
            let sql = "SELECT * FROM car_detail"
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
    getBrandCar(req) {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM car c WHERE c.brand = ? ;";
            let query = mysql.format(sql, [req.addBrand]);
            connection().query(query, (err, result) => {
                if (err) reject(err)
                return resolve(result)
            })
        })
    },
    getModelCar(req) {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM model m WHERE m.model_name = ? ;";
            let query = mysql.format(sql, [req.addModel]);
            connection().query(query, (err, result) => {
                if (err) reject(err)
                return resolve(result)
            })
        })
    },
    insertCar_detail(req) {
        return new Promise((resolve, reject) => {
            let insertQuery = "INSERT INTO car_detail(model_id,car_id,type_car_id) VALUES(?,?,?)";
            let query = mysql.format(insertQuery, [req.model_id, req.car_id, req.type_car_id])
            connection().query(query, (err, result) => {
                if (err) throw err
                return resolve(result);
            })
        })
    },
    insertCar(req) {
        return new Promise((resolve, reject) => {
            let insertQuery = "INSERT INTO car(brand) VALUES(?);";
            let query = mysql.format(insertQuery, [req.addBrand])
            connection().query(query, (err, result) => {
                if (err) throw err
                return resolve(result);
            })
        })
    },
    insertModel(req) {
        return new Promise((resolve, reject) => {
            let insertQuery = "INSERT INTO model(model_name) VALUES(?);";
            let query = mysql.format(insertQuery, [req.addModel])
            connection().query(query, (err, result) => {
                if (err) throw err
                return resolve(result);
            })
        })
    },
    updateCar_detailSm_cid_tcidWcdid(req) {
        return new Promise((resolve, reject) => {
            let updateQuery = "UPDATE car_detail SET model_id = ?,car_id = ? ,type_car_id = ? WHERE car_detail_id = ?";
            let query = mysql.format(updateQuery, [req.model_id, req.car_id, req.type_car_id, req.car_detail_id])
            connection().query(query, (err, result) => {
                if (err) throw err
                return resolve(result);
            })
        })
    },
    deleteCar_detailWcdid(id) {
        return new Promise((resolve, reject) => {
            let sql = "DELETE FROM car_detail WHERE car_detail_id = ?"
            let query = mysql.format(sql, [id])
            connection().query(query, (err, result) => {
                if (err) reject(err)
                return resolve(result)
            })
        })
    }
}
export default car_detailModel