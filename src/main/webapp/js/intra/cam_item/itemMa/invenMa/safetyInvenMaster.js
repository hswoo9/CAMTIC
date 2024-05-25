var safetyInvenMa = {

    global : {
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : "",
    },

    fn_defaultScript : function (){
        safetyInvenMa.global.dropDownDataSource = customKendo.fn_customAjax("/item/smCodeList", {grpSn : "PT", lgCd : "IT"});
        customKendo.fn_dropDownList("itemType", safetyInvenMa.global.dropDownDataSource, "ITEM_CD_NM", "ITEM_CD");
        $("#itemType").data("kendoDropDownList").bind("change", safetyInvenMa.gridReload);

        safetyInvenMa.global.dropDownDataSource = [
            { text : "품번", value : "ITEM_NO" },
            { text : "품명", value : "ITEM_NAME" },
            { text : "규격", value : "STANDARD" },
            { text : "안전재고", value : "SAFETY_INVEN" },
        ]
        customKendo.fn_dropDownList("searchKeyword", safetyInvenMa.global.dropDownDataSource, "text", "value");
        $("#searchKeyword").data("kendoDropDownList").bind("change", safetyInvenMa.gridReload);

        customKendo.fn_textBox(["searchValue"]);

        safetyInvenMa.gridReload();
    },

    mainGrid: function(url, params){
        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="safetyInvenMa.setSafetyInvenUpd()">' +
                            '	<span class="k-button-text">저장</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="safetyInvenMa.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }, {
                    name : 'excel',
                    text: '엑셀다운로드'
                }
            ],
            excel : {
                fileName : "품목마스터.xlsx",
                filterable : true
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" style="top: 3px; position: relative" />',
                    template : "<input type='checkbox' id='imSn#=MASTER_SN#' name='imSn' value='#=MASTER_SN#' style=\"top: 3px; position: relative\" />",
                    width: 30,
                }, {
                    title: "순번",
                    template: "#= --record #",
                    width: 50,
                }, {
                    title: "품번",
                    field: "ITEM_NO",
                    width: 200,
                }, {
                    title: "품명",
                    field: "ITEM_NAME",
                    width: 200,
                }, {
                    title: "단위",
                    field: "ITEM_UNIT_NM",
                    width: 80,
                }, {
                    title: "규격",
                    field: "STANDARD",
                    width: 200,
                }, {
                    title: "품목구분",
                    field: "ITEM_TYPE_NM",
                    width: 100,
                }, {
                    title: "입고창고",
                    field: "WH_CD_NM",
                    width: 100,
                }, {
                    title: "안전재고",
                    field: "SAFETY_INVEN",
                    width: 100,
                    template : function (e){
                        if(e.SAFETY_INVEN != null && e.SAFETY_INVEN != ""){
                            return "<input type='text' id='safetyInven_" + e.MASTER_SN + "' class='numberInput k-input k-textbox' value='" + safetyInvenMa.comma(e.SAFETY_INVEN) + "' style='text-align: right'>";
                        }else{
                            return "<input type='text' id='safetyInven_" + e.MASTER_SN + "' class='numberInput k-input k-textbox' value='0' style='text-align: right'>";
                        }
                    },
                    attributes : {
                        style : "text-align : right;"
                    }
                }, {
                    title: "금액",
                    field: "AMT",
                    width: 100,
                    template : function (e){
                        if(e.UNIT_PRICE != null && e.UNIT_PRICE != ""){
                            return "<span id='amt" + e.MASTER_SN + "'>" + safetyInvenMa.comma(Number(e.SAFETY_INVEN) * Number(e.UNIT_PRICE)) + "</span>";
                        }else{
                            return "<span id='amt" + e.MASTER_SN + "'>0</span>";
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
            if($(this).is(":checked")) $("input[name=imSn]").prop("checked", true);
            else $("input[name=imSn]").prop("checked", false);
        });

        $(".numberInput").keyup(function(){
            $(this).val(safetyInvenMa.comma(safetyInvenMa.uncomma($(this).val())));
            var dataItem = $("#mainGrid").data("kendoGrid").dataItem($(this).closest("tr"))
            $("#amt" + $(this).attr("id").split("_")[1]).text(safetyInvenMa.comma(Number(safetyInvenMa.uncomma($(this).val())) * Number(dataItem.UNIT_PRICE == null ? "0" : dataItem.UNIT_PRICE)));
        });
    },

    gridReload: function (){
        safetyInvenMa.global.searchAjaxData = {
            masterSn : $("#masterSn").val(),
            itemType : $("#itemType").val(),
            searchKeyword : $("#searchKeyword").val(),
            searchValue : $("#searchValue").val(),
        }

        safetyInvenMa.mainGrid("/item/getItemStandardUnitPriceList.do", safetyInvenMa.global.searchAjaxData);
    },

    fn_popItemNoList : function (){
        var url = "/item/pop/popItemNoList.do";
        var name = "_blank";
        var option = "width = 1300, height = 670, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    masterSnReset : function(){
        $("#masterSn").val("");
        $("#itemNo").val("");
        $("#itemName").val("");
        safetyInvenMa.gridReload()
    },

    setSafetyInvenUpd : function(){
        if($("input[name='imSn']:checked").length == 0){
            alert("저장할 항목을 선택해주세요.");
            return;
        }

        if(confirm("선택한 항목을 저장하시겠습니까?")){
            var imArr = new Array()
            $.each($("input[name=imSn]:checked"), function(){
                var data = {
                    masterSn : $(this).val(),
                    safetyInven : safetyInvenMa.uncomma($("#safetyInven_" + $(this).val()).val()),
                    empSeq : $("#regEmpSeq").val()
                }
                imArr.push(data);
            })

            safetyInvenMa.global.saveAjaxData = {
                imArr : JSON.stringify(imArr)
            }

            var result = customKendo.fn_customAjax("/item/setSafetyInvenUpd.do", safetyInvenMa.global.saveAjaxData);
            if(result.flag){
                alert("처리되었습니다.");
                safetyInvenMa.gridReload();
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