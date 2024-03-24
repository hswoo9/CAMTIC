<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<link href="/css/schedule/pignose.calendar.min.css" rel="stylesheet">

<style>
    .boxCss{width:190px; height:90px; color:#fff; background-color:#259dab; text-align:center;}
    .boxCss:hover{background-image: linear-gradient(to right, #259dab 0%, #2574ab 100%);}
    .popupTable th{padding:5px!important; vertical-align: middle!important; text-align: center; background-color: #bdc3d1ad;}
    .timeBoxSt{text-align: center; font-size: 20px;}
    .timeBox{padding: 10px;}
    .col-lg-2{
        width: 20%!important;
    }
    .col-lg-7{
        width: 55%!important;
    }
    #idPhotoDiv {
        height: 110px;
        display: flex;
        align-items: center;
        justify-content: left;
    }
    .contentLink{
        cursor : pointer;
        color: #696C74;
    }
    a:hover {
        text-decoration: underline;
    }
    .__lab {display:inline-flex;gap:0.2rem;align-items:center;position:relative;}
    .__lab span{font-weight: normal;}

    #transparent-link {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 2;
        background-color: transparent;
        cursor: pointer;
    }
</style>

<div class="col-md-2 col-lg-2" id="mainContent" style="float: left">
    <div style="margin-top:-10px;">
        <div class="media leftpanel-profile" style="text-align:center; background-color:#fff; margin-bottom: 10px">
            <div id="idPhotoDiv">
                <a href="#">
                    <c:choose>
                        <c:when test="${loginVO.picFilePath ne '' and loginVO.picFilePath ne null}">
                            <img src="${loginVO.picFilePath}" alt="" class="media-object img-circle" style="height: 100px;text-align: center; margin: 0 20px;">
                        </c:when>
                        <c:otherwise>
                            등록된 증명사진이 없습니다.
                        </c:otherwise>
                    </c:choose>
                </a>
                <div class="media-body" style="margin-right: 35px;">
                    <h4 class="media-heading" style="color:#333;font-size:18px; font-weight:600;letter-spacing: -2px;">${loginVO.name}</h4>
                    <span style="color:#919191; font-size:15px;line-height:32px;letter-spacing: -2px;">${loginVO.orgnztNm}</span>
                </div>
            </div>

            <div id="timeDiv">
                <div id="timeClock" style="float:left; text-align:left;">
                    <div id="date" class="date"></div>
                    <div id="time" class="time" style="font-size:30px;"></div>
                </div>
                <div id="timeWork" style="display: none; float:right; margin-right:10px; text-align:left;" >
                    <p id="workingTime">출근 시간 &nbsp&nbsp 09:00:07</p>
                    <p id="workTime">퇴근 시간 &nbsp&nbsp --:--:--</p>
                </div>
                <div style="clear: both;"></div>
            </div>
            <div style="margin-top:10px;">
                <div style="display:flex; justify-content: space-between; margin: 0px 10px;height:25px;"><span style="color:#333;font-weight:600;">상신중 문서</span><span style="color:#1286ff;font-weight:600; cursor:pointer;" onclick="open_in_frame('/approvalUser/storageBoxDraftDocList.do')">${strStatus} 건</span></div>
                <div style="display:flex; justify-content: space-between; margin: 0px 10px;height:25px;"><span style="color:#333;font-weight:600;">결재할 문서</span><span style="color:#c93434;font-weight:600; cursor:pointer;" onclick="open_in_frame('/approvalUser/approveWaitDocList.do')">${waitStatus} 건</span></div>
                <div style="display:flex; justify-content: space-between; margin: 0px 10px;height:25px;"><span style="color:#333;font-weight:600;">승인 대기</span><span style="color:#919191;font-weight:600; cursor:pointer;" onclick="<c:if test="${ckCheck.CK_COUNT eq 'Y'}">open_in_frame('/process/processCheckList.do')</c:if>">${ckStatus} 건</span></div>
                <div style="display:flex; justify-content: space-between; margin: 0px 10px;height:25px;"><span style="color:#333;font-weight:600;">반려 문서</span><span style="color:#919191;font-weight:600; cursor:pointer;" onclick="open_in_frame('/approvalUser/storageBoxReturnDocList.do')">${retStatus} 건</span></div>
            </div>
        </div>

        <div class="panel" style="margin-bottom: 10px">
            <div style="background-color: #fff;">
                <div style="padding: 21px 0 0 25px; display: flex; align-items: center;">
                    <h4 class="media-heading" style="color:#333;font-size:18px; font-weight:600;letter-spacing: -2px;">임직원 생일</h4>
                </div>
                <div class="panel-body" id="empBirthDayList" style="padding:0; width:285px; height:120px; margin-left:10px; margin-top:4px;">
                </div>
            </div>
        </div>

        <div class="panel" style="margin-bottom:10px;">
            <div style="padding: 25px 0 0 25px; height: 53px;">
                <h4 class="media-heading" style="color:#333;font-size:18px; font-weight:600;letter-spacing: -2px;">일정</h4>
                <div class="selectBtn" style="float: right; margin-top:-12px; margin-right:15px; ">
                    <label class="__lab">
                        <input type="radio" name="scheBtn" value="CS" checked onclick="updateScheduleCont(this.value)"/>
                        <i></i><span>법인일정</span>
                    </label>
                    <label class="__lab">
                        <input type="radio" name="scheBtn" value="ES" onclick="updateScheduleCont(this.value)"/>
                        <i></i><span>직원일정</span>
                    </label>
                </div>
            </div>
            <div class="panel-body" style="padding:5px;">
                <div class="demo-section" style="text-align: center; width:300px; height: 323px;">
                      <div class="card" style="border-radius:0; margin-top:20px;">
                          <div style="margin:10px 0 0 15px;">
                              <div class="year-calendar"></div>
                          </div>
                      </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="col-md-7 col-lg-7" style="margin-top:-10px; float:left;">
    <div class="panel" style="margin-bottom:10px; height: 465px;">
        <div style="padding: 25px 0 0 25px;">
            <h4 class="media-heading" style="color:#333;font-size:18px; font-weight:600;letter-spacing: -2px;">게시판 최근글</h4>
        </div>
        <div class="panel-body">
            <div class="card">
                <!-- Nav tabs -->
                <ul class="nav nav-tabs nav-justified">
                    <li class="active"><a href="#tab1" data-toggle="tab" onclick="getActiveList('tab1Ul', 'all')"><strong style="font-size:14px;">전체</strong></a></li>
                    <li><a href="#tab2" data-toggle="tab" onclick="getActiveList('tab2Ul', '40')"><strong style="font-size:14px;">공지사항</strong></a></li>
                    <li><a href="#tab3" data-toggle="tab" onclick="getActiveList('tab3Ul', '41')"><strong style="font-size:14px;">업무보고</strong></a></li>
                    <li><a href="#tab4" data-toggle="tab" onclick="getActiveList('tab4Ul', '42')"><strong style="font-size:14px;">업무메뉴얼</strong></a></li> <!--규정/지침/절차/양식-->
                    <li><a href="#tab5" data-toggle="tab" onclick="getActiveList('tab5Ul', '43')"><strong style="font-size:14px;">홍보자료</strong></a></li>
                </ul>

                <!-- Tab panes -->
                <div class="tab-content">
                    <div class="tab-pane active" id="tab1" style="padding:20px 0; border-top: 1px solid #eee;border-bottom: 1px solid #eee;">
                        <div class="panel-body" style="padding:0 10px;">
                            <ul class="nav nav-quirk" style="margin:0;" id="tab1Ul">

                            </ul>
                        </div>
                    </div>
                    <div class="tab-pane" id="tab2">
                        <div class="panel-body" style="padding:0 10px;">
                            <ul class="nav nav-quirk" style="margin:0;" id="tab2Ul">

                            </ul>
                        </div>
                    </div>
                    <div class="tab-pane" id="tab3">
                        <div class="panel-body" style="padding:0 10px;">
                            <ul class="nav nav-quirk" style="margin:0;" id="tab3Ul">

                            </ul>
                        </div>
                    </div>
                    <div class="tab-pane" id="tab4">
                        <div class="panel-body" style="padding:0 10px;">
                            <ul class="nav nav-quirk" style="margin:0;" id="tab4Ul">

                            </ul>
                        </div>
                    </div>
                    <div class="tab-pane" id="tab5">
                        <div class="panel-body" style="padding:0 10px;">
                            <ul class="nav nav-quirk" style="margin:0;" id="tab5Ul">

                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="panel" style="height: 407px;">
        <div style="padding: 25px 0 0 25px;">
            <h4 class="media-heading" style="color:#333;font-size:18px; font-weight:600;letter-spacing: -2px;">주요일정</h4>
        </div>
        <div>
            <i class="k-i-plus k-icon" style="cursor: pointer; float: right;font-size:20px; margin:35px 20px 0 0;" onclick="goMoreView();"></i>
            <input type="hidden" id="moreId" value="" />
        </div>

        <div class="panel-body">
            <div class="card">
                <!-- 메일함 -->
                <ul class="nav nav-tabs nav-justified">
                    <li class="active"><a href="#tab6" data-toggle="tab" onclick="getscheduleList('schedule1Ul','CS');"><strong style="font-size:14px;">법인일정</strong></a></li>
                    <li><a href="#tab7" data-toggle="tab" onclick="getscheduleList('schedule2Ul','ES');"><strong style="font-size:14px;">직원일정</strong></a></li>
                    <li><a href="#tab8" data-toggle="tab" onclick="getOpenStudy();"><strong style="font-size:14px;">오픈스터디</strong></a></li>
                </ul>

                <!-- Tab panes -->
                <div class="tab-content">
                    <div class="tab-pane active" id="tab6" style="padding:20px 0; border-top: 1px solid #eee;border-bottom: 1px solid #eee;">
                        <div class="panel-body" style="padding:0 10px;">
                            <ul class="nav nav-quirk" style="margin:0;" id="schedule1Ul">

                            </ul>
                        </div>
                    </div>
                    <div class="tab-pane" id="tab7" style="padding:20px 0; border-top: 1px solid #eee;border-bottom: 1px solid #eee;">
                        <div class="panel-body" style="padding:0 10px;">
                            <ul class="nav nav-quirk" style="margin:0;" id="schedule2Ul">

                            </ul>
                        </div>
                    </div>
                    <div class="tab-pane" id="tab8" style="padding:20px 0; border-top: 1px solid #eee;border-bottom: 1px solid #eee;">
                        <div class="panel-body" style="padding:0 10px;">
                            <ul class="nav nav-quirk" style="margin:0;" id="schedule3Ul">

                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="col-md-3 col-sm-3" style="margin-top:-10px; padding-left:0; float: left">
    <div class="col-md-6 col-sm-6" style="padding-right:0;">
        <div class="panel" style="margin-bottom:10px;">
            <div class="panel-heading" style="background-color: #fff; padding:5px;">
                <h3 class="panel-title" style="color:#505b72; text-align:center; font-weight:600;"><a href="#" style="margin-right: 50px;" onclick="open_in_frame('/purc/purcReqList.do')"><i class="fa fa-shopping-cart" style="font-size:20px;padding:11px 11px 11px 0;"></i><span style="font-size:13px;">구매</span></a></h3>
            </div>
        </div><!-- panel -->
    </div>
    <div class="col-md-6 col-sm-6" style="padding-right:0;">
        <div class="panel" style="margin-bottom:10px;">
            <div class="panel-heading" style="background-color: #fff; padding:5px;">
                <h3 class="panel-title" style="color:#505b72; text-align:center; font-weight:600;"><a href="#" style="margin-right: 30px;" onclick="open_in_frame('/bustrip/bustripList2.do')"><i class="fa fa-tasks" style="font-size:20px;padding:11px 11px 11px 0;"></i><span style="font-size:13px;">출장신청</span></a></h3>
            </div>
        </div><!-- panel -->
    </div>
    <div class="col-md-6 col-sm-6" style="padding-right:0;">
        <div class="panel" style="margin-bottom:10px;">
            <div class="panel-heading" style="background-color: #fff; padding:5px;">
                <h3 class="panel-title" style="color:#505b72; text-align:center; font-weight:600;"><a href="#" onclick="open_in_frame('/Inside/carReq.do')"><i class="fa fa-car" style="font-size:20px;padding:11px 11px 11px 0;"></i><span style="font-size:13px;">차량사용신청</span></a></h3>
            </div>
        </div><!-- panel -->
    </div>
    <div class="col-md-6 col-sm-6" style="padding-right:0;">
        <div class="panel" style="margin-bottom:10px;">
            <div class="panel-heading" style="background-color: #fff; padding:5px;">
                <h3 class="panel-title" style="color:#505b72; text-align:center; font-weight:600;"><a href="#" onclick="open_in_frame('/Inside/meetingRoomReq.do')"><i class="fa fa-building" style="font-size:20px;padding:11px 11px 11px 0;"></i><span style="font-size:13px;">회의실사용신청</span></a></h3>
            </div>
        </div><!-- panel -->
    </div>
    <div class="col-md-6 col-sm-6" style="padding-right:0;">
        <div class="panel" style="margin-bottom:10px;">
            <div class="panel-heading" style="background-color: #fff; padding:5px;">
                <h3 class="panel-title" style="color:#505b72; text-align:center; font-weight:600;"><a href="#" style="margin-right: 20px;" onclick="open_in_frame('/Inside/equipmentList.do')"><i class="fa fa-calendar-o" style="font-size:20px;padding:11px 11px 11px 0;"></i><span style="font-size:13px;">장비활용</span></a></h3>
            </div>
        </div><!-- panel -->
    </div>
    <div class="col-md-6 col-sm-6" style="padding-right:0;">
        <div class="panel" style="margin-bottom:10px;">
            <div class="panel-heading" style="background-color: #fff; padding:5px;">
                <h3 class="panel-title" style="color:#505b72; text-align:center; font-weight:600;"><a href="#" style="margin-right: 40px;" onclick="open_in_frame('/spot/requestBoardList.do?requestType=R')"><i class="fa fa-desktop" style="font-size:20px;padding:11px 11px 11px 0;"></i><span style="font-size:13px;">전산보완</span></a></h3>
            </div>
        </div><!-- panel -->
    </div>
    <div class="col-md-12 col-sm-12" style="padding-right:0;">
        <div class="panel" style="margin-bottom:10px;">
            <div style="padding: 25px 0 0 25px;">
                <h4 class="media-heading" style="color: #333; font-size: 18px; font-weight: 600; letter-spacing: -2px; position: relative;">
                    캠스팟 즐겨찾기
                    <img src="/images/ico/ic_setting.png" alt="" id ="favoriteMenu" onclick="fn_favoriteMenu();" class="media-object img-circle" style="position: absolute; top: 0; right: 46px; width: 20px; cursor:pointer;" >
                </h4>
            </div>
            <div class="panel-body" style="padding: 5px;">
                <div style="border: 1px solid #eee; border-radius: 10px; width: 330px; height: 170px; margin: 23px auto; position: relative;">
                    <div class="fvList" style="display: flex; flex-wrap: wrap; align-content: flex-start; margin-top:17px; margin-left:29px; width:80%; height:80%;">

                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-12 col-sm-12" style="padding-right:0;">
        <div class="panel" style="margin-bottom:10px; height:345px;">
            <div style="padding: 25px 0 0 25px;">
                <h4 class="media-heading" style="color:#333;font-size:18px; font-weight:600;letter-spacing: -2px;">함께보아요</h4>
            </div>
            <div class="panel-body">
                <div style="text-align:center;">
                    <a class="contentLink" href="javascript:detailPageMove()">
                        <img id="recentImage" alt="" width="350" height="220" style="cursor:pointer;">
                    </a>
                </div>
                <div style="margin-top: 10px;text-align: center;">
                    <span id="recentImageTitle" style="font-weight: bold;"></span>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-12 col-sm-12" style="padding-right:0;">
        <div class="panel" style="margin-bottom:10px;">
            <div class="panel-heading" style="background-color: #505b72; padding:5px;">
                <h3 class="panel-title" style="color:#fff; text-align:center; font-weight:600;"><a href="https://teams.microsoft.com" target='_blank'><i class="fa fa-download" style="font-size:20px;padding:11px 11px 11px 0;"></i>팀즈</a></h3>
            </div>
        </div><!-- panel -->
    </div>
</div>
</div>
<script>
    /*var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    var currentMonth = currentDate.getMonth() + 1;
    var currentYearMonth = currentYear + '.' + currentMonth;
    var showCurrentMonth = document.querySelector('#currentYearMonth');
    showCurrentMonth.textContent = currentYearMonth;*/

    var watchBoardId = "";

    var scheduleDate = {
        labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        series: [
            [5, 4, 3, 7, 5, 10, 3, 4, 8, 10, 6, 8],
            [3, 2, 9, 5, 4, 6, 4, 6, 7, 8, 7, 4],
            [4, 6, 3, 9, 6, 5, 2, 8, 3, , 5, 4],
        ]
    };

    var options = {
        seriesBarDistance: 10
    };

    var responsiveOptions = [
        ['screen and (max-width: 640px)', {
            seriesBarDistance: 5,
            axisX: {
                labelInterpolationFnc: function(value) {
                    return value[0];
                }
            }
        }]
    ];

    $(function (){
        var menuNm = '${menuNm}';

        if(menuNm != '' && menuNm != null && menuNm != undefined && menuNm != '/indexBMain.do'){
            open_in_frame(menuNm);
        }
        updateScheduleCont();

        var paramYear = $(".pignose-calendar-top-year").text();
        var paramMonth = $(".pignose-calendar-top-month").text().replace("월", "");
        var transparentLink = document.createElement('a');
        transparentLink.href = "javascript:open_in_frame('/spot/empScheduleList.do?year=" + paramYear + "&month=" + paramMonth + "')";
        transparentLink.style.position = 'absolute';
        transparentLink.style.top = '0';
        transparentLink.style.left = '0';
        transparentLink.style.width = '100%';
        transparentLink.style.height = '100%';
        transparentLink.style.opacity = '0';
        transparentLink.style.cursor = 'pointer';
        transparentLink.onclick = function() {
            open_in_frame('/spot/empScheduleList.do?year=' + paramYear + '&month=' + paramMonth);
        };

        $('.pignose-calendar-top-month').each(function() {
            var parent = $(this).parent();
            parent.append(transparentLink.cloneNode(true));
        });
    });

    //대쉬보드 일정 표시
    function updateScheduleCont() {
        var publicClass = $("input[name='scheBtn']:checked").val();

        new Chartist.Bar('.ct-bar-chart', scheduleDate, options, responsiveOptions);

        var result = {"publicClass" : publicClass};
        var ds = customKendo.fn_customAjax("/spot/getScheduleList.do", result);
        var calendarData = new Array();
        if (ds.flag) {
            var data = ds.list;
            for (var a = 0; a < data.length; a++) {
                var start = ds.list[a].startDate == null ? ds.list[a].start : ds.list[a].startDate;
                var end = ds.list[a].endDate == null ? ds.list[a].end : ds.list[a].endDate;
                var id = ds.list[a].SCHEDULE_BOARD_ID;
                //날짜비교
                var lastDate = new Date(end);
                var curDate = new Date(start);
                while(curDate <= lastDate) {
                    var pushData = {
                        name: "offer",
                        date: curDate.getFullYear() + "-" + ("0" + (curDate.getMonth() + 1)).slice(-2) + "-" +  ("0" + curDate.getDate()).slice(-2),
                        id : id
                    };
                    calendarData.push("pushData", pushData);
                    curDate.setDate(curDate.getDate() + 1);
                }
            }
        }
        $('.year-calendar').pignoseCalendar({
            scheduleOptions: {
                colors: {
                    offer: '#2fabb7',
                    ad: '#5c6270'
                },
                lang: 'ko',
            },
            theme: 'blue', // light, dark, blue
            schedules: calendarData,
            select: function (dates, context) {
                var selectedDate = dates[0].format('YYYY-MM-DD');

                var haveSchedule = calendarData.some(function (schedule) {
                    return schedule.date === selectedDate;
                });

                var finalId = [];
                var boardId = "";

                $.each(calendarData, function(inx, item){
                    if(item.date == selectedDate){
                        finalId.push(item.id);
                    }
                });
                if (haveSchedule) {
                    openSchedulePopup(selectedDate, publicClass, "calendar");
                    /*if (publicClass === 'ES') {
                        openSchedulePopup(selectedDate);
                    } else if (publicClass === 'CS') {
                        fn_detailSchedule(finalId, selectedDate);
                    }*/
                }
            },

        });
        $('.pignose-calendar-top-month').css('cursor', 'pointer');
        $('.pignose-calendar-top .pignose-calendar-top-month').click(function() {
            let paramYear = $(".pignose-calendar-top-year").text();
            let paramMonth = $(".pignose-calendar-top-month").text().replace("월", "");
            open_in_frame('/spot/empScheduleList.do?year=' + paramYear + '&month=' + paramMonth);
        });
    }

    //일정 조회 팝업
    function openSchedulePopup(selectedDate, publicClass, type) {
        var url = "/spot/pop/popMainScheduleView.do?selectedDate=" + selectedDate + "&publicClass=" + publicClass + "&type=" + type;
        /*var url = "/spot/pop/popStaffScheduleView.do?selectDate=" + selectedDate;*/
        var name = "_blank";
        var option = "width = 1000, height = 700, top = 50, left = 400, location = no, scrollbars=yes, resizable=yes"
        var popup = window.open(url, name, option);
    }

    //대쉬보드 시간 표시
    function setClock() {
        var dateInfo = new Date();
        var hour = modifyNumber(dateInfo.getHours());
        var min = modifyNumber(dateInfo.getMinutes());
        var sec = modifyNumber(dateInfo.getSeconds());
        var year = dateInfo.getFullYear();
        var month = dateInfo.getMonth()+1
        var date = dateInfo.getDate();
        var days = ['일', '월', '화', '수', '목', '금', '토'];
        var dayOfWeek = days[dateInfo.getDay()];

        $("#date").html(year + "년 " + month + "월 " + date + "일 (" + dayOfWeek + ")");
        $("#time").html(hour + ":" + min + ":" + sec);

        requestAnimationFrame(setClock);
    }

    function modifyNumber(time){
        if(parseInt(time)<10){
            return "0" + time;
        }else
            return time;
    }

    $("#calendar").kendoCalendar();
    setClock();
    getActiveList('tab1Ul', 'all');
    getOpenStudy();
    getscheduleList('schedule1Ul','CS')
    getRecentImage();
    getEmpBirthDayList();
    getFvList();

    //게시판 연동
    function getActiveList(v, e){
        $("#" + v + " li").remove();

        var data = {
            recordSize : 8,
            boardId : e,
        }
        var result = customKendo.fn_customAjax("/board/getCamsBoardArticleList.do", data);
        if(result.flag){
            var html = "";
            if(result.boardArticleList.list.length > 0){
                for(var i = 0; i < result.boardArticleList.list.length; i++){
                    var article = result.boardArticleList.list[i];
                    var dt = (article.reg_DATE.year + "-" + ('00' + article.reg_DATE.monthValue).slice(-2) + "-" + ('00' + article.reg_DATE.dayOfMonth).slice(-2));

                    var title = "";
                    if(article.reply_CNT != 0){
                        title = article.board_ARTICLE_TITLE + '[' + article.reply_CNT + ']';
                    }else{
                        title = article.board_ARTICLE_TITLE
                    }

                    if(v == "tab1Ul"){
                        html += '' +
                            '<li style="border-top:0; border-bottom:0;">' +
                            '<p style="padding: 10px 10px 0px; display:flex;">' +
                            '<span style="width:120px;">' + article.board_NAME + '</span><span style="margin-right:20px;">|</span>' +
                            '<a class="contentLink" onclick="open_in_frame(\'/board/normalBoardDetail.do?boardArticleId=' + article.board_ARTICLE_ID + '&boardId=' + article.board_ID + '\')">' +
                            title +
                            '</a>' +
                            '<span style="position:absolute; right:10px;">' + dt + '</span>' +
                            '</p>' +
                            '</li>';
                    }else{
                        html += '' +
                            '<li style="border-top:0; border-bottom:0;">' +
                            '<p style="padding: 10px 10px 0px;">' +
                            '<a class="contentLink" onclick="open_in_frame(\'/board/normalBoardDetail.do?boardArticleId=' + article.board_ARTICLE_ID + '&boardId=' + article.board_ID + '\')">' +
                            article.board_ARTICLE_TITLE +
                            '</a>' +
                            '<span style="position:absolute; right:10px;">' + dt + '</span>' +
                            '</p>' +
                            '</li>';
                    }
                }
            }else{
                html += '<li>' +
                    '<p style="padding: 10px 10px 0px;">등록된 게시글이 없습니다.<span style="position:absolute; right:10px;"></span></p>' +
                    '</li>';
            }

            $("#" + v).append(html);
        }
    }

    //주요일정 > 오픈스터디
    function getOpenStudy(e) {
        $("#moreId").val("study");

        $.ajax({
            url: '/campus/getOpenStudyInfoAdminList',
            type: 'GET',
            success: function (data) {
                const filteredData = data.list.filter(item => item.STEP === 'B');
                const sortedData = filteredData.sort((a, b) => b.SN - a.SN);
                const recentData = sortedData.slice(0, 3);
                drawTable(recentData);
            },
        });
    }

    function drawTable(data){

        $("#schedule3Ul").html('');

        let html = "";

        if(data.length != 0 &&  data != null) {
            data.forEach((item, index) => {
                html += '' +
                    '<li style="border-top:0; border-bottom:0;">' +
                    '<div style="padding: 10px 10px 0px; display:flex; justify-content: space-between;">' +
                    '<div style="display:flex; width:280px;">' +
                    '<div style="font-weight:600; font-size:13px; width:150px;">오픈스터디</div>' +
                    '<div><a href="javascript:openStudyReqPop(' + item.OPEN_STUDY_INFO_SN + ')">' + item.OPEN_STUDY_NAME + '</a></div>' +
                    '</div>' +
                    '<div style="display:flex; width:100px;">' +
                    '<div>' + item.OPEN_STUDY_LOCATION + '</div>' +
                    '</div>' +
                    '<div style="display:flex; width:100px;">' +
                    '<div>' + item.MEMBER_COUNT_TOTAL + "명" + '</div>' +
                    '</div>' +
                    '<div style="margin: 0 10px;">' + item.OPEN_STUDY_DT + ' ' + item.START_TIME + ' ~ ' + item.OPEN_STUDY_DT + ' ' + item.END_TIME + '</div>'
                '</div>' +
                '</li>';
            });
        }else{
            html += '<li>' +
                '<p style="padding: 10px 10px 0px;">등록된 게시글이 없습니다.<span style="position:absolute; right:10px;"></span></p>' +
                '</li>';
        }
        $("#schedule3Ul").append(html);
    }

    function bustripDetail(hrBizReqId){
        let url = "/bustrip/pop/bustripReqPop.do?hrBizReqId="+hrBizReqId;
        let name = "bustripReqPop";
        let option = "width=1200, height=700, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        window.open(url, name, option);
    }

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    //주요일정 > 법인or직원 일정
    function getscheduleList(v, e){
        $("#" + v + " li").remove();
        $("#moreId").val(e);
        var today = formatDate(new Date());

        if(e == 'ES'){

            var esData = customKendo.fn_customAjax('/spot/getMainScheduleList2', {selectedDate : today});
            var htmlData =esData.list;

            var htmlEs = "";
            if(esData.flag) {
                if (htmlData.length > 0) {
                    for (var i = 0; i < htmlData.length; i++) {

                        htmlEs += '' +
                            '<li style="border-top:0; border-bottom:0;">' +
                            '<div style="padding: 10px 10px 0px; display:flex; justify-content: space-between;">' +
                            '<div style="display:flex;">' +
                            '<div style="font-weight:600; font-size:13px;margin-right:10px; width:100px;">직원일정</div>' +
                            '<div style="width:80px;">' + htmlData[i].SCHEDULE_TYPE + '</div>' +
                            '<div style="margin-left: 20px; display:flex; width:250px;">' + htmlData[i].DEPT_NAME + '</div>';
                        if(htmlData[i].SCHEDULE_TYPE == '출장'){
                            htmlEs +=    '<div style="margin-left: 20px; display:flex; font-weight: bold;"><a href="javascript:void(0)" onclick="bustripDetail(' + htmlData[i].HR_BIZ_REQ_ID + ');">' + htmlData[i].REG_EMP_NAME + '</a></div>';
                        }else {
                            htmlEs +=   '<div style="margin-left: 20px; display:flex;">' + htmlData[i].REG_EMP_NAME + '</div>';
                        }
                        htmlEs += '</div>' +
                            '<div style="margin: 0 10px;">' + htmlData[i].start + ' ~ ' + htmlData[i].end + '</div>' +
                            '</div>' +
                            '</li>';
                    }
                } else {
                    htmlEs += '<li>' +
                        '<p style="padding: 10px 10px 0px;">등록된 게시글이 없습니다.<span style="position:absolute; right:10px;"></span></p>' +
                        '</li>';
                }
                $("#" + v).append(htmlEs);
            }
        }else {
            var data = {
                publicClass: e,
                selectedDate : today
            }

            var result = customKendo.fn_customAjax("/spot/getScheduleList.do", data);
            console.log(result);
            if (result.flag) {
                var html = "";

                result.list.sort(function (a, b) {
                    return new Date(b.start) - new Date(a.start);
                });

                if (result.list.length > 0) {
                    var recentPosts = result.list.slice(0, 7);
                    for (var i = 0; i < recentPosts.length; i++) {
                        console.log(recentPosts);
                        var article = result.list[i];

                        html += '' +
                            '<li style="border-top:0; border-bottom:0;">' +
                            '<div style="padding: 10px 10px 0px; display:flex; justify-content: space-between;">' +
                            '<div style="display:flex;">' +
                            '<div style="font-weight:600; font-size:13px; margin-right:10px; width:100px;">법인일정</div>' +
                            '<div style="margin-left: 20px;"><a href="javascript:fn_detailSchedule(' + article.SCHEDULE_BOARD_ID + ')">' + article.SCHEDULE_TITLE + '</a></div>' +
                            '</div>' +
                            '<div style="margin: 0 10px;">' + article.start + ' ~ ' + article.end + '</div>'
                        '</div>' +
                        '</li>';
                    }
                } else {
                    html += '<li>' +
                        '<p style="padding: 10px 10px 0px;">등록된 게시글이 없습니다.<span style="position:absolute; right:10px;"></span></p>' +
                        '</li>';
                }

                $("#" + v).append(html);
            }
        }
    }

    //함께보아요 최근 이미지 가져오기
    function getRecentImage(e) {
        $.ajax({
            url: "/spot/getWatchBoardOne",
            async: false,
            type: "GET",
            success: function (data) {
                watchBoardId = data.rs.WATCH_BOARD_ID;
                if (data.rs.file_path && data.rs.file_uuid) {
                    var imageUrl = data.rs.file_path + data.rs.file_uuid;
                    var title = data.rs.BOARD_ARTICLE_TITLE;
                    $("#recentImageTitle").text(title);
                    $("#recentImage").attr("src", imageUrl);
                }
            }
        });
    }
    //함께보아요 이미지 링크연동
    function detailPageMove (){
        open_in_frame('/spot/watchBoardDetail.do?watchBoardId='+ watchBoardId);
    }

    //주요일정>오픈스터디 데이터 연동
    function openStudyReqPop(pk){
        let mode = "upd";
        let url = "/Campus/pop/openStudyReqPop.do?mode="+mode;
        url += "&pk="+pk;
        const name = "openStudyReqPop";
        const option = "width = 990, height = 548, top = 100, left = 400, location = no";
        window.open(url, name, option);
    }

    //주요일정>법인or직원일정 데이터 연동
    function fn_detailSchedule(keys, selectedDate){
        if(keys.length>1){
            var key = keys[0];
            var url = "/spot/pop/popScheduleView.do?scheduleBoardId=" + key + "&selectedDate=" + selectedDate;
        }else{
            var url = "/spot/pop/popScheduleView.do?scheduleBoardId=" + keys;
        }
        var name = "_blank";
        var option = "width = 750, height = 440, top = 50, left = 400, location = no"
        var popup = window.open(url, name, option);
    }

    //임직원 생일 조회
    function getEmpBirthDayList() {
        $.ajax({
            url: '/userManage/getEmpBirthDayInfoList',
            type: 'GET',
            success: function (data) {
                birthDayTable(data.list);
            },
        });
    }

    function birthDayTable(data){

        $("#empBirthDayList").html('');

        let html = "";

        if(data.length > 0){
            data.forEach((item, index) => {
                html += '' +
                    '<div style="padding: 10px 25px; display:flex; justify-content: space-between; border-top: 1px solid #eee;">' +
                    '<div style="display:flex;">' +
                    '<div style="font-weight:600; font-size:13px; margin-right:10px; width:50px;">' + item.EMPBDAY + '</div>' +
                    '<div>' + item.EMP_NAME_KR  + ' ' + item.SPOT + '</div>' +
                    '</div>' +
                    '</div>';
            });
        }else{
            html += '' +
                '<div style="padding: 10px 25px; display:flex; justify-content: space-between; border-top: 1px solid #eee;">' +
                "<span style='color: #999; margin-top:26px; margin-left:50px;'>임직원 생일이 없습니다.</span>" ;
                '</div>';
        }


        $("#empBirthDayList").append(html);
    }
    function fn_favoriteMenu() {
        let popupUrl = "/pop/popFvMenu.do"
        window.open(popupUrl, "RecruitPopup", "width=800, height=620, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no");
    }

    //즐겨찾기 메뉴
    function getFvList() {
        $.ajax({
            url: '/main/getFvMenu',
            type: 'GET',
            async: false,
            success: function (data) {
                fvTable(data.fs);
            },
        });
    }

    function fvTable(data){

        $(".fvList").html('');

        let html = "";

        if(data.length>0){
            data.forEach((item, index) => {
                html += '' +
                    '   <div style="width:31%;height:28%; margin-top:5px; margin-left:6px; border:1px solid #ddd; display: flex; align-items: center; justify-content: center; border-radius:5px;">' +
                    "       <a href='#' class=\"searchMenuATag\" menuPath='" + item.MENU_PATH + "' menuNamePath=\'홈 > " + item.MENU_NAME_PATH + "\' menuNameKr='" + item.MENU_NAME + "'>" + item.MENU_NAME + "</a>" +
                    '   </div>';
            });
        }else{
            html += '' +
                "<span style='color: #999; margin-top:59px; margin-left:55px;'>등록된 즐겨찾기가 없습니다.</span>" ;
        }
        $(".fvList").append(html);

        $(".searchMenuATag").on("click", function(){
            var menuPath = $(this).attr("menuPath");
            open_in_frame(menuPath);
        });
        data.data("kendoWindow").center().open();
    }
    function goMoreView(){
        var moreId = $("#moreId").val();
        var today = formatDate(new Date());

        if(moreId == "CS"){ //법인일정
            openSchedulePopup(today, "CS", "more");
        }else if(moreId == "ES"){ //직원일정
            openSchedulePopup(today, "ES", "more");
        }else if(moreId == "study"){ //오픈스터디
            open_in_frame('/Campus/openStudyInfo.do');
        }
    }
</script>
<script src="/js/schedule/custom.min.js"></script>
<script src="/js/vendors/chartist.min.js"></script>
<script src="/js/vendors/moment.min.js"></script>
<script src="/js/vendors/pignose.calendar.min.js"></script>

