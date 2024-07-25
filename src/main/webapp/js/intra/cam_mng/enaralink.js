var enaralink = {

    global: {
        dropDownDataSource: "",
        searchAjaxData: "",
        saveAjaxData: "",
        selData: ""
    },

    fn_defaultScript: function () {

        var d = new Date();
        var bd = new Date(d.setMonth(d.getMonth() - 1)); // 이전달

        var bdStr = d.getFullYear() + "-" + ('0' + (bd.getMonth() + 1)).slice(-2) + "-" + ('0' + bd.getDate()).slice(-2);

        var data = {};
        data.deptLevel = 1;
        var deptDsA = customKendo.fn_customAjax("/dept/getDeptAList", data);

        customKendo.fn_datePicker("fromMonth", "depth", "yyyy-MM-dd", bdStr);
        customKendo.fn_datePicker("endMonth", "depth", "yyyy-MM-dd", new Date());
        customKendo.fn_dropDownList("deptComp", deptDsA.rs, "dept_name", "dept_seq");
        customKendo.fn_textBox(["searchValue"]);

        $("#status").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "전체", value: "999"},
                {text: "미전송", value: "0"},
                {text: "전송진행중", value: "2"},
                {text: "전송", value: "1"}
            ],
            index: 0
        });
        $("#fromMonth, #endMonth").attr("readonly", true);
        $("#fromMonth").data("kendoDatePicker").bind("change", enaralink.mainGrid);
        $("#endMonth").data("kendoDatePicker").bind("change", enaralink.mainGrid);


        enaralink.mainGrid();
    },



    mainGrid : function(){
        var dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/kukgoh/getPayAppList',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {

                    data.strDt = $("#fromMonth").val();
                    data.endDt = $("#endMonth").val();
                    data.exceptYn = "N";

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

        $("#sendResolutionGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
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
            toolbar : [
                {
                    name : 'button',
                    template : function (){

                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="">' +
                            '	<span class="k-button-text">일괄 전송취소</span>' +
                            '</button>'+
                            '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="">' +
                            '	<span class="k-button-text">전송취소</span>' +
                            '</button>'+
                            '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="enaralink.fn_enaraSendExcept();">' +
                            '	<span class="k-button-text">전송제외</span>' +
                            '</button>'+
                            '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="">' +
                            '	<span class="k-button-text">집행정보 일괄전송</span>' +
                            '</button>'+

                            '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="enaralink.mainGrid()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }
            ],
            // persistSelection : true,
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" onclick="fn_checkAll(\'checkAll\', \'payAppDetChk\');"/>',
                    template : function(e){
                        return "<input type='checkbox' id='payAppDet_"+e.PAY_APP_DET_SN+"' name='payAppDetChk' class='payAppDetChk'  value='"+e.PAY_APP_DET_SN+"'>";
                    },
                    width: 50
                },
                // {
                //     field : "",
                //     title: "전송가능여부",
                //     width: 80,
                // },
                // {
                //     title: "전송불가사유",
                //     width: 150,
                // },
                {
                    title: "전송/확인",
                    width: 100,
                    template : function(e) {
                        if (e.TRNSC_ID != null) {
                            return "<button type='button' class='k-button k-button-solid-base' onclick='enaralink.fn_openSubmitPage("+e.PAY_APP_DET_SN+");'>확인</button>";
                        } else {
                            return "<button type='button' class='k-button k-button-solid-base' onclick='enaralink.fn_openSubmitPage("+e.PAY_APP_DET_SN+");'>전송</button>";
                        }
                    }
                },
                {
                    title: "전자(세금)계산서",
                    width: 100,
                    template : function(dataItem) {
                        if (dataItem.EVID_TYPE == 1) {
                            return "<button type='button' class='k-button k-button-solid-base' onclick='enaralink.fn_evidCrmPopup("+dataItem.PAY_APP_DET_SN+");'>설정</button>";
                        } else {
                            return "";
                        }
                    }
                },
                {
                    title: "지출결의 정보",
                    columns: [
                        {
                            field: "",
                            title: "상태",
                            width: 70,
                            template:function(e){
                                if(e.TRNSC_ID == null) {
                                    return "미전송";
                                } else {
                                    if(e.RSP_CD == "SUCC") {
                                        return "전송완료";
                                    } else if(e.RSP_CD.indexOf("ER") > -1) {
                                        return "전송실패";
                                    } else {
                                        return "전송진행중";
                                    }
                                }
                            }
                        }, {
                            field: "EMP_NAME",
                            title: "결의자",
                            width: 70
                        }, {
                            field: "DOC_NO",
                            title: "문서번호",
                            width: 150
                        }, {
                            field: "DOC_TITLE",
                            title: "문서제목",
                            width: 300
                        },{
                            field: "PJT_NM",
                            title: "프로젝트",
                            width: 150
                        },  {
                            field: "BUDGET_NM",
                            title: "예산과목",
                            width: 150
                        }, {
                            field: "EVID_TYPE",
                            title: "결재수단",
                            width: 80,
                            template : function (e){
                                if(e.EVID_TYPE == 1){
                                    return "세금계산서"
                                } else if (e.EVID_TYPE == 2){
                                    return "계산서"
                                } else if(e.EVID_TYPE == 3){
                                    return "신용카드"
                                } else if(e.EVID_TYPE == 4){
                                    return "직원지급"
                                } else if(e.EVID_TYPE == 5){
                                    return "사업소득자"
                                } else if(e.EVID_TYPE == 6){
                                    return "기타"
                                } else if(e.EVID_TYPE == 9) {
                                    return "기타소득자";
                                }
                            }
                        }, {
                            field: "",
                            title: "금액",
                            width: 100,
                            template : function (e){
                                return '<div style="text-align: right">'+enaralink.comma(e.TOT_COST)+'</div>'
                            }
                        }]
                },
                {
                    title: "ENARA 집행 전송 정보",
                    columns: [
                        {
                            field: "PRUF_SE_CODE",
                            title: "증빙선택",
                            width: 120,
                            template : function(e) {
                                if(e.RSP_CD === "SUCC") {
                                    if(e.PRUF_SE_CODE == "001") {
                                        return "전자세금계산서";
                                    } else if(e.PRUF_SE_CODE == "002") {
                                        return "전자계산서";
                                    } else if(e.PRUF_SE_CODE == "004") {
                                        return "보조금전용카드";
                                    } else if(e.PRUF_SE_CODE == "999") {
                                        return "기타"
                                    } else {
                                        return "";
                                    }
                                } else {
                                    return "";
                                }
                            }
                        }, {
                            field: "PRUF_SE_NO",
                            title: "승인번호",
                            width: 250,
                            template : function(e) {
                                if(e.RSP_CD === "SUCC") {
                                    return e.PRUF_SE_NO;
                                } else {
                                    return "";
                                }
                            }
                        }, {
                            field: "EXCUT_REQUST_DE",
                            title: "증빙일자",
                            width: 100,
                            template : function(e) {
                                if(e.RSP_CD === "SUCC") {
                                    return e.EXCUT_REQUST_DE;
                                } else {
                                    return "";
                                }
                            }
                        }, {
                            field: "EXCUT_SUM_AMOUNT",
                            title: "합계금액",
                            width: 100,
                            template : function (e){
                                if(e.EXCUT_SUM_AMOUNT != null) {
                                    return '<div style="text-align: right">'+enaralink.comma(e.EXCUT_SUM_AMOUNT)+'</div>'
                                } else {
                                    return "";
                                }
                            }
                        }, {
                            field: "BCNC_CMPNY_NM",
                            title: "거래처명",
                            width: 300
                        }, {
                            field: "BCNC_LSFT_NO",
                            title: "사업자등록번호<br>(주민등록번호)",
                            width: 150
                        }, {
                            field: "TRANSFR_ACNUT_SE_CODE",
                            title: "이체구분",
                            width: 180,
                            template : function(e) {
                                if(e.TRANSFR_ACNUT_SE_CODE == "001") {
                                    return "거래처계좌로이체"
                                } else if(e.TRANSFR_ACNUT_SE_CODE == "002") {
                                    return "보조금계좌로이체"
                                } else if(e.TRANSFR_ACNUT_SE_CODE == "003") {
                                    return "보조금전용카드결제계좌로 이체"
                                } else {
                                    return "";
                                }
                            }
                        }, {
                            field: "BCNC_BANK_CODE_NM",
                            title: "은행명",
                            width: 100
                        }, {
                            field: "BCNC_ACNUT_NO",
                            title: "계좌번호",
                            width: 150
                        }, {
                            field: "",
                            title: "정산서류",
                            width: 100
                        }]
                }
            ]
        }).data("kendoGrid");
    },

    fn_openSubmitPage : function(e) {
        var url = "/mng/newResolutionSubmitPage.do?payAppDetSn=" + e;
        var name = "newResolutionSubmitPage";
        var option = "width=1200, height=800, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";
        var popup = window.open(url, name, option);
    },

    fn_enaraSendExcept : function() {

        if($("input[name='payAppDetChk']:checked").length == 0){
            alert("전송 제외할 항목을 선택해주세요.");
            return;
        }

        if(confirm("제외하시겠습니까?")){
            var payAppDetSn = "";

            $.each($("input[name='payAppDetChk']:checked"), function(){
                payAppDetSn += "," + $(this).val()
            })

            $.ajax({
                url: "/kukgoh/setEnaraSendExcept",
                data: {
                    payAppDetSn : payAppDetSn.substring(1),
                    exceptYn : "Y"
                },
                type: "post",
                dataType: "json",
                async: false,
                success: function(rs) {
                    alert("제외되었습니다.");
                    enaralink.mainGrid();
                },
                error: function (e) {
                    console.log('error : ', e);
                }
            });
        }
    },

    comma : function(str){
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    },

    fn_evidCrmPopup : function (e) {
        var url = "/mng/evidCrmSubmitPopup.do?payAppDetSn=" + e;
        var name = "evidPopup";
        var option = "width=1200, height=300, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";
        var popup = window.open(url, name, option);
    }


}