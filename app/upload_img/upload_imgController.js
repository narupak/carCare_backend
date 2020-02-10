import upload_imgModel from "./upload_imgModel"
var formidable = require('formidable');

const Upload_imgController = {
    async upload_img(req, res) {
        if (req.user) {
            // require("fs").writeFile(__dirname + "/1.jpg", req.body.editImage, 'base64', function(err) {
            //     console.log(err);
            // });
            var form = new formidable.IncomingForm();
            form.parse(req , function(err , fields , files){
                if(err){
                    console.error(err.message);
                    return;
                }else{
                    upload_imgModel.upload_img(fields)
                    res.status(201).json({
                        "result": "success",
                    })
                }
            })
        } else {
            res.status(401).json({ 'error': 'UnAuthorized' })
        }
    },
}
export default Upload_imgController