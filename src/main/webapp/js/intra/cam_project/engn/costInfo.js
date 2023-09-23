var costInfo = {

    fn_defaultScript : function (){

        customKendo.fn_textBox(["costAmt", "rawAmt", "outsAmt", "laborAmt", "chargeAmt",
            "bustAmt"]);

        $("#costEtc").kendoTextArea({
            rows : 5,
        });

        var data = {
            pjtSn : $("#pjtSn").val(),
        }

        $.ajax({
            url : "/project/engn/getResultInfo",
            type : "post",
            dataType : "json",
            data : data,
            success : function(rs){
                const ls = rs.list;
                console.log(ls);
                var html = "";
                if(ls != null){

                    for(var i = 0 ; i < ls.length ; i++){
                        html += '<tr>' +
                            '       <td style="text-align: center" id="costPrepNm'+(i+1)+'">'+ls[i].PS_PREP_NM+'</td>' +
                            '       <td style="text-align: center">'+ls[i].POSITION_NAME+'</td>' +
                            '       <td style="text-align: center">'+ls[i].PS_EMP_NM+'</td>' +
                            '       <td style="text-align: center"><input type="text" id="laborUnitAmt'+(i+1)+'" value="'+costInfo.comma(ls[i].LABOR_AMT)+'" disabled class="laborUnitAmt" style="text-align: right; width: 90%" onkeyup="costInfo.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" /></td>' +
                            '       <td style="text-align: center"><input type="text" id="costWorkTime'+(i+1)+'" class="costWorkTime" style="text-align: right; width: 90%" onkeyup="costInfo.fn_calcAmt(this, '+(i+1)+')" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" /></td>' +
                            '       <td style="text-align: center"><input type="text" id="costTotAmt'+(i+1)+'" disabled class="costTotAmt" style="text-align: right; width: 90%" onkeyup="costInfo.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" /></td>' +
                            '    </tr>'
                    }
                    html += '<tr>' +
                        '       <td colspan="5" style="text-align: center; font-weight: bold; background-color: #dee4ed"><span style="position: relative; top:5px;">노무비합계</span></td>' +
                        '       <td style="text-align: center"><input type="text" id="costTotSumAmt" disabled class="costTotSumAmt" style="text-align: right; width: 90%" onkeyup="costInfo.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" /></td>' +
                        '    </tr>'
                    $("#costDetailTable").html("");
                    $("#costDetailTable").append(html);
                }

                for(var i = 1 ; i <= ls.length ; i++) {
                    customKendo.fn_textBox(["laborUnitAmt"+i,"costWorkTime"+i, "costTotAmt"+i]);
                }
                customKendo.fn_textBox(["costTotSumAmt"]);

                /** 버튼 세팅 cost Table 이 없어 임시 추가 */
                var tempMap = {STATUS: "0"}
                costInfo.buttonSet(tempMap);
            }
        });
    },

    fn_save: function (){
        var data = {
            prepATime : null,
            prepBTime : null,
            prepCTime : null
        }
        for(var i = 1 ; i <= $("#costDetailTable > tr").length -1 ; i++){
            if($("#costPrepNm" + i).text() == "설계"){
                data.prepATime = $("#costWorkTime" + i).val()
            } else if ($("#costPrepNm" + i).text() == "제작"){
                data.prepBTime = $("#costWorkTime" + i).val()
            } else {
                data.prepCTime = $("#costWorkTime" + i).val()
            }
        }

        console.log(data);

    },

    fn_calcAmt : function(obj, idx){

        $("#costTotAmt" + idx).val(costInfo.comma(costInfo.uncomma($("#laborUnitAmt" + idx).val()) * costInfo.uncomma($("#costWorkTime" + idx).val())));

        var totSumAmt = 0;
        for(var i = 1 ; i <= $("#costDetailTable > tr").length -1 ; i++){
            totSumAmt += Number(costInfo.uncomma($("#costTotAmt" + i).val()));
        }

        $("#costTotSumAmt").val(costInfo.comma(totSumAmt));
        $("#laborAmt").val(costInfo.comma(totSumAmt));
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
        let buttonHtml = "";
        if(costMap != null){
            if(costMap.STATUS == "0"){
                buttonHtml += '<button type="button" id="costSaveBtn" style="float: right; margin-bottom: 10px;" class="k-button k-button-solid-info" onclick="costInfo.fn_save()">저장</button>';
                buttonHtml += '<button type="button" id="costAppBtn" style="float: right; margin-right: 5px;" class="k-button k-button-solid-info" onclick="costInfo.costDrafting()">상신</button>';
            }else if(costMap.STATUS == "10"){
                buttonHtml += '<button type="button" id="costCanBtn" style="float: right; margin-bottom: 10px;" class="k-button k-button-solid-error" onclick="docApprovalRetrieve(\''+costMap.DOC_ID+'\', \''+costMap.APPRO_KEY+'\', 1, \'retrieve\');">회수</button>';
            }else if(costMap.STATUS == "30" || costMap.STATUS == "40"){
                buttonHtml += '<button type="button" id="costSaveBtn" style="float: right; margin-bottom: 10px;" class="k-button k-button-solid-info" onclick="costInfo.fn_save()">저장</button>';
                buttonHtml += '<button type="button" id="costCanBtn" style="float: right; margin-right: 5px;" class="k-button k-button-solid-error" onclick="tempOrReDraftingPop(\''+costMap.DOC_ID+'\', \''+costMap.DOC_MENU_CD+'\', \''+costMap.APPRO_KEY+'\', 2, \'reDrafting\');">재상신</button>';
            }else if(costMap.STATUS == "100"){
                buttonHtml += '<button type="button" id="costCanBtn" style="float: right; margin-bottom: 10px;" class="k-button k-button-solid-base" onclick="approveDocView(\''+costMap.DOC_ID+'\', \''+costMap.APPRO_KEY+'\', \''+costMap.DOC_MENU_CD+'\');">열람</button>';
            }else{
                buttonHtml += '<button type="button" id="costSaveBtn" style="float: right; margin-bottom: 10px;" class="k-button k-button-solid-info" onclick="costInfo.fn_save()">저장</button>';
            }
        } else {
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