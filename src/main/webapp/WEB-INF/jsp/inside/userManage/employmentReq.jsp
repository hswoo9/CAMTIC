<%--
  Created by IntelliJ IDEA.
  User: user
  Date: 2023-03-13
  Time: 오후 2:10
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common.jsp" flush="false"/>
<script type="text/javascript" src="${hwpUrl}js/hwpctrlapp/utils/util.js"></script>
<script type="text/javascript" src="${hwpUrl}js/webhwpctrl.js"></script>
<script type="text/javascript" src="<c:url value='/js/hancom/hwpCtrlApp.js?v=5'/>"></script>
<script type="text/javascript" src="/js/intra/inside/userManage/employmentReq.js?v=${toDate}"/></script>
<style>
    .k-grid-toolbar {
        justify-content: flex-end !important;
    }

    .k-editor-toolbar {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
    }
</style>

<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="deptSeq" value="${loginVO.orgnztId}"/>
<input type="hidden" id="deptName" value="${loginVO.orgnztNm}"/>

<div class="col-md-10 col-lg-10 dash-left">
    <div class="panel">
        <div class="panel-heading">
            <h4 class="panel-title">근로계약서</h4>
            <div class="title-road">인사관리 > 임용문서관리 > 근로계약서</div>
        </div>

        <div class="panel-body">
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>

            <div>
                <textarea id="editor" style="height: 920px;">
                </textarea>
            </div>
            <div style="float:right; margin-top: 10px;">
                <button type="button" id="drawSign" class="k-button k-button-solid-base k-button-md" onClick="employmentReq.drawSignPop();">
                    <span class="k-icon k-i-file-pdf"></span> PDF 다운로드
                </button>
            </div>
        </div>

    </div>

    <div class="panel">
        <div class="panel-heading">
            <h4 class="panel-title">근로계약서</h4>
        </div>

        <div class="panel-body">
            <div id="secondView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>

            <div id="mainGrid"></div>
        </div>

    </div>
</div><!-- col-md-9 -->

<jsp:include page="/WEB-INF/jsp/template/footer.jsp" flush="false"/>
<script type="text/javascript">
    employmentReq.init();
</script>