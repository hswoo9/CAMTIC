/**
 * 2022.07.05
 * 증명서 조회 페이지
 * function / global variable / local variable setting
 */
var employmentPop = {
    global : {
        params                  : "",
        type                    : "",
        hwpCtrl                 : "",
        flag                    : false,
        data                    : "",
        loginVO : "",

        /** 기안기 셋팅 옵션 (파일, editing mode)*/
        templateFormFile : "",
        templateFormOpt : "",
        templateFormCustomField : "",
        openFormat : "",
        mod : "",

        formData : new FormData(),
        searchAjaxData : "",
    },

    init : function(params, loginVO){
        document.querySelector('body').style.overflow = 'hidden';
        $("#loadingText").text("문서를 불러오는 중입니다.");
        employmentPop.global.params = params;
        employmentPop.global.loginVO = loginVO;

        $(document).ready(function() {
            employmentPop.global.hwpCtrl = BuildWebHwpCtrl("hwpApproveContent", employmentPop.global.params.hwpUrl, function () {employmentPop.editorComplete();});
            window.onresize();
        });

        window.onresize = function () {employmentPop.resize()};
    },

    editorComplete : function() {
        var uri = employmentPop.global.params.hwpUrl;
        if(String(uri).indexOf("1.233.95.140") > -1){
            employmentPop.open(
                "http://218.158.231.186/upload/salaryForm/"+ "salaryCont.hwp",
                "HWP",
                "",
                {"userData" : "success"}
            )
        }else if(String(uri).indexOf("10.10.10.112") > -1){
            employmentPop.open(
                "http://218.158.231.186/upload/salaryForm/"+ "salaryCont.hwp",
                "HWP",
                "",
                {"userData" : "success"}
            )
        }
    },

    resize : function() {
        if (document.getElementById("hwpctrl_frame") != null && typeof(document.getElementById("hwpctrl_frame")) != "undefined") {
            var pHeight = (window.innerHeight - 20) + "px";
            document.getElementById("hwpctrl_frame").style.width = "100%";
            document.getElementById("hwpctrl_frame").style.height = pHeight;
        }
    },

    open : function(url, format, type, name) {
        return employmentPop.global.hwpCtrl.Open(url, format, type,
            function (res) {
                if(res.result){
                    employmentPop.viewOpenCallBack();
                }else{
                    alert("문서를 찾을 수 없습니다.");
                }

                $("#loadingDiv").hide();
                document.querySelector('body').style.overflow = 'auto'

            }, name);
    },

    viewOpenCallBack : function(){
        employmentPop.openCallBack();
        employmentPop.global.hwpCtrl.EditMode = 0;
        employmentPop.global.hwpCtrl.SetToolBar(1, "TOOLBAR_MENU");
        employmentPop.global.hwpCtrl.SetToolBar(1, "TOOLBAR_STANDARD");
        employmentPop.global.hwpCtrl.ShowRibbon(false);
        employmentPop.global.hwpCtrl.ShowCaret(false);
        employmentPop.global.hwpCtrl.ShowStatusBar(false);
        employmentPop.global.hwpCtrl.SetFieldViewOption(1);
    },

    openCallBack : function(){
        employmentPop.global.searchAjaxData = {
            salaryContractId : employmentPop.global.params.salaryContractId,
        }
        var result = customKendo.fn_customAjax("/userManage/getEmploymentInfo.do", employmentPop.global.searchAjaxData);
        if(result.flag){
            employmentPop.global.data = result.data;
            
            if(employmentPop.global.hwpCtrl.FieldExist("regYear")){
                let regYear = result.data.SALARY_CONTRACT_REQ_DT.substr(0, 4) + '년도 연봉 명세서';
                employmentPop.global.hwpCtrl.MoveToField('regYear', true, true, false);
                employmentPop.putFieldText('regYear', regYear);
            }

            if(employmentPop.global.hwpCtrl.FieldExist("empName")){
                employmentPop.global.hwpCtrl.MoveToField('empName', true, true, false);
                employmentPop.putFieldText('empName', result.data.EMP_NAME_KR);
            }

            if(employmentPop.global.hwpCtrl.FieldExist("deptName")){
                employmentPop.global.hwpCtrl.MoveToField('deptName', true, true, false);
                employmentPop.putFieldText('deptName', result.data.DEPT_NAME2);
            }

            if(employmentPop.global.hwpCtrl.FieldExist("positionName")){
                employmentPop.global.hwpCtrl.MoveToField('positionName', true, true, false);
                employmentPop.putFieldText('positionName', result.data.POSITION_NAME);
            }

            if(employmentPop.global.hwpCtrl.FieldExist("bySalary")){
                employmentPop.global.hwpCtrl.MoveToField('bySalary', true, true, false);
                employmentPop.putFieldText('bySalary', employmentPop.comma(result.data.BY_SALARY));
            }

            if(employmentPop.global.hwpCtrl.FieldExist("nyRaiseSalary")){
                employmentPop.global.hwpCtrl.MoveToField('nyRaiseSalary', true, true, false);
                employmentPop.putFieldText('nyRaiseSalary', employmentPop.comma(result.data.NY_RAISE_SALARY));
            }

            if(employmentPop.global.hwpCtrl.FieldExist("nySalary")){
                employmentPop.global.hwpCtrl.MoveToField('nySalary', true, true, false);
                employmentPop.putFieldText('nySalary', employmentPop.comma(result.data.NY_SALARY));
            }

            if(employmentPop.global.hwpCtrl.FieldExist("nyDecisionSalary")){
                employmentPop.global.hwpCtrl.MoveToField('nyDecisionSalary', true, true, false);
                employmentPop.putFieldText('nyDecisionSalary', employmentPop.comma(result.data.NY_DECISION_SALARY));
            }

            if(employmentPop.global.hwpCtrl.FieldExist("regDt")){
                employmentPop.global.hwpCtrl.MoveToField('regDt', true, true, false);
                employmentPop.putFieldText('regDt', result.data.SALARY_CONTRACT_REQ_DT2);
            }

            if(result.data.FLAG == "Y"){
                if(employmentPop.global.hwpCtrl.FieldExist("empSign")){
                    employmentPop.global.hwpCtrl.MoveToField('empSign', true, true, false);
                    employmentPop.putFieldText('empSign', result.data.EMP_NAME_KR);
                }
            }

            if(result.data.FLAG == "N" && employmentPop.global.loginVO.uniqId == employmentPop.global.data.EMP_SEQ){
                $("#popBtnDiv").prepend("<button type=\"button\" class=\"k-button k-button-solid-info\" id=\"okBtn\" onClick=\"employmentPop.ok()\">서명</button>")

            }
        }
    },
    
    /**
     * 웹한글기안기는 ""로 데이터 클리어 안됨
     *
     * @param field = 삽입할 필드 이름 (DATA TYPE = String)
     * @param text = 삽입할 텍스트 (DATA TYPE = String)
     */
    putFieldText : function(field, text) {
        if (text == ""){
            text = "\n";
        }
        employmentPop.global.hwpCtrl.PutFieldText(field, text);
    },

    ok : function(){
        if(confirm("서명하시겠습니까?")){
            if(employmentPop.global.hwpCtrl.FieldExist("empSign")){
                employmentPop.global.hwpCtrl.MoveToField('empSign', true, true, false);
                employmentPop.putFieldText('empSign', employmentPop.global.data.EMP_NAME);
            }

            employmentPop.global.saveAjaxData = {
                salaryContractId : employmentPop.global.params.salaryContractId,
                regEmpSeq : employmentPop.global.loginVO.uniqId,
                flag : "Y"
            }

            var result = customKendo.fn_customAjax("/userManage/setEmploymentInfoFlag.do", employmentPop.global.saveAjaxData);
            if(result.flag){
                alert("완료되었습니다.");
                opener.parent.gridReload();
                window.close();
            }
        }
    },

    getPdfFileDown : function(){
        employmentPop.global.hwpCtrl.SaveAs(employmentPop.global.data.DEPT_NAME + "_" +
            employmentPop.global.data.EMP_NAME_KR + "_연봉근로계약서" , "PDF", "download:true");
    },

    //
    // print: function() {
    //     var data = {
    //         userProofSn : $("#userProofSn").val(),
    //         empSeq : $("#empSeq").val(),
    //         status : 110
    //     }
    //
    //     var result = customKendo.fn_customAjax("/inside/setReqCert", data);
    //
    //     if(result.flag){
    //         employmentPop.global.hwpCtrl.PrintDocument();
    //         opener.gridReload();
    //     }
    // }

    uncomma: function(str) {
        str = String(str);
        return str.replace(/[^\d]+/g, '');
    },

    comma: function(str) {
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    },
}
