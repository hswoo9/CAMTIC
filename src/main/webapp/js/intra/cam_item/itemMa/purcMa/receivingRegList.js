var recL = {

    global : {
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : "",
        now : new Date()
    },

    fn_defaultScript : function (){
        recL.global.dropDownDataSource = customKendo.fn_customAjax("/item/smCodeList", {grpSn : "WT", lgCd : "WT"});
        customKendo.fn_dropDownList("whType", recL.global.dropDownDataSource, "ITEM_CD_NM", "ITEM_CD");
        $("#whType").data("kendoDropDownList").bind("change", recL.gridReload);

        customKendo.fn_datePicker("startDt", '', "yyyy-MM-dd", new Date(recL.global.now.setMonth(recL.global.now.getMonth() - 1)));
        customKendo.fn_datePicker("endDt", '', "yyyy-MM-dd", new Date());

        recL.global.dropDownDataSource = customKendo.fn_customAjax("/item/smCodeList", {grpSn : "WC", lgCd : "WH"});
        customKendo.fn_dropDownList("whCd", recL.global.dropDownDataSource, "ITEM_CD_NM", "ITEM_CD");
        $("#whCd").data("kendoDropDownList").bind("change", recL.gridReload);

        recL.global.dropDownDataSource = [
            { text : "품번", value : "ITEM_NO" },
            { text : "품명", value : "ITEM_NAME" }
        ]
        customKendo.fn_dropDownList("searchKeyword", recL.global.dropDownDataSource, "text", "value");
        $("#searchKeyword").data("kendoDropDownList").bind("change", recL.gridReload);

        customKendo.fn_textBox(["searchValue"]);

        recL.gridReload();
    },

    mainGrid: function(url, params){
        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            height: 508,
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="recL.fn_popReceivingReg()">' +
                            '	<span class="k-button-text">입고등록</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="recL.gridReload()">' +
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
                    title: "거래처",
                    field: "CRM_NM",
                    width: 100,
                }, {
                    title: "품번",
                    field: "ITEM_NO",
                    width: 120,
                }, {
                    title: "품명",
                    field: "ITEM_NAME",
                    width: 100
                }, {
                    title: "입고일자",
                    field: "WH_DT",
                    width: 80
                }, {
                    title: "입고형태",
                    field: "WH_TYPE_NM",
                    width: 100
                }, {
                    title: "입고량",
                    field: "WH_VOLUME",
                    width: 100,
                    template : function (e){
                        if(e.WH_VOLUME != null && e.WH_VOLUME != ""){
                            return recL.comma(e.WH_VOLUME) + "";
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
                            return recL.comma(e.UNIT_PRICE) + "원";
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
                            return recL.comma(e.AMT) + "원";
                        }else{
                            return "0원";
                        }
                    },
                    attributes : {
                        style : "text-align : right;"
                    }
                }, {
                    title: "상태",
                    field: "INSPECTION",
                    width: 50,
                    template : function(e){
                        if(e.INSPECTION == "Y"){
                            return "입고"
                        }else {
                            return "검수중"
                        }
                    }
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
        recL.global.searchAjaxData = {
            whType : $("#whType").val(),
            startDt : $("#startDt").val(),
            endDt : $("#endDt").val(),
            whCd : $("#whCd").val(),
            searchKeyword : $("#searchKeyword").val(),
            searchValue : $("#searchValue").val(),
            regEmpSeq : $("#regEmpSeq").val()
        }

        recL.mainGrid("/item/getItemWhInfoList.do", recL.global.searchAjaxData);
    },

    fn_popReceivingReg : function (){
        var url = "/item/pop/receivingReg.do";
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