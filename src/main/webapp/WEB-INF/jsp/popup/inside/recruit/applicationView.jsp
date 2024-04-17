<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/recruit/applicationView.js?v=${today}"></script>
<input type="hidden" id="regEmpSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="regEmpName" value="${loginVO.name}"/>
<input type="hidden" id="regDeptSeq" value="${loginVO.deptId}"/>
<input type="hidden" id="regDeptName" value="${loginVO.deptNm}"/>
<input type="hidden" id="regTeamSeq" value="${loginVO.teamId}"/>
<input type="hidden" id="regTeamName" value="${loginVO.teamNm}"/>
<input type="hidden" id="regPositionCode" value="${loginVO.positionCode}"/>
<input type="hidden" id="regPositionName" value="${loginVO.positionNm}"/>
<input type="hidden" id="regDutyCode" value="${loginVO.dutyCode}"/>
<input type="hidden" id="regDutyName" value="${loginVO.dutyNm}"/>
<input type="hidden" id="regGradeCode" value="${loginVO.gradeCode}"/>
<input type="hidden" id="regGradeName" value="${loginVO.gradeNm}"/>
<input type="hidden" id="recruitAreaInfoSn" value="${data.RECRUIT_AREA_INFO_SN}"/>

<input type="hidden" id="applicationId" value="${data.APPLICATION_ID}"/>
<input type="hidden" id="stat" value="${params.stat}">
<input type="hidden" id="recruitInfoSn" value="${params.recruitInfoSn}">
<input type="hidden" id="type" value="${params.type}">

<input type="hidden" id="paramAddr" value="${data.ADDR} ${data.ADDR_DETAIL}" />

<body class="font-opensans" style="background-color:#fff;">
<div class="col-lg-12" style="padding:0;">
    <div class="card-header pop-header">
      <h3 class="card-title title_NM">캠틱 온라인 입사지원</h3>
      <div class="btn-st popButton">
        <button type="button" class="k-button k-button-solid-base mngBtn" style="margin-right:5px;" onclick="appView.applicationPrintPop()">인쇄</button>
        <button type="button" class="k-button k-button-solid-primary mngBtn" id="modBtn" style="margin-right:5px;" onclick="appView.applicationMod()">지원정보 수정</button>
        <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">닫기</button>
      </div>
    </div>

  <div id="applicationList" style="padding: 20px;">

  </div>

    <div id="mainGrid" style="padding: 20px;">
      <table class="popTable table table-bordered mb-0" style="border: 0; margin-top : 5px; border: 1px solid #dedfdf;">
        <colgroup>
          <col width="12%">
        </colgroup>
        <thead>
        <tr>
          <th>
            지원분야
          </th>
          <td>
            <span id="recruitAreaInfoSnTxt">
              ${data.JOB}
            </span>
          </td>
        </tr>
        </thead>
      </table>

      <table class="popTable table table-bordered mb-0 mt10" id="recruitReqPop">
        <colgroup>
          <col width="14%">
          <col>
          <col width="10%">
        </colgroup>
        <thead>
        <tr>
          <th colspan="3" style="font-size: 14px; font-weight:600;background-color: #00397f96; color: #fff;">인적사항</th>
        </tr>
        <tr>
          <th>
            이름
          </th>
          <td>
            <img id="imgName_ko" src="/images/ico/imgName_ko.gif" align="absmiddle" border="0">
            <span id="kName">${data.USER_NAME}</span>
            <img id="imgName_ko" src="/images/ico/imgName_En.gif" align="absmiddle" border="0">
            ${data.USER_NAME_EN}
            <img id="imgName_ko" src="/images/ico/imgName_Ch.gif" align="absmiddle" border="0">
            ${data.USER_NAME_CN}
          </td>
          <td rowspan="4">
            <img id="imgPerson" src="http://218.158.231.189${data.photoFile.file_path}${data.photoFile.file_uuid}" border="0" style="height:110px;width:85px;">
          </td>
        </tr>
        <tr>
          <th>
            생년월일/성별
          </th>
          <td>
            ${data.BDAY}(<fmt:formatNumber type="number" maxFractionDigits="0" value="${data.AGE}" />세)(${data.GENDER_TXT})
            <input type="hidden" id="bDayText" value="${data.BDAY}">
          </td>
        </tr>
        <tr>
          <th>
            연락처
          </th>
          <td>
            <img id="imgName_ko" src="/images/ico/imgTel.gif" align="absmiddle" border="0">
            ${data.TEL_NUM}
            <img id="imgName_ko" src="/images/ico/imgHP.gif" align="absmiddle" border="0">
            ${data.MOBILE_TEL_NUM}
          </td>
        </tr>
        <tr>
          <th>
            현주소
          </th>
          <td>
            [${data.ZIP_CODE}]${data.ADDR} ${data.ADDR_DETAIL}
          </td>
        </tr>
        <tr>
          <th>
            이메일
          </th>
          <td colspan="2">
            ${data.USER_EMAIL}
          </td>
        </tr><tr>
          <th>
            취미/특기
          </th>
          <td colspan="2">
            <img id="imgName_ko" src="/images/ico/imgTaste.gif" align="absmiddle" border="0">
            ${data.HOBBY}
            <img id="imgName_ko" src="/images/ico/imgSpe.gif" align="absmiddle" border="0">
            ${data.SPECIALTY}
          </td>
        </tr>
        <tr>
          <th>
            보훈
          </th>
          <td colspan="2">
            <c:choose>
              <c:when test="${data.VETERANS eq 'Y'}">
                ${VETERANS_NUM}
              </c:when>
              <c:otherwise>
                비대상
              </c:otherwise>
            </c:choose>
          </td>
        </tr>
        <tr>
          <th>
            인적성검사문서
          </th>
          <td colspan="2">
            <input type="hidden" id="fileChange" name="fileChange" value="N">
            <span id="fileName" style="position: relative; left: 5px"></span>
            <%--<label for="file" class="k-button k-button-clear-info k-rounded mngBtn" style="margin-left:10px; vertical-align: bottom;">파일첨부</label>--%>
            <%--<input type="file" id="file" name="file" style="display: none;" onchange="appView.getFileName(this)">
            <button type="button" class="k-button k-button-solid-info mngBtn" style="margin-left:10px;" onclick="appView.fileSave(this)">저장</button>--%>
          </td>
        </tr>
      </table>

      <table class="popTable table table-bordered mb-0 mt10 text-center">
        <colgroup>
          <col width="15%">
          <col>
          <col width="10%">
        </colgroup>
        <thead>
        <tr>
          <th colspan="9" style="font-size: 14px; font-weight:600;background-color: #00397f96; color: #fff;">학력사항</th>
        </tr>
        <tr>
          <th>구분</th>
          <th>기간</th>
          <th>학교명</th>
          <th>학과</th>
          <th>전공</th>
          <th>졸업</th>
          <th>평점</th>
          <th>학위증빙</th>
          <th>성적증빙</th>
        </tr>
        <c:forEach var="item" items="${data.school}">
          <tr>
            <td>${item.SCHOOL_TYPE_TXT}</td>
            <td>${item.ADMISSION_DT} ~ ${item.GRADUATION_DT}</td>
            <td>${item.SCHOOL_NAME}</td>
            <td>${item.DEPT}</td>
            <td>${item.MAJOR}</td>
            <td>${item.GRADUATE_TYPE_TXT}</td>
            <td>${item.GRADE}</td>
            <td>
              <c:if test="${item.degreeFile ne null}">
                <c:choose>
                  <c:when test="${item.DEGREE_FILE_UPD_CK eq 'Y'}">
                    <img src="/images/ico/file.gif" onclick="fileDown('${item.degreeFile.file_path}${item.degreeFile.file_uuid}', '${item.degreeFile.file_org_name}.${item.degreeFile.file_ext}')">
                  </c:when>
                  <c:otherwise>
                    <img src="/images/ico/file.gif" onclick="fileDown('${item.degreeFile.file_path}${item.degreeFile.file_uuid}', '${item.degreeFile.file_org_name}.${item.degreeFile.file_ext}', 'recruit')">
                  </c:otherwise>
                </c:choose>
              </c:if>
            </td>
            <td>
              <c:if test="${item.sexualFile ne null}">
                <c:choose>
                  <c:when test="${item.SEXUAL_FILE_UPD_CK eq 'Y'}">
                    <img src="/images/ico/file.gif" onclick="fileDown('${item.sexualFile.file_path}${item.sexualFile.file_uuid}', '${item.sexualFile.file_org_name}.${item.sexualFile.file_ext}')">
                  </c:when>
                  <c:otherwise>
                    <img src="/images/ico/file.gif" onclick="fileDown('${item.sexualFile.file_path}${item.sexualFile.file_uuid}', '${item.sexualFile.file_org_name}.${item.sexualFile.file_ext}', 'recruit')">
                  </c:otherwise>
                </c:choose>
              </c:if>
            </td>
          </tr>
        </c:forEach>
        </thead>
      </table>

      <div class="mb-0 mt10" style="text-align: right"><b>※ 총 경력 : <span id="totCareer"></span></b></div>
      <table class="popTable table table-bordered text-center" style="margin-top: 0">
        <colgroup>
          <col width="15%">
          <col>
          <col width="10%">
        </colgroup>
        <thead>
        <tr>
          <th colspan="7" style="font-size: 14px; font-weight:600;background-color: #00397f96; color: #fff;">경력사항</th>
        </tr>
        <tr>
          <th>근무처</th>
          <th>근무기간</th>
          <th>직위</th>
          <th>담당업무</th>
          <th>퇴직시연봉</th>
          <th>퇴직사유</th>
          <th>증빙</th>
        </tr>
        <c:forEach var="item" items="${data.career}">
          <tr>
            <td>${item.CAREER_ORG_NAME}</td>
            <td>${item.WORK_ST_DT} ~ ${item.WORK_EN_DT}<br>(${item.DIFF_YEAR}년 ${item.DIFF_MONTH}개월)
              <input type="hidden" class="careerDiff" value="${item.DIFF}">
            </td>
            <td>${item.POSITION}</td>
            <td>${item.CHARGE_WORK}</td>
            <td>${item.RETIRE_SALARY}</td>
            <td>${item.RETIRE_REASON}</td>
            <td>
              <c:if test="${item.careerFile ne null}">
                <c:choose>
                  <c:when test="${item.CAREER_FILE_UPD_CK eq 'Y'}">
                    <img src="/images/ico/file.gif" onclick="fileDown('${item.careerFile.file_path}${item.careerFile.file_uuid}', '${item.careerFile.file_org_name}.${item.careerFile.file_ext}')">
                  </c:when>
                  <c:otherwise>
                    <img src="/images/ico/file.gif" onclick="fileDown('${item.careerFile.file_path}${item.careerFile.file_uuid}', '${item.careerFile.file_org_name}.${item.careerFile.file_ext}', 'recruit')">
                  </c:otherwise>
                </c:choose>
              </c:if>
            </td>
          </tr>
          <tr>
            <th>담당업무 세부사항</th>
            <td colspan="6">
              ${item.CAREER_CONTENT}
            </td>
          </tr>
        </c:forEach>
        </thead>
      </table>

      <c:if test="${data.ARMI_YN eq 'Y'}">
      <table class="popTable table table-bordered mb-0 mt10">
        <colgroup>
          <col width="15%">
          <col>
          <col width="10%">
        </colgroup>
        <thead>
        <tr>
          <th colspan="4" style="font-size: 14px; font-weight:600;background-color: #00397f96; color: #fff;">병역사항</th>
        </tr>
        <tr>
          <th>군별</th>
          <td>
            ${data.CLSFT_CODE_TXT}
          </td>
          <th>병역구분</th>
          <td>
            ${data.MILITARY_SVC_TYPE_TXT}
          </td>
        </tr>
        <tr>
          <th>복무기간</th>
          <td>
            <c:if test="${data.M_ENLIST_DAY ne null}">
              ${data.M_ENLIST_DAY} ~ ${data.M_DISHARGE_DAY}
            </c:if>
          </td>
          <th>계급</th>
          <td>
            ${data.RANK}
          </td>
        </tr>
        <tr>
          <th>병과</th>
          <td>
            ${data.ETC}
          </td>
          <th>증빙</th>
          <td>
            <c:if test="${data.armiFile ne null}">
            <img src="/images/ico/file.gif" onclick="fileDown('${data.armiFile.file_path}${data.armiFile.file_uuid}', '${data.armiFile.file_org_name}.${data.armiFile.file_ext}', 'recruit')">
            </c:if>
          </td>
        </tr>
        <tr>
          <th>면제사유</th>
          <td colspan="3">
            ${data.M_UNFUL_REASON}
          </td>
        </tr>
        </thead>
      </table>
      </c:if>

      <table class="popTable table table-bordered mb-0 mt10">
        <colgroup>
          <col width="15%">
          <col>
          <col width="10%">
        </colgroup>
        <thead>
        <tr>
          <th colspan="5" style="font-size: 14px; font-weight:600;background-color: #00397f96; color: #fff;">자격면허</th>
        </tr>
        <tr>
          <th>명칭</th>
          <th>등급</th>
          <th>검정기관</th>
          <th>활용능력</th>
          <th>증빙</th>
        </tr>
        <c:forEach var="item" items="${data.cert}">
          <tr>
            <td>${item.CERT_NAME}</td>
            <td>${item.CERT_CLASS}</td>
            <td>${item.CERT_ISSUER}</td>
            <td>${item.CERT_CONTENT}</td>
            <td>
              <img src="/images/ico/file.gif" onclick="fileDown('${item.certFile.file_path}${item.certFile.file_uuid}', '${item.certFile.file_org_name}.${item.certFile.file_ext}', 'recruit')">
            </td>
          </tr>
        </c:forEach>
        </thead>
      </table>

      <table class="popTable table table-bordered mb-0 mt10">
        <colgroup>
          <col width="15%">
          <col>
          <col width="10%">
        </colgroup>
        <thead>
        <tr>
          <th colspan="5" style="font-size: 14px; font-weight:600;background-color: #00397f96; color: #fff;">외국어</th>
        </tr>
        <tr>
          <th>명칭</th>
          <th>취득시기</th>
          <th>취득점수</th>
          <th>활용능력</th>
          <th>증빙</th>
        </tr>
        <c:forEach var="item" items="${data.lang}">
          <tr>
            <td>${item.LANG_NAME}</td>
            <td>${item.ACQUISITION_DATE}</td>
            <td>${item.ACQUISITION_SCORE}</td>
            <td>${item.LANG_CONTENT}</td>
            <td>
              <img src="/images/ico/file.gif" onclick="fileDown('${item.langFile.file_path}${item.langFile.file_uuid}', '${item.langFile.file_org_name}.${item.langFile.file_ext}', 'recruit')">
            </td>
          </tr>
        </c:forEach>
        </thead>
      </table>

      <table class="popTable table table-bordered mb-0 mt20" >
        <tr>
          <td>
            <b>☞ 기타 외국어 능력</b>
          </td>
        </tr>
        <c:if test="${data.OTHER_YN eq 'Y'}">
        <tr>
          <td>
            ${data.OTHER_LANG}
          </td>
        </tr>
        </c:if>
      </table>

      <table class="popTable table table-bordered mb-0 mt10">
        <thead>
        <tr>
          <th style="font-size: 14px; font-weight:600;background-color: #00397f96; color: #fff;">성장과정 및 장단점</th>
        </tr>
        <tr>
          <td>
            ${data.introduce.INTRODUCE1}
          </td>
        </tr>
        </thead>
      </table>

      <table class="popTable table table-bordered mb-0 mt10">
        <thead>
        <tr>
          <th style="font-size: 14px; font-weight:600;background-color: #00397f96; color: #fff;">입사 후 포부 및 업무추진계획</th>
        </tr>
        <tr>
          <td>
            ${data.introduce.INTRODUCE2}
          </td>
        </tr>
        </thead>
      </table>

      <table class="popTable table table-bordered mb-0 mt10">
        <thead>
        <tr>
          <th style="font-size: 14px; font-weight:600;background-color: #00397f96; color: #fff;">기타사항</th>
        </tr>
        <tr>
          <td>
            ${data.introduce.INTRODUCE3}
          </td>
        </tr>
        </thead>
      </table>
    <c:if test="${data.APPLICATION_STAT eq 'I'}">
      <div style= "display: flex; justify-content: center; align-items: center; margin-top: 20px;">
        <button type="button" class="k-button k-button-solid-info" style= "display: flex; justify-content: center; align-items: center;" onclick="appView.applicationReg(${data.APPLICATION_ID})"><span>인사정보 등록</span></button>
      </div>
    </c:if>
    </div><!--MainGrid-->
</div>

<script>
  appView.fn_defaultScript();
</script>
</body>
