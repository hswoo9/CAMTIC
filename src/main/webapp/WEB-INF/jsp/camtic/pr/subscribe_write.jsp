<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<jsp:include page="/WEB-INF/jsp/template/camtic/common.jsp" flush="false"/>
<script type="text/javascript" src="<c:url value='/js/intra/common/fCommon.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/ckEditor/ckeditor.js'/>"></script>
<style>
    input[type="text"], input[type="datetime-local"]{
        width: 50%;
        height: 34px;
        display: inline-block;
        background: none;
        border: 1px solid #c9c9c9;
        padding-left: 5px;
        margin-bottom: 5px;
        font-size: 15px;
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

    /*뉴스레터 구독신청 약관동의 css 추가*/
    .int01_01_wrap {
        overflow: hidden;
        padding: 15px 0 0 0;
    }
    fieldset {
        margin: 0;
        border: 0 none;
        outline: none;
        vertical-align: middle;
    }
    .join_title02 {
        height: 20px;
        padding: 0 0 15px 0;
        font-weight: bold;
        font-size: 16px;
        color: #008bf1;
        letter-spacing: -1px;
        background-size: 16px auto;
    }
    .h150p {
        height: 150px;
    }
    .textarea_form {
        /*width: calc(100% - 32px);*/
        min-height: 50px;
        background-color: #ffffff;
        padding: 15px;
        border: 1px solid #aaaaaa;
        overflow-x: hidden;
    }
    .join_agree_check {
        text-align: right;
        padding: 15px 0 0 0;
        font-size: 1.1em;
    }
    input[type="checkbox"], input[type="radio"] {
        width: 17px;
        height: 17px;
        line-height: 17px;
        box-sizing: border-box;
    }

    .join_agree {
        padding: 0 0 40px 0px;
    }

    .head input[type=checkbox] { -webkit-appearance: checkbox; }
    .head input[type=checkbox]:before { display: none; }
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
					<li class="">캠틱소식</li>
					<li class="">뉴스레터 구독 신청</li>
					<li class="">게시글 등록</li>
				</ul>
				<div id="title">
					<h3>뉴스레터</h3>
				</div>

				<div class="__boardView">
					<div class="head">
						<fieldset class="int01_01_wrap">
							<br>
							<div class="join_title02">개인정보 수집·이용 동의</div>
							<div>
								<div class="textarea_form h150p">
									<b>개인정보의 수집 및 이용 동의</b>
									<br>
									1. 개인정보의 수집·이용 목적<br>
									법인의 교육 및 행사 안내, 사업안내·수요조사 등의 정보제공, 개발사업 참여에 대한 홍보, 소식지·경영뉴스레터 등의 정보제공 및 홍보 활용을 목적으로 한다.<br>
									<br>
									2. 수집·이용하려는 개인정보의 항목
									<br>
									성명, 이메일, 소속<br>
									<br>
									3. 개인정보의 보유 및 이용 기간<br>
									구독해지 요청시까지 계속 관리<br>
									<br>
									4. 기타사항
									<br>
									법인에서는 개인정보를 수집된 목적 범위에서 적합하게 처리하고 목적 외의 용도로 사용하지 않으며 개인정보를 제공한 제공자는 언제나 자신이 입력한 개인정보의 열람·수정을 신청할 수 있고 수집된 개인정보는 개인정보보호를 위하여 암호화되어 처리된다.<br>
									상기사항에 명기되지 않은 사항은 개인정보보호법 및 표준 개인정보 보호지침에 의거하여 관리한다.<br>
									<br>
								</div>
								<div class="join_agree_check">
									<input id="chkConfirm1" type="checkbox" name="chkConfirm1"><label for="chkConfirm1"> 개인정보 수집 및 이용에 동의합니다.</label>
								</div>
							</div>
						</fieldset>

						<fieldset class="join_agree">
							<div class="join_title02">정보제공 및 홍보활용 동의</div>
							<div>
								<div class="textarea_form h100p">
									<b>개인정보의 수집 및 이용 동의</b>
									<br>
									교육 및 행사 안내, 사업안내·수요조사 등의 정보제공, 개발사업 참여에 대한 홍보, 소식지·경영뉴스레터 등의 정보제공·홍보 활용에 대해 아래와 같이 동의합니다.
								</div>
								<div class="join_agree_check">
									<input id="chkConfirm2" type="checkbox" name="chkConfirm2" style="margin-right: 5px;"><label for="chkConfirm2">정보제공 및 홍보활용에 동의합니다.</label>
								</div>
							</div>
						</fieldset>
					</div>

					<div class="con">
						<div>
							<table style="line-height: 60px;">
								<tr style="border-bottom: 1px solid #ccc;">
									<th>이름</th>
									<td>
										<input type="text" id="applicant" class="inputText" value="" />
									</td>
								</tr>
								<tr style="border-bottom: 1px solid #ccc;">
									<th>이메일</th>
									<td>
										<input type="text" id="email" class="inputText" value="" />
									</td>
								</tr>
								<tr style="border-bottom: 1px solid #ccc;">
									<th>소속</th>
									<td>
										<input type="text" id="belong" class="inputText" value="" />
									</td>
								</tr>
							</table>
						</div>
					</div>

					<div class="__botArea">
						<div class="rig">
							<a href="javascript:void(0);" onclick="fn_saveSubscribe();" class="__btn1 grayLine"><span>뉴스레터 구독 신청</span></a>
							<a href="javascript:void(0);" onclick="fn_cancleSubscribe();" class="__btn1 grayLine"><span>뉴스레터 구독 취소</span></a>
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

    });

    function fn_goList(){

        location.href = '/camtic/pr/news.do';
    }

    function fn_saveSubscribe(){
		var dataChk = true;

        var confirm1 = 'N';
        var confirm2 = 'N';

        if(!$('#chkConfirm1').is(':checked')){
            alert("개인정보 수집 및 이용에 동의하셔야만 구독신청이 가능합니다.");
            return false;
        }else{
            confirm1 = 'Y';
        }

        if($('#chkConfirm2').is(':checked')){
            confirm2 = 'Y';
        }

        if($("#applicant").val() == ""){
            alert("이름을 입력해주세요.");
            return false;
        }
        if($("#email").val() == ""){
            alert("이메일을 입력해주세요.");
            return false;
        }

        var data = {
            applicant : $("#applicant").val().toString(),
            email : $("#email").val(),
            belong : $("#belong").val(),
            confirm1 : confirm1,
            confirm2 : confirm2
        }

        $.ajax({
            url : '/camtic/news/getSubscribeChk.do',
            type : 'POST',
            data: data,
            dataType : "json",
            async : false,
            success: function(e) {
                if(e.map.chk == 1){
                    dataChk = false;
                }
            }
        });

        if(!dataChk){
           alert("현재 해당 이메일에 구독신청이 되어있습니다.");
           return false;
        }

        if(!confirm("구독 신청을 완료하시겠습니까?")) {return false;}

        $.ajax({
            url : '/camtic/news/insSubscribe.do',
            type : 'POST',
            data: data,
            dataType : "json",
            async : false,
            success: function() {

                location.href = '/camtic/pr/news.do';
            }
        });
    }

    function fn_cancleSubscribe(){
        var cancleFlag = false;

        $.ajax({
            url : '/camtic/news/getSubscribeCancle.do',
            type : 'POST',
            data: {email : $("#email").val()},
            dataType : "json",
            async : false,
            success: function(e) {
                if(e.processCode == "SUCCESS"){
					cancleFlag = true;
                }
            }
        });

        if(!cancleFlag){
            alert("해당 이메일의 구독 신청 이력이 없습니다.");
        }else{
            alert("구독이 취소되었습니다.");
            location.href = '/camtic/pr/news.do';
        }

    }

</script>
</body>
</html>
