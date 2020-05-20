import Car_washModel from "./car_washModel"
import EmployeeModel from "../employee/employeeModel"
const moment = require('moment');

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
    async getEmployeeWCar_wash(req, res) {
        if (req.user) {
            let time = moment();
            let beforeTime = moment('17:59:00', "HH:mm:ss")
            console.log("BEFORE TIME: " + moment(beforeTime).format("HH:mm:ss"));
            console.log("CURRENT TIME: " + moment(time).format("HH:mm:ss"));
            let emp = await Car_washModel.getEmployeeWCarwash1();
            if (moment(time).format("HH:mm:ss") > moment(beforeTime).format("HH:mm:ss")) {
                console.log('true')
                for (let i = 0; i < emp.length; i++) {
                    if (emp[i].status == 1) {
                        let status = 0;
                        EmployeeModel.updateEmployeeBySetStatus(0, emp[i].employee_id)
                    }
                }
            }
            await Car_washModel.getEmployeeWCarwash1().then(rs => {
                res.status(200).json({ result: true, data: rs })
            })
        } else {
            res.status(401).json({ 'error': 'UnAuthorized' })
        }
    },
    async getEmployeeWCar_wash2(req, res) {
        if (req.user) {
            let time = moment();
            let beforeTime = moment('17:59:00', "HH:mm:ss")
            console.log("BEFORE TIME: " + moment(beforeTime).format("HH:mm:ss"));
            console.log("CURRENT TIME: " + moment(time).format("HH:mm:ss"));
            let emp = await Car_washModel.getEmployeeWCarwash2();
            if (moment(time).format("HH:mm:ss") > moment(beforeTime).format("HH:mm:ss")) {
                console.log('true')
                for (let i = 0; i < emp.length; i++) {
                    if (emp[i].status == 1) {
                        EmployeeModel.updateEmployeeBySetStatus(0, emp[i].employee_id)
                    }
                }
            }
            await Car_washModel.getEmployeeWCarwash2().then(rs => {
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
    deleteEmployeeFormCar_wash(req, res) {
        if (req.user) {
            Car_washModel.deleteEmployeeFormCar_wash(req.params.id).then(rs => {
                res.status(200).json({ result: true, data: rs })
            })
        } else {
            res.status(401).json({ 'error': 'UnAuthorized' })
        }
    }
}
export default Car_washController