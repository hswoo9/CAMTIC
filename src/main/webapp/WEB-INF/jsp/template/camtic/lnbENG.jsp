<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>

<div id="lnb">
  <h2></h2>
  <ul class="lnb">
    <li class="about about_greeting"><a href="/camtic/about/greetingENG.do">Introduce</a></li>
    <li class="about about_history"><a href="/camtic/about/historyENG.do">History</a></li>
    <li class="about about_business"><a href="/camtic/about/businessENG.do">Major Business Areas</a></li>
    <li class="about about_vision"><a href="/camtic/about/visionENG.do">CAMTIC Mission & Vision 2030</a></li>
    <li class="about about_location"><a href="/camtic/about/locationENG.do">Contect</a></li>
  </ul>
</div>

<script>
  $("."+middleCategory+"_"+smallCategory).addClass('active');
  $("#lnb .lnb > li").not("."+middleCategory).hide();
  $("#lnb h2").text($("#header .gnb > ."+middleCategory+" span").text());


  $(function () {
    const categoryInb = $("#category").val();

   if(categoryInb != ""){
      if(categoryInb == "notice" || categoryInb == "business" || categoryInb == "study" || categoryInb == "partner"){
        $(".news"+"_"+categoryInb).addClass('active');

      }else{
        $(".pr"+"_"+categoryInb).addClass('active');
      }
    }
    /*else{
      const boardPathName = $(location).attr('search');
      const boardGub = boardPathName.split("=")[1];
      $(".news"+"_"+boardGub).addClass('active');
    }*/
  });
</script>