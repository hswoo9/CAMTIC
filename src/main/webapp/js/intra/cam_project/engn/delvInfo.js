var delvInfo = {

    global : {
        codeCk: "N",
        taxCk: "N"
    },

    fn_defaultScript : function (){
        commonProject.setPjtStat();
        customKendo.fn_textBox(["pjtCd", "delvPjtNm", "delvCnt", "delvUnit", "delvLoc"
            , "delvItem", "delvAmt", "pmName"]);

        customKendo.fn_datePicker("delvEstDe", "depth", "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("delvDe", "depth", "yyyy-MM-dd", new Date());

        $("#sumry, #specf, #delvAssu, #delvTest, #delvIssu").kendoTextArea({
            rows: 5,
        });

        customKendo.fn_datePicker("pjtStrDt", "depth", "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("pjtEndDt", "depth", "yyyy-MM-dd", new Date());


        delvInfo.fn_setData();
    },

    fn_setData : function () {

        var data = {
            pjtSn : $("#pjtSn").val()
        }

        var pjtInfo = customKendo.fn_customAjax("/project/getProjectInfo", data);
        var pjtMap = pjtInfo.map;

        if(pjtMap != null){
            $("#teamSta").val(pjtMap.TEAM_STAT);
        }

        var result = customKendo.fn_customAjax("/project/engn/getDelvData", data);
        var delvFile = result.delvFile;
        var delvMap = result.delvMap;
        var map = result.map;
        var rs = result.estMap.estList[result.estMap.estList.length - 1];

        if(delvFile != null && delvFile != ''){
            $("#delvFileName").text(delvFile.file_org_name + "." +delvFile.file_ext);
        }
        if(delvMap != null && delvMap != ''){
            $("#delvAmt").val(comma(delvMap.DELV_AMT));
            $("#delvExpAmt").val(comma(delvMap.DELV_AMT));
            $("#delvItem").val(delvMap.DELV_ITEM);
            $("#delvLoc").val(delvMap.DELV_LOC);
            $("#delvMean").val(delvMap.DELV_MEAN);
            $("#delvSn").val(delvMap.DELV_SN);
            $("#delvUnit").val(delvMap.DELV_UNIT);
            $("#delvCnt").val(delvMap.DELV_CNT);
            $("#delvIssu").val(delvMap.DELV_ISSU);
            /*$("#delvPay").val(delvMap.DELV_PAY);*/
            $("#pjtStrDt").val(delvMap.PJT_STR_DT);
            $("#pjtEndDt").val(delvMap.PJT_END_DT);
            $("input[name='delvDept']").each(function (){
                if(this.value == delvMap.DELV_DEPT){
                    $(this).prop("checked", true);
                }
            });
            $("#pmName").val(delvMap.PM_EMP_NM);
            $("#pmSeq").val(delvMap.PM_EMP_SEQ);
            $("#delvDe").val(delvMap.DELV_DE);
        } else {
            $("#delvAmt").val(comma(rs.EST_TOT_AMT));
            $("#delvExpAmt").val(comma(rs.EST_TOT_AMT));
            $("#delvEstDe").val(rs.EST_DE);
        }
        $("#delvPjtNm").val(map.PJT_NM);
        $("#pjtCd").val(map.PJT_CD);

        delvInfo.fn_setButton(delvMap);

        const pjtInfo2 = customKendo.fn_customAjax("/project/getProjectStep", data);
        const map2 = pjtInfo2.rs;
        if(map2 != null && map2.CODE_VAL != null){
            delvInfo.global.codeCk = "Y";
        }
        if(map2 != null && map2.TAX_GUBUN != null){
            delvInfo.global.taxCk = "Y";
        }
    },

    fn_setButton : function(delvMap){
        let buttonHtml = "";
        if(delvMap != null){
            let status = delvMap.STATUS;
            if(status == "0"){
                buttonHtml += "<button type=\"button\" id=\"delvSaveBtn\" style=\"float: right; margin-bottom: 5px;\" class=\"k-button k-button-solid-info\" onclick=\"delvInfo.fn_save()\">저장</button>";
                buttonHtml += "<button type=\"button\" id=\"delvApp2Btn\" style=\"float: right; margin-right: 5px;\" class=\"k-button k-button-solid-info\" onclick=\"openModal()\">상신</button>";
            }else if(status == "10" || status == "50"){
                buttonHtml += "<button type=\"button\" id=\"delvCanBtn\" style=\"float: right; margin-bottom: 10px;\" class=\"k-button k-button-solid-error\" onclick=\"docApprovalRetrieve('"+delvMap.DOC_ID+"', '"+delvMap.APPRO_KEY+"', 1, 'retrieve');\">회수</button>";
            }else if(status == "20"){
                buttonHtml += "<button type=\"button\" id=\"delvCanBtn\" style=\"float: right; margin-bottom: 10px;\" class=\"k-button k-button-solid-base\" onclick=\"approveDocView('"+delvMap.DOC_ID+"', '"+delvMap.APPRO_KEY+"', '"+delvMap.DOC_MENU_CD+"');\">결재중</button>";
            }else if(status == "30" || status == "40"){
                buttonHtml += "<button type=\"button\" id=\"delvSaveBtn\" style=\"float: right; margin-bottom: 5px;\" class=\"k-button k-button-solid-info\" onclick=\"delvInfo.fn_save()\">저장</button>";
                buttonHtml += "<button type=\"button\" id=\"delvCanBtn\" style=\"float: right; margin-right: 5px;\" class=\"k-button k-button-solid-info\" onclick=\"tempOrReDraftingPop('"+delvMap.DOC_ID+"', '"+delvMap.DOC_MENU_CD+"', '"+delvMap.APPRO_KEY+"', 2, 'reDrafting');\">재상신</button>";

            }else if(status == "100"){
                buttonHtml += "<button type=\"button\" id=\"delvCanBtn\" style=\"float: right; margin-bottom: 10px;\" class=\"k-button k-button-solid-base\" onclick=\"approveDocView('"+delvMap.DOC_ID+"', '"+delvMap.APPRO_KEY+"', '"+delvMap.DOC_MENU_CD+"');\">열람</button>";

                const pjtResult = customKendo.fn_customAjax("/project/getProjectInfo", {pjtSn : $("#pjtSn").val()});
                const pjtMap = pjtResult.map;
                if(pjtMap.DELV_APPROVE_STAT != 100){
                    buttonHtml += "<span style=\"float: right; position: relative; top: 5px; right: 5px;\"><b style='color: blue'>프로젝트 코드 승인 중...</b></span>";
                }else{
                    buttonHtml += "<span style=\"float: right; position: relative; top: 5px; right: 5px;\"><b style='color: red'>수주승인 완료</b></span>";
                }
            }else if(status == "111"){
                buttonHtml += "<button type=\"button\" id=\"delvTempBtn\" style=\"float: right; margin-bottom: 5px;\" class=\"k-button k-button-solid-base\" onclick=\"tempOrReDraftingPop('"+delvMap.DOC_ID+"', 'delv', '"+delvMap.APPRO_KEY+"', 2, 'tempDrafting');\">전자결재 임시저장 중</button>";
            }else{
                buttonHtml += "<button type=\"button\" id=\"delvSaveBtn\" style=\"float: right; margin-bottom: 5px;\" class=\"k-button k-button-solid-info\" disabled onclick=\"delvInfo.fn_save()\">저장</button>";
            }
        }else{
            buttonHtml += "<button type=\"button\" id=\"delvSaveBtn\" style=\"float: right; margin-bottom: 5px;\" class=\"k-button k-button-solid-info\" onclick=\"delvInfo.fn_save()\">저장</button>";
        }
        $("#delvBtnDiv").html(buttonHtml);
    },

    fn_save : function(){

        // if($("#delvItem").val() == ""){
        //     alert("납품품목을 입력해주세요.");
        //     return;
        // }

        // if($("#delvCnt").val() == ""){
        //     alert("납품수량을 입력해주세요.");
        //     return;
        // }

        // if($("#delvUnit").val() == ""){
        //     alert("납품단위를 입력해주세요.");
        //     return;
        // }

        if($("#delvIssu").val() == ""){
            alert("특이사항을 입력해주세요.");
            return;
        }

        if($("#delvAmt").val() == ""){
            alert("수주금액을 입력해주세요.");
            return;
        }

        if($("#delvFileName").text() == ""){
            alert("계약서를 등록해주세요.");
            return;
        }

        if($("input[name='delvDept']:checked").val() == null || $("input[name='delvDept']:checked").val() == undefined || $("input[name='delvDept']:checked").val() == ""){
            alert("참여부서를 선택해주세요.");
            return;
        }

        if($("#pmSeq").val() == ""){
            alert("PM을 등록해주세요.");
            return;
        }

        var parameters = {
            pjtSn : $("#pjtSn").val(),
            delvDe : $("#delvDe").val(),
            delvItem : $("#delvItem").val(),
            delvCnt : uncomma($("#delvCnt").val()),
            delvUnit : $("#delvUnit").val(),
            delvLoc : $("#delvLoc").val(),
            delvIssu : $("#delvIssu").val(),
            delvAmt : uncomma($("#delvAmt").val()),
            delvDept : $("input[name='delvDept']:checked").val(),
            pmEmpNm : $("#pmName").val(),
            pmEmpSeq : $("#pmSeq").val(),
            empSeq : $("#empSeq").val(),
            estDe : $("#delvEstDe").val(),
            pjtStrDt : $("#pjtStrDt").val(),
            pjtEndDt : $("#pjtEndDt").val(),
            delvPay : "",
            step : $("#step").val(),
            stepColumn : $("#stepColumn").val(),
            nextStepColumn : $("#nextStepColumn").val(),
            stepValue : $("#stepValue").val(),
            nextStepValue : $("#nextStepValue").val(),
            engnSn : $("#engnSn").val()
        }

        var fd = new FormData();
        fd.append("pjtSn", parameters.pjtSn);
        fd.append("delvDe", parameters.delvDe);
        fd.append("delvItem", parameters.delvItem);
        fd.append("delvCnt", parameters.delvCnt);
        fd.append("delvUnit", parameters.delvUnit);
        fd.append("delvLoc", parameters.delvLoc);
        fd.append("delvIssu", parameters.delvIssu);
        if(parameters.delvAmt == "" || parameters.delvAmt == undefined){
            fd.append("delvAmt", "0");
        }else{
            fd.append("delvAmt", parameters.delvAmt);
        }
        fd.append("delvDept", parameters.delvDept);
        fd.append("pmEmpNm", parameters.pmEmpNm);
        fd.append("pmEmpSeq", parameters.pmEmpSeq);
        fd.append("empSeq", parameters.empSeq);
        fd.append("regEmpSeq", parameters.empSeq);

        fd.append("estDe", parameters.estDe);
        fd.append("pjtStrDt", parameters.pjtStrDt);
        fd.append("pjtEndDt", parameters.pjtEndDt);
        fd.append("delvPay", parameters.delvPay);
        fd.append("step", parameters.step);
        fd.append("stepColumn", parameters.stepColumn);
        fd.append("nextStepColumn", parameters.nextStepColumn);
        fd.append("stepValue", parameters.stepValue);
        fd.append("nextStepValue", parameters.nextStepValue);
        fd.append("engnSn", parameters.engnSn);

        if($("#delvFile")[0].files.length == 1){
            fd.append("delvFile", $("#delvFile")[0].files[0]);
        }

        if($("#delvSn").val() != null && $("#delvSn").val() != ''){
            parameters.delvSn = $("#delvSn").val();
            fd.append("delvSn", parameters.delvSn);
        }

        if(uncomma(parameters.delvAmt) != uncomma($("#delvExpAmt").val())){
            if(!confirm("예상 견적가와 금액이 일치하지 않습니다. 저장하시겠습니까?")){
                return false;
            }
        }
        commonProject.loading();



        $.ajax({
            url : "/project/engn/setDelvInfo",
            data : fd,
            type : "post",
            dataType : "json",
            contentType: false,
            processData: false,
            enctype : 'multipart/form-data',
            async: false,
            success : function(rs){
                alert("저장되었습니다.");
                commonProject.getReloadPage(2, 2, 2, 2, 2, 2);
            }
        });
    },

    fn_approve : function(stat){

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
                commonProject.getReloadPage(2, 2, 2, 2, 2, 2);
            }
        });
    },

    delvDrafting: function() {
        var pjCode = $("#pjCode").val();
        var supDep = $("#supDep").val();
        var supDepSub = $("#supDepSub").val();
        var pjtStat = $("#pjtStat").val();
        var pjtStatSub = $("#pjtStatSub").val();

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

        var date = new Date();
        var year = date.getFullYear().toString().substring(2,4);

        var parameters = {
            pjtSn : $("#pjtSn").val(),
            pjtTmpCd : pjCode + supDep + supDepSub + pjtStat + pjtStatSub + year,
            stat : "10",
            regEmpName : $("#regEmpName").val()
        }

        commonProject.loading();

        $.ajax({
            url : "/project/setDelvApprove",
            data : parameters,
            type : "post",
            dataType : "json",
            success : function (rs){

                $("#delvDraftFrm").one("submit", function() {
                    var url = "/popup/cam_project/approvalFormPopup/delvApprovalPop.do";
                    var name = "_self";
                    var option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=yes, scrollbars = yes, status=no, top=50, left=50"
                    var popup = window.open(url, name, option);
                    this.action = "/popup/cam_project/approvalFormPopup/delvApprovalPop.do";
                    this.method = 'POST';
                    this.target = '_self';
                }).trigger("submit");
            }
        });
    }
}