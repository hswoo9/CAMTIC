<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<jsp:include page="/WEB-INF/jsp/template/camtic/common.jsp" flush="false"/>
</head>
<style>
  .area {
    display: flex;
    gap: 20px;
  }

  .area .box {
    width: 0;
    flex-grow: 1;
  }

  .area .box .info {
    border: 1px solid #d7d7d7;
    background: #fff;
    border-radius: 5px;
    padding: 15px 24px 25px;
    margin-top: 12px;
    position: relative;
  }

  .box .info dt {
    font-size: 20px;
    color: #000;
    font-weight: bold;
    letter-spacing: -0.06em;
    line-height: 1.2;
    margin-top: 20px;
  }

  .box .info dd {
    font-size: 14px;
    color: #000;
    line-height: 1.43;
    letter-spacing: -0.05em;
    margin-top: 20px;
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
          <div class="__clu1 mo">
            <dl class="tit">
              <dt><span class="__nm">“</span><span class="mainCapyTitle">메이커들의 상상을 실현하는 곳, 전주드론제작소 윙윙스테이션</span><span class="__nm">”</span></dt>
              <dd><span class="subCapyTitle"><%--전주드론제작소 윙윙- 스테이션--%>
              <img src="/images/camtic/logo-wing.png" alt="" style="height: 50px"></span></dd>
            </dl>
          </div>
          <div class="__space1 m0">
          <dl class="what">
            <dt>전주드론제작소 윙윙스테이션이란?</dt>
            <dd>
              <%--윙윙 - 스테이션은 드론분야 창의·주도적 메이커 활동 활성화를 위한 메이커스페이스로, 국내유일 드론 특화랩입니다.--%>
              윙윙스테이션은 캠틱종합기술원에서 운영하는 메이커스페이스로, 전문 메이커 육성과 메이커 문화 확산을 위해 체계적인 지원을 하고 있습니다.<br>
              윙윙 - 스테이션에서는 혁신적인 아이디어를 자유롭게 창작, 구상, 개조하여 시제품 제작 등 아이디어의 제품화를 실현할 수 있습니다.<br>
              <%--드론·3D프린팅·3D펜 등 다양한 분야의 교육과 체험프로그램을 통해 여러분의 상상을 실현해보시길 바랍니다.--%>
              윙윙스테이션은 2022년 선정된 국내 유일 드론 특화랩이며, 드론 · 3D프린터· 3D펜 등 다양한 메이커 교육과 체험 프로그램을 통해 <br>우수 메이커 발굴에 앞장서고 있습니다.

            </dd>
          </dl>

          <ul class="__flx flx3 gap20 __mt60">
            <li><img src="/images/camtic/img-space1-1-1.png" alt="" style="width: 330px; height: 250px; border-radius: 10px;"></li>
            <li><img src="/images/camtic/img-space1-2-2.png" alt="" style="width: 330px; height: 250px; border-radius: 10px;"></li>
            <li><img src="/images/camtic/img-space1-3-3.png" alt="" style="width: 330px; height: 250px; border-radius: 10px;"></li>
          </ul>

<%--          <div class="__tit2 __mt60">
            <h3><strong>사업개요</strong></h3>
          </div>
          <table class="__tblList tdfz14 bd1 bg2 respond2 __mt20">
            <caption>사업개요 표</caption>
            <tbody>
            <tr>
              <th scope="col">사업명</th>
              <th scope="col">특화·분야</th>
              <th scope="col">전담 기관</th>
            </tr>
            <tr>
              <td><strong class="__black fz18 fwm">메이커 스페이스(특화랩)구축.운영사업</strong></td>
              <td><strong class="__black fz18 fwm">드론 부품 전후방 산업 및 소프트웨어</strong></td>
              <td><strong class="__black fz18 fwm">중소벤처기업부, 창업진흥원</strong></td>
            </tr>
            <tr>
              <th scope="col">참여기관</th>
              <th scope="col">사업수행</th>
              <th scope="col">전담 기관</th>
            </tr>
            <tr>
              <td><strong class="__black fz18 fwm">전주시</strong></td>
              <td><strong class="__black fz18 fwm">(사)캠틱종합기술원</strong></td>
              <td>
                <strong class="__black fz18 fwm">2022년 협약체결일 - 2026년</strong><br>
                <strong class="__black fz14 fwm">(3년 이후 평가를 통해 2년연장)</strong>
              </td>
            </tr>
            <tr>
              <th scope="col" colspan="3">총사업비</th>
            </tr>
            <tr>
              <td colspan="3" class="tal">
                <div class="flx">
                  <div class="lef">
                    <dl>
                      <dt>15억원(국비 9억 , 지방비 6억)</dt>
                      <dd>
                        <ul class="__dotList bar">
                          <li>
                            2022년(1차년도) : 3억원<br>
                            (국비 1.8억,지방비 1.2억)
                          </li>
                        </ul>
                      </dd>
                    </dl>
                  </div>
                  <div class="rig">
                    <table>
                      <caption>총사업비 표</caption>
                      <thead>
                      <tr>
                        <th scope="col">총계</th>
                        <th scope="col">정부보조금</th>
                        <th scope="col">시비 및 현물매칭</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                        <td>300백만원</td>
                        <td>180백만원(60%)</td>
                        <td>
                          120백만원(40%)
                          <em>- 15%현금,25%현물</em>
                        </td>
                      </tr>
                      </tbody>
                    </table>
                    <p>* 현물매칭은 전주첨단벤처단지 본부동 시설 및 기구축 드론장비 활용</p>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="col" colspan="3">사업내용</th>
            </tr>
            <tr>
              <td colspan="3" class="tal pl40">
                <div class="bot">
                  <dl>
                    <dt>메이커 스페이스 구축</dt>
                    <dd>
                      <ul class="__dotList bar">
                        <li>일반인(메이커)이 자유롭게 활용가능한 공간 구축</li>
                        <li>지역 내 일반인 및 예비창업자들이 드론과 관련된 다양한 부품 및 소프트웨어 개발 활동에 대한 능동적인 지원</li>
                      </ul>
                    </dd>
                  </dl>
                  <dl>
                    <dt>메이커 관련 교육 및 행사 운영</dt>
                    <dd>
                      <ul class="__dotList bar">
                        <li>드론관련 메이커 육성을 위한 프로그램 운영</li>
                        <li>드론 부품 및 소프트웨어 제작관련 교육과 프로그램 운영을 통한 예비창업자 육성 및 메이커 저변 확대</li>
                      </ul>
                    </dd>
                  </dl>
                </div>
              </td>
            </tr>
            </tbody>
          </table>--%>


        <%--<div class="__tit1 __mt100 __mb20">
          <h3><strong>전주드론제작소 윙윙 - 스테이션</strong> ( Wing-Wing Station )</h3>
        </div>
        <div class="__space2">
          <ul class="__flx flx2 gap30">
            <li>
              <div class="__icoBox">
                <div class="ico"><span><img src="/images/camtic/ico-space2-1.png" alt=""></span></div>
                <h5>사업내용</h5>
                <div class="__fz18 __black">
                  메이커 스페이스 전주 드론제작소 시설 및 장비활용 공간구축
                </div>
                <div class="__fz18 __black __mt10">
                  메이커 단계별 교육, 장비지원 등을 통한 우수메이커 육성
                </div>
              </div>
            </li>
            <li>
              <div class="__icoBox">
                <div class="ico"><span><img src="/images/camtic/ico-space2-2.png" alt=""></span></div>
                <h5>구축위치</h5>
                <div class="__fz18 __black __mt10">
                  전주첨단벤처단지 1동(구.본부동) 1층 전체(422㎥) 활용 구축
                </div>
                <div class="__fz14 __black __mt5 fws">
                  -  메이커프로그램 운영실, 장비 및 가공공간, 교육장 및 장비 구축
                </div>
              </div>
            </li>
          </ul>
          <ul class="__flx jcsb __mt60">
            <li><img src="/images/camtic/img-space3-1.jpg" alt=""></li>
            <li><img src="/images/camtic/img-space3-2.jpg" alt=""></li>
          </ul>
        </div>--%>

        <%--<div class="__tit1 __mt100 __mb20">
          <h3><strong>윙윙스테이션의 운영전략</strong></h3>
        </div>
        <div class="__vision1 type2">
          &lt;%&ndash;<dl class="head">
            <dt>직원과 함께 성장하는 행복한 일터</dt>
            <dd>전주 드론제작소 윙윙 -스테이션</dd>
          </dl>&ndash;%&gt;
          <div class="area" style="margin-top: 20px;">
            <dl class="box box1">
              <dt><span>미션</span></dt>
              <dd>드론분야 창의·주도적 메이커 활동 활성화</dd>
            </dl>
            <dl class="box box5">
              <dt><span>비젼·성과목표</span></dt>
              <dd>
                <dl>
                  <dt>상상실현 전주드론제작소 윙윙-스테이션</dt>
                  <dd>
                    <ul>
                      <li><span class="fws">당해목표 :</span> 메이커 교육 및 체험 20회 /  네트워킹 4회 / 우수메이커발굴 10명 / 메이커 홍보 20회 / 신규창업 3개사</li>
                      <li><span class="fws">증기목표 :</span> 전문메이커 60명 육성, Maker to Market 제품개발 6건,창업연계 20개사</li>
                    </ul>
                  </dd>
                </dl>
              </dd>
            </dl>
            <dl class="box box2">
              <dt><span>추진전략</span></dt>
              <dd>
                <ul>
                  <li><span>선택·집중·확산</span></li>
                  <li><span>수요기반</span></li>
                  <li><span>사용자 역량기반</span></li>
                  <li><span>연계·협력 및 제조창업지원</span></li>
                  <li><span>개방형 공간</span></li>
                </ul>
              </dd>
            </dl>
            <dl class="box box6">
              <dt><span>핵심과제</span></dt>
              <dd>
                <ul>
                  <li>
                    <ul class="__dotList bar">
                      <li>타켓고객 집중</li>
                      <li>메이커 맞춤형 홍보</li>
                      <li>우수 메이커 발굴</li>
                      <li>드론 메이커톤</li>
                    </ul>
                  </li>
                  <li>
                    <ul class="__dotList bar">
                      <li>드론용도별 맞춤 (HW,SW)교육</li>
                      <li>Zero to Maker중심</li>
                      <li>탄소/수소/D.N.A</li>
                    </ul>
                  </li>
                  <li>
                    <ul class="__dotList bar">
                      <li>수준별 프로그램</li>
                      <li>상황별시설/장비교육</li>
                      <li>CRM활용 교육생관리</li>
                      <li>기술정보 상시제공</li>
                    </ul>
                  </li>
                  <li>
                    <ul class="__dotList bar">
                      <li>연계 : 보유기술 / 장비 / 시설</li>
                      <li>협력 : 지역메이커스 / 외부기관</li>
                    </ul>
                  </li>
                  <li>
                    <ul class="__dotList bar">
                      <li>개방형장비/시설구축</li>
                      <li>저렴한 장비이용료</li>
                      <li>온라인 예약시스템</li>
                      <li>편리한 이용시간</li>
                    </ul>
                  </li>
                </ul>
              </dd>
            </dl>
            <dl class="box box4">
              <dt><span>단계별 운영전략</span></dt>
              <dd>
                <ul>
                  <li>
                    <h4>Zero to ldea</h4>
                    <dl>
                      <dt>
                        메이커 입문단계<br>
                        (메이커 관심고객)
                      </dt>
                      <dd class="hide"></dd>
                    </dl>
                  </li>
                  <li>
                    <h4>ldea to Maker</h4>
                    <dl>
                      <dt>
                        초급 메이커 단계<br>
                        (메이커 유경험자)
                      </dt>
                      <dd class="hide"></dd>
                    </dl>
                  </li>
                  <li>
                    <h4>Maker to Maker</h4>
                    <dl>
                      <dt>
                        중급 메이커 단계<br>
                        (초급 메이커)
                      </dt>
                      <dd class="hide"></dd>
                    </dl>
                  </li>
                  <li class="tac">
                    <p>
                      <strong>Maker to Maker</strong><br>
                      고급 메이커 단계<br>
                      (중급 메이커)
                    </p>
                  </li>
                </ul>
              </dd>
            </dl>
          </div>
        </div>--%>

        <div class="__tit1 __mt100 __mb20">
          <h3><strong>윙윙스테이션 장비종류</strong></h3>
        </div>
            <div class="area">

              <div class="box">
                <div class="info _row">
                  <img src="/images/camtic/img-spacemc1.jpg" alt="" style="width: 193px; height: 193px;">
                  <dl>
                    <dt>3D프린터</dt>
                    <dd>
                      <ul>
                        <li><strong style="margin-right: 16px;">모델명</strong>Style-220C</li>
                        <li><strong style="margin-right: 16px;">제작사</strong>CUBICON</li>
                        <li><strong style="margin-right: 6px;">설치장소</strong>드론제작소 1층 3D프린팅실</li>
                      </ul>
                    </dd>
                  </dl>
                </div>
              </div>

              <div class="box">
                <div class="info _row">
                  <img src="/images/camtic/img-spacemc2.jpg" alt="" style="width: 193px; height: 193px;">
                  <dl>
                    <dt>3D프린터(Neo)</dt>
                    <dd>
                      <ul>
                        <li><strong style="margin-right: 16px;">모델명</strong>Style NEO-A31C</li>
                        <li><strong style="margin-right: 16px;">제작사</strong>CUBICON</li>
                        <li><strong style="margin-right: 6px;">설치장소</strong>드론제작소 1층 3D프린팅실</li>
                      </ul>
                    </dd>
                  </dl>
                </div>
              </div>

              <div class="box">
                <div class="info _row">
                  <img src="/images/camtic/img-spacemc3.jpg" alt="" style="width: 193px; height: 193px;">
                  <dl>
                    <dt>3D스캐너</dt>
                    <dd>
                      <ul>
                        <li><strong style="margin-right: 16px;">모델명</strong> CR-Scan 01</li>
                        <li><strong style="margin-right: 16px;">제작사</strong> Creality 3D</li>
                        <li><strong style="margin-right: 4px;">설치장소</strong> 드론제작소 1층 3D프린팅실</li>
                      </ul>
                    </dd>
                  </dl>
                </div>
              </div>

              <div class="box">
                <div class="info _row">
                  <img src="/images/camtic/img-spacemc4.jpg" alt="" style="width: 193px; height: 193px;">
                  <dl>
                    <dt>매빅 PRO 2</dt>
                    <dd>
                      <ul>
                        <li><strong style="margin-right: 16px;">모델명</strong> </li>
                        <li><strong style="margin-right: 16px;">제작사</strong> </li>
                        <li><strong style="margin-right: 6px;">설치장소</strong> </li>
                      </ul>
                    </dd>
                  </dl>
                </div>
              </div>


            </div>

        <div class="__tit1 __mt100 __mb20">
          <h3><strong>윙윙스테이션 공간 소개</strong></h3>
        </div>
            <%--<div class="area">
              <div class="box">
                <div class="info _row">
                  <img src="/images/camtic/img-spacemc5.jpg" alt="" style="width: 193px; height: 193px;">
                  <dl>
                    <dt>상담실</dt>
                    <dd>
                      <ul>
                        <li>드론 및 장비 대여 관련 문의나 교육 및 체험 프로그램에 관해 <br>자유로운 상담을 진행하고 있습니다.</li>
                      </ul>
                    </dd>
                  </dl>
                </div>
              </div>

              <div class="box">
                <div class="info _row">
                  <img src="/images/camtic/img-spacemc6.jpg" alt="" style="width: 193px; height: 193px;">
                  <dl>
                    <dt>메이커실</dt>
                    <dd>
                      <ul>
                        <li>넓은 공간으로 실내에서 소형 드론을 비행해 보는 등 다양한 메이커 활동을 수행할 수 있습니다.</li>
                      </ul>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>--%>

            <div class="__space3" style="padding: 20px 127px 10px;">
              <img src="/images/camtic/spaceMap.png" alt="">
            </div>

            <div class="area">
              <div class="box">
                <div class="info _row" style="padding: 0px;">
                  <img src="/images/camtic/img-spacemc7.jpg" alt="" style="width: 193px; height: 193px;">
                  <dl style="padding: 0px 10px 20px;">
                    <dt>전산 교육실</dt>
                    <dd>
                      <ul>
                        <li>3D모델링 프로그램, 영상편집 프로그램 등이 <br>설치되어 있어 다양한 전산 교육이 수행되고 있습니다.</li>
                      </ul>
                    </dd>
                  </dl>
                </div>
              </div>

              <div class="box">
                <div class="info _row" style="padding: 0px;">
                  <img src="/images/camtic/img-spacemc6.jpg" alt="" style="width: 193px; height: 193px;">
                  <dl style="padding: 0px 10px 20px;">
                    <dt>메이커실</dt>
                    <dd>
                      <ul>
                        <li>넓은 공간으로 실내에서 소형 드론을 비행해 보는 등 <br>다양한 메이커 활동을 수행할 수 있습니다.</li>
                      </ul>
                    </dd>
                  </dl>
                </div>
              </div>

              <div class="box">
                <div class="info _row" style="padding: 0px;">
                  <img src="/images/camtic/img-spacemc5.jpg" alt="" style="width: 193px; height: 193px;">
                  <dl style="padding: 0px 10px 20px;">
                    <dt>상담실</dt>
                    <dd>
                      <ul>
                        <li>드론 및 장비 대여 관련 문의나 교육 및 체험 프로그램에 관해 <br>자유로운 상담을 진행하고 있습니다.</li>
                      </ul>
                    </dd>
                  </dl>
                </div>
              </div>

            <%--  <div class="box">
                <div class="info _row" style="padding: 0px;">
                  <img src="/images/camtic/img-spacemc7.jpg" alt="" style="width: 193px; height: 193px;">
                  <dl style="padding: 0px 10px 20px;">
                    <dt>전산 교육실</dt>
                    <dd>
                      <ul>
                        <li>3D모델링 프로그램, 영상편집 프로그램 등이 <br>설치되어 있어 다양한 전산 교육이 수행되고 있습니다.</li>
                      </ul>
                    </dd>
                  </dl>
                </div>
              </div>--%>

              <div class="box">
                <div class="info _row" style="padding: 0px;">
                  <img src="/images/camtic/img-spacemc8.jpg" alt="" style="width: 193px; height: 193px;">
                  <dl style="padding: 0px 10px 20px;">
                    <dt>장비실</dt>
                    <dd>
                      <ul>
                        <li>공구 세트, 인두기, 매빅PRO2 등 다양한 메이커 활동에 필요한 장비를 구축하고 있습니다.</li>
                      </ul>
                    </dd>
                  </dl>
                </div>
              </div>

              <div class="box">
                <div class="info _row" style="padding: 0px;">
                  <img src="/images/camtic/img-spacemc9.jpg" alt="" style="width: 193px; height: 193px;">
                  <dl style="padding: 0px 10px 20px;">
                    <dt>3D프린팅실</dt>
                    <dd>
                      <ul>
                        <li>중고급형 3D프린터 10대, <br>고급형 3D프린터 1대, <br>소형 3D스캐너 2대를 보유하고 있으며 <br>시제품 제작 등 메이커 활동을 수행할 수 있습니다.</li>
                      </ul>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>



        <div class="__tit1 __mb20 __mt100">
          <h3 style="border-bottom: 1px dashed #b7b7b7; padding:30px 0;"><strong>윙윙스테이션 이용방법</strong></h3>
        </div>

        <div class="__space3">

          <%--<div class="item">
            &lt;%&ndash;<div class="ico"><span><img src="/images/camtic/ico-drone2-1.png" alt=""></span></div>&ndash;%&gt;
            <dl class="tit">
              <dt>메이커스페이스</dt>
              <dd>장비이용안내</dd>
            </dl>
            <div class="info">
              <ul class="__dotList bar">
                <li>장비안내 메이커스페이스 장비는 홈페이지 예약을 통해 사전 신청 후 이용 가능합니다.</li>
                <li>이용대상자 범위 : 안전한 장비 사용을 위한 자체 기준임을 참고 부탁드립니다.</li>
              </ul>
            </div>
          </div>

          <div class="use __mt40">
            <div class="box">
              <dl>
                <dt><span>장비이용 해봤어요</span></dt>
                <dd>
                  드론윙윙제작소 메이커스페이스<br class="__p">
                  사용 경험이 있는 자
                </dd>
              </dl>
              <div class="arr"><i></i></div>
              <p>사전 신청 후 이용 가능</p>
            </div>
            <div class="box">
              <dl>
                <dt><span>써볼래요</span></dt>
                <dd>
                  기타 다른 메이커스페이스 또는<br class="__p">
                  디지털 장비 사용 경험이 있는자
                </dd>
              </dl>
              <div class="arr"><i></i></div>
              <p>이용 전 안내 필요</p>
            </div>
            <div class="box">
              <dl>
                <dt><span>처음이에요</span></dt>
                <dd>
                  디지털 장비 사용<br class="__p">
                  경험이 없는 자
                </dd>
              </dl>
              <div class="arr"><i></i></div>
              <p>교육이수 혹은 안내 후 사용가능</p>
            </div>
          </div>--%>

         <%-- <div class="item __mt80">--%>
          <div class="item">
            <%--<div class="ico"><span><img src="/images/camtic/ico-space2-1.png" alt=""></span></div>--%>
            <dl class="tit">
              <dt>메이커스페이스</dt>
              <dd>장비이용방법</dd>
            </dl>
            <div class="info">
              <ul class="__dotList bar">
                <li>이용 가능 시간과 일자는 일정표로 확인할 수 있습니다.</li>
                <li>당일 예약은 불가오니 꼭 사전 예약 신청해주세요.</li>
              </ul>
            </div>
          </div>
          <div class="use2 __mt30">
            <div class="box">
              <dl>
                <dt><span>01</span></dt>
                <dd>홈페이지 예약을 통해 장비 이용신청</dd>
              </dl>
            </div>
            <div class="box">
              <dl>
                <dt><span>02</span></dt>
                <dd>관리자 승인 후 예약 확정 안내</dd>
              </dl>
            </div>
            <div class="box">
              <dl>
                <dt><span>03</span></dt>
                <dd>메이커스페이스 장비이용 후 사후정리</dd>
              </dl>
            </div>
          </div>

          <%--<div class="item __mt80">--%>
          <div class="item" __mt30>
            <%--<div class="ico"><span><img src="/images/camtic/ico-space2-1.png" alt=""></span></div>--%>
           <%-- <dl class="tit">
              <dt>메이커스페이스</dt>
              <dd>교육안내</dd>
            </dl>
            <div class="info">
              <ul class="__dotList bar">
                <li>교육안내 : 월별 교육일정에 따라 홈페이지를 통해 선착순 신청 후 교육 가능합니다.</li>
                <li>교육대상자 : 초.중.고 일반인(각 커리큘림마다 상이할 수 있음)</li>
                <li>교육커리큘럼 : 교육 안내사항을 참고해주세요</li>
              </ul>--%>

              <div class="use3">
                <a href="http://maker.camtic.or.kr/main/" target="_blank"><strong>전주드론제작소 - 윙윙스테이션</strong> 바로가기</a>
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