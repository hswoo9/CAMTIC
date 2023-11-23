<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<jsp:include page="/WEB-INF/jsp/template/camtic/common.jsp" flush="false"/>
<style>
  .__bio3 .area{padding: 0px 20px;}
  .__jvalley3 .sw .box{border: 4px solid #008000;}
  .__jvalley3 .sw .box h6{color: #008000;}
  .__bio3 .area .box .img img{height: 240px;}
  .__jvalley3 .sw .box .img img{width: 100%; height: 130px;}
  .__bio3 .area .box .txt{font-size: 12px; line-height: 1.6em;}
  .__jvalley3 .sw .box .cont .txt {font-size: 12px;line-height: 1.6em; text-align: center}
  h4{font-size: 20px; margin-bottom: 10px; }
  h3{font-size: 16px;}
  .__busiA {display: flex;flex-wrap: wrap;gap: 35px 38px;justify-content: center;align-items: center;}
  .__busiA .__busiArea{width: calc(100% / 3 - (76px / 3));}
  .__busiA .__busiArea h2{font-size: 26px;}
  .__busiA .__busiArea h6{font-size: 16px; margin-top: 5px;}
  .__busiA .__busiArea .__busiText{margin-top: 50px; height: 300px;}
  .__busiA .__busiArea .__busiText h4{font-size: 20px; text-align: center; margin-top: 15px;}

  @media all and (max-width: 1200px) {
    .__busiA {display: flex;flex-direction: column;gap: 35px 38px;justify-content: center;align-items: center;}
    .__busiA .__busiArea {width: 100%; height: 350px; margin: 10px 0;}
  }



</style>
</head>

<body>
<div id="wrap">
  <jsp:include page="/WEB-INF/jsp/template/camtic/headENG.jsp" flush="false"/>
  <div id="sub">
    <div class="inner">
      <jsp:include page="/WEB-INF/jsp/template/camtic/lnbENG.jsp" flush="false"/>
      <div id="content">
        <ul id="navigation">
          <li><a href="/camtic/about/greetingENG.do"><img src="/images/camtic/home_3.png" class="homeImage">HOME</a></li>
          <li class="mdCategory">Major Business Areas</li>
          <li class="smCategory" style="display: none;">Major Business Areas</li>
        </ul>
        <div id="title">
          <h3>Major Business Areas</h3>
        </div>

        <div class="__busi m0" style="padding: 0px 52px">
          <%--<div class="__tit1 __mt0" style="display: flex;">
            <h4 style="font-size: 45px; font-weight: bold; color: #000;"><strong>Major Business Areas</strong></h4>
          </div>--%>
          <div class="__vision50" style="border: none; margin-bottom: 0px;">
            <img src="/images/camtic/symbol.png" alt="" style="margin-bottom: 100px; width:100px; height: 150px;">
            <div class="__busiA">
              <div class="__busiArea" style="color:#305c9a;">
                <h2>Business Growth <br>Support</h2>
                <h6>Business Growth Support</h6>
                <div class="__busiText">
                  <h4>Local industrial development</h4>
                  <h4>Official development assistance (ODA)</h4>
                  <h4>HR development / cultivation</h4>
                  <h4>job / Startup support</h4>
                </div>
              </div>
              <div class="__busiArea" style="color:#41ace0;">
                <h2>Research & Business Development</h2>
                <h6>Research & Business Development</h6>
                <div class="__busiText">
                  <h4>Smart factory / Robot</h4>
                  <h4>Smart healthcare / Smart farm</h4>
                  <h4>Development of carbon composites</h4>
                </div>
              </div>
              <div class="__busiArea" style="color:#24e1cd;">
                <h2>Commercialization</h2>
                <h6>Business for <br>Commercialization</h6>
                <div class="__busiText">
                  <h4>Aerospace</h4>
                  <h4>Drones</h4>
                  <h4>Smart manufacturing</h4>
                </div>
              </div>
            </div>
          </div>

          <%--<div class="__tit1 __mt0" >
            <h3><strong>Research & Business Development</strong></h3>
          </div>
          &lt;%&ndash;<div class="__vision50" style="border-top: 1px dashed #b7b7b7;">
            <img src="/images/camtic/img-busi_01ENG.png" alt="">
          </div>&ndash;%&gt;
          <div class="__vision50">
            <div class="__imgW __imgW1">
              <div class="wrap">
                <img src="/images/camtic/img-busi_01.png" alt="">  <!--영어 이미지로 변경-->
                <div class="iw iw1"><span>Enterprise</span></div>
                <div class="iw iw2"><span>R<br>&<br>B<br>D</span></div>
                <div class="iw iw3"><span>R&D</span></div>
                <div class="iw iw4" style="font-size: 14px;"><span>Prototype<br>manufacturing</span></div>
                <div class="iw iw5" style="font-size: 14px;"><span>Product<br>development</span></div>
                <div class="iw iw6" style="font-size: 14px;"><span>Testing/<br>Certification</span></div>

                <div class="iw iw7" style="font-size: 22px;"><span>Sales and employment growth<br>Productivity enhancement<br>Product/Technology development</span></div>
                <div class="iw iw8" style="font-size:30px;"><span>Non<br>-<br>R<br>&<br>D</span></div>
                <div class="iw iw9" style="font-size: 14px;"><span>Engineering</span></div>
                <div class="iw iw10" style="font-size: 14px;"><span>Mass production</span></div>
                <div class="iw iw11" style="font-size: 14px;"><span>Utilization of equipment</span></div>
                <div class="iw iw12" style="font-size: 14px;"><span>Support projects</span></div>

                <div class="iw iw13" style="font-size: 13px;"><span>Specialized technology</span></div>
                <div class="iw iw14 dot tal" style="font-size: 12px;">
                  <ul>
                    <li>Injection mold</li>
                    <li>Multi-processed mold</li>
                    <li>Green vehicle lightweighting technology</li>
                    <li>Automated production of carbon composites</li>
                  </ul>
                </div>

                <div class="iw iw15" style="font-size: 13px;"><span>Specialized technology</span></div>
                <div class="iw iw16 dot tal" style="font-size: 13px;">
                  <ul>
                    <li>Smart healthcare</li>
                    <li>Manufactured intelligent robots</li>
                    <li>Smart farms & aerofarms</li>
                    <li>Nanofibers</li>
                  </ul>
                </div>

                <div class="iw iw17" style="font-size: 13px;"><span>Specialized technology</span></div>
                <div class="iw iw18 dot tal" style="font-size: 13px;">
                  <ul>
                    <li>Smart factories</li>
                    <li>Process automation</li>
                    <li>
                      System Integration<br>(Mechatronics Automatives)
                    </li>
                  </ul>
                </div>
                <div class="iw iw19" style="font-size: 15px;"><span>Composite materials</span></div>
                <div class="iw iw20" style="font-size: 15px;"><span>New technology convergence</span></div>
                <div class="iw iw21" style="font-size: 15px;"><span>Manufacturing innovation</span></div>
              </div>
            </div>
          </div>
        </div>

        <div class="__bio3">
          <h4>New technology convergence</h4>
          <h3>• Support cases</h3>
          <div class="area __mt20">
            <div class="box"><div class="img"><img src="/images/camtic/businesseENG1-1.jpg" alt=""></div>
              <div class="txt">CAMTIC – Developed room covering rail system for the indoor convenience of persons with disabilities</div></div>
            <div class="box"><div class="img"><img src="/images/camtic/businesseENG1-2.jpg" alt=""></div>
              <div class="txt">Poonglim Pharmatech –Made a prototype of medicinal fluid measuring pen device</div></div>
            <div class="box"><div class="img"><img src="/images/camtic/businesseENG1-3.jpg" alt=""></div>
              <div class="txt">CBH –Developed a multi-functional carbon table for vertebral joint diagnosis and surgery</div></div>
            <div class="box"><div class="img"><img src="/images/camtic/businesseENG1-4.png" alt=""></div>
              <div class="txt"><br>MPROS –Developed a sleep apnea testing device</div></div>
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
        </div>

        <div class="__bio3">
          <h4>Manufacturing innovation cases</h4>
          <h3>• Support cases</h3>
          <div class="area __mt20">
              <div class="box"><div class="img"><img src="/images/camtic/businesseENG2-1.jpg" alt=""></div><div class="txt">[Daeyang Solution - Smart security solution]</div></div>
              <div class="box"><div class="img"><img src="/images/camtic/businesseENG2-2.jpg" alt=""></div><div class="txt">[Daeyang Solution - Smart security solution]</div></div>
              <div class="box"><div class="img"><img src="/images/camtic/businesseENG2-3.jpg" alt=""></div><div class="txt">[KTL - PV module testing equipment]</div></div>
              <div class="box"><div class="img"><img src="/images/camtic/businesseENG2-4.jpg" alt=""></div><div class="txt">[Solar Park - Cross bar machine]</div></div>
              <div class="box"><div class="img"><img src="/images/camtic/businesseENG2-5.jpg" alt=""></div><div class="txt">[Solar Park - Stringer]</div></div>
              <div class="box"><div class="img"><img src="/images/camtic/businesseENG2-6.jpg" alt=""></div><div class="txt">[Solar Park - Ribbon attacher]</div></div>
          </div>
        </div>

        <div class="__busi m0" style="padding: 0px 52px">
          <div class="__tit1 __mt50" >
            <h3><strong>Business Growth Support</strong> </h3>
          </div>
          &lt;%&ndash;<div class="__vision50" style="border-top: 1px dashed #b7b7b7;">
            <img src="/images/camtic/img-busi_02ENG.png" alt="">
          </div>&ndash;%&gt;
          <div class="__vision50">

            <div class="__imgW __imgW2">
              <div class="wrap">
                <img src="/images/camtic/img-busi_02.png" alt="">
                <div class="iw iw1" style="font-size: 22px;"><span>Foundation/innovation/<br>growth<br>by business growth phase</span></div>
                <div class="iw iw2" style="font-size: 22px;"><span>Foundation/technology/<br>management<br>Business growth by field</span></div>
                <div class="iw iw3" style="font-size: 14px;"><span>HR development</span></div>
                <div class="iw iw4" style="font-size: 14px;"><span>Local industrial development</span></div>
                <div class="iw iw5" style="font-size: 14px;"><span>Job creation</span></div>
                <div class="iw iw6" style="font-size: 14px;"><span>Foundation</span></div>

                <div class="iw iw7" style="font-size: 13px;"><span>HR development</span></div>
                <div class="iw iw8 dot tal" style="font-size:10px;">
                  <ul>
                    <li>HR cultivation</li>
                    <li>Work-study balance/Paid leave</li>
                    <li>Employer training</li>
                    <li>Job competence building for employees</li>
                    <li>Technical workforce training for college students</li>
                  </ul>
                </div>

                <div class="iw iw9" style="font-size: 13px;"><span>Local industrial development</span></div>
                <div class="iw iw10 dot tal" style="font-size: 13px;">
                  <ul>
                    <li>Technology commercialization support</li>
                    <li>Growth ladder support</li>
                    <li>AI data projects</li>
                    <li>ODA projects</li>
                  </ul>
                </div>

                <div class="iw iw11" style="font-size: 13px;"><span>Job creation</span></div>
                <div class="iw iw12 dot tal" style="font-size: 11px;">
                  <ul>
                    <li>Job support program for youth</li>
                    <li>Support for employment</li>
                    <li>Employment Crisis Support Center</li>
                    <li>Preemptive response for job security</li>
                  </ul>
                </div>

                <div class="iw iw13" style="font-size: 13px;"><span>Foundation</span></div>
                <div class="iw iw14 dot tal" style="font-size: 13px;">
                  <ul>
                    <li>Support for business foundation in specialized fields</li>
                    <li>Maker Space</li>
                    <li>Network of startup-associated institutions</li>
                  </ul>
                </div>
                <div class="iw iw15" style="font-size: 22px;"><span>Gr<br>ow<br>th<br>ass<br>is<br>tan<br>ce</span></div>
                <div class="iw iw16" style="font-size: 22px;"><span>Co<br>op<br>er<br>at<br>ion</span></div>
                <div class="iw iw17" style="font-size: 8px;"><span>Employe training</span></div>
                <div class="iw iw18" style="font-size: 8px;"><span>Startup assistance</span></div>
                <div class="iw iw19" style="font-size: 8px;"><span>Support for commercialization</span></div>
                <div class="iw iw20" style="font-size: 8px;"><span>Employment support</span></div>
                <div class="iw iw21" style="font-size: 8px;"><span>Marketing</span></div>
                <div class="iw iw22" style="font-size: 8px;"><span>Technical assistance</span></div>
                <div class="iw iw23" style="font-size: 8px;"><span>Consulting</span></div>

              </div>
            </div>
          </div>




        </div>

        <div class="__bio3">
          <h4 style="margin-top: 20px;">Training infrastructure</h4>
          <div class="area __mt20 __mb20" >
            <div class="box"><div class="img"><img src="/images/camtic/businesseENG7-1.jpg" alt=""></div><div class="txt">Technology commercialization experts’ consulting</div></div>
            <div class="box"><div class="img"><img src="/images/camtic/businesseENG7-2.png" alt=""></div><div class="txt">Invitation of foreign buyers</div></div>
          </div>

          <div class="area" >
            <div class="box"><div class="img"><img src="/images/camtic/businesseENG7-3.jpg" alt=""></div><div class="txt">ODA project for Ethiopia</div></div>
            <div class="box"><div class="img"><img src="/images/camtic/businesseENG7-4.jpg" alt=""></div><div class="txt">ODA project for Indonesia</div></div>
          </div>
        </div>

        <div class="__bio3">
          <h4>Support for development of local industries</h4>
          <div class="area __mt20">
            <div class="box"><div class="img"><img src="/images/camtic/businesseENG3-1.png" alt=""></div><div class="txt">Technology commercialization experts’ consulting</div></div>
            <div class="box"><div class="img"><img src="/images/camtic/businesseENG3-2.png" alt=""></div><div class="txt">Invitation of foreign buyers</div></div>
            <div class="box"><div class="img"><img src="/images/camtic/businesseENG3-3.jpg" alt=""></div><div class="txt">ODA project for Ethiopia</div></div>
            <div class="box"><div class="img"><img src="/images/camtic/businesseENG3-4.jpg" alt=""></div><div class="txt">ODA project for Indonesia</div></div>
            <div class="box"><div class="img"><img src="/images/camtic/businesseENG3-5.jpg" alt=""></div><div class="txt">Support for startups in Jeollabuk-do</div></div>
            <div class="box"><div class="img"><img src="/images/camtic/businesseENG3-6.png" alt=""></div><div class="txt">Strengthening leading enterprises’ global innovation competences</div></div>
          </div>
        </div>

        <div class="__bio3">
          <h4>HR development/Job competence training</h4>
          <div class="area __mt20">
            <div class="box"><div class="img"><img src="/images/camtic/businesseENG4-1.jpg" alt=""></div><div class="txt">Training for employees</div></div>
            <div class="box"><div class="img"><img src="/images/camtic/businesseENG4-2.jpg" alt=""></div><div class="txt">Paid leave and employer training</div></div>
            <div class="box"><div class="img"><img src="/images/camtic/businesseENG4-3.jpg" alt=""></div><div class="txt">Training for the unemployed</div></div>
            <div class="box"><div class="img"><img src="/images/camtic/businesseENG4-4.png" alt=""></div><div class="txt">Work-study balance</div></div>
            <div class="box"><div class="img"><img src="/images/camtic/businesseENG4-5.jpg" alt=""></div><div class="txt">Training for the unemployed</div></div>
            <div class="box"><div class="img"><img src="/images/camtic/businesseENG4-6.png" alt=""></div><div class="txt">Innovative Leaders' Forum</div></div>
          </div>
        </div>

        <div class="__bio3">
          <h4>Employment support project</h4>
          <div class="area __mt20">
            <div class="box"><div class="img"><img src="/images/camtic/businesseENG5-1.jpg" alt=""></div><div class="txt">Job interview</div></div>
            <div class="box"><div class="img"><img src="/images/camtic/businesseENG5-2.jpg" alt=""></div><div class="txt">Jeollabuk-do leading enterprises’ analysis competition</div></div>
            <div class="box"><div class="img"><img src="/images/camtic/businesseENG5-3.jpg" alt=""></div><div class="txt">Hope for youth - Company tour</div></div>
            <div class="box"><div class="img"><img src="/images/camtic/businesseENG5-4.png" alt=""></div><div class="txt"><br>Career lecture for job club</div></div>
            <div class="box"><div class="img"><img src="/images/camtic/businesseENG5-5.png" alt=""></div><div class="txt"><br>Gunsan Employment Support Center</div></div>
            <div class="box"><div class="img"><img src="/images/camtic/businesseENG5-6.jpg" alt=""></div><div class="txt">Support project for the preemptive response package for regions facing an employment crisis</div></div>
          </div>
        </div>

        <div class="__bio3">
          <h4>Startup assistance</h4>
          <div class="area __mt20">
            <div class="box"><div class="img"><img src="/images/camtic/businesseENG6-1.jpg" alt=""></div><div class="txt">Carbon-Startup Hacker Road</div></div>
            <div class="box"><div class="img"><img src="/images/camtic/businesseENG6-2.jpg" alt=""></div><div class="txt">Startup lecture</div></div>
            <div class="box"><div class="img"><img src="/images/camtic/businesseENG6-3.jpg" alt=""></div><div class="txt">Startup Networking Day</div></div>
            <div class="box"><div class="img"><img src="/images/camtic/businesseENG6-4.jpg" alt=""></div><div class="txt">CAMTIC Startup Festival</div></div>
            <div class="box"><div class="img"><img src="/images/camtic/businesseENG6-5.jpg" alt=""></div><div class="txt">Startup Mentoring Day</div></div>
            <div class="box"><div class="img"><img src="/images/camtic/businesseENG6-6.jpg" alt=""></div><div class="txt">Business starters’ products exhibition</div></div>
          </div>
        </div>



          <div class="__tit1 __mt50" >
            <h3><strong>Commercialization of key technologies</strong></h3>
          </div>
          &lt;%&ndash;<div class="__vision50" style="border-top: 1px dashed #b7b7b7;">
            <img src="/images/camtic/img-busi_03ENG.png" alt="">
          </div>&ndash;%&gt;
        <div class="__vision50">
          <div class="__imgW __imgW3">
            <div class="wrap">
              <img src="/images/camtic/img-busi_03.png" alt="">
              <div class="iw iw1" style="font-size: 22px;"><span>Expertise/Experience in key technology</span></div>
              <div class="iw iw2" style="font-size: 22px;"><span>Profit making</span></div>
              <div class="iw iw3" style="font-size: 22px;"><span>Key<br>tech<br>nolo<br>gy</span></div>
              <div class="iw iw4" style="font-size: 22px;"><span>Com<br>merc<br>ializa<br>tion</span></div>
              <div class="iw iw5"><span>Drone</span></div>
              <div class="iw iw6" style="font-size: 16px;"><span>Smart manufacturing</span></div>
              <div class="iw iw7"><span>Aerospace</span></div>

              <div class="iw iw8" style="font-size: 13px;"><span>Key technology</span></div>
              <div class="iw iw9 dot tal" style="font-size: 13px;">
                <ul>
                  <li>Drone Industry Innovation Support Center</li>
                  <li>Industrial drone platform</li>
                  <li>Drone R&D / Product discovery</li>
                  <li>Drone soccer and contents</li>
                </ul>
              </div>

              <div class="iw iw10" style="font-size: 13px;"><span>Key technology</span></div>
              <div class="iw iw11 dot tal" style="font-size: 13px;">
                <ul>
                  <li>Production/Quality innovation</li>
                  <li>Smart factory</li>
                  <li>Real-time data monitoring</li>
                  <li>Optimized adaptive control</li>
                </ul>
              </div>

              <div class="iw iw12" style="font-size: 13px;"><span>Key technology</span></div>
              <div class="iw iw13 dot tal" style="font-size: 12px;">
                <ul>
                  <li>Space/Aviation/Defense/<br>Energy</li>
                  <li>MGSE manufacturing</li>
                  <li>Aircraft test parts/assembly</li>
                  <li>Combustion test rig manufacturing</li>
                </ul>
              </div>

              <div class="iw iw14"><span>Drone</span></div>
              <div class="iw iw15" style="font-size: 15px;"><span>Smart manufacturing</span></div>
              <div class="iw iw16" style="font-size: 15px;"><span>Aerospace</span></div>
            </div>
          </div>
        </div>




        <div class="__bio3">
          <h4>Aerospace</h4>
          <h3>• Specialized technology</h3>
          <div class="area __mt20">
            <div class="box"><div class="img"><img src="/images/camtic/businesseENG8-1.jpg" alt=""></div><div class="txt"></div></div>
            <div class="box"><div class="img"><img src="/images/camtic/businesseENG8-2.jpg" alt=""></div><div class="txt"></div></div>
          </div>
        </div>

        <div class="__bio3">
          <h3>• Development cases</h3>
          <div class="area __mt20">
            <div class="box"><div class="img"><img src="/images/camtic/businesseENG9-1.jpg" alt=""></div><div class="txt">[Hanwha Aerospace - Endurance test equipment for composite material-based fan blade]</div></div>
            <div class="box"><div class="img"><img src="/images/camtic/businesseENG9-2.jpg" alt=""></div><div class="txt"><br>[Hanwha Aerospace - Test equipment for KSLV-2 gimbal mount]</div></div>
            <div class="box"><div class="img"><img src="/images/camtic/businesseENG9-3.png" alt=""></div><div class="txt"><br>[Agency for Defense Development - Engine combustion test facility]</div></div>
            <div class="box"><div class="img"><img src="/images/camtic/businesseENG9-4.jpg" alt=""></div><div class="txt"><br>[Agency for Defense Development - Engine combustion test rig]</div></div>
            <div class="box"><div class="img"><img src="/images/camtic/businesseENG9-5.jpg" alt=""></div><div class="txt">[Korea Aerospace Research Institute - Foldable optical module for geostationary obit]</div></div>
            <div class="box"><div class="img"><img src="/images/camtic/businesseENG9-6.png" alt=""></div><div class="txt"><br>[Korea Aerospace Research Institute - MGSE for satellites]
            </div></div>
          </div>
        </div>

        <div class="__bio3">
          <h4>Development of industrial drone platform (Multipath, Apparatus and software)</h4>
          <div class="area __mt20">
            <div class="box"><div class="img"><img src="/images/camtic/businesseENG10-1.png" alt=""></div><div class="txt">Multipath drone</div></div>
            <div class="box"><div class="img"><img src="/images/camtic/businesseENG10-2.png" alt=""></div><div class="txt">Multipath drone for mission</div></div>
          </div>
        </div>

        <div class="__bio3">
          <h4>Distribution of drone soccer</h4>
          <h3>• In Korea: 18 offices, 32 branches of Korea Drone Soccer Association; 1,500 teams currently operating</h3>
        </div>
          <div class="__jvalley3">
            <div class="sw">
              <div class="box">
                <h6>2017</h6>
                <div class="cont">
                  <div class="img"><div class="img"><img src="/images/camtic/businesseENG11-1.jpg" alt=""></div><div class="txt">1st Jeonju Mayor’s Cup National Drone Soccer Championship</div></div>
                  <div class="img"><div class="img"><img src="/images/camtic/businesseENG11-5.jpg" alt=""></div><div class="txt">2017 Korea Drone Soccer Festival</div></div>
                </div>
              </div>
              <div class="box">
                <h6>2018</h6>
                <div class="cont" style="display: flex;flex-direction: column;">
                  <div class="img"><div class="img"><img src="/images/camtic/businesseENG11-2.jpg" alt=""></div><div class="txt">2nd Jeonju Mayor’s Cup National Drone Soccer Championship</div></div>
                  <div class="img"><div class="img"><img src="/images/camtic/businesseENG11-6.jpg" alt=""></div><div class="txt">2018 SPOEX Cup National Drone Soccer Championship</div></div>
                </div>
              </div>
              <div class="box">
                <h6>2019</h6>
                <div class="cont" style="display: flex;flex-direction: column;">
                  <div class="img"><div class="img"><img src="/images/camtic/businesseENG11-3.jpg" alt=""></div><div class="txt">Jeonju Mayor’s Cup International Drone Soccer Championship</div></div>
                  <div class="img"><div class="img"><img src="/images/camtic/businesseENG11-7.jpg" alt=""></div><div class="txt">The Segye Ilbo International Drone Soccer Championships</div></div>
                </div>
              </div>
              <div class="box">
                <h6>2020</h6>
                <div class="cont" style="display: flex;flex-direction: column;">
                  <div class="img"><div class="img"><img src="/images/camtic/businesseENG11-4.jpg" alt=""></div><div class="txt"><br>2020 friendly match without spectators</div></div>
                  <div class="img"><div class="img"><img src="/images/camtic/businesseENG11-8.jpg" alt=""></div><div class="txt"><br>2020 Ulsan Drone Soccer Championship</div></div>
                </div>
              </div>
            </div>
          </div>

        <div class="__bio3">
          <h3>• Overseas: Approved as an official event by the FAI affiliated to the International Olympic Committee; Distributed to Japan, China, France, the Netherlands, and so on.</h3>
        </div>
        <div class="__jvalley3">
          <div class="sw" style="justify-content: center; align-items: center;">
            <div class="box" style="width: 1234px;">
              <div class="cont" style="display: flex;flex-direction: row; align-items: center;">
                <div class="img" style="width: calc(100% / 4); margin-right: 12px;"><div class="img"><img src="/images/camtic/businesseENG12-1.png" alt=""></div><div class="txt">Japan Drone Soccer Federation established<br>in 2020</div></div>
                <div class="img" style="width: calc(100% / 4); margin-right: 12px;"><div class="img"><img src="/images/camtic/businesseENG12-2.jpg" alt=""></div><div class="txt">China held Youth Drone Soccer Competition<br>in 2021</div></div>
                <div class="img" style="width: calc(100% / 4); margin-right: 12px;"><div class="img"><img src="/images/camtic/businesseENG12-3.jpg" alt=""></div><div class="txt">Drone soccer demonstration and relevant<br>hands-on contents provided in France in 2021</div></div>
                <div class="img" style="width: calc(100% / 4)"><div class="img"><img src="/images/camtic/businesseENG12-4.jpg" alt=""></div><div class="txt">2019 Amsterdam Drone Week<br>(Netherlands)</div></div>
              </div>
            </div>
          </div>
        </div>

       &lt;%&ndash; <div class="__bio3">
          <h3>• Overseas: Approved as an official event by the FAI affiliated to the International Olympic Committee; Distributed to Japan, China, France, the Netherlands, and so on.</h3>
          <div class="box __mt20" style="padding: 0px 50px;">
            <div class="cont" style="display: flex;">
              <div class="img"><div class="img"><img src="/images/camtic/businesseENG12-1.png" alt=""></div><div class="txt">Japan Drone Soccer Federation established in 2020</div></div>
              <div class="img"><div class="img"><img src="/images/camtic/businesseENG12-2.jpg" alt=""></div><div class="txt">China held Youth Drone Soccer Competition in 2021</div></div>
              <div class="img"><div class="img"><img src="/images/camtic/businesseENG12-3.jpg" alt=""></div><div class="txt">Drone soccer ball for players</div></div>
              <div class="img"><div class="img"><img src="/images/camtic/businesseENG12-4.jpg" alt=""></div><div class="txt">Drone soccer ball for childre</div></div>
            </div>
          </div>
        </div>&ndash;%&gt;

          <div class="__jvalley3 __mt100">
            <div class="sw" style="justify-content: center; align-items: center;">
              <div class="box" style="display: flex; flex-direction: column; align-items: center;width: calc(100% / 2);">
                <h6>Drone soccer ball</h6>
                <div class="cont" style="display: flex; flex-direction: row; align-items: center;">
                  <div class="img"><div class="img"><img src="/images/camtic/businesseENG13-1.png" alt=""></div><div class="txt">Japan Drone Soccer <br>Federation established in 2020</div></div>
                  <div class="img"><div class="img"><img src="/images/camtic/businesseENG13-2.jpg" alt=""></div><div class="txt">China held Youth Drone <br>Soccer Competition in 2021</div></div>
                </div>
                <div class="cont" style="display: flex; flex-direction: row; align-items: center;">
                  <div class="img"><div class="img"><img src="/images/camtic/businesseENG13-3.png" alt=""></div><div class="txt">Drone soccer ball for players</div></div>
                  <div class="img"><div class="img"><img src="/images/camtic/businesseENG13-4.png" alt=""></div><div class="txt">Drone soccer ball for childre</div></div>
                </div>
              </div>
              <div class="box" style="display: flex; flex-direction: column; align-items: center;width: calc(100% / 2); height: 415px;">
                <h6>Drone soccer field</h6>
                <div class="cont" &lt;%&ndash;style="display: flex; flex-direction: row; align-items: center; justify-content: center;&ndash;%&gt; ">
                  <div class="img"><div class="img"><img src="/images/camtic/businesseENG13-5.jpg" alt=""></div><div class="txt">Drone soccer field in Jeonju World Cup Stadium</div></div>
                  <div class="img"><div class="img"><img src="/images/camtic/businesseENG13-6.png" alt=""></div><div class="txt">Air bounce drone soccer field</div></div>
                </div>
              </div>
            </div>
          </div>

          <div class="__jvalley3 __mt100">
            <div class="sw">
              <div class="box">
                <h6>DESKTOP ROBOT</h6>
                <div class="cont">
                  <div class="img"><div class="img"><img src="/images/camtic/businesseENG14-1.png" alt=""></div><div class="txt"></div></div>
                </div>
              </div>
              <div class="box">
                <h6 style="font-size: 14px;">Hydrogen-powered bus safety test</h6>
                <div class="cont" style="display: flex;flex-direction: column;">
                  <div class="img"><div class="img"><img src="/images/camtic/businesseENG14-2.jpg" alt=""></div><div class="txt"></div></div>
                  <div class="img"><div class="img"><img src="/images/camtic/businesseENG14-3.jpg" alt=""></div><div class="txt"></div></div>
                </div>
              </div>
              <div class="box">
                <h6>Process monitoring</h6>
                <div class="cont" style="display: flex;flex-direction: column;">
                  <div class="img"><div class="img"><img src="/images/camtic/businesseENG14-4.jpg" alt=""></div><div class="txt"></div></div>
                  <div class="img"><div class="img"><img src="/images/camtic/businesseENG14-5.png" alt=""></div><div class="txt"></div></div>
                </div>
              </div>
              <div class="box">
                <h6>Inspection system</h6>
                <div class="cont" style="display: flex;flex-direction: column;">
                  <div class="img"><div class="img"><img src="/images/camtic/businesseENG14-6.jpg" alt=""></div><div class="txt"></div></div>
                  <div class="img"><div class="img"><img src="/images/camtic/businesseENG14-7.png" alt=""></div><div class="txt"></div></div>
                </div>
              </div>
            </div>
          </div>
--%>
        </div>
      </div>
    </div>
  </div>
  <jsp:include page="/WEB-INF/jsp/template/camtic/foot.jsp" flush="false"/>
</div>
</body>
</html>