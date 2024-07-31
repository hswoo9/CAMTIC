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
<script type="text/javascript" src="/js/intra/cam_crm/mfOverviewPop.js?v=${today}"/></script>

<input type="hidden" id="crmMfSn" value="${params.crmMfSn}" />

<div style="padding:0;">
    <div class="table-responsive">
        <input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">

        <div class="card-header pop-header">
            <h3 class="card-title title_NM">
                <span style="position: relative; top: 3px;" id="pjtTitle">
                    실태조사
                </span>
            </h3>
            <div class="btn-st popButton">
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
                        <span class="red-star">*</span>사업체명
                    </th>
                    <td>
                        ${data.MF_NAME}
                    </td>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>대표자
                    </th>
                    <td>
                        ${data.CEO_NAME}
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>사업자 번호
                    </th>
                    <td>
                        ${fn:substring(data.MF_NO, 0, 3)}-${fn:substring(data.MF_NO, 3, 5)}-${fn:substring(data.MF_NO, 5, fn:length(data.MF_NO))}
                    </td>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>대표자 이메일
                    </th>
                    <td>
                        ${data.EMAIL}
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        전화번호
                    </th>
                    <td>
                        ${data.TEL_NUM}
                    </td>
                    <th scope="row" class="text-center th-color">
                        대표자 휴대폰
                    </th>
                    <td>
                        ${data.CEO_TEL_NUM}
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        팩스번호
                    </th>
                    <td>
                        ${data.FAX_NUM}
                    </td>
                    <th scope="row" class="text-center th-color">
                        설립일
                    </th>
                    <td>
                        ${data.EST_DATE}
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        주소
                    </th>
                    <td colspan="3" style="line-height: 30px">
                        ${data.ADDR}
                    </td>
                </tr>
                </thead>
            </table>
        </div>

        <div id="crmSubInfo">
            <div class="demo-section">
                <div id="tabstrip">
                    <ul style="font-size: 12px;">
                        <li>
                            제조업총조사
                        </li>
                        <li>
                            완주군
                        </li>
                        <li>
                            통계
                        </li>
                    </ul>
                    <div>
                        <div>
                            <jsp:include page="/WEB-INF/jsp/popup/cam_crm/mfOverviewJeonbuk.jsp" flush="true">
                                <jsp:param name="crmMfSn" value="${data.CRM_MF_SN}"/>
                                <jsp:param name="mfNo" value="${data.MF_NO}"/>
                                <jsp:param name="mfNo" value="${params.searchYear}"/>
                            </jsp:include>
                        </div>
                    </div>
                    <div>
                        <div>

                        </div>
                    </div>
                    <div>
                        <jsp:include page="/WEB-INF/jsp/popup/cam_crm/mfOverviewJeonbukStat.jsp" flush="true">
                            <jsp:param name="crmMfSn" value="${data.CRM_MF_SN}"/>
                            <jsp:param name="mfNo" value="${data.MF_NO}"/>
                            <jsp:param name="mfNo" value="${params.searchYear}"/>
                        </jsp:include>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript">
    movP.fn_defaultScript();
</script>
</body>
</html>