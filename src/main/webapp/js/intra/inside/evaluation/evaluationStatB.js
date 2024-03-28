var now = new Date();

var evaluationStatB = {
    global : {
        searchAjaxData : "",
        dropDownDataSource : ""
    },

    init: function(){
        evaluationStatB.dataSet();
    },

    dataSet: function (){
        customKendo.fn_datePicker("searchDate", 'decade', "yyyy", new Date());

        let activeDataSource = [
            { text: "1차", value: "1" },
            { text: "2차", value: "2" }
        ]
        customKendo.fn_dropDownList("searchNum", activeDataSource, "text", "value" ,2);

        var data = {};
        data.deptLevel = 1;
        var deptDsA = customKendo.fn_customAjax("/dept/getDeptAList", data);
        customKendo.fn_dropDownList("dept", deptDsA.rs, "dept_name", "dept_seq");

        var data1 = {};
        data1.deptLevel = 2;
        var deptDsB = customKendo.fn_customAjax("/dept/getDeptAList", data1);
        customKendo.fn_dropDownList("team", deptDsB.rs, "dept_name", "dept_seq");


    },


}

