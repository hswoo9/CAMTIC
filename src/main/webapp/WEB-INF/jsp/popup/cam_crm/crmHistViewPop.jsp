<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<script type="text/javascript" src="/js/intra/cam_crm/crmHistViewPop.js?v=${today}"/></script>
<script src="https://kendo.cdn.telerik.com/2023.2.606/js/jszip.min.js"></script>
<style>
    .subTitSt {
        font-weight: 600;
        text-align: left;
        font-size: 13px;
    }
</style>
<body class="font-opensans" style="background-color:#fff;">
<input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}" />
<input type="hidden" id="crmSn" name="crmSn" value="${rs.CRM_SN}" />
<div style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM"><span style="position: relative; top: 3px;" id="pjtTitle">이력 조회</span></h3>
            <div class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">닫기</button>
            </div>
        </div>

        <div style="padding: 20px 30px;">
            <div style="display:flex; justify-content: space-between;">
                <div class="subTitSt">· 고객 기본정보</div>
            </div>

            <table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col width="15%">
                    <col width="35%">
                    <col width="15%">
                    <col width="35%">
                </colgroup>
                <thead>
                <tr>
                    <th scope="row" class="text-center th-color">고객명</th>
                    <td>
                        ${rs.CRM_NM}
                    </td>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>대표자
                    </th>
                    <td>
                        ${rs.CRM_CEO}
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>사업자 번호
                    </th>
                    <td>
                        ${rs.CRM_NO}
                    </td>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>설립일
                    </th>
                    <td>
                        ${rs.CRM_EST_NO}
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>[우편번호] 주소
                    </th>
                    <td colspan="3">
                        <c:choose>
                            <c:when test="${rs.POST eq '' or rs.POST eq null}">
                                ${rs.ADDR}
                            </c:when>
                            <c:otherwise>
                                [${rs.POST}] ${rs.ADDR}
                            </c:otherwise>
                        </c:choose>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>전화번호
                    </th>
                    <td>
                        ${rs.TEL_NUM}
                    </td>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>팩스번호
                    </th>
                    <td>
                        ${rs.FAX}
                    </td>
                </tr>

                </thead>
            </table>

            <div id="histDiv" class="mt-20" style="margin-top: 20px">
                <ul style="font-size: 12px;">
                    <li >
                        엔지니어링
                    </li>
                    <li>
                        R&D
                    </li>
                    <li>
                        비R&D
                    </li>

                    <li>
                        관계이력
                    </li>
                </ul>
                <div class="histListDiv">
                    <div id="mainGrid1"></div>
                </div>
                <div class="histListDiv">
                    <div id="mainGrid2"></div>
                </div>
                <div class="histListDiv">
                    <div id="mainGrid3"></div>
                </div>

                <div class="histListDiv">
                    <table class="childrenTable popTable table table-bordered mb-0 text-center" style="width: 99%;">
                        <colgroup>
                            <col style="width: 10%">
                            <col style="width: 20%">
                            <col style="width: 10%">
                        </colgroup>
                        <thead>
                        <tr>
                            <th scope="row" class="text-center th-color">순번</th>
                            <th scope="row" class="text-center th-color">팀명</th>
                            <th scope="row" class="text-center th-color">등록자</th>
                            <th scope="row" class="text-center th-color">컨텍포인트</th>
                            <th scope="row" class="text-center th-color">상담일시</th>c
                            <th scope="row" class="text-center th-color">입력구분</th>
                        </tr>
                        </thead>
                        <tbody id="histTb">

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
<script>
    chv.fn_defaultScript();
</script>
</body>
</html>