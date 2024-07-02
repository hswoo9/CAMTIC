var bustripInit = {
    /** 관련사업, 프로젝트 데이터 세팅 */
    settingProjectDataInit: function(busInfo){
        const busnName = busInfo.BUSN_NAME;
        if(busnName != "" && busnName != null){
            $("#busnName").val(busInfo.BUSN_NAME);
        }
    },

    /** 동반자 데이터 세팅 */
    settingCompanionDataInit: function(list){
        let popEmpSeq = "" ;
        let popEmpName = "";
        let popDeptSeq = "";
        let popDeptName = "";
        console.log("출장자",list);

        for(let i=0; i<list.length; i++){
            if(i != 0){
                popEmpSeq += ",";
                popEmpName += ",";
                popDeptSeq += ",";
                popDeptName += ",";
            }
            popEmpSeq += list[i].EMP_SEQ;
            popEmpName += list[i].EMP_NAME;
            popDeptSeq += list[i].DEPT_SEQ;
            popDeptName += list[i].DEPT_NAME;
        }

        $("#popEmpSeq").val(popEmpSeq);
        $("#popEmpName").val(popEmpName);
        $("#popDeptSeq").val(popDeptSeq);
        $("#popDeptName").val(popDeptName);
    },

    /** 여비표 데이터 세팅 */
    settingExnpDataInit: function(map){
        if($("#mod").val() != "mng"){
            return;
        }
        let html = "";

        let oilCostTotal = 0;
        let trafCostTotal = 0;
        let trafDayTotal = 0;
        let tollCostTotal = 0;
        let dayCostTotal = 0;
        let eatCostTotal = 0;
        let parkingCostTotal = 0;
        let etcCostTotal = 0;
        let totalCostTotal = 0;

        let oilCorpCostTotal = 0;
        let trafCorpCostTotal = 0;
        let trafDayCorpotal = 0;
        let tollCorpCostTotal = 0;
        let dayCorpCostTotal = 0;
        let eatCorpCostTotal = 0;
        let parkingCorpCostTotal = 0;
        let etcCorpCostTotal = 0;
        let totalCorpCostTotal = 0;

        for(let i=0; i<map.length; i++){
            if(map[i].EMP_SEQ == null){
                continue;
            }

            let personTot = 0;

            oilCostTotal += Number(map[i].OIL_COST.replace(",", ""));
            trafCostTotal += Number(map[i].TRAF_COST.replace(",", ""));
            trafDayTotal += Number(map[i].TRAF_DAY_COST.replace(",", ""));
            tollCostTotal += Number(map[i].TOLL_COST.replace(",", ""));
            dayCostTotal += Number(map[i].DAY_COST.replace(",", ""));
            eatCostTotal += Number(map[i].EAT_COST.replace(",", ""));
            parkingCostTotal += Number(map[i].PARKING_COST.replace(",", ""));
            etcCostTotal += Number(map[i].ETC_COST.replace(",", ""));
            totalCostTotal += Number(map[i].TOT_COST.replace(",", ""));

            html += "<tr style='text-align: right'>";
            html += "   <td style='text-align: center'>"+map[i].EMP_NAME+"</td>";
            if(map[i].OIL_CORP_YN != "Y"){
                personTot += Number(map[i].OIL_COST.replace(",", ""));
                html += "   <td>"+map[i].OIL_COST+"</td>";
            }else{
                oilCorpCostTotal += Number(map[i].OIL_COST.replace(",", ""));
                html += "   <td>0</td>";
            }

            if(map[i].TRAF_CORP_YN != "Y"){
                personTot += Number(map[i].TRAF_COST.replace(",", ""));
                html += "   <td>"+map[i].TRAF_COST+"</td>";
            }else{
                trafCorpCostTotal += Number(map[i].TRAF_COST.replace(",", ""));
                html += "   <td>0</td>";
            }

            if(map[i].TRAF_DAY_CORP_YN != "Y"){
                personTot += Number(map[i].TRAF_DAY_COST.replace(",", ""));
                html += "   <td>"+map[i].TRAF_DAY_COST+"</td>"
            }else{
                trafDayCorpotal += Number(map[i].TRAF_DAY_COST.replace(",", ""));
                html += "   <td>0</td>";
            }

            if(map[i].TOLL_CORP_YN != "Y"){
                personTot += Number(map[i].TOLL_COST.replace(",", ""));
                html += "   <td>"+map[i].TOLL_COST+"</td>";
            }else{
                tollCorpCostTotal += Number(map[i].TOLL_COST.replace(",", ""));
                html += "   <td>0</td>";
            }

            personTot += Number(map[i].DAY_COST.replace(",", ""));
            html += "   <td>"+map[i].DAY_COST+"</td>";

            if(map[i].EAT_CORP_YN != "Y"){
                personTot += Number(map[i].EAT_COST.replace(",", ""));
                html += "   <td>"+map[i].EAT_COST+"</td>";
            }else{
                eatCorpCostTotal += Number(map[i].EAT_COST.replace(",", ""));
                html += "   <td>0</td>";
            }

            if(map[i].PARKING_CORP_YN != "Y"){
                personTot += Number(map[i].PARKING_COST.replace(",", ""));
                html += "   <td>"+map[i].PARKING_COST+"</td>";
            }else{
                parkingCorpCostTotal += Number(map[i].PARKING_COST.replace(",", ""));
                html += "   <td>0</td>";
            }

            if(map[i].ETC_CORP_YN != "Y"){
                personTot += Number(map[i].ETC_COST.replace(",", ""));
                html += "   <td>"+map[i].ETC_COST+"</td>";
            }else{
                etcCorpCostTotal += Number(map[i].ETC_COST.replace(",", ""));
                html += "   <td>0</td>";
            }

            html += "   <td>"+fn_numberWithCommas(personTot)+"</td>";
            html += "</tr>";
        }

        html += "<tr style='text-align: right'>";
        html += "   <td style='text-align: center'>법인카드</td>";
        html += "   <td>0</td>";
        html += "   <td>"+fn_comma(trafCorpCostTotal)+"</td>";
        html += "   <td>"+fn_comma(trafDayCorpotal)+"</td>";
        html += "   <td>"+fn_comma(tollCorpCostTotal)+"</td>";
        html += "   <td>"+fn_comma(dayCorpCostTotal)+"</td>";
        html += "   <td>"+fn_comma(eatCorpCostTotal)+"</td>";
        html += "   <td>"+fn_comma(parkingCorpCostTotal)+"</td>";
        html += "   <td>"+fn_comma(etcCorpCostTotal)+"</td>";
        html += "   <td>"+fn_comma(trafCorpCostTotal+trafDayCorpotal+tollCorpCostTotal+dayCorpCostTotal+eatCorpCostTotal+parkingCorpCostTotal+etcCorpCostTotal+etcCorpCostTotal)+"</td>";
        html += "</tr>";

        html += "<tr style='text-align: right'>";
        html += "   <td style='text-align: center'>법인차량</td>";
        html += "   <td>"+fn_comma(oilCorpCostTotal)+"</td>";
        html += "   <td>0</td>";
        html += "   <td>0</td>";
        html += "   <td>0</td>";
        html += "   <td>0</td>";
        html += "   <td>0</td>";
        html += "   <td>0</td>";
        html += "   <td>0</td>";
        html += "   <td>"+fn_comma(oilCorpCostTotal)+"</td>";
        html += "</tr>";

        html += "<tr style='text-align: right'>";
        html += "   <td style='text-align: center'>합계</td>";
        html += "   <td>"+fn_comma(oilCostTotal)+"</td>";
        html += "   <td>"+fn_comma(trafCostTotal)+"</td>";
        html += "   <td>"+fn_comma(trafDayTotal)+"</td>";
        html += "   <td>"+fn_comma(tollCostTotal)+"</td>";
        html += "   <td>"+fn_comma(dayCostTotal)+"</td>";
        html += "   <td>"+fn_comma(eatCostTotal)+"</td>";
        html += "   <td>"+fn_comma(parkingCostTotal)+"</td>";
        html += "   <td>"+fn_comma(etcCostTotal)+"</td>";
        html += "   <td>"+fn_comma(totalCostTotal)+"</td>";
        html += "</tr>";

        html += "<tr style='text-align: right'>";
        html += "   <td style='text-align: center'>영수증</td>";
        html += "   <td style='text-align: center'><b>-</b></td>";

        let exnpTraf = customKendo.fn_customAjax("/bustrip/getExnpFile", {
            fileCd: "exnpTraf",
            hrBizReqResultId: hrBizReqResultId
        }).list;
        html += "   <td style='text-align: center'>";
        if(exnpTraf.length > 0){
            for(let i=0; i<exnpTraf.length; i++){
                let row = exnpTraf[i];
                if(i != 0){
                    html += "<br>";
                }
                html += '<span style="cursor: pointer" onclick="fileDown(\''+row.file_path+row.file_uuid+'\', \''+row.file_org_name+'.'+row.file_ext+'\')">'+row.file_org_name+'</span>'
            }
        }else{
            html += "<b>-</b>";
        }
        html += "</td>";

        let exnpTrafDay = customKendo.fn_customAjax("/bustrip/getExnpFile", {
            fileCd: "exnpTrafDay",
            hrBizReqResultId: hrBizReqResultId
        }).list;
        html += "   <td style='text-align: center'>";
        if(exnpTrafDay.length > 0){
            for(let i=0; i<exnpTrafDay.length; i++){
                let row = exnpTrafDay[i];
                if(i != 0){
                    html += "<br>";
                }
                html += '<span style="cursor: pointer" onclick="fileDown(\''+row.file_path+row.file_uuid+'\', \''+row.file_org_name+'.'+row.file_ext+'\')">'+row.file_org_name+'</span>'
            }
        }else{
            html += "<b>-</b>";
        }
        html += "</td>";

        let exnpToll = customKendo.fn_customAjax("/bustrip/getExnpFile", {
            fileCd: "exnpToll",
            hrBizReqResultId: hrBizReqResultId
        }).list;
        html += "   <td style='text-align: center'>";
        if(exnpToll.length > 0){
            for(let i=0; i<exnpToll.length; i++){
                let row = exnpToll[i];
                if(i != 0){
                    html += "<br>";
                }
                html += '<span style="cursor: pointer" onclick="fileDown(\''+row.file_path+row.file_uuid+'\', \''+row.file_org_name+'.'+row.file_ext+'\')">'+row.file_org_name+'</span>'
            }
        }else{
            html += "<b>-</b>";
        }
        html += "</td>";

        html += "   <td style='text-align: center'><b>-</b></td>";

        let exnpEat = customKendo.fn_customAjax("/bustrip/getExnpFile", {
            fileCd: "exnpEat",
            hrBizReqResultId: hrBizReqResultId
        }).list;
        html += "   <td style='text-align: center'>";
        if(exnpEat.length > 0){
            for(let i=0; i<exnpEat.length; i++){
                let row = exnpEat[i];
                if(i != 0){
                    html += "<br>";
                }
                html += '<span style="cursor: pointer" onclick="fileDown(\''+row.file_path+row.file_uuid+'\', \''+row.file_org_name+'.'+row.file_ext+'\')">'+row.file_org_name+'</span>'
            }
        }else{
            html += "<b>-</b>";
        }
        html += "</td>";

        let exnpParking = customKendo.fn_customAjax("/bustrip/getExnpFile", {
            fileCd: "exnpParking",
            hrBizReqResultId: hrBizReqResultId
        }).list;
        html += "   <td style='text-align: center'>";
        if(exnpParking.length > 0){
            for(let i=0; i<exnpParking.length; i++){
                let row = exnpParking[i];
                if(i != 0){
                    html += "<br>";
                }
                html += '<span style="cursor: pointer" onclick="fileDown(\''+row.file_path+row.file_uuid+'\', \''+row.file_org_name+'.'+row.file_ext+'\')">'+row.file_org_name+'</span>'
            }
        }else{
            html += "<b>-</b>";
        }
        html += "</td>";

        let exnpEtc = customKendo.fn_customAjax("/bustrip/getExnpFile", {
            fileCd: "exnpEtc",
            hrBizReqResultId: hrBizReqResultId
        }).list;
        html += "   <td style='text-align: center'>";
        if(exnpEtc.length > 0){
            for(let i=0; i<exnpEtc.length; i++){
                let row = exnpEtc[i];
                if(i != 0){
                    html += "<br>";
                }
                html += '<span style="cursor: pointer" onclick="fileDown(\''+row.file_path+row.file_uuid+'\', \''+row.file_org_name+'.'+row.file_ext+'\')">'+row.file_org_name+'</span>'
            }
        }else{
            html += "<b>-</b>";
        }
        html += "</td>";

        html += "   <td style='text-align: center'><b>-</b></td>";
        html += "</tr>";
        $("#bustExnpBody").html(html);
        $("#bustExnpDiv").show();
        $("#bustExnpTb").show();
    },

    /** 첨부파일 데이터 세팅 */
    settingTempFileDataInit: function(e, p, status){
        // let p = bustrip.global.pageName;
        var html = '';

        if(p == "result"){
            if(e.length > 0){
                for(var i = 0; i < e.length; i++){
                    html += '<tr style="text-align: center">';
                    html += '   <td>'+ e[i].file_org_name +'</td>';
                    html += '   <td>'+ e[i].file_ext +'</td>';
                    html += '   <td>'+ fCommon.bytesToKB(e[i].file_size) +'</td>';
                    html += '   <td>';
                    /*if(e[i].file_ext.toLowerCase() == "pdf" || e[i].file_ext.toLowerCase() == "jpg" || e[i].file_ext.toLowerCase() == "png" || e[i].file_ext.toLowerCase() == "jpeg"){
                    }*/
                    html += '<input type="button" value="뷰어" class="k-button k-rounded k-button-solid k-button-solid-base" onclick="fileViewer(\''+ e[i].file_path +'\', \''+ e[i].file_uuid +'\')">';
                    html += '   </td>';
                    html += '   <td>';
                    if(status != 100){
                        html += '       <button type="button" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="fCommon.commonFileDel('+ e[i].file_no +', this)">' +
                            '			    <span class="k-button-text">삭제</span>' +
                            '		    </button>';
                    }
                    html += '   </td>';
                    html += '</tr>';
                }
                $("#fileGrid").html(html);
            }else{
                $("#fileGrid").html('<tr class="defultTr">' +
                    '	<td colspan="5" style="text-align: center">선택된 파일이 없습니다.</td>' +
                    '</tr>');
            }
        }else{
            if(e.length > 0){
                for(var i = 0; i < e.length; i++){
                    html += '<tr style="text-align: center">';
                    html += '   <td>'+ e[i].file_org_name +'</td>';
                    html += '   <td>'+ e[i].file_ext +'</td>';
                    html += '   <td>'+ e[i].file_size +'</td>';
                    html += '   <td>';
                    if(p.STATUS != 100){
                        html += '       <button type="button" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="fCommon.commonFileDel('+ e[i].file_no +', this)">' +
                            '			    <span class="k-button-text">삭제</span>' +
                            '		    </button>';
                    }
                    html += '   </td>';
                    html += '</tr>';
                }
                $("#fileGrid").html(html);
            }else{
                $("#fileGrid").html('<tr>' +
                    '	<td colspan="4" style="text-align: center">선택된 파일이 없습니다.</td>' +
                    '</tr>');
            }
        }
    },

    fileViewer : function (path, name){
        var name = "_blank";
        var option = "width = 1300, height = 820, top = 100, left = 400, location = no"
        var hostUrl = "";
        if($(location).attr("host").split(":")[0].indexOf("218.158.231.184") > -1 || $(location).attr("host").split(":")[0].indexOf("new.camtic.or.kr") > -1){
            hostUrl = "http://218.158.231.184";
        } else {
            hostUrl = "http://218.158.231.186";
        }
        var popup = window.open(hostUrl + path, name, option);
    },
}