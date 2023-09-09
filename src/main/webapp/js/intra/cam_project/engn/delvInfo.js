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

        delvInfo.fn_save();
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
                        buttonHtml += "<button type=\"button\" id=\"saveBtn\" style=\"float: right; margin-bottom: 5px;\" class=\"k-button k-button-solid-info\" onclick=\"delvInfo.fn_save()\">저장</button>";
                        if(delvMap.STATUS == "0"){
                            buttonHtml += "<button type=\"button\" id=\"appBtn\" style=\"float: right; margin-right: 5px;\" class=\"k-button k-button-solid-info\" onclick=\"delvInfo.delvDrafting()\">상신</button>";
                        }else if(delvMap.STATUS == "10"){
                            buttonHtml += "<button type=\"button\" id=\"canBtn\" style=\"float: right; margin-right: 5px;\" class=\"k-button k-button-solid-error\" onclick=\"docApprovalRetrieve('"+delvMap.DOC_ID+"', '"+delvMap.APPRO_KEY+"', 1, 'retrieve');\">회수</button>";
                        }else if(delvMap.STATUS == "30" || delvMap.STATUS == "40"){
                            buttonHtml += "<button type=\"button\" id=\"canBtn\" style=\"float: right; margin-right: 5px;\" class=\"k-button k-button-solid-error\" onclick=\"tempOrReDraftingPop('"+delvMap.DOC_ID+"', '"+delvMap.DOC_MENU_CD+"', '"+delvMap.APPRO_KEY+"', 2, 'reDrafting');\">재상신</button>";
                        }else if(delvMap.STATUS == "100"){
                            buttonHtml += "<button type=\"button\" id=\"canBtn\" style=\"float: right; margin-right: 5px;\" class=\"k-button k-button-solid-base\" onclick=\"approveDocView('"+delvMap.DOC_ID+"', '"+delvMap.APPRO_KEY+"', '"+delvMap.DOC_MENU_CD+"');\">열람</button>";
                        }
                    } else {
                        buttonHtml += "<button type=\"button\" id=\"saveBtn\" style=\"float: right; margin-bottom: 5px;\" class=\"k-button k-button-solid-info\" onclick=\"openModal()\">저장</button>";
                    }

                    $("#btnDiv").html(buttonHtml);
                } else {
                    $("#delvAmt").val(delvInfo.comma(rs.EST_TOT_AMT));
                    $("#delvEstDe").val(rs.EST_DE);
                    $("#btnDiv").html("<button type=\"button\" id=\"saveBtn\" style=\"float: right; margin-bottom: 5px;\" class=\"k-button k-button-solid-info\" onclick=\"estInfo.fn_save()\">저장</button>");
                }
                $("#delvPjtNm").val(map.PJT_NM);
                $("#pjtCd").val(map.PJT_CD);
            }
        });
    },

    fn_save : function(){
        var parameters = {
            delvSn : $("#delvSn").val(),
            pjtSn : $("#pjtSn").val(),

        }

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