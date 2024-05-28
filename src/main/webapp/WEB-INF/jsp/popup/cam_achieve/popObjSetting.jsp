<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

<body class="font-opensans" style="background-color:#fff;">
<script type="text/javascript" src="/js/intra/cam_achieve/popObjSetting.js?v=${today}"/></script>
<div style="padding:0;">
    <div class="table-responsive">
        <input type="hidden" id="regEmpSeq" name="regEmpSeq" value="${loginVO.uniqId}">
        <input type="hidden" id="year" value="${params.year}">
        <input type="hidden" id="type" value="${params.type}">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM"><span style="position: relative; top: 3px;" id="popTitle">목표설정</span></h3>
            <div class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-info" onclick="popObjSet.saveBtn()">저장</button>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">취소</button>
            </div>
        </div>
        <div>
            <div style="padding: 10px 15px;">

                <div style="float: right; margin-top: 5px;">
                    <span>(단위 : 백만원)</span>
                </div>
                <table class="popTable table table-bordered mb-0">
                    <colgroup>
                        <col width="25%">
                        <col width="25%">
                        <col width="25%">
                        <col width="25%">
                    </colgroup>
                    <tr style="color : black ; background-color: #f0f6ff;">
                        <td style="text-align: center;"><b>구분</b></td>
                        <td style="text-align: center;"><b>수주</b></td>
                        <td style="text-align: center;"><b>매출</b></td>
                        <td style="text-align: center;"><b>운영수익</b></td>
                    </tr>
                    <c:forEach var="l" items="${list}" varStatus="status">
                        <tr style="background-color: white" class="objTr">
                            <input type="hidden" class="deptSeq" value="${l.dept_seq}">
                            <td style="text-align: center; font-weight: bold">${l.dept_name}</td>
                            <td><input type="text" id="delvObj_${l.dept_seq}" name="delvObj" style="text-align: right;" value="${l.DELV_OBJ}" onkeyup="fn_inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"></td>
                            <td><input type="text" id="saleObj_${l.dept_seq}" name="saleObj" style="text-align: right;" value="${l.SALE_OBJ}" onkeyup="fn_inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"></td>
                            <td><input type="text" id="incpObj_${l.dept_seq}" name="incpObj" style="text-align: right;" value="${l.INCP_OBJ}" onkeyup="fn_inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"></td>
                        </tr>
                    </c:forEach>
                </table>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript">
    popObjSet.fn_defaultScript();
</script>
</body>
</html>