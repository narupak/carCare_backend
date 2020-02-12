import AuthModel from "./authModel";

const AuthController = {
    login(req, res) {
        AuthModel.getEmployeeByUsername(req.body).then(rs => {
            if (rs.result !== false) {
                res
                    .header('Authorization', rs.token)
                    .status(201)
                    .json(rs)
            } else {
                res
                    .status(401)
                    .json({
                        result: false
                    })
            }
        })
    },
    loginMember(req, res) {
        AuthModel.getMemberByMembername(req.body).then(rs => {
            if (rs.result !== false) {
                res
                    .header('Authorization', rs.token)
                    .status(201)
                    .json(rs)
            } else {
                res
                    .status(401)
                    .json({
                        result: false
                    })
            }
        })
    }

}
export default AuthController