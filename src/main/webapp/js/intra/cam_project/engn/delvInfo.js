var delvInfo = {


    fn_defaultScript : function (){
        customKendo.fn_textBox(["pjtCd", "delvPjtNm", "delvCnt", "delvUnit", "delvLoc"
            , "delvItem", "delvAmt", "pmName"]);

        customKendo.fn_datePicker("delvEstDe", "depth", "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("delvDe", "depth", "yyyy-MM-dd", new Date());

        $("#sumry, #specf, #delvAssu, #delvTest, #delvIssu").kendoTextArea({
            rows: 5,
        });

        delvInfo.fn_setData();
    },

    fn_setData : function () {

        var data = {
            pjtSn : $("#pjtSn").val()
        }

        $.ajax({
            url : "/project/engn/getDelvData",
            data : data,
            type : "post",
            dataType : "json",
            success : function(rs){
                console.log(rs);
                var delvMap = rs.delvMap;
                var map = rs.map;
                var rs = rs.estMap.estList[rs.estMap.estList.length - 1];

                if(delvMap != null && delvMap != ''){
                    $("#delvAmt").val(delvInfo.comma(delvMap.DELV_AMT));
                    $("#delvItem").val(delvMap.DELV_ITEM);
                    $("#delvLoc").val(delvMap.DELV_LOC);
                    $("#delvMean").val(delvMap.DELV_MEAN);
                    $("#delvSn").val(delvMap.DELV_SN);
                    $("#delvUnit").val(delvMap.DELV_UNIT);
                    $("#delvCnt").val(delvMap.DELV_CNT);
                    $("#delvIssu").val(delvMap.DELV_ISSU);
                    $("input[name='delvDept']").each(function (){
                        if(this.value == delvMap.DELV_DEPT){
                            $(this).prop("checked", true);
                        }
                    });
                    $("#pmName").val(delvMap.PM_EMP_NM);
                    $("#pmSeq").val(delvMap.PM_EMP_SEQ);
                } else {
                    $("#delvAmt").val(delvInfo.comma(rs.EST_TOT_AMT));
                    $("#delvEstDe").val(rs.EST_DE);
                }
                $("#delvPjtNm").val(map.PJT_NM);
                $("#pjtCd").val(map.PJT_CD);

            }
        });
    },












    inputNumberFormat : function (obj){
        obj.value = delvInfo.comma(delvInfo.uncomma(obj.value));
    },

    comma: function(str) {
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    },

    uncomma: function(str) {
        str = String(str);
        return str.replace(/[^\d]+/g, '');
    },
}