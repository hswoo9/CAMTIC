var now = new Date();

var historyViewPop = {

    init : function(){
        historyViewPop.dataSet();
        historyViewPop.mainGrid();
    },

    delBtn: function(){
        const ch = $('#mainGrid tbody .checkCert:checked');
        let checkedList = new Array();
        $.each(ch, function(i,v){
            checkedList.push( $("#mainGrid").data("kendoGrid").dataItem($(v).closest("tr")).USER_PROOF_SN);
        });

        if(checkedList.length == 0){
            alert('삭제 할 항목을 선택해 주세요.');
            return;
        }

        let data = {
            userProofSn : checkedList.join()
        }

        if(!confirm("삭제 하시겠습니까?")){
            return;
        }
        historyViewPop.setCertificateDelete(data);
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
                alert("데이터 저장 중 에러가 발생했습니다.");
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
            height: 489,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount : 5
            },
            toolbar : [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="historyViewPop.historyViewPopPop();">' +
                            '	<span class="k-button-text">신청</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="historyViewPop.delBtn();">' +
                            '	<span class="k-button-text">삭제</span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound : historyViewPop.onDataBound,
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" onclick="historyViewPop.fn_checkAll();" style="position : relative; top : 2px;" />',
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
                    title: "발급 번호",
                    width: 80
                }, {
                    field: "REG_DE",
                    title: "요청일",
                    width: 85
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
                    field: "REG_DEPT_NAME",
                    title: "부서",
                    width: 120
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
                    width: 400
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
                        if(e.STATUS == "100")
                            return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-info" onclick="historyViewPop.certifiPrintPop('+e.USER_PROOF_SN+');">' +
                                    '	<span class="k-button-text">발급</span>' +
                                    '</button>';
                        else
                            return '';
                    }
                }
            ]
        }).data("kendoGrid");
    },

    onDataBound : function(){
        const grid = this;
        grid.tbody.find("tr").dblclick(function (e) {
            const dataItem = grid.dataItem($(this));
            const userProofSn = dataItem.USER_PROOF_SN;
            historyViewPop.historyViewPopPop(userProofSn);
        });
    },

    historyViewPopPop : function(userProofSn, mode) {
        var urlParams = "";
        if(mode != null && mode != "" && mode != undefined){
            urlParams = "&mode=" + mode;
        }
        var url = "/Inside/pop/historyViewPopPop.do";
        if(!isNaN(userProofSn)) {
            url = "/Inside/pop/historyViewPopPop.do?userProofSn="+userProofSn + urlParams;
        }
        var name = "historyViewPopPop";
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