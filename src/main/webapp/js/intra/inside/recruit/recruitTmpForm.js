var recruitTmp = {
    global : {
        dropDownDataSource : ""
    },

    defaultScript : function(){
        recruitTmp.dataSet();
    },

    dataSet : function() {
        $("#empNameKr, #loginPasswd, #loginId, #resRegisNum1, #resRegisNum2, #checkPasswd, #capsNum, #capsNumCaseA, #capsNumCaseB, #capsNumCaseC, #jobDetail, #jobDetailCaseA, #jobDetailCaseB, #beforCareer, #elapsedYear1, #elapsedYear2, #accountHolder, #bankName, #accountNum, #zipCode, #addr, #officeTelNum, #mobileTelNum, #emailAddr, #carNum, #empNameCn, #empNameEn, #emgTelNum, #legalDomicile, #hobby, #religion, #specialty, #weight, #height, #vision1, #vision2, #carNum1, #carNum2, #carNum3, #workTime, #school, #department, #grade, #studentId").kendoTextBox();
        $("#contract, #qualification, #degreeT, #career, #military, #significant").kendoTextArea({
            rows: 5
        });

        recruitTmp.fn_setRegDateForm("regDate");
        recruitTmp.fn_setRegDateForm("regDateCaseA");
        recruitTmp.fn_setRegDateForm("regDateCaseB");
        recruitTmp.fn_setRegDateForm("birthDay");
        recruitTmp.fn_setRegDateForm("sDate");
        recruitTmp.fn_setRegDateForm("eDate");

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
                        recruitTmp.fn_caseARollBack();
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

                    recruitTmp.fn_caseBRollBack();
                    recruitTmp.fn_caseCRollBack();
                    recruitTmp.fn_caseDRollBack();
                    recruitTmp.fn_caseERollBack();
                } else if (divis == '3'){
                    recruitTmp.fn_showDivisDet();
                    recruitTmp.fn_caseCRollBack();
                    recruitTmp.fn_caseDRollBack();
                    recruitTmp.fn_caseERollBack();

                    recruitTmp.fn_caseARollBack();
                    $(".defaultCaseA").each(function(){
                        $(this).css("display", "none");
                    });

                    $(".caseB").each(function(){
                        $(this).css("display", "");
                    });
                    $(".caseF").each(function(){
                        $(this).css("display", "");
                    });

                    $("#divis").data("kendoDropDownList").enable(false);



                } else if(divis == "1"){
                    $("#divisDet").data("kendoDropDownList").wrapper.show()
                    recruitTmp.fn_showDivisDet();
                    recruitTmp.fn_caseARollBack();
                    recruitTmp.fn_caseBRollBack();
                    recruitTmp.fn_caseCRollBack();
                    recruitTmp.fn_caseERollBack();
                    recruitTmp.fn_caseDRollBack();

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

                    recruitTmp.fn_caseBRollBack();


                    $(".defaultCaseB").each(function(){
                        $(this).css("display", "none");
                    });

                    $(".caseC").each(function(){
                        $(this).css("display", "");
                    });
                    $(".caseB").each(function(){
                        $(this).css("display", "");
                    });

                    $("#divis").data("kendoDropDownList").enable(false);
                    $("#divisDet").data("kendoDropDownList").enable(false);

                } else if(divis == '2'){
                    recruitTmp.fn_showDivisDet();
                    recruitTmp.fn_caseARollBack();
                    recruitTmp.fn_caseBRollBack();
                    recruitTmp.fn_caseCRollBack();
                    recruitTmp.fn_caseERollBack();

                    recruitTmp.fn_caseDRollBack();
                    $(".defaultCaseC").each(function(){
                        $(this).css("display", "none");
                    });

                    $(".caseD").each(function(){
                        $(this).css("display", "");
                    });

                    $("#divis").data("kendoDropDownList").enable(false);

                } else if(divis == '10'){
                    recruitTmp.fn_showDivisDet();
                    recruitTmp.fn_caseARollBack();
                    recruitTmp.fn_caseBRollBack();
                    recruitTmp.fn_caseCRollBack();
                    recruitTmp.fn_caseDRollBack();

                    recruitTmp.fn_caseERollBack();
                    $(".defaultCaseD").each(function(){
                        $(this).css("display", "none");
                    });

                    $(".caseE").each(function(){
                        $(this).css("display", "");
                    });

                } else {
                    recruitTmp.fn_showDivisDet();
                    recruitTmp.fn_caseARollBack();
                    recruitTmp.fn_caseBRollBack();
                    recruitTmp.fn_caseCRollBack();
                    recruitTmp.fn_caseDRollBack();
                    recruitTmp.fn_caseERollBack();
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

        recruitTmp.global.dropDownDataSource = customKendo.fn_customAjax("/system/commonCodeManagement/getCmCodeList", {cmGroupCodeId : "4"});
        customKendo.fn_dropDownList("position", recruitTmp.global.dropDownDataSource, "CM_CODE_NM", "CM_CODE", 2);

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
                            deptSeq : $("#deptName").val()
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


        $("#bDay").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
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

    userReqSave : function (){
        //var chkVal = userReqPop.setUserReqDetail();
        if(!confirm("신청내용을 저장하시겠습니까?")){
            return ;
        }
        console.log(data)
        var data = {
            //ERP_EMP_SEQ : "",
            EMP_NAME_KR : $("#empNameKr").val(), //이름
            LOGIN_PASSWD : $("#loginPasswd").val(), //비밀번호
            LOGIN_ID : $("#loginId").val(), //아이디
            RES_REGIS_NUM : $("#resRegisNum1").val() + "-" + $("#resRegisNum2").val(), //주민등록번호
            CAPS_NUM : $("#capsNum").val(), //CAPS 번호

            division : $("#divis").val(), //직원구분
            divisionSub : $("#divisDet").val(), //직원구분
            DEPT_SEQ : $("#deptName").val(), //부서
            DEPT_NAME : $("#deptName").val() == "" ? "" : $("#deptName").data("kendoDropDownList").text(),
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
            //WEDDING_ACTIVE : $("#weddingActive").getKendoRadioGroup().value(), //결혼 관계
            //BLOOD_TYPE : $("#bloodType").getKendoRadioGroup().value(), //혈액형
            OCCUPATION_CODE : $("#occupationCode").val(),

            DEGREE_CODE : $("#degreeCode").val(),

            /*직원구분 추가*/
            CTR_ST_DAY : $("#sDate").val(), //계약시작일
            CTR_EN_DAY : $("#eDate").val(), //계약종료일
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
            data.TEMP_DIVISION = "N";
        }

        if($("#divis").val() == '1'){ /*위촉직원*/
            data.CAPS_NUM = $("#capsNumCaseB").val(); //CAPS 번호
            data.BDAY = $("#birthDay").val(); //생년월일
            data.DEGREE_CODE = $("#degreeCodeA").val(); //학위
            data.JOB_DETAIL = $("#jobDetailCaseB").val(); //직무사항
            data.TEMP_DIVISION = "N";
        }
        if($("#divis").val() == '2'){ /*연수생/학생연구원*/
            data.JOB_DETAIL = $("#jobDetailCaseA").val(); //직무사항
            data.CAPS_NUM = $("#capsNumCaseC").val(); //CAPS 번호
            data.JOIN_DAY = $("#regDateCaseB").val(); //입사일자
            data.NICK_NAME = $("#nicknameCaseA").val(); //호칭
            data.TEMP_DIVISION = "N";
        }

        if($("#divis").val() == '10'){ /*기타*/
            data.JOB_DETAIL = $("#jobDetailCaseA").val(); //직무사항
            data.CAPS_NUM = $("#capsNumCaseC").val(); //CAPS 번호
        }

        if($("#lunarYn1").is(":checked")){
            data.LUNAR_CAL = "Y"
        }else {
            data.LUNAR_CAL = "N"
        }
        data.BDAY = $("#birthDay").val(); //생년월일

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


        if($("#check3").is(":checked")){
            data.ACTIVE = "N"
        } else {
            data.ACTIVE = "Y"
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

        if(!idFlag){
            alert("중복확인을 해주세요.")
            return;
        }

        if(data.LOGIN_PASSWD == "" || data.LOGIN_PASSWD == null){
            alert("비밀번호를 입력해주세요.");
            return;
        }

        if($("#resRegisNum1").val().length != 6 || $("#resRegisNum2").val().length != 7){
            alert("주민등록번호의 입력이 잘못되었습니다.");
            return;
        }

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

        var urlType = "/userManage/setUserReqDetailInsert";
        /*
        if($("#targetEmpSeq").val() != ""){
            urlType = "/userManage/setUserReqDetailUpdate";
        }else{
            urlType = "/userManage/setUserReqDetailInsert";
        }
         */

        $.ajax({
            url : urlType,
            data : data,
            type : "post",
            async: false,
            dataType : "json",
            success : function (result){
                console.log(result);
                if(result.code == "200"){
                    alert("단기직원 등록이 완료되었습니다.");
                    window.close();
                }
                //opener.userPersonList.gridReload();
            },
        })
    }



}