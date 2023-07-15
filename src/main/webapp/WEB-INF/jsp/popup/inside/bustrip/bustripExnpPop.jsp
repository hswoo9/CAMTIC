<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/bustrip/bustripExnpPop.js?v=${today}"></script>
<body class="font-opensans" style="background-color:#fff;">
<div class="table-responsive">
    <div class="card-header pop-header">
        <h3 class="card-title title_NM">출장 여비정산</h3>
        <div class="btn-st popButton">
            <input type="button" class="k-button k-button-solid-info" value="저장" onclick="bustripResultPop.fn_save('${params.hrBizReqId}')" />
            <button type="button" class="k-button k-button-solid-info" onclick="">결재</button>
            <input type="reset" style="margin-right:5px;" class="k-button k-button-solid-error" value="닫기" onclick="window.close()" />
        </div>
    </div>
    <form id="inBustripReqPop" style="padding: 20px 30px;">
        <input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
        <input type="hidden" id="positionCode" name="positionCode" value="${loginVO.positionCode}">
        <input type="hidden" id="deptSeq" name="deptSeq" value="${loginVO.orgnztId}">
        <input type="hidden" id="dutyCode" name="dutyCode" value="${loginVO.dutyCode}">
        <table class="popTable table table-bordered mb-0" id="bustExnpTb">
            <colgroup>

            </colgroup>
            <thead>
                <tr>
                    <th>이름</th>
                    <th>유류비</th>
                    <th>교통비</th>
                    <th>교통일비</th>
                    <th>통행료</th>
                    <th>일비</th>
                    <th>식비</th>
                    <th>주차비</th>
                    <th>기타</th>
                    <th>합계</th>
                </tr>
            <c:forEach var="list" items="${list}">
                <tr>
                    <td>
                        <input type="text" id="empName" class="empName" class="defaultVal" value="${list.EMP_NAME}" disabled style="text-align: center">
                        <input type="hidden" id="empSeq" class="empSeq" class="defaultVal" value="${list.EMP_SEQ}">
                    </td>
                    <td>
                        <input type="text" id="oilCost" class="oilCost" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" />
                    </td>
                    <td>
                        <input type="text" id="trafCost" class="trafCost" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" />
                    </td>
                    <td>
                        <input type="text" id="trafDayCost" class="trafDayCost" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" />
                    </td>
                    <td>
                        <input type="text" id="tollCost" class="tollCost" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" />
                    </td>
                    <td>
                        <input type="text" id="dayCost" class="dayCost" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" />
                    </td>
                    <td>
                        <input type="text" id="eatCost" class="eatCost" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" />
                    </td>
                    <td>
                        <input type="text" id="parkingCost" class="parkingCost" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" />
                    </td>
                    <td>
                        <input type="text" id="etcCost" class="etcCost" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" />
                    </td>
                    <td>
                        <input type="text" id="totalCost" class="totalCost" disabled />
                    </td>
                </tr>
            </c:forEach>
            </thead>
        </table>
    </form>
</div>
<script>
    bustripExnpPop.fn_defaultScript();

</script>
</body>
