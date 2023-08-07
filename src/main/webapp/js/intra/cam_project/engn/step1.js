var es1 = {


    global : {
        totAmt : 0
    },

    fn_defaultScript: function (){

        customKendo.fn_textBox(["contCd", "crmCompNm", "crmMem", "expAmt", "pjtNm"]);

        customKendo.fn_datePicker("estDe", "depth", "yyyy-MM-dd", new Date());

        $("#etc").kendoTextArea({
            rows : 5,
        });
        $(".prodNm, .prodCnt, .unit, .unitAmt, .supAmt, .prodEtc").kendoTextBox();

        $("#prodCnt, #unitAmt").on("keyup", function(){
            $("#supAmt").val(es1.comma(es1.uncomma($("#unitAmt").val()) * es1.uncomma($("#prodCnt").val())))
        });


        $("#addBtn").click(function(){
            var idx = 0;
            $("#productTb > tr").each(function(e){
                idx = e + 1;
            });

            var inputData = {
                prodNm : $("#prodNm").val(),
                prodCnt : es1.uncomma($("#prodCnt").val()),
                unit : $("#unit").val(),
                unitAmt :es1.uncomma($("#unitAmt").val()),
                supAmt : es1.uncomma($("#supAmt").val()),
                prodEtc : $("#prodEtc").val(),
            }


            var html = "";
            html += '<tr id="tr'+idx+'">';
            html += '   <td style="text-align: center"><span style="position: relative; top:5px">'+idx+'</span></td>';
            html += '   <td><input type="text" class="prodNm" id="prodNm'+idx+'" value="'+inputData.prodNm+'"/></td>';
            html += '   <td><input type="text" class="prodCnt" id="prodCnt'+idx+'" style="text-align: right;" onkeyup="es1.inputNumberFormat(this)" value="'+es1.comma(inputData.prodCnt)+'" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');"/></td>';
            html += '   <td><input type="text" class="unit" id="unit'+idx+'" value="'+inputData.unit+'"/></td>';
            html += '   <td><input type="text" class="unitAmt" id="unitAmt'+idx+'" style="text-align: right;" onkeyup="es1.inputNumberFormat(this)" value="'+es1.comma(inputData.unitAmt)+'" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');"/></td>';
            html += '   <td><input type="text" class="supAmt" id="supAmt'+idx+'" style="text-align: right;" onkeyup="es1.inputNumberFormat(this)" value="'+es1.comma(inputData.supAmt)+'" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');"/></td>';
            html += '   <td><input type="text" class="prodEtc" id="prodEtc'+idx+'" value="'+inputData.prodEtc+'" /></td>';
            html += '   <td style="text-align: center">';
            html += '       <button type="button" id="delBtn" onclick="es1.fn_delRow('+idx+')" class="k-button k-button-solid-error">삭제</button>';
            html += '   </td>';
            html += '</tr>';
            $("#productTb").append(html);

            es1.global.totAmt += Number(es1.uncomma(inputData.supAmt));
            // 견적가 합계 구하기
            $("#expAmt").val(es1.comma(es1.global.totAmt));
            $("#prodNm" + idx + ", #prodCnt" + idx + ", #unit" + idx + ", #unitAmt" + idx + ", #supAmt" + idx + ", #prodEtc" + idx + "").kendoTextBox();

        });

        es1.fn_setData();

    },

    fn_delRow : function (i){
        $("#tr" + i).remove();

        var inputData = {
            prodNm : $("#prodNm").val(),
            prodCnt : $("#prodCnt").val(),
            unit : $("#unit").val(),
            unitAmt : $("#unitAmt").val(),
            supAmt : $("#supAmt").val(),
            prodEtc : $("#prodEtc").val(),
        }


        $("#productTb > tr").each(function (idx){
            if(idx != 0){
                $(this).removeAttr("id");
                $(this).attr("id", "tr" + idx);

                $(this).children("td").first().html('<span style=\"position: relative; top:5px\">'+(idx)+'</span>');
                $(this).children("td").each(function(){
                    console.log($("#tr1").children("input").attr("id"));
                    $("#tr"+idx+" > td > span > input").each(function(){
                        $(this).removeAttr("id");
                        $(this).attr("id", $(this).attr("class").split(" ")[0] + idx);
                    })

                    $("#tr"+idx+" > td > button").removeAttr("onclick");
                    $("#tr"+idx+" > td > button").attr("onclick", "es1.fn_delRow("+idx+")");
                });
            }
        });

        es1.global.totAmt -= Number(es1.uncomma(inputData.supAmt));
        $("#expAmt").val(es1.comma(es1.global.totAmt));
    },

    fn_save : function() {

        if($("#befExpAmt").val() != $("#expAmt").val()){
            if(!confirm("예상견적가와 견적가가 다릅니다. 저장하시겠습니까?")){
                return false;
            }
        }

        var data = {
            pjtSn : $("#pjtSn").val(),
            estDe : $("#estDe").val(),
            crmNm : $("#crmCompNm").val(),
            crmMem : $("#crmMem").val(),
            estNm : $("#pjtNm").val(),
            estTotAmt : es1.uncomma($("#expAmt").val()),
            estIss : $("#etc").val(),
            regEmpSeq : $("#regEmpSeq").val(),
            pjtStep : $("#pjtStep").val(),
            pjtStepNm : $("#pjtStepNm").val(),
            step : $("#step").val()
        }

        $("input[name='vatYn']").each(function(){
            if($(this).is(":checked")){
                data.vat = this.value;
            }
        });

        $.ajax({
            url : "/project/insStep1",
            data : data,
            type : "post",
            dataType : "json",
            success :function (rs){
                var rs2;
                if(rs.code == 200){
                    $("#productTb > tr").each(function (idx){
                        if(idx != 0){
                            var data2 = {
                                estSn : rs.rep.EST_SN,
                                prodNm : $("#prodNm" + idx).val(),
                                prodCnt : es1.uncomma($("#prodCnt" + idx).val()),
                                unit : $("#unit" + idx).val(),
                                unitAmt : es1.uncomma($("#unitAmt" + idx).val()),
                                supAmt : es1.uncomma($("#supAmt" + idx).val()),
                                etc : $("#procEtc" + idx).val()
                            }

                            $.ajax({
                                url : "/project/insStep1Sub",
                                data : data,
                                type : "post",
                                async : false,
                                dataType : "json",
                                success : function(rs){
                                    if(rs.code == 200){
                                        location.reload();
                                    }
                                }
                            })
                        }
                    });
                }


            }
        })
    },

    fn_mod : function() {
        alert("개발중")
    },


    inputNumberFormat : function (obj){
        obj.value = es1.comma(es1.uncomma(obj.value));
    },

    comma: function(str) {
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    },

    uncomma: function(str) {
        str = String(str);
        return str.replace(/[^\d]+/g, '');
    },

    fn_setData: function (){
        var data= {
            pjtSn : $("#pjtSn").val()
        }

        var rs = customKendo.fn_customAjax("/project/getStep1Data", data);

        console.log(rs);




        var html = "";
        for(var i = 0 ; i < rs.result.estList.length ; i++){

            var date = new Date(rs.result.estList[i].REG_DT);
            var yyyy = date.getFullYear();
            var mm = date.getMonth()+1;
            mm = mm >= 10 ? mm : '0'+mm;	// 10 보다 작으면 0을 앞에 붙여주기 ex) 3 > 03
            var dd = date.getDate();
            dd = dd >= 10 ? dd : '0'+dd;	// 10 보다 작으면 9을 앞에 붙여주기 ex) 9 > 09
            var sdfDate = yyyy+'-'+mm+'-'+dd;

            html += "<tr>";
            html += "   <td style='text-align: right'>"+ (i+1) +"</td>";
            html += "   <td>"+ rs.result.estList[i].EST_NM +"</td>";
            html += "   <td style='text-align: right'>"+ es1.comma(rs.result.estList[i].EST_TOT_AMT) +"</td>";
            html += "   <td style='text-align: right'>"+rs.result.estSubList.length+"</td>";
            html += "   <td style='text-align: right'>"+sdfDate+"</td>";
            html += "   <td style='text-align: right'>"+rs.result.estList[i].EMP_NAME+"</td>";
            html += "</tr>";
        }

        $("#productTb2").append(html);

        var estList = rs.result.estList[0];
        var estSubList = rs.result.estSubList;


        for(var idx = 0 ; idx < estSubList.length ; idx++){
            var html = "";
            var etc = ""
            if(estSubList[idx].ETC != null && estSubList[idx].ETC != ""){
                etc = estSubList[idx].ETC;
            }

            html += '<tr id="tr'+(idx+1)+'">';
            html += '   <td style="text-align: center"><span style="position: relative; top:5px">'+(idx+1)+'</span></td>';
            html += '   <td><input type="text" class="prodNm" id="prodNm'+(idx+1)+'" value="'+estSubList[idx].PROD_NM+'"/></td>';
            html += '   <td><input type="text" class="prodCnt" id="prodCnt'+(idx+1)+'" style="text-align: right;" onkeyup="es1.inputNumberFormat(this)" value="'+es1.comma(estSubList[idx].PROD_CNT)+'" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');"/></td>';
            html += '   <td><input type="text" class="unit" id="unit'+(idx+1)+'" value="'+estSubList[idx].UNIT+'"/></td>';
            html += '   <td><input type="text" class="unitAmt" id="unitAmt'+(idx+1)+'" style="text-align: right;" onkeyup="es1.inputNumberFormat(this)" value="'+es1.comma(estSubList[idx].UNIT_AMT)+'" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');"/></td>';
            html += '   <td><input type="text" class="supAmt" id="supAmt'+(idx+1)+'" style="text-align: right;" onkeyup="es1.inputNumberFormat(this)" value="'+es1.comma(estSubList[idx].SUP_AMT)+'" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');"/></td>';
            html += '   <td><input type="text" class="prodEtc" id="prodEtc'+(idx+1)+'" value="'+etc+'" /></td>';
            html += '   <td style="text-align: center">';
            html += '       <button type="button" id="delBtn" onclick="es1.fn_delRow('+(idx+1)+')" class="k-button k-button-solid-error">삭제</button>';
            html += '   </td>';
            html += '</tr>';

            $("#productTb").append(html);

            $("#prodNm" + (idx+1) + ", #prodCnt" + (idx+1) + ", #unit" + (idx+1) + ", #unitAmt" + (idx+1) + ", #supAmt" + (idx+1) + ", #prodEtc" + (idx+1) + "").kendoTextBox();
        }

        $("#estDe").val(estList.EST_DE);
        $("#etc").val(estList.EST_ISS);
        $("#expAmt").val(es1.comma(estList.EST_TOT_AMT));
        $("#vat" + estList.VAT).prop("checked", true);


    }
}