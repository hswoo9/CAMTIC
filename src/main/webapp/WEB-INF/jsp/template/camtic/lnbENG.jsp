<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>

<%--<div id="lnb">
  <h2></h2>
  <ul class="lnb">
    <li class="about about_greeting"><a href="/camtic/about/greetingENG.do">Introduce</a></li>
    <li class="about about_history"><a href="/camtic/about/historyENG.do">History</a></li>
    <li class="about about_business"><a href="/camtic/about/businessENG.do">Major Business Areas</a></li>
    <li class="about about_vision"><a href="/camtic/about/visionENG.do">CAMTIC Mission & Vision 2030</a></li>
    <li class="about about_location"><a href="/camtic/about/locationENG.do">Contect</a></li>
  </ul>
</div>--%>

<div id="lnb">
  <h2></h2>
  <ul class="lnb">
    <li class="about about_greeting"><a href="/camtic/about/greetingENG.do">Introduce</a></li>
    <li class="about about_history"><a href="/camtic/about/historyENG.do">History</a></li>
    <li class="about about_business"><a href="/camtic/about/businessENG.do">Major Business Areas</a></li>
    <li class="about about_subBusiness"><a class="sub_menu" href="/camtic/about/businessENG1.do">Research & Business Development</a></li>
    <li class="about about_subBusiness"><a class="sub_menu" href="/camtic/about/businessENG2.do">Business Growth Support</a></li>
    <li class="about about_subBusiness"><a class="sub_menu" href="/camtic/about/businessENG3.do">Commercialization of key technologies</a></li>
    <li class="about about_vision"><a href="/camtic/about/visionENG.do">CAMTIC Mission & Vision 2030</a></li>
    <li class="about about_location"><a href="/camtic/about/locationENG.do">Contect</a></li>
  </ul>
</div>

<script>

  $(document).ready(function() {

    var currentPageURL = window.location.pathname;

    $("#lnb .lnb > li").removeClass('active');

    $("#lnb .lnb > li a[href='" + currentPageURL + "']").parent().addClass('active');

  });

  const head = {
    init() {
      this.action();
    },
    action() {
      const header = $('#header');

      header
              .on('click', '.mnu', () => $html.toggleClass('navOn'))
              .on('mouseenter focusin', '.lnb', () => {
                if (matchMedia('screen and (min-width:1025px)').matches) $html.addClass('navOn');
              })
              .on('mouseleave focusout', () => {
                if (matchMedia('screen and (min-width:1025px)').matches) {
                  $html.removeClass('navOn');
                }
              })
              .on('click', '.lnb > li > a', function () {
                if (matchMedia('screen and (max-width:1024px)').matches && $(this).next('ul').length > 0) {
                  $(this).closest('li').toggleClass('active').siblings().removeClass('active');
                  return false;
                }
              });

      const handleHeadFix = () => $html.toggleClass('fix', winSh() > 30);

      $win.on('load scroll', handleHeadFix);

      const gotop = $('._gotop');
      gotop.on('click', () => {
        $html.animate({ scrollTop: 0 }, 500);
        return false;
      });
    },
  };

</script>

<Style>
  #lnb .lnb > li > .sub_menu  {font-size: 15px;padding: 15px 30px;}
  .mnu {
    display: none;
  }

  @media screen and (max-width: 1000px) {
    .mnu {
      display: block;
    }
  }
</Style>
