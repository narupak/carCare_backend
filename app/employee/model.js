const mysql = require('mysql');

import bcrypt from 'bcrypt'
import { connection } from '../../db_connection';
import jwt from 'jsonwebtoken'

const EmployeeModel = {
    findAll(){

    },
    create(req){
        return new Promise((resolve , reject)=>{
            bcrypt.hash(req.password , 12 , (err,hash) => {
                let insertQuery = "INSERT INTO employee(employee_username , employee_password , employee_fname , employee_lname , employee_tel , status , position_id ) VALUES(?,?,?,?,?,?,?)";
                let query = mysql.format(insertQuery, [req.username , hash , req.fname , req.lname , req.tel , req.status , req.position])
                connection().query(query , (err , result)=>{
                    if(err) throw reject(err)
                    return resolve(result);
                })
            })
        })
    },
    login(req){
        return new Promise((resolve , reject )=>{
                let checkAuth = "SELECT * FROM employee WHERE employee_username = ?"
                let query = mysql.format(checkAuth , [req.username])
                connection().query(query , (err,result)=>{
                    if(err) throw err
                    result.map(rs=>{
                        const hash = req.password
                        bcrypt.compare(rs.employee_password , hash , (err , isValid) => {
                            if(err) throw err
                            return resolve(isValid)
                        })
                    })
            })
        })
    },

    genToken(user){
        return jwt.sign({ sub : user.id } , 'secret' , { expiresIn : '1h'})
    }
}
export default EmployeeModel