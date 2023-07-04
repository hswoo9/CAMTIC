var now = new Date();

var certificateReq = {

    init : function(){
        certificateReq.dataSet();
        certificateReq.mainGrid();
    },

    dataSet() {
        $("#docuYearDe").kendoDatePicker({
            start: "decade",
            depth: "decade",
            culture : "ko-KR",
            format : "yyyy",
            value : new Date()
        });

        $("#proofType").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "재직증명서", value: "1" },
                { text: "경력증명서", value: "2" }
            ],
            index: 0
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
            index: 0
        });
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
                pageSizes : [ 10, 20, 30, 50, 100 ],
                buttonCount : 5
            },
            toolbar : [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="certificateReq.certificateReqPop();">' +
                            '	<span class="k-button-text">신청</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="">' +
                            '	<span class="k-button-text">취소</span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound : certificateReq.onDataBound,
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" class="k-checkbox checkbox"/>',
                    template : "<input type='checkbox' id='' name='' value='' class='k-checkbox checkbox'/>",
                    width: 50
                }, {
                    field: "ROW_NUM",
                    title: "발급 번호"
                }, {
                    field: "REG_DE",
                    title: "요청일"
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
                    }
                }, {
                    field: "REG_DEPT_NAME",
                    title: "부서"
                }, {
                    field: "REGTR_NAME",
                    title: "성명"
                }, {
                    field: "SUBMISSION_DE",
                    title: "제출예정일"
                }, {
                    field: "USAGE_NAME",
                    title: "용도"
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
                        }else {
                            return "데이터 오류"
                        }
                    }
                }, {
                    title: "처리일",
                    template : function(row){
                        if(row.APPROVAL_RESULT_DATE == undefined) {
                            return "-";
                        }else {
                            return row.APPROVAL_RESULT_DATE
                        }
                    }
                }, {
                    title: "처리자",
                    template : function(row){
                        if(row.APPROVAL_RESULT_DATE == undefined) {
                            return "-";
                        }else {
                            return row.APPROVAL_EMP_NAME
                        }
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
            certificateReq.certificateReqPop(userProofSn);
        });
    },

    certificateReqPop : function(userProofSn) {
        var url = "/Inside/certificateReqPop.do";
        if(!isNaN(userProofSn)) {
            url = "/Inside/certificateReqPop.do?userProofSn="+userProofSn;
        }
        var name = "certificateReqPop";
        var option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    }
}

function gridReload() {
    $("#mainGrid").data("kendoGrid").dataSource.read();
}
