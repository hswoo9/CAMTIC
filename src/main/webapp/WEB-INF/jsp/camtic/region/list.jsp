<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<jsp:include page="/WEB-INF/jsp/template/camtic/common.jsp" flush="false"/>
<style>
  .use3 {margin-top:25px; text-align: center;}
  .use3 a {display:inline-block;max-width:100%;padding:12px 15px;width:540px;border-radius:10px;color:#fff;font-size:20px;font-weight:300;letter-spacing:-0.05em;background:#111;text-align:center;}
  .use3 a strong {font-weight:600;}
</style>
</head>
<body>
<div id="wrap">
  <jsp:include page="/WEB-INF/jsp/template/camtic/head.jsp" flush="false"/>
  <div id="sub">
    <div class="inner">
      <jsp:include page="/WEB-INF/jsp/template/camtic/lnb.jsp" flush="false"/>
      <div id="content">
        <jsp:include page="/WEB-INF/jsp/template/camtic/navi_title.jsp" flush="false"/>

        <div class="__tdrone3 m0">
          <div class="__tit2 __mb50">
            <dl class="head">
              <dt><span class="__nm">“</span><span class="mainCapyTitle">창업-혁신-성장</span><span class="__nm">”</span></dt>
              <dd><span class="subCapyTitle">제주창업 플랫폼 J-Valley</span></dd>
            </dl>
          </div>

          <div class="__tit1 __mt10 __mb0">
            <h3 style="border-bottom: 1px dashed #b7b7b7; padding:30px 0;"><strong>시설 및 입주안내</strong></h3>
          </div>


          <div class="__icoBox1">
            <%-- <div class="ico"><span><img src="/images/camtic/ico-drone2-1.png" alt=""></span></div> --%>
            <div class="__fz18 __black">
              <div class="img"><img src="/images/camtic/img-ndrone3-1.jpg" alt=""></div>
            </div>
          </div>

          <div class="__tit2 __mt100">
            <h3><strong>시설 및 입주공간</strong></h3>
          </div>
          <table class="__tblList bd1 bg3 respond2 __mt10" style="word-spacing: 0px;">
            <caption></caption>
            <colgroup>
              <col width="29%">
              <col width="29%">
              <col width="11%">
              <col width="21%">
              <col width="23%">
            </colgroup>
            <thead>
            <tr>
              <th scope="col">시설명</th>
              <th scope="col">규모</th>
              <th scope="col">준공(유치)일자</th>
              <th scope="col">용도</th>
              <th scope="col">입주공간</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td class="fz18 __black">전주혁신창업허브(창업동)</td>
              <td class="tal">연면적 12,212㎡(지하 1층, 지상 6층)</td>
              <td class="tal" style="text-align:center">2020.08</td>
              <td class="tal">기업입주공간, 창업공간, 교육장, 회의실, 카페, 구내식당 등</td>
              <td class="tal">일반형 37개실 초기창업실 18개실</td>
            </tr>
            <tr>
              <td class="fz18 __black">전주혁신창업허브(성장동)</td>
              <td class="tal">연면적 9,980㎡(지하 1층, 지상 4층)</td>
              <td class="tal" style="text-align:center">2024.08(예정)</td>
              <td class="tal">창업성장지원센터, 스피드팩토리</td>
              <td class="tal">일반형 40개실</td>
            </tr>
            <tr>
              <td class="fz18 __black">전주드론제작소 윙윙 스테이션(1동)</td>
              <td class="tal">메이커공간 메이커제작 장비(12종)</td>
              <td class="tal" style="text-align:center">2022.09</td>
              <td class="tal">메이커스페이스, 기업입주공간</td>
              <td class="tal">일반형 7개실</td>
            </tr>
            <tr>
              <td class="fz18 __black">스마트공장배움터</td>
              <td class="tal">제조라인, 미니라인, 데이터센터 교육장비</td>
              <td class="tal" style="text-align:center">2019.05</td>
              <td class="tal">스마트공장 교육시설</td>
              <td class="tal"></td>
            </tr>
            <tr>
              <td class="fz18 __black">복합소재뿌리기술센터</td>
              <td class="tal">사출성형장비(6종) 압축/열 성형장비(3종) 금형가공 장비(4종)</td>
              <td class="tal" style="text-align:center">2020.10</td>
              <td class="tal">탄소복합재 부품/금형 생산기술 장비 구축</td>
              <td class="tal"></td>
            </tr>
            <tr>
              <td class="fz18 __black">드론산업혁신지원센터</td>
              <td class="tal">시제품제작장비(6종) 성능평가지원장비(5종) AI항공관제지원장비(4종)</td>
              <td class="tal" style="text-align:center">2022.03</td>
              <td class="tal">드론관련 산학연 집적공간</td>
              <td class="tal"></td>
            </tr>
            </tbody>
          </table>

          <div class="__tit2 __mt100">
            <h3><strong>입주신청 절차</strong></h3>
          </div>
          <ul class="__dotList __fz16 bar __black">
            <li><strong class="fws">근거</strong>  :  산업집적활성화 및 공장설립에 관한 법률, 전주첨단벤처단지 운영지침</li>
          </ul>

          <div class="__ipj1">
            <div class="__tit2">
              <h3><strong></strong></h3>
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
            <h3><strong>입주허용 업종</strong></h3>
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
          <div class="__fz15 __blue __mt10 fws">※ 입주제한사항: 사업자등록증 미발급 예비창업자, 휴･폐업 중에 있는자<br/>
            (단, 초기창업실 입주예정인 예비창업자의 경우 조건부 허용/입주전 사업자등록증 발급 조건) </div>

          <div class="__tit2 __mt60">
            <div class="use3">
              <a href="http://www.jhitech.or.kr/web/page.php?pcode=BA" target="_blank"><strong>입주안내 상세 페이지</strong> 바로가기</a>
            </div>
          </div>

          <div class="__tit2 __mt60">
            <div class="__fz18 __black fwb __mt20">입주문의 :
              <span class="__fz16 fwn">J-밸리혁신팀 (Tel: 063-219-0325, 0307, E-mail: sbjoo@camtic.or.kr)</span>
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