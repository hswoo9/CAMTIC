var oosl = {

    global : {
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : "",
        now : new Date()
    },

    fn_defaultScript : function (){
        customKendo.fn_datePicker("startDt", '', "yyyy-MM-dd", new Date(oosl.global.now.setMonth(oosl.global.now.getMonth() - 1)));
        customKendo.fn_datePicker("endDt", '', "yyyy-MM-dd", new Date());

        oosl.global.dropDownDataSource = [
            { text : "완납", value : "N" },
            { text : "미납", value : "U" },
            { text : "일부미납", value : "P" },
            { text : "전체미납", value : "C" },
            { text : "진행중", value : "Y" },
        ]
        customKendo.fn_dropDownList("unpaidType", oosl.global.dropDownDataSource, "text", "value");
        $("#unpaidType").data("kendoDropDownList").bind("change", oosl.gridReload);

        oosl.global.dropDownDataSource = [
            { text : "품번", value : "ITEM_NO" },
            { text : "품명", value : "ITEM_NAME" }
        ]
        customKendo.fn_dropDownList("searchKeyword", oosl.global.dropDownDataSource, "text", "value");
        $("#searchKeyword").data("kendoDropDownList").bind("change", oosl.gridReload);

        customKendo.fn_textBox(["searchValue"]);

        oosl.gridReload();
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
            detailTemplate : kendo.template($("#template").html()),
            detailInit: oosl.detailInit,
            toolbar: [
                {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="oosl.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }, {
                    name : 'excel',
                    text: '엑셀다운로드'
                }
            ],
            excel : {
                fileName : "출하실적등록 목록.xlsx",
                filterable : true
            },
            columns: [
                {
                    title: "순번",
                    template: "#= --record #",
                    width: 50
                }, {
                    title: "거래처",
                    field: "CRM_NM",
                    template : function(e){
                        if(e.OBTAIN_ORDER_TYPE == "N"){
                            return "<span style='text-decoration: line-through;text-decoration-color: red;'>" + e.CRM_NM + "</span>"
                        }else {
                            return e.CRM_NM
                        }
                    }
                }, {
                    title: "견적금액",
                    field: "TOT_AMT",
                    width: 120,
                    template : function(e){
                        return '<div style="text-align: right;">' + comma(e.TOT_AMT) + '</div>';
                    }
                }, {
                    title: "수주일자",
                    field: "ORDER_DT",
                    width: 160,
                    template : function(e){
                        if(e.OBTAIN_ORDER_TYPE == "N"){
                            return "<span style='text-decoration: line-through;text-decoration-color: red;'>" + e.ORDER_DT + "</span>"
                        }else {
                            return e.ORDER_DT
                        }
                    }
                }, {
                    title: "등록자",
                    field: "EMP_NAME_KR",
                    width: 160,
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

    detailInit : function(e) {
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/item/getObtainOrderList.do',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.obtainOrderSn = e.data.OBTAIN_ORDER_SN;
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
            pageSize: 10,
        });

        $("<div/>").appendTo(e.detailCell).kendoGrid({
            dataSource: dataSource,
            scrollable: false,
            sortable: true,
            pageable: true,
            columns: [
                {
                    title: "납기일자",
                    field: "DUE_DT",
                    width: 80,
                    template : function(e){
                        if(e.OBTAIN_ORDER_TYPE == "N"){
                            return "<span style='text-decoration: line-through;text-decoration-color: red;'>" + e.DUE_DT + "</span>"
                        }else {
                            return e.DUE_DT
                        }
                    }
                }, {
                    title: "품번",
                    field: "ITEM_NO",
                    template : function(e){
                        if(e.OBTAIN_ORDER_TYPE == "N"){
                            return "<span style='text-decoration: line-through;text-decoration-color: red;'>" + e.ITEM_NO + "</span>"
                        }else {
                            return e.ITEM_NO
                        }
                    }
                }, {
                    title: "품명",
                    field: "ITEM_NAME",
                    template : function(e){
                        if(e.OBTAIN_ORDER_TYPE == "N"){
                            return "<span style='text-decoration: line-through;text-decoration-color: red;'>" + e.ITEM_NAME + "</span>"
                        }else {
                            return e.ITEM_NAME
                        }
                    }
                }, {
                    title: "재고",
                    field: "OVERALL_INVEN",
                    width: 80,
                    template : function (e){
                        if(e.OVERALL_INVEN != null && e.OVERALL_INVEN != ""){
                            return oosl.comma(e.OVERALL_INVEN);
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
                    width: 80,
                    template : function (e){
                        var str = "";
                        if(e.ORDER_VOLUME != null && e.ORDER_VOLUME != ""){
                            str = oosl.comma(e.ORDER_VOLUME);
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
                    width: 90,
                    field: "UNIT_PRICE",
                    template : function (e){
                        var str = "";
                        if(e.UNIT_PRICE != null && e.UNIT_PRICE != ""){
                            str = oosl.comma(e.UNIT_PRICE) + "원";
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
                    title: "금액",
                    width: 100,
                    field: "AMT",
                    template: function(e){
                        var str = "";
                        if(e.AMT != null && e.AMT != ""){
                            str = oosl.comma(e.AMT) + "원";
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
                    width: 80,
                    template : function (e){
                        var str = "";
                        if(e.DELIVERY_AMT != null && e.DELIVERY_AMT != ""){
                            str = oosl.comma(e.DELIVERY_AMT);
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
                    title: "미납량",
                    field: "ORDER_REMAIN",
                    width: 80,
                    template : function (e){
                        var str = "";
                        if(e.ORDER_REMAIN != null && e.ORDER_REMAIN != ""){
                            str = oosl.comma(e.ORDER_REMAIN);
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
                    title: "미납구분",
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
                    title: "수주마감",
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
                    title: "비고",
                    field: "RMK",
                    width: 150,
                }
            ]
        });
    },

    gridReload: function (){
        oosl.global.searchAjaxData = {
            crmSn : $("#crmSn").val(),
            startDt : $("#startDt").val(),
            endDt : $("#endDt").val(),
            deadLine : "Y",
            unpaidType : $("#unpaidType").val(),
            searchKeyword : $("#searchKeyword").val(),
            searchValue : $("#searchValue").val(),
            regEmpSeq : $("#regEmpSeq").val()
        }

        oosl.mainGrid("/item/getObtainOrderMaster.do", oosl.global.searchAjaxData);
    },

    crmSnReset : function(){
        $("#crmSn").val("");
        $("#crmNm").val("");
        oosl.gridReload()
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