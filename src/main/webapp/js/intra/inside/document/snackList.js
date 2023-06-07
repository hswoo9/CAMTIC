/**
 * 2023.06.03
 * 작성자 : 김지혜
 * 내용 : 문서관리 - 야근/휴일식대대장
 */

var snackList = {
    global : {
        now: new Date()
    },

    fn_defaultScript: function () {

        customKendo.fn_datePicker("startDay", '', "yyyy-MM-dd", new Date(snackList.global.now.setMonth(snackList.global.now.getMonth() - 1)));
        customKendo.fn_datePicker("endDay", '', "yyyy-MM-dd", new Date());
        $("#startDay, #endDay").attr("readonly", true);

        $("#dept").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "전체", value: "" },
                {text: "미래전략기획본부", value: "미래전략기획본부"},
                {text: "R&BD사업본부", value: "R&BD사업본부"},
                {text: "기업성장지원본부", value: "기업성장지원본부"},
                {text: "우주항공사업부", value: "우주항공사업부"},
                {text: "드론사업부", value: "드론사업부"},
                {text: "스마트제조사업부", value: "스마트제조사업부"},
                {text: "경영지원실", value: "경영지원실"}
            ],
            index: 0
        });

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

    },
        mainGrid: function () {
            var dataSource = new kendo.data.DataSource({
                serverPaging: false,
                transport: {
                    read : {
                        url : '',
                        dataType : "json",
                        type : "post"
                    },
                    parameterMap: function(data, operation) {
                        return data;
                    }
                },
                schema : {
                    data: function (data) {
                        return data;
                    },
                    total: function (data) {
                        return data.length;
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
                columns: [
                    {
                        headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" class="k-checkbox checkbox"/>',
                        template : "<input type='checkbox' id='ehiPk#=DOCUMENT_ID#' name='ehiPk' value='#=DOCUMENT_ID#' class='k-checkbox checkbox'/>",
                        width: 50
                    }, {
                        field: "",
                        title: "순번",
                        width: "5%",
                        template: "#= record-- #"
                    }, {
                        field: "",
                        title: "식대 구분",
                        width: "10%"
                    }, {
                        field: "",
                        title: "부서",
                        width: "10%"
                    }, {
                        field: "",
                        title: "일시",
                        width: "20%"
                    }, {
                        field: "",
                        title: "이용자",
                        width: "15%"
                    }, {
                        field: "",
                        title: "주문처",
                        width: "10%"
                    }, {
                        field: "",
                        title: "이용금액(원)",
                        width: "10%"
                    }, {
                        field: "",
                        title: "결재 구분",
                        width: "10%"
                    }, {
                        field: "",
                        title: "증빙 수령자",
                        width: "10%"
                    }]
            }).data("kendoGrid");
        },

    snackPopup : function(){
        var url = "/Inside/Pop/snackPop.do";
        var name = "popup test";
        var option = "width = 1000, height = 360, top = 100, left = 200, location = no"
        var popup = window.open(url, name, option);
    }
}

