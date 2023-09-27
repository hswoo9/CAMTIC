

/* 업체정보 조회 */
function fn_popCamCrmList(v){
    var url = "/crm/pop/popCrmList.do?status=" + v;
    var name = "_blank";
    var option = "width = 1300, height = 670, top = 200, left = 400, location = no"
    var popup = window.open(url, name, option);
}



/* kendo grid 순번 */
function fn_getRowNum(e, type){
    /** type이 1이면 정순, 2면 역순, 3이면 페이징 없을때 역순 */
    if(type == 1){
        return (e.dataSource.page() -1) * e.dataSource.pageSize();
    }else if(type == 2){
        return e.dataSource._data.length+1 - ((e.dataSource.page() -1) * e.dataSource.pageSize());
    }else if(type == 3){
        return e.dataSource._data.length+1 - ((0 -1) * 0);
    }else{
        return 0;
    }
}

function fn_popRschList(key) {
    var url = "/projectRnd/pop/popRschList.do?pjtSn="+key;
    var name = "_blank";
    var option = "width = 900, height = 580, top = 200, left = 400, location = no"
    var popup = window.open(url, name, option);
}