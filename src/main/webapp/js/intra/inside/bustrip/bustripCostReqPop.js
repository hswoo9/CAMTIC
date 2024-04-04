const costReq = {
    init: function(){
        costReq.dataSet();

        if($("#hrCostInfoSn").val() != "") {
            costReq.setSaveData();
        }
    },

    dataSet: function(){
        customKendo.fn_textBox(["km"]);
        customKendo.fn_datePicker("startDt", 'month', "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("endDt", "month", "yyyy-MM-dd", new Date(now.setMonth(now.getMonth() + 6)));
        $("#startDt, #endDt").attr("readonly", true);
        let tripCodeDataSource = [
            { text: "도내(시내)", value: "1" },
            { text: "도내(시외)", value: "2" },
            { text: "도외", value: "3" }
        ]
        customKendo.fn_dropDownList("tripCode", tripCodeDataSource, "text", "value", 2);
        let exnpCodeDataSource = [
            { text: "교통비", value: "trafCost" },
            { text: "교통일비", value: "trafDayCost" },
            { text: "통행료", value: "tollCost" },
            { text: "일비", value: "dayCost" },
            { text: "식비", value: "eatCost" },
            { text: "주차비", value: "parkingCost" },
            { text: "기타", value: "etcCost" }
        ]
        customKendo.fn_dropDownList("exnpCode", exnpCodeDataSource, "text", "value", 2);

        $("#tripCode").data("kendoDropDownList").bind("change", function(){
            if($("#tripCode").data("kendoDropDownList").value() == "3" && $("#exnpCode").data("kendoDropDownList").value() == "dayCost"){
                $("#detailTr").show();
                let exnpCodeDetailDataSource = [
                    { text: "대중교통", value: "1" },
                    { text: "자가(운행시)", value: "2" },
                    { text: "자가(동행시)", value: "3" },
                    { text: "법인차량", value: "4" }
                ]
                customKendo.fn_dropDownList("exnpDetailCode", exnpCodeDetailDataSource, "text", "value", 2);
            }else{
                $("#detailTr").hide();
            }
        });


        $("#exnpCode").data("kendoDropDownList").bind("change", function(){
            if($("#tripCode").data("kendoDropDownList").value() == "1" && $("#exnpCode").data("kendoDropDownList").value() == "dayCost"){
                $("#detail2Tr").show();
            }else{
                $("#detail2Tr").hide();
            }
        });

        $("#exnpCode").data("kendoDropDownList").bind("change", function(){
            if($("#tripCode").data("kendoDropDownList").value() == "3" && $("#exnpCode").data("kendoDropDownList").value() == "dayCost"){
                $("#detailTr").show();
                let exnpCodeDetailDataSource = [
                    { text: "대중교통", value: "1" },
                    { text: "자가(운행시)", value: "2" },
                    { text: "자가(동행시)", value: "3" },
                    { text: "법인차량", value: "4" }
                ]
                customKendo.fn_dropDownList("exnpDetailCode", exnpCodeDetailDataSource, "text", "value", 2);
            }else{
                $("#detailTr").hide();
            }
        })

        customKendo.fn_textBox(["costAmt"]);
        customKendo.fn_textArea(["remarkCn"]);
    },

    setSaveData : function(){
        console.log("setSaveData");
        var result = customKendo.fn_customAjax("/bustrip/getBusinessCostOne", { hrCostInfoSn : $("#hrCostInfoSn").val() });
        if(result.flag){
            var rs = result.data;
            console.log(rs)
            $("#startDt").val(rs.START_DT);
            $("#endDt").val(rs.END_DT);
            $("#tripCode").data("kendoDropDownList").value(rs.TRIP_CODE);
            $("#exnpCode").data("kendoDropDownList").value(rs.EXNP_CODE);
            $("#costAmt").val(comma(rs.COST_AMT));
            $("#remarkCn").val(rs.REMARK_CN);

            if($("#tripCode").data("kendoDropDownList").value() == "3" && $("#exnpCode").data("kendoDropDownList").value() == "dayCost"){
                $("#detailTr").show();
                let exnpCodeDetailDataSource = [
                    { text: "대중교통", value: "1" },
                    { text: "자가(운행시)", value: "2" },
                    { text: "자가(동행시)", value: "3" },
                    { text: "법인차량", value: "4" }
                ]
                customKendo.fn_dropDownList("exnpDetailCode", exnpCodeDetailDataSource, "text", "value", 2);
                $("#exnpDetailCode").data("kendoDropDownList").value(rs.EXNP_DETAIL_CODE);
            }else{
                $("#detailTr").hide();
            }
        }
    },

    saveBtn: function(){
        let startDt = $("#startDt").val();
        let endDt = $("#endDt").val();
        let tripCode = $("#tripCode").data("kendoDropDownList").value();
        let exnpCode = $("#exnpCode").val();
        let exnpText = $("#exnpCode").data("kendoDropDownList").text();
        let exnpDetailCode = $("#exnpDetailCode").val();
        let exnpDetailText = "";
        if(tripCode == "3" && exnpCode == "dayCost"){
            exnpDetailText = $("#exnpDetailCode").data("kendoDropDownList").text();
        }
        let km = "0";
        if(tripCode == "1" && exnpCode == "dayCost"){
            km = $("#km").val();
        }
        let costAmt = uncomma($("#costAmt").val());
        let remarkCn = $("#remarkCn").val();
        let regEmpSeq = $("#regEmpSeq").val();
        let regEmpName = $("#regEmpName").val();

        let data = {
            startDt: startDt,
            endDt: endDt,
            tripCode: tripCode,
            exnpCode: exnpCode,
            exnpText: exnpText,
            exnpDetailCode: exnpDetailCode,
            exnpDetailText: exnpDetailText,
            km: km,
            costAmt: costAmt,
            remarkCn: remarkCn,
            regEmpSeq: regEmpSeq,
            regEmpName: regEmpName
        }

        if($("#hrCostInfoSn").val() != "") {
            data.hrCostInfoSn = $("#hrCostInfoSn").val();
        }

        if(startDt == "" || endDt == "") { alert("적용일자가 선택되지 않았습니다."); return; }
        if(tripCode == "") { alert("출장구분이 선택되지 않았습니다."); return; }
        if(exnpCode == "") { alert("여비 종류가 선택되지 않았습니다."); return; }
        if(costAmt == "") { alert("금액을 작성하지 않았습니다."); return; }
        if(tripCode == "3" && exnpCode == "dayCost" && exnpDetailCode == "") { alert("세부항목이 선택되지 않았습니다."); return; }
        if(tripCode == "1" && exnpCode == "dayCost" && km == "0") { alert("거리가 입력되지 않았습니다."); return; }

        var confirmText = "";
        if($("#hrCostInfoSn").val() == "") {
            confirmText = "등록하시겠습니까?";
        }else {
            confirmText = "수정하시겠습니까?";
        }

        if(!confirm(confirmText)) {
            return;
        }
        costReq.setBustripCostInsert(data);
    },

    setBustripCostInsert: function(data){
        $.ajax({
            url : "/bustrip/setBustripCostInsert",
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

    setBustripCostUpdate: function(data){
        console.log(data);
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