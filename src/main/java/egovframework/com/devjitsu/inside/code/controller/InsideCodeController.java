package egovframework.com.devjitsu.inside.code.controller;

import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import egovframework.com.devjitsu.inside.code.service.InsideCodeService;
import org.json.simple.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.Map;

@Controller
public class InsideCodeController {

    private static final Logger logger = LoggerFactory.getLogger(InsideCodeController.class);

    @Autowired
    private InsideCodeService insideCodeService;

    //차량사용신청 페이지
    @RequestMapping("/Inside/carReq.do")
    public String carReq(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/bustrip/carReq";
    }

    //차량사용신청관리 페이지
    @RequestMapping("/Inside/carReqMng.do")
    public String carReqMng(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", login);
        return "inside/bustrip/carReqMng";
    }

    @RequestMapping("/inside/getUserCarReqList")
    public String getUserCarReqList(@RequestParam Map<String, Object> params, Model model) {
        model.addAttribute("list", insideCodeService.getUserCarReqList(params));
        return "jsonView";
    }

    //차량관리 페이지
    @RequestMapping("/Inside/carManage.do")
    public String carManage(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/bustrip/carManage";
    }

    //차량사용신청 팝업창
    @RequestMapping("/Inside/pop/carPop.do")
    public String carPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", login);
        model.addAttribute("flag", "false");
        model.addAttribute("params", params);
        return "popup/inside/bustrip/carPop";
    }

    //차량 조회 팝업창
    @RequestMapping("/Inside/pop/carViewPop.do")
    public String carViewPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);
        return "popup/inside/bustrip/carViewPop";
    }

    //이용방법 조회 팝업창
    @RequestMapping("/Inside/pop/boardViewPop.do")
    public String boardViewPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);
        return "popup/inside/bustrip/boardViewPop";
    }

    //차량 통계조회 팝업창
    @RequestMapping("/Inside/pop/carStatPop.do")
    public String carStatPop(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "popup/inside/bustrip/carStatPop";
    }

    //회의실 통계조회 팝업창
    @RequestMapping("/Inside/pop/roomStatPop.do")
    public String roomStatPop(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "popup/inside/bustrip/roomStatPop";
    }

    //차량관리 팝업창
    @RequestMapping("/Inside/pop/carManagePop.do")
    public String carManagePop(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "popup/inside/bustrip/carManagePop";
    }

    //회의실사용신청 페이지
    @RequestMapping("/Inside/meetingRoomReq.do")
    public String meetingRoomReq(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);

        if(login == null){
            return "error/error";
        }

        return "inside/bustrip/meetingRoomReq";
    }

    //회의실관리 페이지
    @RequestMapping("/Inside/meetingRoomManage.do")
    public String meetingRoomManage(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/bustrip/meetingRoomManage";
    }

    //회의실사용신청 팝업창
    @RequestMapping("/Inside/pop/meetingRoomPop.do")
    public String meetingRoomPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);

        if(login == null){
            model.addAttribute("windowType", "popup");
            return "error/error";
        }

        return "popup/inside/bustrip/meetingRoomPop";
    }

    //회의실사용신청 특정일제외 팝업창
    @RequestMapping("/Inside/pop/exSpecificDayPop.do")
    public String exSpecificDayPop(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "popup/inside/bustrip/exSpecificDayPop";
    }

    //회의실관리 팝업창
    @RequestMapping("/Inside/pop/meetingRoomManagePop.do")
    public String meetingRoomManagePop(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "popup/inside/bustrip/meetingRoomManagePop";
    }



    //KendoDropDownList 차량코드
    @RequestMapping("/inside/getCarCode")
    public String getCarCode(@RequestParam Map<String, Object> params, Model model){
        List<Map<String, Object>> list = insideCodeService.getCarCode(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    //KendoDropDownList 회의실코드
    @RequestMapping("/inside/getRoomCode")
    public String getRoomCode(@RequestParam Map<String, Object> params, Model model){
        List<Map<String, Object>> list = insideCodeService.getRoomCode(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    //차량사용신청 캘린더 단일데이터조회
    @RequestMapping("/bustrip/getCarRequestInfo")
    public String getCarRequestOne(@RequestParam Map<String, Object> params, Model model) {
        Map<String, Object> data = insideCodeService.getCarRequestInfo(params);
        model.addAttribute("data", data);
        return "jsonView";
    }

    //차량사용신청 캘린더 리스트조회
    @RequestMapping("/inside/getCarRequestList")
    public String getCarRequestList(@RequestParam Map<String, Object> params, Model model) {
        List<Map<String, Object>> list = insideCodeService.getCarRequestList(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    //차량사용신청 중복조회
    @RequestMapping("/inside/searchDuplicateCar")
    public String searchDuplicateCar(@RequestParam Map<String, Object> params, Model model) {
        List<Map<String, Object>> list = insideCodeService.searchDuplicateCar(params);
        model.addAttribute("check", list.size() == 0 ? "false" : "true");
        model.addAttribute("list", list);
        return "jsonView";
    }

    //차량관리 차량코드 단일데이터조회
    @RequestMapping("/inside/getCarCodeInfo")
    public String getCarCodeInfo(@RequestParam Map<String, Object> params, Model model) {
        Map<String, Object> data = insideCodeService.getCarCodeInfo(params);
        model.addAttribute("data", data);
        return "jsonView";
    }

    //차량관리 차량코드 리스트조회
    @RequestMapping("/inside/getCarCodeList")
    public String getCarCodeList(@RequestParam Map<String, Object> params, Model model) {
        List<Map<String, Object>> list = insideCodeService.getCarCodeList(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    //회의실사용신청 캘린더 리스트조회
    @RequestMapping("/inside/getRoomRequestList")
    public String getRoomRequestList(@RequestParam Map<String, Object> params, Model model) {
        List<Map<String, Object>> list = insideCodeService.getRoomRequestList(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    @RequestMapping("/inside/getRoomRequest")
    public String getRoomRequest(@RequestParam Map<String, Object> params, Model model) {
        model.addAttribute("data", insideCodeService.getRoomRequest(params));
        return "jsonView";
    }

    //차량사용신청 중복조회
    @RequestMapping("/inside/searchDuplicateRoom")
    public String searchDuplicateRoom(@RequestParam Map<String, Object> params, Model model) {
        List<Map<String, Object>> list = insideCodeService.searchDuplicateRoom(params);
        model.addAttribute("flag", list.size() == 0 ? "false" : "true");
        model.addAttribute("list", list);
        return "jsonView";
    }

    //차량사용신청 통계 조회
    @RequestMapping("/inside/getCarStat")
    public String getCarStat(@RequestParam Map<String, Object> params, Model model) {
        Map<String, Object> data = insideCodeService.getCarStat(params);
        model.addAttribute("type", data.get("type"));
        model.addAttribute("total", data.get("total"));
        return "jsonView";
    }

    //회의실사용신청 통계 조회
    @RequestMapping("/inside/getRoomStat")
    public String getRoomStat(@RequestParam Map<String, Object> params, Model model) {
        Map<String, Object> data = insideCodeService.getRoomStat(params);
        model.addAttribute("type", data.get("type"));
        model.addAttribute("total", data.get("total"));
        return "jsonView";
    }

    //회의실관리 회의실코드 단일데이터조회
    @RequestMapping("/inside/getRoomCodeInfo")
    public String getRoomCodeInfo(@RequestParam Map<String, Object> params, Model model) {
        Map<String, Object> data = insideCodeService.getRoomCodeInfo(params);
        model.addAttribute("data", data);
        return "jsonView";
    }

    //회의실관리 회의실코드 리스트조회
    @RequestMapping("/inside/getRoomCodeList")
    public String getRoomCodeList(@RequestParam Map<String, Object> params, Model model) {
        List<Map<String, Object>> list = insideCodeService.getRoomCodeList(params);
        model.addAttribute("list", list);
        return "jsonView";
    }



    //차량사용신청 등록
    @RequestMapping("/inside/setCarRequestInsert")
    public String setCarRequestInsert(@RequestParam Map<String, Object> params, Model model) {
        insideCodeService.setCarRequestInsert(params);
        model.addAttribute("params", params);
        return "jsonView";
    }

    //차량사용신청 수정
    @RequestMapping("/inside/setCarRequestUpdate")
    public String setCarRequestUpdate(@RequestParam Map<String, Object> params) {
        insideCodeService.setCarRequestUpdate(params);
        return "jsonView";
    }

    //차량사용신청 삭제
    @RequestMapping("/inside/setCarRequestDelete")
    public String setCarRequestDelete(@RequestParam Map<String, Object> params) {
        insideCodeService.setCarRequestDelete(params);
        return "jsonView";
    }

    //차량관리 차량코드 등록
    @RequestMapping("/inside/setCarCodeInsert")
    public String setCarCodeInsert(@RequestParam Map<String, Object> params) {
        insideCodeService.setCarCodeInsert(params);
        return "jsonView";
    }

    //차량관리 차량코드 수정
    @RequestMapping("/inside/setCarCodeUpdate")
    public String setCarCodeUpdate(@RequestParam Map<String, Object> params) {
        insideCodeService.setCarCodeUpdate(params);
        return "jsonView";
    }

    //차량관리 차량코드 삭제
    @RequestMapping("/inside/setCarCodeDelete")
    public String setCarCodeDelete(@RequestParam Map<String, Object> params) {
        insideCodeService.setCarCodeDelete(params);
        return "jsonView";
    }

    //회의실사용신청 등록, 수정
    @RequestMapping("/inside/setRoomRequestInsert")
    public String setRoomRequestInsert(@RequestParam Map<String, Object> params) {
        insideCodeService.setRoomRequestInsert(params);
        return "jsonView";
    }

    //회의실사용신청 삭제
    @RequestMapping("/inside/setRoomRequestDelete")
    public String setRoomRequestDelete(@RequestParam Map<String, Object> params) {
        insideCodeService.setRoomRequestDelete(params);
        return "jsonView";
    }

    //회의실관리 회의실코드 등록
    @RequestMapping("/inside/setRoomCodeInsert")
    public String setRoomCodeInsert(@RequestParam Map<String, Object> params) {
        insideCodeService.setRoomCodeInsert(params);
        return "jsonView";
    }

    //회의실관리 회의실코드 수정
    @RequestMapping("/inside/setRoomCodeUpdate")
    public String setRoomCodeUpdate(@RequestParam Map<String, Object> params) {
        insideCodeService.setRoomCodeUpdate(params);
        return "jsonView";
    }

    //회의실관리 회의실코드 삭제
    @RequestMapping("/inside/setRoomCodeDelete")
    public String setRoomCodeDelete(@RequestParam Map<String, Object> params) {
        insideCodeService.setRoomCodeDelete(params);
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

    /** 개인차량 전자결재 팝업*/
    @RequestMapping("/popup/inside/approvalFormPopup/carApprovalPop.do")
    public String recruitOfficialApprovalPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("params", params);
        model.addAttribute("loginVO", login);
        return "popup/inside/car/approvalFormPopup/carApprovalPop";
    }

    /** 개인차량 결재 상태값에 따른 UPDATE 메서드 */
    @RequestMapping(value = "/inside/carReqApp")
    public String carReqApp(@RequestParam Map<String, Object> bodyMap, Model model) {
        System.out.println("bodyMap");
        System.out.println(bodyMap);
        String resultCode = "SUCCESS";
        String resultMessage = "성공하였습니다.";
        try{
            insideCodeService.updateCarDocState(bodyMap);
        }catch(Exception e){
            logger.error(e.getMessage());
            resultCode = "FAIL";
            resultMessage = "연계 정보 갱신 오류 발생("+e.getMessage()+")";
        }
        model.addAttribute("resultCode", resultCode);
        model.addAttribute("resultMessage", resultMessage);
        return "jsonView";
    }


    @RequestMapping("/account/regAccountToPop.do")
    public String regAccountToPop(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){

        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("params", params);
        model.addAttribute("loginVO", loginVO);
        return "popup/inside/account/regAccountToPop";
    }

    @RequestMapping("/account/getAccountList.do")
    public String getAccountList(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){

         List<Map<String, Object>> list = insideCodeService.getAccountList(params);

        model.addAttribute("list", list);
        return "jsonView";
    }

    @RequestMapping("/account/saveRegAccountTo")
    public String saveRegAccountTo(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        try{
            insideCodeService.saveRegAccountTo(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/account/updRegAccountTo")
    public String updRegAccountTo(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        try{
            insideCodeService.updRegAccountTo(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }
    @RequestMapping("/account/delRegAccountTo")
    public String delRegAccountTo(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        try{
            insideCodeService.delRegAccountTo(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/account/getAccountToInfo")
    public String getAccountToInfo(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){

        Map<String, Object> cardInfo = insideCodeService.getAccountToInfo(params);
        model.addAttribute("accountInfo", cardInfo);

        return "jsonView";
    }

    @RequestMapping("/inside/carRequestCheck")
    public String carRequestCheck(@RequestParam Map<String, Object> map, Model model, HttpServletRequest request){

        int cnt = insideCodeService.carRequestCheck(map);
        model.addAttribute("cnt", cnt);

        return "jsonView";
    }


}
