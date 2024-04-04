var userReqPop = {

    global : {
        dropDownDataSource : ""
    },

    defaultScript : function(){
        userReqPop.dataSet();
    },

    dataSet : function(){
        $("#empNameKr, #loginPasswd, #loginId, #resRegisNum1, #resRegisNum2, #checkPasswd, #capsNum, #capsNumCaseA, #capsNumCaseB, #capsNumCaseC, #jobDetail, #jobDetailCaseA, #jobDetailCaseB, #beforCareer, #elapsedYear1, #elapsedYear2, #accountHolder, #bankName, #accountNum, #zipCode, #addr, #officeTelNum, #mobileTelNum, #emailAddr, #scienceNo, #carNum, #empNameCn, #empNameEn, #emgTelNum, #legalDomicile, #hobby, #religion, #specialty, #weight, #height, #vision1, #vision2, #carNum1, #carNum2, #carNum3, #workTime, #school, #department, #grade, #studentId").kendoTextBox();
        $("#contract, #qualification, #degreeT, #career, #military, #significant").kendoTextArea({
            rows : 5
        });

        userReqPop.fn_setRegDateForm("regDateCaseA");
        userReqPop.fn_setRegDateForm("regDateCaseB");
        userReqPop.fn_setRegDateForm("birthDay");
        userReqPop.fn_setRegDateForm("sDate");
        userReqPop.fn_setRegDateForm("eDate");

        var detDs = [
            {text: "선택", value: ""},
        ];
        $("#divisDet").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: detDs,
            index: 0,
            change: function(){
                var divisDet = $("#divisDet").val();
                if($("#divis").val() != '1'){
                    if(divisDet == '3' && $("#divis").val() == '4'){
                        $(".defaultCase").each(function(){
                            $(this).css("display", "none");
                        });

                        $(".caseA").each(function(){
                            $(this).css("display", "");
                        });
                    } else {
                        userReqPop.fn_caseARollBack();
                    }
                }

            }
        });


        $("#divisDet").data("kendoDropDownList").wrapper.hide()

        $("#divis").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "선택", value: ""},
                {text: "정규직원", value : "0"},
                {text: "계약직원", value : "4"},
                {text: "단기직원", value : "3"},
                {text: "위촉직원", value : "1"},
                {text: "연수생/학생연구원", value : "2"},
                {text: "기타", value: "10"}
            ],
            index: 0,
            change : function (e){
                var divis = $("#divis").val();
                var detDs = "";
                if(divis == "4"){
                    $("#divisDet").data("kendoDropDownList").wrapper.show()

                    detDs = [
                        {text: "계약직원", value: "1"},
                        {text: "인턴사원", value : "2"},
                        {text: "시설/환경", value : "3"},
                    ];

                    $("#divisDet").data("kendoDropDownList").setDataSource(detDs);
                    $("#divisDet").data("kendoDropDownList").select(0);

                    userReqPop.fn_caseBRollBack();
                    userReqPop.fn_caseCRollBack();
                    userReqPop.fn_caseDRollBack();
                    userReqPop.fn_caseERollBack();
                } else if (divis == '3'){
                    userReqPop.fn_showDivisDet();
                    userReqPop.fn_caseCRollBack();
                    userReqPop.fn_caseDRollBack();
                    userReqPop.fn_caseERollBack();

                    userReqPop.fn_caseARollBack();
                    $(".defaultCaseA").each(function(){
                        $(this).css("display", "none");
                    });

                    $(".caseB").each(function(){
                        $(this).css("display", "");
                    });
                    $(".caseF").each(function(){
                        $(this).css("display", "");
                    });


                } else if(divis == "1"){
                    $("#divisDet").data("kendoDropDownList").wrapper.show()
                    userReqPop.fn_showDivisDet();
                    userReqPop.fn_caseARollBack();
                    userReqPop.fn_caseBRollBack();
                    userReqPop.fn_caseCRollBack();
                    userReqPop.fn_caseERollBack();
                    userReqPop.fn_caseDRollBack();

                    detDs = [
                        {text: "위촉직원", value: "6"},
                        {text: "위촉연구원", value : "4"},
                    ];

                    $("#divisDet").kendoDropDownList({
                        dataTextField: "text",
                        dataValueField: "value",
                        dataSource: detDs,
                        index: 0
                    });

                    $("#divisDet").data("kendoDropDownList").setDataSource(detDs);
                    $("#divisDet").data("kendoDropDownList").select(0);

                    userReqPop.fn_caseBRollBack();
                    $(".defaultCaseB").each(function(){
                        $(this).css("display", "none");
                    });

                    $(".caseC").each(function(){
                        $(this).css("display", "");
                    });
                    $(".caseB").each(function(){
                        $(this).css("display", "");
                    });
                } else if(divis == '2'){
                    userReqPop.fn_showDivisDet();
                    userReqPop.fn_caseARollBack();
                    userReqPop.fn_caseBRollBack();
                    userReqPop.fn_caseCRollBack();
                    userReqPop.fn_caseERollBack();

                    userReqPop.fn_caseDRollBack();
                    $(".defaultCaseC").each(function(){
                        $(this).css("display", "none");
                    });

                    $(".caseD").each(function(){
                        $(this).css("display", "");
                    });

                } else if(divis == '10'){
                    userReqPop.fn_showDivisDet();
                    userReqPop.fn_caseARollBack();
                    userReqPop.fn_caseBRollBack();
                    userReqPop.fn_caseCRollBack();
                    userReqPop.fn_caseDRollBack();

                    userReqPop.fn_caseERollBack();
                    $(".defaultCaseD").each(function(){
                        $(this).css("display", "none");
                    });

                    $(".caseE").each(function(){
                        $(this).css("display", "");
                    });

                } else {
                    userReqPop.fn_showDivisDet();
                    userReqPop.fn_caseARollBack();
                    userReqPop.fn_caseBRollBack();
                    userReqPop.fn_caseCRollBack();
                    userReqPop.fn_caseDRollBack();
                    userReqPop.fn_caseERollBack();
                }
            }
        });

        $("#officeTelNum, #mobileTelNum, #emgTelNum").keyup(function(){
            var val = $(this).val().replace(/[^0-9]/g, '');
            if(val.length > 3 && val.length < 6){
                var tmp = val.substring(0,2)
                if(tmp == "02"){
                    $(this).val(val.substring(0,2) + "-" + val.substring(2));
                } else {
                    $(this).val(val.substring(0,3) + "-" + val.substring(3));
                }
            }else if (val.length > 6){
                var tmp = val.substring(0,2)
                var tmp2 = val.substring(0,4)
                if(tmp == "02"){
                    if(val.length == "10"){
                        $(this).val(val.substring(0,2) + "-" + val.substring(2, 6) + "-" + val.substring(6));
                    } else {
                        $(this).val(val.substring(0,2) + "-" + val.substring(2, 5) + "-" + val.substring(5));
                    }
                } else if(tmp2 == "0505"){
                    if(val.length == "12"){
                        $(this).val(val.substring(0,4) + "-" + val.substring(4, 8) + "-" + val.substring(8));
                    } else {
                        $(this).val(val.substring(0,4) + "-" + val.substring(4, 7) + "-" + val.substring(7));
                    }
                } else {
                    if(val.length == "11"){
                        $(this).val(val.substring(0,3) + "-" + val.substring(3, 7) + "-" + val.substring(7));
                    } else {
                        $(this).val(val.substring(0,3) + "-" + val.substring(3, 6) + "-" + val.substring(6));
                    }
                }
            }
        });

        // 아이디 중복체크
        $("#idCheck").click(function(){
            var data = {
                loginId : $("#loginId").val()
            }

            var rs = customKendo.fn_customAjax("/user/getIdCheck", data);

            if(rs.rs == null || rs.rs == "" || rs.rs == undefined){
                idFlag = true;
                alert("등록이 가능한 아이디입니다.");
            } else {
                alert("중복 등록된 아이디입니다.");
            }
        });

        userReqPop.global.dropDownDataSource = customKendo.fn_customAjax("/system/commonCodeManagement/getCmCodeList", {cmGroupCodeId : "4"});
        customKendo.fn_dropDownList("position", userReqPop.global.dropDownDataSource, "CM_CODE_NM", "CM_CODE", 2);

        $.ajax({
            url : "/userManage/getDeptCodeList2",
            type : "post",
            async: false,
            dataType : "json",
            success : function(result){
                var ds = result.list;
                ds.unshift({deptName: '선택하세요', deptSeq: ''});

                $("#deptName").kendoDropDownList({
                    dataTextField: "deptName",
                    dataValueField: "deptSeq",
                    dataSource: ds,
                    index: 0,
                    change : function(){
                        var data = {
                            deptSeq : $("#deptName").val(),
                            useTeam : '1'
                        }

                        $.ajax({
                            url : "/userManage/getDeptCodeList",
                            type : "post",
                            async: false,
                            data : data,
                            dataType : "json",
                            success : function(result){
                                var ds = result.list;
                                ds.unshift({text: '선택하세요', value: ''});

                                $("#deptTeamName").kendoDropDownList({
                                    dataTextField: "text",
                                    dataValueField: "value",
                                    dataSource: ds,
                                    index: 0,
                                });
                            }
                        });
                    }
                });
            }
        });



        $("#deptTeamName").kendoDropDownList({
            dataTextField: "TEXT",
            dataValueField: "VALUE",
            dataSource: [
                {TEXT: '선택하세요', VALUE: ''}
            ],
            index: 0,
        });


        userReqPop.global.dropDownDataSource = customKendo.fn_customAjax("/system/commonCodeManagement/getCmCodeList", {cmGroupCodeId : "9"});
        customKendo.fn_dropDownList("occupationCode", userReqPop.global.dropDownDataSource, "CM_CODE_NM", "CM_CODE", 2);

        userReqPop.global.dropDownDataSource = customKendo.fn_customAjax("/system/commonCodeManagement/getCmCodeList", {cmGroupCodeId : "3"});
        customKendo.fn_dropDownList("duty", userReqPop.global.dropDownDataSource, "CM_CODE_NM", "CM_CODE", 2);
        
        $("#degreeCode").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "선택하세요", value: ""},
                {text: "고졸", value: "고졸"},
                {text: "전문학사", value: "전문학사"},
                {text: "학사", value: "학사"},
                {text: "석사수료", value: "석사수료"},
                {text: "석사", value: "석사"},
                {text: "박사수료", value: "박사수료"},
                {text: "박사", value: "박사"},
                {text: "기타", value: "기타"},
            ],
            index: 0
        });

        userReqPop.fn_setRegDateForm("regDate");




        $("#bDay").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
        });

        $("#weddingDay").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date()
        });

        $("#resignDay").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date()
        });

        $("#drop11").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "2023", value: "2023"}
            ],
            index: 0
        });

        $("#drop12").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "01", value: "01"},
                {text: "02", value: "02"},
                {text: "03", value: "03"},
                {text: "04", value: "04"},
                {text: "05", value: "05"},
                {text: "06", value: "06"},
                {text: "07", value: "07"},
                {text: "08", value: "08"},
                {text: "09", value: "09"},
                {text: "10", value: "10"},
                {text: "11", value: "11"},
                {text: "12", value: "12"}
            ],
            index: 0
        });

        $("#drop13").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "01", value: "01"},
                {text: "02", value: "02"},
                {text: "03", value: "03"},
                {text: "04", value: "04"},
                {text: "05", value: "05"},
                {text: "06", value: "06"},
                {text: "07", value: "07"},
                {text: "08", value: "08"},
                {text: "09", value: "09"},
                {text: "10", value: "10"},
                {text: "11", value: "11"},
                {text: "12", value: "12"},
                {text: "13", value: "13"},
                {text: "14", value: "14"},
                {text: "15", value: "15"},
                {text: "16", value: "16"},
                {text: "17", value: "17"},
                {text: "18", value: "18"},
                {text: "19", value: "19"},
                {text: "20", value: "20"},
                {text: "21", value: "21"},
                {text: "22", value: "22"},
                {text: "23", value: "23"},
                {text: "24", value: "24"},
                {text: "25", value: "25"},
                {text: "26", value: "26"},
                {text: "27", value: "27"},
                {text: "28", value: "28"},
                {text: "29", value: "29"},
                {text: "30", value: "30"},
                {text: "31", value: "31"}
            ],
            index: 0
        });

      /*  $("#homePageActive").kendoRadioGroup({
            items: [
                { label : "게시", value : "Y" },
                { label : "비게시", value : "N" }
            ],
            layout : "horizontal",
            labelPosition : "after",
        });*/

        $("#weddingActive").kendoRadioGroup({
            items: [
                { label : "기혼", value : "Y" },
                { label : "미혼", value : "N" }
            ],
            layout : "horizontal",
            labelPosition : "after",
        });

        $("#bloodType").kendoRadioGroup({
            items: [
                { label : "A형", value : "A" },
                { label : "B형", value : "B" },
                { label : "O형", value : "O" },
                { label : "AB형", value : "AB" }
            ],
            layout : "horizontal",
            labelPosition : "after",
        });

        $("#lunarYn").on("click", function(){
            var bday = $("#bday").val()

            if($("#lunarYn").is(":checked")) {
                var lunarDay = solarToLunar(bday.split("-")[0], bday.split("-")[1], bday.split("-")[2]);
                $("#lunarBday").text(lunarDay);
            } else {
                $("#lunarYn").val("N");
                $("#lunarBday").text("");
            }
        });

        $("#lunarYn1").on("click", function(){
            var bday = $("#birthDay").val()

            if($("#lunarYn1").is(":checked")) {
                var lunarDay = solarToLunar(bday.split("-")[0], bday.split("-")[1], bday.split("-")[2]);
                $("#lunarBirthDay").text(lunarDay);
            } else {
                $("#lunarYn1").val("N");
                $("#lunarBirthDay").text("");
            }
        });

        /*위촉직원 호칭*/
        $("#nickname").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "선택하세요", value: ""},
                {text: "수석연구원", value: "수석연구원"},
                {text: "책임연구원", value: "책임연구원"},
                {text: "선임연구원", value: "선임연구원"},
                {text: "주임연구원", value: "주임연구원"},
                {text: "연구원", value: "연구원"},
                {text: "기타", value: "기타"},
            ],
            index: 0
        });

        $("#nicknameCaseA").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "선택하세요", value: ""},
                {text: "연수생", value: "연수생"},
                {text: "학생연구원", value: "학생연구원"}
            ],
            index: 0
        });

        /*연수생/학생연구원 학위*/
        $("#degree").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "선택하세요", value: ""},
                {text: "고교 재학", value: "고교 재학"},
                {text: "석사 재학", value: "석사 재학"},
                {text: "박사 재학", value: "박사 재학"}
            ],
            index: 0
        });

        $("#degreeCodeA").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "선택하세요", value: ""},
                {text: "고졸", value: "고졸"},
                {text: "전문학사", value: "전문학사"},
                {text: "학사", value: "학사"},
                {text: "석사수료", value: "석사수료"},
                {text: "석사", value: "석사"},
                {text: "박사수료", value: "박사수료"},
                {text: "박사", value: "박사"},
                {text: "기타", value: "기타"},
            ],
            index: 0
        });

        $("#carActive").bind("change", function(){
            if($('#carActive').is(':checked')){
                $("#carNumDiv").show();
            }else{
                $("#carNumDiv").hide();
            }
        });

        $("#birthDay").bind("change", function(){
            $("#bDay").val($("#birthDay").val());
        });
        $("#bDay").bind("change", function(){
            $("#birthDay").val($("#bDay").val());
        });
    },

    fn_showDivisDet: function (){
        $("#divisDet").val("");
        $("#divisDet").data("kendoDropDownList").wrapper.hide();
    },

    fn_setRegDateForm: function(id){
        $("#" + id).kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date()
        });
    },

    fn_caseARollBack : function (){
        $(".defaultCase").each(function(){
            $(this).css("display", "");
        });

        $(".caseA").each(function(){
            $(this).css("display", "none");
        });
    },

    fn_caseBRollBack : function (){
        $(".defaultCaseA").each(function(){
            $(this).css("display", "");
        });
        $(".caseC").each(function(){
            $(this).css("display", "");
        });
        $(".caseB").each(function(){
            $(this).css("display", "none");
        });
    },

    fn_caseCRollBack: function (){
        $(".defaultCaseB").each(function(){
            $(this).css("display", "");
        });

        $(".caseC").each(function(){
            $(this).css("display", "none");
        });
    },

    fn_caseDRollBack: function (){
        $(".defaultCaseC").each(function(){
            $(this).css("display", "");
        });

        $(".caseD").each(function(){
            $(this).css("display", "none");
        });
    },

    fn_caseERollBack: function (){
        $(".defaultCaseD").each(function(){
            $(this).css("display", "");
        });

        $(".caseE").each(function(){
            $(this).css("display", "none");
        });
    },


    dataSetChange : function() {
        if($("#holidayCate").val() != '' && $("#holidayCate").val() == 0) {
            $("#varianceTH").text("대체휴가일자");
            var html = '<table class="table table-bordered mb-0" id="holidayPlanReqPopTbVal">\n' +
                '              <colgroup>\n' +
                '                <col width="10%">\n' +
                '                <col width="30%">\n' +
                '                <col width="20%">\n' +
                '                <col width="30%">\n' +
                '              </colgroup>\n' +
                '              <thead>\n' +
                '              <tr>\n' +
                '                <th>대체휴가일자</th>\n' +
                '                <td colspan="3">\n' +
                '                  <input id="start_date" style="width:20%; margin-right:5px;">\n' +
                '                </td>\n' +
                '              </tr>\n' +
                '              <tr>\n' +
                '                <th scope="row" class="text-center th-color">안내사항</th>\n' +
                '                <td colspan="3">\n' +
                '                  * 휴일근로는 공휴일, 토요일, 일요일 등 휴무일에 근로가 필요한 경우 신청합니다.\n' +
                '                <br>\n' +
                '                  * 휴일근로는 대체휴가(1:1)로 처리하오니 대체휴가일을 선택해서 신청합니다.(필수)\n' +
                '                <br>\n' +
                '                  * 근로일자가 지정된 신청내용만 저장됩니다.\n' +
                '                </td>\n' +
                '              </tr>\n' +
                '              <tr>\n' +
                '                <th scope="row" class="text-center th-color">근로일자</th>\n' +
                '                <td colspan="3">\n' +
                '                  <table style="width:100%; margin-top:5px;">\n' +
                '                      <tr style="background-color:#d8dce36b;">\n' +
                '                        <th>근로일자</th>\n' +
                '                        <th>근로시간</th>\n' +
                '                        <th>비고</th>\n' +
                '                      </tr>\n' +
                '                      <tr style="background-color:#fff;">\n' +
                '                        <td style="text-align: center"><input id="end_date" style="width:150px; margin-right:5px;"></td>\n' +
                '                        <td style="text-align: center"><input id="start_time" style="width:110px;"> ~ <input id="end_time" style="width:110px;"></td>\n' +
                '                        <td style="text-align: center"><input type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" value="초기화" onclick=""/></td>\n' +
                '                      </tr>\n' +
                '                  </table>\n' +
                '                </td>\n' +
                '              </tr>\n' +
                '              <tr>\n' +
                '                <th scope="row" class="text-center th-color">사유</th>\n' +
                '                <td colspan="3">\n' +
                '                  <textarea name="apply_reason" id="holiday_reason" rows="5" style="width:100%; border: 1px solid #eee;padding-left: 10px;"></textarea>\n' +
                '                </td>\n' +
                '              </tr>\n' +
                '              <tr>\n' +
                '                <th scope="row" class="text-center th-color">신청일</th>\n' +
                '                <td colspan="3">\n' +
                '                  <input type="date" id="now_date" style="width: 20%;">\n' +
                '                </td>\n' +
                '              </tr>\n' +
                '              </thead>\n' +
                '            </table>';
            $("#holidayPlanReqPopTbVal").html(html);
            userReqPop.dataSet();
        }else if($("#holidayCate").val() == 8) {
            var html2 = '<table class="table table-bordered mb-0" id="holidayPlanReqPopTbVal">\n' +
                '              <colgroup>\n' +
                '                <col width="10%">\n' +
                '                <col width="30%">\n' +
                '                <col width="20%">\n' +
                '                <col width="30%">\n' +
                '              </colgroup>\n' +
                '              <thead>\n' +
                '              <tr>\n' +
                '                <th>휴일 근로 일자</th>\n' +
                '                <td colspan="3">\n' +
                '                  <input id="holiday_date" style="width:20%; margin-right:5px;">' +
                '                   <button class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="userReqPop.searchHolidayPop();" type="button"><i class="fa fa-search"></i></button>\n' +
                '                </td>\n' +
                '              </tr>\n' +
                '              <tr>\n' +
                '                <th>기간</th>\n' +
                '                <td colspan="3">\n' +
                '                  <input id="start_date" style="width:20%; margin-right:5px;"><input id="start_time" style="width:15%;">\n' +
                '                  ~\n' +
                '                  <input id="end_date" style="width:20%; margin-right:5px;"><input id="end_time" style="width:15%;">\n' +
                '                  <table style="width:100%; margin-top:5px;">\n' +
                '                      <tr style="background-color:#d8dce36b;">\n' +
                '                        <th rowspan="2">근무시간유형</th>\n' +
                '                        <th>시차출근A</th>\n' +
                '                        <th>기본</th>\n' +
                '                        <th>시차출근B</th>\n' +
                '                        <th>시차출근C</th>\n' +
                '                      </tr>\n' +
                '                      <tr style="background-color:#d8dce36b;">\n' +
                '                        <th>08:00 ~ 17:00</th>\n' +
                '                        <th>09:00 ~ 18:00</th>\n' +
                '                        <th>10:00 ~ 19:00</th>\n' +
                '                        <th>14:00 ~ 22:30</th>\n' +
                '                      </tr>\n' +
                '                      <tr style="background-color:#fff;">\n' +
                '                        <td>오전반차</td>\n' +
                '                        <td>08:00 ~ 13:00</td>\n' +
                '                        <td>09:00 ~ 14:00</td>\n' +
                '                        <td>10:00 ~ 15:00</td>\n' +
                '                        <td>-</td>\n' +
                '                      </tr>\n' +
                '                      <tr style="background-color:#fff;">\n' +
                '                        <td>오후반차</td>\n' +
                '                        <td>13:00 ~ 17:00</td>\n' +
                '                        <td>14:00 ~ 18:00</td>\n' +
                '                        <td>15:00 ~ 19:00</td>\n' +
                '                        <td>14:00 ~ 18:00</td>\n' +
                '                      </tr>\n' +
                '                  </table>\n' +
                '                </td>\n' +
                '              </tr>\n' +
                '              <tr>\n' +
                '                <th scope="row" class="text-center th-color">사유</th>\n' +
                '                <td colspan="3">\n' +
                '                  <textarea name="apply_reason" id="holiday_reason" rows="5" style="width:100%; border: 1px solid #eee;padding-left: 10px;"></textarea>\n' +
                '                </td>\n' +
                '              </tr>\n' +
                '              <tr>\n' +
                '                <th scope="row" class="text-center th-color">기타사항<br>(인수인계 등)</th>\n' +
                '                <td colspan="3">\n' +
                '                  <textarea name="apply_reason" id="other_reason" rows="5" style="width:100%; border: 1px solid #eee;padding-left: 10px;"></textarea>\n' +
                '                </td>\n' +
                '              </tr>\n' +
                '              <tr>\n' +
                '                <th scope="row" class="text-center th-color">업무인수자</th>\n' +
                '                <td colspan="3">\n' +
                '                  <input type="text" id="other_emp" name="other_emp" class="defaultVal" style="width: 20%;">\n' +
                '                  <input type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" value="검색" onclick=""/>\n' +
                '                  <br>\n' +
                '                  <input type="button" class="mt10 k-grid-button k-button k-button-md k-button-solid k-button-solid-base" value="선택 초기화" onclick=""/>\n' +
                '                </td>\n' +
                '              </tr>\n' +
                '              <tr>\n' +
                '                <th scope="row" class="text-center th-color">신청일</th>\n' +
                '                <td colspan="3">\n' +
                '                  <input type="date" id="now_date" style="width: 20%;">\n' +
                '                </td>\n' +
                '              </tr>\n' +
                '              </thead>\n' +
                '            </table>';
            $("#holidayPlanReqPopTbVal").html(html2);
            userReqPop.dataSet();
        }else {
            var html3 = '<table class="table table-bordered mb-0" id="holidayPlanReqPopTbVal">\n' +
                '              <colgroup>\n' +
                '                <col width="10%">\n' +
                '                <col width="30%">\n' +
                '                <col width="20%">\n' +
                '                <col width="30%">\n' +
                '              </colgroup>\n' +
                '              <thead>\n' +
                '              <tr>\n' +
                '                <th>기간</th>\n' +
                '                <td colspan="3">\n' +
                '                  <input id="start_date" style="width:20%; margin-right:5px;"><input id="start_time" style="width:15%;">\n' +
                '                  ~\n' +
                '                  <input id="end_date" style="width:20%; margin-right:5px;"><input id="end_time" style="width:15%;">\n' +
                '                  <table style="width:100%; margin-top:5px;">\n' +
                '                      <tr style="background-color:#d8dce36b;">\n' +
                '                        <th rowspan="2">근무시간유형</th>\n' +
                '                        <th>시차출근A</th>\n' +
                '                        <th>기본</th>\n' +
                '                        <th>시차출근B</th>\n' +
                '                        <th>시차출근C</th>\n' +
                '                      </tr>\n' +
                '                      <tr style="background-color:#d8dce36b;">\n' +
                '                        <th>08:00 ~ 17:00</th>\n' +
                '                        <th>09:00 ~ 18:00</th>\n' +
                '                        <th>10:00 ~ 19:00</th>\n' +
                '                        <th>14:00 ~ 22:30</th>\n' +
                '                      </tr>\n' +
                '                      <tr style="background-color:#fff;">\n' +
                '                        <td>오전반차</td>\n' +
                '                        <td>08:00 ~ 13:00</td>\n' +
                '                        <td>09:00 ~ 14:00</td>\n' +
                '                        <td>10:00 ~ 15:00</td>\n' +
                '                        <td>-</td>\n' +
                '                      </tr>\n' +
                '                      <tr style="background-color:#fff;">\n' +
                '                        <td>오후반차</td>\n' +
                '                        <td>13:00 ~ 17:00</td>\n' +
                '                        <td>14:00 ~ 18:00</td>\n' +
                '                        <td>15:00 ~ 19:00</td>\n' +
                '                        <td>14:00 ~ 18:00</td>\n' +
                '                      </tr>\n' +
                '                  </table>\n' +
                '                </td>\n' +
                '              </tr>\n' +
                '              <tr>\n' +
                '                <th scope="row" class="text-center th-color">사유</th>\n' +
                '                <td colspan="3">\n' +
                '                  <textarea name="apply_reason" id="holiday_reason" rows="5" style="width:100%; border: 1px solid #eee;padding-left: 10px;"></textarea>\n' +
                '                </td>\n' +
                '              </tr>\n' +
                '              <tr>\n' +
                '                <th scope="row" class="text-center th-color">기타사항<br>(인수인계 등)</th>\n' +
                '                <td colspan="3">\n' +
                '                  <textarea name="apply_reason" id="other_reason" rows="5" style="width:100%; border: 1px solid #eee;padding-left: 10px;"></textarea>\n' +
                '                </td>\n' +
                '              </tr>\n' +
                '              <tr>\n' +
                '                <th scope="row" class="text-center th-color">업무인수자</th>\n' +
                '                <td colspan="3">\n' +
                '                  <input type="text" id="other_emp" name="other_emp" class="defaultVal" style="width: 20%;">\n' +
                '                  <input type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" value="검색" onclick=""/>\n' +
                '                  <br>\n' +
                '                  <input type="button" class="mt10 k-grid-button k-button k-button-md k-button-solid k-button-solid-base" value="선택 초기화" onclick=""/>\n' +
                '                </td>\n' +
                '              </tr>\n' +
                '              <tr>\n' +
                '                <th scope="row" class="text-center th-color">신청일</th>\n' +
                '                <td colspan="3">\n' +
                '                  <input type="date" id="now_date" style="width: 20%;">\n' +
                '                </td>\n' +
                '              </tr>\n' +
                '              </thead>\n' +
                '            </table>';
            $("#holidayPlanReqPopTbVal").html(html3);
            userReqPop.dataSet();
        }
    },

    userReqPopImage : function() {
        var url = "/Inside/pop/userReqPopImage.do";
        var name = "recruitReqPopImage";
        var option = "width=1100, height=650, scrollbars=no, top=200, left=300, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    },

    userReqSave : function (){
        //var chkVal = userReqPop.setUserReqDetail();
        if(!confirm("신청내용을 저장하시겠습니까?")){
            return ;
        }

        let deptSeq = ''
        let deptName = ''
        if($("#deptTeamName").val() == "" || $("#deptTeamName").val() == undefined){
            deptSeq = $("#deptName").val();
            deptName = $("#deptName").val() == "" ? "" : $("#deptName").data("kendoDropDownList").text();
        }else{
            deptSeq = $("#deptTeamName").val();
            deptName = $("#deptTeamName").val() == "" ? "" : $("#deptTeamName").data("kendoDropDownList").text();
        }

        var data = {
            //ERP_EMP_SEQ : "",
            EMP_NAME_KR : $("#empNameKr").val(), //이름
            LOGIN_PASSWD : $("#loginPasswd").val(), //비밀번호
            LOGIN_ID : $("#loginId").val(), //아이디
            RES_REGIS_NUM : $("#resRegisNum1").val() + "-" + $("#resRegisNum2").val(), //주민등록번호
            CAPS_NUM : $("#capsNum").val(), //CAPS 번호

            division : $("#divis").val(), //직원구분
            divisionSub : $("#divisDet").val(), //직원구분
            DEPT_SEQ : deptSeq, //부서
            DEPT_NAME : deptName,
            DEPT_TEAM_SEQ : $("#deptTeamName").val(), //팀
            DEPT_TEAM_NAME : $("#deptTeamName").val() == "" ? "" : $("#deptTeamName").data("kendoDropDownList").text(),
            JOB_DETAIL : $("#jobDetail").val(), //직무사항
            BEFOR_CAREER : $("#beforCareer").val(), //전직경력
            BS_ELAPSED_YEAR : $("#elapsedYear1").val(),
            ELAPSED_YEAR : $("#elapsedYear2").val(),
            ACCOUNT_HOLDER : $("#accountHolder").val(), //예금주
            BANK_NAME : $("#bankName").val(), //은행명
            ACCOUNT_NUM : $("#accountNum").val(), //계좌번호
            ZIP_CODE : $("#zipCode").val(), //우편번호 현주소(주소)
            ADDR : $("#addr").val(), //우편번호 현주소(주소)
            ADDR_DETAIL : $("#addrDetail").val(), //거주지 지번주소
            OFFICE_TEL_NUM : $("#officeTelNum").val(), //전화번호
            MOBILE_TEL_NUM : $("#mobileTelNum").val(), //전화번호
            EMAIL_ADDR : $("#emailAddr").val(), //이메일
            SCIENCE_NO : $("#scienceNo").val(), //과학기술인 번호
            JOIN_DAY : $("#regDate").val(), // 입사일자
            POSITION_CODE : $("#position").val(), // 직급 / 등급
            DUTY_CODE : $("#duty").val(), // 직책
            DUTY_NAME : $("#duty").val() == "" ? "" : $("#duty").data("kendoDropDownList").text(), // 직책

            EMP_NAME_CN : $("#empNameCn").val(), //한자 이름
            EMP_NAME_EN : $("#empNameEn").val(), //영문 이름

            EMG_TEL_NUM : $("#emgTelNum").val(), //긴급 연락처
            LEGAL_DOMICILE : $("#legalDomicile").val(), //본적

            HOBBY : $("#hobby").val(), //취미
            RELIGION : $("#religion").val(), //종교
            SPECIALITY : $("#specialty").val(), //특기
            WEIGHT : $("#weight").val(), //체중
            HEIGHT : $("#height").val(), //신장
            VISIONL : $("#vision1").val(), //좌시력
            VISIONR : $("#vision2").val(), //우시력

            /*HOME_PAGE_ACTIVE : $("#homePageActive").getKendoRadioGroup().value(), //홈페이지 게시*/
            WEDDING_ACTIVE : $("#weddingActive").getKendoRadioGroup().value(), //결혼 관계
            BLOOD_TYPE : $("#bloodType").getKendoRadioGroup().value(), //혈액형
            OCCUPATION_CODE : $("#occupationCode").val(),

            DEGREE_CODE : $("#degreeCode").val(),

            /*직원구분 추가*/
            // CTR_ST_DAY : $("#sDate").val(), //계약시작일
            // CTR_EN_DAY : $("#eDate").val(), //계약종료일
            WEEK_WORK_TIME : $("#workTime").val(), //근무시간/일
            CONTRACT : $("#contract").val(), //근로계약/협약 조건

            /*연수생/학생연구원*/
            SCHOOL : $("#school").val(), //학교
            DEGREE : $("#degree").val(), //학위
            DEPARTMENT : $("#department").val(), //학과
            GRADE : $("#grade").val(), //학년
            STUDENT_ID : $("#studentId").val(), //학번

            QUALIFICATION : $("#qualification").val(), //기능 및 자격
            LAST_DEGREE : $("#degreeT").val(), //최종학력
            CAREER : $("#career").val(), //경력
            MILITARY : $("#military").val(), //병역
            SIGNIFICANT : $("#significant").val(), //특이사항

            /*위촉직원*/
            NICK_NAME : $("#nickname").val(), //호칭
        }
        console.log(data);

        if($("#divisDet").val() == '3' && $("#divis").val() == '4'){ /*계약직원 - 경비/환경*/
            data.JOIN_DAY = $("#regDateCaseA").val(); //입사일자
            data.CAPS_NUM = $("#capsNumCaseA").val(); //CAPS 번호
            data.DEGREE_CODE = $("#degreeCodeA").val(); //학위
            data.JOB_DETAIL = $("#jobDetailCaseB").val(); //직무사항
        }

        if($("#divis").val() == '3'){ /*단기직원*/
            data.CAPS_NUM = $("#capsNumCaseB").val(); //CAPS 번호
            data.DEGREE_CODE = $("#degreeCodeA").val(); //학위
            data.JOB_DETAIL = $("#jobDetailCaseB").val(); //직무사항
        }

        if($("#divis").val() == '1'){ /*위촉직원*/
            data.CAPS_NUM = $("#capsNumCaseB").val(); //CAPS 번호
            data.BDAY = $("#birthDay").val(); //생년월일
            data.DEGREE_CODE = $("#degreeCodeA").val(); //학위
            data.JOB_DETAIL = $("#jobDetailCaseB").val(); //직무사항
        }
        if($("#divis").val() == '2'){ /*연수생/학생연구원*/
            data.JOB_DETAIL = $("#jobDetailCaseA").val(); //직무사항
            data.CAPS_NUM = $("#capsNumCaseC").val(); //CAPS 번호
            data.JOIN_DAY = $("#regDateCaseB").val(); //입사일자
            data.NICK_NAME = $("#nicknameCaseA").val(); //호칭
        }

        if($("#divis").val() == '10'){ /*기타*/
            data.JOB_DETAIL = $("#jobDetailCaseA").val(); //직무사항
            data.CAPS_NUM = $("#capsNumCaseC").val(); //CAPS 번호
        }
        


        if($("#targetEmpSeq").val() != ""){
            //업데이트
            if($("#lunarYn").is(":checked")){
                data.LUNAR_CAL = "Y"
            }else {
                data.LUNAR_CAL = "N"
            }
            data.BDAY = $("#bDay").val();
        }else{
            //신규
            if($("#lunarYn1").is(":checked")){
                data.LUNAR_CAL = "Y"
            }else {
                data.LUNAR_CAL = "N"
            }
            data.BDAY = $("#birthDay").val(); //생년월일
        }

        if($("#weddingActive").getKendoRadioGroup().value() == "Y"){
            data.WEDDING_DAY = $("#weddingDay").val();
        }

        if($("#targetEmpSeq").val() != ""){
            data.TARGET_EMP_SEQ = $("#targetEmpSeq").val();
        }

        if($("#deptTeamName").val() != '' && $("#deptTeamName").val() != null){
            data.DEPT_SEQ = $("#deptTeamName").val();
        }

        if($("#carActive").is(":checked")){
            data.CAR_ACTIVE = "Y"
            data.CAR_NUM = $("#carNum1").val();
        } else {
            data.CAR_ACTIVE = "N"
            data.CAR_NUM = "";
        }

        if($("#check1").is(":checked")){
            data.TEMP_DIVISION = "Y"
        } else {
            data.TEMP_DIVISION = "N"
        }

        if($("#check3").is(":checked")){
            data.ACTIVE = "N"
        } else {
            data.ACTIVE = "Y"
        }

        if($("#sDate").val() != ""){
            data.CTR_ST_DAY = $("#sDate").val();
        }
        if($("#eDate").val() != ""){
            data.CTR_EN_DAY = $("#eDate").val();
        }

        if(data.EMP_NAME_KR == "" || data.EMP_NAME_KR == null){
            alert("이름을 입력해주세요.");

            return;
        }

        if(data.LOGIN_ID == "" || data.LOGIN_ID == null){
            alert("아이디를 입력해주세요.");
            return;
        }



        if(data.division == "" || data.division == null) {
            alert("직원구분을 선택해주세요.");
            return;
        }

        if($("#targetEmpSeq").val() != ""){
            if(data.LOGIN_PASSWD != "" || data.LOGIN_PASSWD != null){
                data.PASSCHANGE = "true";
            }
        }else{

            if(!idFlag){
                alert("중복확인을 해주세요.")
                return;
            }

            if(data.LOGIN_PASSWD == "" || data.LOGIN_PASSWD == null){
                alert("비밀번호를 입력해주세요.");
                return;
            }
        }

        /*if($("#resRegisNum1").val().length != 6 || $("#resRegisNum2").val().length != 1){
            alert("주민등록번호의 입력이 잘못되었습니다.");
            return;
        }*/

        if($("#loginPasswd").val() != $("#checkPasswd").val()){
            alert("비밀번호가 맞지 않습니다. 확인해주세요.");

            return;
        }

        if($("#position").val() != ""){
            var positionName = "";
            var gradeName = $("#position").data("kendoDropDownList").text();
            if($("#position").data("kendoDropDownList").text().indexOf("/") > -1){
                positionName = $("#position").data("kendoDropDownList").text().split("/")[0].trim();
                gradeName = $("#position").data("kendoDropDownList").text().split("/")[1].trim();

            }else{
                positionName = gradeName;
            }
            data.GRADE_NAME = gradeName;
            data.POSITION_NAME = positionName;
        }else{
            data.GRADE_NAME = "";
            data.POSITION_NAME = "";
        }

        var urlType = "";

        if($("#targetEmpSeq").val() != ""){
            urlType = "/userManage/setUserReqDetailUpdate";
            opener.userPersonList.fn_reloadOpner();
        }else{
            urlType = "/userManage/setUserReqDetailInsert";
            opener.userPersonList.fn_reloadOpner();
        }

        $.ajax({
            url : urlType,
            data : data,
            dataType : "application/json",
            type : "POST",
            async : false,
            success : function (result){
                window.close();
                opener.userPersonList.gridReload();
                opener.userPersonList.fn_reloadOpner();
            },
            complete : function (){
                if($("#targetEmpSeq").val() != ""){
                    location.href = "/Inside/pop/userViewPop.do?empSeq=" + $("#targetEmpSeq").val();
                    if($("#divisDet").val() == '3' && $("#divis").val() == '4'){ /*계약직원 - 경비/환경*/
                        location.href = "/Inside/pop/userViewContractPop.do?empSeq=" + $("#targetEmpSeq").val();
                    }else if($("#divis").val() == '3' || $("#divis").val() == '1' || $("#divis").val() == '10'){ /*단기직원*/ /*위촉직원*/ /*기타*/
                        location.href = "/Inside/pop/userViewContractPop.do?empSeq=" + $("#targetEmpSeq").val();
                    }else if($("#divis").val() == '2') { /*연수생/학생연구원*/
                        location.href = "/Inside/pop/userViewTraineePop.do?empSeq=" + $("#targetEmpSeq").val();
                    }
                }else{
                    window.close();
                }
                opener.userPersonList.gridReload();
                opener.userPersonList.fn_reloadOpner();
            },

        })
    },

    fn_windowClose : function(){
        window.close();
    },


    fn_regex : function (type, value) {
        // 숫자 검사기
        let reg_num = /([0-9]{2}(0[1-9]|1[0-2])(0[1-9]|[1,2][0-9]|3[0,1]))/;
        let reg_mobile = /^\d{3}-\d{3,4}-\d{4}$/;
        let space = /\s/g;
        switch (type) {
            case "1" :
                if(!reg_num.test(value)){
                    alert("주민등록번호 숫자만 입력해주세요.");
                    $("#resRegisNum1").val("");
                    return false;
                }
                return value;
            case "2" :
                if(!reg_num.test(value)){
                    alert("휴대폰 번호 오류.");
                    $("#resRegisNum1").val("");
                    return false;
                }
            case "3" :
                if(!reg_num.test(value)){
                    alert("공백 불가.");
                    return false;
                }
                return value;
        }
    },

    addrSearch : function(){
        daum.postcode.load(function(){
            new daum.Postcode({
                oncomplete: function(data){

                    var roadAddr = data.roadAddress; // 도로명 주소 변수
                    var extraRoadAddr = ''; // 참고 항목 변수

                    // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                    // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                    if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                        extraRoadAddr += data.bname;
                    }
                    // 건물명이 있고, 공동주택일 경우 추가한다.
                    if(data.buildingName !== '' && data.apartment === 'Y'){
                        extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                    }
                    // 표시할 참고항목이 있을 경우
                    if(extraRoadAddr !== ''){
                        extraRoadAddr = ' (' + extraRoadAddr + ')';
                    }

                    $("#post").val(data.zonecode);
                    $("#zipCode").val(data.zonecode);
                    $("#addr").val(roadAddr);
                    $("#addrDetail").val(roadAddr);

                    // 참고항목 문자열이 있을 경우 해당 필드에 넣는다.
                    if(roadAddr !== ''){
                        //$("#subAddr").val(extraRoadAddr);
                    } else {
                        //$("#subAddr").val("");
                    }

                    var guideTextBox = document.getElementById("guide");
                    // 사용자가 '선택 안함'을 클릭한 경우, 예상 주소라는 표시
                    if(data.autoRoadAddress) {
                        var expRoadAddr = data.autoRoadAddress + extraRoadAddr;
                        guideTextBox.innerHTML = '(예상 도로명 주소 : ' + expRoadAddr + ')';
                        guideTextBox.style.display = 'block';

                    } else if(data.autoJibunAddress) {
                        var expJibunAddr = data.autoJibunAddress;
                        guideTextBox.innerHTML = '(예상 지번 주소 : ' + expJibunAddr + ')';
                        guideTextBox.style.display = 'block';
                    } else if(guideTextBox != null){
                        guideTextBox.innerHTML = '';
                        guideTextBox.style.display = 'none';
                    }

                    $("#addrDetail").focus();
                }
            }).open();
        });
    },
}

function empInfoFileSave(){

    var formData = new FormData();
    formData.append("menuCd", $("#menuCd").val());
    formData.append("empSeq", $("#empSeq").val());

    if($("#idPhotoFile")[0].files.length == 1){ //증명사진
        formData.append("idPhotoFile", $("#idPhotoFile")[0].files[0]);
    }
    if($("#signPhotoFile")[0].files.length == 1){   //결재사인
        formData.append("signPhotoFile", $("#signPhotoFile")[0].files[0]);
    }
    if($("#sign2PhotoFile")[0].files.length == 1){   //직인
        formData.append("sign2PhotoFile", $("#sign2PhotoFile")[0].files[0]);
    }

    $.ajax({
        url: '/userManage/setempInfoFileSave.do',
        data: formData,
        type: "post",
        async : false,
        datatype: "json",
        contentType: false,
        processData: false,
        success: function () {
            alert("정보 등록이 완료되었습니다.");
            open_in_frame('/Inside/imageManage.do');
        },
        error : function(){
            alert("정보 등록 중 에러가 발생했습니다.");
        }
    });
}

//이미지관리 팝업창에서 저장
function empInfoFileSavePop(){

    var formData = new FormData();
    formData.append("menuCd", $("#menuCd").val());
    formData.append("empSeq", $("#empSeq").val());

    if($("#idPhotoFile")[0].files.length == 1){ //증명사진
        formData.append("idPhotoFile", $("#idPhotoFile")[0].files[0]);
    }
    if($("#signPhotoFile")[0].files.length == 1){   //결재사인
        formData.append("signPhotoFile", $("#signPhotoFile")[0].files[0]);
    }

    $.ajax({
        url: '/userManage/setempInfoFileSave.do',
        data: formData,
        type: "post",
        async : false,
        datatype: "json",
        contentType: false,
        processData: false,
        success: function () {
            alert("정보 등록이 완료되었습니다.");
            window.opener.location.reload();
            window.close();
        },
        error : function(){
            alert("정보 등록 중 에러가 발생했습니다.");
        }
    });
}

//증명사진 첨부 이미지 미리보기
function viewPhoto(input){
    if(input.files[0].size > 10000000){
        alert("파일 용량이 너무 큽니다. 10MB 이하로 업로드해주세요.");
        return;
    }

    if(input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#photoView').attr('src', e.target.result);
            $('#photoView').css('display', 'block');
            $('#photoViewText').css('display', 'none');
        }
        reader.readAsDataURL(input.files[0]);
    }
}

//결재사인 첨부 이미지 미리보기
function viewSignPhoto(input) {
    if(input.files[0].size > 10000000){
        alert("파일 용량이 너무 큽니다. 10MB 이하로 업로드해주세요.");
        return;
    }

    if(input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#signPhotoView').attr('src', e.target.result);
            $('#signPhotoView').css('display', 'block');
            $('#signPhotoViewText').css('display', 'none');
        }
        reader.readAsDataURL(input.files[0]);
    }
}

//직인 첨부 이미지 미리보기
 function viewSign2Photo(input) {
    if(input.files[0].size > 10000000){
        alert("파일 용량이 너무 큽니다. 10MB 이하로 업로드해주세요.");
        return;
    }

    if(input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#sign2PhotoView').attr('src', e.target.result);
            $('#sign2PhotoView').css('display', 'block');
            $('#sign2PhotoViewText').css('display', 'none');
        }
        reader.readAsDataURL(input.files[0]);
    }
}