<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<jsp:include page="/WEB-INF/jsp/template/camtic/common.jsp" flush="false"/>
<style>
  /*.__busi {max-width: 1080px;margin: 0 auto;}*/
  .__bio3 {padding:40px 50px 65px;background:#fff;/*background:#f8f8f8;*/}
  .area {display:flex;flex-wrap:wrap;gap:35px 38px; justify-content: center; align-items: center; margin-bottom: 75px;}
  .area .box {width:calc(100% / 3 - (76px / 3)); text-align: center;}
  .area .box .img img {display:block;width:100%;}
  .area .box .txt {font-size:16px;line-height:1.25;margin-top:13px;color:#222;letter-spacing:-0.05em;}
  .__drone5 {margin-top:50px; padding:0px; text-align: left;}
  .__icoBox{width: 775px;}
  .img img{width: 218px; height: 240px;}
</style>
</head>

<body>
<div id="wrap">
  <jsp:include page="/WEB-INF/jsp/template/camtic/headENG.jsp" flush="false"/>
  <div id="sub">
    <div class="inner">
      <jsp:include page="/WEB-INF/jsp/template/camtic/lnbENG.jsp" flush="false"/>
      <div id="content">
        <jsp:include page="/WEB-INF/jsp/template/camtic/navi_title.jsp" flush="false"/>

        <div class="__busi m0">
              <%--<dl class="head">
                <dt><span class="__nm">“</span><span class="mainCapyTitle">지역전략산업 및 기업의 혁신/성장을 위한 시설, 공간, 장비 등</span><span class="__nm">”</span></dt>
                <dd><span class="subCapyTitle">인프라를 기반으로 중소·벤처기업의 성장 지원</span></dd>
              </dl>--%>
            <h3><strong></strong></h3>
            <div class="hide">
              <ul>
                <li>
                  <h4>01</h4>
                  <dl>
                    <dt>기업성장지원 분야</dt>
                    <dd>BUSINESS GROWTH SUPPORT</dd>
                  </dl>
                  <ul>
                    <li>- 지역산업육성</li>
                    <li>- 국제개발협력(ODA)</li>
                    <li>- 인재개발/인재양성</li>
                    <li>- 일자리·창업지원</li>
                  </ul>
                </li>
                <li>
                  <h4>02</h4>
                  <dl>
                    <dt>R&BD 분야</dt>
                    <dd>Research & Business Development</dd>
                  </dl>
                  <ul>
                    <li>- 스마트팩토리 / 로봇</li>
                    <li>- 스마트헬스케어 / 스마트팜</li>
                    <li>- 탄소 복합재 개발</li>
                  </ul>
                </li>
                <li>
                  <h4>03</h4>
                  <dl>
                    <dt>사업부 분야</dt>
                    <dd>Business for Commercialization</dd>
                  </dl>
                  <ul>
                    <li>- 항공우주</li>
                    <li>- 드론사업</li>
                    <li>- 스마트제조</li>
                  </ul>
                </li>
              </ul>
            </div>
        </div>

        <div class="__busi">
        <div class="__tit1 __mt0">
          <h3><strong>Research & Business Development</strong></h3>
        </div>
        <div class="__vision50">
          <img src="/images/camtic/img-busi_01.jpg" alt="">
        </div>

        <h4>New technology convergence</h4>
        <h3>• Support cases</h3>
        <div class="area __mt60">
          <div class="box"><div class="img"><img src="/images/camtic/businesseENG1-1.jpg" alt=""></div>
            <div class="txt">CAMTIC – Developed room covering rail system for the indoor convenience of persons with disabilities</div></div>
          <div class="box"><div class="img"><img src="/images/camtic/businesseENG1-2.jpg" alt=""></div>
            <div class="txt">Poonglim Pharmatech –Made a prototype of medicinal fluid measuring pen device</div></div>
          <div class="box"><div class="img"><img src="/images/camtic/businesseENG1-3.jpg" alt=""></div>
            <div class="txt">CBH –Developed a multi-functional carbon table for vertebral joint diagnosis and surgery</div></div>
          <div class="box"><div class="img"><img src="/images/camtic/businesseENG1-4.png" alt=""></div>
            <div class="txt">MPROS –Developed a sleep apnea testing device</div></div>
          <div class="box"><div class="img"><img src="/images/camtic/businesseENG1-5.jpg" alt=""></div>
            <div class="txt">K-Beauty Solution –Developed two-way content and practice devices for online training of semi-permanent makeup</div></div>
          <div class="box"><div class="img"><img src="/images/camtic/businesseENG1-6.jpg" alt=""></div>
            <div class="txt">Nanobio Imaging –Developed an LED treatment machine for nasal/oral cavity</div></div>
          <div class="box"><div class="img"><img src="/images/camtic/businesseENG1-7.jpg" alt=""></div>
            <div class="txt">CAMTIC –Developed an electrospinning system for nanofiber manufacturing</div></div>
          <div class="box"><div class="img"><img src="/images/camtic/businesseENG1-8.jpg" alt=""></div>
            <div class="txt">TDM –Made a 500 mm-wide electrospinning machine that produces nanofiber bonding sheets</div></div>
          <div class="box"><div class="img"><img src="/images/camtic/businesseENG1-9.jpg" alt=""></div>
            <div class="txt">CAMTIC –Joined the support project for distribution of national standards of ICT smart farm equipment</div></div>
          <div class="box"><div class="img"><img src="/images/camtic/businesseENG1-10.jpg" alt=""></div>
            <div class="txt">Freshgo –Joined the 2020 demonstration project for the distribution of manufacturing robots</div></div>
          <div class="box"><div class="img"><img src="/images/camtic/businesseENG1-11.jpg" alt=""></div>
            <div class="txt">Dadeum –Joined the 2020 demonstration project for the distribution of manufacturing robots</div></div>
          <div class="box"><div class="img"><img src="/images/camtic/businesseENG1-12.png" alt=""></div>
            <div class="txt">Jungilpoom –Joined the 2020 demonstration project for the distribution of manufacturing robots</div></div>
        </div>

        <h4>Manufacturing innovation cases</h4>
        <h3>• Support cases</h3>
        <div class="area __mt60">
            <div class="box"><div class="img"><img src="/images/camtic/businesseENG2-1.jpg" alt=""></div><div class="txt">[Daeyang Solution - Smart security solution]</div></div>
            <div class="box"><div class="img"><img src="/images/camtic/businesseENG2-2.jpg" alt=""></div><div class="txt">[Daeyang Solution - Smart security solution]</div></div>
            <div class="box"><div class="img"><img src="/images/camtic/businesseENG2-3.jpg" alt=""></div><div class="txt">[KTL - PV module testing equipment]</div></div>
            <div class="box"><div class="img"><img src="/images/camtic/businesseENG2-4.jpg" alt=""></div><div class="txt">[Solar Park - Cross bar machine]</div></div>
            <div class="box"><div class="img"><img src="/images/camtic/businesseENG2-5.jpg" alt=""></div><div class="txt">[Solar Park - Stringer]</div></div>
            <div class="box"><div class="img"><img src="/images/camtic/businesseENG2-6.jpg" alt=""></div><div class="txt">[Solar Park - Ribbon attacher]</div></div>
        </div>


        <div class="__tit1 __mt50">
          <h3><strong>Business Growth Support</strong> </h3>
        </div>
        <div class="__vision50">
          <img src="/images/camtic/img-busi_02.jpg" alt="">
        </div>
        <!--ppt17-->
          <h4>Support for development of local industries</h4>
          <div class="__drone5">
            <div class="__icoBox pt0">
              <dl class="__dotList bar __fz20 __black">
                <dt>Project for the establishment of a foundation for smart specialization (Specialized field: Transport equipment)</dt>
                <dd>- Support details: Technical assistance (process enhancement and technical guidance) and training for equipment operators<br>
                  - Support performance (2021): Eight cases for five enterprises
                </dd>

                <dt>Support project for regional specialized (non-R&D) businesses (Specialized field: Intelligent machine parts)</dt>
                <dd>- Support details: Prototype making, testing/analysis, certification, connection to experts, and support for resolving technical difficulties<br>
                  - Support performance (2021): 13 cases for eight enterprises
                </dd>

                <dt>Jeollabuk-do growth ladder project</dt>
                <dd>- Jeollabuk-do startup support project (business diagnosis, growth strategy making, etc.)<br>
                  - Jeollabuk-do promising business support project (IR competence strengthening, identifying the global demand for R&D, etc.)<br>
                  - Jeollabuk-do leading business support project (customized consulting, global innovation competence strengthening, etc.)
                </dd>

                <dt>ODA</dt>
                <dd>- ODA project for New Southern Region/Indonesia (machine tools)<br>
                  - ODA project for New Northern Region/Uzbekistan (agricultural machinery, smart farm)<br>
                  - ODA project for Ethiopia (agricultural machinery)<br>
                  - Export–Import Bank of Korea (Uzbekistan; agricultural machinery)

                </dd>
              </dl>
            </div>
            <div class="img" style="display:flex;flex-wrap:wrap; width:600px;">
              <img src="/images/camtic/businesseENG3-1.png" alt="">
              <img src="/images/camtic/businesseENG3-2.png" alt="">
              <img src="/images/camtic/businesseENG3-3.jpg" alt="">
              <img src="/images/camtic/businesseENG3-4.jpg" alt="">
              <img src="/images/camtic/businesseENG3-5.jpg" alt="">
              <img src="/images/camtic/businesseENG3-6.png" alt="">
            </div>
          </div>
<!--ppt18-->
        <h4>HR development/Job competence training</h4>
        <div class="__drone5">
          <div class="__icoBox pt0">
            <dl class="__dotList bar __fz20 __black">
              <dt>CEO/Executives</dt>
              <dd>- Innovative Leaders' Forum – Leadership training for CEOs and executives in the Jeollabuk-do area</dd>

              <dt>Job competence improvement training for employees</dt>
              <dd>- Jeollabuk-do Innovative Leaders' Forum (2006–2019, held for a total of 115 sessions)<br>
                - Local industry-customized HR development project (MOEL, since 2015)<br>
                - Work-study balance project (MOEL, since 2014)<br>
                - Employer training and paid leave training (MOEL, since 2016)<br>
                - Industry-customized specialized workforce cultivation project (MOTIE; carbon materials, parts, and equipment; since 2022)
              </dd>

              <dt>Training for college students/unemployed college graduates</dt>
              <dd>- Local industry-customized HR development project (MOEL, since 2015)<br>
                - Training for workforce of natural sciences and engineering (MSIT, since 2011)<br>
                - Technical workforce training for college students in the province including Jeonbuk National University<br>
              </dd>

              <dt>Drones, design, big data, smart factories, etc.</dt>
            </dl>
          </div>
          <div class="img" style="display:flex;flex-wrap:wrap; width:600px;">
            <img src="/images/camtic/businesseENG4-1.jpg" alt="">
            <img src="/images/camtic/businesseENG4-2.jpg" alt="">
            <img src="/images/camtic/businesseENG4-3.jpg" alt="">
            <img src="/images/camtic/businesseENG4-4.png" alt="">
            <img src="/images/camtic/businesseENG4-5.jpg" alt="">
            <img src="/images/camtic/businesseENG4-6.png" alt="">
          </div>
        </div>

        <!--ppt19-->
        <h4>Employment support project</h4>
        <div class="__drone5">
          <div class="__icoBox pt0">
            <dl class="__dotList bar __fz20 __black">
              <dt>Job support programs for youth</dt>
              <dd>- Natural sciences and engineering: Cultivation of specialized workforce; training including automated facilities, control, and CATIA; and job placement-based support<br>
                - Job club: Customized job support for young people’s job clubs, job consulting, etc.<br>
                - Hope for youth: Company tours, job placement, youth talk concert, mentoring for competence development, etc.<br>
              </dd>

              <dt>Support for enterprises’ employment</dt>
              <dd>- Management and operation of Jeollabuk-do recruitment platforms, operation of leading enterprises’ analysis competition, etc.
              </dd>

              <dt>• Gunsan Employment Support Center</dt>
              <dd>- Support for Gunsan’s employment promotion programs, demand-customized job training, and job support
              </dd>

              <dt>Support project for the preemptive response package for regions facing an employment crisis</dt>
              <dd>- Provision of subsidies for domestic logistics costs and support for overseas market expansion to diversify customers<br>
                - Provision of employment incentives to vitalize newly growing industries such as hydrogen vehicles<br>
                - Corporate growth support project to encourage enterprises to employ job seekers
              </dd>
            </dl>
          </div>
          <div class="img" style="display:flex;flex-wrap:wrap; width:600px;">
            <img src="/images/camtic/businesseENG5-1.jpg" alt="">
            <img src="/images/camtic/businesseENG5-2.jpg" alt="">
            <img src="/images/camtic/businesseENG5-3.jpg" alt="">
            <img src="/images/camtic/businesseENG5-4.png" alt="">
            <img src="/images/camtic/businesseENG5-5.png" alt="">
            <img src="/images/camtic/businesseENG5-6.jpg" alt="">
          </div>
        </div>

        <!--ppt20-->
        <h4>Startup assistance</h4>
        <div class="__drone5">
          <div class="__icoBox pt0">
            <dl class="__dotList bar __fz20 __black">
              <dt>Support project for startups of specialized fields (carbon, future batteries, etc.)</dt>
              <dd>- Discovery of outstanding ideas (items) of carbon materials (composite materials) and provision of support for business foundation and commercialization<br>
                - Carbon-Startup Hacker Road, Startup item contest<br>
                - Provision of a commercialization package for outstanding (aspiring) business starters in future battery materials and parts
              </dd>

              <dt>Maker Space (Jeonju Drone Workshop Wing-Wing Station)</dt>
              <dd>- Operation of educational and specialized programs to encourage creative/leading maker activities in the drone industry<br>
                - Equipment owned: Drones, FUSION 360, 3D printers (FDM, SLA), 3D scanners, etc.
              </dd>

              <dt>Startup networking program</dt>
              <dd>- Active exchanges and networking in the startup ecosystem<br>
                *Exchange day of startup-associated institutions, IR mastering, crowdfunding program, etc.<br>
                - CAMTIC Startup Festival (business starters’ product display, performance exchanges)
              </dd>
            </dl>
          </div>
          <div class="img" style="display:flex;flex-wrap:wrap; width:600px;">
            <img src="/images/camtic/businesseENG6-1.jpg" alt="">
            <img src="/images/camtic/businesseENG6-2.jpg" alt="">
            <img src="/images/camtic/businesseENG6-3.jpg" alt="">
            <img src="/images/camtic/businesseENG6-4.jpg" alt="">
            <img src="/images/camtic/businesseENG6-5.jpg" alt="">
            <img src="/images/camtic/businesseENG6-6.jpg" alt="">
          </div>
        </div>




        <div class="__tit1 __mt50">
          <h3><strong>Commercialization</strong></h3>
        </div>
        <div class="__vision50">
          <img src="/images/camtic/img-busi_03.jpg" alt="">
        </div>

      </div>
      </div>
    </div>
  </div>
  <jsp:include page="/WEB-INF/jsp/template/camtic/foot.jsp" flush="false"/>
</div>
</body>
</html>