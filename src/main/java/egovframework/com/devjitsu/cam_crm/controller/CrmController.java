package egovframework.com.devjitsu.cam_crm.controller;

import egovframework.com.devjitsu.cam_crm.service.CrmService;
import egovframework.com.devjitsu.cam_manager.service.ManageService;
import egovframework.com.devjitsu.common.service.CommonCodeService;
import egovframework.com.devjitsu.common.service.CommonService;
import egovframework.com.devjitsu.common.utiles.MailUtil;
import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import egovframework.com.devjitsu.inside.userManage.service.UserManageService;
import egovframework.com.devjitsu.system.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
public class CrmController {

    @Autowired
    private CrmService crmService;

    @Autowired
    private CommonCodeService commonCodeService;

    @Autowired
    private UserManageService userManageService;

    @Autowired
    private CommonService commonService;

    @Autowired
    private ManageService manageService;

    @Autowired
    private MessageService messageService;

    @Value("#{properties['File.Server.Dir']}")
    private String SERVER_DIR;

    @Value("#{properties['File.Base.Directory']}")
    private String BASE_DIR;

    @Value("#{properties['Dev.Mail.SMTPServer']}")
    private String SMTPServer;

    @Value("#{properties['Dev.Mail.SMTPPort']}")
    private int SMTPPort;

    @Value("#{properties['Dev.Mail.SMTPID']}")
    private String SMTPID;

    @Value("#{properties['Dev.Mail.SMTPPW']}")
    private String SMTPPW;

    @RequestMapping("/crm/crmView.do")
    public String crmView(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());

        model.addAttribute("loginVO", session.getAttribute("loginVO"));

        return "/cam_crm/crmView";
    }

    /**
     * 고객 리스트
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/crm/getCrmList")
    public String getCrmList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", crmService.getCrmList(params));
        return "jsonView";
    }

    /**
     * 고객 삭제(이력 같이 삭제)
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/crm/setCrmDel.do")
    public String setCrmDel(@RequestParam Map<String, Object> params, Model model){
        crmService.setCrmDel(params);
        return "jsonView";
    }

    /**
     * 고객등록 양식 다운로드
     * @param request
     * @return
     */
    @RequestMapping("/crm/crmRegTemplateDown.do")
    public void crmRegTemplateDown(HttpServletRequest request, HttpServletResponse response) throws IOException {
        crmService.crmRegTemplateDown(request, response);
    }

    /**
     * crm 고객등록 엑셀 업로드
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/crm/crmExcelUpload.do")
    public String crmExcelUpload(@RequestParam Map<String, Object> params, MultipartHttpServletRequest request, Model model) throws Exception{
        crmService.crmExcelUpload(params, request);
        return "jsonView";
    }

    @RequestMapping("/crm/pop/popCrmList.do")
    public String popCrmList(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);
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
        model.addAttribute("rsFile", crmService.getCrmAccounting(params));

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

    @RequestMapping("/crm/crmReqCheck")
    public String crmReqCheck(@RequestParam Map<String, Object> params, Model model) {
        model.addAttribute("chk", crmService.crmReqCheck(params));
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

    /**
     * 고객 산업분야 조회
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/crm/getCrmIndustry.do")
    public String getCrmIndustry(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("data", crmService.getCrmIndustry(params));
        return "jsonView";
    }

    /**
     * 고객 산업분야 저장/수정
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/crm/setCrmIndustry.do")
    public String setCrmIndustry(@RequestParam Map<String, Object> params, Model model){
        crmService.setCrmIndustry(params);
        return "jsonView";
    }

    /**
     * 고객 인증정보 조회
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/crm/getCrmCert.do")
    public String getCrmCert(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("data", crmService.getCrmCert(params));
        return "jsonView";
    }

    /**
     * 고객 인증정보 저장/수정
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/crm/setCrmCert.do")
    public String setCrmCert(@RequestParam Map<String, Object> params, Model model){
        crmService.setCrmCert(params);
        return "jsonView";
    }

    /**
     * 고객 회계정보 조회
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/crm/getCrmAccounting.do")
    public String getCrmAccounting(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("data", crmService.getCrmAccounting(params));
        return "jsonView";
    }

    /**
     * 고객 회계정보 저장/수정
     * @param params
     * @return
     */
    @RequestMapping("/crm/setCrmAccounting.do")
    public String setCrmAccounting(@RequestParam Map<String, Object> params, MultipartHttpServletRequest request){
        crmService.setCrmAccounting(params, request, SERVER_DIR, BASE_DIR);
        return "jsonView";
    }

    /**
     * 고객 최근경영규모 조회
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/crm/getCrmMgScale.do")
    public String getCrmMgScale(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("data", crmService.getCrmMgScale(params));
        return "jsonView";
    }

    /**
     * 고객 최근경영규모 저장/수정
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/crm/setCrmMgScale.do")
    public String setCrmMgScale(@RequestParam Map<String, Object> params, Model model){
        crmService.setCrmMgScale(params);
        return "jsonView";
    }

    /**
     * 고객 관심분야 조회
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/crm/getCrmInterests.do")
    public String getCrmInterests(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("data", crmService.getCrmInterests(params));
        return "jsonView";
    }

    /**
     * 고객 관심분야 저장/수정
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/crm/setCrmInterests.do")
    public String setCrmInterests(@RequestParam Map<String, Object> params, Model model){
        crmService.setCrmInterests(params);
        return "jsonView";
    }

    /**
     * 고객 이력관리 페이지
     * @param model
     * @param request
     * @return
     */
    @RequestMapping("/crm/crmHistView.do")
    public String crmHistView(Model model, HttpServletRequest request){

        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);

        return "/cam_crm/crmHistView";
    }

    /**
     * 고객 이력관리 리스트
     * @param params
     * @param model
     * @param request
     * @return
     */
    @RequestMapping("/crm/getCrmHistList")
    public String getCrmHistList(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("list", crmService.getCrmHistList(params));

        return "jsonView";
    }

    /**
     * 이력관리 상세보기 팝업
     * @param request
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/crm/pop/crmHistViewPop.do")
    public String regCrmHistViewPop(HttpServletRequest request, @RequestParam Map<String, Object> params, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", loginVO);
        model.addAttribute("rs", crmService.getCrmHist(params));
        return "popup/cam_crm/crmHistViewPop";
    }

    /**
     * 이력관리 관계이력 리스트
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/crm/getCrmHistDetailList")
    public String getCrmHistDetailList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", crmService.getCrmHistDetailList(params));
        return "jsonView";
    }

    /**
     * 이력관리 엔지니어링 리스트
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/crm/getCrmHistEngnList")
    public String getCrmHistEngnList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", crmService.getCrmHistEngnList(params));
        return "jsonView";
    }

    /**
     * 이력관리 R&D 리스트
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/crm/getCrmHistRndList")
    public String getCrmHistRndList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", crmService.getCrmHistRndList(params));
        return "jsonView";
    }

    /**
     * 이력관리 비 R&D 리스트
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/crm/getCrmHistNonRndList")
    public String getCrmHistNonRndList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", crmService.getCrmHistNonRndList(params));
        return "jsonView";
    }

    /**
     * 이력관리 등록 팝업
     * @param request
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/crm/pop/regCrmHistPop.do")
    public String regCrmHistPop(HttpServletRequest request, @RequestParam Map<String, Object> params, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "popup/cam_crm/regCrmHistPop";
    }

    /**
     * 이력등록
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/crm/setCrmHist")
    public String setCrmHist(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        try{
            crmService.setCrmHist(params);

            // 메일발송체크
            if(params.containsKey("mailChk")) {
                MailUtil mailUtil = new MailUtil();
                String[] empSeqArr = params.get("crmShareEmp").toString().split(",");
                Map<String, Object> tempParams = new HashMap<>();

                String contents = "<div>" +
                        "<p style='font-size: 10px; text-align: left;'>[캠스팟 2.0] 캠CRM 고객관계이력 공유 알림</p>" +
                        "<p></p>" +
                        "<p style='font-size: 10px; text-align: left;'>[ " + params.get("crmNm") + " ]의 관계이력이 등록되었습니다.</p>" +
                        "<p style='font-size: 10px; text-align: left;'>해당내용은 [캠스팟2.0 캠CRM - 고객관리] 메뉴에서 확인할 수 있습니다.</p>" +
                        "</div>";

                for (String empSeq : empSeqArr) {
                    tempParams.put("sn", empSeq);
                    Map<String, Object> empInfo = manageService.getEmpInfo(tempParams);

                    tempParams.put("receiveEml", empInfo.get("EMAIL_ADDR"));
                    tempParams.put("sendEml", "camtic-send@camtic.or.kr");
                    tempParams.put("subject", "[캠스팟 2.0] 캠CRM 고객관계이력 공유 알림");
                    tempParams.put("contents", contents);

                    try {
                        mailUtil.mailHistSendMail(tempParams, SMTPServer, SMTPPort, SMTPID, SMTPPW);
                    } catch(Exception e){
                        e.printStackTrace();
                    }
                }
            }

            // SMS발송체크
            if(params.containsKey("smsChk")) {
                HttpSession session = request.getSession();
                LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

                String[] empSeqArr = params.get("crmShareEmp").toString().split(",");
                Map<String, Object> tempParams = new HashMap<>();

                String contents = "" +
                        "[캠스팟 2.0] 캠CRM 고객관계이력 공유 알림\n" +
                        "[ " + params.get("crmNm") + " ]의 관계이력이 등록되었습니다.\n" +
                        "해당내용은 [캠스팟2.0 캠CRM - 고객관리] 메뉴에서 확인할 수 있습니다.\n";

                Date currentDate = new Date();
                SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMddHHmmss");

                for (String empSeq : empSeqArr) {
                    tempParams.put("sn", empSeq);
                    Map<String, Object> empInfo = manageService.getEmpInfo(tempParams);

                    tempParams.put("receiveEml", empInfo.get("EMAIL_ADDR"));
                    tempParams.put("sendEml", "camtic-send@camtic.or.kr");

                    tempParams.put("dest_phone", empInfo.get("EMP_NAME_KR") + "^" + empInfo.get("MOBILE_TEL_NUM"));
                    tempParams.put("msg_content", contents);
                    tempParams.put("pkDate", dateFormat.format(currentDate));
                    tempParams.put("loginEmpSeq", loginVO.getUniqId());

                    messageService.msgSend(tempParams);
                }
            }

            model.addAttribute("params", params);

        } catch (Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    /**
     * crm 제조업체총람 페이지
     * @param model
     * @param request
     * @return
     */
    @RequestMapping("/crm/mfOverview.do")
    public String mfOverView(Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", loginVO);
        return "/cam_crm/mfOverview";
    }

    /**
     * 제조업체총람 데이터 삭제
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/crm/setMfOverviewDel.do")
    public String setMfOverviewDel(@RequestParam Map<String, Object> params, Model model){
        crmService.setMfOverviewDel(params);
        return "jsonView";
    }

    /**
     * 고객관리 데이터 실태조사 테이블로 최신화
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/crm/setMfOverviewByCrmInfoUpd.do")
    public String setMfOverviewByCrmInfoUpd(@RequestParam Map<String, Object> params, Model model){
        crmService.setMfOverviewByCrmInfoUpd(params);
        return "jsonView";
    }

    /**
     * crm 제조업체총람 상세보기
     * @param model
     * @param request
     * @return
     */
    @RequestMapping("/crm/pop/mfOverviewPop.do")
    public String mfOverviewPop(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", loginVO);
        model.addAttribute("data", crmService.getMfOverviewInfo(params));
        model.addAttribute("params", params);

        return "popup/cam_crm/mfOverviewPop";
    }

    /**
     * 제조업체총람 상세보기 데이터
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/crm/getMfOverviewInfo")
    public String getMfOverviewInfo(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("data", crmService.getMfOverviewInfo(params));
        return "jsonView";
    }

    /**
     * 제조업체총람 상세보기 선택데이터 추이
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/crm/getMfOverviewStatInfo.do")
    public String getMfOverviewStatInfo(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("data", crmService.getMfOverviewStatInfo(params));
        return "jsonView";
    }


    /**
     * 제조업체총람 지역별 통계
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/crm/getMfOverviewAreaStat")
    public String getMfOverviewAreaStat(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("data", crmService.getMfOverviewAreaStat(params));
        return "jsonView";
    }

    /**
     * 제조업체총람 리스트
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/crm/getMfOverviewList")
    public String getMfOverviewList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("data", crmService.getMfOverviewList(params));
        return "jsonView";
    }

    /**
     * 실태조사 양식 다운로드
     * @param request
     * @return
     */
    @RequestMapping("/crm/templateExcelFormDown.do")
    public void templateExcelFormDown(HttpServletRequest request, HttpServletResponse response) throws IOException {
        crmService.templateExcelFormDown(request, response);
    }

    /**
     * 제조업체 총람 엑셀 업로드 팝업
     * @param model
     * @param request
     * @return
     */
    @RequestMapping("/crm/pop/mfExcelUploadPop.do")
    public String mfExcelUploadPop(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "popup/cam_crm/mfExcelUploadPop";
    }

    /**
     * crm 실태조사 엑셀 업로드
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/crm/mfExcelUpload.do")
    public String mfExcelUpload(@RequestParam Map<String, Object> params, MultipartHttpServletRequest request, Model model) throws Exception{
        crmService.mfExcelUpload(params, request);
        return "jsonView";
    }

    /**
     * crm 코드 관리
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/crm/codeManagement.do")
    public String codeManagement(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){

        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("loginVO");
        session.setAttribute("menuNm", request.getRequestURI());

        return "cam_crm/codeManagement";
    }

    /**
     * crm 그룹코드 리스트
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/crm/groupCodeList")
    public String groupCodeList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", crmService.groupCodeList(params));
        return "jsonView";
    }

    /**
     * crm 코드 리스트
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/crm/codeList")
    public String codeList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", crmService.codeList(params));
        return "jsonView";
    }

    /**
     * crm 그룹코드 저장
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/crm/saveGroupCode")
    public String saveGroupCode(@RequestParam Map<String, Object> params, Model model){
        crmService.saveGroupCode(params);
        return "jsonView";
    }

    /**
     * crm 하위 코드 저장
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/crm/insSetLgCode")
    public String insSetLgCode(@RequestParam Map<String, Object> params, Model model){
        crmService.insSetLgCode(params);
        model.addAttribute("code", 200);
        return "jsonView";
    }

    @RequestMapping("/crm/smCodeList")
    @ResponseBody
    public List<Map<String, Object>> smCodeList(@RequestParam Map<String, Object> params, Model model){
        List<Map<String, Object>> list = new ArrayList<>();

        list = crmService.smCodeList(params);
        return list;
    }

    @RequestMapping("/crm/insCrmCode")
    public String insCrmCode(@RequestParam Map<String, Object> params, Model model){
        crmService.insCrmCode(params);
        model.addAttribute("code", 200);
        return "jsonView";
    }

    @RequestMapping("/crm/selLgCode")
    public String selLgCode(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("rs", crmService.selLgCode(params));
        return "jsonView";
    }

    @RequestMapping("/crm/selSmCode")
    public String selSmCode(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("rs", crmService.selSmCode(params));
        return "jsonView";
    }

    @RequestMapping("/crm/selLgSmCode")
    public String selLgSmCode(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("rs", crmService.selLgSmCode(params));
        return "jsonView";
    }

    /**
     * mou 협약
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/crm/mouAgreement.do")
    public String mouAgreement(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        session.setAttribute("menuNm", request.getRequestURI());

        model.addAttribute("loginVO", loginVO);

        return "cam_crm/mouAgreement";
    }

    /** mou 둥록 팝업 */
    @RequestMapping("/crm/pop/regMouAgrPop.do")
    public String regMouAgrPop(HttpServletRequest request, @RequestParam Map<String, Object> params, Model model){

        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("menuCd", request.getServletPath().split("/")[1]);
        model.addAttribute("data", commonService.commonCodeList(params));
        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "popup/cam_crm/regMouAgrPop";
    }

    /** mou 정보 등록 */
    @RequestMapping("/crm/setMouAgrInfo")
    public String setMouAgrInfo(@RequestParam Map<String, Object> params, MultipartHttpServletRequest request, Model model){
        MultipartFile[] mouFiles = request.getFiles("mouFiles").toArray(new MultipartFile[0]);
        crmService.setMouAgrInfo(params, mouFiles, SERVER_DIR, BASE_DIR);
        model.addAttribute("params", params);
        return "jsonView";
    }

    /** mou 리스트 조회 */
    @RequestMapping("/crm/getMouAgrList")
    public String getMouAgrList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", crmService.getMouAgrList(params));
        return "jsonView";
    }

    /** mou 리스트 삭제 */
    @RequestMapping("/crm/setMouAgrSnDel")
    public String setMouAgrSnDel(@RequestParam Map<String, Object> params){
        crmService.setMouAgrSnDel(params);
        return "jsonView";
    }

    /** mou 체결기관 리스트 조회 */
    @RequestMapping("/crm/getMouCrmList")
    public String getMouCrmList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", crmService.getMouCrmList(params));
        return "jsonView";
    }

    /** mou 체결기관 저장 */
    @RequestMapping("/crm/setMouAgrCrmInfo")
    public String setMouAgrCrmInfo(@RequestParam Map<String, Object> params){
        crmService.setMouAgrCrmInfo(params);
        return "jsonView";
    }

    /** mou 체결기관 삭제 */
    @RequestMapping("/crm/setMouCrmSnDel")
    public String setMouCrmSnDel(@RequestParam Map<String, Object> params){
        crmService.setMouCrmSnDel(params);
        return "jsonView";
    }

    /** mou 수정시 데이터 조회 */
    @RequestMapping("/crm/getMouArgInfo")
    public String getMouArgInfo(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("loginVO");

        model.addAttribute("data", crmService.getMouArgInfo(params));
        model.addAttribute("fileInfo", crmService.getMouAgrFileInfo(params));
        model.addAttribute("loginVO", loginVO);

        return "jsonView";
    }

    /** mou 체결기관 등록 팝업창 */
    @RequestMapping("/crm/pop/popMouAgrList.do")
    public String popMouAgrList(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("menuCd", request.getServletPath().split("/")[1]);
        model.addAttribute("data", commonService.commonCodeList(params));
        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "popup/cam_crm/popMouAgrList";
    }

    @RequestMapping("/crm/customerCondition.do")
    public String customerCondition(Model model, HttpServletRequest request){

        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);

//        model.addAttribute("crmData", crmService.getCustomerCondition());
        return "/cam_crm/customerCondition";
    }

    @RequestMapping("/crm/customerIndustryCondition.do")
    public String customerIndustryCondition(Model model, HttpServletRequest request){

        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        return "/cam_crm/customerIndustryCondition";
    }

    @RequestMapping("/crm/customerDeptRelation.do")
    public String customerDeptRelation(Model model, HttpServletRequest request){

        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        return "/cam_crm/customerDeptRelation";
    }

    @RequestMapping("/crm/getDeptRelationList")
    public String getDeptRelationList(@RequestParam Map<String, Object> params, Model model){

        Map<String, Object> map = new HashMap<>();

        List<Map<String, Object>> deptList = new ArrayList<>();
        deptList = userManageService.getDeptCodeList2(params);

        for(Map<String, Object> dept : deptList){
            params.put("deptSeq", dept.get("deptSeq"));
            for(int i = 1 ; i < 13 ; i++){
                params.put("mon", i);
                Integer monCnt = 0;
                try{
                    monCnt =crmService.getDeptRelationCnt(params);
                } catch (Exception e){
                    monCnt = 0;
                }

                dept.put("mon" +i, monCnt);
            }
        }

        model.addAttribute("deptList", deptList);
        return "jsonView";
    }

    @RequestMapping("/crm/getCustomerCondition.do")
    public String getCustomerCondition(Model model){
        model.addAttribute("list", crmService.getCustomerCondition());
        return "jsonView";
    }

    @RequestMapping("/crm/getCustomerIndustryCondition.do")
    public String getCustomerIndustryCondition(Model model){
        model.addAttribute("list", crmService.getCustomerIndustryCondition());
        return "jsonView";
    }

    @RequestMapping("/crm/variousCondition.do")
    public String variousCondition(Model model, HttpServletRequest request){

        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);

        return "/cam_crm/variousCondition";
    }

    @RequestMapping("/crm/pop/crmMemSel.do")
    public String crmMemSel(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("params", params);
        return "popup/cam_crm/crmMemSel";
    }
}
