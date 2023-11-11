var userPartRate = {


    fn_defaultScript : function (){
        userPartRate.fn_setData();
    },


    fn_setData : function (){
        const strDe = $("#pjtStrDt").val().split("-");
        const endDe = $("#pjtEndDt").val().split("-");

        const diffMonth = (endDe[0] - strDe[0]) * 12 + (endDe[1] - strDe[1]) + 1;

        const projectStartMonth = strDe[0] + "-" + strDe[1];
        var date = new Date(projectStartMonth);

        $("#userPartRateHeader").html("");
        var hdHtml = "";
        hdHtml += '<th scope="row" class="text-center th-color">지원부처</th>';
        hdHtml += '<th scope="row" class="text-center th-color">사업명</th>';
        hdHtml += '<th scope="row" class="text-center th-color">상태</th>';
        hdHtml += '<th scope="row" class="text-center th-color">참여구분</th>';
        hdHtml += '<th scope="row" class="text-center th-color">5공3책</th>';

        for(var i = 0 ; i < diffMonth ; i++){

            hdHtml += '<th scope="row" class="text-center th-color">'+date.getFullYear()+'-'+(date.getMonth() + 1)+'</th>';

            date.setMonth(date.getMonth() + 1);

        }

        $("#userPartRateHeader").html(hdHtml);

        var parameters = {
            empSeq : $("#userEmpSeq").val(),
            strDe : $("#pjtStrDt").val(),
        }

        $.ajax({
            url : "/mng/userPartRateInfo",
            data : parameters,
            type : "post",
            dataType : "json",
            success : function (rs){
                var rs = rs.list;

                $("#userPartRateBody").html("");
                var bodyHtml = "";
                for (var i = 0; i < rs.length; i++) {

                    var pjtStatus = "진행중";

                    var projectEndDate = new Date();
                    if(projectEndDate >= new Date(rs[i].PJT_END_DT)){
                        pjtStatus = "완료";
                    }

                    var pm = "";
                    if(parameters.empSeq == rs[i].PM_EMP_SEQ){
                        pm = "책임자";
                    } else {
                        pm = "참여자";
                    }

                    var sbjStat = "";
                    if(rs[i].SBJ_STAT_YN == "Y"){
                        sbjStat = "적용";
                    }

                    bodyHtml += '<tr style="text-align: center;">';
                    bodyHtml += '   <td>'+rs[i].SBJ_DEP_NM+'</td>';
                    bodyHtml += '   <td>'+rs[i].PJT_NM+'</td>';
                    bodyHtml += '   <td>'+pjtStatus+'</td>';
                    bodyHtml += '   <td>'+pm+'</td>';
                    bodyHtml += '   <td>'+sbjStat+'</td>';


                    var date = new Date(projectStartMonth);


                    var userStrDeArr = rs[i].PART_DET_STR_DT.split("-");
                    var userEndDeArr = rs[i].PART_DET_END_DT.split("-");
                    var userStartMonth = userStrDeArr[0] + "-" + userStrDeArr[1];

                    var userDate = new Date(userStartMonth);

                    for(var j = 0 ; j < diffMonth ; j++){
                        var dt = date.getFullYear() + "-" + (date.getMonth() + 1);
                        var userDt = userDate.getFullYear() + "-" + (userDate.getMonth() + 1);

                        if(dt == userDt){
                            bodyHtml += '<td>'+rs[i].TOT_RATE+'</td>';

                            userDate.setMonth(userDate.getMonth() + 1);
                        }

                        date.setMonth(date.getMonth() + 1);
                    }

                    bodyHtml += '</tr>';
                }

                $("#userPartRateBody").html(bodyHtml);
            }
        });
    }
}