const propagView = {
    global: {
        propagInfo: {},
        propagUser: []
    },

    init: function(){
        propagView.dataSet();
        propagView.buttonSet();
        propagView.mainGrid();
    },

    dataSet: function(){
        let propagInfo = customKendo.fn_customAjax("/campus/getStudyInfoOne", {
            pk: $("#pk").val()
        }).data;
        propagView.global.propagInfo = propagInfo;

        $("#propagNameTd").text(propagInfo.STUDY_NAME);
        $("#propagDtTd").text(propagInfo.START_DT+" ~ "+propagInfo.END_DT+" / 매회"+propagInfo.START_TIME+" ~ "+propagInfo.END_TIME+" (총 "+propagInfo.EDU_TERM+"회 "+propagInfo.EDU_TIME+"시간)");
        $("#propagLocationTd").text(propagInfo.STUDY_LOCATION);
        $("#propagObjectTd").text(propagInfo.STUDY_OBJECT);
        $("#propagContentTd").text(propagInfo.STUDY_CONTENT);
        $("#propagAmtTd").text(fn_numberWithCommas(propagInfo.STUDY_MONEY));
        $("#propagAmtTextTd").text(propagInfo.STUDY_MONEY_VAL);
        $("#regDateTd").text(propagInfo.REG_DT);
        if(propagInfo.STATUS == 0){
            $("#statusTd").text("신청서 작성중");
        }else if(propagInfo.STATUS == 10){
            $("#statusTd").text("신청서 승인요청중");
        }else if(propagInfo.STATUS == 30){
            $("#statusTd").text("신청서 반려됨");
        }else if(propagInfo.STATUS == 100){
            $("#statusTd").text("학습종료");
        }

        $("#regDeptTd").text(propagInfo.deptNm + " " + propagInfo.teamNm);
        if(propagInfo.dutyNm == ""){
            $("#regPositionTd").text(propagInfo.positionNm);
        }else{
            $("#regPositionTd").text(propagInfo.dutyNm);
        }
        $("#regEmpNameTd").text(propagInfo.REG_EMP_NAME);
    },

    buttonSet: function(){
        let mode = $("#mode").val();
        let status = propagView.global.propagInfo.STATUS;
        if(mode == "upd"){
            if(status == 0 || status == 30){
                $("#appBtn").show();
            }else if(status == 10){
                $("#canBtn").show();
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
                    url : '/campus/getStudyUserList',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.studyClassSn = 4;
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
                        return row.STUDY_DEPT_NAME + " " + row.STUDY_TEAM_NAME;
                    }
                }, {
                    title: "직위",
                    template: function(row){
                        return row.STUDY_DUTY_NAME == "" ? row.STUDY_POSITION_NAME : row.STUDY_DUTY_NAME;
                    }
                }, {
                    field: "STUDY_EMP_NAME",
                    title: "성명",
                    width: 80
                }
            ]
        }).data("kendoGrid");

        let subDataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/campus/getStudyUserList',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.studyClassSn = 5;
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
                    title: "소속",
                    width: 300,
                    template: function(row){
                        return row.STUDY_DEPT_NAME + " " + row.STUDY_TEAM_NAME;
                    }
                }, {
                    title: "직위",
                    template: function(row){
                        return row.STUDY_DUTY_NAME == "" ? row.STUDY_POSITION_NAME : row.STUDY_DUTY_NAME;
                    }
                }, {
                    field: "STUDY_EMP_NAME",
                    title: "성명",
                    width: 80
                }
            ]
        }).data("kendoGrid");
    },

    fn_propagCertReq: function(status){
        let data = {
            studyInfoSn : $("#pk").val(),
            status : status
        }

        var result = customKendo.fn_customAjax("/campus/studyReq", data);

        if(result.flag){
            if(status == 10){
                alert("승인 요청이 완료되었습니다.");
            }else if(status == 100){
                alert("승인되었습니다.");
            }else if(status == 30){
                alert("반려되었습니다.");
            }else if(status == 0){
                alert("승인요청이 취소되었습니다.");
            }
            opener.gridReload();
            window.close();
        }
    }
}