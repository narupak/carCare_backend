import MemberModel from "./memberModel"

const MemberController = {
    getAllMember(req, res) {
        if (req.user) {
            MemberModel.getAllMember().then(rs => {
                res.status(200).json({ result: true, data: rs })
            })
        } else {
            res.status(401).json({ 'error': 'UnAuthorized' })
        }
    },
    getAllMemberWmfL(req, res) {
        if (req.user) {
            MemberModel.getAllMemberWmfL(req.params.fname).then(rs => {
                res.status(200).json({ result: true, data: rs })
            })
        } else {
            res.status(401).json({ 'error': 'UnAuthorized' })
        }
    },
    getMemberWcid(req, res) {
        if (req.user) {
            MemberModel.getMemberWcid(req.params.id).then(rs => {
                res.status(200).json({ result: true, data: rs })
            })
        } else {
            res.status(401).json({ 'error': 'UnAuthorized' })
        }
    },
    insertMember(req, res) {
        MemberModel.insertMember(req.body).then(rs => {
            res.status(201).json({
                "result": "success"
            })
        })
    },
    updateMemberSef_el_etWeid(req, res) {
        if (req.user) {
            MemberModel.updateMemberSef_el_etWeid(req.body).then(rs => {
                res.status(201).json({
                    "result": "success"
                })
            })
        } else {
            res.status(401).json({ 'error': 'UnAuthorized' })
        }
    },
    deleteMemberWeid(req, res) {
        if (req.user) {
            MemberModel.deleteMemberWeid(req.params.id).then(rs => {
                res.status(200).json({ result: true, data: rs })
            })
        } else {
            res.status(401).json({ 'error': 'UnAuthorized' })
        }
    }
}
export default MemberController