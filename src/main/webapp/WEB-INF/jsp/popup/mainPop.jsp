<%--
  Created by IntelliJ IDEA.
  User: 정호진
  Date: 2023-08-02(002)
  Time: 20:25
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<style>
	.btn_today_close {
		width: 100%;
		height: 30px;
		background-color: #333;
		text-align: center;
		color: #fff;
		font-size: 14px;
		display: block;
	}
	#tcSpan {
		display: block;
		line-height: 30px;
		vertical-align: bottom;
		opacity: 0.8;
		margin-right: 20px;
	}
	.tcA{
        color: #fff;
        font-size: 14px;
	}
</style>

<html>
<head>
	<title>${map.bannerPopupTitle}</title>
</head>

<script type="text/javascript" src="<c:url value='/js/kendoui/jquery.min.js'/>"></script>
<body>
<div style="height: 100%;display: flex;flex-direction: column;">
	<a id="imgA"></a>
	<p class="btn_today_close" style="text-align: right; margin: 0;">
		<span id="tcSpan"><input type="checkbox" id="popupCloseCheck" style="cursor:pointer;" onclick="closePopup()" />
			<label for="popupCloseCheck" style="cursor:pointer;">오늘 하루 열지 않음</label>
		<%--<a href="" class="tcA" onclick="window.close()">닫기</a>--%>
		</span>

	</p>
</div>
<input type="hidden" id="popId" value="${map.uuid}" />
	<script>
		var popId = $("#popId").val();
        var linkFlag = '${map.bannerPopupLink}';
        var targetFlag = '${map.bannerPopupTarget}';
		document.body.style.margin = "0";

        document.body.style.overflow = 'hidden';
        var linkElement = document.getElementById('imgA');

        if(linkFlag != ''){
            linkElement.href = '${map.bannerPopupLink}';
        }else {}

        linkElement.style.backgroundImage = 'url(${map.filePath}${map.fileMask})';

        linkElement.style.backgroundSize = '100% 100%';

        linkElement.style.display = 'block';
        linkElement.style.width = '100%';
        linkElement.style.height = '100%';

        linkElement.addEventListener('click', function(event) {
            event.preventDefault();
            if(!linkFlag){}
            else if(targetFlag == 1){
                 window.open(linkElement.href, '_self', 'fullscreen=yes');
	         }else {
	            window.open(linkElement.href, '_blank', 'fullscreen=yes');
	         }
        });

        // 쿠키 설정하기 (오늘 하루 동안 유지)
        var setCookie = function (cname, cvalue) {
            var today = new Date();
            var tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(0, 0, 0, 0);
            var expires = "expires=" + tomorrow.toUTCString();
            document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/";
        }

        // 팝업 닫기 및 쿠키 설정
        var closePopup = function() {
			var today = new Date();
			today.setDate( today.getDate() + parseInt(1) );
			document.cookie = 'popupClosed_' + popId+ '=' + escape( popId ) + '; path=/; expires=' + today.toGMTString() + ';'
            setCookie("popupClosed_" + popId, "true", 1);
            window.close();
        }
	</script>
<footer>

</footer>
</body>

</html>
