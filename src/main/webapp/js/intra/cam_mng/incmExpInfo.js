var incmExpInfo = {

    global : {
        params : "",
        searchAjaxData : "",
    },

    fn_defaultScript : function (setParameters){
        incmExpInfo.global.params = setParameters;

        incmExpInfo.fn_saveChk();
    },

    fn_saveChk : function(){
        var url = "";
        var url2 = "";
        if(incmExpInfo.global.params.chk == 0){
        } else if(incmExpInfo.global.params.chk > 0){
            $("#setYn").val('Y');
        }
        url = "/g20/getBudgetListDuplDel";
        url2 = "/mng/getProjectBgtList";

        incmExpInfo.fn_makeBudgetTable(url, url2);
    },

    fn_makeBudgetTable : function (url, url2){
        var date = new Date();
        var baseDate = date.getFullYear().toString() + (date.getMonth() + 1).toString().padStart(2, '0') + date.getDate().toString().padStart(2, '0');

        incmExpInfo.global.searchAjaxData = {
            pjtSn : incmExpInfo.global.params.pjtCd,
            mgtSeq : incmExpInfo.global.params.pjtCd,
            baseDate : baseDate,
            temp : "2",
            fromDate : $("#frDt").val().replace(/-/g, ""),
            toDate : $("#toDt").val().replace(/-/g, "")
        }
        var result = customKendo.fn_customAjax(url, incmExpInfo.global.searchAjaxData);
        var result2 = customKendo.fn_customAjax(url2, incmExpInfo.global.searchAjaxData);
        if(result.flag) {
            var rs = result.list;
            console.log("rs", rs);

            var rs2 = result2.list;
            console.log("rs2", rs2);
            var tblHtml = "";

            $("#bgtTblBody").empty();
            for(var i=0; i<rs.length; i++){
                tblHtml += '<tr id="' + rs[i].BGT_CD + '" class="bgtTr">';
                tblHtml += '<td style="text-align: center">' +
                    '<span id="BGT_CD" style="display: none;">' + rs[i].BGT_CD + '</span>' +
                    '<input type="radio" id="BGT_AT_' + rs[i].BGT_CD + '_1" name="BGT_AT_' + rs[i].BGT_CD + '" value="1" style="display: inline-block">' +
                    '<label for="BGT_AT_' + rs[i].BGT_CD + '_1" style="margin-left: 5px;">수익</label>' +
                    '<input type="radio" id="BGT_AT_' + rs[i].BGT_CD + '_2" name="BGT_AT_' + rs[i].BGT_CD + '" value="2" style="display: inline-block; margin-left: 20px" checked >' +
                    '<label for="BGT_AT_' + rs[i].BGT_CD + '_2" style="margin-left: 5px;">비용</label>' +
                    // '<span id="BGT_AT" name="BGT_AT_' + rs[i].BGT_CD + '"></span>' +
                    '</td>';
                tblHtml += '<td><span id="BGT1_NM">' + rs[i].BGT1_NM + '</span></td>';
                tblHtml += '<td><span id="BGT2_NM">' + rs[i].BGT2_NM + '</span></td>';
                if(rs[i].DIV_FG_NM == "항" || $("#setYn").val() == "Y"){
                    tblHtml += '<td><span id="BGT_NM">' + rs[i].BGT_NM + '</span></td>';
                } else {
                    tblHtml += '<td></td>';
                }
                tblHtml += '<td style="text-align: right;"><span id="CALC_AM">' + comma(rs[i].CALC_AM) + '</span></td>';
                tblHtml += '</tr>';
            }

            $("#bgtTblBody").append(tblHtml);

            for(var i=0; i<rs2.length; i++){
                try{
                    if(rs2[i].BGT_AT == '1'){
                        $("#BGT_AT_" + rs2[i].BGT_CD + "_1").prop('checked', true);
                    } else if(rs[i].BGT_AT == '2'){
                        $("#BGT_AT_" + rs2[i].BGT_CD + "_2").prop('checked', true);
                    }
                }catch{
                }
            }
        }
    },

    fn_save : function(){
        var formData = new FormData();
        var itemArr = [];

        if(confirm("저장하시겠습니까?")){
            $('.bgtTr').each(function() {
                var data = {
                    pjtCd : $("#subPjtCd").val(),
                    regEmpSeq : $("#regEmpSeq").val(),
                    bgtCd : $(this).find("#BGT_CD").text(),
                    bgtAt : $(this).find("input[name*='BGT_AT_']:checked").val(),
                    bgt1Nm : $(this).find("#BGT1_NM").text(),
                    bgt2Nm : $(this).find("#BGT2_NM").text(),
                    bgt3Nm : $(this).find("#BGT_NM").text(),
                    calcAm : uncomma($(this).find("#CALC_AM").text()),
                }

                itemArr.push(data);
            });
        }

        formData.append("pjtCd", $("#subPjtCd").val());
        formData.append("itemArr", JSON.stringify(itemArr));

        var result = customKendo.fn_customFormDataAjax("/mng/insIncmExpInfo", formData);
        if(result.flag){
            alert("저장되었습니다.");
            location.href="/mng/pop/projectMngPop.do?pjtCd=" + $("#subPjtCd").val();
        }
    }
}