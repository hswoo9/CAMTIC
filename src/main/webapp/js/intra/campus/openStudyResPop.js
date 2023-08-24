const openStudyRes = {
    global: {
        openStudyInfo: {},
        openStudyUser: []
    },

    init: function(){
        openStudyRes.pageSet();
        openStudyRes.dataSet();
        openStudyRes.buttonSet();
        openStudyRes.mainGrid();
    },

    pageSet: function(){
        customKendo.fn_textBox(["openStudyAmt", "openStudyAmtText"]);
    },

    dataSet: function(){
        let openStudyInfo = customKendo.fn_customAjax("/campus/getOpenStudyInfoOne", {
            pk: $("#pk").val()
        }).data;
        openStudyRes.global.openStudyInfo = openStudyInfo;

        $("#openStudyNameTd").text(openStudyInfo.OPEN_STUDY_NAME);
        $("#openStudyDtTd").text(openStudyInfo.OPEN_STUDY_DT+" "+openStudyInfo.START_TIME+" ~ "+openStudyInfo.END_TIME);
        $("#openStudyLocationTd").text(openStudyInfo.OPEN_STUDY_LOCATION);
        $("#openStudyDetailTd").text(openStudyInfo.OPEN_STUDY_DETAIL);
        $("#openStudyAmtTd").text(openStudyInfo.OPEN_STUDY_AMT);
        $("#openStudyAmtTextTd").text(openStudyInfo.OPEN_STUDY_AMT_TEXT);
        $("#regDateTd").text(openStudyInfo.REG_DATE);

        $("#regDeptTd").text(openStudyInfo.deptNm + " " + openStudyInfo.teamNm);
        if(openStudyInfo.dutyNm == ""){
            $("#regPositionTd").text(openStudyInfo.positionNm);
        }else{
            $("#regPositionTd").text(openStudyInfo.dutyNm);
        }
        $("#regEmpNameTd").text(openStudyInfo.REG_EMP_NAME);
    },

    buttonSet: function(){
        let mode = $("#mode").val();
        let status = openStudyRes.global.openStudyInfo.STATUS;
        if(mode == "upd"){
            if(status == 0 || status == 30){
                $("#appBtn").show();
            }
        }
        if(mode == "mng"){
            $("#saveBtn").hide();
            if(status == 10){
                $("#recBtn").show();
                $("#comBtn").show();
            }
        }
    },

    mainGrid: function(){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/campus/getOpenStudyUserList',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.userClass = 1;
                    data.pk = $("#pk").val();
                    return data;
                }
            },
            schema : {
                data: function (data) {
                    return data.list;
                },
                total: function (data) {
                    return data.list.length;
                },
            },
            pageSize: 10,
        });

        $("#mainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 300,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 30, 50, 100 ],
                buttonCount : 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    title: "소속",
                    width: 300,
                    template: function(row){
                        return row.REG_DEPT_NAME + " " + row.REG_TEAM_NAME;
                    }
                }, {
                    title: "직위",
                    template: function(row){
                        return row.REG_DUTY_NAME == "" ? row.REG_POSITION_NAME : row.REG_DUTY_NAME;
                    }
                }, {
                    field: "REG_EMP_NAME",
                    title: "성명",
                    width: 80
                }
            ]
        }).data("kendoGrid");

        let subDataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/campus/getOpenStudyUserList',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.userClass = 2;
                    data.pk = $("#pk").val();
                    return data;
                }
            },
            schema : {
                data: function (data) {
                    return data.list;
                },
                total: function (data) {
                    return data.list.length;
                },
            },
            pageSize: 10,
        });

        $("#subGrid").kendoGrid({
            dataSource: subDataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 300,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 30, 50, 100 ],
                buttonCount : 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    field: "소속",
                    width: 300,
                    title: "모임명",
                    template: function(row){
                        return row.REG_DEPT_NAME + " " + row.REG_TEAM_NAME
                    }
                }, {
                    title: "직위",
                    template: function(row){
                        return row.REG_DUTY_NAME == "" ? row.REG_POSITION_NAME : row.REG_DUTY_NAME;
                    }
                }, {
                    field: "REG_EMP_NAME",
                    title: "성명",
                    width: 80
                }
            ]
        }).data("kendoGrid");
    },

    fn_openStudyCertReq: function(status){
        let data = {
            pk : $("#pk").val(),
            regEmpSeq : $("#regEmpSeq").val(),
            regEmpName : $("#regEmpName").val(),
            status : status
        }

        var result = customKendo.fn_customAjax("/campus/setOpenStudyCertReq", data);

        if(result.flag){
            if(status == 10){
                alert("승인 요청이 완료되었습니다.");
            }else if(status == 100){
                alert("승인되었습니다.");
            }else if(status == 30){
                alert("반려되었습니다.");
            }
            opener.gridReload();
            window.close();
        }
    }
}