<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/camMng.js?v=${today}'/>"></script>

<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/companyCard/cardListMng.js?v=${today}'/>"></script>
<style>
    #my-spinner { width: 100%; height: 100%; top: 0; left: 0; display: none; opacity: .6; background: silver; position: absolute; z-index: 2; }
    #my-spinner div { width: 100%; height: 100%; display: table; }
    #my-spinner span { display: table-cell; text-align: center; vertical-align: middle; }
    #my-spinner img { background: white; padding: 1em; border-radius: .7em; }

    .k-grid-content td {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
</style>


<div id='my-spinner'>
    <div>
    <span>
    	<img src='//cdnjs.cloudflare.com/ajax/libs/galleriffic/2.0.1/css/loader.gif'>
    </span>
    </div>
</div>
<input type="hidden" id="myDeptSeq" name="myDeptSeq" value="${loginVO.orgnztId}">
<input type="hidden" id="myEmpSeq" name="myEmpSeq" value="${loginVO.uniqId}">

<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">카드목록 (관리자)</h4>
            <div class="title-road">캠매니저 > 법인카드 관리 &gt; 카드목록(관리자)</div>
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
                        <th class="text-center th-color">검색어</th>
                        <td colspan="5">
                            <input type="text" id="searchValue" style="width: 240px;" onkeypress="if(window.event.keyCode==13){cardListMng.mainGrid();}"/>
                            <br>* 명칭, 카드번호(ex. 끝4자리) 검색가능
                        </td>
                    </tr>
                </table>
            </div>

            <div id="mainGrid" style="margin:20px 0;">

            </div>
        </div>
    </div>
</div><!-- col-md-9 -->
<script>
    cardListMng.fn_defaultScript();

    function userPayMngPop(empSeq, empName, deptSeq, deptName){
        cardListMng.global.parameters.empSeq = empSeq;
        cardListMng.global.parameters.empName = empName;
        cardListMng.global.parameters.deptSeq = deptSeq;
        cardListMng.global.parameters.deptName = deptName;

        $.ajax({
            url : "/card/setCardManager",
            data : cardListMng.global.parameters,
            type : "post",
            dataType : "json",
            success : function(rs){
                if(rs.code == 200){
                    alert("담당자 지정이 완료되었습니다.");
                    cardListMng.mainGrid();
                }
            }
        });

    }

    function userPayHolderPop(empSeq, empName, deptSeq, deptName){
        cardListMng.global.parameters.empSeq = empSeq;
        cardListMng.global.parameters.empName = empName;
        cardListMng.global.parameters.deptSeq = deptSeq;
        cardListMng.global.parameters.deptName = deptName;

        $.ajax({
            url : "/card/setCardHolder",
            data : cardListMng.global.parameters,
            type : "post",
            dataType : "json",
            success : function(rs){
                if(rs.code == 200){
                    alert("카드 소지자가 변경되었습니다.");
                    cardListMng.mainGrid();
                }
            }
        });

    }
</script>
