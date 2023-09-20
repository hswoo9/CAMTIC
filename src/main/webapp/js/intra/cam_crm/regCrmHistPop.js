var regCrmHist = {

    global : {
        editor : "",
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : "",
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

        var bcDs = customKendo.fn_customAjax("/common/commonCodeList", regCrmHist.global.searchAjaxData);
        customKendo.fn_dropDownList("crmRelPjt", bcDs.rs, "CM_CODE_NM", "CM_CODE");

        ClassicEditor.create( document.querySelector( '#crmRelCont' ), {
            language : 'ko'
        } ).then (newEditor => {
            regCrmHist.global.editor = newEditor;
        });

        if($("#crmHistSn").val()){
            regCrmHist.getRegCrmHist();
        }
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
            crmRelPjt : $("#crmRelPjt").val(),
            crmRelPjtNm : $("#crmRelPjt").data("kendoDropDownList").text(),
            crmRelCont : regCrmHist.global.editor.getData(),
            crmShareEmp : $("#crmShareEmp").val(),
            empSeq : $("#empSeq").val()
        }

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
            opener.parent.crmHist.gridReload();
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
}