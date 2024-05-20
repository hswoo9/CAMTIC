var regCrmHist = {

    global : {
        editor : "",
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : "",
        htmlStr : "",
        subHtmlStr : ""
    },

    fn_defaultScript : function (){
        customKendo.fn_textBox(["crmNm", "crmCeo", "crmNo", "crmEstNo", "addr", "telNum", "fax", "crmMemNm", "crmMemPhn",
                                "crmShareEmpName"]);

        regCrmHist.global.dropDownDataSource = [
            { text: "업체방문", value: "업체방문" },
            { text: "법인내방", value: "법인내방" },
            { text: "전화", value: "전화" },
            { text: "이메일", value: "이메일" },
            { text: "간접접촉", value: "간접접촉" },
            { text: "기타", value: "기타" },
        ]
        customKendo.fn_dropDownList("crmRelTp", regCrmHist.global.dropDownDataSource, "text", "value", 2);

        $("#crmRelStrDt").kendoDateTimePicker({
            dateInput : true,
            format: "yyyy-MM-dd hh:mm",
            value : new Date,
            culture : "ko-KR"
        });

        $("#crmRelEndDt").kendoDateTimePicker({
            dateInput : true,
            format: "yyyy-MM-dd hh:mm",
            value : new Date,
            culture : "ko-KR"
        });

        regCrmHist.global.searchAjaxData = {
            cmGroupCode : "BUSN_CLASS",
        }

        /** TODO. 관심분야 삭제 */
        // regCrmHist.global.radioDataSource = customKendo.fn_customAjax("/crm/selLgCode", {grpSn : "ITF"});
        // regCrmHist.mainCdChkBoxSetting(regCrmHist.global.radioDataSource.rs);

        var bcDs = customKendo.fn_customAjax("/common/commonCodeList", regCrmHist.global.searchAjaxData);
        customKendo.fn_dropDownList("crmRelPjt", bcDs.rs, "CM_CODE_NM", "CM_CODE");

        ClassicEditor.create( document.querySelector( '#crmRelCont' ), {
            language : 'ko'
        } ).then (newEditor => {
            regCrmHist.global.editor = newEditor;
        });

        $("input[name='crmRelPjt']").change(function(){
            $("#pjtNm").hide();
            $("#pjtSelBtn").hide();
            if(this.value == "R" || this.value == "S"){
                $("#pjtNm").show();
                $("#pjtSelBtn").show();
            }
        })

        if($("#crmSn").val()){
            regCrmHist.fn_dataSet();
        }
    },

    fn_dataSet : function (){
        console.log("fn_dataSet");
        var result = customKendo.fn_customAjax("/crm/getCrmData", { crmSn : $("#crmSn").val() });
        var rs = result.rs;

        $("#crmNm").val(rs.CRM_NM);
        $("#crmCeo").val(rs.CRM_CEO);
        $("#crmNo").val(rs.CRM_NO);
        $("#crmEstNo").val(rs.CRM_EST_NO);
        if(rs.POST != null && rs.POST != ""){
            $("#addr").val("[" + rs.POST + "] " + rs.ADDR);
        } else {
            $("#addr").val(rs.ADDR);
        }
        $("#telNum").val(rs.TEL_NUM);
        $("#fax").val(rs.FAX);
    },

    fn_save : function(){
        if(!$("#crmSn").val()){
            alert("업체를 선택해주세요.");
            $("#crmSelBtn").click();
            return;
        }else if(!$("#crmRelTp").val()){
            alert("관계유형을 선택해주세요.");
            return;
        }

        regCrmHist.global.saveAjaxData = {
            crmSn : $("#crmSn").val(),
            crmMemSn : $("#crmMemSn").val(),
            crmRelTp : $("#crmRelTp").val(),
            crmRelStrDt : $("#crmRelStrDt").val(),
            crmRelEndDt : $("#crmRelEndDt").val(),
            crmRelPjtSn : $("#pjtSn").val(),
            crmRelPjt : $("input[name='crmRelPjt']:checked").val(),
            crmRelPjtNm : $("label[for='" + $("input[name='crmRelPjt']:checked").val() + "']").text(),
            crmRelCont : regCrmHist.global.editor.getData(),
            crmShareEmp : $("#crmShareEmp").val(),
            empSeq : $("#empSeq").val()
        }

        var crmInterLg = "";
        $.each($("input[name='crmInterLg']:checked"), function(){
            crmInterLg += "," + $(this).attr("id") + "_" + $(this).attr("grpSn") + "_" + $(this).val()
        })
        regCrmHist.global.saveAjaxData.crmInterLg = crmInterLg.substring(1)

        var crmInter = "";
        $.each($("input[name='crmInter']:checked"), function(){
            crmInter += "," + $(this).attr("id") + "_" + $(this).attr("grpSn") + "_" + $(this).attr("lgCd") + "_" + $(this).val()
        })
        regCrmHist.global.saveAjaxData.crmInter = crmInter.substring(1)


        if($("#secChk").is(":checked")){
            regCrmHist.global.saveAjaxData.secChk = "Y";
        }
        if($("#smsChk").is(":checked")){
            regCrmHist.global.saveAjaxData.smsChk = "Y";
        }
        if($("#mailChk").is(":checked")){
            regCrmHist.global.saveAjaxData.mailChk = "Y";
        }

        var result = customKendo.fn_customAjax("/crm/setCrmHist", regCrmHist.global.saveAjaxData);
        if(result.flag){
            alert("저장되었습니다.");
            opener.parent.location.reload();
            window.close();
        }
    },

    fn_popCamCrmList : function (){
        var url = "/crm/pop/popCrmList.do";
        var name = "_blank";
        var option = "width = 1300, height = 670, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    fn_popCamCrmMemList: function (){
        var key =  $("#crmSn").val();
        if(key == null || key == ""){
            alert("업체를 선택해주세요.");
            return;
        }
        var url = "/crm/pop/popCrmMemList.do?crmSn=" + key;
        var name = "_blank";
        var option = "width = 1300, height = 670, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    fn_popUser : function (){
        window.open("/user/pop/userMultiSelectPop.do","조직도","width=1365, height=610, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no");
    },

    // mainCdChkBoxSetting : function(e){
    //     for(var i = 0; i < e.length; i++){
    //         regCrmHist.global.htmlStr = "";
    //         regCrmHist.global.htmlStr += "" +
    //             '<tr>' +
    //                 '<td>' +
    //                     '<div>' +
    //                         '<input type="checkbox" id="' + e[i].CRM_CD_SN + '" name="crmInterLg" style="margin-right: 5px" grpSn="' + e[i].GRP_SN + '" value="' + e[i].LG_CD + '" onchange="regCrmHist.mainCdChkBoxChange(this)">' +
    //                         '<label for="' + e[i].CRM_CD_SN + '">' + e[i].LG_CD_NM +'</label>' +
    //                     '</div>' +
    //                 '</td>' +
    //                 '<td id="crmInterTd_' + e[i].LG_CD + '">' +
    //                     '<div id="crmInterDiv_' + e[i].LG_CD + '" style="display: none">' +
    //                     '</div>' +
    //                 '</td>' +
    //             '</tr>';
    //
    //         $("#codeTable").append(regCrmHist.global.htmlStr);
    //
    //         var result = customKendo.fn_customAjax("/crm/smCodeList", {
    //             grpSn : e[i].GRP_SN,
    //             lgCd : e[i].LG_CD
    //         });
    //         regCrmHist.subCheckBoxSetting(result, "crmInterDiv_" + e[i].LG_CD);
    //     }
    // },

    // mainCdChkBoxChange : function(e){
    //     if($(e).is(":checked")){
    //         $("#crmInterDiv_" + $(e).val()).show();
    //     }else{
    //         $("#crmInterDiv_" + $(e).val()).hide();
    //     }
    // },
    //
    // subCheckBoxSetting : function(e, id){
    //     regCrmHist.global.subHtmlStr = "";
    //
    //     for(var i = 0; i < e.length; i++) {
    //         regCrmHist.global.subHtmlStr += "" +
    //             '<input type="checkbox" id="' + e[i].CRM_CD_SN + '" grpSn="' + e[i].GRP_SN + '" lgCd="' + e[i].LG_CD + '" name="crmInter"  style="margin-left: 5px;margin-right: 5px" value="' + e[i].CRM_CD + '">' +
    //             '<label for="' + e[i].CRM_CD_SN + '">' + e[i].CRM_CD_NM + '</label>';
    //     }
    //
    //     $("#" + id).append(regCrmHist.global.subHtmlStr);
    // },

    // codeTableExpand : function(e){
    //     if($(e).hasClass("active")){
    //         $(e).text("▼");
    //         $(e).removeClass("active");
    //         $("#codeTable").hide();
    //     }else{
    //         $(e).text("▲");
    //         $(e).addClass("active");
    //         $("#codeTable").show();
    //     }
    // },

    fn_projectPop : function (){
        var url = "/project/pop/projectView.do?busnClass="+ $("input[name='crmRelPjt']:checked").val();
        var name = "_blank";
        var option = "width = 1100, height = 700, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    },
}