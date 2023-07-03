var now = new Date();
var docContent = "";

var outBustripReqPop = {

    init : function(){

        outBustripReqPop.dataSet();
    },

    dataSet : function() {
        $("#date1").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date(now.setMonth(now.getMonth() - 1))
        });

        $("#time1").kendoTimePicker({
            culture : "ko-KR",
            format : "HH:mm",
            interval : 10,
            value : "09:00"
        });

        $("#time2").kendoTimePicker({
            culture : "ko-KR",
            format : "HH:mm",
            interval : 10,
            value : "18:00"
        });

        $("#empSeq, #empName, #deptName, #dutyName").kendoTextBox({
            enable: false
        });

        $("#drop1").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "선택하세요", value: "" },
                { text: "R&D", value: "1" },
                { text: "비R&D", value: "2" },
                { text: "엔지니어링", value: "3" },
                { text: "기획용역", value: "4" },
                { text: "민간위탁", value: "5" },
                { text: "기타", value: "6" }
            ],
            index : 0,
            enable : true
        });

        $("#drop2").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "선택하세요", value: "" },
                { text: "연구개발", value: "1" }
            ],
            index : 0,
            enable : true
        });

        $("#drop3").kendoDropDownList({
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
            index : 0,
            enable : true
        });

        $("#drop4").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "선택하세요", value: ""}
            ],
            index : 0,
            enable : true
        });

        $("#drop5").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "KTX특실", value: ""}
            ],
            index : 0,
            enable : true
        });

        $("#drop6").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "선택하세요", value: ""},
                {text: "서울", value: "1"}
            ],
            index : 0,
            enable : true
        });

        $("#drop7").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "선택하세요", value: ""},
                {text: "용산역", value: "1"}
            ],
            index : 0,
            enable : true
        });

        $("#drop8").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "선택하세요", value: ""},
                {text: "제공", value: "1"},
                {text: "미제공", value: "1"}
            ],
            index : 0,
            enable : true
        });

        $("#drop9").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "선택하세요", value: ""},
                {text: "제공", value: "1"},
                {text: "미제공", value: "1"}
            ],
            index : 0,
            enable : true
        });

        $("#text1, #text2, #text3, #text4").kendoTextBox();
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
            outBustripReqPop.dataSet();
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
                '                   <button class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="outBustripReqPop.searchHolidayPop();" type="button"><i class="fa fa-search"></i></button>\n' +
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
            outBustripReqPop.dataSet();
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
            outBustripReqPop.dataSet();
        }
    }
}

