<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="/js/intra/inside/userManage/joinLeaveView.js?v=${today}"/></script>
<style>
    a{color: #696C74;}
</style>
<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">년도별 직급 현황</h4>
            <div class="title-road">캠인사이드 > 인사관리 > 인사관리 &gt; 인사 통계현황 > 년도별 직급 현황</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div>
                <div style="margin:20px 0;">
                    <div class="table-responsive">
                        <table class="table table-bordered mb-0" style="border: 0; margin-top : 5px; border: 1px solid #dedfdf;">
                            <tr style="text-align:left!important;">
                                <td style="border-bottom:0; background-color: white">
                                    <style>
                                        label {
                                            position: relative;
                                            top: -1px;
                                        }
                                    </style>
                                    <div class="mt10">
                                        <input type="checkbox" class="detailSearch" division="0" id="dsA" checked>
                                        <label for="dsA">정규직원</label>
                                        <input type="checkbox" class="detailSearch" division="4" divisionSub="1" style="margin-left: 10px;" id="dsB" checked>
                                        <label for="dsB">계약직원</label>
                                        <input type="checkbox" class="detailSearch" division="4" divisionSub="2" style="margin-left: 10px;" id="dsC" checked>
                                        <label for="dsC">인턴사원</label>
                                        <button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="" style="float:right;bottom: 5px;">엑셀 다운로드</button>
                                    </div>
                                </td>
                            </tr>
                        </table>
                        <table class="centerTable table table-bordered">
                            <tbody>
                            <tr style="background-color: #d8dce3;">
                                <td>년도</td>
                                <td>수석연구원</td>
                                <td>수석매니저</td>
                                <td>수석행정원</td>
                                <td>책임행정원</td>
                                <td>책임매니저</td>
                                <td>책임연구원</td>
                                <td>선임연구원</td>
                                <td>선임매니저</td>
                                <td>선임행정원</td>
                                <td>주임행정원</td>
                                <td>행정원</td>
                                <td>주임매니저</td>
                                <td>매니저</td>
                                <td>주임연구원</td>
                                <td>연구원</td>
                            </tr>
                            <tr style="background-color: white;">
                                <td>2023년</td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                            </tr>
                            <tr style="background-color: white;">
                                <td>2022년</td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                            </tr>
                            <tr style="background-color: white;">
                                <td>2021년</td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                            </tr>
                            <tr style="background-color: white;">
                                <td>2020년</td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                            </tr>
                            <tr style="background-color: white;">
                                <td>2019년</td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                            </tr>
                            <tr style="background-color: white;">
                                <td>2018년</td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                            </tr>
                            <tr style="background-color: white;">
                                <td>2017년</td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                            </tr>
                            <tr style="background-color: white;">
                                <td>2016년</td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                            </tr>
                            <tr style="background-color: white;">
                                <td>2015년</td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                            </tr>
                            <tr style="background-color: white;">
                                <td>2014년</td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                            </tr>
                            <tr style="background-color: white;">
                                <td>2013년</td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                            </tr>
                            <tr style="background-color: white;">
                                <td>2012년</td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                            </tr>
                            <tr style="background-color: white;">
                                <td>2011년</td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                            </tr>
                            <tr style="background-color: white;">
                                <td>2010년</td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                            </tr>
                            <tr style="background-color: white;">
                                <td>2009년</td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                            </tr>
                            <tr style="background-color: white;">
                                <td>2008년</td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                            </tr>
                            <tr style="background-color: white;">
                                <td>2007년</td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                            </tr>
                            <tr style="background-color: white;">
                                <td>2006년</td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                            </tr>
                            <tr style="background-color: white;">
                                <td>2005년</td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                            </tr>
                            <tr style="background-color: white;">
                                <td>2004년</td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                            </tr>
                            <tr style="background-color: white;">
                                <td>2003년</td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                            </tr>
                            <tr style="background-color: white;">
                                <td>2002년</td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                            </tr>
                            <tr style="background-color: white;">
                                <td>2001년</td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                            </tr>
                            <tr style="background-color: white;">
                                <td>2000년</td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                            </tr>
                            <tr style="background-color: white;">
                                <td>1999년</td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                            </tr>
                            </tbody>
                        </table>
                    </div><!-- table-responsive -->
                </div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script type="text/javascript">
</script>