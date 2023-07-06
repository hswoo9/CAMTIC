<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/userManage/userReqPop.js?v=${today}"></script>
<style>
    .card-header {padding: 0px 0px 40px 0px;}
    table { background-color: #00000008; }
    .table > thead > tr > th, .table > tfoot > tr > th{ background-color: #8fa1c04a;}
</style>
<body class="font-opensans" style="background-color:#fff;">
<div class="col-lg-12" style="padding:0;">
    <div class="card-header">
        <div class="table-responsive">
            <div style="background-color: #00397f;">
                <div class="card-header" style="display:flex; justify-content: space-between; padding: 0px 0px 10px 0px; padding-right: 15px; padding-left: 15px; height: 50px;">
                    <h3 class="card-title title_NM" style="font-size:18px; color: #f1faff;">이미지관리</h3>
                    <div style="margin-top:10px;">
                        <button type="button" class="k-button k-button-solid-info" onclick="">저장</button>
                        <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close();">닫기</button>
                    </div>
                </div>
            </div>
            <form id="userReqPopImage" style="padding: 20px 30px;">
                <div style="text-align:right; font-weight:600;">[직원정보] 홍길동</div>
                <table class="table table-bordered mb-0" id="userReqPopImageTable" style="margin-top: 10px;">
                    <colgroup>
                        <col width="9%">
                        <col width="15%">
                        <col width="9%">
                        <col width="15%">
                        <col width="9%">
                        <col width="15%">
                    </colgroup>
                    <thead>
                    <tr style="height:250px;border-top: 1px solid #00000014;">
                        <th>결재사인</th>
                        <td>
                            <span>등록된 결재사진이 없습니다.</span>
                        </td>
                        <th>증명사진</th>
                        <td>
                            <span>등록된 증명사진이 없습니다.</span>
                        </td>
                        <th>개인사진</th>
                        <td>
                            <span>등록된 개인사진이 없습니다.</span>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">결재사인</th>
                        <td colspan="4">
                            <input type="file">
                            <span>결재사인 이미지는 150*150 크기입니다.</span>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">증명사진</th>
                        <td colspan="4">
                            <input type="file">
                            <span>증명사진 이미지는 150*150 크기입니다.</span>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">개인사진</th>
                        <td colspan="4">
                            <input type="file">
                            <span>개인사진 이미지는 110*110 크기입니다.</span>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">주의사항</th>
                        <td colspan="4">
                            <span>사진을 변경한 후, 브라우저의 캐시 때문에 이미지가 변경되어 보이지 않을 수 있습니다.</span><br>
                            <span>사진을 변경한 후, 브라우저의 새로고침 버튼을 눌러보시기 바랍니다.</span>
                        </td>
                    </tr>
                    </thead>
                </table>
            </form>
        </div>
    </div>
</div>
<script>
    userReqPop.defaultScript();


</script>
</body>
