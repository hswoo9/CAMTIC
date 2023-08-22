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
        <dt>캠틱종합기술원 정보를 쉽고 빠르게!</dt>
        <dd>홈페이지 방문자의 이용 편의를 위해<br>
          맞춤형 서비스를 제공합니다.</dd>
      </dl>
    </div>
    <div class="svg_menu">
      <ul>
        <li><a href="" class="menu_on"><span>주요 알림 모아보기</span></a></li>
        <!--<li><a href=""><span>민원 도우미</span></a></li>-->
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
        <source src="/images/camtic/pv_intro.mp4" type="video/mp4">
      </video>
    </div>
  </div>
  <div class="svgroup_r">
    <div class="svg_contents">
      <div class="service1" style="">
        <h3 class="subject"><span>주요 알림 서비스</span></h3>
        <p class="txtst">
        </p>
        <div class="notification">
          <div class="popupzone1">
            <h4 class="poptit1 on"><a href="" onclick="popUpView(this); return false;">팝업존 <span>모아보기</span></a></h4>
            <div class="popCon1" style="">
              <div class="readMore">
                <ul>
                  <li>
                    <a href="#" title="test">
                      <div class="pop_thumb">
                        <img src="http://www.camtic.or.kr/CAMsPot/popup/MainSet/MainSet52.jpg" alt="test" style="height: 287px;">
                      </div>
                      <dl>
                        <dt>2023 도전! 생활혁신</dt>
                        <dd>2023-06-02</dd>
                      </dl>
                    </a>
                  </li>
                  <li>
                    <a href="#" title="test">
                      <div class="pop_thumb">
                        <img src="http://www.camtic.or.kr/CAMsPot/popup/MainSet/MainSet51.jpg" alt="test" style="height: 317px;">
                      </div>
                      <dl>
                        <dt>스마트 기계 및 자동차 설계인력</dt>
                        <dd>2023-06-02</dd>
                      </dl>
                    </a>
                  </li>
                  <li>
                    <a href="#" title="test">
                      <div class="pop_thumb">
                        <img src="http://www.camtic.or.kr/CAMsPot/popup/MainSet/MainSet50.jpg" alt="test" style="height: 267px;">
                      </div>
                      <dl>
                        <dt>그린자동차 설계분야</dt>
                        <dd>2023-06-02</dd>
                      </dl>
                    </a>
                  </li>
                  <li>
                    <a href="#" title="test">
                      <div class="pop_thumb">
                        <img src="http://www.camtic.or.kr/CAMsPot/popup/MainSet/MainSet49.jpg" alt="test" style="height: 317px;">
                      </div>
                      <dl>
                        <dt>창업정책 한마당</dt>
                        <dd>2023-06-02</dd>
                      </dl>
                    </a>
                  </li>
                  <li>
                    <a href="#" title="test">
                      <div class="pop_thumb">
                        <img src="http://www.camtic.or.kr/CAMsPot/popup/MainSet/MainSet48.jpg" alt="test" style="height: 257px;">
                      </div>
                      <dl>
                        <dt>스마트팩토리·기계/자동차분야</dt>
                        <dd>2023-06-02</dd>
                      </dl>
                    </a>
                  </li>
                  <li>
                    <a href="#" title="test">
                      <div class="pop_thumb">
                        <img src="http://www.camtic.or.kr/CAMsPot/popup/MainSet/MainSet47.jpg" alt="test" style="height: 287px;">
                      </div>
                      <dl>
                        <dt>추석</dt>
                        <dd>2023-06-02</dd>
                      </dl>
                    </a>
                  </li>
                  <li>
                    <a href="#" title="test">
                      <div class="pop_thumb">
                        <img src="http://www.camtic.or.kr/CAMsPot/popup/MainSet/MainSet46.jpg" alt="test" style="height: 287px;">
                      </div>
                      <dl>
                        <dt>2022 전주국제드론산업박람회</dt>
                        <dd>2023-06-02</dd>
                      </dl>
                    </a>
                  </li>
                  <li>
                    <a href="#" title="test">
                      <div class="pop_thumb">
                        <img src="http://www.camtic.or.kr/CAMsPot/popup/MainSet/MainSet45.jpg" alt="test" style="height: 257px;">
                      </div>
                      <dl>
                        <dt>캠틱클러스터 알뜰마켓</dt>
                        <dd>2023-06-02</dd>
                      </dl>
                    </a>
                  </li>
                  <li>
                    <a href="#" title="test">
                      <div class="pop_thumb">
                        <img src="http://www.camtic.or.kr/CAMsPot/popup/MainSet/MainSet44.jpg" alt="test" style="height: 277px;">
                      </div>
                      <dl>
                        <dt>한가위</dt>
                        <dd>2023-06-02</dd>
                      </dl>
                    </a>
                  </li>
                  <li>
                    <a href="#" title="test">
                      <div class="pop_thumb">
                        <img src="http://www.camtic.or.kr/CAMsPot/popup/MainSet/MainSet43.jpg" alt="test" style="height: 357px;">
                      </div>
                      <dl>
                        <dt>신년인사</dt>
                        <dd>2023-06-02</dd>
                      </dl>
                    </a>
                  </li>
                  <li>
                    <a href="#" title="test">
                      <div class="pop_thumb">
                        <img src="http://www.camtic.or.kr/CAMsPot/popup/MainSet/MainSet42.jpg" alt="test" style="height: 257px;">
                      </div>
                      <dl>
                        <dt>2021 인공지능 학습용 데이터 활용 아이디어</dt>
                        <dd>2023-06-02</dd>
                      </dl>
                    </a>
                  </li>
                  <li>
                    <a href="#" title="test">
                      <div class="pop_thumb">
                        <img src="http://www.camtic.or.kr/CAMsPot/popup/MainSet/MainSet41.jpg" alt="test" style="height: 217px;">
                      </div>
                      <dl>
                        <dt>2021년 인공지능 학습용 데이터 구축사업</dt>
                        <dd>2023-06-02</dd>
                      </dl>
                    </a>
                  </li>
                  <li>
                    <a href="#" title="test">
                      <div class="pop_thumb">
                        <img src="http://www.camtic.or.kr/CAMsPot/popup/MainSet/MainSet40.jpg" alt="test" style="height: 217px;">
                      </div>
                      <dl>
                        <dt>2021년 인공지능 학습용 데이터 구축사업</dt>
                        <dd>2023-06-02</dd>
                      </dl>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <!-- *popCon1* -->
          </div>
          <!-- *popupzone1* -->
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