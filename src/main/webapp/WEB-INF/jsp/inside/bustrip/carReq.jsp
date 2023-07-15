<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="/js/intra/inside/bustrip/carReq.js?v=${today}"/></script>
<style>
    .k-event-inverse {
        cursor: pointer
    }
</style>
<div class="col-md-10 col-lg-10 dash-left">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">차량사용신청</h4>
            <div class="title-road" style="text-align: right; margin-bottom: 5px;">캠인사이드 > 차량/회의실관리 > 차량사용신청</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div style="margin-bottom:10px;">
                <table class="table table-bordered mb-0" style="border: 0; margin-top : 5px; border: 1px solid #dedfdf;">
                    <tr>
                        <td style="border-bottom:0;">
                            <div style="display:flex;">
                                <div class="mr10">
                                    <span>년월</span>
                                    <input type="text" id="carReqDt" style="width: 130px;">
                                </div>
                                <div class="mr10">
                                    <span>사용 차량</span>
                                    <input type="text" id="carClass" style="width: 150px;">
                                </div>
                                <div class="mr10">
                                    <span>운행 구분</span>
                                    <input type="text" id="carType" style="width: 150px;">
                                </div>
                                <div class="mr10">
                                <span>검색구분</span>
                                    <input type="text" id="searchType" style="width: 150px;">
                                </div>
                                <div class="mr10">
                                    <input type="text" id="searchText" style="width: 100px;">
                                </div>
                                <div class="mr10">
                                    <button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="">
                                        <span>검색</span>
                                    </button>
                                </div>
                                <div class="mr10">
                                    <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" style="width:100px; height:27px; line-height:0;" onclick="">
                                        검색 초기화
                                    </button>
                                </div>
                                <div class="mr10">
                                    <button type="button" id="document" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" style="width:100px; height:27px; line-height:0;" onclick="carList.carPopup();">
                                        차량 사용 신청
                                    </button>
                                </div>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="panel-body">
            <div class="table-responsive">
                <div id="scheduler"></div>
            </div>
        </div>
    </div>
</div>
</div><!-- col-md-9 -->

<script type="text/javascript">
    carList.init();
</script>