var costInfo = {

    fn_defaultScript : function (){

        customKendo.fn_textBox(["costAmt", "rawAmt", "outsAmt", "laborAmt", "chargeAmt",
            "bustAmt"]);

        $("#costEtc").kendoTextArea({
            rows : 5,
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
                const ls = rs.list;
                console.log(ls);
                var html = "";
                if(ls != null){

                    for(var i = 0 ; i < ls.length ; i++){
                        html += '<tr>' +
                            '       <td style="text-align: center" id="costPrepNm'+(i+1)+'">'+ls[i].PS_PREP_NM+'</td>' +
                            '       <td style="text-align: center">'+ls[i].POSITION_NAME+'</td>' +
                            '       <td style="text-align: center">'+ls[i].PS_EMP_NM+'</td>' +
                            '       <td style="text-align: center"><input type="text" id="laborUnitAmt'+(i+1)+'" value="'+costInfo.comma(ls[i].LABOR_AMT)+'" disabled class="laborUnitAmt" style="text-align: right; width: 90%" onkeyup="costInfo.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" /></td>' +
                            '       <td style="text-align: center"><input type="text" id="costWorkTime'+(i+1)+'" class="costWorkTime" style="text-align: right; width: 90%" onkeyup="costInfo.fn_calcAmt(this, '+(i+1)+')" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" /></td>' +
                            '       <td style="text-align: center"><input type="text" id="costTotAmt'+(i+1)+'" disabled class="costTotAmt" style="text-align: right; width: 90%" onkeyup="costInfo.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" /></td>' +
                            '    </tr>'
                    }
                    html += '<tr>' +
                        '       <td colspan="5" style="text-align: center; font-weight: bold; background-color: #dee4ed"><span style="position: relative; top:5px;">노무비합계</span></td>' +
                        '       <td style="text-align: center"><input type="text" id="costTotSumAmt" disabled class="costTotSumAmt" style="text-align: right; width: 90%" onkeyup="costInfo.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" /></td>' +
                        '    </tr>'
                    $("#costDetailTable").html("");
                    $("#costDetailTable").append(html);
                }

                for(var i = 1 ; i <= ls.length ; i++) {
                    customKendo.fn_textBox(["laborUnitAmt"+i,"costWorkTime"+i, "costTotAmt"+i]);
                }
                customKendo.fn_textBox(["costTotSumAmt"]);
            }
        });
    },

    fn_save: function (){
        var data = {
            prepATime : null,
            prepBTime : null,
            prepCTime : null
        }
        for(var i = 1 ; i <= $("#costDetailTable > tr").length -1 ; i++){
            if($("#costPrepNm" + i).text() == "설계"){
                data.prepATime = $("#costWorkTime" + i).val()
            } else if ($("#costPrepNm" + i).text() == "제작"){
                data.prepBTime = $("#costWorkTime" + i).val()
            } else {
                data.prepCTime = $("#costWorkTime" + i).val()
            }
        }

        console.log(data);

    },

    fn_calcAmt : function(obj, idx){

        $("#costTotAmt" + idx).val(costInfo.comma(costInfo.uncomma($("#laborUnitAmt" + idx).val()) * costInfo.uncomma($("#costWorkTime" + idx).val())));

        var totSumAmt = 0;
        for(var i = 1 ; i <= $("#costDetailTable > tr").length -1 ; i++){
            totSumAmt += Number(costInfo.uncomma($("#costTotAmt" + i).val()));
        }

        $("#costTotSumAmt").val(costInfo.comma(totSumAmt));
        $("#laborAmt").val(costInfo.comma(totSumAmt));
        return costInfo.inputNumberFormat(obj);
    },

    inputNumberFormat : function (obj){
        obj.value = costInfo.comma(costInfo.uncomma(obj.value));
    },

    comma: function(str) {
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    },

    uncomma: function(str) {
        str = String(str);
        return str.replace(/[^\d]+/g, '');
    }
}