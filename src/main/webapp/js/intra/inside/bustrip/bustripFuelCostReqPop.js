const fuelCostReq = {
    init: function(){
        fuelCostReq.dataSet();

        if($("#hrFuelCostInfoSn").val() != ''){
            fuelCostReq.setSaveData();
        }
    },

    dataSet: function(){
        customKendo.fn_datePicker("startDt", 'month', "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("endDt", 'month', "yyyy-MM-dd", new Date());
        $("#startDt").attr("readonly", true);
        customKendo.fn_textBox(["distance", "costAmt"]);

        let projectDataSource = [
            { text: "전체", value: "0" },
            { text: "테스트 프로젝트 A", value: "1" },
            { text: "테스트 프로젝트 B", value: "2" }
        ]
        customKendo.fn_dropDownList("project", projectDataSource, "text", "value", 3);
    },

    setSaveData : function(){
        var result = customKendo.fn_customAjax("/bustrip/getBustripFuelCostOne", { hrFuelCostInfoSn : $("#hrFuelCostInfoSn").val() });
        if(result.flag){
            var rs = result.data;
            console.log(rs)
            $("#startDt").val(rs.START_DT);
            $("#distance").val(comma(rs.DISTANCE));
            $("#costAmt").val(comma(rs.COST_AMT));
            $("#project").data("kendoDropDownList").value(rs.PROJECT_CD);

            if(rs.END_DT) {
                $("#endDt").val(rs.END_DT);
                $("#endDtChk").val('Y');
                $("#endDtWrap").show();
            }
        }
    },

    saveBtn: function(){
        let startDt = $("#startDt").val();
        let distance = uncomma($("#distance").val());
        let costAmt = uncomma($("#costAmt").val());
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

        if($("#hrFuelCostInfoSn").val() != "") {
            data.hrFuelCostInfoSn = $("#hrFuelCostInfoSn").val();
        }

        if($("#endDtChk").val() == 'Y') {
            data.endDt = $("#endDt").val();
        }

        if(startDt == "") { alert("기준일이 작성되지 않았습니다."); return; }
        if(distance == "") { alert("기준거리가 작성되지 않았습니다."); return; }
        if(costAmt == "") { alert("적용금액이 작성되지 않았습니다."); return; }

        var confirmText = "";

        if($("#hrFuelCostInfoSn").val() == "") {
            confirmText = "등록하시겠습니까?";
        }else {
            confirmText = "수정하시겠습니까?";
        }

        if(!confirm(confirmText)){
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
                alert("등록되었습니다.");
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

function comma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}

function uncomma(str) {
    str = String(str);
    return str.replace(/[^\d]+/g, '');
}

function inputNumberFormat (obj){
    obj.value = comma(uncomma(obj.value));
}