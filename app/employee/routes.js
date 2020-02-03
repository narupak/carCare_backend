import { connection } from "../../db_connection"
import controller from "./controller"

export function setup(router){
    router
        .get('/', (req, res) => {
            connection().query("SELECT * FROM employee" , (err,result)=>{
                if(err) throw err
                res.send(result)
            })
        })
        .post('/create', controller.create)
        .post('/login' , controller.login)
}