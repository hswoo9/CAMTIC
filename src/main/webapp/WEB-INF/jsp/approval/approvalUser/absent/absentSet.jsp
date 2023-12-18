<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="<c:url value='/js/intra/approval/approvalUser/absent/absentSet.js?v=${today}'/>"></script>
<style>
    .k-grid-norecords{
        justify-content: space-around;
    }
    .k-grid-toolbar{
        justify-content: flex-end !important;
    }
</style>

<div class="col-md-12 col-lg-12 dash-left">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">부재설정</h4>
            <div class="title-road" style="text-align: right; margin-bottom: 5px;">캠도큐먼트 > 전자결재 > 결재설정 > 부재설정</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>

        <div class="panel-body">
            <div class="table-responsive" style="margin-bottom:10px;">
                <table class="searchTable table table-bordered" style="border: 1px solid #dedfdf;" id="searchTable">
                    <colgroup>
                        <col width="5%">
                        <col width="10%">
                        <col width="5%">
                        <col width="10%">
                        <col width="8%">
                        <col width="10%">
                        <col width="8%">
                        <col width="auto">
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">부서</th>
                        <td>
                            <input type="text" id="deptComp" style="width: 150px;">
                        </td>
                        <th class="text-center th-color">팀</th>
                        <td>
                            <input type="text" id="deptTeam" style="width: 180px;">
                        </td>
                        <th class="text-center th-color">부재상태</th>
                        <td>
                            <input type="text" id="absentCode" name="absentCode">
                        </td>
                        <th class="text-center th-color">기간</th>
                        <td>
                            <input type="text" id="aisday" style="width: 20%;" onchange="absentSet.dateValidationCheck('aisday', this.value)"> ~
                            <input type="text" id="aieday" style="width: 20%" onchange="absentSet.dateValidationCheck('aieday', this.value)">
                        </td>

                    </tr>
                </table>
            </div>
<%--                            <div class="table-responsive">--%>
<%--                                <div style="display:flex; justify-content: flex-end; margin:0 0 0 5px;">--%>
<%--                                    <div class="btn-st" style="margin:0; font-size: 12px">--%>
<%--                                        <button type="button" class="k-grid-add k-button k-button-md k-button-solid k-button-solid-base" onclick="absentSet.absentSetAddPop()">--%>
<%--                                            <span class="k-button-text">부재등록</span>--%>
<%--                                        </button>--%>
<%--                                        <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="absentSet.setAbsentInfoUpd()">--%>
<%--                                            <span class="k-button-text">삭제</span>--%>
<%--                                        </button>--%>
<%--                                        <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="">--%>
<%--                                            <span class="k-button-text">엑셀다운로드</span>--%>
<%--                                        </button>--%>
<%--                                    </div>--%>
<%--                                </div>--%>
<%--                            </div>--%>
            <div id="mainGrid" style="margin-top: 10px">

            </div>
        </div>
    </div>
</div>

<form name="frmPop">
    <input type="hidden" name="compSeq" id="compSeq" value=""/>
    <input type="hidden" name="compName" id="compName" value=""/>
    <input type="hidden" name="comp_seq" id="comp_seq" value=""/>
    <input type="hidden" name="comp_name" id="comp_name" value=""/>
    <input type="hidden" name="emp_seq" id="emp_seq" value=""/>
    <input type="hidden" name="emp_name" id="emp_name" value=""/>
    <input type="hidden" name="dept_seq" id="dept_seq" value=""/>
    <input type="hidden" name="dept_name" id="dept_name" value=""/>
    <input type="hidden" name="c_aiseqnum" id="c_aiseqnum" value=""/>
    <input type="hidden" name="c_cikeycode" id="c_cikeycode" value=""/>
    <input type="hidden" name="c_aimemo" id="c_aimemo" value=""/>
    <input type="hidden" name="c_aiflag" id="c_aiflag" value=""/>
    <input type="hidden" name="c_aisday" id="c_aisday" value=""/>
    <input type="hidden" name="c_aistime" id="c_aistime" value=""/>
    <input type="hidden" name="c_aieday" id="c_aieday" value=""/>
    <input type="hidden" name="c_aietime" id="c_aietime" value=""/>
    <input type="hidden" name="c_aistatus" id="c_aistatus" value=""/>
    <input type="hidden" name="c_viuserkey" id="c_viuserkey" value=""/>
    <input type="hidden" name="c_viorgcode" id="c_viorgcode" value=""/>
    <input type="hidden" name="c_viusername" id="c_viusername" value=""/>
    <input type="hidden" name="c_viorgname" id="c_viorgname" value=""/>
    <input type="hidden" name="c_mday" id="c_mday" value=""/>
    <input type="hidden" name="c_mtime" id="c_mtime" value=""/>
    <input type="hidden" name="c_aialim" id="c_aialim" value=""/>
</form>

<script>
    var params = JSON.parse('${params}');

    absentSet.fnDefaultScript(params);
</script>