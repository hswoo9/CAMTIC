<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

<body class="font-opensans" style="background-color:#fff;">
<script type="text/javascript" src="/js/intra/inside/bustrip/cardToBustripListView.js?v=${today}"/></script>

<input type="hidden" id="empSeq" value="${loginVO.uniqId}" />
<div style="padding:0;">
    <div class="table-responsive">
        <input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">
                <span style="position: relative; top: 3px;" id="pjtTitle">출장 목록</span>
            </h3>
        </div>
        <div style="margin: 15px 0;">
            <table class="popTable table table-bordered mb-0" style="">
                <colgroup>
                    <col width="15%">
                    <col width="35%">
                    <col width="15%">
                    <col width="35%">
                </colgroup>
                <thead>
                <tr>
                    <th class="text-center th-color">출장 기간</th>
                    <td colspan="5">
                        <input type="text" id="start_date" style="width: 150px;">
                        ~
                        <input type="text" id="end_date" style="width: 150px;">
                    </td>
                </tr>
                </thead>
            </table>
        </div>
        <div id="mainGrid">

        </div>
    </div>
</div>
<script type="text/javascript">
    cardToBus.fn_defaultScript();
</script>
</body>
</html>