package egovframework.com.devjitsu.inside.asset.controller;

import egovframework.com.devjitsu.main.dto.LoginVO;
import egovframework.com.devjitsu.user.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

@Controller
public class AssetController {

    private static final Logger logger = LoggerFactory.getLogger(AssetController.class);

    @Autowired
    private UserService userService;

    //자산리스트
    @RequestMapping("/Inside/assetList.do")
    public String assetList(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/asset/assetList";
    }

    //구매내역
    @RequestMapping("/Inside/proposalList.do")
    public String proposalList(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/asset/proposalList";
    }

    //분류관리
    @RequestMapping("/Inside/classManage.do")
    public String classManage(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/asset/classManage";
    }

    //PDA연동목록
    @RequestMapping("/Inside/pdaPeristalsisList.do")
    public String pdaPeristalsisList(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/asset/pdaPeristalsisList";
    }

    //지식재산권리스트
    @RequestMapping("/Inside/rprList.do")
    public String rprList(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/asset/rprList";
    }

    //접수내역
    @RequestMapping("/Inside/rprReceiptList.do")
    public String rprReceiptList(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/asset/rprReceiptList";
    }

    //도서리스트
    @RequestMapping("/Inside/bookList.do")
    public String bookList(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/asset/bookList";
    }

    //오늘날짜 구하기 yyyyMMddhhmmss
    public static String getCurrentDateTime() {
        Date today = new Date();
        Locale currentLocale = new Locale("KOREAN", "KOREA");
        String pattern = "yyyyMMddHHmmss";
        SimpleDateFormat formatter = new SimpleDateFormat(pattern, currentLocale);
        return formatter.format(today);
    }

}
