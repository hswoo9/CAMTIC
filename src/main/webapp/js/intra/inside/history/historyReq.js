now = new Date();

var historyList = {

    global : {
        searchAjaxData : ""
    },

    init : function(){
        historyList.dataSet();
        historyList.gridReload();
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
        fn_deptSetting();
    },

    mainGrid: function(url, params){
        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 508,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount : 5
            },
            toolbar : [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="historyList.appointProcessing();">' +
                            '	<span class="k-button-text">수동발령처리</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="historyList.historyReqPop();">' +
                            '	<span class="k-button-text">인사발령등록</span>' +
                            '</button>';
                    }
                }, {
                    name : 'excel',
                    text: '엑셀다운로드'
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="historyList.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }
            ],
            excel : {
                fileName : "발령 목록.xlsx",
                filterable : true
            },
            excelExport: exportGrid,
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound : historyList.onDataBound,
            columns: [
                {
                    title: "순번",
                    template: "#= --record #",
                    width: 50
                }, {
                    field: "EMP_NAME",
                    title: "성명",
                    width: 100,
                    template: function(row){
                        return "<span style='font-weight: bold' class='hover' onclick='historyList.historyReqPop(\"upd\", "+row.APNT_SN+");'>"+row.EMP_NAME+"</span>";
                    }
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
                    field: "AF_DEPT_NAME",
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
                },
                /*
                {
                    title: "수정",
                    width: 100,
                    template: function(row){
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="historyList.fn_modAf('+row.APNT_SN+');">' +
                            '	<span class="k-button-text">수정</span>' +
                            '</button>';
                    }
                }
                 */
                 {
                    title: "발령장",
                    width: 100,
                    template: function (row){
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="historyList.historyPrintPop('+row.APNT_SN+');">' +
                            '	<span class="k-button-text">보기</span>' +
                            '</button>';
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    onDataBound: function(){
        const grid = this;
        grid.tbody.find("tr").dblclick(function (e) {
            const dataItem = grid.dataItem($(this));
            const apntSn = dataItem.APNT_SN;
            historyList.historyViewPop(apntSn);
        });
    },

    gridReload: function (){
        historyList.global.searchAjaxData = {
            historyType : $("#historyType").val(),
            deptSeq : $("#team").val() == "" ? ($("#dept").val() == "" ? "" : $("#dept").val()) : $("#team").val(),
            start_date : $("#start_date").val().replace(/-/g, ""),
            end_date : $("#end_date").val().replace(/-/g, ""),
            gender : $("#gender").val(),
            searchType : $("#searchType").val(),
            searchText : $("#searchText").val(),
        }

        historyList.mainGrid("/inside/getHistoryList", historyList.global.searchAjaxData);
    },

    appointProcessing : function(){
        if(confirm("발령처리하시겠습니까?\n발령 일자가 이전 날짜와 금일인 건에 대해서 처리할 수 있습니다.")){
            var result = customKendo.fn_customAjax("/inside/appointProcessing",{});
            if(result.flag){
                alert("처리되었습니다.");
            }
        }
    },

    historyReqPop: function(mode, pk){
        var url = "/Inside/pop/historyReqPop.do";
        if(mode == "upd"){
            url += "?mode="+mode+"&pk="+pk;
        }
        var name = "historyReqPop";
        var option = "width=1800, height=695, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    },

    historyViewPop: function(apntSn){
        var url = "/Inside/pop/historyViewPop.do?apntSn="+apntSn;
        var name = "historyViewPop";
        var option = "width=965, height=600, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    },

    historyPrintPop: function(userProofSn){
        var url = "/Inside/pop/historyPrintPop.do?apntSn="+userProofSn+"&type=N";
        var name = "historyPrintPop";
        var option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    },


        fn_modAf : function (key){
            $.ajax({
                url: '/inside/getHistoryOne',
                method: 'GET',
                data: { apntSn: key },
                success: function (data) {
                    console.log("데이터 통신 성공",data);
                    historyList.openModAfWindow(data.data, key);
                },
                error: function (error) {
                    console.error("Error fetching data from the server: ", error);
                }
            });



        //$("#modAf").data("kendoWindow").open();

        //$("#selectKey").val(key);

    },

    openModAfWindow: function (data, key) {

        $("#modAf").data("kendoWindow").open();
        console.log("key",key);
        $("#selectKey").val(key);

        if (data.CHNG_NAME !== null && data.CHNG_NAME !== "") {
            $("#chngNm").val(data.CHNG_NAME);
        }else{
            $("#chngNm").val(data.EMP_NAME);
        }
        if (data.CHNG_POSITION !== null && data.CHNG_POSITION !== "") {
            $("#chngPt").val(data.CHNG_POSITION);
        }else{
            $("#chngPt").val(data.AF_POSITION_NAME);
        }
        if (data.CHNG_DEPT !== null && data.CHNG_DEPT !== "") {
            $("#chngDept").val(data.CHNG_DEPT);
        }else{
            $("#chngDept").val(data.AF_DEPT_NAME + " " + data.AF_TEAM_NAME);
        }
    },

    saveChangeAf: function (){


        if($("#chngAf").val() == ""){
            alert("직무를 입력하세요.");
            return;
        }

        var data = {
            chngNm : $("#chngNm").val(),
            chngPt : $("#chngPt").val(),
            chngDept : $("#chngDept").val(),
            apntSn : $("#selectKey").val()
        }

        $.ajax({
            url : "/inside/modAf",
            data : data,
            type : "post",
            dataType: "json",
            success : function (rs){
                if(rs.code == 200){
                    $("#modAf").data("kendoWindow").close();
                    historyList.gridReload();
                }
            }
        });



    }


}
