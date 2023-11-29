const ojtView = {
    global: {
        ojtInfo: {},
        propagUser: [],
        ojtPlanLength: 0,
        ojtResultLength: 0
    },

    init: function(){
        ojtView.dataSet();
        ojtView.mainGrid();
        ojtView.ojtPlanGrid();
        ojtView.buttonSet();
    },

    dataSet: function(){
        let ojtInfo = customKendo.fn_customAjax("/campus/getStudyInfoOne", {
            pk: $("#pk").val()
        }).data;
        ojtView.global.ojtInfo = ojtInfo;

        $("#ojtNameTd").text(ojtInfo.STUDY_NAME);
        $("#ojtDtTd").text(ojtInfo.START_DT+" ~ "+ojtInfo.END_DT);
        $("#ojtLocationTd").text(ojtInfo.STUDY_LOCATION);
        $("#ojtObjectTd").text(ojtInfo.STUDY_OBJECT);
        $("#ojtContentTd").text(ojtInfo.STUDY_CONTENT);
        $("#ojtAmtTd").text(fn_numberWithCommas(ojtInfo.STUDY_MONEY));
        $("#ojtAmtTextTd").text(ojtInfo.STUDY_MONEY_VAL);
        $("#regDateTd").text(ojtInfo.REG_DT);
        if(ojtInfo.STATUS == 0){
            $("#statusTd").text("신청서 작성중");
        }else if(ojtInfo.STATUS == 10){
            $("#statusTd").text("신청서 승인요청중");
        }else if(ojtInfo.STATUS == 30){
            $("#statusTd").text("신청서 반려됨");
        }else if(ojtInfo.STATUS == 100){
            $("#statusTd").text("OJT 진행중(0회)");
            $(".ojtResult").show();
            ojtView.ojtResultGrid();
        }else if(ojtInfo.STATUS == 101){
            $("#statusTd").text("OJT완료");
            $(".ojtResult").show();
            ojtView.ojtResultGrid();

            if(ojtInfo.ADD_STATUS == "Y" || ojtInfo.ADD_STATUS == "C" || ojtInfo.ADD_STATUS == "S"){
                $("#resultBtn").css("display", "");
            }
        }

        $("#regDeptTd").text(ojtInfo.deptNm + " " + ojtInfo.teamNm);
        if(ojtInfo.dutyNm == ""){
            $("#regPositionTd").text(ojtInfo.positionNm);
        }else{
            $("#regPositionTd").text(ojtInfo.dutyNm);
        }
        $("#regEmpNameTd").text(ojtInfo.REG_EMP_NAME);
        $("#jobDetailNmTd").text(ojtInfo.jobDetailNm);
    },

    buttonSet: function(){
        let mode = $("#mode").val();
        let status = ojtView.global.ojtInfo.STATUS;
        if(mode == "upd"){
            if(status == 0 || status == 30){
                const count = customKendo.fn_customAjax("/campus/getOjtPlanList", {
                    pk: $("#pk").val()
                }).list.length;
                console.log(count);

                if(count >= 1){
                    $("#appBtn").show();
                }
            }else if(status == 10){
                $("#canBtn").show();
            }else if(status == 100){
                $("#ojtPlanAddBtn").hide();
                $("#finBtn").show();
            }
        }
        if(mode == "mng"){
            $("#saveBtn").hide();
            $("#ojtPlanAddBtn").hide();
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

    fn_ojtCertReq: function(status){
        // if(status == 10 && ojtView.global.ojtPlanLength == 0){
        //     alert("지도계획이 작성되지 않았습니다"); return;
        // }

        // if(status == 100 && ojtView.global.ojtResultLength == 0){
        //     alert("학습일지가 작성되지 않았습니다"); return;
        // }

        let data = {
            studyInfoSn : $("#pk").val(),
            status : status
        }

        customKendo.fn_customAjax("/campus/setStudyInfoComplete", data);
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
            }else if(status == 101){
                alert("지도 완료되었습니다.");
            }
            opener.gridReload();
            window.close();
        }
    },

    ojtPlanGrid: function(){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/campus/getOjtPlanList',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.pk = $("#pk").val();
                    return data;
                }
            },
            schema: {
                data: function(data){
                    return data.list;
                },
                total: function(data){
                    ojtView.global.ojtPlanLength = data.list.length
                    return data.list.length;
                },
            },
            pageSize: 10,
        });

        $("#ojtPlanGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 508,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 30, 50, 100 ],
                buttonCount : 5
            },
            toolbar : [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" id="ojtPlanAddBtn" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="ojtView.ojtPlanPop(\'ins\', '+$("#pk").val()+');">' +
                            '	<span class="k-button-text">추가</span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    title: "회차",
                    template: "#= ++record #차",
                    width: 70
                }, {
                    title: "기간",
                    width: 300,
                    template: function(row){
                        return row.START_DT + " ~ " + row.END_DT;
                    }
                }, {
                    field: "TITLE",
                    title: "중점 지도항목"
                }, {
                    field: "ETC",
                    title: "비고",
                    width: 300
                }
            ],
            dataBinding: function() {
                record = (this.dataSource.page() -1) * this.dataSource.pageSize();
            }
        }).data("kendoGrid");
    },

    ojtResultGrid: function(){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/campus/getOjtResultList',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.pk = $("#pk").val();
                    return data;
                }
            },
            schema: {
                data: function(data){
                    return data.list;
                },
                total: function(data){
                    ojtView.global.ojtResultLength = data.list.length
                    return data.list.length;
                },
            },
            pageSize: 10,
        });

        $("#ojtResultGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 508,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 30, 50, 100 ],
                buttonCount : 5
            },
            toolbar : [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" id="ojtPlanAddBtn" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="ojtView.ojtResultPop(\'ins\', '+$("#pk").val()+');">' +
                            '	<span class="k-button-text">추가</span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    title: "순번",
                    template: "#= ++record #",
                    width: 70
                }, {
                    title: "일시",
                    template: function(row){
                        return row.OJT_DT + " " + row.START_TIME + " ~ " + row.END_TIME;
                    }
                }, {
                    title: "지도시간",
                    field: "EDU_FULL_TIME",
                    width : 100,
                }, {
                    field: "EDU_TIME",
                    title: "인정시간",
                    columns : [{
                        field: "EDU_TIME",
                        title : "지도자",
                        width: 200
                    },{
                        title : "학습자",
                        width: 200,
                        template : function (e){
                            return e.EDU_TIME_HALF.toString().substring(0,3)
                        }
                    }],
                }, {
                    field: "",
                    title: "처리명령",
                    width: 200,
                    template: function(row){
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" disabled onclick="studyView.tmp('+row.OJT_RESULT_SN+')">인쇄</button> ' +
                            '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-error" onclick="ojtView.fn_delete('+row.OJT_RESULT_SN+')">삭제</button>';
                    }
                }
            ],
            dataBinding: function() {
                record = (this.dataSource.page() -1) * this.dataSource.pageSize();
            }
        }).data("kendoGrid");
    },

    ojtPlanPop: function(mode, pk){
        let url = "/Campus/pop/ojtPlanPop.do?mode="+mode+"&pk="+pk;
        let name = "ojtPlanPop";
        let option = "width = 1060, height = 600, top = 100, left = 200, location = no";
        window.open(url, name, option);
    },

    ojtResultPop: function(mode, pk){
        let url = "/Campus/pop/ojtResultPop.do?mode="+mode+"&pk="+pk;
        let name = "ojtResultPop";
        let option = "width = 1060, height = 600, top = 100, left = 200, location = no";
        window.open(url, name, option);
    },

    fn_delete: function (ojtResultSn){
        $.ajax({
            url : "/campus/deleteOjtResult",
            data : {
                ojtResultSn : ojtResultSn
            },
            type : "post",
            dataType : "json",
            success : function(rs){
                if(rs.code == 200){
                    alert(rs.msg);
                    $("#ojtResultGrid").data("kendoGrid").dataSource.read();
                }
            }
        })
    },

    fn_resultPop: function (){
        let url = "/campus/pop/resultOjtDocPop.do?pk="+$("#pk").val();

        let name = "studyOjtPop";
        let option = "width = 800, height = 700, top = 100, left = 200, location = no";

        if($("#mode").val() != ""){
            url += "&mode="+$("#mode").val();
        }

        if($("#studyResultSn").val() != "" && $("#studyResultSn").val() != "undefined" && $("#studyResultSn").val() != null){
            url += "&studyResultSn="+$("#studyResultSn").val();
        } else {
            name = "studyJournalPop";
            option = "width = 800, height = 600, top = 100, left = 200, location = no";
        }

        window.open(url, name, option);
    }
}