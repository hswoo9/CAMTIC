let sum=0;
var snackList = {

    init: function() {
        snackList.dataSet();
        snackList.mainGrid();
    },

    mainGrid: function() {
        var dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/inside/getSnackList',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.startDt = $("#startDt").val();
                    data.endDt = $("#endDt").val();
                    data.empSeq = $("#regEmpSeq").val();
                    data.mealsDivision = $("#mealsDivision").val();
                    data.payDivision = $("#payDivision").val();
                    data.approval = $("#approval").val();
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
                pageSizes: [10, 20, "ALL"],
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
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="snackList.snackPopup();">' +
                            '	<span class="k-button-text">식대 등록하기</span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound : snackList.onDataBound,
            columns: [
                {
                    field: "SNACK_TYPE_TEXT",
                    title: "식대 구분",
                    width: "10%"
                }, {
                    field: "REG_DEPT_NAME",
                    title: "부서",
                    width: "10%"
                }, {
                    field: "USE_DT",
                    title: "일시"
                }, {
                    title: "이용자",
                    template : function(row){
                        let userText = row.USER_TEXT;
                        let userTextArr = userText.split(',');
                        if(userTextArr.length > 1) {
                            return userTextArr[0]+" 외 "+(userTextArr.length-1)+"명";
                        }else{
                            return userTextArr[0];
                        }

                    },
                    width: "15%"
                }, {
                    field: "AREA_NAME",
                    title: "주문처",
                    width: "10%"
                }, {
                    field: "AMOUNT_SN",
                    title: "이용금액(원)",
                    width: "10%",
                    template: function(row){
                        sum += Number(row.AMOUNT_SN);
                        return fn_numberWithCommas(row.AMOUNT_SN);
                    },
                    footerTemplate : function () {
                        return "<span id='total'></span>";
                    }
                }, {
                    field: "PAY_TYPE_TEXT",
                    title: "결제 구분",
                    width: "10%"
                }, {
                    field: "RECIPIENT_EMP_NAME",
                    title: "증빙 수령자",
                    width: "10%"
                }, {
                    title: "영수증",
                    width: "10%",
                    template: function(row){
                        if(row.file_no > 0){
                            return '<span style="cursor: pointer" onclick="fileDown(\''+row.file_path+row.file_uuid+'\', \''+row.file_org_name+'.'+row.file_ext+'\')">보기</span>';
                        }else{
                            return '-';
                        }

                    }
                }, {
                    title: "처리 상태",
                    template : function(row){
                        if(row.STATUS == "10") {
                            return "대기";
                        }else if(row.STATUS == "100") {
                            return "승인";
                        }else if(row.STATUS == "30") {
                            return "반려";
                        }else {
                            return "데이터 오류"
                        }
                    },
                    width: 100
                }
            ],
            dataBound: function(){

                $("#total").text("총계 :" + fn_numberWithCommas(sum) + " 원");
                sum = 0;
            }
        }).data("kendoGrid");
    },

    calc: function(){

    },

    onDataBound: function(){
        const grid = this;
        grid.tbody.find("tr").dblclick(function (e) {
            const dataItem = grid.dataItem($(this));
            const snackInfoSn = dataItem.SNACK_INFO_SN;
            snackList.snackPopup(snackInfoSn);
        });
    },

    dataSet: function(){
        customKendo.fn_datePicker("startDt", '', "yyyy-MM-dd", new Date(now.setMonth(now.getMonth() - 1)));
        customKendo.fn_datePicker("endDt", '', "yyyy-MM-dd", new Date());
        $("#startDay, #endDay").attr("readonly", true);

        $("#mealsDivision").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "전체", value: "" },
                {text: "야간 식대", value: "1"},
                {text: "휴일 식대", value: "2"},
                {text: "평일 식대", value: "3"}
            ],
            index: 0
        });

        $("#payDivision").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "전체", value: "" },
                {text: "개인", value: "1"},
                {text: "법인", value: "2"},
                {text: "외상", value: "3"}
            ],
            index: 0
        });

        $("#account").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "전체", value: "" },
                {text: "순대이야기", value: "순대이야기"},
                {text: "지리산밥상", value: "지리산밥상"},
                {text: "김밥한끼", value: "김밥한끼"},
                {text: "한솔본가", value: "한솔본가"},
                {text: "고궁", value: "고궁"},
                {text: "두찜효자1호점", value: "두찜효자1호점"},
                {text: "전주정든식당", value: "전주정든식당"}
            ],
            index: 0
        });

        $("#approval").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "전체", value: "" },
                {text: "결재", value: "100"},
                {text: "미결재", value: "0"},
                {text: "반려", value: "30"}
            ],
            index: 0
        });
        fn_searchBind();
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
    $("#mainGrid").data("kendoGrid").dataSource.read();
}
