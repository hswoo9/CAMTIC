var now = new Date();

var certificateReqPop = {

    init: function(){
        certificateReqPop.dataSet();
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
        //직책
        let regDutyName = $("#regDutyName").val();
        //직급
        let regPositionName = $("#regPositionName").val();
        //제출처
        let submissionName = $("#submissionName").val();
        //제출 예정일
        let submissionDe = $("#submissionDe").val().replace(/-/g, "");
        //출력매수
        let printSn = $("#printSn").val();
        //주민등록번호
        /*let firstRrnName = $("#firstRrnName").val();
        let secondRrnName = $("#secondRrnName").val();*/
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
        /*if(firstRrnName == "") {
            alert("주민등록번호 앞자리가 작성되지 않았습니다.");
            return;
        }
        if(secondRrnName == "") {
            alert("주민등록번호 뒷자리가 작성되지 않았습니다.");
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
            regPositionName : regPositionName,
            submissionName : submissionName,
            submissionDe : submissionDe,
            printSn : printSn,
            /*firstRrnName : firstRrnName,
            secondRrnName : secondRrnName,*/
            usageName : usageName,
            remarkName : remarkName,
            empSeq : empSeq,
            deptSeq : $("#deptSeq").val(),
            userProofSn : userProofSn
        }

        if($("#userProofSn").val() == "") {
            if(!confirm("증명서를 신청하시겠습니까?")){
                return;
            }
            certificateReqPop.setCertificateInsert(data);
        }else {
            if(!confirm("증명서 신청을 수정하시겠습니까?")){
                return;
            }
            certificateReqPop.setCertificateUpdate(data);
        }
    },

    uptBtn: function(){
        $("#submissionName").data("kendoTextBox").enable(true);
       /* $("#firstRrnName").data("kendoTextBox").enable(true);
        $("#secondRrnName").data("kendoTextBox").enable(true);*/
        $("#remarkName").data("kendoTextBox").enable(true);
        $("#regDe").data("kendoDatePicker").enable(true);
        $("#submissionDe").data("kendoDatePicker").enable(true);
        $("#proofType").data("kendoDropDownList").enable(true);
        $("#printSn").data("kendoDropDownList").enable(true);
        $("#usageName").data("kendoDropDownList").enable(true);

        $(".btn-A").hide();
        $(".btn-B").show();
    },

    setCertificateInsert: function(data){
        $.ajax({
            url : "/inside/setCertificateInsert",
            data : data,
            type : "post",
            dataType : "json",
            async : false,
            success : function(result){
                console.log(result);
                alert("증명서 신청 저장이 완료되었습니다.");
                opener.gridReload();
                window.close();

            },
            error : function() {
                alert("데이터 저장 중 에러가 발생했습니다.");
                window.close();
            }
        });
    },

    setCertificateUpdate: function(data){
        $.ajax({
            url : "/inside/setCertificateUpdate",
            data : data,
            type : "post",
            dataType : "json",
            async : false,
            success : function(result){
                console.log(result);
                alert("증명서 신청 수정이 완료되었습니다.");
                opener.gridReload();
                window.close();

            },
            error : function() {
                alert("데이터 저장 중 에러가 발생했습니다.");
                window.close();
            }
        });
    },

    fn_certReq: function(){
        var data = {
            userProofSn : $("#userProofSn").val(),
            empSeq : $("#empSeq").val(),
            status : 10
        }

        var result = customKendo.fn_customAjax("/inside/setReqCert", data);

        if(result.flag){
            alert("승인 요청이 완료되었습니다.");
            opener.gridReload();
            window.close();
        }

    },

    dataSet: function(){
        $("#regErpSn, #regtrName, #regDeptName, #regDutyName, #regPositionName").kendoTextBox({
            enable: false
        });

        customKendo.fn_textBox(["submissionName", "firstRrnName", "secondRrnName", "remarkName"]);

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
