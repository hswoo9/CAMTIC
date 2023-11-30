var degreeView = {
    global : {
        searchAjaxData : ""
    },

    fn_defaultScript : function (){

        degreeView.gridReload();

        $('.detailSearch').on('change', function () {
            degreeView.gridReload();
        });

    },

    getTotalDeptChart : function (arr) {
        console.log("ajax arr : ",arr);

        /*
        *
        * 이곳에 ajax 요청으로 서버로부터 데이터를 받아온 후 데이터를 mainChart 함수로 보내주기
        * 데이터 가공이 필요한 경우에도 이쪽에서
        * mainChart 함수로 보내주기 전에 $("#mainChart *").remove(); 반드시 div 초기화 진행
        *
        * */

    },

    mainChart : function (e){
        var data = e;
        console.log("ajax data : ",data);
        var totalEmpCount = 0;

        for(var i = 0; i<data.length; i++){
            //totalEmpCount += data[i].인원 수  || 0;
        }

        var html = "";

        html = '<table class="centerTable table table-bordered"><colgroup><col width="15%"><col><col width="10%"></colgroup><tbody>';

        /*
        for(var i =0;i<data.length; i++) {
            var color = degreeView.getColorForIndex(i); //그래프 바의 색깔 함수 호출
            var percentageWidth = (((data[i].학위별 인원 수 / totalEmpCount) * 100).toFixed(1))*9;
            var percentage = ((data[i].학위별 인원 수 / totalEmpCount) * 100).toFixed(1)
            console.log("percentage : ",percentage);
            console.log("percentageWidth : ",percentageWidth);
            html += '<tr>' +
                '<td style="background-color: #efefef;">'+ data[i].학위 이름 +'</td>' +
                '<td style="background-color: #ffffff;">' +
                '<div style="display: flex; align-items: center;">' +
                '<div style="background-color: ' + color + '; float : left; height: 10px; width: '+percentageWidth+'px; display: inline-block; position: relative; top: 1.5px;">' +
                '</div>' +
                '<span style="display: inline-block; position: relative; top: 1.5px;">'+percentage+'%</span>' +
                '</div>'+
                '</td>' +
                '<td style="background-color: #ffffff;">' + data[i].학위별 인원 수 + '명</td>' +
                '</tr>';
        }

         */
        html+='<tr>'+
            '<td style="background-color: #efefef;" align="center" colspan="2">합계</td>'+
            '<td style="background-color: #efefef;">'+totalEmpCount +'명</td>'+
            '</tr>'+
            '</table>';

        $("#mainChart").append(html);

    },

    getColorForIndex : function (index){
        var colors = ["#DC7C7C", "#7C8ADC", "#A77CDC", "#DCB57C", "#B7DC7C"]; //배열에 따라 해당 색이 반복
        return colors[index % colors.length];
    },

    gridReload : function(){
        var requestArr = "";
        if($(".detailSearch:checked").length == 0){
            requestArr += "|999&N"
        }else{
            $(".detailSearch:checked").each(function(){
                if($(this).attr("id") == "dsA"){
                    requestArr += "|0&N|4&1,2"
                }else{
                    requestArr += "|" + $(this).attr("division") + '&' + ($(this).attr("divisionSub") == null ? "N" : $(this).attr("divisionSub"));
                }

            })
        }
        console.log("requestArr:", requestArr);
        var arr = requestArr.substring(1);
        console.log("arr :",arr);

        degreeView.getTotalDeptChart(arr);
    }



}