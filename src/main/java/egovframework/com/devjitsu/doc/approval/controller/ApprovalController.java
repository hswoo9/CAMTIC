package egovframework.com.devjitsu.doc.approval.controller;

import com.google.gson.Gson;
import egovframework.com.devjitsu.doc.approval.service.ApprovalService;
import egovframework.com.devjitsu.doc.approval.service.ApprovalUserService;
import egovframework.com.devjitsu.common.service.CommonCodeService;
import egovframework.com.devjitsu.common.service.CommonService;
import egovframework.com.devjitsu.common.utiles.EgovStringUtil;
import egovframework.com.devjitsu.doc.formManagement.service.FormManagementService;
import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

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

    /** 시스템 연계 테이블 인서트 */
    @RequestMapping("/linkageProcess/setLinkageProcessDocInterlock")
    public String setLinkageProcessDocInterlock(@RequestParam Map<String, Object> params, Model model){
        String resultCode = "SUCCESS";
        String resultMessage = "성공하였습니다.";
        try{
            approvalService.setLinkageProcessDocInterlock(params);
        }catch(Exception e){
            logger.error(e.getMessage());
            resultCode = "FAIL";
            resultMessage = "시스템연동 연계 정보 갱신 오류 발생("+e.getMessage()+")";
        }
        model.addAttribute("resultCode", resultCode);
        model.addAttribute("resultMessage", resultMessage);

        return "jsonView";
    }

    /** 양식 파일 정보 조회 */
    @RequestMapping("/approval/getTemplateFormFile")
    @ResponseBody
    public List<Map<String, Object>> getTemplateFormFile(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        if(request.getServerName().contains("localhost") || request.getServerName().contains("127.0.0.1"))params.put("fileHostAddress", "localhost");
        else params.put("fileHostAddress", "server");

        return formManagementService.getTemplateFormFile(params);
    }

    /** 문서 정보 조회 */
    @RequestMapping("/approval/getDocInfo")
    public String getDocInfo(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("rs", approvalService.getDocInfo(params));
        return "jsonView";
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

        params.put("docTitle", params.get("docTitle").toString().replaceAll("\"", "\\\\\""));
        params.put("DOC_TITLE", params.get("DOC_TITLE").toString().replaceAll("\"", "\\\\\""));

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

    /** 결재선 지정 (위임전결 설정 이미지*/
    @RequestMapping("/approval/priorPop.do")
    public String priorPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("data", commonService.ctDept((String) loginVO.getOrgnztId()));
        model.addAttribute("loginVO", loginVO);

        return "popup/approval/popup/priorPop";
    }

    /**
     * 결재선 지정 (사용자 부재체크)
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/approval/getAbsentSetChk")
    public String getAbsentSetChk(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO user = (LoginVO) session.getAttribute("LoginVO");

        params.put("loginVO", user);
        Map<String, Object> dupleResult = approvalUserService.getAbsentDuplicate(params);

        int cnt = ((Integer)dupleResult.get("cnt")).intValue();
        model.addAttribute("pathName", dupleResult.get("pathName"));

        List<Map<String, Object>> dupleList = (List<Map<String, Object>>)dupleResult.get("dupleList");

        model.addAttribute("dupleList", dupleList);

        String aiFlag = EgovStringUtil.isNullToString(params.get("c_aiflag"));
        if (cnt > 1 && !aiFlag.equals("1")) {
            model.addAttribute("MSG", "부재자가 설정하려는 기간에 부재중으로 지정되어있어 부재중으로 설정할 수 없습니다.");
            return "jsonView";
        }

        return "jsonView";
    }

    /** 참조문서 팝업 */
    @RequestMapping("/approval/approvalReferencesSelectPop.do")
    public String approvalReferencesSelectPop(HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);

        return "popup/approval/popup/approvalReferencesSelectPop";
    }

    /** 참조문서 팝업 리스트 */
    @RequestMapping("/approval/getFinalApprovalDocList.do")
    public String getFullDocumentInfoList(@RequestParam Map<String, Object> params, Model model) {
        model.addAttribute("rs", approvalService.getFinalApprovalDocList(params));
        return "jsonView";
    }

    /** 결재선 지정 */
    @RequestMapping("/approval/approvalReaderSelectPopup.do")
    public String approvalReaderSelectPopup(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("data", commonService.ctDept((String) loginVO.getOrgnztId()));
        model.addAttribute("loginVO", loginVO);

        return "popup/approval/popup/approvalReaderSelectPopup";
    }

    /** 결재선 지정 (뷰어)*/
    @RequestMapping("/approval/approvalReaderSelectPopup2.do")
    public String approvalReaderSelectPopup2(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("data", commonService.ctDept((String) loginVO.getOrgnztId()));
        model.addAttribute("loginVO", loginVO);

        return "popup/approval/popup/approvalReaderSelectPopup2";
    }

    /** 상신전 부여할 문서번호 조회 */
    @RequestMapping("/approval/getDeptDocNum")
    @ResponseBody
    public Map<String, Object> getDeptDocNum(@RequestParam Map<String, Object> params, Model model) {

        Map<String, Object> result = new HashMap<>();
        result.put("rs", approvalService.getDeptDocNum(params));
        return result;
    }

    /** 결재자 부재체크 */
    @RequestMapping("/approval/getIsExistsAbsent")
    public String getIsExistsAbsent(@RequestParam Map<String, Object> params, Model model) {
        model.addAttribute("rs", approvalService.getIsExistsAbsent(params));
        return "jsonView";
    }

    /**결재문서 결재자 열람시간 업데이트 */
    @RequestMapping("/approval/setDocApproveRouteReadDt.do")
    public String setDocApproveRouteReadDt(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        approvalService.setDocApproveRouteReadDt(params);
        return "jsonView";
    }

    /** 결재문서 상신, 재상신 */
    @RequestMapping("/approval/setApproveDraftInit")
    @ResponseBody
    public Map<String, Object> setApproveDraftInit(@RequestParam Map<String, Object> params, Model model) throws IOException {

        Map<String, Object> result = new HashMap<>();

        /** 한글기안기 문서가 읽히지 않았을 때 재요청 */
        try {
            /** 공백일때 */
            if(EgovStringUtil.nullConvert(params.get("docHWPFileData")).equals("")){
                result.put("code", 500);
                return result;
                /*throw new Exception();*/
            }
        /** docHWPFileData 자체가 없을 때 */
        } catch (Exception e) {
            e.printStackTrace();
            result.put("code", 500);
            return result;
        }

        approvalService.setApproveDocInfo(params, BASE_DIR);
        result.put("code", 200);
        result.put("params", params);
        return result;
    }

    /** 결재라인 보기 */
    @RequestMapping("/approval/approvalLineViewPop.do")
    public String approvalLineViewPop(@RequestParam Map<String, Object> params, Model model) {
        model.addAttribute("approvalLineList", approvalService.getDocApproveAllRoute(params));
        model.addAttribute("approvalLineList2", new Gson().toJson(approvalService.getDocApproveAllRoute(params)));

        return "popup/approval/popup/approvalLineViewPop";
    }

    /** 결재자별 결재상태 공통코드 조회 */
    @RequestMapping("/approval/getCmCodeInfo")
    public String getCmCodeInfo(@RequestParam Map<String, Object> params, Model model) {
        model.addAttribute("rs", approvalService.getByApproveCmCodeInfo(params));
        return "jsonView";
    }

    /** 결재문서 결재, 반려 */
    @RequestMapping("/approval/setDocApproveNReturn")
    @ResponseBody
    public Map<String, Object> setDocApproveNReturn(@RequestParam Map<String, Object> params, Model model) throws IOException {
        approvalService.setDocApproveNReturn(params, BASE_DIR);
        return params;
    }

    /** 결재문서 열람자 저장*/
    @RequestMapping("/approval/setReaderSave")
    public String setReaderSave(@RequestParam Map<String, Object> params, Model model) throws IOException {

        Map<String, Object> result = new HashMap<>();
        try {
            approvalService.setReaderSave(params, BASE_DIR);
            result.put("code", "200");
            result.put("message", "결재선 저장이 완료되었습니다.");
        } catch (Exception e) {
            result.put("code", "500");
            result.put("message", "결재선 저장 중 에러가 발생했습니다.");
        }

        model.addAttribute("result", result);
        return "jsonView";
    }

    /** 결재문서 결재취소 */
    @RequestMapping("/approval/setDocApproveCancel.do")
    public String setDocApproveCancel(@RequestParam Map<String, Object> params, Model model) throws IOException {
        approvalService.setDocApproveCancel(params, BASE_DIR);
        return "jsonView";
    }

    /** 문서 회수 */
    @RequestMapping("/approval/setApproveRetrieve")
    public String setApproveRetrieve(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) throws IOException {
        approvalService.setApproveRetrieve(params);
        return "jsonView";
    }

    /** 결재문서 상세보기 */
    @RequestMapping("/approval/approvalDocView.do")
    public String approvalDocView(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        String hwpUrl = "";

        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        params.put("empSeq", loginVO.getUniqId());
        params.put("deptSeq", loginVO.getOrgnztId());

        Map<String, Object> rs = approvalService.getDocInfoApproveRoute(params);
        rs.put("approveNowRoute", approvalService.getDocApproveNowRoute(params));
        rs.put("approvePrevRoute", approvalService.getDocApprovePrevRoute(params));

        model.addAttribute("docContent", rs.get("docContent"));
        rs.remove("docContent");
        params.remove("absentUserQuery");

        if(request.getServerName().contains("localhost") || request.getServerName().contains("127.0.0.1")){
            hwpUrl = commonCodeService.getHwpCtrlUrl("l_hwpUrl");
        }else{
            hwpUrl = commonCodeService.getHwpCtrlUrl("s_hwpUrl");
        }
        params.put("hwpUrl", hwpUrl);

        model.addAttribute("hwpUrl", hwpUrl);
        model.addAttribute("params", new Gson().toJson(params));
        model.addAttribute("rs", new Gson().toJson(rs));
        model.addAttribute("loginVO", new Gson().toJson(loginVO));
        model.addAttribute("toDate", getCurrentDateTime());

        return "popup/approval/popup/approvalDocView";
    }

    /** 결재문서 상세보기 */
    @RequestMapping("/approval/approvalDocView2.do")
    public String approvalDocView2(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        String hwpUrl = "";

        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        params.put("empSeq", loginVO.getUniqId());
        params.put("deptSeq", loginVO.getOrgnztId());

        Map<String, Object> rs = approvalService.getDocInfoApproveRoute(params);
        rs.put("approveNowRoute", approvalService.getDocApproveNowRoute(params));
        rs.put("approvePrevRoute", approvalService.getDocApprovePrevRoute(params));

        model.addAttribute("docContent", rs.get("docContent"));
        rs.remove("docContent");
        params.remove("absentUserQuery");

        if(request.getServerName().contains("localhost") || request.getServerName().contains("127.0.0.1")){
            hwpUrl = commonCodeService.getHwpCtrlUrl("l_hwpUrl");
        }else{
            hwpUrl = commonCodeService.getHwpCtrlUrl("s_hwpUrl");
        }
        params.put("hwpUrl", hwpUrl);

        model.addAttribute("hwpUrl", hwpUrl);
        model.addAttribute("params", new Gson().toJson(params));
        model.addAttribute("rs", new Gson().toJson(rs));
        model.addAttribute("loginVO", new Gson().toJson(loginVO));
        model.addAttribute("toDate", getCurrentDateTime());

        return "popup/approval/popup/approvalDocView";
    }

    /** 결재문서 rs */
    @RequestMapping("/approval/getDocViewRs")
    public String getDocViewRs(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        params.put("empSeq", loginVO.getUniqId());
        params.put("deptSeq", loginVO.getOrgnztId());

        Map<String, Object> rs = approvalService.getDocInfoApproveRoute(params);
        rs.put("approveNowRoute", approvalService.getDocApproveNowRoute(params));
        rs.put("approvePrevRoute", approvalService.getDocApprovePrevRoute(params));
        rs.remove("docContent");

        model.addAttribute("data", rs);
        return "jsonView";
    }

    /**
     * 보안문서 페이시 로드시 (결재자, 열람자) 한번 더 체크
     * @param params
     * @param request
     * @param model
     * @return
     * @throws Exception
     */
    @RequestMapping("/approval/getDocSecurityIndexOfUserChk.do")
    public String getDocSecurityIndexOfUserChk(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) throws Exception {
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        boolean check = approvalService.getDocSecurityIndexOfUserChk(params);

        model.addAttribute("confirm", check);
        return "jsonView";
    }

    /** 결재문서 열람자 열람시간 업데이트 */
    @RequestMapping("/approval/setDocReaderReadUser")
    @ResponseBody
    public Map<String, Object> setDocReaderReadUser(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        approvalService.setDocReaderReadUser(params);
        return params;
    }

    /** 결재문서 첨부파일 리스트 */
    @RequestMapping("/approval/getDocAttachmentList")
    @ResponseBody
    public Map<String, Object> getDocAttachmentList(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        Map<String, Object> result = new HashMap<>();
        result.put("list", approvalService.getDocAttachmentList(params));
        return result;
    }

    /** 의견 리스트 */
    @RequestMapping("/approval/getDocApproveHistOpinList")
    public String getDocApproveHistOpinList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", approvalService.getDocApproveHistOpinList(params));
        return "jsonView";
    }

    /** 결재이력 리스트 */
    @RequestMapping("/approval/getDocApproveStatusHistList.do")
    public String getDocApproveHistList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", approvalService.getDocApproveStatusHistList(params));
        return "jsonView";
    }

    /** 열람자 이력 리스트 */
    @RequestMapping("/approval/getDocReaderHistList")
    public String getDocReaderHistList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", approvalService.getDocReaderHistList(params));
        return "jsonView";
    }

    /** 재상신시 반려된 문서 조회 */
    @RequestMapping("/approval/getReturnDocDataInfo")
    public String getReturnDocDataInfo(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        model.addAttribute("rs", approvalService.getDocInfoApproveRoute(params));
        model.addAttribute("docFileList", approvalService.getDocAttachmentList(params));
        model.addAttribute("comCode", commonCodeService.getCmCodeInfo(params));
        return "jsonView";
    }

    /** 상신, 재상신 문서저장 후 파일 업로드 */
    @RequestMapping("/approval/setApproveDraftFileInit.do")
    public String setApproveDraftFileInit(@RequestParam Map<String, Object> params, @RequestParam("files") MultipartFile[] mpf, HttpServletRequest request, Model model) throws IOException {
        System.out.println("----------------------------------------- [ /approval/setApproveDraftFileInit.do ] -----------------------------------------");
        approvalService.setApproveDraftFile(params, mpf, SERVER_DIR, BASE_DIR);
        model.addAttribute("params", params);
        return "jsonView";
    }

    /** 결재 재상신 할때 formId 업데이트 */
    @RequestMapping("/approval/setFormIdUpd")
    public String setFormIdUpd(@RequestParam Map<String, Object> params, Model model) {
        try{
            approvalService.setFormIdUpd(params);
            model.addAttribute("params", params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
            model.addAttribute("code", 500);
        }
        return "jsonView";
    }

    @RequestMapping("/approval/getDraftEmpSeq")
    public String getDraftEmpSeq(@RequestParam Map<String, Object> params, Model model){
        Map<String, Object> data = new HashMap<>();
        data = approvalService.getDraftEmpSeq(params);
        model.addAttribute("data", data);
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
