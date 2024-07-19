var resultInfo = {

    fn_defaultScript: function(){
        commonProject.setPjtStat();
        customKendo.fn_textBox(["rsPjtSn", "rsPjtNm", "rsActEquip"]);

        $("#rsPrototype").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "아니오", value: "N" },
                { text: "예", value: "Y" }
            ]
        });

        customKendo.fn_datePicker("rsStrDt", "month", "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("rsEndDt", "month", "yyyy-MM-dd", new Date());

        $("#rsSupCont, #rsIss, #rsEtc").kendoTextArea({ rows: 5 });

        if(commonProject.global.busnClass == "R" || commonProject.global.busnClass == "S"){
            $("#resName").text("결과보고서/납품서");
        }

        resultInfo.fn_setData();
    },

    fn_setData: function(){
        var data = {
            pjtSn: $("#pjtSn").val(),
        }

        var resultMap = customKendo.fn_customAjax("/project/engn/getResultInfo", data);
        var result = resultMap.result;
        console.log(resultMap);

        if(result.designFileList != null){
            $("#designImgName").text(result.designFileList.file_org_name + "." +result.designFileList.file_ext);
        }

        if(result.prodFileList != null){
            $("#prodImgName").text(result.prodFileList.file_org_name + "." +result.prodFileList.file_ext);
        }

        if(result.devFileList != null){
            var fileHtml = "";
            fileHtml += '<span style="cursor: pointer" onClick="fileDown(\''+result.devFileList.file_path+result.devFileList.file_uuid+ '\', \''+result.devFileList.file_org_name+'.'+result.devFileList.file_ext+'\')">'+result.devFileList.file_org_name+ '.' + result.devFileList.file_ext + '</span>'

            $("#devFileName").html(fileHtml);
        }

        var equipmentNameList = "";

        for(var i = 0 ; i < resultMap.equipList.length; i++){
            equipmentNameList = resultMap.equipList[i].EQIPMN_NAME + ",";
        }

        if(result.map != null){
            $("#rsIss").val(result.map.RS_ISS);
            $("#rsSupCont").val(result.map.SUP_CONT);
            $("#rsActEquip").val(equipmentNameList.substring(0, equipmentNameList.length - 1));

            if(resultMap.pjtInfo.BUSN_CLASS == "S" || resultMap.pjtInfo.BUSN_CLASS == "R"){
                $("#rsEndDt").val(result.map.RS_END_DT);
                $("#rsStrDt").val(result.map.RS_STR_DT);
            } else {
                $("#rsEndDt").val(resultMap.pjtInfo.GOODS_DT);
                $("#rsStrDt").val(resultMap.pjtInfo.DELV_EST_DE || result.map.RS_STR_DT);
            }

            $("#rsEtc").val(result.map.RS_ETC);

            /** 버튼 세팅 */
            resultInfo.fn_setButton(result.map);
        }
    },

    fn_setButton: function(resMap){
        console.log(resMap);
        let buttonHtml = "";
        if(resMap.STATUS == "0"){
            buttonHtml += '<button type="button" id="resSaveBtn" style="float: right; margin-bottom: 10px;" class="k-button k-button-solid-info" onclick="resultInfo.fn_save()">저장</button>';
            if($("#devFileName").text() != ""){
                buttonHtml += '<button type="button" id="resAppBtn" style="float: right; margin-right: 5px;" class="k-button k-button-solid-info" onclick="resultInfo.resDrafting()">상신</button>';
            }
        }else if(resMap.STATUS == "10" || resMap.STATUS == "20" || resMap.STATUS == "50"){
            buttonHtml += '<button type="button" id="resCanBtn" style="float: right; margin-bottom: 10px;" class="k-button k-button-solid-error" onclick="docApprovalRetrieve(\''+resMap.DOC_ID+'\', \''+resMap.APPRO_KEY+'\', 1, \'retrieve\');">회수</button>';
        }else if(resMap.STATUS == "30" || resMap.STATUS == "40"){
            buttonHtml += '<button type="button" id="resSaveBtn" style="float: right; margin-bottom: 10px;" class="k-button k-button-solid-info" onclick="resultInfo.fn_save()">저장</button>';
            buttonHtml += '<button type="button" id="resReBtn" style="float: right; margin-right: 5px;" class="k-button k-button-solid-error" onclick="tempOrReDraftingPop(\''+resMap.DOC_ID+'\', \''+resMap.DOC_MENU_CD+'\', \''+resMap.APPRO_KEY+'\', 2, \'reDrafting\');">재상신</button>';
        }else if(resMap.STATUS == "100"){
            buttonHtml += '<button type="button" id="resCanBtn" style="float: right; margin-bottom: 10px;" class="k-button k-button-solid-base" onclick="approveDocView(\''+resMap.DOC_ID+'\', \''+resMap.APPRO_KEY+'\', \''+resMap.DOC_MENU_CD+'\');">열람</button>';
        }else if(resMap.STATUS == "111"){
            buttonHtml += "<button type=\"button\" id=\"resTempBtn\" style=\"float: right; margin-bottom: 5px;\" class=\"k-button k-button-solid-base\" onclick=\"tempOrReDraftingPop('"+resMap.DOC_ID+"', 'dev', '"+resMap.APPRO_KEY+"', 2, 'tempDrafting');\">전자결재 임시저장 중</button>";
        }else{
            buttonHtml += '<button type="button" id="resSaveBtn" style="float: right; margin-bottom: 10px;" class="k-button k-button-solid-info" onclick="resultInfo.fn_save()">저장</button>';
        }
        $("#resultBtnDiv").html(buttonHtml);

        if(resMap != null && resMap.DOC_ID != null){
            reDraftOnlyOne(resMap.DOC_ID, $("#resRegEmpSeq").val(), "resReBtn");
        }
    },

    fn_save: function (){
        var data = {
            pjtSn: $("#pjtSn").val(),
            prototype: $("#rsPrototype").val(),
            supCont: $("#rsSupCont").val(),
            rsIss: $("#rsIss").val(),
            rsEtc: $("#rsEtc").val(),
            rsStrDt: $("#rsStrDt").val(),
            rsEndDt: $("#rsEndDt").val(),
            rsActEquip: $("#rsActEquip").val(),
            empSeq: $("#empSeq").val(),

            step: $("#step").val(),
            stepColumn: $("#stepColumn").val(),
            nextStepColumn: $("#nextStepColumn").val(),
            stepValue: $("#stepValue").val(),
            nextStepValue: $("#nextStepValue").val()
        }

        var fd = new FormData();

        fd.append("pjtSn", data.pjtSn);
        fd.append("prototype", data.prototype);
        fd.append("supCont", data.supCont);
        fd.append("rsIss", data.rsIss);
        fd.append("rsEtc", data.rsEtc);
        fd.append("rsStrDt", data.rsStrDt);
        fd.append("rsEndDt", data.rsEndDt);
        fd.append("rsActEquip", data.rsActEquip);
        fd.append("empSeq", data.empSeq);
        fd.append("regEmpSeq", data.empSeq);

        fd.append("step", data.step);
        fd.append("stepColumn", data.stepColumn);
        fd.append("nextStepColumn", data.nextStepColumn);
        fd.append("stepValue", data.stepValue);
        fd.append("nextStepValue", data.nextStepValue);

        if(commonProject.global.busnClass == "R" || commonProject.global.busnClass == "S"){
            if($("#devFileName").text() == ""){
                alert("제출문서를 등록해주세요.");
                return;
            }
        }else{
            if($("#devFileName").text() == ""){
                alert("납품서를 등록해주세요.");
                return;
            }
        }

        if($("#devFile")[0].files.length == 1){
            fd.append("devFile", $("#devFile")[0].files[0]);
        }

        if($("#designImg")[0].files.length == 1){
            fd.append("designImg", $("#designImg")[0].files[0]);
        }

        if($("#prodImg")[0].files.length == 1){
            fd.append("prodImg", $("#prodImg")[0].files[0]);
        }

        $.ajax({
            url: "/project/engn/setResultInfo",
            data: fd,
            type: "post",
            dataType: "json",
            contentType: false,
            processData: false,
            enctype: 'multipart/form-data',
            async: false,
            success: function(rs){
                alert("저장되었습니다.");
                if(rs.code == 200){
                    commonProject.getReloadPage(7, 7, 7);
                }
            }
        });
    },

    fileChange: function(e){
        $(e).next().text($(e)[0].files[0].name);
    },

    resDrafting: function(){
        var rs2 = customKendo.fn_customAjax("/project/getDevPjtVerList", {pjtSn: $("#pjtSn").val()});
        if(rs2.list[0].TEAM_STAT == "N"){
            if(rs2.list[0].TM_YN != "N" && rs2.list[0].PJT_TEAM_CK == "N"){
                alert("협업 프로젝트 마감처리가 진행되지 않았습니다."); return;
            }

        }

        const devInfo = customKendo.fn_customAjax("/project/engn/getDevData", {pjtSn: $("#pjtSn").val()});
        var devMap = devInfo.rs;
        if(devMap == null){
            alert("수행계획서가 작성되지 않았습니다."); return;
        }else if(devMap != null && devMap.STATUS != 100){
            alert("수행계획서 마지막 버전 종결처리가 진행되지 않았습니다."); return;
        }

        var rs3 = customKendo.fn_customAjax("/project/getDevPjtVerList", {pjtSn: $("#pjtSn").val()});

        $("#resDraftFrm").one("submit", function(){
            var url = "";
            if($("#busnClass").val() == "D" || $("#busnClass").val() == "V"){
                url = "/popup/cam_project/approvalFormPopup/resApprovalPop.do";
            }else if($("#busnClass").val() == "R"){
                url = "/popup/cam_project/approvalFormPopup/rndResApprovalPop.do";
            }else if($("#busnClass").val() == "S"){
                url = "/popup/cam_project/approvalFormPopup/unRndResApprovalPop.do";
            }
            var name = "_self";
            var option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=yes, scrollbars = yes, status=no, top=50, left=50"
            var popup = window.open(url, name, option);
            this.action = url;
            this.method = 'POST';
            this.target = '_self';
        }).trigger("submit");
    },

    inputNumberFormat: function(obj){
        obj.value = resultInfo.comma(resultInfo.uncomma(obj.value));
    },

    onlyNumber: function(e){
        e.value = e.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
    },

    comma: function(str){
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    },

    uncomma: function(str){
        str = String(str);
        return str.replace(/[^\d]+/g, '');
    },
}


function fileDown(filePath, fileName, stat){
    if(stat == "recruit"){
        filePath = "https://www.camtic.or.kr" + filePath;
    }
    kendo.saveAs({
        dataURI: "/common/fileDownload.do?filePath=" + filePath + "&fileName=" + encodeURIComponent(fileName),
    });
}