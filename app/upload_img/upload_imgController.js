import upload_imgModel from "./upload_imgModel"

const Upload_imgController = {
    async upload_img(req, res) {
        if (req.user) {
            require("fs").writeFile(__dirname + "/store/1.png", req.body.editImage, 'base64', function(err) {
                console.log(err);
            });
            await upload_imgModel.upload_img(req.body)
            res.status(201).json({
                "result": "success",
            })
        } else {
            res.status(401).json({ 'error': 'UnAuthorized' })
        }
    },
}
export default Upload_imgController