<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/campus/openStudyResultPop.js?v=${toDate}"/></script>
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
<input type="hidden" id="pk" value="${params.pk}"/>
<body class="font-opensans" style="background-color:#fff;">
<div class="col-lg-12" style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">오픈스터디 결과보고</h3>
            <div class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-error" onclick="openStudyRes.delOpenStudyUser()">직원삭제</button>
                <button type="button" class="k-button k-button-solid-info" onclick="openUserMultiSelectPop()">직원추가</button>
                <button type="button" class="k-button k-button-solid-info" onclick="openStudyRes.saveBtn();">저장</button>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close();">닫기</button>
            </div>
        </div>
        <form id="table-responsive" style="padding: 20px 30px;">
            <table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col width="20%">
                    <col width="80%">
                </colgroup>
                <thead>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>모임명
                    </th>
                    <td id="openStudyNameTd">
                        <input type="text" id="openStudyName" />
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>일시
                    </th>
                    <td id="openStudyDtTd">
                        <input id="openStudyDt" type="text" style="width: 150px;"> <input type="text" id="startTime" style="width: 100px"> ~ <input type="text" id="endTime" style="width: 100px">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>소요비용(내역)
                    </th>
                    <td>
                        <input type="text" id="openStudyAmt" oninput="onlyNumber(this)" onkeyup="fn_inputNumberFormat(this)" style="width: 100px; text-align: right;" value="${data.OPEN_STUDY_AMT}">원( <input type="text" id="openStudyAmtText" style="width: 500px;" value="${data.OPEN_STUDY_AMT_TEXT}"> )
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>학습결과
                    </th>
                    <td>
                        <input type="text" id="openStudyResult" style="width: 600px;" value="${data.OPEN_STUDY_RESULT}">
                    </td>
                </tr>
                </thead>
            </table>
        </form>
        <div id="openStudyUserDiv" class="card-header" style="padding-top:45px; display: none">
            <div class="col-lg-11" style="margin:0 auto;">
                <div class="table-responsive">
                    <div class="popupTitleSt">참여관리(아래 신청자 중 참여한 직원을 체크해주세요.)</div>
                    <form id="studyReqForm">
                        <table class="table table-bordered mt20" id="openStudyUserTable" style="width: 973px;">
                        </table>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
    openStudyRes.init();

    function userDataSet(arr) {
        closeUserMultiSelectPop();

        var arrLength = arr.length;

        for (var i = 0; i < arrLength; i++) {
            var data = {
                regEmpSeq: arr[i].empSeq,
                regEmpName: arr[i].empName,
                regDeptName: arr[i].deptName,
                regTeamSeq: arr[i].deptSeq,
                regPositionName: arr[i].positionName,
                regDutyName: arr[i].dutyName,
                pk: $("#pk").val()
            };


            $.ajax({
                url: "/campus/setOpenStudyUser",
                data: data,
                type: "post",
                dataType: "json",
                async: false,
                success: function(rs) {
                    if (i == arrLength - 1) {
                        alert("참여신청이 완료되었습니다.");

                        openStudyRes.openStudyUserSetting();
                        // location.reload();
                    }
                },
                error: function (e) {
                    console.log('error : ', e);
                }
            });
        }
    }

    function openUserMultiSelectPop() {
        childWindow =  window.open("/user/pop/userMultiSelectPop.do?type=openStudy","조직도","width=1365, height=610, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no");
    }

    function closeUserMultiSelectPop() {
        if (childWindow && !childWindow.closed) {

        }
    }
</script>
</body>
</html>