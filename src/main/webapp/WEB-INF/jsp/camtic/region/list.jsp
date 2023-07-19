<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<jsp:include page="/WEB-INF/jsp/template/camtic/common.jsp" flush="false"/>
</head>

<body>
<div id="wrap">
  <jsp:include page="/WEB-INF/jsp/template/camtic/head.jsp" flush="false"/>
  <div id="sub">
    <div class="inner">
      <jsp:include page="/WEB-INF/jsp/template/camtic/lnb.jsp" flush="false"/>
      <div id="content">
        <jsp:include page="/WEB-INF/jsp/template/camtic/navi_title.jsp" flush="false"/>

        <a href="./info.do" class="__ipjHead">
          <dl>
            <dt><span>입주절차안내</span></dt>
            <dd>입주에 대한 문의 및 절차 서류등 필요한 자료들입니다.</dd>
          </dl>
        </a>

        <div class="__ipjTab __mt40">
          <a href="#" class="active">전체</a>
          <a href="#">전주첨단벤처단지</a>
          <a href="#">입주기관 및 유관기관</a>
        </div>
        <div class="__ipjSch">
          <div class="result">총 <strong>60</strong>개의 기업이 있습니다.</div>
          <form class="sch">
            <select name="" id="">
              <option>업체명</option>
            </select>
            <input type="text">
            <button type="submit" class="hide">검색</button>
            <button type="reset">검색초기화</button>
            <a href="#">엑셀파일</a>
          </form>
        </div>

        <div class="__ipjList">
          <a href="./view.do" class="box">
            <div class="img"><span><i style="background-image:url(https://fakeimg.pl/218x108);"></i></span></div>
            <div class="info">
              <p class="subject">
                <span class="ho">1동 202호</span>
                <strong>전라북도</strong>
              </p>
              <ul class="sum">
                <li>대표자명 : 최성현</li>
                <li>전화번호 : 063-280-2114</li>
                <li>주요상품 : 핸드폰 무선송신기</li>
              </ul>
            </div>
          </a>
          <a href="./view.do" class="box">
            <div class="img"><span><i style="background-image:url(https://fakeimg.pl/218x108);"></i></span></div>
            <div class="info">
              <p class="subject">
                <span class="ho">1동 202호</span>
                <strong>전라북도</strong>
              </p>
              <ul class="sum">
                <li>대표자명 : 최성현</li>
                <li>전화번호 : 063-280-2114</li>
                <li>주요상품 : 핸드폰 무선송신기</li>
              </ul>
            </div>
          </a>
          <a href="./view.do" class="box">
            <div class="img"><span><i style="background-image:url(https://fakeimg.pl/218x108);"></i></span></div>
            <div class="info">
              <p class="subject">
                <span class="ho">1동 202호</span>
                <strong>전라북도</strong>
              </p>
              <ul class="sum">
                <li>대표자명 : 최성현</li>
                <li>전화번호 : 063-280-2114</li>
                <li>주요상품 : 핸드폰 무선송신기</li>
              </ul>
            </div>
          </a>
          <a href="./view.do" class="box">
            <div class="img"><span><i style="background-image:url(https://fakeimg.pl/218x108);"></i></span></div>
            <div class="info">
              <p class="subject">
                <span class="ho">1동 202호</span>
                <strong>전라북도</strong>
              </p>
              <ul class="sum">
                <li>대표자명 : 최성현</li>
                <li>전화번호 : 063-280-2114</li>
                <li>주요상품 : 핸드폰 무선송신기</li>
              </ul>
            </div>
          </a>
          <a href="./view.do" class="box">
            <div class="img"><span><i style="background-image:url(https://fakeimg.pl/218x108);"></i></span></div>
            <div class="info">
              <p class="subject">
                <span class="ho">1동 202호</span>
                <strong>전라북도</strong>
              </p>
              <ul class="sum">
                <li>대표자명 : 최성현</li>
                <li>전화번호 : 063-280-2114</li>
                <li>주요상품 : 핸드폰 무선송신기</li>
              </ul>
            </div>
          </a>
        </div>

        <div class="__botArea">
          <div class="cen">
            <div class="__paging">
              <a href="#" class="arr prev"><span class="hide">이전 페이지</span></i></a>
              <strong class="num active">1</strong>
              <a href="#" class="num">2</a>
              <a href="#" class="num">3</a>
              <a href="#" class="arr next"><span class="hide">다음 페이지</span></i></a>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
  <jsp:include page="/WEB-INF/jsp/template/camtic/foot.jsp" flush="false"/>
</div>
</body>
</html>