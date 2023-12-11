<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

<script type="text/javascript" src="<c:url value='/js/intra/cam_project/commonProject.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/g20Callback.js?v=${today}'/>"></script>

<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js?v=${today}'/>"></script>


<style>
    .k-footer-template td:nth-child(4) {
        overflow: visible;
        white-space: nowrap;
        text-align: right;
    }

    .k-footer-template td:nth-child(1),
    .k-footer-template td:nth-child(2),
    .k-footer-template td:nth-child(3),
    .k-footer-template td:nth-child(4) {
        border-width: 0;
    }
</style>


<input type="hidden" id="regEmpSeq" value="${loginVO.uniqId}"/>

<div>
    <div class="card-header pop-header">
        <h3 class="card-title title_NM">
                <span style="position: relative; top: 3px;">
                    반출/사용 등록
                </span>
        </h3>
        <div id="purcBtnDiv" class="btn-st popButton" style="font-size: 12px;">
            <button type="button" class="k-button k-button-solid-info" onclick="fn_save()">등록</button>
            <button type="button" class="k-button k-button-solid-error" onclick="window.close()">닫기</button>
        </div>
    </div>

    <div class="" style="padding: 10px">
        <table class="popTable table table-bordered mb-0">
            <colgroup>
                <col width="20%">
                <col width="30%">
                <col width="20%">
                <col width="30%">
            </colgroup>
            <thead>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>카드
                </th>
                <td colspan="3">
                    <input type="hidden" id="trCd" style="">
                    <input type="text" id="trNm" disabled style="width: 30%">
                    <button type="button" class="k-button k-button-solid-base" onclick="fn_popRegDet(3, 0)">검색</button>
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>사용일자
                </th>
                <td>
                    <input type="text" id="cardToDe" value="">
                </td>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>신청자
                </th>
                <td>
                    <input type="hidden" id="empSeq" />
                    <input type="text" id="empName" value="" disabled style="width: 70%;" >
                    <button type="button" class="k-button k-button-solid-base" onclick="userSearch()">검색</button>
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>은행명
                </th>
                <td>
                    <input type="text" id="jiroNm" value="" disabled style="width: 170px;">
                </td>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>계좌번호
                </th>
                <td>
                    <input type="text" id="baNb" value="" disabled style="width: 170px;">
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>소유자
                </th>
                <td>
                    <input type="text" id="depositor" disabled style="width: 100%;" >
                </td>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>카드번호
                </th>
                <td>
                    <input type="text" id="cardBaNb" disabled style="width: 100%;">
                </td>
            </tr>
            </thead>
        </table>
    </div>
</div>

<script>
    $(function(){
        customKendo.fn_textBox(["trNm", "jiroNm", "baNb", "depositor", "cardBaNb", "empName"]);
        customKendo.fn_datePicker("cardToDe", "depth", "yyyy-MM-dd", new Date());

    });

    function userSearch() {
        window.open("/common/deptListPop.do", "조직도", "width=750, height=650");
    }

    function fn_popRegDet(v, i){
        var url = "/mng/pop/paymentDetView.do?type=" + v + "&index=" + i;

        var name = "_blank";
        var option = "width = 1100, height = 650, top = 100, left = 400, location = no";
        var popup = window.open(url, name, option);
    }

    function fn_save(){
        if(!confirm("저장하시겠습니까?")){
            return;
        }


        var parameters = {
            trCd : $("#trCd").val(),
            trNm: $("#trNm").val(),
            cardToDe: $("#cardToDe").val(),
            empSeq: $("#empSeq").val(),
            empName: $("#empName").val(),
            jiroNm: $("#jiroNm").val(),
            baNb: $("#baNb").val(),
            depositor: $("#depositor").val(),
            cardBaNb: $("#cardBaNb").val(),
            regEmpSeq : $("#regEmpSeq").val()
        }

        $.ajax({
            url : "/card/saveRegCardTo",
            type : "POST",
            data : parameters,
            dataType : "json",
            success : function(rs){
                if(rs.code == 200){
                    alert("저장되었습니다.");
                    opener.parents.statementList.mainGrid();
                    window.close();
                }
            }
        })
    }
</script>