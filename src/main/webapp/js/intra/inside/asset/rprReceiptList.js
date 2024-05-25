var rprReceiptList = {

    global : {
        searchAjaxData : "",
    },

    init(){
        rprReceiptList.dataSet();
        rprReceiptList.mainGrid();
    },

    dataSet(){
        customKendo.fn_textBox(["searchText"]);
        let rprClassSource = [
            { text: "직무발명 신고서", value: "직무발명 신고서" },
            { text: "포상금지급 신청서", value: "포상금지급 신청서" }
        ]
        customKendo.fn_dropDownList("rprClass", rprClassSource, "text", "value", 2);
        let iprClassSource = [
            { text: "특허", value: "특허" },
            { text: "실용신안", value: "실용신안" },
            { text: "상표권", value: "상표권" },
            { text: "논문", value: "논문" },
            { text: "도서", value: "도서" },
            { text: "디자인권", value: "디자인권" },
            { text: "저작권", value: "저작권" }
        ]
        customKendo.fn_dropDownList("iprClass", iprClassSource, "text", "value", 2);
        let searchTypeSource = [
            { text: "명칭", value: "" },
            { text: "신청자", value: "1" },
            { text: "발명자", value: "2" }
        ]
        customKendo.fn_dropDownList("searchType", searchTypeSource, "text", "value", 3);
        // $("#rprClass, #iprClass").data("kendoDropDownList").bind("change", gridReload);
    },

    mainGrid(){
        const dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : "inside/getRprReceiptList",
                    dataType : "json",
                    type : "post",
                    async : false
                },
                parameterMap: function(data){
                    data.rprClass = $("#rprClass").val();
                    data.iprClass = $("#iprClass").val();
                    data.searchType = $("#searchType").val();
                    data.searchText = $("#searchText").val();
                    data.mod = "receipt";
                    return data;
                }
            },
            schema : {
                data: function(data){
                    return data.list;
                },
                total: function(data){
                    return data.list.length;
                },
            },
            pageSize: 10
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
            toolbar : [
                {
                    name: 'button',
                    template: function (e) {
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="rprReceiptList.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound : rprReceiptList.onDataBound,
            columns: [
                {
                    field: "ROW_NUM",
                    title: "순번",
                    width: 3
                }, {
                    field: "RPR_NAME",
                    title: "구분",
                    width: 10
                }, {
                    field: "IPR_NAME",
                    title: "종류",
                    width: 5
                }, {
                    field: "TITLE",
                    title: "지식재산 명칭",
                    width: 50
                }, {
                    field: "REG_EMP_NAME",
                    title: "신청자",
                    width: 5
                }, {
                    field: "SHARE_NAME",
                    title: "발명자",
                    width: 13
                }, {
                    title: "상태",
                    template: function(row){
                        if(row.STATUS == 0){
                            return "미결재";
                        }else if(row.STATUS == 10){
                            return "상신";
                        }else if(row.STATUS == 30){
                            return "반려";
                        }else if(row.STATUS == 40){
                            return "회수";
                        }else if(row.STATUS == 100){
                            return "결재완료";
                        }else{
                            return "-";
                        }
                    },
                    width: 5
                }, {
                    field: "등록",
                    width: 9,
                    template: function(row){
                        if(row.RPR_CLASS == "1" && row.STATUS == 100 && row.STAT == null) {
                            return "<button type='button' class='k-button k-button-md k-button-solid k-button-solid-base' onclick='rprReceiptList.rprReceiptReqPop("+row.INVENTION_INFO_SN+");'>지식재산권 등록</button>";
                        }else if(row.RPR_CLASS == "1" && row.STATUS == 100 && row.STAT != null){
                            return "지식재산권 등록완료";
                        }else{
                            return "-";
                        }
                    }
                }
            ]
        }).data("kendoGrid");

        //접수내역 리스트 더블 클릭시 수정 팝업창
        $("#mainGrid").on("dblclick", "tr.k-state-selected", function (e) {
            var selectedItem = $("#mainGrid").data("kendoGrid").dataItem(this);
            console.log(selectedItem);
            console.log(selectedItem.INVENTION_INFO_SN);
            console.log(selectedItem.RPR_CLASS);
            rprReceiptList.inventionReqPop(selectedItem.INVENTION_INFO_SN, selectedItem.RPR_CLASS);
        });
    },

    rprReceiptReqPop(inventionInfoSn) {
        let url = "/Inside/pop/rprReceiptReqPop.do";
        if(!isNaN(inventionInfoSn)) {
            url = "/Inside/pop/rprReceiptReqPop.do?inventionInfoSn="+inventionInfoSn;
        }
        const name = "rprReceiptReqPop";
        const option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        window.open(url, name, option);
    },

    inventionReqPop(inventionInfoSn, rprClass){
        if(rprClass == "1"){
            let url = "/Inside/pop/inventionPop.do";
            if(!isNaN(inventionInfoSn)) {
                url = "/Inside/pop/inventionPop.do?inventionInfoSn=" + inventionInfoSn;
            }
            const name = "inventionPop";
            const option = "width=965, height=600, scrollbars=no, top=100, left=200, resizable=yes, scrollbars = yes, status=no, top=50, left=50"
            window.open(url, name, option);
            console.log(rprClass);
        }if(rprClass == "3"){
            let url = "/Inside/pop/rprPop.do";
            if(!isNaN(inventionInfoSn)) {
                url = "/Inside/pop/rprPop.do?inventionInfoSn=" + inventionInfoSn;
            }
            const name = "rprPop";
            const option = "width=965, height=600, scrollbars=no, top=100, left=200, resizable=yes, scrollbars = yes, status=no, top=50, left=50"
            window.open(url, name, option);
        }
    },

    gridReload:function (){
        console.log('접수내역 gridReload함수 실행됨');

        rprReceiptList.global.searchAjaxData = {
            rprClass : $('#rprClass').val(),
            iprClass : $('#iprClass').val(),
            searchType : $('#searchType').val(),
            searchText : $('#searchText').val()
        };

        var searchText = rprReceiptList.global.searchAjaxData.searchText;
        var searchType = rprReceiptList.global.searchAjaxData.searchType;
        var rprClass = rprReceiptList.global.searchAjaxData.rprClass;
        var iprClass = rprReceiptList.global.searchAjaxData.iprClass;

        console.log('Search Text: ' + searchText);
        console.log('Search Type: ' + searchType);
        console.log('rpr: ' + rprClass);
        console.log('ipr: ' + iprClass);

        rprReceiptList.mainGrid('inside/getRprReceiptList', rprReceiptList.global.searchAjaxData);
    }

}