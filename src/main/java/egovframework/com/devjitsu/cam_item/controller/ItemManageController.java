package egovframework.com.devjitsu.cam_item.controller;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import egovframework.com.devjitsu.cam_crm.service.CrmService;
import egovframework.com.devjitsu.cam_item.service.ItemManageService;
import egovframework.com.devjitsu.cam_item.service.ItemSystemService;
import egovframework.com.devjitsu.common.service.CommonCodeService;
import egovframework.com.devjitsu.common.utiles.MailUtil;
import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import egovframework.com.devjitsu.inside.bustrip.controller.BustripController;
import egovframework.com.devjitsu.inside.userManage.service.UserManageService;
import egovframework.com.devjitsu.system.service.MessageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
public class ItemManageController {
    private static final Logger logger = LoggerFactory.getLogger(BustripController.class);

    @Autowired
    private ItemManageService itemManageService;

    @Autowired
    private ItemSystemService itemSystemService;

    @Autowired
    private CommonCodeService commonCodeService;

    @Autowired
    private CrmService crmService;

    @Autowired
    private UserManageService userManageService;

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


    /** 캠아이템 > 아이템관리 > 기준정보 */

    /**
     * 고객단가관리 페이지
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/item/crmUnitPriceMa.do")
    public String crmUnitPriceMa(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("loginVO");
        session.setAttribute("menuNm", request.getRequestURI());

        return "cam_item/itemMa/baseInfo/crmUnitPriceMa";
    }

    /**
     * 표준단가관리 페이지
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/item/standardUnitPriceMa.do")
    public String standardUnitPriceMa(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("loginVO");
        session.setAttribute("menuNm", request.getRequestURI());

        return "cam_item/itemMa/baseInfo/standardUnitPriceMa";
    }

    /**
     * 표준단가관리 리스트
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/item/getItemStandardUnitPriceList.do")
    public String getItemStandardUnitPriceList(@RequestParam Map<String, Object> params, Model model) {
        model.addAttribute("list", itemManageService.getItemStandardUnitPriceList(params));
        return "jsonView";
    }

    /**
     * 표준단가등록 팝업
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/item/pop/popStandardUnitPriceReg.do")
    public String popStandardUnitPriceReg(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);
        model.addAttribute("item", itemSystemService.getItemMaster(params));

        return "popup/cam_item/popStandardUnitPriceReg";
    }

    /**
     * 품목표준단가 리스트
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/item/getSdunitPriceList.do")
    public String getSdunitPriceList(@RequestParam Map<String, Object> params, Model model) {
        model.addAttribute("list", itemManageService.getSdunitPriceList(params));
        return "jsonView";
    }

    /**
     * 표준단가 데이터 저장
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/item/setSdUnitPriceReg.do")
    public String setSdUnitPriceReg(@RequestParam Map<String, Object> params, Model model){
        itemManageService.setSdUnitPriceReg(params);
        return "jsonView";
    }

    /**
     * 표준단가 데이터 삭제
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/item/setSdUnitPriceDel.do")
    public String setSdUnitPriceDel(@RequestParam Map<String, Object> params, Model model){
        itemManageService.setSdUnitPriceDel(params);
        return "jsonView";
    }


    /**
     * 품목정보 페이지
     * @param request
     * @return
     */
    @RequestMapping("/item/itemList.do")
    public String itemList(HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("loginVO");
        session.setAttribute("menuNm", request.getRequestURI());

        return "cam_item/itemMa/baseInfo/itemList";
    }

    /** 캠아이템 > 아이템관리 > 수주관리 */

    /**
     * 수주등록 페이지
     * @param request
     * @return
     */
    @RequestMapping("/item/obtainOrderRegList.do")
    public String obtainOrderRegList(HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("loginVO");
        session.setAttribute("menuNm", request.getRequestURI());

        return "cam_item/itemMa/obtainOrderMa/obtainOrderRegList";
    }

    /**
     * 마감처리
     * @param params
     * @return
     */
    @RequestMapping("/item/setDeadlineUpd.do")
    public String setDeadlineUpd(@RequestParam Map<String, Object> params){
        itemManageService.setDeadlineUpd(params);
        return "jsonView";
    }

    @RequestMapping("/item/setDepositUpd.do")
    public String setDepositUpd(@RequestParam Map<String, Object> params){
        itemManageService.setDepositUpd(params);
        return "jsonView";
    }

    /**
     * 수주등록 팝업
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/item/pop/popObtainOrderReg.do")
    public String popObtainOrderReg(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "popup/cam_item/popObtainOrderReg";
    }

    /**
     * 수주등록
     * @param params
     * @return
     */
    @RequestMapping("/item/setObtainOrder.do")
    public String setObtainOrder(@RequestParam Map<String, Object> params){
        itemManageService.setObtainOrder(params);
        return "jsonView";
    }

    /**
     * 수주등록 리스트
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/item/getObtainOrderList.do")
    public String getObtainOrderList(@RequestParam Map<String, Object> params, Model model) {
        model.addAttribute("list", itemManageService.getObtainOrderList(params));
        return "jsonView";
    }

    /**
     * 수주수정 팝업
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/item/pop/popObtainOrderRegMod.do")
    public String popObtainOrderRegMod(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "popup/cam_item/popObtainOrderRegMod";
    }

    /**
     * 수주등록 상세데이터
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/item/getObtainOrder.do")
    public String getObtainOrder(@RequestParam Map<String, Object> params, Model model) {
        model.addAttribute("rs", itemManageService.getObtainOrder(params));
        return "jsonView";
    }

    /**
     * 수주 업데이트
     * @param params
     * @return
     */
    @RequestMapping("/item/setObtainOrderUpd.do")
    public String setObtainOrderUpd(@RequestParam Map<String, Object> params){
        itemManageService.setObtainOrderUpd(params);
        return "jsonView";
    }

    /**
     * 수주 취소
     * @param params
     * @return
     */
    @RequestMapping("/item/setObtainOrderCancel.do")
    public String setObtainOrderCancel(@RequestParam Map<String, Object> params){
        itemManageService.setObtainOrderCancel(params);
        return "jsonView";
    }

    /**
     * 견적서 인쇄 수주 선택 팝업
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/item/pop/popSelEstimate.do")
    public String popSelEstimate(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "popup/cam_item/popSelEstimate";
    }

    /**
     * 수주 인쇄데이터 저장
     * @param params
     * @return
     */
    @RequestMapping("/item/setItemEstPrint.do")
    public String setItemEstPrint(@RequestParam Map<String, Object> params, Model model){
        itemManageService.setItemEstPrint(params);
        model.addAttribute("rs", params);
        return "jsonView";
    }


    /**
     * 수주 인쇄 팝업
     * @param params
     * @param model
     * @param request
     * @return
     */
    @RequestMapping("/item/pop/estPrintPop.do")
    public String estPrintPop(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
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

        return "popup/cam_item/estPrintPop";
    }

    /**
     * 견적서 상세 데이터
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/item/getEstPrintSn.do")
    public String getEstPrintSn(@RequestParam Map<String, Object> params, Model model) {
        model.addAttribute("rs", itemManageService.getEstPrintSn(params));
        return "jsonView";
    }

    /**
     * 견적서 메일전송
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/item/pop/estimateSendMailPop.do")
    public String estimateSendMailPop(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);
        return "popup/cam_item/estimateSendMailPop";
    }

    /**
     * 메일전송 데이터 조회
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/item/getEmpCrmData")
    public String getEmpCrmData(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        model.addAttribute("data", crmService.getCrmInfo(params));
        model.addAttribute("data2", userManageService.getEmpInfo(params));
        model.addAttribute("fileInfo", crmService.getCrmFileInfo(params));
        return "jsonView";
    }

    @RequestMapping("/item/estimateSendMail.do")
    public String estimateSendMail(@RequestParam Map<String, Object> params, MultipartHttpServletRequest request, Model model) throws MessagingException, IOException {

        MultipartFile[] file = request.getFiles("fileList").toArray(new MultipartFile[0]);
        itemManageService.setEstimateSendMailInfo(params, file, SERVER_DIR, BASE_DIR);

        List<Map<String, Object>> fileArray = itemManageService.getEstimateSendFileList(params);
        params.put("fileArray", fileArray);

        /** 메일 (업체, 발송자) */
        HttpServletRequest servletRequest = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        if(request.getServerName().contains("localhost") || request.getServerName().contains("127.0.0.1") || servletRequest.getServerName().contains("218.158.231.186")){
            params.put("fileServer", "http://218.158.231.186");
        } else{
            params.put("fileServer", "http://218.158.231.184");
        }

        MailUtil mailUtil = new MailUtil();
        params.put("mailType", "estimate");
        mailUtil.orderSendMail(params, SMTPServer, SMTPPort, SMTPID, SMTPPW);

        /** 문자 (메일 발송자) */
        params.put("empSeq", params.get("regEmpSeq"));
        Map<String, Object> empInfoMap = userManageService.getEmpInfo(params);
        Map<String, Object> messageParam = new HashMap<>();
        messageParam.put("dest_phone", empInfoMap.get("EMP_NAME_KR") + "^" + empInfoMap.get("MOBILE_TEL_NUM"));

        String msgContents = params.get("crmNm") + "(으)로 견적서가 발송되었습니다.";
        messageParam.put("msg_content", msgContents);

        Date currentDate = new Date();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMddHHmmss");
        messageParam.put("pkDate", dateFormat.format(currentDate));

        messageParam.put("loginEmpSeq", "admin");
        messageService.msgSend(messageParam);

        model.addAttribute("rs", "SUCCESS");
        return "jsonView";
    }


    /**
     * 수주현황 페이지
     * @param request
     * @return
     */
    @RequestMapping("/item/obtainOrderStatusList.do")
    public String obtainOrderStatusList(HttpServletRequest request){
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());

        return "cam_item/itemMa/obtainOrderMa/obtainOrderStatusList";
    }

    /** 캠아이템 > 아이템관리 > 출하관리 */

    /**
     * 출하실적 등록 리스트(사용자)
     * @param request
     * @return
     */
    @RequestMapping("/item/shipmentRecordRegList.do")
    public String shipmentRecordRegList(HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("loginVO");
        session.setAttribute("menuNm", request.getRequestURI());

        return "cam_item/itemMa/shipmentMa/shipmentRecordRegList";
    }

    /**
     * 출하실적 등록 리스트
     * @param request
     * @return
     */
    @RequestMapping("/item/shipmentRecordList.do")
    public String shipmentRecordList(HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("loginVO");
        session.setAttribute("menuNm", request.getRequestURI());

        return "cam_item/itemMa/shipmentMa/shipmentRecordList";
    }

    /**
     * 출하실적 리스트
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/item/getShipmentRecordList.do")
    public String getShipmentRecordList(@RequestParam Map<String, Object> params, Model model) {
        model.addAttribute("list", itemManageService.getShipmentRecordList(params));
        return "jsonView";
    }

    /**
     * 출하가능여부 체크 (자재 체크)
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/item/getShipmentInvenChk.do")
    public String getShipmentInvenChk(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("rs", itemManageService.getShipmentInvenChk(params));
        return "jsonView";
    }

    /**
     * 출고 창고 지정 팝업
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/item/pop/popOutputByShipment.do")
    public String popOutputByShipment(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "popup/cam_item/popOutputByShipment";
    }

    /**
     * 출하품목 상세 리스트
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/item/getFwWhCdDesignList.do")
    public String getFwWhCdDesignList(@RequestParam Map<String, Object> params, Model model) {
        model.addAttribute("list", itemManageService.getFwWhCdDesignList(params));
        return "jsonView";
    }

    /**
     * 출하저장
     * @param params
     * @return
     */
    @RequestMapping("/item/getFwWhCdDesign.do")
    public String getFwWhCdDesign(@RequestParam Map<String, Object> params){
        itemManageService.getFwWhCdDesign(params);
        return "jsonView";
    }

    /**
     * 출하마감처리
     * @param params
     * @return
     */
    @RequestMapping("/item/setShipmentDeadlineUpd.do")
    public String setShipmentDeadlineUpd(@RequestParam Map<String, Object> params){
        itemManageService.setShipmentDeadlineUpd(params);
        return "jsonView";
    }

    /**
     * 출고단가이력팝업
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/item/pop/popSrUnitPriceList.do")
    public String popSrUnitPriceList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("data", crmService.getCrmInfo(params));
        model.addAttribute("rs", itemSystemService.getItemMaster(params));
        model.addAttribute("params", params);
        return "popup/cam_item/popSrUnitPriceList";
    }

    /**
     * 출하실적추이분석
     * @param request
     * @return
     */
    @RequestMapping("/item/shipmentTrend.do")
    public String shipmentTrend(HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("loginVO");
        session.setAttribute("menuNm", request.getRequestURI());

        return "cam_item/itemMa/shipmentMa/shipmentTrend";
    }

    /**
     * 출하실적추이분석 리스트
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/item/getShipmentTrendList.do")
    public String getShipmentTrendList(@RequestParam Map<String, Object> params, Model model) {
        model.addAttribute("list", itemManageService.getShipmentTrendList(params));
        return "jsonView";
    }

    /**
     * 반품등록리스트
     * @param request
     * @return
     */
    @RequestMapping("/item/returnRecordRegList.do")
    public String returnRegList(HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("loginVO");
        session.setAttribute("menuNm", request.getRequestURI());

        return "cam_item/itemMa/shipmentMa/returnRecordRegList";
    }

    /**
     * 반품등록 리스트
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/item/getReturnRecordRegList.do")
    public String getReturnRegList(@RequestParam Map<String, Object> params, Model model) {
        model.addAttribute("list", itemManageService.getReturnRecordRegList(params));
        return "jsonView";
    }

    /**
     * 반품등록 팝업
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/item/pop/popReturnRecordReg.do")
    public String popReturnRecordReg(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "popup/cam_item/popReturnRecordReg";
    }

    /**
     * 반품등록
     * @param params
     * @return
     */
    @RequestMapping("/item/setReturnRecord.do")
    public String setReturnRecord(@RequestParam Map<String, Object> params){
        itemManageService.setReturnRecord(params);
        return "jsonView";
    }



    /** 캠아이템 > 아이템관리 > BOM */

    /**
     * BOM 등록 페이지
     * @param request
     * @return
     */
    @RequestMapping("/item/bomRegList.do")
    public String bomCodeList(HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("loginVO");
        session.setAttribute("menuNm", request.getRequestURI());

        return "cam_item/itemMa/bom/bomRegList";
    }

    /**
     * BOM 리스트
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/item/getBomList.do")
    public String getBomList(@RequestParam Map<String, Object> params, Model model) {
        model.addAttribute("list", itemManageService.getBomList(params));
        return "jsonView";
    }

    /**
     * BOM 삭제
     * @param params
     * @return
     */
    @RequestMapping("/item/setBomDel.do")
    public String setBomDel(@RequestParam Map<String, Object> params){
        itemManageService.setBomDel(params);
        return "jsonView";
    }

    /**
     * BOM 복사
     * @param params
     * @return
     */
    @RequestMapping("/item/setBomCopy.do")
    public String setBomCopy(@RequestParam Map<String, Object> params){
        itemManageService.setBomCopy(params);
        return "jsonView";
    }

    /**
     * BOM 부자재 삭제
     * @param params
     * @return
     */
    @RequestMapping("/item/setBomDetailDel.do")
    public String setBomDetailDel(@RequestParam Map<String, Object> params){
        itemManageService.setBomDetailDel(params);
        return "jsonView";
    }

    /**
     * BOM 등록 팝업
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/item/pop/popBomReg.do")
    public String popBomReg(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "popup/cam_item/popBomReg";
    }

    /**
     * BOM 조회(단일)
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/item/getBom.do")
    public String getBom(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("bom", itemManageService.getBom(params));
        model.addAttribute("bomDetail", itemManageService.getBomDetailList(params));
        return "jsonView";
    }

    /**
     * BOM 등록
     * @param params
     * @return
     */
    @RequestMapping("/item/setBom.do")
    public String setBom(@RequestParam Map<String, Object> params){
        itemManageService.setBom(params);
        return "jsonView";
    }

    /**
     * BOM 조회 페이지
     * @param request
     * @return
     */
    @RequestMapping("/item/bomList.do")
    public String bomList(HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("loginVO");
        session.setAttribute("menuNm", request.getRequestURI());

        return "cam_item/itemMa/bom/bomList";
    }

    /**
     * BOM 조회 팝업
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/item/pop/popBomView.do")
    public String popBomView(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", loginVO);
        model.addAttribute("rs", itemManageService.getBom(params));
        model.addAttribute("detailList", itemManageService.getBomDetailList(params));

        return "popup/cam_item/popBomView";
    }

    /**
     * String bom
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/item/makeTreeView.do")
    public String makeTreeView(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("rs", itemManageService.getStringBomList(params));
        return "jsonView";
    }

    /**
     * BOM 부자재 리스트
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/item/getBomDetailList.do")
    public String getBomDetailList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", itemManageService.getBomDetailList(params));
        return "jsonView";
    }

    /** 캠아이템 > 아이템관리 > 생산관리 > 생산지시 */

    /**
     * 생산지시 페이지
     * @param request
     * @return
     */
    @RequestMapping("/item/productionOrder.do")
    public String productionOrder(HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("loginVO");
        session.setAttribute("menuNm", request.getRequestURI());

        return "cam_item/itemMa/productionMa/productionOrder";
    }

    /**
     * BOM 제작가능여부 체크 (자재 체크)
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/item/getInvenChk.do")
    public String getInvenChk(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("rs", itemManageService.getInvenChk(params));
        return "jsonView";
    }

    /**
     * BOM 제작 팝업
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/item/pop/popOutputByBom.do")
    public String popBomProduction(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", loginVO);
        model.addAttribute("rs", itemManageService.getBom(params));
        model.addAttribute("params", params);

        return "popup/cam_item/popOutputByBom";
    }

    /**
     * 생산
     * @param params
     * @return
     */
    @RequestMapping("/item/setOutput.do")
    public String setOutput(@RequestParam Map<String, Object> params){
        itemManageService.setOutput(params);
        return "jsonView";
    }

    /**
     * 생산실적 페이지
     * @param request
     * @return
     */
    @RequestMapping("/item/productionOrderStat.do")
    public String productionOrderStat(HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("loginVO");
        session.setAttribute("menuNm", request.getRequestURI());

        return "cam_item/itemMa/productionMa/productionOrderStat";
    }

    /**
     * BOM 생산이력
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/item/getBomOutputHistory.do")
    public String getBomOutputHistory(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", itemManageService.getBomOutputHistory(params));
        return "jsonView";
    }


    /** 캠아이템 > 아이템관리 > 구매관리 */

    /**
     * 자재단가관리
     * @param request
     * @return
     */
    @RequestMapping("/item/materialUnitPriceMa.do")
    public String materialUnitPriceMa(HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("loginVO");
        session.setAttribute("menuNm", request.getRequestURI());

        return "cam_item/itemMa/purcMa/materialUnitPriceMa";
    }

    /**
     * 자재단가관리 리스트
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/item/getMaterialUnitPriceList.do")
    public String getMaterialUnitPriceList(@RequestParam Map<String, Object> params, Model model) {
        model.addAttribute("list", itemManageService.getMaterialUnitPriceList(params));
        return "jsonView";
    }

    /**
     * 고객 자재단가관리 등록 팝업
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/item/pop/popCrmItemUnitPriceReg.do")
    public String popCrmItemUnitPriceReg(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);
        model.addAttribute("item", itemSystemService.getItemMaster(params));

        return "popup/cam_item/popCrmItemUnitPriceReg";
    }

    /**
     * 고객 품목단가 리스트
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/item/getCrmItemUnitPriceList.do")
    public String getCrmItemUnitPriceList(@RequestParam Map<String, Object> params, Model model) {
        model.addAttribute("list", itemManageService.getCrmItemUnitPriceList(params));
        return "jsonView";
    }

    /**
     * 고객 품목단가 데이터 저장
     * @param params
     * @return
     */
    @RequestMapping("/item/setCrmItemUnitPriceReg.do")
    public String setCrmItemUnitPriceReg(@RequestParam Map<String, Object> params, Model model){
        itemManageService.setCrmItemUnitPriceReg(params);
        model.addAttribute("params", params);
        return "jsonView";
    }

    /**
     * 고객 품목단가 데이터 삭제
     * @param params
     * @return
     */
    @RequestMapping("/item/setCrmItemUnitPriceDel.do")
    public String setCrmItemUnitPriceDel(@RequestParam Map<String, Object> params){
        itemManageService.setCrmItemUnitPriceDel(params);
        return "jsonView";
    }

    /**
     * 입고리스트 페이지
     * @param request
     * @return
     */
    @RequestMapping("/item/receivingRegList.do")
    public String receivingRegList(HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("loginVO");
        session.setAttribute("menuNm", request.getRequestURI());

        return "cam_item/itemMa/purcMa/receivingRegList";
    }

    /**
     * 입고등록 팝업
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/item/pop/receivingReg.do")
    public String regReceipt(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "popup/cam_item/receivingReg";
    }

    /**
     * 품번선택팝업
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/item/pop/popItemNoList.do")
    public String popItemNoList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("params", params);
        return "popup/cam_item/popItemNoList";
    }

    /**
     * 입고등록 데이터 저장
     * @param params
     * @return
     */
    @RequestMapping("/item/getItemUnitPrice.do")
    public String getItemUnitPrice(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("rs", itemManageService.getItemUnitPrice(params));
        return "jsonView";
    }

    /**
     * 입고단가이력팝업
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/item/pop/popRvUnitPriceList.do")
    public String popRvUnitPriceList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("data", crmService.getCrmInfo(params));
        model.addAttribute("rs", itemSystemService.getItemMaster(params));
        model.addAttribute("params", params);
        return "popup/cam_item/popRvUnitPriceList";
    }

    /**
     * 입고등록 양식 다운로드
     * @param request
     * @return
     */
    @RequestMapping("/item/receivingExcelFormDown.do")
    public void receivingExcelFormDown(HttpServletRequest request, HttpServletResponse response) throws IOException {
        itemManageService.receivingExcelFormDown(request, response);
    }

    /**
     * 입고등록 엑셀 업로드
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/item/receivingExcelUpload.do")
    public String receivingExcelUpload(@RequestParam Map<String, Object> params, MultipartHttpServletRequest request, Model model) throws Exception{
        model.addAttribute("list", itemManageService.receivingExcelUpload(params, request));
        return "jsonView";
    }

    /**
     * 입고등록 데이터 저장
     * @param params
     * @return
     */
    @RequestMapping("/item/setReceivingReg.do")
    public String setReceivingReg(@RequestParam Map<String, Object> params){
        itemManageService.setReceivingReg(params);
        return "jsonView";
    }

    /**
     * 입고취소
     * @param params
     * @return
     */
    @RequestMapping("/item/setReceivingCancel.do")
    public String setReceivingCancel(@RequestParam Map<String, Object> params){
        itemManageService.setReceivingCancel(params);
        return "jsonView";
    }

    /**
     * 입고데이터 수정 팝업
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/item/pop/receivingRegMod.do")
    public String receivingRegMod(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "popup/cam_item/receivingRegMod";
    }

    /**
     * 입고등록 데이터 조회 (단일)
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/item/getItemWhInfo.do")
    public String getItemWhInfo(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("rs", itemManageService.getItemWhInfo(params));
        return "jsonView";
    }

    /**
     * 입고등록 데이터 수정(단일)
     * @param params
     * @return
     */
    @RequestMapping("/item/setReceivingRegUpd.do")
    public String setReceivingRegUpd(@RequestParam Map<String, Object> params){
        itemManageService.setReceivingRegUpd(params);
        return "jsonView";
    }

    /**
     * 구매검수
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/item/purcInspection.do")
    public String purcInspection(HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("loginVO");
        session.setAttribute("menuNm", request.getRequestURI());
        model.addAttribute("loginVO", loginVO);

        return "cam_item/itemMa/purcMa/purcInspection";
    }

    /**
     * 입고데이터 리스트
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/item/getItemWhInfoList.do")
    public String getItemWhInfoList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", itemManageService.getItemWhInfoList(params));
        return "jsonView";
    }

    /**
     * 검수완료처리
     * @param params
     * @return
     */
    @RequestMapping("/item/setInspectionUpd.do")
    public String setInspectionUpd(@RequestParam Map<String, Object> params){
        itemManageService.setInspectionUpd(params);
        return "jsonView";
    }

    /**
     * 입고현황
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/item/receivingStatus.do")
    public String receivingStatus(HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("loginVO");
        session.setAttribute("menuNm", request.getRequestURI());
        model.addAttribute("loginVO", loginVO);

        return "cam_item/itemMa/purcMa/receivingStatus";
    }


    /** 캠아이템 > 아이템관리 > 재고관리 */

    /**
     * 재고현황
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/item/invenStatus.do")
    public String invenStatus(HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("loginVO");
        session.setAttribute("menuNm", request.getRequestURI());
        model.addAttribute("loginVO", loginVO);

        return "cam_item/itemMa/invenMa/invenStatus";
    }

    /**
     * 재고현황(관리자)
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/item/invenStatusAdmin.do")
    public String invenStatusAdmin(HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("loginVO");
        session.setAttribute("menuNm", request.getRequestURI());
        model.addAttribute("loginVO", loginVO);

        return "cam_item/itemMa/invenMa/invenStatusAdmin";
    }

    /**
     * 재고현황 리스트
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/item/getItemInvenList.do")
    public String getItemInvenList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", itemManageService.getItemInvenList(params));
        return "jsonView";
    }

    /**
     * 재고현황(관리자) 리스트
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/item/getItemInvenAdminList.do")
    public String getItemInvenAdminList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", itemManageService.getItemInvenAdminList(params));
        return "jsonView";
    }
    @RequestMapping("/item/getItemInvenAdminListByMonth.do")
    public String getItemInvenAdminListByMonth(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", itemManageService.getItemInvenAdminListByMonth(params));
        return "jsonView";
    }

    /**
     * 재고선택팝업
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/item/pop/popItemInvenList.do")
    public String popCrmList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("params", params);
        return "popup/cam_item/popItemInvenList";
    }

    /**
     * 재고 조회(단일)
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/item/getItemInven.do")
    public String getItemInvenData(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("rs", itemManageService.getItemInven(params));
        return "jsonView";
    }

    /**
     * 재고이동관리
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/item/invenTransferRegList.do")
    public String invenTransferRegList(HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("loginVO");
        session.setAttribute("menuNm", request.getRequestURI());
        model.addAttribute("loginVO", loginVO);

        return "cam_item/itemMa/invenMa/invenTransferRegList";
    }

    /**
     * 재고이동현황 리스트
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/item/getInvenTransferHistoryList.do")
    public String getInvenTransferHistoryList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", itemManageService.getInvenTransferHistoryList(params));
        return "jsonView";
    }

    /**
     * 재고이동등록 팝업
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/item/pop/popInvenTransferReg.do")
    public String popInvenTransferReg(HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", loginVO);
        return "popup/cam_item/popInvenTransferReg";
    }

    /**
     * 재고이동등록 데이터 저장
     * @param params
     * @return
     */
    @RequestMapping("/item/setInvenTransferReg.do")
    public String setInvenTransferReg(@RequestParam Map<String, Object> params){
        itemManageService.setInvenTransferReg(params);
        return "jsonView";
    }


    /**
     * 재고이동현황(미사용)
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/item/invenTransferHistory.do")
    public String invenTransferHistory(HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("loginVO");
        session.setAttribute("menuNm", request.getRequestURI());
        model.addAttribute("loginVO", loginVO);

        return "cam_item/itemMa/invenMa/invenTransferHistory";
    }

    /**
     * 안전재고마스터
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/item/safetyInvenMaster.do")
    public String safetyInvenMaster(HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("loginVO");
        session.setAttribute("menuNm", request.getRequestURI());
        model.addAttribute("loginVO", loginVO);

        return "cam_item/itemMa/invenMa/safetyInvenMaster";
    }

    /**
     * 안전재고 저장
     * @param params
     * @return
     */
    @RequestMapping("/item/setSafetyInvenUpd.do")
    public String setSafetyInvenUpd(@RequestParam Map<String, Object> params){
        itemManageService.setSafetyInvenUpd(params);
        return "jsonView";
    }

    /** 캠아이템 > 아이템관리 > 마감관리 */

    /**
     * 매출확정
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/item/crmSalesConfirmList.do")
    public String deadlineManageList(HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("loginVO");
        session.setAttribute("menuNm", request.getRequestURI());
        model.addAttribute("loginVO", loginVO);

        return "cam_item/itemMa/deadlineMa/crmSalesConfirmList";
    }

    /**
     * 매출확정 리스트
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/item/getCrmSalesConfirmList.do")
    public String getDeadLineManageList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", itemManageService.getCrmSalesConfirmList(params));
        return "jsonView";
    }

    /**
     * 매출확정
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/item/setCrmSalesConfirm.do")
    public String setCrmSalesConfirm(@RequestParam Map<String, Object> params, Model model){
        itemManageService.setCrmSalesConfirm(params);
        return "jsonView";
    }

    /**
     * 입금현황 팝업
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/item/pop/popDepositStat.do")
    public String popDepositStat(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "popup/cam_item/popDepositStat";
    }

    /**
     * 입금현황 리스트
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/item/getDepositStatList.do")
    public String getDepositStatList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", itemManageService.getDepositStatList(params));
        return "jsonView";
    }

    /**
     * 입금확정
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/item/setDepositConfirm.do")
    public String setDepositConfirm(@RequestParam Map<String, Object> params, Model model){
        itemManageService.setDepositConfirm(params);
        return "jsonView";
    }

    /**
     * 재고조정 엑셀 업로드 팝업
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/item/pop/itemExcelUploadPop.do")
    public String itemExcelUploadPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);
        return "popup/cam_item/itemExcelUploadPop";
    }

    /**
     * 재고조정 양식 다운로드
     * @param request
     * @return
     */
    @RequestMapping("/item/itemRegTemplateDown.do")
    public void itemRegTemplateDown(HttpServletRequest request, HttpServletResponse response) throws Exception {
        itemManageService.itemRegTemplateDown(request, response);
    }

    /**
     * 재고조정 엑셀 업로드
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/item/itemExcelUpload.do")
    public String esmExcelUpload(@RequestParam Map<String, Object> params, MultipartHttpServletRequest request, Model model) throws Exception{
        itemManageService.itemExcelUpload(params, request);
        return "jsonView";
    }

    /**
     * 재고조정 팝업
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/item/pop/invenAdjustmentPop.do")
    public String invenAdjustmentPop(@RequestParam Map<String, Object> params,HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("loginVO");

        model.addAttribute("params", params);
        model.addAttribute("loginVO", loginVO);
        return "popup/cam_item/invenAdjustmentPop";
    }

    @RequestMapping("/item/getItemInvenAdjustList.do")
    public String getItemInvenAdjustList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", itemManageService.getItemInvenAdjustList(params));
        return "jsonView";
    }

    @RequestMapping("/item/setItemInvenAdjust.do")
    public String setItemInvenAdjust(@RequestParam Map<String, Object> params, Model model){
        itemManageService.setItemInvenAdjust(params);
        return "jsonView";
    }

    @RequestMapping("/item/setDeadLine")
    public String setDeadLine(@RequestParam Map<String, Object> params, Model model){

        try{
            itemManageService.setDeadLine(params);
            itemManageService.updItemManageRealCnt(params);
            model.addAttribute("code", 200);
        } catch (Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/item/pop/approvalFormPopup/invenDeadLineApprovalPop.do")
    public String invenDeadLineApprovalPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        LoginVO login = getLoginVO(request);

        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);
        /*
        List<Map<String, Object>> list = bustripService.getBustripResTotInfo(params);
        model.addAttribute("list", list);
        List<Map<String, Object>> exnpData = bustripService.getBustripExnpInfo(params);

        Map<String, Object> rs = bustripService.getBustripOne(params);
        model.addAttribute("exnpList", exnpData);
        model.addAttribute("rs", rs);
        model.addAttribute("data", params);

        params.put("hrBizReqId", rs.get("HR_BIZ_REQ_ID"));
        params.put("fileCd", "bustripReq");
        model.addAttribute("fileInfo", bustripService.getBustripReqFileInfo(params));*/

        return "/popup/cam_item/invenDeadLineApprovalPop";
    }

    /**
     * 재고마감 결재 상태값에 따른 UPDATE 메서드
     * @param bodyMap
     * @return
     */
    @RequestMapping(value = "/item/invenDeadLineApp")
    public String invenDeadLineApp(@RequestParam Map<String, Object> bodyMap, Model model) {
        System.out.println("bodyMap");
        System.out.println(bodyMap);
        String resultCode = "SUCCESS";
        String resultMessage = "성공하였습니다.";
        try{
            itemManageService.updateDocState(bodyMap);
        }catch(Exception e){
            logger.error(e.getMessage());
            resultCode = "FAIL";
            resultMessage = "연계 정보 갱신 오류 발생("+e.getMessage()+")";
        }
        model.addAttribute("resultCode", resultCode);
        model.addAttribute("resultMessage", resultMessage);
        return "jsonView";
    }

    /** 재고현황(관리자) 결재창 */
    @RequestMapping("/item/pop/itemAppPop.do")
    public String itemAppPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        LoginVO login = getLoginVO(request);
        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);
        return "popup/cam_item/itemAppPop";
    }

    /** 재고현황(관리자) 전자결재 중복조회 */
    @RequestMapping("/item/getItemApprovalInfo")
    public String getItemApprovalInfo(@RequestParam Map<String, Object> params, Model model) {
        List<Map<String, Object>> list = itemManageService.getItemApprovalInfo(params);
        model.addAttribute("flag", list.size() == 0 ? "true" : "false");
        model.addAttribute("list", list);
        return "jsonView";
    }

    /** 재고현황(관리자) 전자결재 저장 */
    @RequestMapping("/item/setItemApprovalInfo")
    public String setItemApprovalInfo(@RequestParam Map<String, Object> params, Model model) {
        itemManageService.setItemApprovalInfo(params);
        model.addAttribute("data", params);
        return "jsonView";
    }

    @RequestMapping("/item/getItemApprovalInfoByPk")
    public String getItemApprovalInfoByPk(@RequestParam Map<String, Object> params, Model model){

        model.addAttribute("data", itemManageService.getItemApprovalInfoByPk(params));
        return "jsonView";
    }


    /** 재고현황(관리자) 전자결재 결재 상태값에 따른 UPDATE 메서드 */
    @RequestMapping(value = "/item/itemReqApp")
    public String itemReqApp(@RequestParam Map<String, Object> bodyMap, Model model) {
        System.out.println("bodyMap");
        System.out.println(bodyMap);
        String resultCode = "SUCCESS";
        String resultMessage = "성공하였습니다.";
        try{
            itemManageService.updateItemDocState(bodyMap);
        }catch(Exception e){
            logger.error(e.getMessage());
            resultCode = "FAIL";
            resultMessage = "연계 정보 갱신 오류 발생("+e.getMessage()+")";
        }
        model.addAttribute("resultCode", resultCode);
        model.addAttribute("resultMessage", resultMessage);
        return "jsonView";
    }

    private static LoginVO getLoginVO(HttpServletRequest request) {
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        return loginVO;
    }
}
