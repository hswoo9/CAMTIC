

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

function inputNumberFormat (obj){
    obj.value = comma(uncomma(obj.value));
}

function comma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}

function uncomma(str) {
    str = String(str);
    return str.replace(/[^\d]+/g, '');
}

function onlyNumber(e) {
    e.value = e.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
}

function fn_getProject(key){
    var data = {

    }

    var url = "/g20/getProjectView";
    var name = "_blank";
    var option = "width = 900, height = 580, top = 200, left = 400, location = no"
    var popup = window.open(url, name, option);
    // customKendo.fn_customAjax("/projectRnd/getProject", data);
    // fnCommonCodePop('project', '', 'projectCallback');
}


function fn_getSubject(key){

    // var params = JSON.stringify(data);

    var url = "/g20/getSubjectView";
    var option = "width = 900, height = 580, top = 200, left = 400, location = no"

    window.open("","g20Form", option);

    var g20Form = document.g20Form;

    g20Form.action = url;
    g20Form.target = "g20Form";
    g20Form.method = "post";


    g20Form.submit();

    // customKendo.fn_customAjax("/projectRnd/getProject", data);
    // fnCommonCodePop('project', '', 'projectCallback');
}

function fnCommonCodePop(code, obj, callback, data) {
    /* [ parameter ] */
    /*   - obj : 전송할 파라미터 */
    obj = (obj || {});
    /*   - callback : 코백 호출할 함수 명 */
    callback = (callback || '');
    /*   - data : 더미 */
    data = (data || {});

    /* 팝업 호출 */
    obj.widthSize = code === 'project' ? 993 : 780; // dj 커스텀
    obj.heightSize = 582;

    fnCallCommonCodePop({
        code : code,
        popupType : 2,
        param : JSON.stringify(obj),
        callbackFunction : callback,
        dummy : JSON.stringify(data)
    });
}

function fnCallCommonCodePop(param, data){
    if(param.code != undefined){
        param.code = param.code.toLowerCase();
    }
    data = (data || []);
    fnDirectSearchCommonCode(param, data);
}

function fnDirectSearchCommonCode(params, paramData){
    var tempParam = [];
    var ajaxParam = {};
    basicPopupType = params.popupType;
    tempParam["param"] = params;
    tempParam["param"].popupType = "1";
    tempParam["data"] = paramData;
    ajaxParam.param = JSON.stringify(tempParam["param"]);
    ajaxParam.data = JSON.stringify(tempParam["data"]);
    /* 공통코드 호출 */
    $.ajax({
        type : 'post',
        url : "/expend/np/user/NpCommonCodePop.do",
        datatype : 'json',
        async : true,
        data : ajaxParam,
        success : function( data ) {

            if(!!(JSON.parse(params.param).selectedBudgetSeqs)){
                var newAaData = [];
                for(var i = 0; i < data.result.aaData.length; i++ ){
                    var item = data.result.aaData[i];
                    if( (JSON.parse(params.param).selectedBudgetSeqs.indexOf('|' + (item.erpBudgetSeq || item.BGT_CD) + '|') == -1) ){
                        newAaData.push(item);
                    }
                }
                data.result.aaData = newAaData;
            }

            if( data != null && data.result != null && data.result.aaData != null && data.result.aaData.length == 1){
                fnDirectSearchCallback(params, data);
            }else{
                params.popupType = basicPopupType;
                switch(params.popupType.toString()){
                    case "1" :
                        /* 공통코드 바로 조회 콜백 */
                        fnDirectSearchCallback(params, data.result.aaData);
                        break;
                    case "2" :
                        /* 일반팝업 호출 */
                        fnOpenCommonCodeBasicPop(params, data.result.aaData);
                        break;
                    case "3" :
                        /* 레이어팝업 호출 */
                        fnOpenCommonCodeLayerPop(params, data.result.aaData);
                        break;
                    default :
                        console.log("코드 조회 방식 미설정");
                        break;
                }
            }
        },
        error : function( data ) {
            console.log('오류다!확인해봐!이상해~!!악!');
        }
    });
}

function fileDown(filePath, fileName){
    kendo.saveAs({
        dataURI: "/common/fileDownload.do?filePath=" + filePath + "&fileName=" + encodeURIComponent(fileName),
    });
}

function fileChange(e){
    $(e).next().text($(e)[0].files[0].name);
}

var commonProject = {
    global : {
        /** 자기 자신이 협업프로젝트인지(Y) 수주부서프로젝트인지(N) */
        teamStat : "",

        /** 협업중인 프로젝트가 있는지(Y) 단독인지(N) */
        teamYn : "",

        /** 엔지니어링(D) 알앤디(R) 비알앤디(S) */
        busnClass : "",

        /** 협업프로젝트 계획서(공정)단계 마감인지(Y) 진행중인지(N)*/
        devTeamCk : "",

        /** 협업프로젝트 최종마감인지(Y) 진행중인지(N)*/
        pjtTeamCk : ""
    },

    loading : function(){
        $.LoadingOverlay("show", {
            background: "rgba(0, 0, 0, 0.5)",
            image: "",
            maxSize: 60,
            fontawesome: "fa fa-spinner fa-pulse fa-fw",
            fontawesomeColor: "#FFFFFF",
        });
    },

    setPjtStat : function(){
        const pjtResult = customKendo.fn_customAjax("/project/getProjectInfo", {pjtSn : $("#pjtSn").val()});
        const pjtMap = pjtResult.map;

        commonProject.global.teamStat = pjtMap.TEAM_STAT;
        commonProject.global.teamYn = pjtMap.TM_YN;
        commonProject.global.busnClass = pjtMap.BUSN_CLASS;
        commonProject.global.devTeamCk = pjtMap.DEV_TEAM_CK;
        commonProject.global.pjtTeamCk = pjtMap.PJT_TEAM_CK;
    }
}