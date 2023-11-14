var screenViewPop = {
    global : {
        searchAjaxData : "",
        saveAjaxData : "",
        nowH : "",
        careerType : ""
    },

    init : function(nowH){
        screenViewPop.global.nowH = nowH;

        screenViewPop.global.searchAjaxData = {
            recruitInfoSn : $("#recruitInfoSn").val()
        }

        var result = customKendo.fn_customAjax("/inside/getRecruitAreaList.do", screenViewPop.global.searchAjaxData);
        customKendo.fn_dropDownList("recruitAreaInfoSn", result.recruitArea, "AREA_TITLE","RECRUIT_AREA_INFO_SN", 2);

        if($("#type").val() == "doc"){
            $("#recruitAreaInfoSn").data("kendoDropDownList").bind("change", screenViewPop.makeDocScreenTable);
        }else{
            $("#recruitAreaInfoSn").data("kendoDropDownList").bind("change", screenViewPop.makeInterViewScreenTable);
        }

        if(result.recruitArea.filter(element => element.RECRUIT_AREA_INFO_SN != "").length == 1){
            $("#recruitAreaInfoSn").data("kendoDropDownList").select(1);
            $("#recruitAreaInfoSn").data("kendoDropDownList").trigger("change");
        }
    },

    makeDocScreenTable : function() {
        if(this.value()){
            screenViewPop.global.careerType = this.dataSource._data.find(element => element.RECRUIT_AREA_INFO_SN == this.value()).CAREER_TYPE;

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

                if(screenViewPop.global.careerType == "1"){
                    screenViewPop.makeType1ApplicationList(result.list, result2.rs.evalCnt);
                }else if(screenViewPop.global.careerType == "2"){
                    screenViewPop.makeType2ApplicationList(result.list, result2.rs.evalCnt);
                }else if(screenViewPop.global.careerType == "1,2"){
                    screenViewPop.makeType1ApplicationList(result.list.filter(element => element.CAREER_TYPE == "1"), result2.rs.evalCnt);
                    screenViewPop.makeType2ApplicationList(result.list.filter(element => element.CAREER_TYPE == "2"), result2.rs.evalCnt);
                }

                if(result2.rs.evalScoreBoard.length > 0){

                    console.log(result2.rs.evalScoreBoard);
                    screenViewPop.applicationEvalDataSet(result2.rs.evalScoreBoard);
                }
            }

            screenViewPop.fnResizeForm();
        }
    },

    makeType1ApplicationList : function(e, cnt){
        var html = "";
        var area = $("#recruitAreaInfoSn").data("kendoDropDownList").dataSource._data.find(element => element.RECRUIT_AREA_INFO_SN == $("#recruitAreaInfoSn").val())
        for(var i = 0; i < cnt.length; i++){
            html += '' +
                '<div class="pdf_page mt-20">' +
                    '<h2 class="text-center">채용 서류심사 평가표(신입)</h2>' +
                    '<table class="searchTable table table-bordered mb-0 mt-20">' +
                        '<colgroup>' +
                            '<col style="width: 10%">' +
                        '</colgroup>' +
                        '<tr>' +
                            '<th>근무부서</th>' +
                            '<td>' +
                                area.DEPT_NAME + ' - ' + area.TEAM_NAME +
                            '</td>' +
                            '<th>채용부문</th>' +
                            '<td>' +
                                area.JOB +
                            '</td>' +
                            '<th>필요경력</th>' +
                            '<td>' +
                                area.CAREER +
                            '</td>' +
                            '<th>채용직급</th>' +
                            '<td>' +
                                area.DUTY +
                            '</td>' +
                        '</tr>' +
                    '</table>' +
                    '<table class="searchTable table table-bordered mb-0" style="text-align: center">' +
                        '<colgroup>' +
                        '    <col style="width: 8%">' +
                        '    <col style="width: 8%">' +
                        '    <col style="width: 6%">' +
                        '    <col style="width: 6%">' +
                        '    <col style="width: 6%">' +
                        '    <col style="width: 6%">' +
                        '    <col style="width: 6%">' +
                        '    <col style="width: 6%">' +
                        '    <col style="width: 6%">' +
                        '    <col style="width: 6%">' +
                        '    <col style="width: 6%">' +
                        '    <col style="width: 11%">' +
                        '    <col>' +
                        '</colgroup>' +
                        '<tr>' +
                        '    <th rowSpan="2">번호</th>' +
                        '    <th rowSpan="2">성명</th>' +
                        '    <th colSpan="3">학력(20점)</th>' +
                        '    <th colSpan="3">경력(50점)</th>' +
                        '    <th colSpan="3">전문성(30점)</th>' +
                        '    <th rowSpan="2">평가점수(100점)</th>' +
                        '    <th rowspan="2">기타의견</th>' +
                        '</tr>' +
                        '<tr>' +
                        '    <th>上(20)</th>' +
                        '    <th>中(15)</th>' +
                        '    <th>下(10)</th>' +
                        '    <th>上(50)</th>' +
                        '    <th>中(40)</th>' +
                        '    <th>下(30)</th>' +
                        '    <th>上(30)</th>' +
                        '    <th>中(25)</th>' +
                        '    <th>下(20)</th>' +
                        '</tr>' +
                        '<tbody id="applicationTb">';
            if(e != null && e.length > 0){
                for(var j = 0; j < e.length; j++){
                    html += "" +
                            '<tr class="userEvalDocScreen">' +
                                '<td>' + (j + 1) + '</td>' +
                                '<td>' +
                                    '<input type="hidden" id="applicationId" name="applicationId" value="' + e[j].APPLICATION_ID + '">' + e[j].USER_NAME +
                                '</td>' +
                                '<td>' +
                                    '<span class="evalRadio" name="evalItemVal_doc1_' + e[j].APPLICATION_ID + '_' + cnt[i].EVAL_LOGIN_ID + '" id="itemScore_doc1_1_' + e[j].APPLICATION_ID + '" score="20"></span>' +
                                '</td>' +
                                '<td>' +
                                    '<span class="evalRadio" name="evalItemVal_doc1_' + e[j].APPLICATION_ID + '_' + cnt[i].EVAL_LOGIN_ID + '" id="itemScore_doc1_2_' + e[j].APPLICATION_ID + '" score="15"></span>' +
                                '</td>' +
                                '<td>' +
                                    '<span class="evalRadio" name="evalItemVal_doc1_' + e[j].APPLICATION_ID + '_' + cnt[i].EVAL_LOGIN_ID + '" id="itemScore_doc1_3_' + e[j].APPLICATION_ID + '" score="10"></span>' +
                                '</td>' +
                                '<td>' +
                                    '<span class="evalRadio" name="evalItemVal_doc2_' + e[j].APPLICATION_ID + '_' + cnt[i].EVAL_LOGIN_ID + '" id="itemScore_doc2_1_' + e[j].APPLICATION_ID + '" score="50"></span>' +
                                '</td>' +
                                '<td>' +
                                    '<span class="evalRadio" name="evalItemVal_doc2_' + e[j].APPLICATION_ID + '_' + cnt[i].EVAL_LOGIN_ID + '" id="itemScore_doc2_2_' + e[j].APPLICATION_ID + '" score="40"></span>' +
                                '</td>' +
                                '<td>' +
                                    '<span class="evalRadio" name="evalItemVal_doc2_' + e[j].APPLICATION_ID + '_' + cnt[i].EVAL_LOGIN_ID + '" id="itemScore_doc2_3_' + e[j].APPLICATION_ID + '" score="30"></span>' +
                                '</td>' +
                                '<td>' +
                                    '<span class="evalRadio" name="evalItemVal_doc3_' + e[j].APPLICATION_ID + '_' + cnt[i].EVAL_LOGIN_ID + '" id="itemScore_doc3_1_' + e[j].APPLICATION_ID + '" score="30"></span>' +
                                '</td>' +
                                '<td>' +
                                    '<span class="evalRadio" name="evalItemVal_doc3_' + e[j].APPLICATION_ID + '_' + cnt[i].EVAL_LOGIN_ID + '" id="itemScore_doc3_2_' + e[j].APPLICATION_ID + '" score="25"></span>' +
                                '</td>' +
                                '<td>' +
                                    '<span class="evalRadio" name="evalItemVal_doc3_' + e[j].APPLICATION_ID + '_' + cnt[i].EVAL_LOGIN_ID + '" id="itemScore_doc3_3_' + e[j].APPLICATION_ID + '" score="20"></span>' +
                                '</td>' +
                                '<td>' +
                                    '<span id="sum_' + e[j].APPLICATION_ID  + '_' + cnt[i].EVAL_LOGIN_ID + '" name="sum"></span>점 ' +
                                '</td>' +
                                '<td>' +
                                    '<span id="otherRmk_' + e[j].APPLICATION_ID  + '_' + cnt[i].EVAL_LOGIN_ID + '" name="otherRmk"></span>' +
                                '</td>' +
                            '</tr>';
                }
            }else{
                html += "" +
                            '<tr>' +
                                '<td colspan="13">데이터가 없습니다.</td>' +
                            '</tr>'
            }

            html +=     '</tbody>' +
                    '</table>' +
                    '<p style="font-size: 14px;text-align: center" class="mt-20">' +
                        '■평점요소: △학력(20점)-응시분야 직무에 대한 학력 전공 ' +
                        '△경력(50점)-응시분야 및 관련분야 실무능력 ' +
                        '△전문성(30점)-응시분야 직무에 대한 전문지식' +
                    '</p>' +
                    '<div style="text-align: right;font-size: 12px" class="mt-60">' +
                        screenViewPop.global.nowH + "<br>" +
                        "심사위원 : " + cnt[i].EMP_NAME_KR + "(인)" +
                    '</div>' +
                '</div>';
        }
        $("#tbDiv").append(html)
    },

    makeType2ApplicationList : function(e, cnt){
        var html = "";
        var area = $("#recruitAreaInfoSn").data("kendoDropDownList").dataSource._data.find(element => element.RECRUIT_AREA_INFO_SN == $("#recruitAreaInfoSn").val())
        for(var i = 0; i < cnt.length; i++){
            html += '' +
                '<div class="pdf_page mt-20">' +
                    '<h2 class="text-center">채용 서류심사 평가표(경력)</h2>' +
                    '<table class="searchTable table table-bordered mb-0 mt-20">' +
                        '<colgroup>' +
                            '<col style="width: 10%">' +
                        '</colgroup>' +
                        '<tr>' +
                            '<th>근무부서</th>' +
                            '<td>' +
                                area.DEPT_NAME + ' - ' + area.TEAM_NAME +
                            '</td>' +
                            '<th>채용부문</th>' +
                            '<td>' +
                                area.JOB +
                            '</td>' +
                            '<th>필요경력</th>' +
                            '<td>' +
                                area.CAREER +
                            '</td>' +
                            '<th>채용직급</th>' +
                            '<td>' +
                                area.DUTY +
                            '</td>' +
                        '</tr>' +
                    '</table>' +
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
                        '    <th>上(40)</th>' +
                        '    <th>中(30)</th>' +
                        '    <th>下(20)</th>' +
                        '    <th>上(60)</th>' +
                        '    <th>中(50)</th>' +
                        '    <th>下(40)</th>' +
                        '</tr>' +
                        '<tbody id="applicationTb">';
                if(e != null && e.length > 0){
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
                                    '<span id="sum_' + e[j].APPLICATION_ID  + '_' + cnt[i].EVAL_LOGIN_ID + '" name="sum"></span>점 ' +
                                '</td>' +
                                '<td>' +
                                    '<span id="otherRmk_' + e[j].APPLICATION_ID  + '_' + cnt[i].EVAL_LOGIN_ID + '" name="otherRmk"></span>' +
                                '</td>' +
                            '</tr>';
                    }
                }else{
                    html += "" +
                            '<tr>' +
                                '<td colspan="10">데이터가 없습니다.</td>' +
                            '</tr>'
                }


                html += '</tbody>' +
                    '</table>' +
                    '<p style="font-size: 14px;text-align: center" class="mt-20">' +
                        '■평점요소: △학력(20점)-응시분야 직무에 대한 학력 전공 ' +
                        '△경력(50점)-응시분야 및 관련분야 실무능력 ' +
                        '△전문성(30점)-응시분야 직무에 대한 전문지식' +
                    '</p>' +
                    '<div style="text-align: right;font-size: 12px" class="mt-60">' +
                        screenViewPop.global.nowH + "<br>" +
                        "심사위원 : " + cnt[i].EMP_NAME_KR + "(인)" +
                    '</div>' +
                '</div>';
        }
        $("#tbDiv").append(html)
    },


    makeInterViewScreenTable(){
        if(this.value()){
            screenViewPop.global.searchAjaxData = {
                recruitInfoSn : $("#recruitInfoSn").val(),
                recruitAreaInfoSn : $("#recruitAreaInfoSn").val(),
                searchTypeArr : "'D','I'"
            }

            var result = customKendo.fn_customAjax("/recruit/manage/eval/getApplicationInterViewList.do", screenViewPop.global.searchAjaxData);
            console.log(result);
            if(result.flag) {
                $("#tbDiv *").remove();
                var area = $("#recruitAreaInfoSn").data("kendoDropDownList").dataSource._data.find(element => element.RECRUIT_AREA_INFO_SN == $("#recruitAreaInfoSn").val())
                var sum = 0;
                var evalCnt = 0;
                var application = [];
                var index = 0;

                var html = "";
                html += '' +
                    '<div class="pdf_page mt-20">' +
                        '<h2 class="text-center">면접위원 평가점수 및 의견</h2><br>' +
                        '<h4 class="text-left">■ ' + area.JOB + '</h4>' +
                        '<table class="searchTable table table-bordered mb-0 mt-10" style="text-align: center">' +
                            '<colgroup>' +
                            '    <col style="width: 8%">' +
                            '    <col style="width: 10%">' +
                            '    <col style="width: 8%">' +
                            '    <col>' +
                            '    <col style="width: 11%">' +
                            '    <col>' +
                            '</colgroup>' +
                            '<tr>' +
                            '    <th>지원자</th>' +
                            '    <th>면접위원</th>' +
                            '    <th>점수</th>' +
                            '    <th>평가의견</th>' +
                            '    <th>비고</th>' +
                            '</tr>' +
                            '<tbody id="applicationTb">';
                        for(var i = 0; i < result.list.length; i++){
                            sum += Number(result.list[i].SUM_SCORE);
                            evalCnt ++;
                            index = i;

                            if(i < result.list.length -1){
                                index++
                            }

                            html += '' +
                                '<tr>' +
                                    '<td class="applicationId_' + result.list[i].APPLICATION_ID + '">' + result.list[i].USER_NAME + '</td>' +
                                    '<td>' + result.list[i].EMP_NAME_KR + '</td>' +
                                    '<td>' + result.list[i].SUM_SCORE + '</td>' +
                                    '<td>' + result.list[i].OPINION + '</td>' +
                                    '<td></td>' +
                                '</tr>';

                            if(result.list[i].APPLICATION_ID != result.list[index].APPLICATION_ID || result.list.length == (i+1)){
                                html += '' +
                                    '<tr>' +
                                        '<td class="applicationId_' + result.list[i].APPLICATION_ID + '">' + result.list[i].USER_NAME + '</td>' +
                                        '<td>평균점수</td>' +
                                        '<td>' + (sum/evalCnt) + '</td>' +
                                        '<td></td>' +
                                        '<td></td>' +
                                    '</tr>';

                                sum = 0;
                                evalCnt = 0;
                                application.push(result.list[i].APPLICATION_ID);
                            }
                        }
                html += '' +
                            '</tbody>' +
                        '</table>' +
                    '</div>';

                $("#tbDiv").append(html);
            }

            for(var i = 0; i < application.length; i++){
                $(".applicationId_" + application[i]).attr("rowspan", $(".applicationId_" + application[i]).length)
                $(".applicationId_" + application[i]).not(":first").remove();
            }

            screenViewPop.fnResizeForm();
        }
    },

    applicationEvalDataSet : function(e){
        var sum = 0;
        for(var i = 0; i < e.length; i ++){
            if(e[i].EVAL_ITEM_ID == "doc1" || e[i].EVAL_ITEM_ID == "doc2" || e[i].EVAL_ITEM_ID == "doc3"){
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
        var strHeight = $('.pop_sign_wrap').outerHeight() + (window.outerHeight - window.innerHeight) + 200;

        try{
            var childWindow = window.parent;
            childWindow.resizeTo((strWidth), strHeight);
        }catch(exception){
            console.log('window resizing cat not run dev mode.');
        }
    },
}

var renderedImg = new Array;
var contWidth = 240, // 너비(mm) (a4에 맞춤)
    padding = 10; //상하좌우 여백(mm)
const pdfMake = () => {

    var lists = document.querySelectorAll(".pdf_page"),
        deferreds = [],
        doc = new jsPDF("l", "mm", [425, 734]),
        listsLeng = lists.length;
    for (var i = 0; i < listsLeng; i++) { // pdf_page 적용된 태그 개수만큼 이미지 생성
        var deferred = $.Deferred();
        deferreds.push(deferred.promise());
        generateCanvas(i, doc, deferred, lists[i], contWidth);
    }

    $.when.apply($, deferreds).then(function () { // 이미지 렌더링이 끝난 후
        var sorted = renderedImg.sort(function (a, b) {
                return a.num < b.num ? -1 : 1;
            }), // 순서대로 정렬
            curHeight = 20, //위 여백 (이미지가 들어가기 시작할 y축)
            sortedLeng = sorted.length;

        for (var i = 0; i < sortedLeng; i++) {
            var sortedHeight = sorted[i].height, //이미지 높이
                sortedImage = sorted[i].image; //이미지w

            if(i != 0){
                curHeight += 10;
            }

            if (curHeight + sortedHeight - 20 > 100 - padding * 2) { // a4 높이에 맞게 남은 공간이 이미지높이보다 작을 경우 페이지 추가
                doc.addPage(734, 425); // 페이지를 추가함
                curHeight = 20; // 이미지가 들어갈 y축을 초기 여백값으로 초기화
                doc.addImage(sortedImage, padding, curHeight, contWidth, sortedHeight); //이미지 넣기
                curHeight += sortedHeight; // y축 = 여백 + 새로 들어간 이미지 높이
            } else { // 페이지에 남은 공간보다 이미지가 작으면 페이지 추가하지 않음
                doc.addImage(sortedImage, padding, curHeight, contWidth, sortedHeight); //이미지 넣기
                curHeight += sortedHeight; // y축 = 기존y축 + 새로들어간 이미지 높이
            }

            var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();

            doc.addFileToVFS('myFont.ttf', fontJs);
            doc.addFont('myFont.ttf', 'myFont', 'normal');
            doc.setFont('myFont');
            doc.text("(사)캠틱종합기술원", 10, pageHeight  - 10, {align: 'left'});

            curHeight += sortedHeight; // y축 = 여백 + 새로 들어간 이미지 높이
        }
        doc.save( $("#userName").text() + '.pdf'); //pdf 저장
        curHeight = padding; //y축 초기화
        renderedImg = new Array; //이미지 배열 초기화
    });
}

var contWidth2 = 190, // 너비(mm) (a4에 맞춤)
    padding2 = 10; //상하좌우 여백(mm)
const pdfMake2 = () => {
    var lists = document.querySelectorAll(".pdf_page"),
        deferreds = [],
        doc = new jsPDF("p", "mm", "a4"),
        listsLeng = lists.length;
    for (var i = 0; i < listsLeng; i++) { // pdf_page 적용된 태그 개수만큼 이미지 생성
        var deferred = $.Deferred();
        deferreds.push(deferred.promise());
        generateCanvas(i, doc, deferred, lists[i], contWidth2);
    }

    $.when.apply($, deferreds).then(function () { // 이미지 렌더링이 끝난 후
        var sorted = renderedImg.sort(function (a, b) {
                return a.num < b.num ? -1 : 1;
            }), // 순서대로 정렬
            curHeight = 20, //위 여백 (이미지가 들어가기 시작할 y축)
            sortedLeng = sorted.length;

        for (var i = 0; i < sortedLeng; i++) {
            var sortedHeight = sorted[i].height, //이미지 높이
                sortedImage = sorted[i].image; //이미지w

            if(i != 0){
                curHeight += 10;
            }

            if (curHeight + sortedHeight > 297 - padding2 * 2) { // a4 높이에 맞게 남은 공간이 이미지높이보다 작을 경우 페이지 추가
                doc.addPage(); // 페이지를 추가함
                curHeight = padding2; // 이미지가 들어갈 y축을 초기 여백값으로 초기화
                doc.addImage(sortedImage, 'jpeg', padding2, curHeight, contWidth2, sortedHeight); //이미지 넣기
                curHeight += sortedHeight; // y축 = 여백 + 새로 들어간 이미지 높이
            } else { // 페이지에 남은 공간보다 이미지가 작으면 페이지 추가하지 않음
                doc.addImage(sortedImage, 'jpeg', padding2, curHeight, contWidth2, sortedHeight); //이미지 넣기
                curHeight += sortedHeight; // y축 = 기존y축 + 새로들어간 이미지 높이
            }

            var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();

            doc.addFileToVFS('myFont.ttf', fontJs);
            doc.addFont('myFont.ttf', 'myFont', 'normal');
            doc.setFont('myFont');
            doc.text("(사)캠틱종합기술원", 10, pageHeight  - 10, {align: 'left'});

            curHeight += sortedHeight; // y축 = 여백 + 새로 들어간 이미지 높이
        }

        doc.save( $("#userName").text() + '.pdf'); //pdf 저장
        curHeight = padding2; //y축 초기화
        renderedImg = new Array; //이미지 배열 초기화
    });
}

function generateCanvas(i, doc, deferred, curList, contW){ //페이지를 이미지로 만들기
    var pdfWidth = $(curList).outerWidth() * 0.2645, //px -> mm로 변환
        pdfHeight = $(curList).outerHeight() * 0.2645,
        heightCalc = contW * pdfHeight / pdfWidth; //비율에 맞게 높이 조절

    html2canvas( curList ).then(
        function (canvas) {
            var img = canvas.toDataURL('image/jpeg', 1.0); //이미지 형식 지정
            renderedImg.push({num:i, image:img, height:heightCalc}); //renderedImg 배열에 이미지 데이터 저장(뒤죽박죽 방지)
            deferred.resolve(); //결과 보내기
        }
    );
}
