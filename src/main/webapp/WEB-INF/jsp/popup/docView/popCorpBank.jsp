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
<input type="hidden" id="corpBankSn" name="corpBankSn" value="${params.key}" />

<div style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM"><span style="position: relative; top: 3px;" id="popTitle">통장 발급신청서</span>
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
                    <th>사업명</th>
                    <td colspan="3">
                        <input type="text" id="bsTitle" name="bsTitle" value="" disabled style="width: 80%">
                        <input type="hidden" id="pjtSn" name="pjtSn" />
                        <button type="button" class="k-button k-button-solid-base" onclick="fn_projectPop();">조회</button>
                    </td>
                </tr>
                <tr>
                    <th>과제명</th>
                    <td colspan="3">
                        <input type="text" id="pjtNm" disabled name="pjtNm" value="" >
                    </td>
                </tr>
                <tr>
                    <th>지원부처</th>
                    <td>
                        <input type="text" id="sbjDepNm" disabled name="sbjDepNm" value="" >
                    </td>
                    <th>주관기관</th>
                    <td>
                        <input type="text" id="crmNm" disabled name="crmNm" value="" >
                    </td>
                </tr>
                <tr>
                    <th>사업기간</th>
                    <td colspan="3">
                        <input type="text" id="strDe" disabled style="width: 30%" /> ~ <input type="text" id="endDe" disabled style="width: 30%" />
                    </td>
                </tr>
                <tr>
                    <th>발급은행</th>
                    <td>
                        <input type="text" id="bank" name="bank" value="">
                    </td>
                    <th>발급기한</th>
                    <td>
                        <input type="text" id="issDe" name="issDe" value="">
                    </td>
                </tr>
                <tr>
                    <th>사용용도</th>
                    <td>
                        <input type="text" id="useRmk" name="useRmk" value="">
                    </td>
                    <th>법인사업비</th>
                    <td>
                        <input type="text" id="corpExp" name="corpExp" style="text-align: right" value="">
                    </td>
                </tr>
                </thead>
            </table>
        </div>
    </div>
</div>
<script type="text/javascript">

    $(function(){
        customKendo.fn_textBox(["empName", "deptName", "bsTitle", "pjtNm", "crmNm", "bank", "useRmk", "corpExp"]);


        var lgCodeDs = customKendo.fn_customAjax("/project/selLgCode", {grpSn: "SUP_DEP"});
        customKendo.fn_dropDownList("sbjDepNm", lgCodeDs.rs, "LG_CD_NM", "LG_CD");

        customKendo.fn_datePicker("strDe", "depth", "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("endDe", "depth", "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("issDe", "depth", "yyyy-MM-dd", new Date());

        fn_setData();
    });

    function fn_save (){
        var parameters = {
            empName : $("#empName").val(),
            deptName : $("#deptName").val(),
            empSeq : $("#empSeq").val(),
            deptSeq : $("#deptSeq").val(),
            pjtSn : $("#pjtSn").val(),
            bank : $("#bank").val(),
            issDe : $("#issDe").val(),
            useRmk : $("#useRmk").val(),
            corpExp : uncomma($("#corpExp").val())
        };

        if($("#pjtSn").val() == ""){
            alert("사업을 선택해주세요.")
            return;
        }

        if($("#corpBankSn").val() != ""){
            parameters.corpBankSn = $("#corpBankSn").val();
        }

       var rs = customKendo.fn_customAjax("/customDoc/saveCorpBank", parameters);

       if(rs.code == 200){
           alert("저장되었습니다.");

           location.href = "/customDoc/pop/popCorpBank.do?key=" + rs.params.corpBankSn;
       }
    }

    function fn_setData () {
        var rs = customKendo.fn_customAjax("/customDoc/getCorpBank", {corpBankSn : $("#corpBankSn").val()});

        var result = rs.data;

        $("#empName").val(result.EMP_NAME);
        $("#deptName").val(result.DEPT_NAME);
        $("#empSeq").val(result.EMP_SEQ);
        $("#deptSeq").val(result.DEPT_SEQ);
        $("#pjtSn").val(result.PJT_SN);

        var rs = customKendo.fn_customAjax("/project/getProjectData", {pjtSn: result.PJT_SN});

        rs = rs.data;

        $("#bsTitle").val(rs.BS_TITLE);
        $("#pjtNm").val(rs.PJT_NM)

        var lgCodeDs = customKendo.fn_customAjax("/project/selLgCode", {grpSn : "SUP_DEP"});

        console.log(lgCodeDs)
        $("#sbjDepNm").data("kendoDropDownList").value(rs.SBJ_DEP);

        $("#crmNm").val(rs.CRM_NM);
        $("#strDe").val(rs.PJT_START_DT);
        $("#endDe").val(rs.PJT_END_DT);

        $("#bank").val(result.BANK);
        $("#issDe").val(result.ISS_DE);
        $("#useRmk").val(result.USE_RMK);
        $("#corpExp").val(comma(result.CORP_EXP));
        $("#corpBankSn").val(result.CORP_BANK_SN);


    }

    function fn_projectPop (type){
        var url = "/project/pop/projectView.do";
        var name = "_blank";
        var option = "width = 1100, height = 700, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    }

    function selectProject(key, name, cd) {

        var rs = customKendo.fn_customAjax("/project/getProjectData", {pjtSn: key});

        rs = rs.data;

        $("#bsTitle").val(rs.BS_TITLE);
        $("#pjtNm").val(rs.PJT_NM)
        $("#pjtSn").val(key);

        var lgCodeDs = customKendo.fn_customAjax("/project/selLgCode", {grpSn : "SUP_DEP"});

        console.log(lgCodeDs)
        $("#sbjDepNm").data("kendoDropDownList").value(rs.SBJ_DEP);

        $("#crmNm").val(rs.CRM_NM);
        $("#strDe").val(rs.PJT_START_DT);
        $("#endDe").val(rs.PJT_END_DT);

        $("#corpExp").val(comma(rs.PJT_AMT));
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