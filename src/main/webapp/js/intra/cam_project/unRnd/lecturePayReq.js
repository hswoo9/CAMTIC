const lecturePayReq = {
    fn_defaultScript: function(){
        this.fn_pageSet();
        this.fn_dataSet();
    },

    fn_pageSet: function(){
        customKendo.fn_textBox(["payAmt"]);
        customKendo.fn_datePicker("payDt", 'month', "yyyy-MM-dd", new Date());
        $("#payDt").attr("readonly", true);
        ub.fn_paySet();
        ub.fn_billSet();
    },

    fn_dataSet: function(){
        const data = {
            pk: $("#pk").val(),
            personList: $("#list").val()
        }
        const result = customKendo.fn_customAjax("/projectUnRnd/getLectureInfo", data);
        const lecMap = result.data;

        const result2 = customKendo.fn_customAjax("/projectUnRnd/getLecturePersonReqList", data);
        const list = result2.list;

        $("#lecTitleBs").text(lecMap.LEC_TITLE_BS);

        let listText = "";
        for(let i=0; i<list.length; i++){
            if(list[i].NAME != null && list[i].NAME != "" && listText != ""){
                listText += ",";
            }
            listText += list[i].NAME;
        }
        $("#name").text(listText);
    },

    fn_saveBtn: function(){
        const data = {
            pk: $("#pk").val(),
            personList: $("#list").val(),
            payType: $("#payType").data("kendoDropDownList").value(),
            billType: $("#billType").data("kendoDropDownList").value(),
            payDt: $("#payDt").val(),
            payAmt: $("#payAmt").val().replace(/,/g, '')
        }

        if($("#list").val() == "") {
            alert("저장 중 오류가 발생하였습니다.");
            return;
        }

        const result = customKendo.fn_customAjax("/projectUnRnd/updPersonPay", data);

        if(result.code != 200){
            alert("저장 중 오류가 발생하였습니다.");
        }else{
            opener.gridReload();
            window.close();
        }
    }
}