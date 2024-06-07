var regMakeBudget = {

    global : {
        dropDownDataSource1 : [],
        dropDownDataSource2 : [],
        showDataSource : [],
    },

    fn_defaultScript: function () {
        customKendo.fn_textBox(["jang0", "gwan0", "hang0", "budgetAmt0", "budgetTotAmt",
            "mJang0", "mGwan0", "mHang0", "mBudgetAmt0", "mBudgetTotAmt", "pjtNm"]);

        customKendo.fn_datePicker("bsYear", "decade", "yyyy", new Date());
        customKendo.fn_datePicker("regDt", "year", "yyyy-MM-dd", new Date());

        $("#budgetVal").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "선택", value: ""},
                {text: "세입예산", value: "B"},
                {text: "세출예산", value: "A"},
            ],
        });

        $("#aBg").change(function(){
            if($(this).is(":checked")){
                $("#aRow").css("display", "");
                $("#aFoot").css("display", "");
            } else {
                $("#aRow").css("display", "none");
                $("#aFoot").css("display", "none");
            }
        });

        $("#bBg").change(function(){
            if($(this).is(":checked")){
                $("#bRow").css("display", "");
                $("#bFoot").css("display", "");
            } else {
                $("#bRow").css("display", "none");
                $("#bFoot").css("display", "none");
            }
        });

        regMakeBudget.global.dropDownDataSource = [
            { text: "선택하세요", value: "" },
            { text: "직접비", value: "D" },
            { text: "간접비", value: "I" },
            { text: "인건비", value: "P" },
            { text: "제외", value: "E" },
        ]
        $("#budgetType0, #mBudgetType0").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: regMakeBudget.global.dropDownDataSource,
        });

        $("#radioGroup").kendoRadioGroup({
            items: [
                { label : "법인운영", value : "M" },
                { label : "R&D", value : "R" },
                { label : "비R&D", value : "S" },
                { label : "엔지니어링", value : "D" },
                { label : "용역/기타", value : "V" }
            ],
            layout : "horizontal",
            labelPosition : "after",
            value : "1",
        });

        $("#radioGroup").data("kendoRadioGroup").value("M");

        if($("#arKey").val() != ""){
            regMakeBudget.fn_setData();
        }
    },

    fn_budgetPop : function(type, idx, value){
        var url = "/budget/pop/budgetPop.do?type=" + type + "&idx=" + idx + "&budgetVal=" + value;

        var name = "_blank";
        var option = "width = 600, height = 750, top = 100, left = 200, location = no";

        var popup = window.open(url, name, option);
    },

    fn_addRow : function(type){
        var html = "";

        if(type == "A"){

            var len = $("#aRow").find("tr").length;

            var i = len - 1;

            html = '' +
                '<tr>' +
                '   <td>' +
                '       <input type="hidden" id="pjtBudgetSn'+i+'" value="" style="width: 80%">' +
                '       <input type="text" id="jang'+i+'" value="" style="width: 80%" readonly />' +
                '       <input type="hidden" id="jangCd'+i+'" value="" style="width: 80%">' +
                '       <i class="k-i-plus k-icon" style="cursor: pointer" onclick="regMakeBudget.fn_budgetPop(\'A\', '+i+', \'A\')"></i>' +
                '   </td>' +
                '   <td>' +
                '       <input type="text" id="gwan'+i+'" value="" style="width: 80%" readonly />' +
                '       <input type="hidden" id="gwanCd'+i+'" value="" style="width: 80%">' +
                '       <i class="k-i-plus k-icon" style="cursor: pointer" onclick="regMakeBudget.fn_budgetPop(\'B\', '+i+', \'A\')"></i>' +
                '   </td>' +
                '   <td>' +
                '       <input type="text" id="hang'+i+'" value="" style="width: 80%" readonly />' +
                '       <input type="hidden" id="hangCd'+i+'" value="" style="width: 80%">' +
                '       <i class="k-i-plus k-icon" style="cursor: pointer" onclick="regMakeBudget.fn_budgetPop(\'C\', '+i+', \'A\')"></i>' +
                '   </td>' +
                '   <td>' +
                '       <input type="text" id="budgetAmt'+i+'" class="budgetAmt" value="0" onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" style="width: 100%; text-align: right">' +
                '   </td>' +
                '   <td>' +
                '       <input type="text" id="budgetType'+i+'" class="budgetType" />' +
                '   </td>' +
                '   <td style="text-align: center">' +
                '       <button type="button" class="k-button k-button-solid-base" name="aButton" onclick="regMakeBudget.fn_addRow(\'A\')">추가</button>' +
                '       <button type="button" class="k-button k-button-solid-error" name="aDelButton" onclick="regMakeBudget.fn_removeRow(this)">삭제</button>' +
                '   </td>' +
                '</tr>';

            $("#aRow").append(html);

            customKendo.fn_textBox(["jang" + i , "gwan" + i, "hang" + i, "budgetAmt" + i]);

            $("#budgetType" + i).kendoDropDownList({
                dataTextField: "text",
                dataValueField: "value",
                dataSource: regMakeBudget.global.showDataSource,
            });

        } else if(type == "B"){
            var len = $("#bRow").find("tr").length;

            var i = len - 1;

            html = '' +
                '<tr>' +
                '   <td>' +
                '       <input type="hidden" id="mPjtBudgetSn'+i+'" value="" style="width: 80%">' +
                '       <input type="text" id="mJang'+i+'" value="" style="width: 80%" readonly />' +
                '       <input type="hidden" id="mJangCd'+i+'" value="" style="width: 80%">' +
                '       <i class="k-i-plus k-icon" style="cursor: pointer" onclick="regMakeBudget.fn_budgetPop(\'A\', '+i+', \'B\')"></i>' +
                '   </td>' +
                '   <td>' +
                '       <input type="text" id="mGwan'+i+'" value="" style="width: 80%" readonly />' +
                '       <input type="hidden" id="mGwanCd'+i+'" value="" style="width: 80%">' +
                '       <i class="k-i-plus k-icon" style="cursor: pointer" onclick="regMakeBudget.fn_budgetPop(\'B\', '+i+', \'B\')"></i>' +
                '   </td>' +
                '   <td>' +
                '       <input type="text" id="mHang'+i+'" value="" style="width: 80%" readonly />' +
                '       <input type="hidden" id="mHangCd'+i+'" value="" style="width: 80%">' +
                '       <i class="k-i-plus k-icon" style="cursor: pointer" onclick="regMakeBudget.fn_budgetPop(\'C\', '+i+', \'B\')"></i>' +
                '   </td>' +
                '   <td>' +
                '       <input type="text" id="mBudgetAmt'+i+'" class="mBudgetAmt"  value="0" onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" style="width: 100%; text-align: right">' +
                '   </td>' +
                '   <td>' +
                '       <input type="text" id="mBudgetType'+i+'" class="budgetType" />' +
                '   </td>' +
                '   <td style="text-align: center">' +
                '       <button type="button" class="k-button k-button-solid-base" name="bButton" onclick="regMakeBudget.fn_addRow(\'B\')">추가</button>' +
                '       <button type="button" class="k-button k-button-solid-error" name="bDelButton" onclick="regMakeBudget.fn_removeRow(this)">삭제</button>' +
                '   </td>' +
                '</tr>';

            $("#bRow").append(html);

            customKendo.fn_textBox(["mJang" + i, "mGwan" + i, "mHang" + i, "mBudgetAmt" + i])

            $("#mBudgetType" + i).kendoDropDownList({
                dataTextField: "text",
                dataValueField: "value",
                dataSource: regMakeBudget.global.showDataSource,
            });
        } else {
            alert("Error");
            window.close();
        }
    },

    fn_removeRow : function(obj){
        $(obj).parent().parent().remove();

        $("#aRow").find("tr").each(function(){
            var len = $(this).index()

            $(this).find("td").eq(0).find("input").attr("id", "jang"+ (len - 1));
            $(this).find("td").eq(1).find("input").attr("id", "gwan"+ (len - 1));
            $(this).find("td").eq(2).find("input").attr("id", "hang"+ (len - 1));
            $(this).find("td").eq(3).find("input").attr("id", "budgetAmt"+ (len - 1));
        });

        $("#bRow").find("tr").each(function(){
            var len = $(this).index()

            $(this).find("td").eq(0).find("input").attr("id", "mJang"+ (len - 1));
            $(this).find("td").eq(1).find("input").attr("id", "mGwan"+ (len - 1));
            $(this).find("td").eq(2).find("input").attr("id", "mHang"+ (len - 1));
            $(this).find("td").eq(3).find("input").attr("id", "mBudgetAmt"+ (len - 1));
        });
    },

    fn_save : function(type){
        var parameters = {
            baseYear : $("#bsYear").val(),
            regDt : $("#regDt").val(),
            pjtClass : $("#radioGroup").data("kendoRadioGroup").value(),
            regEmpSeq : $("#empSeq").val(),
            type : type
        }

        if($("#aBg").is(":checked")){
            parameters.aBg = "Y";
            var len = $("#aRow").find("tr").length;
            var len = len - 1;
            var itemArr = new Array()
            var aFlag = true;
            for(var i = 0 ; i < len ; i++){
                var itemParameters = {};

                itemParameters.pjtBudgetSn = $("#pjtBudgetSn" + i).val();
                itemParameters.jang = $("#jang" + i).val();
                itemParameters.gwan = $("#gwan" + i).val();
                itemParameters.hang = $("#hang" + i).val();
                itemParameters.jangCd = $("#jangCd" + i).val();
                itemParameters.gwanCd = $("#gwanCd" + i).val();
                itemParameters.hangCd = $("#hangCd" + i).val();
                itemParameters.budgetAmt = uncomma($("#budgetAmt" + i).val());
                itemParameters.budgetType = $("#budgetType" + i).data("kendoDropDownList").text();
                itemParameters.budgetTypeCd = $("#budgetType" + i).data("kendoDropDownList").value();
                itemParameters.pjtClass = parameters.pjtClass;

                if((itemParameters.jang == "" || itemParameters.gwan == "" || itemParameters.hang == "" || itemParameters.budgetAmt == "" || itemParameters.budgetTypeCd == "")){
                    aFlag = false;
                }

                itemArr.push(itemParameters);
            }
            if(!aFlag){
                alert("입력되지 않은 값이 있습니다. 확인해주세요.");
                return;
            }
            parameters.aItemArr = JSON.stringify(itemArr);
        } else {
            parameters.aBg = "N";
        }


        if($("#bBg").is(":checked")){
            parameters.bBg = "Y";
            var len = $("#bRow").find("tr").length;
            var len = len - 1;
            var itemArr = new Array()
            var bFlag = true;
            for(var i = 0 ; i < len ; i++){
                var itemParameters = {};

                itemParameters.pjtBudgetSn = $("#mPjtBudgetSn" + i).val();
                itemParameters.jang = $("#mJang" + i).val();
                itemParameters.gwan = $("#mGwan" + i).val();
                itemParameters.hang = $("#mHang" + i).val();
                itemParameters.jangCd = $("#mJangCd" + i).val();
                itemParameters.gwanCd = $("#mGwanCd" + i).val();
                itemParameters.hangCd = $("#mHangCd" + i).val();
                itemParameters.budgetAmt = uncomma($("#mBudgetAmt" + i).val());
                itemParameters.budgetType = $("#mBudgetType" + i).data("kendoDropDownList").text();
                itemParameters.budgetTypeCd = $("#mBudgetType" + i).data("kendoDropDownList").value();
                itemParameters.pjtClass = parameters.pjtClass;
                if((itemParameters.jang == "" || itemParameters.gwan == "" || itemParameters.hang == "" || itemParameters.budgetAmt == "" || itemParameters.budgetTypeCd == "")) {
                    bFlag = false;
                }

                itemArr.push(itemParameters);
            }
            if(!bFlag){
                alert("입력되지 않은 값이 있습니다. 확인해주세요.");
                return;
            }
            parameters.bItemArr = JSON.stringify(itemArr);
        } else {
            parameters.bBg = "N";
        }


        console.log(parameters);

        $.ajax({
            url : "/budget/pop/setBudget",
            data : parameters,
            type : "POST",
            dataType : "json",
            success : function(rs){
                if (rs.code == 200){
                    alert("저장되었습니다.");
                    window.close();
                    opener.makeBudget.gridReload();
                } else {
                    alert(rs.msg);
                }
            }
        });
    },

    fn_setData : function (){
        $("#bgTitle").text("예산수정");

        $("#regBtn").css("display", "none");
        $("#modBtn").css("display", "");
        $("#pjtClassTr").css("display", "none");

        $("#bsYear").data("kendoDatePicker").enable(false);
        $("#regDt").data("kendoDatePicker").enable(false);

        var arKey = $("#arKey").val().split(",");

        console.log(arKey)
        var parameters = {
            arKey : JSON.stringify(arKey)
        }

        $.ajax({
            url : "/budget/pop/getBudget",
            data : parameters,
            type : "POST",
            dataType : "json",
            success : function(rs){
                console.log(rs);
                var ls = rs.list;
                var aCnt = 0;
                var bCnt = 0;

                var aSum = 0;
                var bSum = 0;
                for(var i = 0 ; i < ls.length ; i++){
                    var item = ls[i];

                    if(ls[i].BG_VAL == "A"){
                        if(aCnt != 0){
                            regMakeBudget.fn_addRow('A')
                        }

                        aSum += item.BUDGET_AMT;

                        $("#jang" + aCnt).val(item.JANG_NM);
                        $("#jangCd" + aCnt).val(item.JANG_CD);
                        $("#gwan" + aCnt).val(item.GWAN_NM);
                        $("#gwanCd" + aCnt).val(item.GWAN_CD);
                        $("#hang" + aCnt).val(item.HANG_NM);
                        $("#hangCd" + aCnt).val(item.HANG_CD);
                        $("#budgetAmt" + aCnt).val(comma(item.BUDGET_AMT));
                        $("#budgetType" + aCnt).data("kendoDropDownList").value(item.BUDGET_TYPE_CD);
                        $("#pjtBudgetSn" + aCnt).val(item.PJT_BUDGET_SN);

                        aCnt++;
                    }

                    if(ls[i].BG_VAL == "B"){
                        if(bCnt != 0){
                            regMakeBudget.fn_addRow('B')
                        }

                        bSum += item.BUDGET_AMT;

                        $("#mJang" + bCnt).val(item.JANG_NM);
                        $("#mJangCd" + bCnt).val(item.JANG_CD);
                        $("#mGwan" + bCnt).val(item.GWAN_NM);
                        $("#mGwanCd" + bCnt).val(item.GWAN_CD);
                        $("#mHang" + bCnt).val(item.HANG_NM);
                        $("#mHangCd" + bCnt).val(item.HANG_CD);
                        $("#mBudgetAmt" + bCnt).val(comma(item.BUDGET_AMT));
                        $("#mBudgetType" + bCnt).data("kendoDropDownList").value(item.BUDGET_TYPE_CD);
                        $("#mPjtBudgetSn" + bCnt).val(item.PJT_BUDGET_SN);

                        bCnt++;
                    }


                    $("#budgetTotAmt").val(comma(aSum));
                    $("#mBudgetTotAmt").val(comma(bSum));
                }

                if(aCnt == 0){
                    $("#aBg").prop("checked", false);
                    $("#aRow").css("display", "none");
                    $("#aFoot").css("display", "none");
                }
                if(bCnt == 0){
                    $("#bBg").prop("checked", false);
                    $("#bRow").css("display", "none");
                    $("#bFoot").css("display", "none");
                }
            }
        })
    },

    fn_changeProject : function(){
        var aRow = $("#aRow").find("tr").length;
        var bRow = $("#bRow").find("tr").length;

        var aLen = aRow - 1;
        var bLen = bRow - 1;

        for(var i=0; i<aLen; i++){
            $("#budgetType" + i).data("kendoDropDownList").setDataSource(regMakeBudget.global.showDataSource);
            $("#budgetType" + i).data("kendoDropDownList").select(0);
        }

        for(var i=0; i<bLen; i++){
            $("#mBudgetType" + i).data("kendoDropDownList").setDataSource(regMakeBudget.global.showDataSource);
            $("#mBudgetType" + i).data("kendoDropDownList").select(0);
        }
    }
}