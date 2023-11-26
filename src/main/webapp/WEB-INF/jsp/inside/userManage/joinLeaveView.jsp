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
            <h4 class="panel-title">입/퇴사 현황</h4>
            <div class="title-road">캠인사이드 > 인사관리 > 인사관리 &gt; 인사 통계현황 > 입/퇴사 현황</div>
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
                                        <label for="dsD">시설/환경</label>
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
                        <div id="countTable">
                        <!--
                        <table class="centerTable table table-bordered">
                            <colgroup>
                                <col width="35%" >
                                <col width="35%" >
                                <col width="30%" >
                            </colgroup>
                            <tbody>
                            <tr>
                                <td style="background-color: #e1ecff;">입사인원</td>
                                <td style="background-color: #ffddd8;">퇴사인원</td>
                                <td style="background-color: #d8dce3;">현재인원</td>
                            </tr>
                            <tr>
                                <td style="background-color: #e1ecff;"> 명</td>
                                <td style="background-color: #ffddd8;"> 명</td>
                                <td style="background-color: #d8dce3;"> 명</td>
                            </tr>
                            </tbody>
                        </table>
                        -->
                        </div>
                        <div id="mainTable">
                            <!--
                        <table class="centerTable table table-bordered">
                            <tbody>
                            <tr style="background-color: #d8dce3;">
                                <td>년 도 </td>
                                <td>2023년</td>
                                <td>2022년</td>
                                <td>2021년</td>
                                <td>2020년</td>
                                <td>2019년</td>
                                <td>2018년</td>
                                <td>2017년</td>
                            </tr>
                            <tr style="background-color: #e1ecff;">
                                <td> 입 사</td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                            </tr>
                            <tr style="background-color: #ffddd8;">
                                <td> 퇴 사</td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                            </tr>
                            <tr style="background-color: #d8dce3;">
                                <td>년 도</td>
                                <td>2016년</td>
                                <td>2015년</td>
                                <td>2014년</td>
                                <td>2013년</td>
                                <td>2012년</td>
                                <td>2011년</td>
                                <td>2010년</td>
                            </tr>
                            <tr style="background-color: #e1ecff;">
                                <td> 입 사</td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                            </tr>
                            <tr style="background-color: #ffddd8;">
                                <td> 퇴 사</td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                            </tr>
                            <tr style="background-color: #d8dce3;">
                                <td>년 도</td>
                                <td>2009년</td>
                                <td>2008년</td>
                                <td>2007년</td>
                                <td>2006년</td>
                                <td>2005년</td>
                                <td>2004년</td>
                                <td>2003년</td>
                            </tr>
                            <tr style="background-color: #e1ecff;">
                                <td> 입 사</td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                            </tr>
                            <tr style="background-color: #ffddd8;">
                                <td> 퇴 사</td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                            </tr>
                            <tr style="background-color: #d8dce3;">
                                <td>년 도</td>
                                <td>2002년</td>
                                <td>2001년</td>
                                <td>2000년</td>
                                <td>1999년</td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr style="background-color: #e1ecff;">
                                <td> 입 사</td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td> </td>
                                <td> </td>
                                <td> </td>
                            </tr>
                            <tr style="background-color: #ffddd8;">
                                <td> 퇴 사</td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td><a href="javascript:void(0);" onclick="joinLeaveView.userViewPop();"><span>명</span></a></td>
                                <td> </td>
                                <td> </td>
                                <td> </td>
                            </tr>
                            </tbody>
                            </table>
                        -->
                        </div>
                    </div><!-- table-responsive -->
                </div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script type="text/javascript">
joinLeaveView.fn_defaultScript();

    /*
    $.ajax({
        type: "GET",
        url: "/Inside/getTotalEmpCount.do",
        success: function(data) {
            // 받아온 데이터를 처리하는 코드
            console.log(data);
        },
        error: function(error) {
            console.error("Error fetching data:", error);
        }
    });
    */

</script>