package egovframework.com.devjitsu.cam_manager.service.impl;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.itextpdf.text.Document;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.tool.xml.XMLWorker;
import com.itextpdf.tool.xml.XMLWorkerFontProvider;
import com.itextpdf.tool.xml.XMLWorkerHelper;
import com.itextpdf.tool.xml.css.StyleAttrCSSResolver;
import com.itextpdf.tool.xml.html.CssAppliers;
import com.itextpdf.tool.xml.html.CssAppliersImpl;
import com.itextpdf.tool.xml.html.Tags;
import com.itextpdf.tool.xml.parser.XMLParser;
import com.itextpdf.tool.xml.pipeline.css.CSSResolver;
import com.itextpdf.tool.xml.pipeline.css.CssResolverPipeline;
import com.itextpdf.tool.xml.pipeline.end.PdfWriterPipeline;
import com.itextpdf.tool.xml.pipeline.html.HtmlPipeline;
import com.itextpdf.tool.xml.pipeline.html.HtmlPipelineContext;
import dev_jitsu.MainLib;
import egovframework.com.devjitsu.cam_manager.repository.PayAppRepository;
import egovframework.com.devjitsu.cam_manager.service.PayAppService;
import egovframework.com.devjitsu.cam_purc.service.PurcService;
import egovframework.com.devjitsu.common.repository.CommonRepository;
import egovframework.com.devjitsu.doc.approval.repository.ApprovalUserRepository;
import egovframework.com.devjitsu.g20.repository.G20Repository;
import egovframework.com.devjitsu.inside.document.repository.DocumentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.File;
import java.io.FileOutputStream;
import java.io.StringReader;
import java.nio.charset.Charset;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class PayAppServiceImpl implements PayAppService {

    @Autowired
    private PayAppRepository payAppRepository;

    @Autowired
    private G20Repository g20Repository;

    @Autowired
    private CommonRepository commonRepository;

    @Autowired
    private DocumentRepository documentRepository;

    @Autowired
    private PurcService purcService;

    @Autowired
    private ApprovalUserRepository approvalUserRepository;

    @Override
    public void payAppSetData(Map<String, Object> params, MultipartFile[] fileList, String serverDir, String baseDir) {
        Gson gson = new Gson();
        List<Map<String, Object>> itemArr = gson.fromJson((String) params.get("itemArr"), new TypeToken<List<Map<String, Object>>>(){}.getType());

        if(!params.containsKey("payAppSn")){
            payAppRepository.insPayAppData(params);

            //지급신청서 최초 저장 시 INSERT
            if(params.containsKey("bsYm")) {
                payAppRepository.insPayAppBsYm(params);
            }
        } else {
            payAppRepository.updPayAppData(params);
            payAppRepository.delPayAppDetailData(params);
            payAppRepository.updPayAppBsYm(params);
        }

        // 출장정산목록 pdf 생성
        if(params.containsKey("busExnpHtml")){
            params.put("pdfFileOrgName", "출장정산목록");
            params.put("pdfHtmlContents", params.get("busExnpHtml"));
            createPdf(params, serverDir, baseDir);
        }

        // 법인카드 증빙서류 생성
        if(!params.get("htmlContents").equals("")){
            params.put("pdfFileOrgName", "법인카드 지출증빙(지급신청서)");
            params.put("pdfHtmlContents", params.get("htmlContents"));
            createPdf(params, serverDir, baseDir);
        }

        // 구매청구에서 지급신청시 claimSn Key 가져옴

        // 출장 지급신청시 hrBizReqResultId Key 가져옴
        if(params.containsKey("hrBizReqResultId")){
            String[] hrBizReqResultIdArr = params.get("hrBizReqResultId").toString().split(",");

            Map<String, Object> paramMaps = new HashMap<>();
            for(String hrBizReqResultId : hrBizReqResultIdArr){
                paramMaps.put("payAppSn", params.get("payAppSn"));
                paramMaps.put("hrBizReqResultId", hrBizReqResultId);

                // 출장 지급신청 Key Insert
                payAppRepository.updPurcBustripByPayAppSn(paramMaps);
            }
        }

        // 출장 사전정산시 hrBizReqResultId Key 가져옴
        if(params.containsKey("hrBizReqId")){
            // 출장 지급신청 Key Insert
            payAppRepository.updBusinessByPayAppSn(params);
        }

        // 영수증, 전표등 있을 시 첨부파일 복사
        if(params.containsKey("bList")){
            // 출장 지급신청 Key Insert
            payAppRepository.updBustripExnpFileCopy(params);
        }

        // 식대대장 지급신청시 snackInfoSn Key 가져옴
        if(params.containsKey("snackInfoSn")){
            String[] snackInfoSnArr = params.get("snackInfoSn").toString().split(",");

            Map<String, Object> paramMaps = new HashMap<>();
            for(String snackInfoSn : snackInfoSnArr){
                paramMaps.put("payAppSn", params.get("payAppSn"));
                paramMaps.put("snackInfoSn", snackInfoSn);

                // 식대대장 지급신청 Key Insert
                payAppRepository.updPurcSnackByPayAppSn(paramMaps);
            }
        }
        // 영수증, 전표등 있을 시 첨부파일 복사
        if(params.containsKey("sList")){
            // 스낵 지급신청 Key Insert
            payAppRepository.updSnackExnpFileCopy(params);
        }

        if(params.containsKey("claimExnpSn")){
            String [] claimExnpSnArr = params.get("claimExnpSn").toString().split(",");
            for(int i = 0 ; i < claimExnpSnArr.length ; i++){
                params.put("claimExnpSn", claimExnpSnArr[i]);
                List<Map<String, Object>> lsMap = payAppRepository.getClaimExnpData(params);

                for(Map<String, Object> map : lsMap){
                    params.put("claimExnpSn", map.get("CLAIM_EXNP_SN"));
                    payAppRepository.updClaimExnpSn(params);
                }
            }
        } else if(params.containsKey("claimSn")){
            // 구매청구관리 지급신청 Key Insert
            payAppRepository.updPurcClaimByPayAppSn(params);
        }

        //        commonRepository.updFileOwnerNull(params);

        for(Map<String, Object> map : itemArr){
            map.put("payAppSn", params.get("payAppSn"));

            payAppRepository.insPayAppDetailData(map);

//            payAppRepository.insPayRate(map);

            String filePath = "/upload/useCard/" + map.get("authNo") + "/" + map.get("authDd") + "/" + map.get("authHh") + "/" + map.get("cardNo").toString().replaceAll("-", "") + "/" + map.get("buySts") + "/";
            map.put("filePath", filePath);

//                commonRepository.updFileOwner(map);
        }

        // 세금계산서, 법인카드 사용내역 저장
        List<Map<String, Object>> payAppItemList = payAppRepository.getPayAppItemList(params);
        List<Map<String, Object>> useEtaxList = payAppRepository.getUseEtaxInfoList(params);
        params.put("PAY_APP_SN", params.get("payAppSn"));
        // dj_use_etax_info 테이블의 CE_GW_IDX값이 있으면 update, 없으면 delete
        for(Map<String, Object> subMap : useEtaxList){
            if(Integer.parseInt(subMap.get("CE_GW_CHK").toString()) > 0){
                payAppRepository.updUseEtaxPayAppNull(params);
            } else {
                payAppRepository.delUseEtaxInfo(params);
            }
        }
        List<Map<String, Object>> useCardList = payAppRepository.getUseCardInfoList(params);
        for(Map<String, Object> subMap : useCardList){
            if(Integer.parseInt(subMap.get("SNACK_INFO_CHK").toString()) > 0 || Integer.parseInt(subMap.get("BIZ_REQ_CHK").toString()) > 0 ||
                    Integer.parseInt(subMap.get("BIZ_REQ_RESULT_CHK").toString()) > 0 || Integer.parseInt(subMap.get("CE_GW_CHK").toString()) > 0){
                payAppRepository.updUseCardPayAppNull(params);
            } else {
                payAppRepository.delUseCardInfo(params);
            }
        }

        for(Map<String, Object> map : payAppItemList){
            if(map.get("EVID_TYPE").toString().equals("1") || map.get("EVID_TYPE").toString().equals("2")){
                int useCardChk = payAppRepository.getUseEtaxInfoCheck(map);
                // dj_use_etax_info 테이블에 저장된 내역이면 payAppSn PK update, 없으면 insert
                if (useCardChk > 0) {
                    payAppRepository.updUseEtaxPayApp(map);
                } else {
                    payAppRepository.insUseEtaxInfo(map);
                }
            } else if(map.get("EVID_TYPE").toString().equals("3")){
                int useCardChk = payAppRepository.getUseCardInfoCheck(map);
                // dj_use_card_info 테이블에 저장된 내역이면 payAppSn PK update, 없으면 insert
                if (useCardChk > 0) {
                    payAppRepository.updUseCardPayApp(map);
                } else {
                    payAppRepository.insUseCardInfo(map);
                }
            }
        }

        MainLib mainLib = new MainLib();
        Map<String, Object> fileInsMap = new HashMap<>();

        /** 지급신청서 관련 파일 정보 dj_pay_app_file에 저장  */
        if(params.containsKey("payAppSn")){
            List<Map<String, Object>> list = payAppRepository.getPayAppDetailData(params);

            String[] fileNoAr = new String[list.size()];
            for(int i = 0; i < list.size(); i++){
                if("".equals(list.get(i).get("FILE_NO")) || list.get(i).get("FILE_NO") == null){
                    fileNoAr[i] = "";
                } else {
                    fileNoAr[i] = list.get(i).get("FILE_NO").toString();
                }
            }
            params.put("fileNoAr", fileNoAr);

            List<Map<String, Object>> storedFileArr = new ArrayList<>();
            if(params.containsKey("snackInfoSn")){
                params.put("snackInfoSnArr", params.get("snackInfoSn").toString().split(","));
                storedFileArr = documentRepository.getFileList(params);
            } else if(params.containsKey("claimExnpSn")){
                storedFileArr = purcService.purcFileList(params);
            } else {
                storedFileArr = payAppRepository.getPayAppFileList(params);
            }

            payAppRepository.delPayAppFileList(params);

            for(Map<String, Object> map : storedFileArr){
                map.put("contentId", params.get("payAppSn"));
                map.put("fileNo", map.get("file_no"));

                commonRepository.insPayAppFileList(map);
            }
        }

        if(fileList.length > 0){
            params.put("menuCd", "payApp");

            List<Map<String, Object>> list = mainLib.multiFileUpload(fileList, filePath(params, serverDir));
            for(int i = 0 ; i < list.size() ; i++){
                list.get(i).put("contentId", params.get("payAppSn"));
                list.get(i).put("empSeq", params.get("empSeq"));
                list.get(i).put("fileCd", params.get("menuCd"));
                list.get(i).put("filePath", filePath(params, baseDir));
                list.get(i).put("fileOrgName", list.get(i).get("orgFilename").toString().substring(0, list.get(i).get("orgFilename").toString().lastIndexOf(".")));
                list.get(i).put("fileExt", list.get(i).get("orgFilename").toString().substring(list.get(i).get("orgFilename").toString().lastIndexOf(".") + 1));

                commonRepository.insFileInfoOne(list.get(i));
                commonRepository.insPayAppFileList(list.get(i));
            }
//            commonRepository.insFileInfo(list);
        }

        if(params.containsKey("cardToSn")){
            payAppRepository.updCardToPayApp(params);
        }
    }

    @Override
    public void payAppMngFileSet(Map<String, Object> params, MultipartFile[] fileList, String serverDir, String baseDir) {

        MainLib mainLib = new MainLib();
        Map<String, Object> fileInsMap = new HashMap<>();

        /** 지급신청서 관련 파일 정보 dj_pay_app_file에 저장  */
        if(params.containsKey("exnpSn")){

        } else {
            List<Map<String, Object>> list = payAppRepository.getPayAppDetailData(params);

            String[] fileNoAr = new String[list.size()];
            for(int i = 0; i < list.size(); i++){
                if("".equals(list.get(i).get("FILE_NO")) || list.get(i).get("FILE_NO") == null){
                    fileNoAr[i] = "";
                } else {
                    fileNoAr[i] = list.get(i).get("FILE_NO").toString();
                }
            }
            params.put("fileNoAr", fileNoAr);

            List<Map<String, Object>> storedFileArr = new ArrayList<>();
            storedFileArr = payAppRepository.getPayAppFileList(params);

            payAppRepository.delPayAppFileList(params);

            for(Map<String, Object> map : storedFileArr){
                map.put("contentId", params.get("payAppSn"));
                map.put("fileNo", map.get("file_no"));

                commonRepository.insPayAppFileList(map);
            }
        }

        if(fileList.length > 0){
            params.put("menuCd", params.get("menuCd"));

            List<Map<String, Object>> list = mainLib.multiFileUpload(fileList, filePath(params, serverDir));
            for(int i = 0 ; i < list.size() ; i++){
                if(params.containsKey("exnpSn")){
                    list.get(i).put("contentId", params.get("exnpSn"));
                } else {
                    list.get(i).put("contentId", params.get("payAppSn"));
                }
                list.get(i).put("empSeq", params.get("empSeq"));
                list.get(i).put("fileCd", params.get("menuCd"));
                list.get(i).put("filePath", filePath(params, baseDir));
                list.get(i).put("fileOrgName", list.get(i).get("orgFilename").toString().substring(0, list.get(i).get("orgFilename").toString().lastIndexOf(".")));
                list.get(i).put("fileExt", list.get(i).get("orgFilename").toString().substring(list.get(i).get("orgFilename").toString().lastIndexOf(".") + 1));

                commonRepository.insFileInfoOne(list.get(i));
                commonRepository.insPayAppFileList(list.get(i));
            }
        }
    }

    @Override
    public Map<String, Object> getPayAppReqData(Map<String, Object> params) {
        return payAppRepository.getPayAppReqData(params);
    }

    @Override
    public List<Map<String, Object>> getPayAppDetailData(Map<String, Object> params) {
        List<Map<String, Object>> list = new ArrayList<>();

        if(params.containsKey("payAppDetSn")){
            String payAppDetSnArr[] = params.get("payAppDetSn").toString().split(",");
            for(String payAppDetSn : payAppDetSnArr){
                Map<String, Object> map = new HashMap<>();
                params.put("payAppDetSn", payAppDetSn);
                map = payAppRepository.getPayAppDetailInfo(params);

                if(map.get("EVID_TYPE").equals("1") || map.get("EVID_TYPE").equals("2") || map.get("EVID_TYPE").equals("3")){
                    Map<String, Object> tempMap = g20Repository.getClientInfoOne(map);

                    if(tempMap != null){
                        map.put("TR_CD", tempMap.get("TR_CD"));
                    } else {
                        map.put("TR_CD", "");
                    }
                }

                list.add(map);
            }


            return list;
        } else {
            for(Map<String, Object> map : payAppRepository.getPayAppDetailData(params)){

                if(map.get("EVID_TYPE").equals("1") || map.get("EVID_TYPE").equals("2") || map.get("EVID_TYPE").equals("3")){
                    Map<String, Object> tempMap = g20Repository.getClientInfoOne(map);

                    if(tempMap != null){
                        map.put("TR_CD", tempMap.get("TR_CD"));
                    } else {
                        map.put("TR_CD", "");
                    }
                }

                list.add(map);
            }
            return list;
        }

    }

    @Override
    public List<Map<String, Object>> getPayAppDetailDataDupl(Map<String, Object> params) {
        List<Map<String, Object>> list = new ArrayList<>();
        return payAppRepository.getPayAppDetailDataDupl(params);

    }

    @Override
    public List<Map<String, Object>> getPaymentList(Map<String, Object> params) {
        return payAppRepository.getPaymentList(params);
    }

    @Override
    public List<Map<String, Object>> getWaitPaymentList(Map<String, Object> params) {
        return payAppRepository.getWaitPaymentList(params);
    }

    @Override
    public void updatePayAppDocState(Map<String, Object> bodyMap) {
        bodyMap.put("docSts", bodyMap.get("approveStatCode"));
        String docSts = String.valueOf(bodyMap.get("docSts"));
        String approKey = String.valueOf(bodyMap.get("approKey"));
        String docId = String.valueOf(bodyMap.get("docId"));
        String processId = String.valueOf(bodyMap.get("processId"));
        String empSeq = String.valueOf(bodyMap.get("empSeq"));
        approKey = approKey.split("_")[1];
        bodyMap.put("approKey", approKey);

        Map<String, Object> params = new HashMap<String, Object>();
        params.put("payAppSn", approKey);
        params.put("docName", bodyMap.get("formName"));
        params.put("docId", docId);
        params.put("docTitle", bodyMap.get("docTitle"));
        params.put("approveStatCode", docSts);
        params.put("empSeq", empSeq);
        Map<String, Object> payAppInfo = payAppRepository.getPayAppInfo(params);
        List<Map<String, Object>> payAppItemList = payAppRepository.getPayAppItemList(params);

        if("10".equals(docSts) || "50".equals(docSts)) { // 상신 - 재상신
            Map<String, Object> map = payAppRepository.getPayAppReqData(params);

            /** 지급신청서는 민간, 정부사업 양식이 달라 재상신시 기존 문서 삭제처리 후 업데이트 */
            if(map.containsKey("DOC_ID")){
                Map<String, Object> params2 = new HashMap<>();
                params2.put("docId", map.get("DOC_ID"));
                params2.put("empSeq", params.get("empSeq"));
                approvalUserRepository.setDocDel(params2);
            }
            payAppRepository.updatePayAppApprStat(params);

            /*for(Map<String, Object> map : payAppItemList){
                if(map.get("EVID_TYPE").toString().equals("1") || map.get("EVID_TYPE").toString().equals("2")){
                    payAppRepository.insUseEtaxInfo(map);
                } else if(map.get("EVID_TYPE").toString().equals("3")){
                    int useCardChk = payAppRepository.getUseCardInfoCheck(map);

                    if (useCardChk > 0) {
                        payAppRepository.updUseCardPayApp(map);
                    } else {
                        payAppRepository.insUseCardInfo(map);
                    }
                }
            }*/
        }else if("30".equals(docSts) || "40".equals(docSts)) { // 반려 - 회수
            payAppRepository.updatePayAppApprStat(params);

//            List<Map<String, Object>> useEtaxList = payAppRepository.getUseEtaxInfoList(params);
//            // dj_use_etax_info 테이블의 CE_GW_IDX값이 있으면 update, 없으면 delete
//            for(Map<String, Object> map : useEtaxList){
//                if(Integer.parseInt(map.get("CE_GW_CHK").toString()) > 0){
//                    payAppRepository.updUseEtaxPayAppNull(map);
//                } else {
//                    payAppRepository.delUseEtaxInfo(map);
//                }
//            }
//
//            List<Map<String, Object>> useCardList = payAppRepository.getUseCardInfoList(params);
//            for(Map<String, Object> map : useCardList){
//                if(Integer.parseInt(map.get("SNACK_INFO_CHK").toString()) > 0 || Integer.parseInt(map.get("BIZ_REQ_CHK").toString()) > 0 ||
//                        Integer.parseInt(map.get("BIZ_REQ_RESULT_CHK").toString()) > 0 || Integer.parseInt(map.get("CE_GW_CHK").toString()) > 0){
//                    payAppRepository.updUseCardPayAppNull(map);
//                } else {
//                    payAppRepository.delUseCardInfo(map);
//                }
//            }
        }else if("100".equals(docSts) || "101".equals(docSts)) { // 종결 - 전결
            params.put("approveStatCode", 100);
            payAppRepository.updatePayAppFinalApprStat(params);
//            payAppRepository.updatePurcListFinalApprStat(params);
        }
    }

    @Override
    public void updateExnpAppDocState(Map<String, Object> bodyMap) {
        bodyMap.put("docSts", bodyMap.get("approveStatCode"));
        String docSts = String.valueOf(bodyMap.get("docSts"));
        String approKey = String.valueOf(bodyMap.get("approKey"));
        String docId = String.valueOf(bodyMap.get("docId"));
        String processId = String.valueOf(bodyMap.get("processId"));
        String empSeq = String.valueOf(bodyMap.get("empSeq"));
        approKey = approKey.split("_")[1];
        bodyMap.put("approKey", approKey);

        Map<String, Object> params = new HashMap<String, Object>();
        params.put("exnpSn", approKey);
        params.put("docName", bodyMap.get("formName"));
        params.put("docId", docId);
        params.put("docTitle", bodyMap.get("docTitle"));
        params.put("approveStatCode", docSts);
        params.put("empSeq", empSeq);

        if("10".equals(docSts) || "50".equals(docSts)) { // 상신 - 재상신
            payAppRepository.updateExnpApprStat(params);
        }else if("30".equals(docSts) || "40".equals(docSts)) { // 반려 - 회수
            payAppRepository.updateExnpApprStat(params);
        }else if("100".equals(docSts) || "101".equals(docSts)) { // 종결 - 전결
            params.put("approveStatCode", 100);
            payAppRepository.updateExnpFinalApprStat(params);
            Map<String, Object> pkMap = payAppRepository.getExnpData(params);
            if("1".equals(pkMap.get("PAY_APP_TYPE"))){
                params.put("payAppType", pkMap.get("PAY_APP_TYPE"));
                updateG20ExnpFinalAppr(params, "app");
            }
            //payAppRepository.updatePurcListFinalApprStat(params);
        }
    }

    @Override
    public void updateIncpAppDocState(Map<String, Object> bodyMap) {
        bodyMap.put("docSts", bodyMap.get("approveStatCode"));
        String docSts = String.valueOf(bodyMap.get("docSts"));
        String approKey = String.valueOf(bodyMap.get("approKey"));
        String docId = String.valueOf(bodyMap.get("docId"));
        String processId = String.valueOf(bodyMap.get("processId"));
        String empSeq = String.valueOf(bodyMap.get("empSeq"));
        approKey = approKey.split("_")[1];
        bodyMap.put("approKey", approKey);

        Map<String, Object> params = new HashMap<String, Object>();
        params.put("payIncpSn", approKey);
        params.put("docName", bodyMap.get("formName"));
        params.put("docId", docId);
        params.put("docTitle", bodyMap.get("docTitle"));
        params.put("approveStatCode", docSts);
        params.put("empSeq", empSeq);

        if("10".equals(docSts) || "50".equals(docSts)) { // 상신 - 재상신
            payAppRepository.updateIncpApprStat(params);
        }else if("30".equals(docSts) || "40".equals(docSts)) { // 반려 - 회수
            payAppRepository.updateIncpApprStat(params);
        }else if("100".equals(docSts) || "101".equals(docSts)) { // 종결 - 전결
            params.put("approveStatCode", 100);
            payAppRepository.updateIncpFinalApprStat(params);
            updateG20IncpFinalAppr(params, "app");
        }
    }

    @Override
    public void setPayAppDetData(Map<String, Object> params) {
        payAppRepository.updPayAppDetStat(params);
    }

    @Override
    public void setPayAppCostApp(Map<String, Object> params) {
        payAppRepository.setPayAppCostApp(params);
    }

    @Override
    public void setPayAppDetCostApp(Map<String, Object> params) {
        payAppRepository.setPayAppDetCostApp(params);
    }

    @Override
    public void setExnpData(Map<String, Object> params, MultipartFile[] fileList, String serverDir, String baseDir) {
        Gson gson = new Gson();
        List<Map<String, Object>> itemArr = gson.fromJson((String) params.get("itemArr"), new TypeToken<List<Map<String, Object>>>(){}.getType());

        if("".equals(params.get("payAppSn")) || params.get("payAppSn") == null){
            params.remove("payAppSn");
        }
        if(!params.containsKey("exnpSn")){
            if(!params.containsKey("payAppDetSn")){
                params.put("payAppDetSn", null);
            }
            payAppRepository.insExnpData(params);
        } else {
            payAppRepository.updExnpData(params);
            payAppRepository.delExnpDetailData(params);
        }

        for(Map<String, Object> map : itemArr){
            map.put("exnpSn", params.get("exnpSn"));
            payAppRepository.insExnpDetailData(map);
        }

        if(params.containsKey("item")){
            if(!"".equals(params.get("item").toString())){
                String[] items = params.get("item").toString().split(",");

                for (String item : items){
                    params.put("item", item);
                    payAppRepository.updPayAppDetailStatus(params);
                }
            }
        }

        MainLib mainLib = new MainLib();
        if(fileList.length > 0){
            params.put("menuCd", "exnp");

            List<Map<String, Object>> list = mainLib.multiFileUpload(fileList, filePath(params, serverDir));
            for(int i = 0 ; i < list.size() ; i++){
                list.get(i).put("contentId", params.get("exnpSn"));
                list.get(i).put("empSeq", params.get("regEmpSeq"));
                list.get(i).put("fileCd", params.get("menuCd"));
                list.get(i).put("filePath", filePath(params, baseDir));
                list.get(i).put("fileOrgName", list.get(i).get("orgFilename").toString().substring(0, list.get(i).get("orgFilename").toString().lastIndexOf(".")));
                list.get(i).put("fileExt", list.get(i).get("orgFilename").toString().substring(list.get(i).get("orgFilename").toString().lastIndexOf(".") + 1));

                commonRepository.insFileInfoOne(list.get(i));
//                commonRepository.insPayAppFileList(list.get(i));
            }
//            commonRepository.insFileInfo(list);
        }

    }

    @Override
    public Map<String, Object> getExnpData(Map<String, Object> params) {
        return payAppRepository.getExnpData(params);
    }

    @Override
    public List<Map<String, Object>> getExnpDetailData(Map<String, Object> params) {
        return payAppRepository.getExnpDetailData(params);
    }

    @Override
    public List<Map<String, Object>> getExnpDetailDataDupl(Map<String, Object> params) {
        return payAppRepository.getExnpDetailDataDupl(params);
    }

    @Override
    public List<Map<String, Object>> getExnpList(Map<String, Object> params) {
        return payAppRepository.getExnpList(params);
    }

    @Override
    public List<Map<String, Object>> getExnpReList(Map<String, Object> params) {
        return payAppRepository.getExnpReList(params);
    }

    @Override
    public List<Map<String, Object>> getExnpReListForExcelDown(Map<String, Object> params) {
        return payAppRepository.getExnpReListForExcelDown(params);
    }

    @Override
    public List<Map<String, Object>> getIncpList(Map<String, Object> params) {
        return payAppRepository.getIncpList(params);
    }

    @Override
    public List<Map<String, Object>> getIncpListForExcelDown(Map<String, Object> params) {
        return payAppRepository.getIncpListForExcelDown(params);
    }

    @Override
    public List<Map<String, Object>> getIncpReList(Map<String, Object> params) {
        return payAppRepository.getIncpReList(params);
    }

    @Override
    public void payIncpSetData(Map<String, Object> params, MultipartFile[] fileList, String serverDir, String baseDir) {
        Gson gson = new Gson();
        List<Map<String, Object>> itemArr = gson.fromJson((String) params.get("itemArr"), new TypeToken<List<Map<String, Object>>>(){}.getType());

        if(!params.containsKey("payIncpSn")){
            payAppRepository.insPayIncpData(params);
        } else {
            payAppRepository.updPayIncpData(params);
            payAppRepository.delPayIncpDetailData(params);
        }

        if(params.containsKey("payDepoSn")){
            payAppRepository.updPayDepoData(params);
        }

        for(Map<String, Object> map : itemArr){
            map.put("payIncpSn", params.get("payIncpSn"));
            payAppRepository.insPayIncpDetailData(map);
        }

        MainLib mainLib = new MainLib();

        /** 수입결의서 관련 파일 정보 dj_pay_incp_file에 저장  */
        if(params.containsKey("payIncpSn")){
            List<Map<String, Object>> storedFileArr = payAppRepository.getStoredPayIncpFileList(params);
            payAppRepository.delPayIncpFileList(params);

            for(Map<String, Object> map : storedFileArr){
                map.put("contentId", params.get("payIncpSn"));
                map.put("fileNo", map.get("file_no"));

                commonRepository.insPayIncpFileList(map);
            }
        }

        if(fileList.length > 0){
            params.put("menuCd", "payIncp");

            List<Map<String, Object>> list = mainLib.multiFileUpload(fileList, filePath(params, serverDir));
            for(int i = 0 ; i < list.size() ; i++){
                list.get(i).put("contentId", params.get("payIncpSn"));
                list.get(i).put("empSeq", params.get("empSeq"));
                list.get(i).put("fileCd", params.get("menuCd"));
                list.get(i).put("filePath", filePath(params, baseDir));
                list.get(i).put("fileOrgName", list.get(i).get("orgFilename").toString().substring(0, list.get(i).get("orgFilename").toString().lastIndexOf(".")));
                list.get(i).put("fileExt", list.get(i).get("orgFilename").toString().substring(list.get(i).get("orgFilename").toString().lastIndexOf(".") + 1));

                commonRepository.insFileInfoOne(list.get(i));
                commonRepository.insPayIncpFileList(list.get(i));
            }
//            commonRepository.insFileInfo(list);
        }
    }

    @Override
    public Map<String, Object> getPayIncpReqData(Map<String, Object> params) {
        return payAppRepository.getPayIncpReqData(params);
    }

    @Override
    public List<Map<String, Object>> getPayIncpDetailData(Map<String, Object> params) {
        return payAppRepository.getPayIncpDetailData(params);
    }

    @Override
    public List<Map<String, Object>> getStoredPayIncpFileList(Map<String, Object> params) {
        return payAppRepository.getStoredPayIncpFileList(params);
    }

    @Override
    public void resolutionExnpAppr(Map<String, Object> params) {
        updateG20ExnpFinalAppr(params, "resolution");
        payAppRepository.resolutionExnpStatus(params);

        /** 구매지급신청일때 */
        params.put("payAppSn", payAppRepository.getExnpData(params).get("PAY_APP_SN"));
        payAppRepository.updClaimExnpInfo(params);
    }

    @Override
    public void resolutionIncpAppr(Map<String, Object> params) {
        updateG20IncpFinalAppr(params, "resolution");
        payAppRepository.resolutionIncpAppr(params);
    }

    private void updateG20ExnpFinalAppr(Map<String, Object> params, String type){
        try{
            List<Map<String, Object>> list = new ArrayList<>();

            Map<String, Object> pkMap = payAppRepository.getExnpData(params);

            params.put("empSeq", pkMap.get("EMP_SEQ"));

            /** 1.지출결의서 일때 세금계산서, 계산서, 신용카드는 반제결의 승인시 g20 프로시저 호출 해야 함 */
            if("1".equals(pkMap.get("PAY_APP_TYPE"))){
                if(type.equals("resolution")){
                    params.put("evidTypeArr", "1,2,3,4,5,6,9");
                    list = payAppRepository.getExnpG20List(params);
                } else {
                    params.put("evidTypeArr", "1,2,3");
                    list = payAppRepository.getExnpG20List(params);
                }
            } else if("2".equals(pkMap.get("PAY_APP_TYPE"))){
                list = payAppRepository.getExnpG20List(params);
            } else if("3".equals(pkMap.get("PAY_APP_TYPE"))){
                list = payAppRepository.getExnpG20List(params);
            } else if("4".equals(pkMap.get("PAY_APP_TYPE"))){
                list = payAppRepository.getExnpG20List(params);
            }


            if(list.size() != 0){
                Map<String, Object> loginMap = payAppRepository.getEmpInfo(params);
                Map<String, Object> execMap = new HashMap<>();
                int i = 0;

                int docNumber = 0;          // 전체 지출결의서 CNT
                docNumber = payAppRepository.getCountDoc(list.get(i));
                int userSq = docNumber + 1;

                for(Map<String, Object> data : list) {

                    if("3".equals(pkMap.get("PAY_APP_TYPE"))){
                        data.put("ETCDUMMY1", "76");
                    }

                    if(data.get("REG_DT") == null){
                        data.put("REG_DT", data.get("IN_DT"));
                    }
//                int docNumber = 0;          // 전체 지출결의서 CNT
//                docNumber = payAppRepository.getCountDoc(list.get(i));
//                int userSq = docNumber + 1;

                    int exnpDocNumber = 0;      // 같은 지출결의서 CNT
                    exnpDocNumber = payAppRepository.getExnpCountDoc(data);
                    data.put("PMR_NO", data.get("IN_DT") + "-" + String.format("%02d", userSq) + "-" + String.format("%02d", exnpDocNumber + 1));

                    while (true){
                        int duplCheck = payAppRepository.getExnpCheck(data);
                        if (duplCheck == 0) {
                            break;
                        }

                        exnpDocNumber++;
                        data.put("PMR_NO", data.get("IN_DT") + "-" + String.format("%02d", userSq) + "-" + String.format("%02d", exnpDocNumber + 1));
                    }

//                userSq++;

                    data.put("USER_SQ", userSq);

                    Map<String, Object> tradeMap = g20Repository.getTradeInfo(data);
                    Map<String, Object> hearnerMap = g20Repository.getHearnerInfo(data);

                    if(tradeMap != null) {
                        data.put("REG_NB", tradeMap.get("REG_NB"));
                        data.put("PPL_NB", tradeMap.get("PPL_NB"));
                        data.put("CEO_NM", tradeMap.get("CEO_NM"));
                        data.put("BUSINESS", tradeMap.get("BUSINESS"));
                        data.put("JONGMOK", tradeMap.get("JONGMOK"));
                        data.put("ZIP", tradeMap.get("ZIP"));
                        data.put("DIV_ADDR1", tradeMap.get("DIV_ADDR1"));
                        data.put("ADDR2", tradeMap.get("ADDR2"));
                    }

                    if(hearnerMap != null) {
                        data.put("ETCDATA_CD", hearnerMap.get("DATA_CD"));
                        data.put("ETCPER_CD", hearnerMap.get("PER_CD"));
                        data.put("ETCREG_NO", hearnerMap.get("REG_NO"));
                        data.put("ETCPER_NM", hearnerMap.get("PER_NM"));
                        data.put("ETCZIP_CD", hearnerMap.get("ZIP_CD"));
                        data.put("ETCADDR", hearnerMap.get("ADDR"));
                        data.put("ETCPHONE", hearnerMap.get("PHONE"));
                        data.put("ETCBANK_CD", "");
                        data.put("ETCACCT_NO", hearnerMap.get("ACCT_NO"));
                        data.put("ETCACCT_NM", hearnerMap.get("ACCT_NM"));
                        data.put("ETCRVRS_YM", data.get("IN_DT").toString().substring(0, 6));
                        data.put("ETCDUMMY1", hearnerMap.get("DUMMY1"));

                        data.put("ETCDIV_CD", data.get("DIV_CD"));

                    }

                    data.put("NDEP_AM", 0);
                    data.put("INAD_AM", 0);
                    data.put("INTX_AM", 0);
                    data.put("RSTX_AM", 0);

//                Map<String, Object> taxMap = payAppRepository.getTaxMap(data);

                    if(data.get("EVID_TYPE").toString().equals("1")){
                        data.put("SET_FG", "3");
                        data.put("VAT_FG", "3");
                        data.put("TR_FG", "1");

                        if(!data.get("RPMR_NO").toString().equals("")){
                            data.put("SET_FG", "1");
                            data.put("VAT_FG", "1");
                            data.put("TR_FG", "3");
                        }
                    } else if(data.get("EVID_TYPE").toString().equals("2")){
                        data.put("SET_FG", "3");
                        data.put("VAT_FG", "2");
                        data.put("TR_FG", "1");

                        if(!data.get("RPMR_NO").toString().equals("")){
                            data.put("SET_FG", "1");
                            data.put("VAT_FG", "1");
                            data.put("TR_FG", "3");
                        }
                    } else if(data.get("EVID_TYPE").toString().equals("3")){
                        data.put("SET_FG", "4");
                        data.put("VAT_FG", "3");
                        data.put("TR_FG", "3");

                        if(!data.get("RPMR_NO").toString().equals("")){
                            data.put("SET_FG", "1");
                            data.put("VAT_FG", "3");
                            data.put("TR_FG", "3");
                        }
                    } else if(data.get("EVID_TYPE").toString().equals("4")){
                        data.put("SET_FG", "1");
                        data.put("VAT_FG", "3");
                        data.put("TR_FG", "3");
                        data.put("CTR_NM", "");
                        data.put("CTR_NB", "");

                    } else if(data.get("EVID_TYPE").toString().equals("5")){
                        data.put("SET_FG", "1");
                        data.put("VAT_FG", "3");
                        data.put("TR_FG", "9");
                        data.put("TAX_DT", data.get("IN_DT"));
                        data.put("CTR_NM", "");
                        data.put("CTR_NB", "");
                        int totAmt = Integer.parseInt(data.get("SUP_AM").toString()) + Integer.parseInt(data.get("VAT_AM").toString());
                        int ndepAm = (int) (totAmt * 0.6);
                        data.put("NDEP_AM", 0);
                        data.put("INAD_AM", 0);
                        data.put("INTX_AM", totAmt * 0.03);
                        data.put("RSTX_AM", (totAmt * 0.03) / 10);
                        data.put("ETCDUMMY1", "");

                        if(hearnerMap == null){
                            data.put("ETCPER_NM", data.get("TR_NM"));
                            data.put("ETCACCT_NO", data.get("CRM_ACC_NO"));
                            data.put("ETCACCT_NM", data.get("CRM_ACC_HOLDER"));
                            data.put("ETCRVRS_YM", data.get("IN_DT").toString().substring(0, 6));
                            data.put("ETCDIV_CD", data.get("DIV_CD"));
                        }
                    } else if(data.get("EVID_TYPE").toString().equals("9")){
                        data.put("SET_FG", "1");
                        data.put("VAT_FG", "3");
                        data.put("TR_FG", "4");
                        data.put("TAX_DT", data.get("IN_DT"));
                        data.put("ETCDUMMY1", "76");
                        data.put("CTR_NM", "");
                        data.put("CTR_NB", "");
                        int totAmt = Integer.parseInt(data.get("SUP_AM").toString()) + Integer.parseInt(data.get("VAT_AM").toString());
                        int ndepAm = (int) (totAmt * 0.6);
                        data.put("NDEP_AM", ndepAm);
                        data.put("INAD_AM", totAmt - ndepAm);

                        if(totAmt > 125000){
                            int intxAm = (int) ((totAmt  - (totAmt * 0.6)) * 0.2);
                            data.put("INTX_AM", intxAm);
                            data.put("RSTX_AM", intxAm / 10);
                        } else {
                            data.put("INTX_AM", 0);
                            data.put("RSTX_AM", 0);
                        }

                        data.put("ETCDUMMY1", "76");

                        if(hearnerMap == null){
                            data.put("ETCPER_NM", data.get("TR_NM"));
                            data.put("ETCACCT_NO", data.get("CRM_ACC_NO"));
                            data.put("ETCACCT_NM", data.get("CRM_ACC_HOLDER"));
                            data.put("ETCRVRS_YM", data.get("IN_DT").toString().substring(0, 6));
                            data.put("ETCDIV_CD", data.get("DIV_CD"));
                        }
                    } else {
                        data.put("SET_FG", "1");
                        data.put("VAT_FG", "3");
                        data.put("TR_FG", "3");
                        data.put("CTR_NM", "");
                        data.put("CTR_NB", "");
                    }

                    if((data.get("EVID_TYPE").toString().equals("1") || data.get("EVID_TYPE").toString().equals("2") || data.get("EVID_TYPE").toString().equals("3")) && type.equals("resolution")) {
                        if (data.get("DOCU_FG").toString().equals("1")) {
                            data.put("DOCU_FG", "99");
                        }
                    } else {
                        data.put("IN_DT_TMP", data.get("IN_DT"));
                    }

                    if((data.get("EVID_TYPE").toString().equals("1") || data.get("EVID_TYPE").toString().equals("2") || data.get("EVID_TYPE").toString().equals("3"))){
                        if(type.equals("resolution")){
                            data.put("IN_DT_TMP", data.get("IN_DT"));
                            data.put("IN_DT", data.get("EXEC_DT"));
                        } else {
                            data.put("IN_DT_TMP", data.get("ACISU_DT"));
                            data.put("IN_DT", data.get("IN_DT"));
                        }
                    }


                    g20Repository.insZnSautoabdocu(data);


                    i++;

                    payAppRepository.updExnpStat(data);

                    if(type.equals("resolution") || (data.get("EVID_TYPE").toString().equals("1") || data.get("EVID_TYPE").toString().equals("2") || data.get("EVID_TYPE").toString().equals("3"))
                            || "2".equals(pkMap.get("PAY_APP_TYPE")) || "3".equals(pkMap.get("PAY_APP_TYPE")) || "4".equals(pkMap.get("PAY_APP_TYPE"))) {
                        if(list.size() == i) {
                            data.put("LOGIN_EMP_CD", loginMap.get("ERP_EMP_SEQ"));
                            g20Repository.execUspAncj080Insert00(data);
                        }
                    }
                }
            }
        } catch (Exception e){
            e.printStackTrace();
        }

    }

    private void updateG20IncpFinalAppr(Map<String, Object> params, String type){
        List<Map<String, Object>> list = new ArrayList<>();

        Map<String, Object> pkMap = payAppRepository.getIncpData(params);
        params.put("evidTypeArr", "1,2,3,4,5,6,7");


        if(params.containsKey("payIncpReSn")){
            list = payAppRepository.getIncpReG20List(params);
        } else {
            list = payAppRepository.getIncpG20List(params);
        }

        if(list.size() != 0){
            Map<String, Object> loginMap = payAppRepository.getEmpInfo(params);
            Map<String, Object> execMap = new HashMap<>();
            int i = 0;

            int docNumber = 0;          // 전체 지출결의서 CNT
            docNumber = payAppRepository.getCountDoc(list.get(i));
            int userSq = docNumber + 1;

            for(Map<String, Object> data : list) {
                int exnpDocNumber = 0;      // 같은 지출결의서 CNT
                exnpDocNumber = payAppRepository.getIncpCountDoc(data);
                data.put("PMR_NO", data.get("IN_DT") + "-" + String.format("%02d", userSq) + "-" + String.format("%02d", exnpDocNumber + 1));

                while (true){
                    int duplCheck = payAppRepository.getExnpCheck(data);
                    if (duplCheck == 0) {
                        break;
                    }

                    exnpDocNumber++;
                    data.put("PMR_NO", data.get("IN_DT") + "-" + String.format("%02d", userSq) + "-" + String.format("%02d", exnpDocNumber + 1));
                }

                data.put("USER_SQ", userSq);

                Map<String, Object> tradeMap = g20Repository.getTradeInfo(data);
                Map<String, Object> hearnerMap = g20Repository.getHearnerInfo(data);

                if(tradeMap != null) {
                    data.put("REG_NB", tradeMap.get("REG_NB"));
                    data.put("PPL_NB", tradeMap.get("PPL_NB"));
                    data.put("CEO_NM", tradeMap.get("CEO_NM"));
                    data.put("BUSINESS", tradeMap.get("BUSINESS"));
                    data.put("JONGMOK", tradeMap.get("JONGMOK"));
                    data.put("ZIP", tradeMap.get("ZIP"));
                    data.put("DIV_ADDR1", tradeMap.get("DIV_ADDR1"));
                    data.put("ADDR2", tradeMap.get("ADDR2"));
                }

                if(hearnerMap != null) {
                    data.put("ETCDATA_CD", hearnerMap.get("DATA_CD"));
                    data.put("ETCPER_CD", hearnerMap.get("PER_CD"));
                    data.put("ETCREG_NO", hearnerMap.get("REG_NO"));
                    data.put("ETCPER_NM", hearnerMap.get("PER_NM"));
                    data.put("ETCZIP_CD", hearnerMap.get("ZIP_CD"));
                    data.put("ETCADDR", hearnerMap.get("ADDR"));
                    data.put("ETCPHONE", hearnerMap.get("PHONE"));
                    data.put("ETCBANK_CD", "");
                    data.put("ETCACCT_NO", hearnerMap.get("ACCT_NO"));
                    data.put("ETCACCT_NM", hearnerMap.get("ACCT_NM"));
                    data.put("ETCRVRS_YM", data.get("IN_DT").toString().substring(0, 6));
                    data.put("ETCDIV_CD", data.get("DIV_CD"));
                }

                data.put("NDEP_AM", 0);
                data.put("INAD_AM", 0);
                data.put("INTX_AM", 0);
                data.put("RSTX_AM", 0);

                if(data.get("EVID_TYPE").toString().equals("1")){
                    data.put("SET_FG", "3");
                    data.put("VAT_FG", "1");
                    data.put("TR_FG", "1");

                    if(!data.get("RPMR_NO").toString().equals("")){
                        data.put("SET_FG", "1");
                        data.put("VAT_FG", "1");
                        data.put("TR_FG", "1");
                    }
                } else if(data.get("EVID_TYPE").toString().equals("2")){
                    data.put("SET_FG", "1");
                    data.put("VAT_FG", "1");
                    data.put("TR_FG", "1");
                } else if(data.get("EVID_TYPE").toString().equals("3")){
                    data.put("SET_FG", "3");
                    data.put("VAT_FG", "2");
                    data.put("TR_FG", "3");
                } else if(data.get("EVID_TYPE").toString().equals("4")){
                    data.put("SET_FG", "1");
                    data.put("VAT_FG", "2");
                    data.put("TR_FG", "1");
                } else if(data.get("EVID_TYPE").toString().equals("5")){
                    data.put("SET_FG", "4");
                    data.put("VAT_FG", "3");
                    data.put("TR_FG", "3");

                    if(!data.get("RPMR_NO").toString().equals("")){
                        data.put("SET_FG", "1");
                        data.put("VAT_FG", "3");
                        data.put("TR_FG", "3");
                    }
                } else if(data.get("EVID_TYPE").toString().equals("6")){
                    data.put("SET_FG", "4");
                    data.put("VAT_FG", "2");
                    data.put("TR_FG", "1");
                } else {
                    data.put("SET_FG", "1");
                    data.put("VAT_FG", "3");
                    data.put("TR_FG", "3");

                    if(!data.get("RPMR_NO").toString().equals("")){
                        data.put("SET_FG", "1");
                        data.put("VAT_FG", "2");
                        data.put("TR_FG", "1");
                    }
                }


                if(!data.get("RPMR_NO").toString().equals("")){
                    data.put("DOCU_FG", "89");
                    data.put("IN_DT_TMP", data.get("IN_DT"));
                    data.put("IN_DT", data.get("EXEC_DT"));
                } else {
                    data.put("ETCDUMMY1", "76");
                    data.put("IN_DT_TMP", data.get("IN_DT"));
                }
                g20Repository.insZnSautoabdocu(data);

                i++;

                if(params.containsKey("payIncpReSn")){
                    payAppRepository.updIncpReStat(data);
                } else {
                    payAppRepository.updIncpMasterStat(data);
                    payAppRepository.updIncpStat(data);
                }


                if(list.size() == i){
                    data.put("LOGIN_EMP_CD", loginMap.get("ERP_EMP_SEQ"));
                    g20Repository.execUspAncj080Insert00(data);
                }

            }
        }
    }

    @Override
    public void updPayAttDetData(Map<String, Object> params, MultipartHttpServletRequest request, MultipartFile[] file11, String SERVER_DIR, String BASE_DIR) {
        MainLib mainLib = new MainLib();
        Map<String, Object> fileInsMap = new HashMap<>();

        /** 세금계산서/계산서 - 세금계산서/계산서 */
        MultipartFile file1 = request.getFile("file1");
        if(file1 != null){
            if(!file1.isEmpty()){
                fileInsMap = mainLib.fileUpload(file1, filePath(params, SERVER_DIR));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().substring(0, fileInsMap.get("orgFilename").toString().lastIndexOf('.')));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().substring(fileInsMap.get("orgFilename").toString().lastIndexOf('.') + 1));
                fileInsMap.put("empSeq", params.get("regEmpSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("value", fileInsMap.get("file_no"));
                fileInsMap.put("column", "FILE1");
                fileInsMap.put("payDestSn", params.get("payDestSn"));
                payAppRepository.updPayAttDetData(fileInsMap);
            }
        }

        /** 세금계산서/계산서 - 거래명세서 */
        MultipartFile file2 = request.getFile("file2");
        if(file2 != null){
            if(!file2.isEmpty()){
                fileInsMap = mainLib.fileUpload(file2, filePath(params, SERVER_DIR));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().substring(0, fileInsMap.get("orgFilename").toString().lastIndexOf('.')));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().substring(fileInsMap.get("orgFilename").toString().lastIndexOf('.') + 1));
                fileInsMap.put("empSeq", params.get("regEmpSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("value", fileInsMap.get("file_no"));
                fileInsMap.put("column", "FILE2");
                fileInsMap.put("payDestSn", params.get("payDestSn"));

                payAppRepository.updPayAttDetData(fileInsMap);
            }
        }

        /** 세금계산서/계산서 - 거래명세서 */
        MultipartFile file3 = request.getFile("file3");
        if(file3 != null){
            if(!file3.isEmpty()){
                fileInsMap = mainLib.fileUpload(file3, filePath(params, SERVER_DIR));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().substring(0, fileInsMap.get("orgFilename").toString().lastIndexOf('.')));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().substring(fileInsMap.get("orgFilename").toString().lastIndexOf('.') + 1));
                fileInsMap.put("empSeq", params.get("regEmpSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("value", fileInsMap.get("file_no"));
                fileInsMap.put("column", "file3");
                fileInsMap.put("payDestSn", params.get("payDestSn"));

                payAppRepository.updPayAttDetData(fileInsMap);
            }
        }

        /** 세금계산서/계산서 - 검수조서 */
        MultipartFile file4 = request.getFile("file4");
        if(file4 != null){
            if(!file4.isEmpty()){
                fileInsMap = mainLib.fileUpload(file4, filePath(params, SERVER_DIR));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().substring(0, fileInsMap.get("orgFilename").toString().lastIndexOf('.')));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().substring(fileInsMap.get("orgFilename").toString().lastIndexOf('.') + 1));
                fileInsMap.put("empSeq", params.get("regEmpSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("value", fileInsMap.get("file_no"));
                fileInsMap.put("column", "file4");
                fileInsMap.put("payDestSn", params.get("payDestSn"));

                payAppRepository.updPayAttDetData(fileInsMap);
            }
        }

        /** 세금계산서/계산서 - 납품사진 */
        MultipartFile file5 = request.getFile("file5");
        if(file5 != null){
            if(!file5.isEmpty()){
                fileInsMap = mainLib.fileUpload(file5, filePath(params, SERVER_DIR));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().substring(0, fileInsMap.get("orgFilename").toString().lastIndexOf('.')));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().substring(fileInsMap.get("orgFilename").toString().lastIndexOf('.') + 1));
                fileInsMap.put("empSeq", params.get("regEmpSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("value", fileInsMap.get("file_no"));
                fileInsMap.put("column", "file5");
                fileInsMap.put("payDestSn", params.get("payDestSn"));

                payAppRepository.updPayAttDetData(fileInsMap);
            }
        }

        /** 신용카드(재료비) - 매출전표 */
        MultipartFile file6 = request.getFile("file6");
        if(file6 != null){
            if(!file6.isEmpty()){
                fileInsMap = mainLib.fileUpload(file6, filePath(params, SERVER_DIR));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().substring(0, fileInsMap.get("orgFilename").toString().lastIndexOf('.')));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().substring(fileInsMap.get("orgFilename").toString().lastIndexOf('.') + 1));
                fileInsMap.put("empSeq", params.get("regEmpSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("value", fileInsMap.get("file_no"));
                fileInsMap.put("column", "file6");
                fileInsMap.put("payDestSn", params.get("payDestSn"));

                payAppRepository.updPayAttDetData(fileInsMap);
            }
        }

        /** 신용카드(재료비) - 거래명세서 */
        MultipartFile file7 = request.getFile("file7");
        if(file7 != null){
            if(!file7.isEmpty()){
                fileInsMap = mainLib.fileUpload(file7, filePath(params, SERVER_DIR));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().substring(0, fileInsMap.get("orgFilename").toString().lastIndexOf('.')));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().substring(fileInsMap.get("orgFilename").toString().lastIndexOf('.') + 1));
                fileInsMap.put("empSeq", params.get("regEmpSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("value", fileInsMap.get("file_no"));
                fileInsMap.put("column", "file7");
                fileInsMap.put("payDestSn", params.get("payDestSn"));

                payAppRepository.updPayAttDetData(fileInsMap);
            }
        }

        /** 신용카드(재료비) - 검수조서 */
        MultipartFile file8 = request.getFile("file8");
        if(file8 != null){
            if(!file8.isEmpty()){
                fileInsMap = mainLib.fileUpload(file8, filePath(params, SERVER_DIR));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().substring(0, fileInsMap.get("orgFilename").toString().lastIndexOf('.')));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().substring(fileInsMap.get("orgFilename").toString().lastIndexOf('.') + 1));
                fileInsMap.put("empSeq", params.get("regEmpSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("value", fileInsMap.get("file_no"));
                fileInsMap.put("column", "file8");
                fileInsMap.put("payDestSn", params.get("payDestSn"));

                payAppRepository.updPayAttDetData(fileInsMap);
            }
        }

        /** 신용카드(재료비) - 납품사진 */
        MultipartFile file9 = request.getFile("file9");
        if(file9 != null){
            if(!file9.isEmpty()){
                fileInsMap = mainLib.fileUpload(file9, filePath(params, SERVER_DIR));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().substring(0, fileInsMap.get("orgFilename").toString().lastIndexOf('.')));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().substring(fileInsMap.get("orgFilename").toString().lastIndexOf('.') + 1));
                fileInsMap.put("empSeq", params.get("regEmpSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("value", fileInsMap.get("file_no"));
                fileInsMap.put("column", "file9");
                fileInsMap.put("payDestSn", params.get("payDestSn"));

                payAppRepository.updPayAttDetData(fileInsMap);
            }
        }

        /** 소득신고자 - 계좌이체동의서 */
        MultipartFile file10 = request.getFile("file10");
        if(file10 != null){
            if(!file10.isEmpty()){
                fileInsMap = mainLib.fileUpload(file10, filePath(params, SERVER_DIR));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().substring(0, fileInsMap.get("orgFilename").toString().lastIndexOf('.')));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().substring(fileInsMap.get("orgFilename").toString().lastIndexOf('.') + 1));
                fileInsMap.put("empSeq", params.get("regEmpSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("value", fileInsMap.get("file_no"));
                fileInsMap.put("column", "file10");
                fileInsMap.put("payDestSn", params.get("payDestSn"));

                payAppRepository.updPayAttDetData(fileInsMap);
            }
        }

        /** 기타 첨부파일 */
        if(file11.length > 0){
            List<Map<String, Object>> list = mainLib.multiFileUpload(file11, filePath(params, SERVER_DIR));
            for(int i = 0 ; i < list.size() ; i++){
                list.get(i).put("contentId", "payAtt_" + params.get("payDestSn"));
                list.get(i).put("empSeq", params.get("regEmpSeq"));
                list.get(i).put("fileCd", params.get("menuCd"));
                list.get(i).put("filePath", filePath(params, BASE_DIR));
                list.get(i).put("fileOrgName", list.get(i).get("orgFilename").toString().substring(0, list.get(i).get("orgFilename").toString().lastIndexOf(".")));
                list.get(i).put("fileExt", list.get(i).get("orgFilename").toString().substring(list.get(i).get("orgFilename").toString().lastIndexOf(".") + 1));
            }
            commonRepository.insFileInfo(list);
        }
    }

    @Override
    public void updExnpAttDetData(Map<String, Object> params, MultipartHttpServletRequest request, MultipartFile[] file11, String SERVER_DIR, String BASE_DIR) {
        MainLib mainLib = new MainLib();
        Map<String, Object> fileInsMap = new HashMap<>();

        /** 세금계산서/계산서 - 세금계산서/계산서 */
        MultipartFile file1 = request.getFile("file1");
        if(file1 != null){
            if(!file1.isEmpty()){
                fileInsMap = mainLib.fileUpload(file1, filePath(params, SERVER_DIR));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().substring(0, fileInsMap.get("orgFilename").toString().lastIndexOf('.')));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().substring(fileInsMap.get("orgFilename").toString().lastIndexOf('.') + 1));
                fileInsMap.put("empSeq", params.get("regEmpSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("value", fileInsMap.get("file_no"));
                fileInsMap.put("column", "FILE1");
                fileInsMap.put("exnpDestSn", params.get("exnpDestSn"));
                payAppRepository.updExnpAttDetData(fileInsMap);
            }
        }

        /** 세금계산서/계산서 - 거래명세서 */
        MultipartFile file2 = request.getFile("file2");
        if(file2 != null){
            if(!file2.isEmpty()){
                fileInsMap = mainLib.fileUpload(file2, filePath(params, SERVER_DIR));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().substring(0, fileInsMap.get("orgFilename").toString().lastIndexOf('.')));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().substring(fileInsMap.get("orgFilename").toString().lastIndexOf('.') + 1));
                fileInsMap.put("empSeq", params.get("regEmpSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("value", fileInsMap.get("file_no"));
                fileInsMap.put("column", "FILE2");
                fileInsMap.put("exnpDestSn", params.get("exnpDestSn"));

                payAppRepository.updExnpAttDetData(fileInsMap);
            }
        }

        /** 세금계산서/계산서 - 거래명세서 */
        MultipartFile file3 = request.getFile("file3");
        if(file3 != null){
            if(!file3.isEmpty()){
                fileInsMap = mainLib.fileUpload(file3, filePath(params, SERVER_DIR));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().substring(0, fileInsMap.get("orgFilename").toString().lastIndexOf('.')));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().substring(fileInsMap.get("orgFilename").toString().lastIndexOf('.') + 1));
                fileInsMap.put("empSeq", params.get("regEmpSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("value", fileInsMap.get("file_no"));
                fileInsMap.put("column", "file3");
                fileInsMap.put("exnpDestSn", params.get("exnpDestSn"));

                payAppRepository.updExnpAttDetData(fileInsMap);
            }
        }

        /** 세금계산서/계산서 - 검수조서 */
        MultipartFile file4 = request.getFile("file4");
        if(file4 != null){
            if(!file4.isEmpty()){
                fileInsMap = mainLib.fileUpload(file4, filePath(params, SERVER_DIR));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().substring(0, fileInsMap.get("orgFilename").toString().lastIndexOf('.')));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().substring(fileInsMap.get("orgFilename").toString().lastIndexOf('.') + 1));
                fileInsMap.put("empSeq", params.get("regEmpSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("value", fileInsMap.get("file_no"));
                fileInsMap.put("column", "file4");
                fileInsMap.put("exnpDestSn", params.get("exnpDestSn"));

                payAppRepository.updExnpAttDetData(fileInsMap);
            }
        }

        /** 세금계산서/계산서 - 납품사진 */
        MultipartFile file5 = request.getFile("file5");
        if(file5 != null){
            if(!file5.isEmpty()){
                fileInsMap = mainLib.fileUpload(file5, filePath(params, SERVER_DIR));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().substring(0, fileInsMap.get("orgFilename").toString().lastIndexOf('.')));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().substring(fileInsMap.get("orgFilename").toString().lastIndexOf('.') + 1));
                fileInsMap.put("empSeq", params.get("regEmpSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("value", fileInsMap.get("file_no"));
                fileInsMap.put("column", "file5");
                fileInsMap.put("exnpDestSn", params.get("exnpDestSn"));

                payAppRepository.updExnpAttDetData(fileInsMap);
            }
        }

        /** 신용카드(재료비) - 매출전표 */
        MultipartFile file6 = request.getFile("file6");
        if(file6 != null){
            if(!file6.isEmpty()){
                fileInsMap = mainLib.fileUpload(file6, filePath(params, SERVER_DIR));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().substring(0, fileInsMap.get("orgFilename").toString().lastIndexOf('.')));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().substring(fileInsMap.get("orgFilename").toString().lastIndexOf('.') + 1));
                fileInsMap.put("empSeq", params.get("regEmpSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("value", fileInsMap.get("file_no"));
                fileInsMap.put("column", "file6");
                fileInsMap.put("exnpDestSn", params.get("exnpDestSn"));

                payAppRepository.updExnpAttDetData(fileInsMap);
            }
        }

        /** 신용카드(재료비) - 거래명세서 */
        MultipartFile file7 = request.getFile("file7");
        if(file7 != null){
            if(!file7.isEmpty()){
                fileInsMap = mainLib.fileUpload(file7, filePath(params, SERVER_DIR));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().substring(0, fileInsMap.get("orgFilename").toString().lastIndexOf('.')));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().substring(fileInsMap.get("orgFilename").toString().lastIndexOf('.') + 1));
                fileInsMap.put("empSeq", params.get("regEmpSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("value", fileInsMap.get("file_no"));
                fileInsMap.put("column", "file7");
                fileInsMap.put("exnpDestSn", params.get("exnpDestSn"));

                payAppRepository.updExnpAttDetData(fileInsMap);
            }
        }

        /** 신용카드(재료비) - 검수조서 */
        MultipartFile file8 = request.getFile("file8");
        if(file8 != null){
            if(!file8.isEmpty()){
                fileInsMap = mainLib.fileUpload(file8, filePath(params, SERVER_DIR));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().substring(0, fileInsMap.get("orgFilename").toString().lastIndexOf('.')));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().substring(fileInsMap.get("orgFilename").toString().lastIndexOf('.') + 1));
                fileInsMap.put("empSeq", params.get("regEmpSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("value", fileInsMap.get("file_no"));
                fileInsMap.put("column", "file8");
                fileInsMap.put("exnpDestSn", params.get("exnpDestSn"));

                payAppRepository.updExnpAttDetData(fileInsMap);
            }
        }

        /** 신용카드(재료비) - 납품사진 */
        MultipartFile file9 = request.getFile("file9");
        if(file9 != null){
            if(!file9.isEmpty()){
                fileInsMap = mainLib.fileUpload(file9, filePath(params, SERVER_DIR));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().substring(0, fileInsMap.get("orgFilename").toString().lastIndexOf('.')));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().substring(fileInsMap.get("orgFilename").toString().lastIndexOf('.') + 1));
                fileInsMap.put("empSeq", params.get("regEmpSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("value", fileInsMap.get("file_no"));
                fileInsMap.put("column", "file9");
                fileInsMap.put("exnpDestSn", params.get("exnpDestSn"));

                payAppRepository.updExnpAttDetData(fileInsMap);
            }
        }

        /** 소득신고자 - 계좌이체동의서 */
        MultipartFile file10 = request.getFile("file10");
        if(file10 != null){
            if(!file10.isEmpty()){
                fileInsMap = mainLib.fileUpload(file10, filePath(params, SERVER_DIR));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().substring(0, fileInsMap.get("orgFilename").toString().lastIndexOf('.')));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().substring(fileInsMap.get("orgFilename").toString().lastIndexOf('.') + 1));
                fileInsMap.put("empSeq", params.get("regEmpSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("value", fileInsMap.get("file_no"));
                fileInsMap.put("column", "file10");
                fileInsMap.put("exnpDestSn", params.get("exnpDestSn"));

                payAppRepository.updExnpAttDetData(fileInsMap);
            }
        }

        /** 기타 첨부파일 */
        if(file11.length > 0){
            List<Map<String, Object>> list = mainLib.multiFileUpload(file11, filePath(params, SERVER_DIR));
            for(int i = 0 ; i < list.size() ; i++){
                list.get(i).put("contentId", "exnpAtt_" + params.get("exnpDestSn"));
                list.get(i).put("empSeq", params.get("regEmpSeq"));
                list.get(i).put("fileCd", params.get("menuCd"));
                list.get(i).put("filePath", filePath(params, BASE_DIR));
                list.get(i).put("fileOrgName", list.get(i).get("orgFilename").toString().substring(0, list.get(i).get("orgFilename").toString().lastIndexOf(".")));
                list.get(i).put("fileExt", list.get(i).get("orgFilename").toString().substring(list.get(i).get("orgFilename").toString().lastIndexOf(".") + 1));
            }
            commonRepository.insFileInfo(list);
        }
    }

    @Override
    public Map<String, Object> getPayAttInfo(Map<String, Object> params) {
        Map<String, Object> returnMap = payAppRepository.getPayAttInfo(params);
        if(returnMap != null){
            Map<String, Object> searchMap = new HashMap<>();
            searchMap.put("contentId", "payAtt_" + params.get("payDestSn"));
            returnMap.put("etcFile", payAppRepository.getPayAttEtcInfo(searchMap));
        }
        return returnMap;
    }

    @Override
    public List<Map<String, Object>> getPayAttList(Map<String, Object> params) {
        return payAppRepository.getPayAttList(params);
    }

    @Override
    public Map<String, Object> getExnpAttInfo(Map<String, Object> params) {
        Map<String, Object> returnMap = payAppRepository.getExnpAttInfo(params);
        if(returnMap != null){
            Map<String, Object> searchMap = new HashMap<>();
            searchMap.put("contentId", "exnpAtt_" + params.get("exnpDestSn"));
            returnMap.put("etcFile", payAppRepository.getExnpAttEtcInfo(searchMap));
        }
        return returnMap;
    }

    @Override
    public List<Map<String, Object>> getExnpAttList(Map<String, Object> params) {
        return payAppRepository.getExnpAttList(params);
    }

    private String filePath (Map<String, Object> params, String base_dir){
        LocalDate now = LocalDate.now();
        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyy/MM/dd");
        String fmtNow = now.format(fmt);

        String path = base_dir + params.get("menuCd").toString()+"/" + fmtNow + "/";

        return path;
    }

    @Override
    public List<Map<String, Object>> getPartRatePay(Map<String, Object> params) {

        params.put("year", params.get("bsYm").toString().split("-")[0]);
        params.put("month", params.get("bsYm").toString().split("-")[1]);

        return payAppRepository.getPartRatePay(params);
    }

    @Override
    public List<Map<String, Object>> getDepositList(Map<String, Object> params) {
        return payAppRepository.getDepositList(params);
    }

    @Override
    public void setPayDepo(Map<String, Object> params, MultipartHttpServletRequest request, String SERVER_DIR, String BASE_DIR) {

        if(params.containsKey("payDepoSn")){
            payAppRepository.updPayDepo(params);
        } else {
            payAppRepository.insPayDepo(params);
        }

        MainLib mainLib = new MainLib();
        Map<String, Object> fileInsMap = new HashMap<>();

        MultipartFile files = request.getFile("files");
        params.put("menuCd", "payDepo");

        if(params.containsKey("fileSn")){
            Map<String, Object> fileMap = commonRepository.getFileData(params);

            fileMap.put("file_no", fileMap.get("file_no"));
            fileMap.put("payDepoSn", params.get("payDepoSn"));

            payAppRepository.updPayDepoFile(fileMap);
        }


        if(files != null){
            if(!files.isEmpty()){
                fileInsMap = mainLib.fileUpload(files, filePath(params, SERVER_DIR));
                fileInsMap.put("payDepoSn", params.get("payDepoSn"));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().substring(0, fileInsMap.get("orgFilename").toString().lastIndexOf('.')));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().substring(fileInsMap.get("orgFilename").toString().lastIndexOf('.') + 1));
                fileInsMap.put("empSeq", params.get("regEmpSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("file_no", fileInsMap.get("file_no"));
                payAppRepository.updPayDepoFile(fileInsMap);
            }
        }
    }

    @Override
    public Map<String, Object> getPayDepoData(Map<String, Object> params) {
        return payAppRepository.getPayDepoData(params);
    }

    @Override
    public void setApprIncome(Map<String, Object> params) {
        payAppRepository.updApprStatus(params);
    }

    @Override
    public List<Map<String, Object>> getCheckBudget(Map<String, Object> params) {

        List<Map<String, Object>> list = payAppRepository.getCheckBudget(params);
        return list;
    }

    @Override
    public void delPayApp(int[] params) {
        for(int i = 0 ; i < params.length ; i++){
            payAppRepository.delPayApp(params[i]);

            // 출장연결된 지급신청 건 삭제
            payAppRepository.updHrBizReqResultByPayAppSnEqNull(params[i]);
            // 해외출장 지급신청 건 삭제
            payAppRepository.updHrBizReqByPayAppSnEqNull(params[i]);
            // 구매지급요청 삭제
            payAppRepository.updClaimExnpByPayAppSnEqNull(params[i]);
            // 식대 지급신청건 삭제
            payAppRepository.updSnackByPayAppSnEqNull(params[i]);

            Map<String, Object> paraMap = new HashMap<>();
            paraMap.put("payAppSn", params[i]);
            paraMap.put("PAY_APP_SN", params[i]);
            List<Map<String, Object>> useEtaxList = payAppRepository.getUseEtaxInfoList(paraMap);
            // dj_use_etax_info 테이블의 CE_GW_IDX값이 있으면 update, 없으면 delete
            for(Map<String, Object> subMap : useEtaxList){
                if(Integer.parseInt(subMap.get("CE_GW_CHK").toString()) > 0){
                    payAppRepository.updUseEtaxPayAppNull(paraMap);
                } else {
                    payAppRepository.delUseEtaxInfo(paraMap);
                }
            }
            List<Map<String, Object>> useCardList = payAppRepository.getUseCardInfoList(paraMap);
            for(Map<String, Object> subMap : useCardList){
                if(Integer.parseInt(subMap.get("SNACK_INFO_CHK").toString()) > 0 || Integer.parseInt(subMap.get("BIZ_REQ_CHK").toString()) > 0 ||
                        Integer.parseInt(subMap.get("BIZ_REQ_RESULT_CHK").toString()) > 0 || Integer.parseInt(subMap.get("CE_GW_CHK").toString()) > 0){
                    payAppRepository.updUseCardPayAppNull(paraMap);
                } else {
                    payAppRepository.delUseCardInfo(paraMap);
                }
            }
        }
    }

    @Override
    public void updExnpDe(int[] params, Map<String, Object> params2) {
        for(int i = 0 ; i < params.length ; i++){
            Map<String, Object> map = new HashMap<>();

            map.put("payAppSn", params[i]);
            map.put("payExnpDe", params2.get("payExnpDe"));
            payAppRepository.updExnpDe(map);
        }
    }

    @Override
    public List<Map<String, Object>> getPayAppFileList(Map<String, Object> params) {
        return payAppRepository.getPayAppFileList(params);
    }
    @Override
    public List<Map<String, Object>> getPayAppDocFileList(Map<String, Object> params) {
        return payAppRepository.getPayAppDocFileList(params);
    }

    @Override
    public List<Map<String, Object>> getApprovalExnpFileData(Map<String, Object> params) {
        List<Map<String, Object>> list = payAppRepository.getExnpDetailData(params);
        List<Map<String, Object>> fileList = payAppRepository.getApprovalExnpCommonFileData(params);

        for(Map<String, Object> data : list){
            fileList.add(payAppRepository.getApprovalExnpFileData(data));
        }

        return fileList;
    }

    @Override
    public List<Map<String, Object>> getPjtExnpList(Map<String, Object> params) {
        return payAppRepository.getPjtExnpList(params);
    }

    @Override
    public void setProjectTaxInfo(Map<String, Object> params) {
        if(!params.containsKey("depoSetSn")){
            payAppRepository.insProjectTaxInfo(params);
        } else {
            payAppRepository.updProjectTaxInfo(params);
        }
    }

    @Override
    public Map<String, Object> getProjectSettingInfo(Map<String, Object> params) {
        return payAppRepository.getProjectSettingInfo(params);
    }

    @Override
    public Map<String, Object> getProjectSettingInfoByPjtSn(Map<String, Object> params) {
        return payAppRepository.getProjectSettingInfoByPjtSn(params);
    }

    @Override
    public void setProjectBudgetInfo(Map<String, Object> params) {
        if(!params.containsKey("depoSetSn")){
            payAppRepository.insProjectBudgetInfo(params);
        } else {
            payAppRepository.updProjectBudgetInfo(params);
        }
    }

    @Override
    public void payAppRevert(Map<String, Object> params) {

        payAppRepository.payAppRevert(params);

        payAppRepository.insPayAppRevert(params);

        payAppRepository.delPayAppBsYm(params);

//        params.put("PAY_APP_SN", params.get("payAppSn"));
//        payAppRepository.delUseEtaxInfo(params);
//        List<Map<String, Object>> useCardList = payAppRepository.getUseCardInfoList(params);
//        for(Map<String, Object> map : useCardList){
//            if(Integer.parseInt(map.get("SNACK_INFO_CHK").toString()) > 0 || Integer.parseInt(map.get("BIZ_REQ_CHK").toString()) > 0 ||
//                    Integer.parseInt(map.get("BIZ_REQ_RESULT_CHK").toString()) > 0 || Integer.parseInt(map.get("CE_GW_CHK").toString()) > 0){
//                payAppRepository.updUseCardPayAppNull(map);
//            } else {
//                payAppRepository.delUseCardInfo(map);
//            }
//        }
    }

    @Override
    public List<Map<String, Object>> getPayDepoFileList(Map<String, Object> params) {
        List<Map<String, Object>> listMap = new ArrayList<>();

        if(params.containsKey("payDepoSn")){
            listMap = payAppRepository.getPayDepoFileList(params);
        } else if(params.containsKey("payIncpSn")){
            listMap = payAppRepository.getPayIncpFileList(params);
        }
        return listMap;
    }

    @Override
    public List<Map<String, Object>> getPayExnpFileList(Map<String, Object> params) {
        return payAppRepository.getPayExnpFileList(params);
    }

    @Override
    public void regReListFile(Map<String, Object> params, MultipartFile[] fileList, String serverDir, String baseDir) {

        MainLib mainLib = new MainLib();

        /** 신청서 관련 파일 정보 dj_pay_app_file에 저장  */
//        List<Map<String, Object>> storedFileArr = payAppRepository.getPayExnpFileList(params);
//        payAppRepository.delPayAppFileList(params);
//
//        for(Map<String, Object> map : storedFileArr){
//            map.put("contentId", params.get("payAppSn"));
//            map.put("fileNo", map.get("file_no"));
//
//            commonRepository.insPayAppFileList(map);
//        }

        if(fileList.length > 0){
            params.put("menuCd", "exnp");

            List<Map<String, Object>> list = mainLib.multiFileUpload(fileList, filePath(params, serverDir));
            for(int i = 0 ; i < list.size() ; i++){
                list.get(i).put("contentId", params.get("exnpSn"));
                list.get(i).put("empSeq", params.get("empSeq"));
                list.get(i).put("fileCd", params.get("menuCd"));
                list.get(i).put("filePath", filePath(params, baseDir));
                list.get(i).put("fileOrgName", list.get(i).get("orgFilename").toString().substring(0, list.get(i).get("orgFilename").toString().lastIndexOf(".")));
                list.get(i).put("fileExt", list.get(i).get("orgFilename").toString().substring(list.get(i).get("orgFilename").toString().lastIndexOf(".") + 1));

                commonRepository.insFileInfoOne(list.get(i));
//                commonRepository.insPayAppFileList(list.get(i));
            }
//            commonRepository.insFileInfo(list);
        }
    }

    @Override
    public List<Map<String, Object>> getRegIncmReData(Map<String, Object> params) {
        return payAppRepository.getRegIncmReData(params);
    }

    @Override
    public Map<String, Object> setIncpRe(Map<String, Object> params) {
        Gson gson = new Gson();
        List<Map<String, Object>> itemArr = gson.fromJson((String) params.get("itemArr"), new TypeToken<List<Map<String, Object>>>(){}.getType());

        int i = 0;
        Integer groupKey = null;
        for(Map<String, Object> map : itemArr){
            Map<String, Object> paramsMap = new HashMap<>();
            paramsMap = payAppRepository.getPayIncpReqData(map);
            List<Map<String, Object>> list = payAppRepository.getPayIncpDetailData(map);

            if(i != 0){
                paramsMap.put("groupKey", groupKey);
            }

            paramsMap.put("PAY_INCP_DET_SN", list.get(0).get("PAY_INCP_DET_SN"));
            paramsMap.put("TR_DE", map.get("inDt"));
            paramsMap.put("TOT_AMT", map.get("totAmt"));
            paramsMap.put("SUP_AMT", map.get("supAmt"));
            paramsMap.put("VAT_AMT", map.get("vatAmt"));
            paramsMap.put("EVID_TYPE", list.get(0).get("EVID_TYPE"));
            paramsMap.put("TR_CD", list.get(0).get("TR_CD"));
            paramsMap.put("CRM_NM", list.get(0).get("CRM_NM"));
            paramsMap.put("REG_NO", list.get(0).get("REG_NO"));
            paramsMap.put("CRM_BNK_NM", list.get(0).get("CRM_BNK_NM"));
            paramsMap.put("CRM_ACC_NO", list.get(0).get("CRM_ACC_NO"));
            paramsMap.put("CRM_ACC_HOLDER", list.get(0).get("CRM_ACC_HOLDER"));
            paramsMap.put("CARD", list.get(0).get("CARD"));
            paramsMap.put("CARD_NO", list.get(0).get("CARD_NO"));
            paramsMap.put("ETC", list.get(0).get("ETC"));
            paramsMap.put("ISS", list.get(0).get("ISS"));
            paramsMap.put("RE_APP_DE", map.get("reAppDe"));

            if(map.containsKey("payIncpReSn")){
                paramsMap.put("PAY_INCP_RE_SN", map.get("payIncpReSn"));
                paramsMap.put("payIncpReSn", map.get("payIncpReSn"));
                payAppRepository.updIncpRe(paramsMap);
            } else {
                payAppRepository.insIncpRe(paramsMap);

                if(i == 0){
                    groupKey = Integer.parseInt(paramsMap.get("payIncpReSn").toString());
                }

                i++;
            }
        }

        params.put("payIncpReSn", groupKey);

        return params;
    }

    @Override
    public List<Map<String, Object>> getPayIncpReData(Map<String, Object> params) {
        return payAppRepository.getPayIncpReData(params);
    }

    public void createPdf(Map<String, Object> params, String serverDir, String baseDir) {
        Document document = new Document(PageSize.A4, 30, 30, 30, 30);

        try {
            // PDF 파일 생성
            String fileUUID = UUID.randomUUID().toString();
            String fileOrgName = params.get("pdfFileOrgName").toString();
            String fileCd = "payApp";
            String fileExt = "pdf";
            String htmlContents = params.get("pdfHtmlContents").toString();

            params.put("menuCd", fileCd);
            String filePathTxt = filePath(params, serverDir);

            // PDF 생성을 위한 OutputStream 생성
            File f = new File(filePathTxt);
            if(!f.exists()) {
                f.mkdirs();
            }

            PdfWriter pdfWriter = PdfWriter.getInstance(document, new FileOutputStream(filePathTxt + fileUUID + "." + fileExt));
            // PDF 파일 열기
            document.open();

            String htmlStr = "<html><body style='font-family: batang;'>"+ htmlContents +"</body></html>";

            XMLWorkerHelper helper = XMLWorkerHelper.getInstance();

            CSSResolver cssResolver = new StyleAttrCSSResolver();

            XMLWorkerFontProvider fontProvider = new XMLWorkerFontProvider(XMLWorkerFontProvider.DONTLOOKFORFONTS);
            fontProvider.register("/egovframework/fonts/batang.ttc", "batang"); //MalgunGothic은 font-family용 alias

            CssAppliers cssAppliers = new CssAppliersImpl(fontProvider);
            HtmlPipelineContext htmlContext = new HtmlPipelineContext(cssAppliers);
            htmlContext.setTagFactory(Tags.getHtmlTagProcessorFactory());

            // html을 pdf로 변환시작
            PdfWriterPipeline pdf = new PdfWriterPipeline(document, pdfWriter);
            HtmlPipeline html = new HtmlPipeline(htmlContext, pdf);
            CssResolverPipeline css = new CssResolverPipeline(cssResolver, html);

            XMLWorker worker = new XMLWorker(css, true);
            //캐릭터 셋 설정
            XMLParser xmlParser = new XMLParser(worker, Charset.forName("UTF-8"));

            StringReader strReader = new StringReader(htmlStr);
            xmlParser.parse(strReader);

            document.close();
            pdfWriter.close();

            Map<String, Object> fileParameters = new HashMap<>();
            fileParameters.put("fileCd", fileCd);
            fileParameters.put("fileUUID", fileUUID+"."+fileExt);
            fileParameters.put("fileOrgName", fileOrgName);
            fileParameters.put("filePath", filePath(params, baseDir));
            fileParameters.put("fileExt", fileExt);
            fileParameters.put("fileSize", 99);
            fileParameters.put("contentId", params.get("payAppSn"));
            fileParameters.put("empSeq", "1");

            // 이전에 저장한 파일 삭제
            commonRepository.delContentFileOne(fileParameters);
            // DB에 데이터 저장
            commonRepository.insFileInfoOne(fileParameters);

        } catch (Exception e){
            e.printStackTrace();
        }
    }

    @Override
    public Map<String, Object> getPartRatePayBsYm(Map<String, Object> params) {
        return payAppRepository.getPartRatePayBsYm(params);
    }

    @Override
    public void delExnpData(Map<String, Object> params) {
        Map<String, Object> map = new HashMap<>();

        map = payAppRepository.getExnpData(params);

        if(map.get("PAY_APP_DET_SN") != null){
            for(String c : map.get("PAY_APP_DET_SN").toString().split(",")){
                map.put("payAppDetSn", c);
                payAppRepository.updPayAppExnpStatus(map);
            }
        }

        payAppRepository.delExnpData(params);
        payAppRepository.delExnpDetData(params);
    }

    @Override
    public void regExnpCancel(Map<String, Object> params) {
        Map<String, Object> mainExnpData = payAppRepository.getExnpData(params);

        Map<String, Object> exnpMap = payAppRepository.getExnpDetOne(params);
        // EXNP_DE > IN_DT
        Map<String, Object> g20Map = new HashMap<>();
        if(mainExnpData.get("PAY_APP_TYPE").equals("1")) {
            if(exnpMap.get("EVID_TYPE").equals("1") || exnpMap.get("EVID_TYPE").equals("2") || exnpMap.get("EVID_TYPE").equals("3")) {
                g20Map = g20Repository.getExnpDocData(exnpMap);

                List<Map<String, Object>> listMap = payAppRepository.getExnpDetailData(params);

                g20Repository.execUspAncj080Delete00(g20Map);

                for(Map<String, Object> map : listMap) {
                    g20Repository.delExnpReDocData(map);
                }
//            g20Repository.delExnpDocData(g20Map);


                payAppRepository.updExnpReStat(params);

            } else {

                g20Map = g20Repository.getExnpDocDataEtc(exnpMap);

                List<Map<String, Object>> listMap = payAppRepository.getExnpDetailData(params);

                g20Repository.execUspAncj080Delete00(g20Map);

                for(Map<String, Object> map : listMap) {
                    g20Repository.delExnpDocData(map);
                }

                payAppRepository.updExnpNullStat(params);
            }
        } else {
            g20Map = g20Repository.getExnpDocDataEtc(exnpMap);

            List<Map<String, Object>> listMap = payAppRepository.getExnpDetailData(params);

            g20Repository.execUspAncj080Delete00(g20Map);

            for(Map<String, Object> map : listMap) {
                g20Repository.delExnpDocData(map);
            }

            payAppRepository.updExnpNullStat(params);
        }

        payAppRepository.resolutionExnpReStatus(params);
    }

    @Override
    public void regIncpCancel(Map<String, Object> params) {

        Map<String, Object> incpMap = payAppRepository.getIncpDetOne(params);
        // EXNP_DE > IN_DT

        Map<String, Object> g20Map = g20Repository.getIncpDocData(incpMap);

        List<Map<String, Object>> listMap = payAppRepository.getPayIncpDetailData(params);

        g20Repository.execUspAncj080Delete00(g20Map);

//        for(Map<String, Object> map : listMap) {
            g20Repository.delIncpReDocData(incpMap);
//        }
        payAppRepository.resolutionIncpReStatus(params);
//        g20Repository.delExnpDocData(g20Map);
    }


    @Override
    public void updateExnpDe(Map<String, Object> params) {
        payAppRepository.updateExnpDe(params);
    }

    @Override
    public List<Map<String, Object>> getPaymentNotDoneList(Map<String, Object> params) {
        return g20Repository.getPaymentNotDoneList(params);
    }

    @Override
    public void delIncpData(Map<String, Object> params) {
        payAppRepository.delIncpData(params);
        payAppRepository.delIncpDetData(params);
    }


    @Override
    public void delIncpRe(Map<String, Object> params) {
        payAppRepository.delIncpRe(params);
    }

    @Override
    public Map<String, Object> getDepoInfo(Map<String, Object> params) {
        return payAppRepository.getDepoInfo(params);
    }

    @Override
    public Map<String, Object> getApproveIncpAmt(Map<String, Object> params) {
        return payAppRepository.getApproveIncpAmt(params);
    }

    @Override
    public Map<String, Object> getApproveExnpAmtTp1(Map<String, Object> params) {
        return payAppRepository.getApproveExnpAmtTp1(params);
    }

    @Override
    public Map<String, Object> getApproveExnpAmtTp2(Map<String, Object> params) {
        return payAppRepository.getApproveExnpAmtTp2(params);
    }

    @Override
    public Map<String, Object> getWaitExnp(Map<String, Object> params) {
        return payAppRepository.getWaitExnp(params);
    }

    @Override
    public Map<String, Object> getReturnPayAmt(Map<String, Object> params) {
        return payAppRepository.getReturnPayAmt(params);
    }

    @Override
    public Map<String, Object> getWaitIncp(Map<String, Object> params) {
        return payAppRepository.getWaitIncp(params);
    }

    @Override
    public Map<String, Object> g20ExnpManage(Map<String, Object> params) {

        updateG20ExnpFinalAppr(params, params.get("type").toString());
        return params;
    }
}
