var purcClaim = {

    global : {
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : ""
    },

    fn_defaultScript : function (){
        purcClaim.global.dropDownDataSource = [
            { text: "내 구매만 조회", value: "empDept" },
        ]
        customKendo.fn_dropDownList("searchDept", purcClaim.global.dropDownDataSource, "text", "value");
        $("#searchDept").data("kendoDropDownList").value("empDept");
        $("#searchDept").data("kendoDropDownList").bind("change", purcClaim.gridReload);

        purcClaim.global.dropDownDataSource = [
            { text: "문서번호", value: "DOC_NO" },
            { text: "목적", value: "PURC_REQ_PURPOSE" },
            { text: "품명", value: "PURC_ITEM_NAME" },
        ]

        customKendo.fn_dropDownList("searchKeyword", purcClaim.global.dropDownDataSource, "text", "value");
        customKendo.fn_textBox(["searchValue"]);

        purcClaim.global.dropDownDataSource = [
            { text: "검수 미작성", value: "1" },
            { text: "검수 작성 및 미승인", value: "2" },
            { text: "검수 작성 및 승인", value: "3" }
        ]

        customKendo.fn_dropDownList("inspectStat", purcClaim.global.dropDownDataSource, "text", "value");
        $("#inspectStat").data("kendoDropDownList").bind("change", purcClaim.gridReload);
        purcClaim.gridReload();
    },

    mainGrid: function(url, params){
        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            sortable: true,
            selectable: "row",
            height : 525,
            pageable: {
                refresh: true,
                pageSizes: [ 10, 20, 30, 50, 100 ],
                buttonCount: 5
            },
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
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="purcClaim.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }],
            columns: [
                {
                    title: "번호",
                    width: 50,
                    template: "#= --record #"
                }, {
                    title: "문서번호",
                    field: "DOC_NO",
                    width: 160,
                }, {
                    field: "CLAIM_DE",
                    title: "청구일",
                    width: 120,
                }, {
                    title: "납품(예정)일",
                    field: "DELV_DE",
                    width: 120
                }, {
                    title: "제목",
                    field: "CLAIM_TITLE",
                    template : function(e){
                        return '<a onclick="purcClaim.fn_reqClaiming(' + e.CLAIM_SN + ', \''+e.PURC_SN+'\')" style="font-weight: bold ">' + e.CLAIM_TITLE + '</a>'
                    }
                }, {
                    title: "발주자",
                    width: 100,
                    field: "CLAIM_EMP_NAME"
                }, {
                    title: "요청자",
                    width: 100,
                    template: function(e){
                        if(e.PURC_EMP_NAME != null && e.PURC_EMP_NAME != ""){
                            return e.PURC_EMP_NAME;
                        } else {
                            return e.CLAIM_EMP_NAME;
                        }
                    }
                }, {
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
                    title: "업체명",
                    width: 160,
                    field: "CRM_NM"
                }, {
                    title: "금액",
                    width: 100,
                    template: function (e){
                        return '<div style="text-align: right">'+comma(e.TOT_AMT)+'</div>'
                    }
                }, {
                    title: "상태",
                    width: 120,
                    template: function (e){
                        if(e.STATUS != null && e.STATUS != ""){
                            if(e.STATUS == 100){
                                return "구매청구완료";
                            }else if(e.STATUS > 0){
                                return "구매청구작성중";
                            }else if(e.STATUS == 0){
                                return "구매요청완료";
                            }
                        }else{
                            return "미작성";
                        }
                    }
                }, {
                    width: 100,
                    template: function (e){
                        if(e.STATUS == 100){
                            return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="purcClaim.fn_reqOrder(' + e.CLAIM_SN + ', \''+e.PURC_SN+'\')">' +
                                '	<span class="k-button-text">발주처리</span>' +
                                '</button>';
                        }else{
                            return ""
                        }
                    }
                }, {
                    title: "검수여부",
                    width: 95,
                    template: function (e){
                        if(e.INSPECT_YN == "Y"){
                            let html = "";
                            if(e.INSPECT_STATUS != "100"){
                                html += '<button type="button" class="k-button k-button-solid-base" onclick="purcClaim.fn_inspectionPopup(' + e.PURC_SN + ', \'mng\')">검수</button>';
                            }else{
                                return '<a onclick="purcClaim.fn_inspectionPopup(' + e.PURC_SN + ', \'mng\')" style="font-weight: bold ">검수처리완료</a>'
                            }
                            return html;
                        }else{
                            return "검수미작성";
                        }
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    gridReload: function (){
        purcClaim.global.searchAjaxData = {
            empSeq : $("#myEmpSeq").val(),
            searchDept : $("#searchDept").val(),
            searchKeyword : $("#searchKeyword").val(),
            searchValue : $("#searchValue").val(),
            inspectStat : $("#inspectStat").data("kendoDropDownList").value()
        }

        purcClaim.mainGrid("/purc/getPurcClaimList", purcClaim.global.searchAjaxData);
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
        var option = "width = 1500, height = 840, top = 100, left = 400, location = no";
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

    fn_inspectionPopup : function (key, mod){
        var url = "/purc/pop/purcInspectionPop.do";
        if(key != null && key != ""){
            url = "/purc/pop/purcInspectionPop.do?purcSn=" + key + "&mode=" + mod;
        }
        var name = "blank";
        var option = "width = 1690, height = 820, top = 100, left = 400, location = no";
        var popup = window.open(url, name, option);
    }
}