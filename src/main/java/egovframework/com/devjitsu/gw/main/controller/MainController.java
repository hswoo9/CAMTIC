package egovframework.com.devjitsu.gw.main.controller;

import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
public class MainController {

    @RequestMapping("/")
    public String index(){
        return "indexA";
    }

    @RequestMapping("/indexA.do")
    public String indexA(){
        return "indexA";
    }

    @RequestMapping("/indexB.do")
    public String indexB(HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", loginVO);
        return "indexB";
    }

    @RequestMapping("/intro.do")
    public String intro(){
        return "intro";
    }

    @RequestMapping("/subHoliday/subHolidayApplication.do")
    public String subHolidayApplication(){
        return "/subHoliday/subHolidayApplication";
    }



    @RequestMapping("/subHoliday/org.do")
    public String org(){
        return "/subHoliday/org";
    }

    @RequestMapping("/engineering/customerConsultation.do")
    public String customerConsultation(){
        return "/engineering/customerConsultation";
    }

    @RequestMapping("/engineering/estimate.do")
    public String estimate(){
        return "/engineering/estimate";
    }

    @RequestMapping("/engineering/orderManagement.do")
    public String orderManagement(){
        return "/engineering/orderManagement";
    }

    @RequestMapping("/engineering/developmentPlan.do")
    public String developmentPlan(){
        return "/engineering/developmentPlan";
    }

    @RequestMapping("/engineering/outsourcingPurchase.do")
    public String outsourcingPurchase(){
        return "/engineering/outsourcingPurchase";
    }

    @RequestMapping("/engineering/resultReport.do")
    public String resultReport(){
        return "/engineering/resultReport";
    }

    @RequestMapping("/engineering/deliveryManagement.do")
    public String deliveryManagement(){
        return "/engineering/deliveryManagement";
    }
}
