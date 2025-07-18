var etaxList = {

    fn_defaultScript: function (){

        var date = new Date();
        date.setMonth(date.getMonth() - 1);

        customKendo.fn_textBox(["crmNm", "crmNo"]);
        customKendo.fn_datePicker("strDt", "depth", "yyyy-MM-dd", date);
        customKendo.fn_datePicker("endDt", "depth", "yyyy-MM-dd", new Date());

        $("#taxGubun").kendoDropDownList({
            dataSource : [
                {text : "전체", value : ""},
                {text : "세금계산서", value : "1"},
                {text : "계산서", value : "2"},
            ],
            dataTextField : "text",
            dataValueField : "value"
        });

        $("#dtGubun").kendoDropDownList({
            dataSource : [
                {text : "작성일자", value : "a"},
                {text : "발급일자", value : "b"},
                {text : "전송일자", value : "c"},
            ],
            dataTextField : "text",
            dataValueField : "value"
        });

        etaxList.mainGrid();
    },

    gridReload: function (){
        $("#mainGrid").data("kendoGrid").dataSource.read();
    },

    mainGrid: function(){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/mng/getEtaxListAll',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.crmNm = $("#crmNm").val();
                    data.crmNo = $("#crmNo").val();
                    data.dtGubun = $("#dtGubun").val();
                    data.strDt = $("#strDt").val().toString().replace(/-/g, "");
                    data.endDt = $("#endDt").val().toString().replace(/-/g, "");
                    data.type = $("#taxGubun").val();
                    data.viewType = 'mng';
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
            height: 508,
            pageable: {
                refresh : true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount : 5
            },
            toolbar: [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="etaxList.syncEtaxG20Data()">' +
                            '	<span class="k-button-text">G20 동기화</span>' +
                            '</button>';
                    }
                }, {
                    name : 'excel',
                    text: '엑셀다운로드'
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="etaxList.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }
            ],
            excel : {
                fileName : "세금계산서 내역 목록.xlsx",
                filterable : true
            },
            excelExport: exportGrid,
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    template: "#= ++record #",
                    title: "번호",
                    width : 30
                }, {
                    field: "DIV_NM",
                    title: "사업장",
                    width: 80,
                    template: function (e){
                        return e.DIV_NM;
                    }
                }, {
                    field: "TAX_TY",
                    title: "구분",
                    width: 40,
                    template: function (e){
                        if(e.TAX_TY == 1){
                            return "매출";
                        } else if(e.TAX_TY == 2){
                            return "매입";
                        } else if(e.TAX_TY == 3){
                            return "면세매출";
                        } else if(e.TAX_TY == 4){
                            return "면세매입";
                        } else {
                            return "";
                        }
                    }
                }, {
                    field: "ETAX_TY",
                    title: "분류",
                    width: 40,
                    template: function (e){
                        if(e.ETAX_TY == 1){
                            return "일반";
                        } else if(e.ETAX_TY == 2){
                            return "수정";
                        } else {
                            return "";
                        }
                    }
                }, {
                    field: "ISS_DT",
                    title: "작성일자",
                    width: 60,
                    template: function (e){
                        return e.ISS_DT.substring(0,4) + "-" + e.ISS_DT.substring(4,6) + "-" + e.ISS_DT.substring(6,8);
                    }
                }, {
                    field: "ISU_DT",
                    title: "발급일자",
                    width: 60,
                    template: function (e){
                        return e.ISU_DT.substring(0,4) + "-" + e.ISU_DT.substring(4,6) + "-" + e.ISU_DT.substring(6,8);
                    }
                }, {
                    field: "ISS_YMD",
                    title: "전송일자",
                    width: 60,
                    template: function (e){
                        return e.ISS_YMD.substring(0,4) + "-" + e.ISS_YMD.substring(4,6) + "-" + e.ISS_YMD.substring(6,8);
                    }
                }, {
                    field: "TR_CD",
                    title: "코드",
                    width: 40
                }, {
                    field: "TR_NM",
                    title: "거래처명",
                    width: 100
                }, {
                    field: "TRREG_NB",
                    title: "사업자번호",
                    width: 80,
                    template: function (e){
                        if(e.TRREG_NB != null){
                            return e.TRREG_NB.toString().substring(0,3) + "-" + e.TRREG_NB.toString().substring(3,5) + "-" + e.TRREG_NB.toString().substring(5,10);
                        } else {
                            return "";
                        }
                    }
                }, {
                    field: "SUP_AM",
                    title: "공급가액",
                    width: 60,
                    template: function (e){
                        return '<div style="text-align: right;">'+comma(e.SUP_AM.toString().split(".")[0])+'</div>';
                    }
                }, {
                    field: "VAT_AM",
                    title: "세액",
                    width: 60,
                    template: function (e){
                        return '<div style="text-align: right;">'+comma(e.VAT_AM.toString().split(".")[0])+'</div>';
                    }
                }, {
                    field: "SUM_AM",
                    title: "합계금액",
                    width: 60,
                    template: function (e){
                        console.log(e);
                        return '<div style="text-align: right;">'+comma(e.SUM_AM.toString().split(".")[0])+'</div>';
                    }
                }, {
                    field: "ISS_NO",
                    title: "승인번호",
                    width: 120
                }, {
                    field: "ITEM_DC",
                    title: "품목명",
                    width: 120
                }, {
                    field: "CE_GW_IDX",
                    title: "전표처리",
                    width: 50,
                    template: function (e){
                        if(e.CE_GW_IDX != null){
                            if(e.PAY_APP_SN != null){
                                return "지급신청";
                            } else {
                                return "구매";
                            }
                        } else if(e.PAY_APP_SN != null){
                            return "지급신청";
                        } else {
                            return "";
                        }
                    }
                }, {
                    field: "PAY_EMP_SEQ",
                    title: "처리자",
                    width: 50,
                    template: function (e) {
                        if (e.PAY_EMP_SEQ != null) {
                            return e.PAY_EMP_SEQ;
                        } else if (e.PURC_EMP_SEQ != null) {
                            return e.PURC_EMP_SEQ;
                        } else {
                            return '';
                        }
                    }
                }, {
                    field: "PAY_REG_DT",
                    title: "처리일자",
                    width: 60,
                    template: function(e){
                        if(e.PAY_REG_DT != null){
                            return e.PAY_REG_DT;
                        } else if(e.CLAIM_EXNP_REG_DT != null){
                            return e.CLAIM_EXNP_REG_DT;
                        } else {
                            return '';
                        }
                    },
                },

            ],
            dataBinding: function() {
                record = (this.dataSource.page() -1) * this.dataSource.pageSize();
            }
        }).data("kendoGrid");
    },

    syncEtaxG20Data : function (){
        var data = {
            strDt : $("#strDt").val().replaceAll("-", ""),
            endDt : $("#endDt").val().replaceAll("-", ""),
        }

        $.ajax({
            url : "/etax/syncEtaxG20Data",
            data : data,
            type : "post",
            dataType : "json",
            beforeSend : function(request){
                $("#my-spinner").show();
            },
            success :function (rs){
                if(rs.code == 200){
                    alert("완료되었습니다.");
                    $("#mainGrid").data("kendoGrid").dataSource.read();
                    $("#my-spinner").hide();
                }
            },
            error : function(e){
                alert("오류가 발생하였습니다.");
                $("#my-spinner").hide();
            }
        });
    }
}