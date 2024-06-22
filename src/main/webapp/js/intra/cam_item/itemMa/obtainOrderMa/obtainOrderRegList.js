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
            { text : "개시", value : "N" },
            { text : "마감", value : "Y" }
        ]
        customKendo.fn_dropDownList("deadLine", oorl.global.dropDownDataSource, "text", "value");
        $("#deadLine").data("kendoDropDownList").bind("change", oorl.gridReload);

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
            scrollable : true,
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="oorl.fn_popObtainOrderReg()">' +
                            '	<span class="k-button-text">수주등록</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="oorl.setObtainOrderCancel()">' +
                            '	<span class="k-button-text">수주취소</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-dark" onclick="oorl.setDepositUpd()">' +
                            '	<span class="k-button-text">입금완료</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-dark" onclick="oorl.setDeadlineUpd()">' +
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
                    template : function(e){
                        if((e.OBTAIN_ORDER_TYPE == "Y" && e.DEADLINE == "N") || e.DEPOSIT == "N") {
                            return "<input type='checkbox' id='ooSn" + e.OBTAIN_ORDER_SN + "' name='ooSn' value='" + e.OBTAIN_ORDER_SN + "' deadline='" + e.DEADLINE + "' deposit='" + e.DEPOSIT + "' style=\"top: 3px; position: relative\" />"
                        }else{
                            return ""
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
                    width: 200,
                    template : function(e){
                        if(e.OBTAIN_ORDER_TYPE == "N"){
                            return "<span style='text-decoration: line-through;text-decoration-color: red;'>" + e.CRM_NM + "</span>"
                        }else {
                            return e.CRM_NM
                        }
                    }
                }, {
                    title: "수주일자",
                    field: "ORDER_DT",
                    width: 80,
                    template : function(e){
                        if(e.OBTAIN_ORDER_TYPE == "N"){
                            return "<span style='text-decoration: line-through;text-decoration-color: red;'>" + e.ORDER_DT + "</span>"
                        }else {
                            return e.ORDER_DT
                        }
                    }
                }, {
                    title: "품번",
                    field: "ITEM_NO",
                    width: 120,
                    template : function(e){
                        if(e.DEADLINE == "N"){
                            return '<a class="title" onclick="oorl.fn_popObtainOrderRegMod(' + e.OBTAIN_ORDER_SN + ')" style="cursor: pointer;">' + e.ITEM_NO + '</a>'
                        }else {
                            if(e.OBTAIN_ORDER_TYPE == "N"){
                                return "<span style='text-decoration: line-through;text-decoration-color: red;'>" + e.ITEM_NO + "</span>"
                            }else {
                                return e.ITEM_NO
                            }
                        }
                    }
                }, {
                    title: "품명",
                    field: "ITEM_NAME",
                    width: 120,
                    template : function(e){
                        if(e.DEADLINE == "N"){
                            return '<a class="title" onclick="oorl.fn_popObtainOrderRegMod(' + e.OBTAIN_ORDER_SN + ')" style="cursor: pointer;">' + e.ITEM_NAME + '</a>'
                        }else {
                            if(e.OBTAIN_ORDER_TYPE == "N"){
                                return "<span style='text-decoration: line-through;text-decoration-color: red;'>" + e.ITEM_NAME + "</span>"
                            }else {
                                return e.ITEM_NAME
                            }
                        }
                    }
                }, {
                    title: "재고",
                    field: "OVERALL_INVEN",
                    width: 100,
                    template : function (e){
                        if(e.OVERALL_INVEN != null && e.OVERALL_INVEN != ""){
                            return oorl.comma(e.OVERALL_INVEN);
                        }else{
                            return "0";
                        }
                    },
                    attributes : {
                        style : "text-align : right;"
                    }
                }, {
                    title: "수주량",
                    field: "ORDER_VOLUME",
                    width: 100,
                    template : function (e){
                        var str = "";
                        if(e.ORDER_VOLUME != null && e.ORDER_VOLUME != ""){
                            str = oorl.comma(e.ORDER_VOLUME);
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
                    width: 100,
                    field: "UNIT_PRICE",
                    template : function (e){
                        var str = "";
                        if(e.UNIT_PRICE != null && e.UNIT_PRICE != ""){
                            str = oorl.comma(e.UNIT_PRICE) + "원";
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
                    width: 100,
                    field: "AMT",
                    template: function(e){
                        var str = "";
                        if(e.AMT != null && e.AMT != ""){
                            str = oorl.comma(e.AMT) + "원";
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
                            str = oorl.comma(e.DELIVERY_AMT);
                        }else{
                            str = "0";
                        }

                        // if(e.DEADLINE == "N"){
                        //     return "<input type='text' class='deliveryAmtInput numberInput k-input k-textbox' maxOrderVolume='" + e.ORDER_VOLUME + "' style='text-align: right;' value='" + str + "'>";
                        // }else {
                            if(e.OBTAIN_ORDER_TYPE == "N"){
                                return "<span style='text-decoration: line-through;text-decoration-color: red;'>" + str + "</span>"
                            }else {
                                return str
                            }
                        // }
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
                            str = oorl.comma(e.ORDER_REMAIN);
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
                    width: 160,
                    template : function(e){
                        if(e.OBTAIN_ORDER_TYPE == "N"){
                            return "<span style='text-decoration: line-through;text-decoration-color: red;'>" + e.RMK + "</span>"
                        }else {
                            return e.RMK
                        }
                    }
                }, {
                    title: "수주구분",
                    field: "OBTAIN_ORDER_TYPE",
                    width: 80,
                    template : function (e){
                        if(e.OBTAIN_ORDER_TYPE == "Y"){
                            return "정상"
                        }else{
                            return "취소";
                        }
                    },
                }, {
                    title: "입금구분",
                    field: "DEPOSIT",
                    width: 80,
                    template : function (e){
                        if(e.DEPOSIT == "Y"){
                            return "입금"
                        }else{
                            return "미입금";
                        }
                    },
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
                    width: 80,
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="oorl.fn_popSelEstimate(this)">' +
                            '	<span class="k-button-text">견적서</span>' +
                            '</button>';
                    }
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
            deadLine : $("#deadLine").val(),
            searchKeyword : $("#searchKeyword").val(),
            searchValue : $("#searchValue").val(),
            // regEmpSeq : $("#regEmpSeq").val()
        }

        oorl.mainGrid("/item/getObtainOrderList.do", oorl.global.searchAjaxData);
    },

    setDeadlineUpd: function(){
        if($("input[name=ooSn]:checked").length == 0){
            alert("저장할 항목을 선택해주세요.");
            return;
        }

        if(confirm("선택한 항목을 마감처리하시겠습니까?")){
            var oorlArr = new Array()
            $.each($("input[name=ooSn]:checked"), function(){
                var data = {
                    obtainOrderSn : $(this).val(),
                    empSeq : $("#regEmpSeq").val()
                }

                if($(this).attr("deadline") == "N"){
                    oorlArr.push(data);
                }
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

    setDepositUpd: function(){
        if($("input[name=ooSn]:checked").length == 0){
            alert("항목을 선택해주세요.");
            return;
        }

        if(confirm("선택한 항목을 입금완료처리하시겠습니까?")){
            var oorlArr = new Array()
            $.each($("input[name=ooSn]:checked"), function(){
                var data = {
                    obtainOrderSn : $(this).val(),
                    empSeq : $("#regEmpSeq").val()
                }

                if($(this).attr("deposit") == "N"){
                    oorlArr.push(data);
                }
            })

            oorl.global.saveAjaxData = {
                oorlArr : JSON.stringify(oorlArr)
            }

            var result = customKendo.fn_customAjax("/item/setDepositUpd.do", oorl.global.saveAjaxData);
            if(result.flag){
                alert("처리되었습니다.");
                oorl.gridReload();
            }
        }
    },

    setObtainOrderCancel : function(){
        if($("input[name=ooSn]:checked").length == 0){
            alert("항목을 선택해주세요.");
            return;
        }

        if(confirm("선택한 항목을 취소처리하시겠습니까?")){
            var obtainOrderSn = "";

            $.each($("input[name='ooSn']:checked"), function(){
                obtainOrderSn += "," + $(this).val()
            })

            oorl.global.saveAjaxData = {
                obtainOrderSn : obtainOrderSn.substring(1),
                empSeq : $("#regEmpSeq").val()
            }

            var result = customKendo.fn_customAjax("/item/setObtainOrderCancel.do", oorl.global.saveAjaxData);
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

    fn_popObtainOrderRegMod : function (e){
        var url = "/item/pop/popObtainOrderRegMod.do?obtainOrderSn=" + e;
        var name = "_blank";
        var option = "width = 635, height = 400, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    fn_popCamCrmList : function (){
        var url = "/crm/pop/popCrmList.do";
        var name = "_blank";
        var option = "width = 1300, height = 670, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    fn_popSelEstimate : function(e){
        var dataItem = $("#mainGrid").data("kendoGrid").dataItem($(e).closest("tr"));
        var url = "/item/pop/popSelEstimate.do?crmSn="+dataItem.CRM_SN;
        var name = "_blank";
        var option = "width = 1300, height = 815, top = 200, left = 400, location = no"
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