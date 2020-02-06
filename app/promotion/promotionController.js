import PromotionModel from "./promotionModel"
const moment = require('moment');

const PromotionController = {
    async getAllPromotion(req, res) {
        if (req.user) {

            let getAllPromotion = await PromotionModel.getAllPromotion()
            res.status(200).json({ result: true, data: getAllPromotion })

        } else {
            res.status(401).json({ 'error': 'UnAuthorized' })
        }
    },
    async insertPromotion(req, res) {
        if (req.user) {
            req.body.startDate = await formatDate(req.body.startDate)
            req.body.endDate = await formatDate(req.body.endDate)

            await PromotionModel.insertPromotion(req.body)

            res.status(201).json({
                "result": "success",
            })
        } else {
            res.status(401).json({ 'error': 'UnAuthorized' })
        }
    },
    async updatePromotionWpmid(req, res) {
        if (req.user) {
            req.body.startDate = await formatDate(req.body.startDate)
            req.body.endDate = await formatDate(req.body.endDate)

            await PromotionModel.updatePromotionWpmid(req.body)

            res.status(201).json({
                "result": "success",
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

let formatDate = async(date) => await moment(date).format('YY-MM-DD')