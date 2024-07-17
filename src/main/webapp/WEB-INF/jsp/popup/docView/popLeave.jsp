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

<input type="hidden" id="deptSeq" name="deptSeq" value="${loginVO.orgnztId}">
<input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">

<form id="leaveDraftFrm" method="post">
    <input type="hidden" id="leaveSn" name="leaveSn" value="${params.key}" />
    <input type="hidden" id="menuCd" name="menuCd" value="leave">
    <input type="hidden" id="type" name="type" value="drafting">
    <input type="hidden" id="nowUrl" name="nowUrl" />
</form>

<div style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM"><span style="position: relative; top: 3px;" id="popTitle">휴직신청서</span>
            </h3>
            <div class="btn-st popButton">
                <span id="leaveBtnBox">

                </span>
                <button type="button" class="k-button k-button-solid-info" id="saveBtn" style="margin-right:5px;" onclick="fn_save()">저장</button>
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
                        <input type="text" id="deptName" disabled name="deptName">
                    </td>
                    <th>직위</th>
                    <td>
                        <input type="text" id="position" disabled name="position">
                    </td>
                </tr>
                <tr>
                    <th>성명</th>
                    <td>
                        <input type="text" id="empName" disabled name="empName">
                    </td>
                    <th>입사일자</th>
                    <td>
                        <input type="text" id="joinDe" disabled name="joinDe">
                    </td>
                </tr>
                <tr>
                    <th>신청구분</th>
                    <td colspan="3">
                        <input type="text" id="leaveType" style="width: 30%">
                    </td>
                </tr>
                <tr>
                    <th>신청기간</th>
                    <td colspan="3">
                        <input type="text" id="strDe" style="width: 30%"> ~ <input type="text" id="endDe" style="width: 30%">
                    </td>
                </tr>
                <tr>
                    <th>휴직사유</th>
                    <td colspan="3">
                        <textArea id="leaveCont"></textArea>
                    </td>
                </tr>
                <tr>
                    <th>기타사항</th>
                    <td colspan="3">
                        <textArea id="etc"></textArea>
                    </td>
                </tr>

                <tr class="aTypeTr" style="display: none">
                    <th>증빙서류 구분</th>
                    <td colspan="3">
                        <input type="text" id="fileType" style="width: 30%">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>첨부파일
                    </th>
                    <td colspan="3">
                        <label for="file" class="k-button k-button-solid-base">파일첨부</label>
                        <input type="file" id="file" name="file" onchange="fileChange(this)" style="display: none">
                        <span id="fileName"></span>
                    </td>
                </tr>
                </thead>
            </table>
        </div>
    </div>
</div>
<script type="text/javascript">

    $(function(){
        customKendo.fn_textBox(["empName", "position", "deptName"]);

        $("#leaveCont").kendoTextArea({
            rows: 5
        });

        $("#etc").kendoTextArea({
            rows: 5
        });

        customKendo.fn_datePicker("joinDe", "depth", "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("strDe", "depth", "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("endDe", "depth", "yyyy-MM-dd", new Date());

        const dropDownDataSource = [
            { text : "육아휴직", value : "A" },
            { text : "군휴직", value : "B" },
            { text : "일반휴직", value : "C" }
        ];
        customKendo.fn_dropDownList("leaveType", dropDownDataSource, "text", "value", 2);
        $("#leaveType").data("kendoDropDownList").bind("change", function(){
            if($("#leaveType").data("kendoDropDownList").value() == "A"){
                $(".aTypeTr").show();
            }else{
                $(".aTypeTr").hide();
            }
        });

        const dropDownDataSource2 = [
            { text : "출생 증명서", value : "A" },
            { text : "주민등록등본", value : "B" },
            { text : "가족관계증명서", value : "C" }
        ];
        customKendo.fn_dropDownList("fileType", dropDownDataSource2, "text", "value", 2);

        if($("#leaveSn").val() != "") {
            fn_setData();
        }else{
            const userInfo = getUser($("#empSeq").val());
            $("#deptSeq").val(userInfo.DEPT_SEQ);
            $("#deptName").val(userInfo.DEPT_NAME);
            $("#empName").val(userInfo.EMP_NAME_KR);
            $("#position").val(fn_getSpot(userInfo.DUTY_NAME, userInfo.POSITION_NAME));
            $("#joinDe").val(userInfo.JOIN_DAY);
        }
    });

    function fn_save (){
        var parameters = {
            empSeq : $("#empSeq").val(),
            deptSeq : $("#deptSeq").val(),
            deptName : $("#deptName").val(),
            empName : $("#empName").val(),
            position : $("#position").val(),
            joinDe : $("#joinDe").val(),

            leaveType : $("#leaveType").val(),
            strDe : $("#strDe").val(),
            endDe : $("#endDe").val(),
            leaveCont : $("#leaveCont").val(),
            etc : $("#etc").val(),

            fileType : $("#fileType").val(),
        };

        var fd = new FormData();
        fd.append("empSeq", parameters.empSeq);
        fd.append("deptSeq", parameters.deptSeq);
        fd.append("deptName", parameters.deptName);
        fd.append("empName", parameters.empName);
        fd.append("position", parameters.position);
        fd.append("joinDe", parameters.joinDe);

        fd.append("leaveType", parameters.leaveType);
        fd.append("strDe", parameters.strDe);
        fd.append("endDe", parameters.endDe);
        fd.append("leaveCont", parameters.leaveCont);
        fd.append("etc", parameters.etc);

        fd.append("fileType", parameters.fileType);

        if($("#leaveSn").val() != ""){
            fd.append("leaveSn", $("#leaveSn").val());
        }
        if($("#file")[0].files.length == 1){
            fd.append("file", $("#file")[0].files[0]);
        }

        $.ajax({
            url : "/customDoc/saveLeave",
            data : fd,
            type : "post",
            dataType : "json",
            contentType: false,
            processData: false,
            enctype : 'multipart/form-data',
            async: false,
            success : function(rs){
                alert("저장되었습니다.");
                location.href = "/customDoc/pop/popLeave.do?key=" + rs.params.leaveSn;
            }
        });
    }

    function fn_setData () {
        var rs = customKendo.fn_customAjax("/customDoc/getLeaveData", {leaveSn : $("#leaveSn").val()});

        var result = rs.data;

        const userInfo = getUser($("#empSeq").val());
        $("#deptSeq").val(userInfo.DEPT_SEQ);
        $("#deptName").val(userInfo.DEPT_NAME);
        $("#empName").val(userInfo.EMP_NAME_KR);
        $("#position").val(fn_getSpot(userInfo.DUTY_NAME, userInfo.POSITION_NAME));
        $("#joinDe").val(userInfo.JOIN_DAY);

        $("#leaveType").data("kendoDropDownList").value(result.LEAVE_TYPE);
        if($("#leaveType").data("kendoDropDownList").value() == "A"){
            $(".aTypeTr").show();
        }else{
            $(".aTypeTr").hide();
        }

        $("#strDe").val(result.STR_DE);
        $("#endDe").val(result.END_DE);
        $("#leaveCont").val(result.LEAVE_CONT);
        $("#etc").val(result.ETC);

        $("#fileType").data("kendoDropDownList").value(result.FILE_TYPE);

        var file = rs.file;
        if(file != null && file != ''){
            $("#fileName").html('<span style="cursor: pointer" onclick="fileDown(\''+file.file_path + file.file_uuid+'\', \''+file.file_org_name+'.'+file.file_ext+'\')">'+file.file_org_name+ '.' + file.file_ext+'</span>');
        }

        fn_btnSet(result);
        fn_kendoUIEnableSet(result);
    }

    function fn_btnSet (data) {
        let html = makeApprBtnHtml(data, "leaveDrafting()");
        $("#leaveBtnBox").html(html);

        if(data != null && data.DOC_ID != null){
            reDraftOnlyOne(data.DOC_ID, $("#empSeq").val(), "reBtn");
        }
    }

    function fn_kendoUIEnableSet (data) {
        if(data != null){
            /** 상신, 재상신, 최종결재완료 상태일때 UI 비활성화 */
            if(data.STATUS == "10" || data.STATUS == "50" || data.STATUS == "100"){
                $("#saveBtn").css("display", "none");
            }
        }
    }

    function leaveDrafting(){
        $("#leaveDraftFrm").one("submit", function() {
            var url = "/popup/customDoc/approvalFormPopup/leaveApprovalPop.do";
            var name = "_self";
            var option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=yes, scrollbars = yes, status=no, top=50, left=50";
            var popup = window.open(url, name, option);
            this.action = "/popup/customDoc/approvalFormPopup/leaveApprovalPop.do";
            this.method = 'POST';
            this.target = '_self';
        }).trigger("submit");
    }

    function fileChange(e){
        $(e).next().text($(e)[0].files[0].name);
    }
    
</script>
</body>
</html>