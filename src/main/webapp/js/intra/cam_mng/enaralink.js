var enaralink = {

    global: {
        dropDownDataSource: "",
        searchAjaxData: "",
        saveAjaxData: "",
    },

    fn_defaultScript: function () {

        var d = new Date();
        var bd = new Date(d.setMonth(d.getMonth() - 1)); // 이전달

        var bdStr = d.getFullYear() + "-" + ('0' + (bd.getMonth() + 1)).slice(-2) + "-" + ('0' + bd.getDate()).slice(-2)

        var data = {}
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
        $("#fromMonth").data("kendoDatePicker").bind("change", enaralink.gridReload);
        $("#endMonth").data("kendoDatePicker").bind("change", enaralink.gridReload);

        enaralink.mainGrid();
    },


    mainGrid: function () {
        var sendResolutionGrid = $("#sendResolutionGrid").kendoGrid({
            dataSource: new kendo.data.DataSource({
                serverPaging: true,
                pageSize: 10,
                transport: {
                    read: {
                        url: "/kukgoh/sendResolutionGrid",
                        dataType: "json",
                        type: 'post'
                    },
                    parameterMap: function (data, operation) {
                        data.fromMonth = $('#fromMonth').val().replace(/\-/g, '');
                        data.endMonth = $('#endMonth').val().replace(/\-/g, '');
// 						data.erpDeptSeq 	= $("#erpEmpSeq").val() === ''
// 													? ( $("#deptNm").data('kendoComboBox').value() === '99999' ? '' : $("#deptNm").data('kendoComboBox').value() )
// 													: '';
// 						data.erpEmpSeq 	= $("#erpEmpSeq").val();
                        data.erpDeptSeq = '';
                        data.erpEmpSeq = '';
                        data.status = $("#status").data('kendoDropDownList').value();
                        return data;
                    }
                },
                schema: {
                    data: function (response) {
                        console.log("=== sendResolutionGrid ===");
                        console.log(response);
                        return response.list;
                    },
                    total: function (response) {
                        return response.total;
                    },
                    model: {
                        fields: {}
                    }
                }
            }),
            dataBound: gridDataBound,
            height: 600,
            sortable: true,
            resizable: true,
            persistSelection: true,
            selectable: "multiple",
            /*toolbar : [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="enaralink.fn_AllcancelData();">' +
                            '	<span class="k-button-text">일괄 전송취소</span>' +
                            '</button>' +
                            '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="enaralink.fn_cancelData();">' +
                            '	<span class="k-button-text">전송취소</span>' +
                            '</button>' +

                            '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="enaralink.fn_exceptData();">' +
                            '	<span class="k-button-text">전송제외</span>' +
                            '</button>' +
                            '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="enaralink.fn_sendAccountBatch();">' +
                            '	<span class="k-button-text">집행정보 일괄전송</span>' +
                            '</button>' +
                            '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="enaralink.fn_searchBtn();">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';

                    }
                }
            ],*/
            columns: [
                {
                    template: function (dataItem) {
                        if (dataItem.KUKGO_STATE === "전송완료" || dataItem.KUKGO_STATE === '전송진행중' || dataItem.KUKGO_STATE === '전송실패') {
                            return '<input type="button" class="" style="" onclick="fn_openSubmitPage(this);" value="확인">';
                        } else {
                            return '<input type="button" class="" style="" onclick="fn_openSubmitPage(this);" value="전송">';
                        }
                    },
                    title: "전송/확인", width: 70,
                    locked: true
                },
                {
                    template: function (dataItem) {
                        if ((dataItem.SET_FG_NM == '신용카드')) {
                            return '';
                        } else {
                            var msg = '';
                            var color = 'text_blue2';

                            if (dataItem.PRUF_SE_NO === undefined) {
                                msg = '설정';
                            } else if (dataItem.PRUF_SE_NO.substring(0, 4) === '(오류)') {
                                msg = '설정진행중';
                                color = 'text_red2';
                            } else {
                                msg = '설정완료';
                                color = 'text_green2';
                            }

                            return '<input type="button" id="" class="' + color + '" onclick="fn_openInvoicePage(this);"value="' + msg + '"/>';
                        }
                    },
                    title: "전자(세금)</br> 계산서",
                    width: 100,
                    locked: true,
                    encoded: false
                },
                {
                    title: "지출결의 정보",
                    columns: [
                        {field: "KUKGO_STATE", title: "상태", width: 70},
                        {field: "KOR_NM", title: "결의자", width: 70},
                        {
                            template: function (dataItem) {
                                return enaralink.fn_formatDate(dataItem.GISU_DT);
                            },
                            title: "결의일자", width: 70
                        },
                        {field: "GISU_SQ", title: "결의<br>번호", width: 75, encoded: false},
                        {field: "BG_SQ", title: "예산<br>번호", width: 75, encoded: false},
                        {field: "LN_SQ", title: "거래처<br>순번", width: 75, encoded: false},
                        {
                            template: function (dataItem) {
                                return "<span class='grdCol' style='color: blue;' onclick='fn_docViewPop(" + dataItem.C_DIKEYCODE + ")'>" + dataItem.DOC_NUMBER + "</span>";
                            },
                            title: "문서번호", width: 120
                        },
                        {
                            template: function (dataItem) {
                                return "<span class='grdCol' style='color: blue;' onclick='fn_docViewPop(" + dataItem.C_DIKEYCODE + ")'>" + dataItem.DOC_TITLE + "</span>";
                            },
                            title: "문서제목", width: 140
                        },
                        {field: "DIV_NM", title: "회계단위", width: 170},
                        {field: "PJT_NM", title: "프로젝트", width: 110},
                        {field: "ABGT_NM", title: "예산과목", width: 150},
                        {field: "SET_FG_NM", title: "결재수단", width: 80},
                        {
                            template: function (dataItem) {
                                return enaralink.fn_formatMoney(dataItem.SUM_AMOUNT);
                            },
                            title: "금액",
                            width: 60
                        }]
                },
                {
                    title: "ENARA 집행 전송 정보",
                    columns: [
                        {field: "KUKGO_PJTNM", title: "사업명", width: 120},
                        {field: "ASSTN_TAXITM_CODE_NM", title: "보조세목", width: 120},
                        {
                            template: function (dataItem) {
                                return enaralink.fn_formatDate(dataItem.MD_DT);
                            },
                            title: "작성일자", width: 70
                        },
                        {
                            template: function (dataItem) {
                                return "[" + dataItem.DOC_NUMBER + "] " + dataItem.DOC_TITLE;
                            },
                            title: "<img src='/images/ico/ico_check01.png'>집행용도",

                            width: 250
                        },
                        {
                            field: "PRDLST_NM",
                            title: "<img src='/images/ico/ico_check01.png'>품목",
                            width: 250
                        },
                        {
                            field: "PRUF_SE_CODE_NM",
                            title: "<img src='/images/ico/ico_check01.png'/>증빙선택",
                            width: 90
                        },
                        {
                            field: "PRUF_SE_NO",
                            title: "<img src='/images/ico/ico_check01.png'/>승인번호",
                            width: 150
                        },
                        {
                            template: function (dataItem) {

                                console.log(dataItem.EXCUT_REQUST_DE);

                                if (dataItem.EXCUT_REQUST_DE.length > 1) {
                                    return enaralink.fn_formatDate(dataItem.EXCUT_REQUST_DE);
                                } else {
                                    return '';
                                }

                            },
                            title: "<img src='/images/ico/ico_check01.png'/>증빙일자", width: 90
                        },
                        {
                            template: function (dataItem) {
                                return enaralink.fn_formatMoney(dataItem.SUM_AMOUNT);
                            },
                            title: "합계금액", width: 80
                        },
                        {
                            template: function (dataItem) {
                                return enaralink.fn_formatMoney(dataItem.SPLPC);
                            },
                            title: "공급가액", width: 80
                        },
                        {
                            template: function (dataItem) {
                                return enaralink.fn_formatMoney(dataItem.VAT);
                            },
                            title: "부가세액", width: 80
                        },
                        {
                            field: "BCNC_SE_CODE_NM",
                            title: "<img src='/images/ico/ico_check01.png'/>거래처구분",
                            width: 80
                        },
                        {field: "BCNC_CMPNY_NM", title: "거래처명", width: 200},
                        {
                            template: function (dataItem) {

                                var BCNC_SE_CODE = dataItem.BCNC_SE_CODE;
                                var BCNC_LSFT_NO = dataItem.BCNC_LSFT_NO;

                                if (BCNC_SE_CODE == '003') {

                                    if (dataItem.PIN_NO_1 !== null && dataItem.PIN_NO_2 !== null) {
                                        return '<div>' + BCNC_LSFT_NO.substring(0, 5) + '-' + BCNC_LSFT_NO.substring(5, 6) + '******</div>';
                                    } else if (dataItem.PIN_NO_1 == null) {
                                        return '';
                                    }
                                } else {

                                    if (BCNC_LSFT_NO.length == 10) {
                                        var result = BCNC_LSFT_NO.substring(0, 3) + '-' + BCNC_LSFT_NO.substring(3, 5) + '-' + BCNC_LSFT_NO.substring(5, 11);

                                        return '<div>' + result + '<div/>';
                                    } else {
                                        return '';
                                    }
                                }
                            },
                            title: "<img src='/images/ico/ico_check01.png'/>사업자등록번호(주민등록번호)",
                            width: 160
                        },
                        {field: "BCNC_RPRSNTV_NM", title: "대표자명", width: 80},
                        {field: "BCNC_TELNO", title: "전화번호", width: 90},
                        {field: "BCNC_BIZCND_NM", title: "업태", width: 90},
                        {field: "BCNC_INDUTY_NM", title: "업종", width: 90},
                        {field: "BCNC_ADRES", title: "주소", width: 300},
                        {
                            field: "BCNC_BANK_CODE_NM",
                            title: "<img src='/images/ico/ico_check01.png'/>은행명",
                            width: 90
                        },
                        {
                            field: "BCNC_ACNUT_NO",
                            title: "<img src='/images/ico/ico_check01.png'/>계좌번호",
                            width: 100
                        },
                        {
                            field: "TRANSFR_ACNUT_SE_CODE_NM",
                            title: "<img src='/images/ico/ico_check01.png'/>이체구분",
                            width: 120
                        },
                        {field: "SBSACNT_TRFRSN_CODE_NM", title: "이체구분", width: 100},
                        {field: "SBSIDY_BNKB_INDICT_CN", title: "내통장표시", width: 90},
                        {field: "BCNC_BNKB_INDICT_CN", title: "받는통장표시", width: 100}]
                }]
        }).data("kendoGrid");

        sendResolutionGrid.table.on("click", ".k-state-selected", selectRow);

        function selectRow() {

            var rowData = $("#sendResolutionGrid").data("kendoGrid").dataItem($(this).closest("tr"));

            console.log(rowData);

            necessaryDataColumn();
        }

        var checkedIds = {};

        // 체크박스 전체선택
        $("#checkboxAll").click(function (e) {

            if ($("#checkboxAll").is(":checked")) {
                $(".Ybox").prop("checked", true);
            } else {
                $(".mainCheckBox").prop("checked", false);
            }
        });

        function gridDataBound(e) {
            var grid = e.sender;

            if (grid.dataSource.total() == 0) {
                var colCount = 40; //rid.columns.length;
                $(e.sender.wrapper).find('tbody:eq(1)').append('<tr class="kendo-data-row"><td colspan="' + colCount + '" class="no-data">데이터가 없습니다.</td></tr>');
            } else {

            }
        }
    },

    fn_formatDate : function(str){
        return str.substring(0,4) + "-" + str.substring(4,6) + "-" + str.substring(6,8) ;
    },


    fn_formatMoney : function(str){
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    }

}