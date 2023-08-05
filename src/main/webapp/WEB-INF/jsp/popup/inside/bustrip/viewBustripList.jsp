<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

<body class="font-opensans" style="background-color:#fff;">
<script type="text/javascript" src="/js/intra/inside/bustrip/bustripList.js?v=${today}"/></script>

<div style="padding:0;">
    <div class="table-responsive">
        <input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM"><span style="position: relative; top: 3px;" id="pjtTitle">출장 정보</span>
            </h3>

        </div>
        <div>
            <table class="searchTable table table-bordered mb-0">
                <colgroup>
                    <col width="10%">
                    <col width="25%">
                    <col width="10%">
                    <col width="20%">
                    <col width="10%">
                    <col width="25%">
                </colgroup>
                <tr>
                    <th class="text-center th-color">출장 기간</th>
                    <td>
                        <input type="text" id="start_date" style="width: 110px;">
                        ~
                        <input type="text" id="end_date" style="width: 110px;">
                    </td>
                    <th class="text-center th-color">프로젝트</th>
                    <td>
                        <input type="text" id="pjt_cd" style="width: 120px;">
                    </td>
                    <th class="text-center th-color">사업명</th>
                    <td>
                        <input type="text" id="busnName" style="width: 150px;">
                    </td>
                </tr>
            </table>
            <div id="popMainGrid" style="margin:20px 0;"></div>
        </div>

    </div>
</div>
<script type="text/javascript">
    bustripList.init();
</script>
</body>
</html>