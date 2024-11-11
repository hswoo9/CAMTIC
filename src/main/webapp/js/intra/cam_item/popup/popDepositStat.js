var popDepositStat = {
    global : {
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : "",
        now : new Date()
    },

    fn_defaultScript: function (){
        popDepositStat.gridReload();
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="popDepositStat.setDepositConfirm()">' +
                            '	<span class="k-button-text">입금확정</span>' +
                            '</button>';
                    }
                },{
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="popDepositStat.gridReload()">' +
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
                    template : function(e){
                        if(e.DEPOSIT == "N"){
                            return "<input type='checkbox' id='srsSn" + e.SM_RECORD_SN + "' name='srsSn' value='" + e.SM_RECORD_SN + "' style=\"top: 3px; position: relative\" />";
                        }else{
                            return "";
                        }
                    },
                    width: 30,
                }, {
                    title: "납품처",
                    field: "CRM_NM",
                    width: 120,
                }, {
                    title: "납품일자",
                    field: "DELIVERY_DT",
                    width: 100,
                }, {
                    title: "금액",
                    field: "AMT",
                    template : function (e){
                        return popDepositStat.comma(e.AMT);
                    },
                    attributes : {
                        style : "text-align : right;"
                    },
                    width: 120,
                }, {
                    title: "비고",
                    field: "RMK",
                }, {
                    title: "입금확정",
                    field: "RMK",
                    template : function (e){
                        if(e.DEPOSIT == "Y"){
                            return "입금확정";
                        }else{
                            return "입금미확정";
                        }
                    },
                    width: 120
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 3);
            }
        }).data("kendoGrid");

        $("#checkAll").click(function(){
            if($(this).is(":checked")) $("input[name=srsSn]").prop("checked", true);
            else $("input[name=srsSn]").prop("checked", false);
        });
    },

    gridReload: function (){
        popDepositStat.global.searchAjaxData = {
            crmSn : $("#crmSn").val(),
            yearMonth : $("#yearMonth").val(),
        }

        popDepositStat.popMainGrid("/item/getDepositStatList.do", popDepositStat.global.searchAjaxData);
    },

    setDepositConfirm : function(){
        if($("input[name=srsSn]:checked").length == 0){
            alert("항목을 선택해주세요.");
            return;
        }

        if(confirm("입금확정 하시겠습니까?")){
            var depositArr = new Array();

            $.each($("input[name='srsSn']:checked"), function(){
                var dataItem = $("#popMainGrid").data("kendoGrid").dataItem($(this).closest("tr"));
                var data = {
                    smRecordSn : $(this).val(),
                    depositAmt : String(dataItem.AMT)
                }

                depositArr.push(data)
            })

            popDepositStat.global.saveAjaxData = {
                depositArr : JSON.stringify(depositArr),
                empSeq : $("#empSeq").val()
            }

            var result = customKendo.fn_customAjax("/item/setDepositConfirm.do", popDepositStat.global.saveAjaxData);
            if(result.flag){
                alert("처리되었습니다.");
                popDepositStat.gridReload();
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