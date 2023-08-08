var es2 = {

    global : {

    },

    fn_defaultScript: function(){

        customKendo.fn_textBox(["pjtCd", "pjtNm", "delvCnt", "delvUnit", "delvLoc"
                                , "delvItem", "delvAmt", "empName"]);

        customKendo.fn_datePicker("estDe", "depth", "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("delvDe", "depth", "yyyy-MM-dd", new Date());

        $("#estDe").val($("#befEstDe").val());
        $("#sumry, #specf, #delvAssu, #delvTest").kendoTextArea({
            rows: 5,
        });


        es2.fn_setData();


    },

    fn_setData: function (){

        var data = {
            pjtSn: $("#pjtSn").val(),
        }

        $.ajax({
            url : "/project/getStep2DelvData",
            data : data,
            type : "post",
            dataType : "json",
            success : function (rs){
                var rs = rs.map;

                $("#delvAmt").val(es1.comma(rs.DELV_AMT));
                $("#delvAssu").val(rs.DELV_ASSU);
                $("#delvCnt").val(rs.DELV_CNT);
                $("#delvDe").val(rs.DELV_DE);
                $("input[name='delvDept']").each(function (){
                    if(this.value == rs.DELV_DEPT){
                        $(this).prop("checked", true);
                    }
                });
                $("#delvItem").val(rs.DELV_ITEM);
                $("#delvLoc").val(rs.DELV_LOC);
                $("input[name='delvMean']").each(function(){
                    if(this.value == rs.DELV_MEAN){
                        $(this).prop("checked", true);
                    }
                });
                $("#specf").val(rs.DELV_SPEC);
                $("#sumry").val(rs.DELV_SUMR);
                $("#delvTest").val(rs.DELV_TEST);
                $("#delvUnit").val(rs.DELV_UNIT);
                $("#empName").val(rs.PM_EMP_NM);
                $("#empSeq").val(rs.PM_EMP_SEQ);


                console.log(rs);
            }
        })
    },

    fn_save : function (){
        if(es1.uncomma($("#delvAmt").val()) != $("#expAmt").val()){
            if(!confirm("예상 견적가와 금액이 일치하지 않습니다. 저장하시겠습니까?")){
                return false;
            }
        }

        var data = {
            delvSumr : $("#sumry").val(),
            delvDe : $("#delvDe").val(),
            delvSpec : $("#specf").val(),
            delvItem : $("#delvItem").val(),
            delvCnt : es1.uncomma($("#delvCnt").val()),
            delvUnit : $("#delvUnit").val(),
            delvLoc : $("#delvLoc").val(),
            delvAssu : $("#delvAssu").val(),
            delvTest : $("#delvTest").val(),
            delvMean : $("input[name='delvMeans']:checked").val(),
            delvAmt : es1.uncomma($("#delvAmt").val()),
            delvDept : $("input[name='delvDept']:checked").val(),
            pmEmpSeq : $("#empSeq").val(),
            pmEmpNm : $("#empName").val(),
            regEmpSeq : $("#regEmpSeq").val(),
            pjtSn : $("#pjtSn").val(),
            estDe : $("#estDe").val(),

            // 추후 전자결재 붙을 경우 제거
            pjtStep : $("#pjtStep").val(),
            pjtStepNm : $("#pjtStepNm").val(),
            step : $("#step").val()
        }

        $.ajax({
            url : "/project/insStep2",
            data : data,
            type : "post",
            dataType : "json",
            success : function (rs){
                if(rs.code == 200){

                    opener.parent.camPrj.gridReload();
                    window.close();
                }
            }
        });
    },

}