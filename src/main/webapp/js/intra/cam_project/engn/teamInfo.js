var teamInfo = {

    fn_defaultScript: function (){


        customKendo.fn_textBox(["teamPjtNm", "teamPMNm", "teamCrmNm", "teamAmt",
                                "exptBalance", "exptProfit", "exptProfitPer", "teamPjt", "exptCost"]);

        var data = {

        }
        data.deptLevel = 1;
        var deptDsA = customKendo.fn_customAjax("/dept/getDeptAList", data);

        customKendo.fn_dropDownList("teamDept", deptDsA.rs, "dept_name", "dept_seq", "6");

        $("#teamDept").data("kendoDropDownList").bind("change", teamInfo.fn_chngDeptComp)
        $("#teamDept").data("kendoDropDownList").select(0);
        $("#teamDept").data("kendoDropDownList").trigger("change");

        $("#exptBalance").val($("#expAmt").val());
        $("#exptCost").val($("#expAmt").val());

        $("#teamAmt, #exptProfitPer").on("keyup", function(){
            $("#exptBalance").val(teamInfo.comma(teamInfo.uncomma($("#expAmt").val()) - teamInfo.uncomma($("#teamAmt").val())));

            if(teamInfo.uncomma($("#exptProfitPer").val()) >= 0 && teamInfo.uncomma($("#exptProfitPer").val()) <= 100){
                $("#exptProfit").val(Math.round(teamInfo.uncomma($("#exptBalance").val()) * (teamInfo.uncomma($("#exptProfitPer").val()) * 0.01)));
                $("#exptCost").val(teamInfo.uncomma($("#exptBalance").val()) - Math.round(teamInfo.uncomma($("#exptBalance").val()) * (teamInfo.uncomma($("#exptProfitPer").val()) * 0.01)));
            } else{
                $("#exptProfit").val(0);
                $("#exptCost").val(teamInfo.uncomma($("#exptBalance").val()));
            }
        });


        teamInfo.teamMainGrid();
    },

    fn_save:function(){
        var parameters = {
            pjtSn : $("#pjtSn").val(),
            tmDeptSeq : $("#teamDept").val(),
            tmTeamSeq : $("#team").val(),
            tmPMSeq : $("#teamPMSeq").val(),
            tmCrmSn : $("#teamCrmSn").val(),
            tmAmt : teamInfo.uncomma($("#teamAmt").val()),
            tmBalance : teamInfo.uncomma($("#exptBalance").val()),
            tmExptProfit : teamInfo.uncomma($("#exptProfit").val()),
            tmExptPer : teamInfo.uncomma($("#exptProfitPer").val()),
            tmExptCost : teamInfo.uncomma($("#exptCost").val())
        }

        $.ajax({
            url : "/project/engn/setTeamInfo",
            data : parameters,
            type : "post",
            dataType : "json",
            success : function (rs){
                if(rs.code == 200){
                    alert("저장되었습니다.");
                    window.location.href="/project/pop/viewRegProject.do?pjtSn=" + parameters.pjtSn + "&tab=9";
                }
            }
        })
    },

    fn_chngDeptComp : function (){
        var data = {}
        data.deptLevel = 2;
        data.parentDeptSeq = this.value();

        var ds = customKendo.fn_customAjax("/dept/getDeptAList", data);
        customKendo.fn_dropDownList("team", ds.rs, "dept_name", "dept_seq","5")
    },

    fn_popCamCrmList : function (){
        var url = "/crm/pop/popCrmList.do";
        var name = "_blank";
        var option = "width = 1300, height = 670, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    inputNumberFormat : function (obj){
        obj.value = teamInfo.comma(teamInfo.uncomma(obj.value));
    },

    comma: function(str) {
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    },

    uncomma: function(str) {
        str = String(str);
        return str.replace(/[^\d]+/g, '');
    },

    teamMainGrid:function () {
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/project/engn/getTeamList',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.pjtSn = $("#pjtSn").val();
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

        $("#teamMainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 508,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 30, 50, 100 ],
                buttonCount : 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound: function (e){
                const grid = this;
                grid.tbody.find("tr").each(function (){
                    $(this).css("background-color", "#ffffff");
                });
                grid.tbody.find("tr").click(function (e) {
                    const dataItem = grid.dataItem($(this));
                    $("#teamDept").data("kendoDropDownList").value(dataItem.TM_DEPT_SEQ);
                    $("#team").data("kendoDropDownList").value(dataItem.TM_TEAM_SEQ);
                    $("#teamPMNm").val(dataItem.EMP_NAME);
                    $("#teamPMSeq").val(dataItem.TM_PM_SEQ);
                    $("#teamCrmNm").val(dataItem.CRM_NM);
                    $("#teamCrmSn").val(dataItem.TM_CRM_SN);
                    $("#teamAmt").val(teamInfo.comma(dataItem.TM_AMT));
                    $("#exptBalance").val(teamInfo.comma(dataItem.TM_BALANCE));
                    $("#exptProfit").val(teamInfo.comma(dataItem.TM_EXPT_PROFIT));
                    $("#exptProfitPer").val(teamInfo.comma(dataItem.TM_EXPT_PER));
                    $("#exptCost").val(teamInfo.comma(dataItem.TM_EXPT_COST));

                    $(this).css("background-color", "#a7e1fc");

                    $("#btnDiv2").css("display", "");
                    $("#btnDiv").css("display", "none");
                });
            },
            columns: [
                {
                    field: "",
                    title: "구분",
                    width: 100
                }, {
                    field: "DEPT_NAME",
                    title: "부서",
                    width: 200
                }, {
                    field: "TEAM_NAME",
                    title: "팀",
                    width: 200,

                }, {
                    field: "EMP_NAME",
                    title: "담당자",
                    width: 150
                }, {
                    field: "TM_AMT",
                    title: "협업예산",
                    width: 200,
                    template: function(e){
                        return '<p style="text-align: right">' + teamInfo.comma(e.TM_AMT) + '원</p>'
                    }
                }, {
                    field: "",
                    title: "진행상태",
                    width: 100,
                    template :function (e){
                        console.log(e);
                        var pjtStepNm = "상담";
                        if(e.PJT_STEP == "E0"){
                            pjtStepNm = "상담";
                        } else if(e.PJT_STEP == "E1"){
                            pjtStepNm = "견적";
                        } else if(e.PJT_STEP == "E2"){
                            pjtStepNm = "수주";
                        } else if(e.PJT_STEP == "E3"){
                            pjtStepNm = "개발계획";
                        } else if(e.PJT_STEP == "E4"){
                            pjtStepNm = "공정";
                        } else if(e.PJT_STEP == "E5"){
                            pjtStepNm = "납품";
                        } else if(e.PJT_STEP == "E6"){
                            pjtStepNm = "결과보고";
                        } else if(e.PJT_STEP == "E7"){
                            pjtStepNm = "원가보고";
                        }
                        return pjtStepNm;
                    }
                }, {
                    title: "배분비율",
                    width: 100,
                    template: function (e){
                        return e.TM_EXPT_PER + "%"
                    }
                }, {
                    field: "",
                    title: "보고서",
                    width: 150
                }, {
                    title: "협업취소",
                    width: 80,
                    template: function(e){
                        return '<button type="button" class="k-button k-button-solid-error" onclick="teamInfo.fn_cancel('+e.TM_SN+')">취소</button>'
                    }
                }

            ]
        }).data("kendoGrid");
    },

    fn_cancel : function (key){
        if(!confirm("등록된 협업을 취소하시겠습니까?"+ key)){
            return ;
        }
    },

    fn_reset: function (){
        var table = $("#teamMainGrid").data("kendoGrid");
        table.tbody.find("tr").each(function (){
            $(this).css("background-color", "#ffffff");
        });
        $("#btnDiv2").css("display", "none");
        $("#btnDiv").css("display", "");

        $("#teamDept").data("kendoDropDownList").value("");
        $("#team").data("kendoDropDownList").value("");
        $("#teamPMNm").val("");
        $("#teamPMSeq").val("");
        $("#teamCrmNm").val("");
        $("#teamCrmSn").val("");
        $("#teamAmt").val(0);
        $("#exptBalance").val(teamInfo.comma($("#expAmt").val()));
        $("#exptProfit").val(0);
        $("#exptProfitPer").val(0);
        $("#exptCost").val(teamInfo.comma($("#exptBalance").val()));
    }
}