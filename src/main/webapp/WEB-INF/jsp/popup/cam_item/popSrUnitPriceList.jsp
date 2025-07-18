<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

<body class="font-opensans" style="background-color:#fff;">
<script type="text/javascript" src="/js/intra/cam_item/popup/popSrUnitPriceList.js?v=${today}"/></script>
<div style="padding:0;">
    <div class="table-responsive">
        <input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
        <input type="hidden" id="crmSn" name="crmSn" value="${data.CRM_SN}">
        <input type="hidden" id="masterSn" name="masterSn" value="${rs.MASTER_SN}">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM"><span style="position: relative; top: 3px;" id="popTitle">출하단가이력</span>
            </h3>
        </div>
        <div>
            <table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col width="10%">
                    <col>
                </colgroup>
                <thead>
                <tr>
                    <th>업체명</th>
                    <td>
                        ${data.CRM_NM}
                    </td>
                </tr>
                <tr>
                    <th>품번</th>
                    <td>
                        ${rs.ITEM_NO} ${rs.ITEM_NAME}
                    </td>
                </tr>
                </thead>
            </table>

            <div id="popMainGrid" style="margin:20px 0;"></div>
        </div>

    </div>
</div>
<script type="text/javascript">
    popSrUnitPriceList.fn_defaultScript();
</script>
</body>
</html>