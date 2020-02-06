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
    async insertReservations(req, res) {
        if (req.user) {
            let total = 0
            let id = req.body.clean_service_detail_id
            for (let i = 0; i < id.length; i++) {
                let response = await ReservationsModel.getTotalPrice(id[i])
                total += response[0].service_price
            }

            req.body.total_price = total
            let formatDateAndTime = formatDate(req.body.reserveDateTime, req.body.clean_servie)
            req.body.reserv_date = formatDateAndTime.formatDate
            req.body.start_date = formatDateAndTime.startTime
            req.body.end_date = formatDateAndTime.endTime

            await ReservationsModel.insertReservations(req)

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

let formatDate = (date, time) => {
    let today = new Date(date)
    let dd = String(today.getDate()).padStart(2, '0')
    let mm = String(today.getMonth() + 1).padStart(2, '0')
    let yyyy = today.getFullYear()

    let startTime = date.split(" ")[4]

    let sumH = 0
    let sumM = 0
    let sumS = 0
    for (let i = 0; i < time.length; i++) {
        sumH += Number(time[i].split(":")[0])
        sumM += Number(time[i].split(":")[1])
        sumS += Number(time[i].split(":")[2])
    }

    let endTime = moment(today).add(sumH, 'hours').add(sumM, 'minutes').add(sumS, 'seconds').format('hh:mm:ss')

    return {
        formatDate: yyyy + '-' + mm + '-' + dd,
        startTime: startTime,
        endTime: endTime
    }
}