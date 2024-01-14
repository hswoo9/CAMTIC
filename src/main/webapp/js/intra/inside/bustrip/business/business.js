var business = {
    global: {
        nationList: []
    },

    /** 나라 세팅 */
    fn_nationCodeSet: function(){
        const nationArr = customKendo.fn_customAjax('/bustrip/getNationCode').list;
        business.global.nationList = nationArr;
        customKendo.fn_dropDownList("nationList", nationArr, "NATION_CD_NM", "NATION_CD", 2);

        $("#nationList").data("kendoDropDownList").bind("change", function(){
            console.log(business.global.nationList);
            console.log($("#nationList").data("kendoDropDownList").value());
            for(let i=0; i<business.global.nationList.length; i++){
                if(business.global.nationList[i].NATION_CD == String($("#nationList").data("kendoDropDownList").value())){
                    $("#nationText").text(business.global.nationList[i].LG_CD_NM+"등급");
                }
            }
            if($("#nationList").data("kendoDropDownList").value() == ""){
                $("#nationText").text("");
            }
        });
    },
}