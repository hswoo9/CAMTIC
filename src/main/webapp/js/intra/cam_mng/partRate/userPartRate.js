var userPartRate = {


    fn_defaultScript : function (){

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

        for(var i = 0 ; i < diffMonth ; i++){

            hdHtml += '<th scope="row" class="text-center th-color">'+date.getFullYear()+'-'+(date.getMonth() + 1)+'</th>';

            date.setMonth(date.getMonth() + 1);

        }

        $("#userPartRateHeader").html(hdHtml);

        userPartRate.fn_setData();
    },


    fn_setData : function (){

        var parameters = {
            
        }
        // $.ajax({
        //     url : "/mng/"
        // });
    }
}