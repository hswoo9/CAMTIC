package egovframework.com.devjitsu.camtic.controller;

import egovframework.com.devjitsu.gw.login.controller.LoginController;
import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import egovframework.com.devjitsu.gw.login.service.LoginService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Map;

@Controller
public class HomepageController {

    private static final Logger logger = LoggerFactory.getLogger(HomepageController.class);

    @Autowired
    private LoginService loginService;
    //메인 홈페이지
    @RequestMapping("/camtic")
    public String homepageIndexA(@RequestParam Map<String,Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        /*params.put("empSeq", loginVO.getUniqId());*/
        model.addAttribute("loginVO", loginVO);
        return "camtic/main";
    }
    @RequestMapping("/camtic/")
    public String homepageIndexB(@RequestParam Map<String,Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        /* params.put("empSeq", loginVO.getUniqId());*/
        model.addAttribute("loginVO", loginVO);
        return "camtic/main";
    }
    @RequestMapping("/camtic/index.do")
    public String homepageIndexC(@RequestParam Map<String,Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
          /*params.put("empSeq", loginVO.getUniqId());*/
        model.addAttribute("loginVO", loginVO);
        return "camtic/main";
    }

    /**
     * 로그인 페이지 이동
     * @param request
     * @return
     */
    @RequestMapping("/camtic/hpLogin.do")
    public String mainLoginPage(HttpServletRequest request) {
        HttpSession session = request.getSession();
        session.removeAttribute("menuNm");
        return "/camtic/hpLogin";
    }

    /**
     * 로그인
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/camtic/loginAccess")
    public String loginAccess(@RequestParam Map<String, Object> params, @ModelAttribute("loginVO") LoginVO loginVO, HttpServletRequest request, ModelMap model) throws Exception {

        if (params != null && params.get("id") != null && !params.get("id").equals("")) {
            boolean isAdmin = false;
            logger.info("params : " + params);
            LoginVO login = new LoginVO();

            login.setId(params.get("id").toString());
            login = loginService.actionLogin(loginVO);

            logger.info("LoginVO : " + login);

            if (login != null) {
                if (login.getUniqId().equals("1")) {
                    isAdmin = true;
                    login.setUserSe("ADMIN");
                }
                request.getSession().setAttribute("LoginVO", login);
                request.getSession().setAttribute("isAdmin", isAdmin);

                logger.info("이름은 : " + login.getName());
                //Map<String, Object> loginMsMap = loginService.actionLoginMs(params);

                return "redirect:/camtic";
            } else {
                model.addAttribute("message", "Login failed.");
                return "forward:/camtic/hpLogin.do";
            }
        } else {
            model.addAttribute("message", "Login failed.");
            return "forward:/camtic/hpLogin.do";
        }
    }

    /**
     * 로그아웃
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/camtic/logoutAction")
    public String logout(HttpServletRequest request, ModelMap model){
        RequestContextHolder.getRequestAttributes().removeAttribute("loginVO", RequestAttributes.SCOPE_SESSION);
        HttpSession session = request.getSession();
        session.invalidate();
        return "redirect:/camtic";
    }

    //원장인사말 페이지
    @RequestMapping("/camtic/about/greeting.do")
    public String Agreeting(){ return "camtic/about/greeting"; }
    //주요사업 페이지
    @RequestMapping("/camtic/about/business.do")
    public String Abusiness(){ return "camtic/about/business"; }
    //미션.비젼 페이지
    @RequestMapping("/camtic/about/vision.do")
    public String Avision(){ return "camtic/about/vision"; }
    //연혁 페이지
    @RequestMapping("/camtic/about/history.do")
    public String Ahistory(){ return "camtic/about/history"; }
    //조직.연락처 페이지
    @RequestMapping("/camtic/about/organization.do")
    public String Aorganization(){ return "camtic/about/organization"; }
    //오시는길 페이지
    @RequestMapping("/camtic/about/location.do")
    public String Alocation(){ return "camtic/about/location"; }



    //전주첨단벤처단지 페이지
    @RequestMapping("/camtic/region/about.do")
    public String Rabout(){ return "camtic/region/about"; }
    //제조창업플랫폼(J-valley) 페이지
    @RequestMapping("/camtic/region/jvalley.do")
    public String Rjvalley(){ return "camtic/region/jvalley"; }
    //입주기업및입주안내페이지
    @RequestMapping("/camtic/region/list.do")
    public String Rlist(){ return "camtic/region/list"; }
    @RequestMapping("/camtic/region/view.do")
    public String Rview(){ return "camtic/region/view"; }



    //복합소재뿌리기술센터
    @RequestMapping("/camtic/company/root.do")
    public String Croot(){ return "camtic/company/root"; }
    //드론기술개발지원센터
    @RequestMapping("/camtic/company/drone.do")
    public String Cdrone(){ return "camtic/company/drone"; }
    //메이커스페이스
    @RequestMapping("/camtic/company/space.do")
    public String Cspace(){ return "camtic/company/space"; }
    //창업/기업 성장지원
    @RequestMapping("/camtic/company/support.do")
    public String Csupport(){ return "camtic/company/support"; }
    //인재개발지원
    @RequestMapping("/camtic/company/talent.do")
    public String Ctalent(){ return "camtic/company/talent"; }
    //일자리혁신지원
    @RequestMapping("/camtic/company/job.do")
    public String Cjob(){ return "camtic/company/job"; }



    //드론모빌리티
    @RequestMapping("/camtic/tech/drone.do")
    public String Tdrone(){ return "camtic/tech/drone"; }
    //탄소복합재
    @RequestMapping("/camtic/tech/carbon.do")
    public String Tcarbon(){ return "camtic/tech/carbon"; }
    //바이오헬스케어
    @RequestMapping("/camtic/tech/bio.do")
    public String Tbio(){ return "camtic/tech/bio"; }
    //스마트제조·로봇
    @RequestMapping("/camtic/tech/smart.do")
    public String Tsmart(){ return "camtic/tech/smart"; }
    //우주·항공·방산
    @RequestMapping("/camtic/tech/space.do")
    public String Tspace(){ return "camtic/tech/space"; }



    //캠틱클러스터
    @RequestMapping("/camtic/member/cluster.do")
    public String Mcluster(){ return "camtic/member/cluster"; }
    //캠-퍼스
    @RequestMapping("/camtic/member/campus.do")
    public String Mcampus(){ return "camtic/member/campus"; }
    //캠-웰페어
    @RequestMapping("/camtic/member/welfare.do")
    public String Mwelfare(){ return "camtic/member/welfare"; }
    //채용공고
    @RequestMapping("/camtic/member/job.do")
    public String Mjob(@RequestParam Map<String,Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        /*params.put("empSeq", loginVO.getUniqId());*/
        model.addAttribute("loginVO", loginVO);
        return "camtic/member/job";
    }
    //채용절차
    @RequestMapping("/camtic/member/step.do")
    public String Mstep(){ return "camtic/member/step"; }
    @RequestMapping("/camtic/member/view.do")
    public String Mview(){ return "camtic/member/view"; }

    //포토뉴스
    @RequestMapping("/camtic/pr/photo.do")
    public String Pphoto(@RequestParam Map<String,Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        /*params.put("empSeq", loginVO.getUniqId());*/
        model.addAttribute("loginVO", loginVO);
        return "camtic/pr/photo"; }
    //보도자료
    @RequestMapping("/camtic/pr/report.do")
    public String Preport(@RequestParam Map<String,Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        /*params.put("empSeq", loginVO.getUniqId());*/
        model.addAttribute("loginVO", loginVO);
        return "camtic/pr/report"; }
    //뉴스레터
    @RequestMapping("/camtic/pr/news.do")
    public String Pnews(@RequestParam Map<String,Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        /*params.put("empSeq", loginVO.getUniqId());*/
        model.addAttribute("loginVO", loginVO);
        return "camtic/pr/news"; }
    //홍보영상
    @RequestMapping("/camtic/pr/video.do")
    public String Pvideo(@RequestParam Map<String,Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        /*params.put("empSeq", loginVO.getUniqId());*/
        model.addAttribute("loginVO", loginVO);
        return "camtic/pr/video"; }
    //CI소개
    @RequestMapping("/camtic/pr/ci.do")
    public String Pci(@RequestParam Map<String,Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        /*params.put("empSeq", loginVO.getUniqId());*/
        model.addAttribute("loginVO", loginVO);

        return "camtic/pr/ci";
    }

    //sns
    @RequestMapping("/camtic/pr/sns.do")
    public String Psns(@RequestParam Map<String,Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        /*params.put("empSeq", loginVO.getUniqId());*/
        model.addAttribute("loginVO", loginVO);
        return "camtic/pr/sns";
    }
    @RequestMapping("/camtic/pr/view.do")
    public String Pview(@RequestParam Map<String,Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        /*params.put("empSeq", loginVO.getUniqId());*/
        model.addAttribute("loginVO", loginVO);
        return "camtic/pr/view"; }

    //이메일무단수집거부
    @RequestMapping("/camtic/etc/privacy.do")
    public String privacy(){ return "camtic/etc/privacy"; }
    //찾아오시는길
    @RequestMapping("/camtic/etc/email.do")
    public String email(){ return "camtic/etc/email"; }

    @RequestMapping("/camtic/about/greetingENG.do")
    public String AgreetingENG(){ return "camtic/about/greetingENG"; }

    @RequestMapping("/camtic/about/businessENG.do")
    public String AbusinessENG(){ return "camtic/about/businessENG"; }
    @RequestMapping("/camtic/about/businessENG1.do")
    public String AbusinessENG1(){ return "camtic/about/businessENG1"; }
    @RequestMapping("/camtic/about/businessENG2.do")
    public String AbusinessENG2(){ return "camtic/about/businessENG2"; }
    @RequestMapping("/camtic/about/businessENG3.do")
    public String AbusinessENG3(){ return "camtic/about/businessENG3"; }

    @RequestMapping("/camtic/about/historyENG.do")
    public String AhistoryENG(){ return "camtic/about/historyENG"; }

    @RequestMapping("/camtic/about/visionENG.do")
    public String AvisionENG(){ return "camtic/about/visionENG"; }

    @RequestMapping("/camtic/about/locationENG.do")
    public String AlocationENG(){ return "camtic/about/locationENG"; }


    @RequestMapping("/error/page")
    public String errorPage(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        model.addAttribute("windowType", "popup");
        return "error/error";
    }
}
