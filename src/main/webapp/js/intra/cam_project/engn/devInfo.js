var devInfo = {
    global: {
        devPjtVerList: []
    },

    fn_defaultScript : function (){

        var data = {
            pjtSn : $("#pjtSn").val()
        }
        var rs = customKendo.fn_customAjax("/project/getDevPjtVerList", data);
        devInfo.global.devPjtVerList = rs;

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
            html += "   <td>Ver."+(i+1)+"</td>";
            html += "   <td>"+ docNo +"</td>";
            html += "   <td>"+ sdfDate +"</td>";
            html += "   <td id='invAmt002'>"+devInfo.comma(invAmt)+"</td>";
            html += "   <td>"+rs.list[i].PM+"</td>";
            html += "   <td></td>";
            html += "   <td>"+pjtStepNm+"</td>";
            html += "</tr>";
        }

        $("#verTable").append(html);

        $("#devDelvAmt").val(devInfo.comma($("#devDelvAmt").val()));

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

        customKendo.fn_textBox(["invNm", "invCnt", "invUnit", "estTotAmt", "estOfc", "invEtc", "devPjtNm",
                                "devCrmInfo", "pm", "estDe", "devDelvAmt", "invAmt", "invPer"]);
        $("#divNm").kendoDropDownList({
            dataSource : [
                {text : "구매", value : "1"},
            ],
            dataTextField : "text",
            dataValueField : "value"
        });

        $("#depObj, #etc").kendoTextArea({
            rows : 5,
        });

        devInfo.fn_setData();

        var rs = devInfo.global.devPjtVerList.list;
        if(rs.length > 0){
            var status = rs[0].STATUS;
            var buttonHtml = "";
            if(status == "0"){
                buttonHtml += "<button type=\"button\" id=\"devSaveBtn\" style=\"float: right; margin-bottom: 5px;\" class=\"k-button k-button-solid-info\" onclick=\"devInfo.fn_save()\">저장</button>";
                buttonHtml += "<button type=\"button\" id=\"devAppBtn\" style=\"float: right; margin-right: 5px;\" class=\"k-button k-button-solid-info\" onclick=\"devInfo.delvDrafting()\">상신</button>";
            }else if(status == "10"){
                buttonHtml += "<button type=\"button\" id=\"devCanBtn\" style=\"float: right; margin-bottom: 10px;\" class=\"k-button k-button-solid-error\" onclick=\"docApprovalRetrieve('"+rs[0].DOC_ID+"', '"+rs[0].APPRO_KEY+"', 1, 'retrieve');\">회수</button>";
            }else if(status == "30" || status == "40"){
                buttonHtml += "<button type=\"button\" id=\"devSaveBtn\" style=\"float: right; margin-bottom: 5px;\" class=\"k-button k-button-solid-info\" onclick=\"openModal()\">저장</button>";
                buttonHtml += "<button type=\"button\" id=\"devCanBtn\" style=\"float: right; margin-right: 5px;\" class=\"k-button k-button-solid-error\" onclick=\"tempOrReDraftingPop('"+rs[0].DOC_ID+"', '"+rs[0].DOC_MENU_CD+"', '"+rs[0].APPRO_KEY+"', 2, 'reDrafting');\">재상신</button>";

            }else if(status == "100"){
                buttonHtml += "<button type=\"button\" id=\"devCanBtn\" style=\"float: right; margin-bottom: 10px;\" class=\"k-button k-button-solid-base\" onclick=\"approveDocView('"+rs[0].DOC_ID+"', '"+rs[0].APPRO_KEY+"', '"+rs[0].DOC_MENU_CD+"');\">열람</button>";
            } else {
                buttonHtml += "<button type=\"button\" id=\"devSaveBtn\" style=\"float: right; margin-bottom: 5px;\" class=\"k-button k-button-solid-info\" onclick=\"devInfo.fn_save()\">저장</button>";
            }
            $("#devBtnDiv").html(buttonHtml);
        }
    },

    fn_setData : function (){

        var data = {
            pjtSn : $("#pjtSn").val()
        }
        $.ajax({
            url : "/project/getProcessList",
            data : data,
            type : "post",
            dataType : "json",
            success : function(rs){

                var list = rs.list;

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
                }
            }
        });


        $.ajax({
            url : "/project/getInvList",
            data : data,
            type : "post",
            dataType : "json",
            success : function(rs){

                var list = rs.list;

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
                        '       <td><input type="text" id="invCnt'+idx+'" class="invCnt" style="text-align: right" onkeyup="devInfo.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" /></td>\n' +
                        '       <td><input type="text" id="invUnit'+idx+'" class="invUnit" /></td>\n' +
                        '       <td><input type="text" id="estTotAmt'+idx+'" style="text-align: right" class="estTotAmt" onkeyup="devInfo.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" /></td>\n' +
                        '       <td><input type="text" id="estOfc'+idx+'" class="estOfc" /></td>\n' +
                        '       <td><input type="text" id="invEtc'+idx+'" class="invEtc" /></td>\n' +
                        '       <td style="text-align: center;">' +
                        '           <button type="button" id="delBtn" onclick="devInfo.fn_delInv('+idx+')" class="k-button k-button-solid-error">삭제</button>' +
                        '       </td>';
                    html += '</tr>';
                    $("#invTable").append(html);


                    customKendo.fn_textBox(["invNm" + idx, "invCnt" + idx , "invUnit" + idx,
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
                    $("#invCnt" + idx).val(devInfo.comma(list[i].INV_CNT));
                    $("#invUnit" + idx).val(list[i].INV_UNIT);
                    $("#estTotAmt" + idx).val(devInfo.comma(list[i].EST_TOT_AMT));
                    $("#invEtc" + idx).val(list[i].INV_ETC);

                    $("#estOfc" + idx).val(list[i].EST_OFC);
                }

                var idx = 0;
                var totAmt = 0;
                $("#invTable > tr").each(function(e){
                    idx++;
                    totAmt += Number(devInfo.uncomma($("#estTotAmt" + idx).val()));
                });

                $("#invAmt").val(devInfo.comma(totAmt));

                var invPer = 0;


                $("#invPer").val(Math.round(Number( totAmt / devInfo.uncomma($("#devDelvAmt").val()) * 100)));
            }
        });

        var data = {
            pjtSn : $("#pjtSn").val(),
        }

        $.ajax({
            url : "/project/getDevelopPlan",
            data : data,
            dataType : "json",
            type : "post",
            success : function(rs){
                var devFile = rs.devFile;

                if(devFile.estFile != null && devFile.estFile != ""){
                    $("#estFileName").text(devFile.estFile.file_org_name + "." +devFile.estFile.file_ext);

                }
                if(rs.rs != null && rs.rs != ""){
                    $("#devSn").val(rs.rs.DEV_SN);
                    $("#depObj").val(rs.rs.DEP_OBJ);
                    $("#etc").val(rs.rs.ETC);

                    $("#modBtn").css("display", "");
                    // $("#devSaveBtn").css("display", "none");
                }
            }
        })
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

    delvDrafting: function() {
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

    fn_addProcess: function (){

        if(!confirm("공정을 추가하시겠습니까?")){
            return ;
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
        if($("#estOfc").val() == ""){
            alert("견적처를 입력해주세요.");
            return ;
        }


        var data = {
            divCd : $("#divNm").val(),
            invRow : idx,
            divNm : $("#divNm").data("kendoDropDownList").text(),
            invNm : $("#invNm").val(),
            invCnt : devInfo.uncomma($("#invCnt").val()),
            invUnit : $("#invUnit").val(),
            estTotAmt : devInfo.uncomma($("#estTotAmt").val()),
            estOfc : $("#estOfc").val(),
            invEtc : $("#invEtc").val(),
            pjtSn : $("#pjtSn").val(),
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
            '       <td><input type="text" id="invCnt'+idx+'" class="invCnt" value="'+devInfo.comma(data.invCnt)+'" style="text-align: right" onkeyup="devInfo.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" /></td>\n' +
            '       <td><input type="text" id="invUnit'+idx+'" class="invUnit" value="'+data.invUnit+'" /></td>\n' +
            '       <td><input type="text" id="estTotAmt'+idx+'" style="text-align: right" value="'+devInfo.comma(data.estTotAmt)+'" class="estTotAmt" onkeyup="devInfo.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" /></td>\n' +
            '       <td><input type="text" id="estOfc'+idx+'" class="estOfc" value="'+data.estOfc+'" /></td>\n' +
            '       <td><input type="text" id="invEtc'+idx+'" class="invEtc" value="'+data.invEtc+'" /></td>\n' +
            '       <td style="text-align: center;">' +
            '           <button type="button" id="delBtn" onclick="devInfo.fn_delInv('+idx+')" class="k-button k-button-solid-error">삭제</button>' +
            '       </td>';
        html += '</tr>';

        $("#invTable").append(html);

        customKendo.fn_textBox(["invNm" + idx, "invCnt" + idx , "invUnit" + idx,
            "estTotAmt" + idx, "estOfc" + idx, "invEtc" + idx]);
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
                    totAmt += Number(devInfo.uncomma($("#estTotAmt" + idx).val()));
                });

                if(rs.code == 200){
                    $("#invSn" + idx).val(rs.rep.INV_SN);
                    $("#invAmt").val(devInfo.comma(totAmt));
                    $("#invPer").val(Math.round(totAmt / devInfo.uncomma($("#devDelvAmt").val()) * 100));
                }


                $("#estTotAmt").val("");
                $("#invNm").val("");
                $("#invCnt").val("");
                $("#invUnit").val("");
                $("#estOfc").val("");
                $("#invEtc").val("");
            }
        });

    },

    inputNumberFormat : function (obj){
        obj.value = devInfo.comma(devInfo.uncomma(obj.value));
    },

    comma: function(str) {
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    },

    uncomma: function(str) {
        str = String(str);
        return str.replace(/[^\d]+/g, '');
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
                    invCnt : devInfo.uncomma($("#invCnt"+row).val()),
                    invUnit : $("#invUnit"+row).val(),
                    estTotAmt : devInfo.uncomma($("#estTotAmt"+row).val()),
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
                            totAmt += Number(devInfo.uncomma($("#estTotAmt" + idx).val()));
                            $("#invPer").val(Math.round(totAmt / devInfo.uncomma($("#devDelvAmt").val()) * 100));
                        });

                        if(rs.code = 200){
                            $("#invAmt").val(devInfo.comma(totAmt));
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
                                invCnt : devInfo.uncomma($("#invCnt"+idx).val()),
                                invUnit : $("#invUnit"+idx).val(),
                                estTotAmt : devInfo.uncomma($("#estTotAmt"+idx).val()),
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
                        totAmt += Number(devInfo.uncomma($("#estTotAmt" + idx).val()));
                    });

                    if(rs.code = 200){
                        $("#invAmt").val(devInfo.comma(totAmt));
                        $("#invPer").val(Math.round(totAmt / devInfo.uncomma($("#devDelvAmt").val()) * 100));
                    }

                }
            }
        });
    },

    fn_save: function (){
        if(!confirm("저장하시겠습니까?")){
            return;
        }


        var data= {
            invAmt : devInfo.uncomma($("#invAmt").val()),
            invPer : $("#invPer").val(),
            depObj : $("#depObj").val(),
            etc : $("#etc").val(),
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
        fd.append("invPer", data.invPer);
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

        if($("#estFile")[0].files.length == 1){
            fd.append("estFile", $("#estFile")[0].files[0]);
        }

        if($("#estFileName").text() == ""){
            alert("견적서를 등록해주세요.");
            return;
        }

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
                    opener.parent.camPrj.gridReload();

                    var sum = 0;
                    $(".estTotAmt").each(function(){
                        if(this.value != ""){
                            sum += Number(devInfo.uncomma($(this).val()));
                        }
                    });

                    $("#invAmt002").text(devInfo.comma(sum));
                    devInfo.fn_saveInv();

                }
            }
        });

        alert("저장되었습니다.");
        window.location.href="/project/pop/viewRegProject.do?pjtSn=" + data.pjtSn + "&tab=3";

    },

    fn_psSave : function(row){
        var psLength = $("#psTable > tr").length;

        if(psLength != 1){
            for(var row = 1 ; row < psLength ; row++){
                var data = {
                    psSn : $("#psSn" + row).val(),
                    psRow : row,
                    psPrep : $("#prepList"+row).val(),
                    psPrepNm : $("#prepList"+row).data("kendoDropDownList").text(),
                    psNm : $("#psNm"+row).val(),
                    psStrDe : $("#psStrDe"+row).val(),
                    psEndDe : $("#psEndDe"+row).val(),
                    psEmpSeq : $("#psEmpSeq"+row).val(),
                    psEmpNm : $("#psEmpNm"+row).val()
                }

                $.ajax({
                    url : "/project/updProcess",
                    data : data,
                    type : "post",
                    dataType : "json",
                    success : function (rs){
                        if(rs.code = 200){
                            // devInfo.fn_saveInv();
                        }
                    }
                });
            }
        }

    },

    fileChange : function(e){
        $(e).next().text($(e)[0].files[0].name);
    },

}