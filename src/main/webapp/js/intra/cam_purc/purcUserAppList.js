var purcUserAppList = {

    global : {
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : "",
        clmArr : [],
    },

    fn_defaultScript : function(){
        purcUserAppList.global.dropDownDataSource = [
            { text: "내 구매만 조회", value: "empDept" },
        ]
        customKendo.fn_dropDownList("searchDept", purcUserAppList.global.dropDownDataSource, "text", "value");
        $("#searchDept").data("kendoDropDownList").value("empDept");
        $("#searchDept").data("kendoDropDownList").bind("change", purcUserAppList.gridReload);

        $("#searchDept").data("kendoDropDownList").enable(false);

        var rs = customKendo.fn_customAjax("/system/getAuthorityGroupUserList.do", {authorityGroupId: 25});

        for(var i = 0 ; i < rs.rs.length ; i++){
            if(rs.rs[i].EMP_SEQ == $("#regEmpSeq").val()){
                $("#searchDept").data("kendoDropDownList").enable(true);
                break;
            }
        }

        purcUserAppList.gridReload();
    },

    mainGrid : function(url, params){
        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            sortable: true,
            selectable: "row",
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="purcUserAppList.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }],
            columns: [
                // {
                //     headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" onclick="fn_checkAll(\'checkAll\', \'clm\');"/>',
                //     width: 40,
                //     template : function (e){
                //         console.log(e)
                //         return "<input type='checkbox' id='clm"+e.CLAIM_SN+"' name='clm' class='clm' value='"+e.CLAIM_SN+"'/>";
                //     }
                // },
                {
                    title: "번호",
                    width: 40,
                    template: "#= --record #"
                }, {
                    title: "요청부서",
                    field: "DEPT_NAME",
                    width: 120,
                }, {
                    title: "구매구분",
                    width: 80,
                    template: function(e){
                        var result = "";

                        if(e.PURC_TYPE == 'D'){
                            result = "엔지니어링";
                        } else if(e.PURC_TYPE == 'R'){
                            result = "R&D";
                        } else if(e.PURC_TYPE == 'S'){
                            result = "비R&D";
                        } else if(e.PURC_TYPE == 'V'){
                            result = "기타/용역";
                        } else {
                            result = "법인운영";
                        }

                        return result
                    }
                }, {
                    title: "제목",
                    field: "CLAIM_TITLE",
                    width: 100
                }, {
                    title: "목적",
                    field: "PURC_PURPOSE",
                    width: 200,
                    template : function(e){
                        return '<div style="text-align: left"><a onclick="purcUserAppList.fn_reqClaiming(' + e.CLAIM_SN + ', '+e.PURC_SN+')">' + e.PURC_REQ_PURPOSE + '</a></div>'
                    }
                }, {
                    field: "CRM_NM",
                    title: "업체명",
                    width: 100
                }, {
                    field: "DOC_NO",
                    title: "문서번호",
                    width: 100
                }
                // , {
                //     field: "ORDER_DT",
                //     title: "발주일",
                //     width: 100
                // }, {
                //     field: "EXNP_DE",
                //     title: "지출예정일",
                //     width: 100
                // }
                // , {
                //     title: "금액",
                //     width: 100,
                //     template: function(e){
                //         return '<div style="text-align: right">'+comma(e.TOT_AMT)+'</div>';
                //     }
                // }
                , {
                    title: "지출금액",
                    width: 80,
                    template: function(e){
                        console.log(e)
                        return '<div style="text-align: right">'+comma(e.REQ_AMT == 0 ? e.TOT_AMT : e.REQ_AMT)+'</div>';
                    }
                },
                // , {
                //     title: "지출액",
                //     width: 100,
                //     template: function(e){
                //         return '<div style="text-align: right">'+comma(e.EXNP_AMT)+'</div>';
                //     }
                // }, {
                //     title: "미지급액",
                //     width: 100,
                //     template: function(e){
                //         return '<div style="text-align: right">'+comma(Number(e.TOT_AMT) - Number(e.EXNP_AMT))+'</div>';
                //     }
                // },
                // , {
                //     title: "상태",
                //     width: 100,
                //     template : function(e){
                //         return "";
                //     }
                // },
                // {
                //     title: "첨부",
                //     width: 50,
                //     template : function(e) {
                //         return '<button type="button" class="k-button k-button-solid-base" onClick="purcUserAppList.fn_regPayAttPop('+e.PURC_SN+', '+e.CLAIM_SN+')">첨부</button>';
                //     }
                // },
                {
                    title : "지급신청",
                    width : 80,
                    template: function(e){

                        // approveDocView('3770', 'payApp370', 'payApp');
                        if(e.F_PAY_APP_SN == null){
                            return '<button type="button" class="k-button k-button-solid-base" onClick="purcUserAppList.fn_reqPayAppPopup('+e.PURC_SN+', '+e.CLAIM_SN+', '+e.CLAIM_EXNP_SN+', '+e.F_PAY_APP_SN+')">지급신청</button>';
                        } else {
                            return '<button type="button" class="k-button k-button-solid-info" onClick="purcUserAppList.fn_reqPayAppPopup(' + e.PURC_SN + ', ' + e.CLAIM_SN + ', ' + e.CLAIM_EXNP_SN + ', ' + e.F_PAY_APP_SN + ')">지급신청</button>';
                        }
                    }
                }, {
                    title: "지출상태",
                    width: 60,
                    template: function(e){

                        if(e.REQ_AMT == e.EXNP_AMT){
                            return "승인"
                        } else {
                            return "미승인"
                        }
                    }
                },
            ],
            dataBinding: function () {
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    gridReload : function(){
        purcUserAppList.global.searchAjaxData = {
            empSeq : $("#myEmpSeq").val(),
            searchDept : $("#searchDept").val()
        }

        purcUserAppList.mainGrid("/purc/getUserPurcAppList", purcUserAppList.global.searchAjaxData);
    },

    fn_reqRegPopup : function(key, stat){
        var url = "/purc/pop/regPurcReqPop.do";
        if(key != null && key != ""){
            url = "/purc/pop/regPurcReqPop.do?purcSn=" + key + "&stat=" + stat;
        }
        var name = "blank";
        var option = "width = 1820, height = 820, top = 100, left = 400, location = no";
        var popup = window.open(url, name, option);
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
        var option = "width = 1690, height = 840, top = 100, left = 400, location = no";
        var popup = window.open(url, name, option);
    },

    fn_regPayAttPop : function (key, exnpKey){
        var url = "/purc/pop/regPurcPayAppFilePop.do?purcSn=" + key + "&claimSn=" + exnpKey + "&auth=user";
        var name = "_blank";
        var option = "width = 850, height = 400, top = 200, left = 350, location = no";
        var popup = window.open(url, name, option);
    },

    fn_reqPayAppPopup : function (purcSn, claimSn, claimExnpSn, payAppSn){

        var url = "/payApp/pop/regPayAppPop.do?purcSn=" + purcSn + "&claimSn=" + claimSn + "&claimExnpSn=" + claimExnpSn + "&reqType=claimExnp";

        if(payAppSn != "undefiend" && payAppSn != undefined && payAppSn != null){
            url = "/payApp/pop/regPayAppPop.do?payAppSn=" + payAppSn;
        }
        var name = "blank";
        var option = "width = 1700, height = 820, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    }


}