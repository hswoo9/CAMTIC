<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/asset/placeChangePop.js?v=${today}"/></script>
<body class="font-opensans" style="background-color:#fff;">
<div class="col-lg-12" style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">위치 일괄변경</h3>
        </div>
        <div style="padding: 20px 30px;">
            <input type="hidden" id="regEmpSeq" name="regEmpSeq" value="${loginVO.uniqId}">
            <input type="hidden" id="regEmpName" name="regEmpName" value="${loginVO.name}">
            <input type="hidden" id="astPdaInfoSn" name="astPdaInfoSn" value="${params.astPdaInfoSn}">
            <table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col width="30%">
                </colgroup>
                <thead>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>변경위치
                    </th>
                    <td>
                        <input type="text" id="newAssetPlaceSn" style="width: 100%;">
                    </td>
                </tr>
                </thead>
            </table>
            <div class="btn-st popButton" style="text-align: right">
                <button type="button" class="k-button k-button-solid-info" onclick="placeChangePop.setAstPdaInfoBatch()">저장</button>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close();">닫기</button>
            </div>
        </div>
    </div>
</div>


<script>
    placeChangePop.fn_defaultScript();

    function userSearch() {
        window.open("/common/deptListPop.do","조직도","width=750,height=650");
    }
</script>
</body>
</html>