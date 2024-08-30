<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

<body class="font-opensans" style="background-color:#fff;">
<div style="padding:0;">
    <div class="table-responsive">
        <input type="hidden" id="regEmpSeq" name="regEmpSeq" value="${loginVO.uniqId}">
        <input type="hidden" id="year" value="${params.year}">
        <input type="hidden" id="type" value="${params.type}">
        <input type="hidden" id="deptLevel" value="${params.deptLevel}">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM"><span style="position: relative; top: 3px;" id="popTitle">목표설정 이력</span></h3>
            <div class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">닫기</button>
            </div>
        </div>
        <div>
            <div id="mainGrid"></div>
        </div>
    </div>
</div>
<script type="text/javascript">

    $(function(){
        var parameters = {
            baseYear : $("#year").val()
        }
        mainGrid("/cam_achieve/getObjHistList", parameters);
    });

    function mainGrid(url, params){
        var mainGrid = $("#mainGrid").kendoGrid({
            dataSource : customKendo.fn_gridDataSource2(url, params),
            height : 359,
            sortable: true,
            scrollable: true,
            pageable: {
                refresh: true,
                pageSize : 5,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount: 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            persistSelection : true,
            columns : [
                {
                    field : "BASE_YEAR",
                    title : "기준년도",
                    width : 150
                },{
                    field : "DEPT_NAME",
                    title : "부서명",
                    width: 150,
                }, {
                    title : "수주 목표",
                    width : 100,
                    template: function(e){
                        return '<div style="text-align: right">'+comma(e.DELV_OBJ)+'</div>'
                    }
                }, {
                    title : "매출 목표",
                    width : 100,
                    template: function(e){
                        return '<div style="text-align: right">'+comma(e.SALE_OBJ)+'</div>'
                    }
                }, {
                    title : "운영수익 목표",
                    width : 100,
                    template: function(e){
                        return '<div style="text-align: right">'+comma(e.INCP_OBJ)+'</div>'
                    }
                }, {
                    field : "REG_DE",
                    title : "변경일자",
                    width : 100
                }]
        }).data("kendoGrid");
    }
</script>
</body>
</html>