package egovframework.com.devjitsu.inside.asset.controller;

import egovframework.com.devjitsu.inside.asset.service.AssetService;
import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import egovframework.com.devjitsu.gw.user.service.UserService;
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

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
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
    public String setAssetInfo(@RequestParam Map<String,Object> params, MultipartHttpServletRequest request) {
        params.put("regEmpIp", request.getRemoteAddr());

        assetService.setAssetInfo(params, request, SERVER_DIR, BASE_DIR);
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
     * @param model
     * @return
     */
    @RequestMapping("/asset/setAssetInspectionUpload.do")
    public String setAssetInspectionUpload(@RequestParam Map<String,Object> params, HttpServletRequest request) {
        params.put("regEmpIp", request.getRemoteAddr());
        assetService.setAssetInspectionUpload(params);
        return "jsonView";
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

    //도서등록 팝업창
    @RequestMapping("/Inside/Pop/bookRegisPop.do")
    public String bookRegisPop(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "popup/inside/asset/bookRegisPop";
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

    //장비관리 (관리자) 결재창
    @RequestMapping("/Inside/Pop/equipApprovalPop.do")
    public String equipApprovalPop(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "popup/inside/asset/equipApprovalPop";
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
    public String setBookInsert(@RequestParam Map<String, Object> params) {
        assetService.setBookInsert(params);
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
