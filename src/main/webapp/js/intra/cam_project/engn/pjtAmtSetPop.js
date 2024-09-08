var pjtAmtSet = {

    fn_defaultScript: function(){
        commonProject.setPjtStat();
        pjtAmtSet.fn_pageSet();
        pjtAmtSet.mainGrid();
    },

    fn_pageSet: function(){
        var dropDatasource = [
            { text : "달성 매출액", value : 0 },
            { text : "달성 운영수익", value : 1 },
            { text : "예상 매출액", value : 2 },
            { text : "예상 운영수익", value : 3 }
        ];
        customKendo.fn_dropDownList("amtType", dropDatasource, "text", "value", 3);
        customKendo.fn_textBox(["reqAmt"]);
        customKendo.fn_datePicker("reqDate", "decade", "yyyy-MM-dd", new Date());
        $("#reqDate").attr("readonly", true);
        /*const list = customKendo.fn_customAjax("/project/getPjtCostData", {pjtSn: $("#pjtSn").val()}).list;
        customKendo.fn_dropDownList("searchDate", list, "text", "value", 3);*/
    },

    gridReload: function(){
        $("#mainGrid").data("kendoGrid").dataSource.read();
    },

    mainGrid: function(url, params){
        const dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : "/project/getPjtAmtSetList",
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.pjtSn = $("#pjtSn").val();
                    return data;
                }
            },
            schema : {
                data: function (data) {
                    return data.list;
                },
                total: function (data) {
                    return data.list.length;
                }
            },
            pageSize: 9999,
        });

        $("#mainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 489,
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" onclick="fn_checkAll(\'checkAll\', \'amtSetSn\');"/>',
                    template : "<input type='checkbox' id='amtSetSn#=AMT_SET_SN#' name='amtSetSn' class='amtSetSn' value='#=AMT_SET_SN#'/>",
                    width: 50
                }, {
                    field: "REQ_TYPE",
                    title: "구분",
                    width: 180,
                    template: function(e){
                        if(e.REQ_TYPE == 0){
                            return "달성 매출액";
                        } else if (e.REQ_TYPE == 1){
                            return "달성 운영수익";
                        } else if(e.REQ_TYPE == 2){
                            return "예상 매출액";
                        } else if(e.REQ_TYPE == 3){
                            return "예상 운영수익";
                        }
                    }
                }, {
                    field: "REQ_DATE",
                    title: "적용일자",
                    width: 180,
                }, {
                    field: "REQ_AMT",
                    title: "금액",
                    template: function(row){
                        return "<div style='text-align: right'>"+commaN(row.REQ_AMT)+"</div>";
                    },
                }, {
                    field: "",
                    title: "처리명령",
                    width: 120,
                    template : function(row){
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-error" onclick="pjtAmtSet.fn_delete('+row.AMT_SET_SN+')">삭제</button>';
                    }
                }
            ]
        }).data("kendoGrid");
    },

    fn_save: function(){
        const data = {
            pjtSn: $("#pjtSn").val(),
            regEmpSeq: $("#regEmpSeq").val(),
            amtType: $("#amtType").data("kendoDropDownList").value(),
            reqDate: $("#reqDate").val(),
            reqAmt: uncommaN($("#reqAmt").val())
        }

        const result = customKendo.fn_customAjax("/project/setPjtAmt", data);

        if(result.code != 200){
            alert("저장 중 오류가 발생하였습니다.");
        }else{
            alert("저장 되었습니다.");
            commonProject.getReloadPage(12, 13, 13, 12, 13, 13);
            location.reload();
        }
    },

    fn_delete: function (amtSetSn){
        const data = {
            amtSetSn: amtSetSn
        }
        const result = customKendo.fn_customAjax("/project/setPjtAmtDel", data);

        if(result.code != 200){
            alert("삭제 중 오류가 발생하였습니다.");
        }else{
            alert("삭제 되었습니다.");
            commonProject.getReloadPage(12, 13, 13, 12, 13, 13);
            location.reload();
        }
    }
}

function gridReload(){
    payAppChoosePop.gridReload();
}