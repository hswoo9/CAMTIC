<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">

<script type="text/javascript" src="/js/intra/inside/userManage/contentWritePop.js?v=${today}"/></script>
<body class="font-opensans" style="background-color:#fff;">
<input type="hidden" id="regEmpSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="regEmpName" value="${loginVO.name}"/>
<input type="hidden" id="regDeptSeq" value="${loginVO.deptId}"/>
<input type="hidden" id="regDeptName" value="${loginVO.deptNm}"/>
<input type="hidden" id="regTeamSeq" value="${loginVO.teamId}"/>
<input type="hidden" id="regTeamName" value="${loginVO.teamNm}"/>
<input type="hidden" id="regPositionCode" value="${loginVO.positionCode}"/>
<input type="hidden" id="regPositionName" value="${loginVO.positionNm}"/>
<input type="hidden" id="regDutyCode" value="${loginVO.dutyCode}"/>
<input type="hidden" id="regDutyName" value="${loginVO.dutyNm}"/>
<input type="hidden" id="regGradeCode" value="${loginVO.gradeCode}"/>
<input type="hidden" id="regGradeName" value="${loginVO.gradeNm}"/>
<input type="hidden" id="documentSn" value="${data.documentSn}"/>
<div style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">직원 면담 카드 작성</h3>
            <div class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-info" onclick="saveData2()">저장</button>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">닫기</button>
            </div>
        </div>
        <div style="padding: 20px 30px;">
            <table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col width="20%">
                    <col width="30%">
                    <col width="20%">
                    <col width="30%">
                </colgroup>
                <thead>
                <%--<tr>
                    <th colspan="4">문서 등록 대장</th>
                </tr>--%>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>면담일시
                    </th>
                    <td colspan="3">
                        <input type="text" id="cardDate" style="width: 25%;">
                        <input type="text" id="sTime" style="width: 25%;"> ~ <input type="text" id="eTime" style="width: 25%;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>피면담자
                    </th>
                    <td colspan="3">
                        <input type="text" id="empName" style="width: 90%;" value="">
                        <input type="hidden" id="empSeq" style="width: 50%;" value="">
                        <button type="button" id="staffSelect" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="userSearch();">
                            검색
                        </button>
                    </td>
                </tr>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>면담자
                    </th>
                    <td colspan="3">
                        <input type="text" id="cardInterviewer" style="width: 100%;" value="${loginVO.name}" disabled>
                    </td>
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
                <tr class="tr1">
                    <th id="interview_topic1" colspan="4" style="font-size: 14px; font-weight:600;background-color: #00397f96; color: #fff;"></th>
                </tr>
                <tr class="tr1">
                    <td colspan="4">
                        <span class="k-input k-textarea k-input-solid k-input-md k-rounded-md" style="width: 95%; height: 100px;"><textarea type="text" id="interviewContent1" style="width: 100%; height: 100px; resize: none;" data-role="textarea" aria-disabled="false" rows="5" class="!k-overflow-y-auto k-input-inner" autocomplete="off"></textarea></span>
                    </td>
                </tr>
                <tr class="tr2">
                    <th id="interview_topic2" colspan="4" style="font-size: 14px; font-weight:600;background-color: #00397f96; color: #fff;"></th>
                </tr>
                <tr class="tr2">
                    <td colspan="4">
                        <span class="k-input k-textarea k-input-solid k-input-md k-rounded-md" style="width: 95%; height: 100px;"><textarea type="text" id="interviewContent2" style="width: 100%; height: 100px; resize: none;" data-role="textarea" aria-disabled="false" rows="5" class="!k-overflow-y-auto k-input-inner" autocomplete="off"></textarea></span>
                    </td>
                </tr>
                <tr class="tr3">
                    <th id="interview_topic3" colspan="4" style="font-size: 14px; font-weight:600;background-color: #00397f96; color: #fff;"></th>
                </tr>
                <tr class="tr3">
                    <td colspan="4">
                        <span class="k-input k-textarea k-input-solid k-input-md k-rounded-md" style="width: 95%; height: 100px;"><textarea type="text" id="interviewContent3" style="width: 100%; height: 100px; resize: none;" data-role="textarea" aria-disabled="false" rows="5" class="!k-overflow-y-auto k-input-inner" autocomplete="off"></textarea></span>
                    </td>
                </tr>
                <tr class="tr4">
                    <th id="interview_topic4" colspan="4" style="font-size: 14px; font-weight:600;background-color: #00397f96; color: #fff;"></th>
                </tr>
                <tr class="tr4">
                    <td colspan="4">
                        <span class="k-input k-textarea k-input-solid k-input-md k-rounded-md" style="width: 95%; height: 100px;"><textarea type="text" id="interviewContent4" style="width: 100%; height: 100px; resize: none;" data-role="textarea" aria-disabled="false" rows="5" class="!k-overflow-y-auto k-input-inner" autocomplete="off"></textarea></span>
                    </td>
                </tr>
                <tr class="tr5">
                    <th id="interview_topic5" colspan="4" style="font-size: 14px; font-weight:600;background-color: #00397f96; color: #fff;"></th>
                </tr>
                <tr class="tr5">
                    <td colspan="4">
                        <span class="k-input k-textarea k-input-solid k-input-md k-rounded-md" style="width: 95%; height: 100px;"><textarea type="text" id="interviewContent5" style="width: 100%; height: 100px; resize: none;" data-role="textarea" aria-disabled="false" rows="5" class="!k-overflow-y-auto k-input-inner" autocomplete="off"></textarea></span>
                    </td>
                </tr>
                </thead>
            </table>
        </div>
    </div>
</div>


<script>
    $("#cardDate").kendoDatePicker({
        depth: "month",
        start: "month",
        culture : "ko-KR",
        format : "yyyy-MM-dd",
        value : new Date()
    });

    $("#sTime").kendoTimePicker({
        culture : "ko-KR",
        format : "HH:mm",
        interval : 10,
        value : new Date()
    });

    $("#eTime").kendoTimePicker({
        culture : "ko-KR",
        format : "HH:mm",
        interval : 10,
        value : new Date()
    });

    function retrieveData() {
        $.ajax({
            type: "GET",
            url: "/Inside/getTopicList.do", // 실제 데이터 조회 처리를 담당하는 컨트롤러 메서드의 URL
            success: function(response) {
                // 응답 데이터 처리 로직
                console.log(response); // 예시로 응답 데이터를 콘솔에 출력

                if (response.list && response.list.length > 0) {
                    if(response.list[0].interview_topic1 != ""){
                        $("#interview_topic1").text(response.list[0].interview_topic1);
                    }else{
                        $(".tr1").hide();
                    }
                    if(response.list[0].interview_topic2 != ""){
                        $("#interview_topic2").text(response.list[0].interview_topic2);
                    }else{
                        $(".tr2").hide();
                    }
                    if(response.list[0].interview_topic3 != ""){
                        $("#interview_topic3").text(response.list[0].interview_topic3);
                    }else{
                        $(".tr3").hide();
                    }
                    if(response.list[0].interview_topic4 != ""){
                        $("#interview_topic4").text(response.list[0].interview_topic4);
                    }else{
                        $(".tr4").hide();
                    }
                    if(response.list[0].interview_topic5 != ""){
                        $("#interview_topic5").text(response.list[0].interview_topic5);
                    }else{
                        $(".tr5").hide();
                    }
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert("Error occurred while retrieving data:", textStatus);
            }
        });
    }

    $(document).ready(function() {
        retrieveData();
    });

    function saveData2() {
        $.ajax({
            type: "POST",
            url: "/Inside/setInterviewContent.do",  // 실제 데이터 저장 처리를 담당하는 컨트롤러 메서드의 URL
            data: {
                cardDate: $("#cardDate").val(),
                sTime: $("#sTime").val(),
                eTime: $("#eTime").val(),
                empSeq: $("#empSeq").val(),
                cardInterviewer: $("#cardInterviewer").val(),
                interviewContent1: $("#interviewContent1").val(),
                interviewContent2: $("#interviewContent2").val(),
                interviewContent3: $("#interviewContent3").val(),
                interviewContent4: $("#interviewContent4").val(),
                interviewContent5: $("#interviewContent5").val()
                // ... 나머지 필드들도 동일한 방식으로 추가 ...
            },
            success: function(response) {
                alert("저장이 완료되었습니다.");
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert("다시 시도해주세요.", textStatus);
            }
        });
    }

    contentWritePop.init();
</script>
</body>
</html>