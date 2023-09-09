<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<jsp:include page="/WEB-INF/jsp/template/camtic/common.jsp" flush="false"/>
</head>
<style>
  /*타이틀 위치 네비위치와 비슷하게 수정 width 수정*/
  .img{width:1230px; height:1000px;}
  .imgMobile {display: none;}
  .imgMobileList{display:none;}
  @media screen and (max-width: 1024px) {
    .img {width:750px; height:650px;}
    .imgMobileList{display: inline;}
    .imgList{display: none;}
  }
  @media screen and (max-width: 600px) {
    .img {display: none;}
    .imgList{display: none;}
    .imgMobile {display: inline;}
    .imgMobileList{display: inline;}
  }
</style>
<body>
<div id="wrap">
  <jsp:include page="/WEB-INF/jsp/template/camtic/head.jsp" flush="false"/>
  <div id="sub">
    <div class="inner">
      <jsp:include page="/WEB-INF/jsp/template/camtic/lnb.jsp" flush="false"/>
      <div id="content">
        <jsp:include page="/WEB-INF/jsp/template/camtic/navi_title.jsp" flush="false"/>

        <div class="__organization m0">
          <dl class="tit">
            <dt>조직체계</dt>
            <dd>3본부 3사업부 1실 4센터 11팀, 현원 <strong>114</strong>명</dd>
          </dl>
          <div class="img" style="margin-top:0;">
            <%--<img src="/images/camtic/img-organization.jpg" alt="">--%>
              <svg
                      version="1.1"
                      id="svg2"
                      <%--width="1300"
                      height="1000"--%>
                      viewBox="0 0 1724.7467 1431.5601"
                      sodipodi:docname="2265_infographic1.ai"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:svg="http://www.w3.org/2000/svg">
                <defs
                        id="defs6">
                  <clipPath
                          clipPathUnits="userSpaceOnUse"
                          id="clipPath34">
                    <path
                            d="M 0,1073.667 H 1293.556 V 0 H 0 Z"
                            id="path32" />
                  </clipPath>
                  <clipPath
                          clipPathUnits="userSpaceOnUse"
                          id="clipPath62">
                    <path
                            d="M 0,1073.667 H 1293.556 V 0 H 0 Z"
                            id="path60" />
                  </clipPath>
                  <clipPath
                          clipPathUnits="userSpaceOnUse"
                          id="clipPath90">
                    <path
                            d="M 0,1073.667 H 1293.556 V 0 H 0 Z"
                            id="path88" />
                  </clipPath>
                  <clipPath
                          clipPathUnits="userSpaceOnUse"
                          id="clipPath122">
                    <path
                            d="M 0,1073.667 H 1293.556 V 0 H 0 Z"
                            id="path120" />
                  </clipPath>
                  <clipPath
                          clipPathUnits="userSpaceOnUse"
                          id="clipPath150">
                    <path
                            d="M 0,1073.667 H 1293.556 V 0 H 0 Z"
                            id="path148" />
                  </clipPath>
                  <clipPath
                          clipPathUnits="userSpaceOnUse"
                          id="clipPath182">
                    <path
                            d="M 0,1073.667 H 1293.556 V 0 H 0 Z"
                            id="path180" />
                  </clipPath>
                  <clipPath
                          clipPathUnits="userSpaceOnUse"
                          id="clipPath214">
                    <path
                            d="M 0,1073.667 H 1293.556 V 0 H 0 Z"
                            id="path212" />
                  </clipPath>
                  <clipPath
                          clipPathUnits="userSpaceOnUse"
                          id="clipPath242">
                    <path
                            d="M 0,1073.667 H 1293.556 V 0 H 0 Z"
                            id="path240" />
                  </clipPath>
                  <clipPath
                          clipPathUnits="userSpaceOnUse"
                          id="clipPath280">
                    <path
                            d="M 0,1073.667 H 1293.556 V 0 H 0 Z"
                            id="path278" />
                  </clipPath>
                  <clipPath
                          clipPathUnits="userSpaceOnUse"
                          id="clipPath316">
                    <path
                            d="M 0,1073.667 H 1293.556 V 0 H 0 Z"
                            id="path314" />
                  </clipPath>
                  <clipPath
                          clipPathUnits="userSpaceOnUse"
                          id="clipPath344">
                    <path
                            d="M 0,1073.667 H 1293.556 V 0 H 0 Z"
                            id="path342" />
                  </clipPath>
                  <clipPath
                          clipPathUnits="userSpaceOnUse"
                          id="clipPath372">
                    <path
                            d="M 0,1073.667 H 1293.556 V 0 H 0 Z"
                            id="path370" />
                  </clipPath>
                  <clipPath
                          clipPathUnits="userSpaceOnUse"
                          id="clipPath400">
                    <path
                            d="M 0,1073.667 H 1293.556 V 0 H 0 Z"
                            id="path398" />
                  </clipPath>
                  <clipPath
                          clipPathUnits="userSpaceOnUse"
                          id="clipPath428">
                    <path
                            d="M 0,1073.667 H 1293.556 V 0 H 0 Z"
                            id="path426" />
                  </clipPath>
                  <clipPath
                          clipPathUnits="userSpaceOnUse"
                          id="clipPath448">
                    <path
                            d="M 0,1073.667 H 1293.556 V 0 H 0 Z"
                            id="path446" />
                  </clipPath>
                  <clipPath
                          clipPathUnits="userSpaceOnUse"
                          id="clipPath468">
                    <path
                            d="M 0,1073.667 H 1293.556 V 0 H 0 Z"
                            id="path466" />
                  </clipPath>
                  <clipPath
                          clipPathUnits="userSpaceOnUse"
                          id="clipPath488">
                    <path
                            d="M 0,1073.667 H 1293.556 V 0 H 0 Z"
                            id="path486" />
                  </clipPath>
                </defs>
                <sodipodi:namedview
                        id="namedview4"
                        pagecolor="#ffffff"
                        bordercolor="#000000"
                        borderopacity="0.25"
                        inkscape:showpageshadow="2"
                        inkscape:pageopacity="0.0"
                        inkscape:pagecheckerboard="0"
                        inkscape:deskcolor="#d1d1d1" />
                <g
                        id="g8"
                        inkscape:groupmode="layer"
                        inkscape:label="2265_infographic1"
                        transform="matrix(1.3333333,0,0,-1.3333333,0,1431.56)">
                  <path
                          d="M 0,0 H 1293.556 V 1073.667 H 0 Z"
                          style="/*fill:#f2fcfe;*/fill:#fff;fill-opacity:1;fill-rule:nonzero;stroke:none" <%--배경색 흰색으로 변경--%>
                          id="path10" />
                  <text
                          xml:space="preserve"
                          transform="matrix(1,0,0,-1,78.6045,262.7305)"
                          style="font-variant:normal;font-weight:500;font-stretch:normal;font-size:15px;font-family:'Noto Sans CJK KR';-inkscape-font-specification:NotoSansCJKkr-Medium;writing-mode:lr-tb;fill:#252525;fill-opacity:1;fill-rule:nonzero;stroke:none"
                          id="text26"><tspan
                          x="0 8.6099997 11.985 25.785 39.584999 53.384998 67.184998"
                          y="0"
                          sodipodi:role="line"
                          id="tspan12">· 제조혁신팀</tspan><tspan
                          x="0 8.6099997 11.985 25.785 39.584999 53.384998 67.184998 80.985001"
                          y="21.075001"
                          sodipodi:role="line"
                          id="tspan14">· 신기술융합팀</tspan><tspan
                          x="232.53 241.14 244.515 258.315 272.11499 285.91501 299.715 313.51501 327.315"
                          y="0"
                          sodipodi:role="line"
                          id="tspan16">· 지역산업육성팀</tspan><tspan
                          x="232.53 241.14 244.515 258.315 272.11499 285.91501 299.715"
                          y="21.075001"
                          sodipodi:role="line"
                          id="tspan18">· 인재개발팀</tspan><tspan
                          x="232.53 241.14 244.515 258.315 272.11499 285.91501 299.715 313.51501 327.315 341.11499"
                          y="41.834999"
                          sodipodi:role="line"
                          id="tspan20">· 일자리창업허브팀</tspan><tspan
                          x="465.06 473.67001 477.04501 490.845 504.64499 518.44501 532.245 546.04498 559.84497"
                          y="-6.6613381e-15"
                          sodipodi:role="line"
                          id="tspan22">· 우주항공개발팀</tspan><tspan
                          x="465.06 473.67001 477.04501 490.845 504.64499 518.44501 532.245 546.04498 559.84497"
                          y="21.075001"
                          sodipodi:role="line"
                          id="tspan24">· 우주항공기술팀</tspan></text>
                  <g
                          id="g28">
                    <g
                            id="g30"
                            clip-path="url(#clipPath34)">
                      <g
                              id="g36"
                              transform="translate(462.9749,823.2728)">
                        <path
                                d="m 0,0 h -137.419 c -3.153,0 -5.709,2.556 -5.709,5.709 V 48.2 c 0,3.153 2.556,5.709 5.709,5.709 L 0,53.909 c 3.153,0 5.709,-2.556 5.709,-5.709 V 5.709 C 5.709,2.556 3.153,0 0,0"
                                style="fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
                                id="path38" />
                      </g>
                      <g
                              id="g40"
                              transform="translate(281.6105,889.9586)">
                        <path
                                d="m 0,0 c -4.217,0 -7.647,-3.431 -7.647,-7.647 v -64.168 c 0,-4.217 3.43,-7.647 7.647,-7.647 h 184.917 c 4.216,0 7.647,3.43 7.647,7.647 v 64.168 c 0,4.216 -3.431,7.647 -7.647,7.647 z M 184.917,-82.462 H 0 c -5.871,0 -10.647,4.776 -10.647,10.647 V -7.647 C -10.647,-1.776 -5.871,3 0,3 h 184.917 c 5.871,0 10.647,-4.776 10.647,-10.647 v -64.168 c 0,-5.871 -4.776,-10.647 -10.647,-10.647"
                                style="fill:#252525;fill-opacity:1;fill-rule:nonzero;stroke:none"
                                id="path42" />
                      </g>
                      <g
                              id="g44"
                              transform="translate(422.6155,816.0266)">
                        <path
                                d="M 0,0 H -150.152 V 68.402 H 0 c 2.795,0 5.061,-2.266 5.061,-5.061 V 5.061 C 5.061,2.266 2.795,0 0,0"
                                style="fill:#252525;fill-opacity:1;fill-rule:nonzero;stroke:none"
                                id="path46" />
                      </g>
                      <g
                              id="g48"
                              transform="translate(452.8397,850.4395)">
                        <path
                                d="m 0,0 h -9.974 c -2.812,0 -5.092,-2.28 -5.092,-5.091 v -8.605 H 5.091 v 8.605 C 5.091,-2.28 2.812,0 0,0 m -4.987,2.552 c -3.572,0 -6.468,2.896 -6.468,6.468 0,3.572 2.896,6.468 6.468,6.468 3.572,0 6.468,-2.896 6.468,-6.468 0,-3.572 -2.896,-6.468 -6.468,-6.468"
                                style="fill:#252525;fill-opacity:1;fill-rule:nonzero;stroke:none"
                                id="path50" />
                      </g>
                    </g>
                  </g>
                  <text
                          xml:space="preserve"
                          transform="matrix(1,0,0,-1,325.3218,842.2598)"
                          style="font-variant:normal;font-weight:500;font-stretch:normal;font-size:18px;font-family:'Noto Sans CJK KR';-inkscape-font-specification:NotoSansCJKkr-Medium;writing-mode:lr-tb;fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
                          id="text54"><tspan
                          x="0 16.559999 33.119999"
                          y="0"
                          sodipodi:role="line"
                          id="tspan52">이사회</tspan></text>
                  <g
                          id="g56">
                    <g
                            id="g58"
                            clip-path="url(#clipPath62)">
                      <g
                              id="g64"
                              transform="translate(1008.3929,823.2728)">
                        <path
                                d="m 0,0 h -137.419 c -3.153,0 -5.709,2.556 -5.709,5.709 V 48.2 c 0,3.153 2.556,5.709 5.709,5.709 L 0,53.909 c 3.153,0 5.709,-2.556 5.709,-5.709 V 5.709 C 5.709,2.556 3.153,0 0,0"
                                style="fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
                                id="path66" />
                      </g>
                      <g
                              id="g68"
                              transform="translate(827.0285,889.9586)">
                        <path
                                d="m 0,0 c -4.217,0 -7.648,-3.431 -7.648,-7.647 v -64.168 c 0,-4.217 3.431,-7.647 7.648,-7.647 h 184.917 c 4.216,0 7.647,3.43 7.647,7.647 v 64.168 c 0,4.216 -3.431,7.647 -7.647,7.647 z M 184.917,-82.462 H 0 c -5.871,0 -10.648,4.776 -10.648,10.647 V -7.647 C -10.648,-1.776 -5.871,3 0,3 h 184.917 c 5.871,0 10.647,-4.776 10.647,-10.647 v -64.168 c 0,-5.871 -4.776,-10.647 -10.647,-10.647"
                                style="fill:#252525;fill-opacity:1;fill-rule:nonzero;stroke:none"
                                id="path70" />
                      </g>
                      <g
                              id="g72"
                              transform="translate(968.0334,816.0266)">
                        <path
                                d="M 0,0 H -150.152 V 68.402 H 0 c 2.795,0 5.061,-2.266 5.061,-5.061 V 5.061 C 5.061,2.266 2.795,0 0,0"
                                style="fill:#252525;fill-opacity:1;fill-rule:nonzero;stroke:none"
                                id="path74" />
                      </g>
                      <g
                              id="g76"
                              transform="translate(998.2577,850.4395)">
                        <path
                                d="m 0,0 h -9.974 c -2.812,0 -5.092,-2.28 -5.092,-5.091 v -8.605 H 5.091 v 8.605 C 5.091,-2.28 2.812,0 0,0 m -4.987,2.552 c -3.572,0 -6.468,2.896 -6.468,6.468 0,3.572 2.896,6.468 6.468,6.468 3.572,0 6.468,-2.896 6.468,-6.468 0,-3.572 -2.896,-6.468 -6.468,-6.468"
                                style="fill:#252525;fill-opacity:1;fill-rule:nonzero;stroke:none"
                                id="path78" />
                      </g>
                    </g>
                  </g>
                  <text
                          xml:space="preserve"
                          transform="matrix(1,0,0,-1,876.4995,842.2598)"
                          style="font-variant:normal;font-weight:500;font-stretch:normal;font-size:18px;font-family:'Noto Sans CJK KR';-inkscape-font-specification:NotoSansCJKkr-Medium;writing-mode:lr-tb;fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
                          id="text82"><tspan
                          x="0 16.559999 21.6"
                          y="0"
                          sodipodi:role="line"
                          id="tspan80">감 사</tspan></text>
                  <g
                          id="g84">
                    <g
                            id="g86"
                            clip-path="url(#clipPath90)">
                      <path
                              d="M 817.131,844.904 H 476.424 v -3 h 340.707 z"
                              style="fill:#130a33;fill-opacity:1;fill-rule:nonzero;stroke:none"
                              id="path92" />
                      <path
                              d="m 645.278,794.16 h 3 v 99.542 h -3 z"
                              style="fill:#130a33;fill-opacity:1;fill-rule:nonzero;stroke:none"
                              id="path94" />
                      <g
                              id="g96"
                              transform="translate(462.9749,641.5572)">
                        <path
                                d="m 0,0 h -137.419 c -3.153,0 -5.709,2.556 -5.709,5.709 V 48.2 c 0,3.153 2.556,5.709 5.709,5.709 L 0,53.909 c 3.153,0 5.709,-2.556 5.709,-5.709 V 5.709 C 5.709,2.556 3.153,0 0,0"
                                style="fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
                                id="path98" />
                      </g>
                      <g
                              id="g100"
                              transform="translate(281.6105,708.2431)">
                        <path
                                d="m 0,0 c -4.217,0 -7.647,-3.431 -7.647,-7.648 v -64.167 c 0,-4.217 3.43,-7.647 7.647,-7.647 h 184.917 c 4.216,0 7.647,3.43 7.647,7.647 v 64.167 c 0,4.217 -3.431,7.648 -7.647,7.648 z M 184.917,-82.462 H 0 c -5.871,0 -10.647,4.776 -10.647,10.647 V -7.648 C -10.647,-1.776 -5.871,3 0,3 h 184.917 c 5.871,0 10.647,-4.776 10.647,-10.648 v -64.167 c 0,-5.871 -4.776,-10.647 -10.647,-10.647"
                                style="fill:#002157;fill-opacity:1;fill-rule:nonzero;stroke:none"
                                id="path102" />
                      </g>
                      <g
                              id="g104"
                              transform="translate(422.6155,634.311)">
                        <path
                                d="M 0,0 H -150.152 V 68.402 H 0 c 2.795,0 5.061,-2.266 5.061,-5.061 V 5.061 C 5.061,2.266 2.795,0 0,0"
                                style="fill:#002157;fill-opacity:1;fill-rule:nonzero;stroke:none"
                                id="path106" />
                      </g>
                      <g
                              id="g108"
                              transform="translate(452.8397,668.724)">
                        <path
                                d="m 0,0 h -9.974 c -2.812,0 -5.092,-2.28 -5.092,-5.091 v -8.605 H 5.091 v 8.605 C 5.091,-2.28 2.812,0 0,0 m -4.987,2.552 c -3.572,0 -6.468,2.896 -6.468,6.468 0,3.572 2.896,6.468 6.468,6.468 3.572,0 6.468,-2.896 6.468,-6.468 0,-3.572 -2.896,-6.468 -6.468,-6.468"
                                style="fill:#002157;fill-opacity:1;fill-rule:nonzero;stroke:none"
                                id="path110" />
                      </g>
                    </g>
                  </g>
                  <text
                          xml:space="preserve"
                          transform="matrix(1,0,0,-1,308.7617,660.5439)"
                          style="font-variant:normal;font-weight:500;font-stretch:normal;font-size:18px;font-family:'Noto Sans CJK KR';-inkscape-font-specification:NotoSansCJKkr-Medium;writing-mode:lr-tb;fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
                          id="text114"><tspan
                          x="0 16.559999 33.119999 49.68 66.239998"
                          y="0"
                          sodipodi:role="line"
                          id="tspan112">운영위원회</tspan></text>
                  <g
                          id="g116">
                    <g
                            id="g118"
                            clip-path="url(#clipPath122)">
                      <g
                              id="g124"
                              transform="translate(1008.3929,641.5572)">
                        <path
                                d="m 0,0 h -137.419 c -3.153,0 -5.709,2.556 -5.709,5.709 V 48.2 c 0,3.153 2.556,5.709 5.709,5.709 L 0,53.909 c 3.153,0 5.709,-2.556 5.709,-5.709 V 5.709 C 5.709,2.556 3.153,0 0,0"
                                style="fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
                                id="path126" />
                      </g>
                      <g
                              id="g128"
                              transform="translate(827.0285,708.2431)">
                        <path
                                d="m 0,0 c -4.217,0 -7.648,-3.431 -7.648,-7.648 v -64.167 c 0,-4.217 3.431,-7.647 7.648,-7.647 h 184.917 c 4.216,0 7.647,3.43 7.647,7.647 v 64.167 c 0,4.217 -3.431,7.648 -7.647,7.648 z M 184.917,-82.462 H 0 c -5.871,0 -10.648,4.776 -10.648,10.647 V -7.648 C -10.648,-1.776 -5.871,3 0,3 h 184.917 c 5.871,0 10.647,-4.776 10.647,-10.648 v -64.167 c 0,-5.871 -4.776,-10.647 -10.647,-10.647"
                                style="fill:#002157;fill-opacity:1;fill-rule:nonzero;stroke:none"
                                id="path130" />
                      </g>
                      <g
                              id="g132"
                              transform="translate(968.0334,634.311)">
                        <path
                                d="M 0,0 H -150.152 V 68.402 H 0 c 2.795,0 5.061,-2.266 5.061,-5.061 V 5.061 C 5.061,2.266 2.795,0 0,0"
                                style="fill:#002157;fill-opacity:1;fill-rule:nonzero;stroke:none"
                                id="path134" />
                      </g>
                      <g
                              id="g136"
                              transform="translate(998.2577,668.724)">
                        <path
                                d="m 0,0 h -9.974 c -2.812,0 -5.092,-2.28 -5.092,-5.091 v -8.605 H 5.091 v 8.605 C 5.091,-2.28 2.812,0 0,0 m -4.987,2.552 c -3.572,0 -6.468,2.896 -6.468,6.468 0,3.572 2.896,6.468 6.468,6.468 3.572,0 6.468,-2.896 6.468,-6.468 0,-3.572 -2.896,-6.468 -6.468,-6.468"
                                style="fill:#002157;fill-opacity:1;fill-rule:nonzero;stroke:none"
                                id="path138" />
                      </g>
                    </g>
                  </g>
                  <text
                          xml:space="preserve"
                          transform="matrix(1,0,0,-1,854.1797,660.5439)"
                          style="font-variant:normal;font-weight:500;font-stretch:normal;font-size:18px;font-family:'Noto Sans CJK KR';-inkscape-font-specification:NotoSansCJKkr-Medium;writing-mode:lr-tb;fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
                          id="text142"><tspan
                          x="0 16.559999 33.119999 49.68 66.239998"
                          y="0"
                          sodipodi:role="line"
                          id="tspan140">인사위원회</tspan></text>
                  <g
                          id="g144">
                    <g
                            id="g146"
                            clip-path="url(#clipPath150)">
                      <path
                              d="M 817.131,663.188 H 476.424 v -3 h 340.707 z"
                              style="fill:#130a33;fill-opacity:1;fill-rule:nonzero;stroke:none"
                              id="path152" />
                      <path
                              d="m 645.278,377.397 h 3 v 334.59 h -3 z"
                              style="fill:#130a33;fill-opacity:1;fill-rule:nonzero;stroke:none"
                              id="path154" />
                      <g
                              id="g156"
                              transform="translate(1008.3929,529.4671)">
                        <path
                                d="m 0,0 h -137.419 c -3.153,0 -5.709,2.556 -5.709,5.709 V 48.2 c 0,3.153 2.556,5.709 5.709,5.709 L 0,53.909 c 3.153,0 5.709,-2.556 5.709,-5.709 V 5.709 C 5.709,2.556 3.153,0 0,0"
                                style="fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
                                id="path158" />
                      </g>
                      <g
                              id="g160"
                              transform="translate(827.0285,596.1529)">
                        <path
                                d="m 0,0 c -4.217,0 -7.648,-3.431 -7.648,-7.647 v -64.168 c 0,-4.217 3.431,-7.647 7.648,-7.647 h 184.917 c 4.216,0 7.647,3.43 7.647,7.647 v 64.168 c 0,4.216 -3.431,7.647 -7.647,7.647 z M 184.917,-82.462 H 0 c -5.871,0 -10.648,4.776 -10.648,10.647 V -7.647 C -10.648,-1.776 -5.871,3 0,3 h 184.917 c 5.871,0 10.647,-4.776 10.647,-10.647 v -64.168 c 0,-5.871 -4.776,-10.647 -10.647,-10.647"
                                style="fill:#234d89;fill-opacity:1;fill-rule:nonzero;stroke:none"
                                id="path162" />
                      </g>
                      <g
                              id="g164"
                              transform="translate(968.0334,522.2209)">
                        <path
                                d="M 0,0 H -150.152 V 68.402 H 0 c 2.795,0 5.061,-2.266 5.061,-5.061 V 5.061 C 5.061,2.266 2.795,0 0,0"
                                style="fill:#234d89;fill-opacity:1;fill-rule:nonzero;stroke:none"
                                id="path166" />
                      </g>
                      <g
                              id="g168"
                              transform="translate(998.2577,556.6339)">
                        <path
                                d="m 0,0 h -9.974 c -2.812,0 -5.092,-2.28 -5.092,-5.092 v -8.604 H 5.091 v 8.604 C 5.091,-2.28 2.812,0 0,0 m -4.987,2.552 c -3.572,0 -6.468,2.896 -6.468,6.468 0,3.572 2.896,6.468 6.468,6.468 3.572,0 6.468,-2.896 6.468,-6.468 0,-3.572 -2.896,-6.468 -6.468,-6.468"
                                style="fill:#234d89;fill-opacity:1;fill-rule:nonzero;stroke:none"
                                id="path170" />
                      </g>
                    </g>
                  </g>
                  <text
                          xml:space="preserve"
                          transform="matrix(1,0,0,-1,854.1797,548.4541)"
                          style="font-variant:normal;font-weight:500;font-stretch:normal;font-size:18px;font-family:'Noto Sans CJK KR';-inkscape-font-specification:NotoSansCJKkr-Medium;writing-mode:lr-tb;fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
                          id="text174"><tspan
                          x="0 16.559999 33.119999 49.68 66.239998"
                          y="0"
                          sodipodi:role="line"
                          id="tspan172">경영지원실</tspan></text>
                  <g
                          id="g176">
                    <g
                            id="g178"
                            clip-path="url(#clipPath182)">
                      <path
                              d="M 817.131,551.098 H 476.424 v -3 h 340.707 z"
                              style="fill:#130a33;fill-opacity:1;fill-rule:nonzero;stroke:none"
                              id="path184" />
                      <path
                              d="m 645.278,794.16 h 3 v 99.542 h -3 z"
                              style="fill:#130a33;fill-opacity:1;fill-rule:nonzero;stroke:none"
                              id="path186" />
                      <g
                              id="g188"
                              transform="translate(735.6842,908.4855)">
                        <path
                                d="m 0,0 h -137.419 c -3.153,0 -5.709,2.556 -5.709,5.709 V 48.2 c 0,3.153 2.556,5.709 5.709,5.709 L 0,53.909 c 3.153,0 5.709,-2.556 5.709,-5.709 V 5.709 C 5.709,2.556 3.153,0 0,0"
                                style="fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
                                id="path190" />
                      </g>
                      <g
                              id="g192"
                              transform="translate(554.32,975.1716)">
                        <path
                                d="m 0,0 c -4.217,0 -7.647,-3.431 -7.647,-7.647 v -64.168 c 0,-4.217 3.43,-7.648 7.647,-7.648 h 184.916 c 4.217,0 7.647,3.431 7.647,7.648 v 64.168 c 0,4.216 -3.43,7.647 -7.647,7.647 z M 184.916,-82.463 H 0 c -5.871,0 -10.647,4.777 -10.647,10.648 V -7.647 C -10.647,-1.776 -5.871,3 0,3 h 184.916 c 5.871,0 10.647,-4.776 10.647,-10.647 v -64.168 c 0,-5.871 -4.776,-10.648 -10.647,-10.648"
                                style="fill:#0054a5;fill-opacity:1;fill-rule:nonzero;stroke:none"
                                id="path194" />
                      </g>
                      <g
                              id="g196"
                              transform="translate(695.3248,901.2393)">
                        <path
                                d="M 0,0 H -150.152 V 68.402 H 0 c 2.795,0 5.061,-2.266 5.061,-5.061 V 5.061 C 5.061,2.266 2.795,0 0,0"
                                style="fill:#0054a5;fill-opacity:1;fill-rule:nonzero;stroke:none"
                                id="path198" />
                      </g>
                      <g
                              id="g200"
                              transform="translate(725.5489,935.6523)">
                        <path
                                d="m 0,0 h -9.974 c -2.812,0 -5.091,-2.28 -5.091,-5.091 v -8.605 H 5.092 v 8.605 C 5.092,-2.28 2.812,0 0,0 m -4.987,2.552 c -3.572,0 -6.468,2.896 -6.468,6.468 0,3.572 2.896,6.468 6.468,6.468 3.572,0 6.468,-2.896 6.468,-6.468 0,-3.572 -2.896,-6.468 -6.468,-6.468"
                                style="fill:#0054a5;fill-opacity:1;fill-rule:nonzero;stroke:none"
                                id="path202" />
                      </g>
                    </g>
                  </g>
                  <text
                          xml:space="preserve"
                          transform="matrix(1,0,0,-1,592.9702,928.8047)"
                          style="font-variant:normal;font-weight:500;font-stretch:normal;font-size:20px;font-family:'Noto Sans CJK KR';-inkscape-font-specification:NotoSansCJKkr-Medium;writing-mode:lr-tb;fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
                          id="text206"><tspan
                          x="0 18.4 36.799999"
                          y="0"
                          sodipodi:role="line"
                          id="tspan204">이사장</tspan></text>
                  <g
                          id="g208">
                    <g
                            id="g210"
                            clip-path="url(#clipPath214)">
                      <g
                              id="g216"
                              transform="translate(735.6842,727.4741)">
                        <path
                                d="m 0,0 h -137.419 c -3.153,0 -5.709,2.556 -5.709,5.709 V 48.2 c 0,3.153 2.556,5.709 5.709,5.709 L 0,53.909 c 3.153,0 5.709,-2.556 5.709,-5.709 V 5.709 C 5.709,2.556 3.153,0 0,0"
                                style="fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
                                id="path218" />
                      </g>
                      <g
                              id="g220"
                              transform="translate(554.32,794.1602)">
                        <path
                                d="m 0,0 c -4.217,0 -7.647,-3.431 -7.647,-7.648 v -64.167 c 0,-4.217 3.43,-7.648 7.647,-7.648 h 184.916 c 4.217,0 7.647,3.431 7.647,7.648 v 64.167 c 0,4.217 -3.43,7.648 -7.647,7.648 z M 184.916,-82.463 H 0 c -5.871,0 -10.647,4.776 -10.647,10.648 V -7.648 C -10.647,-1.776 -5.871,3 0,3 h 184.916 c 5.871,0 10.647,-4.776 10.647,-10.648 v -64.167 c 0,-5.872 -4.776,-10.648 -10.647,-10.648"
                                style="fill:#0054a5;fill-opacity:1;fill-rule:nonzero;stroke:none"
                                id="path222" />
                      </g>
                      <g
                              id="g224"
                              transform="translate(695.3248,720.2279)">
                        <path
                                d="M 0,0 H -150.152 V 68.402 H 0 c 2.795,0 5.061,-2.266 5.061,-5.061 V 5.061 C 5.061,2.266 2.795,0 0,0"
                                style="fill:#0054a5;fill-opacity:1;fill-rule:nonzero;stroke:none"
                                id="path226" />
                      </g>
                      <g
                              id="g228"
                              transform="translate(725.5489,754.6409)">
                        <path
                                d="m 0,0 h -9.974 c -2.812,0 -5.091,-2.28 -5.091,-5.092 v -8.604 H 5.092 v 8.604 C 5.092,-2.28 2.812,0 0,0 m -4.987,2.552 c -3.572,0 -6.468,2.896 -6.468,6.468 0,3.572 2.896,6.468 6.468,6.468 3.572,0 6.468,-2.896 6.468,-6.468 0,-3.572 -2.896,-6.468 -6.468,-6.468"
                                style="fill:#0054a5;fill-opacity:1;fill-rule:nonzero;stroke:none"
                                id="path230" />
                      </g>
                    </g>
                  </g>
                  <text
                          xml:space="preserve"
                          transform="matrix(1,0,0,-1,599.3701,747.7939)"
                          style="font-variant:normal;font-weight:500;font-stretch:normal;font-size:20px;font-family:'Noto Sans CJK KR';-inkscape-font-specification:NotoSansCJKkr-Medium;writing-mode:lr-tb;fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
                          id="text234"><tspan
                          x="0 18.4 24"
                          y="0"
                          sodipodi:role="line"
                          id="tspan232">원 장</tspan></text>
                  <g
                          id="g236">
                    <g
                            id="g238"
                            clip-path="url(#clipPath242)">
                      <g
                              id="g244"
                              transform="translate(462.9749,529.4671)">
                        <path
                                d="m 0,0 h -137.419 c -3.153,0 -5.709,2.556 -5.709,5.709 V 48.2 c 0,3.153 2.556,5.709 5.709,5.709 L 0,53.909 c 3.153,0 5.709,-2.556 5.709,-5.709 V 5.709 C 5.709,2.556 3.153,0 0,0"
                                style="fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
                                id="path246" />
                      </g>
                      <g
                              id="g248"
                              transform="translate(281.6105,596.1529)">
                        <path
                                d="m 0,0 c -4.217,0 -7.647,-3.431 -7.647,-7.647 v -64.168 c 0,-4.217 3.43,-7.647 7.647,-7.647 h 184.917 c 4.216,0 7.647,3.43 7.647,7.647 v 64.168 c 0,4.216 -3.431,7.647 -7.647,7.647 z M 184.917,-82.462 H 0 c -5.871,0 -10.647,4.776 -10.647,10.647 V -7.647 C -10.647,-1.776 -5.871,3 0,3 h 184.917 c 5.871,0 10.647,-4.776 10.647,-10.647 v -64.168 c 0,-5.871 -4.776,-10.647 -10.647,-10.647"
                                style="fill:#234d89;fill-opacity:1;fill-rule:nonzero;stroke:none"
                                id="path250" />
                      </g>
                      <g
                              id="g252"
                              transform="translate(422.6155,522.2209)">
                        <path
                                d="M 0,0 H -150.152 V 68.402 H 0 c 2.795,0 5.061,-2.266 5.061,-5.061 V 5.061 C 5.061,2.266 2.795,0 0,0"
                                style="fill:#234d89;fill-opacity:1;fill-rule:nonzero;stroke:none"
                                id="path254" />
                      </g>
                      <g
                              id="g256"
                              transform="translate(452.8397,556.6339)">
                        <path
                                d="m 0,0 h -9.974 c -2.812,0 -5.092,-2.28 -5.092,-5.092 v -8.604 H 5.091 v 8.604 C 5.091,-2.28 2.812,0 0,0 m -4.987,2.552 c -3.572,0 -6.468,2.896 -6.468,6.468 0,3.572 2.896,6.468 6.468,6.468 3.572,0 6.468,-2.896 6.468,-6.468 0,-3.572 -2.896,-6.468 -6.468,-6.468"
                                style="fill:#234d89;fill-opacity:1;fill-rule:nonzero;stroke:none"
                                id="path258" />
                      </g>
                    </g>
                  </g>
                  <text
                          xml:space="preserve"
                          transform="matrix(1,0,0,-1,283.9219,548.4541)"
                          style="font-variant:normal;font-weight:500;font-stretch:normal;font-size:18px;font-family:'Noto Sans CJK KR';-inkscape-font-specification:NotoSansCJKkr-Medium;writing-mode:lr-tb;fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
                          id="text262"><tspan
                          x="0 16.559999 33.119999 49.68 66.239998 82.800003 99.360001 115.92"
                          y="0"
                          sodipodi:role="line"
                          id="tspan260">미래전략기획본부</tspan></text>
                  <text
                          xml:space="preserve"
                          transform="matrix(1,0,0,-1,270.9634,483.6611)"
                          style="font-variant:normal;font-weight:500;font-stretch:normal;font-size:15px;font-family:'Noto Sans CJK KR';-inkscape-font-specification:NotoSansCJKkr-Medium;writing-mode:lr-tb;fill:#252525;fill-opacity:1;fill-rule:nonzero;stroke:none"
                          id="text272"><tspan
                          x="0 8.6099997 11.985 25.785 39.584999 53.384998 67.184998 80.985001 94.785004 108.585"
                          y="0"
                          sodipodi:role="line"
                          id="tspan264">· 미래전략기획팀</tspan><tspan
                          x="0 8.6099997 11.985 20.235001 25.59 39.389999 53.189999 66.989998 80.790001"
                          y="21.075001"
                          sodipodi:role="line"
                          id="tspan266">· J-밸리혁신팀</tspan><tspan
                          x="545.41498 554.02502 557.40002 571.20001 585 598.79999 612.59998"
                          y="0"
                          sodipodi:role="line"
                          id="tspan268">· 사업지원팀</tspan><tspan
                          x="545.41498 554.02502 557.40002 571.20001 585 598.79999 612.59998"
                          y="21.075001"
                          sodipodi:role="line"
                          id="tspan270">· 경영지원팀</tspan></text>
                  <g
                          id="g274">
                    <g
                            id="g276"
                            clip-path="url(#clipPath280)">
                      <g
                              id="g282"
                              transform="translate(1102.1427,425.6685)">
                        <path
                                d="m 0,0 h -910.73 -1.5 c -0.828,0 -1.5,-0.672 -1.5,-1.5 V -3 -46.771 c 0,-0.829 0.672,-1.5 1.5,-1.5 0.829,0 1.5,0.671 1.5,1.5 V -4.5 c 0,0.828 0.672,1.5 1.5,1.5 H -1.5 C -0.672,-3 0,-3.672 0,-4.5 v -42.271 c 0,-0.829 0.672,-1.5 1.5,-1.5 0.828,0 1.5,0.671 1.5,1.5 V -3 -1.5 C 3,-0.672 2.328,0 1.5,0 Z"
                                style="fill:#130a33;fill-opacity:1;fill-rule:nonzero;stroke:none"
                                id="path284" />
                      </g>
                      <path
                              d="m 873.71,377.397 h 3 v 48.271 h -3 z"
                              style="fill:#130a33;fill-opacity:1;fill-rule:nonzero;stroke:none"
                              id="path286" />
                      <path
                              d="m 416.845,377.397 h 3 v 48.271 h -3 z"
                              style="fill:#130a33;fill-opacity:1;fill-rule:nonzero;stroke:none"
                              id="path288" />
                      <g
                              id="g290"
                              transform="translate(270.6164,308.5367)">
                        <path
                                d="m 0,0 h -137.419 c -3.153,0 -5.709,2.556 -5.709,5.709 V 48.2 c 0,3.153 2.556,5.709 5.709,5.709 L 0,53.909 c 3.153,0 5.709,-2.556 5.709,-5.709 V 5.709 C 5.709,2.556 3.153,0 0,0"
                                style="fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
                                id="path292" />
                      </g>
                      <g
                              id="g294"
                              transform="translate(89.252,375.2225)">
                        <path
                                d="m 0,0 c -4.217,0 -7.647,-3.431 -7.647,-7.647 v -64.168 c 0,-4.217 3.43,-7.647 7.647,-7.647 h 184.916 c 4.217,0 7.648,3.43 7.648,7.647 v 64.168 c 0,4.216 -3.431,7.647 -7.648,7.647 z M 184.916,-82.462 H 0 c -5.871,0 -10.647,4.776 -10.647,10.647 V -7.647 C -10.647,-1.776 -5.871,3 0,3 h 184.916 c 5.872,0 10.648,-4.776 10.648,-10.647 v -64.168 c 0,-5.871 -4.776,-10.647 -10.648,-10.647"
                                style="fill:#41ace0;fill-opacity:1;fill-rule:nonzero;stroke:none"
                                id="path296" />
                      </g>
                      <g
                              id="g298"
                              transform="translate(230.257,301.2905)">
                        <path
                                d="M 0,0 H -150.152 V 68.402 H 0 c 2.795,0 5.061,-2.266 5.061,-5.061 V 5.061 C 5.061,2.266 2.795,0 0,0"
                                style="fill:#41ace0;fill-opacity:1;fill-rule:nonzero;stroke:none"
                                id="path300" />
                      </g>
                      <g
                              id="g302"
                              transform="translate(260.4812,335.7034)">
                        <path
                                d="m 0,0 h -9.974 c -2.812,0 -5.092,-2.28 -5.092,-5.091 v -8.605 H 5.091 v 8.605 C 5.091,-2.28 2.812,0 0,0 m -4.987,2.552 c -3.572,0 -6.468,2.896 -6.468,6.468 0,3.572 2.896,6.468 6.468,6.468 3.572,0 6.468,-2.896 6.468,-6.468 0,-3.572 -2.896,-6.468 -6.468,-6.468"
                                style="fill:#41ace0;fill-opacity:1;fill-rule:nonzero;stroke:none"
                                id="path304" />
                      </g>
                    </g>
                  </g>
                  <text
                          xml:space="preserve"
                          transform="matrix(1,0,0,-1,100.1313,327.5234)"
                          style="font-variant:normal;font-weight:500;font-stretch:normal;font-size:18px;font-family:'Noto Sans CJK KR';-inkscape-font-specification:NotoSansCJKkr-Medium;writing-mode:lr-tb;fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
                          id="text308"><tspan
                          x="0 11.808 24.516001 36.521999 49.104 65.664001 82.223999 98.783997"
                          y="0"
                          sodipodi:role="line"
                          id="tspan306">R&amp;BD사업본부</tspan></text>
                  <g
                          id="g310">
                    <g
                            id="g312"
                            clip-path="url(#clipPath316)">
                      <g
                              id="g318"
                              transform="translate(503.1501,308.5367)">
                        <path
                                d="m 0,0 h -137.419 c -3.153,0 -5.709,2.556 -5.709,5.709 V 48.2 c 0,3.153 2.556,5.709 5.709,5.709 L 0,53.909 c 3.153,0 5.709,-2.556 5.709,-5.709 V 5.709 C 5.709,2.556 3.153,0 0,0"
                                style="fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
                                id="path320" />
                      </g>
                      <g
                              id="g322"
                              transform="translate(321.7857,375.2225)">
                        <path
                                d="m 0,0 c -4.217,0 -7.647,-3.431 -7.647,-7.647 v -64.168 c 0,-4.217 3.43,-7.647 7.647,-7.647 h 184.917 c 4.216,0 7.647,3.43 7.647,7.647 v 64.168 c 0,4.216 -3.431,7.647 -7.647,7.647 z M 184.917,-82.462 H 0 c -5.871,0 -10.647,4.776 -10.647,10.647 V -7.647 C -10.647,-1.776 -5.871,3 0,3 h 184.917 c 5.871,0 10.647,-4.776 10.647,-10.647 v -64.168 c 0,-5.871 -4.776,-10.647 -10.647,-10.647"
                                style="fill:#305c99;fill-opacity:1;fill-rule:nonzero;stroke:none"
                                id="path324" />
                      </g>
                      <g
                              id="g326"
                              transform="translate(462.7907,301.2905)">
                        <path
                                d="M 0,0 H -150.152 V 68.402 H 0 c 2.795,0 5.061,-2.266 5.061,-5.061 V 5.061 C 5.061,2.266 2.795,0 0,0"
                                style="fill:#305c99;fill-opacity:1;fill-rule:nonzero;stroke:none"
                                id="path328" />
                      </g>
                      <g
                              id="g330"
                              transform="translate(493.0149,335.7034)">
                        <path
                                d="m 0,0 h -9.974 c -2.812,0 -5.092,-2.28 -5.092,-5.091 v -8.605 H 5.091 v 8.605 C 5.091,-2.28 2.812,0 0,0 m -4.987,2.552 c -3.572,0 -6.468,2.896 -6.468,6.468 0,3.572 2.896,6.468 6.468,6.468 3.572,0 6.468,-2.896 6.468,-6.468 0,-3.572 -2.896,-6.468 -6.468,-6.468"
                                style="fill:#305c99;fill-opacity:1;fill-rule:nonzero;stroke:none"
                                id="path332" />
                      </g>
                    </g>
                  </g>
                  <text
                          xml:space="preserve"
                          transform="matrix(1,0,0,-1,324.0972,327.5234)"
                          style="font-variant:normal;font-weight:500;font-stretch:normal;font-size:18px;font-family:'Noto Sans CJK KR';-inkscape-font-specification:NotoSansCJKkr-Medium;writing-mode:lr-tb;fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
                          id="text336"><tspan
                          x="0 16.559999 33.119999 49.68 66.239998 82.800003 99.360001 115.92"
                          y="0"
                          sodipodi:role="line"
                          id="tspan334">기업성장지원본부</tspan></text>
                  <g
                          id="g338">
                    <g
                            id="g340"
                            clip-path="url(#clipPath344)">
                      <g
                              id="g346"
                              transform="translate(735.6838,308.5367)">
                        <path
                                d="m 0,0 h -137.419 c -3.153,0 -5.709,2.556 -5.709,5.709 V 48.2 c 0,3.153 2.556,5.709 5.709,5.709 L 0,53.909 c 3.153,0 5.709,-2.556 5.709,-5.709 V 5.709 C 5.709,2.556 3.153,0 0,0"
                                style="fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
                                id="path348" />
                      </g>
                      <g
                              id="g350"
                              transform="translate(554.3195,375.2225)">
                        <path
                                d="m 0,0 c -4.217,0 -7.647,-3.431 -7.647,-7.647 v -64.168 c 0,-4.217 3.43,-7.647 7.647,-7.647 h 184.917 c 4.216,0 7.647,3.43 7.647,7.647 v 64.168 c 0,4.216 -3.431,7.647 -7.647,7.647 z M 184.917,-82.462 H 0 c -5.871,0 -10.647,4.776 -10.647,10.647 V -7.647 C -10.647,-1.776 -5.871,3 0,3 h 184.917 c 5.871,0 10.647,-4.776 10.647,-10.647 v -64.168 c 0,-5.871 -4.776,-10.647 -10.647,-10.647"
                                style="fill:#0054a5;fill-opacity:1;fill-rule:nonzero;stroke:none"
                                id="path352" />
                      </g>
                      <g
                              id="g354"
                              transform="translate(695.3244,301.2905)">
                        <path
                                d="M 0,0 H -150.152 V 68.402 H 0 c 2.795,0 5.061,-2.266 5.061,-5.061 V 5.061 C 5.061,2.266 2.795,0 0,0"
                                style="fill:#0054a5;fill-opacity:1;fill-rule:nonzero;stroke:none"
                                id="path356" />
                      </g>
                      <g
                              id="g358"
                              transform="translate(725.5486,335.7034)">
                        <path
                                d="m 0,0 h -9.974 c -2.812,0 -5.092,-2.28 -5.092,-5.091 v -8.605 H 5.091 v 8.605 C 5.091,-2.28 2.812,0 0,0 m -4.987,2.552 c -3.572,0 -6.468,2.896 -6.468,6.468 0,3.572 2.896,6.468 6.468,6.468 3.572,0 6.468,-2.896 6.468,-6.468 0,-3.572 -2.896,-6.468 -6.468,-6.468"
                                style="fill:#0054a5;fill-opacity:1;fill-rule:nonzero;stroke:none"
                                id="path360" />
                      </g>
                    </g>
                  </g>
                  <text
                          xml:space="preserve"
                          transform="matrix(1,0,0,-1,564.9106,327.5234)"
                          style="font-variant:normal;font-weight:500;font-stretch:normal;font-size:18px;font-family:'Noto Sans CJK KR';-inkscape-font-specification:NotoSansCJKkr-Medium;writing-mode:lr-tb;fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
                          id="text364"><tspan
                          x="0 16.559999 33.119999 49.68 66.239998 82.800003 99.360001"
                          y="0"
                          sodipodi:role="line"
                          id="tspan362">우주항공사업부</tspan></text>
                  <g
                          id="g366">
                    <g
                            id="g368"
                            clip-path="url(#clipPath372)">
                      <g
                              id="g374"
                              transform="translate(968.2176,308.5367)">
                        <path
                                d="m 0,0 h -137.419 c -3.153,0 -5.709,2.556 -5.709,5.709 V 48.2 c 0,3.153 2.556,5.709 5.709,5.709 L 0,53.909 c 3.153,0 5.709,-2.556 5.709,-5.709 V 5.709 C 5.709,2.556 3.153,0 0,0"
                                style="fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
                                id="path376" />
                      </g>
                      <g
                              id="g378"
                              transform="translate(786.8532,375.2225)">
                        <path
                                d="m 0,0 c -4.217,0 -7.648,-3.431 -7.648,-7.647 v -64.168 c 0,-4.217 3.431,-7.647 7.648,-7.647 h 184.916 c 4.217,0 7.648,3.43 7.648,7.647 v 64.168 c 0,4.216 -3.431,7.647 -7.648,7.647 z M 184.916,-82.462 H 0 c -5.871,0 -10.648,4.776 -10.648,10.647 V -7.647 C -10.648,-1.776 -5.871,3 0,3 h 184.916 c 5.872,0 10.648,-4.776 10.648,-10.647 v -64.168 c 0,-5.871 -4.776,-10.647 -10.648,-10.647"
                                style="fill:#22cb56;fill-opacity:1;fill-rule:nonzero;stroke:none"
                                id="path380" />
                      </g>
                      <g
                              id="g382"
                              transform="translate(927.8582,301.2905)">
                        <path
                                d="M 0,0 H -150.152 V 68.402 H 0 c 2.795,0 5.061,-2.266 5.061,-5.061 V 5.061 C 5.061,2.266 2.795,0 0,0"
                                style="fill:#22cb56;fill-opacity:1;fill-rule:nonzero;stroke:none"
                                id="path384" />
                      </g>
                      <g
                              id="g386"
                              transform="translate(958.0823,335.7034)">
                        <path
                                d="m 0,0 h -9.974 c -2.812,0 -5.091,-2.28 -5.091,-5.091 v -8.605 H 5.092 v 8.605 C 5.092,-2.28 2.812,0 0,0 m -4.987,2.552 c -3.572,0 -6.468,2.896 -6.468,6.468 0,3.572 2.896,6.468 6.468,6.468 3.572,0 6.468,-2.896 6.468,-6.468 0,-3.572 -2.896,-6.468 -6.468,-6.468"
                                style="fill:#22cb56;fill-opacity:1;fill-rule:nonzero;stroke:none"
                                id="path388" />
                      </g>
                    </g>
                  </g>
                  <text
                          xml:space="preserve"
                          transform="matrix(1,0,0,-1,814.0044,327.5234)"
                          style="font-variant:normal;font-weight:500;font-stretch:normal;font-size:18px;font-family:'Noto Sans CJK KR';-inkscape-font-specification:NotoSansCJKkr-Medium;writing-mode:lr-tb;fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
                          id="text392"><tspan
                          x="0 16.559999 33.119999 49.68 66.239998"
                          y="0"
                          sodipodi:role="line"
                          id="tspan390">드론사업부</tspan></text>
                  <g
                          id="g394">
                    <g
                            id="g396"
                            clip-path="url(#clipPath400)">
                      <g
                              id="g402"
                              transform="translate(1200.7513,308.5367)">
                        <path
                                d="m 0,0 h -137.419 c -3.153,0 -5.709,2.556 -5.709,5.709 V 48.2 c 0,3.153 2.556,5.709 5.709,5.709 L 0,53.909 c 3.153,0 5.709,-2.556 5.709,-5.709 V 5.709 C 5.709,2.556 3.153,0 0,0"
                                style="fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
                                id="path404" />
                      </g>
                      <g
                              id="g406"
                              transform="translate(1019.387,375.2225)">
                        <path
                                d="m 0,0 c -4.217,0 -7.647,-3.431 -7.647,-7.647 v -64.168 c 0,-4.217 3.43,-7.647 7.647,-7.647 h 184.916 c 4.217,0 7.648,3.43 7.648,7.647 v 64.168 c 0,4.216 -3.431,7.647 -7.648,7.647 z M 184.916,-82.462 H 0 c -5.871,0 -10.647,4.776 -10.647,10.647 V -7.647 C -10.647,-1.776 -5.871,3 0,3 h 184.916 c 5.872,0 10.648,-4.776 10.648,-10.647 v -64.168 c 0,-5.871 -4.776,-10.647 -10.648,-10.647"
                                style="fill:#23cab9;fill-opacity:1;fill-rule:nonzero;stroke:none"
                                id="path408" />
                      </g>
                      <g
                              id="g410"
                              transform="translate(1160.392,301.2905)">
                        <path
                                d="M 0,0 H -150.152 V 68.402 H 0 c 2.795,0 5.061,-2.266 5.061,-5.061 V 5.061 C 5.061,2.266 2.795,0 0,0"
                                style="fill:#23cab9;fill-opacity:1;fill-rule:nonzero;stroke:none"
                                id="path412" />
                      </g>
                      <g
                              id="g414"
                              transform="translate(1190.6162,335.7034)">
                        <path
                                d="m 0,0 h -9.974 c -2.812,0 -5.092,-2.28 -5.092,-5.091 v -8.605 H 5.091 v 8.605 C 5.091,-2.28 2.812,0 0,0 m -4.987,2.552 c -3.572,0 -6.468,2.896 -6.468,6.468 0,3.572 2.896,6.468 6.468,6.468 3.572,0 6.468,-2.896 6.468,-6.468 0,-3.572 -2.896,-6.468 -6.468,-6.468"
                                style="fill:#23cab9;fill-opacity:1;fill-rule:nonzero;stroke:none"
                                id="path416" />
                      </g>
                    </g>
                  </g>
                  <text
                          xml:space="preserve"
                          transform="matrix(1,0,0,-1,1021.6982,327.5234)"
                          style="font-variant:normal;font-weight:500;font-stretch:normal;font-size:18px;font-family:'Noto Sans CJK KR';-inkscape-font-specification:NotoSansCJKkr-Medium;writing-mode:lr-tb;fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
                          id="text420"><tspan
                          x="0 16.559999 33.119999 49.68 66.239998 82.800003 99.360001 115.92"
                          y="0"
                          sodipodi:role="line"
                          id="tspan418">스마트제조사업부</tspan></text>
                  <g
                          id="g422">
                    <g
                            id="g424"
                            clip-path="url(#clipPath428)">
                      <g
                              id="g430"
                              transform="translate(273.6285,148.4276)">
                        <path
                                d="m 0,0 h -183.836 c -6.179,0 -11.188,5.009 -11.188,11.187 v 32.086 c 0,6.179 5.009,11.187 11.188,11.187 L 0,54.46 c 6.179,0 11.188,-5.008 11.188,-11.187 V 11.187 C 11.188,5.009 6.179,0 0,0"
                                style="fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
                                id="path432" />
                      </g>
                      <%--<g
                              id="g434"
                              transform="translate(281.816,169.777)">
                        <path
                                d="m 0,0 v -10.702 c 0,-4.217 -3.431,-7.647 -7.648,-7.647 h -184.916 c -4.217,0 -7.647,3.43 -7.647,7.647 V 0 0.78 22.464 c 0,4.216 3.43,7.647 7.647,7.647 H -7.648 C -3.431,30.111 0,26.68 0,22.464 V 0.78 Z m -7.648,33.111 h -184.916 c -5.871,0 -10.647,-4.776 -10.647,-10.647 V 0.78 0 -10.702 c 0,-5.871 4.776,-10.647 10.647,-10.647 H -7.648 C -1.776,-21.349 3,-16.573 3,-10.702 V 0 0.78 22.464 c 0,5.871 -4.776,10.647 -10.648,10.647"
                                style="fill:#41ace0;fill-opacity:1;fill-rule:nonzero;stroke:none"
                                id="path436" />
                      </g>
                    </g>
                  </g>
                  <text
                          xml:space="preserve"
                          transform="matrix(1,0,0,-1,112.7104,169.1606)"
                          style="font-variant:normal;font-weight:500;font-stretch:normal;font-size:15px;font-family:'Noto Sans CJK KR';-inkscape-font-specification:NotoSansCJKkr-Medium;writing-mode:lr-tb;fill:#41ace0;fill-opacity:1;fill-rule:nonzero;stroke:none"
                          id="text440"><tspan
                          x="0 13.8 27.6 41.400002 55.200001 69 82.800003 96.599998 110.4 124.2"
                          y="0"
                          sodipodi:role="line"
                          id="tspan438">신기술융합팀</tspan></text>--%>


                      <%-- 뿌리소재뿌리기술센터 --%>
                      <g
                              id="g434"
                              transform="translate(281.816,169.777)">
                        <path
                                d="m 0,0 v -10.702 c 0,-4.217 -3.431,-7.647 -7.648,-7.647 h -184.916 c -4.217,0 -7.647,3.43 -7.647,7.647 V 0 0.78 22.464 c 0,4.216 3.43,7.647 7.647,7.647 H -7.648 C -3.431,30.111 0,26.68 0,22.464 V 0.78 Z m -7.648,33.111 h -184.916 c -5.871,0 -10.647,-4.776 -10.647,-10.647 V 0.78 0 -10.702 c 0,-5.871 4.776,-10.647 10.647,-10.647 H -7.648 C -1.776,-21.349 3,-16.573 3,-10.702 V 0 0.78 22.464 c 0,5.871 -4.776,10.647 -10.648,10.647"
                                style="fill:#41ace0;fill-opacity:1;fill-rule:nonzero;stroke:none"
                                id="path436" />
                      </g>
                    </g>
                  </g>
                  <text
                          xml:space="preserve"
                          transform="matrix(1,0,0,-1,112.7104,169.1606)"
                          style="font-variant:normal;font-weight:500;font-stretch:normal;font-size:15px;font-family:'Noto Sans CJK KR';-inkscape-font-specification:NotoSansCJKkr-Medium;writing-mode:lr-tb;fill:#41ace0;fill-opacity:1;fill-rule:nonzero;stroke:none"
                          id="text440"><tspan
                          x="0 13.8 27.6 41.400002 55.200001 69 82.800003 96.599998 110.4 124.2"
                          y="0"
                          sodipodi:role="line"
                          id="tspan438">뿌리소재뿌리기술센터</tspan></text>
                  <g
                          id="g442">
                    <g
                            id="g444"
                            clip-path="url(#clipPath448)">
                      <g
                              id="g450"
                              transform="translate(506.1623,148.4276)">
                        <path
                                d="m 0,0 h -183.837 c -6.178,0 -11.187,5.009 -11.187,11.187 v 32.086 c 0,6.179 5.009,11.187 11.187,11.187 L 0,54.46 c 6.179,0 11.187,-5.008 11.187,-11.187 V 11.187 C 11.187,5.009 6.179,0 0,0"
                                style="fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
                                id="path452" />
                      </g>
                      <g
                              id="g454"
                              transform="translate(514.3497,169.777)">
                        <path
                                d="m 0,0 v -10.702 c 0,-4.217 -3.431,-7.647 -7.647,-7.647 h -184.917 c -4.217,0 -7.647,3.43 -7.647,7.647 V 0 0.78 22.464 c 0,4.216 3.43,7.647 7.647,7.647 H -7.647 C -3.431,30.111 0,26.68 0,22.464 V 0.78 Z m -7.647,33.111 h -184.917 c -5.871,0 -10.647,-4.776 -10.647,-10.647 V 0.78 0 -10.702 c 0,-5.871 4.776,-10.647 10.647,-10.647 H -7.647 C -1.776,-21.349 3,-16.573 3,-10.702 V 0 0.78 22.464 c 0,5.871 -4.776,10.647 -10.647,10.647"
                                style="fill:#305c99;fill-opacity:1;fill-rule:nonzero;stroke:none"
                                id="path456" />
                      </g>
                    </g>
                  </g>
                  <text
                          xml:space="preserve"
                          transform="matrix(1,0,0,-1,352.144,169.1606)"
                          style="font-variant:normal;font-weight:500;font-stretch:normal;font-size:15px;font-family:'Noto Sans CJK KR';-inkscape-font-specification:NotoSansCJKkr-Medium;writing-mode:lr-tb;fill:#305c99;fill-opacity:1;fill-rule:nonzero;stroke:none"
                          id="text460"><tspan
                          x="0 13.8 27.6 41.400002 55.200001 69 82.800003 96.599998 110.4"
                          y="0"
                          sodipodi:role="line"
                          id="tspan458">전북조선업도약센터</tspan></text>
                  <g
                          id="g462">
                    <g
                            id="g464"
                            clip-path="url(#clipPath468)">
                      <g
                              id="g470"
                              transform="translate(971.2297,221.4699)">
                        <path
                                d="m 0,0 h -183.836 c -6.179,0 -11.188,5.009 -11.188,11.188 v 32.085 c 0,6.179 5.009,11.187 11.188,11.187 H 0 c 6.179,0 11.188,-5.008 11.188,-11.187 V 11.188 C 11.188,5.009 6.179,0 0,0"
                                style="fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
                                id="path472" />
                      </g>

                      <%--드론사업부 하위--%>
                      <%--<g
                              id="g474"
                              transform="translate(979.4172,242.8193)">
                        <path
                                d="m 0,0 v -10.702 c 0,-4.217 -3.431,-7.647 -7.648,-7.647 h -184.916 c -4.217,0 -7.647,3.43 -7.647,7.647 V 0 0.78 22.464 c 0,4.216 3.43,7.647 7.647,7.647 H -7.648 C -3.431,30.111 0,26.68 0,22.464 V 0.78 Z m -7.648,33.111 h -184.916 c -5.871,0 -10.647,-4.776 -10.647,-10.647 V 0.78 0 -10.702 c 0,-5.871 4.776,-10.647 10.647,-10.647 H -7.648 C -1.776,-21.349 3,-16.573 3,-10.702 V 0 0.78 22.464 c 0,5.871 -4.776,10.647 -10.648,10.647"
                                style="fill:#22cb56;fill-opacity:1;fill-rule:nonzero;stroke:none"
                                id="path476" />
                      </g>
                    </g>
                  </g>
                  <text
                          xml:space="preserve"
                          transform="matrix(1,0,0,-1,808.2119,242.2031)"
                          style="font-variant:normal;font-weight:500;font-stretch:normal;font-size:15px;font-family:'Noto Sans CJK KR';-inkscape-font-specification:NotoSansCJKkr-Medium;writing-mode:lr-tb;fill:#22cb56;fill-opacity:1;fill-rule:nonzero;stroke:none"
                          id="text480"><tspan
                          x="0 13.8 27.6 41.400002 55.200001 59.400002 73.199997 87 100.8 114.6 128.39999"
                          y="0"
                          sodipodi:role="line"
                          id="tspan478">드론산업 혁신지원센터</tspan></text>--%>
                  <g
                          id="g482">
                    <g
                            id="g484"
                            clip-path="url(#clipPath488)">
                      <g
                              id="g490"
                              transform="translate(506.1623,79.7335)">
                        <path
                                d="m 0,0 h -183.837 c -6.178,0 -11.187,5.009 -11.187,11.188 v 32.085 c 0,6.179 5.009,11.187 11.187,11.187 H 0 c 6.179,0 11.187,-5.008 11.187,-11.187 V 11.188 C 11.187,5.009 6.179,0 0,0"
                                style="fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
                                id="path492" />
                      </g>
                      <g
                              id="g494"
                              transform="translate(514.3497,101.0829)">
                        <path
                                d="m 0,0 v -10.702 c 0,-4.217 -3.431,-7.647 -7.647,-7.647 h -184.917 c -4.217,0 -7.647,3.43 -7.647,7.647 V 0 0.78 22.464 c 0,4.216 3.43,7.647 7.647,7.647 H -7.647 C -3.431,30.111 0,26.68 0,22.464 V 0.78 Z m -7.647,33.111 h -184.917 c -5.871,0 -10.647,-4.776 -10.647,-10.647 V 0.78 0 -10.702 c 0,-5.871 4.776,-10.647 10.647,-10.647 H -7.647 C -1.776,-21.349 3,-16.573 3,-10.702 V 0 0.78 22.464 c 0,5.871 -4.776,10.647 -10.647,10.647"
                                style="fill:#305c99;fill-opacity:1;fill-rule:nonzero;stroke:none"
                                id="path496" />
                      </g>
                    </g>
                  </g>
                  <text
                          xml:space="preserve"
                          transform="matrix(1,0,0,-1,336.2441,100.4668)"
                          style="font-variant:normal;font-weight:500;font-stretch:normal;font-size:15px;font-family:'Noto Sans CJK KR';-inkscape-font-specification:NotoSansCJKkr-Medium;writing-mode:lr-tb;fill:#305c99;fill-opacity:1;fill-rule:nonzero;stroke:none"
                          id="text500"><tspan
                          x="0 13.8 27.6 41.400002 55.200001 59.400002 73.199997 87 100.8 114.6 128.39999 142.2"
                          y="0"
                          sodipodi:role="line"
                          id="tspan498">익산고용 안정일자리센터</tspan></text>
                </g>
              </svg>
          </div>


          <%--조직도 모바일버전--%>
          <div class="imgMobile">
            <svg
                    version="1.1"
                    id="svg2"
                    width="320"
                    height="550"
                    viewBox="0 0 1077.0374 1581.3333"
                    sodipodi:docname="2265_infographic1_mobile.ai"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:svg="http://www.w3.org/2000/svg">
              <defs
                      id="defs6">
                <clipPath
                        clipPathUnits="userSpaceOnUse"
                        id="clipPath18">
                  <path
                          d="M 0,1186 H 807.778 V 0 H 0 Z"
                          id="path16" />
                </clipPath>
                <clipPath
                        clipPathUnits="userSpaceOnUse"
                        id="clipPath42">
                  <path
                          d="M 0,1186 H 807.778 V 0 H 0 Z"
                          id="path40" />
                </clipPath>
                <clipPath
                        clipPathUnits="userSpaceOnUse"
                        id="clipPath66">
                  <path
                          d="M 0,1186 H 807.778 V 0 H 0 Z"
                          id="path64" />
                </clipPath>
                <clipPath
                        clipPathUnits="userSpaceOnUse"
                        id="clipPath90">
                  <path
                          d="M 0,1186 H 807.778 V 0 H 0 Z"
                          id="path88" />
                </clipPath>
                <clipPath
                        clipPathUnits="userSpaceOnUse"
                        id="clipPath114">
                  <path
                          d="M 0,1186 H 807.778 V 0 H 0 Z"
                          id="path112" />
                </clipPath>
                <clipPath
                        clipPathUnits="userSpaceOnUse"
                        id="clipPath138">
                  <path
                          d="M 0,1186 H 807.778 V 0 H 0 Z"
                          id="path136" />
                </clipPath>
                <clipPath
                        clipPathUnits="userSpaceOnUse"
                        id="clipPath162">
                  <path
                          d="M 0,1186 H 807.778 V 0 H 0 Z"
                          id="path160" />
                </clipPath>
                <clipPath
                        clipPathUnits="userSpaceOnUse"
                        id="clipPath204">
                  <path
                          d="M 0,1186 H 807.778 V 0 H 0 Z"
                          id="path202" />
                </clipPath>
                <clipPath
                        clipPathUnits="userSpaceOnUse"
                        id="clipPath252">
                  <path
                          d="M 0,1186 H 807.778 V 0 H 0 Z"
                          id="path250" />
                </clipPath>
                <clipPath
                        clipPathUnits="userSpaceOnUse"
                        id="clipPath280">
                  <path
                          d="M 0,1186 H 807.778 V 0 H 0 Z"
                          id="path278" />
                </clipPath>
                <clipPath
                        clipPathUnits="userSpaceOnUse"
                        id="clipPath300">
                  <path
                          d="M 0,1186 H 807.778 V 0 H 0 Z"
                          id="path298" />
                </clipPath>
                <clipPath
                        clipPathUnits="userSpaceOnUse"
                        id="clipPath320">
                  <path
                          d="M 0,1186 H 807.778 V 0 H 0 Z"
                          id="path318" />
                </clipPath>
                <clipPath
                        clipPathUnits="userSpaceOnUse"
                        id="clipPath340">
                  <path
                          d="M 0,1186 H 807.778 V 0 H 0 Z"
                          id="path338" />
                </clipPath>
                <clipPath
                        clipPathUnits="userSpaceOnUse"
                        id="clipPath364">
                  <path
                          d="M 0,1186 H 807.778 V 0 H 0 Z"
                          id="path362" />
                </clipPath>
                <clipPath
                        clipPathUnits="userSpaceOnUse"
                        id="clipPath388">
                  <path
                          d="M 0,1186 H 807.778 V 0 H 0 Z"
                          id="path386" />
                </clipPath>
                <clipPath
                        clipPathUnits="userSpaceOnUse"
                        id="clipPath412">
                  <path
                          d="M 0,1186 H 807.778 V 0 H 0 Z"
                          id="path410" />
                </clipPath>
                <clipPath
                        clipPathUnits="userSpaceOnUse"
                        id="clipPath436">
                  <path
                          d="M 0,1186 H 807.778 V 0 H 0 Z"
                          id="path434" />
                </clipPath>
                <clipPath
                        clipPathUnits="userSpaceOnUse"
                        id="clipPath460">
                  <path
                          d="M 0,1186 H 807.778 V 0 H 0 Z"
                          id="path458" />
                </clipPath>
              </defs>
              <sodipodi:namedview
                      id="namedview4"
                      pagecolor="#ffffff"
                      bordercolor="#000000"
                      borderopacity="0.25"
                      inkscape:showpageshadow="2"
                      inkscape:pageopacity="0.0"
                      inkscape:pagecheckerboard="0"
                      inkscape:deskcolor="#d1d1d1" />
              <g
                      id="g8"
                      inkscape:groupmode="layer"
                      inkscape:label="2265_infographic1_mobile"
                      transform="matrix(1.3333333,0,0,-1.3333333,0,1581.3333)">
                <path
                        d="M 0,0 H 807.778 V 1186 H 0 Z"
                        style="fill:#f2fcfe;fill-opacity:1;fill-rule:nonzero;stroke:none"
                        id="path10" />
                <g
                        id="g12">
                  <g
                          id="g14"
                          clip-path="url(#clipPath18)">
                    <g
                            id="g20"
                            transform="translate(46.1734,985.594)">
                      <path
                              d="m 0,0 h 137.419 c 3.153,0 5.709,2.556 5.709,5.709 V 48.2 c 0,3.153 -2.556,5.709 -5.709,5.709 L 0,53.909 c -3.153,0 -5.709,-2.556 -5.709,-5.709 V 5.709 C -5.709,2.556 -3.153,0 0,0"
                              style="fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
                              id="path22" />
                    </g>
                    <g
                            id="g24"
                            transform="translate(86.5327,978.3478)">
                      <path
                              d="M 0,0 H 150.152 V 68.402 H 0 c -2.795,0 -5.061,-2.266 -5.061,-5.061 V 5.061 C -5.061,2.266 -2.795,0 0,0"
                              style="fill:#252525;fill-opacity:1;fill-rule:nonzero;stroke:none"
                              id="path26" />
                    </g>
                    <g
                            id="g28"
                            transform="translate(56.3086,999.0651)">
                      <path
                              d="m 0,0 h 9.974 c 2.812,0 5.092,2.279 5.092,5.091 v 8.605 H -5.091 V 5.091 C -5.091,2.279 -2.812,0 0,0 m -1.481,22.716 c 0,3.572 2.896,6.468 6.468,6.468 3.572,0 6.468,-2.896 6.468,-6.468 0,-3.573 -2.896,-6.468 -6.468,-6.468 -3.572,0 -6.468,2.895 -6.468,6.468"
                              style="fill:#252525;fill-opacity:1;fill-rule:nonzero;stroke:none"
                              id="path30" />
                    </g>
                  </g>
                </g>
                <text
                        xml:space="preserve"
                        transform="matrix(1,0,0,-1,134.2383,1004.5801)"
                        style="font-variant:normal;font-weight:500;font-stretch:normal;font-size:18px;font-family:'Noto Sans CJK KR';-inkscape-font-specification:NotoSansCJKkr-Medium;writing-mode:lr-tb;fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
                        id="text34"><tspan
                        x="0 16.559999 33.119999"
                        y="0"
                        sodipodi:role="line"
                        id="tspan32">이사회</tspan></text>
                <g
                        id="g36">
                  <g
                          id="g38"
                          clip-path="url(#clipPath42)">
                    <g
                            id="g44"
                            transform="translate(46.1734,808.7908)">
                      <path
                              d="m 0,0 h 137.419 c 3.153,0 5.709,2.556 5.709,5.709 V 48.2 c 0,3.153 -2.556,5.709 -5.709,5.709 L 0,53.909 c -3.153,0 -5.709,-2.556 -5.709,-5.709 V 5.709 C -5.709,2.556 -3.153,0 0,0"
                              style="fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
                              id="path46" />
                    </g>
                    <g
                            id="g48"
                            transform="translate(86.5327,801.5446)">
                      <path
                              d="M 0,0 H 150.152 V 68.402 H 0 c -2.795,0 -5.061,-2.266 -5.061,-5.061 V 5.061 C -5.061,2.266 -2.795,0 0,0"
                              style="fill:#002157;fill-opacity:1;fill-rule:nonzero;stroke:none"
                              id="path50" />
                    </g>
                    <g
                            id="g52"
                            transform="translate(56.3086,822.2619)">
                      <path
                              d="m 0,0 h 9.974 c 2.812,0 5.092,2.279 5.092,5.091 v 8.605 H -5.091 V 5.091 C -5.091,2.279 -2.812,0 0,0 m -1.481,22.716 c 0,3.572 2.896,6.468 6.468,6.468 3.572,0 6.468,-2.896 6.468,-6.468 0,-3.573 -2.896,-6.468 -6.468,-6.468 -3.572,0 -6.468,2.895 -6.468,6.468"
                              style="fill:#002157;fill-opacity:1;fill-rule:nonzero;stroke:none"
                              id="path54" />
                    </g>
                  </g>
                </g>
                <text
                        xml:space="preserve"
                        transform="matrix(1,0,0,-1,117.6782,827.7773)"
                        style="font-variant:normal;font-weight:500;font-stretch:normal;font-size:18px;font-family:'Noto Sans CJK KR';-inkscape-font-specification:NotoSansCJKkr-Medium;writing-mode:lr-tb;fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
                        id="text58"><tspan
                        x="0 16.559999 33.119999 49.68 66.239998"
                        y="0"
                        sodipodi:role="line"
                        id="tspan56">운영위원회</tspan></text>
                <g
                        id="g60">
                  <g
                          id="g62"
                          clip-path="url(#clipPath66)">
                    <g
                            id="g68"
                            transform="translate(47.1687,721.2939)">
                      <path
                              d="m 0,0 h 137.419 c 3.153,0 5.709,2.556 5.709,5.709 V 48.2 c 0,3.153 -2.556,5.709 -5.709,5.709 L 0,53.909 c -3.153,0 -5.709,-2.556 -5.709,-5.709 V 5.709 C -5.709,2.556 -3.153,0 0,0"
                              style="fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
                              id="path70" />
                    </g>
                    <g
                            id="g72"
                            transform="translate(87.528,714.0477)">
                      <path
                              d="M 0,0 H 150.152 V 68.402 H 0 c -2.795,0 -5.061,-2.266 -5.061,-5.061 V 5.061 C -5.061,2.266 -2.795,0 0,0"
                              style="fill:#234d89;fill-opacity:1;fill-rule:nonzero;stroke:none"
                              id="path74" />
                    </g>
                    <g
                            id="g76"
                            transform="translate(57.3039,734.765)">
                      <path
                              d="m 0,0 h 9.974 c 2.812,0 5.092,2.279 5.092,5.091 v 8.605 H -5.091 V 5.091 C -5.091,2.279 -2.812,0 0,0 m -1.481,22.716 c 0,3.572 2.896,6.468 6.468,6.468 3.572,0 6.468,-2.896 6.468,-6.468 0,-3.573 -2.896,-6.468 -6.468,-6.468 -3.572,0 -6.468,2.895 -6.468,6.468"
                              style="fill:#234d89;fill-opacity:1;fill-rule:nonzero;stroke:none"
                              id="path78" />
                    </g>
                  </g>
                </g>
                <text
                        xml:space="preserve"
                        transform="matrix(1,0,0,-1,93.834,740.2803)"
                        style="font-variant:normal;font-weight:500;font-stretch:normal;font-size:18px;font-family:'Noto Sans CJK KR';-inkscape-font-specification:NotoSansCJKkr-Medium;writing-mode:lr-tb;fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
                        id="text82"><tspan
                        x="0 16.559999 33.119999 49.68 66.239998 82.800003 99.360001 115.92"
                        y="0"
                        sodipodi:role="line"
                        id="tspan80">미래전략기획본부</tspan></text>
                <g
                        id="g84">
                  <g
                          id="g86"
                          clip-path="url(#clipPath90)">
                    <g
                            id="g92"
                            transform="translate(512.3774,985.594)">
                      <path
                              d="m 0,0 h -137.419 c -3.153,0 -5.709,2.556 -5.709,5.709 V 48.2 c 0,3.153 2.556,5.709 5.709,5.709 L 0,53.909 c 3.153,0 5.709,-2.556 5.709,-5.709 V 5.709 C 5.709,2.556 3.153,0 0,0"
                              style="fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
                              id="path94" />
                    </g>
                    <g
                            id="g96"
                            transform="translate(472.018,978.3478)">
                      <path
                              d="M 0,0 H -150.152 V 68.402 H 0 c 2.795,0 5.061,-2.266 5.061,-5.061 V 5.061 C 5.061,2.266 2.795,0 0,0"
                              style="fill:#252525;fill-opacity:1;fill-rule:nonzero;stroke:none"
                              id="path98" />
                    </g>
                    <g
                            id="g100"
                            transform="translate(502.2422,1012.7607)">
                      <path
                              d="m 0,0 h -9.974 c -2.812,0 -5.092,-2.279 -5.092,-5.091 v -8.605 H 5.092 v 8.605 C 5.092,-2.279 2.812,0 0,0 m -4.987,2.552 c -3.572,0 -6.468,2.896 -6.468,6.468 0,3.572 2.896,6.468 6.468,6.468 3.572,0 6.468,-2.896 6.468,-6.468 0,-3.572 -2.896,-6.468 -6.468,-6.468"
                              style="fill:#252525;fill-opacity:1;fill-rule:nonzero;stroke:none"
                              id="path102" />
                    </g>
                  </g>
                </g>
                <text
                        xml:space="preserve"
                        transform="matrix(0.91555,0,0,-1,383.6157,1004.5806)"
                        style="font-variant:normal;font-weight:500;font-stretch:normal;font-size:18px;font-family:'Noto Sans CJK KR';-inkscape-font-specification:NotoSansCJKkr-Medium;writing-mode:lr-tb;fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
                        id="text106"><tspan
                        x="0 16.559999 21.6"
                        y="0"
                        sodipodi:role="line"
                        id="tspan104">감 사</tspan></text>
                <g
                        id="g108">
                  <g
                          id="g110"
                          clip-path="url(#clipPath114)">
                    <g
                            id="g116"
                            transform="translate(512.3774,808.7908)">
                      <path
                              d="m 0,0 h -137.419 c -3.153,0 -5.709,2.556 -5.709,5.709 V 48.2 c 0,3.153 2.556,5.709 5.709,5.709 L 0,53.909 c 3.153,0 5.709,-2.556 5.709,-5.709 V 5.709 C 5.709,2.556 3.153,0 0,0"
                              style="fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
                              id="path118" />
                    </g>
                    <g
                            id="g120"
                            transform="translate(472.018,801.5446)">
                      <path
                              d="M 0,0 H -150.152 V 68.402 H 0 c 2.795,0 5.061,-2.266 5.061,-5.061 V 5.061 C 5.061,2.266 2.795,0 0,0"
                              style="fill:#002157;fill-opacity:1;fill-rule:nonzero;stroke:none"
                              id="path122" />
                    </g>
                    <g
                            id="g124"
                            transform="translate(502.2422,835.9575)">
                      <path
                              d="m 0,0 h -9.974 c -2.812,0 -5.092,-2.28 -5.092,-5.091 v -8.605 H 5.092 v 8.605 C 5.092,-2.28 2.812,0 0,0 m -4.987,2.552 c -3.572,0 -6.468,2.896 -6.468,6.468 0,3.572 2.896,6.468 6.468,6.468 3.572,0 6.468,-2.896 6.468,-6.468 0,-3.572 -2.896,-6.468 -6.468,-6.468"
                              style="fill:#002157;fill-opacity:1;fill-rule:nonzero;stroke:none"
                              id="path126" />
                    </g>
                  </g>
                </g>
                <text
                        xml:space="preserve"
                        transform="matrix(1,0,0,-1,358.0728,827.7773)"
                        style="font-variant:normal;font-weight:500;font-stretch:normal;font-size:18px;font-family:'Noto Sans CJK KR';-inkscape-font-specification:NotoSansCJKkr-Medium;writing-mode:lr-tb;fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
                        id="text130"><tspan
                        x="0 16.559999 33.119999 49.68 66.239998"
                        y="0"
                        sodipodi:role="line"
                        id="tspan128">인사위원회</tspan></text>
                <g
                        id="g132">
                  <g
                          id="g134"
                          clip-path="url(#clipPath138)">
                    <g
                            id="g140"
                            transform="translate(512.3774,721.2939)">
                      <path
                              d="m 0,0 h -137.419 c -3.153,0 -5.709,2.556 -5.709,5.709 V 48.2 c 0,3.153 2.556,5.709 5.709,5.709 L 0,53.909 c 3.153,0 5.709,-2.556 5.709,-5.709 V 5.709 C 5.709,2.556 3.153,0 0,0"
                              style="fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
                              id="path142" />
                    </g>
                    <g
                            id="g144"
                            transform="translate(472.018,714.0477)">
                      <path
                              d="M 0,0 H -150.152 V 68.402 H 0 c 2.795,0 5.061,-2.266 5.061,-5.061 V 5.061 C 5.061,2.266 2.795,0 0,0"
                              style="fill:#234d89;fill-opacity:1;fill-rule:nonzero;stroke:none"
                              id="path146" />
                    </g>
                    <g
                            id="g148"
                            transform="translate(502.2422,748.4606)">
                      <path
                              d="m 0,0 h -9.974 c -2.812,0 -5.092,-2.279 -5.092,-5.091 v -8.605 H 5.092 v 8.605 C 5.092,-2.279 2.812,0 0,0 m -4.987,2.552 c -3.572,0 -6.468,2.896 -6.468,6.468 0,3.572 2.896,6.468 6.468,6.468 3.572,0 6.468,-2.896 6.468,-6.468 0,-3.572 -2.896,-6.468 -6.468,-6.468"
                              style="fill:#234d89;fill-opacity:1;fill-rule:nonzero;stroke:none"
                              id="path150" />
                    </g>
                  </g>
                </g>
                <text
                        xml:space="preserve"
                        transform="matrix(1,0,0,-1,358.0728,740.2803)"
                        style="font-variant:normal;font-weight:500;font-stretch:normal;font-size:18px;font-family:'Noto Sans CJK KR';-inkscape-font-specification:NotoSansCJKkr-Medium;writing-mode:lr-tb;fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
                        id="text154"><tspan
                        x="0 16.559999 33.119999 49.68 66.239998"
                        y="0"
                        sodipodi:role="line"
                        id="tspan152">경영지원실</tspan></text>
                <g
                        id="g156">
                  <g
                          id="g158"
                          clip-path="url(#clipPath162)">
                    <path
                            d="m 321.366,1002.962 h -85.19 v -3 h 85.19 z"
                            style="fill:#130a33;fill-opacity:1;fill-rule:nonzero;stroke:none"
                            id="path164" />
                    <path
                            d="m 277.27,84.742 h 3 v 982.472 h -3 z"
                            style="fill:#130a33;fill-opacity:1;fill-rule:nonzero;stroke:none"
                            id="path166" />
                    <path
                            d="m 321.366,837.245 h -85.19 v -3 h 85.19 z"
                            style="fill:#130a33;fill-opacity:1;fill-rule:nonzero;stroke:none"
                            id="path168" />
                    <path
                            d="m 321.366,611.347 h -44.095 v -3 h 44.095 z"
                            style="fill:#130a33;fill-opacity:1;fill-rule:nonzero;stroke:none"
                            id="path170" />
                    <path
                            d="m 321.366,472.945 h -44.095 v -3 h 44.095 z"
                            style="fill:#130a33;fill-opacity:1;fill-rule:nonzero;stroke:none"
                            id="path172" />
                    <path
                            d="m 321.366,314.544 h -44.095 v -3 h 44.095 z"
                            style="fill:#130a33;fill-opacity:1;fill-rule:nonzero;stroke:none"
                            id="path174" />
                    <path
                            d="m 321.366,176.142 h -44.095 v -3 h 44.095 z"
                            style="fill:#130a33;fill-opacity:1;fill-rule:nonzero;stroke:none"
                            id="path176" />
                    <path
                            d="m 321.366,87.741 h -44.095 v -3 h 44.095 z"
                            style="fill:#130a33;fill-opacity:1;fill-rule:nonzero;stroke:none"
                            id="path178" />
                    <path
                            d="m 321.366,749.748 h -85.19 v -3 h 85.19 z"
                            style="fill:#130a33;fill-opacity:1;fill-rule:nonzero;stroke:none"
                            id="path180" />
                    <g
                            id="g182"
                            transform="translate(371.1719,1073.9956)">
                      <path
                              d="m 0,0 h -137.419 c -3.153,0 -5.709,2.556 -5.709,5.709 V 48.2 c 0,3.153 2.556,5.709 5.709,5.709 L 0,53.909 c 3.153,0 5.709,-2.556 5.709,-5.709 V 5.709 C 5.709,2.556 3.153,0 0,0"
                              style="fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
                              id="path184" />
                    </g>
                    <g
                            id="g186"
                            transform="translate(330.8125,1066.7494)">
                      <path
                              d="M 0,0 H -150.152 V 68.402 H 0 c 2.795,0 5.061,-2.266 5.061,-5.061 V 5.061 C 5.061,2.266 2.795,0 0,0"
                              style="fill:#0054a5;fill-opacity:1;fill-rule:nonzero;stroke:none"
                              id="path188" />
                    </g>
                    <g
                            id="g190"
                            transform="translate(361.0366,1101.1624)">
                      <path
                              d="m 0,0 h -9.974 c -2.812,0 -5.091,-2.28 -5.091,-5.091 v -8.605 H 5.092 v 8.605 C 5.092,-2.28 2.812,0 0,0 m -4.987,2.552 c -3.572,0 -6.468,2.896 -6.468,6.468 0,3.572 2.896,6.468 6.468,6.468 3.572,0 6.468,-2.896 6.468,-6.468 0,-3.572 -2.896,-6.468 -6.468,-6.468"
                              style="fill:#0054a5;fill-opacity:1;fill-rule:nonzero;stroke:none"
                              id="path192" />
                    </g>
                  </g>
                </g>
                <text
                        xml:space="preserve"
                        transform="matrix(1,0,0,-1,228.458,1094.3145)"
                        style="font-variant:normal;font-weight:500;font-stretch:normal;font-size:20px;font-family:'Noto Sans CJK KR';-inkscape-font-specification:NotoSansCJKkr-Medium;writing-mode:lr-tb;fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
                        id="text196"><tspan
                        x="0 18.4 36.799999"
                        y="0"
                        sodipodi:role="line"
                        id="tspan194">이사장</tspan></text>
                <g
                        id="g198">
                  <g
                          id="g200"
                          clip-path="url(#clipPath204)">
                    <g
                            id="g206"
                            transform="translate(371.1719,897.1924)">
                      <path
                              d="m 0,0 h -137.419 c -3.153,0 -5.709,2.556 -5.709,5.709 V 48.2 c 0,3.153 2.556,5.709 5.709,5.709 L 0,53.909 c 3.153,0 5.709,-2.556 5.709,-5.709 V 5.709 C 5.709,2.556 3.153,0 0,0"
                              style="fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
                              id="path208" />
                    </g>
                    <g
                            id="g210"
                            transform="translate(330.8125,889.9462)">
                      <path
                              d="M 0,0 H -150.152 V 68.402 H 0 c 2.795,0 5.061,-2.266 5.061,-5.061 V 5.061 C 5.061,2.266 2.795,0 0,0"
                              style="fill:#0054a5;fill-opacity:1;fill-rule:nonzero;stroke:none"
                              id="path212" />
                    </g>
                    <g
                            id="g214"
                            transform="translate(361.0366,924.3592)">
                      <path
                              d="m 0,0 h -9.974 c -2.812,0 -5.091,-2.28 -5.091,-5.091 v -8.605 H 5.092 v 8.605 C 5.092,-2.28 2.812,0 0,0 m -4.987,2.552 c -3.572,0 -6.468,2.896 -6.468,6.468 0,3.572 2.896,6.468 6.468,6.468 3.572,0 6.468,-2.896 6.468,-6.468 0,-3.572 -2.896,-6.468 -6.468,-6.468"
                              style="fill:#0054a5;fill-opacity:1;fill-rule:nonzero;stroke:none"
                              id="path216" />
                    </g>
                  </g>
                </g>
                <text
                        xml:space="preserve"
                        transform="matrix(1,0,0,-1,234.8579,917.5117)"
                        style="font-variant:normal;font-weight:500;font-stretch:normal;font-size:20px;font-family:'Noto Sans CJK KR';-inkscape-font-specification:NotoSansCJKkr-Medium;writing-mode:lr-tb;fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
                        id="text220"><tspan
                        x="0 18.4 24"
                        y="0"
                        sodipodi:role="line"
                        id="tspan218">원 장</tspan></text>
                <text
                        xml:space="preserve"
                        transform="matrix(1,0,0,-1,87.4629,690.8477)"
                        style="font-variant:normal;font-weight:500;font-stretch:normal;font-size:15px;font-family:'Noto Sans CJK KR';-inkscape-font-specification:NotoSansCJKkr-Medium;writing-mode:lr-tb;fill:#252525;fill-opacity:1;fill-rule:nonzero;stroke:none"
                        id="text244"><tspan
                        x="0 8.6099997 11.985 25.785 39.584999 53.384998 67.184998 80.985001 94.785004 108.585"
                        y="0"
                        sodipodi:role="line"
                        id="tspan222">· 미래전략기획본부</tspan><tspan
                        x="0 8.6099997 11.985 20.235001 25.59 39.389999 53.189999 66.989998 80.790001"
                        y="21.075001"
                        sodipodi:role="line"
                        id="tspan224">· J-밸리혁신팀</tspan><tspan
                        x="234.405 243.015 246.39 260.19 273.98999 287.79001 301.59"
                        y="0"
                        sodipodi:role="line"
                        id="tspan226">· 사업지원팀</tspan><tspan
                        x="234.405 243.015 246.39 260.19 273.98999 287.79001 301.59"
                        y="21.075001"
                        sodipodi:role="line"
                        id="tspan228">· 경영지원팀</tspan><tspan
                        x="234.405 243.015 246.39 260.19 273.98999 287.79001 301.59 315.39001 329.19"
                        y="435.20999"
                        sodipodi:role="line"
                        id="tspan230">· 우주항공개발팀</tspan><tspan
                        x="234.405 243.015 246.39 260.19 273.98999 287.79001 301.59 315.39001 329.19"
                        y="456.285"
                        sodipodi:role="line"
                        id="tspan232">· 우주항공기술팀</tspan><tspan
                        x="234.405 243.015 246.39 260.19 273.98999 287.79001 301.59"
                        y="138.405"
                        sodipodi:role="line"
                        id="tspan234">· 제조혁신팀</tspan><tspan
                        x="234.405 243.015 246.39 260.19 273.98999 287.79001 301.59 315.39001"
                        y="159.48"
                        sodipodi:role="line"
                        id="tspan236">· 신기술융합팀</tspan><tspan
                        x="234.405 243.015 246.39 260.19 273.98999 287.79001 301.59 315.39001 329.19"
                        y="276.81"
                        sodipodi:role="line"
                        id="tspan238">· 지역산업육성팀</tspan><tspan
                        x="234.405 243.015 246.39 260.19 273.98999 287.79001 301.59"
                        y="297.88501"
                        sodipodi:role="line"
                        id="tspan240">· 인재개발팀</tspan><tspan
                        x="234.405 243.015 246.39 260.19 273.98999 287.79001 301.59 315.39001 329.19 342.98999"
                        y="318.64499"
                        sodipodi:role="line"
                        id="tspan242">· 일자리창업허브팀</tspan></text>
                <g
                        id="g246">
                  <g
                          id="g248"
                          clip-path="url(#clipPath252)">
                    <path
                            d="m 562.182,611.347 h -44.095 v -3 h 44.095 z"
                            style="fill:#130a33;fill-opacity:1;fill-rule:nonzero;stroke:none"
                            id="path254" />
                    <path
                            d="m 562.182,472.945 h -44.095 v -3 h 44.095 z"
                            style="fill:#130a33;fill-opacity:1;fill-rule:nonzero;stroke:none"
                            id="path256" />
                    <path
                            d="m 562.182,408.485 h -23.548 v -3 h 23.548 z"
                            style="fill:#130a33;fill-opacity:1;fill-rule:nonzero;stroke:none"
                            id="path258" />
                    <path
                            d="m 562.182,176.142 h -44.095 v -3 h 44.095 z"
                            style="fill:#130a33;fill-opacity:1;fill-rule:nonzero;stroke:none"
                            id="path260" />
                    <g
                            id="g262"
                            transform="translate(756.1258,582.6167)">
                      <path
                              d="m 0,0 h -183.836 c -6.179,0 -11.188,5.009 -11.188,11.187 v 32.086 c 0,6.179 5.009,11.187 11.188,11.187 L 0,54.46 c 6.179,0 11.188,-5.008 11.188,-11.187 V 11.187 C 11.188,5.009 6.179,0 0,0"
                              style="fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
                              id="path264" />
                    </g>
                    <g
                            id="g266"
                            transform="translate(764.3133,603.9661)">
                      <path
                              d="m 0,0 v -10.702 c 0,-4.217 -3.431,-7.647 -7.648,-7.647 h -184.916 c -4.217,0 -7.647,3.43 -7.647,7.647 V 0 0.78 22.464 c 0,4.216 3.43,7.647 7.647,7.647 H -7.648 C -3.431,30.111 0,26.68 0,22.464 V 0.78 Z m -7.648,33.111 h -184.916 c -5.871,0 -10.647,-4.776 -10.647,-10.647 V 0.78 0 -10.702 c 0,-5.871 4.776,-10.647 10.647,-10.647 H -7.648 C -1.776,-21.349 3,-16.573 3,-10.702 V 0 0.78 22.464 c 0,5.871 -4.776,10.647 -10.648,10.647"
                              style="fill:#41ace0;fill-opacity:1;fill-rule:nonzero;stroke:none"
                              id="path268" />
                    </g>
                  </g>
                </g>
                <text
                        xml:space="preserve"
                        transform="matrix(1,0,0,-1,595.2075,603.3496)"
                        style="font-variant:normal;font-weight:500;font-stretch:normal;font-size:15px;font-family:'Noto Sans CJK KR';-inkscape-font-specification:NotoSansCJKkr-Medium;writing-mode:lr-tb;fill:#41ace0;fill-opacity:1;fill-rule:nonzero;stroke:none"
                        id="text272"><tspan
                        x="0 13.8 27.6 41.400002 55.200001 69 82.800003 96.599998 110.4 124.2"
                        y="0"
                        sodipodi:role="line"
                        id="tspan270">뿌리소재뿌리기술센터</tspan></text>
                <g
                        id="g274">
                  <g
                          id="g276"
                          clip-path="url(#clipPath280)">
                    <g
                            id="g282"
                            transform="translate(756.1259,147.4118)">
                      <path
                              d="m 0,0 h -183.837 c -6.178,0 -11.187,5.009 -11.187,11.188 v 32.085 c 0,6.179 5.009,11.187 11.187,11.187 H 0 c 6.179,0 11.188,-5.008 11.188,-11.187 V 11.188 C 11.188,5.009 6.179,0 0,0"
                              style="fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
                              id="path284" />
                    </g>
                    <%--<g
                            id="g286"
                            transform="translate(764.3134,168.7612)">
                      <path
                              d="m 0,0 v -10.702 c 0,-4.217 -3.431,-7.647 -7.648,-7.647 h -184.916 c -4.217,0 -7.648,3.43 -7.648,7.647 V 0 0.78 22.464 c 0,4.216 3.431,7.647 7.648,7.647 H -7.648 C -3.431,30.111 0,26.68 0,22.464 V 0.78 Z m -7.648,33.111 h -184.916 c -5.871,0 -10.648,-4.776 -10.648,-10.647 V 0.78 0 -10.702 c 0,-5.871 4.777,-10.647 10.648,-10.647 H -7.648 C -1.776,-21.349 3,-16.573 3,-10.702 V 0 0.78 22.464 c 0,5.871 -4.776,10.647 -10.648,10.647"
                              style="fill:#22cb56;fill-opacity:1;fill-rule:nonzero;stroke:none"
                              id="path288" />
                    </g>
                  </g>
                </g>
                <text
                        xml:space="preserve"
                        transform="matrix(1,0,0,-1,593.1084,168.1445)"
                        style="font-variant:normal;font-weight:500;font-stretch:normal;font-size:15px;font-family:'Noto Sans CJK KR';-inkscape-font-specification:NotoSansCJKkr-Medium;writing-mode:lr-tb;fill:#22cb56;fill-opacity:1;fill-rule:nonzero;stroke:none"
                        id="text292"><tspan
                        x="0 13.8 27.6 41.400002 55.200001 59.400002 73.199997 87 100.8 114.6 128.39999"
                        y="0"
                        sodipodi:role="line"
                        id="tspan290">드론산업 혁신지원센터</tspan></text>--%>
                <g
                        id="g294">
                  <g
                          id="g296"
                          clip-path="url(#clipPath300)">
                    <g
                            id="g302"
                            transform="translate(756.1259,444.2151)">
                      <path
                              d="m 0,0 h -183.837 c -6.178,0 -11.187,5.009 -11.187,11.187 v 32.086 c 0,6.179 5.009,11.187 11.187,11.187 L 0,54.46 c 6.179,0 11.187,-5.008 11.187,-11.187 V 11.187 C 11.187,5.009 6.179,0 0,0"
                              style="fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
                              id="path304" />
                    </g>
                    <g
                            id="g306"
                            transform="translate(764.3133,465.5645)">
                      <path
                              d="m 0,0 v -10.702 c 0,-4.217 -3.431,-7.647 -7.647,-7.647 h -184.917 c -4.217,0 -7.647,3.43 -7.647,7.647 V 0 0.78 22.464 c 0,4.216 3.43,7.647 7.647,7.647 H -7.647 C -3.431,30.111 0,26.68 0,22.464 V 0.78 Z m -7.647,33.111 h -184.917 c -5.871,0 -10.647,-4.776 -10.647,-10.647 V 0.78 0 -10.702 c 0,-5.871 4.776,-10.647 10.647,-10.647 H -7.647 C -1.776,-21.349 3,-16.573 3,-10.702 V 0 0.78 22.464 c 0,5.871 -4.776,10.647 -10.647,10.647"
                              style="fill:#305c99;fill-opacity:1;fill-rule:nonzero;stroke:none"
                              id="path308" />
                    </g>
                  </g>
                </g>
                <text
                        xml:space="preserve"
                        transform="matrix(1,0,0,-1,602.1074,464.9473)"
                        style="font-variant:normal;font-weight:500;font-stretch:normal;font-size:15px;font-family:'Noto Sans CJK KR';-inkscape-font-specification:NotoSansCJKkr-Medium;writing-mode:lr-tb;fill:#305c99;fill-opacity:1;fill-rule:nonzero;stroke:none"
                        id="text312"><tspan
                        x="0 13.8 27.6 41.400002 55.200001 69 82.800003 96.599998 110.4"
                        y="0"
                        sodipodi:role="line"
                        id="tspan310">전북조선업도약센터</tspan></text>
                <g
                        id="g314">
                  <g
                          id="g316"
                          clip-path="url(#clipPath320)">
                    <g
                            id="g322"
                            transform="translate(756.1259,379.7546)">
                      <path
                              d="m 0,0 h -183.837 c -6.178,0 -11.187,5.009 -11.187,11.188 v 32.085 c 0,6.179 5.009,11.187 11.187,11.187 H 0 c 6.179,0 11.187,-5.008 11.187,-11.187 V 11.188 C 11.187,5.009 6.179,0 0,0"
                              style="fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
                              id="path324" />
                    </g>
                    <g
                            id="g326"
                            transform="translate(764.3133,401.104)">
                      <path
                              d="m 0,0 v -10.702 c 0,-4.217 -3.431,-7.647 -7.647,-7.647 h -184.917 c -4.217,0 -7.647,3.43 -7.647,7.647 V 0 0.78 22.464 c 0,4.216 3.43,7.647 7.647,7.647 H -7.647 C -3.431,30.111 0,26.68 0,22.464 V 0.78 Z m -7.647,33.111 h -184.917 c -5.871,0 -10.647,-4.776 -10.647,-10.647 V 0.78 0 -10.702 c 0,-5.871 4.776,-10.647 10.647,-10.647 H -7.647 C -1.776,-21.349 3,-16.573 3,-10.702 V 0 0.78 22.464 c 0,5.871 -4.776,10.647 -10.647,10.647"
                              style="fill:#305c99;fill-opacity:1;fill-rule:nonzero;stroke:none"
                              id="path328" />
                    </g>
                  </g>
                </g>
                <text
                        xml:space="preserve"
                        transform="matrix(1,0,0,-1,586.2075,400.4873)"
                        style="font-variant:normal;font-weight:500;font-stretch:normal;font-size:15px;font-family:'Noto Sans CJK KR';-inkscape-font-specification:NotoSansCJKkr-Medium;writing-mode:lr-tb;fill:#305c99;fill-opacity:1;fill-rule:nonzero;stroke:none"
                        id="text332"><tspan
                        x="0 13.8 27.6 41.400002 55.200001 59.400002 73.199997 87 100.8 114.6 128.39999 142.2"
                        y="0"
                        sodipodi:role="line"
                        id="tspan330">익산고용 안정일자리센터</tspan></text>
                <g
                        id="g334">
                  <g
                          id="g336"
                          clip-path="url(#clipPath340)">
                    <g
                            id="g342"
                            transform="translate(512.3774,286.0891)">
                      <path
                              d="m 0,0 h -137.418 c -3.154,0 -5.71,2.556 -5.71,5.709 V 48.2 c 0,3.153 2.556,5.709 5.71,5.709 L 0,53.909 c 3.153,0 5.709,-2.556 5.709,-5.709 V 5.709 C 5.709,2.556 3.153,0 0,0"
                              style="fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
                              id="path344" />
                    </g>
                    <g
                            id="g346"
                            transform="translate(472.018,278.8429)">
                      <path
                              d="M 0,0 H -150.152 V 68.402 H 0 c 2.795,0 5.061,-2.266 5.061,-5.061 V 5.061 C 5.061,2.266 2.795,0 0,0"
                              style="fill:#0054a5;fill-opacity:1;fill-rule:nonzero;stroke:none"
                              id="path348" />
                    </g>
                    <g
                            id="g350"
                            transform="translate(502.2422,313.2558)">
                      <path
                              d="m 0,0 h -9.974 c -2.812,0 -5.092,-2.28 -5.092,-5.091 v -8.605 H 5.092 v 8.605 C 5.092,-2.28 2.812,0 0,0 m -4.987,2.552 c -3.572,0 -6.468,2.896 -6.468,6.468 0,3.572 2.896,6.468 6.468,6.468 3.572,0 6.468,-2.896 6.468,-6.468 0,-3.572 -2.896,-6.468 -6.468,-6.468"
                              style="fill:#0054a5;fill-opacity:1;fill-rule:nonzero;stroke:none"
                              id="path352" />
                    </g>
                  </g>
                </g>
                <text
                        xml:space="preserve"
                        transform="matrix(1,0,0,-1,341.604,305.0752)"
                        style="font-variant:normal;font-weight:500;font-stretch:normal;font-size:18px;font-family:'Noto Sans CJK KR';-inkscape-font-specification:NotoSansCJKkr-Medium;writing-mode:lr-tb;fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
                        id="text356"><tspan
                        x="0 16.559999 33.119999 49.68 66.239998 82.800003 99.360001"
                        y="0"
                        sodipodi:role="line"
                        id="tspan354">우주항공사업부</tspan></text>
                <g
                        id="g358">
                  <g
                          id="g360"
                          clip-path="url(#clipPath364)">
                    <g
                            id="g366"
                            transform="translate(512.3774,59.2859)">
                      <path
                              d="m 0,0 h -137.419 c -3.153,0 -5.709,2.556 -5.709,5.709 V 48.2 c 0,3.153 2.556,5.709 5.709,5.709 L 0,53.909 c 3.153,0 5.709,-2.556 5.709,-5.709 V 5.709 C 5.709,2.556 3.153,0 0,0"
                              style="fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
                              id="path368" />
                    </g>
                    <g
                            id="g370"
                            transform="translate(472.018,52.0397)">
                      <path
                              d="M 0,0 H -150.152 V 68.402 H 0 c 2.795,0 5.061,-2.266 5.061,-5.061 V 5.061 C 5.061,2.266 2.795,0 0,0"
                              style="fill:#23cab9;fill-opacity:1;fill-rule:nonzero;stroke:none"
                              id="path372" />
                    </g>
                    <g
                            id="g374"
                            transform="translate(502.2422,86.4526)">
                      <path
                              d="m 0,0 h -9.974 c -2.812,0 -5.092,-2.279 -5.092,-5.092 v -8.604 H 5.092 v 8.604 C 5.092,-2.279 2.812,0 0,0 m -4.987,2.552 c -3.572,0 -6.468,2.896 -6.468,6.468 0,3.572 2.896,6.468 6.468,6.468 3.572,0 6.468,-2.896 6.468,-6.468 0,-3.572 -2.896,-6.468 -6.468,-6.468"
                              style="fill:#23cab9;fill-opacity:1;fill-rule:nonzero;stroke:none"
                              id="path376" />
                    </g>
                  </g>
                </g>
                <text
                        xml:space="preserve"
                        transform="matrix(1,0,0,-1,333.3242,78.2817)"
                        style="font-variant:normal;font-weight:500;font-stretch:normal;font-size:18px;font-family:'Noto Sans CJK KR';-inkscape-font-specification:NotoSansCJKkr-Medium;writing-mode:lr-tb;fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
                        id="text380"><tspan
                        x="0 16.559999 33.119999 49.68 66.239998 82.800003 99.360001 115.92"
                        y="0"
                        sodipodi:role="line"
                        id="tspan378">스마트제조사업부</tspan></text>
                <g
                        id="g382">
                  <g
                          id="g384"
                          clip-path="url(#clipPath388)">
                    <g
                            id="g390"
                            transform="translate(512.3774,582.8923)">
                      <path
                              d="m 0,0 h -137.419 c -3.153,0 -5.709,2.556 -5.709,5.709 V 48.2 c 0,3.153 2.556,5.709 5.709,5.709 L 0,53.909 c 3.153,0 5.709,-2.556 5.709,-5.709 V 5.709 C 5.709,2.556 3.153,0 0,0"
                              style="fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
                              id="path392" />
                    </g>
                    <g
                            id="g394"
                            transform="translate(472.018,575.6461)">
                      <path
                              d="M 0,0 H -150.152 V 68.402 H 0 c 2.795,0 5.061,-2.266 5.061,-5.061 V 5.061 C 5.061,2.266 2.795,0 0,0"
                              style="fill:#41ace0;fill-opacity:1;fill-rule:nonzero;stroke:none"
                              id="path396" />
                    </g>
                    <g
                            id="g398"
                            transform="translate(502.2422,610.059)">
                      <path
                              d="m 0,0 h -9.974 c -2.812,0 -5.092,-2.28 -5.092,-5.091 v -8.605 H 5.092 v 8.605 C 5.092,-2.28 2.812,0 0,0 m -4.987,2.552 c -3.572,0 -6.468,2.896 -6.468,6.468 0,3.572 2.896,6.468 6.468,6.468 3.572,0 6.468,-2.896 6.468,-6.468 0,-3.572 -2.896,-6.468 -6.468,-6.468"
                              style="fill:#41ace0;fill-opacity:1;fill-rule:nonzero;stroke:none"
                              id="path400" />
                    </g>
                  </g>
                </g>
                <text
                        xml:space="preserve"
                        transform="matrix(1,0,0,-1,341.8921,601.8789)"
                        style="font-variant:normal;font-weight:500;font-stretch:normal;font-size:18px;font-family:'Noto Sans CJK KR';-inkscape-font-specification:NotoSansCJKkr-Medium;writing-mode:lr-tb;fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
                        id="text404"><tspan
                        x="0 11.808 24.516001 36.521999 49.104 65.664001 82.223999 98.783997"
                        y="0"
                        sodipodi:role="line"
                        id="tspan402">R&amp;BD사업본부</tspan></text>
                <g
                        id="g406">
                  <g
                          id="g408"
                          clip-path="url(#clipPath412)">
                    <g
                            id="g414"
                            transform="translate(512.3774,444.4907)">
                      <path
                              d="m 0,0 h -137.419 c -3.153,0 -5.709,2.556 -5.709,5.709 V 48.2 c 0,3.153 2.556,5.709 5.709,5.709 L 0,53.909 c 3.153,0 5.709,-2.556 5.709,-5.709 V 5.709 C 5.709,2.556 3.153,0 0,0"
                              style="fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
                              id="path416" />
                    </g>
                    <g
                            id="g418"
                            transform="translate(472.018,437.2445)">
                      <path
                              d="M 0,0 H -150.152 V 68.402 H 0 c 2.795,0 5.061,-2.266 5.061,-5.061 V 5.061 C 5.061,2.266 2.795,0 0,0"
                              style="fill:#305c99;fill-opacity:1;fill-rule:nonzero;stroke:none"
                              id="path420" />
                    </g>
                    <g
                            id="g422"
                            transform="translate(502.2422,471.6574)">
                      <path
                              d="m 0,0 h -9.974 c -2.812,0 -5.092,-2.28 -5.092,-5.092 v -8.604 H 5.092 v 8.604 C 5.092,-2.28 2.812,0 0,0 m -4.987,2.552 c -3.572,0 -6.468,2.896 -6.468,6.468 0,3.572 2.896,6.468 6.468,6.468 3.572,0 6.468,-2.896 6.468,-6.468 0,-3.572 -2.896,-6.468 -6.468,-6.468"
                              style="fill:#305c99;fill-opacity:1;fill-rule:nonzero;stroke:none"
                              id="path424" />
                    </g>
                  </g>
                </g>
                <text
                        xml:space="preserve"
                        transform="matrix(1,0,0,-1,333.3242,463.4766)"
                        style="font-variant:normal;font-weight:500;font-stretch:normal;font-size:18px;font-family:'Noto Sans CJK KR';-inkscape-font-specification:NotoSansCJKkr-Medium;writing-mode:lr-tb;fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
                        id="text428"><tspan
                        x="0 16.559999 33.119999 49.68 66.239998 82.800003 99.360001 115.92"
                        y="0"
                        sodipodi:role="line"
                        id="tspan426">기업성장지원본부</tspan></text>
                <g
                        id="g430">
                  <g
                          id="g432"
                          clip-path="url(#clipPath436)">
                    <g
                            id="g438"
                            transform="translate(512.3774,147.6875)">
                      <path
                              d="m 0,0 h -137.419 c -3.153,0 -5.709,2.556 -5.709,5.709 V 48.2 c 0,3.153 2.556,5.709 5.709,5.709 L 0,53.909 c 3.153,0 5.709,-2.556 5.709,-5.709 V 5.709 C 5.709,2.556 3.153,0 0,0"
                              style="fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
                              id="path440" />
                    </g>
                    <g
                            id="g442"
                            transform="translate(472.018,140.4413)">
                      <path
                              d="M 0,0 H -150.152 V 68.402 H 0 c 2.795,0 5.061,-2.266 5.061,-5.061 V 5.061 C 5.061,2.266 2.795,0 0,0"
                              style="fill:#22cb56;fill-opacity:1;fill-rule:nonzero;stroke:none"
                              id="path444" />
                    </g>
                    <g
                            id="g446"
                            transform="translate(502.2421,174.8542)">
                      <path
                              d="m 0,0 h -9.974 c -2.812,0 -5.092,-2.279 -5.092,-5.092 v -8.604 H 5.092 v 8.604 C 5.092,-2.279 2.812,0 0,0 m -4.987,2.552 c -3.572,0 -6.468,2.896 -6.468,6.468 0,3.572 2.896,6.468 6.468,6.468 3.572,0 6.468,-2.896 6.468,-6.468 0,-3.572 -2.896,-6.468 -6.468,-6.468"
                              style="fill:#22cb56;fill-opacity:1;fill-rule:nonzero;stroke:none"
                              id="path448" />
                    </g>
                  </g>
                </g>
                <text
                        xml:space="preserve"
                        transform="matrix(1,0,0,-1,358.1641,166.6738)"
                        style="font-variant:normal;font-weight:500;font-stretch:normal;font-size:18px;font-family:'Noto Sans CJK KR';-inkscape-font-specification:NotoSansCJKkr-Medium;writing-mode:lr-tb;fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
                        id="text452"><tspan
                        x="0 16.559999 33.119999 49.68 66.239998"
                        y="0"
                        sodipodi:role="line"
                        id="tspan450">드론사업부</tspan></text>
                <g
                        id="g454">
                  <g
                          id="g456"
                          clip-path="url(#clipPath460)">
                    <path
                            d="m 538.634,406.985 h 3 v 64.673 h -3 z"
                            style="fill:#130a33;fill-opacity:1;fill-rule:nonzero;stroke:none"
                            id="path462" />
                  </g>
                </g>
              </g>
            </svg>
          </div>
        </div>

        <%--조직도 사원리스트 웹버전--%>
        <div class="imgList">
          <p style="font-size: 24px; font-weight: 600; color: #000; margin-top: 30px;">부서 연락처</p>
          <table class="__tblList respond1" style="margin-top:10px;">
            <caption>조직도 사원리스트</caption>
            <colgroup>
              <col style="width:33%;"/>
              <col style="width:33%;"/>
              <col style="width:33%;"/>
              <%--<col style="width:100px;"/>--%>
            </colgroup>
            <thead>
            <tr>
              <th scope="col">부서</th>
              <th scope="col">팀</th>
              <th scope="col">연락처</th>
            </tr>
            </thead>
            <tr>
              <td rowspan="2" scope="col">미래전략기획본부</td>
              <td scope="col">미래전략기획팀</td>
              <td scope="col">063)219-0394</td>
            </tr>
            <tr>
              <td scope="col">J-밸리혁신팀</td>
              <td scope="col">063)219-0383</td>
            </tr>
            <tr>
              <td rowspan="3" scope="col">R&BD사업본부</td>
              <td scope="col">신기술융합팀</td>
              <td scope="col">063)219-0322</td>
            </tr>
            <tr>
              <td scope="col">제조혁신팀</td>
              <td scope="col">063)219-0371</td>
            </tr>
            <tr>
              <td scope="col">복합소재뿌리기술센터</td>
              <td scope="col">063)219-0329</td>
            </tr>
            <tr>
              <td rowspan="2" scope="col">기업성장지원본부</td>
              <td scope="col">창업/기업성장지원팀</td>
              <td scope="col">063)219-0341</td>
            </tr>
            <tr>
              <td scope="col">인재개발팀</td>
              <td scope="col">063)219-0426</td>
            </tr>
            <tr>
              <td rowspan="3" scope="col">일자리혁신지원센터</td>
              <td scope="col">일자리사업팀</td>
              <td scope="col">063)219-0396</td>
            </tr>
            <tr>
              <td scope="col">전북조선업도약팀</td>
              <td scope="col">063)450-1304</td>
            </tr>
            <tr>
              <td scope="col">익산고용안정팀</td>
              <td scope="col">063)837-0401</td>
            </tr>
            <tr>
              <td rowspan="2" scope="col">우주항공사업부</td>
              <td scope="col">우주개발팀</td>
              <td scope="col">063)219-0354</td>
            </tr>
            <tr>
              <td scope="col">항공개발팀</td>
              <td scope="col">063)219-0358</td>
            </tr>
            <tr>
              <td scope="col">드론사업부</td>
              <td scope="col"></td>
              <td scope="col">063)219-0420</td>
            </tr>
            <tr>
              <td scope="col">스마트제조사업부</td>
              <td scope="col"></td>
              <td scope="col">063)219-0432</td>
            </tr>
            <tr>
              <td rowspan="2" scope="col">경영지원실</td>
              <td scope="col">사업지원팀</td>
              <td scope="col">063)219-0415</td>
            </tr>
            <tr>
              <td scope="col">경영지원팀</td>
              <td scope="col">063)219-0309</td>
            </tr>
            <tbody>
            </tbody>
          </table>
        </div>
        <%--조직도 사원리스트 모바일버전--%>
        <div class="imgMobileList">
          <div class="__tit2 __mt80">
            <h3><strong>부서 연락처</strong></h3>
          </div>
          <table class="__tblList tdfz14 bd1 bg3 respond2 __mt20">
            <caption>주요업무 표</caption>
            <tbody>
            <tr>
              <th scope="col">부서</th>
              <th scope="col">팀</th>
              <th scope="col">연락처</th>
            </tr>
            <tr>
              <td rowspan="2"><strong class="__black __fz18 fwm">미래전략기획본부</strong></td>
              <td><strong class="__black __fz18 fwm">미래전략기획팀</strong></td>
              <td><strong class="__black __fz18 fwm">063)219-0394</strong></td>
            </tr>
            <tr>
            <td><strong class="__black __fz18 fwm">J-밸리혁신팀</strong></td>
            <td><strong class="__black __fz18 fwm">063)219-0383</strong></td>
            </tr>
            <tr>
              <td rowspan="3"><strong class="__black __fz18 fwm">R&BD사업본부</strong></td>
              <td><strong class="__black __fz18 fwm">신기술융합팀</strong></td>
              <td><strong class="__black __fz18 fwm">063)219-0322</strong></td>
            </tr>
            <tr>
              <td><strong class="__black __fz18 fwm">제조혁신팀</strong></td>
              <td><strong class="__black __fz18 fwm">063)219-0371</strong></td>
            </tr>
            <tr>
              <td><strong class="__black __fz18 fwm">복합소재뿌리기술센터</strong></td>
              <td><strong class="__black __fz18 fwm">063)219-0329</strong></td>
            </tr>
            <tr>
              <td rowspan="2"><strong class="__black __fz18 fwm">기업성장지원본부</strong></td>
              <td><strong class="__black __fz18 fwm">창업/기업성장지원팀</strong></td>
              <td><strong class="__black __fz18 fwm">063)219-0341</strong></td>
            </tr>
            <tr>
              <td><strong class="__black __fz18 fwm">인재개발팀</strong></td>
              <td><strong class="__black __fz18 fwm">063)219-0426</strong></td>
            </tr>
            <tr>
              <td rowspan="3"><strong class="__black __fz18 fwm">일자리혁신지원센터</strong></td>
              <td><strong class="__black __fz18 fwm">일자리사업팀</strong></td>
              <td><strong class="__black __fz18 fwm">063)219-0396</strong></td>
            </tr>
            <tr>
              <td><strong class="__black __fz18 fwm">전북조선업도약팀</strong></td>
              <td><strong class="__black __fz18 fwm">063)450-1304</strong></td>
            </tr>
            <tr>
              <td><strong class="__black __fz18 fwm">익산고용안정팀</strong></td>
              <td><strong class="__black __fz18 fwm">063)837-0401</strong></td>
            </tr>
            <tr>
              <td rowspan="2"><strong class="__black __fz18 fwm">우주항공사업부</strong></td>
              <td><strong class="__black __fz18 fwm">우주개발팀</strong></td>
              <td><strong class="__black __fz18 fwm">063)219-0354</strong></td>
            </tr>
            <tr>
              <td><strong class="__black __fz18 fwm">항공개발팀</strong></td>
              <td><strong class="__black __fz18 fwm">063)219-0358</strong></td>
            </tr>
            <tr>
              <td><strong class="__black __fz18 fwm">드론사업부</strong></td>
              <td><strong class="__black __fz18 fwm"></strong></td>
              <td><strong class="__black __fz18 fwm">063)219-0420</strong></td>
            </tr>
            <tr>
              <td><strong class="__black __fz18 fwm">스마트제조사업부</strong></td>
              <td><strong class="__black __fz18 fwm"></strong></td>
              <td><strong class="__black __fz18 fwm">063)219-0432</strong></td>
            </tr>
            <tr>
              <td rowspan="2"><strong class="__black __fz18 fwm">경영지원실</strong></td>
              <td><strong class="__black __fz18 fwm">사업지원팀</strong></td>
              <td><strong class="__black __fz18 fwm">063)219-0415</strong></td>
            </tr>
            <tr>
              <td><strong class="__black __fz18 fwm">경영지원팀</strong></td>
              <td><strong class="__black __fz18 fwm">063)219-0309</strong></td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <jsp:include page="/WEB-INF/jsp/template/camtic/foot.jsp" flush="false"/>
</div>
</body>
</html>