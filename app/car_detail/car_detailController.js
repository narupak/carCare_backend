import car_detailModel from "./car_detailModel"

const car_detailController = {
    getAllCar_detail(req, res) {
        if (req.user) {
            car_detailModel.getAllCar_detail().then(rs => {
                res.status(200).json({ result: true, data: rs })
            })
        } else {
            res.status(401).json({ 'error': 'UnAuthorized' })
        }
    },
    insertCar_detail(req, res) {
        //const { username , password , fname , lname , tel , status , position } = req.body
        if (req.user) {
            car_detailModel.insertCar_detail(req.body).then(rs => {
                res.status(201).json({
                    "result": "success"
                })
            })
        } else {
            res.status(401).json({ 'error': 'UnAuthorized' })
        }
    },
    updateCar_detailSm_cid_tcidWcdid(req, res) {
        //const { username , password , fname , lname , tel , status , position } = req.body
        if (req.user) {
            car_detailModel.updateCar_detailSm_cid_tcidWcdid(req.body).then(rs => {
                res.status(201).json({
                    "result": "success"
                })
            })
        } else {
            res.status(401).json({ 'error': 'UnAuthorized' })
        }
    },
    deleteCar_detailWcdid(req, res) {
        if (req.user) {
            car_detailModel.deleteCar_detailWcdid(req.params.id).then(rs => {
                res.status(200).json({ result: true, data: rs })
            })
        } else {
            res.status(401).json({ 'error': 'UnAuthorized' })
        }
    }
}
export default car_detailController