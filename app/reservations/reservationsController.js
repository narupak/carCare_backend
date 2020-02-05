import ReservationsModel from "./reservationsModel"

const ReservationsController = {
    getAllReservations(req, res) {
        if (req.user) {
            ReservationsModel.getAllReservations().then(rs => {
                res.status(200).json({ result: true, data: rs })
            })
        } else {
            res.status(401).json({ 'error': 'UnAuthorized' })
        }
    },
    insertReservations(req, res) {
        //const { username , password , fname , lname , tel , status , position } = req.body
        if (req.user) {
            ReservationsModel.insertReservations(req.body).then(rs => {
                res.status(201).json({
                    "result": "success"
                })
            })
        } else {
            res.status(401).json({ 'error': 'UnAuthorized' })
        }
    },
    deleteReservationsWrid(req, res) {
        if (req.user) {
            ReservationsModel.deleteReservationsWrid(req.params.id).then(rs => {
                res.status(200).json({ result: true, data: rs })
            })
        } else {
            res.status(401).json({ 'error': 'UnAuthorized' })
        }
    }
}
export default ReservationsController