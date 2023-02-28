<%--
  Created by IntelliJ IDEA.
  User: jsy
  Date: 2023-02-28
  Time: 오전 10:27
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<div class="tab-content">

  <!-- ################# MAIN MENU ################### -->

  <div class="" id="mainmenu">
    <h5 class="sidebar-title">업무</h5>
    <ul class="accordion nav nav-pills nav-stacked nav-quirk">
      <li>
        <a class="toggleMain" href="#">전자결재</a>
        <ul class="innerMain children">
          <li>
            <a href="#" class="toggleMain">상신/보관함</a>
            <ul class="innerMain children">
              <li><a href="#" class="toggleMain">양식목록</a></li>
              <li><a href="#" class="toggleMain">임시보관문서</a></li>
              <li><a href="#" class="toggleMain">상신문서</a></li>
              <li><a href="#" class="toggleMain">반려/회수 문서</a></li>
              <li><a href="#" class="toggleMain">열람문서</a></li>
            </ul>
          </li>
          <li>
            <a href="#" class="toggleMain">결재함</a>
            <ul class="innerMain children">
              <li><a href="#" class="toggleMain">결재대기문서</a></li>
              <li><a href="#" class="toggleMain">결재예정문서</a></li>
              <li><a href="#" class="toggleMain">결재완료문서</a></li>
              <li><a href="#" class="toggleMain">결재반려문서</a></li>
            </ul>
          </li>
          <li>
            <a href="#" class="toggleMain">결재설정</a>
            <ul class="innerMain children">
              <li><a href="#" class="toggleMain">결재선 관리</a></li>
              <li><a href="#" class="toggleMain">부재설정</a></li>
            </ul>
          </li>
        </ul>
      </li>
      <li>
        <a class="toggleMain" href="#">캠스팟2.0</a>
        <ul class="innerMain children">
          <li>
            <a href="#" class="toggleMain">게시판</a>
            <ul class="innerMain children">
              <li><a href="#" class="toggleMain">공지사항</a></li>
              <li><a href="#" class="toggleMain">업무보고</a></li>
            </ul>
          </li>
          <li><a href="#" class="toggleMain">제안제도</a></li>
          <li><a href="#" class="toggleMain">직원일정</a></li>
          <li><a href="#" class="toggleMain">설문조사</a></li>
          <li>
            <a href="#" class="toggleMain">내정보관리</a>
            <ul class="innerMain children">
              <li><a href="#" class="toggleMain">기본정보관리</a></li>
              <li><a href="#" class="toggleMain">학력</a></li>
              <li><a href="#" class="toggleMain">경력</a></li>
              <li><a href="#" class="toggleMain">자격/면허</a></li>
              <li><a href="#" class="toggleMain">어학</a></li>
              <li><a href="#" class="toggleMain">인사기록카드</a></li>
            </ul>
          </li>
        </ul>
      </li>
      <li>
        <a class="toggleMain" href="#">캠인사이드2.0</a>
        <ul class="innerMain children">
          <li>
            <a href="#" class="toggleMain">근태관리</a>
            <ul class="innerMain children">
              <li><a href="#" class="toggleMain">개인근태현황</a></li>
              <li><a href="#" class="toggleMain">개인연차현황</a></li>
              <li><a href="#" class="toggleMain">개인신청현황</a></li>
              <li><a href="#" class="toggleMain">근태집계</a></li>
            </ul>
          </li>
          <li>
            <a href="#" class="toggleMain">증명서</a>
            <ul class="innerMain children">
              <li><a href="#" class="toggleMain">증명서신청</a></li>
              <li><a href="#" class="toggleMain">증명서발급</a></li>
            </ul>
          </li>
          <li>
            <a href="#" class="toggleMain">인사관리</a>
            <ul class="innerMain children">
              <li><a href="#" class="toggleMain">인사정보변경신청</a></li>
              <li><a href="#" class="toggleMain">인사기록카드</a></li>
              <li><a href="#" class="toggleMain">성과결과조회</a></li>
            </ul>
          </li>
          <li>
            <a href="#" class="toggleMain">급여</a>
            <ul class="innerMain children">
              <li><a href="#" class="toggleMain">급여명세서</a></li>
            </ul>
          </li>
          <li>
            <a href="#" class="toggleMain">시간외근무</a>
            <ul class="innerMain children">
              <li><a href="#" class="toggleMain">신간외근무신청</a></li>
              <li><a href="#" class="toggleMain">시간외근무현황</a></li>
              <li><a href="#" class="toggleMain">시간외근무신청</a></li>
            </ul>
          </li>
          <li>
            <a href="#" class="toggleMain">유연근무</a>
            <ul class="innerMain children">
              <li><a href="#" class="toggleMain">유연근무신청</a></li>
              <li><a href="#" class="toggleMain">유연근무현황</a></li>
            </ul>
          </li>
          <li>
            <a href="#" class="toggleMain">출장관리</a>
            <ul class="innerMain children">
              <li><a href="#" class="toggleMain">출장신청</a></li>
              <li><a href="#" class="toggleMain">출장결과보고</a></li>
              <li><a href="#" class="toggleMain">관내출장리스트</a></li>
              <li><a href="#" class="toggleMain">관외출장리스트</a></li>
              <li><a href="#" class="toggleMain">교통비기준정보</a></li>
              <li><a href="#" class="toggleMain">직급별출장여비</a></li>

            </ul>
          </li>
          <li>
            <a href="#" class="toggleMain">휴가관리</a>
            <ul class="innerMain children">
              <li><a href="#" class="toggleMain">휴가신청</a></li>
              <li><a href="#" class="toggleMain">휴가현황</a></li>
            </ul>
          </li>
        </ul>
      </li>
      <li>
        <a class="toggleMain" href="#">캠퍼스2.0</a>
        <ul class="innerMain children">
          <li>
            <a href="#" class="toggleMain">학습관리</a>
            <ul class="innerMain children">
              <li><a href="#" class="toggleMain">개인학습신청</a></li>
              <li><a href="#" class="toggleMain">개인학습관리</a></li>
              <li><a href="#" class="toggleMain">학습조관리</a></li>
              <li><a href="#" class="toggleMain">전파학습관리</a></li>
              <li><a href="#" class="toggleMain">O/T관리</a></li>
              <li><a href="#" class="toggleMain">오픈스터디관리</a></li>
              <li><a href="#" class="toggleMain">공통학습관리(캠화지등)</a></li>
            </ul>
          </li>
          <li><a href="#" class="toggleMain">학습통계</a></li>
          <li><a href="#" class="toggleMain">목표기술서관리</a></li>
          <li><a href="#" class="toggleMain">직무기술서관리</a></li>
        </ul>
      </li>
      <li>
        <a class="toggleMain" href="#">캠프로젝트매니저</a>
        <ul class="innerMain children">
          <li>
            <a href="#" class="toggleMain">캠알앤디</a>
            <ul class="innerMain children">
              <li onclick=""><a class="toggleMain">휴가신청</a></li>
              <li onclick="location.href='/user/organizationChart.do'"><a class="toggleMain">조직도</a></li>
            </ul>
          </li>
          <li>
            <a href="#" class="toggleMain">엔지니어링</a>
            <ul class="innerMain children">
              <li onclick=""><a class="toggleMain">프로젝트등록및목록</a></li>
              <li onclick="location.href='/engineering/estimate.do'"><a class="toggleMain">개발상담서</a></li>
              <li onclick=""><a class="toggleMain">수주보고</a></li>
              <li onclick=""><a class="toggleMain">개발계획서등록(협업)</a></li>
            </ul>
          </li>
        </ul>
      </li>
      <li>
        <a class="toggleMain" href="#">캠CRM2.0</a>
        <ul class="innerMain children">
          <li>
            <a href="#" class="toggleMain">메인화면(통합검색)</a>
            <ul class="innerMain children">
              <li>
                <a href="#" class="toggleMain">고객관리</a>
                <ul class="innerMain children">
                  <li><a href="#" class="toggleMain">신규고객등록</a></li>
                  <li><a href="#" class="toggleMain">고객정보조회</a></li>
                  <li><a href="#" class="toggleMain">관계이력관리</a></li>
                  <li><a href="#" class="toggleMain">고객등급관리</a></li>
                  <li><a href="#" class="toggleMain">가족기업관리</a></li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            <a href="#" class="toggleMain">고객통계</a>
            <ul class="innerMain children">
              <li><a href="#" class="toggleMain">고객현황</a></li>
              <li><a href="#" class="toggleMain">각종현황</a></li>
            </ul>
          </li>
        </ul>
      </li>
      <li>
        <a class="toggleMain" href="#">캠아이템</a>
        <ul class="innerMain children">
          <li>
            <a href="#" class="toggleMain">기준정보</a>
            <ul class="innerMain children">
              <li><a href="#" class="toggleMain">고객단가관리</a></li>
              <li><a href="#" class="toggleMain">표준단가관리</a></li>
              <li><a href="#" class="toggleMain">품목정보</a></li>
            </ul>
          </li>
          <li>
            <a href="#" class="toggleMain">수주관리</a>
            <ul class="innerMain children">
              <li><a href="#" class="toggleMain">수주등록</a></li>
              <li><a href="#" class="toggleMain">수주현황</a></li>
            </ul>
          </li>
          <li>
            <a href="#" class="toggleMain">출하관리</a>
            <ul class="innerMain children">
              <li><a href="#" class="toggleMain">출하실적등록</a></li>
              <li><a href="#" class="toggleMain">출하실적현황</a></li>
              <li><a href="#" class="toggleMain">출하실적추이분석</a></li>
              <li><a href="#" class="toggleMain">반품등록</a></li>
              <li><a href="#" class="toggleMain">택배수발송등록</a></li>
            </ul>
          </li>
          <li>
            <a href="#" class="toggleMain">BOM</a>
            <ul class="innerMain children">
              <li><a href="#" class="toggleMain">BOM등록</a></li>
              <li><a href="#" class="toggleMain">BOM조회</a></li>
            </ul>
          </li>
          <li>
            <a href="#" class="toggleMain">구매관리</a>
            <ul class="innerMain children">
              <li><a href="#" class="toggleMain">자재단가관리</a></li>
              <li><a href="#" class="toggleMain">입고등록</a></li>
              <li><a href="#" class="toggleMain">검수등록</a></li>
              <li><a href="#" class="toggleMain">입고현황</a></li>
            </ul>
          </li>
          <li>
            <a href="#" class="toggleMain">재고관리</a>
            <ul class="innerMain children">
              <li><a href="#" class="toggleMain">재고현황</a></li>
              <li><a href="#" class="toggleMain">창고별재고현황</a></li>
              <li><a href="#" class="toggleMain">재고이동등록</a></li>
              <li><a href="#" class="toggleMain">재고이동현황</a></li>
              <li><a href="#" class="toggleMain">안전재고마스터</a></li>
              <li><a href="#" class="toggleMain">안전재고현황</a></li>
              <li><a href="#" class="toggleMain">재고현황보고</a></li>
            </ul>
          </li>
          <li>
            <a href="#" class="toggleMain">마감관리</a>
            <ul class="innerMain children">
              <li><a href="#" class="toggleMain">매출확정</a></li>
            </ul>
          </li>
          <li>
            <a href="#" class="toggleMain">시스템</a>
            <ul class="innerMain children">
              <li><a href="#" class="toggleMain">고객관리</a></li>
              <li><a href="#" class="toggleMain">창고등록</a></li>
              <li><a href="#" class="toggleMain">기초코드등록</a></li>
              <li><a href="#" class="toggleMain">품목마스터</a></li>
            </ul>
          </li>
        </ul>
      </li>
      <li>
        <a class="toggleMain" href="#">캠매니저2.0</a>
        <ul class="innerMain children">
          <li>
            <a href="#" class="toggleMain">예산관리</a>
            <ul class="innerMain children">
              <li><a href="#" class="toggleMain">예산현황</a></li>
              <li><a href="#" class="toggleMain">예산통계</a></li>
            </ul>
          </li>
          <li><a href="#" class="toggleMain">지출문서관리</a></li>
          <li>
            <a href="#" class="toggleMain">결의서관리</a>
            <ul class="innerMain children">
              <li><a href="#" class="toggleMain">지급신청서검토</a></li>
              <li><a href="#" class="toggleMain">지출결의서</a></li>
              <li><a href="#" class="toggleMain">반제결의서(지출)</a></li>
              <li><a href="#" class="toggleMain">교육비입금관리</a></li>
              <li><a href="#" class="toggleMain">수입결의서</a></li>
              <li><a href="#" class="toggleMain">반제결의서(수입)</a></li>
              <li><a href="#" class="toggleMain">여입신청서검토</a></li>
              <li><a href="#" class="toggleMain">여입결의서</a></li>
              <li><a href="#" class="toggleMain">반납신청서검토</a></li>
              <li><a href="#" class="toggleMain">반납결의서</a></li>
              <li><a href="#" class="toggleMain">대체신청서검토</a></li>
              <li><a href="#" class="toggleMain">대체결의서</a></li>
              <li><a href="#" class="toggleMain">더존연계현황</a></li>
            </ul>
          </li>
          <li>
            <a href="#" class="toggleMain">구매관리</a>
            <ul class="innerMain children">
              <li><a href="#" class="toggleMain">구매요청관리</a></li>
              <li><a href="#" class="toggleMain">지금관리</a></li>
            </ul>
          </li>
        </ul>
      </li>
      <li>
        <a class="toggleMain" href="#">캠어취브</a>
        <ul class="innerMain children">
          <li><a href="#" class="toggleMain">법인추진실적집계</a></li>
        </ul>
      </li>
      <li>
        <a class="toggleMain" href="#">캠도큐먼트</a>
        <ul class="innerMain children">
          <li>
            <a href="#" class="toggleMain">상신/보관함</a>
            <ul class="innerMain children">
              <li><a href="#" class="toggleMain">양식목록</a></li>
              <li><a href="#" class="toggleMain">구매요청등</a></li>
              <li><a href="#" class="toggleMain">임시보관문서</a></li>
              <li><a href="#" class="toggleMain">상신문서</a></li>
              <li><a href="#" class="toggleMain">반려/회수함</a></li>
              <li><a href="#" class="toggleMain">열람문서</a></li>

            </ul>
          </li>
          <li><a href="#" class="toggleMain">결재함</a></li>
          <li>
            <a href="#" class="toggleMain">문서함</a>
            <ul class="innerMain children">
              <li><a href="#" class="toggleMain">기록물철</a></li>
              <li><a href="#" class="toggleMain">외부문서접수함</a></li>
              <li><a href="#" class="toggleMain">협약(MOU)보관함</a></li>
            </ul>
          </li>
          <li><a href="#" class="toggleMain">결재설정관리</a></li>
        </ul>
      </li>
    </ul>
  </div><!-- tab-pane -->

  <!-- ######################## EMAIL MENU ##################### -->



</div><!-- tab-content -->