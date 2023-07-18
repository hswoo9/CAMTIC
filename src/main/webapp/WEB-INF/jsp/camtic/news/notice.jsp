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

        <div class="__topArea">
          <div class="total">전체 <strong>1,450</strong>건</div>
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
          <tr>
            <td>99999</td>
            <td class="subject"><a href="./view.do">이영 중소벤처기업부 장관, 전주첨단공지사항은 글줄이길어지면 전주첨단공지사항은 글줄이길어지면 전주첨단공지사항은 글줄이길어지면 전주첨단공지사항은 글줄이길어지면</a></td>
            <td>관리자</td>
            <td>2023-06-14</td>
            <td>99999</td>
          </tr>
          <tr>
            <td>99999</td>
            <td class="subject"><a href="./view.do">이영 중소벤처기업부 장관, 전주첨단공지사항은 글줄이길어지면 전주첨단공지사항은 글줄이길어지면 전주첨단공지사항은 글줄이길어지면 전주첨단공지사항은 글줄이길어지면</a></td>
            <td>관리자</td>
            <td>2023-06-14</td>
            <td>99999</td>
          </tr>
          <tr>
            <td>99999</td>
            <td class="subject"><a href="./view.do">이영 중소벤처기업부 장관, 전주첨단공지사항은 글줄이길어지면 전주첨단공지사항은 글줄이길어지면 전주첨단공지사항은 글줄이길어지면 전주첨단공지사항은 글줄이길어지면</a></td>
            <td>관리자</td>
            <td>2023-06-14</td>
            <td>99999</td>
          </tr>
          <tr>
            <td>99999</td>
            <td class="subject"><a href="./view.do">이영 중소벤처기업부 장관, 전주첨단공지사항은 글줄이길어지면 전주첨단공지사항은 글줄이길어지면 전주첨단공지사항은 글줄이길어지면 전주첨단공지사항은 글줄이길어지면</a></td>
            <td>관리자</td>
            <td>2023-06-14 </td>
            <td>99999</td>
          </tr>
          </tbody>
        </table>

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