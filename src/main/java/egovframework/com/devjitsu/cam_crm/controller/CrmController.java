package egovframework.com.devjitsu.cam_crm.controller;

import egovframework.com.devjitsu.cam_crm.service.CrmService;
import egovframework.com.devjitsu.common.service.CommonCodeService;
import egovframework.com.devjitsu.common.service.CommonService;
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
import java.util.List;
import java.util.Map;

@Controller
public class CrmController {

    @Autowired
    private CrmService crmService;

    @Autowired
    private CommonCodeService commonCodeService;

    @Autowired
    private CommonService commonService;

    @Value("#{properties['File.Server.Dir']}")
    private String SERVER_DIR;

    @Value("#{properties['File.Base.Directory']}")
    private String BASE_DIR;

    @RequestMapping("/crm/crmView.do")
    public String crmView(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());

        model.addAttribute("loginVO", session.getAttribute("loginVO"));

        return "/cam_crm/crmView";
    }

    @RequestMapping("/crm/getCrmList")
    public String getCrmList(@RequestParam Map<String, Object> params, Model model){

        model.addAttribute("list", crmService.getCrmList(params));

        return "jsonView";
    }

    @RequestMapping("/crm/pop/popCrmList.do")
    public String popCrmList(Model model){

        return "popup/cam_crm/popCrmList";
    }

    @RequestMapping("/crm/pop/popCrmMemList.do")
    public String popCrmMemList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("params", params);

        return "popup/cam_crm/popCrmMemList";
    }


    @RequestMapping("/crm/getPopCrmList")
    public String getPopCrmList(@RequestParam Map<String, Object> params, Model model){

        List<Map<String, Object>> list = crmService.getPopCrmList(params);

        model.addAttribute("list", list);

        return "jsonView";
    }

    @RequestMapping("/crm/getCrmData")
    public String getCrmData(@RequestParam Map<String, Object> params, Model model){

        model.addAttribute("rs", crmService.getCrmData(params));

        return "jsonView";
    }

    @RequestMapping("/crm/pop/regCrmPop.do")
    public String regCrmPop(HttpServletRequest request, @RequestParam Map<String, Object> params, Model model){

        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        params.put("cmGroupCode", "CRM_ITEM_VALUE");

        model.addAttribute("data", commonService.commonCodeList(params));
        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "popup/cam_crm/regCrmPop";
    }

    @RequestMapping("/crm/getCrmInfo")
    public String getCrmInfo(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("loginVO");

        model.addAttribute("data", crmService.getCrmInfo(params));
        model.addAttribute("fileInfo", crmService.getCrmFileInfo(params));
        model.addAttribute("loginVO", loginVO);

        return "jsonView";
    }

    @RequestMapping("/crm/getCrmMemList")
    public String getCrmMemList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", crmService.getCrmMemList(params));

        return "jsonView";
    }

    @RequestMapping("/crm/setCrmInfo")
    public String setCrmInfo(@RequestParam Map<String, Object> params, Model model, MultipartHttpServletRequest request) {

        try{
            crmService.setCrmInfo(params, request, SERVER_DIR, BASE_DIR);
            model.addAttribute("params", params);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/crm/setCrmMemInfo")
    public String setCrmMemInfo(@RequestParam Map<String, Object> params, Model model) {
        try{
            crmService.setCrmMemInfo(params);
            model.addAttribute("params", params);
        } catch (Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/crm/delCrmMemInfo")
    public String delCrmMemInfo(@RequestParam Map<String, Object> params, Model model){
        try{
            crmService.delCrmMemInfo(params);
            model.addAttribute("params", params);
        } catch (Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/crm/getCrmMemInfo")
    public String getCrmMemInfo(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("data", crmService.getCrmMemInfo(params));

        return "jsonView";
    }

    @RequestMapping("/crm/crmHistView.do")
    public String crmHistView(Model model, HttpServletRequest request){

        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);

        return "/cam_crm/crmHistView";
    }

    @RequestMapping("/crm/getCrmHistList")
    public String getCrmHistList(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("list", crmService.getCrmHistList(params));

        return "jsonView";
    }

    @RequestMapping("/crm/pop/regCrmHistPop.do")
    public String regCrmHistPop(HttpServletRequest request, @RequestParam Map<String, Object> params, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "popup/cam_crm/regCrmHistPop";
    }

    @RequestMapping("/crm/setCrmHist")
    public String setCrmHist(@RequestParam Map<String, Object> params, Model model){
        try{
            crmService.setCrmHist(params);
            model.addAttribute("params", params);
        } catch (Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

}
