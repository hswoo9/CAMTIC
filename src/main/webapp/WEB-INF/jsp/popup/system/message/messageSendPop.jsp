<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/system/message/messageSendPop.js?v=${today}"></script>
<style>
    .msg_con_wrap .msg_mms_box{padding-top:50px; text-align:left; width:100%;height:480px;background:#fff url('/images/system/msg_mms_bg.png') no-repeat top left; margin-right:20px;}
    .msg_con_wrap .msg_mms_box .MsgBox{margin-left: 12px;text-align:left;width:213px;height:330px; resize:none;padding:21px 17px;background-color: transparent;border-top-style: solid;border-right-style:solid;border-bottom-style: solid;border-left-style: solid;overflow: hidden;overflow-y: auto;font-size: 9pt;word-break: break-all;left: 0px;margin-top: 23px;}
    .msg_con_wrap .msg_mms_box .MsgByte{margin:0 auto; text-align: center;width:282px;}
    .msg_con_wrap .msg_mms_box .MsgByte .ByteText1{font-size : 9pt;font-weight : bold;}
    .msg_con_wrap .msg_mms_box .MsgByte .ByteText2{font-size : 9pt;}
    .msg_con_wrap .msg_mms_box .msg_btn_box1{position:absolute;top:347px;left:51px;right:53px;}
    .msg_con_wrap .msg_mms_box .msg_btn_box1 input{width:65px;padding:0;}
    .msg_con_wrap .msg_mms_box .msg_btn_box2{position:absolute;top:376px;left:51px;right:53px;}
    .msg_con_wrap .msg_mms_box .msg_btn_box2 input{width:65px;padding:0;}
    .msg_con_wrap input[type="button"] {background:#fff; border-radius:10px; box-shadow:none; padding:0px 12px; height:30px; line-height:24px;border:1px solid #c9cac9;outline:0; font-size: 12px;width: 70px;}
    .msg_con_wrap input[type="button"]:hover {border:1px solid #2690e7;}
    .mt60{margin-top:60px !important;width: 240px;text-align: center;}
</style>
<body class="font-opensans" style="background-color:#fff;">

<input type="hidden" id="userList" value="${params.userList}">
<input type="hidden" id="type" value="${params.type}">

<div class="col-lg-12" style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">문자전송</h3>
            <div>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;margin-top: 8px;" onclick="window.close();">닫기</button>
            </div>
        </div>
        <table class="popTable table table-bordered mb-0">
            <colgroup>
                <col width="30%">
                <col width="70%">
            </colgroup>
            <thead>
                <tr>
                    <th scope="row" class="text-center th-color"><span class="red-star">*</span>보내는사람</th>
                    <td colspan="3">
                        <input name="callBack" id="callBack" oninput="onlyNumber(this);" maxlength="13" placeholder="숫자만입력하세요!" style="width:95%; border: 1px solid black; padding: 3px; margin: 5px 0; font-weight: bold" value="0632190300">
                    </td>
                </tr>
            </thead>
        </table>
        <div class="msg_con_wrap" style="height: 505px; display:flex; margin-top: 20px;">
            <div class="msg_mms_box" style="margin: 0 30px;" >
                <textarea name="tBox_Msg" class="MsgBox ImeMode" id="tBox_Msg" placeholder="[메시지입력창]" rows="12" cols="20"></textarea>
                <div class="mt60">
                    <input id="send" type="button" value="전송" onclick="messageSendPop.sendMessage();">
                </div>
            </div>
        </div>
    </div>
</div>
<script>
</script>
</body>
