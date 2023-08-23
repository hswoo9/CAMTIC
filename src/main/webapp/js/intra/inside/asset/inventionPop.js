const invention = {
    init: function(){
        invention.dataSet();
    },

    dataSet: function(){
        customKendo.fn_textBox(["userText", "title", "regDate", "iprClass"]);
        $("#detailCn").kendoTextArea();
        $("#userText, #regDate").attr("readonly", true);
        $("#shareTd .share").kendoTextBox();
    }
}

function userDataSet(userArr) {
    let userText = "";
    let userSn = "";
    for(let i=0; i<userArr.length; i++) {
        if(userText != "") {
            userText += ", ";
            userSn += ",";
        }
        userText += userArr[i].empName;
        userSn += userArr[i].empSeq;
    }
    $("#userText").val(userText);
    $("#userSn").val(userSn);

    let html = "";
    html += "<table>";
    for(let i=0; i<userArr.length; i++){
        html += "<tr class='addData'>";
        html += "<input type='hidden' class='shareEmpSeq' value='"+userArr[i].empSeq+"'/>";
        html += "<th class='shareEmpName'>"+userArr[i].empName+"</th>";
        html += "<td><input type='text' id='share"+userArr[i].empSeq+"' style='width: 80%; text-align: right' class='share' oninput='onlyNumber(this);'/> %</td>";
        html += "</tr>";
    }
    html += "</table>";
    $("#shareTd").html(html);
    $("#shareTd .share").kendoTextBox();
    $("#shareTr").show();
}
