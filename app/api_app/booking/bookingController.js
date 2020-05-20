import BookingModel from "./bookingModel"
import ReservationsModel from "../../reservations/reservationsModel"


const moment = require('moment');

const BookingController = {
    async insertBooking(req, res) {
        if (req.user) {
            let total_price = 0
            let time_arr = []
            let chk = true

            let queue = await BookingModel.getAllQueue()
            // console.log(queue.length)
            if (queue.length != 0) {
                let queueDate = moment(queue[0].queue_date, "YYYY-mm-dd")
                // console.log(queueDate.toString() + "==" + moment(new Date).subtract('days').startOf('day').toString())
                let chk_queue_date = await BookingModel.getAllQueueCheck(req.body)

                if (chk_queue_date.length != 0) {
                    let cleanServiceDetailId = req.body.clean_service_detail_id;
                    for (let i = 0; i < cleanServiceDetailId.length; i++) {
                        let clean_service_data = await BookingModel.getCleanServiceDetailWcsdid(cleanServiceDetailId[i])
                        for (let j = 0; j < clean_service_data.length; j++) {
                            total_price += clean_service_data[j].service_price
                            time_arr.push(clean_service_data[j].service_duration)
                        }
                    }

                    let total_time = sumTime(req.body.start_time, time_arr)
                    let reservatonAll = await BookingModel.getAllReservationNOTStatus()

                    for (let i = 0; i < reservatonAll.length; i++) {
                        let chkTimeBetween = chkTime(req.body.start_time, total_time, reservatonAll[i].start_date, reservatonAll[i].end_date)
                        if (chkTimeBetween == false && reservatonAll[i].car_wash_id == req.body.car_wash_id) chk = false
                    }

                    if (chk == false) {
                        res.status(201).json({
                            "result": "fail",
                            "data": "Please change the time. Because time has already been in the system"
                        })
                    } else {
                        await BookingModel.insertQueue(req.body)
                        queue = await BookingModel.getAllQueue()
                        req.body.total_price = total_price
                        req.body.start_time = req.body.start_time.split(":")[0] + ":" + req.body.start_time.split(":")[1] + ":00"
                        req.body.end_time = total_time
                        req.body.queue_id = queue[0].queue_id

                        for (let i = 0; i < req.body.clean_service_detail_id.length; i++) {
                            req.body.clean_service_detail_id_use = req.body.clean_service_detail_id[i]
                            await BookingModel.insertReservation(req.body)
                        }
                        let checkQueue = await ReservationsModel.getQueueForAssignment(req.body)
                        if (checkQueue.length == 1) {
                            console.log('70 ' + checkQueue.length)
                            let checkemp = await ReservationsModel.getAssignmentByEmployee
                                (checkQueue[0].car_wash_id, checkQueue[0].position_id)
                            if (checkemp.length > 0) {
                                let emp1 = await ReservationsModel.getCar_WashDetailByPosition
                                    (checkQueue[0].car_wash_id, checkQueue[0].position_id, 1)
                                for (let i = 0; i < emp1.length; i++) {
                                    console.log('77 ' + emp1[0].employee_id)
                                    if (checkemp[0].employee_id != emp1[i].employee_id) {
                                        await ReservationsModel.insertAssignment(req.body.queue_id, emp1[i].employee_id)
                                    } else {
                                        await ReservationsModel.insertAssignment(req.body.queue_id, emp1[i].employee_id)
                                    }
                                }
                            } else if (checkemp.length <= 0 || undefined) {
                                let emp1 = await ReservationsModel.getCar_WashDetailByPosition
                                    (checkQueue[0].car_wash_id, checkQueue[0].position_id, 1)
                                await ReservationsModel.insertAssignment(req.body.queue_id, emp1[0].employee_id)
                            }
                        } else if (checkQueue.length > 1) {
                            let checkemp = await ReservationsModel.getAssignmentByEmployee
                                (checkQueue[0].car_wash_id, checkQueue[0].position_id)
                            let checkemp2 = await ReservationsModel.getAssignmentByEmployee
                                (checkQueue[0].car_wash_id, checkQueue[1].position_id)
                            console.log('94 ' + checkemp.length)
                            console.log('95 ' + checkemp2.length)
                            if (checkemp.length > 0) {
                                console.log('97 ' + checkemp[0].employee_id)
                                let emp1 = await ReservationsModel.getCar_WashDetailByPosition1
                                    (checkQueue[0].car_wash_id, checkQueue[0].position_id, 1, checkemp[0].employee_id)
                                for (let i = 0; i < emp1.length; i++) {
                                    console.log('170 ' + checkemp[0].employee_id)
                                    if (checkemp[0].employee_id != emp1[i].employee_id) {
                                        await ReservationsModel.insertAssignment(req.body.queue_id, emp1[i].employee_id)
                                        break;
                                    } else {
                                        await ReservationsModel.insertAssignment(req.body.queue_id, emp1[i].employee_id)
                                        break;
                                    }
                                }
                            } else if (checkemp.length <= 0 || undefined) {
                                let emp1 = await ReservationsModel.getCar_WashDetailByPosition
                                    (checkQueue[0].car_wash_id, checkQueue[0].position_id, 1)
                                await ReservationsModel.insertAssignment(req.body.queue_id, emp1[0].employee_id)

                            }
                            if (checkemp2.length <= 0 || undefined) {
                                let emp2 = await ReservationsModel.getCar_WashDetailByPosition1
                                    (checkQueue[0].car_wash_id, checkQueue[1].position_id, 1, checkemp2[0].employee_id)
                                console.log('116 ' + emp2[0].employee_id)
                                await ReservationsModel.insertAssignment(req.body.queue_id, emp2[0].employee_id)
                            } else {
                                let emp2 = await ReservationsModel.getCar_WashDetailByPosition1(
                                    checkQueue[0].car_wash_id, checkQueue[1].position_id, 1, checkemp2[0].employee_id)
                                for (let i = 0; i < emp2.length; i++) {
                                    console.log('116 ' + emp2[i].employee_id)
                                    if (checkemp2[0].employee_id != emp2[i].employee_id) {
                                        await ReservationsModel.insertAssignment(req.body.queue_id, emp2[i].employee_id)
                                        break;
                                    } else {
                                        await ReservationsModel.insertAssignment(req.body.queue_id, emp2[i].employee_id)
                                        break;
                                    }
                                }
                            }
                        }
                        res.status(201).json({
                            "result": "success",
                            "data": "success"
                        })

                    }


                } else {
                    for (let i = 0; i < req.body.clean_service_detail_id.length; i++) {
                        let clean_service_data = await BookingModel.getCleanServiceDetailWcsdid(req.body.clean_service_detail_id[i])
                        for (let j = 0; j < clean_service_data.length; j++) {
                            total_price += clean_service_data[j].service_price;
                            time_arr.push(clean_service_data[j].service_duration)
                        }
                    }
                    let total_time = sumTime(req.body.start_time, time_arr)
                    await BookingModel.insertQueue(req.body)
                    queue = await BookingModel.getAllQueue()

                    if (queue.length > 0) {
                        req.body.total_price = total_price
                        req.body.start_time = req.body.start_time.split(":")[0] + ":" + req.body.start_time.split(":")[1] + ":00"
                        req.body.end_time = total_time
                        req.body.queue_id = queue[0].queue_id

                        for (let i = 0; i < req.body.clean_service_detail_id.length; i++) {
                            req.body.clean_service_detail_id_use = req.body.clean_service_detail_id[i]
                            await BookingModel.insertReservation(req.body)
                        }
                        let checkQueue = await ReservationsModel.getQueueForAssignment(req.body)
                        if (checkQueue.length == 1) {
                            console.log('70 ' + checkQueue.length)
                            let checkemp = await ReservationsModel.getAssignmentByEmployee
                                (checkQueue[0].car_wash_id, checkQueue[0].position_id)
                            if (checkemp.length > 0) {
                                let emp1 = await ReservationsModel.getCar_WashDetailByPosition
                                    (checkQueue[0].car_wash_id, checkQueue[0].position_id, 1)
                                for (let i = 0; i < emp1.length; i++) {
                                    console.log('77 ' + emp1[0].employee_id)
                                    if (checkemp[0].employee_id != emp1[i].employee_id) {
                                        await ReservationsModel.insertAssignment(req.body.queue_id, emp1[i].employee_id)
                                    } else {
                                        await ReservationsModel.insertAssignment(req.body.queue_id, emp1[i].employee_id)
                                    }
                                }
                            } else if (checkemp.length <= 0 || undefined) {
                                let emp1 = await ReservationsModel.getCar_WashDetailByPosition
                                    (checkQueue[0].car_wash_id, checkQueue[0].position_id, 1)
                                await ReservationsModel.insertAssignment(req.body.queue_id, emp1[0].employee_id)
                            }
                        } else if (checkQueue.length > 1) {
                            let checkemp = await ReservationsModel.getAssignmentByEmployee
                                (checkQueue[0].car_wash_id, checkQueue[0].position_id)
                            let checkemp2 = await ReservationsModel.getAssignmentByEmployee
                                (checkQueue[0].car_wash_id, checkQueue[1].position_id)
                            console.log('94 ' + checkemp.length)
                            console.log('95 ' + checkemp2.length)
                            if (checkemp.length > 0) {
                                console.log('97 ' + checkemp[0].employee_id)
                                let emp1 = await ReservationsModel.getCar_WashDetailByPosition1
                                    (checkQueue[0].car_wash_id, checkQueue[0].position_id, 1, checkemp[0].employee_id)
                                for (let i = 0; i < emp1.length; i++) {
                                    console.log('170 ' + checkemp[0].employee_id)
                                    if (checkemp[0].employee_id != emp1[i].employee_id) {
                                        await ReservationsModel.insertAssignment(req.body.queue_id, emp1[i].employee_id)
                                        break;
                                    } else {
                                        await ReservationsModel.insertAssignment(req.body.queue_id, emp1[i].employee_id)
                                        break;
                                    }
                                }
                            } else if (checkemp.length <= 0 || undefined) {
                                let emp1 = await ReservationsModel.getCar_WashDetailByPosition
                                    (checkQueue[0].car_wash_id, checkQueue[0].position_id, 1)
                                await ReservationsModel.insertAssignment(req.body.queue_id, emp1[0].employee_id)

                            }
                            if (checkemp2.length <= 0 || undefined) {
                                let emp2 = await ReservationsModel.getCar_WashDetailByPosition
                                    (checkQueue[0].car_wash_id, checkQueue[1].position_id, 1)
                                console.log('116 ' + emp2[0].employee_id)
                                await ReservationsModel.insertAssignment(req.body.queue_id, emp2[0].employee_id)
                            } else {
                                let emp2 = await ReservationsModel.getCar_WashDetailByPosition1(
                                    checkQueue[0].car_wash_id, checkQueue[1].position_id, 1, checkemp2[0].employee_id)
                                for (let i = 0; i < emp2.length; i++) {
                                    console.log('116 ' + emp2[i].employee_id)
                                    if (checkemp2[0].employee_id != emp2[i].employee_id) {
                                        await ReservationsModel.insertAssignment(req.body.queue_id, emp2[i].employee_id)
                                        break;
                                    } else {
                                        await ReservationsModel.insertAssignment(req.body.queue_id, emp2[i].employee_id)
                                        break;
                                    }
                                }
                            }
                        }
                        res.status(201).json({
                            "result": "success",
                            "data": "success"
                        })
                    }
                }
            } else {
                let cleanServiceDetailId = req.body.clean_service_detail_id;
                for (let i = 0; i < cleanServiceDetailId.length; i++) {
                    let clean_service_data = await BookingModel.getCleanServiceDetailWcsdid(cleanServiceDetailId[i])
                    for (let j = 0; j < clean_service_data.length; j++) {
                        total_price += clean_service_data[j].service_price
                        time_arr.push(clean_service_data[j].service_duration)
                    }
                }

                let total_time = sumTime(req.body.start_time, time_arr)

                await BookingModel.insertQueue(req.body)
                req.body.total_price = total_price
                req.body.start_time = req.body.start_time.split(":")[0] + ":" + req.body.start_time.split(":")[1] + ":00"
                req.body.end_time = total_time

                let dataqueue = await BookingModel.getAllQueue()
                req.body.queue_id = dataqueue[0].queue_id
                for (let i = 0; i < req.body.clean_service_detail_id.length; i++) {
                    req.body.clean_service_detail_id_use = req.body.clean_service_detail_id[i]
                    await BookingModel.insertReservation(req.body)
                }
                let checkQueue = await ReservationsModel.getQueueForAssignment(req.body)
                if (checkQueue.length == 1) {
                    console.log('70 ' + checkQueue.length)
                    let checkemp = await ReservationsModel.getAssignmentByEmployee
                        (checkQueue[0].car_wash_id, checkQueue[0].position_id)
                    if (checkemp.length > 0) {
                        let emp1 = await ReservationsModel.getCar_WashDetailByPosition
                            (checkQueue[0].car_wash_id, checkQueue[0].position_id, 1)
                        for (let i = 0; i < emp1.length; i++) {
                            console.log('77 ' + emp1[0].employee_id)
                            if (checkemp[0].employee_id != emp1[i].employee_id) {
                                await ReservationsModel.insertAssignment(req.body.queue_id, emp1[i].employee_id)
                            } else {
                                await ReservationsModel.insertAssignment(req.body.queue_id, emp1[i].employee_id)
                            }
                        }
                    } else if (checkemp.length <= 0 || undefined) {
                        let emp1 = await ReservationsModel.getCar_WashDetailByPosition
                            (checkQueue[0].car_wash_id, checkQueue[0].position_id, 1)
                        await ReservationsModel.insertAssignment(req.body.queue_id, emp1[0].employee_id)
                    }
                } else if (checkQueue.length > 1) {
                    let checkemp = await ReservationsModel.getAssignmentByEmployee
                        (checkQueue[0].car_wash_id, checkQueue[0].position_id)
                    let checkemp2 = await ReservationsModel.getAssignmentByEmployee
                        (checkQueue[0].car_wash_id, checkQueue[1].position_id)
                    console.log('94 ' + checkemp.length)
                    console.log('95 ' + checkemp2.length)
                    if (checkemp.length > 0) {
                        console.log('97 ' + checkemp[0].employee_id)
                        let emp1 = await ReservationsModel.getCar_WashDetailByPosition1
                            (checkQueue[0].car_wash_id, checkQueue[0].position_id, 1, checkemp[0].employee_id)
                        for (let i = 0; i < emp1.length; i++) {
                            console.log('170 ' + checkemp[0].employee_id)
                            if (checkemp[0].employee_id != emp1[i].employee_id) {
                                await ReservationsModel.insertAssignment(req.body.queue_id, emp1[i].employee_id)
                                break;
                            } else {
                                await ReservationsModel.insertAssignment(req.body.queue_id, emp1[i].employee_id)
                                break;
                            }
                        }
                    } else if (checkemp.length <= 0 || undefined) {
                        let emp1 = await ReservationsModel.getCar_WashDetailByPosition
                            (checkQueue[0].car_wash_id, checkQueue[0].position_id, 1)
                        await ReservationsModel.insertAssignment(req.body.queue_id, emp1[0].employee_id)

                    }
                    if (checkemp2.length <= 0 || undefined) {
                        let emp2 = await ReservationsModel.getCar_WashDetailByPosition1
                            (checkQueue[0].car_wash_id, checkQueue[1].position_id, 1, checkemp2[0].employee_id)
                        console.log('116 ' + emp2[0].employee_id)
                        await ReservationsModel.insertAssignment(req.body.queue_id, emp2[0].employee_id)
                    } else {
                        let emp2 = await ReservationsModel.getCar_WashDetailByPosition1(
                            checkQueue[0].car_wash_id, checkQueue[1].position_id, 1, checkemp2[0].employee_id)
                        for (let i = 0; i < emp2.length; i++) {
                            console.log('116 ' + emp2[i].employee_id)
                            if (checkemp2[0].employee_id != emp2[i].employee_id) {
                                await ReservationsModel.insertAssignment(req.body.queue_id, emp2[i].employee_id)
                                break;
                            } else {
                                await ReservationsModel.insertAssignment(req.body.queue_id, emp2[i].employee_id)
                                break;
                            }
                        }
                    }
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