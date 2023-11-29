const ojtPlan = {
    global: {
    },

    init: function(){
        ojtPlan.pageSet();
    },

    pageSet: function(){
        customKendo.fn_textBox(["title", "etc"]);
        customKendo.fn_datePicker("startDt", "month", "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("endDt", "month", "yyyy-MM-dd", new Date());
        $("#startDt, #endDt").attr("readonly", true);

        $(".title, .etc").kendoTextBox({});
    },

    saveBtn: function(){
        let studyInfoSn = $("#pk").val();
        let startDt = $("#startDt").val();
        let endDt = $("#endDt").val();
        let title = $("#title").val();
        let etc = $("#etc").val();
        let regEmpSeq = $("#regEmpSeq").val();
        let regEmpName = $("#regEmpName").val();

        if(startDt == "" || endDt == ""){ alert("기간이 작성되지 않았습니다."); return; }
        if(title == ""){ alert("중점 지도항목이 작성되지 않았습니다."); return; }

        let data = {
            studyInfoSn: studyInfoSn,
            startDt: startDt,
            endDt: endDt,
            title: title,
            etc: etc,
            regEmpSeq: regEmpSeq,
            regEmpName: regEmpName
        }
        let url = "/campus/setOjtPlanInsert";
        const result = customKendo.fn_customAjax(url, data);
        if(result.flag){
            opener.gridReload();
            location.reload();
        }
    },

    updBtn: function(pk){
        let ojtPlanSn = pk;
        let title = $("#title"+pk).val();
        let etc = $("#etc"+pk).val();

        if(title == ""){ alert("중점 지도항목이 작성되지 않았습니다."); return; }

        let data = {
            ojtPlanSn: ojtPlanSn,
            title: title,
            etc: etc
        }
        let url = "/campus/setOjtPlanUpdate";
        const result = customKendo.fn_customAjax(url, data);
        if(result.flag){
            alert("저장되었습니다.");
            opener.gridReload();
            location.reload();
            window.opener.parent.location.reload();
        }
    },

    delBtn: function(pk){
        let ojtPlanSn = pk;

        let data = {
            ojtPlanSn: ojtPlanSn
        }
        let url = "/campus/setOjtPlanDelete";
        const result = customKendo.fn_customAjax(url, data);
        if(result.flag){
            opener.gridReload();
            location.reload();
        }
    }
}