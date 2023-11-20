<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<style>
  .__pop-basic .bg{
    cursor: pointer;
    background: rgba(0,0,0,0.5);
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }
  .__pop-basic .title{
    padding: 20px;
    position: relative;
    background: #333;
  }
  .__pop-basic .desc{
    padding: 20px;
    font-size: 15px;
    letter-spacing: -0.05em;
    line-height: 1.6em;
    max-height: 60vh;
    overflow: auto;
  }
  .fit{
    z-index: 100;
    background: #fff;
    border: 0.1rem solid #777;
    box-shadow: 0 0.5rem 0.5rem rgba(0,0,0,0.2);
    padding: 3rem;
    width: 104.6rem;
  }
  .cls{
    width: 5rem;
    height: 5rem;
    position: absolute;
    right: 0;
    top: 0;
    border: none;
    background: none;
    font-size: 2rem;
    color: #000;
  }
  .txt{
    font-size: 15px;
    line-height: 1.6em;
  }
  @media (max-width: 1024px){
    .p_size {
      max-width: 80% !important;
      left: 10% !important;
    }
  }
</style>
<!--<div id="fam"> 이사님 요청으로 하단 배너 숨김
  <div class="inner">
    <div class="cont">
      <button type="button" class="prev"><span class="hide">PREV</span><i class="axi axi-angle-left" aria-hidden="true"></i></button>
      <button type="button" class="auto"><span class="hide">PLAY</span><i class="axi axi-pause2" aria-hidden="true"></i></button>
      <button type="button" class="next"><span class="hide">NEXT</span><i class="axi axi-angle-right" aria-hidden="true"></i></button>
    </div>
    <div class="roll">
      <div class="swiper-wrapper">
        <div class="swiper-slide"><img src="https://fakeimg.pl/200x60" alt=""></div>
        <div class="swiper-slide"><img src="https://fakeimg.pl/180x60" alt=""></div>
        <div class="swiper-slide"><img src="https://fakeimg.pl/220x60" alt=""></div>
        <div class="swiper-slide"><img src="https://fakeimg.pl/160x60" alt=""></div>
        <div class="swiper-slide"><img src="https://fakeimg.pl/200x60" alt=""></div>
        <div class="swiper-slide"><img src="https://fakeimg.pl/180x60" alt=""></div>
        <div class="swiper-slide"><img src="https://fakeimg.pl/220x60" alt=""></div>
        <div class="swiper-slide"><img src="https://fakeimg.pl/160x60" alt=""></div>
        <div class="swiper-slide"><img src="https://fakeimg.pl/200x60" alt=""></div>
        <div class="swiper-slide"><img src="https://fakeimg.pl/180x60" alt=""></div>
        <div class="swiper-slide"><img src="https://fakeimg.pl/220x60" alt=""></div>
        <div class="swiper-slide"><img src="https://fakeimg.pl/160x60" alt=""></div>
      </div>
    </div>
  </div>
</div>-->

<footer id="footer">
  <div class="top">
    <div class="inner">
      <ul class="fnb">
        <li><a href="/camtic/etc/privacy.do" onclick="fn_wrap1(); return false;">개인정보처리방침</a></li>
        <%--<li><a href="#" onclick="fn_wrap2(); return false;">이용약관</a></li>--%>
        <li><a href="#" onclick="fn_wrap3(); return false;">이메일무단수집거부</a></li>
        <li><a href="/camtic/about/location.do">찾아오시는 길</a></li>
        <li><a href="/camtic/pr/news_subscribe.do?category=news">뉴스레터 구독</a></li>
      </ul>
      <%--<div class="rig">
        <div class="site">
          <button type="button">패밀리사이트<i aria-hidden="true"></i></button>
          <ul>
            <li><a href="#">패밀리사이트1</a></li>
            <li><a href="#">패밀리사이트2</a></li>
            <li><a href="#">패밀리사이트3</a></li>
            <li><a href="#">패밀리사이트4</a></li>
            <li><a href="#">패밀리사이트5</a></li>
          </ul>
        </div>
        <div class="site">
          <button type="button">관련사이트<i aria-hidden="true"></i></button>
          <ul>
            <li><a href="#">관련사이트1</a></li>
            <li><a href="#">관련사이트2</a></li>
            <li><a href="#">관련사이트3</a></li>
            <li><a href="#">관련사이트4</a></li>
            <li><a href="#">관련사이트5</a></li>
          </ul>
        </div>
      </div>--%>
      <button type="button" class="gotop _gotop"><i class="axi axi-caret-up" aria-hidden="true"></i><span>TOP</span></button>
    </div>
  </div>
  <div class="bot">
    <div class="inner">
      <h1>캠틱종합기술원</h1>
      <div class="info">
        <ul>
          <li>54852 전라북도 전주시 덕진구 유상로 67 전주첨단벤처단지</li>
          <li>TEL. <span>063-219-0300</span></li>
          <li>FAX. 063-219-0303</li>
        </ul>
        <ul>
          <li>Copyrightⓒ CAMTIC All rights reserved.</li>
        </ul>
      </div>
      <p class="copy">
        CAMTIC Advanced Mechatronics Technology Institute<br>
        for Commercialization
      </p>
    </div>
  </div>


  <div class="__pop-basic _pop-ajax wrap1" style="display:none;">
    <div class="fit inner p_size" style="width:1280px; top:120px; position:fixed; left:17%;">
      <div class="title" style="background-color: white; border-bottom:2px solid black;">
        <h3 style="color: black;font-weight: 500;font-size: 25px;">개인정보처리방침</h3>
        <button type="button" class="pop-close _close cls" onclick="fn_wrap1Hiding(); return false;"><%--<i class="ri-close-line"></i>--%>x</button>
      </div>
      <div class="desc" style="font-size: 15px; color: #666;">
        <div class="__privacy" style="font-size: 15px; color: #666;">
          <div class="fwn">
            본 처리지침은 회원의 개인정보 보호를 위해 법인에서 취하고 있는 보안 및 개인 정보 수집의 목적 및 이용에 관한 내용입니다.
          </div>
          <div class="__mt15">
            저희 법인의 회원 개인정보 보호정책은 2007년 1월 1일부터 최초로 시행하여 지속적으로 갱신 하하고 있으며, 정부의 법률 및 지침에 따라 변경될 수 있으므로 수시로 그 내용을 확인하여 주시기
            바라오며 이에 대한 문의 사항은 전화(063.219.0300)나 이메일(camtic@camtic.or.kr)을 통하여 수시로 받고 있으며 이를 적극 반영하도록 노력하겠습니다.
          </div>

          <br>
          <p class="sub-tit" style="font-weight: bold;font-size: 17px;">제1조(목적)</p>
          <br>
          <div>
            이 지침은 사단법인 캠틱종합기술원(이하 "법인")의 사업 및 서비스 이용자에 대한 개인정보 보호 및 권익을 보호하고 개인정보와 관련한 이용자의 고충을 원활하게 처리할 수 있도록 규정함을
            목적으로 합니다.
          </div>

          <br>
          <p class="sub-tit" style="font-weight: bold;font-size: 17px;">제2조(적용)</p>
          <br>
          <div>
            이 지침은 현행 「개인정보보호법」및「표준 개인정보 보호지침」에 근거를 두며, 법인에서 운용하는 모든 웹사이트와 전자적 형태의 개인정보파일 및 수기 형태의 개인정보파일에 적용합니다.
          </div>

          <div class="gray __mt20">
            <h3>법인에서 운용하고 있는 웹사이트</h3>
            <div>
              <p>- 법인 홈페이지 (<a href="http://www.camtic.or.kr/camtic/intro.html" target="_blank" style="font-size: 15px; line-height: 1.6em;">www.camtic.or.kr</a>)</p>
              <p class="mt5">- 상품화지원센터 홈페이지 (<a href="http://www.camtic.co.kr/CAMTIC/Development/Development00" target="_blank" style="font-size: 15px; line-height: 1.6em;">www.camtic.co.kr</a>)</p>
              <p class="mt5">- 인재개발지원 홈페이지 (<a href="http://edu.camtic.or.kr/HRD/index.aspx" target="_blank" style="font-size: 15px; line-height: 1.6em;">edu.camtic.or.kr</a>)</p>
              <p class="mt5">- 전주벤처기업육성촉진지구발전협의회 홈페이지 (<a href="http://www.jvada.or.kr/" target="_blank" style="font-size: 15px; line-height: 1.6em;">www.jvada.or.kr</a>)</p>
            </div>
          </div>

          <br>
          <p class="sub-tit" style="font-weight: bold;font-size: 17px;">제3조(개인정보의 처리 목적)</p>
          <br>
          <div>
            법인는 개인정보를 다음의 목적을 위해 처리하며, 처리한 개인정보는 다음의 목적 이외의 용도로는 사용하지 않으며 이용 목적이 변경될 시에는 사전 동의를 구할 것입니다.<br>
            <br>
            ① 홈페이지 회원가입 및 관리<br>
            회원 가입의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증, 회원자격 유지·관리, 제한적 본인확인제 시행에 따른 본인확인, 서비스 부정이용 방지, 만14세 미만 아동 개인정보 수집 시 법정<br>
            대리인 동의 여부 확인, 각종 고지·통지, 고충처리, 분쟁 조정을 위한 기록 보존 등을 목적으로 개인정보를 처리합니다.<br>
            ② 민원사무 처리<br>
            민원인의 신원 확인, 민원사항 확인, 사실조사를 위한 연락·통지, 처리결과 통보 등을 목적으로 개인정보를 처리합니다.<br>
            ③ 재화 또는 서비스 제공<br>
            교육훈련·연구개발·개발사업·창업보육·정보유통 참여 및 서비스 제공 등 각종 맞춤 서비스 제공, 본인인증, 요금결제·정산 등을 목적으로 개인정보를 처리합니다.<br>
            ④ 정보제공 및 홍보<br>
            교육 및 행사 안내, 사업안내·수요조사 등의 정보제공, 개발사업 참여에 대한 홍보, 소식지·경영뉴스레터 등의 정보제공·홍보 활용을 목적으로 개인정보를 처리합니다.<br>
            ⑤ 개인영상정보<br>
            범죄의 예방 및 수사, 시설안전 및 화재예방, 교통단속, 교통정보의 수집·분석 및 제공 등을 목적으로 개인정보를 처리합니다.
          </div>

          <br>
          <p class="sub-tit" style="font-weight: bold;font-size: 17px;">제5조(개인정보의 제3자 제공에 관한 사항)</p>
          <br>
          <div>
            법인는 법령의 규정과 정보주체의 동의를 통해 개인정보를 수집·보유하며 수집항목 및 처리방법은 다음과 같습니다.<br>
            <br>
            ① 정보주체로부터 별도의 동의를 받은 경우<br>
            ② 법률에 특별한 규정이 있거나 법령상 의무를 준수하기 위하여 불가피한 경우<br>
            ③ 정보주체 또는 그 법정대리인이 의사표시를 할 수 없는 상태에 있거나 주소불명 등으로 사전 동의를 받을 수 없는 경우로서 명백히 정보주체 또는 제3자의 급박한 생명, 신체, 재산의 이익을 위하여 필요하다고 인정되는 경우<br>
            ④ 다음 각 호의 어느 하나에 해당하는 경우에는 정보주체 또는 제3자의 이익을 부당하게 침해할 우려가 있을 때를 제외하고는 이용자의 개인정보를 목적 외의 용도로 이용하거나 이를 제3자에게 제공<br>
            <br>
            가. 정보주체로부터 별도의 동의를 받은 경우<br>
            나. 다른 법률에 특별한 규정이 있는 경우<br>
            다. 정보주체 또는 그 법정대리인이 의사표시를 할 수 없는 상태에 있거나 주소불명 등으로 사전 동의를 받을 수 없는 경우로서 명백히 정보주체 또는 제3자의 급박한 생명, 신체, 재산의 이익을 위하여 필요하다고 인정되는 경우<br>
            라. 통계작성 및 학술연구 등의 목적을 위하여 필요한 경우로서 특정 개인을 알아볼 수 없는 형태로 개인정보를 제공하는 경우<br>
            마. 개인정보를 목적 외의 용도로 이용하거나 이를 제3자에게 제공하지 아니하면 다른 법률에서 정하는 소관 업무를 수행할 수 없는 경우로서 보호위원회의 심의·의결을 거친 경우<br>
            바. 조약, 그 밖의 국제협정의 이행을 위하여 외국정부 또는 국제기구에 제공하기 위하여 필요한 경우<br>
            사. 범죄의 수사와 공소의 제기 및 유지를 위하여 필요한 경우<br>
            아. 법원의 재판업무 수행을 위하여 필요한 경우<br>
            자. 형(刑) 및 감호, 보호처분의 집행을 위하여 필요한 경우
          </div>

          <br>
          <p class="sub-tit" style="font-weight: bold;font-size: 17px;">제6조(정보주체의 권리, 의무 및 그 행사방법)</p>
          <br>
          <div>
            이용자는 개인정보주체로서 다음과 같은 권리를 행사할 수 있습니다.<br>
            <br>
            ① 정보주체는 법인에 대해 언제든지 다음의 개인정보 보호 관련 권리를 행사할 수 있습니다.<br>
            <br>
            가. 개인정보 열람요구<br>
            나. 오류 등이 있을 경우 정정 요구<br>
            다. 삭제요구<br>
            라. 처리정지 요구<br>
            <br>
            ② 제1항에 따른 권리 행사는 법인에 대해 개인정보 보호법에 의거하여 서면, 전자우편, 팩스 등을 통하여 요구 할 수 있으며 법인는 이에 대해 지체 없이 조치할 것 입니다.<br>
            ③ 정보주체가 개인정보의 오류 등에 대한 정정 또는 삭제를 요구한 경우에는 법인는 정정 또는 삭제를 완료할 때까지 당해 개인정보를 이용하거나 제공하지 않습니다.<br>
            ④ 제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 할 수 있습니다.
          </div>

          <br>
          <p class="sub-tit" style="font-weight: bold;font-size: 17px;">제7조(개인정보의 파기)</p>
          <br>
          <div>
            법인는 원칙적으로 개인정보 처리목적이 달성된 경우에는 지체없이 해당 개인정보를 파기한다. 파기의 절차, 기한 및 방법은 다음과 같습니다.<br>
            <br>
            ① 파기절차<br>
            이용자가 입력한 정보는 목적 달성 후 별도의 DB에 옮겨져(종이의 경우 별도의 서류) 내부 지침 및 기타 관련 법령에 따라 일정기간 저장한 후 혹은 즉시 파기한다. 이 때, DB로 옮겨진 개인정보는
            법률에 의한 경우가 아니고서는 다른 목적으로 이용하지 아니합니다.<br>
            ② 파기기한<br>
            이용자의 개인정보는 개인정보의 보유기간이 경과된 경우에는 보유기간의 종료일로부터 5일 이내에, 개인정보의 처리 목적 달성, 해당 서비스의 폐지, 사업의 종료 등 그 개인정보가 불필요하게
            되었을 때에는 개인정보의 처리가 불필요한 것으로 인정되는 날로부터 5일 이내에 그 개인정보를 파기합니다.<br>
            ③ 파기방법<br>
            전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용해야 한다. 종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다.
          </div>

          <br>
          <p class="sub-tit" style="font-weight: bold;font-size: 17px;">제8조(개인정보의 안전성 확보 조치)</p>
          <br>
          <div>
            법인는 다음과 같이 안전성 확보에 필요한 기술적/관리적 및 물리적 조치를 할 것입니다.<br>
            <br>
            ① 개인정보 취급 직원의 최소화 및 교육실시<br>
            개인정보를 취급하는 직원을 지정하고 그 수를 한정시켜 최소화, 또한 개인정보 취급직원은 주기적으로 안정성 확보를 위한 교육을 실시<br>
            ② 내부관리계획의 수립 및 시행<br>
            법인는 개인정보의 안전한 처리를 위하여 내부관리계획을 수립하여 시행<br>
            ③ 개인정보의 암호화<br>
            이용자의 개인정보 중 비밀번호는 암호화하여 저장 및 관리하고, 중요한 데이터는 파일 및 전송 데이터를 암호화 하거나 파일 잠금 기능을 사용하는 등의 별도 보안기능을 사용<br>
            ④ 해킹 등에 대비한 기술적 대책<br>
            법인는 해킹이나 컴퓨터 바이러스 등에 의한 개인정보 유출 및 훼손을 막기 위하여 보안프로그램을 설치하고 주기적인 갱신·점검을 하며 외부로부터 접근이 통제된 구역에 시스템을 설치하고 기술적/물리적으로 감시 및 차단<br>
            ⑤ 개인정보에 대한 접근 제한<br>
            개인정보를 처리하는 데이터베이스시스템에 대한 접근권한의 부여·변경·말소를 통하여 개인정보에 대한 접근통제를 위하여 필요한 조치를 하고 침입차단시스템을 이용하여 외부로부터의 무단 접근을 통제<br>
            ⑥ 접속기록의 보관 및 위변조 방지<br>
            개인정보처리시스템에 접속한 기록을 최소 6개월 이상 보관, 관리하며 접속 기록이 위변조 및 도난, 분실되지 않도록 보안기능 사용<br>
            ⑦ 문서보안을 위한 잠금장치 사용<br>
            개인정보가 포함된 서류, 보조저장매체 등을 안전한 장소에 보관
          </div>

          <br>
          <p class="sub-tit" style="font-weight: bold;font-size: 17px;">제9조(개인정보 보호책임자)</p>
          <br>
          <div>
            ① 법인는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정합니다.<br>
            <br>
            가. 개인정보 보호책임자<br>
            - 성 명 : 노상흡<br>
            - 직 책 : 본부장<br>
            - 연락처 : 063-219-0339, camtic@camtic.or.kr, FAX)063-219-0303<br>
            나. 개인정보 보호 담당부서<br>
            - 부서명 : 사무국<br>
            - 담당자 : 김종대, 신재경<br>
            - 연락처 : 063-219-0339, jdkim@camtic.or.kr, FAX)063-219-0303<br>
            <br>
            ② 정보주체가 법인의 서비스(또는 사업)을 이용하면서 발생한 모든 개인정보 보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보 보호책임자 및 담당부서로 문의할 수 있습니다.
            법인은 정보주체의 문의에 대해 지체 없이 답변 및 처리할 것입니다.
          </div>

          <br>
          <p class="sub-tit" style="font-weight: bold;font-size: 17px;">제10조(영상정보처리기기 설치·운영)</p>
          <br>
          <div>
            법인는 전주첨단벤처단지 및 법인의 시설안전, 화재예방, 범죄예방, 교통단속 등을 목적으로 영상정보처리기기를 설치·운영합니다.<br>
            <br>
            ① 영상정보처리기기의 설치 근거 및 설치 목적<br>
            본 법인는 개인정보보호법 제25조 제1항에 따라 다음과 같은 목적으로 영상정보처리기기를 설치·운영<br>
            - 전주첨단벤처단지 및 법인의 시설안전 및 화재 예방<br>
            - 전주첨단벤처단지 및 법인 내의 범죄 예방<br>
            - 전주첨단벤처단지의 교통단속<br>
            ② 설치 대수, 설치 위치 및 촬영범위<br>
            설치대수 설치 위치 및 촬영 범위<br>
            29대 전주첨단벤처단지 입구, 주차장, 쓰레기처리장, 건물로비/복도, 지역혁신관, 교육실 등<br>
            ③ 관리책임자 및 접근권한자<br>
            개인의 영상정보를 보호하고 개인영상정보와 관련한 불만을 처리하기 위하여 아래와 같이 개인영상정보 보호책임자를 지정합니다.
          </div>
          <table class="__mt15">
            <caption>영상정보처리기기 설치·운영 정보 테이블</caption>
            <thead>
            <tr>
              <th scope="col">구분</th>
              <th scope="col">이름</th>
              <th scope="col">직위</th>
              <th scope="col">소속</th>
              <th scope="col">연락처</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <th scope="row">관리책임자</th>
              <td>노상흡</td>
              <td>본부장</td>
              <td>캠틱종합기술원</td>
              <td>063-219-0300</td>
            </tr>
            <tr>
              <th scope="row">관리권한자</th>
              <td>김종대</td>
              <td>과장</td>
              <td>캠틱종합기술원</td>
              <td>063-219-0339</td>
            </tr>
            <tr>
              <th scope="row">관리권한자</th>
              <td>경비실</td>
              <td>경비원</td>
              <td>캠틱종합기술원</td>
              <td>063-219-0430</td>
            </tr>
            </tbody>
          </table>

          <div class="__mt15">
            ④ 영상정보의 촬영시간, 보관기간, 보관장소 및 처리방법<br>
            촬영시간 보관기관 보관장소<br>
            24시간 촬영일로부터 약60일 경비실<br>
            - 처리방법 : 개인영상정보의 목적외 이용, 제3자 제공, 파기, 열람 등 요구에 관한 사항을 기록·관리하고, 보관기간 만료시 복원이 불가능한 방법으로 영구 삭제(출력물의 경우 파쇄 또는 소각)<br>
            ⑤ 개인영상정보의 확인 방법 및 장소에 관한 사항<br>
            - 확인 방법 : 영상정보 관리책임자 또는 접근권한자에게 미리 연락하고 법인를 방문하여 확인<br>
            - 확인 장소 : 법인 사무국, 전주첨단벤처단지 경비실<br>
            ⑥ 정보주체의 영상정보 열람 등 요구에 대한 조치<br>
            개인영상정보에 관하여 열람 또는 존재확인·삭제를 원하는 경우 언제든지 영상정보처리기기 운영자에게 요구할 수 있다. 단, 촬영된 개인영상정보 및 명백히 정보주체의 급박한 생명, 신체, 재산의 이익을 위하여 필요한 개인영상정보에 한정<br>
            법인는 개인영상정보에 관하여 열람 또는 존재확인·삭제를 요구한 경우 지체없이 필요한 조치를 시행<br>
            ⑦ 영상정보의 안전성 확보조치<br>
            법인에서 처리하는 영상정보는 암호화 조치 등을 통하여 안전하게 관리, 또한 본 법인는 개인영상정보보호를 위한 관리적 대책으로서 개인정보에 대한 접근 권한을 차등부여하고, 개인영상정보의 위·변조 방지를 위하여 개인영상정보의 생성 일시, 열람시 열람 목적·열람자·열람 일시 등을 기록하여 관리
          </div>

          <br>
          <p class="sub-tit" style="font-weight: bold;font-size: 17px;">제11조(개인정보처리지침 변경)</p>
          <br>
          <div>
            이 개인정보처리지침은 시행일로부터 적용되며, 법령 및 지침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
          </div>
        </div>
      </div>
    </div>
    <div class="bg _close" onclick="fn_wrap1Hiding(); return false;"></div>
  </div>

  <%--<div class="__pop-basic _pop-ajax wrap2" style="display:none;">
    <div class="fit inner p_size" style="width:1280px; top:120px; position:fixed; left:17%;">
      <div class="title" style="background-color: white; border-bottom:2px solid black;">
        <h3 style="color: black;font-weight: 500;font-size: 25px;">이용약관</h3>
        <button type="button" class="pop-close _close cls" onclick="fn_wrap2Hiding(); return false;">&lt;%&ndash;<i class="ri-close-line"></i>&ndash;%&gt;x</button>
      </div>
      <div class="desc" style="font-size: 15px; color: #666;">
        <p class="tit" style="font-size: 20px;color: green;">(사)캠틱종합기술원 이용약관</p>

        <br>
        <p class="sub-tit" style="font-weight: bold;font-size: 17px;">제 1장 총칙</p>
        <p class="txt" style="font-weight: bold;">제 1 조 (목적)</p>
        <p class="txt">본 약관(이하 '약관'이라 합니다)은 (사)캠틱종합기술원(이하 '기술원'이라 합니다)과 이용자 간에 기술원이 제공하는 (사)캠틱종합기술원 &lt;%&ndash;(<a href="https://www.jiat.re.kr" target="_blank" style="font-size: 15px; line-height: 1.6em;">https://www.jiat.re.kr</a>)&ndash;%&gt;(이하 '서비스'라 합니다)의 이용에 필요한 사항을 구체적으로 규정함을 목적으로 합니다.</p>

        <br>
        <p class="txt" style="font-weight: bold;">제 2 조 (용어의 정의)</p>
        <p class="txt">(1) 본 약관에서 사용하는 용어의 정의는 다음과 같습니다.</p>
        <p class="txt">-‘이용자’란 (사)캠틱종합기술원 이용약관에 접속하여 본 약관에 따라</p>
        <p class="txt">(사)캠틱종합기술원 이용약관이 제공하는 서비스를 받는 이용자를 말합니다.</p>
        <p class="txt">- ‘게시물’이라 함은 이용자가 기술원의 서비스를 이용하면서 작성한 모든 활동내역을 의미합니다.</p>
        <p class="txt">(2) 이 약관에서 사용하는 용어 중 제1항에서 정하지 아니한 것은 관계 법령 및 서비스별 안내에서 정하는 바에 따르며, 그 외에는 일반 관례에 따릅니다.</p>

        <br>
        <p class="sub-tit" style="font-weight: bold;font-size: 17px;">제 2장 계약 당사자의 권리와 의무</p>
        <p class="txt" style="font-weight: bold;">제 3 조 (기술원의 의무)</p>
        <p class="txt">(1) 기술원은 이용자가 희망한 서비스 제공 개시일에 특별한 사정이 없는 한 서비스를 이용할 수 있도록 하여야 합니다.</p>
        <p class="txt">(2) 기술원은 계속적이고 안정적인 서비스의 제공을 위하여 설비에 장애가 생기거나 멸실된 때에는 부득이한 사유가 없는 한 지체 없이 이를 수리 또는 복구합니다.</p>
        <p class="txt">기술원은 이용자로부터 제기되는 의견이나 불만이 정당하다고 객관적으로 인정될 경우에는 적절한 절차를 거쳐 즉시 처리하여야 합니다. 다만, 즉시 처리가 곤란한 경우는 회원에게 그 사유와 처리일정을 통보하여야 합니다.</p>

        <br>
        <p class="txt" style="font-weight: bold;">제 4 조 (이용자의 의무)</p>
        <p class="txt">(1) 이용자는 약관에서 규정하는 사항과 기타 기술원이 정한 제반 규정, 공지사항 등 기술원이 공지하는 사항 및 관계 법령을 준수하여야 하며, 기타 기술원의 업무에 방해가 되는 행위, 기술원의 명예를 손상시키는 행위, 타인에게 피해를 주는 행위를 해서는 안됩니다.</p>
        <p class="txt">(2) 이용자는 기술원의 사전 승낙 없이 서비스를 이용하여 영업활동을 할 수 없으며, 그 영업활동의 결과에 대해 기술원은 책임을 지지 않습니다. 또한 이용자의 이와 같은 영업활동으로 기술원이 손해를 입은 경우, 이용자는 기술원에 대해 손해배상의무를 지며, 기술원은 해당 이용자에 대해 서비스 이용제한 및 적법한 절차를 거쳐 손해배상 등을 청구할 수 있습니다.</p>
        <p class="txt">(3) 이용자는 기술원의 명시적 동의가 없는 한 서비스의 이용권한, 기타 이용계약상의 지위를 타인에게 양도, 증여할 수 없으며 이를 담보로 제공할 수 없습니다.</p>
        <p class="txt">(4) 이용자는 기술원 및 제 3자의 지적 재산권을 포함한 제반 권리를 침해하거나 제17조 각 호에 해당하는 행위를 해서는 안됩니다.</p>

        <br>
        <p class="sub-tit" style="font-weight: bold;font-size: 17px;">제 4장 서비스의 이용</p>
        <p class="txt" style="font-weight: bold;">제 5 조 (서비스 제공 및 중단)</p>
        <p class="txt">(1) 서비스 이용은 기술원의 업무상 또는 기술상 특별한 지장이 없는 한 연중 무휴, 1일 24시간 운영을 원칙으로 합니다. 단, 기술원은 시스템 정기점검, 증설 및 교체를 위해 기술원이 정한 날이나 시간에 서비스를 일시 중단할 수 있으며, 예정되어 있는 작업으로 인한 서비스 일시 중단은 사전에 공지합니다.</p>
        <p class="txt">(2) 기술원은 긴급한 시스템 점검, 증설 및 교체 등 부득이한 사유로 인하여 예고 없이 일시적으로 서비스를 중단할 수 있으며, 새로운 서비스의 교체 등 기술원이 적절하다고 판단하는 사유에 의하여 현재 제공되는 서비스를 완전히 중단할 수 있습니다.</p>
        <p class="txt">(3) 기술원은 국가 비상사태, 천재지변, 정전, 서비스 설비의 장애 또는 서비스 이용의 폭주 등으로 정상적인 서비스가 불가능할 경우, 서비스의 전부 또는 일부를 제한하거나 중지할 수 있습니다. 다만 이 경우 그 사유 및 기간 등을 회원에게 사후 공지합니다.</p>
        <p class="txt">(4) 기술원은 통제할 수 없는 사유로 인한 서비스 중단의 경우 (시스템 관리자의 고의, 과실 없는 디스크장애, 시스템다운 등)에 사전통지가 불가능하며, 타인(PC통신회사, 기간통신사업자 등)의 고의, 과실로 인한 시스템 중단 등의 경우에는 통지하지 않습니다.</p>
        <p class="txt">(5) 기술원은 서비스를 특정범위로 분할하여 각 범위 별로 이용가능 시간을 별도로 지정할 수 있습니다. 다만 이 경우 그 내용을 공지합니다.</p>

        <br>
        <p class="txt" style="font-weight: bold;">제 6 조 (이용자의 게시물 등)</p>
        <p class="txt">(1) 게시물이라 함은 이용자가 서비스를 이용하면서 게시한 글, 사진, 각종 파일과 링크 등을 말합니다.</p>
        <p class="txt">(2) 이용자가 서비스에 등록하는 게시물 등으로 인하여 본인 또는 타인에게 손해나 기타 문제가 발생하는 경우 이용자는 이에 대한 책임을 지게 되며, 기술원은 특별한 사정이 없는 한 이에 대하여 책임을 지지 않습니다.</p>
        <p class="txt">(3) 기술원은 다음 각 호에 해당하는 게시물 등을 이용자의 사전 동의 없이 임시게시 중단, 수정, 삭제, 이동 또는 등록 거부 등의 관련 조치를 취할 수 있습니다.</p>
        <p class="txt">- 다른 이용자 또는 제 3자에게 심한 모욕을 주거나 명예를 손상시키는 내용인 경우</p>
        <p class="txt">- 공공질서 및 미풍양속에 위반되는 내용을 유포하거나 링크시키는 경우</p>
        <p class="txt">- 불법복제 또는 해킹을 조장하는 내용인 경우</p>
        <p class="txt">- 영리를 목적으로 하는 광고일 경우</p>
        <p class="txt">- 범죄와 결부된다고 객관적으로 인정되는 내용일 경우</p>
        <p class="txt">- 다른 이용자 또는 제 3자의 저작권 등 기타 권리를 침해하는 내용인 경우</p>
        <p class="txt">- 사적인 정치적 판단이나 종교적 견해의 내용으로 기술원이 서비스 성격에 부합하지 않는다고 판단하는 경우</p>
        <p class="txt">- 기술원에서 규정한 게시물 원칙에 어긋나거나, 게시판 성격에 부합하지 않는 경우</p>
        <p class="txt">- 기타 관계법령에 위배된다고 판단되는 경우</p>
        <p class="txt">(4) 기술원은 게시물 등에 대하여 제3자로부터 명예훼손, 지적재산권 등의 권리 침해를 이유로 게시중단 요청을 받은 경우 이를 임시로 게시중단(전송중단)할 수 있으며, 게시중단 요청자와 게시물 등록자 간에 소송, 합의 기타 이에 준하는 관련기관의 결정 등이 이루어져 기술원에 접수된 경우 이에 따릅니다.</p>
        <p class="txt">(5) 해당 게시물 등에 대해 임시게시 중단이 된 경우, 게시물을 등록한 이용자는 재게 시(전송재개)를 기술원에 요청할 수 있으며, 게시 중단일로부터 30일 이내에 재게시를 요청하지 아니한 경우 기술원은 이를 삭제할 수 있습니다.</p>

        <br>
        <p class="txt" style="font-weight: bold;">제 7 조 (게시물에 대한 저작권)</p>
        <p class="txt">(1) 기술원이 작성한 게시물 또는 저작물에 대한 저작권 기타 지적재산권은 기술원에 귀속합니다.</p>
        <p class="txt">(2) 이용자가 서비스 내에 게시한 게시물의 저작권은 게시한 이용자에게 귀속됩니다. 단, 기술원은 서비스의 운영, 전시, 전송, 배포, 홍보의 목적으로 회원의 별도의 허락 없이 무상으로 저작권법에 규정하는 공정한 관행에 합치되게 합리적인 범위 내에서 다음과 같이 이용자가 등록한 게시물을 사용할 수 있습니다.</p>
        <p class="txt">- 서비스 내에서 이용자 게시물의 복제, 수정, 개조, 전시, 전송, 배포 및 저작물성을 해치지 않는 범위 내에서의 편집 저작물 작성</p>
        <p class="txt">- 미디어, 통신사 등 서비스 제휴 파트너에게 회원의 게시물 내용을 제공, 전시 혹은 홍보하게 하는 것.</p>
        <p class="txt">단, 이 경우 기술원은 별도의 동의 없이 이용자의 정보를 제공하지 않습니다.</p>
        <p class="txt">(3) 기술원은 전항 이외의 방법으로 회원의 게시물을 이용하고자 하는 경우, 전화, 팩스, 전자우편 등의 방법을 통해 사전에 이용자의 동의를 얻어야 합니다.</p>

        <br>
        <p class="txt" style="font-weight: bold;">제 8 조 (정보의 제공)</p>
        <p class="txt">(1) 기술원은 이용자에게 서비스 이용에 필요가 있다고 인정되는 각종 정보에 대해서 전자우편이나 서신, 우편, SMS, 전화 등의 방법으로 회원에게 제공할 수 있습니다.</p>
        <p class="txt">(2) 기술원은 서비스 개선 및 이용자 대상의 서비스 소개 등의 목적으로 이용자의 동의 하에 관련 법령에 따라 추가적인 개인 정보를 수집할 수 있습니다.</p>

        <br>
        <p class="txt" style="font-weight: bold;">제 9 조 (광고게재 및 광고주와의 거래)</p>
        <p class="txt">(1) 기술원이 이용자에게 서비스를 제공할 수 있는 서비스 투자기반의 일부는 광고게재를 통한 수익으로부터 나옵니다. 이용자는 서비스 이용 시 노출되는 광고게재에 대해 동의합니다.</p>
        <p class="txt">(2) 기술원은 서비스상에 게재되어 있거나 서비스를 통한 광고주의 판촉활동에 이용자가 참여하거나 교신 또는 거래를 함으로써 발생하는 손실과 손해에 대해 책임을 지지 않습니다.</p>

        <br>
        <p class="sub-tit" style="font-weight: bold;font-size: 17px;">제 5 장 계약 해지 및 이용 제한</p>
        <p class="txt" style="font-weight: bold;">제 10 조 (서비스 이용제한)</p>
        <p class="txt">기술원은 이용자가 서비스 이용내용에 있어서 본 약관 제 4조 내용을 위반하거나, 다음 각 호에 해당하는 경우 서비스 이용 제한, 초기화, 이용계약 해지 및 기타 해당 조치를 할 수 있습니다.</p>
        <p class="txt">- 공공질서 및 미풍양속에 위반되는 저속, 음란한 내용 또는 타인의 명예나 프라이버시를 침해할 수 있는 내용의 정보, 문장, 도형, 음향, 동영상을 전송, 게시, 전자우편 또는 기타의 방법으로 타인에게 유포하는 행위</p>
        <p class="txt">- 다른 이용자를 희롱 또는 위협하거나, 특정 이용자에게 지속적으로 고통 또는 불편을 주는 행위</p>
        <p class="txt">- 기술원으로부터 특별한 권리를 부여 받지 않고 기술원의 클라이언트 프로그램을 변경하거나, 기술원의 서버를 해킹하거나, 웹사이트 또는 게시된 정보의 일부분 또는 전체를 임의로 변경하는 행위</p>
        <p class="txt">- 서비스를 통해 얻은 정보를 기술원의 사전 승낙 없이 서비스 이용 외의 목적으로 복제하거나, 이를 출판 및 방송 등에 사용하거나, 제 3자에게 제공하는 행위</p>
        <p class="txt">- 기술원의 운영진, 직원 또는 관계자를 사칭하거나 고의로 서비스를 방해하는 등 정상적인 서비스 운영에 방해가 될 경우</p>
        <p class="txt">- 정보통신 윤리위원회 등 관련 공공기관의 시정 요구가 있는 경우</p>
        <p class="txt">- 약관을 포함하여 기술원이 정한 제반 규정을 위반하거나 범죄와 결부된다고 객관적으로 판단되는 등 제반 법령을 위반하는 행위</p>

        <br>
        <p class="sub-tit" style="font-weight: bold;font-size: 17px;">제 6 장 손해배상 및 기타사항</p>
        <p class="txt" style="font-weight: bold;">제 11 조 (손해배상)</p>
        <p class="txt">(1) 이용자는 제10조의 귀책사유로 인하여 기술원나 다른 이용자에게 입힌 손해를 배상할 민사상의 책임이 있으며, 범죄 행위에 대해서는 형사상의 책임을 부여합니다.</p>
        <p class="txt">(2) 기술원은 무료로 제공하는 서비스의 이용과 관련하여 개인정보취급방침에서 정하는 내용에 위반하지 않는 한 어떠한 손해도 책임을 지지 않습니다.</p>

        <br>
        <p class="txt" style="font-weight: bold;">제 12 조 (면책조항)</p>
        <p class="txt">(1) 기술원의 서비스는 이용자에게 제품에 대한 서비스 정보 및 부가정보를 제공하는 것에 불과하며, 회원에게 직접적인 영향을 주는 상행위는 하지 않습니다.</p>
        <p class="txt">(2) 기술원은 천재지변, 전쟁, 기간통신사업자의 서비스 중지 및 기타 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 대한 책임이 면제됩니다.</p>
        <p class="txt">(3) 기술원은 서비스용 설비의 보수, 교체, 정기점검, 공사 등 부득이한 사유로 발생한 손해에 대한 책임이 면제됩니다.</p>
        <p class="txt">(4) 기술원은 이용자의 컴퓨터 오류에 의해 손해가 발생한 경우 책임을 지지 않습니다.</p>
        <p class="txt">(5) 기술원은 이용자가 서비스를 이용하면서 얻은 자료로 인한 손해에 대하여 책임을 지지 않습니다.</p>
        <p class="txt">(6) 기술원은 이용자가 서비스에 게재한 각종 정보, 자료, 사실의 신뢰도, 정확성 등 내용에 대하여 책임을 지지 않으며, 이용자 상호간 및 이용자와 제 3자 상호 간에 서비스를 매개로 발생한 분쟁에 대해 개입할 의무가 없고, 이로 인한 손해를 배상할 책임도 없습니다.</p>
        <p class="txt">(7) 기술원은 이용자의 게시물을 등록 전에 사전심사 하거나 상시적으로 게시물의 내용을 확인 또는 검토하여야 할 의무가 없으며, 그 결과에 대한 책임을 지지 아니합니다.</p>

        <br>
        <p class="txt" style="font-weight: bold;">제 13 조 (통지 및 정보의 제공)</p>
        <p class="txt">(1) 기술원은 이용자에게 서비스 이용에 필요가 있다고 인정되는 각종 정보에 대해서 전자우편이나 서신우편 등의 방법으로 이용자에게 통지할 수 있습니다.</p>
        <p class="txt">(2) 기술원은 서비스 개선 및 소개 등의 목적으로 이용자의 동의 하에 추가적인 개인 정보를 요구할 수 있습니다.</p>
        <p class="txt">(3) 기술원은 불특정 다수 이용자에 대한 통지의 경우 1주일 이상 기술원 게시판에 게재함으로써 개별 통지에 갈음할 수 있습니다.</p>

        <br>
        <p class="txt" style="font-weight: bold;">제 21 조 (재판권 및 준거법)</p>
        <p class="txt">(1) 본 약관에 명시되지 않은 사항은 관계법령과 상관습에 따릅니다.</p>
        <p class="txt">(2) 각종 분쟁에 대해 소송이 제기되는 경우 관할법원에 제소합니다.</p>
      </div>
    </div>
    <div class="bg _close" onclick="fn_wrap2Hiding(); return false;"></div>
  </div>--%>
  <div class="__pop-basic _pop-ajax wrap3" style="display:none;">
    <div class="fit inner p_size" style="width:930px; top:120px; position:fixed; left:25%;">
      <div class="title" style="background-color: white; border-bottom:2px solid black;">
        <h3 style="color: black;font-weight: 500;font-size: 25px;">이메일무단수집거부</h3>
        <button type="button" class="pop-close _close cls" onclick="fn_wrap3Hiding(); return false;"><%--<i class="ri-close-line"></i>--%>x</button>
      </div>
      <div class="desc" style="font-size: 15px;">
        <p class="txt">본 웹사이트에 게시된 이메일 주소가 전자우편수집 프로그램이나 그 밖의 기술적 장치를 이용하여 무단으로 수집되는것을 거부하며 이를</p>
        <p class="txt" style="color: #00529c;">위반시 정보통신망법에 의해 형사처벌됨을 유념하시기 바랍니다.</p>
      </div>
    </div>
    <div class="bg _close" onclick="fn_wrap3Hiding(); return false;"></div>
  </div>

</footer>

<script type="text/javascript">
  function fn_wrap1(){
    $(".wrap1").css("display","block");
  }
  function fn_wrap1Hiding(){
    $(".wrap1").css("display","none");
  }
  function fn_wrap2(){
    $(".wrap2").css("display","block");
  }
  function fn_wrap2Hiding(){
    $(".wrap2").css("display","none");
  }
  function fn_wrap3(){
    $(".wrap3").css("display","block");
  }
  function fn_wrap3Hiding(){
    $(".wrap3").css("display","none");
  }
</script>