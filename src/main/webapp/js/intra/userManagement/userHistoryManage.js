/**
 * 2022.06.28 by. hanker
 * 전체관리 > 인사관리 > 직원명부
 *
 * function / global variable / local variable setting
 */

function setUserHistoryApprovalY(targetTableName, contentId, contentValue){
    if(confirm("승인 하시겠습니까?")) {
        $.ajax({
            url      : getContextPath() + '/userHistoryManagement/setUserHistoryApprovalY.do',
            data     : {
                targetTableName : targetTableName,
                contentId       : contentId,
                contentValue    : contentValue
            },
            type     : "post",
            async    : false,
            datatype : "json",
            success  : function (rs) {
                alert("승인이 처리되었습니다.");
                gridReload();
            },
            error    : function () {
                alert("승인 오류.\n관리자에게 문의하세요.");
            }
        });
    }
}

function setUserHistoryApprovalCancel(targetTableName, contentId, contentValue){
    if(confirm("승인 취소하시겠습니까?")){
        $.ajax({
            url: getContextPath() + '/userHistoryManagement/setUserHistoryApprovalCancel.do',
            data: {
                targetTableName : targetTableName,
                contentId : contentId,
                contentValue : contentValue
            },
            type: "post",
            async : false,
            datatype: "json",
            success: function (rs) {
                alert("승인이 취소되었습니다.");
                gridReload();
            },
            error : function (){
                alert("승인 취소 오류.\n관리자에게 문의하세요.");
            }
        });
    }
}