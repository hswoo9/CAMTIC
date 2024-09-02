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
        if("1" == $("#regEmpSeq").val()){
            $("#searchDept").data("kendoDropDownList").enable(true);
        }

        purcUserAppList.global.dropDownDataSource = [
            { text: "문서번호", value: "A" },
            { text: "프로젝트명", value: "B" },
            { text: "목적", value: "C" },
            { text: "업체명", value: "D" },
            { text: "작성자", value: "E" },
        ]

        customKendo.fn_dropDownList("searchKeyword", purcUserAppList.global.dropDownDataSource, "text", "value");
        customKendo.fn_textBox(["searchValue"]);

        $("#sBusnClass").kendoDropDownList({
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

        customKendo.fn_datePicker("strDt", '', "yyyy-MM-dd", new Date(new Date().setMonth(new Date().getMonth() - 2)));
        customKendo.fn_datePicker("endDt", '', "yyyy-MM-dd", new Date(new Date().setMonth(new Date().getMonth() + 1)));

        $("#strDt").change(function (){
            if($("#strDt").val() > $("#endDt").val()){
                $("#endDt").val($("#strDt").val());
            }
        });
        $("#endDt").change(function (){
            if($("#strDt").val() > $("#endDt").val()){
                $("#strDt").val($("#endDt").val());
            }
        });

        purcUserAppList.mainGrid("/purc/getUserPurcAppList");
    },

    gridReload : function(){
        $("#mainGrid").data("kendoGrid").dataSource.read();
    },

    mainGrid : function(url){
        var dataSource = new kendo.data.DataSource({
            serverPaging: false,
            pageSize: 99999,
            transport: {
                read : {
                    url : url,
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.empSeq = $("#myEmpSeq").val();
                    data.searchDept = $("#searchDept").val();
                    data.searchKeyword = $("#searchKeyword").val();
                    data.searchValue = $("#searchValue").val();
                    data.sBusnClass = $("#sBusnClass").val();
                    data.strDt = $("#strDt").val();
                    data.endDt = $("#endDt").val();

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
        });

        $("#mainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            selectable: "row",
            resizable : true,
            pageable: {
                refresh: true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount: 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            toolbar: [
                {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="purcUserAppList.fn_reqPayAppMultiPopup()">' +
                            '	<span class="k-button-text">지급신청</span>' +
                            '</button>';
                    }
                }, {
                    name : 'excel',
                    text: '엑셀다운로드'
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="purcUserAppList.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }
            ],
            excel : {
                fileName : "구매지급신청 목록.xlsx",
                filterable : true
            },
            excelExport: exportGrid,
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
                    headerTemplate: '<input type="checkbox" id="clmCheckAll" name="clmCheckAll" onclick="fn_checkAll(\'clmCheckAll\', \'clm\');"/>',
                    width: 40,
                    template : function (e){
                        if(e.F_PAY_APP_SN == null){
                            return "<input type='checkbox' id='clm"+e.CLAIM_SN+"' name='clm' class='clm' value='"+e.CLAIM_SN+"' claimExnpSn='"+e.CLAIM_EXNP_SN+"'/>";
                        } else {
                            return "";
                        }
                    }
                }, {
                    title: "번호",
                    width: 40,
                    template: "#= --record #"
                }, {
                    field: "DEPT_NAME",
                    title: "요청부서",
                    width: 120,
                }, {
                    field: "PURC_TYPE",
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
                    field: "F_EMP_NAME",
                    title: "담당자",
                    width: 60,
                    template: function(e){
                        if(e.MNG_REQ_STAT == "Y"){
                            return e.F_EMP_NAME;
                        } else {
                            return e.PURC_EMP_NAME;
                        }
                    }
                }, {
                    field: "PJT_NM",
                    title: "프로젝트명",
                    width: 160,
                    template : function (e) {
                        if(e.PJT_NM == "") {
                            return "법인운영";
                        } else {
                            return e.PJT_NM;
                        }
                    }
                }, {
                    field: "CLAIM_TITLE",
                    title: "제목",
                    width: 160
                }, {
                    field: "PURC_PURPOSE",
                    title: "목적",
                    width: 200,
                    template : function(e){
                        return '<div style="text-align: left"><a onclick="purcUserAppList.fn_reqClaiming(' + e.CLAIM_SN + ', '+e.PURC_SN+')">' + e.PURC_REQ_PURPOSE + '</a></div>'
                    }
                }, {
                    field: "CRM_NM",
                    title: "업체",
                    width: 120
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
                    field: "REQ_AMT",
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
                {
                    title: "상태",
                    width: 80,
                    template : function(e){
                        var stat = "";
                        if(e.F_DOC_STATUS == "100"){
                            stat = "결재완료"
                            if(e.ITEM_COUNT == e.EXNP_DOC_STATUS && e.EXNP_STATUS == e.EXNP_DOC_STATUS && e.RE_STAT == 'Y'){
                                stat = "지출완료";
                            } else if(e.ITEM_COUNT != e.EXNP_DOC_STATUS && e.EXNP_DOC_STATUS != 0){
                                stat = "부분지출";
                            } else if (e.EXNP_STATUS != 0){
                                stat = "지출대기";
                            }
                        } else if(e.F_DOC_STATUS == "10" || e.F_DOC_STATUS == "50"){
                            stat = "결재중"
                        } else if(e.F_DOC_STATUS == "30"){
                            stat = "반려"
                        } else if(e.F_DOC_STATUS == "0") {
                            stat = "작성중"
                        } else {
                            stat = "미작성"
                        }

                        return stat;
                    }
                },
                // {
                //     title: "첨부",
                //     width: 50,
                //     template : function(e) {
                //         return '<button type="button" class="k-button k-button-solid-base" onClick="purcUserAppList.fn_regPayAttPop('+e.PURC_SN+', '+e.CLAIM_SN+')">첨부</button>';
                //     }
                // },
                {
                    title : "지급신청",
                    width : 70,
                    template: function(e){

                        if(e.F_DOC_STATUS != 0 && e.F_DOC_STATUS != 30 && e.F_DOC_STATUS != 40 && e.F_DOC_STATUS != null){
                            return '<button type="button" class="k-button k-button-solid-info" onclick="purcUserAppList.fn_reqPayAppPopup('+e.PURC_SN+', '+e.CLAIM_SN+', '+e.CLAIM_EXNP_SN+', '+e.F_PAY_APP_SN+')">지급신청</button>';
                        } else {
                            return '<button type="button" class="k-button k-button-solid-base" onclick="purcUserAppList.fn_reqPayAppPopup('+e.PURC_SN+', '+e.CLAIM_SN+', '+e.CLAIM_EXNP_SN+', '+e.F_PAY_APP_SN+')">지급신청</button>';
                        }
                    }
                },  /*{
                    field: "REQ_AMT",
                    title: "지출상태",
                    width: 60,
                    template: function(e){

                        if(e.REQ_AMT == e.EXNP_AMT){
                            return "승인"
                        } else {
                            return "미승인"
                        }
                    }
                },*/
            ],
            dataBinding: function () {
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
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
    },

    fn_reqPayAppMultiPopup : function (){
        if($('input[name="clm"]:checked').length == 0){
            alert("선택된 지급건이 없습니다.");
            return;
        }

        var claimSn = "";
        $('input[name="clm"]:checked').each(function(){
            claimSn += $(this).val() + ",";
        });

        var claimExnpSn = "";
        $('input[name="clm"]:checked').each(function(){
            var ces = "N";
            if($(this).attr("claimExnpSn") != ""){
                ces = $(this).attr("claimExnpSn");
            }
            claimExnpSn += ces + ",";
        });

        claimSn = claimSn.substring(0, claimSn.length - 1);
        claimExnpSn = claimExnpSn.substring(0, claimExnpSn.length - 1);

        var url = "/payApp/pop/regPayAppPop.do?claimSn="+claimSn+"&reqType=claim&claimExnpSn="+claimExnpSn;

        // var url = "/payApp/pop/regPayAppPop.do?purcSn=" + purcSn + "&claimSn=" + claimSn + "&claimExnpSn=" + claimExnpSn + "&reqType=claimExnp";

        // if(payAppSn != "undefiend" && payAppSn != undefined && payAppSn != null){
        //     url = "/payApp/pop/regPayAppPop.do?payAppSn=" + payAppSn;
        // }
        var name = "_blank";
        var option = "width = 1700, height = 820, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    },


}