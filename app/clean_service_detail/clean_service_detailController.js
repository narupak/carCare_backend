import Clean_service_detailModel from "./clean_service_detailModel"

const Clean_service_detailController = {
    insertClean_service_detail(req, res) {
        //const { username , password , fname , lname , tel , status , position } = req.body
        if (req.user) {
            Clean_service_detailModel.insertClean_service_detail(req.body).then(rs => {
                res.status(201).json({
                    "result": "success"
                })
            })
        } else {
            res.status(401).json({ 'error': 'UnAuthorized' })
        }
    },
    updateClean_service_detailSsp_esd_csid_tcidWcsdid(req, res) {
        if (req.user) {
            Clean_service_detailModel.updateClean_service_detailSsp_esd_csid_tcidWcsdid(req.body).then(rs => {
                res.status(201).json({
                    "result": "success"
                })
            })
        } else {
            res.status(401).json({ 'error': 'UnAuthorized' })
        }
    },
    deleteClean_service_detailWcsdid(req, res) {
        if (req.user) {
            Clean_service_detailModel.deleteClean_service_detailWcsdid(req.params.id).then(rs => {
                res.status(201).json({
                    "result": "success"
                })
            })
        } else {
            res.status(401).json({ 'error': 'UnAuthorized' })
        }
    }
}
export default Clean_service_detailController