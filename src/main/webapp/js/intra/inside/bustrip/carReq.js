var carList = {
    init: function(){
        carList.dataSet();
        carList.mainScheduler();
    },

    dataSet: function(){
        customKendo.fn_textBox(["searchText"]);
        customKendo.fn_datePicker("carReqDt", 'year', "yyyy-MM", new Date());

        const carArr = customKendo.fn_customAjax('/inside/getCarCode').list;
        customKendo.fn_dropDownList("carClass", carArr, "text", "value", 1);

        let carTypeArr = [
            {text: "업무용", value: "1"},
            {text: "개인 사유", value: "2"}
        ]
        customKendo.fn_dropDownList("carType", carTypeArr, "text", "value", 1);
        let searchArr = [
            {text: "목적지", value: "목적지"},
            {text: "경유지", value: "경유지"},
            {text: "운행자", value: "운행자"}
        ]
        customKendo.fn_dropDownList("searchType", searchArr, "text", "value", 1);
    },

    mainScheduler: function(){
        var schRsDs = [];
        var ksModel = {
            id: { from: "CAR_REQ_SN", type: "number" },
            title: { from: "schTitle", defaultValue: "No title", validation: { required: true } },
            start: { type: "date", from: "START_DATE" },
            end: { type: "date", from: "END_DATE" }
        }

        var schDataSource = new kendo.data.SchedulerDataSource({
            transport: {
                read: {
                    url : "/inside/getCarRequestList",
                    dataType: "json"
                },
                parameterMap: function(data) {
                    data.empSeq = $("#RegEmpSeq").val();
                    return data;
                }
            },
            schema: {
                data: function (data) {
                    console.log(data.list);
                    return data.list;
                },
                model: {
                    id: "id",
                    fields: ksModel
                }
            }
        });

        var schResources = [
            {
                field : "vacCodeId",
                dataSource : schRsDs
            }
        ]

        kendo.culture("ko-KR");

        $("#scheduler").kendoScheduler({
            date: new Date(),
            startTime: new Date(),
            height: 671,
            views: [
                "month"
            ],
            timezone: "Etc/UTC",
            dataSource: schDataSource,
            selectable: false,
            dataBound : carList.onDataBound,
            editable : false
        });
    },

    onDataBound: function(){
        const scheduler = this;
        $(".k-event-inverse").dblclick(function (e) {
            var scheduler = $("#scheduler").getKendoScheduler();
            var event = scheduler.occurrenceByUid($(this).data("uid"));
            carList.carPopup(event.id);
        });
    },

    carPopup: function(carReqSn){
        let url = "/Inside/pop/carPop.do";
        if(!isNaN(carReqSn)) {
            url = "/Inside/pop/carPop.do?carReqSn="+carReqSn;
        }
        let name = "carPop";
        let option = "width = 900, height = 500, top = 100, left = 200, location = no";
        window.open(url, name, option);
    }
}

