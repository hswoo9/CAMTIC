var processInfo = {




    fn_defaultScript : function (){

        var data= {
            pjtSn : $("#pjtSn").val(),
            empSeq : $("#regEmpSeq").val()
        }
        $.ajax({
            url : "/project/getPsList",
            data : data,
            dataType : "json",
            type : "post",
            success : function(rs){

                console.log(rs);
                var rs = rs.psList;

                for(var i = 0 ; i < rs.length ; i++){
                    if(rs[i].PS_EMP_SEQ == null || rs[i].PS_EMP_SEQ == ""){
                        $("#commFileHtml" + Number(rs[i].PS_PREP)).css("display", "none");
                    } else {
                        var arr = rs[i].PS_EMP_SEQ.split(",");
                        var flag = false;
                        for(var j = 0 ; j < arr.length ; j++) {
                            if(data.empSeq == arr[j]){
                                flag = true;
                            }
                        }


                        if (flag){
                            $("#commFileHtml" + Number(rs[i].PS_PREP)).css("display", "");
                        }
                    }

                }
            }
        });



    },

    fn_save: function(){
        var data = {
            pjtSn : $("#pjtSn").val(),
            regEmpSeq : $("#regEmpSeq").val(),

            pjtStep : $("#pjtStep").val(),
            pjtStepNm : $("#pjtStepNm").val(),
            step : $("#step").val()
        }

        $.ajax({
            url : "/project/insStep4",
            data : data,
            type : "post",
            dataType: "json",
            success: function(rs){
                if(rs.code == 200){
                    opener.parent.camPrj.gridReload();
                    window.close();
                }
            }
        });
    }
}