package egovframework.com.devjitsu.etc.controller;

import egovframework.com.devjitsu.doc.approval.service.ApprovalUserService;
import egovframework.com.devjitsu.etc.service.EtcService;
import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;

@Controller
public class EtcController {
    private static final Logger logger = (Logger) LoggerFactory.getLogger(EtcController.class);

    @Autowired
    private EtcService etcService;

    @Autowired
    private ApprovalUserService approvalUserService;

    @Value("#{properties['File.Server.Dir']}")
    private String SERVER_DIR;

    @Value("#{properties['File.Base.Directory']}")
    private String BASE_DIR;

    /** 시스템관리 > 기타관리 > 직인관리 */
    @RequestMapping("/sign/signMngList.do")
    public String menuManagement(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", login);
        return "system/sign/signMngList";
    }
    @RequestMapping("/etc/formSelectPopup.do")
    public String formSelectPopup(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", login);
        model.addAttribute("data", approvalUserService.getDraftFormList(params));
        return "popup/form/formSelectPopup";
    }

    /** 직인리스트 */
    @RequestMapping("/sign/getSignInfoList")
    public String getSignInfoList(@RequestParam Map<String, Object> params, Model model){
        List<Map<String, Object>> list = etcService.getSignInfoList(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    /** 직인DATA */
    @RequestMapping("/sign/getSignInfoOne")
    public String getSignInfoOne(@RequestParam Map<String, Object> params, Model model){
        Map<String, Object> data = etcService.getSignInfoOne(params);
        model.addAttribute("data", data);
        return "jsonView";
    }

    /** 직인 저장 */
    @RequestMapping("/sign/setSignInfo")
    public String setSignInfo(@RequestParam Map<String, Object> params, MultipartHttpServletRequest request, Model model){
        MultipartFile[] file = request.getFiles("mpf").toArray(new MultipartFile[0]);
        etcService.setSignInfo(params, file, SERVER_DIR, BASE_DIR);
        model.addAttribute("rs", params);
        return "jsonView";
    }

    /** 직인 삭제 */
    @RequestMapping("/sign/setSignInfoDel")
    public String setSignInfoDel(@RequestParam Map<String, Object> params, Model model){
        etcService.setSignInfoDel(params);
        model.addAttribute("rs", params);
        return "jsonView";
    }
}
