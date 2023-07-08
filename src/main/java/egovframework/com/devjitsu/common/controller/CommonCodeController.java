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

    //커스텀 코드리스트
    @RequestMapping("/system/commonCodeManagement/getCustomCodeList")
    public Map<String, Object> getCustomCodeList(Model model, @RequestParam Map<String, Object> params){
        Map<String, Object> result = new HashMap<>();
        result.put("codeList", commonCodeService.getCustomCodeList(params));
        return result;
    }
}