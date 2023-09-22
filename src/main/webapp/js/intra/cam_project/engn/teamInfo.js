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

    },

    fn_save:function(){
        var parameters = {
            pjtSn : $("#pjtSn").val(),
            deptSeq : $("#teamDept").val(),
            tmTeamSeq : $("#team").val(),
            tmPMSeq : $("#teamPMSeq").val(),
            tmCrmSn : $("#teamCrmSn").val(),
            tmAmt : $("#teamAmt").val(),
            tmExptBalance : $("#exptBalance").val(),
            tmExptProfit : $("#exptProfit").val(),
            tmExptPer : $("#exptProfitPer").val(),
            tmExptCost : $("#exptCost").val()
        }
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
}