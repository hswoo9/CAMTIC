var costInfo = {

    fn_defaultScript : function (){

        customKendo.fn_textBox(["costAmt", "rawAmt", "outsAmt", "laborAmt", "chargeAmt", "bustAmt"]);

        $("#costEtc").kendoTextArea({
            rows : 5,
        });

        var data = {
            pjtSn : $("#pjtSn").val(),
        }

        var costMap = {};

        $.ajax({
            url : "/project/engn/getResultInfo",
            type : "post",
            dataType : "json",
            async : false,
            data : data,
            success : function(rs){
                const ls = rs.list;
                console.log(ls);
                var html = "";
                if(ls != null){
                    costMap = ls[0];
                    $("#costEtc").val(ls[0].COST_ETC);
                    var teamCostAmt = 0;
                    var prepTime = 0;
                    for(var i = 0 ; i < ls.length ; i++){
                        if(ls[i].PS_PREP_NM == "설계"){
                            prepTime = ls[i].PREP_A_TIME;
                        } else if(ls[i].PS_PREP_NM == "제작"){
                            prepTime = ls[i].PREP_B_TIME;
                        } else if (ls[i].PS_PREP_NM == "품질"){
                            prepTime = ls[i].PREP_C_TIME;
                        } else {
                            prepTime = ls[i].PREP_D_TIME;
                        }
                        var positionName = "";
                        if(ls[i].POSITION_NAME == null || ls[i].POSITION_NAME == "" || ls[i].POSITION_NAME == undefined){
                            positionName = "";
                        } else {
                            positionName = ls[i].POSITION_NAME;
                        }
                        html += '<tr>' +
                            '       <td style="text-align: center" id="costPrepNm'+(i+1)+'">'+ls[i].PS_PREP_NM+'</td>' +
                            '       <td style="text-align: center">'+positionName+'</td>' +
                            '       <td style="text-align: center">'+ls[i].PS_EMP_NM+'</td>' +
                            '       <td style="text-align: center"><input type="text" id="laborUnitAmt'+(i+1)+'" value="'+costInfo.comma(ls[i].LABOR_AMT)+'" disabled class="laborUnitAmt" style="text-align: right; width: 90%" onkeyup="costInfo.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" /></td>' +
                            '       <td style="text-align: center"><input type="text" id="costWorkTime'+(i+1)+'" value="'+ prepTime +'" class="costWorkTime" style="text-align: right; width: 90%" onkeyup="costInfo.fn_calcAmt(this, '+(i+1)+')" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" /></td>' +
                            '       <td style="text-align: center"><input type="text" id="costTotAmt'+(i+1)+'" disabled class="costTotAmt" style="text-align: right; width: 90%" onkeyup="costInfo.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" /></td>' +
                            '    </tr>'
                        teamCostAmt += ls[i].TEAM_COST_AMT;
                    }
                    html += '<tr>' +
                        '       <td colspan="5" style="text-align: center; font-weight: bold; background-color: #dee4ed"><span style="position: relative; top:5px;">노무비합계</span></td>' +
                        '       <td style="text-align: center"><input type="text" id="costTotSumAmt" disabled class="costTotSumAmt" style="text-align: right; width: 90%" onkeyup="costInfo.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" /></td>' +
                        '    </tr>'
                    $("#costDetailTable").html("");
                    $("#costDetailTable").append(html);

                    const pjtMap = rs.pjtInfo;
                    let chargeAmt = pjtMap.PJT_AMT * (teamCostAmt / 100);
                    $("#chargeAmt").val(costInfo.comma(chargeAmt));

                    $("#costAmt").val(costInfo.comma(Number(costInfo.uncomma($("#rawAmt").val())) + Number(costInfo.uncomma($("#outsAmt").val())) + Number(costInfo.uncomma($("#laborAmt").val())) + Number(costInfo.uncomma($("#chargeAmt").val())) + Number(costInfo.uncomma($("#bustAmt").val()))));
                    $(".costWorkTime").trigger("keyup");
                }

                for(var i = 1 ; i <= ls.length ; i++) {
                    customKendo.fn_textBox(["laborUnitAmt"+i,"costWorkTime"+i, "costTotAmt"+i]);
                }
                customKendo.fn_textBox(["costTotSumAmt"]);
            }
        });

        /** 원재료 세팅 */
        const purcData = customKendo.fn_customAjax("/purc/getPurcSum", data).data;
        if(purcData != null){
            $("#rawAmt").val(costInfo.comma(purcData.PURC_SUM));
        }

        /** 출장 세팅 */
        const bustripData = customKendo.fn_customAjax("/bustrip/getBustripExnpSum", data).data;
        if(bustripData != null){
            $("#bustAmt").val(costInfo.comma(bustripData.BUSTRIP_EXNP_SUM));
        }

        /** 버튼 세팅 */
        costInfo.buttonSet(costMap);
    },

    fn_save: function (){
        var data = {
            pjtSn : $("#pjtSn").val(),
            empSeq : $("#empSeq").val(),
            costEtc : $("#costEtc").val()
        }
        for(var i = 1 ; i <= $("#costDetailTable > tr").length -1 ; i++){
            if($("#costPrepNm" + i).text() == "설계"){
                data.prepATime = $("#costWorkTime" + i).val()
            } else if ($("#costPrepNm" + i).text() == "제작"){
                data.prepBTime = $("#costWorkTime" + i).val()
            } else if ($("#costPrepNm" + i).text() == "품질"){
                data.prepCTime = $("#costWorkTime" + i).val()
            } else {
                data.prepDTime = $("#costWorkTime" + i).val()
            }
        }


        $.ajax({
            url : "/project/engn/setCostInfo",
            data : data,
            type : "post",
            dataType : "json",
            success : function(rs){
                if(rs.code == 200){
                    alert("저장되었습니다.");
                    window.location.href="/project/pop/viewRegProject.do?pjtSn=" + data.pjtSn + "&tab=8";
                }
            }
        })
    },

    fn_calcAmt : function(obj, idx){

        $("#costTotAmt" + idx).val(costInfo.comma(costInfo.uncomma($("#laborUnitAmt" + idx).val()) * costInfo.uncomma($("#costWorkTime" + idx).val())));

        var totSumAmt = 0;
        for(var i = 1 ; i <= $("#costDetailTable > tr").length -1 ; i++){
            totSumAmt += Number(costInfo.uncomma($("#costTotAmt" + i).val()));
        }

        $("#costTotSumAmt").val(costInfo.comma(totSumAmt));
        $("#laborAmt").val(costInfo.comma(totSumAmt));

        $("#costAmt").val(costInfo.comma(Number(costInfo.uncomma($("#rawAmt").val())) + Number(costInfo.uncomma($("#outsAmt").val())) + Number(costInfo.uncomma($("#laborAmt").val())) + Number(costInfo.uncomma($("#chargeAmt").val())) + Number(costInfo.uncomma($("#bustAmt").val()))));
        return costInfo.inputNumberFormat(obj);
    },

    inputNumberFormat : function (obj){
        obj.value = costInfo.comma(costInfo.uncomma(obj.value));
    },

    comma: function(str) {
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    },

    uncomma: function(str) {
        str = String(str);
        return str.replace(/[^\d]+/g, '');
    },

    buttonSet: function(costMap){
        console.log("costMap");
        console.log(costMap);
        let buttonHtml = "";
        if(costMap.COST_STATUS == "0"){
            buttonHtml += '<button type="button" id="costSaveBtn" style="float: right; margin-bottom: 10px;" class="k-button k-button-solid-info" onclick="costInfo.fn_save()">저장</button>';
            buttonHtml += '<button type="button" id="costAppBtn" style="float: right; margin-right: 5px;" class="k-button k-button-solid-info" onclick="costInfo.costDrafting()">상신</button>';
        }else if(costMap.COST_STATUS == "10"){
            buttonHtml += '<button type="button" id="costCanBtn" style="float: right; margin-bottom: 10px;" class="k-button k-button-solid-error" onclick="docApprovalRetrieve(\''+costMap.COST_DOC_ID+'\', \''+costMap.APPRO_KEY+'\', 1, \'retrieve\');">회수</button>';
        }else if(costMap.COST_STATUS == "30" || costMap.COST_STATUS == "40"){
            buttonHtml += '<button type="button" id="costSaveBtn" style="float: right; margin-bottom: 10px;" class="k-button k-button-solid-info" onclick="costInfo.fn_save()">저장</button>';
            buttonHtml += '<button type="button" id="costCanBtn" style="float: right; margin-right: 5px;" class="k-button k-button-solid-error" onclick="tempOrReDraftingPop(\''+costMap.COST_DOC_ID+'\', \''+costMap.DOC_MENU_CD+'\', \''+costMap.APPRO_KEY+'\', 2, \'reDrafting\');">재상신</button>';
        }else if(costMap.COST_STATUS == "100"){
            buttonHtml += '<button type="button" id="costCanBtn" style="float: right; margin-bottom: 10px;" class="k-button k-button-solid-base" onclick="approveDocView(\''+costMap.COST_DOC_ID+'\', \''+costMap.APPRO_KEY+'\', \''+costMap.DOC_MENU_CD+'\');">열람</button>';
        }else{
            buttonHtml += '<button type="button" id="costSaveBtn" style="float: right; margin-bottom: 10px;" class="k-button k-button-solid-info" onclick="costInfo.fn_save()">저장</button>';
        }

        $("#costBtnDiv").html(buttonHtml);
    },

    costDrafting: function() {
        $("#costDraftFrm").one("submit", function() {
            var url = "/popup/cam_project/approvalFormPopup/costApprovalPop.do";
            var name = "_self";
            var option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=yes, scrollbars = yes, status=no, top=50, left=50"
            var popup = window.open(url, name, option);
            this.action = "/popup/cam_project/approvalFormPopup/costApprovalPop.do";
            this.method = 'POST';
            this.target = '_self';
        }).trigger("submit");
    },

}