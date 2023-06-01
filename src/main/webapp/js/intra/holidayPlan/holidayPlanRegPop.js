
var now = new Date();
var menuCd = $("#menuCd").val();
var docContent = "";

var holidayPlanRegPop = {

    defaultScript : function(){

        $("#start_date").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date(now.setMonth(now.getMonth() - 1))
        });

        $("#start_time").kendoTimePicker({
            culture : "ko-KR",
            format : "HH:mm",
            interval : 10,
            value : "09:00"
        });

        $("#end_time").kendoTimePicker({
            culture : "ko-KR",
            format : "HH:mm",
            interval : 10,
            value : "18:00"
        });

        $("#end_date").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date()
        });

        $("#empSeq, #empName, #deptName, #dutyName, #now_date").kendoTextBox({
            enable: false
        });

        document.getElementById('now_date').valueAsDate = new Date();

        $("#holidayCate").kendoDropDownList({
            dataSource: [
                { text: "선택하세요", value: "" },
                { text: "연가", value: "연가" },
                { text: "오전반차", value: "오전반차" },
                { text: "오후반차", value: "오후반차" },
                { text: "병가", value: "병가" },
                { text: "공가", value: "공가" },
                { text: "경조휴가", value: "경조휴가" },
                { text: "출산휴가", value: "출산휴가" },
                { text: "대체휴가", value: "대체휴가" },
                { text: "근속포상휴가", value: "근속포상휴가" },
                { text: "휴일근로", value: "휴일근로" }
            ],
            dataTextField: "text",
            dataValueField: "value",
            index : 0,
            enable : true
        });






    },






}

