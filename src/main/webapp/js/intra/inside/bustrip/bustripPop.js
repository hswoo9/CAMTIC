var bustPop = {
    global: {

    },

    bustripReqPop: function(hrBizReqId){
        let url = "";
        let name = "bustripReqPop";
        let option = "width=1200, height=700, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";


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
        let name = "_self";
        let option = "width=1200, height=700, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";
        window.open(url, name, option);
    }
}