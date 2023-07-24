<%--
  Created by IntelliJ IDEA.
  User: jsy
  Date: 2023-06-08
  Time: 오후 16:01
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="/js/intra/campus/campus.js?v=${today}"/></script>
<script type="text/javascript" src="/js/intra/campus/systemManagement.js?v=${today}"/></script>

<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>

<div class="col-md-12 col-lg-12 dash-left">
    <div class="panel">
        <div class="panel-heading">
            <h4 class="panel-title">학습체계도 관리</h4>
            <div class="title-road">목표기술서관리 &gt; 학습체계도관리</div>
        </div>

        <div class="panel-body">
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
            <div>
                <table class="searchTable table table-bordered" style="border: 0; margin-top : 5px; border: 1px solid #dedfdf;">
                    <tr>
                        <td colspan="4">
                            <input type="text" id="detailSearch" style="width: 100%;">
                        </td>
                    </tr>
                </table>
                <div style="margin:20px 0;">
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <colgroup>
                                <col width="20%" >
                                <col width="20%" >
                                <col width="20%" >
                                <col width="20%" >
                                <col width="20%" >
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>구분</th>
                                    <th>LEVEL 0</th>
                                    <th>LEVEL 1</th>
                                    <th>LEVEL 2</th>
                                    <th>LEVEL 3</th>
                                </tr>
                            </thead>
                            <tbody id="tableData">
                            </tbody>
                        </table>
                    </div><!-- table-responsive -->
                </div>
            </div>
        </div>

    </div>
</div><!-- col-md-9 -->

<script type="text/javascript">
    systemManagement.init();
</script>