import MemberModel from './memberModel';
import ModelModel from '../model/modelModel';

const MemberController = {
  getAllMember(req, res) {
    if (req.user) {
      MemberModel.getAllMember().then(rs => {
        res.status(200).json({ result: true, data: rs });
      });
    } else {
      res.status(401).json({ error: 'UnAuthorized' });
    }
  },
  getAllMemberWmfL(req, res) {
    if (req.user) {
      MemberModel.getAllMemberWmfL(req.params.fname).then(rs => {
        res.status(200).json({ result: true, data: rs });
      });
    } else {
      res.status(401).json({ error: 'UnAuthorized' });
    }
  },
  getMemberWcid(req, res) {
    if (req.user) {
      MemberModel.getMemberWcid(req.params.id).then(rs => {
        res.status(200).json({ result: true, data: rs });
      });
    } else {
      res.status(401).json({ error: 'UnAuthorized' });
    }
  },
  async insertMember(req, res) {
    if (req.user) {
      await MemberModel.insertMember(req.body);
      const member = await MemberModel.getMemberid();
      req.body.members_id = member[0].members_id;
      const car_detail_id = req.body.car_detail_id;
      for (let i = 0; i < car_detail_id.length; i++) {
        req.body.car_detail_id = car_detail_id[i].car.value;
        req.body.license = car_detail_id[i].license;
        req.body.province = car_detail_id[i].province.value;
        await MemberModel.insertMemberDetail(req.body);
      }
      res.status(201).json({
        result: 'success'
      });
    } else {
      res.status(401).json({ error: 'UnAuthorized' });
    }
  },
  updateMemberSef_el_etWeid(req, res) {
    if (req.user) {
      MemberModel.getMemberForEdit(req.body.id).then(async result => {
        if (result.length === req.body.car_detail_id.length) {
          await MemberModel.updateMemberSef_el_etWeid(req.body);
          const car_detail_id = req.body.car_detail_id;
          for (let i = 0; i < car_detail_id.length; i++) {
            req.body.car_detail_id = car_detail_id[i].editcar.value;
            req.body.license = car_detail_id[i].editlicense;
            req.body.province = car_detail_id[i].editprovince.value;
            req.body.detail_id = car_detail_id[i].editDetailId;
            MemberModel.updateMemberDetail(req.body);
          }
        } else {
          MemberModel.deleteMemberWeid(req.body.id).then(async res => {
            await MemberModel.deleteMemberDetail(req.body.id);

            await MemberModel.insertMember(req.body);
            const member = await MemberModel.getMemberid();
            req.body.members_id = member[0].members_id;
            const car_detail_id = req.body.car_detail_id;
            for (let i = 0; i < car_detail_id.length; i++) {
              req.body.car_detail_id = car_detail_id[i].editcar.value;
              req.body.license = car_detail_id[i].editlicense;
              req.body.province = car_detail_id[i].editprovince.value;
              await MemberModel.insertMemberDetail(req.body);
            }
          });
        }
        res.status(201).json({
            result: 'success'
          });
      });
    } else {
      res.status(401).json({ error: 'UnAuthorized' });
    }
  },
  deleteMemberWeid(req, res) {
    if (req.user) {
      MemberModel.deleteMemberWeid(req.params.id).then(async rs => {
        await MemberModel.deleteMemberDetail(req.params.id);
        res.status(200).json({ result: true, data: rs });
      });
    } else {
      res.status(401).json({ error: 'UnAuthorized' });
    }
  },
  getMemberForEdit(req, res) {
    if (req.user) {
      MemberModel.getMemberForEdit(req.params.id).then(rs => {
        res.status(200).json({ result: true, data: rs });
      });
    } else {
      res.status(401).json({ error: 'UnAuthorized' });
    }
  }
};
export default MemberController;
