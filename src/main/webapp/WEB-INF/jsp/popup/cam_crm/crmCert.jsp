<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<jsp:useBean id="today" class="java.util.Date" />

<script type="text/javascript" src="<c:url value='/js/intra/cam_crm/crmCert.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js?${today}'/>"></script>


<%
    String crmSn = request.getParameter("crmSn");
    String regEmpSeq = request.getParameter("regEmpSeq");
    if(crmSn == null){
        return ;
    }
    if(regEmpSeq == null){
        return ;
    }
%>
<input type="hidden" id="crmSn" value="<%=crmSn%>" />
<input type="hidden" id="regEmpSeq" value="<%=regEmpSeq%>" />
<input type="hidden" id="crmCertSn" value="" />

<div style="padding: 10px">
    <span style="float: right;">
    <button type="button" id="saveBtn" style="margin-bottom: 5px;" class="k-button k-button-solid-info" onclick="crmCert.fn_save()">저장</button>
        </span>
    <table class="popTable table table-bordered mb-0">
        <colgroup>
            <col width="10%">
        </colgroup>
        <thead>
        <tr>
            <th scope="row" class="text-center th-color">
                경영인증
            </th>
            <td style="line-height: 30px">
                <div>
                    <input type="checkbox" id="venture"><label for="venture">벤처기업</label>
                    <input type="text" id="ventureTxt" name="ventureTxt" style="width: 50%">
                    <span>
                        ※ 기간 등 입력
                    </span>
                </div>
                <div>
                    <input type="checkbox" id="innobiz"><label for="innobiz">이노비즈</label>
                    <input type="text" id="innobizTxt" name="innobizTxt" style="width: 50%">
                    <span>
                        ※ 기간 등 입력
                    </span>
                </div>
                <div>
                    <input type="checkbox" id="mainbiz"><label for="mainbiz">메인비즈</label>
                    <input type="text" id="mainbizTxt" name="mainbizTxt" style="width: 50%">
                    <span>
                        ※ 기간 등 입력
                    </span>
                </div>
            </td>
        </tr>
        <tr>
            <th scope="row" class="text-center th-color">
                기타 인증
            </th>
            <td>
                <textarea type="text" id="otherCert"></textarea>
            </td>
        </tr>
        </thead>
    </table>
</div>
<script>
    crmCert.fn_defaultScript();
</script>