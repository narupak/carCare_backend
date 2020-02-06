import ModelModel from "./modelModel"

const ModelController = {
    getAllModel(req, res) {
        if (req.user) {
            ModelModel.getAllModel().then(rs => {
                res.status(200).json({ result: true, data: rs })
            })
        } else {
            res.status(401).json({ 'error': 'UnAuthorized' })
        }
    },
}
export default ModelController