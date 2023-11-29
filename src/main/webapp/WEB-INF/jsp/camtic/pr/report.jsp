<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<jsp:include page="/WEB-INF/jsp/template/camtic/common.jsp" flush="false"/>
</head>
<style>
  .__galListhead{display: flex; flex-wrap: wrap; gap: 90px 26px;}
  .__galListhead .boxHead{display: block; width: calc((100% / 2) - (52px / 4)); border: 1px solid #ccc;}
  .__galListhead .boxHead .info{padding: 25px 15px 20px;}
  .__galListhead .boxHead .info .subject{font-size: 18px; line-height: 1.35; height: 2.7em; display: -webkit-box; word-wrap: break-word;
    -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis; color: #252525; font-weight: 500; letter-spacing: -0.075em;}
  .__galListhead .boxHead .info .content{font-size: 15px; line-height:20px; color: #555;}

  @media (max-width: 1024px) {
    .__galListhead {gap: 10px;}
    .__galListhead .boxHead{width: calc((100% / 2) - (10px / 2));}
  }
</style>
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
              <label for="inputText" class="hide">검색어 입력</label>
              <input type="text" id="inputText" placeholder="검색어를 입력하세요" onkeydown="searchOnEnter(event);">
              <button type="button">검색</button>
            </div>
          </form>
        </div>

        <table class="__tblList respond1">
          <caption>공지사항 게시판</caption>
          <colgroup>
            <col style="width:100px;"/>
            <col/>
            <col style="width:100px;"/>
            <col style="width:100px;"/>
            <col style="width:150px;"/>
            <col style="width:100px;"/>

          </colgroup>
          <thead>
          <tr>
            <th scope="col">번호</th>
            <th scope="col">제목</th>
            <th scope="col">첨부파일</th>
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

<script>
  var categoryKey = "report";

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

    $("#totalCnt").text(total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));

    dataChk();

    drawPage();
    drawTable(data);
  });

  //작성 이동
  function fn_writeBoard(){

    location.href = '/camtic/pr/pr_write.do?category=' + categoryKey;
  }

  //상세보기 이동
  function fn_detailBoard(key){

    location.href="/camtic/pr/pr_view.do?boardArticleId=" + key + "&category=" + categoryKey;
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
    var result = fn_customAjax("/board/getBoardArticleList.do?" + new URLSearchParams(queryParams).toString() + "&categoryId=" + categoryKey + "&recordSize=10", "");

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
    //const tableBody = document.getElementById("tableBody");
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
      if(item.file_PATH){
        html += '<td><img src="/images/camtic/ico-drone5-1.png" style="filter: opacity(0.5) drop-shadow(0 0 0 #666);"></td>';
      }else{
        html += '<td></td>';
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