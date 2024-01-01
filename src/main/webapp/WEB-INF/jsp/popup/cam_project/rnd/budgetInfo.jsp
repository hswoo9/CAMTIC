<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<jsp:useBean id="today" class="java.util.Date" />

<script type="text/javascript" src="<c:url value='/js/intra/cam_project/commonProject.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/rnd/rndBudget.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js?${today}'/>"></script>

<style>
    .k-footer-template td:nth-child(4) {
        overflow: visible;
        white-space: nowrap;
        text-align: right;
    }

    .k-footer-template td:nth-child(1),
    .k-footer-template td:nth-child(2),
    .k-footer-template td:nth-child(3),
    .k-footer-template td:nth-child(4) {
        border-width: 0;
    }
</style>

<input type="hidden" id="pjtSn" value="${params.pjtSn}" />
<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="mgtCd" value="${data.PJT_CD}" />
<div style="padding: 10px">
    <div class="table-responsive">
        <%--<button type="button" id="budgetAddBtn" style="float: right; margin-bottom: 5px;" class="k-button k-button-solid-base" onclick="rndBg.fn_popBudgetAdd()">등록</button>--%>
        </br>
        <span id="budgetType"></span>
            <input type="text" id="baseYear" style="width: 7%" />
            <button type="button" class="k-button k-button-solid-base" style="float: right" onclick="fn_searchBudget()">조회</button>
        </br>
        <span style=""> ※ 수입 예산</span>
        <div id="budgetMainGrid"></div>
            <div style="margin-top: 20px;"></div>
        <span style=""> ※ 지출 예산</span>
        <div id="budgetMainGrid2"></div>
    </div>
</div>

<script>
    var inParameters = JSON.parse('${map}');
    customKendo.fn_datePicker("baseYear", 'decade', "yyyy", new Date());

    rndBg.fn_defaultScript(inParameters);



    function fn_searchBudget(){
        var date = new Date();
        var year = $("#baseYear").val().toString().substring(2,4);

        var data = {
            gisu : year,
            fromDate : $("#baseYear").val() + "0101",
            toDate : $("#baseYear").val() +  "1231",
            mgtSeq : $("#pjtCd").val(),
            opt01 : '3',
            opt02 : '1',
            opt03 : '2',
            baseDate : $("#baseYear").val() + '0101'
        }

        rndBg.budgetMainGrid(data);
    }

</script>