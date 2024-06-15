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
<input type="hidden" id="corpCardSn" name="corpCardSn" value="${params.key}" />

<div style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM"><span style="position: relative; top: 3px;" id="popTitle">법인카드 발급신청서</span>
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
                    <th>신청자</th>
                    <td>
                        <input type="text" id="empName" disabled name="empName" value="${loginVO.name}">
                    </td>
                    <th>소속부서</th>
                    <td>
                        <input type="text" id="deptName" disabled name="deptName" value="${loginVO.orgnztNm}">
                    </td>
                </tr>
                <tr>
                    <th>신청구분</th>
                    <td colspan="3">
                        <span id="type"></span>
                    </td>
                </tr>
                <tr>
                    <th>신청일자</th>
                    <td>
                        <input type="text" id="appDe" name="appDe" value="">
                    </td>
                    <th>신청매수</th>
                    <td>
                        <input type="text" id="appCnt" name="appCnt" value="">
                    </td>
                </tr>
                <tr>
                    <th>발급사유</th>
                    <td colspan="3">
                        <textarea type="text" id="appIss" name="appIss" value=""></textarea>
                    </td>
                </tr>
                </thead>
            </table>
        </div>
    </div>
</div>
<script type="text/javascript">

    $(function(){
        customKendo.fn_textBox(["empName", "deptName", "appCnt"]);

        $("#appIss").kendoTextArea({
            rows: 5
        });

        $("#type").kendoRadioGroup({
            items: [
                { label : "신규발급", value : "A" },
                { label : "재발급", value : "B" }
            ],
            layout : "horizontal",
            labelPosition : "after",
            value : "0"
        })


        customKendo.fn_datePicker("appDe", "depth", "yyyy-MM-dd", new Date());

        if($("#corpCardSn").val() != "") {
            fn_setData();
        }
    });

    function fn_save (){
        var parameters = {
            empName : $("#empName").val(),
            deptName : $("#deptName").val(),
            empSeq : $("#empSeq").val(),
            deptSeq : $("#deptSeq").val(),
            appDe : $("#appDe").val(),
            appCnt : $("#appCnt").val(),
            appIss : $("#appIss").val(),
            type : $("#type").data("kendoRadioGroup").value(),
        };

        if($("#corpCardSn").val() != ""){
            parameters.corpCardSn = $("#corpCardSn").val();
        }

       var rs = customKendo.fn_customAjax("/customDoc/saveCorpCard", parameters);

       if(rs.code == 200){
           alert("저장되었습니다.");

           location.href = "/customDoc/pop/popCorpCard.do?key=" + rs.params.corpCardSn;
       }
    }

    function fn_setData () {
        var rs = customKendo.fn_customAjax("/customDoc/getCorpCardData", {corpCardSn : $("#corpCardSn").val()});

        var result = rs.data;

        $("#appDe").val(result.APP_DE);
        $("#appCnt").val(result.APP_CNT);
        $("#appIss").val(result.APP_ISS);
        $("#type").data("kendoRadioGroup").value(result.TYPE);

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