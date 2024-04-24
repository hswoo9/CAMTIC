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
        rndBg.setAccount();
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
                value: $("#mgtCd").val().slice(0, -1) + list[i].IS_TYPE
            };
            arr.push(data);
            if(i == 0){
                firstValue = $("#mgtCd").val().slice(0, -1) + list[i].IS_TYPE;
            }
        }

        if(list.length == 0){
            arr = [
                {
                    label: "사업비",
                    value: $("#mgtCd").val()
                }
            ];
            firstValue = $("#mgtCd").val();
        }
        customKendo.fn_radioGroup("budgetClass", arr, "horizontal");
        $("#budgetClass").data("kendoRadioGroup").value(firstValue);

        $("#budgetClass").data("kendoRadioGroup").bind("change", function(){
            rndBg.gridReload($("#budgetClass").data("kendoRadioGroup").value());
        })
    },

    gridReload : function (pjtCd){
        rndBg.global.searchAjaxData = {
            pjtCd : $("#mgtCd").val(),
            pageType : "USER",
            searchValue : '',
            strDe : '1900-01-01',
            endDe : '2999-12-31'
        }

        $("#selectType").kendoRadioGroup({
            items: [
                { label : "예산 현황", value : "1" },
                { label : "지급 신청 리스트", value : "2" },
                { label : "지출 리스트", value : "3" },
            ],
            layout : "horizontal",
            labelPosition : "after",
            value : "1",
            change : function(e){
                var idx = this.value();

                if(idx == 1){
                    $("#budgetGrid1Wrap").css("display", "");
                    $("#budgetMainGrid3").css("display", "none");
                    $("#budgetMainGrid4").css("display", "none");
                    $("#titleWrap").text("◎ 예산현황");
                }
                else if(idx == 2){
                    $("#budgetGrid1Wrap").css("display", "none");
                    $("#budgetMainGrid3").css("display", "");
                    $("#budgetMainGrid4").css("display", "none");
                    $("#titleWrap").text("◎ 지급 신청 리스트");
                } else if (idx == 3){
                    $("#budgetGrid1Wrap").css("display", "none");
                    $("#budgetMainGrid3").css("display", "none");
                    $("#budgetMainGrid4").css("display", "");
                    $("#titleWrap").text("◎ 지출 리스트");
                }
            }
        });
        rndBg.budgetMainGrid(pjtCd);     // 수입예산 리스트
        rndBg.budgetMainGrid2(pjtCd);    // 지출예산 리스트
        rndBg.budgetMainGrid3("/pay/getPaymentList", rndBg.global.searchAjaxData);  // 지급신청서 리스트
        rndBg.budgetMainGrid4("/pay/getExnpReList", rndBg.global.searchAjaxData);   // 지출결의서 리스트
    },



    budgetMainGrid : function(mgtCd){
        let mgtSeq = $("#mgtCd").val();
        if(mgtCd != null && mgtCd != undefined && mgtCd != ""){
            mgtSeq = mgtCd;
        }

        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: "/g20/getSubjectList",
                    dataType: "json",
                    type: "post"
                },
                parameterMap: function(data){
                    var date = new Date();
                    var year = date.getFullYear().toString().substring(2,4);
                    data.stat = "project";
                    data.gisu = year;
                    data.fromDate = $("#sbjStrDe").val().replace(/-/g, "");
                    data.toDate = $("#sbjEndDe").val().replace(/-/g, "");
                    data.mgtSeq = mgtSeq;
                    data.opt01 = '3';
                    data.opt02 = '1';
                    data.opt03 = '2';
                    data.baseDate = date.getFullYear().toString() + (date.getMonth() + 1).toString().padStart(2, '0') + date.getDate().toString().padStart(2, '0');
                    data.pjtSn = $("#pjtSn").val();
                    data.temp = '1'; /*수입예산 1 , 지출예산 2*/
                    return data;
                }
            },
            schema: {
                data: function(data){
                    return data.list;
                },
                total: function(data){
                    return data.list.length;
                },
            }
        });

        $("#budgetMainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound: rndBg.onDataBound,
            columns: [
                {
                    title: "장",
                    width: 250,
                    template: function (e){
                        if(e.DIV_FG_NM == "장"){
                            return "<div style='font-weight: bold'>"+e.BGT_NM+"</div>";
                        } else {
                            return "";
                        }
                    }
                }, {
                    title: "관",
                    width: 250,
                    template: function (e){
                        if(e.DIV_FG_NM == "관"){
                            return e.BGT_NM;
                        } else {
                            return "";
                        }
                    }
                }, {
                    title: "항",
                    width: 150,
                    template: function (e){
                        if(e.DIV_FG_NM == "항"){
                            return e.BGT_NM;
                        } else {
                            return "";
                        }
                    },
                    footerTemplate: "합계"
                }, {
                    title: "예산액",
                    width: 150,
                    template: function(e){
                        if(e.DIV_FG_NM == "장"){
                            calcAmSum  += Number(e.CALC_AM);
                        }
                        return "<div style='text-align: right'>"+comma(e.CALC_AM)+"</div>";
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(calcAmSum)+"</div>";
                    }
                }, {
                    title: "입금완료",
                    width: 150,
                    template: function(e){
                        if(e.DIV_FG_NM == "장"){
                            acctAm2Sum += Number(e.ACCT_AM_2 - e.RETURN_AMT);
                        }
                        return "<div style='text-align: right'>"+comma(e.ACCT_AM_2 - e.RETURN_AMT)+"</div>";
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(acctAm2Sum)+"</div>";
                    }
                }, {
                    title: "입금대기",
                    width: 150,
                    template: function(e){
                        if(e.FULL_WAIT_CK != null){
                            if(e.DIV_FG_NM == "장"){
                                acctAm1Sum += Number(e.FULL_WAIT_CK);
                            }
                            return "<div style='text-align: right'>"+comma(e.FULL_WAIT_CK)+"</div>";
                        } else {
                            return "<div style='text-align: right'>0</div>";
                        }
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(acctAm1Sum)+"</div>";
                    }
                }, {
                    title: "승인",
                    width: 150,
                    template: function(e){
                        if(e.FULL_WAIT_CK != null){
                            return "<div style='text-align: right'>"+comma(e.ACCT_AM_2 + e.FULL_WAIT_CK - e.RETURN_AMT)+"</div>";
                        } else {
                            return "<div style='text-align: right'>"+comma(e.ACCT_AM_2 - e.RETURN_AMT)+"</div>";
                        }
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(acctAm2Sum+acctAm1Sum)+"</div>";
                    }
                }, {
                    title: "예산잔액",
                    width: 150,
                    template: function(e){
                        if(e.DIV_FG_NM == "장"){
                            subAmSum += Number(e.SUB_AM);
                        }
                        return "<div style='text-align: right'>"+comma(e.SUB_AM)+"</div>";
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(subAmSum)+"</div>";
                    }
                }
            ],

            dataBinding: function(){
                record = (this.dataSource.page() -1) * this.dataSource.pageSize();
            }
        }).data("kendoGrid");
    },

    budgetMainGrid2 : function(mgtCd){
        let mgtSeq = $("#mgtCd").val();
        if(mgtCd != null && mgtCd != undefined && mgtCd != ""){
            mgtSeq = mgtCd;
        }
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: "/g20/getSubjectList",
                    dataType: "json",
                    type: "post"
                },
                parameterMap: function(data){
                    var date = new Date();
                    var year = date.getFullYear().toString().substring(2,4);
                    data.stat = "project";
                    data.gisu = year;
                    data.fromDate = $("#sbjStrDe").val().replace(/-/g, "");
                    data.toDate = $("#sbjEndDe").val().replace(/-/g, "");
                    data.mgtSeq = mgtSeq
                    data.opt01 = '3';
                    data.opt02 = '1';
                    data.opt03 = '2';
                    data.baseDate = date.getFullYear().toString() + (date.getMonth() + 1).toString().padStart(2, '0') + date.getDate().toString().padStart(2, '0');
                    data.pjtSn = $("#pjtSn").val();
                    data.temp = '2'; /*수입예산 1 , 지출예산 2*/
                    return data;
                }
            },
            schema: {
                data: function(data){
                    return data.list;
                },
                total: function(data){
                    return data.list.length;
                },
            }
        });

        $("#budgetMainGrid2").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound: rndBg.onDataBound,
            columns: [
                {
                    title: "장",
                    width: 250,
                    template: function (e){
                        if(e.DIV_FG_NM == "장"){
                            return "<div style='font-weight: bold'>"+e.BGT_NM+"</div>";
                        } else {
                            return "";
                        }
                    }
                }, {
                    title: "관",
                    width: 250,
                    template: function (e){
                        if(e.DIV_FG_NM == "관"){
                            return e.BGT_NM;
                        } else {
                            return "";
                        }
                    }
                }, {
                    title: "항",
                    width: 150,
                    template: function (e){
                        if(e.DIV_FG_NM == "항"){
                            return e.BGT_NM;
                        } else {
                            return "";
                        }
                    },
                    footerTemplate: "합계"
                }, {
                    title: "예산액",
                    width: 150,
                    template: function(e){
                        if(e.DIV_FG_NM == "장"){
                            calcAmSum  += Number(e.CALC_AM);
                        }
                        return "<div style='text-align: right'>"+comma(e.CALC_AM)+"</div>";
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(calcAmSum)+"</div>";
                    }
                }, {
                    title: "지출완료",
                    width: 150,
                    template: function(e){
                        if(e.DIV_FG_NM == "장"){
                            acctAm3Sum += Number(e.ACCT_AM_3);
                        }
                        return "<div style='text-align: right'>"+comma(e.ACCT_AM_3)+"</div>";
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(acctAm3Sum)+"</div>";
                    }
                }, {
                    title: "지출대기",
                    width: 150,
                    template: function(e){
                        if(e.WAIT_CK != null){
                            if(e.DIV_FG_NM == "장"){
                                acctAm1Sum += Number(e.WAIT_CK);
                            }
                            return "<div style='text-align: right'>"+comma(e.WAIT_CK)+"</div>";
                        } else {
                            return "<div style='text-align: right'>0</div>";
                        }
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(acctAm1Sum)+"</div>";
                    }
                }, {
                    title: "승인",
                    width: 150,
                    template: function(e){
                        if(e.DIV_FG_NM == "장"){
                            acctAm2Sum  += Number(e.ACCT_AM_2 + e.WAIT_CK);
                        }
                        return "<div style='text-align: right'>"+comma(e.ACCT_AM_2 + e.WAIT_CK)+"</div>";
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(acctAm2Sum)+"</div>";
                    }
                }, {
                    title: "예산잔액",
                    width: 150,
                    template: function(e){
                        if(e.DIV_FG_NM == "장"){
                            subAmSum += Number(e.CALC_AM - (e.ACCT_AM_2 + e.WAIT_CK));
                        }
                        return "<div style='text-align: right'>"+comma(Number(e.CALC_AM - (e.ACCT_AM_2 + e.WAIT_CK)))+"</div>";
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(subAmSum)+"</div>";
                    }
                }
            ],

            dataBinding: function(){
                record = (this.dataSource.page() -1) * this.dataSource.pageSize();
            }
        }).data("kendoGrid");
    },

    budgetMainGrid3 : function(url, params){
        $("#budgetMainGrid3").kendoGrid({
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
                {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="rndBg.fn_reqRegPopup()">' +
                            '	<span class="k-button-text">지급신청서 작성</span>' +
                            '</button>';
                    }
                }, {
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

                        if(e.ORG_YN == 'N'){
                            return '<div style="cursor: pointer; font-weight: bold" onclick="rndBg.fn_reqRegPopup('+e.PAY_APP_SN+', \''+status+'\', \'user\')">'+e.APP_TITLE+'</div>';
                        } else {
                            return '<div style="cursor: pointer; font-weight: bold">'+e.APP_TITLE+'</div>';
                        }
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
                    field: "REQ_END_DE",
                    template : function(e){
                        return (e.R_DT || e.REQ_END_DE);
                    }
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
                            if(e.ITEM_COUNT == e.EXNP_DOC_STATUS && e.EXNP_STATUS == e.EXNP_DOC_STATUS && e.EXNP_STATUS != 0 && e.EXNP_DOC_STATUS2 == 100){
                                stat = "지출완료";
                            } else if(e.ITEM_COUNT != e.EXNP_DOC_STATUS && e.EXNP_DOC_STATUS != 0){
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
                            if(e.DOC_STATUS == 0 || e.DOC_STATUS == 30 || e.DOC_STATUS == 40){
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

    budgetMainGrid4 : function(url, params){
        $("#budgetMainGrid4").kendoGrid({
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
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll"/>',
                    width: 30,
                    template : function(e){
                        if(e.TYPE == "반제(지출)"){
                            if(e.RE_STAT == "N"){
                                return '<input type="checkbox" name="check" value="'+e.EXNP_SN+'"/>';
                            } else {
                                return '';
                            }
                        } else {
                            return '';
                        }
                    }
                }, {
                    title: "번호",
                    width: 40,
                    template: "#= --record #"
                }, {
                    title: "구분",
                    width: 80,
                    field: "TYPE"
                }, {
                    title: "결의일자",
                    width: 70,
                    field: "R_DT",
                }, {
                    title: "적요",
                    field: "EXNP_BRIEFS",
                    width: 280,
                    template: function(e){
                        console.log(e);
                        return '<div style="cursor: pointer; font-weight: bold" onclick="rndBg.fn_reqRegExnpPopup('+e.EXNP_SN+', \''+e.PAY_APP_SN+'\')">'+e.EXNP_BRIEFS+'</div>';
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
                    title: "작성자",
                    field: "REG_EMP_NAME",
                    width: 80
                }, {
                    title: "지출금액",
                    width: 80,
                    template: function(e){
                        var cost = e.TOT_COST;
                        return '<div style="text-align: right">'+comma(cost)+'</div>';

                        // if(e.RE_STAT == "Y"){
                        //     return '<div style="text-align: right">'+comma(cost)+'</div>';
                        // } else {
                        //     return '<div style="text-align: right">'+0+'</div>';
                        // }
                    }
                }, {
                    title: "상태",
                    width: 60,
                    template: function(e){
                        if(e.RE_STAT == "N"){
                            return "미승인"
                        } else {
                            return "승인"
                        }
                    }
                }, {
                    title: "첨부",
                    width: 60,
                    template: function(e){
                        if(e.RE_STAT == "N"){
                            return ""
                        } else {
                            return '<button type="button" class="k-button k-button-solid-base" onclick="rndBg.fn_regPayAttPop('+e.PAY_APP_SN+', '+e.EXNP_SN+')">첨부</button>';
                        }
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    fn_reqRegPopup : function(key, status, auth){
        var url = "/payApp/pop/regPayAppPop.do?reqType=camproject&cardPjtSn=" + $("#pjtSn").val();
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
        var url = "/payApp/pop/regExnpRePop.do?payAppSn=" + paySn + "&exnpSn=" + key;
        var name = "_blank";
        var option = "width = 1700, height = 820, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    fn_regPayAttPop : function (key, exnpKey){
        var url = "/payApp/pop/regReListFilePop.do?payAppSn=" + key + "&exnpSn=" + exnpKey;
        var name = "_blank";
        var option = "width = 850, height = 400, top = 200, left = 350, location = no";
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