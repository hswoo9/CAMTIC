var recruitReq = {

    init: function(){
        recruitReq.dataSet();
    },

    dataSet: function(){
        customKendo.fn_textBox(["recruitNum", "recruitTitle", "recruitDetail", "uploadText", "jobPositionEtc", "eligibilityEtc", "workType", "admission", "receiptDocu", "remark"]);
        customKendo.fn_datePicker("uploadDt", '', "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("startDt", '', "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("endDt", '', "yyyy-MM-dd", new Date());
        $("#startTime").kendoTimePicker({culture : "ko-KR", format : "HH:mm", value : "09:00"});
        $("#endTime").kendoTimePicker({culture : "ko-KR", format : "HH:mm", value : "18:00"});
        $("#recruitNum, #uploadDt, #startDt, #endDt, #startTime, #endTime").attr("readonly", true);
        let recruitStatusArr = [
            {text: "작성중(임시저장)", value: "1"},
            {text: "접수중", value: "2"},
            {text: "심사중", value: "3"},
            {text: "채용완료", value: "4"}
        ]
        customKendo.fn_dropDownList("recruitStatus", recruitStatusArr, "text", "value", 2);
        $("#recruitStatus").data("kendoDropDownList").select(1);

        $(".dept").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: customKendo.fn_customAjax("/dept/getDeptAList", data).rs,
            index: 0
        });
        $(".dept").data("kendoDropDownList").bind("change", fn_chngDeptComp)
    },

    saveBtn: function(){
        let recruitNum = $("#recruitNum").val();
        let recruitTitle = $("#recruitTitle").val();
        let recruitDetail = $("#recruitDetail").val();
        let uploadDt = $("#uploadDt").val();
        let uploadText = $("#uploadText").val();
        let startDt = $("#startDt").val();
        let endDt = $("#endDt").val();
        let startTime = $("#startTime").val();
        let endTime = $("#endTime").val();
        let jobPositionEtc = $("#jobPositionEtc").val();
        let eligibilityEtc = $("#eligibilityEtc").val();
        let workType = $("#workType").val();
        let admission = $("#admission").val();
        let receiptDocu = $("#receiptDocu").val();
        let remark = $("#remark").val();
        let recruitStatusSn = $("#recruitStatus").val();
        let recruitStatusText = $("#recruitStatus").data("kendoDropDownList").text();

        if(recruitTitle == ""){ alert("공고제목이 작성되지 않았습니다."); return;}
        if(recruitDetail == ""){ alert("공고내용이 작성되지 않았습니다."); return;}
        if(startDt == ""||endDt == ""){ alert("모집일시가 작성되지 않았습니다."); return;}
    },

    addTable: function(){

    }
}

function fn_chngDeptComp(){
    let data = {}
    data.deptLevel = 2;
    data.parentDeptSeq = this.value();

    const ds = customKendo.fn_customAjax("/dept/getDeptAList", data);
    $(".team").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: ds.rs,
        index: 0
    });
}