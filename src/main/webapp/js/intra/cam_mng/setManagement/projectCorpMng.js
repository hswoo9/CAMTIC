var prjCorpMng = {

    global : {
        searchAjaxData : ""
    },

    fn_defaultScript : function (){
        prjCorpMng.gridReload();
    },

    gridReload : function (){
        prjCorpMng.global.searchAjaxData = {
        }

        prjCorpMng.mainGrid("/setManagement/getCorpProjectListMng", prjCorpMng.global.searchAjaxData);
    },

    mainGrid : function (url, params){
        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 551,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount : 5
            },
            toolbar: [
                {
                    name: 'button',
                    template: function (e) {
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="prjCorpMng.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                },

            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    title: "연번",
                    template: "#= --record #",
                    width: 30
                }, {
                    field: "BUSN_NM",
                    title: "프로젝트 종류",
                    width: 80
                }, {
                    field: "PJT_TMP_CD",
                    title: "프로젝트 코드",
                    width: 80
                }, {
                    field: "PJT_NM",
                    title: "프로젝트 명",
                    width: 560,
                    template: function(e){
                        if(e.BUSN_CLASS == "D" || e.BUSN_CLASS == "R" || e.BUSN_CLASS == "S"|| e.BUSN_CLASS == "V"){
                            return '<a href="javascript:void(0);" style="font-weight: bold;" onclick="prjCorpMng.fn_popDelvProject(\'' + e.PJT_SN + '\')";>' + e.PJT_NM + '</a>'
                        }
                        return '<a href="javascript:void(0);" style="font-weight: bold;" onclick="prjCorpMng.fn_popCorpProject(\'' + e.PJT_SN + '\')";>' + e.PJT_NM + '</a>'
                    }
                },/* {
                    field: "STR_DT",
                    title: "시작일자",
                    width: 80,
                }, {
                    field: "END_DT",
                    title: "종료일자",
                    width: 80,
                },*/ {
                    title: "PM",
                    width: 80,
                    template: function(e){
                        if(e.BUSN_CLASS == "D" || e.BUSN_CLASS == "V"){
                            return e.ENGN_PM_NM || "";
                        }else{
                            return e.PM_NM || "";
                        }
                    }
                }, {
                    field: "REG_DATE",
                    title: "요청일자",
                    width: 80,

                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    fn_popDelvProject: function (key){
        var url = "/setManagement/pop/setDelvProject.do";

        if(key != null && key != "" && key != undefined){
            url += "?pjtSn=" + key + "&mode=mng";
        }
        var name = "_blank";
        var option = "width = 900, height = 476, top = 200, left = 400, location = no";
        var popup = window.open(url, name, option);
    },

    fn_popCorpProject: function (key){
        var url = "/setManagement/pop/setCorpProject.do";

        if(key != null && key != "" && key != undefined){
            url += "?corpPjtSn=" + key + "&mode=mng";
        }
        var name = "_blank";
        var option = "width = 900, height = 700, top = 200, left = 400, location = no";
        var popup = window.open(url, name, option);
    }
}

function gridReload(){
    prjCorpMng.gridReload();
}