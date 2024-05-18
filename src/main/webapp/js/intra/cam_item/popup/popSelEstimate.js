var popSelEstimate = {
    global : {
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : "",
        now : new Date()
    },

    fn_defaultScript: function (){
        customKendo.fn_datePicker("startDt", '', "yyyy-MM-dd", new Date(popSelEstimate.global.now.setMonth(popSelEstimate.global.now.getMonth() - 1)));
        customKendo.fn_datePicker("endDt", '', "yyyy-MM-dd", new Date());

        popSelEstimate.global.dropDownDataSource = [
            { text : "품번", value : "ITEM_NO" },
            { text : "품명", value : "ITEM_NAME" }
        ]
        customKendo.fn_dropDownList("searchKeyword", popSelEstimate.global.dropDownDataSource, "text", "value");
        $("#searchKeyword").data("kendoDropDownList").bind("change", popSelEstimate.gridReload);

        customKendo.fn_textBox(["searchValue"]);

        CKEDITOR.replace('rmk', {

        });

        popSelEstimate.gridReload();
    },

    popMainGrid : function (url, params) {
        $("#popMainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params, 10000),
            height : 305,
            sortable: true,
            selectable: "row",
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            toolbar: [
                 {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="popSelEstimate.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
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
                    title: "거래처",
                    field: "CRM_NM",
                }, {
                    title: "수주일자",
                    field: "ORDER_DT",
                }, {
                    title: "품번",
                    field: "ITEM_NO",
                }, {
                    title: "품명",
                    field: "ITEM_NAME",
                }, {
                    title: "수주량",
                    field: "ORDER_VOLUME",
                    template : function (e){
                        var str = "";
                        if(e.ORDER_VOLUME != null && e.ORDER_VOLUME != ""){
                            str = popSelEstimate.comma(e.ORDER_VOLUME);
                        }else{
                            str = "0";
                        }

                        if(e.OBTAIN_ORDER_TYPE == "N"){
                            return "<span style='text-decoration: line-through;text-decoration-color: red;'>" + str + "</span>"
                        }else {
                            return str
                        }
                    },
                    attributes : {
                        style : "text-align : right;"
                    }
                }, {
                    title: "단가",
                    field: "UNIT_PRICE",
                    template : function (e){
                        var str = "";
                        if(e.UNIT_PRICE != null && e.UNIT_PRICE != ""){
                            str = popSelEstimate.comma(e.UNIT_PRICE) + "원";
                        }else{
                            str = "0원";
                        }

                        if(e.OBTAIN_ORDER_TYPE == "N"){
                            return "<span style='text-decoration: line-through;text-decoration-color: red;'>" + str + "</span>"
                        }else {
                            return str
                        }
                    },
                    attributes : {
                        style : "text-align : right;"
                    }
                }, {
                    title: "수주금액",
                    field: "AMT",
                    template: function(e){
                        var str = "";
                        if(e.AMT != null && e.AMT != ""){
                            str = popSelEstimate.comma(e.AMT) + "원";
                        }else{
                            str = "0원";
                        }

                        if(e.OBTAIN_ORDER_TYPE == "N"){
                            return "<span style='text-decoration: line-through;text-decoration-color: red;'>" + str + "</span>"
                        }else {
                            return str
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
                        var str = "";
                        if(e.DELIVERY_AMT != null && e.DELIVERY_AMT != ""){
                            str = popSelEstimate.comma(e.DELIVERY_AMT);
                        }else{
                            str = "0";
                        }

                        if(e.OBTAIN_ORDER_TYPE == "N"){
                            return "<span style='text-decoration: line-through;text-decoration-color: red;'>" + str + "</span>"
                        }else {
                            return str
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
                        var str = "";
                        if(e.ORDER_REMAIN != null && e.ORDER_REMAIN != ""){
                            str = popSelEstimate.comma(e.ORDER_REMAIN);
                        }else{
                            str = "0";
                        }

                        if(e.OBTAIN_ORDER_TYPE == "N"){
                            return "<span style='text-decoration: line-through;text-decoration-color: red;'>" + str + "</span>"
                        }else {
                            return str
                        }
                    },
                    attributes : {
                        style : "text-align : right;"
                    }
                }, {
                    title: "비고",
                    field: "RMK",
                }, {
                    title: "마감구분",
                    field: "DEADLINE",
                    template : function (e){
                        if(e.DEADLINE == "Y"){
                            return "마감"
                        }else {
                            return "개시";
                        }
                    },
                }, {
                    title: "등록자",
                    field: "EMP_NAME_KR",
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
    },

    gridReload: function (){
        popSelEstimate.global.searchAjaxData = {
            crmSn : $("#crmSn").val(),
            startDt : $("#startDt").val(),
            endDt : $("#endDt").val(),
            obtainOrderType : "Y",
            searchKeyword : $("#searchKeyword").val(),
            searchValue : $("#searchValue").val(),
        }

        popSelEstimate.popMainGrid("/item/getObtainOrderList.do", popSelEstimate.global.searchAjaxData);
    },

    estPrintPop: function(){
        var ooSnArr = "";
        $.each($("input[name='ooSn']:checked"), function(){
            ooSnArr += "," + $(this).val()
        })

        popSelEstimate.global.saveAjaxData = {
            crmSn : $("#crmSn").val(),
            obtainOrderSn : ooSnArr.substr(1),
            rmk : CKEDITOR.instances.rmk.getData(),
            empSeq : $("#empSeq").val()
        }

        var result = customKendo.fn_customAjax("/item/setItemEstPrint.do", popSelEstimate.global.saveAjaxData);
        var url = "/item/pop/estPrintPop.do?estPrintSn=" + result.rs.estPrintSn;
        var name = "estPrintPop";
        var option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";
        var popup = window.open(url, name, option);
        window.close();
    },

    fn_sendMailPop : function(){
        let crmSn = $("#crmSn").val();
        var url = "/item/pop/estimateSendMailPop.do?crmSn="+crmSn;
        var name = "sendMailPop";
        var option = "width=960, height=620, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";
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