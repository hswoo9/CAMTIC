<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:include page="/WEB-INF/jsp/template/camtic/common.jsp" flush="false"/>
</head>
<style>
  /*블랙 스크린 취소*/
  /*  #vis .rig .nimg:after {
      content: '';
      position: absolute;
      background-color: #0000002e;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }
    #vis .cont{background-color: #ffffff52;}
   #vis .lef .swiper-slide:after {
     content: '';
     position: absolute;
     background-color: #0000002e;
     width: 100%;
     height: 100%;
     top: 0;
     left: 0;
   }*/
  .mainTitle{
    background : linear-gradient(to right,#00529c, #4bc1be);
    background-clip:text;
    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent;
  }

</style>
<body>
<div id="wrap">
  <jsp:include page="/WEB-INF/jsp/template/camtic/head.jsp" flush="false"/>

  <div id="content">
    <div id="vis">
      <div class="lef">
        <div class="roll2">
          <div class="swiper-wrapper">
            <div class="box swiper-slide" style="background-image:url(/images/camtic/vis-bg.jpg);">
              <div class="tit">
                <dl>
                  <dt><span class="mainTitle">지역</span>과 함께 성장</dt>
                  <%--자간수정--%>
                  <dd style="letter-spacing: 1px;">
                    창업 - 혁신 - 성장<br>
                    제조창업플랫폼 구축
                  </dd>
                </dl>
                <%--<p><span>J - Valley 1</span></p>--%>
              </div>
            </div>
            <div class="box swiper-slide" style="background-image:url(/images/camtic/vis-bg.jpg);">
              <div class="tit">
                <dl>
                  <dt><span class="mainTitle">기업</span>과 함께 성장</dt>
                  <dd style="letter-spacing: 1px;">
                    기업수요 및 성장주기 <br>
                    연계 H/W, S/W 지원
                  </dd>
                </dl>
                <%--<p><span>J - Valley 2</span></p>--%>
              </div>
            </div>
            <div class="box swiper-slide" style="background-image:url(/images/camtic/vis-bg.jpg);">
              <div class="tit">
                <dl>
                  <dt><span class="mainTitle">기술</span>과 함께 성장</dt>
                  <dd style="letter-spacing: 1px;">
                    시장기반 신기술  <br>
                    신산업 육성 지원
                  </dd>
                </dl>
                <%--<p><span>J - Valley 3</span></p>--%>
              </div>
            </div>
            <div class="box swiper-slide" style="background-image:url(/images/camtic/vis-bg.jpg);">
              <div class="tit">
                <dl>
                  <dt><span class="mainTitle">직원</span>과 함께 성장</dt>
                  <dd style="letter-spacing: 1px;">
                    행복한 일터<br>
                    캠틱 클러스터 구축
                  </dd>
                </dl>
                <%--<p><span>J - Valley 4</span></p>--%>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="rig">
        <div class="roll">
          <div class="swiper-wrapper">
            <div class="vis swiper-slide" style="background-image:url(/images/camtic/region_4.jpg);">
              <div class="nimg"><img src="" alt=""><h1 style="color: #4bc1be; font-size: 80px"><%--vis1--%></h1></div>
              <div class="hide">
                접근성 관련 텍스트
              </div>
            </div>
            <div class="vis swiper-slide" style="background-image:url(/images/camtic/business_4.jpg);">
              <div class="nimg"><img src="" alt=""><h1 style="color: #4bc1be; font-size: 80px"><%--vis2--%></h1></div>
              <div class="hide">
                접근성 관련 텍스트
              </div>
            </div>
            <div class="vis swiper-slide" style="background-image:url(/images/camtic/technology_4.jpg);">
              <div class="nimg"><img src="" alt=""><h1 style="color: #4bc1be; font-size: 80px"><%--vis3--%></h1></div>
              <div class="hide">
                접근성 관련 텍스트
              </div>
            </div>
            <div class="vis swiper-slide" style="background-image:url(/images/camtic/staff_4.jpg);">
              <div class="nimg"><img src="" alt=""><h1 style="color: #4bc1be; font-size: 80px"><%--vis4--%></h1></div>
              <div class="hide">
                접근성 관련 텍스트
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="cont">
        <span class="now">01</span>
        <div class="bar"></div>
        <span class="max">04</span>
        <button type="button" class="auto"><span class="hide">PLAY</span><i class="axi axi-pause2" aria-hidden="true"></i></button>
      </div>
      <%--<div class="scr"><span>SCROLL</span></div>--%><%--스크롤 안보이게 수정--%>
    </div>

    <div id="mid">
      <div class="inner">
        <div class="lef">
          <ul class="tab">
            <li class="active"><button type="button" role="tab" id="tab1" onclick="goList('notice')" aria-controls="tab-panel1" aria-selected="true">공지사항</button></li>
            <li><button type="button" role="tab" id="tab2" aria-controls="tab-panel2" aria-selected="false">채용공고</button></li>
            <li><button type="button" role="tab" id="tab3" onclick="goList('report')" aria-controls="tab-panel3" aria-selected="false">보도자료</button></li>
          </ul>
          <div class="area">
            <div class="item active" id="tab-panel" role="tabpanel" aria-labelledby="tab1" aria-selected="true">
              <div class="sec">

              </div>
              <a href="/camtic/news/commonBoard.do?categoryKey=notice" class="more">+ 더보기</a>
            </div>

            <div class="item" id="tab-panel2" role="tabpanel" aria-labelledby="tab2" aria-selected="false">
              <div class="sec">
                <a href="/camtic/member/view.do" class="box">
                  <div class="ddakji ing"><span>진행중</span></div>
                  <p class="subject">이영 중소벤처기업부 장관, 전주첨단벤처단지 방문 및 기업간담회</p>
                  <p class="sum">
                    방황하여도, 열락의 속잎나고, 맺어, 듣기만 싸인 눈이 칼이다. 하였으며, 청춘은 가슴에 교향악이다.
                    이상은 따뜻한 그들에게 크고 주며, 아니다. 살았으며, 어디 품고 사랑의 지혜는 착목한는 그들은 때에, 칼이다.
                  </p>
                  <p class="date">2023-01-04</p>
                </a>
                <a href="/camtic/member/view.do" class="box">
                  <div class="ddakji end"><span>완료</span></div>
                  <p class="subject">2 이영 중소벤처기업부 장관, 전주첨단벤처단지 방문 및 기업간담회</p>
                  <p class="sum">
                    방황하여도, 열락의 속잎나고, 맺어, 듣기만 싸인 눈이 칼이다. 하였으며, 청춘은 가슴에 교향악이다.
                    이상은 따뜻한 그들에게 크고 주며, 아니다. 살았으며, 어디 품고 사랑의 지혜는 착목한는 그들은 때에, 칼이다.
                  </p>
                  <p class="date">2023-01-04</p>
                </a>
                <a href="/camtic/member/view.do" class="box">
                  <div class="ddakji ing"><span>진행중</span></div>
                  <p class="subject">3 이영 중소벤처기업부 장관, 전주첨단벤처단지 방문 및 기업간담회</p>
                  <p class="sum">
                    방황하여도, 열락의 속잎나고, 맺어, 듣기만 싸인 눈이 칼이다. 하였으며, 청춘은 가슴에 교향악이다.
                    이상은 따뜻한 그들에게 크고 주며, 아니다. 살았으며, 어디 품고 사랑의 지혜는 착목한는 그들은 때에, 칼이다.
                  </p>
                  <p class="date">2023-01-04</p>
                </a>
              </div>
              <a href="/camtic/member/job.do" class="more">+ 더보기</a>
            </div>

            <div class="item" id="tab-panel3" role="tabpanel" aria-labelledby="tab3" aria-selected="false">
              <div class="sec">

              </div>
              <a href="/camtic/pr/report.do" class="more">+ 더보기</a>
            </div>
          </div>
        </div>
        <div class="rig">
          <div class="tit">
            <h2>캠틱<span>포커스</span></h2>
            <div class="cont">
              <div class="page"></div>
              <div class="bt">
                <button type="button" class="prev"><span class="hide">PREV</span><i class="axi axi-angle-left" aria-hidden="true"></i></button>
                <button type="button" class="auto"><span class="hide">PLAY</span><i class="axi axi-pause2" aria-hidden="true"></i></button>
                <button type="button" class="next"><span class="hide">NEXT</span><i class="axi axi-angle-right" aria-hidden="true"></i></button>
              </div>
            </div>
          </div>
          <div class="area">
            <div class="roll">
              <div class="swiper-wrapper">
                <a href="http://www.camtic.or.kr/CAMTIC/PR/pr_PhotoView?BBSNUM=862&&SearchText=&PAGE=1" class="swiper-slide">
                  <i style="background-image:url(/images/camtic/photo1-1.jpg);">동영상 제목</i>
                </a>
                <a href="http://www.camtic.or.kr/CAMTIC/PR/pr_letterlist" class="swiper-slide">
                  <i style="background-image:url(/images/camtic/photo1-2.jpg);">동영상 제목</i>
                </a>
                <a href="http://www.camtic.or.kr/CAMTIC/PR/pr_movielist" class="swiper-slide">
                  <i style="background-image:url(https://i.ytimg.com/vi_webp/HWn1OONOxEA/sddefault.webp);">동영상 제목</i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="sau">
      <div class="inner">
        <div class="tit">
          <h3>사업공고</h3>
          <div class="bt">
            <button type="button" class="prev"><i class="axi axi-angle-left"></i></button>
            <button type="button" class="next"><i class="axi axi-angle-right"></i></button>
          </div>
        </div>
        <div class="area">
          <div id="bsnsTable" class="swiper-wrapper">

          </div>
        </div>
      </div>
    </div>

    <div id="sns">
      <div class="inner">
        <div class="lef">
          <ul class="sns">
            <li><a href="https://www.facebook.com/CAMTIC4U" target='_blank'><span>페이스북</span></a></li>
            <li><a href="https://www.instagram.com/camtic4u/?utm_medium=copy_link" target='_blank'><span>인스타그램</span></a></li>
            <%--<li><a href="https://pf.kakao.com/_Txmjps" target='_blank' class="kakao"><span>카카오톡</span></a></li>--%>
          </ul>
          <dl class="tit">
            <dt>캠틱종합기술원</dt>
            <dd>SNS 소식</dd>
          </dl>
          <div class="cont">
            <button type="button" class="prev">이전</button>
            <button type="button" class="next">다음</button>
          </div>
        </div>
        <div class="rig">
          <div class="roll">
            <div id="snsPosts" class="swiper-wrapper">

            </div>
          </div><!--#roll-->
        </div><!--#rig-->
      </div><!--#inner-->
    </div><!--#sns-->
  </div><!--#content-->

  <div id="ban">
    <div class="inner">
      <ul>
        <li><a href="http://mold.camtic.or.kr/main/" target="_blank"><img src="/images/camtic/img-main-ban1.png" alt="복합소재 뿌리기술센터"></a></li>
        <li><a href="http://maker.camtic.or.kr/main/" target="_blank"><img src="/images/camtic/img-main-ban2.png" alt="윙윙스테이션"></a></li>
        <li><a href="http://www.jhitech.or.kr/" target="_blank"><img src="/images/camtic/img-main-ban3.png" alt="전주첨단벤처단지"></a></li>
        <li><a href="http://drone.camtic.or.kr/main/" target="_blank"><img src="/images/camtic/img-main-ban4.png" alt="국토교통부지원 드론기술개발지원센터"></a></li>
      </ul>
    </div>
  </div>
  <jsp:include page="/WEB-INF/jsp/template/camtic/foot.jsp" flush="false"/>
</div>
<script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js"></script>
<script async defer crossorigin="anonymous" src="https://www.instagram.com/embed.js"></script>
<script>

  vis.init();

  midMain.init();
  sauMain.init();

  var faceBookData = [];
  var instaData = [];

  var data = {
    category : "notice"
  }

  var viewUrl = "";

  var resultData;
  var resultData2;

  $(function () {
    fnDefaultScript();
    getInstagramData();
    getFacebookData();
    drawTable();
    drawTable2();

  });

  function goList(e){
    data.category = e;

    fnDefaultScript();
    drawTable();
  }

  function fnDefaultScript() {
    $.ajax({
      url : '/main/getMainList.do',
      type : 'POST',
      data: data,
      dataType : "json",
      async: false,
      success: function(rs) {
        resultData = rs.list;
        resultData2 = rs.list2;
      }
    });
  }

  //게시글 리스트 그리기
  function drawTable() {

    if(data && data.category == "notice") {
      viewUrl = "/camtic/news/view.do?category=notice&boardArticleId=";
    }else if(data && data.category == "report"){
      viewUrl = "/camtic/pr/pr_view.do?category=report&boardArticleId=";
    }

    $(".sec").html('');

    let html = "";

    resultData.forEach((item, index) => {

      html += "<a href='"+ viewUrl +item.BOARD_ARTICLE_ID+" ' class='box'>";

      html += '<p class="subject">'+ item.BOARD_ARTICLE_TITLE +'</p>';
      let contents = item.BOARD_ARTICLE_CONTENT.replace(/<\/?("[^"]*"|'[^']*'|[^>])*(>|$)/gi, "");
      html += '<div><p class="sum">'+ contents +'</p></div>';
      /*html += '<p class="sum">test</p>';*/

      html += '<p class="date">'+ item.REG_DATE +'</p>';

      html += '</a>';
    });

    /*tableBody.innerHTML = html;*/
    $(".sec").append(html);
  }

  //사업공고 게시글 리스트 그리기
  function drawTable2() {

    let linkUrl = "/camtic/news/view.do?category=business&boardArticleId="

    $("#bsnsTable").html('');

    let html = "";

    resultData2.forEach((item, index) => {

      html += "<a href='"+ linkUrl +item.BOARD_ARTICLE_ID+" ' class='box swiper-slide' style='width: 385px; margin-right: 20px;'>";

      html += '<div class="head">';
      html += '<div class="ico">'+ item.state +'</div>';
      html += '<dl><dt>마감일</dt><dd>'+ item.endDay +'</dd></dl>';
      html += '</div>';

      html += '<div class="cont">';
      html += '<div class="txt">'+ item.BOARD_ARTICLE_TITLE +'</div>';
      html += '<div class="date">';
      html += '<i class="axi axi-clock" aria-hidden="true"></i>'
      html += '<p>'+ item.startDt +' ~<br>'+ item.endDt +'</p>'
      html += '</div></div></a>';
    });

    $("#bsnsTable").append(html);
  }

  function getInstagramData() {
    $.ajax({
      url: 'https://graph.instagram.com/6685068638249687/media?fields=id,media_type,media_url,permalink,thumbnail_url,username,caption,timestamp&access_token=IGQWRQcWVfT05rakN2T3daSndmSDhndW44aGZASbmx3ellPWHRSXzlUUTZAuT205ZAkJnaXdZAd3luMXlYMENGLTNUNE5PNkczcVBhNVZAwZAmxzSElzcWw4M2Yxc3NUOEtUTm1VR0JmWVp0X2gwQQZDZD',
      dataType : "json",
      async : false,
      success: function(rs) {
        for (const post of rs.data) {
          instaData.push(post);
        }
      },
    });
  }

  function getFacebookData() {
    $.ajax({
      url: 'https://graph.facebook.com/v18.0/10227379748894494/feed?fields=attachments,message,picture,link,name,caption,description,source,created_time&access_token=EAAFBOj38bsEBOx1mx9Dwv8k9mxeasgB3HpIDIrddy9H4yhW6BZAjNetdVnEpEbBbhGZCK9sk7aixqonkdvaaSsqGOzHT9Pl5eF7RtUeDJtKYgbVL04AgxY4hcn7S5w8q9jeHHYbQQO9oJsl6oWK5KIw4tvCzJMZANEDFXHMRgI3UeUDYClLMKOh3ZCK5YI9QkXkU0dKXcwmV9O0GyG5S7JpAteCTqBu5pRj4x4PYdmoJaHjybHXzTcIRTWAZD',
      dataType : "json",
      async : false,
      success: function (response) {
        for (var i = 0; i < response.data.length; i++) {
          faceBookData.push(response.data[i]);
        }
      }
    });
  }

  window.onload = function () {
    const maxLength = Math.max(faceBookData.length, instaData.length);

    console.log("================");
    console.log("데이터 통신 확인");
    console.log(instaData);
    console.log(faceBookData);
    console.log("================");

    var html = "";
    for (var x = 0; x < maxLength; x++) {

      if (x < faceBookData.length) {

        let createdTime = faceBookData[x].created_time;
        var formattedTime = new Date(createdTime).toLocaleString();

        //html += '<a href="' + faceBookData[x].link + '" class="swiper-slide">';
        html += '<a href="' + (faceBookData[x].picture ? faceBookData[x].link : 'javascript:void(0)') + '" class="swiper-slide">';
        if (faceBookData[x].picture) {
          html += '<div class="img"><img id="image' + i + '" src="' + faceBookData[x].picture + '" width="340" height="255"></div>';
        } else {
          html += '<div class="img"><i style="background-image:url(https://fakeimg.pl/340x255); pointer-events: none;"></i></div>';
        }
        html += '<div class="info">';
        html += '<p class="date">' + formattedTime + '</p>';
        html += '<p class="sum">' + faceBookData[x].message + '</p>';
        html += '<p class="sns"><span class="face">페이스북</span></p>';
        html += '</div>';
        html += '</a>';
      }

      if (x < instaData.length) {

        let createdTime = new Date(instaData[x].timestamp).toLocaleString();

        html += '<a href="' + instaData[x].media_url + '" class="swiper-slide">';
        html += '<div class="img"><img src="' + instaData[x].media_url + '" width="340" height="255"></div>';
        html += '<div class="info">';
        html += '<p class="date">' + createdTime + '</p>';
        html += '<p class="sum">' + instaData[x].caption + '</p>';
        html += '<p class="sns"><span class="insta">인스타그램</span></p>';
        html += '</div>';
        html += '</a>';
      }
    }
    $('#snsPosts').append(html);

    snsMain.init();
  }
</script>
</body>
</html>