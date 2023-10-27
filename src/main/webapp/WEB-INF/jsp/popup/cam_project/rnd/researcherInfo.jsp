<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<jsp:useBean id="today" class="java.util.Date" />

<script type="text/javascript" src="<c:url value='/js/intra/cam_project/commonProject.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/rnd/rndResearcherInfo.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/rnd/rndReqPartRate.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js?${today}'/>"></script>

<input type="hidden" id="step" value="R0" />
<input type="hidden" id="pjtSn" value="${params.pjtSn}" />
<input type="hidden" id="engnSn" value="${params.engnSn}" />
<input type="hidden" id="partRateSn" value=""/>

<div style="padding: 10px">
<%--    <button type="button" id="saveBtn" style="float: right; margin-bottom: 5px;" class="k-button k-button-solid-info" onclick="bustInfo.fn_save()">저장</button>--%>
    <br><br>
    <span style=""> ◎ 참여인력</span>
    <div id="rschMainGrid" style="margin-top:5px;"></div>

    <br><br>
    <span style=""> ◎ 참여율요청</span>
    <div class="table-responsive" style="">
        <button type="button" id="reqBtn" style="float: right; margin-bottom: 5px; display: none" class="k-button k-button-solid-base" onclick="rndRPR.fn_reqPartRate()">요청</button>
        <button type="button" id="changeBtn" style="float: right; margin-bottom: 5px; display: none" class="k-button k-button-solid-base" onclick="rndRPR.fn_changePartRate()">변경요청</button>
        <button type="button" id="saveBtn" style="float: right; margin-bottom: 5px; margin-right:5px;" class="k-button k-button-solid-info" onclick="rndRPR.fn_save()">저장</button>
        <br><br>
        <div class="table-responsive">
            <table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col width="7%">
                    <col width="7%">
                    <col width="10%">
                    <col width="15%">
                    <col width="12%">
                    <col width="12%">
                    <col width="12%">
                    <col width="15%">
                    <col width="10%">
                </colgroup>
                <thead>
                <tr>
                    <th>구분</th>
                    <th>버전</th>
                    <th>요청자</th>
                    <th>인건비 예산</th>
                    <th>요청일</th>
                    <th>참여율 작성일</th>
                    <th>확정일</th>
                    <th>담당자 코멘트</th>
                    <th>상태</th>
                </tr>
                </thead>
                <tbody id="partRateVersion">
                <tr>
                    <td colspan="9" style="text-align: center">
                        <span class="red-star"></span>작성된 참여율이 없습니다.
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="table-responsive">
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
                        <span class="red-star"></span>참여 연구원
                    </th>
                    <td colspan="3">
                        <input type="text" id="joinMember" disabled style="width: 80%;">
                        <input type="hidden" id="joinMemberSn" />
                        <button type="button" id="stfs" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="fn_userMultiSelectPop();">
                            검색
                        </button>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>월급여액 산출기준
                    </th>
                    <td colspan="3">
                        <textarea type="text" id="monAccCal" style="width: 100%"></textarea>
                        <div>
                            예시) 월급여액 = (연봉총액 + 사대보험 사업자 부담분 + 퇴직금) / 12개월
                        </div>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>최소 참여율
                    </th>
                    <td>
                        <input type="text" id="minPartRate" minlength="2" style="width: 80%; text-align: right" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"> %
                    </td>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>최대 참여율
                    </th>
                    <td>
                        <input type="text" id="maxPartRate" maxlength="2" style="width: 80%; text-align: right" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"> %
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>기타 요청 내용
                    </th>
                    <td colspan="3">
                        <textarea type="text" id="partEtc" style="width: 100%"></textarea>
                        <div>
                            Tip. 참여율 설정시 참고사항을 적어주세요. <br>
                            예시) 인건비 예산 계상 한도 = 총사업비 × 30% 이내, 책임자 참여율은 90% 이상
                        </div>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>인건비 예산(현금)
                    </th>
                    <td>
                        <input type="text" id="payBudget" style="width: 80%; text-align: right" value="0" onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"> 원
                    </td>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>인건비 예산(현물)
                    </th>
                    <td>
                        <input type="text" id="itemBudget" style="width: 80%; text-align: right" value="0" onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"> 원
                    </td>
                </tr>
                </thead>
            </table>
        </div>

        <div class="table-responsive">
            <div id="commFileHtml" style="margin-top:10px;">
                <form>
                    <div class="card-header" style="padding: 5px;">
                        <h3 class="card-title">설계관리</h3>
                        <div class="card-options">
                            <div class="filebox">
                                <button type="button" class="fileUpload k-grid-button k-button k-button-md k-button-solid k-button-solid-base" id="fileUpload" onclick="$('#fileList').click()">
                                    <span class="k-icon k-i-track-changes-enable k-button-icon"></span>
                                    <span class="k-button-text">파일첨부</span>
                                </button>
                                <input type="file" id="fileList" name="fileList" onchange="addFileInfoTable();" multiple style="display: none"/>
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
    </div>
</div>

<script>
    rndRschInfo.fn_defaultScript();

    rndRPR.fn_defaultScript();


    function fn_userMultiSelectPop(i) {
        idx = i;
        window.open("/user/pop/userMultiSelectPop.do","조직도","width=1365, height=610, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no");
    }

    function userDataSet(arr){
        var empSeq = "";
        var empNm = "";
        for(var i = 0 ; i < arr.length ; i++){
            empSeq += arr[i].empSeq + ",";
            empNm += arr[i].empName + ",";
        }
        $("#joinMember").val(empNm.slice(0, -1));
        $("#joinMemberSn").val(empSeq.slice(0, -1));
    }

    function addFileInfoTable(){

        fCommon.global.attFiles = new Array();
        for(var i = 0; i < $("input[name='fileList']")[0].files.length; i++){
            fCommon.global.attFiles.push($("input[name='fileList']")[0].files[i]);
        }

        if(fCommon.global.attFiles.length > 0){
            $("#fileGrid").find(".defultTr").remove();
            $("#fileGrid").find(".addFile").remove();

            var html = '';
            for (var i = 0; i < fCommon.global.attFiles.length; i++) {
                html += '<tr style="text-align: center" class="addFile">';
                html += '   <td>' + fCommon.global.attFiles[i].name.split(".")[0] + '</td>';
                html += '   <td>' + fCommon.global.attFiles[i].name.split(".")[1] + '</td>';
                html += '   <td>' + fCommon.global.attFiles[i].size + '</td>';
                html += '   <td>';
                html += '       <input type="button" value="삭제" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="fCommon.fnUploadFile(' + i + ')">'
                html += '   </td>';
                html += '</tr>';
            }

            $("#fileGrid").append(html);
        }



    }
</script>