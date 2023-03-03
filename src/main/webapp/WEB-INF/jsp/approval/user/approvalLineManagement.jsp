<%--
  Created by IntelliJ IDEA.
  User: jsy
  Date: 2023-02-28
  Time: 오후 3:21
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!DOCTYPE html>
<html lang="ko">
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
  <link rel="stylesheet" href="../lib/timepicker/jquery.timepicker.css">

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

  <script src="https://code.jquery.com/jquery-3.6.0.js" integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk=" crossorigin="anonymous"></script> //체크


  <!--Kendo ui js-->
  <script type="text/javascript" src="<c:url value='/js/kendoui/jquery.min.js'/>"></script>
  <script type="text/javascript" src="<c:url value='/js/kendoui/kendo.all.min.js'/>"></script>
  <link rel="stylesheet" href="/css/kendoui/kendo.default-main.min.css"/>
  <link rel="stylesheet" href="/css/kendoui/kendo.common.min.css"/>
  <link rel="stylesheet" href="/css/kendoui/kendo.default.min.css"/>
  <link rel="stylesheet" href="/css/style.css"/>
  <style>
    .boxCss{width:190px; height:90px; color:#fff; background-color:#259dab; text-align:center;}
    .boxCss:hover{background-image: linear-gradient(to right, #259dab 0%, #2574ab 100%);}
    .popupTable th{padding:5px!important; vertical-align: middle!important; text-align: center; background-color: #bdc3d1ad;}

    .k-treeview .k-i-collapse:before{background: url("/images/ico/ico_organ03_open.png");content: "";}
    .k-treeview .k-i-expand:before{background: url("/images/ico/ico_organ03_close.png");content: "";}
    .k-treeview .k-treeview-top.k-treeview-bot .k-i-collapse:before{background: url("/images/ico/ico_organ01.png")}
    .k-treeview .k-treeview-top.k-treeview-bot .k-i-expand:before{background: url("/images/ico/ico_organ01.png")}

    .k-treeview .k-i-collapse-disabled, .k-treeview .k-i-expand-disabled {
      cursor: default
    }
    .k-treeview .k-treeview-top, .k-treeview .k-treeview-mid, .k-treeview .k-treeview-bot {
      background-image: url('/images/bg/treeview-nodes.png');
      background-repeat: no-repeat;
      margin-left: -16px;
      padding-left: 16px;
    }
    .k-treeview .k-item { background-image: url('/images/bg/treeview-line.png'); }
    .k-treeview .k-last { background-image: none; }
    .k-treeview .k-treeview-top { background-position: -91px 2px; }
    .k-treeview .k-treeview-bot { background-position: -69px -17px; }
    .k-treeview .k-treeview-mid { background-position: -47px -42px; }
    /*.k-treeview .k-last .k-treeview-top { background-position: -25px -62px; }*/
    .k-treeview .k-group .k-last .k-treeview-bot { background-position: -69px -22px; }
    .k-treeview .k-item {
      background-repeat: no-repeat;
    }
    .k-treeview .k-treeview-top.k-treeview-bot{background: none;}

    .k-treeview .k-first {
      background-repeat: no-repeat;
      background-position: 0 16px;
    }

    .k-grid-toolbar{
      justify-content: flex-end !important;
    }

    .k-grid-norecords{
      justify-content: space-around;
    }
    #approvalLineDataTb tbody tr:hover:not(.active) {
      background-color: #ededed;
    }
    .active{
      background-color: rgb(241, 248, 255);
    }
    #treeViewDiv{
      width: auto !important;
      font-size: 12px;
      line-height: 1.4;
    }
  </style>
</head>

<body>

<header>
  <div class="headerpanel">
    <a href="/indexB.do"><div class="logopanel"></div></a>
    <div class="headerbar" style="width:1460px;">
      <a id="menuToggle" class="menutoggle"><i class="fa fa-bars"></i></a>
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
              <a href="/user/organizationChart.do">
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

      <jsp:include page="/WEB-INF/jsp/template/nav.jsp" flush="false"/>

    </div><!-- leftpanelinner -->
  </div><!-- leftpanel -->

  <div class="mainpanel">

    <!--<div class="pageheader">
      <h2><i class="fa fa-home"></i> Dashboard</h2>
    </div>-->

    <div class="contentpanel">

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
              <div class="boxCss">
                <i class="fa fa-location-arrow" style="font-size:40px;padding:11px;"></i><br>캠인사이드2.0
              </div>
              <div class="boxCss">
                <i class="fa fa-pencil" style="font-size:40px;padding:11px;"></i><br>캠퍼스2.0
              </div>
              <div class="boxCss">
                <i class="fa fa-cloud-upload" style="font-size:40px;padding:11px;"></i><br>캠어취브2.0
              </div>
            </div>
          </div>
          <div class="panel">
            <div class="panel-heading">
              <h4 class="panel-title">결재선 관리</h4>
            </div>
            <div class="panel-body">
              <div class="table-responsive" style="display: flex;">
                <div id="gridForm" style="height:740px; width: 255px;overflow: auto;border: 1px solid #dedfdf;">
                  <div id="deptTree">

                  </div>
                </div>
                <div id="gridForm2" style="width: 80%; height:336px;border: 1px solid #dedfdf;">
                  <div id="deptUserGrid">

                  </div>
                </div>
              </div><!-- table-responsive -->
            </div>
          </div>

          <div class="mainFooter" style="text-align:center; clear:both;margin-top: 456px;">
            <p style="margin:0;">(사)캠틱종합기술원 / 전북 전주시 덕진구 유상로 67 (우)54852</p>
            <p>Tel : 063-219-0300 / Fax : 063-219-0303 Copyright[c] 2006 CAMTIC All rights Reserved camtic@camtic.or.kr</p>
          </div>
        </div><!-- col-md-9 -->

        <div class="col-md-3 col-lg-2 dash-right" style="position:relative;">
          <jsp:include page="/WEB-INF/jsp/template/aside.jsp" flush="false"/>
        </div>
      </div><!-- row -->
    </div><!-- contentpanel -->
  </div><!-- mainpanel -->
</section>
<script type="text/javascript">
  var datas = JSON.parse('${data}');
  var deptSeq = '${loginVO.orgnztId}';
  var deptName = '${loginVO.orgnztNm}';

  $(function(){
    $("#deptTree").kendoTreeView({
      dataSource: datas,
      dataTextField:['dept_name'],
      select: treeClick,
    });
  });

  function treeClick(e){
    var item = $("#deptTree").data("kendoTreeView").dataItem(e.node);
    deptSeq = item.dept_seq;
    $("#deptUserGrid").data("kendoGrid").dataSource.read();
  }

  var deptUserDataSource = new kendo.data.DataSource({
    serverPaging: false,
    transport: {
      read : {
        url : "/approvalUser/getUserList.do",
        dataType : "json",
        type : "post"
      },
      parameterMap: function(data, operation) {
        data.DEPT_SEQ = deptSeq;
        return data;
      }
    },
    schema : {
      data: function (data) {
        return data;
      },
      total: function (data) {
        return data.length;
      },
    },
    pageSize: 10,
  });

  var deptUserGrid = $("#deptUserGrid").kendoGrid({
    dataSource: deptUserDataSource,
    height: 332,
    scrollable: true,
    pageable: {
      refresh: true,
      pageSize : 10,
      pageSizes: [10, 20, 50, "ALL"],
      buttonCount: 5,
      messages: {
        display: "{0} - {1} of {2}",
        itemsPerPage: "",
        empty: "데이터가 없습니다.",
      }
    },
    noRecords: {
      template: "데이터가 존재하지 않습니다."
    },
    columns: [
      {
        field : 'EMP_NAME_KR',
        title : "이름"
      }, {
        field : 'DEPT_NAME',
        title : "부서"
      }, {
        field : 'POSITION_CODE',
        title : "직급"
      }, {
        field : 'DUTY_NAME',
        title : "직책"
      }, {
        title : "선택",
        template : function (row){
          console.log(row);
          return "<button type=\"button\" class=\"k-button k-button-md k-rounded-md k-button-solid k-button-solid-base\" onclick=\"addTable("+row.EMP_SEQ+",'userClick')\">" +
                  '	<span class="k-icon k-i-check k-button-icon"></span>' +
                  '	<span class="k-button-text">선택</span>' +
                  '</button>';
        }
      }
    ]
  }).data("kendoGrid");


</script>
</body>



</html>


