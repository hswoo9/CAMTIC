<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_crm/crmHist.js?v=${today}'/>"></script>


<input type="hidden" id="myDeptSeq" name="myDeptSeq" value="${loginVO.orgnztId}">
<input type="hidden" id="regEmpSeq" name="regEmpSeq" value="${loginVO.uniqId}">

<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">이력관리</h4>
            <div class="title-road">캠CRM > CRM관리 &gt; 이력관리</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div>
                <table class="searchTable table table-bordered mb-0">
                    <colgroup>
                        <col width="5%">
                        <col width="10%">
                        <col width="5%">
                        <col width="10%">
                        <col width="10%">
                        <col width="15%">
                        <col width="10%">
                        <col width="15%">
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">부서</th>
                        <td>
                            <input type="text" id="dept" style="width: 150px;">
                        </td>
                        <th class="text-center th-color">팀</th>
                        <td>
                            <input type="text" id="team" style="width: 180px;">
                        </td>
                        <th class="text-center th-color">상담일시</th>
                        <td>
                            <input type="text" id="strDate" style="width: 110px;">
                            ~
                            <input type="text" id="endDate" style="width: 110px;">
                        </td>
                        <th class="text-center th-color">업체명</th>
                        <td>
                            <input type="text" id="crmNm" style="width: 90%;"/>
                        </td>
                    </tr>
                </table>


                <div id="mainGrid" style="margin:20px 0;"></div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script>

    crmHist.fn_defaultScript();

</script>
