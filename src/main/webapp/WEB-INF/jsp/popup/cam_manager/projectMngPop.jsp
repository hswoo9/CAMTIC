<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

<script type="text/javascript" src="<c:url value='/js/intra/cam_project/commonProject.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/projectMngPop.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js?v=${today}'/>"></script>

<style>
    .k-tabstrip-top>.k-tabstrip-items-wrapper {
        border-bottom-width: 0px;
    }
    .k-tabstrip>.k-content {
        border-color: #fff;
    }

    #tabstrip h2 {
        font-weight: lighter;
        font-size: 5em;
        line-height: 1;
        padding: 0 0 0 30px;
        margin: 0;
    }

    #tabstrip h2 span {
        background: none;
        padding-left: 5px;
        font-size: .3em;
        vertical-align: top;
    }

    #tabstrip p {
        margin: 0;
        padding: 0;
    }

    .k-tabstrip-top>.k-tabstrip-items-wrapper .k-item.k-state-active {
        border-color: rgb(18 19 35 / 50%) !important;
    }

    .k-tabstrip-content, .k-tabstrip>.k-content {
        padding : 0;
    }

    .table-responsive {
        overflow-x: hidden !important;
    }

    .k-tabstrip-top>.k-tabstrip-items-wrapper .k-item+.k-item {
        margin-left: 0px !important;
    }

    .k-tabstrip-top>.k-tabstrip-items-wrapper .k-item {
        border-bottom: 0px !important;
    }
</style>

<input type="hidden" id="pjtSn" value="${params.pjtSn}" />
<input type="hidden" id="idx" value="${params.idx}" />
<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="mgtCd" value="${data.PJT_CD}" />
<div>
    <div class="card-header pop-header">
        <h3 class="card-title title_NM">
                <span style="position: relative; top: 3px;">
                    프로젝트 관리
                </span>
        </h3>
        <div id="purcBtnDiv" class="btn-st popButton">
            <button type="button" class="k-button k-button-solid-error" onclick="window.close()">닫기</button>
        </div>
    </div>

    <div style="padding: 20px 30px;">
        <table class="popTable table table-bordered mb-0" id="mainTable">
        <colgroup>
            <col width="15%">
            <col width="35%">
            <col width="15%">
            <col width="35%">
        </colgroup>
        <thead>
        <tr>
            <th scope="row" class="text-center th-color">프로젝트 코드</th>
            <td>
                <input type="text" id="pjtCd" style="width: 50%;" value="${data.PJT_CD}" disabled />
            </td>
            <th scope="row" class="text-center th-color">프로젝트명</th>
            <td>
                <input type="text" id="pjtName" style="width: 100%;" value="${data.PJT_NM}" disabled />
            </td>
        </tr>
        <tr>
            <th scope="row" class="text-center th-color">시작일자</th>
            <td>
                <input type="text" id="frDt" style="width: 50%" disabled />
            </td>
            <th scope="row" class="text-center th-color">종료일자</th>
            <td>
                <input type="text" id="toDt" style="width: 50%" disabled />
            </td>
        </tr>
        </thead>
    </table>
    </div>

    <div style="padding: 20px 30px;">
        <div class="demo-section">
            <div id="tabstrip">
                <ul style="font-size: 12px; padding-bottom: 2px">

                </ul>
            </div>
        </div>
    </div>
</div>

<script>
    pjtMngPop.fn_defaultScript();
</script>