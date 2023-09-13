var inEvalRegPop = {
    global : {
        createHtmlStr : "",
        ajaxOpt : "",
        saveAjaxData : "",
        nowPage : "",
        boardType : "",
        boardList : "",
        params : "",
        searchAjaxData : "",
    },

    fn_defaultScript : function() {
        customKendo.fn_textBox(["evalManageTitle"]);

        if($("#evalItemMainId").val()){
            inEvalRegPop.getInEvalItemMain();
        }

    },

    addRow : function(){
        inEvalRegPop.global.createHtmlStr = "";
        var cnt = Number($("#evalItemTypeCnt").val());
        if (cnt > 0) {
            if(cnt < $("#itemTb tbody tr").length){
                var delRowCnt = 0;
                delRowCnt = $("#itemTb tbody tr").length - cnt;
                for(var i = 0; i < delRowCnt; i++){
                    $("#itemTb tbody tr:last-child").remove();
                }
            }else{
                for (var i = 0; i < cnt; i++) {
                    inEvalRegPop.global.createHtmlStr = "";
                    inEvalRegPop.global.createHtmlStr += "" +
                        "<tr>" +
                            "<td>" + (i + 1) + "</td>" +
                            "<td>" +
                                "<input type='text' id='evalItemNum" + i + "' name='evalItemNum' autocomplete='off' style='width: 39px' oninput=\"this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\\..*)\\./g, '$1');\">" +
                            "</td>" +
                            "<td>" +
                                "<input type='text' id='evalItemType" + i + "' name='evalItemType' autocomplete='off' maxlength='3'>" +
                            "</td>" +
                            "<td>" +
                                "<input type='text' id='evalItemTitle" + i + "' name='evalItemTitle' autocomplete='off'>" +
                            "</td>" +
                            "<td>" +
                                "<input type='text' id='evalItemVal" + i + "' name='evalItemVal' autocomplete='off' style='width: 81px' oninput=\"this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\\..*)\\./g, '$1');\">" +
                            "</td>" +
                        "</tr>";

                    if ($("#itemTb tbody tr")[i] == null) {
                        $("#itemTb tbody").append(inEvalRegPop.global.createHtmlStr);
                        customKendo.fn_textBox(["evalItemNum" + i, "evalItemVal" + i]);
                        customKendo.fn_textArea(["evalItemType" + i, "evalItemTitle" + i]);
                    }
                }
            }
        } else {
            $("#itemTb tbody tr").remove();
        }
    },

    setInEvalItem : function(){
        var itemlength = $("#itemTb tbody tr").length;
        if(!$("#evalManageTitle").val()){
            alert("관리명을 입력해주세요.");
            $("#evalManageTitle").focus()
            return;
        }else if(itemlength == 0){
            alert("항목을 1개 이상 입력해주세요.");
            return;
        }

        if(confirm("등록하시겠습니까?")){
            var points = 0;

            inEvalRegPop.global.saveAjaxData = {
                evalItemMainId : $("#evalItemMainId").val(),
                evalManageTitle : $("#evalManageTitle").val(),
                evalItemCnt : itemlength,
                empSeq : $("#empSeq").val()
            }

            var evalItemArr = new Array()
            $.each($("#itemTb tbody tr"), function(){
                if($(this).find("input[name='evalItemTitle']").val() != ""){
                    var data = {
                        evalItemNum : $(this).find("input[name='evalItemNum']").val(),
                        evalItemType : $(this).find("input[name='evalItemType']").val(),
                        evalItemTitle : $(this).find("input[name='evalItemTitle']").val(),
                        evalItemVal : $(this).find("input[name='evalItemVal']").val(),
                    }
                    evalItemArr.push(data);

                    /** 총 배점 */
                    points += Number($(this).find("input[name='evalItemVal']").val());
                }
            })

            inEvalRegPop.global.saveAjaxData.evalItemArr = JSON.stringify(evalItemArr);

            var result = customKendo.fn_customAjax("/inside/setEvalItemMain.do", inEvalRegPop.global.saveAjaxData);
            if(result.flag){
                alert("등록되었습니다.");
                opener.parent.inEvalManage.gridReload();
                window.close();
            }
        }
    },

    getInEvalItemMain : function(){
        inEvalRegPop.global.searchAjaxData = {
            evalItemMainId : $("#evalItemMainId").val(),
        }

        var result = customKendo.fn_customAjax("/inside/getEvalItemMain.do", inEvalRegPop.global.searchAjaxData);
        if(result.flag){
            $("#evalManageTitle").val(result.rs.EVAL_MANAGE_TITLE);
            inEvalRegPop.itemSetting(result.rs);
        }
    },

    itemSetting : function(e){
        var itemList = e.itemList;

        $("#evalItemTypeCnt").val(e.EVAL_ITEM_CNT);
        inEvalRegPop.addRow();

        $.each($("#itemTb tbody tr"), function(i, e){
            $(this).find("#evalItemNum" + i).val(itemList[i].EVAL_ITEM_NUM);
            $(this).find("#evalItemType" + i).val(itemList[i].EVAL_ITEM_TYPE);
            $(this).find("#evalItemTitle" + i).val(itemList[i].EVAL_ITEM_TITLE);
            $(this).find("#evalItemVal" + i).val(itemList[i].EVAL_ITEM_VAL == "" ? 0 : itemList[i].EVAL_ITEM_VAL);
        })
    },
}