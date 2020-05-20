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
import reservationsController from "./reservations/reservationsController"
import clean_service_detailController from "./clean_service_detail/clean_service_detailController"
import wash_toolController from "./wash_tool/wash_toolController"
import modelController from "./model/modelController"
import promotionController from "./promotion/promotionController"
import upload_imgController from "./upload_img/upload_imgController"
import withdraw_returnController from "./withdraw_return/withdraw_returnController"
import ProvinceController from "./province/provinceController"
import bookingController from "./api_app/booking/bookingController"
import Multi_joinController from "./multi_join/multi_joinController"
import ReservationsController from "./reservations/reservationsController"

export function setup(router) {
    router
        .post('/login', authController.login)
        .post('/loginMember', authController.loginMember)
        .get('/getAllEmployee', employeeController.getAllEmployee)
        .get('/getEmployeeWeid/:id', employeeController.getEmployeeWeid)
        .get('/getEmployeeWpid2', employeeController.getEmployeeWpid2)
        .get('/getEmployeeWpidN12', employeeController.getEmployeeWpidN12)
        .post('/insertEmployee', employeeController.insertEmployee)
        .patch('/updateEmployeeSef_el_etWeid', employeeController.updateEmployeeSef_el_etWeid)
        .patch('/updateEmployeeByRegister', employeeController.updateEmployeeByRegister)
        .delete('/deleteEmployeeWeid/:id', employeeController.deleteEmployeeWeid)
        .get('/getAllMember', memberController.getAllMember)
        .get('/getAllMemberWmfL/:fname', memberController.getAllMemberWmfL)
        .get('/getMemberWcid/:id', memberController.getMemberWcid)
        .get('/getMemberForEdit/:id', memberController.getMemberForEdit)
        .get('/getMemberDetailForEditApi/:id', memberController.getMemberDetailForEditApi)
        .post('/insertMember', memberController.insertMember)
        .post('/insertMemberApi', memberController.insertMemberApi)
        .patch('/updateMemberSef_el_etWeid', memberController.updateMemberSef_el_etWeid)
        .post('/updateProfileMemberApi', memberController.updateProfileMemberApi)
        .delete('/deleteMemberWeid/:id', memberController.deleteMemberWeid)
        .get('/getAllBooking_detail', booking_detailController.getAllBooking_detail)
        .post('/insertBooking_detail', booking_detailController.insertBooking_detail)
        .delete('/deleteBooking_detailWeid/:id', booking_detailController.deleteBooking_detailWeid)
        .get('/getAllCar', carController.getAllCar)
        .post('/insertCar', carController.insertCar)
        .delete('/deleteCarWcid/:id', carController.deleteCarWcid)
        .get('/getAllCar_detail', car_detailController.getAllCar_detail)
        .post('/insertCar_detail', car_detailController.insertCar_detail)
        // .post('/insertdetailCar', car_detailController.insertdetailCar)
        .post('/insertBrand', car_detailController.insertCar)
        .post('/insertModel', car_detailController.insertModel)
        .patch('/updateCar_detailSm_cid_tcidWcdid', car_detailController.updateCar_detailSm_cid_tcidWcdid)
        .delete('/deleteCar_detailWcdid/:id', car_detailController.deleteCar_detailWcdid)
        .get('/getAllCar_wash', car_washController.getAllCar_wash)
        .get('/getAllCar_wash_detail', car_washController.getAllCar_wash_detail)
        .get('/getEmployeeWNotCarWash', car_washController.getEmployeeWNotCarWash)
        .get('/getEmployeeWCar_wash', car_washController.getEmployeeWCar_wash)
        .get('/getEmployeeWCar_wash2', car_washController.getEmployeeWCar_wash2)
        .post('/insertEmployeeToCar_wash', car_washController.insertEmployeeToCar_wash)
        .delete('/deleteEmployeeFormCar_wash/:id', car_washController.deleteEmployeeFormCar_wash)
        .get('/getAllType_car', type_carController.getAllType_car)
        .get('/getAllClean_service', clean_serviceController.getAllClean_service)
        .get('/getAllPosition', positionController.getAllPosition)
        .get('/getPositionWN1A2', positionController.getPositionWN1A2)
        .get('/getPositionWN1A3', positionController.getPositionWN1A3)
        .post('/getReservationsWcwidORrsidDESC', reservationsController.getReservationsWcwidORrsidDESC)
        .post('/insertReservations', reservationsController.insertReservations)
        .patch('/updateReservationsSrsWrsid', reservationsController.updateReservationsSrsWrsid)
        .post('/insertClean_service_detail', clean_service_detailController.insertClean_service_detail)
        .get('/getCleanServiceByTypeCar/:id', clean_service_detailController.getCleanServiceByTypeCar)
        .patch('/updateClean_service_detailSsp_esd_csid_tcidWcsdid', clean_service_detailController.updateClean_service_detailSsp_esd_csid_tcidWcsdid)
        .delete('/deleteClean_service_detailWcsdid/:id', clean_service_detailController.deleteClean_service_detailWcsdid)
        .get('/getAllWash_tool', wash_toolController.getAllWash_tool) //test
        .get('/getWash_tool', wash_toolController.getWash_tool)
        .get('/getWash_toolWPosition/:id', wash_toolController.getWash_toolWPosition)
        .post('/insertWash_tool', wash_toolController.insertWash_tool)
        .patch('/updateWash_toolStn_am_tsWwtid', wash_toolController.updateWash_toolStn_am_tsWwtid)
        .delete('/deleteWash_toolWwtid/:id', wash_toolController.deleteWash_toolWwtid)
        .get('/getAllPromotion', promotionController.getAllPromotion)
        .post('/insertPromotion', promotionController.insertPromotion)
        .patch('/updatePromotionWpmid', promotionController.updatePromotionWpmid)
        .delete('/deletePromotionWpmid/:id', promotionController.deletePromotionWpmid)
        .get('/getAllModel', modelController.getAllModel)
        .post('/updateProfile', upload_imgController.upload_img)
        .post('/insertWithdraw_return', withdraw_returnController.insertWithdraw_return)
        .post('/updatWithdraw_returnSasWwridReturn', withdraw_returnController.updatWithdraw_returnSasWwridReturn)
        .post('/updateWash_toolSedWwrid', withdraw_returnController.updateWash_toolSedWwrid)
        .post('/updateWash_toolSsaWwridReturn', withdraw_returnController.updateWash_toolSsaWwridReturn)
        .post('/updatWithdraw_returnSasWwrid', withdraw_returnController.updatWithdraw_returnSasWwrid)
        .get('/getAllClean_serviceJClean_service_detail', multi_joinController.getAllClean_serviceJClean_service_detail)
        .get('/getAllClean_service_detailJClean_serviceJType_car', multi_joinController.getAllClean_service_detailJClean_serviceJType_car)
        .get('/getAllCar_detailJClean_serviceJModelJCarJType_car', multi_joinController.getAllCar_detailJClean_serviceJModelJCarJType_car)
        .get('/getAllCar_detailOrderByBrand', multi_joinController.getAllCar_detailOrderByBrand)
        .get('/getCar_detailWSize/:id', multi_joinController.getCar_detailWSize)
        .get('/getCar_detailWId/:id', multi_joinController.getCar_detailWId)
        .get('/getAllCar_detailJClean_serviceJModelJCarJType_carApi', multi_joinController.getAllCar_detailJClean_serviceJModelJCarJType_carApi)
        .get('/getAllCar_detailApi', multi_joinController.getAllCar_detailApi)
        .get('/getAllWithdraw_returnJWash_toolJEmployee', multi_joinController.getAllWithdraw_returnJWash_toolJEmployee)
        .get('/getAllReservationsJEmployeeJMembersJCar_washJType_carJPosition/:id', multi_joinController.getAllReservationsJEmployeeJMembersJCar_washJType_carJPosition)
        .get('/getAllReservationsJEmployeeJMembersJCar_washJType_carJPositionWmbidGsd/:id', multi_joinController.getAllReservationsJEmployeeJMembersJCar_washJType_carJPositionWmbidGsd)
        .get('/getAllQueueJReservationsJEmployeeJMembersJCar_washJType_carJPositionWqeid/:id', multi_joinController.getAllQueueJReservationsJEmployeeJMembersJCar_washJType_carJPositionWqeid)
        .get('/getAllReservationsJEmployeeJMembersJCar_washJType_carJPositionWqeidGsd/:id', multi_joinController.getAllReservationsJEmployeeJMembersJCar_washJType_carJPositionWqeidGsd)
        .get('/getAllReservationsJEmployeeJMembersJCar_washJType_carJPositionWcwidGsd/:id', multi_joinController.getAllReservationsJEmployeeJMembersJCar_washJType_carJPositionWcwidGsd)
        .get('/getAllReservationsJEmployeeJMembersJCar_washJType_carJPositionWrs3/:id', multi_joinController.getAllReservationsJEmployeeJMembersJCar_washJType_carJPositionWrs3)
        .get('/getAllReservationsWCleaner', multi_joinController.getAllReservationsWCleaner)
        .get('/getDetailCarByMember/:id', multi_joinController.getDetailCarByMember)
        .get('/getDetailCarByMemberApi', multi_joinController.getDetailCarByMemberApi)
        .get('/getAllProvince', ProvinceController.getAllProvince)
        .get('/getAllProvinceApi', ProvinceController.getAllProvinceApi)
        .post('/insertBooking', bookingController.insertBooking)
        .get('/getReservationByQueueApi/:id', ReservationsController.getReservationByQueueApi)
        .get('/getQueueForMemberApi/:id', Multi_joinController.getQueueForMemberApi)
        .post('/updateStatusReservationByStaff', ReservationsController.updateStatusReservationByStaff)
        .get('/getReservationByCashier/:id', Multi_joinController.getReservationByCashier)
        .post('/updateStatusByCancelBooking', ReservationsController.updateStatusByCancelBooking)

}