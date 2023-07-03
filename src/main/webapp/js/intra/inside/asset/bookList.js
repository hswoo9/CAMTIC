var now = new Date();

var bookList = {

    init : function(){
        bookList.dataSet();
        bookList.mainGrid();
    },

    dataSet() {
        $("#searchType").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "분류별", value: "1" },
                { text: "도서명", value: "2" },
                { text: "저자", value: "3" },
                { text: "요청자", value: "4" },
                { text: "비치장소", value: "5" }
            ],
            index: 0
        });

        $("#searchVal").kendoTextBox();
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="bookList.bookManagePopUp();">' +
                            '	<span class="k-button-text">분류관리</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="bookList.bookRegisPopup();">' +
                            '	<span class="k-button-text">도서등록</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="">' +
                            '	<span class="k-button-text">수정</span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    field: "",
                    title: "순번"
                }, {
                    field: "",
                    title: "코드"
                }, {
                    field: "",
                    title: "도서명"
                }, {
                    field: "",
                    title: "저자"
                }, {
                    field: "",
                    title: "구매요청자"
                }, {
                    field: "",
                    title: "구매일자"
                }, {
                    field: "",
                    title: "비치장소"
                }
            ]
        }).data("kendoGrid");
    },

    bookManagePopUp : function() {
        var url = "/Inside/Pop/bookManagePop.do";
        var name = "bookManagePop";
        var option = "width = 500, height = 320, top = 100, left = 200, location = no, _blank"
        var popup = window.open(url, name, option);
    },

    bookRegisPopup : function() {
        var url = "/Inside/Pop/bookRegisPop.do";
        var name = "bookRegisPop";
        var option = "width = 1000, height = 500, top = 100, left = 200, location = no, _blank"
        var popup = window.open(url, name, option);
    }
}
