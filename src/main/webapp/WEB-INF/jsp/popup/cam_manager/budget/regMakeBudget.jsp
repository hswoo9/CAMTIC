<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/budget/regMakeBudget.js?v=${today}'/>"></script>
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
            <button type="button" class="k-button k-button-solid-info" id="regBtn" onclick="regMakeBudget.fn_save('S')">등록</button>
            <button type="button" class="k-button k-button-solid-primary" style="display: none;" id="modBtn" onclick="regMakeBudget.fn_save('M')">수정</button>
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
                            <col width="17%">
                            <col width="17%">
                            <col width="17%">
                            <col width="17%">
                            <col width="17%">
                            <col width="15%">
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
                                <th scope="row" class="text-center th-color">
                                    <span class="red-star"></span>
                                </th>
                            </tr>
                            <tr>
                                <td>
                                    <input type="hidden" id="pjtBudgetSn0" />
                                    <input type="text" id="jang0" value="" style="width: 80%" readonly />
                                    <input type="hidden" id="jangCd0" value="" >
                                    <i class="k-i-plus k-icon" style="cursor: pointer" onclick="regMakeBudget.fn_budgetPop('A', 0, 'A')"></i>
                                </td>
                                <td>
                                    <input type="text" id="gwan0" value="" style="width: 80%" readonly />
                                    <input type="hidden" id="gwanCd0" value="" >
                                    <i class="k-i-plus k-icon" style="cursor: pointer" onclick="regMakeBudget.fn_budgetPop('B', 0, 'A')"></i>
                                </td>
                                <td>
                                    <input type="text" id="hang0" value="" style="width: 80%" readonly />
                                    <input type="hidden" id="hangCd0" value="" >
                                    <i class="k-i-plus k-icon" style="cursor: pointer" onclick="regMakeBudget.fn_budgetPop('C', 0, 'A')"></i>
                                </td>
                                <td>
                                    <input type="text" id="budgetAmt0" class="budgetAmt" value="0" onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" style="width: 100%; text-align: right">
                                </td>
                                <td>
                                    <input type="text" id="budgetType0" class="budgetType" />
                                </td>
                                <td style="text-align: center">
                                    <button type="button" class="k-button k-button-solid-base" name="aButton" onclick="regMakeBudget.fn_addRow('A')">추가</button>
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
                                <th colspan="2" scope="row" class="text-center th-color">
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
                            <col width="17%">
                            <col width="17%">
                            <col width="17%">
                            <col width="17%">
                            <col width="17%">
                            <col width="15%">
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
                            <th scope="row" class="text-center th-color">
                                <span class="red-star"></span>
                            </th>
                        </tr>
                        <tr>
                            <td>
                                <input type="hidden" id="mPjtBudgetSn0" />
                                <input type="text" id="mJang0" value="" style="width: 80%" readonly />
                                <input type="hidden" id="mJangCd0" value="" >
                                <i class="k-i-plus k-icon" style="cursor: pointer" onclick="regMakeBudget.fn_budgetPop('A', 0, 'B')"></i>
                            </td>
                            <td>
                                <input type="text" id="mGwan0" value="" style="width: 80%" readonly />
                                <input type="hidden" id="mGwanCd0" value="" >
                                <i class="k-i-plus k-icon" style="cursor: pointer" onclick="regMakeBudget.fn_budgetPop('B', 0, 'B')"></i>
                            </td>
                            <td>
                                <input type="text" id="mHang0" value="" style="width: 80%" readonly />
                                <input type="hidden" id="mHangCd0" value="" >
                                <i class="k-i-plus k-icon" style="cursor: pointer" onclick="regMakeBudget.fn_budgetPop('C', 0, 'B')"></i>
                            </td>
                            <td>
                                <input type="text" id="mBudgetAmt0" class="mBudgetAmt"  value="0" onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" style="width: 100%; text-align: right">
                            </td>
                            <td>
                                <input type="text" id="mBudgetType0" class="mBudgetType" />
                            </td>
                            <td style="text-align: center">
                                <button type="button" class="k-button k-button-solid-base" name="bButton" onclick="regMakeBudget.fn_addRow('B')">추가</button>
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
                            <th colspan="2" scope="row" class="text-center th-color">
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
        regMakeBudget.fn_defaultScript();
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
</script>