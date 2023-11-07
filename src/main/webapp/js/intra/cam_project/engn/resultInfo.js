var resultInfo = {

    fn_defaultScript: function(){
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

        resultInfo.fn_setData();
    },

    fn_setData: function(){
        var data = {
            pjtSn: $("#pjtSn").val(),
        }

        var resultMap = customKendo.fn_customAjax("/project/engn/getResultInfo", data);
        var result = resultMap.result;
        console.log(resultMap);

        if(result.map != null){
            $("#rsIss").val(result.map.RS_ISS);
            $("#rsSupCont").val(result.map.SUP_CONT);
            $("#rsActEquip").val(result.map.RS_ACT_EQUIP);
            $("#rsEndDt").val(result.map.RS_END_DT);
            $("#rsStrDt").val(result.map.RS_STR_DT);
            $("#rsEtc").val(result.map.RS_ETC);

            /** 버튼 세팅 */
            resultInfo.fn_setButton(result.map);
        }

        if(result.designFileList != null){
            $("#designImgName").text(result.designFileList.file_org_name + "." +result.designFileList.file_ext);
        }

        if(result.prodFileList != null){
            $("#prodImgName").text(result.prodFileList.file_org_name + "." +result.prodFileList.file_ext);
        }
        resultInfo.fn_makeRowEngn(resultMap);
    },

    fn_makeRowEngn: function(rs){
        var data = {
            pjtSn: $("#pjtSn").val()
        }
        const result = customKendo.fn_customAjax("/project/engn/getResultPsMember", data);
        const ls = result.list;
        var html = "";

        /** 첫 행 */
        html += '<tr>';
        html += '   <td style="text-align: center; background-color: #dee4ed"></td>';
        html += '   <td style="text-align: center; background-color: #dee4ed">총금액</td>';
        for(var i=0; i<ls.length; i++){
            html += '   <td colspan="2" style="text-align: center; background-color: #dee4ed">'+ls[i].PS_EMP_NM+'</td>';
        }
        html += '</tr>';

        /** 매출 금액 계산 */
        var invAmt = 0;
        for(var i=0; i<rs.invInfo.length; i++){
            invAmt += rs.invInfo[i].EST_TOT_AMT;
        }

        /** 수주 */
        html += '<tr>';
        html += '   <td style="text-align: center; background-color: #dee4ed">수주</td>';
        html += '   <td>' +
            '           <input type="text" disabled id="resultDelvTotAmt" value="0" style="text-align: right" onkeyup="resultInfo.inputNumberFormat(this)" oninput="resultInfo.onlyNumber(this)" />' +
            '       </td>';
        for(var i=0; i<ls.length; i++){
            var value = 0;
            var calcAmt = 0;
            var type = "";
            if(ls[i].PS_PREP == 1 || (ls[i].PS_PREP == 0 && i==0)){
                type = "A";
                if(rs.result.map != undefined){
                    if(rs.result.map.DELV_PREP_A != null && rs.result.map.DELV_PREP_A != ""){
                        value = rs.result.map.DELV_PREP_A;
                    }
                }
            } else if (ls[i].PS_PREP == 2 || (ls[i].PS_PREP == 0 && i==1)){
                type = "B";
                if(rs.result.map != undefined) {
                    if (rs.result.map.DELV_PREP_B != null && rs.result.map.DELV_PREP_B != "") {
                        value = rs.result.map.DELV_PREP_B;
                    }
                }
            } else if (ls[i].PS_PREP == 3 || (ls[i].PS_PREP == 0 && i==2)){
                type = "C";
                if(rs.result.map != undefined) {
                    if (rs.result.map.DELV_PREP_C != null && rs.result.map.DELV_PREP_C != "") {
                        value = rs.result.map.DELV_PREP_C;
                    }
                }
            }
            calcAmt = Math.round(rs.pjtInfo.PJT_AMT * (value * 0.01));

            html += '   <td>';
            html += '       <input type="text" id="delvPrepAmt'+type+'" onkeyup="resultInfo.inputNumberFormat(this)" oninput="resultInfo.onlyNumber(this)" disabled class="prepAmt" value="'+ resultInfo.comma(calcAmt) +'" style="text-align: right" />';
            html += '   </td>';
            html += '   <td style="text-align: right">';
            html += '       <input type="text" id="delvPrep'+type+'" onkeyup="resultInfo.fn_DelvCalcPercent(this , \''+type+'\');" oninput="resultInfo.onlyNumber(this)" class="prepCase" value="'+value+'" style="width: 80%; text-align: right" /> %';
            html += '   </td>';
        }
        html += '</tr>';

        /** 매출 */
        html += '<tr>';
        html += '   <td style="text-align: center; background-color: #dee4ed">매출</td>';
        html += '   <td>' +
            '           <input type="text" disabled id="resultInvTotAmt" value="0" style="text-align: right" onkeyup="resultInfo.inputNumberFormat(this)" oninput="resultInfo.onlyNumber(this)" />' +
            '       </td>';

        for(var i=0; i<ls.length; i++){
            var value = 0;
            var calcAmt = 0;
            var type = "";
            if(ls[i].PS_PREP == 1 || (ls[i].PS_PREP == 0 && i==0)){
                type = "A";
                if(rs.result.map != undefined){
                    if(rs.result.map.INV_PREP_A != null && rs.result.map.INV_PREP_A != ""){
                        value = rs.result.map.INV_PREP_A;
                    }
                }
            } else if (ls[i].PS_PREP == 2 || (ls[i].PS_PREP == 0 && i==1)){
                type = "B";
                if(rs.result.map != undefined) {
                    if (rs.result.map.INV_PREP_B != null && rs.result.map.INV_PREP_B != "") {
                        value = rs.result.map.INV_PREP_B;
                    }
                }
            } else if (ls[i].PS_PREP == 3 || (ls[i].PS_PREP == 0 && i==2)){
                type = "C";
                if(rs.result.map != undefined) {
                    if (rs.result.map.INV_PREP_C != null && rs.result.map.INV_PREP_C != "") {
                        value = rs.result.map.INV_PREP_C;
                    }
                }
            }
            calcAmt = Math.round(invAmt * (value * 0.01));

            html += '   <td>';
            html += '       <input type="text" id="invPrepAmt'+type+'" onkeyup="resultInfo.inputNumberFormat(this)" oninput="resultInfo.onlyNumber(this)" disabled class="prepAmt" value="'+ resultInfo.comma(calcAmt) +'" style="text-align: right" />';
            html += '   </td>';
            html += '   <td style="text-align: right">';
            html += '       <input type="text" id="invPrep'+type+'" onkeyup="resultInfo.fn_InvCalcPercent(this , \''+type+'\');" oninput="resultInfo.onlyNumber(this)" class="prepCase" value="'+value+'" style="width: 80%; text-align: right" /> %';
            html += '   </td>';
        }
        html += '</tr>';

        /** 수익 */
        html += '<tr>';
        html += '   <td style="text-align: center; background-color: #dee4ed">수익</td>';
        html += '   <td>' +
            '           <input type="text" disabled id="resultTotAmt" value="0" style="text-align: right" onkeyup="resultInfo.inputNumberFormat(this)" oninput="resultInfo.onlyNumber(this)" />' +
            '       </td>';

        for(var i=0; i<ls.length; i++){
            var value = 0;
            var calcAmt = 0;
            var type = "";
            if(ls[i].PS_PREP == 1 || (ls[i].PS_PREP == 0 && i==0)){
                type = "A";
                if(rs.result.map != undefined){
                    if(rs.result.map.PREP_A != null && rs.result.map.PREP_A != ""){
                        value = rs.result.map.PREP_A;
                    }
                }
            } else if (ls[i].PS_PREP == 2 || (ls[i].PS_PREP == 0 && i==1)){
                type = "B";
                if(rs.result.map != undefined) {
                    if (rs.result.map.PREP_B != null && rs.result.map.PREP_B != "") {
                        value = rs.result.map.PREP_B;
                    }
                }
            } else if (ls[i].PS_PREP == 3 || (ls[i].PS_PREP == 0 && i==2)){
                type = "C";
                if(rs.result.map != undefined) {
                    if (rs.result.map.PREP_C != null && rs.result.map.PREP_C != "") {
                        value = rs.result.map.PREP_C;
                    }
                }
            }
            calcAmt = Math.round((rs.pjtInfo.PJT_AMT - invAmt) * (value * 0.01));

            html += '   <td>';
            html += '       <input type="text" id="prepAmt'+type+'" onkeyup="resultInfo.inputNumberFormat(this)" oninput="resultInfo.onlyNumber(this)" disabled class="prepAmt" value="'+ resultInfo.comma(calcAmt) +'" style="text-align: right" />';
            html += '   </td>';
            html += '   <td style="text-align: right">';
            html += '       <input type="text" id="prep'+type+'" onkeyup="resultInfo.fn_calcPercent(this , \''+type+'\');" oninput="resultInfo.onlyNumber(this)" class="prepCase" value="'+value+'" style="width: 80%; text-align: right" /> %';
            html += '   </td>';
        }
        html += '</tr>';

        $("#psRsTable").append(html);
        $(".prepAmt, .prepCase, #resultDelvTotAmt, #resultInvTotAmt, #resultTotAmt").kendoTextBox();

        $("#resultDelvTotAmt").val(resultInfo.comma(rs.pjtInfo.PJT_AMT));
        $("#resultInvTotAmt").val(resultInfo.comma(invAmt));
        $("#resultTotAmt").val(resultInfo.comma(rs.pjtInfo.PJT_AMT - invAmt));
    },

    fn_DelvCalcPercent: function (obj, type){
        var A = $("#delvPrepA").val();
        var B = $("#delvPrepB").val();
        var C = $("#delvPrepC").val();

        if(A == undefined){
            A = 0;
        }
        if(B == undefined){
            B = 0;
        }
        if(C == undefined){
            C = 0;
        }

        if((Number(A) + Number(B) + Number(C)) > 100){
            alert("실적률이 100%를 초과하였습니다.");
            return;
        }

        $("#delvPrepAmt" + type).val(resultInfo.comma(Math.round(resultInfo.uncomma($("#resultDelvTotAmt").val()) * (resultInfo.uncomma(obj.value) * 0.01))));

        return resultInfo.inputNumberFormat(obj);
    },

    fn_InvCalcPercent: function (obj, type){
        var A = $("#invPrepA").val();
        var B = $("#invPrepB").val();
        var C = $("#invPrepC").val();

        if(A == undefined){
            A = 0;
        }
        if(B == undefined){
            B = 0;
        }
        if(C == undefined){
            C = 0;
        }

        if((Number(A) + Number(B) + Number(C)) > 100){
            alert("실적률이 100%를 초과하였습니다.");
            return;
        }

        $("#invPrepAmt" + type).val(resultInfo.comma(Math.round(resultInfo.uncomma($("#resultInvTotAmt").val()) * (resultInfo.uncomma(obj.value) * 0.01))));

        return resultInfo.inputNumberFormat(obj);
    },

    fn_calcPercent: function (obj, type){
        var A = $("#prepA").val();
        var B = $("#prepB").val();
        var C = $("#prepC").val();

        if(A == undefined){
            A = 0;
        }
        if(B == undefined){
            B = 0;
        }
        if(C == undefined){
            C = 0;
        }

        if((Number(A) + Number(B) + Number(C)) > 100){
            alert("실적률이 100%를 초과하였습니다.");
            return;
        }

        $("#prepAmt" + type).val(resultInfo.comma(Math.round(resultInfo.uncomma($("#resultTotAmt").val()) * (resultInfo.uncomma(obj.value) * 0.01))));

        return resultInfo.inputNumberFormat(obj);
    },

    fn_setButton: function(resMap){
        let buttonHtml = "";
        if(resMap.STATUS == "0"){
            buttonHtml += '<button type="button" id="saveBtn" style="float: right; margin-bottom: 10px;" class="k-button k-button-solid-info" onclick="resultInfo.fn_save()">저장</button>';
            buttonHtml += '<button type="button" id="resAppBtn" style="float: right; margin-right: 5px;" class="k-button k-button-solid-info" onclick="resultInfo.resDrafting()">상신</button>';
        }else if(resMap.STATUS == "10"){
            buttonHtml += '<button type="button" id="delvCanBtn" style="float: right; margin-bottom: 10px;" class="k-button k-button-solid-error" onclick="docApprovalRetrieve(\''+resMap.DOC_ID+'\', \''+resMap.APPRO_KEY+'\', 1, \'retrieve\');">회수</button>';
        }else if(resMap.STATUS == "30" || resMap.STATUS == "40"){
            buttonHtml += '<button type="button" id="saveBtn" style="float: right; margin-bottom: 10px;" class="k-button k-button-solid-info" onclick="resultInfo.fn_save()">저장</button>';
            buttonHtml += '<button type="button" id="delvCanBtn" style="float: right; margin-right: 5px;" class="k-button k-button-solid-error" onclick="tempOrReDraftingPop(\''+resMap.DOC_ID+'\', \''+resMap.DOC_MENU_CD+'\', \''+resMap.APPRO_KEY+'\', 2, \'reDrafting\');">재상신</button>';
        }else if(resMap.STATUS == "100"){
            buttonHtml += '<button type="button" id="delvCanBtn" style="float: right; margin-bottom: 10px;" class="k-button k-button-solid-base" onclick="approveDocView(\''+resMap.DOC_ID+'\', \''+resMap.APPRO_KEY+'\', \''+resMap.DOC_MENU_CD+'\');">열람</button>';
        }else{
            buttonHtml += '<button type="button" id="saveBtn" style="float: right; margin-bottom: 10px;" class="k-button k-button-solid-info" onclick="resultInfo.fn_save()">저장</button>';
        }

        $("#resultBtnDiv").html(buttonHtml);
    },

    fn_save: function (){
        var delvA = $("#prepA").val();
        var delvB = $("#prepB").val();
        var delvC = $("#prepC").val();

        var invA = $("#prepA").val();
        var invB = $("#prepB").val();
        var invC = $("#prepC").val();

        var A = $("#prepA").val();
        var B = $("#prepB").val();
        var C = $("#prepC").val();

        if(delvA == undefined){ delvA = 0; }
        if(delvB == undefined){ delvB = 0; }
        if(delvC == undefined){ delvC = 0; }

        if(invA == undefined){ invA = 0; }
        if(invB == undefined){ invB = 0; }
        if(invC == undefined){ invC = 0; }

        if(A == undefined){ A = 0; }
        if(B == undefined){ B = 0; }
        if(C == undefined){ C = 0; }

        if((Number(delvA) + Number(delvB) + Number(delvC)) > 100){
            alert("수주 실적률이 100%를 초과하였습니다.");
            return;
        }

        if((Number(invA) + Number(invB) + Number(invC)) > 100){
            alert("매출 실적률이 100%를 초과하였습니다.");
            return;
        }

        if((Number(A) + Number(B) + Number(C)) > 100){
            alert("수익 실적률이 100%를 초과하였습니다.");
            return;
        }

        if((Number(delvA) + Number(delvB) + Number(delvC)) < 100){
            alert("수주 실적률이 100% 미만입니다.");
            return;
        }

        if((Number(invA) + Number(invB) + Number(invC)) > 100){
            alert("매출 실적률이 100% 미만입니다.");
            return;
        }

        if((Number(A) + Number(B) + Number(C)) > 100){
            alert("수익 실적률이 100% 미만입니다.");
            return;
        }

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

        if($("#delvPrepA").val() != undefined){
            data.delvPrepA = $("#delvPrepA").val();
            fd.append("delvPrepA", data.delvPrepA);
        }
        if($("#delvPrepB").val() != undefined){
            data.delvPrepB = $("#delvPrepB").val();
            fd.append("delvPrepB", data.delvPrepB);
        }
        if($("#delvPrepC").val() != undefined){
            data.delvPrepC = $("#delvPrepC").val();
            fd.append("delvPrepC", data.delvPrepC);
        }

        if($("#invPrepA").val() != undefined){
            data.invPrepA = $("#invPrepA").val();
            fd.append("invPrepA", data.invPrepA);
        }
        if($("#invPrepB").val() != undefined){
            data.invPrepB = $("#invPrepB").val();
            fd.append("invPrepB", data.invPrepB);
        }
        if($("#invPrepC").val() != undefined){
            data.invPrepC = $("#invPrepC").val();
            fd.append("invPrepC", data.invPrepC);
        }

        if($("#prepA").val() != undefined){
            data.prepA = $("#prepA").val();
            fd.append("prepA", data.prepA);
        }
        if($("#prepB").val() != undefined){
            data.prepB = $("#prepB").val();
            fd.append("prepB", data.prepB);
        }
        if($("#prepC").val() != undefined){
            data.prepC = $("#prepC").val();
            fd.append("prepC", data.prepC);
        }

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
            url: "/project/engn/setResultInfo",
            data: fd,
            type: "post",
            dataType: "json",
            contentType: false,
            processData: false,
            enctype: 'multipart/form-data',
            async: false,
            success: function(rs){
                if(rs.code == 200){
                    if($("#busnClass").val() == "D"){
                        window.location.href="/project/pop/viewRegProject.do?pjtSn=" + data.pjtSn + "&tab=7";
                    }else if($("#busnClass").val() == "R"){
                        window.location.href="/projectRnd/pop/regProject.do?pjtSn=" + data.pjtSn + "&tab=7";
                    }else if($("#busnClass").val() == "S"){
                        window.location.href="/projectUnRnd/pop/regProject.do?pjtSn=" + data.pjtSn + "&tab=7";
                    }
                }
            }
        });
    },

    fileChange: function(e){
        $(e).next().text($(e)[0].files[0].name);
    },

    resDrafting: function(){
        $("#resDraftFrm").one("submit", function(){
            var url = "";
            if($("#busnClass").val() == "D"){
                url = "/popup/cam_project/approvalFormPopup/resApprovalPop.do";
            }else if($("#busnClass").val() == "R" || $("#busnClass").val() == "S"){
                url = "/popup/cam_project/approvalFormPopup/rndResApprovalPop.do";
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