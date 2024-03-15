<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">

<style>
    .searchTable > thead > tr > th, .searchTable > tfoot > tr > th {
        background-color: #00397f96;
        color: white;
        text-align: center;
    }
</style>

<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<body class="font-opensans" style="background-color:#fff;">
<div class="col-lg-12 pop_sign_wrap" style="width:1000px;padding: 0px">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">
                인사평가 등록
            </h3>

            <div id="btnDiv" class="btn-st popButton" style="font-size: 12px;">
                <button type="button" class="k-button k-button-solid-info" id="saveBtn" onclick="fn_save()">등록</button>
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
                        <input type="text" id="bsYear" class="bsYear" style="text-align: right; width: 30%" /> 년
                    </td>
                    <th>평가대상</th>
                    <td>
                        <span id="evaluationMemberCnt" name="evaluationMemberCnt">0</span> 명
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
    </div>
</div><!-- col-md-9 -->

<script>
    var empSeqArr = [];
    $(function (){

        customKendo.fn_textBox(["bsYear", "evalList"]);

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



    });

    function fn_save(){

        var parameters = {
            bsYear : $("#bsYear").val(),
            evalStat : $("#evalStat").data("kendoRadioGroup").value(),
            empSeqArr : empSeqArr,
            regEmpSeq : $("#empSeq").val()
        }

        if(parameters.bsYear == ""){
            alert("년도를 입력해주세요.");
            return;
        }

        if(isNaN(parameters.bsYear)){
            alert("년도에 숫자를 입력해주세요.");
            $("#bsYear").val("");
            return;
        }

        if(parameters.empSeqArr.length == 0){
            alert("평가대상를 선택해주세요.");
            return;
        }

        $.ajax({
            url : "/evaluation/setEvaluation",
            data : parameters,
            dataType : "json",
            success : function (rs){
                console.log(rs);
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

        window.open("/evaluation/pop/requestEvaluationUsers.do?bsYear=" + $("#bsYear").val(),"조직도","width=1365, height=610, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no");
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
</script>
</body>
