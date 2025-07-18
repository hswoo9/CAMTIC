<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<link rel="stylesheet" href="/css/intra/kTreeView.css">
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/js/treeTable/css/tree-table.css">
<style>
    .searchTable > thead > tr > th {
        background-color: #00397f96;
        color: white;
        text-align: center;
    }

    .k-treeview .k-treeview-top.k-treeview-bot .k-i-expand:before {
        background: url("/images/ico/ico_organ03_close.png")
    }

    .k-treeview .k-treeview-top.k-treeview-bot .k-i-collapse:before{
        background: url(/images/ico/ico_organ03_open.png);
        content: "";
    }

    .k-master-row {
        font-size: 12px;
    }

</style>
<body class="font-opensans" style="background-color:#fff;">
<script type="text/javascript" src="/js/intra/cam_item/popup/popBomView.js?v=${today}"/></script>
<div style="padding:0;">
    <div class="table-responsive">
        <input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
        <input type="hidden" id="bomSn" name="bomSn" value="${rs.BOM_SN}">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM"><span style="position: relative; top: 3px;" id="popTitle">BOM조회</span>
            </h3>
            <div class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">닫기</button>
            </div>
        </div>
        <div>
            <table class="searchTable table table-bordered mb-0 mt-10">
                <colgroup>
                    <col width="17%">
                    <col>
                </colgroup>
                <thead>
                <tr>
                    <th>품번</th>
                    <td>
                        ${rs.ITEM_NO}
                    </td>
                </tr>
                <tr>
                    <th>품명</th>
                    <td>
                        ${rs.ITEM_NAME}
                    </td>
                </tr>
                </thead>
            </table>
            <div id="gridForm" style="height:537px; width: 100%; display: flex; justify-content: space-between; border: 1px solid #dedfdf;" class="mt-20">
<%--                <div style="width: 25%;">--%>
<%--                    <div id="treeView" style="padding-right: 20px;padding-left: 20px;">--%>

<%--                    </div>--%>
<%--                </div>--%>
<%--                <div style="width: 70%;">--%>
<%--                    <div id="bomGrid" style="margin-top: 10px; margin-right: 10px;">--%>

<%--                    </div>--%>
<%--                </div>--%>

    <div class="tree-table-wrap">
        <table class="tree-table">
            <colgroup>
                <col>
                <col>
                <col>
                <col width="5%">
                <col width="5%">
                <col width="5%">
                <col width="5%">
                <col width="10%">
                <col width="10%">
                <col width="10%">
                <col width="10%">
            </colgroup>
            <thead>
            <tr>
                <th>순번</th>
                <th>품번</th>
                <th>품명</th>
                <th>품목구분</th>
                <th>사용갯수</th>
                <th>단위</th>
                <th>규격</th>
                <th>창고</th>
                <th>현재고</th>
                <th>매입단가</th>
                <th>원가</th>
            </tr>
            </thead>
            <tbody id="table-tree">
            </tbody>
        </table>
    </div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript">
    var items = new Array()

    popBomView.fn_defaultScript();
</script>
<script type="text/javascript" src="/js/treeTable/tree-table.js?v=${today}"/></script>
</body>
</html>