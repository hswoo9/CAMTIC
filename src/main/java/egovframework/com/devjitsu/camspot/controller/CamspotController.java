package egovframework.com.devjitsu.camspot.controller;

import dev_jitsu.MainLib;
import egovframework.com.devjitsu.common.service.CommonCodeService;
import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import egovframework.com.devjitsu.gw.user.service.UserService;
import egovframework.com.devjitsu.inside.userManage.service.UserManageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Controller
public class CamspotController {

    private static final Logger logger = LoggerFactory.getLogger(CamspotController.class);

    //인사기록카드 페이지
    @RequestMapping("/camspot/privacyInfo.do")
    public String privacyInfo(HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        menuSession(request, session);

        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", login);
        return "camspot/privacyInfo";
    }

    private static void menuSession(HttpServletRequest request, HttpSession session) {
        session.setAttribute("menuNm", request.getRequestURI());
    }




}
