import Multi_joinModel from './multi_joinModel';
import ReservationsModel from '../reservations/reservationsModel';
var moment = require('moment');

const Multi_joinController = {
  async getAllClean_serviceJClean_service_detail(req, res) {
    if (req.user) {
      await Multi_joinModel.getAllClean_serviceJClean_service_detail().then(rs => {
        res.status(200).json({ result: true, data: rs });
      });
    } else {
      res.status(401).json({ error: 'UnAuthorized' });
    }
  },
  async getAllClean_service_detailJClean_serviceJType_car(req, res) {
    if (req.user) {
      await Multi_joinModel.getAllClean_service_detailJClean_serviceJType_car().then(
        rs => {
          res.status(200).json({ result: true, data: rs });
        }
      );
    } else {
      res.status(401).json({ error: 'UnAuthorized' });
    }
  },
  async getAllCar_detailJClean_serviceJModelJCarJType_car(req, res) {
    if (req.user) {
      await Multi_joinModel.getAllCar_detailJClean_serviceJModelJCarJType_car().then(
        rs => {
          res.status(200).json({ result: true, data: rs });
        }
      );
    } else {
      res.status(401).json({ error: 'UnAuthorized' });
    }
  },
  async getAllCar_detailOrderByBrand(req, res) {
    if (req.user) {
      await Multi_joinModel.getAllCar_detailOrderByBrand().then(
        rs => {
          res.status(200).json({ result: true, data: rs });
        }
      );
    } else {
      res.status(401).json({ error: 'UnAuthorized' });
    }
  },

  async getAllCar_detailOrderByBrandApi(req, res) {
    await Multi_joinModel.getAllCar_detailOrderByBrand().then(
      rs => {
        res.status(200).json({ result: true, data: rs });
      }
    );
  },

  async getCar_detailWSize(req, res) {
    if (req.user) {
      await Multi_joinModel.getCar_detailWSize(req.params.id).then(
        rs => {
          res.status(200).json({ result: true, data: rs });
        }
      );
    } else {
      res.status(401).json({ error: 'UnAuthorized' });
    }
  },
  async getCar_detailWSizeApi(req, res) {
    console.log(req.params.id)
    await Multi_joinModel.getCar_detailWSize(req.params.id).then(
      rs => {
        res.status(200).json({ result: true, data: rs });
      }
    );
  },
  async getCar_detailWId(req, res) {
    if (req.user) {
      await Multi_joinModel.getCar_detailWId(req.params.id).then(
        rs => {
          res.status(200).json({ result: true, data: rs });
        }
      );
    } else {
      res.status(401).json({ error: 'UnAuthorized' });
    }
  },

  async getCar_detailWIdApi(req, res) {
    console.log(req.params.id)
    await Multi_joinModel.getCar_detailWId(req.params.id).then(
      rs => {
        res.status(200).json({ result: true, data: rs });
      }
    );
  },

  async getAllCar_detailJClean_serviceJModelJCarJType_carApi(req, res) {
    await Multi_joinModel.getAllCar_detailJClean_serviceJModelJCarJType_carApi().then(
      rs => {
        res.status(200).json({ result: true, data: rs });
      }
    );
    res.status(401).json({ error: 'UnAuthorized' });
  },
  async getAllWithdraw_returnJWash_toolJEmployee(req, res) {
    if (req.user) {
      await Multi_joinModel.getAllWithdraw_returnJWash_toolJEmployee().then(rs => {
        res.status(200).json({ result: true, data: rs });
      });
    } else {
      res.status(401).json({ error: 'UnAuthorized' });
    }
  },

  async getAllReservationsJEmployeeJMembersJCar_washJType_carJPosition(req, res) {
    if (req.user) {
      let reserv = await Multi_joinModel.getAllReservationsJEmployeeJMembersJCar_washJType_carJPosition()
      let over = await Multi_joinModel.getOverTimeBooking();
      let timeOver = '00:15:00'
      let total;
      let time = moment();
      for (let i = 0; i < over.length; i++) {
        console.log('118 ' + over[i].start_date)
        total = over[i].start_date.split(":")[0] + ":" + timeOver.split(":")[1] + ":00";
        console.log('123 ' + total)

        if (moment(time).format("HH:mm:ss") > total) {
          await ReservationsModel.updateStatusReservationByTimeOver(over[i].queue_id)
          let status = await ReservationsModel.getAssginmentByTimeOver(over[i].queue_id)
          if (status.length > 0) {
            for (let i = 0; i < status.length; i++) {
              await ReservationsModel.deleteAssignment(status[i].queue_id)

            }
          }
          console.log(status)
        }
      }
      res.status(200).json({ result: true, data: reserv });
    } else {
      res.status(401).json({ error: 'UnAuthorized' });
    }
  },

  async getAllReservationsWCleaner(req, res) {
    if (req.user) {
      await Multi_joinModel.getAllReservationsWCleaner(
      ).then(rs => {
        res.status(200).json({ result: true, data: rs });
      });
    } else {
      res.status(401).json({ error: 'UnAuthorized' });
    }
  },

  async getAllReservationsJEmployeeJMembersJCar_washJType_carJPositionWmbidGsd(
    req,
    res
  ) {
    if (req.user) {
      let reservationDetail;
      let resultReserve;
      let reservation = [];
      let queue = await Multi_joinModel.getQueueForDate(
        moment(new Date()).format('YYYY-MM-DD'), req.params.id
      );
      reservationDetail = await Multi_joinModel.getReservationByEmployee(
        req.params.id
      );
      for (let i = 0; i < queue.length; i++) {
        let service = '';
        for (let j = 0; j < reservationDetail.length; j++) {
          if (queue[i].queue_id === reservationDetail[j].queue_id) {
            if (service === '') {
              service = reservationDetail[j].service_name;
            } else {
              service += ',' + reservationDetail[j].service_name;
            }
            resultReserve = reservationDetail[j];
          }
        }
        reservation[i] = { resultReserve: resultReserve, service: service };
      }
      let memberDetail;
      let resultReserveAll = [];
      for (let i = 0; i < reservation.length; i++) {
        memberDetail = await Multi_joinModel.getMemberByCarDetail(
          reservation[i].resultReserve.members_id,
          reservation[i].resultReserve.car_detail_id
        );
        for (let j = 0; j < memberDetail.length; j++) {
          resultReserveAll[i] = {
            car_detail: reservation[i],
            member: memberDetail[j]
          };
        }
      }
      res.status(200).json({ result: true, data: resultReserveAll });
    } else {
      res.status(401).json({ error: 'UnAuthorized' });
    }
  },

  async getReservationByCashier(
    req,
    res
  ) {
    if (req.user) {
      let reservationDetail;
      let resultReserve;
      let reservation = [];
      let queue = await Multi_joinModel.getQueueForDateByCashier(
        moment(new Date()).format('YYYY-MM-DD')
      );
      reservationDetail = await Multi_joinModel.getReservationByEmployee(
      );
      for (let i = 0; i < queue.length; i++) {
        let service = '';
        for (let j = 0; j < reservationDetail.length; j++) {
          if (queue[i].queue_id === reservationDetail[j].queue_id) {
            if (service === '') {
              service = reservationDetail[j].service_name;
            } else {
              service += ',' + reservationDetail[j].service_name;
            }
            resultReserve = reservationDetail[j];
          }
          console.log(service)
        }
        reservation[i] = { resultReserve: resultReserve, service: service };
      }
      let memberDetail;
      let resultReserveAll = [];
      for (let i = 0; i < reservation.length; i++) {
        memberDetail = await Multi_joinModel.getMemberByCarDetail(
          reservation[i].resultReserve.members_id,
          reservation[i].resultReserve.car_detail_id
        );
        for (let j = 0; j < memberDetail.length; j++) {
          resultReserveAll[i] = {
            car_detail: reservation[i],
            member: memberDetail[j]
          };
        }
      }
      res.status(200).json({ result: true, data: resultReserveAll });
    } else {
      res.status(401).json({ error: 'UnAuthorized' });
    }
  },

  getAllQueueJReservationsJEmployeeJMembersJCar_washJType_carJPositionWqeid(
    req,
    res
  ) {
    if (req.user) {
      Multi_joinModel.getAllQueueJReservationsJEmployeeJMembersJCar_washJType_carJPositionWqeid(
        req.params.id
      ).then(rs => {
        res.status(200).json({ result: true, data: rs });
      });
    } else {
      res.status(401).json({ error: 'UnAuthorized' });
    }
  },
  getAllReservationsJEmployeeJMembersJCar_washJType_carJPositionWqeidGsd(
    req,
    res
  ) {
    if (req.user) {
      Multi_joinModel.getAllReservationsJEmployeeJMembersJCar_washJType_carJPositionWqeidGsd(
        req.params.id
      ).then(rs => {
        res.status(200).json({ result: true, data: rs });
      });
    } else {
      res.status(401).json({ error: 'UnAuthorized' });
    }
  },
  async getAllReservationsJEmployeeJMembersJCar_washJType_carJPositionWcwidGsd(
    req,
    res
  ) {
    if (req.user) {
      let reservationDetail;
      let resultReserve;
      let reservation = [];
      let queue = await Multi_joinModel.getQueueForDate(
        moment(new Date()).format('YYYY-MM-DD'), req.params.id
      );
      reservationDetail = await Multi_joinModel.getReservationByStaff(
        req.params.id

      );
      for (let i = 0; i < queue.length; i++) {
        let service = '';
        for (let j = 0; j < reservationDetail.length; j++) {
          if (queue[i].queue_id === reservationDetail[j].queue_id) {
            if (service === '') {
              service = reservationDetail[j].service_name;
            } else {
              service += ',' + reservationDetail[j].service_name;
            }
            resultReserve = reservationDetail[j];
          }
        }
        reservation[i] = { resultReserve: resultReserve, service: service };
      }
      let memberDetail;
      let resultReserveAll = [];
      for (let i = 0; i < reservation.length; i++) {
        memberDetail = await Multi_joinModel.getMemberByCarDetail(
          reservation[i].resultReserve.members_id,
          reservation[i].resultReserve.car_detail_id
        );
        for (let j = 0; j < memberDetail.length; j++) {
          resultReserveAll[i] = {
            car_detail: reservation[i],
            member: memberDetail[j]
          };
        }
      }
      res.status(200).json({ result: true, data: resultReserveAll });
    } else {
      res.status(401).json({ error: 'UnAuthorized' });
    }
  },
  async getAllReservationsJEmployeeJMembersJCar_washJType_carJPositionWrs3(req, res) {
    if (req.user) {
      let queueReport;
      let reservationReport = [];
      let data = await Multi_joinModel.getAllReservationsJEmployeeJMembersJCar_washJType_carJPositionWrs3()
      console.log(data.length);
      for (let i = 0; i < data.length; i++) {
        let service = '';
        console.log(data[i].queue_id)
        let queue = await Multi_joinModel.getAllReservationWQueue(data[i].queue_id)
        for (let j = 0; j < queue.length; j++) {
          if (data[i].queue_id === queue[j].queue_id) {
            if (service === '') {
              service = queue[j].service_name;
            } else {
              service += ',' + queue[j].service_name;
            }
          }
          queueReport = queue[j];
          reservationReport[i] = { resultReserve: queueReport, service: service }

          console.log(reservationReport)
        }
      }
      res.status(200).json({ result: true, data: reservationReport });
      ;
    } else {
      res.status(401).json({ error: 'UnAuthorized' });
    }
  },
  async getAllReservationWReport(req, res) {
    if (req.user) {
      let queueReport;
      let reservationReport = [];
      console.log('323 ' + req.body.date)
      let data = await Multi_joinModel.getAllReservationWReport(req.body.date)
      console.log(data.length)
      for (let i = 0; i < data.length; i++) {
        let service = '';
        console.log(data[i].queue_id)
        let queue = await Multi_joinModel.getAllReservationWQueue(data[i].queue_id)
        for (let j = 0; j < queue.length; j++) {
          if (data[i].queue_id === queue[j].queue_id) {
            if (service === '') {
              service = queue[j].service_name;
            } else {
              service += ',' + queue[j].service_name;
            }
          }
          queueReport = queue[j];
          reservationReport[i] = { resultReserve: queueReport, service: service }

          console.log(reservationReport)
        }
      }
      res.status(200).json({ result: true, data: reservationReport });

    } else {
      res.status(401).json({ error: 'UnAuthorized' });
    }
  },
  async getAllReservationWReportSelectMonth(req, res) {
    if (req.user) {
      let queueReport;
      let reservationReport = [];
      console.log('354 ' + req.body)
      let data = await Multi_joinModel.getAllReservationWReportSelectMonth(req.body)
      console.log(data.length)
      for (let i = 0; i < data.length; i++) {
        let service = '';
        console.log(data[i].queue_id)
        let queue = await Multi_joinModel.getAllReservationWQueue(data[i].queue_id)
        for (let j = 0; j < queue.length; j++) {
          if (data[i].queue_id === queue[j].queue_id) {
            if (service === '') {
              service = queue[j].service_name;
            } else {
              service += ',' + queue[j].service_name;
            }
          }
          queueReport = queue[j];
          reservationReport[i] = { resultReserve: queueReport, service: service }

          console.log(reservationReport)
        }
      }
      res.status(200).json({ result: true, data: reservationReport });

    } else {
      res.status(401).json({ error: 'UnAuthorized' });
    }
  },
  async getDetailCarByMember(req, res) {
    if (req.user) {
      let detailCar;
      let queueMember = await Multi_joinModel.getQueueForDateAndMember(
        moment(new Date()).format('YYYY-MM-DD'),
        req.params.id
      );
      if (queueMember.length > 0) {
        for (let i = 0; i < queueMember.length; i++) {
          detailCar = await Multi_joinModel.getDetailCarByMemberANDCar(
            queueMember[i].car_detail_id,
            queueMember[i].members_id
          );
          console.log('305 ' + queueMember[i].members_id + ' 1')
          console.log('306 ' + req.body)
          console.log('307 ' + detailCar)
        }
      } else {
        detailCar = await Multi_joinModel.getDetailCarByMember(req.params.id);
      }
      console.log(queueMember.length + ' 2')
      res.status(200).json({ result: true, data: detailCar });
    } else {
      res.status(401).json({ error: 'UnAuthorized' });
    }
  },
  async getDetailCarByMemberApi(req, res) {
    let detailCar;
    let queueMember = await Multi_joinModel.getQueueForDateAndMember(
      moment(new Date()).format('YYYY-MM-DD')
    );
    detailCar = await Multi_joinModel.getDetailCarByMember(req.params.id);

    res.status(200).json({ result: true, data: detailCar });
  },
  getAllCar_detailApi(req, res) {
    Multi_joinModel.getAllCar_detailJClean_serviceJModelJCarJType_car().then(
      rs => {
        res.status(200).json({ result: true, data: rs });
      }
    );
  },
  getQueueForMemberApi(req, res) {
    if (req.user) {
      Multi_joinModel.getQueueForMember(req.params.id).then(rs => {
        res.status(200).json({ result: true, data: rs });
      });
    } else {
      res.status(401).json({ error: 'UnAuthorized' });
    }
  }
};
export default Multi_joinController;
