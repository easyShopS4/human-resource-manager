/**
 * 验证token, in all page
 * @author jz_lee
 * @date 2020/12/9 10:02
 */

layui.use(['layer', 'jquery', 'form'], function () {
    let layer = layui.layer,
        $ = layui.jquery

    let jwt_token = localStorage.getItem("jwtToken");

    function getRootPath(){
        let currentPagePath=location.href;
        let pathName = window.document.location.pathname;
        let pos = currentPagePath.indexOf(pathName);
        let localhostPath = currentPagePath.substring(0,pos);
        let projectName = pathName.substring(0,pathName.substr(1).indexOf("/")+1); // projectName

        // return localhostPath ;  http://localhost:63342
        // return projectName;  /human-resource-manager
        return localhostPath + projectName;
    }

    getRootPath()

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
            console.log('res', res)

            if (res.code ===  200) {
                // 更新token
                localStorage.removeItem("jwtToken")
                localStorage.setItem("jwtToken", res.data)
            } else if (res.code === 403) {
                layer.msg("您无权限，请登录")
                location.href = getRootPath() + "/login.html";
            }

        },
        error: e => {
            // 进入error回调
            // console.log('err', e)
        }
    })

});
