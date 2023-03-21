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

<jsp:include page="/WEB-INF/jsp/template/common.jsp" flush="false"/>
<style>
    .boxCss { width:190px; height:90px; color:#fff; background-color:#259dab; text-align:center; }
    .boxCss:hover { background-image: linear-gradient(to right, #259dab 0%, #2574ab 100%); }
    .popupTable th { padding:5px!important; vertical-align: middle!important; text-align: center; background-color: #bdc3d1ad; }
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
            <h4 class="panel-title">결재선 관리</h4>
        </div>
        <div class="panel-body">
            <table>
                <tr>
                    <td rowspan="2">
                        <div id="gridForm" style="width:255px; overflow: auto;border: 1px solid #dedfdf;">
                            <div id="deptTree" style="height:739px;">

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
                <tr>
                    <td>
                        <div id="gridForm3" style="height:100%;">
                            <div id="favApproveGrid">

                            </div>
                        </div>
                    </td>
                    <td>
                        <div id="gridForm4" style="height:100%;">
                            <div id="addApprLineGrid" style="border-bottom: none;">

                            </div>
                            <div id="approvalLineDataDiv" style="max-height: 322px; height:322px; overflow-y: scroll;border: 1px solid #dedfdf; border-top: none;">
                                <input type="hidden" id="favRouteId" name="favRouteId">
                                <table class="table table-bordered mb-0" id="approvalLineDataTb" style="text-align: center;">
                                    <colgroup>
                                        <col width="9%">
                                        <col width="15%">
                                        <col width="auto">
                                        <col width="18%">
                                        <col width="18%">
                                    </colgroup>
                                    <tbody>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</div><!-- col-md-9 -->

<jsp:include page="/WEB-INF/jsp/template/footer.jsp" flush="false"/>

<script type="text/javascript">
    var datas = JSON.parse('${data}');
    appUser.fnDefaultScript(datas);
</script>