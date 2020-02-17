import Multi_joinModel from './multi_joinModel';

const Multi_joinController = {
  getAllClean_serviceJClean_service_detail(req, res) {
    if (req.user) {
      Multi_joinModel.getAllClean_serviceJClean_service_detail().then(rs => {
        res.status(200).json({ result: true, data: rs });
      });
    } else {
      res.status(401).json({ error: 'UnAuthorized' });
    }
  },
  getAllClean_service_detailJClean_serviceJType_car(req, res) {
    if (req.user) {
      Multi_joinModel.getAllClean_service_detailJClean_serviceJType_car().then(
        rs => {
          res.status(200).json({ result: true, data: rs });
        }
      );
    } else {
      res.status(401).json({ error: 'UnAuthorized' });
    }
  },
  getAllCar_detailJClean_serviceJModelJCarJType_car(req, res) {
    if (req.user) {
      Multi_joinModel.getAllCar_detailJClean_serviceJModelJCarJType_car().then(
        rs => {
          res.status(200).json({ result: true, data: rs });
        }
      );
    } else {
      res.status(401).json({ error: 'UnAuthorized' });
    }
  },
  getAllWithdraw_returnJWash_toolJEmployee(req, res) {
    if (req.user) {
      Multi_joinModel.getAllWithdraw_returnJWash_toolJEmployee().then(rs => {
        res.status(200).json({ result: true, data: rs });
      });
    } else {
      res.status(401).json({ error: 'UnAuthorized' });
    }
  },
  getAllReservationsJEmployeeJMembersJCar_washJType_carJPosition(req, res) {
    if (req.user) {
      Multi_joinModel.getAllReservationsJEmployeeJMembersJCar_washJType_carJPosition(
        req.params.id
      ).then(rs => {
        res.status(200).json({ result: true, data: rs });
      });
    } else {
      res.status(401).json({ error: 'UnAuthorized' });
    }
  },
  getAllReservationsJEmployeeJMembersJCar_washJType_carJPositionWmbidGsd(
    req,
    res
  ) {
    if (req.user) {
      let reservationDetail;
      Multi_joinModel.getReservationByEmployee(req.params.id)
        .then(rs => {
          let resultse = [];
            rs.map(results => {
            reservationDetail = new Promise((resolve, reject) => {
              Multi_joinModel.getMemberByCarDetail(
                results.members_id,
                results.car_detail_id
              )
                .then(result => {
                  result.map(resMem => {
                    resultse.push({
                        car_detail : results,
                        member: resMem
                    });
                  });
                  resolve(resultse);
                })
                .catch(err => {
                  console.log(err);
                });
            });
          });
          reservationDetail.then(rest => {
            res.status(200).json({ result: true, data: rest });
          });
        })
        .catch(err => {
          throw err;
        });
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
  getAllReservationsJEmployeeJMembersJCar_washJType_carJPositionWcwidGsd(
    req,
    res
  ) {
    if (req.user) {
      Multi_joinModel.getAllReservationsJEmployeeJMembersJCar_washJType_carJPositionWcwidGsd(
        req.params.id
      ).then(rs => {
        res.status(200).json({ result: true, data: rs });
      });
    } else {
      res.status(401).json({ error: 'UnAuthorized' });
    }
  },
  getAllReservationsJEmployeeJMembersJCar_washJType_carJPositionWrs3(req, res) {
    if (req.user) {
      Multi_joinModel.getAllReservationsJEmployeeJMembersJCar_washJType_carJPositionWrs3(
        req.params.id
      ).then(rs => {
        res.status(200).json({ result: true, data: rs });
      });
    } else {
      res.status(401).json({ error: 'UnAuthorized' });
    }
  },
  getDetailCarByMember(req, res) {
    if (req.user) {
      Multi_joinModel.getDetailCarByMember(req.params.id).then(rs => {
        res.status(200).json({ result: true, data: rs });
      });
    } else {
      res.status(401).json({ error: 'UnAuthorized' });
    }
  }
};
export default Multi_joinController;
