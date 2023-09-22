var screenViewPop = {
    global : {
        searchAjaxData : "",
        saveAjaxData : "",
        nowH : ""
    },

    init : function(nowH){
        screenViewPop.global.nowH = nowH;

        screenViewPop.global.searchAjaxData = {
            recruitInfoSn : $("#recruitInfoSn").val()
        }

        var result = customKendo.fn_customAjax("/inside/getRecruitAreaList.do", screenViewPop.global.searchAjaxData);
        customKendo.fn_dropDownList("recruitAreaInfoSn", result.recruitArea, "AREA_TITLE","RECRUIT_AREA_INFO_SN", 2);
        $("#recruitAreaInfoSn").data("kendoDropDownList").bind("change", screenViewPop.makeTable);
    },

    makeTable : function() {
        screenViewPop.global.searchAjaxData = {
            recruitInfoSn : $("#recruitInfoSn").val(),
            recruitAreaInfoSn : $("#recruitAreaInfoSn").val(),
            notSearchType : "S"
        }

        var result = customKendo.fn_customAjax("/recruit/manage/eval/getApplicationScreenViewList.do", screenViewPop.global.searchAjaxData);
        var applicationArr = "";
        for(var i = 0; i < result.list.length; i++){
            applicationArr += "," + result.list[i].APPLICATION_ID
        }

        screenViewPop.global.saveAjaxData = {
            evalScreenType : "doc",
            applicationArr : applicationArr.substring(1)
        }

        var result2 = customKendo.fn_customAjax("/evaluation/getApplicationScoreBoard", screenViewPop.global.saveAjaxData);
        if(result2.flag){
            $("#tbDiv *").remove();

            if(result2.rs.evalScoreBoard.length > 0){
                screenViewPop.makeApplicationList(result.list, result2.rs.evalCnt);
                screenViewPop.applicationEvalDataSet(result2.rs.evalScoreBoard);
            }
        }

        screenViewPop.fnResizeForm();
    },

    makeApplicationList : function(e, cnt){
        var html = "";
        for(var i = 0; i < cnt.length; i++){
            html += '' +
                '<table class="searchTable table table-bordered mb-0 mt-20" style="text-align: center">' +
                '<colgroup>' +
                '    <col style="width: 8%">' +
                '    <col style="width: 8%">' +
                '    <col style="width: 7%">' +
                '    <col style="width: 7%">' +
                '    <col style="width: 7%">' +
                '    <col style="width: 7%">' +
                '    <col style="width: 7%">' +
                '    <col style="width: 7%">' +
                '    <col style="width: 15%">' +
                '    <col>' +
                '</colgroup>' +
                '<tr>' +
                '    <th rowSpan="2">번호</th>' +
                '    <th rowSpan="2">성명</th>' +
                '    <th colSpan="3">학력/전공(40점)</th>' +
                '    <th colSpan="3">서류충실도(60점)</th>' +
                '    <th rowSpan="2">평가점수(100점)</th>' +
                '    <th rowspan="2">기타의견</th>' +
                '</tr>' +
                '<tr>' +
                '    <th>상(40)</th>' +
                '    <th>중(30)</th>' +
                '    <th>하(20)</th>' +
                '    <th>상(60)</th>' +
                '    <th>중(50)</th>' +
                '    <th>하(40)</th>' +
                '</tr>' +
                '<tbody id="applicationTb">';
            for(var j = 0; j < e.length; j++){
                html += "" +
                    '<tr class="userEvalDocScreen">' +
                        '<td>' + (j + 1) + '</td>' +
                        '<td>' +
                            '<input type="hidden" id="applicationId" name="applicationId" value="' + e[j].APPLICATION_ID + '">' + e[j].USER_NAME +
                        '</td>' +
                        '<td>' +
                            '<span class="evalRadio" name="evalItemVal_doc1_' + e[j].APPLICATION_ID + '_' + cnt[i].EVAL_LOGIN_ID + '" id="itemScore_doc1_1_' + e[j].APPLICATION_ID + '" score="40"></span>' +
                        '</td>' +
                        '<td>' +
                            '<span class="evalRadio" name="evalItemVal_doc1_' + e[j].APPLICATION_ID + '_' + cnt[i].EVAL_LOGIN_ID + '" id="itemScore_doc1_2_' + e[j].APPLICATION_ID + '" score="30"></span>' +
                        '</td>' +
                        '<td>' +
                            '<span class="evalRadio" name="evalItemVal_doc1_' + e[j].APPLICATION_ID + '_' + cnt[i].EVAL_LOGIN_ID + '" id="itemScore_doc1_3_' + e[j].APPLICATION_ID + '" score="20"></span>' +
                        '</td>' +
                        '<td>' +
                            '<span class="evalRadio" name="evalItemVal_doc2_' + e[j].APPLICATION_ID + '_' + cnt[i].EVAL_LOGIN_ID + '" id="itemScore_doc2_1_' + e[j].APPLICATION_ID + '" score="60"></span>' +
                        '</td>' +
                        '<td>' +
                            '<span class="evalRadio" name="evalItemVal_doc2_' + e[j].APPLICATION_ID + '_' + cnt[i].EVAL_LOGIN_ID + '" id="itemScore_doc2_2_' + e[j].APPLICATION_ID + '" score="50"></span>' +
                        '</td>' +
                        '<td>' +
                            '<span class="evalRadio" name="evalItemVal_doc2_' + e[j].APPLICATION_ID + '_' + cnt[i].EVAL_LOGIN_ID + '" id="itemScore_doc2_3_' + e[j].APPLICATION_ID + '" score="40"></span>' +
                        '</td>' +
                        '<td>' +
                            '<span id="sum_' + e[j].APPLICATION_ID  + '_' + cnt[i].EVAL_LOGIN_ID + '" name="sum"></span> ' +
                        '</td>' +
                        '<td>' +
                            '<span id="otherRmk_' + e[j].APPLICATION_ID  + '_' + cnt[i].EVAL_LOGIN_ID + '" name="otherRmk"></span>' +
                        '</td>' +
                    '</tr>';
            }

            html += '</tbody>' +
                '</table>' +
                '<div style="text-align: right;font-size: 12px">' +
                    screenViewPop.global.nowH + "<br>" +
                    "심사위원 : " + cnt[i].NAME + "(인)"
                '</div>';
        }
        $("#tbDiv").append(html)
    },

    applicationEvalDataSet : function(e){
        var sum = 0;
        for(var i = 0; i < e.length; i ++){
            if(e[i].EVAL_ITEM_ID == "doc1" || e[i].EVAL_ITEM_ID == "doc2"){
                $("span[name='evalItemVal_" + e[i].EVAL_ITEM_ID + "_" + e[i].APPLICATION_ID + "_" + e[i].EVAL_LOGIN_ID + "'][score=" + e[i].EVAL_ITEM_SCORE + "]").text("O");

                sum += Number(e[i].EVAL_ITEM_SCORE);
                $("#sum_" + e[i].APPLICATION_ID + "_" + e[i].EVAL_LOGIN_ID).text(Number($("#sum_" + e[i].APPLICATION_ID + "_" + e[i].EVAL_LOGIN_ID ).text()) + sum);
                sum = 0;
            }else{
                $("#otherRmk_" + e[i].APPLICATION_ID + "_" + e[i].EVAL_LOGIN_ID).text(e[i].EVAL_ITEM_SCORE);
            }
        }
    },

    fnResizeForm : function() {
        var strWidth = $('.pop_sign_wrap').outerWidth() + (window.outerWidth - window.innerWidth) + 18;
        var strHeight = $('.pop_sign_wrap').outerHeight() + (window.outerHeight - window.innerHeight) + 10;

        try{
            var childWindow = window.parent;
            childWindow.resizeTo((strWidth), strHeight);
        }catch(exception){
            console.log('window resizing cat not run dev mode.');
        }
    },
}
