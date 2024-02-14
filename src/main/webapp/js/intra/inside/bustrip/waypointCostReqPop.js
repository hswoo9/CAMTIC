const waypointReq = {
    init: function(){
        waypointReq.dataSet();

        if($("#hrWaypointInfoSn").val() != "") {
            waypointReq.setSaveData();
        }
    },

    dataSet: function(){
        customKendo.fn_textBox(["waypoint", "distance"]);
        customKendo.fn_textArea(["remarkCn"]);
    },

    setSaveData : function(){
        var result = customKendo.fn_customAjax("/bustrip/getWaypointCostOne", { hrWaypointInfoSn : $("#hrWaypointInfoSn").val() });
        if(result.flag){
            var rs = result.data;
            console.log(rs)
            $("#waypoint").val(rs.WAYPOINT_NAME);
            $("#distance").val(rs.DISTANCE);
            $("#remarkCn").val(rs.REMARK_CN);
        }
    },

    saveBtn: function(){
        let waypointName = $("#waypoint").val();
        let distance = $("#distance").val();
        let remarkCn = $("#remarkCn").val();
        let regEmpSeq = $("#regEmpSeq").val();
        let regEmpName = $("#regEmpName").val();

        let data = {
            waypointName: waypointName,
            distance: distance,
            remarkCn: remarkCn,
            regEmpSeq: regEmpSeq,
            regEmpName: regEmpName
        }

        if($("#hrWaypointInfoSn").val() != "") {
            data.hrWaypointInfoSn = $("#hrWaypointInfoSn").val();
        }

        if(waypointName == "") { alert("경유지명을 작성하지 않았습니다."); return; }
        if(distance == "") { alert("거리를 작성하지 않았습니다."); return; }

        var confirmText = "";

        if($("#hrWaypointInfoSn").val() == "") {
            confirmText = "등록하시겠습니까?";
        }else {
            confirmText = "수정하시겠습니까?";
        }

        if(!confirm(confirmText)) {
            return;
        }
        waypointReq.setWaypointCostInsert(data);
    },

    setWaypointCostInsert: function(data){
        $.ajax({
            url : "/bustrip/setWaypointCostInsert",
            data : data,
            type : "post",
            dataType : "json",
            async : false,
            success : function(result){
                alert("저장되었습니다.");
                opener.gridReload();
                window.close();
            },
            error : function() {
                alert("데이터 저장 중 에러가 발생했습니다.");
                window.close();
            }
        });
    },

    setWaypointCostUpdate: function(data){
        console.log(data);
    }
}