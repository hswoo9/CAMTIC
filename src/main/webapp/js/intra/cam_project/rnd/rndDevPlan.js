var rndDP = {

    global: {
        devPjtVerList : [],
    },

    fn_defaultScript: function(){
        $("#devPlanCont, #devPlanIss").kendoTextArea({
            rows : 5,
        });

        customKendo.fn_textBox(["invNm", "invCnt", "invUnit", "estTotAmt", "estOfc", "invEtc"])

        var data = {
            pjtSn : $("#pjtSn").val()
        }

        var rs = customKendo.fn_customAjax("/project/getDevPjtVerList", data);

        var html = "";
        if(rs.list[0].INV_DT != null && rs.list[0].INV_DT != "" && rs.list[0].INV_DT != undefined){
            for(var i = 0 ; i < rs.list.length ; i++){
                var date = new Date(rs.list[i].INV_DT);
                var yyyy = date.getFullYear();
                var mm = date.getMonth()+1;
                mm = mm >= 10 ? mm : '0'+mm;	// 10 보다 작으면 0을 앞에 붙여주기 ex) 3 > 03
                var dd = date.getDate();
                dd = dd >= 10 ? dd : '0'+dd;	// 10 보다 작으면 9을 앞에 붙여주기 ex) 9 > 09
                var sdfDate = yyyy+'년 '+mm+'월 '+dd+'일';

                var invAmt = rs.list[i].INV_AMT == null ? 0 : rs.list[i].INV_AMT;
                var docNo = rs.list[i].DOC_NO == null ? "" : rs.list[i].DOC_NO;

                html += "<tr style='text-align: center'>";
                html += "   <td>Ver."+(i+1)+"</td>";
                html += "   <td>"+ docNo +"</td>";
                html += "   <td><div onclick='rndDP.fn_viewVersion("+rs.list[i].DEV_SN+");' style='cursor : pointer; font-weight: bold'>"+ sdfDate +"</div></td>";
                html += "   <td id='invAmt002'>"+comma(invAmt)+"</td>";
                html += "   <td>"+rs.list[i].EMP_NAME_KR+"</td>";
                html += "   <td></td>";
                html += "   <td>개발계획 작성중</td>";
                html += "</tr>";
            }
        }

        $("#verTable").append(html);

        var resultMap = customKendo.fn_customAjax("/project/getDevelopPlan", data);

        if(resultMap.rs.STATUS == 100){
            $("#approveBtn").css("display", "none");
            $("#rsBtn").css("display", "");
        } else {
            $("#approveBtn").css("display", "");
            $("#rsBtn").css("display", "none");
        }

    },


    fn_addVersion : function (){
        if(!confirm("예비원가를 추가하시겠습니까?")){
            return;
        }

        var data = {
            pjtSn : $("#pjtSn").val(),
            empSeq : $("#empSeq").val(),
        }
        var rs = customKendo.fn_customAjax("/project/getDevPjtVerList", data);

        if(rs.list[rs.list.length - 1].DEV_SN != undefined && rs.list[rs.list.length - 1].DEV_SN != ""){
            alert("이미 작성중인 예비원가서가 있습니다.");
            return ;
        }
        var result = customKendo.fn_customAjax("/projectRnd/setDevPjtVer", data);

        if(result.code != 200){
            alert("오류가 발생하였습니다. \n 관리자에게 문의해주세요.");
            return ;
        }
        $("#devSn").val(result.params.devSn);

        rs = result.rs;

        rndDP.global.devPjtVerList = rs;
        var html = "";
        for(var i = 0 ; i < rs.length ; i++){
            var date = new Date(rs[i].INV_DT);
            var yyyy = date.getFullYear();
            var mm = date.getMonth()+1;
            mm = mm >= 10 ? mm : '0'+mm;	// 10 보다 작으면 0을 앞에 붙여주기 ex) 3 > 03
            var dd = date.getDate();
            dd = dd >= 10 ? dd : '0'+dd;	// 10 보다 작으면 9을 앞에 붙여주기 ex) 9 > 09
            var sdfDate = yyyy+'년 '+mm+'월 '+dd+'일';

            var invAmt = rs[i].INV_AMT == null ? 0 : rs[i].INV_AMT;
            var docNo = rs[i].DOC_NO == null ? "" : rs[i].DOC_NO;

            html += "<tr style='text-align: center'>";
            html += "   <td>Ver."+(i+1)+"</td>";
            html += "   <td>"+ docNo +"</td>";
            html += "   <td>"+ sdfDate +"</td>";
            html += "   <td id='invAmt002'>"+comma(invAmt)+"</td>";
            html += "   <td>"+rs[i].EMP_NAME_KR+"</td>";
            html += "   <td></td>";
            html += "   <td>개발계획 작성중</td>";
            html += "</tr>";
        }

        $("#verTable").append(html);

        $("#addPSActive").css("display", "block");
    },

    fn_viewVersion: function (key){

        $("#invTable").html("");

        var bsHtml = "<tr>\n" +
            "                    <td style=\"text-align: center\"><span style=\"position: relative; top:5px\">추가</span></td>\n" +
            "                    <td><input type=\"text\" id=\"invNm\" class=\"invNm\" /></td>\n" +
            "                    <td><input type=\"text\" id=\"invCnt\" class=\"invCnt\" style=\"text-align: right\" onkeyup=\"inputNumberFormat(this)\" oninput=\"this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\\..*)\\./g, '$1');\" /></td>\n" +
            "                    <td><input type=\"text\" id=\"invUnit\" class=\"invUnit\" /></td>\n" +
            "                    <td><input type=\"text\" id=\"estTotAmt\" style=\"text-align: right\" class=\"estTotAmt\" onkeyup=\"inputNumberFormat(this)\" oninput=\"this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\\..*)\\./g, '$1');\" /></td>\n" +
            "                    <td><input type=\"text\" id=\"estOfc\" class=\"estOfc\" /></td>\n" +
            "                    <td><input type=\"text\" id=\"invEtc\" class=\"invEtc\" /></td>\n" +
            "                    <td style=\"text-align: center;\"><button type=\"button\" id=\"addBtn\" onclick=\"rndDP.fn_addInv()\" class=\"k-button k-button-solid-base\">추가</button></td>\n" +
            "                </tr>"


        $("#invTable").append(bsHtml);

        customKendo.fn_textBox(["invNm", "invCnt", "invUnit", "estTotAmt", "estOfc", "invEtc"])


        $("#devSn").val(key);
        var data = {
            pjtSn : $("#pjtSn").val(),
            devSn : $("#devSn").val()
        }
        $("#addPSActive").css("display", "block");



        $.ajax({
            url : "/project/getInvList",
            data : data,
            type : "post",
            dataType : "json",
            success : function(rs){

                var resultMap = customKendo.fn_customAjax("/project/getDevelopPlan", data);

                $("#devPlanCont").val(resultMap.rs.DEP_OBJ);
                $("#devPlanIss").val(resultMap.rs.ETC);
                var list = rs.list;

                for(var i = 0 ; i < list.length ; i++){
                    var idx = i+1;
                    var html = "";
                    html += '<tr id="itr'+idx+'">';
                    html += '   <td style="text-align: center"><span style="position: relative; top:5px">'+idx+'</span></td>' +
                        '       <td>' +
                        '           <input type="text" id="invNm'+idx+'" class="invNm" />' +
                        '           <input type="hidden" id="invSn'+idx+'" class="invSn" />' +
                        '       </td>\n' +
                        '       <td><input type="text" id="invCnt'+idx+'" class="invCnt" style="text-align: right" onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" /></td>\n' +
                        '       <td><input type="text" id="invUnit'+idx+'" class="invUnit" /></td>\n' +
                        '       <td><input type="text" id="estTotAmt'+idx+'" style="text-align: right" class="estTotAmt" onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" /></td>\n' +
                        '       <td><input type="text" id="estOfc'+idx+'" class="estOfc" /></td>\n' +
                        '       <td><input type="text" id="invEtc'+idx+'" class="invEtc" /></td>\n' +
                        '       <td style="text-align: center;">' +
                        '           <button type="button" id="delBtn" onclick="rndDP.fn_delInv('+idx+')" class="k-button k-button-solid-error">삭제</button>' +
                        '       </td>';
                    html += '</tr>';
                    $("#invTable").append(html);


                    customKendo.fn_textBox(["invNm" + idx, "invCnt" + idx , "invUnit" + idx,
                        "estTotAmt" + idx, "estOfc" + idx, "invEtc" + idx]);

                    $("#invSn" + idx).val(list[i].INV_SN);

                    $("#invNm" + idx).val(list[i].INV_NM);
                    $("#invCnt" + idx).val(comma(list[i].INV_CNT));
                    $("#invUnit" + idx).val(list[i].INV_UNIT);
                    $("#estTotAmt" + idx).val(comma(list[i].EST_TOT_AMT));
                    $("#invEtc" + idx).val(list[i].INV_ETC);

                    $("#estOfc" + idx).val(list[i].EST_OFC);
                }

                var idx = 0;
                var totAmt = 0;
                $("#invTable > tr").each(function(e){
                    idx++;
                    totAmt += Number(uncomma($("#estTotAmt" + idx).val()));
                });

                $("#invAmt002").text(comma(totAmt));

                var invPer = 0;

            }
        });
    },

    fn_addInv : function() {
        if(!confirm("투자내역을 추가하시겠습니까?")){
            return ;
        }

        var idx = 0;
        $("#invTable > tr").each(function(e){
            idx = e + 1;
        });

        if($("#invNm").val() == ""){
            alert("건명을 입력해주세요.");
            return ;
        }
        if($("#invCnt").val() == ""){
            alert("수량을 입력해주세요.");
            return ;
        }
        if($("#invUnit").val() == ""){
            alert("단위를 입력해주세요.");
            return ;
        }
        if($("#estTotAmt").val() == ""){
            alert("견적총액을 입력해주세요.");
            return ;
        }

        var data = {
            invRow : idx,
            devSn : $("#devSn").val(),
            invNm : $("#invNm").val(),
            invCnt : uncomma($("#invCnt").val()),
            invUnit : $("#invUnit").val(),
            estTotAmt : uncomma($("#estTotAmt").val()),
            estOfc : $("#estOfc").val(),
            invEtc : $("#invEtc").val(),
            pjtSn : $("#pjtSn").val(),
            regEmpSeq : $("#regEmpSeq").val()
        }

        var html = "";
        html += '<tr id="itr'+idx+'">';
        html += '   <td style="text-align: center"><span style="position: relative; top:5px">'+idx+'</span></td>' +
            '       <td>' +
            '           <input type="text" id="invNm'+idx+'" class="invNm" value="'+data.invNm+'" />' +
            '           <input type="hidden" id="invSn'+idx+'" class="invSn" />' +
            '       </td>\n' +
            '       <td><input type="text" id="invCnt'+idx+'" class="invCnt" value="'+comma(data.invCnt)+'" style="text-align: right" onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" /></td>\n' +
            '       <td><input type="text" id="invUnit'+idx+'" class="invUnit" value="'+data.invUnit+'" /></td>\n' +
            '       <td><input type="text" id="estTotAmt'+idx+'" style="text-align: right" value="'+comma(data.estTotAmt)+'" class="estTotAmt" onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" /></td>\n' +
            '       <td><input type="text" id="estOfc'+idx+'" class="estOfc" value="'+data.estOfc+'" /></td>\n' +
            '       <td><input type="text" id="invEtc'+idx+'" class="invEtc" value="'+data.invEtc+'" /></td>\n' +
            '       <td style="text-align: center;">' +
            '           <button type="button" id="delBtn" onclick="rndDP.fn_delInv('+idx+')" class="k-button k-button-solid-error">삭제</button>' +
            '       </td>';
        html += '</tr>';

        $("#invTable").append(html);

        customKendo.fn_textBox(["invNm" + idx, "invCnt" + idx , "invUnit" + idx,
            "estTotAmt" + idx, "estOfc" + idx, "invEtc" + idx]);


        $.ajax({
            url : "/project/insInvData",
            data : data,
            dataType : "json",
            type : "post",
            success : function(rs){
                if(rs.code == 200){
                    $("#invSn" + rs.rep.invRow).val(rs.rep.INV_SN);
                }

                var idx = 0;
                var totAmt = 0;
                $("#invTable > tr").each(function(e){
                    idx++;
                    totAmt += Number(uncomma($("#estTotAmt" + idx).val()));
                });

                $("#invAmt002").text(comma(totAmt));

                var data = {
                    devSn : $("#devSn").val(),
                    totAmt : totAmt
                }

                customKendo.fn_customAjax("/project/updPjtDevTotAmt", data);


                $("#estTotAmt").val("");
                $("#invNm").val("");
                $("#invCnt").val("");
                $("#invUnit").val("");
                $("#estOfc").val("");
                $("#invEtc").val("");
            }
        });
    },

    fn_delInv : function (i){

        if(!confirm("삭제하시겠습니까?")){
            return ;
        }

        var data = {
            invSn : $("#invSn" + i).val()
        }

        $.ajax({
            url : "/project/delInvest",
            data : data,
            type : "post",
            async: false,
            dataType : "json",
            success:function (rs){
                if(rs.code == 200){
                    $("#itr" + i).remove();

                    $("#invTable > tr").each(function (idx){
                        if(idx != 0){
                            $(this).removeAttr("id");
                            $(this).attr("id", "itr" + idx);

                            $(this).children("td").first().html('<span style=\"position: relative; top:5px\">'+(idx)+'</span>');
                            $(this).children("td").each(function(){
                                $("#itr"+idx+" > td > span > input").each(function(){
                                    $(this).removeAttr("id");
                                    $(this).attr("id", $(this).attr("class").split(" ")[0] + idx);
                                });
                            });

                            $(this).children("td").last().children("button").each(function(x){
                                if(x == 0){
                                    $(this).removeAttr("onclick");
                                    $(this).attr("onclick", "rndDP.fn_addInv("+idx+")");
                                } else {
                                    $(this).removeAttr("onclick");
                                    $(this).attr("onclick", "rndDP.fn_delInv("+idx+")");
                                }
                            });

                            var updData = {
                                invSn : $("#invSn" + idx).val(),
                                invRow : idx,
                                invNm : $("#invNm"+idx).val(),
                                invCnt : uncomma($("#invCnt"+idx).val()),
                                invUnit : $("#invUnit"+idx).val(),
                                estTotAmt : uncomma($("#estTotAmt"+idx).val()),
                                estOfc : $("#estOfc"+idx).val(),
                                invEtc : $("#invEtc"+idx).val()
                            }

                            $.ajax({
                                url : "/project/updInvest",
                                data : updData,
                                type : "post",
                                dataType : "json",
                                success : function (rs){

                                }
                            });
                        }
                    });
                    alert("삭제하였습니다.");

                    var idx = 0;
                    var totAmt = 0;
                    $("#invTable > tr").each(function(e){
                        idx++;
                        totAmt += Number(uncomma($("#estTotAmt" + idx).val()));
                    });

                    var data = {
                        devSn : $("#devSn").val(),
                        totAmt : totAmt
                    }
                    customKendo.fn_customAjax("/project/updPjtDevTotAmt", data);

                    $("#invAmt002").text(comma(totAmt));
                }
            }
        });
    },

    fn_save : function (){

        var data = {
            pjtSn : $("#pjtSn").val(),
            devSn : $("#devSn").val(),
            devPlanCont : $("#devPlanCont").val(),
            devPlanIss : $("#devPlanIss").val()
        }

        var rs = customKendo.fn_customAjax("/projectRnd/setDevInfo", data);

        if(rs.flag){
            window.location.href="/projectRnd/pop/regProject.do?pjtSn=" + data.pjtSn + "&tab=4";
        }
    },

    fn_approve : function (){
        if(!confirm("상신하시겠습니까?")){
            return;
        }
        var data = {
            pjtSn : $("#pjtSn").val()
        }

        $.ajax({
            url : "/projectRnd/tmpUpdDevPlanApprove",
            data : data,
            type : "post",
            dataType : "json",
            success : function (rs){
                if(rs.code == 200){
                    window.location.href="/projectRnd/pop/regProject.do?pjtSn=" + data.pjtSn + "&tab=4";
                }
            }
        });
    },

    fn_docView : function (){
        // alert("열람");
    }
}