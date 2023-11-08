var rndDetail = {


    fn_defaultScript : function (){

        customKendo.fn_textBox(["mngDeptName", "mngEmpName", "bankNo", "accHold", "allResCost", "peoResCost", "peoResItem", "totResCost", "resCardNo"]);

        $("#bank").kendoDropDownList({
            dataTextField : "text",
            dataValueField : "value",
            dataSource : [
                {text : "전북은행", value : "1"},
            ],
        });

        $("input[name='resCardCheck']").click(function(){
            if($(this).val() == "Y"){
                $("#rccYRes").show();
            }else{
                $("#rccYRes").hide();
            }
        });

        $("#allResCost, #peoResCost, #peoResItem").keyup(function(){
            $("#totResCost").val(comma(Number(uncomma($("#allResCost").val())) + Number(uncomma($("#peoResCost").val())) + Number(uncomma($("#peoResItem").val()))));
        });

        customKendo.fn_datePicker("delvDay", "month", "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("resDay", "month", "yyyy-MM-dd", new Date());


        rndDetail.fn_setData();
    },

    loading: function() {
        $.LoadingOverlay("show", {
            background: "rgba(0, 0, 0, 0.5)",
            image: "",
            maxSize: 60,
            fontawesome: "fa fa-spinner fa-pulse fa-fw",
            fontawesomeColor: "#FFFFFF",
        });
    },

    fn_save : function(){
        var parameters = {
            pjtSn : $("#pjtSn").val(),

            mngDeptName : $("#mngDeptName").val(),
            mngEmpName : $("#mngEmpName").val(),
            mngDeptSeq : $("#mngDeptSeq").val(),
            mngEmpSeq : $("#mngEmpSeq").val(),
            empSeq : $("#mngEmpSeq").val(),

            bankSn : $("#bank").val(),
            bankNm : $("#bank").data("kendoDropDownList").text(),
            bankNo : $("#bankNo").val(),
            accHold : $("#accHold").val(),

            allResCost : uncomma($("#allResCost").val()),
            peoResCost : uncomma($("#peoResCost").val()),
            peoResItem : uncomma($("#peoResItem").val()),
            totResCost : uncomma($("#totResCost").val()),

            resCardCheck : $("input[name='resCardCheck']:checked").val(),
            resCardNo : $("#resCardNo").val(),

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

        if(parameters.mngEmpSeq == ""){
            alert("연구책임자를 선택해주세요.");
            return;
        }
        if(parameters.bankSn == ""){
            alert("출금대표통장을 선택해주세요.");
            return;
        }
        if(parameters.bankNo == ""){
            alert("계좌번호를 작성해주세요.");
            return;
        }
        if(parameters.accHold == ""){
            alert("예금주를 작성해주세요.");
            return;
        }
        if(parameters.allResCost == ""){
            alert("전체연구비를 작성해주세요.");
            return;
        }
        if(parameters.peoResCost == ""){
            alert("민간부담금 - 현금을 작성해주세요.");
            return;
        }
        if(parameters.peoResItem == ""){
            alert("민간부담금 - 현물을 작성해주세요.");
            return;
        }
        if(parameters.resCardCheck == "" || parameters.resCardCheck == null){
            alert("연구카드사용여부를 작성해주세요.");
            return;
        }
        unRndDetail.loading();

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
        })
    },

    fn_setData : function (){
        var parameters = {
            pjtSn : $("#pjtSn").val(),
        }

        var result = customKendo.fn_customAjax("/projectRnd/getRndDetail", parameters);

        var rs = result.map;

        rndDetail.fn_buttonSet(rs);

        if(rs != null){
            $("#rndSn").val(rs.RND_SN);
            $("#mngDeptName").val(rs.MNG_DEPT_NAME);
            $("#mngEmpName").val(rs.MNG_EMP_NAME);
            $("#mngDeptSeq").val(rs.MNG_DEPT_SEQ);
            $("#mngEmpSeq").val(rs.MNG_EMP_SEQ);

            $("#bank").data("kendoDropDownList").value(rs.BANK_SN);
            $("#bankNo").val(rs.BANK_NO);
            $("#accHold").val(rs.ACC_HOLD);

            $("#allResCost").val(comma(rs.ALL_RES_COST));
            $("#peoResCost").val(comma(rs.PEO_RES_COST));
            $("#peoResItem").val(comma(rs.PEO_RES_ITEM));
            $("#totResCost").val(comma(rs.TOT_RES_COST));

            if(rs.RES_CARD_CHECK == "Y"){
                $("input[name='resCardCheck'][value='Y']").prop("checked", true);
                $("#rccYRes").css("display", "");
            }else{
                $("input[name='resCardCheck'][value='N']").prop("checked", true);
                $("#rccYRes").css("display", "none");
            }
            $("#resCardNo").val(rs.RES_CARD_NO);

            $("#delvDay").val(rs.DELV_DAY);
            $("#resDay").val(rs.RES_DAY);
        }
    },

    fn_approve : function(){
        var pjCode = $("#pjCode").val();
        var supDep = $("#supDep2").val();
        var supDepSub = $("#supDepSub2").val();
        var pjtStat = $("#pjtStat").val();
        var pjtStatSub = $("#pjtStatSub").val();

        var date = new Date();
        var year = date.getFullYear().toString().substring(2,4);



        var parameters = {
            pjtSn : $("#pjtSn").val(),
            rndSn : $("#rndSn").val(),
            pjtTmpCd : pjCode + supDep + supDepSub + pjtStat + pjtStatSub + year,
            pjtCd : pjCode + supDep + supDepSub + pjtStat + pjtStatSub + year,
            pjtExpAmt : uncomma($("#pjtExpAmt").val()),
            pType : "I",
            pProjectNM : $("#pjtNm").val(),
            pState : '1',
            pProjectNMEx : $("#pjtSubNm").val(),
            pSDate : $("#sbjStrDe").val().replaceAll("-", ""),
            pEDate : $("#sbjEndDe").val().replaceAll("-", ""),
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
            alert("사업성격1을 선택해주세요.");
            return;
        }

        $.ajax({
            url : "/projectRnd/setDelvApprove",
            data : parameters,
            type : "post",
            dataType : "json",
            success : function (rs){
                if(rs.code == 200){
                    /** 저장 성공 시 전자결재 상신프로세스 시작 */
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
            }
        });
    },

    fn_buttonSet : function(rndMap){
        let buttonHtml = "";
        if(rndMap != null){
            if(rndMap.STATUS == "0"){
                buttonHtml += '<button type="button" id="saveBtn" style="float: right; margin-bottom: 5px;" class="k-button k-button-solid-info" onclick="rndDetail.fn_save()">저장</button>';
                buttonHtml += '<button type="button" id="approveBtn" style="float: right; margin-right:5px;" class="k-button k-button-solid-info" onclick="openModal()">상신</button>';
            }else if(rndMap.STATUS == "10"){
                buttonHtml += '<button type="button" id="canBtn" style="float: right; margin-bottom: 10px;" class="k-button k-button-solid-error" onclick="docApprovalRetrieve(\''+rndMap.DOC_ID+'\', \''+rndMap.APPRO_KEY+'\', 1, \'retrieve\');">회수</button>';
            }else if(rndMap.STATUS == "30" || rndMap.STATUS == "40"){
                buttonHtml += '<button type="button" id="saveBtn" style="float: right; margin-bottom: 5px;" class="k-button k-button-solid-info" onclick="rndDetail.fn_save()">저장</button>';
                buttonHtml += '<button type="button" id="canBtn" style="float: right; margin-right: 5px;" class="k-button k-button-solid-error" onclick="tempOrReDraftingPop(\''+rndMap.DOC_ID+'\', \''+rndMap.DOC_MENU_CD+'\', \''+rndMap.APPRO_KEY+'\', 2, \'reDrafting\');">재상신</button>';
            }else if(rndMap.STATUS == "100"){
                buttonHtml += '<button type="button" id="canBtn" style="float: right; margin-bottom: 10px;" class="k-button k-button-solid-base" onclick="approveDocView(\''+rndMap.DOC_ID+'\', \''+rndMap.APPRO_KEY+'\', \''+rndMap.DOC_MENU_CD+'\');">열람</button>';
            }else{
                buttonHtml += '<button type="button" id="saveBtn" style="float: right; margin-bottom: 5px;" class="k-button k-button-solid-info" onclick="rndDetail.fn_save()">저장</button>';
            }
        }else{
            buttonHtml += '<button type="button" id="saveBtn" style="float: right; margin-bottom: 5px;" class="k-button k-button-solid-info" onclick="rndDetail.fn_save()">저장</button>';
        }

        $("#detailBtnDiv").html(buttonHtml);
    }
}