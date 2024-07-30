<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="/js/intra/inside/workPlan/workPlanUser.js?v=${today}"/></script>
<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="erpEmpCd" value="${loginVO.erpEmpCd}"/>
<input type="hidden" id="empName" value="${loginVO.name}"/>
<input type="hidden" id="deptSeq" value="${loginVO.orgnztId}"/>
<input type="hidden" id="deptName" value="${loginVO.orgnztNm}"/>
<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title" style="margin-bottom: 20px;">유연근무신청</h4>
            <div id="secondView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div style="margin-bottom:10px;">
                <table class="searchTable table table-bordered mb-0">
                    <colgroup>
                        <col width="10%">
                        <col>
                        <col width="10%">
                        <col>
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">연도</th>
                        <td colspan="3">
                            <input type="text" id="searchYear" style="width: 10%;">
                        </td>
                    </tr>
                </table>
            </div>
            <div id="mainGrid" style="margin:20px 0;"></div>
        </div>
    </div>
</div>

<script type="text/javascript">
    workPlanUser.init();

    function fn_gridReload(){
        workPlanUser.fn_gridReload();
    }
</script>
