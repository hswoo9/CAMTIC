var evalDocScreen = {
    global : {
        searchAjaxData : "",
        saveAjaxData : "",
        careerType : "",
        test : ""
    },

    fn_defaultScript : function(){
        evalDocScreen.fnResizeForm();
        evalDocScreen.getRecruitInfo();
    },

    getRecruitInfo : function(){
        evalDocScreen.global.saveAjaxData = {
            recruitInfoSn : $("#recruitInfoSn").val(),
            evalEmpSeq : $("#evalEmpSeq").val(),
        }

        var result = customKendo.fn_customAjax("/inside/getRecruit.do", evalDocScreen.global.saveAjaxData);
        if(result.flag){
            $("#recruitTitle").text(result.recruit.RECRUIT_TITLE);
            customKendo.fn_dropDownList("recruitAreaInfoSn", result.recruit.recruitArea, "JOB", "RECRUIT_AREA_INFO_SN", "2")
            $("#recruitAreaInfoSn").data("kendoDropDownList").bind("change", evalDocScreen.getApplicationList);
        }
    },

    getApplicationList : function(){
        evalDocScreen.global.careerType = this.dataSource._data.find(element => element.RECRUIT_AREA_INFO_SN == this.value()).CAREER_TYPE;
        console.log("evalDocScreen.global.careerType",evalDocScreen.global.careerType);

        evalDocScreen.global.saveAjaxData = {
            recruitInfoSn : $("#recruitInfoSn").val(),
            recruitAreaInfoSn : $("#recruitAreaInfoSn").val() == "" ? "All" : $("#recruitAreaInfoSn").val(),
            searchType : "S",
            screenCk : "Y"
        }

        var result = customKendo.fn_customAjax("/inside/getApplicationList", evalDocScreen.global.saveAjaxData);
        console.log(result);
        const rsArray = result.list;
        console.log("rsArray의 첫번째 배열",rsArray[0]);
        if(result.flag){
            console.log("evalDocScreen.global.careerType : "+evalDocScreen.global.careerType);
            $("#tableDiv *").remove();
            evalDocScreen.global.test = result.list;
            if(evalDocScreen.global.careerType == "1"){
                evalDocScreen.makeType1ApplicationList(result.list);
            }else if(evalDocScreen.global.careerType == "2"){
                evalDocScreen.makeType2ApplicationList(result.list);
            }else if(evalDocScreen.global.careerType == "1,2"){
                evalDocScreen.makeType2ApplicationList(result.list);
            }

            evalDocScreen.global.saveAjaxData = {
                evalLoginId : $("#evalLoginId").val(),
                evalScreenType : "doc",
            }

            var result = customKendo.fn_customAjax("/evaluation/getApplicationScoreBoard", evalDocScreen.global.saveAjaxData);
            if(result.flag){
                if(result.rs.evalScoreBoard.length > 0){
                    evalDocScreen.applicationEvalDataSet(result.rs.evalScoreBoard);
                }
            }
        }

        evalDocScreen.fnResizeForm();
    },

    makeType1ApplicationList : function(e){
        var html = "";
        if(e != null && e.length > 0){
            html += '' +
                '<table class="searchTable table table-bordered mb-0 mt-20" style="text-align: center">' +
                '<colgroup>' +
                '    <col style="width: 6%">' +
                '    <col style="width: 6%">' +
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
                '    <th rowSpan="2">입사정보</th>' +
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

            for(var i = 0; i < e.length; i++){
                html += "" +
                    '<tr class="userEvalDocScreen careerType1">' +
                    '<td>' + (i + 1) + '</td>' +
                    '<td>' +
                    '<input type="hidden" id="applicationId" name="applicationId" value="' + e[i].APPLICATION_ID + '">' +
                    '<a style="cursor: pointer;" onclick="evalDocScreen.applicationInfo(' + e[i].APPLICATION_ID + ')">' + e[i].USER_NAME + '</a>' +
                    '</td>' +
                    '<td>' +
                    '<input type="hidden" id="applicationId" name="applicationId" value="' + e[i].APPLICATION_ID + '">' +
                    '<button type="button" class="k-button k-button-solid-info" onclick="evalDocScreen.applicationInfo(' + e[i].APPLICATION_ID + ')">조회</button>'+
                    '</td>' +
                    '<td>' +
                    '<input type="radio" class="evalRadio" name="evalItemVal_doc1_' + e[i].APPLICATION_ID + '" id="itemScore_doc1_1_' + e[i].APPLICATION_ID + '" value="20"> ' +
                    '</td>' +
                    '<td>' +
                    '<input type="radio" class="evalRadio" name="evalItemVal_doc1_' + e[i].APPLICATION_ID + '" id="itemScore_doc1_2_' + e[i].APPLICATION_ID + '" value="15"> ' +
                    '</td>' +
                    '<td>' +
                    '<input type="radio" class="evalRadio" name="evalItemVal_doc1_' + e[i].APPLICATION_ID + '" id="itemScore_doc1_3_' + e[i].APPLICATION_ID + '" value="10"> ' +
                    '</td>' +
                    '<td>' +
                    '<input type="radio" class="evalRadio" name="evalItemVal_doc2_' + e[i].APPLICATION_ID + '" id="itemScore_doc2_1_' + e[i].APPLICATION_ID + '" value="50"> ' +
                    '</td>' +
                    '<td>' +
                    '<input type="radio" class="evalRadio" name="evalItemVal_doc2_' + e[i].APPLICATION_ID + '" id="itemScore_doc2_2_' + e[i].APPLICATION_ID + '" value="40"> ' +
                    '</td>' +
                    '<td>' +
                    '<input type="radio" class="evalRadio" name="evalItemVal_doc2_' + e[i].APPLICATION_ID + '" id="itemScore_doc2_3_' + e[i].APPLICATION_ID + '" value="30"> ' +
                    '</td>' +
                    '<td>' +
                    '<input type="radio" class="evalRadio" name="evalItemVal_doc3_' + e[i].APPLICATION_ID + '" id="itemScore_doc3_1_' + e[i].APPLICATION_ID + '" value="30"> ' +
                    '</td>' +
                    '<td>' +
                    '<input type="radio" class="evalRadio" name="evalItemVal_doc3_' + e[i].APPLICATION_ID + '" id="itemScore_doc3_2_' + e[i].APPLICATION_ID + '" value="25"> ' +
                    '</td>' +
                    '<td>' +
                    '<input type="radio" class="evalRadio" name="evalItemVal_doc3_' + e[i].APPLICATION_ID + '" id="itemScore_doc3_3_' + e[i].APPLICATION_ID + '" value="20"> ' +
                    '</td>' +
                    '<td>' +
                    '<input type="text" id="sum_' + e[i].APPLICATION_ID  + '" name="sum" disabled> ' +
                    '</td>' +
                    '<td>' +
                    '<input type="text" id="otherRmk_' + e[i].APPLICATION_ID  + '" name="otherRmk"> ' +
                    '</td>' +
                    '</tr>'
            }
            html += '</tbody>' +
                '</table>';
        }
        /*

        else{
            html += "" +
                '<p style="display: table; margin: 0 auto;">[경력]지원자가 없습니다.</p>';
        }
        */


        $("#tableDiv").append(html);

        $("input[name='sum']").kendoTextBox();
        $("input[name='otherRmk']").kendoTextBox();

        $(".evalRadio").click(function (e) {
            var sum = 0;
            var applicationId = $(this).attr("id").split("_")[3];
            $.each($(".evalRadio:checked"), function(e, i){
                if(applicationId == $(i).attr("id").split("_")[3]){

                    sum += Number($(this).val());
                }
            });

            $("#sum_" + applicationId).val(sum)
        });
    },

    makeType2ApplicationList : function(e){
        var html = "";
        if(e != null && e.length > 0){
            html += '' +
                '<table class="searchTable table table-bordered mb-0 mt-20" style="text-align: center">' +
                '<colgroup>' +
                '    <col style="width: 6%">' +
                '    <col style="width: 6%">' +
                '    <col style="width: 8%">' +
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
                '    <th rowSpan="2">입사정보</th>' +
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

            for(var i = 0; i < e.length; i++){
                html += "" +
                    '<tr class="userEvalDocScreen">' +
                    '<td>' + (i + 1) + '</td>' +
                    '<td>' +
                    '<input type="hidden" id="applicationId" name="applicationId" value="' + e[i].APPLICATION_ID + '">' +
                    '<a style="cursor: pointer;" onclick="evalDocScreen.applicationInfo(' + e[i].APPLICATION_ID + ')">' + e[i].USER_NAME + '</a>' +
                    '</td>' +
                    '<td>' +
                    '<input type="hidden" id="applicationId" name="applicationId" value="' + e[i].APPLICATION_ID + '">' +
                    '<button type="button" class="k-button k-button-solid-info" onclick="evalDocScreen.applicationInfo(' + e[i].APPLICATION_ID + ')">조회</button>'+
                    '</td>' +
                    '<td>' +
                    '<input type="radio" class="evalRadio" name="evalItemVal_doc1_' + e[i].APPLICATION_ID + '" id="itemScore_doc1_1_' + e[i].APPLICATION_ID + '" value="40"> ' +
                    '</td>' +
                    '<td>' +
                    '<input type="radio" class="evalRadio" name="evalItemVal_doc1_' + e[i].APPLICATION_ID + '" id="itemScore_doc1_2_' + e[i].APPLICATION_ID + '" value="30"> ' +
                    '</td>' +
                    '<td>' +
                    '<input type="radio" class="evalRadio" name="evalItemVal_doc1_' + e[i].APPLICATION_ID + '" id="itemScore_doc1_3_' + e[i].APPLICATION_ID + '" value="20"> ' +
                    '</td>' +
                    '<td>' +
                    '<input type="radio" class="evalRadio" name="evalItemVal_doc2_' + e[i].APPLICATION_ID + '" id="itemScore_doc2_1_' + e[i].APPLICATION_ID + '" value="60"> ' +
                    '</td>' +
                    '<td>' +
                    '<input type="radio" class="evalRadio" name="evalItemVal_doc2_' + e[i].APPLICATION_ID + '" id="itemScore_doc2_2_' + e[i].APPLICATION_ID + '" value="50"> ' +
                    '</td>' +
                    '<td>' +
                    '<input type="radio" class="evalRadio" name="evalItemVal_doc2_' + e[i].APPLICATION_ID + '" id="itemScore_doc2_3_' + e[i].APPLICATION_ID + '" value="40"> ' +
                    '</td>' +
                    '<td>' +
                    '<input type="text" id="sum_' + e[i].APPLICATION_ID  + '" name="sum" disabled> ' +
                    '</td>' +
                    '<td>' +
                    '<input type="text" id="otherRmk_' + e[i].APPLICATION_ID  + '" name="otherRmk"> ' +
                    '</td>' +
                    '</tr>'
            }
            html+=  '</tbody>' +
                '</table>';

        }
        /*

        else{
            html += "" +
                '<p style="display: table; margin: 0 auto;">[신입]지원자가 없습니다.</p>';
        }
        */





        $("#tableDiv").append(html);

        $("input[name='sum']").kendoTextBox();
        $("input[name='otherRmk']").kendoTextBox();

        $(".evalRadio").click(function (e) {
            var sum = 0;
            var applicationId = $(this).attr("id").split("_")[3];
            $.each($(".evalRadio:checked"), function(e, i){
                if(applicationId == $(i).attr("id").split("_")[3]){

                    sum += Number($(this).val());
                }
            });

            $("#sum_" + applicationId).val(sum)
        });
    },

    applicationInfo : function(e){
        var url = "/inside/pop/applicationView.do?applicationId=" + e;
        if($("#stat").val() == "view"){
            url += "&stat=view";
        }
        var name = "recruitReqPop";
        var option = "width=1000, height=1200, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    },

    applicationEvalDataSet : function(e){
        var sum = 0;

        for(var i = 0; i < e.length; i ++){
            if(e[i].EVAL_ITEM_ID == "doc1" || e[i].EVAL_ITEM_ID == "doc2" || e[i].EVAL_ITEM_ID == "doc3"){
                $("input[name='evalItemVal_" + e[i].EVAL_ITEM_ID + "_" + e[i].APPLICATION_ID + "'][value=" + e[i].EVAL_ITEM_SCORE + "]").prop("checked", true);

                sum += Number(e[i].EVAL_ITEM_SCORE);
                $("#sum_" + e[i].APPLICATION_ID).val(Number($("#sum_" + e[i].APPLICATION_ID).val()) + sum);
                sum = 0;
            }else{
                $("#otherRmk_" + e[i].APPLICATION_ID).val(e[i].EVAL_ITEM_SCORE);
            }
        }
    },

    setEvalScoreBoard : function(){
        if($("#applicationTb tr.userEvalDocScreen").length == 0){
            alert("저장할 평가가 없습니다.");
            return;
        }

        if(confirm("평가를 저장하시겠습니까?")){
            var evalArr = new Array()
            var flag = true;

            $.each($("#applicationTb tr.userEvalDocScreen"), function(i, e){

                if($("input[type='radio'][name='evalItemVal_doc1_" + $(this).find("#applicationId").val() + "']:checked").val() == null ||
                    $("input[type='radio'][name='evalItemVal_doc2_" + $(this).find("#applicationId").val() + "']:checked").val() == null){
                    flag = false;
                    return flag;
                }

                if($(".careerType1").length > 0){
                    if($("input[type='radio'][name='evalItemVal_doc3_" + $(this).find("#applicationId").val() + "']:checked").val() == null){
                        flag = false;
                        return flag;
                    }
                }

                var data = {};
                data = {
                    evalLoginId : $("#evalLoginId").val(),
                    applicationId : $(this).find("#applicationId").val(),
                    evalItemId : "doc1",
                    evalItemScore : $(this).find("input[type='radio'][name='evalItemVal_doc1_" + $(this).find("#applicationId").val() + "']:checked").val(),
                    evalScreenType : "doc"
                }

                evalArr.push(data);

                data = {
                    evalLoginId : $("#evalLoginId").val(),
                    applicationId : $(this).find("#applicationId").val(),
                    evalItemId : "doc2",
                    evalItemScore : $(this).find("input[type='radio'][name='evalItemVal_doc2_" + $(this).find("#applicationId").val() + "']:checked").val(),
                    evalScreenType : "doc"
                }

                evalArr.push(data);

                if($(".careerType1").length > 0){
                    data = {
                        evalLoginId : $("#evalLoginId").val(),
                        applicationId : $(this).find("#applicationId").val(),
                        evalItemId : "doc3",
                        evalItemScore : $(this).find("input[type='radio'][name='evalItemVal_doc3_" + $(this).find("#applicationId").val() + "']:checked").val(),
                        evalScreenType : "doc"
                    }

                    evalArr.push(data);
                }

                data = {
                    evalLoginId : $("#evalLoginId").val(),
                    applicationId : $(this).find("#applicationId").val(),
                    evalItemId : "otherRmk",
                    evalItemScore : $(this).find("#otherRmk_" + $(this).find("#applicationId").val()).val(),
                    evalScreenType : "doc"
                }

                evalArr.push(data);

                if(!flag){
                    alert("선택하지 않은 항목이 있습니다.");
                    return flag;
                }
            })

            if(evalArr.length < $("#applicationTb tr.userEvalDocScreen").length * 3){
                alert("선택하지 않은 항목이 있습니다.");
                return;
            }

            evalDocScreen.global.saveAjaxData = {
                evalLoginId : $("#evalLoginId").val(),
                recruitInfoSn : $("#recruitInfoSn").val(),
                evalArr : JSON.stringify(evalArr),
                type : "doc"
            }

            var result = customKendo.fn_customAjax("/evaluation/setApplicationEvalScreen.do", evalDocScreen.global.saveAjaxData)
            if(result.flag){
                alert("저장되었습니다. 평가종료를 눌러야 평가가 완료됩니다.");
            }
        }
    },

    setEvalEnd : function(){
        if(confirm("심사평가에 참여해 주셔서 진심으로 감사드립니다.\n" +
            "종료 이후에는 평가 내역을 수정 할 수 없습니다. 종료 하시겠습니까?")){
            evalDocScreen.global.saveAjaxData = {
                evalEmpSeq : $("#evalEmpSeq").val(),
                recruitInfoSn : $("#recruitInfoSn").val(),
                applicationStat : "S",
                evalScreenType : "doc"
            }
            var result = customKendo.fn_customAjax("/evaluation/setEvalEnd.do", evalDocScreen.global.saveAjaxData)
            if(result.flag){
                if(result.rs.chk){
                    alert("평가가 종료되었습니다.");
                    opener.parent.recruitListTl.gridReload();
                    window.close();
                }else{
                    alert("평가내용이 저장되지 않은 응시원서가 있습니다.");
                }
            }
        }
    },

    fnResizeForm : function() {
        var strHeight = $('.pop_sign_wrap').outerHeight() + (window.outerHeight - window.innerHeight) + 10;

        try{
            var childWindow = window.parent;
            childWindow.resizeTo(1200, strHeight);
        }catch(exception){
            console.log('window resizing cat not run dev mode.');
        }
    },
}
