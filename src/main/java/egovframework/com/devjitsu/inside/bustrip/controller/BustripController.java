package egovframework.com.devjitsu.inside.bustrip.controller;

import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import egovframework.com.devjitsu.gw.user.service.UserService;
import egovframework.com.devjitsu.inside.bustrip.service.BustripService;
import org.apache.commons.collections4.MapUtils;
import org.json.simple.JSONObject;
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
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
public class BustripController {

    private static final Logger logger = LoggerFactory.getLogger(BustripController.class);

    @Autowired
    private UserService userService;

    @Autowired
    private BustripService bustripService;

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

        model.addAttribute("rs", bustripService.getBustripOne(params));
        model.addAttribute("params", params);
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "popup/inside/bustrip/bustripResultPop";
    }

    @RequestMapping("/bustrip/pop/bustripExnpPop.do")
    public String bustripExnpPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        List<Map<String, Object>> list = bustripService.getBustripResTotInfo(params);
        List<Map<String, Object>> exnpData = bustripService.getBustripExnpInfo(params);

        if(exnpData.size() == 0){
            model.addAttribute("list", list);
            model.addAttribute("type", "ins");
        } else{
            model.addAttribute("list", exnpData);
            model.addAttribute("type", "upd");
        }
        model.addAttribute("params", params);
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "popup/inside/bustrip/bustripExnpPop";
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
    public String waypointCostReqPop(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
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
    public String bustripFuelCostReqPop(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "popup/inside/bustrip/bustripFuelCostReqPop";
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
    public String bustripCostReqPop(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "popup/inside/bustrip/bustripCostReqPop";
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
        model.addAttribute("exnpList", exnpData);
        model.addAttribute("rs", bustripService.getBustripOne(params));
        model.addAttribute("data", params);
        model.addAttribute("loginVO", login);
        return "/popup/bustrip/approvalFormPopup/bustripResApprovalPop";
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
    public String saveBustripResult(@RequestParam Map<String, Object> params, Model model){

        try{
            bustripService.saveBustripResult(params);
            model.addAttribute("params", params);
        } catch (Exception e){
            e.printStackTrace();
        }


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

    //여비등록
    @RequestMapping("/bustrip/setBustripCostInsert")
    public String setBustripCostInsert(@RequestParam Map<String, Object> params, Model model){
        bustripService.setBustripCostInsert(params);
        return "jsonView";
    }

    //출장유가등록
    @RequestMapping("/bustrip/setBustripFuelCostInsert")
    public String setBustripFuelCostInsert(@RequestParam Map<String, Object> params, Model model){
        bustripService.setBustripFuelCostInsert(params);
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

    @RequestMapping("/bustrip/pop/viewBustripList.do")
    public String viewBustripList(){

        return "popup/inside/bustrip/viewBustripList";
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
}
