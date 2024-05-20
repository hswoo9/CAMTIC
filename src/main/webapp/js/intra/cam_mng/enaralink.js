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
            index: 0,
            select : onSelect
        });
        $("#fromMonth, #endMonth").attr("readonly", true);
        $("#fromMonth").data("kendoDatePicker").bind("change", enaralink.gridReload);
        $("#endMonth").data("kendoDatePicker").bind("change", enaralink.gridReload);

        $('#popUp').kendoWindow({
            width : "1000px",
            height : "450px",
            visible : false,
            modal : true,
            actions : [ "Close" ]
        }).data("kendoWindow").center();

        $('#cancle2').on('click', function (){
            $('#popUp').data('kendoWindow').close();
        });

        function onSelect(e) {
            var dataItem = this.dataItem(e.item.index());

            console.log(dataItem);
        }

        $("#btnGetPrufSeNo").on("click", function(){

            data = {
                ETXBL_CONFM_NO : $('#ETXBL_CONFM_NO2').val(),
                OUT_YN : '1',
                OUT_MSG : '1'
            };

            $.ajax({
                url : "/kukgoh/invoiceValidation",
                data : data,
                type : 'POST',
                success : function(result) {
                    console.log(result);
                    if (result.OUT_YN == 'Y'){
                        enaralink.fn_requestInvoice("txtInvoice" + idSeq, idSeq);
                    } else {
                        alert(result.OUT_MSG);
                        /*$('#btn'+idSeq).attr("disabled", false);*/
                    }
                }
            });
        });

        $(document).on({
            mouseenter : function() {
                $(this).addClass("font-underline");
            },
            mouseleave : function() {
                $(this).removeClass("font-underline");
            }
        }, '.grdCol');

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
                    parameterMap: function (data) {
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
            toolbar : [
                {
                    name : 'button',
                    template : function (){

                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="enaralink.fn_openSubmitPage(this);">' +
                            '	<span class="k-button-text">지출결의서 집행전송</span>' +
                            '</button>'+
                            '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="enaralink.fn_openInvoicePage(this);">' +
                            '	<span class="k-button-text">세금계산서 그리드</span>' +
                            '</button>'+

                            '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="enaralink.fn_searchBtn();">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                         /* '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="enaralink.fn_AllcancelData();">' +
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
                            '</button>' */
                    }
                }
            ],
            columns: [
                {
                    template: function (dataItem) {
                        if (dataItem.KUKGO_STATE === "전송완료" || dataItem.KUKGO_STATE === '전송진행중' || dataItem.KUKGO_STATE === '전송실패') {
                            return '<input type="button" class="" style="" onclick="enaralink.fn_openSubmitPage(this);" value="확인">';
                        } else {
                            return '<input type="button" class="" style="" onclick="enaralink.fn_openSubmitPage(this);" value="전송">';
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

                            return '<input type="button" id="" class="' + color + '" onclick="enaralink.fn_openInvoicePage(this);"value="' + msg + '"/>';
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
                                return "<span class='grdCol' style='color: blue;' onclick='enaralink.fn_docViewPop(" + dataItem.C_DIKEYCODE + ")'>" + dataItem.DOC_NUMBER + "</span>";
                            },
                            title: "문서번호", width: 120
                        },
                        {
                            template: function (dataItem) {
                                return "<span class='grdCol' style='color: blue;' onclick='enaralink.fn_docViewPop(" + dataItem.C_DIKEYCODE + ")'>" + dataItem.DOC_TITLE + "</span>";
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

            enaralink.necessaryDataColumn();
        }

        // 체크박스 전체선택
        $("#checkboxAll").click(function () {

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

    necessaryDataColumn : function() {

    },

    fn_searchBtn : function(){
        $('#sendResolutionGrid').data('kendoGrid').dataSource.page(1);
    },

    onDeptSeqSelect : function(e){
        var dataItem = this.dataItem(e.item.index());
        var selectDeptSeq = dataItem.dept_seq;
        $('#deptSeq').val(selectDeptSeq);

        if (selectDeptSeq === '99999') { // 전체
            $('#selectedEmpName').val('');
            $('#erpEmpSeq').val('');
            $('#erpDeptSeq').val('');
            return;
        }

        $.ajax({
            url: "/kukgoh/getErpDeptNum",
            dataType : 'json',
            data : { deptSeq : selectDeptSeq },
            type : 'POST',
            async : false,
            success: function(result){

                if (result.erpDeptSeq === '') {
                    alert("해당 부서에 아무도 없습니다.");
                } else {
                    $('#erpDeptSeq').val(result.erpDeptSeq);
                }
            }
        });

        $('#selectedEmpName').val('');
        $('#erpEmpSeq').val('');
    },

    fn_formatDate : function(str){
        return str.substring(0,4) + "-" + str.substring(4,6) + "-" + str.substring(6,8) ;
    },

    fn_formatMoney : function(str){
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    },


    pad : function(n, width) {
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
    },

    fn_openSubmitPage : function(e){  //New 지출결의서 집행등록(일괄) --전송/확인
		/*var flag = $(e).val() === "전송" ? 'S' : 'C'; // 전송 'S', 확인 'C'
 		var dataItem = $("#sendResolutionGrid").data("kendoGrid").dataItem($(e).closest("tr"));
		dataItem.flag = flag;

		// 이나라 파일 이름 구조 만들기
		dataItem.targetId = dataItem.GISU_DT + enaralink.pad(dataItem.GISU_SQ, 4) + enaralink.pad(dataItem.LN_SQ, 2);
		dataItem.intrfcId = 'IF-EXE-EFR-0074';

        console.log(JSON.stringify(dataItem));*/

		window.open("", "pop", "menubar=no,width=1550,height=770,toolbar=no, scrollbars=yes");
		/*$('#submitData').val(JSON.stringify(dataItem));

		console.log($("#submitData").val());*/

        document.submitPage.action = "/kukgoh/newResolutionSubmitPage";
		document.submitPage.target = "pop";
		document.submitPage.method = "post";
		document.submitPage.submit();

	},

    fn_makeSendData : function(dataJson) {
        dataJson.BCNC_ACNUT_NO = dataJson.BCNC_ACNUT_NO.replace(/\-/g,'');

        // 사업자등록번호 처리
        if((dataJson.BCNC_SE_CODE == '003')) {

            if (dataJson.BCNC_LSFT_NO.length == 7) {
                dataJson.PIN_NO_1 = dataJson.BCNC_LSFT_NO.substring(0,1);
                dataJson.PIN_NO_2 = dataJson.BCNC_LSFT_NO.substring(6,7);
            } else if (dataJson.PIN_NO_1 == null) {
                dataJson.PIN_NO_1 = "";
                dataJson.PIN_NO_2 = "";
            } else { // 개인 - 주민등록번호 있을 경우
                dataJson.PIN_NO_2 = dataJson.PIN_NO_2.substring(0, 1);
            }
        } else {
            dataJson.PIN_NO_1 = "";
            dataJson.PIN_NO_2 = "";
        }

        // 승인번호 없을 경우 (기타)
        if (typeof dataJson.PRUF_SE_NO === 'undefined') {
            dataJson.PRUF_SE_NO = '';
        }

        if (dataJson.SBSACNT_TRFRSN_CODE === null || !dataJson.SBSACNT_TRFRSN_CODE) {
            dataJson.SBSACNT_TRFRSN_CODE = "";
        }

        dataJson.EXCUT_PRPOS_CN = "[" + dataJson.DOC_NUMBER + "] " + dataJson.DOC_TITLE;
        dataJson.PRDLST_NM = "[" + dataJson.DOC_NUMBER + "] " + dataJson.DOC_TITLE;

        dataJson.SBSACNT_TRFRSN_CN = '';
        dataJson.PIN_NO = dataJson.PIN_NO_1 + dataJson.PIN_NO_2 + "000000";
        dataJson.APPLY_DIV = '★',
        dataJson.INSERT_IP = '',
        dataJson.INSERT_DT = '',
        dataJson.OUT_TRNSC_ID = '',
        dataJson.OUT_CNTC_SN = '',
        dataJson.OUT_CNTC_CREAT_DT = '',
        dataJson.OUT_YN = '',
        dataJson.OUT_MSG = '',
        dataJson.targetId = "" + dataJson.GISU_DT +  pad(dataJson.GISU_SQ, 4) + ""+ pad(dataJson.LN_SQ, 2);

        return dataJson;
    },

    fn_sendAccountBatch : function() {
        enaralink.startLoading();

        var resolutionList = [];

        $(".mainCheckBox:checked").each(function(i, v) {

            var rows = $("#sendResolutionGrid").data("kendoGrid").dataItem($(v).closest("tr"));

            rows = enaralink.fn_makeSendData(rows);

            resolutionList.push(rows);
        });

        console.log(resolutionList);

        $.ajax({
            url : "/kukgoh/sendResolutionList",
            data : { "param" : JSON.stringify(resolutionList) },
            dataType : "json",
            type : "POST",
            success : function() {

            },
            complete : function(result) {
                $('html').css("cursor", "auto");
                $('#loadingPop').data("kendoWindow").close();

                alert(result.OUT_MSG);
                enaralink.fn_searchBtn();
            }
        });
    },


    upFile : function() {
        $("#fileID").click();
    },

    getFileNm : function(e) {
        var index = $(e).val().lastIndexOf('\\') + 1;
        var valLength = $(e).val().length;
        var row = $(e).closest('dl');
        var fileNm = $(e).val().substr(index, valLength);
        row.find('#fileText').text(fileNm).css({'color':'#0033FF','margin-left':'5px'});
        enaralink.insertFile(fileNm);
    },

    delFile : function(attach_file_id, file_seq) {

        var data = {
            attach_file_id : attach_file_id,
            fileSeq : file_seq
        };

        $.ajax({
            url : "/kukgoh/deleteFile",
            type : 'GET',
            data : data
        }).success(function(result) {
            if(result.outYn == 'Y'){
                $('#test'+result.attach_file_id).closest('tr').remove();
            }else{
            }
        });
    },

    insertFile : function(fileNm){
        var dt = attachDataItem.GISU_DT.replace(/\-/g,'');
        var form = new FormData($("#fileForm")[0]);

        form.append("C_DIKEYCODE", attachDataItem.C_DIKEYCODE);
        form.append("targetId", dt+""+pad(attachDataItem.GISU_SQ, 4) + ""+ attachDataItem.LN_SQ);
        form.append("fileNm",fileNm);
        form.append("intrfcId", "IF-EXE-EFR-0074");

        $.ajax({
            url : "/kukgoh/insertAttachFile",
            data : form,
            type : 'post',
            processData : false,
            async: false,
            contentType : false,
            success : function(result) {

                if(result.outYn == 'Y'){
                    alert("첨부파일을 등록하였습니다.");
                    $('#FILE_ID').val("1");
                    $('#testDefault').remove();
                    $('#fileDiv').append(
                        '<tr id="test'+result.attach_file_id+'">'+
                        '<td class="">'+
                        '<span style=" display: block;" class="mr20">'+
                        '<img src="<c:url value="/Images/ico/ico_clip02.png"/>" alt="" />&nbsp;'+
                        '<a href="#n" style="line-height: 23px; cursor: pointer; color: #0033FF" id="fileText" onclick="kukgohFileDown(this);" class="file_name">'+result.fileNm+'.'+result.ext+'</a>&nbsp;'+
                        '&nbsp;'+
                        '<a href="javascript:delFile('+result.attach_file_id+','+result.file_seq+')"><img src="<c:url value="/Images/btn/btn_del_reply.gif"/>" /></a>' +
                        '<input type="hidden" id="fileId" class = "fileId" value="'+result.attach_file_id+'" />'+
                        '<input type="hidden" id="fileSeq" class = "fileSeq" value="'+result.file_seq+'" />'+

                        '</span>'+
                        '</td>'+
                        '</tr>'
                    );
                }else{
                    alert(result.outMsg);
                }
            },
            error : function(error) {
                console.log(error);
                console.log(error.status);
            }
        });
    },

    startLoading : function() {
        $('html').css("cursor", "wait");
        $('#loadingPop').data("kendoWindow").open();
    },

    fn_docViewPop : function(dikeyCode){
        enaralink.fn_viewDoc(dikeyCode);
    },

    fn_viewDoc : function(dikeyCode){
        var hostUrl = "";

        var url = hostUrl + "/ea/edoc/eapproval/docCommonDraftView.do?multiViewYN=Y&diSeqNum=undefined&miSeqNum=undefined&diKeyCode="+dikeyCode;
        window.open(url,"viewer","width=965, height=950, resizable=yes, scrollbars=yes, status=no, top=50, left=50","newWindow");
    },

    fn_requestInvoice : function(e){

        data = {
            CO_CD : $('#CO_CD').val(),
            GISU_DT : $('#GISU_DT').val(),
            GISU_SQ : $('#GISU_SQ').val(),
            BG_SQ : $('#BG_SQ').val(),
            LN_SQ : $('#LN_SQ').val(),
            BSNSYEAR : $('#BSNSYEAR').val(),
            FILE_ID : "",
            DDTLBZ_ID : $('#DDTLBZ_ID').val(),
            EXC_INSTT_ID : $('#EXC_INSTT_ID').val(),
            ETXBL_CONFM_NO : $('#'+e).val(),
            EMP_SEQ : $('#loginSeq').val()
        };

        $.ajax({
            url : "/kukgoh/requestInvoice",
            data : data,
            type : 'POST',
            success : function(result) {

                if (result.OUT_YN == 'Y') {
                    alert("전자세금계산서 조회를 요청하였습니다. \n 10 ~ 20분 후 집행전송이 가능합니다.");
                    $('#'+e).css('background-color','#c7c5c5');
                    $('#popUp').data('kendoWindow').close();
                } else {
                    alert(result.OUT_MSG);
                    /*$('#btn'+LN_SQ).attr("disabled", false);*/
                }
            }
        });
    },

    //New 지출결의서 집행등록(일괄) --전송/확인
    fn_openInvoicePage : function(e){
       /* var row = $(e).closest("tr");
       var grid = $('#sendResolutionGrid').data("kendoGrid");
       var data = grid.dataItem(row);

       selData = data;

       $('#BSNSYEAR').val(data.BSNSYEAR);
       $('#DDTLBZ_ID').val(data.DDTLBZ_ID);
       $('#EXC_INSTT_ID').val(data.EXC_INSTT_ID);
       $('#GISU_DT').val(data.GISU_DT);
       $('#GISU_SQ').val(data.GISU_SQ);
       $('#LN_SQ').val(data.LN_SQ);
       $("#BG_SQ").val(data.BG_SQ);
       $('#CO_CD').val(data.CO_CD); */

        var url = "/kukgoh/invoicePage";
        var name = "invoicePage";
        var option = "width=1100 height=400, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";
        var popup = window.open(url, name, option);

    },

}