<%--
  Created by IntelliJ IDEA.
  User: jsy
  Date: 2023-02-28
  Time: 오전 10:27
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="menuParam" value="${param.menu}"/>
<link rel="stylesheet" href="/css/intra/template/template.css">
<script type="text/javascript">
    function open_in_frame(url) {
        $("#approveModal").remove();
        $("#tilesBody").children().remove();
        $("#tilesBody").load(url);
    }
    $(function() {

        $('.toggleMain').click(function(e) {
            e.preventDefault();

            var $this = $(this);

            if ($this.hasClass('toggled')) {
                $this.removeClass('toggled');
            } else {
                $this.addClass('toggled');
            }

            if ($this.next().hasClass('show')) {
                $this.next().slideToggle();
                $this.next().removeClass('show');
            } else {
                $this.next().slideToggle();
                $this.next().toggleClass('show');
            }
        });

        $('.toggleMain1').click(function() {

            var $this = $(this);

            if ($this.hasClass('toggled')) {
                $this.removeClass('toggled');
            } else {
                $this.addClass('toggled');
            }

            if ($this.next().hasClass('show')) {
                $this.next().slideToggle();
                $this.next().removeClass('show');
            } else {
                $this.next().slideToggle();
                $this.next().toggleClass('show');
            }

        });

        var menuParam = "${menuParam}"; // a_a
        if(menuParam != null && menuParam == "" && menuParam == undefined){
            var menuP = String(menuParam).split("_"); // [ 'a', 'a' ]
            $("." + menuP[0]).addClass("show"); // 'a'    $(".a").addClass("show");
            $("." + menuParam).addClass("show");// $(".a_a").addClass("show");

            //active
            var url = window.location.pathname,
                urlRegExp = new RegExp(url.replace(/\/$/, '') + "$");

            $("." + menuParam + " li a").each(function () {
                if (urlRegExp.test(this.href.split("?")[0].replace(/\/$/, ''))) {
                    $(this).addClass('leftChange');
                }
            });
        }
        /*$("." + menuParam + " li a").attr("href").indexOf(menuParam);
        $("." + menuParam + " li a").each(function(i,e) {
            if ($(e).attr("href").indexOf(menuParam) > -1) {
                $(e).addClass("menuHover");
            }
        });*/
    });

</script>

<section>
    <div class="leftpanel">
        <div class="leftpanelinner">
            <div class="tab-content">
                <!-- ################# MAIN MENU ################### -->
                <div class="" id="mainmenu">
                    <h5 class="sidebar-title">업무</h5>
                    <ul class="accordion nav nav-pills nav-stacked nav-quirk">
                        <li>
                            <a class="toggleMain" href="#">전자결재</a>
                            <ul class="innerMain children a">
                                <li>
                                    <a href="#" class="toggleMain">상신/보관함</a>
                                    <ul class="innerMain children a_a">
                                        <li><a href="#" onclick="open_in_frame('/approvalUser/storageBoxDraftDocList.do?menu=a_a')" class="toggleMain1">양식목록</a></li>
                                        <li><a href="#" onclick="open_in_frame('/approvalUser/storageBoxTempSaveDocList.do?menu=a_a')" class="toggleMain1">임시보관문서</a></li> <%--menu=a_a--%>
                                        <li><a href="#" onclick="open_in_frame('/approvalUser/storageBoxDraftDocList.do?menu=a_a')" class="toggleMain1">상신문서</a></li>
                                        <li><a href="#" onclick="open_in_frame('/approvalUser/storageBoxReturnDocList.do?menu=a_a')" class="toggleMain1">반려/회수 문서</a></li>
                                        <li><a href="#" onclick="open_in_frame('/approvalUser/storageBoxReaderDocList.do?menu=a_a')" class="toggleMain1">열람문서</a></li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#" class="toggleMain">결재함</a>
                                    <ul class="innerMain children a_b">
                                        <li><a href="#" onclick="open_in_frame('/approvalUser/approveWaitDocList.do?menu=a_b')" class="toggleMain1">결재대기문서</a></li> <%--menu=a_b--%>
                                        <li><a href="#" onclick="open_in_frame('/approvalUser/approveTobeDocList.do?menu=a_b')" class="toggleMain1">결재예정문서</a></li>
                                        <li><a href="#" onclick="open_in_frame('/approvalUser/approveCompletionDocList.do?menu=a_b')" class="toggleMain1">결재완료문서</a></li>
                                        <li><a href="#" onclick="open_in_frame('/approvalUser/approveReturnDocList.do?menu=a_b')" class="toggleMain1">결재반려문서</a></li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#" class="toggleMain">결재설정</a>
                                    <ul class="innerMain children a_c">
                                        <li><a href="#" onclick="open_in_frame('/approvalUser/approvalLineManagement.do?menu=a_c')" class="toggleMain1">결재선 관리</a></li>
                                        <li><a href="#" class="toggleMain1">부재설정</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a class="toggleMain" href="#">캠스팟</a>
                            <ul class="innerMain children b">
                                <li>
                                    <a href="#" class="toggleMain">개인정보</a>
                                    <a href="#" class="toggleMain">이미지관리</a>
                                    <a href="#" class="toggleMain">권한조회</a>
                                    <a href="#" class="toggleMain">인사기록카드</a>
                                    <a href="#" class="toggleMain">근태관리</a>
                                    <a href="#" class="toggleMain">휴가관리</a>
                                    <a href="#" class="toggleMain">직무발명신고</a>
                                </li>
                                <%--<li>
                                  <a href="#" class="toggleMain">게시판</a>
                                  <ul class="innerMain children b_a">
                                    <li><a href="#" class="toggleMain1">공지사항</a></li> <!--menu=b_a-->
                                    <li><a href="#" class="toggleMain1">업무보고</a></li>
                                  </ul>
                                </li>
                                <li><a href="#" class="toggleMain1">제안제도</a></li> <!--menu=b_b-->
                                <li><a href="#" class="toggleMain1">직원일정</a></li>
                                <li><a href="#" class="toggleMain1">설문조사</a></li>
                                <li>
                                  <a href="#" class="toggleMain">내정보관리</a>
                                  <ul class="innerMain children b_c">
                                    <li><a href="#" class="toggleMain1">기본정보관리</a></li> &lt;%&ndash;menu=b_c&ndash;%&gt;
                                    <li><a href="#" class="toggleMain1">학력</a></li>
                                    <li><a href="#" class="toggleMain1">경력</a></li>
                                    <li><a href="#" class="toggleMain1">자격/면허</a></li>
                                    <li><a href="#" class="toggleMain1">어학</a></li>
                                    <li><a href="#" class="toggleMain1">인사기록카드</a></li>
                                  </ul>
                                </li>--%>
                            </ul>
                        </li>
                        <li>
                            <a class="toggleMain" href="#">캠프로젝트</a>
                            <ul class="innerMain children e">
                                <li>
                                    <a href="#" class="toggleMain">캠프로젝트관리</a>
                                    <%--<ul class="innerMain children e_a">
                                      <li><a href="#" class="toggleMain1">휴가신청</a></li>
                                      &lt;%&ndash;<li onclick=""><a class="toggleMain">휴가신청</a></li>&ndash;%&gt;
                                      &lt;%&ndash;<li onclick="location.href='/user/organizationChart.do'"><a class="toggleMain">조직도</a></li>&ndash;%&gt;
                                      <li><a href="/user/organizationChart.do?menu=e_a" class="toggleMain1">조직도</a></li>
                                    </ul>--%>
                                </li>
                                <%--<li>
                                  <a href="#" class="toggleMain">엔지니어링</a>
                                  <ul class="innerMain children e_b">
                                    <li><a href="#" class="toggleMain1">프로젝트등록및목록</a></li>
                                    &lt;%&ndash;<li onclick=""><a class="toggleMain">프로젝트등록및목록</a></li>&ndash;%&gt;
                                    &lt;%&ndash;<li onclick="location.href='/engineering/estimate.do'"><a class="toggleMain">개발상담서</a></li>&ndash;%&gt;
                                    <li><a href="/engineering/estimate.do?menu=e_b" class="toggleMain1">개발상담서</a></li>
                                    <li><a href="#" class="toggleMain1">수주보고</a></li>
                                    <li><a href="#" class="toggleMain1">개발계획서등록(협업)</a></li>
                                    &lt;%&ndash;<li onclick=""><a class="toggleMain">개발계획서등록(협업)</a></li>&ndash;%&gt;
                                  </ul>
                                </li>--%>
                            </ul>
                        </li>
                        <li>
                            <a class="toggleMain" href="#">캠아이템</a>
                            <ul class="innerMain children g">
                                <li>
                                    <a href="#" class="toggleMain">기준정보</a>
                                    <ul class="innerMain children g_a">
                                        <li><a href="#" class="toggleMain1">고객단가관리</a></li> <%--menu=g_a--%>
                                        <li><a href="#" class="toggleMain1">표준단가관리</a></li>
                                        <li><a href="#" class="toggleMain1">품목정보</a></li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#" class="toggleMain">수주관리</a>
                                    <ul class="innerMain children g_b">
                                        <li><a href="#" class="toggleMain1">수주등록</a></li> <%--menu=g_b--%>
                                        <li><a href="#" class="toggleMain1">수주현황</a></li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#" class="toggleMain">출하관리</a>
                                    <ul class="innerMain children g_c">
                                        <li><a href="#" class="toggleMain1">출하실적등록</a></li> <%--menu=g_c--%>
                                        <li><a href="#" class="toggleMain1">출하실적현황</a></li>
                                        <li><a href="#" class="toggleMain1">출하실적추이분석</a></li>
                                        <li><a href="#" class="toggleMain1">반품등록</a></li>
                                        <li><a href="#" class="toggleMain1">택배수발송등록</a></li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#" class="toggleMain">BOM</a>
                                    <ul class="innerMain children g_d">
                                        <li><a href="#" class="toggleMain1">BOM등록</a></li> <%--menu=g_d--%>
                                        <li><a href="#" class="toggleMain1">BOM조회</a></li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#" class="toggleMain">구매관리</a>
                                    <ul class="innerMain children g_e">
                                        <li><a href="#" class="toggleMain1">자재단가관리</a></li> <%--menu=g_e--%>
                                        <li><a href="#" class="toggleMain1">입고등록</a></li>
                                        <li><a href="#" class="toggleMain1">검수등록</a></li>
                                        <li><a href="#" class="toggleMain1">입고현황</a></li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#" class="toggleMain">재고관리</a>
                                    <ul class="innerMain children g_f">
                                        <li><a href="#" class="toggleMain1">재고현황</a></li> <%--menu=g_f--%>
                                        <li><a href="#" class="toggleMain1">창고별재고현황</a></li>
                                        <li><a href="#" class="toggleMain1">재고이동등록</a></li>
                                        <li><a href="#" class="toggleMain1">재고이동현황</a></li>
                                        <li><a href="#" class="toggleMain1">안전재고마스터</a></li>
                                        <li><a href="#" class="toggleMain1">안전재고현황</a></li>
                                        <li><a href="#" class="toggleMain1">재고현황보고</a></li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#" class="toggleMain">마감관리</a>
                                    <ul class="innerMain children g_g">
                                        <li><a href="#" class="toggleMain1">매출확정</a></li> <%--menu=g_g--%>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#" class="toggleMain">시스템</a>
                                    <ul class="innerMain children g_h">
                                        <li><a href="#" class="toggleMain1">고객관리</a></li> <%--menu=g_h--%>
                                        <li><a href="#" class="toggleMain1">창고등록</a></li>
                                        <li><a href="#" class="toggleMain1">기초코드등록</a></li>
                                        <li><a href="#" class="toggleMain1">품목마스터</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a class="toggleMain" href="#">캠매니저</a>
                            <ul class="innerMain children h">
                                <li>
                                    <a href="#" class="toggleMain">예산관리</a>
                                    <ul class="innerMain children h_a">
                                        <li><a href="#" class="toggleMain1">예산현황</a></li> <%--menu=h_a--%>
                                        <li><a href="#" class="toggleMain1">예산통계</a></li>
                                    </ul>
                                </li>
                                <li><a href="#" class="toggleMain1">지출관리</a></li> <%--menu=h_b--%>
                                <li>
                                    <a href="#" class="toggleMain">결의관리</a>
                                    <ul class="innerMain children h_c">
                                        <li><a href="#" class="toggleMain1">지급신청서검토</a></li> <%--menu=h_c--%>
                                        <li><a href="#" class="toggleMain1">지출결의서</a></li>
                                        <li><a href="#" class="toggleMain1">반제결의서(지출)</a></li>
                                        <li><a href="#" class="toggleMain1">교육비입금관리</a></li>
                                        <li><a href="#" class="toggleMain1">수입결의서</a></li>
                                        <li><a href="#" class="toggleMain1">반제결의서(수입)</a></li>
                                        <li><a href="#" class="toggleMain1">여입신청서검토</a></li>
                                        <li><a href="#" class="toggleMain1">여입결의서</a></li>
                                        <li><a href="#" class="toggleMain1">반납신청서검토</a></li>
                                        <li><a href="#" class="toggleMain1">반납결의서</a></li>
                                        <li><a href="#" class="toggleMain1">대체신청서검토</a></li>
                                        <li><a href="#" class="toggleMain1">대체결의서</a></li>
                                        <li><a href="#" class="toggleMain1">더존연계현황</a></li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#" class="toggleMain">구매관리</a>
                                    <ul class="innerMain children h_d">
                                        <li><a href="#" class="toggleMain1">구매요청관리</a></li> <%--menu=h_d--%>
                                        <li><a href="#" class="toggleMain1">자금관리</a></li>
                                    </ul>
                                </li>
                                <li><a href="#" class="toggleMain1">더존연계</a></li> <%--menu=h_b--%>
                                <li><a href="#" class="toggleMain1">e-나라도움</a></li> <%--menu=h_b--%>
                            </ul>
                        </li>
                        <li>
                            <a class="toggleMain" href="#">캠CRM</a>
                            <ul class="innerMain children f">
                                <li>
                                    <a href="#" class="toggleMain">고객관리</a>
                                </li>
                                <li>
                                    <a href="#" class="toggleMain">이력관리</a>
                                </li>
                                <li>
                                    <a href="#" class="toggleMain">통계조회</a>
                                    <ul class="innerMain children f_b">
                                        <li><a href="#" class="toggleMain1">고객현황</a></li> <%--menu=f_b--%>
                                        <li><a href="#" class="toggleMain1">각종현황</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a class="toggleMain" href="#">캠인사이드</a>
                            <ul class="innerMain children c">
                                <h5 class="sidebar-title">인사관리</h5>
                                <li>
                                    <a href="#" class="toggleMain">인사관리</a>
                                    <ul class="innerMain children c_a">
                                        <li><a href="#" onclick="open_in_frame('/Inside/userPersonList.do?menu=c_a')" class="toggleMain1">인사관리</a></li>
                                        <li><a href="#" onclick="open_in_frame('/Inside/userPersonnelRecord.do?menu=c_a')" class="toggleMain1">인사기록카드</a></li>
                                        <%--<li><a href="/Inside/performanceResultList.do?menu=c_a" class="toggleMain1">성과결과조회</a></li>--%>
                                        <li><a href="#" onclick="open_in_frame('/Inside/userInfoMod.do?menu=c_a')" class="toggleMain1">인사정보변경신청</a></li>
                                        <li><a href="#" onclick="open_in_frame('/user/organizationChart.do?menu=c_a')" class="toggleMain1">조직도관리</a></li>
                                        <li>
                                            <a href="#" class="toggleMain1">임용문서관리</a>
                                            <ul class="innerMain children c_a_1">
                                                <li><a href="#" onclick="open_in_frame('/Inside/employmentReq.do?menu=c_a_1')" class="toggleMain2">근로계약서</a></li>
                                                <li><a href="#" onclick="open_in_frame('/Inside/agreementReq.do?menu=c_a_1')" class="toggleMain2">연봉계약서</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                                <%--<li>
                                  <a href="#" class="toggleMain">급여관리</a>
                                  <ul class="innerMain children c_b">
                                    <li><a href="/Inside/payslipList.do?menu=c_b" class="toggleMain1">급여명세서</a></li>
                                  </ul>
                                </li>--%>
                                <li>
                                    <a href="#" class="toggleMain">휴가관리</a>
                                    <ul class="innerMain children c_c">
                                        <li><a href="#" onclick="open_in_frame('/subHoliday/subHolidayList.do?menu=c_c')" class="toggleMain1">휴가관리</a></li>
                                        <li><a href="#" onclick="open_in_frame('/subHoliday/subHolidayAdmin.do?menu=c_c')" class="toggleMain1">휴가신청관리</a></li>
                                        <li><a href="#" onclick="open_in_frame('/subHoliday/subHolidayStat.do?menu=c_c')" class="toggleMain1">휴가사용현황</a></li>
                                        <li><a href="#" onclick="open_in_frame('/subHoliday/subHolidaySetting.do?menu=c_c')" class="toggleMain1">휴가설정</a></li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#" class="toggleMain">증명서관리</a>
                                    <ul class="innerMain children c_d">
                                        <li><a href="#" onclick="open_in_frame('/Inside/certificateReq.do?menu=c_d')" class="toggleMain1">증명서신청</a></li>
                                        <li><a href="#" onclick="open_in_frame('/Inside/certificateAdmin.do?menu=c_d')" class="toggleMain1">증명서관리</a></li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#" class="toggleMain">발령/포상관리</a>
                                    <ul class="innerMain children c_e">
                                        <li><a href="#" onclick="open_in_frame('/Inside/historyReq.do?menu=c_e')" class="toggleMain1">발령관리</a></li>
                                        <li><a href="#" onclick="open_in_frame('/Inside/rewardReq.do?menu=c_e')" class="toggleMain1">포상관리</a></li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#" class="toggleMain">채용관리</a>
                                    <ul class="innerMain children c_f">
                                        <li><a href="#" onclick="open_in_frame('/Inside/recruitList.do?menu=c_f')" class="toggleMain1">채용관리</a></li>
                                        <li><a href="#" onclick="open_in_frame('/Inside/commissionerManage.do?menu=c_f')" class="toggleMain1">평가위원관리</a></li>
                                        <li><a href="#" onclick="open_in_frame('/Inside/externalInterview.do?menu=c_f')" class="toggleMain1">외부의원 면접심사</a></li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#" class="toggleMain">인사평가</a>
                                    <ul class="innerMain children c_g">
                                        <li><a href="#" onclick="open_in_frame('/Inside/evaluationReq.do?menu=c_g')" class="toggleMain1">평가등록</a></li>
                                        <li><a href="#" onclick="open_in_frame('/Inside/evaluationList.do?menu=c_g')" class="toggleMain1">평가관리</a></li>
                                        <li>
                                            <a href="#" class="toggleMain1">평가결과조회</a>
                                            <ul class="innerMain children c_g_1">
                                                <li><a href="#" onclick="open_in_frame('/Inside/evaluationResultList.do?menu=c_g')" class="toggleMain2">6월팀원평가결과</a></li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a href="#" class="toggleMain1">평가통계조회</a>
                                            <ul class="innerMain children c_g_1">
                                                <li><a href="#" onclick="open_in_frame('/Inside/evaluationStatA.do?menu=c_g')" class="toggleMain2">단장평균</a></li>
                                                <li><a href="#" onclick="open_in_frame('/Inside/evaluationStatB.do?menu=c_g')" class="toggleMain2">팀장평균</a></li>
                                                <li><a href="#" onclick="open_in_frame('/Inside/evaluationStatC.do?menu=c_g')" class="toggleMain2">팀원평균</a></li>
                                            </ul>
                                        </li>
                                        <li><a href="#" onclick="open_in_frame('/Inside/employeeInterviewCard.do?menu=c_g')" class="toggleMain1">직원면담카드</a></li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#" class="toggleMain">참여율관리</a>
                                    <ul class="innerMain children c_h">
                                        <li><a href="#" onclick="open_in_frame('/Inside/employeeSalaryManage.do?menu=c_h')" class="toggleMain1">직원급여관리</a></li>
                                        <li><a href="#" onclick="open_in_frame('/Inside/socialRateManage.do?menu=c_h')" class="toggleMain1">사대보험요율관리</a></li>
                                        <li><a href="#" onclick="open_in_frame('/Inside/participationRateList.do?menu=c_h')" class="toggleMain1">참여율신청목록</a></li>
                                        <li><a href="#" onclick="open_in_frame('/Inside/employeeParticipationList.do?menu=c_h')" class="toggleMain1">직원별참여현황</a></li>
                                        <li><a href="#" onclick="open_in_frame('/Inside/businessParticipationList.do?menu=c_h')" class="toggleMain1">사업별참여현황</a></li>
                                        <li><a href="#" onclick="open_in_frame('/Inside/monthlyPayList.do?menu=c_h')" class="toggleMain1">월별급여지급현황</a></li>
                                        <li><a href="#" onclick="open_in_frame('/Inside/laborList.do?menu=c_h')" class="toggleMain1">인건비현황</a></li>
                                    </ul>
                                </li>
                                <h5 class="sidebar-title">자산관리</h5>
                                <li>
                                    <a href="#" class="toggleMain">자산관리</a>
                                    <ul class="innerMain children c_i">
                                        <li><a href="#" onclick="open_in_frame('/Inside/assetList.do?menu=c_i')" class="toggleMain1">자산리스트</a></li>
                                        <li><a href="#" onclick="open_in_frame('/Inside/proposalList.do?menu=c_i')" class="toggleMain1">구매내역</a></li>
                                        <li><a href="#" onclick="open_in_frame('/Inside/classManage.do?menu=c_i')" class="toggleMain1">분류관리</a></li>
                                        <li><a href="#" onclick="open_in_frame('/Inside/pdaPeristalsisList.do?menu=c_i')" class="toggleMain1">PDA연동목록</a></li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#" class="toggleMain">지식재산권관리</a>
                                    <ul class="innerMain children c_j">
                                        <li><a href="#" onclick="open_in_frame('/Inside/rprList.do?menu=c_j')" class="toggleMain1">지식재산권리스트</a></li>
                                        <li><a href="#" onclick="open_in_frame('/Inside/rprReceiptList.do?menu=c_j')" class="toggleMain1">접수내역</a></li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#" class="toggleMain">장비관리</a>
                                    <ul class="innerMain children c_k">
                                        <li><a href="#" onclick="open_in_frame('/Inside/equipmentList.do?menu=c_k')" class="toggleMain1">장비관리</a></li>
                                        <li><a href="#" onclick="open_in_frame('/Inside/equipmentListAdminView.do?menu=c_k')" class="toggleMain1">장비관리 (관리자)</a></li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#" class="toggleMain">도서관리</a>
                                    <ul class="innerMain children c_l">
                                        <li><a href="#" onclick="open_in_frame('/Inside/bookList.do?menu=c_l')" class="toggleMain1">도서리스트</a></li>
                                    </ul>
                                </li>
                                <h5 class="sidebar-title">출장관리</h5>
                                <li>
                                    <a href="#" class="toggleMain">출장관리</a>
                                    <ul class="innerMain children c_l">
                                        <li><a href="#" onclick="open_in_frame('/Inside/inBustripList.do?menu=c_l')" class="toggleMain1">관내출장리스트</a></li>
                                        <li><a href="#" onclick="open_in_frame('/Inside/outBustripList.do?menu=c_l')" class="toggleMain1">관외출장리스트</a></li>
                                        <li><a href="#" onclick="open_in_frame('/Inside/transportationCostInfo.do?menu=c_l')" class="toggleMain1">교통비기준정보</a></li>
                                        <li><a href="#" onclick="open_in_frame('/Inside/dutyBustripExpenses.do?menu=c_l')" class="toggleMain1">직급별출장여비</a></li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#" class="toggleMain">차량/회의실관리</a>
                                    <ul class="innerMain children c_m">
                                        <li><a href="#" onclick="open_in_frame('/Inside/carReq.do?menu=c_m')" class="toggleMain1">차량사용신청</a></li>
                                        <li><a href="#" onclick="open_in_frame('/Inside/meetingRoomReq.do?menu=c_m')" class="toggleMain1">회의실사용신청</a></li>
                                        <li><a href="#" onclick="open_in_frame('/Inside/carManage.do?menu=c_m')" class="toggleMain1">차량관리</a></li>
                                        <li><a href="#" onclick="open_in_frame('/Inside/meetingRoomManage.do?menu=c_m')" class="toggleMain1">회의실관리</a></li>
                                    </ul>
                                </li>
                                <h5 class="sidebar-title">문서관리</h5>
                                <li>
                                    <a href="#" class="toggleMain">문서관리</a>
                                    <ul class="innerMain children c_n">
                                        <li><a href="#" onclick="open_in_frame('/Inside/documentList.do?menu=c_n')" class="toggleMain1">등록대장</a></li>
                                        <li><a href="#" onclick="open_in_frame('/Inside/inComeList.do?menu=c_n')" class="toggleMain1">접수대장</a></li>
                                        <li><a href="#" onclick="open_in_frame('/Inside/docOrderList.do?menu=c_n')" class="toggleMain1">개발사업수주대장</a></li>
                                        <li><a href="#" onclick="open_in_frame('/Inside/docuList.do?menu=c_n')" class="toggleMain1">계약대장</a></li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#" onclick="open_in_frame('/Inside/doclist.do?menu=c_n')" class="toggleMain">문서고</a>
                                </li>
                                <li>
                                    <a href="#" onclick="open_in_frame('/Inside/snackList.do?menu=c_n')" class="toggleMain1">야근/휴일식대대장</a>
                                </li>
                                <h5 class="sidebar-title">근태관리</h5>
                                <li>
                                    <a href="#" class="toggleMain">근태관리</a>
                                    <ul class="innerMain children c_o">
                                        <li><a href="#" onclick="open_in_frame('/Inside/personAttendList.do?menu=c_o')" class="toggleMain1">개인근태현황</a></li>
                                        <li><a href="#" onclick="open_in_frame('/Inside/personAnnvMain.do?menu=c_o')" class="toggleMain1">개인연차현황</a></li>
                                        <li><a href="#" onclick="open_in_frame('/Inside/personReqManage.do?menu=c_o')" class="toggleMain1">근태신청현황</a></li>
                                        <%--<li><a href="/Inside/attendStat.do?menu=c_o" class="toggleMain1">근태집계</a></li>--%>
                                        <li><a href="#" onclick="open_in_frame('/Inside/personAttendStat.do?menu=c_o')" class="toggleMain1">직원근태내역</a></li>
                                        <li><a href="#" onclick="open_in_frame('/Inside/monthAttendStat.do?menu=c_o')" class="toggleMain1">월별근태보고</a></li>
                                        <%--<li><a href="/Inside/workChoiceReq.do?menu=c_o" class="toggleMain1">선택근로</a></li>
                                        <li><a href="/Inside/overWorkReq.do?menu=c_o" class="toggleMain1">연장근로</a></li>--%>
                                        <li><a href="#" onclick="open_in_frame('/Inside/holidayWorkReq.do?menu=c_o')" class="toggleMain1">휴일근로현황</a></li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#" class="toggleMain">유연근무</a>
                                    <ul class="innerMain children c_p">
                                        <li><a href="#" onclick="open_in_frame('/workPlan/workPlanReq.do?menu=c_p')" class="toggleMain1">유연근무신청</a></li>
                                        <li><a href="#" onclick="open_in_frame('/workPlan/workPlanApp.do?menu=c_p')" class="toggleMain1">유연근무승인</a></li>
                                        <li><a href="#" onclick="open_in_frame('/workPlan/workPlanAdminView.do?menu=c_p')" class="toggleMain1">유연근무현황</a></li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#" class="toggleMain">시간외근무</a>
                                    <ul class="innerMain children c_q">
                                        <li><a href="#" onclick="open_in_frame('/overWk/overWkReq.do?menu=c_q')" class="toggleMain1">시간외근무신청</a></li>
                                        <li><a href="#" onclick="open_in_frame('/overWk/overWkApp.do?menu=c_q')" class="toggleMain1">시간외근무승인</a></li>
                                        <li><a href="#" onclick="open_in_frame('/overWk/overWkAdminView.do?menu=c_q')" class="toggleMain1">시간외근무현황</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a class="toggleMain" href="#">캠퍼스</a>
                            <ul class="innerMain children d">
                                <li>
                                    <a href="#" class="toggleMain">학습관리</a>
                                    <ul class="innerMain children d_a">
                                        <li><a href="#" onclick="open_in_frame('/Campus/eduReq.do?menu=d_a')" class="toggleMain1">개인학습신청</a></li> <%--menu=d_a--%>
                                        <li><a href="#" onclick="open_in_frame('/Campus/eduInfo.do?menu=d_a')" class="toggleMain1">개인학습관리</a></li>
                                        <li><a href="#" onclick="open_in_frame('/Campus/studyInfo.do?menu=d_a')" class="toggleMain1">학습조관리</a></li>
                                        <li><a href="#" onclick="open_in_frame('/Campus/propagInfo.do?menu=d_a')" class="toggleMain1">전파학습관리</a></li>
                                        <li><a href="#" onclick="open_in_frame('/Campus/ojtInfo.do?menu=d_a')" class="toggleMain1">OJT관리</a></li>
                                        <li><a href="#" onclick="open_in_frame('/Campus/openStudyInfo.do?menu=d_a')" class="toggleMain1">오픈스터디관리</a></li>
                                        <li><a href="#" onclick="open_in_frame('/Campus/eduManagement.do?menu=d_a')" class="toggleMain1">공통학습관리(캠화지등)</a></li>
                                    </ul>
                                </li>
                                <li><a href="#" onclick="open_in_frame('/Campus/eduStat.do?menu=d_b')" class="toggleMain1">학습통계</a></li> <%--menu=d_b--%>
                                <li>
                                    <a href="#" class="toggleMain1">목표기술서관리</a>
                                    <ul class="innerMain children d_c">
                                        <li><a href="#" onclick="open_in_frame('/Campus/targetInfo.do?menu=d_c')" class="toggleMain1">목표기술서작성</a></li>
                                        <li><a href="#" onclick="open_in_frame('/Campus/systemManagement.do?menu=d_c')" class="toggleMain1">학습체계도관리</a></li>
                                    </ul>
                                </li>
                                <li><a href="#" onclick="open_in_frame('/Campus/dutyInfo.do?menu=d_d')" class="toggleMain1">직무기술서작성</a></li>
                            </ul>
                        </li>
                        <li>
                            <a class="toggleMain" href="#">캠어취브</a>
                            <ul class="innerMain children i_a">
                                <li><a href="#" class="toggleMain1">법인추진실적집계</a></li> <%--menu=i_a--%>
                            </ul>
                        </li>
                        <li>
                            <a class="toggleMain" href="#">캠도큐먼트</a>
                            <ul class="innerMain children j">
                                <li>
                                    <a href="#" class="toggleMain">상신/보관함</a>
                                    <ul class="innerMain children j_a">
                                        <li><a href="#" class="toggleMain1">양식목록</a></li> <%--menu=j_a--%>
                                        <li><a href="#" class="toggleMain1">구매요청등</a></li>
                                        <li><a href="#" class="toggleMain1">임시보관문서</a></li>
                                        <li><a href="#" class="toggleMain1">상신문서</a></li>
                                        <li><a href="#" class="toggleMain1">반려/회수함</a></li>
                                        <li><a href="#" class="toggleMain1">열람문서</a></li>
                                    </ul>
                                </li>
                                <li><a href="#" class="toggleMain1">결재함</a></li> <%--menu=j_b--%>
                                <li>
                                    <a href="#" class="toggleMain">문서함</a>
                                    <ul class="innerMain children j_c">
                                        <li><a href="#" class="toggleMain1">기록물철</a></li> <%--menu=j_c--%>
                                        <li><a href="#" class="toggleMain1">외부문서접수함</a></li>
                                        <li><a href="#" class="toggleMain1">협약(MOU)보관함</a></li>
                                    </ul>
                                </li>
                                <li><a href="#" class="toggleMain1">결재설정관리</a></li> <%--menu=j_d--%>
                            </ul>
                        </li>
                        <li>
                            <a class="toggleMain" href="#">시스템관리</a>
                            <ul class="innerMain children j">
                                <li>
                                    <a href="#" class="toggleMain">메뉴관리</a>
                                    <ul class="innerMain children j_a">
                                        <li><a href="#" class="toggleMain1">메뉴정보관리</a></li> <%--menu=j_a--%>
                                        <li><a href="#" class="toggleMain1">메뉴권한관리</a></li>
                                        <li><a href="#" class="toggleMain1">메뉴권한부여</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>

                    </ul>
                </div><!-- tab-pane -->

                <!-- ######################## EMAIL MENU ##################### -->



            </div><!-- tab-content -->
        </div>
    </div>