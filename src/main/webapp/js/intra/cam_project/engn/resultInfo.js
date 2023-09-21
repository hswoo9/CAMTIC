var resultInfo = {


    fn_defaultScript : function (){

        customKendo.fn_textBox(["rsPjtSn", "rsPjtNm","rsActEquip"])

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

        $("#rsSupCont, #rsIss, #rsEtc").kendoTextArea({
            rows : 5
        });
        var data = {
            pjtSn : $("#pjtSn").val(),
        }
        $.ajax({
            url : "/project/engn/getResultInfo",
            type : "post",
            dataType : "json",
            data : data,
            success : function(rs){
                console.log(rs);
                $("#rsIss").val(rs.result.map.RS_ISS);
                $("#rsSupCont").val(rs.result.map.SUP_CONT);
                $("#rsActEquip").val(rs.result.map.RS_ACT_EQUIP);
                $("#rsEndDt").val(rs.result.map.RS_END_DT);
                $("#rsStrDt").val(rs.result.map.RS_STR_DT);
                $("#rsEtc").val(rs.result.map.RS_ETC);
                $("#designImgName").text(rs.result.designFileList.file_org_name + "." +rs.result.designFileList.file_ext);
                $("#prodImgName").text(rs.result.prodFileList.file_org_name + "." +rs.result.prodFileList.file_ext);

                /** 버튼 세팅 */
                resultInfo.buttonSet(rs.result.map);
            }
        })
    },

    buttonSet: function(resMap){
        let buttonHtml = "";
        if(resMap.STATUS == "0"){
            buttonHtml += '<button type="button" id="saveBtn" style="float: right; margin-bottom: 10px;" class="k-button k-button-solid-info" onclick="resultInfo.fn_save()">저장</button>';
            buttonHtml += '<button type="button" id="resAppBtn" style="float: right; margin-right: 5px;" class="k-button k-button-solid-info" onclick="resultInfo.resDrafting()">상신</button>';
        }else if(resMap.STATUS == "10"){
            buttonHtml += '<button type="button" id="delvCanBtn" style="float: right; margin-right: 5px;" class="k-button k-button-solid-error" onclick="docApprovalRetrieve(\''+delvMap.DOC_ID+'\', \''+delvMap.APPRO_KEY+'\', 1, \'retrieve\');">회수</button>';
        }else if(resMap.STATUS == "30" || resMap.STATUS == "40"){
            buttonHtml += '<button type="button" id="saveBtn" style="float: right; margin-bottom: 10px;" class="k-button k-button-solid-info" onclick="resultInfo.fn_save()">저장</button>';
            buttonHtml += '<button type="button" id="delvCanBtn" style="float: right; margin-right: 5px;" class="k-button k-button-solid-error" onclick="tempOrReDraftingPop(\''+delvMap.DOC_ID+'\', \''+delvMap.DOC_MENU_CD+'\', \''+delvMap.APPRO_KEY+'\', 2, \'reDrafting\');">재상신</button>';
        }else if(resMap.STATUS == "100"){
            buttonHtml += '<button type="button" id="delvCanBtn" style="float: right; margin-right: 5px;" class="k-button k-button-solid-error" onclick="docApprovalRetrieve(\''+delvMap.DOC_ID+'\', \''+delvMap.APPRO_KEY+'\', \''+delvMap.DOC_MENU_CD+'\');">열람</button>';
        }else{
            buttonHtml += '<button type="button" id="saveBtn" style="float: right; margin-bottom: 10px;" class="k-button k-button-solid-info" onclick="resultInfo.fn_save()">저장</button>';
        }
        $("#btnDiv").html(buttonHtml);
    },

    fn_save : function (){

        var data = {
            pjtSn : $("#pjtSn").val(),
            prototype : $("#rsPrototype").val(),
            supCont : $("#rsSupCont").val(),
            rsIss : $("#rsIss").val(),
            rsEtc : $("#rsEtc").val(),
            rsStrDt : $("#rsStrDt").val(),
            rsEndDt : $("#rsEndDt").val(),
            rsActEquip : $("#rsActEquip").val(),
            empSeq : $("#empSeq").val(),

            step : $("#step").val(),
            stepColumn : $("#stepColumn").val(),
            nextStepColumn : $("#nextStepColumn").val(),
            stepValue : $("#stepValue").val(),
            nextStepValue : $("#nextStepValue").val(),
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

        fd.append("step", data.step);
        fd.append("stepColumn", data.stepColumn);
        fd.append("nextStepColumn", data.nextStepColumn);
        fd.append("stepValue", data.stepValue);
        fd.append("nextStepValue", data.nextStepValue);

        if($("#designImg")[0].files.length == 1){
            fd.append("designImg", $("#designImg")[0].files[0]);
        }

        if($("#prodImg")[0].files.length == 1){
            fd.append("prodImg", $("#prodImg")[0].files[0]);
        }

        $.ajax({
            url : "/project/engn/setResultInfo",
            data : fd,
            type : "post",
            dataType : "json",
            contentType: false,
            processData: false,
            enctype : 'multipart/form-data',
            async: false,
            success : function(rs){
                if(rs.code == 200){
                    window.location.href="/project/pop/viewRegProject.do?pjtSn=" + data.pjtSn + "&tab=7";
                }
            }
        });
    },

    fileChange : function(e){
        $(e).next().text($(e)[0].files[0].name);
    },

    resDrafting: function() {
        $("#resDraftFrm").one("submit", function() {
            var url = "/popup/cam_project/approvalFormPopup/resApprovalPop.do";
            var name = "_self";
            var option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=yes, scrollbars = yes, status=no, top=50, left=50"
            var popup = window.open(url, name, option);
            this.action = "/popup/cam_project/approvalFormPopup/resApprovalPop.do";
            this.method = 'POST';
            this.target = '_self';
        }).trigger("submit");
    },
}