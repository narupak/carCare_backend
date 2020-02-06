import Wash_toolModel from "./wash_toolModel"

const Wash_toolController = {
    getAllWash_tool(req, res) {
        if (req.user) {
            Wash_toolModel.getAllWash_tool().then(rs => {
                res.status(200).json({ result: true, data: rs })
            })
        } else {
            res.status(401).json({ 'error': 'UnAuthorized' })
        }
    },
    async insertWash_tool(req, res) {
        if (req.user) {
            await Wash_toolModel.insertWash_tool(req.body)
            res.status(201).json({
                "result": "success",
            })
        } else {
            res.status(401).json({ 'error': 'UnAuthorized' })
        }
    },
    async updateWash_toolStn_am_tsWwtid(req, res) {
        if (req.user) {
            await Wash_toolModel.updateWash_toolStn_am_tsWwtid(req.body)
            res.status(201).json({
                "result": "success",
            })
        } else {
            res.status(401).json({ 'error': 'UnAuthorized' })
        }
    },
    deleteWash_toolWwtid(req, res) {
        if (req.user) {
            Wash_toolModel.deleteWash_toolWwtid(req.params.id).then(rs => {
                res.status(200).json({ result: true, data: rs })
            })
        } else {
            res.status(401).json({ 'error': 'UnAuthorized' })
        }
    }
}
export default Wash_toolController