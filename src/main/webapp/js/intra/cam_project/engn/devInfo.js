var devInfo = {

    global: {
        devPjtVerList: [],
        invCk: "N",
        crmIdx : "",
    },

    fn_defaultScript : function (){
        commonProject.setPjtStat();

        var data = {
            pjtSn : $("#pjtSn").val()
        }
        var rs = customKendo.fn_customAjax("/project/getDevPjtVerList", data);
        devInfo.global.devPjtVerList = rs;

        if(commonProject.global.pmEmpSeq != null && commonProject.global.pmEmpSeq != "" && commonProject.global.pmEmpSeq != undefined){
            const userInfo = customKendo.fn_customAjax("/user/getUserInfo", {
                empSeq : commonProject.global.pmEmpSeq
            })

            if(userInfo != null){
                let spot = ""
                if(userInfo.DUTY_NAME != null && userInfo.DUTY_NAME != ""){
                    spot = userInfo.DUTY_NAME;
                }else{
                    spot = userInfo.POSITION_NAME;
                }
                $("#pm").val("["+userInfo.DEPT_NAME+"] "+userInfo.EMP_NAME_KR+" ("+spot+")");
            }
        }

        var html = "";
        for(var i = 0 ; i < rs.list.length ; i++){
            var date = new Date(rs.list[i].CONSULT_DT);
            var yyyy = date.getFullYear();
            var mm = date.getMonth()+1;
            mm = mm >= 10 ? mm : '0'+mm;	// 10 보다 작으면 0을 앞에 붙여주기 ex) 3 > 03
            var dd = date.getDate();
            dd = dd >= 10 ? dd : '0'+dd;	// 10 보다 작으면 9을 앞에 붙여주기 ex) 9 > 09
            var sdfDate = yyyy+'년 '+mm+'월 '+dd+'일';


            var pjtStepNm = "상담";
            if(rs.list[i].PJT_STEP == "E0"){
                pjtStepNm = "상담";
            } else if(rs.list[i].PJT_STEP == "E1"){
                pjtStepNm = "견적";
            } else if(rs.list[i].PJT_STEP == "E2"){
                pjtStepNm = "수주";
            } else if(rs.list[i].PJT_STEP == "E3"){
                pjtStepNm = "개발계획";
            } else if(rs.list[i].PJT_STEP == "E4"){
                pjtStepNm = "공정";
            } else if(rs.list[i].PJT_STEP == "E5"){
                pjtStepNm = "납품";
            } else if(rs.list[i].PJT_STEP == "E6"){
                pjtStepNm = "결과보고";
            } else if(rs.list[i].PJT_STEP == "E7"){
                pjtStepNm = "원가보고";
            }

            var invAmt = rs.list[i].INV_AMT == null ? 0 : rs.list[i].INV_AMT;
            var docNo = rs.list[i].DOC_NO == null ? "" : rs.list[i].DOC_NO;
            if(rs.list[i].PJT_STEP == "E2"){
                pjtStepNm = "";
            } else {
                if(rs.list[i].STATUS == "100"){
                    pjtStepNm += " 완료";
                } else {
                    pjtStepNm += " 진행중";
                }
            }
            html += "<tr style='text-align: center'>";
            html += "   <td><span style='font-weight: bold; cursor: pointer' onclick='devInfo.fn_setVersion("+rs.list[i].DEV_SN+")'>Ver."+(i+1)+"</span></td>";
            html += "   <td>"+ docNo +"</td>";
            html += "   <td>"+ sdfDate +"</td>";
            html += "   <td id='invAmt002'>"+comma(invAmt)+"</td>";
            html += "   <td>"+rs.list[i].PM+"</td>";
            html += "   <td></td>";
            html += "   <td>"+pjtStepNm+"</td>";
            html += "</tr>";
        }

        $("#verTable").append(html);

        $("#devDelvAmt").val(comma($("#devDelvAmt").val()));

        if(commonProject.global.teamStat == "Y"){
            $("#realText").text("협업부서 잔액");
            $("#realAmt").val($("#devDelvAmt").val());
        }else{
            if(commonProject.global.teamYn == "N"){
                $("#realAmt").val($("#devDelvAmt").val());
            }else{
                const teamResult = customKendo.fn_customAjax("/project/getTeamInfo", {pjtSn: $("#pjtSn").val()});
                const team = teamResult.map;
                if(team != null){
                    $("#realAmt").val(
                        comma(Number(uncomma($("#devDelvAmt").val())) - Number(team.TM_AMT == null ? 0 : team.TM_AMT))
                    );
                }else{
                    $("#realAmt").val($("#devDelvAmt").val());
                }
            }
        }

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

        customKendo.fn_textBox(["prepList", "psNm", "psEmpNm"]);
        customKendo.fn_datePicker("psStrDe", "depth", "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("psEndDe", "depth", "yyyy-MM-dd", new Date());

        customKendo.fn_textBox(["invNm", "invCnt", "invUnit", "invUnitPrice", "estTotAmt", "estOfc", "invEtc", "devPjtNm",
                                "devCrmInfo", "pm", "estDe", "devDelvAmt", "invAmt", "realAmt", "marginAmt"]);
        $("#divNm").kendoDropDownList({
            dataSource : [
                {text : "구매", value : "1"},
            ],
            dataTextField : "text",
            dataValueField : "value"
        });

        $("#depObj, #devEtc").kendoTextArea({
            rows : 5,
        });

        devInfo.fn_setVersion(devInfo.global.devPjtVerList.list[devInfo.global.devPjtVerList.list.length-1].DEV_SN);
    },

    fn_setVersion : function (key){
        devInfo.fn_setData(key);

        if(devInfo.global.appCk == "Y"){
            $("#devAppBtn").show();
        }
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

            if(commonProject.global.teamStat == "Y"){
                window.location.href="/project/pop/viewRegProject.do?pjtSn=" + data.pjtSn + "&tab=1";
            }else{
                window.location.href="/project/pop/viewRegProject.do?pjtSn=" + data.pjtSn + "&tab=3";
            }
        }
    },

    fn_setData : function (key){
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

                        devInfo.global.appCk = "Y";
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

                    devInfo.global.appCk = "N";
                }

            }
        });


        $.ajax({
            url : "/project/getInvList",
            data : data,
            type : "post",
            async : false,
            dataType : "json",
            success : function(rs){

                var list = rs.list;

                
                $("#invTable").html("");
                if(list.length != 0){

                    var html = "";
                    html += '<tr id="itr">';
                    html += '   <td style="text-align: center"><span style="position: relative; top:5px"></span></td>' +
                        '       <td>' +
                        '           <input type="text" id="divNm" class="divNm" />' +
                        '           <span>' +
                        '               <input type="hidden" id="invSn" class="invSn" />' +
                        '           </span>' +
                        '       </td>' +
                        '       <td><input type="text" id="invNm" class="invNm" /></td>' +
                        '       <td><input type="text" id="invCnt" class="invCnt" style="text-align: right" onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" /></td>' +
                        '       <td><input type="text" id="invUnit" class="invUnit" /></td>' +
                        '       <td><input type="text" id="invUnitPrice" class="invUnitPrice" style="text-align: right" onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" /></td>\n' +
                        '       <td><input type="text" id="estTotAmt" style="text-align: right" class="estTotAmt" disabled/></td>' +
                        '       <td>' +
                        '           <input type="text" id="estOfc" class="estOfc" style="width: 78%"/>' +
                        '           <button type="button" id="" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="devInfo.fn_popCamCrmList()">\n' +
                        '              조회' +
                        '           </button>' +
                        '       </td>' +
                        '       <td><input type="text" id="invEtc" class="invEtc" /></td>' +
                        '       <td style="text-align: center;"><button type="button" id="addBtn" onclick="devInfo.fn_addInv()" class="k-button k-button-solid-base">추가</button></td>';
                    html += '</tr>';
                    $("#invTable").append(html);


                    customKendo.fn_textBox(["invNm" , "invCnt"  , "invUnit" , "invUnitPrice" ,
                        "estTotAmt" , "estOfc" , "invEtc" ]);

                    $("#invCnt, #invUnitPrice").on("keyup", function(){
                        $("#estTotAmt").val(comma(uncomma($("#invCnt").val()) * uncomma($("#invUnitPrice").val())))
                    });

                    $("#divNm").kendoDropDownList({
                        dataSource : [
                            {text : "구매", value : "1"},
                        ],
                        dataTextField : "text",
                        dataValueField : "value"
                    });

                    for(var i = 0 ; i < list.length ; i++){
                        var idx = i+1;
                        var html = "";
                        html += '<tr id="itr'+idx+'">';
                        html += '   <td style="text-align: center"><span style="position: relative; top:5px">'+idx+'</span></td>' +
                            '       <td>\n' +
                            '           <input type="text" id="divNm'+idx+'" class="divNm" />\n' +
                            '           <span>\n' +
                            '               <input type="hidden" id="invSn'+idx+'" class="invSn" />\n' +
                            '           </span>\n' +
                            '       </td>\n' +
                            '       <td><input type="text" id="invNm'+idx+'" class="invNm" /></td>\n' +
                            '       <td><input type="text" id="invCnt'+idx+'" class="invCnt" style="text-align: right" onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" /></td>\n' +
                            '       <td><input type="text" id="invUnit'+idx+'" class="invUnit" /></td>\n' +
                            '       <td><input type="text" id="invUnitPrice'+idx+'" class="invUnitPrice" style="text-align: right" onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" /></td>\n' +
                            '       <td><input type="text" id="estTotAmt'+idx+'" style="text-align: right" class="estTotAmt" disabled /></td>\n' +
                            '       <td>' +
                            '           <input type="text" id="estOfc'+idx+'" class="estOfc" style="width: 78%"/>' +
                            '           <button type="button" id="" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="devInfo.fn_popCamCrmList('+idx+')">\n' +
                            '              조회' +
                            '           </button>' +
                            '       </td>\n' +
                            '       <td><input type="text" id="invEtc'+idx+'" class="invEtc" /></td>\n' +
                            '       <td style="text-align: center;">' +
                            '           <button type="button" id="modBtn" onclick="devInfo.fn_modInv('+list[i].INV_SN+','+idx+')" class="k-button k-button-solid-primary">수정</button>' +
                            '           <button type="button" id="delBtn" style="maring-left: 5px;" onclick="devInfo.fn_delInv('+idx+')" class="k-button k-button-solid-error">삭제</button>' +
                            '       </td>';
                        html += '</tr>';
                        $("#invTable").append(html);


                        customKendo.fn_textBox(["invNm" + idx, "invCnt" + idx , "invUnit" + idx, "invUnitPrice" + idx,
                            "estTotAmt" + idx, "estOfc" + idx, "invEtc" + idx]);
                        $("#divNm"+ idx).kendoDropDownList({
                            dataSource : [
                                {text : "구매", value : "1"},
                            ],
                            dataTextField : "text",
                            dataValueField : "value"
                        });

                        $("#divNm" + idx).data("kendoDropDownList").value(list[i].DIV_SN);
                        $("#invSn" + idx).val(list[i].INV_SN);

                        $("#invNm" + idx).val(list[i].INV_NM);
                        $("#invCnt" + idx).val(comma(list[i].INV_CNT));
                        $("#invUnit" + idx).val(list[i].INV_UNIT);
                        $("#invUnitPrice" + idx).val(comma(list[i].INV_UNIT_PRICE));
                        $("#estTotAmt" + idx).val(comma(list[i].EST_TOT_AMT));
                        $("#invEtc" + idx).val(list[i].INV_ETC);

                        $("#estOfc" + idx).val(list[i].EST_OFC);
                    }

                    var idx = 0;
                    var totAmt = 0;
                    $("#invTable > tr").each(function(e){
                        idx++;
                        totAmt += Number(uncomma($("#estTotAmt" + idx).val()));

                        $("#invCnt" + e + ", #invUnitPrice" + e).on("keyup", function () {
                            $("#estTotAmt" + e).val(comma(uncomma($("#invCnt" + e).val()) * uncomma($("#invUnitPrice" + e).val())));
                        });
                    });

                    $("#invAmt").val(comma(totAmt));

                    /*var invPer = 0;*/


                    /*$("#invPer").val(Math.round(Number( totAmt / uncomma($("#devDelvAmt").val()) * 100)));*/
                    devInfo.global.invCk = "Y";
                } else {
                    var html = "";
                    html += '<tr id="itr">';
                    html += '   <td style="text-align: center"><span style="position: relative; top:5px"></span></td>' +
                        '       <td>' +
                        '           <input type="text" id="divNm" class="divNm" />' +
                        '           <span>' +
                        '               <input type="hidden" id="invSn" class="invSn" />' +
                        '           </span>' +
                        '       </td>' +
                        '       <td><input type="text" id="invNm" class="invNm" /></td>' +
                        '       <td><input type="text" id="invCnt" class="invCnt" style="text-align: right" onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" /></td>' +
                        '       <td><input type="text" id="invUnit" class="invUnit" /></td>' +
                        '       <td><input type="text" id="invUnitPrice" class="invUnitPrice" style="text-align: right" onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" /></td>\n' +
                        '       <td><input type="text" id="estTotAmt" style="text-align: right" class="estTotAmt" disabled/></td>' +
                        '       <td>' +
                        '           <input type="text" id="estOfc" class="estOfc" style="width: 78%" />' +
                        '           <button type="button" id="" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="devInfo.fn_popCamCrmList()">\n' +
                        '              조회' +
                        '           </button>' +
                        '       </td>' +
                        '       <td><input type="text" id="invEtc" class="invEtc" /></td>' +
                        '       <td style="text-align: center;"><button type="button" id="addBtn" onclick="devInfo.fn_addInv()" class="k-button k-button-solid-base">추가</button></td>';
                    html += '</tr>';
                    $("#invTable").append(html);


                    customKendo.fn_textBox(["invNm" , "invCnt"  , "invUnit" , "invUnitPrice" ,
                        "estTotAmt" , "estOfc" , "invEtc" ]);

                    $("#invCnt, #invUnitPrice").on("keyup", function(){
                        $("#estTotAmt").val(comma(uncomma($("#invCnt").val()) * uncomma($("#invUnitPrice").val())))
                    });

                    $("#divNm").kendoDropDownList({
                        dataSource : [
                            {text : "구매", value : "1"},
                        ],
                        dataTextField : "text",
                        dataValueField : "value"
                    });
                    devInfo.global.invCk = "N";

                }

            }
        });

        const developResult = customKendo.fn_customAjax("/project/getDevelopPlan", data);
        const devMap = developResult.rs;
        if(devMap != null){
            $("#devSn").val(devMap.DEV_SN);
            $("#depObj").val(devMap.DEP_OBJ);
            $("#devEtc").val(devMap.ETC);
        }
        devInfo.fn_setButton(devMap);

        /** 예상수익 */
        if($("#invAmt").val() != ""){
            $("#marginAmt").val(comma(Number(uncomma($("#realAmt").val())) - Number(uncomma($("#invAmt").val()))));
        }else{
            $("#marginAmt").val(comma(Number(uncomma($("#realAmt").val())) - 0));
        }
    },

    fn_setButton : function(devMap){
        $(".devInfo").find("textarea").attr("disabled", false);
        var buttonHtml = "";
        if(devMap != null) {
            var status = devMap.STATUS;
            
            /** 수주부서 일때 */
            if (status == "0") {
                buttonHtml += "<button type=\"button\" id=\"devDelBtn\" style=\"float: right; margin-bottom: 5px;\" class=\"k-button k-button-solid-error\" onclick=\"devInfo.fn_delete()\">삭제</button>";
                buttonHtml += "<button type=\"button\" id=\"devSaveBtn\" style=\"float: right; margin-right: 5px;\" class=\"k-button k-button-solid-info\" onclick=\"devInfo.fn_save()\">저장</button>";
                buttonHtml += "<button type=\"button\" id=\"devAppBtn\" style=\"display: none; float: right; margin-right: 5px;\" class=\"k-button k-button-solid-info\" onclick=\"devInfo.devDrafting()\">상신</button>";
            } else if (status == "10" || status == "20" || status == "50") {
                buttonHtml += "<button type=\"button\" id=\"devCanBtn\" style=\"float: right; margin-bottom: 10px;\" class=\"k-button k-button-solid-error\" onclick=\"docApprovalRetrieve('" + devMap.DOC_ID + "', '" + devMap.APPRO_KEY + "', 1, 'retrieve');\">회수</button>";
            } else if (status == "30" || status == "40") {
                buttonHtml += "<button type=\"button\" id=\"devDelBtn\" style=\"float: right; margin-bottom: 5px;\" class=\"k-button k-button-solid-error\" onclick=\"devInfo.fn_delete()\">삭제</button>";
                buttonHtml += "<button type=\"button\" id=\"devSaveBtn\" style=\"float: right; margin-right: 5px;\" class=\"k-button k-button-solid-info\" onclick=\"openModal()\">저장</button>";
                buttonHtml += "<button type=\"button\" id=\"devCanBtn\" style=\"float: right; margin-right: 5px;\" class=\"k-button k-button-solid-error\" onclick=\"tempOrReDraftingPop('" + devMap.DOC_ID + "', '" + devMap.DOC_MENU_CD + "', '" + devMap.APPRO_KEY + "', 2, 'reDrafting');\">재상신</button>";

            } else if (status == "100") {
                buttonHtml += "<button type=\"button\" id=\"devCanBtn\" style=\"float: right; margin-bottom: 10px;\" class=\"k-button k-button-solid-base\" onclick=\"approveDocView('" + devMap.DOC_ID + "', '" + devMap.APPRO_KEY + "', '" + devMap.DOC_MENU_CD + "');\">열람</button>";
                buttonHtml += "<button type=\"button\" id=\"devAddBtn\" style=\"float: right; margin-right: 5px\" class=\"k-button k-button-solid-info\" onclick=\"devInfo.fn_addVersion()\">추가</button>";

                /** 현재 버전이 완료 되었을때 버튼 비활성화 */
                devInfo.fn_disabled();
            } else {
                buttonHtml += "<button type=\"button\" id=\"devSaveBtn\" style=\"float: right; margin-bottom: 5px;\" class=\"k-button k-button-solid-info\" onclick=\"devInfo.fn_save()\">저장</button>";
            }

            /** 협업부서 일때 */
            if(commonProject.global.teamStat == "Y"){
                if (status == "0") {
                    if(commonProject.global.devTeamCk != "Y") {
                        if(devInfo.global.invCk == "Y") {
                            buttonHtml = "<button type=\"button\" id=\"devDelBtn\" style=\"float: right; margin-bottom: 5px;\" class=\"k-button k-button-solid-error\" onclick=\"devInfo.fn_delete()\">삭제</button>";
                            buttonHtml += "<button type=\"button\" id=\"devSaveBtn\" style=\"float: right; margin-right: 5px\" class=\"k-button k-button-solid-info\" onclick=\"devInfo.fn_save()\">저장</button>";
                            buttonHtml += "<button type=\"button\" id=\"devAddBtn\" style=\"float: right; margin-right: 5px\" class=\"k-button k-button-solid-info\" onclick=\"devInfo.fn_addVersion()\">추가</button>";
                            buttonHtml += "<button type=\"button\" id=\"teamAppBtn\" style=\"float: right; margin-right: 5px\" class=\"k-button k-button-solid-info\" onclick=\"devInfo.fn_teamApp('Y')\">공정 마감</button>";
                        }else{
                            buttonHtml = "<button type=\"button\" id=\"devDelBtn\" style=\"float: right; margin-bottom: 5px;\" class=\"k-button k-button-solid-error\" onclick=\"devInfo.fn_delete()\">삭제</button>";
                            buttonHtml += "<button type=\"button\" id=\"devSaveBtn\" style=\"float: right; margin-right: 5px\" class=\"k-button k-button-solid-info\" onclick=\"devInfo.fn_save()\">저장</button>";
                        }
                    }else {
                        buttonHtml = "<button type=\"button\" id=\"teamAppBtn\" style=\"float: right; margin-bottom: 10px\" class=\"k-button k-button-solid-error\" onclick=\"devInfo.fn_teamApp('N')\">마감취소</button>";
                        buttonHtml += '<div style="position: relative; top: 10px; right: 10px"><span style="float: right; color: red; font-size: 12px;">마감되었습니다.</span></div>';
                    }
                }else{
                    buttonHtml = "<button type=\"button\" id=\"devSaveBtn\" style=\"float: right; margin-bottom: 5px\" class=\"k-button k-button-solid-info\" onclick=\"devInfo.fn_save()\">저장</button>";
                }
            }
        } else {
            buttonHtml += "<button type=\"button\" id=\"devSaveBtn\" style=\"float: right; margin-bottom: 5px;\" class=\"k-button k-button-solid-info\" onclick=\"devInfo.fn_save()\">저장</button>";
        }
        $("#devBtnDiv").html(buttonHtml);
    },

    fn_delRow : function(i){

        if(!confirm("삭제하시겠습니까?")){
            return ;
        }

        var data = {
            psSn : $("#psSn" + i).val()
        }

        $.ajax({
            url : "/project/delProcess",
            data : data,
            type : "post",
            async : false,
            dataType : "json",
            success:function (rs){
                if(rs.code == 200){
                    $("#tr" + i).remove();

                    $("#psTable > tr").each(function (idx){
                        if(idx != 0){
                            $(this).removeAttr("id");
                            $(this).attr("id", "tr" + idx);

                            $(this).children("td").first().html('<span style=\"position: relative; top:5px\">'+(idx)+'</span>');
                            $(this).children("td").each(function(){
                                $("#tr"+idx+" > td > span > input").each(function(){
                                    $(this).removeAttr("id");
                                    $(this).attr("id", $(this).attr("class").split(" ")[0] + idx);
                                });
                            });

                            $(this).children("td").last().children("button").each(function(x){
                                if(x == 0){
                                    $(this).removeAttr("onclick");
                                    $(this).attr("onclick", "devInfo.fn_delRow("+idx+")");
                                } else if (x == 1){
                                    $(this).removeAttr("onclick");
                                    $(this).attr("onclick", "fn_userMultiSelectPop("+idx+")");
                                } else {
                                    $(this).removeAttr("onclick");
                                    $(this).attr("onclick", "devInfo.fn_delRow("+idx+")");
                                }
                            });

                            var updData = {
                                psSn : $("#psSn" + idx).val(),
                                psRow : idx,
                                psPrep : $("#prepList"+idx).val(),
                                psPrepNm : $("#prepList"+idx).data("kendoDropDownList").text(),
                                psNm : $("#psNm"+idx).val(),
                                psStrDe : $("#psStrDe"+idx).val(),
                                psEndDe : $("#psEndDe"+idx).val(),
                                psEmpSeq : $("#psEmpSeq"+idx).val(),
                                psEmpNm : $("#psEmpNm"+idx).val()
                            }

                            $.ajax({
                                url : "/project/updProcess",
                                data : updData,
                                type : "post",
                                dataType : "json",
                                async : false,
                                success : function(rs){
                                    if(rs.code == 200){

                                    }
                                }
                            });
                        }
                    });
                    alert("삭제하였습니다.");
                }
            }
        });
    },

    fn_addVersion : function (){
        if(!confirm("수행계획을 추가하시겠습니까?")){
            return;
        }

        var data = {
            pjtSn : $("#pjtSn").val(),
            empSeq : $("#empSeq").val()
        }
        var result = customKendo.fn_customAjax("/project/addDevVersion", data);

        if(result.flag){
            if(commonProject.global.teamStat == "Y"){
                window.location.href="/project/pop/viewRegProject.do?pjtSn=" + data.pjtSn + "&tab=1";
            }else{
                window.location.href="/project/pop/viewRegProject.do?pjtSn=" + data.pjtSn + "&tab=3";
            }
        }

    },

    fn_modProcess : function(psSn, i){
        if($("#psEmpSeq" + i).val() == ""){
            alert("담당자를 지정해주세요.");
            return ;
        }

        if($("#prepList" + i).val() == ""){
            alert("구분값을 선택해주세요.");
            return ;
        }
        if($("#psNm" + i).val() == ""){
            alert("공정명을 입력해주세요.");
            return ;
        }


        var inputData = {
            psPrep : $("#prepList" + i).val(),
            psPrepNm : $("#prepList" + i).data("kendoDropDownList").text(),
            psNm : $("#psNm" + i).val(),
            psStrDe : $("#psStrDe" + i).val(),
            psEndDe : $("#psEndDe" + i).val(),
            psEmpSeq : $("#psEmpSeq" + i).val(),
            psEmpNm : $("#psEmpNm" + i).val(),
            psSn : psSn
        }

        $.ajax({
            url : "/project/modProcessData",
            data : inputData,
            type : "post",
            dataType : "json",
            async : false,
            success : function(rs){
                if(rs.code == 200){
                    alert("수정되었습니다.");
                }
            }
        });
    },

    fn_addProcess: function (t){

        if(t != "d"){
            if(!confirm("공정을 추가하시겠습니까?")){
                return ;
            }
        }
        

        if($("#psEmpSeq").val() == ""){
            alert("담당자를 지정해주세요.");
            return ;
        }

        var idx = 0;
        $("#psTable > tr").each(function(e){
            idx = e + 1;
        });

        if($("#prepList").val() == ""){
            alert("구분값을 선택해주세요.");
            return ;
        }
        if($("#psNm").val() == ""){
            alert("공정명을 입력해주세요.");
            return ;
        }


        var inputData = {
            psPrep : $("#prepList").val(),
            psPrepNm : $("#prepList").data("kendoDropDownList").text(),
            psNm : $("#psNm").val(),
            psStrDe : $("#psStrDe").val(),
            psEndDe : $("#psEndDe").val(),
            psEmpSeq : $("#psEmpSeq").val(),
            psEmpNm : $("#psEmpNm").val()
        }


        var html = "";
        html += '<tr id="tr'+idx+'">';
        html += '   <td style="text-align: center"><span style="position: relative; top:5px">'+idx+'</span></td>';
        html += '   <td><input type="text" class="prepList" id="prepList'+idx+'" /></td>';
        html += '   <td>' +
            '           <input type="text" class="psNm" id="psNm'+idx+'" />' +
            '           <span><input type="hidden" class="psSn" id="psSn'+idx+'" value=""/></span>' +
            '       </td>';
        html += '   <td style="text-align: center"><input type="text" class="psStrDe" id="psStrDe'+idx+'" value="'+inputData.psEndDe+'" style="width: 45%" />~<input type="text" class="psEndDe" style="width: 45%" id="psEndDe'+idx+'" value="'+inputData.psEndDe+'" /></td>';
        html += '   <td><input type="text" id="psEmpNm'+idx+'" value="'+inputData.psEmpNm+'" disabled /><input type="hidden" id="psEmpSeq'+idx+'" value="'+inputData.psEmpSeq+'" /></td>';
        html += '   <td style="text-align: center">';
        html += '       <button type="button" onclick="devInfo.fn_delRow('+idx+')" class="k-button k-button-solid-error btn'+idx+'">삭제</button>';
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

        $("#prepList" + idx).data("kendoDropDownList").value($("#prepList").val());
        $("#psNm" + idx).kendoTextBox();
        customKendo.fn_datePicker("psStrDe" + idx, "depth", "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("psEndDe" + idx, "depth", "yyyy-MM-dd", new Date());
        $("#psEmpNm" + idx).kendoTextBox();

        $("#psStrDe" + idx).val($("#psStrDe").val());
        $("#psEndDe" + idx).val($("#psEndDe").val());

        $("#psNm" + idx).val($("#psNm").val());

        var data = {
            psRow : idx,
            pjtSn : $("#pjtSn").val(),
            psPrep : $("#prepList"+idx).val(),
            psPrepNm : $("#prepList"+idx).data("kendoDropDownList").text(),
            psNm : $("#psNm"+idx).val(),
            psStrDe : $("#psStrDe"+idx).val(),
            psEndDe : $("#psEndDe"+idx).val(),
            psEmpSeq : $("#psEmpSeq").val(),
            psEmpNm : $("#psEmpNm").val(),
            regEmpSeq : $("#regEmpSeq").val()
        }

        if($("#devSn").val() != ""){
            data.devSn = $("#devSn").val();
        }

        $.ajax({
            url : "/project/insPjtPs",
            data : data,
            dataType : "json",
            type : "post",
            success : function(rs){
                if(rs.code == 200){
                    $("#psSn" + idx).val(rs.rep.PS_SN);

                    $("#psEmpSeq").val("");
                    $("#psEmpNm").val("");
                    $("#psNm").val("");
                    $("#prepList").data("kendoDropDownList").select(0);
                }
            }
        });
    },

    fn_addInv : function(){
        if(!confirm("예상비용을 추가하시겠습니까?")){
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
        if($("#estOfc").val() == ""){
            alert("견적처를 입력해주세요.");
            return ;
        }


        var data = {
            divCd : $("#divNm").val(),
            invRow : idx,
            divNm : $("#divNm").data("kendoDropDownList").text(),
            invNm : $("#invNm").val(),
            invCnt : uncomma($("#invCnt").val()),
            invUnit : $("#invUnit").val(),
            invUnitPrice : uncomma($("#invUnitPrice").val()),
            estTotAmt : uncomma($("#estTotAmt").val()),
            estOfc : $("#estOfc").val(),
            invEtc : $("#invEtc").val(),
            pjtSn : $("#pjtSn").val(),
            denSn : $("#denSn").val(),
            regEmpSeq : $("#regEmpSeq").val()
        }


        var html = "";
        html += '<tr id="itr'+idx+'">';
        html += '   <td style="text-align: center"><span style="position: relative; top:5px">'+idx+'</span></td>' +

            '       <td>\n' +
            '           <input type="text" id="divNm'+idx+'" class="divNm" />\n' +
            '           <span>\n' +
            '               <input type="hidden" id="invSn'+idx+'" class="invSn" />\n' +
            '           </span>\n' +
            '       </td>\n' +
            '       <td><input type="text" id="invNm'+idx+'" class="invNm" value="'+data.invNm+'" /></td>\n' +
            '       <td><input type="text" id="invCnt'+idx+'" class="invCnt" value="'+comma(data.invCnt)+'" style="text-align: right" onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" /></td>\n' +
            '       <td><input type="text" id="invUnit'+idx+'" class="invUnit" value="'+data.invUnit+'" /></td>\n' +
            '       <td><input type="text" id="invUnitPrice'+idx+'" class="invUnitPrice" value="'+comma(data.invUnitPrice)+'" style="text-align: right" onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');"/></td>\n' +
            '       <td><input type="text" id="estTotAmt'+idx+'" style="text-align: right" value="'+comma(data.estTotAmt)+'" class="estTotAmt" disabled/></td>\n' +
            '       <td>' +
            '           <input type="text" id="estOfc'+idx+'" class="estOfc" value="'+data.estOfc+'" style="width: 78%"/>' +
            '            <button type="button" id="" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="devInfo.fn_popCamCrmList('+idx+')">\n' +
            '               조회' +
            '            </button>' +
            '       </td>\n' +
            '       <td><input type="text" id="invEtc'+idx+'" class="invEtc" value="'+data.invEtc+'" /></td>\n' +
            '       <td style="text-align: center;">' +
            '           <button type="button" id="delBtn" onclick="devInfo.fn_delInv('+idx+')" class="k-button k-button-solid-error">삭제</button>' +
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

        $("#divNm"+ idx).kendoDropDownList({
            dataSource : [
                {text : "구매", value : "1"},
            ],
            dataTextField : "text",
            dataValueField : "value"
        });

        $("#divNm" + idx).data("kendoDropDownList").value($("#divNm").val());


        $.ajax({
            url : "/project/insInvData",
            data : data,
            dataType : "json",
            type : "post",
            success : function(rs){
                var idx = 0;
                var totAmt = 0;
                $("#invTable > tr").each(function(e){
                    idx++;
                    totAmt += Number(uncomma($("#estTotAmt" + idx).val()));
                });

                if(rs.code == 200){
                    $("#invSn" + idx).val(rs.rep.INV_SN);
                    $("#invAmt").val(comma(totAmt));
                    /*$("#invPer").val(Math.round(totAmt / uncomma($("#devDelvAmt").val()) * 100));*/
                }


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

    fn_save: function (){
        if($("#invAmt").val() == ""){alert("예상비용을 입력해주세요."); return;}

        if(!confirm("저장하시겠습니까?")){return;}

        var data= {
            invAmt : uncomma($("#invAmt").val()),
            /*invPer : $("#invPer").val(),*/
            depObj : $("#depObj").val(),
            etc : $("#devEtc").val(),
            pjtSn : $("#pjtSn").val(),
            regEmpSeq : $("#empSeq").val(),

            step : $("#step").val(),
            stepColumn : $("#stepColumn").val(),
            nextStepColumn : $("#nextStepColumn").val(),
            stepValue : $("#stepValue").val(),
            nextStepValue : $("#nextStepValue").val(),
            engnSn : $("#engnSn").val()
        }

        var fd = new FormData();
        fd.append("invAmt", data.invAmt);
        /*fd.append("invPer", data.invPer);*/
        fd.append("depObj", data.depObj);
        fd.append("etc", data.etc);
        fd.append("pjtSn", data.pjtSn);
        fd.append("regEmpSeq", data.regEmpSeq);
        fd.append("empSeq", data.regEmpSeq);
        fd.append("step", data.step);
        fd.append("stepColumn", data.stepColumn);
        fd.append("nextStepColumn", data.nextStepColumn);
        fd.append("stepValue", data.stepValue);
        fd.append("nextStepValue", data.nextStepValue);
        fd.append("engnSn", data.engnSn);

        $.ajax({
            url : "/project/engn/setDevInfo",
            data : fd,
            type : "post",
            dataType : "json",
            contentType: false,
            processData: false,
            enctype : 'multipart/form-data',
            async : false,
            success : function (rs){
                if(rs.code == 200){
                    opener.parent.gridReload();

                    var sum = 0;
                    $(".estTotAmt").each(function(){
                        if(this.value != ""){
                            sum += Number(uncomma($(this).val()));
                        }
                    });

                    $("#invAmt002").text(comma(sum));
                    devInfo.fn_saveInv();

                }
            }
        });

        alert("저장되었습니다.");
        if(commonProject.global.teamStat == "Y"){
            window.location.href="/project/pop/viewRegProject.do?pjtSn=" + $("#pjtSn").val() + "&tab=1";
        }else{
            window.location.href="/project/pop/viewRegProject.do?pjtSn=" + $("#pjtSn").val() + "&tab=3";
        }

    },

    fn_delete : function (){
        if(!confirm("정말 삭제하시겠습니까?")){return;}

        if($("#devSn").val() == ""){
            alert("잘못된 접근입니다. 버전을 선택하여 주십시오."); return;
        }
        var data= {
            devSn : $("#devSn").val(),
        }

        var fd = new FormData();
        fd.append("devSn", data.devSn);

        $.ajax({
            url : "/project/setDevInfoDel",
            data : fd,
            type : "post",
            dataType : "json",
            contentType: false,
            processData: false,
            enctype : 'multipart/form-data',
            async : false,
            success : function (rs){
                if(rs.code == 200){
                    alert("삭제되었습니다.");
                    commonProject.getReloadPage(3, 3, 3, 1, 0, 0);

                }else{
                    alert("데이터 삭제 중 오류가 발생하였습니다.");
                }
            }
        });
    },

    fn_saveInv : function (){
        var invLength = $("#invTable > tr").length;

        if(invLength != 1) {
            for(var row = 1 ; row < invLength ; row++){
                var data = {
                    invSn : $("#invSn" + row).val(),
                    pjtSn : $("#pjtSn").val(),
                    invRow : row,
                    divCd : $("#divNm"+row).val(),
                    divNm : $("#divNm"+row).data("kendoDropDownList").text(),
                    invNm : $("#invNm"+row).val(),
                    invCnt : uncomma($("#invCnt"+row).val()),
                    invUnit : $("#invUnit"+row).val(),
                    invUnitPrice : uncomma($("#invUnitPrice"+row).val()),
                    estTotAmt : uncomma($("#estTotAmt"+row).val()),
                    estOfc : $("#estOfc"+row).val(),
                    invEtc : $("#invEtc"+row).val()
                }

                $.ajax({
                    url : "/project/updInvest",
                    data : data,
                    type : "post",
                    dataType : "json",
                    success : function (rs){
                        var idx = 0;
                        var totAmt = 0;
                        $("#invTable > tr").each(function(e){
                            idx++;
                            totAmt += Number(uncomma($("#estTotAmt" + idx).val()));
                            /*$("#invPer").val(Math.round(totAmt / uncomma($("#devDelvAmt").val()) * 100));*/
                        });

                        if(rs.code = 200){
                            $("#invAmt").val(comma(totAmt));
                        }
                    }
                });
            }
        }
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
                                    $(this).attr("onclick", "devInfo.fn_saveInv("+idx+")");
                                } else {
                                    $(this).removeAttr("onclick");
                                    $(this).attr("onclick", "devInfo.fn_delInv("+idx+")");
                                }
                            });

                            var updData = {
                                invSn : $("#invSn" + idx).val(),
                                invRow : idx,
                                divCd : $("#divNm"+idx).val(),
                                divNm : $("#divNm"+idx).data("kendoDropDownList").text(),
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

                    if(rs.code = 200){
                        $("#invAmt").val(comma(totAmt));
                        /*$("#invPer").val(Math.round(totAmt / uncomma($("#devDelvAmt").val()) * 100));*/
                    }

                }
            }
        });
    },

    devDrafting: function() {
        if(commonProject.global.teamStat == "N"){
            if(commonProject.global.teamYn != "N" && commonProject.global.devTeamCk == "N"){
                alert("협업 계획서 마감처리가 진행되지 않았습니다."); return;
            }
        }
        $("#devDraftFrm").one("submit", function() {
            var url = "/popup/cam_project/approvalFormPopup/devApprovalPop.do";
            var name = "_self";
            var option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=yes, scrollbars = yes, status=no, top=50, left=50"
            var popup = window.open(url, name, option);
            this.action = "/popup/cam_project/approvalFormPopup/devApprovalPop.do";
            this.method = 'POST';
            this.target = '_self';
        }).trigger("submit");
    },

    fn_popCamCrmList : function (e){
        if(e != null){
            devInfo.global.crmIdx = e;
        }

        var url = "/crm/pop/popCrmList.do";
        var name = "_blank";
        var option = "width = 1300, height = 670, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    selCrmInfo :  function(e){
        $("#estOfc" + devInfo.global.crmIdx).val(e.CRM_NM);
        devInfo.global.crmIdx = "";
    },

    fn_disabled : function(){
        $(".devInfo").find("input").attr("disabled", "disabled");
        $(".devInfo").find("textarea").attr("disabled", "disabled");
        $(".devInfo").find(".popTable").find("button").hide();
    },

    fn_modInv : function (invSn, row){
        console.log(invSn, row);

        var data = {
            invSn : invSn,
            pjtSn : $("#pjtSn").val(),
            invRow : row,
            divCd : $("#divNm"+row).val(),
            divNm : $("#divNm"+row).data("kendoDropDownList").text(),
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
    }
}