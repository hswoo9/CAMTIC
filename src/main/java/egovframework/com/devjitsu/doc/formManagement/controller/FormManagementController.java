package egovframework.com.devjitsu.doc.formManagement.controller;

import egovframework.com.devjitsu.common.service.CommonService;
import egovframework.com.devjitsu.doc.formManagement.service.FormManagementService;
import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Map;

@Controller
public class FormManagementController {
    private static final Logger logger = LoggerFactory.getLogger(FormManagementController.class);

    @Value("#{properties['File.Server.Dir']}")
    private String SERVER_DIR;

    @Value("#{properties['File.Server.Path']}")
    private String SERVER_PATH;

    @Value("#{properties['File.Base.Directory']}")
    private String BASE_DIR;

    @Autowired
    private FormManagementService formManagementService;
    @Autowired
    private CommonService commonService;

    /** 양식폴더 관리 페이지 */
    @RequestMapping("/formManagement/formFolderManagement.do")
    public String formFolderManagement(HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());

        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", login);

        return "approval/formManagement/formFolderManagement";
    }

    /** 양식폴더 관리 리스트 */
    @RequestMapping("/formManagement/getFormFolderList.do")
    public String getFormFolderList(@RequestParam Map<String, Object> params, Model model) {
        model.addAttribute("list", formManagementService.getFormFolderList(params));
        return "jsonView";
    }

    /** 양식 폴더 저장/수정 */
    @RequestMapping("/formManagement/setFormFolder.do")
    public String  setFormFolder(@RequestParam Map<String, Object> params, Model model) {
        formManagementService.setFormFolder(params);
        return "jsonView";
    }

    /** 양식 폴더 삭제 */
    @RequestMapping("/formManagement/setFormFolderDel.do")
    public String  setFormFolderDel(@RequestParam Map<String, Object> params, Model model) {
        formManagementService.setFormFolderDel(params);
        return "jsonView";
    }

    /** 양식 관리 페이지 */
    @RequestMapping("/formManagement/formManagement.do")
    public String formManagement(HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());

        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", login);

        return "approval/formManagement/formManagement";
    }

    /** 양식 관리 리스트 */
    @RequestMapping("/formManagement/getFormList.do")
    public String getFormList(@RequestParam Map<String, Object> params, Model model) {
        model.addAttribute("list", formManagementService.getFormList(params));
        return "jsonView";
    }

    /** 양식 파일 정보 조회 */
    @RequestMapping("/formManagement/getTemplateFormFile.do")
    public String getTemplateFormFile(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        if(request.getServerName().contains("localhost") || request.getServerName().contains("127.0.0.1"))params.put("fileHostAddress", "localhost");
        else params.put("fileHostAddress", "server");

        model.addAttribute("formFile", formManagementService.getTemplateFormFile(params));
        return "jsonView";
    }

    /** 양식별 열람자, 추가항목 리스트 */
    @RequestMapping("/formManagement/getFormRdCfList.do")
    public String getFormReaderReceiverList(@RequestParam Map<String, Object> params, Model model) {
        model.addAttribute("list", formManagementService.getFormRdCfList(params));

        return "jsonView";
    }

    /** 양식 저장/수정 */
    @RequestMapping("/formManagement/setForm.do")
    public String  setForm(@RequestParam Map<String, Object> params,
                           @RequestParam(name = "form", required = false) MultipartFile form,
                           @RequestParam(name = "logo", required = false) MultipartFile logo,
                           @RequestParam(name = "symbol", required = false) MultipartFile symbol) throws Exception {

        formManagementService.setForm(params, form, logo, symbol, SERVER_PATH, SERVER_DIR, BASE_DIR);

        return "jsonView";
    }

    /** 양식 삭제 */
    @RequestMapping("/formManagement/setFormDel.do")
    public String  setFormDel(@RequestParam Map<String, Object> params, Model model) throws Exception {
        formManagementService.setFormDel(params, SERVER_PATH, BASE_DIR);
        return "jsonView";
    }

    /** 연동프로세스 관리 페이지 */
    @RequestMapping("/formManagement/systemLinkageSetting.do")
    public String systemLinkage(HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());

        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", login);

        return "approval/formManagement/systemLinkageSetting";
    }

    /** 연동프로세스 리스트 */
    @RequestMapping("/formManagement/getLinkageProcessList.do")
    public String getLinkageProcessList(@RequestParam Map<String, Object> params, Model model) {
        model.addAttribute("list", formManagementService.getLinkageProcessList(params));
        return "jsonView";
    }

    /** 연동프로세스 코드 중복확인 */
    @RequestMapping("/formManagement/setProcessValidationChk.do")
    public String setProcessValidationChk(@RequestParam Map<String, Object> params, Model model) {
        model.addAttribute("rs", formManagementService.setProcessValidationChk(params));
        return "jsonView";
    }

    /** 연동프로세스 저장/수정 */
    @RequestMapping("/formManagement/setLinkageProcess.do")
    public String setLinkageProcess(@RequestParam Map<String, Object> params) {
        formManagementService.setLinkageProcess(params);
        return "jsonView";
    }

    /** 연동프로세스 삭제 */
    @RequestMapping("/formManagement/setLinkageProcessDel.do")
    public String  setLinkageProcessDel(@RequestParam Map<String, Object> params, Model model) throws Exception {
        formManagementService.setLinkageProcessDel(params);
        return "jsonView";
    }
}