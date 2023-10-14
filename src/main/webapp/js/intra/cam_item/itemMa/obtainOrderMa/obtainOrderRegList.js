var oorl = {

    global : {
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : "",
        now : new Date()
    },

    fn_defaultScript : function (){
        customKendo.fn_datePicker("startDt", '', "yyyy-MM-dd", new Date(oorl.global.now.setMonth(oorl.global.now.getMonth() - 1)));
        customKendo.fn_datePicker("endDt", '', "yyyy-MM-dd", new Date());

        oorl.global.dropDownDataSource = [
            { text : "품번", value : "ITEM_NO" },
            { text : "품명", value : "ITEM_NAME" }
        ]
        customKendo.fn_dropDownList("searchKeyword", oorl.global.dropDownDataSource, "text", "value");
        $("#searchKeyword").data("kendoDropDownList").bind("change", oorl.gridReload);

        customKendo.fn_textBox(["searchValue"]);

        oorl.gridReload();
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="oorl.fn_popObtainOrderReg()">' +
                            '	<span class="k-button-text">수주등록</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="oorl.setDeliveryAmtUpd()">' +
                            '	<span class="k-button-text">납품누계저장</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="oorl.setDeadlineUpd()">' +
                            '	<span class="k-button-text">마감</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="oorl.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }, {
                    name : 'excel',
                    text: '엑셀다운로드'
                }
            ],
            excel : {
                fileName : "수주등록 목록.xlsx",
                filterable : true
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" style="top: 3px; position: relative" />',
                    template : "<input type='checkbox' id='ooSn#=OBTAIN_ORDER_SN#' name='ooSn' value='#=OBTAIN_ORDER_SN#' style=\"top: 3px; position: relative\" />",
                    width: 30,
                }, {
                    title: "순번",
                    template: "#= --record #",
                    width: 50
                }, {
                    title: "거래처",
                    field: "CRM_NM",
                    width: 150,
                }, {
                    title: "수주일자",
                    field: "ORDER_DT",
                    width: 80,
                }, {
                    title: "품번",
                    field: "ITEM_NO",
                    width: 120,
                }, {
                    title: "품명",
                    field: "ITEM_NAME",
                    width: 120,
                }, {
                    title: "수주량",
                    field: "ORDER_VOLUME",
                    width: 100,
                    template : function (e){
                        if(e.ORDER_VOLUME != null && e.ORDER_VOLUME != ""){
                            return oorl.comma(e.ORDER_VOLUME) + "";
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
                            return oorl.comma(e.UNIT_PRICE) + "원";
                        }else{
                            return "0원";
                        }
                    },
                    attributes : {
                        style : "text-align : right;"
                    }
                }, {
                    title: "수주금액",
                    width: 100,
                    field: "AMT",
                    template: function(e){
                        if(e.AMT != null && e.AMT != ""){
                            return oorl.comma(e.AMT) + "원";
                        }else{
                            return "0원";
                        }
                    },
                    attributes : {
                        style : "text-align : right;"
                    }
                }, {
                    title: "납품누계",
                    field: "DELIVERY_AMT",
                    width: 100,
                    template : function (e){
                        if(e.DELIVERY_AMT != null && e.DELIVERY_AMT != ""){
                            if(e.DEADLINE == "N"){
                                return "<input type='text' class='deliveryAmtInput numberInput k-input k-textbox' maxOrderVolume='" + e.ORDER_VOLUME + "' style='text-align: right;' value='" + oorl.comma(e.DELIVERY_AMT) + "'>";
                            }else{
                                return oorl.comma(e.DELIVERY_AMT);
                            }
                        }else{
                            if(e.DEADLINE == "N"){
                                return "<input type='text' class='deliveryAmtInput numberInput k-input k-textbox' maxOrderVolume='" + e.ORDER_VOLUME + "' style='text-align: right' value='0'>";
                            }else{
                                return "0"
                            }
                        }
                    },
                    attributes : {
                        style : "text-align : right;"
                    }
                }, {
                    title: "잔량",
                    field: "ORDER_REMAIN",
                    width: 100,
                    template : function (e){
                        if(e.ORDER_REMAIN != null && e.ORDER_REMAIN != ""){
                            return oorl.comma(e.ORDER_REMAIN) + "";
                        }else{
                            return "0";
                        }
                    },
                    attributes : {
                        style : "text-align : right;"
                    }
                }, {
                    title: "비고",
                    field: "RMK",
                    width: 200,
                }, {
                    title: "마감구분",
                    field: "DEADLINE",
                    width: 80,
                    template : function (e){
                        if(e.DEADLINE == "Y"){
                            return "마감"
                        }else{
                            return "개시";
                        }
                    },
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
            if($(this).is(":checked")) $("input[name=ooSn]").prop("checked", true);
            else $("input[name=ooSn]").prop("checked", false);
        });

        $(".numberInput").keyup(function(){
            if(Number(oorl.uncomma($(this).val())) > Number($(this).attr("maxOrderVolume"))){
                alert("납품누계는 수주량을 초과할 수 없습니다.");
                $(this).val(oorl.comma($(this).attr("maxOrderVolume")));
            }else{
                $(this).val(oorl.comma(oorl.uncomma($(this).val())));
            }
        });
    },

    gridReload: function (){
        oorl.global.searchAjaxData = {
            crmSn : $("#crmSn").val(),
            startDt : $("#startDt").val(),
            endDt : $("#endDt").val(),
            searchKeyword : $("#searchKeyword").val(),
            searchValue : $("#searchValue").val(),
            regEmpSeq : $("#regEmpSeq").val()
        }

        oorl.mainGrid("/item/getObtainOrderList.do", oorl.global.searchAjaxData);
    },

    setDeliveryAmtUpd: function(){
        if(confirm("저장하시겠습니까?")){
            var oorlArr = new Array()
            $.each($("input[name=ooSn]"), function(){
                var data = {
                    obtainOrderSn : $(this).val(),
                    deliveryAmt : $(this).closest("tr").find("input.deliveryAmtInput").val(),
                    empSeq : $("#regEmpSeq").val()
                }
                oorlArr.push(data);
            })

            oorl.global.saveAjaxData = {
                oorlArr : JSON.stringify(oorlArr)
            }

            var result = customKendo.fn_customAjax("/item/setDeliveryAmtUpd.do", oorl.global.saveAjaxData);
            if(result.flag){
                alert("처리되었습니다.");
                oorl.gridReload();
            }
        }
    },

    setDeadlineUpd: function(){
        if(confirm("선택된 수주를 마감처리하시겠습니까?")){
            var oorlArr = new Array()
            $.each($("input[name=ooSn]:checked"), function(){
                var data = {
                    obtainOrderSn : $(this).val(),
                    empSeq : $("#regEmpSeq").val()
                }
                oorlArr.push(data);
            })

            oorl.global.saveAjaxData = {
                oorlArr : JSON.stringify(oorlArr)
            }

            var result = customKendo.fn_customAjax("/item/setDeadlineUpd.do", oorl.global.saveAjaxData);
            if(result.flag){
                alert("처리되었습니다.");
                oorl.gridReload();
            }
        }
    },

    crmSnReset : function(){
        $("#crmSn").val("");
        $("#crmNm").val("");
        oorl.gridReload()
    },

    fn_popObtainOrderReg : function (){
        var url = "/item/pop/popObtainOrderReg.do";
        var name = "_blank";
        var option = "width = 1550, height = 505, top = 200, left = 400, location = no"
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