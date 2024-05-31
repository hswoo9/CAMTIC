<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<script type="text/javascript" src="<c:url value='/js/ckEditor/ckeditor.js'/>"></script>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">

<style>
    .searchTable > thead > tr > th, .searchTable > tfoot > tr > th {
        background-color: #00397f96;
        color: white;
        text-align: center;
    }

    .txt_area_01 {display: inline-block; width: 100%; height: 170px; border: 1px solid #c9c9c9; }
</style>

<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="evalSn" value="${params.pk}"/>
<body class="font-opensans" style="background-color:#fff;">
<div class="pop_sign_wrap">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">
                인사평가 등록
            </h3>

            <div id="btnDiv" class="btn-st popButton" style="font-size: 12px;">
                <button type="button" class="k-button k-button-solid-info" id="saveBtn" style="display: none;" onclick="fn_save_chk()">등록</button>
                <button type="button" class="k-button k-button-solid-info" id="updBtn" style="display: none;" onclick="fn_save_chk()">수정</button>
                <button type="button" class="k-button k-button-solid-error" onclick="fn_del()">삭제</button>
                <button type="button" class="k-button k-button-solid-error" onclick="window.close()">닫기</button>
            </div>
        </div>

        <div class="panel-body">
            <table class="searchTable table table-bordered mb-0">
                <colgroup>
                    <col style="width: 10%">
                    <col style="width: 40%">
                    <col style="width: 10%">
                    <col style="width: 40%">
                </colgroup>
                <tr>
                    <th>년도</th>
                    <td>
                        <input type="text" id="bsYear" class="bsYear" style="text-align: right; width: 30%" />
                        <input type="text" id="evalNum" class="evalNum" style="text-align: right; width: 30%" />
                    </td>
                    <th>평가대상</th>
                    <td>
                        <span id="evaluationMemberCnt" name="evaluationMemberCnt"></span> 명
                        <button type="button" id="setEvaluationMember" class="k-button k-button-solid-info" onclick="fn_userMultiSelectPop()">평가대상 선택</button>
                    </td>
                </tr>
                <tr>
                    <th>상태</th>
                    <td colspan="3">
                        <span id="evalStat" name="evalStat"></span>
                    </td>
                </tr>
            </table>
        </div>

        <div class="panel-body" style="padding-top: unset">
            <div class="card-header">
                <h4 style="position: relative; top:7px">
                    평가별 가중치
                </h4>
            </div>
            <table class="searchTable table table-bordered mb-0">
                <colgroup>
                    <col style="width: 15%">
                    <col style="width: 35%">
                    <col style="width: 15%">
                    <col style="width: 35%">
                </colgroup>
                <tr>
                    <th>역량평가</th>
                    <td><input type="text" id="evalComPer" style="text-align: right; width: 50%"/> %</td>
                    <th>업적평가</th>
                    <td><input type="text" id="evalAhcPer" style="text-align: right; width: 50%"/> %</td>
                </tr>
            </table>
        </div>

        <div class="panel-body" style="padding-top: unset;">
            <div class="card-header" style="padding-right: 0;">
                <h4 style="position: relative; top:7px">
                    평가 등급별 수준 및 점수
                </h4>
                <div id="btnDiv5" class="btn-st popButton" style="font-size: 12px; float: right">
                    <button type="button" class="k-button k-button-solid-info" id="scAddBt" onclick="fn_scAddRow()">추가</button>
                    <button type="button" class="k-button k-button-solid-error" onclick="fn_scDelRow()">삭제</button>
                </div>
            </div>
            <table class="searchTable table table-bordered mb-0">
                <colgroup>
                    <col width="20%">
                    <col width="20%">
                    <col width="20%">
                    <col width="40%">
                </colgroup>
                <thead>
                <tr>
                    <th>등급</th>
                    <th>수준</th>
                    <th>인원 비율</th>
                    <th>점수</th>
                </tr>
                </thead>
                <tbody id="scoreList">
                    <%--<tr style="text-align: center;">
                       <td><input type="text" id="scClass0" class ="textBox" ></td>
                       <td><input type="text" id="scLevel0" class ="textBox" ></td>
                       <td><input type="text" id="scPerson0" class ="textBox" style="width: 80%;"> %</td>
                       <td><input type="text" id="scScore1_0" class ="textBox" style="width: 35%;"> 점 ~ <input type="text" id="scScore2_0" class ="textBox" style="width: 35%;"> 점
                       </td>
                    </tr>--%>
                </tbody>
            </table>
        </div>
    </div>
</div><!-- col-md-9 -->

<script>
    var empSeqArr = [];
    var chkEmpSeqArr = [];
    $(function (){

        if($("#evalSn").val() != "" && $("#evalSn").val() != null){
            $('#updBtn').css("display", "");
        }else{
            $('#saveBtn').css("display", "");
        }

        customKendo.fn_textBox(["evalComPer", "evalAhcPer"]);
        customKendo.fn_datePicker("bsYear", 'decade', "yyyy", new Date());

        $("#evalNum").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "차수 선택", value: "" },
                { text: "1차", value: "1" },
                { text: "2차", value: "2" },
                { text: "3차", value: "3" },
                { text: "4차", value: "4" },
                { text: "5차", value: "5" }
            ],
            index: 0,
            change: function(e) {
                $("#idx0").val($("#evalNum").val())
            }
        });

        $("#evalStat").kendoRadioGroup({
            items: [
                { label : "작성중", value : "W" },
                { label : "평가중", value : "I" },
                { label : "평가완료", value : "C" }
            ],
            layout : "horizontal",
            labelPosition : "after",
            value : "W"
        });


        if( $("#evalSn").val() != "") {
            const data = {
                evalSn: $("#evalSn").val()
            };
            const result = customKendo.fn_customAjax("/evaluation/getEvaluation", data);
            chkEmpSeqArr = result.empList.map(item => Object.values(item));
            const evalMap = result.data;
            const scList = result.scList;

            $("#evaluationMemberCnt").text(result.empCnt.cnt);
            $("#bsYear").data("kendoDatePicker").value(evalMap.BS_YEAR);
            $("#evalNum").data("kendoDropDownList").value(evalMap.EVAL_NUM);
            $("#evalStat").data("kendoRadioGroup").value(evalMap.EVAL_STAT);  // 작성중; 평가중; 평가완료
            $("#evalComPer").val(evalMap.EVAL_COM_PER);
            $("#evalAhcPer").val(evalMap.EVAL_ACH_PER);
            // 평가대상

            $("#idx0").val(evalMap.CAP_IDX);

            for (var i = 0; i < scList.length; i++) {
                var scItem = scList[i];
                fn_scAddRow(scItem);
            }
        }
    });

    function fn_save_chk(){
        $.ajax({
            url : "/evaluation/getEvaluationChk",
            type : "post",
            data : {
                bsYear : $("#bsYear").val(), // 년도
                evalNum : $("#evalNum").val(), // 차수
                evalSn : $("#evalSn").val()
            },
            dataType : "json",
            async : false,
            success : function(result){
                if(result.data.evalChk < 1){
                    fn_save();
                }else{
                    alert($("#bsYear").val() + "년도" + $("#evalNum").val() + "차수는 이미 등록되어있습니다.");

                }
            },
            error : function(e) {
                console.log(e);
            }
        });
    }

    function fn_save(){
        var formData = new FormData();

        formData.append("evalSn" , $("#evalSn").val());
        formData.append("bsYear" , $("#bsYear").val()); // 년도
        formData.append("evalNum" , $("#evalNum").val()); // 차수
        formData.append("evalStat" , $("#evalStat").data("kendoRadioGroup").value());  // 작성중, 평가중, 평가완료
        formData.append("evalComPer" , $("#evalComPer").val()); // 역량평가 가중치
        formData.append("evalAhcPer" , $("#evalAhcPer").val()); // 업적평가 가중치
        formData.append("empSeqArr" , empSeqArr);  // 평가대상
        formData.append("regEmpSeq", $("#empSeq").val());

        var scoreBodyArr = [];
        var scoreLen = $("#scoreList").find("tr").length;

        // 평가 등급별 수준 및 점수
        for(var i = 0 ; i < scoreLen ; i++){
            if($("#scClass" + i).val() == "" || $("#scLevel" + i).val() == "" || $("#scPerson" + i).val() == "" || $("#scScore1_" + i).val() == "" || $("#scScore2_" + i).val() == ""){
                alert("입력되지 않은 항목이 있습니다. 확인해주세요.");
                return;
            }

            scoreBodyArr.push({
                scClass : $("#scClass" + i).val(),
                scLevel : $("#scLevel" + i).val(),
                scPerson : $("#scPerson" + i).val(),
                scScore1 : $("#scScore1_" + i).val(),
                scScore2 : $("#scScore2_" + i).val()
            });
        }

        formData.append("scoreBodyArr", JSON.stringify(scoreBodyArr));

        $.ajax({
            url : "/evaluation/setUpdReqEvaluation",
            data : formData,
            type : "post",
            dataType : "json",
            contentType: false,
            processData: false,
            enctype : 'multipart/form-data',
            async : false,
            dataType : "json",
            success : function (rs){
                if($("#evalSn").val() != "" && $("#evalSn").val() != null){
                    alert("수정이 완료 되었습니다.");
                    window.close();
                }else{
                    alert("등록이 완료 되었습니다.");
                    window.close();
                }
            }
        });
    }

    function fn_del(){
        if(!confirm("삭제 시 해당차수 인사평가가 삭제됩니다. 삭제하시겠습니까?")){
            return;
        }
        $.ajax({
            url : "/evaluation/delEvaluation",
            type : "post",
            data : {
                evalSn : $("#evalSn").val()
            },
            dataType : "json",
            async : false,
            success : function(result){
                alert("삭제되었습니다.");
                window.opener.parent.location.reload();
                window.close();
            },
            error : function(e) {
                console.log(e);
            }
        });
    }

    function fn_userMultiSelectPop(){

        if($("#bsYear").val() == ""){
            alert("년도를 입력해주세요.");
            return;
        }

        if(isNaN($("#bsYear").val())){
            alert("년도에 숫자를 입력해주세요.");
            $("#bsYear").val("");
            return;
        }

        if($("#bsNum").val() == ""){
            alert("차수를 선택해주세요.");
            return;
        }

        window.open("/evaluation/pop/requestEvaluationUsers.do?pk="+ $("#evalSn").val() +"&bsYear=" + $("#bsYear").val(),"조직도","width=1500, height=610, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no");
        newWindow.empSeqArr = empSeqArr;
        newWindow.chkEmpSeqArr = chkEmpSeqArr;
    }

    function fn_userMultiSelectPopCallBack(e){
        var seqArr = [];
        empSeqArr = e;
        e = e.split(",");

        for(var i = 0; i < e.length; i++){
            seqArr.push(e[i]);
        }

        $("#evaluationMemberCnt").text(seqArr.length - 1);
    }


    function fn_scAddRow(scItem){
        var scNum = $("#scoreList").find("tr").length;
        var html = "";

        if(scItem != null){
            html += '<tr style="text-align: center;">';
            html += '   <td>';
            html += '       <input type="text" id="scClass'+scNum+'" class ="textBox" value="'+ scItem.EVAL_GRADE +'">';
            html += '   </td>';
            html += '   <td>';
            html += '       <input type="text" id="scLevel'+scNum+'" class ="textBox" value="'+ scItem.EVAL_LEVEL +'">';
            html += '   </td>';
            html += '   <td>';
            html += '       <input type="text" id="scPerson'+scNum+'" class ="textBox" value="'+ scItem.EVAL_RATE +'" style="width: 80%"> %';
            html += '   </td>';
            html += '   <td>';
            html += '       <input type="text" id="scScore1_'+scNum+'" class ="textBox" value="'+ scItem.EVAL_SCORE_A +'" style="width: 35%;"> 점 ~ ';
            html += '       <input type="text" id="scScore2_'+scNum+'" class ="textBox" value="'+ scItem.EVAL_SCORE_B +'" style="width: 35%;"> 점';
            html += '   </td>';
            html += '</tr>';
        }else{
            html += '<tr style="text-align: center;">';
            html += '   <td>';
            html += '       <input type="text" id="scClass'+scNum+'" class ="textBox" >';
            html += '   </td>';
            html += '   <td>';
            html += '       <input type="text" id="scLevel'+scNum+'" class ="textBox" >';
            html += '   </td>';
            html += '   <td>';
            html += '       <input type="text" id="scPerson'+scNum+'" class ="textBox" style="width: 80%"> %';
            html += '   </td>';
            html += '   <td>';
            html += '       <input type="text" id="scScore1_'+scNum+'" class ="textBox" style="width: 35%;"> 점 ~ ';
            html += '       <input type="text" id="scScore2_'+scNum+'" class ="textBox" style="width: 35%;"> 점';
            html += '   </td>';
            html += '</tr>';
        }
        $('#scoreList').append(html);
        customKendo.fn_textBox(["scClass" + scNum, "scLevel" + scNum, "scPerson" + scNum, "scScore1_" + scNum, "scScore2_" + scNum]);
    }

    function fn_scDelRow(){
        if($("#scoreList").find("tr").length > 1){
            $("#scoreList").find("tr:last").remove();
        }
    }
</script>
</body>