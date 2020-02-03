import EmployeeModel from "./model";

const EmployeeController = {
    getAll(req , res) {

    },
    get(req , res) {

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
        EmployeeModel.login(req.body).then(isValid=>{
            if(!isValid){
            res
                .header('Authorization' , `Bearer ${EmployeeModel.genToken(req)}`)
                .status(201)
                .json({ user : {  'username' : req.body.username  ,  'password' : req.body.password }  })
            } else{
            res
                .status(401)
                .json({
                    user : {
                        errors : ['Invalid credentials']
                    }
                })
            }
        })
    }
}
export default EmployeeController