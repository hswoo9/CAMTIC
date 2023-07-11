var bulkChangePop = {

    global: {
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : "",
    },

    fn_defaultScript: function () {
        customKendo.fn_textBox(["astName", "empName", "purcPrice", "reason"])

        bulkChangePop.global.searchAjaxData = {
            insideMdCode : "03"
        }
        bulkChangePop.global.dropDownDataSource = customKendo.fn_customAjax("/inside/getInsideCodeList.do", bulkChangePop.global.searchAjaxData);
        $("#astStsCode").kendoDropDownList({
            dataTextField: "INSIDE_DT_CODE_NM",
            dataValueField: "INSIDE_DT_CODE",
            dataSource: bulkChangePop.global.dropDownDataSource.rs,
        });
    }
}


