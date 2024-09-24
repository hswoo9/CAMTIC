<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_purc/purchase.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_purc/purcProductList.js?v=${today}'/>"></script>
<style>
    a:hover {
        color: blue;
        text-decoration: underline !important;
        cursor: pointer;
    }
</style>
<input type="hidden" id="myDeptSeq" name="myDeptSeq" value="${loginVO.orgnztId}">
<input type="hidden" id="myEmpSeq" name="myEmpSeq" value="${loginVO.uniqId}">

<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">구매품목조회</h4>
            <div class="title-road">캠매니저 > 구매관리 &gt; 구매품목조회</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div>
                <table class="searchTable table table-bordered mb-0">
                    <colgroup>
                        <col width="10%">
                        <col width="25%">
                        <col width="25%">
                        <col width="10%">
                        <col width="5%">
                        <col width="20%">
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">품목코드</th>
                        <td colspan="2">
                            <input type="text" id="purcItemType0" class="purcItemType" style="width: 180px">
                            <input type="text" id="productA0" class="productA" style="width: 180px">
<%--                            <input type="text" id="productB0" class="productB" style="width: 180px;">--%>
<%--                            <input type="text" id="productC0" class="productC" style="width: 180px;">--%>
                        </td>
                        <th class="text-center th-color">검색어</th>
                        <td colspan="2">
                            <input type="text" id="searchKeyword" style="width: 30%;"/>
                            <input type="text" id="searchValue" style="width: 60%;" onkeypress="if(window.event.keyCode==13){prdList.gridReload()}"/>
                        </td>
                    </tr>
                </table>

                <div id="mainGrid" style="margin:20px 0;"></div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script>

    prdList.fn_defaultScript();

</script>
