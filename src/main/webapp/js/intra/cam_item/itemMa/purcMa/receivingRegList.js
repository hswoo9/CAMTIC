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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="recL.fn_popReceivingReg()">' +
                            '	<span class="k-button-text">입고등록</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="recL.setReceivingCancel()">' +
                            '	<span class="k-button-text">입고취소</span>' +
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
                fileName : "입고등록 목록.xlsx",
                filterable : true
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" style="top: 3px; position: relative" />',
                    template : function(e){
                        if(e.INSPECTION == "N") {
                            return "<input type='checkbox' id='iwSn" + e.ITEM_WH_SN + "' name='iwSn' value='" + e.ITEM_WH_SN + "' style=\"top: 3px; position: relative\" />"
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
                    width: 100,
                    template : function(e){
                        if(e.INSPECTION == "C"){
                            return "<span style='text-decoration: line-through;text-decoration-color: red;'>" + e.CRM_NM + "</span>"
                        }else {
                            return e.CRM_NM
                        }
                    }
                }, {
                    title: "품번",
                    field: "ITEM_NO",
                    width: 120,
                    template : function(e){
                        if(e.ITEM_NO != undefined && e.ITEM_NO != null){
                            if(e.INSPECTION == "N"){
                                return '<a class="title" onclick="recL.fn_popReceivingRegMod(' + e.ITEM_WH_SN + ')" style="cursor: pointer;">' + e.ITEM_NO + '</a>'
                            }else if(e.INSPECTION == "C"){
                                return "<span style='text-decoration: line-through;text-decoration-color: red;'>" + e.ITEM_NO + "</span>"
                            }else {
                                return e.ITEM_NO
                            }
                        } else {
                            return '<a class="title" onclick="recL.fn_popReceivingRegMod(' + e.ITEM_WH_SN + ')" style="color: red;cursor: pointer;">품번매칭</a>'
                        }

                    }
                }, {
                    title: "품명",
                    field: "ITEM_NAME",
                    width: 100,
                    template : function(e){
                        if(e.ITEM_NO != undefined && e.ITEM_NO != null) {
                            if (e.INSPECTION == "N") {
                                return '<a class="title" onclick="recL.fn_popReceivingRegMod(' + e.ITEM_WH_SN + ')" style="cursor: pointer;">' + e.ITEM_NAME + '</a>'
                            } else if (e.INSPECTION == "C") {
                                return "<span style='text-decoration: line-through;text-decoration-color: red;'>" + e.ITEM_NAME + "</span>"
                            } else {
                                return e.ITEM_NAME
                            }
                        } else {
                            return '-';
                        }

                    }
                }, {
                    title: "입고일자",
                    field: "WH_DT",
                    width: 80,
                    template : function(e){
                        if(e.INSPECTION == "C"){
                            return "<span style='text-decoration: line-through;text-decoration-color: red;'>" + e.WH_DT + "</span>"
                        }else {
                            return e.WH_DT
                        }
                    }
                }, {
                    title: "입고형태",
                    field: "WH_TYPE_NM",
                    width: 100,
                    template : function(e){
                        if(e.INSPECTION == "C"){
                            return "<span style='text-decoration: line-through;text-decoration-color: red;'>" + e.WH_TYPE_NM + "</span>"
                        }else {
                            return e.WH_TYPE_NM
                        }
                    }
                },{
                    title: "입고창고",
                    field: "WH_CD_NM",
                    width: 100,
                    template : function(e){
                        if(e.INSPECTION == "C"){
                            return "<span style='text-decoration: line-through;text-decoration-color: red;'>" + e.WH_CD_NM + "</span>"
                        }else {
                            return e.WH_CD_NM
                        }
                    }
                }, {
                    title: "입고량",
                    field: "WH_VOLUME",
                    width: 100,
                    template : function (e){
                        var str = "";
                        if(e.WH_VOLUME != null && e.WH_VOLUME != ""){
                            str = recL.comma(e.WH_VOLUME);
                        }else{
                            str = "0";
                        }

                        if(e.INSPECTION == "C"){
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
                            str = recL.comma(e.UNIT_PRICE) + "원";
                        }else{
                            str = "0원";
                        }

                        if(e.INSPECTION == "C"){
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
                            str = recL.comma(e.AMT) + "원";
                        }else{
                            str = "0원";
                        }

                        if(e.INSPECTION == "C"){
                            return "<span style='text-decoration: line-through;text-decoration-color: red;'>" + str + "</span>"
                        }else {
                            return str
                        }
                    },
                    attributes : {
                        style : "text-align : right;"
                    }
                },{
                    title: "비고",
                    field: "RMK",
                    width : 200
                }, {
                    title: "상태",
                    field: "INSPECTION",
                    width: 80,
                    template : function(e){
                        if(e.INSPECTION == "Y"){
                            return "입고"
                        }else if(e.INSPECTION == "N"){
                            return "검수중"
                        }else if(e.INSPECTION == "C"){
                            return "입고취소"
                        }
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 3);
            }
        }).data("kendoGrid");

        $("#checkAll").click(function(){
            if($(this).is(":checked")) $("input[name=iwSn]").prop("checked", true);
            else $("input[name=iwSn]").prop("checked", false);
        });
    },

    gridReload: function (){
        if($("#mainGrid").data("kendoGrid") != null){
            $("#mainGrid").data("kendoGrid").destroy();
        }
        
        recL.global.searchAjaxData = {
            crmSn : $("#crmSn").val(),
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

    fn_popCamCrmList : function (){
        var url = "/crm/pop/popCrmList.do";
        var name = "_blank";
        var option = "width = 1300, height = 670, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    crmSnReset : function(){
        $("#crmSn").val("");
        $("#crmNm").val("");
        recL.gridReload()
    },

    fn_popReceivingReg : function (){
        var url = "/item/pop/receivingReg.do";
        var name = "_blank";
        var option = "width = 1680, height = 400, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    fn_popReceivingRegMod : function(e){
        var url = "/item/pop/receivingRegMod.do?itemWhSn=" + e;
        var name = "_blank";
        var option = "width = 635, height = 400, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    setReceivingCancel : function() {
        if ($("input[name=iwSn]:checked").length == 0) {
            alert("항목을 선택해주세요.");
            return;
        }

        if (confirm("선택한 항목을 취소처리하시겠습니까?")) {
            var itemWhSn = "";

            $.each($("input[name='iwSn']:checked"), function () {
                itemWhSn += "," + $(this).val()
            })

            recL.global.saveAjaxData = {
                itemWhSn : itemWhSn.substring(1),
                empSeq        : $("#regEmpSeq").val()
            }

            var result = customKendo.fn_customAjax("/item/setReceivingCancel.do", recL.global.saveAjaxData);
            if (result.flag) {
                alert("처리되었습니다.");
                recL.gridReload()
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