<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script src="/js/kendoui/kendo.all.min.js"></script>
<script type="text/javascript" src="/js/intra/inside/evaluation/evalResult.js?v=${today}"/></script>
<script type="text/javascript" src="/js/intra/inside/evaluation/evaluationEmpListPop.js?v=${today}"></script>
<script type="text/javascript" src="/js/intra/common/common.js?${toDate}"></script>
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
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
            <h3 class="card-title title_NM">본인 평가</h3>
            <div class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-info" id="btnActive1" onclick="saveData(1)">저장</button>
                <button type="button" class="k-button k-button-solid-info" id="btnActive2"  onclick="saveData(10)">제출</button>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">닫기</button>
            </div>
        </div>
        <div style="padding: 20px 30px;">
            <table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col width="2%">
                    <col width="9%">
                    <col width="12%">
                    <col width="24%">
                    <col width="9%">
                    <col width="9%">
                    <col width="9%">
                    <col width="9%">
                    <col width="9%">
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
                    <td><input type="text" id="Sscore" class ="textBox" value="" disabled></td>
                    <td><input type="text" id="Ascore" class ="textBox" value="" disabled></td>
                    <td><input type="text" id="Bscore_s" class ="textBox" value="" style="width:40%;" disabled> ~ <input type="text" id="Bscore_e" class ="textBox" value="" style="width:40%;" disabled></td>
                    <td><input type="text" id="Cscore" class ="textBox" value="" disabled></td>
                    <td><input type="text" id="Dscore" class ="textBox" value="" disabled></td>
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
                        <span class="k-input k-textarea k-input-solid k-input-md k-rounded-md" style="width: 95%; height: 100px;"><textarea type="text" id="evalView" style="width: 100%; height: 100px; resize: none;" data-role="textarea" aria-disabled="false" rows="5" class="!k-overflow-y-auto k-input-inner" autocomplete="off"></textarea></span>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</div>


<script>
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
    }else if($("#step").val() == "1"){ // 1차평가
        var evalResultType = "evalF";
    }else if($("#step").val() == "2"){ // 2차평가
        var evalResultType = "evalS";
    }

    $(function (){
        fn_mngList();
    });
    function fn_mngList(){
        $.ajax({
            url : "/evaluation/getEvaluationScoreList",
            type : "post",
            data : {
                evalSn : $("#evalSn").val(),
                empSeq : $("#empSeq").val(),
                eType : evalType,
                pType : evalPositionType,
                rType : evalResultType
            },
            dataType : "json",
            async : false,
            success : function(result){
                if(result.data.EVAL_F == "Y" || result.data.EVAL_S == "Y"){
                    document.getElementById("evalView").disabled = true;
                    document.getElementById("btnActive1").disabled = true;
                    document.getElementById("btnActive2").disabled = true;
                }

                if($("#step").val() == "1"){ // 1차평가
                    $("#evalView").val(result.data.EVAL_F_VIEW)
                }else if($("#step").val() == "2"){ // 2차평가
                    $("#evalView").val(result.data.EVAL_S_VIEW)
                }

                const list = result.list
                for (var i = 0; i < list.length; i++) {
                    var item = list[i];
                    fn_addRow(item);
                }

                var Sscore = 0;
                var Ascore = 0;
                var Bscore_s = 0;
                var Bscore_e = 0;
                var Cscore = 0;
                var Dscore = 0;
                var evalScore = 0;

                $(".gradeS_s").each(function() {
                    var value = parseFloat($(this).val());
                    if (!isNaN(value)) {
                        Sscore += value;
                    }
                });
                $(".gradeA_s").each(function() {
                    var value = parseFloat($(this).val());
                    if (!isNaN(value)) {
                        Ascore += value;
                    }
                });
                $(".gradeB_s").each(function() {
                    var value = parseFloat($(this).val());
                    if (!isNaN(value)) {
                        Bscore_s += value;
                    }
                });
                $(".gradeB_e").each(function() {
                    var value = parseFloat($(this).val());
                    if (!isNaN(value)) {
                        Bscore_e += value;
                    }
                });
                $(".gradeC_s").each(function() {
                    var value = parseFloat($(this).val());
                    if (!isNaN(value)) {
                        Cscore += value;
                    }
                });
                $(".gradeD_s").each(function() {
                    var value = parseFloat($(this).val());
                    if (!isNaN(value)) {
                        Dscore += value;
                    }
                });

                $(".evalScore").each(function() {
                    var value = parseFloat($(this).val());
                    if (!isNaN(value)) {
                        evalScore += value;
                    }
                });

                $("#Sscore").val(Sscore);
                $("#Ascore").val(Ascore);
                $("#Bscore_s").val(Bscore_s);
                $("#Bscore_e").val(Bscore_e);
                $("#Cscore").val(Cscore);
                $("#Dscore").val(Dscore);

                $("#totalScore").val(evalScore);
            },
            error : function(e) {
                console.log(e);
            }
        });
    }

    function fn_addRow(item){
        var evNum = $("#evalList").find("tr").length;
        var html = "";

            html += '<tr style="text-align: center;">';
            html += '   <td>' + (evNum + 1) + '</td>';
            html += '   <td>';
            html += '       <input type="text" id="evalCap' + evNum + '" class ="textBox" value="' +  item.EVAL_CAP + '" disabled>';
            html += '       <input type="hidden" id="evalItemId' + evNum + '" class ="textBox" value="' +  item.EVAL_ITEM_ID + '">';
            html += '   </td>';
            html += '   <td>';
            html += '       <input type="text" id="evalTitle' + evNum + '" class ="textBox" value="' +  item.EVAL_TITLE + '" disabled>';
            html += '   </td>';
            html += '   <td>';
            html += '       <input type="text" id="evalVal' + evNum + '" class ="textBox" value="' +  item.EVAL_VAL + '" disabled>';
            html += '   </td>';
            html += '   <td>';
            html += '       <input type="text" id="gradeS_s' + evNum + '" class ="textBox gradeS_s" style="width: 40%;" value="' +  item.EVAL_STR_S + '" disabled>';
            html += '   </td>';
            html += '   <td>';
            html += '       <input type="text" id="gradeA_s' + evNum + '" class ="textBox gradeA_s" style="width: 40%;" value="' +  item.EVAL_STR_A + '" disabled>';
            html += '   </td>';
            html += '   <td>';
            html += '       <input type="text" id="gradeB_s' + evNum + '" class ="textBox gradeB_s" style="width: 40%;" value="' +  item.EVAL_STR_B + '" disabled> ~ ';
            html += '       <input type="text" id="gradeB_e' + evNum + '" class ="textBox gradeB_e" style="width: 40%;" value="' +  item.EVAL_END_B + '" disabled>';
            html += '   </td>';
            html += '   <td>';
            html += '       <input type="text" id="gradeC_s' + evNum + '" class ="textBox gradeC_s" style="width: 40%;" value="' +  item.EVAL_STR_C + '" disabled>';
            html += '   </td>';
            html += '   <td>';
            html += '       <input type="text" id="gradeD_s' + evNum + '" class ="textBox gradeD_s" style="width: 40%;" value="' +  item.EVAL_STR_D + '" disabled>';
            html += '   </td>';
            if(item.TEM_ACTIVE == "Y"){
                html += '   <td>';
                html += '       <input type="text" id="evalScore' + evNum + '" class ="textBox evalScore" value="' + item.EVAL_SCORE + '" onchange="fn_sumScore()" disabled>';
                html += '   </td>';
            }else{
                html += '   <td>';
                html += '       <input type="text" id="evalScore' + evNum + '" class ="textBox evalScore" value="' + item.EVAL_SCORE + '" onchange="fn_sumScore('+evNum+')">';
                html += '   </td>';
            }
            html += '</tr>';

        $('#evalList').append(html);

        customKendo.fn_textBox(["evalCap" + evNum, "evalTitle" + evNum, "evalVal" + evNum, "gradeS_s" + evNum,
             "gradeA_s" + evNum, "gradeB_s" + evNum, "gradeB_e" + evNum, "gradeC_s" + evNum, "gradeD_s" + evNum, "evalScore" + evNum,
            "Sscore", "Ascore", "Bscore_s", "Bscore_e", "Cscore", "Dscore", "totalScore" ]);
    }

    function fn_sumScore(evNum){

        var evalScoreValue = parseFloat(document.getElementById("evalScore" + evNum).value);
        var gradeS_sValue = parseFloat(document.getElementById("gradeS_s" + evNum).value);
        var gradeD_sValue = parseFloat(document.getElementById("gradeD_s" + evNum).value);

        if (evalScoreValue > gradeS_sValue) {
            alert(gradeS_sValue + "점 이하로 입력해주세요.");
            $("#evalScore"+evNum).val("0");
        }

        if (evalScoreValue < gradeD_sValue) {
            alert(gradeD_sValue + "점 이상으로 입력해주세요.");
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
        if(key == "10"){
            if(!confirm("제출 후 수정이 불가능 합니다. 제출하시겠습니까?")){
                return;
            }

        }

        var parameters = {
            evalSn : $("#evalSn").val(),
            evalEmpSeq : $("#evalEmpSeq").val(),
            empSeq : $("#empSeq").val(),
            totalScore : $("#totalScore").val(),
            evalView : $("#evalView").val(),
            evalResultType : evalResultType,
            save : key
        }

        var evalBodyArr = [];
        var evalLen = $("#evalList").find("tr").length;

        for(var i = 0 ; i < evalLen ; i++) {
            evalBodyArr.push({
                evalItemId: $("#evalItemId" + i).val(),
                evalScore: $("#evalScore" + i).val()
            });
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
                    window.close();
                }else if(key == "10") {
                    opener.location.reload();
                    window.close();
                    alert("제출이 완료되었습니다.");
                }
            }
        });
    }



</script>
</body>
</html>