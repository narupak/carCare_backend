const mysql = require('mysql');

import { connection } from '../../db_connection';

const PromotionModel = {
    getAllPromotion() {
        return new Promise((resolve, reject) => {
            let getList = [];
            let sql = "SELECT * FROM promotion"
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
    insertPromotion(req) {
        return new Promise((resolve, reject) => {
            let sql = "INSERT INTO promotion(detail ,date_start ,date_end ,discount_percent) VALUES (?,?,?,?)"
            let query = mysql.format(sql, [req.promoDetail, req.startDate, req.endDate, req.discount])
            connection().query(query, (err, result) => {
                if (err) reject(err)
                return resolve(result)
            })
        })
    },
    updatePromotionWpmid(req) {
        return new Promise((resolve, reject) => {
            let sql = "UPDATE promotion SET detail = ? ,date_start = ? ,date_end = ? ,discount_percent = ? WHERE promotion_id = ?"
            let query = mysql.format(sql, [req.promoDetail, req.startDate, req.endDate, req.discount, req.promotion_id])
            connection().query(query, (err, result) => {
                if (err) reject(err)
                return resolve(result)
            })
        })
    },
    deletePromotionWpmid(id) {
        return new Promise((resolve, reject) => {
            let sql = "DELETE FROM promotion WHERE promotion_id = ?"
            let query = mysql.format(sql, [id])
            connection().query(query, (err, result) => {
                if (err) reject(err)
                return resolve(result)
            })
        })
    }
}
export default PromotionModel