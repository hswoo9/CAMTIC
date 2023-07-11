<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<style>
    .card-header {padding: 0px 0px 40px 0px;}
</style>
<script type="text/javascript" src="/js/intra/inside/asset/bookRegisPop.js?v=${today}"/></script>
<body class="font-opensans" style="background-color:#fff;">
<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="empName" value="${loginVO.name}"/>
<input type="hidden" id="deptName" value="${loginVO.orgnztNm}"/>
<input type="hidden" id="dutyName" value="${loginVO.dutyNm}"/>
<div class="col-lg-12" style="padding:0;">
    <div class="card-header">
        <div class="table-responsive">
            <div style="background-color: #00397f;">
                <div class="card-header" style="display:flex; justify-content: space-between; padding: 0px 0px 10px 0px; padding-right: 15px; padding-left: 15px; height: 50px;">
                    <h3 class="card-title title_NM" style="font-size:18px; color: #f1faff;">도서 등록</h3>
                    <div class="btn-st" style="margin-top:10px; text-align:center;">
                        <button type="button" class="k-button k-button-solid-info" onclick="bookRegisPop.fn_bkSave();">저장</button>
                        <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">취소</button>
                    </div>
                </div>
            </div>
            <div style="padding: 20px 30px;">
                <table class="popTable table table-bordered mb-0" style="margin-top: 10px;">
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
                                <span class="red-star">*</span>도서분류
                            </th>
                            <td colspan="3">
                                <input type="text" id="bkLgCd" style="width: 30%;">
                                <input type="text" id="bkMdCd" style="width: 30%;">
                                <input type="text" id="bkCd" style="width: 30%;">
                            </td>
                        </tr>
                        <tr>
                            <th scope="row" class="text-center th-color">
                                <span class="red-star">*</span>도서명
                            </th>
                            <td colspan="3"><input type="text" id="bkName" style="width: 100%;"></td>
                        </tr>
                        <tr>
                            <th scope="row" class="text-center th-color"><span class="red-star">*</span>저자</th>
                            <td colspan><input type="text" id="bkWriter" style="width: 65%;"></td>
                            <th scope="row" class="text-center th-color"><span class="red-star">*</span>출판사</th>
                            <td><input type="text" id="bkPubl" style="width: 100%;"></td>
                        </tr>
                        <tr>
                            <th scope="row" class="text-center th-color"><span class="red-star">*</span>구매가</th>
                            <td><input type="text" id="bkCost" onkeyup="this.value=this.value.replace(/[^0-9]/g,'');" style="width: 100%; text-align: right;"></td>
                            <th scope="row" class="text-center th-color"><span class="red-star">*</span>구매수량</th>
                            <td colspan><input type="text" id="bkCnt" onkeyup="this.value=this.value.replace(/[^0-9]/g,'');" style="width: 100%; text-align: right;"></td>
                        </tr>
                        <tr>
                            <th scope="row" class="text-center th-color"><span class="red-star">*</span>구매일자</th>
                            <td><input id="bkBuyDt" type="text" style="width: 100%;"></td>
                            <th scope="row" class="text-center th-color"><span class="red-star">*</span>구매자/사용자</th>
                            <td colspan>
                                <input type="text" id="bkBuyer" style="width: 40%; margin-right:5px;">
                                <input type="text" id="bkUser" style="width: 40%;">
                            </td>
                        </tr>
                        <tr>
                            <th scope="row" class="text-center th-color"><span class="red-star">*</span>구매부서</th>
                            <td colspan><input type="text" id="bkDept" style="width: 100%;"></td>
                            <th scope="row" class="text-center th-color"><span class="red-star">*</span>비치장소</th>
                            <td><input type="text" id="bkRepl" style="width: 100%;"></td>
                        </tr>
                        <tr>
                            <th scope="row" class="text-center th-color"><span class="red-star">*</span>관리자(정)</th>
                            <td colspan><input type="text" id="bkMng" style="width: 100%;"></td>
                            <th scope="row" class="text-center th-color"><span class="red-star">*</span>관리자(부)</th>
                            <td>
                                <input type="text" id="bkMngSub" style="width: 100%;">
                            </td>
                        </tr>
                        <tr>
                            <th scope="row" class="text-center th-color">이미지</th>
                            <td colspan="3" style="padding:5px;"><input type="file" id="file" name="file"></td>
                        </tr>
                        <tr>
                            <th scope="row" class="text-center th-color">요약</th>
                            <td colspan="3"><textarea type="text" id="bkSmry" style="width: 100%;"></textarea></td>
                        </tr>
                        <tr>
                            <th scope="row" class="text-center th-color"><span class="red-star"></span>주의사항</th>
                            <td colspan="3">
                            위의 내용중 첨부파일, 요약 이외의 모든 데이터를 입력하여야 합니다.
                            </td>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    </div>
</div>

<script>
    bookRegisPop.fn_defaultScript();
</script>
</body>
</html>