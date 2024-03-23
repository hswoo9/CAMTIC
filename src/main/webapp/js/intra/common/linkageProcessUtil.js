function linkageProcessOn(params, target){
	var form = $('#linkageProcessFormData');
	var url = "";
	if(location.host.indexOf("127.0.0.1") > -1 || location.host.indexOf("localhost") > -1 || location.host.indexOf("heco") > -1){
		url  = "/approval/approvalDraftingPop.do";
	}else{
		url  = "/approval/approvalDraftingPop.do";
	}

	if(params.linkageType){
		if(params.linkageType == 2){
			form.prop("action", "/linkageProcessOn.do");
			setLinkageProcessDocInterlock(params);
		}
	}else{
		form.prop("action", "/linkageProcessOn.do");
		setLinkageProcessDocInterlock(params);
	}

	url = makeParams(params, form, url);
	url = url.replace("&", "?");

if(params.linkageProcessCode == "camticDelv"){
		window.open(url, "_self", "width=965, height=900, resizable=yes, scrollbars = yes, status=no, top=50, left=50");
	}else if(target == "target") {
        window.open(url, "_target", "width=965, height=900, resizable=yes, scrollbars = yes, status=no, top=50, left=50");
    } else if (params.type == "tempDrafting") {
        window.open(url, "_blank", "width=965, height=900, resizable=yes, scrollbars = yes, status=no, top=50, left=50");
    } else {
		window.open(url, "_self", "width=965, height=900, resizable=yes, scrollbars = yes, status=no, top=50, left=50");
	}
}

function makeParams(params, form, url){
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
	if(params.purcInspFormCode){
		var purcInspFormCode = $('<input type="hidden" name="purcInspFormCode"/>');
		purcInspFormCode.val(params.purcInspFormCode);
		form.append(purcInspFormCode);
		url += "&purcInspFormCode="+params.purcInspFormCode;
	}
	if(params.contentGroup){
		var contentGroup = $('<input type="hidden" name="contentGroup"/>');
		contentGroup.val(params.contentGroup);
		form.append(contentGroup);
		url += "&contentGroup="+params.contentGroup;
	}
	if(params.contentId){
		var contentId = $('<input type="hidden" name="contentId"/>');
		contentId.val(params.contentId);
		form.append(contentId);
		url += "&contentId="+params.contentId;
	}
	if(params.contentPrevValue){
		var contentPrevValue = $('<input type="hidden" name="contentPrevValue"/>');
		contentPrevValue.val(params.contentPrevValue);
		form.append(contentPrevValue);
		url += "&contentPrevValue="+params.contentPrevValue;
	}
	if(params.contentValue){
		var contentValue = $('<input type="hidden" name="contentValue"/>');
		contentValue.val(params.contentValue);
		form.append(contentValue);
		url += "&contentValue="+params.contentValue;
	}
	if(params.befUrl){
		var befUrl = $('<input type="hidden" name="befUrl"/>');
		befUrl.val(params.befUrl.replace(/&/gi, "shift6"));
		form.append(befUrl);
		url += "&befUrl="+params.befUrl.replace(/&/gi, "shift6");
	}
	if(params.linkageType){
		var linkageType = $('<input type="hidden" name="linkageType"/>');
		linkageType.val(params.linkageType);
		form.append(linkageType);
		url += "&linkageType="+params.linkageType;
	}
    if(params.processId){
        var processId = $('<input type="hidden" name="processId"/>');
        processId.val(params.processId);
        form.append(processId);
        url += "&processId="+params.processId;
    }
    if(params.pjtSn){
        var pjtSn = $('<input type="hidden" name="pjtSn"/>');
        pjtSn.val(params.pjtSn);
        form.append(pjtSn);
        url += "&pjtSn="+params.pjtSn;
    }
	if(params.docTitle){
		var docTitle = $('<input type="hidden" name="docTitle"/>');
		var docTitleText = params.docTitle;
		docTitle.val(docTitleText);
        console.log("docTitle", docTitle);
		form.append(docTitle);
		url += "&docTitle="+encodeURI(docTitleText.replaceAll(/&/gi, "%26"));
	}
	if(params.budgetList){
		var budgetList = $('<input type="hidden" name="budgetList"/>');
		budgetList.val(params.budgetList);
		form.append(budgetList);
		url += "&budgetList="+encodeURI(params.budgetList);
	}

	return url;
}

function setLinkageProcessDocInterlock(params){
	if(params.mod == "W"){
		var data = {};
		data.docId = params.docId;
		data.docTitle = params.docTitle;
		data.empSeq = params.empSeq;
		data.approKey = params.approKey;
		data.docContents = params.content;
        data.processId = params.processId;

		$.ajax({
			type : 'POST',
			async: false,
			url : '/linkageProcess/setLinkageProcessDocInterlock',
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

function approveDocView(docId, approKey, menuCd, deleteFlag){
	if(deleteFlag != null && deleteFlag == "Y"){
		alert("삭제된 문서는 열 수 없습니다.");
		return
	}

	var mod = "V";
	var pop = "" ;
	var url = '/approval/approvalDocView.do?docId='+docId+'&menuCd=' + menuCd + '&mod=' + mod + '&approKey='+approKey;

	/** 관리자 페이지 일경우 파라미터에 mng 추가*/
	if($("#apprMngStat").val() == "M"){
		url += '&vType='+$("#apprMngStat").val();
	}

	var width = "1000";
	var height = "950";
	windowX = Math.ceil( (window.screen.width  - width) / 2 );
	windowY = Math.ceil( (window.screen.height - height) / 2 );
	pop = window.open(url, "_blank ", "width=" + width + ", height=" + height + ", top="+ windowY +", left="+ windowX +", resizable=NO, scrollbars=NO");
	//pop.focus();
}

function docApproveLineView(docId){
	var pop = "" ;
	var url = '/approval/approvalLineViewPop.do?docId='+docId+'&view=lineView';
	var width = "1000";
	var height = "355";
	windowX = Math.ceil( (window.screen.width  - width) / 2 );
	windowY = Math.ceil( (window.screen.height - height) / 2 );
	pop = window.open(url, '결재선 보기', "width=" + width + ", height=" + height + ", top="+ windowY +", left="+ windowX +", resizable=NO, scrollbars=NO");
}

function tempOrReDraftingPop(docId, menuCd, approKey, linkageType, type, target){
	var rs = getDocInfo(docId);

	var approvalParams = {};
	approvalParams.linkageType = linkageType;

	approvalParams.mod = "RW";
	approvalParams.formId = rs.FORM_ID;
	approvalParams.compSeq = "1000";
	approvalParams.empSeq = rs.DRAFT_EMP_SEQ;
	approvalParams.content = rs.DOC_CONTENT;
	approvalParams.type = type;
	approvalParams.menuCd = menuCd;
	approvalParams.docType = "A";
	approvalParams.docId = rs.DOC_ID;

	if(linkageType == 2){
		approvalParams.linkageProcessCode = approKey.split("_")[0];
		approvalParams.approKey = approKey;
	}

	linkageProcessOn(approvalParams, target);
}

function getDocInfo(docId){
	var result;

	$.ajax({
		url : "/approval/getDocInfo",
		data : {
			docId : docId
		},
		type : 'POST',
		dataType : "json",
		async : false,
		success : function (rs) {
			result           = rs.rs;

		}
	})

	return result;
}

function docApprovalRetrieve(docId, approKey, linkageType, type, callBack){
	if(approKey.indexOf("_") < 0 && linkageType == "2"){
		alert("시스템 연동키가 올바르지 않습니다.");
		return;
	}

	if(confirm("문서를 회수하시겠습니까?")){
		$.ajax({
			url : "/approval/setApproveRetrieve",
			data : {
				linkageType : linkageType,
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
				try {
					// gridReload();
				}catch(e) {

				}
				try {
					let key = approKey.split("_")[0];
					if(key == "camticDelv"){
						location.reload();
					}else if(key == "camticDev"){
						location.reload();
					}else if(key == "camticPjtRes"){
						location.reload();
					}else if(key == "camticPjtCost"){
						location.reload();
					}


					if(key == "camticRndDelv"){
						location.reload();
					}else if(key == "camticRndDev"){
						location.reload();
					}else if(key == "camticRndRes"){
						location.reload();
					}else if(key == "camticRndCost"){
						location.reload();
					} else if(key == "camticPayApp" || key == "camticExnp"){
                        location.reload();
                    }

					if(key == "camticUnRndDelv"){
						location.reload();
					}else if(key == "camticUnRndDev"){
						location.reload();
					}else if(key == "camticUnRndRes"){
						location.reload();
					}else if(key == "camticUnRndCost"){
						location.reload();
					}
				}catch(e) {

				}
				if(callBack != null){
					return callBack();
				}
			},
			error : function(){
				alert("문서가 회수 중 에러가 발생했습니다.");
				if(callBack != null){
					return callBack();
				}
			}
		})
	}
}
