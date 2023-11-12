<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />

<script type="text/javascript" src="<c:url value='/js/intra/inside/userManage/businessParticipationList.js?v=${today}'/>"></script>


<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="deptSeq" value="${loginVO.orgnztId}"/>
<input type="hidden" id="deptName" value="${loginVO.orgnztNm}"/>

<div class="col-md-12 col-lg-12 dash-left">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">사업별참여현황</h4>
            <div class="title-road" style="text-align: right; margin-bottom: 5px;">캠인사이드 > 인사관리 > 참여율관리 > 사업별참여현황</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div>
                <table class="searchTable table table-bordered mb-0">
                    <colgroup>
                        <col width="7%">
                        <col width="10%">
                        <col width="7%">
                        <col width="10%">
                        <col width="10%">
                        <col width="10%">
                        <col width="10%">
                        <col width="10%">
                        <col width="10%">
                        <col width="16%">
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">연도</th>
                        <td>
                            <input type="text" id="pjtYear">
                        </td>
                        <th class="text-center th-color">구분</th>
                        <td>
                            <input type="text" id="busnClass">
                        </td>
                        <th class="text-center th-color">인건비 구분</th>
                        <td>
                            <input type="text" id="payGubun">
                        </td>
                        <th class="text-center th-color">진행현황</th>
                        <td>
                            <input type="text" id="pjtStep">
                        </td>
                        <th class="text-center th-color">프로젝트명</th>
                        <td>
                            <input type="text" id="pjtNm">
                        </td>
                    </tr>
                </table>


                <div id="mainGrid" style="margin:20px 0;"></div>
            </div>
        </div>

    </div>
</div><!-- col-md-9 -->

<script type="text/javascript">

    busnPartList.fn_defaultScript();
</script>