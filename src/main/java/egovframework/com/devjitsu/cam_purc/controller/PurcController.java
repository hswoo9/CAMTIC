package egovframework.com.devjitsu.cam_purc.controller;


import com.google.gson.Gson;
import egovframework.com.devjitsu.cam_project.service.ProjectService;
import egovframework.com.devjitsu.cam_purc.service.PurcService;
import egovframework.com.devjitsu.common.service.CommonCodeService;
import egovframework.com.devjitsu.common.service.CommonService;
import egovframework.com.devjitsu.common.utiles.MailUtil;
import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import egovframework.com.devjitsu.system.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
public class PurcController {
    @Autowired
    private PurcService purcService;

    @Autowired
    private CommonCodeService commonCodeService;

    @Autowired
    private CommonService commonService;

    @Autowired
    private ProjectService projectService;

    @Autowired
    private MessageService messageService;

    @Value("#{properties['File.Server.Dir']}")
    private String SERVER_DIR;

    @Value("#{properties['File.Base.Directory']}")
    private String BASE_DIR;


    @Value("#{properties['Dev.Mail.SMTPName']}")
    private String SMTPName;
    @Value("#{properties['Dev.Mail.SMTPMail']}")
    private String SMTPMail;
    @Value("#{properties['Dev.Mail.SMTPServer']}")
    private String SMTPServer;
    @Value("#{properties['Dev.Mail.SMTPPort']}")
    private int SMTPPort;
    @Value("#{properties['Dev.Mail.SMTPID']}")
    private String SMTPID;
    @Value("#{properties['Dev.Mail.SMTPPW']}")
    private String SMTPPW;
    @Value("#{properties['Dev.Mail.MailPath']}")
    private String MailPath;

    /**
     * 구매요청관리 리스트
     * @param params
     * @param model
     * @param request
     * @return
     */
    @RequestMapping("/purc/purcReqList.do")
    public String purcReqList(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        session.setAttribute("menuNm", request.getRequestURI());
        model.addAttribute("loginVO", loginVO);

        if(loginVO == null){
            return "error/error";
        }

        return "cam_purc/user/purcReqList";
    }

    @RequestMapping("/purc/purcMngReqList.do")
    public String purcMngReqList(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        session.setAttribute("menuNm", request.getRequestURI());
        model.addAttribute("loginVO", loginVO);

        if(loginVO == null){
            return "error/error";
        }

        return "cam_purc/mng/purcMngReqList";
    }

    /**
     * 구매요청관리 리스트
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/purc/getPurcReqList.do")
    public String getPurcReqList(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request) {
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("list", purcService.getPurcReqList(params));

        if(loginVO == null){
            return "error/error";
        }

        return "jsonView";
    }

    /**
     * 구매요청관리 리스트 (청구기준)
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/purc/getPurcReqClaimList.do")
    public String getPurcReqClaimList(@RequestParam Map<String, Object> params, Model model) {
        model.addAttribute("list", purcService.getPurcReqClaimList(params));
        return "jsonView";
    }

    /**
     * 구매요청품목 리스트
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/purc/getPjtPurcItemList")
    public String getPjtPurcItemList(@RequestParam Map<String, Object> params, Model model) {
        model.addAttribute("list", purcService.getPjtPurcItemList(params));
        return "jsonView";
    }

    /**
     * 구매요청서 작성페이지
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/purc/pop/regPurcReqPop.do")
    public String regPurcReqPop(HttpServletRequest request, @RequestParam Map<String, Object> params, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        if(params.containsKey("pjtSn")){
            model.addAttribute("pjtData", projectService.getProjectData(params));
        }

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "popup/cam_purc/user/regPurcReqPop";
    }

    /**
     * 구매요청 저장/수정
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/purc/setPurcReq.do")
    public String setPurcReq(@RequestParam Map<String, Object> params, Model model, MultipartHttpServletRequest request) {
        MultipartFile[] file = request.getFiles("file1").toArray(new MultipartFile[0]);
        purcService.setPurcReq(params, file, request, SERVER_DIR, BASE_DIR);

        model.addAttribute("params", params);
        return "jsonView";
    }

    /**
     * 구매요청 저장/수정
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/purc/getPurcReq.do")
    public String getPurcReq(@RequestParam Map<String, Object> params, Model model) {
        model.addAttribute("data", purcService.getPurcReq(params));
        return "jsonView";
    }

    @RequestMapping("/purc/getPurcReqFileList.do")
    public String getPurcReqFileList(@RequestParam Map<String, Object> params, Model model) {
        List<Map<String, Object>> listMap = purcService.getPurcReqFileList(params);
        model.addAttribute("list", purcService.getPurcReqFileList(params));
        return "jsonView";
    }

    @RequestMapping("/purc/getMngReqPurcList")
    public String getReqPurcList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", purcService.getMngReqPurcList(params));
        return "jsonView";
    }

    /**
     * 구매요청서 전자결재 양식 페이지
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/popup/cam_purc/approvalFormPopup/purcApprovalPop.do")
    public String purcApprovalPop(HttpServletRequest request, @RequestParam Map<String, Object> params, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);
        model.addAttribute("purcItemList", purcService.getPurcItemList(params));
        Map<String, Object> data = purcService.getPurcItemAmtTotal(params);
        model.addAttribute("TOTAL_SUM_COMMA", data.get("TOTAL_SUM_COMMA"));
        model.addAttribute("TOTAL_SUM_UNCOMMA", data.get("TOTAL_SUM_UNCOMMA"));
        model.addAttribute("DISCOUNT_AMT", data.get("DISCOUNT_AMT"));

        return "popup/cam_purc/approvalFormPopup/purcApprovalPop";
    }

    /**
     * 구매청구서 전자결재 양식 페이지
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/popup/cam_purc/approvalFormPopup/claimingApprovalPop.do")
    public String claimingApprovalPop(HttpServletRequest request, @RequestParam Map<String, Object> params, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);
        model.addAttribute("purcItemList", purcService.getClaimItemList(params));
        Map<String, Object> data = purcService.getPurcClaimItemAmtTotal(params);
        model.addAttribute("data", data);
        model.addAttribute("info", purcService.getPurcClaimData(params));

        return "popup/cam_purc/approvalFormPopup/claimingApprovalPop";
    }

    /** 구매요청서 결재 상태값에 따른 UPDATE 메서드 */
    @RequestMapping(value = "/purc/purcReqApp")
    public String purcReqApp(@RequestParam Map<String, Object> bodyMap, Model model) {
        System.out.println("bodyMap");
        System.out.println(bodyMap);
        String resultCode = "SUCCESS";
        String resultMessage = "성공하였습니다.";
        try{
            purcService.updatePurcDocState(bodyMap);
        }catch(Exception e){
            resultCode = "FAIL";
            resultMessage = "연계 정보 갱신 오류 발생("+e.getMessage()+")";
        }
        model.addAttribute("resultCode", resultCode);
        model.addAttribute("resultMessage", resultMessage);
        return "jsonView";
    }

    /** 구매청구서 결재 상태값에 따른 UPDATE 메서드 */
    @RequestMapping(value = "/purc/claimReqApp")
    public String claimReqApp(@RequestParam Map<String, Object> bodyMap, Model model) {
        System.out.println("bodyMap");
        System.out.println(bodyMap);
        String resultCode = "SUCCESS";
        String resultMessage = "성공하였습니다.";
        try{
            purcService.updateClaimDocState(bodyMap);
        }catch(Exception e){
            resultCode = "FAIL";
            resultMessage = "연계 정보 갱신 오류 발생("+e.getMessage()+")";
        }
        model.addAttribute("resultCode", resultCode);
        model.addAttribute("resultMessage", resultMessage);
        return "jsonView";
    }

    @RequestMapping("/purc/setPurcItemStat")
    public String setPurcItemStat(@RequestParam Map<String, Object> params, Model model){
        try{
            purcService.setPurcItemStat(params);
            model.addAttribute("code", 200);
        }catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    /**
     * 구매청구관리 (관리자) 페이지
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/purc/purcClaim.do")
    public String purcClaim(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        session.setAttribute("menuNm", request.getRequestURI());
        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        if(loginVO == null){
            return "error/error";
        }

        return "cam_purc/mng/purcClaim";
    }

    /**
     * 구매할인조회 (관리자) 페이지
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/purc/purcDif.do")
    public String purcDif(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        session.setAttribute("menuNm", request.getRequestURI());
        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        if(loginVO == null){
            return "error/error";
        }

        return "cam_purc/mng/purcDif";
    }

    @RequestMapping("/purc/getPurcItemAmtTotal")
    public String getPurcItemAmtTotal(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("data", purcService.getPurcItemAmtTotal(params));
        return "jsonView";
    }

    @RequestMapping("/purc/getPurcClaimItemAmtTotal")
    public String getPurcClaimItemAmtTotal(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("data", purcService.getPurcClaimItemAmtTotal(params));
        return "jsonView";
    }

    @RequestMapping("/purc/getPurcItemList")
    public String getPurcItemList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", purcService.getPurcItemList(params));
        return "jsonView";
    }

    @RequestMapping("/purc/getClaimItemList")
    public String getClaimItemList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", purcService.getClaimItemList(params));
        return "jsonView";
    }

    @RequestMapping("/purc/getPurcClaimList")
    public String getPurcClaimList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", purcService.getPurcClaimList(params));
        return "jsonView";
    }

    @RequestMapping("/purc/getPurcClaimItemData")
    public String getPurcClaimItemData(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("data", purcService.getPurcClaimItemData(params));
        return "jsonView";
    }

    @RequestMapping("/purc/delPurcClaimData.do")
    public String delPurcClaimData(@RequestParam Map<String, Object> params, Model model){
        purcService.delPurcClaimData(params);
        model.addAttribute("params", params);
        return "jsonView";
    }

    @RequestMapping("/purc/getPurcAssetList")
    public String getPurcAssetList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", purcService.getPurcAssetList(params));
        return "jsonView";
    }

    /**
     * 구매청구서 팝업
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/purc/pop/reqClaiming.do")
    public String reqClaiming(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){

        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);
        if(params.containsKey("purcSn") || params.containsKey("claimSn")){
            model.addAttribute("map", purcService.getPurcClaimData(params));
        }

        return "popup/cam_purc/mng/reqClaiming";
    }

    @RequestMapping("/purc/setPurcClaimData")
    public String setPurcClaimData(@RequestParam Map<String, Object> params, MultipartHttpServletRequest request, Model model){

        try{
            MultipartFile[] file = request.getFiles("file1").toArray(new MultipartFile[0]);
            purcService.setPurcClaimData(params, file, request, SERVER_DIR, BASE_DIR);
            model.addAttribute("code", 200);
            model.addAttribute("params", params);
        } catch (Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/purc/getPurcClaimData")
    public String getPurcClaimData(@RequestParam Map<String, Object> params, Model model){
        if(params.containsKey("purcSn") || params.containsKey("claimSn")) {
            model.addAttribute("data", purcService.getPurcClaimData(params));
        }
        return "jsonView";
    }

    @RequestMapping("/purc/getClaimFileInfo")
    public String getClaimFileInfo(@RequestParam Map<String, Object> params, Model model){

        Map<String, Object> map = purcService.getPurcClaimDataByPayApp(params);
        List<Map<String, Object>> fileList = new ArrayList<>();
        if(map.containsKey("PURC_SN")){
            fileList = purcService.getClaimFileList(map);
        }

        model.addAttribute("data", fileList);

        return "jsonView";
    }

    @RequestMapping("/purc/setOnSiteCardPurcClaimData")
    public String setOnSiteCardPurcClaimData(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){

        try{
            HttpSession session = request.getSession();
            LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
            params.put("loginEmpSeq", loginVO.getUniqId());

            purcService.setOnSiteCardPurcClaimData(params);
            model.addAttribute("code", 200);
            model.addAttribute("params", params);
        } catch (Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    /**
     * 발주처리 팝업
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/purc/pop/reqOrder.do")
    public String reqOrder(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){

        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);
        if(params.containsKey("purcSn") || params.containsKey("claimSn")){
            model.addAttribute("map", purcService.getPurcClaimData(params));
        }

        return "popup/cam_purc/mng/reqOrder";
    }

    @RequestMapping("/purc/pop/orderPrintPop.do")
    public String orderPrintPop(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        String hwpUrl = "";
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", login);

        if(request.getServerName().contains("localhost") || request.getServerName().contains("127.0.0.1")){
            hwpUrl = commonCodeService.getHwpCtrlUrl("l_hwpUrl");
        }else{
            hwpUrl = commonCodeService.getHwpCtrlUrl("s_hwpUrl");
        }

        params.put("hwpUrl", hwpUrl);
        model.addAttribute("hwpUrl", hwpUrl);
        model.addAttribute("params", new Gson().toJson(params));
        model.addAttribute("data", params);

        return "popup/cam_manager/docPrint/orderPrintPop";
    }

    @RequestMapping("/purc/pop/orderSendMailPop.do")
    public String orderSendMailPop(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);
        return "popup/cam_purc/mng/orderSendMailPop";
    }

    @RequestMapping("/purc/orderSendMail.do")
    public String orderSendMail(@RequestParam Map<String, Object> params, MultipartHttpServletRequest request, Model model) throws MessagingException, IOException {

        MultipartFile[] file = request.getFiles("fileList").toArray(new MultipartFile[0]);
        purcService.setOrderSendMailInfo(params, file, SERVER_DIR, BASE_DIR);

        List<Map<String, Object>> fileArray = purcService.getOrderSendFileList(params);
        params.put("fileArray", fileArray);

        /** 메일 (업체) */
        /** 구매청구자 추가 2024.04.27 */
        /** 구매요청자 추가 2024.05.08 */
        HttpServletRequest servletRequest = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        if(request.getServerName().contains("localhost") || request.getServerName().contains("127.0.0.1") || servletRequest.getServerName().contains("218.158.231.186")){
            params.put("fileServer", "http://218.158.231.186");
        } else{
            params.put("fileServer", "http://218.158.231.184");
        }

        Map<String, Object> claimMap = purcService.getPurcClaimData(params);
        params.put("purcEml", claimMap.get("EMAIL_ADDR"));

        MailUtil mailUtil = new MailUtil();
        mailUtil.orderSendMail(params, SMTPServer, SMTPPort, SMTPID, SMTPPW);

        /** 문자 (구매 담당자) */
//        Map<String, Object> claimMap = purcService.getPurcClaimData(params);
        Map<String, Object> messageParam = new HashMap<>();
        messageParam.put("dest_phone", claimMap.get("EMP_NAME_KR") + "^" + claimMap.get("MOBILE_TEL_NUM"));

        String msgContents = "요청하신 구매품 " + claimMap.get("CLAIM_ITEM_CNT") + "건이 " + claimMap.get("CRM_NM") + "(으)로 발주되었습니다.";
        messageParam.put("msg_content", msgContents);

        Date currentDate = new Date();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMddHHmmss");
        messageParam.put("pkDate", dateFormat.format(currentDate));

        messageParam.put("loginEmpSeq", "admin");
        messageService.msgSend(messageParam);

        model.addAttribute("rs", "SUCCESS");
        return "jsonView";
    }

    /** 하나의 프로젝트에 대한 모든 구매 합계 pjtSn */
    @RequestMapping("/purc/getPurcSum")
    public String getPurcSum(@RequestParam Map<String, Object> params, Model model){
        Map<String, Object> data = purcService.getPurcSum(params);
        model.addAttribute("data", data);
        return "jsonView";
    }

    @RequestMapping("/purc/purcProductList.do")
    public String purcProductList(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("loginVO");
        session.setAttribute("menuNm", request.getRequestURI());

        model.addAttribute("params", params);

        if(loginVO == null){
            return "error/error";
        }

        return "cam_purc/user/purcProductList";
    }

    @RequestMapping("/purc/getPurcProductList")
    public String getPurcProductList(@RequestParam Map<String, Object> params, Model model){

        model.addAttribute("list", purcService.getPurcProductList(params));

        return "jsonView";
    }

    /**
     * 구매검수처리 작성페이지
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/purc/pop/purcInspectionPop.do")
    public String purcInspectionPop(HttpServletRequest request, @RequestParam Map<String, Object> params, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        if(params.containsKey("pjtSn")){
            model.addAttribute("pjtData", projectService.getProjectData(params));
        }

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "popup/cam_purc/user/purcInspectionPop";
    }


    /**
     * 구매검수처리 저장/수정
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/purc/updPurcInspect.do")
    public String updPurcInspect(@RequestParam Map<String, Object> params, Model model, MultipartHttpServletRequest request) {
        MultipartFile[] file = request.getFiles("file1").toArray(new MultipartFile[0]);
        purcService.updPurcInspect(params, file, SERVER_DIR, BASE_DIR);
        return "jsonView";
    }


    /**
     * 구매검수처리 저장/수정
     * @param params
     * @return
     */
    @RequestMapping("/purc/updPurcInspectStat.do")
    public String updPurcInspectStat(@RequestParam Map<String, Object> params, Model model) {
        try{
            purcService.updPurcInspectStat(params);
            model.addAttribute("code", 200);
        }catch(Exception e){
            e.printStackTrace();
        }
        return "jsonView";
    }


    /**
     * 구매내역 비자산처리
     * @param params
     * @return
     */
    @RequestMapping("/purc/updItemUnAssetStat")
    public String updItemUnAssetStat(@RequestParam Map<String, Object> params, Model model) {
        try{
            purcService.updItemUnAssetStat(params);
            model.addAttribute("code", 200);
        }catch(Exception e){
            e.printStackTrace();
        }
        return "jsonView";
    }

    @RequestMapping("/purc/getCrmInfo")
    public String getCrmInfo(@RequestParam Map<String, Object> params, Model model){

        model.addAttribute("data", purcService.getCrmInfo(params));

        return "jsonView";
    }


    /**
     * 구매내역 비자산처리
     * @param params
     * @return
     */
    @RequestMapping("/purc/setOrderInfo")
    public String setOrderInfo(@RequestParam Map<String, Object> params, Model model) {
        try{
            purcService.setOrderInfo(params);
            model.addAttribute("code", 200);
        }catch(Exception e){
            e.printStackTrace();
        }
        return "jsonView";
    }

    @RequestMapping("/purc/setOrderYnInfo")
    public String setOrderYnInfo(@RequestParam Map<String, Object> params, Model model) {
        try{
            purcService.setOrderYnInfo(params);
            model.addAttribute("code", 200);
        }catch(Exception e){
            e.printStackTrace();
        }
        return "jsonView";
    }

    @RequestMapping("/purc/getProjectPurcList")
    public String getProjectPurcList(@RequestParam Map<String, Object> params, Model model){
        List<Map<String, Object>> list = purcService.getProjectPurcList(params);
        model.addAttribute("list", list);

        return "jsonView";
    }

    @RequestMapping("/purc/getProjectPurcReqList")
    public String getProjectPurcReqList(@RequestParam Map<String, Object> params, Model model){
        List<Map<String, Object>> list = purcService.getProjectPurcReqList(params);
        model.addAttribute("list", list);

        return "jsonView";
    }

    @RequestMapping("/purc/delPurcReq.do")
    public String delPurcReq(@RequestParam Map<String, Object> params, Model model){

        purcService.delPurcReq(params);
        model.addAttribute("params", params);

        return "jsonView";
    }

    @RequestMapping("/purc/getPurcAndClaimData")
    public String getPurcAndClaimData(@RequestParam Map<String, Object> params, Model model){

        model.addAttribute("data", purcService.getPurcAndClaimData(params));

        return "jsonView";
    }

    @RequestMapping("/purc/getPurcReqClaimEmpList")
    public String getPurcReqClaimEmpList(@RequestParam Map<String, Object> params, Model model){

        List<Map<String, Object>> list = purcService.getPurcReqClaimEmpList(params);
        model.addAttribute("list", list);

        return "jsonView";
    }

    @RequestMapping("/purc/getProjectReqFile")
    public String getProjectReqFile(@RequestParam Map<String, Object> params, Model model){

        List<Map<String, Object>> list = purcService.getProjectReqFile(params);
        model.addAttribute("list", list);

        return "jsonView";
    }

    @RequestMapping("/purc/purcUserAppList.do")
    public String purcUserAppList(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());

        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        if(loginVO == null){
            return "error/error";
        }

        return "cam_purc/user/purcUserAppList";
    }

    @RequestMapping("/purc/purcMngAppList.do")
    public String purcMngAppList(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());

        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        if(loginVO == null){
            return "error/error";
        }

        return "cam_purc/mng/purcMngAppList";
    }

    @RequestMapping("/purc/getMngPurcAppList")
    public String getMngPurcAppList(@RequestParam Map<String, Object> params, Model model) {

        List<Map<String, Object>> list = new ArrayList<>();
        list = purcService.getMngPurcAppList(params);
        model.addAttribute("list", list);

        return "jsonView";
    }

    @RequestMapping("/purc/getMngPurcAppListExcel")
    public String getMngPurcAppListExcel(@RequestParam Map<String, Object> params, Model model) {

        List<Map<String, Object>> list = new ArrayList<>();
        list = purcService.getMngPurcAppListExcel(params);
        model.addAttribute("list", list);

        return "jsonView";
    }

    @RequestMapping("/purc/getUserPurcAppList")
    public String getUserPurcAppList(@RequestParam Map<String, Object> params, Model model) {
        List<Map<String, Object>> list = new ArrayList<>();
        list = purcService.getUserPurcAppList(params);
        model.addAttribute("list", list);

        return "jsonView";
    }

    @RequestMapping("/purc/pop/regPurcPayAppFilePop.do")
    public String regPurcPayAppFilePop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){

        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "popup/cam_purc/mng/regPurcPayAppFilePop";
    }

    @RequestMapping("/purc/purcFileList")
    public String purcFileList(@RequestParam Map<String, Object> params, Model model){

        List<Map<String, Object>> listMap = purcService.purcFileList(params);

        model.addAttribute("listMap", listMap);

        return "jsonView";
    }

    @RequestMapping("/purc/setPurcFileAdd")
    public String setPurcFileAdd(@RequestParam Map<String, Object> params, MultipartHttpServletRequest request, Model model){
        try{
            MultipartFile[] fileList = request.getFiles("fileList").toArray(new MultipartFile[0]);

            purcService.setPurcFileAdd(params, fileList, SERVER_DIR, BASE_DIR);

            model.addAttribute("code", 200);
            model.addAttribute("params", params);
        } catch (Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/purc/getPurcClaimDocFile")
    public String getPurcClaimDocFile(@RequestParam Map<String, Object> params, Model model){
        List<Map<String, Object>> list = purcService.getPurcClaimDocFile(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    @RequestMapping("/purc/pop/appUserPaySetting.do")
    public String appUserPaySetting(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){

        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "popup/cam_purc/mng/appUserPaySetting";
    }

    @RequestMapping("/purc/pop/purcBasicSettings.do")
    public String purcBasicSettings(@RequestParam Map<String, Object> params, Model model){

        model.addAttribute("params", params);

        return "popup/cam_purc/mng/purcBasicSettings";
    }

    @RequestMapping("/purc/getClaimMngList")
    public String getClaimMngList(@RequestParam Map<String, Object> params, Model model){

        List<Map<String, Object>> list = purcService.getClaimMngList(params);

        model.addAttribute("list", list);

        return "jsonView";
    }

    @RequestMapping("/purc/setPayAppPurcReq")
    public String setPayAppPurcReq(@RequestParam Map<String, Object> params, MultipartHttpServletRequest request, Model model){

        try{
            MultipartFile[] fileList = request.getFiles("fileList").toArray(new MultipartFile[0]);
            purcService.setPayAppPurcReq(params, fileList, SERVER_DIR, BASE_DIR);
            model.addAttribute("code", 200);
            model.addAttribute("params", params);
        } catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/purc/getClaimExnpData")
    public String getClaimExnpData(@RequestParam Map<String, Object> params, Model model){

        Map<String, Object> map = purcService.getClaimExnpData(params);

        Map<String, Object> result = new HashMap<>();
        if(map != null){
            if(map.containsKey("EVID_TYPE")){
                if(map.get("EVID_TYPE").equals("3")){
                    result = purcService.getClaimExnpGwCardList(map);
                } else if(map.get("EVID_TYPE").equals("1")){
                    result = purcService.getClaimExnpGwEtaxList(map);
                }
            }
        }

        model.addAttribute("map", map);
        model.addAttribute("result", result);
        return "jsonView";
    }

    @RequestMapping("/purc/mng/setPurcBasicSetting")
    public String setPurcBasicSetting(@RequestParam Map<String, Object> params, Model model){

        try{
            Map<String, Object> map = purcService.setPurcBasicSetting(params);
            model.addAttribute("code", 200);
            model.addAttribute("map", map);
        } catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/purc/getBasicSetting")
    public String getBasicSetting(@RequestParam Map<String, Object> params, Model model){

        Map<String, Object> map = new HashMap<>();

        map = purcService.getBasicSetting(params);

        model.addAttribute("map", map);
        return "jsonView";
    }

    @RequestMapping("/purcHist/purcHist.do")
    private String projectHistEdu(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        session.setAttribute("menuNm", request.getRequestURI());
        model.addAttribute("loginVO", loginVO);

        if(loginVO == null){
            return "error/error";
        }

        return "cam_purc/hist/purcHist";
    }

    @RequestMapping("/purcHist/getHistPurcList")
    public String getHistPurcList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", purcService.getHistPurcList(params));
        return "jsonView";
    }

    @RequestMapping("/purc/pop/purcListView.do")
    public String purcListView(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);
        return "popup/cam_purc/mng/purcListView";
    }

    @RequestMapping("/purc/getPurcClaimExnpList")
    public String getPurcClaimExnpList(@RequestParam Map<String, Object> params, Model model){

        List<Map<String, Object>> list = purcService.getPurcClaimExnpList(params);

        model.addAttribute("list", list);

        return "jsonView";
    }

    @RequestMapping("/purc/getClaimExnpDataByPay")
    public String getClaimExnpDataByPay(@RequestParam Map<String, Object> params, Model model){

        Map<String, Object> data = purcService.getClaimExnpDataByPay(params);

        model.addAttribute("data", data);

        return "jsonView";
    }

    @RequestMapping("/purc/delClaimExnpData")
    public String delClaimExnpData(@RequestParam Map<String, Object> params, Model model){

        try{

            purcService.delClaimExnpData(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/purc/updClaimExpDe")
    public String updClaimExpDe(@RequestParam Map<String, Object> params, Model model){

        try{
            purcService.updClaimExpDe(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

}
