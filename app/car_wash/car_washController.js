import Car_washModel from "./car_washModel"

const Car_washController = {
    getAllCar_wash(req, res) {
        if (req.user) {
            Car_washModel.getAllCar_wash().then(rs => {
                res.status(200).json({ result: true, data: rs })
            })
        } else {
            res.status(401).json({ 'error': 'UnAuthorized' })
        }
    },
    getAllCar_wash_detail(req, res) {
        if (req.user) {
            Car_washModel.getAllCar_wash_detail().then(rs => {
                res.status(200).json({ result: true, data: rs })
            })
        } else {
            res.status(401).json({ 'error': 'UnAuthorized' })
        }
    },
    getEmployeeWNotCarWash(req, res) {
        if (req.user) {
            Car_washModel.getEmployeeWNotCarWash().then(rs => {
                res.status(200).json({ result: true, data: rs })
            })
        } else {
            res.status(401).json({ 'error': 'UnAuthorized' })
        }
    },
    getEmployeeWCar_wash(req, res) {
        if (req.user) {
            Car_washModel.getEmployeeWCarwash1().then(rs => {
                res.status(200).json({ result: true, data: rs })
            })
        } else {
            res.status(401).json({ 'error': 'UnAuthorized' })
        }
    },
    getEmployeeWCar_wash2(req, res) {
        if (req.user) {
            Car_washModel.getEmployeeWCarwash2().then(rs => {
                res.status(200).json({ result: true, data: rs })
            })
        } else {
            res.status(401).json({ 'error': 'UnAuthorized' })
        }
    },
    insertEmployeeToCar_wash(req, res) {
        //const { username , password , fname , lname , tel , status , position } = req.body
        if (req.user) {
            Car_washModel.InsertEmployeeToCar_wash(req.body).then(rs => {
                res.status(201).json({
                    "result": "success"
                })
            })
        } else {
            res.status(401).json({ 'error': 'UnAuthorized' })
        }
    },
}
export default Car_washController