<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<jsp:useBean id="today" class="java.util.Date" />

<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/setManagement/rndProjectOperationStatus.js?v=${today}'/>"></script>


<input type="hidden" id="myDeptSeq" name="myDeptSeq" value="${loginVO.orgnztId}">
<input type="hidden" id="myEmpSeq" name="myEmpSeq" value="${loginVO.uniqId}">

<style>

</style>
<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">정부사업 운영현황</h4>
            <div class="title-road">캠매니저 > 설정관리 &gt; 정부사업 운영현황</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div>
                <table class="searchTable table table-bordered mb-0">
                    <colgroup>
                        <col width="5%">
                        <col width="10%">
                        <col width="7%">
                        <col width="10%">
                        <col width="7%">
                        <col width="15%">
                        <col width="7%">
                        <col width="auto">
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">연도</th>
                        <td>
                            <input type="text" id="year" style="width: 100%;">
                        </td>
                        <th class="text-center th-color">사업구분</th>
                        <td>
                            <input type="text" id="busnClass" style="width: 150px;">
                        </td>
                        <th class="text-center th-color">대상부서</th>
                        <td>
                            <div onclick="fn_deptSelect();">
                                <input type="text" id="deptName" style="width: 90%;">
                                <span class='k-icon k-i-search k-button-icon' style="cursor: pointer"></span>
                                <input type="hidden" id="deptSeq" name="deptSeq" />
                            </div>
                        </td>
                        <th class="text-center th-color">검색</th>
                        <td colspan="4">
                            <input type="text" id="searchValue" style="width: 150px;">
                            <input type="text" id="searchText" onkeypress="if(event.keyCode==13){ rndStat.gridSearch(); }" style="width: 200px;">
                        </td>
                    </tr>
                </table>

                <div id="mainGrid" style="margin:20px 0;"></div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script>
    rndStat.fn_defaultScript();

    function fn_deptSelect() {
        window.open("/common/deptMultiPop.do","조직도","width=343,height=650");
    }

</script>
