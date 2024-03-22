const openStudyRes = {
    global: {
        openStudyInfo: {},
        openStudyUser: []
    },

    init: function(){
        window.resizeTo(1250, 1000);
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
        $("#openStudyDtTd").text(openStudyInfo.OPEN_STUDY_DT+" / "+openStudyInfo.START_TIME+" ~ "+openStudyInfo.END_TIME);
        $("#openStudyLocationTd").text(openStudyInfo.OPEN_STUDY_LOCATION);
        $("#openStudyDetailTd").text(openStudyInfo.OPEN_STUDY_DETAIL);
        $("#openStudyResultTd").text(openStudyInfo.OPEN_STUDY_RESULT);
        //$("#openStudyAmtTd").text(openStudyInfo.OPEN_STUDY_AMT);
        $("#openStudyAmtTd").text(openStudyInfo.OPEN_STUDY_AMT.toLocaleString() + '원');
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
        let studyInfo = openStudyRes.global.openStudyInfo;
        let regEmpSeq = $("#regEmpSeq").val();

        if(mode == "upd"){
            if(studyInfo.REG_EMP_SEQ == regEmpSeq){
                if(status == 0 || status == 30){
                    $("#appBtn").show();
                    $("#modBtn").show();
                } else if(status == 10){
                    $("#canBtn").show();
                }
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
                        return row.DEPT_FULL_NAME;
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
                        return row.DEPT_FULL_NAME;
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

        if(status == 10){
            if(!confirm("요청하시겠습니까?")){
                return;
            }
        } else if(status == 0){
            if(!confirm("요청을 취소하시겠습니까?")){
                return;
            }
        } else if(status == 100){
            if(!confirm("승인하시겠습니까?")){
                return;
            }
        } else if(status == 30){
            if(!confirm("반려하시겠습니까?")){
                return;
            }
        }

        if (status == 100) {
            const resultCheck = customKendo.fn_customAjax("/campus/getRealEduTimeCheck?pk=" + data.pk);
            console.log("resultCheck : " + resultCheck.list);
            console.log("resultCheckCnt : " + resultCheck.list.length);

            if (resultCheck.list) {

                let showAlert = true;
                let exceededNames = [];

                for (let i = 0; i < resultCheck.list.length; i++) {
                    let realEduTime = 0;

                    const regEmpName = resultCheck.list[i].REG_EMP_NAME;
                    console.log(regEmpName);
                    const eduTimeFloat = parseFloat(resultCheck.list[i].eduTime);
                    const remainEduFloat = parseFloat(resultCheck.list[i].remainEduTime);



                    if (resultCheck.list[i].userClass == '1') {
                        if (remainEduFloat == eduTimeFloat * 2) {
                            realEduTime = eduTimeFloat;
                        } else if (remainEduFloat < eduTimeFloat * 2) {
                            realEduTime = remainEduFloat;
                            exceededNames.push(regEmpName);
                        } else if (remainEduFloat > eduTimeFloat * 2) {
                            realEduTime = eduTimeFloat * 2;
                        }
                    }else {
                        if (remainEduFloat == eduTimeFloat) {
                            realEduTime = eduTimeFloat;
                        } else if (remainEduFloat < eduTimeFloat) {
                            realEduTime = remainEduFloat;
                            exceededNames.push(regEmpName);
                        } else if (remainEduFloat > eduTimeFloat) {
                            realEduTime = eduTimeFloat;
                        }
                    }
                    if (remainEduFloat == 0 && showAlert) {
                        realEduTime = 0;
                        alert("[" + exceededNames.join(", ") + "]" + "님은 주에 학습시간이 2시간을 초과해 인정시간이\n0시간으로 인정됩니다.");
                        showAlert = false;
                    }

                    let updateData = {
                        pk: data.pk,
                        regEmpSeq: resultCheck.list[i].REG_EMP_SEQ,
                        userClass: resultCheck.list[i].userClass,
                        realEduTime: realEduTime
                    };

                    customKendo.fn_customAjax("/campus/setOpenStudyRealEduTimeUpd", updateData);
                }
                debugger;
            }
        }


        var result = customKendo.fn_customAjax("/campus/setOpenStudyCertReq", data);

        if(result.flag){
            if(status == 10){
                alert("승인 요청이 완료되었습니다.");
                window.close();
            }else if(status == 100){
                alert("승인되었습니다.");
            }else if(status == 30){
                alert("반려되었습니다.");
            }else if(status == 0){
                alert("취소되었습니다.");
            }
            try {
                opener.gridReload();
            }catch{

            }
            try{
                location.reload();
            }catch{

            }
            window.close();
        }
    },

    fn_openStudyModify: function(){
        if(confirm("수정하시겠습니까?")) {
            let data = {
                pk: $("#pk").val(),
                regEmpSeq: $("#regEmpSeq").val(),
                regEmpName: $("#regEmpName").val(),
                step : "C"
            }

            var result = customKendo.fn_customAjax("/campus/setOpenNextStep", data);

            if (result.flag) {
                console.log(data.pk);
                openStudyRes.openStudyResultPop(data.pk);
                window.close();
            }
        }
    },

    openStudyResultPop: function(pk){
        let url = "/Campus/pop/openStudyResultPop.do?pk="+pk;
        const name = "_blank";
        const option = "width = 990, height = 748, top = 100, left = 400, location = no";

        window.open(url, name, option);
    },
}