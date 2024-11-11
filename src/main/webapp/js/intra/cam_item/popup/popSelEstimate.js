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

        popSelEstimate.fn_rmkSet();
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
                fileName : "견적등록 목록.xlsx",
                filterable : true
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" style="top: 3px; position: relative" />',
                    template : "<input type='checkbox' id='ooSn#=OBTAIN_ORDER_SN#' name='ooSn' value='#=OBTAIN_ORDER_SN#' style=\"top: 3px; position: relative\" />",
                    width: 30,
                }, {
                    title: "메일전송",
                    field: "CRM_NM",
                    width: 80,
                    template : function (e){
                        if(e.MAIL_YN == "Y"){
                            return "전송완료"
                        }
                        return "미전송"
                    }
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
                    width: 150,
                }, {
                    title: "품명",
                    field: "ITEM_NAME",
                    width: 150,
                }, {
                    title: "수주량",
                    field: "ORDER_VOLUME",
                    width: 60,
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
                    width: 100,
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
                    width: 100,
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
                    title: "출하누계",
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
                    title: "구분",
                    field: "FORE_GB",
                    width: 60,
                    template: function(e){
                        if(e.FORE_GB == "D") {
                            return "국내";
                        } else {
                            return "국외";
                        }
                    }
                }, {
                    title: "비고",
                    field: "RMK",
                    width: 120,
                }, {
                    title: "마감구분",
                    field: "DEADLINE",
                    width: 80,
                    template : function (e){
                        if(e.DEADLINE == "Y"){
                            return "마감"
                        }else {
                            return "개시";
                        }
                    },
                }, {
                    title: "등록자",
                    width: 60,
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
            obtainOrderSn : $("#obtainOrderSn").val(),
        }

        popSelEstimate.popMainGrid("/item/getObtainOrderList.do", popSelEstimate.global.searchAjaxData);
    },

    estPrintPop: function(e){
        if($("input[name='ooSn']:checked").length == 0){
            alert("출력할 견적을 체크해주세요.");
            return;
        }

        var ooSnArr = "";
        $.each($("input[name='ooSn']:checked"), function(){
            ooSnArr += "," + $(this).val();
        })

        popSelEstimate.global.saveAjaxData = {
            crmSn : $("#crmSn").val(),
            obtainOrderSn : ooSnArr.substr(1),
            rmk : CKEDITOR.instances.rmk.getData(),
            empSeq : $("#empSeq").val(),
            ooSn : $("#obtainOrderSn").val()
        }

        var result = customKendo.fn_customAjax("/item/setItemEstPrint.do", popSelEstimate.global.saveAjaxData);
        var url = "/item/pop/estPrintPop.do?estPrintSn=" + result.rs.estPrintSn;
        if($("input[name='ooSn']:checked").length != 0){
            url += "&obtainOrderSn="+ooSnArr.substr(1)
        }

        if(e == "B") {
            url += "&type=B";
        }

        var name = "_blank";
        var option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";
        var popup = window.open(url, name, option);
        // window.close();
    },

    fn_sendMailPop : function(){
        var ooSnArr = "";
        $.each($("input[name='ooSn']:checked"), function(){
            ooSnArr += "," + $(this).val();
        })
        ooSnArr = ooSnArr.substr(1);

        let crmSn = $("#crmSn").val();
        var url = "/item/pop/estimateSendMailPop.do?crmSn="+crmSn;
        if($("input[name='ooSn']:checked").length != 0){
            url += "&ooSnArr="+ooSnArr
        }
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

    fn_rmkSet : function(){
        $.ajax({
            type: "post",
            url: "/item/getEstimateRmk",
            data: {
                obtainOrderSn : $("#obtainOrderSn").val()
            },
            success: function(result){
                CKEDITOR.instances.rmk.setData(result.rs.RMK);
            }
        })
    }
}