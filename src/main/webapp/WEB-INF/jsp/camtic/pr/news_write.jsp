<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<jsp:include page="/WEB-INF/jsp/template/camtic/common.jsp" flush="false"/>
<script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js" integrity="sha512-VEd+nq25CkR676O+pLBnDW09R7VQX9Mdiij052gVCp5yVH3jGtH70Ho/UUv4mJDsEdTvqRCFZg0NKGiojGnUCw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.css" integrity="sha512-3pIirOrwegjM6erE5gPSwkUzO+3cTjpnV9lexlNZqvupR64iZBnOOTiiLPb9M36zpMScbmUNIcHUqKD47M719g==" crossorigin="anonymous" referrerpolicy="no-referrer" />
<script type="text/javascript" src="<c:url value='/js/intra/common/fCommon.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/ckEditor/ckeditor.js'/>"></script>

<script type="text/javascript" src="/lib/bootstrap/js/bootstrap.min.js"></script>
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
    .file-and-table-container {
        display: flex;
        margin-top: 50px;
        padding-top: 10px;
        border-top: 1px solid #c9c9c9;
    }
    .fileTable {
        width: 80%;
        border-collapse: collapse;
        margin : 0 0 0 20px;
    }
    .fileTable .fileTr .fileTh {
        border: 1px solid #ccc;
        padding: 5px;
    }
    .fileTable .fileTr .fileTh {
        background-color: #f2f2f2;
        text-align: center;
    }

    .__btn1 {
        min-width: 120px;
        height: 40px;
    }

    #title{
        margin-bottom: 0;
    }

	/*뉴스레터 게시판으로 인한 수정*/
    .filebox2 .__btn1 {
        min-width: 120px;
        height: 35px;
    }
    .filebox2 .addBtn .__btn1 {
        min-width: 70px;
        height: 35px;
    }
    .__boardView .con {
        font-size: 20px;
        padding-right: 5px;
    }

    .file-and-table-container2 {
	    width: 100%;
        margin-top: 10px;
        padding-top: 10px;
        border-top: 1px solid #c9c9c9;
    }

    .file-and-table-container2 .notStyle_div{
        display: flex;
        width: 100%;
        justify-content: space-between;
    }

    .file-and-table-container2 .linkInfo{
	    width: 100%;
        margin-top: 5px;
        padding-top: 5px;
    }

    [class*='__btn'].grayLine[disabled]{
        background: #e0e0e0;
    }

    /*툴팁 추가*/
    .custom-tooltip {
        position: relative;
    }
    .custom-tooltip div{
        border: 1px solid #ccc;
	    border-radius: 50%;
	    width:25px;
	    height:25px;
	    text-align: center;
	    display: flex;
	    justify-content: center;
	    align-items: center;
    }
    /* 툴팁 텍스트를 숨김 */
    .tooltip-text {
        display: none;
        position: absolute;
        top: 50%;
        right: calc(100% + 10px); /* 오른쪽으로 이동하도록 수정 */
        transform: translateY(-50%);
        background-color: white;
        color: #333;
        padding: 25px;
        border: 1px solid #ccc;
        border-radius: 5px;
        z-index: 1;
        max-width: 900px; /* 툴팁의 최대 너비 설정 */
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
        left: 100%;
        margin-top: -5px; /* 말풍선 위치 조정 */
        border-width: 5px;
        border-style: solid;
        border-color: transparent;
        border-right-color: #ccc; /* 말풍선 색상 설정 */
    }

</style>


<body>
<div id="wrap">
	<jsp:include page="/WEB-INF/jsp/template/camtic/head.jsp" flush="false"/>
	<div id="sub">
		<div class="inner">
			<jsp:include page="/WEB-INF/jsp/template/camtic/lnb.jsp" flush="false"/>
			<div id="content">

				<ul id="navigation">
					<li><a href="/camtic">홈으로</a></li>
					<li class="">홍보관</li>
					<li class=""><span class="categoryName"></span></li>
					<li class="">게시글 등록</li>
				</ul>
				<div id="title">
					<h3><span class="categoryName">뉴스레터</span></h3>
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
								<tr>
									<th>작성일자</th>
									<td>
										<input type="text" id="writeDate" class="inputText" value="" disabled/>
									</td>
								</tr>
								<%--<c:if test="${categoryId eq 'news'}">
									<tr style="border-top: 1px solid #ccc;">
										<th>해시태그</th>
										<td>
											<input type="text" id="hashText" class="inputText" placeholder="예시)#OOO#OOO2#OOO3" value="" />
										</td>
									</tr>
								</c:if>--%>

							</table>
						</div>
					</div>

					<div class="con">
						<textarea class="txt_area_01" id="contents"></textarea>

						<form>
							<div class="file-and-table-container">
								<div><span id="textMod">표지</span></div>
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
										<td colspan="4" style="text-align: center">선택된 파일이 없습니다.</td>
									</tr>
									</tbody>
								</table>
								<div>
									<div class="filebox">
										<button type="button" class="fileUpload k-grid-button k-button k-button-md k-button-solid k-button-solid-base" id="fileUpload" onclick="$('#fileList').click()" >
											<span class="__btn1 grayLine">이미지 첨부</span>
										</button>
										<input type="file" id="fileList" name="fileList" onchange="fCommon.addFileInfoTable();" style="display: none"/>
									</div>
								</div>
							</div>
						</form>

						<form id="linkTbl">
							<div class="file-and-table-container2" id="linkDiv1" name="linkDiv" data-number="1">
								<div class="notStyle_div">
									<span>링크 생성</span>


									<a href='javascript:void(0)' class="custom-tooltip">
										<div style=""><span>?</span></div>
										<span class="tooltip-text" style="width: 370px;">
		                                    <strong>링크 생성 안내</strong><br>
		                                    1. 그룹 생성 버튼 클릭(최초 1회)<br>
		                                    2. 링크 생성<br>
											3. 복사 후 원하는 a태그의 href에<br>
											복사 된 내용 삽입<br>
											3-1. 링크 생성 상단 에디터 내용이<br>
											링크의 목적지가 된다.<br>
											4. 추가 후 위 내용 반복
                                        </span>
									</a>
								</div>

								<textarea class="txt_area_01" id="contents1"></textarea>

								<div class="linkInfo">
									<div class="filebox2">
										└&nbsp;
										<input type="text" id="groupKey" name="groupKey" style="width: 10%;margin: 0 5px 0 5px;text-align:center;" value="" readonly />
										<button type="button" class="fileUpload k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="groupKeyCreate()">
											<span class="__btn1 grayLine">그룹 생성</span>
										</button>

										<input type="hidden" id="linkKey1" value="" />
										<input type="text" id="linkText1" name="linkText" style="width: 50%; margin: 0 5px 0 5px;" value="" readonly />
										<button type="button" id="groupFlag1" class="fileUpload k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="linkCreate(1)">
											<span class="__btn1 grayLine">링크 생성</span>
										</button>
										<button type="button" id="groupFlag2" class="addBtn"  onclick="addLinkDiv()">
											<span class="__btn1 grayLine">추가</span>
										</button>
									</div>
								</div>
							</div>
						</form>

					</div>

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

	var groupKey;
    var groupFlag = false;
	var num = 1;
	var totalNum = 1;

    $(function () {
        let today = new Date();

        let year = today.getFullYear();
        let month = today.getMonth() + 1;
        let date = today.getDate();
        let formattedMonth = String(month).padStart(2, '0');
        let formattedDay = String(date).padStart(2, '0');

        //$("#writeDate").val(year + "년 " + month + "월 " + date + "일");
        $("#writeDate").val(year + "-" + formattedMonth + "-" + formattedDay);

        CKEDITOR.replace('contents', {
            height: 250
        });

        CKEDITOR.replace('contents1', {
            weight: 700,
            height: 200
        });

        $("#groupFlag1").attr("disabled", true);
        $("#groupFlag2").attr("disabled", true);

        $("#groupFlag1 span").attr("disabled", "disabled");
        $("#groupFlag2 span").attr("disabled", "disabled");

        $("[data-toggle='tooltip']").tooltip();
    });

	//링크 테이블 추가
    function addLinkDiv(){
        if(!$("#groupKey").val()){
            alert("그룹을 생성해주세요.");
            return false;
        }
        var parentElementId = "linkTbl";
        var lastChild = $("#" + parentElementId).children().last();

        var number = lastChild.data("number");

        let group = groupKey;

        num += 1;
		totalNum += 1;

        if(number == num){
            num += 1;
        }

        let html = "";

        html += '<div class="file-and-table-container2" id="linkDiv'+num+'" name="linkDiv" data-number="'+num+'">';
			html += '<div class="linkInfo">';
		        html += '<div class="filebox2">';
				    html += '└&nbsp;<input type="text" id="groupKey" name="groupKey" style="width: 10%;margin: 0 5px 0 5px;text-align:center;" value="'+group+'" readonly />';
				    html += '<button type="button" class="fileUpload k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="groupKeyCreate()" disabled>';
				    html += '<span class="__btn1 grayLine">그룹 번호</span></button>';

                    html += '<input type="hidden" id="linkKey'+num+'" value="" />';
					html += '<input type="text" id="linkText'+num+'" name="linkText" style="width: 50%; margin: 0 5px 0 5px;" value="" readonly />';
                    html += '<button type="button" class="fileUpload k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="linkCreate('+num+')">';
                    html += '<span class="__btn1 grayLine">링크 생성</span></button>';
			        html += '<button type="button" class="addBtn" onclick="delLinkDiv('+num+')" >';
			        html += '<span class="__btn1 grayLine" style="margin-left: 4px;">삭제</span></button>';
				html += '</div>';
			html += '</div>';
	    html += '</div>';

        $("#linkTbl").append(html);

        let editorId = 'contents' + num;

        $('<textarea>', {
            id: editorId,
            class: 'txt_area_01',
        }).prependTo('#linkDiv' + num);

        CKEDITOR.replace(editorId, {
            weight: 700,
            height: 200
        });
    }

    //링크 테이블 삭제
    function delLinkDiv(number){
		num -= 1;
		totalNum += 1;

        $("#linkDiv" + number).remove();
    }

    //그룹 생성
    function groupKeyCreate(){
        if(groupFlag){alert("그룹은 최초 1회만 생성 가능합니다."); return false;}

        let random = new Date().getTime().toString(36);

        $("#groupKey").val(random);
        groupKey = random;
        groupFlag = true;

        $("#groupFlag1").attr("disabled", false);
        $("#groupFlag1 span").removeAttr("disabled");

        $("#groupFlag2").attr("disabled", false);
        $("#groupFlag2 span").removeAttr("disabled");
    }
    //링크 생성
    function linkCreate(num){
        if(!groupFlag){alert("그룹을 생성해주세요."); return false; }

		let random = new Date().getTime().toString(16);

        $("#linkKey" + num).val(random);
        //$("#linkText" + num).val('onclick="openPopup("'+ groupKey +'","' +random + '")"');
        $("#linkText" + num).val('javascript:openPopup('+ groupKey +',' +random + ')');

        if(document.getElementById("copyBtn" + num)){
        }else{
            let html = '<button type="button" id="copyBtn'+num+'" onclick="copyBtn('+num+')"><img src="/images/nav.png" style="background: white" alt="복사"></button>';
            $("#linkText" + num).after(html);
        }



    }

    //링크 복사
    function copyBtn(num) {
        let text = $("#linkText" + num).val();

        const copy = (text) => {
            // 임시의 textarea 생성
            const $textarea = document.createElement("textarea");

            // body 요소에 존재해야 복사가 진행됨
            document.body.appendChild($textarea);

            // 복사할 특정 텍스트를 임시의 textarea에 넣어주고 모두 셀렉션 상태
            $textarea.value = text;
            $textarea.select();

            // 복사 후 textarea 지우기
            document.execCommand('copy');
            document.body.removeChild($textarea);
        }
        copy(text);
        toastr.success('복사완료');
    }

    function fn_goList(){

        location.href = '/camtic/pr/new.do';
    }


    //저장
    function fn_saveNotice(){
        var content = CKEDITOR.instances.contents.getData();
        var saveFlag = false;

        if($("#noticeTitle").val() == ""){
            alert("제목을 입력해주세요.");
            return false;
        }
        if(content == ""){
            alert("내용을 입력해주세요.");
            return false;
        }

        var formData = new FormData();

        formData.append("boardId", "news");
        formData.append("boardCategoryId", "news");
        formData.append("menuCd", "news");
        formData.append("noticeTitle", $("#noticeTitle").val());
        formData.append("writer", $("#writer").val().toString());
        formData.append("content", content);
        formData.append("num", totalNum);
        formData.append("groupKey", $("#groupKey").val());

        if(fCommon.global.attFiles.length != 0){
            if(fCommon.global.attFiles.length > 1){
                alert("첨부 이미지는 1개만 업로드 가능합니다..");
                return false;
            }

            //첨부파일
            if(fCommon.global.attFiles[0].name.split(".")[1] == "png" || fCommon.global.attFiles[0].name.split(".")[1] == "jpg") {
            }else{
                alert("파일 확장자를 확인해주세요. \n jpg, png 확장자만 업로드 가능합니다.");
                return false;
            }
            formData.append("boardFile", fCommon.global.attFiles[0]);
        }

        /*for(var x=1; x <= num; x++){
            var instanceName = "linkText" + x;
            var instanceName2 = "linkKey" + x;
            var instanceLink = $("#" + instanceName).val();
            var instanceLinkKey = $("#" + instanceName2).val();

            if(instanceLink == ""){
                $("#" + instanceName).focus();
                alert("링크를 생성해주세요.");
                return false;
            }

            formData.append(instanceName, instanceLink);
            formData.append(instanceName2, instanceLinkKey);
        }

        for(var x=1; x <= num; x++){
            var instanceName = "contents" + x;

            var instanceContent = CKEDITOR.instances[instanceName].getData();
            console.log(instanceContent);
            formData.append(instanceName, instanceContent);
        }*/

		var cnt = 0;
		$("div[name='linkDiv']").each(function(){
			cnt += 1;
			let number = $(this).data("number");

			var instanceLinkKey = "linkText" + cnt;
			var instanceLinkKey2 = "linkKey" + cnt;
			var instanceLinkValue = $("#linkText" + number).val();
			var instanceLinkValue2 = $("#linkKey" + number).val();

			if(instanceLinkValue == ""){
				$("#" + instanceLinkKey).focus();
				linkFlag = false;
				return false;
			}

			formData.append(instanceLinkKey, instanceLinkValue);
			formData.append(instanceLinkKey2, instanceLinkValue2);

			var instanceContentKey = "contents" + cnt;
			var instanceContent = "contents" + number;
			var instanceContentValue = CKEDITOR.instances[instanceContent].getData();

			formData.append(instanceContentKey, instanceContentValue);
		});

        console.log("총 링크 수 ::" + num);
        if(!confirm("게시글을 등록하시겠습니까?")) {return false;}

        $.ajax({
            url : '/camtic/news/insNews.do',
            type : 'POST',
            data: formData,
            dataType : "json",
            contentType: false,
            processData: false,
            enctype : 'multipart/form-data',
            async : false,
            success: function() {

                location.href = '/camtic/pr/news.do';
            }
        });


    }

</script>
</body>
</html>
