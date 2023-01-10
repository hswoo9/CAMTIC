/**
 * 2022.06.28 by. jsy
 * 마이페이지 > 복무 > 출장
 *
 * 순서
 * 0. variable
 * 1. DataSource
 * 2. Grid Funtion
 * 3. CRUD Funtion
 * 4. Kendo data set
 */

var menuCd = $("#menuCd").val();

/**
 *  출장신청 리스트 DataSource
 *  url : /bustrip/getBustripReqList.do
 */
var bustripReqDataSource = new kendo.data.DataSource({
	serverPaging: false,
	transport: {
		read : {
			url : "/bustrip/getBustripReqList.do",
			dataType : "json",
			type : "post"
		},
		parameterMap: function(data, operation) {
			data.empSeq = $("#empSeq").val();
			data.status = $("#status").val();
			data.startDay = $("#start_day").val();
			data.endDay = $("#end_day").val();

			return data;
		}
	},
	schema : {
		data: function (data) {
			return data.data;
		},
		total: function (data) {
			return data.data.length;
		},
	}
});

/**
 *  동반자 추가용 유저리스트 DataSource
 *  url : /bustrip/getUserList.do
 */
var userListDataSource = new kendo.data.DataSource({
	serverPaging: false,
 	transport: {
 		read : {
 			url : "/bustrip/getUserList.do",
 			dataType : "json",
 			type : "post"
 		},
 		parameterMap: function(data, operation) {
 			data.empSeq = $("#empSeq").val();
			data.searchOrgCode = $("#searchOrgCode").val();
			data.searchValue = $("#searchValue").val().trim();

 			return data;
 		}
 	},
 	schema : {
 		data: function (data) {
 			return data.data;
 		},
 		total: function (data) {
 			return data.data.length;
 		},
 	}
});











/**
 *  KendoGrid List
 *  1. bustripReqMainGrid (출장신청 리스트)
 *  2. userListGrid (동반자 추가용 유저리스트)
 *  3. bustripReqResultMainGrid (출장결과 리스트)
 */
function bustripReqMainGrid(){
	var grid = $("#mainGrid").kendoGrid({
		dataSource: bustripReqDataSource,
		height: 300,
	    sortable: true,
	    scrollable: true,
		toolbar : [
			{
				name : 'button',
				template : function (e){
					return '<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="setBustripDelete()">' +
						   '	<span class="k-button-text">선택삭제</span>' +
						   '</button>';
				}
			}, {
				name : 'excel',
				text: '출장신청 개인 내역 다운로드'
			}, {
				name : 'button',
				template : function (e){
					return '<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="gridReload()">' +
						   '	<span class="k-button-text">결재완료 확인(새로고침)</span>' +
						   '</button>';
				}
			}
		],
		excel : {
			fileName : "출장내역 저장 목록.xlsx",
			filterable : true
		},
		noRecords: {
			template: "데이터가 존재하지 않습니다."
		},
		columns: [
			{
				headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" class="k-checkbox checkbox"/>',
				template : "<input type='checkbox' id='bustripPk#=hr_biz_req_id#' name='bustripPk' value='#=hr_biz_req_id#' class='k-checkbox checkbox'/>",
				width: 50
			}
			, { field: "request_date", title: "신청일", width: 80 }
			, { field: "emp_name", title: "성명", width: 80 }
			, { field: "trip", title: "출장구분", width: 80 }
			, { field : "nation", title : "국가", width: 80 }
			, { title : "출장기간", template : "<span>#=stime#</br>#=etime#</span>", width: 100 }
			, { field : "title", title : "제목(출장목적)", width: 250}
			, { 
				field : "status",
				title : "결재상태",
				template : function(e){
					if(e.status == "0"){
						return "미결재";
					} else if (e.status == "10"){
						return "상신";
					} else if (e.status == "30"){
						return "반려";
					} else if (e.status == "40"){
						return "회수";
					} else if (e.status == "50"){
						return "재상신";
					} else if (e.status == "100"){
						return "종결";
					} else if (e.status == "111"){
						return "임시저장";
					} else{
						return "결재진행중"
					}
				},
				width: 80
			}, {
				title : "기안",
				template : function(e){
					if(e.status == "0"){
						return "<button type='button' class='k-button k-button-md k-rounded-md k-button-solid k-button-solid-base' onclick=\"bustripDrafting("+e.hr_biz_req_id+", 'drafting')\">" +
	                        "<span class='k-icon k-i-track-changes-accept k-button-icon'></span>" +
	                        "<span class='k-button-text'>상신</span>" +
	                        "</button>";
	                } else if(e.status == "30" || e.status == "40"){
	                    return "<button type='button' class='k-button k-button-md k-rounded-md k-button-solid k-button-solid-base' onclick=\"bustripReDrafting("+e.doc_id+", "+e.hr_biz_req_id+", 'reDrafting')\">" +
	                        "<span class='k-icon k-i-track-changes-accept k-button-icon'></span>" +
	                        "<span class='k-button-text'>재상신</span>" +
	                        "</button>";
	                } else if(e.status == "10" || e.status == "20" || e.status == "50"){
	                    return '<button type="button" class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="docApprovalRetrieve('+e.doc_id+',\'episTrip_'+e.hr_biz_req_id+'\',\'retrieve\')">' +
	                        "<span class='k-icon k-i-track-changes-reject k-button-icon'></span>" +
	                        "<span class='k-button-text'>회수</span>" +
	                        "</button>";
	                } else if(e.status == "100"){
	                    return "-";
	                } else if(e.status == "111"){
							return "<button type='button' class='k-button k-button-md k-rounded-md k-button-solid k-button-solid-base' onclick=\"bustripTempDrafting("+e.doc_id+", "+e.hr_biz_req_id+", 'tempDrafting')\">" +
								"<span class='k-icon k-i-track-changes-accept k-button-icon'></span>" +
								"<span class='k-button-text'>상신</span>" +
								"</button>";
					} else {
						return "<button type='button' class='k-button k-button-md k-rounded-md k-button-solid k-button-solid-base' onclick=\"bustripDrafting("+e.hr_biz_req_id+", 'drafting')\">" +
	                        "<span class='k-icon k-i-track-changes-accept k-button-icon'></span>" +
	                        "<span class='k-button-text'>상신</span>" +
	                        "</button>";
	                }
				},
				width: 80
			}
		]
	}).data("kendoGrid");
}

/*출장동반자 리스트*/
function userListGrid(){
	var grid =  $("#userListGrid").kendoGrid({
		dataSource: userListDataSource,
		height: 300,
		sortable: true,
		scrollable: true,
		noRecords: {
			template: "데이터가 존재하지 않습니다."
		},
		columns: [
			{
				headerTemplate: '<input type="checkbox" id="userCheckAll" name="userCheckAll" class="k-checkbox checkbox"/>',
				template : "<input type='checkbox' id='userPk#=empSeq#' name='userPk' value='#=empSeq#' class='k-checkbox checkbox'/>",
				width: 50
			}
			, { field : "emp_name", title : "성명", width: 70 }
			, { field : "dept_name", title : "조직명", width: 100 }
			, { field : "position_name", title : "직급", width: 50 }
			, { field : "duty_name", title : "직위", width: 50 }
	 	  	, { field : "emp_seq", hidden : true, title : "사원 시퀀스" }
		]
	}).data("kendoGrid");
};

function bustripReqResultMainGrid(){
	var grid = $("#mainGrid").kendoGrid({
		dataSource: bustripReqDataSource,
		height: 300,
        sortable: true,
        scrollable: true,
		toolbar : [
			{
				name : 'button',
				template : function (e){
					return '<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="setBustripResultDelete()">' +
						   '	<span class="k-button-text">선택삭제</span>' +
						   '</button>';
				}
			}, {
				name : 'excel',
				text: '출장신청 개인 내역 다운로드'
			}, {
				name : 'button',
				template : function (e){
					return '<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="gridReload()">' +
						   '	<span class="k-button-text">결재완료 확인(새로고침)</span>' +
						   '</button>';
				}
			}
		],
		excel : {
			fileName : "출장내역 저장 목록.xlsx",
			filterable : true
		},
		noRecords: {
			template: "데이터가 존재하지 않습니다."
		},
		columns: [
			{
				headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" class="k-checkbox checkbox"/>',
				template : "<input type='checkbox' id='bustripPk#=hr_biz_req_id#' name='bustripPk' value='#=hr_biz_req_id#' class='k-checkbox checkbox'/>",
				width: 50
			}
			, { field: "request_date", title: "신청일", width: 80 }
			, { field: "emp_name", title: "성명", width: 80 }
			, { field: "trip", title: "출장구분", width: 80 }
			, { field : "nation", title : "국가", width: 80 }
			, { title : "출장기간", template : "<span>#=stime#</br>#=etime#</span>", width: 100 }
			, { field : "title", title : "제목(출장목적)", width: 250}
			, { 
				field : "status",
				title : "결재",
				template : function(e){
					if(e.status == "0"){
						return "미결재";
					} else if (e.status == "10"){
						return "상신";
					} else if (e.status == "30"){
						return "반려";
					} else if (e.status == "40"){
						return "회수";
					} else if (e.status == "50"){
						return "재상신";
					} else if (e.status == "100" || e.status == "101"){
						return "종결";
					} else if (e.status == "111"){
						return "임시저장";
					} else{
						return "결재진행중"
					}
				},
				width: 80
			}, {
				title : "결과보고 작성",
				template : function(e){
					if (e.status == "100" && e.result == "N"){
						return "<button type='button' class='btn btn-outline-primary' style='height: 20px;' onClick='getBustripReqOne(this);'>결과보고</button>";
					}else if (e.status != "100" && e.result == "N"){
						return "출장신청 최종결재 미완료.";
					} else {
						return "결과보고 작성완료.";
					}
				},
				width: 130
			}, {
				title : "기안",
				template : function(e){
					if (e.result == "Y" && e.status == "100" && e.resultStatus == "0"){
						return "<button type='button' class='k-button k-button-md k-rounded-md k-button-solid k-button-solid-base' onclick=\"bustripResultDrafting("+e.hr_biz_req_result_id+", "+e.hr_biz_req_id+", 'drafting')\">" +
	                        "<span class='k-icon k-i-track-changes-accept k-button-icon'></span>" +
	                        "<span class='k-button-text'>상신</span>" +
	                        "</button>";
	                } else if(e.resultStatus == "30" || e.resultStatus == "40"){
	                    return "<button type='button' class='k-button k-button-md k-rounded-md k-button-solid k-button-solid-base' onclick=\"bustripResultReDrafting("+e.RDocId+", "+e.hr_biz_req_result_id+", "+e.hr_biz_req_id+", 'reDrafting')\">" +
	                        "<span class='k-icon k-i-track-changes-accept k-button-icon'></span>" +
	                        "<span class='k-button-text'>재상신</span>" +
	                        "</button>";
	                } else if(e.resultStatus == "10" || e.resultStatus == "20" || e.resultStatus == "50"){
	                    return '<button type="button" class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="docApprovalRetrieve('+e.RDocId+',\'episTripResult_'+e.hr_biz_req_result_id+'\',\'retrieve\')">' +
	                        "<span class='k-icon k-i-track-changes-reject k-button-icon'></span>" +
	                        "<span class='k-button-text'>회수</span>" +
	                        "</button>";
	                } else if(e.resultStatus == "100" || e.resultStatus == "101"){
	                    return "-";
	                } else if(e.resultStatus == "111"){
						return "<button type='button' class='k-button k-button-md k-rounded-md k-button-solid k-button-solid-base' onclick=\"bustripResultTempDrafting("+e.RDocId+", "+e.hr_biz_req_result_id+", "+e.hr_biz_req_id+", 'tempDrafting')\">" +
							"<span class='k-icon k-i-track-changes-accept k-button-icon'></span>" +
							"<span class='k-button-text'>상신</span>" +
							"</button>";
					} else {
						return "<button type='button' class='k-button k-button-md k-rounded-md k-button-solid k-button-solid-base' onclick=\"bustripResultDrafting("+e.hr_biz_req_result_id+", "+e.hr_biz_req_id+", 'drafting')\">" +
	                        "<span class='k-icon k-i-track-changes-accept k-button-icon'></span>" +
	                        "<span class='k-button-text'>상신</span>" +
	                        "</button>";
	                }
				},
				width: 80
			}, { 
				field : "resultStatus",
				title : "결과보고 결재",
				template : function(e){
					if(e.resultStatus == "0"){
						return "미결재";
					} else if (e.resultStatus == "10"){
						return "상신";
					} else if (e.resultStatus == "30"){
						return "반려";
					} else if (e.resultStatus == "40"){
						return "회수";
					} else if (e.resultStatus == "50"){
						return "재상신";
					} else if (e.resultStatus == "100"){
						return "종결";
					} else if (e.resultStatus == "111"){
						return "임시저장";
					} else{
						return "결과보고 미작성"
					}
				},
				width: 80
			}
		]
	}).data("kendoGrid");
};

/* 출장신청 데이터 저장후 상신 페이지 이동 */
function bustripDrafting(hrBizReqId, type){
    popWin = window.open(getContextPath()+"/bustrip/bustripApprovalPop.do?menuCd="+ menuCd +"&type="+ type +"&hrBizReqId="+hrBizReqId, "bustripApprovalPop", "width=1030, height=930, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no");
}

function bustripReDrafting(docId, hrBizReqId, type){
    popWin = window.open(getContextPath()+"/bustrip/bustripApprovalPop.do?menuCd="+ menuCd + "&docId=" + docId + "&type=" + type + "&hrBizReqId="+hrBizReqId, "bustripApprovalPop", "width=1030, height=930, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no");
}

function bustripTempDrafting(docId, hrBizReqId, type) {
	popWin = window.open(getContextPath()+"/bustrip/bustripApprovalPop.do?menuCd="+ menuCd + "&docId=" + docId + "&type=" + type + "&hrBizReqId="+hrBizReqId, "bustripApprovalPop", "width=1030, height=930, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no");
}

/* 출장결과보고 데이터 저장후 상신 페이지 이동 */
function bustripResultDrafting(hrBizReqResultId, hrBizReqId, type){
    popWin = window.open(getContextPath()+"/bustrip/bustripResultApprovalPop.do?menuCd="+ menuCd +"&type="+ type +"&hrBizReqResultId="+hrBizReqResultId+"&hrBizReqId="+hrBizReqId, "bustripResultApprovalPop", "width=1030, height=930, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no");
}

function bustripResultReDrafting(docId, hrBizReqResultId, hrBizReqId, type){
    popWin = window.open(getContextPath()+"/bustrip/bustripResultApprovalPop.do?menuCd="+ menuCd + "&docId=" + docId + "&type=" + type + "&hrBizReqResultId="+hrBizReqResultId+"&hrBizReqId="+hrBizReqId, "bustripResultApprovalPop", "width=1030, height=930, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no");
}

function bustripResultTempDrafting(docId, hrBizReqResultId, hrBizReqId, type) {
	popWin = window.open(getContextPath()+"/bustrip/bustripResultApprovalPop.do?menuCd="+ menuCd + "&docId=" + docId + "&type=" + type + "&hrBizReqResultId="+hrBizReqResultId+"&hrBizReqId="+hrBizReqId, "bustripResultApprovalPop", "width=1030, height=930, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no");
}

function bustripResultApprovalRetrieve(docId, hrBizReqResultId, type){
    if(confirm("문서를 회수하시겠습니까?")){
        $.ajax({
            url : getContextPath()+"/approval/setApproveRetrieve.do",
            data : {
                empSeq : $("#empSeq").val(),
                docId : docId,
                hrBizReqResultId : hrBizReqResultId,
                approveEmpSeq : $("#empSeq").val(),
                cmCodeNm : type
            },
            type : 'POST',
            dataType : "json",
            async : false,
            success : function (){
                alert("문서가 회수되었습니다.");
                gridReload();
            },
            error : function(){
                alert("문서가 회수 중 에러가 발생했습니다.");
            }
        })
    }
}

/* 그리드 행 선택시 체크박스 선택 */
function onClick(e) {
	if ($(e.target).hasClass("k-checkbox")) {
		return;
	}
	var row = $(e.target).closest("tr");
	var checkbox = $(row).find(".k-checkbox");
	checkbox.click();
}

/* #mainGrid 그리드 리로드 */
function gridReload(){
	$("#mainGrid").data("kendoGrid").dataSource.read();
}

/* #userListGrid 그리드 리로드 */
function userListGridReload() {
	$("#userListGrid").data("kendoGrid").dataSource.read();
}











/* 출장신청 데이터 저장 */
function setBustripInsert() {
	var apply_date = $("#apply_date").val().replace(/-/gi, "");
	var trip_code = $("#trip_code").val();
	var nation_code = $("#nation_code").val();
	var trip_local = $("#trip_local").val();
	var trip_day_fr = $("#trip_day_fr").val().replace(/-/gi, "");
	var trip_day_to = $("#trip_day_to").val().replace(/-/gi, "");
	var trip_time_fr = $("#trip_time_fr").val().replace(/:/gi, "");
	var trip_time_to = $("#trip_time_to").val().replace(/:/gi, "");
	var title = $("#title").val();
	var use_car = $('input[name="use_car"]:checked').val();
	var trip_subject = $("#trip_subject").val();
	var time_card = $("#time_card").val();
	var trip_cp = $("#trip_cp").val();
	var use_trspt = $("#use_trspt").val();
	var move_dst = $("#move_dst").val();
	var erp_emp_num = $("#erpEmpNum").val();
	var emp_name = $("#empName").val();
	var emp_seq = $("#empSeq").val();
	var dept_seq = $("#deptSeq").val();
	var duty_code = $("#dutyCode").val();
	var position_code = $("#positionCode").val();
	
	if (trip_local == '' || trip_local == ' ') {
		alert("출장지를 입력해주세요.");
		$("#trip_local").focus();
		return false;
	}

	if (title == '' || title == ' ') {
		alert("출장목적(사유)를 입력해주세요.");
		$("#title").focus();
		return false;
	}
	
	if (empSeq == '' || empSeq == "undefined" || empSeq == null) {
		alert("로그인이 정상적으로 이루워지지 않았습니다. 재로그인 후 다시 시도해주세요.");
		return false;
	}
	
	if(!confirm("출장신청 데이터를 저장하시겠습니까?")){
		return;
	}
	
	var data = {};
	data.apply_date = apply_date;
	data.trip_code = trip_code;
	data.nation_code = nation_code;
	data.trip_local = trip_local;
	data.trip_day_fr = trip_day_fr;
	data.trip_time_fr = trip_time_fr;
	data.trip_day_to = trip_day_to;
	data.trip_time_to = trip_time_to;
	data.title = title;
	data.use_car = use_car;
	data.trip_subject = trip_subject;
	data.time_card = time_card;
	data.trip_cp = trip_cp;
	data.use_trspt = use_trspt;
	data.move_dst = move_dst;
	data.status = status;
	data.erp_emp_num = erp_emp_num;
	data.emp_name = emp_name;
	data.emp_seq = emp_seq;
	data.dept_seq = dept_seq;
	data.duty_code = duty_code;
	data.position_code = position_code;
	
	var sub = new Array();
    
	$.each($('.addData'), function(i, v){
		var subData = {
			userDeptName				: $(v).find('.userDeptName').text(),
			userEmpSeq					: $(v).find('.userEmpSeq').val(),
			userPositionName			: $(v).find('.userPositionName').text(),
			userDutyName				: $(v).find('.userDutyName').text(),
			userEmpName 				: $(v).find('.userEmpName').text()
		}
		sub.push(subData);
	});
	//console.log(sub);
	
	data.companion = JSON.stringify(sub);
	
	//console.log("set Bustrip DATA");
	
	$.ajax({
		url : "/bustrip/setBustripInsert.do",
		type : "post",
		data : data,
		async : false,
		dataType : "json",
		success : function(rs) {
			alert("정상적으로 등록되었습니다.");
			gridReload();
		},
		error : function(e) {
			console.log(e);
			alert("저장중에 오류가 발생하였습니다.");
			gridReload();
		}
	});
}

/* 출장신청 선택삭제 */
function setBustripDelete(){
	if($("input[name='bustripPk']:checked").length == 0){
		alert("신청서를 선택해주세요.");
		return;
	}else if(!confirm("선택한 데이터를 삭제하시겠습니까?")){
		return;
	}

	var changeAr = new Array();
	$("input[name='bustripPk']").each(function(){
		if(this.checked){
			changeAr.push(this.value);
		}
	})

	$.ajax({
		url : "/bustrip/setBustripDelete.do",
		data : {
			changeAr : changeAr
		},
		dataType : "json",
		type : "POST",
		success : function (result){
			var rs = result.result;
			alert(rs.message);
			
			if(rs.code == "200"){
				gridReload();
			}
		}
	})
}

/*출장동반자 추가*/
function fnCheck(){
	userListGrid();
	$(".bustripAdd_bg").addClass("show");
}

/*출장동반자 모달창 닫기*/
function fnCheckClose(){
	$(".bustripAdd_bg").removeClass("show");
}

/* 동반자 추가 */
function setBustripCompanionTable() {
	var empName = []; //성명
    var deptName = []; //조직명
    var positionName = []; //직급
    var dutyName = []; //직위
    var empSeq = []; //emp_seq

	for(i = 1 ; i <= $("input[name=userPk]:checked").length; i++){
		empName.push($($($("input[name=userPk]:checked")[i-1]).parent()).next().text());
		deptName.push($($($("input[name=userPk]:checked")[i-1]).parent()).next().next().text());
		positionName.push($($($("input[name=userPk]:checked")[i-1]).parent()).next().next().next().text());
		dutyName.push($($($("input[name=userPk]:checked")[i-1]).parent()).next().next().next().next().text());
		empSeq.push($($($("input[name=userPk]:checked")[i-1]).parent()).next().next().next().next().next().text());
		
		var html = "";
		html += '<tr class="addData">'+
				'	<td class="userDeptName" style="text-align:center;">농림수산식품교육문화정보원 '+deptName[i-1]+'</td>'+
				'	<input type="hidden" class="userEmpSeq" value="'+empSeq[i-1]+'">'+
				'	<td class="userPositionName" style="text-align:center;">'+positionName[i-1]+'</td>'+
				'	<td class="userDutyName" style="text-align:center;">'+dutyName[i-1]+'</td>'+
				'	<td class="userEmpName" style="text-align:center;">'+empName[i-1]+'</td>'+
				'	<td class="userDelete" style="text-align:center;">'+
				'		<a href="#main" class="addBtn" onclick="setBustripCompanionDelete(this);">삭제</a>'+
				'	</td>'+
				'</tr>';
		var plusRow = $('#userTable').children();
		plusRow.append(html);
	};
	
	//console.log(empName);
	//console.log(deptName);
	//console.log(positionName);
	//console.log(dutyName);
	//console.log(empSeq);
	
    $("#searchOrgCode").data("kendoDropDownList").select(0);
	$("#searchValue").val("");
	fnCheckClose();
}

/*출장동반자 삭제*/
function setBustripCompanionDelete(e) {
	var tr = $(e).parent().parent();
	tr.remove();
}

/* 출장신청 데이터 저장 */
function setBustripResultInsert() {
	//alert("test");
	var report_date = $("#report_date").val().replace(/-/gi, "");
	var result = $("#result").val();
	var amt_kr_01 = $("#amt_kr_01").val();
	var amt_kr_02 = $("#amt_kr_02").val();
	var amt_kr_03 = $("#amt_kr_03").val();
	var amt_kr_04 = $("#amt_kr_04").val();
	var amt_ot_01 = $("#amt_ot_01").val();
	var amt_ot_02 = $("#amt_ot_02").val();
	var amt_ot_03 = $("#amt_ot_03").val();
	var amt_ot_04 = $("#amt_ot_04").val();
	var amt_ot_05 = $("#amt_ot_05").val();
	var etc = $("#etc").val();
	var erp_emp_num = $("#erpEmpNum").val();
	var emp_name = $("#empName").val();
	var emp_seq = $("#empSeq").val();
	var dept_seq = $("#deptSeq").val();
	var duty_code = $("#dutyCode").val();
	var position_code = $("#positionCode").val();
	var hrBizReqId = $("#hrBizReqId2").val();
	
	if (result == '' || result == ' ') {
		alert("출장결과보고 주요내용을 입력해주세요.");
		$("#result").focus();
		return false;
	}
	
	if (empSeq == '' || empSeq == "undefined" || empSeq == null) {
		alert("로그인이 정상적으로 이루워지지 않았습니다. 재로그인 후 다시 시도해주세요.");
		return false;
	}
	
	if(!confirm("출장결과 데이터를 저장하시겠습니까?")){
		return;
	}
	
	var data = {};
	data.report_date = report_date;
	data.result = result;
	data.amt_kr_01 = amt_kr_01;
	data.amt_kr_02 = amt_kr_02;
	data.amt_kr_03 = amt_kr_03;
	data.amt_kr_04 = amt_kr_04;
	data.amt_ot_01 = amt_ot_01;
	data.amt_ot_02 = amt_ot_02;
	data.amt_ot_03 = amt_ot_03;
	data.amt_ot_04 = amt_ot_04;
	data.amt_ot_05 = amt_ot_05;
	data.etc = etc;
	data.erp_emp_num = erp_emp_num;
	data.emp_name = emp_name;
	data.emp_seq = emp_seq;
	data.dept_seq = dept_seq;
	data.duty_code = duty_code;
	data.position_code = position_code;
	data.hrBizReqId = hrBizReqId;
	
	console.log("set Bustrip Result DATA");
	
	$.ajax({
		url : "/bustrip/setBustripResultReqInsert.do",
		type : "post",
		data : data,
		async : false,
		dataType : "json",
		success : function(rs) {
			alert("정상적으로 등록되었습니다.");
			gridReload();
		},
		error : function(e) {
			console.log(e);
			alert("저장중에 오류가 발생하였습니다.");
			gridReload();
		}
	});
}

/* 출장신청 선택삭제 */
function setBustripResultDelete(){
	if($("input[name='bustripPk']:checked").length == 0){
		alert("신청서를 선택해주세요.");
		return;
	}else if(!confirm("선택한 데이터를 삭제하시겠습니까?")){
		return;
	}

	var changeAr = new Array();
	$("input[name='bustripPk']").each(function(){
		if(this.checked){
			changeAr.push(this.value);
		}
	})

	$.ajax({
		url : "/bustrip/setBustripResultDelete.do",
		data : {
			changeAr : changeAr
		},
		dataType : "json",
		type : "POST",
		success : function (result){
			var rs = result.result;
			alert(rs.message);
			
			if(rs.code == "200"){
				gridReload();
			}
		}
	})
}

function getBustripReqOne(e) {
	var hrBizReqId = $(e).closest("tr").find("input[name='bustripPk']").val();
	//console.log("getBustripReqOne : ///" + hrBizReqId);
	$.ajax({
		url : "/bustrip/getBustripReqList.do",
        data : {
        	hrBizReqId : hrBizReqId
        },
        dataType : "json",
        async : false,
        success : function(rs){
        	console.log("데이터 조회 : success")
        	//console.log(rs)
            var dataList = rs.data[0];
            var companionList = rs.companionData;
        	var html = "";
        	var companionHtml = "";
			
           	html += '<input type="hidden" id="hrBizReqId2" name="hrBizReqId">' +
   			'	<table class="table table-bordered mb-0">' +
   		    '		<colgroup>' +
   		    '			<col width="20%">' +
   		    '			<col width="30%">' +
   		    '			<col width="20%">' +
   		    '			<col width="30%">' +
   		    '		</colgroup>' +
   		    '		<tbody>' +
   			'			<tr>' +
   			'				<th scope="row" class="text-center th-color"></span>신청일</th>' +
   			'				<td>' +
   			'					<span id="applyDate" name="applyDate" style="width: 80%"></span>' +
   			'				</td>' +
   			'				<th class="text-center th-color"></span>출장구분</th>' +
   			'				<td>' +
   			'					<span id="tripCode" name="tripCode" style="width: 80%"></span>' +
   			'				</td>' +
   			'			</tr>' +
   			'			<tr>' +
   			'				<th scope="row" class="text-center th-color"></span>출장국가</th>' +
   			'				<td>' +
   			'					<span id="nationCode" name="nationCode" style="width: 80%"></span>' +
   			'				</td>' +
   			'				<th class="text-center th-color"></span>출장지</th>' +
   			'				<td>' +
   			'					<span id="tripLocal" name="tripLocal" style="width: 80%"></span>' +
   			'				</td>' +
   			'			</tr>' +
   			'			<tr>' +
   			'				<th scope="row" class="text-center th-color"></span>출장기간</th>' +
   			'				<td colspan="3">' +
   			'					<span id="tripDay" name="tripDay" style="width: 80%"></span>' +
   			'				</td>' +
   			'			</tr>' +
   			'			<tr>' +
   			'				<th scope="row" class="text-center th-color"></span>출장목적(사유)</th>' +
   			'				<td colspan="3">' +
   			'					<span id="title" name="title" style="width: 80%"></span>' +
   			'				</td>' +
   			'			</tr>' +
   			'			<tr>' +
   			'				<th scope="row" class="text-center th-color">업무용 차량 이용여부</th>' +
   			'				<td>' +
   			'					<span id="useCar" name="useCar" style="width: 80%"></span>' +
   			'				</td>' +
   			'				<th class="text-center th-color">여비지출과목</th>' +
   			'				<td>' +
   			'					<span id="tripSubject" name="tripSubject" style="width: 80%"></span>' +
   			'				</td>' +
   			'			</tr>' +
   			'			<tr>' +
   			'				<th scope="row" class="text-center th-color">출근부 대조</th>' +
   			'				<td>' +
   			'					<span id="timeCard" name="timeCard" style="width: 80%"></span>' +
   			'				</td>' +
   			'				<th scope="row" class="text-center th-color">변경사항</th>' +
   			'				<td>' +
   			'					<span id="tripCp" name="tripCp" style="width: 80%"></span>' +
   			'				</td>' +
   			'			</tr>' +
   			'			<tr>' +
   			'				<th scope="row" class="text-center th-color"></span>이용차량</th>' +
   			'				<td>' +
   			'					<span id="useTrspt" name="useTrspt" style="width: 80%"></span>' +
   			'				</td>' +
   			'				<th class="text-center th-color">이용거리(km)</th>' +
   			'				<td>' +
   			'					<span id="moveDst" name="moveDst" style="width: 80%"></span>' +
   			'				</td>' +
   			'			</tr>' +
   			'		</tbody>' +
   			'	</table>';
    			
   			companionHtml += 
   					'<table class="table table-bordered mb-0" id="userTable">'+
               		'<tbody>'+
                   	'<tr>'+
                       '	<th scope="row" class="text-center th-color">소속</th>'+
                       '	<th class="text-center th-color">직급</th>'+
                       '	<th class="text-center th-color">직위</th>'+
                       '	<th class="text-center th-color">성명</th>'+
                   	'</tr>';
			for(var i = 0; i < companionList.length; i++){
				companionHtml += 
					'<tr class="addData">'+
           			'	<td class="userDeptName" style="text-align:center;">농림수산식품교육문화정보원 '+companionList[i].dept_name+'</td>'+
           			'	<td class="userPositionName" style="text-align:center;">'+companionList[i].position_name+'</td>'+
           			'	<td class="userDutyName" style="text-align:center;">'+companionList[i].duty_name+'</td>'+
           			'	<td class="userEmpName" style="text-align:center;">'+companionList[i].emp_name+'</td>'+
           			'</tr>';
        	}
			html += '</tbody>'+
           			'</table>';
			var plusRow = $('.cardGridList_sub');;
			var plusRow2 = $('.cardGridList_sub2');
			plusRow.html(html);
			plusRow2.html(companionHtml);
            //console.log(html);

            $("#hrBizReqId2").val(dataList.hr_biz_req_id);
            $("#applyDate").text(dataList.request_date);
            $("#tripCode").text(dataList.trip);
            $("#nationCode").text(dataList.nation);
            $("#tripLocal").text(dataList.trip_local);
            $("#tripDay").text(dataList.stime + " ~ " + dataList.etime);
            $("#title").text(dataList.title);
            $("#useCar").text(dataList.use_car = 'Y' ? '이용함' : '이용안함');
            $("#tripSubject").text(dataList.trip_subject);
            $("#timeCard").text(dataList.time_card);
            $("#tripCp").text(dataList.trip_cp);
            $("#useTrspt").text(dataList.use_trspt);
            $("#moveDst").text(dataList.move_dst);

            $("#cardGridList").show();
            $("#cardGridResult").show();
            document.location.href='#cardGridList';
        },
        error : function(e){
        	console.log("출장결과 페이지 신청 데이터 불러오는 중 : error");
        	console.log(e);
        }
    })
}











//출장구분 코드
var tripCodeDataSource = new kendo.data.DataSource({
	transport : {
		read : {
			url : "/bustrip/getTripCodeList.do",
			dataType : "json",
			type : "post",
			async : false
		}
	},
	schema : { data : function(response){ return response.list; } }
});

//나라 코드
var nationCodeDataSource = new kendo.data.DataSource({
	transport : {
		read : {
			url : "/bustrip/getNationCodeList.do",
			dataType : "json",
			type : "post",
			async : false
		}
	},
	schema : { data : function(response){ return response.list; } }
});

//이용차량 코드
var useTrsptCodeDataSource = new kendo.data.DataSource({
	transport : {
		read : {
			url : "/bustrip/getUseTrsptCodeList.do",
			dataType : "json",
			type : "post",
			async : false
		}
	},
	schema : { data : function(response){ return response.list; } }
});

//업무용 차량 이용여부 코드
var use_car =[
	{value: "N", label: "이용안함"}, {value: "Y", label: "이용함"}
];

//인사 코드(임시)
var search_condition =[
	{value: "emp_name", text: "성명"}, {value: "dept_name", text: "조직명"}, {value: "duty_name", text: "직급"}, {value: "position_name", text: "직위"}
];

//전자결재상태 코드
var status_code = [
	{value: "", text: "전체"}, {value: "0", text: "미결재"}, {value: "10", text: "상신"}, {value: "20", text: "결재진행중"}, {value: "30", text: "반려"}, {value: "100", text: "종결"}
];

//출장신청 Data set
function bustripReqDataSet() {
	//출장신청일
	$("#apply_date").kendoDatePicker({ depth: "month", start: "month", culture : "ko-KR", format : "yyyy-MM-dd", value : new Date() });
	
	//출장구분
	$("#trip_code").kendoDropDownList({ dataTextField: "text", dataValueField: "value", dataSource: tripCodeDataSource });
	
	//출장국가
	$("#nation_code").kendoDropDownList({ dataTextField: "text", dataValueField: "value", dataSource: nationCodeDataSource });
	
	//출장지
    $("#trip_local").kendoTextBox();
    
    //출장기간 시작일, 종료일, 시작시간, 종료시간
    $("#trip_day_fr").kendoDatePicker({ depth: "month", start: "month", culture : "ko-KR", format : "yyyy-MM-dd", value : new Date() });
    $("#trip_day_to").kendoDatePicker({ depth: "month", start: "month", culture : "ko-KR", format : "yyyy-MM-dd", value : new Date() });
	$("#trip_time_fr").kendoTimePicker({ value: new Date(), format: "HH:mm", componentType:"modern" });
	$("#trip_time_to").kendoTimePicker({ value: new Date(), format: "HH:mm", componentType:"modern" });
	
	//출장목적
	$("#title").kendoTextBox();
	
	//업무용 차량 이용여부
	$("#use_car").kendoRadioGroup({ layout : "horizontal", labelPosition : "after", items: use_car, value: "이용안함" }).data("kendoRadioGroup");
	
    //여비지출과목
    $("#trip_subject").kendoTextBox();
    
    //출근부 대조
    $("#time_card").kendoTextBox();
    
    //변경사항
    $("#trip_cp").kendoTextBox();
	
	//이용차량
    $("#use_trspt").kendoDropDownList({ dataTextField: "text", dataValueField: "value", dataSource: useTrsptCodeDataSource });
    
    //이용거리
	$("#move_dst").kendoTextBox();
	
	//팝업창 부서검색
	$("#searchOrgCode").kendoDropDownList({ dataTextField: "text", dataValueField: "value", dataSource: search_condition });
    
    //팝업창 이름검색
    $("#searchValue").kendoTextBox();
    
    //조회기간 시작
    $("#start_day").kendoDatePicker({ depth: "month", start: "month", culture : "ko-KR", format : "yyyy-MM-dd", value : new Date("2022-07-01") });
	
	//조회기간 끝
	$("#end_day").kendoDatePicker({ depth: "month", start: "month", culture : "ko-KR", format : "yyyy-MM-dd", value : new Date() });
	
	//검색조건 결재
	$("#status").kendoDropDownList({ dataTextField: "text", dataValueField: "value", dataSource: status_code });

    $("#status").data("kendoDropDownList").select(0);
    $("#trip_code").data("kendoDropDownList").select(0);
    $("#nation_code").data("kendoDropDownList").select(31);
    $("#use_trspt").data("kendoDropDownList").select(0);
    $("#use_car").data("kendoRadioGroup").value("N");
    $("#searchOrgCode").data("kendoDropDownList").select(0);
    
    $("#apply_date, #trip_code, #nation_code, #trip_day_fr, #trip_day_to, #trip_time_fr, #trip_time_to, #use_trspt, #searchOrgCode, #start_day, #end_day, #status").attr("readonly", true);
}

//출장결과 Data set
function bustripResultReqDataSet() {
	//보고일
	$("#report_date").kendoDatePicker({ depth: "month", start: "month", culture : "ko-KR", format : "yyyy-MM-dd", value : new Date() });
	
	//출장결과보고
	$("#result").kendoTextArea({ rows: 10, maxLength:200, placeholder: "" });
	
	//국내 식비 교통비 일비 숙박비
    $("#amt_kr_01").kendoTextBox();
    $("#amt_kr_02").kendoTextBox();
    $("#amt_kr_03").kendoTextBox();
    $("#amt_kr_04").kendoTextBox();
	
	//국외 식비 항공료 일비 숙박비 항공마일리지
    $("#amt_ot_01").kendoTextBox();
    $("#amt_ot_02").kendoTextBox();
    $("#amt_ot_03").kendoTextBox();
    $("#amt_ot_04").kendoTextBox();
    $("#amt_ot_05").kendoTextBox();
	
	//출장결과보고
	$("#etc").kendoTextArea({ rows: 10, maxLength:200, placeholder: "" });
	
    //조회기간 시작
    $("#start_day").kendoDatePicker({ depth: "month", start: "month", culture : "ko-KR", format : "yyyy-MM-dd", value : new Date("2022-07-01") });
	
	//조회기간 끝
	$("#end_day").kendoDatePicker({ depth: "month", start: "month", culture : "ko-KR", format : "yyyy-MM-dd", value : new Date() });
	
	//검색조건 결재
	$("#status").kendoDropDownList({ dataTextField: "text", dataValueField: "value", dataSource: status_code });
    $("#status").data("kendoDropDownList").select(0);
    
    $("#report_date, #start_day, #end_day, #status").attr("readonly", true);
}