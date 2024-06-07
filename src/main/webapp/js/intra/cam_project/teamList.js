var teamList = {

    global : {
        searchAjaxData : ""
    },

    fn_defaultScript : function (){
        teamList.gridReload();
    },

    gridReload : function (){
        teamList.global.searchAjaxData = {
            regEmpSeq: $("#regEmpSeq").val()
        }

        teamList.mainGrid("/project/team/getTeamListAll", teamList.global.searchAjaxData);
    },

    mainGrid : function (url, params){
        $("#teamListGrid").kendoGrid({
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
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="teamList.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                },

            ],
            detailTemplate : kendo.template($("#template").html()),
            detailInit: teamList.detailInit,
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    title: "연번",
                    template: "#= --record #",
                    width: 50
                }, {
                    field: "BUSN_NM",
                    title: "사업구분",
                    width: 100
                }, {
                    field: "PJT_CD",
                    title: "프로젝트 코드",
                    width: 100,
                    template: function(e){
                        if(e.DELV_APPROVE_STAT == "100"){
                            return e.PJT_CD;
                        }else{
                            return "";
                        }
                    }
                }, {
                    field: "PJT_NM",
                    title: "프로젝트 명",
                    template: function(e){
                        var pjtNm = e.PJT_NM;
                        return '<div style="text-align: left; font-weight: bold; cursor: pointer" onclick="camPrj.fn_projectPopView('+e.PJT_SN+', \'' + e.BUSN_CLASS + '\')">' + pjtNm + '</div>';
                    }
                }, {
                    field: "TEAM_REG_DATE",
                    title: "등록일",
                    width: 150
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    detailInit : function(e){
        var detailRow = e.detailRow;

        var dataSource = new kendo.data.DataSource({
            serverPaging: false,
            serverSorting: false,
            serverFiltering: false,
            pageSize: 10,
            filter: { field: "PJT_SN", operator: "eq", value: e.data.PJT_SN },
            schema : {
                data: function (data) {
                    return e.data.teamDetailList;
                },
                total: function (data) {
                    return e.data.teamDetailList.length;
                },
            }
        });

        detailRow.find(".subGrid").kendoGrid({
            dataSource: e.data.teamDetailList,
            scrollable: false,
            sortable: true,
            pageable: false,
            columns: [
                {
                    title: "총예산",
                    template: function (row){
                        return "<div style='text-align: right'>"+comma(row.REAL_PJT_AMT)+"</div>";
                    }
                }, {
                    field: "TEAM_NAME",
                    title: "팀",
                }, {
                    title: "협업예산",
                    template: function (row){
                        if(row.STATUS == "100"){
                            return "<div style='text-align: right'>"+comma(row.TM_AMT)+"</div>";
                        }else{
                            return "<div style='text-align: center'>작성중</div>";
                        }
                    }
                }, {
                    title: "배분비율",
                    template: function (row){
                        if(row.STATUS == "100"){
                            const per = Math.round(Number(row.TM_AMT) / Number(row.REAL_PJT_AMT) * 100) + "%";
                            return "<div style='text-align: right'>"+per+"</div>";
                        }else{
                            return "<div style='text-align: center'>작성중</div>";
                        }
                    }
                }, {
                    title: "예상비용",
                    template: function (row){
                        if(row.STATUS == "100"){
                            return "<div style='text-align: right'>"+comma(row.TM_INV_AMT)+"</div>";
                        }else{
                            return "<div style='text-align: center'>작성중</div>";
                        }
                    }
                }, {
                    title: "예상수익",
                    template: function (row){
                        if(row.STATUS == "100"){
                            const per = Math.round(100 - Number(row.TM_INV_AMT / uncomma(row.REAL_PJT_AMT) * 100)) + "%";
                            return "<div style='text-align: right'>"+per+"</div>";
                        }else{
                            return "<div style='text-align: center'>작성중</div>";
                        }
                    }
                }, {
                    title: "협업보고서",
                    template: function (row){
                        if(row.PJT_NM == "0"){
                            return row.REAL_PJT_AMT;
                        }else{
                            return '<button type="button" class="k-button k-button-solid-info" onclick="teamEngn.teamPrintPop('+row.TEAM_VERSION_SN+', '+row.TM_SN+')">협업보고서</button></td>';
                        }
                    }
                }
            ]
        });
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
    teamList.gridReload();
}