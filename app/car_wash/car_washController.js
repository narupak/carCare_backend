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
}
export default Car_washController