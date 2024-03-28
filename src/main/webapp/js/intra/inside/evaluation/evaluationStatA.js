var now = new Date();

var evaluationStatA = {
    global : {
        searchAjaxData : "",
        dropDownDataSource : ""
    },

    init: function(){
        evaluationStatA.dataSet();
    },

    dataSet: function (){
        customKendo.fn_datePicker("searchDate", 'decade', "yyyy", new Date());

        let activeDataSource = [
            { text: "1차", value: "1" },
            { text: "2차", value: "2" }
        ]
        customKendo.fn_dropDownList("searchNum", activeDataSource, "text", "value" ,2);
    },


}

