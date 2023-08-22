var rprReceiptList = {
    init(){
        rprReceiptList.dataSet();
        rprReceiptList.mainGrid();
    },

    dataSet(){
        customKendo.fn_textBox(["searchText"]);
        let rprClassSource = [
            { text: "직무발명 신고서", value: "1" },
            { text: "포상급지급 신청서", value: "3" }
        ]
        customKendo.fn_dropDownList("rprClass", rprClassSource, "text", "value", 2);
        let iprClassSource = [
            { text: "특허", value: "1" },
            { text: "실용신안", value: "2" },
            { text: "상표권", value: "3" },
            { text: "논문", value: "4" },
            { text: "도서", value: "5" },
            { text: "디자인권", value: "6" },
            { text: "저작권", value: "7" }
        ]
        customKendo.fn_dropDownList("iprClass", iprClassSource, "text", "value", 2);
        let searchTypeSource = [
            { text: "명칭", value: "" },
            { text: "신청자", value: "1" },
            { text: "발명자", value: "2" }
        ]
        customKendo.fn_dropDownList("searchType", searchTypeSource, "text", "value", 3);
        $("#rprClass, #iprClass").data("kendoDropDownList").bind("change", gridReload);
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
                pageSizes: [10, 20, "ALL"],
                buttonCount : 5
            },
            toolbar : [
                {
                    name: 'button',
                    template: function (e) {
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    field: "ROW_NUM",
                    title: "순번"
                }, {
                    field: "RPR_NAME",
                    title: "구분"
                }, {
                    field: "IPR_NAME",
                    title: "종류"
                }, {
                    field: "TITLE",
                    title: "지식재산 명칭"
                }, {
                    field: "REG_EMP_NAME",
                    title: "신고자"
                }, {
                    field: "SHARE_NAME",
                    title: "발명자"
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
                    }
                }, {
                    field: "작성",
                    template: function(row){
                        if(row.RPR_CLASS == "1" && row.STATUS == 100) {
                            return "<button type='button' class='k-button k-button-md k-button-solid k-button-solid-base' onclick='rprReceiptList.rprReceiptReqPop("+row.INVENTION_INFO_SN+");'>지식재산권 등록</button>";
                        }else{
                            return "-";
                        }
                    }
                }
            ]
        }).data("kendoGrid");
    },

    rprReceiptReqPop(inventionInfoSn) {
        let url = "/Inside/pop/rprReceiptReqPop.do";
        if(!isNaN(inventionInfoSn)) {
            url = "/Inside/pop/rprReceiptReqPop.do?inventionInfoSn="+inventionInfoSn;
        }
        const name = "rprReceiptReqPop";
        const option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        window.open(url, name, option);
    }
}