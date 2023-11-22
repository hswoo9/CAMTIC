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
          <li><a href="/camtic/about/greetingENG.do"><img src="/images/camtic/home_1.png" class="homeImage">HOME</a></li>
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
          <div class="__tit1 __mt0" >
            <h3><strong>Research & Business Development</strong></h3>
          </div>
          <div class="__vision50" style="border-top: 1px dashed #b7b7b7;">
            <img src="/images/camtic/img-busi_01ENG.png" alt="">
          </div>
         <%-- <div class="__vision50">
            <div class="__imgW __imgW9">
              <div class="wrap">
                <img src="/images/camtic/img-busi_01.png" alt="">  <!--영어 이미지로 변경-->
                <div class="iw iw1"><span>Enterprise</span></div>
                <div class="iw iw2"><span>R<br>&<br>B<br>D</span></div>
                <div class="iw iw3"><span>R&D</span></div>
                <div class="iw iw4"><span>Prototype<br>manufacturing</span></div>
                <div class="iw iw5"><span>Product<br>development</span></div>
                <div class="iw iw6"><span>Testing/<br>Certification</span></div>

                <div class="iw iw7"><span>Sales and employment growth<br>Productivity enhancement<br>Product/Technology development</span></div>
                <div class="iw iw8"><span>Non<br>-<br>R<br>&<br>D</span></div>
                <div class="iw iw9"><span>Engineering</span></div>
                <div class="iw iw10"><span>Mass production</span></div>
                <div class="iw iw11"><span>Utilization of equipment</span></div>
                <div class="iw iw12"><span>Support projects</span></div>

                <div class="iw iw13"><span>Specialized technology</span></div>
                <div class="iw iw14 dot tal">
                  <ul>
                    <li>Injection mold</li>
                    <li>Multi-processed mold</li>
                    <li>Green vehicle lightweighting technology</li>
                    <li>Automated production of carbon composites</li>
                  </ul>
                </div>

                <div class="iw iw15"><span>Specialized technology</span></div>
                <div class="iw iw16 dot tal">
                  <ul>
                    <li>Smart healthcare</li>
                    <li>Manufactured intelligent robots</li>
                    <li>Smart farms & aerofarms</li>
                    <li>Nanofibers</li>
                  </ul>
                </div>

                <div class="iw iw17"><span>Specialized technology</span></div>
                <div class="iw iw18 dot tal">
                  <ul>
                    <li>Smart factories</li>
                    <li>Process automation</li>
                    <li>
                      System Integration<br>(Mechatronics Automatives)
                    </li>
                  </ul>
                </div>
                <div class="iw iw19"><span>Composite materials</span></div>
                <div class="iw iw20"><span>New technology convergence</span></div>
                <div class="iw iw21"><span>Manufacturing innovation</span></div>
              </div>
            </div>
          </div>--%>
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




      </div>
    </div>
  </div>
  <jsp:include page="/WEB-INF/jsp/template/camtic/foot.jsp" flush="false"/>
</div>
</body>
</html>