var rndRPR = {


    fn_defaultScript : function (){

        customKendo.fn_textBox(["joinMember", "minPartRate", "maxPartRate", "payBudget", "itemBudget"]);

        $("#monAccCal, #partEtc").kendoTextArea({
            rows: 5,
        });

        rndRPR.fn_setData();
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
                $("#changeBtn").css("display", "");
            }
        }


        if(pf.length != 0){
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
            $("#fileGrid").html('<tr>' +
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
                window.location.href="/projectRnd/pop/regProject.do?pjtSn=" + parameters.pjtSn + "&tab=2";
            }
        });

    },
    fn_reqPartRate : function() {
        if($("#partRateSn").val() == null || $("#partRateSn").val() == ""){
            alert("저장된 데이터가 없습니다. 저장후 요청해주세요.");
            return;
        }

        var parameters = {
            partRateSn : $("#partRateSn").val()

        }

        var rs = customKendo.fn_customAjax("/projectRnd/setPartRateRequest", parameters);

        if(rs.code == 200){
            alert("요청되었습니다.");
            window.location.href="/projectRnd/pop/regProject.do?pjtSn=" + parameters.pjtSn + "&tab=2";
        } else {
            alert("오류가 발생하였습니다. 관리자에게 문의바랍니다.");
        }
    }
}