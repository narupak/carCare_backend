import Clean_serviceModel from "./clean_serviceModel"

const Clean_serviceController = {
    getAllClean_service(req, res) {
        if (req.user) {
            Clean_serviceModel.getAllClean_service().then(rs => {
                res.status(200).json({ result: true, data: rs })
            })
        } else {
            res.status(401).json({ 'error': 'UnAuthorized' })
        }
    },
}
export default Clean_serviceController