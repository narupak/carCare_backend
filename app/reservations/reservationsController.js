import ReservationsModel from "./reservationsModel"
import QueueModel from "../queue/queueModel"
import CarWashModel from "../car_wash/car_washModel"
import EmployeeModel from "../employee/employeeModel"
import Withdraw_returnModel from "../withdraw_return/withdraw_returnModel"
import Wash_toolModel from "../wash_tool/wash_toolModel"

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
            console.log(req.body);
            let checkBooking = await ReservationsModel.checkReservation(req.body)
            if (checkBooking.length > 0) {
                res.status(201).json({
                    result: { checkBooking: false }
                });
            } else {

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
                console.log(req.body);
                let checkBookingEndDate = await ReservationsModel.checkReservationEndDate(req.body)
                let checkBetween = await ReservationsModel.checkReservationBetweenStartDateAndEndDate(req.body)
                console.log(checkBookingEndDate.length);
                console.log(checkBetween.length);
                if (checkBookingEndDate.length > 0) {
                    res.status(201).json({
                        result: { checkBooking: false }
                    });
                } else if (checkBetween.length > 0) {
                    res.status(201).json({
                        result: { checkBooking: false }
                    });
                }
                else {
                    await QueueModel.insertQueue(req.body)
                    let queue = await QueueModel.getQueueLqid()
                    req.body.queue_id = queue[0].queue_id

                    for (let i = 0; i < id.length; i++) {
                        req.body.clean_service_detail_id = id[i]
                        await ReservationsModel.insertReservations(req.body)
                    }
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
                        let emp1 = await ReservationsModel.getCar_WashDetailByPosition
                            (checkQueue[0].car_wash_id, checkQueue[0].position_id, 1)
                        for (let i = 0; i < emp1.length; i++) {
                            console.log(emp1[0].employee_id)
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
                    if (checkemp2.length <= 0 || undefined) {
                        let emp2 = await ReservationsModel.getCar_WashDetailByPosition
                            (checkQueue[0].car_wash_id, checkQueue[1].position_id, 1)
                        console.log('116 ' + emp2[0].employee_id)
                        await ReservationsModel.insertAssignment(req.body.queue_id, emp2[0].employee_id)
                    } else {
                        let emp2 = await ReservationsModel.getCar_WashDetailByPosition(
                            checkQueue[0].car_wash_id, checkQueue[1].position_id, 1)
                        for (let i = 0; i < emp2.length; i++) {
                            console.log('116 ' + emp2[0].employee_id)
                            if (checkemp2[0].employee_id != emp2[i].employee_id) {
                                await ReservationsModel.insertAssignment(req.body.queue_id, emp2[i].employee_id)
                            } else {
                                await ReservationsModel.insertAssignment(req.body.queue_id, emp2[i].employee_id)
                            }
                        }
                    }
                }
            }
            res.status(201).json({
                "result": "success",
            })
        } else {
            res.status(401).json({ 'error': 'UnAuthorized' })
        }
    },
    async updateReservationsSrsWrsid(req, res) {
        if (req.user) {
            await ReservationsModel.updateReservationsSrsWrsid(req.body)
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
    },
    getReservationByQueueApi(req, res) {
        if (req.user) {
            ReservationsModel.getReservationByQueue(req.params.id).then(rs => {
                res.status(200).json({ result: true, data: rs })
            })
        } else {
            res.status(401).json({ 'error': 'UnAuthorized' })
        }
    },
    async updateStatusReservationByStaff(req, res) {
        if (req.user) {
            let serve = req.body.service;
            let serveArr = serve.split(',');
            let date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
            let total = 0;
            let tool = await Wash_toolModel.getWash_toolWAssignment(serveArr[0])
            console.log(date)
            if (req.body.status == 0) {
                await ReservationsModel.updateStatusReservationByStaff(1, req.body.queue_id)
                if (serveArr[0] === 'ล้างรถ') {
                    // เบิกอุปกรณ์
                    for (let i = 0; i < tool.length; i++) {
                        await Withdraw_returnModel.insertWithdraw_returnByAssignment(
                            tool[i].wash_tool_id, 1, date, 1, req.body.employee_id
                        )
                        total = tool[i].amount - 1
                        await Wash_toolModel.updateWash_toolByAssignment(total, tool[i].wash_tool_id)
                    }
                }
            } else if (req.body.status == 1) {
                if (serveArr.length > 1) {
                    await ReservationsModel.updateStatusReservationByStaff(2, req.body.queue_id)
                } else {
                    await ReservationsModel.updateStatusReservationByStaff(4, req.body.queue_id)
                }
                // คืนอุปกรณ์
                let borrow = await Withdraw_returnModel.getWithdraw_return(req.body.employee_id, 1);
                for (let i = 0; i < borrow.length; i++) {
                    let balacne = await Wash_toolModel.getWash_toolIdWAssignment(borrow[i].wash_tool_id)
                    total = balacne[0].amount + 1
                    console.log([i] + ' ' + balacne[0].amount + 1)
                    console.log(borrow.length)
                    await Wash_toolModel.updateWash_toolByAssignment(total, borrow[i].wash_tool_id)
                    await Withdraw_returnModel.updatWithdraw_returnByAssignment(date, 2, borrow[i].withdraw_return_id)
                }
            } else if (req.body.status == 2) {
                await ReservationsModel.updateStatusReservationByStaff(3, req.body.queue_id)
                //เบิกอุปกรณ์
                for (let i = 1; i < serveArr.length; i++) {
                    console.log(serveArr[i])
                    let tool = await Wash_toolModel.getWash_toolWAssignment(serveArr[i])
                    for (let j = 0; j < tool.length; j++) {
                        console.log(tool[j].wash_tool_id)
                        await Withdraw_returnModel.insertWithdraw_returnByAssignment(
                            tool[j].wash_tool_id, 1, date, 1, req.body.employee_id
                        )
                        total = tool[j].amount - 1
                        await Wash_toolModel.updateWash_toolByAssignment(total, tool[j].wash_tool_id)
                    }
                }
            } else if (req.body.status == 3) {
                await ReservationsModel.updateStatusReservationByStaff(4, req.body.queue_id)
                  // คืนอุปกรณ์
                  let borrow = await Withdraw_returnModel.getWithdraw_return(req.body.employee_id, 1);
                  for (let i = 0; i < borrow.length; i++) {
                      let balacne = await Wash_toolModel.getWash_toolIdWAssignment(borrow[i].wash_tool_id)
                      total = balacne[0].amount + 1
                      console.log([i] + ' ' + balacne[0].amount + 1)
                      console.log(borrow.length)
                      await Wash_toolModel.updateWash_toolByAssignment(total, borrow[i].wash_tool_id)
                      await Withdraw_returnModel.updatWithdraw_returnByAssignment(date, 2, borrow[i].withdraw_return_id)
                  }
            }
            res.status(201).json({
                "result": "success",
            })
        } else {
            res.status(401).json({ 'error': 'UnAuthorized' })
        }
    }
}
export default ReservationsController

let formatDate = async (startTime, timeDuration) => {

    var time = moment.utc(startTime, "HH:mm:ss");
    for (let i = 0; i < timeDuration.length; i++) {
        time.add(Number(timeDuration[i].split(":")[1]), 'minutes');
    }

    return moment(time).format('HH:mm:ss');
    // let formatDate = new Date(2018, 11, 24, startTime.split(":")[0], startTime.split(":")[1], 0, 0)
    // formatDate = moment(formatDate).format('LLLL')

    // let sumH = 0
    // let sumM = 5

    // for (let i = 0; i < timeDuration.length; i++) {
    //     sumH += Number(timeDuration[i].split(":")[0])
    //     sumM += Number(timeDuration[i].split(":")[1])
    // }

    // formatDate = moment(formatDate).add(sumH, 'hours').add(sumM, 'minutes').format('hh:mm:ss')
    // return formatDate
}