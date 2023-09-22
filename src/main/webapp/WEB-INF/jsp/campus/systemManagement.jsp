<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<script type="text/javascript" src="/js/intra/campus/campus.js?v=${toDate}"/></script>
<script type="text/javascript" src="/js/intra/campus/systemManagement.js?v=${toDate}"/></script>

<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>

<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">학습체계도 관리</h4>
            <div class="title-road">직무관리 &gt; 학습체계도관리</div>
        </div>
        <div class="panel-body">
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
            <div style="text-align: right">
                <button type="button" id="cmCodeCRSaveBtn" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="systemManagement.systemAdminPop();">코드 관리</button>
            </div>
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