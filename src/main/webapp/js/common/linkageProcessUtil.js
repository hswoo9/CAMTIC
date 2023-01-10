function linkageProcessOn(params){
	var form = $('#linkageProcessFormData');
	var url = "";
	if(location.host.indexOf("127.0.0.1") > -1 || location.host.indexOf("localhost") > -1){
   		form.prop("action", "/linkageProcessOn.do");
		url  = "/approval/approvalDraftingPop.do";
	}else{
		form.prop("action", "/linkageProcessOn.do");
		url  = "/approval/approvalDraftingPop.do";
	}

	setLinkageProcessDocInterlock(params);

	url = makeParames(params, form, url);
	url = url.replace("&", "?");
	window.open(url, "viewer", "width=965, height=900, resizable=yes, scrollbars = yes, status=no, top=50, left=50", "newWindow");
}

function makeParames(params, form, url){
	if(params.linkageProcessCode){
		var linkageProcessCode = $('<input type="hidden" name="linkageProcessCode"/>');
		linkageProcessCode.val(params.linkageProcessCode);
		form.append(linkageProcessCode);
		url += "&linkageProcessCode="+params.linkageProcessCode;
	}
	if(params.docType){
		var docType = $('<input type="hidden" name="docType"/>');
		docType.val(params.docType);
		form.append(docType);
		url += "&docType="+params.docType;
	}
	if(params.approKey){
		var approKey = $('<input type="hidden" name="approKey"/>');
		approKey.val(params.approKey);
		form.append(approKey);
		url += "&approKey="+params.approKey;
	}
	if(params.mod){
		var mod = $('<input type="hidden" name="mod"/>');
		mod.val(params.mod);
		form.append(mod);
		url += "&mod="+params.mod;
	}
	if(params.formId){
		var formId = $('<input type="hidden" name="formId"/>');
		formId.val(params.formId);
		form.append(formId);
		url += "&formId="+params.formId;
	}
	if(params.compSeq){
		var compSeq = $('<input type="hidden" name="compSeq"/>');
		compSeq.val(params.compSeq);
		form.append(compSeq);
		url += "&compSeq="+params.compSeq;
	}
	if(params.empSeq){
		var empSeq = $('<input type="hidden" name="empSeq"/>');
		empSeq.val(params.empSeq);
		form.append(empSeq);
		url += "&empSeq="+params.empSeq;
	}
	if(params.type){
		var type = $('<input type="hidden" name="type"/>');
		type.val(params.type);
		form.append(type);
		url += "&type="+params.type;
	}
	if(params.menuCd){
		var menuCd = $('<input type="hidden" name="menuCd"/>');
		menuCd.val(params.menuCd);
		form.append(menuCd);
		url += "&menuCd="+params.menuCd;
	}
	if(params.docId){
		var docId = $('<input type="hidden" name="docId"/>');
		docId.val(params.docId);
		form.append(docId);
		url += "&docId="+params.docId;
	}
	return url;
}

function setLinkageProcessDocInterlock(params){
	if(params.mod == "W"){
		var data = {};
		data.docId = params.docId;
		data.empSeq = params.empSeq;
		data.approKey = params.approKey;
		data.docContents = params.content;
		console.log(data);
		$.ajax({
			type : 'POST',
			async: false,
			url : '/linkageProcess/setLinkageProcessDocInterlock.do',
			data: data,
			dataType : 'json',
			success : function(data) {
				if(data.resultCode == "SUCCESS"){
					console.log("SUCCESS");
				}
			}
		});
	}
}

function approveDocView(docId, approKey, menuCd){
	var pop = "" ;
	var url = _g_contextPath_ + '/approval/approvalDocView.do?docId='+docId+'&menuCd=' + menuCd + '&approKey='+approKey;
	var width = "1000";
	var height = "950";
	windowX = Math.ceil( (window.screen.width  - width) / 2 );
	windowY = Math.ceil( (window.screen.height - height) / 2 );
	pop = window.open(url, '결재 문서', "width=" + width + ", height=" + height + ", top="+ windowY +", left="+ windowX +", resizable=NO, scrollbars=NO");
	//pop.focus();
}

function docApproveLineView(docId){
	var pop = "" ;
	var url = _g_contextPath_ + '/approval/approvalLineViewPop.do?docId='+docId;
	var width = "1000";
	var height = "355";
	windowX = Math.ceil( (window.screen.width  - width) / 2 );
	windowY = Math.ceil( (window.screen.height - height) / 2 );
	pop = window.open(url, '결재선 보기', "width=" + width + ", height=" + height + ", top="+ windowY +", left="+ windowX +", resizable=NO, scrollbars=NO");
}

function docApprovalRetrieve(docId, approKey, type){
	if(approKey.indexOf("_") < 0){
		alert("시스템 연동키가 올바르지 않습니다.");
		return;
	}

	if(confirm("문서를 회수하시겠습니까?")){
		$.ajax({
			url : getContextPath()+"/approval/setApproveRetrieve.do",
			data : {
				linkageProcessCode : approKey.split("_")[0],
				docId : docId,
				approKey : approKey,
				empSeq : $("#empSeq").val(),
				approveEmpSeq : $("#empSeq").val(),
				cmCodeNm : type,
				type : type
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
