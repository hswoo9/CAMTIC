<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<jsp:include page="/WEB-INF/jsp/template/camtic/common.jsp" flush="false"/>
</head>

<body>
<div id="wrap">
  <jsp:include page="/WEB-INF/jsp/template/camtic/headENG.jsp" flush="false"/>
  <div id="sub">
    <div class="inner">
      <jsp:include page="/WEB-INF/jsp/template/camtic/lnbENG.jsp" flush="false"/>
      <div id="content">
        <jsp:include page="/WEB-INF/jsp/template/camtic/navi_titleENG.jsp" flush="false"/>
        <div class="__greeting">
          <dl class="head">
            <dt style="text-align: center"><span class="__nm" style="color:#155996 !important;">“</span><span class="mainCapyTitle" style="color:#155996 !important;">Great Workplace for Mutual Growth</span><span class="__nm" style="color:#155996 !important;">”</span></dt>
          </dl>
          <div class="mainAbou">
            <div class="lef" style=" width: 800px;">
              <div class="area">
                <div class="txt">
                  <img src="/images/camtic/greetingTest2.png" class="is-m1" style="/*max-width: 100%;*/ width: 300px; border-radius: 70px;" alt="원장 노상흡">
                  Thank you for visiting the website of CAMTIC.
                  <br><br>
                  CAMTIC Advanced Mechatronics Technology Institute for Commercialization (CAMTIC) was established in December 1999 in an effort to advance local industries through technological innovations.
                  <br><br>
                  Cooperating with customers at home and abroad in various fields, such as R&D, technological support, nurturing talents, and creating jobs, we have been growing as a crucial institute.
                  <br><br>
                  At CAMTIC, we are ceaselessly striving to innovate new technologies in various industries encompassing drone mobility, carbon composites, bio health care, smart machine manufacture, and aerospace based on our expertise and know-how.
                  <br><br>
                  We have founded and expanding “J-Valley,” a manufacturing innovation platform for startups conducting cutting-edge and digital businesses. The Jeonju Innovation Startup Hub located inside the Jeonju Advanced Venture Complex which was built in 2002 and its Growth Block which will be open in August 2024 will aid the platform in supporting startups.
                  <br><br>
                  CAMTIC will continue acting as a companion for you, making a bright future together for the betterment of mutual growth and development.
                  <br><br>
                  Thank you.
                </div>
                <div class="sign" style="margin-top: 30px; text-align: right; font-size: 20px; color: #0d0d0d;">
                  <strong style="margin-right: 5px;">President</strong>
                  <strong>Ro Sang Heub</strong>
                </div>
              </div>
            </div>
            <div class="rig" style="width: 600px; padding-top: 150px;">
              <img src="/images/camtic/greetingTest3.png" class="is-m" style="max-width: 132%; width: auto; border-radius: 70px; height: 460px;" alt="원장 노상흡">
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