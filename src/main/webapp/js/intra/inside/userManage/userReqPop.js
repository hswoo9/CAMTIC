var now = new Date();
var docContent = "";

var userReqPop = {

    global : {
        codeDropDownDept : [],
        codeDropDownDept2 : [],
        openerParams : [],
    },

    defaultScript : function(){
        userReqPop.dataSet();
    },

    dataSet : function() {
        $("#empNameKr, #loginPasswd, #loginId, #resRegisNum1, #resRegisNum2, #checkPasswd, #capsNum, #jobDetail, #beforCareer, #elapsedYear1, #elapsedYear2, #accountHolder, #bankName, #accountNum, #addr, #addrDetail, #officeTelNum, #mobileTelNum, #emailAddr, #carNum, #empNameCn, #empNameEn, #emgTelNum, #legalDomicile, #hobby, #religion, #specialty, #weight, #height, #vision1, #vision2, #carNum1, #carNum2, #carNum3").kendoTextBox();

        $("#dutyCode").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "선택하세요", value: ""},
                {text: "정규직원", value : "1"},
                {text: "계약직원", value : "2"},
                {text: "인턴사원", value : "3"},
                {text: "경비/환경", value : "4"},
                {text: "단기직원", value : "5"},
                {text: "위촉직원", value : "6"},
                {text: "연수생/학생연구원", value : "7"}
            ],
            index: 0
        });

        /*$("#deptName").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "선택하세요", value: ""},
                {text: "미래전략기획본부", value: "미래전략기획본부"},
                {text: "R&BD사업본부", value: "R&BD사업본부"},
                {text: "기업성장지원본부", value: "기업성장지원본부"},
                {text: "우주항공사업부", value: "우주항공사업부"},
                {text: "드론사업부", value: "드론사업부"},
                {text: "스마트제조사업부", value: "스마트제조사업부"},
                {text: "경영지원실", value: "경영지원실"}
            ],
            index: 0
        });*/

        $("#positionOrNum").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "선택하세요", value: ""},
                {text: "수석행정원 / 1급", value: "1"},
                {text: "수석매니저 / 1급", value: "2"},
                {text: "수석연구원 / 1급", value: "3"},
                {text: "책임행정원 / 2급", value: "4"},
                {text: "책임매니저 / 2급", value: "5"},
                {text: "책임연구원 / 2급", value: "6"},
                {text: "선임연구원 / 3급", value: "7"},
                {text: "선임매니저 / 3급", value: "8"},
                {text: "선임행정원 / 3급", value: "9"},
                {text: "주임매니저 / 4급", value: "10"},
                {text: "행정원 / 4급", value: "11"},
                {text: "주임행정원 / 4급", value: "12"},
                {text: "매니저 / 4급", value: "13"},
                {text: "주임연구원 / 4급", value: "14"},
                {text: "연구원 / 4급", value: "15"}
            ],
            index: 0
        });

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



        $("#jobCode").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "선택하세요", value: ""},
                {text: "R&D", value: "R&D"},
                {text: "A&D", value: "A&D"},
                {text: "P&M", value: "P&M"}
            ],
            index: 0
        });

        $("#positionName").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "선택하세요", value: ""},
                {text: "원장", value: "원장"},
                {text: "본부장", value: "본부장"},
                {text: "사업부장", value: "사업부장"},
                {text: "센터장", value: "센터장"},
                {text: "팀장", value: "팀장"}
            ],
            index: 0
        });

        $("#degreeCode").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "선택하세요", value: ""},
                {text: "고졸", value: "고졸"}
            ],
            index: 0
        });

        $("#regDate").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date()
        });

        $("#bday").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date()
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

        $("#homePageActive").kendoRadioGroup({
            items: [
                { label : "게시", value : "Y" },
                { label : "비게시", value : "N" }
            ],
            layout : "horizontal",
            labelPosition : "after",
            value : "Y",
        });

        $("#weddingActive").kendoRadioGroup({
            items: [
                { label : "기혼", value : "Y" },
                { label : "미혼", value : "N" }
            ],
            layout : "horizontal",
            labelPosition : "after",
            value : "Y",
        });

        $("#bloodType").kendoRadioGroup({
            items: [
                { label : "A형", value : "A형" },
                { label : "B형", value : "B형" },
                { label : "O형", value : "O형" },
                { label : "AB형", value : "AB형" }
            ],
            layout : "horizontal",
            labelPosition : "after",
            value : "A형",
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

    userReqSave : function (){
        //var chkVal = userReqPop.setUserReqDetail();


        if(confirm("신청내용을 저장하시겠습니까?")){
            var data = {
                //ERP_EMP_SEQ : "",
                EMP_NAME_KR : $("#empNameKr").val(), //이름
                LOGIN_PASSWD : $("#loginPasswd").val(), //비밀번호
                LOGIN_ID : $("#loginId").val(), //아이디
                RES_REGIS_NUM : $("#resRegisNum1").val() + "-" + $("#resRegisNum2").val(), //주민등록번호
                CAPS_NUM : $("#capsNum").val(), //CAPS 번호

                DUTY_CODE : $("#dutyCode").val(), //직원구분
                DEPT_NAME : $("#deptName").val(), //부서
                DEPT_SEQ : $("#deptTeamName").val(), //팀

                JOB_DETAIL : $("#jobDetail").val(), //직무사항
                BEFOR_CAREER : $("#beforCareer").val(), //전직경력
                //ELAPSED_YEAR : $("#elapsedYear1").val() + "년도" + $("#elapsedYear2").val(), //경과년파
                ACCOUNT_HOLDER : $("#accountHolder").val(), //예금주
                BANK_NAME : $("#bankName").val(), //은행명
                ACCOUNT_NUM : $("#accountNum").val(), //계좌번호
                ADDR : $("#addr").val(), //우편번호 현주소(주소)
                ADDR_DETAIL : $("#addrDetail").val(), //거주지 지번주소
                OFFICE_TEL_NUM : $("#officeTelNum1").val() + "-" + $("#officeTelNum2").val() + "-" + $("#officeTelNum3").val(), //전화번호
                MOBILE_TEL_NUM : $("#mobileTelNum1").val() + "-" + $("#mobileTelNum2").val() + "-" + $("#mobileTelNum3").val(), //전화번호
                EMAIL_ADDR : $("#emailAddr").val(), //이메일

                CAR_NUM : $("#carNum1").val()+$("#carNum2").val()+$("#carNum3").val(), //차량번호
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

                HOME_PAGE_ACTIVE : $("#homePageActive").getKendoRadioGroup().value(), //홈페이지 게시
                WEDDING_ACTIVE : $("#weddingActive").getKendoRadioGroup().value(), //결혼 관계
                BLOOD_TYPE : $("#bloodType").getKendoRadioGroup().value() //혈액형
            }
            //userReqPop.fn_regex2(data);
            $.ajax({
                url : '/userManage/setUserReqDetailInsert',
                data : data,
                dataType : "application/json",
                type : "POST",
                async : false,
                success : function (result){
                    window.close();
                    opener.parent.userPersonList.gridReload();
                }
            })
        }

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
    fn_regex2 : function (data) {
        var check = true;
        $.each(data, function(index, item) {
            if(item == 'undefined' || item == "" || item == null){
                alert("빈값이 있습니다.");
                console.log($(item));
                check = false;
                return false;
            }
        })
        if(check==ture){

        }
    }
}

