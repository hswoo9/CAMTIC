<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="<c:url value='/js/intra/cam_crm/crmSubInfo.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js?${today}'/>"></script>

<%
    String crmSn = request.getParameter("crmSn");

    if(crmSn == null){
        return ;
    }

%>
<input type="hidden" id="crmSn" value="<%=crmSn%>" />

<div style="padding: 10px">
    <table class="popTable table table-bordered mb-0">
        <colgroup>
            <col width="20%">
            <col width="30%">
            <col width="20%">
            <col width="30%">
        </colgroup>
        <thead>
        <%--<tr>
            <th colspan="4" style="font-size: 14px; font-weight:600;background-color: #00397f96; color: #fff;">도서 등록</th>
        </tr>--%>
        <tr>
            <th scope="row" class="text-center th-color">
                <span class="red-star">*</span>고객 유치경로
            </th>
            <td>
                <input type="text" id="crmAtt" style="width: 90%;">
            </td>
            <th scope="row" class="text-center th-color">
                <span class="red-star">*</span>고객분류
            </th>
            <td>
                <input type="text" id="crmClass" style="width: 90%;">
            </td>
        </tr>
        </thead>
    </table>
</div>

<script>
    crmSI.fn_defaultScript();
</script>