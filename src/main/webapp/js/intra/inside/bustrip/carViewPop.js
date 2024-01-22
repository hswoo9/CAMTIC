var carList = {

    global : {
        now : new Date(),
        year : "",
        month : "",
        day : "",
        searchAjaxData : "",
        data : new Array(),
        minuteList : new Array(),
        hourList : new Array(),
        dropDownDataSource : "",
    },

    fn_defaultScript: function(){
        carList.pageSet();
    },

    pageSet: function(){
        for(var i = 0 ; i < 60 ; i++){
            var minute = i;
            if(i < 10) minute = "0" + i;
            carList.global.minuteList.push({MINUTE_NM: minute, MINUTE_CD: minute});
        }

        for(var i = 6 ; i < 24 ; i++){
            var hour = i;
            if(i < 10) hour = "0" + i;
            carList.global.hourList.push({HOUR_NM: hour, HOUR_CD: hour});
        }

        customKendo.fn_textBox(["enterSearch"]);
        customKendo.fn_datePicker("carReqDt", 'year', "yyyy-MM", new Date());

        const carArr = customKendo.fn_customAjax('/inside/getCarCode').list;
        customKendo.fn_dropDownList("carClass", carArr, "text", "value", 1);

        let carTypeArr = [
            {text: "업무용", value: "1"},
            {text: "개인 사유", value: "2"}
        ]
        customKendo.fn_dropDownList("carType", carTypeArr, "text", "value", 1);
        let searchWordArr = [
            {text: "목적지", value: "1"},
            {text: "경유지", value: "2"},
            {text: "운행자", value: "3"}
        ]
        customKendo.fn_dropDownList("searchWordType", searchWordArr, "text", "value", 1);
    },

    getScheduleData : function(){
        var scheduleData = new Array();

        carList.global.searchAjaxData = {
            empSeq : $("#RegEmpSeq").val(),
            carReqDt : $("#carReqDt").val(),
            carClass : $("#carClass").val(),
            carType : $("#carType").val(),
            searchWordType : $("#searchWordType").val(),
            enterSearch : $("#enterSearch").val()
        }


        var ds = customKendo.fn_customAjax("/inside/getCarRequestList", carList.global.searchAjaxData);
        if(ds.flag){
            carList.global.data = ds.list;
        }

        if(carList.global.data.length > 0){
            for(var i = 0 ; i < carList.global.data.length ; i++){
                var row = {};
                row.title = carList.global.data[i].title;
                row.start = new Date(carList.global.data[i].start);
                row.end = new Date(carList.global.data[i].end);
                row.carReqSn = carList.global.data[i].CAR_REQ_SN;
                scheduleData.push(row);
            }
        }
        return scheduleData;
    },

    /*carPopup: function(carReqSn){
        let url = "/Inside/pop/carPop.do";
        if(!isNaN(carReqSn)) {
            url = "/Inside/pop/carPop.do?carReqSn="+carReqSn;
        }
        let name = "carPop";
        let option = "width = 900, height = 500, top = 100, left = 200, location = no";
        window.open(url, name, option);
    },

    carStatPop: function(){
        const url = "/Inside/pop/carStatPop.do";
        const name = "carStatPop";
        const option = "width = 1600, height = 570, top = 100, left = 200, location = no";
        window.open(url, name, option);
    },*/

    refresh: function(){
        $("#calendar").html("");
        carList.global.cal.$calendar.fullCalendar("destroy");
        carList.global.cal.init();
    }
}