const costReq = {
    init: function(){
        costReq.dataSet();
    },

    dataSet: function(){
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
        })

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

    saveBtn: function(){
        let startDt = $("#startDt").val();
        let endDt = $("#endDt").val();
        let tripCode = $("#tripCode").data("kendoDropDownList").value();
        let exnpCode = $("#exnpCode").val();
        let exnpText = $("#exnpCode").data("kendoDropDownList").text();
        let exnpDetailCode = $("#exnpDetailCode").val();
        let exnpDetailText = "";
        if(exnpCode == "dayCost"){
            exnpDetailText = $("#exnpDetailCode").data("kendoDropDownList").text();
        }
        let costAmt = $("#costAmt").val();
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
            costAmt: costAmt,
            remarkCn: remarkCn,
            regEmpSeq: regEmpSeq,
            regEmpName: regEmpName
        }

        if(startDt == "" || endDt == "") { alert("적용일자가 선택되지 않았습니다."); return; }
        if(tripCode == "") { alert("출장구분이 선택되지 않았습니다."); return; }
        if(exnpCode == "") { alert("여비 종류가 선택되지 않았습니다."); return; }
        if(costAmt == "") { alert("금액을 작성하지 않았습니다."); return; }
        if(exnpCode == "dayCost" && exnpDetailCode == "") { alert("세부항목이 선택되지 않았습니다."); return; }

        if($("#hrCostInfoSn").val() == "") {
            if(!confirm("여비를 등록하시겠습니까?")){
                return;
            }
            costReq.setBustripCostInsert(data);
        }else {
            if(!confirm("여비를 수정하시겠습니까?")){
                return;
            }
            costReq.setBustripCostUpdate(data);
        }

    },

    setBustripCostInsert: function(data){
        $.ajax({
            url : "/bustrip/setBustripCostInsert",
            data : data,
            type : "post",
            dataType : "json",
            async : false,
            success : function(result){
                alert("여비 저장이 완료됐습니다.");
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