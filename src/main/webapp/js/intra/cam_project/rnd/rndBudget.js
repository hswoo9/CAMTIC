let calcAmSum = 0;
let acctAm2Sum = 0;
let acctAm1Sum = 0;
let acctAm3Sum = 0;
let subAmSum = 0;

var rndBg = {
    global : {
        saveAjaxData : "",
    },

    fn_defaultScript : function (){
        commonProject.setPjtStat();
        this.gridReload();
    },

    gridReload : function (){
        rndBg.global.searchAjaxData = {
            pjtCd : $("#mgtCd").val(),
        }

        $("#selectType").kendoRadioGroup({
            items: [
                { label : "지급 신청 리스트", value : "1" },
                { label : "지출 신청 리스트", value : "2" },
            ],
            layout : "horizontal",
            labelPosition : "after",
            value : "1",
            change : function(e){
                var idx = this.value();

                if(idx == 1){
                    $("#budgetMainGrid").css("display", "");
                    $("#budgetMainGrid2").css("display", "none");
                    $("#titleWrap").text("◎ 지급 신청 리스트")
                } else if (idx == 2){
                    $("#budgetMainGrid").css("display", "none");
                    $("#budgetMainGrid2").css("display", "");
                    $("#titleWrap").text("◎ 지출 신청 리스트")
                }
            }
        });

        rndBg.budgetMainGrid("/pay/getPaymentList", rndBg.global.searchAjaxData);
        rndBg.budgetMainGrid2("/pay/getExnpList", rndBg.global.searchAjaxData);
    },

    budgetMainGrid : function(url, params){
        $("#budgetMainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            sortable: true,
            selectable: "row",
            height: 525,
            pageable: {
                refresh: true,
                pageSizes: [ 10, 20, 30, 50, 100 ],
                buttonCount: 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            toolbar: [
                /*{
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="paymentList.fn_reqRegPopup()">' +
                            '	<span class="k-button-text">지급신청서 작성</span>' +
                            '</button>';
                    }
                },*/ {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="rndBg.gridReload()">' +
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
                    title: "문서유형",
                    width: 90,
                    template: function(e){
                        if(e.PAY_APP_TYPE == 1){
                            return "지급신청서";
                        } else if (e.PAY_APP_TYPE == 2){
                            return "여입신청서";
                        } else if(e.PAY_APP_TYPE == 3){
                            return "반납신청서";
                        } else if(e.PAY_APP_TYPE == 4){
                            return "대체신청서";
                        }
                    }
                }, {
                    field: "DOC_NO",
                    title: "문서번호",
                    width: 150,
                }, {
                    title: "신청건명",
                    field: "APP_TITLE",
                    width: 280,
                    template: function(e){
                        var status = "";
                        if(e.PAY_APP_TYPE == 1){
                            status = "rev";
                        } else if (e.PAY_APP_TYPE == 2){
                            status = "in";
                        } else if (e.PAY_APP_TYPE == 3){
                            status = "re";
                        } else if (e.PAY_APP_TYPE == 4){
                            status = "alt";
                        }
                        return '<div style="cursor: pointer; font-weight: bold" onclick="rndBg.fn_reqRegPopup('+e.PAY_APP_SN+', \''+status+'\', \'user\')">'+e.APP_TITLE+'</div>';
                    }
                }, {
                    title: "프로젝트 명",
                    field: "PJT_NM",
                    width: 240,
                    template: function(e){
                        var pjtNm = e.PJT_NM.toString().substring(0, 25);
                        return pjtNm;
                    }
                }, {
                    title: "신청자",
                    width: 70,
                    field: "EMP_NAME"
                }, {
                    title: "신청일",
                    width: 80,
                    field: "APP_DE",
                    template: function(e){

                        return new Date(e.REG_DT + 3240 * 10000).toISOString().split("T")[0];
                    }
                }, {
                    title: "지출요청일",
                    width: 80,
                    field: "REQ_DE",
                    template : function(e){
                        if(e.EXNP_ISS != null && e.EXNP_ISS != "" && e.EXNP_ISS != undefined){
                            return '<a href="javascript:alert(\''+e.EXNP_ISS+'\')" style="font-weight: bold">'+e.REQ_DE+'</a>';
                        } else {
                            return e.REQ_DE
                        }
                    }
                }, {
                    title: "지출예정일",
                    width: 80,
                    field: "PAY_EXNP_DE"
                }, {
                    title: "지출완료일",
                    width: 80,
                    field: "REQ_END_DE"
                },{
                    title: "지출금액",
                    width: 110,
                    template: function(e){
                        var cost = e.TOT_COST;
                        if(e.TOT_COST != null && e.TOT_COST != "" && e.TOT_COST != undefined){
                            return '<div style="text-align: right">'+comma(e.TOT_COST)+'</div>';
                        } else {
                            return '<div style="text-align: right">'+0+'</div>';
                        }
                    }
                }, {
                    title: "상태",
                    width: 70,
                    template : function(e){
                        console.log(e);
                        var stat = "";

                        if(e.REVERT_YN == "Y"){
                            stat = "반려";

                            return '<span onclick="javascript:alert(\''+e.REVERT_ISS+'\')" style="font-weight: bold; color: red; cursor: pointer">'+stat+'</span>';
                        }

                        if(e.DOC_STATUS == "100"){
                            stat = "결재완료"
                            if(e.EXNP_STATUS == e.EXNP_DOC_STATUS && e.EXNP_STATUS != 0 && e.EXNP_DOC_STATUS2 == 100){
                                stat = "지출완료";
                            } else if(e.EXNP_DOC_STATUS != e.EXNP_STATUS && e.EXNP_DOC_STATUS != 0){
                                stat = "부분지출";
                            } else if (e.EXNP_STATUS != 0){
                                stat = "지출대기";
                            }
                        } else if(e.DOC_STATUS == "10" || e.DOC_STATUS == "50"){
                            stat = "결재중"
                        } else if(e.DOC_STATUS == "30"){
                            stat = "반려"
                        } else {
                            stat = "작성중"
                        }

                        return stat;
                    }
                }, {
                    title : "삭제",
                    template : function(e){
                        if(e.REG_EMP_SEQ == $("#myEmpSeq").val()){
                            if(e.DOC_STATUS == 0){
                                return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="paymentList.fn_delReqReg('+e.PAY_APP_SN+', '+e.REG_EMP_SEQ+')">' +
                                    '	<span class="k-button-text">삭제</span>' +
                                    '</button>';
                            } else {
                                return "";
                            }
                        } else {
                            return "";
                        }
                    },
                    width: 60
                }, {
                    title : "결재선",
                    template : function(e){
                        if(e.REG_EMP_SEQ == $("#myEmpSeq").val()){
                            if(e.DOC_STATUS != 0){
                                return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="docApproveLineView('+e.DOC_ID+');">' +
                                    '	<span class="k-icon k-i-hyperlink-open-sm k-button-icon"></span>' +
                                    '</button>';
                            } else {
                                return "";
                            }
                        } else {
                            return "";
                        }
                    },
                    width: 60
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    budgetMainGrid2 : function(url, params){
        $("#budgetMainGrid2").kendoGrid({
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="rndBg.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }],
            columns: [
                {
                    title: "번호",
                    width: 40,
                    template: "#= --record #"
                }, {
                    title: "문서유형",
                    width: 70,
                    template: function(e){
                        if(e.EVI_TYPE == 1){
                            return "세금계산서";
                        } else if (e.EVI_TYPE == 2){
                            return "계산서";
                        } else if(e.EVI_TYPE == 3){
                            return "신용카드";
                        } else if(e.EVI_TYPE == 4){
                            return "직원지급";
                        } else if(e.EVI_TYPE == 5){
                            return "소득신고자";
                        } else {
                            return "기타";
                        }
                    }
                }, {
                    field: "DOC_NO",
                    title: "문서번호",
                    width: 120,
                }, {
                    title: "적요",
                    field: "EXNP_BRIEFS",
                    width: 250,
                    template: function(e){
                        return '<div style="cursor: pointer; font-weight: bold" onclick="rndBg.fn_reqRegExnpPopup('+e.EXNP_SN+', \''+e.PAY_APP_SN+'\', \'rev\')">'+e.EXNP_BRIEFS+'</div>';
                    }
                }, {
                    title: "프로젝트 명",
                    field: "PJT_NM",
                    width: 210,
                    template: function (e){
                        return e.PJT_NM;
                    }
                }, {
                    title: "세출과목",
                    field: "BUDGET_NM_EX",
                    width: 210
                }, {
                    title: "신청일",
                    width: 70,
                    field: "REG_DT",
                    template: function(e){
                        return new Date(e.REG_DT + 3240 * 10000).toISOString().split("T")[0];
                    }
                }, {
                    title: "지출요청일",
                    width: 70,
                    field: "REQ_DE"
                }, {
                    title: "지출예정일",
                    width: 70,
                    field: "PAY_EXNP_DE"
                }, {
                    title: "지출완료일",
                    width: 70,
                    field: "REQ_END_DE"
                }, {
                    title: "지출금액",
                    width: 80,
                    template: function(e){
                        var cost = e.TOT_COST;
                        if(e.TOT_COST != null && e.TOT_COST != "" && e.TOT_COST != undefined){
                            return '<div style="text-align: right">'+comma(e.TOT_COST)+'</div>';
                        } else {
                            return '<div style="text-align: right">'+0+'</div>';
                        }
                    }
                }, {
                    title: "결의상태",
                    width: 60,
                    template: function(e){
                        var status = "";
                        if(e.DOC_STATUS == "100"){
                            status = "결재완료";
                        } else if(e.DOC_STATUS == "10" || e.DOC_STATUS == "50"){
                            status = "결재중"
                        } else {
                            status = "작성중"
                        }

                        return status;
                    }
                }, {
                    title: "승인상태",
                    width: 60,
                    template: function(e){
                        var status = "";
                        if(e.DOC_STATUS == "100"){
                            status = "결재완료";
                            if(e.REQ_END_DE != null && e.REQ_END_DE != "" && e.REQ_END_DE != undefined){
                                status = "승인";
                            } else {
                                if(e.EVI_TYPE == 1 || e.EVI_TYPE == 2 || e.EVI_TYPE == 3){
                                    status = "승인";
                                } else {
                                    status = "미결";
                                }
                            }
                        } else {
                            status = "미결";
                        }

                        return status;
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    fn_reqRegPopup : function(key, status, auth){
        var url = "/payApp/pop/regPayAppPop.do";
        if(key != null && key != ""){
            url = "/payApp/pop/regPayAppPop.do?payAppSn=" + key;
        }
        if(status != null && status != ""){
            url += "&status=" + status;
        }
        if(auth != null && auth != ""){
            url += "&auth=" + auth;
        }
        var name = "_blank";
        var option = "width = 1700, height = 820, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    fn_reqRegExnpPopup : function (key, paySn, status){
        var url = "/payApp/pop/regExnpPop.do";
        if(key != null && key != ""){
            url = "/payApp/pop/regExnpPop.do?payAppSn=" + paySn + "&exnpSn=" + key;
        }

        if(status != null && status != ""){
            url = url + "&status=" + status;
        }
        var name = "_blank";
        var option = "width = 1700, height = 820, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    onDataBound : function(){
        calcAmSum = 0;
        acctAm2Sum = 0;
        acctAm1Sum = 0;
        acctAm3Sum = 0;
        subAmSum = 0;
    }
}