package egovframework.com.devjitsu.inside.asset.controller;

import com.google.gson.Gson;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import dev_jitsu.MainLib;
import egovframework.com.devjitsu.common.service.CommonCodeService;
import egovframework.com.devjitsu.common.service.CommonService;
import egovframework.com.devjitsu.inside.asset.service.AssetService;
import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import egovframework.com.devjitsu.gw.user.service.UserService;
import egovframework.com.devjitsu.inside.userManage.service.UserManageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.awt.image.BufferedImage;
import java.io.*;
import java.net.Socket;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Controller
public class AssetController {

    private static final Logger logger = LoggerFactory.getLogger(AssetController.class);

    @Value("#{properties['File.Server.Dir']}")
    private String SERVER_DIR;

    @Value("#{properties['File.Base.Directory']}")
    private String BASE_DIR;

    @Autowired
    private UserService userService;

    @Autowired
    private AssetService assetService;

    @Autowired
    private UserManageService userManageService;

    @Autowired
    private CommonService commonService;

    /**
     * 자산관리 > 자산리스트 페이지
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/inside/assetList.do")
    public String assetList(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", login);

        return "inside/asset/assetList";
    }

    /**
     * 인사이드 코드 리스트
     * @param map
     * @param model
     * @return
     */
    @RequestMapping("/inside/getInsideCodeList.do")
    public String getInsideCodeList(@RequestParam Map<String,Object> map, Model model) {
        model.addAttribute("rs", assetService.getInsideCodeList(map));
        return "jsonView";
    }

    /**
     * 자산관리 > 자산리스트 - 리스트
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/inside/getAssetList.do")
    public String getAssetList(@RequestParam Map<String,Object> params, Model model) {
        model.addAttribute("list", assetService.getAssetList(params));
        return "jsonView";
    }

    /**
     * 자산관리 > 자산 삭제
     * @param params
     * @return
     */
    @RequestMapping("/inside/setAssetDel.do")
    public String setAssetDel(@RequestParam Map<String,Object> params) {
        assetService.setAssetDel(params);
        return "jsonView";
    }

    /**
     * 자산관리 > 자산리스트 - 자산등록 팝업
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/inside/addAssetPop.do")
    public String addAssetPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        params.put("menuCd", "asset");
        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);

        return "popup/inside/asset/addAssetPop";
    }

    /**
     * 자산관리 > 자산리스트 - 자산등록
     * @param params
     * @return
     */
    @RequestMapping("/inside/setAssetInfo.do")
    public String setAssetInfo(@RequestParam Map<String,Object> params,Model model, MultipartHttpServletRequest request) {
        params.put("regEmpIp", request.getRemoteAddr());

        MultipartFile[] file = request.getFiles("file1").toArray(new MultipartFile[0]);
        assetService.setAssetInfo(params, request, file, SERVER_DIR, BASE_DIR);

        model.addAttribute("params", params);

        return "jsonView";
    }

    /**
     * 자산관리 > 자산리스트 - 자산상세보기 팝업
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/inside/viewAssetPop.do")
    public String viewAssetPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        if(!StringUtils.isEmpty(params.get("astPdaInfoSn"))){
            model.addAttribute("astPdaInfo", "Y");
            model.addAttribute("data", assetService.getAstPdaInfo(params));
        }else{
            model.addAttribute("data", assetService.getAssetInfo(params));
            model.addAttribute("astManage", assetService.getAstManage());
            model.addAttribute("astInfo", "Y");
        }

        model.addAttribute("loginVO", login);

        return "popup/inside/asset/viewAssetPop";
    }

    /**
     * 자산관리 > 자산리스트 - 자산수정 데이터 조회
     * @param params
     * @return
     */
    @RequestMapping("/inside/getAssetInfo.do")
    public String getAssetInfo(@RequestParam Map<String,Object> params, Model model) {
        model.addAttribute("data", assetService.getAssetInfoAll(params));
        model.addAttribute("data2", assetService.getAssetInfo(params));
        model.addAttribute("manage", assetService.getAstManage());

        return "jsonView";
    }

    /**
     * 유지보수, 기타 내역 추가 팝업
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/asset/pop/popAddHistory.do")
    public String popAddHistory(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);

        return "popup/inside/asset/popAddHistory";
    }

    /**
     * 자산관리 > 유지보수, 기타내역 등록
     * @param params
     * @return
     */
    @RequestMapping("/asset/setAstOtherHistory.do")
    public String setAstOtherHistory(@RequestParam Map<String,Object> params) {
        assetService.setAstOtherHistory(params);
        return "jsonView";
    }

    /**
     * 자산관리 > 자산리스트 - 물품관리관 등록/수정 팝업
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/inside/assetManagePop.do")
    public String goodsManagePop(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("data", assetService.getAstManage());
        model.addAttribute("loginVO", login);

        return "popup/inside/asset/assetManagePop";
    }

    /**
     * 자산관리 > 자산리스트 - 물품관리관 등록/수정
     * @param params
     * @return
     */
    @RequestMapping("/inside/setAstManage.do")
    public String setAstManage(@RequestParam Map<String,Object> params) {
        assetService.setAstManage(params);
        return "jsonView";
    }

    /**
     * 자산관리 > 자산리스트 - 일괄변경 팝업
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/inside/bulkChangePop.do")
    public String bulkChangePop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);

        return "popup/inside/asset/bulkChangePop";
    }

    /**
     * 자산관리 > 자산리스트 - 일괄변경
     * @param params
     * @return
     */
    @RequestMapping("/inside/setAstInfoBatch.do")
    public String setAstInfoBatch(@RequestParam Map<String,Object> params, HttpServletRequest request) {
        params.put("regEmpIp", request.getRemoteAddr());
        assetService.setAstInfoBatch(params);
        return "jsonView";
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
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/asset/proposalList";
    }

    /**
     * 자산관리 > 분류관리 페이지
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/inside/classManage.do")
    public String classManage(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/asset/classManage";
    }

    /**
     * 자산관리 > 분류관리 - 소속 코드 리스트
     * @param map
     * @param model
     * @return
     */
    @RequestMapping("/inside/getClassPositionList")
    public String getClassPositionList(@RequestParam Map<String,Object> map, Model model) {
        model.addAttribute("rs", assetService.getClassPositionList(map));
        return "jsonView";
    }

    @Autowired
    CommonCodeService commonCodeService;
    @RequestMapping("/inside/pop/assetPrintPop.do")
    public String assetPrintPop(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        String hwpUrl = "";
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", login);

        if(request.getServerName().contains("localhost") || request.getServerName().contains("127.0.0.1")){
            hwpUrl = commonCodeService.getHwpCtrlUrl("l_hwpUrl");
        }else{
            hwpUrl = commonCodeService.getHwpCtrlUrl("s_hwpUrl");
        }

        params.put("hwpUrl", hwpUrl);
        model.addAttribute("hwpUrl", hwpUrl);
        model.addAttribute("params", new Gson().toJson(params));
        model.addAttribute("data", params);

        return "popup/inside/asset/assetPrintPop";
    }

    /**
     * 프로젝트 리스트
     */
    @RequestMapping("/inside/getPjtList")
    public String getPjtList(@RequestParam Map<String, Object> params, Model model) {
        List<Map<String,Object>> list = assetService.getPjtList(params);

        model.addAttribute("list", list);


        return "jsonView";
    }
    /**
     * 자산관리 > 분류관리 - 소속 등록/수정 팝업
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/inside/assetCodePositionManagePop.do")
    public String assetCodePositionManagePop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);

        return "popup/inside/asset/assetCodePositionManagePop";
    }

    /**
     * 자산관리 > 분류관리 - 소속 코드 수정 조회
     * @param map
     * @param model
     * @return
     */
    @RequestMapping("/inside/getClassPosition.do")
    public String getClassPosition(@RequestParam Map<String,Object> map, Model model) {
        model.addAttribute("rs", assetService.getClassPosition(map));
        return "jsonView";
    }

    /**
     * 자산관리 > 분류관리 - 소속 등록/수정
     * @param map
     * @return
     */
    @RequestMapping("/asset/setAssetCodePosition.do")
    public String setAssetCodePosition(@RequestParam Map<String,Object> map) {
        assetService.setAssetCodePosition(map);
        return "jsonView";
    }

    /**
     * 자산관리 > 분류관리 - 소속 삭제
     * @param map
     * @return
     */
    @RequestMapping("/asset/setAssetCodePositionDel.do")
    public String setAssetCodePositionDel(@RequestParam Map<String,Object> map) {
        assetService.setAssetCodePositionDel(map);
        return "jsonView";
    }


    /**
     * 자산관리 > 분류관리 - 구분 코드 리스트
     * @param map
     * @param model
     * @return
     */
    @RequestMapping("/inside/getClassDivisionList")
    public String getClassDivisionList(@RequestParam Map<String,Object> map, Model model) {
        model.addAttribute("rs", assetService.getClassDivisionList(map));
        return "jsonView";
    }

    /**
     * 자산관리 > 분류관리 - 구분관리 팝업
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/inside/divisionManagePop.do")
    public String divisionManagePop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);

        return "popup/inside/asset/divisionManagePop";
    }

    /**
     * 자산관리 > 분류관리 - 구분관리 수정 조회
     * @param map
     * @param model
     * @return
     */
    @RequestMapping("/inside/getClassDivision.do")
    public String getClassDivision(@RequestParam Map<String,Object> map, Model model) {
        model.addAttribute("rs", assetService.getClassDivision(map));
        return "jsonView";
    }

    /**
     * 자산관리 > 분류관리 - 구분관리 등록/수정
     * @param map
     * @return
     */
    @RequestMapping("/asset/setClassDivision.do")
    public String setClassDivision(@RequestParam Map<String,Object> map) {
        assetService.setClassDivision(map);
        return "jsonView";
    }

    /**
     * 자산관리 > 분류관리 - 구분관리 삭제
     * @param map
     * @return
     */
    @RequestMapping("/asset/setClassDivisionDel.do")
    public String setClassDivisionDel(@RequestParam Map<String,Object> map) {
        assetService.setClassDivisionDel(map);
        return "jsonView";
    }

    /**
     * 자산관리 > 분류관리 - 위치코드 리스트
     * @param model
     * @return
     */
    @RequestMapping("/asset/getAssetPlaceList")
    public String getAssetPlaceList(Model model) {
        model.addAttribute("rs",assetService.getAssetPlaceList());
        return "jsonView";
    }

    /**
     * 자산관리 > 분류관리 - 위치관리 팝업
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/inside/placeManagePop.do")
    public String placeManagePop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);

        return "popup/inside/asset/placeManagePop";
    }

    /**
     * 자산관리 > 분류관리 - 위치관리 수정 조회
     * @param map
     * @param model
     * @return
     */
    @RequestMapping("/inside/getAssetPlace.do")
    public String getAssetPlace(@RequestParam Map<String,Object> map, Model model) {
        model.addAttribute("rs", assetService.getAssetPlace(map));
        return "jsonView";
    }

    /**
     * 자산관리 > 분류관리 - 위치관리 등록/수정
     * @param map
     * @return
     */
    @RequestMapping("/inside/setAssetPlace.do")
    public String setAssetPlace(@RequestParam Map<String,Object> map) {
        assetService.setAssetPlace(map);
        return "jsonView";
    }

    /**
     * 자산관리 > 분류관리 - 위치 삭제
     * @param params
     * @return
     */
    @RequestMapping("/asset/setAssetPlaceDel.do")
    public String setAssetPlaceDel(@RequestParam Map<String,Object> params) {
        assetService.setAssetPlaceDel(params);
        return "jsonView";
    }

    /**
     * 자산 카테고리 리스트
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/asset/getAstCategoryList")
    public String getAstCodeList(@RequestParam Map<String,Object> params, Model model) {
        model.addAttribute("rs", assetService.getAstCategoryList(params));
        return "jsonView";
    }

    /**
     * 카테고리 등록 팝업
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/inside/categoriesManagePop.do")
    public String categoriesManagePop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);

        return "popup/inside/asset/categoriesManagePop";
    }

    /**
     * 카테고리 수정 조회
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/asset/getAstCategory.do")
    public String getAstCategory(@RequestParam Map<String,Object> params, Model model) {
        model.addAttribute("data", assetService.getAstCategory(params));
        return "jsonView";
    }

    /**
     * 카테고리 등록/수정
     * @param params
     * @return
     */
    @RequestMapping("/asset/setCategoryCode.do")
    public String setCategoryCode(@RequestParam Map<String,Object> params) {
        assetService.setCategoryCode(params);
        return "jsonView";
    }

    /**
     * 카테고리 삭제
     * @param params
     * @return
     */
    @RequestMapping("/asset/getAstCategoryDel.do")
    public String getAstCategoryDel(@RequestParam Map<String,Object> params) {
        assetService.getAstCategoryDel(params);
        return "jsonView";
    }

    /**
     * 자산관리 > PDA 연동목록 페이지
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/inside/astPdaInfoList.do")
    public String astPdaInfoList(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", login);

        return "inside/asset/astPdaInfoList";
    }

    /**
     * 자산관리 > PDA 연동목록 리스트
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/asset/getAstPdaInfoList.do")
    public String getPda(@RequestParam Map<String,Object> params, Model model) {
        model.addAttribute("rs", assetService.getAstPdaInfoList(params));
        return "jsonView";
    }

    /**
     * 자산관리 > PDA연동목록 - 위치 일괄변경 팝업
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/inside/placeChangePop.do")
    public String placeChangePop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);

        return "popup/inside/asset/placeChangePop";
    }

    /**
     * 자산관리 > PDA 리스트 위치 일괄변경
     * @param params
     * @return
     */
    @RequestMapping("/asset/setAstPdaInfoBatch.do")
    public String setAstPdaInfoBatch(@RequestParam Map<String,Object> params) {
        assetService.setAstPdaInfoBatch(params);
        return "jsonView";
    }


    /**
     * 자산관리 > PDA 연동목록 자산리스트에서 가져오기
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/asset/getAssetListToPdaList.do")
    public String getAssetListToPdaList(@RequestParam Map<String,Object> params, Model model) {
        assetService.getAssetListToPdaList(params);
        return "jsonView";
    }

    /**
     * 자산관리 > PDA 연동목록 - 재물조사실시
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/asset/setAstPdaOptInspection.do")
    public String setAssetInspection(@RequestParam Map<String,Object> params, Model model) {
        assetService.setAstPdaOptInspection(params);
        return "jsonView";
    }

    /**
     * 자산관리 > PDA 연동목록 - 재물조사 업로드
     * @param params
     * @return
     */
    @RequestMapping("/asset/setAssetInspectionUpload.do")
    public String setAssetInspectionUpload(@RequestParam Map<String,Object> params, HttpServletRequest request) {
        params.put("regEmpIp", request.getRemoteAddr());
        assetService.setAssetInspectionUpload(params);
        return "jsonView";
    }

    /**
     * 앱 apk 파일 다운로드
     * @param request
     * @return
     */
    @RequestMapping("/asset/setAppApkDownLoad.do")
    public void setAppApkDownLoad(HttpServletRequest request, HttpServletResponse response){
        assetService.setAppApkDownLoad(request, response);
    }

    //지식재산권리스트
    @RequestMapping("/Inside/rprList.do")
    public String rprList(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
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






    //캠도큐먼트 - 직무발명신고서 전자결재 신청폼 팝업
    @RequestMapping("/Inside/pop/inventionReqPop.do")
    public String inventionReqPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);
        return "popup/inside/asset/inventionReqPop";
    }
    //캠도큐먼트 - 직무발명신고서 전자결재 페이지
    @RequestMapping("/popup/inside/approvalFormPopup/inventionApprovalPop.do")
    public String inventionApprovalPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("data", params);
        model.addAttribute("loginVO", login);
        return "/popup/inside/asset/approvalFormPopup/inventionApprovalPop";
    }
    //캠도큐먼트 - 포상금지급신청서 전자결재 신청폼 팝업
    @RequestMapping("/Inside/pop/rprResultPop.do")
    public String rprResultPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);
        return "popup/inside/asset/rprResultPop";
    }
    //캠도큐먼트 - 포상금지급신청서 전자결재 페이지
    @RequestMapping("/popup/inside/approvalFormPopup/rprResApprovalPop.do")
    public String rprResApprovalPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("data", params);
        model.addAttribute("loginVO", login);
        return "/popup/inside/asset/approvalFormPopup/rprResApprovalPop";
    }
    //캠도큐먼트 - 지식재산권 선택 팝업
    @RequestMapping("/Inside/pop/searchRprPop.do")
    public String searchRprPop(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "popup/inside/asset/searchRprPop";
    }
    //접수내역 패아자
    @RequestMapping("/Inside/rprReceiptList.do")
    public String rprReceiptList(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/asset/rprReceiptList";
    }
    //지식재산권 등록 팝업
    @RequestMapping("/Inside/pop/rprReceiptReqPop.do")
    public String rprReceiptReqPop(@RequestParam Map<String, Object> params,HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        model.addAttribute("data", params);
        return "popup/inside/asset/rprReceiptReqPop";
    }

    //직무발명신고서 데이터
    @RequestMapping("/inside/getInventionInfo")
    public String getInventionInfo(@RequestParam Map<String, Object> params, Model model) {
        Map<String, Object> data = assetService.getInventionInfo(params);
        model.addAttribute("rs", data);
        return "jsonView";
    }
    //직무발명신고서 지분 리스트
    @RequestMapping("/inside/getInventionShareList")
    public String getInventionShareList(@RequestParam Map<String, Object> params, Model model) {
        List<Map<String, Object>> list = assetService.getInventionShareList(params);
        model.addAttribute("list", list);
        return "jsonView";
    }
    //접수내역 리스트
    @RequestMapping("/inside/getRprReceiptList")
    public String getRprReceiptList(@RequestParam Map<String,Object> params, Model model) {
        List<Map<String, Object>> list = assetService.getRprReceiptList(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    /** 포상급 지급 신청서 - 접수가능한 지식재산권 리스트 */
    @RequestMapping("/inside/getIPList")
    public String getIPList(@RequestParam Map<String,Object> params, Model model) {
        List<Map<String, Object>> list = assetService.getIPList(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    //캠도큐먼트 - 직무발명신고서 신청폼 등록
    @RequestMapping("/inside/setInventionInsert")
    public String setInventionInsert(@RequestParam Map<String, Object> params, Model model, MultipartHttpServletRequest request) {
        /*assetService.setInventionInsert(params);*/
        assetService.setInventionInsert(params, request, SERVER_DIR, BASE_DIR);
        model.addAttribute("inventionInfoSn", params.get("inventionInfoSn"));
        return "jsonView";
    }
    //캠도큐먼트 - 포상금지급신청서 신청폼 등록
    @RequestMapping("/inside/setRprResultInsert")
    public String setRprResultInsert(@RequestParam Map<String, Object> params, Model model) {
        assetService.setRprResultInsert(params);
        model.addAttribute("inventionInfoSn", params.get("inventionInfoSn"));
        return "jsonView";
    }
    //지식재산권 등록
    @RequestMapping("/inside/setRprReceiptInsert")
    public String setRprReceiptInsert(@RequestParam Map<String, Object> params, Model model, MultipartHttpServletRequest request) {
        assetService.setRprReceiptInsert(params, request, SERVER_DIR, BASE_DIR);
        model.addAttribute("relatedFileNo", params.get("relatedFileNo"));
        model.addAttribute("relatedAfileNo", params.get("relatedAfileNo"));
        model.addAttribute("quoFileNo", params.get("quoFileNo"));
        model.addAttribute("inventionInfoSn", params.get("inventionInfoSn"));
        return "jsonView";
    }
    //직무발명신고서, 포상금지급신청서 결재 상태값에 따른 UPDATE 메서드
    @RequestMapping(value = "/inside/inventionReqApp")
    public String certificateReqApp(@RequestParam Map<String, Object> bodyMap, Model model) {
        System.out.println("bodyMap");
        System.out.println(bodyMap);
        String resultCode = "SUCCESS";
        String resultMessage = "성공하였습니다.";
        try{
            assetService.updateDocState(bodyMap);
        }catch(Exception e){
            logger.error(e.getMessage());
            resultCode = "FAIL";
            resultMessage = "연계 정보 갱신 오류 발생("+e.getMessage()+")";
        }
        model.addAttribute("resultCode", resultCode);
        model.addAttribute("resultMessage", resultMessage);
        return "jsonView";
    }

    //장비관리
    @RequestMapping("/Inside/equipmentList.do")
    public String equipmentList(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/asset/equipmentList";
    }

    //장비사용 등록 팝업창
    @RequestMapping("/Inside/Pop/equipmentUsePop.do")
    public String equipmentUsePop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);
        return "popup/inside/asset/equipmentUsePop";
    }
    
    //장비관리 (관리자)
    @RequestMapping("/Inside/equipmentListAdminView.do")
    public String equipmentListAdminView(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
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

    //공통코드 - 장비관리구분 조회
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

    //장비등록 목록 삭제
    @RequestMapping("/asset/setEquipmentDelete")
    public String setEquipmentDelete(@RequestParam(value = "eqmnPk[]") List<String> eqmnPk, Model model){
        model.addAttribute("rs", assetService.setEquipmentDelete(eqmnPk));
        return "jsonView";
    }

    //장비등록 목록 업데이트
    @RequestMapping("/asset/setEquipmentUpdate")
    public String setEquipmentUpdate(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("rs", assetService.setEquipmentUpdate(params));
        return "jsonView";
    }

    //장비관리 팝업창 - 장비사용 등록
    @RequestMapping("/asset/setEquipmentUseInsert")
    public void setEquipmentUseInsert(@RequestParam Map<String, Object> params) {
        assetService.setEquipmentUseInsert(params);
    }

    //장비사용 등록 - 장비명 조회
    @RequestMapping("/asset/getEqipmnNameList")
    @ResponseBody
    public Map<String, Object> getEqipmnNameList(@RequestParam Map<String, Object> params){
        Map<String, Object> result = new HashMap<>();
        result.put("list", assetService.getEqipmnNameList(params));
        return result;
    }

    //장비사용 등록 - 업체구분 조회
    @RequestMapping("/asset/getPrtpcoGbnNameList")
    @ResponseBody
    public Map<String, Object> getPrtpcoGbnNameList(@RequestParam Map<String, Object> params){
        Map<String, Object> result = new HashMap<>();
        result.put("list", assetService.getPrtpcoGbnNameList(params));
        return result;
    }

    //장비사용 등록 - 사용자로 장비 조회
    @RequestMapping("/asset/getEqipmnOne")
    @ResponseBody
    public Map<String, Object> getEqipmnOne(@RequestParam Map<String, Object> params){
        Map<String, Object> result = new HashMap<>();
        result.put("map", assetService.getEqipmnOne(params));
        return result;
    }
    
    @RequestMapping("/inside/getAssetMdCodeList")
    public String getAssetMdCodeList(@RequestParam Map<String,Object> map, Model model) {
        model.addAttribute("rs", assetService.getAssetMdCodeList(map));
        return "jsonView";
    }
    @RequestMapping("/inside/getAssetDtCodeList")
    public String getAssetDtCodeList(@RequestParam Map<String,Object> map, Model model) {
        model.addAttribute("rs", assetService.getAssetDtCodeList(map));
        return "jsonView";
    }

    //장비사용 목록 조회
    @RequestMapping("/asset/getEqipmnUseList")
    public String getEqipmnUseList(@RequestParam Map<String,Object> map, Model model) {
        model.addAttribute("rs", assetService.getEqipmnUseList(map));
        return "jsonView";
    }

    //장비사용 목록 조회 : 프로젝트
    @RequestMapping("/asset/getEqipmnUseListByPjt")
    public String getEqipmnUseListByPjt(@RequestParam Map<String,Object> map, Model model) {
        model.addAttribute("list", assetService.getEqipmnUseListByPjt(map));
        return "jsonView";
    }

    //장비사용 목록 삭제
    @RequestMapping("/asset/setEquipmenUseDelete")
    public String setEquipmenUseDelete(@RequestParam(value = "eqmnUsePk[]") List<String> eqmnUsePk, Model model){
        model.addAttribute("rs", assetService.setEquipmenUseDelete(eqmnUsePk));
        return "jsonView";
    }

    //장비사용 목록 업데이트
    @RequestMapping("/asset/setEquipmenUseUpdate")
    public String setEquipmenUseUpdate(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("rs", assetService.setEquipmenUseUpdate(params));
        return "jsonView";
    }

    //장비사용 수정 팝업창
    @RequestMapping("/Inside/Pop/equipmentUseUpdatePop.do")
    public String equipmentUseUpdatePop(HttpServletRequest request, Model model, @RequestParam Map<String, Object> params) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        model.addAttribute("pk", params.get("pk"));

        return "popup/inside/asset/equipmentUseUpdatePop";
    }

    //장비사용 등록 수정 창 조회
    @RequestMapping("/asset/getEqipmnUseUpdateList")
    public String getEqipmnUseUpdateList(@RequestParam Map<String,Object> map, Model model) {
        model.addAttribute("rs", assetService.getEqipmnUseUpdateList(map));
        return "jsonView";
    }

    //장비사용 마감
    @RequestMapping("/asset/setEquipmenUseEndStat")
    public String setEquipmenUseEndStat(@RequestParam(value = "eqmnUsePk[]") List<String> eqmnUsePk, Model model){
        model.addAttribute("rs", assetService.setEquipmenUseEndStat(eqmnUsePk));
        //model.addAttribute("rs", assetService.setEquipmenUseEndStatCancel(eqmnUsePk));
        return "jsonView";
    }

    //장비관리 (관리자) 결재창
    @RequestMapping("/Inside/pop/equipAppPop.do")
    public String equipAppPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);
        return "popup/inside/asset/equipAppPop";
    }

    //장비관리 전자결재
    @RequestMapping("/popup/inside/approvalFormPopup/equipApprovalPop.do")
    public String equipApprovalPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("params", params);
        model.addAttribute("loginVO", login);
        Map<String, Object> data = assetService.getCategoryMonthly(params);
        model.addAttribute("data", data);
        List<Map<String, Object>> list = assetService.getEquipApprovalData(params);
        model.addAttribute("list", list);
        return "/popup/inside/asset/approvalFormPopup/equipApprovalPop";
    }

    @RequestMapping("/bookCode/delBookCode")
    public String delBookCode(@RequestParam Map<String, Object> params, Model model){
        try{
            assetService.delBookCode(params);
            model.addAttribute("code", 200);
        } catch (Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    //도서리스트
    @RequestMapping("/Inside/bookList.do")
    public String bookList(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        session.setAttribute("menuNm", request.getRequestURI());
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

    @RequestMapping("/bookCode/setBookCode")
    public String setBookCode(@RequestParam Map<String, Object> params, Model model){
        try{
            assetService.setBookCode(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }
        return "jsonView";
    }

    @RequestMapping("/bookCode/getMdCode")
    public String getMdCode(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("rs", assetService.getMdCode(params));

        return "jsonView";
    }

    @RequestMapping("/bookCode/getCode")
    public String getCode(@RequestParam Map<String, Object> params, Model model){

        model.addAttribute("rs", assetService.getCode(params));

        return "jsonView";
    }

    //도서등록 팝업창
    @RequestMapping("/Inside/Pop/bookRegisPop.do")
    public String bookRegisPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("menuCd", request.getServletPath().split("/")[1]);
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("params", params);
        if(params.containsKey("bkSn")){
            model.addAttribute("img", assetService.getBookInfoOne(params));
        }
        model.addAttribute("loginVO", login);
        return "popup/inside/asset/bookRegisPop";
    }

    @RequestMapping("/inside/setBookImgFile")
    public String setBookImgFile(@RequestParam Map<String, Object> params, MultipartHttpServletRequest request, Model model) throws Exception {
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        LocalDate now = LocalDate.now();
        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyy/MM/dd");
        String fmtNow = now.format(fmt);

        String server_path = SERVER_DIR + params.get("menuCd").toString()+"/" + fmtNow + "/";
        String base_path = BASE_DIR + params.get("menuCd").toString()+"/" + fmtNow + "/";

        MainLib mainLib = new MainLib();
        List<Map<String, Object>> imgFile = new ArrayList<>();

        imgFile = mainLib.multiFileUpload(request.getFiles("imgFile").toArray(new MultipartFile[0]), server_path);

        int imgFileId = userManageService.setThumbnailUpload(imgFile, params, base_path);     //증명사진

        params.put("loginEmpSeq", loginVO.getUniqId());
        params.put("idImg", imgFileId);

        assetService.setBookImg(params);

        return "jsonView";
    }

    @RequestMapping("/inside/Pop/bookCodePop.do")
    public String bookCodePop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("params", params);
        model.addAttribute("loginVO", login);
        return "popup/inside/asset/bookCodePop";
    }



    //도서 리스트 조회
    @RequestMapping("/inside/getBookList")
    public String getBookList(@RequestParam Map<String, Object> params, Model model) {
        List<Map<String, Object>> list = assetService.getBookList(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    //도서저장
    @RequestMapping("/inside/setBookInsert")
    public String setBookInsert(@RequestParam Map<String, Object> params, Model model) {
        try{
            assetService.setBookInsert(params);
            model.addAttribute("code", 200);
            model.addAttribute("params", params);
        } catch (Exception e){
            e.printStackTrace();
        }
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

    //지식재산권 리스트 삭제
    @RequestMapping("/inside/setRprListDelete")
    public String setRprListDelete(@RequestParam(value = "rprPk[]") List<String> rprPk, Model model){
        model.addAttribute("rs", assetService.setRprListDelete(rprPk));
        return "jsonView";
    }

    //지식재산권 리스트 수정 팝업창
    @RequestMapping("/Inside/pop/rprReceiptUpdatePop.do")
    public String rprReceiptUpdatePop(HttpServletRequest request, Model model, @RequestParam Map<String, Object> params) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        params.put("inventionInfoSn", params.get("pk"));

        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        model.addAttribute("pk", params.get("pk"));
        model.addAttribute("data", assetService.getInventionInfo(params));

        return "popup/inside/asset/rprReceiptUpdatePop";
    }

    //지식재산권 리스트 수정 창 조회
    @RequestMapping("/asset/getRprReceiptUpdateList")
    public String getRprReceiptUpdateList(@RequestParam Map<String,Object> map, Model model) {
        model.addAttribute("rs", assetService.getRprReceiptUpdateList(map));
        return "jsonView";
    }

    /** 지식재산권 수정 */
    @RequestMapping("/inside/updRprReceipt")
    public String updRprReceipt(@RequestParam Map<String, Object> params, Model model, MultipartHttpServletRequest request) {
        assetService.updRprReceipt(params, request, SERVER_DIR, BASE_DIR);
        model.addAttribute("inventionInfoSn", params.get("inventionInfoSn"));
        return "jsonView";
    }

    /** 지식재산권 일괄변경 */
    @RequestMapping("/inside/updRprAllChange")
    public String updRprAllChange(@RequestParam Map<String, Object> params, Model model) {
        assetService.updRprAllChange(params);
        return "jsonView";
    }

    /** 장비 전자결재 데이터 */
    @RequestMapping("/inside/getEquipApprovalData")
    public String getEquipApprovalData(@RequestParam Map<String, Object> params, Model model) {
        List<Map<String, Object>> List = assetService.getEquipApprovalData(params);
        model.addAttribute("list", List);
        return "jsonView";
    }

    /** 장비 전자결재 중복조회 */
    @RequestMapping("/inside/getEquipApprovalInfo")
    public String getEquipApprovalInfo(@RequestParam Map<String, Object> params, Model model) {
        List<Map<String, Object>> list = assetService.getEquipApprovalInfo(params);
        model.addAttribute("flag", list.size() == 0 ? "true" : "false");
        model.addAttribute("list", list);
        return "jsonView";
    }

    /** 장비 전자결재 저장 */
    @RequestMapping("/inside/setEquipApprovalInfo")
    public String setEquipApprovalInfo(@RequestParam Map<String, Object> params, Model model) {
        assetService.setEquipApprovalInfo(params);
        model.addAttribute("data", params);
        return "jsonView";
    }

    @RequestMapping("/inside/getApprovalData")
    public String getApprovalData(@RequestParam Map<String, Object> params, Model model){

        model.addAttribute("rs", assetService.getApprovalData(params));

        return "jsonView";
    }

    /** 장비 전자결재 결재 상태값에 따른 UPDATE 메서드 */
    @RequestMapping(value = "/inside/equipReqApp")
    public String equipReqApp(@RequestParam Map<String, Object> bodyMap, Model model) {
        System.out.println("bodyMap");
        System.out.println(bodyMap);
        String resultCode = "SUCCESS";
        String resultMessage = "성공하였습니다.";
        try{
            assetService.updateEquipDocState(bodyMap);
        }catch(Exception e){
            logger.error(e.getMessage());
            resultCode = "FAIL";
            resultMessage = "연계 정보 갱신 오류 발생("+e.getMessage()+")";
        }
        model.addAttribute("resultCode", resultCode);
        model.addAttribute("resultMessage", resultMessage);
        return "jsonView";
    }

    /** 장비 증감률 통계 팝업*/
    @RequestMapping("/Inside/pop/equipStatPop.do")
    public String equipStatPop(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "popup/inside/asset/equipStatPop";
    }

    /** 장비 증감률 통계 데이터*/
    @RequestMapping("/inside/getEquipStat")
    public String getEquipStat(@RequestParam Map<String, Object> params, Model model) {
        Map<String, Object> data = assetService.getEquipStat(params);
        model.addAttribute("type", data.get("type"));
        model.addAttribute("total", data.get("total"));
        return "jsonView";
    }

    /** 장비 증감률 통계 데이터*/
    @RequestMapping("/inside/getEquipStatRear")
    public String getEquipStatRear(@RequestParam Map<String, Object> params, Model model) {
        List<Map<String, Object>> list = assetService.getEquipStatRear(params);
        model.addAttribute("list", list);;
        return "jsonView";
    }


    @RequestMapping("/bookRegisPop/getData")
    public String getData(@RequestParam Map<String, Object> params, Model model){

        model.addAttribute("rs", assetService.getData(params));
        return "jsonView";
    }

    @RequestMapping("/inside/setBookDelete")
    public String setBookDelete(@RequestParam Map<String, Object> params, Model model){
        assetService.setBookDelete(params);
        model.addAttribute("code", 200);
        return "jsonView";
    }

    /** 장비 증감률 통계 */


    /** 직무발명신고서 조회 팝업*/
    @RequestMapping("/Inside/pop/inventionPop.do")
    public String inventionPop(HttpServletRequest request, Model model, @RequestParam Map<String, Object> params) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        Map<String,Object> map = new HashMap<>();
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        model.addAttribute("inventionInfoSn", params.get("inventionInfoSn"));
        model.addAttribute("resultMap", assetService.getInventionInfo(params));

        return "popup/inside/asset/inventionPop";
    }

    /** 포상금지급 신청서 조회 팝업*/
    @RequestMapping("/Inside/pop/rprPop.do")
    public String rprPop(HttpServletRequest request, Model model,  @RequestParam Map<String, Object> params) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        model.addAttribute("inventionInfoSn", params.get("inventionInfoSn"));
        model.addAttribute("resultMap", assetService.getInventionInfo(params));

        return "popup/inside/asset/rprPop";
    }

    @RequestMapping("/asset/qrCodeMakeView.do")
    public String qrCodeMakeView(HttpServletRequest request, Model model){

        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", login);

        return "inside/asset/qrCodeMakeView";
    }

    @RequestMapping("/asset/qrCodeSetView.do")
    public String qrCodeSetView(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", loginVO);

        return "popup/inside/asset/qrCodeSetView";
    }

    @RequestMapping("/inside/getClassCtgAList")
    public String getClassCtgAList(@RequestParam Map<String, Object> params, Model model){

        model.addAttribute("rs", assetService.getClassCtgAList(params));

        return "jsonView";
    }

    @RequestMapping("/inside/getClassCtgBList")
    public String getClassCtgBList(@RequestParam Map<String, Object> params, Model model){

        model.addAttribute("rs", assetService.getClassCtgBList(params));

        return "jsonView";
    }

    @RequestMapping("/asset/cntQrCodeGroup")
    public String cntQrCodeGroup(@RequestParam Map<String, Object> params, Model model){

        try{
            model.addAttribute("rs", assetService.cntQrCodeGroup(params));
        } catch (Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/asset/qrCodeSet")
    public String qrCodeSet(@RequestParam Map<String, Object> params, Model model){

        try {
            assetService.insQrCodeSet(params);

            String savePath = "D:\\HJO\\5.프로젝트\\4.캠틱\\4.APP\\QR코드\\2023";
//            String savePath = "/upload/qr/2023";
            File file = new File(savePath);
            String fileName = "";

            if(!file.exists()){
                file.mkdirs();
            }

            QRCodeWriter qrCodeWriter = new QRCodeWriter();
            String data = (String) params.get("data");
            data = new String(data.getBytes(StandardCharsets.UTF_8), "ISO-8859-1");
            BitMatrix bitMatrix = qrCodeWriter.encode(data, BarcodeFormat.QR_CODE, 100, 100);
            BufferedImage bufferedImage = MatrixToImageWriter.toBufferedImage(bitMatrix);

            fileName = params.get("qrCd").toString();
            File temp = new File(savePath + "/" + fileName + ".png");

            Map<String, Object> fileInfo = new HashMap<>();

            fileInfo.put("fileCd", "qrCode");
            fileInfo.put("fileUUID", fileName);
            fileInfo.put("fileSize", 426);
            fileInfo.put("fileOrgName", fileName);
            fileInfo.put("filePath", savePath);
            fileInfo.put("fileExt", "png");
            fileInfo.put("empSeq", params.get("empSeq"));


            ImageIO.write(bufferedImage, "png", temp);

            assetService.insFileInfo(fileInfo);

            params.put("fileSn", fileInfo.get("file_no"));

            assetService.updQrFileSn(params);

            model.addAttribute("code", 200);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/inside/getastprint")
    public String getastprint(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request) {

        Map<String, Object> map = assetService.getastprint(params);

        model.addAttribute("astMap", assetService.getastData(params));
        model.addAttribute("map", map);

        return "jsonView";
    }

    @RequestMapping("/asset/setBarcodePrintA")
    public String setBarcodePrintA(@RequestParam Map<String, Object> params, Model model) throws IOException {

        String START_CMD = "^XA";   // 시작명령어
        String END_CMD = "^XZ";     // 종료명령어
        String POS_CMD = "^FO";     // 텍스트 위치 지정
        String FONT_CMD = "^Ax";    // 글꼴 설정
        String KOR_DEF = "^SEE:UHANGUL.DAT^FS^CW1,E:KFONT3.FNT^FS^CW1,E:V53_16_6Z.ZPL^CI26^FS"; // 한글 폰트 설정
        String KOR_FNT = "^A1";     // 한글 폰트 지정
        String BAR_ATTR = "^BY";    // 바코드 속성 설정 (너비, 비율, 높이)
        String BAR_KIND_CMD = "^BC";// 바코드 종류 설정 (Code 128)
        String DATA_START = "^FD";  // 데이터 시작
        String DATA_END = "^FS";    // 데이터 종료

        if(params.get("target").equals("asset")){
            String[] astInfoSnAr = params.get("astSnArr").toString().split(",");

            for(int i=0; i<astInfoSnAr.length; i++){
                params.put("astInfoSn", astInfoSnAr[i]);
                Map<String, Object> map = assetService.getAssetInfo(params);

                try (Socket socket = new Socket("218.158.231.248",9100);
                     OutputStream out = socket.getOutputStream()) {

                    // Create a simple zebra pattern string (ZPL format for Zebra printers)
                    String txBuff = START_CMD               // start cmd
                            + POS_CMD + "290,400"            // position cmd
                            + BAR_ATTR + "2,2,10"           // barcode attribute cmd
                            + BAR_KIND_CMD + "N,80,Y,N,Y"   // barcode kind cmd
                            + DATA_START + map.get("AST_NO").toString() + DATA_END;  // barcode data


                    // 자산번호 출력 부분
                    txBuff += POS_CMD + "290,200"               // position cmd
                            + FONT_CMD + "E,N,20,20"           // alpanumeric size cmd
                            + DATA_START + map.get("AST_NO").toString() + DATA_END;  // barcode data


                    // 자산명 출력 부분
                    txBuff += KOR_DEF                       // 한글 사용 + FONT
                            + POS_CMD + "290,273"
                            + KOR_FNT + "N,40,40"          // 한글 FONT
                            + DATA_START + map.get("AST_NAME").toString() + DATA_END;  // barcode data


                    // 취득일 출력 부분
                    txBuff += POS_CMD + "290,349"            // position cmd
                            + FONT_CMD + "E,N,20,20"        // alpanumeric size cmd
                            + DATA_START + map.get("PURC_DATE") + DATA_END;  // barcode data

                    // 위치 출력 부분
                    txBuff += POS_CMD + "290,420"            // position cmd
                            + FONT_CMD + "E,N,20,20"        // alpanumeric size cmd
                            + DATA_START + "" + DATA_END  // barcode data
                            + END_CMD;

                    byte[] txBytes = txBuff.getBytes(Charset.forName("EUC-KR"));

                    out.write(txBytes, 0, txBytes.length);

                    out.flush();
                    System.out.println("Print job sent successfully.");

                    model.addAttribute("code", 200);
                } catch (IOException e) {
                    e.printStackTrace();
                    System.err.println("Failed to send print job: " + e.getMessage());
                }
            }
        } else if(params.get("target").equals("pda")){
            String[] astPdaInfoSnAr = params.get("astPdaSnArr").toString().split(",");

            for(int i=0; i<astPdaInfoSnAr.length; i++){
                params.put("astPdaInfoSn", astPdaInfoSnAr[i]);
                Map<String, Object> map = assetService.getAssetPdaInfo(params);

                try (Socket socket = new Socket("218.158.231.248",9100);
                     OutputStream out = socket.getOutputStream()) {

                    // Create a simple zebra pattern string (ZPL format for Zebra printers)
                    String txBuff = START_CMD               // start cmd
                            + POS_CMD + "290,400"            // position cmd
                            + BAR_ATTR + "2,2,10"           // barcode attribute cmd
                            + BAR_KIND_CMD + "N,80,Y,N,Y"   // barcode kind cmd
                            + DATA_START + map.get("AST_NO").toString() + DATA_END;  // barcode data


                    // 자산번호 출력 부분
                    txBuff += POS_CMD + "290,200"               // position cmd
                            + FONT_CMD + "E,N,20,20"           // alpanumeric size cmd
                            + DATA_START + map.get("AST_NO").toString() + DATA_END;  // barcode data


                    // 자산명 출력 부분
                    txBuff += KOR_DEF                       // 한글 사용 + FONT
                            + POS_CMD + "290,273"
                            + KOR_FNT + "N,40,40"          // 한글 FONT
                            + DATA_START + map.get("AST_NAME").toString() + DATA_END;  // barcode data


                    // 취득일 출력 부분
                    txBuff += POS_CMD + "290,349"            // position cmd
                            + FONT_CMD + "E,N,20,20"        // alpanumeric size cmd
                            + DATA_START + map.get("PURC_DATE") + DATA_END;  // barcode data

                    // 위치 출력 부분
                    txBuff += POS_CMD + "290,420"            // position cmd
                            + FONT_CMD + "E,N,20,20"        // alpanumeric size cmd
                            + DATA_START + "" + DATA_END  // barcode data
                            + END_CMD;

                    byte[] txBytes = txBuff.getBytes(Charset.forName("EUC-KR"));

                    out.write(txBytes, 0, txBytes.length);

                    out.flush();
                    System.out.println("Print job sent successfully.");

                    model.addAttribute("code", 200);
                } catch (IOException e) {
                    e.printStackTrace();
                    System.err.println("Failed to send print job: " + e.getMessage());
                }
            }
        }




        return "jsonView";
    }


    @RequestMapping("/asset/setBarcodePrintB")
    public String setBarcodePrintB(@RequestParam Map<String, Object> params, Model model) throws IOException {

        if(params.get("target").equals("pda")) {
            String[] astPdaInfoSnAr = params.get("astPdaSnArr").toString().split(",");

            for(int i=0; i<astPdaInfoSnAr.length; i++) {
                params.put("astPdaInfoSn", astPdaInfoSnAr[i]);
                Map<String, Object> map = assetService.getAssetPdaInfo(params);

                try (Socket socket = new Socket("218.158.231.248",9100);
                     OutputStream out = socket.getOutputStream()) {

                    String cmd1 = "^XA^FO175,70^AxC,N,13,13^FD" + map.get("AST_NO").toString() + "^FS";
                    String cmd3 = "^FO50,115^BY2,2,10^BCN,70,Y,N,Y^FD" + map.get("AST_NO").toString() + "^FS^XZ";

                    byte[] txBytes = (cmd1 + cmd3).getBytes(Charset.forName("EUC-KR"));

                    out.write(txBytes, 0, txBytes.length);

                    out.flush();
                    System.out.println("Print job sent successfully.");

                    model.addAttribute("code", 200);
                } catch (IOException e) {
                    e.printStackTrace();
                    System.err.println("Failed to send print job: " + e.getMessage());
                }
            }
        } else if(params.get("target").equals("asset")) {
            String[] astInfoSnAr = params.get("astSnArr").toString().split(",");

            for(int i=0; i<astInfoSnAr.length; i++) {
                params.put("astInfoSn", astInfoSnAr[i]);
                Map<String, Object> map = assetService.getAssetInfo(params);

                try (Socket socket = new Socket("218.158.231.248",9100);
                     OutputStream out = socket.getOutputStream()) {

                    String cmd1 = "^XA^FO175,70^AxC,N,13,13^FD" + map.get("AST_NO").toString() + "^FS";
                    String cmd3 = "^FO50,115^BY2,2,10^BCN,70,Y,N,Y^FD" + map.get("AST_NO").toString() + "^FS^XZ";

                    byte[] txBytes = (cmd1 + cmd3).getBytes(Charset.forName("EUC-KR"));

                    out.write(txBytes, 0, txBytes.length);

                    out.flush();
                    System.out.println("Print job sent successfully.");

                    model.addAttribute("code", 200);
                } catch (IOException e) {
                    e.printStackTrace();
                    System.err.println("Failed to send print job: " + e.getMessage());
                }
            }
        }

        return "jsonView";
    }


}
