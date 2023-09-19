const fuelCostReq = {
    init: function(){
        fuelCostReq.dataSet();
    },

    dataSet: function(){
        customKendo.fn_datePicker("startDt", 'month', "yyyy-MM-dd", new Date());
        $("#startDt").attr("readonly", true);
        customKendo.fn_textBox(["distance", "costAmt"]);

        let projectDataSource = [
            { text: "전체", value: "0" },
            { text: "테스트 프로젝트 A", value: "1" },
            { text: "테스트 프로젝트 B", value: "1" }
        ]
        customKendo.fn_dropDownList("project", projectDataSource, "text", "value", 3);
    },

    saveBtn: function(){
        let startDt = $("#startDt").val();
        let distance = $("#distance").val();
        let costAmt = $("#costAmt").val();
        let regEmpSeq = $("#regEmpSeq").val();
        let regEmpName = $("#regEmpName").val();

        let projectCd = $("#project").data("kendoDropDownList").value();
        let projectText = $("#project").data("kendoDropDownList").text();

        let data = {
            startDt: startDt,
            distance: distance,
            costAmt: costAmt,
            regEmpSeq: regEmpSeq,
            regEmpName: regEmpName,
            projectCd: projectCd,
            projectText: projectText
        }

        if(startDt == "") { alert("기준일이 작성되지 않았습니다."); return; }
        if(distance == "") { alert("기준거리가 작성되지 않았습니다."); return; }
        if(costAmt == "") { alert("적용금액이 작성되지 않았습니다."); return; }

        if(!confirm("기준유가를 등록하시겠습니까?")){
            return;
        }
        fuelCostReq.setBustripFuelCostInsert(data);

    },

    setBustripFuelCostInsert: function(data){
        $.ajax({
            url : "/bustrip/setBustripFuelCostInsert",
            data : data,
            type : "post",
            dataType : "json",
            async : false,
            success : function(result){
                alert("기준유가 등록이 완료됐습니다.");
                opener.gridReload();
                window.close();
            },
            error : function() {
                alert("데이터 저장 중 에러가 발생했습니다.");
                window.close();
            }
        });
    }
}