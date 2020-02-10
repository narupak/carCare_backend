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
            let sql = "SELECT * FROM car_detail as cd LEFT JOIN model as m ON cd.model_id = m.model_id LEFT JOIN car as c ON cd.car_id = c.car_id LEFT JOIN type_car as tc ON cd.type_car_id = tc.type_car_id"
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
    getAllWithdraw_returnJWash_toolJEmployee() {
        return new Promise((resolve, reject) => {
            let getList = [];
            let sql = "SELECT *,if(wr.date_start is not null,DATE_FORMAT(wr.date_start,'%Y-%m-%d'),null) as date_start , if(wr.date_end is not null,DATE_FORMAT(wr.date_end,'%Y-%m-%d'),null) as date_end FROM withdraw_return  as wr LEFT JOIN wash_tool as wt ON wr.wash_tool_id = wt.wash_tool_id LEFT JOIN employee as em ON wt.employee_id = em.employee_id"
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
    getAllReservationsJEmployeeJMembersJCar_washJType_carJPosition() {
        return new Promise((resolve, reject) => {
            let getList = [];
            let sql = "SELECT *,if(rt.reserv_date is not null,DATE_FORMAT(rt.reserv_date,'%Y-%m-%d'),null) as reserv_date FROM reservations  as rt LEFT JOIN employee as ep ON rt.employee_id = ep.employee_id LEFT JOIN members as mb ON rt.members_id = mb.members_id LEFT JOIN car_wash as cw ON rt.car_wash_id = cw.car_wash_id LEFT JOIN type_car as tc ON rt.type_car_id = tc.type_car_id"
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