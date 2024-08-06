var calcAmSum = 0;
var outUseList = {

    global : {
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : "",
    },

    fn_defaultScript : function (){

        $("#regHistYn").kendoDropDownList({
            dataSource : [
                {text : "선택하세요", value : ""},
                {text : "등록", value : "Y"},
                {text : "미등록", value : "N"},
            ],
            dataTextField : "text",
            dataValueField : "value"
        });

        var d = new Date();
        var bd = new Date(d.setMonth(d.getMonth() - 1));
        console.log(bd.getFullYear() + "-" + ('0' + (bd.getMonth() +  1 )).slice(-2) + "-" + ('0' + bd.getDate()).slice(-2));
        customKendo.fn_datePicker("aStrDe", 'month', "yyyy-MM-dd", bd.getFullYear() + "-" + ('0' + (bd.getMonth() +  1 )).slice(-2) + "-" + ('0' + bd.getDate()).slice(-2));
        customKendo.fn_datePicker("aEndDe", 'month', "yyyy-MM-dd", new Date());

        outUseList.mainGrid();
    },

    gridReload: function (){
        $("#mainGrid").data("kendoGrid").dataSource.read();
    },

    mainGrid: function(){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/card/cardAllList',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.regHistYn = $("#regHistYn").val();
                    data.searchValue = $("#searchValue").val();
                    data.startDt = $("#aStrDe").val();
                    data.endDt = $("#aEndDe").val();
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
        });

        $("#mainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 600,
            pageable: {
                refresh : true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount : 5
            },
            dataBound : function(){
                calcAmSum = 0;
            },
            toolbar: [
                {
                    name : 'excel',
                    text: '엑셀다운로드'
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="outUseList.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }
            ],
            excel : {
                fileName : "전표내역 목록.xlsx",
                filterable : true
            },
            excelExport: exportGrid,
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    title: "I-branch<br>법인카드 사용내역(실시간)",
                    columns: [
                        {
                            field: "BUY_STS_TXT",
                            title: "구분",
                            width: 40,
                        }, {
                            field: "TR_NM",
                            title: "카드명",
                            width: 200,
                        }, {
                            field: "CARD_BA_NB",
                            title: "카드번호",
                            width: 120,
                        }, {
                            field: "AUTH_DD",
                            title: "결제일자",
                            width: 80,
                            template : function (e){
                                return e.AUTH_DD.substring(0, 4) + "-" + e.AUTH_DD.substring(4, 6) + "-" + e.AUTH_DD.substring(6, 8)
                            }
                        }, {
                            field: "MER_NM",
                            title: "거래처",
                            width: 150,
                            template : function (e){
                                return '<div style="cursor: pointer; font-weight: bold" onclick="outUseList.fn_useCardDetailPop(\''+e.AUTH_NO+'\', \''+e.AUTH_DD+'\', \''+e.AUTH_HH+'\', \''+e.CARD_NO+'\', \''+e.BUY_STS+'\')">'+e.MER_NM+'</div>'
                            },
                            footerTemplate: "합계"
                        }, {
                            field: "AUTH_AMT",
                            title: "금액",
                            width: 80,
                            template : function (e){
                                calcAmSum  += Number(e.AUTH_AMT);

                                return '<div style="text-align: right;">' + comma(e.AUTH_AMT) + '</div>';
                            },
                            footerTemplate: function(){
                                return "<div style='text-align: right'>"+comma(calcAmSum)+"</div>";
                            }
                        }
                    ]
                }, {
                    title: "사용내역등록",
                    columns: [
                        {
                            title: "사용자",
                            columns: [
                                {
                                    field : "USE_DEPT_NAME",
                                    title : "부서/팀",
                                    width: 100,
                                }, {
                                    field : "USE_EMP_NAME",
                                    title : "이름",
                                    width: 80,
                                }
                            ]
                        }
                    ]
                }, {
                    title: "전표처리현황",
                    columns: [
                        {
                            field: "EXCEL_PAY_APP_SN",
                            title: "전표처리",
                            template: function(e){
                                if(e.USE_PAY_APP_SN != null){
                                    return '지급신청';
                                } else if(e.USE_SNACK_INFO_SN != null){
                                    return '식대';
                                } else if(e.USE_HR_BIZ_REQ_ID != null || e.USE_HR_BIZ_REQ_RESULT_ID != null){
                                    return '출장';
                                } else {
                                    return '';
                                }
                            },
                            width: 80
                        }, {
                            field: "EXCEL_PAY_EMP_SEQ",
                            title: "처리자",
                            template: function(e){
                                if(e.PAY_EMP_SEQ != null){
                                    return e.PAY_EMP_SEQ;
                                } else if(e.SNACK_EMP_SEQ != null){
                                    return e.SNACK_EMP_SEQ;
                                } else if(e.HR_BIZ_EMP_SEQ != null || e.HR_BIZ_RES_EMP_SEQ != null){
                                    return e.HR_BIZ_EMP_SEQ || e.HR_BIZ_RES_EMP_SEQ;
                                } else {
                                    return '';
                                }
                            },
                            width: 80
                        }, {
                            field: "EXCEL_PAY_REG_DT",
                            title: "처리일자",
                            width: 80,
                            template: function(e){
                                if(e.PAY_REG_DT != null){
                                    return e.PAY_REG_DT;
                                } else if(e.SNACK_REG_DT != null){
                                    return e.SNACK_REG_DT;
                                } else if(e.HR_BIZ_REG_DT != null || e.HR_BIZ_RES_REG_DT != null){
                                    return e.HR_BIZ_REG_DT || e.HR_BIZ_RES_REG_DT;
                                } else {
                                    return '';
                                }
                            },
                        }, {
                            field: "EXCEL_PAY_EXNP_STAT",
                            title: "지출결의서",
                            width: 80,
                            template: function(e){
                                var status = "";
                                if(e.PAY_EXNP_STAT != null){
                                    if(e.PAY_EXNP_STAT == "100"){
                                        status = "결재완료";
                                        if(e.PAY_REQ_END_DE != null && e.PAY_REQ_END_DE != "" && e.PAY_REQ_END_DE != undefined){
                                            status = "승인";
                                        } else {
                                            if(e.PAY_APP_TYPE == 1 || e.PAY_APP_TYPE == 2 || e.PAY_APP_TYPE == 3){
                                                status = "승인";
                                            } else {
                                                status = "미결";
                                            }
                                        }
                                    } else {
                                        status = "미결";
                                    }
                                } else if(e.SNACK_EXNP_STAT != null){
                                    if(e.SNACK_EXNP_STAT == "100"){
                                        status = "결재완료";
                                        if(e.SNACK_REQ_END_DE != null && e.SNACK_REQ_END_DE != "" && e.SNACK_REQ_END_DE != undefined){
                                            status = "승인";
                                        } else {
                                            if(e.SNACK_PAY_APP_TYPE == 1 || e.SNACK_PAY_APP_TYPE == 2 || e.SNACK_PAY_APP_TYPE == 3){
                                                status = "승인";
                                            } else {
                                                status = "미결";
                                            }
                                        }
                                    } else {
                                        status = "미결";
                                    }
                                } else if(e.HR_EXNP_STAT != null){
                                    if(e.HR_EXNP_STAT == "100"){
                                        status = "결재완료";
                                        if(e.HR_REQ_END_DE != null && e.HR_REQ_END_DE != "" && e.HR_REQ_END_DE != undefined){
                                            status = "승인";
                                        } else {
                                            if(e.HR_PAY_APP_TYPE == 1 || e.HR_PAY_APP_TYPE == 2 || e.HR_PAY_APP_TYPE == 3){
                                                status = "승인";
                                            } else {
                                                status = "미결";
                                            }
                                        }
                                    } else {
                                        status = "미결";
                                    }
                                } else {
                                    return '미작성';
                                }

                                return '<div style="font-weight: bold;">'+status+'</div>';
                            },
                        }
                    ]
                }
            ]
        }).data("kendoGrid");
    },

    inputNumberFormat : function(obj){
        obj.value = outUseList.comma(outUseList.uncomma(obj.value));
    },

    comma : function(str){
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    },

    uncomma : function(str){
        str = String(str);
        return str.replace(/[^\d]+/g, '');
    },

    fn_useCardDetailPop : function (authNo, authDate, authTime, cardNo, buySts){
        var params = {
            authNo : authNo,
            authDate : authDate,
            authTime : authTime,
            cardNo : cardNo,
            buySts : buySts
        };

        var url = "/cam_mng/companyCard/useCardDetailPop.do?authNo=" + authNo + "&authDate=" + authDate + "&authTime=" + authTime + "&cardNo=" + cardNo + "&buySts=" + buySts;
        var name = "_blank";
        var option = "width = 600, height = 700, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);

    }

}