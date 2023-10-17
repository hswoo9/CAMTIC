<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">

<script type="text/javascript" src="/js/intra/inside/userManage/contentPop.js?v=${today}"/></script>
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
            <h3 class="card-title title_NM">직원 면담 카드 설정</h3>
            <div class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-info" onclick="saveData()">저장</button>
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
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>면담내용1
                    </th>
                    <td colspan="3">
                        <input type="text" id="content1" style="width: 100%;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>면담내용2
                    </th>
                    <td colspan="3">
                        <input type="text" id="content2" style="width: 100%;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>면담내용3
                    </th>
                    <td colspan="3">
                        <input type="text" id="content3" style="width: 100%;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>면담내용4
                    </th>
                    <td colspan="3">
                        <input type="text" id="content4" style="width: 100%;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>면담내용5
                    </th>
                    <td colspan="3">
                        <input type="text" id="content5" style="width: 100%;">
                    </td>
                </tr>
                </thead>
            </table>
        </div>
    </div>
</div>


<script>

    function saveData() {
        $.ajax({
            type: "POST",
            url: "/Inside/setInterviewTitle.do",  // 실제 데이터 저장 처리를 담당하는 컨트롤러 메서드의 URL
            data: {
                content1: $("#content1").val(),
                content2: $("#content2").val(),
                content3: $("#content3").val(),
                content4: $("#content4").val(),
                content5: $("#content5").val()
                // ... 나머지 필드들도 동일한 방식으로 추가 ...
            },
            success: function(response) {
                alert("Data saved successfully!");
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert("Error occurred while saving data:", textStatus);
            }
        });
    }

    function retrieveData2() {
        $.ajax({
            type: "GET",
            url: "/Inside/getTopicList.do",
            success: function(response) {
                console.log(response);

                if (response.list && response.list.length > 0) {
                    $("#content1").val(response.list[0].interview_topic1);
                    $("#content2").val(response.list[0].interview_topic2);
                    $("#content3").val(response.list[0].interview_topic3);
                    $("#content4").val(response.list[0].interview_topic4);
                    $("#content5").val(response.list[0].interview_topic5);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert("Error occurred while retrieving data:", textStatus);
            }
        });
    }
    $(document).ready(function() {
        retrieveData2();
    });


    contentPop.init();
</script>
</body>
</html>