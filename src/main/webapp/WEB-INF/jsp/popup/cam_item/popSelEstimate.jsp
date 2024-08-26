<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<script type="text/javascript" src="<c:url value='/js/ckEditor/ckeditor.js'/>"></script>
<script type="text/javascript" src="/js/intra/cam_item/popup/popSelEstimate.js?v=${today}"/></script>
<style>
    .searchTable > thead > tr > th {
        background-color: #00397f96;
        color: white;
        text-align: center;
    }

    .table td, .table th {
        padding: 0.5rem;
        vertical-align: middle;
        border-top: 1px solid #dee2e6;
    }

    .subTitSt {
        font-weight: 600;
        text-align: left;
        font-size: 13px;
        padding: 10px;
    }
</style>
<body class="font-opensans" style="background-color:#fff;">
<div style="padding:0;">
    <div class="table-responsive">
        <input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
        <input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
        <input type="hidden" id="crmSn" name="crmSn" value="${params.crmSn}">
        <input type="hidden" id="obtainOrderSn" name="crmSn" value="${params.obtainOrderSn}">

        <div class="card-header pop-header">
            <h3 class="card-title title_NM">
                <span style="position: relative; top: 3px;" id="popTitle">견적서 인쇄</span>
            </h3>

            <div class="btn-st popButton">
                <button type="button" id="sendBtn" class="k-button k-button-solid-base" onclick="popSelEstimate.fn_sendMailPop()">메일 전송</button>
                <button type="button" id="printBtn" class="k-button k-button-solid-base" onclick="popSelEstimate.estPrintPop()">인쇄</button>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">닫기</button>
            </div>
        </div>

        <div>
            <table class="searchTable table table-bordered mb-0 mt-10">
                <colgroup>
                    <col width="5%">
                    <col width="22%">
                    <col width="7%">
                    <col>
                </colgroup>
                <tr>
                    <th>수주일</th>
                    <td>
                        <input type="text" id="startDt" style="width: 110px;"> ~
                        <input type="text" id="endDt" style="width: 110px;">
                    </td>
                    <th>검색어</th>
                    <td>
                        <input type="text" id="searchKeyword" style="width: 15%;"/>
                        <input type="text" id="searchValue" style="width: 30%;" onkeypress="if(window.event.keyCode==13){popSelEstimate.gridReload()}"/>
                    </td>
                </tr>
            </table>

            <div id="popMainGrid" style="margin:20px 0;"></div>
        </div>
        <div>
            <div style="display:flex; justify-content: space-between;">
                <div class="subTitSt">· 견적사항</div>
            </div>
            <textarea id="rmk" name="rmk" style="width: 100%;">
                견적조건 : <br>
                결제조건 : <br>
                납기일자 : <br>
                하자보증기간 : <br>
                공급제외 품목 : <br>
                견적유효일자 : <br>
                견적담당자 연락사항 :
            </textarea>
        </div>

    </div>
</div>
<script type="text/javascript">
    popSelEstimate.fn_defaultScript();
</script>
</body>
</html>