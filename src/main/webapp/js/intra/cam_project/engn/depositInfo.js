var depoInfo = {

    global : {
        saveAjaxData : "",
    },

    fn_defaultScript : function(){
        commonProject.setPjtStat();
        this.gridReload();
    },

    gridReload: function (){
        depoInfo.global.searchAjaxData = {
            empSeq : $("#loginEmpSeq").val(),
            pjtSn : $("#pjtSn").val(),
            searchKeyword : $("#searchKeyword").val(),
            searchValue : $("#searchValue").val()
        }

        depoInfo.mainGrid("/project/getDepositList", depoInfo.global.searchAjaxData);
    },

    mainGrid: function(url, params){
        $("#depositMainGrid").kendoGrid({
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
            dataBound: depoInfo.onDataBound,
            toolbar: [
                {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="depoInfo.fn_reqRegPopup()">' +
                            '	<span class="k-button-text">입금처리 요청서 작성</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="depoInfo.gridReload()">' +
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
                    title: "구분",
                    width: 180,
                    template: function(e){
                        var gubun = "";
                        if(e.GUBUN == "a"){
                            gubun = "청구";
                        }else if(e.GUBUN == "b"){
                            gubun = "영수";
                        }
                        return gubun;
                    }
                }, {
                    title: "입금여부",
                    width: 120,
                    template: function(e){
                        var depoStat = "";
                        if(e.DEPO_STAT == "1"){
                            depoStat = "미입금";
                        }else if(e.DEPO_STAT == "2"){
                            depoStat = "입금완료";
                        }
                        return depoStat;
                    }
                }, {
                    title: "작성일자",
                    field: "APP_DE",
                    width: 100
                }, {
                    title: "공급가액",
                    template : function(e){
                        if(e.TAX_CH_GUBUN == "1"){
                            return "<div style='text-align:right;'>" + comma(Math.round(Number(e.DEPO_AMT) / 1.1)) + "</div>";
                        } else {
                            return "<div style='text-align:right;'>" + comma(Number(e.DEPO_AMT)) + "</div>";
                        }
                    }
                }, {
                    title: "세액",
                    template : function(e){
                        if(e.TAX_CH_GUBUN == "1"){
                            return "<div style='text-align:right;'>" + comma(Number(e.DEPO_AMT) - Math.round(Number(e.DEPO_AMT) / 1.1)) + "</div>";
                        } else {
                            return "<div style='text-align:right;'>" + comma(0) + "</div>";
                        }
                    }
                }, {
                    title: "합계",
                    template : function(e){
                        return "<div style='text-align:right;'>" + comma(Number(e.DEPO_AMT)) + "</div>";
                    }
                }, {
                    title: "입금예정일",
                    template : function(e){
                        return e.PAY_INCP_DE;
                    }
                }, {
                    title: "입금일자",
                    template : function(e){
                        if(e.RE_APP_DE != null && e.RE_APP_DE != "" && e.RE_APP_DE != undefined){
                            return e.RE_APP_DE;
                        } else {
                            return "";
                        }
                    }
                }, {
                    title: "입금액",
                    template : function(e){
                        var totAmt = 0;
                        // if(e.TOT_AMT != null && e.TOT_AMT != "" && e.TOT_AMT != undefined) {
                        //     totAmt = e.TOT_AMT;
                        // }

                        if(e.EVI_TYPE == "1" || e.EVI_TYPE == "2" || e.EVI_TYPE == "3"){
                            if(e.RE_TOT_COST != null && e.RE_TOT_COST != "" && e.RE_TOT_COST != undefined) {
                                totAmt = e.RE_TOT_COST;
                            }
                        } else {
                            totAmt = e.TOT_DET_AMT;
                        }

                        return "<div style='text-align:right;'>" + comma(totAmt) + "</div>";
                    }
                }, {
                    title: "잔액",
                    template : function(e){
                        var totAmt = 0;
                        // if(e.TOT_AMT != null && e.TOT_AMT != "" && e.TOT_AMT != undefined) {
                        //     totAmt = e.TOT_AMT;
                        // }

                        if(e.EVI_TYPE == "1" || e.EVI_TYPE == "2" || e.EVI_TYPE == "3"){
                            if(e.RE_TOT_COST != null && e.RE_TOT_COST != "" && e.RE_TOT_COST != undefined) {
                                totAmt = e.RE_TOT_COST;
                            }
                        } else {
                            totAmt = e.TOT_DET_AMT;
                        }

                        return "<div style='text-align:right;'>" + comma(e.DEPO_AMT - totAmt) + "</div>";
                    }
                }, {
                    title: "상태",
                    width: 100,
                    template: function(e){
                        var status = "";
                        if(e.PAY_INCP_SN != null){
                            if(e.DOC_STATUS == '100'){
                                if(e.RE_CNT == 0){
                                    status = "수입결의완료"
                                } else {
                                    if(e.RE_TOT_COST == 0){
                                        status = "미결"
                                    } else {
                                        if(e.RE_TOT_COST == e.TOT_DET_AMT){
                                            status = "입금완료"
                                        } else {
                                            status = "부분입금"
                                        }
                                    }
                                }
                            } else if (e.DOC_STATUS != '0' && e.DOC_STATUS != '30' && e.DOC_STATUS != '40'){
                                status = "수입결의결재중"
                            } else {
                                status = "수입결의작성중"
                            }
                        } else {
                            if(e.APPR_STAT == 'Y'){
                                status = "요청완료";
                            } else {
                                status = "작성중"
                            }
                        }

                        return status;
                    },
                }, {
                    title: "기타",
                    width: 100,
                    template: function(e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="depoInfo.fn_reqRegPopup(' + e.PAY_DEPO_SN + ')">보기</button>';
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    onDataBound : function(){
        purcSum = 0;
    },

    fn_reqRegPopup : function(key){
        var url = "/pay/pop/regPayDepoPop.do";

        if(key != null && key != ""){
            url = "/pay/pop/regPayDepoPop.do?payDepoSn=" + key;
            if($("#pjtSn").val() != ""){
                url += "&pjtSn=" + $("#pjtSn").val();
            }
        } else {
            if($("#pjtSn").val() != ""){
                url += "?pjtSn=" + $("#pjtSn").val();
            }
        }

        var name = "_blank";
        var option = "width = 1700, height = 820, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    }

}