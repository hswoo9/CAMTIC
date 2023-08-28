<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
    <title>title</title>
    <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
    <link rel="stylesheet" href="/css/kendoui/kendo.default-main.min.css"/>
    <link rel="stylesheet" href="/css/kendoui/kendo.common.min.css"/>
    <link rel="stylesheet" href="/css/kendoui/kendo.default.min.css"/>
    <script type="text/javascript" src="<c:url value='/js/intra/inside/userManage/employmentReq.js?v=3'/>"></script>
</head>
<body>
<!-- 서명 공간 -->
<div style="width:300px; height:300px;">
    <canvas id="canvas" style="border:1px solid black"></canvas>
</div>
<div>
    <!-- 저장 버튼 -->
    <button id="saveX" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base"  style="margin-top: 15px;">저장</button>
    <input type="hidden" id="code" value="${params.code}" />
</div>
<script>
    (function(obj){
        obj.init();
        $(obj.onLoad);
    })((function(){
        var canvas = $("#canvas");
        var div = canvas.parent("div");
        // 캔버스의 오브젝트를 가져옵니다.
        var ctx = canvas[0].getContext("2d");
        var drawble = false;

        // 이제 html 버그인지는 모르겠는데 canvas의 style의 height와 width를 수정하게 되면 그림이 이상하게 그려집니다.
        function canvasResize(){
            canvas[0].height = div.height();
            canvas[0].width = div.width();
        }
        // pc에서 서명을 할 경우 사용되는 이벤트입니다.
        function draw(e){
            function getPosition(){
                return {
                    X: e.pageX - canvas[0].offsetLeft,
                    Y: e.pageY - canvas[0].offsetTop
                }
            }
            switch(e.type){
                case "mousedown":{
                    drawble = true;
                    ctx.beginPath();
                    ctx.moveTo(getPosition().X, getPosition().Y);
                }
                    break;
                case "mousemove":{
                    if(drawble){
                        ctx.lineTo(getPosition().X, getPosition().Y);
                        ctx.stroke();
                    }
                }
                    break;
                case "mouseup":
                case "mouseout":{
                    drawble = false;
                    ctx.closePath();
                }
                    break;
            }
        }
        // 스마트 폰에서 서명을 할 경우 사용되는 이벤트입니다.
        function touchdraw(e){
            function getPosition(){
                return {
                    X: e.changedTouches[0].pageX - canvas[0].offsetLeft,
                    Y: e.changedTouches[0].pageY - canvas[0].offsetTop
                }
            }
            switch(e.type){
                case "touchstart":{
                    drawble = true;
                    ctx.beginPath();
                    ctx.moveTo(getPosition().X, getPosition().Y);
                }
                    break;
                case "touchmove":{
                    if(drawble){
                        // 스크롤 이동등 이벤트 중지..
                        e.preventDefault();
                        ctx.lineTo(getPosition().X, getPosition().Y);
                        ctx.stroke();
                    }
                }
                    break;
                case "touchend":
                case "touchcancel":{
                    drawble = false;
                    ctx.closePath();
                }
                    break;
            }
        }
        // 참고로 mousedown은 touchstart와 mousemove는 touchmove, mouseup은 touchend와 같습니다.
        // mouseout와 touchcancel은 서로 다른 동작인데, mouseout은 canvas 화면을 벗어났을 때이고 touchcancel는 모바일에서 터치가 취소, 즉 에러가 났을 때 입니다.
        return {
            init: function(){
                // 캔버스 사이즈 조절
                $(window).on("resize", canvasResize);

                canvas.on("mousedown", draw);
                canvas.on("mousemove", draw);
                canvas.on("mouseup", draw);
                canvas.on("mouseout", draw);
                // 스마트 폰의 터치 이벤트
                canvas.on("touchstart", touchdraw);
                canvas.on("touchend", touchdraw);
                canvas.on("touchcancel", touchdraw);
                canvas.on("touchmove", touchdraw);
                // save 버튼을 누르면 imageupload.php로 base64코드를 보내서 이미지로 변환합니다.
                $("#saveX").on("click", function(){
                    var code = $("#code").val();
                    employmentReq.fn_popCanvasSave(code);
                });
            },
            onLoad: function(){
                // 캔버스 사이즈 조절
                canvasResize();
            }
        }
    })());
</script>
</body>
</html>