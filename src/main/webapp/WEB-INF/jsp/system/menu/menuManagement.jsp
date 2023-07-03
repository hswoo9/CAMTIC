<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
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

    .k-list-scroller {
        overflow-y: scroll;
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
							<h3 class="card-title" style="font-size:18px;">메뉴정보관리</h3>
							<div class="title-road">홈 &gt; 전체관리 &gt; 시스템관리 &gt; 메뉴관리 > 메뉴정보관리</div>
						</div>
						<div id="startView" style="padding: 30px 0 0 0; border-top: 2px solid #dfdfdf;"></div>

						<div>
							<table>
								<colgroup>
									<col width="20%">
								</colgroup>
								<tbody>
									<tr>
										<td>
											<div id="menuTabStrip">
												<ul>
													<li class="k-state-active">
														메뉴 목록
													</li>
												</ul>
												<div>
													<input id="menuSearch" name="menuSearch" placeholder="메뉴명 입력" style="width: 87%" onkeypress="if(window.event.keyCode==13){menuTreeSearch(this.value)}"/>
													<button type="button" class=" k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="menuTreeSearch($('#menuSearch').val())">
														<span class="k-icon k-i-search k-button-icon"></span>
													</button>
													<div id="gridForm" style="height:609px; width: 315px;overflow: auto;border: 1px solid #dedfdf;">
														<div id="menuTreeView">

														</div>
													</div>
												</div>

											</div>
										</td>
										<td style="vertical-align: top;">
											<div id="menuEditorTabStrip">
												<ul>
													<li class="k-state-active">
														메뉴 등록/수정
													</li>
												</ul>
												<div id="gridForm2" style="height:670px;overflow: auto;border: 1px solid #dedfdf;">
													<form id="menuSaveFrm">
														<table class="table table-bordered mb-0" style="border: none;">
															<tbody>
															<tr>
																<td colspan="4" style="text-align: right;border: none">
																	<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="inputReset()">
																		<span class="k-icon k-i-track-changes-enable k-button-icon"></span>
																		<span class="k-button-text">신규 등록</span>
																	</button>
																	<button type="button" id="saveBtn" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="setMenu()">
																		<span class="k-icon k-i-track-changes-enable k-button-icon"></span>
																		<span class="k-button-text">저장</span>
																	</button>
																	<button type="button" id="delBtn" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="setMenuDel()">
																		<span class="k-icon k-i-cancel k-button-icon"></span>
																		<span class="k-button-text">삭제</span>
																	</button>
																</td>
															</tr>
															<tr>
																<th class="text-center th-color">
																	<span class="red-star">*</span>상위메뉴
																</th>
																<td colspan="3">
                                                                    <input type="hidden" id="tmpUpperMenuId" value="" />
																	<input type="text" id="upperMenuId" name="upperMenuId" style="width:30%;">
                                                                    <input type="text" id="upperMenuId2" name="upperMenuId" style="width:30%;">
                                                                    <input type="text" id="upperMenuId3" name="upperMenuId" style="width:30%;">
																</td>
															</tr>
															<tr>
																<th class="text-center th-color">
																	<span class="red-star">*</span>메뉴번호
																</th>
																<td>
																	<input type="hidden" id="loginEmpSeq" name="loginEmpSeq" value="${login.uniqId}">
																	<input type="hidden" id="menuDepth" name="menuDepth">
																	<input type="text" id="menuId" name="menuId" disabled>
																</td>
																<th class="text-center th-color">
																	<span class="red-star">*</span>메뉴명
																</th>
																<td>
																	<input type="text" id="menuName" name="menuName">
																</td>
															</tr>
															<tr>
																<th class="text-center th-color">
																	<span class="red-star">*</span>메뉴유형
																</th>
																<td>
																	<input type="text" id="menuType" name="menuType">
																</td>
																<th class="text-center th-color">
																	<span class="red-star">*</span>메뉴아이콘
																</th>
																<td>
																	<input type="text" id="menuIcon" name="menuIcon">
																</td>
															</tr>
															<tr>
																<th class="text-center th-color">
																	<span class="red-star">*</span>메뉴경로
																</th>
																<td colspan="3">
																	<input type="text" id="boardId" name="boardId" style="width: 19%">
																	<input type="text" id="menuPath" name="menuPath" style="width: 80%">
																</td>
															</tr>
															<tr>
																<th class="text-center th-color">
																	<span class="red-star">*</span>메뉴순서
																</th>
																<td>
																	<input type="text" id="sort" name="sort">
																</td>
																<th class="text-center th-color">
																	<span class="red-star">*</span>사용유무
																</th>
																<td colspan="3">
																	<input type="text" id="active" name="active" >
																</td>
															</tr>
															</tbody>
														</table>
													</form>
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
function menuTreeSearch(e) {
	var query      = e;
	var dataSource = $("#menuTreeView").data("kendoTreeView").dataSource;
	filter(dataSource, query);
}

$(function(){
	$("#menuTabStrip").kendoTabStrip({
		animation:  {
			open: {
				effects: "fadeIn"
			}
		}
	});

	$("#menuEditorTabStrip").kendoTabStrip({
		animation:  {
			open: {
				effects: "fadeIn"
			}
		}
	});

	makeTreeView();
	setKendoTextBox(["menuSearch", "menuId", "menuName", "menuPath", "sort"]);

	var result = customKendo.fn_customAjax("/system/getBoardList.do", "");
	if(result.flag){
		customKendo.fn_dropDownList("boardId", result.list, "BOARD_NAME", "BOARD_ID");

		$("#boardId").data("kendoDropDownList").enable(false);
		$("#boardId").data("kendoDropDownList").bind("change", boardDropDownChange);
	}

	function boardDropDownChange(){
		if(this.value() == ""){
			$("#menuPath").data("kendoTextBox").enable(false);
			$("#menuPath").val("");
		}else{
			var data = {
				boardId : this.value()
			}
			var result = customKendo.fn_customAjax("/system/getBoardType.do", data);
			if(result.flag){
				var boardPath = "";
				if(result.rs.BOARD_TYPE == "n"){
					boardPath = "/board/normalBoardList.do?boardId="+ this.value();
				}else if(result.rs.BOARD_TYPE == "a"){
					boardPath = "/board/anonymousBoardList.do?boardId="+ this.value();
				}else if(result.rs.BOARD_TYPE == "q"){
					boardPath = "/board/qnaBoardList.do?boardId="+ this.value();
				}else if(result.rs.BOARD_TYPE == "f"){
					boardPath = "/board/faqBoardList.do?boardId="+ this.value();
				}

				$("#menuPath").data("kendoTextBox").enable(false);
				$("#menuPath").val(boardPath);
			}
		}
	}

	$("#menuType").kendoDropDownList({
		dataTextField: "text",
		dataValueField: "value",
		dataSource: [
			{ text: "선택", value: "" },
			{ text: "일반", value: "c" },
			{ text: "게시판", value: "b" }
		],
		index: 0,
		change : function(){
			if(this.value() == "" || this.value() == "c"){
				$("#boardId").data("kendoDropDownList").value("");
				$("#menuPath").val("");
				$("#menuPath").data("kendoTextBox").enable(true);
				$("#boardId").data("kendoDropDownList").enable(false);
			}else{
				$("#boardId").data("kendoDropDownList").value("");
				$("#menuPath").val("");
				$("#menuPath").data("kendoTextBox").enable(false);
				$("#boardId").data("kendoDropDownList").enable(true);
			}
		}
	})

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

	getMenuList();
	getIconCommonCode();
})

function makeTreeView(){
	$.ajax({
		url : getContextPath() + '/system/makeTreeView.do',
		data : "",
		dataType : "json",
		success : function (rs){
			var rs = rs.rs;
			$("#menuTreeView").kendoTreeView({
				dataSource: JSON.parse(rs),
				dataTextField:['MENU_NAME'],
				select: treeClick,
			});

			menuTreeSearch($("#menuSearch").val());
		}
	});
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

function treeClick(e){
	var item = $("#menuTreeView").data("kendoTreeView").dataItem(e.node);
	dataMod(item);
}

function getMenuList(e){
	var menuId = "";

	if(e != null){
		menuId = e;
	}

    var rs = callMenuList(menuId, 0);

    $("#upperMenuId").kendoDropDownList({
        dataSource : rs,
        dataValueField : "MENU_ID",
        dataTextField : "MENU_NAME",
        dataDepthField : "MENU_DEPTH",
        index : 0,
        change : function(){
            if($("#upperMenuId").val() > 0){
                $("#tmpUpperMenuId").val($("#upperMenuId").val());
                getMenuList2($("#upperMenuId").val());
                $("#menuDepth").val(1);
                $("#upperMenuId2").data("kendoDropDownList").enable(true);
                $("#upperMenuId3").data("kendoDropDownList").select(0);
                $("#upperMenuId3").data("kendoDropDownList").enable(false);
            } else {
                $("#tmpUpperMenuId").val("");
                $("#menuDepth").val(0);
                $("#upperMenuId3").data("kendoDropDownList").select(0);
                $("#upperMenuId3").data("kendoDropDownList").enable(false);
                $("#upperMenuId2").data("kendoDropDownList").select(0);
                $("#upperMenuId2").data("kendoDropDownList").enable(false);
            }
        }
    });

    $("#upperMenuId2, #upperMenuId3, #upperMenuId4").kendoDropDownList({
        dataSource : [{text : "선택", value : ""}],
        dataValueField : "value",
        dataTextField : "text",
        index : 0,
        enable : false
    });
}

function getMenuList2(e){
    var menuId = "";
    var upperMenuId = e;



    var rs = callMenuList(menuId, 1, e);

    $("#upperMenuId2").kendoDropDownList({
        dataSource : rs,
        dataValueField : "MENU_ID",
        dataTextField : "MENU_NAME",
        dataDepthField : "MENU_DEPTH",
        index : 0,
        change : function(){
            if($("#upperMenuId2").val() > 0){
                $("#tmpUpperMenuId").val($("#upperMenuId2").val());
                getMenuList3($("#upperMenuId2").val());
                $("#menuDepth").val(2);
                $("#upperMenuId3").data("kendoDropDownList").enable(true);
            } else {
                $("#menuDepth").val(1);
                $("#tmpUpperMenuId").val($("#upperMenuId").val());
                $("#upperMenuId3").data("kendoDropDownList").enable(false);
                $("#upperMenuId3").data("kendoDropDownList").select(0);
            }
        }
    });
}

function getMenuList3(e){
    var menuId = "";
    var upperMenuId = e;

    var rs = callMenuList(menuId, 2, e);

    $("#upperMenuId3").kendoDropDownList({
        dataSource : rs,
        dataValueField : "MENU_ID",
        dataTextField : "MENU_NAME",
        dataDepthField : "MENU_DEPTH",
        index : 0,
        change : function(){
            if($("#upperMenuId3").val() > 0){
                $("#menuDepth").val(3);
                $("#tmpUpperMenuId").val($("#upperMenuId3").val());
            } else {
                $("#menuDepth").val(2);
                $("#tmpUpperMenuId").val($("#upperMenuId2").val());
            }
        }
    });
}

function callMenuList(menuId, depth, upperMenuId){
    var result;

    var data = {
        menuId : menuId,
        menuDepth : depth
    }

    if(upperMenuId != "" && upperMenuId != null){
        data.upperMenuId = upperMenuId;
    }

    $.ajax({
        url : getContextPath() + '/system/getMenuList.do',
        data : data,
        dataType : "json",
        async : false,
        success : function (rs){
            result = rs.rs;

            var defaultType = [{
                "MENU_ID": "",
                "MENU_NAME": "선택",
                "MENU_DEPTH" : "",
            }, {
                "MENU_ID": "0",
                "MENU_NAME": "최상위 메뉴",
                "MENU_DEPTH" : "0",
            }];
            if(depth == 0){
                result.unshift(defaultType[1]);
            }

            result.unshift(defaultType[0]);

        },
        error : function(e){
            console.log(e);
        }
    });

    return result;

}

function getIconCommonCode(){
	$.ajax({
		url : getContextPath() + "/system/commonCodeManagement/getCmCodeList.do",
		data : {
			cmGroupCodeId : "21"
		},
		dataType : "json",
		type : "POST",
		async : false,
		success : function(rs){
			var rs = rs.codeList;
			var defaultType = [{
				"CM_CODE": "",
				"CM_CODE_NM": "선택"
			},{
				"CM_CODE": "basic",
				"CM_CODE_NM": "기본 아이콘(-)"
			}]

			rs.unshift(defaultType[0]);
			rs.push(defaultType[1]);
			$("#menuIcon").kendoDropDownList({
				dataSource : rs,
				dataValueField : "CM_CODE",
				dataTextField : "CM_CODE_NM",
				template: function(e){
					if(e.CM_CODE != "basic"){
						return '<spen  class="k-icon ' + e.CM_CODE + '"></spen><span>'+e.CM_CODE_NM+'</span>';
					}else if(e.CM_CODE == "basic"){
						return '<spen style="margin-right: 6px;margin-left: 6px">-</spen><span>'+e.CM_CODE_NM+'</span>';
					}else{
						return '<spen></spen><span>'+e.CM_CODE_NM+'</span>';
					}

				},
				index : 0
			});
		}
	})
}

function inputReset(){
    var treeview = $("#menuTreeView").data("kendoTreeView");
    treeview.select($());
	getMenuList();
	$('#upperMenuId').data("kendoDropDownList").value("");
	$('#upperMenuId').data("kendoDropDownList").enable(true);
	$('#menuIcon').data("kendoDropDownList").value("");
	$("#menuId, #menuName, #menuPath, #sort").val("");
	$("#active").data("kendoDropDownList").value("");
	$("#saveBtn").show();
}


function dataMod(v){
	getMenuList(v.MENU_ID);
	$('#upperMenuId').data("kendoDropDownList").select(0);
	$('#upperMenuId').data("kendoDropDownList").enable(false);
    $('#tmpUpperMenuId').val(v.UPPER_MENU_ID);
	$('#menuId').val(v.MENU_ID);
	$('#menuName').val(v.MENU_NAME);
	$('#menuType').data("kendoDropDownList").value(v.MENU_TYPE);
	$('#menuType').data("kendoDropDownList").trigger("change");
	if(v.MENU_TYPE == "b"){
		$("#boardId").data("kendoDropDownList").value(v.MENU_PATH.slice(-1));
	}
	$('#menuPath').val(v.MENU_PATH);
	$('#menuIcon').data("kendoDropDownList").value(v.MENU_ICON);
	$('#menuDepth').val(v.MENU_DEPTH);
	$('#sort').val(v.SORT);
	$('#active').data("kendoDropDownList").value(v.ACTIVE);
	$("#saveBtn").show();
}

function setMenu(){
	var flag = true;

	if(!$("#tmpUpperMenuId").val()){
		alert("상위메뉴를 선택해주세요.");
		flag = false;
		return;
	}else if(!$("#menuName").val()){
		alert("메뉴이름을 입력해주세요.");
		flag = false;
		return;
	}else if(!$("#sort").val()){
		alert("메뉴순서를 입력해주세요.");
		flag = false;
		return;
	}else if(!$("#menuDepth").val()){
		alert("상위메뉴를 선택해주세요.");
		flag = false;
		return;
	}else if(!$("#menuPath").val()){
		alert("메뉴경로를 입력해주세요.");
		flag = false;
		return;
	}else if(!$("#menuIcon").val()){
		alert("메뉴에 사용하실 아이콘을 선택해주세요.");
		flag = false;
		return;
	}else if(!$("#active").val()){
		alert("사용유무를 선택해주세요.");
		flag = false;
		return;
	}

	if(confirm("저장하시겠습니까?")){
		if(flag){
			var data = {
				"menuId" : $("#menuId").val(),
				"upperMenuId" : $("#tmpUpperMenuId").val(),
				"menuName" : $("#menuName").val(),
				"menuType" : $("#menuType").val(),
				"sort" : $("#sort").val(),
				"menuDepth" : $("#menuDepth").val(),
				"menuPath" : $("#menuPath").val(),
				"menuIcon" : $("#menuIcon").val(),
				"active" : $("#active").val(),
				"loginEmpSeq" : $("#loginEmpSeq").val(),
			}

			$.ajax({
				url : getContextPath() + '/system/setMenu.do',
				data : data,
				dataType : "json",
				type : "POST",
				async : false,
				success : function (){
					alert("메뉴가 등록 되었습니다.");
					$("#menuTreeView").data("kendoTreeView").destroy();
					makeTreeView();
				},
				error : function (){
					alert("메뉴 등록 중 에러가 발생했습니다.");
				}
			})
		}else{
			alert("입력값을 확인해주세요.");
		}
	}
}

function setMenuDel(){
	if(!$("#menuId").val()){
		alert("삭제 할 메뉴를 선택해주세요.");
		return;
	}

	if(confirm("삭제 시 해당 메뉴와 하위 메뉴 전체를 사용할 수 없습니다.\n선택한 메뉴를 삭제 하시겠습니까?")){
		var data = {
			"menuId" : $("#menuId").val(),
		}

		$.ajax({
			url : getContextPath() + '/system/setMenuDel.do',
			data : data,
			dataType : "json",
			type : "POST",
			async : false,
			success : function (){
				alert("메뉴가 삭제 되었습니다.");
				$("#menuTreeView").data("kendoTreeView").destroy();
				makeTreeView();
			},
			error : function (){
				alert("메뉴 삭제 중 에러가 발생했습니다.");
			}
		})
	}

}

</script>
</body>