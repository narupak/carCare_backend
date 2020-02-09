import Withdraw_returnModel from "./withdraw_returnModel"
import Wash_toolModel from "../wash_tool/wash_toolModel"

const Withdraw_returnController = {
    async insertWithdraw_return(req, res) {
        if (req.user) {
            let balance = await Wash_toolModel.getWash_toolWwtid(req.body)
            if (balance[0].amount < req.body.amount) {
                res.status(201).json({
                    "result": "sorry, balance is less your request",
                })
            } else {
                await Withdraw_returnModel.insertWithdraw_return(req.body)
                let total = balance[0].amount - req.body.amount
                req.body.total = total
                await Wash_toolModel.updateWash_toolSamWamtid(req.body)
                res.status(201).json({
                    "result": "success",
                })
            }
        } else {
            res.status(401).json({ 'error': 'UnAuthorized' })
        }
    },
    async updateWash_toolSedWwrid(req, res) {
        if (req.user) {
            await Withdraw_returnModel.updateWash_toolSedWwrid(req.body)
            let balance = await Wash_toolModel.getWash_toolWwtid(req.body)
            let total = balance[0].amount + req.body.amount
            req.body.total = total
            await Wash_toolModel.updateWash_toolSamWamtid(req.body)
            res.status(201).json({
                "result": "success",
            })
        } else {
            res.status(401).json({ 'error': 'UnAuthorized' })
        }
    },
}
export default Withdraw_returnController