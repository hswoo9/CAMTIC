<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<jsp:useBean id="today" class="java.util.Date" />

<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_achieve/recordTotal.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/project.js?v=${today}'/>"></script>


<input type="hidden" id="myDeptSeq" name="myDeptSeq" value="${loginVO.orgnztId}">
<input type="hidden" id="myEmpSeq" name="myEmpSeq" value="${loginVO.uniqId}">

<style>
    @import url("https://fonts.googleapis.com/css2?family=Muli&display=swap");

    :root {
        --line-border-fill: #3498db;
        --line-border-empty: #e0e0e0;
    }

    * {
        box-sizing: border-box;
    }

    .k-grid-content td {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .totalTable td {
        height: 38.14px;
    }

    #tooltip span {
        cursor: pointer;
        display: block;
        margin-top : 12px;
        width: 20px;
        height: 20px;
        background-image: url("../images/ico/ico_alert.png");
        background-size: 20px;
        -moz-border-radius: 30px;
        -webkit-border-radius: 30px;
        border: none;
        -moz-box-shadow: 0 0 0 1px rgba(0,0,0,0.5);
        /*-webkit-box-shadow: 0 0 0 1px rgba(0,0,0,0.5);*/
        /*box-shadow: 0 0 0 1px rgba(0,0,0,0.5);*/
        -moz-transition:  -moz-box-shadow .3s;
        -webkit-transition:  -webkit-box-shadow .3s;
        transition:  box-shadow .3s;
    }

    #tooltip span:hover {
        -moz-box-shadow: 0 0 0 15px rgba(0,0,0,0.5);
        -webkit-box-shadow: 0 0 0 15px rgba(0,0,0,0.5);
        box-shadow: 0 0 0 15px rgba(0,0,0,0.5);
        -moz-transition:  -moz-box-shadow .3s;
        -webkit-transition:  -webkit-box-shadow .3s;
        transition:  box-shadow .3s;
    }

    .hoverSpan:hover {
        text-decoration: underline;
    }

    #projectTooltip:hover

    .hide {
        display: none;
    }

    .k-footer-template td:nth-child(1),
    .k-footer-template td:nth-child(2),
    .k-footer-template td:nth-child(3),
    .k-footer-template td:nth-child(4),
    .k-footer-template td:nth-child(5),
    .k-footer-template td:nth-child(6),
    .k-footer-template td:nth-child(7) {
        border-width: 0;
        text-align: right;
    }
</style>
<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">법인추진실적집계</h4>
            <div class="title-road">캠어취브 > 캠어취브 &gt; 재무성과 &gt; 법인추진실적집계</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">

            <table class="searchTable table table-bordered mb-0">
                <colgroup>
                    <col width="10%">
                    <col width="25%">
                    <col width="10%">
                    <col width="20%">
                    <col width="10%">
                    <col width="25%">
                </colgroup>
                <tr>
                    <th class="text-center th-color">연도선택</th>
                    <td colspan="6">
                        <input type="text" id="pjtYear" style="width: 150px;">
                    </td>
                </tr>
                <tr>
                    <th class="text-center th-color">사업구분</th>
                    <td>
                        <input type="text" id="busnClass" style="width: 150px;">
                    </td>
                    <th class="text-center th-color">진행단계</th>
                    <td>
                        <input type="text" id="busnSubClass" style="width: 150px;">
                    </td>
                    <th class="text-center th-color">PM</th>
                    <td>
                        <input type="text" id="empName" style="width: 150px;">
                    </td>
                </tr>
                <tr>
                    <th class="text-center th-color">대상부서</th>
                    <td>
                        <div onclick="fn_deptSelect();">
                            <input type="text" id="deptName" style="width: 90%;">
                            <span class='k-icon k-i-search k-button-icon' style="cursor: pointer"></span>
                            <input type="hidden" id="deptSeq" name="deptSeq" />
                        </div>
                    </td>
                    <th class="text-center th-color">검색</th>
                    <td colspan="4">
                        <input type="text" id="searchValue" style="width: 150px;">
                        <input type="text" id="searchValue2" style="width: 150px;">
                        <input type="text" id="searchText" onkeypress="if(event.keyCode==13){ recordTotal.mainGrid(); }" style="width: 200px;">
                    </td>
                </tr>
            </table>

            <div id="mainGrid"></div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script>

    recordTotal.fn_defaultScript();

</script>
