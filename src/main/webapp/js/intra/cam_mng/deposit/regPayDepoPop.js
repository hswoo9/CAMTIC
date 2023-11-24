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

        customKendo.fn_textBox(["pjtNm", "depoTitle", "accNm", "accNo", "bnkNm", "budgetNm", "depoAmt", "depoManager"]);

        $("#depoCont").kendoTextArea({
            rows: 5,
        });

        $("#depoStat").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전액", value: 1 },
                { text: "선금", value: 2 },
                { text: "중도금", value: 3 },
                { text: "잔금", value: 4 },
            ],
            index: 0
        });

        $("#gubun").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "청구", value: "a" },
                { text: "영수", value: "b"},
                { text: "사급", value: "c" },
            ],
            index: 0
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
        }
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

            }
        })
    },

    fn_save : function (){
        var parameters = {
            appDe : $("#appDe").val(),
            payIncpDe : $("#payIncpDe").val(),
            pjtNm : $("#pjtNm").val(),
            pjtSn : $("#pjtSn").val(),
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
                if(rs.code == 200){
                    let status = "";

                    location.href="/payApp/pop/regPayAppPop.do?payAppSn=" + rs.params.payAppSn + "&status=" + status;

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
        if($("#pjtSn").val() == ""){
            alert("사업을 선택해주세요.");
            return ;
        }

        /** 추후 temp변수명 수정 예정 */
        var url = "/mng/pop/budgetView.do?pjtSn=" + $("#pjtSn").val() + "&idx=N&temp=2";

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
