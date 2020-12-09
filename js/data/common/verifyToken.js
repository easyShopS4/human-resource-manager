/**
 * 验证token, in all page
 * @author jz_lee
 * @date 2020/12/9 10:02
 */

layui.use(['layer', 'jquery', 'form'], function () {
    let layer = layui.layer,
        $ = layui.jquery

    let jwt_token = localStorage.getItem("jwtToken");
    // alert("cccc"+jwt_token);
    $.ajax({
        url: "http://127.0.0.1:8080/ssm/config-file-first-kind/all",
        type: "post",
        dataType:"json",
        /*beforeSend: function (xhr) {
            //    //发送ajax请求之前向http的head里面加入验证信息
            // xhr.setRequestHeader("jwtToken", "Basic "+window.btoa("dsfdf"));  // 请求发起前在头部附加token

        },*/
        headers: {
            "jwtToken":"Access-Token123456",//自定义请求头
            "Content-Type":"application/json;charset=utf8",
            "abc": jwt_token
        },
        crossDomain: true,
        success: res => {
            console.log(res)
            if (!res) {
                layer.msg("您无权限，请登录")
                location.href = "../login.html";
            }
        }
    })

});
