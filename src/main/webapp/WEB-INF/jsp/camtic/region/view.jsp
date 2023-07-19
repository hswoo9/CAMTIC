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

        <div class="__ipjView __mt80">
          <div class="img"><span><i style="background-image:url(https://fakeimg.pl/218x108);"></i></span></div>
          <div class="info">
            <table>
              <caption>입주기업 정보 표</caption>
              <colgroup>
                <col style="width:110px;">
                <col>
                <col style="width:110px;">
                <col>
              </colgroup>
              <tbody>
              <tr>
                <th scope="col">업체명</th>
                <td>전라북도</td>
                <th scope="col">대표자</th>
                <td>홍길동</td>
              </tr>
              <tr>
                <th scope="col">업종</th>
                <td>제조업</td>
                <th scope="col">주요상황</th>
                <td>전라북도 행정</td>
              </tr>
              <tr>
                <th scope="col">연락처</th>
                <td>063-280-2114</td>
                <th scope="col">입주층</th>
                <td>전층</td>
              </tr>
              <tr>
                <th scope="col">입주 호실</th>
                <td>410 <em>호</em></td>
                <th scope="col">홈페이지</th>
                <td><a href="https://www.jeonbuk.go.kr/index.jeonbuk" target="_blank">https://www.jeonbuk.go.kr/index.jeonbuk</a></td>
              </tr>
              <tr>
                <th scope="col">상세정보</th>
                <td colspan="3" class="content">
                  전라북도 기업에 대한 간략한 상세정보를 보여드립니다.
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="__botArea">
          <div class="rig">
            <a href="#" class="__btn1 blue"><span>목록</span></a>
          </div>
        </div>

      </div>
    </div>
  </div>
  <jsp:include page="/WEB-INF/jsp/template/camtic/foot.jsp" flush="false"/>
</div>
</body>
</html>