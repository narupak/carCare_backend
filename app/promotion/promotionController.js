import PromotionModel from "./promotionModel"
const moment = require('moment');
var formidable = require('formidable');

const PromotionController = {
    getAllPromotion(req, res) {
        if (req.user) {
            PromotionModel.getAllPromotion().then(rs=>{
                const results = rs.map(rest=>{
                    let formReturn = {};
                if(rest.promo_img == null){
                    formReturn = {
                        promotion_id : rest.promotion_id,
                        detail : rest.detail,
                        date_start : rest.date_start,
                        date_end : rest.date_end,
                        discount_percent : rest.discount_percent,
                        promo_img : rest.promo_img,
                    }
                    return formReturn;
                }else{
                    formReturn = {
                        promotion_id : rest.promotion_id,
                        detail : rest.detail,
                        date_start : rest.date_start,
                        date_end : rest.date_end,
                        discount_percent : rest.discount_percent,
                        promo_img : rest.promo_img.toString(),
                    }
                    return formReturn;
                }
                })
                res.status(200).json({ result: true, data: results })
            })

        } else {
            res.status(401).json({ 'error': 'UnAuthorized' })
        }
    },
    async insertPromotion(req, res) {
        if (req.user) {
            var form = new formidable.IncomingForm();
            form.parse(req , async function(err , fields , files){
                if(err){
                    console.error(err.message);
                    return;
                }else{
                    await PromotionModel.insertPromotion(fields)
                    res.status(201).json({
                        "result": "success",
                    })
                }
            })
        }else{
            res.status(401).json({ 'error': 'UnAuthorized' })
        }
    },
    async updatePromotionWpmid(req, res) {
        if (req.user) {
            var form = new formidable.IncomingForm();
            form.parse(req , async function(err , fields , files){
                if(err){
                    console.error(err.message);
                    return;
                }else{
                    await PromotionModel.updatePromotionWpmid(fields)
                    res.status(201).json({
                        "result": "success",
                    })
                }
            })
        } else {
            res.status(401).json({ 'error': 'UnAuthorized' })
        }
    },
    async deletePromotionWpmid(req, res) {
        if (req.user) {
            await PromotionModel.deletePromotionWpmid(req.params.id)

            res.status(201).json({
                "result": "success",
            })
        } else {
            res.status(401).json({ 'error': 'UnAuthorized' })
        }
    }
}
export default PromotionController

// let formatDate = async(date) => await moment(date).format('YY-MM-DD')