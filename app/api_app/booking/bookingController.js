import BookingModel from "./bookingModel"
const moment = require('moment');

const BookingController = {
    async insertBooking(req, res) {
        if (req.user) {
            let total_price = 0
            let time_arr = []
            let chk = true

            let queue = await BookingModel.getAllQueue()

            let queueDate = moment(queue[0].queue_date, "YYYY-mm-dd")

            if (queueDate.toString() == moment(new Date).subtract('days').startOf('day').toString()) {

                for (let i = 0; i < req.body.clean_service_detail_id.length; i++) {
                    let clean_service_data = await BookingModel.getCleanServiceDetailWcsdid(req.body.clean_service_detail_id)
                    total_price += clean_service_data[i].service_price
                    time_arr.push(clean_service_data[i].service_duration)
                }

                let total_time = sumTime(req.body.start_time, time_arr)
                let reservatonAll = await BookingModel.getAllReservation()

                for (let i = 0; i < reservatonAll.length; i++) {
                    let chkTimeBetween = chkTime(req.body.start_time, total_time, reservatonAll[i].start_date, reservatonAll[i].end_date)
                    if (chkTimeBetween == false) chk = false
                }

                if (chk == false) {
                    res.status(201).json({
                        "result": "fail",
                        "data": "Please change the time. Because time has already been in the system"
                    })
                } else {

                    await BookingModel.insertQueue()
                    queue = await BookingModel.getAllQueue()
                    req.body.total_price = total_price
                    req.body.start_time = req.body.start_time.split(":")[0] + ":" + req.body.start_time.split(":")[1] + ":00"
                    req.body.end_time = total_time
                    req.body.queue_id = queue[0].queue_id

                    for (let i = 0; i < req.body.clean_service_detail_id; i++) {
                        req.body.clean_service_detail_id_use = req.body.clean_service_detail_id[i]
                        await BookingModel.insertReservation(req.body)
                    }

                    res.status(201).json({
                        "result": "success",
                        "data": "success"
                    })
                }
            } else {
                for (let i = 0; i < req.body.clean_service_detail_id.length; i++) {
                    let clean_service_data = await BookingModel.getCleanServiceDetailWcsdid(req.body.clean_service_detail_id)
                    total_price += clean_service_data[i].service_price
                    time_arr.push(clean_service_data[i].service_duration)
                }
                let total_time = sumTime(req.body.start_time, time_arr)

                await BookingModel.insertQueue()
                queue = await BookingModel.getAllQueue()
                req.body.total_price = total_price
                req.body.start_time = req.body.start_time.split(":")[0] + ":" + req.body.start_time.split(":")[1] + ":00"
                req.body.end_time = total_time
                req.body.queue_id = queue[0].queue_id

                for (let i = 0; i < req.body.clean_service_detail_id; i++) {
                    req.body.clean_service_detail_id_use = req.body.clean_service_detail_id[i]
                    await BookingModel.insertReservation(req.body)
                }

                res.status(201).json({
                    "result": "success",
                    "data": "success"
                })

            }
        } else {
            res.status(401).json({ 'error': 'UnAuthorized' })
        }
    }
}
export default BookingController

let sumTime = (start_time, time_service_all) => {
    let formatDate = new Date(2000, 1, 1, Number(start_time.split(":")[0]), Number(start_time.split(":")[1]), 0, 0)
    formatDate = moment(formatDate, 'LLLL')

    let sumH = 0
    let sumM = 0

    for (let i = 0; i < time_service_all.length; i++) {
        sumH += Number(time_service_all[i].split(":")[0])
        sumM += Number(time_service_all[i].split(":")[1])
    }

    formatDate = moment(formatDate).add(sumH, 'hours').add(sumM, 'minutes').format('HH:mm:ss')
    return formatDate
}

let chkTime = (time_start_new, time_end_new, time_start_old, time_end_old) => {
    let startTime = moment(time_start_old, "HH:mm:ss"),
        endTime = moment(time_end_old, "HH:mm:ss"),
        timeChk = moment(time_start_new.split(":")[0] + ":" + time_start_new.split(":")[1] + ":00", "HH:mm:ss")

    if (timeChk.isBetween(startTime, endTime)) return false

    timeChk = moment(time_end_new, "HH:mm:ss")

    if (timeChk.isBetween(startTime, endTime)) return false

    startTime = moment(time_start_new.split(":")[0] + ":" + time_start_new.split(":")[1] + ":00", "HH:mm:ss")
    endTime = moment(time_end_new, "HH:mm:ss")
    timeChk = moment(time_start_old, "HH:mm:ss")

    if (timeChk.isBetween(startTime, endTime)) return false

    timeChk = moment(time_end_old, "HH:mm:ss")

    if (timeChk.isBetween(startTime, endTime)) return false

    if (time_start_new.split(":")[0] + ":" + time_start_new.split(":")[1] + ":00" == time_start_old && time_end_new == time_end_old) return false

    return true
}