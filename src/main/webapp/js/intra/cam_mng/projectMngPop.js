var pjtMngPop = {

    global : {
        params : "",
    },

    fn_defaultScript : function (){
        var setParameters = customKendo.fn_customAjax("/mng/getG20ProjectData", {pjtCd: $("#mgtCd").val()}).data;

        pjtMngPop.global.params = setParameters;

        var frDt = pjtMngPop.global.params.FR_DT;
        var toDt = pjtMngPop.global.params.TO_DT;
        frDt = frDt.substring(0,4) + "-" + frDt.substring(4,6) + "-" + frDt.substring(6)
        toDt = toDt.substring(0,4) + "-" + toDt.substring(4,6) + "-" + toDt.substring(6)

        customKendo.fn_datePicker("frDt", "", "yyyy-MM-dd", frDt);
        customKendo.fn_datePicker("toDt", "", "yyyy-MM-dd", toDt);
        customKendo.fn_textBox(["pjtCd", "pjtName"]);

        var tab0Url = "/mng/pop/incmExpInfo.do";
        var tab1Url = "/mng/pop/bgtItemInfo.do";

        if (pjtMngPop.global.params != null && pjtMngPop.global.params.PJT_CD != null) {
            tab0Url += "?pjtCd=" + pjtMngPop.global.params.PJT_CD;
            tab1Url += "?pjtCd=" + pjtMngPop.global.params.PJT_CD;
        }

        var tabstrip =  $("#tabstrip").kendoTabStrip({
            animation:  {
                open: {
                    effects: "fadeIn"
                }
            },
            select : function (e){
                console.log($(e.item).attr("id").split("-")[2] - 1);
                var tabName = $(e.item).find("> .k-link").text();
                let step = "";
                let stepColumn = "";
                let nextStepColumn = "";

                if(tabName == "수익/비용 설정"){
                    step = "E0";
                    stepColumn = "STEP1";
                    nextStepColumn = "STEP2";
                } else if (tabName == "예산비목"){
                    step = "E1";
                    stepColumn = "STEP2";
                    nextStepColumn = "STEP3";
                }

                $("#step").val(step);
                $("#stepColumn").val(stepColumn);
                $("#nextStepColumn").val(nextStepColumn);
            },
            dataTextField: "name",
            dataContentUrlField: "url",
            dataImageUrlField: "imageUrl",
            dataSource : [
                {name: "수익/비용 설정", url: tab0Url},
                {name: "예산비목", url: tab1Url}
            ],
        }).data("kendoTabStrip");
        tabstrip.select(tabstrip.tabGroup.children("li:first"));
    },
}