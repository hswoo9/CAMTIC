<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="/js/intra/inside/salaryManage/empSalaryManage.js?v=${today}"></script>
<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="deptSeq" value="${loginVO.orgnztId}"/>
<input type="hidden" id="deptName" value="${loginVO.orgnztNm}"/>

<input type="hidden" id="payEmpSeq" value="" />
<div class="col-md-12 col-lg-12 dash-left">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">직원급여관리</h4>
            <div class="title-road" style="text-align: right; margin-bottom: 5px;">캠인사이드 > 인사관리 > 참여율관리 > 직원급여관리</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div style="margin-bottom:10px;">
                <table class="searchTable table table-bordered mb-0">
                    <colgroup>
                        <col style="width: 6%">
                        <col style="width: 6%">
                        <col style="width: 6%">
                        <col style="width: 18%">
                        <col style="width: 6%">
                        <col style="width: 6%">
                        <col style="width: 6%">
                        <col style="width: 8%">
                        <col style="width: 6%">
                        <col style="width: 15%">
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">재직여부</th>
                        <td>
                            <input type="text" id="workStatusCode" style="width: 100px;">
                        </td>
                        <td>
                            <input type="text" id="searchDateType" style="width: 150px;">
                        </td>
                        <td>
                            <input type="text" id="startDt" style="width: 45%" onkeypress="if(window.event.keyCode==13){esm.gridReload();}"> ~
                            <input type="text" id="endDt" style="width: 45%" onkeypress="if(window.event.keyCode==13){esm.gridReload();}">
                        </td>
                        <th class="text-center th-color">직원구분</th>
                        <td class="text-center th-color">
                            <input type="text" id="division" style="width: 100px">
                        </td>
                        <th class="text-center th-color">적용연도</th>
                        <td>
                            <input type="text" id="year" style="width: 100%" onkeypress="if(window.event.keyCode==13){esm.gridReload();}">
                        </td>

                        <th class="text-center th-color">검색어</th>
                        <td>
                            <input type="text" id="searchKeyWord" style="width: 40%">
                            <input type="text" id="searchText" style="width: 50%" onkeypress="if(window.event.keyCode==13){esm.gridReload();}">
                        </td>
                    </tr>
                </table>
                <div id="mainGrid" style="margin:20px 0;"></div>
            </div>
        </div>

    </div>
</div><!-- col-md-9 -->

<script type="text/javascript">
    esm.fn_defaultScript();

    function userPayMngPop(e){
        var url = "/inside/pop/userPayMngPop.do?empSeq=" + e;
        var name = "userPayMngPop";
        var option = "width=1870, height=650, scrollbars=no, top=200, left=100, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    }
</script>