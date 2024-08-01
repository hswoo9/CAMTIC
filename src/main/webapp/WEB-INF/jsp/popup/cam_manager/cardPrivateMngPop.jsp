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
			<h3 class="card-title title_NM"><span style="position: relative; top: 3px;" id="pjtTitle">그룹 선택</span></h3>

		</div>
		<div>
			<div id="popMainGrid" style="margin:20px 0;"></div>
		</div>

	</div>
</div>
<script type="text/javascript">
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
					url : '/card/getCardUserGroup',
					dataType : "json",
					type : "post"
				},
				parameterMap: function(data) {
					data.groupName = $("#groupName").val();

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
			height: 480,
			pageable: {
				refresh: true,
				pageSizes : [ 10, 20, 50, "ALL" ],
				buttonCount: 5
			},
			noRecords: {
				template: "데이터가 존재하지 않습니다."
			},
			toolbar: [
				{
					name: 'button',
					template: function(){
						return '<div><span class="k-button-text">그룹명 <span>' +
								'<input type="text" id="groupName" style="width: 180px;" class="k-input" onkeypress="if(window.event.keyCode==13){popGridReload();}"></div>';
					}
				}, {
					name: 'button',
					template: function(){
						return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="popGridReload()">' +
								'	<span class="k-button-text">조회</span>' +
								'</button>';
					}
				}
			],
			columns: [
				{
					title: "순번",
					template: "#= --record #",
					width: 50
				}, {
					field: "GROUP_NAME",
					title: "그룹명",
					width: 400,
					/*template: function(e){
						return '<a href="javascript:void(0);" style="font-weight: bold" onClick="cardUserGroupList.fn_cardUserGruopPop('+e.GROUP_ID+')">' + e.GROUP_NAME + '</a>';
					}*/
				}, {
					field: "REG_EMP_NAME",
					title: "작성자",
					width: 70
				}, {
					field: "REG_DEPT_NAME",
					title: "팀",
					width: 70
				}, {
					title: "",
					template: function(row){
						var data = JSON.stringify(row);
						return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-info" onclick="fn_selGroup('+row.GROUP_ID+')">선택</button>';
					},
					width: 60
				}
			],
			dataBinding: function(){
				record = fn_getRowNum(this, 2);
			}
		}).data("kendoGrid");
	}

	function fn_selGroup(id){
		if(!confirm("선택한 그룹으로 설정을 완료하시겠습니까?")){return false;}

		opener.parent.cardList.fn_save(id);
		window.close();
	}


</script>
</body>
</html>