<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

<body class="font-opensans" style="background-color:#fff;">
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/unRnd/lecture.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/unRnd/lecturePopup.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/unRnd/lectureTeacher.js?v=${today}'/>"></script>

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
<input type="hidden" id="mode" value="${params.mode}"/>
<input type="hidden" id="type" name="type" />

<div style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">
                <span style="position: relative; top: 3px;">
                    강사 관리
                </span>
            </h3>
            <div id="purcBtnDiv" class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-info" onclick="save()">저장</button>
                <button type="button" class="k-button k-button-solid-error" onclick="wClose()">닫기</button>
            </div>
        </div>

        <div class="col-md-12 col-sm-12" style="padding: 20px 30px;">
            <table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col width="20%">
                    <col width="80%">
                </colgroup>
                <thead>
                <tr>
                    <th scope="row" class="text-center th-color">강좌명</th>
                    <td id="lecTitleBs"></td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color"><span class="red-star">*</span>강사설정</th>
                    <td style="display: flex">
                        <div style="width: 47%">
                            <b>전체강사</b>
                            <div id="teacherGridA"></div>
                        </div>
                        <div id="btnDiv" style="width: 6%"></div>
                        <div style="width: 47%">
                            <b>선택된 강사</b>
                            <div id="teacherGridS"></div>
                        </div>
                    </td>
                </tr>
                </thead>
            </table>
        </div>
    </div>
</div>
<script type="text/javascript">
    lectureTeacher.fn_defaultScript();
    function wClose(){
        opener.location.reload();
        window.close();
    }
    function save(){
        var teachTimeInput = document.querySelectorAll('[id^="teachTime"]');
        var eduTime = 0;

        teachTimeInput.forEach(function(element) {
            var value = parseInt(element.value);
            if (!isNaN(value)) {
                eduTime += value;
            }
        });

        if(!confirm("저장하시겠습니까?")){
            return;
        }
        var data = {
            eduTime : eduTime,
            pk : $("#pk").val()
        }
        $.ajax({
            url : "/projectUnRnd/updLectureTime",
            data :data,
            type : "post",
            dataType : "json",
            success : function(rs){
                if(rs.code == 200){
                    alert("저장되었습니다.")
                    opener.location.reload();
                    window.close();
                }
            }
        })
    }
</script>
</body>
</html>