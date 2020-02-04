import Multi_joinModel from "./multi_joinModel"

const Multi_joinController = {
    getAllClean_serviceJClean_service_detail(req, res) {
        if (req.user) {
            Multi_joinModel.getAllClean_serviceJClean_service_detail().then(rs => {
                res.status(200).json({ result: true, data: rs })
            })
        } else {
            res.status(401).json({ 'error': 'UnAuthorized' })
        }
    },
}
export default Multi_joinController