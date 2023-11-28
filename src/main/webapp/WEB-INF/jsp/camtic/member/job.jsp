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
            <col style="width:70px;"/>
            <col style="width:250px;"/>
            <col style="width:100px;"/>
            <col style="width:100px;"/>
          </colgroup>
          <thead>
          <tr>
            <th scope="col">번호</th>
            <th scope="col">공고명</th>
            <th scope="col">작성자</th>
            <th scope="col">모집기간</th>
            <th scope="col">상태</th>
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
          </div>
        </div>

      </div>
    </div>
  </div>
  <jsp:include page="/WEB-INF/jsp/template/camtic/foot.jsp" flush="false"/>
</div>

<script>

  var firstData = fn_customAjax('/board/getRecruitmentList?recordSize=10', '');

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
  //상세보기 이동
  function fn_detailBoard(key){

    location.href="/camtic/member/job_view.do?recruitInfoSn=" + key;
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
    var result = fn_customAjax("/board/getRecruitmentList.do?" + new URLSearchParams(queryParams).toString() + "&recordSize=10", "");
    flag = true;

    dataChk(result, flag);
    drawTable(result.boardArticleList.list);
    console.log(drawTable);
    drawPage();
  }

  //게시글 리스트 그리기
  function drawTable(data) {

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
      html += '<td class="subject"><a href="#" onclick="fn_detailBoard('+ item.recruit_INFO_SN +')">'+ item.recruit_TITLE +'</a></td>';
      html += '<td>'+ item.reg_EMP_NAME +'</td>';
      /*var datetimeParts = item.reg_DT.split(' ');
      var datePart = datetimeParts[0];*/
      html += '<td>' + item.start_DT + ' ~ ' + item.end_DT + '</td>';
      if(item.recruit_STATUS_SN == 'E') {
        html += '<td>' + item.recruit_STATUS_TEXT + '</td>';
      }else if(item.recruit_STATUS_SN == '3' || item.recruit_STATUS_SN == '4' ) {
        html += '<td>심사중</td>';
      }else if(item.recruit_STATUS_SN == '2'){
        html += '<td>접수중</td>';
      }
      html += '<td>' + item.recruit_VIEW_COUNT + '</td>';
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
    var result = fn_customAjax('/board/getRecruitmentList?recordSize=10&searchInput=' + encodeURI(inputText, "UTF-8"),'');

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
</html>