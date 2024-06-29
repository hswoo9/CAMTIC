<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<script type="text/javascript" src="/js/intra/inside/evaluation/evalResult.js?v=${today}"/></script>
<script type="text/javascript" src="/js/intra/inside/evaluation/evaluationEmpListPop.js?v=${today}"></script>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">

<body class="font-opensans" style="background-color:#fff;">
<input type="hidden" id="evalEmpSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="deptSeq" value="${loginVO.orgnztId}"/>
<input type="hidden" id="deptName" value="${loginVO.orgnztNm}"/>
<input type="hidden" id="evalSn" value="${params.pk}"/>
<input type="hidden" id="step" value="${params.key}"/>
<input type="hidden" id="empSeq" value="${params.empSeq}"/>
<input type="hidden" id="duty" value="${empData.DUTY_CODE}"/>
<input type="hidden" id="occupation" value="${empData.OCCUPATION_NM}"/>

<div style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">평가</h3>
            <div class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-info" id="btnActive1" onclick="saveData(1)">저장</button>
                <button type="button" class="k-button k-button-solid-info" id="btnActive2" onclick="saveData(10)">제출</button>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">닫기</button>
            </div>
        </div>
        <div style="padding: 20px 30px;">
            <table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col width="2%">
                    <col width="9%">
                    <col width="20%">
                    <col width="36%">
                    <col width="5%">
                    <col width="5%">
                    <col width="5%">
                    <col width="5%">
                    <col width="5%">
                    <col width="9%">
                </colgroup>
                <thead>
                <tr>
                    <th scope="row" class="text-center th-color" rowspan="2"></th>
                    <th scope="row" class="text-center th-color" rowspan="2">역량</th>
                    <th scope="row" class="text-center th-color" rowspan="2">정의</th>
                    <th scope="row" class="text-center th-color" rowspan="2">평가 착안점</th>
                    <th scope="row" class="text-center th-color" colspan="5">평가기준</th>
                    <th scope="row" class="text-center th-color" rowspan="2">점수</th>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">탁월</th>
                    <th scope="row" class="text-center th-color">우수</th>
                    <th scope="row" class="text-center th-color">보통</th>
                    <th scope="row" class="text-center th-color">미흡</th>
                    <th scope="row" class="text-center th-color">부족</th>
                </tr>
                </thead>
                <tbody id="evalList">
                </tbody>
                <thead>
                <tr style="text-align: center;">
                    <td colspan="4">계</td>
                    <td id="sScore"></td>
                    <td id="aScore"></td>
                    <td id="bScore"></td>
                    <td id="cScore"></td>
                    <td id="dScore"></td>
                    <td><input type="text" id="totalScore" class ="textBox" value="" disabled></td>
                </tr>
                </thead>
            </table>

            <table class="popTable table table-bordered mb-0" style="border-left: none;">
                <colgroup>
                    <col width="13%">
                    <col width="37%">
                    <col width="13%">
                    <col width="37%">
                </colgroup>
                <thead>
                <tr>
                    <th id="interview_topic1" colspan="4" style="font-size: 14px; font-weight:600;background-color: #00397f96; color: #fff;">평가의견</th>
                </tr>
                <tr>
                    <td colspan="4">
                        <span class="k-input k-textarea k-input-solid k-input-md k-rounded-md" style="width: 100%; height: 100px;"><textarea type="text" id="evalView" style="width: 100%; height: 100px; resize: none;" data-role="textarea" aria-disabled="false" rows="5" class="!k-overflow-y-auto k-input-inner" autocomplete="off"></textarea></span>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</div>


<script>
    let sStrSum = 0;
    let sEndSum = 0;
    let aStrSum = 0;
    let aEndSum = 0;
    let bStrSum = 0;
    let bEndSum = 0;
    let cStrSum = 0;
    let cEndSum = 0;
    let dStrSum = 0;
    let dEndSum = 0;

    if($("#duty").val() == "4" || $("#duty").val() == "5"){
        var evalPositionType = "teamLeader";
    }else if($("#duty").val() == "2" || $("#duty").val() == "3" || $("#duty").val() == "7"){
        var evalPositionType = "deptHeader";
    }else{
        var evalPositionType = "team";
    }

    if($("#occupation").val() == "P&M"){
        var evalType = "PM";
    }else if($("#occupation").val() == "A&C"){
        var evalType = "AC";
    }else if($("#occupation").val() == "R&D"){
        var evalType = "RD";
    }

    if($("#step").val() == "0"){  // 본인평가
        var evalResultType = "eval";
        $(".title_NM").text("본인 평가");
    }else if($("#step").val() == "1"){ // 1차평가
        var evalResultType = "evalF";
        $(".title_NM").text("1차 역량평가");
        $("#btnActive2").hide();
    }else if($("#step").val() == "2"){ // 2차평가
        var evalResultType = "evalS";
        $(".title_NM").text("2차 역량평가");
        $("#btnActive2").hide();
    }

    $(function (){
        fn_mngList();

        $('.inputScore').on('input', function () {

            // 입력된 값에서 숫자와 소수점 이외의 문자를 모두 제거합니다.
            $(this).val($(this).val().replace(/[^0-9\.]/g, ''));

            // 입력된 값이 소수점을 포함하는 경우에 대해서만 처리합니다.
            var inputValue = $(this).val();
            if (inputValue.indexOf('.') !== -1) {
                // 소수점 이전 값에 대해서는 자연수 2자리까지만 입력되도록 합니다.
                var naturalNumber = inputValue.split('.')[0].slice(0, 3);
                // 소수점 이후 값에 대해서는 소수점 1자리까지만 입력되도록 합니다.
                var decimalNumber = inputValue.split('.')[1].slice(0, 1);
                inputValue = naturalNumber + '.' + decimalNumber;
            } else {
                // 입력된 값이 소수점을 포함하지 않는 경우에는 자연수 2자리까지만 입력되도록 합니다.
                inputValue = inputValue.slice(0, 3);
            }

            $(this).val(inputValue);
        });
    });

    function fn_mngList(){
        $.ajax({
            url : "/evaluation/getEvaluationScoreList",
            type : "post",
            data : {
                evalSn : $("#evalSn").val(),
                empSeq : $("#empSeq").val(),
                evalEmpSeq : $("#evalEmpSeq").val(),
                eType : evalType,
                pType : evalPositionType,
                rType : evalResultType
            },
            dataType : "json",
            async : false,
            success : function(result){
                if(result.data.EVAL == "Y" || result.data.EVAL_F == "Y" || result.data.EVAL_S == "Y"){
                    document.getElementById("evalView").disabled = true;
                    document.getElementById("btnActive1").disabled = true;
                    document.getElementById("btnActive2").disabled = true;
                }

                if($("#step").val() == "1"){ // 1차평가
                    $("#evalView").val(result.data.EVAL_F_VIEW);
                }else if($("#step").val() == "2"){ // 2차평가
                    $("#evalView").val(result.data.EVAL_S_VIEW);
                }else{ // 본인평가
                    $("#evalView").val(result.data.EVAL_VIEW);
                }

                const list = result.list
                for (var i = 0; i < list.length; i++) {
                    var item = list[i];
                    fn_addRow(item);
                }

                var evalScore = 0;

                $(".evalScore").each(function() {
                    var value = parseFloat($(this).val());
                    if (!isNaN(value)) {
                        evalScore += value;
                    }
                });

                $("#sScore").text(sStrSum != sEndSum ? (sStrSum+"~"+sEndSum) : sStrSum);
                $("#aScore").text(aStrSum != aEndSum ? (aStrSum+"~"+aEndSum) : aStrSum);
                $("#bScore").text(bStrSum != bEndSum ? (bStrSum+"~"+bEndSum) : bStrSum);
                $("#cScore").text(cStrSum != cEndSum ? (cStrSum+"~"+cEndSum) : cStrSum);
                $("#dScore").text(dStrSum != dEndSum ? (dStrSum+"~"+dEndSum) : dStrSum);
                $("#totalScore").val(evalScore);
            },
            error : function(e) {
                console.log(e);
            }
        });
    }

    function fn_addRow(item){
        console.log("item", item);
        var evNum = $("#evalList").find("tr").length;
        var html = "";

            html += '<tr style="text-align: center;">';
            html += '   <td>' + (evNum + 1) + '</td>';
            html += '   <td>';
            html += ''+item.EVAL_CAP;
            html += '       <input type="hidden" id="evalItemId' + evNum + '" class ="textBox" value="' +  item.EVAL_ITEM_ID + '">';
            html += '   </td>';
            html += '   <td style="text-align: left; font-size: 11px">';
            html += '' +  (item.EVAL_TITLE).replaceAll("\n", "<br>") + '';
            html += '   </td>';
            html += '   <td style="text-align: left; font-size: 11px">';
            html += '' +  (item.EVAL_VAL).replaceAll("\n", "<br>") + '';
            html += '   </td>';
            html += '   <td>' +
                '<input type="hidden" id="gradeS_s'+evNum+'" value="'+item.EVAL_STR_S+'"/>' +
                '<input type="hidden" id="gradeD_e'+evNum+'" value="'+item.EVAL_END_D+'"/>';
            let sText = item.EVAL_STR_S;
            if(sText != item.EVAL_END_S){
                sText += "~"+ item.EVAL_END_S;
            }
            html += '' + sText + '';
            html += '   </td>';
            html += '   <td>';
            let aText = item.EVAL_STR_A;
            if(aText != item.EVAL_END_A){
                aText += "~"+ item.EVAL_END_A;
            }
            html += '' + aText + '';
            html += '   </td>';
            html += '   <td>';
            let bText = item.EVAL_STR_B;
            if(bText != item.EVAL_END_B){
                bText += "~"+ item.EVAL_END_B;
            }
            html += '' + bText + '';
            html += '   </td>';
            html += '   <td>';
            let cText = item.EVAL_STR_C;
            if(cText != item.EVAL_END_C){
                cText += "~"+ item.EVAL_END_C;
            }
            html += '' + cText + '';
            html += '   </td>';
            html += '   <td>';
            let dText = item.EVAL_STR_D;
            if(dText != item.EVAL_END_D){
                dText += "~"+ item.EVAL_END_D;
            }
            html += '' + dText + '';

            sStrSum += isNaN(item.EVAL_STR_S) ? 0 : Number(item.EVAL_STR_S);
            sEndSum += isNaN(item.EVAL_END_S) ? 0 : Number(item.EVAL_END_S);
            aStrSum += isNaN(item.EVAL_STR_A) ? 0 : Number(item.EVAL_STR_A);
            aEndSum += isNaN(item.EVAL_END_A) ? 0 : Number(item.EVAL_END_A);
            bStrSum += isNaN(item.EVAL_STR_B) ? 0 : Number(item.EVAL_STR_B);
            bEndSum += isNaN(item.EVAL_END_B) ? 0 : Number(item.EVAL_END_B);
            cStrSum += isNaN(item.EVAL_STR_C) ? 0 : Number(item.EVAL_STR_C);
            cEndSum += isNaN(item.EVAL_END_C) ? 0 : Number(item.EVAL_END_C);
            dStrSum += isNaN(item.EVAL_STR_D) ? 0 : Number(item.EVAL_STR_D);
            dEndSum += isNaN(item.EVAL_END_D) ? 0 : Number(item.EVAL_END_D);

            html += '   </td>';
            if(item.TEM_ACTIVE == "Y"){
                html += '   <td>';
                html += '       <input type="text" id="evalScore' + evNum + '" class ="textBox evalScore" value="' + item.EVAL_SCORE + '" onchange="fn_sumScore()">';
                html += '   </td>';
            }else{
                html += '   <td>';
                html += '       <input type="text" id="evalScore' + evNum + '" class ="textBox evalScore inputScore" value="' + item.EVAL_SCORE + '" onchange="fn_sumScore('+evNum+')">';
                html += '   </td>';
            }
            html += '</tr>';

        $('#evalList').append(html);

        customKendo.fn_textBox(["evalCap" + evNum, "evalTitle" + evNum, "evalVal" + evNum,
             "evalScore" + evNum,
            "Sscore", "Ascore", "Bscore_s", "Bscore_e", "Cscore", "Dscore", "totalScore" ]);
    }

    function fn_sumScore(evNum){

        var evalScoreValue = parseFloat(document.getElementById("evalScore" + evNum).value);
        var gradeS_sValue = parseFloat(document.getElementById("gradeS_s" + evNum).value);
        var gradeD_eValue = parseFloat(document.getElementById("gradeD_e" + evNum).value);

        if (evalScoreValue > gradeS_sValue) {
            alert(gradeS_sValue + "점 이하로 입력해주세요.");
            $("#evalScore"+evNum).val("0");
        }

        if (evalScoreValue < gradeD_eValue) {
            alert(gradeD_eValue + "점 이상으로 입력해주세요.");
            $("#evalScore"+evNum).val("0");
        }

        var evalScore = 0;

        $(".evalScore").each(function() {
            var value = parseFloat($(this).val());
            if (!isNaN(value)) {
                evalScore += value;
            }
        });

        $("#totalScore").val(evalScore);
    }

    function saveData(key){
        var flag = true;
        var evalBodyArr = [];
        var evalLen = $("#evalList").find("tr").length;
        for(var i = 0 ; i < evalLen ; i++) {
            evalBodyArr.push({
                evalItemId: $("#evalItemId" + i).val(),
                evalScore: $("#evalScore" + i).val()
            });

            if($("#evalScore" + i).val() == "0"){
                flag = false;
                break;
            }
        }
        if(!flag){
            alert("모든 평가 항목에 점수를 작성해야 저장이 가능합니다."); return;
        }

        if(key == "10"){
            if(!confirm("제출 후 수정이 불가능 합니다. 제출하시겠습니까?")){
                return;
            }
        }

        var parameters = {
            evalSn : $("#evalSn").val(),
            empSeq : $("#empSeq").val(),
            evalEmpSeq : $("#evalEmpSeq").val(),
            totalScore : $("#totalScore").val(),
            evalView : $("#evalView").val(),
            evalResultType : evalResultType,
            save : key
        }
        if(key == "10"){
            parameters.evalCk = "Y";
        }else{
            parameters.evalCk = "W";
        }

        parameters.evalBodyArr = JSON.stringify(evalBodyArr);

        $.ajax({
            url : "/evaluation/setEvalScoreTemSave",
            data : parameters,
            dataType : "json",
            success : function (rs){
                console.log(rs);
                if(key == "1") {
                    alert("저장 되었습니다.");
                    if($("#step").val() == "1" || $("#step").val() == "2"){
                        opener.evaluationEmpListPop.gridReload();
                    }
                    window.close();
                }else if(key == "10") {
                    alert("제출이 완료되었습니다.");
                    window.close();
                }
            }
        });
    }

</script>
</body>
</html>