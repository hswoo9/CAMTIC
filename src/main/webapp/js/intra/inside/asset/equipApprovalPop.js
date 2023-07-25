const equipApprovalPop = {
    init: function () {

        $("#searchDe").kendoDatePicker({
            depth: "year",
            start: "year",
            culture : "ko-KR",
            format : "yyyy-MM",
            value : new Date()
        });

    },

    equipDrafting: function() {
        $("#equipDraftFrm").one("submit", function() {
            var url = "/popup/inside/approvalFormPopup/equipApprovalPop.do";
            var name = "_self";
            var option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=yes, scrollbars = yes, status=no, top=50, left=50"
            var popup = window.open(url, name, option);
            this.action = "/popup/inside/approvalFormPopup/equipApprovalPop.do";
            this.method = 'POST';
            this.target = '_self';
        }).trigger("submit");
    }
}