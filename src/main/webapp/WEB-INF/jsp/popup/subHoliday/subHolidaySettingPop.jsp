<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/subHoliday/subHolidaySettingPop.js?v=${today}"></script>
<%--<style>--%>
<%--    .removeDay{--%>
<%--        text-decoration:line-through;--%>
<%--        font-weight:700;--%>
<%--        color:red--%>
<%--    }--%>
<%--    .k-grid-toolbar{--%>
<%--        justify-content: flex-end !important;--%>
<%--    }--%>
<%--    .k-grid-norecords{--%>
<%--        justify-content: space-around;--%>
<%--    }--%>
<%--    .k-grid tbody tr{--%>
<%--        height: 38px;--%>
<%--    }--%>
<%--    #wptDiv{--%>
<%--        margin: 0 auto;--%>
<%--        width: 100px;--%>
<%--        display: flex;--%>
<%--        flex-direction: column;--%>
<%--        height: 100%;--%>
<%--        justify-content: space-around;--%>
<%--    }--%>
<%--    #wptDiv > label {--%>
<%--        margin : 0--%>
<%--    }--%>
<%--    #timeDiff{--%>
<%--        height: 255px;--%>
<%--        display: flex;--%>
<%--        justify-content: center;--%>
<%--        align-items: center;--%>
<%--    }--%>
<%--</style>--%>
<body class="font-opensans" style="background-color:#fff;">
<div class="col-lg-12" style="padding:0;">
    <div class="card-header" style="padding-top:45px;">
        <div class="col-lg-11" style="margin:0 auto;">
            <div class="table-responsive">
                <div class="popupTitleSt">이력관리</div>
                <form id="subHolidayReqPop">
                    <table class="searchTable table table-bordered mb-0">
                        <colgroup>
                            <col width="10%">
                            <col>
                            <col width="15%">
                            <col>
                        </colgroup>
                        <tr>

                            <div style="display:flex;">
                                <div class="mr20">
                                    <th class="text-center th-color" style="background-color: #d8dce3">수정일자</th>
                                    <td>
                                        <input type="text" id="modDate" style="width:160px;">
                                    </td>
                                    <th class="text-center th-color" style="background-color: #d8dce3">수정자</th>
                                    <td>
                                        <input type="text" id="searchVal" onkeypress="if(window.event.keyCode==13){subHolidayReqBatchPop.gridReload()}" style="width: 140px;">
                                    </td>
                                </div>
                            </div>

                        </tr>
                    </table>
                    <div id="mainGrid" style="margin:20px 0;"></div>
                </form>
            </div>
        </div>
    </div>
</div>
<script>

    subHolidaySettingPop.init();
</script>
</body>
