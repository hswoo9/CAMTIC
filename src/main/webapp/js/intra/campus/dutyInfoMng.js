var dutyInfoMng = {

    init: function() {
        dutyInfoMng.dataSet();
        dutyInfoMng.mainGrid();
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
                    url : '/campus/getDutyInfoMngList',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.dutyYear = 2023;
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
            height: 508,
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
            columns: [
                {
                    field: "DEPT",
                    title: "부서"
                }, {
                    field: "POSITION",
                    title: "직위",
                    width: "10%"
                }, {
                    field: "EMP_NAME",
                    title: "성명",
                    width: "10%"
                }, {
                    field: "OFFICE_TEL_NUM",
                    title: "전화",
                    width: "10%"
                }, {
                    title: "목표기술서",
                    width: "10%",
                    template: function(row){
                        return "-";
                    }
                }, {
                    title: "직무기술서",
                    width: "10%",
                    template: function(row){
                        if(row.DUTY_STATUS == 0){
                            return "<span class='hover' onclick='dutyInfo.dutyInfoReqPop(\"mng\", "+row.DUTY_CHECK+");'>작성중</span>";
                        }else if(row.DUTY_STATUS == 10){
                            return "<span class='hover' onclick='dutyInfo.dutyInfoReqPop(\"mng\", "+row.DUTY_CHECK+");'>승인요청중</span>";
                        }else if(row.DUTY_STATUS == 30){
                            return "<span class='hover' onclick='dutyInfo.dutyInfoReqPop(\"mng\", "+row.DUTY_CHECK+");'>반려</span>";
                        }else if(row.DUTY_STATUS == 100){
                            return "<span style='font-weight: bold' class='hover' onclick='dutyInfo.dutyInfoReqPop(\"mng\", "+row.DUTY_CHECK+");'>승인 ("+row.DUTY_APPROVAL_DATE+")</span>";
                        }else{
                            return "작성안함";
                        }
                    }
                }
            ]
        }).data("kendoGrid");
    }
}
