var rpr = {
    init: function(){
        rpr.pageSet();
    },

    pageSet: function(){
        customKendo.fn_textBox(["userText", "title", "iprClass", "regDate"]);
        $("#detailCn, #regNum").kendoTextArea();
        $("#regDate").attr("readonly", true);
        $("#shareTd .share").kendoTextBox();
    },

    dataSet: function(inventionInfoSn){
        $("#inventionInfoSn").val(inventionInfoSn);
        $("#title").data("kendoTextBox").enable(false);
        $("#userText").data("kendoTextBox").enable(false);
        $("#iprClass").data("kendoDropDownList").enable(false);
        $("#detailCn").data("kendoTextArea").enable(false);
    },

    useDataChange: function(shareList){
        let html = "";
        html += "<table>";
        for(let i=0; i<shareList.length; i++){
            html += "<tr class='addData'>";
            html += "<input type='hidden' class='shareEmpSeq' value='"+shareList[i].EMP_SEQ+"'/>";
            html += "<th class='shareEmpName'>"+shareList[i].EMP_NAME+"</th>";
            html += "<td><input type='text' id='share"+shareList[i].EMP_SEQ+"' style='width: 80%; text-align: right' class='share' oninput='onlyNumber(this);' value='"+shareList[i].SHARE+"'/> %</td>";
            html += "</tr>";
        }
        html += "</table>";
        $("#shareTd").html(html);
        $("#shareTd .share").kendoTextBox();
        $(".shareTr").show();
    },

}