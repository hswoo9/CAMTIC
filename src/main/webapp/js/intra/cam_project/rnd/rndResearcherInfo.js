var rndRschInfo = {


    fn_defaultScript : function(){

        rndRschInfo.fn_rschMainGrid();
    },

    gridReload: function(){
        $("#rschMainGrid").data("kendoGrid").dataSource.read();
    },


    fn_rschMainGrid : function(){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: "/projectRnd/getRschInfo",
                    dataType: "json",
                    type: "post"
                },
                parameterMap: function(data){
                    data.pjtSn = $("#pjtSn").val();
                    return data;
                }
            },
            schema: {
                data: function(data){
                    return data.list;
                },
                total: function(data){
                    return data.list.length;
                },
            },
            pageSize: 10,
        });

        $("#rschMainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 480,
            pageable: {
                refresh: true,
                pageSizes: [ 10, 20, 30, 50, 100 ],
                buttonCount: 5
            },
            toolbar : [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="fn_popRschList('+$("#pjtSn").val()+')">' +
                            '	    <span class="k-button-text">등록</span>' +
                            '   </button>';
                    }
                }
            ],
            dataBound : function(e){
                const grid = this;
                grid.tbody.find("tr").click(function (e) {
                    grid.tbody.find("tr").each(function (){
                        $(this).css("background-color", "");
                    });

                    $(this).css("background-color", "#a7e1fc");
                });
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll"/>',
                    template : function(e){
                        var chk = "";
                        if(e.CHK > 0){
                            chk = "checked";
                        }

                        return "<input type='checkbox' id='rsch_" + e.RECRUIT_COMMISSIONER_INFO_SN + "' name='rschChk' value='" + e.PJT_RSCH_SN + "' " + chk + "/>"
                    },
                    width: 50
                }, {
                    template: "#= --record #",
                    title: "순번",
                    width : 80
                }, {
                    title: "구분",
                    field: "PJT_RSCH_POSITION",
                    width: 200
                }, {
                    title: "이름",
                    field: "PJT_RSCH_NM",
                    width: 200
                }, {
                    title: "소속",
                    field : "PJT_RSCH_COMP",
                }, {
                    title: "진행과제수",
                    width: 200,
                    template : function (e){
                        return "0";
                    }
                }, {
                    title : "참여율",
                    width: 200,
                    template : function (e){
                        return "0%";
                    }
                }, {
                    title : "",
                    width: 100,
                    template: function(e){
                        console.log(e);
                        return '<button type="button" class="k-button k-button-solid-error" onclick="rndRschInfo.fn_del('+e.PJT_RSCH_SN+')">삭제</button>'
                    }
                }
            ],

            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");


        $("#checkAll").click(function(){
            if($(this).is(":checked")) $("input[name=rschChk]").prop("checked", true);
            else $("input[name=rschChk]").prop("checked", false);
        });
    },

    fn_delPjtBustrip : function (key){
        var data= {
            hrBizReqResultId : key
        }

        $.ajax({
            url : "/project/engn/delPjtBustrip",
            data : data,
            type : "post",
            dataType : "json",
            success : function(rs){
               if(rs.code == 200){
                   $("#bustripMainGrid").data("kendoGrid").dataSource.read();
               }
            }
        })
    },

}