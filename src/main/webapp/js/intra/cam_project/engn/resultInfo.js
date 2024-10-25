var resultInfo = {

    global : {
        fileArray: [],
        attFiles: []
    },

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
        resultInfo.fn_setHtml();
    },

    fn_setHtml: function(){
        const pjtSn = $("#pjtSn").val();

        let html = '';
        html += '<tr>';
        html += '   <th>구분</th>';
        html += '   <th>수주</th>';
        html += '   <th>매출</th>';
        html += '   <th colspan="2">비용</th>';
        html += '   <th colspan="2">수익</th>';
        html += '</tr>';

        let amt01 = 0;
        let amt02 = 0;
        let amt03 = 0;
        let amt04 = 0;
        let amt05 = 0;
        let amt06 = 0;

        let amt11 = 0;
        let amt12 = 0;
        let amt13 = 0;
        let amt14 = 0;
        let amt15 = 0;
        let amt16 = 0;
        /** 엔지니어링 */
        if(commonProject.global.busnClass == "D" || commonProject.global.busnClass == "V"){

            const pjtInfo = customKendo.fn_customAjax("/project/engn/getDelvData", {pjtSn: pjtSn});
            const estInfo = customKendo.fn_customAjax("/project/getStep1Data", {pjtSn: pjtSn});
            const devInfo = customKendo.fn_customAjax("/project/engn/getDevData", {pjtSn: pjtSn});

            const delvMap = pjtInfo.delvMap;
            const map = pjtInfo.map;
            const devMap = devInfo.rs;
            const purcResult = customKendo.fn_customAjax("/project/getInvList", {devSn: devMap.DEV_SN});

            const resPurcResult = customKendo.fn_customAjax("/purc/getPurcReqClaimList2.do", {pjtSn: pjtSn});
            const tripResult = customKendo.fn_customAjax("/bustrip/getProjectBustList", {pjtSn: pjtSn});
            const exnpResult = customKendo.fn_customAjax("/payApp/getPjtExnpList", {pjtSn: pjtSn});

            /** 초기계획 시작 */
            const purcList = purcResult.list;
            let invSum = 0;
            for(let i=0; i<purcList.length; i++){
                const map = purcList[i];
                invSum += Number(map.EST_TOT_AMT);
            }
            let invPer = (invSum / Number(map.PJT_AMT) * 100);

            amt01 = Number(map.PJT_AMT) == 0 ? "0" : Number(map.PJT_AMT);
            amt02 = Number(map.PJT_AMT) == 0 ? "0" : Number(map.PJT_AMT);

            amt03 = invSum;
            amt04 = pjtPer(invPer, 1);

            amt05 = (Number(map.PJT_AMT)-invSum) == 0 ? "0" : Number(map.PJT_AMT)-invSum;
            amt06 = pjtPer(100-invPer, 1);
            /** 초기계획 끝 */

            /** 달성결과 시작 */
            const resPurcList = resPurcResult.list;
            let resInvSum = 0;
            for(let i=0; i<resPurcList.length; i++){
                const resPurcMap = resPurcList[i];
                if(resPurcMap.ORG_YN == "N"){
                    if(commonProject.global.busnClass == "D" || commonProject.global.busnClass == "V"){
                        resInvSum += Number(resPurcMap.PURC_SUP_AMT);
                    }else{
                        resInvSum += Number(resPurcMap.PURC_SUP_AMT);
                    }
                }else{
                    let amt = Number(resPurcMap.PURC_ITEM_AMT_SUM);
                    let amt2 = Math.round(amt/10);
                    let itemAmt = 0;

                    if(commonProject.global.busnClass == "D" || commonProject.global.busnClass == "V"){
                        itemAmt = amt;
                    }else{
                        if(e.InTax == "0"){     // 부가세 미포함
                            itemAmt = amt + amt2;
                        } else if(e.InTax == "1"){  // 부가세 포함
                            itemAmt = amt;
                        } else  if(e.InTax == "2"){ // 면세
                            itemAmt = amt;
                        }
                    }
                    resInvSum += Math.round(itemAmt);
                }
            }
            console.log("구매결과 합계 값 : ", resInvSum);

            const bustList = tripResult.list;
            let bustSum = 0;
            for(let i=0; i<bustList.length; i++){
                const bustMap = bustList[i];
                if(bustMap.TRIP_CODE != "4"){
                    resInvSum  += Number(bustMap.RES_EXNP_SUM);
                    bustSum  += Number(bustMap.RES_EXNP_SUM);
                } else {
                    resInvSum  += Number(bustMap.OVER_TOT_COST);
                    bustSum  += Number(bustMap.RES_EXNP_SUM);
                }
            }
            console.log("출장결과 합계 값 : ", bustSum);

            const exnpList = exnpResult.list;
            let exnpSum = 0;
            for(let i=0; i<exnpList.length; i++){
                const exnpMap = exnpList[i];
                resInvSum += Number(exnpMap.COST_SUM);
                exnpSum += Number(exnpMap.COST_SUM);
            }
            console.log("지출결과 합계 값 : ", exnpSum);

            let resInvPer = (resInvSum / map.PJT_AMT * 100);

            amt11 = Number(map.PJT_AMT) == 0 ? "0" : Number(map.PJT_AMT);
            amt12 = Number(map.PJT_AMT) == 0 ? "0" : Number(map.PJT_AMT);

            amt13 = resInvSum == 0 ? "0" : resInvSum;
            amt14 = pjtPer(resInvPer, 1);

            amt15 = (Number(map.PJT_AMT)-resInvSum) == 0 ? "0" : Number(map.PJT_AMT)-resInvSum;
            amt16 = pjtPer(100-resInvPer, 1);
            /** 달성결과 끝 */

        }else if(commonProject.global.busnClass == "R"){

            const pjtInfo = customKendo.fn_customAjax("/project/getProjectStep", {pjtSn: pjtSn});
            const rndInfo = customKendo.fn_customAjax("/projectRnd/getRndDetail", {pjtSn: pjtSn});
            const devInfo = customKendo.fn_customAjax("/project/engn/getDevData", {pjtSn: pjtSn});

            const map = pjtInfo.rs;
            const delvMap = rndInfo.map;
            const devMap = devInfo.rs;

            const purcResult = customKendo.fn_customAjax("/project/getInvList", {devSn: devMap.DEV_SN});
            const resPurcResult = customKendo.fn_customAjax("/purc/getPurcReqClaimList.do", {pjtSn: pjtSn});
            const tripResult = customKendo.fn_customAjax("/bustrip/getProjectBustList", {pjtSn: map.PJT_SN});

            /** 초기계획 시작 */
            const purcList = purcResult.list;
            let invSum = 0;
            for(let i=0; i<purcList.length; i++){
                const map = purcList[i];
                invSum += Number(map.EST_TOT_AMT);
            }
            let invPer = (invSum / Number(map.PJT_AMT) * 100);

            amt01 = Number(map.PJT_AMT) == 0 ? "0" : Number(map.PJT_AMT);
            amt02 = Number(map.PJT_AMT) == 0 ? "0" : Number(map.PJT_AMT);

            amt03 = invSum;
            amt04 = pjtPer(invPer, 1);

            amt05 = (Number(map.PJT_AMT)-invSum) == 0 ? "0" : Number(map.PJT_AMT)-invSum;
            amt06 = pjtPer(100-invPer, 1);
            /** 초기계획 끝 */

            /** 달성결과 시작 */
            const resPurcList = resPurcResult.list;
            let resInvSum = 0;
            for(let i=0; i<resPurcList.length; i++){
                const resPurcMap = resPurcList[i];
                if(resPurcMap.CLAIM_STATUS == "CAYSY"){
                    if(resPurcMap.ORG_YN == 'N'){
                        resInvSum += Number(resPurcMap.PURC_SUP_AMT);
                    } else {
                        let amt = Number(resPurcMap.PURC_ITEM_AMT_SUM);
                        let amt2 = Math.round(amt/10);
                        let itemAmt = 0;
                        itemAmt = amt;
                        resInvSum += Number(itemAmt);
                    }
                }
            }
            console.log("구매결과 합계 값 : ", resInvSum);

            const bustList = tripResult.list;
            let bustSum = 0;
            for(let i=0; i<bustList.length; i++){
                const bustMap = bustList[i];
                if(bustMap.TRIP_CODE != "4"){
                    resInvSum  += Number(bustMap.RES_EXNP_SUM);
                    bustSum  += Number(bustMap.RES_EXNP_SUM);
                } else {
                    resInvSum  += Number(bustMap.OVER_TOT_COST);
                    bustSum  += Number(bustMap.RES_EXNP_SUM);
                }
            }
            console.log("출장결과 합계 값 : ", bustSum);
            let resInvPer = (resInvSum / map.PJT_AMT * 100);

            amt11 = Number(map.PJT_AMT) == 0 ? "0" : Number(map.PJT_AMT);
            amt12 = Number(map.PJT_AMT) == 0 ? "0" : Number(map.PJT_AMT);

            amt13 = resInvSum == 0 ? "0" : resInvSum;
            amt14 = pjtPer(resInvPer, 1);

            amt15 = (Number(map.PJT_AMT)-resInvSum) == 0 ? "0" : Number(map.PJT_AMT)-resInvSum;
            amt16 = pjtPer(100-resInvPer, 1);
            /** 달성결과 끝 */

        }else if(commonProject.global.busnClass == "S"){

            const pjtInfo = customKendo.fn_customAjax("/project/getProjectStep", {pjtSn: pjtSn});
            const unRndInfo = customKendo.fn_customAjax("/projectUnRnd/getUnRndDetail", {pjtSn: pjtSn});
            const devInfo = customKendo.fn_customAjax("/project/engn/getDevData", {pjtSn: pjtSn});

            const map = pjtInfo.rs;
            const delvMap = unRndInfo.map;
            const devMap = devInfo.rs;

            const purcResult = customKendo.fn_customAjax("/project/getInvList", {devSn: devMap.DEV_SN});
            const resPurcResult = customKendo.fn_customAjax("/purc/getPurcReqClaimList.do", {pjtSn: pjtSn});
            const tripResult = customKendo.fn_customAjax("/bustrip/getProjectBustList", {pjtSn: map.PJT_SN});

            /** 초기계획 시작 */
            const purcList = purcResult.list;
            let invSum = 0;
            for(let i=0; i<purcList.length; i++){
                const map = purcList[i];
                invSum += Number(map.EST_TOT_AMT);
            }
            let invPer = (invSum / Number(map.PJT_AMT) * 100);

            amt01 = Number(map.PJT_AMT) == 0 ? "0" : Number(map.PJT_AMT);
            amt02 = Number(map.PJT_AMT) == 0 ? "0" : Number(map.PJT_AMT);

            amt03 = invSum;
            amt04 = pjtPer(invPer, 1);

            amt05 = (Number(map.PJT_AMT)-invSum) == 0 ? "0" : Number(map.PJT_AMT)-invSum;
            amt06 = pjtPer(100-invPer, 1);
            /** 초기계획 끝 */

            /** 달성결과 시작 */
            const resPurcList = resPurcResult.list;
            let resInvSum = 0;
            for(let i=0; i<resPurcList.length; i++){
                const resPurcMap = resPurcList[i];
                if(resPurcMap.CLAIM_STATUS == "CAYSY"){
                    if(resPurcMap.ORG_YN == 'N'){
                        resInvSum += Number(resPurcMap.PURC_SUP_AMT);
                    } else {
                        let amt = Number(resPurcMap.PURC_ITEM_AMT_SUM);
                        let amt2 = Math.round(amt/10);
                        let itemAmt = 0;
                        itemAmt = amt;
                        resInvSum += Number(itemAmt);
                    }
                }
            }
            console.log("구매결과 합계 값 : ", resInvSum);

            const bustList = tripResult.list;
            let bustSum = 0;
            for(let i=0; i<bustList.length; i++){
                const bustMap = bustList[i];
                if(bustMap.TRIP_CODE != "4"){
                    resInvSum  += Number(bustMap.RES_EXNP_SUM);
                    bustSum  += Number(bustMap.RES_EXNP_SUM);
                } else {
                    resInvSum  += Number(bustMap.OVER_TOT_COST);
                    bustSum  += Number(bustMap.RES_EXNP_SUM);
                }
            }
            console.log("출장결과 합계 값 : ", bustSum);
            let resInvPer = (resInvSum / map.PJT_AMT * 100);

            amt11 = Number(map.PJT_AMT) == 0 ? "0" : Number(map.PJT_AMT);
            amt12 = Number(map.PJT_AMT) == 0 ? "0" : Number(map.PJT_AMT);

            amt13 = resInvSum == 0 ? "0" : resInvSum;
            amt14 = pjtPer(resInvPer, 1);

            amt15 = (Number(map.PJT_AMT)-resInvSum) == 0 ? "0" : Number(map.PJT_AMT)-resInvSum;
            amt16 = pjtPer(100-resInvPer, 1);
            /** 달성결과 끝 */
        }
        html += '<tr>';
        html += '   <td style="text-align:center">초기계획</td>';
        html += '   <td style="text-align:right">'+comma(amt01)+'</td>';
        html += '   <td style="text-align:right">'+comma(amt02)+'</td>';
        html += '   <td style="text-align:right">'+comma(amt03)+'</td>';
        html += '   <td style="text-align:right">'+comma(amt04)+'</td>';
        html += '   <td style="text-align:right">'+comma(amt05)+'</td>';
        html += '   <td style="text-align:right">'+comma(amt06)+'</td>';
        html += '</tr>';

        html += '<tr>';
        html += '   <td style="text-align:center">달성결과</td>';
        html += '   <td style="text-align:right">'+comma(amt11)+'</td>';
        html += '   <td style="text-align:right">'+comma(amt12)+'</td>';
        html += '   <td style="text-align:right">'+comma(amt13)+'</td>';
        html += '   <td style="text-align:right">'+comma(amt14)+'</td>';
        html += '   <td style="text-align:right">'+comma(amt15)+'</td>';
        html += '   <td style="text-align:right">'+comma(amt16)+'</td>';
        html += '</tr>';
        $("#resultHtml").html(html);
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

        if(result.devFileList.length > 0){
            resultInfo.global.fileArray = result.devFileList;
            var html = '';

            for(var i = 0; i < result.devFileList.length; i++){
                html += '<li>';
                html += '   <span style="cursor: pointer" onclick="fileDown(\''+result.devFileList[i].file_path+result.devFileList[i].file_uuid+'\', \''+result.devFileList[i].file_org_name+'.'+result.devFileList[i].file_ext+'\')">'+result.devFileList[i].file_org_name+'.'+result.devFileList[i].file_ext+'</span>';
                html += '   <input type="button" value="X" class="" style="margin-left: 5px; border: none; background-color: transparent; color: red; font-weight: bold;" onclick="commonFileDel(' + result.devFileList[i].file_no + ', this)">';
                html += '</li>';
            }
            $("#ulSetFileName").append(html);
        } else {
            $("#ulSetFileName").empty();
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
            if(resultInfo.global.fileArray.length > 0){
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
            if(resultInfo.global.fileArray.length == "0" && resultInfo.global.attFiles.length == "0"){
                alert("제출문서를 등록해주세요.");
                return;
            }
        }else{
            if(resultInfo.global.fileArray.length == "0" && resultInfo.global.attFiles.length == "0"){
                alert("납품서를 등록해주세요.");
                return;
            }
        }

        // if($("#devFile")[0].files.length == 1){
        //     fd.append("devFile", $("#devFile")[0].files[0]);
        // }

        if($("#designImg")[0].files.length == 1){
            fd.append("designImg", $("#designImg")[0].files[0]);
        }

        if($("#prodImg")[0].files.length == 1){
            fd.append("prodImg", $("#prodImg")[0].files[0]);
        }

        if(resultInfo.global.attFiles != null){
            for(var i = 0; i < resultInfo.global.attFiles.length; i++){
                fd.append("devFile", resultInfo.global.attFiles[i]);
            }
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

    fileListChange: function(){
        for(var i = 0; i < $("input[name='devFile']")[0].files.length; i++){
            resultInfo.global.attFiles.push($("input[name='devFile']")[0].files[i]);
        }

        $("#ulFileName").empty();
        if(resultInfo.global.attFiles.length > 0){
            var html = '';
            for (var i = 0; i < resultInfo.global.attFiles.length; i++) {
                html += '<li>'
                html += resultInfo.global.attFiles[i].name.substring(0, resultInfo.global.attFiles[i].name.lastIndexOf(".")) + '.';
                html += resultInfo.global.attFiles[i].name.substring(resultInfo.global.attFiles[i].name.lastIndexOf(".")+1);
                html += '<input type="button" value="X" class="" style="margin-left: 5px; border: none; background-color: transparent; color: red; font-weight: bold;" onclick="resultInfo.fnUploadFile(' + i + ')">';
                html += '</li>';
            }

            $("#ulSetFileName").css('margin-bottom', 0);
            $("#ulFileName").append(html);
        }
    },

    fnUploadFile : function(e) {
        const dataTransfer = new DataTransfer();
        let fileArray = Array.from(resultInfo.global.attFiles);
        fileArray.splice(e, 1);
        fileArray.forEach(file => {
            dataTransfer.items.add(file);
        });

        resultInfo.global.attFiles = dataTransfer.files;

        if(resultInfo.global.attFiles.length > 0){
            $("#ulFileName").empty();

            var html = '';
            for (var i = 0; i < resultInfo.global.attFiles.length; i++) {
                html += '<li>'
                html += resultInfo.global.attFiles[i].name.substring(0, resultInfo.global.attFiles[i].name.lastIndexOf(".")) + '.';
                html += resultInfo.global.attFiles[i].name.substring(resultInfo.global.attFiles[i].name.lastIndexOf(".")+1);
                html += '<input type="button" value="X" class="" style="margin-left: 5px; border: none; background-color: transparent; color: red; font-weight: bold;" onclick="resultInfo.fnUploadFile(' + i + ')">';
                html += '</li>';
            }

            $("#ulFileName").append(html);
        } else {
            $("#ulFileName").empty();
        }

        if(resultInfo.global.attFiles.length == 0){
            resultInfo.global.attFiles = new Array();
        }

        resultInfo.global.attFiles = Array.from(resultInfo.global.attFiles);
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