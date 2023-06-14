<%--
  Created by IntelliJ IDEA.
  User: jsy
  Date: 2023-06-08
  Time: 오후 16:01
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common.jsp" flush="false"/>
<script type="text/javascript" src="/js/intra/campus/campus.js?v=${today}"/></script>
<script type="text/javascript" src="/js/intra/campus/targetInfo.js?v=${today}"/></script>

<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>

<div class="col-md-10 col-lg-10 dash-left">
    <div class="panel">
        <div class="panel-heading">
            <h4 class="panel-title">목표기술서 작성</h4>
            <div class="title-road">목표기술서관리 &gt; 목표기술서작성</div>
        </div>

        <div class="panel-body">
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
            <div>
                <table class="table table-bordered mb-0" style="border: 0; margin-top : 5px; border: 1px solid #dedfdf;">
                    <tr>
                        <td style="border-bottom:0; background-color: white">
                            <div style="display:flex;">
                                <div>
                                    <span>적용년도</span>
                                    <input type="text" id="targetYear" style="width: 140px;">
                                </div>
                            </div>
                        </td>
                    </tr>
                </table>
                <table class="table table-bordered">
                    <colgroup>
                        <col width="20%" >
                        <col width="80%" >
                    </colgroup>
                    <thead>
                        <tr>
                            <th>승인상태</th>
                            <td>승인</td>
                        </tr>
                    </thead>
                </table>
                <input type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" value="STEP1 : 목표기술서 등록" onclick="targetInfo.targetAddYearPop();"/>
                <input type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" value="STEP2-1 : 주업무 선택" onclick="targetInfo.targetInfoPop();"/>
                <input type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" value="STEP2-2 : 주업무 현황 및 목표 설정" onclick="targetInfo.targetMainSetPop();"/>
                <input type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" value="STEP3-1 : 연계업무 선택" onclick="targetInfo.targetSubInfoPop();"/>
                <input type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" value="STEP3-2 : 연계업무 현황 및 목표 설정" onclick="targetInfo.targetSubSetPop();"/>

                <div class="non" style="text-align: center; margin: auto;">등록된 목표기술서가 없습니다<br>목표기술서를 등록해주세요</div>

                <div style="margin:20px 0;">
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <tbody id="tableData">
                            </tbody>
                        </table>
                    </div><!-- table-responsive -->
                </div>
            </div>
        </div>

    </div>
</div><!-- col-md-9 -->

<jsp:include page="/WEB-INF/jsp/template/footer.jsp" flush="false"/>
<script type="text/javascript">
    targetInfo.init();
</script>