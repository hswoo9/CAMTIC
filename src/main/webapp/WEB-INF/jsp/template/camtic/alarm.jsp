<%--
  Created by IntelliJ IDEA.
  User: jsy
  Date: 2023-03-06
  Time: 오전 10:54
  캠틱홈페이지 템플릿
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>

<a href="javascript:popUpClick();" id="alarm">주요 알림 맞춤서비스</a>

<div id="Service">
  <h2>주요알림 모아보기 서비스</h2>
  <div class="svgroup_l">
    <div class="svg_logo">
      <span class="hidden">한바탕전주 상단 로고</span>
    </div>
    <div class="svg_slogan">
      <h3><span class="hidden">사람의 도시 품격의 전주</span></h3>
      <dl>
        <dt>전주시 정보를 쉽고 빠르게!</dt>
        <dd>홈페이지 방문자의 이용 편의를 위해<br>
          맞춤형 서비스를 제공합니다.</dd>
      </dl>
    </div>
    <div class="svg_menu">
      <ul>
        <li><a href="" class="menu_on"><span>주요 알림 모아보기</span></a></li>
        <li><a href=""><span>민원 도우미</span></a></li>
      </ul>
    </div>
    <div class="svg_intro">
      <h3 class="hidden">디자인 구성요소</h3>
      <p class="hidden">
        전주의 아름다운 풍경을 담은 완산꽃동산, 아중호수, 오송제, 기린봉, 전주천 벚꽃길(봄), 덕진공원 연꽃(여름), 전주향교(가을), 전주한옥마을(겨울)의 모습과 <br>
        전주를 대표하는 문화재인 한지발장(전라북도 무형문화재 제31호), 소목장(국가무형문화재 제55호), 선자장(국가무형문화재 제128호)의 모습을 담은 <br>
        전주시 대표 홍보동영상이 재생되고 있습니다.
      </p>
      <video autoplay="" preload="auto" playsinline="" muted="" loop="">
        <source src="../images/pv_intro.mp4" type="video/mp4">
      </video>
    </div>
  </div>
  <div class="svgroup_r">
    <div class="svg_contents">
      <div class="service1" style="">
        <h3 class="subject"><span>주요 알림 서비스</span>를 한눈에 !</h3>
        <p class="txtst">
          전주시 주요 알림을 한눈에 볼 수 있는 모아보기 서비스
        </p>
        <div class="notification">
          <div class="popupzone1">
            <h4 class="poptit1 on"><a href="" onclick="popUpView(this); return false;">팝업존 <span>모아보기</span></a></h4>
            <div class="popCon1" style="">
              <div class="readMore">
                <ul>
                  <li>
                    <a href="https://www.전주구독.kr" target="_blank" title="전주맛배달 구독서비스 정기결제 소상공인 모집로 이동(새창)">
                      <div class="pop_thumb">
                        <img src="https://jeonju.go.kr/planweb/upload/402880863251923e01325193a7480005/popup/original/ffdbc82c-5d0a-47ed-9f50-d4fad5616cad.jpg" alt="우리가게 단골손님 만들기! 전주맛배달과 함께할 소상공인들 여기모여! 구독서비스 정기결제 소상공인 모집 전주맛배달에서 7월~8월 중에 런칭되는 고독서비스(정기결제)와 함께할 소상공인분들을 모집합니다">
                      </div>
                      <dl>
                        <dt>전주맛배달 구독서비스 정기결제 소상공인 모집</dt>
                        <dd>2023-06-02</dd>
                      </dl>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.jeonju.go.kr/planweb/board/view.9is?dataUid=9be517a7874b81cd01892e13ad55019b&amp;boardUid=9be517a74f8dee91014f90e8502d0602&amp;contentUid=9be517a769953e5f0169c1dfd63e01a7" target="_blank" title="한바탕 전주 여름철 물놀이장로 이동(새창)">
                      <div class="pop_thumb">
                        <img src="https://jeonju.go.kr/planweb/upload/402880863251923e01325193a7480005/popup/original/a32f9402-17e3-44e1-86f4-3de21535c36a.jpg" alt="한바탕 전주 여름철 물놀이장 2023.7.21.(금) ~ 8.15.(화) 전주월드컵경기장 광장, 전주대학교 창조관">
                      </div>
                      <dl>
                        <dt>한바탕 전주 여름철 물놀이장</dt>
                        <dd>2023-07-07</dd>
                      </dl>
                    </a>
                  </li>
                  <li>
                    <a href="http://59.1.209.112/~jjbook2023/web/page.php?pcode=48" target="_blank" title="2023 전주독서대전 시민공모전로 이동(새창)">
                      <div class="pop_thumb">
                        <img src="https://jeonju.go.kr/planweb/upload/402880863251923e01325193a7480005/popup/original/e00bb9f8-472e-4a5b-9f8f-b50e6bd892e4.jpg" alt="2023 전주독서대전 시민공모전">
                      </div>
                      <dl>
                        <dt>2023 전주독서대전 시민공모전</dt>
                        <dd>2023-06-16</dd>
                      </dl>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.xn--2z1bw8k1pjz5ccumkb.kr/" target="_blank" title="디지털배움터로 이동(새창)">
                      <div class="pop_thumb">
                        <img src="https://jeonju.go.kr/planweb/upload/402880863251923e01325193a7480005/popup/original/696b4e09-4a4c-4037-a35d-396ab6818766.jpg" alt="디지털배움터 www.디지털배움터.kr을 검색해 주세요 ">
                      </div>
                      <dl>
                        <dt>디지털배움터</dt>
                        <dd>2023-05-15</dd>
                      </dl>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.moleg.go.kr/menu.es?mid=a10111060000" target="_blank" title="만 나이 통일법 시행로 이동(새창)">
                      <div class="pop_thumb">
                        <img src="https://jeonju.go.kr/planweb/upload/402880863251923e01325193a7480005/popup/original/ef17dc09-cb9c-4224-9b71-6ae6479b3b01.jpg" alt="[2023.6.28] 만 나이 통일법 시행 우리 일상에서 나이로 인한 혼란이 사라집니다! 행정기본법, 민법에 만 나이 계산 및 표시 원칙이 명시됨에 따라, 앞으로 계약서, 법령, 조례 등에서 사용되는 나이는 특별한 규정이 없으면 만 나이로 본다는 점이 명확해집니다.">
                      </div>
                      <dl>
                        <dt>만 나이 통일법 시행</dt>
                        <dd>2023-05-15</dd>
                      </dl>
                    </a>
                  </li>
                  <li>
                    <a href="https://ticket.11st.co.kr/Product/Detail?id=267947&amp;prdNo=5993431098" target="_blank" title="경기전 별빛누빔로 이동(새창)">
                      <div class="pop_thumb">
                        <img src="https://jeonju.go.kr/planweb/upload/402880863251923e01325193a7480005/popup/original/f9946bbc-e064-4d63-ba22-b061e9336f50.jpg" alt="경기전 별빛누빔 기간: 2023년 7월 7일~ 10월 6일 시간: 20시30분~22시30분 관람료: 1인당 5,000원 예약: 티켓11번가, 현장예매 문의사항: (063)255-5853">
                      </div>
                      <dl>
                        <dt>경기전 별빛누빔</dt>
                        <dd>2023-07-04</dd>
                      </dl>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.jeonju.go.kr/planweb/board/view.9is?dataUid=9be517a8874b82ad0188949a2d064f17&amp;boardUid=9be517a74f8dee91014f90e8502d0602&amp;contentUid=9be517a769953e5f0169c1dfd63e01a7" target="_blank" title="전주여행 콘텐츠발굴 시민여행전문가 모집로 이동(새창)">
                      <div class="pop_thumb">
                        <img src="https://jeonju.go.kr/planweb/upload/402880863251923e01325193a7480005/popup/original/9693c240-ddcd-416a-8a6c-5c3a7233ee93.jpg" alt="전주여행 콘텐츠발굴 시민여행전문가 모집">
                      </div>
                      <dl>
                        <dt>전주여행 콘텐츠발굴 시민여행전문가 모집</dt>
                        <dd>2023-06-08</dd>
                      </dl>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.jeonju.go.kr/planweb/board/view.9is?dataUid=9be517a785c9c15a01871124916017d3&amp;boardUid=9be517a74f8dee91014f90e8502d0602&amp;contentUid=9be517a769953e5f0169c1dfd63e01a7" target="_blank" title="취약계층 어르신 대상포진 무료 예방접종로 이동(새창)">
                      <div class="pop_thumb">
                        <img src="https://jeonju.go.kr/planweb/upload/402880863251923e01325193a7480005/popup/original/2b3d167b-c1d4-422c-bdd0-4ad0b3454d2c.jpg" alt="취약계층 어르신 대상포진 무료 예방접종 사업대상: 65세 이상 기초 생활 수급자(1958.12.31.이전 출생자) 전주시에 1년이상 주민등록을 두고 거주하는 자 과거 대상포진 감염력이 있는 경우, 회복 후 6~12개월 이후 접종">
                      </div>
                      <dl>
                        <dt>취약계층 어르신 대상포진 무료 예방접종</dt>
                        <dd>2023-03-24</dd>
                      </dl>
                    </a>
                  </li>
                  <li>
                    <a href="https://lib.jeonju.go.kr/index.jeonju?menuCd=DOM_000000104006001000" target="_blank" title="2023년 전주 도서관여행로 이동(새창)">
                      <div class="pop_thumb">
                        <img src="https://jeonju.go.kr/planweb/upload/402880863251923e01325193a7480005/popup/original/af3a97f3-9ae9-4821-8358-077c1014124c.jpg" alt="2023년 전주 도서관여행">
                      </div>
                      <dl>
                        <dt>2023년 전주 도서관여행</dt>
                        <dd>2023-02-10</dd>
                      </dl>
                    </a>
                  </li>
                  <li>
                    <a href="https://health.jeonju.go.kr/board/view.jeonju?boardId=BOARD_NOTICE&amp;menuCd=DOM_000000106001000000&amp;dataSid=54189" target="_blank" title="2023.6.1.~ 격리 변경에 따른 주요사항 안내로 이동(새창)">
                      <div class="pop_thumb">
                        <img src="https://jeonju.go.kr/planweb/upload/402880863251923e01325193a7480005/popup/original/64ffe0bb-9dd4-4dbd-8bc3-e37b10309323.jpg" alt="2023.6.1.~ 격리 변경에 따른 주요사항 안내 7일 의무 → 5일 권고">
                      </div>
                      <dl>
                        <dt>2023.6.1.~ 격리 변경에 따른 주요사항 안내</dt>
                        <dd>2023-06-01</dd>
                      </dl>
                    </a>
                  </li>
                  <li>
                    <a href="https://blog.naver.com/jeonju_city/223072477137" target="_blank" title="전주고향사랑 기부제로 이동(새창)">
                      <div class="pop_thumb">
                        <img src="https://jeonju.go.kr/planweb/upload/402880863251923e01325193a7480005/popup/original/9fadeb41-ed93-432f-8728-ba2969f35914.jpg" alt="전주고향사랑 기부제 고향사랑기부제가 2023.1.1.시행됩니다. 전주시를 사랑하는 마음, 기부금으로 전하세요! 기부금은 전주시민의 복리증진, 지역경제활성화 등에 소중하게 사용됩니다">
                      </div>
                      <dl>
                        <dt>전주고향사랑 기부제</dt>
                        <dd>2022-10-24</dd>
                      </dl>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <!-- *popCon1* -->
          </div>
          <!-- *popupzone1* -->
          <div class="popupzone2">
            <h4 class="poptit2"><a href="" onclick="popUpView(this); return false;">알림판 <span>모아보기</span></a></h4>
            <div class="popCon2" style="display:none;">
              <div class="readMore">
                <ul>
                  <li>
                    <a href="https://www.jeonju.go.kr/planweb/board/view.9is?dataUid=9be517a8874b82ad01898b9561fb3fed&amp;boardUid=9be517a74f8dee91014f90e8502d0602&amp;contentUid=9be517a769953e5f0169c1dfd63e01a7" target="_blank" title="청년 전세보증금반환보증 보증료 지원로 이동(새창)">
                      <div class="pop_thumb">
                        <img src="https://jeonju.go.kr/planweb/upload/402880863251923e01325193a7480005/popup/original/9d347497-d94d-41f2-94e3-5728c44fe97a.jpg" alt="청년 전세보증금반환보증 보증료 지원 7월 26일부터 신청가능!">
                      </div>
                      <dl>
                        <dt>청년 전세보증금반환보증 보증료 지원</dt>
                        <dd>2023-07-27</dd>
                      </dl>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.jeonju.go.kr/planweb/board/view.9is?dataUid=9be517a8874b82ad01898adf480827ea&amp;boardUid=9be517a74f8dee91014f90e8502d0602&amp;contentUid=9be517a769953e5f0169c1dfd63e01a7" target="_blank" title="2023 전주시 사회적경제 청년 서포터즈 모집로 이동(새창)">
                      <div class="pop_thumb">
                        <img src="https://jeonju.go.kr/planweb/upload/402880863251923e01325193a7480005/popup/original/1520bda3-9245-4c67-a6e9-fd21affb8893.jpg" alt="2023 전주시 사회적경제 청년 서포터즈 모집 2023.8.1.(화) ~ 8.18.(금) (18일간) 선발방법 : 서류전형(지원신청서) ※ 필요 시 면접 및 심사">
                      </div>
                      <dl>
                        <dt>2023 전주시 사회적경제 청년 서포터즈 모집</dt>
                        <dd>2023-07-26</dd>
                      </dl>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.mois.go.kr/frt/bbs/type002/commonSelectBoardArticle.do?bbsId=BBSMSTR_000000000205&amp;nttId=101869" target="_blank" title="2023 주민등록 사실조사 안내로 이동(새창)">
                      <div class="pop_thumb">
                        <img src="https://jeonju.go.kr/planweb/upload/402880863251923e01325193a7480005/popup/original/f1b0b71b-a35e-4521-86b4-7157f21ed536.jpg" alt="2023 주민등록 사실조사 안내 적극적인 사실조사 참여, 정확한 주민등록의 바탕입니다. 2023.7.17.~11.10.까지 ※ 본 사실조사는 출생미등록 아동 확인과 같이 진행됩니다. (신고기간: 2023.7.17.~10.31.)">
                      </div>
                      <dl>
                        <dt>2023 주민등록 사실조사 안내</dt>
                        <dd>2023-07-25</dd>
                      </dl>
                    </a>
                  </li>
                  <li>
                    <a href="" target="_blank" title="같이가개 운영시간 변경 안내로 이동(새창)">
                      <div class="pop_thumb">
                        <img src="https://jeonju.go.kr/planweb/upload/402880863251923e01325193a7480005/popup/original/a4ef09a5-940e-418f-8cd1-bfdb343ce251.jpg" alt="전주시 반려동물놀이터 같이가개 운영시간 변경 안내 3월~11월(화~금) 10:00~20:00 / 주말,공휴일 10:00~18:00 12월~2월(화~금) 10:00~18:00 / 주말,공휴일 10:00~18:00 매주 월요일 휴무 063)213-1799">
                      </div>
                      <dl>
                        <dt>같이가개 운영시간 변경 안내</dt>
                        <dd>2023-07-24</dd>
                      </dl>
                    </a>
                  </li>
                  <li>
                    <a href="https://e.jeonju.go.kr/home/SubPage.html?CID=bbs/board.php&amp;bo_id=cmu07&amp;wr_id=1909" target="_blank" title="평생홈런 전주Learn로 이동(새창)">
                      <div class="pop_thumb">
                        <img src="https://jeonju.go.kr/planweb/upload/402880863251923e01325193a7480005/popup/original/463a6c97-8335-4b4b-be9a-b35100f510b3.jpg" alt="17회 전주평생학습한마당 평생홈런 전주Learn 2023.9.2.토~3.일 전주종합경기장 일원">
                      </div>
                      <dl>
                        <dt>평생홈런 전주Learn</dt>
                        <dd>2023-07-21</dd>
                      </dl>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.acrc.go.kr/" target="_blank" title="정부지원금 부정수급 집중신고기간로 이동(새창)">
                      <div class="pop_thumb">
                        <img src="https://jeonju.go.kr/planweb/upload/402880863251923e01325193a7480005/popup/original/8303d1aa-1788-494c-af9c-fa53d8ae2bfd.jpg" alt="2023.7.11~10.10. 정부지원금 부정수급 집중신고기간 신고방법: 권익위 홈페이지, 방문접수, 우편 상담안내: 국번없이 110번, 1398번">
                      </div>
                      <dl>
                        <dt>정부지원금 부정수급 집중신고기간</dt>
                        <dd>2023-07-19</dd>
                      </dl>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.ticketlink.co.kr/product/43548" target="_blank" title="2023 새만금 제25회 세계스카우트잼버리 일일방문객 프로그램로 이동(새창)">
                      <div class="pop_thumb">
                        <img src="https://jeonju.go.kr/planweb/upload/402880863251923e01325193a7480005/popup/original/5b6c0176-2423-4908-96b3-891145f2a2b5.jpg" alt="여러분을 세계스카우트잼버리 일일방문객으로 초대합니다!!">
                      </div>
                      <dl>
                        <dt>2023 새만금 제25회 세계스카우트잼버리 일일방문객 프로그램</dt>
                        <dd>2023-07-10</dd>
                      </dl>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.2023wsjkorea.org/" target="_blank" title="2023 새만금 제25회 세계스카우트잼버리 일일방문객 프로그램로 이동(새창)">
                      <div class="pop_thumb">
                        <img src="https://jeonju.go.kr/planweb/upload/402880863251923e01325193a7480005/popup/original/b06e9f19-f6a7-4593-a6f1-5cc979696e01.jpg" alt="2023 새만금 제25회 세계스카우트잼버리 일일방문객 프로그램 2023.8.3.(목)~5.(토), 8.7.(월)~10.(목) 전라북도민: 무료입장(1일 6,000여명, 온라인 예매 권장), 신분증 지참">
                      </div>
                      <dl>
                        <dt>2023 새만금 제25회 세계스카우트잼버리 일일방문객 프로그램</dt>
                        <dd>2023-06-28</dd>
                      </dl>
                    </a>
                  </li>
                  <li>
                    <a href="https://lib.jeonju.go.kr/index.jeonju?menuCd=DOM_000000104007000000" target="_blank" title="전주 완주 라키비움 도서관 문화여행로 이동(새창)">
                      <div class="pop_thumb">
                        <img src="https://jeonju.go.kr/planweb/upload/402880863251923e01325193a7480005/popup/original/7026d5af-0458-4b02-9d86-1e4780ec2dd4.jpg" alt="전주 완주 라키비움 도서관 문화여행 생태문화 전통문화 운영기간: 2023년 7월~10월 매월 넷째 주 일요일 10시~17시 참여대상: 전 국민(초등학생 이상)/15명 장소: 전주시 특화도서관 및 완주군 생태 및 문화공간 운영방법: 월별 사전예약(누리집), 도서관여행 전용버스 이용 예약일자: 매월 1일(주말 및 공휴일인 경우, 다음날 신청)">
                      </div>
                      <dl>
                        <dt>전주 완주 라키비움 도서관 문화여행</dt>
                        <dd>2023-06-21</dd>
                      </dl>
                    </a>
                  </li>
                  <li>
                    <a href="https://ticket.11st.co.kr/Product/Detail?id=267807&amp;prdNo=5894241864" target="_blank" title="왕과의 산책로 이동(새창)">
                      <div class="pop_thumb">
                        <img src="https://jeonju.go.kr/planweb/upload/402880863251923e01325193a7480005/popup/original/1eb3e14d-488f-4757-a681-971aa61aef01.jpg" alt="왕과의 산책 2023.6.10.-10.28.">
                      </div>
                      <dl>
                        <dt>왕과의 산책</dt>
                        <dd>2023-06-14</dd>
                      </dl>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.mois.go.kr/index.jsp" target="_blank" title="민간건축물내진보강지원사업로 이동(새창)">
                      <div class="pop_thumb">
                        <img src="https://jeonju.go.kr/planweb/upload/402880863251923e01325193a7480005/popup/original/64f25dae-fb58-4cc0-b3fd-17b8c4be1210.jpg" alt="민간건축물 내진보강지원사업 지진으로부터의 안전 확보를 도와드립니다! 민간 건축물 내진보강 지원 ☎ 044-205-5199 / ldi0703@korea.kr">
                      </div>
                      <dl>
                        <dt>민간건축물내진보강지원사업</dt>
                        <dd>2023-05-23</dd>
                      </dl>
                    </a>
                  </li>
                  <li>
                    <a href="https://blog.naver.com/humanjnc" target="_blank" title="전북청년도전지원사업 참여자 모집로 이동(새창)">
                      <div class="pop_thumb">
                        <img src="https://jeonju.go.kr/planweb/upload/402880863251923e01325193a7480005/popup/original/8ef6a04b-27a1-4f2a-af34-e6cf89a29202.jpg" alt="도전하고 현금 300만원 수당받자! 전북청년도전지원사업 참여자 모집 18세~34세 구직멈춤청년이라면 누구나 개인상담, 구직도움, NCS, 이력서관리까지 063-272-4920">
                      </div>
                      <dl>
                        <dt>전북청년도전지원사업 참여자 모집</dt>
                        <dd>2023-05-11</dd>
                      </dl>
                    </a>
                  </li>
                  <li>
                    <a href="https://link.inpock.co.kr/jjticketbox" target="_blank" title="전주문화예술 플랫폼 전주티켓박스로 이동(새창)">
                      <div class="pop_thumb">
                        <img src="https://jeonju.go.kr/planweb/upload/402880863251923e01325193a7480005/popup/original/023ba3da-c800-40b7-b404-5be54aa5a365.jpg" alt="전주 예술의 모든것! 전주문화예술 플랫폼 전주티켓박스 위치: 전주시 완산구 고사동 9-7(오거리문화광장 내) 운영내용: 공연 정보 제공 티켓 판매, 지역 예술단체 및 예술가 공연 전시 홍보, 온오프라인 통합 홍보 마케팅 이용문의: 010-4108-6321">
                      </div>
                      <dl>
                        <dt>전주문화예술 플랫폼 전주티켓박스</dt>
                        <dd>2023-04-24</dd>
                      </dl>
                    </a>
                  </li>
                  <li>
                    <a href="https://blog.naver.com/jica14000/223070360044" target="_blank" title="라이브커머스 온라인 판로확대 지원사업 소상공인 모집로 이동(새창)">
                      <div class="pop_thumb">
                        <img src="https://jeonju.go.kr/planweb/upload/402880863251923e01325193a7480005/popup/original/4387ac7c-497a-422f-aa8b-3ed799403802.jpg" alt="라이브커머스 온라인 판로확대 지원사업 소상공인 모집 모집기간: 2023년 4월 ~ 10월">
                      </div>
                      <dl>
                        <dt>라이브커머스 온라인 판로확대 지원사업 소상공인 모집</dt>
                        <dd>2023-04-12</dd>
                      </dl>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.jeonju.go.kr/planweb/board/view.9is?dataUid=9be517a884c3bd8801870321eb6f5f1f&amp;boardUid=9be517a74f8dee91014f90e8502d0602&amp;contentUid=9be517a769953e5f0169c1dfd63e01a7" target="_blank" title="긴급복지지원로 이동(새창)">
                      <div class="pop_thumb">
                        <img src="https://jeonju.go.kr/planweb/upload/402880863251923e01325193a7480005/popup/original/c6b4007c-f295-4134-ace0-9334079283cb.jpg" alt="실직 폐업, 중한질병 부상, 자연재해 등 위기 상황으로 인해 생활이 갑자기 곤란해졌다면? 망설이지 마시고 지금 바로! 거주지 시군구청 또는 129로 연락주세요!">
                      </div>
                      <dl>
                        <dt>긴급복지지원</dt>
                        <dd>2023-03-21</dd>
                      </dl>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.jeonju.go.kr/planweb/board/view.9is?dataUid=9be517a785c9c15a0186e8c42e85454b&amp;boardUid=9be517a74f8dee91014f90e8502d0602&amp;contentUid=9be517a769953e5f0169c1dfd63e01a7" target="_blank" title="지방세 환급 신청 안내로 이동(새창)">
                      <div class="pop_thumb">
                        <img src="https://jeonju.go.kr/planweb/upload/402880863251923e01325193a7480005/popup/original/e1dda234-6f68-40da-80a2-faee336094e9.jpg" alt="지방세 환급 신청 안내 지방세특례제한법 개정 시행(2023.3.14.)">
                      </div>
                      <dl>
                        <dt>지방세 환급 신청 안내</dt>
                        <dd>2023-03-16</dd>
                      </dl>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.cpoint.or.kr/netzero" target="_blank" title="탄소중립 포인트제로 이동(새창)">
                      <div class="pop_thumb">
                        <img src="https://jeonju.go.kr/planweb/upload/402880863251923e01325193a7480005/popup/original/c641da5f-1a80-4f35-8240-5944db11df57.jpg" alt="일상 속 탄소중립 실천이 혜택으로 돌아온다 녹색생활 실천 분야 탄소중립 포인트제 ">
                      </div>
                      <dl>
                        <dt>탄소중립 포인트제</dt>
                        <dd>2023-03-13</dd>
                      </dl>
                    </a>
                  </li>
                  <li>
                    <a href="https://lib.jeonju.go.kr/index.jeonju?menuCd=DOM_000000104005000000" target="_blank" title="전주책사랑포인트 책쿵20로 이동(새창)">
                      <div class="pop_thumb">
                        <img src="https://jeonju.go.kr/planweb/upload/402880863251923e01325193a7480005/popup/original/a1ce00d9-7632-4a49-b7bc-11b15280007e.jpg" alt="전주책사랑포인트 책쿵20">
                      </div>
                      <dl>
                        <dt>전주책사랑포인트 책쿵20</dt>
                        <dd>2023-03-02</dd>
                      </dl>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.jeonju.go.kr/planweb/board/view.9is?dataUid=9be517a884c3bd8801868289f6552ff3&amp;boardUid=9be517a74f8dee91014f90e8502d0602&amp;contentUid=9be517a769953e5f0169c1dfd63e01a7" target="_blank" title="농촌지역 실외사육견(마당개) 중성화 수술비 지원 안내로 이동(새창)">
                      <div class="pop_thumb">
                        <img src="https://jeonju.go.kr/planweb/upload/402880863251923e01325193a7480005/popup/original/a00341ac-8839-40ad-a7fd-91039fe21e39.jpg" alt="농촌지역 실외사육견(마당개) 중성화 수술비 지원 안내 신청대상 : 주민등록산 주소가 전주인 시민 신청기간 : 2023년 3월 2일~ 11월 30일 신청조건 : 5개월령 이상인 개 1가구당 3마리(총200두) 신청장소 : 전주시청 동물정책과 문의전화 : 전주시 동물복지과(063-281-5073) ">
                      </div>
                      <dl>
                        <dt>농촌지역 실외사육견(마당개) 중성화 수술비 지원 안내</dt>
                        <dd>2023-02-27</dd>
                      </dl>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.jeonju.go.kr/planweb/board/view.9is?dataUid=9be517a884c3bd8801867d919572439b&amp;boardUid=9be517a74f8dee91014f90f516c906f9&amp;contentUid=9be517a769953e5f0169c1ea43280508" target="_blank" title="저소득층 TV 안테나 설치지원로 이동(새창)">
                      <div class="pop_thumb">
                        <img src="https://jeonju.go.kr/planweb/upload/402880863251923e01325193a7480005/popup/original/56fb936f-8d48-4518-b506-0bf54b1b2ebc.jpg" alt="저소득층 TV 안테나 설치지원 지상파 방송의 직접수신을 위한 TV안테나를 무료로 설치해드립니다. 신청방법 국번없이 124(무료전화)">
                      </div>
                      <dl>
                        <dt>저소득층 TV 안테나 설치지원</dt>
                        <dd>2023-02-24</dd>
                      </dl>
                    </a>
                  </li>
                  <li>
                    <a href="https://jeonju.go.kr/planweb/board/view.9is?dataUid=9be517a884c3bd8801867bb630e67a78&amp;contentUid=9be517a76d4e0de4016d9507e24c70b2&amp;boardUid=9be517a76d4e0de4016da39cded729b7" target="_blank" title="2023 출향청년 채용 전주기업 취업지원 사업 참여기업 모집로 이동(새창)">
                      <div class="pop_thumb">
                        <img src="https://jeonju.go.kr/planweb/upload/402880863251923e01325193a7480005/popup/original/9fa56031-f4ef-4528-8a6c-3547284b0923.jpg" alt="2023 출향청년 채용 전주기업 취업지원 사업 참여기업 모집">
                      </div>
                      <dl>
                        <dt>2023 출향청년 채용 전주기업 취업지원 사업 참여기업 모집</dt>
                        <dd>2023-02-24</dd>
                      </dl>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.jeonju.go.kr/planweb/board/view.9is?dataUid=9be517a884c3bd88018672bffa48484a&amp;boardUid=9be517a74f8dee91014f90e8502d0602&amp;contentUid=9be517a769953e5f0169c1dfd63e01a7" target="_blank" title="전주시내버스 노선 및 시간 조정 안내로 이동(새창)">
                      <div class="pop_thumb">
                        <img src="https://jeonju.go.kr/planweb/upload/402880863251923e01325193a7480005/popup/original/fb123029-ef0f-4643-9b1a-de523175ae48.jpg" alt="전주시내버스 노선 및 시간 조정 안내 시행일 : 2023. 3. 1.(수) 첫차부터~ 기·종점 변경 : 월드컵경기장 → 월드컵경기장 남문 - 시내버스 : 4개노선 (401, 402, 403, 420번) - 마을버스 : 11개노선 (40, 41, 42, 42-1, 43, 44, 45, 46, 47, 48, 49번) 운행 시간 변경 - 변경노선 : 8개 노선 31대 (19, 62, 101, 131, 149, 200, 511, 522번) ">
                      </div>
                      <dl>
                        <dt>전주시내버스 노선 및 시간 조정 안내</dt>
                        <dd>2023-02-22</dd>
                      </dl>
                    </a>
                  </li>
                  <li>
                    <a href="https://jeonju.go.kr/planweb/board/view.9is?dataUid=9be517a884c3bd8801867174174c13e9&amp;boardUid=9be517a76d4e0de4016da39cded729b7&amp;contentUid=9be517a76d4e0de4016d9507e24c70b2" target="_blank" title="전라북도 군복무 청년 상해보험 안내로 이동(새창)">
                      <div class="pop_thumb">
                        <img src="https://jeonju.go.kr/planweb/upload/402880863251923e01325193a7480005/popup/original/7f36f557-37f3-4d94-a6ed-f19e0e648cc9.jpg" alt="전라북도 군복무 청년 상해보험 안내 전라북도에 주소를 둔 현역병이라면 자동가입! 보험료 무료! 중복보장! 보장기간: 2023.2.20. 00:00~2024.2.19. 24:00">
                      </div>
                      <dl>
                        <dt>전라북도 군복무 청년 상해보험 안내</dt>
                        <dd>2023-02-21</dd>
                      </dl>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.jeonju.go.kr/planweb/board/view.9is?dataUid=9be517a785c9c15a01865dcc9b2732a3&amp;boardUid=9be517a74f8dee91014f90e8502d0602&amp;contentUid=9be517a769953e5f0169c1dfd63e01a7" target="_blank" title="꿀벌 응애 방제약품 선택방법 및 사용요령로 이동(새창)">
                      <div class="pop_thumb">
                        <img src="https://jeonju.go.kr/planweb/upload/402880863251923e01325193a7480005/popup/original/465f00b4-e2c7-4128-bf29-5a66483ab8cc.jpg" alt="꿀벌 응애 방제약품 선택방법 및 사용요령">
                      </div>
                      <dl>
                        <dt>꿀벌 응애 방제약품 선택방법 및 사용요령</dt>
                        <dd>2023-02-17</dd>
                      </dl>
                    </a>
                  </li>
                  <li>
                    <a href="http://health.jeonju.go.kr/index.jeonju" target="_blank" title="치매치료관리비 확대 지원 안내로 이동(새창)">
                      <div class="pop_thumb">
                        <img src="https://jeonju.go.kr/planweb/upload/402880863251923e01325193a7480005/popup/original/17034612-431d-42ab-a3d8-19baf2f53c10.jpg" alt="치매치료관리비 확대 지원 안내 -지원대상 : 주민등록상 전주시민 / 의료기관에서 치매로 진단받은 치매환자(F00~03, F10.7, G30, G31) / 치매치료 성분약을 복용하는 자 / 대상자 선정 제외 : 보훈대상자(국가유공자), 의료급여수급자">
                      </div>
                      <dl>
                        <dt>치매치료관리비 확대 지원 안내</dt>
                        <dd>2023-02-14</dd>
                      </dl>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.jeonju.go.kr/planweb/board/view.9is?dataUid=9be517a884c3bd8801862f7b681d4293&amp;boardUid=9be517a74f8dee91014f90e8502d0602&amp;contentUid=9be517a769953e5f0169c1dfd63e01a7" target="_blank" title="2023 길고양이 중성화수술 신청로 이동(새창)">
                      <div class="pop_thumb">
                        <img src="https://jeonju.go.kr/planweb/upload/402880863251923e01325193a7480005/popup/original/51259b6a-1bb3-4d36-b73e-e0cb4b354104.jpg" alt="2023 길고양이 중성화수술(TNR) 신청 신청대상 : 주택가등에서 자연적으로 번식하여 살아가는 길고양이, 2kg, 6개월령 이상 (임신중이거나 포유가 확인된 개체는 제외) 신청기간 : 2023.2. ~ 11.30. 문 의 처 : 동물정책과(063-281-5073)">
                      </div>
                      <dl>
                        <dt>2023 길고양이 중성화수술 신청</dt>
                        <dd>2023-02-09</dd>
                      </dl>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.jeonju.go.kr/planweb/board/view.9is?dataUid=9be517a884c3bd8801862510c0682774&amp;page=1&amp;boardUid=9be517a74f8dee91014f90e8502d0602&amp;contentUid=9be517a769953e5f0169c1dfd63e01a7&amp;layoutUid=&amp;searchType=&amp;keyword=&amp;categoryUid1=&amp;categoryUid2=&amp;cateogryUid3=" target="_blank" title="전주맛배달 신규 가맹점 모집로 이동(새창)">
                      <div class="pop_thumb">
                        <img src="https://jeonju.go.kr/planweb/upload/402880863251923e01325193a7480005/popup/original/1502c105-b8de-48c2-abb5-5ea0e1ff580a.jpg" alt="전주맛배달(전주시 공공배달앱) 신규 가맹점 모집 01.수수료 0원 02.가입비 0원 03.광고비 0원">
                      </div>
                      <dl>
                        <dt>전주맛배달 신규 가맹점 모집</dt>
                        <dd>2023-02-07</dd>
                      </dl>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.jeonju.go.kr/planweb/board/view.9is?dataUid=9be517a884c3bd8801860a89d9fb244a&amp;boardUid=9be517a74f8dee91014f90e8502d0602&amp;contentUid=9be517a769953e5f0169c1dfd63e01a7" target="_blank" title="취약계층 반려동물 중성화 수술비 지원 신청로 이동(새창)">
                      <div class="pop_thumb">
                        <img src="https://jeonju.go.kr/planweb/upload/402880863251923e01325193a7480005/popup/original/0c898f3e-d1fe-497d-a53f-82439fdb2900.jpg" alt="취약계층 반려동물 중성화 수술비 지원 신청 지원 자격 : 기초생활수급자 또는 차상위 계층의 전주시민 대상 동물 : 동물등록된 반려견·반려묘 신청 기간 : 2023. 2. ~ 예산 소진 시까지 신청 서류 : 시 홈페이지 공고문 참조 문의 전화 : 전주시 동물정책과(063-281-5073)">
                      </div>
                      <dl>
                        <dt>취약계층 반려동물 중성화 수술비 지원 신청</dt>
                        <dd>2023-02-01</dd>
                      </dl>
                    </a>
                  </li>
                  <li>
                    <a href="https://blog.naver.com/jeonju_city/223072477137" target="_blank" title="전주고향사랑 기부제로 이동(새창)">
                      <div class="pop_thumb">
                        <img src="https://jeonju.go.kr/planweb/upload/402880863251923e01325193a7480005/popup/original/cc7ca3b4-f53b-4d34-bd29-acd02d90b64a.jpg" alt="전주고향사랑 기부제 고향사랑기부제가 2023.1.1.시행됩니다. 전주시를 사랑하는 마음, 기부금으로 전하세요! 기부금은 전주시민의 복리증진, 지역경제활성화 등에 소중하게 사용됩니다.">
                      </div>
                      <dl>
                        <dt>전주고향사랑 기부제</dt>
                        <dd>2022-10-24</dd>
                      </dl>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.jeonju.go.kr/planweb/board/view.9is?dataUid=9be517a884c3bd88018585552aef2826&amp;boardUid=9be517a74f8dee91014f90e8502d0602&amp;contentUid=9be517a769953e5f0169c1dfd63e01a7" target="_blank" title="반려견 동물등록 하세요로 이동(새창)">
                      <div class="pop_thumb">
                        <img src="https://jeonju.go.kr/planweb/upload/402880863251923e01325193a7480005/popup/original/47ca3199-f3cb-408a-8248-89880f4e830b.jpg" alt="반려견 동물등록 하세요 내장형 동물등록비 2만원 지원">
                      </div>
                      <dl>
                        <dt>반려견 동물등록 하세요</dt>
                        <dd>2023-01-09</dd>
                      </dl>
                    </a>
                  </li>
                  <li>
                    <a href="http://koreadpac.creatorlink.net/" target="_blank" title=" 대국민 심리지원을 위한 24시간 핫라인 운영 로 이동(새창)">
                      <div class="pop_thumb">
                        <img src="https://jeonju.go.kr/planweb/upload/402880863251923e01325193a7480005/popup/original/02309096-0683-4605-9a89-075d7a6ef2f3.jpg" alt="범정부 재난심리지원 상담전화 안내 이태원 사고로 불안, 우울 등 마음이 힘든 분들은 무료로 심리상담을 받을 수 있습니다.">
                      </div>
                      <dl>
                        <dt> 대국민 심리지원을 위한 24시간 핫라인 운영 </dt>
                        <dd>2022-11-22</dd>
                      </dl>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.wetax.go.kr/main/?cmd=LPTIOA0R0" target="_blank" title="2022년 지방세·지방행정제재부과금 고액·상습 체납자 명단공개로 이동(새창)">
                      <div class="pop_thumb">
                        <img src="https://jeonju.go.kr/planweb/upload/402880863251923e01325193a7480005/popup/original/6deea381-29a1-460a-a6cd-edf62d638918.jpg" alt="체납기간 1년이상~ 체납액 1천만원 이상! 2022년 지방세·지방행정제재부과금 고액·상습 체납자 명단공개">
                      </div>
                      <dl>
                        <dt>2022년 지방세·지방행정제재부과금 고액·상습 체납자 명단공개</dt>
                        <dd>2022-11-15</dd>
                      </dl>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.2023wsjkorea.org/" target="_blank" title="2023 새만금 세계잼버리로 이동(새창)">
                      <div class="pop_thumb">
                        <img src="https://jeonju.go.kr/planweb/upload/402880863251923e01325193a7480005/popup/original/83a6da37-9ccf-41f2-a4d5-825a3403d530.jpg" alt="전 세계 청소년 꿈의 야영축제! 2023 새만금 세계잼버리">
                      </div>
                      <dl>
                        <dt>2023 새만금 세계잼버리</dt>
                        <dd>2023-01-13</dd>
                      </dl>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.jeonju.go.kr/index.9is?contentUid=9be517a778ba4af00178fc645f814019" target="_blank" title="전주시 풍수해보험 가입 지원사업로 이동(새창)">
                      <div class="pop_thumb">
                        <img src="https://jeonju.go.kr/planweb/upload/402880863251923e01325193a7480005/popup/original/7d1066bf-b857-44d0-9a7d-5a8b5499eb26.jpg" alt="얘기치 못한 자연재해 최대 91% 보험료를 지원하는 풍수해보험 가입문의: 5개 보험사 02-2100-5103~7 (DB, 현대해상,삼성화재, KB, NH농협) 또는 거주 주민센터">
                      </div>
                      <dl>
                        <dt>전주시 풍수해보험 가입 지원사업</dt>
                        <dd>2022-12-01</dd>
                      </dl>
                    </a>
                  </li>
                  <li>
                    <a href="https://cpoint.or.kr/user/regist/firstStep.do?type=01" target="_blank" title="탄소포인트제 가입 신청하세요!로 이동(새창)">
                      <div class="pop_thumb">
                        <img src="https://jeonju.go.kr/planweb/upload/402880863251923e01325193a7480005/popup/original/5dd0f2df-54d2-4530-86dc-6c1879ddb441.jpg" alt="탄소포인트제 가입 신청하세요! 전기, 상수도, 도시가스의 사용량 감축률에 따라 탄소포인트를 부여하는 전국민 온실가스 감축 실천제도 신천방법 인터넷신청: http://cpoint.or.kr 회원가입 및 신청 서면신청: 동 주민센터 또는 시청 기후변화대응과(063-281-2332) 방문">
                      </div>
                      <dl>
                        <dt>탄소포인트제 가입 신청하세요!</dt>
                        <dd>2022-11-30</dd>
                      </dl>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.jeonju.go.kr/planweb/board/view.9is?dataUid=9be517a883d6bd440184411026427612&amp;boardUid=9be517a74f8dee91014f90e8502d0602&amp;contentUid=9be517a769953e5f0169c1dfd63e01a7" target="_blank" title="11월 24일부터 일회용품 사용규제 확대 시행로 이동(새창)">
                      <div class="pop_thumb">
                        <img src="https://jeonju.go.kr/planweb/upload/402880863251923e01325193a7480005/popup/original/5806b8f6-b890-42e9-a0aa-5725e7ebeb55.jpg" alt="11월 24일부터 일회용품 사용규제 확대 시행 - 식품접객업 매장 내 1회용 종이컵 및 1회용 플라스틱 빨대 젓는 막대 사용금지 - 종합소매업과 제과점 1회용 비닐봉투 사용금지 - 대규모점포 1회용 우산비닐, 체육시설 1회용 플라스틱 응원용품 사용 금지 전주시 청소지원과 063)281-8404 ">
                      </div>
                      <dl>
                        <dt>11월 24일부터 일회용품 사용규제 확대 시행</dt>
                        <dd>2022-11-09</dd>
                      </dl>
                    </a>
                  </li>
                  <li>
                    <a href="https://jeonju.go.kr/planweb/board/view.9is?dataUid=9be517a88020ab730182a4cd06ce3273&amp;boardUid=9be517a74f8dee91014f90e8502d0602&amp;contentUid=9be517a769953e5f0169c1dfd63e01a7" target="_blank" title="청년월세 특별지원로 이동(새창)">
                      <div class="pop_thumb">
                        <img src="https://jeonju.go.kr/planweb/upload/402880863251923e01325193a7480005/popup/original/f3960ed1-1264-428d-b972-f67515a4977b.jpg" alt="청년월세 특별지원 2202.08.22(월)부터 신청 가능 월 최대 20만원씩 12개월 지급">
                      </div>
                      <dl>
                        <dt>청년월세 특별지원</dt>
                        <dd>2022-08-25</dd>
                      </dl>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.jeonju.go.kr/planweb/board/view.9is?dataUid=9be517a88020ab7301811388bcf14125&amp;page=1&amp;boardUid=9be517a74f8dee91014f90e8502d0602&amp;contentUid=9be517a769953e5f0169c1dfd63e01a7" target="_blank" title="전주형 중소기업 퇴직연금 지원사업로 이동(새창)">
                      <div class="pop_thumb">
                        <img src="https://jeonju.go.kr/planweb/upload/402880863251923e01325193a7480005/popup/original/6363ac36-78f1-4c3c-8cac-440694aa9cfd.jpg" alt="전주형 중소기업 퇴직연금지원사업 참여기업 모집">
                      </div>
                      <dl>
                        <dt>전주형 중소기업 퇴직연금 지원사업</dt>
                        <dd>2022-03-25</dd>
                      </dl>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.jeonju.go.kr/planweb/board/view.9is?dataUid=9be517a883d6bd4401845f00a293345e&amp;page=1&amp;boardUid=9be517a8715e381f017230a54d17398b&amp;contentUid=9be517a8715e381f0171e7ab71c87f8c&amp;layoutUid=&amp;searchType=&amp;keyword=&amp;categoryUid1=&amp;categoryUid2=&amp;cateogryUid3=" target="_blank" title="드림랜드 안전점검로 이동(새창)">
                      <div class="pop_thumb">
                        <img src="https://jeonju.go.kr/planweb/upload/402880863251923e01325193a7480005/popup/original/560463e0-4f28-45c7-84bc-c0c19a8fab15.jpg" alt="2022.11.10(목) ~ 추후 공지 시까지 드림랜드 운영 중단 안내 동물원내 드림랜드 놀이시설 안내 점검으로 인해 드림랜드 운영을 잠정 중단합니다. 이용에 불편을 끼쳐드려 죄송합니다. ">
                      </div>
                      <dl>
                        <dt>드림랜드 안전점검</dt>
                        <dd>2022-11-14</dd>
                      </dl>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.mohw.go.kr/react/al/sal0901mn.jsp?PAR_MENU_ID=04&amp;MENU_ID=04070101" target="_blank" title="건강보험 거짓청구 요양기관 명단공표로 이동(새창)">
                      <div class="pop_thumb">
                        <img src="https://jeonju.go.kr/planweb/upload/402880863251923e01325193a7480005/popup/original/763e64a7-4017-4e27-99ee-42696528f592.jpg" alt="건강보험 거짓청구 요양기관 명단공표 자세히보기">
                      </div>
                      <dl>
                        <dt>건강보험 거짓청구 요양기관 명단공표</dt>
                        <dd>2023-02-07</dd>
                      </dl>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <!-- *popCon2* -->
          </div>
          <!-- *popupzone2* -->
          <div class="popupzone3">
            <h4 class="poptit3"><a href="" onclick="popUpView(this); return false;">주요 배너<span>링크 모음</span></a></h4>
            <div class="popCon3" style="display:none;">
              <div class="readMore">
                <ul>
                  <li>
                    <a href="https://www.eshare.go.kr/" target="_blank">
                      <i><span class="hidden">개방시설 예약 이미지</span></i>
                      <strong>개방시설 예약</strong>
                    </a>
                  </li>
                  <li>
                    <a href="/index.9is;jsessionid=ZNNHLcMndcjFH1E5DV4YodquaIjG7u0N4wq7LOT67WkLwmrLJSUplPhZbauDXzBX.was01_servlet_engine1?contentUid=9be517a77617d9c5017688424e8c6169&amp;subPath=">
                      <i><span class="hidden">부동산거래 불법행위 신고센터 이미지</span></i>
                      <strong>부동산거래 불법행위 신고센터</strong>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.mois.go.kr/frt/sub/a03/corruptionDeclareInfo/screen.do" target="_blank">
                      <i><span class="hidden">공직/선거비리 익명 신고 이미지</span></i>
                      <strong>공직/선거비리 익명 신고</strong>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.jeonju.go.kr/index.9is?contentUid=9be517a765366314016578d4ef3854b3&amp;subPath=">
                      <i><span class="hidden">미세먼지&amp;천만그루 이미지</span></i>
                      <strong>미세먼지&amp;천만그루</strong>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.jeonju.go.kr/index.9is?contentUid=9be517a76efda4f90170600f320014a6&amp;subPath=">
                      <i><span class="hidden">시민의숲 1963 이미지</span></i>
                      <strong>시민의숲 1963</strong>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.jeonju.go.kr/index.9is?contentUid=9be517a772c0d0fd0172e9af29de4658&amp;subPath=">
                      <i><span class="hidden">옛 대한방직 부지관련 시민공론화 이미지</span></i>
                      <strong>옛 대한방직 부지관련 시민공론화</strong>
                    </a>
                  </li>
                  <li>
                    <a href="http://daum.jeonju.go.kr/" target="_blank">
                      <i><span class="hidden">전주시 시정 소식지 전주다움 이미지</span></i>
                      <strong>전주시 시정 소식지 전주다움</strong>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <!-- *popCon3* -->
          </div>
          <!-- *popupzone3* -->
        </div>
      </div>
      <!-- *service1* -->
      <div class="service2" style="display:none;">
        <h3 class="subject"><span>민원도우미</span>서비스</h3>
        <p class="txtst">
          찾으시는 항목 또는 단어 입력으로 쉽고 빠른 검색서비스 제공
        </p>
        <div class="helper">
          <div class="hp_search">
            <div class="hp_num">
              <span class="hidden">천년전주콜센터 063-222-1000</span>
            </div>
            <form method="post" name="civilForm" id="civilForm" action="https://jeonju.go.kr/planweb/minwon/list.9is?siteUid=402880863251923e01325193a7480005">
              <input type="hidden" name="searchType" id="searchType" value="minwonContent">
              <input type="hidden" name="contentUid" id="contentUid" value="9be517a7510f24f0015115043e022651">
              <input type="hidden" name="boardUid" id="boardUid" value="minwon">
              <fieldset>
                <legend>검색영역</legend>
                <div>
                  <input type="text" name="keyword" id="keyword" placeholder="검색어를 입력하세요." title="검색어 입력">
                  <button type="button" onclick="return civilSearch();"><span>검색<i>하기</i></span></button>
                </div>
                <ul class="hp_keyword">
                  <li><a href="">전주사랑상품권</a></li>
                  <li><a href="">코로나 현황</a></li>
                  <li><a href="">재난지원금</a></li>
                  <li><a href="">착한가격 모범업소</a></li>
                  <li><a href="">공공근로</a></li>
                  <li><a href="">시내버스 노선</a></li>
                  <li><a href="">일자리</a></li>
                  <li><a href="">부동산 정보</a></li>
                  <li><a href="">주정차 단속</a></li>
                </ul>
              </fieldset>
            </form>
          </div>
          <!-- *hp_search* -->
          <div class="hp_link">
            <div class="synthesis">
              <h4><span>종합민원</span> 안내</h4>
              <ul>
                <li><a href="https://jeonju.go.kr/planweb/board/list.9is?boardUid=9be517a74f8dee91014f90e14df005a6&amp;dataUid=&amp;layoutUid=9be517a74f72e96b014f81ffae3a005b&amp;contentUid=9be517a74f8dee91014f916e1eee09ee" target="_blank"><span>민원편람</span></a></li>
                <li><a href="https://jeonju.go.kr/planweb/board/list.9is?contentUid=9be517a74f8dee91014f9172cd670a0b&amp;boardUid=9be517a74f8dee91014f90e430d605c3&amp;contentUid=9be517a74f8dee91014f9172cd670a0b" target="_blank"><span>민원서식</span></a></li>
                <li><a href="https://jeonju.go.kr/index.9is?contentUid=9be517a74f8dee91014f916eeb9509fd" target="_blank"><span>무인민원발급</span></a></li>
                <li><a href="https://jeonju.go.kr/index.9is?contentUid=9be517a74f8dee91014f9240f4b8116f" target="_blank"><span>보건복지</span></a></li>
                <li><a href="https://jeonju.go.kr/index.9is?contentUid=9be517a74f8dee91014f95c5696b155b" target="_blank"><span>교통민원</span></a></li>
                <li><a href="https://jeonju.go.kr/index.9is?contentUid=9be517a74f8dee91014f91f022f50fef" target="_blank"><span>생활환경</span></a></li>
                <li><a href="https://jeonju.go.kr/index.9is?contentUid=9be517a74f8dee91014f91c42a8b0e8e" target="_blank"><span>시정일반</span></a></li>
                <li><a href="https://jeonju.go.kr/index.9is?contentUid=9be517a75b2410d0015b40c1ae9d6bb0" target="_blank"><span>상하수도</span></a></li>
              </ul>
            </div>
            <div class="external">
              <h4><span>외부민원</span> 안내</h4>
              <ul>
                <li><a href="https://www.gov.kr/portal/main" target="_blank"><span>정부24</span></a></li>
                <li><a href="https://efamily.scourt.go.kr/index.jsp" target="_blank"><span>전자가족관계</span></a></li>
                <li><a href="https://www.hometax.go.kr/websquare/websquare.html?w2xPath=/ui/pp/index.xml" target="_blank"><span>국세청 홈택스</span></a></li>
                <li><a href="https://www.giro.or.kr/" target="_blank"><span>인터넷 지로</span></a></li>
                <li><a href="https://www.wetax.go.kr/main/" target="_blank"><span>지방세 위택스</span></a></li>
                <li><a href="#" onclick="window.open('https://chatbot.wetax.go.kr/', '지방세 챗봇', 'width=450, height=802, menubar=yes,scrollbars=no,resizable=yes,status=yes'); return false;"><span>지방세 <em class="red">챗봇</em></span></a></li>
                <li><a href="https://www.ecar.go.kr/Index.jsp" target="_blank"><span>자동차민원</span></a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="svg_close">
    <button type="button" onclick="popUpClose();"><span class="hidden">주요알림 맞춤서비스 창 닫기</span></button>
  </div>
</div>