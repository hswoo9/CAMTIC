var bustPop = {
    global: {

    },

    bustripReqPop: function(hrBizReqId){
        let url = "";
        const name = "bustripReqPop";
        const option = "width=1200, height=700, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";


        if(hrBizReqId == null){
            url = "/bustrip/pop/bustripReqPop.do";
            if($("#pageName").val() != "bustripList"){
                url += "?tripCode=4";
            }
        } else {
            url = "/bustrip/pop/bustripReqPop.do?hrBizReqId="+hrBizReqId;
        }
        window.open(url, name, option);
    },

    bustripExnpPop: function(hrBizReqId){
        let url = "/bustrip/pop/businessExnpPop.do?hrBizReqId="+hrBizReqId;
        const name = "_self";
        const option = "width=1200, height=700, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";
        window.open(url, name, option);
    },

    businessExnp: function(hrBizReqId){
        let url = "/bustrip/pop/businessExnp.do?hrBizReqId="+hrBizReqId;
        const name = "_blank";
        const option = "width = 450, height = 200, top = 200, left = 300, location = no";
        window.open(url, name, option);
    },

    fn_reqRegPopup : function (key, type){
        var url = "/payApp/pop/regPayAppPop.do?hrBizReqResultId="+key+"&reqType=bustrip";

        if(type == 2){
            var url = "/payApp/pop/regPayAppPop.do?payAppSn="+key;
        }
        var name = "regPayAppPop";
        var option = "width = 1700, height = 820, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    fn_busiPayAppPopup : function (key, type){
        var url = "/payApp/pop/regPayAppPop.do?hrBizReqId="+key+"&reqType=business";

        if(type == 2){
            var url = "/payApp/pop/regPayAppPop.do?payAppSn="+key;
        }
        var name = "regPayAppPop";
        var option = "width = 1700, height = 820, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    }
}