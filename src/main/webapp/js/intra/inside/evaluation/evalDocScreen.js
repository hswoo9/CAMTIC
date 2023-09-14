var evalDocScreen = {
    global : {
        searchAjaxData : "",
        saveAjaxData : "",
    },

    fn_defaultScript : function(){
        evalDocScreen.fnResizeForm();
        evalDocScreen.getRecruitInfo();
    },

    getRecruitInfo : function(){
        evalDocScreen.global.saveAjaxData = {
            recruitInfoSn : $("#recruitInfoSn").val(),
        }

        var result = customKendo.fn_customAjax("/inside/getRecruit.do", evalDocScreen.global.saveAjaxData);
        if(result.flag){
            customKendo.fn_dropDownList("recruitAreaInfoSn", result.recruit.recruitArea, "AREA_TITLE", "RECRUIT_AREA_INFO_SN", "2")
            $("#recruitAreaInfoSn").data("kendoDropDownList").bind("change", evalDocScreen.getApplicationList);
        }
    },

    getApplicationList : function(){
        evalDocScreen.global.saveAjaxData = {
            recruitInfoSn : $("#recruitInfoSn").val(),
            recruitAreaInfoSn : $("#recruitAreaInfoSn").val() == "" ? "All" : $("#recruitAreaInfoSn").val(),
            searchType : "S"
        }

        var result = customKendo.fn_customAjax("/inside/getApplicationList", evalDocScreen.global.saveAjaxData);
        if(result.flag){
            evalDocScreen.makeApplicationList(result.list);
            evalDocScreen.fnResizeForm();
        }

        evalDocScreen.global.saveAjaxData = {
            evalLoginId : $("#evalLoginId").val(),
            evalScreenType : "doc",
        }

        var result = customKendo.fn_customAjax("/evaluation/getApplicationScoreBoard", evalDocScreen.global.saveAjaxData);
        if(result.flag){
            if(result.rs.length > 0){
                evalDocScreen.applicationEvalDataSet(result.rs);
            }
        }
    },

    makeApplicationList : function(e){
        $("#applicationTb tr").remove();
        var html = "";
        for(var i = 0; i < e.length; i++){
            html += "" +
                '<tr class="userEvalDocScreen">' +
                    '<td>' + (i + 1) + '</td>' +
                    '<td>' +
                        '<input type="hidden" id="applicationId" name="applicationId" value="' + e[i].APPLICATION_ID + '">' + e[i].USER_NAME +
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
        $("#applicationTb").append(html);

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

    applicationEvalDataSet : function(e){
        var sum = 0;

        for(var i = 0; i < e.length; i ++){
            if(e[i].EVAL_ITEM_ID == "doc1" || e[i].EVAL_ITEM_ID == "doc2"){
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
                alert("저장되었습니다.");
            }
        }
    },

    setEvalEnd : function(){
        if(confirm("심사평가에 참여해 주셔서 진심으로 감사드립니다.\n" +
            "종료 이후에는 평가 내역을 수정 할 수 없습니다. 종료 하시겠습니까?")){
            evalDocScreen.global.saveAjaxData = {
                evalLoginId : $("#evalLoginId").val(),
                recruitInfoSn : $("#recruitInfoSn").val(),
            }
            var result = customKendo.fn_customAjax("/evaluation/setEvalEnd.do", evalDocScreen.global.saveAjaxData)
            if(result.flag){
                if(result.rs.chk){
                    alert("평가가 종료되었습니다.");
                    window.close();
                }else{
                    alert("평가내용이 저장되지 않은 응시원서가 있습니다.");
                }
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
