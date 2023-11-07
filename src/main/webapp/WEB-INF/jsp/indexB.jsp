<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

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
        justify-content: center;
    }
    .contentLink{
        cursor : pointer;
        color: #696C74;
    }
    a:hover {
        text-decoration: underline;
    }
</style>

<div id="mainContent">
    <div class="col-md-2 col-lg-2" style="margin-top:-10px;">
        <div class="media leftpanel-profile" style="text-align:center; background-color:#fff;">
            <div id="idPhotoDiv">
                <a href="#">
                    <c:choose>
                        <c:when test="${loginVO.picFilePath ne '' and loginVO.picFilePath ne null}">
                            <img src="${loginVO.picFilePath}" alt="" class="media-object img-circle" style="height: 100px;text-align: center; margin: 0 auto; margin-bottom: 10px; width:100px;">
                        </c:when>
                        <c:otherwise>
                            등록된 증명사진이 없습니다.
                        </c:otherwise>
                    </c:choose>
                </a>
            </div>
            <div class="media-body">
                <h4 class="media-heading" style="color:#333;font-size:18px; font-weight:600;letter-spacing: -2px;">${loginVO.name}</h4>
                <span style="color:#919191; font-size:15px;line-height:32px;letter-spacing: -2px;">${loginVO.orgnztNm}</span>
            </div>
            <div style="margin-top:10px;">
                <div style="display:flex; justify-content: space-between; margin: 0px 10px;height:25px;"><span style="color:#333;font-weight:600;">결재할 문서</span><span style="color:#919191;font-weight:600;cursor:pointer;" onclick="open_in_frame('/approvalUser/approveWaitDocList.do')">0</span></div>
                <div style="display:flex; justify-content: space-between; margin: 0px 10px;height:25px;"><span style="color:#333;font-weight:600;">오늘의 일정</span><span style="color:#919191;font-weight:600;">0</span></div>
                <div style="display:flex; justify-content: space-between; margin: 0px 10px;height:25px;"><span style="color:#333;font-weight:600;">작성할 보고</span><span style="color:#919191;font-weight:600; color:#259dab;">120</span></div>
            </div>
        </div>
        <div class="panel" style="margin-top:10px;margin-bottom:10px;">
            <div style="padding: 17px 0 0 25px; display: flex; align-items: center;">
                <h4 class="media-heading" style="color:#333;font-size:18px; font-weight:600;letter-spacing: -2px;">임직원 생일</h4>
                <span id="currentYearMonth" style="font-weight:600; font-size:15px; margin-left: 120px;"></span>
            </div>
            <div class="panel-body" id="empBirthDayList" style="padding:5px;">
            </div>
        </div>
        <div class="panel" style="margin-bottom:10px;">
            <div style="padding: 25px 0 0 25px; height: 53px;">
                <h4 class="media-heading" style="color:#333;font-size:18px; font-weight:600;letter-spacing: -2px;">일정</h4>
            </div>
            <div class="panel-body" style="padding:5px;">
                <div class="demo-section" style="text-align: center; width:300px; height: 343px;">
                    <div id="calendar"></div>
                </div>
                <script>
                    $(document).ready(function() {
                        // create Calendar from div HTML element
                        $("#calendar").kendoCalendar();
                    });
                </script>
            </div>
        </div>
    </div>
    </div>
    <div class="col-md-7 col-lg-7" style="margin-top:-10px;">
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
                     <li><a href="#tab5" data-toggle="tab"onclick="getActiveList('tab5Ul', '43')"><strong style="font-size:14px;">홍보자료</strong></a></li>
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
        <div class="panel-body">
            <div class="card">
                <!-- 메일함 -->
                <ul class="nav nav-tabs nav-justified">
                    <li class="active"><a href="#tab6" data-toggle="tab" onclick="getOpenStudy();"><strong style="font-size:14px;">오픈스터디</strong></a></li>
                    <li><a href="#tab7" data-toggle="tab" onclick="getscheduleList('schedule2Ul','CS');"><strong style="font-size:14px;">법인일정</strong></a></li>
                    <li><a href="#tab8" data-toggle="tab" onclick="getscheduleList('schedule3Ul','ES');"><strong style="font-size:14px;">직원일정</strong></a></li>
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
    <div class="col-md-3 col-sm-3" style="margin-top:-10px; padding-left:0;">
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
                    <h3 class="panel-title" style="color:#505b72; text-align:center; font-weight:600;"><a href="#" style="margin-right: 30px;" onclick="open_in_frame('/bustrip/bustripList.do')"><i class="fa fa-tasks" style="font-size:20px;padding:11px 11px 11px 0;"></i><span style="font-size:13px;">출장신청</span></a></h3>
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
                    <img src="/images/ico/ic_setting_on.png" alt="" class="media-object img-circle" style="position: absolute; top: 0; right: 46px; width: 20px;">
                </h4>
            </div>
            <div class="panel-body" style="padding:5px;">
                <div style="border:1px solid #eee; border-radius:10px; width:300px; height:195px; margin:10px auto; position:relative;">
                    <div style="padding: 20px 0px 40px 20px;">
                        <div style="line-height:20px;"><span style="font-weight: 600; font-size: 14px;">· 휴가관리</span></div>
                        <div style="line-height:20px;"><span style="font-weight: 600; font-size: 14px;">· [캠인사이드] 인사관리</span></div>
                        <div style="line-height:20px;"><span style="font-weight: 600; font-size: 14px;">· [캠인사이드] 자산관리</span></div>
                        <div style="line-height:20px;"><span style="font-weight: 600; font-size: 14px;">· [캠인사이드] 출장관리</span></div>
                    </div>
                  <%--  <div style="border-top:1px solid #eee; text-align:center;">
                        <span style="font-size: 15px; line-height: 45px; font-weight: 600;">즐겨찾기 설정</span>
                    </div>--%>
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
                    <img id="recentImage" alt="" style="width:300px; height:244px;">
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
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    var currentMonth = currentDate.getMonth() + 1;
    var currentYearMonth = currentYear + '.' + currentMonth;
    var showCurrentMonth = document.querySelector('#currentYearMonth');
    showCurrentMonth.textContent = currentYearMonth;

    $(function (){
        var menuNm = '${menuNm}';

        if(menuNm != '' && menuNm != null && menuNm != undefined && menuNm != '/indexBMain.do'){
            open_in_frame(menuNm);
        }
        getOpenStudy();
        getscheduleList();
        getRecentImage();
        getEmpBirthDayList();
    });

    getActiveList('tab1Ul', 'all');

    function getActiveList(v, e){
        $("#" + v + " li").remove();

        var data = {
            recordSize : 5,
            boardId : e,
        }
        var result = customKendo.fn_customAjax("/board/getCamsBoardArticleList.do", data);
        if(result.flag){
            var html = "";
            if(result.boardArticleList.list.length > 0){
                for(var i = 0; i < result.boardArticleList.list.length; i++){
                    var article = result.boardArticleList.list[i];
                    var dt = (article.reg_DATE.year + "-" + ('00' + article.reg_DATE.monthValue).slice(-2) + "-" + ('00' + article.reg_DATE.dayOfMonth).slice(-2));

                    if(v == "tab1Ul"){
                        html += '' +
                            '<li style="border-top:0; border-bottom:0;">' +
                                '<div style="padding: 10px 10px 0px;">' +
                                    '<a class="contentLink" onclick="open_in_frame(\'/board/normalBoardDetail.do?boardArticleId=' + article.board_ARTICLE_ID + '\')">' +
                                    '<span style="font-weight:600; font-size:15px;">' + article.board_ARTICLE_TITLE + '</span><span>[' + article.reply_CNT + ']</span>' +
                                    '</a>' +
                                '</div>' +
                                '<div style="padding: 5px 10px;">' +
                                    '<span style="margin-right:10px;">' + dt + '</span>' +
                                    '<span style="margin-right:10px;">' + article.reg_EMP_NAME + '</span>' +
                                    '<span style="margin-right:10px;">|</span><span>' + article.board_NAME + '</span>' +
                                '</div>' +
                            '</li>';
                    }else{
                        html += '<li>' +

                                    '<p style="padding: 10px 10px 0px;">' +
                                        '<a class="contentLink" onclick="open_in_frame(\'/board/normalBoardDetail.do?boardArticleId=' + article.board_ARTICLE_ID + '\')">' +
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

    function getOpenStudy(e) {
        $.ajax({
            url: '/campus/getOpenStudyInfoList',
            type: 'GET',
            data: {
                OPEN_STUDY_INFO_SN: e,
            },
            success: function (data) {
                const filteredData = data.list.filter(item => item.STEP === 'B');
                const sortedData = filteredData.sort((a, b) => b.SN - a.SN);
                const recentData = sortedData.slice(0, 3);
                drawTable(recentData);
            },
        });
    }

    function drawTable(data){

        $("#schedule1Ul").html('');

        let html = "";

        data.forEach((item, index) => {
            console.log(item);
            html += '' +
                '<li style="border-top:0; border-bottom:0;">' +
                '<div style="padding: 10px 10px 0px; display:flex; justify-content: space-between;">' +
                '<div style="display:flex;">' +
                '<div style="font-weight:600; font-size:13px; margin-right:10px; width:100px;">오픈스터디</div>' +
                '<div><a href="javascript:openStudyReqPop('+item.OPEN_STUDY_INFO_SN+')">' + item.OPEN_STUDY_NAME + '</a></div>' +
                '</div>' +
                '<div>' + item.OPEN_STUDY_DT + '</div>' +
                '</div>' +
                '</li>';
        });
        $("#schedule1Ul").append(html);

    }


    function getscheduleList(v, e){
        $("#" + v + " li").remove();

        var data = {
            publicClass : e
        }

        var result = customKendo.fn_customAjax("/spot/getScheduleList.do", data);
        console.log(result);
        if(result.flag){
            var html = "";

                result.list.sort(function(a, b) {
                    return new Date(b.start) - new Date(a.start);
                });

                if (result.list.length > 0){
                var recentPosts = result.list.slice(0, 3);
                for (var i = 0; i < recentPosts.length; i++) {
                    console.log(recentPosts);
                    var article  = result.list[i];
                    var scheduleTypeList = {
                        "EV": "행사",
                        "ME": "회의",
                        "ED": "교육",
                        "WR": "업무관련",
                        "BD": "생일",
                        "TR": "출장",
                        "HD": "휴일",
                        "OT": "기타"
                    };
                    var scheduleType = scheduleTypeList[article.SCHEDULE_TYPE] || article.SCHEDULE_TYPE;

                    console.log(result.list)

                    if(v == "schedule2Ul"){
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
                    }else{
                        html += '' +
                            '<li style="border-top:0; border-bottom:0;">' +
                            '<div style="padding: 10px 10px 0px; display:flex; justify-content: space-between;">' +
                            '<div style="display:flex;">' +
                            '<div style="font-weight:600; font-size:13px;  width:100px;">직원일정</div>' +
                            '<div>' + scheduleType + '</div>' +
                            '<div style="margin-left: 20px;">' + article.REG_EMP_NAME + '</div>' +
                            '<div style="margin-left: 20px;"><a href="javascript:fn_detailSchedule(' + article.SCHEDULE_BOARD_ID + ')">' + article.SCHEDULE_TITLE + '</a></div>' +
                            '</div>' +
                            '<div style="margin: 0 10px;">' + article.start + ' ~ ' + article.end + '</div>'
                            '</div>' +
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

    function getRecentImage() {
        $.ajax({
            url: "/spot/getWatchBoardOne",
            async: false,
            type: "GET",
            success: function (data) {
                var returnData = data.rs;
                if (returnData.file_path && returnData.file_uuid) {
                    var imageUrl = returnData.file_path + returnData.file_uuid;

                    $("#recentImage").attr("src", imageUrl);
                }
            }
        });
    }

    function openStudyReqPop(pk){
        let mode = "upd";
        let url = "/Campus/pop/openStudyReqPop.do?mode="+mode;
            url += "&pk="+pk;
        const name = "openStudyReqPop";
        const option = "width = 990, height = 548, top = 100, left = 400, location = no";
        window.open(url, name, option);
    }

    function fn_detailSchedule(key){
        var url = "/spot/pop/popScheduleView.do?scheduleBoardId=" + key;
        var name = "_blank";
        var option = "width = 750, height = 440, top = 50, left = 400, location = no"
        var popup = window.open(url, name, option);
    }

    function getEmpBirthDayList() {
        $.ajax({
            url: '/userManage/getEmpBirthDayInfoList',
            type: 'GET',
            success: function (data) {
                drawTable(data.list);
            },
        });
    }

    function drawTable(data){

        $("#empBirthDayList").html('');

        let html = "";

        data.forEach((item, index) => {
            console.log(item);
            html += '' +
                '<div style="padding: 10px 25px; display:flex; justify-content: space-between; border-top: 1px solid #eee;">' +
                '<div style="display:flex;">' +
                '<div style="font-weight:600; font-size:13px; margin-right:10px; width:50px;">' + item.EMPBDAY + '</div>' +
                '<div>' + item.EMP_NAME_KR  + ' ' + item.SPOT + '</div>' +
                '</div>' +
                '</div>';
        });

        $("#empBirthDayList").append(html);
    }



</script>
