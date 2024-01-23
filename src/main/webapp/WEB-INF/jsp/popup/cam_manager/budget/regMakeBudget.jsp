<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

<style>

</style>

<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="key" value="${params.key}" />

<div>
    <div class="card-header pop-header">
        <h3 class="card-title title_NM">
            <span style="position: relative; top: 3px;">
                예산신규등록
            </span>
        </h3>
        <div id="purcBtnDiv" class="btn-st popButton" style="font-size: 13px">
            <button type="button" class="k-button k-button-solid-info" onclick="">등록</button>
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
            <tr>
                <th scope="row" class="text-center th-color" colspan="4">
                    <span class="red-star">*</span>세입예산
                </th>
            </tr>
            <tr>
                <td colspan="4">
                    <table class="popTable table table-bordered mb-0">
                        <colgroup>
                            <col width="22%">
                            <col width="22%">
                            <col width="22%">
                            <col width="22%">
                            <col width="12%">
                        </colgroup>
                        <thead>
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
                                    <input type="text" id="jang0" value="" style="width: 80%">
                                    <i class="k-i-plus k-icon" style="cursor: pointer" id="plusJangIcon0" onclick="fn_budgetPop('A', 0)"></i>
                                </td>
                                <td>
                                    <input type="text" id="gwan0" value="" style="width: 80%">
                                    <i class="k-i-plus k-icon" style="cursor: pointer" id="plusGwanIcon0" onclick="fn_budgetPop('B', 0)"></i>
                                </td>
                                <td>
                                    <input type="text" id="hang0" value="" style="width: 80%">
                                    <i class="k-i-plus k-icon" style="cursor: pointer" id="plusHangIcon0" onclick="fn_budgetPop('C', 0)"></i>
                                </td>
                                <td>
                                    <input type="text" id="budgetAmt0" value="0" onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" style="width: 100%; text-align: right">
                                </td>
                                <td>

                                </td>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th scope="row" class="text-center th-color" style="text-align: right" colspan="3">
                                    <span class="red-star"></span>합계
                                </th>
                                <td>
                                    <input type="text" id="budgetTotAmt">
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
                    <span class="red-star">*</span>세출예산
                </th>
            </tr>

            </thead>
        </table>
    </div>
</div>

<script>

    $(function(){
        customKendo.fn_textBox(["jang0", "gwan0", "hang0", "budgetAmt0", "budgetTotAmt"]);

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
        })
    });

    function fn_budgetPop(type, idx){
        var url = "/budget/pop/budgetPop.do?type=" + type + "&idx=" + idx;

        var name = "_blank";
        var option = "width = 600, height = 750, top = 100, left = 200, location = no";

        var popup = window.open(url, name, option);
    }

    function inputNumberFormat (obj){
        obj.value = comma(uncomma(obj.value));
    }

    function comma(str) {
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    }

    function uncomma(str) {
        str = String(str);
        return str.replace(/[^\d]+/g, '');
    }
</script>