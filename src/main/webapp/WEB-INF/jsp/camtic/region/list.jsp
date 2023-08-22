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

        <div class="__ipjTab">
          <a href="#" class="active">전체</a>
          <a href="#">전주첨단벤처단지</a>
          <a href="#">입주기관 및 유관기관</a>
        </div>
        <div class="__ipjSch">
          <div class="result">총 <strong>60</strong>개의 기업이 있습니다.</div>
          <form class="sch">
            <select name="" id="">
              <option>업체명</option>
            </select>
            <input type="text">
            <button type="submit" class="hide">검색</button>
            <button type="reset">검색초기화</button>
            <a href="#">엑셀파일</a>
          </form>
        </div>

        <div class="__ipjList">
          <a href="./view.do" class="box">
            <div class="img"><span><i style="background-image:url(https://fakeimg.pl/218x108);"></i></span></div>
            <div class="info">
              <p class="subject">
                <span class="ho">1동 202호</span>
                <strong>전라북도</strong>
              </p>
              <ul class="sum">
                <li>대표자명 : 최성현</li>
                <li>전화번호 : 063-280-2114</li>
                <li>주요상품 : 핸드폰 무선송신기</li>
              </ul>
            </div>
          </a>
          <a href="./view.do" class="box">
            <div class="img"><span><i style="background-image:url(https://fakeimg.pl/218x108);"></i></span></div>
            <div class="info">
              <p class="subject">
                <span class="ho">1동 202호</span>
                <strong>전라북도</strong>
              </p>
              <ul class="sum">
                <li>대표자명 : 최성현</li>
                <li>전화번호 : 063-280-2114</li>
                <li>주요상품 : 핸드폰 무선송신기</li>
              </ul>
            </div>
          </a>
          <a href="./view.do" class="box">
            <div class="img"><span><i style="background-image:url(https://fakeimg.pl/218x108);"></i></span></div>
            <div class="info">
              <p class="subject">
                <span class="ho">1동 202호</span>
                <strong>전라북도</strong>
              </p>
              <ul class="sum">
                <li>대표자명 : 최성현</li>
                <li>전화번호 : 063-280-2114</li>
                <li>주요상품 : 핸드폰 무선송신기</li>
              </ul>
            </div>
          </a>
          <a href="./view.do" class="box">
            <div class="img"><span><i style="background-image:url(https://fakeimg.pl/218x108);"></i></span></div>
            <div class="info">
              <p class="subject">
                <span class="ho">1동 202호</span>
                <strong>전라북도</strong>
              </p>
              <ul class="sum">
                <li>대표자명 : 최성현</li>
                <li>전화번호 : 063-280-2114</li>
                <li>주요상품 : 핸드폰 무선송신기</li>
              </ul>
            </div>
          </a>
          <a href="./view.do" class="box">
            <div class="img"><span><i style="background-image:url(https://fakeimg.pl/218x108);"></i></span></div>
            <div class="info">
              <p class="subject">
                <span class="ho">1동 202호</span>
                <strong>전라북도</strong>
              </p>
              <ul class="sum">
                <li>대표자명 : 최성현</li>
                <li>전화번호 : 063-280-2114</li>
                <li>주요상품 : 핸드폰 무선송신기</li>
              </ul>
            </div>
          </a>
        </div>

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

        <div class="__tit2 __mt80">
          <h3><strong>입주 문의, 입주 방법 및 제출 서류</strong></h3>
        </div>
        <div class="__ipj1">
          <div class="__tit2">
            <h3><strong>입주신청절차</strong></h3>
            <p class="fwm">근거 : 산업집적활성화 및 공장설립에 관한 법률, 전주첨단벤처단지 운영지침</p>
          </div>
          <div class="area">

            <div class="box">
              <div class="cir">
                <dl class="step">
                  <dt>STEP</dt>
                  <dd>01</dd>
                </dl>
                <div class="ico"><img src="/images/camtic/ico-ipj1.gif" alt=""></div>
                <div class="txt">모집공고</div>
              </div>
            </div>

            <div class="box">
              <div class="cir">
                <dl class="step">
                  <dt>STEP</dt>
                  <dd>02</dd>
                </dl>
                <div class="ico"><img src="/images/camtic/ico-ipj2.gif" alt=""></div>
                <div class="txt">신청 접수</div>
              </div>
              <div class="arr"><i></i></div>
              <div class="sum">
                <p>입주신청서<br>
                  및<br>
                  사업계획서 접수</p>
              </div>
            </div>

            <div class="box">
              <div class="cir">
                <dl class="step">
                  <dt>STEP</dt>
                  <dd>03</dd>
                </dl>
                <div class="ico"><img src="/images/camtic/ico-ipj3.gif" alt=""></div>
                <div class="txt">선정 평가</div>
              </div>
              <div class="arr"><i></i></div>
              <div class="sum">
                <p>접수 마감일로부터<br>
                  <strong class="tdu">15일 이내</strong><br>
                  발표평가</p>
              </div>
            </div>

            <div class="box">
              <div class="cir">
                <dl class="step">
                  <dt>STEP</dt>
                  <dd>04</dd>
                </dl>
                <div class="ico"><img src="/images/camtic/ico-ipj4.gif" alt=""></div>
                <div class="txt">선정 통보</div>
              </div>
              <div class="arr"><i></i></div>
              <div class="sum">
                <p>발표평가일로부터<br>
                  <strong class="tdu">5일 이내</strong><br>
                  홈페이지 게시</p>
              </div>
            </div>

            <div class="box">
              <div class="cir">
                <dl class="step">
                  <dt>STEP</dt>
                  <dd>05</dd>
                </dl>
                <div class="ico"><img src="/images/camtic/ico-ipj5.gif" alt=""></div>
                <div class="txt">계약 체결</div>
              </div>
              <div class="arr"><i></i></div>
              <div class="sum">
                <p>
                  입주승인<br>
                  통보일로부터<br>
                  <strong class="tdu">14일 이내</strong>
                </p>
              </div>
            </div>

          </div>
        </div>

        <div class="__tit2 __mt100">
          <h3><strong>제출서류목록</strong></h3>
        </div>
        <div class="__ovx">
          <table class="__tblList tdfz14 bd1 bg2 auto respond2">
            <caption>제출서류목록 표</caption>
            <colgroup>
              <col>
            </colgroup>
            <thead>
            <tr>
              <th scope="col">규모</th>
              <th scope="col" colspan="2">서류목록</th>
              <th scope="col">비고</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td rowspan="8"><strong class="__blue">공통서류</strong></td>
              <td><strong class="__black" style="font-size:1.1em;">입주신청서</strong></td>
              <td>원본1부, 사본5부</td>
              <td>
                <a href="#" class="__btn2 blackLine"><span>일반기업용 다운로드</span></a>
                <a href="#" class="__btn2 blackLine"><span>초기창업기업용 다운로드</span></a>
              </td>
            </tr>
            <tr>
              <td><strong>사업계획서</strong></td>
              <td>원본1부, 사본5부</td>
              <td>
                <a href="#" class="__btn2 blackLine"><span>일반기업용 다운로드</span></a>
                <a href="#" class="__btn2 blackLine"><span>초기창업기업용 다운로드</span></a>
              </td>
            </tr>
            <tr>
              <td><strong>법인등기부등본</strong></td>
              <td>원본1부, 사본5부</td>
              <td>최근 1개월 이내(개인은 대표자 주민등록등본)</td>
            </tr>
            <tr>
              <td><strong>사업자등록증</strong></td>
              <td>6부</td>
              <td></td>
            </tr>
            <tr>
              <td><strong>국세·지방세 완납증명서</strong></td>
              <td>원본1부, 사본5부</td>
              <td>접수기간 내 발행분</td>
            </tr>
            <tr>
              <td><strong>최근3개년도 재무제표</strong></td>
              <td>원본1부, 사본5부</td>
              <td>재무제표가 없을 시 부가가치세 표준증명원 제출</td>
            </tr>
            <tr>
              <td><strong>4대 보험 가입자명부</strong></td>
              <td>원본1부, 사본5부</td>
              <td></td>
            </tr>
            <tr>
              <td><strong>개인정보 수집이용제공 동의서</strong></td>
              <td>원본1부, 사본5부</td>
              <td>
                <a href="#" class="__btn2 blackLine"><span>개인정보수집동의서 다운로드</span></a>
              </td>
            </tr>
            <tr>
              <td><strong class="__blue">추가서류</strong></td>
              <td><strong>사업계획서 증빙서류 등</strong></td>
              <td>6부</td>
              <td>
                사업계획서 상 기재한 각종 수상 및 인증 증빙서류<br class="__m">
                ※ 수출실적(최근3년)의 경우 수출신고필증 등 제출
              </td>
            </tr>
            </tbody>
          </table>
        </div>

        <div class="__tit2 __mt100">
          <h3><strong>입주허용업종</strong></h3>
        </div>
        <ul class="__dotList __fz16 bar __black">
          <li><strong class="fws">근거 법령</strong>  :  산업집적활성화 및 공장설립에 관한 법률, 전주첨단벤처단지 운영지침 등</li>
          <li><strong class="fws">입주허용업종</strong>  :  제조업, 지식기반산업, 정보통신산업, 생산활동 지원시설 등</li>
        </ul>

        <table class="__tblList tdfz14 bd1 bg2 auto respond2 __mt20">
          <caption>입주허용업종 표</caption>
          <colgroup>
            <col>
          </colgroup>
          <tbody>
          <tr>
            <th scope="row">입주우대분야</th>
            <td class="tal pl40">
              <ul class="__dotList bar">
                <li>복합소재(탄소소재 포함) 및 메카트로닉스 기반 관련 기업</li>
                <li>드론, PAV(개인형 자율항공기) 관련 기업</li>
                <li>스마트공장, 스마트헬스케어, 스마트팜 등 ICT 융복합 기업</li>
              </ul>
            </td>
            <td>중복 시 1개로 인정</td>
          </tr>
          <tr>
            <th scope="row">이전지역관련</th>
            <td class="tal pl40">
              <ul class="__dotList bar">
                <li>도외 지역으로부터 이전(확장) 기업</li>
              </ul>
            </td>
            <td></td>
          </tr>
          </tbody>
        </table>


        <div class="__tit2 __mt100">
          <h3><strong>입주제한사항</strong></h3>
        </div>
        <ul class="__dotList __fz16 bar __black">
          <li><strong class="fws">사업자등록증 미발급 예비창업자, 휴·폐업 중</strong>에 있는 자  <span class="__ipj2">단 , 초기창업실 입주예정인 예비창업자의 경우 조건부 허용(입주 전 사업자등록증 발급 조건)</span></li>
          <li>아래의 입주제한 세부사항에 해당되는 경우</li>
        </ul>
        <table class="__tblList tdfz14 bd1 bg2 auto respond2 __mt20">
          <caption>입주제한사항 표</caption>
          <colgroup>
            <col>
          </colgroup>
          <thead>
          <tr>
            <th scope="col">입주제한 세부사항</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td class="tal pl40">
              <ul class="__dotList bar">
                <li>대기환경보전법에 의한 특정대기유해물질, 수질 및 수생태계 보전에 관한 법률에 의한 특정수질유해물질의 배출 예상 업종 등</li>
                <li>그 외 특정유해물질이 발생되는 업종(도금업 등), 폐수를 다량 발생시키는 업종(피혁, 염색, 제지업 등), 대기오염 다량배출업종(석유화학공업, 타이어제조업, 철강업, 시멘트제조업 등)</li>
                <li>기타 산업집적법, 전주시 태평지구단위계획의 입주제한 업중</li>
              </ul>
            </td>
          </tr>
          </tbody>
        </table>

        <div class="__fz15 __blue __mt10 fws">*  입주허용업종과 입주제한사항이 동시에 적용될 경우 입주제한사항이 우선됨</div>

        <div class="__tit2 __mt100">
          <h3><strong>장비 및 비품 하중 제한은 다음과 같음.</strong></h3>
        </div>
        <ul class="__dotList __fz16 bar __black">
          <li><strong class="fws">입주기업(관)의 건물 내 장비·비품은 설계하중을 초과할 수 없음.</strong>(설계하중기준 : 1층 : 2,000kg/m2, 2~6층 400kg/m2)</li>
          <li>
            입주신청서 제출 시 반드시 주요 장비 및 비품의 하중을 명기해야 함.
            <div class="__fz15 __blue __mt5 fws">*  고의로 하중기준 초과 시 계약해지 및 퇴거, 단순실수에 의한 초과 도입 시는 해당장비 퇴출조치</div>
          </li>
        </ul>

        <div class="__tit2 __mt80">
          <h3>
            <strong>입주문의 :</strong>
            <span class="__fz16 fwn">(사)캠틱종합기술원 J-밸리혁신팀 (Tel: 063-219-0325, 0307, E-mail: sbjoo@camtic.or.kr)</span>
          </h3>
        </div>

        <div class="__tit2 __mt80">
          <h3>
            <strong>입주기업 및 입주안내 :</strong>
            <a href="http://www.jhitech.or.kr/web/page.php?pcode=BA" target='_blank' class="__fz16 fwn">http://www.jhitech.or.kr/web/page.php?pcode=BA</a>
          </h3>
        </div>

      </div>
    </div>
  </div>
  <jsp:include page="/WEB-INF/jsp/template/camtic/foot.jsp" flush="false"/>
</div>
</body>
</html>