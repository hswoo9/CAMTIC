const commonEduReq = {
    global: {
        commonInfo: {}
    },

    init: function(){
        commonEduReq.pageSet();
        commonEduReq.dataSet();
        commonEduReq.buttonSet();
    },

    pageSet: function(){
        customKendo.fn_textBox(["eduName", "eduTime", "eduLocation"]);
        customKendo.fn_textArea(["eduTitle", "eduDetail"]);
        customKendo.fn_datePicker("startDt", "month", "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("endDt", "month", "yyyy-MM-dd", new Date());
        let commonDataSource = [
            { text: "리더십교육", value: "1" },
            { text: "직무교육", value: "2" },
            { text: "온라인교육", value: "3" },
            { text: "기타 공통학습", value: "4" }
        ]
        customKendo.fn_dropDownList("commonClass", commonDataSource, "text", "value", 2);
        let statusDataSource = [
            { text: "계획", value: "0" },
            { text: "종료", value: "100" }
        ]
        customKendo.fn_dropDownList("status", statusDataSource, "text", "value", 3);

        $("#startDt, #endDt").focusout(function(){
            var de = $(this).val().replace(/-/gi, "");
            $(this).val(de.substring(0, 4) + "-" + de.substring(4, 6) + "-" + de.substring(6, 8));
        })
        // $("#startDt, #endDt").attr("readonly", true);
    },

    dataSet: function(){
        let mode = $("#mode").val();
        if(mode == "upd" || mode == "view"){
            let commonInfo = customKendo.fn_customAjax("/campus/getCommonEduOne", {
                pk: $("#pk").val()
            }).data;
            commonEduReq.global.commonInfo = commonInfo;

            $("#commonClass").data("kendoDropDownList").value(commonInfo.COMMON_CLASS);
            $("#startDt").val(commonInfo.START_DT);
            $("#endDt").val(commonInfo.END_DT);
            $("#eduName").val(commonInfo.EDU_NAME);
            $("#outlineDetail").val(commonInfo.OUTLINE_DETAIL);
            $("#eduTime").val(fn_numberWithCommas(commonInfo.EDU_TIME));
            $("#eduLocation").val(commonInfo.EDU_LOCATION);
            $("#eduTitle").val(commonInfo.EDU_TITLE);
            $("#eduDetail").val(commonInfo.EDU_DETAIL);
            $("#status").data("kendoDropDownList").value(commonInfo.STATUS);
        }

        if(mode == "view"){
            $("#startDt").data("kendoDatePicker").enable(false);
            $("#endDt").data("kendoDatePicker").enable(false);
            $("#commonClass").data("kendoDropDownList").enable(false);
            $("#status").data("kendoDropDownList").enable(false);
            $("#eduName, #outlineDetail, #eduTime, #eduLocation, #eduTitle, #eduDetail").attr("readOnly", true);
        }
    },

    buttonSet: function(){
        let mode = $("#mode").val();
        if(mode == "upd"){
            $("#allBtn").show();
            $("#userMngBtn").show();
            $("#selBtn").show();
        }
        if(mode == "view"){
            $("#saveBtn").hide();
        }
    },

    saveBtn: function(){
        if(!confirm("공통학습을 저장하시겠습니까?")){
            return;
        }

        let commonClass = $("#commonClass").val();
        let commonClassText = $("#commonClass").data("kendoDropDownList").text();
        let startDt = $("#startDt").val();
        let endDt = $("#endDt").val();
        let eduName = $("#eduName").val();
        let eduTime = $("#eduTime").val().replace(/,/g, "");
        let eduLocation = $("#eduLocation").val();
        let eduTitle = $("#eduTitle").val();
        let eduDetail = $("#eduDetail").val();
        let status = $("#status").val();

        let regEmpSeq = $("#regEmpSeq").val();
        let regEmpName = $("#regEmpName").val();

        let mode = $("#mode").val();

        if(commonClass == ""){ alert("학습구분이 선택되지 않았습니다."); return;}
        if(eduName == ""){ alert("학습명이 작성되지 않았습니다."); return;}
        if(eduTime == ""){ alert("학습시간이 작성되지 않았습니다."); return;}
        if(eduLocation == ""){ alert("학습장소가 작성되지 않았습니다."); return;}
        if(eduTitle == ""){ alert("학습목적이 작성되지 않았습니다."); return;}
        if(eduDetail == ""){ alert("학습내용이 작성되지 않았습니다."); return;}

        let data = {
            commonClass: commonClass,
            commonClassText: commonClassText,
            startDt: startDt,
            endDt: endDt,
            eduName: eduName,
            eduTime: eduTime,
            eduLocation: eduLocation,
            eduTitle: eduTitle,
            eduDetail: eduDetail,
            status: status,
            regEmpSeq: regEmpSeq,
            regEmpName: regEmpName
        }

        let url = "/campus/setCommonEduIns";
        if(mode == "upd"){
            data.pk = $("#pk").val();
            url = "/campus/setCommonEduUpd";
        }
        const result = customKendo.fn_customAjax(url, data);
        if(result.flag){
            alert("공통학습 저장이 완료되었습니다.");
            opener.gridReload();
            window.close();
        }
    },

    addUserAllBtn: function(){
        if(!confirm("전 직원을 추가 하시겠습니까?")){
            return;
        }

        let data = {
            pk: $("#pk").val()
        }
        let url = "/campus/setCommonEduAddUserAll";
        const result = customKendo.fn_customAjax(url, data);
        if(result.flag){
            alert("전 직원 추가 완료되었습니다.");
            opener.gridReload();
        }
    },

    commonEduUserListPop: function(){
        let url = "/Campus/pop/commonEduUserListPop.do?pk="+$("#pk").val();
        const name = "commonEduUserListPop";
        const option = "width = 800, height = 875, top = 50, left = 300, location = no";
        window.open(url, name, option);
    },

    commonEduUserAddPop: function(){
        let url = "/Campus/pop/commonEduUserAddPop.do?pk="+$("#pk").val();
        const name = "commonEduUserAddPop";
        const option = "width = 800, height = 875, top = 50, left = 300, location = no";
        window.open(url, name, option);
    }
}