<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

<body class="font-opensans" style="background-color:#fff;">
<script type="text/javascript" src="/js/intra/cam_project/commonProject.js?v=${today}"/></script>
<input type="hidden" id="pjtSn" value="${params.pjtSn}" />
<input type="hidden" id="empSeq" value="${loginVO.uniqId}" />
<input type="hidden" id="devSchSn" value="${params.devSchSn}" />
<input type="hidden" id="mapDevSchCd" value="${map.DEV_SCH_CD}" />
<div style="padding:0;">
    <div class="table-responsive">
        <input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM"><span style="position: relative; top: 3px;" id="pjtTitle">개발일지</span>
            </h3>
            <button type="button" id="saveBtn" style="float: right; top:5px" class="k-button k-button-solid-base" onclick="save()">저장</button>
        </div>
        <table class="popTable table table-bordered mb-0">
            <colgroup>
                <col width="15%">
                <col width="35%">
                <col width="15%">
                <col width="35%">
            </colgroup>
            <thead>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>제목
                </th>
                <td colspan="3">
                    <input type="text" id="devSchTitle" style="width: 90%; text-align: left" />
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>날짜
                </th>
                <td colspan="3">
                    <input type="text" id="schEndDe" style="width: 25%; text-align: left">
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>개발일정
                </th>
                <td colspan="3">
                    <input type="text" id="devSchCd" style="width: 40%; text-align: left">
                    <input type="checkbox" id="devSchChk" style="margin-left: 10px; position: relative; top:3px">
                    <label for="devSchChk" style="position: relative; top:1px">완료</label>
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>내용
                </th>
                <td colspan="3">
                    <textarea type="text" id="devSchCont" style="width: 100%; text-align: left"></textarea>
                </td>
            </tr>
            </thead>
        </table>

        <form style="padding: 0px 30px;">
            <div class="card-header" style="padding: 5px;">
                <h3 class="card-title">첨부파일</h3>
                <div class="card-options">
                    <div class="filebox">
                        <button type="button" class="fileUpload k-grid-button k-button k-button-md k-button-solid k-button-solid-base" id="fileUpload" onclick="$('#fileList').click()">
                            <span class="k-icon k-i-track-changes-enable k-button-icon"></span>
                            <span class="k-button-text">파일첨부</span>
                        </button>
                        <input type="file" id="fileList" name="fileList" onchange="fCommon.addFileInfoTable();" multiple style="display: none"/>
                    </div>
                </div>
            </div>
            <div class="table-responsive">
                <table class="popTable table table-bordered mb-0">
                    <colgroup>
                        <col width="50%">
                        <col width="10%">
                        <col width="30%">
                        <col width="10%">
                    </colgroup>
                    <thead>
                    <tr class="text-center th-color">
                        <th>파일명</th>
                        <th>확장자</th>
                        <th>용량</th>
                        <th>기타</th>
                    </tr>
                    </thead>
                    <tbody id="fileGrid">
                    <tr class="defultTr">
                        <td colspan="4" style="text-align: center">선택된 파일이 없습니다.</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </form>
    </div>
</div>
<script type="text/javascript">

    $(function (){
        customKendo.fn_textBox(["devSchTitle"]);
        customKendo.fn_datePicker("schEndDe", "month", "yyyy-MM-dd", new Date());

        $("#devSchCont").kendoTextArea({
            rows: 5
        })

        var data = {
            pjtSn : $("#pjtSn").val()
        }
        var schDs = customKendo.fn_customAjax("/projectRnd/getRndDevScheduleList", data);
        customKendo.fn_dropDownList("devSchCd", schDs.list, "DEV_SCH_NM", "DEV_SCH_CD");

        $("#devSchCd").data("kendoDropDownList").value($("#mapDevSchCd").val());
        $("#devSchCd").data("kendoDropDownList").enable(false);
        if($("#devSchSn") != ""){
            data.devSchSn = $("#devSchSn").val();
            data.devSchJob = "devSchJob";

            var ds = customKendo.fn_customAjax("/projectRnd/getDevSchInfo", data);
            var rs = ds.rs[0];

            if(rs != null){
                $("#devSchTitle").val(rs.DEV_SCH_TITLE);

                $("#devSchCont").val(rs.DEV_SCH_CONT);
                $("#schEndDe").val(rs.SCH_END_DE);

                $("#devSchCd").data("kendoDropDownList").value(rs.DEV_SCH_CD);

                var fileData = ds.rs;
                if(fileData.length != 0){
                    var html = '';

                    for(var i = 0; i < fileData.length; i++){
                        html += '<tr style="text-align: center">';
                        html += '   <td><span style="cursor: pointer" onclick="fileDown(\''+fileData[i].file_path+fileData[i].file_uuid+'\', \''+fileData[i].file_org_name+'.'+fileData[i].file_ext+'\')">'+fileData[i].file_org_name+'</span></td>';
                        html += '   <td>'+ fileData[i].file_ext +'</td>';
                        html += '   <td>'+ fileData[i].file_size +'</td>';
                        html += '   <td>' +
                            '           <button type="button" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="fCommon.commonFileDel('+ fileData[i].file_no +', this)">' +
                            '			    <span class="k-button-text">삭제</span>' +
                            '		    </button>';
                        html += '   </td>';
                        html += '</tr>';
                    }
                    $("#fileGrid").html(html);
                }
            }
        }

    });

    function save(){
        if(!confirm("저장하시겠습니까?")){
            return;
        }


        var data = {
            pjtSn : $("#pjtSn").val(),
            devSchTitle : $("#devSchTitle").val(),
            devSchCont : $("#devSchCont").val(),
            schEndDe : $("#schEndDe").val(),
            devSchCd : $("#devSchCd").val(),
            devSchNm : $("#devSchCd").data("kendoDropDownList").text(),
            empSeq : $("#empSeq").val()
        }
        var fd = new FormData();

        if($("#devSchChk").is(":checked")){
            data.schStat = "Y";
            fd.append("schStat", data.schStat);
        }

        if($("#devSchSn").val() != ""){
            data.devSchSn = $("#devSchSn").val();
            fd.append("devSchSn", data.devSchSn);
        }

        fd.append("pjtSn", data.pjtSn);
        fd.append("devSchTitle", data.devSchTitle);
        fd.append("devSchCont", data.devSchCont);
        fd.append("schEndDe", data.schEndDe);
        fd.append("devSchCd", data.devSchCd);
        fd.append("devSchNm", data.devSchNm);
        fd.append("empSeq", data.empSeq);


        if(fCommon.global.attFiles != null){
            for(var i = 0; i < fCommon.global.attFiles.length; i++){
                fd.append("fileList", fCommon.global.attFiles[i]);
            }
        }

        $.ajax({
            url : "/projectRnd/setDevJobInfo",
            data : fd,
            processData : false,
            contentType : false,
            type : "POST",
            async : false,
            success : function(rs){
                if(rs.code == 200){
                    alert("저장되었습니다.");

                    opener.parent.rndDS.gridReload();

                    window.close();
                }
            }
        })
    }

</script>
</body>
</html>