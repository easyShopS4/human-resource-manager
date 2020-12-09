/**
 * jq 职位发布管理
 * @author jz_lee
 * @time 2020/12/8 17:49
 */
layui.use(['layer', 'jquery', 'form'], function () {
    let layer = layui.layer,
        $ = layui.jquery,
        form = layui.form;

    $(function () {

        // 加载所有的一级机构
        $.ajax({
            url: "http://127.0.0.1:8080/ssm/config-file-first-kind/all",
            type: "get",
            success: res => {
                // console.log(res)

                $("#firstKindId option:gt(0)").remove()

                $.each(res.data, function (index, item) {
                    $("#firstKindId").append(new Option(item.firstKindName, item.firstKindId))
                })

                /*$.each(data, function (index, item) {
                    $('#areaId').append(new Option(item.areaName, item.areaId));// 下拉菜单里添加元素
                });*/
                layui.form.render("select");//重新渲染 固定写法
            },
            error: e => {
                console.log(e)
            }
        })

        // 加载二级机构
        $.ajax({
            url: "http://127.0.0.1:8080/ssm/config-file-second-kind/all",
            type: "get",
            success: res => {
                // console.log(res)
                $("#secondKindId option:gt(0)").remove()

                $.each(res.data, function (index, item) {
                    $("#secondKindId").append(new Option(item.secondKindName, item.secondKindId))
                })

                layui.form.render("select")
            },
            error: e => {
                console.log(e)
            }
        })

        // 加载第三个下拉框
        $.ajax({
            url: "http://127.0.0.1:8080/ssm/config-file-third-kind/all",
            type: "get",
            success: res => {
                // console.log(res)
                $("#thirdKindId option:gt(0)").remove();
                $.each(res.data, function (index, item) {
                    $("#thirdKindId").append(new Option(item.thirdKindName, item.thirdKindId))
                })

                // 刷新下拉框
                layui.form.render("select")
            },
            error: e => {
                console.log(e)
            }
        })


        /**  三个机构的联动事件  **/
        // jq 的change在layui里面是失效的~

        // 职位分类
        $.ajax({
            url: "http://127.0.0.1:8080/ssm/config-major-kind/all",
            type: "get",
            success: res => {
                // console.log(res)
                $("#majorKindId option:gt(0)").remove()

                $.each(res.data, function (index, item) {
                    $("#majorKindId").append(new Option(item.majorKindName, item.majorKindId))
                    layui.form.render('select')
                })
            }
        })

        // 职业名称
        $.ajax({
            url: "http://127.0.0.1:8080/ssm/config-major/all",
            type: "get",
            success: res => {
                // console.log(res)
                $("#majorId option:gt(0)").remove()

                $.each(res.data, function (index, item) {
                    $("#majorId").append(new Option(item.majorName, item.makId))
                    layui.form.render('select')
                })
            }
        })


    });

    // 下面的是数据联动~

    // 第一种机构的下拉框的改变事件
    form.on('select(firstKind)', function (data) {
        // console.log(data.elem); //得到select原始DOM对象
        // console.log(data.value); //得到被选中的值

        let val = data.value; // id

        if (val) {
            // 选中改变了, 联动~
            let url = "http://127.0.0.1:8080/ssm/config-file-first-kind/getByFistKindId/" + val;
            $.ajax({
                url: url,
                type: "get",
                success: res => {
                    console.log(res.data)

                    let data1 = res.data[0];
                    let data2 = res.data[1];
                    let data3 = res.data[2];

                    kind_select(data1, data2, data3)
                }
            })
        }

    })

    // 2
    form.on('select(secondKind)', function (data) {

        let val = data.value;

        if (val) {
            $.ajax({
                url: "http://127.0.0.1:8080/ssm/config-file-second-kind/getBySecondId/" + val,
                type: "get",
                success: res => {
                    console.log(res.data)
                    // 1. 2级
                    let data1 = res.data[0];
                    // 3 级
                    let data2 = res.data[1];

                    kind_select(data1, data1, data2)
                }
            })
        }
    })

    // 3
    form.on('select(thirdKind)', function (data) {

        let val = data.value;

        if (val) {
            $.ajax({
                url: "http://127.0.0.1:8080/ssm/config-file-third-kind/getByThirdId/" + val,
                type: "get",
                success: res => {
                    console.log(res.data)

                    let data = res.data;

                    kind_select(data, data, data)
                }
            })
        }
    })

    // 333
    function kind_select(data1, data2, data3) {
        $("#firstKindId option").remove()
        if (data1.length > 0) {
            $.each(data1, function (index, item) {
                $("#firstKindId").append(new Option(item.firstKindName, item.firstKindId))
                // layui.form.render("select")
            })
        } else {
            $("#firstKindId").append(new Option("", "-1"))
        }


        $("#secondKindId option").remove()
        if (data2.length > 0) {
            $.each(data2, function (index, item) {
                $("#secondKindId").append(new Option(item.secondKindName, item.secondKindId))
                // layui.form.render("select")
            })
        } else {
            $("#secondKindId").append(new Option("", "-1"))
        }


        $("#thirdKindId option").remove()
        if (data3.length > 0) {
            $.each(data3, function (index, item) {
                $("#thirdKindId").append(new Option(item.thirdKindName, item.thirdKindId))
                // layui.form.render("select")
            })
        } else {
            $("#thirdKindId").append(new Option("", "-1"))
        }

        layui.form.render("select")

    }

})