import car_detailModel from "./car_detailModel"

const car_detailController = {
    getAllCar_detail(req, res) {
        if (req.user) {
            car_detailModel.getAllCar_detail().then(rs => {
                res.status(200).json({ result: true, data: rs })
            })
        } else {
            res.status(401).json({ 'error': 'UnAuthorized' })
        }
    },
    async insertCar_detail(req, res) {
        //const { username , password , fname , lname , tel , status , position } = req.body
        if (req.user) {
            if (req.body.car_id != null && req.body.model_id != null) {
                await car_detailModel.insertCar_detail(req.body).then(rs => {
                    res.status(200).json({
                        "result": "success"
                    })
                })
            } else if (req.body.addBrand != "" && req.body.addModel != "") {
                console.log(req.body)
                let brandCar = await car_detailModel.getBrandCar(req.body)
                let modelCar = await car_detailModel.getModelCar(req.body)
                do {
                    if (brandCar.length > 0) {
                        res.status(201).json({
                            result: { brandCar: false }
                        });
                        break;
                    } else if (modelCar.length > 0) {
                        res.status(201).json({
                            result: { modelCar: false }
                        });
                        console.log(result)
                        break;
                    }
                    else {
                        await car_detailModel.insertCar(req.body)
                        await car_detailModel.insertModel(req.body)
                    }
                } while (brandCar.length > 0 && modelCar > 0)
                let b = await car_detailModel.getBrandCar(req.body)
                req.body.car_id = b[0].car_id

                let m = await car_detailModel.getModelCar(req.body)
                req.body.model_id = m[0].model_id

                console.log(req.body.car_id + ' 47')
                console.log(req.body.type_car_id + ' 48')
                if (req.body.car_id != 0 && req.body.model_id != 0) {
                    await car_detailModel.insertCar_detail(req.body).then(rs => {
                        res.status(200).json({
                            "result": "success"
                        })
                    })
                } else {
                    res.status(201).json({
                        "result": "false"
                    })
                }
            } else if (req.body.addBrand == "") {
                let modelCar = await car_detailModel.getModelCar(req.body)
                if (modelCar.length > 0) {
                    res.status(201).json({
                        result: { modelCar: false }
                    });
                    console.log(result)
                } else {
                    await car_detailModel.insertModel(req.body)
                }
                let m = await car_detailModel.getModelCar(req.body)
                req.body.model_id = m[0].model_id

                if (req.body.model_id != 0) {
                    console.log('84')
                    await car_detailModel.insertCar_detail(req.body).then(rs => {
                        res.status(200).json({
                            "result": "success"
                        })
                    })
                } else {
                    res.status(201).json({
                        "result": "false"
                    })
                }
            } else if (req.body.addModel == "") {
                let brandCar = await car_detailModel.getBrandCar(req.body)
                if (brandCar.length > 0) {
                    res.status(201).json({
                        result: { brandCar: false }
                    });
                } else {
                    await car_detailModel.insertCar(req.body)
                }
                let b = await car_detailModel.getBrandCar(req.body)
                req.body.car_id = b[0].car_id

                if (req.body.car_id != 0) {
                    console.log('84')
                    await car_detailModel.insertCar_detail(req.body).then(rs => {
                        res.status(200).json({
                            "result": "success"
                        })
                    })
                } else {
                    res.status(201).json({
                        "result": "false"
                    })
                }
            }
        } else {
            res.status(401).json({ 'error': 'UnAuthorized' })
        }
    },
    insertCar(req, res) {
        //const { username , password , fname , lname , tel , status , position } = req.body
        if (req.user) {
            car_detailModel.insertCar(req.body).then(rs => {
                res.status(201).json({
                    "result": "success"
                })
            })
        } else {
            res.status(401).json({ 'error': 'UnAuthorized' })
        }
    },
    insertModel(req, res) {
        //const { username , password , fname , lname , tel , status , position } = req.body
        if (req.user) {
            car_detailModel.insertModel(req.body).then(rs => {
                res.status(201).json({
                    "result": "success"
                })
            })
        } else {
            res.status(401).json({ 'error': 'UnAuthorized' })
        }
    },
    updateCar_detailSm_cid_tcidWcdid(req, res) {
        //const { username , password , fname , lname , tel , status , position } = req.body
        if (req.user) {
            car_detailModel.updateCar_detailSm_cid_tcidWcdid(req.body).then(rs => {
                res.status(201).json({
                    "result": "success"
                })
            })
        } else {
            res.status(401).json({ 'error': 'UnAuthorized' })
        }
    },
    deleteCar_detailWcdid(req, res) {
        if (req.user) {
            car_detailModel.deleteCar_detailWcdid(req.params.id).then(rs => {
                res.status(200).json({ result: true, data: rs })
            })
        } else {
            res.status(401).json({ 'error': 'UnAuthorized' })
        }
    }
}
export default car_detailController