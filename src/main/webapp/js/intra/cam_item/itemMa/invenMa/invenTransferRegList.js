var invenTrl = {

    global : {
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : "",
        now : new Date(),
    },

    fn_defaultScript : function (){
        customKendo.fn_datePicker("startDt", '', "yyyy-MM-dd", new Date(invenTrl.global.now.setMonth(invenTrl.global.now.getMonth() - 1)));
        customKendo.fn_datePicker("endDt", '', "yyyy-MM-dd", new Date());

        invenTrl.global.dropDownDataSource = customKendo.fn_customAjax("/item/smCodeList", {grpSn : "TF", lgCd : "TFT"});
        customKendo.fn_dropDownList("transferType", invenTrl.global.dropDownDataSource, "ITEM_CD_NM", "ITEM_CD");
        $("#transferType").data("kendoDropDownList").bind("change", invenTrl.gridReload);

        invenTrl.global.dropDownDataSource = customKendo.fn_customAjax("/item/smCodeList", {grpSn : "WC", lgCd : "WH"});
        customKendo.fn_dropDownList("forwardingWhCd", invenTrl.global.dropDownDataSource, "ITEM_CD_NM", "ITEM_CD");
        $("#forwardingWhCd").data("kendoDropDownList").bind("change", invenTrl.gridReload);

        invenTrl.global.dropDownDataSource.shift();
        customKendo.fn_dropDownList("receivingWhCd", invenTrl.global.dropDownDataSource, "ITEM_CD_NM", "ITEM_CD");
        $("#receivingWhCd").data("kendoDropDownList").bind("change", invenTrl.gridReload);

        invenTrl.global.dropDownDataSource = [
            { text : "품번", value : "ITEM_NO" },
            { text : "품명", value : "ITEM_NAME" }
        ]
        customKendo.fn_dropDownList("searchKeyword", invenTrl.global.dropDownDataSource, "text", "value");
        $("#searchKeyword").data("kendoDropDownList").bind("change", invenTrl.gridReload);

        customKendo.fn_textBox(["searchValue"]);

        invenTrl.gridReload();
    },

    mainGrid: function(){
        const dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/item/getInvenTransferHistoryList.do',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.startDt = $("#startDt").val();
                    data.endDt = $("#endDt").val();
                    data.transferType = $("#transferType").val();
                    data.forwardingWhCd = $("#forwardingWhCd").val();
                    data.receivingWhCd = $("#receivingWhCd").val();
                    data.searchKeyword = $("#searchKeyword").val();
                    data.searchValue = $("#searchValue").val();
                    // data.regEmpSeq = $("#regEmpSeq").val();

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
            page: 1,
            pageSizes: "ALL",
        });

        $("#mainGrid").kendoGrid({
            dataSource: dataSource,
            height: 508,
            sortable: true,
            selectable: "row",
            pageable: {
                refresh: true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount: 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            toolbar: [
                {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="invenTrl.fn_popInvenTransferReg()">' +
                            '	<span class="k-button-text">재고이동등록</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="invenTrl.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }, {
                    name : 'excel',
                    text: '엑셀다운로드'
                }
            ],
            excel : {
                fileName : "재고이동현황.xlsx",
                filterable : true
            },
            columns: [
                {
                    title: "순번",
                    template: "#= --record #",
                    width: 50
                }, {
                    title: "이동일자",
                    field: "FORWARDING_DATE",
                    width: 120,
                }, {
                    title: "이동구분",
                    field: "TRANSFER_TYPE_NM",
                    width: 120,
                }, {
                    title: "출고담당자",
                    field: "EMP_NAME_KR",
                    width: 100
                }, {
                    title: "품번",
                    field: "ITEM_NO",
                }, {
                    title: "품명",
                    field: "ITEM_NAME",
                }, {
                    title: "현재재고",
                    field: "CURRENT_INVEN",
                    width: 100,
                    template : function (e){
                        return invenTrl.comma(e.CURRENT_INVEN);
                    },
                    attributes : {
                        style : "text-align : right;"
                    }
                }, {
                    title: "이동수량",
                    field: "TRANSFER_QTY",
                    width: 120,
                    template : function (e){
                        return invenTrl.comma(e.TRANSFER_QTY);
                    },
                    attributes : {
                        style : "text-align : right;"
                    }
                }, {
                    title: "출고처",
                    field: "FORWARDING_WH_CD_NM",
                    width: 150,
                }, {
                    title: "입고처",
                    width: 150,
                    field: "RECEIVING_WH_CD_NM",
                }, {
                    title: "비고",
                    width: 150,
                    field: "RMK",
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 3);
            }
        }).data("kendoGrid");

        $("#checkAll").click(function(){
            if($(this).is(":checked")) $("input[name=whSn]").prop("checked", true);
            else $("input[name=whSn]").prop("checked", false);
        });
    },

    gridReload: function (){
        if($("#mainGrid").data("kendoGrid") != null){
            $("#mainGrid").data("kendoGrid").destroy();
        }

        invenTrl.mainGrid();
    },

    fn_popInvenTransferReg : function (){
        var url = "/item/pop/popInvenTransferReg.do";
        var name = "_blank";
        var option = "width = 1680, height = 400, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    comma: function(str) {
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    },

    uncomma: function(str) {
        str = String(str);
        return str.replace(/[^\d]+/g, '');
    },
}