<%--
  Created by IntelliJ IDEA.
  User: admin
  Date: 2023-03-03
  Time: 오후 12:51
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<header>
  <div class="headerpanel">
     <a href="#" onclick="fn_mvMainPage();"><div class="logopanel"></div></a>
    <div class="headerbar" style="width:88%;">
      <a id="menuToggle" class="menutoggle"><i class="fa fa-bars"></i></a>
      <div class="searchpanel">
        <div class="input-group">
            <input type="text" id="menuSearchToobar" class="form-control" placeholder="메뉴를 검색하세요" onkeydown="if(window.event.keyCode==13){fn_searchMenu()}">
          <span class="input-group-btn">
            <button class="btn btn-default" type="button" onclick="fn_searchMenu();"><i class="fa fa-search" ></i></button>
          </span>
      </div>
      </div><!-- input-group -->

      <div class="header-right">
        <ul class="headermenu">
          <li>
            <div id="alarmBack" style="display: none; position: absolute;right: -300px; top: 0px; width: 200vw; z-index: 8000; height: 100vh;" onclick="openAlarm()"></div>
            <div id="noticePanel" class="btn-group">
                <a href="#">
                    <b style="color: white; float: left; position: relative; top: 25px; right: 10px;" onclick="pastPage()">기존 캠스팟 바로가기</b>
                </a>
                <a href="#">
                    <button class="btn btn-notice" style="float:left; font-size:22px;" onclick="orgPopup();">
                        <i class="fa fa-sitemap"></i>
                    </button>
                </a>
              <button class="btn btn-notice alert-notice" data-toggle="dropdown" style="border-left:0; z-index: 8001">
                <div class="fa fa-bell-o" onclick="openAlarm()">
                </div>
              </button>
              <div id="noticeDropdown" class="dropdown-menu dm-notice pull-right" style="z-index: 8001">
                <div role="tabpanel">
                  <!-- Nav tabs -->
                  <ul class="nav nav-tabs nav-justified" role="tablist">
                    <li class="active"><a style="cursor: auto; " data-target="#notification" data-toggle="tab">알림</a></li>
                  </ul>

                  <!-- Tab panes -->
                  <div class="tab-content">
                    <div role="tabpanel" class="tab-pane active" id="notification">
                      <ul class="list-group notice-list" id="alarmUl">
                      </ul>
<%--                      <a class="btn-more" href="">더보기 <i class="fa fa-long-arrow-right"></i></a>--%>
                    </div><!-- tab-pane -->
                  </div>
                </div>
              </div>
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
                          <div class="col-xs-12">
                            <div style="font-size: 13px; line-height: 30px; font-weight: 600; text-align:center;"><a href="#" onclick="openPopup('/Inside/pop/personalInformation.do?empSeq='+ ${loginVO.uniqId})">개인정보</a></div>
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
          <li class="tooltips" data-toggle="tooltip" title="Log Out" style="margin-top:13px; font-size:25px;"><a href="/login.do"><i class="fa fa-sign-out"></i></a></li>
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
  })

  function connectWS(){
    sock = new WebSocket("ws://${pageContext.request.serverName}:${pageContext.request.serverPort}${pageContext.request.contextPath}/websocket.do");
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
    if(String(url).indexOf("absentSet") > -1){
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

  function fn_mvMainPage(){
    open_in_frame("/indexBMain.do");
  }

  function orgPopup(){
    var url = "/user/pop/orgPop.do";
    var name = "popup test";
    var option = "width = 980, height = 807, top = 100, left = 200, location = no"
    var popup = window.open(url, name, option);
  }

  function fn_searchMenu(){
    var searchData = {
      menuName : $("#menuSearchToobar").val(),
    }
    var ds = customKendo.fn_customAjax("/main/getSearchMenu", searchData);
    if(ds.flag){
      console.log(ds.ds);

      var menuKendoWindowTemplate = $('<div class="pop_wrap" id="biz_type_popupEnroll" style="min-width:400px; display:none;">\n' +
              '<div class="pop_con">\n' +
              '<div class="com_ta2" id="menuSearchDiv">\n' +
              '</div>\n' +
              '</div>\n' +
              '</div>');

      menuKendoWindowTemplate.kendoWindow({
        width: "450px;",
        height: "250px;",
        title: "메뉴 검색",
        visible: false,
        modal : true,
        close: function () {
          menuKendoWindowTemplate.remove();
        }
      }).data("kendoWindow");

      var html = "";
      if(ds.ds != null){
        if(ds.ds.length > 0){
          for(var i = 0 ; i < ds.ds.length ; i++){
            html += '<div style="border-bottom: 1px solid lightgray; margin-top: 3px;">';
            html += "   <a href='#' style=\"display:flex;\" class=\"searchMenuATag\" menuPath=\""+ ds.ds[i].MENU_PATH +"\" menuNamePath='홈 > " + ds.ds[i].MENU_NAME_PATH + "' menuNameKr='" + ds.ds[i].MENU_NAME + "'>\n";
            html += ds.ds[i].MENU_NAME_PATH;
            html += '</a>';
            html += '</div>';
          }
        }
      }
      $("#menuSearchDiv").append(html);
      $(".searchMenuATag").on("click", function(){
        var menuPath = $(this).attr("menuPath");
        menuKendoWindowTemplate.data("kendoWindow").close();
        $("#menuSearchToobar").val("");
        open_in_frame(menuPath);
      });
      menuKendoWindowTemplate.data("kendoWindow").center().open();
    }
  }

 /* function openPopup(url) {
    // 팝업 창을 띄우는 함수
    window.open(url, 'popup', 'width=800, height=600, scrollbars=yes');
  }*/

  function openPopup(url) {
    window.open(url, 'popup', 'width=1100, height=1100, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no');

  }

  function pastPage(){
      const id = "${loginVO.id}";
      let url = "http://pre.camtic.or.kr/CAMsPot";
      if(id != ""){
        url = "http://pre.camtic.or.kr/CAMsPot/Login.aspx?NEWCAMTICS="+id;
      }
      var name = "_blank";
      var option = "";
      var popup = window.open(url, name, option);
  }

</script>
