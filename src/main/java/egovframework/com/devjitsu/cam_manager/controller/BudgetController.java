package egovframework.com.devjitsu.cam_manager.controller;


import egovframework.com.devjitsu.cam_manager.service.BudgetService;
import egovframework.com.devjitsu.g20.service.G20Service;
import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Controller
public class BudgetController {

    @Autowired
    private BudgetService budgetService;

    @Autowired
    private G20Service g20Service;


    /**
     * 예산등록
     * @param params
     * @param model
     * @param request
     * @return
     */
    @RequestMapping("/budget/makeBudget.do")
    public String makeBudget(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request) {

        HttpSession session = request.getSession();

        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "cam_manager/budget/makeBudget";
    }

    @RequestMapping("/budget/getBudgetList")
    public String getBudgetList(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request) {

        List<Map<String, Object>> list = new ArrayList<>();
        list = budgetService.getBudgetList(params);
        model.addAttribute("list", list);

        return "jsonView";
    }

    @RequestMapping("/budget/getBudgetAList")
    public String getBudgetAList(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request) {

        List<Map<String, Object>> list = new ArrayList<>();
        list = budgetService.getBudgetAList(params);
        model.addAttribute("list", list);

        return "jsonView";
    }

    @RequestMapping("/budget/getBudgetBList")
    public String getBudgetBList(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request) {

        List<Map<String, Object>> list = new ArrayList<>();
        list = budgetService.getBudgetBList(params);
        model.addAttribute("list", list);

        return "jsonView";
    }

    @RequestMapping("/budget/pop/regMakeBudget.do")
    public String regMakeBudget(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request) {
        HttpSession session = request.getSession();

        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "popup/cam_manager/budget/regMakeBudget";
    }

    @RequestMapping("/budget/pop/budgetPop.do")
    public String budgetPop(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request) {

        model.addAttribute("params", params);

        return "popup/cam_manager/budget/budgetPop";
    }

    @RequestMapping("/budget/pop/setBudget")
    public String setBudget(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request) {

        try{
            int duplCnt = budgetService.getBudgetCdDuplCnt(params);

            if(duplCnt > 1){
                model.addAttribute("code", 303);
                model.addAttribute("msg", "이미 등록된 예산항목이 있습니다.");

                return "jsonView";
            } else {
                budgetService.setBudget(params);
                model.addAttribute("code", 200);
            }
        } catch (Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }


    @RequestMapping("/budget/pop/getBudget")
    public String getBudget(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request) {

        List<Map<String, Object>> list = new ArrayList<>();
        list = budgetService.getBudgets(params);
        model.addAttribute("list", list);

        return "jsonView";
    }


    @RequestMapping("/budget/budgetPreCondition.do")
    public String budgetPreCondition(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request) {

        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("menuNm", request.getRequestURI());
        model.addAttribute("params", params);
        model.addAttribute("loginVO", loginVO);

        return "cam_manager/budget/budgetPreCondition";
    }

    @RequestMapping("/budget/getPreCondition")
    public String getPreCondition(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request) {

        List<Map<String, Object>> listA = new ArrayList<>();
        listA = budgetService.getPreConditionA(params);

        List<Map<String, Object>> listB = new ArrayList<>();
        listB = budgetService.getPreConditionB(params);

        model.addAttribute("listA", listA);
        model.addAttribute("listB", listB);


        return "jsonView";
    }


}
