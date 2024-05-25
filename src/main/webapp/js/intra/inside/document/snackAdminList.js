let sum=0;
var snackAdminList = {

    init: function() {
        snackAdminList.dataSet();
        snackAdminList.mainGrid();
    },

    fn_setCertRep : function (p, key){
        var message = "승인하시겠습니까?"
        if(p == 30){
            message = "반려하시겠습니까?"
        }
        if(!confirm(message)){
            return;
        }
        var data = {
            snackInfoSn : key,
            empSeq : $("#empSeq").val(),
            status : p
        }

        var result = customKendo.fn_customAjax("/inside/setSnackReqCert", data);

        if(result.flag){
            gridReload();
        }

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
                    data.mealsDivision = $("#mealsDivision").val();
                    data.payDivision = $("#payDivision").val();
                    data.approval = $("#approval").val();
                    data.isAdmin = "Y";
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
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="snackAdminList.snackStatPopup();">' +
                        '	<span class="k-button-text">통계 조회</span>' +
                        '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            // dataBound : snackAdminList.onDataBound,
            columns: [
                {
                    title: "번호",
                    width: 40,
                    template: "#= --record #"
                }, {
                    field: "SNACK_TYPE_TEXT",
                    title: "식대 구분",
                    width: 80
                }, {
                    field: "REG_DEPT_NAME",
                    title: "부서",
                    width: 100
                }, {
                    field: "USE_DT",
                    title: "일시",
                    width: 80
                }, {
                    title: "이용자",
                    template : function(row){
                        let userText = row.USER_TEXT;
                        let userTextArr = userText.split(',');
                        if(userTextArr.length > 1) {
                            return '<a href="javascript:void(0);" style="font-weight: bold" onclick="snackAdminList.snackPopup('+row.SNACK_INFO_SN+', \'isAdmin\')">' + userTextArr[0]+" 외 "+(userTextArr.length-1)+'명</a>';
                        }else{
                            return '<a href="javascript:void(0);" style="font-weight: bold" onclick="snackAdminList.snackPopup('+row.SNACK_INFO_SN+', \'isAdmin\')">' + userTextArr[0] + '</a>';
                        }

                    },
                    width: 100
                }, {
                    field: "AREA_NAME",
                    title: "주문처",
                    width: 100
                }, {
                    field: "AMOUNT_SN",
                    title: "이용금액(원)",
                    width: 100,
                    template: function(row){
                        sum += Number(row.AMOUNT_SN);
                        return "<div style='text-align: right'>" + fn_numberWithCommas(row.AMOUNT_SN) + "</div>";
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'><span id='total'></span></div>";
                    }
                }, {
                    field: "PAY_TYPE_TEXT",
                    title: "결제 구분",
                    width: 80
                }, {
                    field: "RECIPIENT_EMP_NAME",
                    title: "증빙 수령자",
                    width: 100
                }, {
                    title: "영수증",
                    width: 80,
                    template: function(row){
                        if(row.file_no > 0){
                            return '<span style="cursor: pointer" onclick="fileDown(\''+row.file_path+row.file_uuid+'\', \''+row.file_org_name+'.'+row.file_ext+'\')">보기</span>';
                        }else{
                            return '-';
                        }

                    }
                }, /*{
                    field: "",
                    title: "비고",
                    template : function(e){
                        if(e.STATUS == "10"){
                            return '<span>' +
                                '       <button type="button" class="k-button k-button-md k-button-solid-info" onclick="snackAdminList.fn_setCertRep(100, \''+e.SNACK_INFO_SN+'\')">승인</button>' +
                                '       <button type="button" class="k-button k-button-md k-button-solid-error" onclick="snackAdminList.fn_setCertRep(30, \''+e.SNACK_INFO_SN+'\')">반려</button>' +
                                '   </span>';
                        } else {
                            return "";
                        }
                    },
                    width: 100
                }, */{
                    title: "지급신청서",
                    template : function(e){
                        return '미작성';
                    },
                    width: 80
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            },
            dataBound: function(){

                $("#total").text("총계 :" + fn_numberWithCommas(sum) + " 원");
                sum = 0;
            }
        }).data("kendoGrid");
    },

    calc: function(){

    },

    onDataBound: function(){
        sum = 0;
        const grid = this;
        grid.tbody.find("tr").dblclick(function (e) {
            const dataItem = grid.dataItem($(this));
            const snackInfoSn = dataItem.SNACK_INFO_SN;
            snackAdminList.snackPopup(snackInfoSn, 'mng');
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

        $("#approval").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "전체", value: "" },
                {text: "결재", value: "결재"},
                {text: "미결재", value: "미결재"}
            ],
            index: 0
        });
        fn_deptSetting();
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
        if(isNaN(mode)){
            if(urlParams == "") {
                urlParams += "?";
            }else {
                urlParams += "&";
            }
            urlParams += "mode=" + mode;
        }
        const url = "/Inside/pop/snackPop.do"+urlParams;
        const name = "popup test";
        const option = "width = 1100, height = 700, top = 100, left = 200, location = no";
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