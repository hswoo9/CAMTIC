<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<jsp:include page="/WEB-INF/jsp/template/camtic/common.jsp" flush="false"/>
<style>
  .__history1 .area  {margin-top: 50px;}
  .__history1 .area .box .top:before {background: none;}
  .__history1 .area .box:nth-child(1) .top:after {background:#636363;}
  .__history1 .area .box .top{display: flex; justify-content: space-between; flex-direction: row;}
  .__history1 .area .box .top .con dl{width:700px;}
  .__history1 .area .box .top .con dt{line-height:20px; font-weight: bold; width: 38px;}
  .__history1 .area .box .top .con dd{line-height:20px;}
  .__history1 .area .box .top .img{width: 300px; margin-top: 0px; display: flex; flex-direction: row; flex-wrap: wrap;}
  .__history1 .area .box .top .img img{padding: 5px;}
  .__history1 .area .box h4 span{display: inline-block;color: #fff;font-size: 13px;font-weight: 600;line-height: 20px;border-radius: 20px; padding: 0 20px;margin-bottom: 30px;text-align: center;}
  .__history {max-width:1130px;margin:0 auto;}
  @media all and (max-width: 1200px) {
    .__history1 .area{padding:20px 15px;}
    .__history1 .area .box {}
    .__history1 .area .box .top {display: grid}
    .__history1 .area .box .top .con {width: 100%;}
    .__history1 .area .box .top .con dl{width:340px;}
    .__history1 .area .box .top .img{margin: 0 auto;}
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
          <li class="mdCategory">History</li>
          <li class="smCategory" style="display: none;">History</li>
        </ul>
        <div id="title">
          <h3>History</h3>
        </div>

        <div class="__history1">
          <%--<div class="__tit1 __mt0">
            <h4 style="font-size: 45px; font-weight: bold; color: #000;"><strong>History</strong></h4>
          </div>--%>

          <div class="area">
            <div class="box">
              <h4><span style="background: #24e1cd;">Innovation<br>2020-present</span></h4>
              <div class="top" style="height: auto;">
                <div class="con">
                  <dl>
                    <dt>2020</dt>
                    <dd>MAR Jeonju Advanced Venture Complex designated as Jeonbuk R&D Special District<br>
                      APR Acquired the highest grade at 2019 Work-Study Performance Evaluation<br>
                      AUG Completed the construction of Jeonju Innovation Startup Hub Startup Building and started operation<br>
                    </dd>
                  </dl>
                  <dl>
                    <dt></dt>
                    <dd>
                      DEC Jeonju Advanced Venture Complex selected as a successful community-led innovation and growth case (MOEL)
                    </dd>
                  </dl>
                  <dl>
                    <dt>2021</dt>
                    <dd>MAR Selected for the support project for distribution of national standards of ICT smart farm equipment (Ministry of Agriculture, Food and Rural Affairs)<br>
                      MAY Selected for the AI learning data construction project (Ministry of Science and ICT (MSIT))<br>
                      AUG Selected for official development assistance project for Ethiopia (MOTIE)
                    </dd>
                  </dl>
                  <dl>
                    <dt></dt>
                    <dd>
                      OCT Formed CAMTIC Cluster Individual Investment Association No. 1<br>
                      NOV Founded EDIM from spin-off<br>
                      DEC Commenced the working design of Jeonju Advanced Venture Complex Technology Startup Growth Support Center (Growth Building)
                    </dd>
                  </dl>
                  <dl>
                    <dt>2022</dt>
                    <dd>JAN Jeonju City Government selected Jeonju Advanced Venture Complex as a private outsourcing agency<br>
                      MAR Completed the working design of Jeonju Advanced Venture Complex Technology Startup Growth Support Center (Growth Building)<br>
                    </dd>
                  </dl>
                  <dl>
                    <dt></dt>
                    <dd>
                      MAR Opened MOLIT-designated Drone Industry Innovation Support Center
                    </dd>
                  </dl>
                  <dl>
                    <dt></dt>
                    <dd>
                      APR Selected as MSS Maker Space Lab “Jeonju Drone Workshop Wing-Wing Station”<br>
                      MAY Construction commencement of Jeonju Advanced Venture Complex Technology Startup Growth Support Center (Growth Building) (scheduled)
                    </dd>
                  </dl>
                </div>
                <div class="img">
                  <img src="/images/camtic/history3-1.jpg" style="width:300px;">
                  <img src="/images/camtic/history3-2.jpg" style="width:300px;">
                  <img src="/images/camtic/history3-3.jpg" style="width:300px;">
                </div>

              </div>
            </div>
          </div>

          <div class="area">
            <div class="box">
              <h4><span style="background: #305c9a;">Growth<br>2010-2019</span></h4>
              <div class="top" style="height: auto;">
                <div class="con">
                  <dl>
                    <dt>2011</dt>
                    <dd <%--style="width:800px;"--%>>JUN Jeonju City Government and Jeonju Advanced Venture Complex signed a two-phased agreement (5 years)</dd>
                  </dl>
                  <dl>
                    <dt>2012</dt>
                    <dd>JUL Designated as a Jeollabuk-do SME convergence support center</dd>
                  </dl>
                  <dl>
                    <dt>2013</dt>
                    <dd>APR Designated as a job competence development training facility by the Ministry of Employment and Labor (MOEL)</dd>
                  </dl>
                  <dl>
                    <dt>2014</dt>
                    <dd>AUG Selected as the Dual Joint Training Center for Both Work and Study by MOEL</dd>
                  </dl>
                  <dl>
                    <dt>2015</dt>
                    <dd>FEB Selected as the human resource development and joint training center customized for regional industries by MOEL<br>
                      AUG Changed the coorporation name to “CAMTIC Advanced Mechatronics Technology Institute for Commercialization”<br>
                      NOV Signed an agreement for SI certification and business cooperation with Festo Korea Co., Ltd.
                    </dd>
                  </dl>
                  <dl>
                    <dt>2016</dt>
                    <dd>JUL Jeonju City Government selected Jeonju Advanced Venture Complex as a private outsourcing agency<br>
                      SEP Founded Palbok Industry from spin-off
                    </dd>
                  </dl>
                  <dl>
                    <dt>2017</dt>
                    <dd>APR Declared “CAMTIC Cluster Vision 2030”<br>
                      NOV Commercialized Smart Cutting (active process control system)
                    </dd>
                  </dl>
                  <dl>
                    <dt>2018</dt>
                    <dd>MAY Signed an agreement as an agency of Gunsan Job Support Center (MOEL Gunsan Office, Gunsan City Government)<br>
                      NOV Founded Korea Drone Soccer Association (under MOTIE)
                    </dd>
                  </dl>
                  <dl>
                    <dt>2019</dt>
                    <dd>MAY Invited KOSME “Smart Factory Class”<br>
                      OCT Selected as an excellent job competence training agency by MOEL (for 3 years)
                    </dd>
                  </dl>
                </div>
                <div class="img">
                  <img src="/images/camtic/history2-1.jpg" style="width:300px;">
                  <img src="/images/camtic/history2-2.jpg" style="width:300px;">
                </div>
              </div>
            </div>
          </div>


          <div class="area">
            <div class="box">
              <h4><span style="background: #41ace0;">Foundation<br>1999-2009</span></h4>
              <div class="top" style="height: auto;">
                <div class="con">
                  <dl>
                    <dt>1999</dt>
                    <dd>DEC Registered by the Ministry of Commerce, Industry and Energy (MOTIE) in accordance with the Act on Industrial Technology Infrastructuring</dd>
                  </dl>
                  <dl>
                    <dt>2001</dt>
                    <dd>NOV Founded non-profit corporation</dd>
                  </dl>
                  <dl>
                    <dt>2002</dt>
                    <dd>JUN Opened Jeonju Advanced Venture Complex and started operation<br>
                      OCT Invited Jeonju Machinery Industry Research Center (former Korea Technology Institute of Carbon Convergence)
                    </dd>
                  </dl>
                  <dl>
                    <dt>2003</dt>
                    <dd>OCT Conducted High-Tech Machinery Industry Innovation Strategy Briefing Session attended by the late former president Roh Moo-hyun<br>
                      DEC Invited Jeonbuk Technopark
                    </dd>
                  </dl>
                  <dl>
                    <dt>2004</dt>
                    <dd>AUG Obtained ISO 9001:2000/KSA 9001:2001 (for the first time in TIC)</dd>
                  </dl>
                  <dl>
                    <dt>2005</dt>
                    <dd>JUN Ranked first in Korea at MOTIE’s final TIC evaluation</dd>
                  </dl>
                  <dl>
                    <dt>2009</dt>
                    <dd>SEP Invited Defense Agency for Technology and Quality and Jeonju National Defense Venture Center<br>
                      NOV Selected as the best institution at “Successful Cases of Regional Innovation Centers” by the Ministry of Knowledge Economy<br>
                      DEC Obtained AS9100 (International standardized quality management system for the aerospace industry)
                    </dd>
                  </dl>
                </div>
                <div class="img">
                  <img src="/images/camtic/history1-1.jpg" style="width:300px;">
                  <img src="/images/camtic/history1-2.jpg" style="width:150px;">
                  <img src="/images/camtic/history1-3.jpg" style="width:150px;">
                </div>
              </div>

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