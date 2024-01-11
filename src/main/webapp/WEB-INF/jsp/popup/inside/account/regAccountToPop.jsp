<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

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
<input type="hidden" id="accountToSn" value="${params.accountToSn}"/>
<div>
    <div class="card-header pop-header">
        <h3 class="card-title title_NM">
                <span style="position: relative; top: 3px;" id="accountToTitle">
                    법인계좌
                </span>
        </h3>
        <div id="purcBtnDiv" class="btn-st popButton" style="font-size: 12px;">
            <button type="button" class="k-button k-button-solid-info" id="saveBtn" onclick="fn_submit()">등록</button>
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
                    <span class="red-star">*</span>은행명
                </th>
                <td>
                    <input type="text" id="bankName" value="" />
                </td>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>지급계좌
                </th>
                <td>
                    <input type="text" id="payAccount" value="" />
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>예금주
                </th>
                <td>
                    <input type="text" id="depositor" value="" />
                </td>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>계좌별칭
                </th>
                <td>
                    <input type="text" id="accountName" value="" />
                </td>
            </tr>
            </thead>
        </table>
    </div>
</div>

<script>
    $(function(){
        customKendo.fn_textBox(["bankName", "payAccount", "depositor", "accountName"]);

        var data = {
            accountToSn : $("#accountToSn").val()
        }
        
        if($("#accountToSn").val() != ""){
            $.ajax({
                url : "/account/getAccountToInfo",
                data : data,
                dataType : "json",
                success : function(rs){
                    var rs = rs.accountInfo;

                    $("#bankName").val(rs.BANK_NAME);
                    $("#payAccount").val(rs.PAY_ACCOUNT);
                    $("#depositor").val(rs.DEPOSITOR);
                    $("#accountName").val(rs.ACCOUNT_NAME);

                    $("#accountToTitle").text("법인계좌 수정");
                }
            });
        }
    });

    function fn_submit(){
        if($("#accountToSn").val() != ""){
            fn_update();
        }else{
            fn_save();
        }
    }

    function fn_save(){
        if(!confirm("저장하시겠습니까?")){
            return;
        }

        var parameters = {
            bankName : $("#bankName").val(),
            payAccount: $("#payAccount").val(),
            depositor: $("#depositor").val(),
            accountName: $("#accountName").val(),
            regEmpSeq : $("#regEmpSeq").val()
        }

        if(parameters.bankName == ""){
            alert("은행명을 입력해주세요.");
            return;
        }
        if(parameters.payAccount == ""){
            alert("지급계좌를 입력해주세요.");
            return;
        }
        if(parameters.depositor == ""){
            alert("예금주를 입력해주세요.");
            return;
        }
        if(parameters.accountName == ""){
            alert("계좌별칭을 입력해주세요.");
            return;
        }


        $.ajax({
            url : "/account/saveRegAccountTo",
            type : "POST",
            data : parameters,
            dataType : "json",
            success : function(rs){
                if(rs.code == 200){
                    alert("저장되었습니다.");
                    opener.parent.srm.accountGridReload();
                    window.close();
                }
            }
        });
    }

    function fn_update(){
        if(!confirm("수정하시겠습니까?")){
            return;
        }


        var parameters = {
            accountToSn: $("#accountToSn").val(),
            bankName : $("#bankName").val(),
            payAccount: $("#payAccount").val(),
            depositor: $("#depositor").val(),
            accountName: $("#accountName").val(),
            regEmpSeq : $("#regEmpSeq").val()
        }

        if(parameters.bankName == ""){
            alert("은행명을 입력해주세요.");
            return;
        }
        if(parameters.payAccount == ""){
            alert("지급계좌를 입력해주세요.");
            return;
        }
        if(parameters.depositor == ""){
            alert("예금주를 입력해주세요.");
            return;
        }
        if(parameters.accountName == ""){
            alert("계좌별칭을 입력해주세요.");
            return;
        }

        $.ajax({
            url : "/account/updRegAccountTo",
            type : "POST",
            data : parameters,
            dataType : "json",
            success : function(rs){
                if(rs.code == 200){
                    alert("수정되었습니다.");
                    opener.parent.srm.accountGridReload();
                    window.close();
                }
            }
        })
    }
</script>