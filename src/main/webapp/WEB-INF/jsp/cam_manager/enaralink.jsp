<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/camMng.js?v=${today}'/>"></script>

<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/enaralink.js?v=${today}'/>"></script>

<style>
    .k-grid-content td {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
</style>
<input type="hidden" id="myDeptSeq" name="myDeptSeq" value="${loginVO.orgnztId}">
<input type="hidden" id="myEmpSeq" name="myEmpSeq" value="${loginVO.uniqId}">

<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">지출결의서 집행 연동</h4>
            <div class="title-road">캠매니저 > e-나라도움 > 지출결의서 집행 연동</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div>
                <table class="searchTable table table-bordered mb-0">
                    <colgroup>
                        <col width="7%">
                        <col width="20%">
                        <col width="7%">
                        <col width="8%">
                        <col width="7%">
                        <col width="8%">
                        <col width="7%">
                        <col width="19%">
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">발의 기간</th>
                        <td>
                            <input type="text" id="fromMonth" style="width: 45%;"> ~ <input type="text" id="endMonth" style="width: 45%;">
                        </td>
                        <th class="text-center th-color">발의부서</th>
                        <td>
                            <input type="text" id="deptComp" style="width: 150px;" disabled >
                        </td>
                        <th class="text-center th-color">발의자</th>
                        <td>
                            <input type="text" id="searchValue" style="width: 90%;" value="${loginVO.name}" disabled >
                        </td>
                        <th class="text-center th-color">전송상태</th>
                        <td>
                            <input type="text" id="status" style="width: 150px;">
                        </td>
                    </tr>
                </table>

                <div id="sendResolutionGrid" style="margin:20px 0;"></div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<jsp:include page="/WEB-INF/jsp/cam_manager/enaraSendListForm.jsp" flush="false"/>
<script>
    enaralink.fn_defaultScript();
</script>
