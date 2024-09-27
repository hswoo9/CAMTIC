var goodsInfo = {

    global : {
        totAmt : 0,
    },

    fn_defaultScript : function (){
        commonProject.setPjtStat();
        customKendo.fn_datePicker("goodsDelvDe", "depth", "yyyy-MM-dd", new Date());

        customKendo.fn_textBox(["goodsPjtSn", "goodsCrmNm", "goodCrmMem", "goodsPjtNm", "goodsTotAmt"]);

        $("#goodsIss").kendoTextArea({
            rows: 5
        });

        if(commonProject.global.teamStat == "Y"){
            $(".tmHide").hide();
        }

        $(".goodsProdNm, .goodsProdCnt, .goodsUnit, .goodsUnitAmt, .goodsSupAmt, .goodsProdEtc").kendoTextBox();

        $("#goodsProdCnt, #goodsUnitAmt").on("keyup", function(){
            $("#goodsSupAmt").val(goodsInfo.comma(goodsInfo.uncomma($("#goodsUnitAmt").val()) * goodsInfo.uncomma($("#goodsProdCnt").val())))
        });

        var data ={
            pjtSn : $("#pjtSn").val(),
            estSn : $("#estSn").val()
        }

        if($("#getDelvDe").val() != "" && $("#getDelvDe").val() != null){
            $("#goodsDelvDe").val($("#getDelvDe").val());
        }

        var rs = customKendo.fn_customAjax("/project/getStep1Data", data);
        var rs2 = customKendo.fn_customAjax("/project/getDevPjtVerList", data);

        const pjtInfo = customKendo.fn_customAjax("/project/engn/getDelvData", {pjtSn: $("#pjtSn").val()});
        const pjtMap = pjtInfo.map;
        if(pjtMap.DELV_DE != null && pjtMap.DELV_DE != "") {
            $("#goodsDelvDe").val(pjtMap.DELV_DE);
            $("#delvDeHistBtn").show();
            $("#saveCk").val("Y");
            $("#goodsDelvDe").data("kendoDatePicker").enable(false);
        } else {
            $("#delvDeHistBtn").hide();
        }


        var estSubList = rs.result.estSubList;

        var data = {
            pjtSn : $("#pjtSn").val(),
            checkPoint : "GOODS"
        }

        if(estSubList.length > 0){
            $("#printBtn").show();
            if(rs2.list[0].TEAM_STAT == "Y" && rs2.list[0].GOODS_ISS != null){
                $("#teamAppBtn").show();
                if(rs2.list[0].PJT_TEAM_CK == "Y"){
                    $("#teamAppBtn").hide();
                    $("#saveBtn2").hide();
                    $("#btnDiv").append('<span style="float: right; color: red; position: relative; top: 10px; right: 10px; font-size: 12px;">마감되었습니다.</span>');
                }
            }
        }

        for(var idx = 0 ; idx < estSubList.length ; idx++){
            var html = "";
            var etc = ""
            if(estSubList[idx].ETC != null && estSubList[idx].ETC != ""){
                etc = estSubList[idx].ETC;
            }

            html += '<tr id="tr'+(idx+1)+'">';
            html += '   <td style="text-align: center"><span style="position: relative; top:5px">'+(idx+1)+'</span></td>';
            html += '   <td><input type="text" class="goodsProdNm" id="goodsProdNm'+(idx+1)+'" value="'+estSubList[idx].PROD_NM+'"/></td>';
            html += '   <td><input type="text" class="goodsProdCnt" id="goodsProdCnt'+(idx+1)+'" style="text-align: right;" onkeyup="goodsInfo.inputNumberFormat(this)" value="'+goodsInfo.comma(estSubList[idx].PROD_CNT)+'" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');"/></td>';
            html += '   <td><input type="text" class="goodsUnit" id="goodsUnit'+(idx+1)+'" value="'+estSubList[idx].UNIT+'"/></td>';
            html += '   <td><input type="text" class="goodsUnitAmt" id="goodsUnitAmt'+(idx+1)+'" style="text-align: right;" onkeyup="goodsInfo.inputNumberFormat(this)" value="'+goodsInfo.comma(estSubList[idx].UNIT_AMT)+'" oninput="this.value = this.value.replace(/[^-0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');"/></td>';
            html += '   <td><input type="text" class="goodsSupAmt" id="goodsSupAmt'+(idx+1)+'" style="text-align: right;" disabled onkeyup="goodsInfo.inputNumberFormat(this)" value="'+goodsInfo.comma(estSubList[idx].SUP_AMT)+'" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');"/></td>';
            html += '   <td><input type="text" class="goodsProdEtc" id="goodsProdEtc'+(idx+1)+'" value="'+etc+'" /></td>';
            html += '   <td style="text-align: center">';
            html += '       <button type="button" id="delBtn" onclick="goodsInfo.fn_delRow('+(idx+1)+')" class="k-button k-button-solid-error">삭제</button>';
            html += '   </td>';
            html += '</tr>';

            $("#goodsProductTb").append(html);

            $("#goodsProdNm" + (idx+1) + ", #goodsProdCnt" + (idx+1) + ", #goodsUnit" + (idx+1) + ", #goodsUnitAmt" + (idx+1) + ", #goodsSupAmt" + (idx+1) + ", #goodsProdEtc" + (idx+1) + "").kendoTextBox();

        }


        $("#goodsProductTb > tr").each(function(e){
            $("#goodsProdCnt" + e + ", #goodsUnitAmt" + e).on("keyup", function(){
                var goodsUnitAmt = $("#goodsUnitAmt" + e).val();
                $("#goodsSupAmt" + e).val(goodsInfo.comma(goodsInfo.uncomma(goodsUnitAmt) * goodsInfo.uncomma($("#goodsProdCnt" + e).val())));

                goodsInfo.global.totAmt = 0;
                $("#goodsProductTb > tr").each(function (idx) {
                    goodsInfo.global.totAmt += Number(goodsInfo.uncomma($("#goodsSupAmt" + idx).val()));
                    // 견적가 합계 구하기
                    $("#goodsTotAmt").val(goodsInfo.comma(goodsInfo.global.totAmt));
                });
            });
        });

        $("#goodsTotAmt").val(goodsInfo.comma(rs.result.estList[rs.result.estList.length - 1].EST_TOT_AMT));

    },

    fn_teamProjectApp : function (){
        if(!confirm("프로젝트를 마감 하시겠습니까?")){
            return;
        }
        const pjtSn = $("#pjtSn").val();
        if(pjtSn == ""){
            alert("데이터 조회 중 오류가 발생하였습니다."); return;
        }
        const result = customKendo.fn_customAjax("/project/setPjtTeamApp", {
            pjtSn: pjtSn
        });
        if(result.flag){
            alert("마감처리 되었습니다.");
            location.reload();
        }
    },

    inputNumberFormat : function (obj){
        obj.value = goodsInfo.comma(goodsInfo.uncomma(obj.value));
    },

    comma: function(str) {
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    },

    uncomma: function(str) {
        str = String(str);
        return str.replace(/[^\d]+/g, '');
    },

    fn_save : function (){
        if(goodsInfo.uncomma($("#expAmt").val()) != goodsInfo.uncomma($("#goodsTotAmt").val())){
            if(!confirm("예상견적가와 견적가가 다릅니다. 저장하시겠습니까?")){
                return false;
            }
        }

        var data = {
            estSn : $("#estSn").val(),
            pjtSn : $("#pjtSn").val(),
            goodsTotAmt : goodsInfo.uncomma($("#goodsTotAmt").val()),
            goodsIss : $("#goodsIss").val(),
            delvDe : $("#goodsDelvDe").val(),
            step : $("#step").val(),
            stepColumn : $("#stepColumn").val(),
            nextStepColumn : $("#nextStepColumn").val(),
            stepValue : $("#stepValue").val(),
            nextStepValue : $("#nextStepValue").val(),

            empSeq : $("#empSeq").val(),
        }

        var fd = new FormData();
        fd.append("pjtSn", data.pjtSn);
        fd.append("estSn", data.estSn);
        fd.append("goodsTotAmt", data.goodsTotAmt);
        fd.append("goodsIss", data.goodsIss);
        if($("#saveCk").val() == "N"){
            fd.append("delvDe", data.delvDe);
        }
        fd.append("step", data.step);
        fd.append("stepColumn", data.stepColumn);
        fd.append("nextStepColumn", data.nextStepColumn);
        fd.append("stepValue", data.stepValue);
        fd.append("nextStepValue", data.nextStepValue);
        fd.append("empSeq", data.empSeq);
        fd.append("regEmpSeq", data.empSeq);

        $.ajax({
            url : "/project/engn/setGoodsInfo",
            data : fd,
            type : "post",
            dataType : "json",
            contentType: false,
            processData: false,
            enctype : 'multipart/form-data',
            async : false,
            success:function (rs) {
                console.log(rs)
                if(rs.code == 200){
                    $("#goodsProductTb > tr").each(function (idx){
                        if(idx != 0) {
                            var data2 = {
                                estSn: rs.rs.estSn,
                                prodNm: $("#goodsProdNm" + idx).val(),
                                prodCnt: goodsInfo.uncomma($("#goodsProdCnt" + idx).val()),
                                unit: $("#goodsUnit" + idx).val(),
                                unitAmt: goodsInfo.uncomma($("#goodsUnitAmt" + idx).val()),
                                supAmt: goodsInfo.uncomma($("#goodsSupAmt" + idx).val()),
                                etc: $("#goodsProdEtc" + idx).val()
                            }

                            $.ajax({
                                url: "/project/engn/setEstSubMod",
                                data: data2,
                                type: "post",
                                async: false,
                                dataType: "json",
                                success: function (rs) {
                                    if (rs.code == 200) {
                                        if(commonProject.global.teamStat == "Y"){
                                            window.location.href="/project/pop/viewRegProject.do?pjtSn=" + data.pjtSn + "&tab=3";
                                        }else{
                                            window.location.href="/project/pop/viewRegProject.do?pjtSn=" + data.pjtSn + "&tab=6";
                                        }
                                    }
                                }
                            })
                        }
                    });
                }else{
                    alert("견적관리를 먼저 작성하시기 바랍니다.");
                }
            }
        });
    },

    fn_add: function (){
        var idx = 0;
        $("#goodsProductTb > tr").each(function(e){
            idx = e + 1;
        });

        var inputData = {
            goodsProdNm : $("#goodsProdNm").val(),
            goodsProdCnt : goodsInfo.uncomma($("#goodsProdCnt").val()),
            goodsUnit : $("#goodsUnit").val(),
            goodsUnitAmt :goodsInfo.uncomma($("#goodsUnitAmt").val()),
            goodsSupAmt : goodsInfo.uncomma($("#goodsSupAmt").val()),
            goodsProdEtc : $("#goodsProdEtc").val(),
        }


        var html = "";
        html += '<tr id="tr'+idx+'">';
        html += '   <td style="text-align: center"><span style="position: relative; top:5px">'+idx+'</span></td>';
        html += '   <td><input type="text" class="goodsProdNm" id="goodsProdNm'+idx+'" value="'+inputData.goodsProdNm+'"/></td>';
        html += '   <td><input type="text" class="goodsProdCnt" id="goodsProdCnt'+idx+'" style="text-align: right;" onkeyup="goodsInfo.inputNumberFormat(this)" value="'+goodsInfo.comma(inputData.goodsProdCnt)+'" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');"/></td>';
        html += '   <td><input type="text" class="goodsUnit" id="goodsUnit'+idx+'" value="'+inputData.goodsUnit+'"/></td>';
        html += '   <td><input type="text" class="goodsUnitAmt" id="goodsUnitAmt'+idx+'" style="text-align: right;" onkeyup="goodsInfo.inputNumberFormat(this)" value="'+goodsInfo.comma(inputData.goodsUnitAmt)+'" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');"/></td>';
        html += '   <td><input type="text" class="goodsSupAmt" id="goodsSupAmt'+idx+'" disabled style="text-align: right;" onkeyup="goodsInfo.inputNumberFormat(this)" value="'+goodsInfo.comma(inputData.goodsSupAmt)+'" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');"/></td>';
        html += '   <td><input type="text" class="goodsProdEtc" id="goodsProdEtc'+idx+'" value="'+inputData.goodsProdEtc+'" /></td>';
        html += '   <td style="text-align: center">';
        html += '       <button type="button" id="delBtn" onclick="goodsInfo.fn_delRow('+idx+')" class="k-button k-button-solid-error">삭제</button>';
        html += '   </td>';
        html += '</tr>';
        $("#goodsProductTb").append(html);

        goodsInfo.global.totAmt += Number(goodsInfo.uncomma($("#goodsSupAmt" + idx).val()));
        // 견적가 합계 구하기
        $("#goodsTotAmt").val(goodsInfo.comma(goodsInfo.global.totAmt));

        $("#goodsProdNm" + idx + ", #goodsProdCnt" + idx + ", #goodsUnit" + idx + ", #goodsUnitAmt" + idx + ", #goodsSupAmt" + idx + ", #goodsProdEtc" + idx + "").kendoTextBox();

        $("#goodsProdCnt" + idx + ", #goodsUnitAmt" + idx).on("keyup", function(){
            $("#goodsSupAmt" + idx).val(goodsInfo.comma(goodsInfo.uncomma($("#goodsUnitAmt" + idx).val()) * goodsInfo.uncomma($("#goodsProdCnt" + idx).val())));

            goodsInfo.global.totAmt = 0;
            $("#goodsProductTb > tr").each(function (idx){
                goodsInfo.global.totAmt += Number(goodsInfo.uncomma($("#goodsSupAmt" + idx).val()));
                // 견적가 합계 구하기
                $("#goodsTotAmt").val(goodsInfo.comma(goodsInfo.global.totAmt));
            });
        });
    },


    fn_delRow : function (i){
        $("#tr" + i).remove();

        var inputData = {
            goodsProdNm : $("#goodsProdNm").val(),
            goodsProdCnt : $("#goodsProdCnt").val(),
            goodsUnit : $("#goodsUnit").val(),
            goodsUnitAmt : $("#goodsUnitAmt").val(),
            goodsSupAmt : $("#goodsSupAmt").val(),
            goodsProdEtc : $("#goodsProdEtc").val(),
        }

        goodsInfo.global.totAmt = 0;
        $("#goodsProductTb > tr").each(function (idx){
            if(idx != 0){
                $(this).removeAttr("id");
                $(this).attr("id", "tr" + idx);

                $(this).children("td").first().html('<span style=\"position: relative; top:5px\">'+(idx)+'</span>');
                $(this).children("td").each(function(){
                    $("#tr"+idx+" > td > span > input").each(function(){
                        $(this).removeAttr("id");
                        $(this).attr("id", $(this).attr("class").split(" ")[0] + idx);
                    })

                    $("#tr"+idx+" > td > button").removeAttr("onclick");
                    $("#tr"+idx+" > td > button").attr("onclick", "goodsInfo.fn_delRow("+idx+")");
                });

                $("#goodsProdCnt" + idx + ", #goodsUnitAmt" + idx).on("keyup", function(){
                    goodsInfo.global.totAmt -= Number(goodsInfo.uncomma($("#goodsSupAmt" + idx).val()));
                    $("#goodsSupAmt" + idx).val(goodsInfo.comma(goodsInfo.uncomma($("#goodsUnitAmt" + idx).val()) * goodsInfo.uncomma($("#goodsProdCnt" + idx).val())));
                    goodsInfo.global.totAmt += Number(goodsInfo.uncomma($("#goodsSupAmt" + idx).val()));
                    // 견적가 합계 구하기
                    $("#goodsTotAmt").val(goodsInfo.comma(goodsInfo.global.totAmt));
                });


                goodsInfo.global.totAmt += Number(goodsInfo.uncomma($("#goodsSupAmt" + idx).val()));
                // 견적가 합계 구하기
                $("#goodsTotAmt").val(goodsInfo.comma(goodsInfo.global.totAmt));
            }
        });

        goodsInfo.global.totAmt -= Number(goodsInfo.uncomma(inputData.goodsSupAmt));
        $("#goodsTotAmt").val(goodsInfo.comma(goodsInfo.global.totAmt));
    },

    goodsPrintPop: function(){
        let pjtSn = $("#pjtSn").val();
        var url = "/project/pop/goodsPrintPop.do?pjtSn="+pjtSn;
        var name = "goodsPrintPop";
        var option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";
        var popup = window.open(url, name, option);
    },

    pjtDelvDeSetPop: function(){
        let url = "/project/pjtDelvDeSetPop.do?pjtSn="+$("#pjtSn").val();
        const name = "pjtAmtSetPop";
        const option = "width = 800, height = 767, top = 150, left = 400, location = no";
        window.open(url, name, option);
    }
}