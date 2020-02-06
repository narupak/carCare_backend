import PositionModel from "./positionModel"

const PositionController = {
    getAllPosition(req, res) {
        if (req.user) {
            PositionModel.getAllPosition().then(rs => {
                res.status(200).json({ result: true, data: rs })
            })
        } else {
            res.status(401).json({ 'error': 'UnAuthorized' })
        }
    },
    getPositionWN1A2(req, res) {
        if (req.user) {
            PositionModel.getPositionWN1A2().then(rs => {
                res.status(200).json({ result: true, data: rs })
            })
        } else {
            res.status(401).json({ 'error': 'UnAuthorized' })
        }
    },
}
export default PositionController