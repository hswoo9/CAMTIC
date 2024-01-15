var purcMngAppList = {

    global : {
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : "",
        clmArr : [],
    },

    fn_defaultScript : function(){
        purcMngAppList.global.dropDownDataSource = [
            { text: "내 구매만 조회", value: "empDept" },
        ]
        customKendo.fn_dropDownList("searchDept", purcMngAppList.global.dropDownDataSource, "text", "value");
        $("#searchDept").data("kendoDropDownList").value("empDept");
        $("#searchDept").data("kendoDropDownList").bind("change", purcMngAppList.gridReload);

        purcMngAppList.global.dropDownDataSource = [
            { text: "문서번호", value: "DOC_NO" },
            { text: "목적", value: "PURC_REQ_PURPOSE" },
            { text: "품명", value: "PURC_ITEM_NAME" },
        ]

        customKendo.fn_dropDownList("searchKeyword", purcMngAppList.global.dropDownDataSource, "text", "value");
        customKendo.fn_textBox(["searchValue"]);

        purcMngAppList.global.dropDownDataSource = [
            { text: "검수 미작성", value: "1" },
            { text: "검수 작성 및 미승인", value: "2" },
            { text: "검수 작성 및 승인", value: "3" }
        ]

        $("#busnClass").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "전체", value: ""},
                {text: "R&D", value: "R"},
                {text: "비R&D", value: "S"},
                {text: "엔지니어링", value: "D"},
                {text: "기타/용역", value: "N"},
            ],
        });

        customKendo.fn_dropDownList("inspectStat", purcMngAppList.global.dropDownDataSource, "text", "value");
        $("#inspectStat").data("kendoDropDownList").bind("change", purcMngAppList.gridReload);
        purcMngAppList.gridReload();
    },

    mainGrid : function(url, params){
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="purcMngAppList.fn_purcBasicSettings()">' +
                            '	<span class="k-button-text">지급설정</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="purcMngAppList.fn_appUserPaySetting()">' +
                            '	<span class="k-button-text">지출요청</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="purcMngAppList.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }],
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" onclick="fn_checkAll(\'checkAll\', \'clm\');"/>',
                    width: 40,
                    template : function (e){
                        console.log(e)
                        return "<input type='checkbox' id='clm"+e.CLAIM_SN+"' name='clm' class='clm' value='"+e.CLAIM_SN+"'/>";
                    }
                }, {
                    title: "번호",
                    width: 50,
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
                    width: 150
                }, {
                    title: "목적",
                    field: "PURC_PURPOSE",
                    width: 150,
                    template : function(e){
                        return '<a onclick="purcMngAppList.fn_reqClaiming(' + e.CLAIM_SN + ', '+e.PURC_SN+')">' + e.PURC_REQ_PURPOSE + '</a>'
                    }
                }, {
                    field: "CRM_NM",
                    title: "업체명",
                    width: 100
                }, {
                    field: "DOC_NO",
                    title: "문서번호",
                    width: 100
                }, {
                    field: "ORDER_DT",
                    title: "발주일",
                    width: 80
                }
                // , {
                //     field: "EXNP_DE",
                //     title: "지출예정일",
                //     width: 100
                // }
                , {
                    title: "금액",
                    width: 100,
                    template: function(e){
                        return '<div style="text-align: right">'+comma(e.TOT_AMT)+'</div>';
                    }
                }, {
                    title: "지출요청액",
                    width: 100,
                    template: function(e){
                        return '<div style="text-align: right">'+comma(e.REQ_AMT)+'</div>';
                    }
                }, {
                    title: "지출액",
                    width: 100,
                    template: function(e){
                        return '<div style="text-align: right">'+comma(e.EXNP_AMT)+'</div>';
                    }
                }, {
                    title: "미지급액",
                    width: 100,
                    template: function(e){
                        return '<div style="text-align: right">'+comma(Number(e.TOT_AMT) - Number(e.EXNP_AMT))+'</div>';
                    }
                }, {
                    title: "상태",
                    width: 80,
                    template : function(e){
                        var stat = "미설정"
                        return stat;
                    }
                }, {
                    title: "첨부",
                    width: 80,
                    template : function(e) {
                        return '<button type="button" class="k-button k-button-solid-base" onClick="purcMngAppList.fn_regPayAttPop('+e.PURC_SN+', '+e.CLAIM_SN+')">첨부</button>';
                    }
                }
            ],
            dataBinding: function () {
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    gridReload : function(){
        purcMngAppList.global.searchAjaxData = {
            empSeq : $("#myEmpSeq").val(),
            searchDept : $("#searchDept").val(),
            searchKeyword : $("#searchKeyword").val(),
            searchValue : $("#searchValue").val(),
            inspectStat : $("#inspectStat").data("kendoDropDownList").value()
        }

        purcMngAppList.mainGrid("/purc/getMngPurcAppList", purcMngAppList.global.searchAjaxData);
    },

    fn_reqRegPopup : function(key, stat){
        var url = "/purc/pop/regPurcReqPop.do";
        if(key != null && key != ""){
            url = "/purc/pop/regPurcReqPop.do?purcSn=" + key + "&stat=" + stat;
        }
        var name = "blank";
        var option = "width = 1690, height = 820, top = 100, left = 400, location = no";
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

    fn_checkAll : function(){

        if($("#checkAll").is(":checked")){
            $("input[name='clm']").prop("checked", true);
        } else {
            $("input[name='clm']").prop("checked", false);
        }
    },


    fn_regPayAttPop : function (key, exnpKey){
        var url = "/purc/pop/regPurcPayAppFilePop.do?purcSn=" + key + "&claimSn=" + exnpKey;
        var name = "_blank";
        var option = "width = 850, height = 400, top = 200, left = 350, location = no";
        var popup = window.open(url, name, option);
    },


    fn_appUserPaySetting : function (){
        purcMngAppList.global.clmList = [];

        $("input[name='clm']:checked").each(function(){
            purcMngAppList.global.clmList.push($(this).val());
        });

        if(purcMngAppList.global.clmList.length == 0){
            alert("선택된 값이 없습니다.");
            return;
        }

        var url = "/purc/pop/appUserPaySetting.do";
        var name = "_blank";
        var option = "width = 850, height = 400, top = 200, left = 350, location = no";
        var popup = window.open(url, name, option);

    },

    fn_purcBasicSettings : function(){
        purcMngAppList.global.clmList = [];

        $("input[name='clm']:checked").each(function(){
            purcMngAppList.global.clmList.push($(this).val());
        });

        if(purcMngAppList.global.clmList.length == 0){
            alert("선택된 값이 없습니다.");
            return;
        }

        var url = "/purc/pop/purcBasicSettings.do";
        var name = "_blank";
        var option = "width = 850, height = 400, top = 200, left = 350, location = no";
        var popup = window.open(url, name, option);
    }


}