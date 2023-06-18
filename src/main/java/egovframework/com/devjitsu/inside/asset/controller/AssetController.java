package egovframework.com.devjitsu.inside.asset.controller;

import egovframework.com.devjitsu.inside.asset.service.AssetService;
import egovframework.com.devjitsu.main.dto.LoginVO;
import egovframework.com.devjitsu.user.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

@Controller
public class AssetController {

    private static final Logger logger = LoggerFactory.getLogger(AssetController.class);

    @Autowired
    private UserService userService;

    @Autowired
    private AssetService assetService;

    //자산리스트
    @RequestMapping("/Inside/assetList.do")
    public String assetList(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/asset/assetList";
    }

    //자산리스트 - 물품관리관 관리 팝업
    @RequestMapping("/Inside/Pop/goodsManagePop.do")
    public String goodsManagePop(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "popup/inside/asset/goodsManagePop";
    }

    //자산리스트 - 자산목록 일괄변경 팝업
    @RequestMapping("/Inside/Pop/bulkChangePop.do")
    public String bulkChangePop(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "popup/inside/asset/bulkChangePop";
    }

    //자산리스트 - 자산 추가 팝업
    @RequestMapping("/Inside/Pop/addAssetPop.do")
    public String addAssetPop(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "popup/inside/asset/addAssetPop";
    }

    //자산리스트 - 사업 선택 - 연구개발과제 선택 팝업
    @RequestMapping("/Inside/Pop/rdTaskPop.do")
    public String rdTaskPop(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "popup/inside/asset/rdTaskPop";
    }

    //구매내역
    @RequestMapping("/Inside/proposalList.do")
    public String proposalList(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/asset/proposalList";
    }

    //분류관리
    @RequestMapping("/Inside/classManage.do")
    public String classManage(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/asset/classManage";
    }

    //분류관리 - 소속관리 팝업창
    @RequestMapping("/Inside/Pop/belongManagePop.do")
    public String belongManagePop(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "popup/inside/asset/belongManagePop";
    }

    //분류관리 - 구분관리 팝업창
    @RequestMapping("/Inside/Pop/divisionManagePop.do")
    public String divisionManagePop(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "popup/inside/asset/divisionManagePop";
    }

    //분류관리 - 위치관리 팝업창
    @RequestMapping("/Inside/Pop/locationManagePop.do")
    public String locationManagePop(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "popup/inside/asset/locationManagePop";
    }

    //분류관리 > 카테고리관리 - 카테고리 관리 추가 팝업창
    @RequestMapping("/Inside/Pop/categoriesManagePop.do")
    public String categoriesManagePop(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "popup/inside/asset/categoriesManagePop";
    }
    
    //PDA연동목록
    @RequestMapping("/Inside/pdaPeristalsisList.do")
    public String pdaPeristalsisList(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/asset/pdaPeristalsisList";
    }

    //지식재산권리스트
    @RequestMapping("/Inside/rprList.do")
    public String rprList(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/asset/rprList";
    }

    //지식재산권 리스트 - 지식재산권 일괄변경 팝업
    @RequestMapping("/Inside/Pop/rprChangePop.do")
    public String rprChangePop(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "popup/inside/asset/rprChangePop";
    }

    //지식재산권 리스트 - 직무발명 신고 팝업
    @RequestMapping("/Inside/Pop/jobInvenReportPop.do")
    public String jobInvenReportPop(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "popup/inside/asset/jobInvenReportPop";
    }

    //접수내역
    @RequestMapping("/Inside/rprReceiptList.do")
    public String rprReceiptList(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/asset/rprReceiptList";
    }

    //장비관리
    @RequestMapping("/Inside/equipmentList.do")
    public String equipmentList(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/asset/equipmentList";
    }

    //장비사용 등록 팝업창
    @RequestMapping("/Inside/Pop/equipmentUsePop.do")
    public String equipmentUsePop(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "popup/inside/asset/equipmentUsePop";
    }
    
    //장비관리 (관리자)
    @RequestMapping("/Inside/equipmentListAdminView.do")
    public String equipmentListAdminView(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/asset/equipmentListAdminView";
    }

    //장비관리 팝업창 (관리자)
    @RequestMapping("/Inside/Pop/equipmentmangePop.do")
    public String equipmentmangePop(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "popup/inside/asset/equipmentmangePop";
    }

    //장비관리 팝업창 (관리자) - 장비등록
    @RequestMapping("/asset/setEquipmentInsert")
    public void setEquipmentInsert(@RequestParam Map<String, Object> params) {
        assetService.setEquipmentInsert(params);
    }

    //도서리스트
    @RequestMapping("/Inside/bookList.do")
    public String bookList(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/asset/bookList";
    }

    //도서 분류관리 팝업창
    @RequestMapping("/Inside/Pop/bookManagePop.do")
    public String bookManagePop(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "popup/inside/asset/bookManagePop";
    }

    //도서등록 팝업창
    @RequestMapping("/Inside/Pop/bookRegisPop.do")
    public String bookRegisPop(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "popup/inside/asset/bookRegisPop";
    }

    //오늘날짜 구하기 yyyyMMddhhmmss
    public static String getCurrentDateTime() {
        Date today = new Date();
        Locale currentLocale = new Locale("KOREAN", "KOREA");
        String pattern = "yyyyMMddHHmmss";
        SimpleDateFormat formatter = new SimpleDateFormat(pattern, currentLocale);
        return formatter.format(today);
    }

    //공통코드 - 장비관리구분
    @RequestMapping("/asset/getEqipmnList")
    @ResponseBody
    public Map<String, Object> getEqipmnList(@RequestParam Map<String, Object> params){
        Map<String, Object> result = new HashMap<>();
        result.put("list", assetService.getEqipmnList(params));
        return result;
    }

    //장비등록 목록 조회
    @RequestMapping("/asset/getEqipmnRegList")
    public String getEqipmnRegList(@RequestParam Map<String,Object> map, Model model) {
        model.addAttribute("rs", assetService.getEqipmnRegList(map));
        return "jsonView";
    }


}
