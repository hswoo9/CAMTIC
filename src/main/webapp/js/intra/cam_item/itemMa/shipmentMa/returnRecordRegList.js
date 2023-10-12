var rrl = {

    global : {
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : "",
        now : new Date()
    },

    fn_defaultScript : function (){
        rrl.global.dropDownDataSource = customKendo.fn_customAjax("/item/smCodeList", {grpSn : "WC", lgCd : "WH"});
        customKendo.fn_dropDownList("whCd", rrl.global.dropDownDataSource, "ITEM_CD_NM", "ITEM_CD");
        $("#whCd").data("kendoDropDownList").bind("change", rrl.gridReload);

        customKendo.fn_datePicker("startDt", '', "yyyy-MM-dd", new Date(rrl.global.now.setMonth(rrl.global.now.getMonth() - 1)));
        customKendo.fn_datePicker("endDt", '', "yyyy-MM-dd", new Date());

        rrl.global.dropDownDataSource = [
            { text : "품번", value : "ITEM_NO" },
            { text : "품명", value : "ITEM_NAME" }
        ]
        customKendo.fn_dropDownList("searchKeyword", rrl.global.dropDownDataSource, "text", "value");
        $("#searchKeyword").data("kendoDropDownList").bind("change", rrl.gridReload);

        customKendo.fn_textBox(["searchValue"]);

        rrl.gridReload();
    },

    mainGrid: function(url, params){
        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            height : 508,
            sortable: true,
            selectable: "row",
            pageable: {
                refresh: true,
                pageSizes: [ 10, 20, 30, 50, 100 ],
                buttonCount: 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            toolbar: [
                {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="rrl.fn_popReturnRecordReg()">' +
                            '	<span class="k-button-text">반품등록</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="rrl.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }, {
                    name : 'excel',
                    text: '엑셀다운로드'
                }
            ],
            excel : {
                fileName : "구매검수 목록.xlsx",
                filterable : true
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" style="top: 3px; position: relative" />',
                    template : function(e){
                        if(e.INSPECTION == "Y"){
                            return "";
                        }else {
                            return "<input type='checkbox' id='whSn#=ITEM_WH_SN#' name='whSn' value='#=ITEM_WH_SN#' style=\"top: 3px; position: relative\" />"
                        }
                    },
                    width: 30,
                }, {
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
                    title: "납품량",
                    field: "DELIVERY_VOLUME",
                    width: 100,
                    template : function (e){
                        if(e.DELIVERY_VOLUME != null && e.DELIVERY_VOLUME != ""){
                            return rrl.comma(e.DELIVERY_VOLUME) + "";
                        }else{
                            return "0";
                        }
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
                            return rrl.comma(e.UNIT_PRICE) + "원";
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
                            return rrl.comma(e.AMT) + "원";
                        }else{
                            return "0원";
                        }
                    },
                    attributes : {
                        style : "text-align : right;"
                    }
                }, {
                    title: "창고",
                    field: "WH_CD_NM",
                    width: 150,
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
        rrl.global.searchAjaxData = {
            crmSn : $("#crmSn").val(),
            whCd : $("#whCd").val(),
            startDt : $("#startDt").val(),
            endDt : $("#endDt").val(),
            searchKeyword : $("#searchKeyword").val(),
            searchValue : $("#searchValue").val(),
        }

        rrl.mainGrid("/item/getReturnRecordRegList.do", rrl.global.searchAjaxData);
    },

    crmSnReset : function(){
        $("#crmSn").val("");
        $("#crmNm").val("");
        rrl.gridReload()
    },

    fn_popReturnRecordReg : function (){
        var url = "/item/pop/popReturnRecordReg.do";
        var name = "_blank";
        var option = "width = 1680, height = 400, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
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