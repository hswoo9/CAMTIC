<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<script type="text/javascript" src="<c:url value='/js/ckEditor/ckeditor.js'/>"></script>
<script type="text/javascript" src="/js/intra/cam_item/popup/popDepositStat.js?v=${today}"/></script>
<style>
    .searchTable > thead > tr > th {
        background-color: #00397f96;
        color: white;
        text-align: center;
    }

    .table td, .table th {
        padding: 0.5rem;
        vertical-align: middle;
        border-top: 1px solid #dee2e6;
    }

    .subTitSt {
        font-weight: 600;
        text-align: left;
        font-size: 13px;
        padding: 10px;
    }
</style>
<body class="font-opensans" style="background-color:#fff;">
<div style="padding:0;">
    <div class="table-responsive">
        <input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
        <input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
        <input type="hidden" id="crmSn" name="crmSn" value="${params.crmSn}">
        <input type="hidden" id="yearMonth" name="yearMonth" value="${params.yearMonth}">

        <div class="card-header pop-header">
            <h3 class="card-title title_NM">
                <span style="position: relative; top: 3px;" id="popTitle">입금현황</span>
            </h3>

            <div class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">닫기</button>
            </div>
        </div>

        <div>
            <div id="popMainGrid" style="margin:20px 0;"></div>
        </div>
    </div>
</div>
<script type="text/javascript">
    popDepositStat.fn_defaultScript();
</script>
</body>
</html>