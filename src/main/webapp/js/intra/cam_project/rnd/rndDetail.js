var rndDetail = {


    fn_defaultScript : function (){

        customKendo.fn_textBox(["mngDeptName", "mngEmpName", "bankNo", "accHold", "allResCost", "peoResCost", "peoResItem", "totResCost", "resCardNo"]);

        $("#bank").kendoDropDownList({
            dataTextField : "text",
            dataValueField : "value",
            dataSource : [
                {text : "전북은행", value : "1"},
            ],
        });

        $("input[name='resCardCheck']").click(function(){
            if($(this).val() == "Y"){
                $("#rccYRes").show();
            }else{
                $("#rccYRes").hide();
            }
        });

        $("#allResCost, #peoResCost, #peoResItem").keyup(function(){
            $("#totResCost").val(comma(Number(uncomma($("#allResCost").val())) + Number(uncomma($("#peoResCost").val())) + Number(uncomma($("#peoResItem").val()))));
        });

        customKendo.fn_datePicker("delvDay", "month", "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("resDay", "month", "yyyy-MM-dd", new Date());


        rndDetail.fn_setData();
    },


    fn_save : function(){
        var parameters = {
            pjtSn : $("#pjtSn").val(),

            mngDeptName : $("#mngDeptName").val(),
            mngEmpName : $("#mngEmpName").val(),
            mngDeptSeq : $("#mngDeptSeq").val(),
            mngEmpSeq : $("#mngEmpSeq").val(),

            bankSn : $("#bank").val(),
            bankNm : $("#bank").data("kendoDropDownList").text(),
            bankNo : $("#bankNo").val(),
            accHold : $("#accHold").val(),

            allResCost : uncomma($("#allResCost").val()),
            peoResCost : uncomma($("#peoResCost").val()),
            peoResItem : uncomma($("#peoResItem").val()),
            totResCost : uncomma($("#totResCost").val()),

            resCardCheck : $("input[name='resCardCheck']:checked").val(),
            resCardNo : $("#resCardNo").val(),

            delvDay : $("#delvDay").val(),
            resDay : $("#resDay").val(),
        }

        if($("#rndSn").val() != "" && $("#rndSn").val() != null){
            parameters.rndSn = $("#rndSn").val();
            parameters.stat = "upd"
        } else {
            parameters.stat = "ins"
        }

        $.ajax({
            url : "/projectRnd/setRndDetail",
            data : parameters,
            type : "post",
            dataType : "json",
            success : function(rs){
                if(rs.code == 200){
                    location.reload();
                }
            }
        })
    },

    fn_setData : function (){
        var parameters = {
            pjtSn : $("#pjtSn").val(),
        }

        var result = customKendo.fn_customAjax("/projectRnd/getRndDetail", parameters);

        var rs = result.map;


        $("#rndSn").val(rs.RND_SN);
        $("#mngDeptName").val(rs.MNG_DEPT_NAME);
        $("#mngEmpName").val(rs.MNG_EMP_NAME);
        $("#mngDeptSeq").val(rs.MNG_DEPT_SEQ);
        $("#mngEmpSeq").val(rs.MNG_EMP_SEQ);

        $("#bank").data("kendoDropDownList").value(rs.BANK_SN);
        $("#bankNo").val(rs.BANK_NO);
        $("#accHold").val(rs.ACC_HOLD);

        $("#allResCost").val(comma(rs.ALL_RES_COST));
        $("#peoResCost").val(comma(rs.PEO_RES_COST));
        $("#peoResItem").val(comma(rs.PEO_RES_ITEM));
        $("#totResCost").val(comma(rs.TOT_RES_COST));

        if(rs.RES_CARD_CHECK == "Y"){
            $("input[name='resCardCheck'][value='Y']").prop("checked", true);
            $("#rccYRes").css("display", "");
        }else{
            $("input[name='resCardCheck'][value='N']").prop("checked", true);
            $("#rccYRes").css("display", "none");
        }
        $("#resCardNo").val(rs.RES_CARD_NO);

        $("#delvDay").val(rs.DELV_DAY);
        $("#resDay").val(rs.RES_DAY);

    }
}