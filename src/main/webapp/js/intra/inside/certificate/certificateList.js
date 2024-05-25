var now = new Date();

var certificateList = {

    global : {
        selectEmpData : [],
    },

    init : function(){
        certificateList.dataSet();
        certificateList.mainGrid();
    },

    delBtn: function(userProofSn){
        const ch = $('#mainGrid tbody .checkCert:checked');
        let checkedList = new Array();
        $.each(ch, function(i,v){
            checkedList.push( $("#mainGrid").data("kendoGrid").dataItem($(v).closest("tr")).USER_PROOF_SN);
        });

        /*if(checkedList.length == 0){
            alert('삭제 할 항목을 선택해 주세요.');
            return;
        }*/

        /*let data = {
            userProofSn : checkedList.join()
        }*/
        let data = {
            userProofSn : userProofSn
        }

        if(!confirm("삭제 하시겠습니까?")){
            return;
        }
        certificateList.setCertificateDelete(data);
    },

    setCertificateDelete: function(data){
        $.ajax({
            url : "/inside/setCertificateDelete",
            data : data,
            type : "post",
            dataType : "json",
            async : false,
            success : function(result){
                console.log(result);
                alert("데이터 삭제가 완료되었습니다.");
                gridReload();
                window.close();

            },
            error : function() {
                alert("데이터 삭제 중 에러가 발생했습니다.");
                window.close();
            }
        });
    },

    fn_checkAll: function(){
        if($("#checkAll").is(":checked")) {
            $("input[name='checkCert']").prop("checked", true);
        }else{
            $("input[name='checkCert']").prop("checked", false);
        }
    },

    dataSet() {
        $("#docuYearDe").kendoDatePicker({
            start: "decade",
            depth: "decade",
            culture : "ko-KR",
            format : "yyyy",
            value : new Date(),
            change : gridReload
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
            change : gridReload
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
            change : gridReload
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
            change : gridReload
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

    mainGrid : function() {
        var dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/inside/getCertificateList',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data, operation) {
                    data.empSeq = $("#empSeq").val();
                    data.docuYearDe = $("#docuYearDe").val();
                    data.proofType = $("#proofType").val();
                    data.status = $("#status").val();
                    data.purpose = $("#purpose").val();
                    data.searchType = $("#searchType").val();
                    data.searchText = $("#searchText").val();
                    return data;
                }
            },
            schema : {
                data: function (data) {
                    return data.list;
                },
                total: function (data) {
                    return data.list.length;
                },
            },
            pageSize: 10,
        });

        $("#mainGrid").kendoGrid({
            dataSource: dataSource,
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
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="gridReload();">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="certificateList.certificateReqPop();">' +
                            '	<span class="k-button-text">신청</span>' +
                            '</button>';
                    }
                }/*, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="certificateList.delBtn();">' +
                            '	<span class="k-button-text">삭제</span>' +
                            '</button>';
                    }
                }*/
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound : certificateList.onDataBound,
            columns: [
                {
                    /*headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" onclick="certificateList.fn_checkAll();" style="position : relative; top : 2px;" />',
                    template : function (e){
                        if(e.STATUS == "100" || e.STATUS == "10" || e.STATUS == "110"){
                            return "";
                        } else {
                            return "<input type='checkbox' id='certPk"+ e.USER_PROOF_SN +"' name='checkCert' value='"+e.USER_PROOF_SN+"' class='checkCert' style='position : relative; top : 2px;' />";
                        }
                    },
                    width: 50,
                }, {
                    field: "ROW_NUM",
                    title: "순번",
                    width: 50
                }, {*/
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
                    title: "처리 상태",
                    template : function(row){
                        if(row.STATUS == "0") {
                            return "작성중";
                        }else if(row.STATUS == "10") {
                            return "제출";
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
                    title: "발급",
                    template: function(e){
                        if(e.PAST_YN == "Y"){
                            return '';
                        }else if(e.STATUS == "100"){
                            return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-info" onclick="certificateList.certifiPrintPop('+e.USER_PROOF_SN+');">' +
                                '	<span class="k-button-text">발급</span>' +
                                '</button>';
                        }else if(e.STATUS == "10"){
                            return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="certificateList.delBtn('+e.USER_PROOF_SN+');">' +
                                '	<span class="k-button-text">삭제</span>' +
                                '</button>';
                        }else{
                            return '';
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
            certificateList.certificateReqPop(userProofSn);
        });
    },

    certificateReqPop : function(userProofSn, mode) {
        var urlParams = "";
        if(mode != null && mode != "" && mode != undefined){
            urlParams = "&mode=" + mode;
        }
        var url = "/Inside/pop/certificateReqPop.do";
        if(!isNaN(userProofSn)) {
            url = "/Inside/pop/certificateReqPop.do?userProofSn="+userProofSn + urlParams;
        }
        var name = "certificateReqPop";
        var option = "width=965, height=380, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    },

    certifiPrintPop : function(userProofSn) {
        if(!confirm("증명서 발급은 1회만 가능합니다. 진행하시겠습니까?")){
            return;
        }

        var url = "/Inside/pop/certifiPrintPop.do?userProofSn="+userProofSn;
        var name = "certifiPrintPop";
        var option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    }
}