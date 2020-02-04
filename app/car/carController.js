import carModel from "./carModel"

const carController = {
    getAllCar(req, res) {
        if (req.user) {
            carModel.getAllCar().then(rs => {
                res.status(200).json({ result: true, data: rs })
            })
        } else {
            res.status(401).json({ 'error': 'UnAuthorized' })
        }
    },
    insertCar(req, res) {
        //const { username , password , fname , lname , tel , status , position } = req.body
        carModel.insertCar(req.body).then(rs => {
            res.status(201).json({
                "result": "success"
            })
        })
    },
    deleteCarWcid(req, res) {
        if (req.user) {
            carModel.deleteCarWcid(req.params.id).then(rs => {
                res.status(200).json({ result: true, data: rs })
            })
        } else {
            res.status(401).json({ 'error': 'UnAuthorized' })
        }
    }
}
export default carController