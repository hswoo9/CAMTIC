<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<jsp:useBean id="today" class="java.util.Date" />

<script type="text/javascript" src="<c:url value='/js/intra/cam_project/commonProject.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/rnd/rndPartRate.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js?${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/rnd/rndReqPartRate.js?v=${today}'/>"></script>

<script type="text/javascript" src="/js/intra/inside/recruit/fontJs.js?v=${today}"></script>
<script type="text/javascript" src="/js/jspdf.min.js"></script>
<script type="text/javascript" src="/js/html2canvas.min.js"></script>

<input type="hidden" id="pjtSn" value="${params.pjtSn}" />
<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="verEmpSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="verEmpName" value="${loginVO.name}"/>
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
    <button type="button" id="excelDown" style="float:right; font-size: 12px;" class="k-button k-button-solid-base" onclick="rndPR.partRatePrintPop()">참여율현황표 열람</button>
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
                        <input type="text" id="joinMemberPart" style="width: 80%;">
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

<%--PDF DIV START--%>
<div id="pdf" class="table-responsive pdf_page" style="display: none;">
    <div style="text-align: center;font-weight: bold;font-size: 40px;">
        <span>참여율 현황표</span>
    </div>
    <br>

    <table style="margin: 20px 0 20px 0;font-size: 25px;line-height: 35px;">
        <tr>
            <th>□ 사 업 명 : </th>
            <td id="bsTitlePdf"></td>
        </tr>
        <tr>
            <th>□ 과 제 명 : </th>
            <td id="pjtNmPdf"></td>
        </tr>
        <tr>
            <th>□ 사업기간 : </th>
            <td id="sbjDatePdf"></td>
        </tr>
    </table>
    <br>
    <br>

    <table class="popTable table table-bordered mb-0" style="font-size: 20px;">
        <thead>
        <tr>
            <th rowspan="2" style="width: 5%;font-size: 18px;">구분</th>
            <th rowspan="2" style="width: 5%;font-size: 18px;">참여<br>인력</th>
            <th rowspan="2" style="width: 7%;font-size: 18px;">기준급여</th>
            <th rowspan="2" style="width: 7%;font-size: 18px;">인건비총액<br>(연간급여)</th>
            <th rowspan="2" style="width: 8%;font-size: 18px;">참여시작</th>
            <th rowspan="2" style="width: 8%;font-size: 18px;">참여종료</th>
            <th rowspan="2" style="width: 4%;font-size: 18px;">참여<br>개월</th>
            <th colspan="2" style="width: 12%;font-size: 18px;">현금</th>
            <th colspan="2" style="width: 12%;font-size: 18px;">현물</th>
            <th rowspan="2" style="width: 5%;font-size: 18px;">총<br>참여율<br>(%)</th>
            <th rowspan="2" style="width: 7%;font-size: 18px;">인건비총액<br>(원)</th>
            <th rowspan="2" style="width: 7%;font-size: 18px;">월인건비<br>(원)</th>
        </tr>
        <tr>
            <th style="width: 5%;font-size: 18px;">참여율(%)</th>
            <th style="width: 6%;font-size: 18px;">인건비(원)</th>
            <th style="width: 5%;font-size: 18px;">참여율(%)</th>
            <th style="width: 6%;font-size: 18px;">인건비(원)</th>
        </tr>
        </thead>
        <tbody id="partRateMemberPdf">

        </tbody>
    </table>
</div>
<%--PDF DIV END--%>
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
        $("#joinMemberPart").val(empNm.slice(0, -1));
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
                html += '   <td>' + fCommon.global.attFiles[i].name.substring(0, fCommon.global.attFiles[i].name.lastIndexOf(".")) + '</td>';
                html += '   <td>' + fCommon.global.attFiles[i].name.substring(fCommon.global.attFiles[i].name.lastIndexOf(".")+1) + '</td>';
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

    var renderedImg = new Array;
    var contWidth = 240, // 너비(mm) (a4에 맞춤)
        padding = 10; //상하좌우 여백(mm)

    function fn_pdfDown() {

        rndPR.fn_getPartRateDetailPdf();

        $("#pdf").css("display", "");
        pdfMake();
        $("#pdf").css("display", "none");
    }

    const pdfMake = () => {

        var lists = document.querySelectorAll(".pdf_page"),
            deferreds = [],
            doc = new jsPDF("l", "mm", [518, 734]),
            listsLeng = lists.length;
        for (var i = 0; i < listsLeng; i++) { // pdf_page 적용된 태그 개수만큼 이미지 생성
            var deferred = $.Deferred();
            deferreds.push(deferred.promise());
            generateCanvas(i, doc, deferred, lists[i], contWidth);
        }

        $.when.apply($, deferreds).then(function () { // 이미지 렌더링이 끝난 후
            var sorted = renderedImg.sort(function (a, b) {
                    return a.num < b.num ? -1 : 1;
                }), // 순서대로 정렬
                curHeight = 10, //위 여백 (이미지가 들어가기 시작할 y축)
                sortedLeng = sorted.length;

            for (var i = 0; i < sortedLeng; i++) {
                var sortedHeight = sorted[i].height, //이미지 높이
                    sortedImage = sorted[i].image; //이미지w

                if (i != 0) {
                    curHeight += 20;
                }

                if (i != 0 && curHeight + sortedHeight - 20 > 100 - padding * 2) { // a4 높이에 맞게 남은 공간이 이미지높이보다 작을 경우 페이지 추가
                    doc.addPage(734, 518); // 페이지를 추가함
                    curHeight = 10; // 이미지가 들어갈 y축을 초기 여백값으로 초기화
                    doc.addImage(sortedImage, padding, curHeight, contWidth, sortedHeight); //이미지 넣기
                    curHeight += sortedHeight; // y축 = 여백 + 새로 들어간 이미지 높이
                } else { // 페이지에 남은 공간보다 이미지가 작으면 페이지 추가하지 않음
                    doc.addImage(sortedImage, padding, curHeight, contWidth, sortedHeight); //이미지 넣기
                    curHeight += sortedHeight; // y축 = 기존y축 + 새로들어간 이미지 높이
                }

                var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();

                doc.addFileToVFS('myFont.ttf', fontJs);
                doc.addFont('myFont.ttf', 'myFont', 'normal');
                doc.setFont('myFont');
                doc.text("사단법인 캠틱종합기술원", padding + contWidth / 2, pageHeight - 10, {align: 'center'});

                curHeight += sortedHeight; // y축 = 여백 + 새로 들어간 이미지 높이
            }
            doc.save($("#pjtNm").val() + '_참여율 현황표.pdf'); //pdf 저장
            curHeight = padding; //y축 초기화
            renderedImg = new Array; //이미지 배열 초기화
        });
    }

    function generateCanvas(i, doc, deferred, curList, contW){ //페이지를 이미지로 만들기
        var pdfWidth = $(curList).outerWidth() * 0.2645, //px -> mm로 변환
            pdfHeight = $(curList).outerHeight() * 0.2645,
            heightCalc = contW * pdfHeight / pdfWidth; //비율에 맞게 높이 조절

        html2canvas( curList,  { logging: true, letterRendering: 1, useCORS: true } ).then(
            function (canvas) {
                var img = canvas.toDataURL('image/jpeg', 1.0); //이미지 형식 지정
                renderedImg.push({num:i, image:img, height:heightCalc}); //renderedImg 배열에 이미지 데이터 저장(뒤죽박죽 방지)
                deferred.resolve(); //결과 보내기
            }
        );
    }
</script>