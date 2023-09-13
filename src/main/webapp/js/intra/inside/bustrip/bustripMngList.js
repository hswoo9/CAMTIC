var bustripMngList = {
    global: {
        year: now.getFullYear(),
        month: now.getMonth(),
        afMonth: now.getMonth()+1
    },

    init: function(){
        bustripMngList.pageSet();
        bustripMngList.mainGrid();
    },

    pageSet: function(){
        customKendo.fn_datePicker("start_date", 'month', "yyyy-MM-dd", new Date(bustripMngList.global.year, bustripMngList.global.month, 1));
        customKendo.fn_datePicker("end_date", 'month', "yyyy-MM-dd", new Date(bustripMngList.global.year, bustripMngList.global.afMonth, 0));
        $("#pjt_cd").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
            ],
            index: 0,
        });
        let pjtCdDataSource = [
            { text: "해당없음", value: "0" },
            { text: "연구개발", value: "1" },
            { text: "개발사업", value: "2" },
            { text: "교육사업", value: "3" },
            { text: "일자리사업", value: "4" },
            { text: "지원사업", value: "5" },
            { text: "평생학습", value: "6" },
            { text: "캠스타트업", value: "7" }
        ]
        customKendo.fn_dropDownList("pjt_cd", pjtCdDataSource, "text", "value", 2);
        $("#busnName").kendoTextBox();
    },

    mainGrid: function(){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: "/bustrip/getBustripList",
                    dataType: "json",
                    type: "post"
                },
                parameterMap: function(data){
                    data.startDate = $("#start_date").val();
                    data.endDate = $("#end_date").val();
                    data.projectCd = $("#pjt_cd").val();
                    data.busnName = $("#busnName").val();
                    return data;
                }
            },
            schema: {
                data: function(data){
                    return data.list;
                },
                total: function(data){
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
            height: 525,
            pageable: {
                refresh: true,
                pageSizes: [10, 20, "ALL"],
                buttonCount: 5
            },
            toolbar: [
                {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound: bustripMngList.onDataBound,
            columns: [
                {
                    title: "사업명",
                    width: 200,
                    template: function(row){
                        var busnName = "";
                        var project = "";
                        if(row.BUSN_NAME != "" && row.BUSN_NAME != null && row.BUSN_NAME != undefined){
                            busnName = row.BUSN_NAME;
                        }

                        if(row.PROJECT_CD != "" && row.PROJECT_CD != null){
                            project = "(" + row.PROJECT + ") ";
                        }
                        return  project + busnName;
                    }
                }, {
                    field: "EMP_NAME",
                    title: "출장자",
                    width: 80
                }, {
                    title: "출장지 (경유지)",
                    template: function(row){
                        if(row.VISIT_LOC_SUB != ""){
                            return row.VISIT_CRM + " (" + row.VISIT_LOC_SUB+")";
                        }else{
                            return row.VISIT_CRM;
                        }
                    },
                    width: 160
                }, {
                    title: "출발일시",
                    template: function(row){
                        return row.TRIP_DAY_FR + " " + row.TRIP_TIME_FR;
                    },
                    width: 100
                }, {
                    title: "복귀일시",
                    template: function(row){
                        return row.TRIP_DAY_TO + " " + row.TRIP_TIME_TO;
                    },
                    width: 100
                }, {
                    field: "CAR_CLASS_NAME",
                    title: "차량",
                    width: 80
                }, {
                    title: "결재상태",
                    template: function(row){
                        if(row.STATUS == 0){
                            return "미결재";
                        }else if(row.STATUS == 10){
                            return "상신";
                        }else if(row.STATUS == 30){
                            return "반려";
                        }else if(row.STATUS == 40){
                            return "회수";
                        }else if(row.STATUS == 100){
                            return "결재완료";
                        }else {
                            return "-";
                        }
                    },
                    width: 60
                }
            ]
        }).data("kendoGrid");
    },

    onDataBound: function(){
        var grid = this;
        grid.element.off('dblclick');
        grid.tbody.find("tr").dblclick(function(){
            var dataItem = grid.dataItem($(this).closest("tr"));
            bustripMngList.bustripReqPop(dataItem.HR_BIZ_REQ_ID);
        });
    },

    bustripReqPop: function(e){
        let url = "/bustrip/pop/bustripReqPop.do?hrBizReqId="+e+"&mode=mng";
        let name = "bustripReqPop";
        let option = "width=1200, height=700, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        window.open(url, name, option);
    }
}
