<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

<script type="text/javascript" src="<c:url value='/js/intra/cam_project/commonProject.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/inside/userManage/userReqPop.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/postcode.v2.js?autoload=false'/>"></script>

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
<%
    String ipAddress=request.getRemoteAddr();
%>
<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="erpEmpCd" value="${loginVO.erpEmpCd}"/>
<input type="hidden" id="type" value="${params.type}" />

<input type="hidden" id="ip" value="<%=ipAddress%>" />
<div>
    <div class="card-header pop-header">
        <h3 class="card-title title_NM">
            <span style="position: relative; top: 3px;">
                <c:if test="${params.type == '5'}">사업소득자</c:if>
                <c:if test="${params.type == '9'}">기타소득자</c:if>
                 등록
            </span>
        </h3>
        <div id="btnDiv" class="btn-st popButton" style="font-size: 12px;">
            <button type="button" class="k-button k-button-solid-info" onclick="fn_save()">저장</button>
            <button type="button" class="k-button k-button-solid-error" onclick="window.close()">닫기</button>
        </div>
    </div>

    <div class="" style="padding: 10px">
        <div id="" style="margin-top:12px">
            <table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col width="10%">
                    <col width="35%">
                    <col width="10%">
                    <col width="35%">
                </colgroup>
                <thead>
                <tr>
                <tr>
                    <th scope="row" class="text-center th-color"><span class="red-star">*</span>소득자명</th>
                    <td>
                        <input type="text" id="empName" style="width: 90%">
                    </td>
                    <th scope="row" class="text-center th-color"><span class="red-star">*</span>주민번호</th>
                    <td>
                        <input type="text" id="regNo" style="width: 90%">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">전화번호</th>
                    <td colspan="3">
                        <input type="text" id="empTel" style="width: 90%;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        주소
                    </th>
                    <td colspan="3" style="line-height: 30px">
                        <input type="text" id="post" style="width: 20%;">
                        <input type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" value="우편번호 검색" onclick="userReqPop.addrSearch();"/>
                        <input type="text" id="addr" style="width: 90%;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color"><span class="red-star">*</span>거래은행</th>
                    <td colspan="3">
                        <input type="text" id="jiroCd" style="width: 40%;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color"><span class="red-star">*</span>계좌번호</th>
                    <td>
                        <input type="text" id="baNb" style="width: 90%;">
                    </td>
                    <th scope="row" class="text-center th-color"><span class="red-star">*</span>예금주</th>
                    <td>
                        <input type="text" id="depositor" style="width: 90%;">
                    </td>
                </tr>
                </thead>
            </table>
        </div>

    </div>
</div>

<script>

    $(function(){

        customKendo.fn_textBox(["empName", "regNo", "empTel", "post", "addr", "baNb", "depositor"]);

        var result = customKendo.fn_customAjax("/g20/getSbankList");
        var ds = result.list;
        customKendo.fn_dropDownList("jiroCd", ds, "BANK_NM", "BANK_CD", 2);
    });

    function fn_save (){
        var data = {
            erpEmpCd : $("#erpEmpCd").val(),
            empName : $("#empName").val(),
            regNo : $("#regNo").val().replace(/-/g, ""),
            empTel : $("#empTel").val(),
            post : $("#post").val(),
            addr : $("#addr").val(),
            jiroCd : $("#jiroCd").val(),
            baNb : $("#baNb").val(),
            depositor : $("#depositor").val(),
            type : $("#type").val(),
        };

        if(data.empName == ""){
            alert("소득자명을 입력하세요.");
            return;
        }

        if(data.regNo == ""){
            alert("주민번호를 입력해주세요.");
            return;
        }

        if(data.jiroCd == ""){
            alert("거래은행을 선택해주세요.");
            return;
        }

        if(data.baNb == ""){
            alert("계좌번호를 입력해주세요.");
            return;
        }

        let flag = true;
        const duplCk = customKendo.fn_customAjax("/g20/getOtherDupl", data).list;
        if(duplCk.length > 0){
            flag = false;
        }
        if(!flag){
            alert("동일 주민번호가 있습니다. 재무회계팀에 문의해주세요."); return;
        }

        $.ajax({
            url : "/g20/insEtcEmpInfo",
            data : data,
            type : "post",
            dataType : "json",
            success : function(rs){
                if(rs.code == 200){
                    alert("등록되었습니다.");

                    opener.parent.payDetView.fn_search(opener.parent.$("#type").val());
                    window.close();
                }
            }
        });
    }

</script>
