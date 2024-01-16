<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<script type="text/javascript" src="<c:url value='/js/intra/cam_purc/appUserPaySetting.js?v=${today}'/>"></script>

<input type="hidden" id="purcSn" name="purcSn" value="${params.purcSn}"/>
<input type="hidden" id="claimSn" name="claimSn" value="${params.claimSn}"/>

<div style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM"><span style="position: relative; top: 3px;" id="pjtTitle">지출요청</span>
            </h3>

            <div id="payAppBtnDiv" class="btn-st popButton" style="font-size: 13px;">
                <button type="button" class="k-button k-button-solid-info" id="saveBtn" onclick="appUserPaySetting.fn_regist();">지출요청</button>
                <button type="button" class="k-button k-button-solid-error" onclick="fn_close();">닫기</button>
            </div>
        </div>
        <div style="padding: 20px 30px;">
            <table id="setTable" class="popTable table table-bordered mb-0">
                <colgroup>
                    <col width="15%">
                    <col width="35%">
                    <col width="15%">
                    <col width="35%">
                </colgroup>
                <thead>
                <tr>
                    <th><span class="red-star">*</span>사용자설정</th>
                    <td colspan="3">
                        <input type="text" id="empName" disabled style="width: 15%;">
                        <input type="hidden" id="empSeq">
                        <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="userSearch();">
                            검색
                        </button>
                    </td>
                </tr>
                </thead>
            </table>

        </div>
        <div style="padding: 20px 30px;">
            <table id="popTable" class="popTable table table-bordered mb-0">
                <colgroup>
                    <col width="5%">
                    <col width="20%">
                    <col width="35%">
                    <col width="15%">
                    <col width="15%">
                    <col width="10%">
                </colgroup>
                <thead>
                <tr>
                    <th>연번</th>
                    <th>문서번호</th>
                    <th>업체명</th>
                    <th>대상금액</th>
                    <th>지출금액</th>
                    <th>삭제</th>
                </tr>
                </thead>
                <tbody id="payTableBody">

                </tbody>
            </table>
        </div>
    </div>
</div>
<script>
    appUserPaySetting.fn_DefaultScript();

    function fn_close() {
        window.close();
    }
</script>
</body>
</html>