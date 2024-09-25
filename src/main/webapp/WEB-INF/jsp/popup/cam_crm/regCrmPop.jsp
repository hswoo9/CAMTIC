<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

<style>
    .k-tabstrip-top>.k-tabstrip-items-wrapper {
        border-bottom-width: 0px;
    }
    .k-tabstrip>.k-content {
        border-color: #fff;
    }

    #tabstrip h2 {
        font-weight: lighter;
        font-size: 5em;
        line-height: 1;
        padding: 0 0 0 30px;
        margin: 0;
    }

    #tabstrip h2 span {
        background: none;
        padding-left: 5px;
        font-size: .3em;
        vertical-align: top;
    }

    #tabstrip p {
        margin: 0;
        padding: 0;
    }

    .k-tabstrip-top>.k-tabstrip-items-wrapper .k-item.k-state-active {
        border-color: rgb(18 19 35 / 50%) !important;
    }
</style>
<body class="font-opensans" style="background-color:#fff;">
<script type="text/javascript" src="/js/intra/cam_crm/regCrmPop.js?v=${today}"/></script>
<script type="text/javascript" src="/js/intra/cam_crm/crmHistViewPop.js?v=${today}"/></script>
<script type="text/javascript" src="<c:url value='/js/postcode.v2.js?autoload=false'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/inside/userManage/userReqPop.js?v=${today}'/>"></script>
<input type="hidden" id="empSeq" value="${loginVO.uniqId}" />
<input type="hidden" id="crmSn" value="${params.crmSn}" />
<input type="hidden" id="type" value="${params.type}" />
<div style="padding:0;">
    <div class="table-responsive">
        <input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">
                <span style="position: relative; top: 3px;" id="pjtTitle">
                    <c:choose>
                        <c:when test="${params.crmSn eq null}">
                            신규고객 등록
                        </c:when>
                        <c:otherwise>
                            고객정보 수정
                        </c:otherwise>
                    </c:choose>
                </span>
            </h3>
            <div class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-info" onclick="crmReg.fn_save();">저장</button>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">닫기</button>
            </div>
        </div>

        <div style="padding: 20px 30px;">
            <table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col width="20%">
                    <col width="30%">
                    <col width="20%">
                    <col width="30%">
                </colgroup>
                <thead>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>고객명
                    </th>
                    <td>
                        <input type="text" id="crmNm" style="width: 90%;">
                    </td>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>대표자
                    </th>
                    <td>
                        <input type="text" id="crmCeo" style="width: 90%;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>사업자 번호
                    </th>
                    <td>
                        <input type="text" id="crmNo" style="width: 50%;">
                        <span style="color: red">ex) 111-11-11111</span>
                    </td>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>대표자 이메일
                    </th>
                    <td>
                        <input type="text" id="email" style="width: 90%;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        전화번호
                    </th>
                    <td>
                        <input type="text" id="telNum" style="width: 90%;">
                    </td>
                    <th scope="row" class="text-center th-color">
                        대표자 휴대폰
                    </th>
                    <td>
                        <input type="text" id="phNum" style="width: 90%;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        팩스번호
                    </th>
                    <td>
                        <input type="text" id="fax" style="width: 90%;">
                    </td>
                    <th scope="row" class="text-center th-color">
                        설립일
                    </th>
                    <td>
                        <input type="text" id="crmEstNo" style="width: 45%;">
                        <span class="red-star" style="">ex) 2011-01-01</span>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        주소
                    </th>
                    <td colspan="3" style="line-height: 30px">
                        <input type="text" id="post" style="width: 20%;">
                        <input type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" value="우편번호 검색" onclick="userReqPop.addrSearch();"/>
                        <input type="text" id="addr" style="width: 90%;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        업태
                    </th>
                    <td>
                        <input type="text" id="crmOcc" style="width: 90%;">
                    </td>
                    <th scope="row" class="text-center th-color">
                        종목
                    </th>
                    <td>
                        <input type="text" id="crmEvent" style="width: 90%;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        월마감
                    </th>
                    <td colspan="3">
                        <input type="checkbox" class="k-checkbox" id="monCheck" name="monCheck">
                    </td>
                </tr>
                </thead>
            </table>
            <span style="font-weight: bold; font-size: 12px;">
                ※ 사업자 번호 미입력시 임시고객으로 등록되며, 고객등급은 잠재고객으로 반영됩니다. <br>
                ※ 사업자 번호 입력 및 임시고객의 사업자번호 등록은 신규고객으로 반영됩니다.
            </span>
        </div>

        <div id="crmSubInfo">
            <div class="demo-section">
                <div id="tabstrip">
                    <ul style="font-size: 12px;">
                        <li>
                            부가정보
                        </li>
                        <li>
                            담당자
                        </li>
                        <li>
                            산업분야
                        </li>
                        <li>
                            인증정보
                        </li>
                        <li>
                            회계정보
                        </li>
                        <li>
                            최근 경영규모
                        </li>
                        <%-- TODO. 관심분야 삭제--%>
<%--                        <li>--%>
<%--                            관심분야--%>
<%--                        </li>--%>
                        <li>
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
                    <div>
                        <div>
                            <jsp:include page="/WEB-INF/jsp/popup/cam_crm/crmSubInfo.jsp" flush="true">
                                <jsp:param name="crmSn" value="${params.crmSn}"/>
                                <jsp:param name="regEmpSeq" value="${loginVO.uniqId}"/>
                            </jsp:include>
                        </div>
                    </div>
                    <div>
                        <div>
                            <jsp:include page="/WEB-INF/jsp/popup/cam_crm/crmMemInfo.jsp" flush="true">
                                <jsp:param name="crmSn" value="${params.crmSn}"/>
                                <jsp:param name="regEmpSeq" value="${loginVO.uniqId}"/>
                            </jsp:include>
                        </div>
                    </div>
                    <div>
                        <jsp:include page="/WEB-INF/jsp/popup/cam_crm/crmIndustry.jsp" flush="true">
                            <jsp:param name="crmSn" value="${params.crmSn}"/>
                            <jsp:param name="regEmpSeq" value="${loginVO.uniqId}"/>
                        </jsp:include>
                    </div>
                    <div>
                        <jsp:include page="/WEB-INF/jsp/popup/cam_crm/crmCert.jsp" flush="true">
                            <jsp:param name="crmSn" value="${params.crmSn}"/>
                            <jsp:param name="regEmpSeq" value="${loginVO.uniqId}"/>
                        </jsp:include>
                    </div>
                    <div>
                        <jsp:include page="/WEB-INF/jsp/popup/cam_crm/crmAccounting.jsp" flush="true">
                            <jsp:param name="crmSn" value="${params.crmSn}"/>
                            <jsp:param name="regEmpSeq" value="${loginVO.uniqId}"/>
                        </jsp:include>
                    </div>
                    <div>
                        <jsp:include page="/WEB-INF/jsp/popup/cam_crm/crmMgScale.jsp" flush="true">
                            <jsp:param name="crmSn" value="${params.crmSn}"/>
                            <jsp:param name="regEmpSeq" value="${loginVO.uniqId}"/>
                        </jsp:include>
                    </div>
                    <%-- TODO. 관심분야 삭제--%>
<%--                    <div>--%>
<%--                        <jsp:include page="/WEB-INF/jsp/popup/cam_crm/crmInterests.jsp" flush="true">--%>
<%--                            <jsp:param name="crmSn" value="${params.crmSn}"/>--%>
<%--                            <jsp:param name="regEmpSeq" value="${loginVO.uniqId}"/>--%>
<%--                        </jsp:include>--%>
<%--                    </div>--%>
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
                        <button style="float: right; margin-bottom: 5px;" class="k-button k-button-solid-info" onclick="crmReg.fn_crmHistRegPop();">등록</button>
                        <table class="childrenTable popTable table table-bordered mb-0 text-center" style="width: 100%;">
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
                                <th scope="row" class="text-center th-color">상담일시</th>
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
</div>
<script type="text/javascript">
    crmReg.fn_defaultScript();
</script>
</body>
</html>