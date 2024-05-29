var customerCondition = {

    global : {
        now : new Date(),
        searchAjaxData : "",
        dropDownDataSource : "",
    },

    fn_defaultScript : function (){

        customerCondition.fn_setCustomerCondition();
    },

    fn_setCustomerCondition : function(){
        var result = customKendo.fn_customAjax("/crm/getCustomerCondition.do", customerCondition.global.searchAjaxData);
        if(result.flag) {
            var ls = result.list;
            var jbCnt = 0;
            var ccCnt = 0;
            var gsCnt = 0;
            var etcCnt = 0;

            // 지역별
            for(var i = 0; i < ls.length; i++){
                if(ls[i].CRM_NATION == "전라북도" || ls[i].CRM_NATION == "전북특별자치도") {
                    jbCnt += parseInt(ls[i].CNT);
                    $("#jbCnt").text(jbCnt);
                }
                if(ls[i].CRM_NATION == "전라남도") {
                    $("#jnCnt").text(ls[i].CNT);
                }
                if(ls[i].CRM_NATION == "서울특별시") {
                    $("#soCnt").text(ls[i].CNT);
                }
                if(ls[i].CRM_NATION == "경기도") {
                    $("#ggCnt").text(ls[i].CNT);
                }
                if(ls[i].CRM_NATION == "강원도") {
                    $("#gwCnt").text(ls[i].CNT);
                }
                if(ls[i].CRM_NATION == "충청북도" || ls[i].CRM_NATION == "충청남도") {
                    ccCnt += parseInt(ls[i].CNT);
                    $("#ccCnt").text(ccCnt);
                }
                if(ls[i].CRM_NATION == "경상북도" || ls[i].CRM_NATION == "경상남도") {
                    gsCnt += parseInt(ls[i].CNT);
                    $("#gsCnt").text(gsCnt);
                }
                if(ls[i].CRM_NATION == "대전광역시") {
                    $("#djCnt").text(ls[i].CNT);
                }
                if(ls[i].CRM_NATION == "광주광역시") {
                    $("#gjCnt").text(ls[i].CNT);
                }
                if(ls[i].CRM_NATION == "인천광역시") {
                    $("#icCnt").text(ls[i].CNT);
                }
                if(ls[i].CRM_NATION == "대구광역시") {
                    $("#dgCnt").text(ls[i].CNT);
                }
                if(ls[i].CRM_NATION == "부산광역시") {
                    $("#psCnt").text(ls[i].CNT);
                }
                if(ls[i].CRM_NATION == "울산광역시") {
                    $("#usCnt").text(ls[i].CNT);
                }
                if(ls[i].CRM_NATION == "" || ls[i].CRM_NATION == null) {
                    etcCnt += parseInt(ls[i].CNT);
                    $("#etcCnt").text(etcCnt);
                }
            }

            // 산업분야별
            var ls2 = result.list2;
            for(var i = 0; i < ls2.length; i++){
                if(ls2[i].MAIN_CODE == "GM") {
                    $("#gmCnt").text(ls2[i].CNT);
                }
                if(ls2[i].MAIN_CODE == "OTHER") {
                    $("#otherCnt").text(ls2[i].CNT);
                }
                if(ls2[i].MAIN_CODE == "CAR") {
                    $("#carCnt").text(ls2[i].CNT);
                }
                if(ls2[i].MAIN_CODE == "VD") {
                    $("#vdCnt").text(ls2[i].CNT);
                }
                if(ls2[i].MAIN_CODE == "F") {
                    $("#fCnt").text(ls2[i].CNT);
                }
                if(ls2[i].MAIN_CODE == "MA") {
                    $("#maCnt").text(ls2[i].CNT);
                }
                if(ls2[i].MAIN_CODE == "UN") {
                    $("#unCnt").text(ls2[i].CNT);
                }
                if(ls2[i].MAIN_CODE == "RFT") {
                    $("#rftCnt").text(ls2[i].CNT);
                }
                if(ls2[i].MAIN_CODE == "") {
                    $("#unRegCnt").text(ls2[i].CNT);
                }
            }
        }
    }


}