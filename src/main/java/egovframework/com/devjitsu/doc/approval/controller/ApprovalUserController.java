package egovframework.com.devjitsu.doc.approval.controller;

import com.google.gson.Gson;
import egovframework.com.devjitsu.doc.approval.service.ApprovalUserService;
import egovframework.com.devjitsu.common.service.CommonService;
import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import egovframework.devjitsu.common.utiles.EgovStringUtil;
import egovframework.devjitsu.common.utiles.EgovUserDetailsHelper;
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
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        params.put("dutyCode", login.getDutyCode());
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
        session.setAttribute("menuNm", request.getRequestURI());
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
        session.setAttribute("menuNm", request.getRequestURI());
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
        session.setAttribute("menuNm", request.getRequestURI());
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
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", login);
        model.addAttribute("toDate", getCurrentDateTime());

        return "approval/approvalUser/approvalDocStorageBox/storageBoxReaderDocList";
    }

    /**
     * 완료문서
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/approvalUser/storageBoxResultDocList.do")
    public String storageBoxResultDocList(HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", login);
        model.addAttribute("toDate", getCurrentDateTime());

        return "approval/approvalUser/approvalDocStorageBox/storageBoxResultDocList";
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
        session.setAttribute("menuNm", request.getRequestURI());
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
        session.setAttribute("menuNm", request.getRequestURI());
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
        session.setAttribute("menuNm", request.getRequestURI());
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
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", login);
        model.addAttribute("toDate", getCurrentDateTime());

        return "approval/approvalUser/approvalBox/approveReturnDocList";
    }

    /**
     * 문서검색 (부서)
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/approvalUser/docSearchDeptAll.do")
    public String docSearchDeptAll(HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);

        return "approval/approvalUser/docSearchDeptAll";
    }

    /**
     * 부서문서함, 문서검색(부서), 문서검색(전체) 리스트
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/approvalUser/getApprovalDocSearchList.do")
    public String getApprovalDocSearchList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", approvalUserService.getApprovalDocSearchList(params));
        return "jsonView";
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
        session.setAttribute("menuNm", request.getRequestURI());
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
    @RequestMapping("/approvalUser/setDocDel.do")
    public String setDocDel(@RequestParam Map<String, Object> params, Model model){
        approvalUserService.setDocDel(params);
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

    /**
     * 부재설정
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/approvalUser/absentSet.do")
    public String absentSet(HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        Map<String, Object> params = new HashMap<>();
        params.put("loginVO", loginVO);

        model.addAttribute("params", new Gson().toJson(params));
        model.addAttribute("loginVO", loginVO);
        model.addAttribute("AbsenceType", loginVO.getUserSe());

        return "approval/approvalUser/absent/absentSet";
    }

    /**
     * 부재설정 리스트
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/approvalUser/getAbsentSetList.do")
    public String getAbsentSetList(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        params.put("loginVO", loginVO);
        params.put("langCode", loginVO.getLangCode());
        params.put("groupSeq", loginVO.getGroupSeq());
        params.put("userSe", loginVO.getUserSe());
        params.put("isExcel", "N");

        model.addAttribute("list", approvalUserService.getAbsentSetList(params));
        return "jsonView";
    }

    /**
     * 부재등록, 정보 팝업  (수정중)
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/absentSet/absentSetPop.do")
    public String absentSetAddPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        LoginVO loginVO = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();
        params.put("absenceType", loginVO.getUserSe());
        params.put("group_seq", loginVO.getGroupSeq());
        params.put("groupSeq", loginVO.getGroupSeq());
        params.put("compSeq", loginVO.getOrganId());
        params.put("langCode", loginVO.getLangCode());

        model.addAttribute("params", new Gson().toJson(params));

        return "popup/approval/absentSet/absentSetPop";
    }

    /**
     * 부재정보 등록
     * @param params
     * @param model
     * @param request
     * @return
     */
    @RequestMapping("/absentSet/setAbsentInfo.do")
    public String setAbsentInfo(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        params.put("loginVO", loginVO);
        params.put("langCode", loginVO.getLangCode());

        Map<String, Object> dupleResult = approvalUserService.getAbsentDuplicate(params);
        int cnt = ((Integer)dupleResult.get("cnt")).intValue();
        List<Map<String, Object>> dupleList = (List<Map<String, Object>>)dupleResult.get("dupleList");
        model.addAttribute("dupleList", dupleList);
        String aiFlag = EgovStringUtil.isNullToString(params.get("c_aiflag"));
        if (cnt > 0 && !aiFlag.equals("1")) {
            model.addAttribute("MSG", "부재자가 설정하려는 기간에 부재중으로 지정되어있어 부재중으로 설정할 수 없습니다.");
            return "jsonView";
        }

        approvalUserService.setAbsentInfo(params);

        return "jsonView";
    }

    /**
     * 부재정보 수정
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/absentSet/setAbsentInfoUpd.do")
    public String setAbsentInfoUpd(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        params.put("loginVO", loginVO);
        params.put("langCode", loginVO.getLangCode());
        params.put("groupSeq", loginVO.getGroupSeq());

        Map<String, Object> dupleResult = approvalUserService.getAbsentDuplicate(params);
        int cnt = ((Integer)dupleResult.get("cnt")).intValue();
        List<Map<String, Object>> dupleList = (List<Map<String, Object>>)dupleResult.get("dupleList");
        model.addAttribute("dupleList", dupleList);
        String aiFlag = EgovStringUtil.isNullToString(params.get("c_aiflag"));
        if (cnt > 1 && !aiFlag.equals("1")) {
            model.addAttribute("MSG", "부재자가 설정하려는 기간에 부재중으로 지정되어있어 부재중으로 설정할 수 없습니다.");
            return "jsonView";
        }
        approvalUserService.setAbsentInfoUpd(params);

        return "jsonView";
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
