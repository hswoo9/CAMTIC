<%--
  Created by IntelliJ IDEA.
  User: user
  Date: 2023-03-13
  Time: 오후 2:10
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common.jsp" flush="false"/>
<style>
    table { background-color: white; }
</style>
<link rel="stylesheet" href="/css/intra/kTreeView.css?${toDate}">
<script type="text/javascript" src="/js/intra/appointment/appointmentUserList.js?v=${today}"/></script>

<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="deptSeq" value="${loginVO.orgnztId}"/>
<input type="hidden" id="deptName" value="${loginVO.orgnztNm}"/>

<div class="col-md-10 col-lg-10 dash-left">
    <div class="panel">
        <div class="panel-heading">
            <h4 class="panel-title">직원조회목록</h4>
        </div>

        <div class="panel-body">

            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>


            <div style="margin-bottom:10px;">
                <%--<input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">--%>
                <input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
                <input type="hidden" id="positionCode" name="positionCode" value="${loginVO.positionCode}">
                <input type="hidden" id="deptSeq" name="deptSeq" value="${loginVO.orgnztId}">
                <input type="hidden" id="deptName" name="deptName" value="${loginVO.orgnztNm}">
                <input type="hidden" id="dutyCode" name="dutyCode" value="${loginVO.dutyCode}">
                <table class="table table-bordered mb-0" style="border: 0; margin-top : 5px; border: 1px solid #dedfdf;">
                    <tr>
                        <td style="border-bottom:0;">
                            <span>부서선택</span>
                            <input type="text" id="deptComp" style="width: 150px; margin-right:10px;">
                            <span>팀선택</span>
                            <input type="text" id="deptTeam" style="width: 200px; margin-right:10px;">
                            <span>성별</span>
                            <input type="text" id="userGender" style="width:70px; margin-right:10px;">
                            <span>구분</span>
                            <input type="text" id="userKind" style="width: 100px;">
                            <input type="text" id="kindContent" style="width: 200px;">
                        </td>
                    </tr>
                    <tr>
                        <td style="border-top:0;">
                            <input type="text" id="detailSearch" style="width: 90%;">
                            <button type="button" class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="gridReload()">
                                <span class="k-icon k-i-search k-button-icon"></span>
                            </button>
                        </td>
                    </tr>

                </table>
            </div>
            <div>
                <div style="display:flex;justify-content: flex-end;">
                    <div id="careerInfoBtn" class="btn-st" style="margin:5px 0 5px 0;">
                        <input type="button" class="k-button k-button-solid-info k-rounded" value="추가" onclick=""/>
                        <input type="button" class="k-button k-button-solid-info k-rounded" value="수정" onclick=""/>
                        <input type="button" class="k-button k-button-solid-info k-rounded" value="삭제" onclick=""/>
                    </div>
                </div>
                <div class="table-responsive">
                    <div>
                        <table class="table" style="text-align:center;">
                            <colgroup>
                                <col width="3%">
                                <col width="7%">
                                <col width="10%">
                                <col width="15%">
                                <col width="15%">
                                <col width="15%">
                                <col width="10%">
                                <col width="15%">
                                <col width="10%">
                            </colgroup>
                            <thead>
                            <tr>
                                <th><input type='checkbox' name='' id='careerInfo"+ result.EMP_SEQ +"' class='k-checkbox checkbox' onclick=''></th>
                                <th>번호</th>
                                <th>성명</th>
                                <th>부서(실)</th>
                                <th>부서(팀)</th>
                                <th>직위</th>
                                <th>전화번호</th>
                                <th>핸드폰</th>
                                <th>입사일</th>
                            </tr>
                            <tr>
                                <td><input type='checkbox' name='' id='' class='k-checkbox checkbox' onclick=''></td>
                                <td>1</td>
                                <td>김캠틱</td>
                                <td>우주항공사업부</td>
                                <td>항공개발팀</td>
                                <td>선임연구원</td>
                                <td>063-219-0111</td>
                                <td>010-1234-1234</td>
                                <td>2022/01/01</td>
                            </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div><!-- col-md-9 -->

<jsp:include page="/WEB-INF/jsp/template/footer.jsp" flush="false"/>
<%--<jsp:include page="/WEB-INF/jsp/popup/approval/popup/approvalService.jsp?v=${today}"></jsp:include>--%>
<script type="text/javascript">
    /*var datas = JSON.parse('${data}');*/
    /*draftFormList.fnDefaultScript(datas);*/
    appointmentUser.fn_defaultScript();

    $("#checkAll").click(function(){
        if($(this).is(":checked")) $("input[name=owpPk]").prop("checked", true);
        else $("input[name=owpPk]").prop("checked", false);
    });
</script>