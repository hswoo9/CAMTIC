<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
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
</style>
<script type="text/javascript" src="/js/intra/inside/asset/bookRegisPop.js?v=${today}"/></script>

<!DOCTYPE html>
<html>
<body>
<div class="card">
    <div class="card-header" style="padding:20px 0;">
        <div class="col-lg-11" style="margin:0 auto;">
            <div class="table-responsive">
                <input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
                <input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
                <input type="hidden" id="positionCode" name="positionCode" value="${loginVO.positionCode}">
                <input type="hidden" id="deptSeq" name="deptSeq" value="${loginVO.orgnztId}">
                <input type="hidden" id="deptName" name="deptName" value="${loginVO.orgnztNm}">
                <input type="hidden" id="dutyCode" name="dutyCode" value="${loginVO.dutyCode}">
                <table class="table table-bordered mb-0">
                    <colgroup>
                        <col width="20%">
                        <col width="30%">
                        <col width="20%">
                        <col width="30%">
                    </colgroup>
                    <tbody>
                    <tr>
                        <th colspan="4">도서등록</th>
                    </tr>
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
                    </tbody>
                </table>
            </div>
            <div class="btn-st mt-2 text-right">
                <input type="button" class="k-button k-button-solid k-button-solid-info" value="저장" onclick="bookRegisPop.fn_bkSave()"/>
                <input type="reset" style="margin-right:5px;" class="k-button k-button-solid-error" value="닫기"  onclick="bookRegisPop.fn_close();"/>
            </div>
        </div>
    </div>
</div>


<script>
    bookRegisPop.fn_defaultScript();
</script>
</body>
</html>