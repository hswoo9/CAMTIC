var projectDoc = {
    fn_DefaultScript: function(){
        projectDoc.fn_dataSet();
    },

    fn_dataSet: function(){
        if($("#pjtSn").val() != ""){
            const pjtSn = $("#pjtSn").val();
            let url = "/project/getProjectDocInfo";
            const data = { pjtSn: pjtSn };
            const pjtInfo = customKendo.fn_customAjax(url, data).rs;
            $("#pjtTitle").text("결재완료문서 조회 ( " + pjtInfo.PJT_CD + " )");

            let e = pjtInfo;
            let html = '';
            if(e.BUSN_CLASS == "D"){
                if(e.DELV_DOC_ID != ""){
                    html += "<td style='text-align: center'><button type='button' style='margin-right: 5px' class='k-button k-button-md k-button-solid k-button-solid-base approvalPopup' onclick='approveDocView(\""+e.DELV_DOC_ID+"\", \""+e.DELV_APPRO_KEY+"\", \""+e.DELV_DOC_MENU_CD+"\");'>수주보고</button></td>";
                }else{
                    html += "<td style='text-align: center'><b>-</b></td>";
                }
            }else if(e.BUSN_CLASS == "R"){
                if(e.DELV_RND_DOC_ID != ""){
                    html += "<td style='text-align: center'><button type='button' style='margin-right: 5px' class='k-button k-button-md k-button-solid k-button-solid-base approvalPopup' onclick='approveDocView(\""+e.DELV_RND_DOC_ID+"\", \""+e.DELV_RND_APPRO_KEY+"\", \""+e.DELV_RND_DOC_MENU_CD+"\");'>수주보고</button></td>";
                }else{
                    html += "<td style='text-align: center'><b>-</b></td>";
                }
            }else if(e.BUSN_CLASS == "S"){
                if(e.DELV_UNRND_DOC_ID != ""){
                    html += "<td style='text-align: center'><button type='button' style='margin-right: 5px' class='k-button k-button-md k-button-solid k-button-solid-base approvalPopup' onclick='approveDocView(\""+e.DELV_UNRND_DOC_ID+"\", \""+e.DELV_UNRND_APPRO_KEY+"\", \""+e.DELV_UNRND_DOC_MENU_CD+"\");'>수주보고</button></td>";
                }else{
                    html += "<td style='text-align: center'><b>-</b></td>";
                }
            }

            if(e.DEV_DOC_ID != "") {
                html += "<td style='text-align: center'><button type='button' style='margin-right: 5px' class='k-button k-button-md k-button-solid k-button-solid-base approvalPopup' onclick='approveDocView(\"" + e.DEV_DOC_ID + "\", \"" + e.DEV_APPRO_KEY + "\", \"" + e.DEV_DOC_MENU_CD + "\");'>계획서보고</button></td>";
            }else{
                html += "<td style='text-align: center'><b>-</b></td>";
            }
            if(e.RESULT_DOC_ID != ""){
                html += "<td style='text-align: center'><button type='button' style='margin-right: 5px' class='k-button k-button-md k-button-solid k-button-solid-base approvalPopup' onclick='approveDocView(\""+e.RESULT_DOC_ID+"\", \""+e.RESULT_APPRO_KEY+"\", \""+e.RESULT_DOC_MENU_CD+"\");'>결과보고</button></td>";
            }else{
                html += "<td style='text-align: center'><b>-</b></td>";
            }
            if(e.COST_DOC_ID != ""){
                html += "<td style='text-align: center'><button type='button' class='k-button k-button-md k-button-solid k-button-solid-base approvalPopup' onclick='approveDocView(\""+e.COST_DOC_ID+"\", \""+e.COST_APPRO_KEY+"\", \""+e.COST_DOC_MENU_CD+"\");'>원가보고</button></td>";
            }else{
                html += "<td style='text-align: center'><b>-</b></td>";
            }

            $("#buttonTr").html(html);
        }
    }
}