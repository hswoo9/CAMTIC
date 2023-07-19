<%--
  Created by IntelliJ IDEA.
  User: user
  Date: 2023-01-10
  Time: 오후 5:11
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<link rel="stylesheet" href="/css/intra/user/org.css?${toDate}">
<link rel="stylesheet" href="/css/intra/kTreeView.css?${toDate}">
<script type="text/javascript" src="/js/intra/user/user.js?${toDate}"></script>
<script type="text/javascript" src="<c:url value='/js/intra/inside/userManage/organizationChart.js?${toDate}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/inside/userManage/userPersonList.js?${toDate}'/>"></script>

<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="deptSeq" value="${loginVO.orgnztId}"/>
<input type="hidden" id="deptName" value="${loginVO.orgnztNm}"/>

<div class="col-md-12 col-lg-12 dash-left">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">조직도 관리</h4>
            <div class="title-road">캠인사이드 > 인사관리 > 조직도 관리</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <table>
                <tr>
                    <td rowspan="2">
                        <div id="gridForm" style="width:255px; overflow: auto;border: 1px solid #dedfdf;">
                            <div id="deptTree" style="height:685px;">

                            </div>
                        </div>
                    </td>
                    <td colspan="2" style="height:350px;">
                        <div id="gridForm2" style="width:100%; height:100%;">
                            <div id="deptUserGrid">

                            </div>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</div><!-- col-md-9 -->


<script>
    var datas = JSON.parse('${data}');
    orgChart.fn_defaultScript(datas);
</script>