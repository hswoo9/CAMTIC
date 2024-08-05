<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/camMng.js?v=${today}'/>"></script>

<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/companyCard/outUseList.js?v=${today}'/>"></script>
<style>

</style>
<input type="hidden" id="myDeptSeq" name="myDeptSeq" value="${loginVO.orgnztId}">
<input type="hidden" id="myEmpSeq" name="myEmpSeq" value="${loginVO.uniqId}">

<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">전표내역</h4>
            <div class="title-road">캠매니저 > 법인카드 관리 &gt; 전표내역</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div>
                <table class="searchTable table table-bordered mb-0">
                    <colgroup>
                        <col width="10%">
                        <col width="15%">
                        <col width="10%">
                        <col width="15%">
                        <col width="10%">
                        <col width="15%">
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">결제일자</th>
                        <td>
                            <input type="text" id="aStrDe" style="width: 40%;"/> ~
                            <input type="text" id="aEndDe" style="width: 40%;"/>
                        </td>
                        <th class="text-center th-color">사용내역등록여부</th>
                        <td>
                            <input type="text" id="regHistYn" style="width: 160px;" onchange="outUseList.gridReload();"/>
                        </td>
                        <th class="text-center th-color">검색어</th>
                        <td>
                            <input type="text" id="searchValue" style="width: 240px;" onkeypress="if(window.event.keyCode==13){outUseList.gridReload();}"/>
                            <br>* 명칭, 카드번호(ex. 끝4자리), 거래처 검색가능
                        </td>
                    </tr>
                </table>
            </div>
            <div>

                <div id="mainGrid" style="margin:20px 0;"></div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script>

    outUseList.fn_defaultScript();
</script>
