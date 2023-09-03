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

<div style="padding:0;">
    <div class="table-responsive">
        <input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM"><span style="position: relative; top: 3px;" id="pjtTitle">신규고객 등록</span></h3>
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
                <%--<tr>
                    <th colspan="4" style="font-size: 14px; font-weight:600;background-color: #00397f96; color: #fff;">도서 등록</th>
                </tr>--%>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>고객 유치경로
                    </th>
                    <td>
                        <input type="text" id="crmAtt" style="width: 90%;">
                    </td>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>고객분류
                    </th>
                    <td>
                        <input type="text" id="crmClass" style="width: 90%;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>특화아이템 해당 분야
                    </th>
                    <td colspan="3">
                        <span style="position: relative; top: 3px;">
                            <c:forEach var="item" items="${data}">
                                <input type="checkbox" name="crmSpecItem" value="${item.CM_CODE}" id="crmSpecItem${item.CM_CODE}">
                                <label for="crmSpecItem${item.CM_CODE}" style="margin-right: 15px;">${item.CM_CODE_NM}</label>
                            </c:forEach>
                        </span>
                    </td>
                </tr>
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
                        <span style="color: red">ex) 402-92-13594</span>
                    </td>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>대표자 이메일
                    </th>
                    <td>
                        <input type="text" id="email" style="width: 90%;">
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
                    <ul>
                        <li class="k-active">
                            부가정보
                        </li>
                        <li>
                            TEST B
                        </li>
                        <li>
                            TEST C
                        </li>
                        <li>
                            TEST D
                        </li>
                    </ul>
                    <div>
                        <span>&nbsp;</span>
                        <div>
                            <div style="padding: 10px">
                                <table class="popTable table table-bordered mb-0">
                                    <colgroup>
                                        <col width="20%">
                                        <col width="30%">
                                        <col width="20%">
                                        <col width="30%">
                                    </colgroup>
                                    <thead>
                                    <%--<tr>
                                        <th colspan="4" style="font-size: 14px; font-weight:600;background-color: #00397f96; color: #fff;">도서 등록</th>
                                    </tr>--%>
                                    <tr>
                                        <th scope="row" class="text-center th-color">
                                            <span class="red-star">*</span>고객 유치경로
                                        </th>
                                        <td>
                                            <input type="text" id="crmAtt" style="width: 90%;">
                                        </td>
                                        <th scope="row" class="text-center th-color">
                                            <span class="red-star">*</span>고객분류
                                        </th>
                                        <td>
                                            <input type="text" id="crmClass" style="width: 90%;">
                                        </td>
                                    </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div>
                        <span class="sunny">&nbsp;</span>
                        <div class="weather">
                            <h2>29<span>&ordm;C</span></h2>
                            <p>Sunny weather in New York.</p>
                        </div>
                    </div>
                    <div>
                        <span class="sunny">&nbsp;</span>
                        <div class="weather">
                            <h2>21<span>&ordm;C</span></h2>
                            <p>Sunny weather in London.</p>
                        </div>
                    </div>
                    <div>
                        <span class="cloudy">&nbsp;</span>
                        <div class="weather">
                            <h2>16<span>&ordm;C</span></h2>
                            <p>Cloudy weather in Moscow.</p>
                        </div>
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