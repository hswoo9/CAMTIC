var unRndDP = {

    global: {
        devPjtVerList : [],
        invCk: "N",
        crmIdx : "",
    },

    fn_defaultScript: function(){
        commonProject.setPjtStat();
        unRndDP.fn_setPage();
        unRndDP.fn_ckAdmin();
    },

    fn_ckAdmin : function(){
        const pjtSn = $("#pjtSn").val();

        const pjtInfo = customKendo.fn_customAjax("/project/getProjectStep", {pjtSn: pjtSn});
        const map = pjtInfo.rs;

        const empSeq = $("#regEmpSeq").val();
        console.log("login Emp Seq", empSeq);
        if(map.PM_EMP_SEQ != null && empSeq == map.PM_EMP_SEQ){
            console.log("map.PM_EMP_SEQ", map.PM_EMP_SEQ);
            $("#devBtnDiv").show();
        }

        if(map.REG_EMP_SEQ != null && empSeq == map.REG_EMP_SEQ){
            console.log("map.REG_EMP_SEQ", map.REG_EMP_SEQ);
            $("#devBtnDiv").show();
        }

        if(map.EMP_SEQ != null && empSeq == map.EMP_SEQ){
            console.log("map.EMP_SEQ", map.EMP_SEQ);
            $("#devBtnDiv").show();
        }

        const partVerResult = customKendo.fn_customAjax("/projectRnd/getReqPartRateVerList", {pjtSn : pjtSn});
        const partVerList = partVerResult.list;
        console.log("partVerList", partVerList);

        if(partVerList.length != 0){
            const partDetailResult = customKendo.fn_customAjax("/project/getPartRateVerData", {
                pjtSn : pjtSn,
                partRateVerSn : partVerList[partVerList.length - 1].PART_RATE_VER_SN
            });
            const partDetailMap = partDetailResult.result;
            const partMem = partDetailMap.projectMemberInfo;

            for(let i = 0 ; i < partMem.length; i++){
                var partMemMap = partMem[i];

                if(partMemMap.EMP_SEQ != null && empSeq == partMemMap.EMP_SEQ){
                    console.log("partMemMap.EMP_SEQ", partMemMap.EMP_SEQ);
                    $("#devBtnDiv").show();
                    break;
                }
            }
        }
    },

    fn_setPage : function(){
        $("#devPlanCont, #devPlanIss").kendoTextArea({
            rows : 5,
        });

        $("#prepList").kendoDropDownList({
            dataSource : [
                {text : "선택", value : ""},
                {text : "설계", value : "1"},
                {text : "제작", value : "2"},
                {text : "품질", value : "3"},
                {text : "참여", value : "4"},
                {text : "기획", value : "5"},
                {text : "기타", value : "6"}
            ],
            dataTextField : "text",
            dataValueField : "value"
        });

        customKendo.fn_textBox(["prepList", "psNm", "psEmpNm"]);
        customKendo.fn_datePicker("psStrDe", "depth", "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("psEndDe", "depth", "yyyy-MM-dd", new Date());


        customKendo.fn_textBox(["invNm","devPjtNm",
            "devCrmInfo", "pm", "invCnt", "invUnit", "invUnitPrice", "estTotAmt", "estOfc", "invEtc"]);

        var rs = customKendo.fn_customAjax("/project/getDevPjtVerList", {
            pjtSn : $("#pjtSn").val()
        });
        unRndDP.global.devPjtVerList = rs;

        if(rs.list[0].INV_DT != null && rs.list[0].INV_DT != "" && rs.list[0].INV_DT != undefined){
            var html = "";
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


                var pjtStepNm = "개발계획";
                if(rs.list[i].STATUS == "100"){
                    pjtStepNm += " 완료";
                } else {
                    pjtStepNm += " 진행중";
                }

                html += "<tr style='text-align: center'>";
                html += "   <td><span style='font-weight: bold; cursor: pointer' onclick='unRndDP.fn_setVersion("+rs.list[i].DEV_SN+")'>Ver."+(i+1)+"</span></td>";
                html += "   <td>"+ docNo +"</td>";
                html += "   <td>"+ sdfDate +"</td>";
                html += "   <td id='invAmt002'>"+comma(invAmt)+"</td>";
                html += "   <td>"+rs.list[i].REG_EMP_NAME+"</td>";
                html += "   <td></td>";
                html += "   <td>"+pjtStepNm+"</td>";
                html += "</tr>";

                $("#devSn").val(rs.list[i].DEV_SN);
            }
            $("#addPSActive").css("display", "block");
            $(".addPSActive").css("display", "block");
            $("#verTable").append(html);

            unRndDP.fn_setVersion(unRndDP.global.devPjtVerList.list[unRndDP.global.devPjtVerList.list.length-1].DEV_SN);
        }
    },

    fn_setVersion : function (key){
        unRndDP.fn_setData(key);

        if(unRndDP.global.appCk == "Y"){
            $("#devAppBtn").show();
        }
    },

    fn_setData: function (key){
        var data = {
            pjtSn : $("#pjtSn").val(),
            devSn : key,
        }

        $.ajax({
            url : "/project/getProcessList",
            data : data,
            async : false,
            type : "post",
            dataType : "json",
            success : function(rs){

                var list = rs.list;
                $("#psTable").html("");
                if(list.length != 0){
                    html += '<tr>' +
                        '            <td style="text-align: center"><span style="position: relative; top:5px">추가</span></td>' +
                        '            <td><input type="text" class="prepList" id="prepList" /></td>' +
                        '            <td><input type="text" class="psNm" id="psNm" /> </td>' +
                        '            <td style="text-align: center"><input type="text" class="psStrDe" id="psStrDe" style="width: 45%" />~<input type="text" class="psEndDe" style="width: 45%" id="psEndDe" /></td>' +
                        '            <td>' +
                        '                <input type="text" id="psEmpNm" disabled style="width: 100%" />' +
                        '                <input type="hidden" id="psEmpSeq" />' +
                        '            </td>' +
                        '            <td style="text-align: center">' +
                        '                <button type="button" onclick="fn_userMultiSelectPop()" class="k-button k-button-solid-base">추진담당</button>' +
                        '                <button type="button" class="k-button k-button-solid-base" onclick="devInfo.fn_addProcess(\'${hashMap.PJT_SN}\')">공정저장</button>' +
                        '            </td>' +
                        '        </tr>';

                    $("#psTable").append(html);

                    $("#prepList").kendoDropDownList({
                        dataSource : [
                            {text : "선택", value : ""},
                            {text : "설계", value : "1"},
                            {text : "제작", value : "2"},
                            {text : "품질", value : "3"},
                            {text : "참여", value : "4"},
                            {text : "기획", value : "5"},
                            {text : "기타", value : "6"},
                        ],
                        dataTextField : "text",
                        dataValueField : "value"
                    });
                    $("#psNm").kendoTextBox();
                    customKendo.fn_datePicker("psStrDe", "depth", "yyyy-MM-dd", new Date());
                    customKendo.fn_datePicker("psEndDe", "depth", "yyyy-MM-dd", new Date());
                    $("#psEmpNm").kendoTextBox();

                    for(var i = 0 ; i < list.length ; i++){
                        var idx = i+1;
                        var html = "";
                        html += '<tr id="tr'+idx+'">';
                        html += '   <td style="text-align: center"><span style="position: relative; top:5px">'+idx+'</span></td>';
                        html += '   <td><input type="text" class="prepList" id="prepList'+idx+'" /></td>';
                        html += '   <td>' +
                            '           <input type="text" class="psNm" id="psNm'+idx+'" />' +
                            '           <span><input type="hidden" class="psSn" id="psSn'+idx+'" value="'+list[i].PS_SN+'"/></span>' +
                            '       </td>';
                        html += '   <td style="text-align: center"><input type="text" class="psStrDe" id="psStrDe'+idx+'" style="width: 45%" />~<input type="text" class="psEndDe" style="width: 45%" id="psEndDe'+idx+'" /></td>';
                        html += '   <td><input type="text" id="psEmpNm'+idx+'" value="'+list[i].PS_EMP_SEQ+'" disabled /><input type="hidden" id="psEmpSeq'+idx+'" value="'+list[i].PS_EMP_SEQ+'" /></td>';
                        html += '   <td style="text-align: center">';
                        html += '       <button type="button" onclick="userSearch('+idx+')" class="k-button k-button-solid-base btn'+idx+'">추진담당</button>'
                        html += '       <button type="button" onclick="devInfo.fn_modProcess('+list[i].PS_SN+', '+idx+')" style="margin-left: 5px;" class="k-button k-button-solid-primary btn'+idx+'">수정</button>';
                        html += '       <button type="button" onclick="devInfo.fn_delRow('+idx+')" style="margin-left: 5px;" class="k-button k-button-solid-error btn'+idx+'">삭제</button>';
                        html += '   </td>';
                        html += '</tr>';
                        $("#psTable").append(html);


                        $("#prepList" + idx).kendoDropDownList({
                            dataSource : [
                                {text : "선택", value : ""},
                                {text : "설계", value : "1"},
                                {text : "제작", value : "2"},
                                {text : "품질", value : "3"},
                                {text : "참여", value : "4"},
                                {text : "기획", value : "5"},
                                {text : "기타", value : "6"},
                            ],
                            dataTextField : "text",
                            dataValueField : "value"
                        });

                        $("#prepList" + idx).data("kendoDropDownList").value(list[i].PS_PREP);
                        $("#psNm" + idx).kendoTextBox();
                        customKendo.fn_datePicker("psStrDe" + idx, "depth", "yyyy-MM-dd", new Date());
                        customKendo.fn_datePicker("psEndDe" + idx, "depth", "yyyy-MM-dd", new Date());
                        $("#psEmpNm" + idx).kendoTextBox();
                        $("#psEmpNm" + idx).val(list[i].PS_EMP_NM);
                        $("#psEmpSeq" + idx).val(list[i].PS_EMP_SEQ);
                        $("#psStrDe" + idx).val(list[i].PS_STR_DE);
                        $("#psEndDe" + idx).val(list[i].PS_END_DE);

                        $("#psNm" + idx).val(list[i].PS_NM);

                        unRndDP.global.appCk = "Y";
                    }
                } else {
                    html += '<tr>' +
                        '            <td style="text-align: center"><span style="position: relative; top:5px">추가</span></td>' +
                        '            <td><input type="text" class="prepList" id="prepList" /></td>' +
                        '            <td><input type="text" class="psNm" id="psNm" /> </td>' +
                        '            <td style="text-align: center"><input type="text" class="psStrDe" id="psStrDe" style="width: 45%" />~<input type="text" class="psEndDe" style="width: 45%" id="psEndDe" /></td>' +
                        '            <td>' +
                        '                <input type="text" id="psEmpNm" disabled style="width: 100%" />' +
                        '                <input type="hidden" id="psEmpSeq" />' +
                        '            </td>' +
                        '            <td style="text-align: center">' +
                        '                <button type="button" onclick="fn_userMultiSelectPop()" class="k-button k-button-solid-base">추진담당</button>' +
                        '                <button type="button" class="k-button k-button-solid-base" onclick="devInfo.fn_addProcess(\'${hashMap.PJT_SN}\')">공정저장</button>' +
                        '            </td>' +
                        '        </tr>';

                    $("#psTable").append(html);

                    $("#prepList").kendoDropDownList({
                        dataSource : [
                            {text : "선택", value : ""},
                            {text : "설계", value : "1"},
                            {text : "제작", value : "2"},
                            {text : "품질", value : "3"},
                            {text : "참여", value : "4"},
                            {text : "기획", value : "5"},
                            {text : "기타", value : "6"},
                        ],
                        dataTextField : "text",
                        dataValueField : "value"
                    });
                    $("#psNm").kendoTextBox();
                    customKendo.fn_datePicker("psStrDe", "depth", "yyyy-MM-dd", new Date());
                    customKendo.fn_datePicker("psEndDe", "depth", "yyyy-MM-dd", new Date());
                    $("#psEmpNm").kendoTextBox();

                    unRndDP.global.appCk = "N";
                }

            }
        });

        $("#invTable").html("");
        var bsHtml = "<tr>\n" +
            "                    <td style=\"text-align: center\"><span style=\"position: relative; top:5px\">추가</span></td>\n" +
            "                    <td><input type=\"text\" id=\"invNm\" class=\"invNm\" /></td>\n" +
            "                    <td><input type=\"text\" id=\"invCnt\" class=\"invCnt\" style=\"text-align: right\" onkeyup=\"inputNumberFormat(this)\" oninput=\"this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\\..*)\\./g, '$1');\" /></td>\n" +
            "                    <td><input type=\"text\" id=\"invUnit\" class=\"invUnit\" /></td>\n" +
            "                    <td><input type=\"text\" id=\"invUnitPrice\" class=\"invUnitPrice\" style=\"text-align: right\" onkeyup=\"inputNumberFormat(this)\" oninput=\"this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\\..*)\\./g, '$1');\" /></td>\n" +
            "                    <td><input type=\"text\" id=\"estTotAmt\" style=\"text-align: right\" class=\"estTotAmt\" disabled /></td>\n" +
            "                    <td>" +
            "                       <input type=\"text\" id=\"estOfc\" class=\"estOfc\" style='width: 78%'/>" +
            "                       <button type=\"button\" id=\"\" class=\"k-grid-button k-button k-button-md k-button-solid k-button-solid-base\" onclick=\"unRndDP.fn_popCamCrmList()\">" +
            "                           조회" +
            "                       </button>" +
            "                   </td>\n" +
            "                    <td><input type=\"text\" id=\"invEtc\" class=\"invEtc\" /></td>\n" +
            "                    <td style=\"text-align: center;\"><button type=\"button\" id=\"addBtn\" onclick=\"unRndDP.fn_addInv()\" class=\"k-button k-button-solid-base\">추가</button></td>\n" +
            "                </tr>"
        $("#invTable").append(bsHtml);
        customKendo.fn_textBox(["invNm", "invCnt", "invUnit", "invUnitPrice", "estTotAmt", "estOfc", "invEtc"]);

        $("#invCnt, #invUnitPrice").on("keyup", function(){
            $("#estTotAmt").val(comma(uncomma($("#invCnt").val()) * uncomma($("#invUnitPrice").val())))
        });

        $("#addPSActive").css("display", "block");


        var invResult = customKendo.fn_customAjax("/project/getInvList", data);
        var list = invResult.list;
        if(list.length == 0){
            unRndDP.global.invCk = "N";
        }

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
                '       <td><input type="text" id="invUnitPrice'+idx+'" class="invUnitPrice" style="text-align: right" onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" /></td>\n' +
                '       <td><input type="text" id="estTotAmt'+idx+'" style="text-align: right" class="estTotAmt" disabled /></td>\n' +
                '       <td>' +
                '           <input type="text" id="estOfc'+idx+'" class="estOfc" style=\'width: 78%\'/>' +
                '           <button type="button" id="" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="unRndDP.fn_popCamCrmList('+idx+')">\n' +
                '              조회' +
                '           </button>' +
                '       </td>\n' +
                '       <td><input type="text" id="invEtc'+idx+'" class="invEtc" /></td>\n' +
                '       <td style="text-align: center;">' +
                '           <button type="button" id="modBtn" onclick="unRndDP.fn_modInv('+list[i].INV_SN+','+idx+')" class="k-button k-button-solid-primary">수정</button>' +
                '           <button type="button" id="delBtn" onclick="unRndDP.fn_delInv('+idx+')" class="k-button k-button-solid-error">삭제</button>' +
                '       </td>';
            html += '</tr>';
            $("#invTable").append(html);

            customKendo.fn_textBox(["invNm" + idx, "invCnt" + idx , "invUnit" + idx, "invUnitPrice" + idx,
                "estTotAmt" + idx, "estOfc" + idx, "invEtc" + idx]);

            $("#invSn" + idx).val(list[i].INV_SN);
            $("#invNm" + idx).val(list[i].INV_NM);
            $("#invCnt" + idx).val(comma(list[i].INV_CNT));
            $("#invUnit" + idx).val(list[i].INV_UNIT);
            $("#invUnitPrice" + idx).val(comma(list[i].INV_UNIT_PRICE));
            $("#estTotAmt" + idx).val(comma(list[i].EST_TOT_AMT));
            $("#invEtc" + idx).val(list[i].INV_ETC);
            $("#estOfc" + idx).val(list[i].EST_OFC);

            unRndDP.global.invCk = "Y";
        }

        $("#invTable > tr").each(function (e) {
            $("#invCnt" + e + ", #invUnitPrice" + e).on("keyup", function () {
                $("#estTotAmt" + e).val(comma(uncomma($("#invCnt" + e).val()) * uncomma($("#invUnitPrice" + e).val())));
            });
        });


        const developResult = customKendo.fn_customAjax("/project/getDevelopPlan", data);
        const devMap = developResult.rs;
        $("#devSn").val(devMap.DEV_SN);
        $("#devPlanCont").val(devMap.DEP_OBJ);
        $("#devPlanIss").val(devMap.ETC);

        unRndDP.fn_buttonSet(devMap);
    },

    fn_addVersion : function (){
        if(!confirm("수행계획서를 추가하시겠습니까?")){
            return;
        }

        var data = {
            pjtSn : $("#pjtSn").val(),
            empSeq : $("#empSeq").val(),
        }
        var result = customKendo.fn_customAjax("/projectRnd/setDevPjtVer", data);
        commonProject.getReloadPage(3, 2, 2, 0, 0, 0);
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
        if($("#invUnitPrice").val() == ""){
            alert("단가를 입력해주세요.");
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
            invUnitPrice : uncomma($("#invUnitPrice").val()),
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
            '       <td><input type="text" id="invUnitPrice'+idx+'" class="invUnitPrice" value="'+comma(data.invUnitPrice)+'" style="text-align: right" onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');"/></td>\n' +
            '       <td><input type="text" id="estTotAmt'+idx+'" style="text-align: right" value="'+comma(data.estTotAmt)+'" class="estTotAmt" disabled /></td>\n' +
            '       <td>' +
            '           <input type="text" id="estOfc'+idx+'" class="estOfc" value="'+data.estOfc+'"  style=\'width: 78%\'/>' +
            '            <button type="button" id="" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="unRndDP.fn_popCamCrmList('+idx+')">\n' +
            '               조회' +
            '            </button>' +
            '       </td>\n' +
            '       <td><input type="text" id="invEtc'+idx+'" class="invEtc" value="'+data.invEtc+'" /></td>\n' +
            '       <td style="text-align: center;">' +
            '           <button type="button" id="delBtn" onclick="unRndDP.fn_delInv('+idx+')" class="k-button k-button-solid-error">삭제</button>' +
            '       </td>';
        html += '</tr>';

        $("#invTable").append(html);

        customKendo.fn_textBox(["invNm" + idx, "invCnt" + idx , "invUnit" + idx, "invUnitPrice" + idx,
            "estTotAmt" + idx, "estOfc" + idx, "invEtc" + idx]);

        $("#invTable > tr").each(function (e) {
            $("#invCnt" + e + ", #invUnitPrice" + e).on("keyup", function () {
                $("#estTotAmt" + e).val(comma(uncomma($("#invCnt" + e).val()) * uncomma($("#invUnitPrice" + e).val())));
            });
        });


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

                //$("#invAmt002").text(comma(totAmt));

                var data = {
                    devSn : $("#devSn").val(),
                    totAmt : totAmt
                }

                customKendo.fn_customAjax("/project/updPjtDevTotAmt", data);


                $("#estTotAmt").val("");
                $("#invNm").val("");
                $("#invCnt").val("");
                $("#invUnit").val("");
                $("#invUnitPrice").val("");
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
                                    $(this).attr("onclick", "unRndDP.fn_addInv("+idx+")");
                                } else {
                                    $(this).removeAttr("onclick");
                                    $(this).attr("onclick", "unRndDP.fn_delInv("+idx+")");
                                }
                            });

                            var updData = {
                                invSn : $("#invSn" + idx).val(),
                                invRow : idx,
                                invNm : $("#invNm"+idx).val(),
                                invCnt : uncomma($("#invCnt"+idx).val()),
                                invUnit : $("#invUnit"+idx).val(),
                                invUnitPrice : uncomma($("#invUnitPrice"+idx).val()),
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
            alert("저장되었습니다.");
            commonProject.getReloadPage(3, 2, 2, 0, 0, 0);
        }
    },

    fn_buttonSet : function(devMap){
        $(".devInfo").find("textarea").attr("disabled", false);

        console.log("devMap");
        console.log(devMap);
        var buttonHtml = "";
        if(devMap != null){
            var status = devMap.STATUS;

            if(status != "0" && status != "30" && status != "40"){
                $("#psTable").find("button").attr("disabled", "disabled");
                $("#invTable").find("button").attr("disabled", "disabled");
            }

            /** 수주부서 일때 */
            if(status == "0"){
                buttonHtml += "<button type=\"button\" id=\"devDelBtn\" style=\"float: right; margin-bottom: 5px;\" class=\"k-button k-button-solid-error\" onclick=\"devInfo.fn_delete()\">삭제</button>";
                buttonHtml += "<button type=\"button\" id=\"devSaveBtn\" style=\"float: right; margin-right: 5px;\" class=\"k-button k-button-solid-info\" onclick=\"unRndDP.fn_save()\">저장</button>";
                if(unRndDP.global.invCk == "Y") {
                    buttonHtml += "<button type=\"button\" id=\"devAppBtn\" style=\"display: none; float: right; margin-right: 5px;\" class=\"k-button k-button-solid-info\" onclick=\"unRndDP.devDrafting()\">상신</button>";
                }
            }else if(status == "10" || status == "20" || status == "50"){
                buttonHtml += "<button type=\"button\" id=\"devCanBtn\" style=\"float: right; margin-bottom: 10px;\" class=\"k-button k-button-solid-error\" onclick=\"docApprovalRetrieve('"+devMap.DOC_ID+"', '"+devMap.APPRO_KEY+"', 1, 'retrieve');\">회수</button>";
            }else if(status == "30" || status == "40"){
                buttonHtml += "<button type=\"button\" id=\"devDelBtn\" style=\"float: right; margin-bottom: 5px;\" class=\"k-button k-button-solid-error\" onclick=\"devInfo.fn_delete()\">삭제</button>";
                buttonHtml += "<button type=\"button\" id=\"devSaveBtn\" style=\"float: right; margin-right: 5px;\" class=\"k-button k-button-solid-info\" onclick=\"unRndDP.fn_save()\">저장</button>";
                buttonHtml += "<button type=\"button\" id=\"devCanBtn\" style=\"float: right; margin-right: 5px;\" class=\"k-button k-button-solid-error\" onclick=\"tempOrReDraftingPop('"+devMap.DOC_ID+"', '"+devMap.DOC_MENU_CD+"', '"+devMap.APPRO_KEY+"', 2, 'reDrafting');\">재상신</button>";
            }else if(status == "100"){
                buttonHtml += "<button type=\"button\" id=\"devCanBtn\" style=\"float: right; margin-bottom: 10px;\" class=\"k-button k-button-solid-base\" onclick=\"approveDocView('"+devMap.DOC_ID+"', '"+devMap.APPRO_KEY+"', '"+devMap.DOC_MENU_CD+"');\">열람</button>";
                buttonHtml += "<button type=\"button\" id=\"addVerBtn2\" style=\"float: right; margin-bottom: 5px; margin-right: 5px;\" class=\"k-button k-button-solid-base\" onclick=\"unRndDP.fn_addVersion()\">수행계획서 추가</button>";

                /** 현재 버전이 완료 되었을때 버튼 비활성화 */
                devInfo.fn_disabled();
            }else if(status == "111"){
                buttonHtml += "<button type=\"button\" id=\"devTempBtn\" style=\"float: right; margin-bottom: 5px;\" class=\"k-button k-button-solid-base\" onclick=\"tempOrReDraftingPop('"+devMap.DOC_ID+"', 'rndDev', '"+devMap.APPRO_KEY+"', 2, 'tempDrafting');\">전자결재 임시저장 중</button>";
            }else{
                buttonHtml += "<button type=\"button\" id=\"devSaveBtn\" style=\"float: right; margin-bottom: 5px;\" class=\"k-button k-button-solid-info\" onclick=\"unRndDP.fn_save()\">저장</button>";
                buttonHtml += "<button type=\"button\" id=\"addVerBtn2\" style=\"float: right; margin-bottom: 5px; margin-right: 5px;\" class=\"k-button k-button-solid-base\" onclick=\"unRndDP.fn_addVersion()\">수행계획서 추가</button>";
            }

            /** 협업부서 일때 */
            if(commonProject.global.teamStat == "Y"){
                if (status == "0") {
                    if(commonProject.global.devTeamCk != "Y") {
                        if(unRndDP.global.invCk == "Y") {
                            buttonHtml = "<button type=\"button\" id=\"devDelBtn\" style=\"float: right; margin-bottom: 5px;\" class=\"k-button k-button-solid-error\" onclick=\"devInfo.fn_delete()\">삭제</button>";
                            buttonHtml += "<button type=\"button\" id=\"devSaveBtn\" style=\"float: right; margin-right: 5px\" class=\"k-button k-button-solid-info\" onclick=\"unRndDP.fn_save()\">저장</button>";
                            buttonHtml += "<button type=\"button\" id=\"addVerBtn2\" style=\"float: right; margin-bottom: 5px; margin-right: 5px;\" class=\"k-button k-button-solid-base\" onclick=\"unRndDP.fn_addVersion()\">수행계획서 추가</button>";
                            buttonHtml += "<button type=\"button\" id=\"teamAppBtn\" style=\"float: right; margin-right: 5px\" class=\"k-button k-button-solid-info\" onclick=\"unRndDP.fn_teamApp('Y')\">공정 마감</button>";
                        }else{
                            buttonHtml = "<button type=\"button\" id=\"devDelBtn\" style=\"float: right; margin-bottom: 5px;\" class=\"k-button k-button-solid-error\" onclick=\"devInfo.fn_delete()\">삭제</button>";
                            buttonHtml += "<button type=\"button\" id=\"devSaveBtn\" style=\"float: right; margin-right: 5px\" class=\"k-button k-button-solid-info\" onclick=\"unRndDP.fn_save()\">저장</button>";
                        }
                    }else {
                        buttonHtml = "<button type=\"button\" id=\"teamAppBtn\" style=\"float: right; margin-bottom: 10px\" class=\"k-button k-button-solid-error\" onclick=\"unRndDP.fn_teamApp('N')\">마감취소</button>";
                        buttonHtml += '<div style="position: relative; top: 10px; right: 10px"><span style="float: right; color: red; font-size: 12px;">마감되었습니다.</span></div>';

                        /** 현재 버전이 완료 되었을때 버튼 비활성화 */
                        devInfo.fn_disabled();
                    }
                }else{
                    buttonHtml = "<button type=\"button\" id=\"devSaveBtn\" style=\"float: right; margin-bottom: 5px\" class=\"k-button k-button-solid-info\" onclick=\"unRndDP.fn_save()\">저장</button>";
                }
            }
        } else {
            buttonHtml += "<button type=\"button\" id=\"devSaveBtn\" style=\"float: right; margin-bottom: 5px;\" class=\"k-button k-button-solid-info\" onclick=\"unRndDP.fn_save()\">저장</button>";
        }
        $("#devBtnDiv").html(buttonHtml);
    },

    fn_teamApp : function (stat){
        let cfmText = "마감 하시겠습니까?";
        let cfmEndText = "마감처리 되었습니다.";
        if(stat == "N"){
            cfmText = "마감취소 하시겠습니까?";
            cfmEndText = "마감취소처리 되었습니다.";
        }

        if(!confirm(cfmText)){
            return;
        }

        const pjtSn = $("#pjtSn").val();
        const devSn = $("#devSn").val();
        if(devSn == ""){
            alert("데이터 조회 중 오류가 발생하였습니다."); return;
        }

        const data = {
            pjtSn: pjtSn,
            stat: stat
        }
        const result = customKendo.fn_customAjax("/project/setDevTeamApp", data);

        if(result.flag){
            alert(cfmEndText);
            commonProject.getReloadPage(3, 2, 2, 0, 0, 0);
        }
    },

    devDrafting: function() {
        $("#unRndDevDraftFrm").one("submit", function() {
            var url = "/popup/cam_project/approvalFormPopup/unRndDevApprovalPop.do";
            var name = "_self";
            var option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=yes, scrollbars = yes, status=no, top=50, left=50"
            var popup = window.open(url, name, option);
            this.action = "/popup/cam_project/approvalFormPopup/unRndDevApprovalPop.do";
            this.method = 'POST';
            this.target = '_self';
        }).trigger("submit");
    },

    fn_popCamCrmList : function (e){
        if(e != null){
            unRndDP.global.crmIdx = e;
        }

        var url = "/crm/pop/popCrmList.do";
        var name = "_blank";
        var option = "width = 1300, height = 670, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    selCrmInfo :  function(e){
        $("#estOfc" + unRndDP.global.crmIdx).val(e.CRM_NM);
        unRndDP.global.crmIdx = "";
    },

    fn_modInv : function (invSn, row){
        var data = {
            invSn : invSn,
            pjtSn : $("#pjtSn").val(),
            invRow : row,
            invNm : $("#invNm"+row).val(),
            invCnt : uncomma($("#invCnt"+row).val()),
            invUnit : $("#invUnit"+row).val(),
            invUnitPrice : uncomma($("#invUnitPrice"+row).val()),
            estTotAmt : uncomma($("#estTotAmt"+row).val()),
            estOfc : $("#estOfc"+row).val(),
            invEtc : $("#invEtc"+row).val()
        }

        $.ajax({
            url : "/project/updInvestData",
            data : data,
            type : "post",
            dataType : "json",
            success : function (rs){
                if(rs.code == 200){
                    alert("수정하였습니다.");
                }
            }
        });
    },
}