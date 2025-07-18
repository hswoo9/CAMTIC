<%--
  Created by IntelliJ IDEA.
  User: admin
  Date: 2023-03-03
  Time: 오후 12:51
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<input type="hidden" id="loginVOEmpSeq" value="${loginVO.uniqId}"/>
<header>
    <div class="headerpanel">
        <a href="#" onclick="fn_mvMainPage();"><div class="logopanel"></div></a>
        <div class="headerbar" style="width:88%;">
            <a id="menuToggle" class="menutoggle"><i class="fa fa-bars"></i></a>
            <div class="searchpanel">
<%--                <div class="input-group">--%>
<%--                    <input type="text" id="menuSearchToobar" class="form-control" placeholder="메뉴를 검색하세요" onkeydown="if(window.event.keyCode==13){fn_searchMenu()}">--%>
<%--                    <span class="input-group-btn">--%>
<%--            <button class="btn btn-default" type="button" onclick="fn_searchMenu();"><i class="fa fa-search" ></i></button>--%>
<%--          </span>--%>
<%--                </div>--%>
            </div><!-- input-group -->
            <div class="searchpanel2" style="display: none">
                <div class="input-group" style="float: left">
                    <span><b style="color: white">테스트 서버</b></span>
                </div>
            </div>

            <div class="header-right">
                <ul class="headermenu">
                    <li>
                        <div id="alarmBack" style="display: none; position: absolute;right: -300px; top: 0px; width: 200vw; z-index: 8000; height: 100vh;" onclick="openAlarm()"></div>
                        <div id="noticePanel" class="btn-group">
                            <a href="#">
                                <button class="btn btn-notice" style="color: white; float:left; font-size:12px; position: relative; top: 18px; right: 20px;
                                                          border-radius: 5px; border:1px solid #ddd; height: 30px; padding: 5px;" onclick="goMenual();">
                                    캠스팟2.0매뉴얼
                                </button>
                            </a>
                            <c:if test="${loginVO.uniqId == 1}">
                            <a href="#">
                                <button class="btn btn-notice" style="margin-left: 7px; color: white; float:left; font-size:12px; position: relative; top: 18px; right: 20px;
                                                          border-radius: 5px; border:1px solid #ddd; height: 30px; padding: 5px;" onclick="updMasterPassword()">
                                    마스터 비밀번호 변경
                                </button>
                            </a>
                            </c:if>
<%--                            <a href="javascript:void(0)">--%>
                            <select id="shortcuts" style="float: left;background-color: #3b4354;height:31px;color: white;margin: 17px 5px 0 0px;" onchange="pastPage(this)">
                                <option value="">바로가기</option>
                                <option value="0">기존 캠스팟</option>
                                <option value="1">캠틱종합기술원</option>
                                <option value="2">기업성장지원센터</option>
                            </select>
<%--                                <b style="color: white; float: left; position: relative; top: 25px; right: 10px;" onclick="pastPage()">기존 캠스팟 바로가기</b>--%>
<%--                            </a>--%>
                            <a href="#">
                                <button class="btn btn-notice" style="float:left; font-size:22px;" onclick="orgPopup();">
                                    <i class="fa fa-sitemap"></i>
                                </button>
                            </a>
                            <button class="btn btn-notice alert-notice" data-toggle="dropdown" style="border-left:0; z-index: 8001">
<%--                                <div class="fa fa-bell-o" onclick="openAlarm()"></div>--%>
                                <div>
                                    <img src="/images/ico/ic_setting.png" alt="" id ="favoriteMenu" onclick="fn_favoriteMenu();" class="media-object img-circle" style="width: 20px; cursor:pointer;" >
                                </div>
                            </button>
<%--                            <div id="noticeDropdown" class="dropdown-menu dm-notice pull-right" style="z-index: 8001">--%>
<%--                                <div role="tabpanel">--%>
<%--                                    <!-- Nav tabs -->--%>
<%--                                    <ul class="nav nav-tabs nav-justified" role="tablist">--%>
<%--                                        <li class="active"><a style="cursor: auto; " data-target="#notification" data-toggle="tab">알림</a></li>--%>
<%--                                    </ul>--%>

<%--                                    <!-- Tab panes -->--%>
<%--                                    <div class="tab-content">--%>
<%--                                        <div role="tabpanel" class="tab-pane active" id="notification">--%>
<%--                                            <ul class="list-group notice-list" id="alarmUl">--%>
<%--                                            </ul>--%>
<%--                                            &lt;%&ndash;                      <a class="btn-more" href="">더보기 <i class="fa fa-long-arrow-right"></i></a>&ndash;%&gt;--%>
<%--                                        </div><!-- tab-pane -->--%>
<%--                                        <div style="text-align: center; background-color: #abdbdb; cursor:pointer" onclick="fn_xAll('${loginVO.uniqId}')" id="xAll">X</div>--%>
<%--                                    </div>--%>
<%--                                </div>--%>
<%--                            </div>--%>
                        </div>
                    </li>
                    <li class="manageTab">
                        <button class="btn btn-notice" data-toggle="dropdown">
                            <img src="${loginVO.picFilePath}" alt="" class="media-object img-circle" style="width:30px; height:30px;">
                        </button>
                        <div id="noticeDropdown1" class="dropdown-menu dm-notice pull-right">
                            <div role="tabpanel">
                                <div class="tab-content">
                                    <div role="tabpanel" class="tab-pane active" id="notification1" style="background-color:#fff;">
                                        <ul class="list-group notice-list">
                                            <li class="list-group-item unread">
                                                <div class="row">

                                                    <form id="userRF" method="post">
                                                        <input type="hidden" id="userR" name="userR" value="">
                                                    </form>
                                                    <div class="col-xs-12">
                                                        <div style="font-size: 13px; line-height: 30px; font-weight: 600; text-align:center;"><a href="#" onclick="openPopup(${loginVO.uniqId})">개인정보</a></div>
                                                        <div style="font-size: 13px; line-height: 30px; font-weight: 600; text-align:center;"><a href="#" onclick="open_in_frame('/Inside/imageManage.do')">이미지관리</a></div>
                                                        <div style="font-size: 13px; line-height: 30px; font-weight: 600; text-align:center;"><a href="#">참여내역</a></div>
                                                        <div style="font-size: 13px; line-height: 30px; font-weight: 600; text-align:center;"><a href="#" onclick="open_in_frame('/Inside/userPersonnelRecordOne.do')">인사기록카드</a></div>
                                                        <div style="font-size: 13px; line-height: 30px; font-weight: 600; text-align:center;"><a href="#" onclick="open_in_frame('/Inside/personAttendList.do')">근태내역</a></div>
                                                        <div style="font-size: 13px; line-height: 30px; font-weight: 600; text-align:center;"><a href="#" onclick="open_in_frame('/subHoliday/subHolidayList.do')">휴가관리</a></div>
                                                        <!--
                            <c:if test="${isAdmin}">
                              <div style="font-size: 13px; line-height: 30px; font-weight: 600; text-align:center;"><a href="#" onclick="open_in_frame('/subHoliday/subHolidaySetting.do')">발생연차관리</a></div>
                              <div style="font-size: 13px; line-height: 30px; font-weight: 600; text-align:center;"><a href="#"  onclick="window.open('/inside/empSalaryManage.do', 'empSalaryManage', 'width=600, height=500'); return false;">급여관리</a></div>
                            </c:if>
                            -->
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div><!-- tab-pane -->
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="btn-group">
                            <button type="button" class="btn btn-logged" data-toggle="dropdown" style="padding-left:5px;">
                                ${loginVO.name}님 환영합니다!
                                <!--<span class="caret"></span>-->
                            </button>
                            <!--<ul class="dropdown-menu pull-right">
                              <li><a href="#"><i class="glyphicon glyphicon-user"></i>마이페이지</a></li>
                              <li><a href="#"><i class="glyphicon glyphicon-log-out"></i>로그아웃</a></li>
                            </ul>-->
                        </div>
                    </li>
                    <li class="tooltips" data-toggle="tooltip" title="Log Out" style="margin-top:13px; font-size:25px;"><a href="/logoutAction"><i class="fa fa-sign-out"></i></a></li>
                </ul>
            </div><!-- header-right -->
        </div><!-- headerbar -->
    </div><!-- header-->
</header>
<script src="/js/sockjs.min.js"></script>
<script>
    var socket = null;

    $(document).ready(function(){
        connectWS();
        showTestServer();
    });

    function showTestServer(){
        const serverName = "${pageContext.request.serverName}";
        if(serverName == "218.158.231.186"){
            $(".searchpanel2").show();
        }
    }

    function connectWS(){
        sock = new WebSocket("wss://${pageContext.request.serverName}:${pageContext.request.serverPort}${pageContext.request.contextPath}/websocket.do");
        socket = sock;

        sock.onopen = function(e) {
            console.log('info: connection opened.');
            onOpen(e);
        };

        sock.onmessage = function(e){
            console.log('info : connection onmessage.');
            $("#non_alarm").remove()
            $("#alarmUl").append(e.data);

            if(!$(".headermenu > li .alert-notice .fa").hasClass("newAlarm")){
                $(".headermenu > li .alert-notice .fa").addClass('newAlarm');
            }
        }

        sock.onclose = function(){
            $("#chat").append("연결 종료");
        }
        sock.onerror = function (err) {console.log('Errors : ' , err);};
    }

    function onOpen(evt){
        var data = evt.data;
        alarmList();
    }

    function openAlarm(){
        if($("#noticePanel").hasClass("open")){
            $("#alarmBack").hide();
            $("#noticePanel").removeClass("open");
        }else{
            $("#alarmBack").show();
            $("#noticePanel").addClass("open");
        }
    }

    function alarmList(){
        var result = customKendo.fn_customAjax("/common/getAlarmList.do");
        if(result.flag){
            var rs = result.rs;
            var html = "";

            if(rs.length > 0){
                for(var i = 0; i < rs.length; i++){
                    if(rs[i].URL.indexOf("certificate") > -1){
                        html += '' +
                            '<li class="list-group-item unread">' +
                            '<div class="row">' +
                            '<div class="col-xs-2">' +
                            '<i class="fa fa-envelope"></i>' +
                            '</div>' +
                            '<div class="col-xs-10">' +
                            '<h5>' +
                            '<a href="javascript:void(0)" onclick=\"alarmListDel('+ rs[i].AL_ID +');open_in_frame(\'' + rs[i].URL + '\');\">' +
                            rs[i].TITLE +
                            '</a>' +
                            '<span style="float:right;margin: 0;font-size: 12px;cursor: pointer" onclick="alarmListDel('+ rs[i].AL_ID +')">X</span>' +
                            '</h5>' +
                            '<small>' +
                            rs[i].REG_DATE +
                            '</small>' +
                            '<span>' +
                            rs[i].CONTENT+
                            '</span>' +
                            '</div>' +
                            '</div>' +
                            '</li>';
                    }else{
                        html += '' +
                            '<li class="list-group-item unread">' +
                            '<div class="row">' +
                            '<div class="col-xs-2">' +
                            '<i class="fa fa-envelope"></i>' +
                            '</div>' +
                            '<div class="col-xs-10">' +
                            '<h5>' +
                            '<a href="javascript:void(0)" onclick=\"fn_opener(\'' + rs[i].URL + '\', \'' + rs[i].AL_ID + '\')\">' +
                            rs[i].TITLE +
                            '</a>' +
                            '<span style="float:right;margin: 0;font-size: 12px;cursor: pointer" onclick="alarmListDel('+ rs[i].AL_ID +')">X</span>' +
                            '</h5>' +
                            '<small>' +
                            rs[i].REG_DATE +
                            '</small>' +
                            '<span>' +
                            rs[i].CONTENT+
                            '</span>' +
                            '</div>' +
                            '</div>' +
                            '</li>';
                    }
                }
                $("#alarmUl").html(html);

                $(".headermenu > li .alert-notice .fa").addClass('newAlarm');
            }else{
                html += '' +
                    '<li class="list-group-item unread" style="text-align: center" id="non_alarm">' +
                    '<div class="row">' +
                    '<h5>알림이 없습니다.</h5>' +
                    '</div>' +
                    '</li>';

                $("#alarmUl").html(html);

                $(".headermenu > li .alert-notice .fa").removeClass('newAlarm');
            }


        }
    }

    function fn_opener(url, alId){
        if(url == "project"){
            open_in_frame('/project/viewProject.do');
        }else if(String(url).indexOf("absentSet") > -1 || String(url).indexOf("process") > -1 || String(url).indexOf("spot") > -1){
            open_in_frame(url);
        }else {
            window.open(url, '', 'width=900, height=850');
        }

        setAlarmCheck(alId);
    }

    function setAlarmCheck(alId){
        var result = customKendo.fn_customAjax("/common/setAlarmCheck.do", {alId : alId});
        if(result.flag){
            alarmList();
        }
    }

    function alarmListDel(alId){
        var result = customKendo.fn_customAjax("/common/setAlarmTopListDel.do", {alId : alId});
        if(result.flag){
            alarmList();
        }
    }

    function fn_xAll(empSeq){
        var result = customKendo.fn_customAjax("/common/setAlarmTopListDel.do", {rcvEmpSeq : empSeq});

        if(result.flag){
            alarmList();
        }
    }

    function fn_mvMainPage(){
        open_in_frame("/indexBMain.do");
    }

    function orgPopup(){
        var url = "/user/pop/orgPop.do";
        var name = "popup test";
        var option = "width = 980, height = 807, top = 100, left = 200, location = no"
        var popup = window.open(url, name, option);
    }

    /* function openPopup(url) {
       // 팝업 창을 띄우는 함수
       window.open(url, 'popup', 'width=800, height=600, scrollbars=yes');
     }*/

    function openPopup(pk) {
        $("#userR").val(pk);
        $("#userRF").one("submit", function() {
            var url = '/Inside/pop/personalInformation.do';
            var name = "personalInformation";
            var option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
            var popup = window.open(url, name, option);
            this.action = '/Inside/pop/personalInformation.do';
            this.method = 'POST';
            this.target = 'personalInformation';
        }).trigger("submit");
    }

    function pastPage(e){
        var name = "_blank";
        var option = "";
        if($(e).val() == "0"){
            const id = "${loginVO.id}";
            let url = "http://www.camtic.or.kr/CAMsPot";
            if(id != ""){
                url = "http://www.camtic.or.kr/CAMsPot/Login.aspx?NEWCAMTICS="+id;
            }
            var popup = window.open(url, name, option);
        }else if($(e).val() == "1"){
            let url = "http://www.camtic.or.kr/camtic";
            var option = "";
            var popup = window.open(url, name, option);
        }else if($(e).val() == "2"){
            let url = "http://www.camtic.or.kr/cg";
            var name = "_blank";
            var popup = window.open(url, name, option);
        }
    }

    function goMenual(){
        let url = "https://scribehow.com/page/_20___bs_k0FYzTiWbC4n6izGVSw";
        var name = "_blank";
        var option = "";
        var popup = window.open(url, name, option);
    }

    function updMasterPassword(){
        var returnValue = prompt("변경하실 비밀번호를 입력해주세요.", "");

        if(returnValue == null){
            return false;
        }

        var data ={
            masterKey : returnValue
        }
        var rs = customKendo.fn_customAjax("/updMasterKey", data);

        if(rs.flag){
            alert("변경 완료했습니다.");
            location.reload();
        }
    }


    /** 팝업 추가*/
    // 쿠키 가져오기
    var getCookie = function (cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for(var i=0; i<ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1);
                if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
            }
            return "";
    }

    var mainOpenPopup = function(popId, popupName,style) {
        var cookieValue = getCookie("popupClosed_" + popId);
        if (cookieValue !== "true") {
            window.open(
                '/popup/mainPop.do?popId=' + popId,
                popupName,
                style
            );
        }
    };

    function rayerPopup(data){

        if(getRayerCookie("rayer"+data.uuid) == 'Y'){
            return false;
        }
        var link = "";

        if(data.bannerPopupLink != ""){
            link = data.bannerPopupLink;
        }

        var positonX = data.bannerPopupLeft;
        var positonY = data.bannerPopupTop;
        if (data.centerYn === 'Y') {
            // centerYn이 'Y'이면 중앙 정렬

            //window 크기계산 -> window.screen.width, height 사용
            positonX = (window.screen.width - data.bannerPopupWidth) / 2;
            positonY = (window.screen.height - data.bannerPopupHeight) / 2.5;
        }

        let html = '';

        html += '<div id="rayer'+data.uuid+'" class="rayer" style="top:'+positonY+'px; left:'+positonX+'px;">';
        html += '<div class="pop" style="width:'+data.bannerPopupWidth+'px; height:'+data.bannerPopupHeight+'px;">';
        html += '<div class="content" style="height:100%;display:flex;flex-direction:column;">';
        if(link == ""){
            html += '<a id="imgA" style="background-image: url('+data.filePath+''+data.fileMask+'); background-size: 100% 100%; display: block; width: 100%;height: 100%" />';
        }else{
            if(data.bannerPopupTarget == 1) {
                html += '<a href="' + link + '" target="_self" id="imgA" style="background-image: url(' + data.filePath + '' + data.fileMask + '); background-size: 100% 100%; display: block; width: 100%;height: 100%" />';
            }else{
                html += '<a href="' + link + '" target="_blank" id="imgA" style="background-image: url(' + data.filePath + '' + data.fileMask + '); background-size: 100% 100%; display: block; width: 100%;height: 100%" />';
            }
        }
        html += '<div>';
        html += '<p class="btn_today_close" style="text-align:right;margin:0;">';
        html += '<span id="tcSpan">';
        html += '<input type="checkbox" style="vertical-align:middle;" id="popupCloseCheck" onclick="rayerDayClose('+data.uuid+')">';
        html += '<label for="popupCloseCheck" style="vertical-align:middle;margin-right:15px;margin-top:5px;cursor: pointer;">오늘 하루 열지 않음</label>';
        html += '<a href="" class="tcA" style="vertical-align:middle;" onclick="rayerClose('+data.uuid+');">닫기</a>';
        html += '</span>';
        html += '</p>';
        html += '</div>';
        html += '</div>';

        $("#rayer-background").append(html);

        $("#rayer"+data.uuid).show();

        var body = document.getElementsByClassName('font-opensans')[0];
        var shadowRayerId = "#shadowOverlay"+data.uuid;

        var shadowDiv = '<div id="shadowOverlay'+data.uuid+'" class="shadowOverlay" onclick="rayerShadowClose('+data.uuid+')"></div>';

        body.insertAdjacentHTML('beforebegin', shadowDiv);

        $(shadowRayerId).css("display", "block");
    }

    //레이어 팝업 닫기
    function rayerClose(e){
        event.preventDefault(); // 새로고침 방지
        $("#rayer"+e).hide();

        var shadowRayerId = "#shadowOverlay"+e;
        $(shadowRayerId).css("display", "none");
    }

    //레이어 팝업 하루종일 닫기
    function rayerDayClose(key){
        setRayerCookie('rayer'+key, 'Y', 1);

        $("#rayer"+key).hide();

        var shadowRayerId = "#shadowOverlay"+key;
        $(shadowRayerId).css("display", "none");
    }

    //레이어 팝업 그림자 닫기
    function rayerShadowClose(key){
        $("#rayer"+key).hide();

        var shadowRayerId = "#shadowOverlay"+key;
        $(shadowRayerId).css("display", "none");
    }

    //레이어 팝업 쿠키 set
    function setRayerCookie(name, value, expiredays) {
        var today = new Date();
        today.setDate(today.getDate() + expiredays);
        document.cookie = name + '=' + escape(value) + '; path=/; expires = '+ today.toGMTString() + ';';
    }

    //레이어 팝업 쿠키 get
    function getRayerCookie(name){
        var obj = name + '=';
        var x = 0;
        while (x <= document.cookie.length ) {
            var y = (x+obj.length);
            if(document.cookie.substring(x,y) == obj) {
                if((endOfCookie = document.cookie.indexOf(";",y)) == -1)
                    endOfCookie = document.cookie.length;
                return unescape(document.cookie.substring(y,endOfCookie));
            }
            x = document.cookie.indexOf(" ",x)+1;
            if(x == 0) break;
        }
        return "";
    }
</script>
