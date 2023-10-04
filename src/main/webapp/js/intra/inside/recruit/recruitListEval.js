var recruitListEval = {

    global : {
        saveAjaxData : ""
    },

    init : function(){
        recruitListEval.dataSet();
        recruitListEval.gridReload();
    },

    dataSet : function() {
        $("#recruitYear").kendoDatePicker({
            start: "decade",
            depth: "decade",
            culture : "ko-KR",
            format : "yyyy",
            value : new Date()
        });

        $("#searchType").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "구분", value: "" },
                { text: "모집분야", value: "1" },
                { text: "공고명", value: "2" },
                { text: "공고번호", value: "3" },
                { text: "지원자", value: "4" }
            ],
            index: 0
        });

        $("#searchVal").kendoTextBox();

    },

    mainGrid : function(url, params) {
        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 508,
            pageable : {
                refresh : true,
                pageSizes: [10, 20, "ALL"],
                buttonCount : 5
            },
            toolbar : [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="recruitListEval.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            detailTemplate : kendo.template($("#template").html()),
            detailInit: recruitListEval.detailInit,
            columns: [
                {
                    template: "#= --record #",
                    title: "순번",
                    width : 50
                }, {
                    field: "RECRUIT_NUM",
                    title: "공고번호",
                    width : 100
                }, {
                    field: "RECRUIT_TITLE",
                    title: "공고명",
                    width: 350,
                    template : function (e){
                        return '<a href="javascript:void(0);" onclick="recruitListEval.recruitDetailPop(\''+e.RECRUIT_INFO_SN+'\');">'+e.RECRUIT_TITLE+'</a>';
                    }
                }, {
                    title: "모집기간",
                    template: function(row) {
                        return row.START_DT+" "+row.START_TIME+" ~ "+row.END_DT+" "+row.END_TIME;
                    },
                    width: 240
                }, {
                    field: "JOB_POSITION_ETC",
                    title: "모집분야",
                    width: 200
                }, {
                    field: "careerType",
                    title: "경력",
                }, {
                    field : "RECRUITMENT",
                    title: "채용인원",
                    width : 70
                }, {
                    field : "APPLICATION_CNT",
                    title: "접수인원",
                    width : 70
                }, {
                    field: "",
                    title: "면접심사",
                    template: function(e) {
                        if(e.RECRUIT_STATUS_SN == "4"){
                            return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="recruitListEval.getEvalPop(' + e.RECRUIT_INFO_SN + ')">' +
                                '	<span class="k-button-text">면접심사</span>' +
                                '</button>';
                        }else{
                            return "";
                        }
                    },
                    width : 100
                }, {
                    field: "RECRUIT_STATUS_SN",
                    title: "상태",
                    width : 90,
                    template : function(e){
                        if(e.RECRUIT_STATUS_SN == "1"){
                            return "작성중";
                        }else if(e.RECRUIT_STATUS_SN == "2"){
                            return "접수중";
                        }else if(e.RECRUIT_STATUS_SN == "3"){
                            return "서류심사중";
                        }else if(e.RECRUIT_STATUS_SN == "4"){
                            return "면접심사중";
                        }else if(e.RECRUIT_STATUS_SN == "5"){
                            return "면접심사완료";
                        }else if(e.RECRUIT_STATUS_SN == "E"){
                            if(e.IN_SCREEN_CNT > 0){
                                return "채용완료";
                            }else{
                                return "미채용완료";
                            }
                        }
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    gridReload : function(){
        recruitListEval.global.searchAjaxData = {
            empSeq : $("#empSeq").val(),
            page : "eval"
        }

        recruitListEval.mainGrid("inside/getRecruitList", recruitListEval.global.searchAjaxData)
    },

    detailInit : function(e){
        var detailRow = e.detailRow;

        var dataSource = new kendo.data.DataSource({
            serverPaging: false,
            serverSorting: false,
            serverFiltering: false,
            pageSize: 10,
            filter: { field: "RECRUIT_INFO_SN", operator: "eq", value: e.data.RECRUIT_INFO_SN },
            schema : {
                data: function (data) {
                    return e.data.recruitAreaList;
                },
                total: function (data) {
                    return de.data.recruitAreaList.length;
                },
            }
        });

        detailRow.find(".subGrid").kendoGrid({
            dataSource: e.data.recruitAreaList,
            scrollable: false,
            sortable: true,
            pageable: false,
            columns: [
                {
                    field: "JOB",
                    title: "모집분야",
                }, {
                    field: "DUTY",
                    title: "경력",
                }, {
                    field: "RECRUITMENT",
                    title: "채용인원",
                }, {
                    field: "APPLICATION_CNT",
                    title: "접수인원",
                }, {
                    field: "DOC_SCREEN_CNT",
                    title: "서류심사",
                }, {
                    field: "IN_SCREEN_CNT",
                    title: "면접심사",
                }
            ]
        });
    },

    recruitDetailPop : function (e) {
        var url = "/inside/pop/recruitDetailPop.do?recruitInfoSn="+e;
        var name = "recruitDetailPop";
        var option = "width=1000, height=720, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    },

    screenViewPop : function(sn, e){
        var url = "/inside/pop/screenViewPop.do?recruitInfoSn=" + sn + "&type=" + e;
        var name = "screenViewPop";
        var option = "width=1000, height=300, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    },

    getEvalPop : function(r){
        recruitListEval.global.searchAjaxData = {
            recruitInfoSn : r,
            evalEmpSeq : $("#empSeq").val(),
            group : "Y",
            evalType : "in"
        }

        var chk = customKendo.fn_customAjax("/evaluation/evalChk.do", recruitListEval.global.searchAjaxData);
        if(chk.flag){
            if(chk.eval != null){
                if(chk.eval.EVAL_STATUS == "P"){
                    var url = "/evaluation/evalInApplicationList.do?recruitInfoSn=" + r + "&type=in";
                    var name = "evalInApplicationList";
                    var option = "width=1100, height=680, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
                    var popup = window.open(url, name, option);
                }else if(chk.eval.EVAL_STATUS == "E"){
                    alert("심사가 종료된 평가위원입니다.");
                    return;
                }
            }else{
                alert("면접심사 대상 평가위원이 아닙니다.");
            }
        }
    },
}
