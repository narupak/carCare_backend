import upload_imgModel from "./upload_imgModel"

const Upload_imgController = {
    async upload_img(req, res) {
        if (req.user) {
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