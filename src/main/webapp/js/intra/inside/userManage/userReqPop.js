var now = new Date();
var docContent = "";

var userReqPop = {

    global : {
        openerParams : [],
    },

    defaultScript : function(){
        userReqPop.dataSet();
    },

    dataSet : function() {
        $("#empNameKr, #loginPasswd, #loginId, #resRegisNum1, #resRegisNum2, #checkPasswd, #capsNum, #jobDetail, #text8, #text9, #text10, #text11, #text12, #text13, #text14, #text15, #text16, #text17, #text18, #text19, #text20, #text21, #text22, #text23, #text24, #text25, #text26, #text27, #text28, #text29, #text30, #text31, #text32, #text33, #text34").kendoTextBox();

        $("#dutyCode").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "선택하세요", value: ""},
                {text: "정규직원", expanded: true},
                {text: "계약직원", expanded: true},
                {text: "인턴사원", expanded: true},
                {text: "경비/환경", expanded: true},
                {text: "단기직원", expanded: true},
                {text: "위촉직원", expanded: true},
                {text: "연수생/학생연구원", expanded: true}
            ],
            index: 0
        });

        $("#deptName").kendoDropDownList({
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
        });

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

        $("#deptTeamName").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "선택하세요", value: ""},
                {text: "제조혁신팀", value: "제조혁신팀"},
                {text: "신기술융합팀", value: "신기술융합팀"},
                {text: "우주개발팀", value: "우주개발팀"},
                {text: "항공개발팀", value: "항공개발팀"},
                {text: "사업지원팀", value: "사업지원팀"},
                {text: "인재개발팀", value: "인재개발팀"},
                {text: "일자리창업팀", value: "일자리창업팀"},
                {text: "복합소재뿌리기술센터", value: "복합소재뿌리기술센터"},
                {text: "지역산업육성팀", value: "지역산업육성팀"},
                {text: "경영지원팀", value: "경영지원팀"},
                {text: "미래전략기획팀", value: "미래전략기획팀"},
                {text: "J-밸리혁신팀", value: "J-밸리혁신팀"},
                {text: "전북 조선업 도약센터", value: "전북 조선업 도약센터"},
                {text: "익산고용안정일자리센터", value: "익산고용안정일자리센터"}
            ],
            index: 0
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
                {text: "전담직원", value: "R&D"}
            ],
            index: 0
        });

        $("#drop8").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "2023", value: "2023"}
            ],
            index: 0
        });

        $("#drop9").kendoDropDownList({
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

        $("#drop10").kendoDropDownList({
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
                '                        <td style="text-align: center"><input type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" value="초기화" onclick=""/></td>\n' +
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
                '                   <button class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="userReqPop.searchHolidayPop();" type="button"><i class="fa fa-search"></i></button>\n' +
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
                '                  <input type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" value="검색" onclick=""/>\n' +
                '                  <br>\n' +
                '                  <input type="button" class="mt10 k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" value="선택 초기화" onclick=""/>\n' +
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
                '                  <input type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" value="검색" onclick=""/>\n' +
                '                  <br>\n' +
                '                  <input type="button" class="mt10 k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" value="선택 초기화" onclick=""/>\n' +
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

    fn_windowClose : function(){
        window.close();
    }
}

