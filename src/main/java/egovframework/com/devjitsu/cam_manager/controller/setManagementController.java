package egovframework.com.devjitsu.cam_manager.controller;

import egovframework.com.devjitsu.cam_manager.service.SetManagementService;
import egovframework.com.devjitsu.cam_project.service.ProjectService;
import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Map;

@Controller
public class setManagementController {

    @Autowired
    private SetManagementService setManagementService;

    @Autowired
    private ProjectService projectService;

    @RequestMapping("/setManagement/projectDepositManagement.do")
    public String projectDepositManagement(Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        session.setAttribute("menuNm", request.getRequestURI());
        
        model.addAttribute("loginVO", loginVO);

        return "cam_manager/setManagement/projectDepositManagement";
    }

    @RequestMapping("/setManagement/depMatching.do")
    public String depMatching(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);

        return "cam_manager/setManagement/depMatching";
    }

    @RequestMapping("/setManagement/closingManagement.do")
    public String closingManagement(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);

        return "cam_manager/setManagement/closingManagement";
    }

    @RequestMapping("/setManagement/projectBgtManagement.do")
    public String projectBgtManagement(Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        session.setAttribute("menuNm", request.getRequestURI());
        model.addAttribute("loginVO", loginVO);

        return "cam_manager/setManagement/projectBgtManagement";
    }

    @RequestMapping("/setManagement/projectCorp.do")
    public String projectCorp(Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        session.setAttribute("menuNm", request.getRequestURI());

        model.addAttribute("loginVO", loginVO);


        return "cam_manager/setManagement/projectCorp";
    }

    @RequestMapping("/setManagement/projectCorpMng.do")
    public String projectCorpMng(Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        session.setAttribute("menuNm", request.getRequestURI());

        model.addAttribute("loginVO", loginVO);


        return "cam_manager/setManagement/projectCorpMng";
    }

    @RequestMapping("/setManagement/getCorpProjectList")
    public String getCorpProjectList(@RequestParam Map<String, Object> params, Model model){

        model.addAttribute("list", setManagementService.getCorpProjectList(params));

        return "jsonView";
    }

    @RequestMapping("/setManagement/getCorpProjectListMng")
    public String getCorpProjectListMng(@RequestParam Map<String, Object> params, Model model){

        model.addAttribute("list", setManagementService.getCorpProjectListMng(params));

        return "jsonView";
    }

    @RequestMapping("/setManagement/pop/setDelvProject.do")
    public String setDelvProject(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "popup/cam_manager/setManagement/setDelvProject";
    }

    @RequestMapping("/setManagement/pop/setCorpProject.do")
    public String setCorpProject(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "popup/cam_manager/setManagement/setCorpProject";
    }

    @RequestMapping("/setManagement/setProject")
    public String setProject(@RequestParam Map<String, Object> params, Model model){
        try{
            setManagementService.setProject(params);
            model.addAttribute("params", params);
            model.addAttribute("code", 200);
        } catch (Exception e){
            e.printStackTrace();
        }

        return "jsonView";

    }

    @RequestMapping("/setManagement/getCorpProjectData")
    public String getCorpProjectData(@RequestParam Map<String, Object> params, Model model){

        model.addAttribute("data", setManagementService.getCorpProjectData(params));

        return "jsonView";
    }

    @RequestMapping("/setManagement/setRequest")
    public String setRequest(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request) {
        try{
            setManagementService.setRequest(params);
        } catch (Exception e){
            e.printStackTrace();
        }
        return "jsonView";
    }

    @RequestMapping("/setManagement/setApprove")
    public String setApprove(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request) {
        try{
            setManagementService.setApprove(params);
        } catch (Exception e){
            e.printStackTrace();
        }
        return "jsonView";
    }

    @RequestMapping("/setManagement/exnpDeChangeRs.do")
    public String exnpDeChangeRs(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        session.setAttribute("menuNm", request.getRequestURI());

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "cam_manager/setManagement/exnpDeChangeRs";
    }

    @RequestMapping("/setManagement/getExnpDeChangeRs")
    public String getExnpDeChangeRs(@RequestParam Map<String, Object> params, Model model){

        model.addAttribute("list", setManagementService.getExnpDeChangeRs(params));

        return "jsonView";
    }

    @RequestMapping("/setManagement/setExnpDeChangeRs")
    public String setExnpDeChangeRs(@RequestParam Map<String, Object> params, Model model){
        try{
            setManagementService.setExnpDeChangeRs(params);
            model.addAttribute("code", 200);
        } catch (Exception e){
            e.printStackTrace();
        }
        return "jsonView";
    }

    @RequestMapping("/setManagement/delExnpDeChangeRs")
    public String delExnpDeChangeRs(@RequestParam Map<String, Object> params, Model model){

        try{
            setManagementService.delExnpDeChangeRs(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/setManagement/rndProjectOperationStatus.do")
    public String rndProjectOperationStatus(Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        session.setAttribute("menuNm", request.getRequestURI());

        model.addAttribute("loginVO", loginVO);

        return "cam_manager/setManagement/rndProjectOperationStatus";
    }

    @RequestMapping("/setManagement/pop/updRndProjectAmt.do")
    public String updRndProjectAmt(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);
        model.addAttribute("data", projectService.getProjectInfo(params));

        return "popup/cam_manager/setManagement/updRndProjectAmt";
    }

    @RequestMapping("/setManagement/setRndProjectPrevNextAmt")
    public String setRndProjectPrevNextAmt(@RequestParam Map<String, Object> params, Model model){
        try{
            setManagementService.setRndProjectPrevNextAmt(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/setManagement/getRndProjectPrevNextAmt")
    public String getRndProjectPrevNextAmt(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("data", setManagementService.getRndProjectPrevNextAmt(params));
        return "jsonView";
    }
}
