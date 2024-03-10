package egovframework.com.devjitsu.gw.main.controller;

import egovframework.com.devjitsu.cams_pot.service.CustomBoardService;
import egovframework.com.devjitsu.common.service.CommonService;
import egovframework.com.devjitsu.doc.approval.service.ApprovalUserService;
import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import egovframework.com.devjitsu.hp.board.service.BoardService;
import egovframework.com.devjitsu.hp.board.util.ArticlePage;
import egovframework.com.devjitsu.hp.board.util.PagingResponse;
import egovframework.com.devjitsu.hp.board.util.PostResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

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

    @RequestMapping("/mobileMain.do")
    public String mobileMain(){
        return "/camspot_m/main";
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




}
