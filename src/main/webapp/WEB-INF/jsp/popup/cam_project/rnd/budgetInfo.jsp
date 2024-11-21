<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<jsp:useBean id="today" class="java.util.Date" />

<script type="text/javascript" src="<c:url value='/js/intra/cam_project/commonProject.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/rnd/budgetInfo.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js?v=${today}'/>"></script>
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

    .k-master-row {
        white-space: nowrap !important;
    }

    #budgetMainGrid TD{
        border-width: 0 0 1px 1px !important;
    }

    #budgetMainGrid2 TD{
        border-width: 0 0 1px 1px !important;
    }

    .k-grid-excel {
        border-radius: 0px;
    }
</style>

<input type="hidden" id="pjtSn" value="${params.pjtSn}" />
<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="myEmpSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="mgtCd" value="${data.PJT_CD}" />
<input type="hidden" id="pjtNowStrDe" value="${detMap.NOW_STR_DE}" />
<input type="hidden" id="pjtNowEndDe" value="${detMap.NOW_END_DE}" />
<div style="padding: 10px">
    <div id="btnDiv" style="background-color: #eef6ff; padding: 10px; font-size: 13px;">
        <span id="selectType"></span>
    </div>

    <div id="btnDiv2" style="background-color: #eef6ff; padding: 10px; font-size: 13px;">
        <span id="budgetClass"></span>
    </div>

    <br>
    <span style="font-size: 12px;" id="titleWrap">◎ 예산현황</span>
    <div class="table-responsive" style="margin-top: 5px;">
        <div id="budgetGrid1Wrap">
            <div>
                <table class="popTable table table-bordered mb-0">
                    <colgroup>
                        <col width="10%">
                        <col width="15%">
                        <col width="15%">
                        <col width="15%">
                        <col width="15%">
                        <col width="15%">
                        <col width="15%">
                        <col width="15%">
                    </colgroup>
                    <thead>
                    <tr>
                        <th colspan="8" style="font-weight: bold">수입예산</th>
                    </tr>
                    <tr id="A">

                    </tr>
                    </thead>
                    </tbody>
                </table>
                <div id="budgetMainGrid"></div>
            </div>

            <div>
                <table class="popTable table table-bordered mb-0">
                    <colgroup>
                        <col width="10%">
                        <col width="15%">
                        <col width="15%">
                        <col width="15%">
                        <col width="15%">
                        <col width="15%">
                        <col width="15%">
                        <col width="15%">
                    </colgroup>
                    <thead>
                    <tr>
                        <th colspan="8" style="font-weight: bold">지출예산</th>
                    </tr>
                    </thead>
                </table>
                <div id="budgetMainGrid2"></div>
            </div>
        </div>
        <div id="budgetGrid3Wrap" style="display: none;">
            <table class="searchTable table table-bordered mb-1">
                <colgroup>
                    <col width="7%">
                    <col width="20%">
                    <col width="7%">
                    <col width="10%">
                    <col width="7%">
                    <col width="25%">
                </colgroup>
                <tr>
                    <th class="text-center" style="vertical-align: middle;">조회기간</th>
                    <td>
                        <input type="text" id="payAppStrDe" style="width: 45%;"> ~ <input type="text" id="payAppEndDe" style="width: 45%;">
                    </td>
                    <th class="text-center" style="vertical-align: middle;">상태</th>
                    <td>
                        <input type="text" id="searchDept" style="width: 150px;">
                    </td>
                    <th class="text-center" style="vertical-align: middle;">검색어</th>
                    <td>
                        <input type="text" id="searchKeyword" style="width: 35%;"/>
                        <input type="text" id="searchValue" style="width: 60%;" onkeypress="if(window.event.keyCode==13){rndBg.budgetMainGrid3Reload()}"/>
                    </td>
                </tr>
            </table>
            <div id="budgetMainGrid3"></div>
        </div>
        <div id="budgetGrid4Wrap" style="display: none;">
            <table class="searchTable table table-bordered mb-1">
                <colgroup>
                    <col width="7%">
                    <col width="20%">
                    <col width="7%">
                    <col width="10%">
                    <col width="7%">
                    <col width="25%">
                </colgroup>
                <tr>
                    <th class="text-center" style="vertical-align: middle;">결의일자</th>
                    <td>
                        <input type="text" id="exnpStrDe" style="width: 45%;"> ~ <input type="text" id="exnpEndDe" style="width: 45%;">
                    </td>
                    <th class="text-center" style="vertical-align: middle;">승인상태</th>
                    <td>
                        <input type="text" id="searchStatus" style="width: 150px;">
                    </td>
                    <th class="text-center" style="vertical-align: middle;">검색어</th>
                    <td>
                        <input type="text" id="searchKeyword2" style="width: 35%;"/>
                        <input type="text" id="searchValue2" style="width: 60%;" onkeypress="if(window.event.keyCode==13){rndBg.budgetMainGrid4Reload()}"/>
                    </td>
                </tr>
            </table>
            <div id="budgetMainGrid4"></div>
        </div>
    </div>
</div>

<script>
    <%--var inParameters = JSON.parse('${map}');--%>
    // customKendo.fn_datePicker("baseYear", 'decade', "yyyy", new Date());

    rndBg.fn_defaultScript();

</script>