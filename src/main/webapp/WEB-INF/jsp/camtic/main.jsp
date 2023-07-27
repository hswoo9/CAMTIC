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

  <a href="#" id="alarm">주요 알림 맞춤서비스</a>

  <aside id="aside">
    <a href="/camtic" class="aside1">첫화면</a>
    <a href="/camtic/news/commonBoard.do?categoryKey=notice" class="aside2">공지</a>
    <%--<a href="#" class="aside3">SNS</a>--%>
    <a href="#" class="aside4">채용<br>공고</a>
    <a href="#" class="aside5">장비<br>사용</a>
    <a href="#wrap" class="aside6 _gotop">TOP</a>
  </aside>

  <div id="content">
    <div id="vis">
      <div class="lef">
        <div class="tit">
          <dl>
            <dt>기업과 함께 성장하는 캠틱종합기술원</dt>
            <dd>
              창업 - 혁신 - 성장<br>
              제조창업플랫폼
            </dd>
          </dl>
          <p><span>J - Valley</span></p>
        </div>
        <div class="roll2">
          <div class="swiper-wrapper">
            <div class="box swiper-slide" style="background-image:url(/images/camtic/main1-2.png);"></div>
            <div class="box swiper-slide" style="background-image:url(/images/camtic/main1-3.png);"></div>
            <div class="box swiper-slide" style="background-image:url(/images/camtic/main1-4.png);"></div>
            <div class="box swiper-slide" style="background-image:url(/images/camtic/main1-1.png);"></div>
          </div>
        </div>
      </div>
      <div class="rig">
        <div class="roll">
          <div class="swiper-wrapper">
            <%--<div class="vis vis1 swiper-slide" style="background-image:url(/images/camtic/vis1.jpg);">--%>
            <div class="vis vis1 swiper-slide" style="background-image:url(/images/camtic/main1-1.png);">
            </div>
            <div class="vis vis1 swiper-slide" style="background-image:url(/images/camtic/main1-2.png);">
            </div>
            <div class="vis vis1 swiper-slide" style="background-image:url(/images/camtic/main1-3.png);">
            </div>
            <div class="vis vis1 swiper-slide" style="background-image:url(/images/camtic/main1-4.png);">
            </div>
          </div>
        </div>
      </div>
      <div class="cont">
        <span class="now">01</span>
        <div class="bar"></div>
        <span class="max">03</span>
        <button type="button" class="auto"><span class="hide">PLAY</span><i class="axi axi-pause2" aria-hidden="true"></i></button>
      </div>
      <div class="scr"><span>SCROLL</span></div>
    </div>

    <div id="mid">
      <div class="inner">
        <div class="lef">
          <ul class="tab">
            <li class="active"><button type="button" id="tab1" role="tab" aria-controls="tab-panel1" aria-selected="true">공지사항</button></li>
            <li><button type="button" role="tab" id="tab2" aria-controls="tab-panel2" aria-selected="false">사업공고</button></li>
            <li><button type="button" role="tab" id="tab3" aria-controls="tab-panel3" aria-selected="false">채용공고</button></li>
          </ul>
          <div class="area">
            <div class="item active" id="tab-panel1" role="tabpanel" aria-labelledby="tab1" aria-selected="true">
              <div class="sec notice">
                <a href="#" class="box">
                  <p class="subject">2022년 수요맞춤형 드론산업 육성지원 사업 사업화지원 4차 수요맞춤형 드론산업 육성지원 사업 사업화지원 4차</p>
                  <p class="sum">
                    전라북도에 소재한 기업을 대상으로 다음과 같이 『2022년 수요맞춤형 드론산업 육성 지원사업』 시행계획을
                    전라북도에 소재한 기업을 대상으로 다음과 같이 『2022년 수요맞춤형 드론산업 육성 지원사업』 시행계획을
                  </p>
                  <p class="date">2023-01-04</p>
                </a>
                <a href="#" class="box">
                  <p class="subject">2022년 수요맞춤형 드론산업 육성지원 사업 사업화지원 4차 수요맞춤형 드론산업 육성지원 사업 사업화지원 4차</p>
                  <p class="sum">
                    전라북도에 소재한 기업을 대상으로 다음과 같이 『2022년 수요맞춤형 드론산업 육성 지원사업』 시행계획을
                    전라북도에 소재한 기업을 대상으로 다음과 같이 『2022년 수요맞춤형 드론산업 육성 지원사업』 시행계획을
                  </p>
                  <p class="date">2023-01-04</p>
                </a>
                <a href="#" class="box">
                  <p class="subject">2022년 수요맞춤형 드론산업 육성지원 사업 사업화지원 4차 수요맞춤형 드론산업 육성지원 사업 사업화지원 4차</p>
                  <p class="sum">
                    전라북도에 소재한 기업을 대상으로 다음과 같이 『2022년 수요맞춤형 드론산업 육성 지원사업』 시행계획을
                    전라북도에 소재한 기업을 대상으로 다음과 같이 『2022년 수요맞춤형 드론산업 육성 지원사업』 시행계획을
                  </p>
                  <p class="date">2023-01-04</p>
                </a>
              </div>
              <a href="/camtic/news/commonBoard.do?categoryKey=notice" class="more">+ 더보기</a>
            </div>
            <div class="item" id="tab-panel2" role="tabpanel" aria-labelledby="tab2" aria-selected="false">
              <div class="sec">
                <a href="#" class="box">
                  <div class="ddakji ing"><span>진행중</span></div>
                  <p class="subject">2222 수요맞춤형 드론산업 육성지원 사업 사업화지원 4차 수요맞춤형 드론산업 육성지원 사업 사업화지원 4차</p>
                  <p class="sum">
                    전라북도에 소재한 기업을 대상으로 다음과 같이 『2022년 수요맞춤형 드론산업 육성 지원사업』 시행계획을
                    전라북도에 소재한 기업을 대상으로 다음과 같이 『2022년 수요맞춤형 드론산업 육성 지원사업』 시행계획을
                  </p>
                  <p class="date">2023-01-04</p>
                </a>
                <a href="#" class="box">
                  <div class="ddakji end"><span>완료</span></div>
                  <p class="subject">222 수요맞춤형 드론산업 육성지원 사업 사업화지원 4차 수요맞춤형 드론산업 육성지원 사업 사업화지원 4차</p>
                  <p class="sum">
                    전라북도에 소재한 기업을 대상으로 다음과 같이 『2022년 수요맞춤형 드론산업 육성 지원사업』 시행계획을
                    전라북도에 소재한 기업을 대상으로 다음과 같이 『2022년 수요맞춤형 드론산업 육성 지원사업』 시행계획을
                  </p>
                  <p class="date">2023-01-04</p>
                </a>
                <a href="#" class="box">
                  <div class="ddakji ing"><span>진행중</span></div>
                  <p class="subject">222 수요맞춤형 드론산업 육성지원 사업 사업화지원 4차 수요맞춤형 드론산업 육성지원 사업 사업화지원 4차</p>
                  <p class="sum">
                    전라북도에 소재한 기업을 대상으로 다음과 같이 『2022년 수요맞춤형 드론산업 육성 지원사업』 시행계획을
                    전라북도에 소재한 기업을 대상으로 다음과 같이 『2022년 수요맞춤형 드론산업 육성 지원사업』 시행계획을
                  </p>
                  <p class="date">2023-01-04</p>
                </a>
              </div>
              <a href="/camtic/news/business.do" class="more">+ 더보기</a>
            </div>
            <div class="item" id="tab-panel3" role="tabpanel" aria-labelledby="tab3" aria-selected="false">
              <div class="sec">
                <a href="#" class="box">
                  <div class="ddakji ing"><span>진행중</span></div>
                  <p class="subject">333 수요맞춤형 드론산업 육성지원 사업 사업화지원 4차 수요맞춤형 드론산업 육성지원 사업 사업화지원 4차</p>
                  <p class="sum">
                    전라북도에 소재한 기업을 대상으로 다음과 같이 『2022년 수요맞춤형 드론산업 육성 지원사업』 시행계획을
                    전라북도에 소재한 기업을 대상으로 다음과 같이 『2022년 수요맞춤형 드론산업 육성 지원사업』 시행계획을
                  </p>
                  <p class="date">2023-01-04</p>
                </a>
                <a href="#" class="box">
                  <div class="ddakji end"><span>완료</span></div>
                  <p class="subject">333 수요맞춤형 드론산업 육성지원 사업 사업화지원 4차 수요맞춤형 드론산업 육성지원 사업 사업화지원 4차</p>
                  <p class="sum">
                    전라북도에 소재한 기업을 대상으로 다음과 같이 『2022년 수요맞춤형 드론산업 육성 지원사업』 시행계획을
                    전라북도에 소재한 기업을 대상으로 다음과 같이 『2022년 수요맞춤형 드론산업 육성 지원사업』 시행계획을
                  </p>
                  <p class="date">2023-01-04</p>
                </a>
                <a href="#" class="box">
                  <div class="ddakji ing"><span>진행중</span></div>
                  <p class="subject">333 수요맞춤형 드론산업 육성지원 사업 사업화지원 4차 수요맞춤형 드론산업 육성지원 사업 사업화지원 4차</p>
                  <p class="sum">
                    전라북도에 소재한 기업을 대상으로 다음과 같이 『2022년 수요맞춤형 드론산업 육성 지원사업』 시행계획을
                    전라북도에 소재한 기업을 대상으로 다음과 같이 『2022년 수요맞춤형 드론산업 육성 지원사업』 시행계획을
                  </p>
                  <p class="date">2023-01-04</p>
                </a>
              </div>
              <a href="#" class="more">+ 더보기</a>
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

    <div id="ban">
      <div class="inner">
        <ul>
          <li><a href="http://mold.camtic.or.kr/main/" target='_blank'><img src="/images/camtic/img-main-ban1.png" alt="복합소재 뿌리기술센터"></a></li>
          <li><a href="http://maker.camtic.or.kr/main/" target='_blank'><img src="/images/camtic/img-main-ban2.png" alt="윙윙스테이션"></a></li>
          <li><a href="http://www.jhitech.or.kr/" target='_blank'><img src="/images/camtic/img-main-ban3.png" alt="전주첨단벤처단지"></a></li>
          <li><a href="http://drone.camtic.or.kr/main/" target='_blank'><img src="/images/camtic/img-main-ban4.png" alt="국토교통부지원 드론기술개발지원센터"></a></li>
        </ul>
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

  <jsp:include page="/WEB-INF/jsp/template/camtic/foot.jsp" flush="false"/>
</div>
<script>
  vis.init();
  snsMain.init();
  midMain.init();
</script>
</body>
</html>