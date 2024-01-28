<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

          </div><!-- row -->
        </div><!-- contentpanel -->
      </div><!-- mainpanel -->
      <div class="mainFooter" style="text-align:center; clear:both;">
        <p style="margin:0;">(사)캠틱종합기술원 / 전북특별자치도 전주시 덕진구 유상로 67 (우)54852</p>
        <p>Tel : 063-219-0300 / Fax : 063-219-0303 Copyright[c] 2006 CAMTIC All rights Reserved camtic@camtic.or.kr</p>
      </div>
    </section>
  </body>
</html>

<script type="text/javascript">
    var today = new Date();
    var hours = today.getHours();
    var minutes = today.getMinutes();
    var seconds = today.getSeconds();
    var todayTime = hours + ' : ' + minutes + ' : ' + seconds;
    console.log(todayTime);
    $('#goWork').click(function() {
        if( $(this).html() == '출근' ) {
            $(this).html(todayTime);
            $(this).css("background-color", "#5bc0de");
            $(this).css("color", "#FFF");
            $('#offWork').html('퇴근');
            $('#offWork').css("background-color", "#F0F0F0");
            $('#offWork').css("color", "#696C74");
        }
        else {
            $(this).html('출근');
        }
    });

    $('#offWork').click(function() {
        if( $(this).html() == '퇴근' ) {
            $(this).html(todayTime);
            $(this).css("background-color", "#5bc0de");
            $(this).css("color", "#FFF");
            $('#goWork').html('출근');
            $('#goWork').css("background-color", "#F0F0F0");
            $('#goWork').css("color", "#696C74");
        }
        else {
            $(this).html('퇴근');
        }
    });
</script>