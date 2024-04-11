var prm = {

    global : {
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : ""
    },

    fn_defaultScript : function(){

        prm.global.dropDownDataSource = [
            { text: "내 구매만 조회", value: "empDept" },
        ]
        customKendo.fn_dropDownList("searchDept", prm.global.dropDownDataSource, "text", "value");
        $("#searchDept").data("kendoDropDownList").value("empDept");
        $("#searchDept").data("kendoDropDownList").bind("change", prm.gridReload);

        prm.global.dropDownDataSource = [
            { text: "문서번호", value: "DOC_NO" },
            { text: "목적", value: "PURC_REQ_PURPOSE" },
            { text: "품명", value: "PURC_ITEM_NAME" },
        ]

        customKendo.fn_dropDownList("searchKeyword", prm.global.dropDownDataSource, "text", "value");
        customKendo.fn_textBox(["searchValue"]);

        prm.global.dropDownDataSource = [
            { text: "검수 미작성", value: "1" },
            { text: "검수 작성 및 미승인", value: "2" },
            { text: "검수 작성 및 승인", value: "3" }
        ]

        customKendo.fn_dropDownList("inspectStat", prm.global.dropDownDataSource, "text", "value");
        $("#inspectStat").data("kendoDropDownList").bind("change", prm.gridReload);
        prm.gridReload();
    },

    mainGrid : function(url, params){
        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            sortable: true,
            selectable: "row",
            pageable: {
                refresh: true,
                pageSizes: [ 10, 20, 30, 50, 100, "ALL"],
                buttonCount: 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            toolbar: [
                {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="prm.fn_reqRegPopup()">' +
                            '	<span class="k-button-text">구매요청서 작성</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="prm.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }],
            columns: [
                // {
                //     title: "번호",
                //     width: 50,
                //     template: "#= --record #"
                // }, {
                //     title: "문서번호",
                //     field: "DOC_NO",
                //     width: 180,
                // }, {
                //     field: "PURC_REQ_DATE",
                //     title: "요청일",
                //     width: 100,
                //     template : function(e){
                //         return e.PURC_REQ_DATE.replaceAll(". ", "-");
                //     }
                // }, {
                //     title: "요청자",
                //     field: "EMP_NAME_KR",
                //     width: 100
                // }, {
                //     title: "목적",
                //     field: "PURC_REQ_PURPOSE",
                //     template : function(e){
                //         return '<div style="text-align: left"><a onclick="prm.fn_reqRegPopup(' + e.PURC_SN + ')">' + e.PURC_REQ_PURPOSE + '</a></div>'
                //     }
                // }, {
                //     title: "구매",
                //     width: 80,
                //     template : function(e){
                //         return e.CP_CNT + "건 / " + '<span style="color:red;">'+e.RP_CNT+'</span>' + "건"
                //     }
                // }, {
                //     title: "상태",
                //     field: "STATUS",
                //     width: 100,
                //     template : function(e){
                //         var status = "";
                //         /** 구매요청서 */
                //         if(e.DOC_STATUS == "0"){
                //             status = "구매요청작성중";
                //         }else if(e.DOC_STATUS != "100" && e.DOC_STATUS != "101"){
                //             status = "구매요청작성중";
                //         }else if(e.DOC_STATUS == "100" || e.DOC_STATUS == "101"){
                //             status = "구매요청완료";
                //
                //             /** 구매청구서 */
                //             if(e.CLAIM_STATUS == "CN"){
                //                 status = "구매요청완료";
                //             }else if(e.CLAIM_STATUS == "CAN"){
                //                 status = "구매청구작성중";
                //             }else if(e.CLAIM_STATUS == "CAYSN"){
                //                 status = "구매청구작성중";
                //             }else if(e.CLAIM_STATUS == "CAYSY"){
                //                 status = "구매청구완료";
                //             }
                //
                //             if(e.PAYMENT_METHOD == "A"){
                //                 if(e.ORDER_DT != null && e.ORDER_DT != ""){
                //                     if(e.INSPECT_YN == "Y"){
                //                         if(e.INSPECT_STATUS != "100"){
                //                             status = "검수요청중";
                //                         }else{
                //                             status = "<div style='font-weight: bold'>검수승인완료</div>";
                //                         }
                //                     }
                //                 } else {
                //                     status = "발주대기중";
                //                 }
                //             } else {
                //                 if(e.INSPECT_YN == "Y"){
                //                     if(e.INSPECT_STATUS != "100"){
                //                         status = "검수요청중";
                //                     }else{
                //                         status = "<div style='font-weight: bold'>검수승인완료</div>";
                //                     }
                //                 }
                //             }
                //
                //         }
                //         return status
                //     }
                // }, {
                //     title: "지출상태",
                //     width: 80,
                //     template : function(e){
                //         console.log(e);
                //         var stat = "";
                //         if(e.INSPECT_YN == "Y" && e.INSPECT_STATUS == "100"){
                //             if(e.PAY_DOC_STATUS == "100"){
                //                 stat = "결재완료"
                //                 if(e.EXNP_STATUS == e.EXNP_DOC_STATUS && e.EXNP_STATUS != 0){
                //                     stat = "지출완료";
                //                 } else if(e.EXNP_DOC_STATUS != e.EXNP_STATUS && e.EXNP_DOC_STATUS != 0){
                //                     stat = "부분지출";
                //                 } else if (e.EXNP_STATUS != 0){
                //                     stat = "지출대기";
                //                 }
                //             } else if(e.PAY_DOC_STATUS == "10" || e.PAY_DOC_STATUS == "50"){
                //                 stat = "결재중"
                //             } else if(e.PAY_DOC_STATUS == "30"){
                //                 stat = "반려"
                //             } else {
                //                 stat = "작성중"
                //             }
                //         } else {
                //             stat = "-";
                //         }
                //
                //         return stat;
                //     }
                // }, {
                //     title: "검수",
                //     field: "STATUS",
                //     width: 60,
                //     template : function(e){
                //         /** 구매청구서 작성시 검수 버튼 생성*/
                //         let html = "";
                //         if(e.PAYMENT_METHOD == "A"){
                //             if(e.ORDER_DT != null && e.ORDER_DT != ""){
                //                 if(e.CLAIM_STATUS == "CAYSY"){
                //                     if(e.INSPECT_STATUS != "100"){
                //                         html += '<button type="button" class="k-button k-button-solid-base" onclick="prm.fn_inspectionPopup(' + e.PURC_SN + ')">검수</button>';
                //                     }else{
                //                         html += '<button type="button" class="k-button k-button-solid-info" onclick="prm.fn_inspectionPopup(' + e.PURC_SN + ')">검수</button>';
                //
                //                         status = "-";
                //                     }
                //                 }else{
                //                     html += "-"
                //                 }
                //             } else {
                //                 html += "-"
                //             }
                //         } else {
                //             if(e.CLAIM_STATUS == "CAYSY"){
                //                 if(e.INSPECT_STATUS != "100"){
                //                     html += '<button type="button" class="k-button k-button-solid-base" onclick="prm.fn_inspectionPopup(' + e.PURC_SN + ')">검수</button>';
                //                 }else{
                //                     html += '<button type="button" class="k-button k-button-solid-info" onclick="prm.fn_inspectionPopup(' + e.PURC_SN + ')">검수</button>';
                //
                //                     status = "-";
                //                 }
                //             }else{
                //                 html += "-"
                //             }
                //         }
                //
                //         return html;
                //     }
                // }, {
                //     title: "처리",
                //     width: 60,
                //     template : function(e){
                //         /** 구매요청서 작성시 삭제 버튼 생성*/
                //         let html = "";
                //         if(e.DOC_STATUS == "0" || e.DOC_STATUS == "30" || e.DOC_STATUS == "40"){
                //             html += '<button type="button" class="k-button k-button-solid-error" onclick="prm.fn_delete(' + e.PURC_SN + ')">삭제</button>';
                //         }else{
                //             html += "-"
                //         }
                //         return html;
                //     }
                // }, {
                //     title: "결재상태",
                //     width: 80,
                //     template : function(e){
                //         if(e.APPROVE_STAT_CODE == '0' || e.APPROVE_STAT_CODE == '40' || e.APPROVE_STAT_CODE == '60'){
                //             return '작성중';
                //         } else if(e.APPROVE_STAT_CODE == '10' || e.APPROVE_STAT_CODE == '20' || e.APPROVE_STAT_CODE == '50') {
                //             return '결재중';
                //         } else if(e.APPROVE_STAT_CODE == '30') {
                //             return '반려';
                //         } else if(e.APPROVE_STAT_CODE == '100' || e.APPROVE_STAT_CODE == '101') {
                //             return '결재완료';
                //         } else {
                //             return '-';
                //         }
                //     }
                // }, {
                //     title: "현장(카드)결제 청구",
                //     width: 130,
                //     template: function(e){
                //         if((e.APPROVE_STAT_CODE == '100' || e.APPROVE_STAT_CODE == '101') && e.PAYMENT_METHOD == "C"){
                //             if(e.CLAIM_STATUS == "CAYSY"){
                //                 return '<button type="button" class="k-button k-button-solid-info" onclick="prm.fn_reqCliaming(' + e.CLAIM_SN + ', \''+e.PURC_SN+'\')">결재완료</button>';
                //             } else if(e.CLAIM_STATUS == "CAYSY"){
                //                 return '<button type="button" class="k-button k-button-solid-info" onclick="prm.fn_reqCliaming(' + e.CLAIM_SN + ', \''+e.PURC_SN+'\')">결재중</button>';
                //             } else {
                //                 return '<button type="button" class="k-button k-button-solid-base" onclick="prm.claimDrafting(' + e.PURC_SN + ')">청구서작성</button>';
                //             }
                //         } else {
                //             return '-';
                //         }
                //     }
                // }
                {
                    title: "번호",
                    width: 50,
                    template: "#= --record #"
                }, {
                    title: "문서번호",
                    field: "DOC_NO",
                    width: 120,
                }, {
                    field: "PURC_REQ_DATE",
                    title: "요청일",
                    width: 100,
                }, {
                    title: "요청자",
                    field: "EMP_NAME_KR",
                    width: 80
                }, {
                    title: "프로젝트",
                    field: "PJT_NM",
                    width: 120
                }, {
                    title: "목적",
                    field: "PURC_REQ_PURPOSE",
                    template : function(e){
                        return e.PURC_REQ_PURPOSE
                    }
                }, {
                    title: "구매요청서",
                    field: "STATUS",
                    width: 100,
                    template : function(e){
                        var status = "";
                        /** 구매요청서 */
                        if(e.DOC_STATUS == "100"){
                            status = '<button type="button" class="k-button k-button-solid-info" onclick="prm.fn_reqPurcRegPopup(' + e.PURC_SN + ')">구매요청서</button>';
                        } else {
                            status = '<button type="button" class="k-button k-button-solid-base" onclick="prm.fn_reqPurcRegPopup(' + e.PURC_SN + ')">구매요청서</button>';
                        }

                        return status
                    }
                }, {
                    title: "구매청구서",
                    width: 100,
                    template: function(e){
                        var status = "";
                        /** 구매요청서 */
                        if(e.CLAIM_DOC_STATUS == "100"){
                            status = '<button type="button" class="k-button k-button-solid-info" onclick="approveDocView(' + e.CLAIM_DOC_ID + ', \''+e.APPRO_KEY+'\', \'claim\')">구매청구서</button>';
                        } else {
                            if(e.PAYMENT_METHOD == "C"){
                                if(e.CLAIM_SN != ""){
                                    status = '<button type="button" class="k-button k-button-solid-base" onclick="prm.fn_reqClaiming(' + e.CLAIM_SN + ', \''+e.PURC_SN+'\')">구매청구서</button>';
                                } else {
                                    if(e.DOC_STATUS == 100 || e.DOC_STATUS == 101){
                                        status = '<button type="button" class="k-button k-button-solid-base" onclick="prm.fn_reqRegClaimPopup('+e.PURC_SN+', \'v\')">구매청구서</button>';
                                    } else {
                                        status = '';
                                    }
                                }
                            } else {
                                status = '';
                            }
                        }

                        return status
                    }
                }, {
                    title: "검수",
                    field: "STATUS",
                    width: 70,
                    template: function (e) {
                        var status = "";
                        if (e.CLAIM_STATUS == "CAYSY") {
                            if (e.ORDER_DT != "" && e.ORDER_DT != null && e.ORDER_DT != undefined) {
                                if (e.INSPECT_STATUS != "100") {
                                    status = '<button type="button" class="k-button k-button-solid-base" onclick="prm.fn_inspectionPopup(' + e.PURC_SN + ')">검수</button>';
                                } else {
                                    status = '<button type="button" class="k-button k-button-solid-info" onclick="prm.fn_inspectionPopup(' + e.PURC_SN + ')">검수</button>';
                                }
                            } else {
                                if ((e.CLAIM_DOC_STATUS == '100' || e.CLAIM_DOC_STATUS == '101')) {
                                    if(e.PAYMENT_METHOD == "C" || e.PAYMENT_METHOD == "I") {
                                        if (e.INSPECT_STATUS != "100") {
                                            status = '<button type="button" class="k-button k-button-solid-base" onclick="prm.fn_inspectionPopup(' + e.PURC_SN + ')">검수</button>';
                                        } else {
                                            status = '<button type="button" class="k-button k-button-solid-info" onclick="prm.fn_inspectionPopup(' + e.PURC_SN + ')">검수</button>';
                                        }
                                    }
                                }
                            }
                        }

                        return status
                    }
                }, {
                    title: "업체",
                    width: 150,
                    field : "CRM_NM"
                }, {
                    title: "금액",
                    width: 100,
                    template: function(e){
                        console.log(e)
                        return "<div style='text-align: right'>"+comma(e.PURC_ITEM_AMT_SUM)+"</div>";
                    }
                }, {
                    title: "처리",
                    width: 70,
                    template: function(e){
                        if(e.DOC_STATUS == "0"){
                            return "<button type='button' class='k-button k-button-md k-button-solid k-button-solid-error' onclick='prm.fn_pjtPurcDel(" + e.PURC_SN + ")'>삭제</button>";
                        } else {
                            return "";
                        }
                    }
                }, {
                    title: "결재상태",
                    width: 70,
                    template : function(e){
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
                    }
                }, {
                    title: "상태",
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

                        }
                        return status
                    }
                }, {
                    title: "지출상태",
                    width: 80,
                    template: function (e) {
                        var stat = "";
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

                        return stat;
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    gridReload : function(){
        prm.global.searchAjaxData = {
            empSeq : $("#myEmpSeq").val(),
            searchDept : $("#searchDept").val(),
            searchKeyword : $("#searchKeyword").val(),
            searchValue : $("#searchValue").val(),
            inspectStat : $("#inspectStat").data("kendoDropDownList").value()
        }

        prm.mainGrid("/purc/getPurcReqClaimEmpList", prm.global.searchAjaxData);
    },

    fn_reqRegPopup : function(key){
        var url = "/purc/pop/regPurcReqPop.do";
        if(key != null && key != ""){
            url = "/purc/pop/regPurcReqPop.do?purcSn=" + key;
        }
        var name = "blank";
        var option = "width = 1820, height = 820, top = 100, left = 400, location = no";;
        var popup = window.open(url, name, option);
    },

    fn_inspectionPopup : function(key){
        var url = "/purc/pop/purcInspectionPop.do";
        if(key != null && key != ""){
            url = "/purc/pop/purcInspectionPop.do?purcSn=" + key;
        }
        var name = "blank";
        var option = "width = 1690, height = 820, top = 100, left = 400, location = no";
        var popup = window.open(url, name, option);
    },

    fn_delete : function(purcSn){
        if(!confirm("정말 삭제하시겠습니까?")){return;}

        const result = customKendo.fn_customAjax("/purc/delPurcReq.do", {purcSn: purcSn});
        if(result.flag){
            alert("삭제되었습니다.");
            prm.gridReload();
        }
    },

    fn_reqCliaming : function(key, subKey) {
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

    claimDrafting : function(key){
        $.ajax({
            url : "/purc/setOnSiteCardPurcClaimData",
            data : { purcSn : key },
            type : "post",
            dataType : "json",
            async: false,
            success : function(rs){
                if(rs.code == 200){
                    var url = getContextPath() + "/popup/cam_purc/approvalFormPopup/claimingApprovalPop.do?menuCd=purcClaim" + "&purcSn=" + key + "&claimSn=" + rs.params.claimSn + "&type=drafting";
                    var name = "_blank";
                    var option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=yes, scrollbars = yes, status=no, top=50, left=50"

                    pop = window.open(url, name, option);
                }
            }
        });
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

    fn_reqRegClaimPopup : function(key, stat){
        var url = "/purc/pop/regPurcReqPop.do";
        if(key != null && key != ""){
            url = "/purc/pop/regPurcReqPop.do?purcSn=" + key + "&stat=" + stat;
        }
        url += "&vType=M&auto=Y";
        var name = "_blank";
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
        var option = "width = 1540, height = 840, top = 100, left = 400, location = no";
        var popup = window.open(url, name, option);
    },





}