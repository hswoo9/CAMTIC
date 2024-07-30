<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<link rel="stylesheet" href="/css/intra/kTreeView.css?${toDate}">
<script type="text/javascript" src="/js/intra/inside/userManage/userPersonList.js?v=${today}"/></script>
<script type="text/javascript" src="/js/intra/inside/userManage/passwordEncryption.js?v=${today}"/></script>

<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="deptSeq" value="${loginVO.orgnztId}"/>
<input type="hidden" id="deptName" value="${loginVO.orgnztNm}"/>

<div class="col-md-12 col-lg-12 dash-left">
    <div class="panel" id="mainCard">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title" style="margin-bottom: 5px;">인사관리(관리자)</h4>
            <div class="title-road">캠인사이드 > 인사관리 > 인사관리 &gt; 인사관리(관리자)</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div style="margin-bottom:10px;">
                <table class="searchTable table table-bordered">
                    <colgroup>
                        <col width="8%">
                        <col width="10%">
                        <col width="8%">
                        <col width="10%">
                        <col width="8%">
                        <col width="8%">
                        <col width="8%">
                        <col width="10%">
                        <col width="8%">
                        <col width="20%">
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">부서</th>
                        <td>
                            <input type="text" id="deptComp" style="width: 150px;">
                        </td>
                        <th class="text-center th-color">팀</th>
                        <td>
                            <input type="text" id="deptTeam" style="width: 180px;">
                        </td>
                        <th class="text-center th-color">성별</th>
                        <td>
                            <input type="text" id="userGender" style="width:70px;">
                        </td>
                        <th class="text-center th-color">조회기준일</th>
                        <td>
                            <input type="text" id="start_date" style="width: 100%;">
                        </td>
                        <th class="text-center th-color">검색어</th>
                        <td colspan="3">
                            <input type="text" id="userKind" style="width: 100px;">
                            <input type="text" id="kindContent" style="width: 150px;">
                        </td>
                    </tr>
                </table>
                <table class="table table-bordered mb-0" style="border: 0; margin-top : 5px; border: 1px solid #dedfdf;">
                    <tr>
                        <td style="border-bottom:0; background-color: white">
                            <style>
                                label {
                                    position: relative;
                                    top: -1px;
                                }
                            </style>
                            <div id="selectDivision" class="mt10">
                                <input type="checkbox" class="detailSearch" division="0" id="dsA" checked>
                                <label for="dsA">정규직원 [${countMap.dsA}]</label>
                                <input type="checkbox" class="detailSearch" division="4" divisionSub="1" style="margin-left: 10px;" id="dsB" checked>
                                <label for="dsB">계약직원 [${countMap.dsB}]</label>
                                <input type="checkbox" class="detailSearch" division="4" divisionSub="2" style="margin-left: 10px;" id="dsC" checked>
                                <label for="dsC">인턴사원 [${countMap.dsC}]</label>
                                <input type="checkbox" class="detailSearch" division="1" divisionSub="6" style="margin-left: 10px;" id="dsF">
                                <label for="dsF">위촉직원 [${countMap.dsF}]</label>
                                <input type="checkbox" class="detailSearch" division="3" style="margin-left: 10px;" id="dsE">
                                <label for="dsE">단기직원 [${countMap.dsE}]</label>
                                <input type="checkbox" class="detailSearch" division="4" divisionSub="3" style="margin-left: 10px;" id="dsD">
                                <label for="dsD">시설/환경 [${countMap.dsD}]</label>
                                <%--<input type="checkbox" class="detailSearch" division="1" divisionSub="1,2" style="margin-left: 10px;" id="dsF">--%>
                                <input type="checkbox" class="detailSearch" division="2" style="margin-left: 10px;" id="dsG">
                                <label for="dsG">연수생/학생연구원 [${countMap.dsG}]</label>
                                <input type="checkbox" class="detailSearch" division="10" style="margin-left: 10px;" id="dsH">
                                <label for="dsH">기타 [${countMap.dsH}]</label>
                                <input type="checkbox" class="detailSearch" style="margin-left: 10px;" id="dsI">
                                <label for="dsI">임시직원 [<span id="dsIText">${countMap.dsI}</span>]</label>
                                <%--<input type="checkbox" class="detailSearch" division="9999" style="margin-left: 10px;" id="dsJ">--%>
                                <input type="checkbox" class="detailSearch" division="9999" style="margin-left: 10px;" id="dsJ" onclick="uncheckOtherCheckboxes()">
                                <label for="dsJ">퇴사직원</label>

                                <button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="detailSearchShow($('#detailSearchDiv').css('display'))" style="float:right;bottom: 5px;">상세검색</button>
                            </div>
                        </td>
                    </tr>
                </table>
                <div id="mainGrid" style="margin:20px 0;"></div>

                <div id="mainGridSub" style="margin:20px 0; display: none;"></div>
            </div>
        </div>
    </div>

    <div class="panel" id="detailSearchDiv" style="display: none">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title" style="margin-bottom: 20px;">상세검색</h4>
            <div class="title-road"></div>
            <div id="secondView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div style="margin-bottom:10px;">
                <table class="searchTable table table-bordered">
                    <colgroup>
                        <col width="10%">
                        <col width="40%">
                        <col width="10%">
                        <col width="40%">
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">현황</th>
                        <td>
                            <input type="text" id="workStatusCode" style="width: 150px; margin-right:10px;">
                        </td>
                        <th class="text-center th-color">조회기준일</th>
                        <td>
                            <input type="text" id="start_date_detail" style="width: 140px;">
                            <button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="detailSearchShow($('#detailSearchDiv').css('display'))" style="float:right;">돌아가기</button>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="4" style="text-align: right">
                            <button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="userPersonList.gridReloadDetail()">조회</button>
                            <button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="">검색초기화</button>
                        </td>
                    </tr>
                </table>
                <table class="searchTable table table-bordered mb-0">
                    <tr style="width: 100%;">
                        <td style="width: 50%">
                            <div style="display: flex; justify-content: space-between; align-items: center;">유형</span>
                            <input type="text" id="detailSearch2" style="width: 90%;"></div>
                        </td>
                        <td style="width: 50%">
                            <div style="display: flex; justify-content: space-between; align-items: center;"><span class="mr10">성별</span>
                            <input type="text" id="detailSearch3" style="width: 90%;"></div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div style="display: flex; justify-content: space-between; align-items: center;"><span class="mr10">부서</span>
                            <input type="text" id="detailSearch4" style="width: 90%;"></div>
                        </td>
                        <td>
                            <div style="display: flex; justify-content: space-between; align-items: center;"><span class="mr10">팀</span>
                            <input type="text" id="detailSearch5" style="width: 90%;"></div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div style="display: flex; justify-content: space-between; align-items: center;"><span class="mr10">직급</span>
                            <input type="text" id="detailSearch6" style="width: 90%;"></div>
                        </td>
                        <td>
                            <div style="display: flex; justify-content: space-between; align-items: center;"><span class="mr10">연령</span>
                            <input type="text" id="detailSearch7" style="width: 90%;"></div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div style="display: flex; justify-content: space-between; align-items: center;"><span class="mr10">근속년수</span>
                            <input type="text" id="detailSearch8" style="width: 90%;"></div>
                        </td>
                        <td>
                            <div style="display: flex; justify-content: space-between; align-items: center;"><span class="mr10">최종학력</span>
                            <input type="text" id="detailSearch9" style="width: 90%;"></div>
                        </td>
                    </tr>
                </table>
                <div id="mainGrid2" style="margin:20px 0;"></div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<%--<jsp:include page="/WEB-INF/jsp/popup/approval/popup/approvalService.jsp?v=${today}"></jsp:include>--%>
<script type="text/javascript">
    userPersonList.init();

    function detailSearchShow(e){
        if(e == "none"){
            $("#mainCard").hide()
            $("#detailSearchDiv").show()
        }else{
            $("#mainCard").show()
            $("#detailSearchDiv").hide()
        }
    }

    /* 퇴사직원 체크박스 선택 하면 나머지 체크박스들 체크 해제 */
    function uncheckOtherCheckboxes() {
        var grid = $("#mainGrid").data("kendoGrid");
        var dsJCheckbox = $('#dsJ');
        if (dsJCheckbox.prop('checked')) {
            var checkboxes = $('.detailSearch');
            checkboxes.each(function() {
                var checkbox = $(this);
                if (!checkbox.is(dsJCheckbox)) {
                    checkbox.prop('checked', false);
                }
            });
        }
    }
</script>