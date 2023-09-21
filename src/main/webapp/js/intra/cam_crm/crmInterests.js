var crmI = {

    global : {
        checkBoxDataSource : "",
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : "",
        htmlStr : "",
        subHtmlStr : "",
    },
    
    fn_defaultScript : function (){
        crmI.getCheckBoxData();

        crmI.interestsDataSet();
    },

    fn_save : function (){
        crmI.global.saveAjaxData = {
            crmInterestsSn : $("#crmInterestsSn").val(),
            crmSn : $("#crmSn").val(),
            regEmpSeq : $("#regEmpSeq").val()
        }

        var mainDepth = "";
        $.each($("input[name='mainDepth']:checked"), function(){
            mainDepth += "," + $(this).attr("grpSn") + "_" + $(this).val()
        })
        crmI.global.saveAjaxData.mainDepth = mainDepth.substring(1)

        var subDepth = "";
        $.each($("input[name='subDepth']:checked"), function(){
            subDepth += "," + $(this).attr("grpSn") + "_" + $(this).attr("lgCd") + "_" + $(this).val()
        })
        crmI.global.saveAjaxData.subDepth = subDepth.substring(1)

        var result = customKendo.fn_customAjax("/crm/setCrmInterests.do", crmI.global.saveAjaxData);
        if(result.flag){
            alert("저장되었습니다.");
            location.reload();
        }
    },

    interestsDataSet : function(){
        crmI.global.saveAjaxData = {
            crmSn : $("#crmSn").val()
        }

        var result = customKendo.fn_customAjax("/crm/getCrmInterests.do", crmI.global.saveAjaxData);
        if(result.flag){
            if(result.data != null){
                $("#crmInterestsSn").val(result.data.CRM_INTERESTS_SN);
                if(result.data.MAIN_DEPTH != null){
                    crmI.interestsChkBoxDataSet(result.data.MAIN_DEPTH);
                }

                if(result.data.SUB_DEPTH != null){
                    crmI.interestsChkBoxDataSet(result.data.SUB_DEPTH);
                }
            }
        }
    },

    getCheckBoxData : function(){
        crmI.global.checkBoxDataSource = customKendo.fn_customAjax("/crm/selLgCode", {grpSn : "DE"});
        crmI.checkBoxSetting(crmI.global.checkBoxDataSource.rs, "mainDepth", "1");

        crmI.global.checkBoxDataSource = customKendo.fn_customAjax("/crm/selLgCode", {grpSn : "DP"});
        crmI.checkBoxSetting(crmI.global.checkBoxDataSource.rs, "mainDepth", "2");

        crmI.global.checkBoxDataSource = customKendo.fn_customAjax("/crm/selLgCode", {grpSn : "CS"});
        crmI.checkBoxSetting(crmI.global.checkBoxDataSource.rs, "mainDepth", "3");

        crmI.global.checkBoxDataSource = customKendo.fn_customAjax("/crm/selLgCode", {grpSn : "ET"});
        crmI.checkBoxSetting(crmI.global.checkBoxDataSource.rs, "mainDepth", "4");
    },

    checkBoxSetting : function(e, id, n){
        crmI.global.htmlStr = "";

        for(var i = 0; i < e.length; i++){
            crmI.global.htmlStr += "" +
                '<div>' +
                    '<input type="checkbox" id="' + e[i].CRM_CD_SN + '" name="mainDepth" style="margin-right: 5px" grpSn="' + e[i].GRP_SN + '" value="' + e[i].LG_CD + '">' +
                    '<label for="' + e[i].CRM_CD_SN + '">' + e[i].LG_CD_NM +'</label>' +
                '</div>';

            var result = customKendo.fn_customAjax("/crm/smCodeList", {
                grpSn : e[i].GRP_SN,
                lgCd : e[i].LG_CD
            });

            crmI.subCheckBoxSetting(result, "subDepth" + n + "_1");
        }

        $("#" + id + n).append(crmI.global.htmlStr);
    },

    subCheckBoxSetting : function(e, id){
        crmI.global.subHtmlStr = "";

        crmI.global.subHtmlStr += "<div>";
        for(var i = 0; i < e.length; i++){
            crmI.global.subHtmlStr += "" +
                '<input type="checkbox" id="' + e[i].CRM_CD_SN + '" grpSn="' + e[i].GRP_SN + '" lgCd="' + e[i].LG_CD + '" name="subDepth"  style="margin-left: 5px;margin-right: 5px" value="' + e[i].CRM_CD + '">' +
                '<label for="' + e[i].CRM_CD_SN + '">' + e[i].CRM_CD_NM +'</label>';
        }
        crmI.global.subHtmlStr += "</div>";

        $("#" + id).append(crmI.global.subHtmlStr);
    },

    interestsChkBoxDataSet : function(e){
        var depth = e.split(",");
        for(var i = 0; i < depth.length; i++){
            var detail = depth[i].split("_");
            if(detail.length == 2){
                /** main_dept*/
                $("input[grpsn='" + detail[0] + "'][value='" + detail[1] + "']").prop("checked", true);
            }else{
                /** sub_dept*/
                $("input[grpsn='" + detail[0] + "'][lgcd='" + detail[1] + "'][value='" + detail[2] + "']").prop("checked", true);
            }
        }
    }
}