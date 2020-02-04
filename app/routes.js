import authController from "./auth/authController"
import employeeController from "./employee/employeeController"
import memberController from "./member/memberController"
import booking_detailController from "./booking_detail/booking_detailController"
import carController from "./car/carController"
import car_detailController from "./car_detail/car_detailController"
import reservationsController from "./reservations/reservationsController"
import car_washController from "./car_wash/car_washController"
import type_carController from "./type_car/type_carController"

export function setup(router) {
    router
        .post('/login', authController.login)
        .get('/getAllEmployee', employeeController.getAllEmployee)
        .get('/getEmployeeWpid2', employeeController.getEmployeeWpid2)
        .post('/insertEmployee', employeeController.insertEmployee)
        .patch('/updateEmployeeSef_el_etWeid', employeeController.updateEmployeeSef_el_etWeid)
        .delete('/deleteEmployeeWeid/:id', employeeController.deleteEmployeeWeid)
        .get('/getAllMember', memberController.getAllMember)
        .get('/getMemberWcid/:id', memberController.getMemberWcid)
        .post('/insertMember', memberController.insertMember)
        .patch('/updateMemberSef_el_etWeid', memberController.updateMemberSef_el_etWeid)
        .delete('/deleteMemberWeid/:id', memberController.deleteMemberWeid)
        .get('/getAllBooking_detail', booking_detailController.getAllBooking_detail)
        .post('/insertBooking_detail', booking_detailController.insertBooking_detail)
        .delete('/deleteBooking_detailWeid/:id', booking_detailController.deleteBooking_detailWeid)
        .get('/getAllCar', carController.getAllCar)
        .post('/insertCar', carController.insertCar)
        .delete('/deleteCarWcid/:id', carController.deleteCarWcid)
        .get('/getAllCar_detail', car_detailController.getAllCar_detail)
        .post('/insertCar_detail', car_detailController.insertCar_detail)
        .delete('/deleteCar_detailWcdid/:id', car_detailController.deleteCar_detailWcdid)
        .get('/getAllReservations', reservationsController.getAllReservations)
        .post('/insertReservations', reservationsController.insertReservations)
        .delete('/deleteReservationsWrid/:id', reservationsController.deleteReservationsWrid)
        .get('/getAllCar_wash', car_washController.getAllCar_wash)
        .get('/getAllType_car', type_carController.getAllType_car)
}