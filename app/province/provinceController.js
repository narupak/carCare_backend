
import promotionModel from "./provinceModel"
const ProvinceController = {
    getAllProvince(req, res) {
        if (req.user) {
            promotionModel.getAllProvince().then(results=>{
                res.status(200).json({ result: true, data: results })
            })
        } else {
            res.status(401).json({ 'error': 'UnAuthorized' })
        }
    }
}
export default ProvinceController