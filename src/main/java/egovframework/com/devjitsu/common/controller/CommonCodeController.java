package egovframework.com.devjitsu.common.controller;

import egovframework.com.devjitsu.common.service.CommonCodeService;
import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class CommonCodeController {

    private static final Logger logger = (Logger) LoggerFactory.getLogger(CommonCodeController.class);
    
    @Autowired
    private CommonCodeService commonCodeService;

    //공통 그룹코드별 코드리스트
    @RequestMapping("/system/commonCodeManagement/getCmCodeList")
    @ResponseBody
    public List<Map<String, Object>> getCmCodeList(Model model, @RequestParam Map<String, Object> params){
        return commonCodeService.getCmCodeList(params);
    }

    @RequestMapping("/system/commonCodeManagement/getCmCodeListReward")
    @ResponseBody
    public List<Map<String, Object>> getCmCodeListReward(Model model, @RequestParam Map<String, Object> params){
        return commonCodeService.getCmCodeListReward(params);
    }

    //공통 코드 관리
    @RequestMapping("/system/code/codeManagement.do")
    public String commonCodeManagement(HttpServletRequest request, Model model){
        HttpSession session = request.getSession();

        session.setAttribute("menuNm", request.getRequestURI());
        model.addAttribute("loginVO", (LoginVO) session.getAttribute("LoginVO"));

        return "system/code/codeManagement";
    }

    //공통 그룹코드 리스트
    @RequestMapping("/system/commonCodeManagement/getCmGroupCodeList.do")
    public String getCmGroupCodeList(Model model, @RequestParam Map<String, Object> params){
        model.addAttribute("list", commonCodeService.getCmGroupCodeList(params));
        return "jsonView";
    }

    //공통 그룹코드 조회
    @RequestMapping("/system/commonCodeManagement/getCmGroupCodeInfo.do")
    public String getCmGroupCodeInfo(Model model, @RequestParam Map<String, Object> params){
        model.addAttribute("result", commonCodeService.getCmGroupCodeInfo(params));
        return "jsonView";
    }

    //공통 그룹코드 insert, update
    @RequestMapping("/system/commonCodeManagement/setCmGroupCodeSave.do")
    public String setCmGroupCodeSave(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        Map<String, Object> result = commonCodeService.setCmGroupCodeSave(params);
        model.addAttribute("result", result);
        return "jsonView";
    }

    //공통 코드 insert, update
    @RequestMapping("/system/commonCodeManagement/setCmCodeSave.do")
    public String setCmCodeSave(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        Map<String, Object> result = commonCodeService.setCmCodeSave(params);
        model.addAttribute("result", result);
        return "jsonView";
    }

    //공통 코드 상세보기 데이터 조회
    @RequestMapping("/system/commonCodeManagement/getCmCodeInfo.do")
    public String vacCodeDataInfo(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        model.addAttribute("result", commonCodeService.getCmCodeInfo(params));
        return "jsonView";
    }

    //커스텀 코드리스트
    @RequestMapping("/system/commonCodeManagement/getCustomCodeList")
    public Map<String, Object> getCustomCodeList(Model model, @RequestParam Map<String, Object> params){
        Map<String, Object> result = new HashMap<>();
        result.put("codeList", commonCodeService.getCustomCodeList(params));
        return result;
    }

    /**
     * 임시예산코드등록 - 페이지
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/system/code/customBudgetPop.do")
    public String customBudgetPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        session.setAttribute("menuNm", request.getRequestURI());
        model.addAttribute("loginVO", loginVO);
        return "system/code/customBudget";
    }

    /**
     * 커스텀 예산항목 리스트
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/system/code/getCustomBudgetList")
    public String getCustomBudgetList(@RequestParam Map<String,Object> params, Model model) {
        model.addAttribute("rs", commonCodeService.getCustomBudgetList(params));
        return "jsonView";
    }

    /**
     * 임시예산코드등록 팝업
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/system/code/customBudgetManagePop.do")
    public String customBudgetManagePop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);

        return "popup/system/code/customBudgetManagePop";
    }

    /**
     * 커스텀 예산항목 수정 조회
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/system/code/getCustomBudget.do")
    public String getAstCategory(@RequestParam Map<String,Object> params, Model model) {
        model.addAttribute("data", commonCodeService.getCustomBudget(params));
        return "jsonView";
    }

    /**
     * 커스텀 예산항목 등록/수정
     * @param params
     * @return
     */
    @RequestMapping("/system/code/setCustomBudget.do")
    public String setCustomBudget(@RequestParam Map<String,Object> params) {
        commonCodeService.setCustomBudget(params);
        return "jsonView";
    }

    /**
     * 커스텀 예산항목 삭제
     * @param params
     * @return
     */
    @RequestMapping("/system/code/setCustomBudgetDel.do")
    public String setCustomBudgetDel(@RequestParam Map<String,Object> params) {
        commonCodeService.setCustomBudgetDel(params);
        return "jsonView";
    }
}