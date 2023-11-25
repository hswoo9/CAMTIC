var cscl = {

    global : {
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : "",
        now : new Date()
    },

    fn_defaultScript : function (){
        customKendo.fn_datePicker("yearMonth", 'year', "yyyy-MM", new Date());
        $("#yearMonth").data("kendoDatePicker").bind("change", cscl.gridReload);

        cscl.global.dropDownDataSource = [
            { text : "미확정", value : "N" },
            { text : "확정", value : "Y" }
        ]
        customKendo.fn_dropDownList("confirmYn", cscl.global.dropDownDataSource, "text", "value");
        $("#confirmYn").data("kendoDropDownList").bind("change", cscl.gridReload);

        cscl.gridReload();
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-dark" onclick="cscl.setCrmSalesConfirm()">' +
                            '	<span class="k-button-text">확정</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="cscl.setCrmSalesConfirmCancel()">' +
                            '	<span class="k-button-text">확정취소</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="cscl.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }, {
                    name : 'excel',
                    text: '엑셀다운로드'
                }
            ],
            excel : {
                fileName : "매출확정 목록.xlsx",
                filterable : true
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" style="top: 3px; position: relative" />',
                    template : "<input type='checkbox' id='cscSn#=CRM_SALES_CONFIRM_SN#' name='cscSn' value='#=CRM_SALES_CONFIRM_SN#' style=\"top: 3px; position: relative\" />",
                    width: 30
                }, {
                    title: "순번",
                    template: "#= --record #",
                    width: 50
                }, {
                    title: "거래처",
                    field: "CRM_NM",
                    width: 220,
                }, {
                    title: "당월매출",
                    field: "SALES_MONTH",
                    width: 120,
                    template : function (e){
                        return cscl.comma(e.SALES_MONTH);
                    },
                    attributes : {
                        style : "text-align : right;"
                    }
                }, {
                    title: "입금금액",
                    field: "DEPOSIT_AMT",
                    width: 120,
                    template : function (e){
                        return cscl.comma(e.DEPOSIT_AMT);
                    },
                    attributes : {
                        style : "text-align : right;"
                    }
                }, {
                    title : "확정금액",
                    field : "CONFIRM_AMT",
                    width : 120,
                    template : function (e){
                        return cscl.comma(e.DEPOSIT_AMT);
                    },
                    attributes : {
                        style : "text-align : right;"
                    }
                }, {
                    title: "부가세액",
                    field: "ORDER_VOLUME",
                    width: 100,
                    template : function (e){
                        return cscl.comma(e.DEPOSIT_AMT);
                    },
                    attributes : {
                        style : "text-align : right;"
                    }
                }, {
                    title: "구분",
                    width: 100,
                    field: "CONFIRM_YN",
                    template : function (e){
                        if(e.CONFIRM_YN == "N"){
                            return "미확정";
                        }else{
                            return "확정";
                        }
                    }
                }, {
                    title: "확정자",
                    width: 100,
                    field: "EMP_NAME_KR",
                    template: function(e){
                        if(e.EMP_NAME_KR != null){
                            return e.EMP_NAME_KR;
                        }else {
                            return '';
                        }
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 3);
            }
        }).data("kendoGrid");

        $("#checkAll").click(function(){
            if($(this).is(":checked")) $("input[name=cscSn]").prop("checked", true);
            else $("input[name=cscSn]").prop("checked", false);
        });
    },

    gridReload: function (){
        cscl.global.searchAjaxData = {
            crmSn : $("#crmSn").val(),
            yearMonth : $("#yearMonth").val(),
            confirmYn : $("#confirmYn").val(),
        }

        cscl.mainGrid("/item/getCrmSalesConfirmList.do", cscl.global.searchAjaxData);
    },

    setCrmSalesConfirm: function(){
        if($("input[name=cscSn]:checked").length == 0){
            alert("확정 거래처를 선택해주세요.");
            return;
        }

        if(confirm("선택한 항목을 확정처리하시겠습니까?")){
            var cscArr = new Array()
            $.each($("input[name=cscSn]:checked"), function(){
                var dateItem = $("#mainGrid").data("kendoGrid").dataItem($(this).closest("tr"));
                var data = {
                    crmSalesConfirmSn : $(this).val(),
                    crmSn : dateItem.CRM_SN,
                    empSeq : $("#regEmpSeq").val()
                }
                cscArr.push(data);
            })

            cscl.global.saveAjaxData = {
                cscArr : JSON.stringify(cscArr)
            }

            var result = customKendo.fn_customAjax("/item/setCrmSalesConfirm.do", cscl.global.saveAjaxData);
            if(result.flag){
                alert("처리되었습니다.");
                cscl.gridReload();
            }
        }
    },

    setCrmSalesConfirmCancel : function(){
        if($("input[name=cscSn]:checked").length == 0){
            alert("항목을 선택해주세요.");
            return;
        }

        if(confirm("선택한 거래처 확정을 취소하시겠습니까?")){
            var crmSalesConfirmSn = "";

            $.each($("input[name='cscSn']:checked"), function(){
                crmSalesConfirmSn += "," + $(this).val()
            })

            cscl.global.saveAjaxData = {
                crmSalesConfirmSn : crmSalesConfirmSn.substring(1),
                empSeq : $("#regEmpSeq").val()
            }

            var result = customKendo.fn_customAjax("/item/setCrmSalesConfirmCancel.do", cscl.global.saveAjaxData);
            if(result.flag){
                alert("처리되었습니다.");
                cscl.gridReload();
            }
        }
    },

    crmSnReset : function(){
        $("#crmSn").val("");
        $("#crmNm").val("");
        cscl.gridReload()
    },

    fn_popItemSmRecordList : function (e, y){
        var url = "/item/pop/popItemSmRecordList.do?crmSn=" + e + "&yearMonth=" + y;
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