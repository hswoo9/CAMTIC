<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>


<style>

</style>

<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="key" value="${params.key}" />
<input type="hidden" id="arKey" value="${params.arKey}" />

<div>
    <div class="card-header pop-header">
        <h3 class="card-title title_NM">
            <span style="position: relative; top: 3px;" id="bgTitle">
                예산신규등록
            </span>
        </h3>
        <div id="purcBtnDiv" class="btn-st popButton" style="font-size: 13px">
            <button type="button" class="k-button k-button-solid-info" id="regBtn" onclick="fn_save('S')">등록</button>
            <button type="button" class="k-button k-button-solid-primary" style="display: none;" id="modBtn" onclick="fn_save('M')">수정</button>
            <button type="button" class="k-button k-button-solid-error" onclick="window.close()">닫기</button>
        </div>
    </div>

    <div class="" style="padding: 10px">
        <table class="popTable table table-bordered mb-0">
            <colgroup>
                <col width="20%">
                <col width="30%">
                <col width="20%">
                <col width="30%">
            </colgroup>
            <thead>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>연도
                </th>
                <td>
                    <input type="text" id="bsYear" value="" style="width: 50%">
                </td>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>등록일자
                </th>
                <td>
                    <input type="text" id="regDt" value="" style="width: 50%">
                </td>
            </tr>
            <tr id="pjtClassTr">
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>프로젝트 분류
                </th>
                <td colspan="3">
                    <span id="radioGroup"></span>
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color" colspan="4">
                    <input type="checkbox" class="k-checkbox k-checkbox-item" value="Y" id="aBg" checked>
                    <span class="red-star">*</span>세입예산
                </th>
            </tr>
            <tr>
                <td colspan="4">
                    <table class="popTable table table-bordered mb-0">
                        <colgroup>
                            <col width="21%">
                            <col width="21%">
                            <col width="21%">
                            <col width="21%">
                            <col width="16%">
                        </colgroup>
                        <thead id="aRow">
                            <tr>
                                <th scope="row" class="text-center th-color">
                                    <span class="red-star"></span>장
                                </th>
                                <th scope="row" class="text-center th-color">
                                    <span class="red-star"></span>관
                                </th>
                                <th scope="row" class="text-center th-color">
                                    <span class="red-star"></span>항
                                </th>
                                <th scope="row" class="text-center th-color">
                                    <span class="red-star"></span>예산액
                                </th>
                                <th scope="row" class="text-center th-color">
                                    <span class="red-star"></span>
                                </th>
                            </tr>
                            <tr>
                                <td>
                                    <input type="hidden" id="pjtBudgetSn0" />
                                    <input type="text" id="jang0" value="" style="width: 80%">
                                    <input type="hidden" id="jangCd0" value="" >
                                    <i class="k-i-plus k-icon" style="cursor: pointer" onclick="fn_budgetPop('A', 0, 'A')"></i>
                                </td>
                                <td>
                                    <input type="text" id="gwan0" value="" style="width: 80%">
                                    <input type="hidden" id="gwanCd0" value="" >
                                    <i class="k-i-plus k-icon" style="cursor: pointer" onclick="fn_budgetPop('B', 0, 'A')"></i>
                                </td>
                                <td>
                                    <input type="text" id="hang0" value="" style="width: 80%">
                                    <input type="hidden" id="hangCd0" value="" >
                                    <i class="k-i-plus k-icon" style="cursor: pointer" onclick="fn_budgetPop('C', 0, 'A')"></i>
                                </td>
                                <td>
                                    <input type="text" id="budgetAmt0" class="budgetAmt" value="0" onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" style="width: 100%; text-align: right">
                                </td>
                                <td style="text-align: center">
                                    <button type="button" class="k-button k-button-solid-base" name="aButton" onclick="fn_addRow('A')">추가</button>
                                </td>
                            </tr>
                        </thead>
                        <tfoot id="aFoot">
                            <tr>
                                <th scope="row" class="text-center th-color" style="text-align: right" colspan="3">
                                    <span class="red-star"></span>합계
                                </th>
                                <td>
                                    <input type="text" id="budgetTotAmt" style="text-align: right" disabled>
                                </td>
                                <th scope="row" class="text-center th-color">
                                    <span class="red-star"></span>
                                </th>
                            </tr>
                        </tfoot>
                    </table>
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color" colspan="4">
                    <input type="checkbox" class="k-checkbox k-checkbox-item" value="Y" id="bBg" checked>
                    <span class="red-star">*</span>세출예산
                </th>
            </tr>
            <tr>
                <td colspan="4">
                    <table class="popTable table table-bordered mb-0">
                        <colgroup>
                            <col width="21%">
                            <col width="21%">
                            <col width="21%">
                            <col width="21%">
                            <col width="16%">
                        </colgroup>
                        <thead id="bRow">
                        <tr>
                            <th scope="row" class="text-center th-color">
                                <span class="red-star"></span>장
                            </th>
                            <th scope="row" class="text-center th-color">
                                <span class="red-star"></span>관
                            </th>
                            <th scope="row" class="text-center th-color">
                                <span class="red-star"></span>항
                            </th>
                            <th scope="row" class="text-center th-color">
                                <span class="red-star"></span>예산액
                            </th>
                            <th scope="row" class="text-center th-color">
                                <span class="red-star"></span>
                            </th>
                        </tr>
                        <tr>
                            <td>
                                <input type="hidden" id="mPJtBudgetSn0" />
                                <input type="text" id="mJang0" value="" style="width: 80%">
                                <input type="hidden" id="mJangCd0" value="" >
                                <i class="k-i-plus k-icon" style="cursor: pointer" onclick="fn_budgetPop('A', 0, 'B')"></i>
                            </td>
                            <td>
                                <input type="text" id="mGwan0" value="" style="width: 80%">
                                <input type="hidden" id="mGwanCd0" value="" >
                                <i class="k-i-plus k-icon" style="cursor: pointer" onclick="fn_budgetPop('B', 0, 'B')"></i>
                            </td>
                            <td>
                                <input type="text" id="mHang0" value="" style="width: 80%">
                                <input type="hidden" id="mHangCd0" value="" >
                                <i class="k-i-plus k-icon" style="cursor: pointer" onclick="fn_budgetPop('C', 0, 'B')"></i>
                            </td>
                            <td>
                                <input type="text" id="mBudgetAmt0" class="mBudgetAmt"  value="0" onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" style="width: 100%; text-align: right">
                            </td>
                            <td style="text-align: center">
                                <button type="button" class="k-button k-button-solid-base" name="bButton" onclick="fn_addRow('B')">추가</button>
                            </td>
                        </tr>
                        </thead>
                        <tfoot id="bFoot">
                        <tr>
                            <th scope="row" class="text-center th-color" style="text-align: right" colspan="3">
                                <span class="red-star"></span>합계
                            </th>
                            <td>
                                <input type="text" id="mBudgetTotAmt" style="text-align: right" disabled>
                            </td>
                            <th scope="row" class="text-center th-color">
                                <span class="red-star"></span>
                            </th>
                        </tr>
                        </tfoot>
                    </table>
                </td>
            </thead>
        </table>
    </div>
</div>

<script>

    $(function(){
        customKendo.fn_textBox(["jang0", "gwan0", "hang0", "budgetAmt0", "budgetTotAmt",
                                "mJang0", "mGwan0", "mHang0", "mBudgetAmt0", "mBudgetTotAmt", "pjtNm"]);

        customKendo.fn_datePicker("bsYear", "decade", "yyyy", new Date())
        customKendo.fn_datePicker("regDt", "year", "yyyy-MM-dd", new Date())

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
            value : "1"
        });

        $("#radioGroup").data("kendoRadioGroup").value("M");


        if($("#arKey").val() != ""){
            fn_setData();
        }

    });

    function fn_aKeyUp(){
        var sum = 0;

        $(".budgetAmt").each(function() {
            if ($(this).val() == "")
                $(this).val(0);

            sum += Number(uncomma($(this).val()));
        })

        $("#budgetTotAmt").val(comma(sum));
    }

    function fn_bKeyUp () {
        var sum = 0;

        $(".mBudgetAmt").each(function() {
            if ($(this).val() == "")
                $(this).val(0);

            sum += Number(uncomma($(this).val()));
        })

        $("#mBudgetTotAmt").val(comma(sum));
    }

    function fn_budgetPop(type, idx, value){
        var url = "/budget/pop/budgetPop.do?type=" + type + "&idx=" + idx + "&budgetVal=" + value;

        var name = "_blank";
        var option = "width = 600, height = 750, top = 100, left = 200, location = no";

        var popup = window.open(url, name, option);
    }

    function inputNumberFormat (obj){
        obj.value = comma(uncomma(obj.value));
        fn_aKeyUp();
        fn_bKeyUp();
    }

    function comma(str) {
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    }

    function uncomma(str) {
        str = String(str);
        return str.replace(/[^\d]+/g, '');
    }

    function fn_addRow(type){
        var html = "";

        if(type == "A"){

            var len = $("#aRow").find("tr").length;

            var i = len - 1;

            html = '' +
                '<tr>' +
                '   <td>' +
                '       <input type="hidden" id="pjtBudgetSn'+i+'" value="" style="width: 80%">' +
                '       <input type="text" id="jang'+i+'" value="" style="width: 80%">' +
                '       <input type="hidden" id="jangCd'+i+'" value="" style="width: 80%">' +
                '       <i class="k-i-plus k-icon" style="cursor: pointer" onclick="fn_budgetPop(\'A\', '+i+', \'A\')"></i>' +
                '   </td>' +
                '   <td>' +
                '       <input type="text" id="gwan'+i+'" value="" style="width: 80%">' +
                '       <input type="hidden" id="gwanCd'+i+'" value="" style="width: 80%">' +
                '       <i class="k-i-plus k-icon" style="cursor: pointer" onclick="fn_budgetPop(\'B\', '+i+', \'A\')"></i>' +
                '   </td>' +
                '   <td>' +
                '       <input type="text" id="hang'+i+'" value="" style="width: 80%">' +
                '       <input type="hidden" id="hangCd'+i+'" value="" style="width: 80%">' +
                '       <i class="k-i-plus k-icon" style="cursor: pointer" onclick="fn_budgetPop(\'C\', '+i+', \'A\')"></i>' +
                '   </td>' +
                '   <td>' +
                '       <input type="text" id="budgetAmt'+i+'" class="budgetAmt" value="0" onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" style="width: 100%; text-align: right">' +
                '   </td>' +
                '   <td style="text-align: center">' +
                '       <button type="button" class="k-button k-button-solid-base" name="aButton" onclick="fn_addRow(\'A\')">추가</button>' +
                '       <button type="button" class="k-button k-button-solid-error" name="aDelButton" onclick="fn_removeRow(this)">삭제</button>' +
                '   </td>' +
                '</tr>';

            $("#aRow").append(html);

            customKendo.fn_textBox(["jang" + i , "gwan" + i, "hang" + i, "budgetAmt" + i]);

        } else if(type == "B"){
            var len = $("#bRow").find("tr").length;

            var i = len - 1;

            html = '' +
                '<tr>' +
                '   <td>' +
                '       <input type="hidden" id="mPjtBudgetSn'+i+'" value="" style="width: 80%">' +
                '       <input type="text" id="mJang'+i+'" value="" style="width: 80%">' +
                '       <input type="hidden" id="mJang'+i+'" value="" style="width: 80%">' +
                '       <i class="k-i-plus k-icon" style="cursor: pointer" onclick="fn_budgetPop(\'A\', '+i+', \'B\')"></i>' +
                '   </td>' +
                '   <td>' +
                '       <input type="text" id="mGwan'+i+'" value="" style="width: 80%">' +
                '       <input type="hidden" id="mGwan'+i+'" value="" style="width: 80%">' +
                '       <i class="k-i-plus k-icon" style="cursor: pointer" onclick="fn_budgetPop(\'B\', '+i+', \'B\')"></i>' +
                '   </td>' +
                '   <td>' +
                '       <input type="text" id="mHang'+i+'" value="" style="width: 80%">' +
                '       <input type="hidden" id="mHang'+i+'" value="" style="width: 80%">' +
                '       <i class="k-i-plus k-icon" style="cursor: pointer" onclick="fn_budgetPop(\'C\', '+i+', \'B\')"></i>' +
                '   </td>' +
                '   <td>' +
                '       <input type="text" id="mBudgetAmt'+i+'" class="mBudgetAmt"  value="0" onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" style="width: 100%; text-align: right">' +
                '   </td>' +
                '   <td style="text-align: center">' +
                '       <button type="button" class="k-button k-button-solid-base" name="bButton" onclick="fn_addRow(\'B\')">추가</button>' +
                '       <button type="button" class="k-button k-button-solid-error" name="bDelButton" onclick="fn_removeRow(this)">삭제</button>' +
                '   </td>' +
                '</tr>';

            $("#bRow").append(html);

            customKendo.fn_textBox(["mJang" + i, "mGwan" + i, "mHang" + i, "mBudgetAmt" + i])
        } else {
            alert("Error");
            window.close();
        }
    }

    function fn_removeRow(obj){
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
    }

    function fn_viewProject (){
        var url = "/project/pop/g20ProjectView.do";

        var name = "_blank";
        var option = "width = 1100, height = 450, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    }

    function selectProject(sn, nm, cd, baseYear){
        if(sn == undefined || sn == null){
            sn = "corp";
        }

        $("#pjtSn").val(sn);
        $("#pjtNm").val(nm);
        $("#pjtCd").val(cd);
    }

    function fn_save(type){
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

                if((itemParameters.jang == "" || itemParameters.gwan == "" || itemParameters.hang == "" || itemParameters.budgetAmt == "")) {
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

                if((itemParameters.jang == "" || itemParameters.gwan == "" || itemParameters.hang == "" || itemParameters.budgetAmt == "")) {
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
                } else {
                    alert(rs.msg);
                }
            }
        });
    }

    function fn_setData(){
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
                            fn_addRow('A')
                        }

                        aSum += item.BUDGET_AMT;

                        $("#jang" + i).val(item.JANG_NM);
                        $("#jangCd" + i).val(item.JANG_CD);
                        $("#gwan" + i).val(item.GWAN_NM);
                        $("#gwanCd" + i).val(item.GWAN_CD);
                        $("#hang" + i).val(item.HANG_NM);
                        $("#hangCd" + i).val(item.HANG_CD);
                        $("#budgetAmt" + i).val(comma(item.BUDGET_AMT));
                        $("#pjtBudgetSn" + i).val(item.PJT_BUDGET_SN);

                        aCnt++;
                    }

                    if(ls[i].BG_VAL == "B"){
                        if(bCnt != 0){
                            fn_addRow('B')
                        }

                        bSum += item.BUDGET_AMT;

                        $("#mJang" + i).val(item.JANG_NM);
                        $("#mJangCd" + i).val(item.JANG_CD);
                        $("#mGwan" + i).val(item.GWAN_NM);
                        $("#mGwanCd" + i).val(item.GWAN_CD);
                        $("#mHang" + i).val(item.HANG_NM);
                        $("#mHangCd" + i).val(item.HANG_CD);
                        $("#mBudgetAmt" + i).val(comma(item.BUDGET_AMT));
                        $("#mPjtBudgetSn" + i).val(item.PJT_BUDGET_SN);

                        bCnt++;

                    }


                    $("#budgetTotAmt").val(comma(aSum));
                    $("#mBudgetTotAmt").val(comma(bSum));

                }
            }
        })
    }
</script>