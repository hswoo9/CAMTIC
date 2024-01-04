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
        customKendo.fn_textBox(["openStudyAmt", "openStudyAmtText", "openStudyResult"]);
    },

    dataSet: function(){
        let openStudyInfo = customKendo.fn_customAjax("/campus/getOpenStudyInfoOne", {
            pk: $("#pk").val()
        }).data;
        openStudyRes.global.openStudyInfo = openStudyInfo;

            $("#openStudyNameTd").text(openStudyInfo.OPEN_STUDY_NAME);
            $("#openStudyDtTd").text(openStudyInfo.OPEN_STUDY_DT+" "+openStudyInfo.START_TIME+" ~ "+openStudyInfo.END_TIME);

            openStudyRes.openStudyUserSetting();
    },

    openStudyUserSetting: function(){
        let data = {
            pk: $("#pk").val()
        }
        const result = customKendo.fn_customAjax("/campus/getOpenStudyUserList", data);
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
            html += '<td style="text-align: center">'+list[i].REG_DEPT_NAME+" "+list[i].REG_TEAM_NAME+'</td>';
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

        let openStudyAmt = $("#openStudyAmt").val().replace(/,/g, "");
        let openStudyAmtText = $("#openStudyAmtText").val();
        let openStudyResult = $("#openStudyResult").val();

        if(openStudyAmt != ""){
            if(openStudyAmtText == ""){
                alert("소요비용 내역이 작성되지 않았습니다.");
                $("#openStudyAmtText").focus();
                return;
            }
        }
        //if(openStudyAmt == ""){ alert("소요비용이 작성되지 않았습니다."); return;}

        /*if (openStudyAmt === "" || openStudyAmt === null) {
            openStudyAmt = '0';
        }*/

        if(openStudyResult == ""){ alert("학습결과가 작성되지 않았습니다."); return;}

        let data = {
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
            openStudyRes.openStudyResPop(data.pk);
            window.close();
        }
    },

    openStudyResPop : function(pk) {
        let url = "/Campus/pop/openStudyResPop.do?mode=upd&pk="+pk;
        const name = "openStudyResPop";
        const option = "width = 1230, height = 935, top = 100, left = 400, location = no";
        window.open(url, name, option);
    }
}