<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<jsp:useBean id="today" class="java.util.Date" />

<% pageContext.setAttribute("br", "\n"); %>
<jsp:include page="/WEB-INF/jsp/template/camtic/common.jsp" flush="false"/>
<script type="text/javascript" src="<c:url value='/js/kendoui/kendo.all.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js?${today}'/>"></script>
<script type="text/javascript" src="/js/camtic/application/applicationForm1.js?v=${today}"></script>
<script type="text/javascript" src="<c:url value='/js/intra/common/postcode.v2.js?autoload=false'/>"></script>

<style>
    .__lab {display:inline-flex;gap:0.5rem;align-items:center;margin-right:1.5rem;position:relative;}
    .__lab:last-child {margin-right:0;}
    .__lab input {position:absolute;left:-9999px;top:0;}
    .__lab i {display:block;width:1.2rem;height:1.2rem;border:1px solid #ccc;position:relative;font-style:normal;background-color:#fff;}
    .__lab input[type='radio'] ~ i {border-radius:50%;}
    .__lab input[type='radio'] ~ i:before {content:"";opacity:0;width:1rem;height:1rem;background:#0078ff;position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);border-radius:50%;}
    .__lab input[type='radio']:checked ~ i {border-color:#0078ff;}
    .__lab input[type='radio']:checked ~ i:before {opacity:1;}

    .__lab input[type='checkbox'] ~ i:before {content:"\f2d5";font-family:axicon;position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);opacity:0;color:#0078ff;font-size:1.0rem;}
    .__lab input[type='checkbox']:checked ~ i {border-color:#0078ff;}
    .__lab input[type='checkbox']:checked ~ i:before {opacity:1;}
    .__lab span{font-weight: normal; font-size:1.2rem;}

    .__tit1 {margin-bottom:1rem;position:relative;}
    .__tit1 h3 {font-size:1.7rem;font-weight:500;color:#000;letter-spacing:-0.05em;line-height:1.3;}
    .__tit1 > p {font-size:1.5rem;line-height:1.4;margin-top:0.5rem;letter-spacing:-0.03em;}
    .__tit1 .rig {position:absolute;right:0;bottom:0;}

    .__agree .area {border:0.1rem solid #ccc;font-size:1.2rem;line-height:1.8;padding:2rem;letter-spacing:-0.05em;background:#f3f3f3;}
    .__agree .txt {margin-top:2rem;font-size:1.2rem;text-align:center;letter-spacing:-0.05em;line-height:1.5;}
    .__agree .lab {margin-top:1.5rem;font-size:1.6rem;text-align:center;}

    .__sign {text-align:center;}
    .__sign p {font-size:1.6rem;letter-spacing:-0.05em;}
    .__sign dl dt {font-size:2.4rem;letter-spacing:-0.05em;color:#000;margin-top:2rem;}
    .__sign dl dd {font-size:2rem;letter-spacing:-0.05em;margin-top:1.5rem;color:#000;font-weight:500;}
    .__sign .lab {margin-top:1.5rem;font-size:1.6rem;}

    @media all and (max-width:1024px){
        .__agree .area {font-size:1.4rem;line-height:1.6;padding:1.5rem;}
        .__agree .txt {margin-top:1.2rem;font-size:1.3rem;}
        .__agree .lab {margin-top:1rem;font-size:1.4rem;}
    }

    .__tbl {width:100%;border-top:0.2rem solid #2a3278;}
    .__tbl tr > * {padding:1rem;text-align:center;border-bottom:1px solid #ccc;font-size:1.3rem;letter-spacing:-0.03em;line-height:1.3;}
    .__tbl small {font-size:0.9em;color:#aaa;letter-spacing:-0.05em;}
    .__tbl thead tr th {background:#f3f4f6;color:#000;font-weight:normal;}
    .__tbl tbody tr th {background:#f3f3f3;color:#000;font-weight:normal;}
    .__tbl tbody tr td {height:2.9rem;}
    .__tbl .subject {text-align:left;}
    .__tbl .subject a {display:inline-block;max-width:100%;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;color:#000;}
    .__tbl h2 {font-size:1.8rem;color:#000;font-weight:bold;letter-spacing:-0.05em;}
    .__tbl.fix {table-layout:fixed;}
    .__tbl.line tr > * {border-right:1px solid #ccc;}
    .__tbl.line tr > *:last-child {border-right:none;}
</style>

<body>
<div id="wrap">
    <jsp:include page="/WEB-INF/jsp/template/camtic/head.jsp" flush="false"/>
    <div id="sub">
        <div class="inner">
            <jsp:include page="/WEB-INF/jsp/template/camtic/lnb.jsp" flush="false"/>
            <div id="content">
                <ul id="navigation">
                    <li><a href="/camtic"><img src="/images/camtic/home_3.png" class="homeImage">홈으로</a></li>
                    <li class="">직원과 함께</li>
                    <li class=""><span>채용공고</span></li>
                </ul>
                <div id="title">
                    <h3><span>채용공고</span></h3>
                </div>

                <div class="__tit1">
                    <h3>지원분야</h3>
                    <div class="rig">
                        <p class="__fz15">지원분야 선택은 채용 공고문을 자세히 확인 후 선택 바랍니다.</p>
                    </div>
                </div>

                <table class="__tbl respond2 fix" id="categoryTb">
                    <caption>TABLE</caption>
                    <colgroup>
                        <col style="width:10rem;">
                        <col>
                        <col style="width:10rem;">
                        <col>
                        <col style="width:10rem;">
                        <col>
                    </colgroup>
                    <tbody>
                    <tr>
                        <th>직무형태 <span class="__red">*</span></th>
                        <td class="tal">
                            <select id="recruitAreaInfoSn" name="recruitAreaInfoSn" class="__inp" onchange="applicationForm.careerType()">
                                <option value="">선택</option>
                            </select>
                        </td>
                        <th>직종별 <span class="__red">*</span></th>
                        <td class="tal">
                            <select name="occupationCode" id="occupationCode" class="__inp">
                                <option value="">선택</option>
                            </select>
                        </td>
                        <th>직급별 <span class="__red">*</span></th>
                        <td class="tal">
                            <select name="positionCode" id="positionCode" class="__inp">
                                <option value="">선택</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th>직무분야 <span class="__red">*</span></th>
                        <td colspan="5" class="tal">
                            <select name="workFieldCode" id="workFieldCode" class="__inp">
                                <option value="">선택</option>
                            </select>
                        </td>
                    </tr>
                    </tbody>
                </table>

                <div class="__fz15 __mt15">
                    지원분야는 접수 이후 변경 할 수 없습니다.<br>
                    지원분야 선택 오류로 인한 불이익은 캠틱종합기술원에서는 책임지지 않습니다.
                </div>

                <div class="__tit1 __mt60">
                    <h3>인적사항</h3>
                </div>
                <table class="__tbl respond2 fix">
                    <caption>TABLE</caption>
                    <colgroup>
                        <col style="width:10rem;">
                        <col>
                        <col style="width:10rem;">
                        <col>
                    </colgroup>
                    <tbody>
                    <tr>
                        <th>성명 <span class="__red">*</span></th>
                        <td class="tal">
                            <input type="text" class="__inp" id="userName" name="userName" value="${loginVO.userName}" placeholder="(한글) 홍길동" onKeyPress="hangul();">
                        </td>
                        <th>이메일 <span class="__red">*</span></th>
                        <td class="tal">
                            <ul class="__flx">
                                <li>
                                    <input type="text" class="__inp" id="userEmail" name="userEmail" style="width:10rem">
                                </li>
                                <li style="width:auto;">@</li>
                                <li>
                                    <select name="emailDomain" id="emailDomain" class="__inp" onchange="applicationForm.emailDomainSelfText(this)" style="width: 10rem">
                                        <option value="self">직접입력</option>
                                        <option value="gmail.com">gmail.com</option>
                                        <option value="naver.com">naver.com</option>
                                        <option value="daum.met">daum.met</option>
                                        <option value="outlook.com">outlook.com</option>
                                        <option value="nate.com">nate.com</option>
                                        <option value="hanmail.net">hanmail.net</option>
                                    </select>
                                    <input type="emailDomain" id="emailDomainTxt" class="__inp" style="width:10rem;">
                                </li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th>현주소 <span class="__red">*</span></th>
                        <td class="tal" colspan="3">
                            <div>
                                <input type="text" class="__inp" id="zipCode" readonly name="zipCode" style="width:10em;" onclick="applicationForm.addrSearch()">
                                <button type="button" class="__btn3 black" onclick="applicationForm.addrSearch()">
                                    <span>주소찾기</span>
                                </button>
                            </div>
                            <div class="__mt10">
                                <input type="text" class="__inp" id="addr" readonly name="addr"  onclick="applicationForm.addrSearch()" placeholder="도로명 주소">
                            </div>
                            <div class="__mt10">
                                <input type="text" class="__inp" id="addrDetail" name="addrDetail" placeholder="상세주소">
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th>연락처 <span class="__red">*</span></th>
                        <td class="tal">
                            <input type="text" class="__inp" id="telNum" name="telNum"  onkeydown="return onlyNumber(event)" onkeyup="removeChar(event);telFilter(this)" maxlength="13" placeholder="숫자만 기입 (휴대폰)">
                        </td>
                        <th>비상연락처 <span class="__red">*</span></th>
                        <td class="tal">
                            <input type="text" class="__inp" id="emergencyTelNum" name="emergencyTelNum" onkeydown="return onlyNumber(event)" onkeyup="removeChar(event);telFilter(this)" maxlength="14" placeholder="숫자만 기입 (일반전화, 휴대폰)">
                        </td>
                    </tr>
                    <tr>
                        <th>최종학교 소재지<span class="__red">*</span></th>
                        <td class="tal">
                            <input type="text" class="__inp" id="finalSchoolName" name="finalSchoolName" placeholder="학교명 기재 금지, 소재지 기재">
                        </td>
                        <th>해당표시</th>
                        <td class="tal">
                            <label class="__lab"><input type="checkbox" id="handicapped" name="handicapped" value="Y"><i></i><span>장애대상</span></label>
                            <label class="__lab"><input type="checkbox" id="veterans" name="veterans" value="Y"><i></i><span>보훈대상</span></label>
                        </td>
                    </tr>
                    <tr>
                        <th>최종학력</th>
                        <td class="tal">
                            <label class="__lab"><input type="checkbox" id="degree1" name="degree1" value="Y"><i></i><span>고졸</span></label>
                            <label class="__lab"><input type="checkbox" id="degree2" name="degree2" value="Y"><i></i><span>전문학사</span></label>
                            <label class="__lab"><input type="checkbox" id="degree3" name="degree3" value="Y"><i></i><span>학사</span></label>
                            <label class="__lab"><input type="checkbox" id="degree4" name="degree4" value="Y"><i></i><span>석사</span></label>
                            <label class="__lab"><input type="checkbox" id="degree5" name="degree5" value="Y"><i></i><span>박사</span></label>
                        </td>
                        <th>학위논문<br>(석사이상)</th>
                        <td class="tal"><input type="text" class="__inp" id="treatise" name="treatise" placeholder="학위 논문 제목 기재"></td>
                    </tr>
                    </tbody>
                </table>

                <div class="__mt10">
				<span class="__fz15">
					행정관리직(마급), 기술직(마급)은 최종학력 작성금지<br>
					최종학력은 채용 자격 기준 확인용으로만 이용됩니다. 해당자만 작성 해 주세요.
				</span>
                </div>

                <div class="__topArea __mt60">
                    <div class="lef">
                        <div class="__tit1">
                            <h3>교육사항</h3>
                            <p>지원직무 관련 과목 및 교육과정을 이수한 경우 그 내용을 기입해 주십시오.</p>
                        </div>
                    </div>
                    <div class="rig">
                        <div class="__fz15">
                            최대 10개, 필요시 우측 추가 버튼 클릭하여 기입
                        </div>
                        <div class="__btWrap rig __mt10">
                            <button type="button" class="__btn3 blue" onclick="applicationForm.addEduRow()"><span>추가</span></button>
                            <button type="button" class="__btn3 red" onclick="applicationForm.delRow('eduInfo')"><span>삭제</span></button>
                        </div>
                    </div>
                </div>

                <div id="eduInfoDiv">
                    <table class="__tbl respond2 fix __mt20 eduInfo" id="eduInfo0">
                        <caption>TABLE</caption>
                        <colgroup>
                            <col style="width:10rem;">
                            <col>
                            <col style="width:11rem;">
                            <col>
                            <col style="width:10rem;">
                            <col>
                        </colgroup>
                        <tbody>
                        <tr>
                            <th>교육구분</th>
                            <td class="tal">
                                <label class="__lab"><input type="radio" id="schoolEdu" name="eduType0" value="0"><i></i><span>학교교육</span></label>
                                <label class="__lab"><input type="radio" id="jobTraining" name="eduType0" value="1"><i></i><span>직업훈련</span></label>
                                <label class="__lab"><input type="radio" id="other" name="eduType0" value="2"><i></i><span>기타</span></label>
                            </td>
                            <th>과목명 및 교육과정</th>
                            <td><input type="text" class="__inp" id="eduName" name="eduName"></td>
                            <th>교육시간</th>
                            <td><input type="text" class="__inp" id="eduTrainingTime" name="eduTrainingTime"></td>
                        </tr>
                        <tr>
                            <th>직무관련<br>주요내용</th>
                            <td colspan="5"><textarea id="eduContent" name="eduContent" class="__inp area" onkeyup="applicationForm.adjustHeight(this);" maxlength="200" placeholder="20자 이상 200자 이내"></textarea></td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <div class="__topArea __mt60">
                    <div class="lef">
                        <div class="__tit1">
                            <h3>자격사항</h3>
                            <p>지원직무 관련 국가기술/전문자격, 국가공인민간자격을 기입해 주십시오.</p>
                        </div>
                    </div>
                    <div class="rig">
                        <div class="__fz15">
                            최대 6개, 필요시 우측 추가 버튼 클릭하여 기입
                        </div>
                        <div class="__btWrap rig __mt10">
                            <button type="button" class="__btn3 blue" onclick="applicationForm.addCertRow()"><span>추가</span></button>
                            <button type="button" class="__btn3 red" onclick="applicationForm.delRow('certInfo')"><span>삭제</span></button>
                        </div>
                    </div>
                </div>

                <div id="certInfoDiv">
                    <table class="__tbl respond1 line fix">
                        <caption>TABLE</caption>
                        <colgroup class="__m">
                            <col style="width:25%;">
                            <col style="width:25%;">
                            <col>
                        </colgroup>
                        <thead>
                        <tr>
                            <th>자격증명</th>
                            <th>발급기관</th>
                            <th>
                                취득일자
                            </th>
                        </tr>
                        </thead>
                        <tbody id="certInfoTb">
                        <tr class="certInfo" id="certInfo0">
                            <td><input type="text" class="__inp" placeholder="자격증명" id="certificateName" name="certificateName"></td>
                            <td><input type="text" class="__inp" placeholder="발급기관" id="certificateIssuer" name="certificateIssuer"></td>
                            <td><input type="text" placeholder="20000101 형식 숫자로 기입 가능합니다." id="acquisitionDate0" name="acquisitionDate" class="dateInput" autocomplete="off"></td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <div class="__topArea __mt60">
                    <div class="lef">
                        <div class="__tit1">
                            <h3>경험 혹은 경력 사항</h3>
                            <p>지원직무 관련 경험 혹은 경력사항을 기입해 주십시오</p>
                            <div class="__fz15">
                                경력은 근로계약을 맺고 금전적 보수를 받으며 일했던 이력을 의미하며, 공식문서로 증빙 가능한 경우만 기입
                            </div>
                        </div>
                    </div>
                    <div class="rig">

                        <div class="__btWrap rig __mt10">
                            <button type="button" class="__btn3 blue" onclick="applicationForm.addCareerRow()"><span>추가</span></button>
                            <button type="button" class="__btn3 red" onclick="applicationForm.delRow('careerInfo')"><span>삭제</span></button>
                        </div>
                    </div>
                </div>

                <div id="careerInfoDiv">
                    <table class="__tbl respond2 fix __mt20 careerInfo" id="careerInfo0">
                        <caption>TABLE</caption>
                        <colgroup>
                            <col style="width:13rem;">
                            <col>
                            <col style="width:13rem;">
                            <col>
                            <col style="width:13rem;">
                            <col>
                        </colgroup>
                        <tbody>
                        <tr>
                            <th>구분</th>
                            <td class="tal">
                                <label class="__lab">
                                    <input type="radio" id="experience" name="careerType0" value="0"><i></i>
                                    <span>경험</span></label>
                                <label class="__lab">
                                    <input type="radio" id="career" name="careerType0" value="1"><i></i>
                                    <span>경력</span>
                                </label>
                            </td>
                            <th>소속조직</th>
                            <td><input type="text" class="__inp" placeholder="소속명" id="careerOrgName" name="careerOrgName"></td>
                            <th>역할</th>
                            <td><input type="text" class="__inp" placeholder="역할" id="role" name="role"></td>
                        </tr>
                        <tr>
                            <th>활동기간</th>
                            <td>
                                <div style="display: flex">
                                    <input type="text" id="activityStDt0" name="activityStDt0" class="dateInput"> ~
                                    <input type="text" id="activityEnDt0" name="activityEnDt0" class="dateInput">
                                </div>
                            </td>
                            <th>활동내용</th>
                            <td colspan="3"><input type="text" class="__inp" id="activityContent" name="activityContent"></td>
                        </tr>
                        <tr>
                            <th>직무관련<br>주요내용</th>
                            <td colspan="5" class="tal">
                                <textarea  id="careerContent" name="careerContent" class="__inp area" onkeyup="applicationForm.adjustHeight(this);" maxlength="200" placeholder="20자 이상 200자 이내"></textarea>
                                <div class="__fz15 __mt10">직무활동, 동아리/동호회. 팀 프로젝트, 연구회, 재능기부 등 주요 직무경험을 서술하여 주십시오.</div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <table class="__tbl respond2 fix __mt20">
                    <caption>TABLE</caption>
                    <colgroup>
                        <col style="width:13rem;">
                        <col>
                    </colgroup>
                    <tbody>
                    <tr>
                        <th>
                            제출서류<span class="__red">*</span>
                            <div class="__ques tal">
                                <button type="button" onclick="$(this).closest('.__ques').toggleClass('active')"><i class="ri-question-line"></i></button>
                                <div class="flt">
                                    <div class="con">
                                        1. 제출 서류는 채용 공고문의 “채용 자격 기준” 과 “제출서류”를 반드시 확인하시기 바랍니다.<br>
                                        2. 출신학교명, 성별, 출생년도, 가족관계, 출신지 등을 암시 또는 유추 할 수 있는 내용은 블라인드 처리 후 첨부하시기 바랍니다.<br>
                                        3. 첨부 파일명 양식 : 증빙종류_채용직무분야_성명(예 : 졸업증명서_재무회계_홍길동)
                                    </div>
                                    <button type="button" class="cls" onclick="$(this).closest('.__ques').removeClass('active')"><i class="ri-close-line"></i></button>
                                </div>
                            </div>
                        </th>
                        <td class="tal">
                            <div class="__file">
                                <div type="text" class="__inp" id="inputFile" name="inputFile" style="height: auto; line-height: 21px;display: flex;flex-direction: column;">

                                </div>
                                <span class="__btn3 black" onclick="$('#careerFileList').click()" style="cursor:pointer">
									<span>파일선택</span>
								</span>
                            </div>
                            <span> jpg, pdf 확장자만 가능합니다.</span>
                            <input type="file" id="careerFileList" name="careerFileList" multiple style="display: none">
                        </td>
                    </tr>
                    </tbody>
                </table>

                <div class="__sign __mt40">
                    <p>위 기재 사항은 사실과 다름이 없음을 확인하며, 상기 내용이 사실과 다를 시 어떠한 불이익도 감수할 것을 약속합니다.</p>
                    <dl>
                        <dt>${now}</dt>
                        <dd>지원자 : ${loginVO.userName}</dd>
                    </dl>

                    <div class="lab">
                        <label class="__lab">
                            <input type="checkbox" name="agreeChk" id="agreeChk"><i></i>
                            <span>동의합니다</span>
                        </label>
                    </div>
                </div>

                <div class="__botArea">
                    <div style="text-align: center;">
                        <a href="javascript:void(0);" class="__btn1 blue" style="width:200px;" onclick="applicationForm.setApplicationTempSave('temp')"><span>임시저장</span></a>
                        <a href="javascript:void(0);" class="__btn1 blue" style="width:200px;" onclick="applicationForm.setApplicationTempSave('next')"><span>다음단계</span></a>
                        <a href="javascript:void(0);" class="__btn1 blue" style="width:200px;" onclick="window.close()"><span>취소</span></a>
                    </div>
                </div>

                <div class="__sign __mt20">
                    <p>
                        임시 저장 후 내용 확인 및 수정이 가능합니다.<br>
                        최종제출 시에는 수정이 되지 않습니다.
                    </p>
                </div>
            </div>
        </div>
    </div>
    <jsp:include page="/WEB-INF/jsp/template/camtic/foot.jsp" flush="false"/>
</div>
</body>
</html>

<script src="/js/intra/common/aes.js?v=1"></script>
<script>
    applicationForm.fn_defaultScript();
    $("#armiDiv").show();

    function formatPhoneNumber(input) {
        let digits = input.value.replace(/\D/g, '');
        var tmp = digits.substring(0,2);

        if (digits.length === 9) {
            let formattedNumber = digits.replace(/(\d{2})(\d{3})(\d{4})/, '$1-$2-$3');
            input.value = formattedNumber;
        }else if(digits.length === 10 && tmp === '02'){
            let formattedNumber = digits.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
            input.value = formattedNumber;
        } else if (digits.length === 10) {
            let formattedNumber = digits.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
            input.value = formattedNumber;
        }else if(digits.length === 11){
            let formattedNumber = digits.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
            input.value = formattedNumber;
        }

        if (digits.length >= 12) {
            input.value = digits.slice(0, 3) + '-' + digits.slice(3, 7) + '-' + digits.slice(7, 11);
        }
    }

    function  formatMobilePhoneNumber(input) {
        let digits = input.value.replace(/\D/g, '');
        if(digits.length === 10){
            let formattedNumber = digits.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
            input.value = formattedNumber;
        }else if (digits.length === 11) {
            let formattedNumber = digits.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
            input.value = formattedNumber;
        }

        if (digits.length >= 12) {
            input.value = digits.slice(0, 3) + '-' + digits.slice(3, 7) + '-' + digits.slice(7, 11);
        }
    }

    function onlyNumber(event) {
        const key = event.keyCode;
        return (key >= 48 && key <= 57) || (key >= 96 && key <= 105) || key == 8 || key == 9 || key == 37 || key == 39 || key == 46;
    }

    function removeChar(event) {
        const key = event.keyCode;
        if (key == 8 || key == 46) {
            return;
        }
        const input = event.target;
        let value = input.value;
        value = value.replace(/-/g, '');
        input.value = value;
    }
</script>