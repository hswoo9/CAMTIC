var recruitList = {

    init : function(){
        recruitList.dataSet();
        recruitList.mainGrid();
    },

    dataSet() {
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

    mainGrid : function() {
        var dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : 'inside/getRecruitList',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    return data;
                }
            },
            schema : {
                data: function (data) {
                    console.log(data.list);
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="">' +
                            '	<span class="k-button-text">채용통계 조회</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="">' +
                            '	<span class="k-button-text">결재상신</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="recruitList.recruitReqPop();">' +
                            '	<span class="k-button-text">채용공고등록</span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            detailTemplate : kendo.template($("#template").html()),
            detailInit: recruitList.detailInit,
            columns: [
                {
                    template: "#= --record #",
                    title: "순번",
                    width : 50
                }, {
                    field: "RECRUIT_NUM",
                    title: "공고번호"
                }, {
                    field: "RECRUIT_TITLE",
                    title: "공고명",
                    width: 350,
                    template : function (e){

                        return '<a href="javascript:void(0);" onclick="recruitList.recruitDetailPop(\''+e.RECRUIT_INFO_SN+'\');">'+e.RECRUIT_TITLE+'</a>';
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
                    width: 240
                }, {
                    field: "careerType",
                    title: "경력",
                }, {
                    field : "RECRUITMENT",
                    title: "채용인원",
                }, {
                    field : "APPLICATION_CNT",
                    title: "접수인원",
                }, {
                    field: "",
                    title: "서류심사",
                    template: function(e) {
                        if(e.STATUS == "3" && e.DOC_SCREEN_CNT == e.DOC_SCREEN_RESULT){
                            return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="recruitList.screenViewPop(' + e.RECRUIT_INFO_SN + ', \'doc\')">' +
                                '	<span class="k-button-text">심사결과</span>' +
                                '</button>';
                        }else{
                            return "";
                        }
                    }
                }, {
                    field: "",
                    title: "면접심사",
                    template: function(e) {
                        if(e.STATUS == "3" && e.IN_SCREEN_CNT == e.IN_SCREEN_RESULT){
                            return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="recruitList.screenViewPop(' + e.RECRUIT_INFO_SN + ', \'in\')">' +
                                '	<span class="k-button-text">심사결과</span>' +
                                '</button>';
                        }else{
                            return "";
                        }
                    }
                }, {
                    title: "상태",
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="recruitList.recruitAdminPop(' + e.RECRUIT_INFO_SN + ');">' +
                            '	<span class="k-button-text">공고관리</span>' +
                            '</button>';
                    }
                }, {
                    field: "RECRUIT_STATUS_SN",
                    title: "상태",
                    width : 60,
                    template : function(e){
                        if(e.RECRUIT_STATUS_SN == "1"){
                            return "작성중";
                        }else if(e.RECRUIT_STATUS_SN == "2"){
                            return "접수중";
                        }else if(e.RECRUIT_STATUS_SN == "3"){
                            return "심사중(서류심사)";
                        }else if(e.RECRUIT_STATUS_SN == "4"){
                            return "심사중(면접심사)";
                        }else if(e.RECRUIT_STATUS_SN == "5"){
                            return "채용완료";
                        }
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    recruitReqPop : function() {
        var url = "/Inside/pop/recruitReqPop.do";
        var name = "recruitReqPop";
        var option = "width=1000, height=1200, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    },

    recruitAdminPop : function(e) {
        var url = "/inside/pop/recruitAdminPop.do?recruitInfoSn=" + e;
        var name = "recruitAdminPop";
        var option = "width=1750, height=740, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
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
        var option = "width=1000, height=470, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    },
}
