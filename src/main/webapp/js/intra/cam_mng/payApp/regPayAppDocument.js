var payAppDoc = {

    global : {

        document1 : [],     // 법인운영 - 부서운영비
        document2 : [],     // 법인운영 - 영업활동비
        document3 : [],     // 이외 예산프로젝트 및 예산과목
    },

    fn_makeHtmlToPdf : function(){

        payAppDoc.global.document1 = [];
        payAppDoc.global.document2 = [];
        payAppDoc.global.document3 = [];

         $.each($(".payDestInfo"), function(i, v){
            var index = $(this).find(".budgetSn").attr("id").slice(-1);

            // 증빙유형 신용카드일때 & 증빙 이미지 있을때
            if($("#eviType" + index).val() == "3" && $("#fileNo" + index).val() != undefined && $("#fileNo" + index).val() != null && $("#fileNo" + index).val() != "null" && $("#fileNo" + index).val() != "undefined" && $("#fileNo" + index).val() != ""){
                if($("#pjtNm").val().indexOf("법인운영") > -1 && $("#budgetNm" + index).val().indexOf("부서운영비") > -1){
                    var data = {
                        budgetNm : $("#budgetNm" + index).val(),
                        budgetSn : $("#budgetSn" + index).val(),
                        budgetAmt : $("#budgetAmt" + index).val(),
                        teamSeq : $("#appTeam" + index).val(),
                        teamName : $("#appTeam" + index).data("kendoDropDownList").text(),
                        evidType : $("#eviType" + index).val(),
                        reason : $("#reason" + index).val(),
                        authNo : $("#authNo" + index).val(),
                        authDd : $("#authDd" + index).val(),
                        authHh : $("#authHh" + index).val(),
                        issNo : $("#issNo" + index).val(),
                        coCd : $("#coCd" + index).val(),
                        taxTy : $("#taxTy" + index).val(),
                        crmNm : $("#crmNm" + index).val(),
                        regNo : $("#regNo" + index).val(),
                        trCd : $("#trCd" + index).val(),
                        crmBnkNm : $("#crmBnkNm" + index).val(),
                        crmAccNo : $("#crmAccNo" + index).val(),
                        crmAccHolder : $("#crmAccHolder" + index).val(),
                        trDe : $("#trDe" + index).val(),
                        totCost : regPay.uncommaN($("#totCost" + index).val()),
                        supCost : regPay.uncommaN($("#supCost" + index).val()),
                        vatCost : regPay.uncommaN($("#vatCost" + index).val()),
                        buySts : $("#buySts" + index).val(),
                        card : $("#card" + index).val(),
                        cardNo : $("#cardNo" + index).val(),
                        etc : $("#etc" + index).val(),
                    }

                    if(data.buySts == undefined || data.buySts == null || data.buySts == "" || data.buySts == "undefined"){
                        data.buySts = "";
                    }

                    if($("#fileNo" + index).val() != undefined && $("#fileNo" + index).val() != null && $("#fileNo" + index).val() != "null" && $("#fileNo" + index).val() != "undefined" && $("#fileNo" + index).val() != ""){
                        data.fileNo = $("#fileNo" + index).val();
                    }

                    if(data.eviType == ""){
                        flag = false;
                    }

                    /** 2023.03.23
                     * 사용자가 직접 입력한 데이터가 양식에 들어가야 하는데 추후에 작업하기로 하고
                     * 당분간은 일반 지출증빙자료로 통일
                     * */
                    // payAppDoc.global.document1.push(data);
                    payAppDoc.global.document3.push(data);

                } else if($("#pjtNm").val().indexOf("법인운영") > -1 && $("#budgetNm" + index).val().indexOf("영업활동비") > -1){
                    var data = {
                        budgetNm : $("#budgetNm" + index).val(),
                        budgetSn : $("#budgetSn" + index).val(),
                        budgetAmt : $("#budgetAmt" + index).val(),
                        teamSeq : $("#appTeam" + index).val(),
                        teamName : $("#appTeam" + index).data("kendoDropDownList").text(),
                        evidType : $("#eviType" + index).val(),
                        reason : $("#reason" + index).val(),
                        authNo : $("#authNo" + index).val(),
                        authDd : $("#authDd" + index).val(),
                        authHh : $("#authHh" + index).val(),
                        issNo : $("#issNo" + index).val(),
                        coCd : $("#coCd" + index).val(),
                        taxTy : $("#taxTy" + index).val(),
                        crmNm : $("#crmNm" + index).val(),
                        regNo : $("#regNo" + index).val(),
                        trCd : $("#trCd" + index).val(),
                        crmBnkNm : $("#crmBnkNm" + index).val(),
                        crmAccNo : $("#crmAccNo" + index).val(),
                        crmAccHolder : $("#crmAccHolder" + index).val(),
                        trDe : $("#trDe" + index).val(),
                        totCost : regPay.uncommaN($("#totCost" + index).val()),
                        supCost : regPay.uncommaN($("#supCost" + index).val()),
                        vatCost : regPay.uncommaN($("#vatCost" + index).val()),
                        buySts : $("#buySts" + index).val(),
                        card : $("#card" + index).val(),
                        cardNo : $("#cardNo" + index).val(),
                        etc : $("#etc" + index).val(),
                    }

                    if(data.buySts == undefined || data.buySts == null || data.buySts == "" || data.buySts == "undefined"){
                        data.buySts = "";
                    }

                    if($("#fileNo" + index).val() != undefined && $("#fileNo" + index).val() != null && $("#fileNo" + index).val() != "null" && $("#fileNo" + index).val() != "undefined" && $("#fileNo" + index).val() != ""){
                        data.fileNo = $("#fileNo" + index).val();
                    }

                    if(data.eviType == ""){
                        flag = false;
                    }

                    /** 2023.03.23
                     * 사용자가 직접 입력한 데이터가 양식에 들어가야 하는데 추후에 작업하기로 하고
                     * 당분간은 일반 지출증빙자료로 통일
                     * */
                    // payAppDoc.global.document2.push(data);
                    payAppDoc.global.document3.push(data);
                } else {
                    var data = {
                        budgetNm : $("#budgetNm" + index).val(),
                        budgetSn : $("#budgetSn" + index).val(),
                        budgetAmt : $("#budgetAmt" + index).val(),
                        teamSeq : $("#appTeam" + index).val(),
                        teamName : $("#appTeam" + index).data("kendoDropDownList").text(),
                        evidType : $("#eviType" + index).val(),
                        reason : $("#reason" + index).val(),
                        authNo : $("#authNo" + index).val(),
                        authDd : $("#authDd" + index).val(),
                        authHh : $("#authHh" + index).val(),
                        issNo : $("#issNo" + index).val(),
                        coCd : $("#coCd" + index).val(),
                        taxTy : $("#taxTy" + index).val(),
                        crmNm : $("#crmNm" + index).val(),
                        regNo : $("#regNo" + index).val(),
                        trCd : $("#trCd" + index).val(),
                        crmBnkNm : $("#crmBnkNm" + index).val(),
                        crmAccNo : $("#crmAccNo" + index).val(),
                        crmAccHolder : $("#crmAccHolder" + index).val(),
                        trDe : $("#trDe" + index).val(),
                        totCost : regPay.uncommaN($("#totCost" + index).val()),
                        supCost : regPay.uncommaN($("#supCost" + index).val()),
                        vatCost : regPay.uncommaN($("#vatCost" + index).val()),
                        buySts : $("#buySts" + index).val(),
                        card : $("#card" + index).val(),
                        cardNo : $("#cardNo" + index).val(),
                        etc : $("#etc" + index).val(),
                    }

                    if(data.buySts == undefined || data.buySts == null || data.buySts == "" || data.buySts == "undefined"){
                        data.buySts = "";
                    }

                    if($("#fileNo" + index).val() != undefined && $("#fileNo" + index).val() != null && $("#fileNo" + index).val() != "null" && $("#fileNo" + index).val() != "undefined" && $("#fileNo" + index).val() != ""){
                        data.fileNo = $("#fileNo" + index).val();
                    }

                    if(data.eviType == ""){
                        flag = false;
                    }

                    payAppDoc.global.document3.push(data);
                }
            }
        });

        var hostUrl = "";
        if(window.location.host.indexOf("218.158.231.184") > -1 || window.location.host.indexOf("new.camtic.or.kr") > -1){
            hostUrl = "http://218.158.231.184";
        } else {
            hostUrl = "http://218.158.231.186";
        }

        var html = "";

        // 법인운영 - 부서활동비
        if(payAppDoc.global.document1.length > 0){

            for(var i = 0; i < payAppDoc.global.document1.length; i++){
                var corpCardHistFile;
                var receiptFile;
                if(payAppDoc.global.document1[i].fileNo != "" && payAppDoc.global.document1[i].fileNo != undefined){
                    let data2 = {
                        fileNo : payAppDoc.global.document1[i].fileNo
                    };
                    corpCardHistFile = customKendo.fn_customAjax("/common/getFileInfo", data2).data;

                    receiptFile = '<div style="width: 100%; text-align: center; margin: 0 auto;">' +
                                     '<img src="' + hostUrl + corpCardHistFile.file_path + corpCardHistFile.file_uuid + '" style="display: block;"/>' +
                                '</div>';
                }

                html += "" +
                    '<div style="width: 100%; height: 100%; padding: 20px 30px; text-align: center;">';
                if(i == 0){
                    html += '    <h1 style="font-size: 24px; margin-bottom: 10px;">부서운영비증빙자료</h1>';
                }
                html += '    <table style="width: 100%; border-collapse: collapse; text-align: center; font-size: 16px;">' +
                    '        <tbody>' +
                    '            <tr>' +
                    '                <th style="border: 1px solid black; padding: 10px 0;">관련근거</th>' +
                    '                <td colspan="5" style="border: 1px solid black; padding: 10px 0;">운영규정 제7조와 인사관리규칙 제32조 4항에 의거</td>' +
                    '            </tr>' +
                    '            <tr>' +
                    '                <th rowspan="2" style="border: 1px solid black; padding: 10px 0;">사용일시</th>' +
                    '                <td rowspan="2" colspan="2" style="border: 1px solid black; padding: 10px 0;">'+ payAppDoc.global.document1[i].trDe +'</td>' +
                    '                <th style="border: 1px solid black; padding: 10px 0;">카드사용</th>' +
                    '                <td colspan="2" style="border: 1px solid black; padding: 10px 0;">법인('+ payAppDoc.global.document1[i].cardNo.split("-")[3] +')</td>' +
                    '            </tr>' +
                    '            <tr>' +
                    '                <th style="border: 1px solid black; padding: 10px 0;">사용금액</th>' +
                    '                <td colspan="5" style="border: 1px solid black; padding: 10px 0;">'+ comma(payAppDoc.global.document1[i].totCost) +'</td>' +
                    '            </tr>' +
                    '            <tr>' +
                    '                <th style="border: 1px solid black; padding: 10px 0;">사용부서</th>' +
                    '                <td colspan="2" style="border: 1px solid black; padding: 10px 0;">'+ $("#loginDeptName").val() + ' ' + $("#loginTeamName").val() +'</td>' +
                    '                <th style="border: 1px solid black; padding: 10px 0;">부서인원</th>' +
                    '                <td colspan="2" style="border: 1px solid black; padding: 10px 0;"></td>' +
                    '            </tr>' +
                    '            <tr>' +
                    '                <th style="border: 1px solid black; padding: 10px 0;">사용목적</th>' +
                    '                <td colspan="5" style="border: 1px solid black; padding: 10px 0;">'+ $("#appTitle").val() +'</td>' +
                    '            </tr>' +
                    '            <tr>' +
                    '                <th style="border: 1px solid black; padding: 10px 0;">입금계좌</th>' +
                    '                <td colspan="5" style="border: 1px solid black; padding: 10px 0;">'+ payAppDoc.global.document1[i].crmAccNo +'</td>' +
                    '            </tr>' +
                    '            <tr>' +
                    '                <th colspan="6" style="border: 1px solid black; padding: 10px 0;">' +
                    '                    증 빙 서 류' +
                    '                </th>' +
                    '            </tr>' +
                    '            <tr>' +
                    '                <td colspan="6" style="border: 1px solid black; padding: 20px 0;">' +
                    // '                    ※ 카드(법인)사용 전표 등 부착' +
                                        receiptFile +
                    '                </td>' +
                    '            </tr>' +
                    '            <tr style="font-size: 16px;">' +
                    '                <th colspan="6" style="border: 1px solid black; padding: 10px 0;">' +
                    '                    ※ 참여자 확인란' +
                    '                </th>' +
                    '            </tr>' +
                    '            <tr style="font-size: 16px;">' +
                    '                <td style="border: 1px solid black; width: 110px; padding: 10px 0;">성&nbsp;&nbsp;&nbsp;명</td>' +
                    '                <td style="border: 1px solid black; width: 110px; padding: 10px 0;">직&nbsp;&nbsp;&nbsp;책</td>' +
                    '                <td style="border: 1px solid black; width: 110px; padding: 10px 0;">서&nbsp;&nbsp;&nbsp;명</td>' +
                    '                <td style="border: 1px solid black; width: 110px; padding: 10px 0;">성&nbsp;&nbsp;&nbsp;명</td>' +
                    '                <td style="border: 1px solid black; width: 110px; padding: 10px 0;">직&nbsp;&nbsp;&nbsp;책</td>' +
                    '                <td style="border: 1px solid black; width: 110px; padding: 10px 0;">서&nbsp;&nbsp;&nbsp;명</td>' +
                    '            </tr>' +
                    '            <tr style="font-size: 16px;">' +
                    '                <td style="border: 1px solid black; height: 24px;"></td>' +
                    '                <td style="border: 1px solid black;"></td>' +
                    '                <td style="border: 1px solid black;"></td>' +
                    '                <td style="border: 1px solid black;"></td>' +
                    '                <td style="border: 1px solid black;"></td>' +
                    '                <td style="border: 1px solid black;"></td>' +
                    '            </tr>' +
                    '            <tr style="font-size: 16px;">' +
                    '                <td style="border: 1px solid black; height: 24px;"></td>' +
                    '                <td style="border: 1px solid black;"></td>' +
                    '                <td style="border: 1px solid black;"></td>' +
                    '                <td style="border: 1px solid black;"></td>' +
                    '                <td style="border: 1px solid black;"></td>' +
                    '                <td style="border: 1px solid black;"></td>' +
                    '            </tr>' +
                    '            <tr style="font-size: 16px;">' +
                    '                <td style="border: 1px solid black; height: 24px;"></td>' +
                    '                <td style="border: 1px solid black;"></td>' +
                    '                <td style="border: 1px solid black;"></td>' +
                    '                <td style="border: 1px solid black;"></td>' +
                    '                <td style="border: 1px solid black;"></td>' +
                    '                <td style="border: 1px solid black;"></td>' +
                    '            </tr>' +
                    '            <tr style="font-size: 16px;">' +
                    '                <td style="border: 1px solid black; height: 24px;"></td>' +
                    '                <td style="border: 1px solid black;"></td>' +
                    '                <td style="border: 1px solid black;"></td>' +
                    '                <td style="border: 1px solid black;"></td>' +
                    '                <td style="border: 1px solid black;"></td>' +
                    '                <td style="border: 1px solid black;"></td>' +
                    '            </tr>' +
                    '            <tr style="font-size: 16px;">' +
                    '                <td style="border: 1px solid black; height: 24px;"></td>' +
                    '                <td style="border: 1px solid black;"></td>' +
                    '                <td style="border: 1px solid black;"></td>' +
                    '                <td style="border: 1px solid black;"></td>' +
                    '                <td style="border: 1px solid black;"></td>' +
                    '                <td style="border: 1px solid black;"></td>' +
                    '            </tr>' +
                    '        </tbody>' +
                    '    </table>';
                if(i == payAppDoc.global.document1.length - 1){
                    html += '    <h2>사단법인 캠틱종합기술원</h2>';
                }
                html +='</div>';
            }
        }

        // 법인운영 - 영업활동비
        if(payAppDoc.global.document2.length > 0){

            for(var i = 0; i < payAppDoc.global.document2.length; i++){
                var corpCardHistFile;
                var receiptFile;
                if(payAppDoc.global.document2[i].fileNo != "" && payAppDoc.global.document2[i].fileNo != undefined){
                    let data2 = {
                        fileNo : payAppDoc.global.document2[i].fileNo
                    };
                    corpCardHistFile = customKendo.fn_customAjax("/common/getFileInfo", data2).data;

                    receiptFile = '<div style="width: 100%; text-align: center; margin: 0 auto;">' +
                        '<img src="' + hostUrl + corpCardHistFile.file_path + corpCardHistFile.file_uuid + '" style="display: block;" />' +
                        '</div>';
                }

                html += "" +
                    '<div style="width: 100%; height: 100%; padding: 0 30px; text-align: center;">';
                if(i == 0){
                    html += '    <h1 style="font-size: 24px; margin-bottom: 10px;">영업활동비 증빙자료</h1>';
                }
                html += '    <table style="width: 100%; border-collapse: collapse; text-align: center; font-size: 16px;">' +
                    '        <tbody>' +
                    '            <tr>' +
                    '                <th rowspan="2" style="border: 1px solid black; width: 100px; padding: 10px 0;">사용일시</th>' +
                    '                <td rowspan="2" style="border: 1px solid black; width: 220px; padding: 10px 0;">'+ payAppDoc.global.document2[i].trDe +'</td>' +
                    '                <th style="border: 1px solid black; width: 100px; padding: 10px 0;">카드사용</th>' +
                    '                <td style="border: 1px solid black; width: 200px; padding: 10px 0;">법인('+ payAppDoc.global.document2[i].cardNo.split("-")[3] +')</td>' +
                    '            </tr>' +
                    '            <tr>' +
                    '                <th style="border: 1px solid black; padding: 10px 0;">사용금액</th>' +
                    '                <td colspan="3" style="border: 1px solid black; padding: 10px 0;">'+ comma(payAppDoc.global.document2[i].totCost) +'</td>' +
                    '            </tr>' +
                    '            <tr>' +
                    '                <th style="border: 1px solid black; padding: 10px 0;">사 용 자</th>' +
                    '                <td style="border: 1px solid black; padding: 10px 0;">'+ $("#loginEmpName").val() +'</td>' +
                    '                <th style="border: 1px solid black; padding: 10px 0;">부 서(팀)</th>' +
                    '                <td style="border: 1px solid black; padding: 10px 0;">'+ $("#loginDeptName").val() + ' ' + $("#loginTeamName").val() +'</td>' +
                    '            </tr>' +
                    '            <tr>' +
                    '                <th style="border: 1px solid black; padding: 10px 0;">업 체 명</th>' +
                    '                <td colspan="3" style="border: 1px solid black; padding: 10px 0;">'+ payAppDoc.global.document2[i].crmNm +'</td>' +
                    '            </tr>' +
                    '            <tr>' +
                    '                <th style="border: 1px solid black; padding: 10px 0;">면 담 자</th>' +
                    '                <td colspan="3" style="border: 1px solid black; padding: 10px 0;"></td>' +
                    '            </tr>' +
                    '            <tr>' +
                    '                <th style="border: 1px solid black; padding: 10px 0;">내&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;용</th>' +
                    '                <td colspan="3" style="border: 1px solid black; padding: 10px 0;">'+ $("#appCont").val() +'</td>' +
                    '            </tr>' +
                    '            <tr>' +
                    '                <th colspan="4" style="border: 1px solid black; padding: 10px 0;">' +
                    '                    증 빙 서 류' +
                    '                </th>' +
                    '            </tr>' +
                    '            <tr>' +
                    '                <td colspan="4" style="border: 1px solid black; padding: 20px 0;">' +
                    // '                    ※ 카드(법인)사용 전표 등 부착' +
                                        receiptFile +
                    '                </td>' +
                    '            </tr>' +
                    '        </tbody>' +
                    '    </table>';
                if(i == payAppDoc.global.document2.length - 1){
                    html += '    <h2>사단법인 캠틱종합기술원</h2>';
                }
                html +='</div>';
            }
        }

        // 그외
        if(payAppDoc.global.document3.length > 0){

            for(var i = 0; i < payAppDoc.global.document3.length; i++){
                var corpCardHistFile;
                var receiptFile;
                if(payAppDoc.global.document3[i].fileNo != "" && payAppDoc.global.document3[i].fileNo != undefined){
                    let data2 = {
                        fileNo : payAppDoc.global.document3[i].fileNo
                    };
                    corpCardHistFile = customKendo.fn_customAjax("/common/getFileInfo", data2).data;

                    receiptFile = '<div style="width: 100%; text-align: center; margin: 0 auto;">' +
                        '<img src="' + hostUrl + corpCardHistFile.file_path + corpCardHistFile.file_uuid + '" style="display: block;"/>' +
                        '</div>';
                }

                html += "" +
                    '<div style="width: 100%; height: 100%; padding: 20px 30px; text-align: center;">';
                if(i == 0){
                    html += '    <h1 style="font-size: 24px; margin-bottom: 10px;">지 출 증 빙 자 료</h1>';
                }
                html += '    <table style="width: 100%; border-collapse: collapse; text-align: center; font-size: 16px;">' +
                    '        <tbody>' +
                    '            <tr>' +
                    '                <th style="border: 1px solid black; width: 110px; padding: 10px 0;">사용일자</th>' +
                    '                <td style="border: 1px solid black; width: 220px; padding: 10px 0;">'+ payAppDoc.global.document3[i].trDe +'</td>' +
                    '                <th style="border: 1px solid black; width: 110px; padding: 10px 0;">구&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;분</th>' +
                    '                <td style="border: 1px solid black; width: 220px; padding: 10px 0;">법인('+ payAppDoc.global.document3[i].cardNo.split("-")[3] +')</td>' +
                    '            </tr>' +
                    '            <tr>' +
                    '                <th style="border: 1px solid black; padding: 10px 0;">사용금액</th>' +
                    '                <td style="border: 1px solid black; padding: 10px 0;">'+ comma(payAppDoc.global.document3[i].totCost) +'</td>' +
                    '                <th style="border: 1px solid black; padding: 10px 0;">사 용 자</th>' +
                    '                <td style="border: 1px solid black; padding: 10px 0;">'+ $("#loginEmpName").val() +'</td>' +
                    '            </tr>' +
                    '            <tr>' +
                    '                <th style="border: 1px solid black; padding: 10px 0;">사용내역</th>' +
                    '                <td colspan="3" style="border: 1px solid black; padding: 10px 0;">'+ $("#appTitle").val() +'</td>' +
                    '            </tr>' +
                    '            <tr>' +
                    '                <th style="border: 1px solid black; padding: 10px 0;">입금계좌</th>' +
                    '                <td colspan="3" style="border: 1px solid black; padding: 10px 0;">'+ payAppDoc.global.document3[i].crmAccNo +'</td>' +
                    '            </tr>' +
                    '            <tr>' +
                    '                <th colspan="4" style="border: 1px solid black; padding: 10px 0;">' +
                    '                    증 빙 서 류' +
                    '                </th>' +
                    '            </tr>' +
                    '            <tr>' +
                    '                <td colspan="4" style="border: 1px solid black; padding: 20px 0;">' +
                    // '                    ※ 카드(법인)사용 전표 등 부착' +
                                        receiptFile +
                    '                </td>' +
                    '            </tr>' +
                    '        </tbody>' +
                    '    </table>';
                if(i == payAppDoc.global.document3.length - 1){
                    html += '    <h2>사단법인 캠틱종합기술원</h2>';
                }
                html +=    '</div>';
            }
        }

        return html;
    }
}