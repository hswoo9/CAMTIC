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
							<h3 class="card-title" style="font-size:18px;">메뉴권한관리</h3>
							<div class="title-road">홈 > 전체관리 > 시스템관리 > 메뉴관리 > 메뉴권한관리</div>
						</div>
						<div id="startView" style="padding: 30px 0 0 0; border-top: 2px solid #dfdfdf;"></div>

						<div>
							<table style="height:100%;">
								<colgroup>
									<col width="20%">
								</colgroup>
								<tbody>
									<tr style="height: 327px">
										<td rowspan="2" style="vertical-align: top;">
											<div id="menuTabStrip">
												<ul>
													<li class="k-state-active">
														메뉴 목록
													</li>
												</ul>
												<div>
													<input id="menuSearch" name="menuSearch" placeholder="메뉴명 입력"/>
													<div id="gridForm" style="height:609px; width: 315px;overflow: auto;border: 1px solid #dedfdf;">
														<div id="menuTreeView">

														</div>
													</div>
												</div>
											</div>
										</td>
										<td>
											<div id="authorityTabStrip">
												<ul>
													<li class="k-state-active">
														권한 그룹 목록
													</li>
												</ul>
												<div id="gridForm2" style="height:405px;overflow: auto;border: 1px solid #dedfdf;">
													<div id="mainGrid">
													</div>
												</div>
											</div>
										</td>
									</tr>
									<tr>
										<td>
											<div id="authorityEditorTabStrip">
												<ul>
													<li class="k-state-active">
														권한 등록/수정
													</li>
												</ul>
												<div id="gridForm3" style="height:220px;overflow: auto;border: 1px solid #dedfdf;">
													<table class="table table-bordered mb-0" id="authorityGroupInfoTb" style="border: none;">
														<tbody>
														<tr>
															<td colspan="4" style="text-align: right;border: none">
																<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="inputReset()">
																	<span class="k-icon k-i-track-changes-enable k-button-icon"></span>
																	<span class="k-button-text">신규 등록</span>
																</button>
																<button type="button" id="saveBtn" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="setMenuAuthorityGroup()">
																	<span class="k-icon k-i-track-changes-enable k-button-icon"></span>
																	<span class="k-button-text">저장</span>
																</button>
															</td>
														</tr>
														<tr>
															<th class="text-center th-color">
																<span class="red-star">*</span>메뉴 권한 그룹 번호
															</th>
															<td>
																<input type="hidden" id="loginEmpSeq" name="loginEmpSeq" value="${login.uniqId}">
																<input type="text" id="authorityGroupId" name="authorityGroupId" disabled>
															</td>
															<th class="text-center th-color">
																<span class="red-star">*</span>메뉴 권한 그룹 이름
															</th>
															<td>
																<input type="text" id="authorityGroupName" name="authorityGroupName">
															</td>
														</tr>
														<tr>
															<th class="text-center th-color">
																<span class="red-star">*</span>권한 구분
															</th>
															<td>
																<input type="text" id="authorityType" name="authorityType">
															</td>
															<th class="text-center th-color">
																<span class="red-star">*</span>사용유무
															</th>
															<td>
																<input type="text" id="active" name="active">
															</td>
														</tr>
														</tbody>
														<tfoot id="authorityGroupInfoTp">

														</tfoot>
													</table>
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
	var chkArr = new Array();

	$(document).on("input","#menuSearch",function(){
		var query = this.value;
		var dataSource = $("#menuTreeView").data("kendoTreeView").dataSource;

		filter(dataSource, query);
	});

	$(function(){
		$("#menuTabStrip").kendoTabStrip({
			animation:  {
				open: {
					effects: "fadeIn"
				}
			}
		});
		$("#authorityTabStrip, #authorityEditorTabStrip").kendoTabStrip({
			animation:  {
				open: {
					effects: "fadeIn"
				}
			}
		});

		makeTreeView();

		var dataSource = new kendo.data.DataSource({
			serverPaging: false,
			transport: {
				read : {
					url : "<c:url value='/system/getMenuAuthorityGroupList.do'/>",
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
				data: function (data) {
					return data.rs;
				},
				total: function (data) {
						return data.rs.length;
					}
				},
				pageSize: 10,
		});

		$("#mainGrid").kendoGrid({
			dataSource: dataSource,
			height: 370,
			sortable: true,
			scrollable: true,
			toolbar : [
				{
					name: 'button',
					template: function (e) {
						return "그룹명 <input type='text' id='searchContent' name='searchContent' onkeypress='if(window.event.keyCode==13){gridReload()}'>" +
								"<button type='button' class='k-button k-button-md k-button-solid k-button-solid-base' onclick='gridReload()'>" +
									"<span class='k-icon k-i-search k-button-icon''></span>" +
								"</button>"
					}
				}, {
					name: 'button',
					template: function (e) {
						return "<button type='button' class='k-button k-button-md k-button-solid k-button-solid-base' onclick='setMenuAuthorityGroupDel()'>" +
								"<span class='k-button-text'>삭제</span>" +
								"</button>"
					}
				}
			],
			pageable: {
				refresh: true,
				pageSize : 10,
				pageSizes: [10, 20, 50, "ALL"],
				buttonCount: 5,
				messages: {
					display: "{0} - {1} of {2}",
					itemsPerPage: "",
					empty: "데이터가 없습니다.",
				}
			},
			noRecords: {
				template: "데이터가 존재하지 않습니다."
			},
			dataBound : onDataBound,
			columns: [
				{
					headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" class="k-checkbox checkbox"/>',
					template : "<input type='checkbox' id='agiPk#=AUTHORITY_GROUP_ID#' name='agiPk' value='#=AUTHORITY_GROUP_ID#' class='k-checkbox checkbox'/>",
					width : 35
				}, {
					field: "AUTHORITY_GROUP_NAME",
					title: "권한그룹 이름",
				}, {
					field : "CM_CODE_NM",
					title : "권한 구분",
					width: 150
				}, {
					field: "ACTIVE",
					title: "사용유무",
					width: 100
				}, {
					field : "REG_DT",
					title : "등록일",
					width: 100
				}]
		}).data("kendoGrid");
		setKendoTextBox(["menuSearch", "authorityGroupId", "searchContent", "authorityGroupName"]);

		getAuthorityTypeCode();

		$("#active").kendoDropDownList({
			dataTextField: "text",
			dataValueField: "value",
			dataSource: [
				{ text: "선택", value: "" },
				{ text: "사용", value: "Y" },
				{ text: "미사용", value: "N" }
			],
			index: 0
		})
	})

	function getAuthorityTypeCode(){
		$.ajax({
			url : getContextPath() + "/system/commonCodeManagement/getCmCodeList.do",
			data : {
				cmGroupCodeId : "22"
			},
			dataType : "json",
			type : "POST",
			async : false,
			success : function(rs){
				var rs = rs.codeList;
				var defaultType = [{
					"CM_CODE": "",
					"CM_CODE_NM": "선택"
				}]

				rs.unshift(defaultType[0]);
				$("#authorityType").kendoDropDownList({
					dataSource : rs,
					dataValueField : "CM_CODE",
					dataTextField : "CM_CODE_NM",
					index : 0
				});
			}
		})
	}

	function makeTreeView(){
		$.ajax({
			url : "<c:url value='/system/makeTreeView.do'/>",
			data : "",
			dataType : "json",
			success : function (rs){
				var rs = rs.rs;
				$("#menuTreeView").kendoTreeView({
					checkboxes: {
						template: "<input type='checkbox' name='menuPkCheckBox' class='k-checkbox k-checkbox-md' value='#= item.MENU_ID #' depth='#= item.MENU_DEPTH #' idPath='#= item.MENU_ID_PATH #' onclick='treeClickCheckBox(this)'/>"
					},
					dataSource: JSON.parse(rs),
					dataTextField:['MENU_NAME'],
				});
			}
		})
	}

	function filter(dataSource, query) {
		var hasVisibleChildren = false;
		var data = dataSource instanceof kendo.data.HierarchicalDataSource && dataSource.data();

		for (var i = 0; i < data.length; i++) {
			var item = data[i];
			var text = item.MENU_NAME;
			var itemVisible = query === true || query === "" || text.indexOf(query) >= 0;

			var anyVisibleChildren = filter(item.children, itemVisible || query);

			hasVisibleChildren = hasVisibleChildren || anyVisibleChildren || itemVisible;

			item.hidden = !itemVisible && !anyVisibleChildren;
		}

		if (data) {
			dataSource.filter({ field: "hidden", operator: "neq", value: true });
		}

		return hasVisibleChildren;
	}

	function treeClickCheckBox(e){
		var chkFlag = true;

		/** 현재 클릭한 체크 박스 체크 여부 (체크된 노드 배열에 담아둠)*/
		if(!$(e).prop("checked")){
			chkArr = chkArr.filter(element => element !== $(e.closest("li")).find("input")[0]);
			chkFlag = false;
			$(e.closest("li")).find("input").prop("checked", false);
		}else{
			chkArr.push($(e.closest("li")).find("input")[0]);
			chkFlag = true;
			$(e.closest("li")).find("input").prop("checked", true);
		}

		/** 현재 클릭한 체크 박스의 상위 경로 체크 */
		var idPath = $(e).attr("idPath").split("|");
		for(var i = 0; i < idPath.length; i++){
			if(idPath[i] != ''){
				$("input[value=" + idPath[i] + "]").prop("checked", chkFlag);
			}
		}

		/**
		 * 현재 클릭된 체크박스 체크 해제시 동일 노드에 체크된 체크박스 있어도 상위 노드 체크 해제되는 이슈로 인해
		 * 체크박스 배열 루프 돌면서 상위 노드 재체크
		 * */
		$.each(chkArr, function(v, i){
			var arrIdPath = $(i).attr("idPath").split("|");
			if(i.checked){
				$.each(arrIdPath, function(vv, ii){
					$("input[value=" + arrIdPath[vv] + "]").prop("checked", true);
				})
			}
		})
	}

	function onDataBound(){
		var grid = this;

		grid.tbody.find("tr").dblclick(function (e) {
			var dataItem = grid.dataItem($(this));
			getMenuAuthorityGroup(dataItem.AUTHORITY_GROUP_ID);
		});
	}

	function getMenuAuthorityGroup(e){

		$.ajax({
			url : "<c:url value='/system/getMenuAuthorityGroup.do'/>",
			data :  {
				authorityGroupId : e
			},
			dataType : "json",
			type : "POST",
			async : false,
			success : function (rs){
				var authorityGrooup = rs.rs.authorityGroup;
				var accessMenu = rs.rs.accessMenu;
				$("#authorityGroupId").val(authorityGrooup.AUTHORITY_GROUP_ID);
				$("#authorityGroupName").val(authorityGrooup.AUTHORITY_GROUP_NAME);
				$("#authorityType").data("kendoDropDownList").value(authorityGrooup.AUTHORITY_TYPE);
				$("#active").data("kendoDropDownList").value(authorityGrooup.ACTIVE);
				$("#authorityGroupInfoTp").empty();
				$("#authorityGroupInfoTp").append('<tr>' +
													'	<th class="text-center th-color">최초 등록일</th>' +
													'	<td>' +
													'		<span id="regDt" name="regDt">'+authorityGrooup.REG_DT+'</span>' +
													'	</td>' +
													'	<th class="text-center th-color">최종 수정일</th>' +
													'	<td>' +
													'		<span id="modDt" name="modDt">'+authorityGrooup.MOD_DT+'</span>' +
													'	</td>' +
													'</tr>');

				$("#menuTreeView .k-checkbox-wrapper input").prop("checked", false).trigger("change");

				$.each($("input[name=menuPkCheckBox]"), function(e, i){
					$.each(accessMenu, function(ee, ii){
						if($(i).val() == ii.MENU_ID){
							$(i).prop("checked", true).trigger("change");
						}
					})
				})
			}
		})
	}

	function gridReload(){
		$("#mainGrid").data("kendoGrid").dataSource.read();
	}

	function inputReset(){
		$("#menuTreeView .k-checkbox-wrapper input").prop("checked", false).trigger("change");
		$("#authorityGroupId, #authorityGroupName").val("");
		$("#authorityType").data("kendoDropDownList").value("");
		$("#active").data("kendoDropDownList").value("");
		$("#authorityGroupInfoTp").empty();
	}

	function setMenuAuthorityGroupDel(){
		if(confirm("권한그룹을 삭제하시겠습니까?\n권한 삭제 시 연결된 메뉴 및 사용자가 모두 초기화 됩니다.")){
			var agiAr = new Array();

			$.each($("input[name='agiPk']:checked"), function(e){
				agiAr.push($(this).val());
			})

			$.ajax({
				url : getContextPath() + '/system/setMenuAuthorityGroupDel.do',
				data :  {
					agiAr : agiAr
				},
				dataType : "json",
				type : "POST",
				async : false,
				success : function (){
					alert("권한 그룹이 삭제 되었습니다.");
					gridReload();
				},
				error : function (){
					alert("권한 그룹 삭제 중 에러가 발생했습니다.");
				}
			})
		}
	}
	function setMenuAuthorityGroup(){
		var flag = true;

		if(!$("#authorityGroupName").val()){
			alert("권한그룹 이름을 입력해주세요.");
			flag = false;
			return;
		}else if(!$("#authorityType").val()){
			alert("권한구분을 선택해주세요.");
			flag = false;
			return;
		}else if(!$("#active").val()){
			alert("사용유무를 선택해주세요.");
			flag = false;
			return;
		}

		if(confirm("저장하시겠습니까?")){
			if(flag){
				var authorityGroup = {
					authorityGroupId : $("#authorityGroupId").val(),
					authorityGroupName : $("#authorityGroupName").val(),
					authorityType : $("#authorityType").val(),
					active : $("#active").val(),
					loginEmpSeq : $("#loginEmpSeq").val()
				}

				var menuArr = new Array();
				$.each($("#menuTreeView  .k-item input[type=checkbox]:checked").closest(".k-item"), function(e, v){
					var dataItem = $("#menuTreeView").data("kendoTreeView").dataItem($(v));
					menuArr.push({
						menuId : dataItem.MENU_ID,
						loginEmpSeq : $("#loginEmpSeq").val()
					});
				});
				authorityGroup.menuData = JSON.stringify(menuArr);

				$.ajax({
					url : getContextPath() + '/system/setMenuAuthorityGroup.do',
					data :  authorityGroup,
					dataType : "json",
					type : "POST",
					async : false,
					success : function (){
						alert("메뉴권한이 저장 되었습니다.");
						gridReload();
					},
					error : function (){
						alert("메뉴권한 등록 중 에러가 발생했습니다.");
					}
				})
			}else{
				alert("입력값을 확인해주세요.");
			}
		}
	}

</script>
</body>