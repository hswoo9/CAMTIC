var rndRPR = {


    fn_defaultScript : function (){

        customKendo.fn_textBox(["joinMemberPart", "minPartRate", "maxPartRate", "payBudget", "itemBudget"]);

        $("#monAccCal, #partEtc").kendoTextArea({
            rows: 5,
        });

        rndRPR.fn_setData();

        rndRPR.fn_setVersion();
    },

    fn_setData : function (){
        var data = {
            pjtSn : $("#pjtSn").val()
        }
        var result = customKendo.fn_customAjax("/projectRnd/getReqPartRateData", data);

        var pf = result.fileList
        var rs = result.map;
        if(rs != null){
            console.log(rs);
            $("#partRateSn").val(rs.PART_RATE_SN);
            $("#joinMemberSn").val(rs.JOIN_MEM_SN);
            $("#joinMemberPart").val(rs.JOIN_MEM_NM);
            $("#monAccCal").val(rs.MON_PAY_CRT);
            $("#minPartRate").val(rs.MIN_PART_RATE);
            $("#maxPartRate").val(rs.MAX_PART_RATE);
            $("#partEtc").val(rs.PART_ETC);
            $("#payBudget").val(comma(rs.PAY_BUDGET));
            $("#itemBudget").val(comma(rs.ITEM_BUDGET));

            if(rs.STAT == "N"){
                $("#reqBtn").css("display", "");
                $("#saveRateBtn").css("display", "");
            }else {
                $("#saveRateBtn").css("display", "none");
                // $("#changeBtn").css("display", "");
                $("#changeSaveBtn").css("display", "");

            }

        }else{
            var userResult = customKendo.fn_customAjax("/projectRnd/getRschInfo", data);
            var userSn = "";
            var userName = "";

            /** 참여 연구원에 넣을 문자열 데이터 */
            for(let i=0; i<userResult.list.length; i++){
                let e = userResult.list[i];
                if(userName != ""){
                    userName += ",";
                }
                if(userSn != ""){
                    userSn += ",";
                }
                userName += e.PJT_RSCH_NM;
                userSn += e.PJT_RSCH_EMP_SEQ;
            }

            if(userName != ""){
                // $("#joinMemberPart").val(userName);
                //$("#joinMemberSn").val(userSn);
            }
            $("#saveRateBtn").css("display", "");


        }

        if(result.fileList != null && pf.length != 0){
            var html = '';

            for(var i = 0; i < pf.length; i++){
                html += '<tr style="text-align: center">';
                html += '   <td><span style="cursor: pointer" onclick="fileDown(\''+pf[i].file_path+pf[i].file_uuid+'\', \''+pf[i].file_org_name+'.'+pf[i].file_ext+'\')">'+pf[i].file_org_name+'</span></td>';
                html += '   <td>'+ pf[i].file_ext +'</td>';
                html += '   <td>'+ pf[i].file_size +'</td>';
                html += '   <td>' +
                    '           <button type="button" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="fCommon.commonFileDel('+ pf.file_no +', this)">' +
                    '			    <span class="k-button-text">삭제</span>' +
                    '		    </button>';
                html += '   </td>';
                html += '</tr>';
            }
            $("#fileGrid").html(html);
        } else {
            $("#fileGrid").html('<tr class="defultTr">' +
            '	<td colspan="4" style="text-align: center">선택된 파일이 없습니다.</td>' +
            '</tr>');
        }
    },

    fn_save : function (type){

        if(type == "change"){
            var parameters = {
                partRateSn : $("#partRateSn").val(),
                pjtSn : $("#pjtSn").val()
            }

            var result = customKendo.fn_customAjax("/projectRnd/getReqPartRateVerList", parameters);
            var ls = result.list;

            if(ls[ls.length - 1].MNG_STAT == "R"){
                alert("이전 요청 건이 검토중입니다.");
                return;
            }

        }

        var pjtAmt = 0;

        if($("#pjtAmt2").val() != 0 && $("#pjtAmt2").val() != ""){
            pjtAmt = uncomma($("#pjtAmt2").val());
        }else{
            pjtAmt = uncomma($("#pjtExpAmt").val());
        }

        if(pjtAmt < (Number(uncomma($("#payBudget").val())) + Number(uncomma($("#itemBudget").val())))){
            alert("인건비 예산이 초과되었습니다.");
            return;
        }

        var parameters = {
            joinMemNm : $("#joinMemberPart").val(),
            joinMemSn : $("#joinMemberSn").val(),
            monPayCrt : $("#monAccCal").val(),
            minPartRate : $("#minPartRate").val(),
            maxPartRate : $("#maxPartRate").val(),
            partEtc : $("#partEtc").val(),
            payBudget : uncomma($("#payBudget").val()),
            itemBudget : uncomma($("#itemBudget").val()),
            pjtSn : $("#pjtSn").val(),

            regEmpSeq : $("#empSeq").val(),
            empSeq : $("#empSeq").val(),
        }

        if($("#partRateSn").val() != null && $("#partRateSn").val() != ""){
            parameters.partRateSn = $("#partRateSn").val();
        }

        if(type == "change"){
            parameters.type = "change";
        }

        if(parameters.minPartRate == null || parameters.minPartRate == ""){
            alert("최소 참여율을 입력해주세요");
            return;
        }

        if(parameters.maxPartRate == null || parameters.maxPartRate == ""){
            alert("최대 참여율을 입력해주세요");
            return;
        }

        if(parameters.payBudget == null || parameters.payBudget == ""){
            alert("인건비 예산(현금)을 입력해주세요");
            return;
        }

        if(parameters.itemBudget == null || parameters.itemBudget == ""){
            /*alert("인건비 예산(현물)을 입력해주세요");
            return;*/

            parameters.itemBudget = 0;
        }

        var fd = new FormData();
        for (var key in parameters) {
            fd.append(key, parameters[key]);
        }

        if(fCommon.global.attFiles != null){
            for(var i = 0; i < fCommon.global.attFiles.length; i++){
                fd.append("fileList", fCommon.global.attFiles[i]);
            }
        }

        var url = "/projectRnd/setReqPartRateData";

        $.ajax({
            url : url,
            data : fd,
            type : "post",
            dataType: "json",
            contentType: false,
            processData: false,
            enctype : 'multipart/form-data',
            async: false,
            success: function(rs){
                if(type != "change"){
                    alert("저장되었습니다.");
                }
                commonProject.getReloadPage(1, 1, 1, 1, 1, 1);
            }
        });

    },
    fn_reqPartRate : function() {

        if($("#partRateSn").val() == null || $("#partRateSn").val() == ""){
            alert("저장된 데이터가 없습니다. 저장후 요청해주세요.");
            return;
        }

        var parameters = {
            pjtSn : $("#pjtSn").val(),
            partRateSn : $("#partRateSn").val(),
            joinMemberSn : $("#joinMemberSn").val(),
            joinMemNm : $("#joinMemberPart").val(),
            empName : $("#verEmpName").val(),
            empSeq : $("#verEmpSeq").val()
        }

        var rs = customKendo.fn_customAjax("/projectRnd/setPartRateRequest", parameters);

        if(rs.code == 200){
            alert("요청되었습니다.");
            commonProject.getReloadPage(1, 1, 1, 1, 1, 1);
        } else {
            alert("오류가 발생하였습니다. 관리자에게 문의바랍니다.");
        }
    },

    fn_setVersion : function (){
        var parameters = {
            partRateSn : $("#partRateSn").val(),
            pjtSn : $("#pjtSn").val()
        }

        var result = customKendo.fn_customAjax("/projectRnd/getReqPartRateVerList", parameters);
        var ls = result.list;

        var lastPartRateVerSn = ls[ls.length - 1].PART_RATE_VER_SN;
        var lastMngStatValue = "";
        if(ls[ls.length - 1].MNG_STAT == null || ls[ls.length - 1].MNG_STAT == undefined){
            lastMngStatValue = ls[ls.length - 1].RT_MNG_STAT;
        } else {
            lastMngStatValue = ls[ls.length - 1].MNG_STAT;
        }

        var verFlag = false;
        var lastVersion = "";
        var lastStat = "";
        var versionIndex = 0;

        if(ls != null){
            var html = '';
            for(var i = 0; i < ls.length; i++){
                $("#partRateVersion").html("");
                $("#partRateVersion2").html("");
                var mngStat = "";

                var mngStatValue = "";
                if(ls[i].MNG_STAT == null || ls[i].MNG_STAT == undefined){
                    mngStatValue = ls[i].RT_MNG_STAT;
                } else {
                    mngStatValue = ls[i].MNG_STAT;
                }

                if(mngStatValue == "S"){
                    mngStat = "설정완료";
                } else if (mngStatValue == "C"){
                    mngStat = "참여율확정";
                } else {
                    mngStat = "검토중"
                }
                var gubun = "신규";
                if(ls[i].PART_RATE_VER > 1){
                    gubun = "변경요청";
                } else if(i > 0){
                    gubun = ""
                }

                var repDate = "";
                if(ls[i].REP_DATE != null){
                    repDate = new Date(ls[i].REP_DATE).toISOString().replace('T', ' ').slice(0, -5)
                }

                var confDate = "";
                if(ls[i].CONF_DATE != null){
                    confDate = new Date(ls[i].CONF_DATE).toISOString().replace('T', ' ').slice(0, -5)
                }

                var mngComm = "";
                if(ls[i].MNG_COMM != null){
                    mngComm = ls[i].MNG_COMM;
                }


                var reqDate = "";

                if(ls[i].REQ_DATE != null && ls[i].REQ_DATE != undefined && ls[i].REQ_DATE != ""){
                    reqDate = new Date(ls[i].REQ_DATE).toISOString().replace('T', ' ').slice(0, -5);
                }

                var reqEmpNm = "";
                if(ls[i].REQ_EMP_NM != null && ls[i].REQ_EMP_NM != undefined && ls[i].REQ_EMP_NM != ""){
                    reqEmpNm = ls[i].REQ_EMP_NM;
                }

                var payBudget = ls[i].PAY_BUDGET;
                var itemBudget = ls[i].ITEM_BUDGET;

                if(payBudget == null || payBudget == undefined){
                    payBudget = ls[i].RT_PAY_BUDGET;
                }

                if(itemBudget == null || itemBudget == undefined){
                    itemBudget = ls[i].RT_ITEM_BUDGET;
                }

                var buttonHtml = "";
                var buttonSubHtml = "";
                if(ls[i].PART_RATE_VER > 1 && (ls[i].MNG_STAT == "S" || ls[i].MNG_STAT == "C")){
                    var status = ls[i].STATUS;
                    if(status == "0"){
                        buttonSubHtml += '<button type="button" class="k-button k-button-solid-base" onclick="rndRPR.referencesSelectPop('+ls[i].PART_RATE_VER_SN+')">불러오기</button>';
                        buttonHtml += "<button type=\"button\" id=\"rateAppBtn\" class=\"k-button k-button-solid-info\" onclick=\"rndPR.rateDrafting("+ls[i].PART_RATE_VER_SN+")\">참여율 변경 공문 작성</button>";
                    } else if(status == "10"){
                        buttonHtml += "<button type=\"button\" id=\"rateCanBtn\" class=\"k-button k-button-solid-error\" onclick=\"docApprovalRetrieve('"+ls[i].DOC_ID+"', '"+ls[i].APPRO_KEY+"', 1, 'retrieve');\">회수</button>";
                    } else if(status == "30" || status == "40"){
                        buttonHtml += "<button type=\"button\" id=\"rateCanBtn\" class=\"k-button k-button-solid-error\" onclick=\"tempOrReDraftingPop('"+ls[i].DOC_ID+"', '"+ls[i].DOC_MENU_CD+"', '"+ls[i].APPRO_KEY+"', 2, 'reDrafting');\">재상신</button>";
                    } else if(status == "100"){
                        buttonHtml += "<button type=\"button\" id=\"rateCanBtn\" class=\"k-button k-button-solid-base\" onclick=\"approveDocView('"+ls[i].DOC_ID+"', '"+ls[i].APPRO_KEY+"', '"+ls[i].DOC_MENU_CD+"');\">열람</button>";
                    }
                }

                html += '<tr style="text-align: center">';
                html += '   <td>'+gubun+'</td>';
                html += '   <td>';
                html += '       <span style="cursor : pointer;font-weight: bold" onclick="rndRPR.versionClickEvt(' + ls[i].PART_RATE_VER_SN + ', \''+mngStatValue+'\', ' + (i+1) + ')">ver.' + (i+1) + '</span>';
                html += '   </td>';
                html += '   <td>'+ reqEmpNm +'</td>';
                html += '   <td style="text-align: right">' + comma(Number(payBudget) + Number(itemBudget)) + '</td>';
                html += '   <td>'+ reqDate +'</td>';
                html += '   <td>'+ repDate +'</td>';
                html += '   <td>'+ confDate +'</td>';
                html += '   <td>'+mngComm+'</td>';
                html += '   <td>'+mngStat+'</td>';
                html += '   <td style="text-align: center">'+buttonHtml+'</td>';
                html += '   <td style="text-align: center">'+buttonSubHtml+'</td>';
                html += '</tr>';

                var lsMngStat = ls[i].MNG_STAT;

                if(ls[0].MNG_STAT == 'R' && i == 0){
                    versionIndex++;
                }
                if(lsMngStat != 'R' && lsMngStat != '' && lsMngStat != null && lsMngStat != undefined){
                    lastVersion = ls[i].PART_RATE_VER_SN;
                    versionIndex++;
                    if(ls[i].MNG_STAT == null || ls[i].MNG_STAT == undefined){
                        lastStat = ls[i].RT_MNG_STAT;
                    } else {
                        lastStat = lsMngStat;
                    }
                }
            }

            $("#partRateVersion").append(html);
            $("#partRateVersion2").append(html);
        }

        rndRPR.versionClickEvt(lastVersion, lastStat, versionIndex);
    },

    versionClickEvt: function (key, stat, inx){
        if(stat == "S"){
            $("#confBtn").prop("disabled", false);
            $("#regBtn").prop("disabled", true);
        } else if (stat == "C"){
            $("#confBtn").prop("disabled", true);
            $("#regBtn").prop("disabled", false);
        } else {
            $("#confBtn").prop("disabled", true);
            $("#regBtn").prop("disabled", true);
        }

        if(key == null || key == undefined){
            $("#partRateMember").html("");
        }

        if($("#partRateMenuGubun").val() != undefined && $("#partRateMenuGubun").val() != null){
            $("#partRateVerSn").val(key);

            rndPR.fn_getPartRateDetail();

            rndPR.partRateMainGrid();
        } else {
            alert(key);
        }

        if(inx != undefined && inx != null) {
            $("#titleVersionName").text("[참여율현황 버전 - ver" + inx + "]");
        }
    },

    fn_changePartRate: function (){
        rndRPR.fn_save("change");
    },

    referencesSelectPop : function(key){
        var url = "/project/pop/referencesSelectPop.do?partRateVerSn=" + key;
        var name = "approvalReferencesSelect";
        var styled ="width=1350, height=590, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";

        window.open(url, name, styled);
    },
}