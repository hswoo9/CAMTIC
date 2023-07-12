<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<style>
    .card-header {padding: 0px 0px 0px 0px;}
    table { background-color: #00000008; }
    .table > tbody > tr > th, .table > tfoot > tr > th{ background-color: #8fa1c04a;}
</style>
<script type="text/javascript" src="/js/intra/inside/asset/bulkChangePop.js?v=${today}"/></script>

<body class="font-opensans" style="background-color:#fff;">
<div class="col-lg-12" style="padding:0;">
    <div class="card-header">
        <div class="table-responsive">
            <div style="background-color: #00397f;">
                <div class="card-header" style="display:flex; justify-content: space-between; padding: 0px 0px 10px 0px; padding-right: 15px; padding-left: 15px; height: 50px;">
                    <h3 class="card-title title_NM" style="font-size:18px; color: #f1faff;">일괄변경</h3>
                    <div style="margin-top:10px;">
                        <button type="button" class="k-button k-button-solid-info" onclick="bulkChangePop.setAstInfoBatch()">저장</button>
                        <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close();">닫기</button>
                    </div>
                </div>
            </div>

            <div style="padding: 20px 30px;">
                <input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
                <input type="hidden" id="astInfoSn" name="astInfoSn" value="${params.astInfoSn}">
                <table class="table table-bordered mb-0">
                    <colgroup>
                        <col width="10%">
                        <col width="30%">
                        <col width="60%">
                    </colgroup>
                    <thead>
                    <tr>
                        <th colspan="3" style="font-size: 14px; font-weight:600;background-color: #00397f96; color: #fff;">
                            자산목록 일괄변경
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            <input type="checkbox" class="k-checkbox checkbox" id="astNameChk" name="astNameChk">
                        </td>
                        <th scope="row" class="text-center th-color">
                            <span class="red-star"></span>자산명
                        </th>
                        <td>
                            <input type="text" id="astName" style="width: 100%;">
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="checkbox" class="k-checkbox checkbox" id="empNameChk" name="empNameChk">
                        </td>
                        <th scope="row" class="text-center th-color">
                            <span class="red-star"></span>사용자
                        </th>
                        <td>
                            <input type="text" id="empName" style="width: 66%;">
                            <button type="button" id="staffSlect" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" style="width:100px; height:27px; line-height:0;" onclick="">
                                직원 선택
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="checkbox" class="k-checkbox checkbox" id="purcPriceChk" name="purcPriceChk">
                        </td>
                        <th scope="row" class="text-center th-color">
                            <span class="red-star"></span>구입 가격
                        </th>
                        <td>
                            <input type="text" id="purcPrice" style="width: 100%;">
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="checkbox" class="k-checkbox checkbox" id="astStsChk" name="astStsChk">
                        </td>
                        <th scope="row" class="text-center th-color">
                            <span class="red-star"></span>상태
                        </th>
                        <td>
                            <input type="text" id="astStsCode" style="width: 100%;">
                        </td>
                    </tr>
                    <tr>
                        <td>
                        </td>
                        <th scope="row" class="text-center th-color">
                            <span class="red-star"></span>사유
                        </th>
                        <td>
                            <input type="text" id="reason" style="width: 100%;">
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>


<script>
    bulkChangePop.fn_defaultScript();
</script>
</body>
</html>