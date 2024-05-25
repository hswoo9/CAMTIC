var teamMng = {

    global : {
        searchAjaxData : ""
    },

    fn_defaultScript : function (){
        teamMng.gridReload();
    },

    gridReload : function (){
        teamMng.global.searchAjaxData = {
            regEmpSeq: $("#regEmpSeq").val()
        }

        teamMng.mainGrid("/project/team/getTeamMngList", teamMng.global.searchAjaxData);
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
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="teamMng.gridReload()">' +
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
                        return '<a href="javascript:void(0);" style="font-weight: bold;" onclick="teamMng.fn_popDelvProject(\'' + e.PJT_SN + '\', \'' + e.TEAM_VERSION_SN + '\')";>' + e.PJT_NM + '</a>';
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    fn_popDelvProject: function (key, version){
        let url = "/intra/cam_project/setTeamProject.do";

        if(key != null && key != "" && key != undefined){
            url += "?pjtSn=" + key + "&teamVersionSn=" + version;
        }else{
            alert("데이터 조회 중 오류가 발생하였습니다. 새로고침 후 재시도 바랍니다."); return;
        }
        const name = "setTeamProject";
        const option = "width = 1400, height = 750, top = 100, left = 200, location = no";
        window.open(url, name, option);
    }
}

function gridReload(){
    teamMng.gridReload();
}