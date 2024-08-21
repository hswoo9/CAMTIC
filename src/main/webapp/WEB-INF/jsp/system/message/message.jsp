<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="/js/intra/system/message/message.js?v=${today}"/></script>
<script type="text/javascript" src="/js/intra/system/message/messageReq.js?v=${today}"/></script>
<style>
    td{background-color: #fff;}
    th{background-color: #dee2e6;}
    .tab{width:100%; padding: 10px;}
    .tabnav{font-size:0; width:100%; border:1px solid #ddd; padding:0;}
    .tabnav li{display: inline-block;  height:46px; text-align:center; border-right:1px solid #ddd;}
    .tabnav li a:before{content:""; position:absolute; left:0; top:0px; width:100%; height:3px; }
    .tabnav li a.active:before{background:#1A5089;}
    .tabnav li a.active{border-bottom:1px solid #fff;}
    .tabnav li a{ position:relative; display:block; background: #f8f8f8; color: #000; padding:0 30px; line-height:46px; text-decoration:none; font-size:12px;}
    .tabnav li a:hover,
    .tabnav li a.active{background:#fff; color:#1A5089; font-weight:600;}
    .tabcontent{padding: 20px; width: 100%; border:1px solid #ddd; border-top:none;}

    .subtab ul{list-style:none; padding:0;}
    .subtabnav li{height:46px; text-align:center; width:100px;}
    .subtabnav li a:before{content:""; position:absolute; left:0; top:0px; width:100%; height:3px; }
    .subtabnav li a.active:before{background:#fff;}
    .subtabnav li a.active{background-color:#D7E9FA;}
    .subtabnav li a{ position:relative; display:block; background: #f8f8f8; color: #000; line-height:46px; text-decoration:none; font-size:12px;}
    .subtabnav li a:hover,
    .subtabnav li a.active{color:#1A5089; font-weight:600;}
    .subtabcontent{margin-left:20px; width:100%;}

    #mainGrid tr:hover, #mainGridSend tr:hover {background-color: #f9fdff;}
    .table td, .table th {border-color: #dee2e6;}
    .content-wrapper {width:950px; border: 1px solid #ddd; margin: 0 10px;}
    #mainGridSend td {text-overflow: ellipsis; white-space: nowrap; overflow: hidden;}
    .table {table-layout: fixed;}

    .k-drag-clue, .k-grid-header, .k-grouping-header, .k-header, .k-menu, .k-panelbar>.k-panelbar-header>.k-link, .k-progressbar, .k-state-highlight, .k-tabstrip, .k-tabstrip-items .k-item, .k-toolbar{background-color: #E4EBF3;}
    .k-pager-wrap{background-color:#E4EBF3;}
    .k-pager-wrap .k-link.k-state-selected{background-color: #1A5089;}
    .k-picker:focus-within{box-shadow:0 0 4px 0 rgb(26 80 137 / 75%);}
    .k-toolbar{justify-content: flex-end;}
    .k-grid-content tr:last-child>td, .k-grid-content-locked tr:last-child>td{border-bottom: 1px solid #d5d5d5;}
    .txtline{width:auto; padding:0 5px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;}

    .msg_con_wrap .msg_mms_box{padding-top:50px; text-align:left; width:100%;height:480px;background:#fff url('/images/system/msg_mms_bg.png') no-repeat top left; margin-right:20px;}
    .msg_con_wrap .msg_mms_box .MsgBox{margin-left: 12px;text-align:center;width:213px;height:330px; resize:none;padding:21px 17px;background-color: transparent;border-top-style: solid;border-right-style:solid;border-bottom-style: solid;border-left-style: solid;overflow: hidden;overflow-y: auto;font-size: 9pt;word-break: break-all;left: 0px;margin-top: 23px;}
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

    .k-treeview .k-i-collapse:before{background: url("/images/ico/ico_organ03_open.png");content: "";}
    .k-treeview .k-i-expand:before{background: url("/images/ico/ico_organ03_close.png");content: "";}
    .k-treeview .k-treeview-top.k-treeview-bot .k-i-collapse:before{background: url("/images/ico/ico_organ01.png")}
    .k-treeview .k-treeview-top.k-treeview-bot .k-i-expand:before{background: url("/images/ico/ico_organ01.png")}
    .k-treeview .k-top.k-bot .k-i-collapse{background: url("/images/ico/ico_organ01.png")}
    .k-treeview .k-top.k-bot .k-i-expand{background: url("/images/ico/ico_organ01.png")}

    .k-treeview .k-i-expand-disabled, .k-treeview .k-i-collapse-disabled {
        cursor: default
    }

    .k-treeview .k-treeview-top,
    .k-treeview .k-treeview-mid,
    .k-treeview .k-treeview-bot {
        background-image: url('/images/bg/treeview-nodes.png');
        background-repeat: no-repeat;
        margin-left: -16px;
        padding-left: 16px;
    }

    .k-treeview .k-treeview-top .k-treeview-bot{background: none; background-position: -25px -66px;}

    .k-treeview .k-item { background-image: url('/images/bg/treeview-line.png'); }
    .k-treeview .k-last { background-image: none; }
    .k-treeview .k-treeview-top { background-position: -91px 0; }
    .k-treeview .k-treeview-bot { background-position: -69px -22px; }
    .k-treeview .k-treeview-mid { background-position: -47px -42px; }
    .k-treeview .k-last .k-treeview-top { background-position: -25px -66px; }
    .k-treeview .k-group .k-last { background-position: -69px -22px; }
    .k-treeview .k-item {
        background-repeat: no-repeat;
    }

    .k-treeview .k-first {
        background-repeat: no-repeat;
        background-position: 0 16px;
    }

    .pop_head{
        height: 32px;
        position: relative;
        background: #1385db;
    }
    .pop_head h1 {
        font-size: 12px;
        color: #fff;
        line-height: 32px;
        padding-left: 16px;
    }

    #menuTreeView{
        background: #fff;
        overflow: auto;
        font-size: 12px;
    }

    .k-grid-toolbar{
        justify-content: flex-end !important;
    }
    .k-grid-norecords{
        justify-content: space-around;
    }

    .k-list-scroller {
        overflow-y: scroll;
    }

    input#dest_phone{border: 1px solid #ddd; line-height: 25px; padding-left: 10px;}
    .destPhone{border: 1px solid #ddd; line-height: 25px; padding-left: 10px;}

    .dest_phone {
        width: 95%;
    }
</style>

<body class="font-opensans">

<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">문자함</h4>
            <div class="title-road">시스템관리 > 문자 &gt; 문자함</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
            <div style="float: right; padding: 0 0 10px 0;">
                <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="messageReq.fn_faxSendPopup()">팩스 발송</button>
            </div>
        </div>
        <div class="tab" style="padding-top: 30px; padding-left: 20px; padding-right: 20px;">
            <div id="tab03">
                <div>
                    <table>
                        <colgroup>
                            <col width="20%">
                            <col width="40%">
                            <col width="40%">
                        </colgroup>
                        <tbody>
                        <tr>
                            <td rowspan="2">
                                <div id="menuTabStrip">
                                    <ul>
                                        <li class="k-state-active">
                                            전화번호부 목록
                                        </li>
                                    </ul>
                                    <div>
                                        <input id="menuSearch" name="menuSearch" placeholder="이름을 입력해주세요" style="width: 87%" onkeypress="if(window.event.keyCode==13){menuTreeSearch(this.value)}"/>
                                        <button type="button" class=" k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="menuTreeSearch($('#menuSearch').val())">
                                            <span class="k-icon k-i-search k-button-icon"></span>
                                        </button>
                                        <div id="gridForm" style="height:510px; width: 300px; padding:0 0 0 10px; overflow: auto;border: 1px solid #dedfdf; margin-top:5px;">
                                            <div id="menuTreeView">
                                            </div>
                                            <%--<p id="result1" style="margin-top:10px;">문자보낼 사람을 체크해주세요.</p>--%>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td rowspan="2" style="background-color: white">
                                <div style="border:1px solid #ddd; margin-left:10px;margin-bottom:10px; width:259px; text-align: center">
                                    <div style="background-color:#eee; height:30px; line-height: 30px; text-align: center;">
                                        발신번호
                                    </div>
                                    <input name="callBack" id="callBack" oninput="onlyNumber(this);" maxlength="13" placeholder="숫자만입력하세요!" style="width:95%; margin: 5px 0" value="0632190300">
                                </div>
                                <div class="msg_con_wrap" style="height: 520px; display:flex;">
                                    <div style="border:1px solid #ddd; margin-left:10px; width:100%; text-align: center">
                                        <div style="background-color:#eee; height:30px;text-align: center; padding-top: 5px; margin-bottom: 10px;">받는사람</div>
                                        <div id="destDiv">
                                            <div style="color: red; text-align: left; width: 95%; margin: 5px auto;">* 전화번호부 목록에서 선택</div>
                                            <input name="dest_phone" id="dest_phone" style="width:95%;" placeholder="받는사람을 체크해주세요." disabled>
                                        </div>
                                    </div>
                                    <div class="msg_mms_box" style="margin: 0 30px;" >
                                        <textarea name="tBox_Msg" class="MsgBox ImeMode" id="tBox_Msg" placeholder="[메시지입력창]" rows="12" cols="20"></textarea>
                                        <div class="mt60">
                                            <input id="send" type="button" value="전송" onclick="messageReq.sendMessage();">
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td style="vertical-align: top;">
                                <div id="menuEditorTabStrip">
                                    <ul>
                                        <li class="k-state-active">
                                            그룹 등록/수정
                                        </li>
                                    </ul>
                                    <div id="gridForm2" style="height:190px;overflow: auto;border: 1px solid #dedfdf;">
                                        <form id="menuSaveFrm">
                                            <table class="table table-bordered mb-0" style="border: none;">
                                                <colgroup>
                                                    <col width="30%">
                                                    <col width="70%">
                                                </colgroup>
                                                <tbody>
                                                <tr>
                                                    <td colspan="2" style="border: none">
                                                        <div style="display:flex; justify-content: flex-end;">
                                                            <button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" style="margin-right:5px;" onclick="inputReset()">
                                                                <span class="k-icon k-i-track-changes-enable k-button-icon"></span>
                                                                <span class="k-button-text">초기화</span>
                                                            </button>
                                                            <button type="button" id="modifyBtn" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" style="margin-right:5px; display:none;" onclick="messageReq.setGroupMod()">
                                                                <span class="k-icon k-i-track-changes-enable k-button-icon"></span>
                                                                <span class="k-button-text">수정</span>
                                                            </button>
                                                            <button type="button" id="saveBtn" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" style="margin-right:5px;" onclick="messageReq.setGroup()">
                                                                <span class="k-icon k-i-track-changes-enable k-button-icon"></span>
                                                                <span class="k-button-text">저장</span>
                                                            </button>
                                                            <button type="button" id="delBtn" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="messageReq.setGroupDel()">
                                                                <span class="k-icon k-i-cancel k-button-icon"></span>
                                                                <span class="k-button-text">삭제</span>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th class="text-center th-color">그룹번호
                                                    </th>
                                                    <td>
                                                        <input type="text" id="groupId" name="groupId" style="width:50%;" disabled>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th class="text-center th-color">
                                                        <span class="red-star">*</span>그룹명
                                                    </th>
                                                    <td>
                                                        <input type="text" id="groupName" name="groupName">
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </form>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div id="menuEditorTabStripUser">
                                    <ul>
                                        <li class="k-state-active">
                                            사용자 등록/수정
                                        </li>
                                    </ul>
                                    <div id="gridForm2User" style="height:300px;overflow: auto;border: 1px solid #dedfdf;">
                                        <form id="menuSaveFrmUser">
                                            <table class="table table-bordered mb-0" style="border: none;">
                                                <colgroup>
                                                    <col width="30%">
                                                    <col width="70%">
                                                </colgroup>
                                                <tbody>
                                                <tr>
                                                    <td colspan="2" style="border: none">
                                                        <div style="display:flex; justify-content: flex-end;">
                                                            <button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" style="margin-right:5px;" onclick="inputResetUser()">
                                                                <span class="k-icon k-i-track-changes-enable k-button-icon"></span>
                                                                <span class="k-button-text">초기화</span>
                                                            </button>
                                                            <button type="button" id="modifyBtnUser" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" style="margin-right:5px; display:none;" onclick="messageReq.setUserMod()">
                                                                <span class="k-icon k-i-track-changes-enable k-button-icon"></span>
                                                                <span class="k-button-text">수정</span>
                                                            </button>
                                                            <button type="button" id="saveBtnUser" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" style="margin-right:5px;" onclick="messageReq.setUser()">
                                                                <span class="k-icon k-i-track-changes-enable k-button-icon"></span>
                                                                <span class="k-button-text">저장</span>
                                                            </button>
                                                            <button type="button" id="delBtnUser" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="messageReq.setUserDel()">
                                                                <span class="k-icon k-i-cancel k-button-icon"></span>
                                                                <span class="k-button-text">삭제</span>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th class="text-center th-color">
                                                        <span class="red-star">*</span>그룹명
                                                    </th>
                                                    <td>
                                                        <input type="text" id="userGroupId" name="userGroupId" style="width:50%;">

                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th class="text-center th-color">사용자번호
                                                    </th>
                                                    <td>
                                                        <input type="text" id="phoneUserId" name="phoneUserId" style="width:50%;" disabled>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th class="text-center th-color">
                                                        <span class="red-star">*</span>사용자명
                                                    </th>
                                                    <td>
                                                        <input type="text" id="phoneNameUser" name="phoneNameUser">
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th class="text-center th-color">
                                                        <span class="red-star">*</span>핸드폰번호
                                                    </th>
                                                    <td>
                                                        <input type="text" id="phoneUserNum" name="phoneUserNum" oninput="autoHyphen2(this);" maxlength="13" placeholder="숫자만입력하세요!" >
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </form>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->
<script type="text/javascript">
    messageReq.fn_defaultScript();
</script>