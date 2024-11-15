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
        depoInfo.footerSum();
    },

    mainGrid: function(url, params){
        $("#depositMainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
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
                    name : 'excel',
                    text: '엑셀다운로드'
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="depoInfo.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }
            ],
            excel : {
                fileName : "입금처리 요청서 목록.xlsx",
                filterable : true
            },
            excelExport: exportGrid,
            columns: [
                {
                    title: "번호",
                    width: 50,
                    template: "#= --record #"
                }, {
                    field: "GUBUN",
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
                    },
                    footerTemplate : function () {
                        return "<span>합계</span>";
                    }
                }, {
                    field: "APP_DE",
                    title: "작성일자",
                    width: 100
                }, {
                    field: "DEPO_AMT",
                    title: "공급가액",
                    template : function(e){
                        if(e.TAX_CH_GUBUN == "1"){
                            return "<div class='depoAmt1' style='text-align:right;'>" + comma(Math.round(Number(e.DEPO_AMT) / 1.1)) + "</div>";
                        } else {
                            return "<div class='depoAmt1' style='text-align:right;'>" + comma(Number(e.DEPO_AMT)) + "</div>";
                        }
                    },
                    footerTemplate : function () {
                        return "<span id='depoAmt1' style='float:right;'></span>";
                    }
                }, {
                    field: "DEPO_AMT",
                    title: "세액",
                    template : function(e){
                        if(e.TAX_CH_GUBUN == "1"){
                            return "<div class='depoAmt2' style='text-align:right;'>" + comma(Number(e.DEPO_AMT) - Math.round(Number(e.DEPO_AMT) / 1.1)) + "</div>";
                        } else {
                            return "<div class='depoAmt2' style='text-align:right;'>" + comma(0) + "</div>";
                        }
                    },
                    footerTemplate : function () {
                        return "<span id='depoAmt2' style='float:right;'></span>";
                    }
                }, {
                    field: "DEPO_AMT",
                    title: "합계",
                    template : function(e){
                        return "<div class='total' style='text-align:right;'>" + comma(Number(e.DEPO_AMT)) + "</div>";
                    },
                    footerTemplate : function () {
                        return "<span id='total' style='float:right;'></span>";
                    }
                }, {
                    field: "PAY_INCP_DE",
                    title: "입금예정일",
                    template : function(e){
                        return e.PAY_INCP_DE;
                    }
                }, {
                    field: "RE_APP_DE",
                    title: "입금일자",
                    template : function(e){
                        if(e.ORG_YN == 'N'){
                            if(e.RE_APP_DE != null && e.RE_APP_DE != "" && e.RE_APP_DE != undefined){
                                return e.RE_APP_DE;
                            } else {
                                return "";
                            }
                        } else {
                            return e.PAY_INCP_DE;
                        }
                    }
                }, {
                    field: "TOT_DET_AMT",
                    title: "입금액",
                    template : function(e){
                        var totAmt = 0;
                        // if(e.TOT_AMT != null && e.TOT_AMT != "" && e.TOT_AMT != undefined) {
                        //     totAmt = e.TOT_AMT;
                        // }

                        if(e.ORG_YN == 'N'){
                            if(e.EVI_TYPE == "1" || e.EVI_TYPE == "2" || e.EVI_TYPE == "3"){
                                if(e.RE_TOT_COST != null && e.RE_TOT_COST != "" && e.RE_TOT_COST != undefined) {
                                    totAmt = e.RE_TOT_COST;
                                }
                            } else {
                                totAmt = e.TOT_DET_AMT;
                            }

                            return "<div class='comAmt' style='text-align:right;'>" + comma(totAmt) + "</div>";
                        } else {
                            return "<div class='comAmt' style='text-align:right;'>" + comma(e.DEPO_AMT) + "</div>";
                        }
                    },
                    footerTemplate : function () {
                        return "<span id='comAmt' style='float:right;'></span>";
                    }
                }, {
                    field: "RE_TOT_COST",
                    title: "잔액",
                    template : function(e){
                        var totAmt = 0;
                        // if(e.TOT_AMT != null && e.TOT_AMT != "" && e.TOT_AMT != undefined) {
                        //     totAmt = e.TOT_AMT;
                        // }

                        if(e.ORG_YN == 'N'){
                            if(e.EVI_TYPE == "1" || e.EVI_TYPE == "2" || e.EVI_TYPE == "3"){
                                if(e.RE_TOT_COST != null && e.RE_TOT_COST != "" && e.RE_TOT_COST != undefined) {
                                    totAmt = e.RE_TOT_COST;
                                }
                            } else {
                                totAmt = e.TOT_DET_AMT;
                            }

                            return "<div class='balAmt' style='text-align:right;'>" + comma(e.DEPO_AMT - totAmt) + "</div>";
                        } else {
                            return "<div class='balAmt' style='text-align:right;'>" + comma(0) + "</div>";
                        }
                    },
                    footerTemplate : function () {
                        return "<span id='balAmt' style='float:right;'></span>";
                    }
                }, {
                    field: "DOC_STATUS",
                    title: "상태",
                    width: 100,
                    template: function(e){
                        var status = "";
                        if(e.ORG_YN == 'N'){
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
                        } else {
                            status = "입금완료";
                        }

                        return status;
                    },
                }, {
                    title: "기타",
                    width: 100,
                    template: function(e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="depoInfo.fn_reqRegPopup(' + e.PAY_DEPO_SN + ')">보기</button>';
                    }
                }, {
                    title: "",
                    width: 80,
                    template: function(e){
                        if(e.PAY_INCP_SN == null) {
                            return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="depoInfo.fn_deleteDepo(' + e.PAY_DEPO_SN + ')">삭제</button>'
                        } else {
                            return "";
                        }
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    footerSum : function (){
        let depoAmt1 = 0;
        let depoAmt2 = 0;
        let total = 0;
        let comAmt = 0;
        let balAmt = 0;

        $('.depoAmt1').each(function () {
            depoAmt1 += Number($(this).text().replace(/,/g, ''));
        });

        $('.depoAmt2').each(function () {
            depoAmt2 += Number($(this).text().replace(/,/g, ''));
        });

        $('.total').each(function () {
            total += Number($(this).text().replace(/,/g, ''));
        });

        $('.comAmt').each(function () {
            comAmt += Number($(this).text().replace(/,/g, ''));
        });

        $('.balAmt').each(function () {
            balAmt += Number($(this).text().replace(/,/g, ''));
        });

        $('#depoAmt1').text(comma(depoAmt1));
        $('#depoAmt2').text(comma(depoAmt2));
        $('#total').text(comma(total));
        $('#comAmt').text(comma(comAmt));
        $('#balAmt').text(comma(balAmt));
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
    },

    fn_deleteDepo : function(key){
        if(!confirm("삭제하시겠습니까?")){
            return;
        }

        var data = {
            payDepoSn : key,
        }

        $.ajax({
            url : "/pay/delPayDepo",
            type : "POST",
            data : data,
            dataType : 'json',
            traditional : true,
            success : function (rs){
                if(rs.code == 200){
                    alert("삭제되었습니다.");

                    depoInfo.gridReload();
                }
            }
        });
    }

}