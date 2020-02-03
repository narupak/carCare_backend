const mysql = require('mysql');

import bcrypt from 'bcrypt'
import { connection } from '../../db_connection';
import jwt from 'jsonwebtoken'
import config from '../../config';

const EmployeeModel = {
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
    getEmployeeByUsername(req){
        return new Promise((resolve , reject )=>{
                let checkAuth = "SELECT * FROM employee WHERE employee_username = ?"
                let query = mysql.format(checkAuth , [req.username])
                connection().query(query , (err,result)=>{
                    if(err) throw err
                    result.map(rs=>{
                        const hash = req.password
                        bcrypt.compare(rs.employee_password , hash , (err , isValid) => {
                            if(err) throw err
                            const employee = {
                                id : rs.employee_id,
                                username : rs.employee_username,
                                password : rs.employee_password,
                                fname : rs.employee_fname,
                                lname : rs.employee_lname,
                                tel : rs.employee_tel,
                                status : rs.status,
                                position : rs.position_id,
                                result : !isValid,
                                token : `Bearer ${this.genToken(rs)}`
                            }
                            return resolve(employee)
                        })
                    })
            })
        })
    },

    genToken(user){
        return jwt.sign({ sub : user.employee_id } , config.secretKey , { expiresIn : '1h'})
    },

    getEmployee(){
        return new Promise((resolve , reject)=>{
            let employeeList = [];
            let sql = "SELECT * FROM employee WHERE position_id = 2"
            let query = mysql.format(sql)
            connection().query(query , (err , result) => {
                if(err) reject(err)
                result.map(rs=>{
                    employeeList.push(rs);
                })
                return resolve(employeeList)
            })
        })
    },
    findById(id){
        return new Promise((resolve , reject)=>{
            let sql = "SELECT * FROM employee WHERE employee_id = ?"
            let query = mysql.format(sql , [id])
            connection().query(query , (err , result) => {
                if(err) reject(err)
                result.map(rs=>{
                    return resolve(rs)
                })
            })
        })
    }
}
export default EmployeeModel