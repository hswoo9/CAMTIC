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

        prjCorpMng.mainGrid("/setManagement/getCorpProjectList", prjCorpMng.global.searchAjaxData);
    },

    mainGrid : function (url, params){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/setManagement/getCorpProjectList',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    return data;
                }
            },
            schema : {
                data: function (data) {
                    return data.list;
                },
                total: function (data) {
                    return data.list.length;
                },
            },
            pageSize: 10,
        });

        $("#mainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 551,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 30, 50, 100 ],
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
                    field: "CORP_PJT_CD",
                    title: "프로젝트 코드",
                    width: 80
                }, {
                    field: "CORP_PJT_NM",
                    title: "프로젝트 명",
                    width: 400,
                    template: function(e){
                        return '<a href="javascript:void(0);" style="font-weight: bold;" onclick="prjCorpMng.fn_popCorpProject(\'' + e.CORP_PJT_SN + '\')";>' + e.CORP_PJT_NM + '</a>'
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
                        if(e.STATUS == "0"){
                            return '작성중';
                        }else if(e.STATUS == "10"){
                            return '승인요청 중';
                        }else{
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
            url += "?corpPjtSn=" + key + "&mode=mng";
        }
        var name = "_blank";
        var option = "width = 900, height = 700, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    }

}

function gridReload(){
    prjCorpMng.gridReload();
}