<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/history/rewardReqBatchPop.js?v=${today}"></script>
<style>
    .removeDay{
        text-decoration:line-through;
        font-weight:700;
        color:red
    }
    .k-grid-toolbar{
        justify-content: flex-end !important;
    }
    .k-grid-norecords{
        justify-content: space-around;
    }
    .k-grid tbody tr{
        height: 38px;
    }
    #wptDiv{
        margin: 0 auto;
        width: 100px;
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: space-around;
    }
    #wptDiv > label {
        margin : 0
    }
    #timeDiff{
        height: 255px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .k-grid-header th.k-header .k-checkbox {
        margin: 0;
    }

    .dash-left .table > thead > tr > th, .dash-right .table > thead > tr > th, .dash-left .table > tbody > tr > th, .dash-right .table > tbody > tr > th, .dash-left .table > tfoot > tr > th, .dash-right .table > tfoot > tr > th, .dash-left .table > thead > tr > td, .dash-right .table > thead > tr > td, .dash-left .table > tbody > tr > td, .dash-right .table > tbody > tr > td, .dash-left .table > tfoot > tr > td, .dash-right .table > tfoot > tr > td {
        padding-left: 10px;
        padding-right: 10px;
    }
</style>
<body class="font-opensans" style="background-color:#fff;">
<div class="col-md-12 col-lg-12 dash-left">
    <div class="panel">
        <div class="panel-heading">
            <h4 class="panel-title">포상 일괄등록</h4>
        </div>

        <div class="panel-body">
            <div>
                <table class="table table-bordered mb-0" style="border: 0; margin-top : 5px; border: 1px solid #dedfdf;">
                    <tr>
                        <td style="border-bottom:0; background-color: white">
                            <div style="display:flex;">
                                <div class="mr10">
                                    <span>부서</span>
                                    <input type="text" id="dept" style="width: 140px;">
                                </div>
                                <div class="mr20">
                                    <span>팀</span>
                                    <input type="text" id="team" style="width: 150px;">
                                </div>
                                <div class="mr20">
                                    <span>성명</span>
                                    <input type="text" id="searchVal" style="width: 140px;">
                                </div>
                                <div class="mr20">
                                    <input type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" value="검색" onclick=""/>
                                </div>
                            </div>
                        </td>
                    </tr>
                </table>
                <div class="col-md-3 col-lg-3 dash-left">
                    <div class="col-md-10 col-lg-10 dash-left mt10">
                        직원목록
                        <div id="mainGrid" style="margin:10px 0;"></div>
                    </div>
                    <div class="col-md-2 col-lg-2 dash-left" style="position: absolute; right: -16px; top: 50%;">
                        →
                    </div>
                </div>
                <div class="col-md-9 col-lg-9 dash-left mt-10">
                    <div id="popMainGrid"></div>
                    <%--          <div class="table-responsive mt20">--%>
                    <%--            <table class="table table-bordered">--%>
                    <%--              <colgroup>--%>
                    <%--                <col width="10%" >--%>
                    <%--                <col width="10%" >--%>
                    <%--                <col width="10%" >--%>
                    <%--                <col width="10%" >--%>
                    <%--                <col width="10%" >--%>
                    <%--                <col width="10%" >--%>
                    <%--                <col width="10%" >--%>
                    <%--                <col width="10%" >--%>
                    <%--                <col width="10%" >--%>
                    <%--                <col width="10%" >--%>
                    <%--              </colgroup>--%>
                    <%--              <thead>--%>
                    <%--              <tr>--%>
                    <%--                <th><input type="checkbox"></th>--%>
                    <%--                <th>사번</th>--%>
                    <%--                <th>성명</th>--%>
                    <%--                <th>포상구분</th>--%>
                    <%--                <th>포상일자</th>--%>
                    <%--                <th>공적사항</th>--%>
                    <%--                <th>시행처</th>--%>
                    <%--                <th>포상 번호</th>--%>
                    <%--                <th>스캔 파일</th>--%>
                    <%--                <th>비고</th>--%>
                    <%--              </tr>--%>
                    <%--              </thead>--%>
                    <%--              <tbody>--%>
                    <%--              </tbody>--%>
                    <%--            </table>--%>
                    <%--          </div><!-- table-responsive -->--%>
                </div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->
<script>
    rewardReqBatchPop.init();
</script>
</body>
