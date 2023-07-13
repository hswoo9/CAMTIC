<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/history/historyView.js?v=${today}"></script>
<body class="font-opensans" style="background-color:#fff;">
<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="empName" value="${loginVO.name}"/>
<input type="hidden" id="deptName" value="${loginVO.orgnztNm}"/>
<input type="hidden" id="dutyName" value="${loginVO.dutyNm}"/>
<div class="col-lg-12" style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">세부 발령 사항</h3>
            <div class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close();">닫기</button>
            </div>
        </div>
        <div style="padding: 20px 30px;">
            <table class="popTable table table-bordered mb-0" id="historyViewTb">
                <colgroup>
                    <col width="20%">
                    <col width="30%">
                    <col width="20%">
                    <col width="30%">
                </colgroup>
                <thead>
                    <tr>
                        <th>호수</th>
                        <td>
                            ${data.NUMBER_NAME}
                        </td>
                        <th>발령 일자</th>
                        <td>
                            ${data.HISTORY_DT}
                        </td>
                    </tr>
                    <tr>
                        <th>사번</th>
                        <td>
                            ${data.ERP_EMP_SEQ}
                        </td>
                        <th>성명</th>
                        <td>
                            ${data.EMP_NAME}
                        </td>
                    </tr>
                </thead>
            </table>

            <table class="popTable table table-bordered mt20">
                <colgroup>
                    <col width="30%">
                    <col width="33%">
                    <col width="37%">
                </colgroup>
                <thead>
                <tr>
                    <th>구분</th>
                    <th>발령 전</th>
                    <th>발령 후</th>
                </tr>
                <tr>
                    <th>부서</th>
                    <td style="text-align: center">${data.BF_DEPT_NAME eq '' ? '-' : data.BF_DEPT_NAME}</td>
                    <td style="text-align: center; background-color: #ff8f4f; color: white;"><b>${data.AF_DEPT_NAME eq '' ? '-' : data.AF_DEPT_NAME}</b></td>
                </tr>
                <tr>
                    <th>팀</th>
                    <td style="text-align: center">${data.BF_TEAM_NAME eq '' ? '-' : data.BF_TEAM_NAME}</td>
                    <td style="text-align: center; background-color: #ff8f4f; color: white;"><b>${data.AF_TEAM_NAME eq '' ? '-' : data.AF_TEAM_NAME}</b></td>
                </tr>
                <tr>
                    <th>직급/등급</th>
                    <td style="text-align: center">${data.BF_POSITION_NAME eq '' ? '-' : data.BF_POSITION_NAME}</td>
                    <td style="text-align: center; background-color: #ff8f4f; color: white;"><b>${data.AF_POSITION_NAME eq '' ? '-' : data.AF_POSITION_NAME}</b></td>
                </tr>
                <tr>
                    <th>직책</th>
                    <td style="text-align: center">${data.BF_DUTY_NAME eq '' ? '-' : data.BF_DUTY_NAME}</td>
                    <td style="text-align: center; background-color: #ff8f4f; color: white;"><b>${data.AF_DUTY_NAME eq '' ? '-' : data.AF_DUTY_NAME}</b></td>
                </tr>
                <tr>
                    <th>직무</th>
                    <td style="text-align: center">${data.BF_JOB_DETAIL eq '' ? '-' : data.BF_JOB_DETAIL}</td>
                    <td style="text-align: center; background-color: #ff8f4f; color: white;"><b>${data.AF_JOB_DETAIL eq '' ? '-' : data.AF_JOB_DETAIL}</b></td>
                </tr>
                <tr>
                    <th>비고</th>
                    <td colspan="2" style="text-align: center">${data.ETC}</td>
                </tr>
                </thead>
            </table>
        </div>
    </div>
</div>
<script>
    historyViewPop.init();
</script>
</body>
