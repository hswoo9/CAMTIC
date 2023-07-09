var now = new Date();

var snackList = {

    init: function() {
        snackList.dataSet();
        snackList.mainGrid();
    },

    fn_snackCertAllReq: function(status){
        const ch = $('input[name=\'sanckPk\']:checked');
        let snackInfoSnArr = [];
        $.each(ch, function(){
            snackInfoSnArr.push(this.value);
        });

        if(snackInfoSnArr.length == 0){
            alert('결재 할 항목을 선택해 주세요.');
            return;
        }

        let data = {
            snackInfoSnArr : snackInfoSnArr.join(),
            empSeq : $("#empSeq").val(),
            status : status
        }

        const result = customKendo.fn_customAjax("/inside/setSnackReqCert", data);

        if(result.flag){
            alert("결재가 완료되었습니다.");
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
            height: 489,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 30, 50, 100 ],
                buttonCount : 5
            },
            toolbar: [
                {
                    name: 'excel',
                    text: '엑셀다운로드'
                },
                {
                    name: '',
                    text: '통계조회'
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound : snackList.onDataBound,
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" onclick="fn_checkAll(\'checkAll\', \'sanckPk\');" name="checkAll"/>',
                    template : "<input type='checkbox' id='sanckPk#=SNACK_INFO_SN#' name='sanckPk' value='#=SNACK_INFO_SN#'/>",
                    width: 50
                }, {
                    field: "ROW_NUM",
                    title: "순번",
                    width: "50"
                }, {
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
                    width: "10%"
                }, {
                    field: "CARD_TEXT",
                    title: "결재 구분",
                    width: "10%"
                }, {
                    field: "RECIPIENT_EMP_NAME",
                    title: "증빙 수령자",
                    width: "10%"
                }]
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

    dataSet: function(){
        customKendo.fn_datePicker("startDay", '', "yyyy-MM-dd", new Date(now.setMonth(now.getMonth() - 1)));
        customKendo.fn_datePicker("endDay", '', "yyyy-MM-dd", new Date());
        $("#startDay, #endDay").attr("readonly", true);

        $("#mealsDivision").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "전체", value: "" },
                {text: "야간 간식", value: "야간 간식"},
                {text: "휴일 식대", value: "휴일 식대"},
                {text: "평일 식대", value: "평일 식대"}
            ],
            index: 0
        });

        $("#payDivision").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "전체", value: "" },
                {text: "개인", value: "개인"},
                {text: "법인", value: "법인"},
                {text: "외상", value: "외상"}
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
                {text: "결재", value: "결재"},
                {text: "미결재", value: "미결재"}
            ],
            index: 0
        });
        fn_deptSetting();
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
        const option = "width = 1000, height = 360, top = 100, left = 200, location = no";
        window.open(url, name, option);
    }
}

