/**
 * 验证token, in all page
 * @author jz_lee
 * @date 2020/12/9 10:02
 */

layui.use(['layer', 'jquery', 'form'], function () {
    let layer = layui.layer,
        $ = layui.jquery

    let jwt_token = localStorage.getItem("jwtToken");

    $.ajax({
        url: "http://127.0.0.1:8080/ssm/users/check",
        type: "post",
        data: {"name": "mr.lee"},
        dataType:"json",
        beforeSend: function (xhr) {
            //    //发送ajax请求之前向http的head里面加入验证信息
            xhr.setRequestHeader("jwtToken", jwt_token);  // 请求发起前在头部附加token
            xhr.setRequestHeader("abc", "abc")
        },
        success: res => {
            console.log('msg---->', res)

            // 更新token
            localStorage.removeItem("jwtToken")
            localStorage.setItem("jwtToken", res)

        },
        error: e => {
            // 进入error回调
            console.log('err', e)
            if (e.responseText == "bad") {
                layer.msg("您无权限，请登录")
                location.href = "../login.html";
            }
        }
    })

});
