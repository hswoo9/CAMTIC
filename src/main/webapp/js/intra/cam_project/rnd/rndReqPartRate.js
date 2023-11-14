var rndRPR = {


    fn_defaultScript : function (){

        customKendo.fn_textBox(["joinMember", "minPartRate", "maxPartRate", "payBudget", "itemBudget"]);

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
            $("#partRateSn").val(rs.PART_RATE_SN);
            $("#joinMemberSn").val(rs.JOIN_MEM_SN);
            $("#joinMember").val(rs.JOIN_MEM_NM);
            $("#monAccCal").val(rs.MON_PAY_CRT);
            $("#minPartRate").val(rs.MIN_PART_RATE);
            $("#maxPartRate").val(rs.MAX_PART_RATE);
            $("#partEtc").val(rs.PART_ETC);
            $("#payBudget").val(comma(rs.PAY_BUDGET));
            $("#itemBudget").val(comma(rs.ITEM_BUDGET));

            if(rs.STAT == "N"){
                $("#reqBtn").css("display", "");
            }else {
                $("#saveBtn").css("display", "none");
                $("#changeBtn").css("display", "");
            }
        }else{
            var userResult = customKendo.fn_customAjax("/projectRnd/getRschInfo", data);
            var userSn = "";
            var userName = "";
            console.log(userResult.list);

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
                // $("#joinMember").val(userName);
                // $("#joinMemberSn").val(userSn);
            }
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

    fn_save : function (){
        var parameters = {
            joinMemNm : $("#joinMember").val(),
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
            alert("인건비 예산(현물)을 입력해주세요");
            return;
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
                if($("#pjtStep").val().substring(0, 1) == "S"){
                    window.location.href="/projectUnRnd/pop/regProject.do?pjtSn=" + parameters.pjtSn + "&tab=2";
                } else {
                    window.location.href="/projectRnd/pop/regProject.do?pjtSn=" + parameters.pjtSn + "&tab=2";
                }
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
            empName : $("#empName").val(),
            empSeq : $("#empSeq").val(),
            reqSort : "신규"
        }

        var rs = customKendo.fn_customAjax("/projectRnd/setPartRateRequest", parameters);

        if(rs.code == 200){
            alert("요청되었습니다.");
            if($("#pjtStep").val().substring(0, 1) == "S"){
                window.location.href="/projectUnRnd/pop/regProject.do?pjtSn=" + parameters.pjtSn + "&tab=1";
            } else {
                window.location.href="/projectRnd/pop/regProject.do?pjtSn=" + parameters.pjtSn + "&tab=2";
            }
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

        if(ls != null){
            var html = '';
            for(var i = 0; i < ls.length; i++){
                $("#partRateVersion").html("");
                $("#partRateVersion2").html("");
                var mngStat = "";
                if(ls[i].MNG_STAT == "S"){
                    mngStat = "설정완료";
                } else if (ls[i].MNG_STAT == "C"){
                    mngStat = "참여율확정";
                } else {
                    mngStat = "검토중"
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
                html += '<tr style="text-align: center">';
                html += '   <td>신규</td>';
                html += '   <td>';
                html += '       <span style="cursor : pointer;font-weight: bold" onclick="rndRPR.versionClickEvt(' + ls[i].PART_RATE_VER_SN + ', \''+ls[i].MNG_STAT+'\')">ver.' + (i+1) + '</span>';
                html += '   </td>';
                html += '   <td>'+ ls[i].REQ_EMP_NM +'</td>';
                html += '   <td style="text-align: right">' + comma(Number(ls[i].PAY_BUDGET) + Number(ls[i].ITEM_BUDGET)) + '</td>';
                html += '   <td>'+ new Date(ls[i].REQ_DATE).toISOString().replace('T', ' ').slice(0, -5) +'</td>';
                html += '   <td>'+ repDate +'</td>';
                html += '   <td>'+ confDate +'</td>';
                html += '   <td>'+mngComm+'</td>';
                html += '   <td>'+mngStat+'</td>';
                html += '</tr>';
            }
            $("#partRateVersion").append(html);
            $("#partRateVersion2").append(html);
        }
    },

    versionClickEvt: function (key, stat){
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

        if($("#partRateMenuGubun").val() != undefined && $("#partRateMenuGubun").val() != null){
            $("#partRateVerSn").val(key);

            rndPR.fn_getPartRateDetail();

            rndPR.partRateMainGrid();
        } else {
            alert(key);
        }
    },

    fn_changePartRate: function (){
        alert("변경요청");
    }
}