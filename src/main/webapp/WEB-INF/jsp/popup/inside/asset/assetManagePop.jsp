<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<style>
    .card-header {padding: 0px 0px 40px 0px;}
    table { background-color: #00000008; }
    .table > tbody > tr > th, .table > tfoot > tr > th{ background-color: #8fa1c04a;}
</style>
<script type="text/javascript" src="/js/intra/inside/asset/assetManagePop.js?v=${today}"/></script>
<body class="font-opensans" style="background-color:#fff;">
<div class="col-lg-12" style="padding:0;">
    <div class="card-header">
        <div class="table-responsive">
            <div style="background-color: #00397f;">
                <div class="card-header" style="display:flex; justify-content: space-between; padding: 0px 0px 10px 0px; padding-right: 15px; padding-left: 15px; height: 50px;">
                    <h3 class="card-title title_NM" style="font-size:18px; color: #f1faff;">물품관리관 관리</h3>
                    <div style="margin-top:10px;">
                        <button type="button" class="k-button k-button-solid-info" onclick="assetManagePop.setAstManage()">저장</button>
                        <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close();">닫기</button>
                    </div>
                </div>
            </div>

            <div style="padding: 20px 30px;">
                <input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
                <input type="hidden" id="astManageSn" name="astManageSn" value="${data.AST_MANAGE_SN}">
                <table class="table table-bordered mb-0">
                    <colgroup>
                        <col width="30%">
                        <col width="70%">
                    </colgroup>
                    <tbody>
                    <tr>
                        <th colspan="2">물품관리관 관리</th>
                    </tr>
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
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>


<script>
    assetManagePop.fn_defaultScript();
</script>
</body>
</html>