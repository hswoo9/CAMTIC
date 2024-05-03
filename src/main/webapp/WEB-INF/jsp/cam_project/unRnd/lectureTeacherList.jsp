<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />

<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/unRnd/lecturePopup.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/unRnd/lectureTeacherList.js?v=${today}'/>"></script>
<style>

</style>
<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">전문가 관리</h4>
            <div class="title-road">캠프로젝트 > 단위사업 &gt; 전문가관리</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div>
                <table class="searchTable table table-bordered mb-0">
                    <colgroup>
                        <col width="10%">
                        <col width="25%">
                        <col width="10%">
                        <col width="10%">
                        <col width="25%">
                        <col width="10%">
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">이름</th>
                        <td colspan="2">
                            <input type="text" id="sEmpName" onkeypress="if(event.keyCode==13){ gridReload(); }" style="width: 200px;">
                        </td>
                        <th class="text-center th-color">전문가구분</th>
                        <td colspan="2">
                            <input type="text" id="teacherType" style="width: 200px;">
                        </td>
                    </tr>
                </table>

                <div id="lectureTeacherGrid" style="margin:20px 0;"></div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script>
    lectureTeacherList.fn_defaultScript();
</script>
