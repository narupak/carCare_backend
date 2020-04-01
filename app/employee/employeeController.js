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
    getEmployeeWeid(req, res) {
        if (req.user) {
            EmployeeModel.getEmployeeWeid(req.params.id).then(rs => {
                let formReturn = {};
                const result = rs.map(result=>{
                    if(result.employee_image == null){
                        formReturn = {
                            employee_id : result.employee_id,
                            employee_username : result.employee_username,
                            employee_password : result.employee_password,
                            employee_fname : result.employee_fname,
                            employee_lname : result.employee_lname,
                            employee_tel : result.employee_tel,
                            employee_image : result.employee_image,
                            status : result.status,
                            position_id : result.position_id,
                            position_work: result.position_work
                        }
                        return formReturn;
                    }else{
                        formReturn = {
                            employee_id : result.employee_id,
                            employee_username : result.employee_username,
                            employee_password : result.employee_password,
                            employee_fname : result.employee_fname,
                            employee_lname : result.employee_lname,
                            employee_tel : result.employee_tel,
                            employee_image : result.employee_image.toString(),
                            status : result.status,
                            position_id : result.position_id,
                            position_work: result.position_work
                        }
                        return formReturn;
                    }
                })
                res.status(200).json({ result: true, data: result })
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