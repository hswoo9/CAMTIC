<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<style>
    th {
        background-color: #f0f6ff;
    }
</style>
<body class="font-opensans" style="background-color:#fff;">
<script type="text/javascript" src="/js/intra/cam_mng/companyCard/regCardToPop.js?v=${today}"/></script>
<script type="text/javascript" src="/js/intra/cam_item/popup/popBomView.js?v=${today}"/></script>

<input type="hidden" id="deptSeq" name="deptSeq" value="${loginVO.orgnztId}">
<input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
<input type="hidden" id="condSn" name="condSn" value="${params.key}" />

<div style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM"><span style="position: relative; top: 3px;" id="popTitle">경조비 지급신청서</span>
            </h3>
            <div class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-info" style="margin-right:5px;" onclick="fn_save()">저장</button>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">닫기</button>
            </div>
        </div>
        <div>
            <table class="searchTable table table-bordered mb-0 mt-10">
                <colgroup>
                    <col width="20%">
                    <col width="30%">
                    <col width="20%">
                    <col width="30%">
                </colgroup>
                <thead>
                <tr>
                    <th>부서명</th>
                    <td>
                        <input type="text" id="deptName" disabled name="deptName" value="${loginVO.orgnztNm}">
                    </td>
                    <th>성명</th>
                    <td>
                        <input type="text" id="empName" disabled name="empName" value="${loginVO.name}">
                    </td>
                </tr>
                <tr>
                    <th>직급</th>
                    <td>
                        <input type="text" id="position" disabled name="position" value="${loginVO.dutyNm eq '' ? loginVO.positionNm : loginVO.dutyNm}">
                    </td>
                    <th>경조일</th>
                    <td>
                        <input type="text" id="condDe" disabled name="condDe" value="">
                    </td>
                </tr>
                <tr>
                    <th>경조내용</th>
                    <td colspan="3">
                        <input type="text" id="condCont" name="condCont">
                    </td>
                </tr>
                <tr>
                    <th>경조 대상자 성명</th>
                    <td>
                        <input type="text" id="condTargetName" />
                    </td>
                    <th>관계</th>
                    <td>
                        <input type="text" id="condRet" />
                    </td>
                </tr>
                <tr>
                    <th>신청금액</th>
                    <td colspan="3">
                        <input type="text" id="condAmt" style="text-align: right; width: 25%;" onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" />
                    </td>
                </tr>
                <tr>
                    <th>비고</th>
                    <td colspan="3">
                        <textArea id="etc"></textArea>
                    </td>
                </tr>

                </thead>
            </table>
        </div>
    </div>
</div>
<script type="text/javascript">

    $(function(){
        customKendo.fn_textBox(["empName", "position", "deptName", "condCont", "condTargetName", "condRet", "condAmt"]);

        $("#etc").kendoTextArea({
            rows: 5
        });

        customKendo.fn_datePicker("condDe", "depth", "yyyy-MM-dd", new Date());

        if($("#condSn").val() != "") {
            fn_setData();
        }
    });

    function fn_save (){
        var parameters = {
            empName : $("#empName").val(),
            deptName : $("#deptName").val(),
            empSeq : $("#empSeq").val(),
            deptSeq : $("#deptSeq").val(),
            position : $("#position").val(),
            condCont : $("#condCont").val(),
            condDe : $("#condDe").val(),
            condTargetName : $("#condTargetName").val(),
            condRet : $("#condRet").val(),
            condAmt : comma($("#condAmt").val()),
            etc : $("#etc").val()
        };

        if($("#condSn").val() != ""){
            parameters.condSn = $("#condSn").val();
        }

       var rs = customKendo.fn_customAjax("/customDoc/saveCond", parameters);

       if(rs.code == 200){
           alert("저장되었습니다.");

           location.href = "/customDoc/pop/popCond.do?key=" + rs.params.condSn;
       }
    }

    function fn_setData () {
        var rs = customKendo.fn_customAjax("/customDoc/getCondData", {condSn : $("#condSn").val()});

        var result = rs.data;

        $("#empName").val(result.EMP_NAME);
        $("#deptName").val(result.DEPT_NAME);
        $("#position").val(result.POSITION);
        $("#condCont").val(result.COND_CONT);
        $("#condDe").val(result.COND_DE);
        $("#condTargetName").val(result.COND_TARGET_NAME);
        $("#condRet").val(result.COND_RET);
        $("#condAmt").val(uncomma(result.COND_AMT));
        $("#etc").val(result.ETC);
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
</body>
</html>