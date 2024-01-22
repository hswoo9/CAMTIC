const carView = {
    init: function(){
        carView.dataSet();
        carView.mainScheduler();
    },

    dataSet: function(){
    },

    mainScheduler: function(){
        var schRsDs = [];
        var ksModel = {
            id: { from: "CAR_REQ_SN", type: "number" },
            title: { from: "title", defaultValue: "No title", validation: { required: true } },
            start: { type: "date", from: "start" },
            end: { type: "date", from: "end" }
        }

        var schDataSource = new kendo.data.SchedulerDataSource({
            transport: {
                read: {
                    url : "/inside/getCarRequestList",
                    dataType: "json"
                },
                parameterMap: function(data) {
                    return data;
                }
            },
            schema: {
                data: function (data) {
                    return data.list;
                },
                model: {
                    id: "id",
                    fields: ksModel
                }
            }
        });

        /*var schResources = [
            {
                field : "vacCodeId",
                dataSource : schRsDs
            }
        ]*/

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
            selectable: true,
            dataBound : carView.onDataBound,
            editable : false
        });

        $("#scheduler").on("dblclick", ".k-state-selected:not(.k-event)", function(e){
            let url = "/Inside/pop/carPop.do?startDt=" + carView.dateFormat($("#scheduler").data("kendoScheduler").select().start);
            let name = "carPop";
            let option = "width = 900, height = 500, top = 100, left = 200, location = no";
            window.open(url, name, option);
        });
    },

    dateFormat : function(date) {
        let dateFormat2 = date.getFullYear() +
            '-' + ( (date.getMonth()+1) < 9 ? "0" + (date.getMonth()+1) : (date.getMonth()+1) )+
            '-' + ( (date.getDate()) < 9 ? "0" + (date.getDate()) : (date.getDate()) );
        return dateFormat2;
    },
}