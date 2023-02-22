<%--
  Created by IntelliJ IDEA.
  User: user
  Date: 2023-01-10
  Time: 오후 5:11
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">
    <!--<link rel="shortcut icon" href="/images/favicon.png" type="image/png">-->

    <title>CAM's Pot - CAMTIC</title>

    <link rel="stylesheet" href="/lib/Hover/hover.css">
    <link rel="stylesheet" href="/lib/fontawesome/css/font-awesome.css">
    <link rel="stylesheet" href="/lib/weather-icons/css/weather-icons.css">
    <link rel="stylesheet" href="/lib/ionicons/css/ionicons.css">
    <link rel="stylesheet" href="/lib/jquery-toggles/toggles-full.css">
    <link rel="stylesheet" href="/lib/morrisjs/morris.css">

    <link rel="stylesheet" href="/css/quirk.css">
    <link rel="stylesheet" href="/css/style.css">

    <script src="/lib/modernizr/modernizr.js"></script>

    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <script src="/lib/html5shiv/html5shiv.js"></script>
    <script src="/lib/respond/respond.src.js"></script>
    <![endif]-->

    <script src="/lib/jquery/jquery.js"></script>
    <script src="/lib/jquery-ui/jquery-ui.js"></script>
    <script src="/lib/bootstrap/js/bootstrap.js"></script>
    <script src="/lib/jquery-toggles/toggles.js"></script>

    <script src="/lib/morrisjs/morris.js"></script>
    <script src="/lib/raphael/raphael.js"></script>

    <script src="/lib/flot/jquery.flot.js"></script>
    <script src="/lib/flot/jquery.flot.resize.js"></script>
    <script src="/lib/flot-spline/jquery.flot.spline.js"></script>

    <script src="/lib/jquery-knob/jquery.knob.js"></script>

    <script src="/js/quirk.js"></script>
    <script src="/js/dashboard.js"></script>

    <script src="https://code.jquery.com/jquery-3.6.0.js" integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk=" crossorigin="anonymous"></script>

    <style>
        .boxCss{width:190px; height:90px; color:#fff; background-color:#259dab; text-align:center;}
        .boxCss:hover{background-image: linear-gradient(to right, #259dab 0%, #2574ab 100%);}

        /* 조직도 */
        .tbl_02 {table-layout: fixed; width: 88%; vertical-align: middle; margin:0 auto;}
        .tbl_02 th {border: 1px solid #d1d1d1; background: #f8f8f8; height: 40px; text-align: center; font-size: 13px; color: #2e2e2e; font-weight: 400;}
        .tbl_02 th:first-child {border-left: none;}
        .tbl_02 th:last-child {border-right: none;}
        .tbl_02 td {height: 40px; text-align: center; font-size: 12px; color: #2e2e2e; border: 1px solid #d1d1d1;}
        .tbl_02 td:first-child {border-left: none;}
        .tbl_02 td:last-child {border-right: none;}

        .tbl_02_gray {table-layout: fixed; width: 100%; vertical-align: middle;}
        .tbl_02_gray th {border: 1px solid #636363; background: #f8f8f8; height: 51px; text-align: center; font-size: 16px; color: #2e2e2e; font-weight: 400;}
        .tbl_02_gray th:first-child {border-left: none;}
        .tbl_02_gray th:last-child {border-right: none;}
        .tbl_02_gray td {height: 54px; text-align: center; font-size: 16px; color: #2e2e2e; border: 1px solid #636363; padding: 0 10px;}
        .tbl_02_gray td:first-child {border-left: none;}
        .tbl_02_gray td:last-child {border-right: none;}

        .logo_line  {display: inline-block; font-size: 16px; color: #252525; font-weight: 500; position: relative; margin-left:6%;}
        .organization {margin-top: 30px; }
        .organization .boss {display: block; width: 230px; height: 52px; text-align: center; line-height: 52px; color: #fff; }
        .organization .col_01 {background: linear-gradient(to bottom right, #008e99, #003b60);}
        .organization .col_02 {background: #033a72;}
        span.item_1.item.boss.col_01:focus{outline: 2px solid #000}

        .organization .btn {display: block; text-align: center; border: 1px solid #828282; background: #fff; position: relative;}

        .organization .type_1 {width: 188px; height: 47px; line-height: 45px; color: #033a72; background: #f9f9f9;}
        .organization .type_2 {width: 170px; height: 47px; color: #000000; background: #f1f1f1;}
        .organization .type_3 {width: 160px; height: 47px; color: #3d3d3d; background: #ffffff;}
        button.btn.type_1.item.item_3:focus{outline:2px solid #000}
        button.btn.type_2.item.item_23.item_2:focus{outline:2px solid #000}
        button.btn.type_1.item.item_4:focus{outline:2px solid #000}
        button.btn.type_2.item.item_9.item_5:focus{outline:2px solid #000}
        button.btn.type_3.item.item_10.item_6:focus{outline:2px solid #000}
        button.btn.type_3.item.item_11.item_7:focus{outline:2px solid #000}
        button.btn.type_2.item.item_12.item_5:focus{outline:2px solid #000}
        button.btn.type_3.item.item_13.item_6:focus{outline:2px solid #000}
        button.btn.type_3.item.item_14.item_7:focus{outline:2px solid #000}
        button.btn.type_3.item.item_15.item_8:focus{outline:2px solid #000}
        button.btn.type_2.item.item_16.item_5:focus{outline:2px solid #000}
        button.btn.type_3.item.item_17.item_6:focus{outline:2px solid #000}
        button.btn.type_3.item.item_18.item_7:focus{outline:2px solid #000}
        button.btn.type_3.item.item_19.item_8:focus{outline:2px solid #000}
        button.btn.type_2.item.item_20.item_5:focus{outline:2px solid #000}
        button.btn.type_3.item.item_21.item_6:focus{outline:2px solid #000}
        button.btn.type_3.item.item_22.item_7:focus{outline:2px solid #000}
        .ml_600 {margin-left: 600px;}
        .organization .item {position: relative;}
        .organization .item_1:before {content: ''; position: absolute; left: 50%; top: calc(100% + 1px); z-index: 1; transform: translateX(-50%); width: 1px; height: 87px; background: #c7c7c7; }
        .organization .item_2:before {content: ''; position: absolute; left: 50%; top: calc(100% + 1px); z-index: 1; transform: translateX(-50%); width: 1px; height: 513px; background: #c7c7c7; } /*height:452px;*/
        .organization .item_3:before {content: ''; position: absolute; right: calc(100% + 1px); top:  50%; z-index: 1; transform: translateY(-50%); width: 486px; height: 1px; background: #c7c7c7; }
        .organization .item_4:before {content: ''; position: absolute; right: calc(100% + 1px); top:  50%; z-index: 1; transform: translateY(-50%); width: 486px; height: 1px; background: #c7c7c7; }
        .organization .item_5:before {content: ''; position: absolute; right: calc(100% + 1px); top:  50%; z-index: 1; transform: translateY(-50%); width: 76px; height: 1px; background: #c7c7c7; }
        .organization .item_6:before {content: ''; position: absolute; right: calc(100% + 1px); top:  50%; z-index: 1; transform: translateY(-50%); width: 37px; height: 1px; background: #c7c7c7; }
        .organization .item_7:before {content: ''; position: absolute; right: calc(100% + 1px); top:  50%; z-index: 1; transform: translateY(-50%); width: 37px; height: 1px; background: #c7c7c7; }
        .organization .item_8:before {content: ''; position: absolute; right: calc(100% + 1px); top:  50%; z-index: 1; transform: translateY(-50%); width: 32px; height: 1px; background: #c7c7c7; }
        .organization .item_9:before {content: ''; position: absolute; right: calc(100% + 1px); top:  50%; z-index: 1; transform: translateY(-50%); width: 75px; height: 1px; background: #c7c7c7; }
        .organization .item_26:before {content: ''; position: absolute; right: calc(100% + 1px); top:  50%; z-index: 1; transform: translateY(-50%); width: 32px; height: 1px; background: #c7c7c7; }
        .organization .item_27:before {content: ''; position: absolute; right: calc(100% + 1px); top:  50%; z-index: 1; transform: translateY(-50%); width: 32px; height: 1px; background: #c7c7c7; }

        .organization ._body dl dt {display: inline-block;}
        .organization ._body dl dd {display: inline-block;}

        .organization ._body dl:first-child {margin: 86px 0 0 160px;}
        .organization ._body dl:not(:first-child) {margin: 20px 0 0 160px;}
        .organization ._body dl dd:nth-child(2) {margin-left: 32px;}
        .organization ._body dl dd:nth-child(3) {margin-left: 34px;}
        .organization ._body dl dd:nth-child(4) {margin-left: 26px;}
        .organization ._body dl dd:nth-child(5) {margin-left: 26px;}
        .organization ._body dl dd:nth-child(6) {margin-left: 26px;}

        .chart_tbl {border-top: 1px solid #9ca7b2 !important; border-bottom: 1px solid #9ca7b2 !important;}
        .chart_tbl th {font-weight: 500 px !important; border-color: #e8ebee !important; border-top: none !important;}
        .chart_tbl td {color: #666666 !important; font-weight: 300 !important; border-color: #e8ebee !important;}
        .chart_tbl tr:last-child td {border-bottom: none !important;}

        .chart .bd_box_01 {padding: 34px 34px 38px 34px; border: 5px solid #f6f7f9; display: flex; justify-content: start; align-items:flex-start;}
        .chart .bd_box_01 .box_tit {font-size: 18px; font-weight: 500; color: #309606; margin-top: -5px; width: 13% !important;}
        .chart .bd_box_01 .box_tit>img {display: inline-block; vertical-align: -8px;}
        .chart .bd_box_01 dl>dt {font-size: 15px; color: #1f1f1f; font-weight: 500; padding-right: 15px;}
        .chart .bd_box_01 dl>dd {font-size: 14px; color: #333333; font-weight: 300; margin-top: 15px; padding-right: 15px;}
        /*.chart .bd_box_01 dl {width:30% !important;}*/
        .chart .bd_box_01 ddd {display: flex; justify-content: space-around; align-items: flex-start;  width: 87%;}

        .contents_2 {display: none;}

        .mt100{margin-top:100px;}
        .mt_20{margin-top:20px;}
        .mb_50{margin-bottom:50px;}

        .inner .btn:hover {
            background-color: #033a72 !important;
            color: #f9f9f9 !important;
            transition-property:background-color;
            transition-duration:0.5s;
        }

        .__layout .active {
            background-color: #033a72;
            color: #f9f9f9 !important;
            transition-property:background-color;
            transition-duration:0.5s;
        }

        .sec_area h5 {
            font-size: 18px;
            font-weight: 500;
            letter-spacing: -0.75px;
            color: #252525;
            background-image: url(/resources/images/title_bar.png);
            background-repeat: no-repeat;
            background-position: top left;
            padding: 17px 0;
        }

    </style>
    <script>
        $(function(){
            /* 21.11.04 조직도 추가 */
            $('.chart .contents').hide();

            $('.item_3').on('click', function(e) {
                e.preventDefault();
                $('.chart .contents').hide();
                $('.chart .contents_1').show();
                $('.organization button').removeClass('active');
                $(this).addClass('active');
                var offset = $(".contents_1").offset();
                $('html, body').animate({scrollTop : offset.top}, 400);
            });

            $('.item_4').on('click', function(e) {
                e.preventDefault();
                $('.chart .contents').hide();
                $('.chart .contents_2').show();
                $('.organization button').removeClass('active');
                $(this).addClass('active');
                var offset = $(".contents_2").offset();
                $('html, body').animate({scrollTop : offset.top}, 400);
            });

            $('.item_9, .item_10').on('click', function(e) {
                e.preventDefault();
                $('.chart .contents').hide();
                $('.chart .contents_14').show();
                $('.chart .contents_3').show();
                $('.organization button').removeClass('active');
                $('.item_9').addClass('active');
                $('.item_10').addClass('active');
                var offset = $(".contents_14").offset();
                $('html, body').animate({scrollTop : offset.top}, 400);
            });

            $('.item_11').on('click', function(e) {
                e.preventDefault();
                $('.chart .contents').hide();
                $('.chart .contents_14').show();
                $('.chart .contents_4').show();
                $('.organization button').removeClass('active');
                $('.item_9').addClass('active');
                $('.item_11').addClass('active');
                var offset = $(".contents_14").offset();
                $('html, body').animate({scrollTop : offset.top}, 400);
            });

            $('.item_12, .item_13').on('click', function(e) {
                e.preventDefault();
                $('.chart .contents').hide();
                $('.chart .contents_15').show();
                $('.chart .contents_5').show();
                $('.organization button').removeClass('active');
                $('.item_12').addClass('active');
                $('.item_13').addClass('active');
                var offset = $(".contents_15").offset();
                $('html, body').animate({scrollTop : offset.top}, 400);
            });

            $('.item_14').on('click', function(e) {
                e.preventDefault();
                $('.chart .contents').hide();
                $('.chart .contents_15').show();
                $('.chart .contents_6').show();
                $('.organization button').removeClass('active');
                $('.item_12').addClass('active');
                $('.item_14').addClass('active');
                var offset = $(".contents_15").offset();
                $('html, body').animate({scrollTop : offset.top}, 400);
            });

            $('.item_15').on('click', function(e) {
                e.preventDefault();
                $('.chart .contents').hide();
                $('.chart .contents_15').show();
                $('.chart .contents_7').show();
                $('.organization button').removeClass('active');
                $('.item_12').addClass('active');
                $('.item_15').addClass('active');
                var offset = $(".contents_15").offset();
                $('html, body').animate({scrollTop : offset.top}, 400);
            });

            $('.item_16, .item_17').on('click', function(e) {
                e.preventDefault();
                $('.chart .contents').hide();
                $('.chart .contents_16').show();
                $('.chart .contents_8').show();
                $('.organization button').removeClass('active');
                $('.item_16').addClass('active');
                $('.item_17').addClass('active');
                var offset = $(".contents_16").offset();
                $('html, body').animate({scrollTop : offset.top}, 400);
            });

            $('.item_18').on('click', function(e) {
                e.preventDefault();
                $('.chart .contents').hide();
                $('.chart .contents_16').show();
                $('.chart .contents_9').show();
                $('.organization button').removeClass('active');
                $('.item_16').addClass('active');
                $('.item_18').addClass('active');
                var offset = $(".contents_16").offset();
                $('html, body').animate({scrollTop : offset.top}, 400);
            });

            $('.item_19').on('click', function(e) {
                e.preventDefault();
                $('.chart .contents').hide();
                $('.chart .contents_16').show();
                $('.chart .contents_10').show();
                $('.organization button').removeClass('active');
                $('.item_16').addClass('active');
                $('.item_19').addClass('active');
                var offset = $(".contents_16").offset();
                $('html, body').animate({scrollTop : offset.top}, 400);
            });

            $('.item_20, .item_21').on('click', function(e) {
                e.preventDefault();
                $('.chart .contents').hide();
                $('.chart .contents_17').show();
                $('.chart .contents_11').show();
                $('.organization button').removeClass('active');
                $('.item_20').addClass('active');
                $('.item_21').addClass('active');
                var offset = $(".contents_17").offset();
                $('html, body').animate({scrollTop : offset.top}, 400);
            });

            $('.item_22').on('click', function(e) {
                e.preventDefault();
                $('.chart .contents').hide();
                $('.chart .contents_17').show();
                $('.chart .contents_12').show();
                $('.organization button').removeClass('active');
                $('.item_20').addClass('active');
                $('.item_22').addClass('active');
                var offset = $(".contents_17").offset();
                $('html, body').animate({scrollTop : offset.top}, 400);
            });

            $('.item_23').on('click', function(e) {
                e.preventDefault();
                $('.chart .contents').hide();
                $('.chart .contents_13').show();
                $('.organization button').removeClass('active');
                $('.item_23').addClass('active');
                var offset = $(".contents_13").offset();
                $('html, body').animate({scrollTop : offset.top}, 400);
            });

            $('.item_26').on('click', function(e) {
                e.preventDefault();
                $('.chart .contents').hide();
                $('.chart .contents_16').show();
                $('.chart .contents_19').show();
                $('.organization button').removeClass('active');
                $('.item_16').addClass('active');
                $('.item_26').addClass('active');
                var offset = $(".contents_16").offset();
                $('html, body').animate({scrollTop : offset.top}, 400);
            });

            $('.item_27').on('click', function(e) {
                e.preventDefault();
                $('.chart .contents').hide();
                $('.chart .contents_16').show();
                $('.chart .contents_20').show();
                $('.organization button').removeClass('active');
                $('.item_16').addClass('active');
                $('.item_27').addClass('active');
                var offset = $(".contents_16").offset();
                $('html, body').animate({scrollTop : offset.top}, 400);
            });

            $('.item_28').on('click', function(e) {
                e.preventDefault();
                $('.chart .contents').hide();
                $('.chart .contents_14').show();
                $('.chart .contents_18').show();
                $('.organization button').removeClass('active');
                $('.item_9').addClass('active');
                $('.item_28').addClass('active');
                var offset = $(".contents_18").offset();
                $('html, body').animate({scrollTop : offset.top}, 400);
            });

            $('.item_29').on('click', function(e) {
                e.preventDefault();
                $('.chart .contents').hide();
                $('.chart .contents_29').show();
                $('.chart .contents_21').show();
                $('.organization button').removeClass('active');
                $('.item_29').addClass('active');
                $('.item_30').addClass('active');
                var offset = $(".contents_29").offset();
                $('html, body').animate({scrollTop : offset.top}, 400);
            });

            $('.item_30').on('click', function(e) {
                e.preventDefault();
                $('.chart .contents').hide();
                $('.chart .contents_29').show();
                $('.chart .contents_21').show();
                $('.organization button').removeClass('active');
                $('.item_29').addClass('active');
                $('.item_30').addClass('active');
                var offset = $(".contents_29").offset();
                $('html, body').animate({scrollTop : offset.top}, 400);
            });

            $('.item_31').on('click', function(e) {
                e.preventDefault();
                $('.chart .contents').hide();
                $('.chart .contents_29').show();
                $('.chart .contents_22').show();
                $('.organization button').removeClass('active');
                $('.item_29').addClass('active');
                $('.item_31').addClass('active');
                var offset = $(".contents_29").offset();
                $('html, body').animate({scrollTop : offset.top}, 400);
            });

            $('.item_32').on('click', function(e) {
                e.preventDefault();
                $('.chart .contents').hide();
                $('.chart .contents_23').show();
                $('.chart .contents_24').show();
                $('.organization button').removeClass('active');
                $('.item_32').addClass('active');
                $('.item_33').addClass('active');
                var offset = $(".contents_23").offset();
                $('html, body').animate({scrollTop : offset.top}, 400);
            });

            $('.item_33').on('click', function(e) {
                e.preventDefault();
                $('.chart .contents').hide();
                $('.chart .contents_23').show();
                $('.chart .contents_24').show();
                $('.organization button').removeClass('active');
                $('.item_32').addClass('active');
                $('.item_33').addClass('active');
                var offset = $(".contents_23").offset();
                $('html, body').animate({scrollTop : offset.top}, 400);
            });

            $('.item_34').on('click', function(e) {
                e.preventDefault();
                $('.chart .contents').hide();
                $('.chart .contents_25').show();
                $('.organization button').removeClass('active');
                $('.item_34').addClass('active');
                var offset = $(".contents_25").offset();
                $('html, body').animate({scrollTop : offset.top}, 400);
            });

            $('.item_35').on('click', function(e) {
                e.preventDefault();
                $('.chart .contents').hide();
                $('.chart .contents_26').show();
                $('.organization button').removeClass('active');
                $('.item_35').addClass('active');
                var offset = $(".contents_26").offset();
                $('html, body').animate({scrollTop : offset.top}, 400);
            });
        });

        $(document).ready(function() {
            $(".search_member").click(function() {
                $(".chart .contents > table > tbody > tr > td").removeClass( 'active' );
                $(".organization").hide();
                $('.chart .contents').hide();

                var k = $('#keyword').val();
                var temp = $('.contents_1, .contents_2').find("table > tbody > tr > td:nth-child(3n+3):contains('" + k + "')");
                var temp2 = $('.contents_3, .contents_4, .contents_5, .contents_6, .contents_7, .contents_8, .contents_9, .contents_10, .contents_11, .contents_12, .contents_13, .contents_14, .contents_15, .contents_16, .contents_17 .contents_18 .contents_19 .contents_20 .contents_21 .contents_22 .contents_23 .contents_24 .contents_25 .contents_26').find("table > tbody > tr > td:nth-child(4n+2):contains('" + k + "')");

                $(temp).addClass( 'active' );
                $(temp).parent().parent().parent().parent().show();

                $(temp2).addClass( 'active' );
                $(temp2).parent().parent().parent().parent().show();

                if (k.trim() == '') {
                    $('.chart .contents').hide();
                    $(".organization").show();
                    $(".chart .contents > table > tbody > tr > td").removeClass( 'active' );
                }
                $('html, body').animate({scrollTop : '420px'}, 100);
            })

            $("#keyword").keydown(function(e){
                if(e.keyCode == 13){
                    $(".chart .contents > table > tbody > tr > td").removeClass( 'active' );
                    $(".organization").hide();
                    $('.chart .contents').hide();

                    var k = $('#keyword').val();
                    var temp = $('.contents_1, .contents_2').find("table > tbody > tr > td:nth-child(3n+3):contains('" + k + "')");
                    var temp2 = $('.contents_3, .contents_4, .contents_5, .contents_6, .contents_7, .contents_8, .contents_9, .contents_10, .contents_11, .contents_12, .contents_13, .contents_14, .contents_15, .contents_16, .contents_17 .contents_18 .contents_19 .contents_20 .contents_21 .contents_22 .contents_23 .contents_24 .contents_25 .contents_26').find("table > tbody > tr > td:nth-child(4n+2):contains('" + k + "')");

                    $(temp).addClass( 'active' );
                    $(temp).parent().parent().parent().parent().show();

                    $(temp2).addClass( 'active' );
                    $(temp2).parent().parent().parent().parent().show();

                    if (k.trim() == '') {
                        $('.chart .contents').hide();
                        $(".organization").show();
                        $(".chart .contents > table > tbody > tr > td").removeClass( 'active' );
                    }
                    $('html, body').animate({scrollTop : '420px'}, 100);
                }
            })


            $("#keyword").keyup(function() {
                var k = $('#keyword').val();
                if (k.trim() == '') {
                    $('.chart .contents').hide();
                    $(".organization").show();
                    $(".chart .contents > table > tbody > tr > td").removeClass( 'active' );
                }
            })
        })

    </script>
</head>

<body>

<header>
    <div class="headerpanel">
        <a href="/indexB.do"><div class="logopanel"></div></a>
        <div class="headerbar">

            <div class="searchpanel">
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="검색하세요">
                    <span class="input-group-btn">
            <button class="btn btn-default" type="button"><i class="fa fa-search"></i></button>
          </span>
                </div><!-- input-group -->
            </div>

            <div class="header-right">
                <ul class="headermenu">
                    <li>
                        <div id="noticePanel" class="btn-group">
                            <a href="/subHoliday/org.do">
                                <button class="btn btn-notice" data-toggle="modal" data-target="#myModal" style="float:left; font-size:22px;">
                                    <i class="fa fa-sitemap"></i>
                                </button>
                            </a>
                            <!-- Modal -->
                            <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                                <div class="modal-dialog modal-lg">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                            <h4 class="modal-title" id="myModalLabel">조직도</h4>
                                        </div>
                                        <div class="modal-body">
                                            <a href="/subHoliday/org.do"></a>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-default" data-dismiss="modal">닫기</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button class="btn btn-notice alert-notice" data-toggle="dropdown" style="border-left:0;">
                                <i class="fa fa-bell-o"></i>
                            </button>
                            <div id="noticeDropdown" class="dropdown-menu dm-notice pull-right">
                                <div role="tabpanel">
                                    <!-- Nav tabs -->
                                    <ul class="nav nav-tabs nav-justified" role="tablist">
                                        <li class="active"><a data-target="#notification" data-toggle="tab">알림1</a></li>
                                        <li><a data-target="#reminders" data-toggle="tab">알림2</a></li>
                                    </ul>

                                    <!-- Tab panes -->
                                    <div class="tab-content">
                                        <div role="tabpanel" class="tab-pane active" id="notification">
                                            <ul class="list-group notice-list">
                                                <li class="list-group-item unread">
                                                    <div class="row">
                                                        <div class="col-xs-2">
                                                            <i class="fa fa-envelope"></i>
                                                        </div>
                                                        <div class="col-xs-10">
                                                            <h5><a href="">인사발령</a></h5>
                                                            <small>2022.01.05</small>
                                                            <span>인사발령에관하여 알려드립니다</span>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-group-item unread">
                                                    <div class="row">
                                                        <div class="col-xs-2">
                                                            <i class="fa fa-user"></i>
                                                        </div>
                                                        <div class="col-xs-10">
                                                            <h5><a href="">인사발령</a></h5>
                                                            <small>2022.01.05</small>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-group-item">
                                                    <div class="row">
                                                        <div class="col-xs-2">
                                                            <i class="fa fa-user"></i>
                                                        </div>
                                                        <div class="col-xs-10">
                                                            <h5><a href="">인사발령</a></h5>
                                                            <small>2022.01.05</small>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-group-item">
                                                    <div class="row">
                                                        <div class="col-xs-2">
                                                            <i class="fa fa-thumbs-up"></i>
                                                        </div>
                                                        <div class="col-xs-10">
                                                            <h5><a href="">인사발령</a></h5>
                                                            <small>2022.01.05</small>
                                                            <span>인사발령에관하여 알려드립니다</span>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-group-item">
                                                    <div class="row">
                                                        <div class="col-xs-2">
                                                            <i class="fa fa-comment"></i>
                                                        </div>
                                                        <div class="col-xs-10">
                                                            <h5><a href="">인사발령</a></h5>
                                                            <small>2022.01.05</small>
                                                            <span>인사발령에관하여 알려드립니다</span>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                            <a class="btn-more" href="">더보기 <i class="fa fa-long-arrow-right"></i></a>
                                        </div><!-- tab-pane -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="btn-group">
                            <button type="button" class="btn btn-logged" data-toggle="dropdown">
                                김캠틱님 환영합니다!
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

<section>

    <div class="leftpanel">
        <div class="leftpanelinner">

            <!-- ################## LEFT PANEL PROFILE ################## -->



            <div class="leftpanel-userinfo collapse" id="loguserinfo">
                <h5 class="sidebar-title">Address</h5>
                <address>
                    4975 Cambridge Road
                    Miami Gardens, FL 33056
                </address>
                <h5 class="sidebar-title">Contact</h5>
                <ul class="list-group">
                    <li class="list-group-item">
                        <label class="pull-left">Email</label>
                        <span class="pull-right">me@themepixels.com</span>
                    </li>
                    <li class="list-group-item">
                        <label class="pull-left">Home</label>
                        <span class="pull-right">(032) 1234 567</span>
                    </li>
                    <li class="list-group-item">
                        <label class="pull-left">Mobile</label>
                        <span class="pull-right">+63012 3456 789</span>
                    </li>
                    <li class="list-group-item">
                        <label class="pull-left">Social</label>
                        <div class="social-icons pull-right">
                            <a href="#"><i class="fa fa-facebook-official"></i></a>
                            <a href="#"><i class="fa fa-twitter"></i></a>
                            <a href="#"><i class="fa fa-pinterest"></i></a>
                        </div>
                    </li>
                </ul>
            </div><!-- leftpanel-userinfo -->



            <div class="tab-content">

                <!-- ################# MAIN MENU ################### -->

                <div class="tab-pane active" id="mainmenu">
                    <h5 class="sidebar-title">CAM'S POT</h5>
                    <ul class="nav nav-pills nav-stacked nav-quirk">
                        <li class="active"><a href="#"><i class="fa fa-home"></i> <span>공지사항</span></a></li>
                        <li><a href="#"><i class="fa fa-cube"></i> <span>업무보고</span></a></li>
                        <li><a href="#"><i class="fa fa-cube"></i> <span>제안제도</span></a></li>
                        <li><a href="#"><i class="fa fa-cube"></i> <span>오픈스터디</span></a></li>
                        <li><a href="#"><i class="fa fa-cube"></i> <span>직원일정</span></a></li>
                        <li><a href="#"><i class="fa fa-cube"></i> <span>설문조사</span></a></li>
                        <li><a href="#"><i class="fa fa-cube"></i> <span>전산보완요청</span></a></li>
                        <li><a href="#"><i class="fa fa-cube"></i> <span>홍보협조요청</span></a></li>
                    </ul>

                    <h5 class="sidebar-title">업무</h5>
                    <ul class="nav nav-pills nav-stacked nav-quirk">
                        <li class="nav-parent">
                            <a href=""><i class="fa fa-check-square"></i> <span>캠알앤디</span></a>
                            <ul class="children">
                                <li><a href="/subHoliday/subHolidayApplication.do">휴가신청</a></li>
                                <li><a href="/subHoliday/org.do">조직도</a></li>
                                <li><a href="#">휴가자동설정</a></li>
                                <li><a href="#">휴가생성기준설정</a></li>
                            </ul>
                        </li>
                        <li class="nav-parent"><a href=""><i class="fa fa-suitcase"></i> <span>비알앤디(지원사업)</span></a>
                            <ul class="children">
                                <li><a href="#">비알앤디</a></li>
                                <li><a href="#">비알앤디</a></li>
                                <li><a href="#">비알앤디</a></li>
                            </ul>
                        </li>
                        <li class="nav-parent"><a href=""><i class="fa fa-th-list"></i> <span>엔지니어링</span></a>
                            <ul class="children">
                                <h5 class="sidebar-title"><a href="/engineering/customerConsultation.do">프로젝트 등록 및 목록</a></h5>
                                <li><a href="/engineering/estimate.do">개발상담서</a></li>
                                <li><a href="/engineering/orderManagement.do">수주보고</a></li>
                                <li><a href="/engineering/developmentPlan.do">개발계획서 등록(협업)</a></li>
                                <li><a href="/engineering/outsourcingPurchase.do">구매/외주</a></li>
                                <li><a href="/engineering/deliveryManagement.do">납품관리</a></li>
                                <li><a href="/engineering/resultReport.do">완료보고서</a></li>
                                <li><a href="#">원가보고서</a></li>
                                <h5 class="sidebar-title"><a href="#">협업목록보기</a></h5>
                                <h5 class="sidebar-title"><a href="#">사내가공 요청현황</a></h5>
                                <h5 class="sidebar-title"><a href="#">사내가공일정</a></h5>
                                <h5 class="sidebar-title"><a href="#">프로젝트 진행현황</a></h5>
                            </ul>
                        </li>
                        <li class="nav-parent"><a href=""><i class="fa fa-file-text"></i> <span>용역 및 기타</span></a>
                            <ul class="children">
                                <li><a href="#">캠퍼스</a></li>
                                <li><a href="#">캠퍼스</a></li>
                                <li><a href="#">캠퍼스</a></li>
                                <li><a href="#">캠퍼스</a></li>
                            </ul>
                        </li>
                    </ul>
                </div><!-- tab-pane -->

                <!-- ######################## EMAIL MENU ##################### -->



            </div><!-- tab-content -->

        </div><!-- leftpanelinner -->
    </div><!-- leftpanel -->

    <div class="mainpanel">

        <!--<div class="pageheader">
          <h2><i class="fa fa-home"></i> Dashboard</h2>
        </div>-->

        <div class="contentpanel" style="width:1700px;">

            <div class="row">
                <div class="col-md-10 col-lg-10 dash-left">
                    <div class="row panel-quick-page">
                        <div style="display:flex; justify-content: space-between;">
                            <div class="boxCss">
                                <i class="fa fa-shopping-cart" style="font-size:40px;padding:11px;"></i><br>캠프로젝트 매니저
                            </div>
                            <div class="boxCss">
                                <i class="fa fa-lightbulb-o" style="font-size:40px;padding:11px;"></i><br>캠아이템
                            </div>
                            <div class="boxCss">
                                <i class="fa fa-calendar-o" style="font-size:40px;padding:11px;"></i><br>캠매니저2.0
                            </div>
                            <div class="boxCss">
                                <i class="fa fa-users" style="font-size:40px;padding:11px;"></i><br>캠CRM2.0
                            </div>
                            <a href="/subHoliday/subHolidayApplication.do">
                                <div class="boxCss">
                                    <i class="fa fa-location-arrow" style="font-size:40px;padding:11px;"></i><br>캠인사이드2.0
                                </div>
                            </a>
                            <div class="boxCss">
                                <i class="fa fa-pencil" style="font-size:40px;padding:11px;"></i><br>캠퍼스2.0
                            </div>
                            <div class="boxCss">
                                <i class="fa fa-cloud-upload" style="font-size:40px;padding:11px;"></i><br>캠어취브2.0
                            </div>
                        </div>
                    </div>

                    <div class="panel">
                        <div class="panel-body">
                                <div class="chart __layout pt pb mop" style="width:1300px; margin:0 auto;">
                                    <div class="inner">
                                        <h2 style="text-align: center;margin-top: 35px;">조직도 및 연락처</h2>
                                        <div class="organization">
                                            <dl>
                                                <div class="_header">
                                                    <%--<dl>
                                                        <dt><span tabindex="0" class="item_1 item boss col_01">이사장</span></dt>
                                                        <dd class="mt_20 mb_20 ml_600"><button type="button" class="btn type_1 item item_3">이사회</button></dd>
                                                    </dl>--%>
                                                    <dl>
                                                        <dt><button type="button" class="btn type_2 item item_23 item_2">원장</button></dt>
                                                        <%--<dd class="mt_20 mb_20 ml_600"><button type="button" class="btn type_1 item item_4">운영위원회</button></dd>--%>
                                                    </dl>
                                                </div>
                                            </dl>
                                            <dl>
                                                <div class="_body">
                                                    <dl>
                                                        <dt><button type="button" class="btn type_2 item item_9 item_5">경영기획관리본부</button></dt>
                                                        <dd><button type="button" class="btn type_3 item item_10 item_6">2030경영기획팀</button></dd>
                                                        <dd><button type="button" class="btn type_3 item item_11 item_7">경영지원팀</button></dd>
                                                        <dd><button type="button" class="btn type_3 item item_28 item_8">단지관리팀</button></dd> <%--확인해야함--%>
                                                    </dl>
                                                    <dl>
                                                        <dt><button type="button" class="btn type_2 item item_12 item_5">R&BD사업본부</button></dt>
                                                        <dd><button type="button" class="btn type_3 item item_13 item_6">복합소재뿌리기술센터</button></dd>
                                                        <dd><button type="button" class="btn type_3 item item_14 item_7">신기술융합팀</button></dd>
                                                        <dd><button type="button" class="btn type_3 item item_15 item_8">제조혁신팀</button></dd>
                                                    </dl>
                                                    <dl>
                                                        <dt><button type="button" class="btn type_2 item item_16 item_5">기업성장지원본부</button></dt>
                                                        <dd><button type="button" class="btn type_3 item item_17 item_6">지역산업육성팀</button></dd>
                                                        <dd><button type="button" class="btn type_3 item item_18 item_7">인재개발팀</button></dd>
                                                        <dd><button type="button" class="btn type_3 item item_19 item_8">일자리창업허브팀</button></dd>
                                                        <dd><button type="button" class="btn type_3 item item_24 item_26">일자리창업허브팀(군산)</button></dd><%--확인해야함--%>
                                                        <dd><button type="button" class="btn type_3 item item_25 item_27">일자리창업허브팀(익산)</button></dd><%--확인해야함--%>
                                                    </dl>
                                                    <dl>
                                                        <dt><button type="button" class="btn type_2 item item_29 item_5">항공우주사업부</button></dt>
                                                        <dd><button type="button" class="btn type_3 item item_30 item_6">항공우주개발팀</button></dd>
                                                        <dd><button type="button" class="btn type_3 item item_31 item_7">항공우주기술팀</button></dd>
                                                    </dl>
                                                    <dl>
                                                        <dt><button type="button" class="btn type_2 item item_32 item_5">드론사업부</button></dt><%--확인해야함--%>
                                                        <dd><button type="button" class="btn type_3 item item_33 item_6">드론산업혁신지원센터</button></dd><%--확인해야함--%>
                                                    </dl>
                                                    <dl>
                                                        <dt><button type="button" class="btn type_2 item item_34 item_5">스마트매뉴팩처링사업부</button></dt><%--확인해야함--%>
                                                    </dl>
                                                    <dl>
                                                        <dt><button type="button" class="btn type_2 item item_35 item_5">시설관리·환경미화</button></dt><%--확인해야함--%>
                                                    </dl>
                                                </div>
                                            </dl>
                                        </div>

                                        <div class="con_">
                                            <div class="contents contents_13">
                                                <p class="logo_line mt100">원장</p>
                                                <table class="tbl_02 chart_tbl mt_20 mb_50">
                                                    <%--<caption>
                                                        <span>원장</span>
                                                    </caption>--%>
                                                    <colgroup>
                                                        <col width="147px">
                                                        <col width="330px">
                                                        <col width="164px">
                                                        <col width="auto">
                                                    </colgroup>
                                                    <tbody>
                                                    <tr>
                                                        <th>직위</th>
                                                        <th>성명</th>
                                                        <th>연락처</th>
                                                        <th>담당업무</th>
                                                    </tr>
                                                    <tr>
                                                        <td>원장</td>
                                                        <td>노상흡</td>
                                                        <td>219-0301</td>
                                                        <td>원장</td>
                                                    </tr>

                                                    </tbody>
                                                </table>
                                            </div>

                                            <div class="contents contents_1">
                                                <p class="logo_line mt100">이사회</p>
                                                <table class="tbl_02 chart_tbl mt_20 mb_50">
                                                    <caption>
                                                        <span>이사회</span>
                                                    </caption>
                                                    <colgroup>
                                                        <col width="147px">
                                                        <col width="330px">
                                                        <col width="164px">
                                                        <col width="147px">
                                                        <col width="330px">
                                                        <col width="auto">
                                                    </colgroup>

                                                    <tbody>
                                                    <tr>
                                                        <th>구분</th>
                                                        <th>직위</th>
                                                        <th>성명</th>
                                                        <th>구분</th>
                                                        <th>직위</th>
                                                        <th>성명</th>
                                                    </tr>
                                                    <tr>
                                                        <td>이사장</td>
                                                        <td>전라북도 행정부지사</td>
                                                        <td>조봉업</td>
                                                        <td>이사</td>
                                                        <td>전북대학교 환경생명자원대학 교수</td>
                                                        <td>이귀재</td>
                                                    </tr>
                                                    <tr>
                                                        <td>이사</td>
                                                        <td>전북바이오융합산업진흥원장</td>
                                                        <td>김동수</td>
                                                        <td>이사</td>
                                                        <td>참바다영어조합법인 대표</td>
                                                        <td>김종학</td>
                                                    </tr>
                                                    <tr>
                                                        <td>이사</td>
                                                        <td>전라북도 농축산식품극장</td>
                                                        <td>신원식</td>
                                                        <td>감사</td>
                                                        <td>전라북도 농산품산업과장</td>
                                                        <td>서재영</td>
                                                    </tr>
                                                    <tr>
                                                        <td>이사</td>
                                                        <td>전주시 부시장</td>
                                                        <td>박형배</td>
                                                        <td>감사</td>
                                                        <td>동명회계법인 공인회계사</td>
                                                        <td>박상민</td>
                                                    </tr>
                                                    <tr>
                                                        <td>이사</td>
                                                        <td>전북지방중소벤처기업청장</td>
                                                        <td>윤종욱</td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>

                                            <div class="contents contents_2">
                                                <p class="logo_line mt100">운영위원회</p>
                                                <table class="tbl_02 chart_tbl mt_20 mb_50">
                                                    <caption>
                                                        <span>운영위원회</span>
                                                    </caption>
                                                    <colgroup>
                                                        <col width="147px">
                                                        <col width="330px">
                                                        <col width="164px">
                                                        <col width="147px">
                                                        <col width="330px">
                                                        <col width="auto">
                                                    </colgroup>
                                                    <tbody>
                                                    <tr>
                                                        <th>구분</th>
                                                        <th>직위</th>
                                                        <th>성명</th>
                                                        <th>구분</th>
                                                        <th>직위</th>
                                                        <th>성명</th>
                                                    </tr>
                                                    <tr>
                                                        <td>위원장</td>
                                                        <td>전북바이오융합산업진흥원장</td>
                                                        <td>김동수</td>
                                                        <td>학 계</td>
                                                        <td>전북대학교 식품공학과 교수</td>
                                                        <td>김영수</td>
                                                    </tr>
                                                    <tr>
                                                        <td>유관기관</td>
                                                        <td>전라북도 농식품산업과장</td>
                                                        <td>서재영</td>
                                                        <td>학 계</td>
                                                        <td>군산대학교 식품영양학과 교수</td>
                                                        <td>유현희</td>
                                                    </tr>
                                                    <tr>
                                                        <td>유관기관</td>
                                                        <td>전북지방중소벤처기업청 지역혁신과장</td>
                                                        <td>이태준</td>
                                                        <td>학 계</td>
                                                        <td>원광대학교 식품영양학과 교수</td>
                                                        <td>최준호</td>
                                                    </tr>
                                                    <tr>
                                                        <td>유관기관</td>
                                                        <td>국립농업과학원 독성위해평가과 과장</td>
                                                        <td>나영은</td>
                                                        <td>학 계</td>
                                                        <td>전주대학교 바이오기능성식품학과 교수</td>
                                                        <td>정용준</td>
                                                    </tr>
                                                    <tr>
                                                        <td>유관기관</td>
                                                        <td>전북연구개발특구 본부장</td>
                                                        <td>조용철</td>
                                                        <td>학 계</td>
                                                        <td>우석대학교 제약공학과 교수</td>
                                                        <td>한갑훈</td>
                                                    </tr>
                                                    <tr>
                                                        <td>유관기관</td>
                                                        <td>aT 전북지역본부장</td>
                                                        <td>류정한</td>
                                                        <td>기 업</td>
                                                        <td>(주)참고을 대표</td>
                                                        <td>김윤권</td>
                                                    </tr>
                                                    <tr>
                                                        <td>유관기관</td>
                                                        <td>전북창조경제혁신센터장</td>
                                                        <td>박광진</td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div class="contents contents_14">
                                                <p class="logo_line mt100">경영기획관리본부</p>
                                                <table class="tbl_02 chart_tbl mt20">
                                                    <%--<caption>
                                                        <span>기획경영본부</span>
                                                    </caption>--%>
                                                    <colgroup>
                                                        <col width="196px">
                                                        <col width="240px">
                                                        <col width="204px">
                                                        <col width="auto">
                                                    </colgroup>
                                                    <tbody>
                                                    <tr>
                                                        <th>직위</th>
                                                        <th>성명</th>
                                                        <th>연락처</th>
                                                        <th>담당업무</th>
                                                    </tr>
                                                    <tr>
                                                        <td>본부장</td>
                                                        <td>송기정</td>
                                                        <td>219-0330</td>
                                                        <td>경영기획관리본부 총괄</td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div class="contents contents_3">

                                                <table class="tbl_02 chart_tbl mt_20 mb_50">
                                                    <caption>
                                                        <span>2030경영기획팀</span>
                                                    </caption>
                                                    <colgroup>
                                                        <col width="196px">
                                                        <col width="240px">
                                                        <col width="204px">
                                                        <col width="auto">
                                                    </colgroup>
                                                    <tbody>
                                                    <tr>
                                                        <th>직위</th>
                                                        <th>성명</th>
                                                        <th>연락처</th>
                                                        <th>담당업무</th>
                                                    </tr>
                                                    <tr>
                                                        <td>팀장</td>
                                                        <td>나세영</td>
                                                        <td>219-0348</td>
                                                        <td>2030경영기획팀 총괄</td>
                                                    </tr>
                                                    <tr>
                                                        <td>책임행정원</td>
                                                        <td>유수영</td>
                                                        <td>219-0380</td>
                                                        <td>벤처단지 중장기 운영 기획 등</td>
                                                    </tr>
                                                    <tr>
                                                        <td>책임행정원</td>
                                                        <td>문명희</td>
                                                        <td>219-0318</td>
                                                        <td>사업관리/구매 담당</td>
                                                    </tr>
                                                    <tr>
                                                        <td>선임행정원</td>
                                                        <td>이슬비</td>
                                                        <td>219-0308</td>
                                                        <td>사업관리/구매 담당</td>
                                                    </tr>
                                                    <tr>
                                                        <td>선임행정원</td>
                                                        <td>최유미</td>
                                                        <td>219-0418</td>
                                                        <td>구매 및 사업관리</td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>

                                            <div class="contents contents_4">
                                                <table class="tbl_02 chart_tbl mt_20 mb_50">
                                                    <caption>
                                                        <span>경영지원팀</span>
                                                    </caption>
                                                    <colgroup>
                                                        <col width="196px">
                                                        <col width="240px">
                                                        <col width="204px">
                                                        <col width="auto">
                                                    </colgroup>
                                                    <tbody>
                                                    <tr>
                                                        <th>직위</th>
                                                        <th>성명</th>
                                                        <th>연락처</th>
                                                        <th>담당업무</th>
                                                    </tr>
                                                    <tr>
                                                        <td>팀장</td>
                                                        <td>나세영</td>
                                                        <td>219-0348</td>
                                                        <td>2030경영기획팀 총괄</td>
                                                    </tr>
                                                    <tr>
                                                        <td>책임행정원</td>
                                                        <td>유수영</td>
                                                        <td>219-0380</td>
                                                        <td>벤처단지 중장기 운영 기획 등</td>
                                                    </tr>
                                                    <tr>
                                                        <td>책임행정원</td>
                                                        <td>문명희</td>
                                                        <td>219-0318</td>
                                                        <td>사업관리/구매 담당</td>
                                                    </tr>
                                                    <tr>
                                                        <td>선임행정원</td>
                                                        <td>이슬비</td>
                                                        <td>219-0308</td>
                                                        <td>사업관리/구매 담당</td>
                                                    </tr>
                                                    <tr>
                                                        <td>선임행정원</td>
                                                        <td>최유미</td>
                                                        <td>219-0418</td>
                                                        <td>구매 및 사업관리</td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>

                                            <div class="contents contents_18">
                                                <table class="tbl_02 chart_tbl mt_20 mb_50">
                                                    <caption>
                                                        <span>단지관리팀</span>
                                                    </caption>
                                                    <colgroup>
                                                        <col width="196px">
                                                        <col width="240px">
                                                        <col width="204px">
                                                        <col width="auto">
                                                    </colgroup>
                                                    <tbody>
                                                    <tr>
                                                        <th>직위</th>
                                                        <th>성명</th>
                                                        <th>연락처</th>
                                                        <th>담당업무</th>
                                                    </tr>
                                                    <tr>
                                                        <td>팀장</td>
                                                        <td>나세영</td>
                                                        <td>219-0348</td>
                                                        <td>2030경영기획팀 총괄</td>
                                                    </tr>
                                                    <tr>
                                                        <td>책임행정원</td>
                                                        <td>유수영</td>
                                                        <td>219-0380</td>
                                                        <td>벤처단지 중장기 운영 기획 등</td>
                                                    </tr>
                                                    <tr>
                                                        <td>책임행정원</td>
                                                        <td>문명희</td>
                                                        <td>219-0318</td>
                                                        <td>사업관리/구매 담당</td>
                                                    </tr>
                                                    <tr>
                                                        <td>선임행정원</td>
                                                        <td>이슬비</td>
                                                        <td>219-0308</td>
                                                        <td>사업관리/구매 담당</td>
                                                    </tr>
                                                    <tr>
                                                        <td>선임행정원</td>
                                                        <td>최유미</td>
                                                        <td>219-0418</td>
                                                        <td>구매 및 사업관리</td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>

                                            <div class="contents contents_15">
                                                <p class="logo_line mt100">R&BD사업본부</p>
                                                <table class="tbl_02 chart_tbl mt20">
                                                    <colgroup>
                                                        <col width="196px">
                                                        <col width="240px">
                                                        <col width="204px">
                                                        <col width="auto">
                                                    </colgroup>
                                                    <tbody>
                                                    <tr>
                                                        <th>직위</th>
                                                        <th>성명</th>
                                                        <th>연락처</th>
                                                        <th>담당업무본부장</th>
                                                    </tr>
                                                    <tr>
                                                        <td>본부장</td>
                                                        <td>송기정</td>
                                                        <td>219-0330</td>
                                                        <td>경영기획관리본부 총괄</td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div class="contents contents_5">
                                                <table class="tbl_02 chart_tbl mt_20 mb_50">
                                                    <caption>
                                                        <span>복합소재뿌리기술센터</span>
                                                    </caption>
                                                    <colgroup>
                                                        <col width="196px">
                                                        <col width="240px">
                                                        <col width="204px">
                                                        <col width="auto">
                                                    </colgroup>
                                                    <tbody>
                                                    <tr>
                                                        <th>직위</th>
                                                        <th>성명</th>
                                                        <th>연락처</th>
                                                        <th>담당업무</th>
                                                    </tr>
                                                    <tr>
                                                        <td>팀장</td>
                                                        <td>나세영</td>
                                                        <td>219-0348</td>
                                                        <td>2030경영기획팀 총괄</td>
                                                    </tr>
                                                    <tr>
                                                        <td>책임행정원</td>
                                                        <td>유수영</td>
                                                        <td>219-0380</td>
                                                        <td>벤처단지 중장기 운영 기획 등</td>
                                                    </tr>
                                                    <tr>
                                                        <td>책임행정원</td>
                                                        <td>문명희</td>
                                                        <td>219-0318</td>
                                                        <td>사업관리/구매 담당</td>
                                                    </tr>
                                                    <tr>
                                                        <td>선임행정원</td>
                                                        <td>이슬비</td>
                                                        <td>219-0308</td>
                                                        <td>사업관리/구매 담당</td>
                                                    </tr>
                                                    <tr>
                                                        <td>선임행정원</td>
                                                        <td>최유미</td>
                                                        <td>219-0418</td>
                                                        <td>구매 및 사업관리</td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>


                                            <div class="contents contents_6">

                                                <table class="tbl_02 chart_tbl mt_20 mb_50">
                                                    <caption>
                                                        <span>신기술융합팀</span>
                                                    </caption>
                                                    <colgroup>
                                                        <col width="196px">
                                                        <col width="240px">
                                                        <col width="204px">
                                                        <col width="auto">
                                                    </colgroup>
                                                    <tbody>
                                                    <tr>
                                                        <th>직위</th>
                                                        <th>성명</th>
                                                        <th>연락처</th>
                                                        <th>담당업무</th>
                                                    </tr>
                                                    <tr>
                                                        <td>팀장</td>
                                                        <td>나세영</td>
                                                        <td>219-0348</td>
                                                        <td>2030경영기획팀 총괄</td>
                                                    </tr>
                                                    <tr>
                                                        <td>책임행정원</td>
                                                        <td>유수영</td>
                                                        <td>219-0380</td>
                                                        <td>벤처단지 중장기 운영 기획 등</td>
                                                    </tr>
                                                    <tr>
                                                        <td>책임행정원</td>
                                                        <td>문명희</td>
                                                        <td>219-0318</td>
                                                        <td>사업관리/구매 담당</td>
                                                    </tr>
                                                    <tr>
                                                        <td>선임행정원</td>
                                                        <td>이슬비</td>
                                                        <td>219-0308</td>
                                                        <td>사업관리/구매 담당</td>
                                                    </tr>
                                                    <tr>
                                                        <td>선임행정원</td>
                                                        <td>최유미</td>
                                                        <td>219-0418</td>
                                                        <td>구매 및 사업관리</td>
                                                    </tr>

                                                    </tbody>
                                                </table>
                                            </div>

                                            <div class="contents contents_7">

                                                <table class="tbl_02 chart_tbl mt_20 mb_50">
                                                    <caption>
                                                        <span>제조혁신팀</span>
                                                    </caption>
                                                    <colgroup>
                                                        <col width="196px">
                                                        <col width="240px">
                                                        <col width="204px">
                                                        <col width="auto">
                                                    </colgroup>
                                                    <tbody>
                                                    <tr>
                                                        <th>직위</th>
                                                        <th>성명</th>
                                                        <th>연락처</th>
                                                        <th>담당업무</th>
                                                    </tr>
                                                    <tr>
                                                        <td>팀장</td>
                                                        <td>나세영</td>
                                                        <td>219-0348</td>
                                                        <td>2030경영기획팀 총괄</td>
                                                    </tr>
                                                    <tr>
                                                        <td>책임행정원</td>
                                                        <td>유수영</td>
                                                        <td>219-0380</td>
                                                        <td>벤처단지 중장기 운영 기획 등</td>
                                                    </tr>
                                                    <tr>
                                                        <td>책임행정원</td>
                                                        <td>문명희</td>
                                                        <td>219-0318</td>
                                                        <td>사업관리/구매 담당</td>
                                                    </tr>
                                                    <tr>
                                                        <td>선임행정원</td>
                                                        <td>이슬비</td>
                                                        <td>219-0308</td>
                                                        <td>사업관리/구매 담당</td>
                                                    </tr>
                                                    <tr>
                                                        <td>선임행정원</td>
                                                        <td>최유미</td>
                                                        <td>219-0418</td>
                                                        <td>구매 및 사업관리</td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div class="contents contents_16">
                                                <p class="logo_line mt100">기업성장지원본부</p>
                                                <table class="tbl_02 chart_tbl mt20">
                                                    <colgroup>
                                                        <col width="196px">
                                                        <col width="240px">
                                                        <col width="204px">
                                                        <col width="auto">
                                                    </colgroup>
                                                    <tbody>
                                                    <tr>
                                                        <th>직위</th>
                                                        <th>성명</th>
                                                        <th>연락처</th>
                                                        <th>담당업무본부장</th>
                                                    </tr>
                                                    <tr>
                                                        <td>본부장</td>
                                                        <td>장한수</td>
                                                        <td>210-6530</td>
                                                        <td>연구개발본부 총괄</td>
                                                    </tr>


                                                    </tbody>
                                                </table>
                                            </div>
                                            <div class="contents contents_8">
                                                <table class="tbl_02 chart_tbl mt_20 mb_50">
                                                    <caption>
                                                        <span>지역산업육성팀</span>
                                                    </caption>
                                                    <colgroup>
                                                        <col width="196px">
                                                        <col width="240px">
                                                        <col width="204px">
                                                        <col width="auto">
                                                    </colgroup>
                                                    <tbody>
                                                    <tr>
                                                        <th>직위</th>
                                                        <th>성명</th>
                                                        <th>연락처</th>
                                                        <th>담당업무</th>
                                                    </tr>
                                                    <tr>
                                                        <td>팀장</td>
                                                        <td>나세영</td>
                                                        <td>219-0348</td>
                                                        <td>2030경영기획팀 총괄</td>
                                                    </tr>
                                                    <tr>
                                                        <td>책임행정원</td>
                                                        <td>유수영</td>
                                                        <td>219-0380</td>
                                                        <td>벤처단지 중장기 운영 기획 등</td>
                                                    </tr>
                                                    <tr>
                                                        <td>책임행정원</td>
                                                        <td>문명희</td>
                                                        <td>219-0318</td>
                                                        <td>사업관리/구매 담당</td>
                                                    </tr>
                                                    <tr>
                                                        <td>선임행정원</td>
                                                        <td>이슬비</td>
                                                        <td>219-0308</td>
                                                        <td>사업관리/구매 담당</td>
                                                    </tr>
                                                    <tr>
                                                        <td>선임행정원</td>
                                                        <td>최유미</td>
                                                        <td>219-0418</td>
                                                        <td>구매 및 사업관리</td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>

                                            <div class="contents contents_9">

                                                <table class="tbl_02 chart_tbl mt_20 mb_50">
                                                    <caption>
                                                        <span>인재개발팀</span>
                                                    </caption>
                                                    <colgroup>
                                                        <col width="196px">
                                                        <col width="240px">
                                                        <col width="204px">
                                                        <col width="auto">
                                                    </colgroup>
                                                    <tbody>
                                                    <tr>
                                                        <th>직위</th>
                                                        <th>성명</th>
                                                        <th>연락처</th>
                                                        <th>담당업무</th>
                                                    </tr>
                                                    <tr>
                                                        <td>팀장</td>
                                                        <td>나세영</td>
                                                        <td>219-0348</td>
                                                        <td>2030경영기획팀 총괄</td>
                                                    </tr>
                                                    <tr>
                                                        <td>책임행정원</td>
                                                        <td>유수영</td>
                                                        <td>219-0380</td>
                                                        <td>벤처단지 중장기 운영 기획 등</td>
                                                    </tr>
                                                    <tr>
                                                        <td>책임행정원</td>
                                                        <td>문명희</td>
                                                        <td>219-0318</td>
                                                        <td>사업관리/구매 담당</td>
                                                    </tr>
                                                    <tr>
                                                        <td>선임행정원</td>
                                                        <td>이슬비</td>
                                                        <td>219-0308</td>
                                                        <td>사업관리/구매 담당</td>
                                                    </tr>
                                                    <tr>
                                                        <td>선임행정원</td>
                                                        <td>최유미</td>
                                                        <td>219-0418</td>
                                                        <td>구매 및 사업관리</td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>

                                            <div class="contents contents_10">
                                                <table class="tbl_02 chart_tbl mt_20 mb_50">
                                                    <caption>
                                                        <span>일자리창업허브팀</span>
                                                    </caption>
                                                    <colgroup>
                                                        <col width="196px">
                                                        <col width="240px">
                                                        <col width="204px">
                                                        <col width="auto">
                                                    </colgroup>
                                                    <tbody>
                                                    <tr>
                                                        <th>직위</th>
                                                        <th>성명</th>
                                                        <th>연락처</th>
                                                        <th>담당업무</th>
                                                    </tr>
                                                    <tr>
                                                        <td>팀장</td>
                                                        <td>나세영</td>
                                                        <td>219-0348</td>
                                                        <td>2030경영기획팀 총괄</td>
                                                    </tr>
                                                    <tr>
                                                        <td>책임행정원</td>
                                                        <td>유수영</td>
                                                        <td>219-0380</td>
                                                        <td>벤처단지 중장기 운영 기획 등</td>
                                                    </tr>
                                                    <tr>
                                                        <td>책임행정원</td>
                                                        <td>문명희</td>
                                                        <td>219-0318</td>
                                                        <td>사업관리/구매 담당</td>
                                                    </tr>
                                                    <tr>
                                                        <td>선임행정원</td>
                                                        <td>이슬비</td>
                                                        <td>219-0308</td>
                                                        <td>사업관리/구매 담당</td>
                                                    </tr>
                                                    <tr>
                                                        <td>선임행정원</td>
                                                        <td>최유미</td>
                                                        <td>219-0418</td>
                                                        <td>구매 및 사업관리</td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>

                                            <div class="contents contents_19">
                                                <table class="tbl_02 chart_tbl mt_20 mb_50">
                                                    <caption>
                                                        <span>일자리창업허브팀(군산)</span>
                                                    </caption>
                                                    <colgroup>
                                                        <col width="196px">
                                                        <col width="240px">
                                                        <col width="204px">
                                                        <col width="auto">
                                                    </colgroup>
                                                    <tbody>
                                                    <tr>
                                                        <th>직위</th>
                                                        <th>성명</th>
                                                        <th>연락처</th>
                                                        <th>담당업무</th>
                                                    </tr>
                                                    <tr>
                                                        <td>팀장</td>
                                                        <td>나세영</td>
                                                        <td>219-0348</td>
                                                        <td>2030경영기획팀 총괄</td>
                                                    </tr>
                                                    <tr>
                                                        <td>책임행정원</td>
                                                        <td>유수영</td>
                                                        <td>219-0380</td>
                                                        <td>벤처단지 중장기 운영 기획 등</td>
                                                    </tr>
                                                    <tr>
                                                        <td>책임행정원</td>
                                                        <td>문명희</td>
                                                        <td>219-0318</td>
                                                        <td>사업관리/구매 담당</td>
                                                    </tr>
                                                    <tr>
                                                        <td>선임행정원</td>
                                                        <td>이슬비</td>
                                                        <td>219-0308</td>
                                                        <td>사업관리/구매 담당</td>
                                                    </tr>
                                                    <tr>
                                                        <td>선임행정원</td>
                                                        <td>최유미</td>
                                                        <td>219-0418</td>
                                                        <td>구매 및 사업관리</td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>

                                            <div class="contents contents_20">
                                                <table class="tbl_02 chart_tbl mt_20 mb_50">
                                                    <caption>
                                                        <span>일자리창업허브팀(익산)</span>
                                                    </caption>
                                                    <colgroup>
                                                        <col width="196px">
                                                        <col width="240px">
                                                        <col width="204px">
                                                        <col width="auto">
                                                    </colgroup>
                                                    <tbody>
                                                    <tr>
                                                        <th>직위</th>
                                                        <th>성명</th>
                                                        <th>연락처</th>
                                                        <th>담당업무</th>
                                                    </tr>
                                                    <tr>
                                                        <td>팀장</td>
                                                        <td>나세영</td>
                                                        <td>219-0348</td>
                                                        <td>2030경영기획팀 총괄</td>
                                                    </tr>
                                                    <tr>
                                                        <td>책임행정원</td>
                                                        <td>유수영</td>
                                                        <td>219-0380</td>
                                                        <td>벤처단지 중장기 운영 기획 등</td>
                                                    </tr>
                                                    <tr>
                                                        <td>책임행정원</td>
                                                        <td>문명희</td>
                                                        <td>219-0318</td>
                                                        <td>사업관리/구매 담당</td>
                                                    </tr>
                                                    <tr>
                                                        <td>선임행정원</td>
                                                        <td>이슬비</td>
                                                        <td>219-0308</td>
                                                        <td>사업관리/구매 담당</td>
                                                    </tr>
                                                    <tr>
                                                        <td>선임행정원</td>
                                                        <td>최유미</td>
                                                        <td>219-0418</td>
                                                        <td>구매 및 사업관리</td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>

                                            <div class="contents contents_29">
                                                <p class="logo_line mt100">항공우주사업부</p>
                                                <table class="tbl_02 chart_tbl mt20">
                                                    <colgroup>
                                                        <col width="196px">
                                                        <col width="240px">
                                                        <col width="204px">
                                                        <col width="auto">
                                                    </colgroup>
                                                    <tbody>
                                                    <tr>
                                                        <th>직위</th>
                                                        <th>성명</th>
                                                        <th>연락처</th>
                                                        <th>담당업무본부장</th>
                                                    </tr>
                                                    <tr>
                                                        <td>본부장</td>
                                                        <td>송기정</td>
                                                        <td>219-0330</td>
                                                        <td>경영기획관리본부 총괄</td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>

                                            <div class="contents contents_21">
                                                <table class="tbl_02 chart_tbl mt_20 mb_50">
                                                    <caption>
                                                        <span>항공우주개발팀</span>
                                                    </caption>
                                                    <colgroup>
                                                        <col width="196px">
                                                        <col width="240px">
                                                        <col width="204px">
                                                        <col width="auto">
                                                    </colgroup>
                                                    <tbody>
                                                    <tr>
                                                        <th>직위</th>
                                                        <th>성명</th>
                                                        <th>연락처</th>
                                                        <th>담당업무</th>
                                                    </tr>
                                                    <tr>
                                                        <td>팀장</td>
                                                        <td>나세영</td>
                                                        <td>219-0348</td>
                                                        <td>2030경영기획팀 총괄</td>
                                                    </tr>
                                                    <tr>
                                                        <td>책임행정원</td>
                                                        <td>유수영</td>
                                                        <td>219-0380</td>
                                                        <td>벤처단지 중장기 운영 기획 등</td>
                                                    </tr>
                                                    <tr>
                                                        <td>책임행정원</td>
                                                        <td>문명희</td>
                                                        <td>219-0318</td>
                                                        <td>사업관리/구매 담당</td>
                                                    </tr>
                                                    <tr>
                                                        <td>선임행정원</td>
                                                        <td>이슬비</td>
                                                        <td>219-0308</td>
                                                        <td>사업관리/구매 담당</td>
                                                    </tr>
                                                    <tr>
                                                        <td>선임행정원</td>
                                                        <td>최유미</td>
                                                        <td>219-0418</td>
                                                        <td>구매 및 사업관리</td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>

                                            <div class="contents contents_22">
                                                <table class="tbl_02 chart_tbl mt_20 mb_50">
                                                    <caption>
                                                        <span>항공우주기술팀</span>
                                                    </caption>
                                                    <colgroup>
                                                        <col width="196px">
                                                        <col width="240px">
                                                        <col width="204px">
                                                        <col width="auto">
                                                    </colgroup>
                                                    <tbody>
                                                    <tr>
                                                        <th>직위</th>
                                                        <th>성명</th>
                                                        <th>연락처</th>
                                                        <th>담당업무</th>
                                                    </tr>
                                                    <tr>
                                                        <td>팀장</td>
                                                        <td>나세영</td>
                                                        <td>219-0348</td>
                                                        <td>2030경영기획팀 총괄</td>
                                                    </tr>
                                                    <tr>
                                                        <td>책임행정원</td>
                                                        <td>유수영</td>
                                                        <td>219-0380</td>
                                                        <td>벤처단지 중장기 운영 기획 등</td>
                                                    </tr>
                                                    <tr>
                                                        <td>책임행정원</td>
                                                        <td>문명희</td>
                                                        <td>219-0318</td>
                                                        <td>사업관리/구매 담당</td>
                                                    </tr>
                                                    <tr>
                                                        <td>선임행정원</td>
                                                        <td>이슬비</td>
                                                        <td>219-0308</td>
                                                        <td>사업관리/구매 담당</td>
                                                    </tr>
                                                    <tr>
                                                        <td>선임행정원</td>
                                                        <td>최유미</td>
                                                        <td>219-0418</td>
                                                        <td>구매 및 사업관리</td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>

                                            <div class="contents contents_23">
                                                <p class="logo_line mt100">드론사업부</p>
                                                <table class="tbl_02 chart_tbl mt20">
                                                    <colgroup>
                                                        <col width="196px">
                                                        <col width="240px">
                                                        <col width="204px">
                                                        <col width="auto">
                                                    </colgroup>
                                                    <tbody>
                                                    <tr>
                                                        <th>직위</th>
                                                        <th>성명</th>
                                                        <th>연락처</th>
                                                        <th>담당업무본부장</th>
                                                    </tr>
                                                    <tr>
                                                        <td>본부장</td>
                                                        <td>송기정</td>
                                                        <td>219-0330</td>
                                                        <td>경영기획관리본부 총괄</td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>

                                            <div class="contents contents_24">
                                                <table class="tbl_02 chart_tbl mt_20 mb_50">
                                                    <caption>
                                                        <span>드론산업혁신지원센터</span>
                                                    </caption>
                                                    <colgroup>
                                                        <col width="196px">
                                                        <col width="240px">
                                                        <col width="204px">
                                                        <col width="auto">
                                                    </colgroup>
                                                    <tbody>
                                                    <tr>
                                                        <th>직위</th>
                                                        <th>성명</th>
                                                        <th>연락처</th>
                                                        <th>담당업무</th>
                                                    </tr>
                                                    <tr>
                                                        <td>팀장</td>
                                                        <td>나세영</td>
                                                        <td>219-0348</td>
                                                        <td>2030경영기획팀 총괄</td>
                                                    </tr>
                                                    <tr>
                                                        <td>책임행정원</td>
                                                        <td>유수영</td>
                                                        <td>219-0380</td>
                                                        <td>벤처단지 중장기 운영 기획 등</td>
                                                    </tr>
                                                    <tr>
                                                        <td>책임행정원</td>
                                                        <td>문명희</td>
                                                        <td>219-0318</td>
                                                        <td>사업관리/구매 담당</td>
                                                    </tr>
                                                    <tr>
                                                        <td>선임행정원</td>
                                                        <td>이슬비</td>
                                                        <td>219-0308</td>
                                                        <td>사업관리/구매 담당</td>
                                                    </tr>
                                                    <tr>
                                                        <td>선임행정원</td>
                                                        <td>최유미</td>
                                                        <td>219-0418</td>
                                                        <td>구매 및 사업관리</td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>

                                            <div class="contents contents_17">
                                                <p class="logo_line mt100">바이오식품산업화센터</p>
                                                <table class="tbl_02 chart_tbl mt20">
                                                    <caption>
                                                        <span>바이오식품산업화센터</span>
                                                    </caption>
                                                    <colgroup>
                                                        <col width="196px">
                                                        <col width="240px">
                                                        <col width="204px">
                                                        <col width="auto">
                                                    </colgroup>
                                                    <tbody>
                                                    <tr>
                                                        <th>직위</th>
                                                        <th>성명</th>
                                                        <th>연락처</th>
                                                        <th>담당업무본부장</th>
                                                    </tr>
                                                    <tr>
                                                        <td>센터장</td>
                                                        <td>김대중</td>
                                                        <td>210-6550</td>
                                                        <td>바이오식품산업화센터 총괄</td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>

                                            <div class="contents contents_25">
                                                <p class="logo_line mt100">스마트매뉴팩처링사업부</p>
                                                <table class="tbl_02 chart_tbl mt20">
                                                    <colgroup>
                                                        <col width="196px">
                                                        <col width="240px">
                                                        <col width="204px">
                                                        <col width="auto">
                                                    </colgroup>
                                                    <tbody>
                                                    <tr>
                                                        <th>직위</th>
                                                        <th>성명</th>
                                                        <th>연락처</th>
                                                        <th>담당업무본부장</th>
                                                    </tr>
                                                    <tr>
                                                        <td>본부장</td>
                                                        <td>송기정</td>
                                                        <td>219-0330</td>
                                                        <td>경영기획관리본부 총괄</td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>

                                            <div class="contents contents_26">
                                                <p class="logo_line mt100">시설관리·환경미화</p>
                                                <table class="tbl_02 chart_tbl mt20">
                                                    <colgroup>
                                                        <col width="196px">
                                                        <col width="240px">
                                                        <col width="204px">
                                                        <col width="auto">
                                                    </colgroup>
                                                    <tbody>
                                                    <tr>
                                                        <th>직위</th>
                                                        <th>성명</th>
                                                        <th>연락처</th>
                                                        <th>담당업무본부장</th>
                                                    </tr>
                                                    <tr>
                                                        <td>본부장</td>
                                                        <td>송기정</td>
                                                        <td>219-0330</td>
                                                        <td>경영기획관리본부 총괄</td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>

                                            <div class="contents contents_11">

                                                <table class="tbl_02 chart_tbl mt_20 mb_50">
                                                    <caption>
                                                        <span>상품화지원팀</span>
                                                    </caption>
                                                    <colgroup>
                                                        <col width="196px">
                                                        <col width="240px">
                                                        <col width="204px">
                                                        <col width="auto">
                                                    </colgroup>
                                                    <tbody>
                                                    <tr>
                                                        <th>직위</th>
                                                        <th>성명</th>
                                                        <th>연락처</th>
                                                        <th>담당업무</th>
                                                    </tr>
                                                    <tr>
                                                        <td>팀장</td>
                                                        <td>나세영</td>
                                                        <td>219-0348</td>
                                                        <td>2030경영기획팀 총괄</td>
                                                    </tr>
                                                    <tr>
                                                        <td>책임행정원</td>
                                                        <td>유수영</td>
                                                        <td>219-0380</td>
                                                        <td>벤처단지 중장기 운영 기획 등</td>
                                                    </tr>
                                                    <tr>
                                                        <td>책임행정원</td>
                                                        <td>문명희</td>
                                                        <td>219-0318</td>
                                                        <td>사업관리/구매 담당</td>
                                                    </tr>
                                                    <tr>
                                                        <td>선임행정원</td>
                                                        <td>이슬비</td>
                                                        <td>219-0308</td>
                                                        <td>사업관리/구매 담당</td>
                                                    </tr>
                                                    <tr>
                                                        <td>선임행정원</td>
                                                        <td>최유미</td>
                                                        <td>219-0418</td>
                                                        <td>구매 및 사업관리</td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>

                                            <div class="contents contents_12">

                                                <table class="tbl_02 chart_tbl mt_20 mb_50">
                                                    <caption>
                                                        <span>창업보육팀</span>
                                                    </caption>
                                                    <colgroup>
                                                        <col width="196px">
                                                        <col width="240px">
                                                        <col width="204px">
                                                        <col width="auto">
                                                    </colgroup>
                                                    <tbody>
                                                    <tr>
                                                        <th>직위</th>
                                                        <th>성명</th>
                                                        <th>연락처</th>
                                                        <th>담당업무</th>
                                                    </tr>
                                                    <tr>
                                                        <td>팀장</td>
                                                        <td>나세영</td>
                                                        <td>219-0348</td>
                                                        <td>2030경영기획팀 총괄</td>
                                                    </tr>
                                                    <tr>
                                                        <td>책임행정원</td>
                                                        <td>유수영</td>
                                                        <td>219-0380</td>
                                                        <td>벤처단지 중장기 운영 기획 등</td>
                                                    </tr>
                                                    <tr>
                                                        <td>책임행정원</td>
                                                        <td>문명희</td>
                                                        <td>219-0318</td>
                                                        <td>사업관리/구매 담당</td>
                                                    </tr>
                                                    <tr>
                                                        <td>선임행정원</td>
                                                        <td>이슬비</td>
                                                        <td>219-0308</td>
                                                        <td>사업관리/구매 담당</td>
                                                    </tr>
                                                    <tr>
                                                        <td>선임행정원</td>
                                                        <td>최유미</td>
                                                        <td>219-0418</td>
                                                        <td>구매 및 사업관리</td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div class="mt10" style="display:flex;justify-content: center;">
                                            <button class="btn btn-quirk infoBtn" style="background-color: rgb(240, 240, 240); color: rgb(105, 108, 116);">2021년 1월</button>
                                            <button class="btn btn-quirk infoBtn" style="background-color: rgb(240, 240, 240); color: rgb(105, 108, 116);">2022년 1월</button>
                                            <button class="btn btn-quirk infoBtn" style="background-color: rgb(240, 240, 240); color: rgb(105, 108, 116);">2023년 1월</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div><!-- panel -->

                    <div class="mainFooter" style="text-align:center; clear:both;margin-top: 30px;">
                        <p style="margin:0;">(사)캠틱종합기술원 / 전북 전주시 덕진구 유상로 67 (우)54852</p>
                        <p>Tel : 063-219-0300 / Fax : 063-219-0303 Copyright[c] 2006 CAMTIC All rights Reserved camtic@camtic.or.kr</p>
                    </div>
                </div><!-- col-md-9 -->
                <div class="col-md-3 col-lg-2 dash-right">
                    <div class="row">
                        <div class="col-sm-5 col-md-12 col-lg-12">
                            <div class="media leftpanel-profile" style="text-align:center;">
                                <div>
                                    <a href="#">
                                        <img src="/images/photos/loggeduser1.png" alt="" class="media-object img-circle" style="text-align: center; margin: 0 auto; margin-bottom: 10px; width:100px;">
                                    </a>
                                </div>
                                <div class="media-body">
                                    <h4 class="media-heading">사원 홍길동</h4>
                                    <span>(사)캠틱종합기술원 관리팀</span>
                                </div>
                                <div class="mt10" style="display:flex;justify-content: center;">
                                    <button class="btn btn-quirk infoBtn" id="goWork">출근</button>
                                    <button class="btn btn-quirk infoBtn" id="offWork">퇴근</button>
                                </div>
                            </div><!-- leftpanel-profile -->
                        </div><!-- col-md-12 -->
                    </div><!-- row -->

                    <div class="row" style="margin-top:15px;">
                        <div class="col-sm-5 col-md-12 col-lg-12">
                            <div class="tab-pane" id="emailmenu">
                                <div class="panel-group" id="accordion3">
                                    <div class="panel panel-primary">
                                        <div class="panel-heading">
                                            <h4 class="panel-title">
                                                <a data-toggle="collapse" data-parent="#accordion3" href="#collapseOne3">
                                                    결재현황
                                                </a>
                                            </h4>
                                        </div>
                                        <div id="collapseOne3" class="panel-collapse collapse in">
                                            <div class="panel-body" style="padding:0 10px;">
                                                <ul class="nav nav-quirk">
                                                    <li><p style="padding: 10px 10px 0px;">진행<span style="position:absolute; right:10px;">0건</span></p></li>
                                                    <li><p style="padding: 10px 10px 0px;">완료<span style="position:absolute; right:10px;">0건</span></p></li>
                                                    <li><p style="padding: 10px 10px 0px;">반려<span style="position:absolute; right:10px;">0건</span></p></li>
                                                    <li><p style="padding: 10px 10px 0px;">임시저장<span style="position:absolute; right:10px;">0건</span></p></li>
                                                    <li><p style="padding: 10px 10px 0px;">열람<span style="position:absolute; right:10px;">0건</span></p></li>
                                                    <li><p style="padding: 10px 10px 0px;">더보기<span style="position:absolute; right:10px;">0건</span></p></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="panel panel-primary">
                                        <div class="panel-heading">
                                            <h4 class="panel-title">
                                                <a data-toggle="collapse" class="collapsed" data-parent="#accordion3" href="#collapseTwo3">
                                                    전자결재
                                                </a>
                                            </h4>
                                        </div>
                                        <div id="collapseTwo3" class="panel-collapse collapse">
                                            <div class="panel-body">
                                                <div class="mt10" style="display:flex;">
                                                    <button class="btn btn-quirk infoBtn">목록</button>
                                                    <button class="btn btn-quirk infoBtn">보고서 추가</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="panel panel-primary">
                                        <div class="panel-heading">
                                            <h4 class="panel-title">
                                                <a data-toggle="collapse" class="collapsed" data-parent="#accordion3" href="#collapseThree3">
                                                    근태현황
                                                </a>
                                            </h4>
                                        </div>
                                        <div id="collapseThree3" class="panel-collapse collapse">
                                            <div class="panel-body">
                                                근태현황
                                            </div>
                                        </div>
                                    </div>
                                    <div class="panel panel-primary">
                                        <div class="panel-heading">
                                            <h4 class="panel-title">
                                                <a data-toggle="collapse" class="collapsed" data-parent="#accordion3" href="#collapseFour3">
                                                    일일업무보고
                                                </a>
                                            </h4>
                                        </div>
                                        <div id="collapseFour3" class="panel-collapse collapse">
                                            <div class="panel-body">
                                                일일업무보고
                                            </div>
                                        </div>
                                    </div>
                                    <div class="panel panel-primary">
                                        <div class="panel-heading">
                                            <h4 class="panel-title">
                                                <a data-toggle="collapse" class="collapsed" data-parent="#accordion3" href="#collapseFive3">
                                                    지출결의
                                                </a>
                                            </h4>
                                        </div>
                                        <div id="collapseFive3" class="panel-collapse collapse">
                                            <div class="panel-body">
                                                지출결의
                                            </div>
                                        </div>
                                    </div>
                                    <div class="panel panel-primary">
                                        <div class="panel-heading">
                                            <h4 class="panel-title">
                                                <a data-toggle="collapse" class="collapsed" data-parent="#accordion3" href="#collapseSix3">
                                                    출장보고
                                                </a>
                                            </h4>
                                        </div>
                                        <div id="collapseSix3" class="panel-collapse collapse">
                                            <div class="panel-body">
                                                출장보고
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div><!-- row -->
        </div><!-- contentpanel -->
    </div><!-- mainpanel -->
</section>
<script type="text/javascript">
    var today = new Date();
    var hours = today.getHours();
    var minutes = today.getMinutes();
    var seconds = today.getSeconds();
    var todayTime = hours + ' : ' + minutes + ' : ' + seconds;
    console.log(todayTime);
    //function goWork(){
    $('#goWork').click(function() {
        if( $(this).html() == '출근' ) {
            $(this).html(todayTime);
            $(this).css("background-color", "#5bc0de");
            $(this).css("color", "#FFF");
            $('#offWork').html('퇴근');
            $('#offWork').css("background-color", "#F0F0F0");
            $('#offWork').css("color", "#696C74");
        }
        else {
            $(this).html('출근');
        }
    });
    //}

    $('#offWork').click(function() {
        if( $(this).html() == '퇴근' ) {
            $(this).html(todayTime);
            $(this).css("background-color", "#5bc0de");
            $(this).css("color", "#FFF");
            $('#goWork').html('출근');
            $('#goWork').css("background-color", "#F0F0F0");
            $('#goWork').css("color", "#696C74");
        }
        else {
            $(this).html('퇴근');
        }
    });

</script>
</body>



</html>


