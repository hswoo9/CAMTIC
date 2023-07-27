const rprReceiptUpdate = {
    init: function () {
        rprReceiptUpdate.dataSet();
    },

    dataSet: function () {
        customKendo.fn_textBox(["userText", "title", "applicantName", "applicantNum", "applicantNation", "regNum"]);
        $("#detailCn, #remarkCn").kendoTextArea();
        let iprDataSource = [
            {text: "특허", value: "1"},
            {text: "실용신안", value: "2"},
            {text: "상표권", value: "3"},
            {text: "논문", value: "4"},
            {text: "도서", value: "5"},
            {text: "디자인권", value: "6"},
            {text: "저작권", value: "7"}
        ]
        customKendo.fn_dropDownList("iprClass", iprDataSource, "text", "value", 2);
        let stateDataSource = [
            {text: "등록", value: "1"},
            {text: "출원", value: "2"},
            {text: "거절", value: "3"},
            {text: "소멸", value: "4"}
        ]
        customKendo.fn_dropDownList("state", stateDataSource, "text", "value", 2);
        let tainDataSource = [
            {text: "유지", value: "1"},
            {text: "소멸예정", value: "2"},
            {text: "소멸", value: "3"},
            {text: "유지여부 확인요망", value: "4"}
        ]
        customKendo.fn_dropDownList("tain", tainDataSource, "text", "value", 2);
        let techDataSource = [
            {text: "해당없음", value: "1"},
            {text: "이전완료", value: "2"},
            {text: "이전가능", value: "3"}
        ]
        customKendo.fn_dropDownList("tech", techDataSource, "text", "value", 2);
        let confidentialityDataSource = [
            {text: "공개", value: "1"},
            {text: "비공개", value: "2"}
        ]
        customKendo.fn_dropDownList("confidentiality", confidentialityDataSource, "text", "value", 2);
        let singleDataSource = [
            {text: "단독", value: "1"},
            {text: "공동", value: "2"}
        ]
        customKendo.fn_dropDownList("single", singleDataSource, "text", "value", 2);
        customKendo.fn_datePicker("applicantDt", "month", "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("regDate", "month", "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("expirationDt", "month", "yyyy-MM-dd", new Date());
        $("#userText, #regDate, #applicantDt, #expirationDt").attr("readonly", true);

        if ($("#inventionInfoSn").val() != "") {
            const result = customKendo.fn_customAjax("/inside/getInventionInfo", {
                inventionInfoSn: $("#inventionInfoSn").val()
            });
            const invenInfo = result.rs.info;
            const shareList = result.rs.shareList;

            $("#userSn").val(invenInfo.SHARE_SN);
            $("#userText").val(invenInfo.SHARE_NAME);
            rprReceiptUpdate.useDataChange(shareList);
            $("#iprClass").data("kendoDropDownList").value(invenInfo.IPR_CLASS);
            $("#title").val(invenInfo.TITLE);
            $("#detailCn").val(invenInfo.DETAIL_CN);
        }
    }
}
