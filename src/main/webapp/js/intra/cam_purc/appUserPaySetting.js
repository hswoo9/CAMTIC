const appUserPaySetting = {

    fn_DefaultScript: function() {
        var parameterArray = [];

        var array = opener.parent.purcMngAppList.global.clmList;

        appUserPaySetting.fn_setData(array);

    },

    fn_setData : function (array){
        console.log(array);
        var data = {}

        data.itemArray = "";
        array.forEach(function(item){
            data.itemArray += item + ",";
        });

        data.itemArray = data.itemArray.substring(0, data.itemArray.length - 1);

        $.ajax({
            url : "/purc/getClaimMngList",
            data: data,
            type : "post",
            dataType : "json",
            success : function(rs){
                console.log(rs.list);
                var html = "";
                $("#payTableBody").html(html);
                var ls = rs.list;

                for (var i = 0; i < ls.length; i++) {
                    html += '<tr id="tr'+ls[i].claimSn+'" value="'+i+'">';
                    html += '   <td style="text-align: center">';
                    html += '       <input type="hidden" id="claminSn'+i+'" name="clm" value="' + ls[i].CLAIM_SN + '">';
                    html += '       ' + (i + 1);
                    html += '   </td>';
                    html += '   <td>';
                    html += '       ' + ls[i].DOC_NO;
                    html += '   </td>';
                    html += '   <td>';
                    html += '       ' + ls[i].CRM_NM;
                    html += '   </td>';
                    html += '   <td>';
                    html += '       <div style="text-align: right;">' + comma(ls[i].TOT_AMT - ls[i].REQ_AMT) + '</div>';
                    html += '       <input type="hidden" id="totAmt'+i+'" name="totAmt" value="' + (Number(ls[i].TOT_AMT) - Number(ls[i].REQ_AMT)) + '">';
                    html += '   </td>';
                    html += '   <td>';
                    html += '       <input type="text" style="text-align: right" index="'+i+'" class="k-input k-textbox k-input-solid k-input-md k-rounded-md" id="reqAmt" name="reqAmt" onkeyup="appUserPaySetting.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" value="0">';
                    html += '   </td>';
                    html += '   <td>';
                    html += '       <button type="button" class="k-button k-button-solid-error" onclick="appUserPaySetting.fn_delRow('+ls[i].CLAIM_SN+')">삭제</button>';
                    html += '   </td>';
                    html += '</tr>';
                }

                $("#payTableBody").html(html);
            }
        })
    },

    fn_delRow : function(idx){
        $("#tr"+idx).remove();
    },

    inputNumberFormat : function (obj){
        obj.value = appUserPaySetting.comma(appUserPaySetting.uncomma(obj.value));
    },

    comma: function(str) {
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    },

    uncomma: function(str) {
        str = String(str);
        return str.replace(/[^\d]+/g, '');
    },

    fn_regist : function (){

        if(!confirm("지출요청 하시겠습니까?")){
            return;
        }

        var flag = true;
        var payFlag = true;
        var itemArr = new Array();
        $('input[name="reqAmt"]').each(function(){
            if(this.value == 0 || this.value == ""){
                flag = false;
            } else {
                var itemParameters = {
                    claimSn : $("#claminSn" + $(this).attr("index")).val(),
                    reqAmt : appUserPaySetting.uncomma(this.value)
                }

                if(Number(appUserPaySetting.uncomma(this.value)) > Number($("#totAmt" + $(this).attr("index")).val())){
                    payFlag = false;
                }

                itemArr.push(itemParameters);
            }
        });

        if(!flag) {
            alert("지출금액이 입력되지 않았습니다.");
            return;
        }

        if(!payFlag) {
            alert("요청금액이 대상금액보다 큽니다.");
            return;
        }

        var data = {
            itemArray : JSON.stringify(itemArr)
        }

        $.ajax({
            url : "/purc/setPayAppPurcReq",
            data : data,
            dataType : "json",
            type : "post",
            success : function(rs){
                if(rs.code == 200){
                    alert("요청되었습니다.");

                    opener.parent.$("#mainGrid").data("kendoGrid").dataSource.read();
                    window.close();
                }
            }
        });

    }

}