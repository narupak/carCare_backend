import Booking_detailModel from "./booking_detailModel"

const Booking_detailController = {
    getAllBooking_detail(req, res) {
        if (req.user) {
            Booking_detailModel.getAllBooking_detail().then(rs => {
                res.status(200).json({ result: true, data: rs })
            })
        } else {
            res.status(401).json({ 'error': 'UnAuthorized' })
        }
    },
    insertBooking_detail(req, res) {
        //const { username , password , fname , lname , tel , status , position } = req.body
        Booking_detailModel.insertBooking_detail(req.body).then(rs => {
            res.status(201).json({
                "result": "success"
            })
        })
    },
    deleteBooking_detailWeid(req, res) {
        if (req.user) {
            Booking_detailModel.deleteBooking_detailWeid(req.params.id).then(rs => {
                res.status(200).json({ result: true, data: rs })
            })
        } else {
            res.status(401).json({ 'error': 'UnAuthorized' })
        }
    }
}
export default Booking_detailController