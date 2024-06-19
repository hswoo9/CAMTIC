<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script src="/js/kendoui/kendo.all.min.js"></script>
<script type="text/javascript" src="/js/intra/inside/evaluation/evalResult.js?v=${today}"/></script>
<script type="text/javascript" src="/js/intra/common/common.js?${toDate}"></script>
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">

<body class="font-opensans" style="background-color:#fff;">
<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="deptSeq" value="${loginVO.orgnztId}"/>
<input type="hidden" id="deptName" value="${loginVO.orgnztNm}"/>
<input type="hidden" id="evalSn" value="${params.pk}"/>
<input type="hidden" id="eType" value="${params.type}"/>
<input type="hidden" id="pType" value="${params.pType}"/>

<div style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">역량평가표 설정</h3>
            <div class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-info" onclick="saveData()">저장</button>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">닫기</button>
            </div>
        </div>
        <div style="padding: 20px 30px;">
            <div id="btnDiv5" class="btn-st popButton" style="font-size: 12px; float: right; margin-bottom: 10px;">
                <button type="button" class="k-button k-button-solid-info" id="scAddBt" onclick="fn_addRow()">추가</button>
                <button type="button" class="k-button k-button-solid-error" onclick="fn_delRow()">삭제</button>
            </div>
            <table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col width="3%">
                    <col width="10%">
                    <col width="13%">
                    <col width="25%">
                    <col width="10%">
                    <col width="10%">
                    <col width="10%">
                    <col width="10%">
                    <col width="10%">
                </colgroup>
                <thead>
                <tr>
                    <th scope="row" class="text-center th-color" rowspan="2"></th>
                    <th scope="row" class="text-center th-color" rowspan="2">역량</th>
                    <th scope="row" class="text-center th-color" rowspan="2">정의</th>
                    <th scope="row" class="text-center th-color" rowspan="2">평가 착안점</th>
                    <th scope="row" class="text-center th-color" colspan="5">평가기준</th>
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
                    <td>
                        <input type="text" id="gradeS_s" style="width: 40%;" value="" disabled> ~ <input type="text" id="gradeS_e"  style="width: 40%;" value="" disabled>
                    </td>
                    <td>
                        <input type="text" id="gradeA_s"  style="width: 40%;" value="" disabled> ~ <input type="text" id="gradeA_e"  style="width: 40%;" value="" disabled>
                    </td>
                    <td>
                    <input type="text" id="gradeB_s"  style="width: 40%;" value="" disabled> ~ <input type="text" id="gradeB_e"  style="width: 40%;" value="" disabled>
                    </td>
                    <td>
                        <input type="text" id="gradeC_s"  style="width: 40%;" value="" disabled> ~ <input type="text" id="gradeC_e"  style="width: 40%;" value="" disabled>
                    </td>
                    <td>
                        <input type="text" id="gradeD_s"  style="width: 40%;" value="" disabled> ~ <input type="text" id="gradeD_e"  style="width: 40%;" value="" disabled>
                    </td>
                </tr>
                </thead>
            </table>
        </div>
    </div>
</div>


<script>
    $(function (){
        fn_mngList();
    });
    function fn_mngList(){
        $.ajax({
            url : "/evaluation/getEvaluationMngList",
            type : "post",
            data : {
                evalSn : $("#evalSn").val(),
                eType : $("#eType").val(),
                pType : $("#pType").val()
            },
            dataType : "json",
            async : false,
            success : function(result){
                const list = result.list
                for (var i = 0; i < list.length; i++) {
                    var item = list[i];
                    fn_addRow(item);
                }
                fn_sumScore();
            },
            error : function(e) {
                console.log(e);
            }
        });
    }

   function fn_sumScore(){
        var Sscore = 0;
        var Sscore_e = 0;
        var Ascore = 0;
        var Ascore_e = 0;
        var Bscore_s = 0;
        var Bscore_e = 0;
        var Cscore = 0;
        var Cscore_e = 0;
        var Dscore = 0;
        var Dscore_e = 0;

        $(".gradeS_s").each(function() {
            var value = parseFloat($(this).val());
            if (!isNaN(value)) {
                Sscore += value;
            }
        });
        $(".gradeS_e").each(function() {
            var value = parseFloat($(this).val());
            if (!isNaN(value)) {
                Sscore_e += value;
            }
        });
        $(".gradeA_s").each(function() {
            var value = parseFloat($(this).val());
            if (!isNaN(value)) {
                Ascore += value;
            }
        });
        $(".gradeA_e").each(function() {
            var value = parseFloat($(this).val());
            if (!isNaN(value)) {
                Ascore_e += value;
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
        $(".gradeC_e").each(function() {
            var value = parseFloat($(this).val());
            if (!isNaN(value)) {
                Cscore_e += value;
            }
        });
        $(".gradeD_s").each(function() {
            var value = parseFloat($(this).val());
            if (!isNaN(value)) {
                Dscore += value;
            }
        });
        $(".gradeD_e").each(function() {
            var value = parseFloat($(this).val());
            if (!isNaN(value)) {
                Dscore_e += value;
            }
        });

        $("#gradeS_s").val(Sscore);
        $("#gradeS_e").val(Sscore_e);
        $("#gradeA_s").val(Ascore);
        $("#gradeA_e").val(Ascore_e);
        $("#gradeB_s").val(Bscore_s);
        $("#gradeB_e").val(Bscore_e);
        $("#gradeC_s").val(Cscore);
        $("#gradeC_e").val(Cscore_e);
        $("#gradeD_s").val(Dscore);
        $("#gradeD_e").val(Dscore_e);
   }

    function fn_addRow(item){
        var evNum = $("#evalList").find("tr").length;
        var html = "";
        if(item != null){
            html += '<tr style="text-align: center;">';
            html += '   <td>' + (evNum + 1) + '</td>';
            html += '   <td>';
            html += '       <input type="text" id="evalCap' + evNum + '" class ="textBox" value="' +  item.EVAL_CAP + '">';
            html += '   </td>';
            html += '   <td>';
            html += '       <textarea id="evalTitle' + evNum + '" style="overflow: auto;" >'+  item.EVAL_TITLE +'</textarea>';
            html += '   </td>';
            html += '   <td>';
            html += '       <textarea id="evalVal' + evNum + '" style="overflow: auto;" >' +  item.EVAL_VAL + '</textarea>';
            html += '   </td>';
            html += '   <td>';
            html += '       <input type="text" id="gradeS_s' + evNum + '" class ="gradeS_s" style="width: 40%;" value="' +  item.EVAL_STR_S + '" oninput="fn_sumScore()"> ~ ';
            html += '       <input type="text" id="gradeS_e' + evNum + '" class ="gradeS_e" style="width: 40%;" value="' +  item.EVAL_END_S + '" oninput="fn_sumScore()">';
            html += '   </td>';
            html += '   <td>';
            html += '       <input type="text" id="gradeA_s' + evNum + '" class ="gradeA_s" style="width: 40%;" value="' +  item.EVAL_STR_A + '" oninput="fn_sumScore()"> ~ ';
            html += '       <input type="text" id="gradeA_e' + evNum + '" class ="gradeA_e" style="width: 40%;" value="' +  item.EVAL_END_A + '" oninput="fn_sumScore()">';
            html += '   </td>';
            html += '   <td>';
            html += '       <input type="text" id="gradeB_s' + evNum + '" class ="gradeB_s" style="width: 40%;" value="' +  item.EVAL_STR_B + '" oninput="fn_sumScore()"> ~ ';
            html += '       <input type="text" id="gradeB_e' + evNum + '" class ="gradeB_e" style="width: 40%;" value="' +  item.EVAL_END_B + '" oninput="fn_sumScore()">';
            html += '   </td>';
            html += '   <td>';
            html += '       <input type="text" id="gradeC_s' + evNum + '" class ="gradeC_s" style="width: 40%;" value="' +  item.EVAL_STR_C + '" oninput="fn_sumScore()"> ~ ';
            html += '       <input type="text" id="gradeC_e' + evNum + '" class ="gradeC_e" style="width: 40%;" value="' +  item.EVAL_END_C + '" oninput="fn_sumScore()">';
            html += '   </td>';
            html += '   <td>';
            html += '       <input type="text" id="gradeD_s' + evNum + '" class ="gradeD_s" style="width: 40%;" value="' +  item.EVAL_STR_D + '" oninput="fn_sumScore()"> ~ ';
            html += '       <input type="text" id="gradeD_e' + evNum + '" class ="gradeD_e" style="width: 40%;" value="' +  item.EVAL_END_D + '" oninput="fn_sumScore()">';
            html += '   </td>';
            html += '</tr>';
        }else {
            html += '<tr style="text-align: center;">';
            html += '   <td>' + (evNum + 1) + '</td>';
            html += '   <td>';
            html += '       <input type="text" id="evalCap' + evNum + '" class ="textBox" >';
            html += '   </td>';
            html += '   <td>';
            html += '       <textarea type="text" id="evalTitle' + evNum + '" style="overflow: auto;" class ="textBox" ></textarea>';
            html += '   </td>';
            html += '   <td>';
            html += '       <textarea type="text" id="evalVal' + evNum + '" style="overflow: auto;" class ="textBox" ></textarea>';
            html += '   </td>';
            html += '   <td>';
            html += '       <input type="text" id="gradeS_s' + evNum + '" class ="gradeS_s" style="width: 40%;" oninput="fn_sumScore()"> ~ ';
            html += '       <input type="text" id="gradeS_e' + evNum + '" class ="gradeS_e" style="width: 40%;" oninput="fn_sumScore()">';
            html += '   </td>';
            html += '   <td>';
            html += '       <input type="text" id="gradeA_s' + evNum + '" class ="gradeA_s" style="width: 40%;" oninput="fn_sumScore()"> ~ ';
            html += '       <input type="text" id="gradeA_e' + evNum + '" class ="gradeA_e" style="width: 40%;" oninput="fn_sumScore()">';
            html += '   </td>';
            html += '   <td>';
            html += '       <input type="text" id="gradeB_s' + evNum + '" class ="gradeB_s" style="width: 40%;" oninput="fn_sumScore()"> ~ ';
            html += '       <input type="text" id="gradeB_e' + evNum + '" class ="gradeB_e" style="width: 40%;" oninput="fn_sumScore()">';
            html += '   </td>';
            html += '   <td>';
            html += '       <input type="text" id="gradeC_s' + evNum + '" class ="gradeC_s" style="width: 40%;" oninput="fn_sumScore()"> ~ ';
            html += '       <input type="text" id="gradeC_e' + evNum + '" class ="gradeC_e" style="width: 40%;" oninput="fn_sumScore()">';
            html += '   </td>';
            html += '   <td>';
            html += '       <input type="text" id="gradeD_s' + evNum + '" class ="gradeD_s" style="width: 40%;" oninput="fn_sumScore()"> ~ ';
            html += '       <input type="text" id="gradeD_e' + evNum + '" class ="gradeD_e" style="width: 40%;" oninput="fn_sumScore()">';
            html += '   </td>';
            html += '</tr>';
        }
        $('#evalList').append(html);
        customKendo.fn_textBox(["evalCap" + evNum, "evalTitle" + evNum, "evalVal" + evNum, "gradeS_s" + evNum, "gradeS_e" + evNum,
             "gradeA_s" + evNum,  "gradeA_e" + evNum, "gradeB_s" + evNum, "gradeB_e" + evNum, "gradeC_s" + evNum, "gradeC_e" + evNum, "gradeD_s" + evNum, "gradeD_e" + evNum]);
    }

    function fn_delRow(){
        if($("#evalList").find("tr").length > 1){
            $("#evalList").find("tr:last").remove();
        }
    }

    function saveData(){
        var formData = new FormData();

        formData.append("evalSn" , $("#evalSn").val());
        formData.append("eType" , $("#eType").val());
        formData.append("pType" , $("#pType").val());
        formData.append("empSeq" , $("#empSeq").val());

      /*  var parameters = {
            evalSn : $("#evalSn").val(),
            eType : $("#eType").val(), // 직군
            pType : $("#pType").val(),  // 부서장, 팀장, 팀원
            empSeq : $("#empSeq").val()
        }*/

        var evalBodyArr = [];
        var evalLen = $("#evalList").find("tr").length;

        for(var i = 0 ; i < evalLen ; i++){
            if($("#evalCap" + i).val() == "" || $("#evalTitle" + i).val() == "" || $("#evalVal" + i).val() == ""
                || $("#gradeS_s" + i).val() == "" || $("#gradeS_e" + i).val() == "" || $("#gradeA_s" + i).val() == "" || $("#gradeA_e" + i).val() == ""
                || $("#gradeB_s" + i).val() == "" || $("#gradeB_e" + i).val() == "" || $("#gradeC_s" + i).val() == "" || $("#gradeC_e" + i).val() == ""
                || $("#gradeD_s" + i).val() == "" || $("#gradeD_e" + i).val() == "" ){
                alert("입력되지 않은 항목이 있습니다. 확인해주세요.");
                return;
            }

            evalBodyArr.push({
                idx : $("#idx" + i).val(),
                evalCap : $("#evalCap" + i).val(),
                evalTitle : $("#evalTitle" + i).val(),
                evalVal : $("#evalVal" + i).val(),
                gradeS_s : $("#gradeS_s" + i).val(),
                gradeS_e : $("#gradeS_e" + i).val(),
                gradeA_s : $("#gradeA_s" + i).val(),
                gradeA_e : $("#gradeA_e" + i).val(),
                gradeB_s : $("#gradeB_s" + i).val(),
                gradeB_e : $("#gradeB_e" + i).val(),
                gradeC_s : $("#gradeC_s" + i).val(),
                gradeC_e : $("#gradeC_e" + i).val(),
                gradeD_s : $("#gradeD_s" + i).val(),
                gradeD_e : $("#gradeD_e" + i).val()
            });
        }

        /*parameters.evalBodyArr = JSON.stringify(evalBodyArr);*/
        formData.append("evalBodyArr", JSON.stringify(evalBodyArr));

        $.ajax({
            url : "/evaluation/setEvaluationMngList",
            data : formData,
            type : "post",
            dataType : "json",
            contentType: false,
            processData: false,
            enctype : 'multipart/form-data',
            async : false,
            dataType : "json",
            success : function (rs){
                console.log(rs);
                alert("저장 되었습니다.");
                window.close();
            }
        });





    }
</script>
</body>
</html>