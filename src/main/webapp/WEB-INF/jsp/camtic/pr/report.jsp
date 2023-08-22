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

        <div class="__galListhead">

        </div>
        <div class="__galList" style="margin-top:15px;">

        </div>

        <div class="__botArea">
          <div class="cen">
            <div class="__paging">

            </div>

            <div class="rig">
              <a href="javascript:void(0);" onclick="fn_writeBoard();" class="__btn1 blue"><span>게시글 작성</span></a>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
  <jsp:include page="/WEB-INF/jsp/template/camtic/foot.jsp" flush="false"/>
</div>

<script>

  var categoryKey = "report";

  var firstData = fn_customAjax('/board/getBoardArticleList.do?categoryId=' + categoryKey + '&recordSize=5','');
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
      recordSize: 5,
      pageSize: 10
    }
    var result = fn_customAjax("/board/getBoardArticleList.do?" + new URLSearchParams(queryParams).toString() + "&categoryId=" + categoryKey + "&recordSize=5", "");

    flag = true;

    dataChk(result, flag);
    drawTable(result.boardArticleList.list);
    drawPage();
  }

  //게시글 리스트 그리기
  function drawTable(data) {
    $(".__galListhead").html('');
    $(".__galList").html('');

    let htmlHead = "";
    let html = "";

    data.forEach((item, index) => {
      if(index == 0){
        htmlHead += "<div class='boxHead' style='cursor:pointer;' onclick='fn_detailBoard("+item.board_ARTICLE_ID+")'>";
        if(item.file_PATH) {
          htmlHead += '<div class="img"><i style="background-image:url('+item.file_PATH+'); background-size:auto;"></i></div>';
        }else {
          htmlHead += '<div class="img"><i style="background-image:url(https://fakeimg.pl/298x189/f3f3f3);"></i></div>';
        }
        htmlHead += '</div>';
        htmlHead += '<div class="boxHead" style="cursor:pointer;" onclick="fn_detailBoard('+item.board_ARTICLE_ID+')" >';
        htmlHead += '<div class="info">';
        htmlHead += '<p class="subject">'+ item.board_ARTICLE_TITLE +'</p>';
        htmlHead += '</div>';
        htmlHead += '<div class="info">';
        htmlHead += '<p class="content">'+ item.board_ARTICLE_CONTENT +'</p>';
        htmlHead += '</div></div>';
      }else{
        html += "<a class='box' style='cursor:pointer;' onclick='fn_detailBoard("+item.board_ARTICLE_ID+")'>";
        if(item.file_PATH){
          html += '<div class="img"><i style="background-image:url('+item.file_PATH+'); background-size:auto; background-repeat : no-repeat;"></i></div>';
        }else{
          html += '<div class="img"><i style="background-image:url(https://fakeimg.pl/298x189/f3f3f3);"></i></div>';
        }
        html += '<div class="info">';
        html += '<p class="subject">'+ item.board_ARTICLE_TITLE +'</p>';
        const formattedMonth = String(item.reg_DATE.monthValue).padStart(2, '0');
        const formattedDay = String(item.reg_DATE.dayOfMonth).padStart(2, '0');
        html += '<p class="date">'+ item.reg_DATE.year +'-'+ formattedMonth +'-'+ formattedDay +'</p>';
        html += '</div>';
        html += "</a>";
      }
    });

    $(".__galListhead").append(htmlHead);
    $(".__galList").append(html);
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