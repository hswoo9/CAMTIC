var now = new Date();

var assetList = {

    init : function(){
        assetList.dataSet();
        assetList.mainGrid();
    },

    dataSet() {
        $("#start_date").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date(now.setMonth(now.getMonth() - 1))
        });

        $("#end_date").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date()
        });

        $("#drop1").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "CAMTIC", value: "1" },
                { text: "드론산업", value: "2" },
                { text: "벤처단지", value: "3" }
            ],
            index: 0
        });

        $("#drop2").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "자산", value: "1" },
                { text: "소모품", value: "2" },
                { text: "부대품", value: "3" }
            ],
            index: 0
        });

        $("#drop3").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "차량운반구", value: "1" },
                { text: "장비", value: "2" },
                { text: "비품", value: "3" },
                { text: "공구", value: "4" }
            ],
            index: 0
        });

        $("#drop4").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "자동차", value: "1" },
                { text: "자전거", value: "2" },
                { text: "카트", value: "3" },
                { text: "지게차", value: "4" }
            ],
            index: 0
        });

        $("#drop5").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "자동차", value: "1" }
            ],
            index: 0
        });

        $("#drop6").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "활용", value: "1" },
                { text: "불용·불용", value: "2" },
                { text: "불용·요정", value: "3" },
                { text: "불용·유휴", value: "4" },
                { text: "불용·부족", value: "5" },
                { text: "처분·폐기", value: "6" }
            ],
            index: 0
        });

        $("#drop7").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "11B-대한드론축구협회", value: "1" }
            ],
            index: 0
        });

        $("#drop8").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "승인", value: "1" },
                { text: "미승인", value: "2" }
            ],
            index: 0
        });

        $("#drop9").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "대", value: "1" },
                { text: "소", value: "2" }
            ],
            index: 0
        });

        $("#searchType").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "자산명", value: "1" },
                { text: "공고명", value: "2" },
                { text: "규격", value: "3" },
                { text: "모델", value: "4" },
                { text: "사용자", value: "5" }
            ],
            index: 0
        });

        $("#searchVal").kendoTextBox();

        $("#drop10").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "20개", value: "1" },
                { text: "50개", value: "2" },
                { text: "100개", value: "3" }
            ],
            index: 0
        });

    },

    mainGrid : function() {
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
            selectable: "row",
            height: 489,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 30, 50, 100 ],
                buttonCount : 5
            },
            toolbar : [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="assetList.goodsManagePopup();">' +
                            '	<span class="k-button-text">물품관리관 관리</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="assetList.bulkChangePopup();">' +
                            '	<span class="k-button-text">일괄 변경</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="assetList.addAssetPopup();">' +
                            '	<span class="k-button-text">자산 추가</span>' +
                            '</button>';
                    }
                }, {
                    name: 'excel',
                    text: '엑셀다운로드'
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" class="k-checkbox checkbox"/>',
                    template : "<input type='checkbox' id='' name='' value='' class='k-checkbox checkbox'/>",
                    width: 50
                }, {
                    field: "",
                    title: "순번"
                }, {
                    field: "",
                    title: "자산 번호"
                }, {
                    field: "",
                    title: "등록 일자"
                }, {
                    field: "",
                    title: "자산명"
                }, {
                    field: "",
                    title: "모델명"
                }, {
                    field: "",
                    title: "규격"
                }, {
                    field: "",
                    title: "설치 장소"
                }, {
                    field: "",
                    title: "사용자"
                }, {
                    field: "",
                    title: "구입가격(원)"
                }, {
                    field: "",
                    title: "상태"
                }
            ]
        }).data("kendoGrid");
    },

    goodsManagePopup : function() {
        var url = "/Inside/Pop/goodsManagePop.do";
        var name = "goodsManagePop";
        var option = "width = 500, height = 200, top = 100, left = 200, location = no, _blank"
        var popup = window.open(url, name, option);
    },

    bulkChangePopup : function() {
        var url = "/Inside/Pop/bulkChangePop.do";
        var name = "bulkChangePop";
        var option = "width = 460, height = 410, top = 100, left = 200, location = no, _blank"
        var popup = window.open(url, name, option);
    },

    addAssetPopup : function() {
        var url = "/Inside/Pop/addAssetPop.do";
        var name = "addAssetPop";
        var option = "width = 1000, height = 700, top = 100, left = 200, location = no, _blank"
        var popup = window.open(url, name, option);
    }
}
