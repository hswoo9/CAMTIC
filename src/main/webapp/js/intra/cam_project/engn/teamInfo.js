var teamInfo = {

    fn_defaultScript : function (){
        commonProject.setPjtStat();

        customKendo.fn_textBox(["teamPjtNm", "teamPMNm", "teamCrmNm", "teamAmt", "team",
                                "exptBalance", "exptProfit", "exptProfitPer", "teamPjt", "exptCost"]);

        var data = {

        }
        // data.deptLevel = 1;
        // var deptDsA = customKendo.fn_customAjax("/dept/getDeptAList", data);
        //
        // customKendo.fn_dropDownList("teamDept", deptDsA.rs, "dept_name", "dept_seq", "6");
        //
        // $("#teamDept").data("kendoDropDownList").bind("change", teamInfo.fn_chngDeptComp)
        // $("#teamDept").data("kendoDropDownList").select(0);
        // $("#teamDept").data("kendoDropDownList").trigger("change");

        if($("#pjtStep").val() < 'E3'){
            let data = {
                pjtSn : $("#pjtSn").val()
            }
            var result = customKendo.fn_customAjax("/project/engn/getDelvData", data);
            var delvMap = result.delvMap;
            if(delvMap != null){
                $("#delvAmt2").val(comma(delvMap.DELV_AMT));
                $("#expAmt").val(comma(delvMap.DELV_AMT));
            }
        }
        $("#exptBalance").val($("#expAmt").val());
        $("#exptCost").val($("#expAmt").val());

        $("#teamAmt, #exptProfitPer").on("keyup", function(){
            if($("#pjtStep").val() == "R" || $("#pjtStep").val() == "S"){
                $("#exptBalance").val(comma(uncomma($("#pjtExpAmt").val()) - uncomma($("#teamAmt").val())));
            } else {
                $("#exptBalance").val(comma(uncomma($("#expAmt").val()) - uncomma($("#teamAmt").val())));
            }


            if(uncomma($("#exptProfitPer").val()) >= 0 && uncomma($("#exptProfitPer").val()) <= 100){
                $("#exptProfit").val(comma(Math.round(uncomma($("#exptBalance").val()) * (uncomma($("#exptProfitPer").val()) * 0.01))));
                $("#exptCost").val(comma(uncomma($("#exptBalance").val()) - Math.round(uncomma($("#exptBalance").val()) * (uncomma($("#exptProfitPer").val()) * 0.01))));
            } else{
                $("#exptProfit").val(0);
                $("#exptCost").val(comma($("#exptBalance").val()));
            }
        });

        if($("#pjtStep").val().toString().substring(0,1) == "R"){
            $("#teamCrmSn").val($("#rndCrmSn").val());
            $("#teamCrmNm").val($("#rndCrmNm").val());
        } else if ( $("#pjtStep").val().toString().substring(0,1) == "S"){
            $("#teamCrmSn").val($("#rndCrmSn").val());
            $("#teamCrmNm").val($("#rndCrmNm").val());
        }


        teamInfo.teamMainGrid();
    },

    // fn_chngDeptComp : function (){
    //     var data = {}
    //     data.deptLevel = 2;
    //     data.parentDeptSeq = this.value();
    //
    //     var ds = customKendo.fn_customAjax("/dept/getDeptAList", data);
    //     customKendo.fn_dropDownList("team", ds.rs, "dept_name", "dept_seq","5")
    // },

    teamMainGrid : function (){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: '/project/engn/getTeamList',
                    dataType: "json",
                    type: "post"
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
            pageable: {
                refresh: true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount: 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound: function (e){
                const grid = this;

                grid.tbody.find("tr").click(function (e) {
                    grid.tbody.find("tr").each(function (){
                        $(this).css("background-color", "");
                    });

                    const dataItem = grid.dataItem($(this));
                    $("#team").val(dataItem.DEPT_NAME);
                    $("#teamSeq").val(dataItem.DEPT_SEQ);
                    $("#teamPMNm").val(dataItem.EMP_NAME);
                    $("#teamPMSeq").val(dataItem.TM_PM_SEQ);
                    //$("#teamCrmNm").val(dataItem.CRM_NM);
                    //$("#teamCrmSn").val(dataItem.TM_CRM_SN);
                    $("#teamAmt").val(comma(dataItem.TM_AMT));
                    $("#exptBalance").val(comma(dataItem.TM_BALANCE));
                    $("#exptProfit").val(comma(dataItem.TM_EXPT_PROFIT));
                    $("#exptProfitPer").val(comma(dataItem.TM_EXPT_PER));
                    $("#exptCost").val(comma(dataItem.TM_EXPT_COST));

                    $(this).css("background-color", "#a7e1fc");

                    $("#btnDiv2").css("display", "");
                    $("#btnDiv").css("display", "none");
                });
            },
            columns: [
                {
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
                        return '<p style="text-align: right">' + comma(e.TM_AMT) + '원</p>'
                    }
                }, {
                    field: "",
                    title: "진행상태",
                    width: 100,
                    template: function(e){
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
                    template: function(e){
                        console.log(e);
                        console.log(e.TM_AMT, "/", uncomma($("#pjtAmt").val()));
                        if($("#pjtStep").val().toString().substring(0, 1) == "R"){
                            let per;
                            per = (Number(e.TM_AMT) / Number(uncomma($("#pjtExpAmt").val()))) * 100;
                            return Number.isInteger(per) ? (per + "%") : (per.toFixed(2) + "%");
                        } else {
                            if($("#pjtStep").val() < 'E3'){
                                let per;
                                per = (Number(e.TM_AMT) / Number(uncomma($("#delvAmt2").val()))) * 100;
                                console.log("delvAmt2 : "+Number(uncomma($("#delvAmt2").val())));
                                console.log("1 per : "+per);
                                console.log(Number.isInteger(per) ? (per + "%") : (per.toFixed(2) + "%"));
                                return Number.isInteger(per) ? (per + "%") : (per.toFixed(2) + "%");
                            }else{
                                let per;
                                per = (Number(e.TM_AMT) / Number(uncomma(e.PJT_AMT))) * 100;
                                console.log("PJT_AMT : "+Number(uncomma(e.PJT_AMT)));
                                console.log("2 per : "+per);
                                console.log(Number.isInteger(per) ? (per + "%") : (per.toFixed(2) + "%"));
                                return Number.isInteger(per) ? (per + "%") : (per.toFixed(2) + "%");
                            }
                        }
                    }
                }, {
                    title: "협업취소",
                    width: 80,
                    template: function(e){
                        console.log(e);
                        return '<button type="button" class="k-button k-button-solid-error" onclick="teamInfo.fn_cancel('+e.TM_SN+')">취소</button>'
                    }
                }
            ]
        }).data("kendoGrid");
    },

    fn_save : function (){
        if(!confirm("협업요청을 하시겠습니까?")){
            return;
        }

        var parameters = {
            pjtSn : $("#pjtSn").val(),
            tmDeptSeq : $("#teamDept").val(),
            tmTeamSeq : $("#teamSeq").val(),
            tmPMSeq : $("#teamPMSeq").val(),
            tmCrmSn : $("#teamCrmSn").val(),
            tmAmt : uncomma($("#teamAmt").val()),
            tmBalance : uncomma($("#exptBalance").val()),
            tmExptProfit : uncomma($("#exptProfit").val()),
            tmExptPer : uncomma($("#exptProfitPer").val()),
            tmExptCost : uncomma($("#exptCost").val())
        }

        if(parameters.tmTeamSeq == ""){
            alert("협업팀을 선택해주세요.");
            return;
        }
        if(parameters.tmPMSeq == ""){
            alert("담당자를 선택해주세요.");
            return;
        }
        if(parameters.tmAmt == ""){
            alert("배분금액을 선택해주세요.");
            return;
        }


        $.ajax({
            url : "/project/engn/setTeamInfo",
            data : parameters,
            type : "post",
            dataType : "json",
            success : function (rs){
                if(rs.code == 200){
                    alert("저장되었습니다.");
                    opener.gridReload();
                    commonProject.getReloadPage(5, 5, 5);
                }
            }
        })
    },

    fn_cancel : function (key){
        if(!confirm("등록된 협업을 취소하시겠습니까?")){
            return ;
        }

        var data = {
            tmSn : key,
            pjtSn : $("#pjtSn").val()
        }
        var rs = customKendo.fn_customAjax("/project/delTeamProject",data);
        commonProject.getReloadPage(5, 5, 5);
    },

    fn_reset : function (){
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
        $("#exptBalance").val(comma($("#expAmt").val()));
        $("#exptProfit").val(0);
        $("#exptProfitPer").val(0);
        $("#exptCost").val(comma($("#exptBalance").val()));
    },

    fn_popCamCrmList : function (){
        var url = "/crm/pop/popCrmList.do";
        var name = "_blank";
        var option = "width = 1300, height = 670, top = 200, left = 400, location = no";
        var popup = window.open(url, name, option);
    }
}