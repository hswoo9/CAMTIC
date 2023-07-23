<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js'/>"></script>
<style>
  .subject{
    cursor: pointer;
  }
</style>

<jsp:include page="/WEB-INF/jsp/template/camtic/common.jsp" flush="false"/>


<body>
<div id="wrap">
  <jsp:include page="/WEB-INF/jsp/template/camtic/head.jsp" flush="false"/>
  <div id="sub">
    <div class="inner">
      <jsp:include page="/WEB-INF/jsp/template/camtic/lnb.jsp" flush="false"/>
      <div id="content">
        <jsp:include page="/WEB-INF/jsp/template/camtic/navi_title.jsp" flush="false"/>

        <div class="__topArea">
          <div class="total">전체 <strong><span id="totalCnt"></span></strong>건</div>
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
          <%--<tbody>
          <c:forEach var="list" items="${boardArticleList.list}" varStatus="status">
            <tr>
              <td>${status.count}</td>
              <td class="subject" onclick="fn_detailBoard('${list.BOARD_ARTICLE_ID}')"><a href="#" onclick="fn_detailBoard('${list.BOARD_ARTICLE_ID}')">${list.BOARD_ARTICLE_TITLE}</a></td>
              <td>${list.REG_EMP_NAME}</td>
              <td>
                <fmt:parseDate value="${list.REG_DATE}" pattern="yyyy-MM-dd'T'HH:mm" var="regDate" type="both"></fmt:parseDate>
                <fmt:formatDate value="${regDate}" pattern="yyyy-MM-dd"></fmt:formatDate>
              </td>
              <td>${list.BOARD_ARTICLE_VIEW_COUNT}</td>
            </tr>
          </c:forEach>
          </tbody>--%>

          <tbody id="tableBody">
          </tbody>
        </table>
        <div class="__botArea">
          <div class="cen">
            <%--<div class="__paging">
              <a href="#" class="arr prev"><span class="hide">이전 페이지</span></a>
              <strong class="num active">1</strong>
              <a href="#" class="num">2</a>
              <a href="#" class="num">3</a>
              <a href="#" class="num">4</a>
              <a href="#" class="num">5</a>
              <a href="#" class="arr next"><span class="hide">다음 페이지</span></a>
            </div>--%>

            <div class="__paging">

            </div>

            <div class="rig">
              <a href="/camtic/news/write.do" class="__btn1 blue"><span>게시글 작성</span></a>
            </div>


          </div>
        </div>

      </div>
    </div>
  </div>
  <jsp:include page="/WEB-INF/jsp/template/camtic/foot.jsp" flush="false"/>
</div>

<%--<input type="hidden" id="total" value="${pagination.totalRecordCount}" />--%>
<script>
  var categoryKey = "notice";
  var globalData = fn_customAjax('/board/getBoardArticleList.do?categoryId=' + categoryKey,'');

  var paginationData = globalData.articlePage.pagination;
  var startPage = paginationData.startPage;
  var endPage = paginationData.endPage;
  var page = globalData.articlePage.page;
  var total = globalData.articlePage.pagination.totalRecordCount;

  var data = globalData.boardArticleList.list;
  $(function () {
    $("#totalCnt").text(total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));

    drawPage();
    drawTable(data);
  });

  function fn_detailBoard(key){

    location.href="/camtic/news/view.do?boardArticleId=" + key + "&category=" + categoryKey;
  }

  function drawTable(data) {
    //const tableBody = document.getElementById("tableBody");
    let html = "";

    data.forEach((item, index) => {
      html += "<tr>";
      html += '<td>'+ (index + 1) +'</td>';
      html += '<td class="subject" onclick="fn_detailBoard('+item.board_ARTICLE_ID+')"><a href="#" onclick="fn_detailBoard('+item.board_ARTICLE_ID+')">'+ item.board_ARTICLE_TITLE +'</a></td>';
      html += '<td>'+ item.reg_EMP_NAME +'</td>';

      const formattedMonth = String(item.reg_DATE.monthValue).padStart(2, '0');
      const formattedDay = String(item.reg_DATE.dayOfMonth).padStart(2, '0');

      html += '<td>'+ item.reg_DATE.year +'-'+ formattedMonth +'-'+ formattedDay +'</td>';

      html += '<td>'+ item.board_ARTICLE_VIEW_COUNT +'</td>';
      html += "</tr>";
    });

    /*tableBody.innerHTML = html;*/
    $("#tableBody").append(html);
  }


   function drawPage(){
    /*if ( !pagination || !params ) {
      document.querySelector('.paging').innerHTML = '';
      throw new Error('Missing required parameters...');
    }*/

    let html = '';
    html += '<a href="javascript:void(0);" onclick="movePage(' + (page - 1) + ')" class="arr prev"><span class="hide">이전 페이지</span></a>';

    for (let i =startPage; i <= endPage; i++) {
      html += (i !== page)
              ? '<a href="javascript:void(0);" class="num" onclick="movePage('+i+');">'+ i +'</a>'
              : '<strong class="num actiove">' + i + '</strong>'
    }

    html += '<a href="javascript:void(0);" onclick="movePage(' + (page + 1) + ');" class="arr next"><span class="hide">다음 페이지</span></a>';
    $(".__paging").html(html);
  }

   function movePage(page){
    const queryParams = {
      page: (page) ? page : 1,
      recordSize: 20,
      pageSize: 10
    }
     fn_customAjax("/board/getBoardArticleList.do?" + new URLSearchParams(queryParams).toString() + "&categoryId=" + categoryKey, "");
  }

  function fn_customAjax(url, data){
    var result;

    $.ajax({
      url : url,
      data : data,
      type : "post",
      dataType : "json",
      async : false,
      success : function(rs) {
        result = rs;
        result.flag = true;
      },
      error :function (e) {
        result.flag = false;
        console.log('error : ', e);
      }
    });

    return result;
  }
</script>

</body>
