var std = {

    global : {
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : "",
        now : new Date()
    },

    fn_defaultScript : function (){
        customKendo.fn_datePicker("year", 'year', "yyyy", new Date());
        $("#year").data("kendoDatePicker").bind("change",  std.setMakeTable);

        std.setMakeTable();
    },

    setMakeTable : function(){
        std.global.searchAjaxData = {
            year : $("#year").val(),
            crmSn : $("#crmSn").val(),
        }

        var result = customKendo.fn_customAjax("/item/getShipmentTrendList.do", std.global.searchAjaxData);
        if(result.flag){
            if(result.list != null){
                var sum = 0;
                for(var i = 0; i < result.list.length; i++){
                    var yearMonth = result.list[i].MONTH_DATA.split("-");
                    var nextYearMonth = "";

                    $("#" + yearMonth[0] + "_Td_year").text(yearMonth[0]);
                    $("#" + yearMonth[0] + "_Td_" + yearMonth[1]).text(std.comma(result.list[i].CONFIRM_AMT));

                    if(i+1 == result.list.length){
                        nextYearMonth = result.list[i].MONTH_DATA.split("-");
                    }else{
                        nextYearMonth = result.list[i+1].MONTH_DATA.split("-");
                    }

                    sum += result.list[i].CONFIRM_AMT;

                    $("#" + yearMonth[0] + "_Td_sum").text(std.comma(sum));

                    if(yearMonth[1] == "12"){
                        $("#" + yearMonth[0] + "_Td_average").text(std.comma(Math.round(sum/12)));
                    }

                    if(yearMonth[0] != nextYearMonth[0]){
                        sum = 0;
                    }

                }
            }
        }
    },

    fn_popCamCrmList : function (){
        var url = "/crm/pop/popCrmList.do";
        var name = "_blank";
        var option = "width = 1300, height = 670, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    crmSnReset : function(){
        $("#crmSn").val("");
        $("#crmNm").val("");
        std.gridReload()
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