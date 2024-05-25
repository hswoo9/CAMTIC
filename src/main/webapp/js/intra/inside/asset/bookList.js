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
                // { text: "분류별", value: "1" },
                { text: "도서명", value: "2" },
                { text: "저자", value: "3" },
                { text: "요청자", value: "4" },
                { text: "비치장소", value: "5" }
            ],
            index: 0
        });

        $("#searchVal").kendoTextBox();
        $("#searchText").kendoTextBox();

        $("#searchText").on("keyup", function(key){
            if(key.keyCode == 13){
                bookList.mainGrid();
            }
        })
    },

    mainGrid : function() {
        var dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/inside/getBookList',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
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
            selectable: "row",
            height: 508,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount : 5
            },
            dataBound : function(){
                var grid = this;
                grid.tbody.find("tr").dblclick(function (e) {
                    var dataItem = grid.dataItem($(this));
                    bookList.bookRegisPopup(dataItem.BK_SN);
                });
            },
            toolbar : [
                /*{
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="bookList.bookManagePopUp();">' +
                            '	<span class="k-button-text">분류관리</span>' +
                            '</button>';
                    }
                },*/
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="bookList.bookRegisPopup();">' +
                            '	<span class="k-button-text">도서등록</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="bookList.bookCodePopup();">' +
                            '	<span class="k-button-text">분류코드</span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                /*{
                    title: "이미지",
                    width: 200,
                    template: function(e){
                        console.log(e)
                        if(e.file_path != null && e.file_path != ""){
                            return  "<div class='customer-photo' style='background-size: cover; height : 200px;background-image: url("+e.file_path + e.file_uuid +");'></div>";
                        } else {
                            return "<div class='customer-photo' style='background-size: cover; height : 200px;background-image: url(/upload/Inside/undefined.png);'></div>";
                        }
                    }
                }, */
                {
                    title: "코드",
                    template : function(row){
                        return row.BK_LG_CD_NAME+"-"+row.BK_MD_CD + row.BK_CD
                    },
                    width: 150
                }, {
                    field: "BK_NAME",
                    title: "도서명",
                }, {
                    field: "BK_WRITER",
                    title: "저자",
                    width: 200
                }, {
                    field: "BK_BUYER_NAME",
                    title: "구매요청자",
                    width: 150
                }, {
                    field: "BK_BUY_DT",
                    title: "구매일자",
                    width: 150
                }, {
                    field: "BK_REPL",
                    title: "비치장소",
                    width: 200
                }
            ]
        }).data("kendoGrid");
    },

    bookManagePopUp : function() {
        var url = "/Inside/Pop/bookManagePop.do";
        var name = "bookManagePop";
        var option = "width = 680, height = 320, top = 100, left = 200, location = no, _blank"
        var popup = window.open(url, name, option);
    },

    bookRegisPopup : function(key) {
        var url = "/Inside/Pop/bookRegisPop.do";
        if(key != null && key != ""){
            url = "/Inside/Pop/bookRegisPop.do?bkSn="+key;
        }
        var name = "bookRegisPop";
        var option = "width = 1000, height = 720, top = 100, left = 200, location = no, _blank"
        var popup = window.open(url, name, option);
    },

    bookCodePopup: function() {
        var url = "/inside/Pop/bookCodePop.do";
        var name = "bookCodePop";
        var option = "width = 985, height = 400, top = 100, left = 200, location = no, _blank"
        var popup = window.open(url, name, option);
    }

}
