/**
 * 2022.08.11 kej
 * 전체관리 > 구매계약관리
 *
 */

/**
 * 콤보박스 초기화
 */
commCode = {};
function fnTpfComboBoxInit(groupCode, id, parentEle, selected){
	if(commCode[groupCode]){
		return commCode[groupCode];
	}

	$.ajax({
		url : getContextPath() + "/system/commonCodeManagement/getCmCodeList.do",
		data    : {
			cmGroupCodeId : groupCode
		},
		async   : false,
		type : 'POST',
		success : function(rs) {

			var commCodeList = rs.codeList;
			commCodeList.unshift({CM_CODE_NM : "전체", CM_CODE : ""});
			var itemType = $("." + id, parentEle).kendoDropDownList({
				dataSource : commCodeList,
				dataTextField: "CM_CODE_NM",
				dataValueField: "CM_CODE",
				value : selected
			});
			$('.' + id, parentEle).attr('readonly', true);

			if(selected != null){
				itemType.data("kendoDropDownList").enable(false);
			}

			commCode[groupCode] = rs.rs;
		}
	});
}

function datePickerInit(){
	var toDay = new Date();
	var year = toDay.getFullYear();
	$("#frDt").val('2020' + '-' + '01-01');
	$("#toDt").val(year + '-' + '12-31');
	var datePickerOpt = {
		format: "yyyy-MM-dd",
		culture : "ko-KR",
		change:function(){
			startChange();
		}
	};
	//시작날짜
	$("#frDt").kendoDatePicker(datePickerOpt);
	$("#frDt").attr("readonly",true);
	//종료날짜
	datePickerOpt.change = endChange;
	$("#toDt").kendoDatePicker(datePickerOpt);
	$("#toDt").attr("readonly",true);
	startChange();
	endChange();
}

function startChange() {
	var start = $('#frDt').data("kendoDatePicker");
	var end = $('#toDt').data("kendoDatePicker");
	var startDate = start.value(),
		endDate = end.value();

	if (startDate) {
		startDate = new Date(startDate);
		startDate.setDate(startDate.getDate());
		end.min(startDate);
	} else if (endDate) {
		start.max(new Date(endDate));
	} else {
		endDate = new Date();
		start.max(endDate);
		end.min(endDate);
	}
}

function endChange() {
	var start = $('#frDt').data("kendoDatePicker");
	var end = $('#toDt').data("kendoDatePicker");
	var endDate = end.value(),
		startDate = start.value();

	if (endDate) {
		endDate = new Date(endDate);
		endDate.setDate(endDate.getDate());
		start.max(endDate);
	} else if (startDate) {
		end.min(new Date(startDate));
	} else {
		endDate = new Date();
		start.max(endDate);
		end.min(endDate);
	}
}

function setDatepicker(id, temp){
	var eventEle = $("#" + id);
	eventEle.kendoDatePicker( {
		format : "yyyy-MM-dd",
		culture : "ko-KR",
		value : new Date(),
		change: function (){

			if(temp){
				var value = this.value();
				$("#"+temp).val(eventEle.val());
			}
			var part = eventEle.attr("part");
			if(part){
				abdocu.focusNextRow(eventEle);
			}
			else{
				var tabIndex = eventEle.attr("tabIndex");
				$("[tabindex="+(tabIndex + 1)+"]").focus();
			}
		},
		click: function() {
			alert("aaa");
		},
		open : function (){

		}
	});

	eventEle.attr("readonly",true);
}

function toMoney(){

	var val = (this.valueOf());
	var zero = val.charAt(0);

	var money = val.replace(/\D/g,"");
	var index = money.length - 3;
	while(index >0){
		money = money.substr(0,index) + "," + money.substr(index);
		index -=3;
	}
	if(zero == "-"){
		return "-" + money;
	}else{
		return money;
	}
}

function fnPurcReqDocViewPop(purcReqId,docId){
	var params = {};
	params.loginId = $('#loginId').val();
	params.docId = docId;
	params.mod = 'V';
	outProcessLogOn(params);
}

function fnPurcReqViewPop(purcReqId, purcReqType, formId){
	var url = _g_contextPath_ + '/Ac/G20/Ex/purcReqView.do?focus=txt_BUDGET_LIST&purcReqId=' + purcReqId + '&purcReqType=' + purcReqType + '&form_id=' + formId;
	var pop = "" ;
	var width = "1000";
	var height = "950";
	windowX = Math.ceil( (window.screen.width  - width) / 2 );
	windowY = Math.ceil( (window.screen.height - height) / 2 );
	var strResize = "YES" ;
	pop = window.open(url, '구매의뢰보기', "width=" + width + ", height=" + height + ", top="+ windowY +", left="+ windowX +", resizable="+ strResize +", scrollbars=YES");
	try {pop.focus(); } catch(e){}
}

function fnPurcReqFormPop(purcReqId, purcReqType, formId, contTypeCodeId){
	var action = "purcReqFormSmall";
	var formTp = "tpfPurcReq";
	if(contTypeCodeId != "004" || contTypeCodeId != "4"){
		if(purcReqType == "1"){
			action = "purcReqGoodsForm";
			formTp = "tpfPurcRq1";
		}else if(purcReqType == "2"){
			action = "purcReqShopForm";
			formTp = "tpfPurcRq2";
		}else if(purcReqType == "3"){
			action = "purcReqConstructForm";
			formTp = "tpfPurcRq3";
		}else if(purcReqType == "4"){
			action = "purcReqServiceForm";
			formTp = "tpfPurcRq4";
		}
	}else{
		if(purcReqType == "1"){
			formTp = "tpfPurcRs1";
		}else if(purcReqType == "3"){
			formTp = "tpfPurcRs3";
		}else if(purcReqType == "4"){
			formTp = "tpfPurcRs4";
		}
	}
	var url = _g_contextPath_ + '/Ac/G20/Ex/'+action+'.do?focus=txt_BUDGET_LIST&form_tp=' + formTp + '&purcReqId=' + purcReqId + '&purcReqType=' + purcReqType + '&form_id=' + formId;
	var pop = "" ;
	var popupName = "구매계약보고";
	var width = "1000";
	var height = "950";
	windowX = Math.ceil( (window.screen.width  - width) / 2 );
	windowY = Math.ceil( (window.screen.height - height) / 2 );
	var strResize = "YES" ;

	var options = "width=" + width + ", height=" + height + ", top="+ windowY +", left="+ windowX +", scrollbars=YES, resizable=YES";
	openDialog(url, popupName, options, function(win) {
		gridReLoad();
	});
}

function fnBiddingMng(purcReqId){
	window.open(getContextPath() + "/Ac/G20/Ex/purcBiddingMngPop.do?type=view&purcReqId="+purcReqId, "purcBiddingMng","scrollbars=yes, resizeble=yes, menubar=no, toolbar=no, location=no, directories=yes, status=yes, width=1200, height=565");
}

function getPurcFormCodeInfo(purcFormCode){
	$.ajax({
		type : 'POST',
		async: false,
		url : _g_contextPath_  + '/purcForm/getPurcFormCodeInfo.do',
		data: {
			cmCode : purcFormCode,
			purcFormCode : purcFormCode,
			purcGroupId : $("#purcGroupId").val(),
			purcFile : $("#purcFile").val(),
		},
		dataType : 'json',
		success : function(data) {
			$('.title_NM').html(data.rs.CM_CODE_NM + " 작성");
			$('#purcReqType').val(data.rs.CM_CODE_NM);

			/** 결재작성 클릭시 임시테이블에 데이터 저장
			 * 	결재작성 창 나갈시 임시테이블 저장 값 유지
			 * 	다시 페이지 로딩시 임시테블 저장 값 조회
			 *
			 * 	중복 컬럼 있을시 이전 문서 데이터 출력 후 임시저장 데이터 바꿈
			 * */
			if(data.purcTempInfo.purcData != null){
				settingTempDataInit(data.purcTempInfo.purcData);
			}

			if(data.purcTempInfo.purcFileList.length > 0){
				settingTempFileDataInit(data.purcTempInfo.purcFileList);
			}
		}
	});
}

/** 조직도 팝업 or 모달 */
function deptSearchPopup(){
	windowPopUrl = "/common/deptPopup.do";
	popName = "조직도";
	popStyle = "scrollbars=yes, resizeble=yes, menubar=no, toolbar=no, location=no, directories=yes, status=yes, width=355, height=700";

	window.open(windowPopUrl, popName, popStyle);
}

/** 조직도 팝업 or 모달 닫기 */
function deptPopupClose(deptSeq, deptName){
	$('#purcDeptNm').val(deptName);
	$('#purcDeptSeq').val(deptSeq);
}

var attFiles = new Array();
function addFileInfoTable(){
	for(var i = 0; i < $("input[name='fileList']")[0].files.length; i++){
		attFiles.push($("input[name='fileList']")[0].files[i]);
	}

	if(attFiles.length > 0){
		$("#fileGrid").find(".defultTr").remove();
		$("#fileGrid").find(".addFile").remove();

		var html = '';
		for (var i = 0; i < attFiles.length; i++) {
			html += '<tr style="text-align: center" class="addFile">';
			html += '   <td>' + attFiles[i].name.split(".")[0] + '</td>';
			html += '   <td>' + attFiles[i].name.split(".")[1] + '</td>';
			html += '   <td>' + attFiles[i].size + '</td>';
			html += '   <td>';
			html += '       <input type="button" value="삭제" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="fnUploadFile(' + i + ')">'
			html += '   </td>';
			html += '</tr>';
		}

		$("#fileGrid").append(html);
	}
}

function fnUploadFile(e) {
	const dataTransfer = new DataTransfer();
	let fileArray = Array.from(attFiles);
	fileArray.splice(e, 1);
	fileArray.forEach(file => {
		dataTransfer.items.add(file);
	});

	attFiles = dataTransfer.files;

	if(attFiles.length > 0){
		$("#fileGrid").find(".addFile").remove();

		var html = '';
		for (var i = 0; i < attFiles.length; i++) {
			html += '<tr style="text-align: center" class="addFile">';
			html += '   <td>' + attFiles[i].name.split(".")[0] + '</td>';
			html += '   <td>' + attFiles[i].name.split(".")[1] + '</td>';
			html += '   <td>' + attFiles[i].size + '</td>';
			html += '   <td>';
			html += '       <input type="button" value="삭제" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="fnUploadFile(' + i + ')">';
			html += '   </td>';
			html += '</tr>';
		}

		$("#fileGrid").append(html);
	}else{
		$("#fileGrid").find(".addFile").remove();

		if($("#fileGrid").find("tr").length == 0){
			$("#fileGrid").html('<tr>' +
				'	<td colspan="4" style="text-align: center">선택된 파일이 없습니다.</td>' +
				'</tr>');
		}
	}

	if(attFiles.length == 0){
		attFiles = new Array();
	}

}

