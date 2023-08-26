<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>

<?php
  define('DIR','..');
  define('PATH','..');

  function pubGnb($str){
  global $_dep;
  $exp = explode(',',$str);
  $exp_count = count($exp);
  $act = 0;
  for($i=0;$i<count($exp);$i++){
    if($_dep[$i] == $exp[$i]){
      $act ++;
    }
  }
  if($act==$exp_count){
    echo 'active';
  }
}
?>