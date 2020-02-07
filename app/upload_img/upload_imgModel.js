const mysql = require('mysql');

import { connection } from '../../db_connection';

const Upload_imgModel = {
    upload_img(req) {
        return new Promise((resolve, reject) => {
            let sql = "UPDATE employee SET employee_fname = ? ,employee_lname = ? ,employee_tel = ? , employee_image = ? WHERE employee_id = ?"
            let query = mysql.format(sql, [req.editFname, req.editLname, req.editTel, req.editImage[0].objectURL.changingThisBreaksApplicationSecurity, req.id])
            connection().query(query, (err, result) => {
                if (err) reject(err)
                return resolve(result)
            })
        })
    },
}
export default Upload_imgModel