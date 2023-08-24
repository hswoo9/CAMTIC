let sum=0;
var snackList = {

    init: function() {
        snackList.dataSet();
        snackList.mainGrid();
    },

    dataSet: function(){
        fn_deptSetting();
        customKendo.fn_datePicker("startDt", '', "yyyy-MM-dd", new Date(now.setMonth(now.getMonth() - 1)));
        customKendo.fn_datePicker("endDt", '', "yyyy-MM-dd", new Date());
        $("#startDay, #endDay").attr("readonly", true);
        let activeDataSource = [
            { text: "미포함", value: "Y" },
            { text: "포함", value: "N" },
        ]
        customKendo.fn_dropDownList("active", activeDataSource, "text", "value", 3);
        fn_searchBind();
    },

    mainGrid: function() {
        var dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/campus/getEduAllStatList',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.startDt = $("#startDt").val();
                    data.endDt = $("#endDt").val();
                    data.active = $("#active").val();
                    return data;
                }
            },
            schema : {
                data: function (data) {
                    return data.list;
                },
                total: function (data) {
                    return data.list.length;
                }
            },
            pageSize: 10,
        });

        $("#mainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            height: 551,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 30, 50, 100 ],
                buttonCount : 5
            },
            toolbar: [
                {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button k-button-solid-base" onclick="gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    },
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound : snackList.onDataBound,
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" onclick="fn_checkAll(\'checkAll\', \'empSeqPk\');" style="position : relative; top : 2px;" />',
                    template : function (e){
                        return "<input type='checkbox' id='empSeqPk"+ e.USER_PROOF_SN +"' name='empSeqPk' value='"+e.USER_PROOF_SN+"' class='empSeqPk' style='position : relative; top : 2px;' />";
                    },
                    width: 50,
                }, {
                    field: "DEPT",
                    title: "부서"
                }, {
                    field: "POSITION",
                    title: "직위",
                    width: "9%"
                }, {
                    field: "EMP_NAME",
                    title: "성명",
                    width: "9%"
                }, {
                    title: "개인학습",
                    width: "9%",
                    template: function(row){
                        return row.PERSONAL_TIME+"시간 / "+row.PERSONAL_COUNT+"건"
                    }
                }, {
                    title: "학습조",
                    width: "9",
                    template: function(row){
                        return row.STUDY_TIME+"시간 / "+row.STUDY_COUNT+"건"
                    }
                }, {
                    field: "C",
                    title: "전파학습",
                    width: "9%"
                }, {
                    field: "D",
                    title: "OJT",
                    width: "9%"
                }, {
                    title: "오픈스터디",
                    width: "9%",
                    template: function(row){
                        return row.OPEN_STUDY_TIME+"시간 / "+row.OPEN_STUDY_COUNT+"건"
                    }
                }, {
                    field: "F",
                    title: "공통학습",
                    width: "9%"
                }, {
                    field: "TOTAL_STAT",
                    title: "합계",
                    width: "9%"
                }
            ]
        }).data("kendoGrid");
    },

    onDataBound: function(){
        const grid = this;
        grid.tbody.find("tr").dblclick(function (e) {
            const dataItem = grid.dataItem($(this));
            const snackInfoSn = dataItem.SNACK_INFO_SN;
            snackList.snackPopup(snackInfoSn);
        });
    },

    snackPopup: function(snackInfoSn, mode){
        let urlParams = "";
        if(!isNaN(snackInfoSn)){
            if(urlParams == "") {
                urlParams += "?";
            }else {
                urlParams += "&";
            }
            urlParams += "snackInfoSn=" + snackInfoSn;
        }
        if(!isNaN(mode)){
            if(urlParams == "") {
                urlParams += "?";
            }else {
                urlParams += "&";
            }
            urlParams += "&mode=" + mode;
        }
        const url = "/Inside/pop/snackPop.do"+urlParams;
        const name = "popup test";
        const option = "width = 1000, height = 700, top = 100, left = 200, location = no";
        window.open(url, name, option);
    },

    snackStatPopup: function(){
        const url = "/Inside/pop/snackStatPop.do";
        const name = "snackStatPop";
        const option = "width = 1600, height = 570, top = 100, left = 200, location = no";
        window.open(url, name, option);
    }
}

function gridReload(){
    sum = 0;
    $("#mainGrid").data("kendoGrid").dataSource.read();
}
