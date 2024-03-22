const openStudyRes = {
    global: {
        openStudyInfo: {},
        openStudyUser: []
    },

    init: function(){
        openStudyRes.pageSet();
        openStudyRes.dataSet();
    },

    pageSet: function(){
        customKendo.fn_textBox(["openStudyName", "openStudyAmt", "openStudyAmtText", "openStudyResult"]);
        customKendo.fn_datePicker("openStudyDt", 'month', "yyyy-MM-dd", new Date());
        customKendo.fn_timePicker("startTime", '10', "HH:mm", "09:00");
        customKendo.fn_timePicker("endTime", '10', "HH:mm", "18:00");
    },

    dataSet: function(){
        let openStudyInfo = customKendo.fn_customAjax("/campus/getOpenStudyInfoOne", {
            pk: $("#pk").val()
        }).data;
        openStudyRes.global.openStudyInfo = openStudyInfo;

        $("#openStudyName").val(openStudyInfo.OPEN_STUDY_NAME);
        $("#openStudyDt").val(openStudyInfo.OPEN_STUDY_DT);
        $("#startTime").val(openStudyInfo.START_TIME);
        $("#endTime").val(openStudyInfo.END_TIME);

        openStudyRes.openStudyUserSetting();
    },

    openStudyUserSetting: function(){
        let data = {
            pk: $("#pk").val()
        }
        const result = customKendo.fn_customAjax("/campus/getOpenStudyUserList2", data);
        openStudyRes.global.openStudyUser = result.list;
        let list = openStudyRes.global.openStudyUser;

        let html = '';
        html += '<colgroup>';
        html += '<col width="10%"><col width="20%"><col width="20%"><col width="20%"><col width="30%">';
        html += '</colgroup>';

        html += '<thead>';
        html += '<tr>';
        html += '<th><input type="checkbox" id="checkAll" name="checkAll" onclick="fn_checkAll(\'checkAll\', \'userPk\');"/></th>';
        html += '<th>구분</th>';
        html += '<th>성명</th>';
        html += '<th>직위</th>';
        html += '<th>부서/팀</th>';
        html += '</tr>';

        for(let i=0; i<list.length; i++){
            html += '<tr class="addData">';
            html += '<input type="hidden" class="pk" value="'+list[i].OPEN_STUDY_USER_SN+'">';
            html += '<input type="hidden" class="empSeq" value="'+list[i].REG_EMP_SEQ+'">';
            html += '<td style="text-align: center"><input type="checkbox" name="userPk" class="userPk" value="'+list[i].REG_EMP_SEQ+'"/></td>';
            html += '<td style="text-align: center"><input type="text" class="userClass" id="userClass'+list[i].REG_EMP_SEQ+'" value="'+list[i].USER_CLASS+'" </td>';
            html += '<td style="text-align: center">'+list[i].REG_EMP_NAME+'</td>';
            let position = list[i].REG_DUTY_NAME == "" ? list[i].REG_POSITION_NAME : list[i].REG_DUTY_NAME;
            html += '<td style="text-align: center">'+position+'</td>';
            html += '<td style="text-align: center">'+list[i].DEPT_NAME + ' ' + list[i].TEAM_NAME+'</td>';
            html += '</tr>';
        }
        $("#openStudyUserTable").html(html);
        $("#openStudyUserDiv").show();

        $(".userClass").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "선택", value: "" },
                { text: "지도자", value: "1" },
                { text: "학습자", value: "2" }
            ]
        });
    },

    saveBtn: function(){
        if(!confirm("모임을 완료하시겠습니까?")){
            return;
        }

        let openStudyName = $("#openStudyName").val();
        let openStudyDt = $("#openStudyDt").val();
        let startTime = $("#startTime").val();
        let endTime = $("#endTime").val();
        let openStudyAmt = $("#openStudyAmt").val().replace(/,/g, "");
        let openStudyAmtText = $("#openStudyAmtText").val();
        let openStudyResult = $("#openStudyResult").val();

        if(openStudyAmt != 0 && openStudyAmt != null) {
            if (openStudyAmtText == "") {
                alert("소요비용 내역이 작성되지 않았습니다.");
                $("#openStudyAmtText").focus();
                return;
            }
        }
        //if(openStudyAmt == ""){ alert("소요비용이 작성되지 않았습니다."); return;}

        /*if (openStudyAmt === "" || openStudyAmt === null) {
            openStudyAmt = '0';
        }*/

        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth()+1;
        var day = now.getDate();
        var hour1 = startTime.split(":")[0];
        var hour2 = endTime.split(":")[0];
        var min1 = startTime.split(":")[1];
        var min2 = endTime.split(":")[1];
        var bfDate = new Date(year, month, day, hour1, min1);
        var afDate = new Date(year, month, day, hour2, min2);
        var diffSec = afDate.getTime() - bfDate.getTime();
        var diffMin = diffSec / 1000 / 60 / 60;
        //var eduTime = diffMin.toFixed(1);

        var eduTime = diffMin;
        if (eduTime % 1 !== 0) {
            eduTime = eduTime.toFixed(1);
        }

        if(openStudyName == ""){ alert("모임명이 작성되지 않았습니다."); return;}
        if(openStudyResult == ""){ alert("학습결과가 작성되지 않았습니다."); return;}

        let data = {
            resOpenStudyName: openStudyName,
            resOpenStudyDt: openStudyDt,
            resStartTime: startTime,
            resEndTime: endTime,
            resEduTime: eduTime,
            openStudyAmt: openStudyAmt,
            openStudyAmtText: openStudyAmtText,
            openStudyResult: openStudyResult,
            pk: $("#pk").val(),
            step: "D"
        }
        let userArr = [];
        $.each($('#openStudyUserTable .addData'), function(i, v){
            let partYN;
            let empSeq = $(v).find(".empSeq").val();
            if($(v).find(".userPk").is(":checked")){
                partYN = "Y";
            }else{
                partYN = "N";
            }

            let subData = {
                pk: $(v).find(".pk").val(),
                userClass: $(v).find('#userClass'+empSeq).data("kendoDropDownList").value(),
                userClassText: $(v).find('#userClass'+empSeq).data("kendoDropDownList").text(),
                partYN: partYN
            }
            userArr.push(subData);
        })
        data.userData = JSON.stringify(userArr);

        let url = "/campus/setOpenStudyResultUpd";
        const result = customKendo.fn_customAjax(url, data);
        if(result.flag){
            alert("결과보고 데이터 저장이 완료되었습니다.");
            try {
                opener.gridReload();
            }catch{

            }
            try {
                location.reload();
            }catch{

            }
            location.href = "/Campus/pop/openStudyResPop.do?mode=upd&pk=" + data.pk;
        }
    },
}