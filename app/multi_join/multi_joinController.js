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
    getAllClean_service_detailJClean_serviceJType_car(req, res) {
        if (req.user) {
            Multi_joinModel.getAllClean_service_detailJClean_serviceJType_car().then(rs => {
                res.status(200).json({ result: true, data: rs })
            })
        } else {
            res.status(401).json({ 'error': 'UnAuthorized' })
        }
    },
    getAllCar_detailJClean_serviceJModelJCarJType_car(req, res) {
        if (req.user) {
            Multi_joinModel.getAllCar_detailJClean_serviceJModelJCarJType_car().then(rs => {
                res.status(200).json({ result: true, data: rs })
            })
        } else {
            res.status(401).json({ 'error': 'UnAuthorized' })
        }
    },
    getAllWithdraw_returnJWash_toolJEmployee(req, res) {
        if (req.user) {
            Multi_joinModel.getAllWithdraw_returnJWash_toolJEmployee().then(rs => {
                res.status(200).json({ result: true, data: rs })
            })
        } else {
            res.status(401).json({ 'error': 'UnAuthorized' })
        }
    },
    getAllReservationsJEmployeeJMembersJCar_washJType_carJPosition(req, res) {
        if (req.user) {
            Multi_joinModel.getAllReservationsJEmployeeJMembersJCar_washJType_carJPosition().then(rs => {
                res.status(200).json({ result: true, data: rs })
            })
        } else {
            res.status(401).json({ 'error': 'UnAuthorized' })
        }
    },
}
export default Multi_joinController