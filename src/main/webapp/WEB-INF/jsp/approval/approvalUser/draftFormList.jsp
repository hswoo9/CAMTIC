<%--
Created by IntelliJ IDEA.
User: jsy
Date: 2023-02-28
Time: 오후 3:21
To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<style>
    .tit_p{font-weight: bold; margin-bottom: 13px; padding-left: 12px; font-size: 13px;}
    table { background-color: white; }
</style>
<link rel="stylesheet" href="/css/intra/kTreeView.css?${toDate}">
<script type="text/javascript" src="<c:url value='/js/intra/approval/draftFormList.js?${toDate}'/>"></script>

<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="deptSeq" value="${loginVO.orgnztId}"/>
<input type="hidden" id="deptName" value="${loginVO.orgnztNm}"/>

<div class="col-md-10 col-lg-10 dash-left">
    <div class="panel">
        <div class="panel-heading">
            <h4 class="panel-title">양식목록</h4>
        </div>
        <div class="panel-body">
            <table style="width: 100%">
                <tr>
                    <td style="padding: 15px 0px 15px 0px; width: 320px;">
                        <div>
                            <input id="formSearch" name="formSearch" placeholder="양식명" style="width: 281px" onkeypress="if(window.event.keyCode==13){draftFormList.getDraftFromSearch()}"/>
                            <button type="button" class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="draftFormList.getDraftFromSearch()">
                                <span class="k-icon k-i-search k-button-icon"></span>
                            </button>
                        </div>
                    </td>
                    <td rowspan="2" style="padding: 0 25px 0 25px;">
                        <p class="tit_p">· 양식 상세</p>
                        <div style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
                        <div style="height: 707px" id="formDetailDiv">

                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div id="gridForm" style="width:319px; overflow: auto;border: 1px solid #dedfdf;">
                            <div id="formTreeViewDiv" style="height:739px;">

                            </div>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</div><!-- col-md-9 -->


<script type="text/javascript">
    var datas = JSON.parse('${data}');
    draftFormList.fnDefaultScript(datas);
</script>