<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<jsp:include page="/WEB-INF/jsp/template/camtic/common.jsp" flush="false"/>
<style>
  .__bio3 .area{margin: 0 60px;}
  .__jvalley3 .sw .box{border: 4px solid #008000;}
  .__jvalley3 .sw .box h6{color: #008000;}
  .__bio3 .area .box .img img{height: 240px;}
  .__jvalley3 .sw .box .img img{width: 100%; height: 130px;}
  .__bio3 .area .box .txt{font-size: 12px; line-height: 1.6em;}
  .__jvalley3 .sw .box .cont .txt {font-size: 12px;line-height: 1.6em; text-align: center; margin-top: 5px;}
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
          <li><a href="/camtic/about/greetingENG.do"><img src="/images/camtic/home_1.png" class="homeImage">HOME</a></li>
          <li class="mdCategory">Major Business Areas</li>
          <li class="smCategory" style="display: none;">Major Business Areas</li>
        </ul>
        <div id="title">
          <h3>Major Business Areas</h3>
        </div>
        <div class="__busi m0" style="padding: 0px 52px">
          <div class="__tit1 __mt50" >
            <h3><strong>Commercialization of key technologies</strong></h3>
          </div>

          <div class="__vision50" style="border-top: 1px dashed #b7b7b7;">
            <img src="/images/camtic/img-busi_03ENG.png" alt="">
          </div>

<%--          <div class="__vision50">
            <div class="__imgW __imgW11">
              <div class="wrap">
                <img src="/images/camtic/img-busi_03.png" alt="">
                <div class="iw iw1"><span>Expertise/Experience in key technology</span></div>
                <div class="iw iw2"><span>Profit making</span></div>
                <div class="iw iw3"><span>Key<br>tech<br>nolo<br>gy</span></div>
                <div class="iw iw4"><span>Com<br>merc<br>ializa<br>tion</span></div>
                <div class="iw iw5"><span>Drone</span></div>
                <div class="iw iw6"><span>Smart manufacturing</span></div>
                <div class="iw iw7"><span>Aerospace</span></div>

                <div class="iw iw8"><span>Key technology</span></div>
                <div class="iw iw9 dot tal">
                  <ul>
                    <li>Drone Industry Innovation Support Center</li>
                    <li>Industrial drone platform</li>
                    <li>Drone R&D / Product discovery</li>
                    <li>Drone soccer and contents</li>
                  </ul>
                </div>

                <div class="iw iw10"><span>Key technology</span></div>
                <div class="iw iw11 dot tal">
                  <ul>
                    <li>Production/Quality innovation</li>
                    <li>Smart factory</li>
                    <li>Real-time data monitoring</li>
                    <li>Optimized adaptive control</li>
                  </ul>
                </div>

                <div class="iw iw12"><span>Key technology</span></div>
                <div class="iw iw13 dot tal">
                  <ul>
                    <li>Space/Aviation/Defense/<br>Energy</li>
                    <li>MGSE manufacturing</li>
                    <li>Aircraft test parts/assembly</li>
                    <li>Combustion test rig manufacturing</li>
                  </ul>
                </div>

                <div class="iw iw14"><span>Drone</span></div>
                <div class="iw iw15"><span>Smart manufacturing</span></div>
                <div class="iw iw16"><span>Aerospace</span></div>
              </div>
            </div>
          </div>--%>
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
            <div class="sw" style="margin: 0 100px;">
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
            <div class="box" style="width: 1000px;">
              <div class="cont" style="display: flex;flex-direction: row; align-items: center;">
                <div class="img" style="width: calc(100% / 4); margin-right: 12px;"><div class="img"><img src="/images/camtic/businesseENG12-1.png" alt=""></div><div class="txt">Japan Drone Soccer Federation established<br>in 2020</div></div>
                <div class="img" style="width: calc(100% / 4); margin-right: 12px;"><div class="img"><img src="/images/camtic/businesseENG12-2.jpg" alt=""></div><div class="txt">China held Youth Drone Soccer Competition<br>in 2021</div></div>
                <div class="img" style="width: calc(100% / 4); margin-right: 12px;"><div class="img"><img src="/images/camtic/businesseENG12-3.jpg" alt=""></div><div class="txt">Drone soccer demonstration and relevant<br>hands-on contents provided in France in 2021</div></div>
                <div class="img" style="width: calc(100% / 4)"><div class="img"><img src="/images/camtic/businesseENG12-4.jpg" alt=""></div><div class="txt">2019 Amsterdam Drone Week<br>(Netherlands)</div></div>
              </div>
            </div>
          </div>
        </div>

       <%-- <div class="__bio3">
          <h3>• Overseas: Approved as an official event by the FAI affiliated to the International Olympic Committee; Distributed to Japan, China, France, the Netherlands, and so on.</h3>
          <div class="box __mt20" style="padding: 0px 50px;">
            <div class="cont" style="display: flex;">
              <div class="img"><div class="img"><img src="/images/camtic/businesseENG12-1.png" alt=""></div><div class="txt">Japan Drone Soccer Federation established in 2020</div></div>
              <div class="img"><div class="img"><img src="/images/camtic/businesseENG12-2.jpg" alt=""></div><div class="txt">China held Youth Drone Soccer Competition in 2021</div></div>
              <div class="img"><div class="img"><img src="/images/camtic/businesseENG12-3.jpg" alt=""></div><div class="txt">Drone soccer ball for players</div></div>
              <div class="img"><div class="img"><img src="/images/camtic/businesseENG12-4.jpg" alt=""></div><div class="txt">Drone soccer ball for childre</div></div>
            </div>
          </div>
        </div>--%>

          <div class="__jvalley3 __mt100">
            <div class="sw" style="justify-content: center; align-items: center; margin: 0 100px; gap: 50px;">
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
                <div class="cont" <%--style="display: flex; flex-direction: row; align-items: center; justify-content: center;--%> ">
                  <div class="img"><div class="img"><img src="/images/camtic/businesseENG13-5.jpg" alt=""></div><div class="txt">Drone soccer field in Jeonju World Cup Stadium</div></div>
                  <div class="img"><div class="img"><img src="/images/camtic/businesseENG13-6.png" alt=""></div><div class="txt">Air bounce drone soccer field</div></div>
                </div>
              </div>
            </div>
          </div>

          <div class="__jvalley3 __mt100">
            <div class="sw" style="margin: 0 100px;">
              <div class="box">
                <h6>DESKTOP ROBOT</h6>
                <div class="cont">
                  <div class="img"><div class="img"><img src="/images/camtic/businesseENG14-1.png" alt=""></div><div class="txt" style="text-align: left;">ㆍ Commercialization of manufacturing process platform
                    <br>ㆍ Process standardization and flexible manufacturing</div></div>
                </div>
              </div>
              <div class="box">
                <h6 style="font-size: 14px;">Hydrogen-powered bus safety test</h6>
                <div class="cont" style="display: flex;flex-direction: column;">
                  <div class="img"><div class="img"><img src="/images/camtic/businesseENG14-2.jpg" alt=""></div><div class="txt"></div></div>
                  <div class="img"><div class="img"><img src="/images/camtic/businesseENG14-3.jpg" alt=""></div><div class="txt" style="text-align: left;">ㆍ Hydrogen tank penetration test system
                    <br>ㆍ Deep learning-based imaging
                  </div></div>
                </div>
              </div>
              <div class="box">
                <h6>Process monitoring</h6>
                <div class="cont" style="display: flex;flex-direction: column;">
                  <div class="img"><div class="img"><img src="/images/camtic/businesseENG14-4.jpg" alt=""></div><div class="txt"></div></div>
                  <div class="img"><div class="img"><img src="/images/camtic/businesseENG14-5.png" alt=""></div><div class="txt" style="text-align: left;">ㆍ Smart factory / Smart farm<br>ㆍ Establishment of a manufacturing data platform
                  </div></div>
                </div>
              </div>
              <div class="box">
                <h6>Inspection system</h6>
                <div class="cont" style="display: flex;flex-direction: column;">
                  <div class="img"><div class="img"><img src="/images/camtic/businesseENG14-6.jpg" alt=""></div><div class="txt"></div></div>
                  <div class="img"><div class="img"><img src="/images/camtic/businesseENG14-7.png" alt=""></div><div class="txt" style="text-align: left;">ㆍ Data-based inspection program</div></div>
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