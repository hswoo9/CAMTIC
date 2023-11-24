var evalInScreen = {
    global : {
        searchAjaxData : "",
        saveAjaxData : "",
        recruitEvalSheetId : "",
        createTableStrArray : new Array(),
    },

    fn_defaultScript : function(){
        evalInScreen.setItemListMakeTable();

        $("#opinion").kendoTextArea({
            rows : 5,
        });

        evalInScreen.fnResizeForm();
    },

    getApplicationList : function() {
        evalInScreen.global.saveAjaxData = {
            evalItemMainId : evalInScreen.global.evalItemMainId,
            evalLoginId : $("#evalLoginId").val(),
            evalScreenType : "in",
        }

        var result = customKendo.fn_customAjax("/evaluation/getApplicationScoreBoard", evalInScreen.global.saveAjaxData);
        if (result.flag) {
            var makeData = {};
            if (result.rs.itemList.length > 0) {
                makeData.itemList = result.rs.itemList;
            }

            if (result.rs.evalScoreBoard.length > 0) {
                makeData.evalScoreBoard = result.rs.evalScoreBoard;
            }

            evalInScreen.global.saveAjaxData = {
                recruitInfoSn : $("#recruitInfoSn").val(),
                recruitAreaInfoSn : $("#recruitAreaInfoSn").val() == "" ? "All" : $("#recruitAreaInfoSn").val(),
                searchType : "D"
            }

            var applicationList = customKendo.fn_customAjax("/inside/getApplicationList", evalInScreen.global.saveAjaxData);
            if (applicationList.flag) {
                makeData.applicationList = applicationList.list;
            }

            evalInScreen.setItemListMakeTable(makeData);
        }
    },

    setItemListMakeTable : function(){
        $("#listTb tbody tr").remove();
        evalInScreen.global.createTableStrArray = new Array();

        evalInScreen.global.saveAjaxData = {
            evalItemMainId : $("#evalItemMainId").val(),
            evalLoginId : $("#evalLoginId").val(),
            evalScreenType : "in",
            applicationId : $("#applicationId").val(),
        }

        var result = customKendo.fn_customAjax("/evaluation/getApplicationScoreBoard", evalInScreen.global.saveAjaxData);
        if (result.flag) {
            evalInScreen.makeApplicationList(result.rs);
        }
    },

    makeApplicationList : function(e){
        var itemList = e.itemList;
        var evalScoreBoard = e.evalScoreBoard;

        $("#evalTb tbody tr").remove();
        var html = "";
        for(var i = 0; i < itemList.length; i++){
            html += "" +
                '<tr class="userEvalInScreen">' +
                    '<td>' + (i + 1) + '</td>' +
                    '<td>' + itemList[i].EVAL_ITEM_TYPE + '</td>' +
                    '<td>' + itemList[i].EVAL_ITEM_TITLE + '</td>' +
                    '<td>' + itemList[i].EVAL_ITEM_VAL + '</td>' +
                    '<td>' +
                        '<input type="text" class="itemScore" id="itemScore_' + itemList[i].EVAL_ITEM_ID + '_' + $("#applicationId").val()  + '"' +
                        'maxScore="' + itemList[i].EVAL_ITEM_VAL + '" onkeydown="return evalInScreen.onlyNumber(event)" ' +
                        'onkeyup="evalInScreen.removeChar(event);evalInScreen.maxScoreFilter(this)" value="0" style="text-align: center;width: 50px"> ' +
                    '</td>' +
                '</tr>'
        }

        $("#evalTb").append(html);

        $(".itemScore").keyup(function(){
            $(this).val(Number($(this).val().toString().toMoney2()));

            const regExp = /^[0-9]+$/;
            var sum = 0;
            if(regExp.test($(this).val())){
                var applicationId = $(this).attr("id").split("_")[2];
                $.each($(".itemScore"), function(e, i){
                    if(applicationId == $(i).attr("id").split("_")[2]){
                        sum += Number($(this).val());
                    }
                });
            }

            $("#sum_" + applicationId).text(sum)
        })

        if(evalScoreBoard != null){
            evalInScreen.applicationEvalDataSet(evalScoreBoard);
        }
    },

    applicationEvalDataSet : function(e){
        if(e != null){
            var sum = 0;

            for(var i = 0; i < e.length; i ++){
                if(e[i].EVAL_ITEM_ID == "opinion"){
                    $("#opinion").val(e[i].EVAL_ITEM_SCORE);
                }else{
                    $("#itemScore_" + e[i].EVAL_ITEM_ID + "_" + e[i].APPLICATION_ID).val(e[i].EVAL_ITEM_SCORE);
                    sum += Number(e[i].EVAL_ITEM_SCORE);

                    $("#sum_" + e[i].APPLICATION_ID).text(Number($("#sum_" + e[i].APPLICATION_ID).val()) + sum);
                }
            }
        }
    },

    setEvalScoreBoard : function(){
        if(confirm("해당 지원자의 면접평가를 저장하시겠습니까?")){
            var evalArr = new Array()
            $.each($("#evalTb tr.userEvalInScreen"), function(i, e){
                var data = {
                    evalLoginId : $("#evalLoginId").val(),
                    applicationId : $("#applicationId").val(),
                    evalItemId : $(this).find(".itemScore").attr("id").split("_")[1],
                    evalItemScore : $(this).find(".itemScore").val(),
                    evalScreenType : "in"
                }

                evalArr.push(data);
            })

            evalArr.push({
                evalLoginId : $("#evalLoginId").val(),
                applicationId : $("#applicationId").val(),
                evalItemId : "opinion",
                evalItemScore : $("#opinion").val(),
                evalScreenType : "in"
            });

            evalInScreen.global.saveAjaxData = {
                evalLoginId : $("#evalLoginId").val(),
                recruitInfoSn : $("#recruitInfoSn").val(),
                evalArr : JSON.stringify(evalArr),
                type : "doc"
            }

            var result = customKendo.fn_customAjax("/evaluation/setApplicationEvalScreen.do", evalInScreen.global.saveAjaxData)
            if(result.flag){
                alert("저장되었습니다.");
                opener.parent.evalInApplicationList.gridReload();
                window.close();
            }
        }
    },

    onlyNumber : function(event){
        event = event || window.event;
        var keyID = (event.which) ? event.which : event.keyCode;
        if(keyID != 9){
            if ( (keyID >= 48 && keyID <= 57) || (keyID >= 96 && keyID <= 105) || keyID == 8 || keyID == 46 || keyID == 37 || keyID == 39 || keyID == 13)
                return;
            else
                return false;
        }
    },

    maxScoreFilter : function(e){
        if(Number($(e).attr("maxScore")) < Number($(e).val())){
            alert("평가점수는 최대 점수를 초과할 수 없습니다.");
            $(e).val(0);
        }
    },

    removeChar : function(event) {
        event = event || window.event;
        var keyID = (event.which) ? event.which : event.keyCode;
        if(keyID != 9){
            if ( keyID == 8 || keyID == 46 || keyID == 37 || keyID == 39)
                return;
            else
                event.target.value = event.target.value.replace(/[^0-9]/g, "");
        }
    },

    fnResizeForm : function() {
        var strWidth = $('.pop_sign_wrap').outerWidth() + (window.outerWidth - window.innerWidth);
        var strHeight = $('.pop_sign_wrap').outerHeight() + (window.outerHeight - window.innerHeight) + 10;

        try{
            var childWindow = window.parent;
            childWindow.resizeTo((strWidth), strHeight);
        }catch(exception){
            console.log('window resizing cat not run dev mode.');
        }
    },
    applicationInfo : function(e){
        var url = "/inside/pop/applicationView.do?applicationId=" + e;
        var name = "recruitReqPop";
        var option = "width=1000, height=1200, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    }
}
