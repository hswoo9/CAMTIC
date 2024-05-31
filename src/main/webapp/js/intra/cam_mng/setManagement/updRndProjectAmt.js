var updRndAmt = {


    fn_defaultScript: function (){
        customKendo.fn_textBox(["prevSaleAmt", "prevIncpAmt", "nextSaleAmt", "nextIncpAmt"]);

        if($("#govtPjtSn").val() != ""){
            updRndAmt.fn_dataSet();
        }
    },

    fn_dataSet : function(){

        $.ajax({
            url : "/setManagement/getRndProjectPrevNextAmt",
            data: { govtPjtSn : $("#govtPjtSn").val() },
            type: "post",
            dataType : "json",
            success : function(rs){
                $("#prevSaleAmt").val(comma(rs.data.PREV_SALE_AMT));
                $("#prevIncpAmt").val(comma(rs.data.PREV_INCP_AMT));
                $("#nextSaleAmt").val(comma(rs.data.NEXT_SALE_AMT));
                $("#nextIncpAmt").val(comma(rs.data.NEXT_INCP_AMT));
            }
        });
    },

    fn_save: function (){
        if(!confirm("저장하시겠습니까?")){
            return;
        }

        var parameters = {
            pjtSn : $("#pjtSn").val(),
            regEmpSeq : $("#regEmpSeq").val(),
            prevSaleAmt : uncomma($("#prevSaleAmt").val()),
            prevIncpAmt : uncomma($("#prevIncpAmt").val()),
            nextSaleAmt : uncomma($("#nextSaleAmt").val()),
            nextIncpAmt : uncomma($("#nextIncpAmt").val()),
        }

        if($("#govtPjtSn").val() != ""){
            parameters.govtPjtSn = $("#govtPjtSn").val();
        }

        $.ajax({
            url : "/setManagement/setRndProjectPrevNextAmt",
            data: parameters,
            type: "post",
            dataType : "json",
            success : function(rs){
                if(rs.code == 200){
                    alert("저장되었습니다.");
                    opener.parent.rndStat.gridReload();
                    window.close();
                }
            }
        });
    },
}