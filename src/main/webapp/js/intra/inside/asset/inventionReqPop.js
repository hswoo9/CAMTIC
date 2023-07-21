const inventionReq = {
    init: function(){
        $("#author").kendoTextBox();
        $("#type").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "선택하세요", value: "" },
                { text: "특허", value: "특허" },
                { text: "실용신안", value: "실용신안" },
                { text: "상표권", value: "상표권" },
                { text: "논문", value: "논문" },
                { text: "도서", value: "도서" },
                { text: "디자인권", value: "디자인권" },
                { text: "저작권", value: "저작권" }
            ],
            index: 0
        });
        $("#name").kendoTextBox();
        $("#document").kendoTextBox();
        $("#regDate").kendoTextBox();
        $("#conft").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "선택하세요", value: "" },
                { text: "공개", value: "공개" },
                { text: "대외비", value: "대외비" }
            ],
            index: 0
        });
    }
}

function userDataSet(userArr) {
    for(let i=0; i<userArr.length; i++){

    }
    console.log(userArr);
}
