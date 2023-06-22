package egovframework.com.devjitsu.approval.controller;

import egovframework.com.devjitsu.approval.service.ApprovalUserService;
import egovframework.com.devjitsu.common.service.CommonService;
import egovframework.com.devjitsu.main.dto.LoginVO;
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
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
public class ApprovalUserController {

    private static final Logger logger = LoggerFactory.getLogger(ApprovalUserController.class);

    @Autowired
    private CommonService commonService;

    @Autowired
    private ApprovalUserService approvalUserService;

    /**
     * 전자문서 > 전자결재 > 상신/보관함
     */

    /**
     * 양식목록
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/approvalUser/draftFormList.do")
    public String draftFormList(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", login);
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("data", approvalUserService.getDraftFormList(params));

        return "approval/approvalUser/draftFormList";
    }

    /**
     * 임시보관문서
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/approvalUser/storageBoxTempSaveDocList.do")
    public String storageBoxTempSaveDocList(HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", login);
        model.addAttribute("toDate", getCurrentDateTime());

        return "approval/approvalUser/approvalDocStorageBox/storageBoxTempSaveDocList";
    }

    /**
     * 상신문서
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/approvalUser/storageBoxDraftDocList.do")
    public String storageBoxDraftDocList(HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", login);
        model.addAttribute("toDate", getCurrentDateTime());

        return "approval/approvalUser/approvalDocStorageBox/storageBoxDraftDocList";
    }

    /**
     * 반려/회수 문서
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/approvalUser/storageBoxReturnDocList.do")
    public String storageBoxReturnDocList(HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", login);
        model.addAttribute("toDate", getCurrentDateTime());

        return "approval/approvalUser/approvalDocStorageBox/storageBoxReturnDocList";
    }

    /**
     * 열람 문서
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/approvalUser/storageBoxReaderDocList.do")
    public String storageBoxReaderDocList(HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", login);
        model.addAttribute("toDate", getCurrentDateTime());

        return "approval/approvalUser/approvalDocStorageBox/storageBoxReaderDocList";
    }

    /**
     * 전자문서 > 전자결재 > 결재함
     */

    /**
     * 결재대기문서
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/approvalUser/approveWaitDocList.do")
    public String approveWaitDocList(HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", login);
        model.addAttribute("toDate", getCurrentDateTime());

        return "approval/approvalUser/approvalBox/approveWaitDocList";
    }

    /**
     * 결재예정문서
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/approvalUser/approveTobeDocList.do")
    public String approveTobeDocList(HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", login);
        model.addAttribute("toDate", getCurrentDateTime());

        return "approval/approvalUser/approvalBox/approveTobeDocList";
    }

    /**
     * 결재완료문서
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/approvalUser/approveCompletionDocList.do")
    public String approveCompletionDocList(HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", login);
        model.addAttribute("toDate", getCurrentDateTime());

        return "approval/approvalUser/approvalBox/approveCompletionDocList";
    }

    /**
     * 결재반려문서
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/approvalUser/approveReturnDocList.do")
    public String approveReturnDocList(HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", login);
        model.addAttribute("toDate", getCurrentDateTime());

        return "approval/approvalUser/approvalBox/approveReturnDocList";
    }

    /**
     * 전자문서 > 전자결재 > 결재설정
     */

    /**
     * 결재선관리
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/approvalUser/approvalLineManagement.do")
    public String openOrganizationChart(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", login);
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("data", commonService.ctDept((String) login.getOrgnztId()));

        return "approval/approvalUser/approvalLineManagement";
    }

    /**
     * 사용자 문서별 리스트 (열람문서 제외)
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/approvalUser/getUserDocStorageBoxList")
    public String getUserDocStorageBoxList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", approvalUserService.getUserDocStorageBoxList(params));
        return "jsonView";
    }

    /**
     * 사용자 문서별 리스트 (열람문서)
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/approvalUser/getUserReadDocStorageBoxList")
    public String getUserReadDocStorageBoxList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", approvalUserService.getUserReadDocStorageBoxList(params));
        return "jsonView";
    }

    /**
     * 문서 삭제 (임시보관문서, 반려, 회수문서)
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/approvalUser/setCheckedDocDel.do")
    public String setCheckedDocDel(@RequestParam Map<String, Object> params, Model model){
        approvalUserService.setCheckedDocDel(params);
        return "jsonView";
    }

    /**
     * 결재함 리스트
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/approvalUser/getApproveDocBoxList")
    public String getApproveDocBoxList(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        model.addAttribute("list", approvalUserService.getApproveDocBoxList(params));
        return "jsonView";
    }

    //TODO. AJAX RETURN 오류로 JSONVIEW는 나중에 추가
    @RequestMapping("/approvalUser/getUserList")
    @ResponseBody
    public List<Map<String, Object>> getUserList(Model model, @RequestParam Map<String, Object> params){
        return commonService.getUserList(params);
    }

    @RequestMapping("/approvalUser/getUserFavApproveRouteList")
    @ResponseBody
    public List<Map<String, Object>> getUserFavApproveRouteList(@RequestParam Map<String, Object> params){
        return approvalUserService.getUserFavApproveRouteList(params);
    }

    @RequestMapping("/approvalUser/setUserFavApproveRoute")
    @ResponseBody
    public Map<String, Object> setUserFavApproveRoute(@RequestParam Map<String, Object> params){
        return approvalUserService.setUserFavApproveRoute(params);
    }

    @RequestMapping("/approvalUser/setUserFavApproveRouteActiveN")
    @ResponseBody
    public Map<String, Object> setUserFavApproveRouteActiveN(@RequestParam(value = "favArr[]") List<String> favArr, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginUser = (LoginVO) session.getAttribute("LoginVO");

        Map<String, Object> params = new HashMap<>();
        params.put("empSeq", loginUser.getUniqId());
        params.put("favArr", favArr);

        return approvalUserService.setUserFavApproveRouteActiveN(params);
    }

    @RequestMapping("/approvalUser/getUserFavApproveRouteDetail")
    @ResponseBody
    public List<Map<String, Object>> getUserFavApproveRouteDetail(@RequestParam Map<String, Object> params, Model model){
        return approvalUserService.getUserFavApproveRouteDetail(params);
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
