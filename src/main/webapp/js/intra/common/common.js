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

function fn_userMultiSelectPop(type) {
    if(type == "bustrip" || type == "bustripT" || type == "partRate"){
        window.open("/user/pop/userMultiSelectPop.do?type="+type,"조직도","width=1365, height=610, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no");
    }else{
        window.open("/user/pop/userMultiSelectPop.do","조직도","width=1365, height=610, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no");
    }
}

//숫자에 콤마 찍기 number
function fn_numberWithCommas(num) {
    if (!num || num=="" || num==undefined) {
        return 0;
    }
    return Math.floor(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function comma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}

function commaN(str) {
    str = String(str);
    return str.replace(/^(-?\d+)(\d{3})+/g, function(_, sign, rest) {
        return sign + rest.replace(/\d{3}/g, ',$&');
    });
}

function uncomma(str) {
    str = String(str);
    return str.replace(/[^\d]+/g, '');
}

function uncommaN(str) {
    str = String(str);
    return str.replace(/[^\d-]|(?<=\d)-/g, '');
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

function fileDown(filePath, fileName, stat){
    if(stat == "recruit"){
        filePath = "http://218.158.231.189" + filePath;
    }
    kendo.saveAs({
        dataURI: "/common/fileDownload.do?filePath=" + filePath + "&fileName=" + encodeURIComponent(fileName),
    });
}

function fileWaterMarkDown(filePath, fileName){
    kendo.saveAs({
        dataURI: "/common/fileDownload.do?filePath=" + filePath + "&fileName=" + encodeURIComponent(fileName),
    });
}

function fn_searchBind(){
    $(".searchInput").bind("change", function(){
        gridReload();
    });
}

/** 캠틱 직위 : 직책이 있으면 직책이 보여지고 없으면 직급이 보여짐 */
function fn_getSpot(duty, position){
    if(duty != "" && duty != undefined && duty != null){
        return duty;
    }else if(position != "" && position != undefined && position != null){
        return position;
    }else{
        return "";
    }
}

function fn_getRowNum(e, type){
    /** type이 1이면 정순, 2면 역순, 3이면 페이징 없을때 역순 */
    let pageSize = e.dataSource.pageSize();
    if(pageSize == null){
        pageSize = 9999;
    }

    if(type == 1){
        return (e.dataSource.page() -1) * pageSize;
    }else if(type == 2){
        return e.dataSource._data.length+1 - ((e.dataSource.page() -1) * pageSize);
    }else if(type == 3){
        return e.dataSource._data.length+1 - ((0 -1) * 0);
    }else{
        return 0;
    }
}

function fn_getNowDate(type){
    const today = new Date();
    const year = today.getFullYear(); // 년도
    const month = today.getMonth() + 1;  // 월
    const date = today.getDate();  // 날짜

    let toDate = ""
    if(type == 1){
        /** yyyy년 m월 d일 */
        toDate = year+"년 "+month+"월 "+date+"일";
    }else if(type == 2){
        /** yyyy-m-d */
        toDate = year+"-"+month+"-"+date;
    }else if(type == 3){
        /** yyyy.m.d */
        toDate = year+". "+month+". "+date+".";
    }else if(type == 4){
        /** yyyy-mm-dd */
        const month2 = ("0" + (1 + today.getMonth())).slice(-2);
        const day2 = ("0" + today.getDate()).slice(-2);
        toDate = year + "-" + month2 + "-" + day2;
    }
    return toDate;
}

function fn_stringToDate(date, n) {
    let yyyy = date.substring(0, 4);
    let mm = date.substring(5, 7);
    let dd = date.substring(8, 10);
    mm = Number(mm) - 1;

    let stringNewDate = new Date(yyyy, mm, dd);
    stringNewDate.setDate(stringNewDate.getDate() + n);

    return stringNewDate.getFullYear() +
        "-" + ((stringNewDate.getMonth() + 1) > 9 ? (stringNewDate.getMonth() + 1).toString() : "0" + (stringNewDate.getMonth() + 1)) +
        "-" + (stringNewDate.getDate() > 9 ? stringNewDate.getDate().toString() : "0" + stringNewDate.getDate().toString());
}

function fn_koreanNumber(num) {

    if(num < 0){
        return "-" +  fn_koreanNumber(-num);
    }

    //1 ~ 9 한글 표시
    const arrNumberWord = new Array("", "일", "이", "삼", "사", "오", "육", "칠", "팔", "구");
    //10, 100, 100 자리수 한글 표시
    const arrDigitWord = new Array("", "십", "백", "천");
    //만단위 한글 표시
    const arrManWord = new Array("", "만 ", "억 ", "조 ", "경 ", "해 ", "자 ", "양 ", "구 ", "간 ", "정 ", "재 ", "극 ", "항아사 ", "아승기 ", "나유타 ", "불가사의 ", "무량대수 ");

    const num_value = String(num);
    const num_length = String(num).length;

    let han_value = "";
    let man_count = 0;      //만단위 0이 아닌 금액 카운트.
    for (let i=0; i<num_length; i++) {
        //1단위의 문자로 표시.. (0은 제외)
        let strTextWord = arrNumberWord[num_value.charAt(i)];

        //0이 아닌경우만, 십/백/천 표시
        if (strTextWord != "") {
            man_count++;
            strTextWord += arrDigitWord[(num_length - (i + 1)) % 4];
        }

        //만단위마다 표시 (0인경우에도 만단위는 표시한다)
        if (man_count != 0 && (num_length - (i + 1)) % 4 == 0) {
            man_count = 0;
            strTextWord = strTextWord + arrManWord[(num_length - (i + 1)) / 4];
        }
        han_value += strTextWord;
    }

    if (num_value != 0){
        han_value = "" + han_value + "원";
    }

    return han_value.trim();
}

/** 두 날짜 사이의 개월수 구하기 */
function fn_monDiff(_date1, _date2){
    var pSDate = _date1; //참여 시작일
    var pEDate = _date2; //참여 종료일

    var pSDateArray = pSDate.split("-");
    var pEDateArray = pEDate.split("-");

    var pSDateSet = new Date(pSDateArray[0], pSDateArray[1], pSDateArray[2]);
    var pEDateSet = new Date(pEDateArray[0], pEDateArray[1], pEDateArray[2]);

    var pSDateLastSet = (new Date(pSDateArray[0], pSDateArray[1], 0)).getDate();
    var pEDateLastSet = (new Date(pEDateArray[0], pEDateArray[1], 0)).getDate();

    var pSDateYear = pSDateSet.getFullYear();
    var pSDateMonth = pSDateSet.getMonth();
    var pSDateDay = pSDateSet.getDate();

    var pEDateYear = pEDateSet.getFullYear();
    var pEDateMonth = pEDateSet.getMonth();
    var pEDateDay = pEDateSet.getDate();

    var pMonthSet = ((pEDateYear - pSDateYear) * 12) + (pEDateMonth - pSDateMonth + 1) - 2;

    var pSDateDaySet = pSDateLastSet - pSDateDay + 1;
    var pEDateDaySet = pEDateDay;

    var pSDateDayPerSet = (pSDateDaySet / pSDateLastSet).toFixed(1);
    var pEDateDayPerSet = (pEDateDaySet / pEDateLastSet).toFixed(1);

    var pDateMonth = Number(pMonthSet) + Number(pSDateDayPerSet) + Number(pEDateDayPerSet);


    // return Math.round((diffDays / 30).toFixed(2) * 10) / 10;
    return pDateMonth;
}

var autoHyphen2 = (target) => {
    target.value = target.value
        .replace(/[^0-9]/g, '')
        .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, "");
}

/** A가 B의 몇 %인지 구하기(소수점일시 C자리 까지 표기) **/
function fn_per(A, B, C){
    if(B == null || B == undefined || B == 0){
        return "0%";
    }
    if(C == null){
        C = 0;
    }

    let per;
        per = A / B * 100;

    return Number.isInteger(per) ? (per + "%") : (per.toFixed(C) + "%");
}

/** 프로젝트용 퍼센트 표기 숫자를 받아서 fiexd 자리까지 뿌려줌 **/
function pjtPer(per, fiexd){
    if(per == null || per == undefined || per == 0 || per == "Infinity" || per == "-Infinity" || per == "NaN"){
        return "0%";
    }

    return Number.isInteger(per) ? (per + "%") : (per.toFixed(fiexd) + "%");
}

/** 문자가 장문일때 짜르고 ... 찍기 */
function titleCut(text, cutLength){
    let returnText;
    if(text.toString().length > cutLength){
        returnText = text.toString().substring(0, cutLength)+ "...";
    }else{
        returnText = text;
    }
    return returnText;
}

/** 유저정보 불러오기 */
function getUser(empSeq){
    const empInfo = customKendo.fn_customAjax("/user/getUserInfo", {empSeq: empSeq});
    return empInfo;
}

/** 부서장, 팀장 공석 체크 */
function getManager(empSeq, deptLevel){
    const empInfo = customKendo.fn_customAjax("/user/getManagerInfo", {empSeq: empSeq, deptLevel: deptLevel}).data;
    console.log("function getManager :",empInfo);
    return empInfo;
}

/** 부서장, 팀장 공석 체크 */
function getSign(empSeq, deptLevel){
    const signInfo = customKendo.fn_customAjax("/sign/getSignInfoOne", {}).data;
    console.log("function getSign :",signInfo);
    return signInfo;
}

/** 전자결재 버튼 공용 */
function makeApprBtnHtml(dataInfo, onClick, type, target){

    let status = "";
    let docId = dataInfo.DOC_ID;
    let approKey = dataInfo.APPRO_KEY;
    let menuCd = dataInfo.DOC_MENU_CD;

    var target = target;
    if(type == "2"){
        status = dataInfo.DOC_STATUS;
    }else if(type == "3"){
        status = dataInfo.RES_STATUS;
    }else if(type == "3-2"){
        status = dataInfo.RES_STATUS;
        docId = dataInfo.RES_DOC_ID;
        approKey = dataInfo.RES_APPRO_KEY;
        menuCd = dataInfo.RES_DOC_MENU_CD;
    }else{
        status = dataInfo.STATUS;
    }
    let html = "";

    if(dataInfo == null || dataInfo == "undefined" || dataInfo == ""){ return html; }


    if(status == "0"){
        html =
            "<button type='button' class='k-button k-button-md k-button-solid k-button-solid-base approvalPopup' onclick='"+onClick+"'>" +
            "   <span class='k-icon k-i-track-changes-accept k-button-icon'></span>" +
            "   <span class='k-button-text'>상신</span>" +
            "</button>";
    }else if(status == "10" || status == "50"){
        html =
            "<button type='button' class='k-button k-button-md k-button-solid k-button-solid-base' onclick='docApprovalRetrieve(\""+docId+"\", \""+approKey+"\", 1, \"retrieve\");'>" +
            "   <span class='k-icon k-i-x-circle k-button-icon'></span>" +
            "   <span class='k-button-text'>회수</span>" +
            "</button>";
    }else if(status == "20"){
        html =
            "<button type='button' class='k-button k-button-md k-button-solid k-button-solid-base approvalPopup' onclick='approveDocView(\""+docId+"\", \""+approKey+"\", \""+menuCd+"\");'>" +
            "   <span class='k-icon k-i-track-changes-accept k-button-icon'></span>" +
            "   <span class='k-button-text'>결재중</span>" +
            "</button>";
    }else if(status == "30" || status == "40"){
        html =
            "<button id='reBtn' type='button' class='k-button k-button-md k-button-solid k-button-solid-base approvalPopup' onclick='tempOrReDraftingPop(\""+docId+"\", \""+menuCd+"\", \""+approKey+"\", 2, \"reDrafting\", \""+target+"\");'>" +
            "   <span class='k-icon k-i-track-changes-accept k-button-icon'></span>" +
            "   <span class='k-button-text'>재상신</span>" +
            "</button>";
    }else if(status == "100" || status == "101"){
        html =
            "<button type='button' class='k-button k-button-md k-button-solid k-button-solid-base approvalPopup' onclick='approveDocView(\""+docId+"\", \""+approKey+"\", \""+menuCd+"\");'>" +
            "   <span class='k-icon k-i-track-changes-accept k-button-icon'></span>" +
            "   <span class='k-button-text'>열람</span>" +
            "</button>";
    }else{
        html = "";
    }

    return html;
}

function textCut(text, len){
    if(text == null || text == ""){
        return "";
    }
    if(len == null || len == ""){
        len = 62;
    }

    let textEx = text;
    if(text.toString().length > len){
        textEx = text.toString().substring(0, len)+ "...";
    }
    return textEx;
}

/** 재상신 버튼 숨기기
 * draftEmpSeq : 기안자 DOC_INFO DRAFT_EMP_SEQ
 * loginEmpSeq : 로그인한 사용자
 * buttonId : 재상신 버튼 아이디
 * */
function reDraftOnlyOne(docId, loginEmpSeq, buttonId){
    const draftResult = customKendo.fn_customAjax("/approval/getDraftEmpSeq", {docId: docId});
    const draftEmpMap = draftResult.data;

    if(loginEmpSeq == null || (draftEmpMap != null && draftEmpMap.DRAFT_EMP_SEQ != loginEmpSeq)){
        $("#"+buttonId).hide();
    }
}

/** 사업장 세팅 */
function fn_busnCdSet(pjtSn, pjtCd){
    let realPjtSn;
    if(pjtSn != null && pjtSn != "" && pjtSn != undefined && pjtSn != "undefined"){
        realPjtSn = pjtSn
    }else if(pjtCd != null && pjtCd != "" && pjtCd != undefined && pjtCd != "undefined"){
        const pjtResult = customKendo.fn_customAjax("/project/getProjectByPjtCd2", { pjtCd: pjtCd });
        const pjtMap = pjtResult.map;
        if(pjtMap != null && pjtMap.PJT_SN != null){
            realPjtSn = pjtMap.PJT_SN
        }else{
            return "1000";
        }
    }else{
        return "1000";
    }

    const depoResult = customKendo.fn_customAjax("/pay/getProjectSettingInfoByPjtSn", {pjtSn: realPjtSn});
    const depoMap = depoResult.data;

    if(depoMap != null && depoMap.CODE_VAL != null){
        let busnCd = "1000";
        switch(depoMap.CODE_VAL){
            case '1':
                busnCd = depoMap.PROFIT_CODE;
                break;
            case '2':
                busnCd = depoMap.PURP_CODE;
                break;
            case '3':
                busnCd = depoMap.COMM_CODE;
                break;
        }
        return busnCd;
    }else{
        return "1000";
    }
}

/** 켄도그리드 엑셀다운 (다운받을 컬럼은 field 값이 있어야 함) */
function exportGrid(e){
    const data = e.data;
    const columns = e.sender.columns;
    const sheet = e.workbook.sheets[0];
    const visibleColumns = new Array();
    const columnTemplates = new Array();
    const elem = document.createElement("div");

    for (let i=0; i<columns.length; i++){
        if (!columns[i].hidden && columns[i].field){
            visibleColumns.push(columns[i]);
        }
    }

    for (let i=0; i<visibleColumns.length; i++){
        if (visibleColumns[i].template){
            columnTemplates.push({ cellIndex: i, template: kendo.template(visibleColumns[i].template) });
        }
    }

    for (let i=1; i<sheet.rows.length; i++){
        let footCk = false;
        const row = sheet.rows[i];
        const dataItem = data[i - 1];
        for (let j=0; j<columnTemplates.length; j++){

            const columnTemplate = columnTemplates[j];
            if(row == null || row.type == null){
                continue;
            }if(row.type == "footer"){
                footCk = true;
            }else{
                elem.innerHTML = columnTemplate.template(dataItem);
                if (row.cells[columnTemplate.cellIndex] != undefined){
                    row.cells[columnTemplate.cellIndex].value = elem.textContent || elem.innerText || "";
                }
            }
        }
        if(footCk){
            for (let i=0; i<visibleColumns.length; i++){
                row.cells[i].value = "";
            }
        }
    }
}

/** 파일뷰어 공통 함수 */
function fileViewer(path, fid){
    let url = "http://218.158.231.43:8080/SynapDocViewServer/convert?fileType=URL&convertType=2&filePath=";
    let pth = "";

    if(path.indexOf("http") > -1){
        pth = path + fid;
    }else{
        pth = "http://218.158.231.184" + path + fid;
    }

    const encodedPath = encodeURIComponent(pth);

    url += encodedPath;
    url += "&fid=" + fid;
    url += "&urlEncoding=UTF-8";

    const name = "_blank";
    const option = "width=1300, height=820, top=100, left=400, location=no";
    const popup = window.open(url, name, option);
}