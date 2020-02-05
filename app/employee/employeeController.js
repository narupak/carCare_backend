import EmployeeModel from "./employeeModel"

const EmployeeController = {
    getAllEmployee(req, res) {
        if (req.user) {
            EmployeeModel.getAllEmployee().then(rs => {
                res.status(200).json({ result: true, data: rs })
            })
        } else {
            res.status(401).json({ 'error': 'UnAuthorized' })
        }
    },
    getEmployeeWpid2(req, res) {
        if (req.user) {
            EmployeeModel.getEmployeeWpid2().then(rs => {
                res.status(200).json({ result: true, data: rs })
            })
        } else {
            res.status(401).json({ 'error': 'UnAuthorized' })
        }
    },
    getEmployeeWpidN12(req, res) {
        if (req.user) {
            EmployeeModel.getEmployeeWpidN12().then(rs => {
                res.status(200).json({ result: true, data: rs })
            })
        } else {
            res.status(401).json({ 'error': 'UnAuthorized' })
        }
    },
    insertEmployee(req, res) {
        //const { username , password , fname , lname , tel , status , position } = req.body
        if (req.user) {
            EmployeeModel.insertEmployee(req.body).then(rs => {
                res.status(201).json({
                    "result": "success"
                })
            })
        } else {
            res.status(401).json({ 'error': 'UnAuthorized' })
        }
    },
    updateEmployeeSef_el_etWeid(req, res) {
        if (req.user) {
            EmployeeModel.updateEmployeeSef_el_etWeid(req.body).then(rs => {
                res.status(200).json({ result: true, data: rs })
            })
        } else {
            res.status(401).json({ 'error': 'UnAuthorized' })
        }
    },
    deleteEmployeeWeid(req, res) {
        if (req.user) {
            EmployeeModel.deleteEmployeeWeid(req.params.id).then(rs => {
                res.status(200).json({ result: true, data: rs })
            })
        } else {
            res.status(401).json({ 'error': 'UnAuthorized' })
        }
    }
}
export default EmployeeController