const mysql = require('mysql');

import { connection } from '../../db_connection';

const PromotionModel = {
    getAllPromotion() {
        return new Promise((resolve, reject) => {
            let getList = [];
            let sql = "SELECT promotion_id,detail,DATE_FORMAT(date_start,'%Y-%m-%d') as date_start ,DATE_FORMAT(date_end,'%Y-%m-%d') as date_end,discount_percent,promo_img FROM promotion"
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
    getAllPromotionById(req) {
        return new Promise((resolve, reject) => {
            let getList = [];
            let sql = "SELECT promotion_id,detail,DATE_FORMAT(date_start,'%Y-%m-%d') as date_start ,DATE_FORMAT(date_end,'%Y-%m-%d') as date_end,discount_percent,promo_img " +
           ' FROM promotion WHERE promotion_id = ?;'
            let query = mysql.format(sql, [req.promotion_id])
            connection().query(query, (err, result) => {
                if (err) reject(err)
                result.map(rs => {
                    getList.push(rs);
                })
                return resolve(getList)
            })
        })
    },
    getPromotionByDate(req) {
        return new Promise((resolve, reject) => {
            let getList = [];
            let sql = "SELECT promotion_id,detail,DATE_FORMAT(date_start,'%Y-%m-%d') as date_start ,DATE_FORMAT(date_end,'%Y-%m-%d') as date_end,discount_percent,promo_img FROM promotion" +
            ' WHERE ? BETWEEN date_start AND date_end';
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
    insertPromotion(req) {
        return new Promise((resolve, reject) => {
            let sql = "INSERT INTO promotion(detail ,date_start ,date_end ,discount_percent , promo_img) VALUES (?,?,?,?,?)"
            let query = mysql.format(sql, [req.promoDetail, req.startDate, req.endDate, req.discount , req.promo_img])
            connection().query(query, (err, result) => {
                if (err) reject(err)
                return resolve(result)
            })
        })
    },
    updatePromotionWpmid(req) {
        return new Promise((resolve, reject) => {
            let sql = "UPDATE promotion SET detail = ? ,date_start = ? ,date_end = ? ,discount_percent = ? ,promo_img = ? WHERE promotion_id = ?"
            let query = mysql.format(sql, [req.promoDetail, req.startDate, req.endDate, req.discount, req.promo_img ,req.promotion_id])
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