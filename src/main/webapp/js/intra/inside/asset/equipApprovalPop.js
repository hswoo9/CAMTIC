/**
 * 2023.06.30
 * 작성자 : 김지혜
 * 내용 : 장비관리 > 장비관리 (관리자) - 결재
 */

var equipApprovalPop = {
    fn_defaultScript: function () {

        $("#searchDe").kendoDatePicker({
            depth: "year",
            start: "year",
            culture : "ko-KR",
            format : "yyyy-MM",
            value : new Date()
        });

    }
}