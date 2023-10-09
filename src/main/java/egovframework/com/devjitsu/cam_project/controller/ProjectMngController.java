package egovframework.com.devjitsu.cam_project.controller;

import egovframework.com.devjitsu.cam_project.service.ProjectMngService;
import egovframework.com.devjitsu.common.service.CommonService;
import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;

@Controller
public class ProjectMngController {

    @Autowired
    private ProjectMngService projectMngService;

    @Autowired
    private CommonService commonService;



    /**
     * 캠프로젝트 > 프로젝트 코드 관리
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/project/codeManagement.do")
    public String codeManagement(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){

        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("loginVO");
        session.setAttribute("menuNm", request.getRequestURI());

        return "cam_project/codeManagement";
    }

    /**
     * 캠프로젝트 > 노임단가 관리
     * @param params
     * @param model
     * @param request
     * @return
     */
    @RequestMapping("/projectMng/labor.do")
    public String mngLabor(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        session.setAttribute("menuNm", request.getRequestURI());

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "cam_project/labor";
    }

    /**
     * 캠프로젝트 > 자산연계-거래 분류 리스트 페이지
     * @param params
     * @param model
     * @param request
     * @return
     */
    @RequestMapping("/projectMng/product.do")
    public String mngProduct(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        session.setAttribute("menuNm", request.getRequestURI());

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "cam_project/product";
    }

    /**
     * 캠프로젝트 > 자산연계-거래 분류 등록 페이지
     * @param params
     * @param model
     * @param request
     * @return
     */
    @RequestMapping("/projectMng/pop/productReqPop.do")
    public String systemAdminReqPop(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);
        if(params.get("mode").equals("upd") && params.get("type").equals("A")){
            //Map<String, Object> data = campusService.getCodeOne(params);
            //model.addAttribute("data", data);
        }
        return "popup/cam_project/productReqPop";
    }



    /**
     * 프로젝트 관리 > 노임단가 관리 > 노임단가 데이터 조회(직급별)
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/projectMng/getPositionLaborList")
    public String getPositionLaborList(@RequestParam Map<String, Object> params, Model model){

        params.put("cmGroupCode", "POSITION");

        List<Map<String, Object>> list = projectMngService.getLaborList(params);

        model.addAttribute("list", list);

        return "jsonView";
    }

    @RequestMapping("/projectMng/getTeamCostList")
    public String getTeamCostList(@RequestParam Map<String, Object> params, Model model){
        params.put("cmGroupCode", "POSITION");

        List<Map<String, Object>> list = projectMngService.getTeamCostList(params);

        model.addAttribute("list", list);

        return "jsonView";
    }

    @RequestMapping("/projectMng/setLaborInfo")
    public String setLaborInfo(@RequestParam Map<String, Object> params, Model model){

        try{
            projectMngService.setLaborInfo(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }


        return "jsonView";
    }

    @RequestMapping("/projectMng/setTeamInfo")
    public String setTeamInfo(@RequestParam Map<String, Object> params, Model model){

        try{
            projectMngService.setTeamInfo(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }


        return "jsonView";
    }

    @RequestMapping("/projectMng/getLaborData")
    public String getLaborData(@RequestParam Map<String, Object> params, Model model){

        Map<String, Object> map = projectMngService.getLaborData(params);
        model.addAttribute("rs", map);

        return "jsonView";
    }

    @RequestMapping("/projectMng/getLaborHistData")
    public String getLaborHistData(@RequestParam Map<String, Object> params, Model model){
        Map<String, Object> map = projectMngService.getLaborHistData(params);
        model.addAttribute("rs", map);

        return "jsonView";
    }

    @RequestMapping("/projectMng/insLaborHistInfo")
    public String insLaborHistInfo(@RequestParam Map<String, Object> params, Model model){

        try{
            projectMngService.insLaborHistInfo(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/projectMng/insTeamCostHistInfo")
    public String insTeamCostHistInfo(@RequestParam Map<String, Object> params, Model model){

        try{
            projectMngService.insTeamCostHistInfo(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/projectMng/delLaborHistData")
    public String delLaborHistData(@RequestParam Map<String, Object> params, Model model){

        try{
            projectMngService.delLaborHistData(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    /** 자산연계-거래 분류 코드 등록 */
    @RequestMapping("/projectMng/setProductInfo")
    public String setProductInfo(@RequestParam Map<String, Object> params){
        projectMngService.setProductInfo(params);
        return "jsonView";
    }

    /** 자산연계-거래 분류 코드 리스트 조회 */
    @RequestMapping("/projectMng/getProductCodeInfo")
    public String getProductCodeInfo(@RequestParam Map<String, Object> params, Model model) {
        List<Map<String, Object>> list = projectMngService.getProductCodeInfo(params);
        model.addAttribute("list", list);
        return "jsonView";
    }
}
