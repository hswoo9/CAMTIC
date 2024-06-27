<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/projectManagement.js?v=${today}'/>"></script>


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

    .container {
        text-align: center;
    }

    .progress-container {
        display: flex;
        justify-content: space-between;
        position: relative;
        max-width: 100%;
    }

    .progress-container::before {
        content: ""; /* Mandatory with ::before */
        background-color: var(--line-border-empty);
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        height: 4px;
        width: 100%;
        z-index: -1;
    }

    .progress {
        background-color: var(--line-border-fill);
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        height: 4px;
        width: 0%;
        z-index: -1;
        transition: 0.4s ease;
    }

    .circle {
        background-color: #fff;
        color: #999;
        height: 30px;
        width: 300px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 3px solid var(--line-border-empty);
        transition: 0.4s ease;
        margin-left: 15px;
    }

    .circle.active {
        border-color: var(--line-border-fill);
        font-weight: bold;
        color: black;
    }
    .circle.ready {
        border-color: #FF772EFF;
        font-weight: bold;
        color: black;
    }

</style>
<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">-</h4>
            <div class="title-road">-</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div>
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
                        <th class="text-center th-color">사업구분</th>
                        <td colspan="5">
                            <input type="text" id="busnClass" style="width: 150px;">
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
                            <input type="text" id="searchText" style="width: 200px;">
                        </td>
                    </tr>
                </table>

                <div class="container" style="display: none;">
                    <div class="progress-container">
                        <div class="progress" id="progress"></div>
                        <div class="circle" id="ps0">상담</div>
                        <div class="circle" id="ps1">견적</div>
                        <div class="circle" id="ps2">수주보고</div>
                        <div class="circle" id="ps3">개발계획</div>
                        <div class="circle" id="ps4">공정</div>
                        <div class="circle" id="ps5">납품</div>
                        <div class="circle" id="ps6">결과보고</div>
                        <div class="circle" id="ps7">원가보고</div>
                    </div>
                </div>

                <div id="mainGrid" style="margin:20px 0;"></div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script>
    camPrj.fn_defaultScript();

    function fn_deptSelect() {
        window.open("/common/deptMultiPop.do","조직도","width=343,height=650");
    }
</script>
