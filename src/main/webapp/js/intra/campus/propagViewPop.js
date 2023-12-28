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
            $("#statusTd").text("학습 진행중");
            $("#propagGrid").show();
            propagView.mainGrid3();
            if(propagInfo.ADD_STATUS == "N"){
                let count = customKendo.fn_customAjax("/campus/getStudyPropagList", {
                    studyInfoSn: $("#pk").val()
                }).list.length;
                if(count > 0){
                    $("#compBtn").show();
                }
            }else{
                $("#resultBtn").show();
            }
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
            if(status == "0" || status == "30"){
                $("#appBtn").show();
            }else if(status == "10"){
                $("#canBtn").show();
            }
        }
        if(mode == "mng"){
            $("#saveBtn").hide();
            if(status == "10"){
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

    mainGrid3: function(){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : "/campus/getStudyPropagList",
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.studyInfoSn = $("#pk").val();
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

        $("#mainGrid3").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 250,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 30, 50, 100 ],
                buttonCount : 5
            },
            toolbar : [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" id="journalPopBtn" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="propagView.studyPropagPop(1, '+$("#pk").val()+');">' +
                            '	<span class="k-button-text">추가</span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound: function(){
                let grid = this;
                grid.element.off('dblclick');
                grid.tbody.find("tr").dblclick(function(){
                    const dataItem = grid.dataItem($(this).closest("tr"));
                    studyView.studyJournalPop(2, dataItem.STUDY_INFO_SN, dataItem.STUDY_JOURNAL_SN);
                });
            },
            columns: [
                {
                    title: "번호",
                    width: 50,
                    template: "#= --record #"
                }, {
                    title: "일시",
                    template: function(row){
                        return row.PROPAG_DT + " (" + row.START_TIME +"~"+row.END_TIME+" / "+row.EDU_TIME+")";
                    }
                }, {
                    title: "학습시간",
                    width: 150,
                    template: function(row){
                        return row.EDU_TIME + "시간";
                    }
                }, {
                    title: "인정시간",
                    columns : [
                        {
                            title: "지도자",
                            width: 150,
                            template: function(row){
                                return row.EDU_MNG_TIME + "시간";
                            }
                        }, {
                            title: "학습자",
                            width: 150,
                            template: function(row){
                                return row.EDU_USER_TIME + "시간";
                            }
                        }
                    ]
                }, {
                    title: "처리명령",
                    template: function(row){
                        return '<button type="button" style="margin-right:5px;" class="k-button k-button-solid-base" onclick="">인쇄</button>' +
                            '<button type="button" class="k-button k-button-solid-error" onclick="propagView.fn_delBtn('+row.STUDY_PROPAG_SN+')">삭제</button>';
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
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
    },

    studyPropagPop: function(type, fk, pk){
        let url = "";
        if(fk == null || fk == "" || fk == undefined){
            url = "/Campus/pop/studyPropagPop.do";
        }else if(type == 1){
            url = "/Campus/pop/studyPropagPop.do?pk="+fk;
        }else if(type == 2){
            url = "/Campus/pop/studyPropagPop.do?pk="+fk+"&studyPropagSn="+pk;
        }
        let name = "studyPropagPop";
        let option = "width = 800, height = 600, top = 100, left = 200, location = no";
        window.open(url, name, option);
    },

    fn_delBtn: function(pk){
        customKendo.fn_customAjax("/campus/setPropagDelete", {
            pk: pk
        });
        gridReload();
    },

    fn_studyComplete : function (){
        var data = {
            studyInfoSn : $("#pk").val()
        }

        $.ajax({
            url : "/campus/setStudyInfoComplete",
            data : data,
            type : "post",
            dataType : "json",
            success: function(rs){
                if(rs.code == 200){
                    alert(rs.msg);
                    location.reload();
                }
            }
        });
    },

    fn_resultDocPop : function (){
        let url = "/campus/pop/resultPropagDocPop.do?pk="+$("#pk").val();

        let name = "resultPropagDocPop";
        let option = "width = 1200, height = 900, top = 100, left = 200, location = no";

        if($("#mode").val() != ""){
            url += "&mode="+$("#mode").val();
        }

        if($("#studyResultSn").val() != ""){
            url += "&studyResultSn="+$("#studyResultSn").val();
        } else {
            name = "resultPropagDocPop";
            option = "width = 1200, height = 900, top = 100, left = 200, location = no";
        }

        window.open(url, name, option);
    }
}

function gridReload(){
    propagView.mainGrid3();
    propagView.dataSet();
}