let sum=0;
var rndDetail = {



    fn_defaultScript : function (){
        rndDetail.fn_setPage();
        rndDetail.fn_setData();
    },

    fn_setPage : function (){
        customKendo.fn_textBox(["mngDeptName", "allBusnCost", "mngEmpName", "allResCost"
            , "peoResCost", "peoResItem", "totResCost"]);

        /*$("#bank").kendoDropDownList({
            dataTextField : "text",
            dataValueField : "value",
            dataSource : [
                {text : "전북은행", value : "1"},
            ],
        });*/

        $("input[name='resCardCheck']").click(function(){
            if($(this).val() == "Y"){
                $("#rccYRes").show();
            }else{
                $("#rccYRes").hide();
            }
        });

        /** 계 = 총 사업비 + 현금 + 현물 */
        $("#allResCost, #peoResCost, #peoResItem").keyup(function(){
            $("#allBusnCost").val(comma(
                Number(uncomma($("#allResCost").val()))
                + Number(uncomma($("#peoResCost").val()))
                + Number(uncomma($("#peoResItem").val()))
            ));
        });

        customKendo.fn_datePicker("delvDay", "month", "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("resDay", "month", "yyyy-MM-dd", new Date());
    },

    fn_setData : function (){
        var parameters = {
            pjtSn : $("#pjtSn").val(),
        }

        var pjtInfo = customKendo.fn_customAjax("/project/getProjectInfo", parameters);
        var result = customKendo.fn_customAjax("/projectRnd/getRndDetail", parameters);

        var pjtMap = pjtInfo.map;
        var rs = result.map;
        console.log(rs);
        console.log(pjtMap);

        /** 최초 저장 이후 데이터 세팅 */
        if(rs != null){
            $("#rndSn").val(rs.RND_SN);
            $("#allBusnCost").val(comma(rs.ALL_BUSN_COST));
            $("#mngDeptName").val(rs.MNG_DEPT_NAME);
            $("#mngEmpName").val(rs.MNG_EMP_NAME);
            $("#mngDeptSeq").val(rs.MNG_DEPT_SEQ);
            $("#mngEmpSeq").val(rs.MNG_EMP_SEQ);

            //$("#bank").data("kendoDropDownList").value(rs.BANK_SN);
            //$("#bankNo").val(rs.BANK_NO);
            //$("#accHold").val(rs.ACC_HOLD);

            $("#allResCost").val(comma(rs.ALL_RES_COST));
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

            $("#delvDay").val(rs.DELV_DAY);
            $("#resDay").val(rs.RES_DAY);

        /** 최초 저장 이후 데이터 세팅 */
        }else{
            $("#allResCost").val(comma(pjtMap.PJT_EXP_AMT));
            $("#allBusnCost").val(comma(pjtMap.PJT_EXP_AMT));
            $("#totResCost").val(comma(pjtMap.PJT_EXP_AMT));
        }

        /** 버튼 세팅 */
        rndDetail.fn_buttonSet(rs);
        rndDetail.customBudgetGrid("/project/getProjectBudgetList.do", {pjtSn : $("#pjtSn").val()});
    },

    fn_save : function (){
        var parameters = {
            pjtSn : $("#pjtSn").val(),

            allBusnCost : uncomma($("#allBusnCost").val()),
            mngDeptName : $("#mngDeptName").val(),
            mngEmpName : $("#mngEmpName").val(),
            mngDeptSeq : $("#mngDeptSeq").val(),
            mngEmpSeq : $("#mngEmpSeq").val(),
            empSeq : $("#mngEmpSeq").val(),

            //bankSn : $("#bank").val(),
            //bankNm : $("#bank").data("kendoDropDownList").text(),
            //bankNo : $("#bankNo").val(),
            //accHold : $("#accHold").val(),

            allResCost : uncomma($("#allResCost").val()),
            peoResCost : uncomma($("#peoResCost").val()),
            peoResItem : uncomma($("#peoResItem").val()),
            totResCost : uncomma($("#totResCost").val()),

            //resCardCheck : $("input[name='resCardCheck']:checked").val(),
            //resCardNo : $("#resCardNo").val(),

            delvDay : $("#delvDay").val(),
            resDay : $("#resDay").val(),

            regEmpSeq : $("#regEmpSeq").val()
        }

        if($("#rndSn").val() != "" && $("#rndSn").val() != null){
            parameters.rndSn = $("#rndSn").val();
            parameters.stat = "upd"
        } else {
            parameters.stat = "ins"
        }

        if(parameters.allBusnCost == ""){
            alert("총 사업비를 입력해주세요.");
            return;
        }

        if(parameters.mngEmpSeq == ""){
            alert("연구책임자를 선택해주세요.");
            return;
        }
        if(parameters.allResCost == ""){
            alert("전체연구비를 작성해주세요.");
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
        $.each($("#customBudgetGrid").data("kendoGrid").dataSource.data(), function(){
            var data = {
                pjtSn : $("#pjtSn").val(),
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

        parameters.customBudget = JSON.stringify(customBudget);

        $.ajax({
            url : "/projectRnd/setRndDetail",
            data : parameters,
            type : "post",
            dataType : "json",
            success : function(rs){
                if(rs.code == 200){
                    location.reload();
                }
            }
        });
    },

    fn_approve : function (stat){
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
            stat : stat,
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
                alert("요청되었습니다.");
                commonProject.getReloadPage(0, 0, 0, 0, 0, 0);
            }
        });
    },

    fn_approveStat : function(stat){
        let successText = "";
        if(stat == "0"){
            if(!confirm("요청취소하시겠습니까?")){
                return ;
            }
            successText = "취소되었습니다.";
        }
        var parameters = {
            pjtSn : $("#pjtSn").val(),
            stat : stat
        }
        commonProject.loading();
        $.ajax({
            url : "/project/updDelvApproveStat",
            data : parameters,
            type : "post",
            dataType : "json",
            success : function (rs){
                alert(successText);
                commonProject.getReloadPage(0, 0, 0, 0, 0, 0);
            }
        });
    },

    delvDrafting: function() {
        $("#rndDelvDraftFrm").one("submit", function(){
            const url = "/popup/cam_project/approvalFormPopup/rndDelvApprovalPop.do";
            const name = "_self";
            const option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=yes, scrollbars = yes, status=no, top=50, left=50";
            window.open(url, name, option);
            this.action = "/popup/cam_project/approvalFormPopup/rndDelvApprovalPop.do";
            this.method = 'POST';
            this.target = '_self';
        }).trigger("submit");
    },

    fn_buttonSet : function(rndMap){
        let buttonHtml = "";
        if(rndMap != null){
            let status = rndMap.STATUS
            if(status == "0"){
                buttonHtml += "<button type=\"button\" id=\"delvSaveBtn\" style=\"float: right; margin-bottom: 5px;\" class=\"k-button k-button-solid-info\" onclick=\"rndDetail.fn_save()\">저장</button>";

                const pjtResult = customKendo.fn_customAjax("/project/getProjectInfo", {pjtSn : $("#pjtSn").val()});
                const pjtMap = pjtResult.map;
                if(pjtMap.DELV_APPROVE_STAT == 0){
                    buttonHtml += "<button type=\"button\" id=\"delvApp2Btn\" style=\"float: right; margin-right: 5px;\" class=\"k-button k-button-solid-info\" onclick=\"openModal()\">코드승인요청</button>";
                }else if(pjtMap.DELV_APPROVE_STAT == 100){
                    buttonHtml += "<button type=\"button\" id=\"delvAppBtn\" style=\"float: right; margin-right: 5px;\" class=\"k-button k-button-solid-info\" onclick=\"rndDetail.delvDrafting()\">상신</button>";
                }else{
                    buttonHtml += "<button type=\"button\" id=\"delvApp2Btn\" style=\"float: right; margin-right: 5px;\" class=\"k-button k-button-solid-error\" onclick=\"rndDetail.fn_approveStat(0)\">코드승인요청취소</button>";
                }
            }else if(status == "10" || status == "20" || status == "50"){
                buttonHtml += "<button type=\"button\" id=\"delvCanBtn\" style=\"float: right; margin-bottom: 10px;\" class=\"k-button k-button-solid-error\" onclick=\"docApprovalRetrieve('"+rndMap.DOC_ID+"', '"+rndMap.APPRO_KEY+"', 1, 'retrieve');\">회수</button>";
            }else if(status == "30" || status == "40"){
                buttonHtml += "<button type=\"button\" id=\"delvSaveBtn\" style=\"float: right; margin-bottom: 5px;\" class=\"k-button k-button-solid-info\" onclick=\"rndDetail.fn_save()\">저장</button>";
                buttonHtml += "<button type=\"button\" id=\"delvCanBtn\" style=\"float: right; margin-right: 5px;\" class=\"k-button k-button-solid-info\" onclick=\"tempOrReDraftingPop('"+rndMap.DOC_ID+"', '"+rndMap.DOC_MENU_CD+"', '"+rndMap.APPRO_KEY+"', 2, 'reDrafting');\">재상신</button>";

            }else if(status == "100"){
                buttonHtml += "<button type=\"button\" id=\"delvCanBtn\" style=\"float: right; margin-bottom: 10px;\" class=\"k-button k-button-solid-base\" onclick=\"approveDocView('"+rndMap.DOC_ID+"', '"+rndMap.APPRO_KEY+"', '"+rndMap.DOC_MENU_CD+"');\">열람</button>";
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
        $("#customBudgetGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 489,
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="rndDetail.fn_customBudgetPop()">' +
                            '	<span class="k-button-text">추가</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="rndDetail.setCustomBudgetDel()">' +
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
                        return "<span id='total'></span>";
                    },
                    attributes: { style: "text-align: right" },
                },

            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            },
            dataBound: function(){
                $("#total").text(fn_numberWithCommas(sum));
                sum = 0;
            }
        }).data("kendoGrid");

        $('#customBudgetGrid').on('blur', '[id="CB_BUDGET"]', function(e){
            var total = 0;
            $.each($("#customBudgetGrid").data("kendoGrid").dataSource.data(), function(){
                total += Number(this.CB_BUDGET);
            })
            $("#total").text(comma(total))
        })
    },

    cbGridAddRow : function(e){
        $("#customBudgetGrid").data("kendoGrid").dataSource.data([]);
        for(var i = 0; i < e.length; i++){
            $("#customBudgetGrid").data("kendoGrid").dataSource.add({
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

    fn_customBudgetPop : function (){
        var url = "/project/pop/customBudgetPop.do?path=rndDetail&pjtSn=" + $("#pjtSn").val();
        var name = "_blank";
        var option = "width = 1000, height = 750, top = 100, left = 200, location = no";
        var popup = window.open(url, name, option);
    },

    setCustomBudgetDel : function(){
        if($("input[name='pCbPk']:checked").length == 0){ alert("삭제할 예산을 선택해주세요."); return; }
        if(confirm("선택한 코드를 삭제하시겠습니까?\n삭제 후 저장시 반영됩니다.")) {
            var grid = $("#customBudgetGrid").data("kendoGrid");
            $.each($("input[name='pCbPk']:checked"), function(i, v){
                grid.removeRow($(v).closest("tr"));
            });
        }
    }
}