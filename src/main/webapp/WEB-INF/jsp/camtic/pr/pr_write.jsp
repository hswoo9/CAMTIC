<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<jsp:include page="/WEB-INF/jsp/template/camtic/common.jsp" flush="false"/>
<script type="text/javascript" src="<c:url value='/js/intra/common/fCommon.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/ckEditor/ckeditor.js'/>"></script>
<style>
	input[type="text"] {
		width: 50%;
		height: 34px;
		display: inline-block;
		background: none;
		border: 1px solid #c9c9c9;
		padding-left: 5px;
		margin-bottom: 5px;
		font-size: 14px;
	}
	.txt_area_01 {display: inline-block; width: 100%; height: 170px; border: 1px solid #c9c9c9; }

	table th{
		width : 10%;
		text-align: left;
	}
	/* margin,padding 숨김 2023-10-30 김병수*/
	.file-and-table-container {
		display: flex;
		/*margin-top: 50px;
        padding-top: 10px;
        border-top: 1px solid #c9c9c9;*/
	}
	.fileTable {
		width: 80%;
		border-collapse: collapse;
		/*margin : 0 0 0 20px;*/
	}
	.fileTable .fileTr .fileTh {
		border: 1px solid #ccc;
		padding: 5px;
	}
	.fileTable .fileTr .fileTh {
		background-color: #f2f2f2;
		text-align: center;
	}

	/* 버튼 수정 2023-10-30 김병수 */
	.__btn1 {
		min-width: 85px;
		height: 38px;
		font-size: 15px;
	}

	/* 파일첨부 버튼 수정 2023-10-30 김병수 */
	#fileUpload .__btn1 {
		min-width: 90px;
		height: 26px;
		padding: 0;
		font-size: 15px;
	}

	#title{
		margin-bottom: 0;
	}

	/* 2023-11-20 김병수 radio 버튼 css추가 */
	.__lab {display:inline-flex;gap:0.2rem;align-items:center;position:relative;}
	.__lab span{font-weight: normal;}
	input[type="radio"] {appearance: auto;-webkit-appearance: auto;-moz-appearance: auto;display: inline-block;box-sizing: border-box;margin: 0;font-size: inherit;line-height: normal;color: inherit;}

</style>


<body>
<div id="wrap">
	<jsp:include page="/WEB-INF/jsp/template/camtic/head.jsp" flush="false"/>
	<div id="sub">
		<div class="inner">
			<jsp:include page="/WEB-INF/jsp/template/camtic/lnb.jsp" flush="false"/>
			<div id="content">

				<ul id="navigation">
					<li><a href="/camtic"><img src="/images/camtic/home_1.png" class="homeImage">홈으로</a></li>
					<li class="">홍보관</li>
					<li class=""><span class="categoryName"></span></li>
					<li class="">게시글 등록</li>
				</ul>
				<div id="title">
					<h3><span class="categoryName"></span></h3>
				</div>

				<div class="__boardView">
					<div class="head">
						<div>
							<table style="line-height: 60px;">
								<tr style="border-bottom: 1px solid #ccc;">
									<th>제목</th>
									<td>
										<input type="text" id="noticeTitle" class="inputText" value="" />
									</td>
								</tr>
								<tr style="border-bottom: 1px solid #ccc;">
									<th>작성자</th>
									<td>
										<input type="text" id="writer" class="inputText" value="관리자" disabled/>
									</td>
								</tr>
								<c:if test="${categoryId eq 'sns'}">
									<tr style="border-bottom: 1px solid #ccc;">
										<th>SNS 유형</th>
										<td colspan="2">
											<label class="__lab">
												<input type="radio" id ="snsFaceBook" name="snsType" value="1" checked >
												<i></i><span>페이스북</span>
											</label>
											<label class="__lab" style="margin-left:10px;">
												<input type="radio" id ="snsInstaGram" name="snsType" value="2">
												<i></i><span>인스타그램</span>
											</label>
										</td>
									</tr>
									<tr style="border-bottom: 1px solid #ccc;">
										<th>SNS 링크 주소</th>
										<td>
											<input type="text" id="snsUrl" class="inputText" placeholder="링크 주소를 입력해주세요." value="" />
										</td>
									</tr>
								</c:if>
								<tr style="border-bottom: 1px solid #ccc;">
									<th>작성일자</th>
									<td>
										<input type="text" id="writeDate" class="inputText" value="" disabled/>
									</td>
								</tr>
								<c:if test="${categoryId eq 'video'}">
									<tr style="border-bottom: 1px solid #ccc;">
										<th>유튜브 주소(URL)</th>
										<td>
											<input type="text" id="urlText" class="inputText" placeholder="재생중인 페이지의 주소를 입력해주세요." value="" />
										</td>
									</tr>
								</c:if>
								<c:if test="${categoryId eq 'news'}">
									<tr style="border-top: 1px solid #ccc;">
										<th>해시태그</th>
										<td>
											<input type="text" id="hashText" class="inputText" placeholder="예시)#OOO#OOO2#OOO3" value="" />
										</td>
									</tr>
								</c:if>
								<tr style="border-bottom: 1px solid #ccc;">
									<th>내용</th>
									<td style="padding: 15px 0 15px 0;">
										<c:choose>
											<c:when test="${categoryId eq 'video'}">
											</c:when>
											<c:otherwise>
												<textarea class="txt_area_01" id="contents"></textarea>
											</c:otherwise>
										</c:choose>
									</td>
								</tr>
								<tr>
									<th><span id="textMod">첨부파일</span></th>
									<td style="line-height : 1;padding: 15px 0 15px 0;">
										<form>
											<div class="file-and-table-container">
												<table class="fileTable" style="width: 40%; margin-right: 15px;">
													<colgroup>
														<col width="50%">
														<col width="10%">
														<col width="30%">
														<col width="10%">
													</colgroup>
													<thead>
													<tr class="fileTr">
														<th class="fileTh">파일명</th>
														<th class="fileTh">확장자</th>
														<th class="fileTh">용량</th>
														<th class="fileTh">기타</th>
													</tr>
													</thead>
													<tbody id="fileGrid">
													<tr class="defultTr">
														<td colspan="4" style="text-align: center;padding-top: 10px;">선택된 파일이 없습니다.</td>
													</tr>
													</tbody>
												</table>
												<div>
													<div class="filebox">
														<button type="button" class="fileUpload k-grid-button k-button k-button-md k-button-solid k-button-solid-base" id="fileUpload" onclick="$('#fileList').click()" >
															<span class="__btn1 grayLine">파일첨부</span>
														</button>
														<input type="file" id="fileList" name="fileList" onchange="fCommon.addFileInfoTable();" style="display: none"/>
													</div>
												</div>
											</div>
										</form>
									</td>
								</tr>
							</table>
						</div>
					</div>
					<!-- <dl class="file">
					    <dt><span>첨부파일</span></dt>
					    <dd>
						<p><a href="#">파일명이 노출됩니다.hwp</a></p>
						<p><a href="#">파일명이 노출됩니다.hwp</a></p>
						<p><a href="#">파일명이 노출됩니다.hwp</a></p>
					    </dd>
					</dl> -->
					<div class="__botArea">
						<div class="rig">
							<a href="javascript:void(0);" onclick="fn_goList();" class="__btn1 grayLine"><span>목록보기</span></a>
							<a href="javascript:void(0);" onclick="fn_saveNotice();" class="__btn1 grayLine"><span>등록하기</span></a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<jsp:include page="/WEB-INF/jsp/template/camtic/foot.jsp" flush="false"/>
</div>

<input type="hidden" id="category" value="${categoryId}" />
<script>
	var categoryId = $("#category").val();

	$(function () {
		let today = new Date();

		let year = today.getFullYear();
		let month = today.getMonth() + 1;
		let date = today.getDate();
		let formattedMonth = String(month).padStart(2, '0');
		let formattedDay = String(date).padStart(2, '0');

		//$("#writeDate").val(year + "년 " + month + "월 " + date + "일");
		$("#writeDate").val(year + "-" + formattedMonth + "-" + formattedDay);

		if(categoryId != 'video'){
			CKEDITOR.replace('contents', {
				height: 250
			});
		}

		if(categoryId == "photo"){
			$(".categoryName").text("포토뉴스");
		}else if(categoryId == "report"){
			$(".categoryName").text("보도자료");
		}else if(categoryId == "news"){
			$(".categoryName").text("뉴스레터");
		}else if(categoryId == "video"){
			$(".categoryName").text("홍보영상");
		}else if(categoryId == "sns"){
			$(".categoryName").text("SNS");
		}

		if(categoryId == "photo" || categoryId == "video" || categoryId == "news" || categoryId =="sns"){
			$("#textMod").text("표지");
			$("#fileUpload span").text("이미지 첨부");
		}else if(categoryId == "report") {
			$("#textMod").text("첨부 이미지");
			$("#fileUpload span").text("이미지 첨부");
		}
	});

	function fn_goList(){

		location.href = '/camtic/pr/'+categoryId+'.do';
	}

	function fn_saveNotice(){
		if(categoryId != "video"){
			var content = CKEDITOR.instances.contents.getData();
		}else{
			if($("#urlText").val() == ""){
				alert("유튜브 주소(URL)을 입력해주세요.");
				return false;
			}
		}
		/*var data = {
      boardId : categoryId,
      boardCategoryId : categoryId,
      noticeTitle : $("#noticeTitle").val(),
      writer : $("#writer").val().toString(),
      content : content
    }*/

		if($("#noticeTitle").val() == ""){
			alert("제목을 입력해주세요.");
			return false;
		}

		if(content == "" && categoryId != "video"){
			alert("내용을 입력해주세요.");
			return false;
		}

		if(categoryId == "news"){
			if($("#hashText").val() == ""){
				alert("해시태그를 입력해주세요.");
				return false;
			}
		}

		var formData = new FormData();
		var snsType = $("input[name='snsType']:checked").val();

		formData.append("boardId", categoryId);
		formData.append("boardCategoryId", categoryId);
		formData.append("menuCd", categoryId);
		formData.append("noticeTitle", $("#noticeTitle").val());
		formData.append("writer", $("#writer").val().toString());
		formData.append("content", content);
		formData.append("urlText", $("#urlText").val());
		formData.append("hashText", $("#hashText").val());
		formData.append("snsType", snsType);
		formData.append("snsUrl", $("#snsUrl").val());

		if(fCommon.global.attFiles.length != 0){
			if(fCommon.global.attFiles.length > 1){
				alert("첨부 이미지는 1개만 업로드 가능합니다..");
				return false;
			}
			console.log(fCommon.global.attFiles);
			//첨부파일
			if(fCommon.global.attFiles[0].name.split(".")[1] == "png" || fCommon.global.attFiles[0].name.split(".")[1] == "jpg") {
			}else{
				alert("파일 확장자를 확인해주세요. \n jpg, png 확장자만 업로드 가능합니다.");
				return false;
			}
			formData.append("boardFile", fCommon.global.attFiles[0]);
		}

		if(!confirm("게시글을 등록하시겠습니까?")) {return false;}

		$.ajax({
			url : '/camtic/news/insNotice.do',
			type : 'POST',
			data: formData,
			dataType : "json",
			contentType: false,
			processData: false,
			enctype : 'multipart/form-data',
			async : false,
			success: function() {

				location.href = '/camtic/pr/'+categoryId+'.do';
			}
		});
	}

</script>
</body>
</html>
