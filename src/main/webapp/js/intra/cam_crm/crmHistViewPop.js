var chv = {

    global : {
        editor : "",
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : "",
        htmlStr : "",
        subHtmlStr : ""
    },

    fn_defaultScript : function (){
        $(".histTitleSpan").click(function(){
            // height: 70px
            var baseHeight = 40;

            if($(this).hasClass("active")){
                $(this).closest(".histListDiv").css("height", baseHeight);
                $(this).removeClass("active");
            }else{
                $(this).addClass("active");
                $(this).closest(".histListDiv").css("height", baseHeight + $(this).closest(".histListDiv").find(".childrenTable").height() + 10)
            }
        })

        chv.getCrmHistDetailList();
    },

    getCrmHistDetailList : function(){
        chv.global.searchAjaxData = {
            crmSn : $("#crmSn").val()
        }

        var result = customKendo.fn_customAjax("/crm/getCrmHistDetailList", chv.global.searchAjaxData);
        if(result.flag){
            console.log();

            chv.makeTable(result.list)
        }
    },

    makeTable : function(e){
        var crmInterLg = "";
        var crmInter = "";

        for(var i = 0; i < e.length; i++){
            crmInterLg = e[i].CRM_INTER_LG.split(",");
            crmInter = e[i].CRM_INTER.split(",");
            chv.global.htmlStr = "";
            chv.global.htmlStr += "" +
                '<tr>' +
                    '<td>' + (i+1) + '</td>' +
                    '<td>' + e[i].DEPT_NAME + '</td>' +
                    '<td>' + e[i].EMP_NAME_KR + '</td>' +
                    '<td>' + e[i].CRM_MEM_NM + '</td>' +
                    '<td>' + e[i].START_DATETIME + '</td>' +
                    '<td>' + e[i].CRM_HIST_OBJ + '</td>' +
                '</tr>';

            chv.mainCdChkBoxSetting(crmInterLg);

            chv.global.htmlStr += '' +
                '<tr>' +
                    '<td colSpan="6">' + e[i].CRM_REL_CONT + '</td>' +
                '</tr>';

            $("#histTb").append(chv.global.htmlStr);

            for(var c = 0; c < crmInterLg.length; c++){
                $("input[id='" + crmInterLg[c].split("_")[0] + "']").prop("checked", true)
            }

            for(var c = 0; c < crmInter.length; c++){
                $("input[id='" + crmInter[c].split("_")[0] + "']").prop("checked", true)
            }
        }

    },

    mainCdChkBoxSetting : function(e){
        var crmInterLg = e;
        var grpSn = "";
        var lgCdArr = "";


        for(var i = 0; i < crmInterLg.length; i++){
            var t = crmInterLg[i].split("_");
            grpSn = t[1];
            lgCdArr += ",'" + t[2] + "'";
        }

        var result = customKendo.fn_customAjax("/crm/selLgSmCode", {
            grpSn : t[1],
            lgCdArr : lgCdArr.substring(1)
        });

        var rs = result.rs;
        for(var i = 0; i < rs.length; i++){
            chv.global.htmlStr += "" +
                '<tr style="text-align: left">' +
                    '<td colspan="2">' +
                        '<div>' +
                            '<input type="checkbox" id="' + rs[i].CRM_CD_SN + '" name="crmInterLg" style="margin-right: 5px" grpSn="' + rs[i].GRP_SN + '" value="' + rs[i].LG_CD + '">' +
                            '<label for="' + rs[i].CRM_CD_SN + '">' + rs[i].LG_CD_NM +'</label>' +
                        '</div>' +
                    '</td>' +
                    '<td id="crmInterTd_' + rs[i].LG_CD + '" colspan="4">' +
                        '<div id="crmInterDiv_' + rs[i].LG_CD + '">';
            for(var j = 0; j < rs[i].smList.length; j++){
                chv.global.htmlStr += '' +
                            '<input type="checkbox" id="' + rs[i].smList[j].CRM_CD_SN + '" grpSn="' + rs[i].smList[j].GRP_SN + '" lgCd="' + rs[i].smList[j].LG_CD + '" name="crmInter"  style="margin-left: 5px;margin-right: 5px" value="' + rs[i].smList[j].CRM_CD + '">' +
                            '<label for="' + rs[i].smList[j].CRM_CD_SN + '">' + rs[i].smList[j].CRM_CD_NM + '</label>';
            }
            chv.global.htmlStr += '' +
                        '</div>' +
                    '</td>' +
                '</tr>';
        }
    },
}