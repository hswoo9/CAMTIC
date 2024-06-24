var certificateReqAdminPop = {

    init: function(){
        const reqUserInfo = getUser($("#empSeq").val());
        $("#empName, #regtrName").val(reqUserInfo.EMP_NAME_KR);
        $("#deptName, #regDeptName").val(reqUserInfo.DEPT_NAME);
        $("#dutyName, #regDutyName").val(fn_getSpot(reqUserInfo.DUTY_NAME, reqUserInfo.POSITION_NAME));
        $("#regErpSn").val(reqUserInfo.ERP_EMP_SEQ);
        certificateReqAdminPop.dataSet();
    },

    saveBtn: function(){
        //로그인 사원seq
        let empSeq = $("#empSeq").val();
        //발급구분
        let proofType = $("#proofType").val();
        //신청일자
        let regDe = $("#regDe").val().replace(/-/g, "");
        //사번
        let regErpSn = $("#regErpSn").val();
        //성명
        let regtrName = $("#regtrName").val();
        //부서명
        let regDeptName = $("#regDeptName").val();
        //직급
        let regDutyName = $("#regDutyName").val();
        //제출처
        let submissionName = $("#submissionName").val();
        //제출 예정일
        let submissionDe = $("#submissionDe").val().replace(/-/g, "");
        //출력매수
        let printSn = $("#printSn").val();
        //용도
        let usageName = $("#usageName").val();
        //비고
        let remarkName = $("#remarkName").val();

        let userProofSn = $("#userProofSn").val();


        if(proofType == "") {
            alert("발급구분이 선택되지 않았습니다.");
            return;
        }
        /*if(submissionName == "") {
            alert("제출처가 작성되지 않았습니다.");
            return;
        }*/
        if(usageName == "") {
            alert("용도가 선택되지 않았습니다.");
            return;
        }

        let data = {
            proofType : proofType,
            regDe : regDe,
            regErpSn : regErpSn,
            regtrName : regtrName,
            regDeptName : regDeptName,
            regDutyName : regDutyName,
            submissionName : submissionName,
            submissionDe : submissionDe,
            printSn : printSn,
            usageName : usageName,
            remarkName : remarkName,
            empSeq : empSeq,
            userProofSn : userProofSn,
            regEmpSeq : $("#regEmpSeq").val()
        }

        var result = customKendo.fn_customAjax("/inside/setCertificateAdminInsert", data);
        if(result.flag){
            if(result.params.userProofSn != null){
                alert("신청내역이 저장되었습니다.\n증명서 인쇄페이지로 이동합니다.");

                var url = "/Inside/pop/certifiPrintPop.do?userProofSn="+result.params.userProofSn+"&isAdmin=Y";
                var name = "certifiPrintPop";
                var option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
                var popup = window.open(url, name, option);

                window.close();
            }
        }
    },

    dataSet: function(){
        $("#regErpSn, #regtrName, #regDeptName, #regDutyName").kendoTextBox({
            enable: false
        });

        customKendo.fn_textBox(["submissionName", "remarkName"]);

        $("#regDe, #submissionDe").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date()
        });

        $("#proofType").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "선택하세요", value: "" },
                { text: "재직증명서", value: "1" },
                { text: "경력증명서", value: "2" }
            ],
            index: 0
        });

        $("#printSn").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "1", value: "1" },
                { text: "2", value: "2" }
            ],
            index: 0
        });

        $("#usageName").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "선택하세요", value: "" },
                { text: "금융기관 제출용", value: "금융기관 제출용" },
                { text: "교육기관 제출용", value: "교육기관 제출용" },
                { text: "기관제출용", value: "기관제출용" },
                { text: "타사 제출용", value: "타사 제출용" },
                { text: "개인증빙용", value: "개인증빙용" },
                { text: "기타사유", value: "기타사유" }
            ],
            index: 0
        });
        $("#regDe, #submissionDe").attr("readonly", true);
    }
}
