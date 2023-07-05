var now = new Date();

var certificateAdmin = {

    init : function(){
        certificateAdmin.dataSet();

        var data = {
            manageCheck : "admin",
            docuYearDe : $("#docuYearDe").val(),
            proofType : $("#proofType").val(),
            status : $("#status").val()
        }
        certificateAdmin.mainGrid("/inside/getCertificateList", data);
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

        if(result.flag){
            certificateAdmin.gridReload();
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
        $("#docuYearDe").attr("readonly", true);
    },

    mainGrid : function(url, params) {

        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 489,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 30, 50, 100 ],
                buttonCount : 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound : certificateAdmin.onDataBound,
            columns: [
                {
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
                    title: "처리 상태",
                    template : function(row){
                        if(row.STATUS == "10") {
                            return "대기";
                        }else if(row.STATUS == "100") {
                            return "승인";
                        }else if(row.STATUS == "30") {
                            return "반려";
                        }else {
                            return "데이터 오류"
                        }
                    },
                    width: 100
                }, {
                    field: "USAGE_NAME",
                    title: "용도",
                    width: 300
                }, {
                    field: "",
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
                },
            ]
        }).data("kendoGrid");
    },

    onDataBound : function(){
        const grid = this;
        grid.tbody.find("tr").dblclick(function (e) {
            const dataItem = grid.dataItem($(this));
            const userProofSn = dataItem.USER_PROOF_SN;
            certificateReq.certificateReqPop(userProofSn, "mng");
        });
    },

    gridReload : function (){
        var data = {
            manageCheck : "admin",
            docuYearDe : $("#docuYearDe").val(),
            proofType : $("#proofType").val(),
            status : $("#status").val()
        }
        certificateAdmin.mainGrid("/inside/getCertificateList", data);
    }
}
