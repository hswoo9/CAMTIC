<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%--<script type="text/javascript" src="<c:url value='/js/intra/system/system.js'/>"></script>--%>
<style>
	.k-treeview .k-i-collapse:before{background: url("/images/ico/ico_organ03_open.png");content: "";}
	.k-treeview .k-i-expand:before{background: url("/images/ico/ico_organ03_close.png");content: "";}
	.k-treeview .k-treeview-top.k-treeview-bot .k-i-collapse:before{background: url("/images/ico/ico_organ01.png")}
	.k-treeview .k-treeview-top.k-treeview-bot .k-i-expand:before{background: url("/images/ico/ico_organ01.png")}
	.k-treeview .k-top.k-bot .k-i-collapse{background: url("/images/ico/ico_organ01.png")}
	.k-treeview .k-top.k-bot .k-i-expand{background: url("/images/ico/ico_organ01.png")}

	.k-treeview .k-i-expand-disabled, .k-treeview .k-i-collapse-disabled {
		cursor: default
	}

	.k-treeview .k-treeview-top,
	.k-treeview .k-treeview-mid,
	.k-treeview .k-treeview-bot {
		background-image: url('/images/bg/treeview-nodes.png');
		background-repeat: no-repeat;
		margin-left: -16px;
		padding-left: 16px;
	}

	.k-treeview .k-treeview-top .k-treeview-bot{background: none; background-position: -25px -66px;}

	.k-treeview .k-item { background-image: url('/images/bg/treeview-line.png'); }
	.k-treeview .k-last { background-image: none; }
	.k-treeview .k-treeview-top { background-position: -91px 0; }
	.k-treeview .k-treeview-bot { background-position: -69px -22px; }
	.k-treeview .k-treeview-mid { background-position: -47px -42px; }
	.k-treeview .k-last .k-treeview-top { background-position: -25px -66px; }
	.k-treeview .k-group .k-last { background-position: -69px -22px; }
	.k-treeview .k-item {
		background-repeat: no-repeat;
	}

	.k-treeview .k-first {
		background-repeat: no-repeat;
		background-position: 0 16px;
	}

	.pop_head{
		height: 32px;
		position: relative;
		background: #1385db;
	}
	.pop_head h1 {
		font-size: 12px;
		color: #fff;
		line-height: 32px;
		padding-left: 16px;
	}

	#menuTreeView{
		background: #fff;
		overflow: auto;
		font-size: 12px;
	}


	.k-grid-toolbar{
		justify-content: flex-end !important;
	}
	.k-grid-norecords{
		justify-content: space-around;
	}
	.k-grid-header .k-header{
		text-align: center !important;
	}
</style>
<body class="font-opensans">
<jsp:include page="/WEB-INF/jsp/template/userInfo.jsp" flush="true"></jsp:include>

<div class="section-body">
	<div class="container-fluid">
		<div class="col-lg-12" style="padding:0 0 5px 0;">
			<div class="card">
				<div class="card-header" style="padding:0 0 40px 0;">
					<div class="col-lg-11" style="margin:0 auto;">
						<div class="card-header" style="padding:40px 0 10px 0;">
							<h3 class="card-title" style="font-size:18px;">메뉴권한부여</h3>
							<div class="title-road">홈 &gt; 전체관리 &gt; 시스템관리 &gt; 메뉴관리 > 메뉴권한부여</div>
						</div>
						<div id="startView" style="padding: 30px 0 0 0; border-top: 2px solid #dfdfdf;"></div>

						<div>
							<input type="hidden" id="empSeq" name="empSeq" value="${login.uniqId}">
							<table style="width:100%;height:100%;">
								<colgroup>
									<col width="40%">
								</colgroup>
								<tbody>
									<tr style="height: 327px">
										<td>
											<div id="authorityTabStrip">
												<ul>
													<li class="k-state-active">
														권한그룹 목록
													</li>
												</ul>
												<div id="gridForm2" style="height:670px;overflow: auto;border: 1px solid #dedfdf;">
													<div id="mainGrid">
													</div>
												</div>
											</div>
										</td>
										<td>
											<div id="authorityEditorTabStrip">
												<ul>
													<li class="k-state-active">
														사용자목록
													</li>
												</ul>
												<div id="gridForm3" style="height:670px;overflow: auto;border: 1px solid #dedfdf;">
													<div id="subGrid">
													</div>
												</div>
											</div>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<script>
	var authorityUserArr = new Array();
	var usersArr = new Array();

	$(function(){
		$("#authorityTabStrip, #authorityEditorTabStrip").kendoTabStrip({
			animation:  {
				open: {
					effects: "fadeIn"
				}
			}
		});

		var dataSource = new kendo.data.DataSource({
			serverPaging: false,
			transport: {
				read : {
					url : getContextPath() + '/system/getMenuAuthorityGroupList.do',
					dataType : "json",
					type : "post",
					async : false
				},
				parameterMap: function(data, operation) {
					data.searchContent = $("#searchContent").val();
					return data;
				}
			},
			schema : {
				data : function (data) {
					return data.rs;
				}
			}
		});

		$("#mainGrid").kendoGrid({
			dataSource: dataSource,
			height: 637,
			sortable: true,
			scrollable: false,
			toolbar : [
				{
					name: 'button',
					template: function (e) {
						return "그룹명 <input type='text' id='searchContent' name='searchContent' onkeypress='if(window.event.keyCode==13){gridReload()}'>" +
								"<button type='button' class='k-button k-button-md k-button-solid k-button-solid-base' onclick='gridReload()' style='height: 30px'>" +
									"<span class='k-icon k-i-search k-button-icon''></span>" +
								"</button>"
					}
				}
			],
			noRecords: {
				template: "데이터가 존재하지 않습니다."
			},
			dataBound : onDataBound,
			columns: [
				{
					field: "AUTHORITY_GROUP_NAME",
					title: "권한그룹 이름",
				},{
					field: "CM_CODE_NM",
					title: "권한 구분",
					width: 200
				}]
		}).data("kendoGrid");
		subGrid();
		setKendoTextBox(["searchContent", 'searchUserName']);

	})

	function onDataBound(){
		var grid = this;

		grid.tbody.find("tr").dblclick(function (e) {
			var dataItem = grid.dataItem($(this));
			$("#authorityGroupId").val(dataItem.AUTHORITY_GROUP_ID);
			$("#authorityGroupName").text(dataItem.AUTHORITY_GROUP_NAME);
			subGrid();
		});
	}

	function gridReload(){
		$("#mainGrid").data("kendoGrid").dataSource.read();
	}

	function subGrid(){
		var subGridDataSource = new kendo.data.DataSource({
			serverPaging: false,
			transport: {
				read : {
					url : getContextPath() + '/system/getAuthorityGroupUserList.do',
					dataType : "json",
					type : "post",
					async : false
				},
				parameterMap: function(data, operation) {
					data.searchUserName = $("#searchUserName").val();
					data.authorityGroupId = $("#authorityGroupId").val();
					return data;
				},
			},
			schema : {
				data : function (data) {
					authorityUserArr = [];
					usersArr = [];
					$.each(data.rs, function(i, v){
						var result = {
							authorityGrantId : String(this.AUTHORITY_GRANT_ID),
							authorityGroupId : this.AUTHORITY_GROUP_ID,
							empSeq : this.EMP_SEQ,
							empName : this.EMP_NAME,
							loginId : this.LOGIN_ID,
							deptSeq : this.DEPT_SEQ,
							deptName : this.DEPT_NAME,
							positionName : this.POSITION_NAME,
							dutyName : this.DUTY_NAME,
							authorityDate : this.AUTHORITY_DATE,
							regEmpSeq : $("#empSeq").val()
						}
						usersArr.push(result);
						authorityUserArr.push(result);
					})

					return data.rs;
				}
			}
		});

		$("#subGrid").kendoGrid({
			dataSource: subGridDataSource,
			height: 627,
			sortable: false,
			scrollable: false,
			toolbar : [
				{
					name: 'button',
					template: function (e) {
						return "권한그룹 : <p style='margin-right: auto;' id='authorityGroupName'></p>" +
								"<input type='hidden' id='authorityGroupId' name='authorityGroupId'>"
					}
				}, {
					name: 'button',
					template: function (e) {
						return "<input type='text' id='searchUserName' name='searchUserName' onkeypress='if(window.event.keyCode==13){subGridReload()}' placeholder='사용자명' style='margin-right: 0'>" +
								"<button type='button' class='k-button k-button-md k-button-solid k-button-solid-base' onclick='subGridReload()' style='height: 30px;'>" +
								"<span class='k-icon k-i-search k-button-icon''></span>" +
								"</button>"
					}
				}, {
					name: 'button',
					template: function (e) {
						return "<button type='button' class='k-button k-button-md k-button-solid k-button-solid-base' onclick='userMultiplePop()'>" +
								"<span class='k-button-text'>사용자 선택</span>" +
								"</button>";
					}
				}, {
					name: 'button',
					template: function (e) {
						return "<button type='button' class='k-button k-button-md k-button-solid k-button-solid-base' onclick='setAuthorityGroupUser()'>" +
								"<span class='k-button-text'>저장</span>" +
								"</button>";
					}
				}, {
					name: 'button',
					template: function (e) {
						return "<button type='button' class='k-button k-button-md k-button-solid k-button-solid-base' onclick='setAuthorityGroupUserDel()'>" +
								"<span class='k-button-text'>삭제</span>" +
								"</button>";
					}
				}

			],
			noRecords: {
				template: "데이터가 존재하지 않습니다."
			},
			columns: [
				{
					headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" class="k-checkbox checkbox"/>',
					template : "<input type='checkbox' id='aguPk#=AUTHORITY_GRANT_ID#' name='aguPk' value='#=AUTHORITY_GRANT_ID#' class='k-checkbox checkbox'/>",
					width : 20
				}, {
					field: "DEPT_NAME",
					title: "부서명",
					width: 180
				}, {
					field: "POSITION_NAME",
					title: "직급",
					width: 100
				}, {
					field: "DUTY_NAME",
					title: "직책",
					width: 100
				}, {
					field: "EMP_NAME_ID",
					title : "사용자명(ID)",
					width: 180
				}, {
					field: "AUTHORITY_DATE",
					title : "권한 부여일",
					width: 160,
					template : function(e){
						if(e.AUTHORITY_DATE != null){
							return "<input type='text' id='authorityDate' name='authorityDate' class='authorityDate' value='" + e.AUTHORITY_DATE + "'>";
						}else{
							return "<input type='text' id='authorityDate' name='authorityDate' class='authorityDate' value=''>";
						}
					}
				}]
		}).data("kendoGrid");

		$("#checkAll").click(function () {
			if ($(this).is(":checked")) $("input[name=aguPk]").prop("checked", true);
			else $("input[name=aguPk]").prop("checked", false);
		});

		$(".authorityDate").kendoDatePicker({
			format : "yyyy-MM-dd",
			culture : "ko-KR",
		});

		$(".authorityDate").attr("readonly", true);
	}

	var windowPopUrl = "";
	var popName = "";
	var popStyle ="";

	function userMultiplePop(){
		if(!$("#authorityGroupId").val()){
			alert("사용자를 추가할 권한그룹을 선택해주세요.");
			return;
		}

		windowPopUrl = getContextPath() + "/common/userMultiplePop.do";
		popName = "userMultiplePop";
		popStyle ="width=1365, height=647, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";

		window.open(windowPopUrl, popName, popStyle);
	}

	function userMultiplePopClose(){
		/** 부서별 메뉴 권한 추가는 예약기능을 사용할 수 없음 */
		// $("#subGrid").data("kendoGrid").dataSource.data([]);
		//
		// for(var i = 0; i < usersArr.length; i++){
		// 	if(usersArr[i].seqType != "d"){
		// 		if(authorityUserArr.filter(element => element.empSeq === usersArr[i].empSeq).length == 0){
		// 			usersArr[i].authorityGrantId = "";
		// 			usersArr[i].authorityGroupId = $("#authorityGroupId").val();
		// 			authorityUserArr.push(usersArr[i]);
		// 		}
		// 	}else{
		// 		if(authorityUserArr.filter(element => element.deptSeq === usersArr[i].deptSeq).length == 0){
		// 			usersArr[i].authorityGrantId = "";
		// 			usersArr[i].authorityGroupId = $("#authorityGroupId").val();
		// 			authorityUserArr.push(usersArr[i]);
		// 		}
		// 	}
		//
		// }

		for(var i = 0; i < usersArr.length; i++){
			if(authorityUserArr.filter(element => element.empSeq === usersArr[i].empSeq).length == 0){
				usersArr[i].authorityGrantId = "";
				usersArr[i].authorityGroupId = $("#authorityGroupId").val();
				authorityUserArr.push(usersArr[i]);
			}
		}

		for(var i = 0; i < authorityUserArr.length; i++){
			if(authorityUserArr[i].authorityGrantId == ""){
				$("#subGrid").data("kendoGrid").dataSource.add({
					AUTHORITY_GRANT_ID : authorityUserArr[i].authorityGrantId,
					DEPT_NAME : authorityUserArr[i].deptName,
					POSITION_NAME : authorityUserArr[i].positionName,
					DUTY_NAME : authorityUserArr[i].dutyName,
					EMP_SEQ : authorityUserArr[i].empSeq,
					EMP_NAME_ID : authorityUserArr[i].empName + "(" + authorityUserArr[i].loginId + ")",
					AUTHORITY_DATE : authorityUserArr[i].authorityDate
				});

				$(".authorityDate").kendoDatePicker({
					format : "yyyy-MM-dd",
					culture : "ko-KR",
				});
			}
		}
	}

	function setAuthorityGroupUser(){
		if(confirm("저장하시겠습니까?")){
			var flag = true;

			$.each($("input[name='authorityDate']"), function(e, i){
				var dataItem = $("#subGrid").data("kendoGrid").dataItem($(this).closest("tr"));
				$.each(authorityUserArr, function(ee, ii){
					if(dataItem.EMP_SEQ == ii.empSeq){
						if($(i).val() == ""){
							flag = false;
						}else{
							ii.authorityDate = $(i).val()
						}

						if(new Date(ii.authorityDate) <= new Date()){
							ii.active = "Y"
						}else{
							ii.active = "N"
						}
					}
				})

				if(!flag){
					return;
				}
			})

			if(!flag){
				alert("권한 부여일을 입력하지 않은 사용자가 있습니다.");
				return;
			}

			$.ajax({
				url : getContextPath() + '/system/setAuthorityGroupUser.do',
				data :  {
					authorityUserArr : JSON.stringify(authorityUserArr)
				},
				dataType : "json",
				type : "POST",
				async : false,
				success : function (){
					alert("권한이 저장 되었습니다.");
					subGrid();
				},
				error : function (){
					alert("권한 등록 중 에러가 발생했습니다.");
				}
			})
		}
	}

	function setAuthorityGroupUserDel(){
		if(confirm("선택한 사용자의 권한을 삭제하시겠습니까?")){
			var aguAr = new Array();

			$.each($("input[name='aguPk']:checked"), function(e){
				aguAr.push($(this).val());
			})

			$.ajax({
				url : getContextPath() + '/system/setAuthorityGroupUserDel.do',
				data :  {
					aguAr : aguAr
				},
				dataType : "json",
				type : "POST",
				async : false,
				success : function (){
					alert("사용자 권한이 삭제 되었습니다.");
					subGrid();
				},
				error : function (){
					alert("사용자 권한 삭제 중 에러가 발생했습니다.");
				}
			})
		}
	}

</script>
</body>