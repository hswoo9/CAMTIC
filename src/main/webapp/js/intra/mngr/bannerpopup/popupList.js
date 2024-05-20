var popupList = {
    init: function(){
        customKendo.fn_textBox(["searchInput"]);
        popupList.mainGrid();
    },

    mainGrid: function(){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: "/mngr/bannerpopup/getPopupList",
                    dataType: "json",
                    type: "post"
                },
                parameterMap: function(data){
                    data.searchInput = $("#searchInput").val();
                    return data;
                }
            },
            schema: {
                data: function(data){
                    return data.list;
                },
                total: function(data){
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
            height: 525,
            pageable: {
                refresh: true,
                pageSizes: [10, 20, "ALL"],
                buttonCount: 5
            },
            toolbar: [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="popupList.popupWritePop()">' +
                            '	<span class="k-button-text">등록</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound: popupList.onDataBound,
            columns: [
                {
                    title: "번호",
                    width: 50,
                    template: "#= --record #"
                },
                { field: "popupPeriod", title: "팝업설정 기간", width: "120px" },
                { field: "BANNER_POPUP_TITLE", title: "제목", width: "150px" },
                { field: "BANNER_POPUP_TOP", title: "위치(Top)", width: "100px" },
                { field: "BANNER_POPUP_LEFT", title: "위치(Left)", width: "100px" },
                { title: "팝업크기", template: "#= BANNER_POPUP_WIDTH # x #= BANNER_POPUP_HEIGHT #", width: "100px" },
                { field: "BANNER_POPUP_GUBUN", title: "출력방식", width: "100px", template: "#= BANNER_POPUP_GUBUN == '0' ? '고정' : '팝업' #" },
                { field: "USE_AT", title: "상태", width: "100px", template: "#= USE_AT == '0' ? '출력중' : '출력중X' #" },
                {
                    title: "관리",
                    width: "100px",
                    template : function (e) {
                        return "<button type='button' class='k-button k-button-solid-error' onclick='popupList.fn_del(\"" + e.BANNER_POPUP_UUID + "\")'>삭제</button>";
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            },
            editable: "inline"
        }).data("kendoGrid");
    },

    onDataBound: function(){
        var grid = this;
        grid.element.off('dblclick');
        grid.tbody.find("tr").dblclick(function(){
            var dataItem = grid.dataItem($(this).closest("tr"));
            popupList.popupUpdatePop(dataItem.BANNER_POPUP_UUID);
        });
    },

    popupWritePop: function(e){
        let url = "/mngr/bannerpopup/register.do?mode=write";
        let name = "popupWritePop";
        let option = "width=1200, height=800, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        window.open(url, name, option);
    },

    popupUpdatePop: function(e){
        let url = "/mngr/bannerpopup/register.do?uuid="+e+"&mode=update";
        let name = "popupUpdatePop";
        let option = "width=1200, height=800, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        window.open(url, name, option);
    },

    fn_del: function(e){
        var data = {
            uuid : e
        };

        if(!confirm("팝업을 삭제하시겠습니까?\n삭제 후 복구할 수 없습니다.")){return false;}

        var ds = customKendo.fn_customAjax("/dept/getDeptAList", data);
        if(ds.flag){
            gridReload();
        }
    }
}

function gridReload(){
    popupList.mainGrid();
}