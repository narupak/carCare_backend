import Type_carModel from "./type_carModel"

const Type_carController = {
    getAllType_car(req, res) {
        if (req.user) {
            Type_carModel.getAllType_car().then(rs => {
                res.status(200).json({ result: true, data: rs })
            })
        } else {
            res.status(401).json({ 'error': 'UnAuthorized' })
        }
    },
}
export default Type_carController