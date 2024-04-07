var estInfo = {

    global : {
        totAmt : 0
    },

    fn_defaultScript : function (){
        customKendo.fn_textBox(["contCd", "crmCompNm", "crmMem", "estExpAmt", "estPjtNm"]);

        customKendo.fn_datePicker("estDe", "depth", "yyyy-MM-dd", new Date());

        $("#etc").kendoTextArea({
            rows : 5,
        });
        $(".prodNm, .prodCnt, .unit, .unitAmt, .supAmt, .prodEtc").kendoTextBox();

        $("#prodCnt, #unitAmt").on("keyup", function(){
            $("#supAmt").val(estInfo.comma(estInfo.uncommaN($("#unitAmt").val()) * estInfo.uncommaN($("#prodCnt").val())))
        });


        $("#addBtn").click(function (){
            estInfo.fn_addClickEvent();
        });

        commonProject.setPjtStat();
        estInfo.fn_setData();

    },

    fn_addClickEvent : function (){
        var idx = 0;
        $("#productTb > tr").each(function(e){
            idx = e + 1;
        });

        var inputData = {
            prodNm : $("#prodNm").val(),
            prodCnt : estInfo.uncommaN($("#prodCnt").val()),
            unit : $("#unit").val(),
            unitAmt :estInfo.uncommaN($("#unitAmt").val()),
            supAmt : estInfo.uncommaN($("#supAmt").val()),
            prodEtc : $("#prodEtc").val(),
        }


        var html = "";
        html += '<tr id="tr'+idx+'">';
        html += '   <td style="text-align: center"><span style="position: relative; top:5px">'+idx+'</span></td>';
        html += '   <td><input type="text" class="prodNm" id="prodNm'+idx+'" value="'+inputData.prodNm+'"/></td>';
        html += '   <td><input type="text" class="prodCnt" id="prodCnt'+idx+'" style="text-align: right;" onkeyup="estInfo.inputNumberFormat(this)" value="'+estInfo.comma(inputData.prodCnt)+'" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');"/></td>';
        html += '   <td><input type="text" class="unit" id="unit'+idx+'" value="'+inputData.unit+'"/></td>';
        html += '   <td><input type="text" class="unitAmt" id="unitAmt'+idx+'" style="text-align: right;" onkeyup="estInfo.inputNumberFormat(this)" value="'+estInfo.comma(inputData.unitAmt)+'" oninput="this.value = this.value.replace(/[^-0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');"/></td>';
        html += '   <td><input type="text" class="supAmt" id="supAmt'+idx+'" disabled style="text-align: right;" onkeyup="estInfo.inputNumberFormat(this)" value="'+estInfo.comma(inputData.supAmt)+'" oninput="this.value = this.value.replace(/[^-0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');"/></td>';
        html += '   <td><input type="text" class="prodEtc" id="prodEtc'+idx+'" value="'+inputData.prodEtc+'" /></td>';
        html += '   <td style="text-align: center">';
        html += '       <button type="button" id="delBtn" onclick="estInfo.fn_delRow('+idx+')" class="k-button k-button-solid-error">삭제</button>';
        html += '   </td>';
        html += '</tr>';
        $("#productTb").append(html);

        estInfo.global.totAmt += Number(estInfo.uncommaN($("#supAmt" + idx).val()));
        // 견적가 합계 구하기
        $("#estExpAmt").val(estInfo.comma(estInfo.global.totAmt));

        $("#prodNm" + idx + ", #prodCnt" + idx + ", #unit" + idx + ", #unitAmt" + idx + ", #supAmt" + idx + ", #prodEtc" + idx + "").kendoTextBox();

        $("#prodCnt" + idx + ", #unitAmt" + idx).on("keyup", function(){
            $("#supAmt" + idx).val(estInfo.comma(estInfo.uncommaN($("#unitAmt" + idx).val()) * estInfo.uncommaN($("#prodCnt" + idx).val())));

            estInfo.global.totAmt = 0;
            $("#productTb > tr").each(function (idx){
                estInfo.global.totAmt += Number(estInfo.uncommaN($("#supAmt" + idx).val()));
                // 견적가 합계 구하기
                $("#estExpAmt").val(estInfo.comma(estInfo.global.totAmt));
            });
        });

    },

    fn_save : function (){
        if($("#estPjtNm").val() == ""){
            alert("견적명을 입력해주세요.");
            return;
        }

        if($("input[name='vatYn']:checked").val() == null || $("input[name='vatYn']:checked").val() == undefined || $("input[name='vatYn']:checked").val() == ""){
            alert("부가세 여부를 선택해주세요.");
            return;
        }

        if(estInfo.uncommaN($("#expAmt").val()) != estInfo.uncommaN($("#estExpAmt").val())){
            if(!confirm("예상견적가와 견적가가 다릅니다. 저장하시겠습니까?")){
                return false;
            }
        }

        var data = {
            pjtSn : $("#pjtSn").val(),
            estDe : $("#estDe").val(),
            crmNm : $("#crmCompNm").val(),
            crmMem : $("#crmMem").val(),
            estNm : $("#estPjtNm").val(),
            estTotAmt : estInfo.uncommaN($("#estExpAmt").val()),
            estIss : $("#etc").val(),
            regEmpSeq : $("#regEmpSeq").val(),
            pjtStep : $("#pjtStep").val(),
            pjtStepNm : $("#pjtStepNm").val(),
            step : $("#step").val(),
            stepColumn : $("#stepColumn").val(),
            nextStepColumn : $("#nextStepColumn").val(),
            stepValue : $("#stepValue").val(),
            nextStepValue : $("#nextStepValue").val(),
            engnSn : $("#engnSn").val()
        }

        $("input[name='vatYn']").each(function(){
            if($(this).is(":checked")){
                data.vat = this.value;
            }
        });

        $.ajax({
            url : "/project/engn/setEstInfo",
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
                                prodCnt : estInfo.uncommaN($("#prodCnt" + idx).val()),
                                unit : $("#unit" + idx).val(),
                                unitAmt : estInfo.uncommaN($("#unitAmt" + idx).val()),
                                supAmt : estInfo.uncommaN($("#supAmt" + idx).val()),
                                etc : $("#prodEtc" + idx).val()
                            }

                            $.ajax({
                                url : "/project/engn/setEstSub",
                                data : data2,
                                type : "post",
                                async : false,
                                dataType : "json",
                                success : function(rs){
                                    if(rs.code == 200){
                                        opener.parent.camPrj.gridReload();
                                    }
                                }
                            })
                        }
                    });
                    alert("저장되었습니다.");

                    if(commonProject.global.teamStat == "Y"){
                        window.location.href="/project/pop/viewRegProject.do?pjtSn=" + data.pjtSn + "&tab=0";
                    }else{
                        window.location.href="/project/pop/viewRegProject.do?pjtSn=" + data.pjtSn + "&tab=1";
                    }
                }
            }
        })
    },

    fn_setData : function(){
        var data= {
            pjtSn : $("#pjtSn").val()
        }

        var rs = customKendo.fn_customAjax("/project/engn/getEstData", data);


        const result2 = customKendo.fn_customAjax("/project/engn/getCrmInfo", data);
        const rs2 = result2.rs;
        $("#crmCompNm").val(rs.hashMap.CRM_NM);
        if(rs2.CRM_MEM_TEMP_NM != null || rs2.CRM_MEM_TEMP_NM != ""){
            $("#crmMem").val(rs2.CRM_MEM_TEMP_NM);
        }else{
            $("#crmMem").val(rs2.CRM_MEM_NM);
        }
        $("#estExpAmt").val(0);

        var html = "";
        var len = 0;
        var lastVersion = "";
        if(rs.result.estList != null && rs.result.estList != "") {
            len = rs.result.estList.length;
            for (var i = 0; i < len; i++) {

                var date = new Date(rs.result.estList[i].REG_DT);
                var yyyy = date.getFullYear();
                var mm = date.getMonth() + 1;
                mm = mm >= 10 ? mm : '0' + mm;	// 10 보다 작으면 0을 앞에 붙여주기 ex) 3 > 03
                var dd = date.getDate();
                dd = dd >= 10 ? dd : '0' + dd;	// 10 보다 작으면 9을 앞에 붙여주기 ex) 9 > 09
                var sdfDate = yyyy + '-' + mm + '-' + dd;
                var sumAmt = rs.result.estList[i].SUM_AMT;
                if (rs.result.estList[i].SUM_AMT == null || rs.result.estList[i].SUM_AMT == "") {
                    sumAmt = 0;
                }
                html += "<tr id='tr2" + rs.result.estList[i].EST_SN + "' onclick='estInfo.fn_versionClick(" + rs.result.estList[i].EST_SN + ")'>";
                html += "   <td style='text-align: right'>" + (i + 1) + "</td>";
                html += "   <td>" + rs.result.estList[i].EST_NM + "</td>";
                html += "   <td style='text-align: right'>" + estInfo.comma(sumAmt) + "</td>";
                html += "   <td style='text-align: right'>" + rs.result.estList[i].CNT + "</td>";
                html += "   <td style='text-align: right'>" + sdfDate + "</td>";
                html += "   <td style='text-align: right'>" + rs.result.estList[i].EMP_NAME + "</td>";
                html += "   <td style='text-align: right'>";
                html += "       <button type=\"button\" id=\"delBtn\" onclick=\"estInfo.fn_delEst(" + rs.result.estList[i].EST_SN + ", " + (i + 1) + ")\" class=\"k-button k-button-solid-error\">" +
                                "삭제" +
                                "</button>";
                html += "   </td>";
                html += "</tr>";

                if(i+1 == len){
                    $("#version").val(rs.result.estList[i].EST_SN);
                    lastVersion = rs.result.estList[i].EST_SN;
                }
            }

            $("#productTb2").append(html);

            var estList = rs.result.estList[0];
            var estSubList = rs.result.estSubList;


            for (var idx = 0; idx < estSubList.length; idx++) {
                var html = "";
                var etc = ""
                if (estSubList[idx].ETC != null && estSubList[idx].ETC != "") {
                    etc = estSubList[idx].ETC;
                }

                html += '<tr id="tr' + (idx + 1) + '">';
                html += '   <td style="text-align: center"><span style="position: relative; top:5px">' + (idx + 1) + '</span></td>';
                html += '   <td><input type="text" class="prodNm" id="prodNm' + (idx + 1) + '" value="' + estSubList[idx].PROD_NM + '"/></td>';
                html += '   <td><input type="text" class="prodCnt" id="prodCnt' + (idx + 1) + '" style="text-align: right;" onkeyup="estInfo.inputNumberFormat(this)" value="' + estInfo.comma(estSubList[idx].PROD_CNT) + '" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');"/></td>';
                html += '   <td><input type="text" class="unit" id="unit' + (idx + 1) + '" value="' + estSubList[idx].UNIT + '"/></td>';
                html += '   <td><input type="text" class="unitAmt" id="unitAmt' + (idx + 1) + '" style="text-align: right;" onkeyup="estInfo.inputNumberFormat(this)" value="' + estInfo.comma(estSubList[idx].UNIT_AMT) + '" oninput="this.value = this.value.replace(/[^-0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');"/></td>';
                html += '   <td><input type="text" class="supAmt" id="supAmt' + (idx + 1) + '" style="text-align: right;" disabled onkeyup="estInfo.inputNumberFormat(this)" value="' + estInfo.comma(estSubList[idx].SUP_AMT) + '" oninput="this.value = this.value.replace(/[^-0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');"/></td>';
                html += '   <td><input type="text" class="prodEtc" id="prodEtc' + (idx + 1) + '" value="' + etc + '" /></td>';
                html += '   <td style="text-align: center">';
                html += '       <button type="button" id="delBtn" onclick="estInfo.fn_delRow(' + (idx + 1) + ')" class="k-button k-button-solid-error">삭제</button>';
                html += '   </td>';
                html += '</tr>';

                $("#productTb").append(html);

                $("#prodNm" + (idx + 1) + ", #prodCnt" + (idx + 1) + ", #unit" + (idx + 1) + ", #unitAmt" + (idx + 1) + ", #supAmt" + (idx + 1) + ", #prodEtc" + (idx + 1) + "").kendoTextBox();

            }

            $("#productTb > tr").each(function (e) {
                $("#prodCnt" + e + ", #unitAmt" + e).on("keyup", function () {
                    var unitAmt = $("#unitAmt" + e).val();
                    $("#supAmt" + e).val(estInfo.comma(estInfo.uncommaN($("#unitAmt" + e).val()) * estInfo.uncommaN($("#prodCnt" + e).val())));

                    estInfo.global.totAmt = 0;
                    $("#productTb > tr").each(function (idx) {
                        estInfo.global.totAmt += Number(estInfo.uncommaN($("#supAmt" + idx).val()));
                        // 견적가 합계 구하기
                        $("#estExpAmt").val(estInfo.comma(estInfo.global.totAmt));
                    });
                });
            });

            $("#estPjtNm").val(rs.result.estList[len - 1].EST_NM);
            $("#crmMem").val(rs.result.estList[len - 1].CRM_MEM);
            $("#estDe").val(rs.result.estList[len - 1].EST_DE);
            $("#etc").val(rs.result.estList[len - 1].EST_ISS);
            $("#estExpAmt").val(estInfo.comma(rs.result.estList[len - 1].EST_TOT_AMT));
            estInfo.global.totAmt = Number(estInfo.uncommaN($("#estExpAmt").val()));
            $("#vat" + rs.result.estList[len - 1].VAT).prop("checked", true);

            if(lastVersion != ""){
                estInfo.fn_versionClick(lastVersion)
            }
        }
        if($("#version").val() == ""){
            $("#printBtn").hide();
        }
    },

    fn_delRow : function (i){
        if(!confirm("삭제하시겠습니까?")){
            return ;
        }
        $("#tr" + i).remove();

        var inputData = {
            prodNm : $("#prodNm").val(),
            prodCnt : $("#prodCnt").val(),
            unit : $("#unit").val(),
            unitAmt : $("#unitAmt").val(),
            supAmt : $("#supAmt").val(),
            prodEtc : $("#prodEtc").val(),
        }

        estInfo.global.totAmt = 0;
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
                    $("#tr"+idx+" > td > button").attr("onclick", "estInfo.fn_delRow("+idx+")");
                });

                $("#prodCnt" + idx + ", #unitAmt" + idx).on("keyup", function(){
                    estInfo.global.totAmt -= Number(estInfo.uncommaN($("#supAmt" + idx).val()));
                    $("#supAmt" + idx).val(estInfo.comma(estInfo.uncommaN($("#unitAmt" + idx).val()) * estInfo.uncommaN($("#prodCnt" + idx).val())));
                    estInfo.global.totAmt += Number(estInfo.uncommaN($("#supAmt" + idx).val()));
                    // 견적가 합계 구하기
                    $("#estExpAmt").val(estInfo.comma(estInfo.global.totAmt));
                });


                estInfo.global.totAmt += Number(estInfo.uncommaN($("#supAmt" + idx).val()));
                // 견적가 합계 구하기
                $("#estExpAmt").val(estInfo.comma(estInfo.global.totAmt));
            }
        });

        // estInfo.global.totAmt -= Number(estInfo.uncomma(inputData.supAmt));
        $("#estExpAmt").val(estInfo.comma(estInfo.global.totAmt));
    },

    fn_versionClick: function (k){
        $("#version").val(k);
        $("#printBtn").show();

        $("#productTb2 > tr").each(function(){
            $(this).css("background-color", "#ffffff");
        });
        $("#tr2" + k).css("background-color", "#a7e1fc");

        var data = {
            estSn : k,
        }

        var rs = customKendo.fn_customAjax("/project/getStep1SubData", data);
        var estSub = rs.result.estSub;
        var estSubList = rs.result.estSubList;

        $("#estDe").val(estSub.EST_DE);
        $("#estPjtNm").val(estSub.EST_NM);
        $("#crmMem").val(estSub.CRM_MEM);
        $("input[name='vatYn'][value='" + estSub.VAT + "']").prop("checked", true);
        $("#estExpAmt").val(estInfo.comma(estSub.EST_TOT_AMT));
        $("#etc").val(estSub.EST_ISS);

        $("#productTb").empty();
        var bsHtml = "";
        bsHtml = "<tr>\n" +
            "                    <td style=\"text-align: center\"><span style=\"position: relative; top:5px\">추가</span></td>\n" +
            "                    <td><input type=\"text\" class=\"prodNm\" alias=\"prodNm\" id=\"prodNm\" /></td>\n" +
            "                    <td><input type=\"text\" class=\"prodCnt\" alias=\"prodCnt\" id=\"prodCnt\" style=\"text-align: right;\" onkeyup=\"estInfo.inputNumberFormat(this)\" oninput=\"this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\\..*)\\./g, '$1');\" /></td>\n" +
            "                    <td><input type=\"text\" class=\"unit\" alias=\"unit\" id=\"unit\" /></td>\n" +
            "                    <td><input type=\"text\" class=\"unitAmt\" alias=\"unitAmt\" id=\"unitAmt\" style=\"text-align: right;\" onkeyup=\"estInfo.inputNumberFormat(this)\" oninput=\"this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\\..*)\\./g, '$1');\" /></td>\n" +
            "                    <td><input type=\"text\" class=\"supAmt\" alias=\"supAmt\" id=\"supAmt\" disabled style=\"text-align: right;\" /></td>\n" +
            "                    <td><input type=\"text\" class=\"prodEtc\" alias=\"prodEtc\" id=\"prodEtc\" /></td>\n" +
            "                    <td style=\"text-align: center\"><button type=\"button\" id=\"addBtn\" onclick='estInfo.fn_addClickEvent()' class=\"k-button k-button-solid-base\">추가</button> </td>\n" +
            "                </tr>"
        $("#productTb").append(bsHtml);

        $("#prodNm, #prodCnt, #unit, #unitAmt, #supAmt, #prodEtc").kendoTextBox();

        $("#prodCnt, #unitAmt").on("keyup", function(){
            $("#supAmt").val(estInfo.comma(estInfo.uncommaN($("#unitAmt").val()) * estInfo.uncommaN($("#prodCnt").val())))
        });

        var totAmt = 0;

        for(var idx = 0 ; idx < estSubList.length ; idx++){
            var html = "";
            var etc = ""
            if(estSubList[idx].ETC != null && estSubList[idx].ETC != ""){
                etc = estSubList[idx].ETC;
            }

            html += '<tr id="tr'+(idx+1)+'">';
            html += '   <td style="text-align: center"><span style="position: relative; top:5px">'+(idx+1)+'</span></td>';
            html += '   <td><input type="text" class="prodNm" id="prodNm'+(idx+1)+'" value="'+estSubList[idx].PROD_NM+'"/></td>';
            html += '   <td><input type="text" class="prodCnt" id="prodCnt'+(idx+1)+'" style="text-align: right;" onkeyup="estInfo.inputNumberFormat(this)" value="'+estInfo.comma(estSubList[idx].PROD_CNT)+'" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');"/></td>';
            html += '   <td><input type="text" class="unit" id="unit'+(idx+1)+'" value="'+estSubList[idx].UNIT+'"/></td>';
            html += '   <td><input type="text" class="unitAmt" id="unitAmt'+(idx+1)+'" style="text-align: right;" onkeyup="estInfo.inputNumberFormat(this)" value="'+estInfo.comma(estSubList[idx].UNIT_AMT)+'" oninput="this.value = this.value.replace(/[^-0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');"/></td>';
            html += '   <td><input type="text" class="supAmt" id="supAmt'+(idx+1)+'" style="text-align: right;" disabled onkeyup="estInfo.inputNumberFormat(this)" value="'+estInfo.comma(estSubList[idx].SUP_AMT)+'" oninput="this.value = this.value.replace(/[^-0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');"/></td>';
            html += '   <td><input type="text" class="prodEtc" id="prodEtc'+(idx+1)+'" value="'+etc+'" /></td>';
            html += '   <td style="text-align: center">';
            html += '       <button type="button" id="delBtn" onclick="estInfo.fn_delRow('+(idx+1)+')" class="k-button k-button-solid-error">삭제</button>';
            html += '   </td>';
            html += '</tr>';

            $("#productTb").append(html);

            $("#prodNm" + (idx+1) + ", #prodCnt" + (idx+1) + ", #unit" + (idx+1) + ", #unitAmt" + (idx+1) + ", #supAmt" + (idx+1) + ", #prodEtc" + (idx+1) + "").kendoTextBox();
            totAmt += estSubList[idx].SUP_AMT;
        }

        $("#estExpAmt").val(estInfo.comma(totAmt));

        $("#productTb > tr").each(function(e){
            $("#prodCnt" + e + ", #unitAmt" + e).on("keyup", function(){
                $("#supAmt" + e).val(estInfo.comma(estInfo.uncommaN($("#unitAmt" + e).val()) * estInfo.uncommaN($("#prodCnt" + e).val())));

                estInfo.global.totAmt = 0;
                $("#productTb > tr").each(function (idx){
                    estInfo.global.totAmt += Number(estInfo.uncommaN($("#supAmt" + idx).val()));
                    // 견적가 합계 구하기
                    $("#estExpAmt").val(estInfo.comma(estInfo.global.totAmt));
                });
            });
        });
    },

    fn_delEst : function(e, i){
        if(confirm("버전 " + i + " 삭제하시겠습니까?")){
            var result = customKendo.fn_customAjax("/project/engn/setEstInfoDel", {estSn : e, pjtSn : $("#pjtSn").val()});
            if(result.flag){
                alert("삭제되었습니다.");
                if(commonProject.global.teamStat == "Y"){
                    window.location.href="/project/pop/viewRegProject.do?pjtSn=" + $("#pjtSn").val() + "&tab=0";
                }else{
                    window.location.href="/project/pop/viewRegProject.do?pjtSn=" + $("#pjtSn").val() + "&tab=1";
                }
            }
        }
    },

    inputNumberFormat : function (obj){
        obj.value = estInfo.comma(estInfo.uncommaN(obj.value));
    },

    comma: function(str) {
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    },

    uncomma: function(str) {
        str = String(str);
        return str.replace(/[^\d]+/g, '');
    },

    uncommaN: function(str) {
        str = String(str);
        return str.replace(/[^\d-]|(?<=\d)-/g, '');
    },

    estPrintPop: function(){
        let pjtSn = $("#pjtSn").val();
        let estSn = $("#version").val();
        var url = "/project/pop/estPrintPop.do?pjtSn="+pjtSn+"&estSn="+estSn;
        var name = "estPrintPop";
        var option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";
        var popup = window.open(url, name, option);
    }
}