<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<jsp:include page="/WEB-INF/jsp/template/camtic/common.jsp" flush="false"/>
</head>
<style>
  .__newsListhead{display: flex; flex-wrap: wrap; gap: 55px 15px;}
  .__newsListhead .newboxHead{display: block; width: calc((100% / 3) - (52px / 3));}
  .__newsListhead .newboxHead .info{margin-top: 35px;}
  .__newsListhead .newboxHead .info .subject{font-size: 22px; line-height: 1.35; height: 2.7em; display: -webkit-box;
    word-wrap: break-word; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis;
    color: #252525; font-weight: 500; letter-spacing: -0.05em;}
  .__newsListhead .newboxHead .logoimg{height:150px;border: 1px solid #ccc;}
  .__newsListhead .newboxHead .img{border: 1px solid #ccc;}
  .__newsListhead .newboxHead .img i{display: block; padding-top: calc(238 / 408 * 100%); background-repeat: no-repeat;
    background-position: 50% 50%; background-size: cover; background-image: url(https://fakeimg.pl/408x238/f3f3f3);}

  @media (max-width: 1024px) {
    .__newsListhead .newboxHead {width: calc((100% / 2) - (10px / 2));}
    .__newsListhead .newboxHead .info .subject {font-size: 14px; line-height: 1.2; height: 2.4em;}
    .__newsListhead {gap: 25px 10px;}
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

        <div class="__newsListhead">
          <div class="newboxHead">
            <div class="img"><i style="background-image:url(https://fakeimg.pl/408x238/f3f3f3);"></i></div>
          </div>
          <div class="newboxHead">
            <div class="img"><i style="background-image:url(https://fakeimg.pl/408x238/f3f3f3);"></i></div>
          </div>
          <div class="newboxHead">
            <div class="logoimg"></div>
            <div class="info" style="margin-top:10px;">
              <p class="subject">23.05.20 제1회 FIDA(국제드론축구 연맹) 세계드론축구대회 성료 세계드론축구대회 성료세계드론축구대회 성료</p>
            </div>
          </div>
        </div>
        <div class="__newsList" style="margin-top:45px;">

        </div>

        <div class="__botArea">
          <div class="cen">
            <div class="__paging">

            </div>

            <div class="rig">
              <a href="#" onclick="fn_writeBoard();" class="__btn1 blue"><span>게시글 작성</span></a>
            </div>
          </div>
        </div>

        <%--<div class="__botArea __mt20">
          <div class="rig">
            &lt;%&ndash;<a href="#" class="__btn1 blue"><span>구독 신청하기</span></a>
            <a href="#" class="__btn1 grayLine"><span>이전 소식지보기</span></a>&ndash;%&gt;
          </div>
        </div>--%>

      </div>
    </div>
  </div>
  <jsp:include page="/WEB-INF/jsp/template/camtic/foot.jsp" flush="false"/>
</div>

<script>

  var categoryKey = "news";

  var firstData = fn_customAjax('/board/getBoardArticleList.do?categoryId=' + categoryKey + '&recordSize=4','');
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
      recordSize: 4,
      pageSize: 10
    }
    var result = fn_customAjax("/board/getBoardArticleList.do?" + new URLSearchParams(queryParams).toString() + "&categoryId=" + categoryKey + "&recordSize=4", "");

    flag = true;

    dataChk(result, flag);
    drawTable(result.boardArticleList.list);
    drawPage();
  }

  //게시글 리스트 그리기
  function drawTable(data) {
    $(".__newsListhead").html('');
    $(".__newsList").html('');


    let htmlHead = "";
    let html = "";

    data.forEach((item, index) => {
      let hashArr = item.board_ARTICLE_HASHTAG.split("#");

      const formatYear = String(item.reg_DATE.year).substr(2);
      const formattedMonth = String(item.reg_DATE.monthValue).padStart(2, '0');
      const formattedDay = String(item.reg_DATE.dayOfMonth).padStart(2, '0');

      if(index == 0){
        htmlHead += "<div class='newboxHead' style='cursor:pointer;' onclick='fn_detailBoard("+item.board_ARTICLE_ID+")'>";
        if(item.file_PATH) {
          htmlHead += '<div class="img"><i style="background-image:url('+item.file_PATH+'); background-size:auto;"></i></div>';
        }else {
          htmlHead += '<div class="img"><i style="background-image:url(https://fakeimg.pl/298x189/f3f3f3);"></i></div>';
        }
        htmlHead += '</div>';

        htmlHead += '<hr style="height: auto; width:1px; margin: 0; color:#ccc; background-color:#ccc;">';

        htmlHead += "<div class='newboxHead' style='cursor:pointer; border: 1px solid #ccc; padding: 5px 0 0 15px;' onclick='fn_detailBoard("+item.board_ARTICLE_ID+")'>";
        htmlHead += '<div class="info" style="margin-top:10px;">';
        htmlHead += '<p class="subject">'+ item.board_ARTICLE_CONTENT +'</p>';
        htmlHead += '</div>';
        htmlHead += '</div>';

        htmlHead += '<div class="newboxHead" style="cursor:pointer;" onclick="fn_detailBoard('+item.board_ARTICLE_ID+')" >';
        htmlHead += '<div class="logoimg"></div>';
        htmlHead += '<div class="info" style="margin-top:10px;">';

        htmlHead += '<p class="subject">'+formatYear+'.'+formattedMonth+'.'+formattedDay+' '+ item.board_ARTICLE_TITLE +'</p>';
        htmlHead += '</div>';
        htmlHead += '</div>';
      }else{
        html += "<a class='box' style='cursor:pointer;' onclick='fn_detailBoard("+item.board_ARTICLE_ID+")'>";
        if(item.file_PATH){
          html += '<div class="img"><i style="background-image:url('+item.file_PATH+'); background-size:auto; background-repeat : no-repeat;"></i></div>';
        }else{
          html += '<div class="img"><i style="background-image:url(https://fakeimg.pl/298x189/f3f3f3);"></i></div>';
        }
        html += '<div class="info">';
        html += '<p class="cate">부모님을 향한 사랑이야기</p>';

        html += '<p class="subject">'+formatYear+'.'+formattedMonth+'.'+formattedDay+' '+ item.board_ARTICLE_TITLE +'</p>';
        html += '<p class="hash">';
        for(var x=1; x < hashArr.length; x++){
          html += '<span>#'+ hashArr[x] +'</span>';
        }
        html += '</p>';
        html += '</div>';
        html += "</a>";
      }
    });

    $(".__newsListhead").append(htmlHead);
    $(".__newsList").append(html);
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