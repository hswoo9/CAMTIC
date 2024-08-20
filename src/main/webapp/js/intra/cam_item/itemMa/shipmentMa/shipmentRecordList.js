var srl = {

    global : {
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : "",
        now : new Date()
    },

    fn_defaultScript : function (){
        srl.global.dropDownDataSource = customKendo.fn_customAjax("/item/smCodeList", {grpSn : "WC", lgCd : "WH"});

        customKendo.fn_datePicker("startDt", '', "yyyy-MM-dd");
        customKendo.fn_datePicker("endDt", '', "yyyy-MM-dd");

        srl.global.dropDownDataSource = [
            { text : "품번", value : "ITEM_NO" },
            { text : "품명", value : "ITEM_NAME" }
        ]
        customKendo.fn_dropDownList("searchKeyword", srl.global.dropDownDataSource, "text", "value");
        $("#searchKeyword").data("kendoDropDownList").bind("change", srl.gridReload);

        customKendo.fn_textBox(["searchValue"]);

        srl.gridReload();
    },

    mainGrid: function(url, params){
        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            height : 508,
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="srl.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }, {
                    name : 'excel',
                    text: '엑셀다운로드'
                }
            ],
            excel : {
                fileName : "출하실적현황 목록.xlsx",
                filterable : true
            },
            columns: [
                {
                    title: "순번",
                    template: "#= --record #",
                    width: 50
                }, {
                    title: "납품처",
                    field: "CRM_NM",
                    width: 150,
                }, {
                    title: "납품일",
                    field: "DELIVERY_DT",
                    width: 80,
                }, {
                    title: "품번",
                    field: "ITEM_NO",
                    width: 120
                }, {
                    title: "품명",
                    field: "ITEM_NAME",
                    width: 120
                }, {
                    title: "재고",
                    field: "OVERALL_INVEN",
                    width: 100,
                    template : function (e){
                        if(e.OVERALL_INVEN != null && e.OVERALL_INVEN != ""){
                            return srl.comma(e.OVERALL_INVEN);
                        }else{
                            return "0";
                        }
                    },
                    attributes : {
                        style : "text-align : right;"
                    }
                }, {
                    title: "납품량",
                    field: "DELIVERY_AMT",
                    width: 100,
                    template : function (e){
                        var str = "";
                        if(e.DELIVERY_AMT != null && e.DELIVERY_AMT != ""){
                            str = srl.comma(e.DELIVERY_AMT);
                        }else{
                            str = "0";
                        }

                        return str;
                    },
                    attributes : {
                        style : "text-align : right;"
                    }
                }, {
                    title: "단가",
                    width: 100,
                    field: "UNIT_PRICE",
                    template : function (e){
                        if(e.UNIT_PRICE != null && e.UNIT_PRICE != ""){
                            return srl.comma(e.UNIT_PRICE) + "원";
                        }else{
                            return "0원";
                        }
                    },
                    attributes : {
                        style : "text-align : right;"
                    }
                }, {
                    title: "금액",
                    width: 100,
                    field: "AMT",
                    template: function(e){
                        if(e.AMT != null && e.AMT != ""){
                            return srl.comma(e.AMT) + "원";
                        }else{
                            return "0원";
                        }
                    },
                    attributes : {
                        style : "text-align : right;"
                    }
                }, {
                    title: "납품현황",
                    field: "UNPAID_TYPE",
                    width: 80,
                    template : function (e){
                        if(e.UNPAID_TYPE == "N"){
                            return "완납"
                        }else if(e.UNPAID_TYPE == "P"){
                            return "일부미납"
                        }else if(e.UNPAID_TYPE == "C"){
                            return "전체미납"
                        }else if(e.UNPAID_TYPE == "Y"){
                            return "진행중"
                        }
                    },
                }, {
                    title: "비고",
                    field: "RMK",
                    width: 200,
                }, {
                    title: "등록자",
                    field: "EMP_NAME_KR",
                    width: 80,
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
        srl.global.searchAjaxData = {
            crmSn : $("#crmSn").val(),
            startDt : $("#startDt").val(),
            endDt : $("#endDt").val(),
            deadline : "Y",
            searchKeyword : $("#searchKeyword").val(),
            searchValue : $("#searchValue").val(),
        }

        srl.mainGrid("/item/getShipmentRecordList.do", srl.global.searchAjaxData);
    },

    crmSnReset : function(){
        $("#crmSn").val("");
        $("#crmNm").val("");
        srl.gridReload()
    },

    fn_popCamCrmList : function (){
        var url = "/crm/pop/popCrmList.do";
        var name = "_blank";
        var option = "width = 1300, height = 670, top = 200, left = 400, location = no"
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