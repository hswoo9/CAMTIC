var enaralink = {

    global: {
        dropDownDataSource: "",
        searchAjaxData: "",
        saveAjaxData: "",
        selData: ""
    },

    fn_defaultScript: function () {

        enaralink.global.dropDownDataSource = [
            { text: "내 지출결의서 조회", value: "emp" },
        ]
        customKendo.fn_dropDownList("searchType", enaralink.global.dropDownDataSource, "text", "value");
        $("#searchType").data("kendoDropDownList").select(1);

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
                {text: "전체", value: ""},
                {text: "미전송", value: "A"},
                {text: "전송진행중", value: "B"},
                {text: "전송완료", value: "C"},
                {text: "전송실패", value: "D"}
            ],
            index: 0
        });
        $("#fromMonth, #endMonth").attr("readonly", true);
        $("#fromMonth").data("kendoDatePicker").bind("change", enaralink.gridReload);
        $("#endMonth").data("kendoDatePicker").bind("change", enaralink.gridReload);


        enaralink.mainGrid();
    },

    gridReload : function(){
        if($("#sendResolutionGrid").data("kendoGrid") != null){
            $("#sendResolutionGrid").data("kendoGrid").destroy();
        }

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
                    data.status = $("#status").data("kendoDropDownList").value();

                    data.searchType = $("#searchType").val();
                    if($("#searchType").val() == "emp"){
                        data.empSeq = $("#myEmpSeq").val();
                    }

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
            resizable: true,
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            toolbar : [
                {
                    name : 'button',
                    template : function (){

                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="enaralink.fn_enaraStatChange(\'succ\');">' +
                            '	<span class="k-button-text">전송완료처리</span>' +
                            '</button>'+
                            '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="enaralink.fn_enaraStatChange(\'cancle\');">' +
                            '	<span class="k-button-text">미전송처리</span>' +
                            '</button>'+
                            '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="enaralink.fn_enaraSendExcept();">' +
                            '	<span class="k-button-text">전송제외</span>' +
                            '</button>'+
                            // '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="enaraSendList.fn_enaraSendList();">' +
                            // '	<span class="k-button-text">집행정보 일괄전송</span>' +
                            // '</button>'+

                            '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="enaralink.gridReload()">' +
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

                        var sendChk = "N";
                        if(e.TRNSC_ID == null && e.REQ_STAT_SN == null) {
                            // 미전송
                            sendChk = "N";
                        } else if (e.RSP_CD != null) {
                            if(e.RSP_CD == "SUCC" && e.PROCESS_RESULT_CODE == "000") {
                                // 전송완료
                                sendChk = "Y";
                            } else if(e.RSP_CD == "SUCC" && e.PROCESS_RESULT_CODE == null) {
                                // 전송진행중
                                sendChk = "I";
                            } else if(e.RSP_CD.indexOf("ER") > -1 || (e.RSP_CD == "SUCC" && e.PROCESS_RESULT_CODE != "000" && e.PROCESS_RESULT_CODE != null)) {
                                // 전송실패
                                sendChk = "N";
                            }
                        } else if (e.REQ_STAT_SN != null && e.RSP_CD == null) {
                            // 전송진행중
                            sendChk = "I";
                        }

                        return "<input type='checkbox' id='payAppDet_"+e.PAY_APP_DET_SN+"' name='payAppDetChk' class='payAppDetChk'  value='"+e.PAY_APP_DET_SN+"' sendChk='"+sendChk+"'>";
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
                        if(e.LNK_PJT_SN == null || e.BG_SN == null){
                            return "<button type='button' class='k-button k-button-solid-primary' onclick='enaralink.fn_sendUnable(" + (e.LNK_PJT_SN != null ? e.LNK_PJT_SN : null) + "," + (e.BG_SN != null ? e.BG_SN : null) + ")'>전송불가</button>";
                        }else{
                            if(e.EVID_TYPE == 1 || e.EVID_TYPE == 2) {
                                if(e.ISS_RSP_CD == "SUCC" && e.ISS_PROCESS_RESULT_CODE == "000") {
                                    if (e.TRNSC_ID != null) {
                                        return "<button type='button' class='k-button k-button-solid-info' onclick='enaralink.fn_openSubmitPage("+e.PAY_APP_DET_SN+");'>확인</button>";
                                    } else {
                                        return "<button type='button' class='k-button k-button-solid-base' onclick='enaralink.fn_openSubmitPage("+e.PAY_APP_DET_SN+");'>전송</button>";
                                    }
                                } else {
                                    return "";
                                }
                            } else {
                                if(e.ENARA_MNG_STAT == "Y") {
                                    return "<button type='button' class='k-button k-button-solid-info' onclick='enaralink.fn_openSubmitPage("+e.PAY_APP_DET_SN+");'>확인</button>";
                                } else {
                                    if (e.TRNSC_ID != null) {
                                        return "<button type='button' class='k-button k-button-solid-info' onclick='enaralink.fn_openSubmitPage("+e.PAY_APP_DET_SN+");'>확인</button>";
                                    } else {
                                        return "<button type='button' class='k-button k-button-solid-base' onclick='enaralink.fn_openSubmitPage("+e.PAY_APP_DET_SN+");'>전송</button>";
                                    }
                                }
                            }
                        }
                    }
                },
                {
                    title: "전자(세금)계산서",
                    width: 100,
                    template : function(e) {
                        if (e.EVID_TYPE == 1 || e.EVID_TYPE == 2) {
                            if(e.ISS_RSP_CD == "SUCC" && e.ISS_PROCESS_RESULT_CODE == "000") {
                                return "<button type='button' class='k-button k-button-solid-info' onclick='enaralink.fn_evidCrmPopup("+e.PAY_APP_DET_SN+");'>설정완료</button>";
                            } else {
                                return "<button type='button' class='k-button k-button-solid-base' onclick='enaralink.fn_evidCrmPopup("+e.PAY_APP_DET_SN+");'>설정</button>";
                            }
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
                            width: 80,
                            template:function(e){
                                if(e.ENARA_MNG_STAT == "Y") {
                                    return "전송완료";
                                } else {
                                    if(e.TRNSC_ID == null && e.REQ_STAT_SN == null) {
                                        return "미전송";
                                    } else if (e.RSP_CD != null) {
                                        if(e.RSP_CD == "SUCC" && e.PROCESS_RESULT_CODE == "000") {
                                            return "전송완료";
                                        } else if(e.RSP_CD == "SUCC" && e.PROCESS_RESULT_CODE == null) {
                                            return "전송진행중";
                                        } else if(e.RSP_CD.indexOf("ER") > -1 || (e.RSP_CD == "SUCC" && e.PROCESS_RESULT_CODE != "000" && e.PROCESS_RESULT_CODE != null)) {
                                            return "<span style='color: red;'>전송실패</span>";
                                        }
                                    } else if (e.REQ_STAT_SN != null && e.RSP_CD == null) {
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
                            title: "결제수단",
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
                                if(e.RSP_CD === "SUCC" && e.PROCESS_RESULT_CODE == "000") {
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
                                if(e.RSP_CD === "SUCC" && e.PROCESS_RESULT_CODE == "000") {
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
                                if(e.RSP_CD === "SUCC" && e.PROCESS_RESULT_CODE == "000") {
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

    fn_sendUnable : function(l, b) {
        if(l == null && b == null){
            alert("사업프로젝트를 설정해주세요.<br>예산과목을 설정해주세요.");
        }else if(l == null){
            alert("사업프로젝트를 설정해주세요.");
        }else if(b == null){
            alert("예산과목을 설정해주세요.");
        }

        return;
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
                    enaralink.gridReload();
                },
                error: function (e) {
                    console.log('error : ', e);
                }
            });
        }
    },

    fn_enaraStatChange : function(stat){
        if($("input[name='payAppDetChk']:checked").length == 0){
            alert("지급신청서 항목을 선택해주세요.");
            return;
        }

        var sendFlag = false;
        var sendFlag2 = false;

        var comfirmTxt = "";
        var status = "";
        if(stat == "succ"){

            $.each($("input[name=payAppDetChk]:checked"), function(){
                if($(this).attr("sendChk") == "I"){
                    sendFlag2 = true;
                }
            });

            if(sendFlag2){
                alert("전송 진행중인 지급신청서가 포함되어 있습니다.");
                return;
            }

            comfirmTxt = "전송완료 상태로 변경하시겠습니까?";
            status = "Y";
        }else{

            $.each($("input[name=payAppDetChk]:checked"), function(){
                if($(this).attr("sendChk") == "Y"){
                    sendFlag = true;
                }

                if($(this).attr("sendChk") == "I"){
                    sendFlag2 = true;
                }
            });

            if(sendFlag){
                alert("수동으로 전송완료 처리한 지급신청서만 변경 가능합니다.");
                return;
            }

            if(sendFlag2){
                alert("전송 진행중인 지급신청서가 포함되어 있습니다.");
                return;
            }

            comfirmTxt = "미전송 상태로 변경하시겠습니까?";
            status = "N";
        }

        if(confirm(comfirmTxt)){
            var payAppDetSn = "";

            $.each($("input[name='payAppDetChk']:checked"), function(){
                payAppDetSn += "," + $(this).val()
            })

            $.ajax({
                url: "/kukgoh/setEnaraMngStat",
                data: {
                    payAppDetSn : payAppDetSn.substring(1),
                    status : status
                },
                type: "post",
                dataType: "json",
                async: false,
                success: function(rs) {
                    alert("변경되었습니다.");
                    enaralink.gridReload();
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
    },
}