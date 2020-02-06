const mysql = require('mysql');

import bcrypt from 'bcrypt'
import { connection } from '../../db_connection';

const Multi_joinModel = {
    getAllClean_serviceJClean_service_detail() {
        return new Promise((resolve, reject) => {
            let getList = [];
            let sql = "SELECT * FROM clean_service as cs LEFT JOIN clean_service_detail as csd ON cs.clean_service_id = csd.clean_service_id"
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
    getAllClean_service_detailJClean_serviceJType_car() {
        return new Promise((resolve, reject) => {
            let getList = [];
            let sql = "SELECT * FROM clean_service_detail as csd LEFT JOIN clean_service as cs ON csd.clean_service_id = cs.clean_service_id LEFT JOIN type_car as ty ON csd.type_car_id = ty.type_car_id"
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
    getAllCar_detailJClean_serviceJModelJCarJType_car() {
        return new Promise((resolve, reject) => {
            let getList = [];
            let sql = "SELECT * FROM car_detail as cd LEFT JOIN model as m ON cd.model = m.model_id LEFT JOIN car as c ON cd.car_id = c.car_id LEFT JOIN type_car as tc ON cd.type_car_id = tc.type_car_id"
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
}
export default Multi_joinModel