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
<input type="hidden" id="detSn" name="detSn" value="${params.key}" />
<input type="hidden" id="deptName" name="deptName" value="${loginVO.orgnztNm}"/>

<div style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM"><span style="position: relative; top: 3px;" id="popTitle">경위서</span>
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
                    <th>성명</th>
                    <td>
                        <input type="text" id="empName" disabled name="empName" value="${loginVO.name}">
                    </td>
                    <th>생년월일</th>
                    <td>
                        <input type="text" id="bday" disabled name="bday" value="${data.BDAY}">
                    </td>
                </tr>
                <tr>
                    <th>소속</th>
                    <td>
                        <input type="text" id="joinComp" value="캠틱종합기술원" />
                    </td>
                    <th>소속</th>
                    <td>
                        <input type="text" id="position" value="${loginVO.dutyNm eq '' ? loginVO.positionNm : loginVO.dutyNm}" />
                    </td>
                </tr>
                <tr>
                    <th>제목</th>
                    <td colspan="3">
                        <input type="text" id="detTitle" name="detTitle">
                    </td>
                </tr>
                <tr>
                    <th>일시</th>
                    <td colspan="3">
                        <input type="text" id="detDe" style="width: 25%"/>
                    </td>
                </tr>
                <tr>
                    <th>장소</th>
                    <td colspan="3">
                        <input type="text" id="detLoc" />
                    </td>
                </tr>
                <tr>
                    <th>내용</th>
                    <td colspan="3">
                        <textArea id="detCont"></textArea>
                    </td>
                </tr>
                <tr>
                    <th>기타사항</th>
                    <td colspan="3">
                        <input type="text" id="detEtc" />
                    </td>
                </tr>

                </thead>
            </table>
        </div>
    </div>
</div>
<script type="text/javascript">

    $(function(){
        customKendo.fn_textBox(["empName", "position", "detTitle", "detLoc", "detCont", "detEtc", "bday", "joinComp"]);

        $("#detCont").kendoTextArea({
            rows: 5
        });

        customKendo.fn_datePicker("detDe", "depth", "yyyy-MM-dd", new Date());

        if($("#detSn").val() != "") {
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
            detTitle : $("#detTitle").val(),
            detDe : $("#detDe").val(),
            detLoc : $("#detLoc").val(),
            detCont : $("#detCont").val(),
            detEtc : $("#detEtc").val(),
            bday : $("#bday").val(),
            joinComp : $("#joinComp").val()
        };

        if($("#detSn").val() != ""){
            parameters.detSn = $("#detSn").val();
        }

       var rs = customKendo.fn_customAjax("/customDoc/saveDetails", parameters);

       if(rs.code == 200){
           alert("저장되었습니다.");

           location.href = "/customDoc/pop/popDetails.do?key=" + rs.params.detSn;
       }
    }

    function fn_setData () {
        var rs = customKendo.fn_customAjax("/customDoc/getDetailsData", {detSn : $("#detSn").val()});

        var result = rs.data;

        $("#empName").val(result.EMP_NAME);
        $("#deptName").val(result.DEPT_NAME);
        $("#position").val(result.POSITION);
        $("#detTitle").val(result.DET_TITLE);
        $("#detDe").val(result.DET_DE);
        $("#detLoc").val(result.DET_LOC);
        $("#detCont").val(result.DET_CONT);
        $("#detEtc").val(result.DET_ETC);
        $("#bday").val(result.BDAY);
        $("#joinComp").val(result.JOIN_COMP);
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