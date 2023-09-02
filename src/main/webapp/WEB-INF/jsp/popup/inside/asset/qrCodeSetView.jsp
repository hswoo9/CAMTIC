<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/asset/qrCodeSet.js?v=${today}"/></script>
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
            <h3 class="card-title title_NM">QR Code 생성</h3>
            <div class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-info" onclick="qrCodeSet.fn_save()">저장</button>
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
                        <span class="red-star">*</span>분류관리
                    </th>
                    <td colspan="3">
                        <input type="text" id="positionClass" style="width: 30%;">
                        <input type="text" id="assetDivision" style="width: 30%;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>카테고리관리
                    </th>
                    <td colspan="3">
                        <input type="text" id="ctgA" style="width: 30%;">
                        <input type="text" id="ctgB" style="width: 30%;">
                        <input type="text" id="ctgC" style="width: 30%;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color"><span class="red-star">*</span>자산명</th>
                    <td colspan><input type="text" id="prodName" style="width: 90%;"></td>
                    <th scope="row" class="text-center th-color"><span class="red-star">*</span>취득일(구매일)</th>
                    <td><input type="text" id="prodByDt" style="width: 90%;"></td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color"><span class="red-star">*</span>모델명</th>
                    <td>
                        <input id="modelNm" type="text" style="width: 90%;">
                    </td>
                    <th scope="row" class="text-center th-color"><span class="red-star">*</span>자금출처</th>
                    <td>
                        <input type="text" id="project" style="width: 80%;">
                    </td>
                </tr>
                <tr id="busnLine" style="display: none;">
                    <th><span class="red-star">*</span>사업명</th>
                    <td colspan="3">
                        <input type="text" id="busnName" name="busnName" readonly style="width: 80%;">
                        <button type="button" class="k-button k-button-solid-info" id="projectAddBtn">사업선택</button>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color" style="height: 200px"><span class="red-star">*</span>QR</th>
                    <td colspan="3">
                        <div class="filebox">
                            <input type="hidden" id="myFileNo" name="myFileNo" value="${img.file_no}">
                            <div class="card-picture" style="padding-top: 0 !important; margin:0px; overflow: hidden; position: relative;">
                                <c:if test="${img.file_path ne null}">
                                    <input type="hidden" id="myFilePath" name="myFilePath" value="${img.file_path}">
                                    <input type="hidden" id="myFileName" name="myFileName" value="${img.file_uuid}">
                                    <img id="myPhotoView" width="150px;" height="180px;" src="${img.file_path}${img.file_uuid}">
                                </c:if>
                            </div>
                        </div>
                    </td>
                </tr>

                </thead>
            </table>
        </div>
    </div>
</div>

<script>
    qrCodeSet.fn_defaultScript();
</script>
</body>
</html>