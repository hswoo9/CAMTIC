var dutyInfoMng = {
    init: function(){
        dutyInfoMng.dataSet();
        dutyInfoMng.mainGrid();
    },

    dataSet: function(){
        fn_deptSetting();
        customKendo.fn_textBox(["searchValue"]);
        customKendo.fn_datePicker("requestYear", 'decade', "yyyy", new Date());
        $("#startDay, #endDay").attr("readonly", true);
        let activeDataSource = [
            { text: "미포함", value: "Y" },
            { text: "포함", value: "N" },
        ]
        customKendo.fn_dropDownList("active", activeDataSource, "text", "value", 3);
        let statusDataSource = [
            { text: "승인", value: "Y" },
            { text: "미승인", value: "N" },
        ]
        customKendo.fn_dropDownList("status", statusDataSource, "text", "value", 1);
        let statusDataSource2 = [
            { text: "승인", value: "Y" },
            { text: "미승인", value: "N" },
        ]
        customKendo.fn_dropDownList("status2", statusDataSource2, "text", "value", 1);
        fn_searchBind();
    },

    mainGrid: function(){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: '/campus/getDutyInfoMngList',
                    dataType: "json",
                    type: "post"
                },
                parameterMap: function(data) {
                    data.requestYear = $("#requestYear").val();
                    data.dept = $("#dept").data("kendoDropDownList").value();
                    data.team = $("#team").data("kendoDropDownList").value();
                    data.searchValue = $("#searchValue").val();
                    data.active = $("#active").data("kendoDropDownList").value();
                    data.status = $("#status").data("kendoDropDownList").value();
                    data.status2 = $("#status2").data("kendoDropDownList").value();
                    return data;
                }
            },
            schema: {
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
            pageable: {
                refresh: true,
                pageSizes : [ 10, 20, 50, "ALL" ],
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
                        if(row.TARGET_STATUS == 0){
                            return "<span class='hover' onclick='dutyInfoMng.targetEduMngPop(\"mng\", "+row.EMP_SEQ+");'>작성중</span>";
                        }else if(row.TARGET_STATUS == 10){
                            return "<span class='hover' onclick='dutyInfoMng.targetEduMngPop(\"mng\", "+row.EMP_SEQ+");'>승인요청중</span>";
                        }else if(row.TARGET_STATUS == 30){
                            return "<span class='hover' onclick='dutyInfoMng.targetEduMngPop(\"mng\", "+row.EMP_SEQ+");'>반려</span>";
                        }else if(row.TARGET_STATUS == 100){
                            return "<span style='font-weight: bold' class='hover' onclick='dutyInfoMng.targetEduMngPop(\"mng\", "+row.EMP_SEQ+");'>승인 ("+row.TARGET_APPROVAL_DATE+")</span>";
                        }else{
                            return "작성안함";
                        }
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
    },

    targetEduMngPop: function(mode, empSeq){
        let url = "/Campus/pop/targetEduMngPop.do?mode="+mode+"&empSeq="+empSeq+"&targetYear="+$("#requestYear").val().substring(0, 4);
        const name = "targetEduMngPop";
        const option = "width = 1200, height = 800, top = 100, left = 200, location = no";
        window.open(url, name, option);
    }
}

function gridReload(){
    dutyInfoMng.mainGrid();
}