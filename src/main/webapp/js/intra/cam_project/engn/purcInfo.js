let purcSum = 0;

var purcInfo = {

    global : {
        saveAjaxData : "",
    },

    fn_defaultScript : function(){
        commonProject.setPjtStat();

        $("#radioSelectPurcType").kendoRadioGroup({
            items: [
                { label : "구매 리스트", value : "1" },
                { label : "구매 지급 리스트", value : "2" },
            ],
            layout : "horizontal",
            labelPosition : "after",
            value : "1",
            change : function(e){
                var idx = this.value();

                if(idx == 1){
                    $("#purcInfoMainGrid").css("display", "");
                    $("#purcInfoMainGrid2").css("display", "none");
                    $("#purcTitleWrap").text("◎ 구매 리스트");
                    $("#mainGrid1Wrap").show();
                    $("#purcBtnDiv2").hide();
                } else if (idx == 2){
                    $("#purcInfoMainGrid").css("display", "none");
                    $("#purcInfoMainGrid2").css("display", "");
                    $("#purcTitleWrap").text("◎ 구매 지급 리스트");
                    $("#mainGrid1Wrap").hide();
                    $("#purcBtnDiv2").show();
                }
            }
        });

        purcInfo.setAccount();
        this.gridReload();
    },

    setAccount : function(){
        var date = new Date();
        var year = date.getFullYear().toString().substring(2,4);

        let params = {
            pjtSn: $("#pjtSn").val()
        }
        const result = customKendo.fn_customAjax("/projectRnd/getAccountInfo", params);
        const list = result.list;
        let arr = [];
        let firstValue = "";
        for(let i=0; i<list.length; i++){
            let label = "";
            if(list[i].IS_TYPE == "1"){
                label = "국비";
            }else if(list[i].IS_TYPE == "2"){
                label = "도비";
            }else if(list[i].IS_TYPE == "3"){
                label = "시비";
            }else if(list[i].IS_TYPE == "4"){
                label = "자부담";
            }else if(list[i].IS_TYPE == "5"){
                label = "업체부담";
            }else if(list[i].IS_TYPE == "9"){
                label = "기타";
            }
            let data = {
                label: label,
                value: $("#purcMgtCd").val().slice(0, -1) + list[i].IS_TYPE
            };
            arr.push(data);
            if(i == 0){
                firstValue = $("#purcMgtCd").val().slice(0, -1) + list[i].IS_TYPE;
            }
        }

        if(list.length == 0){
            arr = [
                {
                    label: "사업비",
                    value: $("#purcMgtCd").val()
                }
            ];
            firstValue = $("#purcMgtCd").val();
        }
        customKendo.fn_radioGroup("purcBudgetClass", arr, "horizontal");
        $("#purcBudgetClass").data("kendoRadioGroup").value(firstValue);

        $("#purcBudgetClass").data("kendoRadioGroup").bind("change", function(){
            purcInfo.gridReload($("#purcBudgetClass").data("kendoRadioGroup").value());
        });
    },

    gridReload: function (pjtCd){
        purcInfo.global.searchAjaxData = {
            pjtCd : $("#purcBudgetClass").data("kendoRadioGroup").value(),
            empSeq : $("#loginEmpSeq").val(),
            pjtSn : $("#pjtSn").val(),
            searchKeyword : $("#searchKeyword").val(),
            searchValue : $("#searchValue").val(),
            camProject: "Y",
            busnClass: commonProject.global.busnClass
        }

        purcInfo.mainGrid("/purc/getPurcReqClaimList.do", purcInfo.global.searchAjaxData);
        purcInfo.mainGrid2("/purc/getUserPurcAppList", purcInfo.global.searchAjaxData);
        purcInfo.subGrid("/purc/getPjtPurcItemList", purcInfo.global.searchAjaxData);
    },

    mainGrid2Reload: function(){
        purcInfo.mainGrid2("/purc/getUserPurcAppList", purcInfo.global.searchAjaxData);
    },

    mainGrid: function(url, params){
        $("#purcInfoMainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSourceAll(url, params, "ALL"),
            sortable: true,
            selectable: "row",
            height : 525,
            pageable: {
                refresh: true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount: 5
            },
            resizable : true,
            dataBound: purcInfo.onDataBound,
            toolbar: [
                {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="purcInfo.fn_reqPurcRegPopup()">' +
                            '	<span class="k-button-text">구매요청서 작성</span>' +
                            '</button>';
                    }
                }, {
                    name : 'excel',
                    text: '엑셀다운로드'
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="purcInfo.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }
            ],
            excel : {
                fileName : "구매 목록.xlsx",
                filterable : true
            },
            excelExport: exportGrid,
            noRecords: {
                template: "데이터가 존재하지 않습니다."
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
                    width: 100,
                }, {
                    field: "EMP_NAME_KR",
                    title: "요청자",
                    width: 80,
                    footerTemplate: function(){
                        return "<div style='text-align: right'>투자금액</div>";
                    }
                }, {
                    field: "PURC_REQ_PURPOSE",
                    title: "목적",
                    template : function(e){
                        return '<div style="text-align: left;"><input type="hidden" id="reStat" name="reStat" value="'+e.RE_STATUS+'" />'+ e.PURC_REQ_PURPOSE + '</div>';
                    },
                    footerTemplate: function(){
                        const list = customKendo.fn_customAjax("/project/getTeamInvList", {pjtSn: $("#pjtSn").val()}).list;
                        let invSum = 0;
                        for(let i=0; i<list.length; i++){
                            invSum += Number(list[i].EST_TOT_AMT);
                        }

                        const pjtInfo = customKendo.fn_customAjax("/project/getProjectInfo", {pjtSn: $("#pjtSn").val()});
                        const pjtMap = pjtInfo.map;
                        if(pjtMap.BUSN_CLASS == "D" || pjtMap.BUSN_CLASS == "V"){
                            const rs = customKendo.fn_customAjax("/project/engn/getEstData", {pjtSn: $("#pjtSn").val()});
                            const res = rs.result;
                            const estList = res.estList;
                            let estMap = new Object();

                            /** 현재 버전 견적 데이터 추출 */
                            estMap = estList[(estList.length - 1)];
                            console.log("estMap.VAT", estMap.VAT);

                            if(estMap.VAT == "N"){
                                invSum = Number(Math.floor(invSum * 1.1));
                            }
                        }
                        return "<div style='text-align: right'>"+comma(Math.round(invSum))+"</div>";
                    }
                }, {
                    field: "STATUS",
                    title: "구매요청서",
                    width: 100,
                    template : function(e){
                        var status = "";
                        if(e.ORG_YN == 'N'){
                            /** 구매요청서 */
                            if(e.PURC_SN != null){
                                if(e.DOC_STATUS == "100"){
                                    status = '<button type="button" class="k-button k-button-solid-info" onclick="purcInfo.fn_reqPurcRegPopup(' + e.PURC_SN + ')">구매요청서</button>';
                                } else {
                                    status = '<button type="button" class="k-button k-button-solid-base" onclick="purcInfo.fn_reqPurcRegPopup(' + e.PURC_SN + ')">구매요청서</button>';
                                }
                            } else {
                                status = '';
                            }
                        } else {
                            status = '이관 데이터';
                        }

                        return status
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>잔여금액</div>";
                    }
                }, {
                    field: "DOC_STATUS",
                    title: "구매청구서",
                    width: 100,
                    template: function(e){
                        var status = "";
                        if(e.ORG_YN == 'N'){
                            /** 구매요청서 */
                            if(e.PURC_SN != null){
                                if(e.DOC_STATUS == "100" || e.DOC_STATUS == "101"){
                                    if(e.CLAIM_DOC_STATUS == "100"){
                                        status = '<button type="button" class="k-button k-button-solid-info" onclick="approveDocView(' + e.CLAIM_DOC_ID + ', \''+e.APPRO_KEY+'\', \'claim\')">구매청구서</button>';
                                    } else {
                                        if(e.PAYMENT_METHOD == "C"){
                                            if(e.CLAIM_SN != ""){
                                                status = '<button type="button" class="k-button k-button-solid-base" onclick="purcInfo.fn_reqClaiming(' + e.CLAIM_SN + ', \''+e.PURC_SN+'\')">구매청구서</button>';
                                            } else {
                                                status = '<button type="button" class="k-button k-button-solid-base" onclick="purcInfo.fn_reqRegClaimPopup('+e.PURC_SN+', \'v\')">구매청구서</button>';
                                            }
                                        } else {
                                            status = '';
                                        }
                                    }
                                }
                            } else {
                                if(e.CLAIM_DOC_STATUS == "100"){
                                    status = '<button type="button" class="k-button k-button-solid-info" onclick="approveDocView(' + e.CLAIM_DOC_ID + ', \''+e.APPRO_KEY+'\', \'claim\')">구매청구서</button>';
                                } else {
                                    if(e.CLAIM_SN != ""){
                                        status = '<button type="button" class="k-button k-button-solid-base" onclick="purcInfo.fn_reqClaiming(' + e.CLAIM_SN + ', \''+e.PURC_SN+'\')">구매청구서</button>';
                                    } else {
                                        status = '<button type="button" class="k-button k-button-solid-base" onclick="purcInfo.fn_reqRegClaimPopup('+e.PURC_SN+', \'v\')">구매청구서</button>';
                                    }
                                }
                            }
                        } else {
                            status = '이관 데이터';
                        }

                        return status
                    },
                    footerTemplate: function(){
                        const list = customKendo.fn_customAjax("/project/getTeamInvList", {pjtSn: $("#pjtSn").val()}).list;
                        let invSum = 0;
                        for(let i=0; i<list.length; i++){
                            invSum += Number(list[i].EST_TOT_AMT);
                        }

                        const pjtInfo = customKendo.fn_customAjax("/project/getProjectInfo", {pjtSn: $("#pjtSn").val()});
                        const pjtMap = pjtInfo.map;
                        if(pjtMap.BUSN_CLASS == "D" || pjtMap.BUSN_CLASS == "V"){
                            const rs = customKendo.fn_customAjax("/project/engn/getEstData", {pjtSn: $("#pjtSn").val()});
                            const res = rs.result;
                            const estList = res.estList;
                            let estMap = new Object();

                            /** 현재 버전 견적 데이터 추출 */
                            estMap = estList[(estList.length - 1)];
                            console.log("estMap.VAT", estMap.VAT);

                            if(estMap.VAT == "N"){
                                invSum = Number(Math.floor(invSum * 1.1));
                            }
                        }

                        const leftList = customKendo.fn_customAjax("/purc/getProjectPurcReqList", {pjtSn: $("#pjtSn").val()}).list;
                        let purcSum2 = 0;
                        let leftSum = 0;
                        for(let i=0; i<leftList.length; i++){
                            purcSum2 += Number(leftList[i].PURC_ITEM_AMT);
                        }
                        leftSum = invSum - purcSum2;
                        return "<div style='text-align: right'>"+comma(Math.round(leftSum))+"</div>";
                    }
                }, {
                    field: "CRM_NM",
                    title: "업체명",
                    width: 70
                }, {
                    field: "STATUS",
                    title: "검수",
                    width: 70,
                    template: function (e) {
                        /** 구매청구서 작성시 검수 버튼 생성*/
                        let html = "";
                        if(e.ORG_YN == 'N'){
                            if(e.PAYMENT_METHOD == "A"){
                                if(e.ORDER_DT != null && e.ORDER_DT != ""){
                                    if(e.CLAIM_STATUS == "CAYSY"){
                                        if(e.CLAIM_DOC_STATUS == "100" || e.CLAIM_DOC_STATUS == "101") {
                                            if(e.INSPECT_YN != "Y"){
                                                html = '<button type="button" class="k-button k-button-solid-base" onclick="purcInfo.fn_inspectionPopup(\'\', \'mng\', ' + e.CLAIM_SN + ')">검수</button>';
                                            }else{
                                                html = '<button type="button" class="k-button k-button-solid-info" onclick="purcInfo.fn_inspectionPopup(\'\', \'mng\', ' + e.CLAIM_SN + ')">검수</button>';

                                            }
                                        } else {
                                            html = '';
                                        }

                                    }else{
                                        html = "-"
                                    }
                                } else {
                                    html = "-"
                                }
                            } else {
                                if(e.CLAIM_STATUS == "CAYSY"){
                                    if(e.CLAIM_DOC_STATUS == "100" || e.CLAIM_DOC_STATUS == "101"){
                                        if(e.INSPECT_YN != "Y"){
                                            html = '<button type="button" class="k-button k-button-solid-base" onclick="purcInfo.fn_inspectionPopup(\'\', \'mng\', ' + e.CLAIM_SN + ')">검수</button>';
                                        }else{
                                            html = '<button type="button" class="k-button k-button-solid-info" onclick="purcInfo.fn_inspectionPopup(\'\', \'mng\', ' + e.CLAIM_SN + ')">검수</button>';
                                        }
                                    } else {
                                        html = '-';
                                    }
                                }else{
                                    html = "-"
                                }
                            }
                        } else {
                            html = "-";
                        }

                        return html;
                    }
                }, {
                    field: "PURC_ITEM_AMT_SUM",
                    title: "금액",
                    width: 100,
                    template: function(e){
                        console.log(e)
                        purcSum  += Number(e.PURC_ITEM_AMT_SUM);
                        return "<div style='text-align: right'>"+comma(Math.round(e.PURC_ITEM_AMT_SUM))+"</div>";
                    },

                    footerTemplate: function(){
                        return "<div style='text-align: right'>청구 합계</div>";
                    }
                }, {
                    title: "처리",
                    width: 100,
                    template: function(e){
                        if(e.ORG_YN == 'N'){
                            if(e.DOC_STATUS == "0"){
                                return "<button type='button' class='k-button k-button-md k-button-solid k-button-solid-error' onclick='purcInfo.fn_pjtPurcDel(" + e.PURC_SN + ")'>삭제</button>";
                            } else {
                                return "";
                            }
                        } else {
                            return "";
                        }
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(Math.round(purcSum))+"</div>";
                    }
                }, {
                    field: "APPROVE_STAT_CODE",
                    title: "결재상태",
                    width: 80,
                    template : function(e){
                        if(e.RE_STATUS == 'R'){
                            return '반려';
                        }

                        if(e.ORG_YN == 'N'){
                            if(e.PURC_SN != null) {
                                if(e.APPROVE_STAT_CODE == '0' || e.APPROVE_STAT_CODE == '40' || e.APPROVE_STAT_CODE == '60'){
                                    return '작성중';
                                } else if(e.APPROVE_STAT_CODE == '10' || e.APPROVE_STAT_CODE == '20' || e.APPROVE_STAT_CODE == '50') {
                                    return '결재중';
                                } else if(e.APPROVE_STAT_CODE == '30') {
                                    return '반려';
                                } else if(e.APPROVE_STAT_CODE == '100' || e.APPROVE_STAT_CODE == '101') {
                                    return '결재완료';
                                } else {
                                    return '-';
                                }
                            } else {
                                if(e.CLAIM_DOC_STATUS == '0' || e.CLAIM_DOC_STATUS == '40' || e.CLAIM_DOC_STATUS == '60'){
                                    return '작성중';
                                } else if(e.CLAIM_DOC_STATUS == '10' || e.CLAIM_DOC_STATUS == '20' || e.CLAIM_DOC_STATUS == '50') {
                                    return '결재중';
                                } else if(e.CLAIM_DOC_STATUS == '30') {
                                    return '반려';
                                } else if(e.CLAIM_DOC_STATUS == '100' || e.CLAIM_DOC_STATUS == '101') {
                                    return '결재완료';
                                } else {
                                    return '-';
                                }
                            }
                        } else {
                            return '-';
                        }
                    }
                }, {
                    field: "DOC_STATUS",
                    title: "상태",
                    width: 120,
                    template : function(e){
                        if(e.RE_STATUS == 'R'){
                            return '반려';
                        }

                        var status = "";
                        if(e.ORG_YN == 'N'){
                            /** 구매요청서 */
                            if(e.PURC_SN != null) {
                                if(e.DOC_STATUS == "0" || e.DOC_STATUS == "30" || e.DOC_STATUS == "40"){
                                    status = "구매요청작성중";
                                }else if(e.DOC_STATUS == "10" || e.DOC_STATUS == "20" || e.DOC_STATUS == "50"){
                                    status = "구매요청결재중";
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
                                        if(e.CLAIM_DOC_STATUS == "100" || e.CLAIM_DOC_STATUS == "101"){
                                            status = "구매청구완료";

                                            if(e.PAYMENT_METHOD == "A"){
                                                if(e.ORDER_DT != null && e.ORDER_DT != ""){
                                                    if(e.INSPECT_YN == "Y"){
                                                        if(e.INSPECT_STATUS != "100"){
                                                            status = "검수요청중";
                                                        }else{
                                                            status = "<div style='font-weight: bold'>검수승인완료</div>";
                                                        }
                                                    }
                                                } else {
                                                    status = "발주대기중";
                                                }
                                            } else {
                                                if(e.INSPECT_YN == "Y"){
                                                    if(e.INSPECT_STATUS != "100"){
                                                        status = "검수요청중";
                                                    }else{
                                                        status = "<div style='font-weight: bold'>검수승인완료</div>";
                                                    }
                                                }
                                            }
                                        }else if(e.CLAIM_DOC_STATUS == "0" ||e.CLAIM_DOC_STATUS == "30" || e.CLAIM_DOC_STATUS == "40"){
                                            status = "구매청구작성중";
                                        } else if(e.CLAIM_DOC_STATUS == "10" || e.CLAIM_DOC_STATUS == "20" || e.CLAIM_DOC_STATUS == "50"){
                                            status = "구매청구결재중";
                                        } else {
                                            status = '';
                                        }
                                    }
                                }
                            } else {
                                /** 구매청구서 */
                                if(e.CLAIM_STATUS == "CN"){
                                    status = "구매요청완료";
                                }else if(e.CLAIM_STATUS == "CAN"){
                                    status = "구매청구작성중";
                                }else if(e.CLAIM_STATUS == "CAYSN"){
                                    status = "구매청구작성중";
                                }else if(e.CLAIM_STATUS == "CAYSY"){
                                    if(e.CLAIM_DOC_STATUS == "100" || e.CLAIM_DOC_STATUS == "101"){
                                        status = "구매청구완료";

                                        if(e.PAYMENT_METHOD == "A"){
                                            if(e.ORDER_DT != null && e.ORDER_DT != ""){
                                                if(e.INSPECT_YN == "Y"){
                                                    status = "<div style='font-weight: bold'>검수승인완료</div>";
                                                }
                                            } else {
                                                status = "발주대기중";
                                            }
                                        } else {
                                            if(e.INSPECT_YN == "Y"){
                                                status = "<div style='font-weight: bold'>검수승인완료</div>";
                                            }
                                        }
                                    }else if(e.CLAIM_DOC_STATUS == "0" ||e.CLAIM_DOC_STATUS == "30" || e.CLAIM_DOC_STATUS == "40"){
                                        status = "구매청구작성중";
                                    } else if(e.CLAIM_DOC_STATUS == "10" || e.CLAIM_DOC_STATUS == "20" || e.CLAIM_DOC_STATUS == "50"){
                                        status = "구매청구결재중";
                                    } else {
                                        status = '';
                                    }
                                }
                            }
                        } else {
                            status = "이관 데이터";
                        }
                        return status
                    }
                }, /*{
                    field: "EXNP_STATUS",
                    title: "지출상태",
                    width: 80,
                    template: function (e) {
                        console.log(e);
                        var stat = "";
                        if(e.ORG_YN == 'N'){
                            if (e.INSPECT_YN == "Y" && e.INSPECT_STATUS == "100") {
                                if (e.PAY_DOC_STATUS == "100") {
                                    stat = "결재완료"
                                    if(e.ITEM_COUNT == e.EXNP_DOC_STATUS && e.EXNP_STATUS == e.EXNP_DOC_STATUS && e.EXNP_STATUS != 0 && e.RE_STAT == 'Y'){
                                        stat = "지출완료";
                                    } else if(e.ITEM_COUNT != e.EXNP_DOC_STATUS && e.EXNP_DOC_STATUS != 0){
                                        stat = "부분지출";
                                    } else if (e.EXNP_STATUS != 0){
                                        stat = "지출대기";
                                    }
                                } else if (e.PAY_DOC_STATUS == "10" || e.PAY_DOC_STATUS == "50") {
                                    stat = "결재중"
                                } else if (e.PAY_DOC_STATUS == "30") {
                                    stat = "반려"
                                } else {
                                    stat = "작성중"
                                }
                            } else {
                                stat = "-";
                            }
                        } else {
                            stat = "-";
                        }

                        return stat;
                    }
                }*/
                // , {
                //     title: "현장(카드)결제 청구",
                //     width: 130,
                //     template: function(e){
                //         if((e.APPROVE_STAT_CODE == '100' || e.APPROVE_STAT_CODE == '101') && e.PAYMENT_METHOD == "C"){
                //             if(e.CLAIM_STATUS == "CAYSY"){
                //                 return '<button type="button" class="k-button k-button-solid-info" onclick="purcInfo.fn_reqCliaming(' + e.CLAIM_SN + ', \''+e.PURC_SN+'\')">결재완료</button>';
                //             } else if(e.CLAIM_STATUS == "CAYSY"){
                //                 return '<button type="button" class="k-button k-button-solid-info" onclick="purcInfo.fn_reqCliaming(' + e.CLAIM_SN + ', \''+e.PURC_SN+'\')">결재중</button>';
                //             } else {
                //                 return '<button type="button" class="k-button k-button-solid-base" onclick="purcInfo.claimDrafting(' + e.PURC_SN + ')">청구서작성</button>';
                //             }
                //         } else {
                //             return '-';
                //         }
                //     }
                // }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
        var pageSizeDropDown = $("#purcInfoMainGrid").find(".k-pager-sizes select").data("kendoDropDownList");
        if (pageSizeDropDown) {
            pageSizeDropDown.select(function(dataItem) {
                return dataItem.value === "all";
            });
            pageSizeDropDown.trigger("change");
        }
    },

    mainGrid2: function (url, params) {
        $("#purcInfoMainGrid2").kendoGrid({
            dataSource: customKendo.fn_gridDataSourceAll(url, params, "ALL"),
            sortable: true,
            selectable: "row",
            height : 525,
            pageable: {
                refresh: true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount: 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            resizable : true,
            toolbar: [
                {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="purcInfo.fn_reqPayAppMultiPopup()">' +
                            '	<span class="k-button-text">지급신청</span>' +
                            '</button>';
                    }
                }, {
                    name : 'excel',
                    text: '엑셀다운로드'
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="purcInfo.mainGrid2Reload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }
            ],
            excel : {
                fileName : "구매 지급 목록.xlsx",
                filterable : true
            },
            excelExport: exportGrid,
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="clmCheckAll" name="clmCheckAll" onclick="fn_checkAll(\'clmCheckAll\', \'clm\');"/>',
                    width: 40,
                    template : function (e){
                        if(e.F_PAY_APP_SN == null){
                            return "<input type='checkbox' id='clm"+e.CLAIM_SN+"' claimExnpSn='"+e.CLAIM_EXNP_SN+"' name='clm' class='clm' value='"+e.CLAIM_SN+"'/>";
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
                    width: 50,
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
                    template : function(e) {
                        if(e.MNG_REQ_STAT == "Y") {
                            return e.F_EMP_NAME;
                        } else {
                            return e.PURC_EMP_NAME;
                        }
                    }

                }, {
                    field: "CLAIM_TITLE",
                    title: "제목",
                    width: 100
                }, {
                    field: "PURC_PURPOSE",
                    title: "목적",
                    width: 200,
                    template : function(e){
                        return '<a onclick="purcUserAppList.fn_reqClaiming(' + e.CLAIM_SN + ', '+e.PURC_SN+')">' + e.PURC_REQ_PURPOSE + '</a>'
                    }
                }, {
                    field: "CRM_NM",
                    title: "업체",
                    width: 120
                }, {
                    field: "DOC_NO",
                    title: "문서번호",
                    width: 100
                },{
                    field: "EXP_DE",
                    title: "결제예정일",
                    width: 80
                }, {
                    title: "지출금액",
                    width: 80,
                    template: function(e){
                        return '<div style="text-align: right">'+comma(e.REQ_AMT)+'</div>';
                    }
                }, {
                    field: "CLAIM_SN",
                    title: "상태",
                    width: 50,
                    template : function(e) {
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
                }, {
                    field: "F_PAY_APP_SN",
                    title : "지급신청",
                    width : 70,
                    template: function(e){
                        let buttonClass = "k-button k-button-solid-base";
                        if(e.F_PAY_APP_SN != null && e.F_DOC_STATUS != 0){
                            buttonClass = "k-button k-button-solid-info";
                        }
                        return '<button type="button" class="'+buttonClass+'" onClick="purcInfo.fn_reqPayAppPopup('+e.PURC_SN+', '+e.CLAIM_SN+', '+e.CLAIM_EXNP_SN+', '+e.F_PAY_APP_SN+')">지급신청</button>';
                    }
                }
            ],
            dataBinding: function () {
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");

        var pageSizeDropDown = $("#purcInfoMainGrid2").find(".k-pager-sizes select").data("kendoDropDownList");
        if (pageSizeDropDown) {
            pageSizeDropDown.select(function(dataItem) {
                return dataItem.value === "all";
            });
            pageSizeDropDown.trigger("change");
        }
    },

    subGrid: function(url, params){
        $("#purcInfoSubGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSourceAll(url, params, "ALL"),
            sortable: true,
            selectable: "row",
            height : 525,
            pageable: {
                refresh: true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount: 5,
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound: purcInfo.onDataBound,
            toolbar: [
                {
                    name : 'excel',
                    text: '엑셀다운로드'
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="purcInfo.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }
            ],
            excel : {
                fileName : "구매내역 목록.xlsx",
                filterable : true
            },
            excelExport: exportGrid,
            columns: [
                {
                    title: "번호",
                    width: 50,
                    template: "#= --record #"
                }, {
                    field: "ITEM_NM",
                    title: "품명",
                }, {
                    field: "ITEM_STD",
                    title: "규격",
                }, {
                    field: "ITEM_EA",
                    title: "수량",
                }, {
                    field: "ITEM_UNIT",
                    title: "단위",
                }, {
                    field: "ITEM_UNIT_AMT",
                    title: "단가",
                    template: function(row){
                        return fn_numberWithCommas(row.ITEM_UNIT_AMT);
                    }
                }, {
                    field: "CRM_NM",
                    title: "업체",
                }, {
                    field: "RMK",
                    title: "비고",
                }, {
                    field: "DOC_NO",
                    title: "문서번호",
                    width: 180,
                }, {
                    field: "STATUS",
                    title: "상태",
                    width: 120,
                    template : function(e){
                        var status = "구매청구완료";
                        /** 구매요청서 */
                        if(e.INSPECT_YN == "Y"){
                            if(e.INSPECT_STATUS != "100"){
                                status = "검수요청중";
                            }else{
                                status = "<div style='font-weight: bold'>검수승인완료</div>";
                            }
                        }
                        return status
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            },
        }).data("kendoGrid");

        var pageSizeDropDown = $("#purcInfoSubGrid").find(".k-pager-sizes select").data("kendoDropDownList");
        if (pageSizeDropDown) {
            pageSizeDropDown.select(function(dataItem) {
                return dataItem.value === "all";
            });
            pageSizeDropDown.trigger("change");
        }
    },

    fn_pjtPurcDel : function (purcSn){
        if(!confirm("삭제하시겠습니까?")){
            return;
        }
        var result = customKendo.fn_customAjax("/purc/delPurcReq.do", {purcSn : purcSn});

        if(result.flag){
            alert("삭제 되었습니다.");
            purcInfo.gridReload();
        }
    },

    fn_reqPurcRegPopup : function (key){
        var url = "/purc/pop/regPurcReqPop.do";
        if(key != null && key != ""){
            url = "/purc/pop/regPurcReqPop.do?purcSn=" + key;
            url = url + "&pjtSn=" + $("#pjtSn").val();
        } else {
            url = url + "?pjtSn=" + $("#pjtSn").val();
        }


        var name = "_blank";
        var option = "width = 1820, height = 820, top = 100, left = 600, location = no"
        var popup = window.open(url, name, option);
    },

    onDataBound : function(){
        purcSum = 0;

        var grid = this;
        grid.tbody.find("tr").each(function(){
            var delYn = $(this).find("input[name='reStat']").val();

            if(delYn == "R"){
                $(this).css('text-decoration', 'line-through');
                $(this).css('color', 'red');
            }
        });
    },

    fn_inspectionPopup : function(key, mod, claimKey){
        var url = "/purc/pop/purcInspectionPop.do";
        if(key != null && key != ""){
            url = "/purc/pop/purcInspectionPop.do?purcSn=" + key;
        } else {
            url = "/purc/pop/purcInspectionPop.do?claimSn=" + claimKey + "&mode=" + mod;
        }
        var name = "_blank";
        var option = "width = 1690, height = 820, top = 100, left = 400, location = no";
        var popup = window.open(url, name, option);
    },

    fn_reqRegPopup : function (key){
        var url = "/payApp/pop/regPayAppPop.do?purcSn=" + key + "&reqType=purc";
        var name = "regPayAppPop";
        var option = "width = 1700, height = 820, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    fn_reqPayAppPopup : function (purcSn, claimSn, claimExnpSn, payAppSn){

        var url = "/payApp/pop/regPayAppPop.do?purcSn=" + purcSn + "&claimSn=" + claimSn + "&claimExnpSn=" + claimExnpSn + "&reqType=claimExnp";

        if(payAppSn != "undefiend" && payAppSn != undefined && payAppSn != null){
            url = "/payApp/pop/regPayAppPop.do?payAppSn=" + payAppSn;
        }
        var name = "_blank";
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

    fn_reqCliaming : function(key, subKey) {
        var url = _contextPath_ + "/purc/pop/reqClaiming.do";

        if(key != null && key != ""){
            url = _contextPath_ + "/purc/pop/reqClaiming.do?claimSn=" + key;

            if(subKey != null && subKey != "" && subKey != "undefined"){
                url += "&purcSn=" + subKey;
            }
        }

        var name = "blank";
        var option = "width = 1540, height = 840, top = 100, left = 400, location = no";
        var popup = window.open(url, name, option);
    },

    claimDrafting : function(key){
        $.ajax({
            url : "/purc/setOnSiteCardPurcClaimData",
            data : { purcSn : key },
            type : "post",
            dataType : "json",
            async: false,
            success : function(rs){
                if(rs.code == 200){
                    var url = "/popup/cam_purc/approvalFormPopup/claimingApprovalPop.do?menuCd=purcClaim" + "&purcSn=" + key + "&claimSn=" + rs.params.claimSn + "&type=drafting";
                    var name = "_blank";
                    var option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=yes, scrollbars = yes, status=no, top=50, left=50"

                    pop = window.open(url, name, option);
                }
            }
        });
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

    fn_reqRegClaimPopup : function(key, stat){
        var url = "/purc/pop/regPurcReqPop.do";
        if(key != null && key != ""){
            url = "/purc/pop/regPurcReqPop.do?purcSn=" + key + "&stat=" + stat;
        }
        url += "&vType=M&auto=Y";
        var name = "_blank";
        var option = "width = 1820, height = 820, top = 100, left = 400, location = no";
        var popup = window.open(url, name, option);
    }
}

function gridReload(){
    purcInfo.mainGrid();
}