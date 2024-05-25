var prjCorp = {

    global : {
        searchAjaxData : ""
    },

    fn_defaultScript : function (){
        prjCorp.gridReload();
    },

    gridReload : function (){
        prjCorp.global.searchAjaxData = {
        }

        prjCorp.mainGrid("/setManagement/getCorpProjectList", prjCorp.global.searchAjaxData);
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
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="prjCorp.gridReload()">' +
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
                    field: "CORP_PJT_CD",
                    title: "프로젝트 코드",
                    width: 80
                }, {
                    field: "CORP_PJT_NM",
                    title: "프로젝트 명",
                    width: 400,
                    template: function(e){
                        return '<a href="javascript:void(0);" style="font-weight: bold;" onclick="prjCorp.fn_popCorpProject(\'' + e.CORP_PJT_SN + '\')";>' + e.CORP_PJT_NM + '</a>'
                    }
                }, {
                    field: "STR_DT",
                    title: "시작일자",
                    width: 80,
                }, {
                    field: "END_DT",
                    title: "종료일자",
                    width: 80,
                }, {
                    title: "상태",
                    width: 80,
                    template: function(e){
                        if(e.CONFIRM_YN == 'N'){
                            return '작성중';
                        } else {
                            return '승인';
                        }
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    fn_popCorpProject: function (key){
        var url = "/setManagement/pop/setCorpProject.do";

        if(key != null && key != "" && key != undefined){
            url += "?corpPjtSn=" + key + "&mode=user";
        }
        var name = "_blank";
        var option = "width = 900, height = 700, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    }

}

function gridReload(){
    prjCorp.gridReload();
}