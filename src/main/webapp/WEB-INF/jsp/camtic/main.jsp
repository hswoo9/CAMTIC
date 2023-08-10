<%--
  Created by IntelliJ IDEA.
  User: jsy
  Date: 2023-04-17
  Time: 오후 6:03
  캠틱홈페이지A
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<jsp:include page="/WEB-INF/jsp/template/camtic/common.jsp" flush="false"/>
</head>

<body>
<div id="wrap">
  <jsp:include page="/WEB-INF/jsp/template/camtic/head.jsp" flush="false"/>

  <div id="content">
    <div id="vis">
      <div class="lef">
        <div class="roll2">
          <div class="swiper-wrapper">
            <div class="box swiper-slide" style="background-image:url(/images/camtic/vis-bg.jpg);">
              <div class="tit">
                <dl>
                  <dt>지역과 함께 성장</dt>
                  <dd>
                    창업 - 혁신 - 성장<br>
                    제조창업플랫폼
                  </dd>
                </dl>
                <p><span>J - Valley 1</span></p>
              </div>
            </div>
            <div class="box swiper-slide" style="background-image:url(/images/camtic/vis-bg.jpg);">
              <div class="tit">
                <dl>
                  <dt>기업과 함께 성장</dt>
                  <dd>
                    기업수요 및 성장주기 연계<br>
                    H/W, S/W 지원
                  </dd>
                </dl>
                <p><span>J - Valley 2</span></p>
              </div>
            </div>
            <div class="box swiper-slide" style="background-image:url(/images/camtic/vis-bg.jpg);">
              <div class="tit">
                <dl>
                  <dt>기술과 함께 성장</dt>
                  <dd>
                    시장기반<br>
                    신기술 · 신산업 육성 지원
                  </dd>
                </dl>
                <p><span>J - Valley 3</span></p>
              </div>
            </div>
            <div class="box swiper-slide" style="background-image:url(/images/camtic/vis-bg.jpg);">
              <div class="tit">
                <dl>
                  <dt>직원과 함께 성장</dt>
                  <dd>
                    행복한 일터<br>
                    캠틱 클러스터 구축
                  </dd>
                </dl>
                <p><span>J - Valley 4</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="rig">
        <div class="roll">
          <div class="swiper-wrapper">
            <div class="vis swiper-slide" style="background-image:url(/images/camtic/region.png);">
              <div class="nimg"><img src="" alt=""><h1 style="color: #4bc1be; font-size: 80px"><%--vis1--%></h1></div>
              <div class="hide">
                접근성 관련 텍스트
              </div>
            </div>
            <div class="vis swiper-slide" style="background-image:url(/images/camtic/business.png);">
              <div class="nimg"><img src="" alt=""><h1 style="color: #4bc1be; font-size: 80px"><%--vis2--%></h1></div>
              <div class="hide">
                접근성 관련 텍스트
              </div>
            </div>
            <div class="vis swiper-slide" style="background-image:url(/images/camtic/technology.png);">
              <div class="nimg"><img src="" alt=""><h1 style="color: #4bc1be; font-size: 80px"><%--vis3--%></h1></div>
              <div class="hide">
                접근성 관련 텍스트
              </div>
            </div>
            <div class="vis swiper-slide" style="background-image:url(/images/camtic/staff.png);">
              <div class="nimg"><img src="" alt=""><h1 style="color: #4bc1be; font-size: 80px"><%--vis4--%></h1></div>
              <div class="hide">
                접근성 관련 텍스트
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="cont">
        <span class="now">01</span>
        <div class="bar"></div>
        <span class="max">04</span>
        <button type="button" class="auto"><span class="hide">PLAY</span><i class="axi axi-pause2" aria-hidden="true"></i></button>
      </div>
      <div class="scr"><span>SCROLL</span></div>
    </div>

    <div id="mid">
      <div class="inner">
        <div class="lef">
          <ul class="tab">
            <li class="active"><button type="button" id="tab1" role="tab" aria-controls="tab-panel1" aria-selected="true">공지사항</button></li>
            <li><button type="button" role="tab" id="tab2" aria-controls="tab-panel2" aria-selected="false">채용공고</button></li>
            <li><button type="button" role="tab" id="tab3" aria-controls="tab-panel3" aria-selected="false">보도자료</button></li>
          </ul>
          <div class="area">
            <div class="item active" id="tab-panel1" role="tabpanel" aria-labelledby="tab1" aria-selected="true">
              <div class="sec notice">
                <a href="/camtic/news/view.do?boardArticleId=22&category=notice" class="box">
                  <p class="subject">전주첨단벤처단지 정전에 따른 홈페이지 사용 중단 안내</p>
                  <p class="sum">
                    캠틱종합기술원 홈페이지를 이용하시는 고객님께 양해 말씀 드립니다.
                    전기설비 정기점검에 따른 정전으로 아래의 점검기간 동안 홈페이지 서비스가 일시 중지할 예정이오니, 홈페이지 이용에 참고하시기 바랍니다.
                  </p>
                  <p class="date">2023-07-25</p>
                </a>
                <a href="/camtic/news/view.do?boardArticleId=13330&category=notice" class="box">
                  <p class="subject">2023 지역주도형 청년일자리사업 '맛있는 군산' 청년선발인원 공고</p>
                  <p class="sum">
                    2023년 지역주도형 청년일자리사업 선발인원을 다음과 같이 안내드립니다.
                    1. 합격자 명단
                  </p>
                  <p class="date">2023-01-31</p>
                </a>
                <a href="/camtic/news/view.do?boardArticleId=13321&category=notice" class="box">
                  <p class="subject">드론기술개발지원센터 11월 드론활용 장비교육 안내</p>
                  <p class="sum">
                    드론기술개발지원센터 11월 드론활용 장비교육 안내
                    |일시| 2022.11.25(금) 15:00 - 16:30 |장소| 전주혁신창업허브 드론기술개발지원센터 (전라북도 전주시 유상로 67)
                  </p>
                  <p class="date">2023-01-04</p>
                </a>
              </div>
              <a href="/camtic/news/commonBoard.do?categoryKey=notice" class="more">+ 더보기</a>
            </div>
            <div class="item" id="tab-panel2" role="tabpanel" aria-labelledby="tab2" aria-selected="false">
              <div class="sec">
                <a href="/camtic/member/view.do" class="box">
                  <div class="ddakji ing"><span>진행중</span></div>
                  <p class="subject">이영 중소벤처기업부 장관, 전주첨단벤처단지 방문 및 기업간담회</p>
                  <p class="sum">
                    방황하여도, 열락의 속잎나고, 맺어, 듣기만 싸인 눈이 칼이다. 하였으며, 청춘은 가슴에 교향악이다.
                    이상은 따뜻한 그들에게 크고 주며, 아니다. 살았으며, 어디 품고 사랑의 지혜는 착목한는 그들은 때에, 칼이다.
                  </p>
                  <p class="date">2023-01-04</p>
                </a>
                <a href="/camtic/member/view.do" class="box">
                  <div class="ddakji end"><span>완료</span></div>
                  <p class="subject">2 이영 중소벤처기업부 장관, 전주첨단벤처단지 방문 및 기업간담회</p>
                  <p class="sum">
                    방황하여도, 열락의 속잎나고, 맺어, 듣기만 싸인 눈이 칼이다. 하였으며, 청춘은 가슴에 교향악이다.
                    이상은 따뜻한 그들에게 크고 주며, 아니다. 살았으며, 어디 품고 사랑의 지혜는 착목한는 그들은 때에, 칼이다.
                  </p>
                  <p class="date">2023-01-04</p>
                </a>
                <a href="/camtic/member/view.do" class="box">
                  <div class="ddakji ing"><span>진행중</span></div>
                  <p class="subject">3 이영 중소벤처기업부 장관, 전주첨단벤처단지 방문 및 기업간담회</p>
                  <p class="sum">
                    방황하여도, 열락의 속잎나고, 맺어, 듣기만 싸인 눈이 칼이다. 하였으며, 청춘은 가슴에 교향악이다.
                    이상은 따뜻한 그들에게 크고 주며, 아니다. 살았으며, 어디 품고 사랑의 지혜는 착목한는 그들은 때에, 칼이다.
                  </p>
                  <p class="date">2023-01-04</p>
                </a>
              </div>
              <a href="/camtic/member/job.do" class="more">+ 더보기</a>
            </div>
            <div class="item" id="tab-panel3" role="tabpanel" aria-labelledby="tab3" aria-selected="false">
              <div class="sec">
                <a href="/camtic/pr/pr_view.do?boardArticleId=41505&category=report" class="box">
                  <p class="subject">333 수요맞춤형 드론산업 육성지원 사업 사업화지원 4차 수요맞춤형 드론산업 육성지원 사업 사업화지원 4차</p>
                  <p class="sum">
                    전라북도에 소재한 기업을 대상으로 다음과 같이 『2022년 수요맞춤형 드론산업 육성 지원사업』 시행계획을
                    전라북도에 소재한 기업을 대상으로 다음과 같이 『2022년 수요맞춤형 드론산업 육성 지원사업』 시행계획을
                  </p>
                  <p class="date">2023-01-04</p>
                </a>
                <a href="/camtic/pr/pr_view.do?boardArticleId=41504&category=report" class="box">
                  <p class="subject">333 수요맞춤형 드론산업 육성지원 사업 사업화지원 4차 수요맞춤형 드론산업 육성지원 사업 사업화지원 4차</p>
                  <p class="sum">
                    전라북도에 소재한 기업을 대상으로 다음과 같이 『2022년 수요맞춤형 드론산업 육성 지원사업』 시행계획을
                    전라북도에 소재한 기업을 대상으로 다음과 같이 『2022년 수요맞춤형 드론산업 육성 지원사업』 시행계획을
                  </p>
                  <p class="date">2023-01-04</p>
                </a>
                <a href="/camtic/pr/pr_view.do?boardArticleId=41503&category=report" class="box">
                  <p class="subject">333 수요맞춤형 드론산업 육성지원 사업 사업화지원 4차 수요맞춤형 드론산업 육성지원 사업 사업화지원 4차</p>
                  <p class="sum">
                    전라북도에 소재한 기업을 대상으로 다음과 같이 『2022년 수요맞춤형 드론산업 육성 지원사업』 시행계획을
                    전라북도에 소재한 기업을 대상으로 다음과 같이 『2022년 수요맞춤형 드론산업 육성 지원사업』 시행계획을
                  </p>
                  <p class="date">2023-01-04</p>
                </a>
              </div>
              <a href="/camtic/pr/report.do" class="more">+ 더보기</a>
            </div>
          </div>
        </div>
        <div class="rig">
          <div class="tit">
            <h2>캠틱<span>포커스</span></h2>
            <div class="cont">
              <div class="page"></div>
              <div class="bt">
                <button type="button" class="prev"><span class="hide">PREV</span><i class="axi axi-angle-left" aria-hidden="true"></i></button>
                <button type="button" class="auto"><span class="hide">PLAY</span><i class="axi axi-pause2" aria-hidden="true"></i></button>
                <button type="button" class="next"><span class="hide">NEXT</span><i class="axi axi-angle-right" aria-hidden="true"></i></button>
              </div>
            </div>
          </div>
          <div class="area">
            <div class="roll">
              <div class="swiper-wrapper">
                <a href="http://www.camtic.or.kr/CAMTIC/PR/pr_PhotoView?BBSNUM=862&&SearchText=&PAGE=1" class="swiper-slide">
                  <i style="background-image:url(/images/camtic/photo1-1.jpg);">동영상 제목</i>
                </a>
                <a href="http://www.camtic.or.kr/CAMTIC/PR/pr_letterlist" class="swiper-slide">
                  <i style="background-image:url(/images/camtic/photo1-2.jpg);">동영상 제목</i>
                </a>
                <a href="http://www.camtic.or.kr/CAMTIC/PR/pr_movielist" class="swiper-slide">
                  <i style="background-image:url(https://i.ytimg.com/vi_webp/HWn1OONOxEA/sddefault.webp);">동영상 제목</i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="sau">
      <div class="inner">
        <div class="tit">
          <h3>사업공고</h3>
          <div class="bt">
            <button type="button" class="prev"><i class="axi axi-angle-left"></i></button>
            <button type="button" class="next"><i class="axi axi-angle-right"></i></button>
          </div>
        </div>
        <div class="area">
          <div class="swiper-wrapper">
            <a href="/camtic/news/view.do?boardArticleId=53&category=business" class="box swiper-slide" style="width: 385px; margin-right: 20px;">
              <div class="head">
                <div class="ico">진행</div>
                <dl>
                  <dt>마감일</dt>
                  <dd>2023-08-31</dd>
                </dl>
              </div>
              <div class="cont">
                <div class="txt">지역 사회 발전을 위한 창의적 아이디어 공모전</div>
                <div class="date">
                  <i class="axi axi-clock" aria-hidden="true"></i>
                  <p>
                    2023-08-01 00:00:00 ~<br>
                    2023-08-31 00:00:00
                  </p>
                </div>
              </div>
            </a>
            <a href="/camtic/news/view.do?boardArticleId=37&category=business" class="box swiper-slide" style="width: 385px; margin-right: 20px;">
              <div class="head">
                <div class="ico">진행</div>
                <dl>
                  <dt>마감일</dt>
                  <dd>2023-06-21</dd>
                </dl>
              </div>
              <div class="cont">
                <div class="txt">[전북바이오융합산업진흥원] 바이오헬스 기업지원 모집공고</div>
                <div class="date">
                  <i class="axi axi-clock" aria-hidden="true"></i>
                  <p>
                    2023-06-19 00:00:00 ~<br>
                    2023-06-21 00:00:00
                  </p>
                </div>
              </div>
            </a>
            <a href="/camtic/news/view.do?boardArticleId=33466&category=business" class="box swiper-slide" style="width: 385px; margin-right: 20px;">
              <div class="head">
                <div class="ico">진행</div>
                <dl>
                  <dt>마감일</dt>
                  <dd>2023-07-31</dd>
                </dl>
              </div>
              <div class="cont">
                <div class="txt">2023년 R&D 혁신밸리 창업지원 초기 글로벌 사업화 지원 2차 안내</div>
                <div class="date">
                  <i class="axi axi-clock" aria-hidden="true"></i>
                  <p>
                    2023-07-17 00:00:00 ~<br>
                    2023-07-31 00:00:00
                  </p>
                </div>
              </div>
            </a>
            <a href="/camtic/news/view.do?boardArticleId=33463&category=business" class="box swiper-slide" style="width: 385px; margin-right: 20px;">
              <div class="head">
                <div class="ico">진행</div>
                <dl>
                  <dt>마감일</dt>
                  <dd>2023-07-21</dd>
                </dl>
              </div>
              <div class="cont">
                <div class="txt">[공고] 2023 K-AAM eVTOL 기술개발 경연대회 참가자 모집</div>
                <div class="date">
                  <i class="axi axi-clock" aria-hidden="true"></i>
                  <p>
                    2023-07-10 00:00:00 ~<br>
                    2023-07-21 00:00:00
                  </p>
                </div>
              </div>
            </a>
            <a href="#" class="box swiper-slide" style="width: 385px; margin-right: 20px;">
              <div class="head">
                <div class="ico">진행</div>
                <dl>
                  <dt>마감일</dt>
                  <dd>2023-12-31</dd>
                </dl>
              </div>
              <div class="cont">
                <div class="txt">옛 대한방직 부지관련 시민공론화 옛 대한방직 부지관련 시민공론화 옛 대한방직 부지관련 시민공론화옛 대한방직 부지관련 시민공론화 옛 대한방직 부지관련 시민공론화</div>
                <div class="date">
                  <i class="axi axi-clock" aria-hidden="true"></i>
                  <p>
                    2023-07-24 00:00:00 ~<br>
                    2023-07-24 00:00:00
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>

    <div id="sns">
      <div class="inner">
        <div class="lef">
          <ul class="sns">
            <li><a href="https://www.facebook.com/CAMTIC4U" target='_blank'><span>페이스북</span></a></li>
            <li><a href="https://www.instagram.com/camtic4u/?utm_medium=copy_link" target='_blank'><span>인스타그램</span></a></li>
            <li><a href="https://pf.kakao.com/_Txmjps" target='_blank' class="kakao"><span>카카오톡</span></a></li>
          </ul>
          <dl class="tit">
            <dt>캠틱종합기술원</dt>
            <dd>SNS 소식</dd>
          </dl>
          <div class="cont">
            <button type="button" class="prev">이전</button>
            <button type="button" class="next">다음</button>
          </div>
        </div>
        <div class="rig">
          <div class="roll">
            <div class="swiper-wrapper">

              <a href="#" class="swiper-slide">
                <div class="img"><i style="background-image:url(https://fakeimg.pl/340x255);"></i></div>
                <div class="info">
                  <p class="date">2023-01-20 오전 11:09</p>
                  <p class="subject">캠틱종합기술원 뉴스레터 e-캠틱종합기술원 뉴스레터 e-NAR 캠틱종합기술원 뉴스레터 e-NAR</p>
                  <p class="sum">
                    함께 성장하는 행복한 일터 캠틱종합기술원의 소식을 전합니다
                    함께 성장하는 행복한 일터 캠틱종합기술원의 소식을 전합니다
                  </p>
                  <p class="sns"><span class="kakao">카카오톡</span></p>
                </div>
              </a>

              <a href="#" class="swiper-slide">
                <div class="img"><i style="background-image:url(https://fakeimg.pl/340x255);"></i></div>
                <div class="info">
                  <p class="date">2023-01-20 오전 11:09</p>
                  <p class="subject">캠틱종합기술원 뉴스레터 e-캠틱종합기술원 뉴스레터 e-NAR 캠틱종합기술원 뉴스레터 e-NAR</p>
                  <p class="sum">
                    함께 성장하는 행복한 일터 캠틱종합기술원의 소식을 전합니다
                    함께 성장하는 행복한 일터 캠틱종합기술원의 소식을 전합니다
                  </p>
                  <p class="sns"><span class="face">페이스북</span></p>
                </div>
              </a>

              <a href="#" class="swiper-slide">
                <div class="img"><i style="background-image:url(https://fakeimg.pl/340x255);"></i></div>
                <div class="info">
                  <p class="date">2023-01-20 오전 11:09</p>
                  <p class="subject">캠틱종합기술원 뉴스레터 e-캠틱종합기술원 뉴스레터 e-NAR 캠틱종합기술원 뉴스레터 e-NAR</p>
                  <p class="sum">
                    함께 성장하는 행복한 일터 캠틱종합기술원의 소식을 전합니다
                    함께 성장하는 행복한 일터 캠틱종합기술원의 소식을 전합니다
                  </p>
                  <p class="sns"><span class="insta">인스타그램</span></p>
                </div>
              </a>

              <a href="#" class="swiper-slide">
                <div class="img"><i style="background-image:url(https://fakeimg.pl/340x255);"></i></div>
                <div class="info">
                  <p class="date">2023-01-20 오전 11:09</p>
                  <p class="subject">캠틱종합기술원 뉴스레터 e-캠틱종합기술원 뉴스레터 e-NAR 캠틱종합기술원 뉴스레터 e-NAR</p>
                  <p class="sum">
                    함께 성장하는 행복한 일터 캠틱종합기술원의 소식을 전합니다
                    함께 성장하는 행복한 일터 캠틱종합기술원의 소식을 전합니다
                  </p>
                  <p class="sns"><span class="kakao">카카오톡</span></p>
                </div>
              </a>

              <a href="#" class="swiper-slide">
                <div class="img"><i style="background-image:url(https://fakeimg.pl/340x255);"></i></div>
                <div class="info">
                  <p class="date">2023-01-20 오전 11:09</p>
                  <p class="subject">캠틱종합기술원 뉴스레터 e-캠틱종합기술원 뉴스레터 e-NAR 캠틱종합기술원 뉴스레터 e-NAR</p>
                  <p class="sum">
                    함께 성장하는 행복한 일터 캠틱종합기술원의 소식을 전합니다
                    함께 성장하는 행복한 일터 캠틱종합기술원의 소식을 전합니다
                  </p>
                  <p class="sns"><span class="face">페이스북</span></p>
                </div>
              </a>

              <a href="#" class="swiper-slide">
                <div class="img"><i style="background-image:url(https://fakeimg.pl/340x255);"></i></div>
                <div class="info">
                  <p class="date">2023-01-20 오전 11:09</p>
                  <p class="subject">캠틱종합기술원 뉴스레터 e-캠틱종합기술원 뉴스레터 e-NAR 캠틱종합기술원 뉴스레터 e-NAR</p>
                  <p class="sum">
                    함께 성장하는 행복한 일터 캠틱종합기술원의 소식을 전합니다
                    함께 성장하는 행복한 일터 캠틱종합기술원의 소식을 전합니다
                  </p>
                  <p class="sns"><span class="insta">인스타그램</span></p>
                </div>
              </a>

              <a href="#" class="swiper-slide">
                <div class="img"><i style="background-image:url(https://fakeimg.pl/340x255);"></i></div>
                <div class="info">
                  <p class="date">2023-01-20 오전 11:09</p>
                  <p class="subject">캠틱종합기술원 뉴스레터 e-캠틱종합기술원 뉴스레터 e-NAR 캠틱종합기술원 뉴스레터 e-NAR</p>
                  <p class="sum">
                    함께 성장하는 행복한 일터 캠틱종합기술원의 소식을 전합니다
                    함께 성장하는 행복한 일터 캠틱종합기술원의 소식을 전합니다
                  </p>
                  <p class="sns"><span class="kakao">카카오톡</span></p>
                </div>
              </a>

              <a href="#" class="swiper-slide">
                <div class="img"><i style="background-image:url(https://fakeimg.pl/340x255);"></i></div>
                <div class="info">
                  <p class="date">2023-01-20 오전 11:09</p>
                  <p class="subject">캠틱종합기술원 뉴스레터 e-캠틱종합기술원 뉴스레터 e-NAR 캠틱종합기술원 뉴스레터 e-NAR</p>
                  <p class="sum">
                    함께 성장하는 행복한 일터 캠틱종합기술원의 소식을 전합니다
                    함께 성장하는 행복한 일터 캠틱종합기술원의 소식을 전합니다
                  </p>
                  <p class="sns"><span class="face">페이스북</span></p>
                </div>
              </a>

              <a href="#" class="swiper-slide">
                <div class="img"><i style="background-image:url(https://fakeimg.pl/340x255);"></i></div>
                <div class="info">
                  <p class="date">2023-01-20 오전 11:09</p>
                  <p class="subject">캠틱종합기술원 뉴스레터 e-캠틱종합기술원 뉴스레터 e-NAR 캠틱종합기술원 뉴스레터 e-NAR</p>
                  <p class="sum">
                    함께 성장하는 행복한 일터 캠틱종합기술원의 소식을 전합니다
                    함께 성장하는 행복한 일터 캠틱종합기술원의 소식을 전합니다
                  </p>
                  <p class="sns"><span class="insta">인스타그램</span></p>
                </div>
              </a>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div id="ban">
    <div class="inner">
      <ul>
        <li><a href="http://mold.camtic.or.kr/main/" target="_blank"><img src="/images/camtic/img-main-ban1.png" alt="복합소재 뿌리기술센터"></a></li>
        <li><a href="http://maker.camtic.or.kr/main/" target="_blank"><img src="/images/camtic/img-main-ban2.png" alt="윙윙스테이션"></a></li>
        <li><a href="http://www.jhitech.or.kr/" target="_blank"><img src="/images/camtic/img-main-ban3.png" alt="전주첨단벤처단지"></a></li>
        <li><a href="http://drone.camtic.or.kr/main/" target="_blank"><img src="/images/camtic/img-main-ban4.png" alt="국토교통부지원 드론기술개발지원센터"></a></li>
      </ul>
    </div>
  </div>
  <jsp:include page="/WEB-INF/jsp/template/camtic/foot.jsp" flush="false"/>
</div>
<script>
  vis.init();
  snsMain.init();
  midMain.init();
</script>
</body>
</html>