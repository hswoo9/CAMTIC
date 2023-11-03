<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />

<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/unRnd/personList.js?v=${today}'/>"></script>
<style>

</style>
<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">개인회원 관리</h4>
            <div class="title-road">캠프로젝트 > 단위사업 &gt; 개인회원관리</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div>
                <table class="searchTable table table-bordered mb-0">
                    <colgroup>
                        <col width="10%">
                        <col width="25%">
                        <col width="10%">
                        <col width="20%">
                        <col width="10%">
                        <col width="25%">
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">검색</th>
                        <td colspan="4">
                            <input type="text" id="searchValue" style="width: 150px;">
                            <input type="text" id="searchText"onkeypress="if(event.keyCode==13){ camPrj.gridReload(); }" style="width: 200px;">
                        </td>
                    </tr>
                </table>

                <div id="personGrid" style="margin:20px 0;"></div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script>
    personList.fn_defaultScript();
</script>
