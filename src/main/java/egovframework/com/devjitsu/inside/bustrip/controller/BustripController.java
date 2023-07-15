package egovframework.com.devjitsu.inside.bustrip.controller;

import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import egovframework.com.devjitsu.gw.user.service.UserService;
import egovframework.com.devjitsu.inside.bustrip.service.BustripService;
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



    //출장신청
    @RequestMapping("/bustrip/bustripReq.do")
    public String bustripReq(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/bustrip/bustripReq";
    }

    //출장결과보고
    @RequestMapping("/bustrip/bustripResult.do")
    public String bustripResult(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/bustrip/bustripResult";
    }

    @RequestMapping("/bustrip/getBustripTotInfo")
    public String getBustripTotInfo(@RequestParam Map<String, Object> params, Model model){

        List<Map<String, Object>> list = bustripService.getBustripTotInfo(params);

        model.addAttribute("list", list);


        return "jsonView";
    }

    //관내출장리스트
    @RequestMapping("/bustrip/inBustripList.do")
    public String inBustripList(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/bustrip/inBustripList";
    }

    /**
     * 출장 신청 / 출장 조회
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/bustrip/pop/inBustripReqPop.do")
    public String inBustripReqPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("rs", bustripService.getBustripReqInfo(params));
        model.addAttribute("params", params);
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "popup/inside/bustrip/inBustripReqPop";
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
     * 동반자 유저 리스트
     * JSY
     * 2022.08.01
     */
    @RequestMapping("/bustrip/getUserList")
    public String getUserList(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        logger.info("controller getUserList");
        List<Map<String, Object>> list = bustripService.getUserList(params);
        model.addAttribute("data", list);

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
     * @param request
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

        model.addAttribute("params", params);
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "popup/inside/bustrip/bustripResultPop";
    }

    @RequestMapping("/bustrip/pop/bustripExnpPop.do")
    public String bustripExnpPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        List<Map<String, Object>> list = bustripService.getBustripTotInfo(params);

        model.addAttribute("list", list);
        model.addAttribute("params", params);
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "popup/inside/bustrip/bustripExnpPop";
    }

    //교통비기준정보
    @RequestMapping("/bustrip/transportationCostInfo.do")
    public String transportationCostInfo(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/bustrip/transportationCostInfo";
    }

    //직급별출장여비
    @RequestMapping("/bustrip/dutyBustripExpenses.do")
    public String dutyBustripExpenses(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/bustrip/dutyBustripExpenses";
    }

    //차량사용신청
    @RequestMapping("/bustrip/carReq.do")
    public String carReq(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/bustrip/carReq";
    }

    //차량사용신청 팝업창
    @RequestMapping("/bustrip/Pop/carPop.do")
    public String carPop(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "popup/inside/bustrip/carPop";
    }

    //회의실사용신청
    @RequestMapping("/bustrip/meetingRoomReq.do")
    public String meetingRoomReq(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/bustrip/meetingRoomReq";
    }

    //회의실사용신청 팝업창
    @RequestMapping("/bustrip/Pop/meetingRoomPop.do")
    public String meetingRoomPop(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "popup/inside/bustrip/meetingRoomPop";
    }

    //회의실 사용 특정일 제외 팝업창
    @RequestMapping("/Inside/Pop/exSpecificDayPop.do")
    public String exSpecificDayPop(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "popup/inside/bustrip/exSpecificDayPop";
    }

    //차량관리
    @RequestMapping("/Inside/carManage.do")
    public String carManage(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/bustrip/carManage";
    }

    //차량관리 팝업창
    @RequestMapping("/Inside/Pop/carManagePop.do")
    public String carManagePop(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "popup/inside/bustrip/carManagePop";
    }

    //회의실관리
    @RequestMapping("/Inside/meetingRoomManage.do")
    public String meetingRoomManage(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/bustrip/meetingRoomManage";
    }

    //회의실관리 팝업창
    @RequestMapping("/Inside/Pop/meetingRoomManagePop.do")
    public String meetingRoomManagePop(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "popup/inside/bustrip/meetingRoomManagePop";
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

    @RequestMapping("/bustrip/getBustripReq")
    public String getBustripReq(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){

        List<Map<String, Object>> list = bustripService.getBustripReq(params);

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

    //휴가신청 전자결재
    @RequestMapping("/Inside/pop/approvalFormPopup/bustripApprovalPop.do")
    public String subHolidayApprovalPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        LoginVO login = getLoginVO(request);
        model.addAttribute("data", params);
        model.addAttribute("loginVO", login);
        return "/popup/bustrip/approvalFormPopup/bustripApprovalPop";
    }

    /**
     * 휴가 결재 상태값에 따른 UPDATE 메서드
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

    @RequestMapping("/bustrip/saveBustripResult")
    public String saveBustripResult(@RequestParam Map<String, Object> params, Model model){

        try{
            bustripService.saveBustripResult(params);
            model.addAttribute("rs", "sc");
        } catch (Exception e){
            e.printStackTrace();
        }


        return "jsonView";
    }

}
