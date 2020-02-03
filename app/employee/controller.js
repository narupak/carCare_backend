import EmployeeModel from "./model";

const EmployeeController = {
    getAll(req , res) {
        if(req.user){
            EmployeeModel.getEmployee().then(rs=>{
                res.status(200).json( { result : true ,data : rs })
            })
        }else{
            res.status(401).json({ 'error' : 'UnAuthorized' })
        }
    },
    create(req , res) {
        //const { username , password , fname , lname , tel , status , position } = req.body
        EmployeeModel.create(req.body).then(rs=>{
            res.status(201).json({
                "result" : "success"
            })
        })
    },
    login(req , res){
        EmployeeModel.getEmployeeByUsername(req.body).then(rs=>{
            if(!rs.isValid){
            res
                .header('Authorization' , rs.token)
                .status(201)
                .json(rs)
            } else {
            res
                .status(401)
                .json({
                    result : false
                })
            }
        })
    },
    edit(req , res){
        if(req.user){
            EmployeeModel.update(req.body).then(rs=>{
                res.status(200).json( { result : true ,data : rs })
            })
        }else{
            res.status(401).json({ 'error' : 'UnAuthorized' })
        }
    },
    remove(req , res){
        if(req.user){
            EmployeeModel.delete(req.params.id).then(rs=>{
                res.status(200).json( { result : true ,data : rs })
            })
        }else{
            res.status(401).json({ 'error' : 'UnAuthorized' })
        }
    }
}
export default EmployeeController