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
                        return '<div style="text-align: left; font-weight: bold; cursor: pointer" onclick="teamList.fn_projectPopView('+e.PJT_SN+', \'' + e.BUSN_CLASS + '\')">' + pjtNm + '</div>';
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
                            return '<button type="button" class="k-button k-button-solid-info" onclick="teamList.teamPrintPop('+row.PJT_SN+', '+row.TEAM_VERSION_SN+', '+row.TM_SN+')">협업보고서</button></td>';
                        }
                    }
                }
            ]
        });
    },

    teamPrintPop: function(pjtSn, versionSn, tmSn){
        let url = "/project/pop/teamPrintPop.do?pjtSn="+pjtSn+"&teamVersionSn="+versionSn+"&tmSn="+tmSn;
        const name = "teamPrintPop";
        const option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";
        window.open(url, name, option);
    },


    // project 상세페이지
    fn_projectPopView : function (key, cs){
        var uid = $("#regEmpSeq").val()
        var rs = customKendo.fn_customAjax("/project/getProjectData", { pjtSn: key });
        var mem = customKendo.fn_customAjax("/project/projectEnterMemberList", { pjtSn: key });
        console.log(rs);
        console.log(mem);


        var pral = mem.list.partRateAdminList;
        var prml = mem.list.partRateMemberList;
        var pml = mem.list.psMemberList;
        var aml = mem.list.aceMemberList;
        var trl = mem.list.teamReaderList;
        var flag = false;

        if(rs.data.PM_EMP_SEQ == uid || rs.data.REG_EMP_SEQ == uid || rs.data.EMP_SEQ == uid){
            flag = true;
        }

        for(var i = 0; i < prml.length; i++){
            if(prml[i].PART_EMP_SEQ == uid){
                flag = true
            }
        }

        for(var i = 0; i < pral.length; i++){
            if(pral[i].EMP_SEQ == uid){
                flag = true
            }
        }

        for(var i = 0 ; i < pml.length ; i++){
            if(pml[i].PS_EMP_SEQ == uid){
                flag = true
            }
        }

        for(var i = 0 ; i < aml.length ; i++){
            if(aml[i].EMP_SEQ == uid){
                flag = true
            }
        }

        for(var i = 0 ; i < trl.length ; i++){
            if(trl[i].EMP_SEQ == uid){
                flag = true
            }
        }

        /** 마스터 체크 */
        if($("#regEmpSeq").val() == "1"){
            flag = true;
        }

        /** 팀장, 부서장 체크 */
        if($("#regDutyCode").val() != ""){
            flag = true;
        }

        if(flag){
            var url = "/project/pop/viewRegProject.do?pjtSn=" + key;

            if(cs == "R"){
                url = "/projectRnd/pop/regProject.do?pjtSn=" + key;
            } else if (cs == "S"){
                url = "/projectUnRnd/pop/regProject.do?pjtSn=" + key;
            }
            var name = "_blank";
            var option = "width = 1680, height = 850, top = 100, left = 200, location = no";

            var popup = window.open(url, name, option);
        } else {
            alert("참여중인 프로젝트가 아닙니다.");
            return;
        }

    }
}