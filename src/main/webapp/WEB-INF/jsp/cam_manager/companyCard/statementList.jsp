<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<%--<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js?${today}'/>"></script>--%>
<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/camMng.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/companyCard/statementList.js?v=${today}'/>"></script>


<style>
    .k-footer-template td:nth-child(1),
    .k-footer-template td:nth-child(2),
    .k-footer-template td:nth-child(3),
    .k-footer-template td:nth-child(4),
    .k-footer-template td:nth-child(5),
    .k-footer-template td:nth-child(6){
        border-width: 0;
    }
</style>
<input type="hidden" id="myDeptSeq" name="myDeptSeq" value="${loginVO.orgnztId}">
<input type="hidden" id="myEmpSeq" name="myEmpSeq" value="${loginVO.uniqId}">
<input type="hidden" id="cardToSn" name="cardToSn" value="">
<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">반출/사용</h4>
            <div class="title-road">캠매니저 > 법인카드 관리 &gt; 반출/사용</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div>
                <table class="searchTable table table-bordered mb-0">
                    <colgroup>
                        <col width="10%">
                        <col width="20%">
                        <col width="10%">
                        <col width="20%">
                        <col width="10%">
                        <col width="30%">
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">반출일자</th>
                        <td>
                            <input type="text" id="startDt" class="searchInput" style="width: 40%;" onchange="dateValidationCheck('startDt', this.value)">
                            ~
                            <input type="text" id="endDt" class="searchInput" style="width: 40%;" onchange="dateValidationCheck('endDt', this.value)">
                        </td>
                        <th class="text-center th-color">사용내역등록여부</th>
                        <td>
                            <input type="text" id="regHistYn" style="width: 160px;" onchange="statementList.mainGrid();"/>
                        </td>
                        <th class="text-center th-color">검색어</th>
                        <td>
                            <input type="text" id="searchKeyword" style="width: 120px;">
                            <input type="text" id="searchValue" style="width: 240px;" onkeypress="if(window.event.keyCode==13){statementList.mainGrid();}"/>
                            <br>* 카드번호는 끝4자리 검색
                        </td>
                    </tr>
                </table>
            </div>

            <div>
                <div id="mainGrid" style="margin:20px 0;"></div>

                <div id="mainHistGrid" style="margin:20px 0;"></div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<div id="returnDialog">
    <input type="text" id="cardFromDe" style="width: 50%" name="cardFromDe" value="">
    <input type="text" name="cardFromTime" id="cardFromTime" style="width: 30%;">
    <input type="hidden" id="tmpCardBaNb" />
    <input type="hidden" id="cardToSnModal" />
    <input type="hidden" id="tmpCardToDe" />
    <button type="button" id="updBtn" class="k-button k-button-solid-base" onclick="statementList.fn_updFromDe();">반납</button>
</div>
<script>

    $(function(){
        $("#returnDialog").kendoWindow({
            title: "반납",
            visible : false,
            resizable: false,
            modal: true,
            width: 500,
            actions: ["Close"],
            open : function () {
                var htmlStr = '<div class="card-header" style="margin-left:8px;">' +
                    '<input type="text" id="cardFromDe" style="width: 50%" name="cardFromDe" value="">' +
                    '    <input type="text" name="cardFromTime" id="cardFromTime" style="width: 30%;">' +
                    '    <input type="hidden" id="tmpCardBaNb" />' +
                    '    <input type="hidden" id="cardToSnModal" />' +
                    '    <input type="hidden" id="tmpCardToDe" />' +
                    '    <button type="button" id="updBtn" class="k-button k-button-solid-base" onclick="statementList.fn_updFromDe();">반납</button>';

                $('#returnDialog').html(htmlStr);


                customKendo.fn_datePicker("cardFromDe", "depth", "yyyy-MM-dd", new Date());

                $("#cardFromTime").kendoTimePicker({
                    format: "HH:mm",
                    interval : 10,
                    value : "18:00"
                });

            },
        });
    });

    statementList.fn_defaultScript();

    function dateValidationCheck(id, val){
        var sDt = new Date($("#startDt").val());
        var nDt = new Date($("#endDt").val());

        if(id == "startDt"){
            if(sDt > nDt){
                $("#endDt").val(val);
            }
        }else{
            if(sDt > nDt){
                $("#startDt").val(val);
            }
        }
    }
</script>
