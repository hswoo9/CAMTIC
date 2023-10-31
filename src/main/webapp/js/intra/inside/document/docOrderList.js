var docuOrderList = {
    init: function(){
        docuOrderList.dataSet();
        docuOrderList.mainGrid();
    },

    dataSet: function(){
        customKendo.fn_textBox(["searchText"]);
        let classArr = [
            {text: "제작", value: "1"},
            {text: "가공", value: "2"},
            {text: "사업", value: "3"},
            {text: "기타", value: "4"}
        ]
        customKendo.fn_dropDownList("classType", classArr, "text", "value", 1);
        let searchArr = [
            {text: "계약번호", value: "1"},
            {text: "계약제목(건명)", value: "2"},
            {text: "계약업체", value: "3"}
        ]
        customKendo.fn_dropDownList("searchType", searchArr, "text", "value", 1);

        $("#searchText").keydown(function(event) {
            if (event.key === "Enter") {
                gridReload();
            }
        });

        $("#searchType").keyup(function(event) {
            if (event.key === "Enter") {
                gridReload();
            }
        });

        $("#classType").keyup(function(event) {
            if (event.key === "Enter") {
                gridReload();
            }
        });
    },

    mainGrid: function (){
        var dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/inside/getDocuOrderList',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.classType = $("#classType").val();
                    data.searchType = $("#searchType").val();
                    data.searchText = $("#searchText").val();
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
            height: 508,
            pageable : {
                refresh : true,
                pageSizes: [10, 20, "ALL"],
                buttonCount : 5
            },
            toolbar: [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" id="document" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="docuOrderList.docOrderPopup();">' +
                            '	<span class="k-button-text">문서등록</span>' +
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
                    field: "ROW_NUM",
                    title: "연번",
                    width: "5%"
                }, {
                    field: "CLASS_NAME",
                    title: "구분",
                    width: "5%"
                }, {
                    title: "계약 번호",
                    width: "10%",
                    template: function(row) {
                        return row.DOCU_YEAR_SN+"-"+row.DOCU_NO;
                    }
                }, {
                    field: "",
                    title: "상품화 코드",
                    width: "10%"
                }, {
                    field: "DOCU_DE",
                    title: "계약 일시",
                    width: "10%"
                }, {
                    field: "PROJECT_NAME",
                    title: "계약명",
                    width: "15%"
                }, {
                    field: "PROJECT_MONEY",
                    title: "계약 금액",
                    width: "10%"
                }, {
                    title: "계약 기간",
                    width: "15%",
                    template: function(row) {
                        return row.START_DE+" ~ "+row.END_DE;
                    }
                }, {
                    field: "CO_NAME",
                    title: "계약 업체",
                    width: "10%"
                }, {
                    field: "DOCU_CHECK_NAME",
                    title: "계약서",
                    width: "5%"
                }, {
                    field: "",
                    title: "납품서",
                    width: "5%"
                }]
        }).data("kendoGrid");
    },

    docOrderPopup: function(){
        var url = "/Inside/pop/docOrderPop.do";
        var name = "popup test";
        var option = "width = 1100, height = 680, top = 100, left = 200, location = no"
        var popup = window.open(url, name, option);
    }
}
