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
            // dataBound : snackList.onDataBound,
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" onclick="fn_checkAll(\'checkAll\', \'evalChk\');"/>',
                    template : function(e){
                        if(e.STATUS == "100"){
                            return "<input type='checkbox' id='eval_" + e.SNACK_INFO_SN + "' name='evalChk' value='" + e.SNACK_INFO_SN + "'/>";
                        } else {
                            return '';
                        }
                    },
                    width: 30
                }, {
                    field: "SNACK_TYPE_TEXT",
                    title: "식대 구분",
                    width: 80
                }, {
                    field: "REG_DEPT_NAME",
                    title: "부서",
                    width: 80
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
                            return '<a href="javascript:void(0);" style="font-weight: bold" onclick="snackList.snackPopup('+row.SNACK_INFO_SN+', \'infoPop\')">' + userTextArr[0]+' 외 '+(userTextArr.length-1)+'명</a>';
                        }else{
                            return '<a href="javascript:void(0);" style="font-weight: bold" onclick="snackList.snackPopup('+row.SNACK_INFO_SN+', \'infoPop\')">' + userTextArr[0]+ '</a>';
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
                    footerTemplate : function () {
                        return "<div style='text-align: right'><span id='total'></span></div>";
                    }
                }, {
                    field: "PAY_TYPE_TEXT",
                    title: "결제 구분",
                    width: 80
                }, {
                    field: "RECIPIENT_EMP_NAME",
                    title: "증빙 수령자",
                    width: 80
                }, {
                    title: "영수증",
                    width: 50,
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
                        }else if(row.STATUS == "0") {
                            return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button k-button-solid-base" onclick="snackList.fn_apprRequest('+row.SNACK_INFO_SN+')">' +
                                   '	<span class="k-button-text">승인요청</span>' +
                                   '</button>';
                        } else {
                            return "데이터 오류"
                        }
                    },
                    width: 70
                }, {
                    title : "지급신청",
                    template : function(row){
                        if(row.STATUS == "100") {
                            return '<button type="button" class="k-button k-button-solid-base" onclick="snackList.fn_reqRegPopup('+row.SNACK_INFO_SN+')">지급신청</button>'
                        }else{
                            return "-";
                        }
                    },
                    width: 70
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
        if(mode != null){
            if(urlParams == "") {
                urlParams += "?";
            }else {
                urlParams += "&";
            }
            urlParams += "mode=" + mode;
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
    },

    fn_apprRequest : function(key){
        if(confirm("승인 요청 하시겠습니까?")){
            var data = {
                snackInfoSn : key,
                status : 10
            }

            var result = customKendo.fn_customAjax("/inside/setSnackReqCert", data);

            if(result.flag){
                alert("승인 요청이 완료되었습니다.");
                snackList.mainGrid();
            }
        }
    },

    fn_reqRegPopup : function (snackInfoSn){
        var url = "/payApp/pop/regPayAppPop.do?snackInfoSn="+snackInfoSn+"&reqType=snack";
        var name = "blank";
        var option = "width = 1700, height = 820, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    }
}

function gridReload(){
    $("#mainGrid").data("kendoGrid").dataSource.read();
}
