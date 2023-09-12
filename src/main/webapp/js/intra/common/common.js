var now = new Date();

String.prototype.toMoney  = function(){

    var val = (this.valueOf() || '0');
    var zero = val.charAt(0);

    var money = val.replace(/\D/g,"");
    var index = money.length - 3;
    while(index >0){
        money = money.substr(0,index) + "," + money.substr(index);
        index -=3;
    }
    if(zero == "-"){
        return "-" + money;
    }else{
        return money;
    }
};

String.prototype.toMoney2  = function(){

    var val = (this.valueOf() || '0');
    var zero = val.charAt(0);

    var money = val.replace(/\D/g,"");

    if(zero == "-"){
        return "-" + money;
    }else{
        return money;
    }
};

function getContextPath(){
    var offset=location.href.indexOf(location.host)+location.host.length;
    var ctxPath=location.href.substring(offset, location.href.indexOf('/',offset+1));

    if ((/^\/js/).test(getActiveScript())) {
        return "";
    }

    return ctxPath;
}

function getActiveScript() {
    var d = document.getElementsByTagName("script");
    var path = dirname(d[d.length - 1].src);
    delete d;

    var offset=path.indexOf(location.host)+location.host.length;
    return path.substring(offset);
}

function dirname(path) {
    if (path.lastIndexOf("/") == -1)
        return "./";
    return path.replace(/\\/g, '/').replace(/\/[^\/]*\/?$/, '') + "/";
}

//숫자만 입력받기
function onlyNumber(e) {
    e.value = e.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '').replace(/[.]/g, '');
}

function removeChar(event) {
    event = event || window.event;
    var keyID = (event.which) ? event.which : event.keyCode;
    if(keyID != 9){
        if ( keyID == 8 || keyID == 46 || keyID == 37 || keyID == 39)
            return;
        else
            event.target.value = event.target.value.replace(/[^0-9]/g, "");
    }
}

function telFilter(e) {
    var text = $(e).val().replace(/-/gi, "");

    if (text.length > 8) {
        $(e).val(text.replace(/^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?([0-9]{3,4})-?([0-9]{4})$/, "$1-$2-$3"));
    }
    if (text.length > 10) {
        $(e).val(text.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/, "$1-$2-$3"));
    }
}

//yyyyMMdd 두 날짜의 차이 구하기 (개월수)
function betweenDay(firstDate, secondDate) {
    var firstDateObj = new Date(firstDate.substring(0, 4), firstDate.substring(4, 6) - 1, firstDate.substring(6, 8));
    var secondDateObj = new Date(secondDate.substring(0, 4), secondDate.substring(4, 6) - 1, secondDate.substring(6, 8));
    var betweenTime = Math.abs(secondDateObj.getTime() - firstDateObj.getTime());
    return Math.floor(betweenTime / (1000 * 60 * 60 * 24 * 30));
}

function gridReload() {
    $("#mainGrid").data("kendoGrid").dataSource.read();
}

function fn_deptSetting(){
    let data = {}
    data.deptLevel = 1;
    const deptDsA = customKendo.fn_customAjax("/dept/getDeptAList", data);

    customKendo.fn_dropDownList("dept", deptDsA.rs, "dept_name", "dept_seq");

    $("#dept").data("kendoDropDownList").bind("change", fn_chngDeptComp)
    $("#dept").data("kendoDropDownList").select(0);
    $("#dept").data("kendoDropDownList").trigger("change");
}

function fn_onlyDeptSetting(type){
    let data = {}
    data.deptLevel = 1;
    const deptDsA = customKendo.fn_customAjax("/dept/getDeptAList", data);

    customKendo.fn_dropDownList("dept", deptDsA.rs, "dept_name", "dept_seq", type);

    $("#dept").data("kendoDropDownList").select(0);
}

function fn_chngDeptComp(){
    let data = {}
    data.deptLevel = 2;
    data.parentDeptSeq = this.value();

    const ds = customKendo.fn_customAjax("/dept/getDeptAList", data);
    customKendo.fn_dropDownList("team", ds.rs, "dept_name", "dept_seq")
}

function fn_checkAll(headerCheckBoxId, checkBoxName){
    if($("#"+headerCheckBoxId).is(":checked")) {
        $("input[name="+checkBoxName+"]").prop("checked", true);
    }else{
        $("input[name="+checkBoxName+"]").prop("checked", false);
    }
}

function userSearch() {
    window.open("/common/deptListPop.do", "조직도", "width=750, height=650");
}

function fn_userMultiSelectPop() {
    window.open("/user/pop/userMultiSelectPop.do","조직도","width=1365, height=610, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no");
}

//숫자에 콤마 찍기 number
function fn_numberWithCommas(num) {
    if (!num || num=="" || num==undefined) {
        return 0;
    }
    return Math.floor(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//숫자에 콤마찍기 string
function fn_comma(str){
    if (!str || str=="" || str==undefined) {
        return "0";
    }
    return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").replace(/(^0+)/, "");
}

function fn_inputNumberFormat(obj){
    if(obj.value !== "0"){
        obj.value = fn_comma(obj.value);
    }
}

function fileDown(filePath, fileName){
    kendo.saveAs({
        dataURI: "/common/fileDownload.do?filePath=" + filePath + "&fileName=" + encodeURIComponent(fileName),
    });
}

function fn_searchBind(){
    $(".searchInput").bind("change", function(){
        gridReload();
    });
}

function fn_getSpot(position, duty){
    if(duty == "" || duty == undefined || duty == null){
        return position;
    }else{
        return duty;
    }
}

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