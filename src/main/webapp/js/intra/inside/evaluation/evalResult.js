var now = new Date();

var evalResult = {
    global : {
        searchAjaxData : "",
        dropDownDataSource : ""
    },

    init: function(){
        evalResult.dataSet();
    },

    dataSet: function (){
        customKendo.fn_textBox(["searchText"]);
        let searchArr = [
            {text: "이름", value: "1"}
        ]

        fn_deptSetting(2);

        evalResult.global.dropDownDataSource = customKendo.fn_customAjax("/system/commonCodeManagement/getCmCodeList", {cmGroupCodeId : "4"});
        customKendo.fn_dropDownList("position", evalResult.global.dropDownDataSource, "CM_CODE_NM", "CM_CODE", 2);

        evalResult.global.dropDownDataSource = customKendo.fn_customAjax("/system/commonCodeManagement/getCmCodeList", {cmGroupCodeId : "3"});
        customKendo.fn_dropDownList("duty", evalResult.global.dropDownDataSource, "CM_CODE_NM", "CM_CODE", 2);
    },





}

