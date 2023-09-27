var bustripPop = {
    /** 외부인력 추가 팝업 */
    addExternalWorkforcePop: function(){
        let url = "/bustrip/pop/addExternalWorkforcePop.do";
        const name = "addExternalWorkforcePop";
        const option = "width = 1000, height = 510, top = 200, left = 300, location = no";
        window.open(url, name, option);
    }
}