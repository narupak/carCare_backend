import authController from "./auth/authController"
import employeeController from "./employee/employeeController"
import memberController from "./member/memberController"
import booking_detailController from "./booking_detail/booking_detailController"
import carController from "./car/carController"
import car_detailController from "./car_detail/car_detailController"
import car_washController from "./car_wash/car_washController"
import type_carController from "./type_car/type_carController"
import clean_serviceController from "./clean_service/clean_serviceController"
import multi_joinController from "./multi_join/multi_joinController"
import positionController from "./position/positionController"
import ReservationsController from "./reservations/reservationsController"
import clean_service_detailController from "./clean_service_detail/clean_service_detailController"

export function setup(router) {
    router
        .post('/login', authController.login)
        .get('/getAllEmployee', employeeController.getAllEmployee)
        .get('/getEmployeeWpid2', employeeController.getEmployeeWpid2)
        .get('/getEmployeeWpidN12', employeeController.getEmployeeWpidN12)
        .post('/insertEmployee', employeeController.insertEmployee)
        .patch('/updateEmployeeSef_el_etWeid', employeeController.updateEmployeeSef_el_etWeid)
        .delete('/deleteEmployeeWeid/:id', employeeController.deleteEmployeeWeid)
        .get('/getAllMember', memberController.getAllMember)
        .get('/getAllMemberWmfL/:fname', memberController.getAllMemberWmfL)
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
        .patch('/updateCar_detailSm_cid_tcidWcdid', car_detailController.updateCar_detailSm_cid_tcidWcdid)
        .delete('/deleteCar_detailWcdid/:id', car_detailController.deleteCar_detailWcdid)
        .get('/getAllCar_wash', car_washController.getAllCar_wash)
        .get('/getAllType_car', type_carController.getAllType_car)
        .get('/getAllClean_service', clean_serviceController.getAllClean_service)
        .get('/getAllPosition', positionController.getAllPosition)
        .post('/insertReservations', ReservationsController.insertReservations)
        .post('/insertClean_service_detail', clean_service_detailController.insertClean_service_detail)
        .patch('/updateClean_service_detailSsp_esd_csid_tcidWcsdid', clean_service_detailController.updateClean_service_detailSsp_esd_csid_tcidWcsdid)
        .delete('/deleteClean_service_detailWcsdid/:id', clean_service_detailController.deleteClean_service_detailWcsdid)
        .get('/getAllClean_serviceJClean_service_detail', multi_joinController.getAllClean_serviceJClean_service_detail)
        .get('/getAllClean_service_detailJClean_serviceJType_car', multi_joinController.getAllClean_service_detailJClean_serviceJType_car)
}