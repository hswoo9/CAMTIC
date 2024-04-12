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
                인사평가 등록
            </h3>

            <div id="btnDiv" class="btn-st popButton" style="font-size: 12px;">
                <button type="button" class="k-button k-button-solid-info" id="saveBtn" onclick="fn_save()">등록</button>
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
                    <td>
                        <input type="text" id="bsYear" class="bsYear" style="text-align: right; width: 30%" />
                        <input type="text" id="evalNum" class="evalNum" style="text-align: right; width: 30%" />
                    </td>
                    <th>평가대상</th>
                    <td>
                        <span id="evaluationMemberCnt" name="evaluationMemberCnt">0</span> 명
                        <button type="button" id="setEvaluationMember" class="k-button k-button-solid-info" onclick="fn_userMultiSelectPop()">평가대상 선택</button>
                    </td>
                </tr>
                <tr>
                    <th>상태</th>
                    <td colspan="3">
                        <span id="evalStat" name="evalStat"></span>
                    </td>
                </tr>
            </table>
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
                    <col style="width: 7%">
                </colgroup>
                <tr>
                    <th rowspan="3">회차</th>
                    <th rowspan="3">평가기간</th>
                    <th colspan="9">평가 차수별 가중치</th>
                    <th rowspan="3">설정</th>
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
                    <td>
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
                    <td style="text-align: center" >
                        <button type="button" class="k-button k-button-solid-base" onclick="">설정</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>

        <div class="panel-body" style="padding-top: unset">
            <div class="card-header">
                <h4 style="position: relative; top:7px">
                    업적평가
                </h4>
            </div>
            <table class="searchTable table table-bordered mb-0">
                <colgroup>
                    <col style="width: 15%">
                    <col style="width: 35%">
                    <col style="width: 15%">
                    <col style="width: 35%">
                </colgroup>
                <tr>
                    <th>평가기간</th>
                    <td>
                        <span id="achConf"></span> <br>
                        <input type="text" id="achStrDt" style="width: 30%" /> ~ <input type="text" id="achEndDt" style="width: 30%" />
                    </td>
                    <th>차수별 가중치</th>
                    <td>
                        <table class="searchTable table table-bordered mb-0">
                            <colgroup>
                                <col style="width: 33%">
                                <col style="width: 33%">
                                <col style="width: 34%">
                            </colgroup>
                            <tr>
                                <th>구분</th>
                                <th>팀(장)</th>
                                <th>부서장</th>
                            </tr>
                            <tr>
                                <td>1차 평가자</td>
                                <td><input type="text" id="achTeamMngA" style="text-align: right;" onkeyup="fn_achKeyUp()" /></td>
                                <td><input type="text" id="achDeptMngA" style="text-align: right;" onkeyup="fn_achKeyUp()" /></td>
                            </tr>
                            <tr>
                                <td>2차 평가자</td>
                                <td><input type="text" id="achTeamMngB" style="text-align: right;" onkeyup="fn_achKeyUp()" /></td>
                                <td><input type="text" id="achDeptMngB" style="text-align: right;" onkeyup="fn_achKeyUp()" /></td>
                            </tr>
                            <tr>
                                <th>계</th>
                                <td><input type="text" id="achTotTeamMng" style="text-align: right;" disabled /></td>
                                <td><input type="text" id="achTotDeptMng" style="text-align: right;" disabled /></td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
            <h5>※ 자기신고 기간 : 평가시작일 이전 일주일로 자동 설정</h5>
        </div>

        <div class="panel-body" style="padding-top: unset">
            <div class="card-header">
                <h4 style="position: relative; top:7px">
                    평가항목 및 가중치
                </h4>
            </div>
            <table class="searchTable table table-bordered mb-0">
                <colgroup>
                    <col style="width: 10%">
                    <col style="width: 10%">
                    <col style="width: 25%">
                    <col style="width: 20%">
                    <col style="width: 40%">
                </colgroup>
                <tr>
                    <th>구분</th>
                    <th>평가 대상</th>
                    <th>평가 분야</th>
                    <th>가중치(%)</th>
                    <th>성과 지표</th>
                </tr>
                <tr>
                    <td rowspan="8">사업인원</td>
                    <td>팀원</td>
                    <td colspan="3">
                        <div id="btnDiv3" class="btn-st popButton" style="font-size: 12px; float: right">
                            <button type="button" class="k-button k-button-solid-info" id="btAddBt" onclick="fn_btAddRow()">추가</button>
                            <button type="button" class="k-button k-button-solid-error" onclick="fn_btDelRow()">삭제</button>
                        </div>
                        <table class="searchTable table table-bordered mb-0">
                            <colgroup>
                                <col width="7%">
                                <col width="20%">
                                <col width="24%">
                                <col width="39%">
                            </colgroup>
                            <thead>
                            <tr>
                                <th>순번</th>
                                <th>평가 분야</th>
                                <th>가중치(%)</th>
                                <th>성과지표</th>
                            </tr>
                            </thead>
                            <tbody id="btList"></tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td>소계</td>
                    <td colspan="3"><input type="text" id="btSum" class ="textBox" ></td>
                </tr>
                <tr>
                    <td rowspan="2">팀장</td>
                    <td>팀 성과</td>
                    <td><input type="text" id="btResult1" class ="textBox" ></td>
                    <td><input type="text" id="btResult2" class ="textBox" ></td>
                </tr>
                <tr>
                    <td>부서 성과</td>
                    <td><input type="text" id="bdResult1" class ="textBox" ></td>
                    <td><input type="text" id="bdResult2" class ="textBox" ></td>
                </tr>
                <tr>
                    <td>소계</td>
                    <td colspan="3"><input type="text" id="bdSum" class ="textBox" ></td>
                </tr>
                <tr>
                    <td rowspan="2">부서장</td>
                    <td>부서 성과</td>
                    <td><input type="text" id="bhResult1" class ="textBox" ></td>
                    <td><input type="text" id="bhResult2" class ="textBox" ></td>
                </tr>
                <tr>
                    <td>법인 성과</td>
                    <td><input type="text" id="bcResult1" class ="textBox" ></td>
                    <td><input type="text" id="bcResult2" class ="textBox" ></td>
                </tr>
                <tr>
                    <td>소계</td>
                    <td colspan="3"><input type="text" id="bhSum" class ="textBox" ></td>
                </tr>

                <tr>
                    <td rowspan="8">지원인원<br>(경영기획실, <br>개발지원팀)</td>
                    <td>팀원</td>
                    <td colspan="3">
                        <div id="btnDiv4" class="btn-st popButton" style="font-size: 12px; float: right">
                            <button type="button" class="k-button k-button-solid-info" id="bsAddBt" onclick="fn_bsAddRow()">추가</button>
                            <button type="button" class="k-button k-button-solid-error" onclick="fn_bsDelRow()">삭제</button>
                        </div>
                        <table class="searchTable table table-bordered mb-0">
                            <colgroup>
                                <col width="7%">
                                <col width="20%">
                                <col width="24%">
                                <col width="39%">
                            </colgroup>
                            <thead>
                            <tr>
                                <th>순번</th>
                                <th>평가 분야</th>
                                <th>가중치(%)</th>
                                <th>성과지표</th>
                            </tr>
                            </thead>
                            <tbody id="bsList"></tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td>소계</td>
                    <td colspan="3"><input type="text" id="bsSum" class ="textBox" ></td>
                </tr>
                <tr>
                    <td rowspan="2">팀장</td>
                    <td>팀 성과</td>
                    <td><input type="text" id="stResult1" class ="textBox" ></td>
                    <td><input type="text" id="stResult2" class ="textBox" ></td>
                </tr>
                <tr>
                    <td>부서 성과</td>
                    <td><input type="text" id="sdResult1" class ="textBox" ></td>
                    <td><input type="text" id="sdResult2" class ="textBox" ></td>
                </tr>
                <tr>
                    <td>소계</td>
                    <td colspan="3"><input type="text" id="sdSum" class ="textBox" ></td>
                </tr>
                <tr>
                    <td rowspan="2">부서장</td>
                    <td>부서 성과</td>
                    <td><input type="text" id="shResult1" class ="textBox" ></td>
                    <td><input type="text" id="shResult2" class ="textBox" ></td>
                </tr>
                <tr>
                    <td>법인 성과</td>
                    <td><input type="text" id="scResult1" class ="textBox" ></td>
                    <td><input type="text" id="scResult2" class ="textBox" ></td>
                </tr>
                <tr>
                    <td>소계</td>
                    <td colspan="3"><input type="text" id="scSum" class ="textBox" ></td>
                </tr>
            </table>
        </div>


        <div class="panel-body" style="padding-top: unset">
            <div class="card-header">
                <h4 style="position: relative; top:7px">
                    평가 등급별 수준 및 점수
                </h4>
                <div id="btnDiv5" class="btn-st popButton" style="font-size: 12px; float: right">
                    <button type="button" class="k-button k-button-solid-info" id="scAddBt" onclick="fn_scAddRow()">추가</button>
                    <button type="button" class="k-button k-button-solid-error" onclick="fn_scDelRow()">삭제</button>
                </div>
            </div>
            <table class="searchTable table table-bordered mb-0">
                <colgroup>
                    <col width="20%">
                    <col width="20%">
                    <col width="20%">
                    <col width="40%">
                </colgroup>
                <thead>
                <tr>
                    <th>등급</th>
                    <th>수준</th>
                    <th>인원 비율</th>
                    <th>점수</th>
                </tr>
                </thead>
                <tbody id="scoreList">
                    <tr style="text-align: center;">
                       <td><input type="text" id="scClass0" class ="textBox" ></td>
                       <td><input type="text" id="scLevel0" class ="textBox" ></td>
                       <td><input type="text" id="scPerson0" class ="textBox" style="width: 80%;"> %</td>
                       <td><input type="text" id="scScore1_0" class ="textBox" style="width: 35%;"> 점 ~ <input type="text" id="scScore2_0" class ="textBox" style="width: 35%;"> 점
                       </td>
                    </tr>
                </tbody>
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



    </div>
</div><!-- col-md-9 -->

<script>
    var empSeqArr = [];
    $(function (){

        CKEDITOR.replace('contents', {
            height: 250
        });

        customKendo.fn_textBox(["evalList", "idx0", "teamMemberA0", "teamMemberB0", "teamMemberC0", "teamManagerA0", "teamManagerB0", "teamManagerC0"
                                , "deptManagerA0", "deptManagerB0", "deptManagerC0"
                                , "achTeamMngA", "achTeamMngB", "achTotTeamMng", "achDeptMngA", "achDeptMngB", "achTotDeptMng"
                                , "btSum", "btResult1", "btResult2", "bdResult1", "bdResult2", "bdSum", "bhResult1", "bhResult2", "bcResult1", "bcResult2", "bhSum"
                                , "bsSum", "stResult1", "stResult2", "sdResult1", "sdResult2", "sdSum", "shResult1", "shResult2", "scResult1", "scResult2", "scSum"
                                , "scClass0", "scLevel0", "scPerson0", "scScore1_0", "scScore2_0"]);

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
            const bsData = result.bsData;
            const btData = result.btData;

            const bsList = result.bsList  //사업
            const btList = result.btList  //지원
            const scList = result.scList

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

            // 평가항목 및 가중치 - 사업인원
            for (var i = 0; i < bsList.length; i++) {
                var bsItem = bsList[i];
                fn_btAddRow(bsItem);
            }
            $("#btSum").val(bsData.TEAM_SUM);
            $("#btResult1").val(bsData.TEAM_LEADER_TEAM);
            $("#btResult2").val(bsData.TEAM_LEADER_TEAM_RESULT);
            $("#bdResult1").val(bsData.TEAM_LEADER_DEPT);
            $("#bdResult2").val(bsData.TEAM_LEADER_DEPT_RESULT);
            $("#bdSum").val(bsData.TEAM_LEADER_SUM);
            $("#bhResult1").val(bsData.DEPT_HD_DEPT);
            $("#bhResult2").val(bsData.DEPT_HD_DEPT_RESULT);
            $("#bcResult1").val(bsData.DEPT_HD_COR);
            $("#bcResult2").val(bsData.DEPT_HD_COR_RESULT);
            $("#bhSum").val(bsData.DEPT_HD_SUM);

            // 지원인원
            for (var i = 0; i < btList.length; i++) {
                var btItem = btList[i];
                fn_bsAddRow(btItem);
            }
            $("#bsSum").val(btData.TEAM_SUM);
            $("#stResult1").val(btData.TEAM_LEADER_TEAM);
            $("#stResult2").val(btData.TEAM_LEADER_TEAM_RESULT);
            $("#sdResult1").val(btData.TEAM_LEADER_DEPT);
            $("#sdResult2").val(btData.TEAM_LEADER_DEPT_RESULT);
            $("#sdSum").val(btData.TEAM_LEADER_SUM);
            $("#shResult1").val(btData.DEPT_HD_DEPT);
            $("#shResult2").val(btData.DEPT_HD_DEPT_RESULT);
            $("#scResult1").val(btData.DEPT_HD_COR);
            $("#scResult2").val(btData.DEPT_HD_COR_RESULT);
            $("#scSum").val(btData.DEPT_HD_SUM);

            for (var i = 0; i < scList.length; i++) {
                var scItem = scList[i];
                fn_scAddRow(scItem);
            }

            // 안내 페이지 설정
            CKEDITOR.instances.contents.setData(evalMap.EVAL_CONTENT);
        }



    });

    function fn_save(){
        var content = CKEDITOR.instances.contents.getData();
        var parameters = {
            evalSn : $("#evalSn").val(),
            bsYear : $("#bsYear").val(),  // 년도
            evalNum : $("#evalNum").val(), // 차수
            evalStat : $("#evalStat").data("kendoRadioGroup").value(),  // 작성중, 평가중, 평가완료
            empSeqArr : empSeqArr,  // 평가대상
            regEmpSeq : $("#empSeq").val(),

            // 평가항목 및 가중치 - 사업인원
            btSum : $("#btSum").val(),  // 팀원 - 소계
            btResult1 : $("#btResult1").val(),  // 팀장 - 팀 성과 - 가중치
            btResult2 : $("#btResult2").val(),  // 성과지표
            bdResult1 : $("#bdResult1").val(),  // 팀장 - 부서성과 - 가중치
            bdResult2 : $("#bdResult2").val(),  // 팀장 - 부서성과 - 성과지표
            bdSum : $("#bdSum").val(),  // 팀장 소계
            bhResult1 : $("#bhResult1").val(),  // 부서장 - 부서성과 - 가중치
            bhResult2 : $("#bhResult2").val(),  // 성과지표
            bcResult1 : $("#bcResult1").val(),  // 부서장 - 법인성과 - 가중치
            bcResult2 : $("#bcResult2").val(),   // 성과지표
            bhSum : $("#bhSum").val(),  // 부서장 소계

            // 지원인원
            bsSum : $("#bsSum").val(),  // 팀원 - 소계
            stResult1 : $("#stResult1").val(),  // 팀장 - 팀 성과 - 가중치
            stResult2 : $("#stResult2").val(),  // 성과지표
            sdResult1 : $("#sdResult1").val(),  // 팀장 - 부서성과 - 가중치
            sdResult2 : $("#sdResult2").val(),  // 팀장 - 부서성과 - 성과지표
            sdSum : $("#sdSum").val(),  // 팀장 소계
            shResult1 : $("#shResult1").val(),  // 부서장 - 부서성과 - 가중치
            shResult2 : $("#shResult2").val(),  // 성과지표
            scResult1 : $("#scResult1").val(),  // 부서장 - 법인성과 - 가중치
            scResult2 : $("#scResult2").val(),  // 성과지표
            scSum : $("#scSum").val(),  // 부서장 소계

            // 안내 페이지 설정
            content : content

        }

        // if(parameters.bsYear == ""){
        //     alert("년도를 입력해주세요.");
        //     return;
        // }
        //
        // if(isNaN(parameters.bsYear)){
        //     alert("년도에 숫자를 입력해주세요.");
        //     $("#bsYear").val("");
        //     return;
        // }
        //
        // if(parameters.empSeqArr.length == 0){
        //     alert("평가대상를 선택해주세요.");
        //     return;
        // }

        var capBodyArr = [];
        var btBodyArr = [];
        var bsBodyArr = [];
        var scoreBodyArr = [];

        var capLen = $("#capBody").find("tr").length;
        var btLen = $("#btList").find("tr").length;
        var bsLen = $("#bsList").find("tr").length;
        var scoreLen = $("#scoreList").find("tr").length;

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

        parameters.capBodyArr = JSON.stringify(capBodyArr);

        // 평가항목 및 가중치 - 사업인원 - 팀원
        for(var i = 0 ; i < btLen ; i++){
            if($("#btNum" + i).val() == "" || $("#btField" + i).val() == "" || $("#btValue" + i).val() == "" || $("#btScore" + i).val() == ""){
                alert("입력되지 않은 항목이 있습니다. 확인해주세요.");
                return;
            }

            btBodyArr.push({
                evalType : "business ",
                btNum : $("#btNum" + i).val(),
                btField : $("#btField" + i).val(),
                btValue : $("#btValue" + i).val(),
                btScore : $("#btScore" + i).val()
            });
        }

        parameters.btBodyArr = JSON.stringify(btBodyArr);

        // 평가항목 및 가중치 - 지원인원 - 팀원
        for(var i = 0 ; i < bsLen ; i++){
            if($("#bsNum" + i).val() == "" || $("#bsField" + i).val() == "" || $("#bsValue" + i).val() == "" || $("#bsScore" + i).val() == ""){
                alert("입력되지 않은 항목이 있습니다. 확인해주세요.");
                return;
            }

            bsBodyArr.push({
                evalType : "support",
                bsNum : $("#bsNum" + i).val(),
                bsField : $("#bsField" + i).val(),
                bsValue : $("#bsValue" + i).val(),
                bsScore : $("#bsScore" + i).val()
            });
        }

        parameters.bsBodyArr = JSON.stringify(bsBodyArr);

        // 평가 등급별 수준 및 점수
        for(var i = 0 ; i < scoreLen ; i++){
            if($("#scClass" + i).val() == "" || $("#scLevel" + i).val() == "" || $("#scPerson" + i).val() == "" || $("#scScore1_" + i).val() == "" || $("#scScore2_" + i).val() == ""){
                alert("입력되지 않은 항목이 있습니다. 확인해주세요.");
                return;
            }

            scoreBodyArr.push({
                scClass : $("#scClass" + i).val(),
                scLevel : $("#scLevel" + i).val(),
                scPerson : $("#scPerson" + i).val(),
                scScore1 : $("#scScore1_" + i).val(),
                scScore2 : $("#scScore2_" + i).val()
            });
        }

        parameters.scoreBodyArr = JSON.stringify(scoreBodyArr);

        $.ajax({
            url : "/evaluation/setEvaluation",
            data : parameters,
            dataType : "json",
            success : function (rs){
                console.log(rs);
            }
        });
    }

    function fn_userMultiSelectPop(){

        if($("#bsYear").val() == ""){
            alert("년도를 입력해주세요.");
            return;
        }

        if(isNaN($("#bsYear").val())){
            alert("년도에 숫자를 입력해주세요.");
            $("#bsYear").val("");
            return;
        }

        if($("#bsNum").val() == ""){
            alert("차수를 선택해주세요.");
            return;
        }

        window.open("/evaluation/pop/requestEvaluationUsers.do?bsYear=" + $("#bsYear").val(),"조직도","width=1365, height=610, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no");
    }

    function fn_userMultiSelectPopCallBack(e){
        var seqArr = [];
        empSeqArr = e;
        e = e.split(",");

        for(var i = 0; i < e.length; i++){
            seqArr.push(e[i]);
        }

        $("#evaluationMemberCnt").text(seqArr.length - 1);
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

    function fn_btAddRow(bsItem){
        var btNum = $("#btList").find("tr").length;
        var html = "";
        if(bsItem != null){
            html += '<tr style="text-align: center;">';
            html += '   <td>';
            html += "       <input type='text' id='btNum" + btNum + "' class='idx' style='width: 60%' disabled value='" + (btNum + 1) + "'>";
            html += '   </td>';
            html += '   <td>';
            html += '       <input type="text" id="btField'+btNum+'" class ="textBox" value="' +  bsItem.EVAL_FIELD + '" >';
            html += '   </td>';
            html += '   <td>';
            html += '       <input type="text" id="btValue'+btNum+'" class ="textBox" value="' +  bsItem.EVAL_W + '"  style="width: 80%"> %';
            html += '   </td>';
            html += '   <td>';
            html += '       <input type="text" id="btScore'+btNum+'" class ="textBox" value="' +  bsItem.EVAL_R + '" >';
            html += '   </td>';
            html += '</tr>';
        }else{
            html += '<tr style="text-align: center;">';
            html += '   <td>';
            html += "       <input type='text' id='btNum" + btNum + "' class='idx' style='width: 60%' disabled value='" + (btNum + 1) + "'>";
            html += '   </td>';
            html += '   <td>';
            html += '       <input type="text" id="btField'+btNum+'" class ="textBox" value="" >';
            html += '   </td>';
            html += '   <td>';
            html += '       <input type="text" id="btValue'+btNum+'" class ="textBox" value=""  style="width: 80%"> %';
            html += '   </td>';
            html += '   <td>';
            html += '       <input type="text" id="btScore'+btNum+'" class ="textBox" value="" >';
            html += '   </td>';
            html += '</tr>';
        }
        $('#btList').append(html);
        customKendo.fn_textBox(["btNum" + btNum, "btField" + btNum, "btValue" + btNum, "btScore" + btNum]);
    }

    function fn_btDelRow(){
        $("#btList").find("tr:last").remove();
    }

    function fn_bsAddRow(btItem){
        var bsNum = $("#bsList").find("tr").length;
        var html = "";
        if(btItem != null){
            html += '<tr style="text-align: center;">';
            html += '   <td>';
            html += "       <input type='text' id='bsNum" + bsNum + "' class='idx' style='width: 60%' disabled value='" + (bsNum + 1) + "'>";
            html += '   </td>';
            html += '   <td>';
            html += '       <input type="text" id="bsField'+bsNum+'" class ="textBox" value="' +  btItem.EVAL_FIELD + '" >';
            html += '   </td>';
            html += '   <td>';
            html += '       <input type="text" id="bsValue'+bsNum+'" class ="textBox" value="' +  btItem.EVAL_W + '"  style="width: 80%"> %';
            html += '   </td>';
            html += '   <td>';
            html += '       <input type="text" id="bsScore'+bsNum+'" class ="textBox" value="' +  btItem.EVAL_R + '" >';
            html += '   </td>';
            html += '</tr>';
        }else {
            html += '<tr style="text-align: center;">';
            html += '   <td>';
            html += "       <input type='text' id='bsNum" + bsNum + "' class='idx' style='width: 60%' disabled value='" + (bsNum + 1) + "'>";
            html += '   </td>';
            html += '   <td>';
            html += '       <input type="text" id="bsField' + bsNum + '" class ="textBox" >';
            html += '   </td>';
            html += '   <td>';
            html += '       <input type="text" id="bsValue' + bsNum + '" class ="textBox" style="width: 80%" > %';
            html += '   </td>';
            html += '   <td>';
            html += '       <input type="text" id="bsScore' + bsNum + '" class ="textBox" >';
            html += '   </td>';
            html += '</tr>';
        }
        $('#bsList').append(html);
        customKendo.fn_textBox(["bsNum" + bsNum, "bsField" + bsNum, "bsValue" + bsNum, "bsScore" + bsNum]);
    }

    function fn_bsDelRow(){
        $("#bsList").find("tr:last").remove();
    }

    function fn_scAddRow(scItem){
        var scNum = $("#scoreList").find("tr").length;
        var html = "";

        if(scItem != null){
            html += '<tr style="text-align: center;">';
            html += '   <td>';
            html += '       <input type="text" id="scClass'+scNum+'" class ="textBox" value="'+ scItem.EVAL_GRADE +'">';
            html += '   </td>';
            html += '   <td>';
            html += '       <input type="text" id="scLevel'+scNum+'" class ="textBox" value="'+ scItem.EVAL_LEVEL +'">';
            html += '   </td>';
            html += '   <td>';
            html += '       <input type="text" id="scPerson'+scNum+'" class ="textBox" value="'+ scItem.EVAL_RATE +'" style="width: 80%"> %';
            html += '   </td>';
            html += '   <td>';
            html += '       <input type="text" id="scScore1_'+scNum+'" class ="textBox" value="'+ scItem.EVAL_SCORE_A +'" style="width: 35%;"> 점 ~ ';
            html += '       <input type="text" id="scScore2_'+scNum+'" class ="textBox" value="'+ scItem.EVAL_SCORE_B +'" style="width: 35%;"> 점';
            html += '   </td>';
            html += '</tr>';
        }else{
            html += '<tr style="text-align: center;">';
            html += '   <td>';
            html += '       <input type="text" id="scClass'+scNum+'" class ="textBox" >';
            html += '   </td>';
            html += '   <td>';
            html += '       <input type="text" id="scLevel'+scNum+'" class ="textBox" >';
            html += '   </td>';
            html += '   <td>';
            html += '       <input type="text" id="scPerson'+scNum+'" class ="textBox" style="width: 80%"> %';
            html += '   </td>';
            html += '   <td>';
            html += '       <input type="text" id="scScore1_'+scNum+'" class ="textBox" style="width: 35%;"> 점 ~ ';
            html += '       <input type="text" id="scScore2_'+scNum+'" class ="textBox" style="width: 35%;"> 점';
            html += '   </td>';
            html += '</tr>';
        }
        $('#scoreList').append(html);
        customKendo.fn_textBox(["scClass" + scNum, "scLevel" + scNum, "scPerson" + scNum, "scScore1_" + scNum, "scScore2_" + scNum]);
    }

    function fn_scDelRow(){
        if($("#scoreList").find("tr").length > 1){
            $("#scoreList").find("tr:last").remove();
        }
    }
</script>
</body>
