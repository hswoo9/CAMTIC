var purcIns = {

    global : {
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : "",
        now : new Date()
    },

    fn_defaultScript : function (){
        purcIns.global.dropDownDataSource = customKendo.fn_customAjax("/item/smCodeList", {grpSn : "WT", lgCd : "WT"});
        customKendo.fn_dropDownList("whType", purcIns.global.dropDownDataSource, "ITEM_CD_NM", "ITEM_CD");
        $("#whType").data("kendoDropDownList").bind("change", purcIns.gridReload);

        customKendo.fn_datePicker("startDt", '', "yyyy-MM-dd", new Date(purcIns.global.now.setMonth(purcIns.global.now.getMonth() - 1)));
        customKendo.fn_datePicker("endDt", '', "yyyy-MM-dd", new Date());

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

    mainGrid: function(){
        var dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/item/getItemWhInfoList.do',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.crmSn = $("#crmSn").val();
                    data.whType = $("#whType").val();
                    data.startDt = $("#startDt").val();
                    data.endDt = $("#endDt").val();
                    data.whCd = $("#whCd").val();
                    data.searchKeyword = $("#searchKeyword").val();
                    data.searchValue = $("#searchValue").val();
                    data.inspection = "N";

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
                    width: 200,
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
                },{
                    title: "입고창고",
                    field: "WH_CD_NM",
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
                },{
                    title: "비고",
                    field: "RMK",
                    width : 250
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

        purcIns.mainGrid();
    },

    fn_popCamCrmList : function (){
        var url = "/crm/pop/popCrmList.do";
        var name = "_blank";
        var option = "width = 1300, height = 670, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    crmSnReset : function(){
        $("#crmSn").val("");
        $("#crmNm").val("");
        purcIns.gridReload()
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