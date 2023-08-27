<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<%--<script type="text/javascript" src="/js/intra/inside/userManage/joinLeaveView.js?v=${today}"/></script>--%>

<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">직급 현황</h4>
            <div class="title-road">캠인사이드 > 인사관리 &gt; 인사 통계현황 > 직급 현황</div>
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


                                        <input type="checkbox" class="detailSearch" division="4" divisionSub="3" style="margin-left: 10px;" id="dsD">
                                        <label for="dsD">경비/환경</label>
                                        <input type="checkbox" class="detailSearch" division="3" style="margin-left: 10px;" id="dsE">
                                        <label for="dsE">단기직원</label>

                                        <input type="checkbox" class="detailSearch" division="1" divisionSub="6" style="margin-left: 10px;" id="dsF">
                                        <label for="dsF">위촉직원</label>
                                        <input type="checkbox" class="detailSearch" division="2" style="margin-left: 10px;" id="dsG">
                                        <label for="dsG">연수생/학생연구원</label>
                                        <button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="" style="float:right;bottom: 5px;">엑셀 다운로드</button>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div><!-- table-responsive -->
                </div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script type="text/javascript">
</script>