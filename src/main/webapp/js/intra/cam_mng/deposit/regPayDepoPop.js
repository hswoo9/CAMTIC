var regPayDepo = {

    global : {
        radioGroupData : "",
        createHtmlStr : "",
        itemIndex : 0,
        dropDownDataSource : "",
        searchAjaxData : "",
        crmSnId : "",
        crmNmId : "",
        saveAjaxData : "",
    },

    fn_defaultScript : function (){
        customKendo.fn_datePicker("appDe", "month", "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("payIncpDe", "month", "yyyy-MM-dd", new Date());

        if($("#appDe").val() != null && $("#getDelvDe").val() != ""){
            $("#appDe").val($("#getDelvDe").val());
        }


        customKendo.fn_textBox(["pjtNm", "depoTitle", "accNm", "accNo", "bnkNm", "budgetNm", "depoAmt", "depoManager", "payDepoReqUser"]);

        if($("#paramPm").val() != null && $("#paramPm").val() != ""){
            $("#depoManager").val($("#paramPm").val());
        }

        $("#depoCont").kendoTextArea({
            rows: 5,
        });

        $("#depoStat").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "미입금", value: 1 },
                { text: "입금완료", value: 2 },
            ],
            index: 0
        });

        $("#gubun").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "청구", value: "a" },
                { text: "영수", value: "b"},
            ],
            index: 0,
            change : function (e){
                if(this.value() == "b"){
                    $("#depoStat").data("kendoDropDownList").value(2);
                    $("#thPayIncpDeText").text("입금일자");
                } else if(this.value() == "a"){
                    $("#depoStat").data("kendoDropDownList").value(1);
                    $("#thPayIncpDeText").text("입금예정일");
                }
            }
        })

        $("#checkAll").click(function(){
            if($(this).is(":checked")){
                $("input[type='checkbox']").prop("checked", true);
            }else{
                $("input[type='checkbox']").prop("checked", false);
            }
        });

        if($("#payDepoSn").val() != ""){
            regPayDepo.fn_setData();
            $("#payDepReqUserTh").css("display", "");
        }

        if($("#payDepoSn").val() == ""){
            regPayDepo.fn_manageSetData();
        }

        if($("#paramPjtSn").val() != ""){
            regPayDepo.fn_setProjectData();
        }
    },

    fn_manageSetData : function (){
        var data = {
            paramPjtCd : $("#paramPjtCd").val()
        }

        $.ajax({
            url : "/mng/getManageDepo",
            data : data,
            type : "post",
            dataType : "json",
            success : function(rs){
                var rs = rs.rsult;

                $("#pjtNm").val(rs.PJT_NM);
                $("#pjtSn").val(rs.PJT_SN);
                $("#pjtCd").val(rs.PJT_CD);
                $("#budgetNm").val(rs.BUDGET_NM);
                $("#budgetSn").val(rs.BUDGET_SN);
            }
        });
    },

    fn_setData: function (){
        var data = {
            payDepoSn : $("#payDepoSn").val()
        }

        $.ajax({
            url : "/pay/getPayDepoData",
            data : data,
            type : "post",
            dataType : "json",
            success : function(rs){
                var rs = rs.data;

                $("#appDe").val(new Date(rs.REG_DT + 3240 * 10000).toISOString().split("T")[0]);
                $("#payIncpDe").val(rs.PAY_INCP_DE);
                $("#pjtNm").val(rs.PJT_NM);
                $("#pjtSn").val(rs.PJT_SN);
                $("#budgetNm").val(rs.BUDGET_NM);
                $("#budgetSn").val(rs.BUDGET_SN);
                $("#depoTitle").val(rs.DEPO_TITLE);
                $("#gubun").data("kendoDropDownList").value(rs.GUBUN);
                $("#depoStat").data("kendoDropDownList").value(rs.DEPO_STAT);
                $("#depoAmt").val(regPayDepo.comma(rs.DEPO_AMT));
                $("#depoManager").val(rs.DEPO_MANAGER);
                $("#depoCont").val(rs.DEPO_CONT);
                $("#accNm").val(rs.ACC_NM);
                $("#bnkSn").val(rs.BNK_SN);
                $("#accNo").val(rs.ACC_NO);
                $("#bnkNm").val(rs.BNK_NM);

                $("#payDepoReqUser").val(rs.DEPO_EMP_NAME);

                if(rs.APPR_STAT == 'N'){
                    $("#apprBtn").css("display", "");
                }

                if($("#auth").val() == "user"){
                    $("#incpBtn").css("display", "");
                }
            }
        })
    },

    fn_setProjectData: function (){
        var data = {
            pjtSn : $("#paramPjtSn").val()
        }

        $.ajax({
            url : "/project/getProjectData",
            data : data,
            type : "post",
            dataType : "json",
            success : function(rs){
                var rs = rs.data;
                console.log(rs)
                $("#pjtSn").val(rs.PJT_SN);
                $("#pjtNm").val(rs.PJT_NM);
                $("#pjtCd").val(rs.PJT_CD);


                $("#depoTitle").val("입금신청 - " + rs.PJT_NM);
            }
        });
    },

    fn_save : function (){
        var parameters = {
            appDe : $("#appDe").val(),
            payIncpDe : $("#payIncpDe").val(),
            pjtNm : $("#paramPjtNm").val(),
            pjtSn : $("#paramPjtSn").val(),
            aftPjtSn : $("#pjtSn").val(),
            aftPjtNm : $("#pjtNm").val(),
            budgetNm : $("#budgetNm").val(),
            budgetSn : $("#budgetSn").val(),
            depoTitle : $("#depoTitle").val(),
            depoCont : $("#depoCont").val(),
            bnkSn : $("#bnkSn").val(),
            bnkNm : $("#bnkNm").val(),
            accNm : $("#accNm").val(),
            accNo : $("#accNo").val(),

            depoAmt : regPayDepo.uncomma($("#depoAmt").val()),
            gubun : $("#gubun").val(),
            depoStat : $("#depoStat").val(),

            regEmpSeq : $("#regEmpSeq").val()
        }



        if($("#payDepoSn").val() != ""){
            parameters.payDepoSn = $("#payDepoSn").val();
        }

        if(parameters.pjtSn == ""){
            alert("사업을 선택해주세요.");
            return;
        }

        if(parameters.budgetSn == ""){
            alert("비목을 선택해주세요.");
            return;
        }

        if(parameters.depoAmt == ""){
            alert("입금액 선택해주세요.");
            return;
        }


        $.ajax({
            url : "/pay/setPayDepo",
            data : parameters,
            type : "post",
            dataType : "json",
            success : function(rs){
                console.log(rs);
                if(rs.code == 200){
                    alert("저장되었습니다.")
                    let status = "";

                    location.href="/pay/pop/regPayDepoPop.do?payDepoSn=" + rs.params.payDepoSn + "&pjtSn=" + parameters.pjtSn;

                    opener.parent.paymentList.gridReload();
                }
            }
        });
    },

    crmInfoChange : function(){
        console.log(purcInfo.global.crmSnId, purcInfo.global.crmNmId)

        $("#" + purcInfo.global.crmSnId).val($("#purcCrmSn").val())
        $("#" + purcInfo.global.crmNmId).val($("#purcCrmNm").val())

        $("#purcCrmSn").val("")
        $("#purcCrmNm").val("")


    },

    fn_popCamCrmList : function (crmSnId, crmNmId){
        regPayDepo.global.crmSnId = crmSnId;
        regPayDepo.global.crmNmId = crmNmId;

        var url = "/crm/pop/popCrmList.do";
        var name = "_blank";
        var option = "width = 1300, height = 670, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    crmInfoChange : function(){
        $("#" + regPay.global.crmSnId).val($("#crmSn").val())
        $("#" + regPay.global.crmNmId).val($("#crmNm").val())

        $("#crmSn").val("")
        $("#crmNm").val("")
    },

    fn_calCost: function(obj){

        var index = obj.id.substring(obj.id.length - 1);
        if(obj.id.match("totCost")){

            $("#vatCost" + index).val(regPayDepo.comma(Number(regPayDepo.uncomma($("#totCost" + index).val())) - Math.round(Number(regPay.uncomma($("#totCost" + index).val())) * 100 / 110)));
            $("#supCost" + index).val(regPayDepo.comma(Number(regPayDepo.uncomma($("#totCost" + index).val())) - Number(regPay.uncomma($("#vatCost" + index).val()))));
        } else if(obj.id.match("supCost")){
            $("#vatCost" + index).val(regPayDepo.comma(Number(regPayDepo.uncomma($("#totCost" + index).val())) - Number(regPay.uncomma($("#supCost" + index).val()))));
        } else if (obj.id.match("vatCost")){
            $("#supCost" + index).val(regPayDepo.comma(Number(regPayDepo.uncomma($("#totCost" + index).val())) - Number(regPay.uncomma($("#vatCost" + index).val()))));
        }

        regPayDepo.inputNumberFormat(obj);
    },

    inputNumberFormat : function (obj){
        obj.value = regPayDepo.comma(regPayDepo.uncomma(obj.value));
    },

    comma: function(str) {
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    },

    uncomma: function(str) {
        str = String(str);
        return str.replace(/[^\d]+/g, '');
    },

    fn_projectPop : function (type){

        var url = "/project/pop/projectView.do";

        var name = "_blank";
        var option = "width = 1100, height = 400, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    fn_budgetPop: function (){
        if($("#pjtCd").val() == ""){
            alert("사업을 선택해주세요.");
            return ;
        }

        /** 추후 temp변수명 수정 예정 */
        var url = "/mng/pop/budgetView.do?pjtCd=" + $("#pjtCd").val() + "&idx=N&temp=2";

        var name = "_blank";
        var option = "width = 1100, height = 650, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);

    },

    fn_bankPop : function (){
        var url = "/mng/pop/bankView.do";

        var name = "_blank";
        var option = "width = 1100, height = 650, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

}
