var bustripResultPop = {

    init : function(k){
        bustripResultPop.dataSet(k);
    },

    dataSet : function(k, rsKey) {
        var data = {
            hrBizReqId : k
        }
        var ds = customKendo.fn_customAjax("/bustrip/getBustripTotInfo", data);
        customKendo.fn_dropDownList("realDriver", ds.list, "EMP_NAME", "EMP_SEQ");

        customKendo.fn_textBox(["result"]);


        var data = {
            hrBizReqId: k,
            hrBizReqResultId : rsKey
        }
        var result = customKendo.fn_customAjax("/bustrip/getBustripReqInfo", data);

        var res = result.rs.rsRes;
        var map = result.rs.map;
        var rs = result.rs.rs;

        var html = "";
        for(var i = 0 ; i < map.length ; i++){
            if(map[i].DRIVER == "Y"){
                $("#realDriver").data("kendoDropDownList").value(map[i].EMP_SEQ)
            }
            html += "<tr style='text-align: right'>";
            html += "   <td style='text-align: center'>"+map[i].EMP_NAME+"</td>";
            html += "   <td>"+map[i].OIL_COST+"</td>";
            html += "   <td>"+map[i].TRAF_COST+"</td>";
            html += "   <td>"+map[i].TRAF_DAY_COST+"</td>";
            html += "   <td>"+map[i].TOLL_COST+"</td>";
            html += "   <td>"+map[i].DAY_COST+"</td>";
            html += "   <td>"+map[i].EAT_COST+"</td>";
            html += "   <td>"+map[i].PARKING_COST+"</td>";
            html += "   <td>"+map[i].ETC_COST+"</td>";
            html += "   <td>"+map[i].TOT_COST+"</td>";
            html += "</tr>";
        }
        $("#bustExnpBody").html(html);

        if(res.STATUS == 0){
            $("#moveDst").val(rs.DISTANCE);
            if(rs.DISTANCE != 0){
                $("#moveDst").attr("disabled", true);
                $("#moveBtn").attr("disabled", true);
            }
        }else{
            $("#moveDst").val(res.MOVE_DST);
        }
        $("#result").val(res.RESULT);
        $("#realDriver").data("kendoDropDownList").enable(false);
        //("#moveDst").data("kendoTextBox").enable(false);
    },

    fn_save : function(e){
        if(!confirm("출장 결과보고를 저장하시겠습니까?")){
            return;
        }

        if(realDriver == null || realDriver == ""){
            alert("운행자를 선택해주세요.");
            return;
        } else if (result == null || result == ""){
            alert("출장결과를 입력해주세요.");
            return;
        } else if (moveDst == null || moveDst == ""){
            alert("운행거리를 입력해주세요.");
            return;
        }

        var data = {
            hrBizReqResultId : e,
            driverEmpSeq : $("#realDriver").val(),
            result : $("#result").val(),
            moveDst : $("#moveDst").val(),
            positionCode : $("#positionCode").val(),
            dutyCode : $("#dutyCode").val(),
            deptSeq : $("#deptSeq").val(),
            empSeq : $("#empSeq").val(),
            empName : $("#empName").val()
        }

        var rs = customKendo.fn_customAjax("/bustrip/saveBustripResult", data);
        window.close()
        opener.gridReload();
    }
}

