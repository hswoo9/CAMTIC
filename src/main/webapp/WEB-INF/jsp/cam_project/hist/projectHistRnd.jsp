<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/hist/projectHistRnd.js?v=${today}'/>"></script>

<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">캠알앤디</h4>
            <div class="title-road">캠프로젝트 > 프로젝트관리 &gt; 프로젝트이력(~2023년) > 캠알앤디</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div>
                <table class="searchTable table table-bordered mb-0">
                    <colgroup>
                        <col width="10%">
                    </colgroup>
                    <tbody><tr>
                        <th class="text-center th-color">상담제목</th>
                        <td>
                            <input type="text" id="subject" style="width: 50%;" autocomplete="off" onkeypress="if(window.event.keyCode==13){histRnd.gridReload();}">
                        </td>
                    </tr>
                    </tbody>
                </table>

                <div id="mainGrid" style="margin:20px 0;"></div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script>
    histRnd.fn_defaultScript();
</script>