<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">

<script type="text/javascript" src="/js/intra/inside/userManage/contentDetailPop.js?v=${today}"/></script>
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
<input type="hidden" id="cardNumber" value=""/>
<div style="padding:0;">
    <div class="table-responsive">
            <div class="card-header pop-header">
                <h3 class="card-title title_NM">직원 면담 카드 </h3>
                <div class="btn-st popButton">
                    <button type="button" id="adminBtn" class="k-button k-button-solid-info" style="display: none" onclick="saveData3()">차상급자 COMMENT 저장</button>
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
                        <td id="card_interview_date" colspan="3"></td>

                    </tr>

                    <tr>

                        <th scope="row" class="text-center th-color">
                            <span class="red-star"></span>부서
                        </th>
                        <td id="dept_name" colspan="3"></td>

                    </tr>

                    <tr>

                        <th scope="row" class="text-center th-color">
                            <span class="red-star"></span>피면담자
                        </th>
                        <td id="emp_name_kr" colspan="3"></td>

                    </tr>

                    <tr>

                        <th scope="row" class="text-center th-color">
                            <span class="red-star"></span>면담자
                        </th>
                        <td id="card_interviewer" colspan="3"></td>

                    </tr>

                   <%-- <tr>

                        <th scope="row" class="text-center th-color">
                            <span class="red-star"></span>차상급자
                        </th>
                        <td id="card_superior_person" colspan="3"></td>

                    </tr>--%>

                    <%--<tr>

                        <th scope="row" class="text-center th-color">
                            <span class="red-star"></span>차차상급자
                        </th>
                        <td id="card_superior_person2" colspan="3"></td>

                    </tr>--%>

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
                        <th id="interview_topic1" colspan="4" style="font-size: 14px; font-weight:600;background-color: #00397f96; color: #fff;"></th>
                    </tr>
                    <tr>
                        <td id="interview_content1" colspan="4">
                            <span class="k-input k-textarea k-input-solid k-input-md k-rounded-md" style="width: 95%; height: 100px;"></span>
                        </td>
                    </tr>
                    <tr>
                        <th id="interview_topic2" colspan="4" style="font-size: 14px; font-weight:600;background-color: #00397f96; color: #fff;"></th>
                    </tr>
                    <tr>
                        <td id="interview_content2" colspan="4">
                            <span class="k-input k-textarea k-input-solid k-input-md k-rounded-md" style="width: 95%; height: 100px;"></span>
                        </td>
                    </tr>
                    <tr>
                        <th id="interview_topic3" colspan="4" style="font-size: 14px; font-weight:600;background-color: #00397f96; color: #fff;"></th>
                    </tr>
                    <tr>
                        <td id="interview_content3" colspan="4">
                            <span class="k-input k-textarea k-input-solid k-input-md k-rounded-md" style="width: 95%; height: 100px;"></span>
                        </td>
                    </tr>
                    <tr>
                        <th id="interview_topic4" colspan="4" style="font-size: 14px; font-weight:600;background-color: #00397f96; color: #fff;"></th>
                    </tr>
                    <tr>
                        <td id="interview_content4" colspan="4">
                            <span class="k-input k-textarea k-input-solid k-input-md k-rounded-md" style="width: 95%; height: 100px;"></span>
                        </td>
                    </tr>
                    <tr>
                        <th id="interview_topic5" colspan="4" style="font-size: 14px; font-weight:600;background-color: #00397f96; color: #fff;"></th>
                    </tr>
                    <tr>
                        <td id="interview_content5" colspan="4">
                            <span class="k-input k-textarea k-input-solid k-input-md k-rounded-md" style="width: 95%; height: 100px;"></span>
                        </td>
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
                    <tr class="trAdmin">
                        <th id="interview_admin" colspan="4" style="font-size: 14px; font-weight:600;background-color: #00397f96; color: #fff;">차상급자 COMMENT</th>
                    </tr>
                    <tr class="trAdmin">
                        <td colspan="4" id="interview_content_admin">
                            <span class="k-input k-textarea k-input-solid k-input-md k-rounded-md" style="width: 95%; height: 100px;"><textarea type="text" id="interviewContentAdmin" style="width: 100%; height: 100px; resize: none;" data-role="textarea" aria-disabled="false" rows="5" class="!k-overflow-y-auto k-input-inner" autocomplete="off"></textarea></span>
                        </td>
                    </tr>
                    </thead>
                </table>
            </div>
        </div>
</div>


<script>

    function retrieveData() {
        $.ajax({
            type: "GET",
            url: "/Inside/getTopicList.do", // 실제 데이터 조회 처리를 담당하는 컨트롤러 메서드의 URL
            success: function(response) {
                // 응답 데이터 처리 로직
                console.log(response); // 예시로 응답 데이터를 콘솔에 출력

                if (response.list && response.list.length > 0) {
                    $("#interview_topic1").text(response.list[0].interview_topic1);
                    $("#interview_topic2").text(response.list[0].interview_topic2);
                    $("#interview_topic3").text(response.list[0].interview_topic3);
                    $("#interview_topic4").text(response.list[0].interview_topic4);
                    $("#interview_topic5").text(response.list[0].interview_topic5);
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


    function retrieveData2(cardNumber) {
        // cardNumber를 서버로 전송
        $.ajax({
            type: "POST",
            url: "/Inside/getInterviewDetail.do",
            data: { cardNumber: cardNumber }, // cardNumber를 요청 데이터로 보내기
            success: function(response) {
                // 응답 데이터 처리 로직
                console.log(response);

                // 정보를 템플릿에 표시
                if (response.list && response.list.length > 0) {
                    $("#card_number").text(response.list[0].card_number);
                    $("#dept_name").text(response.list[0].dept_name);
                    $("#dept_team_name").text(response.list[0].dept_team_name);
                    $("#emp_name_kr").text(response.list[0].emp_name_kr);
                    $("#card_interview_date").text(response.list[0].card_interview_date);
                    $("#card_interviewer").text(response.list[0].card_interviewer);
                    $("#card_superior_person").text(response.list[0].card_superior_person);
                    $("#card_superior_person2").text(response.list[0].card_superior_person2);
                    $("#interview_content1").text(response.list[0].interview_content1);
                    $("#interview_content2").text(response.list[0].interview_content2);
                    $("#interview_content3").text(response.list[0].interview_content3);
                    $("#interview_content4").text(response.list[0].interview_content4);
                    $("#interview_content5").text(response.list[0].interview_content5);

                    if($("#regDutyCode").val() == "2" || $("#regDutyCode").val() == "3" || $("#regDutyCode").val() == "7"){
                        $("#adminBtn").show();
                        $("#interviewContentAdmin").val(response.list[0].interview_content_admin);
                    }else{
                        if(response.list[0].interview_content_admin == null || response.list[0].interview_content_admin == ""){
                            $("#interview_content_admin").text("-");
                        }else{
                            $("#interview_content_admin").text(response.list[0].interview_content_admin);
                        }
                    }

                    // 면담일시 날짜 형식 변환 예시:
                    var cardInterviewDateValue = response.list[0].card_interview_date;
                    var date = new Date(cardInterviewDateValue);
                    var formattedDate = date.getFullYear() + '-' +
                        ('0' + (date.getMonth() + 1)).slice(-2) + '-' +
                        ('0' + date.getDate()).slice(-2);

                    var formattedDate = date.getFullYear() + '-' +
                        ('0' + (date.getMonth() + 1)).slice(-2) + '-' +
                        ('0' + date.getDate()).slice(-2) + ' ' +
                        response.list[0].stime + '~' +
                        response.list[0].etime;

                    // 변환된 날짜를 화면에 표시
                    $("#card_interview_date").html(formattedDate);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error("Error occurred while retrieving data:", errorThrown);
            }
        });
    }

    // empSeq 파라미터 값을 추출하여 retrieveData2 함수 호출하기
    $(document).ready(function() {
        var urlParams = new URLSearchParams(window.location.search);
        var cardNumber = urlParams.get("cardNumber");
        $("#cardNumber").val(cardNumber);
        retrieveData2(cardNumber);
    });

    function saveData3() {
        $.ajax({
            type: "POST",
            url: "/Inside/setInterviewContent2.do",  // 실제 데이터 저장 처리를 담당하는 컨트롤러 메서드의 URL
            data: {
                cardNumber: $("#cardNumber").val(),
                interviewContentAdmin: $("#interviewContentAdmin").val()
                // ... 나머지 필드들도 동일한 방식으로 추가 ...
            },
            success: function(response) {
                alert("저장이 완료되었습니다.");
            }
        });
    }

</script>
</body>
</html>