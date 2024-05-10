package egovframework.com.devjitsu.inside.bustrip.controller;

import com.google.gson.Gson;
import com.itextpdf.text.Document;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.tool.xml.XMLWorker;
import com.itextpdf.tool.xml.XMLWorkerFontProvider;
import com.itextpdf.tool.xml.XMLWorkerHelper;
import com.itextpdf.tool.xml.css.StyleAttrCSSResolver;
import com.itextpdf.tool.xml.html.CssAppliers;
import com.itextpdf.tool.xml.html.CssAppliersImpl;
import com.itextpdf.tool.xml.html.Tags;
import com.itextpdf.tool.xml.parser.XMLParser;
import com.itextpdf.tool.xml.pipeline.css.CSSResolver;
import com.itextpdf.tool.xml.pipeline.css.CssResolverPipeline;
import com.itextpdf.tool.xml.pipeline.end.PdfWriterPipeline;
import com.itextpdf.tool.xml.pipeline.html.HtmlPipeline;
import com.itextpdf.tool.xml.pipeline.html.HtmlPipelineContext;
import egovframework.com.devjitsu.common.service.CommonService;
import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import egovframework.com.devjitsu.gw.user.service.UserService;
import egovframework.com.devjitsu.inside.bustrip.service.BustripService;
import egovframework.com.devjitsu.inside.userManage.service.UserManageService;
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
import java.io.File;
import java.io.FileOutputStream;
import java.io.StringReader;
import java.nio.charset.Charset;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Controller
public class BustripController {

    private static final Logger logger = LoggerFactory.getLogger(BustripController.class);

    @Autowired
    private UserService userService;

    @Autowired
    private UserManageService userManageService;

    @Autowired
    private BustripService bustripService;

    @Autowired
    private CommonService commonService;

    @Value("#{properties['File.Server.Dir']}")
    private String SERVER_DIR;

    @Value("#{properties['File.Base.Directory']}")
    private String BASE_DIR;

    /** 출장신청 리스트 페이지 */
    @RequestMapping("/bustrip/bustripList.do")
    public String bustripList(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/bustrip/bustripList";
    }

    /** new 출장신청 리스트 페이지 */
    @RequestMapping("/bustrip/bustripList2.do")
    public String bustripList2(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/bustrip/bustripList2";
    }

    /** 해외출장신청 리스트 페이지 */
    @RequestMapping("/bustrip/businessList.do")
    public String businessList(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/bustrip/business/businessList";
    }

    /** 출장신청 등록 팝업*/
    @RequestMapping("/bustrip/pop/bustripReqPop.do")
    public String bustripReqPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("rs", bustripService.getBustripReqInfo(params));
        model.addAttribute("params", params);
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "popup/inside/bustrip/bustripReqPop";
    }

    /** 출장신청 리스트 관리자 페이지 */
    @RequestMapping("/bustrip/bustripMngList.do")
    public String bustripMngList(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/bustrip/bustripMngList";
    }
    
    //출장신청
    @RequestMapping("/bustrip/bustripReq.do")
    public String bustripReq(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/bustrip/bustripReq";
    }

    //출장결과보고
    @RequestMapping("/bustrip/bustripResult.do")
    public String bustripResult(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/bustrip/bustripResult";
    }

    /** 외부인력 추가 팝업 */
    @RequestMapping("/bustrip/pop/addExternalWorkforcePop.do")
    public String addExternalWorkforcePop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("rs", bustripService.getBustripOne(params));
        model.addAttribute("params", params);
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "popup/inside/bustrip/addExternalWorkforcePop";
    }

    /** 출장결과보고 리스트 관리자 페이지 */
    @RequestMapping("/bustrip/bustripResMngList.do")
    public String bustripResMngList(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/bustrip/bustripResMngList";
    }

    @RequestMapping("/bustrip/getBustripTotInfo")
    public String getBustripTotInfo(@RequestParam Map<String, Object> params, Model model){

        List<Map<String, Object>> list = bustripService.getBustripTotInfo(params);

        model.addAttribute("list", list);


        return "jsonView";
    }

    @RequestMapping("/bustrip/getBustripResTotInfo")
    public String getBustripResTotInfo(@RequestParam Map<String, Object> params, Model model){

        List<Map<String, Object>> list = bustripService.getBustripResTotInfo(params);

        model.addAttribute("list", list);


        return "jsonView";
    }

    /**
     * 출장신청 데이터 불러오기
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/bustrip/getBustripReqInfo")
    public String getBustripReqInfo(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("rs", bustripService.getBustripReqInfo(params));
        model.addAttribute("params", params);

        return "jsonView";
    }

    /**
     * 출장결과보고 데이터 불러오기
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/bustrip/getBustripResReqInfo")
    public String getBustripResReqInfo(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("rs", bustripService.getBustripResReqInfo(params));
        model.addAttribute("params", params);

        return "jsonView";
    }

    /**
     * 출장결과보고
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/bustrip/viewBustripResult.do")
    public String viewBustripResult(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/bustrip/bustripResult";
    }

    /**
     * 출장결과보고 상태값 확인
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/bustrip/getBustripReqCheck")
    public String getBustripReqCheck(@RequestParam Map<String, Object> params, Model model){
        logger.info("controller getBustripReqCheck");
        model.addAttribute("rs", bustripService.getBustripReqCheck(params));

        return "jsonView";
    }

    //관외출장 신청 페이지
    @RequestMapping("/bustrip/pop/bustripResultPop.do")
    public String bustripResultPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        List<Map<String, Object>> exnpData = new ArrayList<>();
        List<Map<String, Object>> exnpData2 = new ArrayList<>();
        List<Map<String, Object>> extData = new ArrayList<>();
        Map<String, Object> paramsMap = new HashMap<>();

        /** tripType이 있을때만 실행되게 수정 (전자결재에서 수정버튼 누를시에 tripType 파라미터 없음) */
        if(params.containsKey("tripType") && params.get("tripType").equals("4")){
            paramsMap.put("hrBizReqId", params.get("hrBizReqId"));
            exnpData = bustripService.getBusinessOverExnpInfo(paramsMap);
            if(params.containsKey("hrBizReqResultId")){
                paramsMap.put("hrBizReqResultId", params.get("hrBizReqResultId"));
                exnpData2 = bustripService.getBusinessOverExnpInfo(paramsMap);
            }
        } else {
            exnpData = bustripService.getBustripExnpInfo(params);
            extData = bustripService.getExtData(params);
        }

        if(exnpData.size() != 0){
            model.addAttribute("list", exnpData);
            model.addAttribute("jsonList", new Gson().toJson(exnpData));
        }

        if(exnpData2.size() != 0){
            model.addAttribute("list2", exnpData2);
            model.addAttribute("jsonList2", new Gson().toJson(exnpData2));
        }

        model.addAttribute("extData", extData);
        model.addAttribute("rs", bustripService.getBustripOne(params));
        model.addAttribute("params", params);
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "popup/inside/bustrip/bustripResultPop";
    }

    //해외 출장 여비 조회
    @RequestMapping("/bustrip/getBusinessOverExnpInfo")
    public String getBusinessOverExnpInfo(@RequestParam Map<String, Object> params, Model model) {
        List<Map<String, Object>> list = bustripService.getBusinessOverExnpInfo(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    @RequestMapping("/bustrip/pop/bustripExnpPop.do")
    public String bustripExnpPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        List<Map<String, Object>> list = bustripService.getBustripResTotInfo(params);
        //params.put("BType", "B");
        List<Map<String, Object>> exnpData = new ArrayList<>();
        if(params.get("tripType").equals("4")){
            exnpData = bustripService.getBusinessOverExnpInfo(params);
        } else {
            exnpData = bustripService.getBustripExnpInfo(params);
        }

        Map<String, Object> data = bustripService.getBustripOne(params);
        model.addAttribute("rs", data);

        List<Map<String, Object>> extData = bustripService.getExtData(params);
        model.addAttribute("extData", extData);
        if(exnpData.size() == 0){
            model.addAttribute("list", list);
            model.addAttribute("type", "ins");
        } else{
            model.addAttribute("list", exnpData);
            model.addAttribute("type", "upd");
        }

        model.addAttribute("data", data);
        model.addAttribute("rs", bustripService.getBustripOne(params));
        model.addAttribute("params", params);
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);

        if(!"4".equals(data.get("TRIP_CODE").toString())){
            return "popup/inside/bustrip/bustripExnpPop";
        }else{
            return "popup/inside/bustrip/bustripExnpPop2";
        }
    }

    @RequestMapping("/bustrip/pop/businessExnpPop.do")
    public String businessExnpPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        /** 해외출장 사전정산 추가 */
        List<Map<String, Object>> list = bustripService.getBustripTotInfo(params);
        List<Map<String, Object>> exnpData = bustripService.getBusinessOverExnpInfo(params);
        model.addAttribute("rs", bustripService.getBusinessOne(params));

        Map<String, Object> crmMap = new HashMap<>();
        Map<String, Object> corpMap = new HashMap<>();
        Map<String, Object> carMap = new HashMap<>();

        if(exnpData.size() == 0){
            model.addAttribute("list", list);
            model.addAttribute("type", "ins");
        } else{
            model.addAttribute("list", exnpData);
            model.addAttribute("type", "upd");
        }

        List<Map<String, Object>> extData = bustripService.getExtData(params);
        model.addAttribute("extData", extData);

        model.addAttribute("rs", bustripService.getBustripOne(params));
        model.addAttribute("params", params);
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "popup/inside/bustrip/business/businessExnpPop";
    }

    /** 해외출장 전용 지급신청 조회 팝업 */
    @RequestMapping("/bustrip/pop/businessExnp.do")
    public String businessExnp(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("rs", bustripService.getBustripOne(params));
        model.addAttribute("params", params);
        model.addAttribute("loginVO", login);
        return "popup/inside/bustrip/business/businessExnp";
    }

    //출장결과조회
    @RequestMapping("/bustrip/getBustripOne")
    public String getBustripOne(@RequestParam Map<String, Object> params, Model model) {
        model.addAttribute("map", bustripService.getBustripOne(params));
        return "jsonView";
    }

    /** 출장 정산목록 페이지 */
    @RequestMapping("/bustrip/bustripSettleList.do")
    public String bustripSettleList(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/bustrip/bustripSettleList";
    }

    /** 출장 정산목록 페이지 */
    @RequestMapping("/bustrip/bustripSettleList2.do")
    public String bustripSettleList2(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/bustrip/bustripSettleList2";
    }

    /** 출장 정산목록 리스트 */
    @RequestMapping("/bustrip/getBustripSettleList")
    public String getBustripSettleList(@RequestParam Map<String, Object> params, Model model) {
        List<Map<String, Object>> list = bustripService.getBustripSettleList(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    //경유지기준정보
    @RequestMapping("/bustrip/waypointCostList.do")
    public String waypointCostList(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/bustrip/waypointCostList";
    }

    //경유지기준정보 설정 팝업
    @RequestMapping("/bustrip/pop/waypointCostReqPop.do")
    public String waypointCostReqPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);
        return "popup/inside/bustrip/waypointCostReqPop";
    }

    //유가 기준정보 리스트 페이지
    @RequestMapping("/bustrip/bustripFuelCostList.do")
    public String bustripFuelCostList(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/bustrip/bustripFuelCostList";
    }

    //유가 기준정보 추가 팝업
    @RequestMapping("/bustrip/pop/bustripFuelCostReqPop.do")
    public String bustripFuelCostReqPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);
        return "popup/inside/bustrip/bustripFuelCostReqPop";
    }

    @RequestMapping("/bustrip/getBustripFuelCostOne")
    public String getBustripFuelCostOne(@RequestParam Map<String, Object> params, Model model) {
        model.addAttribute("data", bustripService.getBustripFuelCostOne(params));
        return "jsonView";
    }

    //환율 관리 팝업
    @RequestMapping("/bustrip/pop/bustripExchangeMngPop.do")
    public String bustripExchangeMngPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        Map<String, Object> data = bustripService.getExchangeInfo(params);
        model.addAttribute("data", data);
        return "popup/inside/bustrip/bustripExchangeMngPop";
    }

    //국내출장여비 리스트 페이지
    @RequestMapping("/bustrip/bustripCostList.do")
    public String bustripCostList(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/bustrip/bustripCostList";
    }

    //국내출장여비 설정 팝업
    @RequestMapping("/bustrip/pop/bustripCostReqPop.do")
    public String bustripCostReqPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);
        return "popup/inside/bustrip/bustripCostReqPop";
    }

    @RequestMapping("/bustrip/getBusinessCostOne")
    public String getBusinessCostOne(@RequestParam Map<String, Object> params, Model model){
        Map<String, Object> data = bustripService.getBusinessCostOne(params);
        model.addAttribute("data", data);
        return "jsonView";
    }

    //해외출장여비 리스트 페이지
    @RequestMapping("/bustrip/businessCostList.do")
    public String businessCostList(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/bustrip/business/businessCostList";
    }

    //해외출장여비 설정 팝업
    @RequestMapping("/bustrip/pop/businessCostReqPop.do")
    public String businessCostReqPop(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", login);
        return "popup/inside/bustrip/business/businessCostReqPop";
    }

    //해외출장여비 리스트 페이지
    @RequestMapping("/bustrip/nationCodeManagement.do")
    public String nationCodeManagement(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/bustrip/business/nationCodeManagement";
    }

    /**
     * 출장 신청
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/bustrip/setBustripReq")
    public String setBustripReq(@RequestParam Map<String, Object> params, MultipartHttpServletRequest request, Model model){
        MultipartFile[] file = request.getFiles("bustripFile").toArray(new MultipartFile[0]);
        bustripService.setBustripReq(params, file, SERVER_DIR, BASE_DIR);
        model.addAttribute("rs", params);
        return "jsonView";
    }

    @RequestMapping("/bustrip/getBustripList")
    public String getBustripList(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){

        List<Map<String, Object>> list = bustripService.getBustripList(params);

        model.addAttribute("list", list);
        return "jsonView";
    }

    @RequestMapping("/bustrip/getPopBustripList")
    public String getPopBustripList(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){

        List<Map<String, Object>> list = bustripService.getPopBustripList(params);

        model.addAttribute("list", list);
        return "jsonView";
    }

    @RequestMapping("/bustrip/delBustripReq")
    public String delBustripReq(@RequestParam String[] keyAr, Model model){
        try{
            Map<String, Object> params = new HashMap<>();
            params.put("keyAr", keyAr);
            params.put("hrBizReqId", keyAr[0]);
            bustripService.delBustripReq(params);
            model.addAttribute("rs", "sc");
        } catch (Exception e){
            e.printStackTrace();
        }
        return "jsonView";
    }

    //출장신청 전자결재
    @RequestMapping("/Inside/pop/approvalFormPopup/bustripApprovalPop.do")
    public String bustripApprovalPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        LoginVO login = getLoginVO(request);

        List<Map<String, Object>> list = bustripService.getBustripTotInfo(params);

        model.addAttribute("list", list);
        model.addAttribute("data", params);
        model.addAttribute("loginVO", login);
        return "/popup/bustrip/approvalFormPopup/bustripApprovalPop";
    }

    //출장결과보고 전자결재
    @RequestMapping("/Inside/pop/approvalFormPopup/bustripResApprovalPop.do")
    public String bustripResApprovalPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        LoginVO login = getLoginVO(request);

        List<Map<String, Object>> list = bustripService.getBustripResTotInfo(params);
        model.addAttribute("list", list);
        List<Map<String, Object>> exnpData = bustripService.getBustripExnpInfo(params);

        Map<String, Object> rs = bustripService.getBustripOne(params);
        model.addAttribute("exnpList", exnpData);
        model.addAttribute("rs", rs);
        model.addAttribute("data", params);
        model.addAttribute("loginVO", login);

        params.put("hrBizReqId", rs.get("HR_BIZ_REQ_ID"));
        params.put("fileCd", "bustripReq");
        model.addAttribute("fileInfo", bustripService.getBustripReqFileInfo(params));

        return "/popup/bustrip/approvalFormPopup/bustripResApprovalPop";
    }

    /**
     * 여비리스트 (사전정산)
     * @param params
     * @return
     */
    @RequestMapping(value = "/inside/getBusinessExnpInfo")
    public String getBusinessExnpInfo(@RequestParam Map<String, Object> params, Model model) {
        List<Map<String, Object>> list = bustripService.getBusinessExnpInfo(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    /**
     * 여비리스트
     * @param params
     * @return
     */
    @RequestMapping(value = "/inside/getBustripExnpInfo")
    public String getBustripExnpInfo(@RequestParam Map<String, Object> params, Model model) {
        List<Map<String, Object>> list = bustripService.getBustripExnpInfo(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    /**
     * 출장신청서 결재 상태값에 따른 UPDATE 메서드
     * @param bodyMap
     * @return
     */
    @RequestMapping(value = "/inside/bustripReqApp")
    public String bustripReqApp(@RequestParam Map<String, Object> bodyMap, Model model) {
        System.out.println("bodyMap");
        System.out.println(bodyMap);
        String resultCode = "SUCCESS";
        String resultMessage = "성공하였습니다.";
        try{
            bustripService.updateDocState(bodyMap);
        }catch(Exception e){
            logger.error(e.getMessage());
            resultCode = "FAIL";
            resultMessage = "연계 정보 갱신 오류 발생("+e.getMessage()+")";
        }
        model.addAttribute("resultCode", resultCode);
        model.addAttribute("resultMessage", resultMessage);
        return "jsonView";
    }

    /**
     * 출장 결과보고서 상태값에 따른 UPDATE 메서드
     * @param bodyMap
     * @return
     */
    @RequestMapping(value = "/inside/bustripResReqApp")
    public String bustripResReqApp(@RequestParam Map<String, Object> bodyMap, Model model) {
        System.out.println("bodyMap");
        System.out.println(bodyMap);
        String resultCode = "SUCCESS";
        String resultMessage = "성공하였습니다.";
        try{
            bustripService.updateResDocState(bodyMap);
        }catch(Exception e){
            logger.error(e.getMessage());
            resultCode = "FAIL";
            resultMessage = "연계 정보 갱신 오류 발생("+e.getMessage()+")";
        }
        model.addAttribute("resultCode", resultCode);
        model.addAttribute("resultMessage", resultMessage);
        return "jsonView";
    }

    @RequestMapping("/bustrip/saveBustripResult")
    public String saveBustripResult(@RequestParam Map<String, Object> params, MultipartHttpServletRequest request, Model model){
        MultipartFile[] file = request.getFiles("bustripResFile").toArray(new MultipartFile[0]);

        try{
            bustripService.saveBustripResult(params, file, SERVER_DIR, BASE_DIR);
            model.addAttribute("params", params);
        } catch (Exception e){
            e.printStackTrace();
        }


        return "jsonView";
    }

    @RequestMapping("/bustrip/getFileList")
    public String getFileList(@RequestParam Map<String, Object> params, Model model){
        params.put("fileCd", "bustripReq");
        model.addAttribute("fileInfo", bustripService.getBustripReqFileInfo(params));


        return "jsonView";
    }

    @RequestMapping("/bustrip/getResultFileList")
    public String getResultFileList(@RequestParam Map<String, Object> params, Model model){

        Map<String, Object> map = bustripService.getBustripOne(params);
        params.put("fileCd", "bustripReq");
        params.put("hrBizReqId", map.get("HR_BIZ_REQ_ID"));

        List<Map<String, Object>> resultMap = bustripService.getBustripReqFileInfoR(params);
        List<Map<String, Object>> tempMap = bustripService.getAbroadBustripReqFileInfo(params);
//        if(map.get("TRIP_CODE").equals("4") && tempMap != null){
//            resultMap.addAll(tempMap);
//        }
        model.addAttribute("fileInfo", resultMap);

        List<Map<String, Object>> fileList = bustripService.getBustripDocFile(params);
        model.addAttribute("fileList", fileList);

        return "jsonView";
    }

    @RequestMapping("/bustrip/saveBustripExnpPop")
    public String saveBustripExnpPop(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){

        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        params.put("regEmpSeq", loginVO.getUniqId());
        try{
            bustripService.saveBustripExnpPop(params);
            model.addAttribute("hrBizExnpId", params.get("hrBizExnpId"));
            model.addAttribute("hrBizReqId", params.get("hrBizReqId"));
        } catch (Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/bustrip/saveBustripOverExnpPop")
    public String saveBustripOverExnpPop(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){

        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        params.put("regEmpSeq", loginVO.getUniqId());
        try{
            bustripService.saveBustripOverExnpPop(params);
            model.addAttribute("hrBizOverExnpId", params.get("hrBizOverExnpId"));
            model.addAttribute("hrBizReqId", params.get("hrBizReqId"));
        } catch (Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/bustrip/insBustripExnpResult")
    public String insBustripExnpResult(@RequestParam Map<String, Object> params, Model model){
        try{
            bustripService.insBustripExnpResult(params);
            model.addAttribute("hrBizExnpId", params.get("hrBizExnpId"));
        } catch (Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    //같은 날 일비 중복조회
    @RequestMapping("/bustrip/getBustripMaxDayCost")
    public String getBustripMaxDayCost(@RequestParam Map<String, Object> params, Model model){
        Map<String, Object> data = bustripService.getBustripMaxDayCost(params);
        model.addAttribute("data", data);

        return "jsonView";
    }

    //국내출장여비 리스트
    @RequestMapping("/bustrip/getBustripCostList")
    public String getBustripCostList(@RequestParam Map<String, Object> params, Model model){
        List<Map<String, Object>> list = bustripService.getBustripCostList(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    //해외출장여비 리스트
    @RequestMapping("/bustrip/getBusinessCostList")
    public String getBusinessCostList(@RequestParam Map<String, Object> params, Model model){
        List<Map<String, Object>> list = bustripService.getBusinessCostList(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    //해외출장 나라코드 리스트
    @RequestMapping("/bustrip/nationCodeList")
    public String nationCodeList(@RequestParam Map<String, Object> params, Model model){
        List<Map<String, Object>> list = bustripService.nationCodeList(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    //해외출장 나라코드 소분류 리스트
    @RequestMapping("/bustrip/nationSmCodeList")
    public String nationSmCodeList(@RequestParam Map<String, Object> params, Model model){
        List<Map<String, Object>> list = bustripService.nationSmCodeList(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    //해외출장 나라코드 리스트
    @RequestMapping("/bustrip/getNationCode")
    public String getNationCode(@RequestParam Map<String, Object> params, Model model){
        List<Map<String, Object>> list = bustripService.getNationCode(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    //해외출장 나라코드 데이터
    @RequestMapping("/bustrip/getNationCodeInfo")
    public String getNationCodeInfo(@RequestParam Map<String, Object> params, Model model){
        Map<String, Object> data = bustripService.getNationCodeInfo(params);
        model.addAttribute("data", data);
        return "jsonView";
    }

    //여비등록
    @RequestMapping("/bustrip/setBustripCostInsert")
    public String setBustripCostInsert(@RequestParam Map<String, Object> params, Model model){
        bustripService.setBustripCostInsert(params);
        return "jsonView";
    }

    //해외출장 여비등록
    @RequestMapping("/bustrip/setBusinessCostInsert")
    public String setBusinessCostInsert(@RequestParam Map<String, Object> params, Model model){
        bustripService.setBusinessCostInsert(params);
        return "jsonView";
    }

    //해외출장 나라코드등록
    @RequestMapping("/bustrip/insNationCode")
    public String insNationCode(@RequestParam Map<String, Object> params, Model model){
        try{
            bustripService.insNationCode(params);
            model.addAttribute("code", 200);
        } catch (Exception e){
            e.printStackTrace();
        }
        return "jsonView";
    }

    //출장유가등록
    @RequestMapping("/bustrip/setBustripFuelCostInsert")
    public String setBustripFuelCostInsert(@RequestParam Map<String, Object> params, Model model){
        bustripService.setBustripFuelCostInsert(params);
        return "jsonView";
    }

    @RequestMapping("/bustrip/setFuelCostDelete")
    public String setFuelCostDelete(@RequestParam Map<String, Object> params, Model model){
        bustripService.setFuelCostDelete(params);
        return "jsonView";
    }

    //환율정보수정
    @RequestMapping("/bustrip/setExchangeRateUpdate")
    public String setExchangeRateUpdate(@RequestParam Map<String, Object> params, Model model){
        bustripService.setExchangeRateUpdate(params);
        return "jsonView";
    }

    //경유지 리스트
    @RequestMapping("/bustrip/getWaypointCostList")
    public String getWaypointCostList(@RequestParam Map<String, Object> params, Model model){
        List<Map<String, Object>> list = bustripService.getWaypointCostList(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    //경유지등록
    @RequestMapping("/bustrip/setWaypointCostInsert")
    public String setWaypointCostInsert(@RequestParam Map<String, Object> params){
        bustripService.setWaypointCostInsert(params);
        return "jsonView";
    }

    @RequestMapping("/bustrip/getWaypointCostOne")
    public String getWaypointCostOne(@RequestParam Map<String, Object> params, Model model){
        Map<String, Object> data = bustripService.getWaypointCostOne(params);
        model.addAttribute("data", data);
        return "jsonView";
    }

    @RequestMapping("/bustrip/setWaypointCostDelete")
    public String setWaypointCostDelete(@RequestParam Map<String, Object> params, Model model){
        bustripService.setWaypointCostDelete(params);
        return "jsonView";
    }

    //여비 승인
    @RequestMapping("/bustrip/setReqCert")
    public String setReqCert(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request) {
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        try{
            bustripService.setReqCert(params);
            model.addAttribute("rs", "sc");
        } catch (Exception e){
            e.printStackTrace();
        }
        return "jsonView";

    }

    //해외출장 사전정산 저장시 처리
    @RequestMapping("/bustrip/setBusiCert")
    public String setBusiCert(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request) {
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        try{
            bustripService.setBusiCert(params);
            model.addAttribute("rs", "sc");
        } catch (Exception e){
            e.printStackTrace();
        }
        return "jsonView";

    }

    //출장 기준유가 리스트
    @RequestMapping("/bustrip/getBustripFuelCostList")
    public String getBustripFuelCostList(@RequestParam Map<String, Object> params, Model model){
        List<Map<String, Object>> list = bustripService.getBustripFuelCostList(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    //유류 기준정보 조회
    @RequestMapping("/bustrip/getBustripFuelCostInfo")
    public String getBustripFuelCostInfo(@RequestParam Map<String, Object> params, Model model){
        Map<String, Object> data = bustripService.getBustripFuelCostInfo(params);
        model.addAttribute("data", data);

        return "jsonView";
    }

    //출장 시점 유류 기준정보 조회
    @RequestMapping("/bustrip/getRegFuelCost")
    public String getRegFuelCost(@RequestParam Map<String, Object> params, Model model){
        Map<String, Object> data = bustripService.getRegFuelCost(params);
        model.addAttribute("data", data);

        return "jsonView";
    }

    //유류 기준정보 조회
    @RequestMapping("/bustrip/getExchangeInfo")
    public String getExchangeInfo(@RequestParam Map<String, Object> params, Model model){
        Map<String, Object> data = bustripService.getExchangeInfo(params);
        model.addAttribute("data", data);

        return "jsonView";
    }

    @RequestMapping("/bustrip/pop/viewBustripList.do")
    public String viewBustripList(){

        return "popup/inside/bustrip/viewBustripList";
    }

    /** 여비 첨부파일 저장 */
    @RequestMapping("/bustrip/setExnpFile")
    public String setExnpFile(@RequestParam Map<String, Object> params, MultipartHttpServletRequest request, Model model){
        MultipartFile[] file = request.getFiles("bustripFile").toArray(new MultipartFile[0]);
        bustripService.setExnpFile(params, file, SERVER_DIR, BASE_DIR);
        return "jsonView";
    }

    /** 여비 첨부파일 조회 */
    @RequestMapping("/bustrip/getExnpFile")
    public String getExnpFile(@RequestParam Map<String, Object> params, Model model){
        List<Map<String, Object>> list = bustripService.getExnpFile(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    /** 여비 첨부파일 전체조회 */
    @RequestMapping("/bustrip/getExnpFileNum")
    public String getExnpFileNum(@RequestParam Map<String, Object> params, Model model){
        List<Map<String, Object>> list = bustripService.getExnpFileNum(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    /** 결재문서 파일 */
    @RequestMapping("/bustrip/getBustripDocFile")
    public String getBustripDocFile(@RequestParam Map<String, Object> params, Model model){
        List<Map<String, Object>> list = bustripService.getBustripDocFile(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    @RequestMapping("/bustrip/getBustripReqDocFile")
    public String getBustripReqDocFile(@RequestParam Map<String, Object> params, Model model){
        List<Map<String, Object>> list = bustripService.getBustripReqDocFile(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    /** 하나의 프로젝트에 대한 모든 출장여비 합계 pjtSn */
    @RequestMapping("/bustrip/getBustripExnpSum")
    public String getPurcSum(@RequestParam Map<String, Object> params, Model model){
        Map<String, Object> data = bustripService.getBustripExnpSum(params);
        model.addAttribute("data", data);
        return "jsonView";
    }

    /** 여비 삭제 처리 */
    @RequestMapping("/bustrip/delBustripCost")
    public String delBustripCost(@RequestParam Map<String, Object> params, Model model){
        try{
            bustripService.delBustripCost(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }
        return "jsonView";
    }

    /** 협업 팀 추가/수정 */
    @RequestMapping("/bustrip/setCardHist")
    public String setTeam(@RequestParam Map<String, Object> params, Model model){
        try{
            bustripService.setCardHist(params);
            model.addAttribute("code", 200);
            model.addAttribute("rep", params);
        } catch(Exception e){
            e.printStackTrace();
            model.addAttribute("code", 500);
        }
        return "jsonView";
    }

    /** ibrench 카드 이력 등록 리스트 조회 */
    @RequestMapping("/bustrip/getCardList")
    public String getCardList(@RequestParam Map<String, Object> params, Model model){
        List<Map<String, Object>> list = bustripService.getCardList(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    /** ibrench 카드 이력 등록 (해외출장 사전정산) */
    @RequestMapping("/bustrip/setBusiCardHist")
    public String setBusiCardHist(@RequestParam Map<String, Object> params, Model model){
        try{
            bustripService.setBusiCardHist(params);
            model.addAttribute("code", 200);
            model.addAttribute("rep", params);
        } catch(Exception e){
            e.printStackTrace();
            model.addAttribute("code", 500);
        }
        return "jsonView";
    }

    private static LoginVO getLoginVO(HttpServletRequest request) {
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        return loginVO;
    }

    //오늘날짜 구하기 yyyyMMddhhmmss
    public static String getCurrentDateTime() {
        Date today = new Date();
        Locale currentLocale = new Locale("KOREAN", "KOREA");
        String pattern = "yyyyMMddHHmmss";
        SimpleDateFormat formatter = new SimpleDateFormat(pattern, currentLocale);
        return formatter.format(today);
    }

    @RequestMapping("/bustrip/getProjectBustList")
    public String getProjectBustList(@RequestParam Map<String, Object> params, Model model){

        List<Map<String, Object>> list = new ArrayList<>();
        list = bustripService.getProjectBustList(params);
        model.addAttribute("list", list);

        return "jsonView";
    }

    @RequestMapping("/bustrip/getProjectBustMetList")
    public String getProjectBustMetList(@RequestParam Map<String, Object> params, Model model){

        List<Map<String, Object>> list = new ArrayList<>();
        list = bustripService.getProjectBustMetList(params);
        model.addAttribute("list", list);

        return "jsonView";
    }

    /** 출장 여비정산 개인 데이터(지급신청용) */
    @RequestMapping("/bustrip/getPersonalExnpData")
    public String getPersonalExnpData(@RequestParam Map<String, Object> params, Model model){

        List<Map<String, Object>> list = bustripService.getPersonalExnpData(params);
        model.addAttribute("list", list);

        return "jsonView";
    }

    /** 출장 여비정산 법인 데이터(지급신청용) */
    @RequestMapping("/bustrip/getCorpExnpData")
    public String getCorpExnpData(@RequestParam Map<String, Object> params, Model model){

        List<Map<String, Object>> list = bustripService.getCorpExnpData(params);
        model.addAttribute("list", list);

        return "jsonView";
    }

    /** 출장 여비정산 법인차량 데이터(지급신청용) */
    @RequestMapping("/bustrip/getCorpCarExnpData")
    public String getCorpCarExnpData(@RequestParam Map<String, Object> params, Model model){

        Map<String, Object> map = bustripService.getCorpCarExnpData(params);
        model.addAttribute("map", map);

        return "jsonView";
    }

    /** 해외출장 여비정산 - 개인, 업체지급 (지급신청용) */
    @RequestMapping("/bustrip/getBusinessOverExnpData")
    public String getBusinessOverExnpData(@RequestParam Map<String, Object> params, Model model){

        List<Map<String, Object>> list = bustripService.getBusinessOverExnpData(params);
        model.addAttribute("list", list);

        return "jsonView";
    }

    /** 해외출장 여비정산 - 법인카드 (지급신청용) */
    @RequestMapping("/bustrip/getBusinessCorpOverExnpData")
    public String getBusinessCorpOverExnpData(@RequestParam Map<String, Object> params, Model model){

        List<Map<String, Object>> list = bustripService.getBusinessCorpOverExnpData(params);
        model.addAttribute("list", list);

        return "jsonView";
    }

    /** 출장정산목록 데이터 */
    @RequestMapping("/bustrip/getBustripExnpTotalData")
    public String getBustripExnpTotalData(@RequestParam Map<String, Object> params, Model model){
        Map<String, Object> data = bustripService.getBustripExnpTotalData(params);
        model.addAttribute("data", data);
        return "jsonView";
    }

    @RequestMapping("/bustrip/getExnpHistOne")
    public String getExnpHistOne(@RequestParam Map<String, Object> params, Model model){
        Map<String, Object> map = bustripService.getExnpHistOne(params);
        model.addAttribute("map", map);
        return "jsonView";
    }
    @RequestMapping("/bustrip/getExnpHistFileList")
    public String getExnpHistFileList(@RequestParam Map<String, Object> params, Model model){
        List<Map<String, Object>> list = bustripService.getExnpHistFileList(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    @RequestMapping("/bustrip/getExnpHistFileOne")
    public String getExnpHistFileOne(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("data", bustripService.getExnpHistFileOne(params));
        return "jsonView";
    }

    @RequestMapping("/bustrip/getBustripEmpInfo")
    public String getBustripEmpInfo(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("empInfo", userManageService.getEmpInfo(params));
        return "jsonView";
    }

    @RequestMapping("/bustrip/setBustripPdfFile")
    public String setBustripPdfFile(@RequestParam Map<String, Object> params, MultipartHttpServletRequest request, Model model){
        MultipartFile[] file = request.getFiles("bustripPdfFile").toArray(new MultipartFile[0]);
        bustripService.setBustripPdfFile(params, file, SERVER_DIR, BASE_DIR);
        return "jsonView";
    }

    @RequestMapping("/bustrip/makeHtmlToPdf")
    public String makeHtmlToPdf(@RequestParam Map<String, Object> params, Model model){
        createPdf(params);

        return "jsonView";
    }

    public void createPdf(Map<String, Object> params){
        Document document = new Document();

        try {
            // PDF 파일 생성
            String fileUUID = UUID.randomUUID().toString();
            String fileOrgName = "법인카드 지출증빙";
            String fileCd = "bustripResReq";
            String fileExt = "pdf";

            params.put("menuCd", fileCd);
            String filePathTxt = filePath(params, SERVER_DIR);

            // PDF 생성을 위한 OutputStream 생성
            File f = new File(filePathTxt);
            if(!f.exists()) {
                f.mkdirs();
            }

            PdfWriter pdfWriter = PdfWriter.getInstance(document, new FileOutputStream(filePathTxt + fileUUID + "." + fileExt));
            // PDF 파일 열기
            document.open();

            String htmlStr = "<html><body style='font-family: gulim;'>"+ params.get("html") +"</body></html>";

            XMLWorkerHelper helper = XMLWorkerHelper.getInstance();

            CSSResolver cssResolver = new StyleAttrCSSResolver();

            XMLWorkerFontProvider fontProvider = new XMLWorkerFontProvider(XMLWorkerFontProvider.DONTLOOKFORFONTS);
            fontProvider.register("/egovframework/fonts/gulim.ttf", "gulim"); //MalgunGothic은 font-family용 alias

            CssAppliers cssAppliers = new CssAppliersImpl(fontProvider);
            HtmlPipelineContext htmlContext = new HtmlPipelineContext(cssAppliers);
            htmlContext.setTagFactory(Tags.getHtmlTagProcessorFactory());

            // html을 pdf로 변환시작
            PdfWriterPipeline pdf = new PdfWriterPipeline(document, pdfWriter);
            HtmlPipeline html = new HtmlPipeline(htmlContext, pdf);
            CssResolverPipeline css = new CssResolverPipeline(cssResolver, html);

            XMLWorker worker = new XMLWorker(css, true);
            //캐릭터 셋 설정
            XMLParser xmlParser = new XMLParser(worker, Charset.forName("UTF-8"));

            StringReader strReader = new StringReader(htmlStr);
            xmlParser.parse(strReader);

            document.close();
            pdfWriter.close();

            Map<String, Object> fileParameters = new HashMap<>();
            fileParameters.put("fileCd", fileCd);
            fileParameters.put("fileUUID", fileUUID+"."+fileExt);
            fileParameters.put("fileOrgName", fileOrgName);
            fileParameters.put("filePath", filePath(params, BASE_DIR));
            fileParameters.put("fileExt", fileExt);
            fileParameters.put("fileSize", 99);
            fileParameters.put("contentId", params.get("hrBizReqResultId"));
            fileParameters.put("empSeq", "1");

            // 이전에 저장한 파일 삭제
            commonService.delContentFileOne(fileParameters);
            // DB에 데이터 저장
            commonService.insFileInfoOne(fileParameters);

        } catch (Exception e){
            e.printStackTrace();
        }
    }

    private String filePath (Map<String, Object> params, String base_dir){
        LocalDate now = LocalDate.now();
        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyy/MM/dd");
        String fmtNow = now.format(fmt);

        String path = base_dir + params.get("menuCd").toString()+"/" + fmtNow + "/";

        return path;
    }

    @RequestMapping("/bustrip/pop/cardToBustripListView.do")
    public String cardToBustripListView(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", login);
        return "popup/inside/bustrip/cardToBustripListView";
    }

    @RequestMapping("/bustrip/getBustripPopList")
    public String getBustripPopList(@RequestParam Map<String, Object> params, Model model){

        List<Map<String, Object>> list = bustripService.getBustripPopList(params);

        model.addAttribute("list", list);
        return "jsonView";
    }

    @RequestMapping("/bustrip/getDuplBustrip")
    public String getDuplBustrip(@RequestParam Map<String, Object> params, Model model){
        List<Map<String, Object>> list = bustripService.getDuplBustrip(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    @RequestMapping("/bustrip/getDuplMeetingCard")
    public String getDuplMeetingCard(@RequestParam Map<String, Object> params, Model model){
        List<Map<String, Object>> list = bustripService.getDuplMeetingCard(params);
        model.addAttribute("list", list);
        return "jsonView";
    }
}
