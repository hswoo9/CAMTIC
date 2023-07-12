var now = new Date();
var docContent = "";

var bustripResultPop = {

    init : function(k){

        bustripResultPop.dataSet(k);
    },

    dataSet : function(k) {
        var data = {
            hrBizReqId : k
        }
        var ds = customKendo.fn_customAjax("/bustrip/getBustripTotInfo", data);
        customKendo.fn_dropDownList("realDriver", ds.list, "EMP_NAME", "EMP_SEQ");

        customKendo.fn_textBox(["result"]);
    }
}

