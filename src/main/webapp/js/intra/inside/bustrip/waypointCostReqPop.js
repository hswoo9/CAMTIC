const waypointReq = {
    init: function(){
        waypointReq.dataSet();
    },

    dataSet: function(){
        customKendo.fn_textBox(["waypoint", "distance"]);
        customKendo.fn_textArea(["remarkCn"]);
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

        if(waypointName == "") { alert("경유지명을 작성하지 않았습니다."); return; }
        if(distance == "") { alert("거리를 작성하지 않았습니다."); return; }

        if($("#hrWaypointInfoSn").val() == "") {
            if(!confirm("경유지를 등록하시겠습니까?")){
                return;
            }
            waypointReq.setWaypointCostInsert(data);
        }else {
            if(!confirm("경유지를 수정하시겠습니까?")){
                return;
            }
            waypointReq.setWaypointCostUpdate(data);
        }

    },

    setWaypointCostInsert: function(data){
        $.ajax({
            url : "/bustrip/setWaypointCostInsert",
            data : data,
            type : "post",
            dataType : "json",
            async : false,
            success : function(result){
                alert("경유지 저장이 완료됐습니다.");
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