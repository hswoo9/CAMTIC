<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="/js/intra/inside/bustrip/carManage.js?v=${today}"/></script>
<input type="hidden" id="carCodeSn">
<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">차량관리</h4>
            <div class="title-road">캠인사이드 > 자산관리 > 차량관리 > 차량관리</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div style="margin-bottom:10px;">
                <table class="searchTable table table-bordered mb-0">
                    <colgroup>
                        <col width="10%">
                        <col width="40%">
                        <col width="10%">
                        <col width="40%">
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">사용 여부</th>
                        <td>
                            <input type="text" id="useType" style="width: 100px;">
                        </td>
                        <th class="text-center th-color">사용 부서</th>
                        <td>
                            <input type="text" id="dept" style="width: 160px;">
                            <input type="text" id="searchType" style="width: 100px;">
                            <input type="text" id="searchText" style="width: 150px;">
                        </td>
                    </tr>
                </table>
            </div>
        <div class="panel">
            <div class="col-md-6 col-lg-6 dash-left mt10" style="border: 1px solid #d5d5d5;">
                <div class="mt10"></div>
                <span style="font-weight: bold;">* 차량 목록</span>
                <div id="mainGrid" style="margin:10px 0;"></div>
            </div>
            <div class="col-md-6 col-lg-6 dash-right mt10" style="border: 1px solid #d5d5d5;">
                <div class="mt10"></div>
                <span style="font-weight: bold;">* 차량 등록</span>
                <div id="" style="margin:10px 0;"></div>
                <table class="manageTable table table-bordered mb-0">
                    <colgroup>
                        <col width="20%">
                        <col width="80%">
                    </colgroup>
                    <tbody>
                    <tr>
                        <th colspan="2">
                            <button type="button" id="saveButton" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" style="float:right; width:50px; height:27px; line-height:0;" onclick="carManage.saveBtn();">
                                저장
                            </button>
                        </th>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color"><span class="red-star"></span>사용 여부</th>
                        <td><input type="text" id="active" style="width: 100%; margin-right:10px;"></td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color"><span class="red-star"></span>차량 종류</th>
                        <td><input type="text" id="carClassName" style="width: 100%;"></td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color"><span class="red-star"></span>차량 번호</th>
                        <td><input type="text" id="carNum" style="width: 100%;"></td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color"><span class="red-star"></span>사용 부서 여부</th>
                        <td><input type="text" id="useDeptType" style="width: 100%;"></td>
                    </tr>
                    <tr class="varTR" style="display: none">
                        <th scope="row" class="text-center th-color"><span class="red-star"></span>사용 부서</th>
                        <td><input type="text" id="useDept" style="width: 100%;"></td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color"><span class="red-star"></span>등록자</th>
                        <td>
                            <input type="text" id="empName" style="width: 65%;">
                            <input type="hidden" id="empSeq">
                            <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" style="width:30%; height:27px;" onclick="userSearch();">
                                검색
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color"><span class="red-star"></span>등록일자</th>
                        <td><input type="text" id="regDt" style="width: 30%;"></td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color">특이사항</th>
                        <td><textarea type="text" id="remarkCn" style="width: 100%; height: 213px;"></textarea></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script type="text/javascript">
    carManage.init();
</script>