package egovframework.com.devjitsu.gw.main.controller;

import com.google.gson.Gson;
import egovframework.com.devjitsu.cams_pot.service.CustomBoardService;
import egovframework.com.devjitsu.common.service.CommonCodeService;
import egovframework.com.devjitsu.common.service.CommonService;
import egovframework.com.devjitsu.doc.approval.service.ApprovalService;
import egovframework.com.devjitsu.doc.approval.service.ApprovalUserService;
import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import egovframework.com.devjitsu.hp.board.service.BoardService;
import egovframework.com.devjitsu.hp.board.util.ArticlePage;
import egovframework.com.devjitsu.hp.board.util.PagingResponse;
import egovframework.com.devjitsu.hp.board.util.PostResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Controller
public class MainController {

    @Autowired
    private CommonService commonService;

    @Autowired
    private BoardService boardService;

    @Autowired
    private ApprovalUserService approvalUserService;

    @Autowired
    private CustomBoardService customBoardService;

    @Autowired
    private ApprovalService approvalService;

    @Autowired
    private CommonCodeService commonCodeService;

    @RequestMapping("/")
    public String index(){
        return "indexA";
    }

    @RequestMapping("/indexA.do")
    public String indexA(){
        return "indexA";
    }

    @RequestMapping("/indexB.do")
    public String indexB(HttpServletRequest request, Model model, @RequestParam Map<String, Object> params){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        if(session.getAttribute("LoginVO") != null){

        // 사용자 정보
            params.put("empSeq", loginVO.getUniqId());
            params.put("deptSeq",loginVO.getOrgnztId());

            // 나머지 검색 조건
            params.put("approveStat", "draft");
            params.put("approveType", "wait");
            params.put("resType", "Y");
            params.put("startDay", "");
            params.put("endDay", "");

            // 오늘 날짜를 "YYYY-MM-DD" 형식으로 설정
            LocalDate today = LocalDate.now();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            String formattedToday = today.format(formatter);

            params.put("selectedDate", formattedToday);
            params.put("publicClass", "");

            int strStatus = approvalUserService.getMainUserDocStorageBoxList(params).size();
            int waitStatus = approvalUserService.getApproveDocBoxList(params).size();
            int scheduleStatus = customBoardService.getTodayScheduleList(params).size();

            model.addAttribute("strStatus", strStatus);
            model.addAttribute("waitStatus", waitStatus);
            model.addAttribute("scheduleStatus", scheduleStatus);
            model.addAttribute("menuList", commonService.getMenuFullJsonString(loginVO));
            model.addAttribute("loginVO", loginVO);


            return "indexB";
        } else {
            return "login";
        }
    }

    @RequestMapping("/indexBMain.do")
    public String indexBMain(HttpServletRequest request, Model model, @RequestParam Map<String, Object> params){
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        // 사용자 정보
        params.put("empSeq", loginVO.getUniqId());
        params.put("deptSeq",loginVO.getOrgnztId());

        // 나머지 검색 조건
        params.put("approveStat", "draft");
        params.put("approveType", "wait");
        params.put("resType", "Y");
        params.put("startDay", "");
        params.put("endDay", "");

        // 오늘 날짜를 "YYYY-MM-DD" 형식으로 설정
        LocalDate today = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String formattedToday = today.format(formatter);

        params.put("selectedDate", formattedToday);
        params.put("publicClass", "");

        int strStatus = approvalUserService.getMainUserDocStorageBoxList(params).size();
        int waitStatus = approvalUserService.getApproveDocBoxList(params).size();
        int scheduleStatus = customBoardService.getTodayScheduleList(params).size();

        model.addAttribute("strStatus", strStatus);
        model.addAttribute("waitStatus", waitStatus);
        model.addAttribute("scheduleStatus", scheduleStatus);
        model.addAttribute("loginVO", loginVO);
        return "indexB_cp";
    }

    @RequestMapping("/intro.do")
    public String intro(){
        return "intro";
    }

    @RequestMapping("/main/getMainList.do")
    public String getMainList(@RequestParam Map<String ,Object> param,HttpServletRequest request, Model model){

        List<Map<String, Object>> response = boardService.selectMainList(param);
        List<Map<String, Object>> response1 = boardService.getCategoryAllMainList(param);
        List<Map<String, Object>> response2 = boardService.selectBsnsMainList(param);

        List<Map<String, Object>> response3 = boardService.getMainRecruitList(param);
        List<Map<String, Object>> response4 = boardService.getFocusList(param);
        List<Map<String, Object>> response5 = boardService.getSnsPosts(param);

        model.addAttribute("list", response).addAttribute("list2", response2);
        model.addAttribute("list3", response3).addAttribute("list4", response4);
        model.addAttribute("list5", response5).addAttribute("list1", response1);
        return "jsonView";
    }

    @RequestMapping("/main/getAlarmList.do")
    public String getAlarmList(@RequestParam Map<String ,Object> param,HttpServletRequest request, Model model){

        List<Map<String, Object>> list = boardService.selectAlarmList(param);

        model.addAttribute("list", list);
        return "jsonView";
    }

    @RequestMapping("/subHoliday/subHolidayApplication.do")
    public String subHolidayApplication(){
        return "/subHoliday/subHolidayApplication";
    }

    @RequestMapping("/subHoliday/org.do")
    public String org(){
        return "/subHoliday/org";
    }

    @RequestMapping("/engineering/customerConsultation.do")
    public String customerConsultation(){
        return "/engineering/customerConsultation";
    }

    @RequestMapping("/engineering/estimate.do")
    public String estimate(){
        return "/engineering/estimate";
    }

    @RequestMapping("/engineering/orderManagement.do")
    public String orderManagement(){
        return "/engineering/orderManagement";
    }

    @RequestMapping("/engineering/developmentPlan.do")
    public String developmentPlan(){
        return "/engineering/developmentPlan";
    }

    @RequestMapping("/engineering/outsourcingPurchase.do")
    public String outsourcingPurchase(){
        return "/engineering/outsourcingPurchase";
    }

    @RequestMapping("/engineering/resultReport.do")
    public String resultReport(){
        return "/engineering/resultReport";
    }

    @RequestMapping("/engineering/deliveryManagement.do")
    public String deliveryManagement(){
        return "/engineering/deliveryManagement";
    }

    @RequestMapping("/main/getSearchMenu")
    public String getSearchMenu(@RequestParam Map<String,Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        params.put("empSeq", loginVO.getUniqId());
        model.addAttribute("ds", commonService.getSearchMenu(params));
        return "jsonView";
    }

    /**
     * 일정 팝업
     * */
    @RequestMapping("/spot/pop/popMainScheduleView.do")
    public String popScheduleView(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("params", params);
        return "popup/cams_pot/popMainScheduleView";
    }

    /**
     * 일정 팝업 리스트 조회
     * */
    @RequestMapping("/spot/getMainScheduleList")
    public String getMainScheduleList(@RequestParam Map<String, Object> param, ArticlePage articlePage, HttpServletRequest request, Model model){

        int recordSize = Integer.parseInt(String.valueOf(param.get("recordSize")));

        articlePage.setSearchInput((String) param.get("searchInput"));
        articlePage.setRequestType((String) param.get("type"));
        articlePage.setRecordSize(recordSize);

        PagingResponse<PostResponse> response = customBoardService.getMainScheduleList(articlePage);

        model.addAttribute("rs", response);

        /*model.addAttribute("rs", customBoardService.getStaffScheduleList(params));*/
        model.addAttribute("pagination", articlePage.getPagination());
        model.addAttribute("page", articlePage.getPage());
        return "jsonView";
    }

    @RequestMapping("/spot/getMainScheduleList2")
    public String getMainScheduleList2(@RequestParam Map<String, Object> params, Model model){

        List<Map<String, Object>> list = customBoardService.getMainScheduleList2(params);

        model.addAttribute("list", list);
        return "jsonView";
    }

    /**
     * 즐겨찾기 팝업
     * */
    @RequestMapping("/pop/popFvMenu.do")
    public String popupTest(@RequestParam Map<String, Object> params, Model model){
        return "popup/cams_pot/popFvMenu";
    }

    /**
     * 즐겨찾기 갯수 카운트
     * */
    @RequestMapping("/main/getSearchMenuCnt")
    public String getSearchMenuCnt(@RequestParam Map<String,Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        params.put("empSeq", loginVO.getUniqId());

        model.addAttribute("rs", commonService.getSearchMenuCnt(params));
        return "jsonView";
    }

    /**
     * 즐겨찾기 메뉴 리스트 조회
     * */
    @RequestMapping("/main/getFvMenu")
    public String getFvMenu(@RequestParam Map<String,Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        params.put("empSeq", loginVO.getUniqId());
        model.addAttribute("fs", commonService.getFvMenu(params));
        return "jsonView";
    }

    /**
     * 즐겨찾기 메뉴 삭제
     * */
    @RequestMapping("/main/setDelFvMenu")
    public String setDelFvMenu(@RequestParam Map<String,Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        params.put("empSeq", loginVO.getUniqId());
        commonService.setDelFvMenu(params);
        return "jsonView";
    }

    /** 디자인봄 작업경로 임시 생성 */
    @RequestMapping("/mobileMain.do")
    public String main(HttpServletRequest request, Model model, @RequestParam Map<String, Object> params){

        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", loginVO);


        if(session.getAttribute("LoginVO") != null){
            params.put("empSeq", loginVO.getUniqId());
            params.put("deptSeq",loginVO.getOrgnztId());

            // 나머지 검색 조건
            params.put("approveStat", "draft");
            params.put("approveType", "wait");
            params.put("pageType", "mobile");
            params.put("resType", "Y");
            params.put("startDay", "");
            params.put("endDay", "");

            int strStatus = approvalUserService.getMainUserDocStorageBoxList(params).size();
            int waitStatus = approvalUserService.getApproveDocBoxList(params).size();

            params.put("approveType", "reference");
            int compStatus = approvalUserService.getApproveDocBoxList(params).size();

            model.addAttribute("strStatus", strStatus);
            model.addAttribute("waitStatus", waitStatus);
            model.addAttribute("compStatus", compStatus);

            return "/camspot_m/main";
        } else {
            return "/camspot_m/login";
        }
    }
    @RequestMapping("/m/login.do")
    public String login(HttpServletRequest request, Model model, @RequestParam Map<String, Object> params){
        HttpSession session = request.getSession();
        session.removeAttribute("menuNm");
        model.addAttribute("params", params);

        if(session.getAttribute("LoginVO") != null){
            return "redirect:/mobileMain.do";
        } else {
            return "/camspot_m/login";
        }
    }
    @RequestMapping("/m/payment.do")
    public String payment(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){

        LoginVO loginVO = getLoginVO(request);
        if (loginVO == null) return "/camspot_m/login";

        params.put("empSeq", loginVO.getUniqId());
        params.put("deptSeq", loginVO.getOrgnztId());

        // 나머지 검색 조건
        params.put("approveStat", "draft");
        params.put("approveType", "wait");
        params.put("pageType", "mobile");
        params.put("resType", "Y");
        params.put("startDay", "");
        params.put("endDay", "");

        List<Map<String, Object>> strList = approvalUserService.getMainUserDocStorageBoxList(params);

        int totCnt = strList.size();

        int pageN;
        int countList = 5;
        int countPage = 5;

        int block = totCnt / countList;
        if(totCnt % countList != 0){
            block++;
        }

        String pageNum = "0";
        if(params.containsKey("pageNum")){
            pageNum = params.get("pageNum").toString();
        } else {
            pageNum = "0";
        }
        if(pageNum == null){
            pageN = 1;
        }else{
            if(Integer.parseInt(pageNum) > block){
                pageN = block;
            } else {
                pageN = Integer.parseInt(pageNum);
            }

            if(pageN <= 0 ) {
                pageN = 1;
            } else if(pageN > block) {
                pageN -= 5;
            }

        }

        int startPage = (pageN-1) / countPage * countPage + 1; // 시작 페이지
        int endPage = startPage + countPage - 1; // 끝 페이지

        if (endPage > block) {
            endPage = block;
        }
        int start = pageN*5-4;
        int end = pageN*5;

        List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
        params.put("startPage", (start - 1) > 0 ? (start - 1) : 0);
        params.put("endPage", end);

        list = approvalUserService.getMainUserDocStorageBoxListMobile(params); // 해당 페이지에 맞는 게시물 불러오는 메서드


        model.addAttribute("strLen", strList.size());
        model.addAttribute("strList", list);
        model.addAttribute("strLen", strList.size());
        model.addAttribute("startPage", startPage);
        model.addAttribute("endPage", endPage);

        model.addAttribute("currentPage", pageN);
        model.addAttribute("countPage", countPage);

        return "/camspot_m/payment";
    }

    @RequestMapping("/m/payment_wait.do")
    public String payment_wait(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){

        LoginVO loginVO = getLoginVO(request);
        if (loginVO == null) return "/camspot_m/login";

        params.put("empSeq", loginVO.getUniqId());
        params.put("deptSeq", loginVO.getOrgnztId());

        // 나머지 검색 조건
        params.put("approveStat", "draft");
        params.put("approveType", "wait");
        params.put("pageType", "mobile");
        params.put("resType", "Y");
        params.put("startDay", "");
        params.put("endDay", "");

        List<Map<String, Object>> waitList = approvalUserService.getApproveDocBoxList(params);

        int totCnt = waitList.size();

        int pageN;
        int countList = 5;
        int countPage = 5;

        int block = totCnt / countList;
        if(totCnt % countList != 0){
            block++;
        }

        String pageNum = "0";
        if(params.containsKey("pageNum")){
            pageNum = params.get("pageNum").toString();
        } else {
            pageNum = "0";
        }
        if(pageNum == null){
            pageN = 1;
        }else{
            if(Integer.parseInt(pageNum) > block){
                pageN = block;
            } else {
                pageN = Integer.parseInt(pageNum);
            }

            if(pageN <= 0 ) {
                pageN = 1;
            } else if(pageN > block) {
                pageN -= 5;
            }
        }

        int startPage = (pageN-1) / countPage * countPage + 1; // 시작 페이지
        int endPage = startPage + countPage - 1; // 끝 페이지

        if (endPage > block) {
            endPage = block;
        }
        int start = pageN*5-4;
        int end = pageN*5;

        List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
        params.put("startPage", (start - 1) > 0 ? (start - 1) : 0);
        params.put("endPage", end);

        list = approvalUserService.getApproveDocBoxListMobile(params); // 해당 페이지에 맞는 게시물 불러오는 메서드

        model.addAttribute("waitList", list);
        model.addAttribute("waitLen", waitList.size());
        model.addAttribute("startPage", startPage);
        model.addAttribute("endPage", endPage);

        model.addAttribute("currentPage", pageN);
        model.addAttribute("countPage", countPage);

        return "/camspot_m/payment_wait";
    }

    private static LoginVO getLoginVO(HttpServletRequest request) {
        HttpSession session = request.getSession();
        LoginVO loginVO = session.getAttribute("LoginVO") == null ? null : (LoginVO) session.getAttribute("LoginVO");


        if(session.getAttribute("LoginVO") == null){
            return null;
        }
        return loginVO;
    }

    @RequestMapping("/m/payment_comp.do")
    public String payment_comp(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){

        LoginVO loginVO = getLoginVO(request);
        if (loginVO == null) return "/camspot_m/login";

        params.put("empSeq", loginVO.getUniqId());
        params.put("deptSeq", loginVO.getOrgnztId());

        // 나머지 검색 조건
        params.put("approveStat", "draft");
        params.put("approveType", "wait");
        params.put("pageType", "mobile");
        params.put("resType", "Y");
        params.put("startDay", "");
        params.put("endDay", "");

        params.put("approveType", "reference");
        List<Map<String, Object>> compList = approvalUserService.getApproveDocBoxList(params);

        int totCnt = compList.size();

        int pageN;
        int countList = 5;
        int countPage = 5;

        int block = totCnt / countList;
        if(totCnt % countList != 0){
            block++;
        }

        String pageNum = "0";
        if(params.containsKey("pageNum")){
            pageNum = params.get("pageNum").toString();
        } else {
            pageNum = "0";
        }
        if(pageNum == null){
            pageN = 1;
        }else{
            if(Integer.parseInt(pageNum) > block){
                pageN = block;
            } else {
                pageN = Integer.parseInt(pageNum);
            }

            if(pageN <= 0 ) {
                pageN = 1;
            } else if(pageN > block) {
                pageN -= 5;
            }
        }

        int startPage = (pageN-1) / countPage * countPage + 1; // 시작 페이지
        int endPage = startPage + countPage - 1; // 끝 페이지

        if (endPage > block) {
            endPage = block;
        }
        int start = pageN*5-4;
        int end = pageN*5;

        List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
        params.put("startPage", (start - 1) > 0 ? (start - 1) : 0);
        params.put("endPage", end);

        list = approvalUserService.getApproveDocBoxListMobile(params); // 해당 페이지에 맞는 게시물 불러오는 메서드

        model.addAttribute("compList", list);
        model.addAttribute("compLen", compList.size());
        model.addAttribute("startPage", startPage);
        model.addAttribute("endPage", endPage);

        model.addAttribute("currentPage", pageN);
        model.addAttribute("countPage", countPage);

        return "/camspot_m/payment_comp";
    }

    @RequestMapping("/m/payment_view.do")
    public String payment_view(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){

        LoginVO loginVO = getLoginVO(request);
        if (loginVO == null) return "/camspot_m/login";

        String hwpUrl = "";

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

        if(params.containsKey("mDocType")){
            params.put("mDocType", params.get("mDocType"));
        }

        model.addAttribute("hwpUrl", hwpUrl);
        model.addAttribute("params", new Gson().toJson(params));
        model.addAttribute("rs", new Gson().toJson(rs));
        model.addAttribute("mLoginVO", new Gson().toJson(loginVO));
        model.addAttribute("toDate", getCurrentDateTime());

        return "/camspot_m/payment_view";
    }
    @RequestMapping("/m/payment_write.do")
    public String payment_write(){
        return "/camspot_m/payment_write";
    }
    @RequestMapping("/m/organization.do")
    public String organization(){
        return "/camspot_m/organization";
    }
    @RequestMapping("/m/organization_view.do")
    public String organization_view(){
        return "/camspot_m/organization_view";
    }
    @RequestMapping("/m/organization_write.do")
    public String organization_write(){
        return "/camspot_m/organization_write";
    }
    @RequestMapping("/m/schedule.do")
    public String schedule(){
        return "/camspot_m/schedule";
    }
    @RequestMapping("/m/schedule_staff.do")
    public String schedule_staff(){
        return "/camspot_m/schedule_staff";
    }
    @RequestMapping("/m/board.do")
    public String board(){
        return "/camspot_m/board";
    }
    @RequestMapping("/m/board_view.do")
    public String board_view(){
        return "/camspot_m/board_view";
    }
    @RequestMapping("/m/board_write.do")
    public String board_write(){
        return "/camspot_m/board_write";
    }
    @RequestMapping("/m/admin.do")
    public String admin(){
        return "/camspot_m/admin";
    }

    @RequestMapping("/m/schedule_write.do")
    public String schedule_write(){
        return "/camspot_m/schedule_write";
    }

    @RequestMapping("/m/schedule_staff_write.do")
    public String schedule_staff_write(){
        return "/camspot_m/schedule_staff_write";
    }

    @RequestMapping("/m/alarm.do")
    public String alarm(){
        return "/camspot_m/alarm";
    }

    @RequestMapping("/m/logoutAction")
    public String logout(HttpServletRequest request, ModelMap model){
        HttpSession session = request.getSession();


        RequestContextHolder.getRequestAttributes().removeAttribute("loginVO", RequestAttributes.SCOPE_SESSION);
        session.invalidate();

        return "redirect:/m/login.do";
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
