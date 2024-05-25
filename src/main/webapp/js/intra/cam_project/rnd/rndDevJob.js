var rndDJ = {


    fn_defaultScript: function (){

        rndDJ.rndDJMainGrid();
    },

    gridReload : function (){
        $("#rndDJMainGrid").data("kendoGrid").dataSource.read();
    },

    rndDJMainGrid : function () {
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: "/projectRnd/getRndDevJobList",
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

        $("#rndDJMainGrid").kendoGrid({
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
                    field: "DEV_SCH_TITLE",
                    title: "제목",
                    width: 500,
                    template: function(e){
                        return '<div style="font-weight: bold; cursor: pointer;" onclick="rndDJ.fn_popAddJob('+e.DEV_SCH_SN+')">'+e.DEV_SCH_TITLE+'</div>';
                    }
                }, {
                    title: "개발일정",
                    width: 150,
                    template: function(e){
                        return "[" + e.DEV_SCH_CD + "] " + e.DEV_SCH_NM;
                    }
                }, {
                    title: "완료여부",
                    width: 180,
                    template: function(e){
                        if(e.SCH_STAT == "Y"){
                            return "완료";
                        } else {
                            return "진행중";
                        }
                    }
                }, {
                    title: "날짜",
                    field: "SCH_END_DE",
                    width: 180
                }, {
                    title: "작성자",
                    field: "EMP_NAME_KR",
                    width: 180
                }
            ],

            dataBinding: function() {
                record = (this.dataSource.page() -1) * this.dataSource.pageSize();
            }
        }).data("kendoGrid");
    },

    fn_popAddJob : function (key){

        var data = {
            pjtSn : $("#pjtSn").val()
        }
        var url = "/projectRnd/pop/popDevJob.do?pjtSn="+data.pjtSn;

        if(key != null && key != ""){
            url = "/projectRnd/pop/popDevJob.do?pjtSn="+data.pjtSn + "&devSchSn=" + key;
        }
        var name = "_blank";
        var option = "width = 900, height = 800, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    }
}