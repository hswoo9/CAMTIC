var userMultiSel2 = {
    global : {
        searchAjaxData : "",
        flag : true,
        readerArr : new Array()
    },

    fnDefaultScript : function(){
        $("#orgChartTabStrip, #deptUserInfoTabStrip, #readerTabStrip").kendoTabStrip({
            animation:  {
                open: {
                    effects: "fadeIn"
                }
            }
        });

        $("#treeViewDiv").kendoTreeView({
            dataSource: datas,
            dataTextField:['dept_name'],
            select: userMultiSel2.treeClick,
        });

        userMultiSel2.treeViewReload(deptSeq);

        $("#readerListDataDiv").kendoGrid({
            resizable: true,
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" class="k-checkbox checkbox"/>',
                    template : "<input type='checkbox' id='readerPk#=SEQ#' name='readerPk' value='#=SEQ#' class='k-checkbox checkbox'/>",
                    width: 40
                }, {
                    field : "readerEmpName",
                    title : "이름",
                }, {
                    field : "readerDeptName",
                    title : "부서",
                }, {
                    field : "readerDutyName",
                    title : "직위",
                    template: function (row) {
                        return fn_getSpot(row.readerDutyName, row.readerPositionName);
                    }
                }
            ]
        });

        $("#checkAll").click(function(){
            if($(this).is(":checked")) $("input[name=readerPk]").prop("checked", true);
            else $("input[name=readerPk]").prop("checked", false);
        });

        userMultiSel2.readerArrCheck();
    },

    treeViewReload : function(dept){
        userMultiSel2.global.searchAjaxData = {
            deptSeq : dept
        }

        var deptUserDataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : "/approvalUser/getUserList",
                    async : false,
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    if($("#sEmpName").val() == '' || $("#sEmpName").val() == null){
                        data.DEPT_SEQ = $("#deptSeq").val();
                    } else {
                        data.sEmpName = $("#sEmpName").val();
                    }
                    data.fullTime2 = "1";
                    data.DEPT_SEQ = dept;
                    data.tempType = "N";
                    return data;
                }
            },
            schema : {
                data: function (data) {
                    data.unshift(userMultiSel2.getDept(deptSeq));

                    return data;
                },
                total: function (data) {
                    return data.length;
                },
            },
            pageSize: 15,
        });

        $("#userList").kendoGrid({
            dataSource: deptUserDataSource,
            height: 415,
            sortable: true,
            scrollable: true,
            pageable: {
                refresh: true,
                pageSize : 10,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount: 5,
                messages: {
                    display: "{0} - {1} of {2}",
                    itemsPerPage: "",
                    empty: "데이터가 없습니다.",
                }
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    field: "DEPT_NAME",
                    title: "부서",
                    width: "100px",
                }, {
                    field: "DUTY_NAME",
                    title: "직위",
                    width: "100px",
                    template: function (row) {
                        return fn_getSpot(row.DUTY_NAME, row.POSITION_NAME);
                    }
                }, {
                    field: "EMP_NAME_KR",
                    title: "이름",
                    width: "100px",
                }, {
                    width: "70px",
                    template: function(e){
                        if(e.EMP_NAME_KR){
                            return "<button type=\"button\" class=\"k-button k-button-md k-button-solid k-button-solid-base\" onclick=\"userMultiSel2.addTable(" + e.EMP_SEQ + ", this, 'userClick')\">" +
                                '	<span class="k-button-text">추가</span>' +
                                '</button>';
                        }else{
                            return "<button type=\"button\" class=\"k-button k-button-md k-button-solid k-button-solid-base\" onclick=\"userMultiSel2.addTable(" + e.DEPT_SEQ + ", this, 'deptClick')\">" +
                                '	<span class="k-button-text">추가</span>' +
                                '</button>';
                        }
                    },
                }
            ],
        }).data("kendoGrid");
    },

    getDept : function(e){
        var result;

        $.ajax({
            url      : "/common/getDept.do",
            data     : "deptSeq=" + e,
            dataType : "json",
            type     : "post",
            async    : false,
            success  : function (rs) {
                result = rs.rs;
            }
        })

        return result;
    },

    treeClick : function(e){
        var item = $("#treeViewDiv").data("kendoTreeView").dataItem(e.node);
        deptSeq = item.dept_seq;
        deptName = item.dept_name;
        userMultiSel2.treeViewReload(deptSeq);
        $("#sEmpName").val('');
        $("#userList").data("kendoGrid").dataSource.read();
    },

    readerArrCheck : function(){
        for(var i = 0; i < userMultiSel2.global.readerArr.length; i++){
            $("#readerListDataDiv").data("kendoGrid").dataSource.add({
                readerId : userMultiSel2.global.readerArr[i].readerId,
                SEQ : userMultiSel2.global.readerArr[i].readerEmpSeq,
                seqType: userMultiSel2.global.readerArr[i].seqType,
                readerEmpSeq: userMultiSel2.global.readerArr[i].readerEmpSeq,
                readerEmpName: userMultiSel2.global.readerArr[i].readerEmpName,
                readerDeptSeq: userMultiSel2.global.readerArr[i].readerDeptSeq,
                readerDeptName: userMultiSel2.global.readerArr[i].readerDeptName,
                readerDutyCode: userMultiSel2.global.readerArr[i].readerDutyCode,
                readerDutyName: userMultiSel2.global.readerArr[i].readerDutyName,
                readerPositionCode: userMultiSel2.global.readerArr[i].readerPositionCode,
                readerPositionName: userMultiSel2.global.readerArr[i].readerPositionName,
            });
        }
    },

    addTable : function(e, v, type){

        if(type == "userClick"){
            userMultiSel2.global.searchAjaxData = {
                empSeq : e
            }

            var result = customKendo.fn_customAjax("/user/getUserInfo", userMultiSel2.global.searchAjaxData);
            if(result.flag){
                userMultiSel2.global.flag = true;

                if($("#empSeq").val() != result.EMP_SEQ){
                    $.each($("input[name='readerPk']"), function(i, e){
                        var dataItem = $("#readerListDataDiv").data("kendoGrid").dataItem($(this).closest("tr"));
                        if(dataItem.readerEmpSeq == result.EMP_SEQ){
                            userMultiSel2.global.flag = false;
                        }
                    })

                    if(userMultiSel2.global.flag) {
                        $("#readerListDataDiv").data("kendoGrid").dataSource.add({
                            SEQ : result.EMP_SEQ,
                            seqType: "u",
                            readerEmpSeq: result.EMP_SEQ,
                            readerEmpName: result.EMP_NAME_KR,
                            readerDeptSeq: result.DEPT_SEQ,
                            readerDeptName: result.DEPT_NAME,
                            readerDutyCode: result.DUTY_CODE,
                            readerDutyName: result.DUTY_NAME,
                            readerPositionCode: result.POSITION_CODE,
                            readerPositionName: result.POSITION_NAME,
                        });
                    }
                }else{
                    alert("결재자는 열람 지정이 불가능합니다.");
                }
            }
        }else{
            var grid = $("#userList").data("kendoGrid");
            var dataItem = grid.dataItem($(v).closest("tr"));

            userMultiSel2.global.flag = true;

            $.each($("input[name='readerPk']"), function(i, e){
                var dataItem2 = $("#readerListDataDiv").data("kendoGrid").dataItem($(this).closest("tr"));
                if(dataItem2.readerDeptSeq == dataItem.DEPT_SEQ && dataItem2.seqType == "d"){
                    userMultiSel2.global.flag = false;
                }
            })

            if(userMultiSel2.global.flag){
                var seqType = "";
                var readerDeptSeq = "";
                if(dataItem.DEPT_SEQ == "1000"){
                    seqType = "c";
                    readerDeptSeq = "0";
                }else{
                    seqType = "d";
                    readerDeptSeq = dataItem.DEPT_SEQ;
                }

                $("#readerListDataDiv").data("kendoGrid").dataSource.add({
                    SEQ : dataItem.DEPT_SEQ,
                    seqType: seqType,
                    readerEmpSeq: "0",
                    readerEmpName: dataItem.DEPT_NAME,
                    readerDeptSeq: readerDeptSeq,
                    readerDeptName: dataItem.DEPT_NAME,
                    readerDutyCode: "-",
                    readerDutyName: "-",
                    readerPositionCode: "-",
                    readerPositionName: "-",
                });
            }
        }
    },

    rowDblClick : function(){
        var chkCnt = $("input[name='readerPk']:checked").length;

        if(chkCnt == 0){
            alert("삭제할 사용자를 선택해주세요.");
            return
        }

        var readerArr = new Array();
        var grid = $("#readerListDataDiv").data("kendoGrid");
        $.each($("input[name='readerPk']:checked"), function(i, e){
            var dataItem = grid.dataItem($(this).closest("tr"));
            var data = {
                el : $(this).closest("tr")
            }

            if(dataItem.readerId){
                data.readerId = dataItem.readerId
            }

            readerArr.push(data);
        })

        if(readerArr.length > 0){
            if(confirm("선택한 열람자를 삭제하시겠습니까?")){
                $.each(readerArr, function(e, i){
                    if(i.readerId != null){
                        var data = {
                            readerId : i.readerId
                        }

                        var result = customKendo.fn_customAjax("/approvalUser/setDocReaderIdDel.do", data);
                        if(result.flag){
                            grid.removeRow(i.el);
                        }
                    }else{
                        grid.removeRow(i.el);
                    }
                })
            }
        }
    },

    apprLineSave : function(){
        var deptUserDataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : "/approvalUser/getUserList",
                    async : false,
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.DEPT_SEQ = dataItem.readerDeptSeq;
                    data.fullTime2 = "1";
                    data.DEPT_SEQ = dept;
                    data.tempType = "N";
                    return data;
                }
            },
            schema : {
                data: function (data) {
                    data.unshift(userMultiSel2.getDept(deptSeq));

                    return data;
                },
                total: function (data) {
                    return data.length;
                },
            },
            pageSize: 15,
        });

        let userArr = [];
        let empSeqArr = [];
        let empNameArr = "";

        $.each($("input[name='readerPk']"), function(){
            var dataItem = $("#readerListDataDiv").data("kendoGrid").dataItem($(this).closest("tr"));

            if(dataItem.seqType == "d"){
                const list = customKendo.fn_customAjax("/approvalUser/getUserList", {
                    DEPT_SEQ: dataItem.readerDeptSeq,
                    fullTime2: "1",
                    tempType: "N"
                });

                for(let i=0; i<list.length; i++){
                    const iMap = list[i];
                    empNameArr += iMap.EMP_NAME_KR+ ",";
                    empSeqArr += iMap.EMP_SEQ+ ",";
                }
            }else{
                empNameArr += dataItem.readerEmpName+ ",";
                empSeqArr += dataItem.readerEmpSeq+ ",";
            }
        })

        opener.parent.userDataSet(userArr, empNameArr, empSeqArr, $("#type").val());
        window.close();
    }
}
