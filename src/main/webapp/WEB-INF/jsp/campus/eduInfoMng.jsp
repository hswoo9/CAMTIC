<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<script type="text/javascript" src="/js/intra/campus/campus.js?v=${toDate}"/></script>
<script type="text/javascript" src="/js/intra/campus/eduInfoMng.js?v=${toDate}"/></script>
<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left: 20px; padding-right: 20px;">
            <h4 class="panel-title">직원학습관리(관리자)</h4>
            <div class="title-road">캠퍼스 > 학습관리 > 학습관리 &gt; 직원학습관리(관리자)</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div style="margin-bottom:10px;">
                <table class="searchTable table table-bordered" style="border: 0; margin-top : 5px; border: 1px solid #dedfdf;">
                    <tr>
                        <th class="text-center th-color">조회년도</th>
                        <td>
                            <input type="text" id="eduYear" style="width: 50%;">
                        </td>
                        <th class="text-center th-color">부서</th>
                        <td>
                            <input type="text" id="deptComp" style="width: 160px;">
                        </td>
                        <th class="text-center th-color">팀</th>
                        <td>
                            <input type="text" id="deptTeam" style="width: 160px;">
                        </td>
                        <th class="text-center th-color">직책</th>
                        <td>
                            <input type="text" id="duty" style="width: 160px;">
                        </td>
                        <th class="text-center th-color">직급</th>
                        <td>
                            <input type="text" id="position" style="width: 160px;">
                        </td>
                    </tr>
                    <tr>
                        <th class="text-center th-color">학습구분</th>
                        <td>
                            <input type="text" id="studyClass" style="width: 170px;">
                        </td>
                        <th class="text-center th-color">상태</th>
                        <td>
                            <input type="text" id="status" style="width: 160px;">
                            <input type="hidden" id="resStatus">
                            <input type="hidden" id="mngCheck">
                        </td>
                        <th class="text-center th-color">성명</th>
                        <td colspan="5">
                            <input type="text" id="kindContent" style="width: 150px;">
                        </td>

                    </tr>
                </table>
                <div id="mainGrid" style="margin:20px 0;"></div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->
<div id="dialog"></div>
<script type="text/javascript">
    eduInfoMng.init();

    $("#dialog").kendoWindow({
        title: "이수완료",
        visible : false,
        resizable: false,
        modal: true,
        width: 800,
        actions: ["Close"],
        open : function () {
            $('#dialog').html(eduInfoMng.global.htmlStr);
        },
    });
</script>