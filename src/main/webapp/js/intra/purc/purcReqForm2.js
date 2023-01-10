/**
 * 구매의뢰 데이터 저장
 */

var djEpisPurcReq = {};

djEpisPurcReq.init = function (){
    djEpisPurcReq.eventHandlerMapping()
}

djEpisPurcReq.eventHandlerMapping = function(){
    $('#purcReqInfo input').bind({
        change : function(){
            djEpisPurcReq.purcReqInfoSave();
        }
    });
    $('#attachFile').bind({
        change : function(){
            djTpfAttachFileUpload($(this));
        }
    })
}

djEpisPurcReq.purcReqInfoSave = function(){
    var saveObj = {};

    /** 구매계약 양식 코드 추가 */
    saveObj.purcFormCode = purcFormCode;

    /*구매의뢰서 파라미터 추가*/
    saveObj.regDate = $('#txtGisuDate').val();
    saveObj.purcReqType = $('#purcReqType').val();
    saveObj.purcReqTypeCodeId = $('#purcReqType').attr('CODE');
    saveObj.purcReqNo = $('#purcReqNo').val();
    saveObj.purcReqId = $('#purcReqId').val();
    saveObj.purcReqTitle = $('#purcReqTitle').val();
    saveObj.purcReqDate = $('#purcReqDate').val();
    saveObj.term = $('#term').val();
    saveObj.purcPurpose = $('#purcPurpose').val();
    saveObj.trNm = $('#txt_TR_NM').val();
    saveObj.trCd = $('#txt_TR_NM').attr('CODE');
    saveObj.contType = $("input[name=contType]:checked").attr("text");
    saveObj.contTypeCodeId = $("input[name=contType]:checked").val();
    saveObj.formId = template_key;
    saveObj.trPlace = $('#trPlace').val();
    /*구매의뢰서 파라미터 추가*/

    /*수의구매 파라미터 추가*/
    saveObj.payCon = $('#payCon').data('kendoComboBox').text();
    saveObj.payConCodeId = $('#payCon').val();
    saveObj.payType = $('#payType').data('kendoComboBox').text();
    saveObj.payTypeCodeId = $('#payType').val();
    saveObj.payCnt = $('#payCnt').val();
    saveObj.contAm = $('#contAm').val().toString().toMoney2();
    saveObj.contDate = $('#contDate').val();
    saveObj.regNb = $('#txt_REG_NB').val();
    saveObj.ceoNm = $('#txt_CEO_NM').val();
    saveObj.basicAm = $('#basicAm').val().toString().toMoney2();
    saveObj.rate = $('#rate').val();
    /*수의구매 파라미터 추가*/

    /*G20 2.0 키 추가*/
    saveObj.consDocSeq = consDocSeq;

    /** insert,Update Table Name*/
    saveObj.targetTableName = "V_PURC_INFO_TEMP";

    var resultData = {};
    /*ajax 호출할 파라미터*/
    var opt = {
        url : getContextPath() + "/purc/setPurcInfo.do",
        stateFn : abdocu.state,
        async: false,
        data : saveObj,
        successFn : function(data){
            if(data){
                var purcReqId = data.purcReqId ? data.purcReqId : "0";
                $('#purcReqId').val(purcReqId);
            }else{
                alert("오류가 발생하였습니다. 관리자에게 문의하세요");
            }
        }
        ,
        failFn : function (request, status, error) {
            alert("오류가 발생하였습니다. 관리자에게 문의하세요.");
        }
    };

    acUtil.ajax.call(opt, resultData);
};

djEpisPurcReq.purcReqHAddRow = function(rowno){
    var tr = $('#erpProjectInfo-trsample').clone().show();
    tr.attr('id', '');
    var table = $("#erpProjectInfo-table");
    $('tbody', table).append(tr);
    $(".requirement, .non-requirement", tr).each(function(idx, vlaue){
        var addTabIndex = parseInt(rowno + '00');
        $(this).attr('id', this.name + rowno);
        $(this).attr("tabindex", addTabIndex + idx);
    });
    djAbdocu.ProjectInfo.eventHandlerMapping(tr);
    /*프로젝트영역 이미지(검색) 클릭이벤트*/
    $(".search-Event-H", tr).bind({
        click : function(event){
            var parentEle = $(this).parent();
            var eventEle = $(".non-requirement, .requirement", parentEle).first();
            eventEle.dblclick();
        }
    });
    return tr;
};


/**
 * 예산회계단위
 *
 */
var djAbdocu = {};

djAbdocu.UserInfo = {}; /*ERP 사용자 정보*/
djAbdocu.ProjectInfo = {}; /* 프로젝트 정보 */
djAbdocu.BudgetInfo = {}; /* 예산 정보*/

djAbdocu.ProjectInfo.eventHandlerMapping = function(tr){
    if(djAbdocu.isReffer()){
        return;
    }

    /*구매의뢰서 예산회계단위 프로젝트 복수 사용으로 추가*/
    var DIV_NM_event = function(id){

        $("." + id, tr).attr("disabled", false);
        /*회계단위*/
        $("." + id, tr).bind({
            dblclick : function(){
                var id = $(this).attr("id");
                var dblClickparamMap =
                        [{
                            "id" : id,
                            "text" : "DIV_NM",
                            "code" : "DIV_CD"
                        }];
                /*구매의뢰서 예산회계단위 변경시 프로젝트 예산 정보 초기화 함수 추가*/
                acUtil.util.dialog.dialogDelegate(djAcG20Code.getErpDIVList, dblClickparamMap, null, fnDivCdSet);
            }
        });
    };

    $(tr).bind({
        click : function(){
            fnSelMgtTr(tr);
        }
    });

    $('.btndeleteRow', tr).bind({
        click : function(){
            fnDelMgtTr(tr);
        }
    });

    /*구매의뢰서 예산회계단위 프로젝트 복수 사용으로 추가*/

    DIV_NM_event("txtDIV_NM");

    /*프로젝트명*/
    $(".txt_ProjectName", tr).bind({
        dblclick : function(){
            var id = $(this).attr("id");
            var dblClickparamMap =
                    [{
                        "id" : id,
                        "text" : "PJT_NM",
                        "code" : "PJT_CD"
                    },
                        {
                            "id" : "txt_PJT_FR_DT",
                            "text" : "PJT_FR_DT",
                            "code" : "PJT_FR_DT"
                        },
                        {
                            "id" : "txt_PJT_TO_DT",
                            "text" : "PJT_TO_DT",
                            "code" : "PJT_TO_DT"
                        },
                        {
                            "id" : "txt_IT_BUSINESSLINK",
                            "text" : "IT_BUSINESSLINK",
                            "code" : "IT_BUSINESSLINK"
                        }];

            var erp_dept_cd= $("#txtDEPT_NM").attr("CODE");
            var erp_emp_cd = $("#txtKOR_NM").attr("CODE");

            if(erp_dept_cd == "" || erp_emp_cd == ""){
                alert("작성자정보를 선택해 주세요");
            }
            var tblParam = { };
            tblParam.EMP_CD = erp_emp_cd;
            tblParam.FG_TY = erpOption.BgtMngType;
            tblParam.CO_CD = abdocuInfo.erp_co_cd;

            acUtil.util.dialog.dialogDelegate(djAcG20Code.getErpMgtList, dblClickparamMap, null, fnMgtCdSet, tblParam);
        }
    });

    /*하위사업*/
    $(".txtBottom_cd", tr).bind({
        dblclick : function(){
            var MGT_CD = $(".txt_ProjectName", tr).attr("CODE");
            if(!MGT_CD){
                alert("프로젝트를 선택해주세요.");
                $(".txt_ProjectName", tr).focus();
                return;
            }

            var tblParam = {};
            tblParam.MGT_CD = MGT_CD;
            tblParam.CO_CD = abdocuInfo.erp_co_cd;

            var id = $(this).attr("id");
            var dblClickparamMap =
                    [{
                        "id" : id,
                        "text" : "BOTTOM_NM",
                        "code" : "BOTTOM_CD"
                    }];
            acUtil.util.dialog.dialogDelegate(acG20Code.getErpAbgtBottomList, dblClickparamMap, null, null, tblParam);
        }
    });
};

djAbdocu.BudgetInfo.eventHandlerMapping = function(context, index){
    var table = $("#erpBudgetInfo-table");
    if(!context){
        context = table;
    }

    if(!djAbdocu.isReffer()){
        /*예산과목명*/
        $(".txt_BUDGET_LIST, .txt_BGTNM_REF, .txt_BGTNMCD", context).bind({
            dblclick : function(){

                /*ajax 호출할 파라미터*/
                var GISU_DT = $("#txt_GisuDt").val();
                var GR_FG = "2"; /*예산과목의 수입/지출구분*/
                if(abdocuInfo.docu_mode=="1" &&  (abdocuInfo.docu_fg == "5" || abdocuInfo.docu_fg == "7") ){
                    GR_FG = "1";
                }

                if(abdocuInfo.docu_mode=="0" && abdocuInfo.docu_fg == "8"){
                    GR_FG = "1";
                }
                /*구매의뢰서 수정*/
                var table = $('#erpProjectInfo-table');
                var tr = $('#' + abdocu_no, table);
                var DIV_CDS = $(".txtDIV_NM", tr).attr("CODE") + "|";
                var MGT_CDS = $(".txt_ProjectName", tr).attr("CODE") + "|";
                var BOTTOM_CDS = $(".txtBottom_cd", tr).attr("CODE") || "";
                /*구매의뢰서 수정*/
                //    if(BOTTOM_CDS !=""){ BOTTOM_CDS + '|';   };
                if(!ncCom_Empty(BOTTOM_CDS)){
                    BOTTOM_CDS = BOTTOM_CDS + "|";
                };

                /* OPT_01(예산과목표시)   2 : 당기편성, 1 : 모든예산, 3 : 프로젝트기간 */
                var OPT_01 = $(":input[name=OPT_01]:checked").val() || "2";
                /* OPT_02(사용기한)   1 : 모두표시, 2 : 사용기한경과분 숨김 */
                var OPT_02 = $(":input[name=OPT_02]:checked").val() || "1";
                /* 상위과목표시( 1, 2 ) */
                var OPT_03 = "2";

                var tblParam = {}
                tblParam.GISU_DT = GISU_DT;
                tblParam.GR_FG = GR_FG;
                tblParam.DIV_CDS = DIV_CDS;
                tblParam.MGT_CDS = MGT_CDS;
                tblParam.BOTTOM_CDS = BOTTOM_CDS;
                tblParam.OPT_01 = OPT_01;
                tblParam.OPT_02 = OPT_02;
                tblParam.OPT_03 = OPT_03;
                tblParam.CO_CD  = abdocuInfo.erp_co_cd;
                tblParam.FR_DT  = abdocuInfo.erp_gisu_from_dt;
                tblParam.TO_DT  = abdocuInfo.erp_gisu_to_dt;
                tblParam.GISU   = abdocuInfo.erp_gisu;
                tblParam.BgtStep7UseYn = erpOption.BgtStep7UseYn;

                var id = $(this).attr("id");
                $.eventEle = id;
                var dblClickparamMap =
                        (function(ID, idx){
                            var returnObj =
                                    [{
                                        "id" : id,
                                        "text" : "BGT_NM",
                                        "code" : "BGT_CD"
                                    },
                                        {
                                            "id" : "IT_SBGTCDLINK" + idx,
                                            "text" : "IT_SBGTCDLINK",
                                            "code" : "IT_SBGTCDLINK"
                                        }];
                            return returnObj;

                        })(id, index);
                acUtil.util.dialog.dialogDelegate(djAcG20Code.getErpBudgetList, dblClickparamMap, null, djBgtCdSet, tblParam);
            }
        });
    }
    /*예산사업장명*/
    $(".txt_BUDGET_DIV_NM", context).bind({
        dblclick : function(){
            var id = $(this).attr("id");
            var dblClickparamMap =
                    [{
                        "id" : id,
                        "text" : "DIV_NM",
                        "code" : "DIV_CD"
                    }];

            acUtil.util.dialog.dialogDelegate(djAcG20Code.getErpDIVList, dblClickparamMap);
        }
    });
    $(".nextAm", context).bind({
        keyup : function(){
            $(this).val($(this).val().toString().toMoney());
        }
    })
};

/** 예산액, 예산잔액, 집행액 구하기 */
djAbdocu.BudgetInfo.getBudgetInfo = function(id){
    var txt_BUDGET_LIST = $("#" + id);
    var obj =  {};
    var pjtTr = $('#' + abdocuInfo.abdocu_no, $('#erpProjectInfo-table'));
    obj.DIV_CD    = $(".txtDIV_NM", pjtTr).attr("CODE");
    obj.BGT_CD    = txt_BUDGET_LIST.attr("CODE");
    obj.MGT_CD    = $(".txt_ProjectName", pjtTr).attr("CODE");
    obj.SUM_CT_AM = 0;
    obj.GISU_DT   = abdocuInfo.erp_gisu_dt;
    obj.BOTTOM_CD = $(".txtBottom_cd", pjtTr).attr("CODE") || "";
    obj.DOCU_MODE = abdocuInfo.docu_mode;
    obj.CO_CD     = abdocuInfo.erp_co_cd;
    obj.FROM_DT     = abdocuInfo.erp_gisu_from_dt;
    obj.TO_DT     = abdocuInfo.erp_gisu_to_dt;
    obj.GISU      = abdocuInfo.erp_gisu;

    /* G20 2.0 파라미터 추가 */
    obj.consDocSeq   = consDocSeq;
    obj.mgtSeq       = $(".txt_ProjectName", pjtTr).attr("CODE");
    obj.budgetSeq    = txt_BUDGET_LIST.closest("tr").attr("id");
    obj.erpBudgetSeq = txt_BUDGET_LIST.attr("CODE");
    obj.gisu         = abdocuInfo.erp_gisu;
    obj.bottomSeq    = $(".txtBottom_cd", pjtTr).attr("CODE") || "";

    /* G20 2.0 파라미터 추가 */

    /*ajax 호출할 파라미터*/
    var opt = {
        url : _g_contextPath_ + "/Ac/G20/Ex/getBudgetInfo.do",
        stateFn:abdocu.state,
        async:false,
        data : obj,
        type:"post",
        successFn : function(data){

            /* TODO 상배: 예산단위 래밸에 따른 출력 포멧 변경이 필요함.
            	 * 예산단위 확인할 방법이 필요
            	 * */

            /*$.txt_BUDGET_LIST1, $.txt_BUDGET_LIS2  데이터 저장 */
            var result = data.result;
            var eventEle = $("#" + id);
            var parentEle = eventEle.parents("tr");
            $(".BGT01_NM", parentEle).val(result.BGT01_NM).attr("CODE", result.BGT01_CD || '');
            $(".BGT02_NM", parentEle).val(result.BGT02_NM).attr("CODE", result.BGT02_CD || '');
            $(".BGT03_NM", parentEle).val(result.BGT03_NM).attr("CODE", result.BGT03_CD || '');
            $(".BGT04_NM", parentEle).val(result.BGT04_NM).attr("CODE", result.BGT04_CD || '');

            $(".LEVEL01_NM", parentEle).val(result.LEVEL01_NM);
            $(".LEVEL02_NM", parentEle).val(result.LEVEL02_NM);
            $(".LEVEL03_NM", parentEle).val(result.LEVEL03_NM);
            $(".LEVEL04_NM", parentEle).val(result.LEVEL04_NM);
            $(".LEVEL05_NM", parentEle).val(result.LEVEL05_NM);
            $(".LEVEL06_NM", parentEle).val(result.LEVEL06_NM);

            $(".OPEN_AM", parentEle).val(result.OPEN_AM);
            $(".ACCT_AM", parentEle).val(result.ACCT_AM);
            $(".DELAY_AM", parentEle).val(result.DELAY_AM);
            $(".APPLY_AM", parentEle).val(result.APPLY_AM);
            $(".LEFT_AM", parentEle).val(result.LEFT_AM);
            $(".CTL_FG", parentEle).val(result.CTL_FG);

            $("#td_veiw_BGT01_NM").html(result.BGT01_NM || "");
            $("#td_veiw_BGT02_NM").html(result.BGT02_NM || "");
            $("#td_veiw_BGT03_NM").html(result.BGT03_NM || "");
            $("#td_veiw_BGT04_NM").html(result.BGT04_NM || "");
            $("#td_veiw_OPEN_AM").html((result.OPEN_AM || "0").toString().toMoney());
            $("#td_veiw_ACCEPT_AM").html((result.ACCEPT_AM || "0").toString().toMoney());
            $("#td_veiw_APPLY_AM").html((result.APPLY_AM || "0").toString().toMoney());
            $("#td_veiw_REFER_AM").html((result.REFER_AM || "0").toString().toMoney());
            $("#td_veiw_LEFT_AM").html((result.LEFT_AM || ")").toString().toMoney());

            /*구매요청서 추가*/
            if(result.BGT04_CD){
                $(".txt_BGTNM_REF", parentEle).val(result.BGT03_NM);
                $(".txt_BGTNM_REF", parentEle).attr("CODE", result.BGT03_CD);
                $(".txt_BUDGET_LIST", parentEle).val(result.BGT04_NM);
                $(".txt_BUDGET_LIST", parentEle).attr("CODE", result.BGT04_CD);
            }else if(result.BGT03_CD){
                $(".txt_BGTNM_REF", parentEle).val(result.BGT02_NM);
                $(".txt_BGTNM_REF", parentEle).attr("CODE", result.BGT02_CD);
                $(".txt_BUDGET_LIST", parentEle).val(result.BGT03_NM);
                $(".txt_BUDGET_LIST", parentEle).attr("CODE", result.BGT03_CD);
            }else{
                $(".txt_BGTNM_REF", parentEle).val(result.BGT01_NM);
                $(".txt_BGTNM_REF", parentEle).attr("CODE", result.BGT01_CD);
                $(".txt_BUDGET_LIST", parentEle).val(result.BGT02_NM);
                $(".txt_BUDGET_LIST", parentEle).attr("CODE", result.BGT02_CD);
            }
            /*구매요청서 추가*/
            $(".txt_BGTNMCD", parentEle).val('(' + result.BGT_CD + ') ' + result.BGT_NM);
        }
    };

    /*결과 데이터 담을 객체*/
    acUtil.resultData = {};
    acUtil.ajax.call(opt, acUtil.resultData );
};

/**
 * 현재 문서가 참조품의 가져오기 한 결의서 인지?
 */
djAbdocu.isReffer = function(){
    return mode && abdocu_no_reffer;
};

/**
 * 첨부파일 선택창 오픈
 * */
function djFileOpen(fileType, fileGubun){
    $('#fileType').val(fileType);
    $("#fileGubun").val(fileGubun);
    $('#attachFile').click();
}

/**
 * 첨부파일 업로드
 * */
function djTpfAttachFileUpload(obj){
    var targetId = $('#purcReqId').val();
    if(!targetId || targetId == '0'){
        djEpisPurcReq.purcReqInfoSave();
        targetId = $('#purcReqId').val();
    }

    var fileType = $('#fileType').val();
    var fileForm = obj.closest('form');
    var fileInput = obj;
    var fileList = djCommonFileUpload(targetId, fileForm);
    $.each(fileList, function(){
        var span = $('#fileSample td div').clone();
        $('.file_name', span).html(this.fileOrgName + "." + this.fileExt);
        $('.attachFileId', span).val(this.file_no);
        //$('.fileSeq', span).val(this.fileSeq);
        $('.filePath', span).val(this.filePath);
        $('.fileNm', span).val(this.fileOrgName + "." + this.fileExt);
        $('#fileArea'+fileType).append(span);
    });
    fileInput.unbind();
    fileForm.clearForm();
    fileInput.bind({
        change : function(){
            djTpfAttachFileUpload($(this));
        }
    })
}

/**
 * 첨부파일 업로드
 * parmas :	targetId = 타겟아이디
 * 				fileFormId = 파일폼아이디
 * return :		returnData
 */
function djCommonFileUpload(targetId, fileForm){
    var returnData;
    var data = {
        menuCd : $("#menuCd").val(),
        empSeq : $('#empSeq').val(),
        purcId : $('#purcReqId').val(),
        /** Update Table Name*/
        targetTableName : "V_PURC_INFO_TEMP"
    }
    $(fileForm).ajaxSubmit({
        url : getContextPath() + "/purc/setPurcInfoFileUpload.do",
        data : data,
        dataType : 'json',
        type : 'post',
        processData : false,
        contentType : false,
        async: false,
        success : function(result) {
            returnData = result.commFileList;
        },
        error : function(error) {
            console.log(error);
            console.log(error.status);
        }
    });
    return returnData;
}

function djBgtCdSet(sel, dblClickparamMap){
    /*event 발생한 txt_BUDGET_LIST(예산과목명) */
    djAbdocu.BudgetInfo.getBudgetInfo(dblClickparamMap[0].id);

    var eventEle = $("#" + dblClickparamMap[0].id);
    var parentEle = eventEle.parents("tr");

    var set_fg = $(".selectNA_G20RESOL_WAY", parentEle).val();
    var IT_SBGTCDLINK = $(".IT_SBGTCDLINK", parentEle).val();

    if( erpOption.BizGovUseYn != "1" || $("#txt_IT_BUSINESSLINK").val() != "1" || IT_SBGTCDLINK != "1" || set_fg == 4){
        $(".selectIT_USE_WAY", parentEle).val("");
        $(".selectIT_USE_WAY", parentEle).attr("disabled", true);
    }else{
        $(".selectIT_USE_WAY", parentEle).val("01");
        $(".selectIT_USE_WAY", parentEle).attr("disabled", false);
    }
}