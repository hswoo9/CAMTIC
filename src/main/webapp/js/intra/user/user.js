var org = {
    global : {

    },

    // 직원상세보기 팝업
    fnCheck : function(e) {
        var data = {
            deptNm : $(e).text().trim().replace(/ /gi, "")
        }

        var flag = false;

        $.ajax({
            url: "/user/getOrgDeptList",
            data: data,
            dataType : "json",
            async: false,
            success: function(rs){
                var row = rs;
                var defaultImage = "background-image:url(\'/images/sample/basicImage.png\')";
                var html = "";

                console.log("row");
                console.log(row);

                $(".teamBox").html("");

                html +='<div class="teamSubBox">';
                for(var i = 0 ; i < row.length ; i++){

                    var empImage = "background-image:url('"+row[i].FILE_PATH+ ''+'' +row[i].FILE_UUID+"')";

                    if(row[i].SCHOOL_NAME == null || row[i].SCHOOL_NAME == ""){
                        row[i].SCHOOL_NAME = "";
                    }
                    if(row[i].BDAY == null || row[i].BDAY == ""){
                        row[i].BDAY = "";
                    }
                    if(row[i].POSITION_NAME == null || row[i].POSITION_NAME == ""){
                        row[i].POSITION_NAME = "";
                    }
                    if(row[i].FILE_UUID == null || row[i].FILE_UUID == ""){
                        empImage = defaultImage;
                    }

                    if(!i == 0 && i%7 == 0) {
                        html +='</div>';
                        html +='<div class="teamSubBox">';
                    }
                    html +='    <div class="personalBox">';
                    html +='        <div class="photoBox" style="' +empImage+ '; background-size:100px 107px;">';
                    html +='            <p class="photoName">'+row[i].EMP_NAME_KR+'</p>';
                    html +='            <div class="contentBox">';
                    html +='                <p>직급 : <span>'+row[i].DUTY_NAME+'</span></p>';
                    html +='                <p>생년월일 : <span>'+row[i].BDAY+'</span></p>';
                    html +='                <p>입사일 : <span>'+row[i].BDAY+'</span></p>';
                    html +='                <p>출신교 : <span>'+row[i].BDAY+'</span></p>';
                    html +='            </div>';
                    html +='        </div>';
                    html +='    </div>';
                }
                html +='</div>';
                $(".teamBox").html(html);

                if(row.length != 0 ){
                    flag = true;
                }
            },

            error: function (request, status, error) {
                console.log("code: " + request.status)
                console.log("message: " + request.responseText)
                console.log("error: " + error);
            }
        });

        if(flag){
            $(".organization_bg").show();
            $(".shadow").show();
        }

    },

    fnCheckClose : function() {
        $(".organization_bg").hide();
        $(".shadow").hide();
    }
}