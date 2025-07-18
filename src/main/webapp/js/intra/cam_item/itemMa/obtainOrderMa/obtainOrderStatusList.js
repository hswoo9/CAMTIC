var oosl = {

    global : {
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : "",
        now : new Date()
    },

    fn_defaultScript : function (){
        customKendo.fn_datePicker("startDt", '', "yyyy-MM-dd", new Date(today.setFullYear(today.getFullYear(),0,1)));
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
            { text : "주문완료", value : "order" },
            { text : "납품완료", value : "com" }
        ]
        customKendo.fn_dropDownList("comType", oosl.global.dropDownDataSource, "text", "value");
        $("#comType").data("kendoDropDownList").bind("change", oosl.gridReload);

        oosl.global.dropDownDataSource = [
            { text : "품번", value : "ITEM_NO" },
            { text : "품명", value : "ITEM_NAME" },
            { text : "업체명", value : "CRM_NM" }
        ]
        customKendo.fn_dropDownList("searchKeyword", oosl.global.dropDownDataSource, "text", "value");
        $("#searchKeyword").data("kendoDropDownList").bind("change", oosl.gridReload);

        customKendo.fn_textBox(["searchValue"]);


        oosl.global.dropDownDataSource = customKendo.fn_customAjax("/item/getItemCategoryList", {cgType : "A"}).list;
        oosl.global.dropDownDataSource.unshift({CATEGORY_CODE_NM : "선택하세요", ITEM_CATEGORY_SN : "", CATEGORY_CODE : ""});
        $("#categoryA").kendoDropDownList({
            dataSource : oosl.global.dropDownDataSource,
            dataTextField: "CATEGORY_CODE_NM",
            dataValueField: "ITEM_CATEGORY_SN",
            change : function(){
                oosl.global.dropDownDataSource = customKendo.fn_customAjax("/item/getItemCategoryList", {cgType : "B", parentCode: $("#categoryA").val()}).list;
                oosl.global.dropDownDataSource.unshift({CATEGORY_CODE_NM : "선택하세요", ITEM_CATEGORY_SN : "", CATEGORY_CODE : ""});

                if($("#categoryA").val() != ""){
                    $("#categoryC").kendoDropDownList({
                        dataTextField: "TEXT",
                        dataValueField: "VALUE",
                        CATEGORY_CODE : "CATEGORY_CODE",
                        dataSource: [
                            {TEXT: '선택하세요', VALUE: '', CATEGORY_CODE : ""}
                        ],
                        index: 0,
                    });

                    $("#categoryB").kendoDropDownList({
                        dataSource : oosl.global.dropDownDataSource,
                        dataTextField: "CATEGORY_CODE_NM",
                        dataValueField: "ITEM_CATEGORY_SN",
                        CATEGORY_CODE : "CATEGORY_CODE",
                        change : function(){
                            oosl.global.dropDownDataSource = customKendo.fn_customAjax("/item/getItemCategoryList", {cgType : "C", parentCode: $("#categoryB").val()}).list;
                            oosl.global.dropDownDataSource.unshift({CATEGORY_CODE_NM : "선택하세요", ITEM_CATEGORY_SN : "", CATEGORY_CODE : ""});

                            if($("#categoryA").val() != "" && $("#categoryB").val() != ""){
                                $("#categoryC").kendoDropDownList({
                                    dataSource : oosl.global.dropDownDataSource,
                                    dataTextField: "CATEGORY_CODE_NM",
                                    dataValueField: "ITEM_CATEGORY_SN",
                                    CATEGORY_CODE : "CATEGORY_CODE",
                                    change : function(){
                                        oosl.gridReload();
                                    }
                                });
                            }

                            oosl.gridReload();
                        }
                    });
                } else {
                    $("#categoryB").kendoDropDownList({
                        dataTextField: "TEXT",
                        dataValueField: "VALUE",
                        CATEGORY_CODE : "CATEGORY_CODE",
                        dataSource: [
                            {TEXT: '선택하세요', VALUE: '', CATEGORY_CODE : ""}
                        ],
                        index: 0,
                    });
                    $("#categoryC").kendoDropDownList({
                        dataTextField: "TEXT",
                        dataValueField: "VALUE",
                        CATEGORY_CODE : "CATEGORY_CODE",
                        dataSource: [
                            {TEXT: '선택하세요', VALUE: '', CATEGORY_CODE : ""}
                        ],
                        index: 0,
                    });
                }

                oosl.gridReload();
            }
        });

        $("#categoryB").kendoDropDownList({
            dataTextField: "TEXT",
            dataValueField: "VALUE",
            CATEGORY_CODE : "CATEGORY_CODE",
            dataSource: [
                {TEXT: '선택하세요', VALUE: '', CATEGORY_CODE : ""}
            ],
            index: 0,
        });

        $("#categoryC").kendoDropDownList({
            dataTextField: "TEXT",
            dataValueField: "VALUE",
            CATEGORY_CODE : "CATEGORY_CODE",
            dataSource: [
                {TEXT: '선택하세요', VALUE: '', CATEGORY_CODE : ""}
            ],
            index: 0,
        });




        oosl.mainGrid();
    },

    mainGrid: function(){
        const dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/item/getObtainOrderMaster.do',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    var categoryA = $("#categoryA").data("kendoDropDownList");
                    var categoryB = $("#categoryB").data("kendoDropDownList");
                    var categoryC = $("#categoryC").data("kendoDropDownList");

                    data.crmSn = $("#crmSn").val();
                    data.startDt = $("#startDt").val();
                    data.endDt = $("#endDt").val();
                    data.deadLine = "Y";
                    data.unpaidType = $("#unpaidType").val();
                    data.comType = $("#comType").val();
                    data.searchKeyword = $("#searchKeyword").val();
                    data.searchValue = $("#searchValue").val();
                    data.category =  categoryA.dataSource.view()[categoryA.selectedIndex].CATEGORY_CODE +
                        categoryB.dataSource.view()[categoryB.selectedIndex].CATEGORY_CODE +
                        categoryC.dataSource.view()[categoryC.selectedIndex].CATEGORY_CODE;
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
            dataSource: dataSource,/*customKendo.fn_gridDataSource2(url, params, "ALL"),*/
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
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="oosl.fn_excelDownload()">' +
                            '	<span class="k-icon k-i-file-excel k-button-icon"></span>' +
                            '	<span class="k-button-text">엑셀다운로드</span>' +
                            '</button>';
                    }
                }
            ],
            excel : {
                fileName : "주문현황 목록.xlsx",
                filterable : true
            },
            columns: [
                {
                    title: "연번",
                    template: "#= --record #",
                    width: 50
                }, {
                    title: "진행상태",
                    field: "DEADLINE",
                    width: 80,
                    template : function (e){
                        if(e.TOTAL_OBTAIN_ORDER_TYPE_Y == '0'){
                            return "-";
                        }else if(e.TOTAL_ODER_REMAIN == "0"){
                            return "납품완료";
                        }else {
                            return "주문완료";
                        }
                    },
                },{
                    title: "취소구분",
                    width: 80,
                    template : function (e){
                        if(e.TOTAL_OBTAIN_ORDER_TYPE_N > 0 && e.TOTAL_OBTAIN_ORDER_TYPE_Y > 0){
                            return "부분취소";
                        }else {
                            return "";
                        }
                    },
                },{
                    title: "수주일자",
                    field: "ORDER_DT",
                    width: 160,
                    template : function(e){
                        if(e.TOTAL_OBTAIN_ORDER_TYPE_Y == '0'){
                            return "<span style='text-decoration: line-through;text-decoration-color: red;'>" + e.ORDER_DT + "</span>"
                        }else {
                            return e.ORDER_DT
                        }
                    }
                },{
                    title: "거래처명",
                    field: "CRM_NM",
                    template : function(e){
                        if(e.TOTAL_OBTAIN_ORDER_TYPE_Y == '0'){
                            return "<span style='text-decoration: line-through;text-decoration-color: red;'>" + e.CRM_NM + "</span>"
                        }else {
                            return e.CRM_NM
                        }
                    }
                }, {
                    title: "주문금액",
                    field: "TOT_AMT",
                    width: 120,
                    template : function(e){
                        return '<div style="text-align: right;">' + comma(e.TOT_AMT) + '</div>';
                    }
                },{
                    title: "납기예정일",
                    field: "MAX_DUE_DT",
                    width: 120,
                    template : function(e){
                        if(e.TOTAL_OBTAIN_ORDER_TYPE_Y == '0'){
                            return  e.DUE_DT;
                        }else {
                            return  e.MAX_DUE_DT;
                        }
                    }
                }, {
                    title: "입금완료액",
                    field: "COM_AMT",
                    width: 120,
                    template : function(e){
                        return '<div style="text-align: right;">' + comma(e.COM_AMT) + '원</div>';
                    }
                },{
                    title: "입금예정액",
                    field: "",
                    width: 120,
                    template : function(e){
                        var amt = e.TOT_AMT - e.COM_AMT;
                        return '<div style="text-align: right;">' + comma(amt) + '원</div>';
                    }
                },{
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
        $("#mainGrid").data("kendoGrid").dataSource.read();
    },

    /*gridReload: function (){
        var categoryA = $("#categoryA").data("kendoDropDownList");
        var categoryB = $("#categoryB").data("kendoDropDownList");
        var categoryC = $("#categoryC").data("kendoDropDownList");

        if($("#mainGrid").data("kendoGrid") != null){
            $("#mainGrid").data("kendoGrid").destroy();
        }

        oosl.global.searchAjaxData = {
            crmSn : $("#crmSn").val(),
            startDt : $("#startDt").val(),
            endDt : $("#endDt").val(),
            deadLine : "Y",
            unpaidType : $("#unpaidType").val(),
            searchKeyword : $("#searchKeyword").val(),
            searchValue : $("#searchValue").val(),
            regEmpSeq : $("#regEmpSeq").val(),

            category :
                categoryA.dataSource.view()[categoryA.selectedIndex].CATEGORY_CODE +
                categoryB.dataSource.view()[categoryB.selectedIndex].CATEGORY_CODE +
                categoryC.dataSource.view()[categoryC.selectedIndex].CATEGORY_CODE

        }

        oosl.mainGrid("/item/getObtainOrderMaster.do", oosl.global.searchAjaxData);
    },*/

    crmSnReset : function(){
        $("#crmSn").val("");
        $("#crmNm").val("");
        oosl.gridReload();
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

    fn_excelDownload : function (){
        oosl.hiddenGrid();

        var grid = $("#hiddenGrid").data("kendoGrid");
        grid.bind("excelExport", function(e) {
            e.workbook.fileName = "주문현황 목록.xlsx";
        });
        grid.saveAsExcel();
    },

    hiddenGrid: function(e){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/item/getObtainOrderExcelList.do',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    var categoryA = $("#categoryA").data("kendoDropDownList");
                    var categoryB = $("#categoryB").data("kendoDropDownList");
                    var categoryC = $("#categoryC").data("kendoDropDownList");

                    data.crmSn = $("#crmSn").val();
                    data.startDt = $("#startDt").val();
                    data.endDt = $("#endDt").val();
                    data.deadLine = "Y";
                    data.unpaidType = $("#unpaidType").val();
                    data.comType = $("#comType").val();
                    data.searchKeyword = $("#searchKeyword").val();
                    data.searchValue = $("#searchValue").val();
                    data.category =  categoryA.dataSource.view()[categoryA.selectedIndex].CATEGORY_CODE +
                        categoryB.dataSource.view()[categoryB.selectedIndex].CATEGORY_CODE +
                        categoryC.dataSource.view()[categoryC.selectedIndex].CATEGORY_CODE;
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
            pageSizes: "All",
        });

        $("#hiddenGrid").kendoGrid({
            dataSource: dataSource,
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
            columns: [
                {
                    title: "연번",
                    field: "ROW_NUM",
                    width: 50
                },{
                    title: "진행상태",
                    field: "ORDERAMT",
                    width: 80
                },{
                    title: "국내/국외",
                    field: "FORE_GB",
                    width: 80
                },{
                    title: "품번(대분류)",
                    field: "CATEGORY_A_SN",
                    width: 100
                }, {
                    title: "품번(중분류)",
                    field: "CATEGORY_B_SN",
                    width: 120
                },{
                    title: "품번(소분류)",
                    field: "CATEGORY_C_SN",
                    width: 120
                },{
                    title: "품명",
                    field: "ITEM_NAME",
                    width: 120
                },{
                    title: "규격",
                    field: "STANDARD",
                    width: 80
                },{
                    title: "주문수량",
                    field: "ORDER_VOLUME",
                    width: 80
                },{
                    title: "단가",
                    field: "UNIT_PRICE",
                    width: 80
                }, {
                    title: "주문금액 (원)",
                    field: "AMT",
                    width: 100
                },{
                    title: "거래처명",
                    field: "CRM_NM" ,
                    width: 120
                },{
                    title: "거래처 소재지",
                    field: "CRM_LOC",
                    width: 120
                },{
                    title: "재고수량",
                    field: "OVERALL_INVEN",
                    width: 80
                }, {
                    title: "출하누계",
                    field: "DELIVERY_AMT",
                    width: 80
                }, {
                    title: "출하잔량",
                    field: "ORDER_REMAIN",
                    width: 80
                }, {
                    title: "납기예정일",
                    field: "DUE_DT",
                    width: 120
                },{
                    title: "입금완료액",
                    field: "COM_AMT",
                    width: 100
                },{
                    title: "입금예정액",
                    field: "COM_NOT_AMT",
                    width: 100
                },{
                    title: "입금처리요청서",
                    field: "OVERALL_KR",
                    width: 100
                }, {
                    title: "비고",
                    field: "RMK",
                    width: 160
                },{
                    title: "등록자",
                    field: "EMP_NAME_KR",
                    width: 80
                }
            ],
        }).data("kendoGrid");
    },
}