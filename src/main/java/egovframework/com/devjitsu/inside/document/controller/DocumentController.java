package egovframework.com.devjitsu.inside.document.controller;

import com.google.gson.Gson;
import egovframework.com.devjitsu.common.service.CommonCodeService;
import egovframework.com.devjitsu.common.utiles.ConvertUtil;
import egovframework.com.devjitsu.common.utiles.EgovStringUtil;
import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import egovframework.com.devjitsu.gw.user.service.UserService;
import egovframework.com.devjitsu.inside.document.service.DocumentService;
import org.json.simple.JSONObject;
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

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
public class DocumentController {

    private static final Logger logger = LoggerFactory.getLogger(DocumentController.class);

    @Value("#{properties['File.Server.Dir']}")
    private String SERVER_DIR;

    @Value("#{properties['File.Base.Directory']}")
    private String BASE_DIR;

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
    public String inComePop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);

        model.addAttribute("flag", "false");
        if(params.containsKey("documentSn")){
            Map<String, Object> data = documentService.getSnackOne(params);
            model.addAttribute("documentSn", data.get("DOCUMENT_SN"));
            model.addAttribute("status", data.get("STATUS"));
            JSONObject jsonData =  new JSONObject(data);
            model.addAttribute("data", jsonData);
            model.addAttribute("flag", "true");
            model.addAttribute("params", params);
        }
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
    public String docuPop(HttpServletRequest request, Model model, @RequestParam Map<String, Object> params) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);

        String hwpUrl = "";
        HttpServletRequest servletRequest = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();

        if(request.getServerName().contains("localhost") || request.getServerName().contains("127.0.0.1") || servletRequest.getServerName().contains("218.158.231.186")){
            hwpUrl = commonCodeService.getHwpCtrlUrl("l_hwpUrl");
            params.put("hwpTemplateFile", "http://218.158.231.186/upload/templateForm/");
        }else{
            hwpUrl = commonCodeService.getHwpCtrlUrl("s_hwpUrl");
            params.put("hwpTemplateFile", "http://218.158.231.184/upload/templateForm/");
        }

        params.put("hwpUrl", hwpUrl);
        model.addAttribute("hwpUrl", hwpUrl);
        model.addAttribute("params", new Gson().toJson(params));
        model.addAttribute("data", params);
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

        if(login == null){
            return "error/error";
        }

        return "inside/document/snackList";
    }

    //야근/휴일식대대장 팝업창
    @RequestMapping("/Inside/pop/snackPop.do")
    public String snackPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        Map<String, Object> map = new HashMap<>();

        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        model.addAttribute("flag", "false");
        model.addAttribute("params", params);

        if(login == null){
            model.addAttribute("windowType", "popup");
            return "error/error";
        }

        if(params.containsKey("snackInfoSn")){
            Map<String, Object> data = documentService.getSnackOne(params);
            model.addAttribute("snackInfoSn", data.get("SNACK_INFO_SN"));
            model.addAttribute("status", data.get("STATUS"));
            JSONObject jsonData =  new JSONObject(data);
            model.addAttribute("data", jsonData);
            model.addAttribute("flag", "true");
            model.addAttribute("params", params);
        }
        return "popup/inside/document/snackPop";
    }

    //야근/휴일식대대장 관리자 페이지
    @RequestMapping("/Inside/snackAdminList.do")
    public String snackAdminList(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);

        if(login == null){
            return "error/error";
        }
        
        return "inside/document/snackAdminList";
    }

    //식대대장 통계조회 팝업창
    @RequestMapping("/Inside/pop/snackStatPop.do")
    public String snackStat(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "popup/inside/document/snackStatPop";
    }

    //식대대장 영수증 조회 팝업창
    @RequestMapping("/Inside/pop/snackReceiptPop.do")
    public String snackReceipt(@RequestParam Map<String, Object> params, Model model) {
        model.addAttribute("params", params);
        return "popup/inside/document/snackReceiptPop";
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

    //계약대장 데이터 조회
    @RequestMapping("/inside/getDocuContractOne")
    public String getDocuContractOne(@RequestParam Map<String, Object> params, Model model) {
        Map<String, Object> data = documentService.getDocuContractOne(params);
        model.addAttribute("data", data);
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

    //식대대장 통계 조회
    @RequestMapping("/inside/getSnackStat")
    public String getSnackStat(@RequestParam Map<String, Object> params, Model model) {
        Map<String, Object> data = documentService.getSnackStat(params);
        model.addAttribute("dept", data.get("dept"));
        model.addAttribute("total", data.get("total"));
        return "jsonView";
    }

    //식대대장 통계 엑셀다운로드
    @RequestMapping("/excel/snackListDownload")
    public void snackListDownload(@RequestParam Map<String, Object> params, HttpServletResponse response) throws IOException {
        documentService.snackListDownload(params, response);
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

    //접수대장 문서등록
    @RequestMapping("/inside/setInComeInsert")
    public String setInComeInsert(@RequestParam Map<String, Object> params, MultipartHttpServletRequest request, Model model) {
        MultipartFile[] file = request.getFiles("inComeFile").toArray(new MultipartFile[0]);
        documentService.setInComeInsert(params, file, SERVER_DIR, BASE_DIR);

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
    public String setDocuContractInsert(@RequestParam Map<String, Object> params, MultipartHttpServletRequest request, Model model) {
        MultipartFile[] file = request.getFiles("reqFile").toArray(new MultipartFile[0]);
        documentService.setDocuContractInsert(params, file, SERVER_DIR, BASE_DIR);

        return "jsonView";
    }

    //계약대장 등록
    @RequestMapping("/inside/setDocuContractDel")
    public String setDocuContractDelete(@RequestParam Map<String, Object> params) {
        documentService.setDocuContractDel(params);

        return "jsonView";
    }

    //식대대장 신청
    @RequestMapping("/inside/setSnackInsert")
    public String setSnackInsert(@RequestParam Map<String, Object> params, MultipartHttpServletRequest request, Model model) {
        MultipartFile[] file = request.getFiles("snackFile").toArray(new MultipartFile[0]);
        documentService.setSnackInsert(params, file, SERVER_DIR, BASE_DIR);

        model.addAttribute("params", params);
        return "jsonView";
    }

    //식대대장 삭제
    @RequestMapping("/inside/setSnackDel.do")
    public String setSnackDel(@RequestParam Map<String, Object> params) {
        documentService.setSnackDel(params);
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
    public String setArchiveInsert(@RequestParam Map<String, Object> params, MultipartHttpServletRequest request) {
        MultipartFile[] file = request.getFiles("archiveFile").toArray(new MultipartFile[0]);
        documentService.setArchiveInsert(params, file, SERVER_DIR, BASE_DIR);
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

    //문서고 등록 - 문서위치 조회
    @RequestMapping("/document/getDocumentPlaceList")
    @ResponseBody
    public Map<String, Object> getDocumentPlaceList(@RequestParam Map<String, Object> params){
        Map<String, Object> result = new HashMap<>();
        result.put("list", documentService.getDocumentPlaceList(params));
        return result;
    }

    //문서고 삭제
    @RequestMapping("/document/setAchiveDelete")
    public String setAchiveDelete(@RequestParam(value = "archivePk[]") List<String> archivePk, Model model){
        model.addAttribute("rs", documentService.setAchiveDelete(archivePk));
        return "jsonView";
    }

    //문서고 폐기
    @RequestMapping("/document/setAchiveScrap")
    public String setAchiveScrap(@RequestParam(value = "archivePk[]") List<String> archivePk, Model model){
        model.addAttribute("rs", documentService.setAchiveScrap(archivePk));
        return "jsonView";
    }

    //문서고 업데이트
    @RequestMapping("/document/setArchiveUpdate")
    public String setArchiveUpdate(@RequestParam Map<String, Object> params, Model model, MultipartHttpServletRequest request){
        MultipartFile[] file = request.getFiles("archiveFile").toArray(new MultipartFile[0]);
        documentService.setArchiveUpdate(params, file, SERVER_DIR, BASE_DIR);
        model.addAttribute("pk", params.get("pk"));
        return "jsonView";
    }

    //문서고 수정 팝업창
    @RequestMapping("/Inside/pop/archiveUpdatePop.do")
    public String archiveUpdatePop(HttpServletRequest request, Model model, @RequestParam Map<String, Object> params) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        Map<String,Object> archiveList = documentService.getArchiveinfoList(params);

        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        model.addAttribute("pk", params.get("pk"));
        model.addAttribute("archiveList", archiveList);

        return "popup/inside/document/archiveUpdatePop";
    }


    //문서고 수정창에서도 조회
    @RequestMapping("/inside/getArchiveinfoList")
    public String getArchiveinfoList(@RequestParam Map<String, Object> params, Model model) {
        Map<String, Object> data = documentService.getArchiveinfoList(params);
        model.addAttribute("data", data);
        return "jsonView";
    }

    /** 등록대장, 접수대장 임시 삭제*/
    @RequestMapping("/inside/delDocumentList")
    public String delDocumentList(@RequestParam Map<String, Object> params, Model model) {
        documentService.delDocumentList(params);
        return "jsonView";
    }

    /** 등록대장, 접수대장 삭제 복구*/
    @RequestMapping("/inside/delCancelDocumentList")
    public String delCancelDocumentList(@RequestParam Map<String, Object> params, Model model) {
        documentService.delCancelDocumentList(params);
        return "jsonView";
    }

    /** 등록대장, 접수대장 최종 삭제*/
    @RequestMapping("/inside/delFinalDocumentList")
    public String delFinalDocumentList(@RequestParam Map<String, Object> params, Model model) {
        documentService.delFinalDocumentList(params);
        return "jsonView";
    }

    /** 등록대장 - 문서등록 수정 팝업창 */
    @RequestMapping("/Inside/pop/documentUpdatePop.do")
    public String documentUpdatePop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        Map<String, Object> data = documentService.getDocViewOne(params);
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);
        model.addAttribute("data", data);

        return "popup/inside/document/documentUpdatePop";
    }
    
    /** 등록대장 - 문서등록 수정  */
    @RequestMapping("/Inside/setDocumentUpdate")
    public String setDocumentUpdate(@RequestParam Map<String, Object> params, Model model) {
        documentService.setDocumentUpdate(params);
        return "jsonView";
    }

    /** 접수대장 팝업 조회 */
    @RequestMapping("/Inside/Pop/inComeUpdatePop.do")
    public String inComeUpdatePop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        Map<String, Object> inComeList = documentService.getInComeUpdateList(params);
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);
        model.addAttribute("inComeList", inComeList);

        return "popup/inside/document/inComeUpdatePop";
    }

   // 접수대장 수정 팝업 첨부파파일
    @RequestMapping("/inside/getInComeUpdateList")
    public String getInComeUpdateList(@RequestParam Map<String, Object> params, Model model) {
        Map<String, Object> data = documentService.getInComeUpdateList(params);
        model.addAttribute("data", data);
        return "jsonView";
    }

    // 접수대장 팝업 수정
    @RequestMapping("/inside/setInComeUpdate")
    public String setInComeUpdate(@RequestParam Map<String, Object> params, Model model, MultipartHttpServletRequest request) {
        MultipartFile[] file = request.getFiles("inComeFile").toArray(new MultipartFile[0]);
        documentService.setInComeUpdate(params, file, SERVER_DIR, BASE_DIR);
        model.addAttribute("documentSn", params.get("documentSn"));

        return "jsonView";
    }

    /** ibrench 카드 이력 등록 리스트 조회 */
    @RequestMapping("/snack/getCardList")
    public String getCardList(@RequestParam Map<String, Object> params, Model model){
        List<Map<String, Object>> list = documentService.getCardList(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

 /*
    @RequestMapping("/inside/getInComeUpdateFileList")
    public String getInComeUpdateFileList(@RequestParam Map<String, Object> params, Model model) {
        List<Map<String, Object>> data = documentService.getInComeUpdateFileList(params);
        model.addAttribute("data", data);
        return "jsonView";
    }
*/
     @RequestMapping("/contract/getFileListC")
     public String getFileListC(@RequestParam Map<String, Object> params, Model model) {
         List<Map<String, Object>> list = documentService.getFileListC(params);
         model.addAttribute("fileList", list);
         return "jsonView";
     }

    @RequestMapping("/snack/getFileList")
    public String getFileList(@RequestParam Map<String, Object> params, Model model) {
        List<Map<String, Object>> list = documentService.getFileList(params);
        model.addAttribute("fileList", list);
        return "jsonView";
    }

    @RequestMapping("/popup/inside/approvalFormPopup/inComeApprovalPop.do")
    public String inComeApprovalPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("params", params);
        model.addAttribute("loginVO", login);
        return "popup/inside/document/approvalFormPopup/inComeApprovalPop";
    }

    @RequestMapping(value = "/inside/inComeReqApp")
    public String inComeReqApp(@RequestParam Map<String, Object> bodyMap, Model model) {
        System.out.println("bodyMap");
        System.out.println(bodyMap);
        String resultCode = "SUCCESS";
        String resultMessage = "성공하였습니다.";
        try{
            documentService.updateInComeDocState(bodyMap);
        }catch(Exception e){
            logger.error(e.getMessage());
            resultCode = "FAIL";
            resultMessage = "연계 정보 갱신 오류 발생("+e.getMessage()+")";
        }
        model.addAttribute("resultCode", resultCode);
        model.addAttribute("resultMessage", resultMessage);
        return "jsonView";
    }


}
