

/* 업체정보 조회 */
function fn_popCamCrmList(v){
    var url = "/crm/pop/popCrmList.do?status=" + v;
    var name = "_blank";
    var option = "width = 1300, height = 670, top = 200, left = 400, location = no"
    var popup = window.open(url, name, option);
}