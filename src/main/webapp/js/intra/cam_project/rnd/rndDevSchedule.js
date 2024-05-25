var rndDS = {

    fn_defaultScript: function(){

        rndDS.rndDSMainGrid();
    },

    gridReload : function (){
        $("#rndDSMainGrid").data("kendoGrid").dataSource.read();
    },

    rndDSMainGrid : function () {
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: "/projectRnd/getRndDevScheduleList",
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

        $("#rndDSMainGrid").kendoGrid({
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
                    field: "DEV_SCH_CD",
                    title: "코드번호",
                    width: 80
                }, {
                    title: "업무내용",
                    field: "DEV_SCH_NM",
                    template: function (e){
                        return '<div style="font-weight: bold; cursor: pointer;" onclick="rndDS.fn_popAddJob('+e.DEV_SCH_SN+')">'+e.DEV_SCH_NM+'</div>'
                    },
                    width: 150
                }, {
                    title: "예정일",
                    field: "SCH_STR_DE",
                    width: 180,
                }, {
                    title: "처리일",
                    field: "SCH_END_DE",
                    width: 180
                }, {
                    title: "처리자",
                    field: "EMP_NAME_KR",
                    width: 180
                }, {
                    title: "파일명",
                    width: 180,
                    template : function(e){
                        if(e.file_org_name != null){
                            return e.file_org_name + "." + e.file_ext;
                        } else{
                            return "";
                        }
                    }
                }, {
                    title: "비고",
                    field: "DEV_SCH_ETC",
                    width: 180
                }, {
                    title: "상태",
                    width: 100,
                    template: function(e){
                        if(e.SCH_STAT == "Y"){
                            return "<div style='color : blue'>완료</div>";
                        } else {
                            return "<div style='color: red'>예정</div>";
                        }
                    }
                }, {
                    title: '삭제',
                    width: 100,
                    template: function(e){
                        return '<button id="btnDel" class="k-button k-button-solid-error" onclick="rndDS.fn_delDevSch('+e.DEV_SCH_SN+')">삭제</button>'
                    }
                }
            ],

            dataBinding: function() {
                record = (this.dataSource.page() -1) * this.dataSource.pageSize();
            }
        }).data("kendoGrid");
    },

    fn_popDevSch : function (){
        var data = {
            pjtSn : $("#pjtSn").val()
        }
        var url = "/projectRnd/pop/popDevSch.do?pjtSn="+data.pjtSn;
        var name = "_blank";
        var option = "width = 900, height = 500, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    fn_popTotDevSch : function (){
        var data = {
            pjtSn : $("#pjtSn").val()
        }
        var url = "/projectRnd/pop/popTotDevSch.do?pjtSn="+data.pjtSn;
        var name = "_blank";
        var option = "width = 900, height = 540, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
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
    },


    fn_delDevSch: function (key) {
        var data = {
            devSchSn: key
        }
        var rs = customKendo.fn_customAjax("/projectRnd/delDevSch", data);


        rndDS.rndDSMainGrid();
    }
}