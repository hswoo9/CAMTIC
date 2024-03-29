let sum=0;
var rndDetail = {



    fn_defaultScript : function (){
        rndDetail.fn_setPage();
        rndDetail.fn_setData();
    },

    fn_setPage : function (){
        customKendo.fn_textBox(["mngDeptName", "mngEmpName"
            , "peoResCost", "peoResItem", "totResCost"]);

        $("#rndObj").kendoTextArea({
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

        /*customKendo.fn_datePicker("delvDay", "month", "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("resDay", "month", "yyyy-MM-dd", new Date());*/

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

        rndDetail.customBudgetGrid("/project/getProjectBudgetList.do", {pjtSn : $("#pjtSn").val()});

        /** 최초 저장 이후 데이터 세팅 */
        if(rs != null){
            $("#rndSn").val(rs.RND_SN);
            /*$("#allBusnCost").val(comma(rs.ALL_BUSN_COST));*/
            $("#mngDeptName").val(rs.MNG_DEPT_NAME);
            $("#mngEmpName").val(rs.MNG_EMP_NAME);
            $("#mngDeptSeq").val(rs.MNG_DEPT_SEQ);
            $("#mngEmpSeq").val(rs.MNG_EMP_SEQ);

            //$("#bank").data("kendoDropDownList").value(rs.BANK_SN);
            //$("#bankNo").val(rs.BANK_NO);
            //$("#accHold").val(rs.ACC_HOLD);

            /*$("#allResCost").val(comma(rs.ALL_RES_COST));*/
            $("#peoResCost").val(comma(rs.PEO_RES_COST));
            $("#peoResItem").val(comma(rs.PEO_RES_ITEM));
            $("#totResCost").val(comma(rs.TOT_RES_COST));

            /*if(rs.RES_CARD_CHECK == "Y"){
                $("input[name='resCardCheck'][value='Y']").prop("checked", true);
                $("#rccYRes").css("display", "");
            }else{
                $("input[name='resCardCheck'][value='N']").prop("checked", true);
                $("#rccYRes").css("display", "none");
            }*/
            //$("#resCardNo").val(rs.RES_CARD_NO);

            /*$("#delvDay").val(rs.DELV_DAY);
            $("#resDay").val(rs.RES_DAY);*/

            $("#rndObj").val(rs.RND_OBJ);

            $("#rndSn").val(rs.RND_SN);
            $("#bsPlanFileName").text(rs.file_org_name + "." + rs.file_ext);

            let AcResult = customKendo.fn_customAjax("/projectRnd/getAccountInfo", {
                pjtSn: pjtMap.PJT_SN
            });
            if(pjtMap.SBJ_SEP != undefined){
                if(pjtMap.SBJ_SEP == "Y"){
                    $("#sbjSepY").prop("checked", true);
                    $("#checkboxDiv").show();
                    for(let i=0; i<AcResult.list.length; i++){
                        $("#at" + AcResult.list[i].IS_TYPE).prop('checked',true);
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
                    value: list[i].IS_TYPE == "9" ? "6" : list[i].IS_TYPE
                };
                arr.push(data);
                if(i == 0){
                    firstValue = -1;
                }
            }

            if(list.length == 0){
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

            for(let i=-1; i<=6; i++){
                $("#customBudgetGrid"+i).hide();
            }

            $("#customBudgetGrid" + firstValue).show();

            $("#budgetType").data("kendoRadioGroup").bind("change", function(){
                for(let i=-1; i<=6; i++){
                    $("#customBudgetGrid"+i).hide();
                }
                $("#customBudgetGrid" + $("#budgetType").data("kendoRadioGroup").value()).show();
            })

            $("#budgetExDiv").show();

            $("#peoResCost").val($("#totResCost").val());
        }

        /** 버튼 세팅 */
        rndDetail.fn_buttonSet(rs);
    },

    fn_save : function (){
        var parameters = {
            pjtSn : $("#pjtSn").val(),

            allBusnCost : 0,
            mngDeptName : $("#mngDeptName").val(),
            mngEmpName : $("#mngEmpName").val(),
            mngDeptSeq : $("#mngDeptSeq").val(),
            mngEmpSeq : $("#mngEmpSeq").val(),

            //bankSn : $("#bank").val(),
            //bankNm : $("#bank").data("kendoDropDownList").text(),
            //bankNo : $("#bankNo").val(),
            //accHold : $("#accHold").val(),

            /*allResCost : uncomma($("#allResCost").val()),*/
            peoResCost : uncomma($("#peoResCost").val()),
            peoResItem : uncomma($("#peoResItem").val()),
            totResCost : uncomma($("#totResCost").val()),

            //resCardCheck : $("input[name='resCardCheck']:checked").val(),
            //resCardNo : $("#resCardNo").val(),

            /*delvDay : $("#delvDay").val(),
            resDay : $("#resDay").val(),*/

            rndObj : $("#rndObj").val(),

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

        if($("#bsPlanFile")[0].files.length == 1){
            fd.append("bsPlanFile", $("#bsPlanFile")[0].files[0]);
        }

        if(parameters.mngEmpSeq == ""){
            alert("과제책임자를 선택해주세요.");
            return;
        }

        if(parameters.peoResItem == ""){
            alert("현물을 작성해주세요. (없을시 0 기입)");
            return;
        }

        if($("#bsPlanFileName").text() == ""){
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

    fn_buttonSet : function(rndMap){
        $(".budgetBtn").show();
        let buttonHtml = "";
        if(rndMap != null){
            let status = rndMap.STATUS
            if(status == "0"){
                buttonHtml += "<button type=\"button\" id=\"delvApp2Btn\" style=\"float: right; margin-right: 5px;\" class=\"k-button k-button-solid-info\" onclick=\"openModal()\">상신</button>";
                buttonHtml += "<button type=\"button\" id=\"delvSaveBtn\" style=\"float: right; margin-right: 5px; margin-bottom: 5px;\" class=\"k-button k-button-solid-info\" onclick=\"rndDetail.fn_save()\">저장</button>";
            }else if(status == "10" || status == "20" || status == "50"){
                buttonHtml += "<button type=\"button\" id=\"delvCanBtn\" style=\"float: right; margin-bottom: 10px;\" class=\"k-button k-button-solid-error\" onclick=\"docApprovalRetrieve('"+rndMap.DOC_ID+"', '"+rndMap.APPRO_KEY+"', 1, 'retrieve');\">회수</button>";
            }else if(status == "30" || status == "40"){
                buttonHtml += "<button type=\"button\" id=\"delvSaveBtn\" style=\"float: right; margin-bottom: 5px;\" class=\"k-button k-button-solid-info\" onclick=\"rndDetail.fn_save()\">저장</button>";
                buttonHtml += "<button type=\"button\" id=\"delvCanBtn\" style=\"float: right; margin-right: 5px;\" class=\"k-button k-button-solid-info\" onclick=\"tempOrReDraftingPop('"+rndMap.DOC_ID+"', '"+rndMap.DOC_MENU_CD+"', '"+rndMap.APPRO_KEY+"', 2, 'reDrafting');\">재상신</button>";

            }else if(status == "100"){
                buttonHtml += "<button type=\"button\" id=\"delvCanBtn\" style=\"float: right; margin-bottom: 10px;\" class=\"k-button k-button-solid-base\" onclick=\"approveDocView('"+rndMap.DOC_ID+"', '"+rndMap.APPRO_KEY+"', '"+rndMap.DOC_MENU_CD+"');\">열람</button>";

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
                buttonHtml += "<button type=\"button\" id=\"delvSaveBtn\" style=\"float: right; margin-bottom: 5px;\" class=\"k-button k-button-solid-info\" disabled onclick=\"rndDetail.fn_save()\">저장</button>";
            }
        }else{
            buttonHtml += "<button type=\"button\" id=\"delvSaveBtn\" style=\"float: right; margin-bottom: 5px;\" class=\"k-button k-button-solid-info\" onclick=\"rndDetail.fn_save()\">저장</button>";
        }
        $("#detailBtnDiv").html(buttonHtml);
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
                            return fn_numberWithCommas(e.CB_BUDGET);
                        },
                        footerTemplate : function (e) {
                            return "<span id='total"+i+"'></span>";
                        },
                        attributes: { style: "text-align: right" },
                    },

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
        if(confirm("선택한 코드를 삭제하시겠습니까?\n삭제 후 저장시 반영됩니다.")) {
            var grid = $("#customBudgetGrid"+i).data("kendoGrid");
            $.each($("input[name='pCbPk"+i+"']:checked"), function(i, v){
                grid.removeRow($(v).closest("tr"));
            });
        }
    }
}