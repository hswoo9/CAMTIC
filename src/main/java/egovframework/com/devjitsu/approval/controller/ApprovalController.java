package egovframework.com.devjitsu.approval.controller;

import com.google.gson.Gson;
import egovframework.com.devjitsu.approval.service.ApprovalService;
import egovframework.com.devjitsu.approval.service.ApprovalUserService;
import egovframework.com.devjitsu.common.service.CommonCodeService;
import egovframework.com.devjitsu.common.service.CommonService;
import egovframework.com.devjitsu.common.utiles.EgovStringUtil;
import egovframework.com.devjitsu.formManagement.service.FormManagementService;
import egovframework.com.devjitsu.main.dto.LoginVO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
public class ApprovalController {

    private static final Logger logger = LoggerFactory.getLogger(ApprovalController.class);

    @Value("#{properties['File.Server.Dir']}")
    private String SERVER_DIR;

    @Value("#{properties['File.Base.Directory']}")
    private String BASE_DIR;

    @Value("#{properties['File.Base.DownDirectory']}")
    private String BASE_DOWN_DIR;

    @Autowired
    private CommonService commonService;

    @Autowired
    private CommonCodeService commonCodeService;

    @Autowired
    private ApprovalService approvalService;

    @Autowired
    private ApprovalUserService approvalUserService;

    @Autowired
    private FormManagementService formManagementService;

    /** 양식 파일 정보 조회 */
    @RequestMapping("/approval/getTemplateFormFile")
    @ResponseBody
    public List<Map<String, Object>> getTemplateFormFile(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        if(request.getServerName().contains("localhost") || request.getServerName().contains("127.0.0.1"))params.put("fileHostAddress", "localhost");
        else params.put("fileHostAddress", "server");

        return formManagementService.getTemplateFormFile(params);
    }

    /** 상신 팝업 */
    @RequestMapping("/approval/approvalDraftingPop.do")
    public String approvalDraftingPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        String hwpUrl = "";

        model.addAttribute("loginVO", (LoginVO)session.getAttribute("LoginVO"));

        if(params.get("linkageType").equals("1")){
            Map<String, Object> formInfo = formManagementService.getDocFormInfoReqOpt(params);
            params.put("DOC_CONTENTS", formInfo.get("FORM_CONTENT"));
        }else{
            params.putAll(approvalService.getLinkageProcessDocInterlock(params));
        }
        if(!params.containsKey("processId")){
            params.put("processId", params.get("linkageProcessCode"));
        }

        if(request.getServerName().contains("localhost") || request.getServerName().contains("127.0.0.1")){
            hwpUrl = commonCodeService.getHwpCtrlUrl("l_hwpUrl");
        }else{
            hwpUrl = commonCodeService.getHwpCtrlUrl("s_hwpUrl");
        }
        params.put("hwpUrl", hwpUrl);

        model.addAttribute("docContents", params.get("DOC_CONTENTS") == null ? "" : params.get("DOC_CONTENTS"));
        model.addAttribute("hwpUrl", hwpUrl);
        params.remove("DOC_CONTENTS");
        model.addAttribute("params", new Gson().toJson(params));
        model.addAttribute("toDate", getCurrentDateTime());

        return "popup/approval/popup/approvalDraftingPop";
    }

    /** 문서 기본 설정값 조회 */
    @RequestMapping("/approval/getDocFormReqOpt")
    @ResponseBody
    public Map<String, Object> getDocFormReqOpt(@RequestParam Map<String, Object> params) {
        return formManagementService.getDocFormInfoReqOpt(params);
    }

    /** 문서 연동프로세스 사용시 url 조회 */
    @RequestMapping("/approval/getDocFormLinkagePopUrl")
    @ResponseBody
    public Map<String, Object> getDocFormLinkagePopUrl(@RequestParam Map<String, Object> params) {
        return formManagementService.getDocFormLinkagePopUrl(params);
    }

    /** 결재선 지정 */
    @RequestMapping("/approval/approvalLineSettingPop.do")
    public String selectApprovalLine(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("data", commonService.ctDept((String) loginVO.getOrgnztId()));
        model.addAttribute("loginVO", loginVO);

        return "popup/approval/popup/approvalLineSettingPop";
    }

    /**
     * 결재선 지정 (사용자 부재체크)
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/approval/getAbsentSetChk")
    @ResponseBody
    public Map<String, Object> getAbsentSetChk(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {

        Map<String, Object> result = new HashMap<>();

        List<Map<String, Object>> dupleList = new ArrayList<>();


        result.put("dupleList", dupleList);

        return result;

        /*HttpSession session = request.getSession();
        LoginVO user = (LoginVO) session.getAttribute("LoginVO");

        params.put("loginVO", user);
        params.put("langCode", user.getLangCode());
        params.put("groupSeq", user.getGroupSeq());

        Map<String, Object> dupleResult = approvalUserService.getAbsentDuplicate(params);

        int cnt = ((Integer)dupleResult.get("cnt")).intValue();
        model.addAttribute("pathName", dupleResult.get("pathName"));

        List<Map<String, Object>> dupleList = (List<Map<String, Object>>)dupleResult.get("dupleList");

        model.addAttribute("dupleList", dupleList);

        String aiFlag = EgovStringUtil.isNullToString(params.get("c_aiflag"));
        if (cnt > 1 && !aiFlag.equals("1")) {
            model.addAttribute("MSG", "부재자가 설정하려는 기간에 부재중으로 지정되어있어 부재중으로 설정할 수 없습니다.");
            return "jsonView";
        }*/
    }

    /** 상신전 부여할 문서번호 조회 */
    @RequestMapping("/approval/getDeptDocNum")
    @ResponseBody
    public Map<String, Object> getDeptDocNum(@RequestParam Map<String, Object> params, Model model) {

        Map<String, Object> result = new HashMap<>();
        result.put("rs", approvalService.getDeptDocNum(params));
        return result;
    }

    /** 결재문서 상신, 재상신 */
    @RequestMapping("/approval/setApproveDraftInit")
    @ResponseBody
    public Map<String, Object> setApproveDraftInit(@RequestParam Map<String, Object> params, Model model) throws IOException {

        Map<String, Object> result = new HashMap<>();

        try {
            if(EgovStringUtil.nullConvert(params.get("docHWPFileData")).equals("")){
                throw new Exception();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        approvalService.setApproveDocInfo(params, BASE_DIR);
        result.put("params", params);
        return result;
    }

    /** 결재문서 결재, 반려 */
    @RequestMapping("/approval/setDocApproveNReturn")
    @ResponseBody
    public Map<String, Object> setDocApproveNReturn(@RequestParam Map<String, Object> params, Model model) throws IOException {
        approvalService.setDocApproveNReturn(params, BASE_DIR);
        return params;
    }

    //오늘날짜 구하기 yyyyMMddhhmmss
    public static String getCurrentDateTime() {
        Date today = new Date();
        Locale currentLocale = new Locale("KOREAN", "KOREA");
        String pattern = "yyyyMMddHHmmss";
        SimpleDateFormat formatter = new SimpleDateFormat(pattern, currentLocale);
        return formatter.format(today);
    }

}
