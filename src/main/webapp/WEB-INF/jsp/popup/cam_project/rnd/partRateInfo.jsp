<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<jsp:useBean id="today" class="java.util.Date" />

<script type="text/javascript" src="<c:url value='/js/intra/cam_project/commonProject.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/rnd/rndPartRate.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js?${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/rnd/rndReqPartRate.js?v=${today}'/>"></script>


<input type="hidden" id="pjtSn" value="${params.pjtSn}" />
<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="partRateSn" name="partRateSn" value="" />
<form id="rateDraftFrm" method="post">
    <input type="hidden" id="partRateVerSn" name="partRateVerSn" value="" />
    <input type="hidden" id="menuCd" name="menuCd" value="rndDev">
    <input type="hidden" id="type" name="type" value="drafting">
    <input type="hidden" id="nowUrl" name="nowUrl" />
</form>

<input type="hidden" id="partRateMenuGubun" value="DETAIL" />
<div style="padding: 10px">

    <span id="titleVersionName"></span>
    <button type="button" id="excelDown" style="float:right; font-size: 12px;" class="k-button k-button-solid-base" onclick="" disabled>참여율현황표 다운로드</button>
    <button type="button" id="confBtn" style="float:right; margin-right: 5px;  font-size: 12px;" class="k-button k-button-solid-base" onclick="fn_confirm()" disabled>참여율확정</button>
    <%--    <button type="button" disabled id="regBtn" style="float:right; margin-right: 5px" class="k-button k-button-solid-info" onclick="fn_reqRegPopup()">지급신청</button>--%>

    <div id="rateBtnDiv">
    </div>

    <div class="table-responsive">
        <%--        <button type="button" id="" style="float: right; margin-bottom: 5px;" class="k-button k-button-solid-base" disabled onclick=""></button>--%>
        <%--<br><br>--%>
        <table class="popTable table table-bordered mb-0">
            <thead>
            <tr>
                <th rowspan="2" style="width: 5%">구분</th>
                <th rowspan="2" style="width: 5%">참여인력</th>
                <th rowspan="2" style="width: 5%">기준급여</th>
                <th rowspan="2" style="width: 7%">인건비총액<br>(연간급여)</th>
                <th rowspan="2" style="width: 8%">참여시작</th>
                <th rowspan="2" style="width: 8%">참여종료</th>
                <th rowspan="2" style="width: 4%">참여<br>개월</th>
                <th colspan="2" style="width: 11%">현금</th>
                <th colspan="2" style="width: 11%">현물</th>
                <th rowspan="2" style="width: 5%">총참여율<br>(%)</th>
                <th rowspan="2" style="width: 7%">인건비총액<br>(원)</th>
                <th rowspan="2" style="width: 7%">월인건비<br>(원)</th>
                <th rowspan="2" style="width: 4%">참여율<br>조회</th>
            </tr>
            <tr>
                <th style="width: 5%">참여율(%)</th>
                <th style="width: 6%">인건비(원)</th>
                <th style="width: 5%">참여율(%)</th>
                <th style="width: 6%">인건비(원)</th>
            </tr>
            </thead>
            <tbody id="partRateMember">

            </tbody>
        </table>
    </div>
    <input type="hidden" id="viewSubStat" value="N" />
    <input type="hidden" id="empList" value="" />
    <div style="text-align: center; cursor: pointer; margin-top: 15px; margin-bottom: 15px; background-color: #f1f7ff;display: none; border: 1px solid #c5c5c5" id="viewSubBtn"><span id="viewSubText">참여인력 정보▼</span></div>


    <div id="partRateMainGrid"></div>

    <div class="table-responsive">
        <table class="popTable table table-bordered mb-0">
            <colgroup>
                <col width="5%">
                <col width="5%">
                <col width="5%">
                <col width="7%">
                <col width="10%">
                <col width="10%">
                <col width="10%">
                <col width="15%">
                <col width="5%">
                <col width="10%">
                <col width="7%">
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
                <th>기안</th>
                <th>불러오기</th>
            </tr>
            </thead>
            <tbody id="partRateVersion2">
            <tr>
                <td colspan="11" style="text-align: center">
                    <span class="red-star"></span>작성된 참여율이 없습니다.
                </td>
            </tr>
            </tbody>
        </table>
    </div>

    <div class="table-responsive" style="margin-top: 10px;">
        <button type="button" id="reqBtn" style="float: right; margin-bottom: 5px; display: none" class="k-button k-button-solid-base" onclick="rndRPR.fn_reqPartRate()">요청</button>
        <button type="button" id="changeBtn" style="float: right; margin-bottom: 5px; display: none" class="k-button k-button-solid-base" onclick="rndRPR.fn_changePartRate()">변경요청</button>
        <button type="button" id="saveRateBtn" style="float: right; margin-bottom: 5px; margin-right:5px; display: none" class="k-button k-button-solid-info" onclick="rndRPR.fn_save()">저장</button>
        <button type="button" id="changeSaveBtn" style="float: right; margin-bottom: 5px; margin-right:5px; display: none" class="k-button k-button-solid-info" onclick="rndRPR.fn_save('change')">변경</button>
        <br><br>

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
                        <input type="text" id="joinMember" style="width: 80%;">
                        <input type="hidden" id="joinMemberSn" />
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
                        <input type="text" id="minPartRate" value="0" minlength="2" style="width: 80%; text-align: right" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"> %
                    </td>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>최대 참여율
                    </th>
                    <td>
                        <input type="text" id="maxPartRate" value="0" maxlength="2" style="width: 80%; text-align: right" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"> %
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
                        <%--<span class="red-star">*</span>--%>인건비 예산(현물)
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
                        <h3 class="card-title"></h3>
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
    <br><br>
</div>

<script>
    rndPR.fn_defaultScript();
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

    /** 참여인력 선택 */
    function userSearch(type, pk) {
        window.open("/common/deptListPop.do?type="+type+"&pk="+pk, "조직도", "width=750, height=650");
    }

    function fn_reqRegPopup (key){
        var url = "/payApp/pop/regPayAppPop.do";
        if(key != null && key != ""){
            url = "/payApp/pop/regPayAppPop.do?payAppSn=" + key;
        }
        var name = "_blank";
        var option = "width = 1700, height = 820, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    }

    function fn_confirm(){
        if(!confirm("참여율을 확정하시겠습니까?")){
            return;
        }

        var data = {
            partRateVerSn : $("#partRateVerSn").val(),
            pjtSn : $("#pjtSn").val()
        }

        $.ajax({
            url : "/project/confirmPartRate",
            data : data,
            type : "post",
            dataType : "json",
            success : function(rs){
                if(rs.code == 200){
                    alert("참여율이 확정되었습니다.");
                    commonProject.getReloadPage(1, 1, 1, 1, 1, 1);
                }
            }
        });
    }


</script>