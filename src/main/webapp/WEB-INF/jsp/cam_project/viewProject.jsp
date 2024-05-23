<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<jsp:useBean id="today" class="java.util.Date" />

<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js'/>"></script>
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
    .k-footer-template td:nth-child(7),
    .k-footer-template td:nth-child(8) {
        border-width: 0;
        text-align: right;
    }

    .k-footer-template td:nth-child(11),
    .k-footer-template td:nth-child(12) {
        border-width: 0;
    }

    .k-footer-template td:nth-child(9){
        overflow: visible;
        white-space: nowrap;
        text-align: right;
    }

    .k-grid-content td {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .k-grid-content div {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .pjtPage .k-grid td {
        padding: .4em .3em;
    }
</style>
<div class="mainCard pjtPage">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">프로젝트관리</h4>
            <div class="title-road">캠프로젝트 > 프로젝트관리 &gt; 프로젝트관리</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div>
                <button type="button" class="k-button k-button-solid-base" id="displayBtn" onclick="camPrj.fn_statTableShowHide();" style="margin-bottom: 5px">통계 ▲</button>
                <div id="statTable" style="" view="Y">
                    <table class="totalTable table table-bordered" style="margin-bottom: 0px">
                        <thead>
                        <colgroup>
                            <col width="5%">
                            <col width="5%">
                            <col width="11%">

                            <col width="5%">
                            <col width="5%">
                            <col width="11%">

                            <col width="5%">
                            <col width="5%">
                            <col width="11%">

                            <col width="5%">
                            <col width="5%">
                            <col width="11%">

                            <col width="5%">
                            <col width="11%">
                        </colgroup>
                        <tr style="color : white ; background-color: #698bb4;">
                            <td colspan="6" style="text-align: center;"><b>정부사업</b></td>
                            <td colspan="6" style="text-align: center; "><b>민간사업</b></td>
                            <td colspan="2" rowspan="3" style="text-align: center;"><b>합계</b></td>
                        </tr>
                        <tr style="color : black ; background-color: #f0f6ff;">
                            <td colspan="3" style="text-align: center;"><b>R&D</b></td>
                            <td colspan="3" style="text-align: center;"><b>비R&D</b></td>
                            <td colspan="3" style="text-align: center;"><b>엔지니어링</b></td>
                            <td colspan="3" style="text-align: center;"><b>용역/기타</b></td>
                        </tr>
                        <tr>
                            <td colspan="3" style="text-align: center; background-color: #FFFFFF">정부/지자체 R&D</td>
                            <td colspan="3" style="text-align: center; background-color: #FFFFFF">기업지원/창업/교육/<br>민간위탁/기획･조사용역 등</td>
                            <td colspan="3" style="text-align: center; background-color: #FFFFFF">엔지니어링</td>
                            <td colspan="3" style="text-align: center; background-color: #FFFFFF">민간교육, 기획･조사용역, 기타 등</td>
                        </tr>
                        <tr>
                            <td style="text-align: center; background-color: #FFFFFF">예상</td>
                            <td id="expectRndCount" style="text-align: right; background-color: #FFFFFF">0건</td>
                            <td id="expectRndSum" style="text-align: right; background-color: #FFFFFF">0백만원</td>

                            <td style="text-align: center; background-color: #FFFFFF">예상</td>
                            <td id="expectUrndCount" style="text-align: right; background-color: #FFFFFF">0건</td>
                            <td id="expectUrndSum" style="text-align: right; background-color: #FFFFFF">0백만원</td>

                            <td style="text-align: center; background-color: #FFFFFF">예상</td>
                            <td id="expectEngnCount" style="text-align: right; background-color: #FFFFFF">0건</td>
                            <td id="expectEngnSum" style="text-align: right; background-color: #FFFFFF">0백만원</td>

                            <td style="text-align: center; background-color: #FFFFFF">예상</td>
                            <td id="expectVCount" style="text-align: right; background-color: #FFFFFF">0건</td>
                            <td id="expectVSum" style="text-align: right; background-color: #FFFFFF">0백만원</td>

                            <td style="text-align: right; background-color: #EFF6E7"><b id="expectCount">0건</b></td>
                            <td style="text-align: right; background-color: #EFF6E7"><b id="expectSum">0백만원</b></td>
                        </tr>
                        <tr>
                            <td style="text-align: center; background-color: #FFFFFF">진행</td>
                            <td id="progressRndCount" style="text-align: right; background-color: #FFFFFF">0건</td>
                            <td id="progressRndSum" style="text-align: right; background-color: #FFFFFF">0백만원</td>

                            <td style="text-align: center; background-color: #FFFFFF">진행</td>
                            <td id="progressUrndCount" style="text-align: right; background-color: #FFFFFF">0건</td>
                            <td id="progressUrndSum" style="text-align: right; background-color: #FFFFFF">0백만원</td>

                            <td style="text-align: center; background-color: #FFFFFF">진행</td>
                            <td id="progressEngnCount" style="text-align: right; background-color: #FFFFFF">0건</td>
                            <td id="progressEngnSum" style="text-align: right; background-color: #FFFFFF">0백만원</td>

                            <td style="text-align: center; background-color: #FFFFFF">진행</td>
                            <td id="progressVCount" style="text-align: right; background-color: #FFFFFF">0건</td>
                            <td id="progressVSum" style="text-align: right; background-color: #FFFFFF">0백만원</td>

                            <td style="text-align: right; background-color: #EFF6E7"><b id="progressCount">0건</b></td>
                            <td style="text-align: right; background-color: #EFF6E7"><b id="progressSum">0백만원</b></td>
                        </tr>
                        <tr>
                            <td style="text-align: center; background-color: #FFFFFF">완료</td>
                            <td id="completeRndCount" style="text-align: right; background-color: #FFFFFF">0건</td>
                            <td id="completeRndSum" style="text-align: right; background-color: #FFFFFF">0백만원</td>

                            <td style="text-align: center; background-color: #FFFFFF">완료</td>
                            <td id="completeUrndCount" style="text-align: right; background-color: #FFFFFF">0건</td>
                            <td id="completeUrndSum" style="text-align: right; background-color: #FFFFFF">0백만원</td>

                            <td style="text-align: center; background-color: #FFFFFF">완료</td>
                            <td id="completeEngnCount" style="text-align: right; background-color: #FFFFFF">0건</td>
                            <td id="completeEngnSum" style="text-align: right; background-color: #FFFFFF">0백만원</td>

                            <td style="text-align: center; background-color: #FFFFFF">완료</td>
                            <td id="completeVCount" style="text-align: right; background-color: #FFFFFF">0건</td>
                            <td id="completeVSum" style="text-align: right; background-color: #FFFFFF">0백만원</td>

                            <td style="text-align: right; background-color: #EFF6E7"><b id="completeCount">0건</b></td>
                            <td style="text-align: right; background-color: #EFF6E7"><b id="completeSum">0백만원</b></td>
                        </tr>
                        <tr style="background-color: #f5f5f5;">
                            <td style="text-align: center;"><b>합계</b></td>
                            <td style="text-align: right;"><b id="rndCount">0건</b></td>
                            <td style="text-align: right;"><b id="rndSum">0백만원</b></td>

                            <td style="text-align: center;"><b>합계</b></td>
                            <td style="text-align: right;"><b id="unRndCount">0건</b></td>
                            <td style="text-align: right;"><b id="unRndSum">0백만원</b></td>

                            <td style="text-align: center;"><b>합계</b></td>
                            <td style="text-align: right;"><b id="engnCount">0건</b></td>
                            <td style="text-align: right;"><b id="engnSum">0백만원</b></td>

                            <td style="text-align: center;"><b>합계</b></td>
                            <td style="text-align: right; "><b id="vCount">0건</b></td>
                            <td style="text-align: right;"><b id="vSum">0백만원</b></td>

                            <td style="text-align: right;"><b id="totCount">0건</b></td>
                            <td style="text-align: right;"><b id="totSum">0백만원</b></td>
                        </tr>
                        </thead>
                    </table>
                </div>

                <div style="float: right; margin-bottom: 15px;" id="tooltip">
                    <span href="#" title="10만원 단위는 내림" id="projectTooltip"></span>
                </div>

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
                            <input type="text" id="searchText" onkeypress="if(event.keyCode==13){ camPrj.gridReload(); }" style="width: 200px;">
                        </td>
                    </tr>
                </table>

                <div id="mainGrid" style="margin:20px 0;"></div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script>

    camPrj.fn_defaultScript();

    $(document).ready(function(){
        var tooltip = $("#tooltip").kendoTooltip({
            filter: "span",
            width: 135,
            position: "top",
            animation: {
                open: {
                    effects: "zoom",
                    duration: 150
                }
            }
        }).data("kendoTooltip");

        // tooltip.show($("#projectTooltip"));
    });

    function fn_deptSelect() {
        window.open("/common/deptMultiPop.do","조직도","width=343,height=650");
    }



</script>
<script type="text/x-kendo-template" id="template">
    <div class='subGrid'></div>
</script>
