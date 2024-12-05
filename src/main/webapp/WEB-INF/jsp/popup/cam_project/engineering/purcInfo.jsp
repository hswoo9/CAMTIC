<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>

<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/commonProject.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/engn/purcInfo.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/commonProject.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js?${today}'/>"></script>

<style>
    .k-footer-template td {
        overflow: visible;
        white-space: nowrap;
    }

    .k-footer-template td:nth-child(8) {
        text-align: right;
    }

    .k-footer-template td:nth-child(-n+5) {
        border-width: 0;
    }

    .k-grid-content td {
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .k-pager-nav+.k-pager-nav,
    .k-pager-nav+.k-pager-numbers-wrap,
    .k-pager-numbers li+li,
    .k-pager-numbers-wrap+.k-pager-nav {
        margin-left: 2px;
    }

    .k-pager-numbers-wrap,
    .k-pager-md .k-pager-info,
    .k-pager-sm .k-pager-info,
    .k-pager-sm .k-pager-numbers,
    .k-pager-sm .k-pager-sizes {
        display: -ms-flexbox;
        display: flex;
        -ms-flex-direction: row;
        flex-direction: row;
    }

    .k-pager-numbers-wrap,
    .k-animation-container,
    .k-animation-container *,
    .k-animation-container :after,
    .k-block .k-header,
    .k-widget,
    .k-widget *,
    .k-widget :before {
        box-sizing: content-box;
    }

    .k-pager-numbers-wrap select.k-dropdown,
    .k-pager-numbers-wrap select.k-dropdown-list,
    .k-pager-numbers-wrap select.k-dropdownlist,
    .k-pager-sm .k-pager-numbers-wrap select.k-dropdown,
    .k-pager-sm .k-pager-numbers-wrap select.k-dropdown-list,
    .k-pager-sm .k-pager-numbers-wrap select.k-dropdownlist {
        cursor: pointer;
        display: none;
    }

    select.k-dropdown,
    select.k-dropdownlist {
        border-radius: 4px;
        padding: 4px 8px;
        border-width: 1px;
        border-style: solid;
        outline: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        transition: all .1s ease;
    }

    .k-pager-wrap .k-link.k-state-selected {
        background-color: #1A5089;
    }

    .k-pager-wrap .k-pager-numbers .k-link {
        border-color: transparent;
    }

    .k-pager-sm .k-pager-numbers-wrap {
        margin-left: 0.4em;
        margin-right: 0;
        box-sizing: border-box;
        border-color: inherit;
        height: calc(1.42857143em + 10px);
        width: 31px;
        height: 2.14em;
    }

    .k-pager-sizes .k-dropdown,
    .k-pager-sizes .k-dropdownlist,
    .k-pager-sizes>select {
        margin-right: 1ex;
        width: 6em;
    }
</style>

<input type="hidden" id="pjtSn" value="${params.pjtSn}" />
<input type="hidden" id="teamType" value="${params.teamType}"/>
<input type="hidden" id="engnSn" value="${params.engnSn}" />
<input type="hidden" id="estSn" value="${params.estSn}" />
<input type="hidden" id="loginEmpSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="deptSeq" value="${loginVO.orgnztId}">
<input type="hidden" id="purcMgtCd" value="${data.PJT_CD}" />

<input type="hidden" id="searchKeyword" />
<input type="hidden" id="searchValue" />

<div style="padding: 10px">
    <div id="btnDiv" style="background-color: #eef6ff; padding: 10px; font-size: 13px;">
        <span id="radioSelectPurcType"></span>
    </div>

    <div id="purcBtnDiv2" style="background-color: #eef6ff; padding: 10px; font-size: 13px; display: none;">
        <span id="purcBudgetClass"></span>
    </div>

    <br>
    <span style="font-size: 12px;" id="purcTitleWrap">◎ 구매 리스트</span>
    <div class="table-responsive">
        <input type="hidden" id="purcReqEmpSeq" value="${loginVO.uniqId}">
        <input type="hidden" id="purcReqDeptSeq" value="${loginVO.orgnztId}">

        <div id="purcInfoMainGrid"></div>
        <div id="purcInfoMainGrid2" style="display: none"></div>
    </div>
    <span id="mainGrid1Wrap">
        <div style="margin-top:10px;"></div><span style="font-size: 12px;">◎ 구매내역 리스트</span>
        <div class="table-responsive">
            <div id="purcInfoSubGrid"></div>
        </div>
    </span>
</div>

<script>
    var _contextPath_ = '${pageContext.request.contextPath}'

    purcInfo.fn_defaultScript();

    function userSearch() {
        window.open("/common/deptListPop.do", "조직도", "width=750, height=650");
    }
</script>
</body>
</html>