var busiExnp = {
    fn_DefaultScript: function(){
        busiExnp.fn_pageSet();
    },

    fn_pageSet: function(){
        const hrBizReqId = $("#hrBizReqId").val();
        if(hrBizReqId != ""){
            const result = customKendo.fn_customAjax("/bustrip/getBustripReqInfo", {
                hrBizReqId: hrBizReqId
            });
            console.log(result);
            const busInfo = result.rs.rs;
            const resInfo = result.rs.rsRes;
            let e = busInfo;
            let p = resInfo;
            let html = '';

            if((e.BF_PAY_APP_SN == "" || e.BF_PAY_APP_SN) == null && e.BF_DOC_STATUS != 100){
                if(e.BF_EXP_STAT == 100 && e.BF_OVER_TOT_COST == 0){
                    html += '<td style="text-align: center;">-</td>'
                } else {
                    html += '<td style="text-align: center"><button type="button" class="k-button k-button-solid-base" onclick="bustPop.fn_busiPayAppPopup('+e.HR_BIZ_REQ_ID+')">지급신청</button></td>';
                }
            }else{
                html += '<td style="text-align: center"><button type="button" class="k-button k-button-solid-info" onclick="bustPop.fn_busiPayAppPopup('+e.BF_PAY_APP_SN+', 2)">지급신청</button></td>';
            }

            if(p != null){
                if(p.STATUS != "100"){
                    html += '<td style="text-align: center">-</td>';
                }else if(p.PAY_APP_SN != null && p.PAY_APP_SN != ""){
                    html += '<td style="text-align: center"><button type="button" class="k-button k-button-solid-info" onclick="busiExnp.fn_reqRegPopup('+p.PAY_APP_SN+', 2)">지급신청</button></td>';
                }else{
                    html += '<td style="text-align: center"><button type="button" class="k-button k-button-solid-base" onclick="busiExnp.fn_reqRegPopup('+p.HR_BIZ_REQ_RESULT_ID+')">지급신청</button></td>';
                }
            }else{
                html += '<td style="text-align: center">-</td>';
            }

            $("#buttonTr").html(html);
        }
    },

    fn_reqRegPopup : function (key, type){
        var url = "/payApp/pop/regPayAppPop.do?hrBizReqResultId="+key+"&reqType=business";

        if(type == 2){
            var url = "/payApp/pop/regPayAppPop.do?payAppSn="+key;
        }
        var name = "regPayAppPop";
        var option = "width = 1700, height = 820, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    },
}