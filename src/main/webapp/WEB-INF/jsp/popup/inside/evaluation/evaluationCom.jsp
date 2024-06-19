<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<script type="text/javascript" src="<c:url value='/js/ckEditor/ckeditor.js'/>"></script>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">

<style>
    .searchTable > thead > tr > th, .searchTable > tfoot > tr > th {
        background-color: #00397f96;
        color: white;
        text-align: center;
    }

    .txt_area_01 {display: inline-block; width: 100%; height: 170px; border: 1px solid #c9c9c9; }
</style>

<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="evalSn" value="${params.pk}"/>
<body class="font-opensans" style="background-color:#fff;">
<div class="pop_sign_wrap">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">
                역량평가 설정
            </h3>

            <div id="btnDiv" class="btn-st popButton" style="font-size: 12px;">
                <button type="button" class="k-button k-button-solid-info" id="saveBtn" style="display: none;" onclick="fn_save()">등록</button>
                <button type="button" class="k-button k-button-solid-info" id="updBtn" style="display: none;" onclick="fn_save()">수정</button>
                <button type="button" class="k-button k-button-solid-error" onclick="window.close()">닫기</button>
            </div>
        </div>

        <div class="panel-body">
            <table class="searchTable table table-bordered mb-0">
                <colgroup>
                    <col style="width: 10%">
                    <col style="width: 40%">
                    <col style="width: 10%">
                    <col style="width: 40%">
                </colgroup>
                <tr>
                    <th>년도</th>
                    <td id="yearTd">
                        <input id="bsYear" class="bsYear" style="width: 20%" />
                        <input id="evalNum" class="evalNum" style="width: 20%" />
                    </td>
                    <th>상태</th>
                    <td id="statTd" colspan="3">
                        <span id="evalStat" name="evalStat"></span>
                    </td>
                </tr>
            </table>
        </div>
        <div class="panel-body" style="padding-top: unset">
            <div class="card-header">
                <h4 style="position: relative; top:7px">
                    안내 페이지 설정
                </h4>
            </div>
            <div>
                <textarea class="txt_area_01" id="contents"></textarea>
            </div>
        </div>
        <div class="panel-body" style="padding-top: unset">
            <div class="card-header">
                <h4 style="position: relative; top:7px">
                    역량평가
                </h4>
                <%--<div id="btnDiv2" class="btn-st popButton" style="font-size: 12px; float: right">
                    <button type="button" class="k-button k-button-solid-info" id="capAddBt" onclick="fn_capAddRow()">추가</button>
                    <button type="button" class="k-button k-button-solid-error" onclick="fn_capDelRow()">삭제</button>
                </div>--%>
            </div>
            <table class="searchTable table table-bordered mb-0">
                <colgroup>
                    <col style="width: 5%">
                    <col style="width: 25%">
                    <col style="width: 7%">
                    <col style="width: 7%">
                    <col style="width: 7%">
                    <col style="width: 7%">
                    <col style="width: 7%">
                    <col style="width: 7%">
                    <col style="width: 7%">
                    <col style="width: 7%">
                    <col style="width: 7%">
                    <%--<col style="width: 7%">--%>
                </colgroup>
                <tr>
                    <th rowspan="3">회차</th>
                    <th rowspan="3">평가기간</th>
                    <th colspan="9">평가 차수별 가중치</th>
                    <%--<th rowspan="3">설정</th>--%>
                </tr>
                <tr>
                    <th colspan="3">팀원</th>
                    <th colspan="3">팀장</th>
                    <th colspan="3">부서장</th>
                </tr>
                <tr>
                    <th>1차</th>
                    <th>2차</th>
                    <th>3차</th>
                    <th>1차</th>
                    <th>2차</th>
                    <th>3차</th>
                    <th>1차</th>
                    <th>2차</th>
                    <th>3차</th>
                </tr>
                <tbody id="capBody">
                <tr>
                    <td>
                        <input type="text" id="idx0" class="idx" name="idx" value="" style="width: 60%" disabled /> 차
                    </td>
                    <td style="line-height: 35px">
                        평가 <input type="text" id="evalStrDt0" class="evalStrDt" name="evalStrDt" style="width: 40%" /> ~ <input type="text" id="evalEndDt0" class="evalEndDt" name="evalEndDt" style="width: 40%" /> <br>
                        실시 <input type="text" id="condStrDt0" class="condStrDt" name="condStrDt" style="width: 40%" /> ~ <input type="text" id="condEndDt0" class="condEndDt" name="condEndDt" style="width: 40%" />
                    </td>
                    <td>
                        <input type="text" id="teamMemberA0" class="teamMemberA" name="teamMemberA" style="width: 80%; text-align: right" />
                    </td>
                    <td>
                        <input type="text" id="teamMemberB0" class="teamMemberB" name="teamMemberB" style="width: 80%; text-align: right" />
                    </td>
                    <td>
                        <input type="text" id="teamMemberC0" class="teamMemberC" name="teamMemberC" style="width: 100%; text-align: right" />
                    </td>
                    <td>
                        <input type="text" id="teamManagerA0" class="teamManagerA" name="teamManagerA" style="width: 100%; text-align: right" />
                    </td>
                    <td>
                        <input type="text" id="teamManagerB0" class="teamManagerB" name="teamManagerB" style="width: 100%; text-align: right" />
                    </td>
                    <td>
                        <input type="text" id="teamManagerC0" class="teamManagerC" name="teamManagerC" style="width: 100%; text-align: right" />
                    </td>
                    <td>
                        <input type="text" id="deptManagerA0" class="deptManagerA" name="deptManagerA" style="width: 100%; text-align: right" />
                    </td>
                    <td>
                        <input type="text" id="deptManagerB0" class="deptManagerB" name="deptManagerB" style="width: 100%; text-align: right" />
                    </td>
                    <td>
                        <input type="text" id="deptManagerC0" class="deptManagerC" name="deptManagerC" style="width: 100%; text-align: right" />
                    </td>
                    <%--<td style="text-align: center" >
                        <button type="button" class="k-button k-button-solid-base" onclick="">설정</button>
                    </td>--%>
                </tr>
                </tbody>
            </table>

            <div id="evalMng" style="display: none;">
                <button class="k-button k-button-solid-info" style="margin: 20px 0 5px 0; float: right;" onclick="evalItemCopy()">평가표 복사</button>
                <table class="searchTable table table-bordered mb-0">
                    <colgroup>
                        <col style="width: 10%">
                        <col style="width: 30%">
                        <col style="width: 30%">
                        <col style="width: 30%">
                    </colgroup>
                    <tr>
                        <th>직원구분</th>
                        <th>연구개발(R&D)직군</th>
                        <th>기업지원(A&C)직군</th>
                        <th>경영관리(P&M)직군</th>
                    </tr>
                    <tr>
                        <th>부서장용</th>
                        <td colspan="3">
                            <button class="k-button k-button-solid-base" onclick="fn_open_mng('deptHeader', '')">부서장 역량평가 설정</button>
                        </td>
                    </tr>
                    <tr>
                        <th>팀장용</th>
                        <td>
                            <button class="k-button k-button-solid-base" onclick="fn_open_mng('teamLeader' , 'RD')">팀장 R&D 역량평가 설정</button>
                        </td>
                        <td>
                            <button class="k-button k-button-solid-base" onclick="fn_open_mng('teamLeader' , 'AC')">팀장 A&C 역량평가 설정</button>
                        </td>
                        <td>
                            <button class="k-button k-button-solid-base" onclick="fn_open_mng('teamLeader' , 'PM')">팀장 P&M 역량평가 설정</button>
                        </td>
                    <tr>
                        <th>팀원용</th>
                        <td>
                            <button class="k-button k-button-solid-base" onclick="fn_open_mng('team' , 'RD')">팀원 R&D 역량평가 설정</button>
                        </td>
                        <td>
                            <button class="k-button k-button-solid-base" onclick="fn_open_mng('team' , 'AC')">팀원 A&C 역량평가 설정</button>
                        </td>
                        <td>
                            <button class="k-button k-button-solid-base" onclick="fn_open_mng('team', 'PM')">팀원 P&M 역량평가 설정</button>
                        </td>
                    </tr>
                </table>
            </div>

            <div class="panel-body" style="padding: 0;">
                <div class="card-header">
                    <h4 style="position: relative; top:7px">
                        평가등급별 인원비율 표 (팀원평가)
                    </h4>
                </div>
                <div>
                    <textarea class="txt_area_01" id="contents2"></textarea>
                </div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script>
    var empSeqArr = [];
    var chkEmpSeqArr = [];
    $(function (){

        if($("#evalSn").val() != "" && $("#evalSn").val() != null){
            $('#evalMng').css("display", "");
            $('#updBtn').css("display", "");
        }else{
            $('#saveBtn').css("display", "");
        }

        CKEDITOR.replace('contents', {
            height: 250
        });
        CKEDITOR.replace('contents2', {
            height: 250
        });

        customKendo.fn_textBox(["idx0", "teamMemberA0", "teamMemberB0", "teamMemberC0", "teamManagerA0", "teamManagerB0", "teamManagerC0", "deptManagerA0", "deptManagerB0", "deptManagerC0"]);

        customKendo.fn_datePicker("condStrDt0", '', "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("condEndDt0", '', "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("evalStrDt0", '', "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("evalEndDt0", '', "yyyy-MM-dd", new Date());

        customKendo.fn_datePicker("achStrDt", '', "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("achEndDt", '', "yyyy-MM-dd", new Date());

        customKendo.fn_datePicker("bsYear", 'decade', "yyyy", new Date());

        $("#evalNum").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "차수 선택", value: "" },
                { text: "1차", value: "1" },
                { text: "2차", value: "2" },
                { text: "3차", value: "3" },
                { text: "4차", value: "4" },
                { text: "5차", value: "5" }
            ],
            index: 0,
            change: function(e) {
                $("#idx0").val($("#evalNum").val())
            }
        });

        $("#achConf").kendoRadioGroup({
            items: [
                { label : "전체지정", value : "A" },
                { label : "차수지정", value : "E" },
            ],
            layout : "horizontal",
            labelPosition : "after",
            value : "A"
        });

        $("#evalStat").kendoRadioGroup({
            items: [
                { label : "작성중", value : "W" },
                { label : "평가중", value : "I" },
                { label : "평가완료", value : "C" }
            ],
            layout : "horizontal",
            labelPosition : "after",
            value : "W"
        });

        if( $("#evalSn").val() != "") {
            const data = {
                evalSn: $("#evalSn").val()
            };
            const result = customKendo.fn_customAjax("/evaluation/getEvaluation", data);
            const evalMap = result.data;

            $("#bsYear").data("kendoDatePicker").value(evalMap.BS_YEAR);
            $("#evalNum").data("kendoDropDownList").value(evalMap.EVAL_NUM);
            $("#evalStat").data("kendoRadioGroup").value(evalMap.EVAL_STAT);  // 작성중; 평가중; 평가완료
            // 평가대상

            $("#idx0").val(evalMap.CAP_IDX);
            $("#evalStrDt0").data("kendoDatePicker").value(evalMap.COND_STR_DT);
            $("#evalEndDt0").data("kendoDatePicker").value(evalMap.COND_END_DT);
            $("#condStrDt0").data("kendoDatePicker").value(evalMap.EVAL_STR_DT);
            $("#condEndDt0").data("kendoDatePicker").value(evalMap.EVAL_END_DT);
            $("#teamMemberA0").val(evalMap.TEAM_MEMBER_A);
            $("#teamMemberB0").val(evalMap.TEAM_MEMBER_B);
            $("#teamMemberC0").val(evalMap.TEAM_MEMBER_C);
            $("#teamManagerA0").val(evalMap.TEAM_MANAGER_A);
            $("#teamManagerB0").val(evalMap.TEAM_MANAGER_B);
            $("#teamManagerC0").val(evalMap.TEAM_MANAGER_C);
            $("#deptManagerA0").val(evalMap.DEPT_MANAGER_A);
            $("#deptManagerB0").val(evalMap.DEPT_MANAGER_B);
            $("#deptManagerC0").val(evalMap.DEPT_MANAGER_C);

            CKEDITOR.instances.contents.setData(evalMap.EVAL_CONTENT); // 안내 페이지 설정
            CKEDITOR.instances.contents2.setData(evalMap.EVAL_PER_CONTENT);
        }

        $("#bsYear").data("kendoDatePicker").enable(false);
        $("#evalNum").data("kendoDropDownList").enable(false);
        $("#evalStat").data("kendoRadioGroup").enable(false);
    });

    function fn_save(){
        var formData = new FormData();
        var content = CKEDITOR.instances.contents.getData();
        var perContent = CKEDITOR.instances.contents2.getData();

        formData.append("evalSn" , $("#evalSn").val());
        formData.append("regEmpSeq", $("#empSeq").val());
        formData.append("perContent" , perContent);

        // 안내 페이지 설정
        formData.append("content" , content);

        var capBodyArr = [];
        var capLen = $("#capBody").find("tr").length;

        // 역량평가
        for(var i = 0 ; i < capLen ; i++){
            if($("#teamMemberA" + i).val() == "" || $("#teamMemberB" + i).val() == ""
                || $("#teamManagerA" + i).val() == "" || $("#teamManagerB" + i).val() == ""
                || $("#deptManagerA" + i).val() == "" || $("#deptManagerB" + i).val() == "" ){
                alert("입력되지 않은 항목이 있습니다. 확인해주세요.");
                return;
            }

            capBodyArr.push({
                idx : $("#idx" + i).val(),
                condStrDt : $("#condStrDt" + i).val(),
                condEndDt : $("#condEndDt" + i).val(),
                evalStrDt : $("#evalStrDt" + i).val(),
                evalEndDt : $("#evalEndDt" + i).val(),
                teamMemberA : $("#teamMemberA" + i).val(),
                teamMemberB : $("#teamMemberB" + i).val(),
                teamMemberC : $("#teamMemberC" + i).val(),
                teamManagerA : $("#teamManagerA" + i).val(),
                teamManagerB : $("#teamManagerB" + i).val(),
                teamManagerC : $("#teamManagerC" + i).val(),
                deptManagerA : $("#deptManagerA" + i).val(),
                deptManagerB : $("#deptManagerB" + i).val(),
                deptManagerC : $("#deptManagerC" + i).val()
            });
        }

        formData.append("capBodyArr", JSON.stringify(capBodyArr));

        $.ajax({
            url : "/evaluation/setUpdComEvaluation",
            data : formData,
            type : "post",
            dataType : "json",
            contentType: false,
            processData: false,
            enctype : 'multipart/form-data',
            async : false,
            dataType : "json",
            success : function (rs){
                if($("#evalSn").val() != "" && $("#evalSn").val() != null){
                    alert("수정이 완료 되었습니다.");
                    try{
                        opener.getEvaluationList();
                    }catch{

                    }
                    location.href = "/evaluation/pop/evaluationCom.do?pk=" + $("#evalSn").val();
                }else{
                    alert("등록이 완료 되었습니다.");;
                    try{
                        opener.getEvaluationList();
                    }catch{

                    }
                    location.href = "/evaluation/pop/evaluationCom.do?pk=" + rs.params.evalSn;
                }
            }
        });
    }

    function fn_capAddRow() {

        var capLen = $("#capBody").find("tr").length;

        var html = "";

        html += "<tr>";
        html += "<td><input type='text' id='idx" + capLen + "' class='idx' style='width: 60%' disabled value='" + (capLen + 1) + "'> 차</td>";
        html += "<td>";
        html += '평가 <input type="text" id="evalStrDt' + capLen + '" class="evalStrDt" name="evalStrDt" style="width: 40%" /> ~ <input type="text" id="evalEndDt' + capLen + '" class="evalEndDt" name="evalEndDt" style="width: 40%" /> <br>';
        html += '실시 <input type="text" id="condStrDt' + capLen + '" class="condStrDt" name="condStrDt" style="width: 40%" /> ~ <input type="text" id="condEndDt' + capLen + '" class="condEndDt" name="condEndDt" style="width: 40%" />';
        html += "</td>";
        html += "<td><input type='text' style='text-align: right;' id='teamMemberA" + capLen + "' class='teamMemberA'></td>";
        html += "<td><input type='text' style='text-align: right;' id='teamMemberB" + capLen + "' class='teamMemberB'></td>";
        html += "<td><input type='text' style='text-align: right;' id='teamMemberC" + capLen + "' class='teamMemberC'></td>";
        html += "<td><input type='text' style='text-align: right;' id='teamManagerA" + capLen + "' class='teamManagerA'></td>";
        html += "<td><input type='text' style='text-align: right;' id='teamManagerB" + capLen + "' class='teamManagerB'></td>";
        html += "<td><input type='text' style='text-align: right;' id='teamManagerC" + capLen + "' class='teamManagerC'></td>";
        html += "<td><input type='text' style='text-align: right;' id='deptManagerA" + capLen + "' class='deptManagerA'></td>";
        html += "<td><input type='text' style='text-align: right;' id='deptManagerB" + capLen + "' class='deptManagerB'></td>";
        html += "<td><input type='text' style='text-align: right;' id='deptManagerC" + capLen + "' class='deptManagerC'></td>";
        html += '<td style="text-align: center;"><button type="button" class="k-button k-button-solid-base" onClick="">설정</button></td>';
        html += "</tr>";

        $("#capBody").append(html);

        customKendo.fn_textBox(["idx" + capLen, "teamMemberA" + capLen, "teamMemberB" + capLen, "teamMemberC" + capLen, "teamManagerA" + capLen, "teamManagerB" + capLen,
            "teamManagerC" + capLen, "deptManagerA" + capLen, "deptManagerB" + capLen, "deptManagerC" + capLen]);

        customKendo.fn_datePicker("condStrDt" + capLen, '', "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("condEndDt" + capLen, '', "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("evalStrDt" + capLen, '', "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("evalEndDt" + capLen, '', "yyyy-MM-dd", new Date());
    }

    function fn_capDelRow(){

        if($("#capBody").find("tr").length > 1){
            $("#capBody").find("tr:last").remove();
        }
    }

    function fn_open_mng(pType,type){
        var url = "/evaluation/pop/evalMngList.do?type="+type+"&pType="+pType+"&pk="+$("#evalSn").val();
        var name = "_blank";
        var option = "width = 1500, height = 820, top = 200, left = 600, location = no";
        var popup = window.open(url, name, option);
    }

    function evalItemCopy(){
        if(!confirm("평가표 복사 시 이전 평가표는 삭제됩니다. 복사하시겠습니까?")){
            return;
        }

        var formData = new FormData();
        formData.append("evalSn" , $("#evalSn").val());
        formData.append("empSeq" , $("#empSeq").val());

        $.ajax({
            url : "/evaluation/setEvaluationItemCopy",
            data : formData,
            type : "post",
            dataType : "json",
            contentType: false,
            processData: false,
            enctype : 'multipart/form-data',
            async : false,
            success : function (rs){
                console.log(rs);
                alert("평가표 등록이 완료 되었습니다.");
            }
        });
    }
</script>
</body>