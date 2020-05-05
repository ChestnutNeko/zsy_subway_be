const Login = module.exports;

function rand(min, max) {
    return Math.floor(Math.random()*(max-min)) + min
}
var validatePhoneCode = [];
let = sendCodeP = () => {
    for(var item of validatePhoneCode) {
        if(phone == item.phone) {
            return true
        }
    }
    return false
}

// 模拟验证码发送接口
Login.sendCode = (req, res) => {
    let phone = req.query.phone;
    if(sendCodeP(phone)) {
        res.send({
            'code': 400,
            'msg': '已发送过验证码，请稍后再试'
        });
    }
    let code = rand(1000, 9999);
    validatePhoneCode.push({
        'phone': phone,
        'code': code
    });
    res.send({
        'code': 200,
        'msg': '发送成功'
    });
    console.log(code);
}

// 验证码输入接口
