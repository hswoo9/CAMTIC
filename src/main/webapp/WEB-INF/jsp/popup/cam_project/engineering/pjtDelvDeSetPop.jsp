<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

<body class="font-opensans" style="background-color:#fff;">
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/engn/pjtDelvDeSetPop.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/commonProject.js?v=${today}'/>"></script>

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
<input type="hidden" id="pjtSn" value="${params.pjtSn}"/>

<div style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">
                <span style="position: relative; top: 3px;">
                    <span id="titleStat">납품일자 변경</span>
                </span>
            </h3>
            <div id="payAppBtnDiv" class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-info" id="saveBtn" onclick="pjtDelvDeSet.fn_save();">저장</button>
                <button type="button" class="k-button k-button-solid-error" onclick="window.close()">닫기</button>
            </div>
        </div>

        <div style="padding: 20px 30px;">
            <table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col width="30%">
                    <col width="70%">
                </colgroup>
                <thead>
                <tr>
                    <th scope="row" class="text-center th-color">변동 납기일</th>
                    <th scope="row" class="text-center th-color">사유</th>
                </tr>
                <tr>
                    <td scope="row" class="text-center th-color">
                        <input id="delvDe" style="width:95%"/>
                    </td>
                    <td scope="row" class="text-center th-color">
                        <textarea id="setIss" style="width:100%; height: 100px;"></textarea>
                    </td>
                </tr>
                </thead>
            </table>
            <div id="mainGrid"></div>
        </div>
    </div>
</div>
<script type="text/javascript">
    pjtDelvDeSet.fn_defaultScript();

    function inputNumberFormatN (obj){
        obj.value = comma(uncommaN(obj.value));
    }

    function uncommaN(str) {
        str = String(str);
        return str.replace(/[^\d-]|(?<=\d)-/g, '');
    }

    function commaN(str) {
        str = String(str);
        return str.replace(/^(-?\d+)(\d{3})+/g, function(_, sign, rest) {
            return sign + rest.replace(/\d{3}/g, ',$&');
        });
    }
</script>
</body>
</html>