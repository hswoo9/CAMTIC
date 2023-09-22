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

                console.log(ls)
                var html = "";
                if(ls != null){

                    for(var i = 0 ; i < ls.length ; i++){
                        html += '<tr>' +
                            '       <td style="text-align: center">'+ls[i].PS_PREP_NM+'</td>' +
                            '       <td style="text-align: center">'+ls[i].POSITION_NAME+'</td>' +
                            '       <td style="text-align: center">'+ls[i].PS_EMP_NM+'</td>' +
                            '       <td style="text-align: center"><input type="text" id="laborUnitAmt'+(i+1)+'" disabled class="laborUnitAmt" style="text-align: right; width: 90%" onkeyup="costInfo.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" /></td>' +
                            '       <td style="text-align: center"><input type="text" id="costWorkTime'+(i+1)+'" class="costWorkTime" style="text-align: right; width: 90%" onkeyup="costInfo.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" /></td>' +
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

    }
}