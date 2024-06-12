<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/camMng.js?v=${today}'/>"></script>

<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/etax/etaxList.js?v=${today}'/>"></script>
<style>
    #my-spinner { width: 100%; height: 100%; top: 0; left: 0; display: none; opacity: .6; background: silver; position: absolute; z-index: 2; }
    #my-spinner div { width: 100%; height: 100%; display: table; }
    #my-spinner span { display: table-cell; text-align: center; vertical-align: middle; }
    #my-spinner img { background: white; padding: 1em; border-radius: .7em; }

    .k-grid-content td {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

</style>
<input type="hidden" id="myDeptSeq" name="myDeptSeq" value="${loginVO.orgnztId}">
<input type="hidden" id="myEmpSeq" name="myEmpSeq" value="${loginVO.uniqId}">

<div id='my-spinner'>
    <div>
    <span>
    	<img src='//cdnjs.cloudflare.com/ajax/libs/galleriffic/2.0.1/css/loader.gif'>
    </span>
    </div>
</div>

<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">세금계산서 내역</h4>
            <div class="title-road">캠매니저 > 세금계산서 관리 &gt; 세금계산서내역</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div>
                <table class="searchTable table table-bordered mb-0">
                    <colgroup>
                        <col width="7%">
                        <col width="7%">
                        <col width="18%">
                        <col width="7%">
                        <col width="10%">
                        <col width="7%">
                        <col width="10%">
                        <col width="7%">
                        <col width="10%">
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">기간</th>
                        <td>
                            <input type="text" id="dtGubun" style="width: 100%;">
                        </td>
                        <td>
                            <input type="text" id="strDt" style="width: 120px;"> ~
                            <input type="text" id="endDt" style="width: 120px;">
                        </td>
                        <th class="text-center th-color">구분</th>
                        <td>
                            <input type="text" id="taxGubun" style="width: 150px;">
                        </td>
                        <th class="text-center th-color">거래처명</th>
                        <td><input type="text" id="crmNm" style="width: 150px;"></td>
                        <th class="text-center th-color">사업자번호</th>
                        <td><input type="text" id="crmNo" style="width: 150px;"></td>
                    </tr>
                </table>

                <div id="mainGrid" style="margin:20px 0;"></div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script>

    etaxList.fn_defaultScript();
</script>
