let sum=0;
var rndDetail = {

    global : {
        codeCk: "N",
        taxCk: "N",

        bsPlanFileArray : [],
        bsPlanAttFiles : [],
        agreementFileArray : [],
        agreementAttFiles : [],
        etcFileArray : [],
        etcAttFiles : [],
    },

    fn_defaultScript : function (){
        rndDetail.fn_setPage();
        rndDetail.fn_setData();
    },

    fn_setPage : function (){
        customKendo.fn_textBox(["peoResCost", "carryoverCost", "peoResItem", "totResCost"]);

        $("#rndObj").kendoTextArea({
            rows : 7
        });

        $("#rndEtc").kendoTextArea({
            rows : 7
        });

        /*$("#bank").kendoDropDownList({
            dataTextField : "text",
            dataValueField : "value",
            dataSource : [
                {text : "전북은행", value : "1"},
            ],
        });*/

        /*$("input[name='resCardCheck']").click(function(){
            if($(this).val() == "Y"){
                $("#rccYRes").show();
            }else{
                $("#rccYRes").hide();
            }
        });*/

        /** 계 = 총 사업비 + 현금 + 현물 */
        /*$("#allResCost, #peoResCost, #peoResItem").keyup(function(){
            $("#allBusnCost").val(comma(
                Number(uncomma($("#allResCost").val()))
                + Number(uncomma($("#peoResCost").val()))
                + Number(uncomma($("#peoResItem").val()))
            ));
        });*/

        customKendo.fn_datePicker("nowStrDe", "month", "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("nowEndDe", "month", "yyyy-MM-dd", new Date());

        if($("#yearClass").val() == "S"){
            $("#nowStrDe").val($("#sbjStrDe").val())
            $("#nowEndDe").val($("#sbjEndDe").val())

            $(".nowYearBetween").css("display", "none");
        }


        /** 사업비 분리사용 유무 change 이벤트 */
        $("input[name='sbjSepYn']").change(function(){
            if($("input[name='sbjSepYn']:checked").val() == "Y"){
                $("#checkboxDiv").show();
            }else{
                $("#checkboxDiv").hide();
            }
        });

        var tooltip = $("#tooltip").kendoTooltip({
            filter: "span",
            width: 525,
            position: "top",
            animation: {
                open: {
                    effects: "zoom",
                    duration: 150
                }
            }
        }).data("kendoTooltip");
    },

    fn_setData : function (){
        var parameters = {
            pjtSn : $("#pjtSn").val(),
        }

        var pjtInfo = customKendo.fn_customAjax("/project/getProjectInfo", parameters);
        var result = customKendo.fn_customAjax("/projectRnd/getRndDetail", parameters);

        var pjtMap = pjtInfo.map;
        var rs = result.map;

        rndDetail.global.bsPlanFileArray = result.fileList.bsPlanFile;
        rndDetail.global.agreementFileArray = result.fileList.agreementFile;
        rndDetail.global.etcFileArray = result.fileList.etcFile;

        rndDetail.customBudgetGrid("/project/getProjectBudgetList.do", {pjtSn : $("#pjtSn").val()});

        /** 최초 저장 이후 데이터 세팅 */
        if(rs != null){
            $("#rndSn").val(rs.RND_SN);

            $("#nowStrDe").val(rs.NOW_STR_DE);
            $("#nowEndDe").val(rs.NOW_END_DE);

            if(rs.RND_OBJ != null) {
                $("#carryoverCost").val(comma(rs.CARRYOVER_COST));
                $("#peoResCost").val(comma(rs.PEO_RES_COST));
                $("#peoResItem").val(comma(rs.PEO_RES_ITEM));
                if($("#taxGubun").val() == "1"){
                    $("#totResCost").val(comma((rs.TOT_RES_COST * 10 / 11).toFixed(0)));
                } else {
                    $("#totResCost").val(comma(rs.TOT_RES_COST));
                }

                $("#rndObj").val(rs.RND_OBJ);
                $("#rndEtc").val(rs.RND_ETC);

                // var fileHtml = "";
                // fileHtml += '<span style="cursor: pointer" onClick="fileDown(\''+rs.file_path+rs.file_uuid+ '\', \''+rs.file_org_name+'.'+rs.file_ext+'\')">'+rs.file_org_name+ '.' + rs.file_ext + '</span>'
                // if (rs.file_org_name != null) {
                //     $("#bsPlanFileName").html(fileHtml);
                // }

                var fileInfo = {
                    file_path : rs.file_path,
                    file_uuid : rs.file_uuid,
                    file_org_name : rs.file_org_name,
                    file_ext : rs.file_ext,
                    file_no : rs.file_no
                }
                if(rs.file_org_name != null){
                    rndDetail.global.bsPlanFileArray.push(fileInfo);
                }

                let AcResult = customKendo.fn_customAjax("/projectRnd/getAccountInfo", {
                    pjtSn: pjtMap.PJT_SN
                });
                if (pjtMap.SBJ_SEP != undefined) {
                    if (pjtMap.SBJ_SEP == "Y") {
                        $("#sbjSepY").prop("checked", true);
                        $("#checkboxDiv").show();
                        for (let i = 0; i < AcResult.list.length; i++) {
                            $("#at" + AcResult.list[i].IS_TYPE).prop('checked', true);
                        }
                    } else {
                        $("#sbjSepN").prop("checked", true);
                    }
                }

                const list = AcResult.list;
                let arr = [];
                let firstValue = "";

                let sum = {
                    label: "총괄",
                    value: "-1"
                };
                arr.push(sum);

                for (let i = 0; i < list.length; i++) {
                    let label = "";
                    if (list[i].IS_TYPE == "1") {
                        label = "국비";
                    } else if (list[i].IS_TYPE == "2") {
                        label = "도비";
                    } else if (list[i].IS_TYPE == "3") {
                        label = "시비";
                    } else if (list[i].IS_TYPE == "4") {
                        label = "자부담";
                    } else if (list[i].IS_TYPE == "5") {
                        label = "업체부담";
                    } else if (list[i].IS_TYPE == "9") {
                        label = "기타";
                    }
                    let data = {
                        label: label,
                        value: list[i].IS_TYPE == "9" ? "6" : list[i].IS_TYPE
                    };
                    arr.push(data);
                    if (i == 0) {
                        firstValue = -1;
                    }
                }

                if (list.length == 0) {
                    arr = [
                        {
                            label: "사업비",
                            value: 0
                        }
                    ];
                    firstValue = 0;
                }
                customKendo.fn_radioGroup("budgetType", arr, "horizontal");
                $("#budgetType").data("kendoRadioGroup").value(firstValue);

                for (let i = -1; i <= 6; i++) {
                    $("#customBudgetGrid" + i).hide();
                }

                $("#customBudgetGrid" + firstValue).show();

                $("#budgetType").data("kendoRadioGroup").bind("change", function () {
                    for (let i = -1; i <= 6; i++) {
                        $("#customBudgetGrid" + i).hide();
                    }
                    $("#customBudgetGrid" + $("#budgetType").data("kendoRadioGroup").value()).show();
                })

                $(".budgetExDiv").show();

                $("#peoResCost").val($("#totResCost").val());
            }

        }

        /** 버튼 세팅 */
        rndDetail.fn_buttonSet(rs, pjtMap);

        const pjtInfo2 = customKendo.fn_customAjax("/project/getProjectStep", parameters);
        const map = pjtInfo2.rs;
        if(map != null && map.CODE_VAL != null){
            rndDetail.global.codeCk = "Y";
        }
        if(map != null && map.TAX_GUBUN != null){
            rndDetail.global.taxCk = "Y";
        }

        /** 첨부파일 세팅 */
        rndDetail.fn_fileSet();
    },

    fn_save : function (){
        var parameters = {
            pjtSn : $("#pjtSn").val(),

            allBusnCost : 0,

            //bankSn : $("#bank").val(),
            //bankNm : $("#bank").data("kendoDropDownList").text(),
            //bankNo : $("#bankNo").val(),
            //accHold : $("#accHold").val(),

            /*allResCost : uncomma($("#allResCost").val()),*/
            peoResCost : uncomma($("#peoResCost").val()),
            peoResItem : uncomma($("#peoResItem").val()),
            totResCost : uncomma($("#totResCost").val()),

            nowStrDe : $("#nowStrDe").val(),
            nowEndDe : $("#nowEndDe").val(),

            //resCardCheck : $("input[name='resCardCheck']:checked").val(),
            //resCardNo : $("#resCardNo").val(),

            /*delvDay : $("#delvDay").val(),
            resDay : $("#resDay").val(),*/

            rndObj : $("#rndObj").val(),
            rndEtc : $("#rndEtc").val(),
            empSeq : $("#mngEmpSeq").val(),
            regEmpSeq : $("#regEmpSeq").val()
        }

        if($("#rndSn").val() != "" && $("#rndSn").val() != null){
            parameters.rndSn = $("#rndSn").val();
            parameters.stat = "upd"
        } else {
            parameters.stat = "ins"
        }

        $("input[name='sbjSepYn']").each(function(){
            if($(this).is(":checked")){
                parameters.sbjSep = this.value;
            }
        });

        if($("input[name='sbjSepYn']:checked").val() == "Y"){
            const checkBox = 'input[name="accountType"]:checked';
            const selectedElements = document.querySelectorAll(checkBox);

            let arr = new Array();
            selectedElements.forEach((el) => {
                let row = {
                    value: el.value,
                }
                arr.push(row);
            });

            if(arr.length == 0) {
                alert("사업비 항목이 선택되지 않았습니다.");
                return;
            }

            parameters.accountList = JSON.stringify(arr);
        }

        var fd = new FormData();
        for(var key in parameters){
            fd.append(key, parameters[key]);
        }

        if(rndDetail.global.bsPlanAttFiles != null){
            for(var i = 0; i < rndDetail.global.bsPlanAttFiles.length; i++){
                fd.append("bsPlanFileList", rndDetail.global.bsPlanAttFiles[i]);
            }
        }

        if(rndDetail.global.agreementAttFiles != null){
            for(var i = 0; i < rndDetail.global.agreementAttFiles.length; i++){
                fd.append("agreementFileList", rndDetail.global.agreementAttFiles[i]);
            }
        }

        if(rndDetail.global.etcAttFiles != null){
            for(var i = 0; i < rndDetail.global.etcAttFiles.length; i++){
                fd.append("etcFileList", rndDetail.global.etcAttFiles[i]);
            }
        }

        if(parameters.peoResItem == ""){
            alert("현물을 작성해주세요. (없을시 0 기입)");
            return;
        }

        if(rndDetail.global.bsPlanAttFiles.length == 0 && rndDetail.global.bsPlanFileArray.length == 0){
            alert("사업계획서를 등록해주세요.");
            return;
        }

        if(parameters.rndObj == ""){
            alert("사업 목적/내용을 작성해주세요.");
            return;
        }
        if(parameters.peoResCost == ""){
            parameters.peoResCost = 0;
        }
        if(parameters.peoResItem == ""){
            parameters.peoResItem = 0;
        }
        /*if(parameters.resCardCheck == "" || parameters.resCardCheck == null){
            alert("연구카드사용여부를 작성해주세요.");
            return;
        }*/

        var customBudget = new Array();

        for(let i=0; i<=6; i++){
            $.each($("#customBudgetGrid"+i).data("kendoGrid").dataSource.data(), function(){
                var data = {
                    pjtSn : $("#pjtSn").val(),
                    account : String(i),
                    CB_SN : this.CB_SN,
                    num : this.NUM,
                    cbCodeId1 : this.CB_CODE_ID_1,
                    cbCodeName1 : this.CB_CODE_NAME_1,
                    cbCodeId2 : this.CB_CODE_ID_2,
                    cbCodeName2 : this.CB_CODE_NAME_2,
                    cbCodeId3 : this.CB_CODE_ID_3,
                    cbCodeName3 : this.CB_CODE_NAME_3,
                    cbBudget : String(Number(this.CB_BUDGET)),
                    regEmpSeq : $("#regEmpSeq").val(),
                }
                customBudget.push(data);
            })
        }

        fd.append("customBudget", JSON.stringify(customBudget));

        $.ajax({
            url : "/projectRnd/setRndDetail",
            data : fd,
            type : "post",
            dataType : "json",
            contentType: false,
            processData: false,
            enctype : 'multipart/form-data',
            async : false,
            success : function(rs){
                if(rs.code == 200){
                    location.reload();
                }
            }
        });
    },

    delvDrafting: function() {
        var pjCode = $("#pjCode").val();
        var supDep = $("#supDep2").val();
        var supDepSub = $("#supDepSub2").val();
        var pjtStat = $("#pjtStat").val();
        var pjtStatSub = $("#pjtStatSub").val();

        var date = new Date();
        var year = date.getFullYear().toString().substring(2,4);

        var parameters = {
            pjtSn : $("#pjtSn").val(),
            pjtTmpCd : pjCode + supDep + supDepSub + pjtStat + pjtStatSub + year,
            stat : "10",
            regEmpName : $("#regEmpName").val()
        }

        if(pjCode == ""){
            alert("프로젝트 구분을 선택해주세요.");
            return;
        }
        if(supDep == ""){
            alert("지원부처를 선택해주세요.");
            return;
        }
        if(supDepSub == ""){
            alert("전담기관을 선택해주세요.");
            return;
        }
        if(pjtStat == ""){
            alert("사업성격을 선택해주세요.");
            return;
        }
        if(pjtStatSub == ""){
            alert("사업성격2를 선택해주세요.");
            return;
        }
        commonProject.loading();

        $.ajax({
            url : "/project/setDelvApprove",
            data : parameters,
            type : "post",
            dataType : "json",
            success : function (rs){
                $("#rndDelvDraftFrm").one("submit", function(){
                    const url = "/popup/cam_project/approvalFormPopup/rndDelvApprovalPop.do";
                    const name = "_self";
                    const option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=yes, scrollbars = yes, status=no, top=50, left=50";
                    window.open(url, name, option);
                    this.action = "/popup/cam_project/approvalFormPopup/rndDelvApprovalPop.do";
                    this.method = 'POST';
                    this.target = '_self';
                }).trigger("submit");
            }
        });
    },

    fn_buttonSet : function(rndMap, pjtMap){
        $(".budgetBtn").show();
        let buttonHtml = "";
        if(rndMap != null && pjtMap.PARENT_PJT_SN == null){
            let status = rndMap.STATUS
            if(status == "0" && rndMap.PEO_RES_COST != null){
                buttonHtml += "<button type=\"button\" id=\"delvApp2Btn\" style=\"float: right; margin-right: 5px;\" class=\"k-button k-button-solid-info\" onclick=\"openModalRnd()\">상신</button>";
                buttonHtml += "<button type=\"button\" id=\"delvSaveBtn\" style=\"float: right; margin-right: 5px; margin-bottom: 5px;\" class=\"k-button k-button-solid-info\" onclick=\"rndDetail.fn_save()\">저장</button>";
            }else if(status == "10" || status == "50"){
                buttonHtml += "<button type=\"button\" id=\"delvCanBtn\" style=\"float: right; margin-bottom: 10px;\" class=\"k-button k-button-solid-error\" onclick=\"docApprovalRetrieve('"+rndMap.DOC_ID+"', '"+rndMap.APPRO_KEY+"', 1, 'retrieve');\">회수</button>";
            }else if(status == "20"){
                buttonHtml += "<button type=\"button\" id=\"delvAppBtn\" style=\"float: right; margin-bottom: 10px;\" class=\"k-button k-button-solid-base\" onclick=\"approveDocView('"+rndMap.DOC_ID+"', '"+rndMap.APPRO_KEY+"', '"+rndMap.DOC_MENU_CD+"');\">결재중</button>";
            }else if(status == "30" || status == "40"){
                buttonHtml += "<button type=\"button\" id=\"delvSaveBtn\" style=\"float: right; margin-bottom: 5px;\" class=\"k-button k-button-solid-info\" onclick=\"rndDetail.fn_save()\">저장</button>";
                buttonHtml += "<button type=\"button\" id=\"delvReBtn\" style=\"float: right; margin-right: 5px;\" class=\"k-button k-button-solid-info\" onclick=\"tempOrReDraftingPop('"+rndMap.DOC_ID+"', '"+rndMap.DOC_MENU_CD+"', '"+rndMap.APPRO_KEY+"', 2, 'reDrafting');\">재상신</button>";

            }else if(status == "100"){
                buttonHtml += "<button type=\"button\" id=\"delvAppBtn\" style=\"float: right; margin-bottom: 10px;\" class=\"k-button k-button-solid-base\" onclick=\"approveDocView('"+rndMap.DOC_ID+"', '"+rndMap.APPRO_KEY+"', '"+rndMap.DOC_MENU_CD+"');\">열람</button>";

                const pjtResult = customKendo.fn_customAjax("/project/getProjectInfo", {pjtSn : $("#pjtSn").val()});
                const pjtMap = pjtResult.map;
                if(pjtMap.DELV_APPROVE_STAT != 100){
                    buttonHtml += "<span style=\"float: right; position: relative; top: 5px; right: 5px;\"><b style='color: blue'>프로젝트 코드 승인 중...</b></span>";
                }else{
                    buttonHtml += "<span style=\"float: right; position: relative; top: 5px; right: 5px;\"><b style='color: red'>수주승인 완료</b></span>";
                }

                $(".budgetBtn").hide();
            }else if(status == "111"){
                buttonHtml += "<button type=\"button\" id=\"delvTempBtn\" style=\"float: right; margin-bottom: 5px;\" class=\"k-button k-button-solid-base\" onclick=\"tempOrReDraftingPop('"+rndMap.DOC_ID+"', 'delv', '"+rndMap.APPRO_KEY+"', 2, 'tempDrafting');\">전자결재 임시저장 중</button>";
            }else{
                buttonHtml += "<button type=\"button\" id=\"delvSaveBtn\" style=\"float: right; margin-right: 5px; margin-bottom: 5px;\" class=\"k-button k-button-solid-info\" onclick=\"rndDetail.fn_save()\">저장</button>";
            }

            if(status == "10" || status == "20" || status == "50" || status == "100"){
                this.fn_kendoUIEnableSet()
            }
        }else{
            buttonHtml += "<button type=\"button\" id=\"delvSaveBtn\" style=\"float: right; margin-right: 5px; margin-bottom: 5px;\" class=\"k-button k-button-solid-info\" onclick=\"rndDetail.fn_save()\">저장</button>";
        }
        $("#detailBtnDiv").html(buttonHtml);

        if(rndMap != null && rndMap.DOC_ID != null){
            reDraftOnlyOne(rndMap.DOC_ID, $("#delvRegEmpSeq").val(), "delvReBtn");
        }
    },

    fn_kendoUIEnableSet : function(){
        $('input[name="sbjSepYn"]').attr('disabled', true);
        $('#rndObj').attr('disabled', true).css("opacity", ".6");
        $('#rndEtc').attr('disabled', true).css("opacity", ".6");
        $('#peoResItem').attr('disabled', true).css("opacity", ".6");
        $('label[for="bsPlanFileList"]').attr('disabled', true);
        $('label[for="agreementFileList"]').attr('disabled', true);
        $('label[for="etcFileList"]').attr('disabled', true);
    },

    customBudgetGrid : function(url, params){
        $("#customBudgetGrid-1").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params, 200),
            sortable: true,
            scrollable: true,
            selectable: "row",
            noRecords: {
                template: "저장 할 때마다 합계가 갱신됩니다."
            },
            editable : function (){
                return true;
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" onclick="fn_checkAll(\'checkAll\', \'pCbPk\');"/>',
                    template : "<input type='checkbox' id='pCbPk#=CB_SN#' name='pCbPk' class='pCbPk' value='#=CB_SN#'/>",
                    width: 50
                }, {
                    title: "장",
                    field : "CB_CODE_NAME_1",
                    editable: function(){
                        return false;
                    },
                }, {
                    title: "관",
                    field : "CB_CODE_NAME_2",
                    editable: function(){
                        return false;
                    },
                }, {
                    title: "항",
                    field : "CB_CODE_NAME_3",
                    footerTemplate: "합계",
                    template : function(e){
                        return e.CB_CODE_NAME_3
                    },
                    editable: function(){
                        return false;
                    },
                }, {
                    title: "예산액",
                    field : "CB_BUDGET",
                    template : function(e){
                        sum += Number(e.CB_BUDGET);
                        return fn_numberWithCommas(e.CB_BUDGET);
                    },
                    footerTemplate : function (e) {
                        return "<span id='total-1'></span>";
                    },
                    attributes: { style: "text-align: right" },
                },

            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            },
            dataBound: function(){
                $("#total-1").text(fn_numberWithCommas(sum));
                sum = 0;
            }
        }).data("kendoGrid");

        $('#customBudgetGrid-1').on('blur', '[id="CB_BUDGET"]', function(e){
            var total = 0;
            $.each($("#customBudgetGrid-1").data("kendoGrid").dataSource.data(), function(){
                total += Number(this.CB_BUDGET);
            })
            $("#total-1").text(comma(total))
        })

        for(let i=0; i<=6; i++) {
            params.account = String(i);
            $("#customBudgetGrid"+i).kendoGrid({
                dataSource: customKendo.fn_gridDataSource2(url, params, 200),
                sortable: true,
                scrollable: true,
                selectable: "row",
                noRecords: {
                    template: "데이터가 존재하지 않습니다."
                },
                toolbar: [
                    {
                        name: 'button',
                        template: function(){
                            return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base budgetBtn" onclick="rndDetail.fn_carryoverAppBtn()">' +
                                '	<span class="k-button-text">이월잔액 변경</span>' +
                                '</button>';
                        }
                    }, {
                        name: 'button',
                        template: function(){
                            return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base budgetBtn" onclick="rndDetail.fn_carryoverCanBtn('+i+')">' +
                                '	<span class="k-button-text">이월잔액 취소</span>' +
                                '</button>';
                        }
                    }, {
                        name: 'button',
                        template: function(){
                            return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base budgetBtn" onclick="rndDetail.fn_customBudgetPop('+i+')">' +
                                '	<span class="k-button-text">추가</span>' +
                                '</button>';
                        }
                    }, {
                        name: 'button',
                        template: function(){
                            return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base budgetBtn" onclick="rndDetail.setCustomBudgetDel('+i+')">' +
                                '	<span class="k-button-text">삭제</span>' +
                                '</button>';
                        }
                    }
                ],
                editable : function (){
                    return true;
                },
                columns: [
                    {
                        headerTemplate: '<input type="checkbox" id="checkAll'+i+'" name="checkAll" onclick="fn_checkAll(\'checkAll'+i+'\', \'pCbPk'+i+'\');"/>',
                        template : "<input type='checkbox' id='pCbPk#=CB_SN#' name='pCbPk"+i+"' class='pCbPk' value='#=CB_SN#'/>",
                        width: 50
                    }, {
                        title: "장",
                        field : "CB_CODE_NAME_1",
                        editable: function(){
                            return false;
                        },
                    }, {
                        title: "관",
                        field : "CB_CODE_NAME_2",
                        editable: function(){
                            return false;
                        },
                    }, {
                        title: "항",
                        field : "CB_CODE_NAME_3",
                        footerTemplate: "합계",
                        template : function(e){
                            return e.CB_CODE_NAME_3
                        },
                        editable: function(){
                            return false;
                        },
                    }, {
                        title: "예산액",
                        field : "CB_BUDGET",
                        template : function(e){
                            sum += Number(e.CB_BUDGET);
                            return "<span style='text-align:right'>"+fn_numberWithCommas(e.CB_BUDGET)+"</span>";
                        },
                        footerTemplate : function (e) {
                            return "<span style='text-align:right' id='total"+i+"'></span>";
                        }
                    }, {
                        title: "이월잔액여부",
                        template : function(e){
                            let text = "";
                            if(e.CARRYOVER_CK == "Y"){
                                text = "O";
                            }
                            return text;
                        },
                        width: 100,
                        editable: function(){
                            return false;
                        },
                    }

                ],
                dataBinding: function(){
                    record = fn_getRowNum(this, 2);
                },
                dataBound: function(){
                    $("#total"+i).text(fn_numberWithCommas(sum));
                    sum = 0;
                }
            }).data("kendoGrid");

            $('#customBudgetGrid'+i).on('blur', '[id="CB_BUDGET"]', function(e){
                var total = 0;
                $.each($("#customBudgetGrid"+i).data("kendoGrid").dataSource.data(), function(){
                    total += Number(this.CB_BUDGET);
                })
                $("#total"+i).text(comma(total))
            })
        }
    },

    cbGridAddRow : function(e, ac){
        $("#customBudgetGrid"+ac).data("kendoGrid").dataSource.data([]);
        for(var i = 0; i < e.length; i++){
            $("#customBudgetGrid"+ac).data("kendoGrid").dataSource.add({
                NUM : e[i].NUM,
                CB_SN : e[i].CB_SN,
                CB_CODE_ID_1 : e[i].CB_CODE_ID_1,
                CB_CODE_NAME_1 : e[i].CB_CODE_NAME_1,
                CB_CODE_ID_2 : e[i].CB_CODE_ID_2,
                CB_CODE_NAME_2 : e[i].CB_CODE_NAME_2,
                CB_CODE_ID_3 : e[i].CB_CODE_ID_3,
                CB_CODE_NAME_3 : e[i].CB_CODE_NAME_3,
                CB_BUDGET : e[i].CB_BUDGET,
            });
        }
    },

    fn_customBudgetPop : function (i){
        var url = "/project/pop/customBudgetPop.do?path=rndDetail&pjtSn=" + $("#pjtSn").val() + "&ac=" + i;
        var name = "_blank";
        var option = "width = 1000, height = 750, top = 100, left = 200, location = no";
        var popup = window.open(url, name, option);
    },

    setCustomBudgetDel : function(i){
        if($("input[name='pCbPk"+i+"']:checked").length == 0){ alert("삭제할 예산을 선택해주세요."); return; }
        if(confirm("선택한 코드를 삭제하시겠습니까?\n수정 후 자동저장 됩니다.")) {
            var grid = $("#customBudgetGrid"+i).data("kendoGrid");
            $.each($("input[name='pCbPk"+i+"']:checked"), function(i, v){
                grid.removeRow($(v).closest("tr"));
            });
        }
        rndDetail.fn_save();
    },

    fileChange : function(e){

        if(e == "bsPlan"){
            for(var i = 0; i < $("input[name='bsPlanFileList']")[0].files.length; i++){
                rndDetail.global.bsPlanAttFiles.push($("input[name='bsPlanFileList']")[0].files[i]);
            }

            $("#bsPlanFileName").empty();
            if(rndDetail.global.bsPlanAttFiles.length > 0){
                var html = '';
                for (var i = 0; i < rndDetail.global.bsPlanAttFiles.length; i++) {
                    html += '<div>';
                    html += rndDetail.global.bsPlanAttFiles[i].name;
                    html += '<input type="button" value="X" class="" style="margin-left: 5px; border: none; background-color: transparent; color: red; font-weight: bold;" onclick="rndDetail.fnUploadFile(\'bsPlan\',' + i + ');">';
                    html += '</div>';
                }

                $("#bsPlanFileName").append(html);
            }
        } else if(e == "agreement"){
            for(var i = 0; i < $("input[name='agreementFileList']")[0].files.length; i++){
                rndDetail.global.agreementAttFiles.push($("input[name='agreementFileList']")[0].files[i]);
            }

            $("#agreementFileName").empty();
            if(rndDetail.global.agreementAttFiles.length > 0){
                var html = '';
                for (var i = 0; i < rndDetail.global.agreementAttFiles.length; i++) {
                    html += '<div>';
                    html += rndDetail.global.agreementAttFiles[i].name;
                    html += '<input type="button" value="X" class="" style="margin-left: 5px; border: none; background-color: transparent; color: red; font-weight: bold;" onclick="rndDetail.fnUploadFile(\'agreement\',' + i + ');">';
                    html += '</div>';
                }

                $("#agreementFileName").append(html);
            }
        } else if(e == "etc"){
            for(var i = 0; i < $("input[name='etcFileList']")[0].files.length; i++){
                rndDetail.global.etcAttFiles.push($("input[name='etcFileList']")[0].files[i]);
            }

            $("#etcFileName").empty();
            if(rndDetail.global.etcAttFiles.length > 0){
                var html = '';
                for (var i = 0; i < rndDetail.global.etcAttFiles.length; i++) {
                    html += '<div>';
                    html += rndDetail.global.etcAttFiles[i].name;
                    html += '<input type="button" value="X" class="" style="margin-left: 5px; border: none; background-color: transparent; color: red; font-weight: bold;" onclick="rndDetail.fnUploadFile(\'etc\',' + i + ');">';
                    html += '</div>';
                }

                $("#etcFileName").append(html);
            }
        }
    },

    fnUploadFile : function(e, i) {
        if(e == "bsPlan"){
            const dataTransfer = new DataTransfer();
            let fileArray = Array.from(rndDetail.global.bsPlanAttFiles);
            fileArray.splice(i, 1);
            fileArray.forEach(file => {
                dataTransfer.items.add(file);
            });

            rndDetail.global.bsPlanAttFiles = dataTransfer.files;

            if(rndDetail.global.bsPlanAttFiles.length > 0){
                $("#bsPlanFileName").empty();

                var html = '';
                for (var i = 0; i < rndDetail.global.bsPlanAttFiles.length; i++) {
                    html += '<div>';
                    html += rndDetail.global.bsPlanAttFiles[i].name;
                    html += '<input type="button" value="X" class="" style="margin-left: 5px; border: none; background-color: transparent; color: red; font-weight: bold;" onclick="rndDetail.fnUploadFile(\'bsPlan\',' + i + ');">';
                    html += '</div>';
                }

                $("#bsPlanFileName").append(html);
            } else {
                $("#bsPlanFileName").empty();
            }

            if(rndDetail.global.bsPlanAttFiles.length == 0){
                rndDetail.global.bsPlanAttFiles = new Array();
            }

            rndDetail.global.bsPlanAttFiles = Array.from(rndDetail.global.bsPlanAttFiles);

        } else if(e == "agreement"){
            const dataTransfer = new DataTransfer();
            let fileArray = Array.from(rndDetail.global.agreementAttFiles);
            fileArray.splice(i, 1);
            fileArray.forEach(file => {
                dataTransfer.items.add(file);
            });

            rndDetail.global.agreementAttFiles = dataTransfer.files;

            if(rndDetail.global.agreementAttFiles.length > 0){
                $("#agreementFileName").empty();

                var html = '';
                for (var i = 0; i < rndDetail.global.agreementAttFiles.length; i++) {
                    html += '<div>';
                    html += rndDetail.global.agreementAttFiles[i].name;
                    html += '<input type="button" value="X" class="" style="margin-left: 5px; border: none; background-color: transparent; color: red; font-weight: bold;" onclick="rndDetail.fnUploadFile(\'agreement\',' + i + ');">';
                    html += '</div>';
                }

                $("#agreementFileName").append(html);
            } else {
                $("#agreementFileName").empty();
            }

            if(rndDetail.global.agreementAttFiles.length == 0){
                rndDetail.global.agreementAttFiles = new Array();
            }

            rndDetail.global.agreementAttFiles = Array.from(rndDetail.global.agreementAttFiles);

        } else if(e == "etc"){
            const dataTransfer = new DataTransfer();
            let fileArray = Array.from(rndDetail.global.etcAttFiles);
            fileArray.splice(i, 1);
            fileArray.forEach(file => {
                dataTransfer.items.add(file);
            });

            rndDetail.global.etcAttFiles = dataTransfer.files;

            if(rndDetail.global.etcAttFiles.length > 0){
                $("#etcFileName").empty();

                var html = '';
                for (var i = 0; i < rndDetail.global.etcAttFiles.length; i++) {
                    html += '<div>';
                    html += rndDetail.global.etcAttFiles[i].name;
                    html += '<input type="button" value="X" class="" style="margin-left: 5px; border: none; background-color: transparent; color: red; font-weight: bold;" onclick="rndDetail.fnUploadFile(\'etc\',' + i + ');">';
                    html += '</div>';
                }

                $("#etcFileName").append(html);
            } else {
                $("#etcFileName").empty();
            }

            if(rndDetail.global.etcAttFiles.length == 0){
                rndDetail.global.etcAttFiles = new Array();
            }

            rndDetail.global.etcAttFiles = Array.from(rndDetail.global.etcAttFiles);
        }
    },

    fn_fileSet : function(){
        if(rndDetail.global.bsPlanFileArray.length > 0){
            var fileArray = rndDetail.global.bsPlanFileArray;
            var html = '';

            for (var i = 0; i < rndDetail.global.bsPlanFileArray.length; i++) {
                html += '<div>';
                html += '<span style="cursor: pointer" onclick="fileDown(\''+fileArray[i].file_path+fileArray[i].file_uuid+ '\', \''+fileArray[i].file_org_name+'.'+fileArray[i].file_ext+'\')">'+fileArray[i].file_org_name+ '.' + fileArray[i].file_ext + '</span>';
                html += '<input type="button" value="X" class="" style="margin-left: 5px; border: none; background-color: transparent; color: red; font-weight: bold;" onclick="rndDetail.commonFileDel(\'' + fileArray[i].file_no + '\', this, \'bsPlan\');">';
                html += '</div>';
            }

            $("#bsPlanFileSetName").append(html);
        }

        if(rndDetail.global.agreementFileArray.length > 0){
            var fileArray = rndDetail.global.agreementFileArray;
            var html = '';

            for (var i = 0; i < rndDetail.global.agreementFileArray.length; i++) {
                html += '<div>';
                html += '<span style="cursor: pointer" onclick="fileDown(\''+fileArray[i].file_path+fileArray[i].file_uuid+ '\', \''+fileArray[i].file_org_name+'.'+fileArray[i].file_ext+'\')">'+fileArray[i].file_org_name+ '.' + fileArray[i].file_ext + '</span>';
                html += '<input type="button" value="X" class="" style="margin-left: 5px; border: none; background-color: transparent; color: red; font-weight: bold;" onclick="rndDetail.commonFileDel(\'' + fileArray[i].file_no + '\', this, \'agreement\');">';
                html += '</div>';
            }

            $("#agreementFileSetName").append(html);
        }

        if(rndDetail.global.etcFileArray.length > 0){
            var fileArray = rndDetail.global.etcFileArray;
            var html = '';

            for (var i = 0; i < rndDetail.global.etcFileArray.length; i++) {
                html += '<div>';
                html += '<span style="cursor: pointer" onclick="fileDown(\''+fileArray[i].file_path+fileArray[i].file_uuid+ '\', \''+fileArray[i].file_org_name+'.'+fileArray[i].file_ext+'\')">'+fileArray[i].file_org_name+ '.' + fileArray[i].file_ext + '</span>';
                html += '<input type="button" value="X" class="" style="margin-left: 5px; border: none; background-color: transparent; color: red; font-weight: bold;" onclick="rndDetail.commonFileDel(\'' + fileArray[i].file_no + '\', this, \'etc\');">';
                html += '</div>';
            }

            $("#etcFileSetName").append(html);
        }
    },

    commonFileDel: function(e, v, type){
        if(confirm("삭제한 파일은 복구할 수 없습니다.\n그래도 삭제하시겠습니까?")){
            $.ajax({
                url: "/common/commonFileDel",
                data: {
                    fileNo: e
                },
                type: "post",
                datatype: "json",
                success: function (rs) {
                    var rs = rs.rs;
                    alert(rs.message);
                    if(rs.code == "200"){
                        $(v).parent().hide();

                        if(type == "bsPlan"){
                            rndDetail.global.bsPlanFileArray.forEach((item, index) => {
                                if(item.file_no == e){
                                    rndDetail.global.bsPlanFileArray.splice(index, 1);
                                }
                            });
                        }

                        if(type == "agreement"){
                            rndDetail.global.agreementFileArray.forEach((item, index) => {
                                if(item.file_no == e){
                                    rndDetail.global.agreementFileArray.splice(index, 1);
                                }
                            });
                        }

                        if(type == "etc"){
                            rndDetail.global.etcFileArray.forEach((item, index) => {
                                if(item.file_no == e){
                                    rndDetail.global.etcFileArray.splice(index, 1);
                                }
                            });
                        }
                    }
                }
            });
        }
    },

    fn_carryoverAppBtn: function(){
        let bgtArr = [];
        $("input.pCbPk:checked").each(function(i){
            bgtArr.push($(this).val());
        })
        let data = {
            pjtSn: $("#pjtSn").val(),
            bgtList: bgtArr.join(),
            stat: "Y"
        }
        if(bgtArr.length == 0) {
            alert("비목이 선택되지 않았습니다.");
            return;
        }

        const result = customKendo.fn_customAjax("/projectRnd/carryoverApp", data);

        if(result.code != 200){
            alert("저장 중 오류가 발생하였습니다.");
        }else{
            location.reload();
        }
    },

    fn_carryoverCanBtn: function(){
        let bgtArr = [];
        $("input.pCbPk:checked").each(function(i){
            bgtArr.push($(this).val());
        })
        let data = {
            pjtSn: $("#pjtSn").val(),
            bgtList: bgtArr.join(),
            stat: "N"
        }
        if(bgtArr.length == 0) {
            alert("비목이 선택되지 않았습니다.");
            return;
        }

        const result = customKendo.fn_customAjax("/projectRnd/carryoverApp", data);

        if(result.code != 200){
            alert("저장 중 오류가 발생하였습니다.");
        }else{
            location.reload();
        }
    }
}

function fileDown(filePath, fileName, stat){
    if(stat == "recruit"){
        filePath = "http://218.158.231.189" + filePath;
    }
    kendo.saveAs({
        dataURI: "/common/fileDownload.do?filePath=" + filePath + "&fileName=" + encodeURIComponent(fileName),
    });
}