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
            console.log(result);
            employmentPop.global.data = result.data;
            if(employmentPop.global.hwpCtrl.FieldExist("compEmpName")){
                employmentPop.global.hwpCtrl.MoveToField('compEmpName', true, true, false);
                employmentPop.putFieldText('compEmpName', '캠틱종합기술원장');
            }

            if(employmentPop.global.hwpCtrl.FieldExist("compEmpSign")){
                employmentPop.global.hwpCtrl.MoveToField('compEmpSign', true, true, false);
                // employmentPop.global.hwpCtrl.InsertBackgroundPicture(
                //     "SelectedCell",
                //     "http://121.186.165.80:8010/upload/bustrip/2023/05/02/294da7fcdc3e47e688dbad1644816c70.png",
                //     1,
                //     5,
                //     0,
                //     0,
                //     0,
                //     0
                // );
                employmentPop.putFieldText('compEmpSign', '노상흡');
            }

            if(employmentPop.global.hwpCtrl.FieldExist("empName")){
                employmentPop.global.hwpCtrl.MoveToField('empName', true, true, false);
                employmentPop.putFieldText('empName', result.data.EMP_NAME_KR);
            }

            if(employmentPop.global.hwpCtrl.FieldExist("bday")){
                employmentPop.global.hwpCtrl.MoveToField('bday', true, true, false);
                employmentPop.putFieldText('bday', result.data.BDAY);
            }

            if(employmentPop.global.hwpCtrl.FieldExist("addr")){
                var addr = result.data.ZIP_CODE + " " + result.data.ADDR;
                employmentPop.global.hwpCtrl.MoveToField('addr', true, true, false);
                if(result.data.ADDR_DETAIL != null){
                    addr += " " + result.data.ADDR_DETAIL
                }
                employmentPop.putFieldText('addr', addr);
            }

            if(employmentPop.global.hwpCtrl.FieldExist("contractStDt")){
                employmentPop.global.hwpCtrl.MoveToField('contractStDt', true, true, false);
                employmentPop.putFieldText('contractStDt', result.data.CONTRACT_ST_DT2 + "부터 ");
            }

            if(employmentPop.global.hwpCtrl.FieldExist("contractEnDt")){
                employmentPop.global.hwpCtrl.MoveToField('contractEnDt', true, true, false);
                employmentPop.putFieldText('contractEnDt', result.data.CONTRACT_EN_DT2 + "까지");
            }

            if(employmentPop.global.hwpCtrl.FieldExist("deptName")){
                employmentPop.global.hwpCtrl.MoveToField('deptName', true, true, false);
                employmentPop.putFieldText('deptName', result.data.DEPT_NAME);
            }

            if(employmentPop.global.hwpCtrl.FieldExist("jobDetail")){
                employmentPop.global.hwpCtrl.MoveToField('jobDetail', true, true, false);
                employmentPop.putFieldText('jobDetail', result.data.JOB_DETAIL);
            }


            if(employmentPop.global.hwpCtrl.FieldExist("monthSalary")){
                employmentPop.global.hwpCtrl.MoveToField('monthSalary', true, true, false);
                employmentPop.putFieldText('monthSalary', "가. 월기준급여액 : 금 " + employmentPop.numToKOR(result.data.MONTH_SALARY) + "원(￦" + result.data.MONTH_SALARY.toString().toMoney() + ") 으로 한다");
            }

            if(employmentPop.global.hwpCtrl.FieldExist("totalSalary")){
                employmentPop.global.hwpCtrl.MoveToField('totalSalary', true, true, false);
                employmentPop.putFieldText('totalSalary', "나. 총연봉액(월기준급여액x12) : 금 " + employmentPop.numToKOR(result.data.TOTAL_SALARY) + "원(￦" + result.data.TOTAL_SALARY.toString().toMoney() + ")");
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

    numToKOR : function(num){
        var hanA = new Array("","일","이","삼","사","오","육","칠","팔","구","십");
        var danA = new Array("","십","백","천","","십","백","천","","십","백","천","","십","백","천");
        var result = "";
        for(i=0; i<num.length; i++) {
            str = ""; han = hanA[num.charAt(num.length-(i+1))];
            if(han != "") str += han+danA[i];
            if(i == 4) str += "만";
            if(i == 8) str += "억";
            if(i == 12) str += "조";
            result = str + result;
        }
        if(num != 0)
            result = result + "";
        return result ;
    }

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
}
