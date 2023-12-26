let purcSum = 0;
let bustSum = 0;
let costSum = 0;
var costInfo = {

    global : {
        searchAjaxData2 : "",
        searchAjaxData3 : "",
        searchAjaxData4 : ""
    },

    fn_defaultScript : function (){
        commonProject.setPjtStat();
        this.dataSet();
        this.gridReload();
    },

    dataSet : function (){
        const pjtSn = $("#pjtSn").val();
        const result = customKendo.fn_customAjax("/project/engn/getDelvData", {pjtSn: pjtSn});
        const pjtMap = result.map;
        console.log(pjtMap);
        const delvMap = result.delvMap;
        $("#PJT_CD").text(pjtMap.PJT_CD);
        $("#PJT_NM").text(pjtMap.PJT_NM);
        $("#PM").text(pjtMap.PM);
        $("#PJT_STR_DT").text(pjtMap.PJT_START_DT);
        $("#PJT_END_DT").text(pjtMap.PJT_EXP_END_DT);
        $("#PJT_AMT").text(fn_numberWithCommas(pjtMap.PJT_AMT));

        let sbjText = "미사용";
        if(pjtMap.SBJ_SEP != undefined){
            if(pjtMap.SBJ_SEP == "Y"){
                sbjText = "사용 / ";
                var data = {
                    pjtSn: pjtSn
                }
                let result = customKendo.fn_customAjax("/projectRnd/getAccountInfo", data);
                $("#checkboxDiv").show();
                for(let i=0; i<result.list.length; i++){
                    sbjText += result.list[i].IS_TYPE;
                }
            }
        }
        $("#SBJ_SEP").text(sbjText);

        /** 사업정보 */
        if(commonProject.global.busnClass == "D"){
            let html = '';
            html += '<tr>';
            html += '<td>';
            html += pjtMap.DEPT_NAME;
            html += '</td>';
            html += '<td>';
            html += pjtMap.DEPT_NAME;
            html += '</td>';
            html += '<td>';
            html += pjtMap.PJT_START_DT.substring(0, 4)+"년";
            html += '</td>';
            html += '<td>';
            html += pjtMap.DEPT_NAME;
            html += '</td>';
            html += '<td>';
            html += pjtMap.DEPT_NAME;
            html += '</td>';
            html += '</tr>';
            //$("#pjtInfoRow").append(html);
        }
    },

    gridReload : function (){
        costInfo.global.searchAjaxData2 = {
            empSeq : $("#loginEmpSeq").val(),
            pjtSn : $("#pjtSn").val(),
            searchKeyword : $("#searchKeyword").val(),
            searchValue : $("#searchValue").val()
        }
        costInfo.global.searchAjaxData3 = {
            startDate : $("#start_date").val(),
            endDate : $("#end_date").val(),
            projectCd : $("#pjtSn").val(),
            busnName : $("#busnName").val(),
            empSeq : $("#regEmpSeq").val(),
            pjtSn : $("#pjtSn").val()
        }
        costInfo.global.searchAjaxData4 = {
            pjtSn : $("#pjtSn").val()
        }

        this.grid2("/purc/getPurcReqList.do", costInfo.global.searchAjaxData2);
        this.grid3("/bustrip/getProjectBustList", costInfo.global.searchAjaxData3);
        this.grid4("/payApp/getPjtExnpList", costInfo.global.searchAjaxData4);


        $("#purcSum").text($("#purcSumTemp").text());
        $("#bustSum").text($("#bustSumTemp").text());
        $("#costSum").text($("#costSumTemp").text());
        $("#invSum").text(comma(Number(uncomma($("#purcSumTemp").text()))+Number(uncomma($("#bustSumTemp").text()))+Number(uncomma($("#costSumTemp").text()))));
    },

    grid2 : function (url, params){
        $("#grid2").kendoGrid({
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
            dataBound: function(){
                purcSum = 0;
            },
            columns: [
                {
                    title: "번호",
                    width: 50,
                    template: "#= --record #"
                }, {
                    title: "문서번호",
                    field: "DOC_NO",
                    width: 180,
                }, {
                    field: "PURC_REQ_DATE",
                    title: "요청일",
                    width: 120,
                }, {
                    title: "요청자",
                    field: "EMP_NAME_KR",
                    width: 100
                }, {
                    title: "목적",
                    field: "PURC_REQ_PURPOSE",
                    template : function(e){
                        return '<div onclick="purcInfo.fn_reqRegPopup(' + e.PURC_SN + ')" style="cursor : pointer">' + e.PURC_REQ_PURPOSE + '</div>'
                    }
                }, {
                    title: "구매",
                    width: 100,
                    template : function(e){
                        return e.CP_CNT + "건 / " + '<span style="color:red;">'+e.RP_CNT+'</span>' + "건"
                    }
                }, {
                    title: "외주",
                    width: 100
                }, {
                    title: "상태",
                    field: "STATUS",
                    width: 120,
                    template : function(e){
                        var status = "";
                        /** 구매요청서 */
                        if(e.DOC_STATUS == "0"){
                            status = "구매요청작성중";
                        }else if(e.DOC_STATUS != "100" && e.DOC_STATUS != "101"){
                            status = "구매요청작성중";
                        }else if(e.DOC_STATUS == "100" || e.DOC_STATUS == "101"){
                            status = "구매요청완료";

                            /** 구매청구서 */
                            if(e.CLAIM_STATUS == "CN"){
                                status = "구매요청완료";
                            }else if(e.CLAIM_STATUS == "CAN"){
                                status = "구매청구작성중";
                            }else if(e.CLAIM_STATUS == "CAYSN"){
                                status = "구매청구작성중";
                            }else if(e.CLAIM_STATUS == "CAYSY"){
                                status = "구매청구완료";
                            }

                            if(e.INSPECT_YN == "Y"){
                                if(e.INSPECT_STATUS != "100"){
                                    status = "검수요청중";
                                }else{
                                    status = "<div style='font-weight: bold'>검수승인완료</div>";
                                }
                            }
                        }
                        return status
                    },
                    footerTemplate: "청구 합계"
                }, {
                    title: "금액",
                    width: 100,
                    template: function(e){
                        console.log(e)
                        if(e.CLAIM_STATUS == "CAYSY"){
                            purcSum  += Number(e.PURC_ITEM_AMT_SUM);
                        }
                        return "<div style='text-align: right'>"+comma(e.PURC_ITEM_AMT_SUM)+"</div>";
                    },
                    footerTemplate: function(){
                        return "<div id='purcSumTemp' style='text-align: right'>"+comma(purcSum)+"</div>";
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    grid3 : function (url, params){
        $("#grid3").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 480,
            pageable: {
                refresh: true,
                pageSizes: [ 10, 20, 30, 50, 100 ],
                buttonCount: 5
            },
            toolbar : [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="bustInfo.bustripMainGrid()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }
            ],
            dataBound : function(e){
                const grid = this;
                grid.tbody.find("tr").click(function (e) {
                    const dataItem = grid.dataItem($(this));
                    console.log(dataItem);

                    $("#contEtc").val(dataItem.RESULT);

                    grid.tbody.find("tr").each(function (){
                        $(this).css("background-color", "");
                    });

                    $(this).css("background-color", "#a7e1fc");
                });
                bustSum = 0;
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    title: "사업명",
                    width: 150,
                    template: function(row){
                        var busnName = "";
                        var project = "";
                        if(row.BUSN_NAME != "" && row.BUSN_NAME != null && row.BUSN_NAME != undefined){
                            busnName = row.BUSN_NAME;
                        }

                        if(row.PROJECT_CD != "" && row.PROJECT_CD != null){
                            project = "(" + row.PROJECT + ") ";
                        }
                        return  $("#pjtNm").val();
                    }
                }, {
                    field: "EMP_NAME",
                    title: "출장자",
                    width: 80
                }, {
                    title: "출장지 (경유지)",
                    template: function(row){
                        if(row.VISIT_LOC_SUB != ""){
                            return row.VISIT_CRM + " (" + row.VISIT_LOC_SUB+")";
                        }else{
                            return row.VISIT_CRM;
                        }
                    },
                    width: 160
                }, {
                    title: "출발일시",
                    template: function(row){
                        return row.TRIP_DAY_FR + " " + row.TRIP_TIME_FR;
                    },
                    width: 100
                }, {
                    title: "복귀일시",
                    template: function(row){
                        return row.TRIP_DAY_TO + " " + row.TRIP_TIME_TO;
                    },
                    width: 100
                }, {
                    field: "CAR_CLASS_NAME",
                    title: "차량",
                    width: 80,
                    template : function (e){
                        if(e.USE_TRSPT == 1){
                            return "카니발";
                        } else if(e.USE_TRSPT == 2){
                            return "아반떼";
                        } else if (e.USE_TRSPT == 3){
                            return "트럭";
                        } else if (e.USE_TRSPT == 4){
                            return "모하비";
                        } else if (e.USE_TRSPT == 5){
                            return "솔라티";
                        } else if (e.USE_TRSPT == 6){
                            return "드론관제차량";
                        } else if (e.USE_TRSPT == 7){
                            return "자가";
                        } else if (e.USE_TRSPT == 8){
                            return "대중교통";
                        } else {
                            return "";
                        }
                    },
                    footerTemplate: "출장완료 여비합계"
                }, {
                    title : "여비금액",
                    width: 50,
                    template : function (e){
                        if(e.RS_STATUS == "100"){
                            bustSum  += Number(e.RES_EXNP_SUM);
                        }
                        return "<div style='text-align: right'>"+comma(e.RES_EXNP_SUM)+"</div>";
                    },
                    footerTemplate: function(){
                        return "<div id='bustSumTemp' style='text-align: right'>"+comma(bustSum)+"</div>";
                    }
                }
            ]
        }).data("kendoGrid");
    },

    grid4 : function (url, params){
        $("#grid4").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 480,
            pageable: {
                refresh: true,
                pageSizes: [ 10, 20, 30, 50, 100 ],
                buttonCount: 5
            },
            toolbar : [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="bustInfo.bustripMainGrid()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }
            ],
            dataBound : function(e){
                const grid = this;
                grid.tbody.find("tr").click(function (e) {
                    const dataItem = grid.dataItem($(this));
                    console.log(dataItem);

                    $("#contEtc").val(dataItem.RESULT);

                    grid.tbody.find("tr").each(function (){
                        $(this).css("background-color", "");
                    });

                    $(this).css("background-color", "#a7e1fc");
                });
                costSum = 0;
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    field: "APP_DE",
                    title: "지급신청일"
                }, {
                    title: "금액",
                    template: function(row){
                        return "<div style='text-align: right'>"+comma(row.ITEM_SUM)+"</div>";
                    }
                }, {
                    title: "구매/출장 문서번호",
                    template : function(row){
                        if(row.PURC_DOC_NO != null){
                            return row.PURC_DOC_NO;
                        } else {
                            return "-";
                        }
                    }
                }, {
                    title: "비용처리",
                    template: function(row){
                        if(row.PURC_DOC_NO != null){
                            return "-";
                        } else {
                            return '<button type="button" class="k-button k-button-solid-info" onclick="costInfo.fn_reqRegPopup('+row.PAY_APP_SN+')">비용처리</button>';
                        }
                    }
                }, {
                    title: "상태",
                    template: function(row){
                        if (row.COST_YN == 'Y') {
                            return "처리완료";
                        }else{
                            return "-";
                        }
                    },
                    footerTemplate: "비용합계"
                }, {
                    title: "비용",
                    template: function(row){
                        costSum += Number(row.COST_SUM);
                        return "<div style='text-align: right'>"+comma(row.COST_SUM)+"</div>";
                    },
                    footerTemplate: function(){
                        return "<div id='costSumTemp' style='text-align: right'>"+comma(costSum)+"</div>";
                    }
                }
            ]
        }).data("kendoGrid");
    },

    fn_reqRegPopup : function (key){
        var url = "/payApp/pop/regPayAppCostPop.do?payAppSn=" + key + "&auth=mng&status=rev&reqType=costProcess";
        if(key != null && key != ""){

        }
        var name = "regPayAppPop";
        var option = "width = 1700, height = 820, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    }
}