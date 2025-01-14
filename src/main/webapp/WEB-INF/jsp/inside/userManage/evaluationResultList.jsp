<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="/js/intra/inside/evaluation/evaluationResultList.js?v=${today}"/></script>
<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="deptSeq" value="${loginVO.orgnztId}"/>
<input type="hidden" id="deptName" value="${loginVO.orgnztNm}"/>

<div class="col-md-12 col-lg-12 dash-left">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">평가결과</h4>
            <div class="title-road" style="text-align: right; margin-bottom: 5px;">캠인사이드 > 인사관리 > 인사평가 > 평가결과조회 > 평가결과</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div>
                <table class="searchTable table table-bordered mb-0">
                    <colgroup>
                        <col width="8%">
                        <col width="10%">
                        <%--<col width="8%">
                        <col width="10%">--%>
                        <col width="8%">
                        <col width="20%">
                        <col width="8%">
                        <col width="30%">
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">조회년도</th>
                        <td>
                            <input type="text" id="searchDate" style="width:100%;">
                        </td>
                        <%--<th class="text-center th-color">차수</th>
                        <td>
                            <input type="text" id="evalNum" style="width:110px;">
                        </td>--%>
                        <th class="text-center th-color adminInput">부서/팀</th>
                        <td>
                            <input type="text" id="dept" class="searchInput" style="width: 45%;">
                            <input type="text" id="team" class="searchInput" style="width: 45%;">
                        </td>
                        <th class="text-center th-color adminInput">직책/직급</th>
                        <td>
                            <input type="text" id="position" style="width: 45%;">
                            <input type="text" id="duty" style="width: 45%;">
                        </td>
                    </tr>
                </table>

                <table class="searchTable table table-bordered mb-0">
                    <colgroup>
                        <col width="3%">
                        <col width="10%">
                        <col width="10%">
                        <col width="10%">
                    </colgroup>
                    <thead>
                        <tr>
                            <th class="text-center th-color" rowspan="2">NO</th>
                            <th class="text-center th-color" rowspan="2">부서명</th>
                            <th class="text-center th-color" rowspan="2">팀명</th>
                            <th class="text-center th-color" rowspan="2">성명</th>
                            <th class="text-center th-color" colspan="5">역량평가</th>
                            <th class="text-center th-color" colspan="3">업적평가</th>
                            <th class="text-center th-color" rowspan="2">최종점수</th>
                            <th class="text-center th-color" rowspan="2">최종등급</th>
                        </tr>
                        <tr>
                            <th class="text-center th-color">상반기</th>
                            <th class="text-center th-color">하반기</th>
                            <th class="text-center th-color">최종점수</th>
                            <th class="text-center th-color">최종등급</th>
                            <th class="text-center th-color">가중치</th>

                            <th class="text-center th-color">최종점수</th>
                            <th class="text-center th-color">최종등급</th>
                            <th class="text-center th-color">가중치</th>
                        </tr>
                    </thead>
                    <tbody id="allEvalResultTb">

                    </tbody>
                </table>

                <div id="mainGrid" style="margin:20px 0;"></div>
            </div>
        </div>

    </div>
</div><!-- col-md-9 -->

<script type="text/javascript">
    evaluationResultList.init();

    function gridReload() {
        var grid = $("#mainGrid").data("kendoGrid");
        if (grid) {
            grid.dataSource.read(); // 데이터 소스 새로고침
        }
    }
</script>