var chv = {

    global : {
        editor : "",
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : "",
        htmlStr : "",
        subHtmlStr : ""
    },

    fn_defaultScript : function (){
        $("#histDiv").kendoTabStrip({
            animation:  {
                open: {
                    effects: "fadeIn"
                }
            }
        });

        chv.mainGrid1();
        chv.mainGrid2();
        chv.mainGrid3();
        chv.mainGrid4();

        chv.getCrmHistDetailList();
    },

    mainGrid1 : function(){
        const data = {
            crmSn : $("#crmSn").val(),
            crmHistType: 2
        }
        var dataSource1 = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : "/crm/getCrmHistEngnList",
                    async : false,
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.crmSn = $("#crmSn").val();
                    data.crmHistType = 2;
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
            sort: [
                { field: "CRM_DATE", dir: "desc" }
            ]
        });

        $("#mainGrid1").kendoGrid({
            dataSource: dataSource1,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 508,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount : 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    template: "#= --record #",
                    title: "순번",
                    width : 50
                }, {
                    title: "건명",
                    template: function(row){
                        return row.CRM_REL_PJT_NM;
                    }
                }, {
                    title: "연구일",
                    template: function(row){
                        return row.CRM_DATE;
                    },
                    width : 110
                }, {
                    title: "총 연구비",
                    template: function(row){
                        return fn_numberWithCommas(row.CRM_REL_PJT_AMT);
                    },
                    width : 110,
                    attributes : {
                        style : "text-align : right;"
                    }
                }, {
                    field: "CRM_SHARE_EMP",
                    title: "담당자",
                    width : 80
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    mainGrid2 : function(){
        var dataSource2 = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : "/crm/getCrmHistRndList",
                    async : false,
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.crmSn = $("#crmSn").val();
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
            sort: [
                { field: "START_DATE", dir: "desc" }
            ]
        });

        $("#mainGrid2").kendoGrid({
            dataSource: dataSource2,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 508,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount : 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    template: "#= --record #",
                    title: "순번",
                    width : 50
                }, {
                    field: "CRM_HIST_OBJ",
                    title: "과제구분",
                    width : 190
                }, {
                    title: "건명",
                    template: function(row){
                        return row.CRM_REL_PJT_NM;
                    }
                }, {
                    title: "연구 기간",
                    template: function(row){
                        return row.START_DATE +" ~ "+row.END_DATE;
                    },
                    width : 180
                }, {
                    title: "총 연구비",
                    template: function(row){
                        return fn_numberWithCommas(row.CRM_REL_PJT_AMT);
                    },
                    width : 110,
                    attributes : {
                        style : "text-align : right;"
                    }
                }, {
                    field: "CRM_SHARE_EMP",
                    title: "담당자",
                    width : 80
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    mainGrid3 : function(){
        var dataSource3 = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : "/crm/getCrmHistNonRndList",
                    async : false,
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.crmSn = $("#crmSn").val();
                    data.crmHistType = 2;
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
            sort: [
                { field: "START_DATE", dir: "desc" }
            ]
        });

        $("#mainGrid3").kendoGrid({
            dataSource: dataSource3,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 508,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount : 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    template: "#= --record #",
                    title: "순번",
                    width : 50
                }, {
                    title: "건명",
                    template: function(row){
                        return row.CRM_REL_PJT_NM;
                    }
                }, {
                    title: "연구 기간",
                    template: function(row){
                        return row.START_DATE +" ~ "+row.END_DATE;
                    },
                    width : 180
                }, {
                    field: "EMP_NAME_KR",
                    title: "담당자",
                    width : 100
                }, {
                    field: "DEPT_NAME",
                    title: "부서",
                    width : 120
                }, {
                    field: "POSITION_NAME",
                    title: "직책",
                    width : 100
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    mainGrid4 : function(){
        $("#mainGrid4").kendoGrid({
            /** TODO. 추후 변경해야함 (이력조회) */
            // dataSource: customKendo.fn_gridDataSource2(url, params),
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 508,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount : 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    template: "#= --record #",
                    title: "순번",
                    width : 50
                }, {
                    field: "",
                    title: "문서번호",
                    width : 100
                }, {
                    field: "",
                    title: "구분",
                }, {
                    title: "구매일",
                    width: 240
                }, {
                    field: "",
                    title: "건명",
                    width: 200
                }, {
                    field: "",
                    title: "담당자",
                }, {
                    field: "",
                    title: "금액",
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    getCrmHistDetailList : function(){
        chv.global.searchAjaxData = {
            crmSn : $("#crmSn").val()
        }

        var result = customKendo.fn_customAjax("/crm/getCrmHistDetailList", chv.global.searchAjaxData);
        if(result.flag){
            chv.makeTable(result.list);
        }
    },

    makeTable : function(e){
        /** TODO. 관심분야 삭제 */
        // var crmInterLg = "";
        // var crmInter = "";

        for(var i = 0; i < e.length; i++){
            /** TODO. 관심분야 삭제 */
            // crmInterLg = e[i].CRM_INTER_LG.split(",");
            // crmInter = e[i].CRM_INTER.split(",");
            chv.global.htmlStr = "";
            chv.global.htmlStr += "";

                if(e[i].CRM_HIST_OBJ === "CRM" && e[i].REG_EMP_SEQ == $("#empSeq").val()){ 
                    chv.global.htmlStr += '<tr onclick="chv.fn_crmHistRegPop('+e[i].CRM_HIST_SN+','+e[i].type+');" style="cursor: pointer">';
                }else{
                    chv.global.htmlStr += '<tr>';
                }

                    chv.global.htmlStr += '<td>' + (i+1) + '</td>' +
                                        '<td>' + e[i].DEPT_NAME + '</td>' +
                                        '<td>' + e[i].EMP_NAME_KR + '</td>' +
                                        '<td>';
                    if(e[i].CRM_MEM_NM != null){
                        chv.global.htmlStr += e[i].CRM_MEM_NM;
                    }
            chv.global.htmlStr += "" +
                    '</td>' +
                    '<td>' + e[i].START_DATETIME + '</td>' +
                    '<td>' + e[i].CRM_HIST_OBJ + '</td>' +
                '</tr>';

            /** TODO. 관심분야 삭제 */
            // chv.mainCdChkBoxSetting(crmInterLg);

            chv.global.htmlStr += '' +
                '<tr>' +
                    '<td colSpan="6" style="text-align: left">' + e[i].CRM_REL_CONT + '</td>' +
                '</tr>';

            $("#histTb").append(chv.global.htmlStr);

            /** TODO. 관심분야 삭제 */
            // for(var c = 0; c < crmInterLg.length; c++){
            //     $("input[id='" + crmInterLg[c].split("_")[0] + "']").prop("checked", true)
            // }
            //
            // for(var c = 0; c < crmInter.length; c++){
            //     $("input[id='" + crmInter[c].split("_")[0] + "']").prop("checked", true)
            // }
        }

    },

    fn_crmHistRegPop: function (pk, type) {
        // type 1 : DJ_CRM_HIST / 2 : CRM_HIST
        var name = "_blank";
        var option = "width = 1300, height = 820, top = 100, left = 400, location = no";
        var popup = window.open("/crm/pop/regCrmHistPop.do?crmSn=" + $("#crmSn").val() + "&crmHistSn=" + pk + "&type=" + type, name, option);
    },


    mainCdChkBoxSetting : function(e){
        var crmInterLg = e;
        var grpSn = "";
        var lgCdArr = "";


        for(var i = 0; i < crmInterLg.length; i++){
            var t = crmInterLg[i].split("_");
            grpSn = t[1];
            lgCdArr += ",'" + t[2] + "'";
        }

        var result = customKendo.fn_customAjax("/crm/selLgSmCode", {
            grpSn : t[1],
            lgCdArr : lgCdArr.substring(1)
        });

        var rs = result.rs;
        for(var i = 0; i < rs.length; i++){
            chv.global.htmlStr += "" +
                '<tr style="text-align: left">' +
                    '<td colspan="2">' +
                        '<div>' +
                            '<input type="checkbox" id="' + rs[i].CRM_CD_SN + '" name="crmInterLg" style="margin-right: 5px" grpSn="' + rs[i].GRP_SN + '" value="' + rs[i].LG_CD + '">' +
                            '<label for="' + rs[i].CRM_CD_SN + '">' + rs[i].LG_CD_NM +'</label>' +
                        '</div>' +
                    '</td>' +
                    '<td id="crmInterTd_' + rs[i].LG_CD + '" colspan="4">' +
                        '<div id="crmInterDiv_' + rs[i].LG_CD + '">';
            for(var j = 0; j < rs[i].smList.length; j++){
                chv.global.htmlStr += '' +
                            '<input type="checkbox" id="' + rs[i].smList[j].CRM_CD_SN + '" grpSn="' + rs[i].smList[j].GRP_SN + '" lgCd="' + rs[i].smList[j].LG_CD + '" name="crmInter"  style="margin-left: 5px;margin-right: 5px" value="' + rs[i].smList[j].CRM_CD + '">' +
                            '<label for="' + rs[i].smList[j].CRM_CD_SN + '">' + rs[i].smList[j].CRM_CD_NM + '</label>';
            }
            chv.global.htmlStr += '' +
                        '</div>' +
                    '</td>' +
                '</tr>';
        }
    },
}