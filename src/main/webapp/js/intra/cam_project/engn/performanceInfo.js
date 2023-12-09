var resultInfo = {

    fn_defaultScript: function(){
        commonProject.setPjtStat();
        resultInfo.fn_setData();
    },

    fn_setData: function(){
        const resultMap = customKendo.fn_customAjax("/project/engn/getResultInfo", {
            pjtSn: $("#pjtSn").val(),
        });
        resultInfo.fn_makeRowEngn(resultMap);
    },

    fn_makeRowEngn : function(rs){
        const pjtSn = $("#pjtSn").val()
        const result = customKendo.fn_customAjax("/project/engn/getResultPsMember", {
            pjtSn: pjtSn
        });
        const ls = result.list;

        var html = "";
        /** 첫 행 */
        html += '<tr>';
        html += '   <td style="text-align: center; background-color: #dee4ed"></td>';
        html += '   <td style="text-align: center; background-color: #dee4ed">총금액</td>';
        for(var i=0; i<ls.length; i++){
            html += '   <td colspan="2" style="text-align: center; background-color: #dee4ed">'+ls[i].PS_EMP_NM+'</td>';
        }
        html += '</tr>';

        const purcResult = customKendo.fn_customAjax("/purc/getProjectPurcList", {pjtSn: pjtSn});
        const purcList = purcResult.list;
        let invSum = 0;
        for(let i=0; i<purcList.length; i++){
            const map = purcList[i];
            invSum += Number(map.ITEM_UNIT_AMT);
        }
        const tripResult = customKendo.fn_customAjax("/project/getBustResInfo", {pjtSn: pjtSn});
        const trip = tripResult.map;
        if(trip.COUNT != 0){
            invSum += trip.BUSTRIP_EXNP_SUM;
        }

        /** 매출 금액 계산 */
        var invAmt = rs.pjtInfo.PJT_AMT;

        /** 수주 */
        html += '<tr>';
        html += '   <td style="text-align: center; background-color: #dee4ed">수주</td>';
        html += '   <td>' +
            '           <input type="text" disabled id="resultDelvTotAmt" value="0" style="text-align: right" onkeyup="resultInfo.inputNumberFormat(this)" oninput="resultInfo.onlyNumber(this)" />' +
            '       </td>';
        for(var i=0; i<ls.length; i++){
            var value = 0;
            var calcAmt = 0;
            var type = "";
            if(ls[i].PS_PREP == 1 || (ls[i].PS_PREP == 0 && i==0)){
                type = "A";
                if(rs.result.map != undefined){
                    if(rs.result.map.DELV_PREP_A != null && rs.result.map.DELV_PREP_A != ""){
                        value = rs.result.map.DELV_PREP_A;
                    }
                }
            } else if (ls[i].PS_PREP == 2 || (ls[i].PS_PREP == 0 && i==1)){
                type = "B";
                if(rs.result.map != undefined) {
                    if (rs.result.map.DELV_PREP_B != null && rs.result.map.DELV_PREP_B != "") {
                        value = rs.result.map.DELV_PREP_B;
                    }
                }
            } else if (ls[i].PS_PREP == 3 || (ls[i].PS_PREP == 0 && i==2)){
                type = "C";
                if(rs.result.map != undefined) {
                    if (rs.result.map.DELV_PREP_C != null && rs.result.map.DELV_PREP_C != "") {
                        value = rs.result.map.DELV_PREP_C;
                    }
                }
            } else if (ls[i].PS_PREP == 4 || (ls[i].PS_PREP == 0 && i==2)){
                type = "D";
                if(rs.result.map != undefined) {
                    if (rs.result.map.DELV_PREP_D != null && rs.result.map.DELV_PREP_D != "") {
                        value = rs.result.map.DELV_PREP_D;
                    }
                }
            } else if (ls[i].PS_PREP == 5 || (ls[i].PS_PREP == 0 && i==2)){
                type = "E";
                if(rs.result.map != undefined) {
                    if (rs.result.map.DELV_PREP_E != null && rs.result.map.DELV_PREP_E != "") {
                        value = rs.result.map.DELV_PREP_E;
                    }
                }
            } else if (ls[i].PS_PREP == 6 || (ls[i].PS_PREP == 0 && i==2)){
                type = "F";
                if(rs.result.map != undefined) {
                    if (rs.result.map.DELV_PREP_F != null && rs.result.map.DELV_PREP_F != "") {
                        value = rs.result.map.DELV_PREP_F;
                    }
                }
            }
            calcAmt = Math.round(rs.pjtInfo.PJT_AMT * (value * 0.01));

            html += '   <td>';
            html += '       <input type="text" id="delvPrepAmt'+type+'" onkeyup="resultInfo.inputNumberFormat(this)" oninput="resultInfo.onlyNumber(this)" disabled class="prepAmt" value="'+ resultInfo.comma(calcAmt) +'" style="text-align: right" />';
            html += '   </td>';
            html += '   <td style="text-align: right">';
            html += '       <input type="text" id="delvPrep'+type+'" onkeyup="resultInfo.fn_DelvCalcPercent(this , \''+type+'\');" oninput="resultInfo.onlyNumber(this)" class="prepCase" value="'+value+'" style="width: 80%; text-align: right" /> %';
            html += '   </td>';
        }
        html += '</tr>';

        /** 매출 */
        html += '<tr>';
        html += '   <td style="text-align: center; background-color: #dee4ed">매출</td>';
        html += '   <td>' +
            '           <input type="text" disabled id="resultInvTotAmt" value="0" style="text-align: right" onkeyup="resultInfo.inputNumberFormat(this)" oninput="resultInfo.onlyNumber(this)" />' +
            '       </td>';

        for(var i=0; i<ls.length; i++){
            var value = 0;
            var calcAmt = 0;
            var type = "";
            if(ls[i].PS_PREP == 1 || (ls[i].PS_PREP == 0 && i==0)){
                type = "A";
                if(rs.result.map != undefined){
                    if(rs.result.map.INV_PREP_A != null && rs.result.map.INV_PREP_A != ""){
                        value = rs.result.map.INV_PREP_A;
                    }
                }
            } else if (ls[i].PS_PREP == 2 || (ls[i].PS_PREP == 0 && i==1)){
                type = "B";
                if(rs.result.map != undefined) {
                    if (rs.result.map.INV_PREP_B != null && rs.result.map.INV_PREP_B != "") {
                        value = rs.result.map.INV_PREP_B;
                    }
                }
            } else if (ls[i].PS_PREP == 3 || (ls[i].PS_PREP == 0 && i==2)){
                type = "C";
                if(rs.result.map != undefined) {
                    if (rs.result.map.INV_PREP_C != null && rs.result.map.INV_PREP_C != "") {
                        value = rs.result.map.INV_PREP_C;
                    }
                }
            } else if (ls[i].PS_PREP == 4 || (ls[i].PS_PREP == 0 && i==2)){
                type = "D";
                if(rs.result.map != undefined) {
                    if (rs.result.map.INV_PREP_D != null && rs.result.map.INV_PREP_D != "") {
                        value = rs.result.map.INV_PREP_D;
                    }
                }
            } else if (ls[i].PS_PREP == 5 || (ls[i].PS_PREP == 0 && i==2)){
                type = "E";
                if(rs.result.map != undefined) {
                    if (rs.result.map.INV_PREP_E != null && rs.result.map.INV_PREP_E != "") {
                        value = rs.result.map.INV_PREP_E;
                    }
                }
            } else if (ls[i].PS_PREP == 6 || (ls[i].PS_PREP == 0 && i==2)){
                type = "F";
                if(rs.result.map != undefined) {
                    if (rs.result.map.INV_PREP_F != null && rs.result.map.INV_PREP_F != "") {
                        value = rs.result.map.INV_PREP_F;
                    }
                }
            }
            calcAmt = Math.round(invAmt * (value * 0.01));

            html += '   <td>';
            html += '       <input type="text" id="invPrepAmt'+type+'" onkeyup="resultInfo.inputNumberFormat(this)" oninput="resultInfo.onlyNumber(this)" disabled class="prepAmt" value="'+ resultInfo.comma(calcAmt) +'" style="text-align: right" />';
            html += '   </td>';
            html += '   <td style="text-align: right">';
            html += '       <input type="text" id="invPrep'+type+'" onkeyup="resultInfo.fn_InvCalcPercent(this , \''+type+'\');" oninput="resultInfo.onlyNumber(this)" class="prepCase" value="'+value+'" style="width: 80%; text-align: right" /> %';
            html += '   </td>';
        }
        html += '</tr>';

        /** 수익 */
        html += '<tr>';
        html += '   <td style="text-align: center; background-color: #dee4ed">수익</td>';
        html += '   <td>' +
            '           <input type="text" disabled id="resultTotAmt" value="0" style="text-align: right" onkeyup="resultInfo.inputNumberFormat(this)" oninput="resultInfo.onlyNumber(this)" />' +
            '       </td>';

        for(var i=0; i<ls.length; i++){
            var value = 0;
            var calcAmt = 0;
            var type = "";
            if(ls[i].PS_PREP == 1 || (ls[i].PS_PREP == 0 && i==0)){
                type = "A";
                if(rs.result.map != undefined){
                    if(rs.result.map.PREP_A != null && rs.result.map.PREP_A != ""){
                        value = rs.result.map.PREP_A;
                    }
                }
            } else if (ls[i].PS_PREP == 2 || (ls[i].PS_PREP == 0 && i==1)){
                type = "B";
                if(rs.result.map != undefined) {
                    if (rs.result.map.PREP_B != null && rs.result.map.PREP_B != "") {
                        value = rs.result.map.PREP_B;
                    }
                }
            } else if (ls[i].PS_PREP == 3 || (ls[i].PS_PREP == 0 && i==2)){
                type = "C";
                if(rs.result.map != undefined) {
                    if (rs.result.map.PREP_C != null && rs.result.map.PREP_C != "") {
                        value = rs.result.map.PREP_C;
                    }
                }
            } else if (ls[i].PS_PREP == 4 || (ls[i].PS_PREP == 0 && i==2)){
                type = "D";
                if(rs.result.map != undefined) {
                    if (rs.result.map.PREP_D != null && rs.result.map.PREP_D != "") {
                        value = rs.result.map.PREP_D;
                    }
                }
            } else if (ls[i].PS_PREP == 5 || (ls[i].PS_PREP == 0 && i==2)){
                type = "E";
                if(rs.result.map != undefined) {
                    if (rs.result.map.PREP_E != null && rs.result.map.PREP_E != "") {
                        value = rs.result.map.PREP_E;
                    }
                }
            } else if (ls[i].PS_PREP == 6 || (ls[i].PS_PREP == 0 && i==2)){
                type = "F";
                if(rs.result.map != undefined) {
                    if (rs.result.map.PREP_F != null && rs.result.map.PREP_F != "") {
                        value = rs.result.map.PREP_F;
                    }
                }
            }
            calcAmt = Math.round((rs.pjtInfo.PJT_AMT - invSum) * (value * 0.01));

            html += '   <td>';
            html += '       <input type="text" id="prepAmt'+type+'" onkeyup="resultInfo.inputNumberFormat(this)" oninput="resultInfo.onlyNumber(this)" disabled class="prepAmt" value="'+ resultInfo.comma(calcAmt) +'" style="text-align: right" />';
            html += '   </td>';
            html += '   <td style="text-align: right">';
            html += '       <input type="text" id="prep'+type+'" onkeyup="resultInfo.fn_calcPercent(this , \''+type+'\');" oninput="resultInfo.onlyNumber(this)" class="prepCase" value="'+value+'" style="width: 80%; text-align: right" /> %';
            html += '   </td>';
        }
        html += '</tr>';

        $("#psRsTable").append(html);
        $(".prepAmt, .prepCase, #resultDelvTotAmt, #resultInvTotAmt, #resultTotAmt").kendoTextBox();

        $("#resultDelvTotAmt").val(resultInfo.comma(rs.pjtInfo.PJT_AMT));
        $("#resultInvTotAmt").val(resultInfo.comma(rs.pjtInfo.PJT_AMT));
        $("#resultTotAmt").val(resultInfo.comma(rs.pjtInfo.PJT_AMT - invSum));
    },

    fn_DelvCalcPercent : function (obj, type){
        var A = $("#delvPrepA").val();
        var B = $("#delvPrepB").val();
        var C = $("#delvPrepC").val();
        var D = $("#delvPrepD").val();
        var E = $("#delvPrepE").val();
        var F = $("#delvPrepF").val();

        if(A == undefined){
            A = 0;
        }
        if(B == undefined){
            B = 0;
        }
        if(C == undefined){
            C = 0;
        }
        if(D == undefined){
            D = 0;
        }
        if(E == undefined){
            E = 0;
        }
        if(F == undefined){
            F = 0;
        }

        if((Number(A) + Number(B) + Number(C) + Number(D) + Number(E) + Number(F)) > 100){
            alert("실적률이 100%를 초과하였습니다.");
            return;
        }

        $("#delvPrepAmt" + type).val(resultInfo.comma(Math.round(resultInfo.uncomma($("#resultDelvTotAmt").val()) * (resultInfo.uncomma(obj.value) * 0.01))));

        return resultInfo.inputNumberFormat(obj);
    },

    fn_InvCalcPercent : function (obj, type){
        var A = $("#invPrepA").val();
        var B = $("#invPrepB").val();
        var C = $("#invPrepC").val();
        var D = $("#invPrepD").val();
        var E = $("#invPrepE").val();
        var F = $("#invPrepF").val();

        if(A == undefined){
            A = 0;
        }
        if(B == undefined){
            B = 0;
        }
        if(C == undefined){
            C = 0;
        }
        if(D == undefined){
            D = 0;
        }
        if(E == undefined){
            E = 0;
        }
        if(F == undefined){
            F = 0;
        }

        if((Number(A) + Number(B) + Number(C) + Number(D) + Number(E) + Number(F)) > 100){
            alert("실적률이 100%를 초과하였습니다.");
            return;
        }

        $("#invPrepAmt" + type).val(resultInfo.comma(Math.round(resultInfo.uncomma($("#resultInvTotAmt").val()) * (resultInfo.uncomma(obj.value) * 0.01))));

        return resultInfo.inputNumberFormat(obj);
    },

    fn_calcPercent : function (obj, type){
        var A = $("#prepA").val();
        var B = $("#prepB").val();
        var C = $("#prepC").val();
        var D = $("#prepD").val();
        var E = $("#prepE").val();
        var F = $("#prepF").val();

        if(A == undefined){
            A = 0;
        }
        if(B == undefined){
            B = 0;
        }
        if(C == undefined){
            C = 0;
        }
        if(D == undefined){
            D = 0;
        }
        if(E == undefined){
            E = 0;
        }
        if(F == undefined){
            F = 0;
        }

        if((Number(A) + Number(B) + Number(C) + Number(D) + Number(E) + Number(F)) > 100){
            alert("실적률이 100%를 초과하였습니다.");
            return;
        }

        $("#prepAmt" + type).val(resultInfo.comma(Math.round(resultInfo.uncomma($("#resultTotAmt").val()) * (resultInfo.uncomma(obj.value) * 0.01))));

        return resultInfo.inputNumberFormat(obj);
    },

    fn_save : function (){
        var delvA = $("#delvPrepA").val();
        var delvB = $("#delvPrepB").val();
        var delvC = $("#delvPrepC").val();
        var delvD = $("#delvPrepD").val();
        var delvE = $("#delvPrepE").val();
        var delvF = $("#delvPrepF").val();

        var invA = $("#invPrepA").val();
        var invB = $("#invPrepB").val();
        var invC = $("#invPrepC").val();
        var invD = $("#invPrepD").val();
        var invE = $("#invPrepE").val();
        var invF = $("#invPrepF").val();

        var A = $("#prepA").val();
        var B = $("#prepB").val();
        var C = $("#prepC").val();
        var D = $("#prepD").val();
        var E = $("#prepE").val();
        var F = $("#prepF").val();

        if(delvA == undefined){ delvA = 0; }
        if(delvB == undefined){ delvB = 0; }
        if(delvC == undefined){ delvC = 0; }
        if(delvD == undefined){ delvD = 0; }
        if(delvE == undefined){ delvE = 0; }
        if(delvF == undefined){ delvF = 0; }

        if(invA == undefined){ invA = 0; }
        if(invB == undefined){ invB = 0; }
        if(invC == undefined){ invC = 0; }
        if(invD == undefined){ invD = 0; }
        if(invE == undefined){ invE = 0; }
        if(invF == undefined){ invF = 0; }

        if(A == undefined){ A = 0; }
        if(B == undefined){ B = 0; }
        if(C == undefined){ C = 0; }
        if(D == undefined){ D = 0; }
        if(E == undefined){ E = 0; }
        if(F == undefined){ F = 0; }

        if((Number(delvA) + Number(delvB) + Number(delvC) + Number(delvD) + Number(delvE) + Number(delvF)) > 100){
            alert("수주 실적률이 100%를 초과하였습니다.");
            return;
        }

        if((Number(invA) + Number(invB) + Number(invC) + Number(invD) + Number(invE) + Number(invF)) > 100){
            alert("매출 실적률이 100%를 초과하였습니다.");
            return;
        }

        if((Number(A) + Number(B) + Number(C) + Number(D) + Number(E) + Number(F)) > 100){
            alert("수익 실적률이 100%를 초과하였습니다.");
            return;
        }

        if((Number(delvA) + Number(delvB) + Number(delvC) + Number(delvD) + Number(delvE) + Number(delvF)) < 100){
            alert("수주 실적률이 100% 미만입니다.");
            return;
        }

        if((Number(invA) + Number(invB) + Number(invC) + Number(invD) + Number(invE) + Number(invF)) < 100){
            alert("매출 실적률이 100% 미만입니다.");
            return;
        }

        if((Number(A) + Number(B) + Number(C) + Number(D) + Number(E) + Number(F)) < 100){
            alert("수익 실적률이 100% 미만입니다.");
            return;
        }

        var data = {
            pjtSn: $("#pjtSn").val(),
            empSeq: $("#empSeq").val(),
        }

        var fd = new FormData();

        if($("#delvPrepA").val() != undefined){
            data.delvPrepA = $("#delvPrepA").val();
            fd.append("delvPrepA", data.delvPrepA);
        }
        if($("#delvPrepB").val() != undefined){
            data.delvPrepB = $("#delvPrepB").val();
            fd.append("delvPrepB", data.delvPrepB);
        }
        if($("#delvPrepC").val() != undefined){
            data.delvPrepC = $("#delvPrepC").val();
            fd.append("delvPrepC", data.delvPrepC);
        }
        if($("#delvPrepD").val() != undefined){
            data.delvPrepD = $("#delvPrepD").val();
            fd.append("delvPrepD", data.delvPrepD);
        }
        if($("#delvPrepE").val() != undefined){
            data.delvPrepE = $("#delvPrepE").val();
            fd.append("delvPrepE", data.delvPrepE);
        }
        if($("#delvPrepF").val() != undefined){
            data.delvPrepF = $("#delvPrepF").val();
            fd.append("delvPrepF", data.delvPrepF);
        }

        if($("#invPrepA").val() != undefined){
            data.invPrepA = $("#invPrepA").val();
            fd.append("invPrepA", data.invPrepA);
        }
        if($("#invPrepB").val() != undefined){
            data.invPrepB = $("#invPrepB").val();
            fd.append("invPrepB", data.invPrepB);
        }
        if($("#invPrepC").val() != undefined){
            data.invPrepC = $("#invPrepC").val();
            fd.append("invPrepC", data.invPrepC);
        }
        if($("#invPrepD").val() != undefined){
            data.invPrepD = $("#invPrepD").val();
            fd.append("invPrepD", data.invPrepD);
        }
        if($("#invPrepE").val() != undefined){
            data.invPrepE = $("#invPrepE").val();
            fd.append("invPrepE", data.invPrepE);
        }
        if($("#invPrepF").val() != undefined){
            data.invPrepF = $("#invPrepF").val();
            fd.append("invPrepF", data.invPrepF);
        }

        if($("#prepA").val() != undefined){
            data.prepA = $("#prepA").val();
            fd.append("prepA", data.prepA);
        }
        if($("#prepB").val() != undefined){
            data.prepB = $("#prepB").val();
            fd.append("prepB", data.prepB);
        }
        if($("#prepC").val() != undefined){
            data.prepC = $("#prepC").val();
            fd.append("prepC", data.prepC);
        }
        if($("#prepD").val() != undefined){
            data.prepD = $("#prepD").val();
            fd.append("prepD", data.prepD);
        }
        if($("#prepE").val() != undefined){
            data.prepE = $("#prepE").val();
            fd.append("prepE", data.prepE);
        }
        if($("#prepF").val() != undefined){
            data.prepF = $("#prepF").val();
            fd.append("prepF", data.prepF);
        }

        fd.append("pjtSn", data.pjtSn);
        fd.append("empSeq", data.empSeq);

        $.ajax({
            url: "/project/engn/setPerformanceInfo",
            data: fd,
            type: "post",
            dataType: "json",
            contentType: false,
            processData: false,
            enctype: 'multipart/form-data',
            async: false,
            success: function(rs){
                if(rs.code == 200){
                    commonProject.getReloadPage(8, 9, 9, 4, 2, 2);
                }
            }
        });
    },

    inputNumberFormat : function(obj){
        obj.value = resultInfo.comma(resultInfo.uncomma(obj.value));
    },

    onlyNumber : function(e){
        e.value = e.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
    },

    comma : function(str){
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    },

    uncomma : function(str){
        str = String(str);
        return str.replace(/[^\d]+/g, '');
    }
}