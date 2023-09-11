var bustInfo = {


    fn_defaultScript : function(){
        customKendo.fn_textBox(["bustripReq"]);

        $("#contEtc").kendoTextArea({
            rows: 5,
        });

        bustInfo.fn_setData();
    },

    fn_setData : function (){
        var parameters = {
            pjtSn : $("#pjtSn").val()
        }

        $.ajax({
            url : "/project/engn/getBustInfo",
            data : parameters,
            type : "post",
            dataType : "json",
            success : function(rs){
                var rs = rs.rs;
                if(rs != null){
                    $("#contEtc").val(rs.RESULT);
                    var busnName = "";
                    var project = "";
                    if(rs.BUSN_NAME != "" && rs.BUSN_NAME != null && rs.BUSN_NAME != undefined){
                        busnName = p.BUSN_NAME;
                    }

                    if(rs.PROJECT_CD != "" && rs.PROJECT_CD != null){
                        project = "(엔지니어링) ";
                    }
                    var title =  project + busnName + " 출장지 : " + rs.VISIT_LOC_SUB;
                    if(rs.VISIT_LOC_SUB != null && rs.VISIT_LOC_SUB != ''){
                        $("#bustripReq").val(title);
                        $("#hrBizReqResultId").val(rs.HR_BIZ_REQ_RESULT_ID);
                    }
                }
            }
        });
    },

    fn_popBustrip : function (){
        var url = "/bustrip/pop/viewBustripList.do";
        var name = "_blank";
        var option = "width = 1300, height = 670, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    fn_save : function (){
        var data ={
            contEtc : $("#contEtc").val(),
            hrBizReqResultId : $("#hrBizReqResultId").val(),
            bustripReq : $("#bustripReq").val(),
            pjtSn : $("#pjtSn").val(),
            engnSn : $("#engnSn").val()
        }

        $.ajax({
            url : "/project/engn/setBustInfo",
            data : data,
            type : "post",
            dataType : "json",
            success: function(rs){
                alert("저장되었습니다.");

                location.reload();
            }
        });


        console.log("출장 정보");
    }
}