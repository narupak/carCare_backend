const mysql = require('mysql');

import { connection } from '../../db_connection';

const Multi_joinModel = {
    getAllClean_serviceJClean_service_detail() {
        return new Promise((resolve, reject) => {
            let getList = [];
            let sql =
                'SELECT * FROM clean_service as cs LEFT JOIN clean_service_detail as csd ON cs.clean_service_id = csd.clean_service_id';
            let query = mysql.format(sql);
            connection().query(query, (err, result) => {
                if (err) reject(err);
                result.map(rs => {
                    getList.push(rs);
                });
                return resolve(getList);
            });
        });
    },
    getAllClean_service_detailJClean_serviceJType_car() {
        return new Promise((resolve, reject) => {
            let getList = [];
            let sql =
                'SELECT * FROM clean_service_detail as csd LEFT JOIN clean_service as cs ON csd.clean_service_id = cs.clean_service_id ' +
                ' LEFT JOIN type_car as ty ON csd.type_car_id = ty.type_car_id LEFT JOIN position as  p ON csd.position_id = p.position_id';
            let query = mysql.format(sql);
            connection().query(query, (err, result) => {
                if (err) reject(err);
                result.map(rs => {
                    getList.push(rs);
                });
                return resolve(getList);
            });
        });
    },
    getAllCar_detailJClean_serviceJModelJCarJType_car() {
        return new Promise((resolve, reject) => {
            let getList = [];
            let sql =
                'SELECT * FROM car_detail as cd LEFT JOIN model as m ON cd.model_id = m.model_id ' +
                ' LEFT JOIN car as c ON cd.car_id = c.car_id ' +
                ' LEFT JOIN type_car as tc ON cd.type_car_id = tc.type_car_id ';
            let query = mysql.format(sql);
            connection().query(query, (err, result) => {
                if (err) reject(err);
                result.map(rs => {
                    getList.push(rs);
                });
                return resolve(getList);
            });
        });
    },
    getAllCar_detailOrderByBrand() {
        return new Promise((resolve, reject) => {
            let getList = [];
            let sql =
                'SELECT * FROM car  order by brand asc ';
            // 'SELECT * FROM car_detail as cd LEFT JOIN model as m ON cd.model_id = m.model_id ' +
            // ' LEFT JOIN car as c ON cd.car_id = c.car_id ' +
            // ' LEFT JOIN type_car as tc ON cd.type_car_id = tc.type_car_id group by c.brand order by c.brand asc ';
            let query = mysql.format(sql);
            connection().query(query, (err, result) => {
                if (err) reject(err);
                result.map(rs => {
                    getList.push(rs);
                });
                return resolve(getList);
            });
        });
    },
    getCar_detailWId(id) {
        return new Promise((resolve, reject) => {
            let getList = [];
            let sql =
                'SELECT * FROM car_detail as cd LEFT JOIN model as m ON cd.model_id = m.model_id ' +
                ' LEFT JOIN car as c ON cd.car_id = c.car_id ' +
                ' LEFT JOIN type_car as tc ON cd.type_car_id = tc.type_car_id WHERE c.car_id = ? ';
            let query = mysql.format(sql, [id]);
            console.log(query)
            connection().query(query, (err, result) => {
                if (err) reject(err);
                result.map(rs => {
                    getList.push(rs);
                });
                return resolve(getList);
            });
        });
    },
    getCar_detailWSize(id) {
        return new Promise((resolve, reject) => {
            let getList = [];
            let sql =
                ' SELECT * FROM car_detail as cd ' +
                ' LEFT JOIN model as m ON cd.model_id = m.model_id ' +
                ' LEFT JOIN car as c ON cd.car_id = c.car_id ' +
                ' LEFT JOIN type_car as tc ON cd.type_car_id = tc.type_car_id WHERE cd.car_detail_id = ? ';
            let query = mysql.format(sql, [id]);
            connection().query(query, (err, result) => {
                if (err) reject(err);
                result.map(rs => {
                    getList.push(rs);
                });
                return resolve(getList);
            });
        });
    },
    getAllCar_detailJClean_serviceJModelJCarJType_carApi() {
        return new Promise((resolve, reject) => {
            let getList = [];
            let sql =
                'SELECT * FROM car_detail as cd LEFT JOIN model as m ON cd.model_id = m.model_id ' +
                ' LEFT JOIN car as c ON cd.car_id = c.car_id ' +
                ' LEFT JOIN type_car as tc ON cd.type_car_id = tc.type_car_id';
            let query = mysql.format(sql);
            connection().query(query, (err, result) => {
                if (err) reject(err);
                result.map(rs => {
                    getList.push(rs);
                });
                return resolve(getList);
            });
        });
    },
    getAllWithdraw_returnJWash_toolJEmployee() {
        return new Promise((resolve, reject) => {
            let getList = [];
            let sql =
                "SELECT *,if(wr.date_start is not null,DATE_FORMAT(wr.date_start,'%Y-%m-%d'),null) as date_start ," +
                " if(wr.date_end is not null,DATE_FORMAT(wr.date_end,'%Y-%m-%d'),null) as date_end " +
                ' FROM withdraw_return  as wr LEFT JOIN wash_tool as wt ON wr.wash_tool_id = wt.wash_tool_id ' +
                ' LEFT JOIN employee as em ON wt.employee_id = em.employee_id';
            let query = mysql.format(sql);
            connection().query(query, (err, result) => {
                if (err) reject(err);
                result.map(rs => {
                    getList.push(rs);
                });
                return resolve(getList);
            });
        });
    },
    getAllReservationsJEmployeeJMembersJCar_washJType_carJPosition(id) {
        return new Promise((resolve, reject) => {
            let getList = [];
            let sql =
                'SELECT *,' +
                " if(qe.queue_date is not null,DATE_FORMAT(qe.queue_date,'%Y-%m-%d'),null) as queue_date " +
                ' FROM queue as qe LEFT JOIN reservations  as rt ON qe.queue_id = rt.queue_id ' +
                ' LEFT JOIN employee as ep ON rt.employee_id = ep.employee_id ' +
                ' LEFT JOIN members as mb ON rt.members_id = mb.members_id ' +
                ' LEFT JOIN members_detail as mbd ON mb.members_id = mbd.members_id' +
                ' LEFT JOIN car_wash as cw ON rt.car_wash_id = cw.car_wash_id ' +
                ' LEFT JOIN clean_service_detail as csd ON rt.clean_service_detail_id = csd.clean_service_detail_id ' +
                ' LEFT JOIN clean_service as cs ON csd.clean_service_id = cs.clean_service_id ' +
                ' LEFT JOIN car_detail cd ON cd.car_detail_id = rt.car_detail_id  ' +
                ' LEFT JOIN model m ON cd.model_id = m.model_id' +
                ' LEFT JOIN car c ON cd.car_id = c.car_id' +
                ' LEFT JOIN type_car tc ON cd.type_car_id = tc.type_car_id' +
                ' WHERE rt.reserv_status NOT IN(5, 6) GROUP BY qe.queue_id ORDER BY rt.start_date ASC';
            let query = mysql.format(sql, [id]);
            connection().query(query, (err, result) => {
                if (err) reject(err);
                result.map(rs => {
                    getList.push(rs);
                });
                return resolve(getList);
            });
        });
    },
    getOverTimeBooking() {
        return new Promise((resolve, reject) => {
            let getList = [];
            let sql =
                'SELECT * FROM reservations rt LEFT JOIN queue qe ON rt.queue_id = qe.queue_id WHERE rt.reserv_status = 0 GROUP BY rt.queue_id;'
            let query = mysql.format(sql);
            connection().query(query, (err, result) => {
                if (err) reject(err);
                result.map(rs => {
                    getList.push(rs);
                });
                return resolve(getList);
            });
        });
    },
    getAllReservationsWCleaner(id) {
        return new Promise((resolve, reject) => {
            let getList = [];
            let sql =
                'SELECT *,' +
                " if(qe.queue_date is not null,DATE_FORMAT(qe.queue_date,'%Y-%m-%d'),null) as queue_date " +
                ' FROM queue as qe LEFT JOIN reservations  as rt ON qe.queue_id = rt.queue_id ' +
                ' LEFT JOIN employee as ep ON rt.employee_id = ep.employee_id ' +
                ' LEFT JOIN members as mb ON rt.members_id = mb.members_id ' +
                ' LEFT JOIN members_detail as mbd ON mb.members_id = mbd.members_id' +
                ' LEFT JOIN car_wash as cw ON rt.car_wash_id = cw.car_wash_id ' +
                ' LEFT JOIN clean_service_detail as csd ON rt.clean_service_detail_id = csd.clean_service_detail_id ' +
                ' LEFT JOIN clean_service as cs ON csd.clean_service_id = cs.clean_service_id ' +
                ' LEFT JOIN car_detail cd ON cd.car_detail_id = rt.car_detail_id  ' +
                ' LEFT JOIN model m ON cd.model_id = m.model_id' +
                ' LEFT JOIN car c ON cd.car_id = c.car_id' +
                ' LEFT JOIN type_car tc ON cd.type_car_id = tc.type_car_id' +
                ' WHERE rt.reserv_status NOT IN(3) GROUP BY qe.queue_id';
            let query = mysql.format(sql, [id]);
            connection().query(query, (err, result) => {
                if (err) reject(err);
                result.map(rs => {
                    getList.push(rs);
                });
                return resolve(getList);
            });
        });
    },
    getAllReservationsJEmployeeJMembersJCar_washJType_carJPositionWmbidGsd(id) {
        return new Promise((resolve, reject) => {
            let getList = [];
            let sql =
                "SELECT *,if(qe.queue_date is not null,DATE_FORMAT(qe.queue_date,'%Y-%m-%d'),null) as queue_date " +
                ' FROM queue qe LEFT JOIN reservations rt ON qe.queue_id = rt.queue_id' +
                ' LEFT JOIN employee ep ON rt.employee_id = ep.employee_id' +
                ' LEFT JOIN members mb ON rt.members_id = mb.members_id' +
                ' LEFT JOIN members_detail mbd ON mb.members_id = mbd.members_id' +
                ' LEFT JOIN car_detail cd ON rt.car_detail_id = cd.car_detail_id' +
                ' LEFT JOIN model m ON cd.model_id = m.model_id' +
                ' LEFT JOIN car c ON cd.car_id = c.car_id' +
                ' LEFT JOIN type_car tc ON cd.type_car_id = tc.type_car_id' +
                ' LEFT JOIN car_wash cw ON rt.car_wash_id = cw.car_wash_id ' +
                ' LEFT JOIN clean_service_detail csd ON rt.clean_service_detail_id = csd.clean_service_detail_id ' +
                ' LEFT JOIN clean_service cs ON csd.clean_service_id = cs.clean_service_id ' +
                ' WHERE rt.employee_id = ? GROUP BY rt.queue_id';
            let query = mysql.format(sql, [id]);
            connection().query(query, (err, result) => {
                if (err) reject(err);
                result.map(rs => {
                    getList.push(rs);
                });
                return resolve(getList);
            });
        });
    },
    getReservationByEmployee(id) {
        return new Promise((resolve, reject) => {
            let getList = [];
            let sql =
                "SELECT *,if(qe.queue_date is not null,DATE_FORMAT(qe.queue_date,'%Y-%m-%d'),null) as queue_date  FROM queue qe LEFT JOIN reservations rt ON qe.queue_id = rt.queue_id" +
                ' LEFT JOIN car_detail cd ON rt.car_detail_id = cd.car_detail_id' +
                ' LEFT JOIN model m ON cd.model_id = m.model_id' +
                ' LEFT JOIN car c ON cd.car_id = c.car_id' +
                ' LEFT JOIN type_car tc ON cd.type_car_id = tc.type_car_id' +
                ' LEFT JOIN clean_service_detail csd ON rt.clean_service_detail_id = csd.clean_service_detail_id ' +
                ' LEFT JOIN clean_service cs ON csd.clean_service_id = cs.clean_service_id ORDER BY rt.start_date ASC';
            let query = mysql.format(sql, [id]);
            connection().query(query, (err, result) => {
                if (err) reject(err);
                result.map(rs => {
                    getList.push(rs);
                });
                return resolve(getList);
            });
        });
    },

    getQueueForDateByCashier(date) {
        return new Promise((resolve, reject) => {
            let getList = [];
            let sql = "SELECT q.queue_id FROM queue q WHERE q.queue_date = ?";
            let query = mysql.format(sql, [date]);
            connection().query(query, (err, result) => {
                if (err) console.log(err);
                result.map(rs => {
                    getList.push(rs);
                });
                return resolve(getList);
            });
        });
    },

    getReservationByStaff(id) {
        return new Promise((resolve, reject) => {
            let getList = [];
            let sql =
                "SELECT *,if(qe.queue_date is not null,DATE_FORMAT(qe.queue_date,'%Y-%m-%d'),null) as queue_date  FROM queue qe LEFT JOIN reservations rt ON qe.queue_id = rt.queue_id" +
                ' LEFT JOIN car_detail cd ON rt.car_detail_id = cd.car_detail_id' +
                ' LEFT JOIN model m ON cd.model_id = m.model_id' +
                ' LEFT JOIN car c ON cd.car_id = c.car_id' +
                ' LEFT JOIN type_car tc ON cd.type_car_id = tc.type_car_id' +
                ' LEFT JOIN clean_service_detail csd ON rt.clean_service_detail_id = csd.clean_service_detail_id ' +
                ' LEFT JOIN clean_service cs ON csd.clean_service_id = cs.clean_service_id' +
                ' LEFT JOIN car_wash cw ON rt.car_wash_id = cw.car_wash_id' +
                ' LEFT JOIN car_wash_detail cwd ON cw.car_wash_id = cwd.car_wash_id ' +
                ' GROUP BY rt.reserv_id ';
            let query = mysql.format(sql, [id]);
            connection().query(query, (err, result) => {
                if (err) reject(err);
                result.map(rs => {
                    getList.push(rs);
                });
                return resolve(getList);
            });
        });
    },
    getMemberByCarDetail(members_id, car_detail_id) {
        return new Promise((resolve, reject) => {
            let getList = [];
            let sql =
                'SELECT * FROM members mb LEFT JOIN members_detail mbd ON mb.members_id = mbd.members_id' +
                ' LEFT JOIN province pv ON mbd.members_province = pv.province_id' +
                ' WHERE mb.members_id = ? AND mbd.member_car_detail_id = ?';
            let query = mysql.format(sql, [members_id, car_detail_id]);
            connection().query(query, (err, result) => {
                if (err) reject(err);
                result.map(rs => {
                    getList.push(rs);
                });
                return resolve(getList);
            });
        });
    },
    getAllQueueJReservationsJEmployeeJMembersJCar_washJType_carJPositionWqeid(
        id
    ) {
        return new Promise((resolve, reject) => {
            let getList = [];
            let sql =
                "SELECT *,if(qe.queue_date is not null,DATE_FORMAT(qe.queue_date,'%Y-%m-%d'),null) as queue_date " +
                ' FROM queue qe LEFT JOIN reservations rt ON qe.queue_id = rt.queue_id ' +
                ' LEFT JOIN employee ep ON rt.employee_id = ep.employee_id ' +
                ' LEFT JOIN members mb ON rt.members_id = mb.members_id ' +
                ' LEFT JOIN members_detail mbd ON mbd.members_id = mb.members_id ' +
                ' LEFT JOIN car_detail cd ON cd.car_detail_id = rt.car_detail_id ' +
                ' LEFT JOIN model m ON m.model_id = cd.model_id ' +
                ' LEFT JOIN car c ON c.car_id = cd.car_id ' +
                ' LEFT JOIN type_car tc ON tc.type_car_id = cd.type_car_id ' +
                ' LEFT JOIN car_wash cw ON rt.car_wash_id = cw.car_wash_id ' +
                ' LEFT JOIN clean_service_detail csd ON rt.clean_service_detail_id = csd.clean_service_detail_id ' +
                ' LEFT JOIN clean_service cs ON csd.clean_service_id = cs.clean_service_id ' +
                ' WHERE qe.queue_id = ?';
            let query = mysql.format(sql, [id]);
            connection().query(query, (err, result) => {
                if (err) reject(err);
                result.map(rs => {
                    getList.push(rs);
                });
                return resolve(getList);
            });
        });
    },
    getAllReservationsJEmployeeJMembersJCar_washJType_carJPositionWqeidGsd(id) {
        return new Promise((resolve, reject) => {
            let getList = [];
            let sql =
                "SELECT *,if(qe.queue_date is not null,DATE_FORMAT(qe.queue_date,'%Y-%m-%d'),null) as queue_date " +
                ' FROM queue qe LEFT JOIN reservations rt ON qe.queue_id = rt.queue_id ' +
                ' LEFT JOIN employee ep ON rt.employee_id = ep.employee_id ' +
                ' LEFT JOIN car_detail cd ON cd.car_detail_id = rt.car_detail_id ' +
                ' LEFT JOIN members mb ON rt.members_id = mb.members_id ' +
                ' LEFT JOIN members_detail mbd ON mbd.members_id = mb.members_id ' +
                ' LEFT JOIN model m ON m.model_id = cd.model_id ' +
                ' LEFT JOIN car c ON c.car_id = cd.car_id ' +
                ' LEFT JOIN type_car tc ON tc.type_car_id = cd.type_car_id ' +
                ' LEFT JOIN car_wash cw ON rt.car_wash_id = cw.car_wash_id ' +
                ' LEFT JOIN clean_service_detail csd ON rt.clean_service_detail_id = csd.clean_service_detail_id ' +
                ' LEFT JOIN clean_service cs ON csd.clean_service_id = cs.clean_service_id ' +
                ' WHERE rt.reserv_id = ? GROUP BY mbd.members_detail_id';
            let query = mysql.format(sql, [id]);
            connection().query(query, (err, result) => {
                if (err) reject(err);
                result.map(rs => {
                    getList.push(rs);
                });
                return resolve(getList);
            });
        });
    },
    getAllReservationsJEmployeeJMembersJCar_washJType_carJPositionWcwidGsd(id) {
        return new Promise((resolve, reject) => {
            let getList = [];
            let sql =
                "SELECT *,if(qe.queue_date is not null,DATE_FORMAT(qe.queue_date,'%Y-%m-%d'),null) as queue_date " +
                ' FROM queue qe LEFT JOIN reservations rt ON qe.queue_id = rt.queue_id ' +
                ' LEFT JOIN employee ep ON rt.employee_id = ep.employee_id ' +
                ' LEFT JOIN members mb ON rt.members_id = mb.members_id ' +
                ' LEFT JOIN members_detail mbd ON mbd.members_id = mb.members_id ' +
                ' LEFT JOIN car_detail cd ON cd.car_detail_id = rt.car_detail_id ' +
                ' LEFT JOIN model m ON m.model_id = cd.model_id ' +
                ' LEFT JOIN car c ON c.car_id = cd.car_id ' +
                ' LEFT JOIN type_car tc ON tc.type_car_id = cd.type_car_id ' +
                ' LEFT JOIN car_wash cw ON rt.car_wash_id = cw.car_wash_id ' +
                ' LEFT JOIN cae_Wash_detail cwd ON cw.car_wash_id = cwd.car_wash_id ' +
                ' LEFT JOIN clean_service_detail csd ON rt.clean_service_detail_id = csd.clean_service_detail_id ' +
                ' LEFT JOIN clean_service cs ON csd.clean_service_id = cs.clean_service_id ' +
                ' WHERE cwd.employee_id = ? GROUP BY rt.start_date , rt.car_wash_id';
            let query = mysql.format(sql, [id]);
            connection().query(query, (err, result) => {
                if (err) reject(err);
                result.map(rs => {
                    getList.push(rs);
                });
                return resolve(getList);
            });
        });
    },
    getAllReservationsJEmployeeJMembersJCar_washJType_carJPositionWrs3() {
        return new Promise((resolve, reject) => {
            let getList = [];
            let sql =
                "SELECT *,if(qe.queue_date is not null,DATE_FORMAT(qe.queue_date,'%Y-%m-%d'),null) as queue_date " +
                ' FROM queue qe LEFT JOIN reservations rt ON qe.queue_id = rt.queue_id ' +
                ' LEFT JOIN employee ep ON rt.employee_id = ep.employee_id ' +
                ' LEFT JOIN members mb ON rt.members_id = mb.members_id ' +
                ' LEFT JOIN members_detail mbd ON mbd.members_id = mb.members_id ' +
                ' LEFT JOIN car_detail cd ON cd.car_detail_id = rt.car_detail_id ' +
                ' LEFT JOIN model m ON m.model_id = cd.model_id ' +
                ' LEFT JOIN car c ON c.car_id = cd.car_id ' +
                ' LEFT JOIN type_car tc ON tc.type_car_id = cd.type_car_id ' +
                ' LEFT JOIN car_wash cw ON rt.car_wash_id = cw.car_wash_id ' +
                ' LEFT JOIN clean_service_detail csd ON rt.clean_service_detail_id = csd.clean_service_detail_id ' +
                ' LEFT JOIN clean_service cs ON csd.clean_service_id = cs.clean_service_id ' +
                ' WHERE rt.reserv_status IN(4,5) GROUP BY rt.queue_id';
            let query = mysql.format(sql);
            connection().query(query, (err, result) => {
                if (err) reject(err);
                result.map(rs => {
                    getList.push(rs);
                });
                return resolve(getList);
            });
        });
    },
    getAllReservationWReport(date) {
        return new Promise((resolve, reject) => {
            let getList = [];
            let sql =
                "SELECT *,if(qe.queue_date is not null,DATE_FORMAT(qe.queue_date,'%Y-%m-%d'),null) as queue_date " +
                ' FROM queue qe LEFT JOIN reservations rt ON qe.queue_id = rt.queue_id ' +
                ' LEFT JOIN employee ep ON rt.employee_id = ep.employee_id ' +
                ' LEFT JOIN members mb ON rt.members_id = mb.members_id ' +
                ' LEFT JOIN members_detail mbd ON mbd.members_id = mb.members_id ' +
                ' LEFT JOIN car_detail cd ON cd.car_detail_id = rt.car_detail_id ' +
                ' LEFT JOIN model m ON m.model_id = cd.model_id ' +
                ' LEFT JOIN car c ON c.car_id = cd.car_id ' +
                ' LEFT JOIN type_car tc ON tc.type_car_id = cd.type_car_id ' +
                ' LEFT JOIN car_wash cw ON rt.car_wash_id = cw.car_wash_id ' +
                ' LEFT JOIN clean_service_detail csd ON rt.clean_service_detail_id = csd.clean_service_detail_id ' +
                ' LEFT JOIN clean_service cs ON csd.clean_service_id = cs.clean_service_id ' +
                ' WHERE rt.reserv_status IN(5) AND qe.queue_date = ? GROUP BY rt.queue_id';
            let query = mysql.format(sql, [date]);
            connection().query(query, (err, result) => {
                if (err) reject(err);
                result.map(rs => {
                    getList.push(rs);
                });
                return resolve(getList);
            });
        });
    },
    getAllReservationWReportSelectMonth(req) {
        return new Promise((resolve, reject) => {
            let getList = [];
            let sql =
                "SELECT *,if(qe.queue_date is not null,DATE_FORMAT(qe.queue_date,'%Y-%m-%d'),null) as queue_date " +
                ' FROM queue qe LEFT JOIN reservations rt ON qe.queue_id = rt.queue_id ' +
                ' LEFT JOIN employee ep ON rt.employee_id = ep.employee_id ' +
                ' LEFT JOIN members mb ON rt.members_id = mb.members_id ' +
                ' LEFT JOIN members_detail mbd ON mbd.members_id = mb.members_id ' +
                ' LEFT JOIN car_detail cd ON cd.car_detail_id = rt.car_detail_id ' +
                ' LEFT JOIN model m ON m.model_id = cd.model_id ' +
                ' LEFT JOIN car c ON c.car_id = cd.car_id ' +
                ' LEFT JOIN type_car tc ON tc.type_car_id = cd.type_car_id ' +
                ' LEFT JOIN car_wash cw ON rt.car_wash_id = cw.car_wash_id ' +
                ' LEFT JOIN clean_service_detail csd ON rt.clean_service_detail_id = csd.clean_service_detail_id ' +
                ' LEFT JOIN clean_service cs ON csd.clean_service_id = cs.clean_service_id ' +
                ' WHERE rt.reserv_status IN(5) AND MONTH(qe.queue_date) = ? GROUP BY rt.queue_id';
            let query = mysql.format(sql, [req.code]);
            connection().query(query, (err, result) => {
                if (err) reject(err);
                result.map(rs => {
                    getList.push(rs);
                });
                return resolve(getList);
            });
        });
    },

    getAllReservationWQueue(queue_id) {
        return new Promise((resolve, reject) => {
            let getList = [];
            let sql =
                "SELECT *,if(qe.queue_date is not null,DATE_FORMAT(qe.queue_date,'%Y-%m-%d'),null) as queue_date " +
                ' FROM queue qe LEFT JOIN reservations rt ON qe.queue_id = rt.queue_id ' +
                ' LEFT JOIN employee ep ON rt.employee_id = ep.employee_id ' +
                ' LEFT JOIN members mb ON rt.members_id = mb.members_id ' +
                ' LEFT JOIN members_detail mbd ON mbd.members_id = mb.members_id ' +
                ' LEFT JOIN car_detail cd ON cd.car_detail_id = rt.car_detail_id ' +
                ' LEFT JOIN model m ON m.model_id = cd.model_id ' +
                ' LEFT JOIN car c ON c.car_id = cd.car_id ' +
                ' LEFT JOIN type_car tc ON tc.type_car_id = cd.type_car_id ' +
                ' LEFT JOIN car_wash cw ON rt.car_wash_id = cw.car_wash_id ' +
                ' LEFT JOIN clean_service_detail csd ON rt.clean_service_detail_id = csd.clean_service_detail_id ' +
                ' LEFT JOIN clean_service cs ON csd.clean_service_id = cs.clean_service_id ' +
                ' WHERE rt.reserv_status IN(5) AND rt.queue_id = ? group by cs.service_name';
            let query = mysql.format(sql, [queue_id]);
            connection().query(query, (err, result) => {
                if (err) reject(err);
                result.map(rs => {
                    getList.push(rs);
                });
                return resolve(getList);
            });
        });
    },
    getDetailCarByMemberANDCar(car_detail_id, members_id) {
        return new Promise((resolve, reject) => {
            let getList = [];
            let sql =
                'SELECT * FROM members mb' +
                ' LEFT JOIN members_detail mbd ON mb.members_id = mbd.members_id' +
                ' LEFT JOIN car_detail cd ON mbd.member_car_detail_id = cd.car_detail_id' +
                ' LEFT JOIN model m ON cd.model_id = m.model_id ' +
                ' LEFT JOIN car c ON cd.car_id = c.car_id ' +
                ' LEFT JOIN type_car tc ON cd.type_car_id = tc.type_car_id ' +
                ' WHERE mbd.member_car_detail_id != ? AND mbd.members_id = ?';
            let query = mysql.format(sql, [car_detail_id, members_id]);
            connection().query(query, (err, result) => {
                if (err) reject(err);
                result.map(rs => {
                    getList.push(rs);
                });
                return resolve(getList);
            });
        });
    },
    getDetailCarByMember(id) {
        return new Promise((resolve, reject) => {
            let getList = [];
            let sql =
                // cd.car_detail_id,m.model_name,c.brand,tc.size,tc.type_car_id
                'SELECT * FROM members mb' +
                ' LEFT JOIN members_detail mbd ON mb.members_id = mbd.members_id' +
                ' LEFT JOIN car_detail cd ON mbd.member_car_detail_id = cd.car_detail_id' +
                ' LEFT JOIN model m ON cd.model_id = m.model_id ' +
                ' LEFT JOIN car c ON cd.car_id = c.car_id ' +
                ' LEFT JOIN type_car tc ON cd.type_car_id = tc.type_car_id WHERE mbd.members_id = ? GROUP BY member_car_detail_id';
            let query = mysql.format(sql, [id]);
            console.log(query);
            
            connection().query(query, (err, result) => {
                if (err) console.log(err);
                result.map(rs => {
                    getList.push(rs);
                });
                return resolve(getList);
            });
        });
    },
    getQueueForDate(date, id) {
        return new Promise((resolve, reject) => {
            let getList = [];
            let sql = 'SELECT q.queue_id FROM queue q' +
                ' LEFT JOIN assignment a ON q.queue_id = a.queue_id' +
                ' LEFT JOIN reservations rv ON q.queue_id = rv.queue_id' +
                ' LEFT JOIN car_wash cw ON rv.car_wash_id = cw.car_wash_id' +
                ' LEFT JOIN members m ON rv.members_id = m.members_id' +
                ' LEFT JOIN car_wash_detail cwd ON cw.car_wash_id = cwd.car_wash_id' +
                ' WHERE q.queue_date = ? AND a.employee_id = ? group by q.queue_id';
            let query = mysql.format(sql, [date, id]);
            connection().query(query, (err, result) => {
                if (err) console.log(err);
                result.map(rs => {
                    getList.push(rs);
                });
                return resolve(getList);
            });
        });
    },
    getQueueForDateAndMember(date, id) {
        return new Promise((resolve, reject) => {
            let getList = [];
            let sql =
                'SELECT * FROM queue qe LEFT JOIN reservations rt ON qe.queue_id = rt.queue_id' +
                ' WHERE qe.queue_date = ? AND rt.members_id = ? GROUP BY rt.queue_id';
            let query = mysql.format(sql, [date, id]);
            connection().query(query, (err, result) => {
                if (err) reject(err);
                result.map(rs => {
                    getList.push(rs);
                });
                return resolve(getList);
            });
        });
    },
    getQueueForMember(id) {
        return new Promise((resolve, reject) => {
            let getList = [];
            let sql =
                "SELECT rt.queue_id,rt.total_price,rt.start_date,rt.end_date,if(qe.queue_date is not null,DATE_FORMAT(qe.queue_date,'%Y-%m-%d'),null) as queue_date , " +
                " rt.reserv_status,CONCAT(m.model_name,' ',c.brand,' ',tc.size) as car,cw.car_wash_name, p.discount_percent" +
                ' FROM queue qe LEFT JOIN reservations rt ON qe.queue_id = rt.queue_id' +
                ' LEFT JOIN car_detail cd ON cd.car_detail_id = rt.car_detail_id' +
                ' LEFT JOIN model m ON m.model_id = cd.model_id' +
                ' LEFT JOIN car c ON c.car_id = cd.car_id' +
                ' LEFT JOIN type_car tc ON tc.type_car_id = cd.type_car_id' +
                ' LEFT JOIN car_wash cw ON cw.car_wash_id = rt.car_wash_id' +
                ' LEFT JOIN promotion p ON rt.promotion_id = p.promotion_id' +
                ' WHERE rt.members_id = ? GROUP BY rt.queue_id';
            let query = mysql.format(sql, [id]);
            connection().query(query, (err, result) => {
                if (err) reject(err);
                result.map(rs => {
                    getList.push(rs);
                });
                return resolve(getList);
            });
        });
    }
};
export default Multi_joinModel;