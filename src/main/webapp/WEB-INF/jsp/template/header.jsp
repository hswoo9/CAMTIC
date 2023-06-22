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
                <button class="btn btn-notice" style="float:left; font-size:22px;">
                  <i class="fa fa-sitemap"></i>
                </button>
              </a>
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
