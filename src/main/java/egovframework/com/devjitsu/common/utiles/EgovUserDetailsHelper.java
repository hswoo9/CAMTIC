package egovframework.com.devjitsu.common.utiles;

import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;

public class EgovUserDetailsHelper {
    public static LoginVO getAuthenticatedUser(){

        ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        HttpServletRequest request = attr.getRequest();
        LoginVO loginVo = (LoginVO) request.getSession(true).getAttribute("LoginVO");
        if(loginVo != null){
            return loginVo;
        }
        String serverName = request.getServerName();
        System.out.println ( "serverName =>"  + serverName ) ;
        // if(serverName.indexOf("localhost") > -1 || serverName.indexOf("127.0.0.1") > -1 || serverName.indexOf("192.168.71.180") > -1) {
//            loginVo = new LoginVO();
//            loginVo.setGroupSeq("camtic");
//            loginVo.setCompSeq("1000");
//            loginVo.setBizSeq("1000");
//            loginVo.setOrgnztId("1010");
//            loginVo.setOrgnztNm("테스트부서");
//            loginVo.setDept_seq("1");
//            loginVo.setUniqId("1");
//            loginVo.setLangCode("kr");
//            loginVo.setUserSe("ADMIN");
//            loginVo.setErpEmpCd("120523006");
//            loginVo.setErpCoCd("5000");
//            loginVo.setEaType("ea");
//            loginVo.setEmail("devjitsu");
//            loginVo.setEmailDomain("st-tech.org");
//            loginVo.setId("admin");
//            loginVo.setEmpname("관리자");
//            loginVo.setName("관리자");
//            loginVo.setOrganNm("캠틱종합기술");
//            loginVo.setPositionCode("A7"); // 직급
//            loginVo.setPositionNm("나급");
//            loginVo.setClassCode("A8"); // 직책
//            loginVo.setClassNm("차장");
//            loginVo.setAuthorCode("ERP_PAYDATA#ERP_SPEND");
        // }
//        if(loginVo.getIp() == null || "".equals(loginVo.getIp())) {
//            loginVo.setIp(request.getHeader("X-FORWARDED-FOR"));
//        }
//        if(loginVo.getIp() == null || "".equals(loginVo.getIp())) {
//            loginVo.setIp(request.getRemoteAddr());
//        }
//        if(loginVo.getIp() == null || "".equals(loginVo.getIp())) {
//            try {
//                loginVo.setIp(InetAddress.getLocalHost().getHostAddress());
//            } catch (Exception e) {
//                e.printStackTrace();
//            }
//        }
        return loginVo;
    }
}
