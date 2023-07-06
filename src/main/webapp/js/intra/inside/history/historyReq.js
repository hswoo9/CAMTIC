var now = new Date();

var historyReq = {

    init : function(){
        historyReq.dataSet();
        historyReq.mainGrid();
    },

    fn_chngDeptComp: function (){
        var data = {}
        data.deptLevel = 2;
        data.parentDeptSeq = this.value();

        var ds = customKendo.fn_customAjax("/dept/getDeptAList", data);
        customKendo.fn_dropDownList("team", ds.rs, "dept_name", "dept_seq")
    },

    mainGrid: function(){
        var dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/inside/getHistoryList',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.historyType = $("#historyType").val();
                    data.deptSeq = $("#team").val() == "" ? ($("#dept").val() == "" ? "" : $("#dept").val()) : $("#team").val(),
                    data.start_date = $("#start_date").val().replace(/-/g, "");
                    data.end_date = $("#end_date").val().replace(/-/g, "");
                    data.gender = $("#gender").val();
                    data.searchType = $("#searchType").val();
                    data.searchText = $("#searchText").val();

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
            height: 489,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 30, 50, 100 ],
                buttonCount : 5
            },
            toolbar : [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="historyReq.historyReqPop();">' +
                            '	<span class="k-button-text">인사발령등록</span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    field: "ROW_NUM",
                    title: "순번",
                    width: 40
                }, {
                    field: "EMP_NAME",
                    title: "성명",
                    width: 100
                }, {
                    field: "APNT_NAME",
                    title: "발령 구분",
                    width: 150
                }, {
                    field: "HISTORY_DT",
                    title: "발령 일자",
                    width: 150
                }, {
                    field: "NUMBER_NAME",
                    title: "호수",
                    width: 100
                }, {
                    title: "발령 사항",
                    template : function (row){
                        let historyVal = "";
                        if(!row.AF_DEPT_NAME == "") {
                            historyVal += row.AF_DEPT_NAME + " ";
                        }
                        if(!row.AF_TEAM_NAME == "") {
                            historyVal += row.AF_TEAM_NAME + " ";
                        }
                        if(!row.AF_POSITION_NAME == "") {
                            historyVal += row.AF_POSITION_NAME + " ";
                        }
                        if(!row.AF_DUTY_NAME == "") {
                            historyVal += row.AF_DUTY_NAME;
                        }
                        return historyVal;
                    }
                }, {
                    field: "ETC",
                    title: "비고",
                    width: 100
                }, {
                    field: "APPROVE_EMP_NAME",
                    title: "기록인",
                    width: 100
                }
            ]
        }).data("kendoGrid");
    },

    dataSet: function(){
        customKendo.fn_textBox(["searchText"])
        $("#historyType").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "임용 (정규직)", value: "1" },
                { text: "임용 (계약직)", value: "2" },
                { text: "임용 (인턴 사원)", value: "3" },
                { text: "임용 (단기 직원)", value: "4" },
                { text: "임용 (위촉 직원)", value: "5" },
                { text: "임용 (경비 / 환경)", value: "6" },
                { text: "승진 (직급)", value: "7" },
                { text: "승진 (직위)", value: "8" },
                { text: "전보", value: "9" },
                { text: "겸직", value: "10" },
                { text: "직무 대리", value: "11" },
                { text: "파견", value: "12" },
                { text: "면직", value: "13" },
                { text: "강등", value: "14" },
                { text: "조직 개편", value: "15" },
                { text: "호칭 변경", value: "16" },
                { text: "기타", value: "17" }
            ],
            index: 0
        });

        var data = {

        }
        data.deptLevel = 1;
        var deptDsA = customKendo.fn_customAjax("/dept/getDeptAList", data);

        customKendo.fn_dropDownList("dept", deptDsA.rs, "dept_name", "dept_seq");

        $("#dept").data("kendoDropDownList").bind("change", historyReq.fn_chngDeptComp)
        $("#dept").data("kendoDropDownList").select(0);
        $("#dept").data("kendoDropDownList").trigger("change");

        $("#gender").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value : ""},
                { text: "남자", value: "M" },
                { text: "여자", value: "F" },
            ],
            index: 0
        });

        $("#start_date").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date(now.setMonth(now.getMonth() - 6))
        });

        $("#end_date").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date()
        });

        $("#appointmentType").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "발령전", value: "1" },
                { text: "발령후", value: "2" }
            ],
            index: 0
        });

        $("#searchType").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "성명", value: "1" },
                { text: "직급", value: "2" },
                { text: "등급", value: "3" },
                { text: "직책", value: "4" },
                { text: "직무", value: "5" },
                { text: "호수", value: "6" },
                { text: "비고", value: "7" }
            ],
            index: 0
        });
    },

    historyReqPop: function(){
        var url = "/Inside/historyReqPop.do";
        var name = "historyReqPop";
        var option = "width=1800, height=900, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    }
}
