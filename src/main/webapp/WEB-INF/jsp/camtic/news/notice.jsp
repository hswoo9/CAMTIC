<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

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

        <div class="__topArea">
          <div class="total">전체 <strong>9,999</strong>건</div>
          <form class="__sch">
            <div class="inp">
              <label for="searchInput" class="hide">검색어 입력</label>
              <input type="text" id="searchInput" placeholder="검색어를 입력하세요">
              <button type="submit">검색</button>
            </div>
          </form>
        </div>

        <table class="__tblList respond1">
          <caption>공지사항 게시판</caption>
          <colgroup>
            <col style="width:100px;"/>
            <col/>
            <col style="width:100px;"/>
            <col style="width:150px;"/>
            <col style="width:100px;"/>
          </colgroup>
          <thead>
          <tr>
            <th scope="col">번호</th>
            <th scope="col">제목</th>
            <th scope="col">작성자</th>
            <th scope="col">작성일</th>
            <th scope="col">조회수</th>
          </tr>
          </thead>
          <tbody>
          <c:forEach var="list" items="${list.list}" varStatus="status">
            <tr>
              <td>${status.count}</td>
              <td class="subject"><a href="#" onclick="fn_detailBoard('${list.BOARD_ARTICLE_ID}')">${list.BOARD_ARTICLE_TITLE}</a></td>
              <td>${list.REG_EMP_NAME}</td>
              <td>
                <fmt:parseDate value="${list.REG_DATE}" pattern="yyyy-MM-dd'T'HH:mm" var="regDate" type="both"></fmt:parseDate>
                <fmt:formatDate value="${regDate}" pattern="yyyy-MM-dd"></fmt:formatDate>
              </td>
              <td>${list.BOARD_ARTICLE_VIEW_COUNT}</td>
            </tr>
          </c:forEach>
          </tbody>
        </table>
<script>
console.log('${list}');
</script>
        <div class="__botArea">
          <div class="cen">
            <div class="__paging">
              <a href="#" class="arr prev"><span class="hide">이전 페이지</span></a>
              <strong class="num active">1</strong>
              <a href="#" class="num">2</a>
              <a href="#" class="num">3</a>
              <a href="#" class="num">4</a>
              <a href="#" class="num">5</a>
              <a href="#" class="arr next"><span class="hide">다음 페이지</span></a>
            </div>

            <div class="rig">
              <a href="/camtic/news/register.do" class="__btn1 blue"><span>게시글 작성</span></a>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
  <jsp:include page="/WEB-INF/jsp/template/camtic/foot.jsp" flush="false"/>
</div>

<script>

  function fn_detailBoard(key){
    var category = "notice";

    location.href="/camtic/news/view.do?boardId=" + key + "&category=" + category;

  }
</script>
</body>
</html>