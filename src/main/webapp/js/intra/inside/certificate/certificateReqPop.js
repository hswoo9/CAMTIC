var now = new Date();

var certificateReqPop = {

    init : function(){
        certificateReqPop.dataSet();
        certificateReqPop.mainGrid();
    },

    saveBtn() {
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
        //주민등록번호
        let firstRrnName = $("#firstRrnName").val();
        let secondRrnName = $("#secondRrnName").val();
        //용도
        let usageName = $("#usageName").val();
        //비고
        let remarkName = $("#remarkName").val();

        let userProofSn = $("#userProofSn").val();


        if(proofType == "") {
            alert("발급구분이 선택되지 않았습니다.");
            return;
        }
        if(submissionName == "") {
            alert("제출처가 작성되지 않았습니다.");
            return;
        }
        if(firstRrnName == "") {
            alert("주민등록번호 앞자리가 작성되지 않았습니다.");
            return;
        }
        if(secondRrnName == "") {
            alert("주민등록번호 뒷자리가 작성되지 않았습니다.");
            return;
        }
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
            firstRrnName : firstRrnName,
            secondRrnName : secondRrnName,
            usageName : usageName,
            remarkName : remarkName,
            empSeq : empSeq,
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

    setCertificateInsert(data) {
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

    setCertificateUpdate(data) {
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

    dataSet() {
        $("#regErpSn, #regtrName, #regDeptName, #regDutyName").kendoTextBox({
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
                { text: "2", value: "2" },
                { text: "3", value: "3" },
                { text: "4", value: "4" },
                { text: "5", value: "5" },
                { text: "6", value: "6" },
                { text: "7", value: "7" },
                { text: "8", value: "8" },
                { text: "9", value: "9" }
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
                { text: "관공서 제출용", value: "관공서 제출용" },
                { text: "타사 제출용", value: "타사 제출용" },
                { text: "개인증빙용", value: "개인증빙용" },
                { text: "기타사유", value: "기타사유" }
            ],
            index: 0
        });
    },

    mainGrid : function() {
        var dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data, operation) {
                    return data;
                }
            },
            schema : {
                data: function (data) {
                    return data;
                },
                total: function (data) {
                    return data.length;
                },
            },
            pageSize: 10,
        });

        $("#mainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 489,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 30, 50, 100 ],
                buttonCount : 5
            },
            toolbar : [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="certificateReqPop.certificateReqPopPop();">' +
                            '	<span class="k-button-text">신청</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="">' +
                            '	<span class="k-button-text">취소</span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" class="k-checkbox checkbox"/>',
                    template : "<input type='checkbox' id='' name='' value='' class='k-checkbox checkbox'/>",
                    width: 50
                }, {
                    field: "",
                    title: "발급 번호"
                }, {
                    field: "",
                    title: "요청일"
                }, {
                    field: "",
                    title: "발급 구분"
                }, {
                    field: "",
                    title: "부서"
                }, {
                    field: "",
                    title: "성명"
                }, {
                    field: "",
                    title: "제출예정일"
                }, {
                    field: "",
                    title: "용도"
                }, {
                    field: "",
                    title: "처리 상태"
                }, {
                    field: "",
                    title: "처리일"
                }, {
                    field: "",
                    title: "처리자"
                }
            ]
        }).data("kendoGrid");
    },

    certificateReqPopPop : function() {
        var url = "/inside/certificateReqPopPop.do";
        var name = "certificateReqPopPop";
        var option = "width=800, height=750, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    }
}
