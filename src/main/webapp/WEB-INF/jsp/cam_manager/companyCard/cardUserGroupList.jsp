<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/camMng.js?v=${today}'/>"></script>

<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/companyCard/cardUserGroupList.js?v=${today}'/>"></script>
<style>
    .k-footer-template td:nth-child(1),
    .k-footer-template td:nth-child(2),
    .k-footer-template td:nth-child(3),
    .k-footer-template td:nth-child(4),
    .k-footer-template td:nth-child(5),
    .k-footer-template td:nth-child(6){
        border-width: 0;
    }
</style>
<input type="hidden" id="myDeptSeq" name="myDeptSeq" value="${loginVO.orgnztId}">
<input type="hidden" id="myEmpSeq" name="myEmpSeq" value="${loginVO.uniqId}">
<input type="hidden" id="groupId" name="groupId" value="">
<div class="mainCard">
	<div class="panel">
		<div class="panel-heading">
		</div>
		<div style="padding-left : 20px; padding-right: 20px;">
			<h4 class="panel-title">카드사용자 그룹관리</h4>
			<div class="title-road">캠매니저 > 법인카드 관리 &gt; 카드사용자 그룹관리</div>
			<div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
		</div>
		<div class="panel-body">
			<div>
				<div id="mainGrid" style="margin:20px 0;"></div>

				<div id="mainUserGrid" style="margin:20px 0;"></div>
			</div>
		</div>
	</div>
</div><!-- col-md-9 -->

<script>


    cardUserGroupList.fn_defaultScript();

    $("#dialog").kendoWindow({
        title: "반납",
        visible : false,
        resizable: false,
        modal: true,
        width: 300,
        actions: ["Close"],
    });

    customKendo.fn_datePicker("cardFromDe", "depth", "yyyy-MM-dd", new Date());
</script>
