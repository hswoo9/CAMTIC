<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />

<script type="text/javascript" src="/js/intra/cam_item/system/baseCode/itemCode.js?v=${today}"/></script>

<style>
    .k-grid-toolbar{
        justify-content: flex-end !important;
    }
    .k-grid-norecords{
        justify-content: space-around;
    }
</style>

<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="deptSeq" value="${loginVO.orgnztId}"/>
<input type="hidden" id="deptName" value="${loginVO.orgnztNm}"/>

<body class="font-opensans">

<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">아이템 코드관리</h4>
            <div class="title-road" style="text-align: right; margin-bottom: 5px;">캠아이템 &gt; 시스템관리 > 시스템 > 아이템 코드관리</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>

        <div class="panel-body">
            <div style="margin-bottom:10px;">
                <table class="searchTable table table-bordered mb-0">
                    <colgroup>
                        <col width="10%">
                        <col width="40%">
                        <col width="10%">
                        <col width="40%">
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">그룹코드</th>
                        <td>
                            <input type="text" id="cmGroupCode" style="width:200px;">
                        </td>
                        <th class="text-center th-color">그룹코드명</th>
                        <td>
                            <input type="text" id="cmGroupCodeNm" onkeypress="if(window.event.keyCode==13){codeI.gridReload('mainGrid')}" style="width: 200px;">
                        </td>
                    </tr>
                </table>
            </div>

            <div id="mainGrid">

            </div>
            <div class="card-header">
                <h4 class="card-title" style="font-size:15px;">상세 내역</h4>
            </div>
            <input type="hidden" id="cmGroupCodeId" name="cmGroupCodeId">
            <div id="mainGrid2">

            </div>
        </div>
    </div>
</div>

<!-- 그룹코드 모달 -->
<jsp:include page="/WEB-INF/jsp/cam_item/system/baseCode/modal/itemCodeRegModal.jsp" flush="true"></jsp:include>
<!-- 코드 모달 -->
<jsp:include page="/WEB-INF/jsp/cam_item/system/baseCode/modal/itemLgCodeRegModal.jsp" flush="true"></jsp:include>

<script>
    codeI.fn_defaultScript();
</script>
</body>
</html>