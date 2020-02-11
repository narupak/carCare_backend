import ReservationsModel from "./reservationsModel"
const moment = require('moment');

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
    getReservationsWcwidORrsidDESC(req, res) {
        if (req.user) {
            ReservationsModel.getReservationsWcwidORrsidDESC(req.body).then(rs => {
                res.status(200).json({ result: true, data: rs })
            })
        } else {
            res.status(401).json({ 'error': 'UnAuthorized' })
        }
    },
    async insertReservations(req, res) {
        if (req.user) {
            let total = 0
            let id = req.body.clean_service_detail_id
            let timeDutation = []
            for (let i = 0; i < id.length; i++) {
                let response = await ReservationsModel.getTotalPrice(id[i])
                total += response[0].service_price
                timeDutation.push(response[0].service_duration)
            }

            req.body.total_price = total
            req.body.end_date = await formatDate(req.body.reserveTime, timeDutation)
            for (let i = 0; i < id.length; i++) {
                req.body.clean_service_id = id[i]
                await ReservationsModel.insertReservations(req.body)
            }
            res.status(201).json({
                "result": "success",
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

let formatDate = async(startTime, timeDuration) => {

    let formatDate = new Date(2018, 11, 24, startTime.split(":")[0], startTime.split(":")[1], 0, 0)
    formatDate = moment(formatDate).format('LLLL')

    let sumH = 0
    let sumM = 5

    for (let i = 0; i < timeDuration.length; i++) {
        sumH += Number(timeDuration[i].split(":")[0])
        sumM += Number(timeDuration[i].split(":")[1])
    }

    formatDate = moment(formatDate).add(sumH, 'hours').add(sumM, 'minutes').format('hh:mm:ss')
    return formatDate
}