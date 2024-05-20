<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<c:set var="now" value="<%= new java.util.Date() %>" />
<fmt:formatDate value="${now}" var="now" pattern="yyyy-MM-dd" />
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/mngr/bannerpopup/popupWrite.js?v=${toDate}"></script>
<body class="font-opensans" style="background-color:#fff;">
<style>

    .custom-tooltip {
        position: relative;
    }
    /* 툴팁 텍스트를 숨김 */
    .tooltip-text {
        display: none;
        position: absolute;
        top: 50%;
        left: calc(100% + 10px); /* 오른쪽으로 이동하도록 수정 */
        transform: translateY(-50%);
        background-color: white;
        color: #333;
        padding: 25px;
        border: 1px solid #ccc;
        border-radius: 5px;
        z-index: 1;
        max-width: 345px; /* 툴팁의 최대 너비 설정 */
    }
    /* 아이콘에 호버 시 툴팁 텍스트 표시 */
    .custom-tooltip:hover .tooltip-text {
        display: block;
    }
    /* 말풍선 모양 스타일 */
    .tooltip-text::before {
        content: "";
        position: absolute;
        top: 50%;
        right: 100%;
        margin-top: -5px; /* 말풍선 위치 조정 */
        border-width: 5px;
        border-style: solid;
        border-color: transparent;
        border-left-color: #ccc; /* 말풍선 색상 설정 */
    }

    #clock{color: grey; display:inline; margin-left:5px; font-size: 1.7rem; margin-left:10px;}
</style>


<div class="table-responsive">
	<div class="card-header pop-header">
		<c:if test="${mode eq 'write'}">
			<h3 class="card-title title_NM">팝업등록</h3>
		</c:if>
		<c:if test="${mode eq 'update'}">
			<h3 class="card-title title_NM">팝업수정</h3>
		</c:if>
		<div class="btn-st popButton">
            <span id="apprBtnBox">

            </span>
			<button type="button" class="k-button k-button-solid-info" id="modBtn" onclick="popupWrite.setPopupWrite();">저장</button>
			<button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">닫기</button>
		</div>
	</div>

	<form id="popupWritePop" style="padding: 20px 30px;">
		<table class="popTable table table-bordered mb-0">
			<colgroup>
				<col width="20%">
				<col width="">
			</colgroup>
			<thead>
			<tr>
				<th><span class="red-star">*</span>시작일시</th>
				<td>
					<input id="startDt" style="width: 20%"> <input id="startTime" style="width: 13%">
					<input type="hidden" id="returnStartDt" value="${map.bannerPopupStartDt}">
					<input type="hidden" id="returnStartDay" value="${map.startDay}" />
					<input type="hidden" id="returnStartTime" value="${map.startTime}" />
					<span style="font-size: 14px;"><p id="clock"></p> 이후로 설정 시 자동예약</span>
				</td>
			</tr>
			<tr>
				<th><span class="red-star">*</span>종료일시</th>
				<td>
					<input id="endDt" style="width: 20%"> <input id="endTime" style="width: 13%">
					<input type="hidden" id="returnEndDt" value="${map.bannerPopupEndDt}">
					<input type="hidden" id="returnEndDay" value="${map.endDay}" />
					<input type="hidden" id="returnEndTime" value="${map.endTime}" />
				</td>
			</tr>
			<tr>
				<th><span class="red-star">*</span>출력여부</th>
				<td>
					<label class="__lab">
						<input type="radio" id="chkUseAt0" name="chkUseAt" value="0">
						<i></i><span>출력</span>
					</label>

					<label class="__lab">
						<input type="radio" id="chkUseAt1" name="chkUseAt" value="1">
						<i></i><span>출력안함</span>
					</label>
				</td>
			</tr>
			<tr>
				<th><span class="red-star">*</span>출력형식
					<a href='#' class="custom-tooltip" style="color:#337ab7">
						<i class="fa fa-lg fa-info-circle"></i>
						<span class="tooltip-text" style="width: 345px; text-align: left;">
	                        <strong>팝업 사이즈 안내</strong><br>
	                            홈페이지에 등록되는 고정 형식은<br>
	                            400 x 360 사이즈가 적당합니다.<br>
	                            팝업 형식의 세로는 500px의 이미지가 적당합니다.
                        </span>
					</a>
				</th>
				<td>
					<label class="__lab">
						<input type="radio" id="chkGubun0" name="chkGubun" value="0">
						<i></i><span>레이어형식</span>
					</label>

					<label class="__lab">
						<input type="radio" id="chkGubun1" name="chkGubun" value="1"/>
						<i></i><span>팝업형식</span>
					</label>
				</td>
			</tr>
			<tr>
				<th>팝업창 크기
					<a href='#' class="custom-tooltip" style="color:#337ab7">
						<i class='fa fa-lg fa-info-circle'></i>
						<span class="tooltip-text" style="width: 345px; text-align: left;">
                            <strong>팝업 이미지 안내</strong><br>
                            홈페이지는 1920x1080에 최적화 되어 있습니다.<br>
                        </span>
					</a>
				</th>
				<td>
					<span style="margin-right:10px; width: 70px; text-align: center;">가로</span>
					<input type="text" style="width:20%;" id="bannerPopupWidth" value="${map.bannerPopupWidth}" onkeyup="this.value=this.value.replace(/[^0-9]/g,'');" maxlength="4"/>px
					<span style="margin-right:10px; margin-left:30px; width: 70px; text-align: center;">세로</span>
					<input type="text" style="width:20%;" id="bannerPopupHeight" value="${map.bannerPopupHeight}" onkeyup="this.value=this.value.replace(/[^0-9]/g,'');" maxlength="4"/>px
				</td>
			</tr>
			<tr>
				<th>팝업창 위치</th>
				<td>
					<span style="margin-right:10px; width: 70px; text-align: center;">위쪽여백</span>
					<input type="text" style="width:20%;" id="bannerPopupTop" value="${map.bannerPopupTop}" onkeyup="this.value=this.value.replace(/[^0-9]/g,'');" maxlength="4"/>px
					<span style="margin-right:10px; margin-left:30px;">왼쪽여백</span>
					<input type="text" style="width:20%;" id="bannerPopupLeft" value="${map.bannerPopupLeft}" onkeyup="this.value=this.value.replace(/[^0-9]/g,'');" maxlength="4"/>px
				</td>
			</tr>
			<tr>
				<th>링크주소</th>
				<td>
					<input type="text" id="bannerPopupLink" name="bannerPopupLink" value="${map.bannerPopupLink}" maxlength="200" style="width:80%;"/>
					<input type="text" id="bannerPopupTarget" name="bannerPopupTarget" style="width:15%;"/>
				</td>
			</tr>
			<tr>
				<th><span class="red-star">*</span>팝업창 제목</th>
				<td>
					<input type="text" id="bannerPopupTitle" name="bannerPopupTitle" value="${map.bannerPopupTitle}" maxlength="30" style="width:100%;" />
				</td>
			</tr>
			<tr>
				<th><span class="red-star">*</span>팝업내용<br>
<%--					<button class="k-button k-button-solid-base" style="margin-top:5px;width:117px;height:43px;font-size:15px;" onclick="popupWrite.previewPopup()">미리 보기</button>--%>
				</th>
				<td>
					<div class="__file">
						<c:choose>
							<c:when test="${!empty fileMap}">
								<input type="text" id="inputFile" name="inputFile" style="width: 55%; cursor: pointer;" onclick="popupWrite.fileDown('${fileMap.BANNER_POPUP_FILE_PATH}${fileMap.BANNER_POPUP_FILE_MASK}','${fileMap.BANNER_POPUP_FILE_NAME}.${fileMap.BANNER_POPUP_FILE_EXTENTION}')" value="${fileMap.BANNER_POPUP_FILE_NAME}.${fileMap.BANNER_POPUP_FILE_EXTENTION}" />
								<button type="button" class="file k-button k-button-solid-base" onclick="$('#files').click()">파일선택</button>
							</c:when>
							<c:otherwise>
								<input type="text" id="inputFile" name="inputFile" style="width: 55%;" placeholder="팝업이미지는 미리 크기를 정해주세요. jpg/png 확장자만 가능" value="" readonly/>
								<button type="button" class="file k-button k-button-solid-base" onclick="$('#files').click()">파일선택</button>
							</c:otherwise>
						</c:choose>
					</div>
					<input type="file" id="files" name="files" style="display: none;">
					<div id="previewDiv" style="width: 200px; height: 200px; border: 1px solid #acacac; margin-top:10px;">
						<c:choose>
							<c:when test="${!empty fileMap}">
								<img id="preview" src="${fileMap.BANNER_POPUP_FILE_PATH}${fileMap.BANNER_POPUP_FILE_MASK}"/>
							</c:when>
							<c:otherwise>
								<img id="preview"/>
							</c:otherwise>
						</c:choose>
					</div>
				</td>
			</tr>
			</thead>
		</table>
	</form>
</div>
<input type="hidden" id="regEmpSeq" value="${loginVO.uniqId}">
<input type="hidden" id="uuid" value="${map.uuid}">
<input type="hidden" id="returnUseAt" value="${map.useAt}">
<input type="hidden" id="returnGubun" value="${map.bannerPopupGubun}">
<input type="hidden" id="returnTarget" value="${map.bannerPopupTarget}">
<input type="hidden" id="mode" value="${mode}">
<script>
    popupWrite.fn_defaultScript();
</script>
