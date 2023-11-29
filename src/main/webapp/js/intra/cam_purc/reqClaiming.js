var reqCl = {



    fn_defaultScript : function(){

        customKendo.fn_textBox(["pjtNm", "purcDeptName", "purcEmpName", "claimEtc"
                                ,"claimTitle", "purcReqPurpose", "crmNm"
                                ,"estAmt", "vatAmt", "totAmt", "itemNm", "itemStd"
                                ,"itemEa", "itemUnitAmt", "itemUnit", "purcItemAmt", "itemAmt", "itemEtc", "difAmt"])

        var radioDataSource = [
            { label: "법인운영", value: "" },
            { label: "R&D", value: "R" },
            { label: "비R&D", value: "S" },
            { label: "엔지니어링", value: "D" },
            { label: "용역/기타", value: "V" },
        ]

        var radioExpDataSource = [
            { label: "법인운영", value: "" },
            { label: "R&D", value: "R" },
            { label: "비R&D", value: "S" },
            { label: "엔지니어링", value: "D" },
            { label: "용역/기타", value: "V" },
        ]

        var radioVatDataSource = [
            { label: "부가세 포함", value: "Y" },
            { label: "부가세 미포함", value: "N" },
            { label: "면세", value: "D" },
        ]

        var radioProdDataSource = [
            { label: "해당없음", value: "N" },
            { label: "자산", value: "A" },
            { label: "유지보수", value: "E" },
        ]

        customKendo.fn_radioGroup("purcType", radioDataSource, "horizontal");
        customKendo.fn_radioGroup("expType", radioExpDataSource, "horizontal");
        customKendo.fn_radioGroup("vat", radioVatDataSource, "horizontal");
        customKendo.fn_radioGroup("prodCd", radioProdDataSource, "horizontal");

        $("input[name='purcType']").click(function(){
            if($("input[name='purcType']:checked").val() != ""){
                $("#project").css("display", "");
            } else {
                $("#project").css("display", "none");
                $("#pjtSn").val("");
                $("#pjtNm").val("");
            }
        });

        customKendo.fn_datePicker("claimDe", "month", "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("expDe", "month", "yyyy-MM-dd", new Date());

        if($("#purcSn").val() != ""){
            var data = {
                claimSn : $("#claimSn").val(),
                purcSn : $("#purcSn").val()
            }

            var rs = customKendo.fn_customAjax("/purc/getPurcReq.do", data);
            var data = rs.data;

            $("#purcDeptName").val(data.DEPT_NAME);
            $("#purcDeptSeq").val(data.DEPT_SEQ);
            $("#purcEmpName").val(data.EMP_NAME_KR);
            $("#purcEmpSeq").val(data.EMP_SEQ);

            if($("#claimSn").val() == ""){
                reqCl.fn_setItem(data);
                $("#purcReqPurpose").val(data.PURC_REQ_PURPOSE);
            } else {
                var data = {
                    claimSn : $("#claimSn").val(),
                    purcSn : $("#purcSn").val()
                }

                rs = customKendo.fn_customAjax("/purc/getPurcClaimData", data);
                data = rs.data;

                console.log(data);

                $("#estAmt").val(comma(data.EST_AMT));
                $("#vatAmt").val(comma(data.VAT_AMT));
                $("#totAmt").val(comma(data.TOT_AMT));

                $("#vat").data("kendoRadioGroup").value(data.VAT);

                $("#expType").data("kendoRadioGroup").value(data.EXP_TYPE);

                this.fn_setClaimItem(data);
                reqCl.fn_kendoUIEnableSet(data);
                reqCl.fn_ClaimBtnSet(data);
            }

            $("#purcType").data("kendoRadioGroup").value(data.PURC_TYPE);
            if($("input[name='purcType']:checked").val() != ""){
                $("#project").css("display", "");
                $("#pjtSn").val(data.PJT_SN);
                $("#pjtNm").val(data.PJT_NM);
            } else {
                $("#project").css("display", "none");
            }
        } else if($("#claimSn").val() != "") {
            var data = {
                claimSn : $("#claimSn").val(),
                purcSn : $("#purcSn").val()
            }

            rs = customKendo.fn_customAjax("/purc/getPurcClaimData", data);
            data = rs.data;

            $("#purcDeptName").val(data.DEPT_NAME);
            $("#purcDeptSeq").val(data.DEPT_SEQ);
            $("#purcEmpName").val(data.EMP_NAME_KR);
            $("#purcEmpSeq").val(data.EMP_SEQ);

            $("#estAmt").val(comma(data.EST_AMT));
            $("#vatAmt").val(comma(data.VAT_AMT));
            $("#totAmt").val(comma(data.TOT_AMT));

            $("#vat").data("kendoRadioGroup").value(data.VAT);

            $("#expType").data("kendoRadioGroup").value(data.EXP_TYPE);

            $("#purcType").data("kendoRadioGroup").value(data.PURC_TYPE);
            if($("input[name='purcType']:checked").val() != ""){
                $("#project").css("display", "");
                $("#pjtSn").val(data.PJT_SN);
                $("#pjtNm").val(data.PJT_NM);
            } else {
                $("#project").css("display", "none");
            }

            this.fn_setClaimItem(data);
            reqCl.fn_kendoUIEnableSet(data);
            reqCl.fn_ClaimBtnSet(data);
        }

        $("#vat").data("kendoRadioGroup").bind("select", function(e){
            var len = $("#claimTbody > tr").length;
            var vatAmt = 0;
            var itemAmt = 0;
            var totAmt = 0;
            for(var i = 0 ; i < len ; i++){
                if(i == 0){
                    totAmt += Number(uncomma($("#itemAmt").val()));
                } else {
                    totAmt += Number(uncomma($("#itemAmt" + i).val()));
                }
            }

            if(e.target.val() == "N"){
                vatAmt = (totAmt / 10);
                $("#estAmt").val(comma(totAmt - vatAmt));
                $("#vatAmt").val(comma(vatAmt));
            } else {
                $("#estAmt").val(comma(totAmt));
                $("#vatAmt").val(0);
            }
            $("#totAmt").val(comma(totAmt));
        });
    },

    fn_amtCalculator : function(){

        var len = $("#claimTbody > tr").length;
        var vatAmt = 0;
        var itemAmt = 0;
        var totAmt = 0;
        for(var i = 0 ; i < len ; i++){
            if(i == 0){
                totAmt += Number(uncomma($("#itemAmt").val()));
            } else {
                totAmt += Number(uncomma($("#itemAmt" + i).val()));
            }
        }

        if($("#vat").data("kendoRadioGroup").value() == "N"){
            vatAmt = (totAmt / 10);
            $("#estAmt").val(comma(totAmt - vatAmt));
            $("#vatAmt").val(comma(vatAmt));
        } else {
            $("#estAmt").val(comma(totAmt));
            $("#vatAmt").val(0);
        }
        $("#totAmt").val(comma(totAmt));
    },

    fn_popCamCrmList : function(){
        var url = "/crm/pop/popCrmList.do";
        var name = "_blank";
        var option = "width = 1300, height = 670, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    fn_calc : function(idx, e){
        $("#itemAmt" + idx).val(comma(uncomma($("#itemUnitAmt" + idx).val()) * uncomma($("#itemEa" + idx).val())));
        $("#difAmt" + idx).val(comma(uncomma($("#purcItemAmt" + idx).val()) - uncomma($("#itemAmt" + idx).val())));

        reqCl.fn_amtCalculator();


        return inputNumberFormat(e);
    },

    addRow : function(){
        var len = $("#claimTbody > tr").length;
        var html = '';

        html += '<tr class="claimItem newArray" id="item'+len+'">';
        html += '   <td style="text-align: center">' +
            '           <div id="claimIndex">'+(len + 1)+'</div>' +
            '       </td>' +
            '       <td>' +
            '           <input type="text" id="itemNm'+len+'" class="itemNm">' +
            '       </td>' +
            '       <td>' +
            '           <input type="text" id="itemStd'+len+'" class="itemStd">' +
            '       </td>' +
            '       <td>' +
            '           <input type="text" id="itemEa'+len+'" style="text-align: right" class="itemEa" onkeyup="reqCl.fn_calc(\''+len+'\', this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
            '       </td>' +
            '       <td>' +
            '           <input type="text" id="itemUnitAmt'+len+'" style="text-align: right" class="itemUnitAmt" onkeyup="reqCl.fn_calc(\''+len+'\', this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
            '       </td>' +
            '       <td>' +
            '           <input type="text" id="itemUnit'+len+'" class="itemUnit">' +
            '       </td>' +
            '       <td>' +
            '           <input type="text" id="itemAmt'+len+'" class="itemAmt" style="text-align: right" disabled onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
            '       </td>' +
            '       <td>' +
            '           <input type="text" id="purcItemAmt'+len+'" class="purcItemAmt" style="text-align: right" disabled onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
            '       </td>' +
            '       <td>' +
            '           <input id="difAmt'+len+'" class="difAmt" value="'+comma(0)+'" style="text-align: right" disabled onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
            '       </td>' +
            '       <td>' +
            '           <label for="itemEtc'+len+'"></label><input type="text" id="itemEtc'+len+'" class="itemEtc">' +
            '       </td>' +
            '       <td>' +
            '           <span id="prodCd'+len+'"></span>' +
            '       </td>' +
            '       <td style="text-align: center" class="listDelBtn">' +
            '           <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="reqCl.fn_delete(this)">' +
            '               <span class="k-button-text">삭제</span>' +
            '           </button>' +
            '       </td>';
        html += '</tr>';

        $("#claimTbody").append(html);

        customKendo.fn_textBox(["itemNm" + len, "itemStd" + len, "difAmt" + len
            ,"itemEa" + len, "itemUnitAmt" + len, "itemUnit" + len, "itemAmt" + len, "purcItemAmt" + len, "itemEtc" + len])

        var radioProdDataSource = [
            { label: "해당없음", value: "N" },
            { label: "자산", value: "A" },
            { label: "유지보수", value: "E" },
        ]

        customKendo.fn_radioGroup("prodCd" + len, radioProdDataSource, "horizontal");
    },

    fn_delete : function(e){
        var len = $("#claimTbody > tr").length

        if(len > 1){
            $(e).closest("tr").remove()
        }
    },

    fn_save : function(){
        var parameters = {
            purcSn : $("#purcSn").val(),
            purcEmpSeq : $("#purcEmpSeq").val(),
            purcDeptSeq : $("#purcDeptSeq").val(),
            purcEmpName : $("#purcEmpName").val(),
            purcDeptName : $("#purcDeptName").val(),
            claimDe : $("#claimDe").val(),
            expDe : $("#expDe").val(),
            purcType : $("#purcType").data("kendoRadioGroup").value(),
            pjtSn : $("#pjtSn").val(),
            pjtNm : $("#pjtNm").val(),
            expType : $("#expType").data("kendoRadioGroup").value(),
            claimEtc : $("#claimEtc").val(),
            loginEmpSeq : $("#loginEmpSeq").val(),
            claimTitle : $("#claimTitle").val(),
            purcReqPurpose : $("#purcReqPurpose").val(),
            crmSn : $("#crmSn").val(),
            crmNm : $("#crmNm").val(),
            vat : $("#vat").data("kendoRadioGroup").value(),
            loginEmpSeq : $("#loginEmpSeq").val(),
            estAmt : uncomma($("#estAmt").val()),
            vatAmt : uncomma($("#vatAmt").val()),
            totAmt : uncomma($("#totAmt").val())
        }

        if($("#claimSn").val() != ""){
            parameters.claimSn = $("#claimSn").val();
        }

        if(parameters.loginEmpSeq == ""){
            alert("오류가 발생하였습니다. \n관리자에게 문의하세요.");
            return;
        }

        if(parameters.purcType != ""){
            if(parameters.pjtSn == ""){
                alert("프로젝트를 선택해주세요.");
                return;
            }
        }
        if(parameters.purcEmpSeq == ""){
            alert("구매요청자를 선택해주세요.");
            return;
        }

        if(parameters.claimTitle == ""){
            alert("제목을 입력해주세요.");
            return;
        }
        if(parameters.purcReqPurpose == ""){
            alert("구매목적을 입력해주세요.");
            return;
        }
        if(parameters.crmSn == ""){
            alert("구매업체를 선택해주세요.");
            return;
        }
        if(parameters.vat == ""){
            alert("부가세 방식을 선택해주세요.");
            return;
        }



        var len = $("#claimTbody > tr").length;

        var itemArr = new Array()
        for(var i = 0 ; i < len ; i++){
            var itemParameters = {};
            if(i == 0){
                if($("#claimItemSn").val() != ""){
                    itemParameters.claimItemSn = $("#claimItemSn").val();
                }
                itemParameters.itemNm = $("#itemNm").val();
                itemParameters.itemStd = $("#itemStd").val();
                itemParameters.itemEa = uncomma($("#itemEa").val());
                itemParameters.itemUnitAmt = uncomma($("#itemUnitAmt").val());
                itemParameters.itemUnit = $("#itemUnit").val();
                itemParameters.itemAmt = uncomma($("#itemAmt").val());
                itemParameters.purcItemAmt = uncomma($("#purcItemAmt").val());
                itemParameters.difAmt = $("#difAmt").val().replace(/,/g, '');
                itemParameters.itemEtc = $("#itemEtc").val();
                itemParameters.prodCd = $("#prodCd").data("kendoRadioGroup").value();
            } else {
                if($("#claimItemSn").val() != ""){
                    itemParameters.claimItemSn = $("#claimItemSn" + i).val();
                }
                itemParameters.itemNm = $("#itemNm" + i).val();
                itemParameters.itemStd = $("#itemStd" + i).val();
                itemParameters.itemEa = uncomma($("#itemEa" + i).val());
                itemParameters.itemUnitAmt = uncomma($("#itemUnitAmt" + i).val());
                itemParameters.itemUnit = $("#itemUnit" + i).val();
                itemParameters.itemAmt = uncomma($("#itemAmt" + i).val());
                itemParameters.purcItemAmt = uncomma($("#purcItemAmt" + i).val());
                itemParameters.difAmt = $("#difAmt" + i).val().replace(/,/g, '');
                itemParameters.itemEtc = $("#itemEtc" + i).val();
                itemParameters.prodCd = $("#prodCd" + i).data("kendoRadioGroup").value();
            }

            if(itemParameters.itemNm != ""){
                itemArr.push(itemParameters);
            }
        }

        parameters.itemArr = JSON.stringify(itemArr);

        $.ajax({
            url : "/purc/setPurcClaimData",
            data : parameters,
            type : "post",
            dataType : "json",
            success : function(rs){
                if(rs.code == 200){
                    alert("저장되었습니다.");

                    location.href = "/purc/pop/reqClaiming.do?claimSn=" + rs.params.claimSn;
                }
            }
        });
    },
    fn_projectPop : function(){

        var url = "/project/pop/projectView.do?busnClass="+ $("input[name='purcType']:checked").val();

        var name = "_blank";
        var option = "width = 1100, height = 400, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    fn_setItem : function(e){

        console.log(e);
        var len = e.itemList.length;
        var index = 0;
        var html = '';
        $("#claimTbody").html("");
        for(var i = 0 ; i < len ; i++){
            if(e.itemList[i].STATUS == "C"){

                if(index == 0){
                    html += '<tr class="claimItem newArray" id="item">';
                    html += '   <td style="text-align: center">' +
                        '           <div id="claimIndex">'+(index+1)+'</div>' +
                        '           <input type="hidden" id="claimItemSn" />' +
                        '       </td>' +
                        '       <td>' +
                        '           <input type="text" id="itemNm" class="itemNm" value="'+e.itemList[i].PURC_ITEM_NAME+'">' +
                        '       </td>' +
                        '       <td>' +
                        '           <input type="text" id="itemStd" class="itemStd" value="'+e.itemList[i].PURC_ITEM_STD+'">' +
                        '       </td>' +
                        '       <td>' +
                        '           <input type="text" id="itemEa" style="text-align: right" value="'+comma(e.itemList[i].PURC_ITEM_QTY)+'" class="itemEa" onkeyup="reqCl.fn_calc(\'\', this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                        '       </td>' +
                        '       <td>' +
                        '           <input type="text" id="itemUnitAmt" style="text-align: right" value="'+comma(e.itemList[i].PURC_ITEM_UNIT_PRICE)+'" class="itemUnitAmt" onkeyup="reqCl.fn_calc(\'\', this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                        '       </td>' +
                        '       <td>' +
                        '           <input type="text" id="itemUnit" class="itemUnit" value="'+e.itemList[i].PURC_ITEM_UNIT+'">' +
                        '       </td>' +
                        '       <td>' +
                        '           <input type="text" id="itemAmt" class="itemAmt" value="'+comma(e.itemList[i].PURC_ITEM_AMT)+'" style="text-align: right" disabled onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                        '       </td>' +
                        '       <td>' +
                        '           <input id="purcItemAmt" class="purcItemAmt" value="'+comma(e.itemList[i].PURC_ITEM_AMT)+'" style="text-align: right" disabled onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                        '       </td>' +
                        '       <td>' +
                        '           <input id="difAmt" class="difAmt" value="'+comma(0)+'" style="text-align: right" disabled onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                        '       </td>' +
                        '       <td>' +
                        '           <label for="itemEtc"></label><input type="text" id="itemEtc" value="'+e.itemList[i].RMK+'" class="itemEtc">' +
                        '       </td>' +
                        '       <td>' +
                        '           <span id="prodCd"></span>' +
                        '       </td>' +
                        '       <td style="text-align: center" class="listDelBtn">' +
                        '           <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="reqCl.fn_delete(this)">' +
                        '               <span class="k-button-text">삭제</span>' +
                        '           </button>' +
                        '       </td>';
                    html += '</tr>';
                } else {
                    html += '<tr class="claimItem newArray" id="item'+len+'">';
                    html += '   <td style="text-align: center">' +
                        '           <div id="claimIndex">'+(index+1)+'</div>' +
                        '           <input type="hidden" id="claimItemSn'+index+'" />' +
                        '       </td>' +
                        '       <td>' +
                        '           <input type="text" id="itemNm'+index+'" class="itemNm" value="'+e.itemList[i].PURC_ITEM_NAME+'">' +
                        '       </td>' +
                        '       <td>' +
                        '           <input type="text" id="itemStd'+index+'" class="itemStd" value="'+e.itemList[i].PURC_ITEM_STD+'">' +
                        '       </td>' +
                        '       <td>' +
                        '           <input type="text" id="itemEa'+index+'" style="text-align: right" class="itemEa" value="'+comma(e.itemList[i].PURC_ITEM_QTY)+'" onkeyup="reqCl.fn_calc(\''+index+'\', this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                        '       </td>' +
                        '       <td>' +
                        '           <input type="text" id="itemUnitAmt'+index+'" style="text-align: right" class="itemUnitAmt" value="'+comma(e.itemList[i].PURC_ITEM_UNIT_PRICE)+'" onkeyup="reqCl.fn_calc(\''+index+'\', this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                        '       </td>' +
                        '       <td>' +
                        '           <input type="text" id="itemUnit'+index+'" class="itemUnit" value="'+e.itemList[i].PURC_ITEM_UNIT+'">' +
                        '       </td>' +
                        '       <td>' +
                        '           <input type="text" id="itemAmt'+index+'" class="itemAmt" style="text-align: right" value="'+comma(e.itemList[i].PURC_ITEM_AMT)+'" disabled onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                        '       </td>' +
                        '       <td>' +
                        '           <input id="purcItemAmt'+index+'" class="purcItemAmt" value="'+comma(e.itemList[i].PURC_ITEM_AMT)+'" style="text-align: right" disabled onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                        '       </td>' +
                        '       <td>' +
                        '           <input id="difAmt'+index+'" class="difAmt" value="'+comma(0)+'" style="text-align: right" disabled onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                        '       </td>' +
                        '       <td>' +
                        '           <label for="itemEtc'+index+'"></label><input type="text" id="itemEtc'+index+'" value="'+e.itemList[i].RMK+'" class="itemEtc">' +
                        '       </td>' +
                        '       <td>' +
                        '           <span id="prodCd'+index+'"></span>' +
                        '       </td>' +
                        '       <td style="text-align: center" class="listDelBtn">' +
                        '           <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="reqCl.fn_delete(this)">' +
                        '               <span class="k-button-text">삭제</span>' +
                        '           </button>' +
                        '       </td>';
                    html += '</tr>';
                }

                index++;
            }
        }


        $("#claimTbody").append(html);


        var tLen = $("#claimTbody > tr").length;
        var radioProdDataSource = [
            { label: "해당없음", value: "N" },
            { label: "자산", value: "A" },
            { label: "유지보수", value: "E" },
        ]
        for(var i = 0 ; i < tLen ; i++){
            if(i == 0){
                customKendo.fn_textBox(["itemNm", "itemStd", "itemEa", "itemUnitAmt", "itemUnit", "itemAmt", "purcItemAmt", "difAmt", "itemEtc"]);
                customKendo.fn_radioGroup("prodCd", radioProdDataSource, "horizontal");
            } else {
                customKendo.fn_textBox(["itemNm" + i, "itemStd" + i
                    ,"itemEa" + i, "itemUnitAmt" + i, "itemUnit" + i, "itemAmt" + i, "purcItemAmt" + i, "difAmt" + i, "itemEtc" + i])

                customKendo.fn_radioGroup("prodCd" + i, radioProdDataSource, "horizontal");
            }
        }

        this.fn_amtCalculator();
    },

    fn_setClaimItem : function(e){
        var len = e.itemList.length;
        var index = 0;
        var html = '';
        $("#claimTbody").html("");
        for(var i = 0 ; i < len ; i++){
            if(index == 0){
                html += '<tr class="claimItem newArray" id="item">';
                html += '   <td style="text-align: center">' +
                    '           <div id="claimIndex">'+(index+1)+'</div>' +
                    '           <input type="hidden" id="claimItemSn" value="'+e.itemList[i].CLAIM_ITEM_SN+'" />' +
                    '       </td>' +
                    '       <td>' +
                    '           <input type="text" id="itemNm" class="itemNm" value="'+e.itemList[i].ITEM_NM+'">' +
                    '       </td>' +
                    '       <td>' +
                    '           <input type="text" id="itemStd" class="itemStd" value="'+e.itemList[i].ITEM_STD+'">' +
                    '       </td>' +
                    '       <td>' +
                    '           <input type="text" id="itemEa" style="text-align: right" value="'+comma(e.itemList[i].ITEM_EA)+'" class="itemEa" onkeyup="reqCl.fn_calc(\'\', this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                    '       </td>' +
                    '       <td>' +
                    '           <input type="text" id="itemUnitAmt" style="text-align: right" value="'+comma(e.itemList[i].ITEM_UNIT_AMT)+'" class="itemUnitAmt" onkeyup="reqCl.fn_calc(\'\', this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                    '       </td>' +
                    '       <td>' +
                    '           <input type="text" id="itemUnit" class="itemUnit" value="'+e.itemList[i].ITEM_UNIT+'">' +
                    '       </td>' +
                    '       <td>' +
                    '           <input type="text" id="itemAmt" class="itemAmt" value="'+comma(e.itemList[i].ITEM_AMT)+'" style="text-align: right" disabled onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                    '       </td>' +
                    '       <td>' +
                    '           <input type="text" id="purcItemAmt" class="purcItemAmt" value="'+comma(e.itemList[i].PURC_ITEM_AMT)+'" style="text-align: right" disabled onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                    '       </td>' +
                    '       <td>' +
                    '           <input type="text" id="difAmt" class="purcItemAmt" value="'+comma(e.itemList[i].DIF_AMT)+'" style="text-align: right" disabled onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                    '       </td>' +
                    '       <td>' +
                    '           <label for="itemEtc"></label><input type="text" id="itemEtc" value="'+e.itemList[i].ITEM_ETC+'" class="itemEtc">' +
                    '       </td>' +
                    '       <td>' +
                    '           <span id="prodCd"></span>' +
                    '       </td>' +
                    '       <td style="text-align: center" class="listDelBtn">' +
                    '           <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="reqCl.fn_delete(this)">' +
                    '               <span class="k-button-text">삭제</span>' +
                    '           </button>' +
                    '       </td>';
                html += '</tr>';
            } else {
                html += '<tr class="claimItem newArray" id="item'+len+'">';
                html += '   <td style="text-align: center">' +
                    '           <div id="claimIndex">'+(index+1)+'</div>' +
                    '           <input type="hidden" id="claimItemSn'+index+'" value="'+e.itemList[i].CLAIM_ITEM_SN+'" />' +
                    '       </td>' +
                    '       <td>' +
                    '           <input type="text" id="itemNm'+index+'" class="itemNm" value="'+e.itemList[i].ITEM_NM+'">' +
                    '       </td>' +
                    '       <td>' +
                    '           <input type="text" id="itemStd'+index+'" class="itemStd" value="'+e.itemList[i].ITEM_STD+'">' +
                    '       </td>' +
                    '       <td>' +
                    '           <input type="text" id="itemEa'+index+'" style="text-align: right" class="itemEa" value="'+comma(e.itemList[i].ITEM_EA)+'" onkeyup="reqCl.fn_calc(\''+index+'\', this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                    '       </td>' +
                    '       <td>' +
                    '           <input type="text" id="itemUnitAmt'+index+'" style="text-align: right" class="itemUnitAmt" value="'+comma(e.itemList[i].ITEM_UNIT_AMT)+'" onkeyup="reqCl.fn_calc(\''+index+'\', this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                    '       </td>' +
                    '       <td>' +
                    '           <input type="text" id="itemUnit'+index+'" class="itemUnit" value="'+e.itemList[i].ITEM_UNIT+'">' +
                    '       </td>' +
                    '       <td>' +
                    '           <input type="text" id="itemAmt'+index+'" class="itemAmt" value="'+comma(e.itemList[i].ITEM_AMT)+'" style="text-align: right" disabled onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                    '       </td>' +
                    '       <td>' +
                    '           <input type="text" id="purcItemAmt'+index+'" class="purcItemAmt" value="'+comma(e.itemList[i].PURC_ITEM_AMT)+'" style="text-align: right" disabled onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                    '       </td>' +
                    '       <td>' +
                    '           <input type="text" id="difItemAmt'+index+'" class="difItemAmt" value="'+comma(e.itemList[i].DIF_AMT)+'" style="text-align: right" disabled onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                    '       </td>' +
                    '       <td>' +
                    '           <label for="itemEtc'+index+'"></label><input type="text" id="itemEtc'+index+'" value="'+e.itemList[i].ITEM_ETC+'" class="itemEtc">' +
                    '       </td>' +
                    '       <td>' +
                    '           <span id="prodCd'+index+'"></span>' +
                    '       </td>' +
                    '       <td style="text-align: center" class="listDelBtn">' +
                    '           <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="reqCl.fn_delete(this)">' +
                    '               <span class="k-button-text">삭제</span>' +
                    '           </button>' +
                    '       </td>';
                html += '</tr>';
            }

            index++;
        }


        $("#claimTbody").append(html);


        var tLen = $("#claimTbody > tr").length;
        var radioProdDataSource = [
            { label: "해당없음", value: "N" },
            { label: "자산", value: "A" },
            { label: "유지보수", value: "E" },
        ]
        for(var i = 0 ; i < tLen ; i++){
            if(i == 0){
                customKendo.fn_textBox(["itemNm", "itemStd", "itemEa", "itemUnitAmt", "itemUnit", "itemAmt", "purcItemAmt", "difAmt", "itemEtc"]);
                customKendo.fn_radioGroup("prodCd", radioProdDataSource, "horizontal");

                $("#prodCd").data("kendoRadioGroup").value(e.itemList[i].PROD_CD);
            } else {
                customKendo.fn_textBox(["itemNm" + i, "itemStd" + i
                    ,"itemEa" + i, "itemUnitAmt" + i, "itemUnit" + i, "itemAmt" + i, "purcItemAmt" + i, "difAmt" + i, "itemEtc" + i])

                customKendo.fn_radioGroup("prodCd" + i, radioProdDataSource, "horizontal");
                $("#prodCd" + i).data("kendoRadioGroup").value(e.itemList[i].PROD_CD);
            }
        }

        this.fn_amtCalculator();
    },

    fn_kendoUIEnableSet : function(claimMap){
        if(claimMap != null){
            /** 상신, 재상신, 최종결재완료 상태일때 UI비활성화 */
            if(claimMap.STATUS == "10" || claimMap.STATUS == "50" || claimMap.STATUS == "100"){
                $(':radio').attr('disabled', true);
                $('.k-input-inner').attr('disabled', true);
                $("#pjtSelBtn").css("display", "none");
                $("#claimDe").data("kendoDatePicker").enable(false);
                $("#expDe").data("kendoDatePicker").enable(false);
                $("#stfs").css("display", "none");
                $("#crmSelBtn").css("display", "none");
                $(".listDelBtn").text("-");
                $("#addBtn").css("display", "none");
            }
        }
    },

    fn_ClaimBtnSet : function(claimMap){
        console.log("fn_ClaimBtnSet");
        console.log(claimMap);
        let claimSn = $("#claimSn").val();
        let buttonHtml = "";
        if(claimMap != null){
            if(claimMap.STATUS == "0"){
                buttonHtml += '<button type="button" id="saveBtn" style="margin-right: 5px;" class="k-button k-button-solid-info" onclick="reqCl.fn_save()">저장</button>';
                buttonHtml += '<button type="button" id="reqBtn" style="margin-right: 5px;" class="k-button k-button-solid-info" onclick="reqCl.claimDrafting()">상신</button>';
            }else if(claimMap.STATUS == "10"){
                buttonHtml += '<button type="button" id="reqCancelBtn" style="margin-right: 5px;" class="k-button k-button-solid-error" onclick="docApprovalRetrieve(\''+claimMap.DOC_ID+'\', \''+claimMap.APPRO_KEY+'\', 1, \'retrieve\');">회수</button>';
            }else if(claimMap.STATUS == "30" || claimMap.STATUS == "40"){
                buttonHtml += '<button type="button" id="saveBtn" style="margin-right: 5px;" class="k-button k-button-solid-info" onclick="reqCl.fn_save()">저장</button>';
                buttonHtml += '<button type="button" id="reReqBtn" style="margin-right: 5px;" class="k-button k-button-solid-error" onclick="tempOrReDraftingPop(\''+claimMap.DOC_ID+'\', \''+claimMap.DOC_MENU_CD+'\', \''+claimMap.APPRO_KEY+'\', 2, \'reDrafting\');">재상신</button>';
            }else if(claimMap.STATUS == "100"){
                buttonHtml += '<button type="button" id="viewBtn" style="margin-right: 5px;" class="k-button k-button-solid-base" onclick="approveDocView(\''+claimMap.DOC_ID+'\', \''+claimMap.APPRO_KEY+'\', \''+claimMap.DOC_MENU_CD+'\');">열람</button>';
            }else{
                buttonHtml += '<button type="button" id="saveBtn" style="margin-right: 5px;" class="k-button k-button-solid-info" onclick="reqCl.fn_save()">저장</button>';
            }
        }else{
            buttonHtml += '<button type="button" id="saveBtn" style="margin-right:5px; margin-bottom: 10px;" class="k-button k-button-solid-info" onclick="reqCl.fn_save()">저장</button>';
        }
        buttonHtml += '<button type="button" class="k-button k-button-solid-error" onclick="window.close()">닫기</button>';

        $("#reqPurcBtnDiv").html(buttonHtml);
    },

    claimDrafting : function(){
        $("#claimDraftFrm").one("submit", function() {
            var url = "/popup/cam_purc/approvalFormPopup/claimingApprovalPop.do";
            var name = "_self";
            var option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=yes, scrollbars = yes, status=no, top=50, left=50"
            var popup = window.open(url, name, option);
            this.action = "/popup/cam_purc/approvalFormPopup/claimingApprovalPop.do";
            this.method = 'POST';
            this.target = '_self';
        }).trigger("submit");
    }
}