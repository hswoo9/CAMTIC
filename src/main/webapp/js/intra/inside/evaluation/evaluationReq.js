var evaluationReq = {

    global : {
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : ""
    },

    fn_defaultScript : function (){

        $("#evalState").kendoRadioGroup({
            items: [
                { label : " 작성중", value : "1" },
                { label : " 평가중", value : "2" },
                { label : " 평가완료", value : "3" }
            ],
            layout : "horizontal",
            labelPosition : "after"
        });

        $("#evalPeriod").kendoRadioGroup({
            items: [
                { label : " 전체지정", value : "1" },
                { label : " 차수지정", value : "2" }
            ],
            layout : "horizontal",
            labelPosition : "after",
            change: function (e){
                var selectedValue = e.sender.value();
                if(selectedValue === "1") {
                    $("#allPeriod").css("display" , "");
                    $("#partPeriod").css("display", "none");
                } else if(selectedValue === "2") {
                    $("#allPeriod").css("display" , "none");
                    $("#partPeriod").css("display", "");
                }
            }
        });
    },

    fu_addCapability : function (){
        var html = "";
        html += '<tr>';
        html += '   <td>';
        html += '       <input type="text" id="turnNum" class ="textBox" > 차';
        html += '   </td>';
        html += '   <td>';
        html += '       평가  <input type="text" id="evalSdate1" class="" style="width: 30%;"> ~ <input type="text" id="evalEdate1" class="" style="width: 30%;"><br>' +
                '       실시  <input type="text" id="evalSdate2" class="" style="width: 30%;"> ~ <input type="text" id="evalEdate2" class="" style="width: 30%;">';
        html += '   </td>';
        html += '   <td>';
        html += '       <input type="text" id="memberTurn1" class ="textBox" style="width: 100%;">';
        html += '   </td>';
        html += '   <td>';
        html += '       <input type="text" id="memberTurn2" class ="textBox" style="width: 100%;">';
        html += '   </td>';
        html += '   <td>';
        html += '       <input type="text" id="memberTurn3" class ="textBox" style="width: 100%;">';
        html += '   </td>';
        html += '   <td>';
        html += '       <input type="text" id="leaderTurn1" class ="textBox" style="width: 100%;">';
        html += '   </td>';
        html += '   <td>';
        html += '       <input type="text" id="leaderTurn2" class ="textBox" style="width: 100%;">';
        html += '   </td>';
        html += '   <td>';
        html += '       <input type="text" id="leaderTurn3" class ="textBox" style="width: 100%;">';
        html += '   </td>';
        html += '   <td>';
        html += '       <input type="text" id="headTurn1" class ="textBox" style="width: 100%;">';
        html += '   </td>';
        html += '   <td>';
        html += '       <input type="text" id="headTurn2" class ="textBox" style="width: 100%;">';
        html += '   </td>';
        html += '   <td>';
        html += '       <input type="text" id="headTurn3" class ="textBox" style="width: 100%;">';
        html += '   </td>';
        html += '   <td></td>';
        html += '</tr>';

        $('#capabilityTbody').append(html);
    },

    fu_removeCapability: function (){
        var removeTr = $("#capabilityTbody").find("tr").last();
        removeTr.remove();
    },

    fu_addBTList : function (){
        var html = "";
        html += '<tr style="text-align: center;">';
        html += '   <td>';
        html += '       <input type="text" id="btNum" class ="textBox" >';
        html += '   </td>';
        html += '   <td>';
        html += '       <input type="text" id="btField" class ="textBox" >';
        html += '   </td>';
        html += '   <td>';
        html += '       <input type="text" id="btValue" class ="textBox" > %';
        html += '   </td>';
        html += '   <td>';
        html += '       <input type="text" id="btScore" class ="textBox" >';
        html += '   </td>';
        html += '</tr>';

        $('#btList').append(html);
    },

    fu_removeBTList: function (){
        var removeTr = $("#btList").find("tr").last();
        removeTr.remove();
    },

    fu_addBSList : function (){
        var html = "";
        html += '<tr style="text-align: center;">';
        html += '   <td>';
        html += '       <input type="text" id="bsNum" class ="textBox" >';
        html += '   </td>';
        html += '   <td>';
        html += '       <input type="text" id="bsField" class ="textBox" >';
        html += '   </td>';
        html += '   <td>';
        html += '       <input type="text" id="bsValue" class ="textBox" > %';
        html += '   </td>';
        html += '   <td>';
        html += '       <input type="text" id="bsScore" class ="textBox" >';
        html += '   </td>';
        html += '</tr>';

        $('#bsList').append(html);
    },

    fu_removeBSList: function (){
        var removeTr = $("#bsList").find("tr").last();
        removeTr.remove();
    },

    fu_addScore : function (){
        var html = "";
        html += '<tr style="text-align: center;">';
        html += '   <td>';
        html += '       <input type="text" id="scClass" class ="textBox" >';
        html += '   </td>';
        html += '   <td>';
        html += '       <input type="text" id="scLevel" class ="textBox" >';
        html += '   </td>';
        html += '   <td>';
        html += '       <input type="text" id="scPerson" class ="textBox" > %';
        html += '   </td>';
        html += '   <td>';
        html += '       <input type="text" id="scScore1" class ="textBox" style="width: 35%;"> 점 ~ ';
        html += '       <input type="text" id="scScore2" class ="textBox" style="width: 35%;"> 점';
        html += '   </td>';
        html += '</tr>';

        $('#scoreList').append(html);
    },

    fu_removeScore: function (){
        var removeTr = $("#scoreList").find("tr").last();
        removeTr.remove();
    },


}