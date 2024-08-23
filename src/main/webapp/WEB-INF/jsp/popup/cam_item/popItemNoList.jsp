<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

<body class="font-opensans" style="background-color:#fff;">
<script type="text/javascript" src="/js/intra/cam_item/popup/popItemNoList.js?v=${today}"/></script>
<div style="padding:0;">
    <div class="table-responsive">
        <input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
        <input type="hidden" id="target" name="target" value="${params.target}">
        <input type="hidden" id="crmSn" name="crmSn" value="${params.crmSn}">
        <input type="hidden" id="itemType" name="itemType" value="${params.itemType}">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM"><span style="position: relative; top: 3px;" id="popTitle">품번 선택</span>
            </h3>
            <div class="btn-st popButton">
                <button type="button" class="k-button k-button-md k-button-solid k-button-solid-info" onclick="popItemNoList.fn_selItem()">선택</button>
            </div>
        </div>
        <div>
            <table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col width="10%">
                    <col>
                    <col width="10%">
                    <col>
                </colgroup>
                <thead>
                <tr>
                    <th>입고창고</th>
                    <td>
                        <input type="text" id="whCd" style="width: 150px;">
                    </td>
                    <th>검색어</th>
                    <td>
                        <input type="text" id="searchKeyword" style="width: 30%;"/>
                        <input type="text" id="searchValue" style="width: 60%;" onkeypress="if(window.event.keyCode==13){popItemNoList.gridReload()}"/>
                    </td>
                </tr>
                </thead>
            </table>

            <div id="popMainGrid" style="margin:20px 0;"></div>
        </div>

    </div>
</div>
<script type="text/javascript">
    popItemNoList.fn_defaultScript();
</script>
</body>
</html>