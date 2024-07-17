var purcClaim = {

    global : {
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : ""
    },

    fn_defaultScript : function (){
        purcClaim.global.dropDownDataSource = [];
        customKendo.fn_dropDownList("searchDept", purcClaim.global.dropDownDataSource, "text", "value");
        // $("#searchDept").data("kendoDropDownList").bind("change", purcClaim.gridReload);

        purcClaim.global.dropDownDataSource = [
            { text: "문서번호", value: "DOC_NO" },
            { text: "제목", value: "CLAIM_TITLE" },
            { text: "목적", value: "PURC_REQ_PURPOSE" },
            { text: "업체명", value: "CRM_NM" },
            { text: "품명", value: "PURC_ITEM_NAME" },
            { text: "요청자", value: "PURC_EMP_NAME" },
            { text: "프로젝트", value: "PJT_NM" },
        ]

        customKendo.fn_dropDownList("searchKeyword", purcClaim.global.dropDownDataSource, "text", "value");
        customKendo.fn_textBox(["searchValue"]);

        purcClaim.global.dropDownDataSource = [
            { text: "검수 미작성", value: "1" },
            { text: "검수 작성 및 미승인", value: "2" },
            { text: "검수 작성 및 승인", value: "3" },
            { text: "발주대기", value: "4" }
        ]

        customKendo.fn_dropDownList("inspectStat", purcClaim.global.dropDownDataSource, "text", "value");

        $("#busnClass").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "전체", value: ""},
                {text: "법인운영", value: "C"},
                {text: "R&D", value: "R"},
                {text: "비R&D", value: "S"},
                {text: "엔지니어링", value: "D"},
                {text: "기타/용역", value: "V"},
            ],
        });

        $("#busnClass").data("kendoDropDownList").bind("change", purcClaim.gridReload);
        $("#inspectStat").data("kendoDropDownList").bind("change", purcClaim.gridReload);

        purcClaim.mainGrid("/purc/getPurcClaimList");
    },

    mainGrid: function(url){
        const dataSource = new kendo.data.DataSource({
            serverPaging: false,
            pageSize: 10,
            transport: {
                read : {
                    url : url,
                    dataType : "json",
                    type : "post",
                    async : false
                },
                parameterMap: function(data) {
                    data.empSeq = $("#myEmpSeq").val();
                    data.searchDept =  $("#searchDept").val();
                    data.searchKeyword =  $("#searchKeyword").val();
                    data.searchValue =  $("#searchValue").val();
                    data.inspectStat =  $("#inspectStat").data("kendoDropDownList").value();
                    data.busnClass =  $("#busnClass").val();
                    return data;
                }
            },
            schema : {
                data: function (data) {
                    return data.list;
                },
                total: function (data) {
                    return data.list.length;
                }
            }
        });

        $("#mainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            selectable: "row",
            pageable: {
                refresh: true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount: 5
            },
            resizable : true,
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            toolbar: [
                {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="purcClaim.fn_reqClaiming()">' +
                            '	<span class="k-button-text">구매청구서 작성</span>' +
                            '</button>';
                    }
                }, {
                    name : 'excel',
                    text: '엑셀다운로드'
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="purcClaim.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }
            ],
            excel : {
                fileName : "구매청구 목록.xlsx",
                filterable : true
            },
            columns: [
                {
                    title: "번호",
                    width: 50,
                    template: "#= --record #"
                }, {
                    field: "PURC_DOC_NO",
                    title: "구매요청문서번호",
                    width: 120,
                    template: function(e){
                        if(e.PURC_DOC_NO == null || e.PURC_DOC_NO == ""){
                            return "-";
                        } else {
                            return e.PURC_DOC_NO;
                        }
                    }
                }, {
                    field: "CLAIM_DOC_NO",
                    title: "구매청구문서번호",
                    width: 120,
                }, {
                    field: "CLAIM_DE",
                    title: "청구일",
                    width: 90,
                }, {
                    field: "GOODS_DT",
                    title: "납품(예정)일",
                    width: 90
                }, {
                    field: "CLAIM_TITLE",
                    title: "제목",
                    template : function(e){
                        return '<div style="text-align: left; font-weight: bold; cursor: pointer" onclick="purcClaim.fn_reqClaiming(' + e.CLAIM_SN + ', \''+e.PURC_SN+'\')">' + e.CLAIM_TITLE + '</div>';
                    },
                    width: 200,
                }, {
                    field: "CLAIM_EMP_NAME",
                    title: "청구",
                    width: 80
                }, {
                    field: "PURC_EMP_NAME",
                    title: "요청자",
                    width: 80,
                    template: function(e){
                        if(e.PURC_EMP_NAME != null && e.PURC_EMP_NAME != ""){
                            return e.PURC_EMP_NAME;
                        } else {
                            return e.CLAIM_EMP_NAME;
                        }
                    }
                }, {
                    field: "PURC_DEPT_NAME",
                    title: "요청팀명",
                    width: 100,
                    template: function(e){
                        if(e.PURC_DEPT_NAME != null && e.PURC_DEPT_NAME != ""){
                            return e.PURC_DEPT_NAME;
                        }else{
                            return e.CLAIM_DEPT_NAME;
                        }
                    }
                }, {
                    field: "CRM_NM",
                    title: "업체명",
                    width: 160,
                    footerTemplate: function(e){
                        return '<div style="float: right;">합계</div>';
                    }
                }, {
                    field: "TOT_AMT",
                    title: "금액",
                    width: 100,
                    template: function(e){
                        return '<div style="text-align: right">'+comma(e.TOT_AMT)+'</div>'
                    },
                    footerTemplate: function() {
                        return '<div style="text-align: right">'+getGridSum("mainGrid", "TOT_AMT")+'</div>'
                    }
                }, {
                    field: "STATUS",
                    title: "상태",
                    width: 100,
                    template: function (e){
                        if(e.STATUS != null && e.STATUS != ""){
                            if(e.STATUS == 100 || e.STATUS == 101){
                                return "구매청구완료";
                            }else if(e.STATUS > 0 || (e.PURC_SN == null && e.STATUS == 0) || e.CLAIM_SN != null){
                                return "구매청구작성중";
                            }else if(e.PURC_SN != null && e.STATUS == 0){
                                return "구매요청완료";
                            }
                        }else{
                            return "미작성";
                        }
                    }
                }, {
                    field: "PAYMENT_METHOD",
                    title: "발주상태",
                    width: 100,
                    template: function (e){
                        if(e.STATUS == 100 || e.STATUS == 101){
                            if(e.PAYMENT_METHOD == "I" || e.PAYMENT_METHOD == "C"){
                                return "발주생략";
                            } else {
                                if(((e.GOODS_DT == null || e.GOODS_DT == "") && e.ORDER_YN == "N") || e.ORDER_YN == null) {
                                    return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="purcClaim.fn_reqOrder(' + e.CLAIM_SN + ', \''+e.PURC_SN+'\')">' +
                                        '	<span class="k-button-text">발주대기</span>' +
                                        '</button>';
                                } else if(e.ORDER_YN == "N") {
                                    return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="purcClaim.fn_reqOrder(' + e.CLAIM_SN + ', \''+e.PURC_SN+'\')">' +
                                        '	<span class="k-button-text">발주저장</span>' +
                                        '</button>';
                                } else if(e.ORDER_YN == "Y") {
                                    return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="purcClaim.fn_reqOrder(' + e.CLAIM_SN + ', \''+e.PURC_SN+'\')">' +
                                        '	<span class="k-button-text">발주완료</span>' +
                                        '</button>';
                                }
                            }
                        } else{
                            return ""
                        }
                    }
                }, {
                    field: "INSPECT_YN",
                    title: "검수여부",
                    width: 95,
                    template: function (e){
                        if(e.PURC_SN == undefined || e.PURC_SN == null || e.PURC_SN == "undefiend") {
                            if(e.INSPECT_YN == "Y"){
                                return '<a onclick="purcClaim.fn_inspectionPopup(\'\', \'mng\', '+e.CLAIM_SN+')" style="font-weight: bold ">검수처리완료</a>'
                            }
                        }
                        if((e.PAYMENT_METHOD == "I" || e.PAYMENT_METHOD == "C")){
                            if(e.INSPECT_YN == "Y"){
                                let html = "";
                                if(e.INSPECT_STATUS != "100"){
                                    if(e.PURC_SN == undefined || e.PURC_SN == null || e.PURC_SN == "undefiend"){
                                        html += '<button type="button" class="k-button k-button-solid-base" onclick="purcClaim.fn_inspectionPopup(\'\', \'mng\', ' + e.CLAIM_SN + ')">검수</button>';
                                    } else {
                                        html += '<button type="button" class="k-button k-button-solid-base" onclick="purcClaim.fn_inspectionPopup(' + e.PURC_SN + ', \'mng\')">검수</button>';
                                    }
                                }else{
                                    return '<a onclick="purcClaim.fn_inspectionPopup(' + e.PURC_SN + ', \'mng\')" style="font-weight: bold ">검수처리완료</a>'
                                }
                                return html;
                            } else {
                                if(e.INSPECT_STATUS != "100"){
                                    if(e.PURC_SN == undefined || e.PURC_SN == null || e.PURC_SN == "undefiend"){
                                        return '<button type="button" class="k-button k-button-solid-base" onclick="purcClaim.fn_inspectionPopup(\'\', \'mng\', ' + e.CLAIM_SN + ')">검수</button>';
                                    } else {
                                        return '<button type="button" class="k-button k-button-solid-base" onclick="purcClaim.fn_inspectionPopup(' + e.PURC_SN + ', \'mng\')">검수</button>';
                                    }
                                }else{
                                    return '<a onclick="purcClaim.fn_inspectionPopup(' + e.PURC_SN + ', \'mng\')" style="font-weight: bold ">검수처리완료</a>'
                                }
                            }
                        }else{
                            if((((e.GOODS_DT == null || e.GOODS_DT == "") && e.ORDER_YN == "N") || e.ORDER_YN == null) || e.ORDER_YN == "N"){
                                return "발주대기";
                            } else {
                                if(e.INSPECT_STATUS != "100"){
                                    if(e.PURC_SN == undefined || e.PURC_SN == null || e.PURC_SN == "undefiend"){
                                        return '<button type="button" class="k-button k-button-solid-base" onclick="purcClaim.fn_inspectionPopup(\'\', \'mng\', ' + e.CLAIM_SN + ')">검수</button>';
                                    } else {
                                        return '<button type="button" class="k-button k-button-solid-base" onclick="purcClaim.fn_inspectionPopup(' + e.PURC_SN + ', \'mng\')">검수</button>';
                                    }
                                }else{
                                    return '<a onclick="purcClaim.fn_inspectionPopup(' + e.PURC_SN + ', \'mng\')" style="font-weight: bold ">검수처리완료</a>'
                                }
                            }
                        }
                    }
                }, {
                    width: 60,
                    template: function (e){
                        if(e.PURC_SN == null && (e.STATUS == 0 || e.STATUS == 30 || e.STATUS == 40) && e.CLAIM_EMP_SEQ == $("#regEmpSeq").val()){
                            return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="purcClaim.fn_delete(' + e.CLAIM_SN + ')">' +
                                '	<span class="k-button-text">삭제</span>' +
                                '</button>';
                        }else{
                            return ""
                        }
                    }
                },
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    gridReload: function (){
        $("#mainGrid").data("kendoGrid").dataSource.read();
    },

    fn_reqClaiming : function(key, subKey){
        var url = "/purc/pop/reqClaiming.do";

        if(key != null && key != ""){
            url = "/purc/pop/reqClaiming.do?claimSn=" + key;

            if(subKey != null && subKey != "" && subKey != "undefined"){
                url += "&purcSn=" + subKey;
            }
        }

        var name = "blank";
        var option = "width = 1540, height = 840, top = 100, left = 400, location = no";
        var popup = window.open(url, name, option);
    },

    fn_reqOrder : function(key, subKey){
        var url = "/purc/pop/reqOrder.do";
        if(key != null && key != ""){
            url = "/purc/pop/reqOrder.do?claimSn=" + key;
            if(subKey != null && subKey != "" && subKey != "undefined"){
                url += "&purcSn=" + subKey;
            }
        }
        var name = "blank";
        var option = "width = 1500, height = 840, top = 100, left = 400, location = no";
        var popup = window.open(url, name, option);
    },

    fn_inspectionPopup : function (key, mod, claimKey){
        var url = "/purc/pop/purcInspectionPop.do";
        if(key != null && key != ""){
            url = "/purc/pop/purcInspectionPop.do?purcSn=" + key + "&mode=" + mod;
        } else {
            url = "/purc/pop/purcInspectionPop.do?claimSn=" + claimKey + "&mode=" + mod;
        }
        var name = "blank";
        var option = "width = 1690, height = 820, top = 100, left = 400, location = no";
        var popup = window.open(url, name, option);
    },

    fn_delete : function(key){
        if(!confirm("정말 삭제하시겠습니까?\n삭제 후 복구가 불가능합니다.")){return;}

        const result = customKendo.fn_customAjax("/purc/delPurcClaimData.do", {claimSn: key, empSeq: $("#regEmpSeq").val()});
        if(result.flag){
            alert("삭제되었습니다.");
            purcClaim.gridReload();
        }
    }
}

function gridReload(){
    purcClaim.gridReload();
}