package egovframework.com.devjitsu.inside.document.controller;

import com.google.gson.Gson;
import egovframework.com.devjitsu.common.service.CommonCodeService;
import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import egovframework.com.devjitsu.gw.user.service.UserService;
import egovframework.com.devjitsu.inside.document.service.DocumentService;
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
import java.util.*;

@Controller
public class DocumentController {

    private static final Logger logger = LoggerFactory.getLogger(DocumentController.class);

    @Autowired
    private UserService userService;

    @Autowired
    private DocumentService documentService;

    @Autowired
    private CommonCodeService commonCodeService;

    //등록대장
    @RequestMapping("/Inside/documentList.do")
    public String documentList(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/document/documentList";
    }
    
    //등록대장 - 문서등록 팝업창
    @RequestMapping("/Inside/pop/documentPop.do")
    public String documentPop(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "popup/inside/document/documentPop";
    }
    

    //접수대장
    @RequestMapping("/Inside/inComeList.do")
    public String inComeList(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/document/inComeList";
    }

    //접수대장 - 문서접수 팝업창
    @RequestMapping("/Inside/pop/inComePop.do")
    public String inComePop(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "popup/inside/document/inComePop";
    }

    //개발사업수주대장
    @RequestMapping("/Inside/docOrderList.do")
    public String docOrderList(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/document/docOrderList";
    }

    //개발사업수주대장 - 수주대장 팝업창
    @RequestMapping("/Inside/pop/docOrderPop.do")
    public String docOrderPop(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "popup/inside/document/docOrderPop";
    }

    //계약대장
    @RequestMapping("/Inside/docuList.do")
    public String docuList(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/document/docuList";
    }

    //계약대장 - 계약대장 팝업창
    @RequestMapping("/Inside/Pop/docuPop.do")
    public String docuPop(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "popup/inside/document/docuPop";
    }

    //문서고
    @RequestMapping("/Inside/doclist.do")
    public String doclist(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/document/doclist";
    }

    //문서고 - 문서고 팝업창
    @RequestMapping("/Inside/pop/archiveReqPopup.do")
    public String archiveReqPopup(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "popup/inside/document/archiveReqPop";
    }

    //야근/휴일식대대장
    @RequestMapping("/Inside/snackList.do")
    public String snackList(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/document/snackList";
    }

    //야근/휴일식대대장 팝업창
    @RequestMapping("/Inside/pop/snackPop.do")
    public String snackPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        model.addAttribute("flag", "false");
        if(params.containsKey("snackInfoSn")){
            Map<String, Object> data = documentService.getSnackOne(params);
            model.addAttribute("snackInfoSn", data.get("SNACK_INFO_SN"));
            model.addAttribute("status", data.get("STATUS"));
            JSONObject jsonData =  new JSONObject(data);
            model.addAttribute("data", jsonData);
            model.addAttribute("flag", "true");
        }
        return "popup/inside/document/snackPop";
    }

    //식대대장 통계조회 팝업창
    @RequestMapping("/Inside/snackStat.do")
    public String snackStat(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "popup/inside/document/snackStat";
    }

    //증명서인쇄 팝업 페이지
    @RequestMapping("/Inside/pop/snackPrintPop.do")
    public String snackPrintPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        String hwpUrl = "";
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);

        Map<String, Object> data = new HashMap<>();
        if(params.containsKey("snackInfoSn")){
            data = documentService.getSnackOne(params);
            model.addAttribute("data", data);
        }

        if(request.getServerName().contains("localhost") || request.getServerName().contains("127.0.0.1")){
            hwpUrl = commonCodeService.getHwpCtrlUrl("l_hwpUrl");
        }else{
            hwpUrl = commonCodeService.getHwpCtrlUrl("s_hwpUrl");
        }
        params.put("hwpUrl", hwpUrl);
        params.put("menuCd", "snack");

        model.addAttribute("snackInfoSn", params.get("snackInfoSn"));
        model.addAttribute("hwpUrl", hwpUrl);
        model.addAttribute("params", new Gson().toJson(params));
        model.addAttribute("data", data);;

        return "popup/inside/document/snackPrintPop";
    }

    //등록대장 리스트 조회
    @RequestMapping("/inside/getDocumentList")
    public String getDocumentList(@RequestParam Map<String, Object> params, Model model) {
        List<Map<String, Object>> list = documentService.getDocumentList(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    //수주대장 리스트 조회
    @RequestMapping("/inside/getDocuOrderList")
    public String getDocuOrderList(@RequestParam Map<String, Object> params, Model model) {
        List<Map<String, Object>> list = documentService.getDocuOrderList(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    //계약대장 리스트 조회
    @RequestMapping("/inside/getDocuContractList")
    public String getDocuContractList(@RequestParam Map<String, Object> params, Model model) {
        List<Map<String, Object>> list = documentService.getDocuContractList(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    //식대대장 리스트 조회
    @RequestMapping("/inside/getSnackList")
    public String getSnackList(@RequestParam Map<String, Object> params, Model model) {
        List<Map<String, Object>> list = documentService.getSnackList(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    //식대대장 데이터 조회
    @RequestMapping("/inside/getSnackOne")
    public String getSnackOne(@RequestParam Map<String, Object> params, Model model) {
        Map<String, Object> data = documentService.getSnackOne(params);
        model.addAttribute("data", data);
        return "jsonView";
    }

    //문서고 리스트 조회
    @RequestMapping("/inside/getArchiveList")
    public String getArchiveList(@RequestParam Map<String, Object> params, Model model) {
        List<Map<String, Object>> list = documentService.getArchiveList(params);
        model.addAttribute("list", list);
        return "jsonView";
    }



    //등록대장 문서등록
    @RequestMapping("/inside/setDocumentInsert")
    public String setDocumentInsert(@RequestParam Map<String, Object> params) {
        documentService.setDocumentInsert(params);
        return "jsonView";
    }

    //개발사업수주대장 등록
    @RequestMapping("/inside/setDocuOrderInsert")
    public String setDocuOrderInsert(@RequestParam Map<String, Object> params) {
        documentService.setDocuOrderInsert(params);
        return "jsonView";
    }

    //계약대장 등록
    @RequestMapping("/inside/setDocuContractInsert")
    public String setDocuContractInsert(@RequestParam Map<String, Object> params) {
        documentService.setDocuContractInsert(params);
        return "jsonView";
    }

    //식대대장 신청
    @RequestMapping("/inside/setSnackInsert")
    public String setSnackInsert(@RequestParam Map<String, Object> params) {
        documentService.setSnackInsert(params);
        return "jsonView";
    }

    //식대대장 승인요청
    @RequestMapping("/inside/setSnackReqCert")
    public String setSnackReqCert(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request) {
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        try{
            documentService.setSnackReqCert(params);
            model.addAttribute("rs", "sc");
        } catch (Exception e){
            e.printStackTrace();
        }
        return "jsonView";

    }

    //문서고 문서등록
    @RequestMapping("/inside/setArchiveInsert")
    public String setArchiveInsert(@RequestParam Map<String, Object> params) {
        documentService.setArchiveInsert(params);
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

}
