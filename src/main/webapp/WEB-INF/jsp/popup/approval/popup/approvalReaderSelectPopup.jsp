<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<jsp:include page="/WEB-INF/jsp/template/common.jsp" flush="true"></jsp:include>
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js'/>"></script>
<style>
	.k-treeview .k-i-collapse:before{background: url("/images/ico/ico_organ03_open.png");content: "";}
	.k-treeview .k-i-expand:before{background: url("/images/ico/ico_organ03_close.png");content: "";}
	.k-treeview .k-treeview-top.k-treeview-bot .k-i-collapse:before{background: url("/images/ico/ico_organ01.png")}
	.k-treeview .k-treeview-top.k-treeview-bot .k-i-expand:before{background: url("/images/ico/ico_organ01.png")}

	.k-treeview .k-i-collapse-disabled, .k-treeview .k-i-expand-disabled {
		cursor: default
	}
	.k-treeview .k-treeview-top, .k-treeview .k-treeview-mid, .k-treeview .k-treeview-bot {
		background-image: url('/images/bg/treeview-nodes.png');
		background-repeat: no-repeat;
		margin-left: -16px;
		padding-left: 16px;
	}
	.k-treeview .k-item { background-image: url('/images/bg/treeview-line.png'); }
	.k-treeview .k-last { background-image: none; }
	.k-treeview .k-treeview-top { background-position: -91px 2px; }
	.k-treeview .k-treeview-bot { background-position: -69px -17px; }
	.k-treeview .k-treeview-mid { background-position: -47px -42px; }
	/*.k-treeview .k-last .k-treeview-top { background-position: -25px -62px; }*/
	.k-treeview .k-group .k-last .k-treeview-bot { background-position: -69px -22px; }
	.k-treeview .k-item {
		background-repeat: no-repeat;
	}
	.k-treeview .k-treeview-top.k-treeview-bot{background: none;}

	.k-treeview .k-first {
		background-repeat: no-repeat;
		background-position: 0 16px;
	}

	.k-grid-toolbar{
		justify-content: flex-end !important;
	}

	.k-grid-norecords{
		justify-content: space-around;
	}
	#readerListDataTb tbody tr:hover:not(.active) {
		background-color: #ededed;
	}
	.active{
		background-color: rgb(241, 248, 255);
	}
	#treeViewDiv{
		width: auto !important;
		font-size: 12px;
		line-height: 1.4;
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

	.top_box{
		position: relative;
		border-radius : 0;
		background-color: initial;
	}

	.pop_con {
		padding: 20px 16px;
	}
</style>
</head>
<body>
	<div class="pop_head">
		<h1>
            열람자 선택
		</h1>
		<a href="#n" class="clo"><img src="<c:url value='/images/btn/btn_pop_clo01.png'/>" alt=""></a>
	</div>

	<div class="pop_con">
		<input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
		<table style="width: 100%">
			<colgroup>
				<col width="20%">
				<col width="31%">
				<col width="49%">
			</colgroup>
			<tr>
				<td rowspan="2">
					<div id="orgChartTabStrip">
						<ul>
							<li class="k-state-active">
								조직도
							</li>
						</ul>
						<div id="gridForm" style="height:484px; width: 255px;overflow: auto;border: 1px solid #dedfdf;">
							<div id="treeViewDiv">

							</div>
						</div>
					</div>
				</td>
				<td>
					<div id="deptUserInfoTabStrip">
						<ul>
							<li class="k-state-active">
								직원정보
							</li>
						</ul>
						<div id="gridForm2" style="height:484px;width:600px;border: 1px solid #dedfdf;">
							<div id="deptUserGrid">

							</div>
						</div>
					</div>
				</td>
				<td>
					<div id="readerTabStrip" style="width: 410px;">
						<ul>
							<li class="k-state-active">
                                열람자
							</li>
						</ul>
						<div>
							<div style="text-align: right">
								<button type="button" class="k-grid-add k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="rowDblClick()" style="margin-bottom: 5px;">
									<span class="k-button-text">삭제</span>
								</button>
								<table class="table table-bordered mb-0" style="display: none;border: 0; border: 1px solid #dedfdf;">
									<colgroup>
										<col width="20%">
									</colgroup>
									<tbody>
										<tr>
											<th class="text-center th-color">열람기간</th>
											<td style="text-align: center">
												<input type="text" id="readingStartDt" style="width: 40%;"> ~ <input type="text" id="readingEndDt" style="width: 40%;">
											</td>
										</tr>
									</tbody>
								</table>

							</div>
							<div id="readerListDataDiv" style="max-height: 366px; height:366px; overflow-y: scroll;border: 1px solid #dedfdf;margin-top: 5px" >
								<table class="table table-bordered mb-0" id="readerListDataTb" style="border:none;text-align: center;">
									<colgroup>
										<col width="10%">
										<col width="33.3%">
										<col width="33.3%">
										<col width="33.3%">
									</colgroup>
									<thead>
										<th class="th-color text-center" style="border-left: none;border-top:none;border-right: 1px solid #dee2e6;"></th>
										<th class="th-color text-center" style="border-left: none;border-top:none;border-right: 1px solid #dee2e6;">이름</th>
										<th class="th-color text-center" style="border-top:none;border-right: 1px solid #dee2e6;">부서</th>
										<th class="th-color text-center" style="border-top:none;">직책</th>
									</thead>
									<tbody>

									</tbody>
								</table>
							</div>
						</div>
					</div>
				</td>
			</tr>
		</table>
		<div style="text-align: right; margin-top : 15px">
			<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="addReader()">
				<span class="k-button-text">확인</span>
			</button>
			<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="window.close()">
				<span class="k-button-text">닫기</span>
			</button>
		</div>
	</div>
</div>

<script>
	var datas = JSON.parse('${data}');
	var deptSeq = '${loginVO.orgnztId}';
	var deptName = '${loginVO.orgnztNm}';
	var now = new Date();

	$(document).ready(function(){
		$("#orgChartTabStrip, #deptUserInfoTabStrip, #readerTabStrip").kendoTabStrip({
			animation:  {
				open: {
					effects: "fadeIn"
				}
			}
		});
	})

	$(function(){
		$("#treeViewDiv").kendoTreeView({
			dataSource: datas,
			dataTextField:['dept_name'],
			select: treeClick,
		});
	});

	customKendo.fn_datePicker("readingStartDt", '', "yyyy-MM-dd", new Date());
	customKendo.fn_datePicker("readingEndDt", '', "yyyy-MM-dd", "9999-12-31");

	/**
	 *  조직도
	 */
	function treeClick(e){
		var item = $("#treeViewDiv").data("kendoTreeView").dataItem(e.node);
		deptSeq = item.dept_seq;
		$("#deptUserGrid").data("kendoGrid").dataSource.read();
	}

	function datareSource(datas){
		if('${userInfo.bizSeq}' != '10000101') {
			$.each(datas[0].items, function(i, v){
				if(v.biz_seq == '${userInfo.bizSeq}'){
					datas[0].items = [v];
				}
			});
		}
		return datas;
	}

	/**
	 * 부서별 직원
	 */
	var deptUserDataSource = new kendo.data.DataSource({
		serverPaging: false,
		transport: {
			read : {
				url : getContextPath() + '/userManagement/getUsrList.do',
				dataType : "json",
				type : "post",
				async : false
			},
			parameterMap: function(data, operation) {
				data.DEPT_SEQ = deptSeq;
				data.workStatus = "999";
				return data;
			}
		},
		schema : {
			data: function (data) {
				data.rs.unshift(getDept(deptSeq));

				return data.rs;
			},
			total: function (data) {
				return data.rs.length;
			},
		},
		pageSize: 10,
	});

	var deptUserGrid = $("#deptUserGrid").kendoGrid({
		dataSource: deptUserDataSource,
		height: 452,
		sortable: true,
		scrollable: true,
		noRecords: {
			template: "데이터가 존재하지 않습니다."
		},
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
		columns: [
			{
				field : 'emp_name',
				title : "이름",
				template : function(e){
					if(e.emp_name){
						return e.emp_name;
					}else{
						return e.dept_name;
					}
				}
			}, {
				field : 'dept_name',
				title : "부서"
			}, {
				field : 'position_name',
				title : "직급"
			}, {
				field : 'duty_name',
				title : "직책"
			}, {
				title : "선택",
				template : function (e){
					if(e.emp_name){
						return "<button type=\"button\" class=\"k-button k-button-md k-rounded-md k-button-solid k-button-solid-base\" onclick=\"addTable("+e.emp_seq+", this, 'userClick')\">" +
								'	<span class="k-icon k-i-check k-button-icon"></span>' +
								'	<span class="k-button-text">선택</span>' +
								'</button>';
					}else{
						return "<button type=\"button\" class=\"k-button k-button-md k-rounded-md k-button-solid k-button-solid-base\" onclick=\"addTable("+e.dept_seq+", this, 'deptClick')\">" +
								'	<span class="k-icon k-i-check k-button-icon"></span>' +
								'	<span class="k-button-text">선택</span>' +
								'</button>';
					}

				}
			}
		]
	}).data("kendoGrid");

	function getDept(e){
		var result;

		$.ajax({
			url      : getContextPath() + "/common/getDept.do",
			data     : "deptSeq=" + e,
			dataType : "json",
			type     : "post",
			async    : false,
			success  : function (rs) {
				result = rs.rs;
			}
		})
		return result;
	}

	var readerArr = opener.draft.global.readersArr != null ? opener.draft.global.readersArr : new Array();
	readerArrCheck();

	function readerArrCheck(){
		var htmlStr = "";
		for(var i = 0; i < readerArr.length; i++){
			if(i == 0 && readerArr[i].readingStartDt != null && readerArr[i].readingEndDt != null){
				$("#readingStartDt").val(readerArr[i].readingStartDt);
				$("#readingEndDt").val(readerArr[i].readingEndDt);
			}

			htmlStr += "<tr onclick=\"rowsel($(this).find('input[name=readerPk]'))\" style='cursor:pointer' class='readerLineTr'>" +
					"		<td style='border-left: none' onclick='event.cancelBubble=true'>" +
					"			<input type='hidden' id='readerId' name='readerId' value='" + readerArr[i].readerId + "'>" +
					"			<input type='hidden' id='seqType' name='seqType' value='" + readerArr[i].seqType + "'>" +
					"			<input type='hidden' id='readerEmpSeq' name='readerEmpSeq' value='" + readerArr[i].readerEmpSeq + "'>" +
					"			<input type='hidden' id='readerEmpName' name='readerEmpName' value='" + readerArr[i].readerEmpName + "'>" +
					"			<input type='hidden' id='readerDeptSeq' name='readerDeptSeq' value='" + readerArr[i].readerDeptSeq + "'>" +
					"			<input type='hidden' id='readerDeptName' name='readerDeptName' value='" + readerArr[i].readerDeptName + "'>" +
					"			<input type='hidden' id='readerDutyCode' name='readerDutyCode' value='" + readerArr[i].readerDutyCode + "'>" +
					"			<input type='hidden' id='readerDutyName' name='readerDutyName' value='" + readerArr[i].readerDutyName + "'>" +
					"			<input type='hidden' id='readerPositionCode' name='readerPositionCode' value='" + readerArr[i].readerPositionCode + "'>" +
                    "			<input type='hidden' id='readerPositionName' name='readerPositionName' value='" + readerArr[i].readerPositionName + "'>" +
					"			<input type='checkbox' id='readerPk" + readerArr[i].readerEmpSeq + "' name='readerPk' value='" + readerArr[i].readerEmpSeq + "' class='k-checkbox checkbox'/>" +
					"		</td>" +
					"		<td>" + readerArr[i].readerEmpName + "</td>" +
					"		<td>" + readerArr[i].readerDeptName + "</td>" +
					"		<td>" + readerArr[i].readerDutyName + "</td>" +
					"	</tr>";
		}

		$("#readerListDataTb tbody").append(htmlStr);
	}

	function addTable(e, v, type){
		if(type == "userClick"){
			$.ajax({
				url: getContextPath() + '/userManagement/getUserInfo.do',
				data : {
					empSeq : e
				},
				dataType: "json",
				type : "post",
				success : function(rs){
					var result = rs.rs;
					var flag = true;
					var htmlStr = "";

					if($("#empSeq").val() != result.EMP_SEQ){
						$.each($("input[name='readerEmpSeq']"), function(i, e){
							if($(this).val() == result.EMP_SEQ){
								flag = false;
							}
						})

						if(flag){
							if(result != null){
								htmlStr += "<tr onclick=\"rowsel($(this).find('input[name=readerPk]'))\" style='cursor:pointer' class='readerLineTr newReaderLine'>" +
										"		<td style='border-left: none' onclick='event.cancelBubble=true'>" +
										"			<input type='hidden' id='seqType' name='seqType' value='u'>" +
										"			<input type='hidden' id='readerEmpSeq' name='readerEmpSeq' value='" + result.EMP_SEQ + "'>" +
										"			<input type='hidden' id='readerEmpName' name='readerEmpName' value='" + result.EMP_NAME_KR + "'>" +
										"			<input type='hidden' id='readerDeptSeq' name='readerDeptSeq' value='" + result.DEPT_SEQ + "'>" +
										"			<input type='hidden' id='readerDeptName' name='readerDeptName' value='" + result.DEPT_NAME + "'>" +
										"			<input type='hidden' id='readerDutyCode' name='readerDutyCode' value='" + result.DUTY_CODE + "'>" +
										"			<input type='hidden' id='readerDutyName' name='readerDutyName' value='" + result.DUTY_NAME + "'>" +
										"			<input type='hidden' id='readerPositionCode' name='readerPositionCode' value='" + result.POSITION_CODE + "'>" +
                                        "			<input type='hidden' id='readerPositionName' name='readerPositionName' value='" + result.POSITION_NAME + "'>" +
										"			<input type='checkbox' id='readerPk" + result.EMP_SEQ + "' name='readerPk' value='" + result.EMP_SEQ + "' class='k-checkbox checkbox'/>" +
										"		</td>" +
										"		<td>" + result.EMP_NAME_KR + "</td>" +
										"		<td>" + result.DEPT_NAME + "</td>" +
										"		<td>" + result.DUTY_NAME + "</td>" +
										"	</tr>";
							}
							$("#readerListDataTb tbody").append(htmlStr);
						}
					}else{
						alert("결재자는 열람 지정이 불가능합니다.");
					}
				}
			})
		}else{
			var grid = $("#deptUserGrid").data("kendoGrid");
			var dataItem = grid.dataItem($(v).closest("tr"));

			var htmlStr = "";
			var flag = true;

			$.each($("input[name='readerDeptSeq']"), function(i, e){
				if($(this).val() == dataItem.dept_seq && $(this).siblings("#seqType").val() == "d"){
					flag = false;
				}
			})

			if(flag){
				htmlStr += "<tr onclick=\"rowsel($(this).find('input[name=readerPk]'))\" style='cursor:pointer' class='readerLineTr newReaderLine'>" +
						"		<td style='border-left: none'>";

				if(dataItem.dept_seq == "1000"){
					htmlStr += "	<input type='hidden' id='seqType' name='seqType' value='c'>";
					htmlStr += "	<input type='hidden' id='readerDeptSeq' name='readerDeptSeq' value='0'>";
				}else{
					htmlStr += "	<input type='hidden' id='seqType' name='seqType' value='d'>";
					htmlStr += "	<input type='hidden' id='readerDeptSeq' name='readerDeptSeq' value='" + dataItem.dept_seq + "'>";
				}

				htmlStr +=  "		<input type='hidden' id='readerDeptName' name='readerDeptName' value='" + dataItem.dept_name + "'>" +
						"			<input type='hidden' id='readerEmpSeq' name='readerEmpSeq' value='0'>" +
						"			<input type='hidden' id='readerEmpName' name='readerEmpName' value='" +  dataItem.dept_name + "'>" +
						"			<input type='hidden' id='readerDutyCode' name='readerDutyCode' value='-'>" +
						"			<input type='hidden' id='readerDutyName' name='readerDutyName' value='-'>" +
						"			<input type='hidden' id='readerPositionCode' name='readerPositionCode' value='-'>" +
						"			<input type='hidden' id='readerPositionName' name='readerPositionName' value='-'>" +
						"			<input type='checkbox' id='readerPk" + dataItem.dept_seq + "' name='readerPk' value='" + dataItem.dept_seq + "' class='k-checkbox checkbox'/>" +
						"		</td>" +
						"		<td>" + dataItem.dept_name + "</td>" +
						"		<td>" + dataItem.dept_name + "</td>" +
						"		<td>-</td>" +
						"	</tr>";
			}

			$("#readerListDataTb tbody").append(htmlStr);
		}

	}

	function rowsel(e){
		// $(".readerLineTr").removeClass("active");
		// $(e).addClass("active");
		// $(".apprLineTr").removeClass("active");
		// $(e).addClass("active");
		if($(e).is(":checked")){
			$(e).prop("checked", false);
			$(e).closest("tr").removeClass("active");
		}else{
			$(e).closest("tr").addClass("active");
			$(e).prop("checked", true);
		}
	}

	function rowDblClick(){
		var chkCnt = $("input[name='readerPk']:checked").length;

		if(chkCnt == 0){
			alert("삭제할 사용자를 선택해주세요.");
			return
		}

		var readerArr = new Array();
		$.each($("#readerListDataTb tbody tr input[name='readerPk']"), function(i, e){
			if($(e).is(":checked")){
				var data = {
					el : e
				}

				if($(e).closest("tr").find("#readerId").val()){
					data.readerId = $(e).closest("tr").find("#readerId").val()
				}

				readerArr.push(data);
				//$(e).closest("tr").remove();
			}
		})

		if(readerArr.length > 0){
			if(confirm("선택한 열람자를 삭제하시겠습니까?")){
				$.each(readerArr, function(e, i){
					if(i.readerId != null){
						var data = {
							readerId : i.readerId
						}

						var result = customKendo.fn_customAjax("/approvalUser/setDocReaderIdDel.do", data);
						if(result.flag){
							if(opener.draft.global.readersArr != null){
								opener.draft.global.readersArr = opener.draft.global.readersArr.filter(element => element.readerId != data.readerId);
							}
							$(i.el).closest("tr").remove();
						}
					}else{
						$(i.el).closest("tr").remove();
					}
				})
			}
		}
	}

	function addReader(){
		readerArr = [];

		var readerEmpNameStr = "";

		$.each($("#readerListDataTb tbody tr"), function(){

			if($(this).find("#seqType").val() == "d"){
				readerEmpNameStr += "," + $(this).find("#readerDeptName").val();
			}else{
				readerEmpNameStr += "," + $(this).find("#readerEmpName").val() + "(" + $(this).find("#readerDutyName").val() + ")";
			}

			var data = {
				docId : $("#docId", opener.parent.document).val(),
				seqType : $(this).find("#seqType").val(),
				readerEmpSeq : $(this).find("#readerEmpSeq").val(),
				readerEmpName : $(this).find("#readerEmpName").val(),
				readerDeptSeq : $(this).find("#readerDeptSeq").val(),
				readerDeptName : $(this).find("#readerDeptName").val(),
				readerDutyCode : $(this).find("#readerDutyCode").val(),
				readerDutyName : $(this).find("#readerDutyName").val(),
				readerPositionCode : $(this).find("#readerPositionCode").val(),
				readerPositionName : $(this).find("#readerPositionName").val(),
				readingStartDt : $("#readingStartDt").val(),
				readingEndDt : $("#readingEndDt").val(),
				empSeq : $("#empSeq", opener.parent.document).val(),
			};

			readerArr.push(data);
		})

		opener.draft.readerSelectPopClose(readerArr, readerEmpNameStr.substring(1));
		window.close();
	}

</script>
</body>
</html>