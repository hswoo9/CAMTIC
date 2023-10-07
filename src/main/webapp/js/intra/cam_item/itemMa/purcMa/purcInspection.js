var purcIns = {

    global : {
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : "",
    },

    fn_defaultScript : function (){
        purcIns.global.dropDownDataSource = customKendo.fn_customAjax("/item/smCodeList", {grpSn : "WT", lgCd : "WT"});
        customKendo.fn_dropDownList("whType", purcIns.global.dropDownDataSource, "ITEM_CD_NM", "ITEM_CD");
        $("#whType").data("kendoDropDownList").bind("change", purcIns.gridReload);

        purcIns.global.dropDownDataSource = customKendo.fn_customAjax("/item/smCodeList", {grpSn : "WC", lgCd : "WH"});
        customKendo.fn_dropDownList("whCd", purcIns.global.dropDownDataSource, "ITEM_CD_NM", "ITEM_CD");
        $("#whCd").data("kendoDropDownList").bind("change", purcIns.gridReload);

        purcIns.global.dropDownDataSource = [
            { text : "품번", value : "ITEM_NO" },
            { text : "품명", value : "ITEM_NAME" }
        ]
        customKendo.fn_dropDownList("searchKeyword", purcIns.global.dropDownDataSource, "text", "value");
        $("#searchKeyword").data("kendoDropDownList").bind("change", purcIns.gridReload);

        customKendo.fn_textBox(["searchValue"]);

        purcIns.gridReload();
    },

    mainGrid: function(url, params){
        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="purcIns.setInspectionUpd(\'Y\')">' +
                            '	<span class="k-button-text">검수완료</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="purcIns.gridReload()">' +
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
                    template : "<input type='checkbox' id='whSn#=ITEM_WH_SN#' name='whSn' value='#=ITEM_WH_SN#' style=\"top: 3px; position: relative\" />",
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
                            return purcIns.comma(e.WH_VOLUME) + "";
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
                            return purcIns.comma(e.UNIT_PRICE) + "원";
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
                            return purcIns.comma(e.AMT) + "원";
                        }else{
                            return "0원";
                        }
                    },
                    attributes : {
                        style : "text-align : right;"
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
        purcIns.global.searchAjaxData = {
            whType : $("#whType").val(),
            whCd : $("#whCd").val(),
            searchKeyword : $("#searchKeyword").val(),
            searchValue : $("#searchValue").val(),
            inspection : "N"
        }

        purcIns.mainGrid("/item/getItemWhInfoList.do", purcIns.global.searchAjaxData);
    },

    setInspectionUpd : function(e){
        if($("input[name='whSn']:checked").length == 0){
            alert("품목을 선택해주세요.");
            return
        }

        if(confirm("검수처리 하시겠습니까?")){
            var whSn = "";

            $.each($("input[name='whSn']:checked"), function(){
                whSn += "," + $(this).val()
            })

            purcIns.global.saveAjaxData = {
                inspection : e,
                whSn : whSn.substring(1),
                empSeq : $("#regEmpSeq").val(),
            }

            var result = customKendo.fn_customAjax("/item/setInspectionUpd.do", purcIns.global.saveAjaxData);
            if(result.flag){
                alert("처리되었습니다.");
                purcIns.gridReload();
            }
        }
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