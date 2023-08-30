<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/asset/bookRegisPop.js?v=${today}"/></script>
<body class="font-opensans" style="background-color:#fff;">

<input type="hidden" id="menuCd" name="menuCd" value="${menuCd}" />
<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="empName" value="${loginVO.name}"/>
<input type="hidden" id="deptName" value="${loginVO.orgnztNm}"/>
<input type="hidden" id="dutyName" value="${loginVO.dutyNm}"/>
<input type="hidden" id="bkSn" value="${params.bkSn}"/>

<div class="col-lg-12" style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">도서 등록</h3>
            <div class="btn-st popButton">
                <c:if test="${empty params.bkSn}">
                    <button type="button" class="k-button k-button-solid-info" onclick="bookRegisPop.fn_bkSave();">저장</button>
                </c:if>
                <c:if test="${!empty params.bkSn}">
                    <button type="button" class="k-button k-button-solid-primary" onclick="bookRegisPop.fn_bkSave(${params.bkSn});">수정</button>
                    <button type="button" class="k-button k-button-solid-error" onclick="bookRegisPop.fn_bkDel(${params.bkSn});">삭제</button>
                </c:if>
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
                    <td><input type="text" id="bkCost" onkeyup="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" style="width: 100%; text-align: right;"></td>
                    <th scope="row" class="text-center th-color"><span class="red-star">*</span>구매수량</th>
                    <td colspan><input type="text" id="bkCnt" onkeyup="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" style="width: 100%; text-align: right;"></td>
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
                    <td colspan><input type="text" id="dept" style="width: 100%;"></td>
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
                <tr style="height:210px;">
                    <th>업로드</th>
                    <td>
                        <div class="filebox">
                            <input type="file">
                            <label for="imgFile" class="k-button k-button-clear-info" >파일 선택</label>
                            <span>이미지는 110*110 크기입니다.</span>
                            <input type="file" id="imgFile" onchange="viewMyPhoto(this)">
                        </div>
                    </td>
                    <th>이미지</th>
                    <td>
                        <div class="filebox">
                            <input type="hidden" id="myFileNo" name="myFileNo" value="${img.file_no}">
                            <div class="card-picture" style="padding-top: 0 !important; margin:0px; overflow: hidden; position: relative;">
                                <c:choose>
                                    <c:when test="${img.file_path ne null}">
                                        <input type="hidden" id="myFilePath" name="myFilePath" value="${img.file_path}">
                                        <input type="hidden" id="myFileName" name="myFileName" value="${img.file_uuid}">
                                        <img id="myPhotoView" width="150px;" height="180px;" src="${img.file_path}${img.file_uuid}">
                                    </c:when>
                                    <c:otherwise>
                                        <img id="myPhotoView" width="150px;" height="180px;" style="cursor:pointer; display: none;">
                                        <span id="myPhotoViewText">등록된 사진이 없습니다.</span>
                                    </c:otherwise>
                                </c:choose>
                            </div>
                        </div>
                    </td>
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

<script>
    bookRegisPop.fn_defaultScript();

    //개인사진 첨부 이미지 미리보기
    function viewMyPhoto(input) {
        if(input.files[0].size > 10000000){
            alert("파일 용량이 너무 큽니다. 10MB 이하로 업로드해주세요.");
            return;
        }

        if(input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#myPhotoView').attr('src', e.target.result);
                $('#myPhotoView').css('display', 'block');
                $('#myPhotoViewText').css('display', 'none');
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
</script>
</body>
</html>