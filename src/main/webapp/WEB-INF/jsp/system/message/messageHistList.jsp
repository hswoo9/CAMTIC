<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="/js/intra/system/message/messageHistList.js?v=${today}"/></script>
<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">문자이력</h4>
            <div class="title-road">시스템관리 > 문자 &gt; 문자이력</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div>
                <table class="searchTable table table-bordered mb-0">
                    <colgroup>
                        <col width="7%">
                        <col width="20%">
                        <col width="7%">
                        <col width="8%">
                        <col width="7%">
                        <col width="34%">
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">기간</th>
                        <td>
                            <input type="text" id="strDe" style="width: 45%;"> ~ <input type="text" id="endDe" style="width: 45%;">
                        </td>
                        <th class="text-center th-color">문서유형</th>
                        <td>
                            <input type="text" id="searchType" style="width: 150px;">
                        </td>
                        <th class="text-center th-color">검색어</th>
                        <td>
                            <input type="text" id="searchKeyword" style="width: 35%;"/>
                            <input type="text" id="searchValue" style="width: 60%;" onkeypress="if(window.event.keyCode==13){messageHistList.gridReload()}"/>
                        </td>
                    </tr>
                </table>

                <div id="messageHistGrid" style="margin:20px 0;"></div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->
<script>
    messageHistList.fn_defaultScript();
</script>
