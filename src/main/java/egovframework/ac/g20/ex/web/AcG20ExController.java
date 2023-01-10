package egovframework.ac.g20.ex.web;

import egovframework.ac.cmm.service.AcCommonService;
import egovframework.ac.cmm.vo.ConnectionVO;
import egovframework.ac.g20.code.sercive.AcG20CodeService;
import egovframework.ac.g20.ex.service.AcG20ExService;
import egovframework.admin.form.service.FormManageService;
import egovframework.devjitsu.common.dto.LoginVO;
import egovframework.devjitsu.common.service.CommonService;
import egovframework.devjitsu.common.utiles.CommonCodeUtil;
import egovframework.devjitsu.common.utiles.EgovUserDetailsHelper;
import egovframework.devjitsu.intra.purc.service.PurcService;
import egovframework.devjitsu.intra.purc.vo.Abdocu_B;
import egovframework.devjitsu.intra.purc.vo.Abdocu_H;
import egovframework.devjitsu.intra.purc.vo.Abdocu_T;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class AcG20ExController {

    @Autowired
    private AcG20ExService acG20ExService;
    @Autowired
    private CommonService commonService;
    @Autowired
    private PurcService purcService;
    @Autowired
    private AcCommonService acCommonService;
    @Autowired
    private AcG20CodeService acG20CodeService;
    @Autowired
    private FormManageService formManageService;

    private ConnectionVO conVo = new ConnectionVO( );

    @RequestMapping( value = "/Ac/G20/Ex/selectFormInfo.do")
    public String selectFormInfo (@RequestParam Map<String, Object> map, Model model) throws Exception {
        try {
            model.addAttribute("result", acG20ExService.selectFormInfo(map));
        }

        catch ( Exception e ) {
            model.addAttribute("result", "Failed");
            e.printStackTrace();
        }
        return "jsonView";
    }

    @RequestMapping("/resAlphaG20/findOnnaraPopup")
    public String findOnnaraPopup ( @RequestParam HashMap<String, Object> requestMap, HttpServletRequest request, Model model ) throws Exception {
        LoginVO loginVO = EgovUserDetailsHelper.getAuthenticatedUser();

        model.addAttribute("loginVO", loginVO);

        return "popup/purc/popup/ONNARApopup";
    }

    @RequestMapping ( value = "/Ac/G20/Ex/purcReqList.do", method = RequestMethod.GET )
    public String purcReqList (@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) throws Exception {
        HttpSession session = request.getSession();
        List<Map<String, Object>> allDept = commonService.getCtDeptLevelNot0(params);

        params.put( "requestUrl", request.getRequestURI( ) );

        model.addAttribute("loginVO", (LoginVO) session.getAttribute("LoginVO"));
        model.addAttribute("mng", "N");
        model.addAttribute("allDept", allDept);
        model.addAttribute( "params", params);

        return "purc1/purcReqList";
    }
    @RequestMapping(value = "/Ac/G20/Ex/purcReqListData.do", method = RequestMethod.POST)
    public String purcReqListData(@RequestParam Map<String, Object> params, Model model) {
        model.addAttribute("rs", purcService.getPurcReqList(params)); //리스트

        return "jsonView";
    }

    @RequestMapping ( value = "/Ac/G20/Ex/purcBiddingMngPop.do", method = RequestMethod.GET )
    public String purcBiddingMng (@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) throws Exception {
        HttpSession session = request.getSession();
        List<Map<String, Object>> allDept = commonService.getCtDeptLevelNot0(params);

        params.put( "requestUrl", request.getRequestURI( ) );

        model.addAttribute("allDept", allDept);
        model.addAttribute("loginVO", (LoginVO) session.getAttribute("LoginVO"));
        model.addAttribute( "params", params);

        return "popup/purc/popup/purcBiddingMngPop";
    }

    /**
     * 기술협상
     * purcBiddingEvaluationPop parkjm 2020. 7. 20.
     *
     * @param requestMap
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping ( value = "/Ac/G20/Ex/purcBiddingNegoRegPop.do", method = RequestMethod.GET )
    public String purcBiddingNegoRegPop (@RequestParam HashMap<String, Object> requestMap, HttpServletRequest request, Model model ) throws Exception {
        LoginVO loginVO = EgovUserDetailsHelper.getAuthenticatedUser();

        requestMap.put( "requestUrl", request.getRequestURI( ) );
        requestMap.put( "mode", "0" );
        model.addAttribute( "loginVO", loginVO);
        model.addAttribute( "params", requestMap );

        return "popup/purc/popup/purcBiddingNegoRegPop";
    }

    /**
     * @param resDocSeq or consDocSeq
     * @return
     * @throws Exception
     * 알파문서 headDocSeq로 온나라 정보 읽어오기
     */
    @RequestMapping("/resAlphaG20/getDocMappingOnnara")
    public String getDocMappingOnnara ( @RequestParam HashMap<String, Object> requestMap, HttpServletRequest request, Model model ) throws Exception {

        List<Map<String, Object>> resultDocList = new ArrayList<Map<String,Object>>();
        List<Map<String, Object>> docList = null;

        try {

            docList = purcService.getDocMappingOnnaraDocId(requestMap);

            for (Map<String, Object> map : docList) {

                map.put("DOCID", map.get("o_docid"));

                /** TODO. 온나라 연동 필요*/
                Map<String, Object> docInfo = new HashMap<>();
                        //resAlphaG20Service.getOnnaraDocInfo(map);
                List<Map<String, Object>> attachList = new ArrayList<>();
                        //resAlphaG20Service.getOnnaraDocAllFiles(map);

                if (attachList.size() > 0) {
                    docInfo.put("attachVo", attachList);
                }

                resultDocList.add(docInfo);
            }

        } catch (Exception e) {

        }

        model.addAttribute("data", docList);
        model.addAttribute("resultDocList", resultDocList);

        return "jsonView";
    }

    /**
     *
     * checkPurcBiddingApproval parkjm 2020. 7. 9.
     *
     * @param map
     * @return
     */
    @RequestMapping ( value = "/Ac/G20/Ex/checkPurcBiddingApproval.do", method = RequestMethod.POST )
    public String checkPurcBiddingApproval (@RequestParam Map<String, Object> map, Model model) {

        try {
            model.addAttribute( "docCnt", acG20ExService.checkPurcBiddingApproval(map) );
            model.addAttribute( "result", "Success" );
        }
        catch ( Exception e ) {
            e.printStackTrace( );
            model.addAttribute( "result", "Failed" );
        }

        return "jsonView";
    }

    /**
     * 기술협상
     * getPurcReq parkjm 2020. 7. 20.
     *
     * @param paramMap
     * @return
     * @throws Exception
     */
    @RequestMapping ( value = "/Ac/G20/Ex/selectPurcReqBiddingNego.do", method = RequestMethod.POST )
    public String selectPurcReqBiddingNego (@RequestParam HashMap<String, Object> paramMap, Model model) throws Exception {
        Map<String, Object> map = null;
        try {
            map = acG20ExService.selectPurcReqBiddingNego(paramMap);
            model.addAttribute("attachFileList", map.get("attachFileList"));
        }
        catch ( Exception e ) {
            e.printStackTrace( );
        }
        return "jsonView";
    }

    @RequestMapping ( value = "/Ac/G20/Ex/getPurcReq.do", method = RequestMethod.POST )
    public String getPurcReq (@RequestParam Map<String, Object> params, Model model) throws Exception {
        Map<String, Object> map = purcService.getPurcReq(params);
        model.addAttribute("purcReqInfo", map.get("purcReqInfo"));
        model.addAttribute("purcReqHList", map.get("purcReqHList"));
        model.addAttribute("purcReqAttachFileList", map.get("purcReqAttachFileList"));
        model.addAttribute("purcReqAttachFileList2", map.get("purcReqAttachFileList2"));

        return "jsonView";
    }
    @RequestMapping(value = "/Ac/G20/Ex/purcBiddingData.do", method = RequestMethod.POST)
    public String purcBiddingData(@RequestParam Map<String, Object> params, Model model) throws Exception{
        model.addAttribute("rs", purcService.getPurcBiddingData(params)); //리스트
        return "jsonView";
    }
    @RequestMapping ( value = "/Ac/G20/Ex/purcReqListMng.do", method = RequestMethod.GET )
    public String purcReqListMng (@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) throws Exception {
        HttpSession session = request.getSession();
        List<Map<String, Object>> allDept = commonService.getCtDeptLevelNot0(params);

        params.put( "requestUrl", request.getRequestURI( ) );

        model.addAttribute("mng", "Y");
        model.addAttribute("allDept", allDept);
        model.addAttribute("loginVO", (LoginVO) session.getAttribute("LoginVO"));
        model.addAttribute( "params", params);

        return "purc1/purcReqListMng";
    }
    @RequestMapping("/popup/purc/popup/purcReqReturnPop.do")
    public String purcReqReturnPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();

        model.addAttribute("loginVO", (LoginVO) session.getAttribute("LoginVO"));
        model.addAttribute( "params", params);

        return "popup/purc/popup/purcReqReturnPop";
    }

    @RequestMapping ( value = "/Ac/G20/Ex/updatePurcReqState.do", method = RequestMethod.POST )
    public String updatePurcReqState (@RequestParam Map<String, Object> params, HttpServletRequest request) throws Exception {
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        params.put("empName", loginVO.getName());
        params.put("empSeq", loginVO.getUniqId());
        params.put("C_DIUSERKEY", loginVO.getUniqId());
        params.put("OrgnztId", loginVO.getOrgnztId());
        params.put("deptSeq", loginVO.getOrgnztId());
        params.put("langCode", loginVO.getLangCode());

        purcService.setPurcReqState(params);
        return "jsonView";
    }

    @RequestMapping ( value = "/Ac/G20/Ex/purcReqView.do", method = RequestMethod.GET )
    public String purcReqView (@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) throws Exception {
        params.put( "requestUrl", request.getRequestURI( ) );
        params.put( "mode", "0" );

        model.addAttribute( "params", params );

        return "popup/purc/popup/purcReqViewPop";
    }

    /**
     * 구매계약보고
     * purcContRepForm parkjm 2018. 4. 2.
     *
     * @return
     * @throws Exception
     */
    @RequestMapping ( value = "/Ac/G20/Ex/purcContRepForm.do", method = RequestMethod.GET )
    public String purcContRepForm (@RequestParam HashMap<String, Object> requestMap, HttpServletRequest request, Model model ) throws Exception {
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        requestMap.put( "requestUrl", request.getRequestURI( ) );
        requestMap.put( "mode", "0" );

        model.addAttribute( "params", requestMap );
        model.addAttribute( "loginVO", loginVO );

        return "popup/purc/popup/purcContRepFormPop";
    }

    /**
     *
     * checkPurcContComplete parkjm 2018. 4. 5.
     *
     * @param map
     * @return
     */
    @RequestMapping ( value = "/Ac/G20/Ex/checkPurcContComplete.do", method = RequestMethod.POST )
    public String checkPurcContComplete (@RequestParam Map<String, Object> map, Model model) {
        try {
            model.addAttribute("checkCnt", acG20ExService.checkPurcContComplete( map ));
        }
        catch ( Exception e ) {
            e.printStackTrace( );
        }
        return "jsonView";
    }

    /**
     * 양식키 조회
     * getTemplateKey parkjm 2018. 5. 8.
     *
     * @param paramMap
     * @return
     */
    @RequestMapping ( value = "/Ac/G20/Ex/getTemplateKey.do", method = RequestMethod.POST )
    public String getTemplateKey (@RequestParam HashMap<String, Object> paramMap, Model model) {
        String result = null;
        try {
            result = String.valueOf(acG20ExService.getTemplateKey(paramMap));
        }
        catch ( Exception e ) {
            e.printStackTrace( );
            result = "Failed";
        }
        model.addAttribute( "result", result );
        return "jsonView";
    }

    @RequestMapping ( "/Ac/G20/Ex/AcExDocInfo.do" )
    public String AcExDocInfo (@ModelAttribute ( "abdocu" ) Abdocu_H abdocu, @RequestParam Map<String, Object> params, HttpServletRequest request, Model model) throws Exception {
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        String template_key = "";/* 양식 키 */
        if ( params.containsKey( "template_key" ) ) {
            template_key = (String) params.get( "template_key" );
        }

        Abdocu_H resultAbdocu = null;
        Map<String, String> docu = new HashMap<String, String>( );
        HashMap<String, String> param = new HashMap<String, String>( );
        conVo = GetConnection(loginVO);
        // ERP 설정 파일
        HashMap<String, String> paraMap = new HashMap<String, String>( );
        paraMap.put( "CO_CD", getCO_CD(loginVO) );
        paraMap.put( "EMP_CD", getEMP_CD(loginVO) );
        paraMap.put( "LANGKIND", getLANGKIND(loginVO) );
        if ( abdocu.getAbdocu_no( ) != null ) { /* 조회모드 */
            resultAbdocu = getAbdocuH( abdocu );
            if ( resultAbdocu == null || resultAbdocu.getAbdocu_no( ) == null || resultAbdocu.getAbdocu_no( ).equals( "0" ) ) {
                model.addAttribute( "resultValue", "empty" ); // 데이저 조회
            }
            param.put( "CO_CD", resultAbdocu.getErp_co_cd( ) );
            param.put( "EMP_CD", resultAbdocu.getErp_emp_cd( ) );

            /*
             * G20 시스템 환경설정 데이터 가져오기
             */
            /** TODO. 반영시 주석 해제(mssql) */
            List<HashMap<String, String>> erpConfig = new ArrayList<>();//getErpConfigList( conVo, paraMap );
            model.addAttribute( "erpConfig", erpConfig );

        }
        model.addAttribute( "gwConfig", getGwConfigList( paraMap ) );
        //품의/결의종류를 가져온다.

        Map<String, Object> formInfo = GetFormInfo( template_key );
        if ( formInfo == null ) {
            model.addAttribute( "resultValue", "notTempKey" );
            return "jsonView";
        }
        String CHILDCODE = (String) formInfo.get( "CHILDCODE" );
        String CHILDCODEDETAIL = (String) formInfo.get( "CHILDCODEDETAIL" );
        String C_TINAME = (String) formInfo.get( "C_TINAME" );
        docu.put( "name", CommonCodeUtil.getChildCodeName( CHILDCODE, CHILDCODEDETAIL ) );
        docu.put( "code", CHILDCODEDETAIL );
        model.addAttribute( "C_TINAME", C_TINAME );
        model.addAttribute( "abdocu", resultAbdocu );

        /** TODO. 반영시 주석 해제(mssql) */
        Map<String, String> taxPercent = new HashMap<>(); //getErpTaxConifg( conVo, paraMap );

        model.addAttribute( "taxRate", JSONObject.fromObject( taxPercent ) );
        model.addAttribute( "groupSeq", this.getGroupSeq(loginVO) );
        model.addAttribute( "returnValue", "" );
        return "jsonView";
    }

    /**
     *
     * purcContRepApprovalComplete parkjm 2018. 4. 5.
     *
     * @param map
     * @return
     */
    @RequestMapping ( value = "/Ac/G20/Ex/purcContRepApprovalComplete.do", method = RequestMethod.POST )
    public String purcContRepApprovalComplete (@RequestParam Map<String, Object> map, Model model) {
        try {
            model.addAttribute("result", acG20ExService.purcContRepApprovalComplete( map ));
        }
        catch ( Exception e ) {
            e.printStackTrace( );
        }
        return "jsonView";
    }

    /**
     * 입찰
     * selectPurcReqBiddingEval parkjm 2020. 7. 20.
     *
     * @param paramMap
     * @return
     * @throws Exception
     */
    @RequestMapping ( value = "/Ac/G20/Ex/selectPurcReqBiddingEval.do", method = RequestMethod.POST )
    public String selectPurcReqBiddingEval (@RequestParam HashMap<String, Object> paramMap, Model model) throws Exception {
        try {
            model.addAttribute("result", acG20ExService.selectPurcReqBiddingEval(paramMap));
        }
        catch ( Exception e ) {
            e.printStackTrace( );
        }
        return "jsonView";
    }

    /**
     * 결의서 예산 조회 getPurcReqB
     * getPurcReqB parkjm 2018. 3. 20.
     *
     * @param abdocu_H
     * @return
     * @throws Exception
     */
    @RequestMapping ( value = "/Ac/G20/Ex/getPurcReqB.do", method = RequestMethod.POST )
    public String getPurcReqB (@ModelAttribute ( "abdocu" ) Abdocu_H abdocu_H, Model model ) throws Exception {
        List<Abdocu_B> selectList = null;
        try {
            selectList = acG20ExService.getPurcReqB( abdocu_H );
        }
        catch ( Exception e ) {
            e.printStackTrace( );
        }
        model.addAttribute( "selectList", selectList );
        return "jsonView";
    }

    /**
     * 결의서 채주정보 가져오기 getPurcReqT
     * getPurcReqT parkjm 2018. 3. 20.
     *
     * @param abdocu_B
     * @return
     */
    @RequestMapping ( value = "/Ac/G20/Ex/getPurcReqT.do", method = RequestMethod.POST )
    public String getPurcReqT (@ModelAttribute ( "abdocu_B" ) Abdocu_B abdocu_B, Model model) {
        List<Abdocu_T> selectList = null;
        try {
            selectList = acG20ExService.getPurcReqT( abdocu_B );
        }
        catch ( Exception e ) {
            e.printStackTrace( );
        }
        model.addAttribute( "selectList", selectList );
        return "jsonView";
    }

    /**
     * Erp 예산정보 가져오기
     * getErpBudgetInfo doban7 2016. 9. 7.
     *
     * @param paraMap
     * @return
     * @throws Exception
     */
    @RequestMapping ( value = "/Ac/G20/Ex/getBudgetInfo.do", method = RequestMethod.POST )
    public String getBudgetInfo (@RequestParam Map<String, String> paraMap, HttpServletRequest request, Model model) throws Exception {
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        conVo = GetConnection(loginVO);
        if ( paraMap.get( "CO_CD" ) == null || paraMap.get( "CO_CD" ).equals( "" ) ) {
            paraMap.put( "CO_CD", getCO_CD(loginVO) );
        }
        paraMap.put( "LANGKIND", getLANGKIND(loginVO) );
        HashMap<String, String> result = new HashMap<String, String>( );
        try {
            /** TODO. 반영시 주석 해제(mssql) */
            result = new HashMap<>();
            // acG20ExService.getBudgetInfo( conVo, paraMap );
        }
        catch ( Exception e ) {
            e.printStackTrace( );
        }
        model.addAttribute( "result", result );
        return "jsonView";
    }

    @RequestMapping ( value = "/Ac/G20/Ex/getDeptList.do", method = RequestMethod.POST )
    public String getDeptList (@RequestParam HashMap<String, Object> requestMap, HttpServletRequest request, Model model ) throws Exception {
        List<Map<String, Object>> allDept = commonService.getCtDeptLevelNot0(requestMap);
        model.addAttribute("allDept", allDept);
        return "jsonVoew";
    }

    /**
     * 구매검수 상태 체크
     * checkInspComplete parkjm 2018. 4. 24.
     *
     * @param requestMap
     * @return
     * @throws Exception
     */
    @RequestMapping ( value = "/Ac/G20/Ex/checkInspComplete.do")
    public String checkInspComplete(@RequestParam HashMap<String, Object> requestMap, Model model) throws Exception {
        String result = "Success";
        try {
            Map<String, Object>	 resultMap = acG20ExService.checkInspComplete(requestMap);
            model.addAttribute("contStep", resultMap.get("contStep"));
            model.addAttribute("contInspList", resultMap.get("contInspList"));
        }
        catch ( Exception e ) {
            result = "Failed";
            e.printStackTrace( );
        }
        model.addAttribute( "result", result );
        return "jsonView";
    }

    /**
     * 계약정보 생성
     * makeContInfo parkjm 2018. 4. 3.
     *
     * @param paraMap
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/Ac/G20/Ex/makeContInfo.do", method = RequestMethod.POST)
    public String makeContInfo(@RequestParam Map<String, String> paraMap, HttpServletRequest request, Model model) throws Exception{
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        paraMap.put("empSeq", loginVO.getUniqId());
        paraMap.put("empIp", loginVO.getIp());

        String result = "Failed";
        String purcContId = "";

        try {
            purcContId = acG20ExService.makeContInfo(paraMap);
            result = "Success";
        } catch (Exception e) {
            e.printStackTrace();
            result = "Failed";
        }

        model.addAttribute("result", result);
        model.addAttribute("purcContId", purcContId);

        return "jsonView";
    }

    @RequestMapping ( value = "/Ac/G20/Ex/purcContList.do", method = RequestMethod.GET )
    public String purcContList (@RequestParam HashMap<String, Object> requestMap, HttpServletRequest request, Model model) throws Exception {
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        requestMap.put( "requestUrl", request.getRequestURI( ) );
        List<Map<String, Object>> allDept = commonService.getCtDeptLevelNot0(requestMap);

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("allDept", allDept);
        model.addAttribute( "params", requestMap );
        return "purc1/purcContList";
    }

    /**
     * getPurcCont 조회 (G20_Abdocu_H)
     * getPurcReq parkjm 2018. 4. 3.
     *
     * @param paramMap
     * @return
     * @throws Exception
     */
    @RequestMapping ( value = "/Ac/G20/Ex/getPurcCont.do", method = RequestMethod.POST )
    public String getPurcCont (@RequestParam HashMap<String, Object> paramMap, Model model) throws Exception {
        Map<String, Object> map = new HashMap<>();
        map = acG20ExService.getPurcCont(paramMap);
        model.addAttribute("purcContInfo", map.get("purcContInfo"));
        model.addAttribute("purcReqInfo", map.get("purcReqInfo"));
        model.addAttribute("purcReqHList", map.get("purcReqHList"));
        model.addAttribute("purcReqAttachFileList", map.get("purcReqAttachFileList"));
        model.addAttribute("purcReqAttachFileList2", map.get("purcReqAttachFileList2"));
        model.addAttribute("purcReqAttachFileListCont", map.get("purcReqAttachFileListCont"));
        model.addAttribute("purcReqAttachFileListCont2", map.get("purcReqAttachFileListCont2"));
        /** TODO. 테이블 없음 */
        //model.addAttribute("purcContAddTr", map.get("purcContAddTr"));

        return "jsonView";
    }

    /**
     *
     * purcContPayComplete parkjm 2018. 5. 18.
     *
     * @param paramMap
     * @return
     * @throws Exception
     */
    @RequestMapping ( value = "/Ac/G20/Ex/purcContPayComplete.do")
    public String purcContPayComplete (@RequestParam Map<String, Object> map, Model model) throws Exception {
        try {
            model.addAttribute("result", acG20ExService.purcContPayComplete(map));
        }
        catch ( Exception e ) {
            model.addAttribute("result", "Failed");
            e.printStackTrace();
        }
        return "jsonView";
    }

    /**
     * 검수데이터 생성
     * makeContInspInfo parkjm 2018. 4. 12.
     *
     * @param requestMap
     * @return
     * @throws Exception
     */
    @RequestMapping ( value = "/Ac/G20/Ex/makeContInspInfo.do")
    public String makeContInspInfo (@RequestParam HashMap<String, Object> requestMap, Model model) throws Exception {
        String result = null;
        LoginVO loginVO = EgovUserDetailsHelper.getAuthenticatedUser();
        try {
            requestMap.put("empSeq", loginVO.getUniqId());
            requestMap.put("empIp", loginVO.getIp());
            result = acG20ExService.makeContInspInfo(requestMap);
        }
        catch ( Exception e ) {
            result = "Failed";
            e.printStackTrace( );
        }
        model.addAttribute( "result", result );
        return "jsonView";
    }

    /**
     * 구매계약검수
     * purcContInsp parkjm 2018. 4. 16.
     *
     * @param requestMap
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping ( value = "/Ac/G20/Ex/purcContInsp2.do", method = RequestMethod.GET )
    public String purcContInsp2 (@RequestParam HashMap<String, Object> requestMap, HttpServletRequest request, Model model ) throws Exception {
        LoginVO loginVO = EgovUserDetailsHelper.getAuthenticatedUser();
        requestMap.put( "requestUrl", request.getRequestURI( ) );

        model.addAttribute("loginVO", loginVO);
        model.addAttribute( "params", requestMap );

        return "popup/purc/popup/purcContInsp2Pop";
    }

    /**
     *
     * updatePurcContModReturn parkjm 2020. 8. 12.
     *
     * @param requestMap
     * @return
     * @throws Exception
     */
    @RequestMapping ( value = "/Ac/G20/Ex/updatePurcContModReturn.do", method = RequestMethod.POST )
    public String updatePurcContModReturn (@RequestParam HashMap<String, Object> map, Model model) throws Exception {
        try {
            acG20ExService.updatePurcContModReturn(map);
            model.addAttribute("result", "Success");
        }
        catch ( Exception e ) {
            model.addAttribute("result", "Failed");
            e.printStackTrace();
        }
        return "jsonView";
    }

    /**
     * 거래처 조회
     * getErpTrade parkjm 2018. 4. 3.
     *
     * @param paraMap
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/Ac/G20/Ex/getErpTrade.do", method = RequestMethod.POST)
    public String getErpTradeList(@RequestParam Map<String, String> paraMap, HttpServletRequest request, Model model) throws Exception{
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        conVo = GetConnection(loginVO);
        if(paraMap.get("CO_CD") == null || paraMap.get("CO_CD").equals("")){
            paraMap.put("CO_CD", getCO_CD(loginVO));
        }
        paraMap.put("DETAIL_TYPE", paraMap.get("detail_type"));
        paraMap.put("LANGKIND", getLANGKIND(loginVO));

        List<HashMap<String, String>> selectList = null;
        try {
            /** TODO. 반영시 주석 해제(mssql) */
            selectList = new ArrayList<>();//acG20CodeService.getErpTradeList(conVo, paraMap);
        } catch (Exception e) {
            e.printStackTrace();
        }

        model.addAttribute("selectList", selectList);
        return "jsonView";
    }

    /**
     * 결의서 예산 조회 getPurcContB
     * getPurcReqB parkjm 2018. 4. 3.
     *
     * @param abdocu_H
     * @return
     * @throws Exception
     */
    @RequestMapping ( value = "/Ac/G20/Ex/getPurcContB.do", method = RequestMethod.POST )
    public String getPurcContB (@RequestParam Map<String, Object> map, Model model) throws Exception {
        List<Abdocu_B> selectList = null;
        try {
            selectList = acG20ExService.getPurcContB( map );
        }
        catch ( Exception e ) {
            e.printStackTrace( );
        }
        model.addAttribute( "selectList", selectList );
        return "jsonView";
    }

    /**
     * 결의서 채주정보 가져오기 getPurcContT
     * getPurcContT parkjm 2018. 4. 4.
     *
     * @param abdocu_B
     * @return
     */
    @RequestMapping ( value = "/Ac/G20/Ex/getPurcContT.do", method = RequestMethod.POST )
    public String getPurcContT (@ModelAttribute ( "abdocu_B" ) Abdocu_B abdocu_B, Model model) {
        List<Abdocu_T> selectList = null;
        try {
            selectList = acG20ExService.getPurcContT( abdocu_B );
        }
        catch ( Exception e ) {
            e.printStackTrace( );
        }
        model.addAttribute("selectList", selectList );
        return "jsonView";
    }

    /**
     *
     * getPurcReqLeftAm parkjm 2018. 4. 4.
     *
     * @param abdocu_T
     * @return
     */
    @RequestMapping ( value = "/Ac/G20/Ex/getPurcReqLeftAm.do", method = RequestMethod.POST )
    public String getPurcReqLeftAm (@ModelAttribute ( "abdocu_T" ) Abdocu_T abdocu_T, Model model) {
        try {
            model.addAttribute("purcReqLeftAm", acG20ExService.getPurcReqLeftAm( abdocu_T ));
        }
        catch ( Exception e ) {
            e.printStackTrace( );
        }
        return "jsonView";
    }

    @RequestMapping ( value = "/Ac/G20/Ex/insertAddTr.do")
    public String insertAddTr (@RequestParam Map<String, Object> map, Model model) throws Exception {
        try {
            /** TODO. 테이블 없음 */
            model.addAttribute("result", acG20ExService.insertAddTr(map));
        }
        catch ( Exception e ) {
            model.addAttribute("result", "Failed");
            e.printStackTrace();
        }
        return "jsonView";
    }

    /**
     * 결의서 채주정보 가져오기 setPurcContT
     * setPurcContT parkjm 2018. 4. 4.
     *
     * @param abdocu_T, paramMap
     * @return
     */
    @RequestMapping ( value = "/Ac/G20/Ex/setPurcContT.do", method = RequestMethod.POST )
    public String setPurcContT (@ModelAttribute ( "abdocu_T" ) Abdocu_T abdocu_T, @RequestParam HashMap<String, Object> paramMap, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        abdocu_T.setInsert_id( loginVO.getUniqId( ) );
        abdocu_T.setModify_id( loginVO.getUniqId( ) );
        paramMap.put("empSeq", loginVO.getUniqId());
        paramMap.put("empIp", loginVO.getIp());
        Map<String, Object> map = null;
        String result = null;
        Abdocu_B abdocu_B = null;
        try {
            map = acG20ExService.updatePurcContT( abdocu_T, paramMap);
            result = (String) map.get( "result" );
            abdocu_B = (Abdocu_B) map.get( "abdocu_B" );
            model.addAttribute("purcContInfo", map.get("purcContInfo"));
        }
        catch ( Exception e ) {
            e.printStackTrace( );
        }
        model.addAttribute( "result", result );
        model.addAttribute( "abdocu_B", abdocu_B );
        model.addAttribute( map );

        return "jsonView";
    }

    /**
     * 계약정보 수정
     * updatePurcCont parkjm 2018. 4. 3.
     *
     * @param paraMap
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/Ac/G20/Ex/updatePurcCont.do", method = RequestMethod.POST)
    public String updatePurcCont(@RequestParam Map<String, String> paraMap, HttpServletRequest request, Model model) throws Exception{
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        paraMap.put("empSeq", loginVO.getUniqId());
        paraMap.put("empIp", loginVO.getIp());

        String result = "Failed";

        try {
            System.out.println(paraMap);
            acG20ExService.updatePurcCont(paraMap);
            result = "Success";
        } catch (Exception e) {
            e.printStackTrace();
            result = "Failed";
        }

        model.addAttribute("result", result);
        return "jsonView";
    }

    /**
     *
     * delPurcContT parkjm 2018. 4. 4.
     *
     * @param abdocu_T
     * @return
     */
    @RequestMapping ( value = "/Ac/G20/Ex/delPurcContT.do", method = RequestMethod.POST )
    public String delPurcContT (@ModelAttribute ( "abdocu_T" ) Abdocu_T abdocu_T, Model model) {
        Map<String, Object> map = null;
        Integer result = null;
        try {
            map = acG20ExService.delPurcContT( abdocu_T );
            result = (Integer) map.get( "result" );
            model.addAttribute("purcContInfo", map.get("purcContInfo"));
            model.addAttribute("abdocu_B", map.get("abdocu_B"));
        }
        catch ( Exception e ) {
            e.printStackTrace( );
        }
        model.addAttribute( "result", result );

        return "jsonView";
    }

    /**
     * 구매계약체결현황 리스트
     * purcContConcStateList parkjm 2018. 4. 2.
     *
     * @return
     * @throws Exception
     */
    @RequestMapping ( value = "/Ac/G20/Ex/purcContConcStateList.do", method = RequestMethod.GET )
    public String purcContConcStateList (@RequestParam HashMap<String, Object> requestMap, HttpServletRequest request, Model model ) throws Exception {
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        requestMap.put( "requestUrl", request.getRequestURI( ) );
        List<Map<String, Object>> allDept = commonService.getAllDept();

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("allDept", allDept);
        model.addAttribute( "params", requestMap );

        return "purc1/purcContConcStateList";
    }

    @RequestMapping(value = "/Ac/G20/Ex/purcContListData.do", method = RequestMethod.POST)
    public String purcContListData(@RequestParam Map<String, Object> map, Model model) throws Exception{
        model.addAttribute("list", acG20ExService.purcContListData(map)); //리스트
        return "jsonView";
    }

    @RequestMapping ( value = "/Ac/G20/Ex/purcContConcView.do", method = RequestMethod.GET )
    public String purcContConcView (@RequestParam HashMap<String, Object> requestMap, HttpServletRequest request, Model model ) throws Exception {
        LoginVO loginVO = EgovUserDetailsHelper.getAuthenticatedUser();
        requestMap.put( "requestUrl", request.getRequestURI( ) );
        requestMap.put( "mode", "0" );

        model.addAttribute( "params", requestMap );
        model.addAttribute( "loginVO", loginVO );

        return "popup/purc/popup/purcContConViewPop";
    }

    @RequestMapping ( value = "/Ac/G20/Ex/purcContInspList2.do", method = RequestMethod.GET )
    public String purcContInspList2 (@RequestParam HashMap<String, Object> requestMap, HttpServletRequest request, Model model ) throws Exception {
        LoginVO loginVO = EgovUserDetailsHelper.getAuthenticatedUser();
        requestMap.put( "requestUrl", request.getRequestURI( ) );
        model.addAttribute("loginVO", loginVO);
        model.addAttribute( "params", requestMap );

        return "popup/purc/popup/purcContInspList2Pop";
    }

    /**
     * 구매계약 정보 조회
     * inspTopBoxInit parkjm 2018. 4. 16.
     *
     * @param requestMap
     * @return
     * @throws Exception
     */
    @RequestMapping ( value = "/Ac/G20/Ex/inspTopBoxInit.do")
    public String inspTopBoxInit (@RequestParam HashMap<String, Object> requestMap, Model model) throws Exception {
        String result = "Success";
        try {
            model.addAttribute("resultInfo", acG20ExService.inspTopBoxInit(requestMap));
        }
        catch ( Exception e ) {
            result = "Failed";
            e.printStackTrace( );
        }
        model.addAttribute( "result", result );
        return "jsonView";
    }

    /**
     * 구매계약검수 리스트 데이터
     * purcContInspListData parkjm 2018. 4. 16.
     *
     * @param requestMap
     * @param map
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/Ac/G20/Ex/purcContInspListData.do", method = RequestMethod.POST)
    public String purcContInspListData(@RequestParam Map<String, Object> map, Model model) throws Exception{
        model.addAttribute("list", acG20ExService.purcContInspListData(map)); //리스트
        return "jsonView";
    }

    /**
     * 검수데이터 조회
     * getContInsp parkjm 2018. 4. 12.
     *
     * @param requestMap
     * @return
     * @throws Exception
     */
    @RequestMapping ( value = "/Ac/G20/Ex/getContInsp.do")
    public String getContInsp (@RequestParam HashMap<String, Object> requestMap, Model model) throws Exception {
        String result = "Success";
        Map<String, Object> resultMap = null;
        try {
            resultMap = acG20ExService.getContInsp(requestMap);
        }
        catch ( Exception e ) {
            result = "Failed";
            e.printStackTrace( );
        }
        model.addAttribute( "result", result );
        model.addAttribute( "contInsp", resultMap.get("contInsp") );
        model.addAttribute( "contInspT1", resultMap.get("contInspT1") );
        model.addAttribute( "contInspT2", resultMap.get("contInspT2") );
        model.addAttribute( "contInspAttachFile", resultMap.get("contInspAttachFile") );

        return "jsonView";
    }

    /**
     * 대금지급 리스트
     * purcContPayList parkjm 2018. 5. 3.
     *
     * @param requestMap
     * @param abdocu
     * @return
     * @throws Exception
     */
    @RequestMapping ( value = "/Ac/G20/Ex/purcContPayList.do", method = RequestMethod.GET )
    public String purcContPayList (@RequestParam HashMap<String, Object> requestMap, HttpServletRequest request, Model model) throws Exception {
        LoginVO loginVO = EgovUserDetailsHelper.getAuthenticatedUser();
        requestMap.put( "requestUrl", request.getRequestURI( ) );

        model.addAttribute("loginVO", loginVO);
        model.addAttribute( "params", requestMap );

        return "popup/purc/popup/purcContPayListPop";
    }

    /**
     * 대금지급 리스트 데이터
     * purcContPayListData parkjm 2018. 5. 3.
     *
     * @param requestMap
     * @param map
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/Ac/G20/Ex/purcContPayListData.do", method = RequestMethod.POST)
    public String purcContPayListData(@RequestParam Map<String, Object> map, Model model) throws Exception{
        model.addAttribute("list", acG20ExService.purcContPayListData(map)); //리스트
        return "jsonView";
    }

    /**
     * 대금지급
     * purcContPay parkjm 2018. 5. 4.
     *
     * @param requestMap
     * @param abdocu
     * @return
     * @throws Exception
     */
    @RequestMapping ( value = "/Ac/G20/Ex/purcContPay.do", method = RequestMethod.GET )
    public String purcContPay (@RequestParam HashMap<String, Object> requestMap, HttpServletRequest request, Model model ) throws Exception {
        LoginVO loginVO = EgovUserDetailsHelper.getAuthenticatedUser();
        requestMap.put( "requestUrl", request.getRequestURI( ) );
        model.addAttribute("loginVO", loginVO);
        model.addAttribute( "params", requestMap );

        return "popup/purc/popup/purcContPayPop";
    }

    /**
     * 구매계약변경 리스트
     * purcContModList parkjm 2018. 4. 24.
     *
     * @param requestMap
     * @param abdocu
     * @return
     * @throws Exception
     */
    @RequestMapping ( value = "/Ac/G20/Ex/purcContModList.do", method = RequestMethod.GET )
    public String purcContModList (@RequestParam HashMap<String, Object> requestMap, HttpServletRequest request, Model model ) throws Exception {
        LoginVO loginVO = EgovUserDetailsHelper.getAuthenticatedUser();
        requestMap.put( "requestUrl", request.getRequestURI( ) );

        model.addAttribute("loginVO", loginVO);
        model.addAttribute( "params", requestMap );

        return "popup/purc/popup/purcContModListPop";
    }

    /**
     * 구매계약변경 리스트 데이터
     * purcContModListData parkjm 2018. 4. 24.
     *
     * @param requestMap
     * @param map
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/Ac/G20/Ex/purcContModListData.do", method = RequestMethod.POST)
    public String purcContModListData(@RequestParam Map<String, Object> map, Model model) throws Exception{
        model.addAttribute("list", acG20ExService.purcContModListData(map)); //리스트
        return "jsonView";
    }

    /**
     * 변경계약 체크
     * makeContModInfo parkjm 2020. 10. 19.
     *
     * @param requestMap
     * @return
     * @throws Exception
     */
    @RequestMapping ( value = "/Ac/G20/Ex/purcContModReqCheck.do")
    public String purcContModReqCheck(@RequestParam HashMap<String, Object> requestMap, Model model) throws Exception {
        try {
            model.addAttribute( "result", acG20ExService.purcContModReqCheck(requestMap) );
        }
        catch ( Exception e ) {
            e.printStackTrace( );
        }

        return "jsonView";
    }

    /**
     * 구매계약변경 요청
     * purcContModReq parkjm 2020. 6. 25.
     *
     * @param requestMap
     * @param abdocu
     * @return
     * @throws Exception
     */
    @RequestMapping ( value = "/Ac/G20/Ex/purcContModReq.do", method = RequestMethod.GET )
    public String purcContModReq (@RequestParam HashMap<String, Object> requestMap, HttpServletRequest request, Model model) throws Exception {
        LoginVO loginVO = EgovUserDetailsHelper.getAuthenticatedUser();
        requestMap.put( "requestUrl", request.getRequestURI( ) );

        model.addAttribute("loginVO", loginVO);
        model.addAttribute( "params", requestMap );

        return "popup/purc/popup/purcContModReqPop";
    }

    /**
     * 변경계약 상세 조회
     * getContMod parkjm 2018. 4. 25.
     *
     * @param requestMap
     * @return
     * @throws Exception
     */
    @RequestMapping ( value = "/Ac/G20/Ex/getContMod.do")
    public String getContMod(@RequestParam HashMap<String, Object> requestMap, Model model) throws Exception {
        String result = "Success";
        try {
            Map<String, Object>	 resultMap = acG20ExService.getContMod(requestMap);
            model.addAttribute("data", resultMap);
        }
        catch ( Exception e ) {
            result = "Failed";
            e.printStackTrace( );
        }
        model.addAttribute( "result", result );
        return "jsonView";
    }

    /**
     * 변경계약 데이터 업데이트
     * updatePurcContMod parkjm 2018. 4. 25.
     *
     * @param requestMap
     * @return
     * @throws Exception
     */
    @RequestMapping ( value = "/Ac/G20/Ex/updatePurcContMod.do")
    public String updatePurcContMod(@RequestParam HashMap<String, Object> requestMap, Model model) throws Exception {
        String result = "Success";
        try {
            acG20ExService.updatePurcContMod(requestMap);
        }
        catch ( Exception e ) {
            result = "Failed";
            e.printStackTrace( );
        }
        model.addAttribute( "result", result );
        return "jsonView";
    }

    /**
     * 변경계약 저장
     * requestPurcContMod parkjm 2020. 6. 25.
     *
     * @param paramMap
     * @return
     */
    @RequestMapping ( value = "/Ac/G20/Ex/requestPurcContMod.do", method = RequestMethod.POST )
    public String requestPurcContMod (@RequestParam HashMap<String, Object> paramMap, Model model) {
        String result = null;
        try {
            model.addAttribute("resultData", acG20ExService.requestPurcContMod(paramMap));
            result = "Success";
        }
        catch ( Exception e ) {
            e.printStackTrace( );
            result = "Failed";
        }
        model.addAttribute( "result", result );
        return "jsonView";
    }

    /**
     *
     * updatePurcBiddingState parkjm 2020. 7. 9.
     *
     * @param map
     * @return
     */
    @RequestMapping ( value = "/Ac/G20/Ex/updatePurcBiddingState.do", method = RequestMethod.POST )
    public String updatePurcBiddingState (@RequestParam Map<String, Object> map, Model model) {
        try {
            acG20ExService.updatePurcBiddingState(map);
            model.addAttribute( "result", map.get("result") );
        }
        catch ( Exception e ) {
            e.printStackTrace( );
            model.addAttribute( "result", "Failed" );
        }
        return "jsonView";
    }

    /**
     * 변경계약 데이터 생성
     * makeContModInfo parkjm 2018. 4. 25.
     *
     * @param requestMap
     * @return
     * @throws Exception
     */
    @RequestMapping ( value = "/Ac/G20/Ex/makeContModInfo.do")
    public String makeContModInfo(@RequestParam HashMap<String, Object> requestMap, Model model) throws Exception {
        String result = null;
        LoginVO loginVO = EgovUserDetailsHelper.getAuthenticatedUser();
        try {
            requestMap.put("empSeq", loginVO.getUniqId());
            requestMap.put("empIp", loginVO.getIp());
            result = acG20ExService.makeContModInfo(requestMap);
        }
        catch ( Exception e ) {
            result = "Failed";
            e.printStackTrace( );
        }
        model.addAttribute( "result", result );
        return "jsonView";
    }

    /**
     * 구매계약입찰 리스트
     * purcBiddingList parkjm 2020. 6. 29.
     *
     * @param requestMap
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping ( value = "/Ac/G20/Ex/purcBiddingList.do", method = RequestMethod.GET )
    public String purcBiddingList (@RequestParam HashMap<String, Object> requestMap, HttpServletRequest request, Model model ) throws Exception {
        LoginVO loginVO = EgovUserDetailsHelper.getAuthenticatedUser();
        requestMap.put( "requestUrl", request.getRequestURI( ) );
        List<Map<String, Object>> allDept = commonService.getAllDept();

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("allDept", allDept);
        model.addAttribute( "params", requestMap );
        return "purc1/purcBiddingList";
    }

    @RequestMapping ( value = "/Ac/G20/Ex/purcBiddingNegoList.do", method = RequestMethod.GET )
    public String purcBiddingNegoList (@RequestParam HashMap<String, Object> requestMap, HttpServletRequest request, Model model ) throws Exception {
        LoginVO loginVO = EgovUserDetailsHelper.getAuthenticatedUser();
        requestMap.put( "requestUrl", request.getRequestURI( ) );
        List<Map<String, Object>> allDept = commonService.getAllDept();

        model.addAttribute("mng", "N");
        model.addAttribute("loginVO", loginVO);
        model.addAttribute("allDept", allDept);
        model.addAttribute( "params", requestMap );

        return "purc1/purcBiddingNegoList";
    }

    private String getEMP_CD (LoginVO loginVO) {
        return loginVO.getErpEmpCd( );
    }

    private String getCO_CD (LoginVO loginVO) {
        return loginVO.getErpCoCd( );
    }

    private String getLANGKIND (LoginVO loginVO) {
        return loginVO.getLangCode( );
    }

    private String getGroupSeq (LoginVO loginVO) {
        return loginVO.getGroupSeq( );
    }


    private Map<String, Object> getErpUser ( ConnectionVO conVo, HashMap<String, String> paraMap ) {
        Map<String, Object> map = null;
        System.out.println( "paraMap   : " + paraMap );
        try {
            map = acG20CodeService.getErpUserInfo( conVo, paraMap );
        }
        catch ( Exception e ) {
            map = new HashMap<String, Object>( );
            e.printStackTrace( );
        }
        return map;
    }

    private Abdocu_H getAbdocuH ( Abdocu_H abdocu_H ) {
        Abdocu_H resultAbdocu = new Abdocu_H();
        try {
            resultAbdocu = acG20ExService.getAbdocuH( abdocu_H );
        }
        catch ( Exception e ) {
            e.printStackTrace( );
        }
        return resultAbdocu;
    }

    private List<HashMap<String, String>> getErpConfigList ( ConnectionVO conVo, HashMap<String, String> paraMap ) throws Exception {
        List<HashMap<String, String>> list = null;
        try {
            list = acG20CodeService.getErpConfigList( conVo, paraMap );
        }
        catch ( Exception e ) {
            StringWriter sw = new StringWriter( );
            e.printStackTrace( new PrintWriter( sw ) );
            String exceptionAsStrting = sw.toString( );
            throw new Exception( exceptionAsStrting );
        }
        return list;
    }

    private Map<String, String> getErpTaxConifg ( ConnectionVO conVo, HashMap<String, String> param ) throws Exception {
        Map<String, String> resultMap = null;
        try {
            resultMap = acG20ExService.getErpTaxConifg( conVo, param );
        }
        catch ( Exception e ) {
            StringWriter sw = new StringWriter( );
            e.printStackTrace( new PrintWriter( sw ) );
            String exceptionAsStrting = sw.toString( );
            throw new Exception( exceptionAsStrting );
        }
        return resultMap;
    }

    private Map<String, Object> getGwConfigList ( Map<String, String> paraMap ) throws Exception {
        Map<String, Object> codeMap = new HashMap<String, Object>( );
        try {
            /** 보조비연동여부 공통코드에서 가져오기 **/
            String SubBizYN = CommonCodeUtil.getCodeName( "G20301", "SUBBIZ_YN" );
            if ( !SubBizYN.equals( "Y" ) ) {
                //		    	model.addAttribute("bizGovYn", "0" ) ;
            }
            /** 충남 명세서 사용여부 2013-04-16 doban7 공통코드에서 가져오기 **/
            String ItemsUseYn = CommonCodeUtil.getCodeName( "G20301", "001" );
            /** 법인카드 승인내역 사용 옵션 **/
            String ACardUseYn = CommonCodeUtil.getCodeName( "G20301", "002" );
            codeMap.put( "ACardUseYn", ACardUseYn );
            codeMap.put( "ItemsUseYn", ItemsUseYn );
            codeMap.put( "SubBizUseYn", SubBizYN );
            LoginVO loginVO = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();
            codeMap.put( "payAuth", loginVO.isUserAuthor( "ERP_PAYDATA" ) );
            codeMap.put( "spendAuth", loginVO.isUserAuthor( "ERP_SPEND" ) );
        }
        catch ( Exception e ) {
            StringWriter sw = new StringWriter( );
            e.printStackTrace( new PrintWriter( sw ) );
            String exceptionAsStrting = sw.toString( );
            throw new Exception( exceptionAsStrting );
        }
        return codeMap;
    }

    private Map<String, Object> GetFormInfo ( String template_key ) throws Exception {
        Map<String, Object> resultMap = null;
        try {
            HashMap<String, String> formMap = new HashMap<String, String>( );
            formMap.put( "c_tikeycode", template_key );
            resultMap = (Map<String, Object>) formManageService.getFormInfo(formMap).get( "result" );
        }
        catch ( Exception e ) {
            StringWriter sw = new StringWriter( );
            e.printStackTrace( new PrintWriter( sw ) );
            String exceptionAsStrting = sw.toString( );
            throw new Exception( exceptionAsStrting );
        }
        return resultMap;
    }

    private ConnectionVO GetConnection (LoginVO loginVO) throws Exception {
        Map<String, Object> param = new HashMap<String, Object>( );
        param.put( "loginVO", loginVO );

        return acCommonService.acErpSystemInfo( param );
    }
}
