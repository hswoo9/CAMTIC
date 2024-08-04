var costInfoPop = {

    fn_reqRegPopup : function (key){
        let url = "/payApp/pop/regPayAppCostPop.do?payAppSn=" + key + "&auth=mng&status=rev&reqType=costProcess";
        const name = "regPayAppPop";
        const option = "width = 1700, height = 820, top = 100, left = 400, location = no";
        window.open(url, name, option);
    },

    fn_reqClaiming : function(key){
        let url = "/purc/pop/reqClaiming.do";
        if(key != null && key != ""){
            url = "/purc/pop/reqClaiming.do?claimSn=" + key;
        }
        var name = "_blank";
        var option = "width = 1540, height = 840, top = 100, left = 400, location = no";
        window.open(url, name, option);
    },

    lectureTeamListPop: function(key){
        let url = "/projectUnRnd/lectureTeamListPop.do?pjtSn="+$("#pjtSn").val() + "&purcSn=" + key;
        const name = "lectureReqPop";
        const option = "width = 1250, height = 650, top = 100, left = 300, location = no";
        window.open(url, name, option);
    },

    payAppChoosePop: function(){
        let url = "/project/payAppChoosePop.do?pjtSn="+$("#pjtSn").val();
        const name = "payAppChoosePop";
        const option = "width = 1450, height = 650, top = 150, left = 400, location = no";
        window.open(url, name, option);
    }
}