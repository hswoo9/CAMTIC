/**
 * 2022.06.28 by. deer
 * 마이페이지 > 결재 > 문서보관함
 *
 * function / global variable / local variable setting
 */
function menuTypeOfDraftingPop(docId, menuCd, approKey, type){
    var rs = getDocInfo(docId, approKey, type);

    var approvalParams = {};
    approvalParams.linkageProcessCode = approKey.split("_")[0];
    approvalParams.approKey = approKey;
    approvalParams.mod = "W";
    approvalParams.formId = rs.FORM_ID;
    approvalParams.compSeq = "1000";
    approvalParams.empSeq = rs.DRAFT_EMP_SEQ;
    approvalParams.content = rs.DOC_CONTENT;
    approvalParams.type = type;
    approvalParams.menuCd = menuCd;
    approvalParams.docType = "A";
    approvalParams.docId = rs.DOC_ID;

    linkageProcessOn(approvalParams);
}

function getDocInfo(docId){
    var result;

    $.ajax({
        url : getContextPath()+"/approvalUser/getDocInfo.do",
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
