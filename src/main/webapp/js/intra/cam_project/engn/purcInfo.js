let purcSum = 0;

var purcInfo = {

    global : {
        saveAjaxData : "",
    },

    fn_defaultScript : function(){
        commonProject.setPjtStat();
        this.gridReload();
    },

    gridReload: function (){
        purcInfo.global.searchAjaxData = {
            empSeq : $("#loginEmpSeq").val(),
            pjtSn : $("#pjtSn").val(),
            searchKeyword : $("#searchKeyword").val(),
            searchValue : $("#searchValue").val(),
            camProject: "Y",
        }

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
                    $("#purcTitleWrap").text("◎ 구매 리스트")
                    $("#mainGrid1Wrap").show();
                } else if (idx == 2){
                    $("#purcInfoMainGrid").css("display", "none");
                    $("#purcInfoMainGrid2").css("display", "");
                    $("#purcTitleWrap").text("◎ 구매 지급 리스트");
                    $("#mainGrid1Wrap").hide();
                }
            }
        });

        purcInfo.mainGrid("/purc/getPurcReqClaimList.do", purcInfo.global.searchAjaxData);
        purcInfo.mainGrid2("/purc/getUserPurcAppList", purcInfo.global.searchAjaxData);
        purcInfo.subGrid("/purc/getPjtPurcItemList", purcInfo.global.searchAjaxData);
    },

    mainGrid2Reload: function(){
        purcInfo.mainGrid2("/purc/getUserPurcAppList", purcInfo.global.searchAjaxData);
    },

    mainGrid: function(url, params){
        $("#purcInfoMainGrid").kendoGrid({
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
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="purcInfo.gridReload()">' +
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
                    width: 180,
                }, {
                    field: "PURC_REQ_DATE",
                    title: "요청일",
                    width: 100,
                }, {
                    title: "요청자",
                    field: "EMP_NAME_KR",
                    width: 80,
                    footerTemplate: function(){
                        return "<div style='text-align: right'>투자금액</div>";
                    }
                }, {
                    title: "목적",
                    field: "PURC_REQ_PURPOSE",
                    template : function(e){
                        return '<input type="hidden" id="reStat" value="'+e.RE_STATUS+'" />'+ e.PURC_REQ_PURPOSE
                    },
                    footerTemplate: function(){
                        const list = customKendo.fn_customAjax("/project/getTeamInvList", {pjtSn: $("#pjtSn").val()}).list;
                        let invSum = 0;
                        for(let i=0; i<list.length; i++){
                            invSum += Number(list[i].EST_TOT_AMT);
                        }
                        return "<div style='text-align: right'>"+comma(invSum)+"</div>";
                    }
                }, {
                    title: "구매요청서",
                    field: "STATUS",
                    width: 100,
                    template : function(e){
                        var status = "";
                        if(e.ORG_YN == 'N'){
                            /** 구매요청서 */
                            if(e.DOC_STATUS == "100"){
                                status = '<button type="button" class="k-button k-button-solid-info" onclick="purcInfo.fn_reqPurcRegPopup(' + e.PURC_SN + ')">구매요청서</button>';
                            } else {
                                status = '<button type="button" class="k-button k-button-solid-base" onclick="purcInfo.fn_reqPurcRegPopup(' + e.PURC_SN + ')">구매요청서</button>';
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
                    title: "구매청구서",
                    width: 100,
                    template: function(e){
                        var status = "";
                        if(e.ORG_YN == 'N'){
                            /** 구매요청서 */
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

                        const leftList = customKendo.fn_customAjax("/purc/getProjectPurcReqList", {pjtSn: $("#pjtSn").val()}).list;
                        let purcSum2 = 0;
                        let leftSum = 0;
                        for(let i=0; i<leftList.length; i++){
                            purcSum2 += Number(leftList[i].PURC_ITEM_AMT);
                        }
                        leftSum = invSum - purcSum2;
                        return "<div style='text-align: right'>"+comma(leftSum)+"</div>";
                    }
                }, {
                    title: "업체명",
                    field: "CRM_NM",
                    width: 70
                }, {
                    title: "검수",
                    field: "STATUS",
                    width: 70,
                    template: function (e) {
                        /** 구매청구서 작성시 검수 버튼 생성*/
                        let html = "";
                        if(e.ORG_YN == 'N'){
                            if(e.PAYMENT_METHOD == "A"){
                                if(e.ORDER_DT != null && e.ORDER_DT != ""){
                                    if(e.CLAIM_STATUS == "CAYSY"){
                                        if(e.CLAIM_DOC_STATUS == "100" || e.CLAIM_DOC_STATUS == "101") {
                                            if(e.INSPECT_STATUS != "100"){
                                                html = '<button type="button" class="k-button k-button-solid-base" onclick="purcInfo.fn_inspectionPopup(' + e.PURC_SN + ')">검수</button>';
                                            }else{
                                                html = '<button type="button" class="k-button k-button-solid-info" onclick="purcInfo.fn_inspectionPopup(' + e.PURC_SN + ')">검수</button>';

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
                                        if(e.INSPECT_STATUS != "100"){
                                            html = '<button type="button" class="k-button k-button-solid-base" onclick="purcInfo.fn_inspectionPopup(' + e.PURC_SN + ')">검수</button>';
                                        }else{
                                            html = '<button type="button" class="k-button k-button-solid-info" onclick="purcInfo.fn_inspectionPopup(' + e.PURC_SN + ')">검수</button>';
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
                    title: "금액",
                    width: 100,
                    template: function(e){
                        console.log(e)
                        purcSum  += Number(e.PURC_ITEM_AMT_SUM);
                        return "<div style='text-align: right'>"+comma(e.PURC_ITEM_AMT_SUM)+"</div>";
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
                        return "<div style='text-align: right'>"+comma(purcSum)+"</div>";
                    }
                }, {
                    title: "결재상태",
                    width: 80,
                    template : function(e){
                        if(e.RE_STATUS == 'R'){
                            return '반려';
                        }

                        if(e.ORG_YN == 'N'){
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
                            return '-';
                        }
                    }
                }, {
                    title: "상태",
                    width: 120,
                    template : function(e){
                        if(e.RE_STATUS == 'R'){
                            return '반려';
                        }

                        var status = "";
                        if(e.ORG_YN == 'N'){
                            /** 구매요청서 */
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
                            status = "이관 데이터";
                        }
                        return status
                    }
                }, {
                    title: "지출상태",
                    width: 80,
                    template: function (e) {
                        console.log(e);
                        var stat = "";
                        if(e.ORG_YN == 'N'){
                            if (e.INSPECT_YN == "Y" && e.INSPECT_STATUS == "100") {
                                if (e.PAY_DOC_STATUS == "100") {
                                    stat = "결재완료"
                                    if (e.EXNP_STATUS == e.EXNP_DOC_STATUS && e.EXNP_STATUS != 0) {
                                        stat = "지출완료";
                                    } else if (e.EXNP_DOC_STATUS != e.EXNP_STATUS && e.EXNP_DOC_STATUS != 0) {
                                        stat = "부분지출";
                                    } else if (e.EXNP_STATUS != 0) {
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
                }
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
    },

    mainGrid2: function (url, params) {
        $("#purcInfoMainGrid2").kendoGrid({
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="purcInfo.fn_reqPayAppMultiPopup()">' +
                            '	<span class="k-button-text">지급신청</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="purcInfo.mainGrid2Reload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }],
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="clmCheckAll" name="clmCheckAll" onclick="fn_checkAll(\'clmCheckAll\', \'clm\');"/>',
                    width: 40,
                    template : function (e){
                        return "<input type='checkbox' id='clm"+e.CLAIM_SN+"' claimExnpSn='"+e.CLAIM_EXNP_SN+"' name='clm' class='clm' value='"+e.CLAIM_SN+"'/>";
                    }
                }, {
                    title: "번호",
                    width: 40,
                    template: "#= --record #"
                }, {
                    title: "요청부서",
                    field: "DEPT_NAME",
                    width: 120,
                }, {
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
                    title: "담당자",
                    field: "F_EMP_NAME",
                    width: 60
                }, {
                    title: "제목",
                    field: "CLAIM_TITLE",
                    width: 100
                }, {
                    title: "목적",
                    field: "PURC_PURPOSE",
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
                        return '<div style="text-align: right">'+comma(e.REQ_AMT)+'</div>';
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
                {
                    title: "상태",
                    width: 50,
                    template : function(e) {
                        // return '<button type="button" class="k-button k-button-solid-base" onClick="purcUserAppList.fn_regPayAttPop('+e.PURC_SN+', '+e.CLAIM_SN+')">첨부</button>';

                        return "미지급";
                    }
                }, {
                    title : "지급신청",
                    width : 70,
                    template: function(e){
                        // if(e.PURC_TYPE == 'R' || e.PURC_TYPE == 'S'){
                        //     if($("#loginEmpSeq").val() == e.REG_EMP_SEQ){
                        //         return '<button type="button" class="k-button k-button-solid-base" onClick="purcInfo.fn_reqPayAppPopup('+e.PURC_SN+', '+e.CLAIM_SN+', '+e.CLAIM_EXNP_SN+', '+e.F_PAY_APP_SN+')">지급신청</button>';
                        //     } else {
                        //         return '';
                        //     }
                        // } else {
                        //     if($("#loginEmpSeq").val() == e.F_EMP_SEQ){
                        //         return '<button type="button" class="k-button k-button-solid-base" onClick="purcInfo.fn_reqPayAppPopup('+e.PURC_SN+', '+e.CLAIM_SN+', '+e.CLAIM_EXNP_SN+', '+e.F_PAY_APP_SN+')">지급신청</button>';
                        //     } else {
                        //         return '';
                        //     }
                        // }
                        return '<button type="button" class="k-button k-button-solid-base" onClick="purcInfo.fn_reqPayAppPopup('+e.PURC_SN+', '+e.CLAIM_SN+', '+e.CLAIM_EXNP_SN+', '+e.F_PAY_APP_SN+')">지급신청</button>';
                    }
                }
            ],
            dataBinding: function () {
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    subGrid: function(url, params){
        $("#purcInfoSubGrid").kendoGrid({
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
            dataBound: purcInfo.onDataBound,
            toolbar: [
                {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="purcInfo.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }
            ],
            columns: [
                {
                    title: "번호",
                    width: 50,
                    template: "#= --record #"
                }, {
                    title: "품명",
                    field: "ITEM_NM",
                }, {
                    title: "규격",
                    field: "ITEM_STD",
                }, {
                    title: "수량",
                    field: "ITEM_EA",
                }, {
                    title: "단위",
                    field: "ITEM_UNIT",
                }, {
                    title: "단가",
                    field: "ITEM_UNIT_AMT",
                    template: function(row){
                        return fn_numberWithCommas(row.ITEM_UNIT_AMT);
                    }
                }, {
                    title: "업체",
                    field: "CRM_NM",
                }, {
                    title: "비고",
                    field: "RMK",
                }, {
                    title: "문서번호",
                    field: "DOC_NO",
                    width: 180,
                }, {
                    title: "상태",
                    field: "STATUS",
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
            }
        }).data("kendoGrid");
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

    fn_inspectionPopup : function(key){
        var url = "/purc/pop/purcInspectionPop.do";
        if(key != null && key != ""){
            url = "/purc/pop/purcInspectionPop.do?purcSn=" + key;
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