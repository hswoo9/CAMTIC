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
          <li><a href="/camtic/about/greetingENG.do">HOME</a></li>
          <li class="mdCategory">Major Business Areas</li>
          <li class="smCategory" style="display: none;">Major Business Areas</li>
        </ul>
        <div id="title">
          <h3>Major Business Areas</h3>
        </div>

        <div class="__busi m0" style="padding: 0px 52px">
          <div class="__tit1 __mt50" >
            <h3><strong>Business Growth Support</strong> </h3>
          </div>

          <div class="__vision50">

            <div class="__imgW __imgW10">
              <div class="wrap">
                <img src="/images/camtic/img-busi_02.png" alt="">
                <div class="iw iw1"><span>Foundation/innovation/<br>growth<br>by business growth phase</span></div>
                <div class="iw iw2"><span>Foundation/technology/<br>management<br>Business growth by field</span></div>
                <div class="iw iw3"><span>HR development</span></div>
                <div class="iw iw4"><span>Local industrial development</span></div>
                <div class="iw iw5"><span>Job creation</span></div>
                <div class="iw iw6"><span>Foundation</span></div>

                <div class="iw iw7"><span>HR development</span></div>
                <div class="iw iw8 dot tal">
                  <ul>
                    <li>HR cultivation</li>
                    <li>Work-study balance/Paid leave</li>
                    <li>Employer training</li>
                    <li>Job competence building for employees</li>
                    <li>Technical workforce training for college students</li>
                  </ul>
                </div>

                <div class="iw iw9"><span>Local industrial development</span></div>
                <div class="iw iw10 dot tal">
                  <ul>
                    <li>Technology commercialization support</li>
                    <li>Growth ladder support</li>
                    <li>AI data projects</li>
                    <li>ODA projects</li>
                  </ul>
                </div>

                <div class="iw iw11"><span>Job creation</span></div>
                <div class="iw iw12 dot tal">
                  <ul>
                    <li>Job support program for youth</li>
                    <li>Support for employment</li>
                    <li>Employment Crisis Support Center</li>
                    <li>Preemptive response for job security</li>
                  </ul>
                </div>

                <div class="iw iw13"><span>Foundation</span></div>
                <div class="iw iw14 dot tal">
                  <ul>
                    <li>Support for business foundation in specialized fields</li>
                    <li>Maker Space</li>
                    <li>Network of startup-associated institutions</li>
                  </ul>
                </div>
                <div class="iw iw15"><span>Gr<br>ow<br>th<br>ass<br>is<br>tan<br>ce</span></div>
                <div class="iw iw16"><span>Co<br>op<br>er<br>at<br>ion</span></div>
                <div class="iw iw17"><span>Employe training</span></div>
                <div class="iw iw18"><span>Startup assistance</span></div>
                <div class="iw iw19"><span>Support for commercialization</span></div>
                <div class="iw iw20"><span>Employment support</span></div>
                <div class="iw iw21"><span>Marketing</span></div>
                <div class="iw iw22"><span>Technical assistance</span></div>
                <div class="iw iw23"><span>Consulting</span></div>

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


      </div>
    </div>
  </div>
  <jsp:include page="/WEB-INF/jsp/template/camtic/foot.jsp" flush="false"/>
</div>
</body>
</html>