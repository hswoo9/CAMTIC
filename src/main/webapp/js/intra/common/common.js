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
        filePath = "https://www.camtic.or.kr" + filePath;
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

    var pSDateArray = "";
    var pEDateArray = "";
    try{
        pSDateArray = pSDate.split("-");
        pEDateArray = pEDate.split("-");
    }catch{
        console.log("fn_monDiff 함수 pSDate 값이 "+pSDate+"으로 split 오류 발생");
        console.log("fn_monDiff 함수 pEDate 값이 "+pEDate+"으로 split 오류 발생");
        return 0;
    }

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
    }else if(status == "111"){
        html =
            "<button type='button' class='k-button k-button-md k-button-solid k-button-solid-base approvalPopup' onclick='tempOrReDraftingPop(\""+docId+"\", \""+menuCd+"\", \""+approKey+"\", 2, \"tempDrafting\");'>" +
            "   <span class='k-icon k-i-track-changes-accept k-button-icon'></span>" +
            "   <span class='k-button-text'>전자결재 임시저장 중</span>" +
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

    /** 숨겨지지 않은 컬럼을 필터링하여 visibleColumns 배열에 추가 */
    for (let i=0; i<columns.length; i++){
        if (!columns[i].hidden && columns[i].field){
            visibleColumns.push(columns[i]);
        }
    }

    /** 템플릿 및 푸터 템플릿 컬럼을 필터링하여 columnTemplates 배열에 추가 */
    for (let i=0; i<visibleColumns.length; i++){
        if (visibleColumns[i].template){
            columnTemplates.push({
                cellIndex: i,
                template: visibleColumns[i].template ? kendo.template(visibleColumns[i].template) : null,
                footerTemplate: visibleColumns[i].footerTemplate ? kendo.template(visibleColumns[i].footerTemplate) : null
            });
        }
    }

    /** 각 행에 대해 템플릿을 적용 */
    for (let i=1; i<sheet.rows.length; i++){
        const row = sheet.rows[i];
        let dataItem = null;

        /** 푸터 템플릿이 아닌 경우 데이터 아이템 할당 */
        if(row.type != "footer" && data[i - 1]) {
            dataItem = data[i - 1];
        }

        /** 템플릿 적용 */
        for (let j=0; j<columnTemplates.length; j++){
            const columnTemplate = columnTemplates[j];

            if(row == null || row.type == null){
                continue;
            }

            let templateHTML = '';

            /** 푸터 템플릿 처리 */
            if (row.type == "footer" && columnTemplate.footerTemplate) {
                try {
                    const footerData = data[data.length - 1] || {};
                    templateHTML = columnTemplate.footerTemplate(footerData);
                } catch (error) {
                    console.log("푸터 템플릿 처리 중 오류, i="+i + ", j="+j);
                }

            /** 일반 템플릿 처리 */
            }else if (columnTemplate.template && dataItem != null) {
                try {
                    templateHTML = columnTemplate.template(dataItem);
                } catch (error) {
                    console.log("일반 템플릿 처리 중 오류, i="+i + ", j="+j);
                }
            }

            console.log(`Template HTML for footer at row ${i}, cellIndex ${columnTemplate.cellIndex}:`, templateHTML);

            elem.innerHTML = templateHTML;
            const textContent = elem.innerText || elem.textContent;
            console.log(`Extracted text content at row ${i}, cellIndex ${columnTemplate.cellIndex}:`, textContent.trim());

            /** 셀에 텍스트를 할당 */
            if (row.cells[columnTemplate.cellIndex] != undefined && textContent) {
                row.cells[columnTemplate.cellIndex].value = textContent.trim();
            }

            /** 푸터 템플릿 텍스트 로그 추가 */
            if (row.type == "footer") {
                console.log(`Footer cell updated at row ${i}, cellIndex ${j}:`, textContent.trim());
                console.log(`Template HTML for footer at row ${i}, cellIndex ${columnTemplate.cellIndex}:`, templateHTML);
                console.log(`Extracted text content at row ${i}, cellIndex ${columnTemplate.cellIndex}:`, textContent.trim());
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

/** 인사평가 점수 계산용 함수 : 계산오차를 최소화 시키기 위해 사용 */
function calculateScore(weight, score) {
    weight = Number(weight);
    score = Number(score);

    /** 환산 점수 계산 */
    const calculatedScore = weight / 100 * score;

    /** 소수점 첫째 자리에서 반올림 */
    const roundedScore = Math.round(calculatedScore * 10) / 10;

    return roundedScore;
}

function calculatePartScore(score, weight) {
    score = Number(score);
    weight = Number(weight);

    const partScore = weight / 100 * score;

    return partScore;
}

function calculateFinalScore(scoreA, weightA, scoreB, weightB) {
    const partScoreA = calculatePartScore(scoreA, weightA);
    const partScoreB = calculatePartScore(scoreB, weightB);

    const totalScore = partScoreA + partScoreB;

    return Math.floor(totalScore * 100) / 100;
}

/** 켄도그리드 현재 페이지의 합계 */
function getGridSum(gridId, fieldName){
    const dataSource = $("#"+gridId).getKendoGrid().dataSource;
    const pageSize = dataSource.pageSize();
    const totalSize = dataSource._data.length;
    let currentPageSize = 0;

    /** pageSize 가 All 일때 */
    if (pageSize === undefined){
        currentPageSize = totalSize;

    /** 마지막 페이지 일때 */
    }else if(dataSource.page() === dataSource.totalPages()){
        currentPageSize = totalSize % pageSize === 0 ? pageSize : totalSize % pageSize;

    }else{
        currentPageSize = pageSize;
    }

    let sum = 0;
    for (let i=0; i<currentPageSize; i++) {
        const currentData = dataSource.view()[i];
        if (currentData && currentData.hasOwnProperty(fieldName)) {
            const value = parseFloat(currentData[fieldName]);
            const amt = isNaN(value) ? 0 : value;
            sum += amt;
        }
    }

    return comma(sum);
}

function hancomTemplate(type){
    let html = '';
    if(type == 1){
        html += '<table border="5" style="font-family:굴림체; margin: 0 auto; max-width: none; border-collapse: separate; border-spacing: 0; empty-cells: show; border-width: 0; text-align: left; font-size:12px; line-height: 20px; width: 100%; ">';
        html += '   <tr>';
        html += '       <td style="border-width: 0 0 0 0; font-weight: normal; box-sizing: border-box;">';
        html += '           <table border="5" style="border-collapse: collapse; margin: 0px;">';
        return html;
    }else if(type == 2){
        html += '           </table>';
        html += '       </td>';
        html += '   </tr>';
        html += '</table>';
        return html;
    }
}

function formatInputDate(input) {
    // 사용자 입력값은 모두 숫자만 받는다.(나머지는 ""처리)
    let val = input.value.replace(/\D/g, '');
    let leng = val.length;

    // 출력할 결과 변수
    let result = '';

    // 2022-1 : 출력
    if(leng < 5) result = val;
    // 2022-10, 2022-10-1으로 출력
    else if(leng < 7){
        result += val.substring(0,4);
        result += "-";
        result += val.substring(4);
        // 2022-10-10으로 출력
    } else{
        result += val.substring(0,4);
        result += "-";
        result += val.substring(4,6);
        result += "-";
        result += val.substring(6);
    }
    
    input.value = result;
}

function checkValidDate (value) {
    let result = true;
    let date = value.split("-");
    let y = parseInt(date[0], 10),
        m = parseInt(date[1], 10),
        d = parseInt(date[2], 10);

    let dateRegex = /^(?=\d)(?:(?:31(?!.(?:0?[2469]|11))|(?:30|29)(?!.0?2)|29(?=.0?2.(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))(?:\x20|$))|(?:2[0-8]|1\d|0?[1-9]))([-.\/])(?:1[012]|0?[1-9])\1(?:1[6-9]|[2-9]\d)?\d\d(?:(?=\x20\d)\x20|$))?(((0?[1-9]|1[012])(:[0-5]\d){0,2}(\x20[AP]M))|([01]\d|2[0-3])(:[0-5]\d){1,2})?$/;
    result = dateRegex.test(d+'-'+m+'-'+y) ? true : false;

    return result;
}

function inputTimeColon(time) {

    // replace 함수를 사용하여 콜론( : )을 공백으로 치환한다.
    var replaceTime = time.value.replace(/\:/g, "");

    // 텍스트박스의 입력값이 4~5글자 사이가 되는 경우에만 실행한다.
    if(replaceTime.length >= 4 && replaceTime.length < 5) {

        var hours = replaceTime.substring(0, 2);      // 선언한 변수 hours에 시간값을 담는다.
        var minute = replaceTime.substring(2, 4);    // 선언한 변수 minute에 분을 담는다.

        // isFinite함수를 사용하여 문자가 선언되었는지 확인한다.
        if(isFinite(hours + minute) == false) {
            alert("문자는 입력하실 수 없습니다.");
            time.value = "00:00";
            return false;
        }

        // 두 변수의 시간과 분을 합쳐 입력한 시간이 24시가 넘는지를 체크한다.
        if(hours + minute > 2400) {
            alert("시간은 24시를 넘길 수 없습니다.");
            time.value = "24:00";
            return false;
        }

        // 입력한 분의 값이 60분을 넘는지 체크한다.
        if(minute > 60) {
            alert("분은 60분을 넘길 수 없습니다.");
            time.value = hours + ":00";
            return false;
        }

        time.value = hours + ":" + minute;
    }
}

/** yyyy-MM-dd의 형식과 일자를 받아 다음달 날짜를 출력 */
function setNextMonthDate(date, day){
    date = new Date(date);
    date.setDate(1);
    date.setMonth(date.getMonth() + 1);
    date.setDate(day);

    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');

    return yyyy + '-' + mm + '-' + dd;
}

/** 주민등록번호를 입력받아 생년월일 데이터 출력 */
function convertRrnToDate(rrn) {
    if (rrn.length != 14 || rrn.charAt(6) != "-") {
        return "00000000";
    }

    const yearPrefix19 = ["1", "2"];
    const yearPrefix20 = ["3", "4"];

    const yearLastTwoDigits = rrn.substring(0, 2);
    const month = rrn.substring(2, 4);
    const day = rrn.substring(4, 6);
    const genderCode = rrn.charAt(7);

    let yearPrefix = "19";
    if (yearPrefix19.includes(genderCode)) {
        yearPrefix = "19";
    } else if (yearPrefix20.includes(genderCode)) {
        yearPrefix = "20";
    } else {
        return "00000000";
    }
    const year = yearPrefix + yearLastTwoDigits;

    return `${year}-${month}-${day}`;
}