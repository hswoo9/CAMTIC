var exnpDeChangeRs = {


    fn_defaultScript: function (){

        customKendo.fn_textBox(["title"]);

        exnpDeChangeRs.mainGrid();


    },



    mainGrid : function(){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: '/setManagement/getExnpDeChangeRs',
                    dataType: "json",
                    type: "post"
                },
                parameterMap: function(data) {
                    data.type = "manage"
                    return data;
                }
            },
            schema: {
                data: function (data) {
                    return data.list;
                },
                total: function (data) {
                    return data.list.length;
                },
            },
            pageSize: 10,
        });

        $("#rsMainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 508,
            pageable: {
                refresh : true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount : 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    title: "순번",
                    template: "#= --record #",
                    width: 50
                }, {
                    title: "지출요청일 변경사유",
                    field: "TITLE",
                }, {
                    title: "사용여부",
                    template: function(e){
                        if(e.USE_YN == 'Y'){
                            return "사용";
                        } else {
                            return "미사용";
                        }
                    },
                    width: 200
                }, {
                    field: "",
                    title: "삭제",
                    template: function(e){
                        return '<button type="button" class="k-button k-button-solid-error" onclick="exnpDeChangeRs.fn_del('+e.CHNG_RS_SN+')">삭제</button>'
                    },
                    width: 100
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    fn_regReasonPop : function(){
        var dialog = $("#dialog").data("kendoWindow");

        dialog.center();
        dialog.open();
    },

    fn_del : function (key){
        if(!confirm("삭제하시겠습니까?")){
            return false;
        }

        var data = {
            chngRsSn : key,
        }

        $.ajax({
            url : "/setManagement/delExnpDeChangeRs",
            type : "post",
            data : data,
            dataType : "json",
            success : function(rs){
                if(rs.code == 200){
                    alert("삭제되었습니다.");

                    $("#rsMainGrid").data("kendoGrid").dataSource.read();
                }
            }
        });
    },

    fn_save : function (){
        var data = {
            title : $("#title").val(),
            useYn : $("input[name='useYn']:checked").val(),
        }

        $.ajax({
            url : "/setManagement/setExnpDeChangeRs",
            data : data,
            type : "post",
            dataType : "json",
            success : function(rs){
                if(rs.code == 200){
                    alert("저장되었습니다.");

                    $("#rsMainGrid").data("kendoGrid").dataSource.read();

                    $("#dialog").data("kendoWindow").close();
                    $("#title").val("");
                }
            }
        })
    }
}