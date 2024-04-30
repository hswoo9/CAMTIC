<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<jsp:useBean id="today" class="java.util.Date" />
<style>
    .k-grid-toolbar{
        justify-content: flex-end !important;
    }
    .k-grid-norecords{
        justify-content: space-around;
    }
</style>

<script type="text/javascript" src='<c:url value="/js/intra/approval/approvalUser/approvalDocBox/docSearchDeptAll.js?v=${today}"></c:url>'></script>
<body>
<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="deptSeq" value="${loginVO.orgnztId}"/>
<input type="hidden" id="deptName" value="${loginVO.orgnztNm}"/>
<input type="hidden" id="groupSeq" name="groupSeq" value="${loginVO.groupSeq}">
<input type="hidden" id="compSeq" name="compSeq" value="${loginVO.organId}">

<div class="col-md-12 col-lg-12 dash-left">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">부서문서검색</h4>
            <div class="title-road" style="text-align: right; margin-bottom: 5px;">캠도큐먼트 > 전자결재 > 결재함 > 부서문서검색</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div class="table-responsive" style="margin-bottom:10px;">
                <table class="searchTable table table-bordered" style="border: 0; margin-top : 5px; border: 1px solid #dedfdf;">
                    <colgroup>
                        <col width="10%">
                        <col width="25%">
                        <col width="10%">
                        <col width="auto">
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">조회기간</th>
                        <td>
                            <input type="text" id="startDay" style="width: 45%;" onchange="docSearchDeptAll.dateValidationCheck('startDay', this.value)"> ~ <input type="text" id="endDay" style="width: 45%" onchange="docSearchDeptAll.dateValidationCheck('endDay', this.value)">
                        </td>
                        <th class="text-center th-color">
                            <span class="pdr5 pdl3per">검색어</span>
                        </th>
                        <td>
                            <input type="text" id="searchKeyWord" name="searchKeyWord" style="width: 15%">
                            <input type="text" id="searchContent" name="searchContent" style="width: 60%" onkeydown="if(window.event.keyCode==13){docSearchDeptAll.gridReload()}">
                            <button type="button" class=" k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="docSearchDeptAll.gridReload()">
                                <span class="k-icon k-i-search k-button-icon"></span>
                            </button>
                        </td>
                    </tr>
                </table>
            </div>
            <div id="mainGrid">

            </div>
        </div>
    </div>
</div>

</body>

<script>
    docSearchDeptAll.fnDefaultScript();
</script>
