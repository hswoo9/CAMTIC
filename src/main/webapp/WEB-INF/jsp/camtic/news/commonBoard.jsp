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
  .__tblList tr {height:62px;}
</style>

<jsp:include page="/WEB-INF/jsp/template/camtic/common.jsp" flush="false"/>


<body>
<div id="wrap">
  <jsp:include page="/WEB-INF/jsp/template/camtic/head.jsp" flush="false"/>
  <div id="sub">
    <div class="inner">
      <jsp:include page="/WEB-INF/jsp/template/camtic/lnb.jsp" flush="false"/>
      <div id="content">

        <ul id="navigation">
          <li><a href="/camtic"><img src="/images/camtic/home_3.png" class="homeImage">홈으로</a></li>
          <li class="">캠틱소식</li>
          <li class=""><span class="categoryName"></span></li>
        </ul>
        <div id="title">
          <h3><span class="categoryName"></span></h3>
        </div>

        <div class="__topArea">
          <div class="total">전체 <strong><span id="totalCnt"></span></strong>건</div>
          <form class="__sch">
            <div class="inp">
              <label for="inputText" class="hide">검색어 입력</label>
              <input type="text" id="inputText" placeholder="검색어를 입력하세요" onkeydown="searchOnEnter(event);">
              <button type="button">검색</button>
            </div>
          </form>
        </div>

        <table class="__tblList respond1">
          <caption>공지사항 게시판</caption>
          <colgroup>
            <c:choose>
              <c:when test="${categoryKey eq 'business'}">
                <col style="width:100px;"/>
                <col/>
                <col style="width:100px;"/>
                <col style="width:100px;"/>
                <col style="width:100px;"/>
                <col style="width:150px;"/>
                <col style="width:100px;"/>
              </c:when>
              <c:otherwise>
                <col style="width:100px;"/>
                <col/>
                <col style="width:100px;"/>
                <col style="width:100px;"/>
                <col style="width:150px;"/>
                <col style="width:100px;"/>
              </c:otherwise>
            </c:choose>


          </colgroup>
          <thead>
          <tr>
            <th scope="col">번호</th>
            <th scope="col">제목</th>
            <th scope="col">첨부파일</th>
            <c:if test="${categoryKey eq 'business'}"><th scope="col">사업상태</th></c:if>
            <th scope="col">작성자</th>
            <th scope="col">작성일</th>
            <th scope="col">조회수</th>
          </tr>
          </thead>

          <tbody id="tableBody">
          </tbody>
        </table>
        <div class="__botArea">
          <div class="cen">
            <div class="__paging">

            </div>

            <c:if test="${loginVO.uniqId eq '1'}">
              <div class="rig">
                <a href="javascript:void(0);" onclick="fn_writeBoard();" class="__btn1 blue" style="min-width:100px;height:40px;font-size:15px;"><span>게시글 작성</span></a>
              </div>
            </c:if>

          </div>
        </div>

      </div>
    </div>
  </div>
  <jsp:include page="/WEB-INF/jsp/template/camtic/foot.jsp" flush="false"/>
</div>

<input type="hidden" id="category" value="${categoryKey}" />
<script>
  var categoryKey = $("#category").val();
  var inputText = $("#inputText").val();

  var firstData = fn_customAjax('/board/getBoardArticleList.do?categoryId=' + categoryKey + '&recordSize=10','');
  var flag = false;

  var paginationData;
  var startPage;
  var endPage;
  var page;
  var total = firstData.articlePage.pagination.totalRecordCount;

  /** 최초의 데이터와 페이지 이동할 때의 데이터 구분 */
  function dataChk(e, f) {
    if(flag == false){
      paginationData = firstData.articlePage.pagination;
      startPage = paginationData.startPage;
      endPage = paginationData.endPage;
      page = firstData.articlePage.page;
    }else if(flag == true){
      paginationData = e.articlePage.pagination;
      startPage = paginationData.startPage;
      endPage = paginationData.endPage;
      page = e.articlePage.page;
    }
  }

  var data = firstData.boardArticleList.list;
  $(function () {
    if(categoryKey == "notice"){
      $(".categoryName").text("공지사항");
    }else if(categoryKey == "business"){
      $(".categoryName").text("사업공고");
    }else if(categoryKey == "study"){
      $(".categoryName").text("교육/행사");
    }else if(categoryKey == "partner"){
      $(".categoryName").text("유관기관소식");
    }

    $("#totalCnt").text(total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));

    dataChk();

    drawPage();
    drawTable(data);
  });

  //작성 이동
  function fn_writeBoard(){

    location.href = '/camtic/news/write.do?category=' + categoryKey;
  }

  //상세보기 이동
  function fn_detailBoard(key){

    location.href="/camtic/news/view.do?boardArticleId=" + key + "&category=" + categoryKey;
  }


  /**
   * 페이지 이동
   * page : 페이지
   * recordSize : 리스트에 출력할 데이터 수
   * pageSize : 페이징 넘버 수
   * ArticlePage.java 참조
   * */
  function movePage(page){
    const queryParams = {
      page: (page) ? page : 1,
      recordSize: 10,
      pageSize: 10
    }
    var result = fn_customAjax("/board/getBoardArticleList.do?" + new URLSearchParams(queryParams).toString() + "&categoryId=" + categoryKey + '&recordSize=10&searchInput=' + inputText, "");

    flag = true;

    dataChk(result, flag);
    drawTable(result.boardArticleList.list);
    drawPage();
  }

  //게시글 리스트 그리기
  function drawTable(data) {
    if (data.length == 0) {
      document.querySelector('.__paging').innerHTML = '';
      $("#totalCnt").text(0);
      $("#tableBody").html('');
      return;
    }
    $("#tableBody").html('');

    let html = "";

    let num = total + 1;

    if(page != 1){
      num = num - ((page - 1) * 10);
    }
    data.forEach((item, index) => {
      num = num - 1;

      html += "<tr>";
      html += '<td>'+ (num) +'</td>';
      html += '<td class="subject" onclick="fn_detailBoard('+item.board_ARTICLE_ID+')"><a href="#" onclick="fn_detailBoard('+item.board_ARTICLE_ID+')">'+ item.board_ARTICLE_TITLE +'</a></td>';
      if(item.file_YN != 'N'){
        html += '<td><img src="/images/camtic/ico-drone5-1.png" style="filter: opacity(0.5) drop-shadow(0 0 0 #666);"></td>';
      }else{
        html += '<td></td>';
      }

      if(item.board_ID == 'business'){
        html += '<td>'+ item.state +'</td>';
      }

      html += '<td>'+ item.reg_EMP_NAME +'</td>';

      const formattedMonth = String(item.reg_DATE.monthValue).padStart(2, '0');
      const formattedDay = String(item.reg_DATE.dayOfMonth).padStart(2, '0');

      html += '<td>'+ item.reg_DATE.year +'-'+ formattedMonth +'-'+ formattedDay +'</td>';

      html += '<td>'+ item.board_ARTICLE_VIEW_COUNT +'</td>';
      /*html += '<td></td>';*/
      html += "</tr>";
    });

    /*tableBody.innerHTML = html;*/
    $("#tableBody").append(html);
  }

  //페이징 그리기
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
              : '<strong class="num active">' + i + '</strong>'
    }

    html += '<a href="javascript:void(0);" onclick="movePage(' + (page + 1) + ');" class="arr next"><span class="hide">다음 페이지</span></a>';
    $(".__paging").html(html);
  }

  function searchOnEnter(event) {
    if (event.key === "Enter") {
      event.preventDefault(); // Enter 키의 기본 동작 방지
      fn_searchInput(); // 검색 함수 호출
    }
  }

  function fn_searchInput(){
    inputText = $("#inputText").val();
    var result = fn_customAjax('/board/getBoardArticleList.do?categoryId=' + categoryKey + '&recordSize=10' + '&searchInput=' + encodeURI(inputText, "UTF-8"),'');

    flag = true;

    if(result.articlePage.pagination != null){
      dataChk(result);
      drawPage();
    }
    drawTable(result.boardArticleList.list);

    $("#totalCnt").text(result.articlePage.pagination.totalRecordCount);
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
