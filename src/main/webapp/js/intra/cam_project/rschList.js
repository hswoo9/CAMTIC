var popRschList = {


    global : {

    },


    fn_deafultScript: function (){

        popRschList.popMainGrid();

    },


    popGridReload: function (){
        $("#popMainGrid").data("kendoGrid").dataSource.read();
    },

    popMainGrid : function () {
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: "/projectRnd/getPopRschList",
                    dataType: "json",
                    type: "post"
                },
                parameterMap: function(data){

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

        $("#popMainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 480,
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
                    template: "#= ++record #",
                    title: "번호",
                    width : 80
                }, {
                    field: "RSCH_NM",
                    title: "이름",
                    width: 80
                }, {
                    title: "소속",
                    width: 100,
                    template: function(e){
                        return "캠틱";
                    }
                }, {
                    title: "권한",
                    field: "RSCH_POSITION",
                    width: 180
                }, {
                    title: "주민등록번호",
                    field: "RSCH_ID_NO",
                    width: 180
                }, {
                    title: "",
                    template: function(row){
                        console.log(row);
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-info" onclick="popRschList.fn_selRsch('+row.RSCH_SN+')">선택</button>';
                    },
                    width: 60
                }
            ],

            dataBinding: function() {
                record = (this.dataSource.page() -1) * this.dataSource.pageSize();
            }
        }).data("kendoGrid");
    },

    fn_selRsch: function (e){

        var data= {
            rschSn : e,
            pjtSn : $("#pjtSn").val(),
            empSeq : $("#empSeq").val()
        }
        var rs = customKendo.fn_customAjax("/projectRnd/getRschInfo", data);
        var rs = rs.list.length;

        if(rs > 0){
            alert("이미 해당 연구원이 추가되어있습니다.");
            return;
        } else {
            customKendo.fn_customAjax("/projectRnd/setRschData", data);
        }


        opener.parent.rndRschInfo.gridReload();
        window.close();
    }

}