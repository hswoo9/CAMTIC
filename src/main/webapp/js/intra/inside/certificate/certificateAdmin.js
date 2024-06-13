var now = new Date();

var certificateAdmin = {

    init : function(){
        certificateAdmin.dataSet();
        certificateAdmin.gridReload();
        // var data = {
        //     manageCheck : "admin",
        //     docuYearDe : $("#docuYearDe").val(),
        //     proofType : $("#proofType").val(),
        //     purpose : $("#purpose").val(),
        //     status : $("#status").val(),
        //     searchType : $("#searchType").val(),
        //     searchText : $("#searchText").val()
        // }
        // certificateAdmin.mainGrid("/inside/getCertificateList", data);
    },

    fn_setCertRep : function (p, key){
        var message = "승인하시겠습니까?"
        if(p == 30){
            message = "반려하시겠습니까?"
        }
        if(!confirm(message)){
            return;
        }
        var data = {
            userProofSn : key,
            empSeq : $("#empSeq").val(),
            status : p
        }

        var result = customKendo.fn_customAjax("/inside/setReqCert", data);

        if(result.code == "404"){
            alert("세션이 만료되었습니다. 다시 로그인해주세요.");
            location.href="/logoutAction";

        } else {
            if(result.flag){
                certificateAdmin.gridReload();
            }
        }



    },

    dataSet() {
        $("#docuYearDe").kendoDatePicker({
            start: "decade",
            depth: "decade",
            culture : "ko-KR",
            format : "yyyy",
            value : new Date(),
            change : certificateAdmin.gridReload
        });

        $("#proofType").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "재직증명서", value: "1" },
                { text: "경력증명서", value: "2" }
            ],
            index: 0,
            change : certificateAdmin.gridReload
        });

        $("#status").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "작성중", value: "0" },
                { text: "제출", value: "10" },
                { text: "승인", value: "100" },
                { text: "반려", value: "30" }
            ],
            index: 0,
            change : certificateAdmin.gridReload
        });

        $("#purpose").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "금융기관 제출용", value: "금융기관 제출용" },
                { text: "교육기관 제출용", value: "교육기관 제출용" },
                { text: "기관제출용", value: "기관제출용" },
                { text: "타사 제출용", value: "타사 제출용" },
                { text: "개인증빙용", value: "개인증빙용" },
                { text: "기타사유", value: "기타사유" }
            ],
            index: 0,
            change : certificateAdmin.gridReload
        });

        $("#searchType").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "이름", value: "1" },
                { text: "직위", value: "2" }

            ],
            index: 0
        });

        $("#searchText").kendoTextBox();

        $("#docuYearDe").attr("readonly", true);
    },

    mainGrid : function(url, params) {
        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 508,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount : 5
            },
            toolbar : [
                {
                    name : 'excel',
                    text: '엑셀다운로드'
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="certificateAdmin.gridReload();">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }
            ],
            excel : {
                fileName : "증명서 목록.xlsx",
                filterable : true
            },
            excelExport: exportGrid,
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound : certificateAdmin.onDataBound,
            columns: [
              /*  {
                    field: "ROW_NUM",
                    title: "발급 번호",
                    width: 80
                }, */{
                    field: "DOCU_YEAR_DE",
                    title: "발급번호",
                    width: 100,
                    template: function(row){
                        return "제"+row.DOCU_YEAR_DE+"-"+row.NUMBER+"호";
                    }
                }, {
                    field: "REG_DE",
                    title: "요청일",
                    width: 100
                }, {
                    title: "발급 구분",
                    template : function(row){
                        if(row.PROOF_TYPE == "1") {
                            return "재직증명서";
                        }else if(row.PROOF_TYPE == "2") {
                            return "경력증명서";
                        }else {
                            return "데이터 오류"
                        }
                    },
                    width: 130
                }, {
                    field: "DEPT_FULL_NAME",
                    title: "부서",
                    width: 250
                }, {
                    field: "REGTR_NAME",
                    title: "성명",
                    width: 120
                }, {
                    field: "SUBMISSION_DE",
                    title: "제출예정일",
                    width: 130
                }, {
                    field: "STATUS",
                    title: "처리 상태",
                    template : function(row){
                        if(row.STATUS == "10") {
                            return "대기";
                        }else if(row.STATUS == "100") {
                            return "승인";
                        }else if(row.STATUS == "30") {
                            return "반려";
                        }else if(row.STATUS == "110") {
                            return "발급완료";
                        }else {
                            return "데이터 오류"
                        }
                    },
                    width: 100
                }, {
                    field: "APPROVAL_EMP_NAME",
                    title: "발급자",
                    template : function(row){
                        //return row.APPROVAL_EMP_NAME;
                        if (row.APPROVAL_EMP_NAME == null) {
                            return '-';
                        } else if(row.APPROVAL_EMP_NAME == '') {
                            return '-';
                        }else if(row.APPROVAL_EMP_NAME == 'undefined'){
                            return '-';
                        }else{
                            return row.APPROVAL_EMP_NAME;
                        }
                    },
                    width: 100
                }, {
                    field: "USAGE_NAME",
                    title: "용도",
                    template : function (row) {
                        if (row.USAGE_NAME == "금융기관 제출용"){
                            return "금융기관 제출용";
                        }else if (row.USAGE_NAME == "교육기관 제출용"){
                            return "교육기관 제출용";
                        }else if (row.USAGE_NAME == "기관제출용") {
                            return "기관제출용";
                        }else if (row.USAGE_NAME == "타사 제출용"){
                            return "타사 제출용";
                        }else if (row.USAGE_NAME == "개인증빙용"){
                            return "개인증빙용";
                        }else if (row.USAGE_NAME == "관공서 제출용"){
                            return "관공서 제출용";
                        }else if (row.USAGE_NAME == "기타사유"){
                            return "기타사유";
                        }else if (row.PAST_YN == "Y"){
                            return row.USAGE_NAME;
                        }else{
                            return "데이터 오류";
                        }
                    }
                }, {
                    title: "비고",
                    template : function(e){
                        if(e.STATUS == "10"){
                            return '<span>' +
                                '       <button type="button" class="k-button k-button-md k-button-solid-info" onclick="certificateAdmin.fn_setCertRep(100, \''+e.USER_PROOF_SN+'\')">승인</button>' +
                                '       <button type="button" class="k-button k-button-md k-button-solid-error" onclick="certificateAdmin.fn_setCertRep(30, \''+e.USER_PROOF_SN+'\')">반려</button>' +
                                '   </span>';
                        } else {
                            return "";
                        }
                    },
                    width: 150
                }, {
                    title: "발급",
                    template: function(e){
                        if(e.PAST_YN == "Y"){
                            return '';
                        }else{
                            return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-info" onclick="certificateAdmin.certifiPrintPop('+e.USER_PROOF_SN+');">' +
                                '	<span class="k-button-text">보기</span>' +
                                '</button>';
                        }
                    },
                    width: 120
                }
            ]
        }).data("kendoGrid");
    },

    onDataBound : function(){
        const grid = this;
        grid.tbody.find("tr").dblclick(function (e) {
            const dataItem = grid.dataItem($(this));
            const userProofSn = dataItem.USER_PROOF_SN;
            certificateList.certificateReqPop(userProofSn, "mng");
        });
    },

    gridReload : function (){
        var data = {
            manageCheck : "admin",
            docuYearDe : $("#docuYearDe").val(),
            proofType : $("#proofType").val(),
            purpose : $("#purpose").val(),
            status : $("#status").val(),
            searchType : $("#searchType").val(),
            searchText : $("#searchText").val()
        }
        certificateAdmin.mainGrid("/inside/getCertificateList", data);
    },


    certifiPrintPop : function(userProofSn) {
        var url = "/Inside/pop/certifiPrintPop.do?userProofSn="+userProofSn;
        var name = "certifiPrintPop";
        var option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    }
}
