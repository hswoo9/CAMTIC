package egovframework.com.devjitsu.gw.user.controller;

import egovframework.com.devjitsu.common.service.CommonService;
import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import egovframework.com.devjitsu.gw.user.service.UserService;
import egovframework.com.devjitsu.inside.userManage.service.UserManageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.HashMap;

@Controller
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    @Autowired
    private UserManageService userManageService;

    @Autowired
    private CommonService commonService;

    @Value("#{properties['File.Server.Dir']}")
    private String SERVER_DIR;

    @Value("#{properties['File.Base.Directory']}")
    private String BASE_DIR;

    /** 직제관리 페이지 */
    @RequestMapping("/user/organizationChart.do")
    public String openOrganizationChart(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", loginVO);
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("data", commonService.ctDept((String) loginVO.getOrgnztId()));

        return "user/organizationChart";
    }

    //조직도 팝업용
    @RequestMapping("/user/pop/orgPop.do")
    public String orgPop(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", loginVO);
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("data", commonService.ctDept((String) loginVO.getOrgnztId()));

        return "popup/user/orgPop";
    }

    //유저 다수 선택 팝업
    @RequestMapping("/user/pop/userMultiSelectPop.do")
    public String userMultiSelectPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", loginVO);
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("data", commonService.ctDept((String) loginVO.getOrgnztId()));
        model.addAttribute("params", params);

        return "popup/user/userMultiSelectPop";
    }

    @RequestMapping("/user/pop/outUserMultiSelectPop.do")
    public String outUserMultiSelectPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", loginVO);
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("data", commonService.ctDept((String) loginVO.getOrgnztId()));
        model.addAttribute("params", params);

        return "popup/user/outUserMultiSelectPop";
    }

    @RequestMapping("/user/pop/userMultiSelectPop2.do")
    public String userMultiSelectPop2(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", loginVO);
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("data", commonService.ctDept((String) loginVO.getOrgnztId()));
        model.addAttribute("params", params);

        return "popup/user/userMultiSelectPop2";
    }

    //TODO. AJAX RETURN 오류로 JSONVIEW는 나중에 추가
    @RequestMapping(value = "/user/getOrgDeptList")
    @ResponseBody
    public List<Map<String, Object>> getOrgDeptList(@RequestParam Map<String, Object> params, Model model) throws Exception {
        return userService.getOrgDeptList(params);
    }

    //TODO. AJAX RETURN 오류로 JSONVIEW는 나중에 추가
    @RequestMapping("/user/getUserInfo")
    @ResponseBody
    public Map<String, Object> getUserInfo(@RequestParam Map<String, Object> params){
        return userService.getUserInfo(params);
    }

    @RequestMapping("/user/getManagerInfo")
    public String getManagerInfo(@RequestParam Map<String, Object> params, Model model){
        Map<String, Object> data = userService.getManagerInfo(params);
        model.addAttribute("data", data);
        return "jsonView";
    }
    @RequestMapping("/user/getTempMngInfo")
    public String getTempMngInfo(@RequestParam Map<String, Object> params, Model model){
        Map<String, Object> data = userService.getTempMngInfo(params);
        model.addAttribute("data", data);
        return "jsonView";
    }

    @RequestMapping("/user/getIdCheck")
    public String getIdCheck(@RequestParam Map<String, Object> params, Model model){

        Map<String, Object> map = userService.getIdCheck(params);

        model.addAttribute("rs", map);

        return "jsonView";
    }

    @RequestMapping("/user/getEmpList")
    public String getEmpList(@RequestParam Map<String, Object> params, Model model){

        model.addAttribute("list", userService.getEmpList(params));

        return "jsonView";
    }

    @RequestMapping("/user/getEmpSelList")
    public String getEmpSelList(@RequestParam Map<String, Object> params, Model model){

        List<Map<String, Object>> list = userService.getEmpSelList(params);

        model.addAttribute("list", list);

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

    //사용자 기본정보 팝업용
    @RequestMapping("/user/pop/myPop.do")
    public String myPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        Map<String,Object> userPersonnelOne = userService.getUserPersonnelOne(params);

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("data", commonService.ctDept((String) loginVO.getOrgnztId()));
        model.addAttribute("uprinfList", userPersonnelOne);
        model.addAttribute("pk", params.get("pk"));
        model.addAttribute("idPhoto", userService.getUserIdPhotoInfo(params));

        System.out.println("사용자 기본정보 --------" + userPersonnelOne);

        return "popup/user/myPop";
    }


    /**
     * 인사관리 > 조직도 관리 > 직급/등급 관리 팝업창
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/user/pop/userSetGradePop.do")
    public String userSetGradePop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);

        return "popup/user/userSetGradePop";
    }

    /**
     * 인사관리 > 조직도 관리 > 직책관리 팝업창
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/user/pop/userSetDutyPop.do")
    public String userSetDutyPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);

        return "popup/user/userSetDutyPop";
    }

    /**
     * 인사관리 > 조직도 관리 > 직책/직급 서열관리 팝업창
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/user/pop/userSetRankPop.do")
    public String userSetRankPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);

        return "popup/user/userSetRankPop";
    }

    /**
     * 인사관리 > 조직도 관리 > 조직도 직제 관리 팝업창
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/user/pop/userSetOrganizationPop.do")
    public String userSetOrganizationPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", login);
        return "popup/user/userSetOrganizationPop";
    }

    @RequestMapping("/user/pop/organizationHistoryPop.do")
    public String organizationHistoryPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        session.setAttribute("menuNm", request.getRequestURI());

        model.addAttribute("loginVO", login);
        return "popup/user/organizationHistoryPop";
    }

    /**이력관리 리스트 조회*/
    @RequestMapping("/user/getHistoryList")
    public String getHistoryList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", userService.getHistoryList(params));
        return "jsonView";
    }

    @RequestMapping("/user/pop/historyAddPop.do")
    public String historyAddPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("menuCd", request.getServletPath().split("/")[1]);
        model.addAttribute("data", commonService.commonCodeList(params));
        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);
        return "popup/user/historyAddPop";
    }

    /** 직제관리 이력관리 등록*/
    @RequestMapping("/user/historyAdd")
    public String historyAdd(@RequestParam Map<String, Object> params, MultipartHttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        MultipartFile[] historyFiles = request.getFiles("historyFiles").toArray(new MultipartFile[0]);

        model.addAttribute("loginVO", loginVO);
        userService.setHistoryAdd(params, historyFiles, SERVER_DIR, BASE_DIR);
        model.addAttribute("params", params);

        return "jsonView";
    }

    @RequestMapping("/user/pop/historyInfo.do")
    public String historyInfo(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", login);
        model.addAttribute("data", userService.getHistoryOne(params));
        model.addAttribute("fileInfo", userService.getHistoryFileInfo(params));
        model.addAttribute("params", params);
        return "popup/user/historyInfo";
    }

    /*@RequestMapping("/crm/getHistoryOne")
    public String getHistoryOne(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("loginVO");

        model.addAttribute("data", userService.getHistoryOne(params));
        model.addAttribute("fileInfo", userService.getHistoryFileInfo(params));
        model.addAttribute("loginVO", loginVO);

        return "jsonView";
    }*/

    @RequestMapping("/user/getUserPersonnelOne")
    public String getUserPersonnelOne(@RequestParam Map<String, Object> params, Model model){

        model.addAttribute("data", userService.getUserPersonnelOne(params));

        return "jsonView";
    }

    @RequestMapping("/user/getEducationalList")
    public String getEducationalList(@RequestParam Map<String, Object> params, Model model){

        model.addAttribute("list", userManageService.getEducationalList(params)); //학력사항

        return "jsonView";
    }

    @RequestMapping("/user/getCareerInfoList")
    public String getCareerInfoList(@RequestParam Map<String, Object> params, Model model){

        model.addAttribute("list",  userManageService.getCareerInfoList(params));  //경력사항

        return "jsonView";
    }

    @RequestMapping("/user/getMilitarySvcInfo")
    public String getMilitarySvcInfo(@RequestParam Map<String, Object> params, Model model){

        model.addAttribute("data",  userManageService.getMilitarySvcInfo(params)); // 병역 사항
        /*Map<String,Object> militarySvcInfo = userManageService.getMilitarySvcInfo(map); */

        return "jsonView";
    }

    @RequestMapping("/user/getFamilyInfoList")
    public String getFamilyInfoList(@RequestParam Map<String, Object> params, Model model){

        model.addAttribute("list",  userManageService.getFamilyInfoList(params)); //가족사항
       /* model.addAttribute("fList", userManageService.getFamilyInfoList(map)); */

        return "jsonView";
    }

    @RequestMapping("/user/getLicenceInfoList")
    public String getLicenceInfoList(@RequestParam Map<String, Object> params, Model model){

        model.addAttribute("list",  userManageService.getLicenceInfoList(params)); //자격증 및 면허, 어학능력
        /* model.addAttribute("lList", userManageService.getLicenceInfoList(map));  */

        return "jsonView";
    }

    @RequestMapping("/user/getDutyInfoList")
    public String getDutyInfoList(@RequestParam Map<String, Object> params, Model model){

        model.addAttribute("list",  userManageService.getDutyInfoList(params)); //직무사항
        /* model.addAttribute("dList", userManageService.getDutyInfoList(map));   */

        return "jsonView";
    }

    @RequestMapping("/user/getAppointInfoList")
    public String getAppointInfoList(@RequestParam Map<String, Object> params, Model model){

        model.addAttribute("list",  userManageService.getAppointInfoList(params)); //발령사항
        /* model.addAttribute("aList", userManageService.getAppointInfoList(map));    */

        return "jsonView";
    }

    @RequestMapping("/user/getRewardInfoList")
    public String getRewardInfoList(@RequestParam Map<String, Object> params, Model model){

        model.addAttribute("list",  userManageService.getRewardInfoList(params)); //포상
        /* model.addAttribute("rList", userManageService.getRewardInfoList(map));   */

        return "jsonView";
    }

   /* @RequestMapping("/user/")
    public String (@RequestParam Map<String, Object> params, Model model){

        평생학습

        return "jsonView";
    }*/

    /* @RequestMapping("/user/")
    public String (@RequestParam Map<String, Object> params, Model model){

        근무평가

        return "jsonView";
    }*/

    @RequestMapping("/user/getProposalInfoList")
    public String getProposalInfoList(@RequestParam Map<String, Object> params, Model model){

        model.addAttribute("list",  userManageService.getProposalInfoList(params)); //제안제도
        /* model.addAttribute("pList", userManageService.getProposalInfoList(map));    */

        return "jsonView";
    }











}
