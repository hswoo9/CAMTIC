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
                  <dd style="letter-spacing: 0.8px;">
                    기업수요 및 <br>
                    성장주기 연계<br>
                    HW, SW 지원

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
            <div class="vis swiper-slide" style="background-image:url(/images/camtic/business_5.jpg);">
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
            <li class="active"><button type="button" role="tab" id="tab4" onclick="goList('all')" aria-controls="tab-panel4" aria-selected="true">전체</button></li>
            <li><button type="button" role="tab" id="tab1" onclick="goList('notice')" aria-controls="tab-panel1" aria-selected="false">공지사항</button></li>
            <li><button type="button" role="tab" id="tab5" onclick="goList('study')" aria-controls="tab-panel5" aria-selected="false">교육/행사</button></li>
            <li><button type="button" role="tab" id="tab2" onclick="getRecruitList();" aria-controls="tab-panel2" aria-selected="false">채용공고</button></li>
            <li><button type="button" role="tab" id="tab3" onclick="goList('report')" aria-controls="tab-panel3" aria-selected="false">보도자료</button></li>
          </ul>
          <div class="area">
            <div class="item active" id="tab-panel4" role="tabpanel" aria-labelledby="tab4" aria-selected="true"> <%--전체--%>
              <div class="sec">

              </div>
            </div>
            <div class="item" id="tab-panel1" role="tabpanel" aria-labelledby="tab1" aria-selected="false"> <%--공지사항--%>
              <div class="sec">

              </div>
              <a href="/camtic/news/commonBoard.do?categoryKey=notice" class="more">+ 더보기</a> <%--공지사항--%>
            </div>
            <div class="item" id="tab-panel5" role="tabpanel" aria-labelledby="tab5" aria-selected="false"> <%--교육--%>
              <div class="sec">

              </div>
              <a href="/camtic/news/commonBoard.do?categoryKey=study" class="more">+ 더보기</a>  <%--교육--%>
            </div>
            <div class="item" id="tab-panel2" role="tabpanel" aria-labelledby="tab2" aria-selected="false"> <%--채용공고--%>
              <div class="sec">
              </div>
              <a href="/camtic/member/job.do" class="more">+ 더보기</a> <%--채용공고--%>
            </div>

            <div class="item" id="tab-panel3" role="tabpanel" aria-labelledby="tab3" aria-selected="false"> <%--보도자료--%>
              <div class="sec">

              </div>
              <a href="/camtic/pr/report.do" class="more">+ 더보기</a> <%--보도자료--%>
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
              <div id="focusList" class="swiper-wrapper">
                <%--<a href="http://www.camtic.or.kr/CAMTIC/PR/pr_PhotoView?BBSNUM=862&&SearchText=&PAGE=1" class="swiper-slide">
                  <i style="background-image:url(/images/camtic/photo1-1.jpg);">동영상 제목</i>
                  <div class="img"><img src='/images/camtic/photo1-1.jpg' width="577" height="285"></div>
                </a>
                <a href="http://www.camtic.or.kr/CAMTIC/PR/pr_letterlist" class="swiper-slide">
                  <i style="background-image:url(/images/camtic/photo1-2.jpg);">동영상 제목</i>
                </a>
                <a href="http://www.camtic.or.kr/CAMTIC/PR/pr_movielist" class="swiper-slide">
                  <i style="background-image:url(https://i.ytimg.com/vi_webp/HWn1OONOxEA/sddefault.webp);">동영상 제목</i>
                </a>--%>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="sau">
      <div class="inner">
        <div class="tit">
          <h3><a href="/camtic/news/commonBoard.do?categoryKey=business" style="color: black;">사업공고</a></h3>
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
            <li><a href="https://www.youtube.com/@camtic4u" target='_blank'><span>유튜브</span></a></li>
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
            <div id="snsList" class="swiper-wrapper">

              <%--<a href="#" class="swiper-slide">
                <div class="img"><i style="background-image:url(https://fakeimg.pl/340x255);"></i></div>
                <div class="info">
                  <p class="date">2023-01-20 오전 11:09</p>
                  <p class="subject">캠틱종합기술원 뉴스레터 e-캠틱종합기술원 뉴스레터 e-NAR 캠틱종합기술원 뉴스레터 e-NAR</p>
                  <p class="sum">
                    함께 성장하는 행복한 일터 캠틱종합기술원의 소식을 전합니다
                    함께 성장하는 행복한 일터 캠틱종합기술원의 소식을 전합니다
                  </p>
                  <p class="sns"><span class="face">페이스북</span></p>
                </div>
              </a>

              <a href="#" class="swiper-slide">
                <div class="img"><i style="background-image:url(https://fakeimg.pl/340x255);"></i></div>
                <div class="info">
                  <p class="date">2023-01-20 오전 11:09</p>
                  <p class="subject">캠틱종합기술원 뉴스레터 e-캠틱종합기술원 뉴스레터 e-NAR 캠틱종합기술원 뉴스레터 e-NAR</p>
                  <p class="sum">
                    함께 성장하는 행복한 일터 캠틱종합기술원의 소식을 전합니다
                    함께 성장하는 행복한 일터 캠틱종합기술원의 소식을 전합니다
                  </p>
                  <p class="sns"><span class="insta">인스타그램</span></p>
                </div>
              </a>

              <a href="#" class="swiper-slide">
                <div class="img"><i style="background-image:url(https://fakeimg.pl/340x255);"></i></div>
                <div class="info">
                  <p class="date">2023-01-20 오전 11:09</p>
                  <p class="subject">캠틱종합기술원 뉴스레터 e-캠틱종합기술원 뉴스레터 e-NAR 캠틱종합기술원 뉴스레터 e-NAR</p>
                  <p class="sum">
                    함께 성장하는 행복한 일터 캠틱종합기술원의 소식을 전합니다
                    함께 성장하는 행복한 일터 캠틱종합기술원의 소식을 전합니다
                  </p>
                  <p class="sns"><span class="face">페이스북</span></p>
                </div>
              </a>

              <a href="#" class="swiper-slide">
                <div class="img"><i style="background-image:url(https://fakeimg.pl/340x255);"></i></div>
                <div class="info">
                  <p class="date">2023-01-20 오전 11:09</p>
                  <p class="subject">캠틱종합기술원 뉴스레터 e-캠틱종합기술원 뉴스레터 e-NAR 캠틱종합기술원 뉴스레터 e-NAR</p>
                  <p class="sum">
                    함께 성장하는 행복한 일터 캠틱종합기술원의 소식을 전합니다
                    함께 성장하는 행복한 일터 캠틱종합기술원의 소식을 전합니다
                  </p>
                  <p class="sns"><span class="insta">인스타그램</span></p>
                </div>
              </a>

              <a href="#" class="swiper-slide">
                <div class="img"><i style="background-image:url(https://fakeimg.pl/340x255);"></i></div>
                <div class="info">
                  <p class="date">2023-01-20 오전 11:09</p>
                  <p class="subject">캠틱종합기술원 뉴스레터 e-캠틱종합기술원 뉴스레터 e-NAR 캠틱종합기술원 뉴스레터 e-NAR</p>
                  <p class="sum">
                    함께 성장하는 행복한 일터 캠틱종합기술원의 소식을 전합니다
                    함께 성장하는 행복한 일터 캠틱종합기술원의 소식을 전합니다
                  </p>
                  <p class="sns"><span class="face">페이스북</span></p>
                </div>
              </a>

              <a href="#" class="swiper-slide">
                <div class="img"><i style="background-image:url(https://fakeimg.pl/340x255);"></i></div>
                <div class="info">
                  <p class="date">2023-01-20 오전 11:09</p>
                  <p class="subject">캠틱종합기술원 뉴스레터 e-캠틱종합기술원 뉴스레터 e-NAR 캠틱종합기술원 뉴스레터 e-NAR</p>
                  <p class="sum">
                    함께 성장하는 행복한 일터 캠틱종합기술원의 소식을 전합니다
                    함께 성장하는 행복한 일터 캠틱종합기술원의 소식을 전합니다
                  </p>
                  <p class="sns"><span class="insta">인스타그램</span></p>
                </div>
              </a>--%>

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
  var resultData3;
  var resultData4;
  var resultData5;

  $(function () {
    fnDefaultScript();
    /*getInstagramData();
    getFacebookData();*/
    drawTable();
    drawTable2();
    camticFocusList();
    snsPosts();
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
        resultData3 = rs.list3;
        resultData4 = rs.list4;
        resultData5 = rs.list5;
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

      html += '<p class="date">'+ item.regDate +'</p>';

      html += '</a>';
    });

    /*tableBody.innerHTML = html;*/
    $(".sec").append(html);
  }

  //채용공고 게시글 조회
  function getRecruitList() {

    let linkUrl = "/camtic/member/job_view.do?recruitInfoSn="
    $(".sec").html('');

    let html = "";

    resultData3.forEach((item, index) => {

      html += "<a href='"+ linkUrl +item.RECRUIT_INFO_SN+" ' class='box'>";

      if(item.RECRUIT_STATUS_SN == 'E'){
        html += '<div class="ddakji end"><span style="font-size:13px;">' + item.RECRUIT_STATUS_TEXT  + '</span></div>';
      }else if(item.RECRUIT_STATUS_SN == '3' || item.RECRUIT_STATUS_SN == '4' || item.RECRUIT_STATUS_SN == '5'){
        html += '<div class="ddakji ing"><span style="font-size:13px;">심사중</span></div>';
      }else if(item.RECRUIT_STATUS_SN == '2'){
        html += '<div class="ddakji ing"><span style="font-size:13px;">접수중</span></div>';
      }
      html += '<p class="subject" style="margin-top:31px;">' + item.RECRUIT_TITLE + '</p>';
     /* let contents = item.RECRUIT_DETAIL.replace(/<\/?("[^"]*"|'[^']*'|[^>])*(>|$)/gi, "");
      html += '<p class="sum">' + contents + '</p>';*/
      /*html += '<p class="date">' + item.UPLOAD_DT + '</p>';*/
      html += '<p class="date">' + item.START_DT + ' ~ ' + item.END_DT + '</p>';
      html += '</a>';
    });
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
      //html += '<p>'+ item.startDt +' ~<br>'+ item.endDt +'</p>'
      html += '<p style="font-size:15px;">모집기간 : ' + item.startDt + ' ~ ' + item.endDt + '</p>';
      html += '</div></div></a>';
    });

    $("#bsnsTable").append(html);
  }

  /*function getInstagramData() {
    $.ajax({
      url: 'https://graph.facebook.com/v18.0/17841446813393058/media?access_token=EAAMGG4sKh2UBO0mnzDyW6n5FRqbuq7iDw5ZC1FeeNgNZBZAmLT1TXsd90Gcm6d7YPz2Il0sRfzLZBhN44ynbRPvlqoSEKDXNjaLFyQqLQtLfOSwI2tUBrdbrzWy2mSfxvIdbwzQQ566ZC7GZARvgzZBbJFQHtkM74YllH60kSBEHreGKBDjxszeYyJSqG6ZBRABoFhLy2OiD&fields=id,media_type,media_url,permalink,thumbnail_url,username,caption,timestamp',
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
  }*/

  /*window.onload = function () {
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
  }*/


  //캠틱포커스 게시글 리스트 HTML
  function camticFocusList(){

    $("#focusList").html('');

    let html = "";

    resultData4.forEach((item, index) => {

      console.log(item);
      html += "<a class='swiper-slide' style='cursor:pointer;' onclick='fn_focusDetailBoard("+item.BOARD_ARTICLE_ID+")'>";
      html += '<div class="img"><img src='+item.FILE_PATH+' width="577" height="285"></div>';
      html += '</a>';
    });
    $("#focusList").append(html);
  }

  //상세보기 이동
  function fn_focusDetailBoard(key){
    var categoryId = "photo";
    location.href="/camtic/pr/pr_view.do?boardArticleId=" + key + "&category=" + categoryId;
  }


  //sns 게시글 리스트 HTML
  function snsPosts(){

    $("#snsList").html('');

    let html = "";

    resultData5.forEach((item, index) => {
      console.log(item);
      /*var createdTime = item.REG_DATE;
      var formattedTime = new Date(createdTime).toLocaleString();*/

      if (item.SNS_URL){
        html += '<a href="' + item.SNS_URL + '" class="swiper-slide" target="_blank">';
      }else{
        html += '<a href="javascript:void(0);" class="swiper-slide">';
      }
      if (item.FILE_PATH) {
        html += '<div class="img"><img src=' + item.FILE_PATH + ' style="width:255px; height:255px;"></div>';
      }else{
        html += '<div class="img"><i style="background-image:url(https://fakeimg.pl/340x255); width:255px; height:255px;"></i></div>';
      }
      html += '<div class="info" style="width:255px;">';
      /*html += '<p class="date">' + formattedTime + '</p>';*/
      let contents = item.BOARD_ARTICLE_CONTENT.replace(/<\/?("[^"]*"|'[^']*'|[^>])*(>|$)/gi, "");
      html += '<div><p class="sum">'+ contents +'</p></div>';
      if(item.SNS_TYPE == 1){
        html += '<p class="sns"><span class="face">페이스북</span></p>';
      }else if(item.SNS_TYPE == 2){
        html += '<p class="sns"><span class="insta">인스타그램</span></p>';
      }else {
        html += '<p class="sns"><span class="youtube">유튜브</span></p>';
      }
      html += '</div>';
      html += '</a>';
    });
    $('#snsList').append(html);

    snsMain.init();
  }


</script>
</body>
</html>