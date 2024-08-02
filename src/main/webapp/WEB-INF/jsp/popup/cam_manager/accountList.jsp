<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

<script type="text/javascript" src="<c:url value='/js/intra/cam_project/commonProject.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/budgetView.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js?v=${today}'/>"></script>

<style>
    .k-footer-template td:nth-child(4) {
        overflow: visible;
        white-space: nowrap;
        text-align: right;
    }

    .k-footer-template td:nth-child(1),
    .k-footer-template td:nth-child(2),
    .k-footer-template td:nth-child(3),
    .k-footer-template td:nth-child(4) {
        border-width: 0;
    }
</style>

<input type="hidden" id="pjtSn" value="${params.pjtSn}" />
<input type="hidden" id="bsYm" value="${params.bsYm}" />
<input type="hidden" id="reqType" value="${params.reqType}" />
<input type="hidden" id="sbjSep" value="${params.sbjSep}" />

<input type="hidden" id="payAppType" value="${params.payAppType}" />
<div>
    <div class="card-header pop-header">
        <h3 class="card-title title_NM">
                <span style="position: relative; top: 3px;">
                    법인계좌 관리
                </span>
        </h3>
        <div id="purcBtnDiv" class="btn-st popButton">
            <button type="button" class="k-button k-button-solid-error" onclick="window.close()">닫기</button>
        </div>
    </div>
    <div id="checkboxDiv" style="margin:20px 0;">
        <p style="font-size: 13px; font-weight: bold; margin-left: 20px; margin-bottom: 5px;">
            ◎ 급여대장 연월 선택
            <span style="margin-right: 20px; font-weight: normal;">( 지급년월일 : <input type="text" id="exnpDe" style="width: 10%"> )</span>
        </p>
        <div style="text-align: center">
            <table id="bsYmTbl" style="margin: 0 auto;">

            </table>
        </div>
    </div>
    <div id="sbjSepDiv" style="margin:20px 0; display: none;">
        <p style="font-size: 13px; font-weight: bold; margin-left: 20px; margin-bottom: 5px;">◎ 사업비 선택</p>
        <div style="text-align: center">
            <table id="sbjSepTbl" style="margin: 0 20px;">

            </table>
        </div>
    </div>
    <div id="mainGrid" style="margin:20px 0;"></div>
</div>

<script>

    mainGrid();
    fn_getPartRateDate();

    customKendo.fn_datePicker("exnpDe", '', 'yyyy-MM-dd', new Date());

    if($("#sbjSep").val() == "Y"){
        fn_drawSbjSepTable();
    }

    function mainGrid(){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: "/account/getAccountList.do",
                    dataType: "json",
                    type: "post"
                },
                parameterMap: function(data){
                    data.userKind = $('#userKind').val();
                    data.empNameKr = $("#kindContent").val();
                    data.kindContent = $("#kindContent").val();
                    data.userGender = $("#userGender").val();
                    data.deptComp = $("#deptComp").val();
                    data.deptTeam = $("#deptTeam").val();
                    return data;
                }
            },
            schema: {
                data: function(data){
                    return data.list;
                },
                total: function(data){
                    return data.list.length;
                },
            },
            pageSize: 10
        });

        $("#mainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 302,
            pageable: {
                refresh: true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount: 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            // toolbar: [
            //     {
            //         name: 'button',
            //         template: function (e) {
            //             return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="srm.accountGridReload()">' +
            //                 '	<span class="k-button-text">조회</span>' +
            //                 '</button>';
            //         }
            //     }, {
            //         name: 'button',
            //         template: function (e) {
            //             return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-info" onclick="srm.fn_regAccountToPop()">' +
            //                 '	<span class="k-button-text">추가</span>' +
            //                 '</button>';
            //         }
            //     },
            // ],
            columns: [
                {
                    field: "BANK_NAME",
                    title: "은행명",
                    width : 100
                }, {
                    field: "PAY_ACCOUNT",
                    title: "지급계좌",
                    width : 100
                }, {
                    field: "DEPOSITOR",
                    title: "예금주",
                    width : 100
                }, {
                    field: "ACCOUNT_NAME",
                    title: "계좌별칭",
                    width : 100
                }, {
                    title: "",
                    width : 30,
                    template: function(e){
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="fn_makePayrollPdf('+e.ACCOUNT_TO_SN+')">' +
                            '	<span class="k-button-text">선택</span>' +
                            '</button>';
                    }
                }

            ]
        }).data("kendoGrid");
    }


    function fn_reqRegPopup(acKey, payRollYm){

        var key = $("#pjtSn").val();
        var url = "/payApp/pop/regPayAppPop.do";
        if(key != null && key != ""){
            url = "/payApp/pop/regPayAppPop.do?pjtSn=" + key + "&bsYm=" + $("#bsYm").val() + "&reqType=partRate&accountToSn=" + acKey;
        }
        if(payRollYm != null && payRollYm != ""){
            url += "&payRollYm=" + payRollYm.substring(1);
        }

        if($("#sbjSep").val() == "Y"){
            if($("input[name='sbjRadio']:checked").length == 0) {
                alert("사업비를 선택해주세요.");
                return;
            } else {
                url += "&pjtCd=" + $("input[name='sbjRadio']:checked").val()
            }
        }

        var name = "_blank";
        var option = "width = 1700, height = 820, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);

        window.close();
    }

    function fn_getPartRateDate(){

        $.ajax({
            url : "/inside/getBusinessParticipationData",
            data : {
                pjtSn : $("#pjtSn").val()
            },
            type : "post",
            dataType : "json",
            success : function(rs){
                var arr = rs.list;

                var strDe = arr[0].PART_DET_STR_DT;
                var endDe = arr[0].PART_DET_END_DT;

                for (var i=1; i<arr.length; i++) {
                    if (arr[i].PART_DET_STR_DT < strDe) {
                        strDe = arr[i].PART_DET_STR_DT;
                    }
                    if (arr[i].PART_DET_END_DT > endDe) {
                        endDe = arr[i].PART_DET_END_DT;
                    }
                }
                strDe = strDe.split("-");
                endDe = endDe.split("-");


                var diffMonth = (endDe[0] - strDe[0]) * 12 + (endDe[1] - strDe[1]) + 1;
                const projectStartMonth = strDe[0] + "-" + strDe[1];
                var date = new Date(projectStartMonth);

                var html = "";
                $("#bsYmTbl").html(html);
                for(var i = 0 ; i < diffMonth ; i++){
                    var dtMonth = date.getMonth() + 1;
                    if(dtMonth.toString().length == 1){
                        dtMonth = "0" + dtMonth;
                    }

                    if(i % 12 == 0){
                        html += "<tr>";
                    }

                    html += '<td style="font-size: 14px; padding: 5px 10px">' +
                        '<input type="checkbox" class="k-checkbox" name="ymChkbox" id="ym'+date.getFullYear() + '-' + dtMonth +'" style="margin-right: 3px; width: 14px; height: 14px;" value="'+i+'" />' +
                        '<label for="ym'+date.getFullYear() + '-' + dtMonth +'" style="margin-bottom: 0px;">'+date.getFullYear() + '-' + dtMonth +'</label>' +
                        '</td>';

                    if(i % 12 == 11){
                        html += "</tr>";
                    }

                    date.setMonth(date.getMonth() + 1);
                }

                $("#bsYmTbl").html(html);
            }
        })
    }

     function fn_makePayrollPdf(acKey){

        var payRollYm = "";
        if($("input[name='ymChkbox']:checked").length > 0){

            $.each($("input[name='ymChkbox']:checked"), function(i, v){
                var bsYm = $(this).attr("id").replace("ym", "");
                var now = new Date();
                var data = {
                    pjtSn : $("#pjtSn").val(),
                    bsYm : bsYm
                }

                payRollYm += "," + bsYm;

                var result = customKendo.fn_customAjax("/inside/getPartRateEmpPayrollList", data);
                if(result.flag){
                    var ls = result.list;
                    var basicSum = 0;
                    var foodSum = 0;
                    var extraSum = 0;
                    var totalSum = 0;
                    var nationalSum = 0;
                    var healthSum = 0;
                    var careSum = 0;
                    var employSum = 0;
                    var incomeSum = 0;
                    var localIncomeSum = 0;
                    var etcSum = 0;
                    var deductionSum = 0;
                    var actualSum = 0;

                    var html = "";
                    html += '<div style="width: 100%; padding: 20px 30px; text-align: center;">';
                    html += '<h1 style="font-size: 24px; margin-bottom: 10px;">' + bsYm.split("-")[0] + '년 ' + bsYm.split("-")[1] + '월 급여대장</h1>';
                    html += '<table style="width: 100%; height:100%; margin-top: 10px; border-collapse: collapse; text-align: center; font-size: 11px;">';
                    html += '    <tbody>';
                    html += '        <tr>';
                    html += '            <th colspan="5" style="font-size: 14px; padding: 0 0 5px 0; text-align: left;">(사)캠틱종합기술원</th>';
                    html += '            <th colspan="9" style="font-size: 14px; padding: 0 0 5px 0; text-align: right;">지급년월일 : '+ $("#exnpDe").val().split("-")[0] + '년 ' + $("#exnpDe").val().split("-")[1] +'월 ' + $("#exnpDe").val().split("-")[2] +'일</th>';
                    html += '        </tr>';
                    html += '        <tr>';
                    html += '            <th style="border: 1px solid black; font-size: 11px; padding: 10px 5px; background-color: #FCF5E7;">사원정보</th>';
                    html += '            <th colspan="4" style="border: 1px solid black; font-size: 11px; padding: 10px 5px; background-color: #FCF5E7;">기본급여 및 제수당</th>';
                    html += '            <th colspan="8" style="border: 1px solid black; font-size: 11px; padding: 10px 5px; background-color: #FCF5E7;">제공제</th>';
                    html += '            <th style="border: 1px solid black; font-size: 11px; padding: 10px 5px; background-color: #FCF5E7;">차인지급액</th>';
                    html += '        </tr>';
                    html += '        <tr>';
                    html += '            <td style="border: 1px solid black; width: 40px; font-size: 11px; padding: 10px 5px; background-color: #FCF5E7;">성명</td>';
                    html += '            <td style="border: 1px solid black; width: 45px; font-size: 11px; padding: 10px 5px; background-color: #FFF;">기본급</td>';
                    html += '            <td style="border: 1px solid black; width: 45px; font-size: 11px; padding: 10px 5px; background-color: #FFF;">식대</td>';
                    html += '            <td style="border: 1px solid black; width: 45px; font-size: 11px; padding: 10px 5px; background-color: #FFF;">제수당</td>';
                    html += '            <td style="border: 1px solid black; width: 54px; font-size: 11px; padding: 10px 5px; background-color: #E6EEF7;">지급합계</td>';
                    html += '            <td style="border: 1px solid black; width: 45px; font-size: 11px; padding: 10px 5px; background-color: #FFF;">국민연금</td>';
                    html += '            <td style="border: 1px solid black; width: 45px; font-size: 11px; padding: 10px 5px; background-color: #FFF;">건강보험</td>';
                    html += '            <td style="border: 1px solid black; width: 45px; font-size: 11px; padding: 10px 5px; background-color: #FFF;">장기요양</td>';
                    html += '            <td style="border: 1px solid black; width: 45px; font-size: 11px; padding: 10px 5px; background-color: #FFF;">고용보험</td>';
                    html += '            <td style="border: 1px solid black; width: 45px; font-size: 11px; padding: 10px 5px; background-color: #FFF;">소득세</td>';
                    html += '            <td style="border: 1px solid black; width: 45px; font-size: 11px; padding: 10px 5px; background-color: #FFF;">주민세</td>';
                    html += '            <td style="border: 1px solid black; width: 45px; font-size: 11px; padding: 10px 5px; background-color: #FFF;">기타</td>';
                    html += '            <td style="border: 1px solid black; width: 54px; font-size: 11px; padding: 10px 5px; background-color: #E6EEF7;">공제합계</td>';
                    html += '            <td style="border: 1px solid black; width: 54px; font-size: 11px; padding: 10px 5px; background-color: #FCF5E7;">실수령액</td>';
                    html += '        </tr>';

                    for(var i=0; i<ls.length; i++){
                        html += '        <tr>';
                        html += '            <td style="border: 1px solid black; text-align: center; font-size: 11px; padding: 10px 5px; background-color: #FCF5E7;">'+ comma(ls[i].PART_EMP_NM) +'</td>';
                        html += '            <td style="border: 1px solid black; text-align: right; font-size: 11px; padding: 10px 5px; background-color: #FFF;">'+ comma(ls[i].BASIC_SALARY) +'</td>';
                        html += '            <td style="border: 1px solid black; text-align: right; font-size: 11px; padding: 10px 5px; background-color: #FFF;">'+ comma(ls[i].FOOD_PAY) +'</td>';
                        html += '            <td style="border: 1px solid black; text-align: right; font-size: 11px; padding: 10px 5px; background-color: #FFF;">'+ comma(ls[i].EXTRA_PAY) +'</td>';
                        html += '            <td style="border: 1px solid black; text-align: right; font-size: 11px; padding: 10px 5px; background-color: #E6EEF7;">'+ comma(Number(ls[i].SAL_TOT_PAY) - Number(ls[i].SI_PAY)) +'</td>';
                        html += '            <td style="border: 1px solid black; text-align: right; font-size: 11px; padding: 10px 5px; background-color: #FFF;">'+ comma(ls[i].NAT_PAY) +'</td>';
                        html += '            <td style="border: 1px solid black; text-align: right; font-size: 11px; padding: 10px 5px; background-color: #FFF;">'+ comma(ls[i].HETH_PAY) +'</td>';
                        html += '            <td style="border: 1px solid black; text-align: right; font-size: 11px; padding: 10px 5px; background-color: #FFF;">'+ comma(ls[i].CARE_PAY) +'</td>';
                        html += '            <td style="border: 1px solid black; text-align: right; font-size: 11px; padding: 10px 5px; background-color: #FFF;">'+ comma(ls[i].EMPL_PAY) +'</td>';
                        html += '            <td style="border: 1px solid black; text-align: right; font-size: 11px; padding: 10px 5px; background-color: #FFF;">'+ comma(ls[i].INC_PAY) +'</td>';
                        html += '            <td style="border: 1px solid black; text-align: right; font-size: 11px; padding: 10px 5px; background-color: #FFF;">'+ comma(ls[i].LOC_INC_PAY) +'</td>';
                        html += '            <td style="border: 1px solid black; text-align: right; font-size: 11px; padding: 10px 5px; background-color: #FFF;">'+ comma(ls[i].ETC_PAY) +'</td>';
                        html += '            <td style="border: 1px solid black; text-align: right; font-size: 11px; padding: 10px 5px; background-color: #E6EEF7;">'+ comma(ls[i].INS_TOT_PAY) +'</td>';
                        html += '            <td style="border: 1px solid black; text-align: right; font-size: 11px; padding: 10px 5px; background-color: #FCF5E7;">'+ comma(ls[i].SUP_PAY) +'</td>';
                        html += '        </tr>';

                        basicSum += Number(ls[i].BASIC_SALARY);
                        foodSum += Number(ls[i].FOOD_PAY);
                        extraSum += Number(ls[i].EXTRA_PAY);
                        totalSum += Number(ls[i].SAL_TOT_PAY) - Number(ls[i].SI_PAY);
                        nationalSum += Number(ls[i].NAT_PAY);
                        healthSum += Number(ls[i].HETH_PAY);
                        careSum += Number(ls[i].CARE_PAY);
                        employSum += Number(ls[i].EMPL_PAY);
                        incomeSum += Number(ls[i].INC_PAY);
                        localIncomeSum += Number(ls[i].LOC_INC_PAY);
                        etcSum += Number(ls[i].ETC_PAY);
                        deductionSum += Number(ls[i].INS_TOT_PAY);
                        actualSum += Number(ls[i].SUP_PAY);
                    }

                    html += '        <tr>';
                    html += '            <td style="border: 1px solid black; text-align: center; font-size: 11px; padding: 10px 5px; background-color: #FCF5E7;">합계</td>';
                    html += '            <td style="border: 1px solid black; text-align: right; font-size: 11px; padding: 10px 5px; background-color: #FCF5E7;">'+ comma(basicSum) +'</td>';
                    html += '            <td style="border: 1px solid black; text-align: right; font-size: 11px; padding: 10px 5px; background-color: #FCF5E7;">'+ comma(foodSum) +'</td>';
                    html += '            <td style="border: 1px solid black; text-align: right; font-size: 11px; padding: 10px 5px; background-color: #FCF5E7;">'+ comma(extraSum) +'</td>';
                    html += '            <td style="border: 1px solid black; text-align: right; font-size: 11px; padding: 10px 5px; background-color: #FCF5E7;">'+ comma(totalSum) +'</td>';
                    html += '            <td style="border: 1px solid black; text-align: right; font-size: 11px; padding: 10px 5px; background-color: #FCF5E7;">'+ comma(nationalSum) +'</td>';
                    html += '            <td style="border: 1px solid black; text-align: right; font-size: 11px; padding: 10px 5px; background-color: #FCF5E7;">'+ comma(healthSum) +'</td>';
                    html += '            <td style="border: 1px solid black; text-align: right; font-size: 11px; padding: 10px 5px; background-color: #FCF5E7;">'+ comma(careSum) +'</td>';
                    html += '            <td style="border: 1px solid black; text-align: right; font-size: 11px; padding: 10px 5px; background-color: #FCF5E7;">'+ comma(employSum) +'</td>';
                    html += '            <td style="border: 1px solid black; text-align: right; font-size: 11px; padding: 10px 5px; background-color: #FCF5E7;">'+ comma(incomeSum) +'</td>';
                    html += '            <td style="border: 1px solid black; text-align: right; font-size: 11px; padding: 10px 5px; background-color: #FCF5E7;">'+ comma(localIncomeSum) +'</td>';
                    html += '            <td style="border: 1px solid black; text-align: right; font-size: 11px; padding: 10px 5px; background-color: #FCF5E7;">'+ comma(etcSum) +'</td>';
                    html += '            <td style="border: 1px solid black; text-align: right; font-size: 11px; padding: 10px 5px; background-color: #FCF5E7;">'+ comma(deductionSum) +'</td>';
                    html += '            <td style="border: 1px solid black; text-align: right; font-size: 11px; padding: 10px 5px; background-color: #FCF5E7;">'+ comma(actualSum) +'</td>';
                    html += '        </tr>';
                    html += '    </tbody>';
                    html += '</table>';
                    html += '</div>';
                }

                $.ajax({
                    url : "/inside/makePayrollPdf",
                    data: {
                        htmlContents : html,
                        pjtSn : $("#pjtSn").val(),
                        bsYm : bsYm
                    },
                    type : "post",
                    dataType : "json",
                    success : function(rs){
                        console.log(rs);
                    }
                });
            })
        }

        fn_reqRegPopup(acKey, payRollYm);
    }

    function fn_drawSbjSepTable(){
        var data = {
            pjtSn : $("#pjtSn").val(),
        }

        var result = customKendo.fn_customAjax("/inside/getG20ProejctList", data);
        if(result.flag){
            var rs = result.list;

            if(rs.length > 0){
                var html = "";

                for(var i=0; i<rs.length; i++){
                    html += '<tr><td style="font-size: 14px; padding: 5px 10px">' +
                        '<input type="radio" name="sbjRadio" id="'+rs[i].pjtSeq +'" style="margin-right: 3px; width: 14px; height: 14px;" value="'+rs[i].pjtSeq +'" />' +
                        '<label for="'+rs[i].pjtSeq +'" style="margin-bottom: 0px;">'+rs[i].pjtName +'</label>' +
                        '</td></tr>';
                }

                $("#sbjSepTbl").html(html);
                $("#sbjSepDiv").show();
            } else {
                $("#sbjSepDiv").hide();
            }
        }
    }
</script>