<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/userManage/userReqPop.js?v=${today}"></script>
<body class="font-opensans" style="background-color:#fff;">
<div class="col-lg-12" style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">이미지관리</h3>
            <div class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-info" onclick="empInfoFileSavePop();">저장</button>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close();">닫기</button>
            </div>
        </div>
        <input type="hidden" id="menuCd" name="menuCd" value="${menuCd}" />
        <input type="hidden" id="empSeq" name="empSeq" value="${params.empSeq}" />
        <form id="userReqPopImage" style="padding: 20px 30px;">
            <div style="text-align:right; font-weight:600;">[직원정보] ${params.EMP_NAME_KR}</div>
            <table class="popTable table table-bordered mb-0" id="userReqPopImageTable">
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
                        <div class="filebox">
                            <input type="hidden" id="signFileNo" name="signFileNo" value="${data.signImg.file_no}">
                            <div class="card-picture" style="padding-top: 0 !important; margin:0px; overflow: hidden; position: relative;">
                                <c:choose>
                                    <c:when test="${data.signImg.file_path ne null}">
                                        <input type="hidden" id="signFilePath" name="signFilePath" value="${data.signImg.file_path}">
                                        <input type="hidden" id="signFileName" name="signFileName" value="${data.signImg.file_uuid}">
                                        <img id="signPhotoView" width="150px;" height="180px;" src="${data.signImg.file_path}${data.signImg.file_uuid}">
                                    </c:when>
                                    <c:otherwise>
                                        <img id="signPhotoView" width="150px;" height="180px;" style="cursor:pointer; display: none;">
                                        <span id="signPhotoViewText">등록된 결재사진이 없습니다.</span>
                                    </c:otherwise>
                                </c:choose>
                            </div>
                        </div>
                    </td>
                    <th>증명사진</th>
                    <td>
                        <div class="filebox">
                            <input type="hidden" id="fileNo" name="fileNo" value="${data.idImg.file_no}">
                            <div class="card-picture" style="padding-top: 0 !important; margin:0px; overflow: hidden; position: relative;">
                                <c:choose>
                                    <c:when test="${data.idImg.file_path ne null}">
                                        <input type="hidden" id="filePath" name="filePath" value="${data.idImg.file_path}">
                                        <input type="hidden" id="fileName" name="fileName" value="${data.idImg.file_uuid}">
                                        <img id="photoView" width="150px;" height="180px;" src="${data.idImg.file_path}${data.idImg.file_uuid}">
                                    </c:when>
                                    <c:otherwise>
                                        <img id="photoView" width="150px;" height="180px;" style="cursor:pointer; display: none;">
                                        <span id="photoViewText">등록된 증명사진이 없습니다.</span>
                                    </c:otherwise>
                                </c:choose>
                            </div>
                        </div>
                    </td>
                    <th>개인사진</th>
                    <td>
                        <div class="filebox">
                            <input type="hidden" id="myFileNo" name="myFileNo" value="${data.myImg.file_no}">
                            <div class="card-picture" style="padding-top: 0 !important; margin:0px; overflow: hidden; position: relative;">
                                <c:choose>
                                    <c:when test="${data.myImg.file_path ne null}">
                                        <input type="hidden" id="myFilePath" name="myFilePath" value="${data.myImg.file_path}">
                                        <input type="hidden" id="myFileName" name="myFileName" value="${data.myImg.file_uuid}">
                                        <img id="myPhotoView" width="150px;" height="180px;" src="${data.myImg.file_path}${data.myImg.file_uuid}">
                                    </c:when>
                                    <c:otherwise>
                                        <img id="myPhotoView" width="150px;" height="180px;" style="cursor:pointer; display: none;">
                                        <span id="myPhotoViewText">등록된 개인사진이 없습니다.</span>
                                    </c:otherwise>
                                </c:choose>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th colspan="2">결재사인</th>
                    <td colspan="4">
                        <div class="filebox">
                            <label for="signPhotoFile" class="k-button k-button-clear-info" style="vertical-align: bottom;margin:0; margin-top:13px;">파일 선택</label>
                            <span>결재사인 이미지는 150*150 크기입니다.</span>
                            <input type="file" id="signPhotoFile" onchange="viewSignPhoto(this)">
                        </div>
                    </td>
                </tr>
                <tr>
                    <th colspan="2">증명사진</th>
                    <td colspan="4">
                        <div class="filebox"> <%--style.css 파일 필드 숨기기--%>
                            <label for="idPhotoFile" class="k-button k-button-clear-info" style="vertical-align: bottom;margin:0; margin-top:13px;">파일 선택</label>
                            <span>증명사진 이미지는 150*150 크기입니다.</span>
                            <input type="file" id="idPhotoFile" name="idPhotoFile" onchange="viewPhoto(this)">
                        </div>
                    </td>
                </tr>
                <tr>
                    <th colspan="2">개인사진</th>
                    <td colspan="4">
                        <div class="filebox">
                            <input type="file">
                            <label for="myPhotoFile" class="k-button k-button-clear-info" style="vertical-align: bottom;margin:0; margin-top:13px;">파일 선택</label>
                            <span>개인사진 이미지는 110*110 크기입니다.</span>
                            <input type="file" id="myPhotoFile" onchange="viewMyPhoto(this)">
                        </div>
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
<script>
    userReqPop.defaultScript();


</script>
</body>
