// import upload_imgModel from "./upload_imgModel"
const waterfall = require('async-waterfall');
const waterfallController = {
    async waterfalGet(req, res) {
        if (req.user) {
            let res = 50
            waterfall([
                function(callback) {
                    callback(null, res, 'two');
                },
                function(arg1, arg2, callback) {
                    console.log(arg1, arg2)
                    callback(null, 'three');
                },
                function(arg1, callback) {
                    // arg1 now equals 'three'
                    callback(null, 'done');
                }
            ], function(err, result) {
                console.log(result)

            })
            res.status(201).json({
                "result": "success",
            })
        } else {
            res.status(401).json({ 'error': 'UnAuthorized' })
        }
    },
}
export default waterfallController