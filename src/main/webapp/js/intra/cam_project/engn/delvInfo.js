var delvInfo = {


    fn_defaultScript : function (){
        customKendo.fn_textBox(["pjtCd", "delvPjtNm", "delvCnt", "delvUnit", "delvLoc"
            , "delvItem", "delvAmt", "pmName"]);

        customKendo.fn_datePicker("delvEstDe", "depth", "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("delvDe", "depth", "yyyy-MM-dd", new Date());

        $("#sumry, #specf, #delvAssu, #delvTest, #delvIssu").kendoTextArea({
            rows: 5,
        });

        delvInfo.fn_setData();
    },

    fn_setData : function () {

        var data = {
            pjtSn : $("#pjtSn").val()
        }

        $.ajax({
            url : "/project/engn/getDelvData",
            data : data,
            type : "post",
            dataType : "json",
            success : function(rs){
                var delvMap = rs.delvMap;
                var map = rs.map;
                var rs = rs.estMap.estList[rs.estMap.estList.length - 1];

                if(delvMap != null && delvMap != ''){
                    $("#delvAmt").val(delvInfo.comma(delvMap.DELV_AMT));
                    $("#delvExpAmt").val(delvInfo.comma(delvMap.DELV_AMT));
                    $("#delvItem").val(delvMap.DELV_ITEM);
                    $("#delvLoc").val(delvMap.DELV_LOC);
                    $("#delvMean").val(delvMap.DELV_MEAN);
                    $("#delvSn").val(delvMap.DELV_SN);
                    $("#delvUnit").val(delvMap.DELV_UNIT);
                    $("#delvCnt").val(delvMap.DELV_CNT);
                    $("#delvIssu").val(delvMap.DELV_ISSU);
                    $("input[name='delvDept']").each(function (){
                        if(this.value == delvMap.DELV_DEPT){
                            $(this).prop("checked", true);
                        }
                    });
                    $("#pmName").val(delvMap.PM_EMP_NM);
                    $("#pmSeq").val(delvMap.PM_EMP_SEQ);
                    var buttonHtml = "";

                    if(map.DELV_STAT != "N"){
                        if(delvMap.STATUS == "0"){
                            buttonHtml += "<button type=\"button\" id=\"saveBtn\" style=\"float: right; margin-bottom: 5px;\" class=\"k-button k-button-solid-info\" onclick=\"openModal()\">저장</button>";
                            buttonHtml += "<button type=\"button\" id=\"appBtn\" style=\"float: right; margin-right: 5px;\" class=\"k-button k-button-solid-info\" onclick=\"delvInfo.delvDrafting()\">상신</button>";
                        }else if(delvMap.STATUS == "10"){
                            buttonHtml += "<button type=\"button\" id=\"canBtn\" style=\"float: right; margin-right: 5px;\" class=\"k-button k-button-solid-error\" onclick=\"docApprovalRetrieve('"+delvMap.DOC_ID+"', '"+delvMap.APPRO_KEY+"', 1, 'retrieve');\">회수</button>";
                        }else if(delvMap.STATUS == "30" || delvMap.STATUS == "40"){
                            buttonHtml += "<button type=\"button\" id=\"canBtn\" style=\"float: right; margin-right: 5px;\" class=\"k-button k-button-solid-error\" onclick=\"tempOrReDraftingPop('"+delvMap.DOC_ID+"', '"+delvMap.DOC_MENU_CD+"', '"+delvMap.APPRO_KEY+"', 2, 'reDrafting');\">재상신</button>";
                        }else if(delvMap.STATUS == "100"){
                            buttonHtml += "<button type=\"button\" id=\"canBtn\" style=\"float: right; margin-right: 5px;\" class=\"k-button k-button-solid-base\" onclick=\"approveDocView('"+delvMap.DOC_ID+"', '"+delvMap.APPRO_KEY+"', '"+delvMap.DOC_MENU_CD+"');\">열람</button>";
                        } else {
                            buttonHtml += "<button type=\"button\" id=\"saveBtn\" style=\"float: right; margin-bottom: 5px;\" class=\"k-button k-button-solid-info\" disabled onclick=\"delvInfo.fn_save()\">저장</button>";
                        }
                    } else {
                        buttonHtml += "<button type=\"button\" id=\"saveBtn\" style=\"float: right; margin-bottom: 5px;\" class=\"k-button k-button-solid-info\" onclick=\"openModal()\">저장</button>";
                    }

                    $("#btnDiv").html(buttonHtml);
                } else {
                    $("#delvAmt").val(delvInfo.comma(rs.EST_TOT_AMT));
                    $("#delvExpAmt").val(delvInfo.comma(rs.EST_TOT_AMT));
                    $("#delvEstDe").val(rs.EST_DE);
                    $("#btnDiv").html("<button type=\"button\" id=\"saveBtn\" style=\"float: right; margin-bottom: 5px;\" class=\"k-button k-button-solid-info\" onclick=\"openModal()\">저장</button>");
                }
                $("#delvPjtNm").val(map.PJT_NM);
                $("#pjtCd").val(map.PJT_CD);
            }
        });
    },

    fn_save : function(){
        var pjCode = $("#pjCode").val();
        var supDep = $("#supDep").val();
        var supDepSub = $("#supDepSub").val();
        var pjtStat = $("#pjtStat").val();
        var pjtStatSub = $("#pjtStatSub").val();

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

        var date = new Date();
        var year = date.getFullYear().toString().substring(2,4);



        var parameters = {
            pjtSn : $("#pjtSn").val(),
            pjtTmpCd : pjCode + supDep + supDepSub + pjtStat + pjtStatSub + year,
            delvDe : $("#delvDe").val(),
            delvItem : $("#delvItem").val(),
            delvCnt : delvInfo.uncomma($("#delvCnt").val()),
            delvUnit : $("#delvUnit").val(),
            delvLoc : $("#delvLoc").val(),
            delvIssu : $("#delvIssu").val(),
            delvAmt : delvInfo.uncomma($("#delvAmt").val()),
            delvDept : $("input[name='delvDept']:checked").val(),
            pmEmpNm : $("#pmName").val(),
            pmEmpSeq : $("#pmSeq").val(),
            empSeq : $("#empSeq").val(),

            step : $("#step").val(),
            stepColumn : $("#stepColumn").val(),
            nextStepColumn : $("#nextStepColumn").val(),
            stepValue : $("#stepValue").val(),
            nextStepValue : $("#nextStepValue").val(),
            engnSn : $("#engnSn").val()
        }

        if($("#delvSn").val() != null && $("#delvSn").val() != ''){
            parameters.delvSn = $("#delvSn").val();
        }

        if(delvInfo.uncomma(parameters.delvAmt) != delvInfo.uncomma($("#delvExpAmt").val())){
            if(!confirm("예상 견적가와 금액이 일치하지 않습니다. 저장하시겠습니까?")){
                return false;
            }
        }



        $.ajax({
            url : "/project/engn/setDelvInfo",
            data : parameters,
            type : "post",
            dataType : "json",
            success : function(rs){
                alert("저장되었습니다.")

                location.reload();
            }
        });

        console.log(parameters);
    },

    delvDrafting: function() {
        $("#delvDraftFrm").one("submit", function() {
            var url = "/popup/cam_project/approvalFormPopup/delvApprovalPop.do";
            var name = "_self";
            var option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=yes, scrollbars = yes, status=no, top=50, left=50"
            var popup = window.open(url, name, option);
            this.action = "/popup/cam_project/approvalFormPopup/delvApprovalPop.do";
            this.method = 'POST';
            this.target = '_self';
        }).trigger("submit");
    },

    inputNumberFormat : function (obj){
        obj.value = delvInfo.comma(delvInfo.uncomma(obj.value));
    },

    comma: function(str) {
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    },

    uncomma: function(str) {
        str = String(str);
        return str.replace(/[^\d]+/g, '');
    },
}