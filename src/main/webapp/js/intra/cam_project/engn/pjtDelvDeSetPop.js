var pjtDelvDeSet = {

    fn_defaultScript: function(){
        commonProject.setPjtStat();
        pjtDelvDeSet.fn_pageSet();
        pjtDelvDeSet.mainGrid();
    },

    fn_pageSet: function(){
        customKendo.fn_datePicker("delvDe", "dept", "yyyy-MM-dd", new Date());
        $("#delvDe").attr("readonly", true);
        $("#setIss").kendoTextArea();
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
                    url : "/project/getPjtDelvDeSetList",
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
                    field: "DELV_DE",
                    title: "변경일자",
                    width: 180,
                }, {
                    field: "SET_ISS",
                    title: "변경사유",
                    template: function(row){
                        return "<div style='text-align: right'>"+row.SET_ISS+"</div>";
                    },
                }
            ]
        }).data("kendoGrid");
    },

    fn_save: function(){
        const data = {
            pjtSn: $("#pjtSn").val(),
            regEmpSeq: $("#regEmpSeq").val(),
            delvDe: $("#delvDe").val(),
            setIss: $("#setIss").val()
        }

        const result = customKendo.fn_customAjax("/project/setPjtDelvDe", data);

        if(result.code != 200){
            alert("저장 중 오류가 발생하였습니다.");
        }else{
            alert("저장 되었습니다.");
            commonProject.getReloadPage(12, 13, 13, 12, 13, 13);
            location.reload();
        }
    }
}