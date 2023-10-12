<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

<body class="font-opensans" style="background-color:#fff;">
<script type="text/javascript" src="/js/intra/cam_item/popup/popOutputByBom.js?v=${today}"/></script>
<div style="padding:0;">
    <div class="table-responsive">
        <input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
        <input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
        <input type="hidden" id="bomSn" name="bomSn" value="${rs.BOM_SN}">
        <input type="hidden" id="outputCnt" name="outputCnt" value="${params.outputCnt}">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM"><span style="position: relative; top: 3px;" id="popTitle">BOM제작</span>
            </h3>
            <div class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-info" style="margin-right:5px;" onclick="popOutput.setOutput()">제작</button>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">닫기</button>
            </div>
        </div>
        <div>
            <table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col width="10%">
                    <col>
                </colgroup>
                <thead>
                <tr>
                    <th>품명</th>
                    <td>
                        ${rs.ITEM_NO} ${rs.ITEM_NAME}
                    </td>
                </tr>
                </thead>
            </table>

            <div class="mt-20">
                <table class="popTable table table-bordered mb-0 mt-20">
                    <colgroup>
                        <col style="width: 6%;">
                        <col>
                        <col>
                        <col style="width: 14%;">
                        <col style="width: 12%;">
                        <col style="width: 12%;">
                        <col style="width: 15%;">
                        <col style="width: 20%;">
                    </colgroup>
                    <thead>
                    <tr>
                        <th>순번</th>
                        <th>품번</th>
                        <th>품명</th>
                        <th>단가</th>
                        <th>필요수량</th>
                        <th>안전재고</th>
                        <th>자재출고창고</th>
                        <th>비고</th>
                    </tr>
                    </thead>
                    <tbody id="outputTb">

                    </tbody>
                </table>
            </div>
        </div>

    </div>
</div>
<script type="text/javascript">
    popOutput.fn_defultScript();
</script>
</body>
</html>