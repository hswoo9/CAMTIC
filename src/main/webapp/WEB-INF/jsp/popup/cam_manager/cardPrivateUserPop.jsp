<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

<body class="font-opensans" style="background-color:#fff;">
<input type="hidden" id="status" value="${params.status}" />
<input type="hidden" id="mouKey" value="${params.key}" />
<div style="padding:0;">
	<div class="table-responsive">
		<input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
		<input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
		<div class="card-header pop-header">
			<h3 class="card-title title_NM"><span style="position: relative; top: 3px;" id="">비공개 사원</span></h3>

		</div>
		<div>
			<div id="popMainGrid" style="margin:20px 0;"></div>
		</div>

	</div>
</div>
<script type="text/javascript">
	var groupId = '${params.groupId}';

	$(function (){
		popMainGrid();
	});

	function popGridReload(){
		$("#popMainGrid").data("kendoGrid").dataSource.read();
	}
	function popMainGrid() {
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/card/getcardUserGroupList',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.groupId = groupId;
                    return data;
                }
            },
            schema : {
                data: function (data) {
                    return data.list;
                },
                total: function (data) {
                    return data.list.length;
                },
            },
            pageSize: 10,
        });

        $("#popMainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 508,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount : 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            /*toolbar : [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="cardUserGroupList.fn_userMultiSelectPop()">' +
                            '	<span class="k-button-text">추가</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="cardUserGroupList.mainGrid()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }
            ],*/
            columns: [
                {
                    title: "순번",
                    template: "#= --record #",
                    width: 50
                }, {
                    title: "성명",
                    field: "EMP_NAME",
                    width: 250
                }, {
                    title: "부서",
                    field: "DEPT_NAME",
                    width: 250
                }, {
                    title: "직급",
                    field: "POSITION_NAME",
                    width: 250
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    }
</script>
</body>
</html>