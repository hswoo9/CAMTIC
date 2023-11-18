package egovframework.com.devjitsu.cam_manager.controller;

import com.google.gson.Gson;
import egovframework.com.devjitsu.cam_manager.service.ManageService;
import egovframework.com.devjitsu.cam_project.service.ProjectService;
import egovframework.com.devjitsu.common.service.CommonCodeService;
import egovframework.com.devjitsu.common.service.CommonService;
import egovframework.com.devjitsu.g20.service.G20Service;
import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class ManageController {

    @Autowired
    private ManageService manageService;

    @Autowired
    private ProjectService projectService;

    @Autowired
    private CommonService commonService;

    @Autowired
    private G20Service g20Service;

    @Value("#{properties['File.Server.Dir']}")
    private String SERVER_DIR;

    @Value("#{properties['File.Base.Directory']}")
    private String BASE_DIR;


    @RequestMapping("/mng/pop/budgetView.do")
    public String budgetView(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        Map<String, Object> map = projectService.getProjectStep(params);

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("map", new Gson().toJson(map));
        model.addAttribute("data", map);
        model.addAttribute("params", params);

        return "popup/cam_manager/budgetView";
    }

    @RequestMapping("/mng/pop/bankView.do")
    public String bankView(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "popup/cam_manager/bankView";
    }

    @RequestMapping("/mng/pop/paymentDetView.do")
    public String paymentDetView(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "popup/cam_manager/paymentDetView";
    }

    @RequestMapping("/mng/pop/addClientView.do")
    public String addClientView(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "popup/cam_manager/addClientView";
    }

    @RequestMapping("/mng/getMemList")
    public String getMemList(@RequestParam Map<String, Object> params, Model model){

        List<Map<String, Object>> list = manageService.getMemList(params);
        model.addAttribute("list", list);

        return "jsonView";
    }

    @RequestMapping("/mng/budgetList.do")
    public String budgetList(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        session.setAttribute("menuNm", request.getRequestURI());

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "cam_manager/budget/budgetList";
    }

    @RequestMapping("/mng/budgetDetailList.do")
    public String budgetDetailList(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        session.setAttribute("menuNm", request.getRequestURI());

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "cam_manager/budget/budgetDetailList";
    }

    @RequestMapping("/mng/getBudgetList")
    public String getBudgetList(@RequestParam Map<String, Object> params, Model model){

        List<Map<String, Object>> list = new ArrayList<>();
        list = g20Service.getBudgetList(params);

        List<Map<String, Object>> listMap = new ArrayList<>();

        for(int i = 0 ; i < list.size() ; i++){
            Map<String, Object> bsMap = new HashMap<>();
            bsMap = manageService.getProjectData(list.get(i));

            if(bsMap != null){
                list.get(i).put("REG_DT", bsMap.get("PJT_REG_DT"));
            }
        }

        model.addAttribute("list", list);

        return "jsonView";
    }

    @RequestMapping("/mng/duzonlink.do")
    public String duzonlink(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);

        return "cam_manager/duzonlink";
    }

    @RequestMapping("/mng/enaralink.do")
    public String enaralink(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);

        return "cam_manager/enaralink";
    }

    @RequestMapping("/mng/pop/userPartRate.do")
    public String userPartRate(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request) {
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("empInfo", manageService.getEmpInfo(params));
        model.addAttribute("params", params);
        if(params.containsKey("pjtSn")){
            model.addAttribute("projectInfo", projectService.getProjectData(params));
        }
        return "popup/cam_manager/partRate/userPartRate";
    }

    @RequestMapping("/mng/userPartRateInfo")
    public String userPartRateInfo(@RequestParam Map<String, Object> params, Model model) {

        List<Map<String, Object>> list = manageService.getUserPartRateInfo(params);
        List<Map<String, Object>> userSalList = manageService.getUserSalList(params);

        model.addAttribute("list", list);
        model.addAttribute("userSalList", userSalList);
        return "jsonView";
    }

    @RequestMapping("/mng/checkExnpDetData")
    public String checkExnpDetData(@RequestParam Map<String, Object> params, Model model){
        try{
            List<Map<String, Object>> list = manageService.checkExnpDetData(params);
            model.addAttribute("list", list);
        } catch (Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    /** 캠매니저 > 설정관리 > 프로젝트 관리 > 프로젝트 팝업창 */
    @RequestMapping("/mng/pop/projectMngPop.do")
    public String projectMngPop(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        Map<String, Object> map = projectService.getG20ProjectData(params);

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("map", new Gson().toJson(map));
        model.addAttribute("data", map);
        model.addAttribute("params", params);

        return "popup/cam_manager/projectMngPop";
    }

    /** 캠매니저 > 설정관리 > 프로젝트 관리 > 프로젝트 팝업창 > 수익/비용 탭 */
    @RequestMapping("/mng/pop/incmExpInfo.do")
    public String incmExpInfo(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);
        model.addAttribute("paramsMap", new Gson().toJson(params));

        return "popup/cam_manager/incmExpInfo";
    }
}
