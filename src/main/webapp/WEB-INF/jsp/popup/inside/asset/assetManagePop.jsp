<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/asset/assetManagePop.js?v=${today}"/></script>
<body class="font-opensans" style="background-color:#fff;">
<div class="col-lg-12" style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">물품관리관 관리</h3>
            <div class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-info" onclick="assetManagePop.setAstManage()">저장</button>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close();">닫기</button>
            </div>
        </div>
        <div style="padding: 20px 30px;">
            <input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
            <input type="hidden" id="astManageSn" name="astManageSn" value="${data.AST_MANAGE_SN}">
            <table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col width="30%">
                    <col width="70%">
                </colgroup>
                <%--<thead>
                <tr>
                    <th colspan="2" style="font-size: 14px; font-weight:600;background-color: #00397f96; color: #fff;">
                        물품관리관 관리
                    </th>
                </tr>
                </thead>--%>
                <thead>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>물품관리관(정)
                    </th>
                    <td>
                        <input type="hidden" id="manageMainEmpSeq" value="${data.MANAGE_MAIN_EMP_SEQ}" style="margin-right:10px;">
                        <input type="text" id="manageMainEmpName" value="${data.MANAGE_MAIN_EMP_NAME}" style="margin-right:10px;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>물품관리관(부)
                    </th>
                    <td>
                        <input type="hidden" id="manageSubEmpSeq" value="${data.MANAGE_SUB_EMP_SEQ}" style="margin-right:10px;">
                        <input type="text" id="manageSubEmpName" value="${data.MANAGE_SUB_EMP_NAME}" style="margin-right:10px;">
                    </td>
                </tr>
                </thead>
            </table>
        </div>
    </div>
</div>


<script>
    assetManagePop.fn_defaultScript();
</script>
</body>
</html>