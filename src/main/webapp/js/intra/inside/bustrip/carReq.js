/**
 * 2023.06.05
 * 작성자 : 김지혜
 * 내용 : 차량/회의실관리 - 차량사용신청
 */

var carReq = {
    global : {
        now: new Date(),
        menuCd : $("#menuCd").val(),
        empSeq : $("#empSeq").val(),
        mcCode : "V",
        startTime : new Date(),
        endTime : new Date(),
        vacGubun : [],
        tagTarget : "",

        userVacation : 0
    },

    fn_defaultScript: function () { 

        $("#datePicker").kendoDatePicker({
            value: new Date(),
            start: "year",
            depth: "year",
            format: "yyyy-MM",
            width: "150px"
        });

        $("#useCar").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                {text: "카니발", value: "카니발"},
                {text: "아반떼", value: "아반떼"},
                {text: "트럭", value: "트럭"}
            ],
            index: 0
        });

        $("#raceDivision").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                {text: "업무용", value: "업무용"},
                {text: "개인 사유", value: "개인 사유"}
            ],
            index: 0
        });

        $("#searchDivision").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                {text: "목적지", value: "목적지"},
                {text: "경유지", value: "경유지"},
                {text: "운행자", value: "운행자"}
            ],
            index: 0
        });
        
        $("#name").kendoTextBox();

        $("#status").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "작성 중", value: "작성 중" },
                { text: "제출", value: "제출" },
                { text: "승인", value: "승인" },
                { text: "반려", value: "반려" }
            ],
            index: 0
        });

        $("#scheduler").kendoScheduler({
            date: new Date(),
            startTime: new Date(),
            height: 671,
            views: [
                "month"
            ],
            timezone: "Etc/UTC",
            selectable: false,
            editable : false/*,
            dataSource: schDataSource,
            resources: schResources,*/
            /*
            editable : {
                template : $("#customEditorWorkPlanTemplate").html(),
                destroy : false
            },
            */

        });
    },

    carPopup : function(){
        var url = "/Inside/Pop/carPop.do";
        var name = "popup test";
        var option = "width = 900, height = 500, top = 100, left = 200, location = no"
        var popup = window.open(url, name, option);
    }
}

